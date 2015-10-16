'use strict';
import React, { Component } from 'react';
import Head from './Head';
import Main from './Main';
import ChatSender from './ChatSender';


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
			html: medium.value(),
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
			<div id="wrap">
				<Head title="Emoi" />
				<Main list={this.state.list} />
				<ChatSender 
					senderChange={this.senderChange.bind(this)} 
					onEnter={this.senderEnter.bind(this)} />
			</div>
		)
	}
}