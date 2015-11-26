'use strict';
import './css/ionicons.min.css';
import './css/style.css';

import App from './components/App';
import React from 'react';


if(typeof document != 'undefined'){
	React.initializeTouchEvents(true);
	React.render(<App />, document.querySelector('#content'));
}

export default App
