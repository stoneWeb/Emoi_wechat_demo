'use strict';
import React, { Component } from 'react';
import ContentEditable from './ContentEditable';
import { EventEmitter } from '../util/util';

class ChatSender extends Component {
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
			});
		});
	}
	componentWillUnmount(){
		EventEmitter.off('openFaceBox');
	}
	handlerClick(...args){
		this.props.onEnter.apply(this, args)
	}
	inputFocus(){
		EventEmitter.trigger('openFaceBox', {openCls: ''})
	}
	inputBlur(){

	}
	handlerFaceBtnTouch(){
		EventEmitter.trigger('textBoxBlur', {});
		EventEmitter.trigger('openFaceBox', {openCls: 'open'});
		EventEmitter.trigger('onopen', {})
	}
	render(){
		return (
			<div id="sendmsg" className={this.state.openCls}>
				<ContentEditable {...this.props} inputFocus={this.inputFocus.bind(this)} inputBlur={this.inputBlur.bind(this)}/>
				<span className="facebtn" onClick={this.handlerFaceBtnTouch.bind(this)}></span>
			</div>
		)
	}
}

export default ChatSender
