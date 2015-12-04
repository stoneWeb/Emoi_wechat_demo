'use strict';
import React, { Component } from 'react';

class ListItem extends Component {
	renderText(text){
		return (
			<div className="list me">
				<span className="head"></span>
				<div className="msg">{text}</div>
			</div>
		)
	}
	render(){
		let cls = typeof this.props.html == 'object'?'msg nostyle':'msg';
		return (
			<div className="list me">
				<span className="head"></span>
				<div className={cls}>{this.props.html}</div>
			</div>
		)
	}
}

export default ListItem
