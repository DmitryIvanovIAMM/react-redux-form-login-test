import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 
import { shallow, mount, render } from 'enzyme';
import { modelReducer, formReducer, Control } from "react-redux-form";
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import LoginModal from '../Foo';
import { FormGroup, Row, Col, Modal, Button, ControlLabel, Alert } from 'react-bootstrap';



describe('A suite', function() {
  it('should render without throwing an error', function() {
      const initialState = {
          message: 'test store login message',
          login: '',
          loginForm: '',
          password: '',
          id_token: '',
          isUserLoggedIn: false,
          modalIsOpen: false,
          afterPostSubmitFunction: null
      };

      const store = createStore(combineReducers({
          testForm: formReducer('login'),
          test: modelReducer('login', { initialState }),
      }));

      const login = mount(
          <Provider store={store}>
              <LoginModal
                  dispatch={store.dispatch}
                  store={initialState}
              />
          </Provider>
      );

      let loginModalChild = login.find(LoginModal);
      let buttonChild = login.find(Button);
      let buttonChild2 = loginModalChild.find(Button);
      let inputChild = login.find(Control.text);
      let alertChild = login.find(Alert);
      let alertChild2 = loginModalChild.find(Alert);
      console.log(loginModalChild);
      console.log(buttonChild);
      console.log(buttonChild2);
      console.log(inputChild);
      console.log(alertChild);
      console.log(alertChild2);
  });

});
