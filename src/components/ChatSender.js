'use strict';
import React, { Component } from 'react';
import ContentEditable from './ContentEditable';

class ChatSender extends Component {
	handlerClick(ev){
		this.props.onEnter(ev)
	}
	render(){
		return (
			<div id="sendmsg">
				<div className="sendbar">
					<span className="face ion-android-happy"></span>
					<span className="face icon-emoi"></span>
				</div>
				<ContentEditable {...this.props} />
				<div className="sendbtmbar">
					<input type="button" className="sendbtn" onClick={this.handlerClick.bind(this)} value="发送(S)" />
				</div>
			</div>
		)
	}
}

export default ChatSender