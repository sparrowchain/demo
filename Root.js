import App from './App';
import React,{Component} from 'react';
import {Provider} from 'mobx-react';
import Store from './Store';

export default class Root extends Component{
  render(){
    return(
      <Provider store={new Store()}>
        <App/>
      </Provider>
    );
  }

}
