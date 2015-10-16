import React, { Component } from 'react';

class ListItem extends Component {
	render(){
		return (
			<div className="list me">
				<span class="head"></span>
				<div class="msg">{this.props.text}</div>
			</div>
		)
	}
}

export default ListItem