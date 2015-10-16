'use strict';
import React, { Component } from 'react';


class FaceList extends Component {
	constructor(){
		super();
		this.state = {
			qqface: [],
			emoiface: []
		};
	}
	render(){
		return (
			<div className="facebox">
				<div className="facecontent">
					<ul className="defface">
					</ul>
					<ul className="emoiface">
						<li data-tid="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdzP75K8hzuvCwh91dxMuMCUtz6hXxh_9rPkJuXV2OM12W7IJXug" style="background-image:url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdzP75K8hzuvCwh91dxMuMCUtz6hXxh_9rPkJuXV2OM12W7IJXug)"></li>
						<li data-tid="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT03FlzdGUiMGLO0x9AbqZ1_A-Vp7758bbSuRnEE0oKQEOOhWIN" style="background-image:url(https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT03FlzdGUiMGLO0x9AbqZ1_A-Vp7758bbSuRnEE0oKQEOOhWIN)"></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</div>
			</div>
		)
	}
}

export default FaceList