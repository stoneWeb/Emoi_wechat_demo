'use strict';
import React, { Component } from 'react';

class ContentEditable extends Component {
	render(){
        return <div 
            onInput={this.emitChange.bind(this)} 
            onBlur={this.emitChange.bind(this)}
            onKeyDown={this.keyDownHandler.bind(this)}
            className="input_box"
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.html}}></div>
    }
    shouldComponentUpdate(nextProps){
        return nextProps.html !== React.findDOMNode(this).innerHTML;
    }
    keyDownHandler(ev){
    	if(ev.which == 13){
			return (this.props.onEnter || function(){})(ev)
		}
    }
    emitChange(ev){
        var html = ev.target.innerHTML;
        if (html !== this.lastHtml) {
        	(this.props.senderChange || function(){})({
                    value: html,
                    text: ev.target.textContent
                });
        }
        this.lastHtml = html;
    }
}

export default ContentEditable