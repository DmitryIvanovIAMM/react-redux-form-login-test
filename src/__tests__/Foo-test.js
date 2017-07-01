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

      // try to find button as simple DOM element in rendered component
      let button1 = login.find('button').first();
      console.log(button1);
      button1.simulate('click');        // throw an error as we found nothing

      // try to find button as Button element in rendered component
      /*let button2 = login.find(Button).first();
      console.log(button2);
      button2.simulate('click');*/        // throw an error as we found nothing

      // try to find button as simple DOM element in nested Modal
      /*let modalChild = login.find(Modal).first();
      let button3 = modalChild.find('button').first();
      console.log(button3);
      button3.simulate('click');*/        // throw an error as we found nothing

      // try to find button as Button element in nested Modal
      /*let modalChild = login.find(Modal).first();
      let button4 = modalChild.find(Button).first();
      console.log(button4);
      button4.simulate('click');*/        // throw an error as we found nothing

  });

});
