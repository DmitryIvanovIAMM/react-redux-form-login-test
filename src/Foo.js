import React, { Component } from 'react';
import { FormGroup, Row, Col, Modal, Button, ControlLabel, Alert,  } from 'react-bootstrap';
import { Control, Errors, actions } from 'react-redux-form';

export class LoginModal extends Component {

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

    }

    render() {
        const { message, modalIsOpen } = this.props.store;

        return (
            <FormGroup>
              <Modal show={modalIsOpen}
                     keyboard={true}
                     onHide={() => this.onHide()}
                     onEnter={() => this.onEnter()}
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
                      <a href='' target="_blank">Forgot Password?</a>
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

export default LoginModal;
