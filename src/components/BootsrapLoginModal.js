import React, { Component } from 'react';
import { FormGroup, Row, Col, Modal, Button, ControlLabel, Alert } from 'react-bootstrap';
import { Control, Errors, actions } from 'react-redux-form';
import { loginActionPost } from '../user/loginHelpers.jsx';
import { TiWarningOutline, TiMail, TiLockClosedOutline } from 'react-icons/lib/ti/';

export class BootsrapLoginModal extends Component {

    onHide() {
        const { dispatch } = this.props;
        dispatch(actions.change('login.modalIsOpen', false));
    }

    onEnter() {
        const { dispatch } = this.props;
        dispatch(actions.change('login.login', ''));
        dispatch(actions.change('login.password', ''));
        dispatch(actions.setValidity('login', true));
    }

    clearLoginError() {
        const { dispatch } = this.props;
        dispatch(actions.setValidity('login', true));
    }

    handlePostLogin() {
        const { dispatch, store } = this.props;
        const { login, loginForm, password } = this.props.store;

        const handlePostSubmitted = (id_token) => {
            setLoggedIn(id_token);
            const { afterPostSubmitFunction } = this.props.store;
            if (typeof afterPostSubmitFunction === "function") {
                dispatch(actions.change('login.afterPostSubmitFunction', null));
                afterPostSubmitFunction();
            };
        };

        const setLoggedIn = (id_token) => {
            const { dispatch } = this.props;
            dispatch(actions.change('login.isUserLoggedIn', true));
            dispatch(actions.change('login.modalIsOpen', false));
            dispatch(actions.change('login.login', loginForm));     // write login value from from to store to work with
            dispatch(actions.change('login.id_token', id_token));
        };

        const loginError = (errors) => {
            const { dispatch } = this.props;
            dispatch(actions.setErrors('login', errors));
        };

        dispatch(actions.setTouched('login.loginForm'));
        dispatch(actions.setTouched('login.password'));
        if( store.loginForm.length > 0 && store.password.length > 0 ) {
            const loginCredentials = Object.assign({} , {login: loginForm}, {password: password});
            loginActionPost(loginCredentials).then(handlePostSubmitted, loginError);
        }
    }

    render() {
        const { message, modalIsOpen } = this.props.store;
        const forgotPasswordLink  = "https://localhost/forgotPasswordLink"; // needs to be a prop that we set

        return (
            <FormGroup>
                <Modal show={true}
                       keyboard={true}
                       onHide={() => this.onHide()}
                       onEnter={() => this.onEnter()}
                       animation={false}
                >
                    <Modal.Header closeButton>
                        <h4 className="text-left">Login</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup className="well">
                            { message != '' &&
                                <FormGroup>
                                    <Row>
                                        <Col md={12}>
                                            <h4 className="text-center"><div dangerouslySetInnerHTML={{__html: message}} /></h4>
                                        </Col>
                                    </Row>
                                    <hr />
                                </FormGroup>
                            }

                            <Row>
                                <Col md={12}>
                                    <ControlLabel>Login</ControlLabel>
                                    <FormGroup className="has-feedback">
                                        <Control.text
                                            type="text"
                                            required
                                            className="form-control"
                                            model={'login.loginForm'}
                                            autoFocus={true}
                                            onChange = {() => this.clearLoginError()}
                                        />
                                        <TiMail className="form-control-feedback h2" style={{marginTop: 5, marginRight: 5, height: 0.9+"em", width: 0.9+'em'}}/>
                                    </FormGroup>
                                    <Errors
                                        className="errors"
                                        model={'login.loginForm'}
                                        show="touched"
                                        messages={{
                                            valueMissing: 'Login is required',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col md={12}>
                                    <ControlLabel>Password</ControlLabel>
                                    <FormGroup className="has-feedback">
                                        <Control
                                            type="password"
                                            required
                                            className="form-control"
                                            model={'login.password'}
                                            onChange = {() => this.clearLoginError()}
                                        />
                                        <TiLockClosedOutline className="form-control-feedback h2" style={{marginTop: 5, marginRight: 5, height: 0.9+"em", width: 0.9+'em'}}/>
                                    </FormGroup>
                                    <Errors
                                        className="errors"
                                        model={'login.password'}
                                        show="touched"
                                        messages={{
                                            valueMissing: 'Password is required',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Errors className="errors"
                                        model="login"
                                        wrapper={(props) =>
                                            <Alert bsStyle="danger" style={{marginBottom: 0}}>
                                                <FormGroup className="text-center" style={{marginBottom: 0}}>
                                                    <h4 style={{marginBottom: 0}}><span><TiWarningOutline style={{marginTop: -10, height: 1.7+"em", width: 1.7+'em'}}/>&nbsp;&nbsp;{props.children}</span></h4>
                                                </FormGroup>
                                            </Alert>
                                        }
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        <Row>
                            <Col md={12}>
                                <a href={forgotPasswordLink} target="_blank">Forgot Password?</a>
                            </Col>
                        </Row>
                        <Row className="text-center">
                            <Col md={12}>
                                <Button bsStyle="primary"
                                    onClick = {() => this.handlePostLogin()}
                                >
                                    &nbsp;&nbsp;&nbsp;&nbsp;Log in&nbsp;&nbsp;&nbsp;&nbsp;
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </FormGroup>
        )
    }
}

export default BootsrapLoginModal;
