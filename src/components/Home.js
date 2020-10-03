import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import {receiveSuccessMessage} from '../redux/util/controller';

const mapStateToProps = ({ session }) => ({
  	loggedIn: Boolean(session.email)
});

const mapDispatchToProps = dispatch => {
  return {
  	receiveSuccessMessage: message => dispatch(receiveSuccessMessage(message))
  }
};

const Home = ({ session, loggedIn, receiveSuccessMessage }) => {

	const firstRenderItem = useRef(true);

	const [bucketName, setBucketName] = useState('Bucket Name');
	const [bucketNameUpdateable, setBucketNameUpdateable] = useState(false);
	const [bucketNameError, setBucketNameError] = useState('');
	const [item, setItem] = useState('');
	const [itemError, setItemError] = useState('');
	const [showAddItem, setShowAddItem] = useState(false);
	const [itemsArray, setItemsArray] = useState([]);
	const [updatedItem, setUpdatedItem] = useState('');
	const [updateableId, setUpdateableId] = useState('');
	const [updatedItemError, setUpdatedItemError] = useState('');

	// // Get stored details from db
	// useEffect(() => {
	// 	axios.get('/api/getUserDetails')
	// 		.then(resp => {
	// 			setBucketName(resp.data.user.todo_bucket_name);
	// 			setItemsArray(resp.data.user.todo_list);
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		})
	// }, []);

	// Get stored details from db
	useEffect(() => {
		if (loggedIn) {
			axios.get('/api/getUserDetails')
				.then(resp => {
					setBucketName(resp.data.user.todo_bucket_name);
					setItemsArray(resp.data.user.todo_list);
				})
				.catch(err => {
					console.log(err);
				})
		}
	}, []);

	const itemHandler = (event) => {
		setItem(event.target.value);
	}

	// Item validation
	useEffect(() => {
		if (firstRenderItem.current) {
			// firstRenderItem.current = false;
			return;
		}
		if (item === "") {
			setItemError('Please add item name');
		} else {
			setItemError('');
		}
	}, [item]);
	
	// Bucket name validation
	useEffect(() => {
		if (bucketName === '') {
			setBucketNameError('Please add name to bucket');
		} else {
			setBucketNameError('');
		}
	}, [bucketName]);

	const bucketNameHandler = (event) => {
		setBucketName(event.target.value);
	}

	// update bucket
	const updateBucket = () => {
		if (bucketName !== '') {


			if (loggedIn) {
				// update to db
				axios.patch('/api/updateBucket', {bucketName: bucketName})
					.then(resp => {
						const sR = {
							success: resp.data.message
						};
						receiveSuccessMessage(sR);
					});
			}
			setBucketNameUpdateable(!bucketNameUpdateable)
		}
	}

	// ADD Items
	const addItemHandler = () => {
		// validation check
		if (item === "") {
			firstRenderItem.current = false;
			return setItemError('Please add item name');
		} else {
			firstRenderItem.current = true;
			setItemError('');
		}
		// setItemsArray(itemsArray.concat({text: item, key: Date.now()}));
		const newItem = {
			text: item,
			key: Date.now(),
			done: 0
		}
		const newArray = [...itemsArray, newItem];
		if (loggedIn) {
			// add item to db
			axios.patch('/api/addItem', {newArray: newArray})
				.then(resp => {
					const sR = {
						success: resp.data.message
					};
					receiveSuccessMessage(sR);
				});
		}
		setItemsArray(newArray);
		setShowAddItem(false);
		setItem('');
	}

	// UPDATE Items
	const editHandler = (key, text) => {
		setUpdateableId(key);
		setUpdatedItem(text);
	}
	// updateditem validation
	useEffect(() => {
		if (updatedItem === '') {
			setUpdatedItemError('Please add item name');
		} else {
			setUpdatedItemError('');
		}
	}, [updatedItem]);
	const updateHandler = (key) => {
		let updatedArray = itemsArray;
		updatedArray.map(item => {
			if (item.key === key && updatedItem !== '') {
				item.text = updatedItem;
			}
		});
		setItemsArray(updatedArray);
		if (loggedIn) {
			// update item to db
			axios.patch('/api/updateItem', {updatedArray: updatedArray})
				.then(resp => {
					const sR = {
						success: resp.data.message
					};
					receiveSuccessMessage(sR);
				});
		}
		setUpdateableId('');
	}

	// MARK as DONE
	const doneMarkHandler = (key) => {
		let updatedArray = itemsArray;
		updatedArray.map(item => {
			if (item.key === key) {
				item.done = 1;
			}
		});
		const newArray = [...updatedArray]
		setItemsArray(newArray);
		if (loggedIn) {
			// update item to db
			axios.patch('/api/markDone', {newArray: newArray})
				.then(resp => {
					const sR = {
						success: resp.data.message
					};
					receiveSuccessMessage(sR);
				});
		}
	}
	// MARK as UNDONE
	const undoneMarkHandler = (key) => {
		let updatedArray = itemsArray;
		updatedArray.map(item => {
			if (item.key === key) {
				item.done = 0;
			}
		});
		const newArray = [...updatedArray]
		setItemsArray(newArray);
		if (loggedIn) {
			// update item to db
			axios.patch('/api/markUndone', {newArray: newArray})
				.then(resp => {
					const sR = {
						success: resp.data.message
					};
					receiveSuccessMessage(sR);
				});
		}
	}

	// DELETE Items
	const deleteHandler = (key) => {
		const filteredItems = itemsArray.filter(item =>
			item.key !== key
		);
		if (loggedIn) {
			// delete item from db
			axios.patch('/api/deleteItem', {filteredItems: filteredItems})
				.then(resp => {
					const sR = {
						success: resp.data.message
					};
					receiveSuccessMessage(sR);
				});
		}
		setItemsArray(filteredItems);
	}

	return (
		<React.Fragment>
			<div className="header">
				<div className="header-text">Your Personal Assistant</div>
				{(loggedIn) ?
					<p>Your todo list will be preserved in our database</p>
				:
					<p>Start creating your todo list</p>
				}
			</div>
			<div className="container">
				<div className="bucket">
					<div className="bucket_name">
						<div>
							{bucketNameUpdateable ?
								<React.Fragment>
									<h2><input
											type="text"
											value={bucketName}
											onChange={bucketNameHandler}
											className={`form-text ${(bucketNameError !== "") && "red-input"}`}
										/>
									</h2>
									{bucketNameError !== "" && <p className="error_text"><i>!</i> &nbsp;{bucketNameError}</p>}
								</React.Fragment>
							:
								<h2>{bucketName}</h2>
							}
						</div>
						{bucketNameUpdateable ?
							<button
								type="button"
								className="edit_btn"
								onClick={updateBucket}>
								Update
							</button>
						:
							<button
								type="button"
								className="edit_btn"
								onClick={() => setBucketNameUpdateable(true)}>
								<i className="fa fa-pencil"></i> Edit
							</button>
						}
					</div>
					<div className="sep"></div>
					<div className="add_item">
						{!showAddItem &&
							<button
								type="button"
								className="addItem-btn"
								onClick={() => setShowAddItem(true)}
							>Add new todo</button>
						}
						{showAddItem &&
						<React.Fragment>
							<div>
								<input
									type="text"
									value={item}
									onChange={itemHandler}
									className={`form-item ${(itemError !== "") && "red-input"}`}
								/>
								{itemError !== "" && <p className="error_text"><i>!</i> &nbsp;{itemError}</p>}
							</div>
							<button
								type="button"
								className="edit_btn"
								onClick={addItemHandler}>
								Add Item
							</button>
						</React.Fragment>
						}
					</div>
					<div className="all-todo-items">
						{itemsArray.map(s =>
							<div key={s.key} className="single-list">
								<div>
								{updateableId === s.key ?
									<React.Fragment>
										<input
											type="text"
											className={`form-item ${(updatedItemError !== "") && "red-input"}`}
											value={updatedItem}
											onChange={(e) => setUpdatedItem(e.target.value)}
										/>
										{updatedItemError !== "" && <p className="error_text"><i>!</i> &nbsp;{updatedItemError}</p>}
									</React.Fragment>
								:
									<p className={`${(s.done === 1) && 'done'}`}>{s.text}</p>
								}
								</div>
								<ul className="options">
									{updateableId === s.key ?
										<li
											className="editTodo_btn"
											onClick={() => updateHandler(s.key)}>
											Update
										</li>
									:
										<li
											className="editTodo_btn"
											onClick={() => editHandler(s.key, s.text)}>
											<i className="fa fa-pencil"></i>
										</li>
									}
									{(s.done === 1) &&
										<li
											className="done_btn"
											onClick={() => undoneMarkHandler(s.key)}>
											<i className="fa fa-times"></i>
										</li>
									}
									{(s.done === 0) && 
										<li
											className="done_btn"
											onClick={() => doneMarkHandler(s.key)}>
											<i className="fa fa-check"></i>
										</li>
									}
									<li
										className="deleteTodo_btn"
										onClick={() => deleteHandler(s.key)}>
										<i className="fa fa-trash"></i>
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);