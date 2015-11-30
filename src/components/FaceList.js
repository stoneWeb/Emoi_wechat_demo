'use strict';
import React, { Component } from 'react';
import { EventEmitter } from '../util/util';
import Swap from './swap';

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
				<div className="face-wrap">
					<Swap></Swap>
				</div>
				<div className="face-tab-btn">
					<span className="face-add ion-plus-round"></span>
					<span className="face-emoi"></span>
					<span className="face-def ion-android-happy"></span>
				</div>
			</div>
		)
	}
}

export default FaceList
