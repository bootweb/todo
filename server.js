import express from 'express';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import {default as connectMongo} from 'connect-mongo';
const MongoStore = connectMongo(session);

import config from './config';
import userRoutes from './routes/userRoutes';

const server = express();

// Does not let users know that we are using express
server.disable('x-powered-by');

// Parse json body
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Connect to db
mongoose.connect(config.mongodbUri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
	.catch(err => {
		console.log(err);
	})

// Session
const sess = {
	name: config.sess_name,
	resave: false,
	saveUninitialized: false,
	secret: config.sess_secret,
	store: new MongoStore({
		mongooseConnection: mongoose.connection
	}),
	cookie: {
		maxAge: config.sess_lifetime,
		sameSite: true // same as 'Strict'
	}
}
// For using secure cookies in production, but allowing for testing in development
if (config.nodeEnv = 'production') {
	server.set('trust proxy', 1) // trust first proxy
	sess.cookie.secure = true // serve secure cookies
}
server.use(session(sess));


// Use router for all requests at ./api
server.use('/api', userRoutes);

// Use public folder as static server
server.use(express.static('public'));

// Set view engine to pug
server.set('view engine', 'pug');

// Serve index file for all cases except for defined above
server.use((req, res, next) => {
	res.render('index');
});

// Error handling
server.use((error, req, res, next) => {
	// if response is already sent via error handling, just return that error and do not execute our custom error handling
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500).json({message: error.message || 'An unknown error occured!'});
});

// Listen server
server.listen(config.port, config.host, () => {
	console.info('Express listening on port', config.port);
});