'use strict';
import React, { Component } from 'react';
import Main from './Main';
import ChatSender from './ChatSender';
import FaceList from './FaceList';

export default class App extends Component {
	constructor(){
		super();
		this.state = {
			input: {
				html: '',
				text: ''
			},
			list: [{text: 'hello world!'}]
		};
	}
	senderChange(value){
		this.state.input = {
			html: value.html,
			text: value.text
		}
	}
	senderEnter(ev){

		if(!this.state.input.html)return false;
		let val = this.state.list;
		val.push({
			text: this.state.input.html
		});
		this.setState({
			input: {
				html: '',
				text: ''
			},
			list: val
		});
		document.querySelector('.input_box').innerHTML = '';
		document.querySelector('.input_box').focus();
		return false
	}
	render(){
		return (
			<div>
				<div id="wrap">
					<Main list={this.state.list} />
				</div>
				<ChatSender senderChange={this.senderChange.bind(this)} onEnter={this.senderEnter.bind(this)} />
				<FaceList></FaceList>
			</div>
		)
	}
}
