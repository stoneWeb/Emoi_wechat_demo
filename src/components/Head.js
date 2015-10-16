import React, { Component } from 'react';


class Head extends Component {
	render(){
		return (
			<div id="header">
				<h1>{this.props.title}</h1>
			</div>
		)
	}
}

export default Head