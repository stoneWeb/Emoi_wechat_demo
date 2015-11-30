'use strict';
import React, { Component } from 'react';
import ListItem from './ListItem';
import { EventEmitter } from '../util/util';

class Main extends Component {
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
			if(e.openCls){
				//this.refs.main.getDOMNode().scrollTop = 9999;
			}
		});
	}
	componentWillUnmount(){
		EventEmitter.off('openFaceBox');
	}
	clickEvent(){
		EventEmitter.trigger('openFaceBox', {openCls: ''})
	}
	render(){
		return (
			<div id="main" className={this.state.openCls} ref="main" onClick={this.clickEvent.bind(this)}>
				<div className="list">
					<span className="head"></span>
					<div className="msg">
						你随便输入点什么...
					</div>
				</div>
				{this.props.list.map((item, index) => {
					return <ListItem {...item} {...this.props}/>
				})}
			</div>
		)
	}
}

export default Main
