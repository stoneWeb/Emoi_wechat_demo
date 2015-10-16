'use strict';
import './css/ionicons.min.css';
import './css/style.css';

import App from './components/App';
import React from 'react';


if(typeof document != 'undefined'){
	React.render(<App />, document.querySelector('#content'));
	window.medium = new Medium({
					element: document.querySelector('.input_box'),
					mode: Medium.richMode,
					attributes: null,
					tags: null
			});
}

export default App