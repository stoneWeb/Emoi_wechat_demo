'use strict';
import React, { Component } from 'react';
import { EventEmitter } from '../util/util';

class ContentEditable extends Component {
		render(){
        return <div
						ref="textBox"
            onInput={this.emitChange.bind(this)}
            onBlur={this.emitChange.bind(this)}
						onFocus={this.props.inputFocus}
            onKeyDown={this.keyDownHandler.bind(this)}
            className="input_box"
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.html}}></div>
    }
		componentDidMount(){
			EventEmitter.on('textBoxBlur', (e) => {
				this.refs.textBox.getDOMNode().blur()
			});
		}
		componentWillUnmount(){
			EventEmitter.off('textBoxBlur');
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
				if('blur' == ev.type){
					this.props.inputBlur(ev);
				}
				//inputBlur
        var html = ev.target.innerHTML;
        if (html !== this.lastHtml) {
        	(this.props.senderChange || function(){})({
                    html: html,
                    text: ev.target.textContent
                });
        }
        this.lastHtml = html;
    }
}

export default ContentEditable
