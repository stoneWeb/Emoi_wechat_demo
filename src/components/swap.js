'use strict'
import { Component } from 'react';
import { EventEmitter } from '../util/util';

class Swap extends Component {
    constructor(){
      super();
      this.state = {
        data: []
      }
      this.w = window.innerWidth;
      this.loaded = true;
      this.swapParams = null;
    }
    componentDidMount(){
      this.input = document.querySelector('.input_box');
      EventEmitter.on('onopen', (e) => {
        var q = e.query || this.input.textContent.trim();
        if(q && q != this.query){
          this.query = q;
          this.loaded = false;
          this.request({
            q: q,
            r: 16
          })
          .then(res => res.json())
          .then((data) => {
            if(data && data.docs){
              this.setState({
                data: data.docs
              });
            }
            this.loaded = true;
          })
          .catch((e) => {
            this.loaded = true;
          });
          this.refs.swap.getDOMNode().style['transform'] = "translate3d(0, 0, 0)";
        }
  		});
    }
    componentWillUnmount(){
  		EventEmitter.off('onopen');
  	}
    request(q){
      q.s = q.s || 0;
  		q.r = q.r || 4;
  		q.m = q.m || 'default';
  		q.m = q.m == "Version4"?(q.m+'&rerank_count=1&prefetc=1'):q.m;
      let url = 'http://bumblebing-dev.chinacloudapp.cn/chat/searchText?q='+encodeURIComponent(q.q)+'&s='+q.s+'&r='+q.r+"&m="+q.m+'&cache=false';
      if('undefined' != typeof window.fetch){
        return fetch(url)
      }
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let handler = () => {
          if(xhr.readyState == 4){
            if(xhr.status == 200){
              let data = {
                data: xhr.responseText,
                json(){
                  try{
                    return JSON.parse(this.data)
                  }catch(ex){
                    return null
                  }
                }
              }
              resolve(data)
            }else{
              reject(new Error(this.statusText))
            }
          }
        }
        xhr.open('GET', url, true);
        xhr.onreadystatechange = handler;
        xhr.send();
      });
    }
    onMore(){
      var _this = this;
      this.loaded = false;
      this.request({
        q: _this.query,
        s: _this.state.data.length,
        r: 16
      })
      .then(res => res.json())
      .then((data) => {
        this.setState({
          data: this.state.data.concat(data.docs)
        });
        this.loaded = true;
      })
      .catch((e) => {
        this.loaded = true;
      })
    }
    nodata(){
      return (
        <span className="swap-tips">...</span>
      )
    }
    loading(){
      return (
        <div className="face-loading">...</div>
      )
    }
    renderItem(data){
      let html = [];
      for(let k of data){
        html.push(<span className="face-item-click" data-src={k.thumb} style={{backgroundImage: "url("+ k.thumb +")"}}></span>)
      }
      return html
    }
    clickEvent(e){
      if(e.target.className == "face-item-click"){
        var url = e.target.getAttribute('data-src');
        EventEmitter.trigger('clickface', {src: url})
      }
    }
    touchStart(e){
      if(this.swapParams){
        return
      }
      let dom = this.refs.swap.getDOMNode();
      dom.style['transitionDuration'] = "0ms";

      this.swapParams = {
        x: e.touches[0].pageX,
        time: Date.now(),
        dom: dom,
        l: parseInt(dom.style["transform"].match(/\(([^,]+),/)[1] || 0),
        d: this.l,
        isSwap: 0,
        w: this.getWidth()
      }

    }
    touchMove(e){
      if(!this.swapParams
          || this.swapParams.isSwap == 1
          || e.touches && e.touches.length > 1
          || e.scale && e.scale !== 1){
        return
      }

      let x = e.touches[0].pageX, diffX = x - this.swapParams.x;
      this.swapParams.d = this.swapParams.l + diffX;
      this.swapParams.dom.style['transform'] = "translate3d("+ this.swapParams.d +"px, 0, 0)";
      e.preventDefault();
      e.stopPropagation();
    }
    touchEnd(e){
      if(this.swapParams){
        let diff = Math.abs(this.swapParams.d - this.swapParams.l),
            diffTime = Date.now() - this.swapParams.time < 300,
            min = 0,
            dom = this.swapParams.dom,
            max = -this.swapParams.w+this.w,
            x;

        if(diff > 20 && diffTime){
          x = this.swapParams.l + (this.swapParams.d - this.swapParams.l>1?this.w:-this.w);
        }else{
          x = Math.round(this.swapParams.d/this.w) * this.w;
        }

        x = Math.min(0, x);
        x = Math.max(max, x);

        if(this.state.data.length % 8 == 0 && this.loaded){
          this.onMore();
        }
        dom.style['transitionDuration'] = "300ms";
        dom.style['transform'] = "translate3d("+ x +"px, 0, 0)";

      }
      this.swapParams = null;

    }
    getWidth(){
      let len = this.state.data.length;
      let w = Math.ceil(this.state.data.length / 8) * this.w;
      if(len%8 == 0){
        return w + this.w
      }
      return w;
    }
    renderSwapData(){
      let { data } = this.state;
      let html = [];
      if(!data.length){
        html = this.nodata()
      }else{
        let len = Math.ceil(data.length / 8);
        for(let i=0; i< len; i++){
          html.push(<div className="face-swap-item" style={{width: this.w + 'px'}}>{this.renderItem(data.slice(i*8, i*8+8))}</div>);
        }
        if(data.length%8 == 0){
          html.push(<div className="face-swap-item" style={{width: this.w + 'px'}}><div className="face-loading">...</div></div>)
        }
      }
      return html
    }
    render(){
      return (
        <div
          className="face-swap"
          ref="swap"
          onClick={(...args) => {this.clickEvent.apply(this, args)}}
          onTouchStart={(...args) => {this.touchStart.apply(this, args)}}
          onTouchMove={(...args) => {this.touchMove.apply(this, args)}}
          onTouchEnd={(...args) => {this.touchEnd.apply(this, args)}}
          style={{width: this.getWidth(), transitionDuration: 0, transform: 'translate3d(0,0,0)'}}
        >
            {this.renderSwapData()}
        </div>
      )
    }
}
export default Swap
