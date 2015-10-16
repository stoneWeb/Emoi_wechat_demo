import React, { Component } from 'react';
import Head from './Head';
import Main from './Main';

export default class App extends Component {
	constructor(){
        super();
        this.state = {
            list: []
        };
    }
	render(){
		return (
			<div id="wrap">
				<Head title="Emoi" />
				<Main list={this.state.list} />
			</div>
		)
	}
}