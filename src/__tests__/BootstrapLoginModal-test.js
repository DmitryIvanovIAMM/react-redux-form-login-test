import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount, render, ReactWrapper } from 'enzyme';
import { modelReducer, formReducer, Control } from "react-redux-form";
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import LoginModal from '../components/BootsrapLoginModal';
import { FormGroup, Row, Col, Button, Modal, ControlLabel, Alert } from 'react-bootstrap';
import sinon from 'sinon';


function setup() {
  const initialState = {
      message: 'test store login message',
      login: '',
      loginForm: '',
      password: '',
      id_token: '',
      isUserLoggedIn: false,
      modalIsOpen: true,
      afterPostSubmitFunction: null
  };
  const store = createStore(combineReducers({
      testForm: formReducer('login'),
      test: modelReducer('login', { initialState }),
  }));

  const enzymeWrapper = mount(
      <Provider store={store}>
          <LoginModal
              dispatch={store.dispatch}
              store={initialState}
          />
      </Provider>
  );

  return enzymeWrapper;
}

describe('LoginModal', function() {

  it('should render without throwing an error', function() {
      const enzymeWrapper = setup();
      //console.log(enzymeWrapper.debug());
      const portalWrapper = new ReactWrapper(
         enzymeWrapper.find(Modal).node.portal, true
      )
      console.log(portalWrapper.debug());
  });
});
