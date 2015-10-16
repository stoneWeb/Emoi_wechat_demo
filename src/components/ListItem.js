'use strict';
import React, { Component } from 'react';

class ListItem extends Component {
	render(){
		return (
			<div className="list me">
				<span className="head"></span>
				<div className="msg">{this.props.text}</div>
			</div>
		)
	}
}

export default ListItem