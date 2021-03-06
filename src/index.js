import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<div>
    <div className="navbar" >
      <div className="navbar-brand">
          <a className="navbar-item image" href="https://erc20exchange.herokuapp.com/">
              <img src="https://image.flaticon.com/icons/png/32/1475/1475932.png" width="30" height="36"/>  
              <p className="has-text-weight-semibold"> AltExchange</p>
          </a>
      </div>
    </div>
    <App />
</div>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
