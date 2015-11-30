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
	handlerClick(...args){
		this.props.onEnter.apply(this, args)
	}
	inputFocus(){
		this.setState({
			openCls: ''
		});
		EventEmitter.trigger('openFaceBox', {openCls: ''})
	}
	inputBlur(){

	}
	handlerFaceBtnTouch(){
		EventEmitter.trigger('textBoxBlur', {});
		this.setState({
			openCls: 'open'
		});
		EventEmitter.trigger('openFaceBox', {openCls: 'open'});
		EventEmitter.trigger('onopen', {})
	}
	render(){
		return (
			<div id="sendmsg" className={this.state.openCls}>
				<ContentEditable {...this.props} inputFocus={this.inputFocus.bind(this)} inputBlur={this.inputBlur.bind(this)}/>
				<span className="facebtn" onTouchStart={this.handlerFaceBtnTouch.bind(this)}></span>
			</div>
		)
	}
}

export default ChatSender
