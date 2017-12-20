import React from 'react';
import App from './containers/app';
import {Route} from 'react-router-dom';

export default class Routes extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={App} />
      </div>
    )
  }
}