'use strict';
import React, { Component } from 'react';
import ListItem from './ListItem';

class Main extends Component {
	render(){
		return (
			<div id="main">
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