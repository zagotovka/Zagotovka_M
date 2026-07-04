(function(){const _=document.createElement("link").relList;if(_&&_.supports&&_.supports("modulepreload"))return;for(const dt of document.querySelectorAll('link[rel="modulepreload"]'))ct(dt);new MutationObserver(dt=>{for(const k of dt)if(k.type==="childList")for(const pt of k.addedNodes)pt.tagName==="LINK"&&pt.rel==="modulepreload"&&ct(pt)}).observe(document,{childList:!0,subtree:!0});function st(dt){const k={};return dt.integrity&&(k.integrity=dt.integrity),dt.referrerPolicy&&(k.referrerPolicy=dt.referrerPolicy),dt.crossOrigin==="use-credentials"?k.credentials="include":dt.crossOrigin==="anonymous"?k.credentials="omit":k.credentials="same-origin",k}function ct(dt){if(dt.ep)return;dt.ep=!0;const k=st(dt);fetch(dt.href,k)}})();const _registered=new Map;let _active=!1,_timer=null,_keys=[],_idx=0;const MAX_FAILS=3,BASE_BACKOFF=2e3,POLL_INTERVAL=1e3,FETCH_TIMEOUT=5e3,MAX_QUEUE=8;function registerPoll($,_,st,ct={}){if(_keys.length>=MAX_QUEUE&&!_registered.has($))for(let dt=0;dt<_keys.length;dt++){const k=_keys[dt];if(k!=="common"){_registered.delete(k),_keys.splice(dt,1),_idx>_keys.length&&(_idx=0);break}}if(_registered.set($,{url:_,callback:st,etag:null,oneShot:ct.oneShot||!1,failCount:0,backoffMs:0}),_keys=Array.from(_registered.keys()),ct.immediate&&(_idx=_keys.indexOf($),!_active)){_clearTimer(),_timer=setTimeout(_tick,0);return}_timer||_schedule()}function unregisterPoll($){const _=_registered.get($);_&&(_.callback=function(){}),_registered.delete($),_keys=Array.from(_registered.keys()),_keys.length===0&&_clearTimer()}function _clearTimer(){clearTimeout(_timer),_timer=null}function _schedule($){_clearTimer(),_timer=setTimeout(_tick,$!==void 0?$:POLL_INTERVAL)}async function _tick(){if(_active){_schedule();return}if(_keys.length===0){_clearTimer();return}_active=!0,_idx>=_keys.length&&(_idx=0);const $=_keys[_idx],_=_registered.get($);if(_){const dt=new AbortController,k=setTimeout(function(){dt.abort()},FETCH_TIMEOUT);try{const pt={};_.etag&&(pt["If-None-Match"]=_.etag);const te=await fetch(_.url,{signal:dt.signal,cache:"no-store",headers:pt});clearTimeout(k);const Zt=te.headers.get("ETag");if(Zt&&(_.etag=Zt),te.status!==304)if(te.ok){const oe=await te.json();_.callback(oe),_.failCount=0,_.backoffMs=0,_.oneShot&&(_registered.delete($),_keys=Array.from(_registered.keys()))}else(te.status===401||te.status===403)&&(_.callback({__session_expired:!0}),_registered.delete($),_keys=Array.from(_registered.keys()),_idx>=_keys.length&&_keys.length>0&&(_idx=0))}catch(pt){clearTimeout(k),pt.name!=="AbortError"&&console.warn("[pollQueue] "+$+": "+pt.message),_&&(_.etag=null,_.failCount=(_.failCount||0)+1,_.failCount>=MAX_FAILS?(console.warn("[pollQueue] "+$+": stopped after "+_.failCount+" consecutive errors"),_registered.delete($),_keys=Array.from(_registered.keys()),_idx>=_keys.length&&_keys.length>0&&(_idx=0)):_.backoffMs=Math.min((_.backoffMs||BASE_BACKOFF)*2,3e4))}}_active=!1;const st=_registered.get($),ct=st&&st.backoffMs>0?st.backoffMs:POLL_INTERVAL;_idx++,_idx>=_keys.length?(_idx=0,_keys.length>0?_schedule(ct):_clearTimer()):_keys.length>0?_schedule(0):_clearTimer()}var t,n,e,r,o,u,i,l,c,a,s,f={},p=[],h=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,d=Array.isArray;function v($,_){for(var st in _)$[st]=_[st];return $}function m($){var _=$.parentNode;_&&_.removeChild($)}function y($,_,st){var ct,dt,k,pt={};for(k in _)k=="key"?ct=_[k]:k=="ref"?dt=_[k]:pt[k]=_[k];if(arguments.length>2&&(pt.children=arguments.length>3?t.call(arguments,2):st),typeof $=="function"&&$.defaultProps!=null)for(k in $.defaultProps)pt[k]===void 0&&(pt[k]=$.defaultProps[k]);return g($,pt,ct,dt,null)}function g($,_,st,ct,dt){var k={type:$,props:_,key:st,ref:ct,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:dt??++e,__i:-1,__u:0};return dt==null&&n.vnode!=null&&n.vnode(k),k}function b($){return $.children}function C($,_){this.props=$,this.context=_}function x($,_){if(_==null)return $.__?x($.__,$.__i+1):null;for(var st;_<$.__k.length;_++)if((st=$.__k[_])!=null&&st.__e!=null)return st.__e;return typeof $.type=="function"?x($):null}function w($){var _,st;if(($=$.__)!=null&&$.__c!=null){for($.__e=$.__c.base=null,_=0;_<$.__k.length;_++)if((st=$.__k[_])!=null&&st.__e!=null){$.__e=$.__c.base=st.__e;break}return w($)}}function P($){(!$.__d&&($.__d=!0)&&r.push($)&&!U.__r++||o!==n.debounceRendering)&&((o=n.debounceRendering)||u)(U)}function U(){var $,_,st,ct,dt,k,pt,te;for(r.sort(i);$=r.shift();)$.__d&&(_=r.length,ct=void 0,k=(dt=(st=$).__v).__e,pt=[],te=[],st.__P&&((ct=v({},dt)).__v=dt.__v+1,n.vnode&&n.vnode(ct),M(st.__P,ct,dt,st.__n,st.__P.namespaceURI,32&dt.__u?[k]:null,pt,k??x(dt),!!(32&dt.__u),te),ct.__v=dt.__v,ct.__.__k[ct.__i]=ct,L(pt,ct,te),ct.__e!=k&&w(ct)),r.length>_&&r.sort(i));U.__r=0}function H($,_,st,ct,dt,k,pt,te,Zt,oe,ne){var ee,le,ae,pe,ie,he=ct&&ct.__k||p,ue=_.length;for(st.__d=Zt,E(st,_,he),Zt=st.__d,ee=0;ee<ue;ee++)(ae=st.__k[ee])!=null&&typeof ae!="boolean"&&typeof ae!="function"&&(le=ae.__i===-1?f:he[ae.__i]||f,ae.__i=ee,M($,ae,le,dt,k,pt,te,Zt,oe,ne),pe=ae.__e,ae.ref&&le.ref!=ae.ref&&(le.ref&&F(le.ref,null,ae),ne.push(ae.ref,ae.__c||pe,ae)),ie==null&&pe!=null&&(ie=pe),65536&ae.__u||le.__k===ae.__k?(Zt&&!Zt.isConnected&&(Zt=x(le)),Zt=S(ae,Zt,$)):typeof ae.type=="function"&&ae.__d!==void 0?Zt=ae.__d:pe&&(Zt=pe.nextSibling),ae.__d=void 0,ae.__u&=-196609);st.__d=Zt,st.__e=ie}function E($,_,st){var ct,dt,k,pt,te,Zt=_.length,oe=st.length,ne=oe,ee=0;for($.__k=[],ct=0;ct<Zt;ct++)pt=ct+ee,(dt=$.__k[ct]=(dt=_[ct])==null||typeof dt=="boolean"||typeof dt=="function"?null:typeof dt=="string"||typeof dt=="number"||typeof dt=="bigint"||dt.constructor==String?g(null,dt,null,null,null):d(dt)?g(b,{children:dt},null,null,null):dt.constructor===void 0&&dt.__b>0?g(dt.type,dt.props,dt.key,dt.ref?dt.ref:null,dt.__v):dt)!=null?(dt.__=$,dt.__b=$.__b+1,te=D(dt,st,pt,ne),dt.__i=te,k=null,te!==-1&&(ne--,(k=st[te])&&(k.__u|=131072)),k==null||k.__v===null?(te==-1&&ee--,typeof dt.type!="function"&&(dt.__u|=65536)):te!==pt&&(te===pt+1?ee++:te>pt?ne>Zt-pt?ee+=te-pt:ee--:te<pt?te==pt-1&&(ee=te-pt):ee=0,te!==ct+ee&&(dt.__u|=65536))):(k=st[pt])&&k.key==null&&k.__e&&(131072&k.__u)==0&&(k.__e==$.__d&&($.__d=x(k)),I(k,k,!1),st[pt]=null,ne--);if(ne)for(ct=0;ct<oe;ct++)(k=st[ct])!=null&&(131072&k.__u)==0&&(k.__e==$.__d&&($.__d=x(k)),I(k,k))}function S($,_,st){var ct,dt;if(typeof $.type=="function"){for(ct=$.__k,dt=0;ct&&dt<ct.length;dt++)ct[dt]&&(ct[dt].__=$,_=S(ct[dt],_,st));return _}$.__e!=_&&(st.insertBefore($.__e,_||null),_=$.__e);do _=_&&_.nextSibling;while(_!=null&&_.nodeType===8);return _}function A($,_){return _=_||[],$==null||typeof $=="boolean"||(d($)?$.some((function(st){A(st,_)})):_.push($)),_}function D($,_,st,ct){var dt=$.key,k=$.type,pt=st-1,te=st+1,Zt=_[st];if(Zt===null||Zt&&dt==Zt.key&&k===Zt.type&&(131072&Zt.__u)==0)return st;if(ct>(Zt!=null&&(131072&Zt.__u)==0?1:0))for(;pt>=0||te<_.length;){if(pt>=0){if((Zt=_[pt])&&(131072&Zt.__u)==0&&dt==Zt.key&&k===Zt.type)return pt;pt--}if(te<_.length){if((Zt=_[te])&&(131072&Zt.__u)==0&&dt==Zt.key&&k===Zt.type)return te;te++}}return-1}function N($,_,st){_[0]==="-"?$.setProperty(_,st??""):$[_]=st==null?"":typeof st!="number"||h.test(_)?st:st+"px"}function R($,_,st,ct,dt){var k;t:if(_==="style")if(typeof st=="string")$.style.cssText=st;else{if(typeof ct=="string"&&($.style.cssText=ct=""),ct)for(_ in ct)st&&_ in st||N($.style,_,"");if(st)for(_ in st)ct&&st[_]===ct[_]||N($.style,_,st[_])}else if(_[0]==="o"&&_[1]==="n")k=_!==(_=_.replace(/(PointerCapture)$|Capture$/i,"$1")),_=_.toLowerCase()in $||_==="onFocusOut"||_==="onFocusIn"?_.toLowerCase().slice(2):_.slice(2),$.l||($.l={}),$.l[_+k]=st,st?ct?st.u=ct.u:(st.u=l,$.addEventListener(_,k?a:c,k)):$.removeEventListener(_,k?a:c,k);else{if(dt=="http://www.w3.org/2000/svg")_=_.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(_!="width"&&_!="height"&&_!="href"&&_!="list"&&_!="form"&&_!="tabIndex"&&_!="download"&&_!="rowSpan"&&_!="colSpan"&&_!="role"&&_ in $)try{$[_]=st??"";break t}catch{}typeof st=="function"||(st==null||st===!1&&_[4]!=="-"?$.removeAttribute(_):$.setAttribute(_,st))}}function T($){return function(_){if(this.l){var st=this.l[_.type+$];if(_.t==null)_.t=l++;else if(_.t<st.u)return;return st(n.event?n.event(_):_)}}}function M($,_,st,ct,dt,k,pt,te,Zt,oe){var ne,ee,le,ae,pe,ie,he,ue,ge,fe,$e,Te,_e,Ie,Pe,xe=_.type;if(_.constructor!==void 0)return null;128&st.__u&&(Zt=!!(32&st.__u),k=[te=_.__e=st.__e]),(ne=n.__b)&&ne(_);t:if(typeof xe=="function")try{if(ue=_.props,ge=(ne=xe.contextType)&&ct[ne.__c],fe=ne?ge?ge.props.value:ne.__:ct,st.__c?he=(ee=_.__c=st.__c).__=ee.__E:("prototype"in xe&&xe.prototype.render?_.__c=ee=new xe(ue,fe):(_.__c=ee=new C(ue,fe),ee.constructor=xe,ee.render=V),ge&&ge.sub(ee),ee.props=ue,ee.state||(ee.state={}),ee.context=fe,ee.__n=ct,le=ee.__d=!0,ee.__h=[],ee._sb=[]),ee.__s==null&&(ee.__s=ee.state),xe.getDerivedStateFromProps!=null&&(ee.__s==ee.state&&(ee.__s=v({},ee.__s)),v(ee.__s,xe.getDerivedStateFromProps(ue,ee.__s))),ae=ee.props,pe=ee.state,ee.__v=_,le)xe.getDerivedStateFromProps==null&&ee.componentWillMount!=null&&ee.componentWillMount(),ee.componentDidMount!=null&&ee.__h.push(ee.componentDidMount);else{if(xe.getDerivedStateFromProps==null&&ue!==ae&&ee.componentWillReceiveProps!=null&&ee.componentWillReceiveProps(ue,fe),!ee.__e&&(ee.shouldComponentUpdate!=null&&ee.shouldComponentUpdate(ue,ee.__s,fe)===!1||_.__v===st.__v)){for(_.__v!==st.__v&&(ee.props=ue,ee.state=ee.__s,ee.__d=!1),_.__e=st.__e,_.__k=st.__k,_.__k.forEach((function(ke){ke&&(ke.__=_)})),$e=0;$e<ee._sb.length;$e++)ee.__h.push(ee._sb[$e]);ee._sb=[],ee.__h.length&&pt.push(ee);break t}ee.componentWillUpdate!=null&&ee.componentWillUpdate(ue,ee.__s,fe),ee.componentDidUpdate!=null&&ee.__h.push((function(){ee.componentDidUpdate(ae,pe,ie)}))}if(ee.context=fe,ee.props=ue,ee.__P=$,ee.__e=!1,Te=n.__r,_e=0,"prototype"in xe&&xe.prototype.render){for(ee.state=ee.__s,ee.__d=!1,Te&&Te(_),ne=ee.render(ee.props,ee.state,ee.context),Ie=0;Ie<ee._sb.length;Ie++)ee.__h.push(ee._sb[Ie]);ee._sb=[]}else do ee.__d=!1,Te&&Te(_),ne=ee.render(ee.props,ee.state,ee.context),ee.state=ee.__s;while(ee.__d&&++_e<25);ee.state=ee.__s,ee.getChildContext!=null&&(ct=v(v({},ct),ee.getChildContext())),le||ee.getSnapshotBeforeUpdate==null||(ie=ee.getSnapshotBeforeUpdate(ae,pe)),H($,d(Pe=ne!=null&&ne.type===b&&ne.key==null?ne.props.children:ne)?Pe:[Pe],_,st,ct,dt,k,pt,te,Zt,oe),ee.base=_.__e,_.__u&=-161,ee.__h.length&&pt.push(ee),he&&(ee.__E=ee.__=null)}catch(ke){_.__v=null,Zt||k!=null?(_.__e=te,_.__u|=Zt?160:32,k[k.indexOf(te)]=null):(_.__e=st.__e,_.__k=st.__k),n.__e(ke,_,st)}else k==null&&_.__v===st.__v?(_.__k=st.__k,_.__e=st.__e):_.__e=W(st.__e,_,st,ct,dt,k,pt,Zt,oe);(ne=n.diffed)&&ne(_)}function L($,_,st){_.__d=void 0;for(var ct=0;ct<st.length;ct++)F(st[ct],st[++ct],st[++ct]);n.__c&&n.__c(_,$),$.some((function(dt){try{$=dt.__h,dt.__h=[],$.some((function(k){k.call(dt)}))}catch(k){n.__e(k,dt.__v)}}))}function W($,_,st,ct,dt,k,pt,te,Zt){var oe,ne,ee,le,ae,pe,ie,he=st.props,ue=_.props,ge=_.type;if(ge==="svg"?dt="http://www.w3.org/2000/svg":ge==="math"?dt="http://www.w3.org/1998/Math/MathML":dt||(dt="http://www.w3.org/1999/xhtml"),k!=null){for(oe=0;oe<k.length;oe++)if((ae=k[oe])&&"setAttribute"in ae==!!ge&&(ge?ae.localName===ge:ae.nodeType===3)){$=ae,k[oe]=null;break}}if($==null){if(ge===null)return document.createTextNode(ue);$=document.createElementNS(dt,ge,ue.is&&ue),k=null,te=!1}if(ge===null)he===ue||te&&$.data===ue||($.data=ue);else{if(k=k&&t.call($.childNodes),he=st.props||f,!te&&k!=null)for(he={},oe=0;oe<$.attributes.length;oe++)he[(ae=$.attributes[oe]).name]=ae.value;for(oe in he)if(ae=he[oe],oe!="children"){if(oe=="dangerouslySetInnerHTML")ee=ae;else if(oe!=="key"&&!(oe in ue)){if(oe=="value"&&"defaultValue"in ue||oe=="checked"&&"defaultChecked"in ue)continue;R($,oe,null,ae,dt)}}for(oe in ue)ae=ue[oe],oe=="children"?le=ae:oe=="dangerouslySetInnerHTML"?ne=ae:oe=="value"?pe=ae:oe=="checked"?ie=ae:oe==="key"||te&&typeof ae!="function"||he[oe]===ae||R($,oe,ae,he[oe],dt);if(ne)te||ee&&(ne.__html===ee.__html||ne.__html===$.innerHTML)||($.innerHTML=ne.__html),_.__k=[];else if(ee&&($.innerHTML=""),H($,d(le)?le:[le],_,st,ct,ge==="foreignObject"?"http://www.w3.org/1999/xhtml":dt,k,pt,k?k[0]:st.__k&&x(st,0),te,Zt),k!=null)for(oe=k.length;oe--;)k[oe]!=null&&m(k[oe]);te||(oe="value",pe!==void 0&&(pe!==$[oe]||ge==="progress"&&!pe||ge==="option"&&pe!==he[oe])&&R($,oe,pe,he[oe],dt),oe="checked",ie!==void 0&&ie!==$[oe]&&R($,oe,ie,he[oe],dt))}return $}function F($,_,st){try{typeof $=="function"?$(_):$.current=_}catch(ct){n.__e(ct,st)}}function I($,_,st){var ct,dt;if(n.unmount&&n.unmount($),(ct=$.ref)&&(ct.current&&ct.current!==$.__e||F(ct,null,_)),(ct=$.__c)!=null){if(ct.componentWillUnmount)try{ct.componentWillUnmount()}catch(k){n.__e(k,_)}ct.base=ct.__P=null}if(ct=$.__k)for(dt=0;dt<ct.length;dt++)ct[dt]&&I(ct[dt],_,st||typeof $.type!="function");st||$.__e==null||m($.__e),$.__c=$.__=$.__e=$.__d=void 0}function V($,_,st){return this.constructor($,st)}function O($,_,st){var ct,dt,k,pt;n.__&&n.__($,_),dt=(ct=!1)?null:_.__k,k=[],pt=[],M(_,$=_.__k=y(b,null,[$]),dt||f,f,_.namespaceURI,dt?null:_.firstChild?t.call(_.childNodes):null,k,dt?dt.__e:_.firstChild,ct,pt),L(k,$,pt)}function j($,_,st){var ct,dt,k,pt,te=v({},$.props);for(k in $.type&&$.type.defaultProps&&(pt=$.type.defaultProps),_)k=="key"?ct=_[k]:k=="ref"?dt=_[k]:te[k]=_[k]===void 0&&pt!==void 0?pt[k]:_[k];return arguments.length>2&&(te.children=arguments.length>3?t.call(arguments,2):st),g($.type,te,ct||$.key,dt||$.ref,null)}function q($,_){var st={__c:_="__cC"+s++,__:$,Consumer:function(ct,dt){return ct.children(dt)},Provider:function(ct){var dt,k;return this.getChildContext||(dt=[],(k={})[_]=this,this.getChildContext=function(){return k},this.shouldComponentUpdate=function(pt){this.props.value!==pt.value&&dt.some((function(te){te.__e=!0,P(te)}))},this.sub=function(pt){dt.push(pt);var te=pt.componentWillUnmount;pt.componentWillUnmount=function(){dt.splice(dt.indexOf(pt),1),te&&te.call(pt)}}),ct.children}};return st.Provider.__=st.Consumer.contextType=st}t=p.slice,n={__e:function($,_,st,ct){for(var dt,k,pt;_=_.__;)if((dt=_.__c)&&!dt.__)try{if((k=dt.constructor)&&k.getDerivedStateFromError!=null&&(dt.setState(k.getDerivedStateFromError($)),pt=dt.__d),dt.componentDidCatch!=null&&(dt.componentDidCatch($,ct||{}),pt=dt.__d),pt)return dt.__E=dt}catch(te){$=te}throw $}},e=0,C.prototype.setState=function($,_){var st;st=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=v({},this.state),typeof $=="function"&&($=$(v({},st),this.props)),$&&v(st,$),$!=null&&this.__v&&(_&&this._sb.push(_),P(this))},C.prototype.forceUpdate=function($){this.__v&&(this.__e=!0,$&&this.__h.push($),P(this))},C.prototype.render=b,r=[],u=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=function($,_){return $.__v.__b-_.__v.__b},U.__r=0,l=0,c=T(!1),a=T(!0),s=0;var B,K,z,G,J=0,Q=[],X=[],Y=n,Z=Y.__b,tt=Y.__r,nt=Y.diffed,et=Y.__c,_t=Y.unmount,rt=Y.__;function ot($,_){Y.__h&&Y.__h(K,$,J||_),J=0;var st=K.__H||(K.__H={__:[],__h:[]});return $>=st.__.length&&st.__.push({__V:X}),st.__[$]}function ut($){return J=1,it(wt,$)}function it($,_,st){var ct=ot(B++,2);if(ct.t=$,!ct.__c&&(ct.__=[wt(void 0,_),function(te){var Zt=ct.__N?ct.__N[0]:ct.__[0],oe=ct.t(Zt,te);Zt!==oe&&(ct.__N=[oe,ct.__[1]],ct.__c.setState({}))}],ct.__c=K,!K.u)){var dt=function(te,Zt,oe){if(!ct.__c.__H)return!0;var ne=ct.__c.__H.__.filter((function(le){return!!le.__c}));if(ne.every((function(le){return!le.__N})))return!k||k.call(this,te,Zt,oe);var ee=!1;return ne.forEach((function(le){if(le.__N){var ae=le.__[0];le.__=le.__N,le.__N=void 0,ae!==le.__[0]&&(ee=!0)}})),!(!ee&&ct.__c.props===te)&&(!k||k.call(this,te,Zt,oe))};K.u=!0;var k=K.shouldComponentUpdate,pt=K.componentWillUpdate;K.componentWillUpdate=function(te,Zt,oe){if(this.__e){var ne=k;k=void 0,dt(te,Zt,oe),k=ne}pt&&pt.call(this,te,Zt,oe)},K.shouldComponentUpdate=dt}return ct.__N||ct.__}function lt($,_){var st=ot(B++,3);!Y.__s&&xt(st.__H,_)&&(st.__=$,st.i=_,K.__H.__h.push(st))}function at($){return J=5,ft((function(){return{current:$}}),[])}function ft($,_){var st=ot(B++,7);return xt(st.__H,_)?(st.__V=$(),st.i=_,st.__h=$,st.__V):st.__}function ht($){var _=K.context[$.__c],st=ot(B++,9);return st.c=$,_?(st.__==null&&(st.__=!0,_.sub(K)),_.props.value):$.__}function yt(){for(var $;$=Q.shift();)if($.__P&&$.__H)try{$.__H.__h.forEach(bt),$.__H.__h.forEach(Ct),$.__H.__h=[]}catch(_){$.__H.__h=[],Y.__e(_,$.__v)}}Y.__b=function($){K=null,Z&&Z($)},Y.__=function($,_){$&&_.__k&&_.__k.__m&&($.__m=_.__k.__m),rt&&rt($,_)},Y.__r=function($){tt&&tt($),B=0;var _=(K=$.__c).__H;_&&(z===K?(_.__h=[],K.__h=[],_.__.forEach((function(st){st.__N&&(st.__=st.__N),st.__V=X,st.__N=st.i=void 0}))):(_.__h.forEach(bt),_.__h.forEach(Ct),_.__h=[],B=0)),z=K},Y.diffed=function($){nt&&nt($);var _=$.__c;_&&_.__H&&(_.__H.__h.length&&(Q.push(_)!==1&&G===Y.requestAnimationFrame||((G=Y.requestAnimationFrame)||kt)(yt)),_.__H.__.forEach((function(st){st.i&&(st.__H=st.i),st.__V!==X&&(st.__=st.__V),st.i=void 0,st.__V=X}))),z=K=null},Y.__c=function($,_){_.some((function(st){try{st.__h.forEach(bt),st.__h=st.__h.filter((function(ct){return!ct.__||Ct(ct)}))}catch(ct){_.some((function(dt){dt.__h&&(dt.__h=[])})),_=[],Y.__e(ct,st.__v)}})),et&&et($,_)},Y.unmount=function($){_t&&_t($);var _,st=$.__c;st&&st.__H&&(st.__H.__.forEach((function(ct){try{bt(ct)}catch(dt){_=dt}})),st.__H=void 0,_&&Y.__e(_,st.__v))};var gt=typeof requestAnimationFrame=="function";function kt($){var _,st=function(){clearTimeout(ct),gt&&cancelAnimationFrame(_),setTimeout($)},ct=setTimeout(st,100);gt&&(_=requestAnimationFrame(st))}function bt($){var _=K,st=$.__c;typeof st=="function"&&($.__c=void 0,st()),K=_}function Ct($){var _=K;$.__c=$.__(),K=_}function xt($,_){return!$||$.length!==_.length||_.some((function(st,ct){return st!==$[ct]}))}function wt($,_){return typeof _=="function"?_($):_}var Pt=function($,_,st,ct){var dt;_[0]=0;for(var k=1;k<_.length;k++){var pt=_[k++],te=_[k]?(_[0]|=pt?1:2,st[_[k++]]):_[++k];pt===3?ct[0]=te:pt===4?ct[1]=Object.assign(ct[1]||{},te):pt===5?(ct[1]=ct[1]||{})[_[++k]]=te:pt===6?ct[1][_[++k]]+=te+"":pt?(dt=$.apply(te,Pt($,te,st,["",null])),ct.push(dt),te[0]?_[0]|=2:(_[k-2]=0,_[k]=dt)):ct.push(te)}return ct},Ut=new Map;function Ht($){var _=Ut.get(this);return _||(_=new Map,Ut.set(this,_)),(_=Pt(this,_.get($)||(_.set($,_=(function(st){for(var ct,dt,k=1,pt="",te="",Zt=[0],oe=function(le){k===1&&(le||(pt=pt.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?Zt.push(0,le,pt):k===3&&(le||pt)?(Zt.push(3,le,pt),k=2):k===2&&pt==="..."&&le?Zt.push(4,le,0):k===2&&pt&&!le?Zt.push(5,0,!0,pt):k>=5&&((pt||!le&&k===5)&&(Zt.push(k,0,pt,dt),k=6),le&&(Zt.push(k,le,0,dt),k=6)),pt=""},ne=0;ne<st.length;ne++){ne&&(k===1&&oe(),oe(ne));for(var ee=0;ee<st[ne].length;ee++)ct=st[ne][ee],k===1?ct==="<"?(oe(),Zt=[Zt],k=3):pt+=ct:k===4?pt==="--"&&ct===">"?(k=1,pt=""):pt=ct+pt[0]:te?ct===te?te="":pt+=ct:ct==='"'||ct==="'"?te=ct:ct===">"?(oe(),k=1):k&&(ct==="="?(k=5,dt=pt,pt=""):ct==="/"&&(k<5||st[ne][ee+1]===">")?(oe(),k===3&&(Zt=Zt[0]),k=Zt,(Zt=Zt[0]).push(2,0,k),k=0):ct===" "||ct==="	"||ct===`
`||ct==="\r"?(oe(),k=2):pt+=ct),k===3&&pt==="!--"&&(k=4,Zt=Zt[0])}return oe(),Zt})($)),_),arguments,[])).length>1?_:_[0]}var Et=Ht.bind(y),St={};function At($,_){for(var st in _)$[st]=_[st];return $}function Dt($,_,st){var ct,dt=/(?:\?([^#]*))?(#.*)?$/,k=$.match(dt),pt={};if(k&&k[1])for(var te=k[1].split("&"),Zt=0;Zt<te.length;Zt++){var oe=te[Zt].split("=");pt[decodeURIComponent(oe[0])]=decodeURIComponent(oe.slice(1).join("="))}$=Tt($.replace(dt,"")),_=Tt(_||"");for(var ne=Math.max($.length,_.length),ee=0;ee<ne;ee++)if(_[ee]&&_[ee].charAt(0)===":"){var le=_[ee].replace(/(^:|[+*?]+$)/g,""),ae=(_[ee].match(/[+*?]+$/)||St)[0]||"",pe=~ae.indexOf("+"),ie=~ae.indexOf("*"),he=$[ee]||"";if(!he&&!ie&&(ae.indexOf("?")<0||pe)){ct=!1;break}if(pt[le]=decodeURIComponent(he),pe||ie){pt[le]=$.slice(ee).map(decodeURIComponent).join("/");break}}else if(_[ee]!==$[ee]){ct=!1;break}return(st.default===!0||ct!==!1)&&pt}function Nt($,_){return $.rank<_.rank?1:$.rank>_.rank?-1:$.index-_.index}function Rt($,_){return $.index=_,$.rank=(function(st){return st.props.default?0:Tt(st.props.path).map(Mt).join("")})($),$.props}function Tt($){return $.replace(/(^\/+|\/+$)/g,"").split("/")}function Mt($){return $.charAt(0)==":"?1+"*+?".indexOf($.charAt($.length-1))||4:5}var Lt={},Wt=[],Ft=[],It=null,Vt={url:jt()},Ot=q(Vt);function jt(){var $;return""+(($=It&&It.location?It.location:It&&It.getCurrentLocation?It.getCurrentLocation():typeof location<"u"?location:Lt).pathname||"")+($.search||"")}function qt($,_){return _===void 0&&(_=!1),typeof $!="string"&&$.url&&(_=$.replace,$=$.url),(function(st){for(var ct=Wt.length;ct--;)if(Wt[ct].canRoute(st))return!0;return!1})($)&&(function(st,ct){ct===void 0&&(ct="push"),It&&It[ct]?It[ct](st):typeof history<"u"&&history[ct+"State"]&&history[ct+"State"](null,null,st)})($,_?"replace":"push"),Bt($)}function Bt($){for(var _=!1,st=0;st<Wt.length;st++)Wt[st].routeTo($)&&(_=!0);return _}function Kt($){if($&&$.getAttribute){var _=$.getAttribute("href"),st=$.getAttribute("target");if(_&&_.match(/^\//g)&&(!st||st.match(/^_?self$/i)))return qt(_)}}function zt($){return $.stopImmediatePropagation&&$.stopImmediatePropagation(),$.stopPropagation&&$.stopPropagation(),$.preventDefault(),!1}function Gt($){if(!($.ctrlKey||$.metaKey||$.altKey||$.shiftKey||$.button)){var _=$.target;do if(_.localName==="a"&&_.getAttribute("href")){if(_.hasAttribute("data-native")||_.hasAttribute("native"))return;if(Kt(_))return zt($)}while(_=_.parentNode)}}var Jt=!1;function Qt($){$.history&&(It=$.history),this.state={url:$.url||jt()}}At(Qt.prototype=new C,{shouldComponentUpdate:function($){return $.static!==!0||$.url!==this.props.url||$.onChange!==this.props.onChange},canRoute:function($){var _=A(this.props.children);return this.g(_,$)!==void 0},routeTo:function($){this.setState({url:$});var _=this.canRoute($);return this.p||this.forceUpdate(),_},componentWillMount:function(){this.p=!0},componentDidMount:function(){var $=this;Jt||(Jt=!0,It||addEventListener("popstate",(function(){Bt(jt())})),addEventListener("click",Gt)),Wt.push(this),It&&(this.u=It.listen((function(_){var st=_.location||_;$.routeTo(""+(st.pathname||"")+(st.search||""))}))),this.p=!1},componentWillUnmount:function(){typeof this.u=="function"&&this.u(),Wt.splice(Wt.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function($,_){$=$.filter(Rt).sort(Nt);for(var st=0;st<$.length;st++){var ct=$[st],dt=Dt(_,ct.props.path,ct.props);if(dt)return[ct,dt]}},render:function($,_){var st,ct,dt=$.onChange,k=_.url,pt=this.c,te=this.g(A($.children),k);if(te&&(ct=j(te[0],At(At({url:k,matches:st=te[1]},st),{key:void 0,ref:void 0}))),k!==(pt&&pt.url)){At(Vt,pt=this.c={url:k,previous:pt&&pt.url,current:ct,path:ct?ct.props.path:null,matches:st}),pt.router=this,pt.active=ct?[ct]:[];for(var Zt=Ft.length;Zt--;)Ft[Zt]({});typeof dt=="function"&&dt(pt)}return y(Ot.Provider,{value:pt},ct)}});const StateContext=q(null),switchIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='652.000000pt'%20height='956.000000pt'%20viewBox='0%200%20652.000000%20956.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,956.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M1150%209540%20c-386%20-6%20-408%20-8%20-475%20-29%20-147%20-48%20-255%20-115%20-368%20-226%20-93%20-91%20-145%20-159%20-191%20-250%20-74%20-146%20-77%20-163%20-87%20-455%20-10%20-318%20-14%20-7639%20-4%20-7725%2025%20-214%20107%20-394%20245%20-539%20115%20-121%20227%20-192%20408%20-260%20l72%20-28%202418%20-1%20c2586%20-2%202582%20-2%202716%2047%20254%2092%20492%20346%20573%20611%2017%2058%2018%20211%2018%204095%20l0%204035%20-23%2075%20c-61%20193%20-204%20388%20-368%20501%20-76%2052%20-226%20118%20-294%20129%20-36%206%20-229%2015%20-430%2020%20-398%2010%20-3557%2010%20-4210%200z%20m4610%20-328%20c164%20-59%20291%20-175%20374%20-339%20l36%20-73%200%20-4016%200%20-4016%20-45%20-88%20c-25%20-48%20-70%20-115%20-101%20-148%20-64%20-71%20-175%20-148%20-242%20-168%20-103%20-32%20-400%20-35%20-2687%20-32%20-2180%203%20-2282%204%20-2335%2022%20-204%2068%20-363%20240%20-417%20452%20-17%2065%20-18%20275%20-18%203979%200%203785%201%203912%2019%203980%2024%2091%2084%20207%20140%20271%2055%2062%20182%20152%20244%20171%2027%208%20121%2018%20222%2022%2096%205%201203%208%202460%207%20l2285%20-1%2065%20-23z'/%3e%3cpath%20d='M1434%208128%20l-45%20-41%203%20-3291%20c3%20-3127%204%20-3293%2021%20-3323%209%20-18%2029%20-41%2044%20-50%2026%20-17%20125%20-18%201799%20-18%201918%200%201808%20-3%201834%2054%207%2014%2016%2067%2021%20116%205%2050%209%20789%209%201644%20l0%201554%20249%20981%20c358%201405%20401%201581%20401%201626%200%2051%204%2046%20-414%20468%20l-321%20322%20-1778%200%20-1777%200%20-46%20-42z%20m3636%20-425%20l165%20-168%20-185%20-6%20c-102%20-4%20-770%20-7%20-1485%20-8%20l-1300%20-1%20-145%20148%20c-80%2081%20-156%20159%20-170%20175%20l-23%2027%201489%200%201490%200%20164%20-167z%20m-3078%20-356%20l31%20-38%20-147%20-583%20c-81%20-320%20-153%20-602%20-160%20-626%20-12%20-39%20-13%20-23%20-19%20185%20-9%20291%20-9%20823%200%201123%20l6%20233%20129%20-128%20c71%20-70%20143%20-145%20160%20-166z%20m2900%20-136%20c278%20-3%20510%20-9%20513%20-13%2010%20-10%203%20-40%20-305%20-1260%20l-280%20-1107%200%20-1565%200%20-1566%20-1565%200%20-1565%200%200%201521%200%201520%20310%201226%20c171%20675%20313%201229%20316%201232%2014%2014%201788%2022%202576%2012z'/%3e%3cpath%20d='M3765%206820%20c-61%20-25%20-87%20-94%20-185%20-473%20-80%20-315%20-120%20-493%20-120%20-540%200%20-77%2078%20-141%20163%20-134%2069%206%20101%2040%20131%20141%2057%20190%20197%20746%20212%20843%205%2032%201%2053%20-19%2096%20-22%2048%20-30%2057%20-64%2066%20-44%2013%20-90%2013%20-118%201z'/%3e%3cpath%20d='M3098%203406%20c-104%20-37%20-216%20-134%20-264%20-227%20-24%20-47%20-28%20-71%20-35%20-184%20-19%20-311%20-7%20-500%2037%20-586%2040%20-80%20113%20-151%20201%20-195%20l76%20-39%20151%200%20151%200%2068%2034%20c81%2041%20167%20128%20215%20218%20l32%2061%200%20302%200%20302%20-41%2078%20c-65%20127%20-156%20201%20-284%20235%20-73%2019%20-255%2019%20-307%201z%20m262%20-311%20c58%20-30%2064%20-57%2068%20-301%204%20-219%204%20-222%20-19%20-253%20-65%20-88%20-230%20-95%20-286%20-13%20-16%2024%20-18%2055%20-21%20273%20l-3%20246%2038%2030%20c21%2017%2045%2033%2053%2036%2025%2011%20137%20-1%20170%20-18z'/%3e%3c/g%3e%3c/svg%3e",buttonIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M790%201280%20l0%20-420%2065%200%2065%200%200%20420%200%20420%20-65%200%20-65%200%200%20-420z'/%3e%3cpath%20d='M489%201612%20c-228%20-114%20-386%20-309%20-451%20-557%20-29%20-110%20-29%20-297%200%20-406%2081%20-301%20308%20-530%20607%20-610%20112%20-30%20307%20-30%20420%200%20294%2077%20529%20312%20606%20606%2029%20110%2030%20307%201%20416%20-67%20251%20-245%20462%20-477%20565%20l-55%2024%200%20-74%200%20-74%2072%20-42%20c280%20-167%20411%20-508%20313%20-817%20-35%20-110%20-88%20-196%20-175%20-283%20-87%20-87%20-172%20-139%20-285%20-177%20-70%20-23%20-96%20-27%20-210%20-27%20-114%200%20-140%204%20-210%2027%20-293%2097%20-495%20372%20-495%20673%200%2070%2025%20193%2055%20266%2054%20133%20182%20279%20299%20339%20l66%2034%200%2078%20c0%2042%20-1%2077%20-2%2077%20-2%200%20-37%20-18%20-79%20-38z'/%3e%3c/g%3e%3c/svg%3e",timerIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M818%201670%20c-24%20-15%20-31%20-77%20-23%20-221%208%20-141%2015%20-159%2064%20-159%2050%200%2060%2024%2063%20150%20l3%20115%2030%20-3%20c172%20-19%20366%20-132%20472%20-275%2094%20-129%20133%20-236%20140%20-392%206%20-142%20-12%20-230%20-73%20-355%20-82%20-165%20-236%20-296%20-419%20-357%20-71%20-24%20-95%20-27%20-215%20-27%20-118%200%20-145%203%20-212%2026%20-123%2041%20-204%2092%20-298%20187%20-68%2068%20-94%20103%20-127%20171%20-61%20125%20-76%20203%20-71%20352%206%20153%2036%20243%20122%20371%2064%2095%2068%20127%2021%20149%20-39%2017%20-68%202%20-113%20-59%20-94%20-127%20-150%20-285%20-159%20-449%20-23%20-399%20236%20-749%20632%20-855%20111%20-30%20297%20-30%20410%200%20449%20119%20716%20562%20610%201011%20-23%2095%20-105%20254%20-173%20336%20-111%20131%20-276%20234%20-442%20274%20-89%2021%20-213%2026%20-242%2010z'/%3e%3cpath%20d='M452%201258%20c-7%20-7%20-12%20-17%20-12%20-23%200%20-21%20330%20-469%20358%20-487%2043%20-28%20106%20-23%20143%2010%2043%2038%2052%20113%2020%20154%20-20%2025%20-454%20342%20-484%20354%20-7%202%20-18%20-1%20-25%20-8z'/%3e%3c/g%3e%3c/svg%3e",owIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='110.000000pt'%20height='52.000000pt'%20viewBox='0%200%20110.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M171%20500%20c-50%20-12%20-83%20-41%20-111%20-96%20-22%20-43%20-25%20-62%20-24%20-149%200%20-141%2027%20-199%20109%20-236%2073%20-33%20180%20-16%20227%2037%2067%2076%2074%20284%2013%20376%20-39%2059%20-133%2089%20-214%2068z%20m119%20-65%20c50%20-26%2065%20-67%2065%20-180%200%20-146%20-32%20-195%20-128%20-195%20-40%200%20-54%205%20-77%2028%20-16%2016%20-34%2049%20-40%2073%20-16%2056%20-7%20186%2014%20227%2030%2057%20105%2078%20166%2047z'/%3e%3cpath%20d='M482%20483%20c3%20-10%2029%20-120%2058%20-245%20l54%20-228%2038%200%20c43%200%2035%20-20%2089%20215%2017%2077%2035%20146%2038%20152%204%207%2026%20-73%2051%20-178%20l44%20-190%2039%203%2040%203%2058%20240%20c32%20132%2058%20241%2059%20243%200%202%20-15%202%20-32%200%20l-32%20-3%20-43%20-180%20c-23%20-99%20-44%20-187%20-46%20-195%20-2%20-8%20-25%2074%20-51%20183%20l-48%20198%20-36%20-3%20-36%20-3%20-45%20-194%20c-25%20-106%20-47%20-188%20-49%20-181%20-3%207%20-23%2095%20-46%20194%20l-42%20181%20-33%203%20c-28%203%20-33%201%20-29%20-15z'/%3e%3c/g%3e%3c/svg%3e",encoderIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='34.000000pt'%20height='52.000000pt'%20viewBox='0%200%2034.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M30%20255%20l0%20-245%20150%200%20150%200%200%2030%200%2030%20-115%200%20-115%200%200%2085%200%2085%2095%200%2095%200%200%2030%200%2030%20-95%200%20-95%200%200%2070%200%2070%20115%200%20115%200%200%2030%200%2030%20-150%200%20-150%200%200%20-245z'/%3e%3c/g%3e%3c/svg%3e",Icons={switchIcon:$=>Et`
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
    </svg>`},tipColors={green:"bg-green-100 text-green-900 ring-green-300",yellow:"bg-yellow-100 text-yellow-900 ring-yellow-300"};function Button({title:$,onclick:_,disabled:st,cls:ct,icon:dt,ref:k,colors:pt,hovercolor:te,disabledcolor:Zt}){const[oe,ne]=ut(!1),ee=function(le){const ae=_?_():null;ae&&typeof ae.catch=="function"&&(ne(!0),ae.catch(()=>!1).then(()=>ne(!1)))};return pt||(pt="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400"),Et` <button
    type="button"
    class="inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${pt} ${ct}"
    ref=${k}
    onclick=${ee}
    disabled=${st||oe}
  >
    ${$}
    <${oe?Icons.refresh:dt} class="w-4 ${oe?"animate-spin":""}" />
  <//>`}function Login({loginFn:$,logoIcon:_,title:st,tipText:ct}){const[dt,k]=ut(""),[pt,te]=ut(""),Zt=function(oe){const ee={Authorization:"Basic "+btoa(dt+":"+pt)};return fetch("api/login",{headers:ee}).then($).finally(le=>te(""))};return Et`
    <div class="h-full flex items-center justify-center relative overflow-hidden z-0">
      <!-- Decorative background glow -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl w-96 p-8 relative z-10 flex flex-col items-center">
        <div class="mb-8 flex flex-col items-center justify-center gap-y-4">
          <div class="p-3 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-2xl shadow-inner">
            <${_} class="h-16 w-16 stroke-cyan-600 drop-shadow-sm" />
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
              oninput=${oe=>k(oe.target.value)}
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
              oninput=${oe=>te(oe.target.value)}
              value=${pt}
              onkeydown=${oe=>oe.key==="Enter"&&Zt()}
            />
          <//>
        <//>

        <div class="mt-8 w-full">
          <${Button}
            title="Sign In"
            icon=${Icons.logout}
            onclick=${Zt}
            colors="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            cls="w-full py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex justify-center"
          />
        <//>

        ${ct?Et`<div class="mt-6 text-center text-slate-500 text-xs font-medium px-4">${ct}<//>`:""}
      <//>
    <//>
  `}function Colored({icon:$,text:_,colors:st}){return st||(st="bg-slate-100 text-slate-900"),Et` <span class="inline-flex items-center gap-1.5 py-0.5">
    ${$&&Et`<${$} class="w-5 h-5" />`}
    <span
      class="inline-block font-medium rounded-md px-2 py-1 text-xs ring-1 ring-inset ${st}"
      >${_}<//
    >
  <//>`}function Stat({title:$,text:_,tipText:st,tipIcon:ct,tipColors:dt,colors:k}){return Et` <div
    class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800"
  >
    <div class="overflow-auto rounded-lg bg-white px-4 py-2 ">
      <div class="flex items-center gap-x-2">
        <p class="text-sm truncate text-gray-500 font-medium">${$}</p>
      <//>
      <div class="mt-1 flex items-center gap-x-2">
        <h3
          class="text-xl truncate font-semibold tracking-tight ${k||"text-gray-800 dark:text-gray-200"}"
        >
          ${_}
        <//>
        <span class="flex items-center ${st||"hidden"}">
          <${Colored} text=${st} icon=${ct} colors=${dt} />
        <//>
      <//>
    <//>
  <//>`}const ruLangswitch=["","ID - уникальный числовой идентификатор выключателя. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","Device connection - Здесь указаны пины одного или нескольких устройств, с которыми взаимодействует данный выключатель.",'INFO - Укажите название данного выключателя для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение обработчика состояния на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек и соединений выключателя."],ruLangselect=["","ID - уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type(s) of pin(s) - Выберите режим работы данного пина из предложенных вариантов."],rulangbutton=["","ID - уникальный числовой идентификатор кнопки. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","sclick - Выполняемая команда при одинарном клике кнопки.","dclick - Выполняемая команда при двойном клике кнопки.","lpress - Выполняемая команда при удержании кнопки.",'INFO - Укажите название данной кнопки для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение функции кнопки на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек кнопки."],ruencoder=["","ID - уникальный числовой идентификатор энкодера. Присваивается автоматически.","Pin - Уникальный номер пина.","Encoder A (ID) - Основной пин энкодера A (DT).","Encoder B (ID) - Дополнительный пин энкодера B (CLK).","PWM connection - Подключение ШИМ для управления яркостью (диммер).","Dimmer value (0-100) - Текущее значение диммера от 0 до 100.","Duty on restore - Восстановление значения скважности (яркости) при включении контроллера.","INFO - Укажите название данного энкодера для быстрой навигации.","On/Off - Включение или отключение обработчика энкодера.","Action - Кнопка Edit позволяет зайти в меню настроек энкодера.","PWM Frequency - Частота ШИМ управляемого устройства (в герцах).","Resolution (steps) - Максимальное количество шагов от 0 до 100% для ШИМ устройства."],rulangtimers=["","No - Уникальный числовой идентификатор задачи (cron). Присваивается автоматически.","Cron - Сконфигурируйте расписание (cron) для выполнения задачи.","Script - Какое действие (скрипт) должно выполниться в указанное в таймере время.",'Info - Дайте название выбранному таймеру для быстрой навигации, например "Полив газона". Не более 30-ти символов!',"On/Off - Вкл/Откл выполнение данной задачи.","Action - Кнопка Edit позволяет зайти в меню настроек задачи."],rulangsettings=["","Login - Введите имя пользователя для входа в систему. Используется при авторизации в веб-интерфейсе.","Password - Введите пароль для входа в систему. Рекомендуется использовать надёжный пароль.","Time zone UTC - Выберите свой часовой пояс. Влияет на отображение времени и расчёт восхода/заката.","IP address - Введите статический IP-адрес устройства. После перезагрузки STM32 будет доступен по этому адресу. Формат: 192.168.1.100","Subnet mask - Введите маску подсети. Определяет диапазон адресов вашей локальной сети. Формат: 255.255.255.0","Default gateway - Введите IP-адрес шлюза по умолчанию (обычно адрес вашего роутера). Формат: 192.168.1.1","Token - Секретный ключ для авторизации API-запросов. Используется в URL командах управления устройством. Пример: /api/Token/switch?id=1&onoff=1","Host - Введите IP-адрес или доменное имя MQTT-брокера. Пример: 192.168.1.50 или broker.hivemq.com","Port - Укажите порт MQTT-брокера. Стандартный порт: 1883 (без шифрования), 8883 (с TLS).","Client - Уникальный идентификатор клиента MQTT. Каждое устройство должно иметь свой уникальный Client ID.","User - Имя пользователя для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","Password - Пароль для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","TX topic - Исходящий топик MQTT. На этот топик устройство публикует свои данные и события. Пример: Swarm","RX topic - Входящий топик MQTT. С этого топика устройство получает команды управления. Пример: Swarm","HTTPS domain - Доменное имя для HTTPS-соединения. Необходим действующий SSL-сертификат для этого домена. Пример: zagotovka.ddns.net",'Private Key - Закрытый ключ SSL-сертификата в формате PEM. Начинается с "-----BEGIN EC PRIVATE KEY-----". Хранится в зашифрованном виде.','Public Key - Публичный сертификат SSL в формате PEM. Начинается с "-----BEGIN CERTIFICATE-----". Используется для HTTPS-соединения.',"Longitude - Долгота вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 37.618 (Москва)","Latitude - Широта вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 55.751 (Москва)","Sunrise - Время восхода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на восходе.","Sunset - Время захода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на закате.","Day Length - Продолжительность светового дня, рассчитывается автоматически на основе координат и текущей даты.","Next full moon - Дата и время следующего полнолуния, рассчитывается автоматически.","Date - Дата для автономного (offline) режима в формате дд.мм.гг. Используется когда нет доступа к NTP-серверу. Пример: 15.03.25","Time - Время для автономного (offline) режима в формате чч:мм:сс. Используется когда нет доступа к NTP-серверу. Пример: 14:30:00","RX Z2M topic - Префикс топика Zigbee2MQTT. По умолчанию: zigbee2mqtt. Устройство подписывается на {prefix}/data/... и публикует команды в {prefix}/cmd/.... Пример: zigbee2mqtt"],ruLangsecurity=["","RXD Pin - Пин приема данных (RX).","TXD Pin - Пин передачи данных (TX).","Phone Number - Номер телефона для отправки SMS и звонков.","Info - Дополнительная информация для быстрой навигации.","OnOff - Включение или отключение модуля SIM800L.","Action - Кнопка Edit позволяет зайти в меню настроек."],ruLangsecuritypins=["","ID - уникальный числовой идентификатор пина. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type of sensor - Тип подключенного сенсора (PIR, Normal open, Normal close).","Action - Действие, выполняемое при срабатывании сенсора.","Send SMS - Отправлять ли SMS при срабатывании сенсора (YES/NO).","INFO - Дополнительная информация для быстрой навигации.","On/Off - Включение или отключение охранного пина.","Edit Pin - Редактирование настроек охранного пина."],rulange1Wire=["","ID - Уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового пина, к которому подключена шина 1-Wire.","Selected sensor - Здесь вы выбираете подключённый к пину датчик температуры: DS18B20 или DHT22.","Count of sensors - Количество найденных 1-Wire температурных датчиков на данном пине.","On/Off - Функция включения или отключения опроса подключенных датчиков на данной шине.","Actions - Кнопка Edit для привязки конкретного датчика к этому соединению."],rulangpid=["","No - Уникальный числовой идентификатор, присваивается автоматически.",'PWM Pin - Выбранный вами PWM пин на странице "Select pin".',"Sel. sensor - Укажите один из двух типов (DS18B20/DHT22) температурного датчика.",'Dev. ser. number - Серийный номер выбранного DS18B20 датчика (со страницы "OneWire pin").',"Presets - Выберите пресет, максимально соответствующий нужным температурным и временным параметрам.","T set. - Задайте целевую температуру, которую должен поддерживать PID-контроллер.","T cur. - Текущая температура выбранного датчика.","Duty - Текущее значение PWM.",'Info - Название PID-контроллера для быстрой навигации (например: "Тёплый пол в детской").',"On/Off - Вкл/Откл данного PID-контроллера.","Action - Кнопка для входа в меню настроек PID-контроллера.","Auto tune - Автоматический подбор коэффициентов PID."],enLangswitch=["","ID - A unique numerical identifier of the switch. Assigned automatically","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","Device connection - Here will appear one or more devices/relays of pin(s) with which this switch interacts.",'INFO - Give a name of this switch for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the switch state handler on this pin.","Action - The Edit button allows you to access the switch settings menu."],enLangselect=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type(s) of pin(s) - Select the operating mode of this pin from the provided options."],enlangbutton=["","ID - A unique numerical identifier of the button. Assigned automatically.","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","sclick - Command to execute when the button is pressed once.","dclick - Command to execute when the button is pressed twice.","lpress - Command to execute when the button is long pressed.",'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the button function on this pin.","Action - The Edit button allows you to access the button settings menu."],enencoder=["","ID - A unique numerical identifier of the encoder. Assigned automatically.","PIN - The unique number of the pin.","Encoder A (ID) - Main pin of encoder A (DT).","Encoder B (ID) - Additional pin of encoder B (CLK).","PWM connection - PWM connection for brightness control (dimmer).","Dimmer value (0-100) - Current dimmer value from 0 to 100.","Duty on restore - Value of duty cycle (brightness) to restore when the controller is turned on.","INFO - Give a name to this encoder for quick navigation.","On/Off - Enable or disable the encoder handler.","Action - The Edit button allows you to access the encoder settings menu.","PWM Frequency - PWM frequency of the controlled device (in Hertz).","Resolution (steps) - Maximum number of steps from 0 to 100% for the PWM device."],enlangtimers=["","No - A unique numerical identifier of the task (cron). Assigned automatically.","Cron - Configure a schedule (cron) to perform the action.","Script - What action (script) must be performed at the time specified in the timer.",'Info - Give a name to the selected timer for quick navigation, e.g."Lawn Watering", "Backyard Light", etc. No more than 30 characters!',"On/Off - Enable or disable the execution of this task.","Action - The Edit button allows you to access the task settings menu."],enlangsettings=["","Login - Enter the username for logging into the system. Used for web interface authentication.","Password - Enter your password for the system. It is recommended to use a strong password.","Time zone UTC - Select your time zone. Affects time display and sunrise/sunset calculations.","IP address - Enter a static IP address for the device. After reboot, STM32 will be available at this address. Format: 192.168.1.100","Subnet mask - Enter the subnet mask. Defines the range of addresses in your local network. Format: 255.255.255.0","Default gateway - Enter the default gateway IP address (usually your router address). Format: 192.168.1.1","Token - Secret key for API request authorization. Used in device control URL commands. Example: /api/Token/switch?id=1&onoff=1","Host - Enter the IP address or domain name of the MQTT broker. Example: 192.168.1.50 or broker.hivemq.com","Port - Specify the MQTT broker port. Standard port: 1883 (no encryption), 8883 (with TLS).","Client - Unique MQTT client identifier. Each device must have its own unique Client ID.","User - Username for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","Password - Password for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","TX topic - Outgoing MQTT topic. The device publishes its data and events to this topic. Example: Swarm","RX topic - Incoming MQTT topic. The device receives control commands from this topic. Example: Swarm","HTTPS domain - Domain name for HTTPS connection. A valid SSL certificate for this domain is required. Example: zagotovka.ddns.net",'Private Key - SSL certificate private key in PEM format. Starts with "-----BEGIN EC PRIVATE KEY-----". Stored in encrypted form.','Public Key - SSL public certificate in PEM format. Starts with "-----BEGIN CERTIFICATE-----". Used for HTTPS connection.',"Longitude - Longitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 37.618 (Moscow)","Latitude - Latitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 55.751 (Moscow)","Sunrise - Sunrise time is calculated automatically based on your coordinates. The slider enables/disables the action at sunrise.","Sunset - Sunset time is calculated automatically based on your coordinates. The slider enables/disables the action at sunset.","Day Length - Duration of daylight, calculated automatically based on coordinates and current date.","Next full moon - Date and time of the next full moon, calculated automatically.","Date - Date for offline mode in dd.mm.yy format. Used when there is no access to the NTP server. Example: 15.03.25","Time - Time for offline mode in hh:mm:ss format. Used when there is no access to the NTP server. Example: 14:30:00","RX Z2M topic - Zigbee2MQTT topic prefix. Default: zigbee2mqtt. The device subscribes to {prefix}/data/... and publishes commands to {prefix}/cmd/.... Example: zigbee2mqtt"],enLangsecurity=["","RXD Pin - Receive Data Pin (RX).","TXD Pin - Transmit Data Pin (TX).","Phone Number - Phone number for SMS notifications and calls.","Info - Additional information for quick navigation.","OnOff - Enable or disable the SIM800L module.","Action - The Edit button allows you to access the settings menu."],enLangsecuritypins=["","ID - A unique numerical identifier of the pin. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type of sensor - Type of connected sensor (PIR, Normal open, Normal close).","Action - Action to perform when the sensor is triggered.","Send SMS - Whether to send SMS when the sensor is triggered (YES/NO).","INFO - Additional information for quick navigation.","On/Off - Enable or disable the security pin.","Edit Pin - The Edit button allows you to access the security pin settings."],enlange1Wire=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital pin to which the 1-Wire bus is connected.","Selected sensor - Here you select the temperature sensor connected to the chosen pin: DS18B20 or DHT22.","Count of sensors - Number of 1-Wire temperature sensors on this pin.","On/Off - The function of enabling or disabling polling of connected sensors on this bus.","Actions - The Edit button to bind a specific sensor to this connection."],enlangpid=["","No - Unique numeric identifier, assigned automatically.",'PWM Pin - The PWM pin you selected on the "Select pin" page.',"Sel. sensor - Specify one of the two types (DS18B20/DHT22) of temperature sensors.",'Dev. ser. number - Serial number of the selected DS18B20 sensor (from the "OneWire pin" page).',"Presets - Select the preset that best matches the desired temperature and timing parameters.","T set. - Set the target temperature that the PID controller should maintain.","T cur. - Current temperature of the selected sensor.","Duty - Current PWM value.",'Info - Name of this PID controller for quick navigation (e.g., "Kids room warm floor").',"On/Off - Enable/Disable this PID controller.","Action - Button to enter the PID controller settings menu.","Auto tune - Automatic tuning of PID coefficients."];function initGlobalTooltip$8(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,te=window.innerWidth,Zt=dt.getBoundingClientRect();let oe=Zt.left+Zt.width/2-k/2;oe=Math.max(8,Math.min(oe,te-k-8));let ne=Zt.top-pt-8;ne<8&&(ne=Zt.bottom+8),$.style.left=oe+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const RadioOption=({id:$,value:_,label:st,disabled:ct=!1,onChange:dt,checked:k})=>Et`
  <div class="relative">
    <input
      id="${$}_${_}"
      class="sr-only peer"
      type="radio"
      name="topin_${$}"
      value="${_}"
      checked=${k}
      onChange=${dt}
      disabled=${ct}
      aria-label="${st}"
    />
    <label
      for="${$}_${_}"
      class="cursor-pointer px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300
             ${ct?"text-gray-400 cursor-not-allowed opacity-60":"text-slate-700 hover:bg-black/5"}
             peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-cyan-500 peer-checked:text-white peer-checked:shadow-sm"
    >
      ${st}
    </label>
  </div>
`,Th=({title:$,tooltipIndex:_,center:st,getTooltipText:ct})=>Et`
  <th
    class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
    style=${st?"text-align: center":""}
    data-tip=${ct("langselect",_)}
  >
    ${$}
  </th>
`,ArraySelect=({d:$,selectedValues:_,isRowDisabled:st,handleRadioChange:ct,handleFieldChange:dt})=>{const k=$.id<89,pt=$.id>=89,te=_[`topin_${$.id}`];return Et`
  <tr class="${st($.id)?"bg-red-200/50 opacity-50 pointer-events-none":$.id%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
    <td class="px-6 py-2 text-sm text-slate-800">${$.id}</td>
    <td class="px-6 py-2 text-sm text-slate-800 font-medium">${$.pins}</td>
    <td class="px-2 py-2">
      <div class="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
        ${k?Et`
          <${RadioOption} id=${$.id} value="0"  label="NONE"     checked=${te==="0"}  onChange=${ct} />
          <${RadioOption} id=${$.id} value="3"  label="SWITCH"   checked=${te==="3"}  onChange=${ct} />
          <${RadioOption} id=${$.id} value="1"  label="BUTTON"   checked=${te==="1"}  onChange=${ct} />
          <${RadioOption} id=${$.id} value="2"  label="DEVICE"   checked=${te==="2"}  onChange=${ct} />
          <${RadioOption} id=${$.id} value="4"  label="1-WIRE"   checked=${te==="4"}  onChange=${ct} />
          <${RadioOption} id=${$.id} value="5"  label="PWM"      disabled=${$.pwm==0} checked=${te==="5"}  onChange=${ct} />
          <${RadioOption} id=${$.id} value="8"  label="Enc.OutA" checked=${te==="8"}  onChange=${ct} />
          <${RadioOption} id=${$.id} value="9"  label="Enc.OutB" checked=${te==="9"}  onChange=${ct} />
          <${RadioOption} id=${$.id} value="10" label="Security" disabled=${$.monitoring==0} checked=${te==="10"} onChange=${ct} />
        `:Et`
          <${RadioOption} id=${$.id} value="0"  label="NONE"     checked=${te==="0"}  onChange=${ct} />
          <${RadioOption} id=${$.id} value="11" label="Zigbee"   checked=${te==="11"} onChange=${ct} />
        `}
      </div>
    </td>
  </tr>
  ${pt&&te==="11"&&Et`
  <tr class="bg-slate-50/80">
    <td colspan="3" class="px-6 py-3">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col sm:flex-row gap-2">
          <input type="text" placeholder="IEEE Address (e.g. 588e81fffe36a343)"
            value=${_[`zbee_ieee_${$.id}`]||""}
            onInput=${Zt=>{let oe=Zt.target.value.replace(/^0x/i,"").replace(/[^0-9a-fA-F]/g,"").slice(0,16);dt($.id,"zbee_ieee",oe)}}
            class="text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-400 flex-1" />
          <input type="number" placeholder="EP" min="1" max="240"
            value=${_[`zbee_endpoint_${$.id}`]||"1"}
            onInput=${Zt=>dt($.id,"zbee_endpoint",Zt.target.value)}
            class="text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-400 w-20" />
          <select value=${_[`zbee_cluster_${$.id}`]||"0006"}
            onChange=${Zt=>dt($.id,"zbee_cluster",Zt.target.value)}
            class="text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-400 w-40">
            <option value="0006">On/Off (0006)</option>
            <option value="0008">Level (0008)</option>
            <option value="0300">Color (0300)</option>
          </select>
          <input type="text" placeholder="Label (e.g. Lamp Kuhnya)"
            maxlength="29"
            value=${_[`zbee_label_${$.id}`]||""}
            onInput=${Zt=>dt($.id,"zbee_label",Zt.target.value)}
            class="text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-400 flex-1" />
        </div>
      </div>
    </td>
  </tr>
  `}
`};function TabSelect({}){const[$,_]=ut(null),[st,ct]=ut({}),[dt,k]=ut(null),[pt,te]=ut(!1),[Zt,oe]=ut(3),[ne,ee]=ut(!1),[le,ae]=ut("ru"),[pe,ie]=ut({physical:!1,zigbee:!1}),he=at(0),ue=at(null),ge=at({}),fe=de=>({topin:de.topin.toString(),zbee_ieee:de.zbee_ieee||"",zbee_endpoint:de.zbee_endpoint||1,zbee_cluster:de.zbee_cluster!=null?Number(de.zbee_cluster).toString(16).padStart(4,"0"):"0006",zbee_attribute:de.zbee_attribute!=null?Number(de.zbee_attribute).toString(16).padStart(2,"0"):"00",zbee_label:de.zbee_label||""});lt(()=>{initGlobalTooltip$8()},[]);const $e=de=>{ee(de),he.current=Date.now()},Te=de=>ne&&(de===1||de===35),_e=()=>fetch("/api/select/get",{cache:"no-store"}).then(de=>de.json()).then(de=>{const ce=de.data||de;_(ce),ee(de.sim800l===1),de.lang&&ae(de.lang);const ve={};ce.forEach(mt=>{ve[`topin_${mt.id}`]=mt.topin.toString(),mt.zbee_ieee!==void 0&&(ve[`zbee_ieee_${mt.id}`]=mt.zbee_ieee),mt.zbee_endpoint!==void 0&&(ve[`zbee_endpoint_${mt.id}`]=mt.zbee_endpoint),mt.zbee_cluster!==void 0&&(ve[`zbee_cluster_${mt.id}`]=mt.zbee_cluster.toString(16).padStart(4,"0")),mt.zbee_attribute!==void 0&&(ve[`zbee_attribute_${mt.id}`]=mt.zbee_attribute.toString(16).padStart(2,"0")),mt.zbee_label!==void 0&&(ve[`zbee_label_${mt.id}`]=mt.zbee_label)}),ct(ve);const vt={};ce.forEach(mt=>{vt[mt.id]=fe(mt)}),ge.current=vt});lt(()=>{let de=!0;return registerPoll("select","/api/select/get",function(ce){if(de&&!(Date.now()-he.current<3e4)&&ce!=null){const ve=ce.data||ce;_(ve),ee(ce.sim800l===1),ce.lang&&ae(ce.lang);const vt=JSON.stringify(ve);if(vt!==ue.current){ue.current=vt;const mt={};ve.forEach(Xt=>{mt[Xt.id]=fe(Xt)}),ge.current=mt,ct(Xt=>{const $t={};return ve.forEach(Yt=>{$t[`topin_${Yt.id}`]=Yt.topin.toString(),$t[`zbee_ieee_${Yt.id}`]=Xt[`zbee_ieee_${Yt.id}`]!=null?Xt[`zbee_ieee_${Yt.id}`]:Yt.zbee_ieee||"",$t[`zbee_endpoint_${Yt.id}`]=Xt[`zbee_endpoint_${Yt.id}`]!=null?Xt[`zbee_endpoint_${Yt.id}`]:Yt.zbee_endpoint||1,$t[`zbee_cluster_${Yt.id}`]=Xt[`zbee_cluster_${Yt.id}`]!=null?Xt[`zbee_cluster_${Yt.id}`]:Yt.zbee_cluster!=null?Number(Yt.zbee_cluster).toString(16).padStart(4,"0"):"0006",$t[`zbee_attribute_${Yt.id}`]=Xt[`zbee_attribute_${Yt.id}`]!=null?Xt[`zbee_attribute_${Yt.id}`]:Yt.zbee_attribute!=null?Number(Yt.zbee_attribute).toString(16).padStart(2,"0"):"00",$t[`zbee_label_${Yt.id}`]=Xt[`zbee_label_${Yt.id}`]!=null?Xt[`zbee_label_${Yt.id}`]:Yt.zbee_label||""}),$t})}}},{immediate:!0}),function(){de=!1,unregisterPoll("select")}},[]),lt(()=>{let de;return pt&&Zt>0?de=setTimeout(()=>{oe(Zt-1)},1e3):Zt===0&&(te(!1),k(null)),()=>clearTimeout(de)},[pt,Zt]);const Ie=async de=>{de.preventDefault();const ce=[];if($.forEach(ve=>{const vt=ge.current[ve.id]||{};if(ve.id<89){const mt=st[`topin_${ve.id}`],Xt=mt!==void 0?mt:ve.topin.toString();Xt!==vt.topin&&ce.push({id:ve.id,topin:parseInt(Xt)})}else{const mt={zbee_ieee:st[`zbee_ieee_${ve.id}`]||"",zbee_endpoint:st[`zbee_endpoint_${ve.id}`]||1,zbee_cluster:st[`zbee_cluster_${ve.id}`]||"0006",zbee_attribute:st[`zbee_attribute_${ve.id}`]||"00",zbee_label:st[`zbee_label_${ve.id}`]||""};(mt.zbee_ieee!==vt.zbee_ieee||String(mt.zbee_endpoint)!==String(vt.zbee_endpoint)||mt.zbee_cluster!==vt.zbee_cluster||mt.zbee_attribute!==vt.zbee_attribute||mt.zbee_label!==vt.zbee_label)&&ce.push({id:ve.id,zbee_ieee:mt.zbee_ieee,zbee_endpoint:parseInt(mt.zbee_endpoint)||1,zbee_cluster:parseInt(mt.zbee_cluster,16)||6,zbee_attribute:parseInt(mt.zbee_attribute,16)||0,zbee_label:mt.zbee_label})}}),te(!0),oe(3),ce.length===0){k("success");return}k("submitting");try{const vt={lang:le,sim800l:ne?1:0};for(let Xt=0;Xt<ce.length;Xt+=20){const $t=ce.slice(Xt,Xt+20);if(!(await fetch("/api/select/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...vt,data:$t})})).ok)throw new Error("Network response was not ok")}k("success");const mt={};ce.forEach(Xt=>{Xt.topin!==void 0&&(mt[`topin_${Xt.id}`]=Xt.topin.toString()),Xt.zbee_ieee!==void 0&&(mt[`zbee_ieee_${Xt.id}`]=Xt.zbee_ieee),Xt.zbee_endpoint!==void 0&&(mt[`zbee_endpoint_${Xt.id}`]=Xt.zbee_endpoint),Xt.zbee_cluster!==void 0&&(mt[`zbee_cluster_${Xt.id}`]=Xt.zbee_cluster.toString(16).padStart(4,"0")),Xt.zbee_attribute!==void 0&&(mt[`zbee_attribute_${Xt.id}`]=Xt.zbee_attribute.toString(16).padStart(2,"0")),Xt.zbee_label!==void 0&&(mt[`zbee_label_${Xt.id}`]=Xt.zbee_label)}),ct(Xt=>({...Xt,...mt})),he.current=0,_e()}catch(ve){k("error"),console.error("Error:",ve)}},Pe=de=>{const{name:ce,value:ve}=de.target;ct(vt=>({...vt,[ce]:ve})),he.current=Date.now()},xe=(de,ce,ve)=>{ct(vt=>({...vt,[`${ce}_${de}`]:ve})),he.current=Date.now()};if(!$)return"";const ke=de=>{ie(ce=>({...ce,[de]:!ce[de]}))},Oe=(de,ce)=>{const ve={langselect:le==="ru"?ruLangselect:enLangselect},mt=(ve[de]&&ve[de][ce]?ve[de][ce]:"").split(" "),Xt=[];for(let $t=0;$t<mt.length;$t+=15)Xt.push(mt.slice($t,$t+15).join(" "));return Xt.join("<br>")};return Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Select pin(s)
        </div>

        <form onSubmit=${Ie} class="flex-grow flex flex-col justify-center items-center w-full">
          <div class="w-full">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <button
                type="submit"
                class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${pt?"bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none":"bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"}`}
                disabled=${pt}
              >
                ${pt?`Please wait ${Zt} sec.`:"Submit"}
              </button>

              <div class="flex items-center gap-3">
                <span class="text-slate-600 font-bold uppercase tracking-widest text-2xl drop-shadow-sm">SIM800L</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    checked=${ne}
                    onChange=${de=>$e(de.target.checked)}
                  />
                  <div class="w-[42px] h-[22px] bg-slate-200/80 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300/50 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-400 peer-checked:to-cyan-500 shadow-inner"></div>
                </label>
              </div>
            </div>

            ${dt==="success"&&Et`
              <div class="mb-6 bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
                <strong class="font-bold">Успех! </strong>
                <span class="block sm:inline">Данные успешно сохранены. Идет запись на USB флешку. Кнопка станет активной через ${Zt} секунд.</span>
              </div>
            `}
            ${dt==="error"&&Et`
              <div class="mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
                <strong class="font-bold">Ошибка!</strong>
                <span class="block sm:inline">Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз через ${Zt} секунд.</span>
              </div>
            `}

            <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${Th} title="ID" tooltipIndex=${1} getTooltipText=${Oe} />
                      <${Th} title="Pin" tooltipIndex=${2} getTooltipText=${Oe} />
                      <${Th} title="Type(s) of pin(s)" tooltipIndex=${3} center=${!0} getTooltipText=${Oe} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${$&&Et`
                      <!-- Physical pins section -->
                      <tr class="bg-gradient-to-r from-slate-100 to-slate-50 cursor-pointer hover:from-slate-200 hover:to-slate-100 transition-colors" onclick=${()=>ke("physical")}>
                        <td colspan="3" class="px-6 py-3 text-lg font-bold text-slate-700">
                          <span class="mr-2 text-slate-500">${pe.physical?"▼":"▶"}</span>
                          ${le==="ru"?"Физические пины STM32":"Physical pins of STM32"}
                          <span class="ml-2 text-sm font-normal text-slate-500">(${$.filter(de=>de.id<89).length})</span>
                        </td>
                      </tr>
                      ${pe.physical&&$.filter(de=>de.id<89).map(de=>Et`<${ArraySelect} d=${de} selectedValues=${st} isRowDisabled=${Te} handleRadioChange=${Pe} handleFieldChange=${xe} />`)}
                      
                      <!-- Zigbee virtual pins section -->
                      <tr class="bg-gradient-to-r from-cyan-100 to-cyan-50 cursor-pointer hover:from-cyan-200 hover:to-cyan-100 transition-colors" onclick=${()=>ke("zigbee")}>
                        <td colspan="3" class="px-6 py-3 text-lg font-bold text-cyan-700">
                          <span class="mr-2 text-cyan-500">${pe.zigbee?"▼":"▶"}</span>
                          ${le==="ru"?"Виртуальные пины Zigbee":"Virtual pins of Zigbee"}
                          <span class="ml-2 text-sm font-normal text-cyan-500">(${$.filter(de=>de.id>=89).length})</span>
                        </td>
                      </tr>
                      ${pe.zigbee&&$.filter(de=>de.id>=89).map(de=>Et`<${ArraySelect} d=${de} selectedValues=${st} isRowDisabled=${Te} handleRadioChange=${Pe} handleFieldChange=${xe} />`)}
                    `}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${pt?"bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none":"bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"}`}
                disabled=${pt}
              >
                ${pt?`Please wait ${Zt} sec.`:"Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `}function ModalSwitch({modalType:$,page:_,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedSwitch:k,onSwitchChange:pt,connectionOptions:te,SliderComponent:Zt=MyPolzunok}){const[oe,ne]=ut((k==null?void 0:k.info)||""),[ee,le]=ut((k==null?void 0:k.onoff)||0),[ae,pe]=ut((k==null?void 0:k.ptype)||0),[ie,he]=ut((k==null?void 0:k.setrpins)||""),[ue,ge]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(ce=>{if(!ce.ok)throw new Error(`HTTP error! status: ${ce.status}`);return ce.json()}).then(ce=>{if(!ce||!ce.data||!Array.isArray(ce.data)){console.error("Invalid data format:",ce),ge([]);return}const ve=ce.data.filter(vt=>vt.topin===2||vt.topin===11);ge(ve)}).catch(ce=>{console.error("Error fetching pin config:",ce),ge([])})},[]);const fe=ce=>{ce.preventDefault();const ve=new FormData(ce.target),vt=Object.fromEntries(ve);if(vt.id=k.id,vt.pins=k.pins,$==="edit")vt.onoff=ee;else if($==="connection"){const mt=ue.find(Xt=>Xt.pins===vt.setrpins);mt&&(vt.pinact={...k.pinact,[mt.id]:mt.pins})}fetch("/api/switch/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(vt)}).then(mt=>mt.json()).then(mt=>{console.log("Success:",mt),pt({...k,...vt}),st(),window.location.href="/#/switch"}).catch(mt=>{console.error("Error:",mt)})},$e=ce=>{he(ce.target.value)},Te=ce=>{pe(parseInt(ce.target.value))},_e=ce=>{ne(ce.target.value)},Ie=ce=>{le(ce)},Pe=ce=>{ct&&ce.target===ce.currentTarget&&st()},xe=()=>{pe(0),ne(""),le(0)},Oe=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50"
      style="margin-top: 7px;"
      onclick=${Pe}
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
          ${(()=>{if(_==="TabSwitch"){if($==="connection")return Et`
          <form onsubmit=${fe}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${k.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${k.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Connection</td>
                    <td class="p-2">
                      <select
                        name="setrpins"
                        value=${ue.some(ce=>ce.pins===ie)?ie:""}
                        onchange=${$e}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select a connection</option>
                        ${ue.map(ce=>Et`
                            <option value=${ce.pins}>
                              ${ce.pins} (ID: ${ce.id})
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
          <form onsubmit=${fe}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${k.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${k.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Pullup type</td>
                    <td class="p-2">
                      <select
                        name="ptype"
                        value=${ae}
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
                        value=${oe}
                        oninput=${_e}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${Zt}
                        value=${ee}
                        onChange=${Ie}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-between items-center mt-4">
              <button
                type="button"
                onclick=${xe}
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
  `,de=at(null);return lt(()=>{const ce=document.createElement("div");return ce.id="modal-portal",document.body.appendChild(ce),de.current=ce,()=>{O(null,ce),document.body.removeChild(ce)}},[]),lt(()=>{de.current&&O(Oe,de.current)}),null}function initGlobalTooltip$7(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block";const k=dt.getBoundingClientRect();$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const pt=$.offsetWidth,te=$.offsetHeight,Zt=window.innerWidth;let oe=k.left+k.width/2-pt/2;oe=Math.max(8,Math.min(oe,Zt-pt-8));let ne=k.top-te-8;ne<8&&(ne=k.bottom+8),$.style.left=oe+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabSwitch({}){const[$,_]=ut(null),[st,ct]=ut(null),[dt,k]=ut(!1),[pt,te]=ut(null),[Zt,oe]=ut(null),[ne,ee]=ut(!1),[le,ae]=ut("ru"),[pe,ie]=ut(null),[he,ue]=ut([]),[ge,fe]=ut(""),[$e,Te]=ut(!1),_e=at(!1);lt(()=>{initGlobalTooltip$7()},[]);const Ie=()=>Promise.all([fetch("/api/switch/get").then($t=>$t.json()),fetch("/api/pintopin/get").then($t=>$t.json())]).then(([$t,Yt])=>{ae($t.lang),ie($t.switches),_($t),ue(Yt),fe(`Pintopin data: ${JSON.stringify(Yt,null,2)}

Switch data: ${JSON.stringify($t.switches,null,2)}`),console.log("Pintopin data:",Yt),console.log("Switch data:",$t.switches)}).catch($t=>{console.error("Error fetching data:",$t),fe(`Error fetching data: ${$t.message}`)});lt(()=>{let $t=!0;return registerPoll("switches","/api/state/switch",function(Yt){$t&&(_e.current||Yt!=null&&(Yt.switches&&(ie(Yt.switches),ae(Yt.lang)),Yt.pintopin&&ue(Yt.pintopin)))},{immediate:!0}),function(){$t=!1,unregisterPoll("switches")}},[]);const Pe=$t=>{const Yt=new Map,re=pe.find(ye=>ye.id===$t);return re&&re.pinact&&Object.entries(re.pinact).forEach(([ye,Ce])=>{Yt.set(ye,{pin:ye,relayId:Ce})}),he.forEach(ye=>{if(ye.idin===$t){const Ce=`${ye.pins}(${ye.idout})`;Yt.has(Ce)||Yt.set(Ce,{pin:ye.pins,relayId:ye.idout})}}),Array.from(Yt.values())},xe=()=>({langswitch:le==="ru"?ruLangswitch:enLangswitch}),ke=($t,Yt)=>{const re=xe(),Ce=(re[$t]&&re[$t][Yt]||"").split(" "),Me=[];let De="";for(let Se=0;Se<Ce.length;Se++){const we=Ce[Se];De.length+we.length+1<=200?De+=(De.length>0?" ":"")+we:(De.length>0&&Me.push(De),De=we)}return De.length>0&&Me.push(De),Me.join("<br>")},Oe=($t,Yt)=>{console.log("Удаление соединения:",$t,Yt);const[re,ye]=Yt.split("("),Ce=ye?parseInt(ye):null;fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:$t,pin:re.trim(),idout:Ce})}).then(Me=>Me.json()).then(Me=>{ct(Me),ie(De=>De.map(Se=>{if(Se.id===$t){const we={...Se.pinact};return delete we[re.trim()],{...Se,pinact:we}}return Se})),ue(De=>De.filter(Se=>!(Se.idin===$t&&Se.pins===re.trim()&&(Ce===null||Se.idout===Ce))))}).then(()=>{console.log("Соединение удалено успешно"),Ie()}).catch(Me=>{console.error("Ошибка при удалении соединения:",Me)})},de=($t,Yt)=>{te($t),oe(Yt),k(!0)},ce=()=>{k(!1),te(null),oe(null)},ve=$t=>{console.log("handleSwitchChange:",$t),ie(Yt=>Yt.map(re=>re.id===$t.id?$t:re)),_e.current=!0,fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:$t.id,onoff:$t.onoff})}).then(Yt=>Yt.json()).then(Yt=>{console.log("Response from /api/onoff/set:",Yt)}).catch(Yt=>{console.error("Error calling /api/onoff/set:",Yt)}).finally(()=>{setTimeout(()=>{_e.current=!1},1500)}),ce()},vt={ru:Et`
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
    `},mt=$t=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${ke("langswitch",$t.tooltipIndex)}
    >
      ${$t.title}
    </th>
  `,Xt=({d:$t,index:Yt})=>{const re=Pe($t.id);return Et`
      <tr class="${Yt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${$t.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${$t.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][$t.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono">
          ${re.map(({pin:ye,relayId:Ce})=>Et`
              <span class="mr-2 inline-flex items-center">
                ${ye}${Ce!==void 0?`(${Ce})`:""}
                <button
                  onClick=${Me=>{Me.preventDefault(),Oe($t.id,`${ye}(${Ce})`)}}
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
            onChange=${ye=>ve({...$t,onoff:ye})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>de("connection",$t)}
            class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
          >
            Connection
          </button>
          <span class="text-slate-300">|</span>
          <button
            onClick=${()=>de("edit",$t)}
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
                      <${mt} title="ID" tooltipIndex=${1} />
                      <${mt} title="Pin" tooltipIndex=${2} />
                      <${mt} title="Pullup type" tooltipIndex=${3} />
                      <${mt} title="Device connection" tooltipIndex=${4} />
                      <${mt} title="INFO" tooltipIndex=${5} />
                      <${mt} title="On/Off" tooltipIndex=${6} />
                      <${mt} title="Action" tooltipIndex=${7} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${pe.map(($t,Yt)=>Et`<${Xt} d=${$t} index=${Yt} key=${$t.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>ee(!ne)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${ne?"Hide Help":"Show Help"}
              </button>
            </div>

            ${ne&&Et`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${vt[le]}
                </div>
              `}
          </div>
        </div>

        ${dt&&Et`
            <${ModalSwitch}
              modalType=${pt}
              page="TabSwitch"
              hideModal=${ce}
              title=${pt==="connection"?"Edit Connection":"Edit switch"}
              selectedSwitch=${Zt}
              onSwitchChange=${ve}
            />
          `}
      </div>
    </div>
  `:""}const ModalButton=({modalType,page,hideModal,closeOnOverlayClick=!0,title,selectedButton,onButtonChange,SliderComponent=MyPolzunok})=>{const[buttonInfo,setButtonInfo]=ut((selectedButton==null?void 0:selectedButton.info)||""),[onoff,setOnOff]=ut((selectedButton==null?void 0:selectedButton.onoff)||0),[ptype,setPtype]=ut((selectedButton==null?void 0:selectedButton.ptype)||0),[sclick,setSclick]=ut((selectedButton==null?void 0:selectedButton.sclick)||""),[dclick,setDclick]=ut((selectedButton==null?void 0:selectedButton.dclick)||""),[lpress,setLpress]=ut((selectedButton==null?void 0:selectedButton.lpress)||""),[pinOptions,setPinOptions]=ut([]),[errors,setErrors]=ut({sclick:null,dclick:null,lpress:null}),[submitError,setSubmitError]=ut(null),doubleClickLongPressRegex=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,validateInput=$=>!$||$.trim()===""||$.toLowerCase()==="none"||doubleClickLongPressRegex.test($)?null:'Incorrect format. Use "None" or "pin:value" format.',handleInputChange=($,_)=>{const st=validateInput(_);switch(setErrors(ct=>({...ct,[$]:st})),$){case"sclick":setSclick(_);break;case"dclick":setDclick(_);break;case"lpress":setLpress(_);break}};lt(()=>{fetch("/api/select/get").then($=>$.json()).then($=>{Array.isArray($)?setPinOptions($.filter(_=>_.topin===2||_.topin===11)):setPinOptions([])}).catch($=>{console.error("Error fetching pin config:",$),setPinOptions([])})},[]);const handleSubmit=$=>{if($.preventDefault(),Object.values(errors).some(st=>st!==null)){setSubmitError("Please correct the errors before submitting.");return}const _={...selectedButton,info:buttonInfo,sclick:sclick||"None",dclick:dclick||"None",lpress:lpress||"None",onoff,ptype};fetch("/api/button/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(_)}).then(st=>st.json()).then(st=>{onButtonChange(_),hideModal()}).catch(st=>{console.error("Error:",st),setSubmitError("Failed to save changes. Please try again.")})},handleResetPin=()=>{setPtype(0),setSclick(""),setDclick(""),setLpress(""),setButtonInfo(""),setOnOff(0),setErrors({sclick:null,dclick:null,lpress:null})},renderConnectionModal=()=>Et`
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
  `,portalRef=at(null);return lt(()=>{const $=document.createElement("div");return $.id="modal-portal",document.body.appendChild($),portalRef.current=$,()=>{O(null,$),document.body.removeChild($)}},[]),lt(()=>{portalRef.current&&O(modalContent,portalRef.current)}),null};function initGlobalTooltip$6(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,te=window.innerWidth,Zt=dt.getBoundingClientRect();let oe=Zt.left+Zt.width/2-k/2;oe=Math.max(8,Math.min(oe,te-k-8));let ne=Zt.top-pt-8;ne<8&&(ne=Zt.bottom+8),$.style.left=oe+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabButton=()=>{const[$,_]=ut(null),[st,ct]=ut([]),[dt,k]=ut(null),[pt,te]=ut(null),[Zt,oe]=ut(!1),[ne,ee]=ut(null),[le,ae]=ut(null),[pe,ie]=ut(!1),[he,ue]=ut("ru"),[ge,fe]=ut(""),$e=at(!1);lt(()=>{initGlobalTooltip$6()},[]);const Te={ru:Et`
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
    `};lt(()=>{let vt=!0;return registerPoll("buttons","/api/state/button",mt=>{vt&&($e.current||mt!=null&&mt.buttons&&(k(mt.buttons),ue(mt.lang)))},{immediate:!0}),()=>{vt=!1,unregisterPoll("buttons")}},[]);const _e=vt=>{const mt=new Map,Xt=dt.find($t=>$t.id===vt);return Xt&&Xt.pinact&&Object.entries(Xt.pinact).forEach(([$t,Yt])=>{mt.set($t,{pin:$t,relayId:Yt})}),st.forEach($t=>{if($t.idin===vt){const Yt=`${$t.pins}(${$t.idout})`;mt.has(Yt)||mt.set(Yt,{pin:$t.pins,relayId:$t.idout})}}),Array.from(mt.values())},Ie=()=>({langbutton:he==="ru"?rulangbutton:enlangbutton}),Pe=(vt,mt)=>{const Xt=Ie(),$t=Xt[vt]&&Xt[vt][mt]?Xt[vt][mt]:"";return xe($t)},xe=(vt,mt=100)=>{if(!vt||typeof vt!="string")return"";const Xt=[];let $t="";const Yt=vt.split(`
`);return Yt.forEach((re,ye)=>{re.split(" ").filter(Me=>Me.length>0).forEach(Me=>{const De=$t.length===0?Me:" "+Me;$t.length+De.length<=mt?$t+=De:($t.length>0&&Xt.push($t),$t=Me)}),$t.length>0&&(Xt.push($t),$t=""),ye<Yt.length-1&&Xt.push("")}),$t.length>0&&Xt.push($t),Xt.join(`
`)},ke=(vt,mt)=>{ee(vt),ae(mt),oe(!0)},Oe=()=>{oe(!1),ee(null),ae(null)},de=vt=>{console.log("handleButtonChange:",vt),k(mt=>mt.map(Xt=>Xt.id===vt.id?{...Xt,...vt}:Xt)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:vt.id,onoff:vt.onoff})}).then(mt=>mt.json()).then(mt=>{console.log("Response from /api/onoff/set:",mt)}).catch(mt=>{console.error("Error calling /api/onoff/set:",mt)}).finally(()=>{setTimeout(()=>{$e.current=!1},1500)}),Oe()},ce=vt=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Pe("langbutton",vt.tooltipIndex)}
    >
      ${vt.title}
    </th>
  `,ve=({d:vt,index:mt})=>(_e(vt.id),Et`
      <tr class="${mt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${vt.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${vt.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][vt.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${xe(vt.sclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${xe(vt.dclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${xe(vt.lpress)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${vt.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${vt.onoff}
            onChange=${Xt=>de({...vt,onoff:Xt})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>ke("edit",vt)}
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
                      <${ce} title="ID" tooltipIndex=${1} />
                      <${ce} title="Pin" tooltipIndex=${2} />
                      <${ce} title="Pullup type" tooltipIndex=${3} />
                      <${ce} title="SINGLE CLICK" tooltipIndex=${4} />
                      <${ce} title="DOUBLE CLICK" tooltipIndex=${5} />
                      <${ce} title="LONG PRESS" tooltipIndex=${6} />
                      <${ce} title="INFO" tooltipIndex=${7} />
                      <${ce} title="On/Off" tooltipIndex=${8} />
                      <${ce} title="Action" tooltipIndex=${9} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${dt.map((vt,mt)=>Et`<${ve} d=${vt} index=${mt} key=${vt.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>ie(!pe)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${pe?"Hide Help":"Show Help"}
              </button>
            </div>

            ${pe&&Et`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${Te[he]}
                </div>
              `}
          </div>
        </div>
      </div>
    </div>

    ${Zt&&Et`
        <${ModalButton}
          modalType=${ne}
          page="TabButton"
          hideModal=${Oe}
          title=${ne==="connection"?"Edit Connection":"Edit Button pin"}
          selectedButton=${le}
          onButtonChange=${de}
        />
      `}
  `:""};function ModalEncoder({modalType:$,page:_,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedEncoder:k,handleEncoderChange:pt,connectionOptions:te,SliderComponent:Zt=MyPolzunok}){const[oe,ne]=ut((k==null?void 0:k.info)||""),[ee,le]=ut((k==null?void 0:k.onoff)===1),[ae,pe]=ut({pin:(k==null?void 0:k.encdrbpin)||"",id:(k==null?void 0:k.encoderb)||""}),[ie,he]=ut(Object.entries(k.pinact||{})[0]||["",""]),[ue,ge]=ut([]),[fe,$e]=ut([]),[Te,_e]=ut([]),Ie=k.pwmmax||100,[Pe,xe]=ut(k.dvalue||0),[ke,Oe]=ut(k.ponr||0),[de,ce]=ut(k.pwm||1e7),ve=we=>Math.round(we*Ie/100);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(we=>{if(!we.ok)throw new Error(`HTTP error! status: ${we.status}`);return we.json()}).then(we=>{if(!we||!we.data||!Array.isArray(we.data)){console.error("Invalid data format:",we),ge([]),$e([]),_e([]);return}const se=we.data.filter(Ee=>Ee.topin===2||Ee.topin===11),me=we.data.filter(Ee=>Ee.topin===9),be=we.data.filter(Ee=>Ee.topin===5);if(ge(se),$e(me),_e(be),k.encoderb||k.encdrbpin){const Ee=me.find(Le=>String(Le.id)===String(k.encoderb)||Le.pins===k.encdrbpin);pe({pin:Ee?Ee.pins:"",id:Ee?Ee.id:""})}}).catch(we=>{console.error("Error fetching pin config:",we),ge([]),$e([]),_e([])})},[k]);const vt=we=>{if(we.preventDefault(),!(we.target instanceof HTMLFormElement))return;let me={};if($==="edit")me={topin:8,id:k.id,pins:k.pins,pwm:parseInt(de),pwmmax:k.pwmmax,dvalue:parseInt(Pe),ponr:parseInt(ke),info:oe,onoff:ee?1:0};else if($==="connection"){const Ee=ie&&ie[0]&&ie[1]!==void 0?{[ie[0]]:parseInt(ie[1])}:{};me={id:k.id,pins:k.pins,pwm:parseInt(de)},ae&&ae.id!==void 0&&ae.id!==""?(me.encoderb=parseInt(ae.id),me.encdrbpin=ae.pin):(me.encoderb=255,me.encdrbpin=""),me.pinact=Ee}console.log("Sending JSON to STM32:",JSON.stringify(me)),fetch("/api/encoder/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(me)}).then(be=>be.json()).then(be=>{pt({...k,...me}),st()}).catch(be=>console.error("Error saving encoder:",be))},mt=we=>{ne(we.target.value)},Xt=we=>{le(we)},$t=we=>{const se=fe.find(me=>me.pins===we.target.value);pe({pin:we.target.value,id:se?se.id:""})},Yt=we=>{if(!we.target.value)he(["",""]);else{const se=we.target.value.split("|");he([se[0],se[1]])}},re=we=>{xe(we.target.value)},ye=we=>{Oe(we.target.value)},Ce=we=>{const se=we/1e3;return se<=4e4?{cls:"text-green-600",msg:"Optimal range"}:se<=2e5?{cls:"text-yellow-600",msg:"Precision might drop"}:{cls:"text-red-600",msg:"Expert mode: low precision"}},De=Et`
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
        ${(()=>{if(_==="TabEncoder"){if($==="connection")return Et`
          <form onsubmit=${vt}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${k.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${k.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Encoder B</td>
                    <td class="p-2">
                      <select
                        name="encdrb"
                        value=${fe.some(we=>we.pins===ae.pin)?ae.pin:""}
                        onchange=${$t}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select Encoder B</option>
                        ${fe.map(we=>Et`
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
                        value=${Te.some(we=>String(we.pins)===String(ie[0]))?`${ie[0]}|${ie[1]}`:""}
                        onchange=${Yt}
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
          <form onsubmit=${vt}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${k.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${k.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">PWM Frequency (milliHz)</td>
                    <td class="p-2">
                      <input
                        type="number"
                        min="50"
                        max="2000000000"
                        value=${de}
                        oninput=${we=>ce(we.target.value)}
                        class="border rounded p-2 w-full font-mono"
                        placeholder="50 - 2000000000"
                      />
                      <div class="text-xs ${Ce(de).cls}">
                        ${Ce(de).msg}
                      </div>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Resolution</td>
                    <td class="p-2 text-blue-600 font-mono">
                      ${k.pwmmax||"---"} steps
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Dimmer value %</td>
                    <td class="p-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value=${Pe}
                        oninput=${re}
                        class="border rounded p-2 w-full"
                      />
                      <div class="text-xs text-gray-500">
                        ${Pe}% = ${ve(parseInt(Pe)||0)} / ${Ie} steps
                      </div>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Duty on restore</td>
                    <td class="p-2">
                      <select
                        value=${ke}
                        onchange=${ye}
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
                        value=${oe}
                        oninput=${mt}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${Zt}
                        value=${ee}
                        onChange=${Xt}
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
  `,Se=at(null);return lt(()=>{const we=document.createElement("div");return we.id="encoder-modal-portal",document.body.appendChild(we),Se.current=we,()=>{O(null,we),document.body.removeChild(we)}},[]),lt(()=>{Se.current&&O(De,Se.current)}),null}function initGlobalTooltip$5(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,te=window.innerWidth,Zt=dt.getBoundingClientRect();let oe=Zt.left+Zt.width/2-k/2;oe=Math.max(8,Math.min(oe,te-k-8));let ne=Zt.top-pt-8;ne<8&&(ne=Zt.bottom+8),$.style.left=oe+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const pwmTimerMap={PA0:"TIM2",PA3:"TIM2",PB10:"TIM2",PA6:"TIM3",PB1:"TIM3",PB15:"TIM12",PC6:"TIM8",PC7:"TIM8",PC8:"TIM8",PC9:"TIM8",PD12:"TIM4",PD13:"TIM4",PD14:"TIM4",PD15:"TIM4",PE5:"TIM9",PE6:"TIM9",PE9:"TIM1",PE11:"TIM1",PE13:"TIM1",PE14:"TIM1",PF6:"TIM10",PF7:"TIM11",PF8:"TIM13",PF9:"TIM14"};function TabEncoder({}){{const[$,_]=ut(null),[st,ct]=ut(null),[dt,k]=ut(!1),[pt,te]=ut(null),[Zt,oe]=ut(null),[ne,ee]=ut(!1),[le,ae]=ut("ru"),[pe,ie]=ut([]),he=at(!1);lt(()=>{initGlobalTooltip$5()},[]);const ue=()=>Promise.all([fetch("/api/encoder/get").then(vt=>vt.json()),fetch("/api/pintopin/get").then(vt=>vt.json())]).then(([vt,mt])=>{ae(vt.lang),_(vt.encoders),ie(mt),console.log("Encoder data:",vt.encoders),console.log("Pintopin data:",mt)}).catch(vt=>{console.error("Error fetching data:",vt)});lt(()=>{let vt=!0;return registerPoll("encoders","/api/state/encoder",function(mt){vt&&(he.current||mt!=null&&(mt.encoders&&(_(mt.encoders),ae(mt.lang)),mt.pintopin&&ie(mt.pintopin)))},{immediate:!0}),function(){vt=!1,unregisterPoll("encoders")}},[]);const ge=vt=>{_(mt=>mt.map(Xt=>Xt.id===vt.id?vt:Xt)),he.current=!0,fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:vt.id,onoff:vt.onoff})}).then(mt=>mt.json()).then(mt=>{console.log("Response from /api/onoff/set (Encoder):",mt)}).catch(mt=>{console.error("Error calling /api/onoff/set (Encoder):",mt)}).finally(()=>{setTimeout(()=>{he.current=!1},1500)})},fe=vt=>{const mt=$.find($t=>$t.id===vt),Xt=[];return mt&&mt.pinact&&Object.entries(mt.pinact).forEach(([$t,Yt])=>{Xt.push({pin:$t,idout:Yt})}),Xt},$e=vt=>{const mt=vt/1e3;return mt<=4e4?{cls:"text-green-600",msg:"✓"}:mt<=2e5?{cls:"text-yellow-600",msg:"~"}:{cls:"text-red-600",msg:"!"}},Te=vt=>{if(!vt)return"—";const mt=vt/1e3;return mt>=1e6?`${(mt/1e6).toFixed(2)} MHz`:mt>=1e3?`${(mt/1e3).toFixed(1)} kHz`:`${mt} Hz`},_e=()=>({langbutton:le==="ru"?ruencoder:enencoder}),Ie=(vt,mt)=>{const Xt=_e(),$t=Xt[vt]&&Xt[vt][mt]?Xt[vt][mt]:"";return Pe($t)},Pe=(vt,mt=50)=>{if(!vt||typeof vt!="string")return"";const Xt=vt.split(" ");let $t=[],Yt="";for(let re=0;re<Xt.length;re++)Yt.length+Xt[re].length+1<=mt?Yt+=`${Yt?" ":""}${Xt[re]}`:(Yt&&$t.push(Yt.trim()),Yt=Xt[re]);return Yt&&$t.push(Yt.trim()),$t.join(`
`)},xe=(vt,mt)=>{console.log("Deleting connection:",vt,mt);const Xt=mt.split("(")[0].trim();fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:vt,pin:Xt})}).then($t=>$t.ok?$t.json():$t.text().then(Yt=>{throw new Error(`HTTP error! status: ${$t.status}, message: ${Yt}`)})).then($t=>{ct($t),_(Yt=>Yt.map(re=>{if(re.id===vt){const ye={...re.pinact};return delete ye[Xt],{...re,pinact:ye}}return re})),ie(Yt=>Yt.filter(re=>!(re.idin===vt&&re.pins===Xt)))}).then(()=>{console.log("Connection deleted successfully"),ue()}).catch($t=>{console.error("Error deleting connection:",$t)})},ke=(vt,mt)=>{console.log("Opening modal:",vt,mt),te(vt),oe(mt),k(!0)},Oe=()=>{k(!1),te(null),oe(null)},de={ru:Et`
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
      `},ce=({title:vt,tooltipIndex:mt})=>Et`
      <th
        class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
        data-tip=${Ie("langbutton",mt)}
      >
        ${vt}
      </th>
    `,ve=({d:vt,index:mt})=>{const Xt=fe(vt.id),$t=$e(vt.pwm||0),Yt=Xt.map(re=>pwmTimerMap[re.pin]).filter((re,ye,Ce)=>re&&Ce.indexOf(re)===ye);return Et`
        <tr class="${mt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
          <td class="px-6 py-2 text-sm text-slate-800 font-medium">${vt.pins}(${vt.id})</td>
          <td class="px-6 py-2 text-sm text-slate-700">
            ${vt.encdrbpin?`${vt.encdrbpin}(${vt.encoderb})`:"Not set"}
          </td>
          <td class="px-6 py-2 text-sm text-slate-700 font-mono">
            ${Xt.length>0?Xt.map(({pin:re,idout:ye})=>Et`
                    <span class="mr-2 inline-flex items-center">
                      ${re}(${ye})
                      <button
                        onClick=${Ce=>{Ce.preventDefault(),xe(vt.id,`${re}(${ye})`)}}
                        class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                        title="Remove connection"
                      >
                        [x]
                      </button>
                    </span>
                  `):"Not set"}
          </td>
          <td class="px-6 py-2 text-sm">
            <span class="font-mono text-slate-700">${Te(vt.pwm)}</span>
            <span class="ml-1 font-bold ${$t.cls}">${$t.msg}</span>
            ${Yt.length>0?Et`<span class="ml-2 font-mono text-xs text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200 shadow-sm" title="Hardware Timer">${Yt.join(", ")}</span>`:""}
          </td>
          <td class="px-6 py-2 font-mono text-sm text-blue-600">
            ${vt.pwmmax?`${vt.pwmmax} steps`:"—"}
          </td>
          <td class="px-6 py-2 text-sm text-slate-800">${vt.dvalue}</td>
          <td class="px-6 py-2 text-sm text-slate-700 font-semibold">${vt.ponr===1?"ON":"OFF"}</td>
          <td class="px-6 py-2 text-sm text-slate-600">${vt.info}</td>
          <td class="px-6 py-2">
            <${MyPolzunok}
              value=${vt.onoff}
              onChange=${re=>ge({...vt,onoff:re})}
            />
          </td>
          <td class="px-6 py-2 text-sm whitespace-nowrap">
            <button
              onClick=${()=>ke("connection",vt)}
              class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
            >
              Connection
            </button>
            <span class="text-slate-300">|</span>
            <button
              onClick=${()=>ke("edit",vt)}
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
                        <${ce} title="Encoder A (ID)" tooltipIndex=${3} />
                        <${ce} title="Encoder B (ID)" tooltipIndex=${4} />
                        <${ce} title="PWM connection" tooltipIndex=${5} />
                        <${ce} title="PWM Frequency" tooltipIndex=${11} />
                        <${ce} title="Resolution (steps)" tooltipIndex=${12} />
                        <${ce} title="Dimmer value (0-100)" tooltipIndex=${6} />
                        <${ce} title="Duty on restore" tooltipIndex=${7} />
                        <${ce} title="INFO" tooltipIndex=${8} />
                        <${ce} title="On/Off" tooltipIndex=${9} />
                        <${ce} title="Action" tooltipIndex=${10} />
                      </tr>
                    </thead>
                    <tbody id="tab1" class="divide-y divide-white/40">
                      ${$.map((vt,mt)=>Et`<${ve} d=${vt} index=${mt} key=${vt.id} />`)}
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="flex justify-end mt-6">
                <button
                  onclick=${()=>ee(!ne)}
                  class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
                >
                  ${ne?"Hide Help":"Show Help"}
                </button>
              </div>

              ${ne&&Et`
                  <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                    ${de[le]}
                  </div>
                `}
            </div>
          </div>
          ${dt&&Et`
              <${ModalEncoder}
                modalType=${pt}
                page="TabEncoder"
                hideModal=${Oe}
                title=${pt==="connection"?"Edit Connection":"Edit Encoder"}
                selectedEncoder=${Zt}
                handleEncoderChange=${ge}
              />
            `}
        </div>
      </div>
    `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">Loading...</div>`}}function ModalCron({modalType:$,page:_,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedCron:k,handleCronChange:pt,connectionOptions:te,modalClass:Zt,SliderComponent:oe=MyPolzunok}){const[ne,ee]=ut((k==null?void 0:k.info)||""),[le,ae]=ut((k==null?void 0:k.onoff)===1),[pe,ie]=ut((k==null?void 0:k.activ)||""),[he,ue]=ut((k==null?void 0:k.cron)||""),[ge,fe]=ut(k.setrpins||""),$e=de=>{de.preventDefault();const ce=new FormData(de.target),ve=Object.fromEntries(ce);ve.id=k.id,ve.pins=k.pins,$==="edit"?(ve.onoff=le?1:0,ve.info=ne,ve.cron=he,ve.activ=pe):$==="connection"&&(ve.setrpins=ge),console.log("Data being sent to server:"),console.log(ve),console.log("Stringified data:"),console.log(JSON.stringify(ve)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ve)}).then(vt=>vt.json()).then(vt=>{console.log("Success:",vt),pt({...k,...ve}),st(),window.location.href="/#/cron"}).catch(vt=>{console.error("Error:",vt)})};lt(()=>{ee((k==null?void 0:k.info)||""),fe((k==null?void 0:k.setrpins)||""),ae((k==null?void 0:k.onoff)===1)},[k]);const Te=de=>{ue(de.target.value)},_e=de=>{ee(de.target.value)},Ie=de=>{ae(de)},Pe=de=>{ie(de.target.value)},xe=()=>{if(_==="TabCron"&&$==="edit")return Et`
          <form onsubmit=${$e}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  ${[{label:"ID",value:k.id},{label:"Cron",value:Et`
                        <input
                          type="text"
                          value=${he}
                          onInput=${Te}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"Script",value:Et`
                        <input
                          type="text"
                          value=${pe}
                          onInput=${Pe}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"INFO",value:Et`
                        <input
                          type="text"
                          value=${ne}
                          onInput=${_e}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"On/Off",value:Et`<${oe}
                        value=${le}
                        onChange=${Ie}
                      />`}].map((de,ce)=>Et`
                      <tr
                        class="${ce%2===1?"bg-white":"bg-gray-200"}"
                      >
                        <td class="p-2 font-bold">${de.label}</td>
                        <td class="p-2">${de.value}</td>
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
        `},ke=Et`
    <div class=${`modal ${Zt||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${de=>ct&&de.target===de.currentTarget&&st()}
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
            ${xe()}
          </div>
        </div>
      </div>
    </div>
  `,Oe=at(null);return lt(()=>{const de=document.createElement("div");return de.id="modal-portal",document.body.appendChild(de),Oe.current=de,()=>{O(null,de),document.body.removeChild(de)}},[]),lt(()=>{Oe.current&&O(ke,Oe.current)}),null}function ModalPwmCron({modalType:$,page:_,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedCron:k,handleCronChange:pt,modalClass:te,SliderComponent:Zt=MyPolzunok}){let oe="",ne="900",ee="0",le="100";if(k!=null&&k.activ&&k.activ.startsWith("pwm:")){const Xt=k.activ.substring(4).split(",");Xt.length===4&&(oe=Xt[0],ne=Xt[1],ee=Xt[2],le=Xt[3])}const[ae,pe]=ut((k==null?void 0:k.info)||""),[ie,he]=ut((k==null?void 0:k.onoff)===1),[ue,ge]=ut((k==null?void 0:k.cron)||""),[fe,$e]=ut(oe),[Te,_e]=ut(ne),[Ie,Pe]=ut(ee),[xe,ke]=ut(le),[Oe,de]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store"}).then(Xt=>Xt.json()).then(Xt=>{if(Xt&&Xt.data&&Array.isArray(Xt.data)){const $t=Xt.data.filter(Yt=>Yt.topin===5);de($t),!fe&&$t.length>0&&$e($t[0].id.toString())}}).catch(Xt=>console.error("Error fetching pin config:",Xt))},[]);const ce=Xt=>{Xt.preventDefault();const $t=new FormData(Xt.target),Yt=Object.fromEntries($t);Yt.id=k.id,Yt.pins=k.pins,Yt.onoff=ie?1:0,Yt.info=ae,Yt.cron=ue,Yt.activ=`pwm:${fe},${Te},${Ie},${xe}`,fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Yt)}).then(re=>re.json()).then(re=>{pt({...k,...Yt}),st(),window.location.href="/#/cron"}).catch(re=>console.error("Error:",re))},ve=()=>Et`
      <form onsubmit=${ce}>
        <div class="modal-body">
          <table class="table-auto w-full">
            <tbody>
              <tr class="bg-gray-200">
                <td class="p-2 font-bold">ID</td>
                <td class="p-2">${k.id}</td>
              </tr>
              <tr class="bg-white">
                <td class="p-2 font-bold">PWM Pin</td>
                <td class="p-2">
                  <select
                    value=${fe}
                    onChange=${Xt=>$e(Xt.target.value)}
                    class="border rounded p-2 w-full"
                    required
                  >
                    ${Oe.map(Xt=>Et`<option value=${Xt.id}>${Xt.pins}</option>`)}
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200">
                <td class="p-2 font-bold">Cron Pattern</td>
                <td class="p-2">
                  <input
                    type="text"
                    value=${ue}
                    onInput=${Xt=>ge(Xt.target.value)}
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
                    onInput=${Xt=>_e(Xt.target.value)}
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
                    value=${Ie}
                    onInput=${Xt=>Pe(Xt.target.value)}
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
                    value=${xe}
                    onInput=${Xt=>ke(Xt.target.value)}
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
                    onInput=${Xt=>pe(Xt.target.value)}
                    class="border rounded p-2 w-full"
                  />
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-2 font-bold">On/Off</td>
                <td class="p-2">
                  <${Zt} value=${ie} onChange=${he} />
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
    `,vt=Et`
    <div class=${`modal ${te||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${Xt=>ct&&Xt.target===Xt.currentTarget&&st()}
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
            ${ve()}
          </div>
        </div>
      </div>
    </div>
  `,mt=at(null);return lt(()=>{const Xt=document.createElement("div");return Xt.id="pwm-modal-portal",document.body.appendChild(Xt),mt.current=Xt,()=>{O(null,Xt),document.body.removeChild(Xt)}},[]),lt(()=>{mt.current&&O(vt,mt.current)}),null}function initGlobalTooltip$4(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,te=window.innerWidth,Zt=dt.getBoundingClientRect();let oe=Zt.left+Zt.width/2-k/2;oe=Math.max(8,Math.min(oe,te-k-8));let ne=Zt.top-pt-8;ne<8&&(ne=Zt.bottom+8),$.style.left=oe+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabCron({}){const[$,_]=ut(null),[st,ct]=ut(null);at(null);const[dt,k]=ut(!1),[pt,te]=ut(null),[Zt,oe]=ut(null),[ne,ee]=ut("ru"),[le,ae]=ut(!1),[pe,ie]=ut(1),[he,ue]=ut(0),ge=at(!1);lt(()=>{initGlobalTooltip$4()},[]),lt(()=>{let vt=!0;return registerPoll("cron","/api/cron/get",function(mt){!vt||ge.current||mt!=null&&Array.isArray(mt.timers)&&(_(mt.timers),ee(mt.lang||"ru"),typeof mt.numline=="number"&&(ue(mt.numline),ie(mt.numline)))},{immediate:!0}),function(){vt=!1,unregisterPoll("cron")}},[]);const fe=vt=>{ge.current=!0,fetch("/api/numline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({numline:vt})}).then(mt=>mt.json()).catch(mt=>console.error("Error sending Crone line to stm32:",mt)).finally(()=>{setTimeout(()=>{ge.current=!1},1500)})},$e=()=>{if(pe<$.length){const vt=pe+1;ie(vt),ue(vt),fe(vt)}},Te=()=>{if(pe>0){const vt=pe-1;ie(vt),ue(vt),fe(vt)}},_e={ru:Et`
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
    `};if($===null)return Et`<div>Loading...</div>`;const Ie=()=>({langtimers:ne==="ru"?rulangtimers:enlangtimers}),Pe=(vt,mt)=>{const Xt=Ie(),Yt=(Xt[vt]&&Xt[vt][mt]?Xt[vt][mt]:"").split(" "),re=[];for(let ye=0;ye<Yt.length;ye+=15)re.push(Yt.slice(ye,ye+15).join(" "));return re.join("<br>")},xe=(vt,mt)=>{te(vt),oe(mt),k(!0)},ke=()=>{k(!1),te(null),oe(null)},Oe=vt=>{console.log("handleCronChange:",vt),_($.map(mt=>mt.id===vt.id?vt:mt)),ge.current=!0,fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(vt)}).then(mt=>mt.json()).then(mt=>{console.log("Cron job updated successfully:",mt)}).catch(mt=>{console.error("Error updating cron job:",mt)}).finally(()=>{setTimeout(()=>{ge.current=!1},1500)})},de=()=>Array.isArray(Zt)?Zt.flatMap(vt=>vt.pinact?Object.keys(vt.pinact).map(mt=>({value:mt,label:mt})):[]):Zt&&Zt.pinact?Object.keys(Zt.pinact).map(vt=>({value:vt,label:vt})):[],ce=vt=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Pe("langtimers",vt.tooltipIndex)}
    >
      ${vt.title}
    </th>
  `,ve=({d:vt,index:mt})=>{const Xt=vt.activ&&vt.activ.startsWith("pwm:");let $t=vt.activ;if(Xt){const Yt=vt.activ.substring(4).split(",");Yt.length===4&&($t=`pwmID=${Yt[0]} | ${Yt[1]}s | ${Yt[2]}%→${Yt[3]}%`)}return Et`
    <tr class="${mt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-4 text-sm text-slate-800 font-medium">${vt.id}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider">${vt.cron}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider items-center gap-1 flex justify-start">${$t}</td>
      <td class="px-6 py-4 text-sm text-slate-600">${vt.info}</td>
      <td class="px-6 py-4">
        <${MyPolzunok}
          value=${vt.onoff}
          onChange=${Yt=>Oe({...vt,onoff:Yt})}
        />
      </td>
     <td class="px-6 py-4 text-center">
        ${Xt?Et`
          <button
            onclick=${()=>xe("edit_pwm",vt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-3"
          >
            Edit
          </button>
          <button
            onclick=${()=>xe("edit_pwm",vt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap ml-1"
          >
            PWM
          </button>
        `:Et`
       <button
            onclick=${()=>xe("edit",vt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
          >
            Edit
          </button>
          <button
            onclick=${()=>xe("edit_pwm",vt)}
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
                          <${ce} title="No" tooltipIndex=${1} />
                          <${ce} title="Cron" tooltipIndex=${2} />
                          <${ce} title="Script" tooltipIndex=${3} />
                          <${ce} title="Info" tooltipIndex=${4} />
                          <${ce} title="On/Off" tooltipIndex=${5} />
                          <${ce} title="Action" tooltipIndex=${6} />
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-white/40">
                        ${$.slice(0,pe).map((vt,mt)=>Et`<${ve} d=${vt} index=${mt} key=${vt.id} />`)}
                      </tbody>
                    </table>
                  </div>
                </div>
              `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No cron jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>ae(!le)}
          >
            ${le?"Hide Help":"Show Help"}
          </button>
          <div class="font-semibold text-slate-600 tracking-wide">
            ${$&&$.length-pe>0?`Still available: ${$.length-pe} cron jobs`:"No available: cron jobs!"}
          </div>
          <div class="flex gap-2">
            ${$&&pe<$.length?Et`
                  <button
                    class="bg-emerald-500 hover:bg-emerald-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-emerald-500/30"
                    onclick=${$e}
                    title="Add Cron"
                  >+</button>
                `:null}
            ${pe>0?Et`
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
          ${_e[ne]}
        </div>
      `}

      ${dt&&pt==="edit_pwm"?Et`
        <${ModalPwmCron}
          modalType=${pt}
          page="TabCron"
          hideModal=${ke}
          title="Edit PWM Timer(s)"
          selectedCron=${Zt}
          handleCronChange=${Oe}
          modalClass="mt-24"
        />
      `:dt?Et`
        <${ModalCron}
          modalType=${pt}
          page="TabCron"
          hideModal=${ke}
          title=${pt==="edit"?"Edit Timer(s)":"Edit Connection"}
          selectedCron=${Zt}
          handleCronChange=${Oe}
          connectionOptions=${de()}
          modalClass="mt-24"
        />
      `:null}
    </div>
  `}function TabZigbee({}){const[$,_]=ut([]),[st,ct]=ut("ru"),[dt,k]=ut(!1),[pt,te]=ut(null),Zt=at(!1),oe=()=>fetch("/api/zigbee/get").then(ie=>ie.json()).then(ie=>{ct(ie.lang||"ru"),_(ie.zigbee||[])}).catch(ie=>console.error("Error fetching zigbee data:",ie));lt(()=>{oe();let ie=!0;return registerPoll("zigbee","/api/zigbee/get",function(he){ie&&(Zt.current||he&&he.zigbee&&(_(he.zigbee),ct(he.lang||"ru")))}),()=>{ie=!1,unregisterPoll("zigbee")}},[]);const ne=ie=>{te({...ie}),k(!0)},ee=()=>{k(!1),te(null)},le=()=>{pt&&fetch("/api/zigbee/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:pt.id,ieee:pt.ieee,ep:parseInt(pt.ep),cl:parseInt(pt.cl),attr:parseInt(pt.attr),info:pt.info,onoff:pt.onoff})}).then(ie=>ie.json()).then(()=>{_(ie=>ie.map(he=>he.id===pt.id?pt:he)),ee(),oe()}).catch(ie=>console.error("Error saving zigbee:",ie))},ae=(ie,he)=>{const ue={...ie,onoff:he?1:0};_(ge=>ge.map(fe=>fe.id===ie.id?ue:fe)),Zt.current=!0,fetch("/api/zigbee/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ue)}).then(ge=>ge.json()).finally(()=>{setTimeout(()=>{Zt.current=!1},1500)})},pe=({title:ie})=>Et`<th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">${ie}</th>`;return Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Zigbee Devices
        </div>
        
        <div class="flex-grow flex flex-col justify-center items-center w-full">
          <div class="w-full">
            <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${pe} title="ID" />
                      <${pe} title="IEEE" />
                      <${pe} title="EP/CL/ATTR" />
                      <${pe} title="INFO" />
                      <${pe} title="On/Off" />
                      <${pe} title="Action" />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${$.map((ie,he)=>Et`
                      <tr class="${he%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
                        <td class="px-6 py-2 text-sm text-slate-800">${ie.id}</td>
                        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${ie.ieee||"-"}</td>
                        <td class="px-6 py-2 text-sm text-slate-700 font-mono">${ie.ep} / 0x${ie.cl.toString(16).toUpperCase()} / 0x${ie.attr.toString(16).toUpperCase()}</td>
                        <td class="px-6 py-2 text-sm text-slate-600">${ie.info}</td>
                        <td class="px-6 py-2">
                          <${MyPolzunok} value=${ie.onoff} onChange=${ue=>ae(ie,ue)} />
                        </td>
                        <td class="px-6 py-2 text-sm">
                          <button onClick=${()=>ne(ie)} class="text-blue-600 hover:text-blue-800 font-semibold transition-colors">Edit</button>
                        </td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      ${dt&&Et`
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 class="text-xl font-bold text-gray-800">Edit Zigbee Device ${pt.id}</h3>
              <button onClick=${ee} class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">IEEE Address (hex)</label>
                <input type="text" value=${pt.ieee} onInput=${ie=>te({...pt,ieee:ie.target.value})} class="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Endpoint</label>
                  <input type="number" value=${pt.ep} onInput=${ie=>te({...pt,ep:ie.target.value})} class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Cluster (dec)</label>
                  <input type="number" value=${pt.cl} onInput=${ie=>te({...pt,cl:ie.target.value})} class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Attr (dec)</label>
                  <input type="number" value=${pt.attr} onInput=${ie=>te({...pt,attr:ie.target.value})} class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Info / Name</label>
                <input type="text" value=${pt.info} onInput=${ie=>te({...pt,info:ie.target.value})} class="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>
            <div class="p-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
              <button onClick=${ee} class="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick=${le} class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Save</button>
            </div>
          </div>
        </div>
      `}
    </div>
  `}const PRESETS$1={ru:[{value:"1",label:"Паяльная станция T max=125°C, T min=-55°C"},{value:"2",label:"Кулер / вентилятор T max=70°C, T min=-55°C"},{value:"3",label:"3D‑принтер (стол) T max=120°C, T min=0°C"},{value:"4",label:"Форточный нагреватель T max=60°C, T min=-55°C"},{value:"5",label:"Тёплый пол T max=45°C, T min=0°C"},{value:"6",label:"Холодильник T max=100°C, T min=-55°C"},{value:"7",label:"Аквариум / бойлер T max=80°C, T min=0°C"},{value:"8",label:"Инкубатор T max=45°C, T min=0°C"},{value:"9",label:"Теплица / комната T max=50°C, T min=-55°C"}],en:[{value:"1",label:"Soldering station T max=125°C, T min=-55°C"},{value:"2",label:"Cooler / fan T max=70°C, T min=-55°C"},{value:"3",label:"3D printer (table) T max=120°C, T min=0°C"},{value:"4",label:"Vent heater T max=60°C, T min=-55°C"},{value:"5",label:"Warm floor T max=45°C, T min=0°C"},{value:"6",label:"Refrigerator T max=100°C, T min=-55°C"},{value:"7",label:"Aquarium / boiler T max=80°C, T min=0°C"},{value:"8",label:"Incubator T max=45°C, T min=0°C"},{value:"9",label:"Greenhouse / room T max=50°C, T min=-55°C"}]},SENSOR_OPTIONS$1=[{value:"1",label:"DS18B20"},{value:"2",label:"DHT-22"}];function ModalPid({modalType:$,page:_,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedPid:k,handlePidChange:pt,language:te="en",modalClass:Zt,SliderComponent:oe=MyPolzunok}){const[ne,ee]=ut((k==null?void 0:k.info)||""),[le,ae]=ut((k==null?void 0:k.onoff)===1),[pe,ie]=ut((k==null?void 0:k.selsens)||"1"),[he,ue]=ut((k==null?void 0:k.sernum)||""),[ge,fe]=ut((k==null?void 0:k.presets)||"1"),[$e,Te]=ut((k==null?void 0:k.tmpset)||""),[_e,Ie]=ut((k==null?void 0:k.tmpcur)||""),[Pe,xe]=ut([]),[ke,Oe]=ut(Object.entries((k==null?void 0:k.pinact)||{})[0]||["",""]);lt(()=>{ee((k==null?void 0:k.info)||""),ae((k==null?void 0:k.onoff)===1),ie((k==null?void 0:k.selsens)||"1"),ue((k==null?void 0:k.sernum)||""),fe((k==null?void 0:k.presets)||"1"),Te((k==null?void 0:k.tmpset)||""),Ie((k==null?void 0:k.tmpcur)||""),Oe(Object.entries((k==null?void 0:k.pinact)||{})[0]||["",""])},[k]),lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then($t=>{if(!$t.ok)throw new Error(`HTTP error! status: ${$t.status}`);return $t.json()}).then($t=>{if(!$t||!$t.data||!Array.isArray($t.data)){console.error("Invalid data format:",$t),xe([]);return}const Yt=$t.data.filter(re=>re.topin===5);xe(Yt)}).catch($t=>{console.error("Error fetching pin config:",$t),xe([])})},[k]);const de=$t=>{$t.preventDefault();const Yt=ke[0]&&ke[1]!==void 0&&ke[1]!=="",re={id:k.id,pins:ke[0],pinact:Yt?{[ke[0]]:parseInt(ke[1])}:{},selsens:pe,sernum:he,presets:ge,tmpset:$e,tmpcur:_e,info:ne,onoff:le?1:0};console.log("Data being sent to server:",re),fetch("/api/pid/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(re)}).then(ye=>ye.json()).then(ye=>{console.log("Success:",ye),pt({...k,...re}),st(),window.location.href="/#/pid"}).catch(ye=>{console.error("Error:",ye)})},ce=$t=>{if(!$t.target.value)Oe(["",""]);else{const Yt=$t.target.value.split("|");Oe([Yt[0],Yt[1]])}},ve=PRESETS$1[te]||PRESETS$1.en,vt=()=>_==="TabPid"&&$==="edit"?Et`
        <form onsubmit=${de}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                ${[{label:"ID",value:k.id},{label:"PWM Pin",value:Et`
                        <select
                          value=${Pe.some($t=>String($t.pins)===String(ke[0]))?`${ke[0]}|${ke[1]}`:""}
                          onChange=${ce}
                          class="border rounded p-2 w-full"
                        >
                          <option value="">Select PWM pin</option>
                          ${Pe.map($t=>Et`
                              <option value=${`${$t.pins}|${$t.id}`}>
                                ${$t.pins} (ID: ${$t.id})
                              </option>
                            `)}
                        </select>
                      `},{label:"Selected sensor",value:Et`
                      <select
                        value=${pe}
                        onChange=${$t=>ie($t.target.value)}
                        class="border rounded p-2 w-full"
                      >
                        ${SENSOR_OPTIONS$1.map($t=>Et`
                            <option
                              value=${$t.value}
                              selected=${$t.value===pe}
                            >
                              ${$t.label}
                            </option>
                          `)}
                      </select>
                    `},{label:"Dev. ser. number",value:pe==="1"?Et`
                          <input
                            type="text"
                            value=${he}
                            onInput=${$t=>ue($t.target.value)}
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
                        value=${ge}
                        onChange=${$t=>fe($t.target.value)}
                        class="border rounded p-2 w-full"
                      >
                        ${ve.map($t=>Et`
                            <option
                              value=${$t.value}
                              selected=${$t.value===ge}
                            >
                              ${$t.label}
                            </option>
                          `)}
                      </select>
                    `},{label:"t_set",value:Et`
                      <input
                        type="text"
                        value=${$e}
                        onInput=${$t=>Te($t.target.value)}
                        class="border rounded p-2 w-full"
                        placeholder="°C"
                      />
                    `},{label:"t_current",value:Et`
                      <input
                        type="text"
                        value=${_e}
                        readOnly
                        class="border rounded p-2 w-full bg-gray-100 cursor-not-allowed"
                        placeholder="°C"
                      />
                    `},{label:"INFO",value:Et`
                      <input
                        type="text"
                        value=${ne}
                        onInput=${$t=>ee($t.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    `},{label:"On/Off",value:Et`
                      <${oe}
                        value=${le}
                        onChange=${$t=>ae($t)}
                      />
                    `}].map(($t,Yt)=>Et`
                    <tr class="${Yt%2===1?"bg-white":"bg-gray-200"}">
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
      `:null,mt=Et`
    <div class=${`modal ${Zt||""}`}>
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
            ${vt()}
          </div>
        </div>
      </div>
    </div>
  `,Xt=at(null);return lt(()=>{const $t=document.createElement("div");return $t.id="modal-portal",document.body.appendChild($t),Xt.current=$t,()=>{O(null,$t),document.body.removeChild($t)}},[]),lt(()=>{Xt.current&&O(mt,Xt.current)}),null}function initGlobalTooltip$3(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,te=window.innerWidth,Zt=dt.getBoundingClientRect();let oe=Zt.left+Zt.width/2-k/2;oe=Math.max(8,Math.min(oe,te-k-8));let ne=Zt.top-pt-8;ne<8&&(ne=Zt.bottom+8),$.style.left=oe+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const PRESETS={ru:[{value:"1",label:"Паяльная станция T max=125°C, T min=-55°C"},{value:"2",label:"Кулер / вентилятор T max=70°C, T min=-55°C"},{value:"3",label:"3D‑принтер (стол) T max=120°C, T min=0°C"},{value:"4",label:"Форточный нагреватель T max=60°C, T min=-55°C"},{value:"5",label:"Тёплый пол T max=45°C, T min=0°C"},{value:"6",label:"Холодильник T max=100°C, T min=-55°C"},{value:"7",label:"Аквариум / бойлер T max=80°C, T min=0°C"},{value:"8",label:"Инкубатор T max=45°C, T min=0°C"},{value:"9",label:"Теплица / комната T max=50°C, T min=-55°C"}],en:[{value:"1",label:"Soldering station T max=125°C, T min=-55°C"},{value:"2",label:"Cooler / fan T max=70°C, T min=-55°C"},{value:"3",label:"3D printer (table) T max=120°C, T min=0°C"},{value:"4",label:"Vent heater T max=60°C, T min=-55°C"},{value:"5",label:"Warm floor T max=45°C, T min=0°C"},{value:"6",label:"Refrigerator T max=100°C, T min=-55°C"},{value:"7",label:"Aquarium / boiler T max=80°C, T min=0°C"},{value:"8",label:"Incubator T max=45°C, T min=0°C"},{value:"9",label:"Greenhouse / room T max=50°C, T min=-55°C"}]},SENSOR_OPTIONS=[{value:"1",label:"DS18B20"},{value:"2",label:"DHT-22"}],HELP_CONTENT$1={ru:Et`
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
  `,document.head.appendChild($)}function TabPid({}){const[$,_]=ut(null),[st,ct]=ut(null);at(null);const[dt,k]=ut(!1),[pt,te]=ut(null),[Zt,oe]=ut(null),[ne,ee]=ut("ru"),[le,ae]=ut(!1),[pe,ie]=ut(0),[he,ue]=ut(0),ge=at(!1);lt(()=>{initGlobalTooltip$3(),initTuneStyles()},[]),lt(()=>{let Yt=!0;return registerPoll("pid","/api/state/pid",function(re){!Yt||ge.current||re!=null&&Array.isArray(re.pid)&&(_(re.pid),ee(re.lang||"ru"),typeof re.pidline=="number"&&(ue(re.pidline),ie(re.pidline)))},{immediate:!0}),function(){Yt=!1,unregisterPoll("pid")}},[]);const fe=at(!0);lt(()=>{if(fe.current){fe.current=!1;return}$e(he)},[he]);const $e=Yt=>{ge.current=!0,fetch("/api/pidline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pidline:Yt})}).then(re=>re.json()).catch(re=>console.error("Error sending PID line to stm32:",re)).finally(()=>{setTimeout(()=>{ge.current=!1},1500)})},Te=()=>{if(pe<PID_MAX_SLOTS){const Yt=pe+1;ie(Yt),ue(Yt)}},_e=()=>{if(pe>0){const Yt=pe-1;ie(Yt),ue(Yt)}};if($===null)return Et`<div>Loading...</div>`;const Ie=()=>({langtimers:ne==="ru"?rulangtimers:enlangtimers,langpid:ne==="ru"?rulangpid:enlangpid}),Pe=(Yt,re)=>{const ye=Ie(),Me=(ye[Yt]&&ye[Yt][re]?ye[Yt][re]:"").split(" "),De=[];for(let Se=0;Se<Me.length;Se+=15)De.push(Me.slice(Se,Se+15).join(" "));return De.join("<br>")},xe=(Yt,re)=>{te(Yt),oe(re),k(!0)},ke=()=>{k(!1),te(null),oe(null)},Oe=Yt=>{console.log("handlePidChange:",Yt),_($.map(re=>re.id===Yt.id?Yt:re)),ge.current=!0,fetch("/api/pid/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Yt)}).then(re=>re.json()).then(re=>{console.log("PID job updated successfully:",re)}).catch(re=>{console.error("Error updating PID job:",re)}).finally(()=>{setTimeout(()=>{ge.current=!1},1500)})},de=Yt=>{const re=Yt.id,ye=Yt.tune_state||0;if(!(ye===TUNE_STEP||ye===TUNE_BIAS)){if(ye===TUNE_ERROR){ce(re);return}console.log("Run tune for id:",re),fetch("/api/pid/tune",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:re,action:"start"})}).then(Ce=>Ce.json()).then(Ce=>{console.log("Tune start response:",Ce)}).catch(Ce=>{console.error("Error starting tune:",Ce)})}},ce=Yt=>{console.log("Stop tune for id:",Yt),fetch("/api/pid/tune",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:Yt,action:"stop"})}).then(re=>re.json()).then(re=>{console.log("Tune stop response:",re)}).catch(re=>{console.error("Error stopping tune:",re)})},ve=PRESETS[ne]||PRESETS.en,vt=Yt=>{const re=ve.find(ye=>ye.value===String(Yt));return re?re.label:Yt},mt=Yt=>{const re=SENSOR_OPTIONS.find(ye=>ye.value===String(Yt));return re?re.label:Yt},Xt=Yt=>Et`
    <th
      class="px-4 py-4 text-base font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Pe("langpid",Yt.tooltipIndex)}
    >
      ${Yt.title}
    </th>
  `,$t=(Yt,re)=>{const ye=Yt.tune_state||0,Ce=Yt.tune_progress||0,Me=ye===TUNE_STEP||ye===TUNE_BIAS,De=ye===TUNE_DONE,Se=ye===TUNE_ERROR,we=De?"background:linear-gradient(to right,#4ade80,#10b981);box-shadow:0 4px 14px rgba(16,185,129,0.4);":Se?"background:linear-gradient(to right,#dc2626,#b91c1c);box-shadow:0 4px 14px rgba(220,38,38,0.5);animation:tuneBlink 1s ease-in-out infinite;":"background:linear-gradient(to right,#ef4444,#e11d48);box-shadow:0 4px 14px rgba(239,68,68,0.4);",se="px-3 py-1 rounded-full text-sm font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap",me=De?"Tuning Done":Se?"⚠ Error!":"Run tune";if(Me){const be=Ce.toFixed(1),Le=`Auto Tune (${ye===TUNE_STEP?"Step test":"Bias search"})… ${Ce}%`;return Et`
        <tr key=${Yt.id} class="${re%2===1?"bg-white/80":"bg-sky-200/40"}">
          <td colspan="11" class="px-2 py-2">
            <div style="position:relative;width:100%;height:2.5rem;border-radius:0.75rem;overflow:hidden;background:#d1d5db;box-shadow:inset 0 2px 6px rgba(0,0,0,0.12);">
              <div
                style="position:absolute;left:0;top:0;bottom:0;width:${be}%;background:linear-gradient(90deg,#22c55e 0%,#16a34a 60%,#4ade80 100%);border-radius:inherit;transition:width 0.3s ease;box-shadow:0 0 14px rgba(34,197,94,0.55);"
              ></div>
              <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;user-select:none;">
                <span style="font-size:0.875rem;font-weight:700;color:#111827;white-space:nowrap;">${Le}</span>
              </div>
            </div>
          </td>
          <td class="px-4 py-2 text-center">
            <button
              onclick=${()=>ce(Yt.id)}
              class="px-3 py-1 rounded-full text-sm font-bold text-white whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95"
              style="background:linear-gradient(to right,#f97316,#ef4444);box-shadow:0 4px 14px rgba(239,68,68,0.4);"
            >Stop</button>
          </td>
        </tr>
      `}return Et`
      <tr key=${Yt.id} class="${re%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-4 py-3 text-sm text-slate-800 font-medium">${Yt.id}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">
          ${(()=>{const be=Object.entries(Yt.pinact||{});if(!be.length)return"—";const[Ee,Le]=be[0];return`${Ee}(${Le})`})()}
        </td>
        <td class="px-4 py-3 text-sm text-slate-700">${mt(Yt.selsens)}</td>
        <td class="px-4 py-3 text-sm font-mono ${Yt.selsens==="1"?"text-slate-700":"text-slate-400 italic"}">${Yt.selsens==="1"?Yt.sernum||"—":"N/A"}</td>
        <td class="px-4 py-3 text-sm text-slate-700">${vt(Yt.presets)}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">${Yt.tmpset}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">${Yt.tmpcur}</td>
        <td class="px-4 py-3 text-sm text-slate-800 font-mono ${Yt.onoff?"":"text-rose-500 font-bold"}">${Yt.onoff?Yt.duty!==void 0?Yt.duty:"—":"OFF"}</td>
        <td class="px-4 py-3 text-sm text-slate-600">${Yt.info}</td>
        <td class="px-4 py-3">
          <${MyPolzunok}
            value=${Yt.onoff}
            onChange=${be=>Oe({...Yt,onoff:be})}
          />
        </td>
        <td class="px-4 py-3 text-center">
          <button
            onclick=${()=>xe("edit",Yt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
          >Edit</button>
        </td>
        <td class="px-4 py-3 text-center">
          <button
            onclick=${()=>de(Yt)}
            class="${se}"
            style="${we}"
          >${me}</button>
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
                        <${Xt} title="No" tooltipIndex=${1} />
                        <${Xt} title="PWM Pin" tooltipIndex=${2} />
                        <${Xt} title="Sel. sensor" tooltipIndex=${3} />
                        <${Xt} title="Dev. ser. number" tooltipIndex=${4} />
                        <${Xt} title="Presets" tooltipIndex=${5} />
                        <${Xt} title="T set." tooltipIndex=${6} />
                        <${Xt} title="T cur." tooltipIndex=${7} />
                        <${Xt} title="Duty" tooltipIndex=${8} />
                        <${Xt} title="Info" tooltipIndex=${9} />
                        <${Xt} title="On/Off" tooltipIndex=${10} />
                        <${Xt} title="Action" tooltipIndex=${11} />
                        <${Xt} title="Auto tune" tooltipIndex=${12} />
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-white/40">
                      ${Array.from({length:pe},(Yt,re)=>{const ye=$&&$[re]?$[re]:{id:re+1,pins:"",pinact:{},selsens:"",sernum:"",presets:"",tmpset:"",tmpcur:"",info:"",onoff:0,tune_state:0,tune_progress:0};return $t(ye,re)})}
                    </tbody>
                  </table>
                </div>
              </div>
            `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No PID jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>ae(!le)}
          >
            ${le?"Hide Help":"Show Help"}
          </button>
          <div class="font-semibold text-slate-600 tracking-wide">
            ${$&&PID_MAX_SLOTS-pe>0?`Still available: ${PID_MAX_SLOTS-pe} PID jobs`:"No available: PID jobs!"}
          </div>
          <div class="flex gap-2">
            ${pe<PID_MAX_SLOTS?Et`
            <button
                class="bg-emerald-500 hover:bg-emerald-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-emerald-500/30"
                onclick=${Te}
                title="Add PID"
            >+</button>
            `:null}
            ${pe>0?Et`
                <button
                  class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                  onclick=${_e}
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
          modalType=${pt}
          page="TabPid"
          hideModal=${ke}
          title="Edit PID"
          selectedPid=${Zt}
          handlePidChange=${Oe}
          language=${ne}
          modalClass="mt-24"
        />
      `:null}
    </div>
  `}function ModalEditSensor({typsensor:$,oneWireId:_,pins:st,onClose:ct,onUpdate:dt,sensorType:k,sensorData:pt,closeOnOverlayClick:te=!0}){const[Zt,oe]=ut({ut:(pt==null?void 0:pt.ut)||$.ut,lt:(pt==null?void 0:pt.lt)||$.lt,action_ut:(pt==null?void 0:pt.action_ut)||$.action_ut,action_lt:(pt==null?void 0:pt.action_lt)||$.action_lt,upphumid:(pt==null?void 0:pt.upphumid)||$.upphumid||0,humlolim:(pt==null?void 0:pt.humlolim)||$.humlolim||0,actuphum:(pt==null?void 0:pt.actuphum)||$.actuphum||"",actlowhum:(pt==null?void 0:pt.actlowhum)||$.actlowhum||"",info:(pt==null?void 0:pt.info)||$.info,onoff:(pt==null?void 0:pt.onoff)||$.onoff||0,humidity:(pt==null?void 0:pt.humidity)||$.humidity||0}),[ne,ee]=ut(!1),le=(fe,$e,Te)=>{if(fe===""||fe==="-")return fe;const _e=fe.replace(",",".");if(!/^-?\d*\.?\d*$/.test(_e))return null;const Ie=parseFloat(_e);return isNaN(Ie)||Ie<$e||Ie>Te?null:_e},ae=fe=>{const{name:$e,value:Te}=fe.target;if(["ut","lt"].includes($e)){const _e=le(Te,-55,125);_e!==null&&oe(Ie=>({...Ie,[$e]:_e}))}else if(["upphumid","humlolim"].includes($e)){const _e=le(Te,0,100);_e!==null&&oe(Ie=>({...Ie,[$e]:_e}))}else oe(_e=>({..._e,[$e]:Te}))},pe=fe=>{const $e=["ut","lt","upphumid","humlolim"],Te={...fe};return $e.forEach(_e=>{Te[_e]===""||Te[_e]==="-"?Te[_e]=0:Te[_e]=parseFloat(Te[_e].toString().replace(",","."))}),Te},ue=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onclick=${fe=>{te&&fe.target===fe.currentTarget&&ct()}}
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
        <form onsubmit=${async fe=>{fe.preventDefault(),ee(!0);const $e=pe(Zt);try{if(!(await fetch("/api/sensor/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:_,pins:st,sensorNumber:$.s_number,...$e,s_number:$.s_number,t:$.t})})).ok)throw new Error("Network response was not ok");dt({...$,...$e,oneWireId:_,pins:st,s_number:$.s_number,t:$.t}),ct()}catch(Te){console.error("Error updating Sensor:",Te)}finally{ee(!1)}}}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                <tr class="bg-blue-100">
                  <td class="p-2 font-bold">Upper Temperature</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="ut"
                      value=${Zt.ut}
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
                      value=${Zt.lt}
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
                      value=${Zt.action_ut}
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
                      value=${Zt.action_lt}
                      oninput=${ae}
                      class="border rounded p-2 w-full"
                      maxlength="100"
                    />
                  </td>
                </tr>
                ${k===2?Et`
                      <tr class="bg-blue-100">
                        <td class="p-2 font-bold">Humidity upper limit</td>
                        <td class="p-2">
                          <input
                            type="text"
                            name="upphumid"
                            value=${Zt.upphumid}
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
                            value=${Zt.humlolim}
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
                            value=${Zt.actuphum}
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
                            value=${Zt.actlowhum}
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
                      value=${Zt.info}
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
  `,ge=at(null);return lt(()=>{const fe=document.createElement("div");return fe.id="modal-portal-sensor",document.body.appendChild(fe),ge.current=fe,()=>{O(null,fe),document.body.removeChild(fe)}},[]),lt(()=>{ge.current&&O(ue,ge.current)}),null}function ModalOneWire({oneWire:$,onClose:_,onUpdate:st,refresh:ct,closeOnOverlayClick:dt=!0}){console.log("oneWire object:",$);const[k,pt]=ut({typsensor:$.typsensor,numdevices:$.numdevices}),[te,Zt]=ut(!1),[oe,ne]=ut($.onoff||0),ee=ue=>{dt&&ue.target===ue.currentTarget&&_()},le=ue=>{const{name:ge,value:fe}=ue.target;let $e={...k,[ge]:parseInt(fe,10)};ge==="typsensor"&&(fe==="0"?$e.numdevices=0:fe==="2"&&($e.numdevices=1)),pt($e)},ae=ue=>{ne(ue)},ie=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onclick=${ee}
    >
      <div
        class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
        style="max-height: 90vh; overflow-y: auto;"
      >
        <div class="modal-header flex justify-between items-center border-b pb-4 mb-4">
          <h5 class="text-xl font-bold">Edit OneWire pin</h5>
          <button
            class="close-button text-gray-500 hover:text-gray-700"
            onclick=${_}
            disabled=${te}
          >
            Close
          </button>
        </div>
        <form onsubmit=${async ue=>{ue.preventDefault(),Zt(!0);const ge={id:$.id,pin:$.pin,typsensor:k.typsensor,numdevices:k.numdevices,onoff:oe};console.log("Sending data:",ge);try{if(!(await fetch("api/onewire/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ge)})).ok)throw new Error("Network response was not ok");const $e={...$,...k,onoff:oe};st($e),_()}catch(fe){console.error("Error updating OneWire:",fe)}finally{Zt(!1)}}}>
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
                      value=${k.typsensor}
                      onchange=${le}
                      class="border rounded p-2 w-full"
                      disabled=${te}
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
                      value=${k.numdevices}
                      oninput=${k.typsensor===1?le:void 0}
                      class="border rounded p-2 w-full ${k.typsensor!==1?"bg-gray-100":""}"
                      min="0"
                      max="10"
                      readonly=${k.typsensor!==1}
                      disabled=${te}
                    />
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="p-2 font-bold">On/Off</td>
                  <td class="p-2">
                    <${MyPolzunok}
                      value=${oe}
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
              disabled=${te}
            >
              ${te?"Saving...":"Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,he=at(null);return lt(()=>{const ue=document.createElement("div");return ue.id="modal-portal-onewire",document.body.appendChild(ue),he.current=ue,()=>{O(null,ue),document.body.removeChild(ue)}},[]),lt(()=>{he.current&&O(ie,he.current)}),null}function initGlobalTooltip$2(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,te=window.innerWidth,Zt=dt.getBoundingClientRect();let oe=Zt.left+Zt.width/2-k/2;oe=Math.max(8,Math.min(oe,te-k-8));let ne=Zt.top-pt-8;ne<8&&(ne=Zt.bottom+8),$.style.left=oe+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const _stateLabel=$=>$==="1"?"ON":$==="0"?"OFF":$==="2"?"TG":$??"?",_stateColor=$=>$==="1"?"#16a34a":$==="0"?"#dc2626":$==="2"?"#d97706":"#64748b",_parseAction=$=>$?$.split(",").map(_=>{const[st,ct]=_.trim().split(":");return{pin:st==null?void 0:st.trim(),state:ct==null?void 0:ct.trim()}}).filter(_=>_.pin!==void 0&&_.pin!==""):[],ActionBadge=({isUpper:$,isHumid:_,value:st,unit:ct,str:dt})=>{const k=_parseAction(dt),pt=(_?"💧 ":"")+($?"↑":"↓");return Et`
    <span style="display:inline-flex;align-items:center;gap:4px;background:${$?"#fff7ed":"#eff6ff"};border:1.5px solid ${$?"#fdba74":"#93c5fd"};border-radius:10px;padding:3px 10px;font-size:12px;font-weight:600;white-space:nowrap;line-height:1.6;">
      <span style="color:${$?"#9a3412":"#1e3a5f"};margin-right:2px;">${pt} ${st??"—"}${ct}:</span>
      ${k.length===0?Et`<span style="color:#94a3b8;">[—]</span>`:Et`
          <span style="color:#475569;">[</span>
          ${k.map(({pin:ne,state:ee},le)=>Et`
            <span>
              <span style="color:#94a3b8;font-weight:400;">id</span><span style="color:#334155;font-weight:700;">${ne}</span><span style="color:#475569;">:</span><span style="color:${_stateColor(ee)};font-weight:700;">${_stateLabel(ee)}</span>${le<k.length-1?Et`<span style="color:#94a3b8;">,${" "}</span>`:""}
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
  `},TabOneWire=()=>{const[$,_]=ut([]),[st,ct]=ut(null),[dt,k]=ut(!1),[pt,te]=ut(null),[Zt,oe]=ut(null),[ne,ee]=ut("ru"),[le,ae]=ut(!1),[pe,ie]=ut({}),he={ru:{colId:"ID",colPin:"Пин",colSensor:"Выбранный сенсор",colCount:"Кол-во сенсоров",colOnOff:"Вкл/Выкл",colActions:"Действия",noSensors:"Нет сенсоров для этого OneWire пина.",noData:"Нет данных сенсора для этого OneWire пина.",noPins:"Нет настроенных OneWire пинов!",errFetch:vt=>`Ошибка получения данных: ${vt}`,edit:"Ред.",showHelp:"Показать справку",hideHelp:"Скрыть справку",title:"OneWire(s) pin(s)"},en:{colId:"ID",colPin:"Pin",colSensor:"Selected sensor",colCount:"Count of sensors",colOnOff:"On/Off",colActions:"Actions",noSensors:"No connected sensors for this OneWire pin.",noData:"No sensor data available for this OneWire pin.",noPins:"No available pins configured as OneWire!",errFetch:vt=>`Error fetching sensor data: ${vt}`,edit:"Edit",showHelp:"Show Help",hideHelp:"Hide Help",title:"OneWire(s) pin(s)"}},ue=he[ne]||he.en,ge=vt=>ie(mt=>({...mt,[vt]:!mt[vt]})),fe=vt=>typeof vt=="string"?vt.replace(/[^\x20-\x7E\u0400-\u04FF]/g,""):vt;lt(()=>{initGlobalTooltip$2()},[]);const $e=vt=>{vt&&_(mt=>mt.map(Xt=>{const $t=Xt.typsensor||Xt.typsensr;if(!Xt.sensors||![1,2].includes($t))return Xt;const Yt=Xt.sensors.map(re=>{var ye,Ce;if($t===1){const Me=(ye=vt.ds18b20)==null?void 0:ye.find(De=>De.addr===re.s_number);return Me?{...re,t:Me.temp}:re}else if($t===2){const Me=(Ce=vt.dht22)==null?void 0:Ce.find(De=>De.id===Xt.id);return Me?{...re,t:Me.temp,humidity:Me.humidity}:re}return re});return{...Xt,sensors:Yt}}))},Te=()=>{registerPoll("onewire_init","/api/onewire/get",function(vt){ee(vt.lang||"ru"),_(vt.pins||[]),ct(null),registerPoll("sensors","/api/state/sensors",function(mt){mt!=null&&$e(mt)},{immediate:!0})},{immediate:!0,oneShot:!0})};lt(()=>(Te(),function(){unregisterPoll("onewire_init"),unregisterPoll("sensors")}),[]);const _e=()=>{k(!1),te(null),oe(null)},Ie=vt=>{_(mt=>mt.map(Xt=>{var $t;return Xt.id===vt.oneWireId?{...Xt,sensors:($t=Xt.sensors)==null?void 0:$t.map(Yt=>Yt.s_number===vt.s_number?{...Yt,...vt}:Yt)}:Xt})),_e()},Pe=vt=>{oe(vt),k(!0)},xe=vt=>{const mt=ne==="ru"?rulange1Wire:enlange1Wire,$t=(mt&&mt[vt]?mt[vt]:"").split(" "),Yt=[];for(let re=0;re<$t.length;re+=15)Yt.push($t.slice(re,re+15).join(" "));return Yt.join("<br>")},ke=({title:vt,tooltipIndex:mt})=>Et`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help" data-tip=${xe(mt)}>
      ${vt}
    </th>
  `,Oe=({device:vt,index:mt})=>{const Xt=!!pe[vt.id],$t=vt.typsensor||vt.typsensr||0,Yt=vt.numdevices||vt.numsens||0,re=$t!==0&&Yt>0;return Et`
      <tbody key=${"db-"+vt.id}>
        <tr class="${mt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors ${re?"cursor-pointer":""}" onclick=${()=>re&&ge(vt.id)}>
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${vt.id}</td>
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${vt.pins||vt.pin}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${["None","DS18B20","DHT22"][$t]}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${Yt}</td>
          <td class="px-6 py-4" onclick=${ye=>ye.stopPropagation()}>
            <${MyPolzunok} value=${vt.onoff||0} onChange=${ye=>ve({...vt,onoff:ye})} />
          </td>
          <td class="px-6 py-4" onclick=${ye=>ye.stopPropagation()}>
            <button class="text-blue-600 hover:text-blue-800 font-semibold transition-colors" onclick=${()=>Pe(vt)}>${ue.edit}</button>
            ${re&&Et`<span class="ml-3 text-slate-400 text-xs">${Xt?"▲":"▼"}</span>`}
          </td>
        </tr>
        ${Xt&&re?Et`
          <tr>
            <td colspan="6" class="px-4 py-3 bg-gradient-to-r from-cyan-50/80 via-slate-50/60 to-blue-50/80 border-t">
              <${de} d=${vt} />
            </td>
          </tr>
        `:""}
      </tbody>
    `},de=({d:vt})=>{const mt=vt.typsensor||vt.typsensr||0,Xt=vt.numdevices||vt.numsens||0;if(mt===0||Xt===0)return Et`<div class="px-4 py-2 text-slate-500 font-medium">${ue.noSensors}</div>`;let $t=vt.sensors||[];const Yt=["bg-cyan-50/60 border-cyan-200/50","bg-slate-100/70 border-slate-200/50"];return $t.length>0&&Object.keys($t).length>0?Et`<div class="flex flex-col gap-2 w-full">${$t.map((re,ye)=>Et`
          <div class="w-full flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 rounded-xl border ${Yt[ye%2]} backdrop-blur-sm shadow-sm">
            ${mt===2?Et`<span class="font-mono text-base font-semibold text-teal-700">DHT22</span>`:Et`
              <span class="flex items-center gap-2">
                <span class="font-mono text-base font-semibold text-slate-500">SN</span>
                <span class="font-mono text-base text-slate-700 select-all">${fe(re.s_number)}</span>
                <button class="px-4 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${Ce=>{Ce.stopPropagation(),navigator.clipboard.writeText(fe(re.s_number)),Ce.target.textContent="Copied!",setTimeout(()=>Ce.target.textContent="copy SN",1500)}}>copy SN</button>
              </span>
            `}
            <span class="text-slate-300">|</span>
            <span class="font-bold text-cyan-700">${re.t??"—"}°C 🌡</span>
            ${mt===2&&"humidity"in re?Et`<span class="font-bold text-teal-600">${re.humidity}% 💧</span>`:""}
            <span class="text-slate-300">|</span>
            <${ActionBadge} isUpper=${!0} value=${re.ut} unit="°C" str=${re.action_ut} />
            <${ActionBadge} isUpper=${!1} value=${re.lt} unit="°C" str=${re.action_lt} />
            <a href="#" class="ml-auto text-blue-600 font-semibold text-sm uppercase px-3 py-1 bg-white/70 rounded-lg" onclick=${Ce=>{Ce.preventDefault(),te({...re,oneWireId:vt.id,sensorType:mt,pins:vt.pins||vt.pin}),k(!0)}}>${ue.edit}</a>
          </div>
        `)}</div>`:Et`<div class="px-4 py-4 text-slate-500 font-medium bg-white/50 rounded-xl text-center w-full">${ue.noData}</div>`},ce=vt=>{_(mt=>mt.map(Xt=>Xt.id===vt.id?vt:Xt)),_e()},ve=vt=>{_(mt=>mt.map(Xt=>Xt.id===vt.id?{...Xt,onoff:vt.onoff}:Xt))};return Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col items-center">
      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 uppercase">${ue.title}</div>
        <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
          <table class="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr class="bg-teal-600/10 border-b border-teal-600/20">
                <${ke} title=${ue.colId} tooltipIndex=${1} />
                <${ke} title=${ue.colPin} tooltipIndex=${2} />
                <${ke} title=${ue.colSensor} tooltipIndex=${3} />
                <${ke} title=${ue.colCount} tooltipIndex=${4} />
                <${ke} title=${ue.colOnOff} tooltipIndex=${5} />
                <${ke} title=${ue.colActions} tooltipIndex=${6} />
              </tr>
            </thead>
            ${$.length>0?$.map((vt,mt)=>Et`<${Oe} device=${vt} index=${mt} key=${vt.id} />`):Et`<tbody><tr><td colspan="6" class="px-4 py-2">${st?ue.errFetch(st):ue.noPins}</td></tr></tbody>`}
          </table>
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-2xl">
          <button class="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${()=>ae(!le)}>
            ${le?ue.hideHelp:ue.showHelp}
          </button>
        </div>
        ${le&&Et`<div class="mt-2 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner w-full">${HELP_CONTENT[ne]||HELP_CONTENT.en}</div>`}
      </div>
    </div>
    ${dt&&(pt?Et`<${ModalEditSensor} typsensor=${pt} oneWireId=${pt.oneWireId} pins=${pt.pins} onClose=${_e} onUpdate=${Ie} sensorType=${pt.sensorType} closeOnOverlayClick=${!0} refresh=${Te} />`:Et`<${ModalOneWire} oneWire=${Zt} onClose=${_e} onUpdate=${ce} closeOnOverlayClick=${!0} refresh=${Te} />`)}
  `};function ModalSIM800L({hideModal:$,title:_,selectedGps:st,onSave:ct}){const[dt,k]=ut((st==null?void 0:st.tel)||""),[pt,te]=ut((st==null?void 0:st.info)||""),[Zt,oe]=ut((st==null?void 0:st.onoff)===1),[ne,ee]=ut(!0),le=ue=>/^\+\d{11,20}$/.test(ue),ie=Et`
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
            <h2 class="text-xl font-bold">${_}</h2>
            <button
              onClick=${$}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>

          <form onSubmit=${ue=>{if(ue.preventDefault(),!ne)return;const ge={type:"sim800l",tel:dt,info:pt,onoff:Zt?1:0};console.log("Сохраняемые данные:",ge),fetch("/api/security/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ge)}).then(fe=>fe.json()).then(fe=>{typeof ct=="function"&&ct(ge),$()}).catch(fe=>{console.error("Error:",fe)})}}>
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
                        onInput=${ue=>{const ge=ue.target.value;k(ge),ee(le(ge))}}
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
                        value=${pt}
                        onInput=${ue=>te(ue.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${MyPolzunok} value=${Zt} onChange=${oe} />
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
  `,he=at(null);return lt(()=>{const ue=document.createElement("div");return ue.id="modal-portal",document.body.appendChild(ue),he.current=ue,()=>{O(null,ue),document.body.removeChild(ue)}},[]),lt(()=>{he.current&&O(ie,he.current)}),null}const ModalSecurity=({modalType:$,page:_,hideModal:st,title:ct,selectedSecurity:dt,onSecurityChange:k,SliderComponent:pt=MyPolzunok})=>{const[te,Zt]=ut((dt==null?void 0:dt.info)||""),[oe,ne]=ut((dt==null?void 0:dt.onoff)||0),[ee,le]=ut((dt==null?void 0:dt.ptype)||0),[ae,pe]=ut((dt==null?void 0:dt.send_sms)||""),[ie,he]=ut((dt==null?void 0:dt.action)||""),[ue,ge]=ut([]),[fe,$e]=ut({send_sms:null,action:null}),[Te,_e]=ut(null),Ie=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,Pe=(mt,Xt)=>!Xt||Xt.trim()===""||Xt.toLowerCase()==="none"?null:mt==="action"?Ie.test(Xt)?null:'Incorrect format. Use "None" or "pin:value" format.':Xt.length>100?"Text should not exceed 100 characters":null,xe=(mt,Xt)=>{const $t=Pe(mt,Xt);switch($e(Yt=>({...Yt,[mt]:$t})),mt){case"send_sms":pe(Xt);break;case"action":he(Xt);break}};lt(()=>{fetch("/api/security/get").then(mt=>mt.json()).then(mt=>{const Xt=mt.pins||mt;Array.isArray(Xt)?ge(Xt.filter($t=>$t.topin===2||$t.topin===11)):ge([])}).catch(mt=>{console.error("Error fetching pin config:",mt),ge([])})},[]);const ke=mt=>{if(mt.preventDefault(),Object.values(fe).some($t=>$t!==null)){_e("Please correct the errors before submitting.");return}const Xt={type:"monitoring",...dt,info:te,send_sms:ae||"NO",action:ie||"None",onoff:oe,ptype:ee};fetch("/api/security/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Xt)}).then($t=>{if(!$t.ok)throw new Error("Network response was not ok");return $t.json()}).then($t=>{if($t.error)throw new Error($t.error);k(Xt),st()}).catch($t=>{console.error("Error:",$t),_e("Failed to save changes. Please try again.")})},Oe=()=>{le(0),pe(""),he(""),Zt(""),ne(0),$e({send_sms:null,action:null})},ve=Et`
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
          ${_==="TabSecurity"&&$==="connection"?Et`
    <form onSubmit=${ke}>
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
                  value=${ue.some(mt=>mt.pins===(dt==null?void 0:dt.setrpins))?dt==null?void 0:dt.setrpins:""}
                  onChange=${mt=>k({...dt,setrpins:mt.target.value})}
                  class="border rounded p-2 w-full"
                >
                  <option value="">Select a connection</option>
                  ${ue.map(mt=>Et`
                      <option value=${mt.pins}>
                        ${mt.pins} (ID: ${mt.id})
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
    <form onSubmit=${ke}>
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
                  value=${ee}
                  onChange=${mt=>le(parseInt(mt.target.value))}
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
                  value=${ie}
                  onInput=${mt=>xe("action",mt.target.value)}
                  class="border rounded p-2 w-full ${fe.action?"border-red-500":""}"
                  placeholder="None"
                />
                ${fe.action&&Et`<p class="text-red-500 text-sm">${fe.action}</p>`}
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Send SMS</td>
              <td class="p-2">
                <select
                  name="send_sms"
                  value=${ae}
                  onchange=${mt=>xe("send_sms",mt.target.value)}
                  class="border rounded p-2 w-full ${fe.send_sms?"border-red-500":""}"
                >
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                </select>
                ${fe.send_sms&&Et` <p class="text-red-500 text-sm">${fe.send_sms}</p> `}
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">INFO</td>
              <td class="p-2">
                <input
                  type="text"
                  name="info"
                  value=${te}
                  onInput=${mt=>Zt(mt.target.value)}
                  class="border rounded p-2 w-full"
                />
              </td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">On/Off</td>
              <td class="p-2">
                <${pt} value=${oe} onChange=${ne} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-between mt-4">
        <button
          type="button"
          onClick=${Oe}
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
  `,vt=at(null);return lt(()=>{const mt=document.createElement("div");return mt.id="modal-portal",document.body.appendChild(mt),vt.current=mt,()=>{O(null,mt),document.body.removeChild(mt)}},[]),lt(()=>{vt.current&&O(ve,vt.current)}),null};function initGlobalTooltip$1(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,te=window.innerWidth,Zt=dt.getBoundingClientRect();let oe=Zt.left+Zt.width/2-k/2;oe=Math.max(8,Math.min(oe,te-k-8));let ne=Zt.top-pt-8;ne<8&&(ne=Zt.bottom+8),$.style.left=oe+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabSecurity=()=>{const[$,_]=ut({lang:"ru",sim800l:0,onoff:0,tel:"",info:""}),[st,ct]=ut(!1),[dt,k]=ut(!1),[pt,te]=ut([]),[Zt,oe]=ut(!1),[ne,ee]=ut("ru"),[le,ae]=ut(!1),[pe,ie]=ut(""),[he,ue]=ut(null),[ge,fe]=ut(!1),[$e,Te]=ut("connected"),[_e,Ie]=ut(0),Pe={ru:{titleSim:"SIM800L Settings",titlePins:"Security Pins",colRx:"RXD Pin",colTx:"TXD Pin",colPhone:"Phone Number",colInfo:"Info",colOnOff:"OnOff",colAction:"Action",colId:"ID",colPin:"Pin",colType:"Type of sensor",colSendSms:"Send SMS",colEditPin:"Edit Pin",notConfigured:"Не настроено",notSet:"Не задан",noInfo:"Нет инфо",noData:"Нет доступных данных мониторинга",edit:"Ред.",showHelp:"Показать справку",hideHelp:"Скрыть справку",connRetry:"Connection problems. Retrying...",connLost:"Connection lost. Check your internet connection."},en:{titleSim:"SIM800L Settings",titlePins:"Security Pins",colRx:"RXD Pin",colTx:"TXD Pin",colPhone:"Phone Number",colInfo:"Info",colOnOff:"OnOff",colAction:"Action",colId:"ID",colPin:"Pin",colType:"Type of sensor",colSendSms:"Send SMS",colEditPin:"Edit Pin",notConfigured:"Not configured",notSet:"Not set",noInfo:"No info",noData:"No monitoring data available",edit:"Edit",showHelp:"Show Help",hideHelp:"Hide Help",connRetry:"Connection problems. Retrying...",connLost:"Connection lost. Check your internet connection."}},xe=Pe[ne]||Pe.en,ke={ru:Et`
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
      </div>`},Oe={ru:Et`
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
      </div>`};lt(()=>{initGlobalTooltip$1()},[]);const de=mt=>{if(!(ge||Date.now()-_e<2e3)){if(!mt){Te("error");return}_({lang:mt.lang,sim800l:mt.sim800l,onoff:mt.onoff,tel:mt.tel,info:mt.info}),te(mt.pins||[]),Te("connected")}};lt(()=>{let mt=!0;return registerPoll("security","/api/state/security",function(Xt){mt&&Xt!=null&&(ee(Xt.lang||"ru"),de(Xt))},{immediate:!0}),function(){mt=!1,unregisterPoll("security")}},[]);const ce=async mt=>{fe(!0);try{await fetch("/api/security/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"sim800l",...mt})}),_(mt),Ie(Date.now())}finally{fe(!1)}},ve=(mt,Xt)=>{const $t=mt&&mt[Xt]?mt[Xt]:"",Yt=[],re=$t.split(" ");for(let ye=0;ye<re.length;ye+=15)Yt.push(re.slice(ye,ye+15).join(" "));return Yt.join("<br>")},vt=({title:mt,langArr:Xt,tooltipIndex:$t})=>Et`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help" data-tip=${ve(Xt,$t)}>${mt}</th>
  `;return Et`
    <div class="flex flex-col items-center w-full p-4">
      ${$e!=="connected"&&Et`
        <div class="w-full p-2 mb-4 text-white text-center rounded-xl shadow-md backdrop-blur-md ${$e==="error"?"bg-yellow-500/80":"bg-red-500/80"}">
          ${$e==="error"?xe.connRetry:xe.connLost}
        </div>
      `}
      <div class="flex flex-col items-center w-full p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 relative overflow-hidden">
        <div class="w-full mb-10">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">${xe.titleSim}</h2>
          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-teal-600/10 border-b border-teal-600/20">
                  <${vt} title=${xe.colRx} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${1} />
                  <${vt} title=${xe.colTx} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${2} />
                  <${vt} title=${xe.colPhone} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${3} />
                  <${vt} title=${xe.colInfo} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${4} />
                  <${vt} title=${xe.colOnOff} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${5} />
                  <${vt} title=${xe.colAction} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${6} />
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                <tr class="bg-white/80 hover:bg-slate-200/80 transition-colors">
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.sim800l===1?"PA3(1)":xe.notConfigured}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.sim800l===1?"PD5(35)":xe.notConfigured}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.tel||xe.notSet}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.info||xe.noInfo}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium"><${MyPolzunok} value=${$.onoff} onChange=${mt=>ce({...$,onoff:mt})} /></td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium"><button onClick=${()=>ct(!0)} class="text-teal-600 hover:text-cyan-600 font-bold transition-colors">${xe.edit}</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-end mt-6 w-full"><button onclick=${()=>k(!dt)} class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40">${dt?xe.hideHelp:xe.showHelp}</button></div>
          ${dt&&Et`<div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">${ke[ne]}</div>`}
        </div>

        <div class="w-full">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">${xe.titlePins}</h2>
          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-teal-600/10 border-b border-teal-600/20">
                  <${vt} title=${xe.colId} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${1} />
                  <${vt} title=${xe.colPin} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${2} />
                  <${vt} title=${xe.colType} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${3} />
                  <${vt} title=${xe.colAction} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${4} />
                  <${vt} title=${xe.colSendSms} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${5} />
                  <${vt} title=${xe.colInfo} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${6} />
                  <${vt} title=${xe.colOnOff} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${7} />
                  <${vt} title=${xe.colEditPin} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${8} />
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                ${pt.length>0?pt.map((mt,Xt)=>Et`
                  <tr class="${Xt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${mt.id}</td><td class="px-6 py-4 text-sm text-slate-800 font-medium">${mt.pins}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${["PIR","Normal open","Normal close"][mt.ptype]}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${mt.action}</td><td class="px-6 py-4 text-sm text-slate-800 font-medium">${mt.send_sms}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${mt.info}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium"><${MyPolzunok} value=${mt.onoff} onChange=${$t=>{Ie(Date.now()),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:mt.id,onoff:$t})}),te(Yt=>Yt.map(re=>re.id===mt.id?{...re,onoff:$t}:re))}} /></td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium"><button onClick=${()=>{ue(mt),ie("edit"),ae(!0)}} class="text-teal-600 hover:text-cyan-600 font-bold transition-colors">${xe.edit}</button></td>
                  </tr>`):Et`<tr><td colspan="8" class="px-6 py-4 text-center text-sm text-slate-600 font-medium">${xe.noData}</td></tr>`}
              </tbody>
            </table>
          </div>
          <div class="flex justify-end mt-6 w-full"><button onclick=${()=>oe(!Zt)} class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40">${Zt?xe.hideHelp:xe.showHelp}</button></div>
          ${Zt&&Et`<div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">${Oe[ne]}</div>`}
        </div>
      </div>
      ${st&&Et`<${ModalSIM800L} hideModal=${()=>ct(!1)} title=${xe.edit} selectedGps=${$} onSave=${ce} />`}
      ${le&&Et`<${ModalSecurity} modalType=${pe} page="TabSecurity" hideModal=${()=>ae(!1)} title=${xe.edit} selectedSecurity=${he} onSecurityChange=${mt=>{te(Xt=>Xt.map($t=>$t.id===mt.id?mt:$t)),ae(!1)}} />`}
    </div>
  `};function initGlobalTooltip(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"320px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,te=window.innerWidth,Zt=dt.getBoundingClientRect();let oe=Zt.left+Zt.width/2-k/2;oe=Math.max(8,Math.min(oe,te-k-8));let ne=Zt.top-pt-8;ne<8&&(ne=Zt.bottom+8),$.style.left=oe+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const SETTINGS_TIP_IDX={Login:1,Password:2,"Time zone UTC":3,"IP address":4,"Subnet mask":5,"Default gateway":6,Token:7,Host:8,Port:9,Client:10,User:11,"Password (MQTT)":12,"TX topic":13,"RX topic":14,"RX Z2M topic":26,"HTTPS domain":15,"Private Key":16,"Public Key":17,Longitude:18,Latitude:19,Sunrise:20,Sunset:21,"Day Length":22,"Next full moon":23,Date:24,Time:25},getTip=($,_,st,ct)=>{const dt=_==="ru"?st:ct,k=SETTINGS_TIP_IDX[$];if(!k||!dt||!dt[k])return"";const pt=dt[k].split(" "),te=[];for(let Zt=0;Zt<pt.length;Zt+=12)te.push(pt.slice(Zt,Zt+12).join(" "));return te.join("<br>")},FieldRow=({label:$,tipLabel:_,index:st,tip:ct,children:dt})=>{const k=st%2===0?"bg-white/80":"bg-sky-200/40";return Et`
    <tr class="transition-colors border-b border-slate-200 ${k} hover:bg-slate-200/80">
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
  `},LOG_CATEGORIES=[{id:0,key:"SYSTEM",labelEn:"System",labelRu:"Система"},{id:1,key:"MQTT",labelEn:"MQTT",labelRu:"MQTT"},{id:2,key:"NET",labelEn:"Network",labelRu:"Сеть"},{id:3,key:"GSM",labelEn:"GSM",labelRu:"GSM"},{id:4,key:"SCHEDULER",labelEn:"Scheduler",labelRu:"Планировщик"},{id:5,key:"SENSORS",labelEn:"Sensors",labelRu:"Датчики"},{id:6,key:"PID",labelEn:"PID Controller",labelRu:"ПИД-регулятор"},{id:7,key:"SETTINGS",labelEn:"Settings",labelRu:"Настройки"},{id:8,key:"ETH",labelEn:"Ethernet",labelRu:"Ethernet"},{id:9,key:"PHY",labelEn:"PHY",labelRu:"PHY"},{id:10,key:"Z2M",labelEn:"Z2M",labelRu:"Z2M"}];function Settings({}){const[$,_]=ut({}),[st,ct]=ut(null),[dt,k]=ut(null),[pt,te]=ut({}),Zt=at(null),[oe,ne]=ut(null),[ee,le]=ut(null),[ae,pe]=ut(!1),[ie,he]=ut(!1),[ue,ge]=ut(!1),[fe,$e]=ut(!1),[Te,_e]=ut(!1),[Ie,Pe]=ut(!0),xe=at(0),[ke,Oe]=ut(!1);lt(()=>{if(initGlobalTooltip(),!document.getElementById("__network_toggle_style")){const se=document.createElement("style");se.id="__network_toggle_style",se.textContent=".network-toggle span { display: none !important; }",document.head.appendChild(se)}},[]);const de=se=>getTip(se,$.lang||"ru",rulangsettings,enlangsettings),ce=[{value:"en",label:"English"},{value:"ru",label:"Russian"}],ve=[[-12,"(GMT -12:00) Eniwetok, Kwajalein"],[-11,"(GMT -11:00) Midway Island, Samoa"],[-10,"(GMT -10:00) Hawaii"],[-9,"(GMT -9:00) Alaska"],[-8,"(GMT -8:00) Pacific Time (US & Canada)"],[-7,"(GMT -7:00) Mountain Time (US & Canada)"],[-6,"(GMT -6:00) Central Time (US & Canada), Mexico City"],[-5,"(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima"],[-4,"(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz"],[-3.3,"(GMT -3:30) Newfoundland"],[-3,"(GMT -3:00) Brazil, Buenos Aires, Georgetown"],[-2,"(GMT -2:00) Mid-Atlantic"],[-1,"(GMT -1:00) Azores, Cape Verde Islands"],[0,"(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca"],[1,"(GMT +1:00) Brussels, Copenhagen, Madrid, Paris"],[2,"(GMT +2:00) Kaliningrad, South Africa"],[3,"(GMT +3:00) Moscow, St. Petersburg, Baghdad, Riyadh"],[3.3,"(GMT +3:30) Tehran"],[4,"(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi"],[4.3,"(GMT +4:30) Kabul"],[5,"(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"],[5.3,"(GMT +5:30) Bombay, Calcutta, Madras, New Delhi"],[5.45,"(GMT +5:45) Kathmandu"],[6,"(GMT +6:00) Almaty, Dhaka, Colombo"],[7,"(GMT +7:00) Bangkok, Hanoi, Jakarta"],[8,"(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"],[9,"(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"],[9.3,"(GMT +9:30) Adelaide, Darwin"],[10,"(GMT +10:00) Eastern Australia, Guam, Vladivostok"],[11,"(GMT +11:00) Magadan, Solomon Islands, New Caledonia"],[12,"(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"]],vt=/^(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)$/,mt=se=>{if(!se)return{date:"",time:""};const me=se.match(/d:(\d{1,2}\.\d{1,2}\.\d{2})/),be=se.match(/t:(\d{2}:\d{2}:\d{2})/);return{date:me?me[1]:"",time:be?be[1]:""}},Xt=se=>{if(!/^\d{1,2}\.\d{1,2}\.\d{2}$/.test(se))return!1;const[be,Ee,Le]=se.split(".").map(Number);if(Ee<1||Ee>12||be<1||be>31||Le<0||Le>99)return!1;const Ae=new Date().getFullYear()%100;if(Le>Ae+5)return!1;const ze=new Date(2e3+Le,Ee,0).getDate();return!(be>ze)},$t=se=>/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(se),Yt=(se,me)=>{const be=Object.values(me).some(Le=>Le!==null),Ee=se.usehttps?se.domain&&se.domain.trim()!=="":!0;return!(be||!Ee)},re=(se,me)=>{ne({message:se,type:me}),setTimeout(()=>{ne(null)},3e3)},ye=se=>{le(se),setTimeout(()=>{le(null)},3e3)},Ce=(se,me)=>{let be=null;if(!$.usehttps&&["domain","tls_key","tls_cert","tls_ca","telegram_token"].includes(se))return null;if(!me&&["ip_addr","gateway","mqtt_hst","sb_mask","offdate","offtime","domain"].includes(se))return"Поле не может быть пустым";switch(se){case"ip_addr":case"gateway":case"mqtt_hst":me.length>50&&(be="Слишком длинное имя хоста");break;case"sb_mask":vt.test(me)||(be="Неверная маска подсети");break;case"offdate":Xt(me)||(be="Неверный формат даты (д.м.гг)");break;case"offtime":$t(me)||(be="Неверный формат времени (чч:мм:сс)");break;case"domain":me.length>50?be="Домен не должен превышать 50 символов":me.match(/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/)||(be="Неверный формат домена");break;case"tls_key":me&&me.trim()!==""&&(me.length>512?be="Private Key не должен превышать 512 символов":(!me.includes("BEGIN EC PRIVATE KEY")||!me.includes("END EC PRIVATE KEY"))&&(be="Неверный формат Private Key"));break;case"tls_cert":me&&me.trim()!==""&&(me.length>1024?be="Public Key не должен превышать 1024 символов":(!me.includes("BEGIN CERTIFICATE")||!me.includes("END CERTIFICATE"))&&(be="Неверный формат Public Key"));break;case"tls_ca":me&&me.trim()!==""&&(me.length>1024?be="Secret Key не должен превышать 1024 символов":(!me.includes("BEGIN CERTIFICATE")||!me.includes("END CERTIFICATE"))&&(be="Неверный формат Secret Key"));break}return be},Me=se=>{const me=($.lang||"ru")==="ru";_(be=>({...be,log_filter_mask:se})),fetch("/api/logfilter",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({mask:se})}).then(be=>{if(!be.ok)throw new Error("Network error");return be.json()}).then(be=>{be.status&&re(me?"Фильтр логов обновлен в RAM":"Log filter updated in RAM","success")}).catch(be=>{console.error("Error applying log filter in RAM:",be),re(me?"Ошибка обновления RAM фильтра":"Error updating RAM log filter","error")})},De=se=>{se.preventDefault();const me=new FormData(Zt.current);let be={...$};for(const[Ee,Le]of me.entries())["lon_de","lat_de","timezone","mqtt_prt"].includes(Ee)?be[Ee]=Le===""||Le===null?0:Number(Le):be[Ee]=Le;be.usehttps||["tls_ca","tls_key","tls_cert","telegram_token","domain"].forEach(Ee=>delete be[Ee]),be.offdate&&be.offtime?be.offldt=`d:${be.offdate} t:${be.offtime}`:delete be.offldt,["lon_de","lat_de","timezone","mqtt_prt"].forEach(Ee=>{(be[Ee]===null||be[Ee]==="")&&(be[Ee]=0)}),be.onsunrise=be.onsunrise?1:0,be.onsunset=be.onsunset?1:0,be.check_ip=be.check_ip?1:0,be.check_mqtt=be.check_mqtt?1:0,be.usehttps=be.usehttps?1:0,fetch("/api/mysett/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(be)}).then(Ee=>{if(!Ee.ok)throw new Error("Ошибка сети");return Ee.json()}).then(Ee=>{k("success"),ct(Ee),re("Данные успешно сохранены","success"),ye("Данные успешно сохранены"),xe.current=0}).catch(Ee=>{k("error"),ct(Ee),re("Ошибка при сохранении данных","error"),ye("Ошибка при сохранении данных")})},Se=(se,me)=>{let be=null;se==="offdate"?be=Xt(me)?null:"Неверный формат даты (д.м.гг)":se==="offtime"?be=$t(me)?null:"Неверный формат времени (чч:мм:сс)":be=Ce(se,me),te(Le=>{const Ae={...Le,[se]:be},ze=["tls_key","tls_cert","tls_ca"],Re=Object.keys(Ae).filter(Ne=>!ze.includes(Ne)&&Ne!=="telegram_token").some(Ne=>Ae[Ne]!==null);return pe(Re||!$.usehttps&&ze.some(Ne=>$[Ne])),Ae});let Ee=me;["lon_de","lat_de","timezone","mqtt_prt"].includes(se)?Ee=me===""||me===null?0:Number(me):["onsunrise","onsunset","check_ip","check_mqtt","usehttps"].includes(se)&&(Ee=me?1:0),_(Le=>({...Le,[se]:Ee})),xe.current=Date.now(),se==="usehttps"&&(te({}),pe(!1))};if(lt(()=>{let se=!0;return registerPoll("settings","/api/mysett/get",function(me){if(se&&!(Date.now()-xe.current<8e3)){var be=document.activeElement;if(!(be&&(be.tagName==="INPUT"||be.tagName==="TEXTAREA"||be.tagName==="SELECT"))&&me!=null){if(me.offldt){var Ee=mt(me.offldt);me.offdate=Ee.date,me.offtime=Ee.time}_(me),Pe(!1),me.tls_key&&he(!0),me.tls_cert&&ge(!0),me.tls_ca&&$e(!0),me.telegram_token&&_e(!0)}}},{immediate:!0}),function(){se=!1,unregisterPoll("settings")}},[]),lt(()=>{pe(!Yt($,pt))},[$,pt]),Ie)return Et`<div>Loading...</div>`;if(!$)return"";const we=(se="")=>Et`
    <button
      type="submit"
      class=${`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 ${ae?"opacity-50 cursor-not-allowed bg-slate-400":"bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500"} ${se}`}
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
            onChange=${se=>Se("lang",se.target.value)}
            style="border: 2px solid #22d3ee; border-radius: 8px; padding: 4px 10px; font-size: 14px; font-weight: 600; background: white; color: #1e293b; cursor: pointer; outline: none;"
          >
            ${ce.map(se=>Et`<option value=${se.value}>${se.label}</option>`)}
          </select>
        </div>

        ${ee&&Et`
          <div class="w-full max-w-4xl bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center mb-6 border border-green-400/50 backdrop-blur-md">
            ${ee}
          </div>
        `}

        <form ref=${Zt} onSubmit=${De} class="w-full max-w-4xl flex flex-col gap-6 relative">

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
              ${[{label:"Login",key:"adm_name",type:"text"},{label:"Password",key:"adm_pswd",type:"password"},{label:"Time zone UTC",key:"timezone",type:"select",options:ve}].map((se,me)=>Et`
                <${FieldRow} label=${se.label} tip=${de(se.tipLabel||se.label)} index=${me}>
                  <${pageSetting}
                    value=${$[se.key]}
                    setfn=${be=>Se(se.key,be)}
                    type=${se.type}
                    options=${se.options}
                    class=${`w-full px-3 py-2 bg-white/50 border ${pt[se.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    error=${pt[se.key]}
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
                            <${MyPolzunok} value=${$.check_ip} onChange=${se=>Se("check_ip",se)} />
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
                            <${MyPolzunok} value=${$.check_ip} onChange=${se=>Se("check_ip",se)} />
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
                  ${[{label:"IP address",key:"ip_addr",type:"text"},{label:"Subnet mask",key:"sb_mask",type:"text"},{label:"Default gateway",key:"gateway",type:"text"}].map((se,me)=>Et`
                    <${FieldRow} label=${se.label} tip=${de(se.tipLabel||se.label)} index=${me}>
                      <${pageSetting}
                        value=${$[se.key]}
                        setfn=${be=>Se(se.key,be)}
                        type=${se.type}
                        class=${`w-full px-3 py-2 bg-white/50 border ${pt[se.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        error=${pt[se.key]}
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
              <${FieldRow} label="Token" tip=${de("Token")} index=${0}>
                <${pageSetting}
                  value=${$.token}
                  setfn=${se=>Se("token",se)}
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
                          <${MyPolzunok} value=${$.check_mqtt} onChange=${se=>Se("check_mqtt",se)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[{label:"Host",key:"mqtt_hst",type:"text",maxlength:50},{label:"Port",key:"mqtt_prt",type:"number"},{label:"Client",key:"mqtt_clt",type:"text",maxlength:32},{label:"User",key:"mqtt_usr",type:"text",maxlength:32},{label:"Password",key:"mqtt_pswd",type:"password",maxlength:32,tipLabel:"Password (MQTT)"},{label:"TX topic",key:"txmqttop",type:"text",maxlength:32},{label:"RX topic",key:"rxmqttop",type:"text",maxlength:32},{label:"Z2M topic",key:"rxzbtop",type:"text",maxlength:32,tipLabel:"RX Z2M topic",placeholder:"zigbee2mqtt"}].map((se,me)=>Et`
                  <${FieldRow} label=${se.label} tip=${de(se.tipLabel||se.label)} index=${me}>
                    <${pageSetting}
                      value=${$[se.key]}
                      setfn=${be=>Se(se.key,be)}
                      type=${se.type}
                      maxlength=${se.maxlength}
                      placeholder=${se.placeholder||""}
                      class=${`w-full px-3 py-2 bg-white/50 border ${pt[se.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      error=${pt[se.key]}
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
                          <${MyPolzunok} value=${$.check_mqtt} onChange=${se=>Se("check_mqtt",se)} />
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
                          <${MyPolzunok} value=${$.usehttps} onChange=${se=>Se("usehttps",se)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[{label:"HTTPS domain",key:"domain",type:"text"},{label:"Private Key",key:"tls_key",type:"textarea"},{label:"Public Key",key:"tls_cert",type:"textarea"}].map((se,me)=>Et`
                  <tr class="transition-colors border-b border-slate-200 ${me%2===0?"bg-sky-200/40":"bg-white/80"} hover:bg-slate-200/80">
                    <td
                      class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help align-top"
                      data-tip=${de(se.label)}
                    >
                      ${se.label}
                    </td>
                    <td class="w-2/3 pl-4 py-4 pr-6 align-top">
                      <div class="relative w-full">
                        ${se.type==="textarea"?Et`
                            ${se.key==="tls_key"&&$.tls_key?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены, но информация скрыта!</div>`:se.key==="tls_cert"&&$.tls_cert?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены успешно!</div>`:Et`<textarea
                                    name=${se.key}
                                    value=${$[se.key]||""}
                                    onInput=${be=>Se(se.key,be.target.value)}
                                    class=${`w-full px-3 py-2 bg-white/50 border ${pt[se.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                                    rows="1"
                                    placeholder="Enter ${se.label}"
                                  ></textarea>`}
                          `:Et`
                            <input
                              type="text"
                              name=${se.key}
                              value=${$[se.key]||""}
                              onInput=${be=>Se(se.key,be.target.value)}
                              class=${`w-full px-3 py-2 bg-white/50 border ${pt[se.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                              maxlength="30"
                              placeholder="Enter domain (e.g., zagotovka.ddns.net)"
                            />
                          `}
                        ${$[se.key]&&se.key==="tls_cert"&&Et`
                          <div class="absolute right-0 top-0 mt-[3px] mr-[3px] flex gap-2">
                            <button type="button"
                              onClick=${()=>{navigator.clipboard.writeText($[se.key]),ye("Данные скопированы")}}
                              class="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5"
                            >Копировать</button>
                            <button type="button"
                              onClick=${()=>Se(se.key,"")}
                              class="px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                            >Очистить</button>
                          </div>
                        `}
                        ${$[se.key]&&se.key!=="domain"&&se.key!=="tls_cert"&&Et`
                          <button type="button"
                            onClick=${()=>Se(se.key,"")}
                            class="absolute right-0 top-0 mt-[3px] mr-[3px] px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                          >Очистить</button>
                        `}
                      </div>
                      ${pt[se.key]&&Et`<div class="text-red-500 text-sm mt-1 font-semibold w-full text-left">${pt[se.key]}</div>`}
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
                          <${MyPolzunok} value=${$.usehttps} onChange=${se=>Se("usehttps",se)} />
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

              <${FieldRow} label="Longitude" tip=${de("Longitude")} index=${0}>
                <${pageSetting} value=${$.lon_de} setfn=${se=>Se("lon_de",se)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${pt.lon_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${pt.lon_de} />
              <//>

              <${FieldRow} label="Latitude" tip=${de("Latitude")} index=${1}>
                <${pageSetting} value=${$.lat_de} setfn=${se=>Se("lat_de",se)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${pt.lat_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${pt.lat_de} />
              <//>

              <!-- Sunrise — нестандартная строка, data-tip вручную -->
              <tr class="transition-colors border-b border-slate-200 bg-white/80 hover:bg-slate-200/80">
                <td
                  class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
                  data-tip=${de("Sunrise")}
                >
                  Sunrise: <span class="text-teal-600 drop-shadow-sm">${$.sunrise}</span>
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <div class="flex items-center gap-4">
                    <${MyPolzunok} value=${$.onsunrise} onChange=${se=>Se("onsunrise",se)} />
                    <input type="text" value=${$.sunrise_pins||""} onInput=${se=>Se("sunrise_pins",se.target.value)}
                      maxlength="20" placeholder="Action for sunrise"
                      class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  </div>
                </td>
              </tr>

              <!-- Sunset -->
              <tr class="transition-colors border-b border-slate-200 bg-sky-200/40 hover:bg-slate-200/80">
                <td
                  class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
                  data-tip=${de("Sunset")}
                >
                  Sunset: <span class="text-teal-600 drop-shadow-sm">${$.sunset}</span>
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <div class="flex items-center gap-4">
                    <${MyPolzunok} value=${$.onsunset} onChange=${se=>Se("onsunset",se)} />
                    <input type="text" value=${$.sunset_pins||""} onInput=${se=>Se("sunset_pins",se.target.value)}
                      maxlength="20" placeholder="Action for sunset"
                      class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  </div>
                </td>
              </tr>

              <${FieldRow} label="Day Length" tip=${de("Day Length")} index=${4}>
                <span class="text-xl font-medium text-slate-800">${$.dlength}</span>
              <//>

              <${FieldRow} label="Next full moon" tip=${de("Next full moon")} index=${5}>
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
                  data-tip=${de("Date")}
                >
                  Date
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <input type="text" name="offdate" value=${$.offdate||""} onInput=${se=>Se("offdate",se.target.value)}
                    placeholder="dd.mm.yy"
                    class=${`w-full px-3 py-2 bg-white/50 border ${pt.offdate?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${pt.offdate&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${pt.offdate}</div>`}
                </td>
              </tr>

              <!-- Time -->
              <tr class="transition-colors border-b border-slate-200 bg-sky-200/40 hover:bg-slate-200/80">
                <td
                  class="w-1/3 font-bold text-slate-700 text-lg border-r border-slate-500 py-4 px-6 cursor-help"
                  data-tip=${de("Time")}
                >
                  Time
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <input type="text" name="offtime" value=${$.offtime||""} onInput=${se=>Se("offtime",se.target.value)}
                    placeholder="hh:mm:ss"
                    class=${`w-full px-3 py-2 bg-white/50 border ${pt.offtime?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${pt.offtime&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${pt.offtime}</div>`}
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
                onClick=${()=>Oe(se=>!se)}
              >
                <span class="text-2xl font-bold text-slate-700 tracking-wide flex items-center gap-2">
                  <span class="text-teal-600 text-lg">${ke?"▾":"▸"}</span>
                  ${($.lang||"ru")==="ru"?"Фильтр логов":"Log Filter"}
                </span>
                <div class="flex items-center gap-3">
                  <span class="text-slate-600 font-medium tracking-wide text-lg">
                    ${($.lang||"ru")==="ru"?"Маска логов в RAM:":"RAM Log Mask:"}
                  </span>
                  <span class="px-2 py-0.5 bg-cyan-600/10 text-cyan-700 rounded-md font-mono font-bold text-lg">
                    ${$.log_filter_mask!==void 0?$.log_filter_mask:2047} (0x${($.log_filter_mask!==void 0?$.log_filter_mask:2047).toString(16).toUpperCase()})
                  </span>
                </div>
              </div>

              ${ke&&Et`
                <div class="flex items-stretch">

                  <div class="w-1/4 border-r border-slate-300 px-6 py-6 flex flex-col justify-center items-center gap-4"
                      data-tip=${($.lang||"ru")==="ru"?"Выберите категории логов, которые выводятся в UART и отсылаются. Изменения применяются немедленно в RAM!":"Select which log categories are enabled. Changes apply immediately in RAM!"}>
                    <span class="text-base font-bold text-slate-700 text-center">
                      ${($.lang||"ru")==="ru"?"Активные категории":"Active Categories"}
                    </span>
                    <button type="button" onClick=${()=>Me(2047)}
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
                      ${LOG_CATEGORIES.map(se=>{const me=$.log_filter_mask!==void 0?$.log_filter_mask:2047,be=(me&1<<se.id)!==0;return Et`
                          <label class=${`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all duration-300 ${be?"bg-cyan-50/70 border-cyan-300 shadow-[0_2px_10px_rgba(34,211,238,0.15)] scale-[1.02]":"bg-slate-50/40 border-slate-200 hover:bg-slate-100/50"}`}>
                            <input
                              type="checkbox"
                              checked=${be}
                              onChange=${Ee=>{const Le=Ee.target.checked?me|1<<se.id:me&~(1<<se.id);Me(Le)}}
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

          ${ee&&Et`
            <div class="w-full bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center border border-green-400/50 backdrop-blur-md">
              ${ee}
            </div>
          `}

          <div class="flex justify-end w-full mb-4">${we()}</div>

        </form>
      </div>
    </div>
    ${oe&&Et`<${Toast} message=${oe.message} type=${oe.type} />`}
  `}console.log("[Zagotovka] build:","2026-07-04T11:02");const Logo=$=>Et`<svg
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
  </svg>`;function Header({logout:$,user:_,setShowSidebar:st,showSidebar:ct,sessionExpired:dt}){const[k,pt]=ut(new Date),te=ht(StateContext),Zt=le=>new Date(le.year+1900,le.mon,le.mday,le.hour,le.min,le.sec);lt(()=>{const le=setInterval(()=>pt(new Date),1e3);return()=>clearInterval(le)},[]);const oe=te&&te.time&&te.time.status?Zt(te.time.time):null,ne=le=>le.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric"}),ee=le=>le.toLocaleTimeString("ru-RU");return Et`
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
            Дата: ${ne(k)}<span style="margin-left: 8px;"></span
            >Время: ${ee(k)}
          </span>
        </div>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm ${dt?"text-white":"text-slate-600"}"
            >STM32 дата:
            ${oe?ne(oe):" 00.00.0000"}<span
              style="margin-left: 8px;"
            ></span
            >Время: ${oe?ee(oe):"00:00"}
          </span>
        </div>
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <span class="text-sm ${dt?"text-red-100":"text-slate-400"}">logged in as: ${_}</span>
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
  `}function Sidebar({url:$,show:_}){const st=({title:ct,icon:dt,href:k,url:pt})=>Et`
  <div>
    <a href="#${k}" class="${k==pt?"bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-md group":"text-slate-600 hover:bg-slate-200/60 hover:text-slate-800 group"} flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
      <${dt} class="w-6 h-6"/>
      ${ct}
    <///>
  <//>`;return Et` <div
    class="hs-overlay hs-overlay-open:translate-x-0
            -translate-x-full transition-all duration-300 transform
            fixed top-0 left-0 bottom-0 z-[60] w-72
            bg-white/60 backdrop-blur-md border-r border-white/40 shadow-xl
            overflow-y-auto scrollbar-y
            ${_&&"translate-x-0"} right-auto bottom-0"
  >
    <div class="flex flex-col m-4 gap-y-6">
      <div
        class="flex h-10 shrink-0 items-center gap-x-4 font-bold text-xl text-slate-500"
      >
        <${Logo} class="h-full" /> Zagotovka <span class="text-xs text-slate-400 font-normal ml-1">${"2026-07-04T11:02"}</span>
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
          title="Zigbee"
          icon=${Icons.cog}
          href="/zigbee"
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
  <//>`}function Chart({data:$}){const _=$.length,st=20,ct=15,dt=100,k=5,pt=10,te=25,Zt=le=>(dt-pt)/k*(le+1),oe=le=>(dt-pt)*le/100,ne=le=>dt-pt-oe(le),ee=(le,ae,pe)=>Array.from({length:ae},(ie,he)=>he*1+le);return Et` <div
    class="my-4 divide-y divide-gray-200 overflow-auto rounded bg-white"
  >
    <div class="font-light uppercase flex items-center text-gray-600 px-4 py-2">
      Temperature, last 24h
    <//>
    <div class="relative">
      <svg class="bg-yellow-x50 w-full p-4" viewBox="0 0 ${_*st+ct} ${dt}">
        ${ee(0,k).map(le=>Et`
            <line
              x1="0"
              y1=${Zt(le)}
              x2=${ct+_*st}
              y2=${Zt(le)}
              stroke-width="0.3"
              class="stroke-slate-300"
              stroke-dasharray="1,1"
            />
            <text x="0" y=${Zt(le)-2} class="text-[6px] fill-slate-400"
              >${te-te/k*(le+1)}<//
            >
          `)}
        ${ee(0,_).map(le=>Et`
            <rect
              x=${ct+le*st}
              y=${ne($[le]*100/te)}
              width="12"
              height=${oe($[le]*100/te)}
              rx="2"
              class="fill-cyan-500"
            />
            <text x=${ct+le*st} y="100" class="text-[6px] fill-slate-400"
              >${le*2}:00<//
            >
          `)}
      <//>
    <//>
  <//>`}function DeveloperNote({text:$,children:_}){return Et` <div class="flex p-4 gap-2">
    <div class="text-sm text-slate-500">
      <div class="flex items-center">
        <${Icons.info}
          class="self-start basis-[30px] grow-0 shrink-0 text-green-600 mr-2"
        />
        <div class="font-semibold">Developer Note<//>
      <//>
      ${($||"").split(".").map(st=>Et` <p class="my-2 ">${st}<//>`)}
      ${_}
    <//>
  <//>`}function Main({}){const[$,_]=ut(null);return lt(()=>fetch("api/stats/get").then(ct=>ct.json()).then(ct=>_(ct)),[]),$?Et` <div class="p-2">
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
  <//>`:""}const MyPolzunok=({value:$,onChange:_})=>Et`
    <div class="flex items-center gap-3">
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          class="sr-only peer"
          checked=${$}
          onChange=${ct=>{_(ct.target.checked?1:0)}}
        />
        <div class="w-[42px] h-[22px] bg-slate-200/80 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300/50 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-400 peer-checked:to-cyan-500 shadow-inner"></div>
      </label>
      <span class="text-sm font-medium text-slate-600 w-8">${$?"On":"Off"}</span>
    </div>
  `;function FirmwareStatus({title:$,info:_,children:st}){return Et`
    <div class="bg-white xm-4 divide-y border rounded flex flex-col">
      <div
        class="font-light uppercase flex items-center text-gray-600 px-4 py-2"
      >
        ${$}
      </div>
      <div class="px-4 py-3 flex flex-col gap-2 grow">
        <div>Version: ${_.version||"N/A"}</div>
        <div>Status: ${_.status||"N/A"}</div>
        ${st}
      </div>
    </div>
  `}function FirmwareUpdate({}){const[$,_]=ut([{},{}]),[st,ct]=ut(null),dt=()=>fetch("api/firmware/status").then(le=>le.json()).then(le=>_(le));lt(dt,[]),lt(()=>{if(st){const le=setTimeout(()=>{ct(null)},3e3);return()=>clearTimeout(le)}},[st]);const k=le=>fetch("api/firmware/commit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({})}).then(ae=>ae.json()).then(dt),pt=le=>fetch("api/device/reset",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reboot:1})}).then(ae=>ae.json()).then(ae=>new Promise(pe=>setTimeout(()=>{dt(),pe()},5e3))),te=le=>fetch("api/firmware/rollback",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({})}).then(pt),Zt=le=>fetch("api/device/eraselast").then(dt),oe=function(le){if(!le){ct({type:"yellow",message:"Error: No file selected."});return}const ae=le.name.split(".").pop().toLowerCase();if(ae!=="bin"&&ae!=="hex"){ct({type:"red",message:"Error: Only .bin and .hex files are allowed!"});return}const pe=new FormData;pe.append("file",le),fetch("api/firmware/upload",{method:"POST",body:pe}).then(ie=>{if(!ie.ok)throw new Error(`HTTP error! status: ${ie.status}`);return ie.json()}).then(()=>{ct({type:"green",message:"Firmware uploaded successfully!"}),dt()}).catch(ie=>{ct({type:"yellow",message:`Error: Upload failed. ${ie.message}`})})},ne=({type:le,message:ae})=>Et`
      <div
        class=${`fixed top-0 left-0 right-0 z-50 border-b-4 p-4 ${le==="red"?"bg-red-100 border-red-500 text-red-700":le==="yellow"?"bg-yellow-100 border-yellow-500 text-yellow-700":"bg-green-100 border-green-500 text-green-700"}`}
        role="alert"
      >
        <p class="font-bold text-center">${ae}</p>
      </div>
    `,ee=({title:le,onupload:ae})=>Et`
      <label
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        ${le}
        <input
          type="file"
          class="hidden"
          accept=".bin,.hex"
          onChange=${ie=>{const he=ie.target.files[0];he&&ae(he)}}
        />
      </label>
    `;return Et`
    ${st&&Et`<${ne} type=${st.type} message=${st.message} />`}
    <div class="m-4 gap-4 grid grid-cols-1 lg:grid-cols-3">
      <${FirmwareStatus} title="Current firmware image" info=${$[0]}>
        <div class="flex flex-wrap gap-2">
          <${Button}
            title="Commit this firmware"
            onclick=${k}
            icon=${Icons.thumbUp}
            disabled=${$[0].status==3}
            cls="w-full"
          />
        </div>
      <//>
      <${FirmwareStatus} title="Previous firmware image" info=${$[1]}>
        <${Button}
          title="Rollback to this firmware"
          onclick=${te}
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
          <${ee}
            title="Upload new firmware (.bin or .hex)"
            onupload=${oe}
          />
          <div class="grow"></div>
          <${Button}
            title="Reboot device"
            onclick=${pt}
            icon=${Icons.refresh}
            cls="w-full"
          />
          <${Button}
            title="Erase last sector"
            onclick=${Zt}
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
  `}const pageSetting=({value:$,setfn:_,type:st,options:ct,error:dt,...k})=>{let pt;const te=`w-full px-3 py-2 border rounded-md ${dt?"border-red-500":"border-gray-300"}`;switch(st){case"text":case"password":case"number":pt=Et`
        <input
          type=${st}
          value=${$}
          onInput=${Zt=>_(Zt.target.value)}
          class=${te}
          ...${k}
        />
      `;break;case"select":pt=Et`
        <select
          value=${$}
          onChange=${Zt=>_(Zt.target.value)}
          class=${te}
          ...${k}
        >
          ${ct.map(([Zt,oe])=>Et` <option value=${Zt}>${oe}</option> `)}
        </select>
      `;break;case"switch":pt=Et`
        <label class="switch">
          <input
            type="checkbox"
            checked=${$}
            onChange=${Zt=>_(Zt.target.checked)}
            ...${k}
          />
          <span class="slider round"></span>
        </label>
      `;break;default:pt=Et`<span>Неподдерживаемый тип: ${st}</span>`}return Et`
    <div>
      ${pt}
      ${dt&&Et`<div class="text-red-500 text-sm mt-1">${dt}</div>`}
    </div>
  `};function Toast({message:$,type:_,onClose:st}){return lt(()=>{const ct=setTimeout(()=>{st()},3e3);return()=>clearTimeout(ct)},[]),Et`
    <div
      class=${`fixed bottom-4 right-4 p-4 rounded-md ${_==="success"?"bg-green-500":"bg-red-500"} text-white`}
    >
      ${$}
    </div>
  `}const App=function({}){const[$,_]=ut(!0),[st,ct]=ut("/"),[dt,k]=ut(""),[pt,te]=ut(!0),[Zt,oe]=ut(null),[ne,ee]=ut(!1),le=()=>fetch("api/logout").then(pe=>k("")),ae=pe=>pe.ok?pe.json().then(ie=>k(ie.user)).finally(ie=>_(!1)):_(!1)&&k(null);return lt(()=>fetch("api/login").then(ae),[]),window.pollIntervalMs=window.pollIntervalMs||2e3,lt(()=>{const pe=()=>{window.pollIntervalMs=document.hidden?3e4:2e3};return document.addEventListener("visibilitychange",pe),()=>document.removeEventListener("visibilitychange",pe)},[]),lt(()=>{if(dt)return registerPoll("common","/api/state/common",pe=>{if(pe&&pe.__session_expired){ee(!0);return}pe&&oe(pe)}),()=>unregisterPoll("common")},[dt]),$?"":dt?Et`<${StateContext.Provider} value=${Zt}>
   <div class="min-h-screen bg-slate-100" id="mains">
    <${Sidebar} url=${st} show=${pt} />
    <${Header}
      logout=${le}
      user=${dt}
      showSidebar=${pt}
      setShowSidebar=${te}
      sessionExpired=${ne}
    />
    <div
      class="${pt&&"pl-72"} transition-all duration-300 transform"
    >
      <${Qt}
        onChange=${pe=>ct(pe.url)}
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
        <${TabZigbee} path="zigbee" />
        <${Settings} path="settings" />
        <${FirmwareUpdate} path="update" />
      <//>
    <//>
   <//>
  <//>`:Et`<${Login}
      loginFn=${ae}
      logoIcon=${Logo}
      title="Zagotovka‑M Web Interface Login"
      tipText="Default: admin / 12345678"
    />`};window.onload=()=>O(y(App),document.body);
