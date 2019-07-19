import React from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/store.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';

const store= ConfigureStore();

function App() {
  return ( 
    <Provider store={store}>
    <BrowserRouter>
      <div className="App">
       <Main/>
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
