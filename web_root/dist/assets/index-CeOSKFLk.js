(function(){const k=document.createElement("link").relList;if(k&&k.supports&&k.supports("modulepreload"))return;for(const ct of document.querySelectorAll('link[rel="modulepreload"]'))mt(ct);new MutationObserver(ct=>{for(const _ of ct)if(_.type==="childList")for(const vt of _.addedNodes)vt.tagName==="LINK"&&vt.rel==="modulepreload"&&mt(vt)}).observe(document,{childList:!0,subtree:!0});function st(ct){const _={};return ct.integrity&&(_.integrity=ct.integrity),ct.referrerPolicy&&(_.referrerPolicy=ct.referrerPolicy),ct.crossOrigin==="use-credentials"?_.credentials="include":ct.crossOrigin==="anonymous"?_.credentials="omit":_.credentials="same-origin",_}function mt(ct){if(ct.ep)return;ct.ep=!0;const _=st(ct);fetch(ct.href,_)}})();const _registered=new Map;let _active=!1,_timer=null,_keys=[],_idx=0;const MAX_FAILS=3,BASE_BACKOFF=2e3,POLL_INTERVAL=1e3,FETCH_TIMEOUT=5e3,MAX_QUEUE=8;function registerPoll($,k,st,mt={}){if(_keys.length>=MAX_QUEUE&&!_registered.has($))for(let ct=0;ct<_keys.length;ct++){const _=_keys[ct];if(_!=="common"){_registered.delete(_),_keys.splice(ct,1),_idx>_keys.length&&(_idx=0);break}}if(_registered.set($,{url:k,callback:st,etag:null,oneShot:mt.oneShot||!1,failCount:0,backoffMs:0}),_keys=Array.from(_registered.keys()),mt.immediate&&(_idx=_keys.indexOf($),!_active)){_clearTimer(),_timer=setTimeout(_tick,0);return}_timer||_schedule()}function unregisterPoll($){const k=_registered.get($);k&&(k.callback=function(){}),_registered.delete($),_keys=Array.from(_registered.keys()),_keys.length===0&&_clearTimer()}function _clearTimer(){clearTimeout(_timer),_timer=null}function _schedule($){_clearTimer(),_timer=setTimeout(_tick,$!==void 0?$:POLL_INTERVAL)}async function _tick(){if(_active){_schedule();return}if(_keys.length===0){_clearTimer();return}_active=!0,_idx>=_keys.length&&(_idx=0);const $=_keys[_idx],k=_registered.get($);if(k){const ct=new AbortController,_=setTimeout(function(){ct.abort()},FETCH_TIMEOUT);try{const vt={};k.etag&&(vt["If-None-Match"]=k.etag);const te=await fetch(k.url,{signal:ct.signal,cache:"no-store",headers:vt});clearTimeout(_);const Xt=te.headers.get("ETag");if(Xt&&(k.etag=Xt),te.status!==304)if(te.ok){const ee=await te.json();k.callback(ee),k.failCount=0,k.backoffMs=0,k.oneShot&&(_registered.delete($),_keys=Array.from(_registered.keys()))}else(te.status===401||te.status===403)&&(k.callback({__session_expired:!0}),_registered.delete($),_keys=Array.from(_registered.keys()),_idx>=_keys.length&&_keys.length>0&&(_idx=0))}catch(vt){clearTimeout(_),vt.name!=="AbortError"&&console.warn("[pollQueue] "+$+": "+vt.message),k&&(k.etag=null,k.failCount=(k.failCount||0)+1,k.failCount>=MAX_FAILS?(console.warn("[pollQueue] "+$+": stopped after "+k.failCount+" consecutive errors"),_registered.delete($),_keys=Array.from(_registered.keys()),_idx>=_keys.length&&_keys.length>0&&(_idx=0)):k.backoffMs=Math.min((k.backoffMs||BASE_BACKOFF)*2,3e4))}}_active=!1;const st=_registered.get($),mt=st&&st.backoffMs>0?st.backoffMs:POLL_INTERVAL;_idx++,_idx>=_keys.length?(_idx=0,_keys.length>0?_schedule(mt):_clearTimer()):_keys.length>0?_schedule(0):_clearTimer()}var t,n,e,r,o,u,i,l,c,a,s,f={},p=[],h=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,d=Array.isArray;function v($,k){for(var st in k)$[st]=k[st];return $}function m($){var k=$.parentNode;k&&k.removeChild($)}function y($,k,st){var mt,ct,_,vt={};for(_ in k)_=="key"?mt=k[_]:_=="ref"?ct=k[_]:vt[_]=k[_];if(arguments.length>2&&(vt.children=arguments.length>3?t.call(arguments,2):st),typeof $=="function"&&$.defaultProps!=null)for(_ in $.defaultProps)vt[_]===void 0&&(vt[_]=$.defaultProps[_]);return g($,vt,mt,ct,null)}function g($,k,st,mt,ct){var _={type:$,props:k,key:st,ref:mt,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:ct??++e,__i:-1,__u:0};return ct==null&&n.vnode!=null&&n.vnode(_),_}function b($){return $.children}function C($,k){this.props=$,this.context=k}function x($,k){if(k==null)return $.__?x($.__,$.__i+1):null;for(var st;k<$.__k.length;k++)if((st=$.__k[k])!=null&&st.__e!=null)return st.__e;return typeof $.type=="function"?x($):null}function w($){var k,st;if(($=$.__)!=null&&$.__c!=null){for($.__e=$.__c.base=null,k=0;k<$.__k.length;k++)if((st=$.__k[k])!=null&&st.__e!=null){$.__e=$.__c.base=st.__e;break}return w($)}}function P($){(!$.__d&&($.__d=!0)&&r.push($)&&!U.__r++||o!==n.debounceRendering)&&((o=n.debounceRendering)||u)(U)}function U(){var $,k,st,mt,ct,_,vt,te;for(r.sort(i);$=r.shift();)$.__d&&(k=r.length,mt=void 0,_=(ct=(st=$).__v).__e,vt=[],te=[],st.__P&&((mt=v({},ct)).__v=ct.__v+1,n.vnode&&n.vnode(mt),M(st.__P,mt,ct,st.__n,st.__P.namespaceURI,32&ct.__u?[_]:null,vt,_??x(ct),!!(32&ct.__u),te),mt.__v=ct.__v,mt.__.__k[mt.__i]=mt,L(vt,mt,te),mt.__e!=_&&w(mt)),r.length>k&&r.sort(i));U.__r=0}function H($,k,st,mt,ct,_,vt,te,Xt,ee,se){var oe,re,de,ue,be,fe=mt&&mt.__k||p,pe=k.length;for(st.__d=Xt,E(st,k,fe),Xt=st.__d,oe=0;oe<pe;oe++)(de=st.__k[oe])!=null&&typeof de!="boolean"&&typeof de!="function"&&(re=de.__i===-1?f:fe[de.__i]||f,de.__i=oe,M($,de,re,ct,_,vt,te,Xt,ee,se),ue=de.__e,de.ref&&re.ref!=de.ref&&(re.ref&&F(re.ref,null,de),se.push(de.ref,de.__c||ue,de)),be==null&&ue!=null&&(be=ue),65536&de.__u||re.__k===de.__k?(Xt&&!Xt.isConnected&&(Xt=x(re)),Xt=S(de,Xt,$)):typeof de.type=="function"&&de.__d!==void 0?Xt=de.__d:ue&&(Xt=ue.nextSibling),de.__d=void 0,de.__u&=-196609);st.__d=Xt,st.__e=be}function E($,k,st){var mt,ct,_,vt,te,Xt=k.length,ee=st.length,se=ee,oe=0;for($.__k=[],mt=0;mt<Xt;mt++)vt=mt+oe,(ct=$.__k[mt]=(ct=k[mt])==null||typeof ct=="boolean"||typeof ct=="function"?null:typeof ct=="string"||typeof ct=="number"||typeof ct=="bigint"||ct.constructor==String?g(null,ct,null,null,null):d(ct)?g(b,{children:ct},null,null,null):ct.constructor===void 0&&ct.__b>0?g(ct.type,ct.props,ct.key,ct.ref?ct.ref:null,ct.__v):ct)!=null?(ct.__=$,ct.__b=$.__b+1,te=D(ct,st,vt,se),ct.__i=te,_=null,te!==-1&&(se--,(_=st[te])&&(_.__u|=131072)),_==null||_.__v===null?(te==-1&&oe--,typeof ct.type!="function"&&(ct.__u|=65536)):te!==vt&&(te===vt+1?oe++:te>vt?se>Xt-vt?oe+=te-vt:oe--:te<vt?te==vt-1&&(oe=te-vt):oe=0,te!==mt+oe&&(ct.__u|=65536))):(_=st[vt])&&_.key==null&&_.__e&&(131072&_.__u)==0&&(_.__e==$.__d&&($.__d=x(_)),I(_,_,!1),st[vt]=null,se--);if(se)for(mt=0;mt<ee;mt++)(_=st[mt])!=null&&(131072&_.__u)==0&&(_.__e==$.__d&&($.__d=x(_)),I(_,_))}function S($,k,st){var mt,ct;if(typeof $.type=="function"){for(mt=$.__k,ct=0;mt&&ct<mt.length;ct++)mt[ct]&&(mt[ct].__=$,k=S(mt[ct],k,st));return k}$.__e!=k&&(st.insertBefore($.__e,k||null),k=$.__e);do k=k&&k.nextSibling;while(k!=null&&k.nodeType===8);return k}function A($,k){return k=k||[],$==null||typeof $=="boolean"||(d($)?$.some((function(st){A(st,k)})):k.push($)),k}function D($,k,st,mt){var ct=$.key,_=$.type,vt=st-1,te=st+1,Xt=k[st];if(Xt===null||Xt&&ct==Xt.key&&_===Xt.type&&(131072&Xt.__u)==0)return st;if(mt>(Xt!=null&&(131072&Xt.__u)==0?1:0))for(;vt>=0||te<k.length;){if(vt>=0){if((Xt=k[vt])&&(131072&Xt.__u)==0&&ct==Xt.key&&_===Xt.type)return vt;vt--}if(te<k.length){if((Xt=k[te])&&(131072&Xt.__u)==0&&ct==Xt.key&&_===Xt.type)return te;te++}}return-1}function N($,k,st){k[0]==="-"?$.setProperty(k,st??""):$[k]=st==null?"":typeof st!="number"||h.test(k)?st:st+"px"}function R($,k,st,mt,ct){var _;t:if(k==="style")if(typeof st=="string")$.style.cssText=st;else{if(typeof mt=="string"&&($.style.cssText=mt=""),mt)for(k in mt)st&&k in st||N($.style,k,"");if(st)for(k in st)mt&&st[k]===mt[k]||N($.style,k,st[k])}else if(k[0]==="o"&&k[1]==="n")_=k!==(k=k.replace(/(PointerCapture)$|Capture$/i,"$1")),k=k.toLowerCase()in $||k==="onFocusOut"||k==="onFocusIn"?k.toLowerCase().slice(2):k.slice(2),$.l||($.l={}),$.l[k+_]=st,st?mt?st.u=mt.u:(st.u=l,$.addEventListener(k,_?a:c,_)):$.removeEventListener(k,_?a:c,_);else{if(ct=="http://www.w3.org/2000/svg")k=k.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(k!="width"&&k!="height"&&k!="href"&&k!="list"&&k!="form"&&k!="tabIndex"&&k!="download"&&k!="rowSpan"&&k!="colSpan"&&k!="role"&&k in $)try{$[k]=st??"";break t}catch{}typeof st=="function"||(st==null||st===!1&&k[4]!=="-"?$.removeAttribute(k):$.setAttribute(k,st))}}function T($){return function(k){if(this.l){var st=this.l[k.type+$];if(k.t==null)k.t=l++;else if(k.t<st.u)return;return st(n.event?n.event(k):k)}}}function M($,k,st,mt,ct,_,vt,te,Xt,ee){var se,oe,re,de,ue,be,fe,pe,ge,he,Te,$e,ke,Se,Pe,xe=k.type;if(k.constructor!==void 0)return null;128&st.__u&&(Xt=!!(32&st.__u),_=[te=k.__e=st.__e]),(se=n.__b)&&se(k);t:if(typeof xe=="function")try{if(pe=k.props,ge=(se=xe.contextType)&&mt[se.__c],he=se?ge?ge.props.value:se.__:mt,st.__c?fe=(oe=k.__c=st.__c).__=oe.__E:("prototype"in xe&&xe.prototype.render?k.__c=oe=new xe(pe,he):(k.__c=oe=new C(pe,he),oe.constructor=xe,oe.render=V),ge&&ge.sub(oe),oe.props=pe,oe.state||(oe.state={}),oe.context=he,oe.__n=mt,re=oe.__d=!0,oe.__h=[],oe._sb=[]),oe.__s==null&&(oe.__s=oe.state),xe.getDerivedStateFromProps!=null&&(oe.__s==oe.state&&(oe.__s=v({},oe.__s)),v(oe.__s,xe.getDerivedStateFromProps(pe,oe.__s))),de=oe.props,ue=oe.state,oe.__v=k,re)xe.getDerivedStateFromProps==null&&oe.componentWillMount!=null&&oe.componentWillMount(),oe.componentDidMount!=null&&oe.__h.push(oe.componentDidMount);else{if(xe.getDerivedStateFromProps==null&&pe!==de&&oe.componentWillReceiveProps!=null&&oe.componentWillReceiveProps(pe,he),!oe.__e&&(oe.shouldComponentUpdate!=null&&oe.shouldComponentUpdate(pe,oe.__s,he)===!1||k.__v===st.__v)){for(k.__v!==st.__v&&(oe.props=pe,oe.state=oe.__s,oe.__d=!1),k.__e=st.__e,k.__k=st.__k,k.__k.forEach((function(Ee){Ee&&(Ee.__=k)})),Te=0;Te<oe._sb.length;Te++)oe.__h.push(oe._sb[Te]);oe._sb=[],oe.__h.length&&vt.push(oe);break t}oe.componentWillUpdate!=null&&oe.componentWillUpdate(pe,oe.__s,he),oe.componentDidUpdate!=null&&oe.__h.push((function(){oe.componentDidUpdate(de,ue,be)}))}if(oe.context=he,oe.props=pe,oe.__P=$,oe.__e=!1,$e=n.__r,ke=0,"prototype"in xe&&xe.prototype.render){for(oe.state=oe.__s,oe.__d=!1,$e&&$e(k),se=oe.render(oe.props,oe.state,oe.context),Se=0;Se<oe._sb.length;Se++)oe.__h.push(oe._sb[Se]);oe._sb=[]}else do oe.__d=!1,$e&&$e(k),se=oe.render(oe.props,oe.state,oe.context),oe.state=oe.__s;while(oe.__d&&++ke<25);oe.state=oe.__s,oe.getChildContext!=null&&(mt=v(v({},mt),oe.getChildContext())),re||oe.getSnapshotBeforeUpdate==null||(be=oe.getSnapshotBeforeUpdate(de,ue)),H($,d(Pe=se!=null&&se.type===b&&se.key==null?se.props.children:se)?Pe:[Pe],k,st,mt,ct,_,vt,te,Xt,ee),oe.base=k.__e,k.__u&=-161,oe.__h.length&&vt.push(oe),fe&&(oe.__E=oe.__=null)}catch(Ee){k.__v=null,Xt||_!=null?(k.__e=te,k.__u|=Xt?160:32,_[_.indexOf(te)]=null):(k.__e=st.__e,k.__k=st.__k),n.__e(Ee,k,st)}else _==null&&k.__v===st.__v?(k.__k=st.__k,k.__e=st.__e):k.__e=W(st.__e,k,st,mt,ct,_,vt,Xt,ee);(se=n.diffed)&&se(k)}function L($,k,st){k.__d=void 0;for(var mt=0;mt<st.length;mt++)F(st[mt],st[++mt],st[++mt]);n.__c&&n.__c(k,$),$.some((function(ct){try{$=ct.__h,ct.__h=[],$.some((function(_){_.call(ct)}))}catch(_){n.__e(_,ct.__v)}}))}function W($,k,st,mt,ct,_,vt,te,Xt){var ee,se,oe,re,de,ue,be,fe=st.props,pe=k.props,ge=k.type;if(ge==="svg"?ct="http://www.w3.org/2000/svg":ge==="math"?ct="http://www.w3.org/1998/Math/MathML":ct||(ct="http://www.w3.org/1999/xhtml"),_!=null){for(ee=0;ee<_.length;ee++)if((de=_[ee])&&"setAttribute"in de==!!ge&&(ge?de.localName===ge:de.nodeType===3)){$=de,_[ee]=null;break}}if($==null){if(ge===null)return document.createTextNode(pe);$=document.createElementNS(ct,ge,pe.is&&pe),_=null,te=!1}if(ge===null)fe===pe||te&&$.data===pe||($.data=pe);else{if(_=_&&t.call($.childNodes),fe=st.props||f,!te&&_!=null)for(fe={},ee=0;ee<$.attributes.length;ee++)fe[(de=$.attributes[ee]).name]=de.value;for(ee in fe)if(de=fe[ee],ee!="children"){if(ee=="dangerouslySetInnerHTML")oe=de;else if(ee!=="key"&&!(ee in pe)){if(ee=="value"&&"defaultValue"in pe||ee=="checked"&&"defaultChecked"in pe)continue;R($,ee,null,de,ct)}}for(ee in pe)de=pe[ee],ee=="children"?re=de:ee=="dangerouslySetInnerHTML"?se=de:ee=="value"?ue=de:ee=="checked"?be=de:ee==="key"||te&&typeof de!="function"||fe[ee]===de||R($,ee,de,fe[ee],ct);if(se)te||oe&&(se.__html===oe.__html||se.__html===$.innerHTML)||($.innerHTML=se.__html),k.__k=[];else if(oe&&($.innerHTML=""),H($,d(re)?re:[re],k,st,mt,ge==="foreignObject"?"http://www.w3.org/1999/xhtml":ct,_,vt,_?_[0]:st.__k&&x(st,0),te,Xt),_!=null)for(ee=_.length;ee--;)_[ee]!=null&&m(_[ee]);te||(ee="value",ue!==void 0&&(ue!==$[ee]||ge==="progress"&&!ue||ge==="option"&&ue!==fe[ee])&&R($,ee,ue,fe[ee],ct),ee="checked",be!==void 0&&be!==$[ee]&&R($,ee,be,fe[ee],ct))}return $}function F($,k,st){try{typeof $=="function"?$(k):$.current=k}catch(mt){n.__e(mt,st)}}function I($,k,st){var mt,ct;if(n.unmount&&n.unmount($),(mt=$.ref)&&(mt.current&&mt.current!==$.__e||F(mt,null,k)),(mt=$.__c)!=null){if(mt.componentWillUnmount)try{mt.componentWillUnmount()}catch(_){n.__e(_,k)}mt.base=mt.__P=null}if(mt=$.__k)for(ct=0;ct<mt.length;ct++)mt[ct]&&I(mt[ct],k,st||typeof $.type!="function");st||$.__e==null||m($.__e),$.__c=$.__=$.__e=$.__d=void 0}function V($,k,st){return this.constructor($,st)}function O($,k,st){var mt,ct,_,vt;n.__&&n.__($,k),ct=(mt=!1)?null:k.__k,_=[],vt=[],M(k,$=k.__k=y(b,null,[$]),ct||f,f,k.namespaceURI,ct?null:k.firstChild?t.call(k.childNodes):null,_,ct?ct.__e:k.firstChild,mt,vt),L(_,$,vt)}function j($,k,st){var mt,ct,_,vt,te=v({},$.props);for(_ in $.type&&$.type.defaultProps&&(vt=$.type.defaultProps),k)_=="key"?mt=k[_]:_=="ref"?ct=k[_]:te[_]=k[_]===void 0&&vt!==void 0?vt[_]:k[_];return arguments.length>2&&(te.children=arguments.length>3?t.call(arguments,2):st),g($.type,te,mt||$.key,ct||$.ref,null)}function q($,k){var st={__c:k="__cC"+s++,__:$,Consumer:function(mt,ct){return mt.children(ct)},Provider:function(mt){var ct,_;return this.getChildContext||(ct=[],(_={})[k]=this,this.getChildContext=function(){return _},this.shouldComponentUpdate=function(vt){this.props.value!==vt.value&&ct.some((function(te){te.__e=!0,P(te)}))},this.sub=function(vt){ct.push(vt);var te=vt.componentWillUnmount;vt.componentWillUnmount=function(){ct.splice(ct.indexOf(vt),1),te&&te.call(vt)}}),mt.children}};return st.Provider.__=st.Consumer.contextType=st}t=p.slice,n={__e:function($,k,st,mt){for(var ct,_,vt;k=k.__;)if((ct=k.__c)&&!ct.__)try{if((_=ct.constructor)&&_.getDerivedStateFromError!=null&&(ct.setState(_.getDerivedStateFromError($)),vt=ct.__d),ct.componentDidCatch!=null&&(ct.componentDidCatch($,mt||{}),vt=ct.__d),vt)return ct.__E=ct}catch(te){$=te}throw $}},e=0,C.prototype.setState=function($,k){var st;st=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=v({},this.state),typeof $=="function"&&($=$(v({},st),this.props)),$&&v(st,$),$!=null&&this.__v&&(k&&this._sb.push(k),P(this))},C.prototype.forceUpdate=function($){this.__v&&(this.__e=!0,$&&this.__h.push($),P(this))},C.prototype.render=b,r=[],u=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=function($,k){return $.__v.__b-k.__v.__b},U.__r=0,l=0,c=T(!1),a=T(!0),s=0;var B,K,z,G,J=0,Q=[],X=[],Y=n,Z=Y.__b,tt=Y.__r,nt=Y.diffed,et=Y.__c,_t=Y.unmount,rt=Y.__;function ot($,k){Y.__h&&Y.__h(K,$,J||k),J=0;var st=K.__H||(K.__H={__:[],__h:[]});return $>=st.__.length&&st.__.push({__V:X}),st.__[$]}function ut($){return J=1,it(wt,$)}function it($,k,st){var mt=ot(B++,2);if(mt.t=$,!mt.__c&&(mt.__=[wt(void 0,k),function(te){var Xt=mt.__N?mt.__N[0]:mt.__[0],ee=mt.t(Xt,te);Xt!==ee&&(mt.__N=[ee,mt.__[1]],mt.__c.setState({}))}],mt.__c=K,!K.u)){var ct=function(te,Xt,ee){if(!mt.__c.__H)return!0;var se=mt.__c.__H.__.filter((function(re){return!!re.__c}));if(se.every((function(re){return!re.__N})))return!_||_.call(this,te,Xt,ee);var oe=!1;return se.forEach((function(re){if(re.__N){var de=re.__[0];re.__=re.__N,re.__N=void 0,de!==re.__[0]&&(oe=!0)}})),!(!oe&&mt.__c.props===te)&&(!_||_.call(this,te,Xt,ee))};K.u=!0;var _=K.shouldComponentUpdate,vt=K.componentWillUpdate;K.componentWillUpdate=function(te,Xt,ee){if(this.__e){var se=_;_=void 0,ct(te,Xt,ee),_=se}vt&&vt.call(this,te,Xt,ee)},K.shouldComponentUpdate=ct}return mt.__N||mt.__}function lt($,k){var st=ot(B++,3);!Y.__s&&xt(st.__H,k)&&(st.__=$,st.i=k,K.__H.__h.push(st))}function at($){return J=5,ft((function(){return{current:$}}),[])}function ft($,k){var st=ot(B++,7);return xt(st.__H,k)?(st.__V=$(),st.i=k,st.__h=$,st.__V):st.__}function ht($){var k=K.context[$.__c],st=ot(B++,9);return st.c=$,k?(st.__==null&&(st.__=!0,k.sub(K)),k.props.value):$.__}function yt(){for(var $;$=Q.shift();)if($.__P&&$.__H)try{$.__H.__h.forEach(bt),$.__H.__h.forEach(Ct),$.__H.__h=[]}catch(k){$.__H.__h=[],Y.__e(k,$.__v)}}Y.__b=function($){K=null,Z&&Z($)},Y.__=function($,k){$&&k.__k&&k.__k.__m&&($.__m=k.__k.__m),rt&&rt($,k)},Y.__r=function($){tt&&tt($),B=0;var k=(K=$.__c).__H;k&&(z===K?(k.__h=[],K.__h=[],k.__.forEach((function(st){st.__N&&(st.__=st.__N),st.__V=X,st.__N=st.i=void 0}))):(k.__h.forEach(bt),k.__h.forEach(Ct),k.__h=[],B=0)),z=K},Y.diffed=function($){nt&&nt($);var k=$.__c;k&&k.__H&&(k.__H.__h.length&&(Q.push(k)!==1&&G===Y.requestAnimationFrame||((G=Y.requestAnimationFrame)||kt)(yt)),k.__H.__.forEach((function(st){st.i&&(st.__H=st.i),st.__V!==X&&(st.__=st.__V),st.i=void 0,st.__V=X}))),z=K=null},Y.__c=function($,k){k.some((function(st){try{st.__h.forEach(bt),st.__h=st.__h.filter((function(mt){return!mt.__||Ct(mt)}))}catch(mt){k.some((function(ct){ct.__h&&(ct.__h=[])})),k=[],Y.__e(mt,st.__v)}})),et&&et($,k)},Y.unmount=function($){_t&&_t($);var k,st=$.__c;st&&st.__H&&(st.__H.__.forEach((function(mt){try{bt(mt)}catch(ct){k=ct}})),st.__H=void 0,k&&Y.__e(k,st.__v))};var gt=typeof requestAnimationFrame=="function";function kt($){var k,st=function(){clearTimeout(mt),gt&&cancelAnimationFrame(k),setTimeout($)},mt=setTimeout(st,100);gt&&(k=requestAnimationFrame(st))}function bt($){var k=K,st=$.__c;typeof st=="function"&&($.__c=void 0,st()),K=k}function Ct($){var k=K;$.__c=$.__(),K=k}function xt($,k){return!$||$.length!==k.length||k.some((function(st,mt){return st!==$[mt]}))}function wt($,k){return typeof k=="function"?k($):k}var Pt=function($,k,st,mt){var ct;k[0]=0;for(var _=1;_<k.length;_++){var vt=k[_++],te=k[_]?(k[0]|=vt?1:2,st[k[_++]]):k[++_];vt===3?mt[0]=te:vt===4?mt[1]=Object.assign(mt[1]||{},te):vt===5?(mt[1]=mt[1]||{})[k[++_]]=te:vt===6?mt[1][k[++_]]+=te+"":vt?(ct=$.apply(te,Pt($,te,st,["",null])),mt.push(ct),te[0]?k[0]|=2:(k[_-2]=0,k[_]=ct)):mt.push(te)}return mt},Ut=new Map;function Ht($){var k=Ut.get(this);return k||(k=new Map,Ut.set(this,k)),(k=Pt(this,k.get($)||(k.set($,k=(function(st){for(var mt,ct,_=1,vt="",te="",Xt=[0],ee=function(re){_===1&&(re||(vt=vt.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?Xt.push(0,re,vt):_===3&&(re||vt)?(Xt.push(3,re,vt),_=2):_===2&&vt==="..."&&re?Xt.push(4,re,0):_===2&&vt&&!re?Xt.push(5,0,!0,vt):_>=5&&((vt||!re&&_===5)&&(Xt.push(_,0,vt,ct),_=6),re&&(Xt.push(_,re,0,ct),_=6)),vt=""},se=0;se<st.length;se++){se&&(_===1&&ee(),ee(se));for(var oe=0;oe<st[se].length;oe++)mt=st[se][oe],_===1?mt==="<"?(ee(),Xt=[Xt],_=3):vt+=mt:_===4?vt==="--"&&mt===">"?(_=1,vt=""):vt=mt+vt[0]:te?mt===te?te="":vt+=mt:mt==='"'||mt==="'"?te=mt:mt===">"?(ee(),_=1):_&&(mt==="="?(_=5,ct=vt,vt=""):mt==="/"&&(_<5||st[se][oe+1]===">")?(ee(),_===3&&(Xt=Xt[0]),_=Xt,(Xt=Xt[0]).push(2,0,_),_=0):mt===" "||mt==="	"||mt===`
`||mt==="\r"?(ee(),_=2):vt+=mt),_===3&&vt==="!--"&&(_=4,Xt=Xt[0])}return ee(),Xt})($)),k),arguments,[])).length>1?k:k[0]}var Et=Ht.bind(y),St={};function At($,k){for(var st in k)$[st]=k[st];return $}function Dt($,k,st){var mt,ct=/(?:\?([^#]*))?(#.*)?$/,_=$.match(ct),vt={};if(_&&_[1])for(var te=_[1].split("&"),Xt=0;Xt<te.length;Xt++){var ee=te[Xt].split("=");vt[decodeURIComponent(ee[0])]=decodeURIComponent(ee.slice(1).join("="))}$=Tt($.replace(ct,"")),k=Tt(k||"");for(var se=Math.max($.length,k.length),oe=0;oe<se;oe++)if(k[oe]&&k[oe].charAt(0)===":"){var re=k[oe].replace(/(^:|[+*?]+$)/g,""),de=(k[oe].match(/[+*?]+$/)||St)[0]||"",ue=~de.indexOf("+"),be=~de.indexOf("*"),fe=$[oe]||"";if(!fe&&!be&&(de.indexOf("?")<0||ue)){mt=!1;break}if(vt[re]=decodeURIComponent(fe),ue||be){vt[re]=$.slice(oe).map(decodeURIComponent).join("/");break}}else if(k[oe]!==$[oe]){mt=!1;break}return(st.default===!0||mt!==!1)&&vt}function Nt($,k){return $.rank<k.rank?1:$.rank>k.rank?-1:$.index-k.index}function Rt($,k){return $.index=k,$.rank=(function(st){return st.props.default?0:Tt(st.props.path).map(Mt).join("")})($),$.props}function Tt($){return $.replace(/(^\/+|\/+$)/g,"").split("/")}function Mt($){return $.charAt(0)==":"?1+"*+?".indexOf($.charAt($.length-1))||4:5}var Lt={},Wt=[],Ft=[],It=null,Vt={url:jt()},Ot=q(Vt);function jt(){var $;return""+(($=It&&It.location?It.location:It&&It.getCurrentLocation?It.getCurrentLocation():typeof location<"u"?location:Lt).pathname||"")+($.search||"")}function qt($,k){return k===void 0&&(k=!1),typeof $!="string"&&$.url&&(k=$.replace,$=$.url),(function(st){for(var mt=Wt.length;mt--;)if(Wt[mt].canRoute(st))return!0;return!1})($)&&(function(st,mt){mt===void 0&&(mt="push"),It&&It[mt]?It[mt](st):typeof history<"u"&&history[mt+"State"]&&history[mt+"State"](null,null,st)})($,k?"replace":"push"),Bt($)}function Bt($){for(var k=!1,st=0;st<Wt.length;st++)Wt[st].routeTo($)&&(k=!0);return k}function Kt($){if($&&$.getAttribute){var k=$.getAttribute("href"),st=$.getAttribute("target");if(k&&k.match(/^\//g)&&(!st||st.match(/^_?self$/i)))return qt(k)}}function zt($){return $.stopImmediatePropagation&&$.stopImmediatePropagation(),$.stopPropagation&&$.stopPropagation(),$.preventDefault(),!1}function Gt($){if(!($.ctrlKey||$.metaKey||$.altKey||$.shiftKey||$.button)){var k=$.target;do if(k.localName==="a"&&k.getAttribute("href")){if(k.hasAttribute("data-native")||k.hasAttribute("native"))return;if(Kt(k))return zt($)}while(k=k.parentNode)}}var Jt=!1;function Qt($){$.history&&(It=$.history),this.state={url:$.url||jt()}}At(Qt.prototype=new C,{shouldComponentUpdate:function($){return $.static!==!0||$.url!==this.props.url||$.onChange!==this.props.onChange},canRoute:function($){var k=A(this.props.children);return this.g(k,$)!==void 0},routeTo:function($){this.setState({url:$});var k=this.canRoute($);return this.p||this.forceUpdate(),k},componentWillMount:function(){this.p=!0},componentDidMount:function(){var $=this;Jt||(Jt=!0,It||addEventListener("popstate",(function(){Bt(jt())})),addEventListener("click",Gt)),Wt.push(this),It&&(this.u=It.listen((function(k){var st=k.location||k;$.routeTo(""+(st.pathname||"")+(st.search||""))}))),this.p=!1},componentWillUnmount:function(){typeof this.u=="function"&&this.u(),Wt.splice(Wt.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function($,k){$=$.filter(Rt).sort(Nt);for(var st=0;st<$.length;st++){var mt=$[st],ct=Dt(k,mt.props.path,mt.props);if(ct)return[mt,ct]}},render:function($,k){var st,mt,ct=$.onChange,_=k.url,vt=this.c,te=this.g(A($.children),_);if(te&&(mt=j(te[0],At(At({url:_,matches:st=te[1]},st),{key:void 0,ref:void 0}))),_!==(vt&&vt.url)){At(Vt,vt=this.c={url:_,previous:vt&&vt.url,current:mt,path:mt?mt.props.path:null,matches:st}),vt.router=this,vt.active=mt?[mt]:[];for(var Xt=Ft.length;Xt--;)Ft[Xt]({});typeof ct=="function"&&ct(vt)}return y(Ot.Provider,{value:vt},mt)}});const StateContext=q(null),switchIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='652.000000pt'%20height='956.000000pt'%20viewBox='0%200%20652.000000%20956.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,956.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M1150%209540%20c-386%20-6%20-408%20-8%20-475%20-29%20-147%20-48%20-255%20-115%20-368%20-226%20-93%20-91%20-145%20-159%20-191%20-250%20-74%20-146%20-77%20-163%20-87%20-455%20-10%20-318%20-14%20-7639%20-4%20-7725%2025%20-214%20107%20-394%20245%20-539%20115%20-121%20227%20-192%20408%20-260%20l72%20-28%202418%20-1%20c2586%20-2%202582%20-2%202716%2047%20254%2092%20492%20346%20573%20611%2017%2058%2018%20211%2018%204095%20l0%204035%20-23%2075%20c-61%20193%20-204%20388%20-368%20501%20-76%2052%20-226%20118%20-294%20129%20-36%206%20-229%2015%20-430%2020%20-398%2010%20-3557%2010%20-4210%200z%20m4610%20-328%20c164%20-59%20291%20-175%20374%20-339%20l36%20-73%200%20-4016%200%20-4016%20-45%20-88%20c-25%20-48%20-70%20-115%20-101%20-148%20-64%20-71%20-175%20-148%20-242%20-168%20-103%20-32%20-400%20-35%20-2687%20-32%20-2180%203%20-2282%204%20-2335%2022%20-204%2068%20-363%20240%20-417%20452%20-17%2065%20-18%20275%20-18%203979%200%203785%201%203912%2019%203980%2024%2091%2084%20207%20140%20271%2055%2062%20182%20152%20244%20171%2027%208%20121%2018%20222%2022%2096%205%201203%208%202460%207%20l2285%20-1%2065%20-23z'/%3e%3cpath%20d='M1434%208128%20l-45%20-41%203%20-3291%20c3%20-3127%204%20-3293%2021%20-3323%209%20-18%2029%20-41%2044%20-50%2026%20-17%20125%20-18%201799%20-18%201918%200%201808%20-3%201834%2054%207%2014%2016%2067%2021%20116%205%2050%209%20789%209%201644%20l0%201554%20249%20981%20c358%201405%20401%201581%20401%201626%200%2051%204%2046%20-414%20468%20l-321%20322%20-1778%200%20-1777%200%20-46%20-42z%20m3636%20-425%20l165%20-168%20-185%20-6%20c-102%20-4%20-770%20-7%20-1485%20-8%20l-1300%20-1%20-145%20148%20c-80%2081%20-156%20159%20-170%20175%20l-23%2027%201489%200%201490%200%20164%20-167z%20m-3078%20-356%20l31%20-38%20-147%20-583%20c-81%20-320%20-153%20-602%20-160%20-626%20-12%20-39%20-13%20-23%20-19%20185%20-9%20291%20-9%20823%200%201123%20l6%20233%20129%20-128%20c71%20-70%20143%20-145%20160%20-166z%20m2900%20-136%20c278%20-3%20510%20-9%20513%20-13%2010%20-10%203%20-40%20-305%20-1260%20l-280%20-1107%200%20-1565%200%20-1566%20-1565%200%20-1565%200%200%201521%200%201520%20310%201226%20c171%20675%20313%201229%20316%201232%2014%2014%201788%2022%202576%2012z'/%3e%3cpath%20d='M3765%206820%20c-61%20-25%20-87%20-94%20-185%20-473%20-80%20-315%20-120%20-493%20-120%20-540%200%20-77%2078%20-141%20163%20-134%2069%206%20101%2040%20131%20141%2057%20190%20197%20746%20212%20843%205%2032%201%2053%20-19%2096%20-22%2048%20-30%2057%20-64%2066%20-44%2013%20-90%2013%20-118%201z'/%3e%3cpath%20d='M3098%203406%20c-104%20-37%20-216%20-134%20-264%20-227%20-24%20-47%20-28%20-71%20-35%20-184%20-19%20-311%20-7%20-500%2037%20-586%2040%20-80%20113%20-151%20201%20-195%20l76%20-39%20151%200%20151%200%2068%2034%20c81%2041%20167%20128%20215%20218%20l32%2061%200%20302%200%20302%20-41%2078%20c-65%20127%20-156%20201%20-284%20235%20-73%2019%20-255%2019%20-307%201z%20m262%20-311%20c58%20-30%2064%20-57%2068%20-301%204%20-219%204%20-222%20-19%20-253%20-65%20-88%20-230%20-95%20-286%20-13%20-16%2024%20-18%2055%20-21%20273%20l-3%20246%2038%2030%20c21%2017%2045%2033%2053%2036%2025%2011%20137%20-1%20170%20-18z'/%3e%3c/g%3e%3c/svg%3e",buttonIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M790%201280%20l0%20-420%2065%200%2065%200%200%20420%200%20420%20-65%200%20-65%200%200%20-420z'/%3e%3cpath%20d='M489%201612%20c-228%20-114%20-386%20-309%20-451%20-557%20-29%20-110%20-29%20-297%200%20-406%2081%20-301%20308%20-530%20607%20-610%20112%20-30%20307%20-30%20420%200%20294%2077%20529%20312%20606%20606%2029%20110%2030%20307%201%20416%20-67%20251%20-245%20462%20-477%20565%20l-55%2024%200%20-74%200%20-74%2072%20-42%20c280%20-167%20411%20-508%20313%20-817%20-35%20-110%20-88%20-196%20-175%20-283%20-87%20-87%20-172%20-139%20-285%20-177%20-70%20-23%20-96%20-27%20-210%20-27%20-114%200%20-140%204%20-210%2027%20-293%2097%20-495%20372%20-495%20673%200%2070%2025%20193%2055%20266%2054%20133%20182%20279%20299%20339%20l66%2034%200%2078%20c0%2042%20-1%2077%20-2%2077%20-2%200%20-37%20-18%20-79%20-38z'/%3e%3c/g%3e%3c/svg%3e",timerIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M818%201670%20c-24%20-15%20-31%20-77%20-23%20-221%208%20-141%2015%20-159%2064%20-159%2050%200%2060%2024%2063%20150%20l3%20115%2030%20-3%20c172%20-19%20366%20-132%20472%20-275%2094%20-129%20133%20-236%20140%20-392%206%20-142%20-12%20-230%20-73%20-355%20-82%20-165%20-236%20-296%20-419%20-357%20-71%20-24%20-95%20-27%20-215%20-27%20-118%200%20-145%203%20-212%2026%20-123%2041%20-204%2092%20-298%20187%20-68%2068%20-94%20103%20-127%20171%20-61%20125%20-76%20203%20-71%20352%206%20153%2036%20243%20122%20371%2064%2095%2068%20127%2021%20149%20-39%2017%20-68%202%20-113%20-59%20-94%20-127%20-150%20-285%20-159%20-449%20-23%20-399%20236%20-749%20632%20-855%20111%20-30%20297%20-30%20410%200%20449%20119%20716%20562%20610%201011%20-23%2095%20-105%20254%20-173%20336%20-111%20131%20-276%20234%20-442%20274%20-89%2021%20-213%2026%20-242%2010z'/%3e%3cpath%20d='M452%201258%20c-7%20-7%20-12%20-17%20-12%20-23%200%20-21%20330%20-469%20358%20-487%2043%20-28%20106%20-23%20143%2010%2043%2038%2052%20113%2020%20154%20-20%2025%20-454%20342%20-484%20354%20-7%202%20-18%20-1%20-25%20-8z'/%3e%3c/g%3e%3c/svg%3e",owIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='110.000000pt'%20height='52.000000pt'%20viewBox='0%200%20110.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M171%20500%20c-50%20-12%20-83%20-41%20-111%20-96%20-22%20-43%20-25%20-62%20-24%20-149%200%20-141%2027%20-199%20109%20-236%2073%20-33%20180%20-16%20227%2037%2067%2076%2074%20284%2013%20376%20-39%2059%20-133%2089%20-214%2068z%20m119%20-65%20c50%20-26%2065%20-67%2065%20-180%200%20-146%20-32%20-195%20-128%20-195%20-40%200%20-54%205%20-77%2028%20-16%2016%20-34%2049%20-40%2073%20-16%2056%20-7%20186%2014%20227%2030%2057%20105%2078%20166%2047z'/%3e%3cpath%20d='M482%20483%20c3%20-10%2029%20-120%2058%20-245%20l54%20-228%2038%200%20c43%200%2035%20-20%2089%20215%2017%2077%2035%20146%2038%20152%204%207%2026%20-73%2051%20-178%20l44%20-190%2039%203%2040%203%2058%20240%20c32%20132%2058%20241%2059%20243%200%202%20-15%202%20-32%200%20l-32%20-3%20-43%20-180%20c-23%20-99%20-44%20-187%20-46%20-195%20-2%20-8%20-25%2074%20-51%20183%20l-48%20198%20-36%20-3%20-36%20-3%20-45%20-194%20c-25%20-106%20-47%20-188%20-49%20-181%20-3%207%20-23%2095%20-46%20194%20l-42%20181%20-33%203%20c-28%203%20-33%201%20-29%20-15z'/%3e%3c/g%3e%3c/svg%3e",encoderIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='34.000000pt'%20height='52.000000pt'%20viewBox='0%200%2034.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M30%20255%20l0%20-245%20150%200%20150%200%200%2030%200%2030%20-115%200%20-115%200%200%2085%200%2085%2095%200%2095%200%200%2030%200%2030%20-95%200%20-95%200%200%2070%200%2070%20115%200%20115%200%200%2030%200%2030%20-150%200%20-150%200%200%20-245z'/%3e%3c/g%3e%3c/svg%3e",Icons={switchIcon:$=>Et`
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
    </svg>`},tipColors={green:"bg-green-100 text-green-900 ring-green-300",yellow:"bg-yellow-100 text-yellow-900 ring-yellow-300"};function Button({title:$,onclick:k,disabled:st,cls:mt,icon:ct,ref:_,colors:vt,hovercolor:te,disabledcolor:Xt}){const[ee,se]=ut(!1),oe=function(re){const de=k?k():null;de&&typeof de.catch=="function"&&(se(!0),de.catch(()=>!1).then(()=>se(!1)))};return vt||(vt="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400"),Et` <button
    type="button"
    class="inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${vt} ${mt}"
    ref=${_}
    onclick=${oe}
    disabled=${st||ee}
  >
    ${$}
    <${ee?Icons.refresh:ct} class="w-4 ${ee?"animate-spin":""}" />
  <//>`}function Login({loginFn:$,logoIcon:k,title:st,tipText:mt}){const[ct,_]=ut(""),[vt,te]=ut(""),Xt=function(ee){const oe={Authorization:"Basic "+btoa(ct+":"+vt)};return fetch("api/login",{headers:oe}).then($).finally(re=>te(""))};return Et`
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
              oninput=${ee=>_(ee.target.value)}
              value=${ct}
            />
          <//>

          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Password</label>
            <input
              type="password"
              autocomplete="current-password"
              required
              class="w-full bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all shadow-inner disabled:cursor-not-allowed disabled:opacity-50"
              oninput=${ee=>te(ee.target.value)}
              value=${vt}
              onkeydown=${ee=>ee.key==="Enter"&&Xt()}
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

        ${mt?Et`<div class="mt-6 text-center text-slate-500 text-xs font-medium px-4">${mt}<//>`:""}
      <//>
    <//>
  `}function Colored({icon:$,text:k,colors:st}){return st||(st="bg-slate-100 text-slate-900"),Et` <span class="inline-flex items-center gap-1.5 py-0.5">
    ${$&&Et`<${$} class="w-5 h-5" />`}
    <span
      class="inline-block font-medium rounded-md px-2 py-1 text-xs ring-1 ring-inset ${st}"
      >${k}<//
    >
  <//>`}function Stat({title:$,text:k,tipText:st,tipIcon:mt,tipColors:ct,colors:_}){return Et` <div
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
          <${Colored} text=${st} icon=${mt} colors=${ct} />
        <//>
      <//>
    <//>
  <//>`}const ruLangswitch=["","ID - уникальный числовой идентификатор выключателя. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","Device connection - Здесь указаны пины одного или нескольких устройств, с которыми взаимодействует данный выключатель.",'INFO - Укажите название данного выключателя для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение обработчика состояния на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек и соединений выключателя."],ruLangselect=["","ID - уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type(s) of pin(s) - Выберите режим работы данного пина из предложенных вариантов."],rulangbutton=["","ID - уникальный числовой идентификатор кнопки. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","sclick - Выполняемая команда при одинарном клике кнопки.","dclick - Выполняемая команда при двойном клике кнопки.","lpress - Выполняемая команда при удержании кнопки.",'INFO - Укажите название данной кнопки для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение функции кнопки на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек кнопки."],ruencoder=["","ID - уникальный числовой идентификатор энкодера. Присваивается автоматически.","Pin - Уникальный номер пина.","Encoder A (ID) - Основной пин энкодера A (DT).","Encoder B (ID) - Дополнительный пин энкодера B (CLK).","PWM connection - Подключение ШИМ для управления яркостью (диммер).","Dimmer value (0-100) - Текущее значение диммера от 0 до 100.","Duty on restore - Восстановление значения скважности (яркости) при включении контроллера.","INFO - Укажите название данного энкодера для быстрой навигации.","On/Off - Включение или отключение обработчика энкодера.","Action - Кнопка Edit позволяет зайти в меню настроек энкодера.","PWM Frequency - Частота ШИМ управляемого устройства (в герцах).","Resolution (steps) - Максимальное количество шагов от 0 до 100% для ШИМ устройства."],rulangtimers=["","No - Уникальный числовой идентификатор задачи (cron). Присваивается автоматически.","Cron - Сконфигурируйте расписание (cron) для выполнения задачи.","Script - Какое действие (скрипт) должно выполниться в указанное в таймере время.",'Info - Дайте название выбранному таймеру для быстрой навигации, например "Полив газона". Не более 30-ти символов!',"On/Off - Вкл/Откл выполнение данной задачи.","Action - Кнопка Edit позволяет зайти в меню настроек задачи."],rulangsettings=["","Login - Введите имя пользователя для входа в систему. Используется при авторизации в веб-интерфейсе.","Password - Введите пароль для входа в систему. Рекомендуется использовать надёжный пароль.","Time zone UTC - Выберите свой часовой пояс. Влияет на отображение времени и расчёт восхода/заката.","IP address - Введите статический IP-адрес устройства. После перезагрузки STM32 будет доступен по этому адресу. Формат: 192.168.1.100","Subnet mask - Введите маску подсети. Определяет диапазон адресов вашей локальной сети. Формат: 255.255.255.0","Default gateway - Введите IP-адрес шлюза по умолчанию (обычно адрес вашего роутера). Формат: 192.168.1.1","Token - Секретный ключ для авторизации API-запросов. Используется в URL командах управления устройством. Пример: /api/Token/switch?id=1&onoff=1","Host - Введите IP-адрес или доменное имя MQTT-брокера. Пример: 192.168.1.50 или broker.hivemq.com","Port - Укажите порт MQTT-брокера. Стандартный порт: 1883 (без шифрования), 8883 (с TLS).","Client - Уникальный идентификатор клиента MQTT. Каждое устройство должно иметь свой уникальный Client ID.","User - Имя пользователя для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","Password - Пароль для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","TX topic - Исходящий топик MQTT. На этот топик устройство публикует свои данные и события. Пример: Swarm","RX topic - Входящий топик MQTT. С этого топика устройство получает команды управления. Пример: Swarm","HTTPS domain - Доменное имя для HTTPS-соединения. Необходим действующий SSL-сертификат для этого домена. Пример: zagotovka.ddns.net",'Private Key - Закрытый ключ SSL-сертификата в формате PEM. Начинается с "-----BEGIN EC PRIVATE KEY-----". Хранится в зашифрованном виде.','Public Key - Публичный сертификат SSL в формате PEM. Начинается с "-----BEGIN CERTIFICATE-----". Используется для HTTPS-соединения.',"Longitude - Долгота вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 37.618 (Москва)","Latitude - Широта вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 55.751 (Москва)","Sunrise - Время восхода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на восходе.","Sunset - Время захода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на закате.","Day Length - Продолжительность светового дня, рассчитывается автоматически на основе координат и текущей даты.","Next full moon - Дата и время следующего полнолуния, рассчитывается автоматически.","Date - Дата для автономного (offline) режима в формате дд.мм.гг. Используется когда нет доступа к NTP-серверу. Пример: 15.03.25","Time - Время для автономного (offline) режима в формате чч:мм:сс. Используется когда нет доступа к NTP-серверу. Пример: 14:30:00","RX Z2M topic - Префикс топика Zigbee2MQTT. По умолчанию: zigbee2mqtt. Устройство подписывается на {prefix}/data/... и публикует команды в {prefix}/cmd/.... Пример: zigbee2mqtt"],ruLangsecurity=["","RXD Pin - Пин приема данных (RX).","TXD Pin - Пин передачи данных (TX).","Phone Number - Номер телефона для отправки SMS и звонков.","Info - Дополнительная информация для быстрой навигации.","OnOff - Включение или отключение модуля SIM800L.","Action - Кнопка Edit позволяет зайти в меню настроек."],ruLangsecuritypins=["","ID - уникальный числовой идентификатор пина. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type of sensor - Тип подключенного сенсора (PIR, Normal open, Normal close).","Action - Действие, выполняемое при срабатывании сенсора.","Send SMS - Отправлять ли SMS при срабатывании сенсора (YES/NO).","INFO - Дополнительная информация для быстрой навигации.","On/Off - Включение или отключение охранного пина.","Edit Pin - Редактирование настроек охранного пина."],rulange1Wire=["","ID - Уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового пина, к которому подключена шина 1-Wire.","Selected sensor - Здесь вы выбираете подключённый к пину датчик температуры: DS18B20 или DHT22.","Count of sensors - Количество найденных 1-Wire температурных датчиков на данном пине.","On/Off - Функция включения или отключения опроса подключенных датчиков на данной шине.","Actions - Кнопка Edit для привязки конкретного датчика к этому соединению."],rulangpid=["","No - Уникальный числовой идентификатор, присваивается автоматически.",'PWM Pin - Выбранный вами PWM пин на странице "Select pin".',"Sel. sensor - Укажите один из двух типов (DS18B20/DHT22) температурного датчика.",'Dev. ser. number - Серийный номер выбранного DS18B20 датчика (со страницы "OneWire pin").',"Presets - Выберите пресет, максимально соответствующий нужным температурным и временным параметрам.","T set. - Задайте целевую температуру, которую должен поддерживать PID-контроллер.","T cur. - Текущая температура выбранного датчика.","Duty - Текущее значение PWM.",'Info - Название PID-контроллера для быстрой навигации (например: "Тёплый пол в детской").',"On/Off - Вкл/Откл данного PID-контроллера.","Action - Кнопка для входа в меню настроек PID-контроллера.","Auto tune - Автоматический подбор коэффициентов PID."],enLangswitch=["","ID - A unique numerical identifier of the switch. Assigned automatically","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","Device connection - Here will appear one or more devices/relays of pin(s) with which this switch interacts.",'INFO - Give a name of this switch for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the switch state handler on this pin.","Action - The Edit button allows you to access the switch settings menu."],enLangselect=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type(s) of pin(s) - Select the operating mode of this pin from the provided options."],enlangbutton=["","ID - A unique numerical identifier of the button. Assigned automatically.","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","sclick - Command to execute when the button is pressed once.","dclick - Command to execute when the button is pressed twice.","lpress - Command to execute when the button is long pressed.",'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the button function on this pin.","Action - The Edit button allows you to access the button settings menu."],enencoder=["","ID - A unique numerical identifier of the encoder. Assigned automatically.","PIN - The unique number of the pin.","Encoder A (ID) - Main pin of encoder A (DT).","Encoder B (ID) - Additional pin of encoder B (CLK).","PWM connection - PWM connection for brightness control (dimmer).","Dimmer value (0-100) - Current dimmer value from 0 to 100.","Duty on restore - Value of duty cycle (brightness) to restore when the controller is turned on.","INFO - Give a name to this encoder for quick navigation.","On/Off - Enable or disable the encoder handler.","Action - The Edit button allows you to access the encoder settings menu.","PWM Frequency - PWM frequency of the controlled device (in Hertz).","Resolution (steps) - Maximum number of steps from 0 to 100% for the PWM device."],enlangtimers=["","No - A unique numerical identifier of the task (cron). Assigned automatically.","Cron - Configure a schedule (cron) to perform the action.","Script - What action (script) must be performed at the time specified in the timer.",'Info - Give a name to the selected timer for quick navigation, e.g."Lawn Watering", "Backyard Light", etc. No more than 30 characters!',"On/Off - Enable or disable the execution of this task.","Action - The Edit button allows you to access the task settings menu."],enlangsettings=["","Login - Enter the username for logging into the system. Used for web interface authentication.","Password - Enter your password for the system. It is recommended to use a strong password.","Time zone UTC - Select your time zone. Affects time display and sunrise/sunset calculations.","IP address - Enter a static IP address for the device. After reboot, STM32 will be available at this address. Format: 192.168.1.100","Subnet mask - Enter the subnet mask. Defines the range of addresses in your local network. Format: 255.255.255.0","Default gateway - Enter the default gateway IP address (usually your router address). Format: 192.168.1.1","Token - Secret key for API request authorization. Used in device control URL commands. Example: /api/Token/switch?id=1&onoff=1","Host - Enter the IP address or domain name of the MQTT broker. Example: 192.168.1.50 or broker.hivemq.com","Port - Specify the MQTT broker port. Standard port: 1883 (no encryption), 8883 (with TLS).","Client - Unique MQTT client identifier. Each device must have its own unique Client ID.","User - Username for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","Password - Password for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","TX topic - Outgoing MQTT topic. The device publishes its data and events to this topic. Example: Swarm","RX topic - Incoming MQTT topic. The device receives control commands from this topic. Example: Swarm","HTTPS domain - Domain name for HTTPS connection. A valid SSL certificate for this domain is required. Example: zagotovka.ddns.net",'Private Key - SSL certificate private key in PEM format. Starts with "-----BEGIN EC PRIVATE KEY-----". Stored in encrypted form.','Public Key - SSL public certificate in PEM format. Starts with "-----BEGIN CERTIFICATE-----". Used for HTTPS connection.',"Longitude - Longitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 37.618 (Moscow)","Latitude - Latitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 55.751 (Moscow)","Sunrise - Sunrise time is calculated automatically based on your coordinates. The slider enables/disables the action at sunrise.","Sunset - Sunset time is calculated automatically based on your coordinates. The slider enables/disables the action at sunset.","Day Length - Duration of daylight, calculated automatically based on coordinates and current date.","Next full moon - Date and time of the next full moon, calculated automatically.","Date - Date for offline mode in dd.mm.yy format. Used when there is no access to the NTP server. Example: 15.03.25","Time - Time for offline mode in hh:mm:ss format. Used when there is no access to the NTP server. Example: 14:30:00","RX Z2M topic - Zigbee2MQTT topic prefix. Default: zigbee2mqtt. The device subscribes to {prefix}/data/... and publishes commands to {prefix}/cmd/.... Example: zigbee2mqtt"],enLangsecurity=["","RXD Pin - Receive Data Pin (RX).","TXD Pin - Transmit Data Pin (TX).","Phone Number - Phone number for SMS notifications and calls.","Info - Additional information for quick navigation.","OnOff - Enable or disable the SIM800L module.","Action - The Edit button allows you to access the settings menu."],enLangsecuritypins=["","ID - A unique numerical identifier of the pin. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type of sensor - Type of connected sensor (PIR, Normal open, Normal close).","Action - Action to perform when the sensor is triggered.","Send SMS - Whether to send SMS when the sensor is triggered (YES/NO).","INFO - Additional information for quick navigation.","On/Off - Enable or disable the security pin.","Edit Pin - The Edit button allows you to access the security pin settings."],enlange1Wire=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital pin to which the 1-Wire bus is connected.","Selected sensor - Here you select the temperature sensor connected to the chosen pin: DS18B20 or DHT22.","Count of sensors - Number of 1-Wire temperature sensors on this pin.","On/Off - The function of enabling or disabling polling of connected sensors on this bus.","Actions - The Edit button to bind a specific sensor to this connection."],enlangpid=["","No - Unique numeric identifier, assigned automatically.",'PWM Pin - The PWM pin you selected on the "Select pin" page.',"Sel. sensor - Specify one of the two types (DS18B20/DHT22) of temperature sensors.",'Dev. ser. number - Serial number of the selected DS18B20 sensor (from the "OneWire pin" page).',"Presets - Select the preset that best matches the desired temperature and timing parameters.","T set. - Set the target temperature that the PID controller should maintain.","T cur. - Current temperature of the selected sensor.","Duty - Current PWM value.",'Info - Name of this PID controller for quick navigation (e.g., "Kids room warm floor").',"On/Off - Enable/Disable this PID controller.","Action - Button to enter the PID controller settings menu.","Auto tune - Automatic tuning of PID coefficients."];function initGlobalTooltip$8(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(ct){clearTimeout(k),$.innerHTML=ct.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,vt=$.offsetHeight,te=window.innerWidth,Xt=ct.getBoundingClientRect();let ee=Xt.left+Xt.width/2-_/2;ee=Math.max(8,Math.min(ee,te-_-8));let se=Xt.top-vt-8;se<8&&(se=Xt.bottom+8),$.style.left=ee+"px",$.style.top=se+"px",$.style.opacity="1"})}function mt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",ct=>{const _=ct.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",ct=>{ct.target.closest("[data-tip]")&&mt()})}const RadioOption=({id:$,value:k,label:st,disabled:mt=!1,onChange:ct,checked:_})=>Et`
  <div class="relative">
    <input
      id="${$}_${k}"
      class="sr-only peer"
      type="radio"
      name="topin_${$}"
      value="${k}"
      checked=${_}
      onChange=${ct}
      disabled=${mt}
      aria-label="${st}"
    />
    <label
      for="${$}_${k}"
      class="cursor-pointer px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300
             ${mt?"text-gray-400 cursor-not-allowed opacity-60":"text-slate-700 hover:bg-black/5"}
             peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-cyan-500 peer-checked:text-white peer-checked:shadow-sm"
    >
      ${st}
    </label>
  </div>
`,Th=({title:$,tooltipIndex:k,center:st,getTooltipText:mt})=>Et`
  <th
    class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
    style=${st?"text-align: center":""}
    data-tip=${mt("langselect",k)}
  >
    ${$}
  </th>
`,ArraySelect=({d:$,selectedValues:k,isRowDisabled:st,handleRadioChange:mt,handleFieldChange:ct})=>{const _=$.id<89,vt=$.id>=89,te=k[`topin_${$.id}`];return Et`
  <tr class="${st($.id)?"bg-red-200/50 opacity-50 pointer-events-none":$.id%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
    <td class="px-6 py-2 text-sm text-slate-800">${$.id}</td>
    <td class="px-6 py-2 text-sm text-slate-800 font-medium">${$.pins}</td>
    <td class="px-2 py-2">
      <div class="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
        ${_?Et`
          <${RadioOption} id=${$.id} value="0"  label="NONE"     checked=${te==="0"}  onChange=${mt} />
          <${RadioOption} id=${$.id} value="3"  label="SWITCH"   checked=${te==="3"}  onChange=${mt} />
          <${RadioOption} id=${$.id} value="1"  label="BUTTON"   checked=${te==="1"}  onChange=${mt} />
          <${RadioOption} id=${$.id} value="2"  label="DEVICE"   checked=${te==="2"}  onChange=${mt} />
          <${RadioOption} id=${$.id} value="4"  label="1-WIRE"   checked=${te==="4"}  onChange=${mt} />
          <${RadioOption} id=${$.id} value="5"  label="PWM"      disabled=${$.pwm==0} checked=${te==="5"}  onChange=${mt} />
          <${RadioOption} id=${$.id} value="8"  label="Enc.OutA" checked=${te==="8"}  onChange=${mt} />
          <${RadioOption} id=${$.id} value="9"  label="Enc.OutB" checked=${te==="9"}  onChange=${mt} />
          <${RadioOption} id=${$.id} value="10" label="Security" disabled=${$.monitoring==0} checked=${te==="10"} onChange=${mt} />
        `:Et`
          <${RadioOption} id=${$.id} value="0"  label="NONE"     checked=${te==="0"}  onChange=${mt} />
          <${RadioOption} id=${$.id} value="11" label="Zigbee"   checked=${te==="11"} onChange=${mt} />
        `}
      </div>
    </td>
  </tr>
  ${vt&&te==="11"&&Et`
  <tr class="bg-slate-50/80">
    <td colspan="3" class="px-6 py-3">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col sm:flex-row gap-2">
          <input type="text" placeholder="IEEE Address (e.g. 588e81fffe36a343)"
            value=${k[`zbee_ieee_${$.id}`]||""}
            onInput=${Xt=>{let ee=Xt.target.value.replace(/^0x/i,"").replace(/[^0-9a-fA-F]/g,"").slice(0,16);ct($.id,"zbee_ieee",ee)}}
            class="text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-400 flex-1" />
          <input type="text" placeholder="Info (e.g. Lamp Kuhnya)"
            maxlength="29"
            value=${k[`zbee_label_${$.id}`]||""}
            onInput=${Xt=>ct($.id,"zbee_label",Xt.target.value)}
            class="text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-400 flex-1" />
        </div>
      </div>
    </td>
  </tr>
  `}
`};function TabSelect({}){const[$,k]=ut(null),[st,mt]=ut({}),[ct,_]=ut(null),[vt,te]=ut(!1),[Xt,ee]=ut(3),[se,oe]=ut(!1),[re,de]=ut("ru"),[ue,be]=ut({physical:!1,zigbee:!1}),fe=at(0),pe=at(null),ge=at({}),he=ce=>({topin:ce.topin.toString(),zbee_ieee:ce.zbee_ieee||"",zbee_endpoint:ce.zbee_endpoint||1,clusters:ce.clusters||[6],zbee_label:ce.zbee_label||""});lt(()=>{initGlobalTooltip$8()},[]);const Te=ce=>{oe(ce),fe.current=Date.now()},$e=ce=>se&&(ce===1||ce===35),ke=30,Se=ce=>fetch(`/api/select/get?offset=${ce}&limit=${ke}`,{cache:"no-store"}).then(dt=>dt.json()),Pe=()=>Se(0).then(async ce=>{const dt=ce.total||ce.data.length,pt=[...ce.data];let Zt=ce.data.length;for(;Zt<dt;){const $t=await Se(Zt);if(pt.push(...$t.data),Zt+=$t.data.length,$t.data.length===0)break}return{...ce,data:pt,total:pt.length}}).then(ce=>{const dt=ce.data||ce;k(dt),oe(ce.sim800l===1),ce.lang&&de(ce.lang);const pt={};dt.forEach($t=>{pt[`topin_${$t.id}`]=$t.topin.toString(),$t.zbee_ieee!==void 0&&(pt[`zbee_ieee_${$t.id}`]=$t.zbee_ieee),$t.zbee_endpoint!==void 0&&(pt[`zbee_endpoint_${$t.id}`]=$t.zbee_endpoint),$t.zbee_label!==void 0&&(pt[`zbee_label_${$t.id}`]=$t.zbee_label)}),mt(pt);const Zt={};dt.forEach($t=>{Zt[$t.id]=he($t)}),ge.current=Zt});lt(()=>{let ce=!0;return registerPoll("select",`/api/select/get?offset=0&limit=${ke}`,function(dt){if(ce&&!(Date.now()-fe.current<3e3)&&dt!=null){dt.total||dt.data.length;const pt=JSON.stringify(dt.data);pt!==pe.current&&(pe.current=pt,Pe())}},{immediate:!0}),function(){ce=!1,unregisterPoll("select")}},[]),lt(()=>{let ce;return vt&&Xt>0?ce=setTimeout(()=>{ee(Xt-1)},1e3):Xt===0&&(te(!1),_(null)),()=>clearTimeout(ce)},[vt,Xt]);const xe=async ce=>{ce.preventDefault();const dt=[];if($.forEach(pt=>{const Zt=ge.current[pt.id]||{};if(pt.id<89){const $t=st[`topin_${pt.id}`],Yt=$t!==void 0?$t:pt.topin.toString();Yt!==Zt.topin&&dt.push({id:pt.id,topin:parseInt(Yt)})}else{const $t=st[`topin_${pt.id}`]!==void 0?st[`topin_${pt.id}`]:pt.topin.toString(),Yt={zbee_ieee:st[`zbee_ieee_${pt.id}`]||"",zbee_label:st[`zbee_label_${pt.id}`]||""};($t!==Zt.topin||Yt.zbee_ieee!==Zt.zbee_ieee||Yt.zbee_label!==Zt.zbee_label)&&($t==="0"?dt.push({id:pt.id,topin:0,zbee_ieee:"",zbee_endpoint:1,clusters:[6],zbee_label:""}):dt.push({id:pt.id,zbee_ieee:Yt.zbee_ieee,zbee_endpoint:1,clusters:pt.clusters||[6],zbee_label:Yt.zbee_label}))}}),te(!0),ee(3),dt.length===0){_("success");return}_("submitting");try{const Zt={lang:re,sim800l:se?1:0};for(let Yt=0;Yt<dt.length;Yt+=20){const ae=dt.slice(Yt,Yt+20);if(!(await fetch("/api/select/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...Zt,data:ae})})).ok)throw new Error("Network response was not ok")}_("success");const $t={};dt.forEach(Yt=>{Yt.topin!==void 0&&($t[`topin_${Yt.id}`]=Yt.topin.toString()),Yt.zbee_ieee!==void 0&&($t[`zbee_ieee_${Yt.id}`]=Yt.zbee_ieee),Yt.zbee_label!==void 0&&($t[`zbee_label_${Yt.id}`]=Yt.zbee_label)}),mt(Yt=>({...Yt,...$t})),fe.current=0,Pe()}catch(pt){_("error"),console.error("Error:",pt)}},Ee=ce=>{const{name:dt,value:pt}=ce.target;mt(Zt=>({...Zt,[dt]:pt})),fe.current=Date.now()},Me=(ce,dt,pt)=>{mt(Zt=>({...Zt,[`${dt}_${ce}`]:pt})),fe.current=Date.now()};if(!$)return"";const ve=ce=>{be(dt=>({...dt,[ce]:!dt[ce]}))},le=(ce,dt)=>{const pt={langselect:re==="ru"?ruLangselect:enLangselect},$t=(pt[ce]&&pt[ce][dt]?pt[ce][dt]:"").split(" "),Yt=[];for(let ae=0;ae<$t.length;ae+=15)Yt.push($t.slice(ae,ae+15).join(" "));return Yt.join("<br>")};return Et`
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
                    checked=${se}
                    onChange=${ce=>Te(ce.target.checked)}
                  />
                  <div class="w-[42px] h-[22px] bg-slate-200/80 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300/50 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-400 peer-checked:to-cyan-500 shadow-inner"></div>
                </label>
              </div>
            </div>

            ${ct==="success"&&Et`
              <div class="mb-6 bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
                <strong class="font-bold">Успех! </strong>
                <span class="block sm:inline">Данные успешно сохранены. Идет запись на USB флешку. Кнопка станет активной через ${Xt} секунд.</span>
              </div>
            `}
            ${ct==="error"&&Et`
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
                      <${Th} title="ID" tooltipIndex=${1} getTooltipText=${le} />
                      <${Th} title="Pin" tooltipIndex=${2} getTooltipText=${le} />
                      <${Th} title="Type(s) of pin(s)" tooltipIndex=${3} center=${!0} getTooltipText=${le} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${$&&Et`
                      <!-- Physical pins section -->
                      <tr class="bg-gradient-to-r from-slate-100 to-slate-50 cursor-pointer hover:from-slate-200 hover:to-slate-100 transition-colors" onclick=${()=>ve("physical")}>
                        <td colspan="3" class="px-6 py-3 text-lg font-bold text-slate-700">
                          <span class="mr-2 text-slate-500">${ue.physical?"▼":"▶"}</span>
                          ${re==="ru"?"Физические пины STM32":"Physical pins of STM32"}
                          <span class="ml-2 text-sm font-normal text-slate-500">(${$.filter(ce=>ce.id<89).length})</span>
                        </td>
                      </tr>
                      ${ue.physical&&$.filter(ce=>ce.id<89).map(ce=>Et`<${ArraySelect} d=${ce} selectedValues=${st} isRowDisabled=${$e} handleRadioChange=${Ee} handleFieldChange=${Me} />`)}
                      
                      <!-- Zigbee virtual pins section -->
                      <tr class="bg-gradient-to-r from-cyan-100 to-cyan-50 cursor-pointer hover:from-cyan-200 hover:to-cyan-100 transition-colors" onclick=${()=>ve("zigbee")}>
                        <td colspan="3" class="px-6 py-3 text-lg font-bold text-cyan-700">
                          <span class="mr-2 text-cyan-500">${ue.zigbee?"▼":"▶"}</span>
                          ${re==="ru"?"Виртуальные пины Zigbee":"Virtual pins of Zigbee"}
                          <span class="ml-2 text-sm font-normal text-cyan-500">(${$.filter(ce=>ce.id>=89).length})</span>
                        </td>
                      </tr>
                      ${ue.zigbee&&$.filter(ce=>ce.id>=89).map(ce=>Et`<${ArraySelect} d=${ce} selectedValues=${st} isRowDisabled=${$e} handleRadioChange=${Ee} handleFieldChange=${Me} />`)}
                    `}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${vt?"bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none":"bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"}`}
                disabled=${vt}
              >
                ${vt?`Please wait ${Xt} sec.`:"Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `}function ModalSwitch({modalType:$,page:k,hideModal:st,closeOnOverlayClick:mt=!0,title:ct,selectedSwitch:_,onSwitchChange:vt,connectionOptions:te,SliderComponent:Xt=MyPolzunok}){const[ee,se]=ut((_==null?void 0:_.info)||""),[oe,re]=ut((_==null?void 0:_.onoff)||0),[de,ue]=ut((_==null?void 0:_.ptype)||0),[be,fe]=ut((_==null?void 0:_.setrpins)||""),[pe,ge]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(le=>{if(!le.ok)throw new Error(`HTTP error! status: ${le.status}`);return le.json()}).then(le=>{if(!le||!le.data||!Array.isArray(le.data)){console.error("Invalid data format:",le),ge([]);return}const ce=le.data.filter(dt=>dt.topin===2||dt.topin===11);ge(ce)}).catch(le=>{console.error("Error fetching pin config:",le),ge([])})},[]);const he=le=>{le.preventDefault();const ce=new FormData(le.target),dt=Object.fromEntries(ce);if(dt.id=_.id,dt.pins=_.pins,$==="edit")dt.onoff=oe;else if($==="connection"){const pt=pe.find(Zt=>Zt.pins===dt.setrpins);pt&&(dt.pinact={..._.pinact,[pt.id]:pt.pins})}fetch("/api/switch/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(dt)}).then(pt=>pt.json()).then(pt=>{console.log("Success:",pt),vt({..._,...dt}),st(),window.location.href="/#/switch"}).catch(pt=>{console.error("Error:",pt)})},Te=le=>{fe(le.target.value)},$e=le=>{ue(parseInt(le.target.value))},ke=le=>{se(le.target.value)},Se=le=>{re(le)},Pe=le=>{mt&&le.target===le.currentTarget&&st()},xe=()=>{ue(0),se(""),re(0)},Me=Et`
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
            <h2 class="text-xl font-bold">${ct}</h2>
            <button
              onclick=${st}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          ${(()=>{if(k==="TabSwitch"){if($==="connection")return Et`
          <form onsubmit=${he}>
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
                        value=${pe.some(le=>le.pins===be)?be:""}
                        onchange=${Te}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select a connection</option>
                        ${pe.map(le=>Et`
                            <option value=${le.pins}>
                              ${le.pins} (ID: ${le.id})
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
          <form onsubmit=${he}>
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
                        value=${de}
                        onchange=${$e}
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
                        value=${ee}
                        oninput=${ke}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${Xt}
                        value=${oe}
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
  `,ve=at(null);return lt(()=>{const le=document.createElement("div");return le.id="modal-portal",document.body.appendChild(le),ve.current=le,()=>{O(null,le),document.body.removeChild(le)}},[]),lt(()=>{ve.current&&O(Me,ve.current)}),null}function initGlobalTooltip$7(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(ct){clearTimeout(k),$.innerHTML=ct.dataset.tip,$.style.display="block";const _=ct.getBoundingClientRect();$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const vt=$.offsetWidth,te=$.offsetHeight,Xt=window.innerWidth;let ee=_.left+_.width/2-vt/2;ee=Math.max(8,Math.min(ee,Xt-vt-8));let se=_.top-te-8;se<8&&(se=_.bottom+8),$.style.left=ee+"px",$.style.top=se+"px",$.style.opacity="1"})}function mt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",ct=>{const _=ct.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",ct=>{ct.target.closest("[data-tip]")&&mt()})}function TabSwitch({}){const[$,k]=ut(null),[st,mt]=ut(null),[ct,_]=ut(!1),[vt,te]=ut(null),[Xt,ee]=ut(null),[se,oe]=ut(!1),[re,de]=ut("ru"),[ue,be]=ut(null),[fe,pe]=ut([]),[ge,he]=ut(""),[Te,$e]=ut(!1),ke=at(!1);lt(()=>{initGlobalTooltip$7()},[]);const Se=()=>Promise.all([fetch("/api/switch/get").then($t=>$t.json()),fetch("/api/pintopin/get").then($t=>$t.json())]).then(([$t,Yt])=>{de($t.lang),be($t.switches),k($t),pe(Yt),he(`Pintopin data: ${JSON.stringify(Yt,null,2)}

Switch data: ${JSON.stringify($t.switches,null,2)}`),console.log("Pintopin data:",Yt),console.log("Switch data:",$t.switches)}).catch($t=>{console.error("Error fetching data:",$t),he(`Error fetching data: ${$t.message}`)});lt(()=>{let $t=!0;return registerPoll("switches","/api/state/switch",function(Yt){$t&&(ke.current||Yt!=null&&(Yt.switches&&(be(Yt.switches),de(Yt.lang)),Yt.pintopin&&pe(Yt.pintopin)))},{immediate:!0}),function(){$t=!1,unregisterPoll("switches")}},[]);const Pe=$t=>{const Yt=new Map,ae=ue.find(ne=>ne.id===$t);return ae&&ae.pinact&&Object.entries(ae.pinact).forEach(([ne,we])=>{Yt.set(ne,{pin:ne,relayId:we})}),fe.forEach(ne=>{if(ne.idin===$t){const we=`${ne.pins}(${ne.idout})`;Yt.has(we)||Yt.set(we,{pin:ne.pins,relayId:ne.idout})}}),Array.from(Yt.values())},xe=()=>({langswitch:re==="ru"?ruLangswitch:enLangswitch}),Ee=($t,Yt)=>{const ae=xe(),we=(ae[$t]&&ae[$t][Yt]||"").split(" "),Ie=[];let De="";for(let Ce=0;Ce<we.length;Ce++){const _e=we[Ce];De.length+_e.length+1<=200?De+=(De.length>0?" ":"")+_e:(De.length>0&&Ie.push(De),De=_e)}return De.length>0&&Ie.push(De),Ie.join("<br>")},Me=($t,Yt)=>{console.log("Удаление соединения:",$t,Yt);const[ae,ne]=Yt.split("("),we=ne?parseInt(ne):null;fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:$t,pin:ae.trim(),idout:we})}).then(Ie=>Ie.json()).then(Ie=>{mt(Ie),be(De=>De.map(Ce=>{if(Ce.id===$t){const _e={...Ce.pinact};return delete _e[ae.trim()],{...Ce,pinact:_e}}return Ce})),pe(De=>De.filter(Ce=>!(Ce.idin===$t&&Ce.pins===ae.trim()&&(we===null||Ce.idout===we))))}).then(()=>{console.log("Соединение удалено успешно"),Se()}).catch(Ie=>{console.error("Ошибка при удалении соединения:",Ie)})},ve=($t,Yt)=>{te($t),ee(Yt),_(!0)},le=()=>{_(!1),te(null),ee(null)},ce=$t=>{console.log("handleSwitchChange:",$t),be(Yt=>Yt.map(ae=>ae.id===$t.id?$t:ae)),ke.current=!0,fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:$t.id,onoff:$t.onoff})}).then(Yt=>Yt.json()).then(Yt=>{console.log("Response from /api/onoff/set:",Yt)}).catch(Yt=>{console.error("Error calling /api/onoff/set:",Yt)}).finally(()=>{setTimeout(()=>{ke.current=!1},1500)}),le()},dt={ru:Et`
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
    `},pt=$t=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Ee("langswitch",$t.tooltipIndex)}
    >
      ${$t.title}
    </th>
  `,Zt=({d:$t,index:Yt})=>{const ae=Pe($t.id);return Et`
      <tr class="${Yt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${$t.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${$t.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][$t.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono">
          ${ae.map(({pin:ne,relayId:we})=>Et`
              <span class="mr-2 inline-flex items-center">
                ${ne}${we!==void 0?`(${we})`:""}
                <button
                  onClick=${Ie=>{Ie.preventDefault(),Me($t.id,`${ne}(${we})`)}}
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
            onChange=${ne=>ce({...$t,onoff:ne})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>ve("connection",$t)}
            class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
          >
            Connection
          </button>
          <span class="text-slate-300">|</span>
          <button
            onClick=${()=>ve("edit",$t)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors ml-2"
          >
            Edit
          </button>
        </td>
      </tr>
    `};return ue?Et`
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
                    ${ue.map(($t,Yt)=>Et`<${Zt} d=${$t} index=${Yt} key=${$t.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>oe(!se)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${se?"Hide Help":"Show Help"}
              </button>
            </div>

            ${se&&Et`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${dt[re]}
                </div>
              `}
          </div>
        </div>

        ${ct&&Et`
            <${ModalSwitch}
              modalType=${vt}
              page="TabSwitch"
              hideModal=${le}
              title=${vt==="connection"?"Edit Connection":"Edit switch"}
              selectedSwitch=${Xt}
              onSwitchChange=${ce}
            />
          `}
      </div>
    </div>
  `:""}const ModalButton=({modalType,page,hideModal,closeOnOverlayClick=!0,title,selectedButton,onButtonChange,SliderComponent=MyPolzunok})=>{const[buttonInfo,setButtonInfo]=ut((selectedButton==null?void 0:selectedButton.info)||""),[onoff,setOnOff]=ut((selectedButton==null?void 0:selectedButton.onoff)||0),[ptype,setPtype]=ut((selectedButton==null?void 0:selectedButton.ptype)||0),[sclick,setSclick]=ut((selectedButton==null?void 0:selectedButton.sclick)||(selectedButton==null?void 0:selectedButton.action)||""),[dclick,setDclick]=ut((selectedButton==null?void 0:selectedButton.dclick)||""),[lpress,setLpress]=ut((selectedButton==null?void 0:selectedButton.lpress)||""),[pinOptions,setPinOptions]=ut([]),[errors,setErrors]=ut({sclick:null,dclick:null,lpress:null}),[submitError,setSubmitError]=ut(null),doubleClickLongPressRegex=/^(None|\d{1,4}(\.\d)?:[012])(,\d{1,4}(\.\d)?:[012])*$/,validateInput=$=>!$||$.trim()===""||$.toLowerCase()==="none"||doubleClickLongPressRegex.test($)?null:"Format: None, 6:1, 93.1:2 (pin:value, 0=OFF 1=ON 2=TOGGLE)",handleInputChange=($,k)=>{const st=validateInput(k);switch(setErrors(mt=>({...mt,[$]:st})),$){case"sclick":setSclick(k);break;case"dclick":setDclick(k);break;case"lpress":setLpress(k);break}};lt(()=>{fetch("/api/select/get").then($=>$.json()).then($=>{const k=$.data||$;Array.isArray(k)?setPinOptions(k.filter(st=>st.topin===2||st.topin===11)):setPinOptions([])}).catch($=>{console.error("Error fetching pin config:",$),setPinOptions([])})},[]);const handleSubmit=$=>{if($.preventDefault(),Object.values(errors).some(st=>st!==null)){setSubmitError("Please correct the errors before submitting.");return}const k={...selectedButton,info:buttonInfo,onoff,ptype,sclick:sclick||"None",dclick:dclick||"None",lpress:lpress||"None"};fetch("/api/button/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(k)}).then(st=>st.json()).then(st=>{onButtonChange(k),hideModal()}).catch(st=>{console.error("Error:",st),setSubmitError("Failed to save changes. Please try again.")})},handleResetPin=()=>{setPtype(0),setSclick(""),setDclick(""),setLpress(""),setButtonInfo(""),setOnOff(0),setErrors({sclick:null,dclick:null,lpress:null})},renderConnectionModal=()=>{const $=selectedButton.display_id||selectedButton.id;return Et`
    <form onSubmit=${handleSubmit}>
      <div class="modal-body">
        <table class="table-auto w-full">
          <tbody>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">ID</td>
              <td class="p-2">${$}</td>
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
                  value=${pinOptions.some(k=>k.pins===(selectedButton==null?void 0:selectedButton.setrpins)||k.id.toString()===(selectedButton==null?void 0:selectedButton.setrpins)?selectedButton==null?void 0:selectedButton.setrpins:"")}
                  onChange=${k=>onButtonChange({...selectedButton,setrpins:k.target.value})}
                  class="border rounded p-2 w-full"
                >
                  <option value="">Select a connection</option>
                  ${pinOptions.map(k=>Et`
                      <option value=${k.topin===11?k.id:k.pins}>
                        ${k.pins||k.zbee_label||"Pin "+k.id} (ID: ${k.id})
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
  `},renderEditModal=()=>{const isZigbee=selectedButton.is_zigbee,displayId=selectedButton.display_id||selectedButton.id;return Et`
    <form onSubmit=${handleSubmit}>
      <div class="modal-body">
        <table class="table-auto w-full">
          <tbody>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">ID</td>
              <td class="p-2">${displayId}</td>
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
                  value=${isZigbee?0:ptype}
                  onChange=${$=>setPtype(parseInt($.target.value))}
                  class="border rounded p-2 w-full ${isZigbee?"bg-gray-100 text-gray-400 cursor-not-allowed":""}"
                  disabled=${isZigbee}
                >
                  <option value="0">None</option>
                  ${!isZigbee&&Et`
                    <option value="1">GPIO_PULLUP</option>
                    <option value="2">GPIO_PULLDOWN</option>
                  `}
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
                      placeholder="None, 6:1, 93.1:2"
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
  `},modalContent=Et`
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
  `,portalRef=at(null);return lt(()=>{const $=document.createElement("div");return $.id="modal-portal",document.body.appendChild($),portalRef.current=$,()=>{O(null,$),document.body.removeChild($)}},[]),lt(()=>{portalRef.current&&O(modalContent,portalRef.current)}),null};function initGlobalTooltip$6(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(ct){clearTimeout(k),$.innerHTML=ct.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,vt=$.offsetHeight,te=window.innerWidth,Xt=ct.getBoundingClientRect();let ee=Xt.left+Xt.width/2-_/2;ee=Math.max(8,Math.min(ee,te-_-8));let se=Xt.top-vt-8;se<8&&(se=Xt.bottom+8),$.style.left=ee+"px",$.style.top=se+"px",$.style.opacity="1"})}function mt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",ct=>{const _=ct.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",ct=>{ct.target.closest("[data-tip]")&&mt()})}const TabButton=()=>{const[$,k]=ut(null),[st,mt]=ut([]),[ct,_]=ut(null),[vt,te]=ut(null),[Xt,ee]=ut(!1),[se,oe]=ut(null),[re,de]=ut(null),[ue,be]=ut(!1),[fe,pe]=ut("ru"),[ge,he]=ut(""),Te=at(!1);lt(()=>{initGlobalTooltip$6()},[]);const $e={ru:Et`
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
    `};lt(()=>{let dt=!0;return registerPoll("buttons","/api/state/button",pt=>{dt&&(Te.current||pt!=null&&pt.buttons&&(_(pt.buttons),pe(pt.lang)))},{immediate:!0}),()=>{dt=!1,unregisterPoll("buttons")}},[]);const ke=dt=>{const pt=new Map,Zt=ct.find($t=>$t.id===dt);return Zt&&Zt.pinact&&Object.entries(Zt.pinact).forEach(([$t,Yt])=>{pt.set($t,{pin:$t,relayId:Yt})}),st.forEach($t=>{if($t.idin===dt){const Yt=`${$t.pins}(${$t.idout})`;pt.has(Yt)||pt.set(Yt,{pin:$t.pins,relayId:$t.idout})}}),Array.from(pt.values())},Se=()=>({langbutton:fe==="ru"?rulangbutton:enlangbutton}),Pe=(dt,pt)=>{const Zt=Se(),$t=Zt[dt]&&Zt[dt][pt]?Zt[dt][pt]:"";return xe($t)},xe=(dt,pt=100)=>{if(!dt||typeof dt!="string")return"";const Zt=[];let $t="";const Yt=dt.split(`
`);return Yt.forEach((ae,ne)=>{ae.split(" ").filter(Ie=>Ie.length>0).forEach(Ie=>{const De=$t.length===0?Ie:" "+Ie;$t.length+De.length<=pt?$t+=De:($t.length>0&&Zt.push($t),$t=Ie)}),$t.length>0&&(Zt.push($t),$t=""),ne<Yt.length-1&&Zt.push("")}),$t.length>0&&Zt.push($t),Zt.join(`
`)},Ee=(dt,pt)=>{oe(dt),de(pt),ee(!0)},Me=()=>{ee(!1),oe(null),de(null)},ve=dt=>{console.log("handleButtonChange:",dt),_(pt=>pt.map(Zt=>Zt.id===dt.id?{...Zt,...dt}:Zt)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:dt.id,onoff:dt.onoff})}).then(pt=>pt.json()).then(pt=>{console.log("Response from /api/onoff/set:",pt)}).catch(pt=>{console.error("Error calling /api/onoff/set:",pt)}).finally(()=>{setTimeout(()=>{Te.current=!1},1500)}),Me()},le=dt=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Pe("langbutton",dt.tooltipIndex)}
    >
      ${dt.title}
    </th>
  `,ce=({d:dt,index:pt})=>{ke(dt.id);const Zt=dt.display_id||dt.id;return Et`
      <tr class="${pt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${Zt}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${dt.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][dt.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${xe(dt.sclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${xe(dt.dclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${xe(dt.lpress)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${dt.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${dt.onoff}
            onChange=${$t=>ve({...dt,onoff:$t})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>Ee("edit",dt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors ml-2"
          >
            Edit
          </button>
        </td>
      </tr>
    `};return ct?Et`
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
                      <${le} title="ID" tooltipIndex=${1} />
                      <${le} title="Pin" tooltipIndex=${2} />
                      <${le} title="Pullup type" tooltipIndex=${3} />
                      <${le} title="SINGLE CLICK" tooltipIndex=${4} />
                      <${le} title="DOUBLE CLICK" tooltipIndex=${5} />
                      <${le} title="LONG PRESS" tooltipIndex=${6} />
                      <${le} title="INFO" tooltipIndex=${7} />
                      <${le} title="On/Off" tooltipIndex=${8} />
                      <${le} title="Action" tooltipIndex=${9} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${ct.map((dt,pt)=>Et`<${ce} d=${dt} index=${pt} key=${dt.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>be(!ue)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${ue?"Hide Help":"Show Help"}
              </button>
            </div>

            ${ue&&Et`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${$e[fe]}
                </div>
              `}
          </div>
        </div>
      </div>
    </div>

    ${Xt&&Et`
        <${ModalButton}
          modalType=${se}
          page="TabButton"
          hideModal=${Me}
          title=${se==="connection"?"Edit Connection":"Edit Button pin"}
          selectedButton=${re}
          onButtonChange=${ve}
        />
      `}
  `:""};function ModalEncoder({modalType:$,page:k,hideModal:st,closeOnOverlayClick:mt=!0,title:ct,selectedEncoder:_,handleEncoderChange:vt,connectionOptions:te,SliderComponent:Xt=MyPolzunok}){const[ee,se]=ut((_==null?void 0:_.info)||""),[oe,re]=ut((_==null?void 0:_.onoff)===1),[de,ue]=ut({pin:(_==null?void 0:_.encdrbpin)||"",id:(_==null?void 0:_.encoderb)||""}),[be,fe]=ut(Object.entries(_.pinact||{})[0]||["",""]),[pe,ge]=ut([]),[he,Te]=ut([]),[$e,ke]=ut([]),Se=_.pwmmax||100,[Pe,xe]=ut(_.dvalue||0),[Ee,Me]=ut(_.ponr||0),[ve,le]=ut(_.pwm||1e7),ce=_e=>Math.round(_e*Se/100);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(_e=>{if(!_e.ok)throw new Error(`HTTP error! status: ${_e.status}`);return _e.json()}).then(_e=>{if(!_e||!_e.data||!Array.isArray(_e.data)){console.error("Invalid data format:",_e),ge([]),Te([]),ke([]);return}const ie=_e.data.filter(Oe=>Oe.topin===2||Oe.topin===11),ye=_e.data.filter(Oe=>Oe.topin===9),me=_e.data.filter(Oe=>Oe.topin===5);if(ge(ie),Te(ye),ke(me),_.encoderb||_.encdrbpin){const Oe=ye.find(Le=>String(Le.id)===String(_.encoderb)||Le.pins===_.encdrbpin);ue({pin:Oe?Oe.pins:"",id:Oe?Oe.id:""})}}).catch(_e=>{console.error("Error fetching pin config:",_e),ge([]),Te([]),ke([])})},[_]);const dt=_e=>{if(_e.preventDefault(),!(_e.target instanceof HTMLFormElement))return;let ye={};if($==="edit")ye={topin:8,id:_.id,pins:_.pins,pwm:parseInt(ve),pwmmax:_.pwmmax,dvalue:parseInt(Pe),ponr:parseInt(Ee),info:ee,onoff:oe?1:0};else if($==="connection"){const Oe=be&&be[0]&&be[1]!==void 0?{[be[0]]:parseInt(be[1])}:{};ye={id:_.id,pins:_.pins,pwm:parseInt(ve)},de&&de.id!==void 0&&de.id!==""?(ye.encoderb=parseInt(de.id),ye.encdrbpin=de.pin):(ye.encoderb=255,ye.encdrbpin=""),ye.pinact=Oe}console.log("Sending JSON to STM32:",JSON.stringify(ye)),fetch("/api/encoder/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ye)}).then(me=>me.json()).then(me=>{vt({..._,...ye}),st()}).catch(me=>console.error("Error saving encoder:",me))},pt=_e=>{se(_e.target.value)},Zt=_e=>{re(_e)},$t=_e=>{const ie=he.find(ye=>ye.pins===_e.target.value);ue({pin:_e.target.value,id:ie?ie.id:""})},Yt=_e=>{if(!_e.target.value)fe(["",""]);else{const ie=_e.target.value.split("|");fe([ie[0],ie[1]])}},ae=_e=>{xe(_e.target.value)},ne=_e=>{Me(_e.target.value)},we=_e=>{const ie=_e/1e3;return ie<=4e4?{cls:"text-green-600",msg:"Optimal range"}:ie<=2e5?{cls:"text-yellow-600",msg:"Precision might drop"}:{cls:"text-red-600",msg:"Expert mode: low precision"}},De=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick=${_e=>mt&&_e.target===_e.currentTarget&&st()}
    >
      <div
        class="bg-white rounded-lg p-6 max-w-2xl w-full relative"
        style="max-height: 90vh; overflow-y: auto;"
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
        ${(()=>{if(k==="TabEncoder"){if($==="connection")return Et`
          <form onsubmit=${dt}>
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
                        value=${he.some(_e=>_e.pins===de.pin)?de.pin:""}
                        onchange=${$t}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select Encoder B</option>
                        ${he.map(_e=>Et`
                            <option value=${_e.pins}>
                              ${_e.pins} (ID: ${_e.id})
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
                        value=${$e.some(_e=>String(_e.pins)===String(be[0]))?`${be[0]}|${be[1]}`:""}
                        onchange=${Yt}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select PWM connection</option>
                        ${$e.map(_e=>{const ie=pwmTimerMap[_e.pins]||"Unknown Timer";return Et`
                            <option value=${`${_e.pins}|${_e.id}`}>
                              ${_e.pins} (${ie}, ID: ${_e.id})
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
          <form onsubmit=${dt}>
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
                        value=${ve}
                        oninput=${_e=>le(_e.target.value)}
                        class="border rounded p-2 w-full font-mono"
                        placeholder="50 - 2000000000"
                      />
                      <div class="text-xs ${we(ve).cls}">
                        ${we(ve).msg}
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
                        value=${Pe}
                        oninput=${ae}
                        class="border rounded p-2 w-full"
                      />
                      <div class="text-xs text-gray-500">
                        ${Pe}% = ${ce(parseInt(Pe)||0)} / ${Se} steps
                      </div>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Duty on restore</td>
                    <td class="p-2">
                      <select
                        value=${Ee}
                        onchange=${ne}
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
                        value=${ee}
                        oninput=${pt}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${Xt}
                        value=${oe}
                        onChange=${Zt}
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
  `,Ce=at(null);return lt(()=>{const _e=document.createElement("div");return _e.id="encoder-modal-portal",document.body.appendChild(_e),Ce.current=_e,()=>{O(null,_e),document.body.removeChild(_e)}},[]),lt(()=>{Ce.current&&O(De,Ce.current)}),null}function initGlobalTooltip$5(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(ct){clearTimeout(k),$.innerHTML=ct.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,vt=$.offsetHeight,te=window.innerWidth,Xt=ct.getBoundingClientRect();let ee=Xt.left+Xt.width/2-_/2;ee=Math.max(8,Math.min(ee,te-_-8));let se=Xt.top-vt-8;se<8&&(se=Xt.bottom+8),$.style.left=ee+"px",$.style.top=se+"px",$.style.opacity="1"})}function mt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",ct=>{const _=ct.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",ct=>{ct.target.closest("[data-tip]")&&mt()})}const pwmTimerMap={PA0:"TIM2",PA3:"TIM2",PB10:"TIM2",PA6:"TIM3",PB1:"TIM3",PB15:"TIM12",PC6:"TIM8",PC7:"TIM8",PC8:"TIM8",PC9:"TIM8",PD12:"TIM4",PD13:"TIM4",PD14:"TIM4",PD15:"TIM4",PE5:"TIM9",PE6:"TIM9",PE9:"TIM1",PE11:"TIM1",PE13:"TIM1",PE14:"TIM1",PF6:"TIM10",PF7:"TIM11",PF8:"TIM13",PF9:"TIM14"};function TabEncoder({}){{const[$,k]=ut(null),[st,mt]=ut(null),[ct,_]=ut(!1),[vt,te]=ut(null),[Xt,ee]=ut(null),[se,oe]=ut(!1),[re,de]=ut("ru"),[ue,be]=ut([]),fe=at(!1);lt(()=>{initGlobalTooltip$5()},[]);const pe=()=>Promise.all([fetch("/api/encoder/get").then(dt=>dt.json()),fetch("/api/pintopin/get").then(dt=>dt.json())]).then(([dt,pt])=>{de(dt.lang),k(dt.encoders),be(pt),console.log("Encoder data:",dt.encoders),console.log("Pintopin data:",pt)}).catch(dt=>{console.error("Error fetching data:",dt)});lt(()=>{let dt=!0;return registerPoll("encoders","/api/state/encoder",function(pt){dt&&(fe.current||pt!=null&&(pt.encoders&&(k(pt.encoders),de(pt.lang)),pt.pintopin&&be(pt.pintopin)))},{immediate:!0}),function(){dt=!1,unregisterPoll("encoders")}},[]);const ge=dt=>{k(pt=>pt.map(Zt=>Zt.id===dt.id?dt:Zt)),fe.current=!0,fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:dt.id,onoff:dt.onoff})}).then(pt=>pt.json()).then(pt=>{console.log("Response from /api/onoff/set (Encoder):",pt)}).catch(pt=>{console.error("Error calling /api/onoff/set (Encoder):",pt)}).finally(()=>{setTimeout(()=>{fe.current=!1},1500)})},he=dt=>{const pt=$.find($t=>$t.id===dt),Zt=[];return pt&&pt.pinact&&Object.entries(pt.pinact).forEach(([$t,Yt])=>{Zt.push({pin:$t,idout:Yt})}),Zt},Te=dt=>{const pt=dt/1e3;return pt<=4e4?{cls:"text-green-600",msg:"✓"}:pt<=2e5?{cls:"text-yellow-600",msg:"~"}:{cls:"text-red-600",msg:"!"}},$e=dt=>{if(!dt)return"—";const pt=dt/1e3;return pt>=1e6?`${(pt/1e6).toFixed(2)} MHz`:pt>=1e3?`${(pt/1e3).toFixed(1)} kHz`:`${pt} Hz`},ke=()=>({langbutton:re==="ru"?ruencoder:enencoder}),Se=(dt,pt)=>{const Zt=ke(),$t=Zt[dt]&&Zt[dt][pt]?Zt[dt][pt]:"";return Pe($t)},Pe=(dt,pt=50)=>{if(!dt||typeof dt!="string")return"";const Zt=dt.split(" ");let $t=[],Yt="";for(let ae=0;ae<Zt.length;ae++)Yt.length+Zt[ae].length+1<=pt?Yt+=`${Yt?" ":""}${Zt[ae]}`:(Yt&&$t.push(Yt.trim()),Yt=Zt[ae]);return Yt&&$t.push(Yt.trim()),$t.join(`
`)},xe=(dt,pt)=>{console.log("Deleting connection:",dt,pt);const Zt=pt.split("(")[0].trim();fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:dt,pin:Zt})}).then($t=>$t.ok?$t.json():$t.text().then(Yt=>{throw new Error(`HTTP error! status: ${$t.status}, message: ${Yt}`)})).then($t=>{mt($t),k(Yt=>Yt.map(ae=>{if(ae.id===dt){const ne={...ae.pinact};return delete ne[Zt],{...ae,pinact:ne}}return ae})),be(Yt=>Yt.filter(ae=>!(ae.idin===dt&&ae.pins===Zt)))}).then(()=>{console.log("Connection deleted successfully"),pe()}).catch($t=>{console.error("Error deleting connection:",$t)})},Ee=(dt,pt)=>{console.log("Opening modal:",dt,pt),te(dt),ee(pt),_(!0)},Me=()=>{_(!1),te(null),ee(null)},ve={ru:Et`
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
      `},le=({title:dt,tooltipIndex:pt})=>Et`
      <th
        class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
        data-tip=${Se("langbutton",pt)}
      >
        ${dt}
      </th>
    `,ce=({d:dt,index:pt})=>{const Zt=he(dt.id),$t=Te(dt.pwm||0),Yt=Zt.map(ae=>pwmTimerMap[ae.pin]).filter((ae,ne,we)=>ae&&we.indexOf(ae)===ne);return Et`
        <tr class="${pt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
          <td class="px-6 py-2 text-sm text-slate-800 font-medium">${dt.pins}(${dt.id})</td>
          <td class="px-6 py-2 text-sm text-slate-700">
            ${dt.encdrbpin?`${dt.encdrbpin}(${dt.encoderb})`:"Not set"}
          </td>
          <td class="px-6 py-2 text-sm text-slate-700 font-mono">
            ${Zt.length>0?Zt.map(({pin:ae,idout:ne})=>Et`
                    <span class="mr-2 inline-flex items-center">
                      ${ae}(${ne})
                      <button
                        onClick=${we=>{we.preventDefault(),xe(dt.id,`${ae}(${ne})`)}}
                        class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                        title="Remove connection"
                      >
                        [x]
                      </button>
                    </span>
                  `):"Not set"}
          </td>
          <td class="px-6 py-2 text-sm">
            <span class="font-mono text-slate-700">${$e(dt.pwm)}</span>
            <span class="ml-1 font-bold ${$t.cls}">${$t.msg}</span>
            ${Yt.length>0?Et`<span class="ml-2 font-mono text-xs text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200 shadow-sm" title="Hardware Timer">${Yt.join(", ")}</span>`:""}
          </td>
          <td class="px-6 py-2 font-mono text-sm text-blue-600">
            ${dt.pwmmax?`${dt.pwmmax} steps`:"—"}
          </td>
          <td class="px-6 py-2 text-sm text-slate-800">${dt.dvalue}</td>
          <td class="px-6 py-2 text-sm text-slate-700 font-semibold">${dt.ponr===1?"ON":"OFF"}</td>
          <td class="px-6 py-2 text-sm text-slate-600">${dt.info}</td>
          <td class="px-6 py-2">
            <${MyPolzunok}
              value=${dt.onoff}
              onChange=${ae=>ge({...dt,onoff:ae})}
            />
          </td>
          <td class="px-6 py-2 text-sm whitespace-nowrap">
            <button
              onClick=${()=>Ee("connection",dt)}
              class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
            >
              Connection
            </button>
            <span class="text-slate-300">|</span>
            <button
              onClick=${()=>Ee("edit",dt)}
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
                        <${le} title="Encoder A (ID)" tooltipIndex=${3} />
                        <${le} title="Encoder B (ID)" tooltipIndex=${4} />
                        <${le} title="PWM connection" tooltipIndex=${5} />
                        <${le} title="PWM Frequency" tooltipIndex=${11} />
                        <${le} title="Resolution (steps)" tooltipIndex=${12} />
                        <${le} title="Dimmer value (0-100)" tooltipIndex=${6} />
                        <${le} title="Duty on restore" tooltipIndex=${7} />
                        <${le} title="INFO" tooltipIndex=${8} />
                        <${le} title="On/Off" tooltipIndex=${9} />
                        <${le} title="Action" tooltipIndex=${10} />
                      </tr>
                    </thead>
                    <tbody id="tab1" class="divide-y divide-white/40">
                      ${$.map((dt,pt)=>Et`<${ce} d=${dt} index=${pt} key=${dt.id} />`)}
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="flex justify-end mt-6">
                <button
                  onclick=${()=>oe(!se)}
                  class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
                >
                  ${se?"Hide Help":"Show Help"}
                </button>
              </div>

              ${se&&Et`
                  <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                    ${ve[re]}
                  </div>
                `}
            </div>
          </div>
          ${ct&&Et`
              <${ModalEncoder}
                modalType=${vt}
                page="TabEncoder"
                hideModal=${Me}
                title=${vt==="connection"?"Edit Connection":"Edit Encoder"}
                selectedEncoder=${Xt}
                handleEncoderChange=${ge}
              />
            `}
        </div>
      </div>
    `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">Loading...</div>`}}function ModalCron({modalType:$,page:k,hideModal:st,closeOnOverlayClick:mt=!0,title:ct,selectedCron:_,handleCronChange:vt,connectionOptions:te,modalClass:Xt,SliderComponent:ee=MyPolzunok}){const[se,oe]=ut((_==null?void 0:_.info)||""),[re,de]=ut((_==null?void 0:_.onoff)===1),[ue,be]=ut((_==null?void 0:_.activ)||""),[fe,pe]=ut((_==null?void 0:_.cron)||""),[ge,he]=ut(_.setrpins||""),Te=ve=>{ve.preventDefault();const le=new FormData(ve.target),ce=Object.fromEntries(le);ce.id=_.id,ce.pins=_.pins,$==="edit"?(ce.onoff=re?1:0,ce.info=se,ce.cron=fe,ce.activ=ue):$==="connection"&&(ce.setrpins=ge),console.log("Data being sent to server:"),console.log(ce),console.log("Stringified data:"),console.log(JSON.stringify(ce)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ce)}).then(dt=>dt.json()).then(dt=>{console.log("Success:",dt),vt({..._,...ce}),st(),window.location.href="/#/cron"}).catch(dt=>{console.error("Error:",dt)})};lt(()=>{oe((_==null?void 0:_.info)||""),he((_==null?void 0:_.setrpins)||""),de((_==null?void 0:_.onoff)===1)},[_]);const $e=ve=>{pe(ve.target.value)},ke=ve=>{oe(ve.target.value)},Se=ve=>{de(ve)},Pe=ve=>{be(ve.target.value)},xe=()=>{if(k==="TabCron"&&$==="edit")return Et`
          <form onsubmit=${Te}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  ${[{label:"ID",value:_.id},{label:"Cron",value:Et`
                        <input
                          type="text"
                          value=${fe}
                          onInput=${$e}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"Script",value:Et`
                        <input
                          type="text"
                          value=${ue}
                          onInput=${Pe}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"INFO",value:Et`
                        <input
                          type="text"
                          value=${se}
                          onInput=${ke}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"On/Off",value:Et`<${ee}
                        value=${re}
                        onChange=${Se}
                      />`}].map((ve,le)=>Et`
                      <tr
                        class="${le%2===1?"bg-white":"bg-gray-200"}"
                      >
                        <td class="p-2 font-bold">${ve.label}</td>
                        <td class="p-2">${ve.value}</td>
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
        `},Ee=Et`
    <div class=${`modal ${Xt||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${ve=>mt&&ve.target===ve.currentTarget&&st()}
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
  `,Me=at(null);return lt(()=>{const ve=document.createElement("div");return ve.id="modal-portal",document.body.appendChild(ve),Me.current=ve,()=>{O(null,ve),document.body.removeChild(ve)}},[]),lt(()=>{Me.current&&O(Ee,Me.current)}),null}function ModalPwmCron({modalType:$,page:k,hideModal:st,closeOnOverlayClick:mt=!0,title:ct,selectedCron:_,handleCronChange:vt,modalClass:te,SliderComponent:Xt=MyPolzunok}){let ee="",se="900",oe="0",re="100";if(_!=null&&_.activ&&_.activ.startsWith("pwm:")){const Zt=_.activ.substring(4).split(",");Zt.length===4&&(ee=Zt[0],se=Zt[1],oe=Zt[2],re=Zt[3])}const[de,ue]=ut((_==null?void 0:_.info)||""),[be,fe]=ut((_==null?void 0:_.onoff)===1),[pe,ge]=ut((_==null?void 0:_.cron)||""),[he,Te]=ut(ee),[$e,ke]=ut(se),[Se,Pe]=ut(oe),[xe,Ee]=ut(re),[Me,ve]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store"}).then(Zt=>Zt.json()).then(Zt=>{if(Zt&&Zt.data&&Array.isArray(Zt.data)){const $t=Zt.data.filter(Yt=>Yt.topin===5);ve($t),!he&&$t.length>0&&Te($t[0].id.toString())}}).catch(Zt=>console.error("Error fetching pin config:",Zt))},[]);const le=Zt=>{Zt.preventDefault();const $t=new FormData(Zt.target),Yt=Object.fromEntries($t);Yt.id=_.id,Yt.pins=_.pins,Yt.onoff=be?1:0,Yt.info=de,Yt.cron=pe,Yt.activ=`pwm:${he},${$e},${Se},${xe}`,fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Yt)}).then(ae=>ae.json()).then(ae=>{vt({..._,...Yt}),st(),window.location.href="/#/cron"}).catch(ae=>console.error("Error:",ae))},ce=()=>Et`
      <form onsubmit=${le}>
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
                    value=${he}
                    onChange=${Zt=>Te(Zt.target.value)}
                    class="border rounded p-2 w-full"
                    required
                  >
                    ${Me.map(Zt=>Et`<option value=${Zt.id}>${Zt.pins}</option>`)}
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200">
                <td class="p-2 font-bold">Cron Pattern</td>
                <td class="p-2">
                  <input
                    type="text"
                    value=${pe}
                    onInput=${Zt=>ge(Zt.target.value)}
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
                    value=${$e}
                    onInput=${Zt=>ke(Zt.target.value)}
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
                    onInput=${Zt=>Pe(Zt.target.value)}
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
                    onInput=${Zt=>Ee(Zt.target.value)}
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
                    value=${de}
                    onInput=${Zt=>ue(Zt.target.value)}
                    class="border rounded p-2 w-full"
                  />
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-2 font-bold">On/Off</td>
                <td class="p-2">
                  <${Xt} value=${be} onChange=${fe} />
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
    `,dt=Et`
    <div class=${`modal ${te||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${Zt=>mt&&Zt.target===Zt.currentTarget&&st()}
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
            ${ce()}
          </div>
        </div>
      </div>
    </div>
  `,pt=at(null);return lt(()=>{const Zt=document.createElement("div");return Zt.id="pwm-modal-portal",document.body.appendChild(Zt),pt.current=Zt,()=>{O(null,Zt),document.body.removeChild(Zt)}},[]),lt(()=>{pt.current&&O(dt,pt.current)}),null}function initGlobalTooltip$4(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(ct){clearTimeout(k),$.innerHTML=ct.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,vt=$.offsetHeight,te=window.innerWidth,Xt=ct.getBoundingClientRect();let ee=Xt.left+Xt.width/2-_/2;ee=Math.max(8,Math.min(ee,te-_-8));let se=Xt.top-vt-8;se<8&&(se=Xt.bottom+8),$.style.left=ee+"px",$.style.top=se+"px",$.style.opacity="1"})}function mt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",ct=>{const _=ct.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",ct=>{ct.target.closest("[data-tip]")&&mt()})}function TabCron({}){const[$,k]=ut(null),[st,mt]=ut(null);at(null);const[ct,_]=ut(!1),[vt,te]=ut(null),[Xt,ee]=ut(null),[se,oe]=ut("ru"),[re,de]=ut(!1),[ue,be]=ut(1),[fe,pe]=ut(0),ge=at(!1);lt(()=>{initGlobalTooltip$4()},[]),lt(()=>{let dt=!0;return registerPoll("cron","/api/cron/get",function(pt){!dt||ge.current||pt!=null&&Array.isArray(pt.timers)&&(k(pt.timers),oe(pt.lang||"ru"),typeof pt.numline=="number"&&(pe(pt.numline),be(pt.numline)))},{immediate:!0}),function(){dt=!1,unregisterPoll("cron")}},[]);const he=dt=>{ge.current=!0,fetch("/api/numline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({numline:dt})}).then(pt=>pt.json()).catch(pt=>console.error("Error sending Crone line to stm32:",pt)).finally(()=>{setTimeout(()=>{ge.current=!1},1500)})},Te=()=>{if(ue<$.length){const dt=ue+1;be(dt),pe(dt),he(dt)}},$e=()=>{if(ue>0){const dt=ue-1;be(dt),pe(dt),he(dt)}},ke={ru:Et`
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
    `};if($===null)return Et`<div>Loading...</div>`;const Se=()=>({langtimers:se==="ru"?rulangtimers:enlangtimers}),Pe=(dt,pt)=>{const Zt=Se(),Yt=(Zt[dt]&&Zt[dt][pt]?Zt[dt][pt]:"").split(" "),ae=[];for(let ne=0;ne<Yt.length;ne+=15)ae.push(Yt.slice(ne,ne+15).join(" "));return ae.join("<br>")},xe=(dt,pt)=>{te(dt),ee(pt),_(!0)},Ee=()=>{_(!1),te(null),ee(null)},Me=dt=>{console.log("handleCronChange:",dt),k($.map(pt=>pt.id===dt.id?dt:pt)),ge.current=!0,fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(dt)}).then(pt=>pt.json()).then(pt=>{console.log("Cron job updated successfully:",pt)}).catch(pt=>{console.error("Error updating cron job:",pt)}).finally(()=>{setTimeout(()=>{ge.current=!1},1500)})},ve=()=>Array.isArray(Xt)?Xt.flatMap(dt=>dt.pinact?Object.keys(dt.pinact).map(pt=>({value:pt,label:pt})):[]):Xt&&Xt.pinact?Object.keys(Xt.pinact).map(dt=>({value:dt,label:dt})):[],le=dt=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Pe("langtimers",dt.tooltipIndex)}
    >
      ${dt.title}
    </th>
  `,ce=({d:dt,index:pt})=>{const Zt=dt.activ&&dt.activ.startsWith("pwm:");let $t=dt.activ;if(Zt){const Yt=dt.activ.substring(4).split(",");Yt.length===4&&($t=`pwmID=${Yt[0]} | ${Yt[1]}s | ${Yt[2]}%→${Yt[3]}%`)}return Et`
    <tr class="${pt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-4 text-sm text-slate-800 font-medium">${dt.id}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider">${dt.cron}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider items-center gap-1 flex justify-start">${$t}</td>
      <td class="px-6 py-4 text-sm text-slate-600">${dt.info}</td>
      <td class="px-6 py-4">
        <${MyPolzunok}
          value=${dt.onoff}
          onChange=${Yt=>Me({...dt,onoff:Yt})}
        />
      </td>
     <td class="px-6 py-4 text-center">
        ${Zt?Et`
          <button
            onclick=${()=>xe("edit_pwm",dt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-3"
          >
            Edit
          </button>
          <button
            onclick=${()=>xe("edit_pwm",dt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap ml-1"
          >
            PWM
          </button>
        `:Et`
       <button
            onclick=${()=>xe("edit",dt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
          >
            Edit
          </button>
          <button
            onclick=${()=>xe("edit_pwm",dt)}
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
                          <${le} title="No" tooltipIndex=${1} />
                          <${le} title="Cron" tooltipIndex=${2} />
                          <${le} title="Script" tooltipIndex=${3} />
                          <${le} title="Info" tooltipIndex=${4} />
                          <${le} title="On/Off" tooltipIndex=${5} />
                          <${le} title="Action" tooltipIndex=${6} />
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-white/40">
                        ${$.slice(0,ue).map((dt,pt)=>Et`<${ce} d=${dt} index=${pt} key=${dt.id} />`)}
                      </tbody>
                    </table>
                  </div>
                </div>
              `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No cron jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>de(!re)}
          >
            ${re?"Hide Help":"Show Help"}
          </button>
          <div class="font-semibold text-slate-600 tracking-wide">
            ${$&&$.length-ue>0?`Still available: ${$.length-ue} cron jobs`:"No available: cron jobs!"}
          </div>
          <div class="flex gap-2">
            ${$&&ue<$.length?Et`
                  <button
                    class="bg-emerald-500 hover:bg-emerald-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-emerald-500/30"
                    onclick=${Te}
                    title="Add Cron"
                  >+</button>
                `:null}
            ${ue>0?Et`
                  <button
                    class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                    onclick=${$e}
                    title="Remove Cron"
                  >-</button>
                `:null}
          </div>
        </div>
      </div>

      ${re&&Et`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">
          ${ke[se]}
        </div>
      `}

      ${ct&&vt==="edit_pwm"?Et`
        <${ModalPwmCron}
          modalType=${vt}
          page="TabCron"
          hideModal=${Ee}
          title="Edit PWM Timer(s)"
          selectedCron=${Xt}
          handleCronChange=${Me}
          modalClass="mt-24"
        />
      `:ct?Et`
        <${ModalCron}
          modalType=${vt}
          page="TabCron"
          hideModal=${Ee}
          title=${vt==="edit"?"Edit Timer(s)":"Edit Connection"}
          selectedCron=${Xt}
          handleCronChange=${Me}
          connectionOptions=${ve()}
          modalClass="mt-24"
        />
      `:null}
    </div>
  `}function ModalZigbee({device:$,allDevices:k,onClose:st,onUpdate:mt,onRescan:ct,language:_}){const vt=_||"ru",[te,Xt]=ut(!1),ee=$.zbee_role===3,[se,oe]=ut([]);lt(()=>{ee&&fetch("/api/button/get").then(ne=>ne.json()).then(ne=>{const we=ne.data||ne;if(Array.isArray(we)){const Ie=we.filter(De=>De.is_zigbee&&De.payload);oe(Ie)}}).catch(()=>{})},[ee,$.id]);const re=(k||[]).filter(ne=>ne.zbee_ieee===$.zbee_ieee),de=re.length>1&&re.some(ne=>ne.ep>0),ue=de?re.filter(ne=>ne.ep>0):[],[be,fe]=ut(ue);lt(()=>{fe(ue)},[k]);const pe=($.clusters||[]).includes(8),ge=($.clusters||[]).includes(768),[he,Te]=ut($.onoff||0),[$e,ke]=ut($.brightness||254),[Se,Pe]=ut($.color||"#"+($.color_hex||16755200).toString(16).padStart(6,"0"));lt(()=>{Te($.onoff||0),ke($.brightness||254),Pe($.color||"#"+($.color_hex||16755200).toString(16).padStart(6,"0")),te&&Xt(!1)},[$.onoff,$.brightness,$.color_hex]),lt(()=>{if(!te)return;const ne=setTimeout(()=>Xt(!1),5e3);return()=>clearTimeout(ne)},[te]);const xe=at(null),Ee=at(null),Me=at(JSON.stringify({brightness:$.brightness,color:$.color,color_hex:$.color_hex}));lt(()=>{const ne=document.createElement("div");return ne.id="modal-zigbee-portal",document.body.appendChild(ne),xe.current=ne,()=>{O(null,ne),document.body.removeChild(ne)}},[]);const ve=ne=>{Object.assign($,ne);const we=JSON.stringify({brightness:$.brightness,color:$.color,color_hex:$.color_hex,clusters:$.clusters});we!==Me.current&&(clearTimeout(Ee.current),Ee.current=setTimeout(()=>{Me.current=we,mt({...$})},300))},le=ne=>{Te(ne),fetch("/api/zigbee/command",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:$.id,onoff:ne?1:0})}).catch(we=>console.error("Error sending command:",we))},ce=ne=>{ke(ne),ve({brightness:ne})},dt=ne=>{Pe(ne);const we=parseInt(ne.replace("#",""),16);ve({color:ne,color_hex:we})},pt=(ne,we)=>{fe(Ie=>Ie.map(De=>De.id===ne?{...De,onoff:we?1:0}:De)),fetch("/api/zigbee/command",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ne,onoff:we?1:0})}).catch(Ie=>console.error("Error sending ep command:",Ie))},Zt=(ne,we)=>{fe(Ie=>Ie.map(De=>De.id===ne?{...De,brightness:we}:De)),fetch("/api/zigbee/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ne,brightness:we})}).catch(Ie=>console.error("Error sending ep brightness:",Ie))},$t=ne=>{ne.target===ne.currentTarget&&st()},Yt=ne=>ne&1?Et`<span class="text-lg">🔌</span>`:ne&2?Et`<span class="text-lg">🔆</span>`:ne&4?Et`<span class="text-lg">💡</span>`:Et`<span class="text-lg">⚙️</span>`,ae=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 backdrop-blur-sm"
      style="margin-top: 7px;"
      onclick=${$t}
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <div
          class="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 relative shadow-2xl"
          style="max-height: calc(100vh - 57px); overflow-y: auto;"
        >
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-xl font-bold text-slate-800">
                ${de?Et`✱ ${$.zbee_label||"Smart Switch"}`:Et`
                  ${ee?"🔘":ge?"💡":pe?"🔆":"🔌"}
                  ${$.zbee_label||"Device "+$.id}
                `}
              </h2>
              <p class="text-sm text-slate-500 mt-1">
                ID: ${$.displayId||$.id} · ${de?`Multi-EP (${be.length} EP)`:ee?"Button":ge?"Color Lamp":pe?"Dimmer":"On/Off Socket"}
              </p>
            </div>
            <button
              onclick=${st}
              class="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            ${ee?Et`
              <div class="bg-slate-50 rounded-xl p-4">
                <div class="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
                  ${vt==="ru"?"Тестирование":"Testing"}
                </div>
                <p class="text-sm text-slate-500 mb-3">
                  ${vt==="ru"?"Нажмите кнопку на устройстве и наблюдайте за событиями. Или отправьте команду для тестирования:":"Press the button on the device and observe events. Or send a command for testing:"}
                </p>
                <div class="flex gap-3 flex-wrap">
                  ${se.map(ne=>Et`
                    <button
                      onClick=${()=>{fetch("/api/zigbee/command",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ne.id,trigger:ne.payload})})}}
                      class="px-4 py-2 rounded-lg bg-teal-500 text-white text-sm font-medium hover:bg-teal-600 transition-colors">
                      ${ne.label||ne.payload}
                    </button>
                  `)}
                  ${se.length===0&&Et`
                    <span class="text-sm text-slate-400 italic">
                      ${vt==="ru"?"Нет триггеров — нажмите кнопку на устройстве":"No triggers — press a button on the device"}
                    </span>
                  `}
                </div>
              </div>

              <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div class="text-sm font-semibold text-blue-700 mb-2">
                  ${vt==="ru"?"Настройка действий":"Configure Actions"}
                </div>
                <p class="text-sm text-blue-600 mb-3">
                  ${vt==="ru"?"Настройте действия для каждого payload на странице Button pin.":"Configure actions for each payload on the Button pin page."}
                </p>
                <button
                  onClick=${()=>{st(),window.location.href="/#/button"}}
                  class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                  ${vt==="ru"?"Перейти на Button pin →":"Go to Button pin →"}
                </button>
              </div>
            `:de?Et`
              <!-- Мульти-EP: групповая модалка -->
              ${be.map(ne=>Et`
                <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2">
                      ${Yt(ne.clusters[0]||6)}
                      <span class="text-sm font-semibold text-slate-700">${ne.zbee_label||"EP"+ne.ep}</span>
                    </div>
                    <span class="text-xs text-slate-400 font-mono">EP${ne.ep}</span>
                  </div>
                  ${(ne.clusters||[]).includes(6)&&Et`
                    <${MyPolzunok} value=${ne.onoff||0} onChange=${we=>pt(ne.id,we)} />
                  `}
                  ${(ne.clusters||[]).includes(8)&&Et`
                    <div class="mt-3">
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-xs text-slate-500">${vt==="ru"?"Яркость":"Brightness"}</span>
                        <span class="text-xs font-mono text-slate-500">${ne.brightness||0}%</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="254"
                        value=${ne.brightness||254}
                        onInput=${we=>Zt(ne.id,parseInt(we.target.value))}
                        class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                    </div>
                  `}
                </div>
              `)}

              <div class="bg-slate-50 rounded-xl p-4">
                <div class="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">${_==="ru"?"Возможности":"Capabilities"}</div>
                <div class="flex gap-3 flex-wrap">
                  ${be.filter(ne=>(ne.clusters||[]).includes(6)).length>0&&Et`
                    <span class="px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-700">
                      🔘 ${_==="ru"?"Вкл/Выкл":"On/Off"} ×${be.filter(ne=>(ne.clusters||[]).includes(6)).length}
                    </span>
                  `}
                  ${be.filter(ne=>(ne.clusters||[]).includes(8)).length>0&&Et`
                    <span class="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700">
                      🔆 ${_==="ru"?"Яркость":"Brightness"} ×${be.filter(ne=>(ne.clusters||[]).includes(8)).length}
                    </span>
                  `}
                </div>
              </div>

              ${be.filter(ne=>(ne.clusters||[]).includes(6)).length>0&&Et`
                <div class="flex justify-center">
                  <button
                    onClick=${()=>{st(),window.location.href="/#/button"}}
                    class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                    ${_==="ru"?"Перейти на Button pin →":"Go to Button pin →"}
                  </button>
                </div>
              `}
            `:Et`
              <!-- Одиночное устройство -->
              <div class="bg-slate-50 rounded-xl p-4">
                <div class="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">Power</div>
                <${MyPolzunok} value=${he} onChange=${le} />
              </div>

              ${(pe||ge)&&Et`
                <div class="bg-slate-50 rounded-xl p-4">
                  <div class="flex justify-between items-center mb-3">
                    <span class="text-sm font-semibold text-slate-600 uppercase tracking-wider">Brightness</span>
                    <span class="text-sm font-mono text-slate-500">${Math.round($e/254*100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="254"
                    value=${$e}
                    onInput=${ne=>ce(parseInt(ne.target.value))}
                    class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>
              `}

              ${ge&&Et`
                <div class="bg-slate-50 rounded-xl p-4">
                  <div class="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">Color</div>
                  <input
                    type="color"
                    value=${Se}
                    onInput=${ne=>dt(ne.target.value)}
                    class="w-16 h-10 rounded-lg border-2 border-slate-200 cursor-pointer"
                  />
                </div>
              `}

              <div class="bg-slate-50 rounded-xl p-4">
                <div class="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">${_==="ru"?"Возможности":"Capabilities"}</div>
                <div class="flex gap-3 flex-wrap">
                  ${($.clusters||[]).includes(6)&&Et`<span class="px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-700">🔘 ${_==="ru"?"Вкл/Выкл":"On/Off"}</span>`}
                  ${($.clusters||[]).includes(8)&&Et`<span class="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700">🔆 ${_==="ru"?"Яркость":"Brightness"}</span>`}
                  ${($.clusters||[]).includes(768)&&Et`<span class="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">🎨 ${_==="ru"?"Цвет":"Color"}</span>`}
                </div>
              </div>
            `}

            ${!ee&&Et`
              <div class="flex justify-center">
                <button
                onClick=${()=>{te||(Xt(!0),ct($))}}
                disabled=${te}
                class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all duration-200 ${te?"bg-cyan-100 text-cyan-600 cursor-wait":"bg-white border-2 border-slate-300 text-slate-700 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-lg active:scale-95"}"
              >
                ${te?Et`<span class="inline-block animate-spin">⏳</span> ${_==="ru"?"Сканирование...":"Scanning..."}`:Et`🔄 ${_==="ru"?"Обновить возможности":"Rescan capabilities"}`}
              </button>
            </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `;return lt(()=>{xe.current&&O(ae,xe.current)}),null}const ROLE_OPTIONS=[{value:"ignore",label:{ru:"Игнорировать",en:"Ignore"}},{value:"onoff",label:{ru:"Вкл/Выкл",en:"On/Off"}},{value:"brightness",label:{ru:"Яркость",en:"Brightness"}},{value:"color",label:{ru:"Цвет",en:"Color"}},{value:"temperature",label:{ru:"Температура",en:"Temperature"}},{value:"humidity",label:{ru:"Влажность",en:"Humidity"}},{value:"occupancy",label:{ru:"Присутствие",en:"Occupancy"}},{value:"button",label:{ru:"Кнопка",en:"Button"}},{value:"ep",label:{ru:"EP",en:"EP"}}];function obsKey($){return $.source==="trigger"?`trigger_${$.payload}`:`${$.ep}_${$.cluster}_${$.attr}`}function ModalLearn({ieee:$,language:k,onClose:st,onSaved:mt,onGoToButtonPin:ct}){const _=k||"ru",[vt,te]=ut(null),[Xt,ee]=ut([]),[se,oe]=ut({}),[re,de]=ut({}),[ue,be]=ut(!1),[fe,pe]=ut(null),[ge,he]=ut(null),Te=at(null),$e=at({});lt(()=>{$e.current={},ee([]),oe({}),de({}),pe(null),he(null)},[$]),lt(()=>{let dt=!0;const pt=async()=>{if(dt)try{const $t=await(await fetch("/api/zigbee/learn/status")).json();if(!dt)return;if(te($t),$t.active){const ae=await(await fetch("/api/zigbee/learn/get")).json();if(!dt)return;for(const ne of ae.observations||[]){const we=obsKey(ne);we in $e.current?$e.current[we]={...$e.current[we],...ne}:$e.current[we]=ne}ee(Object.values($e.current))}else Object.keys($e.current).length>0&&(ee(Object.values($e.current)),clearInterval(Te.current))}catch(Zt){dt&&he(Zt.message)}};return pt(),Te.current=setInterval(pt,1500),()=>{dt=!1,clearInterval(Te.current)}},[$]);const ke=vt==null?void 0:vt.active,Se=vt&&!vt.active&&vt.remaining_ms===0,Pe=Xt.length>0,xe=async()=>{be(!0);try{const dt={ieee:$,labels:Xt.map($t=>$t.source==="trigger"?{source:"trigger",trigger_payload:$t.payload,role:se[obsKey($t)]||"ignore",label:re[obsKey($t)]||""}:{ep:$t.cluster==="0xEF00"?parseInt($t.attr,16):$t.ep,cluster:$t.cluster,attr:$t.attr,role:se[obsKey($t)]||"ignore",label:re[obsKey($t)]||""})},Zt=await(await fetch("/api/zigbee/learn/label",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(dt)})).json();Zt.status?(pe(Zt.device_type),Zt.device_type!=="trigger"&&Zt.device_type!=="multi_ep"&&setTimeout(()=>mt==null?void 0:mt(Zt.device_type),2e3),Zt.ep_slots>1&&pe("multi_ep")):he(Zt.message)}catch(dt){he(dt.message)}finally{be(!1)}},Ee=(vt==null?void 0:vt.remaining_ms)||0,Me=Math.floor(Ee/6e4),ve=Math.ceil(Ee%6e4/1e3),le=dt=>({dimmer:"🔆",color_lamp:"💡",sensor:"📡",trigger:"🔘",multi_ep:"🏭",cover:"🚪",thermostat:"🌡️",lock:"🔒",socket:"🔌",multi_ep:"✱"})[dt]||"🔌",ce=dt=>({dimmer:_==="ru"?"Диммер":"Dimmer",color_lamp:_==="ru"?"Цветная лампа":"Color Lamp",sensor:_==="ru"?"Сенсор":"Sensor",trigger:_==="ru"?"Кнопка/Триггер":"Trigger",multi_ep:_==="ru"?"Multi-EP устройство":"Multi-EP Device",cover:_==="ru"?"Шторы/Жалюзи":"Cover",thermostat:_==="ru"?"Термостат":"Thermostat",lock:_==="ru"?"Замок":"Lock",socket:_==="ru"?"Розетка":"Socket",multi_ep:_==="ru"?"Multi-EP устройство":"Multi-EP Device"})[dt]||dt;return Et`
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
         onClick=${dt=>dt.target===dt.currentTarget&&(st==null?void 0:st())}>
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">

        <div class="flex items-center justify-between px-6 py-4 border-b">
          <h2 class="text-xl font-bold text-slate-800">
            ${fe?_==="ru"?"Устройство определено!":"Device identified!":_==="ru"?"Режим обучения":"Learning Mode"}
          </h2>
          <button class="text-slate-400 hover:text-slate-600 text-2xl"
                  onClick=${st}>×</button>
        </div>

        <div class="px-6 py-4">

          ${fe&&Et`
            <div class="text-center py-8">
              <div class="text-5xl mb-4">${le(fe)}</div>
              <div class="text-2xl font-bold text-slate-800 mb-1">${ce(fe)}</div>
              <div class="text-sm text-slate-400 mb-4">${$}</div>

              ${fe==="multi_ep"&&Et`
                <div class="bg-green-50 border border-green-200 rounded-lg p-4 mt-2 text-left">
                  <p class="text-sm text-green-800">
                    ${_==="ru"?"Создано несколько устройств. Все они используют один IEEE-адрес, но управляются отдельно.":"Multiple devices created. They share the same IEEE address but are controlled independently."}
                  </p>
                </div>
              `}

              ${(fe==="trigger"||fe==="multi_ep")&&Et`
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-2 text-left">
                  <p class="text-sm text-blue-800 mb-3">
                    ${fe==="multi_ep"?_==="ru"?"Создано несколько устройств. Если есть кнопки, настройте действия на странице Button pin.":"Multiple devices created. If there are buttons, configure actions on the Button pin page.":_==="ru"?"Мы только определили устройство. Чтобы кнопка что-то делала при нажатии, настройте действия на странице Button pin.":"We only identified the device. To make the button actually do something, configure actions on the Button pin page."}
                  </p>
                  ${ct&&Et`
                    <button
                      class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                      onClick=${()=>ct($)}>
                      ${_==="ru"?"Перейти на Button pin →":"Go to Button pin →"}
                    </button>
                  `}
                </div>
              `}
            </div>
          `}

          ${!fe&&!ke&&!Se&&Et`
            <div class="text-center py-6 text-slate-500">
              ${_==="ru"?"Ожидание...":"Waiting..."}
            </div>
          `}

          ${ke&&Et`
            <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <p class="text-sm text-amber-800 mb-2">
                ${_==="ru"?"Автоопределение не сработало. Пожалуйста, физически подействуйте на устройство (нажмите кнопку / поверните диммер / откройте дверь) в течение следующих 5 минут.":"Auto-detection failed. Please physically interact with the device (press button / turn dimmer / open door) within the next 5 minutes."}
              </p>
              <p class="text-xs text-amber-600">
                ${_==="ru"?"Во время обучения (5 мин) постарайтесь не трогать другие Zigbee-устройства — это может задержать распознавание из-за общей очереди сообщений.":"During learning (5 min), avoid triggering other Zigbee devices — this may delay recognition due to the shared message queue."}
              </p>
              <div class="mt-3 text-center">
                ${Me>0&&Et`
                  <span class="text-3xl font-mono font-bold text-amber-600">${Me}</span>
                  <span class="text-sm text-amber-500 ml-1">${_==="ru"?"мин":"min"}</span>
                `}
                <span class="text-3xl font-mono font-bold text-amber-600">${ve}</span>
                <span class="text-sm text-amber-500 ml-1">${_==="ru"?"сек":"sec"}</span>
              </div>
            </div>
          `}

          ${Se&&!Pe&&Et`
            <div class="text-center py-6">
              <div class="text-4xl mb-3">📭</div>
              <p class="text-slate-600 mb-1">
                ${_==="ru"?"Устройство ничего не публикует в MQTT.":"Device publishes nothing to MQTT."}
              </p>
              <p class="text-xs text-slate-400">
                ${_==="ru"?"Возможно, устройство не поддерживает Zigbee или находится слишком далеко от координатора.":"The device may not support Zigbee or may be too far from the coordinator."}
              </p>
            </div>
          `}

          ${(ke||Se)&&Pe&&Et`
            <div class="mb-4">
              <p class="text-sm text-slate-500 mb-2">
                ${_==="ru"?"Мы увидели:":"We observed:"}
              </p>
              <table class="w-full text-sm">
                <thead>
                  <tr class="text-left text-slate-500 border-b">
                    <th class="py-2">EP</th>
                    <th class="py-2">${_==="ru"?"Кластер":"Cluster"}</th>
                    <th class="py-2">${_==="ru"?"Значение":"Value"}</th>
                    <th class="py-2">${_==="ru"?"Название":"Name"}</th>
                    <th class="py-2">${_==="ru"?"Это:":"This is:"}</th>
                  </tr>
                </thead>
                <tbody>
                  ${Xt.map(dt=>dt.source==="trigger"?Et`
                    <tr key=${obsKey(dt)} class="border-b border-slate-100">
                      <td class="py-2 font-mono text-xs text-slate-400" colspan="2">
                        trigger
                      </td>
                      <td class="py-2 font-mono text-xs">
                        "${dt.payload}"
                      </td>
                      <td class="py-2">
                        <input type="text"
                               class="border rounded px-2 py-1 text-sm w-full"
                               placeholder="${_==="ru"?"Напр. Двойной клик":"e.g. Double Click"}"
                               value=${re[obsKey(dt)]||""}
                               onInput=${pt=>de(Zt=>({...Zt,[obsKey(dt)]:pt.target.value}))} />
                      </td>
                      <td class="py-2">
                        <select class="border rounded px-2 py-1 text-sm bg-white"
                                value=${se[obsKey(dt)]||"ignore"}
                                onChange=${pt=>oe(Zt=>({...Zt,[obsKey(dt)]:pt.target.value}))}>
                          ${ROLE_OPTIONS.map(pt=>Et`
                            <option key=${pt.value} value=${pt.value}>
                              ${pt.label[_]||pt.label.en}
                            </option>
                          `)}
                        </select>
                      </td>
                    </tr>
                  `:Et`
                    <tr key=${obsKey(dt)} class="border-b border-slate-100">
                      <td class="py-2 font-mono">${dt.ep}</td>
                      <td class="py-2">
                        <span class="font-mono text-xs">${dt.cluster}</span>
                        <span class="text-slate-400 ml-1">${dt.cluster_name}${dt.cluster==="0xEF00"?" EP"+parseInt(dt.attr,16):""}</span>
                        ${dt.changed&&Et`
                          <span class="text-amber-500 ml-1" title="
                            ${_==="ru"?"Значение менялось":"Value changed"}">↻</span>
                        `}
                      </td>
                      <td class="py-2 font-mono text-xs">
                        ${dt.first_val!==dt.last_val?`${dt.first_val}→${dt.last_val}`:String(dt.last_val)}
                      </td>
                      <td class="py-2">
                        <input type="text"
                               class="border rounded px-2 py-1 text-sm w-full"
                               placeholder="${_==="ru"?"Напр. Яркость":"e.g. Brightness"}"
                               value=${re[obsKey(dt)]||""}
                               onInput=${pt=>de(Zt=>({...Zt,[obsKey(dt)]:pt.target.value}))} />
                      </td>
                      <td class="py-2">
                        <select class="border rounded px-2 py-1 text-sm bg-white"
                                value=${se[obsKey(dt)]||"ignore"}
                                onChange=${pt=>oe(Zt=>({...Zt,[obsKey(dt)]:pt.target.value}))}>
                          ${ROLE_OPTIONS.map(pt=>Et`
                            <option key=${pt.value} value=${pt.value}>
                              ${pt.label[_]||pt.label.en}
                            </option>
                          `)}
                        </select>
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          `}

          ${ge&&Et`
            <div class="bg-red-50 text-red-700 text-sm rounded p-3 mb-4">${ge}</div>
          `}
        </div>

        <div class="flex justify-end gap-3 px-6 py-4 border-t">
          <button class="px-4 py-2 rounded-lg border text-sm"
                  onClick=${st}>
            ${_==="ru"?"Отмена":"Cancel"}
          </button>
          ${Pe&&!fe&&Et`
            <button class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm
                           disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled=${ue}
                    onClick=${xe}>
              ${ue?_==="ru"?"Сохранение...":"Saving...":_==="ru"?"Сохранить":"Save"}
            </button>
          `}
        </div>
      </div>
    </div>
  `}function TabZigbee({}){const[$,k]=ut([]),[st,mt]=ut("ru"),[ct,_]=ut(!1),[vt,te]=ut(null),[Xt,ee]=ut(null),[se,oe]=ut({}),re=at(!1),de=at(0),ue=at({}),be=at(new Set);at(null);const fe=at(!1),pe=le=>{const ce=Array.isArray(le)?le:[le||6];return ce.includes(768)?"lamp":ce.includes(8)?"dimmer":"socket"},ge=le=>({zbee_ieee:le.ieee||"",zbee_endpoint:le.ep||1,clusters:le.clusters||[6],zbee_label:le.info||"",onoff:le.onoff||0,brightness:le.brightness||254,color_hex:le.color_hex||16755200}),he=le=>({id:le.id,zbee_ieee:le.ieee||"",zbee_endpoint:le.ep||1,clusters:le.clusters||[6],zbee_device_type:le.role===3?"trigger":pe(le.clusters),zbee_label:le.info||"",onoff:le.onoff||0,brightness:le.brightness||254,color_hex:le.color_hex||16755200,zbee_role:le.role||0,ep:le.ep||0}),Te=()=>fetch("/api/zigbee/get",{cache:"no-store"}).then(le=>le.json()).then(le=>{const ce=le.zigbee||[],dt=ce.map(he);k(dt),mt(le.lang||"ru");const pt={};ce.forEach(Zt=>{pt[Zt.id]=ge(Zt)}),ue.current=pt,be.current.clear()}).catch(le=>console.error("Error fetching zigbee data:",le));lt(()=>{Te();let le=!0;return registerPoll("zigbee","/api/zigbee/get",function(ce){if(le&&!re.current&&!(Date.now()-de.current<3e3)&&ce){const dt=ce.zigbee||[],pt=dt.map(he),Zt={};dt.forEach($t=>{Zt[$t.id]=ge($t)}),ue.current=Zt,fe.current||(k(pt),mt(ce.lang||"ru"),be.current.clear(),te($t=>$t?pt.find(ae=>ae.id===$t.id)||$t:null))}}),()=>{le=!1,unregisterPoll("zigbee")}},[]);const $e=(le,ce)=>{const dt={...le,onoff:ce?1:0};k(pt=>pt.map(Zt=>Zt.id===le.id?dt:Zt)),re.current=!0,de.current=Date.now(),fetch("/api/zigbee/enable",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:le.id,onoff:ce?1:0})}).then(pt=>pt.json()).finally(()=>{setTimeout(()=>{re.current=!1},1500)})},ke=le=>{oe(ce=>({...ce,[le]:!ce[le]}))},Se=le=>{const ce=le.display_id||le.id;te({...le,displayId:ce}),_(!0),fe.current=!0},Pe=()=>{_(!1),te(null),fe.current=!1,setTimeout(()=>Te(),300)},xe=le=>{const ce=ue.current[le.id]||{},dt={socket:[6],dimmer:[6,8],lamp:[6,8,768]},pt=le.clusters||dt[le.zbee_device_type]||[6],Zt={zbee_ieee:le.zbee_ieee||"",zbee_endpoint:parseInt(le.zbee_endpoint)||1,clusters:pt,zbee_label:le.zbee_label||"",onoff:le.onoff||0,brightness:le.brightness,color:le.color,color_hex:le.color_hex},$t=(ne,we)=>{const Ie=Array.isArray(ne)?[...ne].sort():[ne||6],De=Array.isArray(we)?[...we].sort():[we||6];return Ie.length===De.length&&Ie.every((Ce,_e)=>Ce===De[_e])},Yt=Zt.onoff!==ce.onoff,ae=Zt.zbee_ieee!==ce.zbee_ieee||String(Zt.zbee_endpoint)!==String(ce.zbee_endpoint)||!$t(Zt.clusters,ce.clusters)||Zt.zbee_label!==ce.zbee_label||Zt.brightness!==ce.brightness||Zt.color_hex!==ce.color_hex;!Yt&&!ae||(de.current=Date.now(),k(ne=>ne.map(we=>we.id===le.id?le:we)),Yt&&fetch("/api/zigbee/command",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:le.id,onoff:Zt.onoff})}).catch(ne=>console.error("Error sending command:",ne)),ae&&fetch("/api/zigbee/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:le.id,ieee:Zt.zbee_ieee,ep:Zt.zbee_endpoint,clusters:JSON.stringify(Zt.clusters),info:Zt.zbee_label,onoff:Zt.onoff,brightness:Zt.brightness,color_hex:Zt.color_hex})}).catch(ne=>console.error("Error saving config:",ne)),be.current.delete(le.id),ue.current[le.id]={...Zt},setTimeout(()=>{de.current=0},3e3))},Ee=le=>{fetch("/api/zigbee/rescan",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:le.id})}).then(ce=>ce.json()).then(()=>{k(ce=>ce.map(dt=>dt.id===le.id?{...dt,clusters:[6],zbee_device_type:"socket"}:dt))}).catch(ce=>console.error("Error triggering rescan:",ce))},Me=le=>{switch(le){case"lamp":return"Color Lamp";case"dimmer":return"Dimmer";case"trigger":return"Кнопка";default:return"Socket"}},ve=({title:le})=>Et`<th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">${le}</th>`;return $.length?Et`
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
                      <${ve} title="ID" />
                      <${ve} title="IEEE Address" />
                      <${ve} title="Type" />
                      <${ve} title="Info" />
                      <${ve} title="On/Off" />
                      <${ve} title="Action" />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${(()=>{const le={};$.forEach(dt=>{le[dt.zbee_ieee]||(le[dt.zbee_ieee]=[]),le[dt.zbee_ieee].push(dt)});const ce=[];return Object.values(le).forEach(dt=>{const pt=dt[0],Zt=dt.length>1&&dt.some(ne=>ne.ep>0),$t=pt.zbee_device_type||"socket",Yt=Zt?"Multi":$t,ae=!!se[pt.zbee_ieee];ce.push(Et`
                          <tr class="hover:bg-slate-200/80 transition-colors bg-white/80 ${Zt?"cursor-pointer":""}"
                              onClick=${Zt?()=>ke(pt.zbee_ieee):void 0}>
                            <td class="px-6 py-2 text-sm text-slate-800" style="position:relative">
                              ${Zt?Et`<span style="position:absolute;left:60px" class="text-slate-500">${ae?"▼":"▶"}</span>`:""}${pt.display_id||pt.id}
                            </td>
                            <td class="px-6 py-2 text-sm text-slate-800 font-mono">${pt.zbee_ieee||"—"}</td>
                            <td class="px-6 py-2 text-sm text-slate-700">
                              ${Zt?Et`Multi <span class="text-xs text-slate-400">×${dt.length}</span>`:Me(Yt)}
                            </td>
                            <td class="px-6 py-2 text-sm text-slate-600">${pt.zbee_label||""}</td>
                            <td class="px-6 py-2" onClick=${ne=>ne.stopPropagation()}>
                              <${MyPolzunok} value=${pt.onoff||0} disabled=${be.current.has(pt.id)} onChange=${ne=>{Zt&&dt.forEach(we=>{$e(we,ne===1)}),$e(pt,ne)}} />
                            </td>
                            <td class="px-6 py-2 text-sm flex gap-2" onClick=${ne=>ne.stopPropagation()}>
                              <button
                                onClick=${()=>Se(pt)}
                                class="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600"
                              >
                                ${st==="ru"?"Управление":"Control"}
                              </button>
                              <button
                                onClick=${()=>{ee(pt.zbee_ieee),fetch("/api/zigbee/learn/start",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ieee:pt.zbee_ieee})}).catch(ne=>console.error("Error starting learn:",ne))}}
                                style="background: linear-gradient(to right, #6366f1, #8b5cf6);"
                                class="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 hover:opacity-90"
                              >
                                ${st==="ru"?"Обучение":"Learn"}
                              </button>
                            </td>
                          </tr>
                        `),Zt&&ae&&dt.slice(1).forEach((ne,we)=>{const Ie=(ne.clusters||[]).includes(8)?"Dimmer":(ne.clusters||[]).includes(768)?"Color":"On/Off";ce.push(Et`
                              <tr class="hover:bg-slate-200/80 transition-colors bg-white/60"
                                  style="font-size:0.9em;">
                                <td class="px-6 py-2 text-sm font-mono"
                                    style="padding-left:60px; color:#6b7fa3;">${ne.display_id||ne.id}</td>
                                <td class="px-6 py-2 text-sm font-mono"
                                    style="border-left:3px solid var(--accent-color, #06b6d4); padding-left:60px; color:#6b7fa3;">↳ EP${ne.ep}</td>
                                <td class="px-6 py-2 text-sm" style="padding-left:60px; color:#6b7fa3;">${Ie}</td>
                                <td class="px-6 py-2 text-sm" style="padding-left:60px; color:#6b7fa3;">${ne.zbee_label||""}</td>
                                <td class="px-6 py-2" style="padding-left:60px;">
                                  <${MyPolzunok} value=${ne.onoff||0} disabled=${(pt.onoff||0)===0||be.current.has(ne.id)} activeColor="linear-gradient(to right, #5b7093, #8599b8)" onChange=${De=>$e(ne,De)} />
                                </td>
                                <td class="px-6 py-2 text-sm flex gap-2">
                                  <button
                                    onClick=${()=>Se(ne)}
                                    class="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600"
                                  >
                                    ${st==="ru"?"Управление":"Control"}
                                  </button>
                                </td>
                              </tr>
                            `)})}),ce})()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      ${ct&&vt&&Et`
        <${ModalZigbee}
          device=${vt}
          allDevices=${$}
          onClose=${Pe}
          onUpdate=${xe}
          onRescan=${Ee}
          language=${st}
        />
      `}

      ${Xt&&Et`
        <${ModalLearn}
          ieee=${Xt}
          language=${st}
          onClose=${()=>ee(null)}
          onSaved=${()=>{ee(null),Te()}}
          onGoToButtonPin=${()=>{ee(null),window.location.href="/#/button"}}
        />
      `}
    </div>
  `:Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Zigbee Devices
        </div>
        <div class="text-center text-slate-500 text-lg py-12">
          ${st==="ru"?"Нет настроенных Zigbee устройств. Добавьте их на странице Select pin.":"No Zigbee devices configured. Add them on the Select pin page."}
        </div>
      </div>
    </div>
  `}const PRESETS$1={ru:[{value:"1",label:"Паяльная станция T max=125°C, T min=-55°C"},{value:"2",label:"Кулер / вентилятор T max=70°C, T min=-55°C"},{value:"3",label:"3D‑принтер (стол) T max=120°C, T min=0°C"},{value:"4",label:"Форточный нагреватель T max=60°C, T min=-55°C"},{value:"5",label:"Тёплый пол T max=45°C, T min=0°C"},{value:"6",label:"Холодильник T max=100°C, T min=-55°C"},{value:"7",label:"Аквариум / бойлер T max=80°C, T min=0°C"},{value:"8",label:"Инкубатор T max=45°C, T min=0°C"},{value:"9",label:"Теплица / комната T max=50°C, T min=-55°C"}],en:[{value:"1",label:"Soldering station T max=125°C, T min=-55°C"},{value:"2",label:"Cooler / fan T max=70°C, T min=-55°C"},{value:"3",label:"3D printer (table) T max=120°C, T min=0°C"},{value:"4",label:"Vent heater T max=60°C, T min=-55°C"},{value:"5",label:"Warm floor T max=45°C, T min=0°C"},{value:"6",label:"Refrigerator T max=100°C, T min=-55°C"},{value:"7",label:"Aquarium / boiler T max=80°C, T min=0°C"},{value:"8",label:"Incubator T max=45°C, T min=0°C"},{value:"9",label:"Greenhouse / room T max=50°C, T min=-55°C"}]},SENSOR_OPTIONS$1=[{value:"1",label:"DS18B20"},{value:"2",label:"DHT-22"}];function ModalPid({modalType:$,page:k,hideModal:st,closeOnOverlayClick:mt=!0,title:ct,selectedPid:_,handlePidChange:vt,language:te="en",modalClass:Xt,SliderComponent:ee=MyPolzunok}){const[se,oe]=ut((_==null?void 0:_.info)||""),[re,de]=ut((_==null?void 0:_.onoff)===1),[ue,be]=ut((_==null?void 0:_.selsens)||"1"),[fe,pe]=ut((_==null?void 0:_.sernum)||""),[ge,he]=ut((_==null?void 0:_.presets)||"1"),[Te,$e]=ut((_==null?void 0:_.tmpset)||""),[ke,Se]=ut((_==null?void 0:_.tmpcur)||""),[Pe,xe]=ut([]),[Ee,Me]=ut(Object.entries((_==null?void 0:_.pinact)||{})[0]||["",""]);lt(()=>{oe((_==null?void 0:_.info)||""),de((_==null?void 0:_.onoff)===1),be((_==null?void 0:_.selsens)||"1"),pe((_==null?void 0:_.sernum)||""),he((_==null?void 0:_.presets)||"1"),$e((_==null?void 0:_.tmpset)||""),Se((_==null?void 0:_.tmpcur)||""),Me(Object.entries((_==null?void 0:_.pinact)||{})[0]||["",""])},[_]),lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then($t=>{if(!$t.ok)throw new Error(`HTTP error! status: ${$t.status}`);return $t.json()}).then($t=>{if(!$t||!$t.data||!Array.isArray($t.data)){console.error("Invalid data format:",$t),xe([]);return}const Yt=$t.data.filter(ae=>ae.topin===5);xe(Yt)}).catch($t=>{console.error("Error fetching pin config:",$t),xe([])})},[_]);const ve=$t=>{$t.preventDefault();const Yt=Ee[0]&&Ee[1]!==void 0&&Ee[1]!=="",ae={id:_.id,pins:Ee[0],pinact:Yt?{[Ee[0]]:parseInt(Ee[1])}:{},selsens:ue,sernum:fe,presets:ge,tmpset:Te,tmpcur:ke,info:se,onoff:re?1:0};console.log("Data being sent to server:",ae),fetch("/api/pid/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ae)}).then(ne=>ne.json()).then(ne=>{console.log("Success:",ne),vt({..._,...ae}),st(),window.location.href="/#/pid"}).catch(ne=>{console.error("Error:",ne)})},le=$t=>{if(!$t.target.value)Me(["",""]);else{const Yt=$t.target.value.split("|");Me([Yt[0],Yt[1]])}},ce=PRESETS$1[te]||PRESETS$1.en,dt=()=>k==="TabPid"&&$==="edit"?Et`
        <form onsubmit=${ve}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                ${[{label:"ID",value:_.id},{label:"PWM Pin",value:Et`
                        <select
                          value=${Pe.some($t=>String($t.pins)===String(Ee[0]))?`${Ee[0]}|${Ee[1]}`:""}
                          onChange=${le}
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
                        value=${ue}
                        onChange=${$t=>be($t.target.value)}
                        class="border rounded p-2 w-full"
                      >
                        ${SENSOR_OPTIONS$1.map($t=>Et`
                            <option
                              value=${$t.value}
                              selected=${$t.value===ue}
                            >
                              ${$t.label}
                            </option>
                          `)}
                      </select>
                    `},{label:"Dev. ser. number",value:ue==="1"?Et`
                          <input
                            type="text"
                            value=${fe}
                            onInput=${$t=>pe($t.target.value)}
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
                        onChange=${$t=>he($t.target.value)}
                        class="border rounded p-2 w-full"
                      >
                        ${ce.map($t=>Et`
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
                        value=${Te}
                        onInput=${$t=>$e($t.target.value)}
                        class="border rounded p-2 w-full"
                        placeholder="°C"
                      />
                    `},{label:"t_current",value:Et`
                      <input
                        type="text"
                        value=${ke}
                        readOnly
                        class="border rounded p-2 w-full bg-gray-100 cursor-not-allowed"
                        placeholder="°C"
                      />
                    `},{label:"INFO",value:Et`
                      <input
                        type="text"
                        value=${se}
                        onInput=${$t=>oe($t.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    `},{label:"On/Off",value:Et`
                      <${ee}
                        value=${re}
                        onChange=${$t=>de($t)}
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
      `:null,pt=Et`
    <div class=${`modal ${Xt||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${$t=>mt&&$t.target===$t.currentTarget&&st()}
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
            ${dt()}
          </div>
        </div>
      </div>
    </div>
  `,Zt=at(null);return lt(()=>{const $t=document.createElement("div");return $t.id="modal-portal",document.body.appendChild($t),Zt.current=$t,()=>{O(null,$t),document.body.removeChild($t)}},[]),lt(()=>{Zt.current&&O(pt,Zt.current)}),null}function initGlobalTooltip$3(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(ct){clearTimeout(k),$.innerHTML=ct.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,vt=$.offsetHeight,te=window.innerWidth,Xt=ct.getBoundingClientRect();let ee=Xt.left+Xt.width/2-_/2;ee=Math.max(8,Math.min(ee,te-_-8));let se=Xt.top-vt-8;se<8&&(se=Xt.bottom+8),$.style.left=ee+"px",$.style.top=se+"px",$.style.opacity="1"})}function mt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",ct=>{const _=ct.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",ct=>{ct.target.closest("[data-tip]")&&mt()})}const PRESETS={ru:[{value:"1",label:"Паяльная станция T max=125°C, T min=-55°C"},{value:"2",label:"Кулер / вентилятор T max=70°C, T min=-55°C"},{value:"3",label:"3D‑принтер (стол) T max=120°C, T min=0°C"},{value:"4",label:"Форточный нагреватель T max=60°C, T min=-55°C"},{value:"5",label:"Тёплый пол T max=45°C, T min=0°C"},{value:"6",label:"Холодильник T max=100°C, T min=-55°C"},{value:"7",label:"Аквариум / бойлер T max=80°C, T min=0°C"},{value:"8",label:"Инкубатор T max=45°C, T min=0°C"},{value:"9",label:"Теплица / комната T max=50°C, T min=-55°C"}],en:[{value:"1",label:"Soldering station T max=125°C, T min=-55°C"},{value:"2",label:"Cooler / fan T max=70°C, T min=-55°C"},{value:"3",label:"3D printer (table) T max=120°C, T min=0°C"},{value:"4",label:"Vent heater T max=60°C, T min=-55°C"},{value:"5",label:"Warm floor T max=45°C, T min=0°C"},{value:"6",label:"Refrigerator T max=100°C, T min=-55°C"},{value:"7",label:"Aquarium / boiler T max=80°C, T min=0°C"},{value:"8",label:"Incubator T max=45°C, T min=0°C"},{value:"9",label:"Greenhouse / room T max=50°C, T min=-55°C"}]},SENSOR_OPTIONS=[{value:"1",label:"DS18B20"},{value:"2",label:"DHT-22"}],HELP_CONTENT$1={ru:Et`
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
  `,document.head.appendChild($)}function TabPid({}){const[$,k]=ut(null),[st,mt]=ut(null);at(null);const[ct,_]=ut(!1),[vt,te]=ut(null),[Xt,ee]=ut(null),[se,oe]=ut("ru"),[re,de]=ut(!1),[ue,be]=ut(0),[fe,pe]=ut(0),ge=at(!1);lt(()=>{initGlobalTooltip$3(),initTuneStyles()},[]),lt(()=>{let Yt=!0;return registerPoll("pid","/api/state/pid",function(ae){!Yt||ge.current||ae!=null&&Array.isArray(ae.pid)&&(k(ae.pid),oe(ae.lang||"ru"),typeof ae.pidline=="number"&&(pe(ae.pidline),be(ae.pidline)))},{immediate:!0}),function(){Yt=!1,unregisterPoll("pid")}},[]);const he=at(!0);lt(()=>{if(he.current){he.current=!1;return}Te(fe)},[fe]);const Te=Yt=>{ge.current=!0,fetch("/api/pidline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pidline:Yt})}).then(ae=>ae.json()).catch(ae=>console.error("Error sending PID line to stm32:",ae)).finally(()=>{setTimeout(()=>{ge.current=!1},1500)})},$e=()=>{if(ue<PID_MAX_SLOTS){const Yt=ue+1;be(Yt),pe(Yt)}},ke=()=>{if(ue>0){const Yt=ue-1;be(Yt),pe(Yt)}};if($===null)return Et`<div>Loading...</div>`;const Se=()=>({langtimers:se==="ru"?rulangtimers:enlangtimers,langpid:se==="ru"?rulangpid:enlangpid}),Pe=(Yt,ae)=>{const ne=Se(),Ie=(ne[Yt]&&ne[Yt][ae]?ne[Yt][ae]:"").split(" "),De=[];for(let Ce=0;Ce<Ie.length;Ce+=15)De.push(Ie.slice(Ce,Ce+15).join(" "));return De.join("<br>")},xe=(Yt,ae)=>{te(Yt),ee(ae),_(!0)},Ee=()=>{_(!1),te(null),ee(null)},Me=Yt=>{console.log("handlePidChange:",Yt),k($.map(ae=>ae.id===Yt.id?Yt:ae)),ge.current=!0,fetch("/api/pid/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Yt)}).then(ae=>ae.json()).then(ae=>{console.log("PID job updated successfully:",ae)}).catch(ae=>{console.error("Error updating PID job:",ae)}).finally(()=>{setTimeout(()=>{ge.current=!1},1500)})},ve=Yt=>{const ae=Yt.id,ne=Yt.tune_state||0;if(!(ne===TUNE_STEP||ne===TUNE_BIAS)){if(ne===TUNE_ERROR){le(ae);return}console.log("Run tune for id:",ae),fetch("/api/pid/tune",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ae,action:"start"})}).then(we=>we.json()).then(we=>{console.log("Tune start response:",we)}).catch(we=>{console.error("Error starting tune:",we)})}},le=Yt=>{console.log("Stop tune for id:",Yt),fetch("/api/pid/tune",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:Yt,action:"stop"})}).then(ae=>ae.json()).then(ae=>{console.log("Tune stop response:",ae)}).catch(ae=>{console.error("Error stopping tune:",ae)})},ce=PRESETS[se]||PRESETS.en,dt=Yt=>{const ae=ce.find(ne=>ne.value===String(Yt));return ae?ae.label:Yt},pt=Yt=>{const ae=SENSOR_OPTIONS.find(ne=>ne.value===String(Yt));return ae?ae.label:Yt},Zt=Yt=>Et`
    <th
      class="px-4 py-4 text-base font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Pe("langpid",Yt.tooltipIndex)}
    >
      ${Yt.title}
    </th>
  `,$t=(Yt,ae)=>{const ne=Yt.tune_state||0,we=Yt.tune_progress||0,Ie=ne===TUNE_STEP||ne===TUNE_BIAS,De=ne===TUNE_DONE,Ce=ne===TUNE_ERROR,_e=De?"background:linear-gradient(to right,#4ade80,#10b981);box-shadow:0 4px 14px rgba(16,185,129,0.4);":Ce?"background:linear-gradient(to right,#dc2626,#b91c1c);box-shadow:0 4px 14px rgba(220,38,38,0.5);animation:tuneBlink 1s ease-in-out infinite;":"background:linear-gradient(to right,#ef4444,#e11d48);box-shadow:0 4px 14px rgba(239,68,68,0.4);",ie="px-3 py-1 rounded-full text-sm font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap",ye=De?"Tuning Done":Ce?"⚠ Error!":"Run tune";if(Ie){const me=we.toFixed(1),Le=`Auto Tune (${ne===TUNE_STEP?"Step test":"Bias search"})… ${we}%`;return Et`
        <tr key=${Yt.id} class="${ae%2===1?"bg-white/80":"bg-sky-200/40"}">
          <td colspan="11" class="px-2 py-2">
            <div style="position:relative;width:100%;height:2.5rem;border-radius:0.75rem;overflow:hidden;background:#d1d5db;box-shadow:inset 0 2px 6px rgba(0,0,0,0.12);">
              <div
                style="position:absolute;left:0;top:0;bottom:0;width:${me}%;background:linear-gradient(90deg,#22c55e 0%,#16a34a 60%,#4ade80 100%);border-radius:inherit;transition:width 0.3s ease;box-shadow:0 0 14px rgba(34,197,94,0.55);"
              ></div>
              <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;user-select:none;">
                <span style="font-size:0.875rem;font-weight:700;color:#111827;white-space:nowrap;">${Le}</span>
              </div>
            </div>
          </td>
          <td class="px-4 py-2 text-center">
            <button
              onclick=${()=>le(Yt.id)}
              class="px-3 py-1 rounded-full text-sm font-bold text-white whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95"
              style="background:linear-gradient(to right,#f97316,#ef4444);box-shadow:0 4px 14px rgba(239,68,68,0.4);"
            >Stop</button>
          </td>
        </tr>
      `}return Et`
      <tr key=${Yt.id} class="${ae%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-4 py-3 text-sm text-slate-800 font-medium">${Yt.id}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">
          ${(()=>{const me=Object.entries(Yt.pinact||{});if(!me.length)return"—";const[Oe,Le]=me[0];return`${Oe}(${Le})`})()}
        </td>
        <td class="px-4 py-3 text-sm text-slate-700">${pt(Yt.selsens)}</td>
        <td class="px-4 py-3 text-sm font-mono ${Yt.selsens==="1"?"text-slate-700":"text-slate-400 italic"}">${Yt.selsens==="1"?Yt.sernum||"—":"N/A"}</td>
        <td class="px-4 py-3 text-sm text-slate-700">${dt(Yt.presets)}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">${Yt.tmpset}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">${Yt.tmpcur}</td>
        <td class="px-4 py-3 text-sm text-slate-800 font-mono ${Yt.onoff?"":"text-rose-500 font-bold"}">${Yt.onoff?Yt.duty!==void 0?Yt.duty:"—":"OFF"}</td>
        <td class="px-4 py-3 text-sm text-slate-600">${Yt.info}</td>
        <td class="px-4 py-3">
          <${MyPolzunok}
            value=${Yt.onoff}
            onChange=${me=>Me({...Yt,onoff:me})}
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
            onclick=${()=>ve(Yt)}
            class="${ie}"
            style="${_e}"
          >${ye}</button>
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
          ${ue>0?Et`
              <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
                <div class="overflow-x-auto w-full">
                  <table class="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                      <tr class="bg-teal-600/10 border-b border-teal-600/20">
                        <${Zt} title="No" tooltipIndex=${1} />
                        <${Zt} title="PWM Pin" tooltipIndex=${2} />
                        <${Zt} title="Sel. sensor" tooltipIndex=${3} />
                        <${Zt} title="Dev. ser. number" tooltipIndex=${4} />
                        <${Zt} title="Presets" tooltipIndex=${5} />
                        <${Zt} title="T set." tooltipIndex=${6} />
                        <${Zt} title="T cur." tooltipIndex=${7} />
                        <${Zt} title="Duty" tooltipIndex=${8} />
                        <${Zt} title="Info" tooltipIndex=${9} />
                        <${Zt} title="On/Off" tooltipIndex=${10} />
                        <${Zt} title="Action" tooltipIndex=${11} />
                        <${Zt} title="Auto tune" tooltipIndex=${12} />
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-white/40">
                      ${Array.from({length:ue},(Yt,ae)=>{const ne=$&&$[ae]?$[ae]:{id:ae+1,pins:"",pinact:{},selsens:"",sernum:"",presets:"",tmpset:"",tmpcur:"",info:"",onoff:0,tune_state:0,tune_progress:0};return $t(ne,ae)})}
                    </tbody>
                  </table>
                </div>
              </div>
            `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No PID jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>de(!re)}
          >
            ${re?"Hide Help":"Show Help"}
          </button>
          <div class="font-semibold text-slate-600 tracking-wide">
            ${$&&PID_MAX_SLOTS-ue>0?`Still available: ${PID_MAX_SLOTS-ue} PID jobs`:"No available: PID jobs!"}
          </div>
          <div class="flex gap-2">
            ${ue<PID_MAX_SLOTS?Et`
            <button
                class="bg-emerald-500 hover:bg-emerald-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-emerald-500/30"
                onclick=${$e}
                title="Add PID"
            >+</button>
            `:null}
            ${ue>0?Et`
                <button
                  class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                  onclick=${ke}
                  title="Remove PID"
                >-</button>
              `:null}
          </div>
        </div>
      </div>

      ${re&&Et`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">
          ${HELP_CONTENT$1[se]||HELP_CONTENT$1.en}
        </div>
      `}

      ${ct?Et`
        <${ModalPid}
          modalType=${vt}
          page="TabPid"
          hideModal=${Ee}
          title="Edit PID"
          selectedPid=${Xt}
          handlePidChange=${Me}
          language=${se}
          modalClass="mt-24"
        />
      `:null}
    </div>
  `}function ModalEditSensor({typsensor:$,oneWireId:k,pins:st,onClose:mt,onUpdate:ct,sensorType:_,sensorData:vt,closeOnOverlayClick:te=!0}){const[Xt,ee]=ut({ut:(vt==null?void 0:vt.ut)||$.ut,lt:(vt==null?void 0:vt.lt)||$.lt,action_ut:(vt==null?void 0:vt.action_ut)||$.action_ut,action_lt:(vt==null?void 0:vt.action_lt)||$.action_lt,upphumid:(vt==null?void 0:vt.upphumid)||$.upphumid||0,humlolim:(vt==null?void 0:vt.humlolim)||$.humlolim||0,actuphum:(vt==null?void 0:vt.actuphum)||$.actuphum||"",actlowhum:(vt==null?void 0:vt.actlowhum)||$.actlowhum||"",info:(vt==null?void 0:vt.info)||$.info,onoff:(vt==null?void 0:vt.onoff)||$.onoff||0,humidity:(vt==null?void 0:vt.humidity)||$.humidity||0}),[se,oe]=ut(!1),re=(he,Te,$e)=>{if(he===""||he==="-")return he;const ke=he.replace(",",".");if(!/^-?\d*\.?\d*$/.test(ke))return null;const Se=parseFloat(ke);return isNaN(Se)||Se<Te||Se>$e?null:ke},de=he=>{const{name:Te,value:$e}=he.target;if(["ut","lt"].includes(Te)){const ke=re($e,-55,125);ke!==null&&ee(Se=>({...Se,[Te]:ke}))}else if(["upphumid","humlolim"].includes(Te)){const ke=re($e,0,100);ke!==null&&ee(Se=>({...Se,[Te]:ke}))}else ee(ke=>({...ke,[Te]:$e}))},ue=he=>{const Te=["ut","lt","upphumid","humlolim"],$e={...he};return Te.forEach(ke=>{$e[ke]===""||$e[ke]==="-"?$e[ke]=0:$e[ke]=parseFloat($e[ke].toString().replace(",","."))}),$e},pe=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onclick=${he=>{te&&he.target===he.currentTarget&&mt()}}
    >
      <div
        class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
        style="max-height: 90vh; overflow-y: auto;"
      >
        <div class="modal-header flex justify-between items-center border-b pb-4 mb-4">
          <h5 class="text-xl font-bold">Edit Sensor</h5>
          <button
            class="close-button text-gray-500 hover:text-gray-700"
            onclick=${mt}
          >
            Close
          </button>
        </div>
        <form onsubmit=${async he=>{he.preventDefault(),oe(!0);const Te=ue(Xt);try{if(!(await fetch("/api/sensor/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:k,pins:st,sensorNumber:$.s_number,...Te,s_number:$.s_number,t:$.t})})).ok)throw new Error("Network response was not ok");ct({...$,...Te,oneWireId:k,pins:st,s_number:$.s_number,t:$.t}),mt()}catch($e){console.error("Error updating Sensor:",$e)}finally{oe(!1)}}}>
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
                      oninput=${de}
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
                      oninput=${de}
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
                      oninput=${de}
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
                      oninput=${de}
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
                            oninput=${de}
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
                            oninput=${de}
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
                            oninput=${de}
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
                            oninput=${de}
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
                      oninput=${de}
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
  `,ge=at(null);return lt(()=>{const he=document.createElement("div");return he.id="modal-portal-sensor",document.body.appendChild(he),ge.current=he,()=>{O(null,he),document.body.removeChild(he)}},[]),lt(()=>{ge.current&&O(pe,ge.current)}),null}function ModalOneWire({oneWire:$,onClose:k,onUpdate:st,refresh:mt,closeOnOverlayClick:ct=!0}){console.log("oneWire object:",$);const[_,vt]=ut({typsensor:$.typsensor,numdevices:$.numdevices}),[te,Xt]=ut(!1),[ee,se]=ut($.onoff||0),oe=pe=>{ct&&pe.target===pe.currentTarget&&k()},re=pe=>{const{name:ge,value:he}=pe.target;let Te={..._,[ge]:parseInt(he,10)};ge==="typsensor"&&(he==="0"?Te.numdevices=0:he==="2"&&(Te.numdevices=1)),vt(Te)},de=pe=>{se(pe)},be=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onclick=${oe}
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
            disabled=${te}
          >
            Close
          </button>
        </div>
        <form onsubmit=${async pe=>{pe.preventDefault(),Xt(!0);const ge={id:$.id,pin:$.pin,typsensor:_.typsensor,numdevices:_.numdevices,onoff:ee};console.log("Sending data:",ge);try{if(!(await fetch("api/onewire/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ge)})).ok)throw new Error("Network response was not ok");const Te={...$,..._,onoff:ee};st(Te),k()}catch(he){console.error("Error updating OneWire:",he)}finally{Xt(!1)}}}>
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
                      value=${_.numdevices}
                      oninput=${_.typsensor===1?re:void 0}
                      class="border rounded p-2 w-full ${_.typsensor!==1?"bg-gray-100":""}"
                      min="0"
                      max="10"
                      readonly=${_.typsensor!==1}
                      disabled=${te}
                    />
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="p-2 font-bold">On/Off</td>
                  <td class="p-2">
                    <${MyPolzunok}
                      value=${ee}
                      onChange=${de}
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
  `,fe=at(null);return lt(()=>{const pe=document.createElement("div");return pe.id="modal-portal-onewire",document.body.appendChild(pe),fe.current=pe,()=>{O(null,pe),document.body.removeChild(pe)}},[]),lt(()=>{fe.current&&O(be,fe.current)}),null}function initGlobalTooltip$2(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(ct){clearTimeout(k),$.innerHTML=ct.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,vt=$.offsetHeight,te=window.innerWidth,Xt=ct.getBoundingClientRect();let ee=Xt.left+Xt.width/2-_/2;ee=Math.max(8,Math.min(ee,te-_-8));let se=Xt.top-vt-8;se<8&&(se=Xt.bottom+8),$.style.left=ee+"px",$.style.top=se+"px",$.style.opacity="1"})}function mt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",ct=>{const _=ct.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",ct=>{ct.target.closest("[data-tip]")&&mt()})}const _stateLabel=$=>$==="1"?"ON":$==="0"?"OFF":$==="2"?"TG":$??"?",_stateColor=$=>$==="1"?"#16a34a":$==="0"?"#dc2626":$==="2"?"#d97706":"#64748b",_parseAction=$=>$?$.split(",").map(k=>{const[st,mt]=k.trim().split(":");return{pin:st==null?void 0:st.trim(),state:mt==null?void 0:mt.trim()}}).filter(k=>k.pin!==void 0&&k.pin!==""):[],ActionBadge=({isUpper:$,isHumid:k,value:st,unit:mt,str:ct})=>{const _=_parseAction(ct),vt=(k?"💧 ":"")+($?"↑":"↓");return Et`
    <span style="display:inline-flex;align-items:center;gap:4px;background:${$?"#fff7ed":"#eff6ff"};border:1.5px solid ${$?"#fdba74":"#93c5fd"};border-radius:10px;padding:3px 10px;font-size:12px;font-weight:600;white-space:nowrap;line-height:1.6;">
      <span style="color:${$?"#9a3412":"#1e3a5f"};margin-right:2px;">${vt} ${st??"—"}${mt}:</span>
      ${_.length===0?Et`<span style="color:#94a3b8;">[—]</span>`:Et`
          <span style="color:#475569;">[</span>
          ${_.map(({pin:se,state:oe},re)=>Et`
            <span>
              <span style="color:#94a3b8;font-weight:400;">id</span><span style="color:#334155;font-weight:700;">${se}</span><span style="color:#475569;">:</span><span style="color:${_stateColor(oe)};font-weight:700;">${_stateLabel(oe)}</span>${re<_.length-1?Et`<span style="color:#94a3b8;">,${" "}</span>`:""}
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
  `},TabOneWire=()=>{const[$,k]=ut([]),[st,mt]=ut(null),[ct,_]=ut(!1),[vt,te]=ut(null),[Xt,ee]=ut(null),[se,oe]=ut("ru"),[re,de]=ut(!1),[ue,be]=ut({}),fe={ru:{colId:"ID",colPin:"Пин",colSensor:"Выбранный сенсор",colCount:"Кол-во сенсоров",colOnOff:"Вкл/Выкл",colActions:"Действия",noSensors:"Нет сенсоров для этого OneWire пина.",noData:"Нет данных сенсора для этого OneWire пина.",noPins:"Нет настроенных OneWire пинов!",errFetch:dt=>`Ошибка получения данных: ${dt}`,edit:"Ред.",showHelp:"Показать справку",hideHelp:"Скрыть справку",title:"OneWire(s) pin(s)"},en:{colId:"ID",colPin:"Pin",colSensor:"Selected sensor",colCount:"Count of sensors",colOnOff:"On/Off",colActions:"Actions",noSensors:"No connected sensors for this OneWire pin.",noData:"No sensor data available for this OneWire pin.",noPins:"No available pins configured as OneWire!",errFetch:dt=>`Error fetching sensor data: ${dt}`,edit:"Edit",showHelp:"Show Help",hideHelp:"Hide Help",title:"OneWire(s) pin(s)"}},pe=fe[se]||fe.en,ge=dt=>be(pt=>({...pt,[dt]:!pt[dt]})),he=dt=>typeof dt=="string"?dt.replace(/[^\x20-\x7E\u0400-\u04FF]/g,""):dt;lt(()=>{initGlobalTooltip$2()},[]);const Te=dt=>{dt&&k(pt=>pt.map(Zt=>{const $t=Zt.typsensor||Zt.typsensr;if(!Zt.sensors||![1,2].includes($t))return Zt;const Yt=Zt.sensors.map(ae=>{var ne,we;if($t===1){const Ie=(ne=dt.ds18b20)==null?void 0:ne.find(De=>De.addr===ae.s_number);return Ie?{...ae,t:Ie.temp}:ae}else if($t===2){const Ie=(we=dt.dht22)==null?void 0:we.find(De=>De.id===Zt.id);return Ie?{...ae,t:Ie.temp,humidity:Ie.humidity}:ae}return ae});return{...Zt,sensors:Yt}}))},$e=()=>{registerPoll("onewire_init","/api/onewire/get",function(dt){oe(dt.lang||"ru"),k(dt.pins||[]),mt(null),registerPoll("sensors","/api/state/sensors",function(pt){pt!=null&&Te(pt)},{immediate:!0})},{immediate:!0,oneShot:!0})};lt(()=>($e(),function(){unregisterPoll("onewire_init"),unregisterPoll("sensors")}),[]);const ke=()=>{_(!1),te(null),ee(null)},Se=dt=>{k(pt=>pt.map(Zt=>{var $t;return Zt.id===dt.oneWireId?{...Zt,sensors:($t=Zt.sensors)==null?void 0:$t.map(Yt=>Yt.s_number===dt.s_number?{...Yt,...dt}:Yt)}:Zt})),ke()},Pe=dt=>{ee(dt),_(!0)},xe=dt=>{const pt=se==="ru"?rulange1Wire:enlange1Wire,$t=(pt&&pt[dt]?pt[dt]:"").split(" "),Yt=[];for(let ae=0;ae<$t.length;ae+=15)Yt.push($t.slice(ae,ae+15).join(" "));return Yt.join("<br>")},Ee=({title:dt,tooltipIndex:pt})=>Et`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help" data-tip=${xe(pt)}>
      ${dt}
    </th>
  `,Me=({device:dt,index:pt})=>{const Zt=!!ue[dt.id],$t=dt.typsensor||dt.typsensr||0,Yt=dt.numdevices||dt.numsens||0,ae=$t!==0&&Yt>0;return Et`
      <tbody key=${"db-"+dt.id}>
        <tr class="${pt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors ${ae?"cursor-pointer":""}" onclick=${()=>ae&&ge(dt.id)}>
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${dt.id}</td>
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${dt.pins||dt.pin}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${["None","DS18B20","DHT22"][$t]}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${Yt}</td>
          <td class="px-6 py-4" onclick=${ne=>ne.stopPropagation()}>
            <${MyPolzunok} value=${dt.onoff||0} onChange=${ne=>ce({...dt,onoff:ne})} />
          </td>
          <td class="px-6 py-4" onclick=${ne=>ne.stopPropagation()}>
            <button class="text-blue-600 hover:text-blue-800 font-semibold transition-colors" onclick=${()=>Pe(dt)}>${pe.edit}</button>
            ${ae&&Et`<span class="ml-3 text-slate-400 text-xs">${Zt?"▲":"▼"}</span>`}
          </td>
        </tr>
        ${Zt&&ae?Et`
          <tr>
            <td colspan="6" class="px-4 py-3 bg-gradient-to-r from-cyan-50/80 via-slate-50/60 to-blue-50/80 border-t">
              <${ve} d=${dt} />
            </td>
          </tr>
        `:""}
      </tbody>
    `},ve=({d:dt})=>{const pt=dt.typsensor||dt.typsensr||0,Zt=dt.numdevices||dt.numsens||0;if(pt===0||Zt===0)return Et`<div class="px-4 py-2 text-slate-500 font-medium">${pe.noSensors}</div>`;let $t=dt.sensors||[];const Yt=["bg-cyan-50/60 border-cyan-200/50","bg-slate-100/70 border-slate-200/50"];return $t.length>0&&Object.keys($t).length>0?Et`<div class="flex flex-col gap-2 w-full">${$t.map((ae,ne)=>Et`
          <div class="w-full flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 rounded-xl border ${Yt[ne%2]} backdrop-blur-sm shadow-sm">
            ${pt===2?Et`<span class="font-mono text-base font-semibold text-teal-700">DHT22</span>`:Et`
              <span class="flex items-center gap-2">
                <span class="font-mono text-base font-semibold text-slate-500">SN</span>
                <span class="font-mono text-base text-slate-700 select-all">${he(ae.s_number)}</span>
                <button class="px-4 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${we=>{we.stopPropagation(),navigator.clipboard.writeText(he(ae.s_number)),we.target.textContent="Copied!",setTimeout(()=>we.target.textContent="copy SN",1500)}}>copy SN</button>
              </span>
            `}
            <span class="text-slate-300">|</span>
            <span class="font-bold text-cyan-700">${ae.t??"—"}°C 🌡</span>
            ${pt===2&&"humidity"in ae?Et`<span class="font-bold text-teal-600">${ae.humidity}% 💧</span>`:""}
            <span class="text-slate-300">|</span>
            <${ActionBadge} isUpper=${!0} value=${ae.ut} unit="°C" str=${ae.action_ut} />
            <${ActionBadge} isUpper=${!1} value=${ae.lt} unit="°C" str=${ae.action_lt} />
            <a href="#" class="ml-auto text-blue-600 font-semibold text-sm uppercase px-3 py-1 bg-white/70 rounded-lg" onclick=${we=>{we.preventDefault(),te({...ae,oneWireId:dt.id,sensorType:pt,pins:dt.pins||dt.pin}),_(!0)}}>${pe.edit}</a>
          </div>
        `)}</div>`:Et`<div class="px-4 py-4 text-slate-500 font-medium bg-white/50 rounded-xl text-center w-full">${pe.noData}</div>`},le=dt=>{k(pt=>pt.map(Zt=>Zt.id===dt.id?dt:Zt)),ke()},ce=dt=>{k(pt=>pt.map(Zt=>Zt.id===dt.id?{...Zt,onoff:dt.onoff}:Zt))};return Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col items-center">
      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 uppercase">${pe.title}</div>
        <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
          <table class="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr class="bg-teal-600/10 border-b border-teal-600/20">
                <${Ee} title=${pe.colId} tooltipIndex=${1} />
                <${Ee} title=${pe.colPin} tooltipIndex=${2} />
                <${Ee} title=${pe.colSensor} tooltipIndex=${3} />
                <${Ee} title=${pe.colCount} tooltipIndex=${4} />
                <${Ee} title=${pe.colOnOff} tooltipIndex=${5} />
                <${Ee} title=${pe.colActions} tooltipIndex=${6} />
              </tr>
            </thead>
            ${$.length>0?$.map((dt,pt)=>Et`<${Me} device=${dt} index=${pt} key=${dt.id} />`):Et`<tbody><tr><td colspan="6" class="px-4 py-2">${st?pe.errFetch(st):pe.noPins}</td></tr></tbody>`}
          </table>
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-2xl">
          <button class="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${()=>de(!re)}>
            ${re?pe.hideHelp:pe.showHelp}
          </button>
        </div>
        ${re&&Et`<div class="mt-2 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner w-full">${HELP_CONTENT[se]||HELP_CONTENT.en}</div>`}
      </div>
    </div>
    ${ct&&(vt?Et`<${ModalEditSensor} typsensor=${vt} oneWireId=${vt.oneWireId} pins=${vt.pins} onClose=${ke} onUpdate=${Se} sensorType=${vt.sensorType} closeOnOverlayClick=${!0} refresh=${$e} />`:Et`<${ModalOneWire} oneWire=${Xt} onClose=${ke} onUpdate=${le} closeOnOverlayClick=${!0} refresh=${$e} />`)}
  `};function ModalSIM800L({hideModal:$,title:k,selectedGps:st,onSave:mt}){const[ct,_]=ut((st==null?void 0:st.tel)||""),[vt,te]=ut((st==null?void 0:st.info)||""),[Xt,ee]=ut((st==null?void 0:st.onoff)===1),[se,oe]=ut(!0),re=pe=>/^\+\d{11,20}$/.test(pe),be=Et`
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

          <form onSubmit=${pe=>{if(pe.preventDefault(),!se)return;const ge={type:"sim800l",tel:ct,info:vt,onoff:Xt?1:0};console.log("Сохраняемые данные:",ge),fetch("/api/security/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ge)}).then(he=>he.json()).then(he=>{typeof mt=="function"&&mt(ge),$()}).catch(he=>{console.error("Error:",he)})}}>
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
                        value=${ct}
                        onInput=${pe=>{const ge=pe.target.value;_(ge),oe(re(ge))}}
                        class=${`border rounded p-2 w-full ${!se&&ct!==""?"border-red-500":""}`}
                        placeholder="+XXXXXXXXXXX"
                      />
                      ${!se&&ct!==""?Et`
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
                        onInput=${pe=>te(pe.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${MyPolzunok} value=${Xt} onChange=${ee} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                disabled=${!se||ct===""}
                class=${`font-bold py-2 px-4 rounded ${se&&ct!==""?"bg-blue-500 hover:bg-blue-700 text-white":"bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,fe=at(null);return lt(()=>{const pe=document.createElement("div");return pe.id="modal-portal",document.body.appendChild(pe),fe.current=pe,()=>{O(null,pe),document.body.removeChild(pe)}},[]),lt(()=>{fe.current&&O(be,fe.current)}),null}const ModalSecurity=({modalType:$,page:k,hideModal:st,title:mt,selectedSecurity:ct,onSecurityChange:_,SliderComponent:vt=MyPolzunok})=>{const[te,Xt]=ut((ct==null?void 0:ct.info)||""),[ee,se]=ut((ct==null?void 0:ct.onoff)||0),[oe,re]=ut((ct==null?void 0:ct.ptype)||0),[de,ue]=ut((ct==null?void 0:ct.send_sms)||""),[be,fe]=ut((ct==null?void 0:ct.action)||""),[pe,ge]=ut([]),[he,Te]=ut({send_sms:null,action:null}),[$e,ke]=ut(null),Se=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,Pe=(pt,Zt)=>!Zt||Zt.trim()===""||Zt.toLowerCase()==="none"?null:pt==="action"?Se.test(Zt)?null:'Incorrect format. Use "None" or "pin:value" format.':Zt.length>100?"Text should not exceed 100 characters":null,xe=(pt,Zt)=>{const $t=Pe(pt,Zt);switch(Te(Yt=>({...Yt,[pt]:$t})),pt){case"send_sms":ue(Zt);break;case"action":fe(Zt);break}};lt(()=>{fetch("/api/security/get").then(pt=>pt.json()).then(pt=>{const Zt=pt.pins||pt;Array.isArray(Zt)?ge(Zt.filter($t=>$t.topin===2||$t.topin===11)):ge([])}).catch(pt=>{console.error("Error fetching pin config:",pt),ge([])})},[]);const Ee=pt=>{if(pt.preventDefault(),Object.values(he).some($t=>$t!==null)){ke("Please correct the errors before submitting.");return}const Zt={type:"monitoring",...ct,info:te,send_sms:de||"NO",action:be||"None",onoff:ee,ptype:oe};fetch("/api/security/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Zt)}).then($t=>{if(!$t.ok)throw new Error("Network response was not ok");return $t.json()}).then($t=>{if($t.error)throw new Error($t.error);_(Zt),st()}).catch($t=>{console.error("Error:",$t),ke("Failed to save changes. Please try again.")})},Me=()=>{re(0),ue(""),fe(""),Xt(""),se(0),Te({send_sms:null,action:null})},ce=Et`
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
            <h2 class="text-xl font-bold">${mt}</h2>
            <button
              onClick=${st}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          ${k==="TabSecurity"&&$==="connection"?Et`
    <form onSubmit=${Ee}>
      <div class="modal-body">
        <table class="table-auto w-full">
          <tbody>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">ID</td>
              <td class="p-2">${ct.id}</td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Pin</td>
              <td class="p-2">${ct.pins}</td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">Connection</td>
              <td class="p-2">
                <select
                  name="setrpins"
                  value=${pe.some(pt=>pt.pins===(ct==null?void 0:ct.setrpins))?ct==null?void 0:ct.setrpins:""}
                  onChange=${pt=>_({...ct,setrpins:pt.target.value})}
                  class="border rounded p-2 w-full"
                >
                  <option value="">Select a connection</option>
                  ${pe.map(pt=>Et`
                      <option value=${pt.pins}>
                        ${pt.pins} (ID: ${pt.id})
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
    <form onSubmit=${Ee}>
      <div class="modal-body">
        <table class="table-auto w-full">
          <tbody>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">ID</td>
              <td class="p-2">${ct.id}</td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Pin</td>
              <td class="p-2">${ct.pins}</td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">Ptype</td>
              <td class="p-2">
                <select
                  name="ptype"
                  value=${oe}
                  onChange=${pt=>re(parseInt(pt.target.value))}
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
                  value=${be}
                  onInput=${pt=>xe("action",pt.target.value)}
                  class="border rounded p-2 w-full ${he.action?"border-red-500":""}"
                  placeholder="None"
                />
                ${he.action&&Et`<p class="text-red-500 text-sm">${he.action}</p>`}
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Send SMS</td>
              <td class="p-2">
                <select
                  name="send_sms"
                  value=${de}
                  onchange=${pt=>xe("send_sms",pt.target.value)}
                  class="border rounded p-2 w-full ${he.send_sms?"border-red-500":""}"
                >
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                </select>
                ${he.send_sms&&Et` <p class="text-red-500 text-sm">${he.send_sms}</p> `}
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">INFO</td>
              <td class="p-2">
                <input
                  type="text"
                  name="info"
                  value=${te}
                  onInput=${pt=>Xt(pt.target.value)}
                  class="border rounded p-2 w-full"
                />
              </td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">On/Off</td>
              <td class="p-2">
                <${vt} value=${ee} onChange=${se} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-between mt-4">
        <button
          type="button"
          onClick=${Me}
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
      ${$e&&Et`<p class="text-red-500 mt-2">${$e}</p>`}
    </form>
  `}
        </div>
      </div>
    </div>
  `,dt=at(null);return lt(()=>{const pt=document.createElement("div");return pt.id="modal-portal",document.body.appendChild(pt),dt.current=pt,()=>{O(null,pt),document.body.removeChild(pt)}},[]),lt(()=>{dt.current&&O(ce,dt.current)}),null};function initGlobalTooltip$1(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(ct){clearTimeout(k),$.innerHTML=ct.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,vt=$.offsetHeight,te=window.innerWidth,Xt=ct.getBoundingClientRect();let ee=Xt.left+Xt.width/2-_/2;ee=Math.max(8,Math.min(ee,te-_-8));let se=Xt.top-vt-8;se<8&&(se=Xt.bottom+8),$.style.left=ee+"px",$.style.top=se+"px",$.style.opacity="1"})}function mt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",ct=>{const _=ct.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",ct=>{ct.target.closest("[data-tip]")&&mt()})}const TabSecurity=()=>{const[$,k]=ut({lang:"ru",sim800l:0,onoff:0,tel:"",info:""}),[st,mt]=ut(!1),[ct,_]=ut(!1),[vt,te]=ut([]),[Xt,ee]=ut(!1),[se,oe]=ut("ru"),[re,de]=ut(!1),[ue,be]=ut(""),[fe,pe]=ut(null),[ge,he]=ut(!1),[Te,$e]=ut("connected"),[ke,Se]=ut(0),Pe={ru:{titleSim:"SIM800L Settings",titlePins:"Security Pins",colRx:"RXD Pin",colTx:"TXD Pin",colPhone:"Phone Number",colInfo:"Info",colOnOff:"OnOff",colAction:"Action",colId:"ID",colPin:"Pin",colType:"Type of sensor",colSendSms:"Send SMS",colEditPin:"Edit Pin",notConfigured:"Не настроено",notSet:"Не задан",noInfo:"Нет инфо",noData:"Нет доступных данных мониторинга",edit:"Ред.",showHelp:"Показать справку",hideHelp:"Скрыть справку",connRetry:"Connection problems. Retrying...",connLost:"Connection lost. Check your internet connection."},en:{titleSim:"SIM800L Settings",titlePins:"Security Pins",colRx:"RXD Pin",colTx:"TXD Pin",colPhone:"Phone Number",colInfo:"Info",colOnOff:"OnOff",colAction:"Action",colId:"ID",colPin:"Pin",colType:"Type of sensor",colSendSms:"Send SMS",colEditPin:"Edit Pin",notConfigured:"Not configured",notSet:"Not set",noInfo:"No info",noData:"No monitoring data available",edit:"Edit",showHelp:"Show Help",hideHelp:"Hide Help",connRetry:"Connection problems. Retrying...",connLost:"Connection lost. Check your internet connection."}},xe=Pe[se]||Pe.en,Ee={ru:Et`
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
      </div>`},Me={ru:Et`
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
      </div>`};lt(()=>{initGlobalTooltip$1()},[]);const ve=pt=>{if(!(ge||Date.now()-ke<2e3)){if(!pt){$e("error");return}k({lang:pt.lang,sim800l:pt.sim800l,onoff:pt.onoff,tel:pt.tel,info:pt.info}),te(pt.pins||[]),$e("connected")}};lt(()=>{let pt=!0;return registerPoll("security","/api/state/security",function(Zt){pt&&Zt!=null&&(oe(Zt.lang||"ru"),ve(Zt))},{immediate:!0}),function(){pt=!1,unregisterPoll("security")}},[]);const le=async pt=>{he(!0);try{await fetch("/api/security/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"sim800l",...pt})}),k(pt),Se(Date.now())}finally{he(!1)}},ce=(pt,Zt)=>{const $t=pt&&pt[Zt]?pt[Zt]:"",Yt=[],ae=$t.split(" ");for(let ne=0;ne<ae.length;ne+=15)Yt.push(ae.slice(ne,ne+15).join(" "));return Yt.join("<br>")},dt=({title:pt,langArr:Zt,tooltipIndex:$t})=>Et`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help" data-tip=${ce(Zt,$t)}>${pt}</th>
  `;return Et`
    <div class="flex flex-col items-center w-full p-4">
      ${Te!=="connected"&&Et`
        <div class="w-full p-2 mb-4 text-white text-center rounded-xl shadow-md backdrop-blur-md ${Te==="error"?"bg-yellow-500/80":"bg-red-500/80"}">
          ${Te==="error"?xe.connRetry:xe.connLost}
        </div>
      `}
      <div class="flex flex-col items-center w-full p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 relative overflow-hidden">
        <div class="w-full mb-10">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">${xe.titleSim}</h2>
          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-teal-600/10 border-b border-teal-600/20">
                  <${dt} title=${xe.colRx} langArr=${se==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${1} />
                  <${dt} title=${xe.colTx} langArr=${se==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${2} />
                  <${dt} title=${xe.colPhone} langArr=${se==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${3} />
                  <${dt} title=${xe.colInfo} langArr=${se==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${4} />
                  <${dt} title=${xe.colOnOff} langArr=${se==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${5} />
                  <${dt} title=${xe.colAction} langArr=${se==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${6} />
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                <tr class="bg-white/80 hover:bg-slate-200/80 transition-colors">
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.sim800l===1?"PA3(1)":xe.notConfigured}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.sim800l===1?"PD5(35)":xe.notConfigured}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.tel||xe.notSet}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.info||xe.noInfo}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium"><${MyPolzunok} value=${$.onoff} onChange=${pt=>le({...$,onoff:pt})} /></td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium"><button onClick=${()=>mt(!0)} class="text-teal-600 hover:text-cyan-600 font-bold transition-colors">${xe.edit}</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-end mt-6 w-full"><button onclick=${()=>_(!ct)} class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40">${ct?xe.hideHelp:xe.showHelp}</button></div>
          ${ct&&Et`<div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">${Ee[se]}</div>`}
        </div>

        <div class="w-full">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">${xe.titlePins}</h2>
          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-teal-600/10 border-b border-teal-600/20">
                  <${dt} title=${xe.colId} langArr=${se==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${1} />
                  <${dt} title=${xe.colPin} langArr=${se==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${2} />
                  <${dt} title=${xe.colType} langArr=${se==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${3} />
                  <${dt} title=${xe.colAction} langArr=${se==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${4} />
                  <${dt} title=${xe.colSendSms} langArr=${se==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${5} />
                  <${dt} title=${xe.colInfo} langArr=${se==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${6} />
                  <${dt} title=${xe.colOnOff} langArr=${se==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${7} />
                  <${dt} title=${xe.colEditPin} langArr=${se==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${8} />
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                ${vt.length>0?vt.map((pt,Zt)=>Et`
                  <tr class="${Zt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${pt.id}</td><td class="px-6 py-4 text-sm text-slate-800 font-medium">${pt.pins}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${["PIR","Normal open","Normal close"][pt.ptype]}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${pt.action}</td><td class="px-6 py-4 text-sm text-slate-800 font-medium">${pt.send_sms}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${pt.info}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium"><${MyPolzunok} value=${pt.onoff} onChange=${$t=>{Se(Date.now()),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:pt.id,onoff:$t})}),te(Yt=>Yt.map(ae=>ae.id===pt.id?{...ae,onoff:$t}:ae))}} /></td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium"><button onClick=${()=>{pe(pt),be("edit"),de(!0)}} class="text-teal-600 hover:text-cyan-600 font-bold transition-colors">${xe.edit}</button></td>
                  </tr>`):Et`<tr><td colspan="8" class="px-6 py-4 text-center text-sm text-slate-600 font-medium">${xe.noData}</td></tr>`}
              </tbody>
            </table>
          </div>
          <div class="flex justify-end mt-6 w-full"><button onclick=${()=>ee(!Xt)} class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40">${Xt?xe.hideHelp:xe.showHelp}</button></div>
          ${Xt&&Et`<div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">${Me[se]}</div>`}
        </div>
      </div>
      ${st&&Et`<${ModalSIM800L} hideModal=${()=>mt(!1)} title=${xe.edit} selectedGps=${$} onSave=${le} />`}
      ${re&&Et`<${ModalSecurity} modalType=${ue} page="TabSecurity" hideModal=${()=>de(!1)} title=${xe.edit} selectedSecurity=${fe} onSecurityChange=${pt=>{te(Zt=>Zt.map($t=>$t.id===pt.id?pt:$t)),de(!1)}} />`}
    </div>
  `};function initGlobalTooltip(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"320px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(ct){clearTimeout(k),$.innerHTML=ct.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,vt=$.offsetHeight,te=window.innerWidth,Xt=ct.getBoundingClientRect();let ee=Xt.left+Xt.width/2-_/2;ee=Math.max(8,Math.min(ee,te-_-8));let se=Xt.top-vt-8;se<8&&(se=Xt.bottom+8),$.style.left=ee+"px",$.style.top=se+"px",$.style.opacity="1"})}function mt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",ct=>{const _=ct.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",ct=>{ct.target.closest("[data-tip]")&&mt()})}const SETTINGS_TIP_IDX={Login:1,Password:2,"Time zone UTC":3,"IP address":4,"Subnet mask":5,"Default gateway":6,Token:7,Host:8,Port:9,Client:10,User:11,"Password (MQTT)":12,"TX topic":13,"RX topic":14,"RX Z2M topic":26,"HTTPS domain":15,"Private Key":16,"Public Key":17,Longitude:18,Latitude:19,Sunrise:20,Sunset:21,"Day Length":22,"Next full moon":23,Date:24,Time:25},getTip=($,k,st,mt)=>{const ct=k==="ru"?st:mt,_=SETTINGS_TIP_IDX[$];if(!_||!ct||!ct[_])return"";const vt=ct[_].split(" "),te=[];for(let Xt=0;Xt<vt.length;Xt+=12)te.push(vt.slice(Xt,Xt+12).join(" "));return te.join("<br>")},FieldRow=({label:$,tipLabel:k,index:st,tip:mt,children:ct})=>{const _=st%2===0?"bg-white/80":"bg-sky-200/40";return Et`
    <tr class="transition-colors border-b border-slate-200 ${_} hover:bg-slate-200/80">
      <td
        class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
        data-tip=${mt}
      >
        ${$}
      </td>
      <td class="w-2/3 pl-4 py-4 pr-6">
        ${ct}
      </td>
    </tr>
  `},LOG_CATEGORIES=[{id:0,key:"SYSTEM",labelEn:"System",labelRu:"Система"},{id:1,key:"MQTT",labelEn:"MQTT",labelRu:"MQTT"},{id:2,key:"NET",labelEn:"Network",labelRu:"Сеть"},{id:3,key:"GSM",labelEn:"GSM",labelRu:"GSM"},{id:4,key:"SCHEDULER",labelEn:"Scheduler",labelRu:"Планировщик"},{id:5,key:"SENSORS",labelEn:"Sensors",labelRu:"Датчики"},{id:6,key:"PID",labelEn:"PID Controller",labelRu:"ПИД-регулятор"},{id:7,key:"SETTINGS",labelEn:"Settings",labelRu:"Настройки"},{id:8,key:"ETH",labelEn:"Ethernet",labelRu:"Ethernet"},{id:9,key:"PHY",labelEn:"PHY",labelRu:"PHY"},{id:10,key:"Z2M",labelEn:"Z2M",labelRu:"Z2M"}];function Settings({}){const[$,k]=ut({}),[st,mt]=ut(null),[ct,_]=ut(null),[vt,te]=ut({}),Xt=at(null),[ee,se]=ut(null),[oe,re]=ut(null),[de,ue]=ut(!1),[be,fe]=ut(!1),[pe,ge]=ut(!1),[he,Te]=ut(!1),[$e,ke]=ut(!1),[Se,Pe]=ut(!0),xe=at(0),[Ee,Me]=ut(!1);lt(()=>{if(initGlobalTooltip(),!document.getElementById("__network_toggle_style")){const ie=document.createElement("style");ie.id="__network_toggle_style",ie.textContent=".network-toggle span { display: none !important; }",document.head.appendChild(ie)}},[]);const ve=ie=>getTip(ie,$.lang||"ru",rulangsettings,enlangsettings),le=[{value:"en",label:"English"},{value:"ru",label:"Russian"}],ce=[[-12,"(GMT -12:00) Eniwetok, Kwajalein"],[-11,"(GMT -11:00) Midway Island, Samoa"],[-10,"(GMT -10:00) Hawaii"],[-9,"(GMT -9:00) Alaska"],[-8,"(GMT -8:00) Pacific Time (US & Canada)"],[-7,"(GMT -7:00) Mountain Time (US & Canada)"],[-6,"(GMT -6:00) Central Time (US & Canada), Mexico City"],[-5,"(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima"],[-4,"(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz"],[-3.3,"(GMT -3:30) Newfoundland"],[-3,"(GMT -3:00) Brazil, Buenos Aires, Georgetown"],[-2,"(GMT -2:00) Mid-Atlantic"],[-1,"(GMT -1:00) Azores, Cape Verde Islands"],[0,"(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca"],[1,"(GMT +1:00) Brussels, Copenhagen, Madrid, Paris"],[2,"(GMT +2:00) Kaliningrad, South Africa"],[3,"(GMT +3:00) Moscow, St. Petersburg, Baghdad, Riyadh"],[3.3,"(GMT +3:30) Tehran"],[4,"(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi"],[4.3,"(GMT +4:30) Kabul"],[5,"(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"],[5.3,"(GMT +5:30) Bombay, Calcutta, Madras, New Delhi"],[5.45,"(GMT +5:45) Kathmandu"],[6,"(GMT +6:00) Almaty, Dhaka, Colombo"],[7,"(GMT +7:00) Bangkok, Hanoi, Jakarta"],[8,"(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"],[9,"(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"],[9.3,"(GMT +9:30) Adelaide, Darwin"],[10,"(GMT +10:00) Eastern Australia, Guam, Vladivostok"],[11,"(GMT +11:00) Magadan, Solomon Islands, New Caledonia"],[12,"(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"]],dt=/^(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)$/,pt=ie=>{if(!ie)return{date:"",time:""};const ye=ie.match(/d:(\d{1,2}\.\d{1,2}\.\d{2})/),me=ie.match(/t:(\d{2}:\d{2}:\d{2})/);return{date:ye?ye[1]:"",time:me?me[1]:""}},Zt=ie=>{if(!/^\d{1,2}\.\d{1,2}\.\d{2}$/.test(ie))return!1;const[me,Oe,Le]=ie.split(".").map(Number);if(Oe<1||Oe>12||me<1||me>31||Le<0||Le>99)return!1;const Ne=new Date().getFullYear()%100;if(Le>Ne+5)return!1;const ze=new Date(2e3+Le,Oe,0).getDate();return!(me>ze)},$t=ie=>/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(ie),Yt=(ie,ye)=>{const me=Object.values(ye).some(Le=>Le!==null),Oe=ie.usehttps?ie.domain&&ie.domain.trim()!=="":!0;return!(me||!Oe)},ae=(ie,ye)=>{se({message:ie,type:ye}),setTimeout(()=>{se(null)},3e3)},ne=ie=>{re(ie),setTimeout(()=>{re(null)},3e3)},we=(ie,ye)=>{let me=null;if(!$.usehttps&&["domain","tls_key","tls_cert","tls_ca","telegram_token"].includes(ie))return null;if(!ye&&["ip_addr","gateway","mqtt_hst","sb_mask","offdate","offtime","domain"].includes(ie))return"Поле не может быть пустым";switch(ie){case"ip_addr":case"gateway":case"mqtt_hst":ye.length>50&&(me="Слишком длинное имя хоста");break;case"sb_mask":dt.test(ye)||(me="Неверная маска подсети");break;case"offdate":Zt(ye)||(me="Неверный формат даты (д.м.гг)");break;case"offtime":$t(ye)||(me="Неверный формат времени (чч:мм:сс)");break;case"domain":ye.length>50?me="Домен не должен превышать 50 символов":ye.match(/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/)||(me="Неверный формат домена");break;case"tls_key":ye&&ye.trim()!==""&&(ye.length>512?me="Private Key не должен превышать 512 символов":(!ye.includes("BEGIN EC PRIVATE KEY")||!ye.includes("END EC PRIVATE KEY"))&&(me="Неверный формат Private Key"));break;case"tls_cert":ye&&ye.trim()!==""&&(ye.length>1024?me="Public Key не должен превышать 1024 символов":(!ye.includes("BEGIN CERTIFICATE")||!ye.includes("END CERTIFICATE"))&&(me="Неверный формат Public Key"));break;case"tls_ca":ye&&ye.trim()!==""&&(ye.length>1024?me="Secret Key не должен превышать 1024 символов":(!ye.includes("BEGIN CERTIFICATE")||!ye.includes("END CERTIFICATE"))&&(me="Неверный формат Secret Key"));break}return me},Ie=ie=>{const ye=($.lang||"ru")==="ru";k(me=>({...me,log_filter_mask:ie})),fetch("/api/logfilter",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({mask:ie})}).then(me=>{if(!me.ok)throw new Error("Network error");return me.json()}).then(me=>{me.status&&ae(ye?"Фильтр логов обновлен в RAM":"Log filter updated in RAM","success")}).catch(me=>{console.error("Error applying log filter in RAM:",me),ae(ye?"Ошибка обновления RAM фильтра":"Error updating RAM log filter","error")})},De=ie=>{ie.preventDefault();const ye=new FormData(Xt.current);let me={...$};for(const[Oe,Le]of ye.entries())["lon_de","lat_de","timezone","mqtt_prt"].includes(Oe)?me[Oe]=Le===""||Le===null?0:Number(Le):me[Oe]=Le;me.usehttps||["tls_ca","tls_key","tls_cert","telegram_token","domain"].forEach(Oe=>delete me[Oe]),me.offdate&&me.offtime?me.offldt=`d:${me.offdate} t:${me.offtime}`:delete me.offldt,["lon_de","lat_de","timezone","mqtt_prt"].forEach(Oe=>{(me[Oe]===null||me[Oe]==="")&&(me[Oe]=0)}),me.onsunrise=me.onsunrise?1:0,me.onsunset=me.onsunset?1:0,me.check_ip=me.check_ip?1:0,me.check_mqtt=me.check_mqtt?1:0,me.usehttps=me.usehttps?1:0,fetch("/api/mysett/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(me)}).then(Oe=>{if(!Oe.ok)throw new Error("Ошибка сети");return Oe.json()}).then(Oe=>{_("success"),mt(Oe),ae("Данные успешно сохранены","success"),ne("Данные успешно сохранены"),xe.current=0}).catch(Oe=>{_("error"),mt(Oe),ae("Ошибка при сохранении данных","error"),ne("Ошибка при сохранении данных")})},Ce=(ie,ye)=>{let me=null;ie==="offdate"?me=Zt(ye)?null:"Неверный формат даты (д.м.гг)":ie==="offtime"?me=$t(ye)?null:"Неверный формат времени (чч:мм:сс)":me=we(ie,ye),te(Le=>{const Ne={...Le,[ie]:me},ze=["tls_key","tls_cert","tls_ca"],Re=Object.keys(Ne).filter(Ae=>!ze.includes(Ae)&&Ae!=="telegram_token").some(Ae=>Ne[Ae]!==null);return ue(Re||!$.usehttps&&ze.some(Ae=>$[Ae])),Ne});let Oe=ye;["lon_de","lat_de","timezone","mqtt_prt"].includes(ie)?Oe=ye===""||ye===null?0:Number(ye):["onsunrise","onsunset","check_ip","check_mqtt","usehttps"].includes(ie)&&(Oe=ye?1:0),k(Le=>({...Le,[ie]:Oe})),xe.current=Date.now(),ie==="usehttps"&&(te({}),ue(!1))};if(lt(()=>{let ie=!0;return registerPoll("settings","/api/mysett/get",function(ye){if(ie&&!(Date.now()-xe.current<8e3)){var me=document.activeElement;if(!(me&&(me.tagName==="INPUT"||me.tagName==="TEXTAREA"||me.tagName==="SELECT"))&&ye!=null){if(ye.offldt){var Oe=pt(ye.offldt);ye.offdate=Oe.date,ye.offtime=Oe.time}k(ye),Pe(!1),ye.tls_key&&fe(!0),ye.tls_cert&&ge(!0),ye.tls_ca&&Te(!0),ye.telegram_token&&ke(!0)}}},{immediate:!0}),function(){ie=!1,unregisterPoll("settings")}},[]),lt(()=>{ue(!Yt($,vt))},[$,vt]),Se)return Et`<div>Loading...</div>`;if(!$)return"";const _e=(ie="")=>Et`
    <button
      type="submit"
      class=${`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 ${de?"opacity-50 cursor-not-allowed bg-slate-400":"bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500"} ${ie}`}
      disabled=${de}
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
            onChange=${ie=>Ce("lang",ie.target.value)}
            style="border: 2px solid #22d3ee; border-radius: 8px; padding: 4px 10px; font-size: 14px; font-weight: 600; background: white; color: #1e293b; cursor: pointer; outline: none;"
          >
            ${le.map(ie=>Et`<option value=${ie.value}>${ie.label}</option>`)}
          </select>
        </div>

        ${oe&&Et`
          <div class="w-full max-w-4xl bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center mb-6 border border-green-400/50 backdrop-blur-md">
            ${oe}
          </div>
        `}

        <form ref=${Xt} onSubmit=${De} class="w-full max-w-4xl flex flex-col gap-6 relative">

          <div class="flex justify-end w-full">${_e()}</div>

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
              ${[{label:"Login",key:"adm_name",type:"text"},{label:"Password",key:"adm_pswd",type:"password"},{label:"Time zone UTC",key:"timezone",type:"select",options:ce}].map((ie,ye)=>Et`
                <${FieldRow} label=${ie.label} tip=${ve(ie.tipLabel||ie.label)} index=${ye}>
                  <${pageSetting}
                    value=${$[ie.key]}
                    setfn=${me=>Ce(ie.key,me)}
                    type=${ie.type}
                    options=${ie.options}
                    class=${`w-full px-3 py-2 bg-white/50 border ${vt[ie.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    error=${vt[ie.key]}
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
                            <${MyPolzunok} value=${$.check_ip} onChange=${ie=>Ce("check_ip",ie)} />
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
                            <${MyPolzunok} value=${$.check_ip} onChange=${ie=>Ce("check_ip",ie)} />
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
                  ${[{label:"IP address",key:"ip_addr",type:"text"},{label:"Subnet mask",key:"sb_mask",type:"text"},{label:"Default gateway",key:"gateway",type:"text"}].map((ie,ye)=>Et`
                    <${FieldRow} label=${ie.label} tip=${ve(ie.tipLabel||ie.label)} index=${ye}>
                      <${pageSetting}
                        value=${$[ie.key]}
                        setfn=${me=>Ce(ie.key,me)}
                        type=${ie.type}
                        class=${`w-full px-3 py-2 bg-white/50 border ${vt[ie.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        error=${vt[ie.key]}
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
              <${FieldRow} label="Token" tip=${ve("Token")} index=${0}>
                <${pageSetting}
                  value=${$.token}
                  setfn=${ie=>Ce("token",ie)}
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
                          <${MyPolzunok} value=${$.check_mqtt} onChange=${ie=>Ce("check_mqtt",ie)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[{label:"Host",key:"mqtt_hst",type:"text",maxlength:50},{label:"Port",key:"mqtt_prt",type:"number"},{label:"Client",key:"mqtt_clt",type:"text",maxlength:32},{label:"User",key:"mqtt_usr",type:"text",maxlength:32},{label:"Password",key:"mqtt_pswd",type:"password",maxlength:32,tipLabel:"Password (MQTT)"},{label:"TX topic",key:"txmqttop",type:"text",maxlength:32},{label:"RX topic",key:"rxmqttop",type:"text",maxlength:32},{label:"Z2M topic",key:"rxzbtop",type:"text",maxlength:32,tipLabel:"RX Z2M topic",placeholder:"zigbee2mqtt"}].map((ie,ye)=>Et`
                  <${FieldRow} label=${ie.label} tip=${ve(ie.tipLabel||ie.label)} index=${ye}>
                    <${pageSetting}
                      value=${$[ie.key]}
                      setfn=${me=>Ce(ie.key,me)}
                      type=${ie.type}
                      maxlength=${ie.maxlength}
                      placeholder=${ie.placeholder||""}
                      class=${`w-full px-3 py-2 bg-white/50 border ${vt[ie.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      error=${vt[ie.key]}
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
                          <${MyPolzunok} value=${$.check_mqtt} onChange=${ie=>Ce("check_mqtt",ie)} />
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
                          <${MyPolzunok} value=${$.usehttps} onChange=${ie=>Ce("usehttps",ie)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[{label:"HTTPS domain",key:"domain",type:"text"},{label:"Private Key",key:"tls_key",type:"textarea"},{label:"Public Key",key:"tls_cert",type:"textarea"}].map((ie,ye)=>Et`
                  <tr class="transition-colors border-b border-slate-200 ${ye%2===0?"bg-sky-200/40":"bg-white/80"} hover:bg-slate-200/80">
                    <td
                      class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help align-top"
                      data-tip=${ve(ie.label)}
                    >
                      ${ie.label}
                    </td>
                    <td class="w-2/3 pl-4 py-4 pr-6 align-top">
                      <div class="relative w-full">
                        ${ie.type==="textarea"?Et`
                            ${ie.key==="tls_key"&&$.tls_key?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены, но информация скрыта!</div>`:ie.key==="tls_cert"&&$.tls_cert?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены успешно!</div>`:Et`<textarea
                                    name=${ie.key}
                                    value=${$[ie.key]||""}
                                    onInput=${me=>Ce(ie.key,me.target.value)}
                                    class=${`w-full px-3 py-2 bg-white/50 border ${vt[ie.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                                    rows="1"
                                    placeholder="Enter ${ie.label}"
                                  ></textarea>`}
                          `:Et`
                            <input
                              type="text"
                              name=${ie.key}
                              value=${$[ie.key]||""}
                              onInput=${me=>Ce(ie.key,me.target.value)}
                              class=${`w-full px-3 py-2 bg-white/50 border ${vt[ie.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                              maxlength="30"
                              placeholder="Enter domain (e.g., zagotovka.ddns.net)"
                            />
                          `}
                        ${$[ie.key]&&ie.key==="tls_cert"&&Et`
                          <div class="absolute right-0 top-0 mt-[3px] mr-[3px] flex gap-2">
                            <button type="button"
                              onClick=${()=>{navigator.clipboard.writeText($[ie.key]),ne("Данные скопированы")}}
                              class="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5"
                            >Копировать</button>
                            <button type="button"
                              onClick=${()=>Ce(ie.key,"")}
                              class="px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                            >Очистить</button>
                          </div>
                        `}
                        ${$[ie.key]&&ie.key!=="domain"&&ie.key!=="tls_cert"&&Et`
                          <button type="button"
                            onClick=${()=>Ce(ie.key,"")}
                            class="absolute right-0 top-0 mt-[3px] mr-[3px] px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                          >Очистить</button>
                        `}
                      </div>
                      ${vt[ie.key]&&Et`<div class="text-red-500 text-sm mt-1 font-semibold w-full text-left">${vt[ie.key]}</div>`}
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
                          <${MyPolzunok} value=${$.usehttps} onChange=${ie=>Ce("usehttps",ie)} />
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

              <${FieldRow} label="Longitude" tip=${ve("Longitude")} index=${0}>
                <${pageSetting} value=${$.lon_de} setfn=${ie=>Ce("lon_de",ie)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${vt.lon_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${vt.lon_de} />
              <//>

              <${FieldRow} label="Latitude" tip=${ve("Latitude")} index=${1}>
                <${pageSetting} value=${$.lat_de} setfn=${ie=>Ce("lat_de",ie)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${vt.lat_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${vt.lat_de} />
              <//>

              <!-- Sunrise — нестандартная строка, data-tip вручную -->
              <tr class="transition-colors border-b border-slate-200 bg-white/80 hover:bg-slate-200/80">
                <td
                  class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
                  data-tip=${ve("Sunrise")}
                >
                  Sunrise: <span class="text-teal-600 drop-shadow-sm">${$.sunrise}</span>
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <div class="flex items-center gap-4">
                    <${MyPolzunok} value=${$.onsunrise} onChange=${ie=>Ce("onsunrise",ie)} />
                    <input type="text" value=${$.sunrise_pins||""} onInput=${ie=>Ce("sunrise_pins",ie.target.value)}
                      maxlength="20" placeholder="Action for sunrise"
                      class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  </div>
                </td>
              </tr>

              <!-- Sunset -->
              <tr class="transition-colors border-b border-slate-200 bg-sky-200/40 hover:bg-slate-200/80">
                <td
                  class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
                  data-tip=${ve("Sunset")}
                >
                  Sunset: <span class="text-teal-600 drop-shadow-sm">${$.sunset}</span>
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <div class="flex items-center gap-4">
                    <${MyPolzunok} value=${$.onsunset} onChange=${ie=>Ce("onsunset",ie)} />
                    <input type="text" value=${$.sunset_pins||""} onInput=${ie=>Ce("sunset_pins",ie.target.value)}
                      maxlength="20" placeholder="Action for sunset"
                      class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  </div>
                </td>
              </tr>

              <${FieldRow} label="Day Length" tip=${ve("Day Length")} index=${4}>
                <span class="text-xl font-medium text-slate-800">${$.dlength}</span>
              <//>

              <${FieldRow} label="Next full moon" tip=${ve("Next full moon")} index=${5}>
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
                  data-tip=${ve("Date")}
                >
                  Date
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <input type="text" name="offdate" value=${$.offdate||""} onInput=${ie=>Ce("offdate",ie.target.value)}
                    placeholder="dd.mm.yy"
                    class=${`w-full px-3 py-2 bg-white/50 border ${vt.offdate?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${vt.offdate&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${vt.offdate}</div>`}
                </td>
              </tr>

              <!-- Time -->
              <tr class="transition-colors border-b border-slate-200 bg-sky-200/40 hover:bg-slate-200/80">
                <td
                  class="w-1/3 font-bold text-slate-700 text-lg border-r border-slate-500 py-4 px-6 cursor-help"
                  data-tip=${ve("Time")}
                >
                  Time
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <input type="text" name="offtime" value=${$.offtime||""} onInput=${ie=>Ce("offtime",ie.target.value)}
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
                onClick=${()=>Me(ie=>!ie)}
              >
                <span class="text-2xl font-bold text-slate-700 tracking-wide flex items-center gap-2">
                  <span class="text-teal-600 text-lg">${Ee?"▾":"▸"}</span>
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

              ${Ee&&Et`
                <div class="flex items-stretch">

                  <div class="w-1/4 border-r border-slate-300 px-6 py-6 flex flex-col justify-center items-center gap-4"
                      data-tip=${($.lang||"ru")==="ru"?"Выберите категории логов, которые выводятся в UART и отсылаются. Изменения применяются немедленно в RAM!":"Select which log categories are enabled. Changes apply immediately in RAM!"}>
                    <span class="text-base font-bold text-slate-700 text-center">
                      ${($.lang||"ru")==="ru"?"Активные категории":"Active Categories"}
                    </span>
                    <button type="button" onClick=${()=>Ie(2047)}
                      class="w-full py-3 text-sm font-bold text-teal-600 bg-teal-50 border border-teal-200 rounded-xl hover:bg-teal-100 hover:text-teal-700 transition-all text-center shadow-sm">
                      ${($.lang||"ru")==="ru"?"Включить все":"Enable All"}
                    </button>
                    <button type="button" onClick=${()=>Ie(0)}
                      class="w-full py-3 text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 hover:text-rose-700 transition-all text-center shadow-sm">
                      ${($.lang||"ru")==="ru"?"Выключить все":"Disable All"}
                    </button>
                  </div>

                  <div class="w-3/4 px-6 py-6">
                    <div class="grid grid-cols-4 gap-3">
                      ${LOG_CATEGORIES.map(ie=>{const ye=$.log_filter_mask!==void 0?$.log_filter_mask:2047,me=(ye&1<<ie.id)!==0;return Et`
                          <label class=${`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all duration-300 ${me?"bg-cyan-50/70 border-cyan-300 shadow-[0_2px_10px_rgba(34,211,238,0.15)] scale-[1.02]":"bg-slate-50/40 border-slate-200 hover:bg-slate-100/50"}`}>
                            <input
                              type="checkbox"
                              checked=${me}
                              onChange=${Oe=>{const Le=Oe.target.checked?ye|1<<ie.id:ye&~(1<<ie.id);Ie(Le)}}
                              class="w-5 h-5 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500 focus:ring-2"
                            />
                            <div class="flex flex-col">
                              <span class="font-bold text-slate-800 text-base leading-tight">${ie.key}</span>
                              <span class="text-xs text-slate-500 font-medium">${($.lang||"ru")==="ru"?ie.labelRu:ie.labelEn}</span>
                            </div>
                          </label>
                        `})}
                    </div>
                  </div>

                </div>
              `}
            </div>
          </div>

          ${oe&&Et`
            <div class="w-full bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center border border-green-400/50 backdrop-blur-md">
              ${oe}
            </div>
          `}

          <div class="flex justify-end w-full mb-4">${_e()}</div>

        </form>
      </div>
    </div>
    ${ee&&Et`<${Toast} message=${ee.message} type=${ee.type} />`}
  `}console.log("[Zagotovka] build:","2026-07-15T18:24");const Logo=$=>Et`<svg
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
  </svg>`;function Header({logout:$,user:k,setShowSidebar:st,showSidebar:mt,sessionExpired:ct}){const[_,vt]=ut(new Date),te=ht(StateContext),Xt=re=>new Date(re.year+1900,re.mon,re.mday,re.hour,re.min,re.sec);lt(()=>{const re=setInterval(()=>vt(new Date),1e3);return()=>clearInterval(re)},[]);const ee=te&&te.time&&te.time.status?Xt(te.time.time):null,se=re=>re.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric"}),oe=re=>re.toLocaleTimeString("ru-RU");return Et`
    <div
      class="${ct?"bg-red-500/90 border-b border-red-400 text-white shadow-lg":"bg-white/40 backdrop-blur-md border-b border-white/40 shadow-sm"} sticky top-0 z-[48] w-full py-2 ${mt?"pl-72":""} transition-all duration-300 transform"
    >
      <div class="px-4 w-full py-0 my-0 flex items-center justify-between">
        <button
          type="button"
          onclick=${()=>st(re=>!re)}
          class="text-slate-500 hover:text-teal-500 transition-colors"
        >
          <${Icons.bars3} class="h-6" />
        </button>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm ${ct?"text-white":"text-slate-600"}">
            Дата: ${se(_)}<span style="margin-left: 8px;"></span
            >Время: ${oe(_)}
          </span>
        </div>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm ${ct?"text-white":"text-slate-600"}"
            >STM32 дата:
            ${ee?se(ee):" 00.00.0000"}<span
              style="margin-left: 8px;"
            ></span
            >Время: ${ee?oe(ee):"00:00"}
          </span>
        </div>
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <span class="text-sm ${ct?"text-red-100":"text-slate-400"}">logged in as: ${k}</span>
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
  `}function Sidebar({url:$,show:k}){const st=({title:mt,icon:ct,href:_,url:vt})=>Et`
  <div>
    <a href="#${_}" class="${_==vt?"bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-md group":"text-slate-600 hover:bg-slate-200/60 hover:text-slate-800 group"} flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
      <${ct} class="w-6 h-6"/>
      ${mt}
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
        <${Logo} class="h-full" /> Zagotovka <span class="text-xs text-slate-400 font-normal ml-1">v2.0.2m</span>
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
  <//>`}function Chart({data:$}){const k=$.length,st=20,mt=15,ct=100,_=5,vt=10,te=25,Xt=re=>(ct-vt)/_*(re+1),ee=re=>(ct-vt)*re/100,se=re=>ct-vt-ee(re),oe=(re,de,ue)=>Array.from({length:de},(be,fe)=>fe*1+re);return Et` <div
    class="my-4 divide-y divide-gray-200 overflow-auto rounded bg-white"
  >
    <div class="font-light uppercase flex items-center text-gray-600 px-4 py-2">
      Temperature, last 24h
    <//>
    <div class="relative">
      <svg class="bg-yellow-x50 w-full p-4" viewBox="0 0 ${k*st+mt} ${ct}">
        ${oe(0,_).map(re=>Et`
            <line
              x1="0"
              y1=${Xt(re)}
              x2=${mt+k*st}
              y2=${Xt(re)}
              stroke-width="0.3"
              class="stroke-slate-300"
              stroke-dasharray="1,1"
            />
            <text x="0" y=${Xt(re)-2} class="text-[6px] fill-slate-400"
              >${te-te/_*(re+1)}<//
            >
          `)}
        ${oe(0,k).map(re=>Et`
            <rect
              x=${mt+re*st}
              y=${se($[re]*100/te)}
              width="12"
              height=${ee($[re]*100/te)}
              rx="2"
              class="fill-cyan-500"
            />
            <text x=${mt+re*st} y="100" class="text-[6px] fill-slate-400"
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
  <//>`}function Main({}){const[$,k]=ut(null);return lt(()=>fetch("api/stats/get").then(mt=>mt.json()).then(mt=>k(mt)),[]),$?Et` <div class="p-2">
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
  <//>`:""}const MyPolzunok=({value:$,onChange:k,disabled:st=!1,activeColor:mt})=>{const ct=te=>{k(te.target.checked?1:0)},_=mt?`background: ${$?mt:""}; transition: background 0.2s;`:"";return Et`
    <div class="flex items-center gap-3 ${st?"opacity-50 pointer-events-none":""}">
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          class="sr-only peer"
          checked=${$}
          disabled=${st}
          onChange=${ct}
        />
        <div class="${mt?"w-[42px] h-[22px] bg-slate-200/80 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300/50 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all shadow-inner":"w-[42px] h-[22px] bg-slate-200/80 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300/50 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-400 peer-checked:to-cyan-500 shadow-inner"}" style=${_}></div>
      </label>
      <span class="text-sm font-medium text-slate-600 w-8">${$?"On":"Off"}</span>
    </div>
  `};function FirmwareStatus({title:$,info:k,children:st}){return Et`
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
  `}function FirmwareUpdate({}){const[$,k]=ut([{},{}]),[st,mt]=ut(null),ct=()=>fetch("api/firmware/status").then(re=>re.json()).then(re=>k(re));lt(ct,[]),lt(()=>{if(st){const re=setTimeout(()=>{mt(null)},3e3);return()=>clearTimeout(re)}},[st]);const _=re=>fetch("api/firmware/commit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({})}).then(de=>de.json()).then(ct),vt=re=>fetch("api/device/reset",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reboot:1})}).then(de=>de.json()).then(de=>new Promise(ue=>setTimeout(()=>{ct(),ue()},5e3))),te=re=>fetch("api/firmware/rollback",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({})}).then(vt),Xt=re=>fetch("api/device/eraselast").then(ct),ee=function(re){if(!re){mt({type:"yellow",message:"Error: No file selected."});return}const de=re.name.split(".").pop().toLowerCase();if(de!=="bin"&&de!=="hex"){mt({type:"red",message:"Error: Only .bin and .hex files are allowed!"});return}const ue=new FormData;ue.append("file",re),fetch("api/firmware/upload",{method:"POST",body:ue}).then(be=>{if(!be.ok)throw new Error(`HTTP error! status: ${be.status}`);return be.json()}).then(()=>{mt({type:"green",message:"Firmware uploaded successfully!"}),ct()}).catch(be=>{mt({type:"yellow",message:`Error: Upload failed. ${be.message}`})})},se=({type:re,message:de})=>Et`
      <div
        class=${`fixed top-0 left-0 right-0 z-50 border-b-4 p-4 ${re==="red"?"bg-red-100 border-red-500 text-red-700":re==="yellow"?"bg-yellow-100 border-yellow-500 text-yellow-700":"bg-green-100 border-green-500 text-green-700"}`}
        role="alert"
      >
        <p class="font-bold text-center">${de}</p>
      </div>
    `,oe=({title:re,onupload:de})=>Et`
      <label
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        ${re}
        <input
          type="file"
          class="hidden"
          accept=".bin,.hex"
          onChange=${be=>{const fe=be.target.files[0];fe&&de(fe)}}
        />
      </label>
    `;return Et`
    ${st&&Et`<${se} type=${st.type} message=${st.message} />`}
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
          <${oe}
            title="Upload new firmware (.bin or .hex)"
            onupload=${ee}
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
  `}const pageSetting=({value:$,setfn:k,type:st,options:mt,error:ct,..._})=>{let vt;const te=`w-full px-3 py-2 border rounded-md ${ct?"border-red-500":"border-gray-300"}`;switch(st){case"text":case"password":case"number":vt=Et`
        <input
          type=${st}
          value=${$}
          onInput=${Xt=>k(Xt.target.value)}
          class=${te}
          ...${_}
        />
      `;break;case"select":vt=Et`
        <select
          value=${$}
          onChange=${Xt=>k(Xt.target.value)}
          class=${te}
          ...${_}
        >
          ${mt.map(([Xt,ee])=>Et` <option value=${Xt}>${ee}</option> `)}
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
      ${ct&&Et`<div class="text-red-500 text-sm mt-1">${ct}</div>`}
    </div>
  `};function Toast({message:$,type:k,onClose:st}){return lt(()=>{const mt=setTimeout(()=>{st()},3e3);return()=>clearTimeout(mt)},[]),Et`
    <div
      class=${`fixed bottom-4 right-4 p-4 rounded-md ${k==="success"?"bg-green-500":"bg-red-500"} text-white`}
    >
      ${$}
    </div>
  `}const App=function({}){const[$,k]=ut(!0),[st,mt]=ut("/"),[ct,_]=ut(""),[vt,te]=ut(!0),[Xt,ee]=ut(null),[se,oe]=ut(!1),re=()=>fetch("api/logout").then(ue=>_("")),de=ue=>ue.ok?ue.json().then(be=>_(be.user)).finally(be=>k(!1)):k(!1)&&_(null);return lt(()=>fetch("api/login").then(de),[]),window.pollIntervalMs=window.pollIntervalMs||2e3,lt(()=>{const ue=()=>{window.pollIntervalMs=document.hidden?3e4:2e3};return document.addEventListener("visibilitychange",ue),()=>document.removeEventListener("visibilitychange",ue)},[]),lt(()=>{if(ct)return registerPoll("common","/api/state/common",ue=>{if(ue&&ue.__session_expired){oe(!0);return}ue&&ee(ue)}),()=>unregisterPoll("common")},[ct]),$?"":ct?Et`<${StateContext.Provider} value=${Xt}>
   <div class="min-h-screen bg-slate-100" id="mains">
    <${Sidebar} url=${st} show=${vt} />
    <${Header}
      logout=${re}
      user=${ct}
      showSidebar=${vt}
      setShowSidebar=${te}
      sessionExpired=${se}
    />
    <div
      class="${vt&&"pl-72"} transition-all duration-300 transform"
    >
      <${Qt}
        onChange=${ue=>mt(ue.url)}
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
      loginFn=${de}
      logoIcon=${Logo}
      title="Zagotovka‑M Web Interface Login"
      tipText="Default: admin / 12345678"
    />`};window.onload=()=>O(y(App),document.body);
