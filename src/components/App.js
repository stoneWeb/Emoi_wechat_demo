'use strict';
import React, { Component } from 'react';
import Main from './Main';
import ChatSender from './ChatSender';
import FaceList from './FaceList';
import { EventEmitter } from '../util/util';

export default class App extends Component {
	constructor(){
		super();
		this.state = {
			input: {
				html: '',
				text: ''
			},
			list: []
		};
	}
	scrollBottom(){
		setTimeout(() => {
			this.mainDom.scrollTop = this.mainDom.scrollHeight
		}, 0)
	}
	componentDidMount(){
		this.mainDom = document.querySelector('#main');
		EventEmitter.on('clickface', (data) => {
			let val = this.state.list;
			val.push({
				html: <div><img src={data.src}/></div>
			});
			this.setState({
				input: {
					html: '',
					text: ''
				},
				list: val
			});
			document.querySelector('.input_box').innerHTML = '';
			this.scrollBottom()
		});
	}
	componentWillUnmount(){
		EventEmitter.off('clickface');
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
			html: this.state.input.html
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
		this.scrollBottom()
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
