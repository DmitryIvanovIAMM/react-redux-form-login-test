import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount, render, ReactWrapper } from 'enzyme';
import { modelReducer, formReducer, Control } from "react-redux-form";
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import LoginModal from '../components/LoginModal';
import ReactModal from 'react-modal';
import { FormGroup, Row, Col, Button, ControlLabel, Alert } from 'react-bootstrap';
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
      const onButtonClick = sinon.spy();
      const portalWrapper = new ReactWrapper(
         enzymeWrapper.find(ReactModal).node.portal, true
      )

      const usernameInput = portalWrapper.find('input');
      usernameInput.get(0).value = "test";
      usernameInput.first().simulate('change');
      console.log(usernameInput);
      const loginBtn = portalWrapper.find('button');
      loginBtn.simulate('click');
      console.log(portalWrapper.find('input').first().html());

  });
});
