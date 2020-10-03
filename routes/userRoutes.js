import express from 'express';
import session from 'express-session';
import {check} from 'express-validator';

import userController from '../controllers/userController';

const router = express.Router();

// Get all values of logged in user
router.get('/getUser', userController.getUser);

// Post request Login page
router.post('/login', [
		check('email').isEmail(),
		check('password').isLength({min: 6})
	], userController.login);

// Post request Signup page
router.post('/signup', [
		check('name').not().isEmpty(),
		check('username').not().isEmpty().isLength({min: 4, max: 9}),
		check('email').isEmail(),
		check('password').isLength({min: 6})
	], userController.signup);

// Get user details
router.get('/getUserDetails', userController.getUserDetails);

// Update Bucket
router.patch('/updateBucket', userController.updateBucket);

// Add ToDo Item
router.patch('/addItem', userController.addItem);

// Update Item
router.patch('/updateItem', userController.updateItem);

// Mark Todo Done
router.patch('/markDone', userController.markDone);

// Mark Todo Undone
router.patch('/markUndone', userController.markUndone);

// Delete Item
router.patch('/deleteItem', userController.deleteItem);

// Logout handle
router.delete('/logout', userController.logout);

export default router;