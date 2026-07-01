(function(){const k=document.createElement("link").relList;if(k&&k.supports&&k.supports("modulepreload"))return;for(const dt of document.querySelectorAll('link[rel="modulepreload"]'))ct(dt);new MutationObserver(dt=>{for(const _ of dt)if(_.type==="childList")for(const mt of _.addedNodes)mt.tagName==="LINK"&&mt.rel==="modulepreload"&&ct(mt)}).observe(document,{childList:!0,subtree:!0});function st(dt){const _={};return dt.integrity&&(_.integrity=dt.integrity),dt.referrerPolicy&&(_.referrerPolicy=dt.referrerPolicy),dt.crossOrigin==="use-credentials"?_.credentials="include":dt.crossOrigin==="anonymous"?_.credentials="omit":_.credentials="same-origin",_}function ct(dt){if(dt.ep)return;dt.ep=!0;const _=st(dt);fetch(dt.href,_)}})();const _registered=new Map;let _active=!1,_timer=null,_keys=[],_idx=0;const MAX_FAILS=3,BASE_BACKOFF=2e3,POLL_INTERVAL=1e3,FETCH_TIMEOUT=5e3,MAX_QUEUE=8;function registerPoll($,k,st,ct={}){if(_keys.length>=MAX_QUEUE&&!_registered.has($))for(let dt=0;dt<_keys.length;dt++){const _=_keys[dt];if(_!=="common"){_registered.delete(_),_keys.splice(dt,1),_idx>_keys.length&&(_idx=0);break}}if(_registered.set($,{url:k,callback:st,etag:null,oneShot:ct.oneShot||!1,failCount:0,backoffMs:0}),_keys=Array.from(_registered.keys()),ct.immediate&&(_idx=_keys.indexOf($),!_active)){_clearTimer(),_timer=setTimeout(_tick,0);return}_timer||_schedule()}function unregisterPoll($){const k=_registered.get($);k&&(k.callback=function(){}),_registered.delete($),_keys=Array.from(_registered.keys()),_keys.length===0&&_clearTimer()}function _clearTimer(){clearTimeout(_timer),_timer=null}function _schedule($){_clearTimer(),_timer=setTimeout(_tick,$!==void 0?$:POLL_INTERVAL)}async function _tick(){if(_active){_schedule();return}if(_keys.length===0){_clearTimer();return}_active=!0,_idx>=_keys.length&&(_idx=0);const $=_keys[_idx],k=_registered.get($);if(k){const dt=new AbortController,_=setTimeout(function(){dt.abort()},FETCH_TIMEOUT);try{const mt={};k.etag&&(mt["If-None-Match"]=k.etag);const ee=await fetch(k.url,{signal:dt.signal,cache:"no-store",headers:mt});clearTimeout(_);const Xt=ee.headers.get("ETag");if(Xt&&(k.etag=Xt),ee.status!==304)if(ee.ok){const Yt=await ee.json();k.callback(Yt),k.failCount=0,k.backoffMs=0,k.oneShot&&(_registered.delete($),_keys=Array.from(_registered.keys()))}else(ee.status===401||ee.status===403)&&(k.callback({__session_expired:!0}),_registered.delete($),_keys=Array.from(_registered.keys()),_idx>=_keys.length&&_keys.length>0&&(_idx=0))}catch(mt){clearTimeout(_),mt.name!=="AbortError"&&console.warn("[pollQueue] "+$+": "+mt.message),k&&(k.etag=null,k.failCount=(k.failCount||0)+1,k.failCount>=MAX_FAILS?(console.warn("[pollQueue] "+$+": stopped after "+k.failCount+" consecutive errors"),_registered.delete($),_keys=Array.from(_registered.keys()),_idx>=_keys.length&&_keys.length>0&&(_idx=0)):k.backoffMs=Math.min((k.backoffMs||BASE_BACKOFF)*2,3e4))}}_active=!1;const st=_registered.get($),ct=st&&st.backoffMs>0?st.backoffMs:POLL_INTERVAL;_idx++,_idx>=_keys.length?(_idx=0,_keys.length>0?_schedule(ct):_clearTimer()):_keys.length>0?_schedule(0):_clearTimer()}var t,n,e,r,o,u,i,l,c,a,s,f={},p=[],h=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,d=Array.isArray;function v($,k){for(var st in k)$[st]=k[st];return $}function m($){var k=$.parentNode;k&&k.removeChild($)}function y($,k,st){var ct,dt,_,mt={};for(_ in k)_=="key"?ct=k[_]:_=="ref"?dt=k[_]:mt[_]=k[_];if(arguments.length>2&&(mt.children=arguments.length>3?t.call(arguments,2):st),typeof $=="function"&&$.defaultProps!=null)for(_ in $.defaultProps)mt[_]===void 0&&(mt[_]=$.defaultProps[_]);return g($,mt,ct,dt,null)}function g($,k,st,ct,dt){var _={type:$,props:k,key:st,ref:ct,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:dt??++e,__i:-1,__u:0};return dt==null&&n.vnode!=null&&n.vnode(_),_}function b($){return $.children}function C($,k){this.props=$,this.context=k}function x($,k){if(k==null)return $.__?x($.__,$.__i+1):null;for(var st;k<$.__k.length;k++)if((st=$.__k[k])!=null&&st.__e!=null)return st.__e;return typeof $.type=="function"?x($):null}function w($){var k,st;if(($=$.__)!=null&&$.__c!=null){for($.__e=$.__c.base=null,k=0;k<$.__k.length;k++)if((st=$.__k[k])!=null&&st.__e!=null){$.__e=$.__c.base=st.__e;break}return w($)}}function P($){(!$.__d&&($.__d=!0)&&r.push($)&&!U.__r++||o!==n.debounceRendering)&&((o=n.debounceRendering)||u)(U)}function U(){var $,k,st,ct,dt,_,mt,ee;for(r.sort(i);$=r.shift();)$.__d&&(k=r.length,ct=void 0,_=(dt=(st=$).__v).__e,mt=[],ee=[],st.__P&&((ct=v({},dt)).__v=dt.__v+1,n.vnode&&n.vnode(ct),M(st.__P,ct,dt,st.__n,st.__P.namespaceURI,32&dt.__u?[_]:null,mt,_??x(dt),!!(32&dt.__u),ee),ct.__v=dt.__v,ct.__.__k[ct.__i]=ct,L(mt,ct,ee),ct.__e!=_&&w(ct)),r.length>k&&r.sort(i));U.__r=0}function H($,k,st,ct,dt,_,mt,ee,Xt,Yt,ne){var Zt,le,ie,ce,ge,ye=ct&&ct.__k||p,de=k.length;for(st.__d=Xt,E(st,k,ye),Xt=st.__d,Zt=0;Zt<de;Zt++)(ie=st.__k[Zt])!=null&&typeof ie!="boolean"&&typeof ie!="function"&&(le=ie.__i===-1?f:ye[ie.__i]||f,ie.__i=Zt,M($,ie,le,dt,_,mt,ee,Xt,Yt,ne),ce=ie.__e,ie.ref&&le.ref!=ie.ref&&(le.ref&&F(le.ref,null,ie),ne.push(ie.ref,ie.__c||ce,ie)),ge==null&&ce!=null&&(ge=ce),65536&ie.__u||le.__k===ie.__k?(Xt&&!Xt.isConnected&&(Xt=x(le)),Xt=S(ie,Xt,$)):typeof ie.type=="function"&&ie.__d!==void 0?Xt=ie.__d:ce&&(Xt=ce.nextSibling),ie.__d=void 0,ie.__u&=-196609);st.__d=Xt,st.__e=ge}function E($,k,st){var ct,dt,_,mt,ee,Xt=k.length,Yt=st.length,ne=Yt,Zt=0;for($.__k=[],ct=0;ct<Xt;ct++)mt=ct+Zt,(dt=$.__k[ct]=(dt=k[ct])==null||typeof dt=="boolean"||typeof dt=="function"?null:typeof dt=="string"||typeof dt=="number"||typeof dt=="bigint"||dt.constructor==String?g(null,dt,null,null,null):d(dt)?g(b,{children:dt},null,null,null):dt.constructor===void 0&&dt.__b>0?g(dt.type,dt.props,dt.key,dt.ref?dt.ref:null,dt.__v):dt)!=null?(dt.__=$,dt.__b=$.__b+1,ee=D(dt,st,mt,ne),dt.__i=ee,_=null,ee!==-1&&(ne--,(_=st[ee])&&(_.__u|=131072)),_==null||_.__v===null?(ee==-1&&Zt--,typeof dt.type!="function"&&(dt.__u|=65536)):ee!==mt&&(ee===mt+1?Zt++:ee>mt?ne>Xt-mt?Zt+=ee-mt:Zt--:ee<mt?ee==mt-1&&(Zt=ee-mt):Zt=0,ee!==ct+Zt&&(dt.__u|=65536))):(_=st[mt])&&_.key==null&&_.__e&&(131072&_.__u)==0&&(_.__e==$.__d&&($.__d=x(_)),I(_,_,!1),st[mt]=null,ne--);if(ne)for(ct=0;ct<Yt;ct++)(_=st[ct])!=null&&(131072&_.__u)==0&&(_.__e==$.__d&&($.__d=x(_)),I(_,_))}function S($,k,st){var ct,dt;if(typeof $.type=="function"){for(ct=$.__k,dt=0;ct&&dt<ct.length;dt++)ct[dt]&&(ct[dt].__=$,k=S(ct[dt],k,st));return k}$.__e!=k&&(st.insertBefore($.__e,k||null),k=$.__e);do k=k&&k.nextSibling;while(k!=null&&k.nodeType===8);return k}function A($,k){return k=k||[],$==null||typeof $=="boolean"||(d($)?$.some((function(st){A(st,k)})):k.push($)),k}function D($,k,st,ct){var dt=$.key,_=$.type,mt=st-1,ee=st+1,Xt=k[st];if(Xt===null||Xt&&dt==Xt.key&&_===Xt.type&&(131072&Xt.__u)==0)return st;if(ct>(Xt!=null&&(131072&Xt.__u)==0?1:0))for(;mt>=0||ee<k.length;){if(mt>=0){if((Xt=k[mt])&&(131072&Xt.__u)==0&&dt==Xt.key&&_===Xt.type)return mt;mt--}if(ee<k.length){if((Xt=k[ee])&&(131072&Xt.__u)==0&&dt==Xt.key&&_===Xt.type)return ee;ee++}}return-1}function N($,k,st){k[0]==="-"?$.setProperty(k,st??""):$[k]=st==null?"":typeof st!="number"||h.test(k)?st:st+"px"}function R($,k,st,ct,dt){var _;t:if(k==="style")if(typeof st=="string")$.style.cssText=st;else{if(typeof ct=="string"&&($.style.cssText=ct=""),ct)for(k in ct)st&&k in st||N($.style,k,"");if(st)for(k in st)ct&&st[k]===ct[k]||N($.style,k,st[k])}else if(k[0]==="o"&&k[1]==="n")_=k!==(k=k.replace(/(PointerCapture)$|Capture$/i,"$1")),k=k.toLowerCase()in $||k==="onFocusOut"||k==="onFocusIn"?k.toLowerCase().slice(2):k.slice(2),$.l||($.l={}),$.l[k+_]=st,st?ct?st.u=ct.u:(st.u=l,$.addEventListener(k,_?a:c,_)):$.removeEventListener(k,_?a:c,_);else{if(dt=="http://www.w3.org/2000/svg")k=k.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(k!="width"&&k!="height"&&k!="href"&&k!="list"&&k!="form"&&k!="tabIndex"&&k!="download"&&k!="rowSpan"&&k!="colSpan"&&k!="role"&&k in $)try{$[k]=st??"";break t}catch{}typeof st=="function"||(st==null||st===!1&&k[4]!=="-"?$.removeAttribute(k):$.setAttribute(k,st))}}function T($){return function(k){if(this.l){var st=this.l[k.type+$];if(k.t==null)k.t=l++;else if(k.t<st.u)return;return st(n.event?n.event(k):k)}}}function M($,k,st,ct,dt,_,mt,ee,Xt,Yt){var ne,Zt,le,ie,ce,ge,ye,de,xe,be,_e,Te,$e,Se,Oe,ae=k.type;if(k.constructor!==void 0)return null;128&st.__u&&(Xt=!!(32&st.__u),_=[ee=k.__e=st.__e]),(ne=n.__b)&&ne(k);t:if(typeof ae=="function")try{if(de=k.props,xe=(ne=ae.contextType)&&ct[ne.__c],be=ne?xe?xe.props.value:ne.__:ct,st.__c?ye=(Zt=k.__c=st.__c).__=Zt.__E:("prototype"in ae&&ae.prototype.render?k.__c=Zt=new ae(de,be):(k.__c=Zt=new C(de,be),Zt.constructor=ae,Zt.render=V),xe&&xe.sub(Zt),Zt.props=de,Zt.state||(Zt.state={}),Zt.context=be,Zt.__n=ct,le=Zt.__d=!0,Zt.__h=[],Zt._sb=[]),Zt.__s==null&&(Zt.__s=Zt.state),ae.getDerivedStateFromProps!=null&&(Zt.__s==Zt.state&&(Zt.__s=v({},Zt.__s)),v(Zt.__s,ae.getDerivedStateFromProps(de,Zt.__s))),ie=Zt.props,ce=Zt.state,Zt.__v=k,le)ae.getDerivedStateFromProps==null&&Zt.componentWillMount!=null&&Zt.componentWillMount(),Zt.componentDidMount!=null&&Zt.__h.push(Zt.componentDidMount);else{if(ae.getDerivedStateFromProps==null&&de!==ie&&Zt.componentWillReceiveProps!=null&&Zt.componentWillReceiveProps(de,be),!Zt.__e&&(Zt.shouldComponentUpdate!=null&&Zt.shouldComponentUpdate(de,Zt.__s,be)===!1||k.__v===st.__v)){for(k.__v!==st.__v&&(Zt.props=de,Zt.state=Zt.__s,Zt.__d=!1),k.__e=st.__e,k.__k=st.__k,k.__k.forEach((function(ve){ve&&(ve.__=k)})),_e=0;_e<Zt._sb.length;_e++)Zt.__h.push(Zt._sb[_e]);Zt._sb=[],Zt.__h.length&&mt.push(Zt);break t}Zt.componentWillUpdate!=null&&Zt.componentWillUpdate(de,Zt.__s,be),Zt.componentDidUpdate!=null&&Zt.__h.push((function(){Zt.componentDidUpdate(ie,ce,ge)}))}if(Zt.context=be,Zt.props=de,Zt.__P=$,Zt.__e=!1,Te=n.__r,$e=0,"prototype"in ae&&ae.prototype.render){for(Zt.state=Zt.__s,Zt.__d=!1,Te&&Te(k),ne=Zt.render(Zt.props,Zt.state,Zt.context),Se=0;Se<Zt._sb.length;Se++)Zt.__h.push(Zt._sb[Se]);Zt._sb=[]}else do Zt.__d=!1,Te&&Te(k),ne=Zt.render(Zt.props,Zt.state,Zt.context),Zt.state=Zt.__s;while(Zt.__d&&++$e<25);Zt.state=Zt.__s,Zt.getChildContext!=null&&(ct=v(v({},ct),Zt.getChildContext())),le||Zt.getSnapshotBeforeUpdate==null||(ge=Zt.getSnapshotBeforeUpdate(ie,ce)),H($,d(Oe=ne!=null&&ne.type===b&&ne.key==null?ne.props.children:ne)?Oe:[Oe],k,st,ct,dt,_,mt,ee,Xt,Yt),Zt.base=k.__e,k.__u&=-161,Zt.__h.length&&mt.push(Zt),ye&&(Zt.__E=Zt.__=null)}catch(ve){k.__v=null,Xt||_!=null?(k.__e=ee,k.__u|=Xt?160:32,_[_.indexOf(ee)]=null):(k.__e=st.__e,k.__k=st.__k),n.__e(ve,k,st)}else _==null&&k.__v===st.__v?(k.__k=st.__k,k.__e=st.__e):k.__e=W(st.__e,k,st,ct,dt,_,mt,Xt,Yt);(ne=n.diffed)&&ne(k)}function L($,k,st){k.__d=void 0;for(var ct=0;ct<st.length;ct++)F(st[ct],st[++ct],st[++ct]);n.__c&&n.__c(k,$),$.some((function(dt){try{$=dt.__h,dt.__h=[],$.some((function(_){_.call(dt)}))}catch(_){n.__e(_,dt.__v)}}))}function W($,k,st,ct,dt,_,mt,ee,Xt){var Yt,ne,Zt,le,ie,ce,ge,ye=st.props,de=k.props,xe=k.type;if(xe==="svg"?dt="http://www.w3.org/2000/svg":xe==="math"?dt="http://www.w3.org/1998/Math/MathML":dt||(dt="http://www.w3.org/1999/xhtml"),_!=null){for(Yt=0;Yt<_.length;Yt++)if((ie=_[Yt])&&"setAttribute"in ie==!!xe&&(xe?ie.localName===xe:ie.nodeType===3)){$=ie,_[Yt]=null;break}}if($==null){if(xe===null)return document.createTextNode(de);$=document.createElementNS(dt,xe,de.is&&de),_=null,ee=!1}if(xe===null)ye===de||ee&&$.data===de||($.data=de);else{if(_=_&&t.call($.childNodes),ye=st.props||f,!ee&&_!=null)for(ye={},Yt=0;Yt<$.attributes.length;Yt++)ye[(ie=$.attributes[Yt]).name]=ie.value;for(Yt in ye)if(ie=ye[Yt],Yt!="children"){if(Yt=="dangerouslySetInnerHTML")Zt=ie;else if(Yt!=="key"&&!(Yt in de)){if(Yt=="value"&&"defaultValue"in de||Yt=="checked"&&"defaultChecked"in de)continue;R($,Yt,null,ie,dt)}}for(Yt in de)ie=de[Yt],Yt=="children"?le=ie:Yt=="dangerouslySetInnerHTML"?ne=ie:Yt=="value"?ce=ie:Yt=="checked"?ge=ie:Yt==="key"||ee&&typeof ie!="function"||ye[Yt]===ie||R($,Yt,ie,ye[Yt],dt);if(ne)ee||Zt&&(ne.__html===Zt.__html||ne.__html===$.innerHTML)||($.innerHTML=ne.__html),k.__k=[];else if(Zt&&($.innerHTML=""),H($,d(le)?le:[le],k,st,ct,xe==="foreignObject"?"http://www.w3.org/1999/xhtml":dt,_,mt,_?_[0]:st.__k&&x(st,0),ee,Xt),_!=null)for(Yt=_.length;Yt--;)_[Yt]!=null&&m(_[Yt]);ee||(Yt="value",ce!==void 0&&(ce!==$[Yt]||xe==="progress"&&!ce||xe==="option"&&ce!==ye[Yt])&&R($,Yt,ce,ye[Yt],dt),Yt="checked",ge!==void 0&&ge!==$[Yt]&&R($,Yt,ge,ye[Yt],dt))}return $}function F($,k,st){try{typeof $=="function"?$(k):$.current=k}catch(ct){n.__e(ct,st)}}function I($,k,st){var ct,dt;if(n.unmount&&n.unmount($),(ct=$.ref)&&(ct.current&&ct.current!==$.__e||F(ct,null,k)),(ct=$.__c)!=null){if(ct.componentWillUnmount)try{ct.componentWillUnmount()}catch(_){n.__e(_,k)}ct.base=ct.__P=null}if(ct=$.__k)for(dt=0;dt<ct.length;dt++)ct[dt]&&I(ct[dt],k,st||typeof $.type!="function");st||$.__e==null||m($.__e),$.__c=$.__=$.__e=$.__d=void 0}function V($,k,st){return this.constructor($,st)}function O($,k,st){var ct,dt,_,mt;n.__&&n.__($,k),dt=(ct=!1)?null:k.__k,_=[],mt=[],M(k,$=k.__k=y(b,null,[$]),dt||f,f,k.namespaceURI,dt?null:k.firstChild?t.call(k.childNodes):null,_,dt?dt.__e:k.firstChild,ct,mt),L(_,$,mt)}function j($,k,st){var ct,dt,_,mt,ee=v({},$.props);for(_ in $.type&&$.type.defaultProps&&(mt=$.type.defaultProps),k)_=="key"?ct=k[_]:_=="ref"?dt=k[_]:ee[_]=k[_]===void 0&&mt!==void 0?mt[_]:k[_];return arguments.length>2&&(ee.children=arguments.length>3?t.call(arguments,2):st),g($.type,ee,ct||$.key,dt||$.ref,null)}function q($,k){var st={__c:k="__cC"+s++,__:$,Consumer:function(ct,dt){return ct.children(dt)},Provider:function(ct){var dt,_;return this.getChildContext||(dt=[],(_={})[k]=this,this.getChildContext=function(){return _},this.shouldComponentUpdate=function(mt){this.props.value!==mt.value&&dt.some((function(ee){ee.__e=!0,P(ee)}))},this.sub=function(mt){dt.push(mt);var ee=mt.componentWillUnmount;mt.componentWillUnmount=function(){dt.splice(dt.indexOf(mt),1),ee&&ee.call(mt)}}),ct.children}};return st.Provider.__=st.Consumer.contextType=st}t=p.slice,n={__e:function($,k,st,ct){for(var dt,_,mt;k=k.__;)if((dt=k.__c)&&!dt.__)try{if((_=dt.constructor)&&_.getDerivedStateFromError!=null&&(dt.setState(_.getDerivedStateFromError($)),mt=dt.__d),dt.componentDidCatch!=null&&(dt.componentDidCatch($,ct||{}),mt=dt.__d),mt)return dt.__E=dt}catch(ee){$=ee}throw $}},e=0,C.prototype.setState=function($,k){var st;st=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=v({},this.state),typeof $=="function"&&($=$(v({},st),this.props)),$&&v(st,$),$!=null&&this.__v&&(k&&this._sb.push(k),P(this))},C.prototype.forceUpdate=function($){this.__v&&(this.__e=!0,$&&this.__h.push($),P(this))},C.prototype.render=b,r=[],u=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=function($,k){return $.__v.__b-k.__v.__b},U.__r=0,l=0,c=T(!1),a=T(!0),s=0;var B,K,z,G,J=0,Q=[],X=[],Y=n,Z=Y.__b,tt=Y.__r,nt=Y.diffed,et=Y.__c,_t=Y.unmount,rt=Y.__;function ot($,k){Y.__h&&Y.__h(K,$,J||k),J=0;var st=K.__H||(K.__H={__:[],__h:[]});return $>=st.__.length&&st.__.push({__V:X}),st.__[$]}function ut($){return J=1,it(wt,$)}function it($,k,st){var ct=ot(B++,2);if(ct.t=$,!ct.__c&&(ct.__=[wt(void 0,k),function(ee){var Xt=ct.__N?ct.__N[0]:ct.__[0],Yt=ct.t(Xt,ee);Xt!==Yt&&(ct.__N=[Yt,ct.__[1]],ct.__c.setState({}))}],ct.__c=K,!K.u)){var dt=function(ee,Xt,Yt){if(!ct.__c.__H)return!0;var ne=ct.__c.__H.__.filter((function(le){return!!le.__c}));if(ne.every((function(le){return!le.__N})))return!_||_.call(this,ee,Xt,Yt);var Zt=!1;return ne.forEach((function(le){if(le.__N){var ie=le.__[0];le.__=le.__N,le.__N=void 0,ie!==le.__[0]&&(Zt=!0)}})),!(!Zt&&ct.__c.props===ee)&&(!_||_.call(this,ee,Xt,Yt))};K.u=!0;var _=K.shouldComponentUpdate,mt=K.componentWillUpdate;K.componentWillUpdate=function(ee,Xt,Yt){if(this.__e){var ne=_;_=void 0,dt(ee,Xt,Yt),_=ne}mt&&mt.call(this,ee,Xt,Yt)},K.shouldComponentUpdate=dt}return ct.__N||ct.__}function lt($,k){var st=ot(B++,3);!Y.__s&&xt(st.__H,k)&&(st.__=$,st.i=k,K.__H.__h.push(st))}function at($){return J=5,ft((function(){return{current:$}}),[])}function ft($,k){var st=ot(B++,7);return xt(st.__H,k)?(st.__V=$(),st.i=k,st.__h=$,st.__V):st.__}function ht($){var k=K.context[$.__c],st=ot(B++,9);return st.c=$,k?(st.__==null&&(st.__=!0,k.sub(K)),k.props.value):$.__}function yt(){for(var $;$=Q.shift();)if($.__P&&$.__H)try{$.__H.__h.forEach(bt),$.__H.__h.forEach(Ct),$.__H.__h=[]}catch(k){$.__H.__h=[],Y.__e(k,$.__v)}}Y.__b=function($){K=null,Z&&Z($)},Y.__=function($,k){$&&k.__k&&k.__k.__m&&($.__m=k.__k.__m),rt&&rt($,k)},Y.__r=function($){tt&&tt($),B=0;var k=(K=$.__c).__H;k&&(z===K?(k.__h=[],K.__h=[],k.__.forEach((function(st){st.__N&&(st.__=st.__N),st.__V=X,st.__N=st.i=void 0}))):(k.__h.forEach(bt),k.__h.forEach(Ct),k.__h=[],B=0)),z=K},Y.diffed=function($){nt&&nt($);var k=$.__c;k&&k.__H&&(k.__H.__h.length&&(Q.push(k)!==1&&G===Y.requestAnimationFrame||((G=Y.requestAnimationFrame)||kt)(yt)),k.__H.__.forEach((function(st){st.i&&(st.__H=st.i),st.__V!==X&&(st.__=st.__V),st.i=void 0,st.__V=X}))),z=K=null},Y.__c=function($,k){k.some((function(st){try{st.__h.forEach(bt),st.__h=st.__h.filter((function(ct){return!ct.__||Ct(ct)}))}catch(ct){k.some((function(dt){dt.__h&&(dt.__h=[])})),k=[],Y.__e(ct,st.__v)}})),et&&et($,k)},Y.unmount=function($){_t&&_t($);var k,st=$.__c;st&&st.__H&&(st.__H.__.forEach((function(ct){try{bt(ct)}catch(dt){k=dt}})),st.__H=void 0,k&&Y.__e(k,st.__v))};var gt=typeof requestAnimationFrame=="function";function kt($){var k,st=function(){clearTimeout(ct),gt&&cancelAnimationFrame(k),setTimeout($)},ct=setTimeout(st,100);gt&&(k=requestAnimationFrame(st))}function bt($){var k=K,st=$.__c;typeof st=="function"&&($.__c=void 0,st()),K=k}function Ct($){var k=K;$.__c=$.__(),K=k}function xt($,k){return!$||$.length!==k.length||k.some((function(st,ct){return st!==$[ct]}))}function wt($,k){return typeof k=="function"?k($):k}var Pt=function($,k,st,ct){var dt;k[0]=0;for(var _=1;_<k.length;_++){var mt=k[_++],ee=k[_]?(k[0]|=mt?1:2,st[k[_++]]):k[++_];mt===3?ct[0]=ee:mt===4?ct[1]=Object.assign(ct[1]||{},ee):mt===5?(ct[1]=ct[1]||{})[k[++_]]=ee:mt===6?ct[1][k[++_]]+=ee+"":mt?(dt=$.apply(ee,Pt($,ee,st,["",null])),ct.push(dt),ee[0]?k[0]|=2:(k[_-2]=0,k[_]=dt)):ct.push(ee)}return ct},Ut=new Map;function Ht($){var k=Ut.get(this);return k||(k=new Map,Ut.set(this,k)),(k=Pt(this,k.get($)||(k.set($,k=(function(st){for(var ct,dt,_=1,mt="",ee="",Xt=[0],Yt=function(le){_===1&&(le||(mt=mt.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?Xt.push(0,le,mt):_===3&&(le||mt)?(Xt.push(3,le,mt),_=2):_===2&&mt==="..."&&le?Xt.push(4,le,0):_===2&&mt&&!le?Xt.push(5,0,!0,mt):_>=5&&((mt||!le&&_===5)&&(Xt.push(_,0,mt,dt),_=6),le&&(Xt.push(_,le,0,dt),_=6)),mt=""},ne=0;ne<st.length;ne++){ne&&(_===1&&Yt(),Yt(ne));for(var Zt=0;Zt<st[ne].length;Zt++)ct=st[ne][Zt],_===1?ct==="<"?(Yt(),Xt=[Xt],_=3):mt+=ct:_===4?mt==="--"&&ct===">"?(_=1,mt=""):mt=ct+mt[0]:ee?ct===ee?ee="":mt+=ct:ct==='"'||ct==="'"?ee=ct:ct===">"?(Yt(),_=1):_&&(ct==="="?(_=5,dt=mt,mt=""):ct==="/"&&(_<5||st[ne][Zt+1]===">")?(Yt(),_===3&&(Xt=Xt[0]),_=Xt,(Xt=Xt[0]).push(2,0,_),_=0):ct===" "||ct==="	"||ct===`
`||ct==="\r"?(Yt(),_=2):mt+=ct),_===3&&mt==="!--"&&(_=4,Xt=Xt[0])}return Yt(),Xt})($)),k),arguments,[])).length>1?k:k[0]}var Et=Ht.bind(y),St={};function At($,k){for(var st in k)$[st]=k[st];return $}function Dt($,k,st){var ct,dt=/(?:\?([^#]*))?(#.*)?$/,_=$.match(dt),mt={};if(_&&_[1])for(var ee=_[1].split("&"),Xt=0;Xt<ee.length;Xt++){var Yt=ee[Xt].split("=");mt[decodeURIComponent(Yt[0])]=decodeURIComponent(Yt.slice(1).join("="))}$=Tt($.replace(dt,"")),k=Tt(k||"");for(var ne=Math.max($.length,k.length),Zt=0;Zt<ne;Zt++)if(k[Zt]&&k[Zt].charAt(0)===":"){var le=k[Zt].replace(/(^:|[+*?]+$)/g,""),ie=(k[Zt].match(/[+*?]+$/)||St)[0]||"",ce=~ie.indexOf("+"),ge=~ie.indexOf("*"),ye=$[Zt]||"";if(!ye&&!ge&&(ie.indexOf("?")<0||ce)){ct=!1;break}if(mt[le]=decodeURIComponent(ye),ce||ge){mt[le]=$.slice(Zt).map(decodeURIComponent).join("/");break}}else if(k[Zt]!==$[Zt]){ct=!1;break}return(st.default===!0||ct!==!1)&&mt}function Nt($,k){return $.rank<k.rank?1:$.rank>k.rank?-1:$.index-k.index}function Rt($,k){return $.index=k,$.rank=(function(st){return st.props.default?0:Tt(st.props.path).map(Mt).join("")})($),$.props}function Tt($){return $.replace(/(^\/+|\/+$)/g,"").split("/")}function Mt($){return $.charAt(0)==":"?1+"*+?".indexOf($.charAt($.length-1))||4:5}var Lt={},Wt=[],Ft=[],It=null,Vt={url:jt()},Ot=q(Vt);function jt(){var $;return""+(($=It&&It.location?It.location:It&&It.getCurrentLocation?It.getCurrentLocation():typeof location<"u"?location:Lt).pathname||"")+($.search||"")}function qt($,k){return k===void 0&&(k=!1),typeof $!="string"&&$.url&&(k=$.replace,$=$.url),(function(st){for(var ct=Wt.length;ct--;)if(Wt[ct].canRoute(st))return!0;return!1})($)&&(function(st,ct){ct===void 0&&(ct="push"),It&&It[ct]?It[ct](st):typeof history<"u"&&history[ct+"State"]&&history[ct+"State"](null,null,st)})($,k?"replace":"push"),Bt($)}function Bt($){for(var k=!1,st=0;st<Wt.length;st++)Wt[st].routeTo($)&&(k=!0);return k}function Kt($){if($&&$.getAttribute){var k=$.getAttribute("href"),st=$.getAttribute("target");if(k&&k.match(/^\//g)&&(!st||st.match(/^_?self$/i)))return qt(k)}}function zt($){return $.stopImmediatePropagation&&$.stopImmediatePropagation(),$.stopPropagation&&$.stopPropagation(),$.preventDefault(),!1}function Gt($){if(!($.ctrlKey||$.metaKey||$.altKey||$.shiftKey||$.button)){var k=$.target;do if(k.localName==="a"&&k.getAttribute("href")){if(k.hasAttribute("data-native")||k.hasAttribute("native"))return;if(Kt(k))return zt($)}while(k=k.parentNode)}}var Jt=!1;function Qt($){$.history&&(It=$.history),this.state={url:$.url||jt()}}At(Qt.prototype=new C,{shouldComponentUpdate:function($){return $.static!==!0||$.url!==this.props.url||$.onChange!==this.props.onChange},canRoute:function($){var k=A(this.props.children);return this.g(k,$)!==void 0},routeTo:function($){this.setState({url:$});var k=this.canRoute($);return this.p||this.forceUpdate(),k},componentWillMount:function(){this.p=!0},componentDidMount:function(){var $=this;Jt||(Jt=!0,It||addEventListener("popstate",(function(){Bt(jt())})),addEventListener("click",Gt)),Wt.push(this),It&&(this.u=It.listen((function(k){var st=k.location||k;$.routeTo(""+(st.pathname||"")+(st.search||""))}))),this.p=!1},componentWillUnmount:function(){typeof this.u=="function"&&this.u(),Wt.splice(Wt.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function($,k){$=$.filter(Rt).sort(Nt);for(var st=0;st<$.length;st++){var ct=$[st],dt=Dt(k,ct.props.path,ct.props);if(dt)return[ct,dt]}},render:function($,k){var st,ct,dt=$.onChange,_=k.url,mt=this.c,ee=this.g(A($.children),_);if(ee&&(ct=j(ee[0],At(At({url:_,matches:st=ee[1]},st),{key:void 0,ref:void 0}))),_!==(mt&&mt.url)){At(Vt,mt=this.c={url:_,previous:mt&&mt.url,current:ct,path:ct?ct.props.path:null,matches:st}),mt.router=this,mt.active=ct?[ct]:[];for(var Xt=Ft.length;Xt--;)Ft[Xt]({});typeof dt=="function"&&dt(mt)}return y(Ot.Provider,{value:mt},ct)}});const StateContext=q(null),switchIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='652.000000pt'%20height='956.000000pt'%20viewBox='0%200%20652.000000%20956.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,956.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M1150%209540%20c-386%20-6%20-408%20-8%20-475%20-29%20-147%20-48%20-255%20-115%20-368%20-226%20-93%20-91%20-145%20-159%20-191%20-250%20-74%20-146%20-77%20-163%20-87%20-455%20-10%20-318%20-14%20-7639%20-4%20-7725%2025%20-214%20107%20-394%20245%20-539%20115%20-121%20227%20-192%20408%20-260%20l72%20-28%202418%20-1%20c2586%20-2%202582%20-2%202716%2047%20254%2092%20492%20346%20573%20611%2017%2058%2018%20211%2018%204095%20l0%204035%20-23%2075%20c-61%20193%20-204%20388%20-368%20501%20-76%2052%20-226%20118%20-294%20129%20-36%206%20-229%2015%20-430%2020%20-398%2010%20-3557%2010%20-4210%200z%20m4610%20-328%20c164%20-59%20291%20-175%20374%20-339%20l36%20-73%200%20-4016%200%20-4016%20-45%20-88%20c-25%20-48%20-70%20-115%20-101%20-148%20-64%20-71%20-175%20-148%20-242%20-168%20-103%20-32%20-400%20-35%20-2687%20-32%20-2180%203%20-2282%204%20-2335%2022%20-204%2068%20-363%20240%20-417%20452%20-17%2065%20-18%20275%20-18%203979%200%203785%201%203912%2019%203980%2024%2091%2084%20207%20140%20271%2055%2062%20182%20152%20244%20171%2027%208%20121%2018%20222%2022%2096%205%201203%208%202460%207%20l2285%20-1%2065%20-23z'/%3e%3cpath%20d='M1434%208128%20l-45%20-41%203%20-3291%20c3%20-3127%204%20-3293%2021%20-3323%209%20-18%2029%20-41%2044%20-50%2026%20-17%20125%20-18%201799%20-18%201918%200%201808%20-3%201834%2054%207%2014%2016%2067%2021%20116%205%2050%209%20789%209%201644%20l0%201554%20249%20981%20c358%201405%20401%201581%20401%201626%200%2051%204%2046%20-414%20468%20l-321%20322%20-1778%200%20-1777%200%20-46%20-42z%20m3636%20-425%20l165%20-168%20-185%20-6%20c-102%20-4%20-770%20-7%20-1485%20-8%20l-1300%20-1%20-145%20148%20c-80%2081%20-156%20159%20-170%20175%20l-23%2027%201489%200%201490%200%20164%20-167z%20m-3078%20-356%20l31%20-38%20-147%20-583%20c-81%20-320%20-153%20-602%20-160%20-626%20-12%20-39%20-13%20-23%20-19%20185%20-9%20291%20-9%20823%200%201123%20l6%20233%20129%20-128%20c71%20-70%20143%20-145%20160%20-166z%20m2900%20-136%20c278%20-3%20510%20-9%20513%20-13%2010%20-10%203%20-40%20-305%20-1260%20l-280%20-1107%200%20-1565%200%20-1566%20-1565%200%20-1565%200%200%201521%200%201520%20310%201226%20c171%20675%20313%201229%20316%201232%2014%2014%201788%2022%202576%2012z'/%3e%3cpath%20d='M3765%206820%20c-61%20-25%20-87%20-94%20-185%20-473%20-80%20-315%20-120%20-493%20-120%20-540%200%20-77%2078%20-141%20163%20-134%2069%206%20101%2040%20131%20141%2057%20190%20197%20746%20212%20843%205%2032%201%2053%20-19%2096%20-22%2048%20-30%2057%20-64%2066%20-44%2013%20-90%2013%20-118%201z'/%3e%3cpath%20d='M3098%203406%20c-104%20-37%20-216%20-134%20-264%20-227%20-24%20-47%20-28%20-71%20-35%20-184%20-19%20-311%20-7%20-500%2037%20-586%2040%20-80%20113%20-151%20201%20-195%20l76%20-39%20151%200%20151%200%2068%2034%20c81%2041%20167%20128%20215%20218%20l32%2061%200%20302%200%20302%20-41%2078%20c-65%20127%20-156%20201%20-284%20235%20-73%2019%20-255%2019%20-307%201z%20m262%20-311%20c58%20-30%2064%20-57%2068%20-301%204%20-219%204%20-222%20-19%20-253%20-65%20-88%20-230%20-95%20-286%20-13%20-16%2024%20-18%2055%20-21%20273%20l-3%20246%2038%2030%20c21%2017%2045%2033%2053%2036%2025%2011%20137%20-1%20170%20-18z'/%3e%3c/g%3e%3c/svg%3e",buttonIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M790%201280%20l0%20-420%2065%200%2065%200%200%20420%200%20420%20-65%200%20-65%200%200%20-420z'/%3e%3cpath%20d='M489%201612%20c-228%20-114%20-386%20-309%20-451%20-557%20-29%20-110%20-29%20-297%200%20-406%2081%20-301%20308%20-530%20607%20-610%20112%20-30%20307%20-30%20420%200%20294%2077%20529%20312%20606%20606%2029%20110%2030%20307%201%20416%20-67%20251%20-245%20462%20-477%20565%20l-55%2024%200%20-74%200%20-74%2072%20-42%20c280%20-167%20411%20-508%20313%20-817%20-35%20-110%20-88%20-196%20-175%20-283%20-87%20-87%20-172%20-139%20-285%20-177%20-70%20-23%20-96%20-27%20-210%20-27%20-114%200%20-140%204%20-210%2027%20-293%2097%20-495%20372%20-495%20673%200%2070%2025%20193%2055%20266%2054%20133%20182%20279%20299%20339%20l66%2034%200%2078%20c0%2042%20-1%2077%20-2%2077%20-2%200%20-37%20-18%20-79%20-38z'/%3e%3c/g%3e%3c/svg%3e",timerIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M818%201670%20c-24%20-15%20-31%20-77%20-23%20-221%208%20-141%2015%20-159%2064%20-159%2050%200%2060%2024%2063%20150%20l3%20115%2030%20-3%20c172%20-19%20366%20-132%20472%20-275%2094%20-129%20133%20-236%20140%20-392%206%20-142%20-12%20-230%20-73%20-355%20-82%20-165%20-236%20-296%20-419%20-357%20-71%20-24%20-95%20-27%20-215%20-27%20-118%200%20-145%203%20-212%2026%20-123%2041%20-204%2092%20-298%20187%20-68%2068%20-94%20103%20-127%20171%20-61%20125%20-76%20203%20-71%20352%206%20153%2036%20243%20122%20371%2064%2095%2068%20127%2021%20149%20-39%2017%20-68%202%20-113%20-59%20-94%20-127%20-150%20-285%20-159%20-449%20-23%20-399%20236%20-749%20632%20-855%20111%20-30%20297%20-30%20410%200%20449%20119%20716%20562%20610%201011%20-23%2095%20-105%20254%20-173%20336%20-111%20131%20-276%20234%20-442%20274%20-89%2021%20-213%2026%20-242%2010z'/%3e%3cpath%20d='M452%201258%20c-7%20-7%20-12%20-17%20-12%20-23%200%20-21%20330%20-469%20358%20-487%2043%20-28%20106%20-23%20143%2010%2043%2038%2052%20113%2020%20154%20-20%2025%20-454%20342%20-484%20354%20-7%202%20-18%20-1%20-25%20-8z'/%3e%3c/g%3e%3c/svg%3e",owIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='110.000000pt'%20height='52.000000pt'%20viewBox='0%200%20110.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M171%20500%20c-50%20-12%20-83%20-41%20-111%20-96%20-22%20-43%20-25%20-62%20-24%20-149%200%20-141%2027%20-199%20109%20-236%2073%20-33%20180%20-16%20227%2037%2067%2076%2074%20284%2013%20376%20-39%2059%20-133%2089%20-214%2068z%20m119%20-65%20c50%20-26%2065%20-67%2065%20-180%200%20-146%20-32%20-195%20-128%20-195%20-40%200%20-54%205%20-77%2028%20-16%2016%20-34%2049%20-40%2073%20-16%2056%20-7%20186%2014%20227%2030%2057%20105%2078%20166%2047z'/%3e%3cpath%20d='M482%20483%20c3%20-10%2029%20-120%2058%20-245%20l54%20-228%2038%200%20c43%200%2035%20-20%2089%20215%2017%2077%2035%20146%2038%20152%204%207%2026%20-73%2051%20-178%20l44%20-190%2039%203%2040%203%2058%20240%20c32%20132%2058%20241%2059%20243%200%202%20-15%202%20-32%200%20l-32%20-3%20-43%20-180%20c-23%20-99%20-44%20-187%20-46%20-195%20-2%20-8%20-25%2074%20-51%20183%20l-48%20198%20-36%20-3%20-36%20-3%20-45%20-194%20c-25%20-106%20-47%20-188%20-49%20-181%20-3%207%20-23%2095%20-46%20194%20l-42%20181%20-33%203%20c-28%203%20-33%201%20-29%20-15z'/%3e%3c/g%3e%3c/svg%3e",encoderIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='34.000000pt'%20height='52.000000pt'%20viewBox='0%200%2034.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M30%20255%20l0%20-245%20150%200%20150%200%200%2030%200%2030%20-115%200%20-115%200%200%2085%200%2085%2095%200%2095%200%200%2030%200%2030%20-95%200%20-95%200%200%2070%200%2070%20115%200%20115%200%200%2030%200%2030%20-150%200%20-150%200%200%20-245z'/%3e%3c/g%3e%3c/svg%3e",Icons={switchIcon:$=>Et`
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
    </svg>`},tipColors={green:"bg-green-100 text-green-900 ring-green-300",yellow:"bg-yellow-100 text-yellow-900 ring-yellow-300"};function Button({title:$,onclick:k,disabled:st,cls:ct,icon:dt,ref:_,colors:mt,hovercolor:ee,disabledcolor:Xt}){const[Yt,ne]=ut(!1),Zt=function(le){const ie=k?k():null;ie&&typeof ie.catch=="function"&&(ne(!0),ie.catch(()=>!1).then(()=>ne(!1)))};return mt||(mt="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400"),Et` <button
    type="button"
    class="inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${mt} ${ct}"
    ref=${_}
    onclick=${Zt}
    disabled=${st||Yt}
  >
    ${$}
    <${Yt?Icons.refresh:dt} class="w-4 ${Yt?"animate-spin":""}" />
  <//>`}function Login({loginFn:$,logoIcon:k,title:st,tipText:ct}){const[dt,_]=ut(""),[mt,ee]=ut(""),Xt=function(Yt){const Zt={Authorization:"Basic "+btoa(dt+":"+mt)};return fetch("api/login",{headers:Zt}).then($).finally(le=>ee(""))};return Et`
    <div class="h-full flex items-center justify-center relative overflow-hidden z-0">
      <!-- Decorative background glow -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl w-96 p-8 relative z-10 flex flex-col items-center">
        <div class="mb-8 flex flex-col items-center justify-center gap-y-4">
          <div class="p-3 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-2xl shadow-inner">
            <${k} class="h-16 w-16 stroke-cyan-600 drop-shadow-sm" />
          </div>
          <h1 class="font-extrabold text-2xl text-slate-800 drop-shadow-sm tracking-tight text-center">${st||"Login"}<//>
        <//>

        <div class="w-full space-y-5">
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Username</label>
            <input
              type="text"
              autocomplete="current-user"
              required
              class="w-full bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all shadow-inner disabled:cursor-not-allowed disabled:opacity-50"
              oninput=${Yt=>_(Yt.target.value)}
              value=${dt}
            />
          <//>

          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Password</label>
            <input
              type="password"
              autocomplete="current-password"
              required
              class="w-full bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all shadow-inner disabled:cursor-not-allowed disabled:opacity-50"
              oninput=${Yt=>ee(Yt.target.value)}
              value=${mt}
              onkeydown=${Yt=>Yt.key==="Enter"&&Xt()}
            />
          <//>
        <//>

        <div class="mt-8 w-full">
          <${Button}
            title="Sign In"
            icon=${Icons.logout}
            onclick=${Xt}
            colors="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            cls="w-full py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex justify-center"
          />
        <//>

        ${ct?Et`<div class="mt-6 text-center text-slate-500 text-xs font-medium px-4">${ct}<//>`:""}
      <//>
    <//>
  `}function Colored({icon:$,text:k,colors:st}){return st||(st="bg-slate-100 text-slate-900"),Et` <span class="inline-flex items-center gap-1.5 py-0.5">
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
  <//>`}const ruLangswitch=["","ID - уникальный числовой идентификатор выключателя. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","Device connection - Здесь указаны пины одного или нескольких устройств, с которыми взаимодействует данный выключатель.",'INFO - Укажите название данного выключателя для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение обработчика состояния на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек и соединений выключателя."],ruLangselect=["","ID - уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type(s) of pin(s) - Выберите режим работы данного пина из предложенных вариантов."],rulangbutton=["","ID - уникальный числовой идентификатор кнопки. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","sclick - Выполняемая команда при одинарном клике кнопки.","dclick - Выполняемая команда при двойном клике кнопки.","lpress - Выполняемая команда при удержании кнопки.",'INFO - Укажите название данной кнопки для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение функции кнопки на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек кнопки."],ruencoder=["","ID - уникальный числовой идентификатор энкодера. Присваивается автоматически.","Pin - Уникальный номер пина.","Encoder A (ID) - Основной пин энкодера A (DT).","Encoder B (ID) - Дополнительный пин энкодера B (CLK).","PWM connection - Подключение ШИМ для управления яркостью (диммер).","Dimmer value (0-100) - Текущее значение диммера от 0 до 100.","Duty on restore - Восстановление значения скважности (яркости) при включении контроллера.","INFO - Укажите название данного энкодера для быстрой навигации.","On/Off - Включение или отключение обработчика энкодера.","Action - Кнопка Edit позволяет зайти в меню настроек энкодера.","PWM Frequency - Частота ШИМ управляемого устройства (в герцах).","Resolution (steps) - Максимальное количество шагов от 0 до 100% для ШИМ устройства."],rulangtimers=["","No - Уникальный числовой идентификатор задачи (cron). Присваивается автоматически.","Cron - Сконфигурируйте расписание (cron) для выполнения задачи.","Script - Какое действие (скрипт) должно выполниться в указанное в таймере время.",'Info - Дайте название выбранному таймеру для быстрой навигации, например "Полив газона". Не более 30-ти символов!',"On/Off - Вкл/Откл выполнение данной задачи.","Action - Кнопка Edit позволяет зайти в меню настроек задачи."],rulangsettings=["","Login - Введите имя пользователя для входа в систему. Используется при авторизации в веб-интерфейсе.","Password - Введите пароль для входа в систему. Рекомендуется использовать надёжный пароль.","Time zone UTC - Выберите свой часовой пояс. Влияет на отображение времени и расчёт восхода/заката.","IP address - Введите статический IP-адрес устройства. После перезагрузки STM32 будет доступен по этому адресу. Формат: 192.168.1.100","Subnet mask - Введите маску подсети. Определяет диапазон адресов вашей локальной сети. Формат: 255.255.255.0","Default gateway - Введите IP-адрес шлюза по умолчанию (обычно адрес вашего роутера). Формат: 192.168.1.1","Token - Секретный ключ для авторизации API-запросов. Используется в URL командах управления устройством. Пример: /api/Token/switch?id=1&onoff=1","Host - Введите IP-адрес или доменное имя MQTT-брокера. Пример: 192.168.1.50 или broker.hivemq.com","Port - Укажите порт MQTT-брокера. Стандартный порт: 1883 (без шифрования), 8883 (с TLS).","Client - Уникальный идентификатор клиента MQTT. Каждое устройство должно иметь свой уникальный Client ID.","User - Имя пользователя для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","Password - Пароль для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","TX topic - Исходящий топик MQTT. На этот топик устройство публикует свои данные и события. Пример: Swarm","RX topic - Входящий топик MQTT. С этого топика устройство получает команды управления. Пример: Swarm","HTTPS domain - Доменное имя для HTTPS-соединения. Необходим действующий SSL-сертификат для этого домена. Пример: zagotovka.ddns.net",'Private Key - Закрытый ключ SSL-сертификата в формате PEM. Начинается с "-----BEGIN EC PRIVATE KEY-----". Хранится в зашифрованном виде.','Public Key - Публичный сертификат SSL в формате PEM. Начинается с "-----BEGIN CERTIFICATE-----". Используется для HTTPS-соединения.',"Longitude - Долгота вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 37.618 (Москва)","Latitude - Широта вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 55.751 (Москва)","Sunrise - Время восхода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на восходе.","Sunset - Время захода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на закате.","Day Length - Продолжительность светового дня, рассчитывается автоматически на основе координат и текущей даты.","Next full moon - Дата и время следующего полнолуния, рассчитывается автоматически.","Date - Дата для автономного (offline) режима в формате дд.мм.гг. Используется когда нет доступа к NTP-серверу. Пример: 15.03.25","Time - Время для автономного (offline) режима в формате чч:мм:сс. Используется когда нет доступа к NTP-серверу. Пример: 14:30:00"],ruLangsecurity=["","RXD Pin - Пин приема данных (RX).","TXD Pin - Пин передачи данных (TX).","Phone Number - Номер телефона для отправки SMS и звонков.","Info - Дополнительная информация для быстрой навигации.","OnOff - Включение или отключение модуля SIM800L.","Action - Кнопка Edit позволяет зайти в меню настроек."],ruLangsecuritypins=["","ID - уникальный числовой идентификатор пина. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type of sensor - Тип подключенного сенсора (PIR, Normal open, Normal close).","Action - Действие, выполняемое при срабатывании сенсора.","Send SMS - Отправлять ли SMS при срабатывании сенсора (YES/NO).","INFO - Дополнительная информация для быстрой навигации.","On/Off - Включение или отключение охранного пина.","Edit Pin - Редактирование настроек охранного пина."],rulange1Wire=["","ID - Уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового пина, к которому подключена шина 1-Wire.","Selected sensor - Здесь вы выбираете подключённый к пину датчик температуры: DS18B20 или DHT22.","Count of sensors - Количество найденных 1-Wire температурных датчиков на данном пине.","On/Off - Функция включения или отключения опроса подключенных датчиков на данной шине.","Actions - Кнопка Edit для привязки конкретного датчика к этому соединению."],rulangpid=["","No - Уникальный числовой идентификатор, присваивается автоматически.",'PWM Pin - Выбранный вами PWM пин на странице "Select pin".',"Sel. sensor - Укажите один из двух типов (DS18B20/DHT22) температурного датчика.",'Dev. ser. number - Серийный номер выбранного DS18B20 датчика (со страницы "OneWire pin").',"Presets - Выберите пресет, максимально соответствующий нужным температурным и временным параметрам.","T set. - Задайте целевую температуру, которую должен поддерживать PID-контроллер.","T cur. - Текущая температура выбранного датчика.","Duty - Текущее значение PWM.",'Info - Название PID-контроллера для быстрой навигации (например: "Тёплый пол в детской").',"On/Off - Вкл/Откл данного PID-контроллера.","Action - Кнопка для входа в меню настроек PID-контроллера.","Auto tune - Автоматический подбор коэффициентов PID."],enLangswitch=["","ID - A unique numerical identifier of the switch. Assigned automatically","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","Device connection - Here will appear one or more devices/relays of pin(s) with which this switch interacts.",'INFO - Give a name of this switch for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the switch state handler on this pin.","Action - The Edit button allows you to access the switch settings menu."],enLangselect=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type(s) of pin(s) - Select the operating mode of this pin from the provided options."],enlangbutton=["","ID - A unique numerical identifier of the button. Assigned automatically.","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","sclick - Command to execute when the button is pressed once.","dclick - Command to execute when the button is pressed twice.","lpress - Command to execute when the button is long pressed.",'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the button function on this pin.","Action - The Edit button allows you to access the button settings menu."],enencoder=["","ID - A unique numerical identifier of the encoder. Assigned automatically.","PIN - The unique number of the pin.","Encoder A (ID) - Main pin of encoder A (DT).","Encoder B (ID) - Additional pin of encoder B (CLK).","PWM connection - PWM connection for brightness control (dimmer).","Dimmer value (0-100) - Current dimmer value from 0 to 100.","Duty on restore - Value of duty cycle (brightness) to restore when the controller is turned on.","INFO - Give a name to this encoder for quick navigation.","On/Off - Enable or disable the encoder handler.","Action - The Edit button allows you to access the encoder settings menu.","PWM Frequency - PWM frequency of the controlled device (in Hertz).","Resolution (steps) - Maximum number of steps from 0 to 100% for the PWM device."],enlangtimers=["","No - A unique numerical identifier of the task (cron). Assigned automatically.","Cron - Configure a schedule (cron) to perform the action.","Script - What action (script) must be performed at the time specified in the timer.",'Info - Give a name to the selected timer for quick navigation, e.g."Lawn Watering", "Backyard Light", etc. No more than 30 characters!',"On/Off - Enable or disable the execution of this task.","Action - The Edit button allows you to access the task settings menu."],enlangsettings=["","Login - Enter the username for logging into the system. Used for web interface authentication.","Password - Enter your password for the system. It is recommended to use a strong password.","Time zone UTC - Select your time zone. Affects time display and sunrise/sunset calculations.","IP address - Enter a static IP address for the device. After reboot, STM32 will be available at this address. Format: 192.168.1.100","Subnet mask - Enter the subnet mask. Defines the range of addresses in your local network. Format: 255.255.255.0","Default gateway - Enter the default gateway IP address (usually your router address). Format: 192.168.1.1","Token - Secret key for API request authorization. Used in device control URL commands. Example: /api/Token/switch?id=1&onoff=1","Host - Enter the IP address or domain name of the MQTT broker. Example: 192.168.1.50 or broker.hivemq.com","Port - Specify the MQTT broker port. Standard port: 1883 (no encryption), 8883 (with TLS).","Client - Unique MQTT client identifier. Each device must have its own unique Client ID.","User - Username for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","Password - Password for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","TX topic - Outgoing MQTT topic. The device publishes its data and events to this topic. Example: Swarm","RX topic - Incoming MQTT topic. The device receives control commands from this topic. Example: Swarm","HTTPS domain - Domain name for HTTPS connection. A valid SSL certificate for this domain is required. Example: zagotovka.ddns.net",'Private Key - SSL certificate private key in PEM format. Starts with "-----BEGIN EC PRIVATE KEY-----". Stored in encrypted form.','Public Key - SSL public certificate in PEM format. Starts with "-----BEGIN CERTIFICATE-----". Used for HTTPS connection.',"Longitude - Longitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 37.618 (Moscow)","Latitude - Latitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 55.751 (Moscow)","Sunrise - Sunrise time is calculated automatically based on your coordinates. The slider enables/disables the action at sunrise.","Sunset - Sunset time is calculated automatically based on your coordinates. The slider enables/disables the action at sunset.","Day Length - Duration of daylight, calculated automatically based on coordinates and current date.","Next full moon - Date and time of the next full moon, calculated automatically.","Date - Date for offline mode in dd.mm.yy format. Used when there is no access to the NTP server. Example: 15.03.25","Time - Time for offline mode in hh:mm:ss format. Used when there is no access to the NTP server. Example: 14:30:00"],enLangsecurity=["","RXD Pin - Receive Data Pin (RX).","TXD Pin - Transmit Data Pin (TX).","Phone Number - Phone number for SMS notifications and calls.","Info - Additional information for quick navigation.","OnOff - Enable or disable the SIM800L module.","Action - The Edit button allows you to access the settings menu."],enLangsecuritypins=["","ID - A unique numerical identifier of the pin. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type of sensor - Type of connected sensor (PIR, Normal open, Normal close).","Action - Action to perform when the sensor is triggered.","Send SMS - Whether to send SMS when the sensor is triggered (YES/NO).","INFO - Additional information for quick navigation.","On/Off - Enable or disable the security pin.","Edit Pin - The Edit button allows you to access the security pin settings."],enlange1Wire=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital pin to which the 1-Wire bus is connected.","Selected sensor - Here you select the temperature sensor connected to the chosen pin: DS18B20 or DHT22.","Count of sensors - Number of 1-Wire temperature sensors on this pin.","On/Off - The function of enabling or disabling polling of connected sensors on this bus.","Actions - The Edit button to bind a specific sensor to this connection."],enlangpid=["","No - Unique numeric identifier, assigned automatically.",'PWM Pin - The PWM pin you selected on the "Select pin" page.',"Sel. sensor - Specify one of the two types (DS18B20/DHT22) of temperature sensors.",'Dev. ser. number - Serial number of the selected DS18B20 sensor (from the "OneWire pin" page).',"Presets - Select the preset that best matches the desired temperature and timing parameters.","T set. - Set the target temperature that the PID controller should maintain.","T cur. - Current temperature of the selected sensor.","Duty - Current PWM value.",'Info - Name of this PID controller for quick navigation (e.g., "Kids room warm floor").',"On/Off - Enable/Disable this PID controller.","Action - Button to enter the PID controller settings menu.","Auto tune - Automatic tuning of PID coefficients."];function initGlobalTooltip$8(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,mt=$.offsetHeight,ee=window.innerWidth,Xt=dt.getBoundingClientRect();let Yt=Xt.left+Xt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,ee-_-8));let ne=Xt.top-mt-8;ne<8&&(ne=Xt.bottom+8),$.style.left=Yt+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabSelect({}){const[$,k]=ut(null),[st,ct]=ut({}),[dt,_]=ut(null),[mt,ee]=ut(!1),[Xt,Yt]=ut(3),[ne,Zt]=ut(!1),[le,ie]=ut("ru"),ce=at(0);lt(()=>{initGlobalTooltip$8()},[]);const ge=ae=>{Zt(ae),ce.current=Date.now()},ye=ae=>ne&&(ae===1||ae===35),de=()=>fetch("/api/select/get",{cache:"no-store"}).then(ae=>ae.json()).then(ae=>{const ve=ae.data||ae;k(ve),Zt(ae.sim800l===1),ae.lang&&ie(ae.lang);const ke={};ve.forEach(fe=>{ke[`topin_${fe.id}`]=fe.topin.toString()}),ct(ke)});lt(()=>{let ae=!0;return registerPoll("select","/api/select/get",function(ve){if(ae&&!(Date.now()-ce.current<8e3)&&ve!=null){const ke=ve.data||ve;k(ke),Zt(ve.sim800l===1),ve.lang&&ie(ve.lang);const fe={};ke.forEach(function(pe){fe["topin_"+pe.id]=pe.topin.toString()}),ct(fe)}},{immediate:!0}),function(){ae=!1,unregisterPoll("select")}},[]),lt(()=>{let ae;return mt&&Xt>0?ae=setTimeout(()=>{Yt(Xt-1)},1e3):Xt===0&&(ee(!1),_(null)),()=>clearTimeout(ae)},[mt,Xt]);const xe=async ae=>{ae.preventDefault();const ve=new FormData(ae.target),ke={lang:le,sim800l:ne?1:0,data:[]};$.forEach(fe=>{const pe=ve.get(`topin_${fe.id}`);ke.data.push({id:fe.id,pins:fe.pins,topin:parseInt(pe),pwm:fe.pwm,i2cdata:fe.i2cdata,i2cclok:fe.i2cclok})}),_("submitting"),ee(!0),Yt(3);try{const fe=await fetch("/api/select/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ke)});if(!fe.ok)throw new Error("Network response was not ok");const pe=await fe.json();_("success"),console.log("Success:",pe);const Ce={};ke.data.forEach(pt=>{Ce[`topin_${pt.id}`]=pt.topin.toString()}),ct(pt=>({...pt,...Ce})),ce.current=0,de()}catch(fe){_("error"),console.error("Error:",fe)}},be=ae=>{const{name:ve,value:ke}=ae.target;ct(fe=>({...fe,[ve]:ke})),ce.current=Date.now()};if(!$)return"";const _e=()=>({langselect:le==="ru"?ruLangselect:enLangselect}),Te=(ae,ve)=>{const ke=_e(),pe=(ke[ae]&&ke[ae][ve]?ke[ae][ve]:"").split(" "),Ce=[];for(let pt=0;pt<pe.length;pt+=15)Ce.push(pe.slice(pt,pt+15).join(" "));return Ce.join("<br>")},$e=ae=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      style=${ae.center?"text-align: center":""}
      data-tip=${Te("langselect",ae.tooltipIndex)}
    >
      ${ae.title}
    </th>
  `,Se=({id:ae,value:ve,label:ke,disabled:fe=!1,onChange:pe,checked:Ce})=>Et`
    <div class="relative">
      <input
        id="${ae}_${ve}"
        class="sr-only peer"
        type="radio"
        name="topin_${ae}"
        value="${ve}"
        checked=${Ce}
        onChange=${pe}
        disabled=${fe}
        aria-label="${ke}"
      />
      <label
        for="${ae}_${ve}"
        class="cursor-pointer px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300
               ${fe?"text-gray-400 cursor-not-allowed opacity-60":"text-slate-700 hover:bg-black/5"}
               peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-cyan-500 peer-checked:text-white peer-checked:shadow-sm"
      >
        ${ke}
      </label>
    </div>
  `,Oe=({d:ae})=>Et`
    <tr class="${ye(ae.id)?"bg-red-200/50 opacity-50 pointer-events-none":ae.id%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-2 text-sm text-slate-800">${ae.id}</td>
      <td class="px-6 py-2 text-sm text-slate-800 font-medium">${ae.pins}</td>
      <td class="px-2 py-2">
        <div class="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
          <${Se} id=${ae.id} value="0"  label="NONE"     checked=${st[`topin_${ae.id}`]==="0"}  onChange=${be} />
          <${Se} id=${ae.id} value="3"  label="SWITCH"   checked=${st[`topin_${ae.id}`]==="3"}  onChange=${be} />
          <${Se} id=${ae.id} value="1"  label="BUTTON"   checked=${st[`topin_${ae.id}`]==="1"}  onChange=${be} />
          <${Se} id=${ae.id} value="2"  label="DEVICE"   checked=${st[`topin_${ae.id}`]==="2"}  onChange=${be} />
          <${Se} id=${ae.id} value="4"  label="1-WIRE"   checked=${st[`topin_${ae.id}`]==="4"}  onChange=${be} />
          <${Se} id=${ae.id} value="5"  label="PWM"      disabled=${ae.pwm==0} checked=${st[`topin_${ae.id}`]==="5"}  onChange=${be} />
          <${Se} id=${ae.id} value="8"  label="Enc.OutA" checked=${st[`topin_${ae.id}`]==="8"}  onChange=${be} />
          <${Se} id=${ae.id} value="9"  label="Enc.OutB" checked=${st[`topin_${ae.id}`]==="9"}  onChange=${be} />
          <${Se} id=${ae.id} value="10" label="Security" disabled=${ae.monitoring==0} checked=${st[`topin_${ae.id}`]==="10"} onChange=${be} />
        </div>
      </td>
    </tr>
  `;return Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Select pin(s)
        </div>

        <form onSubmit=${xe} class="flex-grow flex flex-col justify-center items-center w-full">
          <div class="w-full">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <button
                type="submit"
                class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${mt?"bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none":"bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"}`}
                disabled=${mt}
              >
                ${mt?`Please wait ${Xt} sec.`:"Submit"}
              </button>

              <div class="flex items-center gap-3">
                <span class="text-slate-600 font-bold uppercase tracking-widest text-2xl drop-shadow-sm">SIM800L</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    checked=${ne}
                    onChange=${ae=>ge(ae.target.checked)}
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

            <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${$e} title="ID" tooltipIndex=${1} />
                      <${$e} title="Pin" tooltipIndex=${2} />
                      <${$e} title="Type(s) of pin(s)" tooltipIndex=${3} center=${!0} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${$&&$.map(ae=>Et`<${Oe} d=${ae} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${mt?"bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none":"bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"}`}
                disabled=${mt}
              >
                ${mt?`Please wait ${Xt} sec.`:"Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `}function ModalSwitch({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedSwitch:_,onSwitchChange:mt,connectionOptions:ee,SliderComponent:Xt=MyPolzunok}){const[Yt,ne]=ut((_==null?void 0:_.info)||""),[Zt,le]=ut((_==null?void 0:_.onoff)||0),[ie,ce]=ut((_==null?void 0:_.ptype)||0),[ge,ye]=ut((_==null?void 0:_.setrpins)||""),[de,xe]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(pe=>{if(!pe.ok)throw new Error(`HTTP error! status: ${pe.status}`);return pe.json()}).then(pe=>{if(!pe||!pe.data||!Array.isArray(pe.data)){console.error("Invalid data format:",pe),xe([]);return}const Ce=pe.data.filter(pt=>pt.topin===2);xe(Ce)}).catch(pe=>{console.error("Error fetching pin config:",pe),xe([])})},[]);const be=pe=>{pe.preventDefault();const Ce=new FormData(pe.target),pt=Object.fromEntries(Ce);if(pt.id=_.id,pt.pins=_.pins,$==="edit")pt.onoff=Zt;else if($==="connection"){const vt=de.find(oe=>oe.pins===pt.setrpins);vt&&(pt.pinact={..._.pinact,[vt.id]:vt.pins})}fetch("/api/switch/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(pt)}).then(vt=>vt.json()).then(vt=>{console.log("Success:",vt),mt({..._,...pt}),st(),window.location.href="/#/switch"}).catch(vt=>{console.error("Error:",vt)})},_e=pe=>{ye(pe.target.value)},Te=pe=>{ce(parseInt(pe.target.value))},$e=pe=>{ne(pe.target.value)},Se=pe=>{le(pe)},Oe=pe=>{ct&&pe.target===pe.currentTarget&&st()},ae=()=>{ce(0),ne(""),le(0)},ke=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50"
      style="margin-top: 7px;"
      onclick=${Oe}
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
          <form onsubmit=${be}>
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
                        value=${de.some(pe=>pe.pins===ge)?ge:""}
                        onchange=${_e}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select a connection</option>
                        ${de.map(pe=>Et`
                            <option value=${pe.pins}>
                              ${pe.pins} (ID: ${pe.id})
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
          <form onsubmit=${be}>
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
                        value=${ie}
                        onchange=${Te}
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
                        oninput=${$e}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${Xt}
                        value=${Zt}
                        onChange=${Se}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-between items-center mt-4">
              <button
                type="button"
                onclick=${ae}
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
  `,fe=at(null);return lt(()=>{const pe=document.createElement("div");return pe.id="modal-portal",document.body.appendChild(pe),fe.current=pe,()=>{O(null,pe),document.body.removeChild(pe)}},[]),lt(()=>{fe.current&&O(ke,fe.current)}),null}function initGlobalTooltip$7(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block";const _=dt.getBoundingClientRect();$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const mt=$.offsetWidth,ee=$.offsetHeight,Xt=window.innerWidth;let Yt=_.left+_.width/2-mt/2;Yt=Math.max(8,Math.min(Yt,Xt-mt-8));let ne=_.top-ee-8;ne<8&&(ne=_.bottom+8),$.style.left=Yt+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabSwitch({}){const[$,k]=ut(null),[st,ct]=ut(null),[dt,_]=ut(!1),[mt,ee]=ut(null),[Xt,Yt]=ut(null),[ne,Zt]=ut(!1),[le,ie]=ut("ru"),[ce,ge]=ut(null),[ye,de]=ut([]),[xe,be]=ut(""),[_e,Te]=ut(!1),$e=at(!1);lt(()=>{initGlobalTooltip$7()},[]);const Se=()=>Promise.all([fetch("/api/switch/get").then($t=>$t.json()),fetch("/api/pintopin/get").then($t=>$t.json())]).then(([$t,te])=>{ie($t.lang),ge($t.switches),k($t),de(te),be(`Pintopin data: ${JSON.stringify(te,null,2)}

Switch data: ${JSON.stringify($t.switches,null,2)}`),console.log("Pintopin data:",te),console.log("Switch data:",$t.switches)}).catch($t=>{console.error("Error fetching data:",$t),be(`Error fetching data: ${$t.message}`)});lt(()=>{let $t=!0;return registerPoll("switches","/api/state/switch",function(te){$t&&($e.current||te!=null&&(te.switches&&(ge(te.switches),ie(te.lang)),te.pintopin&&de(te.pintopin)))},{immediate:!0}),function(){$t=!1,unregisterPoll("switches")}},[]);const Oe=$t=>{const te=new Map,re=ce.find(me=>me.id===$t);return re&&re.pinact&&Object.entries(re.pinact).forEach(([me,Pe])=>{te.set(me,{pin:me,relayId:Pe})}),ye.forEach(me=>{if(me.idin===$t){const Pe=`${me.pins}(${me.idout})`;te.has(Pe)||te.set(Pe,{pin:me.pins,relayId:me.idout})}}),Array.from(te.values())},ae=()=>({langswitch:le==="ru"?ruLangswitch:enLangswitch}),ve=($t,te)=>{const re=ae(),Pe=(re[$t]&&re[$t][te]||"").split(" "),Me=[];let De="";for(let Ee=0;Ee<Pe.length;Ee++){const we=Pe[Ee];De.length+we.length+1<=200?De+=(De.length>0?" ":"")+we:(De.length>0&&Me.push(De),De=we)}return De.length>0&&Me.push(De),Me.join("<br>")},ke=($t,te)=>{console.log("Удаление соединения:",$t,te);const[re,me]=te.split("("),Pe=me?parseInt(me):null;fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:$t,pin:re.trim()})}).then(Me=>Me.json()).then(Me=>{ct(Me),ge(De=>De.map(Ee=>{if(Ee.id===$t){const we={...Ee.pinact};return delete we[re.trim()],{...Ee,pinact:we}}return Ee})),de(De=>De.filter(Ee=>!(Ee.idin===$t&&Ee.pins===re.trim()&&(Pe===null||Ee.idout===Pe))))}).then(()=>{console.log("Соединение удалено успешно"),Se()}).catch(Me=>{console.error("Ошибка при удалении соединения:",Me)})},fe=($t,te)=>{ee($t),Yt(te),_(!0)},pe=()=>{_(!1),ee(null),Yt(null)},Ce=$t=>{console.log("handleSwitchChange:",$t),ge(te=>te.map(re=>re.id===$t.id?$t:re)),$e.current=!0,fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:$t.id,onoff:$t.onoff})}).then(te=>te.json()).then(te=>{console.log("Response from /api/onoff/set:",te)}).catch(te=>{console.error("Error calling /api/onoff/set:",te)}).finally(()=>{setTimeout(()=>{$e.current=!1},1500)}),pe()},pt={ru:Et`
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
    `},vt=$t=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${ve("langswitch",$t.tooltipIndex)}
    >
      ${$t.title}
    </th>
  `,oe=({d:$t,index:te})=>{const re=Oe($t.id);return Et`
      <tr class="${te%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${$t.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${$t.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][$t.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono">
          ${re.map(({pin:me,relayId:Pe})=>Et`
              <span class="mr-2 inline-flex items-center">
                ${me}${Pe!==void 0?`(${Pe})`:""}
                <button
                  onClick=${Me=>{Me.preventDefault(),ke($t.id,`${me}(${Pe})`)}}
                  class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                  title="Remove connection"
                >
                  [x]
                </button>
              </span>
            `)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${$t.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${$t.onoff}
            onChange=${me=>Ce({...$t,onoff:me})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>fe("connection",$t)}
            class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
          >
            Connection
          </button>
          <span class="text-slate-300">|</span>
          <button
            onClick=${()=>fe("edit",$t)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors ml-2"
          >
            Edit
          </button>
        </td>
      </tr>
    `};return ce?Et`
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
                      <${vt} title="ID" tooltipIndex=${1} />
                      <${vt} title="Pin" tooltipIndex=${2} />
                      <${vt} title="Pullup type" tooltipIndex=${3} />
                      <${vt} title="Device connection" tooltipIndex=${4} />
                      <${vt} title="INFO" tooltipIndex=${5} />
                      <${vt} title="On/Off" tooltipIndex=${6} />
                      <${vt} title="Action" tooltipIndex=${7} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${ce.map(($t,te)=>Et`<${oe} d=${$t} index=${te} key=${$t.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>Zt(!ne)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${ne?"Hide Help":"Show Help"}
              </button>
            </div>

            ${ne&&Et`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${pt[le]}
                </div>
              `}
          </div>
        </div>

        ${dt&&Et`
            <${ModalSwitch}
              modalType=${mt}
              page="TabSwitch"
              hideModal=${pe}
              title=${mt==="connection"?"Edit Connection":"Edit switch"}
              selectedSwitch=${Xt}
              onSwitchChange=${Ce}
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
  `,portalRef=at(null);return lt(()=>{const $=document.createElement("div");return $.id="modal-portal",document.body.appendChild($),portalRef.current=$,()=>{O(null,$),document.body.removeChild($)}},[]),lt(()=>{portalRef.current&&O(modalContent,portalRef.current)}),null};function initGlobalTooltip$6(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,mt=$.offsetHeight,ee=window.innerWidth,Xt=dt.getBoundingClientRect();let Yt=Xt.left+Xt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,ee-_-8));let ne=Xt.top-mt-8;ne<8&&(ne=Xt.bottom+8),$.style.left=Yt+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabButton=()=>{const[$,k]=ut(null),[st,ct]=ut([]),[dt,_]=ut(null),[mt,ee]=ut(null),[Xt,Yt]=ut(!1),[ne,Zt]=ut(null),[le,ie]=ut(null),[ce,ge]=ut(!1),[ye,de]=ut("ru"),[xe,be]=ut(""),_e=at(!1);lt(()=>{initGlobalTooltip$6()},[]);const Te={ru:Et`
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
    `};lt(()=>{let pt=!0;return registerPoll("buttons","/api/state/button",vt=>{pt&&(_e.current||vt!=null&&vt.buttons&&(_(vt.buttons),de(vt.lang)))},{immediate:!0}),()=>{pt=!1,unregisterPoll("buttons")}},[]);const $e=pt=>{const vt=new Map,oe=dt.find($t=>$t.id===pt);return oe&&oe.pinact&&Object.entries(oe.pinact).forEach(([$t,te])=>{vt.set($t,{pin:$t,relayId:te})}),st.forEach($t=>{if($t.idin===pt){const te=`${$t.pins}(${$t.idout})`;vt.has(te)||vt.set(te,{pin:$t.pins,relayId:$t.idout})}}),Array.from(vt.values())},Se=()=>({langbutton:ye==="ru"?rulangbutton:enlangbutton}),Oe=(pt,vt)=>{const oe=Se(),$t=oe[pt]&&oe[pt][vt]?oe[pt][vt]:"";return ae($t)},ae=(pt,vt=100)=>{if(!pt||typeof pt!="string")return"";const oe=[];let $t="";const te=pt.split(`
`);return te.forEach((re,me)=>{re.split(" ").filter(Me=>Me.length>0).forEach(Me=>{const De=$t.length===0?Me:" "+Me;$t.length+De.length<=vt?$t+=De:($t.length>0&&oe.push($t),$t=Me)}),$t.length>0&&(oe.push($t),$t=""),me<te.length-1&&oe.push("")}),$t.length>0&&oe.push($t),oe.join(`
`)},ve=(pt,vt)=>{Zt(pt),ie(vt),Yt(!0)},ke=()=>{Yt(!1),Zt(null),ie(null)},fe=pt=>{console.log("handleButtonChange:",pt),_(vt=>vt.map(oe=>oe.id===pt.id?{...oe,...pt}:oe)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:pt.id,onoff:pt.onoff})}).then(vt=>vt.json()).then(vt=>{console.log("Response from /api/onoff/set:",vt)}).catch(vt=>{console.error("Error calling /api/onoff/set:",vt)}).finally(()=>{setTimeout(()=>{_e.current=!1},1500)}),ke()},pe=pt=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Oe("langbutton",pt.tooltipIndex)}
    >
      ${pt.title}
    </th>
  `,Ce=({d:pt,index:vt})=>($e(pt.id),Et`
      <tr class="${vt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${pt.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${pt.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][pt.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${ae(pt.sclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${ae(pt.dclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${ae(pt.lpress)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${pt.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${pt.onoff}
            onChange=${oe=>fe({...pt,onoff:oe})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>ve("edit",pt)}
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
                      <${pe} title="ID" tooltipIndex=${1} />
                      <${pe} title="Pin" tooltipIndex=${2} />
                      <${pe} title="Pullup type" tooltipIndex=${3} />
                      <${pe} title="SINGLE CLICK" tooltipIndex=${4} />
                      <${pe} title="DOUBLE CLICK" tooltipIndex=${5} />
                      <${pe} title="LONG PRESS" tooltipIndex=${6} />
                      <${pe} title="INFO" tooltipIndex=${7} />
                      <${pe} title="On/Off" tooltipIndex=${8} />
                      <${pe} title="Action" tooltipIndex=${9} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${dt.map((pt,vt)=>Et`<${Ce} d=${pt} index=${vt} key=${pt.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>ge(!ce)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${ce?"Hide Help":"Show Help"}
              </button>
            </div>

            ${ce&&Et`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${Te[ye]}
                </div>
              `}
          </div>
        </div>
      </div>
    </div>

    ${Xt&&Et`
        <${ModalButton}
          modalType=${ne}
          page="TabButton"
          hideModal=${ke}
          title=${ne==="connection"?"Edit Connection":"Edit Button pin"}
          selectedButton=${le}
          onButtonChange=${fe}
        />
      `}
  `:""};function ModalEncoder({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedEncoder:_,handleEncoderChange:mt,connectionOptions:ee,SliderComponent:Xt=MyPolzunok}){const[Yt,ne]=ut((_==null?void 0:_.info)||""),[Zt,le]=ut((_==null?void 0:_.onoff)===1),[ie,ce]=ut({pin:(_==null?void 0:_.encdrbpin)||"",id:(_==null?void 0:_.encoderb)||""}),[ge,ye]=ut(Object.entries(_.pinact||{})[0]||["",""]),[de,xe]=ut([]),[be,_e]=ut([]),[Te,$e]=ut([]),Se=_.pwmmax||100,[Oe,ae]=ut(_.dvalue||0),[ve,ke]=ut(_.ponr||0),[fe,pe]=ut(_.pwm||1e7),Ce=we=>Math.round(we*Se/100);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(we=>{if(!we.ok)throw new Error(`HTTP error! status: ${we.status}`);return we.json()}).then(we=>{if(!we||!we.data||!Array.isArray(we.data)){console.error("Invalid data format:",we),xe([]),_e([]),$e([]);return}const se=we.data.filter(Ie=>Ie.topin===2),he=we.data.filter(Ie=>Ie.topin===9),ue=we.data.filter(Ie=>Ie.topin===5);if(xe(se),_e(he),$e(ue),_.encoderb||_.encdrbpin){const Ie=he.find(Le=>String(Le.id)===String(_.encoderb)||Le.pins===_.encdrbpin);ce({pin:Ie?Ie.pins:"",id:Ie?Ie.id:""})}}).catch(we=>{console.error("Error fetching pin config:",we),xe([]),_e([]),$e([])})},[_]);const pt=we=>{if(we.preventDefault(),!(we.target instanceof HTMLFormElement))return;let he={};if($==="edit")he={topin:8,id:_.id,pins:_.pins,pwm:parseInt(fe),pwmmax:_.pwmmax,dvalue:parseInt(Oe),ponr:parseInt(ve),info:Yt,onoff:Zt?1:0};else if($==="connection"){const Ie=ge&&ge[0]&&ge[1]!==void 0?{[ge[0]]:parseInt(ge[1])}:{};he={id:_.id,pins:_.pins,pwm:parseInt(fe)},ie&&ie.id!==void 0&&ie.id!==""?(he.encoderb=parseInt(ie.id),he.encdrbpin=ie.pin):(he.encoderb=255,he.encdrbpin=""),he.pinact=Ie}console.log("Sending JSON to STM32:",JSON.stringify(he)),fetch("/api/encoder/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(he)}).then(ue=>ue.json()).then(ue=>{mt({..._,...he}),st()}).catch(ue=>console.error("Error saving encoder:",ue))},vt=we=>{ne(we.target.value)},oe=we=>{le(we)},$t=we=>{const se=be.find(he=>he.pins===we.target.value);ce({pin:we.target.value,id:se?se.id:""})},te=we=>{if(!we.target.value)ye(["",""]);else{const se=we.target.value.split("|");ye([se[0],se[1]])}},re=we=>{ae(we.target.value)},me=we=>{ke(we.target.value)},Pe=we=>{const se=we/1e3;return se<=4e4?{cls:"text-green-600",msg:"Optimal range"}:se<=2e5?{cls:"text-yellow-600",msg:"Precision might drop"}:{cls:"text-red-600",msg:"Expert mode: low precision"}},De=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick=${we=>ct&&we.target===we.currentTarget&&st()}
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
          <form onsubmit=${pt}>
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
                        value=${be.some(we=>we.pins===ie.pin)?ie.pin:""}
                        onchange=${$t}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select Encoder B</option>
                        ${be.map(we=>Et`
                            <option value=${we.pins}>
                              ${we.pins} (ID: ${we.id})
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
                        value=${Te.some(we=>String(we.pins)===String(ge[0]))?`${ge[0]}|${ge[1]}`:""}
                        onchange=${te}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select PWM connection</option>
                        ${Te.map(we=>{const se=pwmTimerMap[we.pins]||"Unknown Timer";return Et`
                            <option value=${`${we.pins}|${we.id}`}>
                              ${we.pins} (${se}, ID: ${we.id})
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
          <form onsubmit=${pt}>
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
                        value=${fe}
                        oninput=${we=>pe(we.target.value)}
                        class="border rounded p-2 w-full font-mono"
                        placeholder="50 - 2000000000"
                      />
                      <div class="text-xs ${Pe(fe).cls}">
                        ${Pe(fe).msg}
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
                        value=${Oe}
                        oninput=${re}
                        class="border rounded p-2 w-full"
                      />
                      <div class="text-xs text-gray-500">
                        ${Oe}% = ${Ce(parseInt(Oe)||0)} / ${Se} steps
                      </div>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Duty on restore</td>
                    <td class="p-2">
                      <select
                        value=${ve}
                        onchange=${me}
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
                        oninput=${vt}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${Xt}
                        value=${Zt}
                        onChange=${oe}
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
  `,Ee=at(null);return lt(()=>{const we=document.createElement("div");return we.id="encoder-modal-portal",document.body.appendChild(we),Ee.current=we,()=>{O(null,we),document.body.removeChild(we)}},[]),lt(()=>{Ee.current&&O(De,Ee.current)}),null}function initGlobalTooltip$5(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,mt=$.offsetHeight,ee=window.innerWidth,Xt=dt.getBoundingClientRect();let Yt=Xt.left+Xt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,ee-_-8));let ne=Xt.top-mt-8;ne<8&&(ne=Xt.bottom+8),$.style.left=Yt+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const pwmTimerMap={PA0:"TIM2",PA3:"TIM2",PB10:"TIM2",PA6:"TIM3",PB1:"TIM3",PB15:"TIM12",PC6:"TIM8",PC7:"TIM8",PC8:"TIM8",PC9:"TIM8",PD12:"TIM4",PD13:"TIM4",PD14:"TIM4",PD15:"TIM4",PE5:"TIM9",PE6:"TIM9",PE9:"TIM1",PE11:"TIM1",PE13:"TIM1",PE14:"TIM1",PF6:"TIM10",PF7:"TIM11",PF8:"TIM13",PF9:"TIM14"};function TabEncoder({}){{const[$,k]=ut(null),[st,ct]=ut(null),[dt,_]=ut(!1),[mt,ee]=ut(null),[Xt,Yt]=ut(null),[ne,Zt]=ut(!1),[le,ie]=ut("ru"),[ce,ge]=ut([]),ye=at(!1);lt(()=>{initGlobalTooltip$5()},[]);const de=()=>Promise.all([fetch("/api/encoder/get").then(pt=>pt.json()),fetch("/api/pintopin/get").then(pt=>pt.json())]).then(([pt,vt])=>{ie(pt.lang),k(pt.encoders),ge(vt),console.log("Encoder data:",pt.encoders),console.log("Pintopin data:",vt)}).catch(pt=>{console.error("Error fetching data:",pt)});lt(()=>{let pt=!0;return registerPoll("encoders","/api/state/encoder",function(vt){pt&&(ye.current||vt!=null&&(vt.encoders&&(k(vt.encoders),ie(vt.lang)),vt.pintopin&&ge(vt.pintopin)))},{immediate:!0}),function(){pt=!1,unregisterPoll("encoders")}},[]);const xe=pt=>{k(vt=>vt.map(oe=>oe.id===pt.id?pt:oe)),ye.current=!0,fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:pt.id,onoff:pt.onoff})}).then(vt=>vt.json()).then(vt=>{console.log("Response from /api/onoff/set (Encoder):",vt)}).catch(vt=>{console.error("Error calling /api/onoff/set (Encoder):",vt)}).finally(()=>{setTimeout(()=>{ye.current=!1},1500)})},be=pt=>{const vt=$.find($t=>$t.id===pt),oe=[];return vt&&vt.pinact&&Object.entries(vt.pinact).forEach(([$t,te])=>{oe.push({pin:$t,idout:te})}),oe},_e=pt=>{const vt=pt/1e3;return vt<=4e4?{cls:"text-green-600",msg:"✓"}:vt<=2e5?{cls:"text-yellow-600",msg:"~"}:{cls:"text-red-600",msg:"!"}},Te=pt=>{if(!pt)return"—";const vt=pt/1e3;return vt>=1e6?`${(vt/1e6).toFixed(2)} MHz`:vt>=1e3?`${(vt/1e3).toFixed(1)} kHz`:`${vt} Hz`},$e=()=>({langbutton:le==="ru"?ruencoder:enencoder}),Se=(pt,vt)=>{const oe=$e(),$t=oe[pt]&&oe[pt][vt]?oe[pt][vt]:"";return Oe($t)},Oe=(pt,vt=50)=>{if(!pt||typeof pt!="string")return"";const oe=pt.split(" ");let $t=[],te="";for(let re=0;re<oe.length;re++)te.length+oe[re].length+1<=vt?te+=`${te?" ":""}${oe[re]}`:(te&&$t.push(te.trim()),te=oe[re]);return te&&$t.push(te.trim()),$t.join(`
`)},ae=(pt,vt)=>{console.log("Deleting connection:",pt,vt);const oe=vt.split("(")[0].trim();fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:pt,pin:oe})}).then($t=>$t.ok?$t.json():$t.text().then(te=>{throw new Error(`HTTP error! status: ${$t.status}, message: ${te}`)})).then($t=>{ct($t),k(te=>te.map(re=>{if(re.id===pt){const me={...re.pinact};return delete me[oe],{...re,pinact:me}}return re})),ge(te=>te.filter(re=>!(re.idin===pt&&re.pins===oe)))}).then(()=>{console.log("Connection deleted successfully"),de()}).catch($t=>{console.error("Error deleting connection:",$t)})},ve=(pt,vt)=>{console.log("Opening modal:",pt,vt),ee(pt),Yt(vt),_(!0)},ke=()=>{_(!1),ee(null),Yt(null)},fe={ru:Et`
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
      `},pe=({title:pt,tooltipIndex:vt})=>Et`
      <th
        class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
        data-tip=${Se("langbutton",vt)}
      >
        ${pt}
      </th>
    `,Ce=({d:pt,index:vt})=>{const oe=be(pt.id),$t=_e(pt.pwm||0),te=oe.map(re=>pwmTimerMap[re.pin]).filter((re,me,Pe)=>re&&Pe.indexOf(re)===me);return Et`
        <tr class="${vt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
          <td class="px-6 py-2 text-sm text-slate-800 font-medium">${pt.pins}(${pt.id})</td>
          <td class="px-6 py-2 text-sm text-slate-700">
            ${pt.encdrbpin?`${pt.encdrbpin}(${pt.encoderb})`:"Not set"}
          </td>
          <td class="px-6 py-2 text-sm text-slate-700 font-mono">
            ${oe.length>0?oe.map(({pin:re,idout:me})=>Et`
                    <span class="mr-2 inline-flex items-center">
                      ${re}(${me})
                      <button
                        onClick=${Pe=>{Pe.preventDefault(),ae(pt.id,`${re}(${me})`)}}
                        class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                        title="Remove connection"
                      >
                        [x]
                      </button>
                    </span>
                  `):"Not set"}
          </td>
          <td class="px-6 py-2 text-sm">
            <span class="font-mono text-slate-700">${Te(pt.pwm)}</span>
            <span class="ml-1 font-bold ${$t.cls}">${$t.msg}</span>
            ${te.length>0?Et`<span class="ml-2 font-mono text-xs text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200 shadow-sm" title="Hardware Timer">${te.join(", ")}</span>`:""}
          </td>
          <td class="px-6 py-2 font-mono text-sm text-blue-600">
            ${pt.pwmmax?`${pt.pwmmax} steps`:"—"}
          </td>
          <td class="px-6 py-2 text-sm text-slate-800">${pt.dvalue}</td>
          <td class="px-6 py-2 text-sm text-slate-700 font-semibold">${pt.ponr===1?"ON":"OFF"}</td>
          <td class="px-6 py-2 text-sm text-slate-600">${pt.info}</td>
          <td class="px-6 py-2">
            <${MyPolzunok}
              value=${pt.onoff}
              onChange=${re=>xe({...pt,onoff:re})}
            />
          </td>
          <td class="px-6 py-2 text-sm whitespace-nowrap">
            <button
              onClick=${()=>ve("connection",pt)}
              class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
            >
              Connection
            </button>
            <span class="text-slate-300">|</span>
            <button
              onClick=${()=>ve("edit",pt)}
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
                        <${pe} title="Encoder A (ID)" tooltipIndex=${3} />
                        <${pe} title="Encoder B (ID)" tooltipIndex=${4} />
                        <${pe} title="PWM connection" tooltipIndex=${5} />
                        <${pe} title="PWM Frequency" tooltipIndex=${11} />
                        <${pe} title="Resolution (steps)" tooltipIndex=${12} />
                        <${pe} title="Dimmer value (0-100)" tooltipIndex=${6} />
                        <${pe} title="Duty on restore" tooltipIndex=${7} />
                        <${pe} title="INFO" tooltipIndex=${8} />
                        <${pe} title="On/Off" tooltipIndex=${9} />
                        <${pe} title="Action" tooltipIndex=${10} />
                      </tr>
                    </thead>
                    <tbody id="tab1" class="divide-y divide-white/40">
                      ${$.map((pt,vt)=>Et`<${Ce} d=${pt} index=${vt} key=${pt.id} />`)}
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="flex justify-end mt-6">
                <button
                  onclick=${()=>Zt(!ne)}
                  class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
                >
                  ${ne?"Hide Help":"Show Help"}
                </button>
              </div>

              ${ne&&Et`
                  <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                    ${fe[le]}
                  </div>
                `}
            </div>
          </div>
          ${dt&&Et`
              <${ModalEncoder}
                modalType=${mt}
                page="TabEncoder"
                hideModal=${ke}
                title=${mt==="connection"?"Edit Connection":"Edit Encoder"}
                selectedEncoder=${Xt}
                handleEncoderChange=${xe}
              />
            `}
        </div>
      </div>
    `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">Loading...</div>`}}function ModalCron({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedCron:_,handleCronChange:mt,connectionOptions:ee,modalClass:Xt,SliderComponent:Yt=MyPolzunok}){const[ne,Zt]=ut((_==null?void 0:_.info)||""),[le,ie]=ut((_==null?void 0:_.onoff)===1),[ce,ge]=ut((_==null?void 0:_.activ)||""),[ye,de]=ut((_==null?void 0:_.cron)||""),[xe,be]=ut(_.setrpins||""),_e=fe=>{fe.preventDefault();const pe=new FormData(fe.target),Ce=Object.fromEntries(pe);Ce.id=_.id,Ce.pins=_.pins,$==="edit"?(Ce.onoff=le?1:0,Ce.info=ne,Ce.cron=ye,Ce.activ=ce):$==="connection"&&(Ce.setrpins=xe),console.log("Data being sent to server:"),console.log(Ce),console.log("Stringified data:"),console.log(JSON.stringify(Ce)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Ce)}).then(pt=>pt.json()).then(pt=>{console.log("Success:",pt),mt({..._,...Ce}),st(),window.location.href="/#/cron"}).catch(pt=>{console.error("Error:",pt)})};lt(()=>{Zt((_==null?void 0:_.info)||""),be((_==null?void 0:_.setrpins)||""),ie((_==null?void 0:_.onoff)===1)},[_]);const Te=fe=>{de(fe.target.value)},$e=fe=>{Zt(fe.target.value)},Se=fe=>{ie(fe)},Oe=fe=>{ge(fe.target.value)},ae=()=>{if(k==="TabCron"&&$==="edit")return Et`
          <form onsubmit=${_e}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  ${[{label:"ID",value:_.id},{label:"Cron",value:Et`
                        <input
                          type="text"
                          value=${ye}
                          onInput=${Te}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"Script",value:Et`
                        <input
                          type="text"
                          value=${ce}
                          onInput=${Oe}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"INFO",value:Et`
                        <input
                          type="text"
                          value=${ne}
                          onInput=${$e}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"On/Off",value:Et`<${Yt}
                        value=${le}
                        onChange=${Se}
                      />`}].map((fe,pe)=>Et`
                      <tr
                        class="${pe%2===1?"bg-white":"bg-gray-200"}"
                      >
                        <td class="p-2 font-bold">${fe.label}</td>
                        <td class="p-2">${fe.value}</td>
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
        `},ve=Et`
    <div class=${`modal ${Xt||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${fe=>ct&&fe.target===fe.currentTarget&&st()}
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
            ${ae()}
          </div>
        </div>
      </div>
    </div>
  `,ke=at(null);return lt(()=>{const fe=document.createElement("div");return fe.id="modal-portal",document.body.appendChild(fe),ke.current=fe,()=>{O(null,fe),document.body.removeChild(fe)}},[]),lt(()=>{ke.current&&O(ve,ke.current)}),null}function ModalPwmCron({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedCron:_,handleCronChange:mt,modalClass:ee,SliderComponent:Xt=MyPolzunok}){let Yt="",ne="900",Zt="0",le="100";if(_!=null&&_.activ&&_.activ.startsWith("pwm:")){const oe=_.activ.substring(4).split(",");oe.length===4&&(Yt=oe[0],ne=oe[1],Zt=oe[2],le=oe[3])}const[ie,ce]=ut((_==null?void 0:_.info)||""),[ge,ye]=ut((_==null?void 0:_.onoff)===1),[de,xe]=ut((_==null?void 0:_.cron)||""),[be,_e]=ut(Yt),[Te,$e]=ut(ne),[Se,Oe]=ut(Zt),[ae,ve]=ut(le),[ke,fe]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store"}).then(oe=>oe.json()).then(oe=>{if(oe&&oe.data&&Array.isArray(oe.data)){const $t=oe.data.filter(te=>te.topin===5);fe($t),!be&&$t.length>0&&_e($t[0].id.toString())}}).catch(oe=>console.error("Error fetching pin config:",oe))},[]);const pe=oe=>{oe.preventDefault();const $t=new FormData(oe.target),te=Object.fromEntries($t);te.id=_.id,te.pins=_.pins,te.onoff=ge?1:0,te.info=ie,te.cron=de,te.activ=`pwm:${be},${Te},${Se},${ae}`,fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(te)}).then(re=>re.json()).then(re=>{mt({..._,...te}),st(),window.location.href="/#/cron"}).catch(re=>console.error("Error:",re))},Ce=()=>Et`
      <form onsubmit=${pe}>
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
                    value=${be}
                    onChange=${oe=>_e(oe.target.value)}
                    class="border rounded p-2 w-full"
                    required
                  >
                    ${ke.map(oe=>Et`<option value=${oe.id}>${oe.pins}</option>`)}
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200">
                <td class="p-2 font-bold">Cron Pattern</td>
                <td class="p-2">
                  <input
                    type="text"
                    value=${de}
                    onInput=${oe=>xe(oe.target.value)}
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
                    value=${Te}
                    onInput=${oe=>$e(oe.target.value)}
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
                    value=${Se}
                    onInput=${oe=>Oe(oe.target.value)}
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
                    value=${ae}
                    onInput=${oe=>ve(oe.target.value)}
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
                    value=${ie}
                    onInput=${oe=>ce(oe.target.value)}
                    class="border rounded p-2 w-full"
                  />
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-2 font-bold">On/Off</td>
                <td class="p-2">
                  <${Xt} value=${ge} onChange=${ye} />
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
    `,pt=Et`
    <div class=${`modal ${ee||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${oe=>ct&&oe.target===oe.currentTarget&&st()}
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
            ${Ce()}
          </div>
        </div>
      </div>
    </div>
  `,vt=at(null);return lt(()=>{const oe=document.createElement("div");return oe.id="pwm-modal-portal",document.body.appendChild(oe),vt.current=oe,()=>{O(null,oe),document.body.removeChild(oe)}},[]),lt(()=>{vt.current&&O(pt,vt.current)}),null}function initGlobalTooltip$4(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,mt=$.offsetHeight,ee=window.innerWidth,Xt=dt.getBoundingClientRect();let Yt=Xt.left+Xt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,ee-_-8));let ne=Xt.top-mt-8;ne<8&&(ne=Xt.bottom+8),$.style.left=Yt+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabCron({}){const[$,k]=ut(null),[st,ct]=ut(null);at(null);const[dt,_]=ut(!1),[mt,ee]=ut(null),[Xt,Yt]=ut(null),[ne,Zt]=ut("ru"),[le,ie]=ut(!1),[ce,ge]=ut(1),[ye,de]=ut(0),xe=at(!1);lt(()=>{initGlobalTooltip$4()},[]),lt(()=>{let pt=!0;return registerPoll("cron","/api/cron/get",function(vt){!pt||xe.current||vt!=null&&Array.isArray(vt.timers)&&(k(vt.timers),Zt(vt.lang||"ru"),typeof vt.numline=="number"&&(de(vt.numline),ge(vt.numline)))},{immediate:!0}),function(){pt=!1,unregisterPoll("cron")}},[]);const be=pt=>{xe.current=!0,fetch("/api/numline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({numline:pt})}).then(vt=>vt.json()).catch(vt=>console.error("Error sending Crone line to stm32:",vt)).finally(()=>{setTimeout(()=>{xe.current=!1},1500)})},_e=()=>{if(ce<$.length){const pt=ce+1;ge(pt),de(pt),be(pt)}},Te=()=>{if(ce>0){const pt=ce-1;ge(pt),de(pt),be(pt)}},$e={ru:Et`
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
    `};if($===null)return Et`<div>Loading...</div>`;const Se=()=>({langtimers:ne==="ru"?rulangtimers:enlangtimers}),Oe=(pt,vt)=>{const oe=Se(),te=(oe[pt]&&oe[pt][vt]?oe[pt][vt]:"").split(" "),re=[];for(let me=0;me<te.length;me+=15)re.push(te.slice(me,me+15).join(" "));return re.join("<br>")},ae=(pt,vt)=>{ee(pt),Yt(vt),_(!0)},ve=()=>{_(!1),ee(null),Yt(null)},ke=pt=>{console.log("handleCronChange:",pt),k($.map(vt=>vt.id===pt.id?pt:vt)),xe.current=!0,fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(pt)}).then(vt=>vt.json()).then(vt=>{console.log("Cron job updated successfully:",vt)}).catch(vt=>{console.error("Error updating cron job:",vt)}).finally(()=>{setTimeout(()=>{xe.current=!1},1500)})},fe=()=>Array.isArray(Xt)?Xt.flatMap(pt=>pt.pinact?Object.keys(pt.pinact).map(vt=>({value:vt,label:vt})):[]):Xt&&Xt.pinact?Object.keys(Xt.pinact).map(pt=>({value:pt,label:pt})):[],pe=pt=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Oe("langtimers",pt.tooltipIndex)}
    >
      ${pt.title}
    </th>
  `,Ce=({d:pt,index:vt})=>{const oe=pt.activ&&pt.activ.startsWith("pwm:");let $t=pt.activ;if(oe){const te=pt.activ.substring(4).split(",");te.length===4&&($t=`pwmID=${te[0]} | ${te[1]}s | ${te[2]}%→${te[3]}%`)}return Et`
    <tr class="${vt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-4 text-sm text-slate-800 font-medium">${pt.id}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider">${pt.cron}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider items-center gap-1 flex justify-start">${$t}</td>
      <td class="px-6 py-4 text-sm text-slate-600">${pt.info}</td>
      <td class="px-6 py-4">
        <${MyPolzunok}
          value=${pt.onoff}
          onChange=${te=>ke({...pt,onoff:te})}
        />
      </td>
     <td class="px-6 py-4 text-center">
        ${oe?Et`
          <button
            onclick=${()=>ae("edit_pwm",pt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-3"
          >
            Edit
          </button>
          <button
            onclick=${()=>ae("edit_pwm",pt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap ml-1"
          >
            PWM
          </button>
        `:Et`
       <button
            onclick=${()=>ae("edit",pt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
          >
            Edit
          </button>
          <button
            onclick=${()=>ae("edit_pwm",pt)}
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
                          <${pe} title="No" tooltipIndex=${1} />
                          <${pe} title="Cron" tooltipIndex=${2} />
                          <${pe} title="Script" tooltipIndex=${3} />
                          <${pe} title="Info" tooltipIndex=${4} />
                          <${pe} title="On/Off" tooltipIndex=${5} />
                          <${pe} title="Action" tooltipIndex=${6} />
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-white/40">
                        ${$.slice(0,ce).map((pt,vt)=>Et`<${Ce} d=${pt} index=${vt} key=${pt.id} />`)}
                      </tbody>
                    </table>
                  </div>
                </div>
              `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No cron jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>ie(!le)}
          >
            ${le?"Hide Help":"Show Help"}
          </button>
          <div class="font-semibold text-slate-600 tracking-wide">
            ${$&&$.length-ce>0?`Still available: ${$.length-ce} cron jobs`:"No available: cron jobs!"}
          </div>
          <div class="flex gap-2">
            ${$&&ce<$.length?Et`
                  <button
                    class="bg-emerald-500 hover:bg-emerald-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-emerald-500/30"
                    onclick=${_e}
                    title="Add Cron"
                  >+</button>
                `:null}
            ${ce>0?Et`
                  <button
                    class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                    onclick=${Te}
                    title="Remove Cron"
                  >-</button>
                `:null}
          </div>
        </div>
      </div>

      ${le&&Et`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">
          ${$e[ne]}
        </div>
      `}

      ${dt&&mt==="edit_pwm"?Et`
        <${ModalPwmCron}
          modalType=${mt}
          page="TabCron"
          hideModal=${ve}
          title="Edit PWM Timer(s)"
          selectedCron=${Xt}
          handleCronChange=${ke}
          modalClass="mt-24"
        />
      `:dt?Et`
        <${ModalCron}
          modalType=${mt}
          page="TabCron"
          hideModal=${ve}
          title=${mt==="edit"?"Edit Timer(s)":"Edit Connection"}
          selectedCron=${Xt}
          handleCronChange=${ke}
          connectionOptions=${fe()}
          modalClass="mt-24"
        />
      `:null}
    </div>
  `}const PRESETS$1={ru:[{value:"1",label:"Паяльная станция T max=125°C, T min=-55°C"},{value:"2",label:"Кулер / вентилятор T max=70°C, T min=-55°C"},{value:"3",label:"3D‑принтер (стол) T max=120°C, T min=0°C"},{value:"4",label:"Форточный нагреватель T max=60°C, T min=-55°C"},{value:"5",label:"Тёплый пол T max=45°C, T min=0°C"},{value:"6",label:"Холодильник T max=100°C, T min=-55°C"},{value:"7",label:"Аквариум / бойлер T max=80°C, T min=0°C"},{value:"8",label:"Инкубатор T max=45°C, T min=0°C"},{value:"9",label:"Теплица / комната T max=50°C, T min=-55°C"}],en:[{value:"1",label:"Soldering station T max=125°C, T min=-55°C"},{value:"2",label:"Cooler / fan T max=70°C, T min=-55°C"},{value:"3",label:"3D printer (table) T max=120°C, T min=0°C"},{value:"4",label:"Vent heater T max=60°C, T min=-55°C"},{value:"5",label:"Warm floor T max=45°C, T min=0°C"},{value:"6",label:"Refrigerator T max=100°C, T min=-55°C"},{value:"7",label:"Aquarium / boiler T max=80°C, T min=0°C"},{value:"8",label:"Incubator T max=45°C, T min=0°C"},{value:"9",label:"Greenhouse / room T max=50°C, T min=-55°C"}]},SENSOR_OPTIONS$1=[{value:"1",label:"DS18B20"},{value:"2",label:"DHT-22"}];function ModalPid({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedPid:_,handlePidChange:mt,language:ee="en",modalClass:Xt,SliderComponent:Yt=MyPolzunok}){const[ne,Zt]=ut((_==null?void 0:_.info)||""),[le,ie]=ut((_==null?void 0:_.onoff)===1),[ce,ge]=ut((_==null?void 0:_.selsens)||"1"),[ye,de]=ut((_==null?void 0:_.sernum)||""),[xe,be]=ut((_==null?void 0:_.presets)||"1"),[_e,Te]=ut((_==null?void 0:_.tmpset)||""),[$e,Se]=ut((_==null?void 0:_.tmpcur)||""),[Oe,ae]=ut([]),[ve,ke]=ut(Object.entries((_==null?void 0:_.pinact)||{})[0]||["",""]);lt(()=>{Zt((_==null?void 0:_.info)||""),ie((_==null?void 0:_.onoff)===1),ge((_==null?void 0:_.selsens)||"1"),de((_==null?void 0:_.sernum)||""),be((_==null?void 0:_.presets)||"1"),Te((_==null?void 0:_.tmpset)||""),Se((_==null?void 0:_.tmpcur)||""),ke(Object.entries((_==null?void 0:_.pinact)||{})[0]||["",""])},[_]),lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then($t=>{if(!$t.ok)throw new Error(`HTTP error! status: ${$t.status}`);return $t.json()}).then($t=>{if(!$t||!$t.data||!Array.isArray($t.data)){console.error("Invalid data format:",$t),ae([]);return}const te=$t.data.filter(re=>re.topin===5);ae(te)}).catch($t=>{console.error("Error fetching pin config:",$t),ae([])})},[_]);const fe=$t=>{$t.preventDefault();const te=ve[0]&&ve[1]!==void 0&&ve[1]!=="",re={id:_.id,pins:ve[0],pinact:te?{[ve[0]]:parseInt(ve[1])}:{},selsens:ce,sernum:ye,presets:xe,tmpset:_e,tmpcur:$e,info:ne,onoff:le?1:0};console.log("Data being sent to server:",re),fetch("/api/pid/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(re)}).then(me=>me.json()).then(me=>{console.log("Success:",me),mt({..._,...re}),st(),window.location.href="/#/pid"}).catch(me=>{console.error("Error:",me)})},pe=$t=>{if(!$t.target.value)ke(["",""]);else{const te=$t.target.value.split("|");ke([te[0],te[1]])}},Ce=PRESETS$1[ee]||PRESETS$1.en,pt=()=>k==="TabPid"&&$==="edit"?Et`
        <form onsubmit=${fe}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                ${[{label:"ID",value:_.id},{label:"PWM Pin",value:Et`
                        <select
                          value=${Oe.some($t=>String($t.pins)===String(ve[0]))?`${ve[0]}|${ve[1]}`:""}
                          onChange=${pe}
                          class="border rounded p-2 w-full"
                        >
                          <option value="">Select PWM pin</option>
                          ${Oe.map($t=>Et`
                              <option value=${`${$t.pins}|${$t.id}`}>
                                ${$t.pins} (ID: ${$t.id})
                              </option>
                            `)}
                        </select>
                      `},{label:"Selected sensor",value:Et`
                      <select
                        value=${ce}
                        onChange=${$t=>ge($t.target.value)}
                        class="border rounded p-2 w-full"
                      >
                        ${SENSOR_OPTIONS$1.map($t=>Et`
                            <option
                              value=${$t.value}
                              selected=${$t.value===ce}
                            >
                              ${$t.label}
                            </option>
                          `)}
                      </select>
                    `},{label:"Dev. ser. number",value:ce==="1"?Et`
                          <input
                            type="text"
                            value=${ye}
                            onInput=${$t=>de($t.target.value)}
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
                        value=${xe}
                        onChange=${$t=>be($t.target.value)}
                        class="border rounded p-2 w-full"
                      >
                        ${Ce.map($t=>Et`
                            <option
                              value=${$t.value}
                              selected=${$t.value===xe}
                            >
                              ${$t.label}
                            </option>
                          `)}
                      </select>
                    `},{label:"t_set",value:Et`
                      <input
                        type="text"
                        value=${_e}
                        onInput=${$t=>Te($t.target.value)}
                        class="border rounded p-2 w-full"
                        placeholder="°C"
                      />
                    `},{label:"t_current",value:Et`
                      <input
                        type="text"
                        value=${$e}
                        readOnly
                        class="border rounded p-2 w-full bg-gray-100 cursor-not-allowed"
                        placeholder="°C"
                      />
                    `},{label:"INFO",value:Et`
                      <input
                        type="text"
                        value=${ne}
                        onInput=${$t=>Zt($t.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    `},{label:"On/Off",value:Et`
                      <${Yt}
                        value=${le}
                        onChange=${$t=>ie($t)}
                      />
                    `}].map(($t,te)=>Et`
                    <tr class="${te%2===1?"bg-white":"bg-gray-200"}">
                      <td class="p-2 font-bold">${$t.label}</td>
                      <td class="p-2">${$t.value}</td>
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
      `:null,vt=Et`
    <div class=${`modal ${Xt||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${$t=>ct&&$t.target===$t.currentTarget&&st()}
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
            ${pt()}
          </div>
        </div>
      </div>
    </div>
  `,oe=at(null);return lt(()=>{const $t=document.createElement("div");return $t.id="modal-portal",document.body.appendChild($t),oe.current=$t,()=>{O(null,$t),document.body.removeChild($t)}},[]),lt(()=>{oe.current&&O(vt,oe.current)}),null}function initGlobalTooltip$3(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,mt=$.offsetHeight,ee=window.innerWidth,Xt=dt.getBoundingClientRect();let Yt=Xt.left+Xt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,ee-_-8));let ne=Xt.top-mt-8;ne<8&&(ne=Xt.bottom+8),$.style.left=Yt+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const PRESETS={ru:[{value:"1",label:"Паяльная станция T max=125°C, T min=-55°C"},{value:"2",label:"Кулер / вентилятор T max=70°C, T min=-55°C"},{value:"3",label:"3D‑принтер (стол) T max=120°C, T min=0°C"},{value:"4",label:"Форточный нагреватель T max=60°C, T min=-55°C"},{value:"5",label:"Тёплый пол T max=45°C, T min=0°C"},{value:"6",label:"Холодильник T max=100°C, T min=-55°C"},{value:"7",label:"Аквариум / бойлер T max=80°C, T min=0°C"},{value:"8",label:"Инкубатор T max=45°C, T min=0°C"},{value:"9",label:"Теплица / комната T max=50°C, T min=-55°C"}],en:[{value:"1",label:"Soldering station T max=125°C, T min=-55°C"},{value:"2",label:"Cooler / fan T max=70°C, T min=-55°C"},{value:"3",label:"3D printer (table) T max=120°C, T min=0°C"},{value:"4",label:"Vent heater T max=60°C, T min=-55°C"},{value:"5",label:"Warm floor T max=45°C, T min=0°C"},{value:"6",label:"Refrigerator T max=100°C, T min=-55°C"},{value:"7",label:"Aquarium / boiler T max=80°C, T min=0°C"},{value:"8",label:"Incubator T max=45°C, T min=0°C"},{value:"9",label:"Greenhouse / room T max=50°C, T min=-55°C"}]},SENSOR_OPTIONS=[{value:"1",label:"DS18B20"},{value:"2",label:"DHT-22"}],HELP_CONTENT$1={ru:Et`
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
  `,document.head.appendChild($)}function TabPid({}){const[$,k]=ut(null),[st,ct]=ut(null);at(null);const[dt,_]=ut(!1),[mt,ee]=ut(null),[Xt,Yt]=ut(null),[ne,Zt]=ut("ru"),[le,ie]=ut(!1),[ce,ge]=ut(0),[ye,de]=ut(0),xe=at(!1);lt(()=>{initGlobalTooltip$3(),initTuneStyles()},[]),lt(()=>{let te=!0;return registerPoll("pid","/api/state/pid",function(re){!te||xe.current||re!=null&&Array.isArray(re.pid)&&(k(re.pid),Zt(re.lang||"ru"),typeof re.pidline=="number"&&(de(re.pidline),ge(re.pidline)))},{immediate:!0}),function(){te=!1,unregisterPoll("pid")}},[]);const be=at(!0);lt(()=>{if(be.current){be.current=!1;return}_e(ye)},[ye]);const _e=te=>{xe.current=!0,fetch("/api/pidline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pidline:te})}).then(re=>re.json()).catch(re=>console.error("Error sending PID line to stm32:",re)).finally(()=>{setTimeout(()=>{xe.current=!1},1500)})},Te=()=>{if(ce<PID_MAX_SLOTS){const te=ce+1;ge(te),de(te)}},$e=()=>{if(ce>0){const te=ce-1;ge(te),de(te)}};if($===null)return Et`<div>Loading...</div>`;const Se=()=>({langtimers:ne==="ru"?rulangtimers:enlangtimers,langpid:ne==="ru"?rulangpid:enlangpid}),Oe=(te,re)=>{const me=Se(),Me=(me[te]&&me[te][re]?me[te][re]:"").split(" "),De=[];for(let Ee=0;Ee<Me.length;Ee+=15)De.push(Me.slice(Ee,Ee+15).join(" "));return De.join("<br>")},ae=(te,re)=>{ee(te),Yt(re),_(!0)},ve=()=>{_(!1),ee(null),Yt(null)},ke=te=>{console.log("handlePidChange:",te),k($.map(re=>re.id===te.id?te:re)),xe.current=!0,fetch("/api/pid/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(te)}).then(re=>re.json()).then(re=>{console.log("PID job updated successfully:",re)}).catch(re=>{console.error("Error updating PID job:",re)}).finally(()=>{setTimeout(()=>{xe.current=!1},1500)})},fe=te=>{const re=te.id,me=te.tune_state||0;if(!(me===TUNE_STEP||me===TUNE_BIAS)){if(me===TUNE_ERROR){pe(re);return}console.log("Run tune for id:",re),fetch("/api/pid/tune",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:re,action:"start"})}).then(Pe=>Pe.json()).then(Pe=>{console.log("Tune start response:",Pe)}).catch(Pe=>{console.error("Error starting tune:",Pe)})}},pe=te=>{console.log("Stop tune for id:",te),fetch("/api/pid/tune",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:te,action:"stop"})}).then(re=>re.json()).then(re=>{console.log("Tune stop response:",re)}).catch(re=>{console.error("Error stopping tune:",re)})},Ce=PRESETS[ne]||PRESETS.en,pt=te=>{const re=Ce.find(me=>me.value===String(te));return re?re.label:te},vt=te=>{const re=SENSOR_OPTIONS.find(me=>me.value===String(te));return re?re.label:te},oe=te=>Et`
    <th
      class="px-4 py-4 text-base font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Oe("langpid",te.tooltipIndex)}
    >
      ${te.title}
    </th>
  `,$t=(te,re)=>{const me=te.tune_state||0,Pe=te.tune_progress||0,Me=me===TUNE_STEP||me===TUNE_BIAS,De=me===TUNE_DONE,Ee=me===TUNE_ERROR,we=De?"background:linear-gradient(to right,#4ade80,#10b981);box-shadow:0 4px 14px rgba(16,185,129,0.4);":Ee?"background:linear-gradient(to right,#dc2626,#b91c1c);box-shadow:0 4px 14px rgba(220,38,38,0.5);animation:tuneBlink 1s ease-in-out infinite;":"background:linear-gradient(to right,#ef4444,#e11d48);box-shadow:0 4px 14px rgba(239,68,68,0.4);",se="px-3 py-1 rounded-full text-sm font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap",he=De?"Tuning Done":Ee?"⚠ Error!":"Run tune";if(Me){const ue=Pe.toFixed(1),Le=`Auto Tune (${me===TUNE_STEP?"Step test":"Bias search"})… ${Pe}%`;return Et`
        <tr key=${te.id} class="${re%2===1?"bg-white/80":"bg-sky-200/40"}">
          <td colspan="11" class="px-2 py-2">
            <div style="position:relative;width:100%;height:2.5rem;border-radius:0.75rem;overflow:hidden;background:#d1d5db;box-shadow:inset 0 2px 6px rgba(0,0,0,0.12);">
              <div
                style="position:absolute;left:0;top:0;bottom:0;width:${ue}%;background:linear-gradient(90deg,#22c55e 0%,#16a34a 60%,#4ade80 100%);border-radius:inherit;transition:width 0.3s ease;box-shadow:0 0 14px rgba(34,197,94,0.55);"
              ></div>
              <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;user-select:none;">
                <span style="font-size:0.875rem;font-weight:700;color:#111827;white-space:nowrap;">${Le}</span>
              </div>
            </div>
          </td>
          <td class="px-4 py-2 text-center">
            <button
              onclick=${()=>pe(te.id)}
              class="px-3 py-1 rounded-full text-sm font-bold text-white whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95"
              style="background:linear-gradient(to right,#f97316,#ef4444);box-shadow:0 4px 14px rgba(239,68,68,0.4);"
            >Stop</button>
          </td>
        </tr>
      `}return Et`
      <tr key=${te.id} class="${re%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-4 py-3 text-sm text-slate-800 font-medium">${te.id}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">
          ${(()=>{const ue=Object.entries(te.pinact||{});if(!ue.length)return"—";const[Ie,Le]=ue[0];return`${Ie}(${Le})`})()}
        </td>
        <td class="px-4 py-3 text-sm text-slate-700">${vt(te.selsens)}</td>
        <td class="px-4 py-3 text-sm font-mono ${te.selsens==="1"?"text-slate-700":"text-slate-400 italic"}">${te.selsens==="1"?te.sernum||"—":"N/A"}</td>
        <td class="px-4 py-3 text-sm text-slate-700">${pt(te.presets)}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">${te.tmpset}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">${te.tmpcur}</td>
        <td class="px-4 py-3 text-sm text-slate-800 font-mono ${te.onoff?"":"text-rose-500 font-bold"}">${te.onoff?te.duty!==void 0?te.duty:"—":"OFF"}</td>
        <td class="px-4 py-3 text-sm text-slate-600">${te.info}</td>
        <td class="px-4 py-3">
          <${MyPolzunok}
            value=${te.onoff}
            onChange=${ue=>ke({...te,onoff:ue})}
          />
        </td>
        <td class="px-4 py-3 text-center">
          <button
            onclick=${()=>ae("edit",te)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
          >Edit</button>
        </td>
        <td class="px-4 py-3 text-center">
          <button
            onclick=${()=>fe(te)}
            class="${se}"
            style="${we}"
          >${he}</button>
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
          ${ce>0?Et`
              <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
                <div class="overflow-x-auto w-full">
                  <table class="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                      <tr class="bg-teal-600/10 border-b border-teal-600/20">
                        <${oe} title="No" tooltipIndex=${1} />
                        <${oe} title="PWM Pin" tooltipIndex=${2} />
                        <${oe} title="Sel. sensor" tooltipIndex=${3} />
                        <${oe} title="Dev. ser. number" tooltipIndex=${4} />
                        <${oe} title="Presets" tooltipIndex=${5} />
                        <${oe} title="T set." tooltipIndex=${6} />
                        <${oe} title="T cur." tooltipIndex=${7} />
                        <${oe} title="Duty" tooltipIndex=${8} />
                        <${oe} title="Info" tooltipIndex=${9} />
                        <${oe} title="On/Off" tooltipIndex=${10} />
                        <${oe} title="Action" tooltipIndex=${11} />
                        <${oe} title="Auto tune" tooltipIndex=${12} />
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-white/40">
                      ${Array.from({length:ce},(te,re)=>{const me=$&&$[re]?$[re]:{id:re+1,pins:"",pinact:{},selsens:"",sernum:"",presets:"",tmpset:"",tmpcur:"",info:"",onoff:0,tune_state:0,tune_progress:0};return $t(me,re)})}
                    </tbody>
                  </table>
                </div>
              </div>
            `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No PID jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>ie(!le)}
          >
            ${le?"Hide Help":"Show Help"}
          </button>
          <div class="font-semibold text-slate-600 tracking-wide">
            ${$&&PID_MAX_SLOTS-ce>0?`Still available: ${PID_MAX_SLOTS-ce} PID jobs`:"No available: PID jobs!"}
          </div>
          <div class="flex gap-2">
            ${ce<PID_MAX_SLOTS?Et`
            <button
                class="bg-emerald-500 hover:bg-emerald-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-emerald-500/30"
                onclick=${Te}
                title="Add PID"
            >+</button>
            `:null}
            ${ce>0?Et`
                <button
                  class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                  onclick=${$e}
                  title="Remove PID"
                >-</button>
              `:null}
          </div>
        </div>
      </div>

      ${le&&Et`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">
          ${HELP_CONTENT$1[ne]||HELP_CONTENT$1.en}
        </div>
      `}

      ${dt?Et`
        <${ModalPid}
          modalType=${mt}
          page="TabPid"
          hideModal=${ve}
          title="Edit PID"
          selectedPid=${Xt}
          handlePidChange=${ke}
          language=${ne}
          modalClass="mt-24"
        />
      `:null}
    </div>
  `}function ModalEditSensor({typsensor:$,oneWireId:k,pins:st,onClose:ct,onUpdate:dt,sensorType:_,sensorData:mt,closeOnOverlayClick:ee=!0}){const[Xt,Yt]=ut({ut:(mt==null?void 0:mt.ut)||$.ut,lt:(mt==null?void 0:mt.lt)||$.lt,action_ut:(mt==null?void 0:mt.action_ut)||$.action_ut,action_lt:(mt==null?void 0:mt.action_lt)||$.action_lt,upphumid:(mt==null?void 0:mt.upphumid)||$.upphumid||0,humlolim:(mt==null?void 0:mt.humlolim)||$.humlolim||0,actuphum:(mt==null?void 0:mt.actuphum)||$.actuphum||"",actlowhum:(mt==null?void 0:mt.actlowhum)||$.actlowhum||"",info:(mt==null?void 0:mt.info)||$.info,onoff:(mt==null?void 0:mt.onoff)||$.onoff||0,humidity:(mt==null?void 0:mt.humidity)||$.humidity||0}),[ne,Zt]=ut(!1),le=(be,_e,Te)=>{if(be===""||be==="-")return be;const $e=be.replace(",",".");if(!/^-?\d*\.?\d*$/.test($e))return null;const Se=parseFloat($e);return isNaN(Se)||Se<_e||Se>Te?null:$e},ie=be=>{const{name:_e,value:Te}=be.target;if(["ut","lt"].includes(_e)){const $e=le(Te,-55,125);$e!==null&&Yt(Se=>({...Se,[_e]:$e}))}else if(["upphumid","humlolim"].includes(_e)){const $e=le(Te,0,100);$e!==null&&Yt(Se=>({...Se,[_e]:$e}))}else Yt($e=>({...$e,[_e]:Te}))},ce=be=>{const _e=["ut","lt","upphumid","humlolim"],Te={...be};return _e.forEach($e=>{Te[$e]===""||Te[$e]==="-"?Te[$e]=0:Te[$e]=parseFloat(Te[$e].toString().replace(",","."))}),Te},de=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onclick=${be=>{ee&&be.target===be.currentTarget&&ct()}}
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
        <form onsubmit=${async be=>{be.preventDefault(),Zt(!0);const _e=ce(Xt);try{if(!(await fetch("/api/sensor/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:k,pins:st,sensorNumber:$.s_number,..._e,s_number:$.s_number,t:$.t})})).ok)throw new Error("Network response was not ok");dt({...$,..._e,oneWireId:k,pins:st,s_number:$.s_number,t:$.t}),ct()}catch(Te){console.error("Error updating Sensor:",Te)}finally{Zt(!1)}}}>
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
                      oninput=${ie}
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
                      oninput=${ie}
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
                      oninput=${ie}
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
                      oninput=${ie}
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
                            oninput=${ie}
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
                            oninput=${ie}
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
                            oninput=${ie}
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
                            oninput=${ie}
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
                      oninput=${ie}
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
  `,xe=at(null);return lt(()=>{const be=document.createElement("div");return be.id="modal-portal-sensor",document.body.appendChild(be),xe.current=be,()=>{O(null,be),document.body.removeChild(be)}},[]),lt(()=>{xe.current&&O(de,xe.current)}),null}function ModalOneWire({oneWire:$,onClose:k,onUpdate:st,refresh:ct,closeOnOverlayClick:dt=!0}){console.log("oneWire object:",$);const[_,mt]=ut({typsensor:$.typsensor,numdevices:$.numdevices}),[ee,Xt]=ut(!1),[Yt,ne]=ut($.onoff||0),Zt=de=>{dt&&de.target===de.currentTarget&&k()},le=de=>{const{name:xe,value:be}=de.target;let _e={..._,[xe]:parseInt(be,10)};xe==="typsensor"&&(be==="0"?_e.numdevices=0:be==="2"&&(_e.numdevices=1)),mt(_e)},ie=de=>{ne(de)},ge=Et`
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
            disabled=${ee}
          >
            Close
          </button>
        </div>
        <form onsubmit=${async de=>{de.preventDefault(),Xt(!0);const xe={id:$.id,pin:$.pin,typsensor:_.typsensor,numdevices:_.numdevices,onoff:Yt};console.log("Sending data:",xe);try{if(!(await fetch("api/onewire/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(xe)})).ok)throw new Error("Network response was not ok");const _e={...$,..._,onoff:Yt};st(_e),k()}catch(be){console.error("Error updating OneWire:",be)}finally{Xt(!1)}}}>
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
                      onchange=${le}
                      class="border rounded p-2 w-full"
                      disabled=${ee}
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
                      oninput=${_.typsensor===1?le:void 0}
                      class="border rounded p-2 w-full ${_.typsensor!==1?"bg-gray-100":""}"
                      min="0"
                      max="10"
                      readonly=${_.typsensor!==1}
                      disabled=${ee}
                    />
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="p-2 font-bold">On/Off</td>
                  <td class="p-2">
                    <${MyPolzunok}
                      value=${Yt}
                      onChange=${ie}
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
              disabled=${ee}
            >
              ${ee?"Saving...":"Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,ye=at(null);return lt(()=>{const de=document.createElement("div");return de.id="modal-portal-onewire",document.body.appendChild(de),ye.current=de,()=>{O(null,de),document.body.removeChild(de)}},[]),lt(()=>{ye.current&&O(ge,ye.current)}),null}function initGlobalTooltip$2(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,mt=$.offsetHeight,ee=window.innerWidth,Xt=dt.getBoundingClientRect();let Yt=Xt.left+Xt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,ee-_-8));let ne=Xt.top-mt-8;ne<8&&(ne=Xt.bottom+8),$.style.left=Yt+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const _stateLabel=$=>$==="1"?"ON":$==="0"?"OFF":$==="2"?"TG":$??"?",_stateColor=$=>$==="1"?"#16a34a":$==="0"?"#dc2626":$==="2"?"#d97706":"#64748b",_parseAction=$=>$?$.split(",").map(k=>{const[st,ct]=k.trim().split(":");return{pin:st==null?void 0:st.trim(),state:ct==null?void 0:ct.trim()}}).filter(k=>k.pin!==void 0&&k.pin!==""):[],ActionBadge=({isUpper:$,isHumid:k,value:st,unit:ct,str:dt})=>{const _=_parseAction(dt),mt=(k?"💧 ":"")+($?"↑":"↓");return Et`
    <span style="display:inline-flex;align-items:center;gap:4px;background:${$?"#fff7ed":"#eff6ff"};border:1.5px solid ${$?"#fdba74":"#93c5fd"};border-radius:10px;padding:3px 10px;font-size:12px;font-weight:600;white-space:nowrap;line-height:1.6;">
      <span style="color:${$?"#9a3412":"#1e3a5f"};margin-right:2px;">${mt} ${st??"—"}${ct}:</span>
      ${_.length===0?Et`<span style="color:#94a3b8;">[—]</span>`:Et`
          <span style="color:#475569;">[</span>
          ${_.map(({pin:ne,state:Zt},le)=>Et`
            <span>
              <span style="color:#94a3b8;font-weight:400;">id</span><span style="color:#334155;font-weight:700;">${ne}</span><span style="color:#475569;">:</span><span style="color:${_stateColor(Zt)};font-weight:700;">${_stateLabel(Zt)}</span>${le<_.length-1?Et`<span style="color:#94a3b8;">,${" "}</span>`:""}
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
  `},TabOneWire=()=>{const[$,k]=ut([]),[st,ct]=ut(null),[dt,_]=ut(!1),[mt,ee]=ut(null),[Xt,Yt]=ut(null),[ne,Zt]=ut("ru"),[le,ie]=ut(!1),[ce,ge]=ut({}),ye={ru:{colId:"ID",colPin:"Пин",colSensor:"Выбранный сенсор",colCount:"Кол-во сенсоров",colOnOff:"Вкл/Выкл",colActions:"Действия",noSensors:"Нет сенсоров для этого OneWire пина.",noData:"Нет данных сенсора для этого OneWire пина.",noPins:"Нет настроенных OneWire пинов!",errFetch:pt=>`Ошибка получения данных: ${pt}`,edit:"Ред.",showHelp:"Показать справку",hideHelp:"Скрыть справку",title:"OneWire(s) pin(s)"},en:{colId:"ID",colPin:"Pin",colSensor:"Selected sensor",colCount:"Count of sensors",colOnOff:"On/Off",colActions:"Actions",noSensors:"No connected sensors for this OneWire pin.",noData:"No sensor data available for this OneWire pin.",noPins:"No available pins configured as OneWire!",errFetch:pt=>`Error fetching sensor data: ${pt}`,edit:"Edit",showHelp:"Show Help",hideHelp:"Hide Help",title:"OneWire(s) pin(s)"}},de=ye[ne]||ye.en,xe=pt=>ge(vt=>({...vt,[pt]:!vt[pt]})),be=pt=>typeof pt=="string"?pt.replace(/[^\x20-\x7E\u0400-\u04FF]/g,""):pt;lt(()=>{initGlobalTooltip$2()},[]);const _e=pt=>{pt&&k(vt=>vt.map(oe=>{const $t=oe.typsensor||oe.typsensr;if(!oe.sensors||![1,2].includes($t))return oe;const te=oe.sensors.map(re=>{var me,Pe;if($t===1){const Me=(me=pt.ds18b20)==null?void 0:me.find(De=>De.addr===re.s_number);return Me?{...re,t:Me.temp}:re}else if($t===2){const Me=(Pe=pt.dht22)==null?void 0:Pe.find(De=>De.id===oe.id);return Me?{...re,t:Me.temp,humidity:Me.humidity}:re}return re});return{...oe,sensors:te}}))},Te=()=>{registerPoll("onewire_init","/api/onewire/get",function(pt){Zt(pt.lang||"ru"),k(pt.pins||[]),ct(null),registerPoll("sensors","/api/state/sensors",function(vt){vt!=null&&_e(vt)},{immediate:!0})},{immediate:!0,oneShot:!0})};lt(()=>(Te(),function(){unregisterPoll("onewire_init"),unregisterPoll("sensors")}),[]);const $e=()=>{_(!1),ee(null),Yt(null)},Se=pt=>{k(vt=>vt.map(oe=>{var $t;return oe.id===pt.oneWireId?{...oe,sensors:($t=oe.sensors)==null?void 0:$t.map(te=>te.s_number===pt.s_number?{...te,...pt}:te)}:oe})),$e()},Oe=pt=>{Yt(pt),_(!0)},ae=pt=>{const vt=ne==="ru"?rulange1Wire:enlange1Wire,$t=(vt&&vt[pt]?vt[pt]:"").split(" "),te=[];for(let re=0;re<$t.length;re+=15)te.push($t.slice(re,re+15).join(" "));return te.join("<br>")},ve=({title:pt,tooltipIndex:vt})=>Et`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help" data-tip=${ae(vt)}>
      ${pt}
    </th>
  `,ke=({device:pt,index:vt})=>{const oe=!!ce[pt.id],$t=pt.typsensor||pt.typsensr||0,te=pt.numdevices||pt.numsens||0,re=$t!==0&&te>0;return Et`
      <tbody key=${"db-"+pt.id}>
        <tr class="${vt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors ${re?"cursor-pointer":""}" onclick=${()=>re&&xe(pt.id)}>
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${pt.id}</td>
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${pt.pins||pt.pin}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${["None","DS18B20","DHT22"][$t]}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${te}</td>
          <td class="px-6 py-4" onclick=${me=>me.stopPropagation()}>
            <${MyPolzunok} value=${pt.onoff||0} onChange=${me=>Ce({...pt,onoff:me})} />
          </td>
          <td class="px-6 py-4" onclick=${me=>me.stopPropagation()}>
            <button class="text-blue-600 hover:text-blue-800 font-semibold transition-colors" onclick=${()=>Oe(pt)}>${de.edit}</button>
            ${re&&Et`<span class="ml-3 text-slate-400 text-xs">${oe?"▲":"▼"}</span>`}
          </td>
        </tr>
        ${oe&&re?Et`
          <tr>
            <td colspan="6" class="px-4 py-3 bg-gradient-to-r from-cyan-50/80 via-slate-50/60 to-blue-50/80 border-t">
              <${fe} d=${pt} />
            </td>
          </tr>
        `:""}
      </tbody>
    `},fe=({d:pt})=>{const vt=pt.typsensor||pt.typsensr||0,oe=pt.numdevices||pt.numsens||0;if(vt===0||oe===0)return Et`<div class="px-4 py-2 text-slate-500 font-medium">${de.noSensors}</div>`;let $t=pt.sensors||[];const te=["bg-cyan-50/60 border-cyan-200/50","bg-slate-100/70 border-slate-200/50"];return $t.length>0&&Object.keys($t).length>0?Et`<div class="flex flex-col gap-2 w-full">${$t.map((re,me)=>Et`
          <div class="w-full flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 rounded-xl border ${te[me%2]} backdrop-blur-sm shadow-sm">
            ${vt===2?Et`<span class="font-mono text-base font-semibold text-teal-700">DHT22</span>`:Et`
              <span class="flex items-center gap-2">
                <span class="font-mono text-base font-semibold text-slate-500">SN</span>
                <span class="font-mono text-base text-slate-700 select-all">${be(re.s_number)}</span>
                <button class="px-4 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${Pe=>{Pe.stopPropagation(),navigator.clipboard.writeText(be(re.s_number)),Pe.target.textContent="Copied!",setTimeout(()=>Pe.target.textContent="copy SN",1500)}}>copy SN</button>
              </span>
            `}
            <span class="text-slate-300">|</span>
            <span class="font-bold text-cyan-700">${re.t??"—"}°C 🌡</span>
            ${vt===2&&"humidity"in re?Et`<span class="font-bold text-teal-600">${re.humidity}% 💧</span>`:""}
            <span class="text-slate-300">|</span>
            <${ActionBadge} isUpper=${!0} value=${re.ut} unit="°C" str=${re.action_ut} />
            <${ActionBadge} isUpper=${!1} value=${re.lt} unit="°C" str=${re.action_lt} />
            <a href="#" class="ml-auto text-blue-600 font-semibold text-sm uppercase px-3 py-1 bg-white/70 rounded-lg" onclick=${Pe=>{Pe.preventDefault(),ee({...re,oneWireId:pt.id,sensorType:vt,pins:pt.pins||pt.pin}),_(!0)}}>${de.edit}</a>
          </div>
        `)}</div>`:Et`<div class="px-4 py-4 text-slate-500 font-medium bg-white/50 rounded-xl text-center w-full">${de.noData}</div>`},pe=pt=>{k(vt=>vt.map(oe=>oe.id===pt.id?pt:oe)),$e()},Ce=pt=>{k(vt=>vt.map(oe=>oe.id===pt.id?{...oe,onoff:pt.onoff}:oe))};return Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col items-center">
      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 uppercase">${de.title}</div>
        <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
          <table class="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr class="bg-teal-600/10 border-b border-teal-600/20">
                <${ve} title=${de.colId} tooltipIndex=${1} />
                <${ve} title=${de.colPin} tooltipIndex=${2} />
                <${ve} title=${de.colSensor} tooltipIndex=${3} />
                <${ve} title=${de.colCount} tooltipIndex=${4} />
                <${ve} title=${de.colOnOff} tooltipIndex=${5} />
                <${ve} title=${de.colActions} tooltipIndex=${6} />
              </tr>
            </thead>
            ${$.length>0?$.map((pt,vt)=>Et`<${ke} device=${pt} index=${vt} key=${pt.id} />`):Et`<tbody><tr><td colspan="6" class="px-4 py-2">${st?de.errFetch(st):de.noPins}</td></tr></tbody>`}
          </table>
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-2xl">
          <button class="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${()=>ie(!le)}>
            ${le?de.hideHelp:de.showHelp}
          </button>
        </div>
        ${le&&Et`<div class="mt-2 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner w-full">${HELP_CONTENT[ne]||HELP_CONTENT.en}</div>`}
      </div>
    </div>
    ${dt&&(mt?Et`<${ModalEditSensor} typsensor=${mt} oneWireId=${mt.oneWireId} pins=${mt.pins} onClose=${$e} onUpdate=${Se} sensorType=${mt.sensorType} closeOnOverlayClick=${!0} refresh=${Te} />`:Et`<${ModalOneWire} oneWire=${Xt} onClose=${$e} onUpdate=${pe} closeOnOverlayClick=${!0} refresh=${Te} />`)}
  `};function ModalSIM800L({hideModal:$,title:k,selectedGps:st,onSave:ct}){const[dt,_]=ut((st==null?void 0:st.tel)||""),[mt,ee]=ut((st==null?void 0:st.info)||""),[Xt,Yt]=ut((st==null?void 0:st.onoff)===1),[ne,Zt]=ut(!0),le=de=>/^\+\d{11,20}$/.test(de),ge=Et`
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

          <form onSubmit=${de=>{if(de.preventDefault(),!ne)return;const xe={type:"sim800l",tel:dt,info:mt,onoff:Xt?1:0};console.log("Сохраняемые данные:",xe),fetch("/api/security/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(xe)}).then(be=>be.json()).then(be=>{typeof ct=="function"&&ct(xe),$()}).catch(be=>{console.error("Error:",be)})}}>
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
                        onInput=${de=>{const xe=de.target.value;_(xe),Zt(le(xe))}}
                        class=${`border rounded p-2 w-full ${!ne&&dt!==""?"border-red-500":""}`}
                        placeholder="+XXXXXXXXXXX"
                      />
                      ${!ne&&dt!==""?Et`
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
                        value=${mt}
                        onInput=${de=>ee(de.target.value)}
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
                disabled=${!ne||dt===""}
                class=${`font-bold py-2 px-4 rounded ${ne&&dt!==""?"bg-blue-500 hover:bg-blue-700 text-white":"bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,ye=at(null);return lt(()=>{const de=document.createElement("div");return de.id="modal-portal",document.body.appendChild(de),ye.current=de,()=>{O(null,de),document.body.removeChild(de)}},[]),lt(()=>{ye.current&&O(ge,ye.current)}),null}const ModalSecurity=({modalType:$,page:k,hideModal:st,title:ct,selectedSecurity:dt,onSecurityChange:_,SliderComponent:mt=MyPolzunok})=>{const[ee,Xt]=ut((dt==null?void 0:dt.info)||""),[Yt,ne]=ut((dt==null?void 0:dt.onoff)||0),[Zt,le]=ut((dt==null?void 0:dt.ptype)||0),[ie,ce]=ut((dt==null?void 0:dt.send_sms)||""),[ge,ye]=ut((dt==null?void 0:dt.action)||""),[de,xe]=ut([]),[be,_e]=ut({send_sms:null,action:null}),[Te,$e]=ut(null),Se=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,Oe=(vt,oe)=>!oe||oe.trim()===""||oe.toLowerCase()==="none"?null:vt==="action"?Se.test(oe)?null:'Incorrect format. Use "None" or "pin:value" format.':oe.length>100?"Text should not exceed 100 characters":null,ae=(vt,oe)=>{const $t=Oe(vt,oe);switch(_e(te=>({...te,[vt]:$t})),vt){case"send_sms":ce(oe);break;case"action":ye(oe);break}};lt(()=>{fetch("/api/security/get").then(vt=>vt.json()).then(vt=>{const oe=vt.pins||vt;Array.isArray(oe)?xe(oe.filter($t=>$t.topin===2)):xe([])}).catch(vt=>{console.error("Error fetching pin config:",vt),xe([])})},[]);const ve=vt=>{if(vt.preventDefault(),Object.values(be).some($t=>$t!==null)){$e("Please correct the errors before submitting.");return}const oe={type:"monitoring",...dt,info:ee,send_sms:ie||"NO",action:ge||"None",onoff:Yt,ptype:Zt};fetch("/api/security/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(oe)}).then($t=>{if(!$t.ok)throw new Error("Network response was not ok");return $t.json()}).then($t=>{if($t.error)throw new Error($t.error);_(oe),st()}).catch($t=>{console.error("Error:",$t),$e("Failed to save changes. Please try again.")})},ke=()=>{le(0),ce(""),ye(""),Xt(""),ne(0),_e({send_sms:null,action:null})},Ce=Et`
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
    <form onSubmit=${ve}>
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
                  value=${de.some(vt=>vt.pins===(dt==null?void 0:dt.setrpins))?dt==null?void 0:dt.setrpins:""}
                  onChange=${vt=>_({...dt,setrpins:vt.target.value})}
                  class="border rounded p-2 w-full"
                >
                  <option value="">Select a connection</option>
                  ${de.map(vt=>Et`
                      <option value=${vt.pins}>
                        ${vt.pins} (ID: ${vt.id})
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
    <form onSubmit=${ve}>
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
                  onChange=${vt=>le(parseInt(vt.target.value))}
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
                  value=${ge}
                  onInput=${vt=>ae("action",vt.target.value)}
                  class="border rounded p-2 w-full ${be.action?"border-red-500":""}"
                  placeholder="None"
                />
                ${be.action&&Et`<p class="text-red-500 text-sm">${be.action}</p>`}
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Send SMS</td>
              <td class="p-2">
                <select
                  name="send_sms"
                  value=${ie}
                  onchange=${vt=>ae("send_sms",vt.target.value)}
                  class="border rounded p-2 w-full ${be.send_sms?"border-red-500":""}"
                >
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                </select>
                ${be.send_sms&&Et` <p class="text-red-500 text-sm">${be.send_sms}</p> `}
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">INFO</td>
              <td class="p-2">
                <input
                  type="text"
                  name="info"
                  value=${ee}
                  onInput=${vt=>Xt(vt.target.value)}
                  class="border rounded p-2 w-full"
                />
              </td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">On/Off</td>
              <td class="p-2">
                <${mt} value=${Yt} onChange=${ne} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-between mt-4">
        <button
          type="button"
          onClick=${ke}
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
      ${Te&&Et`<p class="text-red-500 mt-2">${Te}</p>`}
    </form>
  `}
        </div>
      </div>
    </div>
  `,pt=at(null);return lt(()=>{const vt=document.createElement("div");return vt.id="modal-portal",document.body.appendChild(vt),pt.current=vt,()=>{O(null,vt),document.body.removeChild(vt)}},[]),lt(()=>{pt.current&&O(Ce,pt.current)}),null};function initGlobalTooltip$1(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,mt=$.offsetHeight,ee=window.innerWidth,Xt=dt.getBoundingClientRect();let Yt=Xt.left+Xt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,ee-_-8));let ne=Xt.top-mt-8;ne<8&&(ne=Xt.bottom+8),$.style.left=Yt+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabSecurity=()=>{const[$,k]=ut({lang:"ru",sim800l:0,onoff:0,tel:"",info:""}),[st,ct]=ut(!1),[dt,_]=ut(!1),[mt,ee]=ut([]),[Xt,Yt]=ut(!1),[ne,Zt]=ut("ru"),[le,ie]=ut(!1),[ce,ge]=ut(""),[ye,de]=ut(null),[xe,be]=ut(!1),[_e,Te]=ut("connected"),[$e,Se]=ut(0),Oe={ru:{titleSim:"SIM800L Settings",titlePins:"Security Pins",colRx:"RXD Pin",colTx:"TXD Pin",colPhone:"Phone Number",colInfo:"Info",colOnOff:"OnOff",colAction:"Action",colId:"ID",colPin:"Pin",colType:"Type of sensor",colSendSms:"Send SMS",colEditPin:"Edit Pin",notConfigured:"Не настроено",notSet:"Не задан",noInfo:"Нет инфо",noData:"Нет доступных данных мониторинга",edit:"Ред.",showHelp:"Показать справку",hideHelp:"Скрыть справку",connRetry:"Connection problems. Retrying...",connLost:"Connection lost. Check your internet connection."},en:{titleSim:"SIM800L Settings",titlePins:"Security Pins",colRx:"RXD Pin",colTx:"TXD Pin",colPhone:"Phone Number",colInfo:"Info",colOnOff:"OnOff",colAction:"Action",colId:"ID",colPin:"Pin",colType:"Type of sensor",colSendSms:"Send SMS",colEditPin:"Edit Pin",notConfigured:"Not configured",notSet:"Not set",noInfo:"No info",noData:"No monitoring data available",edit:"Edit",showHelp:"Show Help",hideHelp:"Hide Help",connRetry:"Connection problems. Retrying...",connLost:"Connection lost. Check your internet connection."}},ae=Oe[ne]||Oe.en,ve={ru:Et`
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
      </div>`},ke={ru:Et`
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
      </div>`};lt(()=>{initGlobalTooltip$1()},[]);const fe=vt=>{if(!(xe||Date.now()-$e<2e3)){if(!vt){Te("error");return}k({lang:vt.lang,sim800l:vt.sim800l,onoff:vt.onoff,tel:vt.tel,info:vt.info}),ee(vt.pins||[]),Te("connected")}};lt(()=>{let vt=!0;return registerPoll("security","/api/state/security",function(oe){vt&&oe!=null&&(Zt(oe.lang||"ru"),fe(oe))},{immediate:!0}),function(){vt=!1,unregisterPoll("security")}},[]);const pe=async vt=>{be(!0);try{await fetch("/api/security/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"sim800l",...vt})}),k(vt),Se(Date.now())}finally{be(!1)}},Ce=(vt,oe)=>{const $t=vt&&vt[oe]?vt[oe]:"",te=[],re=$t.split(" ");for(let me=0;me<re.length;me+=15)te.push(re.slice(me,me+15).join(" "));return te.join("<br>")},pt=({title:vt,langArr:oe,tooltipIndex:$t})=>Et`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help" data-tip=${Ce(oe,$t)}>${vt}</th>
  `;return Et`
    <div class="flex flex-col items-center w-full p-4">
      ${_e!=="connected"&&Et`
        <div class="w-full p-2 mb-4 text-white text-center rounded-xl shadow-md backdrop-blur-md ${_e==="error"?"bg-yellow-500/80":"bg-red-500/80"}">
          ${_e==="error"?ae.connRetry:ae.connLost}
        </div>
      `}
      <div class="flex flex-col items-center w-full p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 relative overflow-hidden">
        <div class="w-full mb-10">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">${ae.titleSim}</h2>
          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-teal-600/10 border-b border-teal-600/20">
                  <${pt} title=${ae.colRx} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${1} />
                  <${pt} title=${ae.colTx} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${2} />
                  <${pt} title=${ae.colPhone} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${3} />
                  <${pt} title=${ae.colInfo} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${4} />
                  <${pt} title=${ae.colOnOff} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${5} />
                  <${pt} title=${ae.colAction} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${6} />
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                <tr class="bg-white/80 hover:bg-slate-200/80 transition-colors">
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.sim800l===1?"PA3(1)":ae.notConfigured}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.sim800l===1?"PD5(35)":ae.notConfigured}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.tel||ae.notSet}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.info||ae.noInfo}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium"><${MyPolzunok} value=${$.onoff} onChange=${vt=>pe({...$,onoff:vt})} /></td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium"><button onClick=${()=>ct(!0)} class="text-teal-600 hover:text-cyan-600 font-bold transition-colors">${ae.edit}</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-end mt-6 w-full"><button onclick=${()=>_(!dt)} class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40">${dt?ae.hideHelp:ae.showHelp}</button></div>
          ${dt&&Et`<div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">${ve[ne]}</div>`}
        </div>

        <div class="w-full">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">${ae.titlePins}</h2>
          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-teal-600/10 border-b border-teal-600/20">
                  <${pt} title=${ae.colId} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${1} />
                  <${pt} title=${ae.colPin} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${2} />
                  <${pt} title=${ae.colType} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${3} />
                  <${pt} title=${ae.colAction} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${4} />
                  <${pt} title=${ae.colSendSms} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${5} />
                  <${pt} title=${ae.colInfo} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${6} />
                  <${pt} title=${ae.colOnOff} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${7} />
                  <${pt} title=${ae.colEditPin} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${8} />
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                ${mt.length>0?mt.map((vt,oe)=>Et`
                  <tr class="${oe%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${vt.id}</td><td class="px-6 py-4 text-sm text-slate-800 font-medium">${vt.pins}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${["PIR","Normal open","Normal close"][vt.ptype]}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${vt.action}</td><td class="px-6 py-4 text-sm text-slate-800 font-medium">${vt.send_sms}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${vt.info}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium"><${MyPolzunok} value=${vt.onoff} onChange=${$t=>{Se(Date.now()),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:vt.id,onoff:$t})}),ee(te=>te.map(re=>re.id===vt.id?{...re,onoff:$t}:re))}} /></td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium"><button onClick=${()=>{de(vt),ge("edit"),ie(!0)}} class="text-teal-600 hover:text-cyan-600 font-bold transition-colors">${ae.edit}</button></td>
                  </tr>`):Et`<tr><td colspan="8" class="px-6 py-4 text-center text-sm text-slate-600 font-medium">${ae.noData}</td></tr>`}
              </tbody>
            </table>
          </div>
          <div class="flex justify-end mt-6 w-full"><button onclick=${()=>Yt(!Xt)} class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40">${Xt?ae.hideHelp:ae.showHelp}</button></div>
          ${Xt&&Et`<div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">${ke[ne]}</div>`}
        </div>
      </div>
      ${st&&Et`<${ModalSIM800L} hideModal=${()=>ct(!1)} title=${ae.edit} selectedGps=${$} onSave=${pe} />`}
      ${le&&Et`<${ModalSecurity} modalType=${ce} page="TabSecurity" hideModal=${()=>ie(!1)} title=${ae.edit} selectedSecurity=${ye} onSecurityChange=${vt=>{ee(oe=>oe.map($t=>$t.id===vt.id?vt:$t)),ie(!1)}} />`}
    </div>
  `};function initGlobalTooltip(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"320px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,mt=$.offsetHeight,ee=window.innerWidth,Xt=dt.getBoundingClientRect();let Yt=Xt.left+Xt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,ee-_-8));let ne=Xt.top-mt-8;ne<8&&(ne=Xt.bottom+8),$.style.left=Yt+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const SETTINGS_TIP_IDX={Login:1,Password:2,"Time zone UTC":3,"IP address":4,"Subnet mask":5,"Default gateway":6,Token:7,Host:8,Port:9,Client:10,User:11,"Password (MQTT)":12,"TX topic":13,"RX topic":14,"HTTPS domain":15,"Private Key":16,"Public Key":17,Longitude:18,Latitude:19,Sunrise:20,Sunset:21,"Day Length":22,"Next full moon":23,Date:24,Time:25},getTip=($,k,st,ct)=>{const dt=k==="ru"?st:ct,_=SETTINGS_TIP_IDX[$];if(!_||!dt||!dt[_])return"";const mt=dt[_].split(" "),ee=[];for(let Xt=0;Xt<mt.length;Xt+=12)ee.push(mt.slice(Xt,Xt+12).join(" "));return ee.join("<br>")},FieldRow=({label:$,tipLabel:k,index:st,tip:ct,children:dt})=>{const _=st%2===0?"bg-white/80":"bg-sky-200/40";return Et`
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
  `},LOG_CATEGORIES=[{id:0,key:"SYSTEM",labelEn:"System",labelRu:"Система"},{id:1,key:"MQTT",labelEn:"MQTT",labelRu:"MQTT"},{id:2,key:"NET",labelEn:"Network",labelRu:"Сеть"},{id:3,key:"GSM",labelEn:"GSM",labelRu:"GSM"},{id:4,key:"SCHEDULER",labelEn:"Scheduler",labelRu:"Планировщик"},{id:5,key:"SENSORS",labelEn:"Sensors",labelRu:"Датчики"},{id:6,key:"PID",labelEn:"PID Controller",labelRu:"ПИД-регулятор"},{id:7,key:"SETTINGS",labelEn:"Settings",labelRu:"Настройки"},{id:8,key:"ETH",labelEn:"Ethernet",labelRu:"Ethernet"},{id:9,key:"PHY",labelEn:"PHY",labelRu:"PHY"}];function Settings({}){const[$,k]=ut({}),[st,ct]=ut(null),[dt,_]=ut(null),[mt,ee]=ut({}),Xt=at(null),[Yt,ne]=ut(null),[Zt,le]=ut(null),[ie,ce]=ut(!1),[ge,ye]=ut(!1),[de,xe]=ut(!1),[be,_e]=ut(!1),[Te,$e]=ut(!1),[Se,Oe]=ut(!0),ae=at(0),[ve,ke]=ut(!1);lt(()=>{if(initGlobalTooltip(),!document.getElementById("__network_toggle_style")){const se=document.createElement("style");se.id="__network_toggle_style",se.textContent=".network-toggle span { display: none !important; }",document.head.appendChild(se)}},[]);const fe=se=>getTip(se,$.lang||"ru",rulangsettings,enlangsettings),pe=[{value:"en",label:"English"},{value:"ru",label:"Russian"}],Ce=[[-12,"(GMT -12:00) Eniwetok, Kwajalein"],[-11,"(GMT -11:00) Midway Island, Samoa"],[-10,"(GMT -10:00) Hawaii"],[-9,"(GMT -9:00) Alaska"],[-8,"(GMT -8:00) Pacific Time (US & Canada)"],[-7,"(GMT -7:00) Mountain Time (US & Canada)"],[-6,"(GMT -6:00) Central Time (US & Canada), Mexico City"],[-5,"(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima"],[-4,"(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz"],[-3.3,"(GMT -3:30) Newfoundland"],[-3,"(GMT -3:00) Brazil, Buenos Aires, Georgetown"],[-2,"(GMT -2:00) Mid-Atlantic"],[-1,"(GMT -1:00) Azores, Cape Verde Islands"],[0,"(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca"],[1,"(GMT +1:00) Brussels, Copenhagen, Madrid, Paris"],[2,"(GMT +2:00) Kaliningrad, South Africa"],[3,"(GMT +3:00) Moscow, St. Petersburg, Baghdad, Riyadh"],[3.3,"(GMT +3:30) Tehran"],[4,"(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi"],[4.3,"(GMT +4:30) Kabul"],[5,"(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"],[5.3,"(GMT +5:30) Bombay, Calcutta, Madras, New Delhi"],[5.45,"(GMT +5:45) Kathmandu"],[6,"(GMT +6:00) Almaty, Dhaka, Colombo"],[7,"(GMT +7:00) Bangkok, Hanoi, Jakarta"],[8,"(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"],[9,"(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"],[9.3,"(GMT +9:30) Adelaide, Darwin"],[10,"(GMT +10:00) Eastern Australia, Guam, Vladivostok"],[11,"(GMT +11:00) Magadan, Solomon Islands, New Caledonia"],[12,"(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"]],pt=/^(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)$/,vt=se=>{if(!se)return{date:"",time:""};const he=se.match(/d:(\d{1,2}\.\d{1,2}\.\d{2})/),ue=se.match(/t:(\d{2}:\d{2}:\d{2})/);return{date:he?he[1]:"",time:ue?ue[1]:""}},oe=se=>{if(!/^\d{1,2}\.\d{1,2}\.\d{2}$/.test(se))return!1;const[ue,Ie,Le]=se.split(".").map(Number);if(Ie<1||Ie>12||ue<1||ue>31||Le<0||Le>99)return!1;const Ne=new Date().getFullYear()%100;if(Le>Ne+5)return!1;const Re=new Date(2e3+Le,Ie,0).getDate();return!(ue>Re)},$t=se=>/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(se),te=(se,he)=>{const ue=Object.values(he).some(Le=>Le!==null),Ie=se.usehttps?se.domain&&se.domain.trim()!=="":!0;return!(ue||!Ie)},re=(se,he)=>{ne({message:se,type:he}),setTimeout(()=>{ne(null)},3e3)},me=se=>{le(se),setTimeout(()=>{le(null)},3e3)},Pe=(se,he)=>{let ue=null;if(!$.usehttps&&["domain","tls_key","tls_cert","tls_ca","telegram_token"].includes(se))return null;if(!he&&["ip_addr","gateway","mqtt_hst","sb_mask","offdate","offtime","domain"].includes(se))return"Поле не может быть пустым";switch(se){case"ip_addr":case"gateway":case"mqtt_hst":he.length>50&&(ue="Слишком длинное имя хоста");break;case"sb_mask":pt.test(he)||(ue="Неверная маска подсети");break;case"offdate":oe(he)||(ue="Неверный формат даты (д.м.гг)");break;case"offtime":$t(he)||(ue="Неверный формат времени (чч:мм:сс)");break;case"domain":he.length>50?ue="Домен не должен превышать 50 символов":he.match(/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/)||(ue="Неверный формат домена");break;case"tls_key":he&&he.trim()!==""&&(he.length>512?ue="Private Key не должен превышать 512 символов":(!he.includes("BEGIN EC PRIVATE KEY")||!he.includes("END EC PRIVATE KEY"))&&(ue="Неверный формат Private Key"));break;case"tls_cert":he&&he.trim()!==""&&(he.length>1024?ue="Public Key не должен превышать 1024 символов":(!he.includes("BEGIN CERTIFICATE")||!he.includes("END CERTIFICATE"))&&(ue="Неверный формат Public Key"));break;case"tls_ca":he&&he.trim()!==""&&(he.length>1024?ue="Secret Key не должен превышать 1024 символов":(!he.includes("BEGIN CERTIFICATE")||!he.includes("END CERTIFICATE"))&&(ue="Неверный формат Secret Key"));break}return ue},Me=se=>{const he=($.lang||"ru")==="ru";k(ue=>({...ue,log_filter_mask:se})),fetch("/api/logfilter",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({mask:se})}).then(ue=>{if(!ue.ok)throw new Error("Network error");return ue.json()}).then(ue=>{ue.status&&re(he?"Фильтр логов обновлен в RAM":"Log filter updated in RAM","success")}).catch(ue=>{console.error("Error applying log filter in RAM:",ue),re(he?"Ошибка обновления RAM фильтра":"Error updating RAM log filter","error")})},De=se=>{se.preventDefault();const he=new FormData(Xt.current);let ue={...$};for(const[Ie,Le]of he.entries())["lon_de","lat_de","timezone","mqtt_prt"].includes(Ie)?ue[Ie]=Le===""||Le===null?0:Number(Le):ue[Ie]=Le;ue.usehttps||["tls_ca","tls_key","tls_cert","telegram_token","domain"].forEach(Ie=>delete ue[Ie]),ue.offdate&&ue.offtime?ue.offldt=`d:${ue.offdate} t:${ue.offtime}`:delete ue.offldt,["lon_de","lat_de","timezone","mqtt_prt"].forEach(Ie=>{(ue[Ie]===null||ue[Ie]==="")&&(ue[Ie]=0)}),ue.onsunrise=ue.onsunrise?1:0,ue.onsunset=ue.onsunset?1:0,ue.check_ip=ue.check_ip?1:0,ue.check_mqtt=ue.check_mqtt?1:0,ue.usehttps=ue.usehttps?1:0,fetch("/api/mysett/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ue)}).then(Ie=>{if(!Ie.ok)throw new Error("Ошибка сети");return Ie.json()}).then(Ie=>{_("success"),ct(Ie),re("Данные успешно сохранены","success"),me("Данные успешно сохранены"),ae.current=0}).catch(Ie=>{_("error"),ct(Ie),re("Ошибка при сохранении данных","error"),me("Ошибка при сохранении данных")})},Ee=(se,he)=>{let ue=null;se==="offdate"?ue=oe(he)?null:"Неверный формат даты (д.м.гг)":se==="offtime"?ue=$t(he)?null:"Неверный формат времени (чч:мм:сс)":ue=Pe(se,he),ee(Le=>{const Ne={...Le,[se]:ue},Re=["tls_key","tls_cert","tls_ca"],He=Object.keys(Ne).filter(Ae=>!Re.includes(Ae)&&Ae!=="telegram_token").some(Ae=>Ne[Ae]!==null);return ce(He||!$.usehttps&&Re.some(Ae=>$[Ae])),Ne});let Ie=he;["lon_de","lat_de","timezone","mqtt_prt"].includes(se)?Ie=he===""||he===null?0:Number(he):["onsunrise","onsunset","check_ip","check_mqtt","usehttps"].includes(se)&&(Ie=he?1:0),k(Le=>({...Le,[se]:Ie})),ae.current=Date.now(),se==="usehttps"&&(ee({}),ce(!1))};if(lt(()=>{let se=!0;return registerPoll("settings","/api/mysett/get",function(he){if(se&&!(Date.now()-ae.current<8e3)){var ue=document.activeElement;if(!(ue&&(ue.tagName==="INPUT"||ue.tagName==="TEXTAREA"||ue.tagName==="SELECT"))&&he!=null){if(he.offldt){var Ie=vt(he.offldt);he.offdate=Ie.date,he.offtime=Ie.time}k(he),Oe(!1),he.tls_key&&ye(!0),he.tls_cert&&xe(!0),he.tls_ca&&_e(!0),he.telegram_token&&$e(!0)}}},{immediate:!0}),function(){se=!1,unregisterPoll("settings")}},[]),lt(()=>{ce(!te($,mt))},[$,mt]),Se)return Et`<div>Loading...</div>`;if(!$)return"";const we=(se="")=>Et`
    <button
      type="submit"
      class=${`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 ${ie?"opacity-50 cursor-not-allowed bg-slate-400":"bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500"} ${se}`}
      disabled=${ie}
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
            onChange=${se=>Ee("lang",se.target.value)}
            style="border: 2px solid #22d3ee; border-radius: 8px; padding: 4px 10px; font-size: 14px; font-weight: 600; background: white; color: #1e293b; cursor: pointer; outline: none;"
          >
            ${pe.map(se=>Et`<option value=${se.value}>${se.label}</option>`)}
          </select>
        </div>

        ${Zt&&Et`
          <div class="w-full max-w-4xl bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center mb-6 border border-green-400/50 backdrop-blur-md">
            ${Zt}
          </div>
        `}

        <form ref=${Xt} onSubmit=${De} class="w-full max-w-4xl flex flex-col gap-6 relative">

          <div class="flex justify-end w-full">${we()}</div>

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
              ${[{label:"Login",key:"adm_name",type:"text"},{label:"Password",key:"adm_pswd",type:"password"},{label:"Time zone UTC",key:"timezone",type:"select",options:Ce}].map((se,he)=>Et`
                <${FieldRow} label=${se.label} tip=${fe(se.tipLabel||se.label)} index=${he}>
                  <${pageSetting}
                    value=${$[se.key]}
                    setfn=${ue=>Ee(se.key,ue)}
                    type=${se.type}
                    options=${se.options}
                    class=${`w-full px-3 py-2 bg-white/50 border ${mt[se.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    error=${mt[se.key]}
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
                            <${MyPolzunok} value=${$.check_ip} onChange=${se=>Ee("check_ip",se)} />
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
                            <${MyPolzunok} value=${$.check_ip} onChange=${se=>Ee("check_ip",se)} />
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
                  ${[{label:"IP address",key:"ip_addr",type:"text"},{label:"Subnet mask",key:"sb_mask",type:"text"},{label:"Default gateway",key:"gateway",type:"text"}].map((se,he)=>Et`
                    <${FieldRow} label=${se.label} tip=${fe(se.tipLabel||se.label)} index=${he}>
                      <${pageSetting}
                        value=${$[se.key]}
                        setfn=${ue=>Ee(se.key,ue)}
                        type=${se.type}
                        class=${`w-full px-3 py-2 bg-white/50 border ${mt[se.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        error=${mt[se.key]}
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
              <${FieldRow} label="Token" tip=${fe("Token")} index=${0}>
                <${pageSetting}
                  value=${$.token}
                  setfn=${se=>Ee("token",se)}
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
                          <${MyPolzunok} value=${$.check_mqtt} onChange=${se=>Ee("check_mqtt",se)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[{label:"Host",key:"mqtt_hst",type:"text",maxlength:50},{label:"Port",key:"mqtt_prt",type:"number"},{label:"Client",key:"mqtt_clt",type:"text",maxlength:32},{label:"User",key:"mqtt_usr",type:"text",maxlength:32},{label:"Password",key:"mqtt_pswd",type:"password",maxlength:32,tipLabel:"Password (MQTT)"},{label:"TX topic",key:"txmqttop",type:"text",maxlength:32},{label:"RX topic",key:"rxmqttop",type:"text",maxlength:32}].map((se,he)=>Et`
                  <${FieldRow} label=${se.label} tip=${fe(se.tipLabel||se.label)} index=${he}>
                    <${pageSetting}
                      value=${$[se.key]}
                      setfn=${ue=>Ee(se.key,ue)}
                      type=${se.type}
                      maxlength=${se.maxlength}
                      class=${`w-full px-3 py-2 bg-white/50 border ${mt[se.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      error=${mt[se.key]}
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
                          <${MyPolzunok} value=${$.check_mqtt} onChange=${se=>Ee("check_mqtt",se)} />
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
                          <${MyPolzunok} value=${$.usehttps} onChange=${se=>Ee("usehttps",se)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[{label:"HTTPS domain",key:"domain",type:"text"},{label:"Private Key",key:"tls_key",type:"textarea"},{label:"Public Key",key:"tls_cert",type:"textarea"}].map((se,he)=>Et`
                  <tr class="transition-colors border-b border-slate-200 ${he%2===0?"bg-sky-200/40":"bg-white/80"} hover:bg-slate-200/80">
                    <td
                      class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help align-top"
                      data-tip=${fe(se.label)}
                    >
                      ${se.label}
                    </td>
                    <td class="w-2/3 pl-4 py-4 pr-6 align-top">
                      <div class="relative w-full">
                        ${se.type==="textarea"?Et`
                            ${se.key==="tls_key"&&$.tls_key?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены, но информация скрыта!</div>`:se.key==="tls_cert"&&$.tls_cert?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены успешно!</div>`:Et`<textarea
                                    name=${se.key}
                                    value=${$[se.key]||""}
                                    onInput=${ue=>Ee(se.key,ue.target.value)}
                                    class=${`w-full px-3 py-2 bg-white/50 border ${mt[se.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                                    rows="1"
                                    placeholder="Enter ${se.label}"
                                  ></textarea>`}
                          `:Et`
                            <input
                              type="text"
                              name=${se.key}
                              value=${$[se.key]||""}
                              onInput=${ue=>Ee(se.key,ue.target.value)}
                              class=${`w-full px-3 py-2 bg-white/50 border ${mt[se.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                              maxlength="30"
                              placeholder="Enter domain (e.g., zagotovka.ddns.net)"
                            />
                          `}
                        ${$[se.key]&&se.key==="tls_cert"&&Et`
                          <div class="absolute right-0 top-0 mt-[3px] mr-[3px] flex gap-2">
                            <button type="button"
                              onClick=${()=>{navigator.clipboard.writeText($[se.key]),me("Данные скопированы")}}
                              class="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5"
                            >Копировать</button>
                            <button type="button"
                              onClick=${()=>Ee(se.key,"")}
                              class="px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                            >Очистить</button>
                          </div>
                        `}
                        ${$[se.key]&&se.key!=="domain"&&se.key!=="tls_cert"&&Et`
                          <button type="button"
                            onClick=${()=>Ee(se.key,"")}
                            class="absolute right-0 top-0 mt-[3px] mr-[3px] px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                          >Очистить</button>
                        `}
                      </div>
                      ${mt[se.key]&&Et`<div class="text-red-500 text-sm mt-1 font-semibold w-full text-left">${mt[se.key]}</div>`}
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
                          <${MyPolzunok} value=${$.usehttps} onChange=${se=>Ee("usehttps",se)} />
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

              <${FieldRow} label="Longitude" tip=${fe("Longitude")} index=${0}>
                <${pageSetting} value=${$.lon_de} setfn=${se=>Ee("lon_de",se)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${mt.lon_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${mt.lon_de} />
              <//>

              <${FieldRow} label="Latitude" tip=${fe("Latitude")} index=${1}>
                <${pageSetting} value=${$.lat_de} setfn=${se=>Ee("lat_de",se)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${mt.lat_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${mt.lat_de} />
              <//>

              <!-- Sunrise — нестандартная строка, data-tip вручную -->
              <tr class="transition-colors border-b border-slate-200 bg-white/80 hover:bg-slate-200/80">
                <td
                  class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
                  data-tip=${fe("Sunrise")}
                >
                  Sunrise: <span class="text-teal-600 drop-shadow-sm">${$.sunrise}</span>
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <div class="flex items-center gap-4">
                    <${MyPolzunok} value=${$.onsunrise} onChange=${se=>Ee("onsunrise",se)} />
                    <input type="text" value=${$.sunrise_pins||""} onInput=${se=>Ee("sunrise_pins",se.target.value)}
                      maxlength="20" placeholder="Action for sunrise"
                      class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  </div>
                </td>
              </tr>

              <!-- Sunset -->
              <tr class="transition-colors border-b border-slate-200 bg-sky-200/40 hover:bg-slate-200/80">
                <td
                  class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
                  data-tip=${fe("Sunset")}
                >
                  Sunset: <span class="text-teal-600 drop-shadow-sm">${$.sunset}</span>
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <div class="flex items-center gap-4">
                    <${MyPolzunok} value=${$.onsunset} onChange=${se=>Ee("onsunset",se)} />
                    <input type="text" value=${$.sunset_pins||""} onInput=${se=>Ee("sunset_pins",se.target.value)}
                      maxlength="20" placeholder="Action for sunset"
                      class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  </div>
                </td>
              </tr>

              <${FieldRow} label="Day Length" tip=${fe("Day Length")} index=${4}>
                <span class="text-xl font-medium text-slate-800">${$.dlength}</span>
              <//>

              <${FieldRow} label="Next full moon" tip=${fe("Next full moon")} index=${5}>
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
                  data-tip=${fe("Date")}
                >
                  Date
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <input type="text" name="offdate" value=${$.offdate||""} onInput=${se=>Ee("offdate",se.target.value)}
                    placeholder="dd.mm.yy"
                    class=${`w-full px-3 py-2 bg-white/50 border ${mt.offdate?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${mt.offdate&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${mt.offdate}</div>`}
                </td>
              </tr>

              <!-- Time -->
              <tr class="transition-colors border-b border-slate-200 bg-sky-200/40 hover:bg-slate-200/80">
                <td
                  class="w-1/3 font-bold text-slate-700 text-lg border-r border-slate-500 py-4 px-6 cursor-help"
                  data-tip=${fe("Time")}
                >
                  Time
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <input type="text" name="offtime" value=${$.offtime||""} onInput=${se=>Ee("offtime",se.target.value)}
                    placeholder="hh:mm:ss"
                    class=${`w-full px-3 py-2 bg-white/50 border ${mt.offtime?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${mt.offtime&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${mt.offtime}</div>`}
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
                onClick=${()=>ke(se=>!se)}
              >
                <span class="text-2xl font-bold text-slate-700 tracking-wide flex items-center gap-2">
                  <span class="text-teal-600 text-lg">${ve?"▾":"▸"}</span>
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

              ${ve&&Et`
                <div class="flex items-stretch">

                  <div class="w-1/4 border-r border-slate-300 px-6 py-6 flex flex-col justify-center items-center gap-4"
                      data-tip=${($.lang||"ru")==="ru"?"Выберите категории логов, которые выводятся в UART и отсылаются. Изменения применяются немедленно в RAM!":"Select which log categories are enabled. Changes apply immediately in RAM!"}>
                    <span class="text-base font-bold text-slate-700 text-center">
                      ${($.lang||"ru")==="ru"?"Активные категории":"Active Categories"}
                    </span>
                    <button type="button" onClick=${()=>Me(1023)}
                      class="w-full py-3 text-sm font-bold text-teal-600 bg-teal-50 border border-teal-200 rounded-xl hover:bg-teal-100 hover:text-teal-700 transition-all text-center shadow-sm">
                      ${($.lang||"ru")==="ru"?"Включить все":"Enable All"}
                    </button>
                    <button type="button" onClick=${()=>Me(0)}
                      class="w-full py-3 text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 hover:text-rose-700 transition-all text-center shadow-sm">
                      ${($.lang||"ru")==="ru"?"Выключить все":"Disable All"}
                    </button>
                  </div>

                  <div class="w-3/4 px-6 py-6">
                    <div class="grid grid-cols-4 gap-3">
                      ${LOG_CATEGORIES.map(se=>{const he=$.log_filter_mask!==void 0?$.log_filter_mask:1023,ue=(he&1<<se.id)!==0;return Et`
                          <label class=${`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all duration-300 ${ue?"bg-cyan-50/70 border-cyan-300 shadow-[0_2px_10px_rgba(34,211,238,0.15)] scale-[1.02]":"bg-slate-50/40 border-slate-200 hover:bg-slate-100/50"}`}>
                            <input
                              type="checkbox"
                              checked=${ue}
                              onChange=${Ie=>{const Le=Ie.target.checked?he|1<<se.id:he&~(1<<se.id);Me(Le)}}
                              class="w-5 h-5 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500 focus:ring-2"
                            />
                            <div class="flex flex-col">
                              <span class="font-bold text-slate-800 text-base leading-tight">${se.key}</span>
                              <span class="text-xs text-slate-500 font-medium">${($.lang||"ru")==="ru"?se.labelRu:se.labelEn}</span>
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

          <div class="flex justify-end w-full mb-4">${we()}</div>

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
  </svg>`;function Header({logout:$,user:k,setShowSidebar:st,showSidebar:ct,sessionExpired:dt}){const[_,mt]=ut(new Date),ee=ht(StateContext),Xt=le=>new Date(le.year+1900,le.mon,le.mday,le.hour,le.min,le.sec);lt(()=>{const le=setInterval(()=>mt(new Date),1e3);return()=>clearInterval(le)},[]);const Yt=ee&&ee.time&&ee.time.status?Xt(ee.time.time):null,ne=le=>le.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric"}),Zt=le=>le.toLocaleTimeString("ru-RU");return Et`
    <div
      class="${dt?"bg-red-500/90 border-b border-red-400 text-white shadow-lg":"bg-white/40 backdrop-blur-md border-b border-white/40 shadow-sm"} sticky top-0 z-[48] w-full py-2 ${ct?"pl-72":""} transition-all duration-300 transform"
    >
      <div class="px-4 w-full py-0 my-0 flex items-center justify-between">
        <button
          type="button"
          onclick=${()=>st(le=>!le)}
          class="text-slate-500 hover:text-teal-500 transition-colors"
        >
          <${Icons.bars3} class="h-6" />
        </button>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm ${dt?"text-white":"text-slate-600"}">
            Дата: ${ne(_)}<span style="margin-left: 8px;"></span
            >Время: ${Zt(_)}
          </span>
        </div>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm ${dt?"text-white":"text-slate-600"}"
            >STM32 дата:
            ${Yt?ne(Yt):" 00.00.0000"}<span
              style="margin-left: 8px;"
            ></span
            >Время: ${Yt?Zt(Yt):"00:00"}
          </span>
        </div>
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <span class="text-sm ${dt?"text-red-100":"text-slate-400"}">logged in as: ${k}</span>
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
  `}function Sidebar({url:$,show:k}){const st=({title:ct,icon:dt,href:_,url:mt})=>Et`
  <div>
    <a href="#${_}" class="${_==mt?"bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-md group":"text-slate-600 hover:bg-slate-200/60 hover:text-slate-800 group"} flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
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
  <//>`}function Chart({data:$}){const k=$.length,st=20,ct=15,dt=100,_=5,mt=10,ee=25,Xt=le=>(dt-mt)/_*(le+1),Yt=le=>(dt-mt)*le/100,ne=le=>dt-mt-Yt(le),Zt=(le,ie,ce)=>Array.from({length:ie},(ge,ye)=>ye*1+le);return Et` <div
    class="my-4 divide-y divide-gray-200 overflow-auto rounded bg-white"
  >
    <div class="font-light uppercase flex items-center text-gray-600 px-4 py-2">
      Temperature, last 24h
    <//>
    <div class="relative">
      <svg class="bg-yellow-x50 w-full p-4" viewBox="0 0 ${k*st+ct} ${dt}">
        ${Zt(0,_).map(le=>Et`
            <line
              x1="0"
              y1=${Xt(le)}
              x2=${ct+k*st}
              y2=${Xt(le)}
              stroke-width="0.3"
              class="stroke-slate-300"
              stroke-dasharray="1,1"
            />
            <text x="0" y=${Xt(le)-2} class="text-[6px] fill-slate-400"
              >${ee-ee/_*(le+1)}<//
            >
          `)}
        ${Zt(0,k).map(le=>Et`
            <rect
              x=${ct+le*st}
              y=${ne($[le]*100/ee)}
              width="12"
              height=${Yt($[le]*100/ee)}
              rx="2"
              class="fill-cyan-500"
            />
            <text x=${ct+le*st} y="100" class="text-[6px] fill-slate-400"
              >${le*2}:00<//
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
  `}function FirmwareUpdate({}){const[$,k]=ut([{},{}]),[st,ct]=ut(null),dt=()=>fetch("api/firmware/status").then(le=>le.json()).then(le=>k(le));lt(dt,[]),lt(()=>{if(st){const le=setTimeout(()=>{ct(null)},3e3);return()=>clearTimeout(le)}},[st]);const _=le=>fetch("api/firmware/commit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({})}).then(ie=>ie.json()).then(dt),mt=le=>fetch("api/device/reset",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reboot:1})}).then(ie=>ie.json()).then(ie=>new Promise(ce=>setTimeout(()=>{dt(),ce()},5e3))),ee=le=>fetch("api/firmware/rollback",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({})}).then(mt),Xt=le=>fetch("api/device/eraselast").then(dt),Yt=function(le){if(!le){ct({type:"yellow",message:"Error: No file selected."});return}const ie=le.name.split(".").pop().toLowerCase();if(ie!=="bin"&&ie!=="hex"){ct({type:"red",message:"Error: Only .bin and .hex files are allowed!"});return}const ce=new FormData;ce.append("file",le),fetch("api/firmware/upload",{method:"POST",body:ce}).then(ge=>{if(!ge.ok)throw new Error(`HTTP error! status: ${ge.status}`);return ge.json()}).then(()=>{ct({type:"green",message:"Firmware uploaded successfully!"}),dt()}).catch(ge=>{ct({type:"yellow",message:`Error: Upload failed. ${ge.message}`})})},ne=({type:le,message:ie})=>Et`
      <div
        class=${`fixed top-0 left-0 right-0 z-50 border-b-4 p-4 ${le==="red"?"bg-red-100 border-red-500 text-red-700":le==="yellow"?"bg-yellow-100 border-yellow-500 text-yellow-700":"bg-green-100 border-green-500 text-green-700"}`}
        role="alert"
      >
        <p class="font-bold text-center">${ie}</p>
      </div>
    `,Zt=({title:le,onupload:ie})=>Et`
      <label
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        ${le}
        <input
          type="file"
          class="hidden"
          accept=".bin,.hex"
          onChange=${ge=>{const ye=ge.target.files[0];ye&&ie(ye)}}
        />
      </label>
    `;return Et`
    ${st&&Et`<${ne} type=${st.type} message=${st.message} />`}
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
          onclick=${ee}
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
            onclick=${mt}
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
  `}const pageSetting=({value:$,setfn:k,type:st,options:ct,error:dt,..._})=>{let mt;const ee=`w-full px-3 py-2 border rounded-md ${dt?"border-red-500":"border-gray-300"}`;switch(st){case"text":case"password":case"number":mt=Et`
        <input
          type=${st}
          value=${$}
          onInput=${Xt=>k(Xt.target.value)}
          class=${ee}
          ...${_}
        />
      `;break;case"select":mt=Et`
        <select
          value=${$}
          onChange=${Xt=>k(Xt.target.value)}
          class=${ee}
          ...${_}
        >
          ${ct.map(([Xt,Yt])=>Et` <option value=${Xt}>${Yt}</option> `)}
        </select>
      `;break;case"switch":mt=Et`
        <label class="switch">
          <input
            type="checkbox"
            checked=${$}
            onChange=${Xt=>k(Xt.target.checked)}
            ...${_}
          />
          <span class="slider round"></span>
        </label>
      `;break;default:mt=Et`<span>Неподдерживаемый тип: ${st}</span>`}return Et`
    <div>
      ${mt}
      ${dt&&Et`<div class="text-red-500 text-sm mt-1">${dt}</div>`}
    </div>
  `};function Toast({message:$,type:k,onClose:st}){return lt(()=>{const ct=setTimeout(()=>{st()},3e3);return()=>clearTimeout(ct)},[]),Et`
    <div
      class=${`fixed bottom-4 right-4 p-4 rounded-md ${k==="success"?"bg-green-500":"bg-red-500"} text-white`}
    >
      ${$}
    </div>
  `}const App=function({}){const[$,k]=ut(!0),[st,ct]=ut("/"),[dt,_]=ut(""),[mt,ee]=ut(!0),[Xt,Yt]=ut(null),[ne,Zt]=ut(!1),le=()=>fetch("api/logout").then(ce=>_("")),ie=ce=>ce.ok?ce.json().then(ge=>_(ge.user)).finally(ge=>k(!1)):k(!1)&&_(null);return lt(()=>fetch("api/login").then(ie),[]),window.pollIntervalMs=window.pollIntervalMs||2e3,lt(()=>{const ce=()=>{window.pollIntervalMs=document.hidden?3e4:2e3};return document.addEventListener("visibilitychange",ce),()=>document.removeEventListener("visibilitychange",ce)},[]),lt(()=>{if(dt)return registerPoll("common","/api/state/common",ce=>{if(ce&&ce.__session_expired){Zt(!0);return}ce&&Yt(ce)}),()=>unregisterPoll("common")},[dt]),$?"":dt?Et`<${StateContext.Provider} value=${Xt}>
   <div class="min-h-screen bg-slate-100" id="mains">
    <${Sidebar} url=${st} show=${mt} />
    <${Header}
      logout=${le}
      user=${dt}
      showSidebar=${mt}
      setShowSidebar=${ee}
      sessionExpired=${ne}
    />
    <div
      class="${mt&&"pl-72"} transition-all duration-300 transform"
    >
      <${Qt}
        onChange=${ce=>ct(ce.url)}
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
      loginFn=${ie}
      logoIcon=${Logo}
      title="Zagotovka‑M Web Interface Login"
      tipText="Default: admin / 12345678"
    />`};window.onload=()=>O(y(App),document.body);
