import React, {useState, useEffect} from 'react';
import { CSSTransition } from 'react-transition-group';
import {connect} from 'react-redux';

import {clearResponse} from '../redux/util/controller';

const mapStateToProps = ({ serverResponse }) => ({
  serverResponse
});

const mapDispatchToProps = dispatch => {
  return {
  	clearResponse: user => dispatch(clearResponse())
  }
};

const Modal = ({ serverResponse, clearResponse }) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (serverResponse.success != null || serverResponse.failure != null) {
			setShow(true)
			const timer = setTimeout(() => {
				setShow(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [serverResponse.success, serverResponse.failure]);

	useEffect(() => {
		if (show === false && (serverResponse.success != null || serverResponse.failure != null)) {
			const timer2 = setTimeout(() => {
				clearResponse();
			}, 500);
			return () => clearTimeout(timer2);
		}
	}, [show, serverResponse.success, serverResponse.failure]);

	return (
		<React.Fragment>
			<CSSTransition
				in={show}
				classNames="modalAnimation"
				timeout={500}
				mountOnEnter
				unmountOnExit
			>
				<div className="modal_area">
					{serverResponse.success != null &&
					<React.Fragment>
						<div className="my_animated_bar_success"></div>
						<div className="modal modal-success">
							<p><i className="fa fa-flag" aria-hidden="true"></i> <strong>Success</strong>: {serverResponse.success}</p>
							<button
								type="button"
								className="close_modal"
								onClick={() => setShow(false)}>
								<i className="fa fa-times" aria-hidden="true"></i>
							</button>
						</div>
					</React.Fragment>
					}
					{serverResponse.failure != null &&
					<React.Fragment>
						<div className="my_animated_bar_failure"></div>
						<div className="modal modal-failure">
							<p><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> <strong>Failure</strong>: {serverResponse.failure}</p>
							<button
								type="button"
								className="close_modal"
								onClick={() => setShow(false)}>
								<i className="fa fa-times" aria-hidden="true"></i>
							</button>
						</div>
					</React.Fragment>
					}
				</div>
			</CSSTransition>
		</React.Fragment>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);