(function(){const k=document.createElement("link").relList;if(k&&k.supports&&k.supports("modulepreload"))return;for(const dt of document.querySelectorAll('link[rel="modulepreload"]'))ct(dt);new MutationObserver(dt=>{for(const _ of dt)if(_.type==="childList")for(const vt of _.addedNodes)vt.tagName==="LINK"&&vt.rel==="modulepreload"&&ct(vt)}).observe(document,{childList:!0,subtree:!0});function st(dt){const _={};return dt.integrity&&(_.integrity=dt.integrity),dt.referrerPolicy&&(_.referrerPolicy=dt.referrerPolicy),dt.crossOrigin==="use-credentials"?_.credentials="include":dt.crossOrigin==="anonymous"?_.credentials="omit":_.credentials="same-origin",_}function ct(dt){if(dt.ep)return;dt.ep=!0;const _=st(dt);fetch(dt.href,_)}})();const _registered=new Map;let _active=!1,_timer=null,_keys=[],_idx=0;const POLL_INTERVAL=1500,FETCH_TIMEOUT=3e3,MAX_QUEUE=8;function registerPoll($,k,st){if(_keys.length>=MAX_QUEUE&&!_registered.has($))for(let ct=0;ct<_keys.length;ct++){const dt=_keys[ct];if(dt!=="common"){_registered.delete(dt),_keys.splice(ct,1),_idx>_keys.length&&(_idx=0);break}}_registered.set($,{url:k,callback:st,etag:null}),_keys=Array.from(_registered.keys()),_timer||_schedule()}function unregisterPoll($){const k=_registered.get($);k&&(k.callback=function(){}),_registered.delete($),_keys=Array.from(_registered.keys()),_keys.length===0&&_clearTimer()}function _clearTimer(){clearTimeout(_timer),_timer=null}function _schedule(){_clearTimer(),_timer=setTimeout(_tick,POLL_INTERVAL)}async function _tick(){if(_active){_schedule();return}if(_keys.length===0){_clearTimer();return}_active=!0,_idx>=_keys.length&&(_idx=0);const $=_keys[_idx++],k=_registered.get($);if(k){const st=new AbortController,ct=setTimeout(function(){st.abort()},FETCH_TIMEOUT);try{const dt={};k.etag&&(dt["If-None-Match"]=k.etag);const _=await fetch(k.url,{signal:st.signal,cache:"no-store",headers:dt});clearTimeout(ct);const vt=_.headers.get("ETag");if(vt&&(k.etag=vt),_.status!==304){if(_.ok){const oe=await _.json();k.callback(oe)}}}catch(dt){clearTimeout(ct),dt.name!=="AbortError"&&console.warn("[pollQueue] "+$+": "+dt.message),k&&(k.etag=null)}}_active=!1,_keys.length>0?_schedule():_clearTimer()}var t,n,e,r,o,u,i,l,c,a,s,f={},p=[],h=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,d=Array.isArray;function v($,k){for(var st in k)$[st]=k[st];return $}function m($){var k=$.parentNode;k&&k.removeChild($)}function y($,k,st){var ct,dt,_,vt={};for(_ in k)_=="key"?ct=k[_]:_=="ref"?dt=k[_]:vt[_]=k[_];if(arguments.length>2&&(vt.children=arguments.length>3?t.call(arguments,2):st),typeof $=="function"&&$.defaultProps!=null)for(_ in $.defaultProps)vt[_]===void 0&&(vt[_]=$.defaultProps[_]);return g($,vt,ct,dt,null)}function g($,k,st,ct,dt){var _={type:$,props:k,key:st,ref:ct,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:dt??++e,__i:-1,__u:0};return dt==null&&n.vnode!=null&&n.vnode(_),_}function b($){return $.children}function C($,k){this.props=$,this.context=k}function x($,k){if(k==null)return $.__?x($.__,$.__i+1):null;for(var st;k<$.__k.length;k++)if((st=$.__k[k])!=null&&st.__e!=null)return st.__e;return typeof $.type=="function"?x($):null}function w($){var k,st;if(($=$.__)!=null&&$.__c!=null){for($.__e=$.__c.base=null,k=0;k<$.__k.length;k++)if((st=$.__k[k])!=null&&st.__e!=null){$.__e=$.__c.base=st.__e;break}return w($)}}function P($){(!$.__d&&($.__d=!0)&&r.push($)&&!U.__r++||o!==n.debounceRendering)&&((o=n.debounceRendering)||u)(U)}function U(){var $,k,st,ct,dt,_,vt,oe;for(r.sort(i);$=r.shift();)$.__d&&(k=r.length,ct=void 0,_=(dt=(st=$).__v).__e,vt=[],oe=[],st.__P&&((ct=v({},dt)).__v=dt.__v+1,n.vnode&&n.vnode(ct),M(st.__P,ct,dt,st.__n,st.__P.namespaceURI,32&dt.__u?[_]:null,vt,_??x(dt),!!(32&dt.__u),oe),ct.__v=dt.__v,ct.__.__k[ct.__i]=ct,L(vt,ct,oe),ct.__e!=_&&w(ct)),r.length>k&&r.sort(i));U.__r=0}function H($,k,st,ct,dt,_,vt,oe,Xt,Yt,ee){var Zt,re,ae,pe,ve,$e=ct&&ct.__k||p,ie=k.length;for(st.__d=Xt,E(st,k,$e),Xt=st.__d,Zt=0;Zt<ie;Zt++)(ae=st.__k[Zt])!=null&&typeof ae!="boolean"&&typeof ae!="function"&&(re=ae.__i===-1?f:$e[ae.__i]||f,ae.__i=Zt,M($,ae,re,dt,_,vt,oe,Xt,Yt,ee),pe=ae.__e,ae.ref&&re.ref!=ae.ref&&(re.ref&&F(re.ref,null,ae),ee.push(ae.ref,ae.__c||pe,ae)),ve==null&&pe!=null&&(ve=pe),65536&ae.__u||re.__k===ae.__k?(Xt&&!Xt.isConnected&&(Xt=x(re)),Xt=S(ae,Xt,$)):typeof ae.type=="function"&&ae.__d!==void 0?Xt=ae.__d:pe&&(Xt=pe.nextSibling),ae.__d=void 0,ae.__u&=-196609);st.__d=Xt,st.__e=ve}function E($,k,st){var ct,dt,_,vt,oe,Xt=k.length,Yt=st.length,ee=Yt,Zt=0;for($.__k=[],ct=0;ct<Xt;ct++)vt=ct+Zt,(dt=$.__k[ct]=(dt=k[ct])==null||typeof dt=="boolean"||typeof dt=="function"?null:typeof dt=="string"||typeof dt=="number"||typeof dt=="bigint"||dt.constructor==String?g(null,dt,null,null,null):d(dt)?g(b,{children:dt},null,null,null):dt.constructor===void 0&&dt.__b>0?g(dt.type,dt.props,dt.key,dt.ref?dt.ref:null,dt.__v):dt)!=null?(dt.__=$,dt.__b=$.__b+1,oe=D(dt,st,vt,ee),dt.__i=oe,_=null,oe!==-1&&(ee--,(_=st[oe])&&(_.__u|=131072)),_==null||_.__v===null?(oe==-1&&Zt--,typeof dt.type!="function"&&(dt.__u|=65536)):oe!==vt&&(oe===vt+1?Zt++:oe>vt?ee>Xt-vt?Zt+=oe-vt:Zt--:oe<vt?oe==vt-1&&(Zt=oe-vt):Zt=0,oe!==ct+Zt&&(dt.__u|=65536))):(_=st[vt])&&_.key==null&&_.__e&&(131072&_.__u)==0&&(_.__e==$.__d&&($.__d=x(_)),I(_,_,!1),st[vt]=null,ee--);if(ee)for(ct=0;ct<Yt;ct++)(_=st[ct])!=null&&(131072&_.__u)==0&&(_.__e==$.__d&&($.__d=x(_)),I(_,_))}function S($,k,st){var ct,dt;if(typeof $.type=="function"){for(ct=$.__k,dt=0;ct&&dt<ct.length;dt++)ct[dt]&&(ct[dt].__=$,k=S(ct[dt],k,st));return k}$.__e!=k&&(st.insertBefore($.__e,k||null),k=$.__e);do k=k&&k.nextSibling;while(k!=null&&k.nodeType===8);return k}function A($,k){return k=k||[],$==null||typeof $=="boolean"||(d($)?$.some((function(st){A(st,k)})):k.push($)),k}function D($,k,st,ct){var dt=$.key,_=$.type,vt=st-1,oe=st+1,Xt=k[st];if(Xt===null||Xt&&dt==Xt.key&&_===Xt.type&&(131072&Xt.__u)==0)return st;if(ct>(Xt!=null&&(131072&Xt.__u)==0?1:0))for(;vt>=0||oe<k.length;){if(vt>=0){if((Xt=k[vt])&&(131072&Xt.__u)==0&&dt==Xt.key&&_===Xt.type)return vt;vt--}if(oe<k.length){if((Xt=k[oe])&&(131072&Xt.__u)==0&&dt==Xt.key&&_===Xt.type)return oe;oe++}}return-1}function N($,k,st){k[0]==="-"?$.setProperty(k,st??""):$[k]=st==null?"":typeof st!="number"||h.test(k)?st:st+"px"}function R($,k,st,ct,dt){var _;t:if(k==="style")if(typeof st=="string")$.style.cssText=st;else{if(typeof ct=="string"&&($.style.cssText=ct=""),ct)for(k in ct)st&&k in st||N($.style,k,"");if(st)for(k in st)ct&&st[k]===ct[k]||N($.style,k,st[k])}else if(k[0]==="o"&&k[1]==="n")_=k!==(k=k.replace(/(PointerCapture)$|Capture$/i,"$1")),k=k.toLowerCase()in $||k==="onFocusOut"||k==="onFocusIn"?k.toLowerCase().slice(2):k.slice(2),$.l||($.l={}),$.l[k+_]=st,st?ct?st.u=ct.u:(st.u=l,$.addEventListener(k,_?a:c,_)):$.removeEventListener(k,_?a:c,_);else{if(dt=="http://www.w3.org/2000/svg")k=k.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(k!="width"&&k!="height"&&k!="href"&&k!="list"&&k!="form"&&k!="tabIndex"&&k!="download"&&k!="rowSpan"&&k!="colSpan"&&k!="role"&&k in $)try{$[k]=st??"";break t}catch{}typeof st=="function"||(st==null||st===!1&&k[4]!=="-"?$.removeAttribute(k):$.setAttribute(k,st))}}function T($){return function(k){if(this.l){var st=this.l[k.type+$];if(k.t==null)k.t=l++;else if(k.t<st.u)return;return st(n.event?n.event(k):k)}}}function M($,k,st,ct,dt,_,vt,oe,Xt,Yt){var ee,Zt,re,ae,pe,ve,$e,ie,we,xe,Ce,Se,Ie,Pe,Me,me=k.type;if(k.constructor!==void 0)return null;128&st.__u&&(Xt=!!(32&st.__u),_=[oe=k.__e=st.__e]),(ee=n.__b)&&ee(k);t:if(typeof me=="function")try{if(ie=k.props,we=(ee=me.contextType)&&ct[ee.__c],xe=ee?we?we.props.value:ee.__:ct,st.__c?$e=(Zt=k.__c=st.__c).__=Zt.__E:("prototype"in me&&me.prototype.render?k.__c=Zt=new me(ie,xe):(k.__c=Zt=new C(ie,xe),Zt.constructor=me,Zt.render=V),we&&we.sub(Zt),Zt.props=ie,Zt.state||(Zt.state={}),Zt.context=xe,Zt.__n=ct,re=Zt.__d=!0,Zt.__h=[],Zt._sb=[]),Zt.__s==null&&(Zt.__s=Zt.state),me.getDerivedStateFromProps!=null&&(Zt.__s==Zt.state&&(Zt.__s=v({},Zt.__s)),v(Zt.__s,me.getDerivedStateFromProps(ie,Zt.__s))),ae=Zt.props,pe=Zt.state,Zt.__v=k,re)me.getDerivedStateFromProps==null&&Zt.componentWillMount!=null&&Zt.componentWillMount(),Zt.componentDidMount!=null&&Zt.__h.push(Zt.componentDidMount);else{if(me.getDerivedStateFromProps==null&&ie!==ae&&Zt.componentWillReceiveProps!=null&&Zt.componentWillReceiveProps(ie,xe),!Zt.__e&&(Zt.shouldComponentUpdate!=null&&Zt.shouldComponentUpdate(ie,Zt.__s,xe)===!1||k.__v===st.__v)){for(k.__v!==st.__v&&(Zt.props=ie,Zt.state=Zt.__s,Zt.__d=!1),k.__e=st.__e,k.__k=st.__k,k.__k.forEach((function(Oe){Oe&&(Oe.__=k)})),Ce=0;Ce<Zt._sb.length;Ce++)Zt.__h.push(Zt._sb[Ce]);Zt._sb=[],Zt.__h.length&&vt.push(Zt);break t}Zt.componentWillUpdate!=null&&Zt.componentWillUpdate(ie,Zt.__s,xe),Zt.componentDidUpdate!=null&&Zt.__h.push((function(){Zt.componentDidUpdate(ae,pe,ve)}))}if(Zt.context=xe,Zt.props=ie,Zt.__P=$,Zt.__e=!1,Se=n.__r,Ie=0,"prototype"in me&&me.prototype.render){for(Zt.state=Zt.__s,Zt.__d=!1,Se&&Se(k),ee=Zt.render(Zt.props,Zt.state,Zt.context),Pe=0;Pe<Zt._sb.length;Pe++)Zt.__h.push(Zt._sb[Pe]);Zt._sb=[]}else do Zt.__d=!1,Se&&Se(k),ee=Zt.render(Zt.props,Zt.state,Zt.context),Zt.state=Zt.__s;while(Zt.__d&&++Ie<25);Zt.state=Zt.__s,Zt.getChildContext!=null&&(ct=v(v({},ct),Zt.getChildContext())),re||Zt.getSnapshotBeforeUpdate==null||(ve=Zt.getSnapshotBeforeUpdate(ae,pe)),H($,d(Me=ee!=null&&ee.type===b&&ee.key==null?ee.props.children:ee)?Me:[Me],k,st,ct,dt,_,vt,oe,Xt,Yt),Zt.base=k.__e,k.__u&=-161,Zt.__h.length&&vt.push(Zt),$e&&(Zt.__E=Zt.__=null)}catch(Oe){k.__v=null,Xt||_!=null?(k.__e=oe,k.__u|=Xt?160:32,_[_.indexOf(oe)]=null):(k.__e=st.__e,k.__k=st.__k),n.__e(Oe,k,st)}else _==null&&k.__v===st.__v?(k.__k=st.__k,k.__e=st.__e):k.__e=W(st.__e,k,st,ct,dt,_,vt,Xt,Yt);(ee=n.diffed)&&ee(k)}function L($,k,st){k.__d=void 0;for(var ct=0;ct<st.length;ct++)F(st[ct],st[++ct],st[++ct]);n.__c&&n.__c(k,$),$.some((function(dt){try{$=dt.__h,dt.__h=[],$.some((function(_){_.call(dt)}))}catch(_){n.__e(_,dt.__v)}}))}function W($,k,st,ct,dt,_,vt,oe,Xt){var Yt,ee,Zt,re,ae,pe,ve,$e=st.props,ie=k.props,we=k.type;if(we==="svg"?dt="http://www.w3.org/2000/svg":we==="math"?dt="http://www.w3.org/1998/Math/MathML":dt||(dt="http://www.w3.org/1999/xhtml"),_!=null){for(Yt=0;Yt<_.length;Yt++)if((ae=_[Yt])&&"setAttribute"in ae==!!we&&(we?ae.localName===we:ae.nodeType===3)){$=ae,_[Yt]=null;break}}if($==null){if(we===null)return document.createTextNode(ie);$=document.createElementNS(dt,we,ie.is&&ie),_=null,oe=!1}if(we===null)$e===ie||oe&&$.data===ie||($.data=ie);else{if(_=_&&t.call($.childNodes),$e=st.props||f,!oe&&_!=null)for($e={},Yt=0;Yt<$.attributes.length;Yt++)$e[(ae=$.attributes[Yt]).name]=ae.value;for(Yt in $e)if(ae=$e[Yt],Yt!="children"){if(Yt=="dangerouslySetInnerHTML")Zt=ae;else if(Yt!=="key"&&!(Yt in ie)){if(Yt=="value"&&"defaultValue"in ie||Yt=="checked"&&"defaultChecked"in ie)continue;R($,Yt,null,ae,dt)}}for(Yt in ie)ae=ie[Yt],Yt=="children"?re=ae:Yt=="dangerouslySetInnerHTML"?ee=ae:Yt=="value"?pe=ae:Yt=="checked"?ve=ae:Yt==="key"||oe&&typeof ae!="function"||$e[Yt]===ae||R($,Yt,ae,$e[Yt],dt);if(ee)oe||Zt&&(ee.__html===Zt.__html||ee.__html===$.innerHTML)||($.innerHTML=ee.__html),k.__k=[];else if(Zt&&($.innerHTML=""),H($,d(re)?re:[re],k,st,ct,we==="foreignObject"?"http://www.w3.org/1999/xhtml":dt,_,vt,_?_[0]:st.__k&&x(st,0),oe,Xt),_!=null)for(Yt=_.length;Yt--;)_[Yt]!=null&&m(_[Yt]);oe||(Yt="value",pe!==void 0&&(pe!==$[Yt]||we==="progress"&&!pe||we==="option"&&pe!==$e[Yt])&&R($,Yt,pe,$e[Yt],dt),Yt="checked",ve!==void 0&&ve!==$[Yt]&&R($,Yt,ve,$e[Yt],dt))}return $}function F($,k,st){try{typeof $=="function"?$(k):$.current=k}catch(ct){n.__e(ct,st)}}function I($,k,st){var ct,dt;if(n.unmount&&n.unmount($),(ct=$.ref)&&(ct.current&&ct.current!==$.__e||F(ct,null,k)),(ct=$.__c)!=null){if(ct.componentWillUnmount)try{ct.componentWillUnmount()}catch(_){n.__e(_,k)}ct.base=ct.__P=null}if(ct=$.__k)for(dt=0;dt<ct.length;dt++)ct[dt]&&I(ct[dt],k,st||typeof $.type!="function");st||$.__e==null||m($.__e),$.__c=$.__=$.__e=$.__d=void 0}function V($,k,st){return this.constructor($,st)}function O($,k,st){var ct,dt,_,vt;n.__&&n.__($,k),dt=(ct=!1)?null:k.__k,_=[],vt=[],M(k,$=k.__k=y(b,null,[$]),dt||f,f,k.namespaceURI,dt?null:k.firstChild?t.call(k.childNodes):null,_,dt?dt.__e:k.firstChild,ct,vt),L(_,$,vt)}function j($,k,st){var ct,dt,_,vt,oe=v({},$.props);for(_ in $.type&&$.type.defaultProps&&(vt=$.type.defaultProps),k)_=="key"?ct=k[_]:_=="ref"?dt=k[_]:oe[_]=k[_]===void 0&&vt!==void 0?vt[_]:k[_];return arguments.length>2&&(oe.children=arguments.length>3?t.call(arguments,2):st),g($.type,oe,ct||$.key,dt||$.ref,null)}function q($,k){var st={__c:k="__cC"+s++,__:$,Consumer:function(ct,dt){return ct.children(dt)},Provider:function(ct){var dt,_;return this.getChildContext||(dt=[],(_={})[k]=this,this.getChildContext=function(){return _},this.shouldComponentUpdate=function(vt){this.props.value!==vt.value&&dt.some((function(oe){oe.__e=!0,P(oe)}))},this.sub=function(vt){dt.push(vt);var oe=vt.componentWillUnmount;vt.componentWillUnmount=function(){dt.splice(dt.indexOf(vt),1),oe&&oe.call(vt)}}),ct.children}};return st.Provider.__=st.Consumer.contextType=st}t=p.slice,n={__e:function($,k,st,ct){for(var dt,_,vt;k=k.__;)if((dt=k.__c)&&!dt.__)try{if((_=dt.constructor)&&_.getDerivedStateFromError!=null&&(dt.setState(_.getDerivedStateFromError($)),vt=dt.__d),dt.componentDidCatch!=null&&(dt.componentDidCatch($,ct||{}),vt=dt.__d),vt)return dt.__E=dt}catch(oe){$=oe}throw $}},e=0,C.prototype.setState=function($,k){var st;st=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=v({},this.state),typeof $=="function"&&($=$(v({},st),this.props)),$&&v(st,$),$!=null&&this.__v&&(k&&this._sb.push(k),P(this))},C.prototype.forceUpdate=function($){this.__v&&(this.__e=!0,$&&this.__h.push($),P(this))},C.prototype.render=b,r=[],u=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=function($,k){return $.__v.__b-k.__v.__b},U.__r=0,l=0,c=T(!1),a=T(!0),s=0;var B,K,z,G,J=0,Q=[],X=[],Y=n,Z=Y.__b,tt=Y.__r,nt=Y.diffed,et=Y.__c,_t=Y.unmount,rt=Y.__;function ot($,k){Y.__h&&Y.__h(K,$,J||k),J=0;var st=K.__H||(K.__H={__:[],__h:[]});return $>=st.__.length&&st.__.push({__V:X}),st.__[$]}function ut($){return J=1,it(wt,$)}function it($,k,st){var ct=ot(B++,2);if(ct.t=$,!ct.__c&&(ct.__=[wt(void 0,k),function(oe){var Xt=ct.__N?ct.__N[0]:ct.__[0],Yt=ct.t(Xt,oe);Xt!==Yt&&(ct.__N=[Yt,ct.__[1]],ct.__c.setState({}))}],ct.__c=K,!K.u)){var dt=function(oe,Xt,Yt){if(!ct.__c.__H)return!0;var ee=ct.__c.__H.__.filter((function(re){return!!re.__c}));if(ee.every((function(re){return!re.__N})))return!_||_.call(this,oe,Xt,Yt);var Zt=!1;return ee.forEach((function(re){if(re.__N){var ae=re.__[0];re.__=re.__N,re.__N=void 0,ae!==re.__[0]&&(Zt=!0)}})),!(!Zt&&ct.__c.props===oe)&&(!_||_.call(this,oe,Xt,Yt))};K.u=!0;var _=K.shouldComponentUpdate,vt=K.componentWillUpdate;K.componentWillUpdate=function(oe,Xt,Yt){if(this.__e){var ee=_;_=void 0,dt(oe,Xt,Yt),_=ee}vt&&vt.call(this,oe,Xt,Yt)},K.shouldComponentUpdate=dt}return ct.__N||ct.__}function lt($,k){var st=ot(B++,3);!Y.__s&&xt(st.__H,k)&&(st.__=$,st.i=k,K.__H.__h.push(st))}function at($){return J=5,ft((function(){return{current:$}}),[])}function ft($,k){var st=ot(B++,7);return xt(st.__H,k)?(st.__V=$(),st.i=k,st.__h=$,st.__V):st.__}function ht($){var k=K.context[$.__c],st=ot(B++,9);return st.c=$,k?(st.__==null&&(st.__=!0,k.sub(K)),k.props.value):$.__}function yt(){for(var $;$=Q.shift();)if($.__P&&$.__H)try{$.__H.__h.forEach(bt),$.__H.__h.forEach(Ct),$.__H.__h=[]}catch(k){$.__H.__h=[],Y.__e(k,$.__v)}}Y.__b=function($){K=null,Z&&Z($)},Y.__=function($,k){$&&k.__k&&k.__k.__m&&($.__m=k.__k.__m),rt&&rt($,k)},Y.__r=function($){tt&&tt($),B=0;var k=(K=$.__c).__H;k&&(z===K?(k.__h=[],K.__h=[],k.__.forEach((function(st){st.__N&&(st.__=st.__N),st.__V=X,st.__N=st.i=void 0}))):(k.__h.forEach(bt),k.__h.forEach(Ct),k.__h=[],B=0)),z=K},Y.diffed=function($){nt&&nt($);var k=$.__c;k&&k.__H&&(k.__H.__h.length&&(Q.push(k)!==1&&G===Y.requestAnimationFrame||((G=Y.requestAnimationFrame)||kt)(yt)),k.__H.__.forEach((function(st){st.i&&(st.__H=st.i),st.__V!==X&&(st.__=st.__V),st.i=void 0,st.__V=X}))),z=K=null},Y.__c=function($,k){k.some((function(st){try{st.__h.forEach(bt),st.__h=st.__h.filter((function(ct){return!ct.__||Ct(ct)}))}catch(ct){k.some((function(dt){dt.__h&&(dt.__h=[])})),k=[],Y.__e(ct,st.__v)}})),et&&et($,k)},Y.unmount=function($){_t&&_t($);var k,st=$.__c;st&&st.__H&&(st.__H.__.forEach((function(ct){try{bt(ct)}catch(dt){k=dt}})),st.__H=void 0,k&&Y.__e(k,st.__v))};var gt=typeof requestAnimationFrame=="function";function kt($){var k,st=function(){clearTimeout(ct),gt&&cancelAnimationFrame(k),setTimeout($)},ct=setTimeout(st,100);gt&&(k=requestAnimationFrame(st))}function bt($){var k=K,st=$.__c;typeof st=="function"&&($.__c=void 0,st()),K=k}function Ct($){var k=K;$.__c=$.__(),K=k}function xt($,k){return!$||$.length!==k.length||k.some((function(st,ct){return st!==$[ct]}))}function wt($,k){return typeof k=="function"?k($):k}var Pt=function($,k,st,ct){var dt;k[0]=0;for(var _=1;_<k.length;_++){var vt=k[_++],oe=k[_]?(k[0]|=vt?1:2,st[k[_++]]):k[++_];vt===3?ct[0]=oe:vt===4?ct[1]=Object.assign(ct[1]||{},oe):vt===5?(ct[1]=ct[1]||{})[k[++_]]=oe:vt===6?ct[1][k[++_]]+=oe+"":vt?(dt=$.apply(oe,Pt($,oe,st,["",null])),ct.push(dt),oe[0]?k[0]|=2:(k[_-2]=0,k[_]=dt)):ct.push(oe)}return ct},Ut=new Map;function Ht($){var k=Ut.get(this);return k||(k=new Map,Ut.set(this,k)),(k=Pt(this,k.get($)||(k.set($,k=(function(st){for(var ct,dt,_=1,vt="",oe="",Xt=[0],Yt=function(re){_===1&&(re||(vt=vt.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?Xt.push(0,re,vt):_===3&&(re||vt)?(Xt.push(3,re,vt),_=2):_===2&&vt==="..."&&re?Xt.push(4,re,0):_===2&&vt&&!re?Xt.push(5,0,!0,vt):_>=5&&((vt||!re&&_===5)&&(Xt.push(_,0,vt,dt),_=6),re&&(Xt.push(_,re,0,dt),_=6)),vt=""},ee=0;ee<st.length;ee++){ee&&(_===1&&Yt(),Yt(ee));for(var Zt=0;Zt<st[ee].length;Zt++)ct=st[ee][Zt],_===1?ct==="<"?(Yt(),Xt=[Xt],_=3):vt+=ct:_===4?vt==="--"&&ct===">"?(_=1,vt=""):vt=ct+vt[0]:oe?ct===oe?oe="":vt+=ct:ct==='"'||ct==="'"?oe=ct:ct===">"?(Yt(),_=1):_&&(ct==="="?(_=5,dt=vt,vt=""):ct==="/"&&(_<5||st[ee][Zt+1]===">")?(Yt(),_===3&&(Xt=Xt[0]),_=Xt,(Xt=Xt[0]).push(2,0,_),_=0):ct===" "||ct==="	"||ct===`
`||ct==="\r"?(Yt(),_=2):vt+=ct),_===3&&vt==="!--"&&(_=4,Xt=Xt[0])}return Yt(),Xt})($)),k),arguments,[])).length>1?k:k[0]}var Et=Ht.bind(y),St={};function At($,k){for(var st in k)$[st]=k[st];return $}function Dt($,k,st){var ct,dt=/(?:\?([^#]*))?(#.*)?$/,_=$.match(dt),vt={};if(_&&_[1])for(var oe=_[1].split("&"),Xt=0;Xt<oe.length;Xt++){var Yt=oe[Xt].split("=");vt[decodeURIComponent(Yt[0])]=decodeURIComponent(Yt.slice(1).join("="))}$=Tt($.replace(dt,"")),k=Tt(k||"");for(var ee=Math.max($.length,k.length),Zt=0;Zt<ee;Zt++)if(k[Zt]&&k[Zt].charAt(0)===":"){var re=k[Zt].replace(/(^:|[+*?]+$)/g,""),ae=(k[Zt].match(/[+*?]+$/)||St)[0]||"",pe=~ae.indexOf("+"),ve=~ae.indexOf("*"),$e=$[Zt]||"";if(!$e&&!ve&&(ae.indexOf("?")<0||pe)){ct=!1;break}if(vt[re]=decodeURIComponent($e),pe||ve){vt[re]=$.slice(Zt).map(decodeURIComponent).join("/");break}}else if(k[Zt]!==$[Zt]){ct=!1;break}return(st.default===!0||ct!==!1)&&vt}function Nt($,k){return $.rank<k.rank?1:$.rank>k.rank?-1:$.index-k.index}function Rt($,k){return $.index=k,$.rank=(function(st){return st.props.default?0:Tt(st.props.path).map(Mt).join("")})($),$.props}function Tt($){return $.replace(/(^\/+|\/+$)/g,"").split("/")}function Mt($){return $.charAt(0)==":"?1+"*+?".indexOf($.charAt($.length-1))||4:5}var Lt={},Wt=[],Ft=[],It=null,Vt={url:jt()},Ot=q(Vt);function jt(){var $;return""+(($=It&&It.location?It.location:It&&It.getCurrentLocation?It.getCurrentLocation():typeof location<"u"?location:Lt).pathname||"")+($.search||"")}function qt($,k){return k===void 0&&(k=!1),typeof $!="string"&&$.url&&(k=$.replace,$=$.url),(function(st){for(var ct=Wt.length;ct--;)if(Wt[ct].canRoute(st))return!0;return!1})($)&&(function(st,ct){ct===void 0&&(ct="push"),It&&It[ct]?It[ct](st):typeof history<"u"&&history[ct+"State"]&&history[ct+"State"](null,null,st)})($,k?"replace":"push"),Bt($)}function Bt($){for(var k=!1,st=0;st<Wt.length;st++)Wt[st].routeTo($)&&(k=!0);return k}function Kt($){if($&&$.getAttribute){var k=$.getAttribute("href"),st=$.getAttribute("target");if(k&&k.match(/^\//g)&&(!st||st.match(/^_?self$/i)))return qt(k)}}function zt($){return $.stopImmediatePropagation&&$.stopImmediatePropagation(),$.stopPropagation&&$.stopPropagation(),$.preventDefault(),!1}function Gt($){if(!($.ctrlKey||$.metaKey||$.altKey||$.shiftKey||$.button)){var k=$.target;do if(k.localName==="a"&&k.getAttribute("href")){if(k.hasAttribute("data-native")||k.hasAttribute("native"))return;if(Kt(k))return zt($)}while(k=k.parentNode)}}var Jt=!1;function Qt($){$.history&&(It=$.history),this.state={url:$.url||jt()}}At(Qt.prototype=new C,{shouldComponentUpdate:function($){return $.static!==!0||$.url!==this.props.url||$.onChange!==this.props.onChange},canRoute:function($){var k=A(this.props.children);return this.g(k,$)!==void 0},routeTo:function($){this.setState({url:$});var k=this.canRoute($);return this.p||this.forceUpdate(),k},componentWillMount:function(){this.p=!0},componentDidMount:function(){var $=this;Jt||(Jt=!0,It||addEventListener("popstate",(function(){Bt(jt())})),addEventListener("click",Gt)),Wt.push(this),It&&(this.u=It.listen((function(k){var st=k.location||k;$.routeTo(""+(st.pathname||"")+(st.search||""))}))),this.p=!1},componentWillUnmount:function(){typeof this.u=="function"&&this.u(),Wt.splice(Wt.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function($,k){$=$.filter(Rt).sort(Nt);for(var st=0;st<$.length;st++){var ct=$[st],dt=Dt(k,ct.props.path,ct.props);if(dt)return[ct,dt]}},render:function($,k){var st,ct,dt=$.onChange,_=k.url,vt=this.c,oe=this.g(A($.children),_);if(oe&&(ct=j(oe[0],At(At({url:_,matches:st=oe[1]},st),{key:void 0,ref:void 0}))),_!==(vt&&vt.url)){At(Vt,vt=this.c={url:_,previous:vt&&vt.url,current:ct,path:ct?ct.props.path:null,matches:st}),vt.router=this,vt.active=ct?[ct]:[];for(var Xt=Ft.length;Xt--;)Ft[Xt]({});typeof dt=="function"&&dt(vt)}return y(Ot.Provider,{value:vt},ct)}});const StateContext=q(null),switchIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='652.000000pt'%20height='956.000000pt'%20viewBox='0%200%20652.000000%20956.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,956.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M1150%209540%20c-386%20-6%20-408%20-8%20-475%20-29%20-147%20-48%20-255%20-115%20-368%20-226%20-93%20-91%20-145%20-159%20-191%20-250%20-74%20-146%20-77%20-163%20-87%20-455%20-10%20-318%20-14%20-7639%20-4%20-7725%2025%20-214%20107%20-394%20245%20-539%20115%20-121%20227%20-192%20408%20-260%20l72%20-28%202418%20-1%20c2586%20-2%202582%20-2%202716%2047%20254%2092%20492%20346%20573%20611%2017%2058%2018%20211%2018%204095%20l0%204035%20-23%2075%20c-61%20193%20-204%20388%20-368%20501%20-76%2052%20-226%20118%20-294%20129%20-36%206%20-229%2015%20-430%2020%20-398%2010%20-3557%2010%20-4210%200z%20m4610%20-328%20c164%20-59%20291%20-175%20374%20-339%20l36%20-73%200%20-4016%200%20-4016%20-45%20-88%20c-25%20-48%20-70%20-115%20-101%20-148%20-64%20-71%20-175%20-148%20-242%20-168%20-103%20-32%20-400%20-35%20-2687%20-32%20-2180%203%20-2282%204%20-2335%2022%20-204%2068%20-363%20240%20-417%20452%20-17%2065%20-18%20275%20-18%203979%200%203785%201%203912%2019%203980%2024%2091%2084%20207%20140%20271%2055%2062%20182%20152%20244%20171%2027%208%20121%2018%20222%2022%2096%205%201203%208%202460%207%20l2285%20-1%2065%20-23z'/%3e%3cpath%20d='M1434%208128%20l-45%20-41%203%20-3291%20c3%20-3127%204%20-3293%2021%20-3323%209%20-18%2029%20-41%2044%20-50%2026%20-17%20125%20-18%201799%20-18%201918%200%201808%20-3%201834%2054%207%2014%2016%2067%2021%20116%205%2050%209%20789%209%201644%20l0%201554%20249%20981%20c358%201405%20401%201581%20401%201626%200%2051%204%2046%20-414%20468%20l-321%20322%20-1778%200%20-1777%200%20-46%20-42z%20m3636%20-425%20l165%20-168%20-185%20-6%20c-102%20-4%20-770%20-7%20-1485%20-8%20l-1300%20-1%20-145%20148%20c-80%2081%20-156%20159%20-170%20175%20l-23%2027%201489%200%201490%200%20164%20-167z%20m-3078%20-356%20l31%20-38%20-147%20-583%20c-81%20-320%20-153%20-602%20-160%20-626%20-12%20-39%20-13%20-23%20-19%20185%20-9%20291%20-9%20823%200%201123%20l6%20233%20129%20-128%20c71%20-70%20143%20-145%20160%20-166z%20m2900%20-136%20c278%20-3%20510%20-9%20513%20-13%2010%20-10%203%20-40%20-305%20-1260%20l-280%20-1107%200%20-1565%200%20-1566%20-1565%200%20-1565%200%200%201521%200%201520%20310%201226%20c171%20675%20313%201229%20316%201232%2014%2014%201788%2022%202576%2012z'/%3e%3cpath%20d='M3765%206820%20c-61%20-25%20-87%20-94%20-185%20-473%20-80%20-315%20-120%20-493%20-120%20-540%200%20-77%2078%20-141%20163%20-134%2069%206%20101%2040%20131%20141%2057%20190%20197%20746%20212%20843%205%2032%201%2053%20-19%2096%20-22%2048%20-30%2057%20-64%2066%20-44%2013%20-90%2013%20-118%201z'/%3e%3cpath%20d='M3098%203406%20c-104%20-37%20-216%20-134%20-264%20-227%20-24%20-47%20-28%20-71%20-35%20-184%20-19%20-311%20-7%20-500%2037%20-586%2040%20-80%20113%20-151%20201%20-195%20l76%20-39%20151%200%20151%200%2068%2034%20c81%2041%20167%20128%20215%20218%20l32%2061%200%20302%200%20302%20-41%2078%20c-65%20127%20-156%20201%20-284%20235%20-73%2019%20-255%2019%20-307%201z%20m262%20-311%20c58%20-30%2064%20-57%2068%20-301%204%20-219%204%20-222%20-19%20-253%20-65%20-88%20-230%20-95%20-286%20-13%20-16%2024%20-18%2055%20-21%20273%20l-3%20246%2038%2030%20c21%2017%2045%2033%2053%2036%2025%2011%20137%20-1%20170%20-18z'/%3e%3c/g%3e%3c/svg%3e",buttonIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M790%201280%20l0%20-420%2065%200%2065%200%200%20420%200%20420%20-65%200%20-65%200%200%20-420z'/%3e%3cpath%20d='M489%201612%20c-228%20-114%20-386%20-309%20-451%20-557%20-29%20-110%20-29%20-297%200%20-406%2081%20-301%20308%20-530%20607%20-610%20112%20-30%20307%20-30%20420%200%20294%2077%20529%20312%20606%20606%2029%20110%2030%20307%201%20416%20-67%20251%20-245%20462%20-477%20565%20l-55%2024%200%20-74%200%20-74%2072%20-42%20c280%20-167%20411%20-508%20313%20-817%20-35%20-110%20-88%20-196%20-175%20-283%20-87%20-87%20-172%20-139%20-285%20-177%20-70%20-23%20-96%20-27%20-210%20-27%20-114%200%20-140%204%20-210%2027%20-293%2097%20-495%20372%20-495%20673%200%2070%2025%20193%2055%20266%2054%20133%20182%20279%20299%20339%20l66%2034%200%2078%20c0%2042%20-1%2077%20-2%2077%20-2%200%20-37%20-18%20-79%20-38z'/%3e%3c/g%3e%3c/svg%3e",timerIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M818%201670%20c-24%20-15%20-31%20-77%20-23%20-221%208%20-141%2015%20-159%2064%20-159%2050%200%2060%2024%2063%20150%20l3%20115%2030%20-3%20c172%20-19%20366%20-132%20472%20-275%2094%20-129%20133%20-236%20140%20-392%206%20-142%20-12%20-230%20-73%20-355%20-82%20-165%20-236%20-296%20-419%20-357%20-71%20-24%20-95%20-27%20-215%20-27%20-118%200%20-145%203%20-212%2026%20-123%2041%20-204%2092%20-298%20187%20-68%2068%20-94%20103%20-127%20171%20-61%20125%20-76%20203%20-71%20352%206%20153%2036%20243%20122%20371%2064%2095%2068%20127%2021%20149%20-39%2017%20-68%202%20-113%20-59%20-94%20-127%20-150%20-285%20-159%20-449%20-23%20-399%20236%20-749%20632%20-855%20111%20-30%20297%20-30%20410%200%20449%20119%20716%20562%20610%201011%20-23%2095%20-105%20254%20-173%20336%20-111%20131%20-276%20234%20-442%20274%20-89%2021%20-213%2026%20-242%2010z'/%3e%3cpath%20d='M452%201258%20c-7%20-7%20-12%20-17%20-12%20-23%200%20-21%20330%20-469%20358%20-487%2043%20-28%20106%20-23%20143%2010%2043%2038%2052%20113%2020%20154%20-20%2025%20-454%20342%20-484%20354%20-7%202%20-18%20-1%20-25%20-8z'/%3e%3c/g%3e%3c/svg%3e",owIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='110.000000pt'%20height='52.000000pt'%20viewBox='0%200%20110.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M171%20500%20c-50%20-12%20-83%20-41%20-111%20-96%20-22%20-43%20-25%20-62%20-24%20-149%200%20-141%2027%20-199%20109%20-236%2073%20-33%20180%20-16%20227%2037%2067%2076%2074%20284%2013%20376%20-39%2059%20-133%2089%20-214%2068z%20m119%20-65%20c50%20-26%2065%20-67%2065%20-180%200%20-146%20-32%20-195%20-128%20-195%20-40%200%20-54%205%20-77%2028%20-16%2016%20-34%2049%20-40%2073%20-16%2056%20-7%20186%2014%20227%2030%2057%20105%2078%20166%2047z'/%3e%3cpath%20d='M482%20483%20c3%20-10%2029%20-120%2058%20-245%20l54%20-228%2038%200%20c43%200%2035%20-20%2089%20215%2017%2077%2035%20146%2038%20152%204%207%2026%20-73%2051%20-178%20l44%20-190%2039%203%2040%203%2058%20240%20c32%20132%2058%20241%2059%20243%200%202%20-15%202%20-32%200%20l-32%20-3%20-43%20-180%20c-23%20-99%20-44%20-187%20-46%20-195%20-2%20-8%20-25%2074%20-51%20183%20l-48%20198%20-36%20-3%20-36%20-3%20-45%20-194%20c-25%20-106%20-47%20-188%20-49%20-181%20-3%207%20-23%2095%20-46%20194%20l-42%20181%20-33%203%20c-28%203%20-33%201%20-29%20-15z'/%3e%3c/g%3e%3c/svg%3e",encoderIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='34.000000pt'%20height='52.000000pt'%20viewBox='0%200%2034.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M30%20255%20l0%20-245%20150%200%20150%200%200%2030%200%2030%20-115%200%20-115%200%200%2085%200%2085%2095%200%2095%200%200%2030%200%2030%20-95%200%20-95%200%200%2070%200%2070%20115%200%20115%200%200%2030%200%2030%20-150%200%20-150%200%200%20-245z'/%3e%3c/g%3e%3c/svg%3e",Icons={switchIcon:$=>Et`
    <img
      src=${switchIcon}
      class=${$.class}
      style="width: 33px; height: 33px; margin-left: -5px; margin-top: -3px;"
      alt="Switch icon"
    />
  `,buttonIcon:$=>Et`
    <img
      src=${buttonIcon}
      class=${$.class}
      style="width: 26px; height: 26px; margin-left: 0px; margin-sentr: -5px;"
      alt="Button icon"
    />
  `,timerIcon:$=>Et`
    <img
      src=${timerIcon}
      class=${$.class}
      style="width: 26px; height: 26px; margin-left: 0px; margin-top: -2px;"
      alt="timer icon"
    />
  `,owIcon:$=>Et`
    <img
      src=${owIcon}
      class=${$.class}
      style="width: 35px; height: 35px; margin-left: -2px; margin-top: -4px;"
      alt="1w icon"
    />
  `,encoderIcon:$=>Et`
    <img
      src=${encoderIcon}
      class=${$.class}
      style="width: 25px; height: 25px; margin-left: 0px; margin-top: -1px;"
      alt="Encoder icon"
    />
  `,cog:$=>Et`<svg
      class=${$.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>`,refresh:$=>Et`<svg
      class=${$.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg> `,bars4:$=>Et`<svg
      class=${$.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
      />
    </svg>`,bars3:$=>Et`<svg
      class=${$.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>`,logout:$=>Et`<svg
      class=${$.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>`,ok:$=>Et`<svg
      class=${$.class}
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>`,download:$=>Et`<svg
      class=${$.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg> `,home:$=>Et`<svg
      class=${$.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg> `,warn:$=>Et`<svg
      class=${$.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>`,info:$=>Et`<svg
      class=${$.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>`,thumbUp:$=>Et`<svg
      class=${$.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
      />
    </svg>`,backward:$=>Et`<svg
      class=${$.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
      />
    </svg>`,doc:$=>Et`<svg
      class=${$.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>`},tipColors={green:"bg-green-100 text-green-900 ring-green-300",yellow:"bg-yellow-100 text-yellow-900 ring-yellow-300"};function Button({title:$,onclick:k,disabled:st,cls:ct,icon:dt,ref:_,colors:vt,hovercolor:oe,disabledcolor:Xt}){const[Yt,ee]=ut(!1),Zt=function(re){const ae=k?k():null;ae&&typeof ae.catch=="function"&&(ee(!0),ae.catch(()=>!1).then(()=>ee(!1)))};return vt||(vt="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400"),Et` <button
    type="button"
    class="inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${vt} ${ct}"
    ref=${_}
    onclick=${Zt}
    disabled=${st||Yt}
  >
    ${$}
    <${Yt?Icons.refresh:dt} class="w-4 ${Yt?"animate-spin":""}" />
  <//>`}function Login({loginFn:$,logoIcon:k,title:st,tipText:ct}){const[dt,_]=ut(""),[vt,oe]=ut(""),Xt=function(Yt){const Zt={Authorization:"Basic "+btoa(dt+":"+vt)};return fetch("api/login",{headers:Zt}).then($).finally(re=>oe(""))};return Et` <div
    class="h-full flex items-center justify-center bg-slate-200"
  >
    <div class="border rounded bg-white w-96 p-5">
      <div class="my-5 py-2 flex items-center justify-center gap-x-4">
        <${k} class="h-12 stroke-cyan-600 stroke-1" />
        <h1 class="font-bold text-xl">${st||"Login"}<//>
      <//>
      <div class="my-3">
        <label class="block text-sm mb-1 dark:text-white">Username</label>
        <input
          type="text"
          autocomplete="current-user"
          required
          class="font-normal bg-white rounded border border-gray-300 w-full
        flex-1 py-0.5 px-2 text-gray-900 placeholder:text-gray-400
        focus:outline-none sm:text-sm sm:leading-6 disabled:cursor-not-allowed
        disabled:bg-gray-100 disabled:text-gray-500"
          oninput=${Yt=>_(Yt.target.value)}
          value=${dt}
        />
      <//>
      <div class="my-3">
        <label class="block text-sm mb-1 dark:text-white">Password</label>
        <input
          type="password"
          autocomplete="current-password"
          required
          class="font-normal bg-white rounded border border-gray-300 w-full flex-1 py-0.5 px-2 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
          oninput=${Yt=>oe(Yt.target.value)}
          value=${vt}
          onchange=${Xt}
        />
      <//>
      <div class="mt-7">
        <${Button}
          title="Sign In"
          icon=${Icons.logout}
          onclick=${Xt}
          cls="flex w-full justify-center"
        />
      <//>
      <div class="mt-5 text-slate-400 text-xs">${ct}<//>
    <//>
  <//>`}function Colored({icon:$,text:k,colors:st}){return st||(st="bg-slate-100 text-slate-900"),Et` <span class="inline-flex items-center gap-1.5 py-0.5">
    ${$&&Et`<${$} class="w-5 h-5" />`}
    <span
      class="inline-block font-medium rounded-md px-2 py-1 text-xs ring-1 ring-inset ${st}"
      >${k}<//
    >
  <//>`}function Stat({title:$,text:k,tipText:st,tipIcon:ct,tipColors:dt,colors:_}){return Et` <div
    class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800"
  >
    <div class="overflow-auto rounded-lg bg-white px-4 py-2 ">
      <div class="flex items-center gap-x-2">
        <p class="text-sm truncate text-gray-500 font-medium">${$}</p>
      <//>
      <div class="mt-1 flex items-center gap-x-2">
        <h3
          class="text-xl truncate font-semibold tracking-tight ${_||"text-gray-800 dark:text-gray-200"}"
        >
          ${k}
        <//>
        <span class="flex items-center ${st||"hidden"}">
          <${Colored} text=${st} icon=${ct} colors=${dt} />
        <//>
      <//>
    <//>
  <//>`}const ruLangswitch=["","ID - уникальный числовой идентификатор выключателя. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","Device connection - Здесь указаны пины одного или нескольких устройств, с которыми взаимодействует данный выключатель.",'INFO - Укажите название данного выключателя для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение обработчика состояния на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек и соединений выключателя."],ruLangselect=["","ID - уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type(s) of pin(s) - Выберите режим работы данного пина из предложенных вариантов."],rulangbutton=["","ID - уникальный числовой идентификатор кнопки. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","sclick - Выполняемая команда при одинарном клике кнопки.","dclick - Выполняемая команда при двойном клике кнопки.","lpress - Выполняемая команда при удержании кнопки.",'INFO - Укажите название данной кнопки для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение функции кнопки на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек кнопки."],ruencoder=["","ID - уникальный числовой идентификатор энкодера. Присваивается автоматически.","Pin - Уникальный номер пина.","Encoder A (ID) - Основной пин энкодера A (DT).","Encoder B (ID) - Дополнительный пин энкодера B (CLK).","PWM connection - Подключение ШИМ для управления яркостью (диммер).","Dimmer value (0-100) - Текущее значение диммера от 0 до 100.","Duty on restore - Восстановление значения скважности (яркости) при включении контроллера.","INFO - Укажите название данного энкодера для быстрой навигации.","On/Off - Включение или отключение обработчика энкодера.","Action - Кнопка Edit позволяет зайти в меню настроек энкодера.","PWM Frequency - Частота ШИМ управляемого устройства (в герцах).","Resolution (steps) - Максимальное количество шагов от 0 до 100% для ШИМ устройства."],rulangtimers=["","No - Уникальный числовой идентификатор задачи (cron). Присваивается автоматически.","Cron - Сконфигурируйте расписание (cron) для выполнения задачи.","Script - Какое действие (скрипт) должно выполниться в указанное в таймере время.",'Info - Дайте название выбранному таймеру для быстрой навигации, например "Полив газона". Не более 30-ти символов!',"On/Off - Вкл/Откл выполнение данной задачи.","Action - Кнопка Edit позволяет зайти в меню настроек задачи."],rulangsettings=["","Login - Введите имя пользователя для входа в систему. Используется при авторизации в веб-интерфейсе.","Password - Введите пароль для входа в систему. Рекомендуется использовать надёжный пароль.","Time zone UTC - Выберите свой часовой пояс. Влияет на отображение времени и расчёт восхода/заката.","IP address - Введите статический IP-адрес устройства. После перезагрузки STM32 будет доступен по этому адресу. Формат: 192.168.1.100","Subnet mask - Введите маску подсети. Определяет диапазон адресов вашей локальной сети. Формат: 255.255.255.0","Default gateway - Введите IP-адрес шлюза по умолчанию (обычно адрес вашего роутера). Формат: 192.168.1.1","Token - Секретный ключ для авторизации API-запросов. Используется в URL командах управления устройством. Пример: /api/Token/switch?id=1&onoff=1","Host - Введите IP-адрес или доменное имя MQTT-брокера. Пример: 192.168.1.50 или broker.hivemq.com","Port - Укажите порт MQTT-брокера. Стандартный порт: 1883 (без шифрования), 8883 (с TLS).","Client - Уникальный идентификатор клиента MQTT. Каждое устройство должно иметь свой уникальный Client ID.","User - Имя пользователя для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","Password - Пароль для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","TX topic - Исходящий топик MQTT. На этот топик устройство публикует свои данные и события. Пример: Swarm","RX topic - Входящий топик MQTT. С этого топика устройство получает команды управления. Пример: Swarm","HTTPS domain - Доменное имя для HTTPS-соединения. Необходим действующий SSL-сертификат для этого домена. Пример: zagotovka.ddns.net",'Private Key - Закрытый ключ SSL-сертификата в формате PEM. Начинается с "-----BEGIN EC PRIVATE KEY-----". Хранится в зашифрованном виде.','Public Key - Публичный сертификат SSL в формате PEM. Начинается с "-----BEGIN CERTIFICATE-----". Используется для HTTPS-соединения.',"Longitude - Долгота вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 37.618 (Москва)","Latitude - Широта вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 55.751 (Москва)","Sunrise - Время восхода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на восходе.","Sunset - Время захода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на закате.","Day Length - Продолжительность светового дня, рассчитывается автоматически на основе координат и текущей даты.","Next full moon - Дата и время следующего полнолуния, рассчитывается автоматически.","Date - Дата для автономного (offline) режима в формате дд.мм.гг. Используется когда нет доступа к NTP-серверу. Пример: 15.03.25","Time - Время для автономного (offline) режима в формате чч:мм:сс. Используется когда нет доступа к NTP-серверу. Пример: 14:30:00"],ruLangsecurity=["","RXD Pin - Пин приема данных (RX).","TXD Pin - Пин передачи данных (TX).","Phone Number - Номер телефона для отправки SMS и звонков.","Info - Дополнительная информация для быстрой навигации.","OnOff - Включение или отключение модуля SIM800L.","Action - Кнопка Edit позволяет зайти в меню настроек."],ruLangsecuritypins=["","ID - уникальный числовой идентификатор пина. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type of sensor - Тип подключенного сенсора (PIR, Normal open, Normal close).","Action - Действие, выполняемое при срабатывании сенсора.","Send SMS - Отправлять ли SMS при срабатывании сенсора (YES/NO).","INFO - Дополнительная информация для быстрой навигации.","On/Off - Включение или отключение охранного пина.","Edit Pin - Редактирование настроек охранного пина."],rulange1Wire=["","ID - Уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового пина, к которому подключена шина 1-Wire.","Selected sensor - Здесь вы выбираете подключённый к пину датчик температуры: DS18B20 или DHT22.","Count of sensors - Количество найденных 1-Wire температурных датчиков на данном пине.","On/Off - Функция включения или отключения опроса подключенных датчиков на данной шине.","Actions - Кнопка Edit для привязки конкретного датчика к этому соединению."],rulangpid=["","No - Уникальный числовой идентификатор, присваивается автоматически.",'PWM Pin - Выбранный вами PWM пин на странице "Select pin".',"Sel. sensor - Укажите один из двух типов (DS18B20/DHT22) температурного датчика.",'Dev. ser. number - Серийный номер выбранного DS18B20 датчика (со страницы "OneWire pin").',"Presets - Выберите пресет, максимально соответствующий нужным температурным и временным параметрам.","T set. - Задайте целевую температуру, которую должен поддерживать PID-контроллер.","T cur. - Текущая температура выбранного датчика.","Duty - Текущее значение PWM.",'Info - Название PID-контроллера для быстрой навигации (например: "Тёплый пол в детской").',"On/Off - Вкл/Откл данного PID-контроллера.","Action - Кнопка для входа в меню настроек PID-контроллера.","Auto tune - Автоматический подбор коэффициентов PID."],enLangswitch=["","ID - A unique numerical identifier of the switch. Assigned automatically","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","Device connection - Here will appear one or more devices/relays of pin(s) with which this switch interacts.",'INFO - Give a name of this switch for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the switch state handler on this pin.","Action - The Edit button allows you to access the switch settings menu."],enLangselect=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type(s) of pin(s) - Select the operating mode of this pin from the provided options."],enlangbutton=["","ID - A unique numerical identifier of the button. Assigned automatically.","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","sclick - Command to execute when the button is pressed once.","dclick - Command to execute when the button is pressed twice.","lpress - Command to execute when the button is long pressed.",'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the button function on this pin.","Action - The Edit button allows you to access the button settings menu."],enencoder=["","ID - A unique numerical identifier of the encoder. Assigned automatically.","PIN - The unique number of the pin.","Encoder A (ID) - Main pin of encoder A (DT).","Encoder B (ID) - Additional pin of encoder B (CLK).","PWM connection - PWM connection for brightness control (dimmer).","Dimmer value (0-100) - Current dimmer value from 0 to 100.","Duty on restore - Value of duty cycle (brightness) to restore when the controller is turned on.","INFO - Give a name to this encoder for quick navigation.","On/Off - Enable or disable the encoder handler.","Action - The Edit button allows you to access the encoder settings menu.","PWM Frequency - PWM frequency of the controlled device (in Hertz).","Resolution (steps) - Maximum number of steps from 0 to 100% for the PWM device."],enlangtimers=["","No - A unique numerical identifier of the task (cron). Assigned automatically.","Cron - Configure a schedule (cron) to perform the action.","Script - What action (script) must be performed at the time specified in the timer.",'Info - Give a name to the selected timer for quick navigation, e.g."Lawn Watering", "Backyard Light", etc. No more than 30 characters!',"On/Off - Enable or disable the execution of this task.","Action - The Edit button allows you to access the task settings menu."],enlangsettings=["","Login - Enter the username for logging into the system. Used for web interface authentication.","Password - Enter your password for the system. It is recommended to use a strong password.","Time zone UTC - Select your time zone. Affects time display and sunrise/sunset calculations.","IP address - Enter a static IP address for the device. After reboot, STM32 will be available at this address. Format: 192.168.1.100","Subnet mask - Enter the subnet mask. Defines the range of addresses in your local network. Format: 255.255.255.0","Default gateway - Enter the default gateway IP address (usually your router address). Format: 192.168.1.1","Token - Secret key for API request authorization. Used in device control URL commands. Example: /api/Token/switch?id=1&onoff=1","Host - Enter the IP address or domain name of the MQTT broker. Example: 192.168.1.50 or broker.hivemq.com","Port - Specify the MQTT broker port. Standard port: 1883 (no encryption), 8883 (with TLS).","Client - Unique MQTT client identifier. Each device must have its own unique Client ID.","User - Username for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","Password - Password for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","TX topic - Outgoing MQTT topic. The device publishes its data and events to this topic. Example: Swarm","RX topic - Incoming MQTT topic. The device receives control commands from this topic. Example: Swarm","HTTPS domain - Domain name for HTTPS connection. A valid SSL certificate for this domain is required. Example: zagotovka.ddns.net",'Private Key - SSL certificate private key in PEM format. Starts with "-----BEGIN EC PRIVATE KEY-----". Stored in encrypted form.','Public Key - SSL public certificate in PEM format. Starts with "-----BEGIN CERTIFICATE-----". Used for HTTPS connection.',"Longitude - Longitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 37.618 (Moscow)","Latitude - Latitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 55.751 (Moscow)","Sunrise - Sunrise time is calculated automatically based on your coordinates. The slider enables/disables the action at sunrise.","Sunset - Sunset time is calculated automatically based on your coordinates. The slider enables/disables the action at sunset.","Day Length - Duration of daylight, calculated automatically based on coordinates and current date.","Next full moon - Date and time of the next full moon, calculated automatically.","Date - Date for offline mode in dd.mm.yy format. Used when there is no access to the NTP server. Example: 15.03.25","Time - Time for offline mode in hh:mm:ss format. Used when there is no access to the NTP server. Example: 14:30:00"],enLangsecurity=["","RXD Pin - Receive Data Pin (RX).","TXD Pin - Transmit Data Pin (TX).","Phone Number - Phone number for SMS notifications and calls.","Info - Additional information for quick navigation.","OnOff - Enable or disable the SIM800L module.","Action - The Edit button allows you to access the settings menu."],enLangsecuritypins=["","ID - A unique numerical identifier of the pin. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type of sensor - Type of connected sensor (PIR, Normal open, Normal close).","Action - Action to perform when the sensor is triggered.","Send SMS - Whether to send SMS when the sensor is triggered (YES/NO).","INFO - Additional information for quick navigation.","On/Off - Enable or disable the security pin.","Edit Pin - The Edit button allows you to access the security pin settings."],enlange1Wire=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital pin to which the 1-Wire bus is connected.","Selected sensor - Here you select the temperature sensor connected to the chosen pin: DS18B20 or DHT22.","Count of sensors - Number of 1-Wire temperature sensors on this pin.","On/Off - The function of enabling or disabling polling of connected sensors on this bus.","Actions - The Edit button to bind a specific sensor to this connection."],enlangpid=["","No - Unique numeric identifier, assigned automatically.",'PWM Pin - The PWM pin you selected on the "Select pin" page.',"Sel. sensor - Specify one of the two types (DS18B20/DHT22) of temperature sensors.",'Dev. ser. number - Serial number of the selected DS18B20 sensor (from the "OneWire pin" page).',"Presets - Select the preset that best matches the desired temperature and timing parameters.","T set. - Set the target temperature that the PID controller should maintain.","T cur. - Current temperature of the selected sensor.","Duty - Current PWM value.",'Info - Name of this PID controller for quick navigation (e.g., "Kids room warm floor").',"On/Off - Enable/Disable this PID controller.","Action - Button to enter the PID controller settings menu.","Auto tune - Automatic tuning of PID coefficients."];function initGlobalTooltip$8(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,vt=$.offsetHeight,oe=window.innerWidth,Xt=dt.getBoundingClientRect();let Yt=Xt.left+Xt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,oe-_-8));let ee=Xt.top-vt-8;ee<8&&(ee=Xt.bottom+8),$.style.left=Yt+"px",$.style.top=ee+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabSelect({}){const[$,k]=ut(null),[st,ct]=ut({}),[dt,_]=ut(null),[vt,oe]=ut(!1),[Xt,Yt]=ut(3),[ee,Zt]=ut(!1),[re,ae]=ut("ru"),pe=at(0);lt(()=>{initGlobalTooltip$8()},[]);const ve=de=>{Zt(de),pe.current=Date.now()},$e=de=>ee&&(de===1||de===35),ie=()=>fetch("/api/select/get",{cache:"no-store"}).then(de=>de.json()).then(de=>{const ce=de.data||de;k(ce),Zt(de.sim800l===1),de.lang&&ae(de.lang);const fe={};ce.forEach(Ee=>{fe[`topin_${Ee.id}`]=Ee.topin.toString()}),ct(fe)}),we=at(0),xe=at(!1);lt(()=>{let de=!0;return++we.current,ie(),registerPoll("select","/api/select/get",function(ce){if(!(!de||xe.current)&&!(Date.now()-pe.current<8e3)&&ce!=null){const fe=ce.data||ce;k(fe),Zt(ce.sim800l===1),ce.lang&&ae(ce.lang);const Ee={};fe.forEach(function(Te){Ee["topin_"+Te.id]=Te.topin.toString()}),ct(Ee)}}),function(){de=!1,unregisterPoll("select")}},[]),lt(()=>{let de;return vt&&Xt>0?de=setTimeout(()=>{Yt(Xt-1)},1e3):Xt===0&&(oe(!1),_(null)),()=>clearTimeout(de)},[vt,Xt]);const Ce=async de=>{de.preventDefault();const ce=new FormData(de.target),fe={lang:re,sim800l:ee?1:0,data:[]};$.forEach(Ee=>{const Te=ce.get(`topin_${Ee.id}`);fe.data.push({id:Ee.id,pins:Ee.pins,topin:parseInt(Te),pwm:Ee.pwm,i2cdata:Ee.i2cdata,i2cclok:Ee.i2cclok})}),_("submitting"),oe(!0),Yt(3);try{const Ee=await fetch("/api/select/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(fe)});if(!Ee.ok)throw new Error("Network response was not ok");const Te=await Ee.json();_("success"),console.log("Success:",Te);const ge={};fe.data.forEach(mt=>{ge[`topin_${mt.id}`]=mt.topin.toString()}),ct(mt=>({...mt,...ge})),pe.current=0,ie()}catch(Ee){_("error"),console.error("Error:",Ee)}},Se=de=>{const{name:ce,value:fe}=de.target;ct(Ee=>({...Ee,[ce]:fe})),pe.current=Date.now()};if(!$)return"";const Ie=()=>({langselect:re==="ru"?ruLangselect:enLangselect}),Pe=(de,ce)=>{const fe=Ie(),Te=(fe[de]&&fe[de][ce]?fe[de][ce]:"").split(" "),ge=[];for(let mt=0;mt<Te.length;mt+=15)ge.push(Te.slice(mt,mt+15).join(" "));return ge.join("<br>")},Me=de=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      style=${de.center?"text-align: center":""}
      data-tip=${Pe("langselect",de.tooltipIndex)}
    >
      ${de.title}
    </th>
  `,me=({id:de,value:ce,label:fe,disabled:Ee=!1,onChange:Te,checked:ge})=>Et`
    <div class="relative">
      <input
        id="${de}_${ce}"
        class="sr-only peer"
        type="radio"
        name="topin_${de}"
        value="${ce}"
        checked=${ge}
        onChange=${Te}
        disabled=${Ee}
        aria-label="${fe}"
      />
      <label
        for="${de}_${ce}"
        class="cursor-pointer px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300
               ${Ee?"text-gray-400 cursor-not-allowed opacity-60":"text-slate-700 hover:bg-black/5"}
               peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-cyan-500 peer-checked:text-white peer-checked:shadow-sm"
      >
        ${fe}
      </label>
    </div>
  `,Oe=({d:de})=>Et`
    <tr class="${$e(de.id)?"bg-red-200/50 opacity-50 pointer-events-none":de.id%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-2 text-sm text-slate-800">${de.id}</td>
      <td class="px-6 py-2 text-sm text-slate-800 font-medium">${de.pins}</td>
      <td class="px-2 py-2">
        <div class="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
          <${me} id=${de.id} value="0"  label="NONE"     checked=${st[`topin_${de.id}`]==="0"}  onChange=${Se} />
          <${me} id=${de.id} value="3"  label="SWITCH"   checked=${st[`topin_${de.id}`]==="3"}  onChange=${Se} />
          <${me} id=${de.id} value="1"  label="BUTTON"   checked=${st[`topin_${de.id}`]==="1"}  onChange=${Se} />
          <${me} id=${de.id} value="2"  label="DEVICE"   checked=${st[`topin_${de.id}`]==="2"}  onChange=${Se} />
          <${me} id=${de.id} value="4"  label="1-WIRE"   checked=${st[`topin_${de.id}`]==="4"}  onChange=${Se} />
          <${me} id=${de.id} value="5"  label="PWM"      disabled=${de.pwm==0} checked=${st[`topin_${de.id}`]==="5"}  onChange=${Se} />
          <${me} id=${de.id} value="8"  label="Enc.OutA" checked=${st[`topin_${de.id}`]==="8"}  onChange=${Se} />
          <${me} id=${de.id} value="9"  label="Enc.OutB" checked=${st[`topin_${de.id}`]==="9"}  onChange=${Se} />
          <${me} id=${de.id} value="10" label="Security" disabled=${de.monitoring==0} checked=${st[`topin_${de.id}`]==="10"} onChange=${Se} />
        </div>
      </td>
    </tr>
  `;return Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative overflow-hidden">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Select pin(s)
        </div>

        <form onSubmit=${Ce}>
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <button
              type="submit"
              class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${vt?"bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none":"bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"}`}
              disabled=${vt}
            >
              ${vt?`Please wait ${Xt} sec.`:"Submit"}
            </button>

            <div class="flex items-center gap-3">
              <span class="text-slate-600 font-bold uppercase tracking-widest text-2xl drop-shadow-sm">SIM800L</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  checked=${ee}
                  onChange=${de=>ve(de.target.checked)}
                />
                <div class="w-[42px] h-[22px] bg-slate-200/80 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300/50 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-400 peer-checked:to-cyan-500 shadow-inner"></div>
              </label>
            </div>
          </div>

          ${dt==="success"&&Et`
            <div class="mb-6 bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
              <strong class="font-bold">Успех! </strong>
              <span class="block sm:inline">Данные успешно сохранены. Идет запись на USB флешку. Кнопка станет активной через ${Xt} секунд.</span>
            </div>
          `}
          ${dt==="error"&&Et`
            <div class="mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
              <strong class="font-bold">Ошибка!</strong>
              <span class="block sm:inline">Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз через ${Xt} секунд.</span>
            </div>
          `}

          <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner overflow-auto">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <${Me} title="ID" tooltipIndex=${1} />
                    <${Me} title="Pin" tooltipIndex=${2} />
                    <${Me} title="Type(s) of pin(s)" tooltipIndex=${3} center=${!0} />
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/40">
                  ${$&&$.map(de=>Et`<${Oe} d=${de} />`)}
                </tbody>
              </table>
            </div>
          </div>

          <div class="mt-6 flex justify-start">
            <button
              type="submit"
              class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${vt?"bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none":"bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"}`}
              disabled=${vt}
            >
              ${vt?`Please wait ${Xt} sec.`:"Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `}function ModalSwitch({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedSwitch:_,onSwitchChange:vt,connectionOptions:oe,SliderComponent:Xt=MyPolzunok}){const[Yt,ee]=ut((_==null?void 0:_.info)||""),[Zt,re]=ut((_==null?void 0:_.onoff)||0),[ae,pe]=ut((_==null?void 0:_.ptype)||0),[ve,$e]=ut((_==null?void 0:_.setrpins)||""),[ie,we]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(fe=>{if(!fe.ok)throw new Error(`HTTP error! status: ${fe.status}`);return fe.json()}).then(fe=>{if(!fe||!fe.data||!Array.isArray(fe.data)){console.error("Invalid data format:",fe),we([]);return}const Ee=fe.data.filter(Te=>Te.topin===2);we(Ee)}).catch(fe=>{console.error("Error fetching pin config:",fe),we([])})},[]);const xe=fe=>{fe.preventDefault();const Ee=new FormData(fe.target),Te=Object.fromEntries(Ee);if(Te.id=_.id,Te.pins=_.pins,$==="edit")Te.onoff=Zt;else if($==="connection"){const ge=ie.find(mt=>mt.pins===Te.setrpins);ge&&(Te.pinact={..._.pinact,[ge.id]:ge.pins})}fetch("/api/switch/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Te)}).then(ge=>ge.json()).then(ge=>{console.log("Success:",ge),vt({..._,...Te}),st(),window.location.href="/#/switch"}).catch(ge=>{console.error("Error:",ge)})},Ce=fe=>{$e(fe.target.value)},Se=fe=>{pe(parseInt(fe.target.value))},Ie=fe=>{ee(fe.target.value)},Pe=fe=>{re(fe)},Me=fe=>{ct&&fe.target===fe.currentTarget&&st()},me=()=>{pe(0),ee(""),re(0)},de=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50"
      style="margin-top: 7px;"
      onclick=${Me}
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <div
          class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative"
          style="max-height: calc(100vh - 57px); overflow-y: auto;"
        >
          <div class="modal-header flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">${dt}</h2>
            <button
              onclick=${st}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          ${(()=>{if(k==="TabSwitch"){if($==="connection")return Et`
          <form onsubmit=${xe}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${_.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${_.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Connection</td>
                    <td class="p-2">
                      <select
                        name="setrpins"
                        value=${ie.some(fe=>fe.pins===ve)?ve:""}
                        onchange=${Ce}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select a connection</option>
                        ${ie.map(fe=>Et`
                            <option value=${fe.pins}>
                              ${fe.pins} (ID: ${fe.id})
                            </option>
                          `)}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save changes
              </button>
            </div>
          </form>
        `;if($==="edit")return Et`
          <form onsubmit=${xe}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${_.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${_.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Pullup type</td>
                    <td class="p-2">
                      <select
                        name="ptype"
                        value=${ae}
                        onchange=${Se}
                        class="border rounded p-2 w-full"
                      >
                        <option value="0">None</option>
                        <option value="1">GPIO_PULLUP</option>
                        <option value="2">GPIO_PULLDOWN</option>
                      </select>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">INFO</td>
                    <td class="p-2">
                      <input
                        type="text"
                        name="info"
                        value=${Yt}
                        oninput=${Ie}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${Xt}
                        value=${Zt}
                        onChange=${Pe}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-between items-center mt-4">
              <button
                type="button"
                onclick=${me}
                class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Reset pin
              </button>
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save changes
              </button>
            </div>
          </form>
        `}})()}
        </div>
      </div>
    </div>
  `,ce=at(null);return lt(()=>{const fe=document.createElement("div");return fe.id="modal-portal",document.body.appendChild(fe),ce.current=fe,()=>{O(null,fe),document.body.removeChild(fe)}},[]),lt(()=>{ce.current&&O(de,ce.current)}),null}function initGlobalTooltip$7(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block";const _=dt.getBoundingClientRect();$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const vt=$.offsetWidth,oe=$.offsetHeight,Xt=window.innerWidth;let Yt=_.left+_.width/2-vt/2;Yt=Math.max(8,Math.min(Yt,Xt-vt-8));let ee=_.top-oe-8;ee<8&&(ee=_.bottom+8),$.style.left=Yt+"px",$.style.top=ee+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabSwitch({}){const[$,k]=ut(null),[st,ct]=ut(null),[dt,_]=ut(!1),[vt,oe]=ut(null),[Xt,Yt]=ut(null),[ee,Zt]=ut(!1),[re,ae]=ut("ru"),[pe,ve]=ut(null),[$e,ie]=ut([]),[we,xe]=ut(""),[Ce,Se]=ut(!1),Ie=at(!1),Pe=at(0),Me=at(!1);lt(()=>{initGlobalTooltip$7()},[]);const me=()=>Promise.all([fetch("/api/switch/get").then(se=>se.json()),fetch("/api/pintopin/get").then(se=>se.json())]).then(([se,$t])=>{ae(se.lang),ve(se.switches),k(se),ie($t),xe(`Pintopin data: ${JSON.stringify($t,null,2)}

Switch data: ${JSON.stringify(se.switches,null,2)}`),console.log("Pintopin data:",$t),console.log("Switch data:",se.switches)}).catch(se=>{console.error("Error fetching data:",se),xe(`Error fetching data: ${se.message}`)});lt(()=>{let se=!0;const $t=++Pe.current,le=new AbortController,ye=setTimeout(function(){le.abort()},3e3);return Promise.all([fetch("/api/switch/get",{signal:le.signal,cache:"no-store"}).then(function(_e){if(!_e.ok)throw new Error("HTTP "+_e.status);return _e.json()}),fetch("/api/pintopin/get",{signal:le.signal,cache:"no-store"}).then(function(_e){if(!_e.ok)throw new Error("HTTP "+_e.status);return _e.json()})]).then(function(_e){if($t===Pe.current&&se){var he=_e[0],ue=_e[1];he!=null&&(ve(he.switches),ae(he.lang)),ue!=null&&ie(ue)}}).catch(function(_e){_e.name!=="AbortError"&&console.warn("[TabSwitch] init fetch:",_e.message)}).finally(function(){clearTimeout(ye)}),registerPoll("switches","/api/switches",function(_e){!se||Me.current||Ie.current||_e!=null&&(_e.switches&&(ve(_e.switches),ae(_e.lang)),_e.pintopin&&ie(_e.pintopin))}),function(){se=!1,le.abort(),clearTimeout(ye),unregisterPoll("switches")}},[]);const Oe=se=>{const $t=new Map,le=pe.find(ye=>ye.id===se);return le&&le.pinact&&Object.entries(le.pinact).forEach(([ye,_e])=>{$t.set(ye,{pin:ye,relayId:_e})}),$e.forEach(ye=>{if(ye.idin===se){const _e=`${ye.pins}(${ye.idout})`;$t.has(_e)||$t.set(_e,{pin:ye.pins,relayId:ye.idout})}}),Array.from($t.values())},de=()=>({langswitch:re==="ru"?ruLangswitch:enLangswitch}),ce=(se,$t)=>{const le=de(),_e=(le[se]&&le[se][$t]||"").split(" "),he=[];let ue="";for(let De=0;De<_e.length;De++){const Ae=_e[De];ue.length+Ae.length+1<=200?ue+=(ue.length>0?" ":"")+Ae:(ue.length>0&&he.push(ue),ue=Ae)}return ue.length>0&&he.push(ue),he.join("<br>")},fe=(se,$t)=>{console.log("Удаление соединения:",se,$t);const[le,ye]=$t.split("("),_e=ye?parseInt(ye):null;fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:se,pin:le.trim()})}).then(he=>he.json()).then(he=>{ct(he),ve(ue=>ue.map(De=>{if(De.id===se){const Ae={...De.pinact};return delete Ae[le.trim()],{...De,pinact:Ae}}return De})),ie(ue=>ue.filter(De=>!(De.idin===se&&De.pins===le.trim()&&(_e===null||De.idout===_e))))}).then(()=>{console.log("Соединение удалено успешно"),me()}).catch(he=>{console.error("Ошибка при удалении соединения:",he)})},Ee=(se,$t)=>{oe(se),Yt($t),_(!0)},Te=()=>{_(!1),oe(null),Yt(null)},ge=se=>{console.log("handleSwitchChange:",se),ve($t=>$t.map(le=>le.id===se.id?se:le)),Ie.current=!0,fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:se.id,onoff:se.onoff})}).then($t=>$t.json()).then($t=>{console.log("Response from /api/onoff/set:",$t)}).catch($t=>{console.error("Error calling /api/onoff/set:",$t)}).finally(()=>{setTimeout(()=>{Ie.current=!1},1500)}),Te()},mt={ru:Et`
      <div class="mytext space-y-6">
        <div>
          <pre class="mb-4">
            Данный API позволяет дистанционно управлять выключателем, просто выполнив команду в браузере любого устройства в вашей локальной сети.
          </pre>
          <pre class="text-red-500 font-bold">
            Не открывайте доступ из интернета к вашим API - это небезопасно!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Примеры API</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">API</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">
                  http://192.168.1.24:8000/api/Zerg/switch?id=27&state=1
                </td>
                <td class="border px-4 py-2">
                  Данная команда ВКЛючает все пины, указанные в поле “Device connection”, для строки с id = 27. Где “Zerg” — это ваш “Token”.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">
                  http://192.168.1.24:8000/api/Zerg/switch?id=27&state=0
                </td>
                <td class="border px-4 py-2">
                  Данная команда ОТКлючает все пины, указанные в поле “Device connection”, для строки с id = 27. Где “Zerg” — это ваш “Token”.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <pre class="mb-4">
            MQTT позволяет дистанционно управлять выключателем из интернета!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Примеры команд MQTT</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Команда</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Zagotovka/switch/id=27/state=1</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда ВКЛючает все пины, указанные в поле “Device connection”, для строки с id = 27. Где "Zagotovka" это Ваш 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Zagotovka/switch/id=27/state=0</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда ОТКлючает все пины, указанные в поле “Device connection”, для строки с id = 27. Где "Zagotovka" это Ваш 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Отслеживание изменений</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Топик</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">Swarm/switch/</td>
                <td class="border px-4 py-2">
                  Данная страница отслеживает изменения выключателей и автоматически отправляет каждое изменение по MQTT на топик: Swarm/switch/.
                  Где "Swarm" это Ваш 'TX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Примеры SMS и DTMF команд</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Команда</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">14#1*#</td>
                <td class="border px-4 py-2">Данная команда ВКЛючает все пины, указанные в поле “Device connection” для строки с id = 14. Она работает как по SMS, так и с помощью тонального набора (DTMF) во время звонка.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">14#0*#</td>
                <td class="border px-4 py-2">Данная команда ОТКлючает все пины, указанные в поле “Device connection” для строки с id = 14. Она работает как по SMS, так и с помощью тонального набора (DTMF) во время звонка.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">14#2*#</td>
                <td class="border px-4 py-2">Данная команда переключит (TOGGLE) все пины, указанные в поле “Device connection” для строки с id = 14 на противоположное.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">14#1*15#0*#</td>
                <td class="border px-4 py-2">Можно группировать несколько команд в одну! В конце строки обязательно нужно добавить символ <b>#</b>, чтобы закрыть команду.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Ответ</td>
                <td class="border px-4 py-2">Если главный рубильник (On/Off) в какой-либо строке таблицы выключен, то команда будет проигнорирована для этой строки, а в ответном SMS придет подобное сообщение <b>14:DISABLED</b>.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,en:Et`
      <div class="mytext space-y-6">
        <div>
          <pre class="mb-4">
            This API allows you to remotely control a switch by simply executing a command in the browser of any device on your local network.
          </pre>
          <pre class="text-red-500 font-bold">
            Do not expose your APIs to the internet - it's not secure!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">API Examples</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">API</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">
                  http://192.168.1.24:8000/api/Zerg/switch?id=27&state=1
                </td>
                <td class="border px-4 py-2">
                  This command turns ON all pins specified in the "Device connection" field for the row with id = 27. Where "Zerg" is your "Token".
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">
                  http://192.168.1.24:8000/api/Zerg/switch?id=27&state=0
                </td>
                <td class="border px-4 py-2">
                  This command turns OFF all pins specified in the "Device connection" field for the row with id = 27. Where "Zerg" is your "Token".
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <pre class="mb-4">
            MQTT allows you to remotely control a switch from the internet!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">MQTT Command Examples</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Command</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">Zagotovka/switch/id=27/state=1</td>
                <td class="border px-4 py-2">
                  This MQTT command turns ON all pins specified in the "Device connection" field for the row with id = 27. Where "Zagotovka" is your 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">Zagotovka/switch/id=27/state=0</td>
                <td class="border px-4 py-2">
                  This MQTT command turns OFF all pins specified in the "Device connection" field for the row with id = 27. Where "Zagotovka" is your 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Change Tracking</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Topic</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Swarm/switch/</td>
                <td class="border px-4 py-2">
                  This page tracks switch changes and automatically sends each change via MQTT to the topic: Swarm/switch/.
                  Where "Swarm" is your 'TX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">SMS & DTMF Command Examples</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Command</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">14#1*#</td>
                <td class="border px-4 py-2">This command turns ON all pins specified in the "Device connection" field for the row with id = 14. Works via both SMS and DTMF tone dialing during a voice call.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">14#0*#</td>
                <td class="border px-4 py-2">This command turns OFF all pins specified in the "Device connection" field for the row with id = 14. Works via both SMS and DTMF tone dialing during a voice call.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">14#2*#</td>
                <td class="border px-4 py-2">This command will TOGGLE all pins specified in the "Device connection" field for the row with id = 14 to the opposite state.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">14#1*15#0*#</td>
                <td class="border px-4 py-2">You can chain multiple commands into one! At the end of the string you must append the <b>#</b> symbol to close the command.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Response</td>
                <td class="border px-4 py-2">If the master switch (On/Off) in any row of the table is turned off, the command will be ignored for that row, and a message like <b>14:DISABLED</b> will be sent in the SMS response.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `},pt=se=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${ce("langswitch",se.tooltipIndex)}
    >
      ${se.title}
    </th>
  `,ne=({d:se,index:$t})=>{const le=Oe(se.id);return Et`
      <tr class="${$t%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${se.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${se.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][se.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono">
          ${le.map(({pin:ye,relayId:_e})=>Et`
              <span class="mr-2 inline-flex items-center">
                ${ye}${_e!==void 0?`(${_e})`:""}
                <button
                  onClick=${he=>{he.preventDefault(),fe(se.id,`${ye}(${_e})`)}}
                  class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                  title="Remove connection"
                >
                  [x]
                </button>
              </span>
            `)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${se.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${se.onoff}
            onChange=${ye=>ge({...se,onoff:ye})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>Ee("connection",se)}
            class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
          >
            Connection
          </button>
          <span class="text-slate-300">|</span>
          <button
            onClick=${()=>Ee("edit",se)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors ml-2"
          >
            Edit
          </button>
        </td>
      </tr>
    `};return pe?Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Switch(es) pin(s)
        </div>

        <div class="flex-grow flex flex-col justify-center items-center w-full">
          <div class="w-full">
            <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${pt} title="ID" tooltipIndex=${1} />
                      <${pt} title="Pin" tooltipIndex=${2} />
                      <${pt} title="Pullup type" tooltipIndex=${3} />
                      <${pt} title="Device connection" tooltipIndex=${4} />
                      <${pt} title="INFO" tooltipIndex=${5} />
                      <${pt} title="On/Off" tooltipIndex=${6} />
                      <${pt} title="Action" tooltipIndex=${7} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${pe.map((se,$t)=>Et`<${ne} d=${se} index=${$t} key=${se.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>Zt(!ee)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${ee?"Hide Help":"Show Help"}
              </button>
            </div>

            ${ee&&Et`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${mt[re]}
                </div>
              `}
          </div>
        </div>

        ${dt&&Et`
            <${ModalSwitch}
              modalType=${vt}
              page="TabSwitch"
              hideModal=${Te}
              title=${vt==="connection"?"Edit Connection":"Edit switch"}
              selectedSwitch=${Xt}
              onSwitchChange=${ge}
            />
          `}
      </div>
    </div>
  `:""}const ModalButton=({modalType,page,hideModal,closeOnOverlayClick=!0,title,selectedButton,onButtonChange,SliderComponent=MyPolzunok})=>{const[buttonInfo,setButtonInfo]=ut((selectedButton==null?void 0:selectedButton.info)||""),[onoff,setOnOff]=ut((selectedButton==null?void 0:selectedButton.onoff)||0),[ptype,setPtype]=ut((selectedButton==null?void 0:selectedButton.ptype)||0),[sclick,setSclick]=ut((selectedButton==null?void 0:selectedButton.sclick)||""),[dclick,setDclick]=ut((selectedButton==null?void 0:selectedButton.dclick)||""),[lpress,setLpress]=ut((selectedButton==null?void 0:selectedButton.lpress)||""),[pinOptions,setPinOptions]=ut([]),[errors,setErrors]=ut({sclick:null,dclick:null,lpress:null}),[submitError,setSubmitError]=ut(null),doubleClickLongPressRegex=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,validateInput=$=>!$||$.trim()===""||$.toLowerCase()==="none"||doubleClickLongPressRegex.test($)?null:'Incorrect format. Use "None" or "pin:value" format.',handleInputChange=($,k)=>{const st=validateInput(k);switch(setErrors(ct=>({...ct,[$]:st})),$){case"sclick":setSclick(k);break;case"dclick":setDclick(k);break;case"lpress":setLpress(k);break}};lt(()=>{fetch("/api/select/get").then($=>$.json()).then($=>{Array.isArray($)?setPinOptions($.filter(k=>k.topin===2)):setPinOptions([])}).catch($=>{console.error("Error fetching pin config:",$),setPinOptions([])})},[]);const handleSubmit=$=>{if($.preventDefault(),Object.values(errors).some(st=>st!==null)){setSubmitError("Please correct the errors before submitting.");return}const k={...selectedButton,info:buttonInfo,sclick:sclick||"None",dclick:dclick||"None",lpress:lpress||"None",onoff,ptype};fetch("/api/button/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(k)}).then(st=>st.json()).then(st=>{onButtonChange(k),hideModal()}).catch(st=>{console.error("Error:",st),setSubmitError("Failed to save changes. Please try again.")})},handleResetPin=()=>{setPtype(0),setSclick(""),setDclick(""),setLpress(""),setButtonInfo(""),setOnOff(0),setErrors({sclick:null,dclick:null,lpress:null})},renderConnectionModal=()=>Et`
    <form onSubmit=${handleSubmit}>
      <div class="modal-body">
        <table class="table-auto w-full">
          <tbody>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">ID</td>
              <td class="p-2">${selectedButton.id}</td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Pin</td>
              <td class="p-2">${selectedButton.pins}</td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">Connection</td>
              <td class="p-2">
                <select
                  name="setrpins"
                  value=${pinOptions.some($=>$.pins===(selectedButton==null?void 0:selectedButton.setrpins))?selectedButton==null?void 0:selectedButton.setrpins:""}
                  onChange=${$=>onButtonChange({...selectedButton,setrpins:$.target.value})}
                  class="border rounded p-2 w-full"
                >
                  <option value="">Select a connection</option>
                  ${pinOptions.map($=>Et`
                      <option value=${$.pins}>
                        ${$.pins} (ID: ${$.id})
                      </option>
                    `)}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-end mt-4">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save changes
        </button>
      </div>
    </form>
  `,renderEditModal=()=>Et`
    <form onSubmit=${handleSubmit}>
      <div class="modal-body">
        <table class="table-auto w-full">
          <tbody>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">ID</td>
              <td class="p-2">${selectedButton.id}</td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Pin</td>
              <td class="p-2">${selectedButton.pins}</td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">Ptype</td>
              <td class="p-2">
                <select
                  name="ptype"
                  value=${ptype}
                  onChange=${$=>setPtype(parseInt($.target.value))}
                  class="border rounded p-2 w-full"
                >
                  <option value="0">None</option>
                  <option value="1">GPIO_PULLUP</option>
                  <option value="2">GPIO_PULLDOWN</option>
                </select>
              </td>
            </tr>
            ${["sclick","dclick","lpress"].map(type=>Et`
                <tr class=${type==="dclick"?"bg-gray-200":"bg-white"}>
                  <td class="p-2 font-bold">
                    ${type==="sclick"?"Single Click":type==="dclick"?"Double Click":"Long Press"}
                  </td>
                  <td class="p-2">
                    <input
                      type="text"
                      name=${type}
                      value=${eval(type)}
                      onInput=${$=>handleInputChange(type,$.target.value)}
                      class="border rounded p-2 w-full ${errors[type]?"border-red-500":""}"
                      placeholder="None"
                    />
                    ${errors[type]&&Et`<p class="text-red-500 text-sm">${errors[type]}</p>`}
                  </td>
                </tr>
              `)}
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">INFO</td>
              <td class="p-2">
                <input
                  type="text"
                  name="info"
                  value=${buttonInfo}
                  onInput=${$=>setButtonInfo($.target.value)}
                  class="border rounded p-2 w-full"
                />
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">On/Off</td>
              <td class="p-2">
                <${SliderComponent} value=${onoff} onChange=${setOnOff} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-between mt-4">
        <button
          type="button"
          onClick=${handleResetPin}
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset Pin
        </button>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save changes
        </button>
      </div>
      ${submitError&&Et`<p class="text-red-500 mt-2">${submitError}</p>`}
    </form>
  `,modalContent=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick=${$=>closeOnOverlayClick&&$.target===$.currentTarget&&hideModal()}
    >
      <div
        class="bg-white rounded-lg p-6 max-w-2xl w-full relative"
        style="max-height: 90vh; overflow-y: auto;"
      >
        <div class="modal-header flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">${title}</h2>
          <button
            onClick=${hideModal}
            class="close-button text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
        ${page==="TabButton"&&modalType==="connection"?renderConnectionModal():renderEditModal()}
      </div>
    </div>
  `,portalRef=at(null);return lt(()=>{const $=document.createElement("div");return $.id="modal-portal",document.body.appendChild($),portalRef.current=$,()=>{O(null,$),document.body.removeChild($)}},[]),lt(()=>{portalRef.current&&O(modalContent,portalRef.current)}),null};function initGlobalTooltip$6(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,vt=$.offsetHeight,oe=window.innerWidth,Xt=dt.getBoundingClientRect();let Yt=Xt.left+Xt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,oe-_-8));let ee=Xt.top-vt-8;ee<8&&(ee=Xt.bottom+8),$.style.left=Yt+"px",$.style.top=ee+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabButton=()=>{const[$,k]=ut(null),[st,ct]=ut([]),[dt,_]=ut(null),[vt,oe]=ut(null),[Xt,Yt]=ut(!1),[ee,Zt]=ut(null),[re,ae]=ut(null),[pe,ve]=ut(!1),[$e,ie]=ut("ru"),[we,xe]=ut(""),Ce=at(!1),Se=at(0),Ie=at(!1);lt(()=>{initGlobalTooltip$6()},[]);const Pe={ru:Et`
      <div class="mytext space-y-6">
        <div>
          <pre class="mb-4">
            Данный API позволяет дистанционно управлять кнопкой, просто выполнив команду в браузере любого устройства в вашей локальной сети.
          </pre>
          <pre class="text-red-500 font-bold">
            Не открывайте доступ из интернета к вашим API - это небезопасно!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Примеры API</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">API</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/button?id=30&single_click
                </td>
                <td class="border px-4 py-2">
                  Данная API команда выполнит действие, прописанное в 'SINGLE CLICK' c id = 30. Где "Zerg" это Ваш 'Token'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/button?id=30&double_click
                </td>
                <td class="border px-4 py-2">
                  Данная API команда выполнит действие, прописанное в 'DOUBLE CLICK' c id = 30. Где "Zerg" это Ваш 'Token'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/button?id=30&long_press
                </td>
                <td class="border px-4 py-2">
                  Данная API команда выполнит действие, прописанное в 'LONG PRESS' c id = 30. Где "Zerg" это Ваш 'Token'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <pre class="mb-4">
            MQTT позволяет дистанционно управлять кнопкой из интернета!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Примеры команд MQTT</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Команда</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Zagotovka/button/id=30/single_click</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда выполнит команду, прописанную в 'SINGLE CLICK' c id = 30. Где "Zagotovka" это Ваш 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Zagotovka/button/id=30/double_click</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда выполнит команду, прописанную в 'DOUBLE CLICK' c id = 30. Где "Zagotovka" это Ваш 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Zagotovka/button/id=30/long_press</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда выполнит команду, прописанную в 'LONG PRESS' c id = 30. Где "Zagotovka" это Ваш 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Отслеживание изменений</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Топик</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">Swarm/button/</td>
                <td class="border px-4 py-2">
                  Данная страница отслеживает изменения кнопок и автоматически отправляет каждое изменение по MQTT на топик: Swarm/button/.
                  Где "Swarm" это Ваш 'TX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Примеры SMS и DTMF команд</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Источник</th>
                <th class="border px-4 py-2">Команда</th>
                <th class="border px-4 py-2">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#SC*#</td>
                <td class="border px-4 py-2">Выполняет действие, прописанное в SINGLE CLICK для кнопки с id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#DC*#</td>
                <td class="border px-4 py-2">Выполняет действие, прописанное в DOUBLE CLICK для кнопки с id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#LP*#</td>
                <td class="border px-4 py-2">Выполняет действие, прописанное в LONG PRESS для кнопки с id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Звонок)</td>
                <td class="border px-4 py-2">30#3*#</td>
                <td class="border px-4 py-2">Аналог 30#SC*#. Выполняет SINGLE CLICK. (в тональном режиме букв нет)</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Звонок)</td>
                <td class="border px-4 py-2">30#4*#</td>
                <td class="border px-4 py-2">Аналог 30#DC*. Выполняет DOUBLE CLICK.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Звонок)</td>
                <td class="border px-4 py-2">30#5*#</td>
                <td class="border px-4 py-2">Аналог 30#LP*. Выполняет LONG PRESS.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#SL*31#DC*#</td>
                <td class="border px-4 py-2">Можно группировать несколько команд в одну! В конце строки обязательно нужно добавить символ <b>#</b>, чтобы закрыть команду.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Ответ</td>
                <td class="border px-4 py-2">DISABLED</td>
                <td class="border px-4 py-2">Если Главный рубильник (On/Off) на этой странице выключен, то команда будет проигнорирована, а в ответном SMS придет сообщение<b>30:DISABLED</b>, а не дефолтное действие.</td>
              </tr>
            </tbody>
          </table>
          <div class="mt-2 text-sm text-slate-500">
            Примечание: При желании, вы можете использовать цифровые команды (30#3*#, 30#4*#, 30#5*#) в том числе и в SMS-сообщениях.
          </div>
        </div>
      </div>
    `,en:Et`
      <div class="mytext space-y-6">
        <div>
          <pre class="mb-4">
            This API allows you to remotely control a switch by simply executing a command in the browser of any device on your local network.
          </pre>
          <pre class="text-red-500 font-bold">
            Do not expose your APIs to the internet - it's not secure!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">API Examples</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">API</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/button?id=30&single_click
                </td>
                <td class="border px-4 py-2">
                  This API command will execute the action specified in 'SINGLE CLICK' with id = 30. Where "Zerg" is your 'Token'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/button?id=30&double_click
                </td>
                <td class="border px-4 py-2">
                  This API command will execute the action specified in 'DOUBLE CLICK' with id = 30. Where "Zerg" is your 'Token'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/button?id=30&long_press
                </td>
                <td class="border px-4 py-2">
                  This API command will execute the action specified in 'LONG PRESS' with id = 30. Where "Zerg" is your 'Token'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <pre class="mb-4">
            MQTT allows you to remotely control a switch from the internet!
          </pre>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">MQTT Command Examples</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Command</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Zagotovka/button/id=30/single_click</td>
                <td class="border px-4 py-2">
                  This MQTT command will execute the command specified in 'SINGLE CLICK' with id = 30. Where "Zagotovka" is your 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Zagotovka/button/id=30/double_click</td>
                <td class="border px-4 py-2">
                  This MQTT command will execute the command specified in 'DOUBLE CLICK' with id = 30. Where "Zagotovka" is your 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Zagotovka/button/id=30/long_press</td>
                <td class="border px-4 py-2">
                  This MQTT command will execute the command specified in 'LONG PRESS' with id = 30. Where "Zagotovka" is your 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">Change Tracking</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Topic</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">Swarm/button/</td>
                <td class="border px-4 py-2">
                  This page tracks changes in buttons and automatically sends each change via MQTT to the topic: Swarm/button/. Where "Swarm" is your 'TX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2">SMS & DTMF Command Examples</h2>
          <table class="w-full">
            <thead>
              <tr>
                <th class="border px-4 py-2">Source</th>
                <th class="border px-4 py-2">Command</th>
                <th class="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#SC*#</td>
                <td class="border px-4 py-2">Executes the action specified in SINGLE CLICK for button with id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#DC*#</td>
                <td class="border px-4 py-2">Executes the action specified in DOUBLE CLICK for button with id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#LP*#</td>
                <td class="border px-4 py-2">Executes the action specified in LONG PRESS for button with id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Call)</td>
                <td class="border px-4 py-2">30#3*#</td>
                <td class="border px-4 py-2">Same as 30#SC*#. Executes SINGLE CLICK. (since letters are unavailable in DTMF)</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Call)</td>
                <td class="border px-4 py-2">30#4*#</td>
                <td class="border px-4 py-2">Same as 30#DC*#. Executes DOUBLE CLICK.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Call)</td>
                <td class="border px-4 py-2">30#5*#</td>
                <td class="border px-4 py-2">Same as 30#LP*#. Executes LONG PRESS.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#SL*31#DC*#</td>
                <td class="border px-4 py-2">You can chain multiple commands! You must append the <b>#</b> symbol at the very end of the string.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Response</td>
                <td class="border px-4 py-2">DISABLED</td>
                <td class="border px-4 py-2">If (On/Off) in any row of the table, the command will be ignored for this row, and a similar message <b>30:DISABLED</b> in the SMS.</td>
              </tr>
            </tbody>
          </table>
          <div class="mt-2 text-sm text-slate-500">
            Note: You can also use the digital commands (30#3*#, 30#4*#, 30#5*#) natively via SMS.
          </div>
        </div>
      </div>
    `};lt(()=>{let mt=!0;const pt=++Se.current,ne=new AbortController,se=setTimeout(function(){ne.abort()},3e3);return fetch("/api/button/get",{signal:ne.signal,cache:"no-store"}).then(function($t){if(!$t.ok)throw new Error("HTTP "+$t.status);return $t.json()}).then(function($t){pt===Se.current&&mt&&$t!=null&&$t.buttons&&(_($t.buttons),ie($t.lang))}).catch(function($t){$t.name!=="AbortError"&&console.warn("[TabButton] init fetch:",$t.message)}).finally(function(){clearTimeout(se)}),registerPoll("buttons","/api/buttons",$t=>{!mt||Ie.current||Ce.current||$t!=null&&$t.buttons&&(_($t.buttons),ie($t.lang))}),()=>{mt=!1,ne.abort(),clearTimeout(se),unregisterPoll("buttons")}},[]);const Me=mt=>{const pt=new Map,ne=dt.find(se=>se.id===mt);return ne&&ne.pinact&&Object.entries(ne.pinact).forEach(([se,$t])=>{pt.set(se,{pin:se,relayId:$t})}),st.forEach(se=>{if(se.idin===mt){const $t=`${se.pins}(${se.idout})`;pt.has($t)||pt.set($t,{pin:se.pins,relayId:se.idout})}}),Array.from(pt.values())},me=()=>({langbutton:$e==="ru"?rulangbutton:enlangbutton}),Oe=(mt,pt)=>{const ne=me(),se=ne[mt]&&ne[mt][pt]?ne[mt][pt]:"";return de(se)},de=(mt,pt=100)=>{if(!mt||typeof mt!="string")return"";const ne=[];let se="";const $t=mt.split(`
`);return $t.forEach((le,ye)=>{le.split(" ").filter(he=>he.length>0).forEach(he=>{const ue=se.length===0?he:" "+he;se.length+ue.length<=pt?se+=ue:(se.length>0&&ne.push(se),se=he)}),se.length>0&&(ne.push(se),se=""),ye<$t.length-1&&ne.push("")}),se.length>0&&ne.push(se),ne.join(`
`)},ce=(mt,pt)=>{Zt(mt),ae(pt),Yt(!0)},fe=()=>{Yt(!1),Zt(null),ae(null)},Ee=mt=>{console.log("handleButtonChange:",mt),_(pt=>pt.map(ne=>ne.id===mt.id?{...ne,...mt}:ne)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:mt.id,onoff:mt.onoff})}).then(pt=>pt.json()).then(pt=>{console.log("Response from /api/onoff/set:",pt)}).catch(pt=>{console.error("Error calling /api/onoff/set:",pt)}).finally(()=>{setTimeout(()=>{Ce.current=!1},1500)}),fe()},Te=mt=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Oe("langbutton",mt.tooltipIndex)}
    >
      ${mt.title}
    </th>
  `,ge=({d:mt,index:pt})=>(Me(mt.id),Et`
      <tr class="${pt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${mt.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${mt.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][mt.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${de(mt.sclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${de(mt.dclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${de(mt.lpress)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${mt.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${mt.onoff}
            onChange=${ne=>Ee({...mt,onoff:ne})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>ce("edit",mt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors ml-2"
          >
            Edit
          </button>
        </td>
      </tr>
    `);return dt?Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Button(s) pin(s)
        </div>

        <div class="flex-grow flex flex-col justify-center items-center w-full">
          <div class="w-full">
            <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${Te} title="ID" tooltipIndex=${1} />
                      <${Te} title="Pin" tooltipIndex=${2} />
                      <${Te} title="Pullup type" tooltipIndex=${3} />
                      <${Te} title="SINGLE CLICK" tooltipIndex=${4} />
                      <${Te} title="DOUBLE CLICK" tooltipIndex=${5} />
                      <${Te} title="LONG PRESS" tooltipIndex=${6} />
                      <${Te} title="INFO" tooltipIndex=${7} />
                      <${Te} title="On/Off" tooltipIndex=${8} />
                      <${Te} title="Action" tooltipIndex=${9} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${dt.map((mt,pt)=>Et`<${ge} d=${mt} index=${pt} key=${mt.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>ve(!pe)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${pe?"Hide Help":"Show Help"}
              </button>
            </div>

            ${pe&&Et`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${Pe[$e]}
                </div>
              `}
          </div>
        </div>
      </div>
    </div>

    ${Xt&&Et`
        <${ModalButton}
          modalType=${ee}
          page="TabButton"
          hideModal=${fe}
          title=${ee==="connection"?"Edit Connection":"Edit Button pin"}
          selectedButton=${re}
          onButtonChange=${Ee}
        />
      `}
  `:""};function ModalEncoder({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedEncoder:_,handleEncoderChange:vt,connectionOptions:oe,SliderComponent:Xt=MyPolzunok}){const[Yt,ee]=ut((_==null?void 0:_.info)||""),[Zt,re]=ut((_==null?void 0:_.onoff)===1),[ae,pe]=ut({pin:(_==null?void 0:_.encdrbpin)||"",id:(_==null?void 0:_.encoderb)||""}),[ve,$e]=ut(Object.entries(_.pinact||{})[0]||["",""]),[ie,we]=ut([]),[xe,Ce]=ut([]),[Se,Ie]=ut([]),Pe=_.pwmmax||100,[Me,me]=ut(_.dvalue||0),[Oe,de]=ut(_.ponr||0),[ce,fe]=ut(_.pwm||1e7),Ee=ue=>Math.round(ue*Pe/100);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(ue=>{if(!ue.ok)throw new Error(`HTTP error! status: ${ue.status}`);return ue.json()}).then(ue=>{if(!ue||!ue.data||!Array.isArray(ue.data)){console.error("Invalid data format:",ue),we([]),Ce([]),Ie([]);return}const De=ue.data.filter(te=>te.topin===2),Ae=ue.data.filter(te=>te.topin===9),Re=ue.data.filter(te=>te.topin===5);if(we(De),Ce(Ae),Ie(Re),_.encoderb||_.encdrbpin){const te=Ae.find(ke=>String(ke.id)===String(_.encoderb)||ke.pins===_.encdrbpin);pe({pin:te?te.pins:"",id:te?te.id:""})}}).catch(ue=>{console.error("Error fetching pin config:",ue),we([]),Ce([]),Ie([])})},[_]);const Te=ue=>{if(ue.preventDefault(),!(ue.target instanceof HTMLFormElement))return;let Ae={};if($==="edit")Ae={topin:8,id:_.id,pins:_.pins,pwm:parseInt(ce),pwmmax:_.pwmmax,dvalue:parseInt(Me),ponr:parseInt(Oe),info:Yt,onoff:Zt?1:0};else if($==="connection"){const te=ve&&ve[0]&&ve[1]!==void 0?{[ve[0]]:parseInt(ve[1])}:{};Ae={id:_.id,pins:_.pins,pwm:parseInt(ce)},ae&&ae.id!==void 0&&ae.id!==""?(Ae.encoderb=parseInt(ae.id),Ae.encdrbpin=ae.pin):(Ae.encoderb=255,Ae.encdrbpin=""),Ae.pinact=te}console.log("Sending JSON to STM32:",JSON.stringify(Ae)),fetch("/api/encoder/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Ae)}).then(Re=>Re.json()).then(Re=>{vt({..._,...Ae}),st()}).catch(Re=>console.error("Error saving encoder:",Re))},ge=ue=>{ee(ue.target.value)},mt=ue=>{re(ue)},pt=ue=>{const De=xe.find(Ae=>Ae.pins===ue.target.value);pe({pin:ue.target.value,id:De?De.id:""})},ne=ue=>{if(!ue.target.value)$e(["",""]);else{const De=ue.target.value.split("|");$e([De[0],De[1]])}},se=ue=>{me(ue.target.value)},$t=ue=>{de(ue.target.value)},le=ue=>{const De=ue/1e3;return De<=4e4?{cls:"text-green-600",msg:"Optimal range"}:De<=2e5?{cls:"text-yellow-600",msg:"Precision might drop"}:{cls:"text-red-600",msg:"Expert mode: low precision"}},_e=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick=${ue=>ct&&ue.target===ue.currentTarget&&st()}
    >
      <div
        class="bg-white rounded-lg p-6 max-w-2xl w-full relative"
        style="max-height: 90vh; overflow-y: auto;"
      >
        <div class="modal-header flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">${dt}</h2>
          <button
            onClick=${st}
            class="close-button text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
        ${(()=>{if(k==="TabEncoder"){if($==="connection")return Et`
          <form onsubmit=${Te}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${_.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${_.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Encoder B</td>
                    <td class="p-2">
                      <select
                        name="encdrb"
                        value=${xe.some(ue=>ue.pins===ae.pin)?ae.pin:""}
                        onchange=${pt}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select Encoder B</option>
                        ${xe.map(ue=>Et`
                            <option value=${ue.pins}>
                              ${ue.pins} (ID: ${ue.id})
                            </option>
                          `)}
                      </select>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">PWM connection</td>
                    <td class="p-2">
                      <select
                        name="pwmconnection"
                        value=${Se.some(ue=>String(ue.pins)===String(ve[0]))?`${ve[0]}|${ve[1]}`:""}
                        onchange=${ne}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select PWM connection</option>
                        ${Se.map(ue=>{const De=pwmTimerMap[ue.pins]||"Unknown Timer";return Et`
                            <option value=${`${ue.pins}|${ue.id}`}>
                              ${ue.pins} (${De}, ID: ${ue.id})
                            </option>
                          `})}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save changes
              </button>
            </div>
          </form>
        `;if($==="edit")return Et`
          <form onsubmit=${Te}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${_.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${_.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">PWM Frequency (milliHz)</td>
                    <td class="p-2">
                      <input
                        type="number"
                        min="50"
                        max="2000000000"
                        value=${ce}
                        oninput=${ue=>fe(ue.target.value)}
                        class="border rounded p-2 w-full font-mono"
                        placeholder="50 - 2000000000"
                      />
                      <div class="text-xs ${le(ce).cls}">
                        ${le(ce).msg}
                      </div>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Resolution</td>
                    <td class="p-2 text-blue-600 font-mono">
                      ${_.pwmmax||"---"} steps
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Dimmer value %</td>
                    <td class="p-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value=${Me}
                        oninput=${se}
                        class="border rounded p-2 w-full"
                      />
                      <div class="text-xs text-gray-500">
                        ${Me}% = ${Ee(parseInt(Me)||0)} / ${Pe} steps
                      </div>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Duty on restore</td>
                    <td class="p-2">
                      <select
                        value=${Oe}
                        onchange=${$t}
                        class="border rounded p-2 w-full"
                      >
                        <option value="0">OFF</option>
                        <option value="1">ON</option>
                      </select>
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">INFO</td>
                    <td class="p-2">
                      <input
                        type="text"
                        name="info"
                        value=${Yt}
                        oninput=${ge}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${Xt}
                        value=${Zt}
                        onChange=${mt}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save changes
              </button>
            </div>
          </form>
        `}})()}
      </div>
    </div>
  `,he=at(null);return lt(()=>{const ue=document.createElement("div");return ue.id="encoder-modal-portal",document.body.appendChild(ue),he.current=ue,()=>{O(null,ue),document.body.removeChild(ue)}},[]),lt(()=>{he.current&&O(_e,he.current)}),null}function initGlobalTooltip$5(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,vt=$.offsetHeight,oe=window.innerWidth,Xt=dt.getBoundingClientRect();let Yt=Xt.left+Xt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,oe-_-8));let ee=Xt.top-vt-8;ee<8&&(ee=Xt.bottom+8),$.style.left=Yt+"px",$.style.top=ee+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const pwmTimerMap={PA0:"TIM2",PA3:"TIM2",PB10:"TIM2",PA6:"TIM3",PB1:"TIM3",PB15:"TIM12",PC6:"TIM8",PC7:"TIM8",PC8:"TIM8",PC9:"TIM8",PD12:"TIM4",PD13:"TIM4",PD14:"TIM4",PD15:"TIM4",PE5:"TIM9",PE6:"TIM9",PE9:"TIM1",PE11:"TIM1",PE13:"TIM1",PE14:"TIM1",PF6:"TIM10",PF7:"TIM11",PF8:"TIM13",PF9:"TIM14"};function TabEncoder({}){{const[$,k]=ut(null),[st,ct]=ut(null),[dt,_]=ut(!1),[vt,oe]=ut(null),[Xt,Yt]=ut(null),[ee,Zt]=ut(!1),[re,ae]=ut("ru"),[pe,ve]=ut([]),$e=at(!1),ie=at(0),we=at(!1);lt(()=>{initGlobalTooltip$5()},[]);const xe=()=>Promise.all([fetch("/api/encoder/get").then(mt=>mt.json()),fetch("/api/pintopin/get").then(mt=>mt.json())]).then(([mt,pt])=>{ae(mt.lang),k(mt.encoders),ve(pt),console.log("Encoder data:",mt.encoders),console.log("Pintopin data:",pt)}).catch(mt=>{console.error("Error fetching data:",mt)});lt(()=>{let mt=!0;const pt=++ie.current,ne=new AbortController,se=setTimeout(function(){ne.abort()},3e3);return Promise.all([fetch("/api/encoder/get",{signal:ne.signal,cache:"no-store"}).then(function($t){if(!$t.ok)throw new Error("HTTP "+$t.status);return $t.json()}),fetch("/api/pintopin/get",{signal:ne.signal,cache:"no-store"}).then(function($t){if(!$t.ok)throw new Error("HTTP "+$t.status);return $t.json()})]).then(function($t){if(pt===ie.current&&mt){var le=$t[0],ye=$t[1];le!=null&&(k(le.encoders),ae(le.lang)),ye!=null&&ve(ye)}}).catch(function($t){$t.name!=="AbortError"&&console.warn("[TabEncoder] init fetch:",$t.message)}).finally(function(){clearTimeout(se)}),registerPoll("encoders","/api/encoders",function($t){!mt||we.current||$e.current||$t!=null&&($t.encoders&&(k($t.encoders),ae($t.lang)),$t.pintopin&&ve($t.pintopin))}),function(){mt=!1,ne.abort(),clearTimeout(se),unregisterPoll("encoders")}},[]);const Ce=mt=>{k(pt=>pt.map(ne=>ne.id===mt.id?mt:ne)),$e.current=!0,fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:mt.id,onoff:mt.onoff})}).then(pt=>pt.json()).then(pt=>{console.log("Response from /api/onoff/set (Encoder):",pt)}).catch(pt=>{console.error("Error calling /api/onoff/set (Encoder):",pt)}).finally(()=>{setTimeout(()=>{$e.current=!1},1500)})},Se=mt=>{const pt=$.find(se=>se.id===mt),ne=[];return pt&&pt.pinact&&Object.entries(pt.pinact).forEach(([se,$t])=>{ne.push({pin:se,idout:$t})}),ne},Ie=mt=>{const pt=mt/1e3;return pt<=4e4?{cls:"text-green-600",msg:"✓"}:pt<=2e5?{cls:"text-yellow-600",msg:"~"}:{cls:"text-red-600",msg:"!"}},Pe=mt=>{if(!mt)return"—";const pt=mt/1e3;return pt>=1e6?`${(pt/1e6).toFixed(2)} MHz`:pt>=1e3?`${(pt/1e3).toFixed(1)} kHz`:`${pt} Hz`},Me=()=>({langbutton:re==="ru"?ruencoder:enencoder}),me=(mt,pt)=>{const ne=Me(),se=ne[mt]&&ne[mt][pt]?ne[mt][pt]:"";return Oe(se)},Oe=(mt,pt=50)=>{if(!mt||typeof mt!="string")return"";const ne=mt.split(" ");let se=[],$t="";for(let le=0;le<ne.length;le++)$t.length+ne[le].length+1<=pt?$t+=`${$t?" ":""}${ne[le]}`:($t&&se.push($t.trim()),$t=ne[le]);return $t&&se.push($t.trim()),se.join(`
`)},de=(mt,pt)=>{console.log("Deleting connection:",mt,pt);const ne=pt.split("(")[0].trim();fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:mt,pin:ne})}).then(se=>se.ok?se.json():se.text().then($t=>{throw new Error(`HTTP error! status: ${se.status}, message: ${$t}`)})).then(se=>{ct(se),k($t=>$t.map(le=>{if(le.id===mt){const ye={...le.pinact};return delete ye[ne],{...le,pinact:ye}}return le})),ve($t=>$t.filter(le=>!(le.idin===mt&&le.pins===ne)))}).then(()=>{console.log("Connection deleted successfully"),xe()}).catch(se=>{console.error("Error deleting connection:",se)})},ce=(mt,pt)=>{console.log("Opening modal:",mt,pt),oe(mt),Yt(pt),_(!0)},fe=()=>{_(!1),oe(null),Yt(null)},Ee={ru:Et`
        <div class="mytext space-y-6">
          <div>
            <pre class="mb-4">
              Данный API позволяет дистанционно управлять энкодером, просто выполнив команду в браузере любого устройства в вашей локальной сети.
            </pre>
            <pre class="text-red-500 font-bold">
              Не открывайте доступ из интернета к вашим API - это небезопасно!
            </pre>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Примеры API</h2>
            <table class="w-full">
              <thead>
                <tr>
                  <th class="border px-4 py-2">API</th>
                  <th class="border px-4 py-2">Описание</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border px-4 py-2">
                    http://192.168.1.24:8000/api/Zerg/pwm?id=4&dvalue=25
                  </td>
                  <td class="border px-4 py-2">
                    Данная API команда установит значение димера в 25% для PWM-пина с id = 4. Где "Zerg" это Ваш 'Token'.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <pre class="mb-4">
              MQTT позволяет дистанционно управлять энкодером из интернета!
            </pre>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Примеры команд MQTT</h2>
            <table class="w-full">
              <thead>
                <tr>
                  <th class="border px-4 py-2">API</th>
                  <th class="border px-4 py-2">Описание</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border px-4 py-2">Zerg/pwm/id=4/dvalue=25</td>
                  <td class="border px-4 py-2">
                    Данная MQTT команда установит значение диммера в 25% для PWM-пина с id = 4. Где "Zerg" это Ваш 'RX topic'.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Отслеживание изменений</h2>
            <div class="bg-teal-50 p-4 rounded-lg border border-teal-100 text-sm">
              <p class="mb-3">Контроллер автоматически публикует состояние сенсоров и PWM-выходов в MQTT-топик <strong>Swarm/sensors/</strong>, где <strong>"Swarm"</strong> — ваш TX topic.</p>
              <p class="mb-2 font-semibold text-teal-800">Формат пакета:</p>
              <div class="font-mono bg-white/70 border border-teal-200 px-3 py-2 mb-3 text-xs rounded">
                {"sn":value,"hid":[Tvalue, Hvalue],"pid":Duty}
              </div>
              <li><b>Пример: {"28B63A75D0013C7B":26.44,"h46":[20.6,46.0],"p24":18}</b></li>
              <ul class="list-disc pl-5 space-y-1 text-slate-700">
                <li><b>sn</b> — серийный номер DS18B20 : (Tvalue - температура, °C)</li>
                <li><b>hid</b> — датчик DHT22 : (массив [Tvalue - значение температуры, Hvalue - значение влажности])</li>
                <li><b>pid</b> — PWM-выход : (значение Duty 0–100%)</li>
              </ul>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2 text-indigo-700">Ограничения аппаратных таймеров (Hardware Timers)</h2>
            <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-sm">
              <p class="mb-2"><strong>Важно:</strong> Вы можете установить желаемую частоту ШИМ от <strong>0.05 Hz до 2 MHz</strong>. Однако, генерация ШИМ зависит от аппаратных таймеров микроконтроллера (например, TIM1, TIM2 и т.д.).</p>
              <p class="mb-2"><strong>Один таймер не может генерировать разные частоты одновременно!</strong> Если вы назначите разные пины, которые используют <em>один и тот же таймер</em>, к разным энкодерам и зададите им разную частоту, применится последняя установленная частота ко всем пинам этого таймера.</p>
              <p class="mb-2">Чтобы использовать разную частоту для разных устройств, выбирайте пины, привязанные к <strong>разным таймерам</strong>.</p>
              <p class="mt-4 font-semibold text-indigo-800">Карта привязки пинов ШИМ к таймерам и их возможности:</p>
              <ul class="list-disc pl-5 mt-2 space-y-3 text-slate-700">
                <li>
                  <strong>TIM1 (16-bit Advanced):</strong> PE9, PE11, PE13, PE14<br/>
                  <span class="text-sm text-slate-500">Высокоскоростной таймер. Оптимален для средних и высоких частот (от 10 Hz до 2 MHz).</span>
                </li>
                <li>
                  <strong>TIM2 (32-bit):</strong> PA0, PA3, PB10<br/>
                  <span class="text-sm text-slate-500">За счет 32-битного счетчика аппаратно поддерживает сверхнизкие частоты с максимальным разрешением (от 0.05 Hz до 100 kHz).</span>
                </li>
                <li>
                  <strong>TIM3 (16-bit General):</strong> PA6, PB1<br/>
                  <span class="text-sm text-slate-500">Базовый ШИМ таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM4 (16-bit General):</strong> PD12, PD13, PD14, PD15<br/>
                  <span class="text-sm text-slate-500">Базовый ШИМ таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM8 (16-bit Advanced):</strong> PC6, PC7, PC8, PC9<br/>
                  <span class="text-sm text-slate-500">Высокоскоростной таймер. Оптимален для средних и высоких частот (от 10 Hz до 2 MHz).</span>
                </li>
                <li>
                  <strong>TIM9 (16-bit):</strong> PE5, PE6<br/>
                  <span class="text-sm text-slate-500">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM10 (16-bit):</strong> PF6<br/>
                  <span class="text-sm text-slate-500">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM11 (16-bit):</strong> PF7<br/>
                  <span class="text-sm text-slate-500">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM12 (16-bit):</strong> PB15<br/>
                  <span class="text-sm text-slate-500">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM13 (16-bit):</strong> PF8<br/>
                  <span class="text-sm text-slate-500">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM14 (16-bit):</strong> PF9<br/>
                  <span class="text-sm text-slate-500">Вспомогательный таймер (от 10 Hz до 500 kHz).</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      `,en:Et`
        <div class="mytext space-y-6">
          <div>
            <pre class="mb-4">
              This API allows you to remotely control a switch by simply executing a command in the browser of any device on your local network.
            </pre>
            <pre class="text-red-500 font-bold">
              Do not expose your APIs to the internet - it's not secure!
            </pre>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">API Examples</h2>
            <table class="w-full">
              <thead>
                <tr>
                  <th class="border px-4 py-2">API</th>
                  <th class="border px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border px-4 py-2">
                    http://192.168.1.24:8000/api/Zerg/pwm?id=7&dvalue=25
                  </td>
                  <td class="border px-4 py-2">
                    This command will set the dimmer to 25% for the PWM-pin with ID=7. Where "Zerg" is your 'Token'.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <pre class="mb-4">
              MQTT allows you to remotely control a switch from the internet!
            </pre>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">MQTT Command Examples</h2>
            <table class="w-full">
              <thead>
                <tr>
                  <th class="border px-4 py-2">Command</th>
                  <th class="border px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border px-4 py-2">Zerg/pwm/id=7/dvalue=25</td>
                  <td class="border px-4 py-2">
                    This command will set the dimmer to 25% for the PWM-pin with ID=7. Where "Zerg" is your 'RX topic'.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Change Tracking</h2>
            <div class="bg-teal-50 p-4 rounded-lg border border-teal-100 text-sm">
              <p class="mb-3">The controller automatically publishes sensor states and PWM output values to the MQTT topic <strong>Swarm/sensors/</strong>, where <strong>"Swarm"</strong> is your TX topic.</p>
              <p class="mb-2 font-semibold text-teal-800">Packet format:</p>
              <div class="font-mono bg-white/70 border border-teal-200 px-3 py-2 mb-3 text-xs rounded">
                {"sn":value,"hid":[Tvalue, Hvalue],"pid":Duty}
              </div>
              <li><b>Example: {"28B63A75D0013C7B":26.44,"h46":[20.6,46.0],"p24":18}</b></li>
              <ul class="list-disc pl-5 space-y-1 text-slate-700">
                <li><b>sn</b> — DS18B20 serial number : (Tvalue — temperature, °C)</li>
                <li><b>hid</b> — DHT22 sensor : (array [Tvalue — temperature, Hvalue — humidity])</li>
                <li><b>pid</b> — PWM output : (Duty value 0–100%)</li>
              </ul>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2 text-indigo-700">Hardware Timer Limitations</h2>
            <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-sm">
              <p class="mb-2"><strong>Important:</strong> You can set the desired PWM frequency from <strong>0.05 Hz to 2 MHz</strong>. However, PWM generation depends on the microcontroller's hardware timers (e.g., TIM1, TIM2, etc.).</p>
              <p class="mb-2"><strong>A single timer cannot generate different frequencies simultaneously!</strong> If you assign different pins that share the <em>same timer</em> to different encoders and set different frequencies, the last set frequency will apply to all pins sharing that timer.</p>
              <p class="mb-2">To use different frequencies for different devices, choose pins connected to <strong>different hardware timers</strong>.</p>
              <p class="mt-4 font-semibold text-indigo-800">PWM Pin to Timer Mapping and Capabilities:</p>
              <ul class="list-disc pl-5 mt-2 space-y-3 text-slate-700">
                <li>
                  <strong>TIM1 (16-bit Advanced):</strong> PE9, PE11, PE13, PE14<br/>
                  <span class="text-sm text-slate-500">High-speed timer. Optimal for medium and high frequencies (from 10 Hz to 2 MHz).</span>
                </li>
                <li>
                  <strong>TIM2 (32-bit):</strong> PA0, PA3, PB10<br/>
                  <span class="text-sm text-slate-500">32-bit counter natively supports ultra-low frequencies with maximum resolution (from 0.05 Hz to 100 kHz).</span>
                </li>
                <li>
                  <strong>TIM3 (16-bit General):</strong> PA6, PB1<br/>
                  <span class="text-sm text-slate-500">Standard PWM timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM4 (16-bit General):</strong> PD12, PD13, PD14, PD15<br/>
                  <span class="text-sm text-slate-500">Standard PWM timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM8 (16-bit Advanced):</strong> PC6, PC7, PC8, PC9<br/>
                  <span class="text-sm text-slate-500">High-speed timer. Optimal for medium and high frequencies (from 10 Hz to 2 MHz).</span>
                </li>
                <li>
                  <strong>TIM9 (16-bit):</strong> PE5, PE6<br/>
                  <span class="text-sm text-slate-500">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM10 (16-bit):</strong> PF6<br/>
                  <span class="text-sm text-slate-500">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM11 (16-bit):</strong> PF7<br/>
                  <span class="text-sm text-slate-500">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM12 (16-bit):</strong> PB15<br/>
                  <span class="text-sm text-slate-500">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM13 (16-bit):</strong> PF8<br/>
                  <span class="text-sm text-slate-500">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
                <li>
                  <strong>TIM14 (16-bit):</strong> PF9<br/>
                  <span class="text-sm text-slate-500">Auxiliary timer (from 10 Hz to 500 kHz).</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      `},Te=({title:mt,tooltipIndex:pt})=>Et`
      <th
        class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
        data-tip=${me("langbutton",pt)}
      >
        ${mt}
      </th>
    `,ge=({d:mt,index:pt})=>{const ne=Se(mt.id),se=Ie(mt.pwm||0),$t=ne.map(le=>pwmTimerMap[le.pin]).filter((le,ye,_e)=>le&&_e.indexOf(le)===ye);return Et`
        <tr class="${pt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
          <td class="px-6 py-2 text-sm text-slate-800 font-medium">${mt.pins}(${mt.id})</td>
          <td class="px-6 py-2 text-sm text-slate-700">
            ${mt.encdrbpin?`${mt.encdrbpin}(${mt.encoderb})`:"Not set"}
          </td>
          <td class="px-6 py-2 text-sm text-slate-700 font-mono">
            ${ne.length>0?ne.map(({pin:le,idout:ye})=>Et`
                    <span class="mr-2 inline-flex items-center">
                      ${le}(${ye})
                      <button
                        onClick=${_e=>{_e.preventDefault(),de(mt.id,`${le}(${ye})`)}}
                        class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                        title="Remove connection"
                      >
                        [x]
                      </button>
                    </span>
                  `):"Not set"}
          </td>
          <td class="px-6 py-2 text-sm">
            <span class="font-mono text-slate-700">${Pe(mt.pwm)}</span>
            <span class="ml-1 font-bold ${se.cls}">${se.msg}</span>
            ${$t.length>0?Et`<span class="ml-2 font-mono text-xs text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200 shadow-sm" title="Hardware Timer">${$t.join(", ")}</span>`:""}
          </td>
          <td class="px-6 py-2 font-mono text-sm text-blue-600">
            ${mt.pwmmax?`${mt.pwmmax} steps`:"—"}
          </td>
          <td class="px-6 py-2 text-sm text-slate-800">${mt.dvalue}</td>
          <td class="px-6 py-2 text-sm text-slate-700 font-semibold">${mt.ponr===1?"ON":"OFF"}</td>
          <td class="px-6 py-2 text-sm text-slate-600">${mt.info}</td>
          <td class="px-6 py-2">
            <${MyPolzunok}
              value=${mt.onoff}
              onChange=${le=>Ce({...mt,onoff:le})}
            />
          </td>
          <td class="px-6 py-2 text-sm whitespace-nowrap">
            <button
              onClick=${()=>ce("connection",mt)}
              class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
            >
              Connection
            </button>
            <span class="text-slate-300">|</span>
            <button
              onClick=${()=>ce("edit",mt)}
              class="text-blue-600 hover:text-blue-800 font-semibold transition-colors ml-2"
            >
              Edit Encdr.
            </button>
          </td>
        </tr>
      `};return $?Et`
      <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
        <!-- Decorative background glow -->
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div class="w-full relative z-10">
          <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
            Encoder(s) pin(s)
          </div>
          <div class="flex-grow flex flex-col justify-center items-center w-full">
            <div class="w-full">
              <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
                <div class="overflow-x-auto w-full">
                  <table class="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                      <tr class="bg-teal-600/10 border-b border-teal-600/20">
                        <${Te} title="Encoder A (ID)" tooltipIndex=${3} />
                        <${Te} title="Encoder B (ID)" tooltipIndex=${4} />
                        <${Te} title="PWM connection" tooltipIndex=${5} />
                        <${Te} title="PWM Frequency" tooltipIndex=${11} />
                        <${Te} title="Resolution (steps)" tooltipIndex=${12} />
                        <${Te} title="Dimmer value (0-100)" tooltipIndex=${6} />
                        <${Te} title="Duty on restore" tooltipIndex=${7} />
                        <${Te} title="INFO" tooltipIndex=${8} />
                        <${Te} title="On/Off" tooltipIndex=${9} />
                        <${Te} title="Action" tooltipIndex=${10} />
                      </tr>
                    </thead>
                    <tbody id="tab1" class="divide-y divide-white/40">
                      ${$.map((mt,pt)=>Et`<${ge} d=${mt} index=${pt} key=${mt.id} />`)}
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="flex justify-end mt-6">
                <button
                  onclick=${()=>Zt(!ee)}
                  class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
                >
                  ${ee?"Hide Help":"Show Help"}
                </button>
              </div>

              ${ee&&Et`
                  <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                    ${Ee[re]}
                  </div>
                `}
            </div>
          </div>
          ${dt&&Et`
              <${ModalEncoder}
                modalType=${vt}
                page="TabEncoder"
                hideModal=${fe}
                title=${vt==="connection"?"Edit Connection":"Edit Encoder"}
                selectedEncoder=${Xt}
                handleEncoderChange=${Ce}
              />
            `}
        </div>
      </div>
    `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">Loading...</div>`}}function ModalCron({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedCron:_,handleCronChange:vt,connectionOptions:oe,modalClass:Xt,SliderComponent:Yt=MyPolzunok}){const[ee,Zt]=ut((_==null?void 0:_.info)||""),[re,ae]=ut((_==null?void 0:_.onoff)===1),[pe,ve]=ut((_==null?void 0:_.activ)||""),[$e,ie]=ut((_==null?void 0:_.cron)||""),[we,xe]=ut(_.setrpins||""),Ce=ce=>{ce.preventDefault();const fe=new FormData(ce.target),Ee=Object.fromEntries(fe);Ee.id=_.id,Ee.pins=_.pins,$==="edit"?(Ee.onoff=re?1:0,Ee.info=ee,Ee.cron=$e,Ee.activ=pe):$==="connection"&&(Ee.setrpins=we),console.log("Data being sent to server:"),console.log(Ee),console.log("Stringified data:"),console.log(JSON.stringify(Ee)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Ee)}).then(Te=>Te.json()).then(Te=>{console.log("Success:",Te),vt({..._,...Ee}),st(),window.location.href="/#/cron"}).catch(Te=>{console.error("Error:",Te)})};lt(()=>{Zt((_==null?void 0:_.info)||""),xe((_==null?void 0:_.setrpins)||""),ae((_==null?void 0:_.onoff)===1)},[_]);const Se=ce=>{ie(ce.target.value)},Ie=ce=>{Zt(ce.target.value)},Pe=ce=>{ae(ce)},Me=ce=>{ve(ce.target.value)},me=()=>{if(k==="TabCron"&&$==="edit")return Et`
          <form onsubmit=${Ce}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  ${[{label:"ID",value:_.id},{label:"Cron",value:Et`
                        <input
                          type="text"
                          value=${$e}
                          onInput=${Se}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"Script",value:Et`
                        <input
                          type="text"
                          value=${pe}
                          onInput=${Me}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"INFO",value:Et`
                        <input
                          type="text"
                          value=${ee}
                          onInput=${Ie}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"On/Off",value:Et`<${Yt}
                        value=${re}
                        onChange=${Pe}
                      />`}].map((ce,fe)=>Et`
                      <tr
                        class="${fe%2===1?"bg-white":"bg-gray-200"}"
                      >
                        <td class="p-2 font-bold">${ce.label}</td>
                        <td class="p-2">${ce.value}</td>
                      </tr>
                    `)}
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save changes
              </button>
            </div>
          </form>
        `},Oe=Et`
    <div class=${`modal ${Xt||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${ce=>ct&&ce.target===ce.currentTarget&&st()}
        >
          <div
            class="modal-content bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg relative"
            style="margin-top: 0px;"
          >
            <div
              class="modal-header flex justify-between items-center border-b pb-4 mb-4"
            >
              <h5 class="text-xl font-bold">
                ${$==="edit"?"Edit Timer":"Edit Connection"}
              </h5>
              <button
                class="close-button text-gray-500 hover:text-gray-700"
                onclick=${st}
              >
                Close
              </button>
            </div>
            ${me()}
          </div>
        </div>
      </div>
    </div>
  `,de=at(null);return lt(()=>{const ce=document.createElement("div");return ce.id="modal-portal",document.body.appendChild(ce),de.current=ce,()=>{O(null,ce),document.body.removeChild(ce)}},[]),lt(()=>{de.current&&O(Oe,de.current)}),null}function ModalPwmCron({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedCron:_,handleCronChange:vt,modalClass:oe,SliderComponent:Xt=MyPolzunok}){let Yt="",ee="900",Zt="0",re="100";if(_!=null&&_.activ&&_.activ.startsWith("pwm:")){const mt=_.activ.substring(4).split(",");mt.length===4&&(Yt=mt[0],ee=mt[1],Zt=mt[2],re=mt[3])}const[ae,pe]=ut((_==null?void 0:_.info)||""),[ve,$e]=ut((_==null?void 0:_.onoff)===1),[ie,we]=ut((_==null?void 0:_.cron)||""),[xe,Ce]=ut(Yt),[Se,Ie]=ut(ee),[Pe,Me]=ut(Zt),[me,Oe]=ut(re),[de,ce]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store"}).then(mt=>mt.json()).then(mt=>{if(mt&&mt.data&&Array.isArray(mt.data)){const pt=mt.data.filter(ne=>ne.topin===5);ce(pt),!xe&&pt.length>0&&Ce(pt[0].id.toString())}}).catch(mt=>console.error("Error fetching pin config:",mt))},[]);const fe=mt=>{mt.preventDefault();const pt=new FormData(mt.target),ne=Object.fromEntries(pt);ne.id=_.id,ne.pins=_.pins,ne.onoff=ve?1:0,ne.info=ae,ne.cron=ie,ne.activ=`pwm:${xe},${Se},${Pe},${me}`,fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ne)}).then(se=>se.json()).then(se=>{vt({..._,...ne}),st(),window.location.href="/#/cron"}).catch(se=>console.error("Error:",se))},Ee=()=>Et`
      <form onsubmit=${fe}>
        <div class="modal-body">
          <table class="table-auto w-full">
            <tbody>
              <tr class="bg-gray-200">
                <td class="p-2 font-bold">ID</td>
                <td class="p-2">${_.id}</td>
              </tr>
              <tr class="bg-white">
                <td class="p-2 font-bold">PWM Pin</td>
                <td class="p-2">
                  <select
                    value=${xe}
                    onChange=${mt=>Ce(mt.target.value)}
                    class="border rounded p-2 w-full"
                    required
                  >
                    ${de.map(mt=>Et`<option value=${mt.id}>${mt.pins}</option>`)}
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200">
                <td class="p-2 font-bold">Cron Pattern</td>
                <td class="p-2">
                  <input
                    type="text"
                    value=${ie}
                    onInput=${mt=>we(mt.target.value)}
                    class="border rounded p-2 w-full"
                    placeholder="* * * * * * *"
                    required
                  />
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-2 font-bold">Duration (Sec)</td>
                <td class="p-2">
                  <input
                    type="number"
                    min="1"
                    max="864000"
                    value=${Se}
                    onInput=${mt=>Ie(mt.target.value)}
                    class="border rounded p-2 w-full"
                    required
                  />
                </td>
              </tr>
              <tr class="bg-gray-200">
                <td class="p-2 font-bold">Start Duty (0-100)</td>
                <td class="p-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value=${Pe}
                    onInput=${mt=>Me(mt.target.value)}
                    class="border rounded p-2 w-full"
                    required
                  />
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-2 font-bold">End Duty (0-100)</td>
                <td class="p-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value=${me}
                    onInput=${mt=>Oe(mt.target.value)}
                    class="border rounded p-2 w-full"
                    required
                  />
                </td>
              </tr>
              <tr class="bg-gray-200">
                <td class="p-2 font-bold">INFO</td>
                <td class="p-2">
                  <input
                    type="text"
                    value=${ae}
                    onInput=${mt=>pe(mt.target.value)}
                    class="border rounded p-2 w-full"
                  />
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-2 font-bold">On/Off</td>
                <td class="p-2">
                  <${Xt} value=${ve} onChange=${$e} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer flex justify-end mt-4">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save PWM Cron
          </button>
        </div>
      </form>
    `,Te=Et`
    <div class=${`modal ${oe||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${mt=>ct&&mt.target===mt.currentTarget&&st()}
        >
          <div
            class="modal-content bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg relative"
            style="margin-top: 0px;"
          >
            <div class="modal-header flex justify-between items-center border-b pb-4 mb-4">
              <h5 class="text-xl font-bold">Edit PWM Timer</h5>
              <button class="close-button text-gray-500 hover:text-gray-700" onclick=${st}>
                Close
              </button>
            </div>
            ${Ee()}
          </div>
        </div>
      </div>
    </div>
  `,ge=at(null);return lt(()=>{const mt=document.createElement("div");return mt.id="pwm-modal-portal",document.body.appendChild(mt),ge.current=mt,()=>{O(null,mt),document.body.removeChild(mt)}},[]),lt(()=>{ge.current&&O(Te,ge.current)}),null}function initGlobalTooltip$4(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,vt=$.offsetHeight,oe=window.innerWidth,Xt=dt.getBoundingClientRect();let Yt=Xt.left+Xt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,oe-_-8));let ee=Xt.top-vt-8;ee<8&&(ee=Xt.bottom+8),$.style.left=Yt+"px",$.style.top=ee+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabCron({}){const[$,k]=ut(null),[st,ct]=ut(null);at(null);const[dt,_]=ut(!1),[vt,oe]=ut(null),[Xt,Yt]=ut(null),[ee,Zt]=ut("ru"),[re,ae]=ut(!1),[pe,ve]=ut(1),[$e,ie]=ut(0),we=at(!1);lt(()=>{initGlobalTooltip$4()},[]);const xe=()=>fetch("/api/cron/get",{cache:"no-store"}).then(pt=>pt.json()).then(pt=>{pt!=null&&Array.isArray(pt.timers)?(k(pt.timers),Zt(pt.lang||"ru"),typeof pt.numline=="number"&&(ie(pt.numline),ve(pt.numline))):(console.error("Unexpected API response structure:",pt),k([]))}).catch(pt=>{console.error("Error fetching cron data:",pt),k([])});at(0);const Ce=at(!1);lt(()=>{let pt=!0;return xe(),registerPoll("cron","/api/cron/get",function(ne){!pt||Ce.current||we.current||ne!=null&&Array.isArray(ne.timers)&&(k(ne.timers),Zt(ne.lang||"ru"),typeof ne.numline=="number"&&(ie(ne.numline),ve(ne.numline)))}),function(){pt=!1,unregisterPoll("cron")}},[]);const Se=at(!0);lt(()=>{if(Se.current){Se.current=!1;return}Ie($e)},[$e]);const Ie=pt=>{we.current=!0,fetch("/api/numline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({numline:pt})}).then(ne=>ne.json()).catch(ne=>console.error("Error sending Crone line to stm32:",ne)).finally(()=>{setTimeout(()=>{we.current=!1},1500)})},Pe=()=>{if(pe<$.length){const pt=pe+1;ve(pt),ie(pt)}},Me=()=>{if(pe>0){const pt=pe-1;ve(pt),ie(pt)}},me={ru:Et`
      <div class="mytext">
        <div>
          <pre>
            Шаблон Cron состоит из семи полей, разделенных пробелами.
            1 2 3 4 5 6 7
            ┬ ┬ ┬ ┬ ┬ ┬ ┬ команда для выполнения
            │ │ │ │ │ │ └── год (1970-3000)
            │ │ │ │ │ └──── день недели (0 - 7)
            │ │ │ │ └────── месяц (1 - 12)
            │ │ │ └──────── день месяца (1 - 31)
            │ │ └────────── час (0 - 23)
            │ └──────────── минута (0 - 59)
            └────────────── секунда (0-59)
          </pre>
        </div>
        <h2 class="text-xl font-bold mb-2 mt-6">Примеры CRON</h2>
        <table class="w-full">
          <thead>
            <tr>
              <th class="border px-4 py-2">CRON</th>
              <th class="border px-4 py-2">Описание</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="border px-4 py-2 whitespace-nowrap">* * * * * * *</td><td class="border px-4 py-2">CRON выполняется каждую секунду.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">0 * * * * * *</td><td class="border px-4 py-2">CRON выполняется в начале каждой минуты.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">* * * * * 2 *</td><td class="border px-4 py-2">CRON выполняется каждый вторник в течение всего дня.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">0 0 13-15 * * 2-4 *</td><td class="border px-4 py-2">CRON выполняется каждую минуту между 13 и 15 часами среды, четверга и пятницы.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">*/5 * * * * * *</td><td class="border px-4 py-2">CRON выполняется каждые 5 секунд, начиная с 0.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">*/5 */5 * * * * *</td><td class="border px-4 py-2">CRON выполняется каждые 5 секунд каждые 5 минут, с 00:00 до 55:55.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">0 0 0 * * 5 *</td><td class="border px-4 py-2">CRON выполняется каждую пятницу в полночь.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">0 0 */2 * * * *</td><td class="border px-4 py-2">CRON выполняется каждые 2 часа в начале часа.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">* * */2 * * * *</td><td class="border px-4 py-2">CRON выполняется каждую секунду каждые 2 часа (0, 2, 4, ..., 22).</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">0 0 0 * * 1-5 *</td><td class="border px-4 py-2">CRON выполняется в полночь каждую неделю с понедельника по пятницу.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">15 23 */6 * * * *</td><td class="border px-4 py-2">CRON выполняется каждые 6 часов в (мин:сек) 23:15.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">0 0 0 1 * * *</td><td class="border px-4 py-2">CRON выполняется в начале каждого месяца в 00:00:00.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">0 0 0 1 */3 * *</td><td class="border px-4 py-2">CRON выполняется в начале каждого квартала в 00:00:00.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">10 15 20 * 8 6 *</td><td class="border px-4 py-2">CRON выполняется в 20:15:20 каждую субботу в августе.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">10 15 20 8 * 6 *</td><td class="border px-4 py-2">CRON выполняется в 20:15:20 каждую субботу, которая также является 8-м днем месяца.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">30-45 * * * * * *</td><td class="border px-4 py-2">CRON выполняется каждую секунду между 30 и 45.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">30-45/3 * * * * * *</td><td class="border px-4 py-2">CRON выполняется каждые 3 секунды в каждой минуты, когда секунды находятся между 30 и 45.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">0 23/1 * * * * *</td><td class="border px-4 py-2">CRON выполняется в начале каждой минуты, когда минуты находятся между 23 и 59.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">50-10 * * * * * *</td><td class="border px-4 py-2">CRON выполняется каждую секунду в диапазоне от 50 до 59 и от 00 до 10 (режим переполнения).</td></tr>
          </tbody>
        </table>
        <h2 class="text-xl font-bold mb-2 mt-6">Примеры ACTION</h2>
        <table class="w-full">
          <thead>
            <tr><th class="border px-4 py-2">ACTION</th><th class="border px-4 py-2">Описание</th></tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2 whitespace-nowrap">18:1;p5;18:0</td>
              <td class="border px-4 py-2">18-й пин включится (ON) в указанное время (CRON), будет гореть 5 сек. и после паузы отключится (OFF).</td>
            </tr>
            <tr>
              <td class="border px-4 py-2 whitespace-nowrap">12:2;p5</td>
              <td class="border px-4 py-2">12-й пин будет менять своё состояние (TOGGLE) через 5 сек.</td>
            </tr>
          </tbody>
        </table>
        <div style="font-family: monospace; font-size: 13px; margin: 4px 0 8px 0; line-height: 1.8">
          <div>0 ── Откл</div>
          <div>1 ── Вкл</div>
          <div>2 ── Смена состояния</div>
          <div>p ── Пауза</div>
          <div>, ── Разделитель</div>
        </div>
        <h2 class="text-xl font-bold mb-2 mt-6">Примеры PWM (Sunrise / Sunset)</h2>
        <table class="w-full">
          <thead>
            <tr><th class="border px-4 py-2">Тип</th><th class="border px-4 py-2">Описание</th></tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2 whitespace-nowrap">Sunrise (Восход)</td>
              <td class="border px-4 py-2">
                Нажмите кнопку <b>PWM</b> для настройки. Укажите <b>Start Duty</b> (Начальная скважность, например 0) и <b>End Duty</b> (Конечная скважность, например 100).
                Плавное увеличение скважности (яркости) будет происходить в течение времени, заданного в <b>Duration (Sec)</b> (от 1 до 864000 секунд).
              </td>
            </tr>
            <tr>
              <td class="border px-4 py-2 whitespace-nowrap">Sunset (Закат)</td>
              <td class="border px-4 py-2">
                Для эффекта заката укажите <b>Start Duty</b> = 100, а <b>End Duty</b> = 0.
                Переход будет плавно уменьшать скважность на протяжении заданного в <b>Duration (Sec)</b> времени.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2 class="text-xl font-bold mb-2 mt-6">Отслеживание изменений</h2>
        <table class="w-full">
          <thead>
            <tr>
              <th class="border px-4 py-2">Топик</th>
              <th class="border px-4 py-2">Описание</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2 whitespace-nowrap">Swarm/timer/</td>
              <td class="border px-4 py-2">
                Данная страница отслеживает изменения таймеров и автоматически отправляет каждое изменение по MQTT на топик: Swarm/timer/.
                Где "Swarm" это Ваш 'TX topic'.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,en:Et`
      <div class="mytext">
        <div>
          <pre>
            The Cron pattern consists of seven space-separated fields.
            1 2 3 4 5 6 7
            ┬ ┬ ┬ ┬ ┬ ┬ ┬ command to execute
            │ │ │ │ │ │ └── year (1970-3000)
            │ │ │ │ │ └──── day of week (0 - 7)
            │ │ │ │ └────── month (1 - 12)
            │ │ │ └──────── day of month (1 - 31)
            │ │ └────────── hour (0 - 23)
            │ └──────────── minute (0 - 59)
            └────────────── second (0-59)
          </pre>
        </div>
        <h2 class="text-xl font-bold mb-2 mt-6">Examples of CRON</h2>
        <table class="w-full">
          <thead>
            <tr><th class="border px-4 py-2">CRON</th><th class="border px-4 py-2">Description</th></tr>
          </thead>
          <tbody>
            <tr><td class="border px-4 py-2 whitespace-nowrap">* * * * * * *</td><td class="border px-4 py-2">CRON is valid all the time, will fire every second.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">0 * * * * * *</td><td class="border px-4 py-2">CRON is valid at the beginning of each minute.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">* * * * * 2 *</td><td class="border px-4 py-2">CRON is valid every Tuesday all day long.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">0 0 13-15 * * 2-4 *</td><td class="border px-4 py-2">CRON is valid every beginning of the minute between hours 13-15, between Tuesday and Thursday.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">*/5 * * * * * *</td><td class="border px-4 py-2">CRON is valid every 5 seconds starting at 0.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">*/5 */5 * * * *</td><td class="border px-4 py-2">CRON is valid every 5 seconds each 5 minutes, from 00:00 to 55:55.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">0 0 0 * * 5 *</td><td class="border px-4 py-2">Every Friday at midnight.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">0 0 */2 * * *</td><td class="border px-4 py-2">Every 2 hours at beginning of the hour.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">* * */2 * * *</td><td class="border px-4 py-2">Every second of every minute every 2 hours (0, 2, 4, .., 22).</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">0 0 0 * * 1-5 *</td><td class="border px-4 py-2">At midnight, 00:00 every week between Monday and Friday.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">15 23 */6 * * *</td><td class="border px-4 py-2">Every 6 hours at (min:sec) 23:15.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">0 0 0 1 * * *</td><td class="border px-4 py-2">At 00:00:00 beginning of the month.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">0 0 0 1 */3 *</td><td class="border px-4 py-2">Every beginning of the quarter at 00:00:00.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">10 15 20 * 8 6 *</td><td class="border px-4 py-2">At 20:15:20 every Saturday in August.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">10 15 20 8 * 6 *</td><td class="border px-4 py-2">At 20:15:20 every Saturday that is also 8th day in month.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">30-45 * * * * *</td><td class="border px-4 py-2">Every second between 30 and 45.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">30-45/3 * * * * *</td><td class="border px-4 py-2">Every 3rd second in every minute, when seconds are between 30 and 45.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">0 23/1 * * * *</td><td class="border px-4 py-2">Every beginning of a minute when minute is between 23 and 59.</td></tr>
            <tr><td class="border px-4 py-2 whitespace-nowrap">50-10 * * * * *</td><td class="border px-4 py-2">Every second when seconds are from 50-59 and 00-10 (overflow mode).</td></tr>
          </tbody>
        </table>

        <h2 class="text-xl font-bold mb-2 mt-6">Examples of ACTION</h2>
        <table class="w-full">
          <thead>
            <tr><th class="border px-4 py-2">ACTION</th><th class="border px-4 py-2">Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2 whitespace-nowrap">18:1;p5;18:0</td>
              <td class="border px-4 py-2">Pin 18 will turn on (ON) at the specified time (CRON), stay on for 5 seconds and turn off (OFF) after the pause.</td>
            </tr>
            <tr>
              <td class="border px-4 py-2 whitespace-nowrap">12:2;p5</td>
              <td class="border px-4 py-2">Pin 12 will change its state (TOGGLE) after 5 seconds (p - PAUSE).</td>
            </tr>
          </tbody>
        </table>
        <div style="font-family: monospace; font-size: 13px; margin: 4px 0 8px 0; line-height: 1.8">
          <div>0 ── OFF</div>
          <div>1 ── ON</div>
          <div>2 ── TOGGLE</div>
          <div>p ── PAUSE</div>
          <div>, ── Separator</div>
        </div>
        <h2 class="text-xl font-bold mb-2 mt-6">Examples of PWM (Sunrise and Sunset)</h2>
        <table class="w-full">
          <thead>
            <tr><th class="border px-4 py-2">Type</th><th class="border px-4 py-2">Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2 whitespace-nowrap">Sunrise</td>
              <td class="border px-4 py-2">
                Click the <b>PWM</b> button to configure. Set <b>Start Duty</b> (e.g., 0) and <b>End Duty</b> (e.g., 100).
                The duty cycle (brightness) will smoothly increase over the time specified in <b>Duration (Sec)</b> (from 1 to 864000 seconds).
              </td>
            </tr>
            <tr>
              <td class="border px-4 py-2 whitespace-nowrap">Sunset</td>
              <td class="border px-4 py-2">
                For a sunset effect, set <b>Start Duty</b> = 100 and <b>End Duty</b> = 0.
                The duty cycle will smoothly decrease over the time specified in <b>Duration (Sec)</b>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2 class="text-xl font-bold mb-2 mt-6">Change Tracking</h2>
        <table class="w-full">
          <thead>
            <tr>
              <th class="border px-4 py-2">Topic</th>
              <th class="border px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">Swarm/timer/</td>
              <td class="border px-4 py-2">
                This page tracks changes of timers and automatically sends each change via MQTT to the topic: Swarm/timer/.
                Where "Swarm" is your 'TX topic'.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `};if($===null)return Et`<div>Loading...</div>`;const Oe=()=>({langtimers:ee==="ru"?rulangtimers:enlangtimers}),de=(pt,ne)=>{const se=Oe(),le=(se[pt]&&se[pt][ne]?se[pt][ne]:"").split(" "),ye=[];for(let _e=0;_e<le.length;_e+=15)ye.push(le.slice(_e,_e+15).join(" "));return ye.join("<br>")},ce=(pt,ne)=>{oe(pt),Yt(ne),_(!0)},fe=()=>{_(!1),oe(null),Yt(null)},Ee=pt=>{console.log("handleCronChange:",pt),k($.map(ne=>ne.id===pt.id?pt:ne)),we.current=!0,fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(pt)}).then(ne=>ne.json()).then(ne=>{console.log("Cron job updated successfully:",ne)}).catch(ne=>{console.error("Error updating cron job:",ne)}).finally(()=>{setTimeout(()=>{we.current=!1},1500)})},Te=()=>Array.isArray(Xt)?Xt.flatMap(pt=>pt.pinact?Object.keys(pt.pinact).map(ne=>({value:ne,label:ne})):[]):Xt&&Xt.pinact?Object.keys(Xt.pinact).map(pt=>({value:pt,label:pt})):[],ge=pt=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${de("langtimers",pt.tooltipIndex)}
    >
      ${pt.title}
    </th>
  `,mt=({d:pt,index:ne})=>{const se=pt.activ&&pt.activ.startsWith("pwm:");let $t=pt.activ;if(se){const le=pt.activ.substring(4).split(",");le.length===4&&($t=`pwmID=${le[0]} | ${le[1]}s | ${le[2]}%→${le[3]}%`)}return Et`
    <tr class="${ne%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-4 text-sm text-slate-800 font-medium">${pt.id}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider">${pt.cron}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider items-center gap-1 flex justify-start">${$t}</td>
      <td class="px-6 py-4 text-sm text-slate-600">${pt.info}</td>
      <td class="px-6 py-4">
        <${MyPolzunok}
          value=${pt.onoff}
          onChange=${le=>Ee({...pt,onoff:le})}
        />
      </td>
     <td class="px-6 py-4 text-center">
        ${se?Et`
          <button
            onclick=${()=>ce("edit_pwm",pt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-3"
          >
            Edit
          </button>
          <button
            onclick=${()=>ce("edit_pwm",pt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap ml-1"
          >
            PWM
          </button>
        `:Et`
       <button
            onclick=${()=>ce("edit",pt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
          >
            Edit
          </button>
          <button
            onclick=${()=>ce("edit_pwm",pt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap ml-3"
            title="Set as PWM Cron"
          >
            PWM
          </button>
        `}
      </td>
    </tr>
  `};return Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Timer(s)
        </div>
        <div class="w-full mb-6 relative">
          ${$&&$.length>0?Et`
                <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
                  <div class="overflow-x-auto w-full">
                    <table class="w-full text-left border-collapse whitespace-nowrap">
                      <thead>
                        <tr class="bg-teal-600/10 border-b border-teal-600/20">
                          <${ge} title="No" tooltipIndex=${1} />
                          <${ge} title="Cron" tooltipIndex=${2} />
                          <${ge} title="Script" tooltipIndex=${3} />
                          <${ge} title="Info" tooltipIndex=${4} />
                          <${ge} title="On/Off" tooltipIndex=${5} />
                          <${ge} title="Action" tooltipIndex=${6} />
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-white/40">
                        ${$.slice(0,pe).map((pt,ne)=>Et`<${mt} d=${pt} index=${ne} key=${pt.id} />`)}
                      </tbody>
                    </table>
                  </div>
                </div>
              `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No cron jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>ae(!re)}
          >
            ${re?"Hide Help":"Show Help"}
          </button>
          <div class="font-semibold text-slate-600 tracking-wide">
            ${$&&$.length-pe>0?`Still available: ${$.length-pe} cron jobs`:"No available: cron jobs!"}
          </div>
          <div class="flex gap-2">
            ${$&&pe<$.length?Et`
                  <button
                    class="bg-emerald-500 hover:bg-emerald-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-emerald-500/30"
                    onclick=${Pe}
                    title="Add Cron"
                  >+</button>
                `:null}
            ${pe>0?Et`
                  <button
                    class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                    onclick=${Me}
                    title="Remove Cron"
                  >-</button>
                `:null}
          </div>
        </div>
      </div>

      ${re&&Et`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">
          ${me[ee]}
        </div>
      `}

      ${dt&&vt==="edit_pwm"?Et`
        <${ModalPwmCron}
          modalType=${vt}
          page="TabCron"
          hideModal=${fe}
          title="Edit PWM Timer(s)"
          selectedCron=${Xt}
          handleCronChange=${Ee}
          modalClass="mt-24"
        />
      `:dt?Et`
        <${ModalCron}
          modalType=${vt}
          page="TabCron"
          hideModal=${fe}
          title=${vt==="edit"?"Edit Timer(s)":"Edit Connection"}
          selectedCron=${Xt}
          handleCronChange=${Ee}
          connectionOptions=${Te()}
          modalClass="mt-24"
        />
      `:null}
    </div>
  `}const PRESETS$1={ru:[{value:"1",label:"Паяльная станция T max=125°C, T min=-55°C"},{value:"2",label:"Кулер / вентилятор T max=70°C, T min=-55°C"},{value:"3",label:"3D‑принтер (стол) T max=120°C, T min=0°C"},{value:"4",label:"Форточный нагреватель T max=60°C, T min=-55°C"},{value:"5",label:"Тёплый пол T max=45°C, T min=0°C"},{value:"6",label:"Холодильник T max=100°C, T min=-55°C"},{value:"7",label:"Аквариум / бойлер T max=80°C, T min=0°C"},{value:"8",label:"Инкубатор T max=45°C, T min=0°C"},{value:"9",label:"Теплица / комната T max=50°C, T min=-55°C"}],en:[{value:"1",label:"Soldering station T max=125°C, T min=-55°C"},{value:"2",label:"Cooler / fan T max=70°C, T min=-55°C"},{value:"3",label:"3D printer (table) T max=120°C, T min=0°C"},{value:"4",label:"Vent heater T max=60°C, T min=-55°C"},{value:"5",label:"Warm floor T max=45°C, T min=0°C"},{value:"6",label:"Refrigerator T max=100°C, T min=-55°C"},{value:"7",label:"Aquarium / boiler T max=80°C, T min=0°C"},{value:"8",label:"Incubator T max=45°C, T min=0°C"},{value:"9",label:"Greenhouse / room T max=50°C, T min=-55°C"}]},SENSOR_OPTIONS$1=[{value:"1",label:"DS18B20"},{value:"2",label:"DHT-22"}];function ModalPid({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedPid:_,handlePidChange:vt,language:oe="en",modalClass:Xt,SliderComponent:Yt=MyPolzunok}){const[ee,Zt]=ut((_==null?void 0:_.info)||""),[re,ae]=ut((_==null?void 0:_.onoff)===1),[pe,ve]=ut((_==null?void 0:_.selsens)||"1"),[$e,ie]=ut((_==null?void 0:_.sernum)||""),[we,xe]=ut((_==null?void 0:_.presets)||"1"),[Ce,Se]=ut((_==null?void 0:_.tmpset)||""),[Ie,Pe]=ut((_==null?void 0:_.tmpcur)||""),[Me,me]=ut([]),[Oe,de]=ut(Object.entries((_==null?void 0:_.pinact)||{})[0]||["",""]);lt(()=>{Zt((_==null?void 0:_.info)||""),ae((_==null?void 0:_.onoff)===1),ve((_==null?void 0:_.selsens)||"1"),ie((_==null?void 0:_.sernum)||""),xe((_==null?void 0:_.presets)||"1"),Se((_==null?void 0:_.tmpset)||""),Pe((_==null?void 0:_.tmpcur)||""),de(Object.entries((_==null?void 0:_.pinact)||{})[0]||["",""])},[_]),lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(pt=>{if(!pt.ok)throw new Error(`HTTP error! status: ${pt.status}`);return pt.json()}).then(pt=>{if(!pt||!pt.data||!Array.isArray(pt.data)){console.error("Invalid data format:",pt),me([]);return}const ne=pt.data.filter(se=>se.topin===5);me(ne)}).catch(pt=>{console.error("Error fetching pin config:",pt),me([])})},[_]);const ce=pt=>{pt.preventDefault();const ne=Oe[0]&&Oe[1]!==void 0&&Oe[1]!=="",se={id:_.id,pins:Oe[0],pinact:ne?{[Oe[0]]:parseInt(Oe[1])}:{},selsens:pe,sernum:$e,presets:we,tmpset:Ce,tmpcur:Ie,info:ee,onoff:re?1:0};console.log("Data being sent to server:",se),fetch("/api/pid/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(se)}).then($t=>$t.json()).then($t=>{console.log("Success:",$t),vt({..._,...se}),st(),window.location.href="/#/pid"}).catch($t=>{console.error("Error:",$t)})},fe=pt=>{if(!pt.target.value)de(["",""]);else{const ne=pt.target.value.split("|");de([ne[0],ne[1]])}},Ee=PRESETS$1[oe]||PRESETS$1.en,Te=()=>k==="TabPid"&&$==="edit"?Et`
        <form onsubmit=${ce}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                ${[{label:"ID",value:_.id},{label:"PWM Pin",value:Et`
                        <select
                          value=${Me.some(pt=>String(pt.pins)===String(Oe[0]))?`${Oe[0]}|${Oe[1]}`:""}
                          onChange=${fe}
                          class="border rounded p-2 w-full"
                        >
                          <option value="">Select PWM pin</option>
                          ${Me.map(pt=>Et`
                              <option value=${`${pt.pins}|${pt.id}`}>
                                ${pt.pins} (ID: ${pt.id})
                              </option>
                            `)}
                        </select>
                      `},{label:"Selected sensor",value:Et`
                      <select
                        value=${pe}
                        onChange=${pt=>ve(pt.target.value)}
                        class="border rounded p-2 w-full"
                      >
                        ${SENSOR_OPTIONS$1.map(pt=>Et`
                            <option
                              value=${pt.value}
                              selected=${pt.value===pe}
                            >
                              ${pt.label}
                            </option>
                          `)}
                      </select>
                    `},{label:"Dev. ser. number",value:pe==="1"?Et`
                          <input
                            type="text"
                            value=${$e}
                            onInput=${pt=>ie(pt.target.value)}
                            class="border rounded p-2 w-full font-mono"
                            placeholder="e.g. xxxxxxxxxxxxxxxx"
                          />
                        `:Et`
                          <input
                            type="text"
                            value="N/A"
                            readOnly
                            class="border rounded p-2 w-full bg-gray-100 cursor-not-allowed text-gray-400 italic"
                          />
                        `},{label:"Presets",value:Et`
                      <select
                        value=${we}
                        onChange=${pt=>xe(pt.target.value)}
                        class="border rounded p-2 w-full"
                      >
                        ${Ee.map(pt=>Et`
                            <option
                              value=${pt.value}
                              selected=${pt.value===we}
                            >
                              ${pt.label}
                            </option>
                          `)}
                      </select>
                    `},{label:"t_set",value:Et`
                      <input
                        type="text"
                        value=${Ce}
                        onInput=${pt=>Se(pt.target.value)}
                        class="border rounded p-2 w-full"
                        placeholder="°C"
                      />
                    `},{label:"t_current",value:Et`
                      <input
                        type="text"
                        value=${Ie}
                        readOnly
                        class="border rounded p-2 w-full bg-gray-100 cursor-not-allowed"
                        placeholder="°C"
                      />
                    `},{label:"INFO",value:Et`
                      <input
                        type="text"
                        value=${ee}
                        onInput=${pt=>Zt(pt.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    `},{label:"On/Off",value:Et`
                      <${Yt}
                        value=${re}
                        onChange=${pt=>ae(pt)}
                      />
                    `}].map((pt,ne)=>Et`
                    <tr class="${ne%2===1?"bg-white":"bg-gray-200"}">
                      <td class="p-2 font-bold">${pt.label}</td>
                      <td class="p-2">${pt.value}</td>
                    </tr>
                  `)}
              </tbody>
            </table>
          </div>
          <div class="modal-footer flex justify-end mt-4">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save changes
            </button>
          </div>
        </form>
      `:null,ge=Et`
    <div class=${`modal ${Xt||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${pt=>ct&&pt.target===pt.currentTarget&&st()}
        >
          <div
            class="modal-content bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg relative"
            style="margin-top: 0px;"
          >
            <div
              class="modal-header flex justify-between items-center border-b pb-4 mb-4"
            >
              <h5 class="text-xl font-bold">Edit PID</h5>
              <button
                class="close-button text-gray-500 hover:text-gray-700"
                onclick=${st}
              >
                Close
              </button>
            </div>
            ${Te()}
          </div>
        </div>
      </div>
    </div>
  `,mt=at(null);return lt(()=>{const pt=document.createElement("div");return pt.id="modal-portal",document.body.appendChild(pt),mt.current=pt,()=>{O(null,pt),document.body.removeChild(pt)}},[]),lt(()=>{mt.current&&O(ge,mt.current)}),null}function initGlobalTooltip$3(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,vt=$.offsetHeight,oe=window.innerWidth,Xt=dt.getBoundingClientRect();let Yt=Xt.left+Xt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,oe-_-8));let ee=Xt.top-vt-8;ee<8&&(ee=Xt.bottom+8),$.style.left=Yt+"px",$.style.top=ee+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const PRESETS={ru:[{value:"1",label:"Паяльная станция T max=125°C, T min=-55°C"},{value:"2",label:"Кулер / вентилятор T max=70°C, T min=-55°C"},{value:"3",label:"3D‑принтер (стол) T max=120°C, T min=0°C"},{value:"4",label:"Форточный нагреватель T max=60°C, T min=-55°C"},{value:"5",label:"Тёплый пол T max=45°C, T min=0°C"},{value:"6",label:"Холодильник T max=100°C, T min=-55°C"},{value:"7",label:"Аквариум / бойлер T max=80°C, T min=0°C"},{value:"8",label:"Инкубатор T max=45°C, T min=0°C"},{value:"9",label:"Теплица / комната T max=50°C, T min=-55°C"}],en:[{value:"1",label:"Soldering station T max=125°C, T min=-55°C"},{value:"2",label:"Cooler / fan T max=70°C, T min=-55°C"},{value:"3",label:"3D printer (table) T max=120°C, T min=0°C"},{value:"4",label:"Vent heater T max=60°C, T min=-55°C"},{value:"5",label:"Warm floor T max=45°C, T min=0°C"},{value:"6",label:"Refrigerator T max=100°C, T min=-55°C"},{value:"7",label:"Aquarium / boiler T max=80°C, T min=0°C"},{value:"8",label:"Incubator T max=45°C, T min=0°C"},{value:"9",label:"Greenhouse / room T max=50°C, T min=-55°C"}]},SENSOR_OPTIONS=[{value:"1",label:"DS18B20"},{value:"2",label:"DHT-22"}],HELP_CONTENT$1={ru:Et`
    <div class="mytext space-y-4">
      <p>
        Сначала выберите параметр «PWM pin». Затем укажите тип температурного датчика в "Selected sensor": DS18B20 или DHT22. Если выбран DS18B20, то на странице "OneWire pin" скопируйте серийный номер выбранного датчика и укажите его в поле "Dev. ser. number". После этого выберите один из доступных пресетов "Presets", который максимально соответствует нужным температурным и временным параметрам. И задайте целевую температуру "T set.", которую должен поддерживать PID-контроллер. Не забудьте включить ползунок "On/Off"!
      </p>
      <p>
        После настройки "PID Controller" для выбранного пина, нажмите на красную кнопку "Run tune". Устройство автоматически подберет правильные коэффициенты, после чего красная кнопка станет зеленой, что символизирует об успешном подборе параметров для данного ШИМ пина.
      </p>
    </div>
  `,en:Et`
    <div class="mytext space-y-4">
      <p>
        First, select the «PWM pin» parameter. Then specify the temperature sensor type in "Selected sensor": DS18B20 or DHT22. If DS18B20 is selected, copy the serial number of the chosen sensor from the "OneWire pin" page and enter it in the "Dev. ser. number" field. After that, choose one of the available "Presets" that closely matches your desired temperature and timing parameters. Set the target temperature "T set." that the PID controller should maintain. Don't forget to toggle the "On/Off" switch!
      </p>
      <p>
        After configuring the "PID Controller" for the selected pin, click the red "Run tune" button. The device will automatically find the correct coefficients, after which the red button will turn green, indicating successful parameter tuning for this PWM pin.
      </p>
    </div>
  `},PID_MAX_SLOTS=24,TUNE_STEP=1,TUNE_BIAS=2,TUNE_DONE=3,TUNE_ERROR=4;function initTuneStyles(){if(document.__tuneStylesInited)return;document.__tuneStylesInited=!0;const $=document.createElement("style");$.textContent=`
    @keyframes tuneBlink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0; }
    }
    .tune-blink {
      animation: tuneBlink 0.4s ease-in-out 3;
    }
    @keyframes tuneProgress {
      from { width: 0%; }
      to   { width: 100%; }
    }
  `,document.head.appendChild($)}function TabPid({}){const[$,k]=ut(null),[st,ct]=ut(null);at(null);const[dt,_]=ut(!1),[vt,oe]=ut(null),[Xt,Yt]=ut(null),[ee,Zt]=ut("ru"),[re,ae]=ut(!1),[pe,ve]=ut(0),[$e,ie]=ut(0),we=at(!1),xe=at(0),Ce=at(!1);lt(()=>{initGlobalTooltip$3(),initTuneStyles()},[]),lt(()=>{let $t=!0;const le=++xe.current,ye=new AbortController,_e=setTimeout(function(){ye.abort()},3e3);return fetch("/api/pid/get",{signal:ye.signal,cache:"no-store"}).then(function(he){if(!he.ok)throw new Error("HTTP "+he.status);return he.json()}).then(function(he){le===xe.current&&$t&&(we.current||he!=null&&Array.isArray(he.pid)&&(k(he.pid),Zt(he.lang||"ru"),typeof he.pidline=="number"&&(ie(he.pidline),ve(he.pidline))))}).catch(function(he){he.name!=="AbortError"&&console.warn("[TabPid] init fetch:",he.message)}).finally(function(){clearTimeout(_e)}),registerPoll("pid","/api/pid",function(he){!$t||Ce.current||we.current||he!=null&&Array.isArray(he.pid)&&(k(he.pid),Zt(he.lang||"ru"),typeof he.pidline=="number"&&(ie(he.pidline),ve(he.pidline)))}),function(){$t=!1,ye.abort(),clearTimeout(_e),unregisterPoll("pid")}},[]);const Se=at(!0);lt(()=>{if(Se.current){Se.current=!1;return}Ie($e)},[$e]);const Ie=$t=>{we.current=!0,fetch("/api/pidline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pidline:$t})}).then(le=>le.json()).catch(le=>console.error("Error sending PID line to stm32:",le)).finally(()=>{setTimeout(()=>{we.current=!1},1500)})},Pe=()=>{if(pe<PID_MAX_SLOTS){const $t=pe+1;ve($t),ie($t)}},Me=()=>{if(pe>0){const $t=pe-1;ve($t),ie($t)}};if($===null)return Et`<div>Loading...</div>`;const me=()=>({langtimers:ee==="ru"?rulangtimers:enlangtimers,langpid:ee==="ru"?rulangpid:enlangpid}),Oe=($t,le)=>{const ye=me(),he=(ye[$t]&&ye[$t][le]?ye[$t][le]:"").split(" "),ue=[];for(let De=0;De<he.length;De+=15)ue.push(he.slice(De,De+15).join(" "));return ue.join("<br>")},de=($t,le)=>{oe($t),Yt(le),_(!0)},ce=()=>{_(!1),oe(null),Yt(null)},fe=$t=>{console.log("handlePidChange:",$t),k($.map(le=>le.id===$t.id?$t:le)),we.current=!0,fetch("/api/pid/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify($t)}).then(le=>le.json()).then(le=>{console.log("PID job updated successfully:",le)}).catch(le=>{console.error("Error updating PID job:",le)}).finally(()=>{setTimeout(()=>{we.current=!1},1500)})},Ee=$t=>{const le=$t.id,ye=$t.tune_state||0;if(!(ye===TUNE_STEP||ye===TUNE_BIAS)){if(ye===TUNE_ERROR){Te(le);return}console.log("Run tune for id:",le),fetch("/api/pid/tune",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:le,action:"start"})}).then(_e=>_e.json()).then(_e=>{console.log("Tune start response:",_e)}).catch(_e=>{console.error("Error starting tune:",_e)})}},Te=$t=>{console.log("Stop tune for id:",$t),fetch("/api/pid/tune",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:$t,action:"stop"})}).then(le=>le.json()).then(le=>{console.log("Tune stop response:",le)}).catch(le=>{console.error("Error stopping tune:",le)})},ge=PRESETS[ee]||PRESETS.en,mt=$t=>{const le=ge.find(ye=>ye.value===String($t));return le?le.label:$t},pt=$t=>{const le=SENSOR_OPTIONS.find(ye=>ye.value===String($t));return le?le.label:$t},ne=$t=>Et`
    <th
      class="px-4 py-4 text-base font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Oe("langpid",$t.tooltipIndex)}
    >
      ${$t.title}
    </th>
  `,se=($t,le)=>{const ye=$t.tune_state||0,_e=$t.tune_progress||0,he=ye===TUNE_STEP||ye===TUNE_BIAS,ue=ye===TUNE_DONE,De=ye===TUNE_ERROR,Ae=ue?"background:linear-gradient(to right,#4ade80,#10b981);box-shadow:0 4px 14px rgba(16,185,129,0.4);":De?"background:linear-gradient(to right,#dc2626,#b91c1c);box-shadow:0 4px 14px rgba(220,38,38,0.5);animation:tuneBlink 1s ease-in-out infinite;":"background:linear-gradient(to right,#ef4444,#e11d48);box-shadow:0 4px 14px rgba(239,68,68,0.4);",Re="px-3 py-1 rounded-full text-sm font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap",te=ue?"Tuning Done":De?"⚠ Error!":"Run tune";if(he){const ke=_e.toFixed(1),Le=`Auto Tune (${ye===TUNE_STEP?"Step test":"Bias search"})… ${_e}%`;return Et`
        <tr key=${$t.id} class="${le%2===1?"bg-white/80":"bg-sky-200/40"}">
          <td colspan="11" class="px-2 py-2">
            <div style="position:relative;width:100%;height:2.5rem;border-radius:0.75rem;overflow:hidden;background:#d1d5db;box-shadow:inset 0 2px 6px rgba(0,0,0,0.12);">
              <div
                style="position:absolute;left:0;top:0;bottom:0;width:${ke}%;background:linear-gradient(90deg,#22c55e 0%,#16a34a 60%,#4ade80 100%);border-radius:inherit;transition:width 0.3s ease;box-shadow:0 0 14px rgba(34,197,94,0.55);"
              ></div>
              <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;user-select:none;">
                <span style="font-size:0.875rem;font-weight:700;color:#111827;white-space:nowrap;">${Le}</span>
              </div>
            </div>
          </td>
          <td class="px-4 py-2 text-center">
            <button
              onclick=${()=>Te($t.id)}
              class="px-3 py-1 rounded-full text-sm font-bold text-white whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95"
              style="background:linear-gradient(to right,#f97316,#ef4444);box-shadow:0 4px 14px rgba(239,68,68,0.4);"
            >Stop</button>
          </td>
        </tr>
      `}return Et`
      <tr key=${$t.id} class="${le%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-4 py-3 text-sm text-slate-800 font-medium">${$t.id}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">
          ${(()=>{const ke=Object.entries($t.pinact||{});if(!ke.length)return"—";const[be,Le]=ke[0];return`${be}(${Le})`})()}
        </td>
        <td class="px-4 py-3 text-sm text-slate-700">${pt($t.selsens)}</td>
        <td class="px-4 py-3 text-sm font-mono ${$t.selsens==="1"?"text-slate-700":"text-slate-400 italic"}">${$t.selsens==="1"?$t.sernum||"—":"N/A"}</td>
        <td class="px-4 py-3 text-sm text-slate-700">${mt($t.presets)}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">${$t.tmpset}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">${$t.tmpcur}</td>
        <td class="px-4 py-3 text-sm text-slate-800 font-mono ${$t.onoff?"":"text-rose-500 font-bold"}">${$t.onoff?$t.duty!==void 0?$t.duty:"—":"OFF"}</td>
        <td class="px-4 py-3 text-sm text-slate-600">${$t.info}</td>
        <td class="px-4 py-3">
          <${MyPolzunok}
            value=${$t.onoff}
            onChange=${ke=>fe({...$t,onoff:ke})}
          />
        </td>
        <td class="px-4 py-3 text-center">
          <button
            onclick=${()=>de("edit",$t)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
          >Edit</button>
        </td>
        <td class="px-4 py-3 text-center">
          <button
            onclick=${()=>Ee($t)}
            class="${Re}"
            style="${Ae}"
          >${te}</button>
        </td>
      </tr>
    `};return Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          PID Controller(s)
        </div>
        <div class="w-full mb-6 relative">
          ${pe>0?Et`
              <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
                <div class="overflow-x-auto w-full">
                  <table class="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                      <tr class="bg-teal-600/10 border-b border-teal-600/20">
                        <${ne} title="No" tooltipIndex=${1} />
                        <${ne} title="PWM Pin" tooltipIndex=${2} />
                        <${ne} title="Sel. sensor" tooltipIndex=${3} />
                        <${ne} title="Dev. ser. number" tooltipIndex=${4} />
                        <${ne} title="Presets" tooltipIndex=${5} />
                        <${ne} title="T set." tooltipIndex=${6} />
                        <${ne} title="T cur." tooltipIndex=${7} />
                        <${ne} title="Duty" tooltipIndex=${8} />
                        <${ne} title="Info" tooltipIndex=${9} />
                        <${ne} title="On/Off" tooltipIndex=${10} />
                        <${ne} title="Action" tooltipIndex=${11} />
                        <${ne} title="Auto tune" tooltipIndex=${12} />
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-white/40">
                      ${Array.from({length:pe},($t,le)=>{const ye=$&&$[le]?$[le]:{id:le+1,pins:"",pinact:{},selsens:"",sernum:"",presets:"",tmpset:"",tmpcur:"",info:"",onoff:0,tune_state:0,tune_progress:0};return se(ye,le)})}
                    </tbody>
                  </table>
                </div>
              </div>
            `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No PID jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>ae(!re)}
          >
            ${re?"Hide Help":"Show Help"}
          </button>
          <div class="font-semibold text-slate-600 tracking-wide">
            ${$&&PID_MAX_SLOTS-pe>0?`Still available: ${PID_MAX_SLOTS-pe} PID jobs`:"No available: PID jobs!"}
          </div>
          <div class="flex gap-2">
            ${pe<PID_MAX_SLOTS?Et`
            <button
                class="bg-emerald-500 hover:bg-emerald-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-emerald-500/30"
                onclick=${Pe}
                title="Add PID"
            >+</button>
            `:null}
            ${pe>0?Et`
                <button
                  class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                  onclick=${Me}
                  title="Remove PID"
                >-</button>
              `:null}
          </div>
        </div>
      </div>

      ${re&&Et`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">
          ${HELP_CONTENT$1[ee]||HELP_CONTENT$1.en}
        </div>
      `}

      ${dt?Et`
        <${ModalPid}
          modalType=${vt}
          page="TabPid"
          hideModal=${ce}
          title="Edit PID"
          selectedPid=${Xt}
          handlePidChange=${fe}
          language=${ee}
          modalClass="mt-24"
        />
      `:null}
    </div>
  `}function ModalEditSensor({typsensor:$,oneWireId:k,pins:st,onClose:ct,onUpdate:dt,sensorType:_,sensorData:vt,closeOnOverlayClick:oe=!0}){const[Xt,Yt]=ut({ut:(vt==null?void 0:vt.ut)||$.ut,lt:(vt==null?void 0:vt.lt)||$.lt,action_ut:(vt==null?void 0:vt.action_ut)||$.action_ut,action_lt:(vt==null?void 0:vt.action_lt)||$.action_lt,upphumid:(vt==null?void 0:vt.upphumid)||$.upphumid||0,humlolim:(vt==null?void 0:vt.humlolim)||$.humlolim||0,actuphum:(vt==null?void 0:vt.actuphum)||$.actuphum||"",actlowhum:(vt==null?void 0:vt.actlowhum)||$.actlowhum||"",info:(vt==null?void 0:vt.info)||$.info,onoff:(vt==null?void 0:vt.onoff)||$.onoff||0,humidity:(vt==null?void 0:vt.humidity)||$.humidity||0}),[ee,Zt]=ut(!1),re=(xe,Ce,Se)=>{if(xe===""||xe==="-")return xe;const Ie=xe.replace(",",".");if(!/^-?\d*\.?\d*$/.test(Ie))return null;const Pe=parseFloat(Ie);return isNaN(Pe)||Pe<Ce||Pe>Se?null:Ie},ae=xe=>{const{name:Ce,value:Se}=xe.target;if(["ut","lt"].includes(Ce)){const Ie=re(Se,-55,125);Ie!==null&&Yt(Pe=>({...Pe,[Ce]:Ie}))}else if(["upphumid","humlolim"].includes(Ce)){const Ie=re(Se,0,100);Ie!==null&&Yt(Pe=>({...Pe,[Ce]:Ie}))}else Yt(Ie=>({...Ie,[Ce]:Se}))},pe=xe=>{const Ce=["ut","lt","upphumid","humlolim"],Se={...xe};return Ce.forEach(Ie=>{Se[Ie]===""||Se[Ie]==="-"?Se[Ie]=0:Se[Ie]=parseFloat(Se[Ie].toString().replace(",","."))}),Se},ie=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onclick=${xe=>{oe&&xe.target===xe.currentTarget&&ct()}}
    >
      <div
        class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
        style="max-height: 90vh; overflow-y: auto;"
      >
        <div class="modal-header flex justify-between items-center border-b pb-4 mb-4">
          <h5 class="text-xl font-bold">Edit Sensor</h5>
          <button
            class="close-button text-gray-500 hover:text-gray-700"
            onclick=${ct}
          >
            Close
          </button>
        </div>
        <form onsubmit=${async xe=>{xe.preventDefault(),Zt(!0);const Ce=pe(Xt);try{if(!(await fetch("/api/sensor/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:k,pins:st,sensorNumber:$.s_number,...Ce,s_number:$.s_number,t:$.t})})).ok)throw new Error("Network response was not ok");dt({...$,...Ce,oneWireId:k,pins:st,s_number:$.s_number,t:$.t}),ct()}catch(Se){console.error("Error updating Sensor:",Se)}finally{Zt(!1)}}}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                <tr class="bg-blue-100">
                  <td class="p-2 font-bold">Upper Temperature</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="ut"
                      value=${Xt.ut}
                      oninput=${ae}
                      class="border rounded p-2 w-full"
                      placeholder="-55 to 125"
                    />
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="p-2 font-bold">Lower Temperature</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="lt"
                      value=${Xt.lt}
                      oninput=${ae}
                      class="border rounded p-2 w-full"
                      placeholder="-55 to 125"
                    />
                  </td>
                </tr>
                <tr class="bg-blue-100">
                  <td class="p-2 font-bold">Action for Upper Temperature</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="action_ut"
                      value=${Xt.action_ut}
                      oninput=${ae}
                      class="border rounded p-2 w-full"
                      maxlength="100"
                    />
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="p-2 font-bold">Action for Lower Temperature</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="action_lt"
                      value=${Xt.action_lt}
                      oninput=${ae}
                      class="border rounded p-2 w-full"
                      maxlength="100"
                    />
                  </td>
                </tr>
                ${_===2?Et`
                      <tr class="bg-blue-100">
                        <td class="p-2 font-bold">Humidity upper limit</td>
                        <td class="p-2">
                          <input
                            type="text"
                            name="upphumid"
                            value=${Xt.upphumid}
                            oninput=${ae}
                            class="border rounded p-2 w-full"
                            placeholder="0 to 100"
                          />
                        </td>
                      </tr>
                      <tr class="bg-white">
                        <td class="p-2 font-bold">Humidity lower limit</td>
                        <td class="p-2">
                          <input
                            type="text"
                            name="humlolim"
                            value=${Xt.humlolim}
                            oninput=${ae}
                            class="border rounded p-2 w-full"
                            placeholder="0 to 100"
                          />
                        </td>
                      </tr>
                      <tr class="bg-blue-100">
                        <td class="p-2 font-bold">Action for upper H</td>
                        <td class="p-2">
                          <input
                            type="text"
                            name="actuphum"
                            value=${Xt.actuphum}
                            oninput=${ae}
                            class="border rounded p-2 w-full"
                            maxlength="100"
                          />
                        </td>
                      </tr>
                      <tr class="bg-white">
                        <td class="p-2 font-bold">Action for lower H</td>
                        <td class="p-2">
                          <input
                            type="text"
                            name="actlowhum"
                            value=${Xt.actlowhum}
                            oninput=${ae}
                            class="border rounded p-2 w-full"
                            maxlength="100"
                          />
                        </td>
                      </tr>
                    `:""}
                <tr class="bg-blue-100">
                  <td class="p-2 font-bold">Info</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="info"
                      value=${Xt.info}
                      oninput=${ae}
                      class="border rounded p-2 w-full"
                      maxlength="30"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer flex justify-end mt-4">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  `,we=at(null);return lt(()=>{const xe=document.createElement("div");return xe.id="modal-portal-sensor",document.body.appendChild(xe),we.current=xe,()=>{O(null,xe),document.body.removeChild(xe)}},[]),lt(()=>{we.current&&O(ie,we.current)}),null}function ModalOneWire({oneWire:$,onClose:k,onUpdate:st,refresh:ct,closeOnOverlayClick:dt=!0}){console.log("oneWire object:",$);const[_,vt]=ut({typsensor:$.typsensor,numdevices:$.numdevices}),[oe,Xt]=ut(!1),[Yt,ee]=ut($.onoff||0),Zt=ie=>{dt&&ie.target===ie.currentTarget&&k()},re=ie=>{const{name:we,value:xe}=ie.target;let Ce={..._,[we]:parseInt(xe,10)};we==="typsensor"&&(xe==="0"?Ce.numdevices=0:xe==="2"&&(Ce.numdevices=1)),vt(Ce)},ae=ie=>{ee(ie)},ve=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onclick=${Zt}
    >
      <div
        class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
        style="max-height: 90vh; overflow-y: auto;"
      >
        <div class="modal-header flex justify-between items-center border-b pb-4 mb-4">
          <h5 class="text-xl font-bold">Edit OneWire pin</h5>
          <button
            class="close-button text-gray-500 hover:text-gray-700"
            onclick=${k}
            disabled=${oe}
          >
            Close
          </button>
        </div>
        <form onsubmit=${async ie=>{ie.preventDefault(),Xt(!0);const we={id:$.id,pin:$.pin,typsensor:_.typsensor,numdevices:_.numdevices,onoff:Yt};console.log("Sending data:",we);try{if(!(await fetch("api/onewire/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(we)})).ok)throw new Error("Network response was not ok");const Ce={...$,..._,onoff:Yt};st(Ce),k()}catch(xe){console.error("Error updating OneWire:",xe)}finally{Xt(!1)}}}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                <tr class="bg-white">
                  <td class="p-2 font-bold">ID</td>
                  <td class="p-2">
                    <input
                      type="number"
                      value=${$.id}
                      class="border rounded p-2 w-full bg-gray-100"
                      readonly
                      disabled
                    />
                  </td>
                </tr>
                <tr class="bg-gray-200">
                  <td class="p-2 font-bold">Pin</td>
                  <td class="p-2">
                    <input
                      type="text"
                      value=${$.pin}
                      class="border rounded p-2 w-full bg-gray-100"
                      readonly
                      disabled
                    />
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="p-2 font-bold">Selected sensor</td>
                  <td class="p-2">
                    <select
                      name="typsensor"
                      value=${_.typsensor}
                      onchange=${re}
                      class="border rounded p-2 w-full"
                      disabled=${oe}
                    >
                      <option value="0">None</option>
                      <option value="1">DS18B20</option>
                      <option value="2">DHT22</option>
                    </select>
                  </td>
                </tr>
                <tr class="bg-gray-200">
                  <td class="p-2 font-bold">Count of sensors</td>
                  <td class="p-2">
                    <input
                      type="number"
                      name="numdevices"
                      value=${_.numdevices}
                      oninput=${_.typsensor===1?re:void 0}
                      class="border rounded p-2 w-full ${_.typsensor!==1?"bg-gray-100":""}"
                      min="0"
                      max="10"
                      readonly=${_.typsensor!==1}
                      disabled=${oe}
                    />
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="p-2 font-bold">On/Off</td>
                  <td class="p-2">
                    <${MyPolzunok}
                      value=${Yt}
                      onChange=${ae}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer flex justify-end mt-4">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled=${oe}
            >
              ${oe?"Saving...":"Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,$e=at(null);return lt(()=>{const ie=document.createElement("div");return ie.id="modal-portal-onewire",document.body.appendChild(ie),$e.current=ie,()=>{O(null,ie),document.body.removeChild(ie)}},[]),lt(()=>{$e.current&&O(ve,$e.current)}),null}function initGlobalTooltip$2(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,vt=$.offsetHeight,oe=window.innerWidth,Xt=dt.getBoundingClientRect();let Yt=Xt.left+Xt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,oe-_-8));let ee=Xt.top-vt-8;ee<8&&(ee=Xt.bottom+8),$.style.left=Yt+"px",$.style.top=ee+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const _stateLabel=$=>$==="1"?"ON":$==="0"?"OFF":$==="2"?"TG":$??"?",_stateColor=$=>$==="1"?"#16a34a":$==="0"?"#dc2626":$==="2"?"#d97706":"#64748b",_parseAction=$=>$?$.split(",").map(k=>{const[st,ct]=k.trim().split(":");return{pin:st==null?void 0:st.trim(),state:ct==null?void 0:ct.trim()}}).filter(k=>k.pin!==void 0&&k.pin!==""):[],ActionBadge=({isUpper:$,isHumid:k,value:st,unit:ct,str:dt})=>{const _=_parseAction(dt),vt=(k?"💧 ":"")+($?"↑":"↓");return Et`
    <span style="display:inline-flex;align-items:center;gap:4px;background:${$?"#fff7ed":"#eff6ff"};border:1.5px solid ${$?"#fdba74":"#93c5fd"};border-radius:10px;padding:3px 10px;font-size:12px;font-weight:600;white-space:nowrap;line-height:1.6;">
      <span style="color:${$?"#9a3412":"#1e3a5f"};margin-right:2px;">${vt} ${st??"—"}${ct}:</span>
      ${_.length===0?Et`<span style="color:#94a3b8;">[—]</span>`:Et`
          <span style="color:#475569;">[</span>
          ${_.map(({pin:ee,state:Zt},re)=>Et`
            <span>
              <span style="color:#94a3b8;font-weight:400;">id</span><span style="color:#334155;font-weight:700;">${ee}</span><span style="color:#475569;">:</span><span style="color:${_stateColor(Zt)};font-weight:700;">${_stateLabel(Zt)}</span>${re<_.length-1?Et`<span style="color:#94a3b8;">,${" "}</span>`:""}
            </span>
          `)}
          <span style="color:#475569;">]</span>
        `}
    </span>
  `},HELP_CONTENT={ru:Et`
    <div style="line-height:1.8; font-size:14px; color:#334155;">
      <p style="margin-bottom:12px; font-weight:700; font-size:15px;">OneWire — справка</p>
      <p style="margin-bottom:10px;">На этой странице для каждого сенсора задайте действия, которые необходимо выполнить при достижении пределов температуры/влажности.</p>
      <p style="margin-bottom:10px;">Кнопка «copy SN» копирует уникальный серийный номер (SN) датчика DS18B20 в буфер обмена для привязки к PID-контроллеру на странице «PID controller».</p>
      <div style="margin-bottom:10px; line-height: 1.5;">
        Значение:
        <span style="display:block;"><b style="color:#16a34a;">ON</b> — включить пин при достижении порога</span>
        <span style="display:block;"><b style="color:#dc2626;">OFF</b> — выключить</span>
        <span style="display:block;"><b style="color:#d97706;">TG</b> — переключить состояние пина (toggle)</span>
      </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Отслеживание изменений</h2>
            <div class="bg-teal-50 p-4 rounded-lg border border-teal-100 text-sm">
              <p class="mb-3">Контроллер автоматически публикует состояние сенсоров и PWM-выходов в MQTT-топик <strong>Swarm/sensors/</strong>, где <strong>"Swarm"</strong> — ваш TX topic.</p>
              <p class="mb-2 font-semibold text-teal-800">Формат пакета:</p>
              <div class="font-mono bg-white/70 border border-teal-200 px-3 py-2 mb-3 text-xs rounded">
                {"sn":value,"hid":[Tvalue, Hvalue],"pid":Duty}
              </div>
              <li><b>Пример: {"28B63A75D0013C7B":26.44,"h46":[20.6,46.0],"p24":18}</b></li>
              <ul class="list-disc pl-5 space-y-1 text-slate-700">
                <li><b>sn</b> — серийный номер DS18B20 : (Tvalue - температура, °C)</li>
                <li><b>hid</b> — датчик DHT22 : (массив [Tvalue - значение температуры, Hvalue - значение влажности])</li>
                <li><b>pid</b> — PWM-выход : (значение Duty 0–100%)</li>
              </ul>
            </div>
          </div>
    </div>
  `,en:Et`
    <div style="line-height:1.8; font-size:14px; color:#334155;">
      <p style="margin-bottom:12px; font-weight:700; font-size:15px;">OneWire — Help</p>
      <p style="margin-bottom:10px;">On this page, for each sensor, set the actions to perform when temperature/humidity limits are reached.</p>
      <p style="margin-bottom:10px;">The "copy SN" button copies the unique serial number (SN) of the DS18B20 sensor to the clipboard for linking with the PID controller on the "PID controller" page.</p>
      <div style="margin-bottom:10px; line-height: 1.5;">
        Action values:
        <span style="display:block;"><b style="color:#16a34a;">ON</b> — turn the pin on when the threshold is reached</span>
        <span style="display:block;"><b style="color:#dc2626;">OFF</b> — turn it off</span>
        <span style="display:block;"><b style="color:#d97706;">TG</b> — toggle the pin state</span>
      </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Change Tracking</h2>
            <div class="bg-teal-50 p-4 rounded-lg border border-teal-100 text-sm">
              <p class="mb-3">The controller automatically publishes sensor states and PWM output values to the MQTT topic <strong>Swarm/sensors/</strong>, where <strong>"Swarm"</strong> is your TX topic.</p>
              <p class="mb-2 font-semibold text-teal-800">Packet format:</p>
              <div class="font-mono bg-white/70 border border-teal-200 px-3 py-2 mb-3 text-xs rounded">
                {"sn":value,"hid":[Tvalue, Hvalue],"pid":Duty}
              </div>
              <li><b>Example: {"28B63A75D0013C7B":26.44,"h46":[20.6,46.0],"p24":18}</b></li>
              <ul class="list-disc pl-5 space-y-1 text-slate-700">
                <li><b>sn</b> — DS18B20 serial number : (Tvalue — temperature, °C)</li>
                <li><b>hid</b> — DHT22 sensor : (array [Tvalue — temperature, Hvalue — humidity])</li>
                <li><b>pid</b> — PWM output : (Duty value 0–100%)</li>
              </ul>
            </div>
          </div>
    </div>
  `},TabOneWire=()=>{const[$,k]=ut([]),[st,ct]=ut(null),[dt,_]=ut(!1),[vt,oe]=ut(null),[Xt,Yt]=ut(null),[ee,Zt]=ut("ru"),[re,ae]=ut(!1),[pe,ve]=ut({}),$e={ru:{colId:"ID",colPin:"Пин",colSensor:"Выбранный сенсор",colCount:"Кол-во сенсоров",colOnOff:"Вкл/Выкл",colActions:"Действия",noSensors:"Нет сенсоров для этого OneWire пина.",noData:"Нет данных сенсора для этого OneWire пина.",noPins:"Нет настроенных OneWire пинов!",errFetch:mt=>`Ошибка получения данных: ${mt}`,edit:"Ред.",showHelp:"Показать справку",hideHelp:"Скрыть справку",title:"OneWire(s) pin(s)"},en:{colId:"ID",colPin:"Pin",colSensor:"Selected sensor",colCount:"Count of sensors",colOnOff:"On/Off",colActions:"Actions",noSensors:"No connected sensors for this OneWire pin.",noData:"No sensor data available for this OneWire pin.",noPins:"No available pins configured as OneWire!",errFetch:mt=>`Error fetching sensor data: ${mt}`,edit:"Edit",showHelp:"Show Help",hideHelp:"Hide Help",title:"OneWire(s) pin(s)"}},ie=$e[ee]||$e.en,we=mt=>ve(pt=>({...pt,[mt]:!pt[mt]})),xe=mt=>typeof mt=="string"?mt.replace(/[^\x20-\x7E\u0400-\u04FF]/g,""):mt;lt(()=>{initGlobalTooltip$2()},[]);const Ce=()=>{fetch("/api/onewire/get").then(mt=>mt.json()).then(mt=>{Zt(mt.lang||"ru"),k(mt.pins||[]),ct(null)}).catch(mt=>{ct(mt.message),k([])})},Se=mt=>{mt&&k(pt=>pt.map(ne=>{const se=ne.typsensor||ne.typsensr;if(!ne.sensors||![1,2].includes(se))return ne;const $t=ne.sensors.map(le=>{var ye,_e;if(se===1){const he=(ye=mt.ds18b20)==null?void 0:ye.find(ue=>ue.addr===le.s_number);return he?{...le,t:he.temp}:le}else if(se===2){const he=(_e=mt.dht22)==null?void 0:_e.find(ue=>ue.id===ne.id);return he?{...le,t:he.temp,humidity:he.humidity}:le}return le});return{...ne,sensors:$t}}))},Ie=at(0),Pe=at(!1);lt(()=>{let mt=!0;const pt=++Ie.current;Ce();const ne=new AbortController,se=setTimeout(function(){ne.abort()},3e3);return fetch("/api/temp/get",{signal:ne.signal,cache:"no-store"}).then(function($t){if(!$t.ok)throw new Error("HTTP "+$t.status);return $t.json()}).then(function($t){pt===Ie.current&&mt&&$t!=null&&Se($t)}).catch(function($t){$t.name!=="AbortError"&&console.warn("[TabOneWire] init fetch:",$t.message)}).finally(function(){clearTimeout(se)}),registerPoll("sensors","/api/state/sensors",function($t){!mt||Pe.current||$t!=null&&Se($t)}),function(){mt=!1,ne.abort(),clearTimeout(se),unregisterPoll("sensors")}},[]);const Me=()=>{_(!1),oe(null),Yt(null)},me=mt=>{k(pt=>pt.map(ne=>{var se;return ne.id===mt.oneWireId?{...ne,sensors:(se=ne.sensors)==null?void 0:se.map($t=>$t.s_number===mt.s_number?{...$t,...mt}:$t)}:ne})),Me()},Oe=mt=>{Yt(mt),_(!0)},de=mt=>{const pt=ee==="ru"?rulange1Wire:enlange1Wire,se=(pt&&pt[mt]?pt[mt]:"").split(" "),$t=[];for(let le=0;le<se.length;le+=15)$t.push(se.slice(le,le+15).join(" "));return $t.join("<br>")},ce=({title:mt,tooltipIndex:pt})=>Et`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help" data-tip=${de(pt)}>
      ${mt}
    </th>
  `,fe=({device:mt,index:pt})=>{const ne=!!pe[mt.id],se=mt.typsensor||mt.typsensr||0,$t=mt.numdevices||mt.numsens||0,le=se!==0&&$t>0;return Et`
      <tbody key=${"db-"+mt.id}>
        <tr class="${pt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors ${le?"cursor-pointer":""}" onclick=${()=>le&&we(mt.id)}>
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${mt.id}</td>
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${mt.pins||mt.pin}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${["None","DS18B20","DHT22"][se]}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${$t}</td>
          <td class="px-6 py-4" onclick=${ye=>ye.stopPropagation()}>
            <${MyPolzunok} value=${mt.onoff||0} onChange=${ye=>ge({...mt,onoff:ye})} />
          </td>
          <td class="px-6 py-4" onclick=${ye=>ye.stopPropagation()}>
            <button class="text-blue-600 hover:text-blue-800 font-semibold transition-colors" onclick=${()=>Oe(mt)}>${ie.edit}</button>
            ${le&&Et`<span class="ml-3 text-slate-400 text-xs">${ne?"▲":"▼"}</span>`}
          </td>
        </tr>
        ${ne&&le?Et`
          <tr>
            <td colspan="6" class="px-4 py-3 bg-gradient-to-r from-cyan-50/80 via-slate-50/60 to-blue-50/80 border-t">
              <${Ee} d=${mt} />
            </td>
          </tr>
        `:""}
      </tbody>
    `},Ee=({d:mt})=>{const pt=mt.typsensor||mt.typsensr||0,ne=mt.numdevices||mt.numsens||0;if(pt===0||ne===0)return Et`<div class="px-4 py-2 text-slate-500 font-medium">${ie.noSensors}</div>`;let se=mt.sensors||[];const $t=["bg-cyan-50/60 border-cyan-200/50","bg-slate-100/70 border-slate-200/50"];return se.length>0&&Object.keys(se).length>0?Et`<div class="flex flex-col gap-2 w-full">${se.map((le,ye)=>Et`
          <div class="w-full flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 rounded-xl border ${$t[ye%2]} backdrop-blur-sm shadow-sm">
            ${pt===2?Et`<span class="font-mono text-base font-semibold text-teal-700">DHT22</span>`:Et`
              <span class="flex items-center gap-2">
                <span class="font-mono text-base font-semibold text-slate-500">SN</span>
                <span class="font-mono text-base text-slate-700 select-all">${xe(le.s_number)}</span>
                <button class="px-4 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${_e=>{_e.stopPropagation(),navigator.clipboard.writeText(xe(le.s_number)),_e.target.textContent="Copied!",setTimeout(()=>_e.target.textContent="copy SN",1500)}}>copy SN</button>
              </span>
            `}
            <span class="text-slate-300">|</span>
            <span class="font-bold text-cyan-700">${le.t??"—"}°C 🌡</span>
            ${pt===2&&"humidity"in le?Et`<span class="font-bold text-teal-600">${le.humidity}% 💧</span>`:""}
            <span class="text-slate-300">|</span>
            <${ActionBadge} isUpper=${!0} value=${le.ut} unit="°C" str=${le.action_ut} />
            <${ActionBadge} isUpper=${!1} value=${le.lt} unit="°C" str=${le.action_lt} />
            <a href="#" class="ml-auto text-blue-600 font-semibold text-sm uppercase px-3 py-1 bg-white/70 rounded-lg" onclick=${_e=>{_e.preventDefault(),oe({...le,oneWireId:mt.id,sensorType:pt,pins:mt.pins||mt.pin}),_(!0)}}>${ie.edit}</a>
          </div>
        `)}</div>`:Et`<div class="px-4 py-4 text-slate-500 font-medium bg-white/50 rounded-xl text-center w-full">${ie.noData}</div>`},Te=mt=>{k(pt=>pt.map(ne=>ne.id===mt.id?mt:ne)),Me()},ge=mt=>{k(pt=>pt.map(ne=>ne.id===mt.id?{...ne,onoff:mt.onoff}:ne))};return Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col items-center">
      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 uppercase">${ie.title}</div>
        <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
          <table class="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr class="bg-teal-600/10 border-b border-teal-600/20">
                <${ce} title=${ie.colId} tooltipIndex=${1} />
                <${ce} title=${ie.colPin} tooltipIndex=${2} />
                <${ce} title=${ie.colSensor} tooltipIndex=${3} />
                <${ce} title=${ie.colCount} tooltipIndex=${4} />
                <${ce} title=${ie.colOnOff} tooltipIndex=${5} />
                <${ce} title=${ie.colActions} tooltipIndex=${6} />
              </tr>
            </thead>
            ${$.length>0?$.map((mt,pt)=>Et`<${fe} device=${mt} index=${pt} key=${mt.id} />`):Et`<tbody><tr><td colspan="6" class="px-4 py-2">${st?ie.errFetch(st):ie.noPins}</td></tr></tbody>`}
          </table>
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-2xl">
          <button class="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${()=>ae(!re)}>
            ${re?ie.hideHelp:ie.showHelp}
          </button>
        </div>
        ${re&&Et`<div class="mt-2 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner w-full">${HELP_CONTENT[ee]||HELP_CONTENT.en}</div>`}
      </div>
    </div>
    ${dt&&(vt?Et`<${ModalEditSensor} typsensor=${vt} oneWireId=${vt.oneWireId} pins=${vt.pins} onClose=${Me} onUpdate=${me} sensorType=${vt.sensorType} closeOnOverlayClick=${!0} refresh=${Ce} />`:Et`<${ModalOneWire} oneWire=${Xt} onClose=${Me} onUpdate=${Te} closeOnOverlayClick=${!0} refresh=${Ce} />`)}
  `};function ModalSIM800L({hideModal:$,title:k,selectedGps:st,onSave:ct}){const[dt,_]=ut((st==null?void 0:st.tel)||""),[vt,oe]=ut((st==null?void 0:st.info)||""),[Xt,Yt]=ut((st==null?void 0:st.onoff)===1),[ee,Zt]=ut(!0),re=ie=>/^\+\d{11,20}$/.test(ie),ve=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50"
      style="margin-top: 7px;"
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <div
          class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative"
          style="max-height: calc(100vh - 57px); overflow-y: auto;"
        >
          <div class="modal-header flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">${k}</h2>
            <button
              onClick=${$}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>

          <form onSubmit=${ie=>{if(ie.preventDefault(),!ee)return;const we={type:"sim800l",tel:dt,info:vt,onoff:Xt?1:0};console.log("Сохраняемые данные:",we),fetch("/api/security/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(we)}).then(xe=>xe.json()).then(xe=>{typeof ct=="function"&&ct(we),$()}).catch(xe=>{console.error("Error:",xe)})}}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">RXD</td>
                    <td class="p-2">PA3(1)</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">TXD</td>
                    <td class="p-2">PD5(35)</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Mobile phone</td>
                    <td class="p-2">
                      <input
                        type="text"
                        value=${dt}
                        onInput=${ie=>{const we=ie.target.value;_(we),Zt(re(we))}}
                        class=${`border rounded p-2 w-full ${!ee&&dt!==""?"border-red-500":""}`}
                        placeholder="+XXXXXXXXXXX"
                      />
                      ${!ee&&dt!==""?Et`
                            <div class="text-red-500 text-sm mt-1">
                              Please enter valid phone number starting with +
                              and containing 11-20 digits
                            </div>
                          `:""}
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">INFO</td>
                    <td class="p-2">
                      <input
                        type="text"
                        value=${vt}
                        onInput=${ie=>oe(ie.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${MyPolzunok} value=${Xt} onChange=${Yt} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                disabled=${!ee||dt===""}
                class=${`font-bold py-2 px-4 rounded ${ee&&dt!==""?"bg-blue-500 hover:bg-blue-700 text-white":"bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,$e=at(null);return lt(()=>{const ie=document.createElement("div");return ie.id="modal-portal",document.body.appendChild(ie),$e.current=ie,()=>{O(null,ie),document.body.removeChild(ie)}},[]),lt(()=>{$e.current&&O(ve,$e.current)}),null}const ModalSecurity=({modalType:$,page:k,hideModal:st,title:ct,selectedSecurity:dt,onSecurityChange:_,SliderComponent:vt=MyPolzunok})=>{const[oe,Xt]=ut((dt==null?void 0:dt.info)||""),[Yt,ee]=ut((dt==null?void 0:dt.onoff)||0),[Zt,re]=ut((dt==null?void 0:dt.ptype)||0),[ae,pe]=ut((dt==null?void 0:dt.send_sms)||""),[ve,$e]=ut((dt==null?void 0:dt.action)||""),[ie,we]=ut([]),[xe,Ce]=ut({send_sms:null,action:null}),[Se,Ie]=ut(null),Pe=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,Me=(ge,mt)=>!mt||mt.trim()===""||mt.toLowerCase()==="none"?null:ge==="action"?Pe.test(mt)?null:'Incorrect format. Use "None" or "pin:value" format.':mt.length>100?"Text should not exceed 100 characters":null,me=(ge,mt)=>{const pt=Me(ge,mt);switch(Ce(ne=>({...ne,[ge]:pt})),ge){case"send_sms":pe(mt);break;case"action":$e(mt);break}};lt(()=>{fetch("/api/security/get").then(ge=>ge.json()).then(ge=>{const mt=ge.pins||ge;Array.isArray(mt)?we(mt.filter(pt=>pt.topin===2)):we([])}).catch(ge=>{console.error("Error fetching pin config:",ge),we([])})},[]);const Oe=ge=>{if(ge.preventDefault(),Object.values(xe).some(pt=>pt!==null)){Ie("Please correct the errors before submitting.");return}const mt={type:"monitoring",...dt,info:oe,send_sms:ae||"NO",action:ve||"None",onoff:Yt,ptype:Zt};fetch("/api/security/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(mt)}).then(pt=>{if(!pt.ok)throw new Error("Network response was not ok");return pt.json()}).then(pt=>{if(pt.error)throw new Error(pt.error);_(mt),st()}).catch(pt=>{console.error("Error:",pt),Ie("Failed to save changes. Please try again.")})},de=()=>{re(0),pe(""),$e(""),Xt(""),ee(0),Ce({send_sms:null,action:null})},Ee=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50"
      style="margin-top: 7px;"
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <div
          class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative"
          style="max-height: calc(100vh - 57px); overflow-y: auto;"
        >
          <div class="modal-header flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">${ct}</h2>
            <button
              onClick=${st}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          ${k==="TabSecurity"&&$==="connection"?Et`
    <form onSubmit=${Oe}>
      <div class="modal-body">
        <table class="table-auto w-full">
          <tbody>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">ID</td>
              <td class="p-2">${dt.id}</td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Pin</td>
              <td class="p-2">${dt.pins}</td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">Connection</td>
              <td class="p-2">
                <select
                  name="setrpins"
                  value=${ie.some(ge=>ge.pins===(dt==null?void 0:dt.setrpins))?dt==null?void 0:dt.setrpins:""}
                  onChange=${ge=>_({...dt,setrpins:ge.target.value})}
                  class="border rounded p-2 w-full"
                >
                  <option value="">Select a connection</option>
                  ${ie.map(ge=>Et`
                      <option value=${ge.pins}>
                        ${ge.pins} (ID: ${ge.id})
                      </option>
                    `)}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-end mt-4">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save changes
        </button>
      </div>
    </form>
  `:Et`
    <form onSubmit=${Oe}>
      <div class="modal-body">
        <table class="table-auto w-full">
          <tbody>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">ID</td>
              <td class="p-2">${dt.id}</td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Pin</td>
              <td class="p-2">${dt.pins}</td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">Ptype</td>
              <td class="p-2">
                <select
                  name="ptype"
                  value=${Zt}
                  onChange=${ge=>re(parseInt(ge.target.value))}
                  class="border rounded p-2 w-full"
                >
                  <option value="0">PIR</option>
                  <option value="1">Normal open</option>
                  <option value="2">Normal close</option>
                </select>
              </td>
            </tr>

            <tr class="bg-gray-200">
              <td class="p-2 font-bold">Action</td>
              <td class="p-2">
                <input
                  type="text"
                  name="action"
                  value=${ve}
                  onInput=${ge=>me("action",ge.target.value)}
                  class="border rounded p-2 w-full ${xe.action?"border-red-500":""}"
                  placeholder="None"
                />
                ${xe.action&&Et`<p class="text-red-500 text-sm">${xe.action}</p>`}
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Send SMS</td>
              <td class="p-2">
                <select
                  name="send_sms"
                  value=${ae}
                  onchange=${ge=>me("send_sms",ge.target.value)}
                  class="border rounded p-2 w-full ${xe.send_sms?"border-red-500":""}"
                >
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                </select>
                ${xe.send_sms&&Et` <p class="text-red-500 text-sm">${xe.send_sms}</p> `}
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">INFO</td>
              <td class="p-2">
                <input
                  type="text"
                  name="info"
                  value=${oe}
                  onInput=${ge=>Xt(ge.target.value)}
                  class="border rounded p-2 w-full"
                />
              </td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">On/Off</td>
              <td class="p-2">
                <${vt} value=${Yt} onChange=${ee} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-between mt-4">
        <button
          type="button"
          onClick=${de}
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset Pin
        </button>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save changes
        </button>
      </div>
      ${Se&&Et`<p class="text-red-500 mt-2">${Se}</p>`}
    </form>
  `}
        </div>
      </div>
    </div>
  `,Te=at(null);return lt(()=>{const ge=document.createElement("div");return ge.id="modal-portal",document.body.appendChild(ge),Te.current=ge,()=>{O(null,ge),document.body.removeChild(ge)}},[]),lt(()=>{Te.current&&O(Ee,Te.current)}),null};function initGlobalTooltip$1(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,vt=$.offsetHeight,oe=window.innerWidth,Xt=dt.getBoundingClientRect();let Yt=Xt.left+Xt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,oe-_-8));let ee=Xt.top-vt-8;ee<8&&(ee=Xt.bottom+8),$.style.left=Yt+"px",$.style.top=ee+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabSecurity=()=>{const[$,k]=ut({lang:"ru",sim800l:0,onoff:0,tel:"",info:""}),[st,ct]=ut(!1),[dt,_]=ut(!1),[vt,oe]=ut([]),[Xt,Yt]=ut(!1),[ee,Zt]=ut("ru"),[re,ae]=ut(!1),[pe,ve]=ut(""),[$e,ie]=ut(null),[we,xe]=ut(!1),[Ce,Se]=ut("connected"),[Ie,Pe]=ut(0),Me={ru:{titleSim:"SIM800L Settings",titlePins:"Security Pins",colRx:"RXD Pin",colTx:"TXD Pin",colPhone:"Phone Number",colInfo:"Info",colOnOff:"OnOff",colAction:"Action",colId:"ID",colPin:"Pin",colType:"Type of sensor",colSendSms:"Send SMS",colEditPin:"Edit Pin",notConfigured:"Не настроено",notSet:"Не задан",noInfo:"Нет инфо",noData:"Нет доступных данных мониторинга",edit:"Ред.",showHelp:"Показать справку",hideHelp:"Скрыть справку",connRetry:"Connection problems. Retrying...",connLost:"Connection lost. Check your internet connection."},en:{titleSim:"SIM800L Settings",titlePins:"Security Pins",colRx:"RXD Pin",colTx:"TXD Pin",colPhone:"Phone Number",colInfo:"Info",colOnOff:"OnOff",colAction:"Action",colId:"ID",colPin:"Pin",colType:"Type of sensor",colSendSms:"Send SMS",colEditPin:"Edit Pin",notConfigured:"Not configured",notSet:"Not set",noInfo:"No info",noData:"No monitoring data available",edit:"Edit",showHelp:"Show Help",hideHelp:"Hide Help",connRetry:"Connection problems. Retrying...",connLost:"Connection lost. Check your internet connection."}},me=Me[ee]||Me.en,Oe={ru:Et`
      <div class="mytext space-y-6">
        <div>
          <h2 class="text-xl font-bold mb-4 text-blue-600">Модуль SIM800L</h2>
          <p class="mb-4">Модуль позволяет управлять "Заготовкой" при помощи мобильной связи - интернет не нужен!</p>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="font-bold mb-2">Возможности модуля:</h3>
            <ul class="space-y-2 list-disc pl-5">
              <li>Входящие вызовы и SMS принимаются только с номера, указанного в поле «Phone Number». Вызовы с других номеров отклоняются автоматически, SMS — игнорируются.</li>
              <li>Держит вас в курсе происходящего при помощи SMS-уведомлений</li>
              <li>Включается и отключается при помощи ползунка 'OnOFF'</li>
            </ul>
          </div>
          <div class="space-y-4">
            <div class="p-3 bg-green-50 rounded">
              <p class="font-bold">Когда ползунок 'OnOFF' ВКЛючен:</p>
              <p>SMS-уведомления работают по вашим настройкам из таблицы 'Security Pins'</p>
            </div>
            <div class="p-3 bg-gray-50 rounded">
              <p class="font-bold">Когда ползунок 'OnOFF' ОТКлючен:</p>
              <p>Все SMS-уведомления отключены, настройки из таблицы 'Security Pins' не учитываются</p>
            </div>
          </div>
          <div class="mt-6 bg-red-50 p-4 rounded-lg">
            <h3 class="text-red-600 font-bold mb-2">ВАЖНО!</h3>
            <ul class="space-y-2 list-disc pl-5 text-red-700">
              <li>Установить SIM-карту в модуль SIM800L</li>
              <li>Включить SIM800L → Дождаться подключения к GSM → Включить STM32</li>
            </ul>
          </div>
        </div>
      </div>`,en:Et`
      <div class="mytext space-y-6">
        <div>
          <h2 class="text-xl font-bold mb-4 text-blue-600">SIM800L Module</h2>
          <p class="mb-4">The module controls your "Template" using mobile network - no internet required!</p>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="font-bold mb-2">Module capabilities:</h3>
            <ul class="space-y-2 list-disc pl-5">
              <li>Incoming calls and SMS messages are accepted only from the number specified in the “Phone Number” field. Calls from other numbers are automatically rejected, and SMS messages are ignored.</li>
              <li>Keeps you updated using SMS notifications</li>
              <li>Turns ON and OFF using the 'OnOFF' slider</li>
            </ul>
          </div>
          <div class="space-y-4">
            <div class="p-3 bg-green-50 rounded">
              <p class="font-bold">When 'OnOFF' slider is ON:</p>
              <p>SMS notifications work according to your settings in the 'Security Pins' table</p>
            </div>
            <div class="p-3 bg-gray-50 rounded">
              <p class="font-bold">When 'OnOFF' slider is OFF:</p>
              <p>All SMS notifications are disabled, settings in the 'Security Pins' table are ignored</p>
            </div>
          </div>
          <div class="mt-6 bg-red-50 p-4 rounded-lg">
            <h3 class="text-red-600 font-bold mb-2">IMPORTANT!</h3>
            <ul class="space-y-2 list-disc pl-5 text-red-700">
              <li>Insert SIM card into the SIM800L module</li>
              <li>Turn ON SIM800L → Wait for GSM connection → Turn ON STM32</li>
            </ul>
          </div>
        </div>
      </div>`},de={ru:Et`
      <div class="mytext space-y-6">
        <div>
          <h2 class="text-xl font-bold mb-4 text-blue-600">Подключение датчиков 🔌</h2>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="font-bold mb-3">Нормально открытый геркон <span class="text-blue-500 font-bold">(Normal open)</span></h3>
            <ul class="space-y-2">
              <li>• Контакты разомкнуты без магнитного поля</li>
              <li>• Контакты замыкаются при поднесении магнита</li>
              <li>• Подключение: один провод к пину STM32, второй к <span class="text-red-500 font-bold">+3.3V</span></li>
            </ul>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="font-bold mb-3">Нормально закрытый геркон <span class="text-blue-500 font-bold">(Normal close)</span></h3>
            <ul class="space-y-2">
              <li>• Контакты замкнуты без магнитного поля</li>
              <li>• Контакты размыкаются при поднесении магнита</li>
              <li>• Подключение: один провод к пину STM32, второй к <span class="text-red-500 font-bold">+3.3V</span></li>
            </ul>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="font-bold mb-3">Датчики движения <span class="text-blue-500 font-bold">(PIR)</span></h3>
            <ul class="space-y-2">
              <li>• В покое: выход LOW (логический 0)</li>
              <li>• При движении: выход HIGH (логическая 1, максимум <span class="text-red-500 font-bold">+3.3V</span>)</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-4 text-blue-600">Настройка SMS-уведомлений 📱</h2>
          <div class="space-y-4">
            <div class="p-3 bg-green-50 rounded">
              <p class="font-bold">Значение <span class="text-blue-500 font-bold">'YES'</span> в столбце "Send SMS":</p>
              <p>SMS-уведомление будет отправлено</p>
            </div>
            <div class="p-3 bg-gray-50 rounded">
              <p class="font-bold">Значение <span class="text-blue-500 font-bold">'NO'</span> в столбце "Send SMS":</p>
              <p>SMS-уведомление не будет отправлено</p>
            </div>
          </div>
          <div class="mt-4 bg-yellow-50 p-4 rounded-lg">
            <h3 class="font-bold mb-2">Примечание:</h3>
            <ul class="space-y-2">
              <li>• Действия в столбце 'Action' зависят от ползунка 'OnOff' выбранного пина.</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2 mt-6">Отслеживание изменений</h2>
          <table class="w-full">
            <thead>
              <tr><th class="border px-4 py-2">Топик</th><th class="border px-4 py-2">Описание</th></tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">Swarm/security/</td>
                <td class="border px-4 py-2">Данная страница отслеживает изменения сенсоров и автоматически отправляет каждое изменение по MQTT на топик: Swarm/security/. Где "Swarm" это Ваш 'TX topic'.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`,en:Et`
      <div class="mytext space-y-6">
        <div>
          <h2 class="text-xl font-bold mb-4 text-blue-600">Sensor Connection 🔌</h2>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="font-bold mb-3">Normally Open Reed Switch <span class="text-blue-500 font-bold">(Normal open)</span></h3>
            <ul class="space-y-2">
              <li>• Contacts are open without magnetic field</li>
              <li>• Contacts close when magnet is nearby</li>
              <li>• Connection: one wire to STM32 pin, another to <span class="text-red-500 font-bold">+3.3V</span></li>
            </ul>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="font-bold mb-3">Normally Closed Reed Switch <span class="text-blue-500 font-bold">(Normal close)</span></h3>
            <ul class="space-y-2">
              <li>• Contacts are closed without magnetic field</li>
              <li>• Contacts open when magnet is nearby</li>
              <li>• Connection: one wire to STM32 pin, another to <span class="text-red-500 font-bold">+3.3V</span></li>
            </ul>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="font-bold mb-3">Motion Sensors <span class="text-blue-500 font-bold">(PIR)</span></h3>
            <ul class="space-y-2">
              <li>• At rest: output LOW (logical 0)</li>
              <li>• When motion detected: output HIGH (logical 1, max <span class="text-red-500 font-bold">+3.3V</span>)</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-4 text-blue-600">SMS Notification Settings 📱</h2>
          <div class="space-y-4">
            <div class="p-3 bg-green-50 rounded">
              <p class="font-bold">Value <span class="text-blue-500 font-bold">'YES'</span> in "Send SMS" column:</p>
              <p>SMS notification will be sent</p>
            </div>
            <div class="p-3 bg-gray-50 rounded">
              <p class="font-bold">Value <span class="text-blue-500 font-bold">'NO'</span> in "Send SMS" column:</p>
              <p>SMS notification will not be sent</p>
            </div>
          </div>
          <div class="mt-4 bg-yellow-50 p-4 rounded-lg">
            <h3 class="font-bold mb-2">Note:</h3>
            <ul class="space-y-2">
              <li>• Actions in the 'Action' column depend on the 'OnOff' slider of the selected pin.</li>
              <li>• This page sends changes via MQTT to topic: <span class="text-blue-500 font-bold">Swarm/security/</span></li>
            </ul>
          </div>
        </div>
        <div>
          <h2 class="text-xl font-bold mb-2 mt-6">Tracking Changes</h2>
          <table class="w-full">
            <thead>
              <tr><th class="border px-4 py-2">Topic</th><th class="border px-4 py-2">Description</th></tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2 whitespace-nowrap">Swarm/security/</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`};lt(()=>{initGlobalTooltip$1()},[]);const ce=pt=>{if(!(we||Date.now()-Ie<2e3)){if(!pt){Se("error");return}k({lang:pt.lang,sim800l:pt.sim800l,onoff:pt.onoff,tel:pt.tel,info:pt.info}),oe(pt.pins||[]),Se("connected")}},fe=at(0),Ee=at(!1);lt(()=>{let pt=!0;const ne=++fe.current,se=new AbortController,$t=setTimeout(function(){se.abort()},3e3);return fetch("/api/security/get",{signal:se.signal,cache:"no-store"}).then(function(le){if(!le.ok)throw new Error("HTTP "+le.status);return le.json()}).then(function(le){ne===fe.current&&pt&&le!=null&&(Zt(le.lang||"ru"),ce(le))}).catch(function(le){le.name!=="AbortError"&&console.warn("[TabSecurity] init fetch:",le.message)}).finally(function(){clearTimeout($t)}),registerPoll("security","/api/security",function(le){!pt||Ee.current||le!=null&&ce(le)}),function(){pt=!1,se.abort(),clearTimeout($t),unregisterPoll("security")}},[]);const Te=async pt=>{xe(!0);try{await fetch("/api/security/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"sim800l",...pt})}),k(pt),Pe(Date.now())}finally{xe(!1)}},ge=(pt,ne)=>{const se=pt&&pt[ne]?pt[ne]:"",$t=[],le=se.split(" ");for(let ye=0;ye<le.length;ye+=15)$t.push(le.slice(ye,ye+15).join(" "));return $t.join("<br>")},mt=({title:pt,langArr:ne,tooltipIndex:se})=>Et`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help" data-tip=${ge(ne,se)}>${pt}</th>
  `;return Et`
    <div class="flex flex-col items-center w-full p-4">
      ${Ce!=="connected"&&Et`
        <div class="w-full p-2 mb-4 text-white text-center rounded-xl shadow-md backdrop-blur-md ${Ce==="error"?"bg-yellow-500/80":"bg-red-500/80"}">
          ${Ce==="error"?me.connRetry:me.connLost}
        </div>
      `}
      <div class="flex flex-col items-center w-full p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 relative overflow-hidden">
        <div class="w-full mb-10">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">${me.titleSim}</h2>
          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-teal-600/10 border-b border-teal-600/20">
                  <${mt} title=${me.colRx} langArr=${ee==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${1} />
                  <${mt} title=${me.colTx} langArr=${ee==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${2} />
                  <${mt} title=${me.colPhone} langArr=${ee==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${3} />
                  <${mt} title=${me.colInfo} langArr=${ee==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${4} />
                  <${mt} title=${me.colOnOff} langArr=${ee==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${5} />
                  <${mt} title=${me.colAction} langArr=${ee==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${6} />
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                <tr class="bg-white/80 hover:bg-slate-200/80 transition-colors">
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.sim800l===1?"PA3(1)":me.notConfigured}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.sim800l===1?"PD5(35)":me.notConfigured}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.tel||me.notSet}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.info||me.noInfo}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium"><${MyPolzunok} value=${$.onoff} onChange=${pt=>Te({...$,onoff:pt})} /></td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium"><button onClick=${()=>ct(!0)} class="text-teal-600 hover:text-cyan-600 font-bold transition-colors">${me.edit}</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-end mt-6 w-full"><button onclick=${()=>_(!dt)} class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40">${dt?me.hideHelp:me.showHelp}</button></div>
          ${dt&&Et`<div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">${Oe[ee]}</div>`}
        </div>

        <div class="w-full">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">${me.titlePins}</h2>
          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-teal-600/10 border-b border-teal-600/20">
                  <${mt} title=${me.colId} langArr=${ee==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${1} />
                  <${mt} title=${me.colPin} langArr=${ee==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${2} />
                  <${mt} title=${me.colType} langArr=${ee==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${3} />
                  <${mt} title=${me.colAction} langArr=${ee==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${4} />
                  <${mt} title=${me.colSendSms} langArr=${ee==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${5} />
                  <${mt} title=${me.colInfo} langArr=${ee==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${6} />
                  <${mt} title=${me.colOnOff} langArr=${ee==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${7} />
                  <${mt} title=${me.colEditPin} langArr=${ee==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${8} />
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                ${vt.length>0?vt.map((pt,ne)=>Et`
                  <tr class="${ne%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${pt.id}</td><td class="px-6 py-4 text-sm text-slate-800 font-medium">${pt.pins}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${["PIR","Normal open","Normal close"][pt.ptype]}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${pt.action}</td><td class="px-6 py-4 text-sm text-slate-800 font-medium">${pt.send_sms}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${pt.info}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium"><${MyPolzunok} value=${pt.onoff} onChange=${se=>{Pe(Date.now()),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:pt.id,onoff:se})}),oe($t=>$t.map(le=>le.id===pt.id?{...le,onoff:se}:le))}} /></td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium"><button onClick=${()=>{ie(pt),ve("edit"),ae(!0)}} class="text-teal-600 hover:text-cyan-600 font-bold transition-colors">${me.edit}</button></td>
                  </tr>`):Et`<tr><td colspan="8" class="px-6 py-4 text-center text-sm text-slate-600 font-medium">${me.noData}</td></tr>`}
              </tbody>
            </table>
          </div>
          <div class="flex justify-end mt-6 w-full"><button onclick=${()=>Yt(!Xt)} class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40">${Xt?me.hideHelp:me.showHelp}</button></div>
          ${Xt&&Et`<div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">${de[ee]}</div>`}
        </div>
      </div>
      ${st&&Et`<${ModalSIM800L} hideModal=${()=>ct(!1)} title=${me.edit} selectedGps=${$} onSave=${Te} />`}
      ${re&&Et`<${ModalSecurity} modalType=${pe} page="TabSecurity" hideModal=${()=>ae(!1)} title=${me.edit} selectedSecurity=${$e} onSecurityChange=${pt=>{oe(ne=>ne.map(se=>se.id===pt.id?pt:se)),ae(!1)}} />`}
    </div>
  `};function initGlobalTooltip(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"320px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,vt=$.offsetHeight,oe=window.innerWidth,Xt=dt.getBoundingClientRect();let Yt=Xt.left+Xt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,oe-_-8));let ee=Xt.top-vt-8;ee<8&&(ee=Xt.bottom+8),$.style.left=Yt+"px",$.style.top=ee+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const SETTINGS_TIP_IDX={Login:1,Password:2,"Time zone UTC":3,"IP address":4,"Subnet mask":5,"Default gateway":6,Token:7,Host:8,Port:9,Client:10,User:11,"Password (MQTT)":12,"TX topic":13,"RX topic":14,"HTTPS domain":15,"Private Key":16,"Public Key":17,Longitude:18,Latitude:19,Sunrise:20,Sunset:21,"Day Length":22,"Next full moon":23,Date:24,Time:25},getTip=($,k,st,ct)=>{const dt=k==="ru"?st:ct,_=SETTINGS_TIP_IDX[$];if(!_||!dt||!dt[_])return"";const vt=dt[_].split(" "),oe=[];for(let Xt=0;Xt<vt.length;Xt+=12)oe.push(vt.slice(Xt,Xt+12).join(" "));return oe.join("<br>")},FieldRow=({label:$,tipLabel:k,index:st,tip:ct,children:dt})=>{const _=st%2===0?"bg-white/80":"bg-sky-200/40";return Et`
    <tr class="transition-colors border-b border-slate-200 ${_} hover:bg-slate-200/80">
      <td
        class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
        data-tip=${ct}
      >
        ${$}
      </td>
      <td class="w-2/3 pl-4 py-4 pr-6">
        ${dt}
      </td>
    </tr>
  `},LOG_CATEGORIES=[{id:0,key:"SYSTEM",labelEn:"System",labelRu:"Система"},{id:1,key:"MQTT",labelEn:"MQTT",labelRu:"MQTT"},{id:2,key:"NET",labelEn:"Network",labelRu:"Сеть"},{id:3,key:"GSM",labelEn:"GSM",labelRu:"GSM"},{id:4,key:"SCHEDULER",labelEn:"Scheduler",labelRu:"Планировщик"},{id:5,key:"SENSORS",labelEn:"Sensors",labelRu:"Датчики"},{id:6,key:"PID",labelEn:"PID Controller",labelRu:"ПИД-регулятор"},{id:7,key:"SETTINGS",labelEn:"Settings",labelRu:"Настройки"},{id:8,key:"ETH",labelEn:"Ethernet",labelRu:"Ethernet"},{id:9,key:"PHY",labelEn:"PHY",labelRu:"PHY"}];function Settings({}){const[$,k]=ut({}),[st,ct]=ut(null),[dt,_]=ut(null),[vt,oe]=ut({}),Xt=at(null),[Yt,ee]=ut(null),[Zt,re]=ut(null),[ae,pe]=ut(!1),[ve,$e]=ut(!1),[ie,we]=ut(!1),[xe,Ce]=ut(!1),[Se,Ie]=ut(!1),[Pe,Me]=ut(!0),me=at(0),[Oe,de]=ut(!1);lt(()=>{if(initGlobalTooltip(),!document.getElementById("__network_toggle_style")){const te=document.createElement("style");te.id="__network_toggle_style",te.textContent=".network-toggle span { display: none !important; }",document.head.appendChild(te)}},[]);const ce=te=>getTip(te,$.lang||"ru",rulangsettings,enlangsettings),fe=[{value:"en",label:"English"},{value:"ru",label:"Russian"}],Ee=[[-12,"(GMT -12:00) Eniwetok, Kwajalein"],[-11,"(GMT -11:00) Midway Island, Samoa"],[-10,"(GMT -10:00) Hawaii"],[-9,"(GMT -9:00) Alaska"],[-8,"(GMT -8:00) Pacific Time (US & Canada)"],[-7,"(GMT -7:00) Mountain Time (US & Canada)"],[-6,"(GMT -6:00) Central Time (US & Canada), Mexico City"],[-5,"(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima"],[-4,"(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz"],[-3.3,"(GMT -3:30) Newfoundland"],[-3,"(GMT -3:00) Brazil, Buenos Aires, Georgetown"],[-2,"(GMT -2:00) Mid-Atlantic"],[-1,"(GMT -1:00) Azores, Cape Verde Islands"],[0,"(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca"],[1,"(GMT +1:00) Brussels, Copenhagen, Madrid, Paris"],[2,"(GMT +2:00) Kaliningrad, South Africa"],[3,"(GMT +3:00) Moscow, St. Petersburg, Baghdad, Riyadh"],[3.3,"(GMT +3:30) Tehran"],[4,"(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi"],[4.3,"(GMT +4:30) Kabul"],[5,"(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"],[5.3,"(GMT +5:30) Bombay, Calcutta, Madras, New Delhi"],[5.45,"(GMT +5:45) Kathmandu"],[6,"(GMT +6:00) Almaty, Dhaka, Colombo"],[7,"(GMT +7:00) Bangkok, Hanoi, Jakarta"],[8,"(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"],[9,"(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"],[9.3,"(GMT +9:30) Adelaide, Darwin"],[10,"(GMT +10:00) Eastern Australia, Guam, Vladivostok"],[11,"(GMT +11:00) Magadan, Solomon Islands, New Caledonia"],[12,"(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"]],Te=/^(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)$/,ge=te=>{if(!te)return{date:"",time:""};const ke=te.match(/d:(\d{1,2}\.\d{1,2}\.\d{2})/),be=te.match(/t:(\d{2}:\d{2}:\d{2})/);return{date:ke?ke[1]:"",time:be?be[1]:""}},mt=te=>{if(!/^\d{1,2}\.\d{1,2}\.\d{2}$/.test(te))return!1;const[be,Le,Ne]=te.split(".").map(Number);if(Le<1||Le>12||be<1||be>31||Ne<0||Ne>99)return!1;const je=new Date().getFullYear()%100;if(Ne>je+5)return!1;const Fe=new Date(2e3+Ne,Le,0).getDate();return!(be>Fe)},pt=te=>/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(te),ne=(te,ke)=>{const be=Object.values(ke).some(Ne=>Ne!==null),Le=te.usehttps?te.domain&&te.domain.trim()!=="":!0;return!(be||!Le)},se=(te,ke)=>{ee({message:te,type:ke}),setTimeout(()=>{ee(null)},3e3)},$t=te=>{re(te),setTimeout(()=>{re(null)},3e3)},le=(te,ke)=>{let be=null;if(!$.usehttps&&["domain","tls_key","tls_cert","tls_ca","telegram_token"].includes(te))return null;if(!ke&&["ip_addr","gateway","mqtt_hst","sb_mask","offdate","offtime","domain"].includes(te))return"Поле не может быть пустым";switch(te){case"ip_addr":case"gateway":case"mqtt_hst":ke.length>50&&(be="Слишком длинное имя хоста");break;case"sb_mask":Te.test(ke)||(be="Неверная маска подсети");break;case"offdate":mt(ke)||(be="Неверный формат даты (д.м.гг)");break;case"offtime":pt(ke)||(be="Неверный формат времени (чч:мм:сс)");break;case"domain":ke.length>50?be="Домен не должен превышать 50 символов":ke.match(/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/)||(be="Неверный формат домена");break;case"tls_key":ke&&ke.trim()!==""&&(ke.length>512?be="Private Key не должен превышать 512 символов":(!ke.includes("BEGIN EC PRIVATE KEY")||!ke.includes("END EC PRIVATE KEY"))&&(be="Неверный формат Private Key"));break;case"tls_cert":ke&&ke.trim()!==""&&(ke.length>1024?be="Public Key не должен превышать 1024 символов":(!ke.includes("BEGIN CERTIFICATE")||!ke.includes("END CERTIFICATE"))&&(be="Неверный формат Public Key"));break;case"tls_ca":ke&&ke.trim()!==""&&(ke.length>1024?be="Secret Key не должен превышать 1024 символов":(!ke.includes("BEGIN CERTIFICATE")||!ke.includes("END CERTIFICATE"))&&(be="Неверный формат Secret Key"));break}return be},ye=te=>{const ke=($.lang||"ru")==="ru";k(be=>({...be,log_filter_mask:te})),fetch("/api/logfilter",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({mask:te})}).then(be=>{if(!be.ok)throw new Error("Network error");return be.json()}).then(be=>{be.status&&se(ke?"Фильтр логов обновлен в RAM":"Log filter updated in RAM","success")}).catch(be=>{console.error("Error applying log filter in RAM:",be),se(ke?"Ошибка обновления RAM фильтра":"Error updating RAM log filter","error")})},_e=te=>{te.preventDefault();const ke=new FormData(Xt.current);let be={...$};for(const[Le,Ne]of ke.entries())["lon_de","lat_de","timezone","mqtt_prt"].includes(Le)?be[Le]=Ne===""||Ne===null?0:Number(Ne):be[Le]=Ne;be.usehttps||["tls_ca","tls_key","tls_cert","telegram_token","domain"].forEach(Le=>delete be[Le]),be.offdate&&be.offtime?be.offldt=`d:${be.offdate} t:${be.offtime}`:delete be.offldt,["lon_de","lat_de","timezone","mqtt_prt"].forEach(Le=>{(be[Le]===null||be[Le]==="")&&(be[Le]=0)}),be.onsunrise=be.onsunrise?1:0,be.onsunset=be.onsunset?1:0,be.check_ip=be.check_ip?1:0,be.check_mqtt=be.check_mqtt?1:0,be.usehttps=be.usehttps?1:0,fetch("/api/mysett/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(be)}).then(Le=>{if(!Le.ok)throw new Error("Ошибка сети");return Le.json()}).then(Le=>{_("success"),ct(Le),se("Данные успешно сохранены","success"),$t("Данные успешно сохранены"),me.current=0}).catch(Le=>{_("error"),ct(Le),se("Ошибка при сохранении данных","error"),$t("Ошибка при сохранении данных")})},he=(te,ke)=>{let be=null;te==="offdate"?be=mt(ke)?null:"Неверный формат даты (д.м.гг)":te==="offtime"?be=pt(ke)?null:"Неверный формат времени (чч:мм:сс)":be=le(te,ke),oe(Ne=>{const je={...Ne,[te]:be},Fe=["tls_key","tls_cert","tls_ca"],Be=Object.keys(je).filter(He=>!Fe.includes(He)&&He!=="telegram_token").some(He=>je[He]!==null);return pe(Be||!$.usehttps&&Fe.some(He=>$[He])),je});let Le=ke;["lon_de","lat_de","timezone","mqtt_prt"].includes(te)?Le=ke===""||ke===null?0:Number(ke):["onsunrise","onsunset","check_ip","check_mqtt","usehttps"].includes(te)&&(Le=ke?1:0),k(Ne=>({...Ne,[te]:Le})),me.current=Date.now(),te==="usehttps"&&(oe({}),pe(!1))},ue=()=>fetch("/api/mysett/get",{cache:"no-store"}).then(te=>te.json()).then(te=>{if(te!=null){if(te.offldt){const{date:ke,time:be}=ge(te.offldt);te.offdate=ke,te.offtime=be}k(te)}return te}).catch(te=>{console.error("Error fetching settings:",te),se("Ошибка при загрузке настроек","error")}),De=at(0),Ae=at(!1);if(lt(()=>{let te=!0;const ke=++De.current;return ue().finally(function(){ke===De.current&&te&&Me(!1)}),registerPoll("settings","/api/mysett/get",function(be){if(!(!te||Ae.current)&&!(Date.now()-me.current<8e3)){var Le=document.activeElement;if(!(Le&&(Le.tagName==="INPUT"||Le.tagName==="TEXTAREA"||Le.tagName==="SELECT"))&&be!=null){if(be.offldt){var Ne=ge(be.offldt);be.offdate=Ne.date,be.offtime=Ne.time}k(be),be.tls_key&&$e(!0),be.tls_cert&&we(!0),be.tls_ca&&Ce(!0),be.telegram_token&&Ie(!0)}}}),function(){te=!1,unregisterPoll("settings")}},[]),lt(()=>{pe(!ne($,vt))},[$,vt]),Pe)return Et`<div>Loading...</div>`;if(!$)return"";const Re=(te="")=>Et`
    <button
      type="submit"
      class=${`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 ${ae?"opacity-50 cursor-not-allowed bg-slate-400":"bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500"} ${te}`}
      disabled=${ae}
    >
      <span class="relative flex items-center gap-2 text-lg tracking-wide drop-shadow-md">Save changes</span>
    </button>
  `;return Et`
    <div class="flex flex-col items-center w-full p-4 mb-16">
      <div class="flex flex-col items-center w-full p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 relative overflow-hidden">
        <!-- Decorative background glow -->
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <!-- Header -->
        <div class="w-full mb-6 px-2 flex flex-row items-center gap-6">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight drop-shadow-sm uppercase">Global Settings</h2>
          <select
            value=${$.lang}
            onChange=${te=>he("lang",te.target.value)}
            style="border: 2px solid #22d3ee; border-radius: 8px; padding: 4px 10px; font-size: 14px; font-weight: 600; background: white; color: #1e293b; cursor: pointer; outline: none;"
          >
            ${fe.map(te=>Et`<option value=${te.value}>${te.label}</option>`)}
          </select>
        </div>

        ${Zt&&Et`
          <div class="w-full max-w-4xl bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center mb-6 border border-green-400/50 backdrop-blur-md">
            ${Zt}
          </div>
        `}

        <form ref=${Xt} onSubmit=${_e} class="w-full max-w-4xl flex flex-col gap-6 relative">

          <div class="flex justify-end w-full">${Re()}</div>

          <!-- ============================================================
               User data
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">User data</th>
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                  </tr>
                </thead>
                <tbody>
              ${[{label:"Login",key:"adm_name",type:"text"},{label:"Password",key:"adm_pswd",type:"password"},{label:"Time zone UTC",key:"timezone",type:"select",options:Ee}].map((te,ke)=>Et`
                <${FieldRow} label=${te.label} tip=${ce(te.tipLabel||te.label)} index=${ke}>
                  <${pageSetting}
                    value=${$[te.key]}
                    setfn=${be=>he(te.key,be)}
                    type=${te.type}
                    options=${te.options}
                    class=${`w-full px-3 py-2 bg-white/50 border ${vt[te.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    error=${vt[te.key]}
                  />
                <//>
              `)}
                </tbody>
              </table>
            </div>
          </div>

          <!-- ============================================================
               Network
          ============================================================ -->
          <div class="w-full mb-6">
            ${$.check_ip?Et`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide" colspan="2">
                        <div class="flex items-center gap-3">
                          <span>Network</span>
                          <div class="network-toggle">
                            <${MyPolzunok} value=${$.check_ip} onChange=${te=>he("check_ip",te)} />
                          </div>
                          <span class="text-slate-600 font-medium tracking-wide text-lg">DHCP</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            `:Et`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">
                        <div class="flex items-center gap-3">
                          <span>Network</span>
                          <div class="network-toggle">
                            <${MyPolzunok} value=${$.check_ip} onChange=${te=>he("check_ip",te)} />
                          </div>
                          <span class="text-slate-600 font-medium tracking-wide text-lg">
                            ${$.check_ip?"DHCP":"Static IP"}
                          </span>
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                  ${[{label:"IP address",key:"ip_addr",type:"text"},{label:"Subnet mask",key:"sb_mask",type:"text"},{label:"Default gateway",key:"gateway",type:"text"}].map((te,ke)=>Et`
                    <${FieldRow} label=${te.label} tip=${ce(te.tipLabel||te.label)} index=${ke}>
                      <${pageSetting}
                        value=${$[te.key]}
                        setfn=${be=>he(te.key,be)}
                        type=${te.type}
                        class=${`w-full px-3 py-2 bg-white/50 border ${vt[te.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        error=${vt[te.key]}
                      />
                    <//>
                  `)}
                  </tbody>
                </table>
              </div>
            `}
          </div>

          <!-- ============================================================
               API Settings
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">API Settings</th>
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                  </tr>
                </thead>
                <tbody>
              <${FieldRow} label="Token" tip=${ce("Token")} index=${0}>
                <${pageSetting}
                  value=${$.token}
                  setfn=${te=>he("token",te)}
                  type="text"
                  class="w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              <//>
                </tbody>
              </table>
            </div>
          </div>

          <!-- ============================================================
               MQTT
          ============================================================ -->
          <div class="w-full mb-6">
            ${$.check_mqtt?Et`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">
                        <div class="flex items-center gap-3">
                          <span>MQTT</span>
                          <${MyPolzunok} value=${$.check_mqtt} onChange=${te=>he("check_mqtt",te)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[{label:"Host",key:"mqtt_hst",type:"text",maxlength:50},{label:"Port",key:"mqtt_prt",type:"number"},{label:"Client",key:"mqtt_clt",type:"text",maxlength:32},{label:"User",key:"mqtt_usr",type:"text",maxlength:32},{label:"Password",key:"mqtt_pswd",type:"password",maxlength:32,tipLabel:"Password (MQTT)"},{label:"TX topic",key:"txmqttop",type:"text",maxlength:32},{label:"RX topic",key:"rxmqttop",type:"text",maxlength:32}].map((te,ke)=>Et`
                  <${FieldRow} label=${te.label} tip=${ce(te.tipLabel||te.label)} index=${ke}>
                    <${pageSetting}
                      value=${$[te.key]}
                      setfn=${be=>he(te.key,be)}
                      type=${te.type}
                      maxlength=${te.maxlength}
                      class=${`w-full px-3 py-2 bg-white/50 border ${vt[te.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      error=${vt[te.key]}
                    />
                  <//>
                `)}
                  </tbody>
                </table>
              </div>
            `:Et`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide" colspan="2">
                        <div class="flex items-center gap-3">
                          <span>MQTT</span>
                          <${MyPolzunok} value=${$.check_mqtt} onChange=${te=>he("check_mqtt",te)} />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            `}
          </div>

          <!-- ============================================================
               HTTPS
          ============================================================ -->
          <div class="w-full mb-6">
            ${$.usehttps?Et`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">
                        <div class="flex items-center gap-3">
                          <span>HTTPS</span>
                          <${MyPolzunok} value=${$.usehttps} onChange=${te=>he("usehttps",te)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[{label:"HTTPS domain",key:"domain",type:"text"},{label:"Private Key",key:"tls_key",type:"textarea"},{label:"Public Key",key:"tls_cert",type:"textarea"}].map((te,ke)=>Et`
                  <tr class="transition-colors border-b border-slate-200 ${ke%2===0?"bg-sky-200/40":"bg-white/80"} hover:bg-slate-200/80">
                    <td
                      class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help align-top"
                      data-tip=${ce(te.label)}
                    >
                      ${te.label}
                    </td>
                    <td class="w-2/3 pl-4 py-4 pr-6 align-top">
                      <div class="relative w-full">
                        ${te.type==="textarea"?Et`
                            ${te.key==="tls_key"&&$.tls_key?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены, но информация скрыта!</div>`:te.key==="tls_cert"&&$.tls_cert?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены успешно!</div>`:Et`<textarea
                                    name=${te.key}
                                    value=${$[te.key]||""}
                                    onInput=${be=>he(te.key,be.target.value)}
                                    class=${`w-full px-3 py-2 bg-white/50 border ${vt[te.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                                    rows="1"
                                    placeholder="Enter ${te.label}"
                                  ></textarea>`}
                          `:Et`
                            <input
                              type="text"
                              name=${te.key}
                              value=${$[te.key]||""}
                              onInput=${be=>he(te.key,be.target.value)}
                              class=${`w-full px-3 py-2 bg-white/50 border ${vt[te.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                              maxlength="30"
                              placeholder="Enter domain (e.g., zagotovka.ddns.net)"
                            />
                          `}
                        ${$[te.key]&&te.key==="tls_cert"&&Et`
                          <div class="absolute right-0 top-0 mt-[3px] mr-[3px] flex gap-2">
                            <button type="button"
                              onClick=${()=>{navigator.clipboard.writeText($[te.key]),$t("Данные скопированы")}}
                              class="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5"
                            >Копировать</button>
                            <button type="button"
                              onClick=${()=>he(te.key,"")}
                              class="px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                            >Очистить</button>
                          </div>
                        `}
                        ${$[te.key]&&te.key!=="domain"&&te.key!=="tls_cert"&&Et`
                          <button type="button"
                            onClick=${()=>he(te.key,"")}
                            class="absolute right-0 top-0 mt-[3px] mr-[3px] px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                          >Очистить</button>
                        `}
                      </div>
                      ${vt[te.key]&&Et`<div class="text-red-500 text-sm mt-1 font-semibold w-full text-left">${vt[te.key]}</div>`}
                    </td>
                  </tr>
                `)}
                  </tbody>
                </table>
              </div>
            `:Et`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide" colspan="2">
                        <div class="flex items-center gap-3">
                          <span>HTTPS</span>
                          <${MyPolzunok} value=${$.usehttps} onChange=${te=>he("usehttps",te)} />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            `}
          </div>

          <!-- ============================================================
               Coordinates & Astronomy
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">Coordinates & Astronomy</th>
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                  </tr>
                </thead>
                <tbody>

              <${FieldRow} label="Longitude" tip=${ce("Longitude")} index=${0}>
                <${pageSetting} value=${$.lon_de} setfn=${te=>he("lon_de",te)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${vt.lon_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${vt.lon_de} />
              <//>

              <${FieldRow} label="Latitude" tip=${ce("Latitude")} index=${1}>
                <${pageSetting} value=${$.lat_de} setfn=${te=>he("lat_de",te)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${vt.lat_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${vt.lat_de} />
              <//>

              <!-- Sunrise — нестандартная строка, data-tip вручную -->
              <tr class="transition-colors border-b border-slate-200 bg-white/80 hover:bg-slate-200/80">
                <td
                  class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
                  data-tip=${ce("Sunrise")}
                >
                  Sunrise: <span class="text-teal-600 drop-shadow-sm">${$.sunrise}</span>
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <div class="flex items-center gap-4">
                    <${MyPolzunok} value=${$.onsunrise} onChange=${te=>he("onsunrise",te)} />
                    <input type="text" value=${$.sunrise_pins||""} onInput=${te=>he("sunrise_pins",te.target.value)}
                      maxlength="20" placeholder="Action for sunrise"
                      class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  </div>
                </td>
              </tr>

              <!-- Sunset -->
              <tr class="transition-colors border-b border-slate-200 bg-sky-200/40 hover:bg-slate-200/80">
                <td
                  class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
                  data-tip=${ce("Sunset")}
                >
                  Sunset: <span class="text-teal-600 drop-shadow-sm">${$.sunset}</span>
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <div class="flex items-center gap-4">
                    <${MyPolzunok} value=${$.onsunset} onChange=${te=>he("onsunset",te)} />
                    <input type="text" value=${$.sunset_pins||""} onInput=${te=>he("sunset_pins",te.target.value)}
                      maxlength="20" placeholder="Action for sunset"
                      class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  </div>
                </td>
              </tr>

              <${FieldRow} label="Day Length" tip=${ce("Day Length")} index=${4}>
                <span class="text-xl font-medium text-slate-800">${$.dlength}</span>
              <//>

              <${FieldRow} label="Next full moon" tip=${ce("Next full moon")} index=${5}>
                <span class="text-xl font-medium text-slate-800">
                  ${typeof $.fullmoon=="string"&&$.fullmoon?`${$.fullmoon.split(" ")[0]} at ${$.fullmoon.split(" ")[1]}`:"N/A"}
                </span>
              <//>
              </tbody>
            </table>
            </div>
          </div>

          <!-- ============================================================
               Offline Mode — Date & Time
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">[OFFLINE MODE] Date & Time</th>
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                  </tr>
                </thead>
                <tbody>
              <!-- Date -->
              <tr class="transition-colors border-b border-slate-200 bg-white/80 hover:bg-slate-200/80">
                <td
                  class="w-1/3 font-bold text-slate-700 text-lg border-r border-slate-500 py-4 px-6 cursor-help"
                  data-tip=${ce("Date")}
                >
                  Date
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <input type="text" name="offdate" value=${$.offdate||""} onInput=${te=>he("offdate",te.target.value)}
                    placeholder="dd.mm.yy"
                    class=${`w-full px-3 py-2 bg-white/50 border ${vt.offdate?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${vt.offdate&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${vt.offdate}</div>`}
                </td>
              </tr>

              <!-- Time -->
              <tr class="transition-colors border-b border-slate-200 bg-sky-200/40 hover:bg-slate-200/80">
                <td
                  class="w-1/3 font-bold text-slate-700 text-lg border-r border-slate-500 py-4 px-6 cursor-help"
                  data-tip=${ce("Time")}
                >
                  Time
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <input type="text" name="offtime" value=${$.offtime||""} onInput=${te=>he("offtime",te.target.value)}
                    placeholder="hh:mm:ss"
                    class=${`w-full px-3 py-2 bg-white/50 border ${vt.offtime?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${vt.offtime&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${vt.offtime}</div>`}
                </td>
              </tr>
              </tbody>
            </table>
            </div>
          </div>

          <!-- ============================================================
              Log Filter / Фильтр логов
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">

              <div
                class="bg-teal-600/10 border-b border-teal-600/20 px-6 py-4 flex items-center justify-between cursor-pointer select-none hover:bg-teal-600/20 transition-colors"
                onClick=${()=>de(te=>!te)}
              >
                <span class="text-2xl font-bold text-slate-700 tracking-wide flex items-center gap-2">
                  <span class="text-teal-600 text-lg">${Oe?"▾":"▸"}</span>
                  ${($.lang||"ru")==="ru"?"Фильтр логов":"Log Filter"}
                </span>
                <div class="flex items-center gap-3">
                  <span class="text-slate-600 font-medium tracking-wide text-lg">
                    ${($.lang||"ru")==="ru"?"Маска логов в RAM:":"RAM Log Mask:"}
                  </span>
                  <span class="px-2 py-0.5 bg-cyan-600/10 text-cyan-700 rounded-md font-mono font-bold text-lg">
                    ${$.log_filter_mask!==void 0?$.log_filter_mask:1023} (0x${($.log_filter_mask!==void 0?$.log_filter_mask:1023).toString(16).toUpperCase()})
                  </span>
                </div>
              </div>

              ${Oe&&Et`
                <div class="flex items-stretch">

                  <div class="w-1/4 border-r border-slate-300 px-6 py-6 flex flex-col justify-center items-center gap-4"
                      data-tip=${($.lang||"ru")==="ru"?"Выберите категории логов, которые выводятся в UART и отсылаются. Изменения применяются немедленно в RAM!":"Select which log categories are enabled. Changes apply immediately in RAM!"}>
                    <span class="text-base font-bold text-slate-700 text-center">
                      ${($.lang||"ru")==="ru"?"Активные категории":"Active Categories"}
                    </span>
                    <button type="button" onClick=${()=>ye(1023)}
                      class="w-full py-3 text-sm font-bold text-teal-600 bg-teal-50 border border-teal-200 rounded-xl hover:bg-teal-100 hover:text-teal-700 transition-all text-center shadow-sm">
                      ${($.lang||"ru")==="ru"?"Включить все":"Enable All"}
                    </button>
                    <button type="button" onClick=${()=>ye(0)}
                      class="w-full py-3 text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 hover:text-rose-700 transition-all text-center shadow-sm">
                      ${($.lang||"ru")==="ru"?"Выключить все":"Disable All"}
                    </button>
                  </div>

                  <div class="w-3/4 px-6 py-6">
                    <div class="grid grid-cols-4 gap-3">
                      ${LOG_CATEGORIES.map(te=>{const ke=$.log_filter_mask!==void 0?$.log_filter_mask:1023,be=(ke&1<<te.id)!==0;return Et`
                          <label class=${`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all duration-300 ${be?"bg-cyan-50/70 border-cyan-300 shadow-[0_2px_10px_rgba(34,211,238,0.15)] scale-[1.02]":"bg-slate-50/40 border-slate-200 hover:bg-slate-100/50"}`}>
                            <input
                              type="checkbox"
                              checked=${be}
                              onChange=${Le=>{const Ne=Le.target.checked?ke|1<<te.id:ke&~(1<<te.id);ye(Ne)}}
                              class="w-5 h-5 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500 focus:ring-2"
                            />
                            <div class="flex flex-col">
                              <span class="font-bold text-slate-800 text-base leading-tight">${te.key}</span>
                              <span class="text-xs text-slate-500 font-medium">${($.lang||"ru")==="ru"?te.labelRu:te.labelEn}</span>
                            </div>
                          </label>
                        `})}
                    </div>
                  </div>

                </div>
              `}
            </div>
          </div>

          ${Zt&&Et`
            <div class="w-full bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center border border-green-400/50 backdrop-blur-md">
              ${Zt}
            </div>
          `}

          <div class="flex justify-end w-full mb-4">${Re()}</div>

        </form>
      </div>
    </div>
    ${Yt&&Et`<${Toast} message=${Yt.message} type=${Yt.type} />`}
  `}const Logo=$=>Et`<svg
    class=${$.class}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12.87 12.85"
  >
    <defs>
      <style>
        .ll-cls-1 {
          fill: none;
          stroke: #000;
          stroke-miterlimit: 10;
          stroke-width: 0.5px;
        }
      </style>
    </defs>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          class="ll-cls-1"
          d="M12.62,1.82V8.91A1.58,1.58,0,0,1,11,10.48H4a1.44,1.44,0,0,1-1-.37A.69.69,0,0,1,2.84,10l-.1-.12a.81.81,0,0,1-.15-.48V5.57a.87.87,0,0,1,.86-.86H4.73V7.28a.86.86,0,0,0,.86.85H9.42a.85.85,0,0,0,.85-.85V3.45A.86.86,0,0,0,10.13,3,.76.76,0,0,0,10,2.84a.29.29,0,0,0-.12-.1,1.49,1.49,0,0,0-1-.37H2.39V1.82A1.57,1.57,0,0,1,4,.25H11A1.57,1.57,0,0,1,12.62,1.82Z"
        />
        <path
          class="ll-cls-1"
          d="M10.48,10.48V11A1.58,1.58,0,0,1,8.9,12.6H1.82A1.57,1.57,0,0,1,.25,11V3.94A1.57,1.57,0,0,1,1.82,2.37H8.9a1.49,1.49,0,0,1,1,.37l.12.1a.76.76,0,0,1,.11.14.86.86,0,0,1,.14.47V7.28a.85.85,0,0,1-.85.85H8.13V5.57a.86.86,0,0,0-.85-.86H3.45a.87.87,0,0,0-.86.86V9.4a.81.81,0,0,0,.15.48l.1.12a.69.69,0,0,0,.13.11,1.44,1.44,0,0,0,1,.37Z"
        />
      </g>
    </g>
  </svg>`;function Header({logout:$,user:k,setShowSidebar:st,showSidebar:ct}){const[dt,_]=ut(new Date),vt=ht(StateContext),oe=Zt=>new Date(Zt.year+1900,Zt.mon,Zt.mday,Zt.hour,Zt.min,Zt.sec);lt(()=>{const Zt=setInterval(()=>_(new Date),1e3);return()=>clearInterval(Zt)},[]);const Xt=vt&&vt.time&&vt.time.status?oe(vt.time.time):null,Yt=Zt=>Zt.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric"}),ee=Zt=>Zt.toLocaleTimeString("ru-RU");return Et`
    <div
      class="bg-white/40 backdrop-blur-md border-b border-white/40 shadow-sm sticky top-0 z-[48] w-full py-2 ${ct?"pl-72":""} transition-all duration-300 transform"
    >
      <div class="px-4 w-full py-0 my-0 flex items-center justify-between">
        <button
          type="button"
          onclick=${()=>st(Zt=>!Zt)}
          class="text-slate-500 hover:text-teal-500 transition-colors"
        >
          <${Icons.bars3} class="h-6" />
        </button>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600">
            Дата: ${Yt(dt)}<span style="margin-left: 8px;"></span
            >Время: ${ee(dt)}
          </span>
        </div>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600"
            >STM32 дата:
            ${Xt?Yt(Xt):" 00.00.0000"}<span
              style="margin-left: 8px;"
            ></span
            >Время: ${Xt?ee(Xt):"00:00"}
          </span>
        </div>
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <span class="text-sm text-slate-400">logged in as: ${k}</span>
          <div
            class="hidden lg:block lg:h-4 lg:w-px lg:bg-slate-200/60"
            aria-hidden="true"
          ></div>
          <${Button} title="Logout" icon=${Icons.logout} onclick=${$}
  colors="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 shadow-md hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
  cls="rounded-full font-bold"
/>
        </div>
      </div>
    </div>
  `}function Sidebar({url:$,show:k}){const st=({title:ct,icon:dt,href:_,url:vt})=>Et`
  <div>
    <a href="#${_}" class="${_==vt?"bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-md group":"text-slate-600 hover:bg-slate-200/60 hover:text-slate-800 group"} flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
      <${dt} class="w-6 h-6"/>
      ${ct}
    <///>
  <//>`;return Et` <div
    class="hs-overlay hs-overlay-open:translate-x-0
            -translate-x-full transition-all duration-300 transform
            fixed top-0 left-0 bottom-0 z-[60] w-72
            bg-white/60 backdrop-blur-md border-r border-white/40 shadow-xl
            overflow-y-auto scrollbar-y
            ${k&&"translate-x-0"} right-auto bottom-0"
  >
    <div class="flex flex-col m-4 gap-y-6">
      <div
        class="flex h-10 shrink-0 items-center gap-x-4 font-bold text-xl text-slate-500"
      >
        <${Logo} class="h-full" /> Zagotovka
      <//>
      <div class="flex flex-1 flex-col">
        <${st} title="Dashboard" icon=${Icons.home} href="/" url=${$} />
        <${st}
          title="Select pin"
          icon=${Icons.bars4}
          href="/selects"
          url=${$}
        />
        <${st}
          title="Switch pin"
          icon=${Icons.switchIcon}
          href="/switch"
          url=${$}
        />
        <${st}
          title="Button pin "
          icon=${Icons.buttonIcon}
          href="/button"
          url=${$}
        />
        <${st}
          title="Encoder pin"
          icon=${Icons.encoderIcon}
          href="/encoder"
          url=${$}
        />
         <${st}
          title="PID controller"
          icon=${Icons.cog}
          href="/pid"
          url=${$}
        />
        <${st}
          title="Timers (cron)"
          icon=${Icons.timerIcon}
          href="/cron"
          url=${$}
        />
        <${st}
          title="OneWire pin"
          icon=${Icons.owIcon}
          href="/1wire"
          url=${$}
        />
        <${st}
          title="SIM800L/Security"
          icon=${Icons.cog}
          href="/Security"
          url=${$}
        />
        <${st}
          title="Settings"
          icon=${Icons.cog}
          href="/settings"
          url=${$}
        />
        <${st}
          title="Firmware Update"
          icon=${Icons.download}
          href="/update"
          url=${$}
        />
      <//>
    <//>
  <//>`}function Chart({data:$}){const k=$.length,st=20,ct=15,dt=100,_=5,vt=10,oe=25,Xt=re=>(dt-vt)/_*(re+1),Yt=re=>(dt-vt)*re/100,ee=re=>dt-vt-Yt(re),Zt=(re,ae,pe)=>Array.from({length:ae},(ve,$e)=>$e*1+re);return Et` <div
    class="my-4 divide-y divide-gray-200 overflow-auto rounded bg-white"
  >
    <div class="font-light uppercase flex items-center text-gray-600 px-4 py-2">
      Temperature, last 24h
    <//>
    <div class="relative">
      <svg class="bg-yellow-x50 w-full p-4" viewBox="0 0 ${k*st+ct} ${dt}">
        ${Zt(0,_).map(re=>Et`
            <line
              x1="0"
              y1=${Xt(re)}
              x2=${ct+k*st}
              y2=${Xt(re)}
              stroke-width="0.3"
              class="stroke-slate-300"
              stroke-dasharray="1,1"
            />
            <text x="0" y=${Xt(re)-2} class="text-[6px] fill-slate-400"
              >${oe-oe/_*(re+1)}<//
            >
          `)}
        ${Zt(0,k).map(re=>Et`
            <rect
              x=${ct+re*st}
              y=${ee($[re]*100/oe)}
              width="12"
              height=${Yt($[re]*100/oe)}
              rx="2"
              class="fill-cyan-500"
            />
            <text x=${ct+re*st} y="100" class="text-[6px] fill-slate-400"
              >${re*2}:00<//
            >
          `)}
      <//>
    <//>
  <//>`}function DeveloperNote({text:$,children:k}){return Et` <div class="flex p-4 gap-2">
    <div class="text-sm text-slate-500">
      <div class="flex items-center">
        <${Icons.info}
          class="self-start basis-[30px] grow-0 shrink-0 text-green-600 mr-2"
        />
        <div class="font-semibold">Developer Note<//>
      <//>
      ${($||"").split(".").map(st=>Et` <p class="my-2 ">${st}<//>`)}
      ${k}
    <//>
  <//>`}function Main({}){const[$,k]=ut(null);return lt(()=>fetch("api/stats/get").then(ct=>ct.json()).then(ct=>k(ct)),[]),$?Et` <div class="p-2">
    <div class="p-4 sm:p-2 mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
      <${Stat}
        title="Temperature"
        text="${$.temperature} °C"
        tipText="good"
        tipIcon=${Icons.ok}
        tipColors=${tipColors.green}
      />
      <${Stat}
        title="Humidity"
        text="${$.humidity} %"
        tipText="warn"
        tipIcon=${Icons.warn}
        tipColors=${tipColors.yellow}
      />
      <div class="bg-white col-span-2 border rounded-md shadow-lg" role="alert">
        <${DeveloperNote}
          text="Stats data is received from the Mongoose backend"
        />
      <//>
    <//>
    <div class="p-4 sm:p-2 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
      <${Chart} data=${$.points} />

      <div class="my-4 hx-24 bg-white border rounded-md shadow-lg" role="alert">
        <${DeveloperNote}
          text="This chart is an SVG image, generated on the fly from the
        data returned by the api/stats/get API call"
        />
      <//>
    <//>
  <//>`:""}const MyPolzunok=({value:$,onChange:k})=>Et`
    <div class="flex items-center gap-3">
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          class="sr-only peer"
          checked=${$}
          onChange=${ct=>{k(ct.target.checked?1:0)}}
        />
        <div class="w-[42px] h-[22px] bg-slate-200/80 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300/50 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-400 peer-checked:to-cyan-500 shadow-inner"></div>
      </label>
      <span class="text-sm font-medium text-slate-600 w-8">${$?"On":"Off"}</span>
    </div>
  `;function FirmwareStatus({title:$,info:k,children:st}){return Et`
    <div class="bg-white xm-4 divide-y border rounded flex flex-col">
      <div
        class="font-light uppercase flex items-center text-gray-600 px-4 py-2"
      >
        ${$}
      </div>
      <div class="px-4 py-3 flex flex-col gap-2 grow">
        <div>Version: ${k.version||"N/A"}</div>
        <div>Status: ${k.status||"N/A"}</div>
        ${st}
      </div>
    </div>
  `}function FirmwareUpdate({}){const[$,k]=ut([{},{}]),[st,ct]=ut(null),dt=()=>fetch("api/firmware/status").then(re=>re.json()).then(re=>k(re));lt(dt,[]),lt(()=>{if(st){const re=setTimeout(()=>{ct(null)},3e3);return()=>clearTimeout(re)}},[st]);const _=re=>fetch("api/firmware/commit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({})}).then(ae=>ae.json()).then(dt),vt=re=>fetch("api/device/reset",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reboot:1})}).then(ae=>ae.json()).then(ae=>new Promise(pe=>setTimeout(()=>{dt(),pe()},5e3))),oe=re=>fetch("api/firmware/rollback",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({})}).then(vt),Xt=re=>fetch("api/device/eraselast").then(dt),Yt=function(re){if(!re){ct({type:"yellow",message:"Error: No file selected."});return}const ae=re.name.split(".").pop().toLowerCase();if(ae!=="bin"&&ae!=="hex"){ct({type:"red",message:"Error: Only .bin and .hex files are allowed!"});return}const pe=new FormData;pe.append("file",re),fetch("api/firmware/upload",{method:"POST",body:pe}).then(ve=>{if(!ve.ok)throw new Error(`HTTP error! status: ${ve.status}`);return ve.json()}).then(()=>{ct({type:"green",message:"Firmware uploaded successfully!"}),dt()}).catch(ve=>{ct({type:"yellow",message:`Error: Upload failed. ${ve.message}`})})},ee=({type:re,message:ae})=>Et`
      <div
        class=${`fixed top-0 left-0 right-0 z-50 border-b-4 p-4 ${re==="red"?"bg-red-100 border-red-500 text-red-700":re==="yellow"?"bg-yellow-100 border-yellow-500 text-yellow-700":"bg-green-100 border-green-500 text-green-700"}`}
        role="alert"
      >
        <p class="font-bold text-center">${ae}</p>
      </div>
    `,Zt=({title:re,onupload:ae})=>Et`
      <label
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        ${re}
        <input
          type="file"
          class="hidden"
          accept=".bin,.hex"
          onChange=${ve=>{const $e=ve.target.files[0];$e&&ae($e)}}
        />
      </label>
    `;return Et`
    ${st&&Et`<${ee} type=${st.type} message=${st.message} />`}
    <div class="m-4 gap-4 grid grid-cols-1 lg:grid-cols-3">
      <${FirmwareStatus} title="Current firmware image" info=${$[0]}>
        <div class="flex flex-wrap gap-2">
          <${Button}
            title="Commit this firmware"
            onclick=${_}
            icon=${Icons.thumbUp}
            disabled=${$[0].status==3}
            cls="w-full"
          />
        </div>
      <//>
      <${FirmwareStatus} title="Previous firmware image" info=${$[1]}>
        <${Button}
          title="Rollback to this firmware"
          onclick=${oe}
          icon=${Icons.backward}
          disabled=${$[1].status==0}
          cls="w-full"
        />
      <//>
      <div class="bg-white xm-4 divide-y border rounded flex flex-col">
        <div
          class="font-light uppercase flex items-center text-gray-600 px-4 py-2"
        >
          Device control
        </div>
        <div class="px-4 py-3 flex flex-col gap-2 grow">
          <${Zt}
            title="Upload new firmware (.bin or .hex)"
            onupload=${Yt}
          />
          <div class="grow"></div>
          <${Button}
            title="Reboot device"
            onclick=${vt}
            icon=${Icons.refresh}
            cls="w-full"
          />
          <${Button}
            title="Erase last sector"
            onclick=${Xt}
            icon=${Icons.doc}
            cls="w-full hidden"
          />
        </div>
      </div>
    </div>

    <div class="m-4 gap-4 grid grid-cols-1 lg:grid-cols-2">
      <div class="bg-white border shadow-lg">
        <${DeveloperNote}>
          <div class="my-2">
            Firmware status and other information is stored in the last sector
            of flash
          </div>
          <div class="my-2">
            Firmware status can be FIRST_BOOT, UNCOMMITTED or COMMITTED. If no
            information is available, it is UNAVAILABLE.
          </div>
          <div class="my-2">
            This GUI loads a firmware file and sends it chunk by chunk to the
            device, passing current chunk offset, total firmware size and a file
            name: api/firmware/upload?offset=X&total=Y&name=Z
          </div>
        <//>
      </div>

      <div class="bg-white border shadow-lg">
        <${DeveloperNote}>
          <div>
            Firmware update mechanism defines 3 API functions that the target
            device must implement: mg_ota_begin(), mg_ota_write() and
            mg_ota_end()
          </div>
          <div class="my-2">
            RESTful API handlers use ota_xxx() API to save firmware to flash.
            The last 0-length chunk triggers ota_end() which performs firmware
            update using saved firmware image
          </div>
          <div class="my-2">
            <a
              class="link text-blue-600 underline"
              href="https://mongoose.ws/webinars/"
              >Join our free webinar</a
            >
            to get detailed explanations about possible firmware updates
            strategies and implementation demo
          </div>
        <//>
      </div>
    </div>
  `}const pageSetting=({value:$,setfn:k,type:st,options:ct,error:dt,..._})=>{let vt;const oe=`w-full px-3 py-2 border rounded-md ${dt?"border-red-500":"border-gray-300"}`;switch(st){case"text":case"password":case"number":vt=Et`
        <input
          type=${st}
          value=${$}
          onInput=${Xt=>k(Xt.target.value)}
          class=${oe}
          ...${_}
        />
      `;break;case"select":vt=Et`
        <select
          value=${$}
          onChange=${Xt=>k(Xt.target.value)}
          class=${oe}
          ...${_}
        >
          ${ct.map(([Xt,Yt])=>Et` <option value=${Xt}>${Yt}</option> `)}
        </select>
      `;break;case"switch":vt=Et`
        <label class="switch">
          <input
            type="checkbox"
            checked=${$}
            onChange=${Xt=>k(Xt.target.checked)}
            ...${_}
          />
          <span class="slider round"></span>
        </label>
      `;break;default:vt=Et`<span>Неподдерживаемый тип: ${st}</span>`}return Et`
    <div>
      ${vt}
      ${dt&&Et`<div class="text-red-500 text-sm mt-1">${dt}</div>`}
    </div>
  `};function Toast({message:$,type:k,onClose:st}){return lt(()=>{const ct=setTimeout(()=>{st()},3e3);return()=>clearTimeout(ct)},[]),Et`
    <div
      class=${`fixed bottom-4 right-4 p-4 rounded-md ${k==="success"?"bg-green-500":"bg-red-500"} text-white`}
    >
      ${$}
    </div>
  `}const App=function({}){const[$,k]=ut(!0),[st,ct]=ut("/"),[dt,_]=ut(""),[vt,oe]=ut(!0),[Xt,Yt]=ut(null),ee=()=>fetch("api/logout").then(re=>_("")),Zt=re=>re.ok?re.json().then(ae=>_(ae.user)).finally(ae=>k(!1)):k(!1)&&_(null);return lt(()=>fetch("api/login").then(Zt),[]),window.pollIntervalMs=window.pollIntervalMs||2e3,lt(()=>{const re=()=>{window.pollIntervalMs=document.hidden?3e4:2e3};return document.addEventListener("visibilitychange",re),()=>document.removeEventListener("visibilitychange",re)},[]),lt(()=>{if(dt)return registerPoll("common","/api/state/common",re=>{re&&Yt(re)}),()=>unregisterPoll("common")},[dt]),$?"":dt?Et`<${StateContext.Provider} value=${Xt}>
   <div class="min-h-screen bg-slate-100" id="mains">
    <${Sidebar} url=${st} show=${vt} />
    <${Header}
      logout=${ee}
      user=${dt}
      showSidebar=${vt}
      setShowSidebar=${oe}
    />
    <div
      class="${vt&&"pl-72"} transition-all duration-300 transform"
    >
      <${Qt}
        onChange=${re=>ct(re.url)}
        history=${History.createHashHistory()}
      >
        <${Main} default=${!0} />
        <${TabSelect} path="selects" />
        <${TabSwitch} path="switch" />
        <${TabButton} path="button" />
        <${TabEncoder} path="encoder" />
        <${TabCron} path="cron" />
        <${TabPid} path="pid" />
        <${TabOneWire} path="1wire" />
        <${TabSecurity} path="Security" />
        <${Settings} path="settings" />
        <${FirmwareUpdate} path="update" />
      <//>
    <//>
   <//>
  <//>`:Et`<${Login}
      loginFn=${Zt}
      logoIcon=${Logo}
      title="Device Dashboard Login"
      tipText="To login, use: admin/admin, user1/user1, user2/user2"
    />`};window.onload=()=>O(y(App),document.body);
