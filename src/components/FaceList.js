'use strict';
import React, { Component } from 'react';
import { EventEmitter } from '../util/util';


class FaceList extends Component {
	constructor(){
		super();
		this.state = {
			openCls: ''
		};
	}
	componentDidMount(){
		EventEmitter.on('openFaceBox', (e) => {
			this.setState({
				openCls: e.openCls
			})
		});
	}
	componentWillUnmount(){
		EventEmitter.off('openFaceBox');
	}
	render(){
		return (
			<div className={"facebox " + this.state.openCls}>

			</div>
		)
	}
}

export default FaceList
