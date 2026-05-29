(function(){const _=document.createElement("link").relList;if(_&&_.supports&&_.supports("modulepreload"))return;for(const dt of document.querySelectorAll('link[rel="modulepreload"]'))ct(dt);new MutationObserver(dt=>{for(const k of dt)if(k.type==="childList")for(const pt of k.addedNodes)pt.tagName==="LINK"&&pt.rel==="modulepreload"&&ct(pt)}).observe(document,{childList:!0,subtree:!0});function st(dt){const k={};return dt.integrity&&(k.integrity=dt.integrity),dt.referrerPolicy&&(k.referrerPolicy=dt.referrerPolicy),dt.crossOrigin==="use-credentials"?k.credentials="include":dt.crossOrigin==="anonymous"?k.credentials="omit":k.credentials="same-origin",k}function ct(dt){if(dt.ep)return;dt.ep=!0;const k=st(dt);fetch(dt.href,k)}})();const _registered=new Map;let _active=!1,_timer=null,_keys=[],_idx=0;const POLL_INTERVAL=1500,FETCH_TIMEOUT=5e3;function registerPoll($,_,st){_registered.set($,{url:_,callback:st,etag:null}),_keys=Array.from(_registered.keys()),_timer||_schedule()}function unregisterPoll($){const _=_registered.get($);_&&(_.callback=function(){}),_registered.delete($),_keys=Array.from(_registered.keys()),_keys.length===0&&_clearTimer()}function _clearTimer(){clearTimeout(_timer),_timer=null}function _schedule(){_clearTimer(),_timer=setTimeout(_tick,POLL_INTERVAL)}async function _tick(){if(_active){_schedule();return}if(_keys.length===0){_clearTimer();return}_active=!0,_idx>=_keys.length&&(_idx=0);const $=_keys[_idx++],_=_registered.get($);if(_){const st=new AbortController,ct=setTimeout(function(){st.abort()},FETCH_TIMEOUT);try{const dt={};_.etag&&(dt["If-None-Match"]=_.etag);const k=await fetch(_.url,{signal:st.signal,headers:dt,cache:"no-store"});clearTimeout(ct);const pt=k.headers.get("ETag");if(pt&&(_.etag=pt),k.status!==304){if(k.ok){const oe=await k.json();_.callback(oe)}}}catch(dt){clearTimeout(ct),dt.name!=="AbortError"&&console.warn("[pollQueue] "+$+": "+dt.message),_&&(_.etag=null)}}_active=!1,_keys.length>0?_schedule():_clearTimer()}var t,n,e,r,o,u,i,l,c,a,s,f={},p=[],h=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,d=Array.isArray;function v($,_){for(var st in _)$[st]=_[st];return $}function m($){var _=$.parentNode;_&&_.removeChild($)}function y($,_,st){var ct,dt,k,pt={};for(k in _)k=="key"?ct=_[k]:k=="ref"?dt=_[k]:pt[k]=_[k];if(arguments.length>2&&(pt.children=arguments.length>3?t.call(arguments,2):st),typeof $=="function"&&$.defaultProps!=null)for(k in $.defaultProps)pt[k]===void 0&&(pt[k]=$.defaultProps[k]);return g($,pt,ct,dt,null)}function g($,_,st,ct,dt){var k={type:$,props:_,key:st,ref:ct,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:dt??++e,__i:-1,__u:0};return dt==null&&n.vnode!=null&&n.vnode(k),k}function b($){return $.children}function C($,_){this.props=$,this.context=_}function x($,_){if(_==null)return $.__?x($.__,$.__i+1):null;for(var st;_<$.__k.length;_++)if((st=$.__k[_])!=null&&st.__e!=null)return st.__e;return typeof $.type=="function"?x($):null}function w($){var _,st;if(($=$.__)!=null&&$.__c!=null){for($.__e=$.__c.base=null,_=0;_<$.__k.length;_++)if((st=$.__k[_])!=null&&st.__e!=null){$.__e=$.__c.base=st.__e;break}return w($)}}function P($){(!$.__d&&($.__d=!0)&&r.push($)&&!U.__r++||o!==n.debounceRendering)&&((o=n.debounceRendering)||u)(U)}function U(){var $,_,st,ct,dt,k,pt,oe;for(r.sort(i);$=r.shift();)$.__d&&(_=r.length,ct=void 0,k=(dt=(st=$).__v).__e,pt=[],oe=[],st.__P&&((ct=v({},dt)).__v=dt.__v+1,n.vnode&&n.vnode(ct),M(st.__P,ct,dt,st.__n,st.__P.namespaceURI,32&dt.__u?[k]:null,pt,k??x(dt),!!(32&dt.__u),oe),ct.__v=dt.__v,ct.__.__k[ct.__i]=ct,L(pt,ct,oe),ct.__e!=k&&w(ct)),r.length>_&&r.sort(i));U.__r=0}function H($,_,st,ct,dt,k,pt,oe,Zt,te,ne){var Yt,se,ae,ue,me,we=ct&&ct.__k||p,de=_.length;for(st.__d=Zt,E(st,_,we),Zt=st.__d,Yt=0;Yt<de;Yt++)(ae=st.__k[Yt])!=null&&typeof ae!="boolean"&&typeof ae!="function"&&(se=ae.__i===-1?f:we[ae.__i]||f,ae.__i=Yt,M($,ae,se,dt,k,pt,oe,Zt,te,ne),ue=ae.__e,ae.ref&&se.ref!=ae.ref&&(se.ref&&F(se.ref,null,ae),ne.push(ae.ref,ae.__c||ue,ae)),me==null&&ue!=null&&(me=ue),65536&ae.__u||se.__k===ae.__k?(Zt&&!Zt.isConnected&&(Zt=x(se)),Zt=S(ae,Zt,$)):typeof ae.type=="function"&&ae.__d!==void 0?Zt=ae.__d:ue&&(Zt=ue.nextSibling),ae.__d=void 0,ae.__u&=-196609);st.__d=Zt,st.__e=me}function E($,_,st){var ct,dt,k,pt,oe,Zt=_.length,te=st.length,ne=te,Yt=0;for($.__k=[],ct=0;ct<Zt;ct++)pt=ct+Yt,(dt=$.__k[ct]=(dt=_[ct])==null||typeof dt=="boolean"||typeof dt=="function"?null:typeof dt=="string"||typeof dt=="number"||typeof dt=="bigint"||dt.constructor==String?g(null,dt,null,null,null):d(dt)?g(b,{children:dt},null,null,null):dt.constructor===void 0&&dt.__b>0?g(dt.type,dt.props,dt.key,dt.ref?dt.ref:null,dt.__v):dt)!=null?(dt.__=$,dt.__b=$.__b+1,oe=D(dt,st,pt,ne),dt.__i=oe,k=null,oe!==-1&&(ne--,(k=st[oe])&&(k.__u|=131072)),k==null||k.__v===null?(oe==-1&&Yt--,typeof dt.type!="function"&&(dt.__u|=65536)):oe!==pt&&(oe===pt+1?Yt++:oe>pt?ne>Zt-pt?Yt+=oe-pt:Yt--:oe<pt?oe==pt-1&&(Yt=oe-pt):Yt=0,oe!==ct+Yt&&(dt.__u|=65536))):(k=st[pt])&&k.key==null&&k.__e&&(131072&k.__u)==0&&(k.__e==$.__d&&($.__d=x(k)),I(k,k,!1),st[pt]=null,ne--);if(ne)for(ct=0;ct<te;ct++)(k=st[ct])!=null&&(131072&k.__u)==0&&(k.__e==$.__d&&($.__d=x(k)),I(k,k))}function S($,_,st){var ct,dt;if(typeof $.type=="function"){for(ct=$.__k,dt=0;ct&&dt<ct.length;dt++)ct[dt]&&(ct[dt].__=$,_=S(ct[dt],_,st));return _}$.__e!=_&&(st.insertBefore($.__e,_||null),_=$.__e);do _=_&&_.nextSibling;while(_!=null&&_.nodeType===8);return _}function A($,_){return _=_||[],$==null||typeof $=="boolean"||(d($)?$.some((function(st){A(st,_)})):_.push($)),_}function D($,_,st,ct){var dt=$.key,k=$.type,pt=st-1,oe=st+1,Zt=_[st];if(Zt===null||Zt&&dt==Zt.key&&k===Zt.type&&(131072&Zt.__u)==0)return st;if(ct>(Zt!=null&&(131072&Zt.__u)==0?1:0))for(;pt>=0||oe<_.length;){if(pt>=0){if((Zt=_[pt])&&(131072&Zt.__u)==0&&dt==Zt.key&&k===Zt.type)return pt;pt--}if(oe<_.length){if((Zt=_[oe])&&(131072&Zt.__u)==0&&dt==Zt.key&&k===Zt.type)return oe;oe++}}return-1}function N($,_,st){_[0]==="-"?$.setProperty(_,st??""):$[_]=st==null?"":typeof st!="number"||h.test(_)?st:st+"px"}function R($,_,st,ct,dt){var k;t:if(_==="style")if(typeof st=="string")$.style.cssText=st;else{if(typeof ct=="string"&&($.style.cssText=ct=""),ct)for(_ in ct)st&&_ in st||N($.style,_,"");if(st)for(_ in st)ct&&st[_]===ct[_]||N($.style,_,st[_])}else if(_[0]==="o"&&_[1]==="n")k=_!==(_=_.replace(/(PointerCapture)$|Capture$/i,"$1")),_=_.toLowerCase()in $||_==="onFocusOut"||_==="onFocusIn"?_.toLowerCase().slice(2):_.slice(2),$.l||($.l={}),$.l[_+k]=st,st?ct?st.u=ct.u:(st.u=l,$.addEventListener(_,k?a:c,k)):$.removeEventListener(_,k?a:c,k);else{if(dt=="http://www.w3.org/2000/svg")_=_.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(_!="width"&&_!="height"&&_!="href"&&_!="list"&&_!="form"&&_!="tabIndex"&&_!="download"&&_!="rowSpan"&&_!="colSpan"&&_!="role"&&_ in $)try{$[_]=st??"";break t}catch{}typeof st=="function"||(st==null||st===!1&&_[4]!=="-"?$.removeAttribute(_):$.setAttribute(_,st))}}function T($){return function(_){if(this.l){var st=this.l[_.type+$];if(_.t==null)_.t=l++;else if(_.t<st.u)return;return st(n.event?n.event(_):_)}}}function M($,_,st,ct,dt,k,pt,oe,Zt,te){var ne,Yt,se,ae,ue,me,we,de,ge,fe,_e,Se,Te,Ee,Pe,re=_.type;if(_.constructor!==void 0)return null;128&st.__u&&(Zt=!!(32&st.__u),k=[oe=_.__e=st.__e]),(ne=n.__b)&&ne(_);t:if(typeof re=="function")try{if(de=_.props,ge=(ne=re.contextType)&&ct[ne.__c],fe=ne?ge?ge.props.value:ne.__:ct,st.__c?we=(Yt=_.__c=st.__c).__=Yt.__E:("prototype"in re&&re.prototype.render?_.__c=Yt=new re(de,fe):(_.__c=Yt=new C(de,fe),Yt.constructor=re,Yt.render=V),ge&&ge.sub(Yt),Yt.props=de,Yt.state||(Yt.state={}),Yt.context=fe,Yt.__n=ct,se=Yt.__d=!0,Yt.__h=[],Yt._sb=[]),Yt.__s==null&&(Yt.__s=Yt.state),re.getDerivedStateFromProps!=null&&(Yt.__s==Yt.state&&(Yt.__s=v({},Yt.__s)),v(Yt.__s,re.getDerivedStateFromProps(de,Yt.__s))),ae=Yt.props,ue=Yt.state,Yt.__v=_,se)re.getDerivedStateFromProps==null&&Yt.componentWillMount!=null&&Yt.componentWillMount(),Yt.componentDidMount!=null&&Yt.__h.push(Yt.componentDidMount);else{if(re.getDerivedStateFromProps==null&&de!==ae&&Yt.componentWillReceiveProps!=null&&Yt.componentWillReceiveProps(de,fe),!Yt.__e&&(Yt.shouldComponentUpdate!=null&&Yt.shouldComponentUpdate(de,Yt.__s,fe)===!1||_.__v===st.__v)){for(_.__v!==st.__v&&(Yt.props=de,Yt.state=Yt.__s,Yt.__d=!1),_.__e=st.__e,_.__k=st.__k,_.__k.forEach((function(xe){xe&&(xe.__=_)})),_e=0;_e<Yt._sb.length;_e++)Yt.__h.push(Yt._sb[_e]);Yt._sb=[],Yt.__h.length&&pt.push(Yt);break t}Yt.componentWillUpdate!=null&&Yt.componentWillUpdate(de,Yt.__s,fe),Yt.componentDidUpdate!=null&&Yt.__h.push((function(){Yt.componentDidUpdate(ae,ue,me)}))}if(Yt.context=fe,Yt.props=de,Yt.__P=$,Yt.__e=!1,Se=n.__r,Te=0,"prototype"in re&&re.prototype.render){for(Yt.state=Yt.__s,Yt.__d=!1,Se&&Se(_),ne=Yt.render(Yt.props,Yt.state,Yt.context),Ee=0;Ee<Yt._sb.length;Ee++)Yt.__h.push(Yt._sb[Ee]);Yt._sb=[]}else do Yt.__d=!1,Se&&Se(_),ne=Yt.render(Yt.props,Yt.state,Yt.context),Yt.state=Yt.__s;while(Yt.__d&&++Te<25);Yt.state=Yt.__s,Yt.getChildContext!=null&&(ct=v(v({},ct),Yt.getChildContext())),se||Yt.getSnapshotBeforeUpdate==null||(me=Yt.getSnapshotBeforeUpdate(ae,ue)),H($,d(Pe=ne!=null&&ne.type===b&&ne.key==null?ne.props.children:ne)?Pe:[Pe],_,st,ct,dt,k,pt,oe,Zt,te),Yt.base=_.__e,_.__u&=-161,Yt.__h.length&&pt.push(Yt),we&&(Yt.__E=Yt.__=null)}catch(xe){_.__v=null,Zt||k!=null?(_.__e=oe,_.__u|=Zt?160:32,k[k.indexOf(oe)]=null):(_.__e=st.__e,_.__k=st.__k),n.__e(xe,_,st)}else k==null&&_.__v===st.__v?(_.__k=st.__k,_.__e=st.__e):_.__e=W(st.__e,_,st,ct,dt,k,pt,Zt,te);(ne=n.diffed)&&ne(_)}function L($,_,st){_.__d=void 0;for(var ct=0;ct<st.length;ct++)F(st[ct],st[++ct],st[++ct]);n.__c&&n.__c(_,$),$.some((function(dt){try{$=dt.__h,dt.__h=[],$.some((function(k){k.call(dt)}))}catch(k){n.__e(k,dt.__v)}}))}function W($,_,st,ct,dt,k,pt,oe,Zt){var te,ne,Yt,se,ae,ue,me,we=st.props,de=_.props,ge=_.type;if(ge==="svg"?dt="http://www.w3.org/2000/svg":ge==="math"?dt="http://www.w3.org/1998/Math/MathML":dt||(dt="http://www.w3.org/1999/xhtml"),k!=null){for(te=0;te<k.length;te++)if((ae=k[te])&&"setAttribute"in ae==!!ge&&(ge?ae.localName===ge:ae.nodeType===3)){$=ae,k[te]=null;break}}if($==null){if(ge===null)return document.createTextNode(de);$=document.createElementNS(dt,ge,de.is&&de),k=null,oe=!1}if(ge===null)we===de||oe&&$.data===de||($.data=de);else{if(k=k&&t.call($.childNodes),we=st.props||f,!oe&&k!=null)for(we={},te=0;te<$.attributes.length;te++)we[(ae=$.attributes[te]).name]=ae.value;for(te in we)if(ae=we[te],te!="children"){if(te=="dangerouslySetInnerHTML")Yt=ae;else if(te!=="key"&&!(te in de)){if(te=="value"&&"defaultValue"in de||te=="checked"&&"defaultChecked"in de)continue;R($,te,null,ae,dt)}}for(te in de)ae=de[te],te=="children"?se=ae:te=="dangerouslySetInnerHTML"?ne=ae:te=="value"?ue=ae:te=="checked"?me=ae:te==="key"||oe&&typeof ae!="function"||we[te]===ae||R($,te,ae,we[te],dt);if(ne)oe||Yt&&(ne.__html===Yt.__html||ne.__html===$.innerHTML)||($.innerHTML=ne.__html),_.__k=[];else if(Yt&&($.innerHTML=""),H($,d(se)?se:[se],_,st,ct,ge==="foreignObject"?"http://www.w3.org/1999/xhtml":dt,k,pt,k?k[0]:st.__k&&x(st,0),oe,Zt),k!=null)for(te=k.length;te--;)k[te]!=null&&m(k[te]);oe||(te="value",ue!==void 0&&(ue!==$[te]||ge==="progress"&&!ue||ge==="option"&&ue!==we[te])&&R($,te,ue,we[te],dt),te="checked",me!==void 0&&me!==$[te]&&R($,te,me,we[te],dt))}return $}function F($,_,st){try{typeof $=="function"?$(_):$.current=_}catch(ct){n.__e(ct,st)}}function I($,_,st){var ct,dt;if(n.unmount&&n.unmount($),(ct=$.ref)&&(ct.current&&ct.current!==$.__e||F(ct,null,_)),(ct=$.__c)!=null){if(ct.componentWillUnmount)try{ct.componentWillUnmount()}catch(k){n.__e(k,_)}ct.base=ct.__P=null}if(ct=$.__k)for(dt=0;dt<ct.length;dt++)ct[dt]&&I(ct[dt],_,st||typeof $.type!="function");st||$.__e==null||m($.__e),$.__c=$.__=$.__e=$.__d=void 0}function V($,_,st){return this.constructor($,st)}function O($,_,st){var ct,dt,k,pt;n.__&&n.__($,_),dt=(ct=!1)?null:_.__k,k=[],pt=[],M(_,$=_.__k=y(b,null,[$]),dt||f,f,_.namespaceURI,dt?null:_.firstChild?t.call(_.childNodes):null,k,dt?dt.__e:_.firstChild,ct,pt),L(k,$,pt)}function j($,_,st){var ct,dt,k,pt,oe=v({},$.props);for(k in $.type&&$.type.defaultProps&&(pt=$.type.defaultProps),_)k=="key"?ct=_[k]:k=="ref"?dt=_[k]:oe[k]=_[k]===void 0&&pt!==void 0?pt[k]:_[k];return arguments.length>2&&(oe.children=arguments.length>3?t.call(arguments,2):st),g($.type,oe,ct||$.key,dt||$.ref,null)}function q($,_){var st={__c:_="__cC"+s++,__:$,Consumer:function(ct,dt){return ct.children(dt)},Provider:function(ct){var dt,k;return this.getChildContext||(dt=[],(k={})[_]=this,this.getChildContext=function(){return k},this.shouldComponentUpdate=function(pt){this.props.value!==pt.value&&dt.some((function(oe){oe.__e=!0,P(oe)}))},this.sub=function(pt){dt.push(pt);var oe=pt.componentWillUnmount;pt.componentWillUnmount=function(){dt.splice(dt.indexOf(pt),1),oe&&oe.call(pt)}}),ct.children}};return st.Provider.__=st.Consumer.contextType=st}t=p.slice,n={__e:function($,_,st,ct){for(var dt,k,pt;_=_.__;)if((dt=_.__c)&&!dt.__)try{if((k=dt.constructor)&&k.getDerivedStateFromError!=null&&(dt.setState(k.getDerivedStateFromError($)),pt=dt.__d),dt.componentDidCatch!=null&&(dt.componentDidCatch($,ct||{}),pt=dt.__d),pt)return dt.__E=dt}catch(oe){$=oe}throw $}},e=0,C.prototype.setState=function($,_){var st;st=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=v({},this.state),typeof $=="function"&&($=$(v({},st),this.props)),$&&v(st,$),$!=null&&this.__v&&(_&&this._sb.push(_),P(this))},C.prototype.forceUpdate=function($){this.__v&&(this.__e=!0,$&&this.__h.push($),P(this))},C.prototype.render=b,r=[],u=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=function($,_){return $.__v.__b-_.__v.__b},U.__r=0,l=0,c=T(!1),a=T(!0),s=0;var B,K,z,G,J=0,Q=[],X=[],Y=n,Z=Y.__b,tt=Y.__r,nt=Y.diffed,et=Y.__c,_t=Y.unmount,rt=Y.__;function ot($,_){Y.__h&&Y.__h(K,$,J||_),J=0;var st=K.__H||(K.__H={__:[],__h:[]});return $>=st.__.length&&st.__.push({__V:X}),st.__[$]}function ut($){return J=1,it(wt,$)}function it($,_,st){var ct=ot(B++,2);if(ct.t=$,!ct.__c&&(ct.__=[wt(void 0,_),function(oe){var Zt=ct.__N?ct.__N[0]:ct.__[0],te=ct.t(Zt,oe);Zt!==te&&(ct.__N=[te,ct.__[1]],ct.__c.setState({}))}],ct.__c=K,!K.u)){var dt=function(oe,Zt,te){if(!ct.__c.__H)return!0;var ne=ct.__c.__H.__.filter((function(se){return!!se.__c}));if(ne.every((function(se){return!se.__N})))return!k||k.call(this,oe,Zt,te);var Yt=!1;return ne.forEach((function(se){if(se.__N){var ae=se.__[0];se.__=se.__N,se.__N=void 0,ae!==se.__[0]&&(Yt=!0)}})),!(!Yt&&ct.__c.props===oe)&&(!k||k.call(this,oe,Zt,te))};K.u=!0;var k=K.shouldComponentUpdate,pt=K.componentWillUpdate;K.componentWillUpdate=function(oe,Zt,te){if(this.__e){var ne=k;k=void 0,dt(oe,Zt,te),k=ne}pt&&pt.call(this,oe,Zt,te)},K.shouldComponentUpdate=dt}return ct.__N||ct.__}function lt($,_){var st=ot(B++,3);!Y.__s&&xt(st.__H,_)&&(st.__=$,st.i=_,K.__H.__h.push(st))}function at($){return J=5,ft((function(){return{current:$}}),[])}function ft($,_){var st=ot(B++,7);return xt(st.__H,_)?(st.__V=$(),st.i=_,st.__h=$,st.__V):st.__}function ht($){var _=K.context[$.__c],st=ot(B++,9);return st.c=$,_?(st.__==null&&(st.__=!0,_.sub(K)),_.props.value):$.__}function yt(){for(var $;$=Q.shift();)if($.__P&&$.__H)try{$.__H.__h.forEach(bt),$.__H.__h.forEach(Ct),$.__H.__h=[]}catch(_){$.__H.__h=[],Y.__e(_,$.__v)}}Y.__b=function($){K=null,Z&&Z($)},Y.__=function($,_){$&&_.__k&&_.__k.__m&&($.__m=_.__k.__m),rt&&rt($,_)},Y.__r=function($){tt&&tt($),B=0;var _=(K=$.__c).__H;_&&(z===K?(_.__h=[],K.__h=[],_.__.forEach((function(st){st.__N&&(st.__=st.__N),st.__V=X,st.__N=st.i=void 0}))):(_.__h.forEach(bt),_.__h.forEach(Ct),_.__h=[],B=0)),z=K},Y.diffed=function($){nt&&nt($);var _=$.__c;_&&_.__H&&(_.__H.__h.length&&(Q.push(_)!==1&&G===Y.requestAnimationFrame||((G=Y.requestAnimationFrame)||kt)(yt)),_.__H.__.forEach((function(st){st.i&&(st.__H=st.i),st.__V!==X&&(st.__=st.__V),st.i=void 0,st.__V=X}))),z=K=null},Y.__c=function($,_){_.some((function(st){try{st.__h.forEach(bt),st.__h=st.__h.filter((function(ct){return!ct.__||Ct(ct)}))}catch(ct){_.some((function(dt){dt.__h&&(dt.__h=[])})),_=[],Y.__e(ct,st.__v)}})),et&&et($,_)},Y.unmount=function($){_t&&_t($);var _,st=$.__c;st&&st.__H&&(st.__H.__.forEach((function(ct){try{bt(ct)}catch(dt){_=dt}})),st.__H=void 0,_&&Y.__e(_,st.__v))};var gt=typeof requestAnimationFrame=="function";function kt($){var _,st=function(){clearTimeout(ct),gt&&cancelAnimationFrame(_),setTimeout($)},ct=setTimeout(st,100);gt&&(_=requestAnimationFrame(st))}function bt($){var _=K,st=$.__c;typeof st=="function"&&($.__c=void 0,st()),K=_}function Ct($){var _=K;$.__c=$.__(),K=_}function xt($,_){return!$||$.length!==_.length||_.some((function(st,ct){return st!==$[ct]}))}function wt($,_){return typeof _=="function"?_($):_}var Pt=function($,_,st,ct){var dt;_[0]=0;for(var k=1;k<_.length;k++){var pt=_[k++],oe=_[k]?(_[0]|=pt?1:2,st[_[k++]]):_[++k];pt===3?ct[0]=oe:pt===4?ct[1]=Object.assign(ct[1]||{},oe):pt===5?(ct[1]=ct[1]||{})[_[++k]]=oe:pt===6?ct[1][_[++k]]+=oe+"":pt?(dt=$.apply(oe,Pt($,oe,st,["",null])),ct.push(dt),oe[0]?_[0]|=2:(_[k-2]=0,_[k]=dt)):ct.push(oe)}return ct},Ut=new Map;function Ht($){var _=Ut.get(this);return _||(_=new Map,Ut.set(this,_)),(_=Pt(this,_.get($)||(_.set($,_=(function(st){for(var ct,dt,k=1,pt="",oe="",Zt=[0],te=function(se){k===1&&(se||(pt=pt.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?Zt.push(0,se,pt):k===3&&(se||pt)?(Zt.push(3,se,pt),k=2):k===2&&pt==="..."&&se?Zt.push(4,se,0):k===2&&pt&&!se?Zt.push(5,0,!0,pt):k>=5&&((pt||!se&&k===5)&&(Zt.push(k,0,pt,dt),k=6),se&&(Zt.push(k,se,0,dt),k=6)),pt=""},ne=0;ne<st.length;ne++){ne&&(k===1&&te(),te(ne));for(var Yt=0;Yt<st[ne].length;Yt++)ct=st[ne][Yt],k===1?ct==="<"?(te(),Zt=[Zt],k=3):pt+=ct:k===4?pt==="--"&&ct===">"?(k=1,pt=""):pt=ct+pt[0]:oe?ct===oe?oe="":pt+=ct:ct==='"'||ct==="'"?oe=ct:ct===">"?(te(),k=1):k&&(ct==="="?(k=5,dt=pt,pt=""):ct==="/"&&(k<5||st[ne][Yt+1]===">")?(te(),k===3&&(Zt=Zt[0]),k=Zt,(Zt=Zt[0]).push(2,0,k),k=0):ct===" "||ct==="	"||ct===`
`||ct==="\r"?(te(),k=2):pt+=ct),k===3&&pt==="!--"&&(k=4,Zt=Zt[0])}return te(),Zt})($)),_),arguments,[])).length>1?_:_[0]}var Et=Ht.bind(y),St={};function At($,_){for(var st in _)$[st]=_[st];return $}function Dt($,_,st){var ct,dt=/(?:\?([^#]*))?(#.*)?$/,k=$.match(dt),pt={};if(k&&k[1])for(var oe=k[1].split("&"),Zt=0;Zt<oe.length;Zt++){var te=oe[Zt].split("=");pt[decodeURIComponent(te[0])]=decodeURIComponent(te.slice(1).join("="))}$=Tt($.replace(dt,"")),_=Tt(_||"");for(var ne=Math.max($.length,_.length),Yt=0;Yt<ne;Yt++)if(_[Yt]&&_[Yt].charAt(0)===":"){var se=_[Yt].replace(/(^:|[+*?]+$)/g,""),ae=(_[Yt].match(/[+*?]+$/)||St)[0]||"",ue=~ae.indexOf("+"),me=~ae.indexOf("*"),we=$[Yt]||"";if(!we&&!me&&(ae.indexOf("?")<0||ue)){ct=!1;break}if(pt[se]=decodeURIComponent(we),ue||me){pt[se]=$.slice(Yt).map(decodeURIComponent).join("/");break}}else if(_[Yt]!==$[Yt]){ct=!1;break}return(st.default===!0||ct!==!1)&&pt}function Nt($,_){return $.rank<_.rank?1:$.rank>_.rank?-1:$.index-_.index}function Rt($,_){return $.index=_,$.rank=(function(st){return st.props.default?0:Tt(st.props.path).map(Mt).join("")})($),$.props}function Tt($){return $.replace(/(^\/+|\/+$)/g,"").split("/")}function Mt($){return $.charAt(0)==":"?1+"*+?".indexOf($.charAt($.length-1))||4:5}var Lt={},Wt=[],Ft=[],It=null,Vt={url:jt()},Ot=q(Vt);function jt(){var $;return""+(($=It&&It.location?It.location:It&&It.getCurrentLocation?It.getCurrentLocation():typeof location<"u"?location:Lt).pathname||"")+($.search||"")}function qt($,_){return _===void 0&&(_=!1),typeof $!="string"&&$.url&&(_=$.replace,$=$.url),(function(st){for(var ct=Wt.length;ct--;)if(Wt[ct].canRoute(st))return!0;return!1})($)&&(function(st,ct){ct===void 0&&(ct="push"),It&&It[ct]?It[ct](st):typeof history<"u"&&history[ct+"State"]&&history[ct+"State"](null,null,st)})($,_?"replace":"push"),Bt($)}function Bt($){for(var _=!1,st=0;st<Wt.length;st++)Wt[st].routeTo($)&&(_=!0);return _}function Kt($){if($&&$.getAttribute){var _=$.getAttribute("href"),st=$.getAttribute("target");if(_&&_.match(/^\//g)&&(!st||st.match(/^_?self$/i)))return qt(_)}}function zt($){return $.stopImmediatePropagation&&$.stopImmediatePropagation(),$.stopPropagation&&$.stopPropagation(),$.preventDefault(),!1}function Gt($){if(!($.ctrlKey||$.metaKey||$.altKey||$.shiftKey||$.button)){var _=$.target;do if(_.localName==="a"&&_.getAttribute("href")){if(_.hasAttribute("data-native")||_.hasAttribute("native"))return;if(Kt(_))return zt($)}while(_=_.parentNode)}}var Jt=!1;function Qt($){$.history&&(It=$.history),this.state={url:$.url||jt()}}At(Qt.prototype=new C,{shouldComponentUpdate:function($){return $.static!==!0||$.url!==this.props.url||$.onChange!==this.props.onChange},canRoute:function($){var _=A(this.props.children);return this.g(_,$)!==void 0},routeTo:function($){this.setState({url:$});var _=this.canRoute($);return this.p||this.forceUpdate(),_},componentWillMount:function(){this.p=!0},componentDidMount:function(){var $=this;Jt||(Jt=!0,It||addEventListener("popstate",(function(){Bt(jt())})),addEventListener("click",Gt)),Wt.push(this),It&&(this.u=It.listen((function(_){var st=_.location||_;$.routeTo(""+(st.pathname||"")+(st.search||""))}))),this.p=!1},componentWillUnmount:function(){typeof this.u=="function"&&this.u(),Wt.splice(Wt.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function($,_){$=$.filter(Rt).sort(Nt);for(var st=0;st<$.length;st++){var ct=$[st],dt=Dt(_,ct.props.path,ct.props);if(dt)return[ct,dt]}},render:function($,_){var st,ct,dt=$.onChange,k=_.url,pt=this.c,oe=this.g(A($.children),k);if(oe&&(ct=j(oe[0],At(At({url:k,matches:st=oe[1]},st),{key:void 0,ref:void 0}))),k!==(pt&&pt.url)){At(Vt,pt=this.c={url:k,previous:pt&&pt.url,current:ct,path:ct?ct.props.path:null,matches:st}),pt.router=this,pt.active=ct?[ct]:[];for(var Zt=Ft.length;Zt--;)Ft[Zt]({});typeof dt=="function"&&dt(pt)}return y(Ot.Provider,{value:pt},ct)}});const StateContext=q(null),switchIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='652.000000pt'%20height='956.000000pt'%20viewBox='0%200%20652.000000%20956.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,956.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M1150%209540%20c-386%20-6%20-408%20-8%20-475%20-29%20-147%20-48%20-255%20-115%20-368%20-226%20-93%20-91%20-145%20-159%20-191%20-250%20-74%20-146%20-77%20-163%20-87%20-455%20-10%20-318%20-14%20-7639%20-4%20-7725%2025%20-214%20107%20-394%20245%20-539%20115%20-121%20227%20-192%20408%20-260%20l72%20-28%202418%20-1%20c2586%20-2%202582%20-2%202716%2047%20254%2092%20492%20346%20573%20611%2017%2058%2018%20211%2018%204095%20l0%204035%20-23%2075%20c-61%20193%20-204%20388%20-368%20501%20-76%2052%20-226%20118%20-294%20129%20-36%206%20-229%2015%20-430%2020%20-398%2010%20-3557%2010%20-4210%200z%20m4610%20-328%20c164%20-59%20291%20-175%20374%20-339%20l36%20-73%200%20-4016%200%20-4016%20-45%20-88%20c-25%20-48%20-70%20-115%20-101%20-148%20-64%20-71%20-175%20-148%20-242%20-168%20-103%20-32%20-400%20-35%20-2687%20-32%20-2180%203%20-2282%204%20-2335%2022%20-204%2068%20-363%20240%20-417%20452%20-17%2065%20-18%20275%20-18%203979%200%203785%201%203912%2019%203980%2024%2091%2084%20207%20140%20271%2055%2062%20182%20152%20244%20171%2027%208%20121%2018%20222%2022%2096%205%201203%208%202460%207%20l2285%20-1%2065%20-23z'/%3e%3cpath%20d='M1434%208128%20l-45%20-41%203%20-3291%20c3%20-3127%204%20-3293%2021%20-3323%209%20-18%2029%20-41%2044%20-50%2026%20-17%20125%20-18%201799%20-18%201918%200%201808%20-3%201834%2054%207%2014%2016%2067%2021%20116%205%2050%209%20789%209%201644%20l0%201554%20249%20981%20c358%201405%20401%201581%20401%201626%200%2051%204%2046%20-414%20468%20l-321%20322%20-1778%200%20-1777%200%20-46%20-42z%20m3636%20-425%20l165%20-168%20-185%20-6%20c-102%20-4%20-770%20-7%20-1485%20-8%20l-1300%20-1%20-145%20148%20c-80%2081%20-156%20159%20-170%20175%20l-23%2027%201489%200%201490%200%20164%20-167z%20m-3078%20-356%20l31%20-38%20-147%20-583%20c-81%20-320%20-153%20-602%20-160%20-626%20-12%20-39%20-13%20-23%20-19%20185%20-9%20291%20-9%20823%200%201123%20l6%20233%20129%20-128%20c71%20-70%20143%20-145%20160%20-166z%20m2900%20-136%20c278%20-3%20510%20-9%20513%20-13%2010%20-10%203%20-40%20-305%20-1260%20l-280%20-1107%200%20-1565%200%20-1566%20-1565%200%20-1565%200%200%201521%200%201520%20310%201226%20c171%20675%20313%201229%20316%201232%2014%2014%201788%2022%202576%2012z'/%3e%3cpath%20d='M3765%206820%20c-61%20-25%20-87%20-94%20-185%20-473%20-80%20-315%20-120%20-493%20-120%20-540%200%20-77%2078%20-141%20163%20-134%2069%206%20101%2040%20131%20141%2057%20190%20197%20746%20212%20843%205%2032%201%2053%20-19%2096%20-22%2048%20-30%2057%20-64%2066%20-44%2013%20-90%2013%20-118%201z'/%3e%3cpath%20d='M3098%203406%20c-104%20-37%20-216%20-134%20-264%20-227%20-24%20-47%20-28%20-71%20-35%20-184%20-19%20-311%20-7%20-500%2037%20-586%2040%20-80%20113%20-151%20201%20-195%20l76%20-39%20151%200%20151%200%2068%2034%20c81%2041%20167%20128%20215%20218%20l32%2061%200%20302%200%20302%20-41%2078%20c-65%20127%20-156%20201%20-284%20235%20-73%2019%20-255%2019%20-307%201z%20m262%20-311%20c58%20-30%2064%20-57%2068%20-301%204%20-219%204%20-222%20-19%20-253%20-65%20-88%20-230%20-95%20-286%20-13%20-16%2024%20-18%2055%20-21%20273%20l-3%20246%2038%2030%20c21%2017%2045%2033%2053%2036%2025%2011%20137%20-1%20170%20-18z'/%3e%3c/g%3e%3c/svg%3e",buttonIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M790%201280%20l0%20-420%2065%200%2065%200%200%20420%200%20420%20-65%200%20-65%200%200%20-420z'/%3e%3cpath%20d='M489%201612%20c-228%20-114%20-386%20-309%20-451%20-557%20-29%20-110%20-29%20-297%200%20-406%2081%20-301%20308%20-530%20607%20-610%20112%20-30%20307%20-30%20420%200%20294%2077%20529%20312%20606%20606%2029%20110%2030%20307%201%20416%20-67%20251%20-245%20462%20-477%20565%20l-55%2024%200%20-74%200%20-74%2072%20-42%20c280%20-167%20411%20-508%20313%20-817%20-35%20-110%20-88%20-196%20-175%20-283%20-87%20-87%20-172%20-139%20-285%20-177%20-70%20-23%20-96%20-27%20-210%20-27%20-114%200%20-140%204%20-210%2027%20-293%2097%20-495%20372%20-495%20673%200%2070%2025%20193%2055%20266%2054%20133%20182%20279%20299%20339%20l66%2034%200%2078%20c0%2042%20-1%2077%20-2%2077%20-2%200%20-37%20-18%20-79%20-38z'/%3e%3c/g%3e%3c/svg%3e",timerIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M818%201670%20c-24%20-15%20-31%20-77%20-23%20-221%208%20-141%2015%20-159%2064%20-159%2050%200%2060%2024%2063%20150%20l3%20115%2030%20-3%20c172%20-19%20366%20-132%20472%20-275%2094%20-129%20133%20-236%20140%20-392%206%20-142%20-12%20-230%20-73%20-355%20-82%20-165%20-236%20-296%20-419%20-357%20-71%20-24%20-95%20-27%20-215%20-27%20-118%200%20-145%203%20-212%2026%20-123%2041%20-204%2092%20-298%20187%20-68%2068%20-94%20103%20-127%20171%20-61%20125%20-76%20203%20-71%20352%206%20153%2036%20243%20122%20371%2064%2095%2068%20127%2021%20149%20-39%2017%20-68%202%20-113%20-59%20-94%20-127%20-150%20-285%20-159%20-449%20-23%20-399%20236%20-749%20632%20-855%20111%20-30%20297%20-30%20410%200%20449%20119%20716%20562%20610%201011%20-23%2095%20-105%20254%20-173%20336%20-111%20131%20-276%20234%20-442%20274%20-89%2021%20-213%2026%20-242%2010z'/%3e%3cpath%20d='M452%201258%20c-7%20-7%20-12%20-17%20-12%20-23%200%20-21%20330%20-469%20358%20-487%2043%20-28%20106%20-23%20143%2010%2043%2038%2052%20113%2020%20154%20-20%2025%20-454%20342%20-484%20354%20-7%202%20-18%20-1%20-25%20-8z'/%3e%3c/g%3e%3c/svg%3e",owIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='110.000000pt'%20height='52.000000pt'%20viewBox='0%200%20110.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M171%20500%20c-50%20-12%20-83%20-41%20-111%20-96%20-22%20-43%20-25%20-62%20-24%20-149%200%20-141%2027%20-199%20109%20-236%2073%20-33%20180%20-16%20227%2037%2067%2076%2074%20284%2013%20376%20-39%2059%20-133%2089%20-214%2068z%20m119%20-65%20c50%20-26%2065%20-67%2065%20-180%200%20-146%20-32%20-195%20-128%20-195%20-40%200%20-54%205%20-77%2028%20-16%2016%20-34%2049%20-40%2073%20-16%2056%20-7%20186%2014%20227%2030%2057%20105%2078%20166%2047z'/%3e%3cpath%20d='M482%20483%20c3%20-10%2029%20-120%2058%20-245%20l54%20-228%2038%200%20c43%200%2035%20-20%2089%20215%2017%2077%2035%20146%2038%20152%204%207%2026%20-73%2051%20-178%20l44%20-190%2039%203%2040%203%2058%20240%20c32%20132%2058%20241%2059%20243%200%202%20-15%202%20-32%200%20l-32%20-3%20-43%20-180%20c-23%20-99%20-44%20-187%20-46%20-195%20-2%20-8%20-25%2074%20-51%20183%20l-48%20198%20-36%20-3%20-36%20-3%20-45%20-194%20c-25%20-106%20-47%20-188%20-49%20-181%20-3%207%20-23%2095%20-46%20194%20l-42%20181%20-33%203%20c-28%203%20-33%201%20-29%20-15z'/%3e%3c/g%3e%3c/svg%3e",encoderIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='34.000000pt'%20height='52.000000pt'%20viewBox='0%200%2034.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M30%20255%20l0%20-245%20150%200%20150%200%200%2030%200%2030%20-115%200%20-115%200%200%2085%200%2085%2095%200%2095%200%200%2030%200%2030%20-95%200%20-95%200%200%2070%200%2070%20115%200%20115%200%200%2030%200%2030%20-150%200%20-150%200%200%20-245z'/%3e%3c/g%3e%3c/svg%3e",Icons={switchIcon:$=>Et`
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
    </svg>`},tipColors={green:"bg-green-100 text-green-900 ring-green-300",yellow:"bg-yellow-100 text-yellow-900 ring-yellow-300"};function Button({title:$,onclick:_,disabled:st,cls:ct,icon:dt,ref:k,colors:pt,hovercolor:oe,disabledcolor:Zt}){const[te,ne]=ut(!1),Yt=function(se){const ae=_?_():null;ae&&typeof ae.catch=="function"&&(ne(!0),ae.catch(()=>!1).then(()=>ne(!1)))};return pt||(pt="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400"),Et` <button
    type="button"
    class="inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${pt} ${ct}"
    ref=${k}
    onclick=${Yt}
    disabled=${st||te}
  >
    ${$}
    <${te?Icons.refresh:dt} class="w-4 ${te?"animate-spin":""}" />
  <//>`}function Login({loginFn:$,logoIcon:_,title:st,tipText:ct}){const[dt,k]=ut(""),[pt,oe]=ut(""),Zt=function(te){const Yt={Authorization:"Basic "+btoa(dt+":"+pt)};return fetch("api/login",{headers:Yt}).then($).finally(se=>oe(""))};return Et` <div
    class="h-full flex items-center justify-center bg-slate-200"
  >
    <div class="border rounded bg-white w-96 p-5">
      <div class="my-5 py-2 flex items-center justify-center gap-x-4">
        <${_} class="h-12 stroke-cyan-600 stroke-1" />
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
          oninput=${te=>k(te.target.value)}
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
          oninput=${te=>oe(te.target.value)}
          value=${pt}
          onchange=${Zt}
        />
      <//>
      <div class="mt-7">
        <${Button}
          title="Sign In"
          icon=${Icons.logout}
          onclick=${Zt}
          cls="flex w-full justify-center"
        />
      <//>
      <div class="mt-5 text-slate-400 text-xs">${ct}<//>
    <//>
  <//>`}function Colored({icon:$,text:_,colors:st}){return st||(st="bg-slate-100 text-slate-900"),Et` <span class="inline-flex items-center gap-1.5 py-0.5">
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
  <//>`}const ruLangswitch=["","ID - уникальный числовой идентификатор выключателя. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","Device connection - Здесь указаны пины одного или нескольких устройств, с которыми взаимодействует данный выключатель.",'INFO - Укажите название данного выключателя для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение обработчика состояния на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек и соединений выключателя."],ruLangselect=["","ID - уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type(s) of pin(s) - Выберите режим работы данного пина из предложенных вариантов."],rulangbutton=["","ID - уникальный числовой идентификатор кнопки. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","sclick - Выполняемая команда при одинарном клике кнопки.","dclick - Выполняемая команда при двойном клике кнопки.","lpress - Выполняемая команда при удержании кнопки.",'INFO - Укажите название данной кнопки для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение функции кнопки на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек кнопки."],ruencoder=["","ID - уникальный числовой идентификатор энкодера. Присваивается автоматически.","Pin - Уникальный номер пина.","Encoder A (ID) - Основной пин энкодера A (DT).","Encoder B (ID) - Дополнительный пин энкодера B (CLK).","PWM connection - Подключение ШИМ для управления яркостью (диммер).","Dimmer value (0-100) - Текущее значение диммера от 0 до 100.","Duty on restore - Восстановление значения скважности (яркости) при включении контроллера.","INFO - Укажите название данного энкодера для быстрой навигации.","On/Off - Включение или отключение обработчика энкодера.","Action - Кнопка Edit позволяет зайти в меню настроек энкодера.","PWM Frequency - Частота ШИМ управляемого устройства (в герцах).","Resolution (steps) - Максимальное количество шагов от 0 до 100% для ШИМ устройства."],rulangtimers=["","No - Уникальный числовой идентификатор задачи (cron). Присваивается автоматически.","Cron - Сконфигурируйте расписание (cron) для выполнения задачи.","Script - Какое действие (скрипт) должно выполниться в указанное в таймере время.",'Info - Дайте название выбранному таймеру для быстрой навигации, например "Полив газона". Не более 30-ти символов!',"On/Off - Вкл/Откл выполнение данной задачи.","Action - Кнопка Edit позволяет зайти в меню настроек задачи."],rulangsettings=["","Login - Введите имя пользователя для входа в систему. Используется при авторизации в веб-интерфейсе.","Password - Введите пароль для входа в систему. Рекомендуется использовать надёжный пароль.","Time zone UTC - Выберите свой часовой пояс. Влияет на отображение времени и расчёт восхода/заката.","IP address - Введите статический IP-адрес устройства. После перезагрузки STM32 будет доступен по этому адресу. Формат: 192.168.1.100","Subnet mask - Введите маску подсети. Определяет диапазон адресов вашей локальной сети. Формат: 255.255.255.0","Default gateway - Введите IP-адрес шлюза по умолчанию (обычно адрес вашего роутера). Формат: 192.168.1.1","Token - Секретный ключ для авторизации API-запросов. Используется в URL командах управления устройством. Пример: /api/Token/switch?id=1&onoff=1","Host - Введите IP-адрес или доменное имя MQTT-брокера. Пример: 192.168.1.50 или broker.hivemq.com","Port - Укажите порт MQTT-брокера. Стандартный порт: 1883 (без шифрования), 8883 (с TLS).","Client - Уникальный идентификатор клиента MQTT. Каждое устройство должно иметь свой уникальный Client ID.","User - Имя пользователя для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","Password - Пароль для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","TX topic - Исходящий топик MQTT. На этот топик устройство публикует свои данные и события. Пример: Swarm","RX topic - Входящий топик MQTT. С этого топика устройство получает команды управления. Пример: Swarm","HTTPS domain - Доменное имя для HTTPS-соединения. Необходим действующий SSL-сертификат для этого домена. Пример: zagotovka.ddns.net",'Private Key - Закрытый ключ SSL-сертификата в формате PEM. Начинается с "-----BEGIN EC PRIVATE KEY-----". Хранится в зашифрованном виде.','Public Key - Публичный сертификат SSL в формате PEM. Начинается с "-----BEGIN CERTIFICATE-----". Используется для HTTPS-соединения.',"Longitude - Долгота вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 37.618 (Москва)","Latitude - Широта вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 55.751 (Москва)","Sunrise - Время восхода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на восходе.","Sunset - Время захода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на закате.","Day Length - Продолжительность светового дня, рассчитывается автоматически на основе координат и текущей даты.","Next full moon - Дата и время следующего полнолуния, рассчитывается автоматически.","Date - Дата для автономного (offline) режима в формате дд.мм.гг. Используется когда нет доступа к NTP-серверу. Пример: 15.03.25","Time - Время для автономного (offline) режима в формате чч:мм:сс. Используется когда нет доступа к NTP-серверу. Пример: 14:30:00"],ruLangsecurity=["","RXD Pin - Пин приема данных (RX).","TXD Pin - Пин передачи данных (TX).","Phone Number - Номер телефона для отправки SMS и звонков.","Info - Дополнительная информация для быстрой навигации.","OnOff - Включение или отключение модуля SIM800L.","Action - Кнопка Edit позволяет зайти в меню настроек."],ruLangsecuritypins=["","ID - уникальный числовой идентификатор пина. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type of sensor - Тип подключенного сенсора (PIR, Normal open, Normal close).","Action - Действие, выполняемое при срабатывании сенсора.","Send SMS - Отправлять ли SMS при срабатывании сенсора (YES/NO).","INFO - Дополнительная информация для быстрой навигации.","On/Off - Включение или отключение охранного пина.","Edit Pin - Редактирование настроек охранного пина."],rulange1Wire=["","ID - Уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового пина, к которому подключена шина 1-Wire.","Selected sensor - Здесь вы выбираете подключённый к пину датчик температуры: DS18B20 или DHT22.","Count of sensors - Количество найденных 1-Wire температурных датчиков на данном пине.","On/Off - Функция включения или отключения опроса подключенных датчиков на данной шине.","Actions - Кнопка Edit для привязки конкретного датчика к этому соединению."],rulangpid=["","No - Уникальный числовой идентификатор, присваивается автоматически.",'PWM Pin - Выбранный вами PWM пин на странице "Select pin".',"Sel. sensor - Укажите один из двух типов (DS18B20/DHT22) температурного датчика.",'Dev. ser. number - Серийный номер выбранного DS18B20 датчика (со страницы "OneWire pin").',"Presets - Выберите пресет, максимально соответствующий нужным температурным и временным параметрам.","T set. - Задайте целевую температуру, которую должен поддерживать PID-контроллер.","T cur. - Текущая температура выбранного датчика.","Duty - Текущее значение PWM.",'Info - Название PID-контроллера для быстрой навигации (например: "Тёплый пол в детской").',"On/Off - Вкл/Откл данного PID-контроллера.","Action - Кнопка для входа в меню настроек PID-контроллера.","Auto tune - Автоматический подбор коэффициентов PID."],enLangswitch=["","ID - A unique numerical identifier of the switch. Assigned automatically","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","Device connection - Here will appear one or more devices/relays of pin(s) with which this switch interacts.",'INFO - Give a name of this switch for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the switch state handler on this pin.","Action - The Edit button allows you to access the switch settings menu."],enLangselect=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type(s) of pin(s) - Select the operating mode of this pin from the provided options."],enlangbutton=["","ID - A unique numerical identifier of the button. Assigned automatically.","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","sclick - Command to execute when the button is pressed once.","dclick - Command to execute when the button is pressed twice.","lpress - Command to execute when the button is long pressed.",'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the button function on this pin.","Action - The Edit button allows you to access the button settings menu."],enencoder=["","ID - A unique numerical identifier of the encoder. Assigned automatically.","PIN - The unique number of the pin.","Encoder A (ID) - Main pin of encoder A (DT).","Encoder B (ID) - Additional pin of encoder B (CLK).","PWM connection - PWM connection for brightness control (dimmer).","Dimmer value (0-100) - Current dimmer value from 0 to 100.","Duty on restore - Value of duty cycle (brightness) to restore when the controller is turned on.","INFO - Give a name to this encoder for quick navigation.","On/Off - Enable or disable the encoder handler.","Action - The Edit button allows you to access the encoder settings menu.","PWM Frequency - PWM frequency of the controlled device (in Hertz).","Resolution (steps) - Maximum number of steps from 0 to 100% for the PWM device."],enlangtimers=["","No - A unique numerical identifier of the task (cron). Assigned automatically.","Cron - Configure a schedule (cron) to perform the action.","Script - What action (script) must be performed at the time specified in the timer.",'Info - Give a name to the selected timer for quick navigation, e.g."Lawn Watering", "Backyard Light", etc. No more than 30 characters!',"On/Off - Enable or disable the execution of this task.","Action - The Edit button allows you to access the task settings menu."],enlangsettings=["","Login - Enter the username for logging into the system. Used for web interface authentication.","Password - Enter your password for the system. It is recommended to use a strong password.","Time zone UTC - Select your time zone. Affects time display and sunrise/sunset calculations.","IP address - Enter a static IP address for the device. After reboot, STM32 will be available at this address. Format: 192.168.1.100","Subnet mask - Enter the subnet mask. Defines the range of addresses in your local network. Format: 255.255.255.0","Default gateway - Enter the default gateway IP address (usually your router address). Format: 192.168.1.1","Token - Secret key for API request authorization. Used in device control URL commands. Example: /api/Token/switch?id=1&onoff=1","Host - Enter the IP address or domain name of the MQTT broker. Example: 192.168.1.50 or broker.hivemq.com","Port - Specify the MQTT broker port. Standard port: 1883 (no encryption), 8883 (with TLS).","Client - Unique MQTT client identifier. Each device must have its own unique Client ID.","User - Username for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","Password - Password for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","TX topic - Outgoing MQTT topic. The device publishes its data and events to this topic. Example: Swarm","RX topic - Incoming MQTT topic. The device receives control commands from this topic. Example: Swarm","HTTPS domain - Domain name for HTTPS connection. A valid SSL certificate for this domain is required. Example: zagotovka.ddns.net",'Private Key - SSL certificate private key in PEM format. Starts with "-----BEGIN EC PRIVATE KEY-----". Stored in encrypted form.','Public Key - SSL public certificate in PEM format. Starts with "-----BEGIN CERTIFICATE-----". Used for HTTPS connection.',"Longitude - Longitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 37.618 (Moscow)","Latitude - Latitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 55.751 (Moscow)","Sunrise - Sunrise time is calculated automatically based on your coordinates. The slider enables/disables the action at sunrise.","Sunset - Sunset time is calculated automatically based on your coordinates. The slider enables/disables the action at sunset.","Day Length - Duration of daylight, calculated automatically based on coordinates and current date.","Next full moon - Date and time of the next full moon, calculated automatically.","Date - Date for offline mode in dd.mm.yy format. Used when there is no access to the NTP server. Example: 15.03.25","Time - Time for offline mode in hh:mm:ss format. Used when there is no access to the NTP server. Example: 14:30:00"],enLangsecurity=["","RXD Pin - Receive Data Pin (RX).","TXD Pin - Transmit Data Pin (TX).","Phone Number - Phone number for SMS notifications and calls.","Info - Additional information for quick navigation.","OnOff - Enable or disable the SIM800L module.","Action - The Edit button allows you to access the settings menu."],enLangsecuritypins=["","ID - A unique numerical identifier of the pin. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type of sensor - Type of connected sensor (PIR, Normal open, Normal close).","Action - Action to perform when the sensor is triggered.","Send SMS - Whether to send SMS when the sensor is triggered (YES/NO).","INFO - Additional information for quick navigation.","On/Off - Enable or disable the security pin.","Edit Pin - The Edit button allows you to access the security pin settings."],enlange1Wire=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital pin to which the 1-Wire bus is connected.","Selected sensor - Here you select the temperature sensor connected to the chosen pin: DS18B20 or DHT22.","Count of sensors - Number of 1-Wire temperature sensors on this pin.","On/Off - The function of enabling or disabling polling of connected sensors on this bus.","Actions - The Edit button to bind a specific sensor to this connection."],enlangpid=["","No - Unique numeric identifier, assigned automatically.",'PWM Pin - The PWM pin you selected on the "Select pin" page.',"Sel. sensor - Specify one of the two types (DS18B20/DHT22) of temperature sensors.",'Dev. ser. number - Serial number of the selected DS18B20 sensor (from the "OneWire pin" page).',"Presets - Select the preset that best matches the desired temperature and timing parameters.","T set. - Set the target temperature that the PID controller should maintain.","T cur. - Current temperature of the selected sensor.","Duty - Current PWM value.",'Info - Name of this PID controller for quick navigation (e.g., "Kids room warm floor").',"On/Off - Enable/Disable this PID controller.","Action - Button to enter the PID controller settings menu.","Auto tune - Automatic tuning of PID coefficients."];function initGlobalTooltip$8(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,oe=window.innerWidth,Zt=dt.getBoundingClientRect();let te=Zt.left+Zt.width/2-k/2;te=Math.max(8,Math.min(te,oe-k-8));let ne=Zt.top-pt-8;ne<8&&(ne=Zt.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabSelect({}){const[$,_]=ut(null),[st,ct]=ut({}),[dt,k]=ut(null),[pt,oe]=ut(!1),[Zt,te]=ut(3),[ne,Yt]=ut(!1),[se,ae]=ut("ru"),ue=at(0);lt(()=>{initGlobalTooltip$8()},[]);const me=re=>{Yt(re),ue.current=Date.now()},we=re=>ne&&(re===1||re===35),de=()=>fetch("/api/select/get").then(re=>re.json()).then(re=>{const xe=re.data||re;_(xe),Yt(re.sim800l===1),re.lang&&ae(re.lang);const Ce={};xe.forEach(he=>{Ce[`topin_${he.id}`]=he.topin.toString()}),ct(Ce)});lt(()=>(de(),registerPoll("select","/api/select/get",re=>{if(Date.now()-ue.current<8e3)return;const xe=re.data||re;_(xe),Yt(re.sim800l===1),re.lang&&ae(re.lang);const Ce={};xe.forEach(he=>{Ce["topin_"+he.id]=he.topin.toString()}),ct(Ce)}),()=>unregisterPoll("select")),[]),lt(()=>{let re;return pt&&Zt>0?re=setTimeout(()=>{te(Zt-1)},1e3):Zt===0&&(oe(!1),k(null)),()=>clearTimeout(re)},[pt,Zt]);const ge=async re=>{re.preventDefault();const xe=new FormData(re.target),Ce={lang:se,sim800l:ne?1:0,data:[]};$.forEach(he=>{const ve=xe.get(`topin_${he.id}`);Ce.data.push({id:he.id,pins:he.pins,topin:parseInt(ve),pwm:he.pwm,i2cdata:he.i2cdata,i2cclok:he.i2cclok})}),k("submitting"),oe(!0),te(3);try{const he=await fetch("/api/select/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Ce)});if(!he.ok)throw new Error("Network response was not ok");const ve=await he.json();k("success"),console.log("Success:",ve);const ke={};Ce.data.forEach(le=>{ke[`topin_${le.id}`]=le.topin.toString()}),ct(le=>({...le,...ke})),ue.current=0,de()}catch(he){k("error"),console.error("Error:",he)}},fe=re=>{const{name:xe,value:Ce}=re.target;ct(he=>({...he,[xe]:Ce})),ue.current=Date.now()};if(!$)return"";const _e=()=>({langselect:se==="ru"?ruLangselect:enLangselect}),Se=(re,xe)=>{const Ce=_e(),ve=(Ce[re]&&Ce[re][xe]?Ce[re][xe]:"").split(" "),ke=[];for(let le=0;le<ve.length;le+=15)ke.push(ve.slice(le,le+15).join(" "));return ke.join("<br>")},Te=re=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      style=${re.center?"text-align: center":""}
      data-tip=${Se("langselect",re.tooltipIndex)}
    >
      ${re.title}
    </th>
  `,Ee=({id:re,value:xe,label:Ce,disabled:he=!1,onChange:ve,checked:ke})=>Et`
    <div class="relative">
      <input
        id="${re}_${xe}"
        class="sr-only peer"
        type="radio"
        name="topin_${re}"
        value="${xe}"
        checked=${ke}
        onChange=${ve}
        disabled=${he}
        aria-label="${Ce}"
      />
      <label
        for="${re}_${xe}"
        class="cursor-pointer px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300 
               ${he?"text-gray-400 cursor-not-allowed opacity-60":"text-slate-700 hover:bg-black/5"}
               peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-cyan-500 peer-checked:text-white peer-checked:shadow-sm"
      >
        ${Ce}
      </label>
    </div>
  `,Pe=({d:re})=>Et`
    <tr class="${we(re.id)?"bg-red-200/50 opacity-50 pointer-events-none":re.id%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-2 text-sm text-slate-800">${re.id}</td>
      <td class="px-6 py-2 text-sm text-slate-800 font-medium">${re.pins}</td>
      <td class="px-2 py-2">
        <div class="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
          <${Ee} id=${re.id} value="0"  label="NONE"     checked=${st[`topin_${re.id}`]==="0"}  onChange=${fe} />
          <${Ee} id=${re.id} value="3"  label="SWITCH"   checked=${st[`topin_${re.id}`]==="3"}  onChange=${fe} />
          <${Ee} id=${re.id} value="1"  label="BUTTON"   checked=${st[`topin_${re.id}`]==="1"}  onChange=${fe} />
          <${Ee} id=${re.id} value="2"  label="DEVICE"   checked=${st[`topin_${re.id}`]==="2"}  onChange=${fe} />
          <${Ee} id=${re.id} value="4"  label="1-WIRE"   checked=${st[`topin_${re.id}`]==="4"}  onChange=${fe} />
          <${Ee} id=${re.id} value="5"  label="PWM"      disabled=${re.pwm==0} checked=${st[`topin_${re.id}`]==="5"}  onChange=${fe} />
          <${Ee} id=${re.id} value="8"  label="Enc.OutA" checked=${st[`topin_${re.id}`]==="8"}  onChange=${fe} />
          <${Ee} id=${re.id} value="9"  label="Enc.OutB" checked=${st[`topin_${re.id}`]==="9"}  onChange=${fe} />
          <${Ee} id=${re.id} value="10" label="Security" disabled=${re.monitoring==0} checked=${st[`topin_${re.id}`]==="10"} onChange=${fe} />
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

        <form onSubmit=${ge}>
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
                  onChange=${re=>me(re.target.checked)}
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

          <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner overflow-auto">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <${Te} title="ID" tooltipIndex=${1} />
                    <${Te} title="Pin" tooltipIndex=${2} />
                    <${Te} title="Type(s) of pin(s)" tooltipIndex=${3} center=${!0} />
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/40">
                  ${$&&$.map(re=>Et`<${Pe} d=${re} />`)}
                </tbody>
              </table>
            </div>
          </div>

          <div class="mt-6 flex justify-start">
            <button
              type="submit"
              class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${pt?"bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none":"bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"}`}
              disabled=${pt}
            >
              ${pt?`Please wait ${Zt} sec.`:"Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `}function ModalSwitch({modalType:$,page:_,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedSwitch:k,onSwitchChange:pt,connectionOptions:oe,SliderComponent:Zt=MyPolzunok}){const[te,ne]=ut((k==null?void 0:k.info)||""),[Yt,se]=ut((k==null?void 0:k.onoff)||0),[ae,ue]=ut((k==null?void 0:k.ptype)||0),[me,we]=ut((k==null?void 0:k.setrpins)||""),[de,ge]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(ve=>{if(!ve.ok)throw new Error(`HTTP error! status: ${ve.status}`);return ve.json()}).then(ve=>{if(!ve||!ve.data||!Array.isArray(ve.data)){console.error("Invalid data format:",ve),ge([]);return}const ke=ve.data.filter(le=>le.topin===2);ge(ke)}).catch(ve=>{console.error("Error fetching pin config:",ve),ge([])})},[]);const fe=ve=>{ve.preventDefault();const ke=new FormData(ve.target),le=Object.fromEntries(ke);if(le.id=k.id,le.pins=k.pins,$==="edit")le.onoff=Yt;else if($==="connection"){const ee=de.find(mt=>mt.pins===le.setrpins);ee&&(le.pinact={...k.pinact,[ee.id]:ee.pins})}fetch("/api/switch/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(le)}).then(ee=>ee.json()).then(ee=>{console.log("Success:",ee),pt({...k,...le}),st(),window.location.href="/#/switch"}).catch(ee=>{console.error("Error:",ee)})},_e=ve=>{we(ve.target.value)},Se=ve=>{ue(parseInt(ve.target.value))},Te=ve=>{ne(ve.target.value)},Ee=ve=>{se(ve)},Pe=ve=>{ct&&ve.target===ve.currentTarget&&st()},re=()=>{ue(0),ne(""),se(0)},Ce=Et`
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
                        value=${de.some(ve=>ve.pins===me)?me:""}
                        onchange=${_e}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select a connection</option>
                        ${de.map(ve=>Et`
                            <option value=${ve.pins}>
                              ${ve.pins} (ID: ${ve.id})
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
                        value=${te}
                        oninput=${Te}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${Zt}
                        value=${Yt}
                        onChange=${Ee}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-between items-center mt-4">
              <button
                type="button"
                onclick=${re}
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
  `,he=at(null);return lt(()=>{const ve=document.createElement("div");return ve.id="modal-portal",document.body.appendChild(ve),he.current=ve,()=>{O(null,ve),document.body.removeChild(ve)}},[]),lt(()=>{he.current&&O(Ce,he.current)}),null}const _inflight=new Map,_lastError=new Map,DEFAULT_TIMEOUT=5e3,MIN_RETRY_MS=2e3;function safeFetch($,_,st={},ct=DEFAULT_TIMEOUT){if(_inflight.get(_))return Promise.resolve(null);const dt=_lastError.get(_);if(dt&&Date.now()-dt<MIN_RETRY_MS)return Promise.resolve(null);_inflight.set(_,!0),_lastError.delete(_);const k=new AbortController,pt=setTimeout(()=>k.abort(),ct);return fetch($,{...st,signal:k.signal}).then(oe=>{if(oe.status===304)return null;if(!oe.ok)throw new Error("HTTP "+oe.status);return oe.json()}).catch(oe=>(_lastError.set(_,Date.now()),oe.name!=="AbortError"&&console.warn("[safeFetch] "+_+": "+oe.message),null)).finally(()=>{clearTimeout(pt),_inflight.delete(_)})}function initGlobalTooltip$7(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block";const k=dt.getBoundingClientRect();$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const pt=$.offsetWidth,oe=$.offsetHeight,Zt=window.innerWidth;let te=k.left+k.width/2-pt/2;te=Math.max(8,Math.min(te,Zt-pt-8));let ne=k.top-oe-8;ne<8&&(ne=k.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabSwitch({}){const[$,_]=ut(null),[st,ct]=ut(null),[dt,k]=ut(!1),[pt,oe]=ut(null),[Zt,te]=ut(null),[ne,Yt]=ut(!1),[se,ae]=ut("ru"),[ue,me]=ut(null),[we,de]=ut([]),[ge,fe]=ut(""),[_e,Se]=ut(!1),Te=at(!1);lt(()=>{initGlobalTooltip$7()},[]);const Ee=()=>Promise.all([fetch("/api/switch/get").then($t=>$t.json()),fetch("/api/pintopin/get").then($t=>$t.json())]).then(([$t,ie])=>{ae($t.lang),me($t.switches),_($t),de(ie),fe(`Pintopin data: ${JSON.stringify(ie,null,2)}

Switch data: ${JSON.stringify($t.switches,null,2)}`),console.log("Pintopin data:",ie),console.log("Switch data:",$t.switches)}).catch($t=>{console.error("Error fetching data:",$t),fe(`Error fetching data: ${$t.message}`)}),Pe=()=>{safeFetch("/api/switch/get","switch").then($t=>{$t&&(me($t.switches),ae($t.lang))})},re=()=>{safeFetch("/api/pintopin/get","pintopin-sw").then($t=>{$t&&de($t)})};lt(()=>(Pe(),re(),registerPoll("switches","/api/switches",$t=>{Te.current||($t.switches&&(me($t.switches),ae($t.lang)),$t.pintopin&&de($t.pintopin))}),()=>unregisterPoll("switches")),[]);const xe=$t=>{const ie=new Map,ye=ue.find($e=>$e.id===$t);return ye&&ye.pinact&&Object.entries(ye.pinact).forEach(([$e,Oe])=>{ie.set($e,{pin:$e,relayId:Oe})}),we.forEach($e=>{if($e.idin===$t){const Oe=`${$e.pins}(${$e.idout})`;ie.has(Oe)||ie.set(Oe,{pin:$e.pins,relayId:$e.idout})}}),Array.from(ie.values())},Ce=()=>({langswitch:se==="ru"?ruLangswitch:enLangswitch}),he=($t,ie)=>{const ye=Ce(),Oe=(ye[$t]&&ye[$t][ie]||"").split(" "),De=[];let vt="";for(let be=0;be<Oe.length;be++){const pe=Oe[be];vt.length+pe.length+1<=200?vt+=(vt.length>0?" ":"")+pe:(vt.length>0&&De.push(vt),vt=pe)}return vt.length>0&&De.push(vt),De.join("<br>")},ve=($t,ie)=>{console.log("Удаление соединения:",$t,ie);const[ye,$e]=ie.split("("),Oe=$e?parseInt($e):null;fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:$t,pin:ye.trim()})}).then(De=>De.json()).then(De=>{ct(De),me(vt=>vt.map(be=>{if(be.id===$t){const pe={...be.pinact};return delete pe[ye.trim()],{...be,pinact:pe}}return be})),de(vt=>vt.filter(be=>!(be.idin===$t&&be.pins===ye.trim()&&(Oe===null||be.idout===Oe))))}).then(()=>{console.log("Соединение удалено успешно"),Ee()}).catch(De=>{console.error("Ошибка при удалении соединения:",De)})},ke=($t,ie)=>{oe($t),te(ie),k(!0)},le=()=>{k(!1),oe(null),te(null)},ee=$t=>{console.log("handleSwitchChange:",$t),me(ie=>ie.map(ye=>ye.id===$t.id?$t:ye)),Te.current=!0,fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:$t.id,onoff:$t.onoff})}).then(ie=>ie.json()).then(ie=>{console.log("Response from /api/onoff/set:",ie)}).catch(ie=>{console.error("Error calling /api/onoff/set:",ie)}).finally(()=>{setTimeout(()=>{Te.current=!1},1500)}),le()},mt={ru:Et`
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
    `},Xt=$t=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${he("langswitch",$t.tooltipIndex)}
    >
      ${$t.title}
    </th>
  `,ce=({d:$t,index:ie})=>{const ye=xe($t.id);return Et`
      <tr class="${ie%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${$t.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${$t.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][$t.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono">
          ${ye.map(({pin:$e,relayId:Oe})=>Et`
              <span class="mr-2 inline-flex items-center">
                ${$e}${Oe!==void 0?`(${Oe})`:""}
                <button
                  onClick=${De=>{De.preventDefault(),ve($t.id,`${$e}(${Oe})`)}}
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
            onChange=${$e=>ee({...$t,onoff:$e})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>ke("connection",$t)}
            class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
          >
            Connection
          </button>
          <span class="text-slate-300">|</span>
          <button
            onClick=${()=>ke("edit",$t)}
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
                      <${Xt} title="ID" tooltipIndex=${1} />
                      <${Xt} title="Pin" tooltipIndex=${2} />
                      <${Xt} title="Pullup type" tooltipIndex=${3} />
                      <${Xt} title="Device connection" tooltipIndex=${4} />
                      <${Xt} title="INFO" tooltipIndex=${5} />
                      <${Xt} title="On/Off" tooltipIndex=${6} />
                      <${Xt} title="Action" tooltipIndex=${7} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${ue.map(($t,ie)=>Et`<${ce} d=${$t} index=${ie} key=${$t.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>Yt(!ne)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${ne?"Hide Help":"Show Help"}
              </button>
            </div>

            ${ne&&Et`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${mt[se]}
                </div>
              `}
          </div>
        </div>

        ${dt&&Et`
            <${ModalSwitch}
              modalType=${pt}
              page="TabSwitch"
              hideModal=${le}
              title=${pt==="connection"?"Edit Connection":"Edit switch"}
              selectedSwitch=${Zt}
              onSwitchChange=${ee}
            />
          `}
      </div>
    </div>
  `:""}const ModalButton=({modalType,page,hideModal,closeOnOverlayClick=!0,title,selectedButton,onButtonChange,SliderComponent=MyPolzunok})=>{const[buttonInfo,setButtonInfo]=ut((selectedButton==null?void 0:selectedButton.info)||""),[onoff,setOnOff]=ut((selectedButton==null?void 0:selectedButton.onoff)||0),[ptype,setPtype]=ut((selectedButton==null?void 0:selectedButton.ptype)||0),[sclick,setSclick]=ut((selectedButton==null?void 0:selectedButton.sclick)||""),[dclick,setDclick]=ut((selectedButton==null?void 0:selectedButton.dclick)||""),[lpress,setLpress]=ut((selectedButton==null?void 0:selectedButton.lpress)||""),[pinOptions,setPinOptions]=ut([]),[errors,setErrors]=ut({sclick:null,dclick:null,lpress:null}),[submitError,setSubmitError]=ut(null),doubleClickLongPressRegex=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,validateInput=$=>!$||$.trim()===""||$.toLowerCase()==="none"||doubleClickLongPressRegex.test($)?null:'Incorrect format. Use "None" or "pin:value" format.',handleInputChange=($,_)=>{const st=validateInput(_);switch(setErrors(ct=>({...ct,[$]:st})),$){case"sclick":setSclick(_);break;case"dclick":setDclick(_);break;case"lpress":setLpress(_);break}};lt(()=>{fetch("/api/select/get").then($=>$.json()).then($=>{Array.isArray($)?setPinOptions($.filter(_=>_.topin===2)):setPinOptions([])}).catch($=>{console.error("Error fetching pin config:",$),setPinOptions([])})},[]);const handleSubmit=$=>{if($.preventDefault(),Object.values(errors).some(st=>st!==null)){setSubmitError("Please correct the errors before submitting.");return}const _={...selectedButton,info:buttonInfo,sclick:sclick||"None",dclick:dclick||"None",lpress:lpress||"None",onoff,ptype};fetch("/api/button/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(_)}).then(st=>st.json()).then(st=>{onButtonChange(_),hideModal()}).catch(st=>{console.error("Error:",st),setSubmitError("Failed to save changes. Please try again.")})},handleResetPin=()=>{setPtype(0),setSclick(""),setDclick(""),setLpress(""),setButtonInfo(""),setOnOff(0),setErrors({sclick:null,dclick:null,lpress:null})},renderConnectionModal=()=>Et`
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
  `,portalRef=at(null);return lt(()=>{const $=document.createElement("div");return $.id="modal-portal",document.body.appendChild($),portalRef.current=$,()=>{O(null,$),document.body.removeChild($)}},[]),lt(()=>{portalRef.current&&O(modalContent,portalRef.current)}),null};function initGlobalTooltip$6(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,oe=window.innerWidth,Zt=dt.getBoundingClientRect();let te=Zt.left+Zt.width/2-k/2;te=Math.max(8,Math.min(te,oe-k-8));let ne=Zt.top-pt-8;ne<8&&(ne=Zt.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabButton=()=>{const[$,_]=ut(null),[st,ct]=ut([]),[dt,k]=ut(null),[pt,oe]=ut(null),[Zt,te]=ut(!1),[ne,Yt]=ut(null),[se,ae]=ut(null),[ue,me]=ut(!1),[we,de]=ut("ru"),[ge,fe]=ut(""),_e=at(!1);lt(()=>{initGlobalTooltip$6()},[]);const Se={ru:Et`
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
    `},Te=()=>{safeFetch("/api/button/get","button").then(ee=>{ee&&(k(ee.buttons),de(ee.lang))})};lt(()=>(Te(),registerPoll("buttons","/api/buttons",ee=>{_e.current||ee.buttons&&(k(ee.buttons),de(ee.lang))}),()=>unregisterPoll("buttons")),[]);const Ee=ee=>{const mt=new Map,Xt=dt.find(ce=>ce.id===ee);return Xt&&Xt.pinact&&Object.entries(Xt.pinact).forEach(([ce,$t])=>{mt.set(ce,{pin:ce,relayId:$t})}),st.forEach(ce=>{if(ce.idin===ee){const $t=`${ce.pins}(${ce.idout})`;mt.has($t)||mt.set($t,{pin:ce.pins,relayId:ce.idout})}}),Array.from(mt.values())},Pe=()=>({langbutton:we==="ru"?rulangbutton:enlangbutton}),re=(ee,mt)=>{const Xt=Pe(),ce=Xt[ee]&&Xt[ee][mt]?Xt[ee][mt]:"";return xe(ce)},xe=(ee,mt=100)=>{if(!ee||typeof ee!="string")return"";const Xt=[];let ce="";const $t=ee.split(`
`);return $t.forEach((ie,ye)=>{ie.split(" ").filter(Oe=>Oe.length>0).forEach(Oe=>{const De=ce.length===0?Oe:" "+Oe;ce.length+De.length<=mt?ce+=De:(ce.length>0&&Xt.push(ce),ce=Oe)}),ce.length>0&&(Xt.push(ce),ce=""),ye<$t.length-1&&Xt.push("")}),ce.length>0&&Xt.push(ce),Xt.join(`
`)},Ce=(ee,mt)=>{Yt(ee),ae(mt),te(!0)},he=()=>{te(!1),Yt(null),ae(null)},ve=ee=>{console.log("handleButtonChange:",ee),k(mt=>mt.map(Xt=>Xt.id===ee.id?{...Xt,...ee}:Xt)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ee.id,onoff:ee.onoff})}).then(mt=>mt.json()).then(mt=>{console.log("Response from /api/onoff/set:",mt)}).catch(mt=>{console.error("Error calling /api/onoff/set:",mt)}).finally(()=>{setTimeout(()=>{_e.current=!1},1500)}),he()},ke=ee=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${re("langbutton",ee.tooltipIndex)}
    >
      ${ee.title}
    </th>
  `,le=({d:ee,index:mt})=>(Ee(ee.id),Et`
      <tr class="${mt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${ee.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${ee.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][ee.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${xe(ee.sclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${xe(ee.dclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${xe(ee.lpress)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${ee.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${ee.onoff}
            onChange=${Xt=>ve({...ee,onoff:Xt})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>Ce("edit",ee)}
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
                      <${ke} title="ID" tooltipIndex=${1} />
                      <${ke} title="Pin" tooltipIndex=${2} />
                      <${ke} title="Pullup type" tooltipIndex=${3} />
                      <${ke} title="SINGLE CLICK" tooltipIndex=${4} />
                      <${ke} title="DOUBLE CLICK" tooltipIndex=${5} />
                      <${ke} title="LONG PRESS" tooltipIndex=${6} />
                      <${ke} title="INFO" tooltipIndex=${7} />
                      <${ke} title="On/Off" tooltipIndex=${8} />
                      <${ke} title="Action" tooltipIndex=${9} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${dt.map((ee,mt)=>Et`<${le} d=${ee} index=${mt} key=${ee.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>me(!ue)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${ue?"Hide Help":"Show Help"}
              </button>
            </div>

            ${ue&&Et`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${Se[we]}
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
          hideModal=${he}
          title=${ne==="connection"?"Edit Connection":"Edit Button pin"}
          selectedButton=${se}
          onButtonChange=${ve}
        />
      `}
  `:""};function ModalEncoder({modalType:$,page:_,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedEncoder:k,handleEncoderChange:pt,connectionOptions:oe,SliderComponent:Zt=MyPolzunok}){const[te,ne]=ut((k==null?void 0:k.info)||""),[Yt,se]=ut((k==null?void 0:k.onoff)===1),[ae,ue]=ut({pin:(k==null?void 0:k.encdrbpin)||"",id:(k==null?void 0:k.encoderb)||""}),[me,we]=ut(Object.entries(k.pinact||{})[0]||["",""]),[de,ge]=ut([]),[fe,_e]=ut([]),[Se,Te]=ut([]),Ee=k.pwmmax||100,[Pe,re]=ut(k.dvalue||0),[xe,Ce]=ut(k.ponr||0),[he,ve]=ut(k.pwm||1e7),ke=vt=>Math.round(vt*Ee/100);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(vt=>{if(!vt.ok)throw new Error(`HTTP error! status: ${vt.status}`);return vt.json()}).then(vt=>{if(!vt||!vt.data||!Array.isArray(vt.data)){console.error("Invalid data format:",vt),ge([]),_e([]),Te([]);return}const be=vt.data.filter(Me=>Me.topin===2),pe=vt.data.filter(Me=>Me.topin===9),Ie=vt.data.filter(Me=>Me.topin===5);if(ge(be),_e(pe),Te(Ie),k.encoderb||k.encdrbpin){const Me=pe.find(Le=>String(Le.id)===String(k.encoderb)||Le.pins===k.encdrbpin);ue({pin:Me?Me.pins:"",id:Me?Me.id:""})}}).catch(vt=>{console.error("Error fetching pin config:",vt),ge([]),_e([]),Te([])})},[k]);const le=vt=>{if(vt.preventDefault(),!(vt.target instanceof HTMLFormElement))return;let pe={};if($==="edit")pe={topin:8,id:k.id,pins:k.pins,pwm:parseInt(he),pwmmax:k.pwmmax,dvalue:parseInt(Pe),ponr:parseInt(xe),info:te,onoff:Yt?1:0};else if($==="connection"){const Me=me&&me[0]&&me[1]!==void 0?{[me[0]]:parseInt(me[1])}:{};pe={id:k.id,pins:k.pins,pwm:parseInt(he)},ae&&ae.id!==void 0&&ae.id!==""?(pe.encoderb=parseInt(ae.id),pe.encdrbpin=ae.pin):(pe.encoderb=255,pe.encdrbpin=""),pe.pinact=Me}console.log("Sending JSON to STM32:",JSON.stringify(pe)),fetch("/api/encoder/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(pe)}).then(Ie=>Ie.json()).then(Ie=>{pt({...k,...pe}),st()}).catch(Ie=>console.error("Error saving encoder:",Ie))},ee=vt=>{ne(vt.target.value)},mt=vt=>{se(vt)},Xt=vt=>{const be=fe.find(pe=>pe.pins===vt.target.value);ue({pin:vt.target.value,id:be?be.id:""})},ce=vt=>{if(!vt.target.value)we(["",""]);else{const be=vt.target.value.split("|");we([be[0],be[1]])}},$t=vt=>{re(vt.target.value)},ie=vt=>{Ce(vt.target.value)},ye=vt=>{const be=vt/1e3;return be<=4e4?{cls:"text-green-600",msg:"Optimal range"}:be<=2e5?{cls:"text-yellow-600",msg:"Precision might drop"}:{cls:"text-red-600",msg:"Expert mode: low precision"}},Oe=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick=${vt=>ct&&vt.target===vt.currentTarget&&st()}
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
          <form onsubmit=${le}>
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
                        value=${fe.some(vt=>vt.pins===ae.pin)?ae.pin:""}
                        onchange=${Xt}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select Encoder B</option>
                        ${fe.map(vt=>Et`
                            <option value=${vt.pins}>
                              ${vt.pins} (ID: ${vt.id})
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
                        value=${Se.some(vt=>String(vt.pins)===String(me[0]))?`${me[0]}|${me[1]}`:""}
                        onchange=${ce}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select PWM connection</option>
                        ${Se.map(vt=>{const be=pwmTimerMap[vt.pins]||"Unknown Timer";return Et`
                            <option value=${`${vt.pins}|${vt.id}`}>
                              ${vt.pins} (${be}, ID: ${vt.id})
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
          <form onsubmit=${le}>
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
                        value=${he}
                        oninput=${vt=>ve(vt.target.value)} 
                        class="border rounded p-2 w-full font-mono" 
                        placeholder="50 - 2000000000"
                      />
                      <div class="text-xs ${ye(he).cls}">
                        ${ye(he).msg}
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
                        oninput=${$t}
                        class="border rounded p-2 w-full"
                      />
                      <div class="text-xs text-gray-500">
                        ${Pe}% = ${ke(parseInt(Pe)||0)} / ${Ee} steps
                      </div>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Duty on restore</td>
                    <td class="p-2">
                      <select
                        value=${xe}
                        onchange=${ie}
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
                        value=${te}
                        oninput=${ee}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${Zt}
                        value=${Yt}
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
  `,De=at(null);return lt(()=>{const vt=document.createElement("div");return vt.id="encoder-modal-portal",document.body.appendChild(vt),De.current=vt,()=>{O(null,vt),document.body.removeChild(vt)}},[]),lt(()=>{De.current&&O(Oe,De.current)}),null}function initGlobalTooltip$5(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,oe=window.innerWidth,Zt=dt.getBoundingClientRect();let te=Zt.left+Zt.width/2-k/2;te=Math.max(8,Math.min(te,oe-k-8));let ne=Zt.top-pt-8;ne<8&&(ne=Zt.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const pwmTimerMap={PA0:"TIM2",PA3:"TIM2",PB10:"TIM2",PA6:"TIM3",PB1:"TIM3",PB15:"TIM12",PC6:"TIM8",PC7:"TIM8",PC8:"TIM8",PC9:"TIM8",PD12:"TIM4",PD13:"TIM4",PD14:"TIM4",PD15:"TIM4",PE5:"TIM9",PE6:"TIM9",PE9:"TIM1",PE11:"TIM1",PE13:"TIM1",PE14:"TIM1",PF6:"TIM10",PF7:"TIM11",PF8:"TIM13",PF9:"TIM14"};function TabEncoder({}){{const[$,_]=ut(null),[st,ct]=ut(null),[dt,k]=ut(!1),[pt,oe]=ut(null),[Zt,te]=ut(null),[ne,Yt]=ut(!1),[se,ae]=ut("ru"),[ue,me]=ut([]),we=at(!1);lt(()=>{initGlobalTooltip$5()},[]);const de=()=>Promise.all([fetch("/api/encoder/get").then(mt=>mt.json()),fetch("/api/pintopin/get").then(mt=>mt.json())]).then(([mt,Xt])=>{ae(mt.lang),_(mt.encoders),me(Xt),console.log("Encoder data:",mt.encoders),console.log("Pintopin data:",Xt)}).catch(mt=>{console.error("Error fetching data:",mt)}),ge=()=>{safeFetch("/api/encoder/get","encoder").then(mt=>{mt&&(we.current||(_(mt.encoders),ae(mt.lang)))})},fe=()=>{safeFetch("/api/pintopin/get","pintopin-enc").then(mt=>{mt&&me(mt)})};lt(()=>(ge(),fe(),registerPoll("encoders","/api/encoders",mt=>{we.current||(mt.encoders&&(_(mt.encoders),ae(mt.lang)),mt.pintopin&&me(mt.pintopin))}),()=>unregisterPoll("encoders")),[]);const _e=mt=>{_(Xt=>Xt.map(ce=>ce.id===mt.id?mt:ce)),we.current=!0,fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:mt.id,onoff:mt.onoff})}).then(Xt=>Xt.json()).then(Xt=>{console.log("Response from /api/onoff/set (Encoder):",Xt)}).catch(Xt=>{console.error("Error calling /api/onoff/set (Encoder):",Xt)}).finally(()=>{setTimeout(()=>{we.current=!1},1500)})},Se=mt=>{const Xt=$.find($t=>$t.id===mt),ce=[];return Xt&&Xt.pinact&&Object.entries(Xt.pinact).forEach(([$t,ie])=>{ce.push({pin:$t,idout:ie})}),ce},Te=mt=>{const Xt=mt/1e3;return Xt<=4e4?{cls:"text-green-600",msg:"✓"}:Xt<=2e5?{cls:"text-yellow-600",msg:"~"}:{cls:"text-red-600",msg:"!"}},Ee=mt=>{if(!mt)return"—";const Xt=mt/1e3;return Xt>=1e6?`${(Xt/1e6).toFixed(2)} MHz`:Xt>=1e3?`${(Xt/1e3).toFixed(1)} kHz`:`${Xt} Hz`},Pe=()=>({langbutton:se==="ru"?ruencoder:enencoder}),re=(mt,Xt)=>{const ce=Pe(),$t=ce[mt]&&ce[mt][Xt]?ce[mt][Xt]:"";return xe($t)},xe=(mt,Xt=50)=>{if(!mt||typeof mt!="string")return"";const ce=mt.split(" ");let $t=[],ie="";for(let ye=0;ye<ce.length;ye++)ie.length+ce[ye].length+1<=Xt?ie+=`${ie?" ":""}${ce[ye]}`:(ie&&$t.push(ie.trim()),ie=ce[ye]);return ie&&$t.push(ie.trim()),$t.join(`
`)},Ce=(mt,Xt)=>{console.log("Deleting connection:",mt,Xt);const ce=Xt.split("(")[0].trim();fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:mt,pin:ce})}).then($t=>$t.ok?$t.json():$t.text().then(ie=>{throw new Error(`HTTP error! status: ${$t.status}, message: ${ie}`)})).then($t=>{ct($t),_(ie=>ie.map(ye=>{if(ye.id===mt){const $e={...ye.pinact};return delete $e[ce],{...ye,pinact:$e}}return ye})),me(ie=>ie.filter(ye=>!(ye.idin===mt&&ye.pins===ce)))}).then(()=>{console.log("Connection deleted successfully"),de()}).catch($t=>{console.error("Error deleting connection:",$t)})},he=(mt,Xt)=>{console.log("Opening modal:",mt,Xt),oe(mt),te(Xt),k(!0)},ve=()=>{k(!1),oe(null),te(null)},ke={ru:Et`
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
      `},le=({title:mt,tooltipIndex:Xt})=>Et`
      <th
        class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
        data-tip=${re("langbutton",Xt)}
      >
        ${mt}
      </th>
    `,ee=({d:mt,index:Xt})=>{const ce=Se(mt.id),$t=Te(mt.pwm||0),ie=ce.map(ye=>pwmTimerMap[ye.pin]).filter((ye,$e,Oe)=>ye&&Oe.indexOf(ye)===$e);return Et`
        <tr class="${Xt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
          <td class="px-6 py-2 text-sm text-slate-800 font-medium">${mt.pins}(${mt.id})</td>
          <td class="px-6 py-2 text-sm text-slate-700">
            ${mt.encdrbpin?`${mt.encdrbpin}(${mt.encoderb})`:"Not set"}
          </td>
          <td class="px-6 py-2 text-sm text-slate-700 font-mono">
            ${ce.length>0?ce.map(({pin:ye,idout:$e})=>Et`
                    <span class="mr-2 inline-flex items-center">
                      ${ye}(${$e})
                      <button
                        onClick=${Oe=>{Oe.preventDefault(),Ce(mt.id,`${ye}(${$e})`)}}
                        class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                        title="Remove connection"
                      >
                        [x]
                      </button>
                    </span>
                  `):"Not set"}
          </td>
          <td class="px-6 py-2 text-sm">
            <span class="font-mono text-slate-700">${Ee(mt.pwm)}</span>
            <span class="ml-1 font-bold ${$t.cls}">${$t.msg}</span>
            ${ie.length>0?Et`<span class="ml-2 font-mono text-xs text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200 shadow-sm" title="Hardware Timer">${ie.join(", ")}</span>`:""}
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
              onChange=${ye=>_e({...mt,onoff:ye})}
            />
          </td>
          <td class="px-6 py-2 text-sm whitespace-nowrap">
            <button
              onClick=${()=>he("connection",mt)}
              class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
            >
              Connection
            </button>
            <span class="text-slate-300">|</span>
            <button
              onClick=${()=>he("edit",mt)}
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
                      ${$.map((mt,Xt)=>Et`<${ee} d=${mt} index=${Xt} key=${mt.id} />`)}
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="flex justify-end mt-6">
                <button
                  onclick=${()=>Yt(!ne)}
                  class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
                >
                  ${ne?"Hide Help":"Show Help"}
                </button>
              </div>

              ${ne&&Et`
                  <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                    ${ke[se]}
                  </div>
                `}
            </div>
          </div>
          ${dt&&Et`
              <${ModalEncoder}
                modalType=${pt}
                page="TabEncoder"
                hideModal=${ve}
                title=${pt==="connection"?"Edit Connection":"Edit Encoder"}
                selectedEncoder=${Zt}
                handleEncoderChange=${_e}
              />
            `}
        </div>
      </div>
    `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">Loading...</div>`}}function ModalCron({modalType:$,page:_,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedCron:k,handleCronChange:pt,connectionOptions:oe,modalClass:Zt,SliderComponent:te=MyPolzunok}){const[ne,Yt]=ut((k==null?void 0:k.info)||""),[se,ae]=ut((k==null?void 0:k.onoff)===1),[ue,me]=ut((k==null?void 0:k.activ)||""),[we,de]=ut((k==null?void 0:k.cron)||""),[ge,fe]=ut(k.setrpins||""),_e=he=>{he.preventDefault();const ve=new FormData(he.target),ke=Object.fromEntries(ve);ke.id=k.id,ke.pins=k.pins,$==="edit"?(ke.onoff=se?1:0,ke.info=ne,ke.cron=we,ke.activ=ue):$==="connection"&&(ke.setrpins=ge),console.log("Data being sent to server:"),console.log(ke),console.log("Stringified data:"),console.log(JSON.stringify(ke)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ke)}).then(le=>le.json()).then(le=>{console.log("Success:",le),pt({...k,...ke}),st(),window.location.href="/#/cron"}).catch(le=>{console.error("Error:",le)})};lt(()=>{Yt((k==null?void 0:k.info)||""),fe((k==null?void 0:k.setrpins)||""),ae((k==null?void 0:k.onoff)===1)},[k]);const Se=he=>{de(he.target.value)},Te=he=>{Yt(he.target.value)},Ee=he=>{ae(he)},Pe=he=>{me(he.target.value)},re=()=>{if(_==="TabCron"&&$==="edit")return Et`
          <form onsubmit=${_e}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  ${[{label:"ID",value:k.id},{label:"Cron",value:Et`
                        <input
                          type="text"
                          value=${we}
                          onInput=${Se}
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
                          value=${ne}
                          onInput=${Te}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"On/Off",value:Et`<${te}
                        value=${se}
                        onChange=${Ee}
                      />`}].map((he,ve)=>Et`
                      <tr
                        class="${ve%2===1?"bg-white":"bg-gray-200"}"
                      >
                        <td class="p-2 font-bold">${he.label}</td>
                        <td class="p-2">${he.value}</td>
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
        `},xe=Et`
    <div class=${`modal ${Zt||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${he=>ct&&he.target===he.currentTarget&&st()}
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
            ${re()}
          </div>
        </div>
      </div>
    </div>
  `,Ce=at(null);return lt(()=>{const he=document.createElement("div");return he.id="modal-portal",document.body.appendChild(he),Ce.current=he,()=>{O(null,he),document.body.removeChild(he)}},[]),lt(()=>{Ce.current&&O(xe,Ce.current)}),null}function ModalPwmCron({modalType:$,page:_,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedCron:k,handleCronChange:pt,modalClass:oe,SliderComponent:Zt=MyPolzunok}){let te="",ne="900",Yt="0",se="100";if(k!=null&&k.activ&&k.activ.startsWith("pwm:")){const mt=k.activ.substring(4).split(",");mt.length===4&&(te=mt[0],ne=mt[1],Yt=mt[2],se=mt[3])}const[ae,ue]=ut((k==null?void 0:k.info)||""),[me,we]=ut((k==null?void 0:k.onoff)===1),[de,ge]=ut((k==null?void 0:k.cron)||""),[fe,_e]=ut(te),[Se,Te]=ut(ne),[Ee,Pe]=ut(Yt),[re,xe]=ut(se),[Ce,he]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store"}).then(mt=>mt.json()).then(mt=>{if(mt&&mt.data&&Array.isArray(mt.data)){const Xt=mt.data.filter(ce=>ce.topin===5);he(Xt),!fe&&Xt.length>0&&_e(Xt[0].id.toString())}}).catch(mt=>console.error("Error fetching pin config:",mt))},[]);const ve=mt=>{mt.preventDefault();const Xt=new FormData(mt.target),ce=Object.fromEntries(Xt);ce.id=k.id,ce.pins=k.pins,ce.onoff=me?1:0,ce.info=ae,ce.cron=de,ce.activ=`pwm:${fe},${Se},${Ee},${re}`,fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ce)}).then($t=>$t.json()).then($t=>{pt({...k,...ce}),st(),window.location.href="/#/cron"}).catch($t=>console.error("Error:",$t))},ke=()=>Et`
      <form onsubmit=${ve}>
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
                    onChange=${mt=>_e(mt.target.value)}
                    class="border rounded p-2 w-full"
                    required
                  >
                    ${Ce.map(mt=>Et`<option value=${mt.id}>${mt.pins}</option>`)}
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200">
                <td class="p-2 font-bold">Cron Pattern</td>
                <td class="p-2">
                  <input
                    type="text"
                    value=${de}
                    onInput=${mt=>ge(mt.target.value)}
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
                    onInput=${mt=>Te(mt.target.value)}
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
                    value=${Ee}
                    onInput=${mt=>Pe(mt.target.value)}
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
                    value=${re}
                    onInput=${mt=>xe(mt.target.value)}
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
                    onInput=${mt=>ue(mt.target.value)}
                    class="border rounded p-2 w-full"
                  />
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-2 font-bold">On/Off</td>
                <td class="p-2">
                  <${Zt} value=${me} onChange=${we} />
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
    `,le=Et`
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
            ${ke()}
          </div>
        </div>
      </div>
    </div>
  `,ee=at(null);return lt(()=>{const mt=document.createElement("div");return mt.id="pwm-modal-portal",document.body.appendChild(mt),ee.current=mt,()=>{O(null,mt),document.body.removeChild(mt)}},[]),lt(()=>{ee.current&&O(le,ee.current)}),null}function initGlobalTooltip$4(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,oe=window.innerWidth,Zt=dt.getBoundingClientRect();let te=Zt.left+Zt.width/2-k/2;te=Math.max(8,Math.min(te,oe-k-8));let ne=Zt.top-pt-8;ne<8&&(ne=Zt.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabCron({}){const[$,_]=ut(null),[st,ct]=ut(null);at(null);const[dt,k]=ut(!1),[pt,oe]=ut(null),[Zt,te]=ut(null),[ne,Yt]=ut("ru"),[se,ae]=ut(!1),[ue,me]=ut(1),[we,de]=ut(0),ge=at(!1);lt(()=>{initGlobalTooltip$4()},[]);const fe=()=>fetch("/api/cron/get").then(mt=>mt.json()).then(mt=>{mt&&Array.isArray(mt.timers)?(_(mt.timers),Yt(mt.lang||"ru"),typeof mt.numline=="number"&&(de(mt.numline),me(mt.numline))):(console.error("Unexpected API response structure:",mt),_([]))}).catch(mt=>{console.error("Error fetching cron data:",mt),_([])});lt(()=>(fe(),registerPoll("cron","/api/cron/get",mt=>{ge.current||mt&&Array.isArray(mt.timers)&&(_(mt.timers),Yt(mt.lang||"ru"),typeof mt.numline=="number"&&(de(mt.numline),me(mt.numline)))}),()=>unregisterPoll("cron")),[]);const _e=at(!0);lt(()=>{if(_e.current){_e.current=!1;return}Se(we)},[we]);const Se=mt=>{ge.current=!0,fetch("/api/numline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({numline:mt})}).then(Xt=>Xt.json()).catch(Xt=>console.error("Error sending Crone line to stm32:",Xt)).finally(()=>{setTimeout(()=>{ge.current=!1},1500)})},Te=()=>{if(ue<$.length){const mt=ue+1;me(mt),de(mt)}},Ee=()=>{if(ue>0){const mt=ue-1;me(mt),de(mt)}},Pe={ru:Et`
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
    `};if($===null)return Et`<div>Loading...</div>`;const re=()=>({langtimers:ne==="ru"?rulangtimers:enlangtimers}),xe=(mt,Xt)=>{const ce=re(),ie=(ce[mt]&&ce[mt][Xt]?ce[mt][Xt]:"").split(" "),ye=[];for(let $e=0;$e<ie.length;$e+=15)ye.push(ie.slice($e,$e+15).join(" "));return ye.join("<br>")},Ce=(mt,Xt)=>{oe(mt),te(Xt),k(!0)},he=()=>{k(!1),oe(null),te(null)},ve=mt=>{console.log("handleCronChange:",mt),_($.map(Xt=>Xt.id===mt.id?mt:Xt)),ge.current=!0,fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(mt)}).then(Xt=>Xt.json()).then(Xt=>{console.log("Cron job updated successfully:",Xt)}).catch(Xt=>{console.error("Error updating cron job:",Xt)}).finally(()=>{setTimeout(()=>{ge.current=!1},1500)})},ke=()=>Array.isArray(Zt)?Zt.flatMap(mt=>mt.pinact?Object.keys(mt.pinact).map(Xt=>({value:Xt,label:Xt})):[]):Zt&&Zt.pinact?Object.keys(Zt.pinact).map(mt=>({value:mt,label:mt})):[],le=mt=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${xe("langtimers",mt.tooltipIndex)}
    >
      ${mt.title}
    </th>
  `,ee=({d:mt,index:Xt})=>{const ce=mt.activ&&mt.activ.startsWith("pwm:");let $t=mt.activ;if(ce){const ie=mt.activ.substring(4).split(",");ie.length===4&&($t=`pwmID=${ie[0]} | ${ie[1]}s | ${ie[2]}%→${ie[3]}%`)}return Et`
    <tr class="${Xt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-4 text-sm text-slate-800 font-medium">${mt.id}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider">${mt.cron}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider items-center gap-1 flex justify-start">${$t}</td>
      <td class="px-6 py-4 text-sm text-slate-600">${mt.info}</td>
      <td class="px-6 py-4">
        <${MyPolzunok}
          value=${mt.onoff}
          onChange=${ie=>ve({...mt,onoff:ie})}
        />
      </td>
     <td class="px-6 py-4 text-center">
        ${ce?Et`
          <button
            onclick=${()=>Ce("edit_pwm",mt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-3"
          >
            Edit
          </button>
          <button
            onclick=${()=>Ce("edit_pwm",mt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap ml-1"
          >
            PWM
          </button>
        `:Et`
       <button
            onclick=${()=>Ce("edit",mt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
          >
            Edit
          </button>
          <button
            onclick=${()=>Ce("edit_pwm",mt)}
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
                        ${$.slice(0,ue).map((mt,Xt)=>Et`<${ee} d=${mt} index=${Xt} key=${mt.id} />`)}
                      </tbody>
                    </table>
                  </div>
                </div>
              `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No cron jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>ae(!se)}
          >
            ${se?"Hide Help":"Show Help"}
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
                    onclick=${Ee}
                    title="Remove Cron"
                  >-</button>
                `:null}
          </div>
        </div>
      </div>

      ${se&&Et`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">
          ${Pe[ne]}
        </div>
      `}

      ${dt&&pt==="edit_pwm"?Et`
        <${ModalPwmCron}
          modalType=${pt}
          page="TabCron"
          hideModal=${he}
          title="Edit PWM Timer(s)"
          selectedCron=${Zt}
          handleCronChange=${ve}
          modalClass="mt-24"
        />
      `:dt?Et`
        <${ModalCron}
          modalType=${pt}
          page="TabCron"
          hideModal=${he}
          title=${pt==="edit"?"Edit Timer(s)":"Edit Connection"}
          selectedCron=${Zt}
          handleCronChange=${ve}
          connectionOptions=${ke()}
          modalClass="mt-24"
        />
      `:null}
    </div>
  `}const PRESETS$1={ru:[{value:"1",label:"Паяльная станция T max=125°C, T min=-55°C"},{value:"2",label:"Кулер / вентилятор T max=70°C, T min=-55°C"},{value:"3",label:"3D‑принтер (стол) T max=120°C, T min=0°C"},{value:"4",label:"Форточный нагреватель T max=60°C, T min=-55°C"},{value:"5",label:"Тёплый пол T max=45°C, T min=0°C"},{value:"6",label:"Холодильник T max=100°C, T min=-55°C"},{value:"7",label:"Аквариум / бойлер T max=80°C, T min=0°C"},{value:"8",label:"Инкубатор T max=45°C, T min=0°C"},{value:"9",label:"Теплица / комната T max=50°C, T min=-55°C"}],en:[{value:"1",label:"Soldering station T max=125°C, T min=-55°C"},{value:"2",label:"Cooler / fan T max=70°C, T min=-55°C"},{value:"3",label:"3D printer (table) T max=120°C, T min=0°C"},{value:"4",label:"Vent heater T max=60°C, T min=-55°C"},{value:"5",label:"Warm floor T max=45°C, T min=0°C"},{value:"6",label:"Refrigerator T max=100°C, T min=-55°C"},{value:"7",label:"Aquarium / boiler T max=80°C, T min=0°C"},{value:"8",label:"Incubator T max=45°C, T min=0°C"},{value:"9",label:"Greenhouse / room T max=50°C, T min=-55°C"}]},SENSOR_OPTIONS$1=[{value:"1",label:"DS18B20"},{value:"2",label:"DHT-22"}];function ModalPid({modalType:$,page:_,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedPid:k,handlePidChange:pt,language:oe="en",modalClass:Zt,SliderComponent:te=MyPolzunok}){const[ne,Yt]=ut((k==null?void 0:k.info)||""),[se,ae]=ut((k==null?void 0:k.onoff)===1),[ue,me]=ut((k==null?void 0:k.selsens)||"1"),[we,de]=ut((k==null?void 0:k.sernum)||""),[ge,fe]=ut((k==null?void 0:k.presets)||"1"),[_e,Se]=ut((k==null?void 0:k.tmpset)||""),[Te,Ee]=ut((k==null?void 0:k.tmpcur)||""),[Pe,re]=ut([]),[xe,Ce]=ut(Object.entries((k==null?void 0:k.pinact)||{})[0]||["",""]);lt(()=>{Yt((k==null?void 0:k.info)||""),ae((k==null?void 0:k.onoff)===1),me((k==null?void 0:k.selsens)||"1"),de((k==null?void 0:k.sernum)||""),fe((k==null?void 0:k.presets)||"1"),Se((k==null?void 0:k.tmpset)||""),Ee((k==null?void 0:k.tmpcur)||""),Ce(Object.entries((k==null?void 0:k.pinact)||{})[0]||["",""])},[k]),lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(Xt=>{if(!Xt.ok)throw new Error(`HTTP error! status: ${Xt.status}`);return Xt.json()}).then(Xt=>{if(!Xt||!Xt.data||!Array.isArray(Xt.data)){console.error("Invalid data format:",Xt),re([]);return}const ce=Xt.data.filter($t=>$t.topin===5);re(ce)}).catch(Xt=>{console.error("Error fetching pin config:",Xt),re([])})},[k]);const he=Xt=>{Xt.preventDefault();const ce=xe[0]&&xe[1]!==void 0&&xe[1]!=="",$t={id:k.id,pins:xe[0],pinact:ce?{[xe[0]]:parseInt(xe[1])}:{},selsens:ue,sernum:we,presets:ge,tmpset:_e,tmpcur:Te,info:ne,onoff:se?1:0};console.log("Data being sent to server:",$t),fetch("/api/pid/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify($t)}).then(ie=>ie.json()).then(ie=>{console.log("Success:",ie),pt({...k,...$t}),st(),window.location.href="/#/pid"}).catch(ie=>{console.error("Error:",ie)})},ve=Xt=>{if(!Xt.target.value)Ce(["",""]);else{const ce=Xt.target.value.split("|");Ce([ce[0],ce[1]])}},ke=PRESETS$1[oe]||PRESETS$1.en,le=()=>_==="TabPid"&&$==="edit"?Et`
        <form onsubmit=${he}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                ${[{label:"ID",value:k.id},{label:"PWM Pin",value:Et`
                        <select
                          value=${Pe.some(Xt=>String(Xt.pins)===String(xe[0]))?`${xe[0]}|${xe[1]}`:""}
                          onChange=${ve}
                          class="border rounded p-2 w-full"
                        >
                          <option value="">Select PWM pin</option>
                          ${Pe.map(Xt=>Et`
                              <option value=${`${Xt.pins}|${Xt.id}`}>
                                ${Xt.pins} (ID: ${Xt.id})
                              </option>
                            `)}
                        </select>
                      `},{label:"Selected sensor",value:Et`
                      <select
                        value=${ue}
                        onChange=${Xt=>me(Xt.target.value)}
                        class="border rounded p-2 w-full"
                      >
                        ${SENSOR_OPTIONS$1.map(Xt=>Et`
                            <option
                              value=${Xt.value}
                              selected=${Xt.value===ue}
                            >
                              ${Xt.label}
                            </option>
                          `)}
                      </select>
                    `},{label:"Dev. ser. number",value:ue==="1"?Et`
                          <input
                            type="text"
                            value=${we}
                            onInput=${Xt=>de(Xt.target.value)}
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
                        onChange=${Xt=>fe(Xt.target.value)}
                        class="border rounded p-2 w-full"
                      >
                        ${ke.map(Xt=>Et`
                            <option
                              value=${Xt.value}
                              selected=${Xt.value===ge}
                            >
                              ${Xt.label}
                            </option>
                          `)}
                      </select>
                    `},{label:"t_set",value:Et`
                      <input
                        type="text"
                        value=${_e}
                        onInput=${Xt=>Se(Xt.target.value)}
                        class="border rounded p-2 w-full"
                        placeholder="°C"
                      />
                    `},{label:"t_current",value:Et`
                      <input
                        type="text"
                        value=${Te}
                        readOnly
                        class="border rounded p-2 w-full bg-gray-100 cursor-not-allowed"
                        placeholder="°C"
                      />
                    `},{label:"INFO",value:Et`
                      <input
                        type="text"
                        value=${ne}
                        onInput=${Xt=>Yt(Xt.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    `},{label:"On/Off",value:Et`
                      <${te}
                        value=${se}
                        onChange=${Xt=>ae(Xt)}
                      />
                    `}].map((Xt,ce)=>Et`
                    <tr class="${ce%2===1?"bg-white":"bg-gray-200"}">
                      <td class="p-2 font-bold">${Xt.label}</td>
                      <td class="p-2">${Xt.value}</td>
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
      `:null,ee=Et`
    <div class=${`modal ${Zt||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${Xt=>ct&&Xt.target===Xt.currentTarget&&st()}
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
            ${le()}
          </div>
        </div>
      </div>
    </div>
  `,mt=at(null);return lt(()=>{const Xt=document.createElement("div");return Xt.id="modal-portal",document.body.appendChild(Xt),mt.current=Xt,()=>{O(null,Xt),document.body.removeChild(Xt)}},[]),lt(()=>{mt.current&&O(ee,mt.current)}),null}function initGlobalTooltip$3(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,oe=window.innerWidth,Zt=dt.getBoundingClientRect();let te=Zt.left+Zt.width/2-k/2;te=Math.max(8,Math.min(te,oe-k-8));let ne=Zt.top-pt-8;ne<8&&(ne=Zt.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const PRESETS={ru:[{value:"1",label:"Паяльная станция T max=125°C, T min=-55°C"},{value:"2",label:"Кулер / вентилятор T max=70°C, T min=-55°C"},{value:"3",label:"3D‑принтер (стол) T max=120°C, T min=0°C"},{value:"4",label:"Форточный нагреватель T max=60°C, T min=-55°C"},{value:"5",label:"Тёплый пол T max=45°C, T min=0°C"},{value:"6",label:"Холодильник T max=100°C, T min=-55°C"},{value:"7",label:"Аквариум / бойлер T max=80°C, T min=0°C"},{value:"8",label:"Инкубатор T max=45°C, T min=0°C"},{value:"9",label:"Теплица / комната T max=50°C, T min=-55°C"}],en:[{value:"1",label:"Soldering station T max=125°C, T min=-55°C"},{value:"2",label:"Cooler / fan T max=70°C, T min=-55°C"},{value:"3",label:"3D printer (table) T max=120°C, T min=0°C"},{value:"4",label:"Vent heater T max=60°C, T min=-55°C"},{value:"5",label:"Warm floor T max=45°C, T min=0°C"},{value:"6",label:"Refrigerator T max=100°C, T min=-55°C"},{value:"7",label:"Aquarium / boiler T max=80°C, T min=0°C"},{value:"8",label:"Incubator T max=45°C, T min=0°C"},{value:"9",label:"Greenhouse / room T max=50°C, T min=-55°C"}]},SENSOR_OPTIONS=[{value:"1",label:"DS18B20"},{value:"2",label:"DHT-22"}],HELP_CONTENT$1={ru:Et`
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
  `,document.head.appendChild($)}function TabPid({}){const[$,_]=ut(null),[st,ct]=ut(null);at(null);const[dt,k]=ut(!1),[pt,oe]=ut(null),[Zt,te]=ut(null),[ne,Yt]=ut("ru"),[se,ae]=ut(!1),[ue,me]=ut(0),[we,de]=ut(0),ge=at(!1);lt(()=>{initGlobalTooltip$3(),initTuneStyles()},[]);const fe=()=>{safeFetch("/api/pid/get","pid").then($t=>{$t&&(ge.current||$t&&Array.isArray($t.pid)&&(_($t.pid),Yt($t.lang||"ru"),typeof $t.pidline=="number"&&(de($t.pidline),me($t.pidline))))})};lt(()=>(fe(),registerPoll("pid","/api/pid",$t=>{ge.current||$t&&Array.isArray($t.pid)&&(_($t.pid),Yt($t.lang||"ru"),typeof $t.pidline=="number"&&(de($t.pidline),me($t.pidline)))}),()=>unregisterPoll("pid")),[]);const _e=at(!0);lt(()=>{if(_e.current){_e.current=!1;return}Se(we)},[we]);const Se=$t=>{ge.current=!0,fetch("/api/pidline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pidline:$t})}).then(ie=>ie.json()).catch(ie=>console.error("Error sending PID line to stm32:",ie)).finally(()=>{setTimeout(()=>{ge.current=!1},1500)})},Te=()=>{if(ue<PID_MAX_SLOTS){const $t=ue+1;me($t),de($t)}},Ee=()=>{if(ue>0){const $t=ue-1;me($t),de($t)}};if($===null)return Et`<div>Loading...</div>`;const Pe=()=>({langtimers:ne==="ru"?rulangtimers:enlangtimers,langpid:ne==="ru"?rulangpid:enlangpid}),re=($t,ie)=>{const ye=Pe(),Oe=(ye[$t]&&ye[$t][ie]?ye[$t][ie]:"").split(" "),De=[];for(let vt=0;vt<Oe.length;vt+=15)De.push(Oe.slice(vt,vt+15).join(" "));return De.join("<br>")},xe=($t,ie)=>{oe($t),te(ie),k(!0)},Ce=()=>{k(!1),oe(null),te(null)},he=$t=>{console.log("handlePidChange:",$t),_($.map(ie=>ie.id===$t.id?$t:ie)),ge.current=!0,fetch("/api/pid/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify($t)}).then(ie=>ie.json()).then(ie=>{console.log("PID job updated successfully:",ie)}).catch(ie=>{console.error("Error updating PID job:",ie)}).finally(()=>{setTimeout(()=>{ge.current=!1},1500)})},ve=$t=>{const ie=$t.id,ye=$t.tune_state||0;if(!(ye===TUNE_STEP||ye===TUNE_BIAS)){if(ye===TUNE_ERROR){ke(ie);return}console.log("Run tune for id:",ie),fetch("/api/pid/tune",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ie,action:"start"})}).then($e=>$e.json()).then($e=>{console.log("Tune start response:",$e)}).catch($e=>{console.error("Error starting tune:",$e)})}},ke=$t=>{console.log("Stop tune for id:",$t),fetch("/api/pid/tune",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:$t,action:"stop"})}).then(ie=>ie.json()).then(ie=>{console.log("Tune stop response:",ie)}).catch(ie=>{console.error("Error stopping tune:",ie)})},le=PRESETS[ne]||PRESETS.en,ee=$t=>{const ie=le.find(ye=>ye.value===String($t));return ie?ie.label:$t},mt=$t=>{const ie=SENSOR_OPTIONS.find(ye=>ye.value===String($t));return ie?ie.label:$t},Xt=$t=>Et`
    <th
      class="px-4 py-4 text-base font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${re("langpid",$t.tooltipIndex)}
    >
      ${$t.title}
    </th>
  `,ce=($t,ie)=>{const ye=$t.tune_state||0,$e=$t.tune_progress||0,Oe=ye===TUNE_STEP||ye===TUNE_BIAS,De=ye===TUNE_DONE,vt=ye===TUNE_ERROR,be=De?"background:linear-gradient(to right,#4ade80,#10b981);box-shadow:0 4px 14px rgba(16,185,129,0.4);":vt?"background:linear-gradient(to right,#dc2626,#b91c1c);box-shadow:0 4px 14px rgba(220,38,38,0.5);animation:tuneBlink 1s ease-in-out infinite;":"background:linear-gradient(to right,#ef4444,#e11d48);box-shadow:0 4px 14px rgba(239,68,68,0.4);",pe="px-3 py-1 rounded-full text-sm font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap",Ie=De?"Tuning Done":vt?"⚠ Error!":"Run tune";if(Oe){const Me=$e.toFixed(1),Ne=`Auto Tune (${ye===TUNE_STEP?"Step test":"Bias search"})… ${$e}%`;return Et`
        <tr key=${$t.id} class="${ie%2===1?"bg-white/80":"bg-sky-200/40"}">
          <td colspan="11" class="px-2 py-2">
            <div style="position:relative;width:100%;height:2.5rem;border-radius:0.75rem;overflow:hidden;background:#d1d5db;box-shadow:inset 0 2px 6px rgba(0,0,0,0.12);">
              <div
                style="position:absolute;left:0;top:0;bottom:0;width:${Me}%;background:linear-gradient(90deg,#22c55e 0%,#16a34a 60%,#4ade80 100%);border-radius:inherit;transition:width 0.3s ease;box-shadow:0 0 14px rgba(34,197,94,0.55);"
              ></div>
              <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;user-select:none;">
                <span style="font-size:0.875rem;font-weight:700;color:#111827;white-space:nowrap;">${Ne}</span>
              </div>
            </div>
          </td>
          <td class="px-4 py-2 text-center">
            <button
              onclick=${()=>ke($t.id)}
              class="px-3 py-1 rounded-full text-sm font-bold text-white whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95"
              style="background:linear-gradient(to right,#f97316,#ef4444);box-shadow:0 4px 14px rgba(239,68,68,0.4);"
            >Stop</button>
          </td>
        </tr>
      `}return Et`
      <tr key=${$t.id} class="${ie%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-4 py-3 text-sm text-slate-800 font-medium">${$t.id}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">
          ${(()=>{const Me=Object.entries($t.pinact||{});if(!Me.length)return"—";const[Le,Ne]=Me[0];return`${Le}(${Ne})`})()}
        </td>
        <td class="px-4 py-3 text-sm text-slate-700">${mt($t.selsens)}</td>
        <td class="px-4 py-3 text-sm font-mono ${$t.selsens==="1"?"text-slate-700":"text-slate-400 italic"}">${$t.selsens==="1"?$t.sernum||"—":"N/A"}</td>
        <td class="px-4 py-3 text-sm text-slate-700">${ee($t.presets)}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">${$t.tmpset}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">${$t.tmpcur}</td>
        <td class="px-4 py-3 text-sm text-slate-800 font-mono ${$t.onoff?"":"text-rose-500 font-bold"}">${$t.onoff?$t.duty!==void 0?$t.duty:"—":"OFF"}</td>
        <td class="px-4 py-3 text-sm text-slate-600">${$t.info}</td>
        <td class="px-4 py-3">
          <${MyPolzunok}
            value=${$t.onoff}
            onChange=${Me=>he({...$t,onoff:Me})}
          />
        </td>
        <td class="px-4 py-3 text-center">
          <button
            onclick=${()=>xe("edit",$t)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
          >Edit</button>
        </td>
        <td class="px-4 py-3 text-center">
          <button
            onclick=${()=>ve($t)}
            class="${pe}"
            style="${be}"
          >${Ie}</button>
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
                      ${Array.from({length:ue},($t,ie)=>{const ye=$&&$[ie]?$[ie]:{id:ie+1,pins:"",pinact:{},selsens:"",sernum:"",presets:"",tmpset:"",tmpcur:"",info:"",onoff:0,tune_state:0,tune_progress:0};return ce(ye,ie)})}
                    </tbody>
                  </table>
                </div>
              </div>
            `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No PID jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>ae(!se)}
          >
            ${se?"Hide Help":"Show Help"}
          </button>
          <div class="font-semibold text-slate-600 tracking-wide">
            ${$&&PID_MAX_SLOTS-ue>0?`Still available: ${PID_MAX_SLOTS-ue} PID jobs`:"No available: PID jobs!"}
          </div>
          <div class="flex gap-2">
            ${ue<PID_MAX_SLOTS?Et`
            <button
                class="bg-emerald-500 hover:bg-emerald-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-emerald-500/30"
                onclick=${Te}
                title="Add PID"
            >+</button>
            `:null}
            ${ue>0?Et`
                <button
                  class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                  onclick=${Ee}
                  title="Remove PID"
                >-</button>
              `:null}
          </div>
        </div>
      </div>

      ${se&&Et`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">
          ${HELP_CONTENT$1[ne]||HELP_CONTENT$1.en}
        </div>
      `}

      ${dt?Et`
        <${ModalPid}
          modalType=${pt}
          page="TabPid"
          hideModal=${Ce}
          title="Edit PID"
          selectedPid=${Zt}
          handlePidChange=${he}
          language=${ne}
          modalClass="mt-24"
        />
      `:null}
    </div>
  `}function ModalEditSensor({typsensor:$,oneWireId:_,pins:st,onClose:ct,onUpdate:dt,sensorType:k,sensorData:pt,closeOnOverlayClick:oe=!0}){const[Zt,te]=ut({ut:(pt==null?void 0:pt.ut)||$.ut,lt:(pt==null?void 0:pt.lt)||$.lt,action_ut:(pt==null?void 0:pt.action_ut)||$.action_ut,action_lt:(pt==null?void 0:pt.action_lt)||$.action_lt,upphumid:(pt==null?void 0:pt.upphumid)||$.upphumid||0,humlolim:(pt==null?void 0:pt.humlolim)||$.humlolim||0,actuphum:(pt==null?void 0:pt.actuphum)||$.actuphum||"",actlowhum:(pt==null?void 0:pt.actlowhum)||$.actlowhum||"",info:(pt==null?void 0:pt.info)||$.info,onoff:(pt==null?void 0:pt.onoff)||$.onoff||0,humidity:(pt==null?void 0:pt.humidity)||$.humidity||0}),[ne,Yt]=ut(!1),se=(fe,_e,Se)=>{if(fe===""||fe==="-")return fe;const Te=fe.replace(",",".");if(!/^-?\d*\.?\d*$/.test(Te))return null;const Ee=parseFloat(Te);return isNaN(Ee)||Ee<_e||Ee>Se?null:Te},ae=fe=>{const{name:_e,value:Se}=fe.target;if(["ut","lt"].includes(_e)){const Te=se(Se,-55,125);Te!==null&&te(Ee=>({...Ee,[_e]:Te}))}else if(["upphumid","humlolim"].includes(_e)){const Te=se(Se,0,100);Te!==null&&te(Ee=>({...Ee,[_e]:Te}))}else te(Te=>({...Te,[_e]:Se}))},ue=fe=>{const _e=["ut","lt","upphumid","humlolim"],Se={...fe};return _e.forEach(Te=>{Se[Te]===""||Se[Te]==="-"?Se[Te]=0:Se[Te]=parseFloat(Se[Te].toString().replace(",","."))}),Se},de=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onclick=${fe=>{oe&&fe.target===fe.currentTarget&&ct()}}
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
        <form onsubmit=${async fe=>{fe.preventDefault(),Yt(!0);const _e=ue(Zt);try{if(!(await fetch("/api/sensor/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:_,pins:st,sensorNumber:$.s_number,..._e,s_number:$.s_number,t:$.t})})).ok)throw new Error("Network response was not ok");dt({...$,..._e,oneWireId:_,pins:st,s_number:$.s_number,t:$.t}),ct()}catch(Se){console.error("Error updating Sensor:",Se)}finally{Yt(!1)}}}>
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
  `,ge=at(null);return lt(()=>{const fe=document.createElement("div");return fe.id="modal-portal-sensor",document.body.appendChild(fe),ge.current=fe,()=>{O(null,fe),document.body.removeChild(fe)}},[]),lt(()=>{ge.current&&O(de,ge.current)}),null}function ModalOneWire({oneWire:$,onClose:_,onUpdate:st,refresh:ct,closeOnOverlayClick:dt=!0}){console.log("oneWire object:",$);const[k,pt]=ut({typsensor:$.typsensor,numdevices:$.numdevices}),[oe,Zt]=ut(!1),[te,ne]=ut($.onoff||0),Yt=de=>{dt&&de.target===de.currentTarget&&_()},se=de=>{const{name:ge,value:fe}=de.target;let _e={...k,[ge]:parseInt(fe,10)};ge==="typsensor"&&(fe==="0"?_e.numdevices=0:fe==="2"&&(_e.numdevices=1)),pt(_e)},ae=de=>{ne(de)},me=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onclick=${Yt}
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
            disabled=${oe}
          >
            Close
          </button>
        </div>
        <form onsubmit=${async de=>{de.preventDefault(),Zt(!0);const ge={id:$.id,pin:$.pin,typsensor:k.typsensor,numdevices:k.numdevices,onoff:te};console.log("Sending data:",ge);try{if(!(await fetch("api/onewire/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ge)})).ok)throw new Error("Network response was not ok");const _e={...$,...k,onoff:te};st(_e),_()}catch(fe){console.error("Error updating OneWire:",fe)}finally{Zt(!1)}}}>
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
                      onchange=${se}
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
                      value=${k.numdevices}
                      oninput=${k.typsensor===1?se:void 0}
                      class="border rounded p-2 w-full ${k.typsensor!==1?"bg-gray-100":""}"
                      min="0"
                      max="10"
                      readonly=${k.typsensor!==1}
                      disabled=${oe}
                    />
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="p-2 font-bold">On/Off</td>
                  <td class="p-2">
                    <${MyPolzunok}
                      value=${te}
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
  `,we=at(null);return lt(()=>{const de=document.createElement("div");return de.id="modal-portal-onewire",document.body.appendChild(de),we.current=de,()=>{O(null,de),document.body.removeChild(de)}},[]),lt(()=>{we.current&&O(me,we.current)}),null}function initGlobalTooltip$2(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,oe=window.innerWidth,Zt=dt.getBoundingClientRect();let te=Zt.left+Zt.width/2-k/2;te=Math.max(8,Math.min(te,oe-k-8));let ne=Zt.top-pt-8;ne<8&&(ne=Zt.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const _stateLabel=$=>$==="1"?"ON":$==="0"?"OFF":$==="2"?"TG":$??"?",_stateColor=$=>$==="1"?"#16a34a":$==="0"?"#dc2626":$==="2"?"#d97706":"#64748b",_parseAction=$=>$?$.split(",").map(_=>{const[st,ct]=_.trim().split(":");return{pin:st==null?void 0:st.trim(),state:ct==null?void 0:ct.trim()}}).filter(_=>_.pin!==void 0&&_.pin!==""):[],ActionBadge=({isUpper:$,isHumid:_,value:st,unit:ct,str:dt})=>{const k=_parseAction(dt),pt=(_?"💧 ":"")+($?"↑":"↓");return Et`
    <span style="display:inline-flex;align-items:center;gap:4px;background:${$?"#fff7ed":"#eff6ff"};border:1.5px solid ${$?"#fdba74":"#93c5fd"};border-radius:10px;padding:3px 10px;font-size:12px;font-weight:600;white-space:nowrap;line-height:1.6;">
      <span style="color:${$?"#9a3412":"#1e3a5f"};margin-right:2px;">${pt} ${st??"—"}${ct}:</span>
      ${k.length===0?Et`<span style="color:#94a3b8;">[—]</span>`:Et`
          <span style="color:#475569;">[</span>
          ${k.map(({pin:ne,state:Yt},se)=>Et`
            <span>
              <span style="color:#94a3b8;font-weight:400;">id</span><span style="color:#334155;font-weight:700;">${ne}</span><span style="color:#475569;">:</span><span style="color:${_stateColor(Yt)};font-weight:700;">${_stateLabel(Yt)}</span>${se<k.length-1?Et`<span style="color:#94a3b8;">,${" "}</span>`:""}
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
  `},TabOneWire=()=>{const[$,_]=ut([]),[st,ct]=ut(null),[dt,k]=ut(!1),[pt,oe]=ut(null),[Zt,te]=ut(null),[ne,Yt]=ut("ru"),[se,ae]=ut(!1),[ue,me]=ut({}),we={ru:{colId:"ID",colPin:"Пин",colSensor:"Выбранный сенсор",colCount:"Кол-во сенсоров",colOnOff:"Вкл/Выкл",colActions:"Действия",noSensors:"Нет сенсоров для этого OneWire пина.",noData:"Нет данных сенсора для этого OneWire пина.",noPins:"Нет настроенных OneWire пинов!",errFetch:le=>`Ошибка получения данных: ${le}`,edit:"Ред.",showHelp:"Показать справку",hideHelp:"Скрыть справку",title:"OneWire(s) pin(s)"},en:{colId:"ID",colPin:"Pin",colSensor:"Selected sensor",colCount:"Count of sensors",colOnOff:"On/Off",colActions:"Actions",noSensors:"No connected sensors for this OneWire pin.",noData:"No sensor data available for this OneWire pin.",noPins:"No available pins configured as OneWire!",errFetch:le=>`Error fetching sensor data: ${le}`,edit:"Edit",showHelp:"Show Help",hideHelp:"Hide Help",title:"OneWire(s) pin(s)"}},de=we[ne]||we.en,ge=le=>me(ee=>({...ee,[le]:!ee[le]})),fe=le=>typeof le=="string"?le.replace(/[^\x20-\x7E\u0400-\u04FF]/g,""):le;lt(()=>{initGlobalTooltip$2()},[]);const _e=()=>{fetch("/api/onewire/get").then(le=>le.json()).then(le=>{Yt(le.lang||"ru"),_(le.pins||[]),ct(null)}).catch(le=>{ct(le.message),_([])})},Se=le=>{le&&_(ee=>ee.map(mt=>{const Xt=mt.typsensor||mt.typsensr;if(!mt.sensors||![1,2].includes(Xt))return mt;const ce=mt.sensors.map($t=>{var ie,ye;if(Xt===1){const $e=(ie=le.ds18b20)==null?void 0:ie.find(Oe=>Oe.addr===$t.s_number);return $e?{...$t,t:$e.temp}:$t}else if(Xt===2){const $e=(ye=le.dht22)==null?void 0:ye.find(Oe=>Oe.id===mt.id);return $e?{...$t,t:$e.temp,humidity:$e.humidity}:$t}return $t});return{...mt,sensors:ce}}))};lt(()=>(_e(),safeFetch("/api/temp/get","temp").then(Se),registerPoll("sensors","/api/state/sensors",le=>{le&&Se(le)}),()=>unregisterPoll("sensors")),[]);const Te=()=>{k(!1),oe(null),te(null)},Ee=le=>{_(ee=>ee.map(mt=>{var Xt;return mt.id===le.oneWireId?{...mt,sensors:(Xt=mt.sensors)==null?void 0:Xt.map(ce=>ce.s_number===le.s_number?{...ce,...le}:ce)}:mt})),Te()},Pe=le=>{te(le),k(!0)},re=le=>{const ee=ne==="ru"?rulange1Wire:enlange1Wire,Xt=(ee&&ee[le]?ee[le]:"").split(" "),ce=[];for(let $t=0;$t<Xt.length;$t+=15)ce.push(Xt.slice($t,$t+15).join(" "));return ce.join("<br>")},xe=({title:le,tooltipIndex:ee})=>Et`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help" data-tip=${re(ee)}>
      ${le}
    </th>
  `,Ce=({device:le,index:ee})=>{const mt=!!ue[le.id],Xt=le.typsensor||le.typsensr||0,ce=le.numdevices||le.numsens||0,$t=Xt!==0&&ce>0;return Et`
      <tbody key=${"db-"+le.id}>
        <tr class="${ee%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors ${$t?"cursor-pointer":""}" onclick=${()=>$t&&ge(le.id)}>
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${le.id}</td>
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${le.pins||le.pin}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${["None","DS18B20","DHT22"][Xt]}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${ce}</td>
          <td class="px-6 py-4" onclick=${ie=>ie.stopPropagation()}>
            <${MyPolzunok} value=${le.onoff||0} onChange=${ie=>ke({...le,onoff:ie})} />
          </td>
          <td class="px-6 py-4" onclick=${ie=>ie.stopPropagation()}>
            <button class="text-blue-600 hover:text-blue-800 font-semibold transition-colors" onclick=${()=>Pe(le)}>${de.edit}</button>
            ${$t&&Et`<span class="ml-3 text-slate-400 text-xs">${mt?"▲":"▼"}</span>`}
          </td>
        </tr>
        ${mt&&$t?Et`
          <tr>
            <td colspan="6" class="px-4 py-3 bg-gradient-to-r from-cyan-50/80 via-slate-50/60 to-blue-50/80 border-t">
              <${he} d=${le} />
            </td>
          </tr>
        `:""}
      </tbody>
    `},he=({d:le})=>{const ee=le.typsensor||le.typsensr||0,mt=le.numdevices||le.numsens||0;if(ee===0||mt===0)return Et`<div class="px-4 py-2 text-slate-500 font-medium">${de.noSensors}</div>`;let Xt=le.sensors||[];const ce=["bg-cyan-50/60 border-cyan-200/50","bg-slate-100/70 border-slate-200/50"];return Xt.length>0&&Object.keys(Xt).length>0?Et`<div class="flex flex-col gap-2 w-full">${Xt.map(($t,ie)=>Et`
          <div class="w-full flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 rounded-xl border ${ce[ie%2]} backdrop-blur-sm shadow-sm">
            ${ee===2?Et`<span class="font-mono text-base font-semibold text-teal-700">DHT22</span>`:Et`
              <span class="flex items-center gap-2">
                <span class="font-mono text-base font-semibold text-slate-500">SN</span>
                <span class="font-mono text-base text-slate-700 select-all">${fe($t.s_number)}</span>
                <button class="px-4 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${ye=>{ye.stopPropagation(),navigator.clipboard.writeText(fe($t.s_number)),ye.target.textContent="Copied!",setTimeout(()=>ye.target.textContent="copy SN",1500)}}>copy SN</button>
              </span>
            `}
            <span class="text-slate-300">|</span>
            <span class="font-bold text-cyan-700">${$t.t??"—"}°C 🌡</span>
            ${ee===2&&"humidity"in $t?Et`<span class="font-bold text-teal-600">${$t.humidity}% 💧</span>`:""}
            <span class="text-slate-300">|</span>
            <${ActionBadge} isUpper=${!0} value=${$t.ut} unit="°C" str=${$t.action_ut} />
            <${ActionBadge} isUpper=${!1} value=${$t.lt} unit="°C" str=${$t.action_lt} />
            <a href="#" class="ml-auto text-blue-600 font-semibold text-sm uppercase px-3 py-1 bg-white/70 rounded-lg" onclick=${ye=>{ye.preventDefault(),oe({...$t,oneWireId:le.id,sensorType:ee,pins:le.pins||le.pin}),k(!0)}}>${de.edit}</a>
          </div>
        `)}</div>`:Et`<div class="px-4 py-4 text-slate-500 font-medium bg-white/50 rounded-xl text-center w-full">${de.noData}</div>`},ve=le=>{_(ee=>ee.map(mt=>mt.id===le.id?le:mt)),Te()},ke=le=>{_(ee=>ee.map(mt=>mt.id===le.id?{...mt,onoff:le.onoff}:mt))};return Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col items-center">
      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 uppercase">${de.title}</div>
        <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
          <table class="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr class="bg-teal-600/10 border-b border-teal-600/20">
                <${xe} title=${de.colId} tooltipIndex=${1} />
                <${xe} title=${de.colPin} tooltipIndex=${2} />
                <${xe} title=${de.colSensor} tooltipIndex=${3} />
                <${xe} title=${de.colCount} tooltipIndex=${4} />
                <${xe} title=${de.colOnOff} tooltipIndex=${5} />
                <${xe} title=${de.colActions} tooltipIndex=${6} />
              </tr>
            </thead>
            ${$.length>0?$.map((le,ee)=>Et`<${Ce} device=${le} index=${ee} key=${le.id} />`):Et`<tbody><tr><td colspan="6" class="px-4 py-2">${st?de.errFetch(st):de.noPins}</td></tr></tbody>`}
          </table>
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-2xl">
          <button class="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500" onclick=${()=>ae(!se)}>
            ${se?de.hideHelp:de.showHelp}
          </button>
        </div>
        ${se&&Et`<div class="mt-2 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner w-full">${HELP_CONTENT[ne]||HELP_CONTENT.en}</div>`}
      </div>
    </div>
    ${dt&&(pt?Et`<${ModalEditSensor} typsensor=${pt} oneWireId=${pt.oneWireId} pins=${pt.pins} onClose=${Te} onUpdate=${Ee} sensorType=${pt.sensorType} closeOnOverlayClick=${!0} refresh=${_e} />`:Et`<${ModalOneWire} oneWire=${Zt} onClose=${Te} onUpdate=${ve} closeOnOverlayClick=${!0} refresh=${_e} />`)}
  `};function ModalSIM800L({hideModal:$,title:_,selectedGps:st,onSave:ct}){const[dt,k]=ut((st==null?void 0:st.tel)||""),[pt,oe]=ut((st==null?void 0:st.info)||""),[Zt,te]=ut((st==null?void 0:st.onoff)===1),[ne,Yt]=ut(!0),se=de=>/^\+\d{11,20}$/.test(de),me=Et`
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

          <form onSubmit=${de=>{if(de.preventDefault(),!ne)return;const ge={type:"sim800l",tel:dt,info:pt,onoff:Zt?1:0};console.log("Сохраняемые данные:",ge),fetch("/api/security/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ge)}).then(fe=>fe.json()).then(fe=>{typeof ct=="function"&&ct(ge),$()}).catch(fe=>{console.error("Error:",fe)})}}>
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
                        onInput=${de=>{const ge=de.target.value;k(ge),Yt(se(ge))}}
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
                        onInput=${de=>oe(de.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${MyPolzunok} value=${Zt} onChange=${te} />
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
  `,we=at(null);return lt(()=>{const de=document.createElement("div");return de.id="modal-portal",document.body.appendChild(de),we.current=de,()=>{O(null,de),document.body.removeChild(de)}},[]),lt(()=>{we.current&&O(me,we.current)}),null}const ModalSecurity=({modalType:$,page:_,hideModal:st,title:ct,selectedSecurity:dt,onSecurityChange:k,SliderComponent:pt=MyPolzunok})=>{const[oe,Zt]=ut((dt==null?void 0:dt.info)||""),[te,ne]=ut((dt==null?void 0:dt.onoff)||0),[Yt,se]=ut((dt==null?void 0:dt.ptype)||0),[ae,ue]=ut((dt==null?void 0:dt.send_sms)||""),[me,we]=ut((dt==null?void 0:dt.action)||""),[de,ge]=ut([]),[fe,_e]=ut({send_sms:null,action:null}),[Se,Te]=ut(null),Ee=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,Pe=(ee,mt)=>!mt||mt.trim()===""||mt.toLowerCase()==="none"?null:ee==="action"?Ee.test(mt)?null:'Incorrect format. Use "None" or "pin:value" format.':mt.length>100?"Text should not exceed 100 characters":null,re=(ee,mt)=>{const Xt=Pe(ee,mt);switch(_e(ce=>({...ce,[ee]:Xt})),ee){case"send_sms":ue(mt);break;case"action":we(mt);break}};lt(()=>{fetch("/api/security/get").then(ee=>ee.json()).then(ee=>{const mt=ee.pins||ee;Array.isArray(mt)?ge(mt.filter(Xt=>Xt.topin===2)):ge([])}).catch(ee=>{console.error("Error fetching pin config:",ee),ge([])})},[]);const xe=ee=>{if(ee.preventDefault(),Object.values(fe).some(Xt=>Xt!==null)){Te("Please correct the errors before submitting.");return}const mt={type:"monitoring",...dt,info:oe,send_sms:ae||"NO",action:me||"None",onoff:te,ptype:Yt};fetch("/api/security/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(mt)}).then(Xt=>{if(!Xt.ok)throw new Error("Network response was not ok");return Xt.json()}).then(Xt=>{if(Xt.error)throw new Error(Xt.error);k(mt),st()}).catch(Xt=>{console.error("Error:",Xt),Te("Failed to save changes. Please try again.")})},Ce=()=>{se(0),ue(""),we(""),Zt(""),ne(0),_e({send_sms:null,action:null})},ke=Et`
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
    <form onSubmit=${xe}>
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
                  value=${de.some(ee=>ee.pins===(dt==null?void 0:dt.setrpins))?dt==null?void 0:dt.setrpins:""}
                  onChange=${ee=>k({...dt,setrpins:ee.target.value})}
                  class="border rounded p-2 w-full"
                >
                  <option value="">Select a connection</option>
                  ${de.map(ee=>Et`
                      <option value=${ee.pins}>
                        ${ee.pins} (ID: ${ee.id})
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
    <form onSubmit=${xe}>
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
                  value=${Yt}
                  onChange=${ee=>se(parseInt(ee.target.value))}
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
                  value=${me}
                  onInput=${ee=>re("action",ee.target.value)}
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
                  onchange=${ee=>re("send_sms",ee.target.value)}
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
                  value=${oe}
                  onInput=${ee=>Zt(ee.target.value)}
                  class="border rounded p-2 w-full"
                />
              </td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">On/Off</td>
              <td class="p-2">
                <${pt} value=${te} onChange=${ne} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-between mt-4">
        <button
          type="button"
          onClick=${Ce}
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
  `,le=at(null);return lt(()=>{const ee=document.createElement("div");return ee.id="modal-portal",document.body.appendChild(ee),le.current=ee,()=>{O(null,ee),document.body.removeChild(ee)}},[]),lt(()=>{le.current&&O(ke,le.current)}),null};function initGlobalTooltip$1(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,oe=window.innerWidth,Zt=dt.getBoundingClientRect();let te=Zt.left+Zt.width/2-k/2;te=Math.max(8,Math.min(te,oe-k-8));let ne=Zt.top-pt-8;ne<8&&(ne=Zt.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabSecurity=()=>{const[$,_]=ut({lang:"ru",sim800l:0,onoff:0,tel:"",info:""}),[st,ct]=ut(!1),[dt,k]=ut(!1),[pt,oe]=ut([]),[Zt,te]=ut(!1),[ne,Yt]=ut("ru"),[se,ae]=ut(!1),[ue,me]=ut(""),[we,de]=ut(null),[ge,fe]=ut(!1),[_e,Se]=ut("connected"),[Te,Ee]=ut(0),Pe={ru:{titleSim:"SIM800L Settings",titlePins:"Security Pins",colRx:"RXD Pin",colTx:"TXD Pin",colPhone:"Phone Number",colInfo:"Info",colOnOff:"OnOff",colAction:"Action",colId:"ID",colPin:"Pin",colType:"Type of sensor",colSendSms:"Send SMS",colEditPin:"Edit Pin",notConfigured:"Не настроено",notSet:"Не задан",noInfo:"Нет инфо",noData:"Нет доступных данных мониторинга",edit:"Ред.",showHelp:"Показать справку",hideHelp:"Скрыть справку",connRetry:"Connection problems. Retrying...",connLost:"Connection lost. Check your internet connection."},en:{titleSim:"SIM800L Settings",titlePins:"Security Pins",colRx:"RXD Pin",colTx:"TXD Pin",colPhone:"Phone Number",colInfo:"Info",colOnOff:"OnOff",colAction:"Action",colId:"ID",colPin:"Pin",colType:"Type of sensor",colSendSms:"Send SMS",colEditPin:"Edit Pin",notConfigured:"Not configured",notSet:"Not set",noInfo:"No info",noData:"No monitoring data available",edit:"Edit",showHelp:"Show Help",hideHelp:"Hide Help",connRetry:"Connection problems. Retrying...",connLost:"Connection lost. Check your internet connection."}},re=Pe[ne]||Pe.en,xe={ru:Et`
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
      </div>`},Ce={ru:Et`
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
      </div>`};lt(()=>{initGlobalTooltip$1()},[]);const he=ee=>{if(!(ge||Date.now()-Te<2e3)){if(!ee){Se("error");return}_({lang:ee.lang,sim800l:ee.sim800l,onoff:ee.onoff,tel:ee.tel,info:ee.info}),oe(ee.pins||[]),Se("connected")}};lt(()=>(fetch("/api/security/get").then(ee=>ee.json()).then(ee=>Yt(ee.lang||"ru")),safeFetch("/api/security/get","security").then(he),registerPoll("security","/api/security",ee=>{ee&&he(ee)}),()=>unregisterPoll("security")),[]);const ve=async ee=>{fe(!0);try{await fetch("/api/security/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"sim800l",...ee})}),_(ee),Ee(Date.now())}finally{fe(!1)}},ke=(ee,mt)=>{const Xt=ee&&ee[mt]?ee[mt]:"",ce=[],$t=Xt.split(" ");for(let ie=0;ie<$t.length;ie+=15)ce.push($t.slice(ie,ie+15).join(" "));return ce.join("<br>")},le=({title:ee,langArr:mt,tooltipIndex:Xt})=>Et`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help" data-tip=${ke(mt,Xt)}>${ee}</th>
  `;return Et`
    <div class="flex flex-col items-center w-full p-4">
      ${_e!=="connected"&&Et`
        <div class="w-full p-2 mb-4 text-white text-center rounded-xl shadow-md backdrop-blur-md ${_e==="error"?"bg-yellow-500/80":"bg-red-500/80"}">
          ${_e==="error"?re.connRetry:re.connLost}
        </div>
      `}
      <div class="flex flex-col items-center w-full p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 relative overflow-hidden">
        <div class="w-full mb-10">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">${re.titleSim}</h2>
          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-teal-600/10 border-b border-teal-600/20">
                  <${le} title=${re.colRx} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${1} />
                  <${le} title=${re.colTx} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${2} />
                  <${le} title=${re.colPhone} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${3} />
                  <${le} title=${re.colInfo} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${4} />
                  <${le} title=${re.colOnOff} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${5} />
                  <${le} title=${re.colAction} langArr=${ne==="ru"?ruLangsecurity:enLangsecurity} tooltipIndex=${6} />
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                <tr class="bg-white/80 hover:bg-slate-200/80 transition-colors">
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.sim800l===1?"PA3(1)":re.notConfigured}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.sim800l===1?"PD5(35)":re.notConfigured}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.tel||re.notSet}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.info||re.noInfo}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium"><${MyPolzunok} value=${$.onoff} onChange=${ee=>ve({...$,onoff:ee})} /></td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium"><button onClick=${()=>ct(!0)} class="text-teal-600 hover:text-cyan-600 font-bold transition-colors">${re.edit}</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-end mt-6 w-full"><button onclick=${()=>k(!dt)} class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40">${dt?re.hideHelp:re.showHelp}</button></div>
          ${dt&&Et`<div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">${xe[ne]}</div>`}
        </div>

        <div class="w-full">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">${re.titlePins}</h2>
          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-teal-600/10 border-b border-teal-600/20">
                  <${le} title=${re.colId} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${1} />
                  <${le} title=${re.colPin} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${2} />
                  <${le} title=${re.colType} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${3} />
                  <${le} title=${re.colAction} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${4} />
                  <${le} title=${re.colSendSms} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${5} />
                  <${le} title=${re.colInfo} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${6} />
                  <${le} title=${re.colOnOff} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${7} />
                  <${le} title=${re.colEditPin} langArr=${ne==="ru"?ruLangsecuritypins:enLangsecuritypins} tooltipIndex=${8} />
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                ${pt.length>0?pt.map((ee,mt)=>Et`
                  <tr class="${mt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ee.id}</td><td class="px-6 py-4 text-sm text-slate-800 font-medium">${ee.pins}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${["PIR","Normal open","Normal close"][ee.ptype]}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ee.action}</td><td class="px-6 py-4 text-sm text-slate-800 font-medium">${ee.send_sms}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ee.info}</td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium"><${MyPolzunok} value=${ee.onoff} onChange=${Xt=>{Ee(Date.now()),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ee.id,onoff:Xt})}),oe(ce=>ce.map($t=>$t.id===ee.id?{...$t,onoff:Xt}:$t))}} /></td>
                    <td class="px-6 py-4 text-sm text-slate-800 font-medium"><button onClick=${()=>{de(ee),me("edit"),ae(!0)}} class="text-teal-600 hover:text-cyan-600 font-bold transition-colors">${re.edit}</button></td>
                  </tr>`):Et`<tr><td colspan="8" class="px-6 py-4 text-center text-sm text-slate-600 font-medium">${re.noData}</td></tr>`}
              </tbody>
            </table>
          </div>
          <div class="flex justify-end mt-6 w-full"><button onclick=${()=>te(!Zt)} class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40">${Zt?re.hideHelp:re.showHelp}</button></div>
          ${Zt&&Et`<div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">${Ce[ne]}</div>`}
        </div>
      </div>
      ${st&&Et`<${ModalSIM800L} hideModal=${()=>ct(!1)} title=${re.edit} selectedGps=${$} onSave=${ve} />`}
      ${se&&Et`<${ModalSecurity} modalType=${ue} page="TabSecurity" hideModal=${()=>ae(!1)} title=${re.edit} selectedSecurity=${we} onSecurityChange=${ee=>{oe(mt=>mt.map(Xt=>Xt.id===ee.id?ee:Xt)),ae(!1)}} />`}
    </div>
  `};function initGlobalTooltip(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"320px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,oe=window.innerWidth,Zt=dt.getBoundingClientRect();let te=Zt.left+Zt.width/2-k/2;te=Math.max(8,Math.min(te,oe-k-8));let ne=Zt.top-pt-8;ne<8&&(ne=Zt.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const SETTINGS_TIP_IDX={Login:1,Password:2,"Time zone UTC":3,"IP address":4,"Subnet mask":5,"Default gateway":6,Token:7,Host:8,Port:9,Client:10,User:11,"Password (MQTT)":12,"TX topic":13,"RX topic":14,"HTTPS domain":15,"Private Key":16,"Public Key":17,Longitude:18,Latitude:19,Sunrise:20,Sunset:21,"Day Length":22,"Next full moon":23,Date:24,Time:25},getTip=($,_,st,ct)=>{const dt=_==="ru"?st:ct,k=SETTINGS_TIP_IDX[$];if(!k||!dt||!dt[k])return"";const pt=dt[k].split(" "),oe=[];for(let Zt=0;Zt<pt.length;Zt+=12)oe.push(pt.slice(Zt,Zt+12).join(" "));return oe.join("<br>")},FieldRow=({label:$,tipLabel:_,index:st,tip:ct,children:dt})=>{const k=st%2===0?"bg-white/80":"bg-sky-200/40";return Et`
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
  `},LOG_CATEGORIES=[{id:0,key:"SYSTEM",labelEn:"System",labelRu:"Система"},{id:1,key:"MQTT",labelEn:"MQTT",labelRu:"MQTT"},{id:2,key:"NET",labelEn:"Network",labelRu:"Сеть"},{id:3,key:"GSM",labelEn:"GSM",labelRu:"GSM"},{id:4,key:"SCHEDULER",labelEn:"Scheduler",labelRu:"Планировщик"},{id:5,key:"SENSORS",labelEn:"Sensors",labelRu:"Датчики"},{id:6,key:"PID",labelEn:"PID Controller",labelRu:"ПИД-регулятор"},{id:7,key:"SETTINGS",labelEn:"Settings",labelRu:"Настройки"}];function Settings({}){const[$,_]=ut({}),[st,ct]=ut(null),[dt,k]=ut(null),[pt,oe]=ut({}),Zt=at(null),[te,ne]=ut(null),[Yt,se]=ut(null),[ae,ue]=ut(!1),[me,we]=ut(!1),[de,ge]=ut(!1),[fe,_e]=ut(!1),[Se,Te]=ut(!1),[Ee,Pe]=ut(!0),re=at(0);lt(()=>{if(initGlobalTooltip(),!document.getElementById("__network_toggle_style")){const vt=document.createElement("style");vt.id="__network_toggle_style",vt.textContent=".network-toggle span { display: none !important; }",document.head.appendChild(vt)}},[]);const xe=vt=>getTip(vt,$.lang||"ru",rulangsettings,enlangsettings),Ce=[{value:"en",label:"English"},{value:"ru",label:"Russian"}],he=[[-12,"(GMT -12:00) Eniwetok, Kwajalein"],[-11,"(GMT -11:00) Midway Island, Samoa"],[-10,"(GMT -10:00) Hawaii"],[-9,"(GMT -9:00) Alaska"],[-8,"(GMT -8:00) Pacific Time (US & Canada)"],[-7,"(GMT -7:00) Mountain Time (US & Canada)"],[-6,"(GMT -6:00) Central Time (US & Canada), Mexico City"],[-5,"(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima"],[-4,"(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz"],[-3.3,"(GMT -3:30) Newfoundland"],[-3,"(GMT -3:00) Brazil, Buenos Aires, Georgetown"],[-2,"(GMT -2:00) Mid-Atlantic"],[-1,"(GMT -1:00) Azores, Cape Verde Islands"],[0,"(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca"],[1,"(GMT +1:00) Brussels, Copenhagen, Madrid, Paris"],[2,"(GMT +2:00) Kaliningrad, South Africa"],[3,"(GMT +3:00) Moscow, St. Petersburg, Baghdad, Riyadh"],[3.3,"(GMT +3:30) Tehran"],[4,"(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi"],[4.3,"(GMT +4:30) Kabul"],[5,"(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"],[5.3,"(GMT +5:30) Bombay, Calcutta, Madras, New Delhi"],[5.45,"(GMT +5:45) Kathmandu"],[6,"(GMT +6:00) Almaty, Dhaka, Colombo"],[7,"(GMT +7:00) Bangkok, Hanoi, Jakarta"],[8,"(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"],[9,"(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"],[9.3,"(GMT +9:30) Adelaide, Darwin"],[10,"(GMT +10:00) Eastern Australia, Guam, Vladivostok"],[11,"(GMT +11:00) Magadan, Solomon Islands, New Caledonia"],[12,"(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"]],ve=/^(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)$/,ke=vt=>{if(!vt)return{date:"",time:""};const be=vt.match(/d:(\d{1,2}\.\d{1,2}\.\d{2})/),pe=vt.match(/t:(\d{2}:\d{2}:\d{2})/);return{date:be?be[1]:"",time:pe?pe[1]:""}},le=vt=>{if(!/^\d{1,2}\.\d{1,2}\.\d{2}$/.test(vt))return!1;const[pe,Ie,Me]=vt.split(".").map(Number);if(Ie<1||Ie>12||pe<1||pe>31||Me<0||Me>99)return!1;const Le=new Date().getFullYear()%100;if(Me>Le+5)return!1;const Ne=new Date(2e3+Me,Ie,0).getDate();return!(pe>Ne)},ee=vt=>/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(vt),mt=(vt,be)=>{const pe=Object.values(be).some(Me=>Me!==null),Ie=vt.usehttps?vt.domain&&vt.domain.trim()!=="":!0;return!(pe||!Ie)},Xt=(vt,be)=>{ne({message:vt,type:be}),setTimeout(()=>{ne(null)},3e3)},ce=vt=>{se(vt),setTimeout(()=>{se(null)},3e3)},$t=(vt,be)=>{let pe=null;if(!$.usehttps&&["domain","tls_key","tls_cert","tls_ca","telegram_token"].includes(vt))return null;if(!be&&["ip_addr","gateway","mqtt_hst","sb_mask","offdate","offtime","domain"].includes(vt))return"Поле не может быть пустым";switch(vt){case"ip_addr":case"gateway":case"mqtt_hst":be.length>50&&(pe="Слишком длинное имя хоста");break;case"sb_mask":ve.test(be)||(pe="Неверная маска подсети");break;case"offdate":le(be)||(pe="Неверный формат даты (д.м.гг)");break;case"offtime":ee(be)||(pe="Неверный формат времени (чч:мм:сс)");break;case"domain":be.length>50?pe="Домен не должен превышать 50 символов":be.match(/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/)||(pe="Неверный формат домена");break;case"tls_key":be&&be.trim()!==""&&(be.length>512?pe="Private Key не должен превышать 512 символов":(!be.includes("BEGIN EC PRIVATE KEY")||!be.includes("END EC PRIVATE KEY"))&&(pe="Неверный формат Private Key"));break;case"tls_cert":be&&be.trim()!==""&&(be.length>1024?pe="Public Key не должен превышать 1024 символов":(!be.includes("BEGIN CERTIFICATE")||!be.includes("END CERTIFICATE"))&&(pe="Неверный формат Public Key"));break;case"tls_ca":be&&be.trim()!==""&&(be.length>1024?pe="Secret Key не должен превышать 1024 символов":(!be.includes("BEGIN CERTIFICATE")||!be.includes("END CERTIFICATE"))&&(pe="Неверный формат Secret Key"));break}return pe},ie=vt=>{const be=($.lang||"ru")==="ru";_(pe=>({...pe,log_filter_mask:vt})),fetch("/api/logfilter",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({mask:vt})}).then(pe=>{if(!pe.ok)throw new Error("Network error");return pe.json()}).then(pe=>{pe.status&&Xt(be?"Фильтр логов обновлен в RAM":"Log filter updated in RAM","success")}).catch(pe=>{console.error("Error applying log filter in RAM:",pe),Xt(be?"Ошибка обновления RAM фильтра":"Error updating RAM log filter","error")})},ye=vt=>{vt.preventDefault();const be=new FormData(Zt.current);let pe={...$};for(const[Ie,Me]of be.entries())["lon_de","lat_de","timezone","mqtt_prt"].includes(Ie)?pe[Ie]=Me===""||Me===null?0:Number(Me):pe[Ie]=Me;pe.usehttps||["tls_ca","tls_key","tls_cert","telegram_token","domain"].forEach(Ie=>delete pe[Ie]),pe.offdate&&pe.offtime?pe.offldt=`d:${pe.offdate} t:${pe.offtime}`:delete pe.offldt,["lon_de","lat_de","timezone","mqtt_prt"].forEach(Ie=>{(pe[Ie]===null||pe[Ie]==="")&&(pe[Ie]=0)}),pe.onsunrise=pe.onsunrise?1:0,pe.onsunset=pe.onsunset?1:0,pe.check_ip=pe.check_ip?1:0,pe.check_mqtt=pe.check_mqtt?1:0,pe.usehttps=pe.usehttps?1:0,fetch("/api/mysett/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(pe)}).then(Ie=>{if(!Ie.ok)throw new Error("Ошибка сети");return Ie.json()}).then(Ie=>{k("success"),ct(Ie),Xt("Данные успешно сохранены","success"),ce("Данные успешно сохранены"),re.current=0}).catch(Ie=>{k("error"),ct(Ie),Xt("Ошибка при сохранении данных","error"),ce("Ошибка при сохранении данных")})},$e=(vt,be)=>{let pe=null;vt==="offdate"?pe=le(be)?null:"Неверный формат даты (д.м.гг)":vt==="offtime"?pe=ee(be)?null:"Неверный формат времени (чч:мм:сс)":pe=$t(vt,be),oe(Me=>{const Le={...Me,[vt]:pe},Ne=["tls_key","tls_cert","tls_ca"],Re=Object.keys(Le).filter(Ae=>!Ne.includes(Ae)&&Ae!=="telegram_token").some(Ae=>Le[Ae]!==null);return ue(Re||!$.usehttps&&Ne.some(Ae=>$[Ae])),Le});let Ie=be;["lon_de","lat_de","timezone","mqtt_prt"].includes(vt)?Ie=be===""||be===null?0:Number(be):["onsunrise","onsunset","check_ip","check_mqtt","usehttps"].includes(vt)&&(Ie=be?1:0),_(Me=>({...Me,[vt]:Ie})),re.current=Date.now(),vt==="usehttps"&&(oe({}),ue(!1))},Oe=()=>fetch("/api/mysett/get").then(vt=>vt.json()).then(vt=>{if(vt.offldt){const{date:be,time:pe}=ke(vt.offldt);vt.offdate=be,vt.offtime=pe}return _(vt),vt}).catch(vt=>{console.error("Error fetching settings:",vt),Xt("Ошибка при загрузке настроек","error")});if(lt(()=>(Oe().finally(()=>{Pe(!1)}),registerPoll("settings","/api/mysett/get",vt=>{if(Date.now()-re.current<8e3)return;const be=document.activeElement;if(!(be&&(be.tagName==="INPUT"||be.tagName==="TEXTAREA"||be.tagName==="SELECT"))){if(vt.offldt){const{date:pe,time:Ie}=ke(vt.offldt);vt.offdate=pe,vt.offtime=Ie}_(vt),vt!=null&&vt.tls_key&&we(!0),vt!=null&&vt.tls_cert&&ge(!0),vt!=null&&vt.tls_ca&&_e(!0),vt!=null&&vt.telegram_token&&Te(!0)}}),()=>unregisterPoll("settings")),[]),lt(()=>{ue(!mt($,pt))},[$,pt]),Ee)return Et`<div>Loading...</div>`;if(!$)return"";const De=(vt="")=>Et`
    <button
      type="submit"
      class=${`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 ${ae?"opacity-50 cursor-not-allowed bg-slate-400":"bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500"} ${vt}`}
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
            onChange=${vt=>$e("lang",vt.target.value)}
            style="border: 2px solid #22d3ee; border-radius: 8px; padding: 4px 10px; font-size: 14px; font-weight: 600; background: white; color: #1e293b; cursor: pointer; outline: none;"
          >
            ${Ce.map(vt=>Et`<option value=${vt.value}>${vt.label}</option>`)}
          </select>
        </div>

        ${Yt&&Et`
          <div class="w-full max-w-4xl bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center mb-6 border border-green-400/50 backdrop-blur-md">
            ${Yt}
          </div>
        `}

        <form ref=${Zt} onSubmit=${ye} class="w-full max-w-4xl flex flex-col gap-6 relative">

          <div class="flex justify-end w-full">${De()}</div>

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
              ${[{label:"Login",key:"adm_name",type:"text"},{label:"Password",key:"adm_pswd",type:"password"},{label:"Time zone UTC",key:"timezone",type:"select",options:he}].map((vt,be)=>Et`
                <${FieldRow} label=${vt.label} tip=${xe(vt.tipLabel||vt.label)} index=${be}>
                  <${pageSetting}
                    value=${$[vt.key]}
                    setfn=${pe=>$e(vt.key,pe)}
                    type=${vt.type}
                    options=${vt.options}
                    class=${`w-full px-3 py-2 bg-white/50 border ${pt[vt.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    error=${pt[vt.key]}
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
                            <${MyPolzunok} value=${$.check_ip} onChange=${vt=>$e("check_ip",vt)} />
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
                            <${MyPolzunok} value=${$.check_ip} onChange=${vt=>$e("check_ip",vt)} />
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
                  ${[{label:"IP address",key:"ip_addr",type:"text"},{label:"Subnet mask",key:"sb_mask",type:"text"},{label:"Default gateway",key:"gateway",type:"text"}].map((vt,be)=>Et`
                    <${FieldRow} label=${vt.label} tip=${xe(vt.tipLabel||vt.label)} index=${be}>
                      <${pageSetting}
                        value=${$[vt.key]}
                        setfn=${pe=>$e(vt.key,pe)}
                        type=${vt.type}
                        class=${`w-full px-3 py-2 bg-white/50 border ${pt[vt.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        error=${pt[vt.key]}
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
              <${FieldRow} label="Token" tip=${xe("Token")} index=${0}>
                <${pageSetting}
                  value=${$.token}
                  setfn=${vt=>$e("token",vt)}
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
                          <${MyPolzunok} value=${$.check_mqtt} onChange=${vt=>$e("check_mqtt",vt)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[{label:"Host",key:"mqtt_hst",type:"text",maxlength:50},{label:"Port",key:"mqtt_prt",type:"number"},{label:"Client",key:"mqtt_clt",type:"text",maxlength:32},{label:"User",key:"mqtt_usr",type:"text",maxlength:32},{label:"Password",key:"mqtt_pswd",type:"password",maxlength:32,tipLabel:"Password (MQTT)"},{label:"TX topic",key:"txmqttop",type:"text",maxlength:32},{label:"RX topic",key:"rxmqttop",type:"text",maxlength:32}].map((vt,be)=>Et`
                  <${FieldRow} label=${vt.label} tip=${xe(vt.tipLabel||vt.label)} index=${be}>
                    <${pageSetting}
                      value=${$[vt.key]}
                      setfn=${pe=>$e(vt.key,pe)}
                      type=${vt.type}
                      maxlength=${vt.maxlength}
                      class=${`w-full px-3 py-2 bg-white/50 border ${pt[vt.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      error=${pt[vt.key]}
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
                          <${MyPolzunok} value=${$.check_mqtt} onChange=${vt=>$e("check_mqtt",vt)} />
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
                          <${MyPolzunok} value=${$.usehttps} onChange=${vt=>$e("usehttps",vt)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[{label:"HTTPS domain",key:"domain",type:"text"},{label:"Private Key",key:"tls_key",type:"textarea"},{label:"Public Key",key:"tls_cert",type:"textarea"}].map((vt,be)=>Et`
                  <tr class="transition-colors border-b border-slate-200 ${be%2===0?"bg-sky-200/40":"bg-white/80"} hover:bg-slate-200/80">
                    <td
                      class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help align-top"
                      data-tip=${xe(vt.label)}
                    >
                      ${vt.label}
                    </td>
                    <td class="w-2/3 pl-4 py-4 pr-6 align-top">
                      <div class="relative w-full">
                        ${vt.type==="textarea"?Et`
                            ${vt.key==="tls_key"&&$.tls_key?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены, но информация скрыта!</div>`:vt.key==="tls_cert"&&$.tls_cert?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены успешно!</div>`:Et`<textarea
                                    name=${vt.key}
                                    value=${$[vt.key]||""}
                                    onInput=${pe=>$e(vt.key,pe.target.value)}
                                    class=${`w-full px-3 py-2 bg-white/50 border ${pt[vt.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                                    rows="1"
                                    placeholder="Enter ${vt.label}"
                                  ></textarea>`}
                          `:Et`
                            <input
                              type="text"
                              name=${vt.key}
                              value=${$[vt.key]||""}
                              onInput=${pe=>$e(vt.key,pe.target.value)}
                              class=${`w-full px-3 py-2 bg-white/50 border ${pt[vt.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                              maxlength="30"
                              placeholder="Enter domain (e.g., zagotovka.ddns.net)"
                            />
                          `}
                        ${$[vt.key]&&vt.key==="tls_cert"&&Et`
                          <div class="absolute right-0 top-0 mt-[3px] mr-[3px] flex gap-2">
                            <button type="button"
                              onClick=${()=>{navigator.clipboard.writeText($[vt.key]),ce("Данные скопированы")}}
                              class="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5"
                            >Копировать</button>
                            <button type="button"
                              onClick=${()=>$e(vt.key,"")}
                              class="px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                            >Очистить</button>
                          </div>
                        `}
                        ${$[vt.key]&&vt.key!=="domain"&&vt.key!=="tls_cert"&&Et`
                          <button type="button"
                            onClick=${()=>$e(vt.key,"")}
                            class="absolute right-0 top-0 mt-[3px] mr-[3px] px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                          >Очистить</button>
                        `}
                      </div>
                      ${pt[vt.key]&&Et`<div class="text-red-500 text-sm mt-1 font-semibold w-full text-left">${pt[vt.key]}</div>`}
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
                          <${MyPolzunok} value=${$.usehttps} onChange=${vt=>$e("usehttps",vt)} />
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

              <${FieldRow} label="Longitude" tip=${xe("Longitude")} index=${0}>
                <${pageSetting} value=${$.lon_de} setfn=${vt=>$e("lon_de",vt)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${pt.lon_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${pt.lon_de} />
              <//>

              <${FieldRow} label="Latitude" tip=${xe("Latitude")} index=${1}>
                <${pageSetting} value=${$.lat_de} setfn=${vt=>$e("lat_de",vt)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${pt.lat_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${pt.lat_de} />
              <//>

              <!-- Sunrise — нестандартная строка, data-tip вручную -->
              <tr class="transition-colors border-b border-slate-200 bg-white/80 hover:bg-slate-200/80">
                <td
                  class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
                  data-tip=${xe("Sunrise")}
                >
                  Sunrise: <span class="text-teal-600 drop-shadow-sm">${$.sunrise}</span>
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <div class="flex items-center gap-4">
                    <${MyPolzunok} value=${$.onsunrise} onChange=${vt=>$e("onsunrise",vt)} />
                    <input type="text" value=${$.sunrise_pins||""} onInput=${vt=>$e("sunrise_pins",vt.target.value)}
                      maxlength="20" placeholder="Action for sunrise"
                      class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  </div>
                </td>
              </tr>

              <!-- Sunset -->
              <tr class="transition-colors border-b border-slate-200 bg-sky-200/40 hover:bg-slate-200/80">
                <td
                  class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
                  data-tip=${xe("Sunset")}
                >
                  Sunset: <span class="text-teal-600 drop-shadow-sm">${$.sunset}</span>
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <div class="flex items-center gap-4">
                    <${MyPolzunok} value=${$.onsunset} onChange=${vt=>$e("onsunset",vt)} />
                    <input type="text" value=${$.sunset_pins||""} onInput=${vt=>$e("sunset_pins",vt.target.value)}
                      maxlength="20" placeholder="Action for sunset"
                      class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  </div>
                </td>
              </tr>

              <${FieldRow} label="Day Length" tip=${xe("Day Length")} index=${4}>
                <span class="text-xl font-medium text-slate-800">${$.dlength}</span>
              <//>

              <${FieldRow} label="Next full moon" tip=${xe("Next full moon")} index=${5}>
                <span class="text-xl font-medium text-slate-800">
                  ${typeof $.fullmoon=="string"&&$.fullmoon?`${$.fullmoon.split(" ")[0]} at ${$.fullmoon.split(" ")[1]}`:"N/A"}
                </span>
              <//>
              </tbody>
            </table>
            </div>
          </div>

          <!-- ============================================================
               Log Filter / Фильтр логов
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-1/3">
                      ${($.lang||"ru")==="ru"?"Фильтр логов":"Log Filter"}
                    </th>
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">
                      <div class="flex items-center gap-3">
                        <span class="text-slate-600 font-medium tracking-wide text-lg">
                          ${($.lang||"ru")==="ru"?"Маска логов в RAM:":"RAM Log Mask:"}
                        </span>
                        <span class="px-2 py-0.5 bg-cyan-600/10 text-cyan-700 rounded-md font-mono font-bold text-lg">
                          ${$.log_filter_mask!==void 0?$.log_filter_mask:255} (0x${($.log_filter_mask!==void 0?$.log_filter_mask:255).toString(16).toUpperCase()})
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="transition-colors border-b border-slate-200 bg-white/80 hover:bg-slate-200/80">
                    <td class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help align-top"
                        data-tip=${($.lang||"ru")==="ru"?"Выберите категории логов, которые выводятся в UART и отсылаются. Изменения применяются немедленно в RAM!":"Select which log categories are enabled. Changes apply immediately in RAM!"}>
                      ${($.lang||"ru")==="ru"?"Активные категории":"Active Categories"}
                      <div class="mt-4 flex flex-col gap-2">
                        <button type="button" onClick=${()=>ie(255)}
                          class="w-full py-1 text-xs font-bold text-teal-600 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 hover:text-teal-700 transition-all text-center">
                          ${($.lang||"ru")==="ru"?"Включить все":"Enable All"}
                        </button>
                        <button type="button" onClick=${()=>ie(0)}
                          class="w-full py-1 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 hover:text-rose-700 transition-all text-center">
                          ${($.lang||"ru")==="ru"?"Выключить все":"Disable All"}
                        </button>
                      </div>
                    </td>
                    <td class="w-2/3 pl-4 py-4 pr-6 align-top">
                      <div class="grid grid-cols-2 gap-4">
                        ${LOG_CATEGORIES.map(vt=>{const be=$.log_filter_mask!==void 0?$.log_filter_mask:255,pe=(be&1<<vt.id)!==0;return Et`
                            <label class=${`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all duration-300 ${pe?"bg-cyan-50/70 border-cyan-300 shadow-[0_2px_10px_rgba(34,211,238,0.15)] scale-[1.02]":"bg-slate-50/40 border-slate-200 hover:bg-slate-100/50"}`}>
                              <input
                                type="checkbox"
                                checked=${pe}
                                onChange=${Ie=>{const Me=Ie.target.checked?be|1<<vt.id:be&~(1<<vt.id);ie(Me)}}
                                class="w-5 h-5 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500 focus:ring-2"
                              />
                              <div class="flex flex-col">
                                <span class="font-bold text-slate-800 text-base leading-tight">${vt.key}</span>
                                <span class="text-xs text-slate-500 font-medium">${($.lang||"ru")==="ru"?vt.labelRu:vt.labelEn}</span>
                              </div>
                            </label>
                          `})}
                      </div>
                    </td>
                  </tr>
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
                  data-tip=${xe("Date")}
                >
                  Date
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <input type="text" name="offdate" value=${$.offdate||""} onInput=${vt=>$e("offdate",vt.target.value)}
                    placeholder="dd.mm.yy"
                    class=${`w-full px-3 py-2 bg-white/50 border ${pt.offdate?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${pt.offdate&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${pt.offdate}</div>`}
                </td>
              </tr>

              <!-- Time -->
              <tr class="transition-colors border-b border-slate-200 bg-sky-200/40 hover:bg-slate-200/80">
                <td
                  class="w-1/3 font-bold text-slate-700 text-lg border-r border-slate-500 py-4 px-6 cursor-help"
                  data-tip=${xe("Time")}
                >
                  Time
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <input type="text" name="offtime" value=${$.offtime||""} onInput=${vt=>$e("offtime",vt.target.value)}
                    placeholder="hh:mm:ss"
                    class=${`w-full px-3 py-2 bg-white/50 border ${pt.offtime?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${pt.offtime&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${pt.offtime}</div>`}
                </td>
              </tr>
              </tbody>
            </table>
            </div>
          </div>

          ${Yt&&Et`
            <div class="w-full bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center border border-green-400/50 backdrop-blur-md">
              ${Yt}
            </div>
          `}

          <div class="flex justify-end w-full mb-4">${De()}</div>

        </form>
      </div>
    </div>
    ${te&&Et`<${Toast} message=${te.message} type=${te.type} />`}
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
  </svg>`;function Header({logout:$,user:_,setShowSidebar:st,showSidebar:ct}){const[dt,k]=ut(new Date),pt=ht(StateContext),oe=Yt=>new Date(Yt.year+1900,Yt.mon,Yt.mday,Yt.hour,Yt.min,Yt.sec);lt(()=>{const Yt=setInterval(()=>k(new Date),1e3);return()=>clearInterval(Yt)},[]);const Zt=pt&&pt.time&&pt.time.status?oe(pt.time.time):null,te=Yt=>Yt.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric"}),ne=Yt=>Yt.toLocaleTimeString("ru-RU");return Et`
    <div
      class="bg-white/40 backdrop-blur-md border-b border-white/40 shadow-sm sticky top-0 z-[48] w-full py-2 ${ct?"pl-72":""} transition-all duration-300 transform"
    >
      <div class="px-4 w-full py-0 my-0 flex items-center justify-between">
        <button
          type="button"
          onclick=${()=>st(Yt=>!Yt)}
          class="text-slate-500 hover:text-teal-500 transition-colors"
        >
          <${Icons.bars3} class="h-6" />
        </button>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600">
            Дата: ${te(dt)}<span style="margin-left: 8px;"></span
            >Время: ${ne(dt)}
          </span>
        </div>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600"
            >STM32 дата:
            ${Zt?te(Zt):" 00.00.0000"}<span
              style="margin-left: 8px;"
            ></span
            >Время: ${Zt?ne(Zt):"00:00"}
          </span>
        </div>
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <span class="text-sm text-slate-400">logged in as: ${_}</span>
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
  <//>`}function Chart({data:$}){const _=$.length,st=20,ct=15,dt=100,k=5,pt=10,oe=25,Zt=se=>(dt-pt)/k*(se+1),te=se=>(dt-pt)*se/100,ne=se=>dt-pt-te(se),Yt=(se,ae,ue)=>Array.from({length:ae},(me,we)=>we*1+se);return Et` <div
    class="my-4 divide-y divide-gray-200 overflow-auto rounded bg-white"
  >
    <div class="font-light uppercase flex items-center text-gray-600 px-4 py-2">
      Temperature, last 24h
    <//>
    <div class="relative">
      <svg class="bg-yellow-x50 w-full p-4" viewBox="0 0 ${_*st+ct} ${dt}">
        ${Yt(0,k).map(se=>Et`
            <line
              x1="0"
              y1=${Zt(se)}
              x2=${ct+_*st}
              y2=${Zt(se)}
              stroke-width="0.3"
              class="stroke-slate-300"
              stroke-dasharray="1,1"
            />
            <text x="0" y=${Zt(se)-2} class="text-[6px] fill-slate-400"
              >${oe-oe/k*(se+1)}<//
            >
          `)}
        ${Yt(0,_).map(se=>Et`
            <rect
              x=${ct+se*st}
              y=${ne($[se]*100/oe)}
              width="12"
              height=${te($[se]*100/oe)}
              rx="2"
              class="fill-cyan-500"
            />
            <text x=${ct+se*st} y="100" class="text-[6px] fill-slate-400"
              >${se*2}:00<//
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
  `}function FirmwareUpdate({}){const[$,_]=ut([{},{}]),[st,ct]=ut(null),dt=()=>fetch("api/firmware/status").then(se=>se.json()).then(se=>_(se));lt(dt,[]),lt(()=>{if(st){const se=setTimeout(()=>{ct(null)},3e3);return()=>clearTimeout(se)}},[st]);const k=se=>fetch("api/firmware/commit").then(ae=>ae.json()).then(dt),pt=se=>fetch("api/reboot",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reboot:1})}).then(ae=>ae.json()).then(ae=>new Promise(ue=>setTimeout(()=>{dt(),ue()},5e3))),oe=se=>fetch("api/firmware/rollback").then(pt),Zt=se=>fetch("api/device/eraselast").then(dt),te=function(se){if(!se){ct({type:"yellow",message:"Error: No file selected."});return}const ae=se.name.split(".").pop().toLowerCase();if(ae!=="bin"&&ae!=="hex"){ct({type:"red",message:"Error: Only .bin and .hex files are allowed!"});return}const ue=new FormData;ue.append("file",se),fetch("api/firmware/upload",{method:"POST",body:ue}).then(me=>{if(!me.ok)throw new Error(`HTTP error! status: ${me.status}`);return me.json()}).then(()=>{ct({type:"green",message:"Firmware uploaded successfully!"}),dt()}).catch(me=>{ct({type:"yellow",message:`Error: Upload failed. ${me.message}`})})},ne=({type:se,message:ae})=>Et`
      <div
        class=${`fixed top-0 left-0 right-0 z-50 border-b-4 p-4 ${se==="red"?"bg-red-100 border-red-500 text-red-700":se==="yellow"?"bg-yellow-100 border-yellow-500 text-yellow-700":"bg-green-100 border-green-500 text-green-700"}`}
        role="alert"
      >
        <p class="font-bold text-center">${ae}</p>
      </div>
    `,Yt=({title:se,onupload:ae})=>Et`
      <label
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        ${se}
        <input
          type="file"
          class="hidden"
          accept=".bin,.hex"
          onChange=${me=>{const we=me.target.files[0];we&&ae(we)}}
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
          <${Yt}
            title="Upload new firmware (.bin or .hex)"
            onupload=${te}
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
  `}const pageSetting=({value:$,setfn:_,type:st,options:ct,error:dt,...k})=>{let pt;const oe=`w-full px-3 py-2 border rounded-md ${dt?"border-red-500":"border-gray-300"}`;switch(st){case"text":case"password":case"number":pt=Et`
        <input
          type=${st}
          value=${$}
          onInput=${Zt=>_(Zt.target.value)}
          class=${oe}
          ...${k}
        />
      `;break;case"select":pt=Et`
        <select
          value=${$}
          onChange=${Zt=>_(Zt.target.value)}
          class=${oe}
          ...${k}
        >
          ${ct.map(([Zt,te])=>Et` <option value=${Zt}>${te}</option> `)}
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
  `}const App=function({}){const[$,_]=ut(!0),[st,ct]=ut("/"),[dt,k]=ut(""),[pt,oe]=ut(!0),[Zt,te]=ut(null),ne=()=>fetch("api/logout").then(se=>k("")),Yt=se=>se.ok?se.json().then(ae=>k(ae.user)).finally(ae=>_(!1)):_(!1)&&k(null);return lt(()=>fetch("api/login").then(Yt),[]),window.pollIntervalMs=window.pollIntervalMs||2e3,lt(()=>{const se=()=>{window.pollIntervalMs=document.hidden?3e4:2e3};return document.addEventListener("visibilitychange",se),()=>document.removeEventListener("visibilitychange",se)},[]),lt(()=>{if(dt)return registerPoll("common","/api/state/common",se=>{se&&te(se)}),()=>unregisterPoll("common")},[dt]),$?"":dt?Et`<${StateContext.Provider} value=${Zt}>
   <div class="min-h-screen bg-slate-100" id="mains">
    <${Sidebar} url=${st} show=${pt} />
    <${Header}
      logout=${ne}
      user=${dt}
      showSidebar=${pt}
      setShowSidebar=${oe}
    />
    <div
      class="${pt&&"pl-72"} transition-all duration-300 transform"
    >
      <${Qt}
        onChange=${se=>ct(se.url)}
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
      loginFn=${Yt}
      logoIcon=${Logo}
      title="Device Dashboard Login"
      tipText="To login, use: admin/admin, user1/user1, user2/user2"
    />`};window.onload=()=>O(y(App),document.body);
