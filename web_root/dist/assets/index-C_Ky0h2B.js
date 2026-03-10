(function(){const _=document.createElement("link").relList;if(_&&_.supports&&_.supports("modulepreload"))return;for(const dt of document.querySelectorAll('link[rel="modulepreload"]'))ct(dt);new MutationObserver(dt=>{for(const k of dt)if(k.type==="childList")for(const pt of k.addedNodes)pt.tagName==="LINK"&&pt.rel==="modulepreload"&&ct(pt)}).observe(document,{childList:!0,subtree:!0});function st(dt){const k={};return dt.integrity&&(k.integrity=dt.integrity),dt.referrerPolicy&&(k.referrerPolicy=dt.referrerPolicy),dt.crossOrigin==="use-credentials"?k.credentials="include":dt.crossOrigin==="anonymous"?k.credentials="omit":k.credentials="same-origin",k}function ct(dt){if(dt.ep)return;dt.ep=!0;const k=st(dt);fetch(dt.href,k)}})();var t,n,e,r,o,u,i,l,c,a,s,f={},p=[],h=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,d=Array.isArray;function v($,_){for(var st in _)$[st]=_[st];return $}function m($){var _=$.parentNode;_&&_.removeChild($)}function y($,_,st){var ct,dt,k,pt={};for(k in _)k=="key"?ct=_[k]:k=="ref"?dt=_[k]:pt[k]=_[k];if(arguments.length>2&&(pt.children=arguments.length>3?t.call(arguments,2):st),typeof $=="function"&&$.defaultProps!=null)for(k in $.defaultProps)pt[k]===void 0&&(pt[k]=$.defaultProps[k]);return g($,pt,ct,dt,null)}function g($,_,st,ct,dt){var k={type:$,props:_,key:st,ref:ct,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:dt??++e,__i:-1,__u:0};return dt==null&&n.vnode!=null&&n.vnode(k),k}function b($){return $.children}function C($,_){this.props=$,this.context=_}function x($,_){if(_==null)return $.__?x($.__,$.__i+1):null;for(var st;_<$.__k.length;_++)if((st=$.__k[_])!=null&&st.__e!=null)return st.__e;return typeof $.type=="function"?x($):null}function w($){var _,st;if(($=$.__)!=null&&$.__c!=null){for($.__e=$.__c.base=null,_=0;_<$.__k.length;_++)if((st=$.__k[_])!=null&&st.__e!=null){$.__e=$.__c.base=st.__e;break}return w($)}}function P($){(!$.__d&&($.__d=!0)&&r.push($)&&!U.__r++||o!==n.debounceRendering)&&((o=n.debounceRendering)||u)(U)}function U(){var $,_,st,ct,dt,k,pt,Yt;for(r.sort(i);$=r.shift();)$.__d&&(_=r.length,ct=void 0,k=(dt=(st=$).__v).__e,pt=[],Yt=[],st.__P&&((ct=v({},dt)).__v=dt.__v+1,n.vnode&&n.vnode(ct),M(st.__P,ct,dt,st.__n,st.__P.namespaceURI,32&dt.__u?[k]:null,pt,k??x(dt),!!(32&dt.__u),Yt),ct.__v=dt.__v,ct.__.__k[ct.__i]=ct,L(pt,ct,Yt),ct.__e!=k&&w(ct)),r.length>_&&r.sort(i));U.__r=0}function H($,_,st,ct,dt,k,pt,Yt,ht,Xt,Zt){var mt,te,oe,me,we,ye=ct&&ct.__k||p,ue=_.length;for(st.__d=ht,E(st,_,ye),ht=st.__d,mt=0;mt<ue;mt++)(oe=st.__k[mt])!=null&&typeof oe!="boolean"&&typeof oe!="function"&&(te=oe.__i===-1?f:ye[oe.__i]||f,oe.__i=mt,M($,oe,te,dt,k,pt,Yt,ht,Xt,Zt),me=oe.__e,oe.ref&&te.ref!=oe.ref&&(te.ref&&F(te.ref,null,oe),Zt.push(oe.ref,oe.__c||me,oe)),we==null&&me!=null&&(we=me),65536&oe.__u||te.__k===oe.__k?(ht&&!ht.isConnected&&(ht=x(te)),ht=S(oe,ht,$)):typeof oe.type=="function"&&oe.__d!==void 0?ht=oe.__d:me&&(ht=me.nextSibling),oe.__d=void 0,oe.__u&=-196609);st.__d=ht,st.__e=we}function E($,_,st){var ct,dt,k,pt,Yt,ht=_.length,Xt=st.length,Zt=Xt,mt=0;for($.__k=[],ct=0;ct<ht;ct++)pt=ct+mt,(dt=$.__k[ct]=(dt=_[ct])==null||typeof dt=="boolean"||typeof dt=="function"?null:typeof dt=="string"||typeof dt=="number"||typeof dt=="bigint"||dt.constructor==String?g(null,dt,null,null,null):d(dt)?g(b,{children:dt},null,null,null):dt.constructor===void 0&&dt.__b>0?g(dt.type,dt.props,dt.key,dt.ref?dt.ref:null,dt.__v):dt)!=null?(dt.__=$,dt.__b=$.__b+1,Yt=D(dt,st,pt,Zt),dt.__i=Yt,k=null,Yt!==-1&&(Zt--,(k=st[Yt])&&(k.__u|=131072)),k==null||k.__v===null?(Yt==-1&&mt--,typeof dt.type!="function"&&(dt.__u|=65536)):Yt!==pt&&(Yt===pt+1?mt++:Yt>pt?Zt>ht-pt?mt+=Yt-pt:mt--:Yt<pt?Yt==pt-1&&(mt=Yt-pt):mt=0,Yt!==ct+mt&&(dt.__u|=65536))):(k=st[pt])&&k.key==null&&k.__e&&(131072&k.__u)==0&&(k.__e==$.__d&&($.__d=x(k)),I(k,k,!1),st[pt]=null,Zt--);if(Zt)for(ct=0;ct<Xt;ct++)(k=st[ct])!=null&&(131072&k.__u)==0&&(k.__e==$.__d&&($.__d=x(k)),I(k,k))}function S($,_,st){var ct,dt;if(typeof $.type=="function"){for(ct=$.__k,dt=0;ct&&dt<ct.length;dt++)ct[dt]&&(ct[dt].__=$,_=S(ct[dt],_,st));return _}$.__e!=_&&(st.insertBefore($.__e,_||null),_=$.__e);do _=_&&_.nextSibling;while(_!=null&&_.nodeType===8);return _}function A($,_){return _=_||[],$==null||typeof $=="boolean"||(d($)?$.some((function(st){A(st,_)})):_.push($)),_}function D($,_,st,ct){var dt=$.key,k=$.type,pt=st-1,Yt=st+1,ht=_[st];if(ht===null||ht&&dt==ht.key&&k===ht.type&&(131072&ht.__u)==0)return st;if(ct>(ht!=null&&(131072&ht.__u)==0?1:0))for(;pt>=0||Yt<_.length;){if(pt>=0){if((ht=_[pt])&&(131072&ht.__u)==0&&dt==ht.key&&k===ht.type)return pt;pt--}if(Yt<_.length){if((ht=_[Yt])&&(131072&ht.__u)==0&&dt==ht.key&&k===ht.type)return Yt;Yt++}}return-1}function N($,_,st){_[0]==="-"?$.setProperty(_,st??""):$[_]=st==null?"":typeof st!="number"||h.test(_)?st:st+"px"}function R($,_,st,ct,dt){var k;t:if(_==="style")if(typeof st=="string")$.style.cssText=st;else{if(typeof ct=="string"&&($.style.cssText=ct=""),ct)for(_ in ct)st&&_ in st||N($.style,_,"");if(st)for(_ in st)ct&&st[_]===ct[_]||N($.style,_,st[_])}else if(_[0]==="o"&&_[1]==="n")k=_!==(_=_.replace(/(PointerCapture)$|Capture$/i,"$1")),_=_.toLowerCase()in $||_==="onFocusOut"||_==="onFocusIn"?_.toLowerCase().slice(2):_.slice(2),$.l||($.l={}),$.l[_+k]=st,st?ct?st.u=ct.u:(st.u=l,$.addEventListener(_,k?a:c,k)):$.removeEventListener(_,k?a:c,k);else{if(dt=="http://www.w3.org/2000/svg")_=_.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(_!="width"&&_!="height"&&_!="href"&&_!="list"&&_!="form"&&_!="tabIndex"&&_!="download"&&_!="rowSpan"&&_!="colSpan"&&_!="role"&&_ in $)try{$[_]=st??"";break t}catch{}typeof st=="function"||(st==null||st===!1&&_[4]!=="-"?$.removeAttribute(_):$.setAttribute(_,st))}}function T($){return function(_){if(this.l){var st=this.l[_.type+$];if(_.t==null)_.t=l++;else if(_.t<st.u)return;return st(n.event?n.event(_):_)}}}function M($,_,st,ct,dt,k,pt,Yt,ht,Xt){var Zt,mt,te,oe,me,we,ye,ue,xe,be,ke,Se,_e,Ce,de,$e=_.type;if(_.constructor!==void 0)return null;128&st.__u&&(ht=!!(32&st.__u),k=[Yt=_.__e=st.__e]),(Zt=n.__b)&&Zt(_);t:if(typeof $e=="function")try{if(ue=_.props,xe=(Zt=$e.contextType)&&ct[Zt.__c],be=Zt?xe?xe.props.value:Zt.__:ct,st.__c?ye=(mt=_.__c=st.__c).__=mt.__E:("prototype"in $e&&$e.prototype.render?_.__c=mt=new $e(ue,be):(_.__c=mt=new C(ue,be),mt.constructor=$e,mt.render=V),xe&&xe.sub(mt),mt.props=ue,mt.state||(mt.state={}),mt.context=be,mt.__n=ct,te=mt.__d=!0,mt.__h=[],mt._sb=[]),mt.__s==null&&(mt.__s=mt.state),$e.getDerivedStateFromProps!=null&&(mt.__s==mt.state&&(mt.__s=v({},mt.__s)),v(mt.__s,$e.getDerivedStateFromProps(ue,mt.__s))),oe=mt.props,me=mt.state,mt.__v=_,te)$e.getDerivedStateFromProps==null&&mt.componentWillMount!=null&&mt.componentWillMount(),mt.componentDidMount!=null&&mt.__h.push(mt.componentDidMount);else{if($e.getDerivedStateFromProps==null&&ue!==oe&&mt.componentWillReceiveProps!=null&&mt.componentWillReceiveProps(ue,be),!mt.__e&&(mt.shouldComponentUpdate!=null&&mt.shouldComponentUpdate(ue,mt.__s,be)===!1||_.__v===st.__v)){for(_.__v!==st.__v&&(mt.props=ue,mt.state=mt.__s,mt.__d=!1),_.__e=st.__e,_.__k=st.__k,_.__k.forEach((function(le){le&&(le.__=_)})),ke=0;ke<mt._sb.length;ke++)mt.__h.push(mt._sb[ke]);mt._sb=[],mt.__h.length&&pt.push(mt);break t}mt.componentWillUpdate!=null&&mt.componentWillUpdate(ue,mt.__s,be),mt.componentDidUpdate!=null&&mt.__h.push((function(){mt.componentDidUpdate(oe,me,we)}))}if(mt.context=be,mt.props=ue,mt.__P=$,mt.__e=!1,Se=n.__r,_e=0,"prototype"in $e&&$e.prototype.render){for(mt.state=mt.__s,mt.__d=!1,Se&&Se(_),Zt=mt.render(mt.props,mt.state,mt.context),Ce=0;Ce<mt._sb.length;Ce++)mt.__h.push(mt._sb[Ce]);mt._sb=[]}else do mt.__d=!1,Se&&Se(_),Zt=mt.render(mt.props,mt.state,mt.context),mt.state=mt.__s;while(mt.__d&&++_e<25);mt.state=mt.__s,mt.getChildContext!=null&&(ct=v(v({},ct),mt.getChildContext())),te||mt.getSnapshotBeforeUpdate==null||(we=mt.getSnapshotBeforeUpdate(oe,me)),H($,d(de=Zt!=null&&Zt.type===b&&Zt.key==null?Zt.props.children:Zt)?de:[de],_,st,ct,dt,k,pt,Yt,ht,Xt),mt.base=_.__e,_.__u&=-161,mt.__h.length&&pt.push(mt),ye&&(mt.__E=mt.__=null)}catch(le){_.__v=null,ht||k!=null?(_.__e=Yt,_.__u|=ht?160:32,k[k.indexOf(Yt)]=null):(_.__e=st.__e,_.__k=st.__k),n.__e(le,_,st)}else k==null&&_.__v===st.__v?(_.__k=st.__k,_.__e=st.__e):_.__e=W(st.__e,_,st,ct,dt,k,pt,ht,Xt);(Zt=n.diffed)&&Zt(_)}function L($,_,st){_.__d=void 0;for(var ct=0;ct<st.length;ct++)F(st[ct],st[++ct],st[++ct]);n.__c&&n.__c(_,$),$.some((function(dt){try{$=dt.__h,dt.__h=[],$.some((function(k){k.call(dt)}))}catch(k){n.__e(k,dt.__v)}}))}function W($,_,st,ct,dt,k,pt,Yt,ht){var Xt,Zt,mt,te,oe,me,we,ye=st.props,ue=_.props,xe=_.type;if(xe==="svg"?dt="http://www.w3.org/2000/svg":xe==="math"?dt="http://www.w3.org/1998/Math/MathML":dt||(dt="http://www.w3.org/1999/xhtml"),k!=null){for(Xt=0;Xt<k.length;Xt++)if((oe=k[Xt])&&"setAttribute"in oe==!!xe&&(xe?oe.localName===xe:oe.nodeType===3)){$=oe,k[Xt]=null;break}}if($==null){if(xe===null)return document.createTextNode(ue);$=document.createElementNS(dt,xe,ue.is&&ue),k=null,Yt=!1}if(xe===null)ye===ue||Yt&&$.data===ue||($.data=ue);else{if(k=k&&t.call($.childNodes),ye=st.props||f,!Yt&&k!=null)for(ye={},Xt=0;Xt<$.attributes.length;Xt++)ye[(oe=$.attributes[Xt]).name]=oe.value;for(Xt in ye)if(oe=ye[Xt],Xt!="children"){if(Xt=="dangerouslySetInnerHTML")mt=oe;else if(Xt!=="key"&&!(Xt in ue)){if(Xt=="value"&&"defaultValue"in ue||Xt=="checked"&&"defaultChecked"in ue)continue;R($,Xt,null,oe,dt)}}for(Xt in ue)oe=ue[Xt],Xt=="children"?te=oe:Xt=="dangerouslySetInnerHTML"?Zt=oe:Xt=="value"?me=oe:Xt=="checked"?we=oe:Xt==="key"||Yt&&typeof oe!="function"||ye[Xt]===oe||R($,Xt,oe,ye[Xt],dt);if(Zt)Yt||mt&&(Zt.__html===mt.__html||Zt.__html===$.innerHTML)||($.innerHTML=Zt.__html),_.__k=[];else if(mt&&($.innerHTML=""),H($,d(te)?te:[te],_,st,ct,xe==="foreignObject"?"http://www.w3.org/1999/xhtml":dt,k,pt,k?k[0]:st.__k&&x(st,0),Yt,ht),k!=null)for(Xt=k.length;Xt--;)k[Xt]!=null&&m(k[Xt]);Yt||(Xt="value",me!==void 0&&(me!==$[Xt]||xe==="progress"&&!me||xe==="option"&&me!==ye[Xt])&&R($,Xt,me,ye[Xt],dt),Xt="checked",we!==void 0&&we!==$[Xt]&&R($,Xt,we,ye[Xt],dt))}return $}function F($,_,st){try{typeof $=="function"?$(_):$.current=_}catch(ct){n.__e(ct,st)}}function I($,_,st){var ct,dt;if(n.unmount&&n.unmount($),(ct=$.ref)&&(ct.current&&ct.current!==$.__e||F(ct,null,_)),(ct=$.__c)!=null){if(ct.componentWillUnmount)try{ct.componentWillUnmount()}catch(k){n.__e(k,_)}ct.base=ct.__P=null}if(ct=$.__k)for(dt=0;dt<ct.length;dt++)ct[dt]&&I(ct[dt],_,st||typeof $.type!="function");st||$.__e==null||m($.__e),$.__c=$.__=$.__e=$.__d=void 0}function V($,_,st){return this.constructor($,st)}function O($,_,st){var ct,dt,k,pt;n.__&&n.__($,_),dt=(ct=!1)?null:_.__k,k=[],pt=[],M(_,$=_.__k=y(b,null,[$]),dt||f,f,_.namespaceURI,dt?null:_.firstChild?t.call(_.childNodes):null,k,dt?dt.__e:_.firstChild,ct,pt),L(k,$,pt)}function j($,_,st){var ct,dt,k,pt,Yt=v({},$.props);for(k in $.type&&$.type.defaultProps&&(pt=$.type.defaultProps),_)k=="key"?ct=_[k]:k=="ref"?dt=_[k]:Yt[k]=_[k]===void 0&&pt!==void 0?pt[k]:_[k];return arguments.length>2&&(Yt.children=arguments.length>3?t.call(arguments,2):st),g($.type,Yt,ct||$.key,dt||$.ref,null)}function q($,_){var st={__c:_="__cC"+s++,__:$,Consumer:function(ct,dt){return ct.children(dt)},Provider:function(ct){var dt,k;return this.getChildContext||(dt=[],(k={})[_]=this,this.getChildContext=function(){return k},this.shouldComponentUpdate=function(pt){this.props.value!==pt.value&&dt.some((function(Yt){Yt.__e=!0,P(Yt)}))},this.sub=function(pt){dt.push(pt);var Yt=pt.componentWillUnmount;pt.componentWillUnmount=function(){dt.splice(dt.indexOf(pt),1),Yt&&Yt.call(pt)}}),ct.children}};return st.Provider.__=st.Consumer.contextType=st}t=p.slice,n={__e:function($,_,st,ct){for(var dt,k,pt;_=_.__;)if((dt=_.__c)&&!dt.__)try{if((k=dt.constructor)&&k.getDerivedStateFromError!=null&&(dt.setState(k.getDerivedStateFromError($)),pt=dt.__d),dt.componentDidCatch!=null&&(dt.componentDidCatch($,ct||{}),pt=dt.__d),pt)return dt.__E=dt}catch(Yt){$=Yt}throw $}},e=0,C.prototype.setState=function($,_){var st;st=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=v({},this.state),typeof $=="function"&&($=$(v({},st),this.props)),$&&v(st,$),$!=null&&this.__v&&(_&&this._sb.push(_),P(this))},C.prototype.forceUpdate=function($){this.__v&&(this.__e=!0,$&&this.__h.push($),P(this))},C.prototype.render=b,r=[],u=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=function($,_){return $.__v.__b-_.__v.__b},U.__r=0,l=0,c=T(!1),a=T(!0),s=0;var B,K,z,G,J=0,Q=[],X=[],Y=n,Z=Y.__b,tt=Y.__r,nt=Y.diffed,et=Y.__c,_t=Y.unmount,rt=Y.__;function ot($,_){Y.__h&&Y.__h(K,$,J||_),J=0;var st=K.__H||(K.__H={__:[],__h:[]});return $>=st.__.length&&st.__.push({__V:X}),st.__[$]}function ut($){return J=1,it(wt,$)}function it($,_,st){var ct=ot(B++,2);if(ct.t=$,!ct.__c&&(ct.__=[wt(void 0,_),function(Yt){var ht=ct.__N?ct.__N[0]:ct.__[0],Xt=ct.t(ht,Yt);ht!==Xt&&(ct.__N=[Xt,ct.__[1]],ct.__c.setState({}))}],ct.__c=K,!K.u)){var dt=function(Yt,ht,Xt){if(!ct.__c.__H)return!0;var Zt=ct.__c.__H.__.filter((function(te){return!!te.__c}));if(Zt.every((function(te){return!te.__N})))return!k||k.call(this,Yt,ht,Xt);var mt=!1;return Zt.forEach((function(te){if(te.__N){var oe=te.__[0];te.__=te.__N,te.__N=void 0,oe!==te.__[0]&&(mt=!0)}})),!(!mt&&ct.__c.props===Yt)&&(!k||k.call(this,Yt,ht,Xt))};K.u=!0;var k=K.shouldComponentUpdate,pt=K.componentWillUpdate;K.componentWillUpdate=function(Yt,ht,Xt){if(this.__e){var Zt=k;k=void 0,dt(Yt,ht,Xt),k=Zt}pt&&pt.call(this,Yt,ht,Xt)},K.shouldComponentUpdate=dt}return ct.__N||ct.__}function lt($,_){var st=ot(B++,3);!Y.__s&&xt(st.__H,_)&&(st.__=$,st.i=_,K.__H.__h.push(st))}function at($){return J=5,ft((function(){return{current:$}}),[])}function ft($,_){var st=ot(B++,7);return xt(st.__H,_)?(st.__V=$(),st.i=_,st.__h=$,st.__V):st.__}function yt(){for(var $;$=Q.shift();)if($.__P&&$.__H)try{$.__H.__h.forEach(bt),$.__H.__h.forEach(Ct),$.__H.__h=[]}catch(_){$.__H.__h=[],Y.__e(_,$.__v)}}Y.__b=function($){K=null,Z&&Z($)},Y.__=function($,_){$&&_.__k&&_.__k.__m&&($.__m=_.__k.__m),rt&&rt($,_)},Y.__r=function($){tt&&tt($),B=0;var _=(K=$.__c).__H;_&&(z===K?(_.__h=[],K.__h=[],_.__.forEach((function(st){st.__N&&(st.__=st.__N),st.__V=X,st.__N=st.i=void 0}))):(_.__h.forEach(bt),_.__h.forEach(Ct),_.__h=[],B=0)),z=K},Y.diffed=function($){nt&&nt($);var _=$.__c;_&&_.__H&&(_.__H.__h.length&&(Q.push(_)!==1&&G===Y.requestAnimationFrame||((G=Y.requestAnimationFrame)||kt)(yt)),_.__H.__.forEach((function(st){st.i&&(st.__H=st.i),st.__V!==X&&(st.__=st.__V),st.i=void 0,st.__V=X}))),z=K=null},Y.__c=function($,_){_.some((function(st){try{st.__h.forEach(bt),st.__h=st.__h.filter((function(ct){return!ct.__||Ct(ct)}))}catch(ct){_.some((function(dt){dt.__h&&(dt.__h=[])})),_=[],Y.__e(ct,st.__v)}})),et&&et($,_)},Y.unmount=function($){_t&&_t($);var _,st=$.__c;st&&st.__H&&(st.__H.__.forEach((function(ct){try{bt(ct)}catch(dt){_=dt}})),st.__H=void 0,_&&Y.__e(_,st.__v))};var gt=typeof requestAnimationFrame=="function";function kt($){var _,st=function(){clearTimeout(ct),gt&&cancelAnimationFrame(_),setTimeout($)},ct=setTimeout(st,100);gt&&(_=requestAnimationFrame(st))}function bt($){var _=K,st=$.__c;typeof st=="function"&&($.__c=void 0,st()),K=_}function Ct($){var _=K;$.__c=$.__(),K=_}function xt($,_){return!$||$.length!==_.length||_.some((function(st,ct){return st!==$[ct]}))}function wt($,_){return typeof _=="function"?_($):_}var Pt=function($,_,st,ct){var dt;_[0]=0;for(var k=1;k<_.length;k++){var pt=_[k++],Yt=_[k]?(_[0]|=pt?1:2,st[_[k++]]):_[++k];pt===3?ct[0]=Yt:pt===4?ct[1]=Object.assign(ct[1]||{},Yt):pt===5?(ct[1]=ct[1]||{})[_[++k]]=Yt:pt===6?ct[1][_[++k]]+=Yt+"":pt?(dt=$.apply(Yt,Pt($,Yt,st,["",null])),ct.push(dt),Yt[0]?_[0]|=2:(_[k-2]=0,_[k]=dt)):ct.push(Yt)}return ct},Ut=new Map;function Ht($){var _=Ut.get(this);return _||(_=new Map,Ut.set(this,_)),(_=Pt(this,_.get($)||(_.set($,_=(function(st){for(var ct,dt,k=1,pt="",Yt="",ht=[0],Xt=function(te){k===1&&(te||(pt=pt.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?ht.push(0,te,pt):k===3&&(te||pt)?(ht.push(3,te,pt),k=2):k===2&&pt==="..."&&te?ht.push(4,te,0):k===2&&pt&&!te?ht.push(5,0,!0,pt):k>=5&&((pt||!te&&k===5)&&(ht.push(k,0,pt,dt),k=6),te&&(ht.push(k,te,0,dt),k=6)),pt=""},Zt=0;Zt<st.length;Zt++){Zt&&(k===1&&Xt(),Xt(Zt));for(var mt=0;mt<st[Zt].length;mt++)ct=st[Zt][mt],k===1?ct==="<"?(Xt(),ht=[ht],k=3):pt+=ct:k===4?pt==="--"&&ct===">"?(k=1,pt=""):pt=ct+pt[0]:Yt?ct===Yt?Yt="":pt+=ct:ct==='"'||ct==="'"?Yt=ct:ct===">"?(Xt(),k=1):k&&(ct==="="?(k=5,dt=pt,pt=""):ct==="/"&&(k<5||st[Zt][mt+1]===">")?(Xt(),k===3&&(ht=ht[0]),k=ht,(ht=ht[0]).push(2,0,k),k=0):ct===" "||ct==="	"||ct===`
`||ct==="\r"?(Xt(),k=2):pt+=ct),k===3&&pt==="!--"&&(k=4,ht=ht[0])}return Xt(),ht})($)),_),arguments,[])).length>1?_:_[0]}var Et=Ht.bind(y),St={};function At($,_){for(var st in _)$[st]=_[st];return $}function Dt($,_,st){var ct,dt=/(?:\?([^#]*))?(#.*)?$/,k=$.match(dt),pt={};if(k&&k[1])for(var Yt=k[1].split("&"),ht=0;ht<Yt.length;ht++){var Xt=Yt[ht].split("=");pt[decodeURIComponent(Xt[0])]=decodeURIComponent(Xt.slice(1).join("="))}$=Tt($.replace(dt,"")),_=Tt(_||"");for(var Zt=Math.max($.length,_.length),mt=0;mt<Zt;mt++)if(_[mt]&&_[mt].charAt(0)===":"){var te=_[mt].replace(/(^:|[+*?]+$)/g,""),oe=(_[mt].match(/[+*?]+$/)||St)[0]||"",me=~oe.indexOf("+"),we=~oe.indexOf("*"),ye=$[mt]||"";if(!ye&&!we&&(oe.indexOf("?")<0||me)){ct=!1;break}if(pt[te]=decodeURIComponent(ye),me||we){pt[te]=$.slice(mt).map(decodeURIComponent).join("/");break}}else if(_[mt]!==$[mt]){ct=!1;break}return(st.default===!0||ct!==!1)&&pt}function Nt($,_){return $.rank<_.rank?1:$.rank>_.rank?-1:$.index-_.index}function Rt($,_){return $.index=_,$.rank=(function(st){return st.props.default?0:Tt(st.props.path).map(Mt).join("")})($),$.props}function Tt($){return $.replace(/(^\/+|\/+$)/g,"").split("/")}function Mt($){return $.charAt(0)==":"?1+"*+?".indexOf($.charAt($.length-1))||4:5}var Lt={},Wt=[],Ft=[],It=null,Vt={url:jt()},Ot=q(Vt);function jt(){var $;return""+(($=It&&It.location?It.location:It&&It.getCurrentLocation?It.getCurrentLocation():typeof location<"u"?location:Lt).pathname||"")+($.search||"")}function qt($,_){return _===void 0&&(_=!1),typeof $!="string"&&$.url&&(_=$.replace,$=$.url),(function(st){for(var ct=Wt.length;ct--;)if(Wt[ct].canRoute(st))return!0;return!1})($)&&(function(st,ct){ct===void 0&&(ct="push"),It&&It[ct]?It[ct](st):typeof history<"u"&&history[ct+"State"]&&history[ct+"State"](null,null,st)})($,_?"replace":"push"),Bt($)}function Bt($){for(var _=!1,st=0;st<Wt.length;st++)Wt[st].routeTo($)&&(_=!0);return _}function Kt($){if($&&$.getAttribute){var _=$.getAttribute("href"),st=$.getAttribute("target");if(_&&_.match(/^\//g)&&(!st||st.match(/^_?self$/i)))return qt(_)}}function zt($){return $.stopImmediatePropagation&&$.stopImmediatePropagation(),$.stopPropagation&&$.stopPropagation(),$.preventDefault(),!1}function Gt($){if(!($.ctrlKey||$.metaKey||$.altKey||$.shiftKey||$.button)){var _=$.target;do if(_.localName==="a"&&_.getAttribute("href")){if(_.hasAttribute("data-native")||_.hasAttribute("native"))return;if(Kt(_))return zt($)}while(_=_.parentNode)}}var Jt=!1;function Qt($){$.history&&(It=$.history),this.state={url:$.url||jt()}}At(Qt.prototype=new C,{shouldComponentUpdate:function($){return $.static!==!0||$.url!==this.props.url||$.onChange!==this.props.onChange},canRoute:function($){var _=A(this.props.children);return this.g(_,$)!==void 0},routeTo:function($){this.setState({url:$});var _=this.canRoute($);return this.p||this.forceUpdate(),_},componentWillMount:function(){this.p=!0},componentDidMount:function(){var $=this;Jt||(Jt=!0,It||addEventListener("popstate",(function(){Bt(jt())})),addEventListener("click",Gt)),Wt.push(this),It&&(this.u=It.listen((function(_){var st=_.location||_;$.routeTo(""+(st.pathname||"")+(st.search||""))}))),this.p=!1},componentWillUnmount:function(){typeof this.u=="function"&&this.u(),Wt.splice(Wt.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function($,_){$=$.filter(Rt).sort(Nt);for(var st=0;st<$.length;st++){var ct=$[st],dt=Dt(_,ct.props.path,ct.props);if(dt)return[ct,dt]}},render:function($,_){var st,ct,dt=$.onChange,k=_.url,pt=this.c,Yt=this.g(A($.children),k);if(Yt&&(ct=j(Yt[0],At(At({url:k,matches:st=Yt[1]},st),{key:void 0,ref:void 0}))),k!==(pt&&pt.url)){At(Vt,pt=this.c={url:k,previous:pt&&pt.url,current:ct,path:ct?ct.props.path:null,matches:st}),pt.router=this,pt.active=ct?[ct]:[];for(var ht=Ft.length;ht--;)Ft[ht]({});typeof dt=="function"&&dt(pt)}return y(Ot.Provider,{value:pt},ct)}});const switchIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='652.000000pt'%20height='956.000000pt'%20viewBox='0%200%20652.000000%20956.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,956.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M1150%209540%20c-386%20-6%20-408%20-8%20-475%20-29%20-147%20-48%20-255%20-115%20-368%20-226%20-93%20-91%20-145%20-159%20-191%20-250%20-74%20-146%20-77%20-163%20-87%20-455%20-10%20-318%20-14%20-7639%20-4%20-7725%2025%20-214%20107%20-394%20245%20-539%20115%20-121%20227%20-192%20408%20-260%20l72%20-28%202418%20-1%20c2586%20-2%202582%20-2%202716%2047%20254%2092%20492%20346%20573%20611%2017%2058%2018%20211%2018%204095%20l0%204035%20-23%2075%20c-61%20193%20-204%20388%20-368%20501%20-76%2052%20-226%20118%20-294%20129%20-36%206%20-229%2015%20-430%2020%20-398%2010%20-3557%2010%20-4210%200z%20m4610%20-328%20c164%20-59%20291%20-175%20374%20-339%20l36%20-73%200%20-4016%200%20-4016%20-45%20-88%20c-25%20-48%20-70%20-115%20-101%20-148%20-64%20-71%20-175%20-148%20-242%20-168%20-103%20-32%20-400%20-35%20-2687%20-32%20-2180%203%20-2282%204%20-2335%2022%20-204%2068%20-363%20240%20-417%20452%20-17%2065%20-18%20275%20-18%203979%200%203785%201%203912%2019%203980%2024%2091%2084%20207%20140%20271%2055%2062%20182%20152%20244%20171%2027%208%20121%2018%20222%2022%2096%205%201203%208%202460%207%20l2285%20-1%2065%20-23z'/%3e%3cpath%20d='M1434%208128%20l-45%20-41%203%20-3291%20c3%20-3127%204%20-3293%2021%20-3323%209%20-18%2029%20-41%2044%20-50%2026%20-17%20125%20-18%201799%20-18%201918%200%201808%20-3%201834%2054%207%2014%2016%2067%2021%20116%205%2050%209%20789%209%201644%20l0%201554%20249%20981%20c358%201405%20401%201581%20401%201626%200%2051%204%2046%20-414%20468%20l-321%20322%20-1778%200%20-1777%200%20-46%20-42z%20m3636%20-425%20l165%20-168%20-185%20-6%20c-102%20-4%20-770%20-7%20-1485%20-8%20l-1300%20-1%20-145%20148%20c-80%2081%20-156%20159%20-170%20175%20l-23%2027%201489%200%201490%200%20164%20-167z%20m-3078%20-356%20l31%20-38%20-147%20-583%20c-81%20-320%20-153%20-602%20-160%20-626%20-12%20-39%20-13%20-23%20-19%20185%20-9%20291%20-9%20823%200%201123%20l6%20233%20129%20-128%20c71%20-70%20143%20-145%20160%20-166z%20m2900%20-136%20c278%20-3%20510%20-9%20513%20-13%2010%20-10%203%20-40%20-305%20-1260%20l-280%20-1107%200%20-1565%200%20-1566%20-1565%200%20-1565%200%200%201521%200%201520%20310%201226%20c171%20675%20313%201229%20316%201232%2014%2014%201788%2022%202576%2012z'/%3e%3cpath%20d='M3765%206820%20c-61%20-25%20-87%20-94%20-185%20-473%20-80%20-315%20-120%20-493%20-120%20-540%200%20-77%2078%20-141%20163%20-134%2069%206%20101%2040%20131%20141%2057%20190%20197%20746%20212%20843%205%2032%201%2053%20-19%2096%20-22%2048%20-30%2057%20-64%2066%20-44%2013%20-90%2013%20-118%201z'/%3e%3cpath%20d='M3098%203406%20c-104%20-37%20-216%20-134%20-264%20-227%20-24%20-47%20-28%20-71%20-35%20-184%20-19%20-311%20-7%20-500%2037%20-586%2040%20-80%20113%20-151%20201%20-195%20l76%20-39%20151%200%20151%200%2068%2034%20c81%2041%20167%20128%20215%20218%20l32%2061%200%20302%200%20302%20-41%2078%20c-65%20127%20-156%20201%20-284%20235%20-73%2019%20-255%2019%20-307%201z%20m262%20-311%20c58%20-30%2064%20-57%2068%20-301%204%20-219%204%20-222%20-19%20-253%20-65%20-88%20-230%20-95%20-286%20-13%20-16%2024%20-18%2055%20-21%20273%20l-3%20246%2038%2030%20c21%2017%2045%2033%2053%2036%2025%2011%20137%20-1%20170%20-18z'/%3e%3c/g%3e%3c/svg%3e",buttonIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M790%201280%20l0%20-420%2065%200%2065%200%200%20420%200%20420%20-65%200%20-65%200%200%20-420z'/%3e%3cpath%20d='M489%201612%20c-228%20-114%20-386%20-309%20-451%20-557%20-29%20-110%20-29%20-297%200%20-406%2081%20-301%20308%20-530%20607%20-610%20112%20-30%20307%20-30%20420%200%20294%2077%20529%20312%20606%20606%2029%20110%2030%20307%201%20416%20-67%20251%20-245%20462%20-477%20565%20l-55%2024%200%20-74%200%20-74%2072%20-42%20c280%20-167%20411%20-508%20313%20-817%20-35%20-110%20-88%20-196%20-175%20-283%20-87%20-87%20-172%20-139%20-285%20-177%20-70%20-23%20-96%20-27%20-210%20-27%20-114%200%20-140%204%20-210%2027%20-293%2097%20-495%20372%20-495%20673%200%2070%2025%20193%2055%20266%2054%20133%20182%20279%20299%20339%20l66%2034%200%2078%20c0%2042%20-1%2077%20-2%2077%20-2%200%20-37%20-18%20-79%20-38z'/%3e%3c/g%3e%3c/svg%3e",timerIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M818%201670%20c-24%20-15%20-31%20-77%20-23%20-221%208%20-141%2015%20-159%2064%20-159%2050%200%2060%2024%2063%20150%20l3%20115%2030%20-3%20c172%20-19%20366%20-132%20472%20-275%2094%20-129%20133%20-236%20140%20-392%206%20-142%20-12%20-230%20-73%20-355%20-82%20-165%20-236%20-296%20-419%20-357%20-71%20-24%20-95%20-27%20-215%20-27%20-118%200%20-145%203%20-212%2026%20-123%2041%20-204%2092%20-298%20187%20-68%2068%20-94%20103%20-127%20171%20-61%20125%20-76%20203%20-71%20352%206%20153%2036%20243%20122%20371%2064%2095%2068%20127%2021%20149%20-39%2017%20-68%202%20-113%20-59%20-94%20-127%20-150%20-285%20-159%20-449%20-23%20-399%20236%20-749%20632%20-855%20111%20-30%20297%20-30%20410%200%20449%20119%20716%20562%20610%201011%20-23%2095%20-105%20254%20-173%20336%20-111%20131%20-276%20234%20-442%20274%20-89%2021%20-213%2026%20-242%2010z'/%3e%3cpath%20d='M452%201258%20c-7%20-7%20-12%20-17%20-12%20-23%200%20-21%20330%20-469%20358%20-487%2043%20-28%20106%20-23%20143%2010%2043%2038%2052%20113%2020%20154%20-20%2025%20-454%20342%20-484%20354%20-7%202%20-18%20-1%20-25%20-8z'/%3e%3c/g%3e%3c/svg%3e",owIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='110.000000pt'%20height='52.000000pt'%20viewBox='0%200%20110.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M171%20500%20c-50%20-12%20-83%20-41%20-111%20-96%20-22%20-43%20-25%20-62%20-24%20-149%200%20-141%2027%20-199%20109%20-236%2073%20-33%20180%20-16%20227%2037%2067%2076%2074%20284%2013%20376%20-39%2059%20-133%2089%20-214%2068z%20m119%20-65%20c50%20-26%2065%20-67%2065%20-180%200%20-146%20-32%20-195%20-128%20-195%20-40%200%20-54%205%20-77%2028%20-16%2016%20-34%2049%20-40%2073%20-16%2056%20-7%20186%2014%20227%2030%2057%20105%2078%20166%2047z'/%3e%3cpath%20d='M482%20483%20c3%20-10%2029%20-120%2058%20-245%20l54%20-228%2038%200%20c43%200%2035%20-20%2089%20215%2017%2077%2035%20146%2038%20152%204%207%2026%20-73%2051%20-178%20l44%20-190%2039%203%2040%203%2058%20240%20c32%20132%2058%20241%2059%20243%200%202%20-15%202%20-32%200%20l-32%20-3%20-43%20-180%20c-23%20-99%20-44%20-187%20-46%20-195%20-2%20-8%20-25%2074%20-51%20183%20l-48%20198%20-36%20-3%20-36%20-3%20-45%20-194%20c-25%20-106%20-47%20-188%20-49%20-181%20-3%207%20-23%2095%20-46%20194%20l-42%20181%20-33%203%20c-28%203%20-33%201%20-29%20-15z'/%3e%3c/g%3e%3c/svg%3e",encoderIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='34.000000pt'%20height='52.000000pt'%20viewBox='0%200%2034.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M30%20255%20l0%20-245%20150%200%20150%200%200%2030%200%2030%20-115%200%20-115%200%200%2085%200%2085%2095%200%2095%200%200%2030%200%2030%20-95%200%20-95%200%200%2070%200%2070%20115%200%20115%200%200%2030%200%2030%20-150%200%20-150%200%200%20-245z'/%3e%3c/g%3e%3c/svg%3e",Icons={switchIcon:$=>Et`
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
    </svg>`},tipColors={green:"bg-green-100 text-green-900 ring-green-300",yellow:"bg-yellow-100 text-yellow-900 ring-yellow-300"};function Button({title:$,onclick:_,disabled:st,cls:ct,icon:dt,ref:k,colors:pt,hovercolor:Yt,disabledcolor:ht}){const[Xt,Zt]=ut(!1),mt=function(te){const oe=_?_():null;oe&&typeof oe.catch=="function"&&(Zt(!0),oe.catch(()=>!1).then(()=>Zt(!1)))};return pt||(pt="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400"),Et` <button
    type="button"
    class="inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${pt} ${ct}"
    ref=${k}
    onclick=${mt}
    disabled=${st||Xt}
  >
    ${$}
    <${Xt?Icons.refresh:dt} class="w-4 ${Xt?"animate-spin":""}" />
  <//>`}function Login({loginFn:$,logoIcon:_,title:st,tipText:ct}){const[dt,k]=ut(""),[pt,Yt]=ut(""),ht=function(Xt){const mt={Authorization:"Basic "+btoa(dt+":"+pt)};return fetch("api/login",{headers:mt}).then($).finally(te=>Yt(""))};return Et` <div
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
          oninput=${Xt=>k(Xt.target.value)}
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
          oninput=${Xt=>Yt(Xt.target.value)}
          value=${pt}
          onchange=${ht}
        />
      <//>
      <div class="mt-7">
        <${Button}
          title="Sign In"
          icon=${Icons.logout}
          onclick=${ht}
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
  <//>`}const ruLangswitch=["","ID - уникальный числовой идентификатор выключателя. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","Device connection - Здесь указаны пины одного или нескольких устройств, с которыми взаимодействует данный выключатель.",'INFO - Укажите название данного выключателя для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение обработчика состояния на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек и соединений выключателя."],ruLangselect=["","ID - уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type(s) of pin(s) - Выберите режим работы данного пина из предложенных вариантов."],rulangbutton=["","ID - уникальный числовой идентификатор кнопки. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","sclick - Выполняемая команда при одинарном клике кнопки.","dclick - Выполняемая команда при двойном клике кнопки.","lpress - Выполняемая команда при удержании кнопки.",'INFO - Укажите название данной кнопки для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение функции кнопки на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек кнопки."],ruencoder=["","ID - уникальный числовой идентификатор энкодера. Присваивается автоматически.","Pin - Уникальный номер пина.","Encoder A (ID) - Основной пин энкодера A (DT).","Encoder B (ID) - Дополнительный пин энкодера B (CLK).","PWM connection - Подключение ШИМ для управления яркостью (диммер).","Dimmer value (0-100) - Текущее значение диммера от 0 до 100.","Duty on restore - Восстановление значения скважности (яркости) при включении контроллера.","INFO - Укажите название данного энкодера для быстрой навигации.","On/Off - Включение или отключение обработчика энкодера.","Action - Кнопка Edit позволяет зайти в меню настроек энкодера.","PWM Frequency - Частота ШИМ управляемого устройства (в герцах).","Resolution (steps) - Максимальное количество шагов от 0 до 100% для ШИМ устройства."],rulangtimers=["","No - Уникальный числовой идентификатор задачи (cron). Присваивается автоматически.","Cron - Сконфигурируйте расписание (cron) для выполнения задачи.","Script - Какое действие (скрипт) должно выполниться в указанное в таймере время.",'Info - Дайте название выбранному таймеру для быстрой навигации, например "Полив газона". Не более 30-ти символов!',"On/Off - Вкл/Откл выполнение данной задачи.","Action - Кнопка Edit позволяет зайти в меню настроек задачи."],rulangsettings=["","Login - Введите имя пользователя для входа в систему. Используется при авторизации в веб-интерфейсе.","Password - Введите пароль для входа в систему. Рекомендуется использовать надёжный пароль.","Time zone UTC - Выберите свой часовой пояс. Влияет на отображение времени и расчёт восхода/заката.","IP address - Введите статический IP-адрес устройства. После перезагрузки STM32 будет доступен по этому адресу. Формат: 192.168.1.100","Subnet mask - Введите маску подсети. Определяет диапазон адресов вашей локальной сети. Формат: 255.255.255.0","Default gateway - Введите IP-адрес шлюза по умолчанию (обычно адрес вашего роутера). Формат: 192.168.1.1","Token - Секретный ключ для авторизации API-запросов. Используется в URL командах управления устройством. Пример: /api/Token/switch?id=1&onoff=1","Host - Введите IP-адрес или доменное имя MQTT-брокера. Пример: 192.168.1.50 или broker.hivemq.com","Port - Укажите порт MQTT-брокера. Стандартный порт: 1883 (без шифрования), 8883 (с TLS).","Client - Уникальный идентификатор клиента MQTT. Каждое устройство должно иметь свой уникальный Client ID.","User - Имя пользователя для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","Password - Пароль для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","TX topic - Исходящий топик MQTT. На этот топик устройство публикует свои данные и события. Пример: Swarm","RX topic - Входящий топик MQTT. С этого топика устройство получает команды управления. Пример: Swarm","HTTPS domain - Доменное имя для HTTPS-соединения. Необходим действующий SSL-сертификат для этого домена. Пример: zagotovka.ddns.net",'Private Key - Закрытый ключ SSL-сертификата в формате PEM. Начинается с "-----BEGIN EC PRIVATE KEY-----". Хранится в зашифрованном виде.','Public Key - Публичный сертификат SSL в формате PEM. Начинается с "-----BEGIN CERTIFICATE-----". Используется для HTTPS-соединения.',"Longitude - Долгота вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 37.618 (Москва)","Latitude - Широта вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 55.751 (Москва)","Sunrise - Время восхода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на восходе.","Sunset - Время захода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на закате.","Day Length - Продолжительность светового дня, рассчитывается автоматически на основе координат и текущей даты.","Next full moon - Дата и время следующего полнолуния, рассчитывается автоматически.","Date - Дата для автономного (offline) режима в формате дд.мм.гг. Используется когда нет доступа к NTP-серверу. Пример: 15.03.25","Time - Время для автономного (offline) режима в формате чч:мм:сс. Используется когда нет доступа к NTP-серверу. Пример: 14:30:00"],ruLangsecurity=["","RXD Pin - Пин приема данных (RX).","TXD Pin - Пин передачи данных (TX).","Phone Number - Номер телефона для отправки SMS и звонков.","Info - Дополнительная информация для быстрой навигации.","OnOff - Включение или отключение модуля SIM800L.","Action - Кнопка Edit позволяет зайти в меню настроек."],ruLangsecuritypins=["","ID - уникальный числовой идентификатор пина. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type of sensor - Тип подключенного сенсора (PIR, Normal open, Normal close).","Action - Действие, выполняемое при срабатывании сенсора.","Send SMS - Отправлять ли SMS при срабатывании сенсора (YES/NO).","INFO - Дополнительная информация для быстрой навигации.","On/Off - Включение или отключение охранного пина.","Edit Pin - Редактирование настроек охранного пина."],rulange1Wire=["","ID - Уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового пина, к которому подключена шина 1-Wire.","Selected sensor - Адрес выбранного и привязанного к этому пину уникального 1-Wire датчика (например, DS18B20).","Count of sensors - Количество найденных 1-Wire температурных датчиков на данном пине.","On/Off - Функция включения или отключения опроса подключенных датчиков на данной шине.","Actions - Кнопка Edit для привязки конкретного датчика к этому соединению."],enLangswitch=["","ID - A unique numerical identifier of the switch. Assigned automatically","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","Device connection - Here will appear one or more devices/relays of pin(s) with which this switch interacts.",'INFO - Give a name of this switch for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the switch state handler on this pin.","Action - The Edit button allows you to access the switch settings menu."],enLangselect=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type(s) of pin(s) - Select the operating mode of this pin from the provided options."],enlangbutton=["","ID - A unique numerical identifier of the button. Assigned automatically.","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","sclick - Command to execute when the button is pressed once.","dclick - Command to execute when the button is pressed twice.","lpress - Command to execute when the button is long pressed.",'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the button function on this pin.","Action - The Edit button allows you to access the button settings menu."],enencoder=["","ID - A unique numerical identifier of the encoder. Assigned automatically.","PIN - The unique number of the pin.","Encoder A (ID) - Main pin of encoder A (DT).","Encoder B (ID) - Additional pin of encoder B (CLK).","PWM connection - PWM connection for brightness control (dimmer).","Dimmer value (0-100) - Current dimmer value from 0 to 100.","Duty on restore - Value of duty cycle (brightness) to restore when the controller is turned on.","INFO - Give a name to this encoder for quick navigation.","On/Off - Enable or disable the encoder handler.","Action - The Edit button allows you to access the encoder settings menu.","PWM Frequency - PWM frequency of the controlled device (in Hertz).","Resolution (steps) - Maximum number of steps from 0 to 100% for the PWM device."],enlangtimers=["","No - A unique numerical identifier of the task (cron). Assigned automatically.","Cron - Configure a schedule (cron) to perform the action.","Script - What action (script) must be performed at the time specified in the timer.",'Info - Give a name to the selected timer for quick navigation, e.g."Lawn Watering", "Backyard Light", etc. No more than 30 characters!',"On/Off - Enable or disable the execution of this task.","Action - The Edit button allows you to access the task settings menu."],enlangsettings=["","Login - Enter the username for logging into the system. Used for web interface authentication.","Password - Enter your password for the system. It is recommended to use a strong password.","Time zone UTC - Select your time zone. Affects time display and sunrise/sunset calculations.","IP address - Enter a static IP address for the device. After reboot, STM32 will be available at this address. Format: 192.168.1.100","Subnet mask - Enter the subnet mask. Defines the range of addresses in your local network. Format: 255.255.255.0","Default gateway - Enter the default gateway IP address (usually your router address). Format: 192.168.1.1","Token - Secret key for API request authorization. Used in device control URL commands. Example: /api/Token/switch?id=1&onoff=1","Host - Enter the IP address or domain name of the MQTT broker. Example: 192.168.1.50 or broker.hivemq.com","Port - Specify the MQTT broker port. Standard port: 1883 (no encryption), 8883 (with TLS).","Client - Unique MQTT client identifier. Each device must have its own unique Client ID.","User - Username for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","Password - Password for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","TX topic - Outgoing MQTT topic. The device publishes its data and events to this topic. Example: Swarm","RX topic - Incoming MQTT topic. The device receives control commands from this topic. Example: Swarm","HTTPS domain - Domain name for HTTPS connection. A valid SSL certificate for this domain is required. Example: zagotovka.ddns.net",'Private Key - SSL certificate private key in PEM format. Starts with "-----BEGIN EC PRIVATE KEY-----". Stored in encrypted form.','Public Key - SSL public certificate in PEM format. Starts with "-----BEGIN CERTIFICATE-----". Used for HTTPS connection.',"Longitude - Longitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 37.618 (Moscow)","Latitude - Latitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 55.751 (Moscow)","Sunrise - Sunrise time is calculated automatically based on your coordinates. The slider enables/disables the action at sunrise.","Sunset - Sunset time is calculated automatically based on your coordinates. The slider enables/disables the action at sunset.","Day Length - Duration of daylight, calculated automatically based on coordinates and current date.","Next full moon - Date and time of the next full moon, calculated automatically.","Date - Date for offline mode in dd.mm.yy format. Used when there is no access to the NTP server. Example: 15.03.25","Time - Time for offline mode in hh:mm:ss format. Used when there is no access to the NTP server. Example: 14:30:00"],enLangsecurity=["","RXD Pin - Receive Data Pin (RX).","TXD Pin - Transmit Data Pin (TX).","Phone Number - Phone number for SMS notifications and calls.","Info - Additional information for quick navigation.","OnOff - Enable or disable the SIM800L module.","Action - The Edit button allows you to access the settings menu."],enLangsecuritypins=["","ID - A unique numerical identifier of the pin. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type of sensor - Type of connected sensor (PIR, Normal open, Normal close).","Action - Action to perform when the sensor is triggered.","Send SMS - Whether to send SMS when the sensor is triggered (YES/NO).","INFO - Additional information for quick navigation.","On/Off - Enable or disable the security pin.","Edit Pin - The Edit button allows you to access the security pin settings."],enlange1Wire=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital pin to which the 1-Wire bus is connected.","Selected sensor - Address of the selected and bound unique 1-Wire sensor to this pin (e.g., DS18B20).","Count of sensors - Number of found 1-Wire temperature sensors on this pin.","On/Off - The function of enabling or disabling polling of connected sensors on this bus.","Actions - The Edit button to bind a specific sensor to this connection."];function initGlobalTooltip$7(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,Yt=window.innerWidth,ht=dt.getBoundingClientRect();let Xt=ht.left+ht.width/2-k/2;Xt=Math.max(8,Math.min(Xt,Yt-k-8));let Zt=ht.top-pt-8;Zt<8&&(Zt=ht.bottom+8),$.style.left=Xt+"px",$.style.top=Zt+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabSelect({}){const[$,_]=ut(null),[st,ct]=ut({}),[dt,k]=ut(null),[pt,Yt]=ut(!1),[ht,Xt]=ut(3),[Zt,mt]=ut(!1),[te,oe]=ut("ru");lt(()=>{initGlobalTooltip$7()},[]);const me=de=>{mt(de)},we=de=>Zt&&(de===1||de===35),ye=()=>fetch("api/select/get").then(de=>de.json()).then(de=>{const $e=de.data||de;_($e),mt(de.sim800l===1),de.lang&&oe(de.lang);const le={};$e.forEach(he=>{le[`topin_${he.id}`]=he.topin.toString()}),ct(le)});lt(ye,[]),lt(()=>{let de;return pt&&ht>0?de=setTimeout(()=>{Xt(ht-1)},1e3):ht===0&&(Yt(!1),k(null)),()=>clearTimeout(de)},[pt,ht]);const ue=async de=>{de.preventDefault();const $e=new FormData(de.target),le={lang:te,sim800l:Zt?1:0,data:[]};$.forEach(he=>{const ve=$e.get(`topin_${he.id}`);le.data.push({id:he.id,pins:he.pins,topin:parseInt(ve),pwm:he.pwm,i2cdata:he.i2cdata,i2cclok:he.i2cclok})}),k("submitting"),Yt(!0),Xt(3);try{const he=await fetch("api/select/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(le)});if(!he.ok)throw new Error("Network response was not ok");const ve=await he.json();k("success"),console.log("Success:",ve);const re={};le.data.forEach(Te=>{re[`topin_${Te.id}`]=Te.topin.toString()}),ct(Te=>({...Te,...re})),ye()}catch(he){k("error"),console.error("Error:",he)}},xe=de=>{const{name:$e,value:le}=de.target;ct(he=>({...he,[$e]:le}))};if(!$)return"";const be=()=>({langselect:te==="ru"?ruLangselect:enLangselect}),ke=(de,$e)=>{const le=be(),ve=(le[de]&&le[de][$e]?le[de][$e]:"").split(" "),re=[];for(let Te=0;Te<ve.length;Te+=15)re.push(ve.slice(Te,Te+15).join(" "));return re.join("<br>")},Se=de=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      style=${de.center?"text-align: center":""}
      data-tip=${ke("langselect",de.tooltipIndex)}
    >
      ${de.title}
    </th>
  `,_e=({id:de,value:$e,label:le,disabled:he=!1,onChange:ve,checked:re})=>Et`
    <div class="relative">
      <input
        id="${de}_${$e}"
        class="sr-only peer"
        type="radio"
        name="topin_${de}"
        value="${$e}"
        checked=${re}
        onChange=${ve}
        disabled=${he}
        aria-label="${le}"
      />
      <label
        for="${de}_${$e}"
        class="cursor-pointer px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300 
               ${he?"text-gray-400 cursor-not-allowed opacity-60":"text-slate-700 hover:bg-black/5"}
               peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-cyan-500 peer-checked:text-white peer-checked:shadow-sm"
      >
        ${le}
      </label>
    </div>
  `,Ce=({d:de})=>Et`
    <tr class="${we(de.id)?"bg-red-200/50 opacity-50 pointer-events-none":de.id%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-2 text-sm text-slate-800">${de.id}</td>
      <td class="px-6 py-2 text-sm text-slate-800 font-medium">${de.pins}</td>
      <td class="px-2 py-2">
        <div class="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
          <${_e} id=${de.id} value="0"  label="NONE"     checked=${st[`topin_${de.id}`]==="0"}  onChange=${xe} />
          <${_e} id=${de.id} value="3"  label="SWITCH"   checked=${st[`topin_${de.id}`]==="3"}  onChange=${xe} />
          <${_e} id=${de.id} value="1"  label="BUTTON"   checked=${st[`topin_${de.id}`]==="1"}  onChange=${xe} />
          <${_e} id=${de.id} value="2"  label="DEVICE"   checked=${st[`topin_${de.id}`]==="2"}  onChange=${xe} />
          <${_e} id=${de.id} value="4"  label="1-WIRE"   checked=${st[`topin_${de.id}`]==="4"}  onChange=${xe} />
          <${_e} id=${de.id} value="5"  label="PWM"      disabled=${de.pwm==0} checked=${st[`topin_${de.id}`]==="5"}  onChange=${xe} />
          <${_e} id=${de.id} value="8"  label="Enc.OutA" checked=${st[`topin_${de.id}`]==="8"}  onChange=${xe} />
          <${_e} id=${de.id} value="9"  label="Enc.OutB" checked=${st[`topin_${de.id}`]==="9"}  onChange=${xe} />
          <${_e} id=${de.id} value="10" label="Security" disabled=${de.monitoring==0} checked=${st[`topin_${de.id}`]==="10"} onChange=${xe} />
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

        <form onSubmit=${ue}>
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <button
              type="submit"
              class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${pt?"bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none":"bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"}`}
              disabled=${pt}
            >
              ${pt?`Please wait ${ht} sec.`:"Submit"}
            </button>

            <div class="flex items-center gap-3">
              <span class="text-slate-600 font-bold uppercase tracking-widest text-2xl drop-shadow-sm">SIM800L</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  checked=${Zt}
                  onChange=${de=>me(de.target.checked)}
                />
                <div class="w-[42px] h-[22px] bg-slate-200/80 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300/50 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-400 peer-checked:to-cyan-500 shadow-inner"></div>
              </label>
            </div>
          </div>

          ${dt==="success"&&Et`
            <div class="mb-6 bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
              <strong class="font-bold">Успех! </strong>
              <span class="block sm:inline">Данные успешно сохранены. Идет запись на USB флешку. Кнопка станет активной через ${ht} секунд.</span>
            </div>
          `}
          ${dt==="error"&&Et`
            <div class="mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
              <strong class="font-bold">Ошибка!</strong>
              <span class="block sm:inline">Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз через ${ht} секунд.</span>
            </div>
          `}

          <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <${Se} title="ID" tooltipIndex=${1} />
                    <${Se} title="Pin" tooltipIndex=${2} />
                    <${Se} title="Type(s) of pin(s)" tooltipIndex=${3} center=${!0} />
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/40">
                  ${$&&$.map(de=>y(Ce,{d:de}))}
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
              ${pt?`Please wait ${ht} sec.`:"Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `}function ModalSwitch({modalType:$,page:_,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedSwitch:k,onSwitchChange:pt,connectionOptions:Yt,SliderComponent:ht=MyPolzunok}){const[Xt,Zt]=ut((k==null?void 0:k.info)||""),[mt,te]=ut((k==null?void 0:k.onoff)||0),[oe,me]=ut((k==null?void 0:k.ptype)||0),[we,ye]=ut((k==null?void 0:k.setrpins)||""),[ue,xe]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(re=>{if(!re.ok)throw new Error(`HTTP error! status: ${re.status}`);return re.json()}).then(re=>{if(!re||!re.data||!Array.isArray(re.data)){console.error("Invalid data format:",re),xe([]);return}const Te=re.data.filter(ee=>ee.topin===2);xe(Te)}).catch(re=>{console.error("Error fetching pin config:",re),xe([])})},[]);const be=re=>{re.preventDefault();const Te=new FormData(re.target),ee=Object.fromEntries(Te);if(ee.id=k.id,ee.pins=k.pins,$==="edit")ee.onoff=mt;else if($==="connection"){const ie=ue.find(vt=>vt.pins===ee.setrpins);ie&&(ee.pinact={...k.pinact,[ie.id]:ie.pins})}fetch("/api/switch/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ee)}).then(ie=>ie.json()).then(ie=>{console.log("Success:",ie),pt({...k,...ee}),st(),window.location.href="/#/switch"}).catch(ie=>{console.error("Error:",ie)})},ke=re=>{ye(re.target.value)},Se=re=>{me(parseInt(re.target.value))},_e=re=>{Zt(re.target.value)},Ce=re=>{te(re)},de=re=>{ct&&re.target===re.currentTarget&&st()},$e=()=>{me(0),Zt(""),te(0)},he=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50"
      style="margin-top: 7px;"
      onclick=${de}
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
          <form onsubmit=${be}>
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
                        value=${ue.some(re=>re.pins===we)?we:""}
                        onchange=${ke}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select a connection</option>
                        ${ue.map(re=>Et`
                            <option value=${re.pins}>
                              ${re.pins} (ID: ${re.id})
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
                        value=${oe}
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
                        value=${Xt}
                        oninput=${_e}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${ht}
                        value=${mt}
                        onChange=${Ce}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-between items-center mt-4">
              <button
                type="button"
                onclick=${$e}
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
  `,ve=at(null);return lt(()=>{const re=document.createElement("div");return re.id="modal-portal",document.body.appendChild(re),ve.current=re,()=>{O(null,re),document.body.removeChild(re)}},[]),lt(()=>{ve.current&&O(he,ve.current)}),null}function initGlobalTooltip$6(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block";const k=dt.getBoundingClientRect();$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const pt=$.offsetWidth,Yt=$.offsetHeight,ht=window.innerWidth;let Xt=k.left+k.width/2-pt/2;Xt=Math.max(8,Math.min(Xt,ht-pt-8));let Zt=k.top-Yt-8;Zt<8&&(Zt=k.bottom+8),$.style.left=Xt+"px",$.style.top=Zt+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabSwitch({}){const[$,_]=ut(null),[st,ct]=ut(null),[dt,k]=ut(!1),[pt,Yt]=ut(null),[ht,Xt]=ut(null),[Zt,mt]=ut(!1),[te,oe]=ut("ru"),[me,we]=ut(null),[ye,ue]=ut([]),[xe,be]=ut(""),[ke,Se]=ut(!1);lt(()=>{initGlobalTooltip$6()},[]);const _e=()=>Promise.all([fetch("/api/switch/get").then(ne=>ne.json()),fetch("/api/pintopin/get").then(ne=>ne.json())]).then(([ne,fe])=>{oe(ne.lang),we(ne.switches),_(ne),ue(fe),be(`Pintopin data: ${JSON.stringify(fe,null,2)}

Switch data: ${JSON.stringify(ne.switches,null,2)}`),console.log("Pintopin data:",fe),console.log("Switch data:",ne.switches)}).catch(ne=>{console.error("Error fetching data:",ne),be(`Error fetching data: ${ne.message}`)}),Ce=()=>{fetch("/api/switch/get").then(ne=>ne.json()).then(ne=>{we(ne.switches),oe(ne.lang),console.log("Updated switch data:",ne.switches)}).catch(ne=>{console.error("Error fetching switch data:",ne)})},de=()=>{fetch("/api/pintopin/get").then(ne=>ne.json()).then(ne=>{ue(ne),console.log("Updated pintopin data:",ne)}).catch(ne=>{console.error("Error fetching pintopin data:",ne)})};lt(()=>{Ce(),de();const ne=setInterval(()=>{Ce(),de()},1e3);return()=>clearInterval(ne)},[]);const $e=ne=>{const fe=new Map,Ee=me.find(Oe=>Oe.id===ne);return Ee&&Ee.pinact&&Object.entries(Ee.pinact).forEach(([Oe,ce])=>{fe.set(Oe,{pin:Oe,relayId:ce})}),ye.forEach(Oe=>{if(Oe.idin===ne){const ce=`${Oe.pins}(${Oe.idout})`;fe.has(ce)||fe.set(ce,{pin:Oe.pins,relayId:Oe.idout})}}),Array.from(fe.values())},le=()=>({langswitch:te==="ru"?ruLangswitch:enLangswitch}),he=(ne,fe)=>{const Ee=le(),ce=(Ee[ne]&&Ee[ne][fe]||"").split(" "),se=[];let Ie="";for(let $t=0;$t<ce.length;$t++){const ge=ce[$t];Ie.length+ge.length+1<=200?Ie+=(Ie.length>0?" ":"")+ge:(Ie.length>0&&se.push(Ie),Ie=ge)}return Ie.length>0&&se.push(Ie),se.join("<br>")},ve=(ne,fe)=>{console.log("Удаление соединения:",ne,fe);const[Ee,Oe]=fe.split("("),ce=Oe?parseInt(Oe):null;fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ne,pin:Ee.trim()})}).then(se=>se.json()).then(se=>{ct(se),we(Ie=>Ie.map($t=>{if($t.id===ne){const ge={...$t.pinact};return delete ge[Ee.trim()],{...$t,pinact:ge}}return $t})),ue(Ie=>Ie.filter($t=>!($t.idin===ne&&$t.pins===Ee.trim()&&(ce===null||$t.idout===ce))))}).then(()=>{console.log("Соединение удалено успешно"),_e()}).catch(se=>{console.error("Ошибка при удалении соединения:",se)})},re=(ne,fe)=>{Yt(ne),Xt(fe),k(!0)},Te=()=>{k(!1),Yt(null),Xt(null)},ee=ne=>{console.log("handleSwitchChange:",ne),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ne.id,onoff:ne.onoff})}).then(fe=>fe.json()).then(fe=>{console.log("Response from /api/onoff/set:",fe)}).catch(fe=>{console.error("Error calling /api/onoff/set:",fe)}),Te()},ie={ru:Et`
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
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/switch?id=27&onoff=1
                </td>
                <td class="border px-4 py-2">
                  Данная команда ВКЛючит выключатель с id = 27. Где "Zerg" это Ваш 'Token'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/switch?id=27&onoff=0
                </td>
                <td class="border px-4 py-2">
                  Данная команда ОТКлючит выключатель с id = 27. Где "Zerg" это Ваш 'Token'.
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
                <td class="border px-4 py-2">Swarm/switch/id=27/onoff=1</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда ВКЛючит выключатель с id = 27. Где "Swarm" это Ваш 'TX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Swarm/switch/id=27/onoff=0</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда ОТКлючит выключатель с id = 27. Где "Swarm" это Ваш 'TX topic'.
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
                <td class="border px-4 py-2">Swarm/switch/</td>
                <td class="border px-4 py-2">
                  Данная страница отслеживает изменения выключателей и автоматически отправляет каждое изменение по MQTT на топик: Swarm/switch/.
                  Где "Swarm" это Ваш 'TX topic'.
                </td>
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
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/switch?id=15&onoff=1
                </td>
                <td class="border px-4 py-2">
                  Where "Zerg" is your 'Token'. This command will turn on the switch with id = 15.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  http://192.168.1.24:8000/api/Zerg/switch?id=15&onoff=0
                </td>
                <td class="border px-4 py-2">
                  Where "Zerg" is your 'Token'. This command will turn off the switch with id = 15.
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
                <td class="border px-4 py-2">Swarm/switch/id=27/onoff=1</td>
                <td class="border px-4 py-2">
                  Where "Swarm" is your 'RX topic'. This command will turn ON the switch with id = 27.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Swarm/switch/id=27/onoff=0</td>
                <td class="border px-4 py-2">
                  Where "Swarm" is your 'RX topic'. This command will turn OFF the switch with id = 27.
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
                  This page tracks changes in switches and automatically sends each change via MQTT to the topic: Swarm/switch/.
                  Where "Swarm" is your 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `},vt=ne=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${he("langswitch",ne.tooltipIndex)}
    >
      ${ne.title}
    </th>
  `,ae=({d:ne,index:fe})=>{const Ee=$e(ne.id);return Et`
      <tr class="${fe%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${ne.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${ne.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][ne.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono">
          ${Ee.map(({pin:Oe,relayId:ce})=>Et`
              <span class="mr-2 inline-flex items-center">
                ${Oe}${ce!==void 0?`(${ce})`:""}
                <button
                  onClick=${se=>{se.preventDefault(),ve(ne.id,`${Oe}(${ce})`)}}
                  class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                  title="Remove connection"
                >
                  [x]
                </button>
              </span>
            `)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${ne.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${ne.onoff}
            onChange=${Oe=>ee({...ne,onoff:Oe})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>re("connection",ne)}
            class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
          >
            Connection
          </button>
          <span class="text-slate-300">|</span>
          <button
            onClick=${()=>re("edit",ne)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors ml-2"
          >
            Edit
          </button>
        </td>
      </tr>
    `};return me?Et`
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
            <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6">
              <!-- overflow-x-auto только здесь, убран overflow-hidden с родителя -->
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
                  <tbody id="tab1" class="divide-y divide-white/40">
                    ${me.map((ne,fe)=>Et`<${ae} d=${ne} index=${fe} key=${ne.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>mt(!Zt)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${Zt?"Hide Help":"Show Help"}
              </button>
            </div>

            ${Zt&&Et`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${ie[te]}
                </div>
              `}
          </div>
        </div>

        ${dt&&Et`
            <${ModalSwitch}
              modalType=${pt}
              page="TabSwitch"
              hideModal=${Te}
              title=${pt==="connection"?"Edit Connection":"Edit switch"}
              selectedSwitch=${ht}
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
  `,portalRef=at(null);return lt(()=>{const $=document.createElement("div");return $.id="modal-portal",document.body.appendChild($),portalRef.current=$,()=>{O(null,$),document.body.removeChild($)}},[]),lt(()=>{portalRef.current&&O(modalContent,portalRef.current)}),null};function initGlobalTooltip$5(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,Yt=window.innerWidth,ht=dt.getBoundingClientRect();let Xt=ht.left+ht.width/2-k/2;Xt=Math.max(8,Math.min(Xt,Yt-k-8));let Zt=ht.top-pt-8;Zt<8&&(Zt=ht.bottom+8),$.style.left=Xt+"px",$.style.top=Zt+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabButton=()=>{const[$,_]=ut(null),[st,ct]=ut([]),[dt,k]=ut(null),[pt,Yt]=ut(null),[ht,Xt]=ut(!1),[Zt,mt]=ut(null),[te,oe]=ut(null),[me,we]=ut(!1),[ye,ue]=ut("ru"),[xe,be]=ut(""),[ke,Se]=ut(!0);lt(()=>{initGlobalTooltip$5()},[]);const _e={ru:Et`
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
                <td class="border px-4 py-2">Swarm/button/id=30/single_click</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда выполнит команду, прописанную в 'SINGLE CLICK' c id = 30. Где "Swarm" это Ваш 'TX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Swarm/button/id=30/double_click</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда выполнит команду, прописанную в 'DOUBLE CLICK' c id = 30. Где "Swarm" это Ваш 'TX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Swarm/button/id=30/long_press</td>
                <td class="border px-4 py-2">
                  Данная MQTT команда выполнит команду, прописанную в 'LONG PRESS' c id = 30. Где "Swarm" это Ваш 'TX topic'.
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
                <td class="border px-4 py-2">Swarm/button/</td>
                <td class="border px-4 py-2">
                  Данная страница отслеживает изменения кнопок и автоматически отправляет каждое изменение по MQTT на топик: Swarm/button/.
                  Где "Swarm" это Ваш 'TX topic'.
                </td>
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
                <td class="border px-4 py-2">Swarm/button/id=30/single_click</td>
                <td class="border px-4 py-2">
                  This MQTT command will execute the command specified in 'SINGLE CLICK' with id = 30. Where "Swarm" is your 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Swarm/button/id=30/double_click</td>
                <td class="border px-4 py-2">
                  This MQTT command will execute the command specified in 'DOUBLE CLICK' with id = 30. Where "Swarm" is your 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">Swarm/button/id=30/long_press</td>
                <td class="border px-4 py-2">
                  This MQTT command will execute the command specified in 'LONG PRESS' with id = 30. Where "Swarm" is your 'RX topic'.
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
                <td class="border px-4 py-2">Swarm/button/</td>
                <td class="border px-4 py-2">
                  This page tracks changes in buttons and automatically sends each change via MQTT to the topic: Swarm/button/. Where "Swarm" is your 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `},Ce=()=>{fetch("/api/button/get").then(vt=>vt.json()).then(vt=>{k(vt.buttons),ue(vt.lang),console.log("Updated button data:",vt.buttons)}).catch(vt=>{console.error("Error fetching button data:",vt)})};lt(()=>{Ce();let vt;return ke&&(vt=setInterval(()=>{Ce()},1e3)),()=>{vt&&clearInterval(vt)}},[ke]);const de=vt=>{const ae=new Map,ne=dt.find(fe=>fe.id===vt);return ne&&ne.pinact&&Object.entries(ne.pinact).forEach(([fe,Ee])=>{ae.set(fe,{pin:fe,relayId:Ee})}),st.forEach(fe=>{if(fe.idin===vt){const Ee=`${fe.pins}(${fe.idout})`;ae.has(Ee)||ae.set(Ee,{pin:fe.pins,relayId:fe.idout})}}),Array.from(ae.values())},$e=()=>({langbutton:ye==="ru"?rulangbutton:enlangbutton}),le=(vt,ae)=>{const ne=$e(),fe=ne[vt]&&ne[vt][ae]?ne[vt][ae]:"";return he(fe)},he=(vt,ae=100)=>{if(!vt||typeof vt!="string")return"";const ne=[];let fe="";const Ee=vt.split(`
`);return Ee.forEach((Oe,ce)=>{Oe.split(" ").filter(Ie=>Ie.length>0).forEach(Ie=>{const $t=fe.length===0?Ie:" "+Ie;fe.length+$t.length<=ae?fe+=$t:(fe.length>0&&ne.push(fe),fe=Ie)}),fe.length>0&&(ne.push(fe),fe=""),ce<Ee.length-1&&ne.push("")}),fe.length>0&&ne.push(fe),ne.join(`
`)},ve=(vt,ae)=>{mt(vt),oe(ae),Xt(!0),Se(!1)},re=()=>{Xt(!1),mt(null),oe(null),Se(!0)},Te=vt=>{console.log("handleButtonChange:",vt),k(ae=>ae.map(ne=>ne.id===vt.id?{...ne,...vt}:ne)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:vt.id,onoff:vt.onoff})}).then(ae=>ae.json()).then(ae=>{console.log("Response from /api/onoff/set:",ae)}).catch(ae=>{console.error("Error calling /api/onoff/set:",ae)}),re()},ee=vt=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${le("langbutton",vt.tooltipIndex)}
    >
      ${vt.title}
    </th>
  `,ie=({d:vt,index:ae})=>(de(vt.id),Et`
      <tr class="${ae%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${vt.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${vt.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][vt.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${he(vt.sclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${he(vt.dclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${he(vt.lpress)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${vt.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${vt.onoff}
            onChange=${ne=>Te({...vt,onoff:ne})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>ve("edit",vt)}
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
            <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${ee} title="ID" tooltipIndex=${1} />
                      <${ee} title="Pin" tooltipIndex=${2} />
                      <${ee} title="Pullup type" tooltipIndex=${3} />
                      <${ee} title="SINGLE CLICK" tooltipIndex=${4} />
                      <${ee} title="DOUBLE CLICK" tooltipIndex=${5} />
                      <${ee} title="LONG PRESS" tooltipIndex=${6} />
                      <${ee} title="INFO" tooltipIndex=${7} />
                      <${ee} title="On/Off" tooltipIndex=${8} />
                      <${ee} title="Action" tooltipIndex=${9} />
                    </tr>
                  </thead>
                  <tbody id="tab1" class="divide-y divide-white/40">
                    ${dt.map((vt,ae)=>Et`<${ie} d=${vt} index=${ae} key=${vt.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>we(!me)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${me?"Hide Help":"Show Help"}
              </button>
            </div>

            ${me&&Et`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${_e[ye]}
                </div>
              `}
          </div>
        </div>
      </div>
    </div>

    ${ht&&Et`
        <${ModalButton}
          modalType=${Zt}
          page="TabButton"
          hideModal=${re}
          title=${Zt==="connection"?"Edit Connection":"Edit Button pin"}
          selectedButton=${te}
          onButtonChange=${Te}
        />
      `}
  `:""};function ModalEncoder({modalType:$,page:_,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedEncoder:k,handleEncoderChange:pt,connectionOptions:Yt,SliderComponent:ht=MyPolzunok}){const[Xt,Zt]=ut((k==null?void 0:k.info)||""),[mt,te]=ut((k==null?void 0:k.onoff)===1),[oe,me]=ut({pin:(k==null?void 0:k.encdrbpin)||"",id:(k==null?void 0:k.encoderb)||""}),[we,ye]=ut(Object.entries(k.pinact||{})[0]||["",""]),[ue,xe]=ut([]),[be,ke]=ut([]),[Se,_e]=ut([]),[Ce,de]=ut(k.dvalue||0),[$e,le]=ut(k.ponr||0),[he,ve]=ut(k.pwm||1e7);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(se=>{if(!se.ok)throw new Error(`HTTP error! status: ${se.status}`);return se.json()}).then(se=>{if(!se||!se.data||!Array.isArray(se.data)){console.error("Invalid data format:",se),xe([]),ke([]),_e([]);return}const Ie=se.data.filter(pe=>pe.topin===2),$t=se.data.filter(pe=>pe.topin===9),ge=se.data.filter(pe=>pe.topin===5);if(xe(Ie),ke($t),_e(ge),k.encoderb||k.encdrbpin){const pe=$t.find(Pe=>String(Pe.id)===String(k.encoderb)||Pe.pins===k.encdrbpin);me({pin:pe?pe.pins:"",id:pe?pe.id:""})}}).catch(se=>{console.error("Error fetching pin config:",se),xe([]),ke([]),_e([])})},[k]);const re=se=>{if(se.preventDefault(),se.target instanceof HTMLFormElement){let $t={};$==="edit"?$t={topin:8,id:k.id,pins:k.pins,pwm:parseInt(he),dvalue:parseInt(Ce),ponr:parseInt($e),info:Xt,onoff:mt?1:0}:$==="connection"&&($t={id:k.id,pins:k.pins,encoderb:parseInt(oe.id),encdrbpin:oe.pin,pinact:{[we[0]]:parseInt(we[1])}}),console.log("We got a encoder JSON:",JSON.stringify($t)),fetch("/api/encoder/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify($t)}).then(ge=>ge.json()).then(ge=>{pt({...k,...$t}),st()}).catch(ge=>{console.error("Error:",ge)})}else console.error("Form element not found")},Te=se=>{Zt(se.target.value)},ee=se=>{te(se)},ie=se=>{const Ie=be.find($t=>$t.pins===se.target.value);me({pin:se.target.value,id:Ie?Ie.id:""})},vt=se=>{if(!se.target.value)ye(["",""]);else{const Ie=se.target.value.split("|");ye([Ie[0],Ie[1]])}},ae=se=>{de(se.target.value)},ne=se=>{le(se.target.value)},fe=se=>{const Ie=se/1e3;return Ie<=4e4?{cls:"text-green-600",msg:"Optimal range"}:Ie<=2e5?{cls:"text-yellow-600",msg:"Precision might drop"}:{cls:"text-red-600",msg:"Expert mode: low precision"}},Oe=Et`
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
            <h2 class="text-xl font-bold">${dt}</h2>
            <button
              onClick=${st}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          ${(()=>{if(_==="TabEncoder"){if($==="connection")return Et`
          <form onsubmit=${re}>
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
                        value=${be.some(se=>se.pins===oe.pin)?oe.pin:""}
                        onchange=${ie}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select Encoder B</option>
                        ${be.map(se=>Et`
                            <option value=${se.pins}>
                              ${se.pins} (ID: ${se.id})
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
                        value=${Se.some(se=>String(se.pins)===String(we[0]))?`${we[0]}|${we[1]}`:""}
                        onchange=${vt}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select PWM connection</option>
                        ${Se.map(se=>Et`
                            <option value=${`${se.pins}|${se.id}`}>
                              ${se.pins} (ID: ${se.id})
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
          <form onsubmit=${re}>
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
                        oninput=${se=>ve(se.target.value)} 
                        class="border rounded p-2 w-full font-mono" 
                        placeholder="50 - 2000000000"
                      />
                      <div class="text-xs ${fe(he).cls}">
                        ${fe(he).msg}
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
                    <td class="p-2 font-bold">Dimmer value (0-100)</td>
                    <td class="p-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value=${Ce}
                        oninput=${ae}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Duty on restore</td>
                    <td class="p-2">
                      <select
                        value=${$e}
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
                        value=${Xt}
                        oninput=${Te}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${ht}
                        value=${mt}
                        onChange=${ee}
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
    </div>
  `,ce=at(null);return lt(()=>{const se=document.createElement("div");return se.id="modal-portal",document.body.appendChild(se),ce.current=se,()=>{O(null,se),document.body.removeChild(se)}},[]),lt(()=>{ce.current&&O(Oe,ce.current)}),null}function initGlobalTooltip$4(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,Yt=window.innerWidth,ht=dt.getBoundingClientRect();let Xt=ht.left+ht.width/2-k/2;Xt=Math.max(8,Math.min(Xt,Yt-k-8));let Zt=ht.top-pt-8;Zt<8&&(Zt=ht.bottom+8),$.style.left=Xt+"px",$.style.top=Zt+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabEncoder({}){{const[$,_]=ut(null),[st,ct]=ut(null),[dt,k]=ut(!1),[pt,Yt]=ut(null),[ht,Xt]=ut(null),[Zt,mt]=ut(!1),[te,oe]=ut("ru"),[me,we]=ut([]),ye=at(!1);lt(()=>{initGlobalTooltip$4()},[]);const ue=()=>Promise.all([fetch("/api/encoder/get").then(vt=>vt.json()),fetch("/api/pintopin/get").then(vt=>vt.json())]).then(([vt,ae])=>{oe(vt.lang),_(vt.encoders),we(ae),console.log("Encoder data:",vt.encoders),console.log("Pintopin data:",ae)}).catch(vt=>{console.error("Error fetching data:",vt)}),xe=()=>{fetch("/api/encoder/get").then(vt=>vt.json()).then(vt=>{if(ye.current){console.log("Polling skip: onoff request in flight");return}_(vt.encoders),oe(vt.lang),console.log("Updated encoder data:",vt.encoders)}).catch(vt=>{console.error("Error fetching encoder data:",vt)})},be=()=>{fetch("/api/pintopin/get").then(vt=>vt.json()).then(vt=>{we(vt),console.log("Updated pintopin data:",vt)}).catch(vt=>{console.error("Error fetching pintopin data:",vt)})};lt(()=>{xe(),be();const vt=setInterval(()=>{xe(),be()},500);return()=>clearInterval(vt)},[]);const ke=vt=>{_(ae=>ae.map(ne=>ne.id===vt.id?vt:ne)),ye.current=!0,fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:vt.id,onoff:vt.onoff})}).then(ae=>ae.json()).then(ae=>{console.log("Response from /api/onoff/set (Encoder):",ae)}).catch(ae=>{console.error("Error calling /api/onoff/set (Encoder):",ae)}).finally(()=>{ye.current=!1})},Se=vt=>{const ae=$.find(fe=>fe.id===vt),ne=[];return ae&&ae.pinact&&Object.entries(ae.pinact).forEach(([fe,Ee])=>{ne.push({pin:fe,idout:Ee})}),ne},_e=vt=>{const ae=vt/1e3;return ae<=4e4?{cls:"text-green-600",msg:"✓"}:ae<=2e5?{cls:"text-yellow-600",msg:"~"}:{cls:"text-red-600",msg:"!"}},Ce=vt=>{if(!vt)return"—";const ae=vt/1e3;return ae>=1e6?`${(ae/1e6).toFixed(2)} MHz`:ae>=1e3?`${(ae/1e3).toFixed(1)} kHz`:`${ae} Hz`},de=()=>({langbutton:te==="ru"?ruencoder:enencoder}),$e=(vt,ae)=>{const ne=de(),fe=ne[vt]&&ne[vt][ae]?ne[vt][ae]:"";return le(fe)},le=(vt,ae=50)=>{if(!vt||typeof vt!="string")return"";const ne=vt.split(" ");let fe=[],Ee="";for(let Oe=0;Oe<ne.length;Oe++)Ee.length+ne[Oe].length+1<=ae?Ee+=`${Ee?" ":""}${ne[Oe]}`:(Ee&&fe.push(Ee.trim()),Ee=ne[Oe]);return Ee&&fe.push(Ee.trim()),fe.join(`
`)},he=(vt,ae)=>{console.log("Deleting connection:",vt,ae);const ne=ae.split("(")[0].trim();fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:vt,pin:ne})}).then(fe=>fe.ok?fe.json():fe.text().then(Ee=>{throw new Error(`HTTP error! status: ${fe.status}, message: ${Ee}`)})).then(fe=>{ct(fe),_(Ee=>Ee.map(Oe=>{if(Oe.id===vt){const ce={...Oe.pinact};return delete ce[ne],{...Oe,pinact:ce}}return Oe})),we(Ee=>Ee.filter(Oe=>!(Oe.idin===vt&&Oe.pins===ne)))}).then(()=>{console.log("Connection deleted successfully"),ue()}).catch(fe=>{console.error("Error deleting connection:",fe)})},ve=(vt,ae)=>{console.log("Opening modal:",vt,ae),Yt(vt),Xt(ae),k(!0)},re=()=>{k(!1),Yt(null),Xt(null)},Te={ru:Et`
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
                    Данная API команда установит значение димера в 25 единиц с id = 4. Где "Zerg" это Ваш 'Token'.
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
                  <td class="border px-4 py-2">Swarm/pwm/id=4/dvalue=25</td>
                  <td class="border px-4 py-2">
                    Данная MQTT команда установит значение диммера в 25 едениц с id = 4. Где "Swarm" это Ваш 'TX topic'.
                  </td>
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
                  <td class="border px-4 py-2">
                    http://192.168.1.24:8000/api/Zerg/pwm?id=7&dvalue=25
                  </td>
                  <td class="border px-4 py-2">
                    This command will set the dimmer to 25 for the device with ID 7. Where "Zerg" is your 'Token'.
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
                  <td class="border px-4 py-2">Swarm/pwm/id=7/dvalue=25</td>
                  <td class="border px-4 py-2">
                    This command will set the dimmer to 25 for the device with ID 7. Where "Swarm" is your 'RX topic'.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `},ee=({title:vt,tooltipIndex:ae})=>Et`
      <th
        class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
        data-tip=${$e("langbutton",ae)}
      >
        ${vt}
      </th>
    `,ie=({d:vt,index:ae})=>{const ne=Se(vt.id),fe=_e(vt.pwm||0);return Et`
        <tr class="${ae%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
          <td class="px-6 py-2 text-sm text-slate-800 font-medium">${vt.pins}(${vt.id})</td>
          <td class="px-6 py-2 text-sm text-slate-700">
            ${vt.encdrbpin?`${vt.encdrbpin}(${vt.encoderb})`:"Not set"}
          </td>
          <td class="px-6 py-2 text-sm text-slate-700 font-mono">
            ${ne.length>0?ne.map(({pin:Ee,idout:Oe})=>Et`
                    <span class="mr-2 inline-flex items-center">
                      ${Ee}(${Oe})
                      <button
                        onClick=${ce=>{ce.preventDefault(),he(vt.id,`${Ee}(${Oe})`)}}
                        class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                        title="Remove connection"
                      >
                        [x]
                      </button>
                    </span>
                  `):"Not set"}
          </td>
          <td class="px-6 py-2 text-sm">
            <span class="font-mono text-slate-700">${Ce(vt.pwm)}</span>
            <span class="ml-1 font-bold ${fe.cls}">${fe.msg}</span>
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
              onChange=${Ee=>ke({...vt,onoff:Ee})}
            />
          </td>
          <td class="px-6 py-2 text-sm whitespace-nowrap">
            <button
              onClick=${()=>ve("connection",vt)}
              class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
            >
              Connection
            </button>
            <span class="text-slate-300">|</span>
            <button
              onClick=${()=>ve("edit",vt)}
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
              <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6">
                <div class="overflow-x-auto w-full">
                  <table class="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                      <tr class="bg-teal-600/10 border-b border-teal-600/20">
                        <${ee} title="Encoder A (ID)" tooltipIndex=${3} />
                        <${ee} title="Encoder B (ID)" tooltipIndex=${4} />
                        <${ee} title="PWM connection" tooltipIndex=${5} />
                        <${ee} title="PWM Frequency" tooltipIndex=${11} />
                        <${ee} title="Resolution (steps)" tooltipIndex=${12} />
                        <${ee} title="Dimmer value (0-100)" tooltipIndex=${6} />
                        <${ee} title="Duty on restore" tooltipIndex=${7} />
                        <${ee} title="INFO" tooltipIndex=${8} />
                        <${ee} title="On/Off" tooltipIndex=${9} />
                        <${ee} title="Action" tooltipIndex=${10} />
                      </tr>
                    </thead>
                    <tbody id="tab1" class="divide-y divide-white/40">
                      ${$.map((vt,ae)=>Et`<${ie} d=${vt} index=${ae} key=${vt.id} />`)}
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="flex justify-end mt-6">
                <button
                  onclick=${()=>mt(!Zt)}
                  class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
                >
                  ${Zt?"Hide Help":"Show Help"}
                </button>
              </div>

              ${Zt&&Et`
                  <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                    ${Te[te]}
                  </div>
                `}
            </div>
          </div>
          ${dt&&Et`
              <${ModalEncoder}
                modalType=${pt}
                page="TabEncoder"
                hideModal=${re}
                title=${pt==="connection"?"Edit Connection":"Edit Encoder"}
                selectedEncoder=${ht}
                handleEncoderChange=${ke}
              />
            `}
        </div>
      </div>
    `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">Loading...</div>`}}function ModalCron({modalType:$,page:_,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedCron:k,handleCronChange:pt,connectionOptions:Yt,modalClass:ht,SliderComponent:Xt=MyPolzunok}){const[Zt,mt]=ut((k==null?void 0:k.info)||""),[te,oe]=ut((k==null?void 0:k.onoff)===1),[me,we]=ut((k==null?void 0:k.activ)||""),[ye,ue]=ut((k==null?void 0:k.cron)||""),[xe,be]=ut(k.setrpins||""),ke=ve=>{ve.preventDefault();const re=new FormData(ve.target),Te=Object.fromEntries(re);Te.id=k.id,Te.pins=k.pins,$==="edit"?(Te.onoff=te?1:0,Te.info=Zt,Te.cron=ye,Te.activ=me):$==="connection"&&(Te.setrpins=xe),console.log("Data being sent to server:"),console.log(Te),console.log("Stringified data:"),console.log(JSON.stringify(Te)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Te)}).then(ee=>ee.json()).then(ee=>{console.log("Success:",ee),pt({...k,...Te}),st(),window.location.href="/#/cron"}).catch(ee=>{console.error("Error:",ee)})};lt(()=>{mt((k==null?void 0:k.info)||""),be((k==null?void 0:k.setrpins)||""),oe((k==null?void 0:k.onoff)===1)},[k]);const Se=ve=>{ue(ve.target.value)},_e=ve=>{mt(ve.target.value)},Ce=ve=>{oe(ve)},de=ve=>{we(ve.target.value)},$e=()=>{if(_==="TabCron"&&$==="edit")return Et`
          <form onsubmit=${ke}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  ${[{label:"ID",value:k.id},{label:"Cron",value:Et`
                        <input
                          type="text"
                          value=${ye}
                          onInput=${Se}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"Script",value:Et`
                        <input
                          type="text"
                          value=${me}
                          onInput=${de}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"INFO",value:Et`
                        <input
                          type="text"
                          value=${Zt}
                          onInput=${_e}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"On/Off",value:Et`<${Xt}
                        value=${te}
                        onChange=${Ce}
                      />`}].map((ve,re)=>Et`
                      <tr
                        class="${re%2===1?"bg-white":"bg-gray-200"}"
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
        `},le=Et`
    <div class=${`modal ${ht||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${ve=>ct&&ve.target===ve.currentTarget&&st()}
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
            ${$e()}
          </div>
        </div>
      </div>
    </div>
  `,he=at(null);return lt(()=>{const ve=document.createElement("div");return ve.id="modal-portal",document.body.appendChild(ve),he.current=ve,()=>{O(null,ve),document.body.removeChild(ve)}},[]),lt(()=>{he.current&&O(le,he.current)}),null}function initGlobalTooltip$3(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,Yt=window.innerWidth,ht=dt.getBoundingClientRect();let Xt=ht.left+ht.width/2-k/2;Xt=Math.max(8,Math.min(Xt,Yt-k-8));let Zt=ht.top-pt-8;Zt<8&&(Zt=ht.bottom+8),$.style.left=Xt+"px",$.style.top=Zt+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabCron({}){const[$,_]=ut(null),[st,ct]=ut(null);at(null);const[dt,k]=ut(!1),[pt,Yt]=ut(null),[ht,Xt]=ut(null),[Zt,mt]=ut("ru"),[te,oe]=ut(!1),[me,we]=ut(1),[ye,ue]=ut(0);lt(()=>{initGlobalTooltip$3()},[]);const xe=()=>fetch("/api/cron/get").then(ee=>ee.json()).then(ee=>{console.log("API response:",ee),ee&&Array.isArray(ee.timers)?(_(ee.timers),mt(ee.lang||"ru"),typeof ee.numline=="number"&&(ue(ee.numline),we(ee.numline))):(console.error("Unexpected API response structure:",ee),_([]))}).catch(ee=>{console.error("Error fetching cron data:",ee),_([])});lt(()=>{xe()},[]),lt(()=>{be(ye)},[ye]);const be=ee=>{fetch("/api/numline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({numline:ee})}).then(ie=>ie.json()).then(ie=>console.log("Numline sent to stm32:",ie)).catch(ie=>console.error("Error sending Crone line to stm32:",ie))},ke=()=>{if(me<$.length){const ee=me+1;we(ee),ue(ee),be(ee)}},Se=()=>{if(me>0){const ee=me-1;we(ee),ue(ee),be(ee)}},_e={ru:Et`
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
        <h2>Примеры CRON</h2>
        <table>
          <thead>
            <tr>
              <th>CRON</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>* * * * * * *</td><td>CRON выполняется каждую секунду.</td></tr>
            <tr><td>0 * * * * * *</td><td>CRON выполняется в начале каждой минуты.</td></tr>
            <tr><td>* * * * * 2 *</td><td>CRON выполняется каждый вторник в течение всего дня.</td></tr>
            <tr><td>0 0 13-15 * * 2-4 *</td><td>CRON выполняется каждую минуту между 13 и 15 часами среды, четверга и пятницы.</td></tr>
            <tr><td>*/5 * * * * * *</td><td>CRON выполняется каждые 5 секунд, начиная с 0.</td></tr>
            <tr><td>*/5 */5 * * * * *</td><td>CRON выполняется каждые 5 секунд каждые 5 минут, с 00:00 до 55:55.</td></tr>
            <tr><td>0 0 0 * * 5 *</td><td>CRON выполняется каждую пятницу в полночь.</td></tr>
            <tr><td>0 0 */2 * * * *</td><td>CRON выполняется каждые 2 часа в начале часа.</td></tr>
            <tr><td>* * */2 * * * *</td><td>CRON выполняется каждую секунду каждые 2 часа (0, 2, 4, ..., 22).</td></tr>
            <tr><td>0 0 0 * * 1-5 *</td><td>CRON выполняется в полночь каждую неделю с понедельника по пятницу.</td></tr>
            <tr><td>15 23 */6 * * * *</td><td>CRON выполняется каждые 6 часов в (мин:сек) 23:15.</td></tr>
            <tr><td>0 0 0 1 * * *</td><td>CRON выполняется в начале каждого месяца в 00:00:00.</td></tr>
            <tr><td>0 0 0 1 */3 * *</td><td>CRON выполняется в начале каждого квартала в 00:00:00.</td></tr>
            <tr><td>10 15 20 * 8 6 *</td><td>CRON выполняется в 20:15:20 каждую субботу в августе.</td></tr>
            <tr><td>10 15 20 8 * 6 *</td><td>CRON выполняется в 20:15:20 каждую субботу, которая также является 8-м днем месяца.</td></tr>
            <tr><td>30-45 * * * * * *</td><td>CRON выполняется каждую секунду между 30 и 45.</td></tr>
            <tr><td>30-45/3 * * * * * *</td><td>CRON выполняется каждые 3 секунды в каждой минуты, когда секунды находятся между 30 и 45.</td></tr>
            <tr><td>0 23/1 * * * * *</td><td>CRON выполняется в начале каждой минуты, когда минуты находятся между 23 и 59.</td></tr>
            <tr><td>50-10 * * * * * *</td><td>CRON выполняется каждую секунду в диапазоне от 50 до 59 и от 00 до 10 (режим переполнения).</td></tr>
          </tbody>
        </table>
        <div>
          <pre>
            0 ── Откл
            1 ── Вкл
            2 ── Смена состояния
            p ── Пауза
            , ── Разделитель
          </pre>
        </div>
        <h2>Примеры ACTION</h2>
        <table>
          <thead>
            <tr><th>ACTION</th><th>Описание</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>18:1;p5;18:0</td>
              <td>18-й пин включится (ON) в указанное время (CRON), будет гореть 5 сек. и после паузы отключится (OFF).</td>
            </tr>
            <tr>
              <td>12:2;p5</td>
              <td>12-й пин будет менять своё состояние (TOGGLE) через 5 сек.</td>
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
              <td class="border px-4 py-2">Swarm/timer/</td>
              <td class="border px-4 py-2">
                Данная страница отслеживает изменения кнопок и автоматически отправляет каждое изменение по MQTT на топик: Swarm/timer/.
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
        <h2>Examples of CRON</h2>
        <table>
          <thead>
            <tr><th>CRON</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>* * * * * * *</td><td>CRON is valid all the time, will fire every second.</td></tr>
            <tr><td>0 * * * * * *</td><td>CRON is valid at the beginning of each minute.</td></tr>
            <tr><td>* * * * * 2 *</td><td>CRON is valid every Tuesday all day long.</td></tr>
            <tr><td>0 0 13-15 * * 2-4 *</td><td>CRON is valid every beginning of the minute between hours 13-15, between Tuesday and Thursday.</td></tr>
            <tr><td>*/5 * * * * * *</td><td>CRON is valid every 5 seconds starting at 0.</td></tr>
            <tr><td>*/5 */5 * * * *</td><td>CRON is valid every 5 seconds each 5 minutes, from 00:00 to 55:55.</td></tr>
            <tr><td>0 0 0 * * 5 *</td><td>Every Friday at midnight.</td></tr>
            <tr><td>0 0 */2 * * *</td><td>Every 2 hours at beginning of the hour.</td></tr>
            <tr><td>* * */2 * * *</td><td>Every second of every minute every 2 hours (0, 2, 4, .., 22).</td></tr>
            <tr><td>0 0 0 * * 1-5 *</td><td>At midnight, 00:00 every week between Monday and Friday.</td></tr>
            <tr><td>15 23 */6 * * *</td><td>Every 6 hours at (min:sec) 23:15.</td></tr>
            <tr><td>0 0 0 1 * * *</td><td>At 00:00:00 beginning of the month.</td></tr>
            <tr><td>0 0 0 1 */3 *</td><td>Every beginning of the quarter at 00:00:00.</td></tr>
            <tr><td>10 15 20 * 8 6 *</td><td>At 20:15:20 every Saturday in August.</td></tr>
            <tr><td>10 15 20 8 * 6 *</td><td>At 20:15:20 every Saturday that is also 8th day in month.</td></tr>
            <tr><td>30-45 * * * * *</td><td>Every second between 30 and 45.</td></tr>
            <tr><td>30-45/3 * * * * *</td><td>Every 3rd second in every minute, when seconds are between 30 and 45.</td></tr>
            <tr><td>0 23/1 * * * *</td><td>Every beginning of a minute when minute is between 23 and 59.</td></tr>
            <tr><td>50-10 * * * * *</td><td>Every second when seconds are from 50-59 and 00-10 (overflow mode).</td></tr>
          </tbody>
        </table>
        <div>
          <pre>
            0 ── OFF
            1 ── ON
            2 ── TOGGLE
            p ── PAUSE
            , ── Separator
          </pre>
        </div>
        <h2>Examples of ACTION</h2>
        <table>
          <thead>
            <tr><th>ACTION</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>18:1;p5;18:0</td>
              <td>Pin 18 will turn on (ON) at the specified time (CRON), stay on for 5 seconds and turn off (OFF) after the pause.</td>
            </tr>
            <tr>
              <td>12:2;p5</td>
              <td>Pin 12 will change its state (TOGGLE) after 5 seconds (p - PAUSE).</td>
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
              <td class="border px-4 py-2">Swarm/timer/</td>
              <td class="border px-4 py-2">
                This page tracks changes in buttons and automatically sends each change via MQTT to the topic: Swarm/timer/.
                Where "Swarm" is your 'RX topic'.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `};if($===null)return Et`<div>Loading...</div>`;const Ce=()=>({langtimers:Zt==="ru"?rulangtimers:enlangtimers}),de=(ee,ie)=>{const vt=Ce(),ne=(vt[ee]&&vt[ee][ie]?vt[ee][ie]:"").split(" "),fe=[];for(let Ee=0;Ee<ne.length;Ee+=15)fe.push(ne.slice(Ee,Ee+15).join(" "));return fe.join("<br>")},$e=(ee,ie)=>{Yt(ee),Xt(ie),k(!0)},le=()=>{k(!1),Yt(null),Xt(null)},he=ee=>{console.log("handleCronChange:",ee),_($.map(ie=>ie.id===ee.id?ee:ie)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ee)}).then(ie=>ie.json()).then(ie=>{console.log("Cron job updated successfully:",ie)}).catch(ie=>{console.error("Error updating cron job:",ie)})},ve=()=>Array.isArray(ht)?ht.flatMap(ee=>ee.pinact?Object.keys(ee.pinact).map(ie=>({value:ie,label:ie})):[]):ht&&ht.pinact?Object.keys(ht.pinact).map(ee=>({value:ee,label:ee})):[],re=ee=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${de("langtimers",ee.tooltipIndex)}
    >
      ${ee.title}
    </th>
  `,Te=({d:ee,index:ie})=>Et`
    <tr class="${ie%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ee.id}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider">${ee.cron}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider">${ee.activ}</td>
      <td class="px-6 py-4 text-sm text-slate-600">${ee.info}</td>
      <td class="px-6 py-4">
        <${MyPolzunok}
          value=${ee.onoff}
          onChange=${vt=>he({...ee,onoff:vt})}
        />
      </td>
      <td class="px-6 py-4 text-center">
        <button
          onclick=${()=>$e("edit",ee)}
          class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap"
        >
          Edit
        </button>
      </td>
    </tr>
  `;return Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="flex-grow flex flex-col justify-center items-center w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Timer(s)
        </div>
        <div class="w-full mb-6 relative">
          ${$&&$.length>0?Et`
                <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6">
                  <div class="overflow-x-auto w-full">
                    <table class="w-full text-left border-collapse whitespace-nowrap">
                      <thead>
                        <tr class="bg-teal-600/10 border-b border-teal-600/20">
                          <${re} title="No" tooltipIndex=${1} />
                          <${re} title="Cron" tooltipIndex=${2} />
                          <${re} title="Script" tooltipIndex=${3} />
                          <${re} title="Info" tooltipIndex=${4} />
                          <${re} title="On/Off" tooltipIndex=${5} />
                          <${re} title="Action" tooltipIndex=${6} />
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-white/40">
                        ${$.slice(0,me).map((ee,ie)=>Et`<${Te} d=${ee} index=${ie} key=${ee.id} />`)}
                      </tbody>
                    </table>
                  </div>
                </div>
              `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No cron jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>oe(!te)}
          >
            ${te?"Hide Help":"Show Help"}
          </button>
          <div class="font-semibold text-slate-600 tracking-wide">
            ${$&&$.length-me>0?`Still available: ${$.length-me} cron jobs`:"No available: cron jobs!"}
          </div>
          <div class="flex gap-2">
            ${$&&me<$.length?Et`
                  <button
                    class="bg-emerald-500 hover:bg-emerald-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-emerald-500/30"
                    onclick=${ke}
                    title="Add Cron"
                  >+</button>
                `:null}
            ${me>0?Et`
                  <button
                    class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                    onclick=${Se}
                    title="Remove Cron"
                  >-</button>
                `:null}
          </div>
        </div>
      </div>

      ${te&&Et`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">
          ${_e[Zt]}
        </div>
      `}

      ${dt&&Et`
        <${ModalCron}
          modalType=${pt}
          page="TabCron"
          hideModal=${le}
          title=${pt==="edit"?"Edit Timer(s)":"Edit Connection"}
          selectedCron=${ht}
          handleCronChange=${he}
          connectionOptions=${ve()}
          modalClass="mt-24"
        />
      `}
    </div>
  `}function ModalEditSensor({typsensor:$,oneWireId:_,pins:st,onClose:ct,onUpdate:dt,sensorType:k,sensorData:pt,closeOnOverlayClick:Yt=!0}){const[ht,Xt]=ut({ut:(pt==null?void 0:pt.ut)||$.ut,lt:(pt==null?void 0:pt.lt)||$.lt,action_ut:(pt==null?void 0:pt.action_ut)||$.action_ut,action_lt:(pt==null?void 0:pt.action_lt)||$.action_lt,upphumid:(pt==null?void 0:pt.upphumid)||$.upphumid||0,humlolim:(pt==null?void 0:pt.humlolim)||$.humlolim||0,actuphum:(pt==null?void 0:pt.actuphum)||$.actuphum||"",actlowhum:(pt==null?void 0:pt.actlowhum)||$.actlowhum||"",info:(pt==null?void 0:pt.info)||$.info,onoff:(pt==null?void 0:pt.onoff)||$.onoff||0,humidity:(pt==null?void 0:pt.humidity)||$.humidity||0}),[Zt,mt]=ut(!1),te=(be,ke,Se)=>{if(be===""||be==="-")return be;const _e=be.replace(",",".");if(!/^-?\d*\.?\d*$/.test(_e))return null;const Ce=parseFloat(_e);return isNaN(Ce)||Ce<ke||Ce>Se?null:_e},oe=be=>{const{name:ke,value:Se}=be.target;if(["ut","lt"].includes(ke)){const _e=te(Se,-55,125);_e!==null&&Xt(Ce=>({...Ce,[ke]:_e}))}else if(["upphumid","humlolim"].includes(ke)){const _e=te(Se,0,100);_e!==null&&Xt(Ce=>({...Ce,[ke]:_e}))}else Xt(_e=>({..._e,[ke]:Se}))},me=be=>{const ke=["ut","lt","upphumid","humlolim"],Se={...be};return ke.forEach(_e=>{Se[_e]===""||Se[_e]==="-"?Se[_e]=0:Se[_e]=parseFloat(Se[_e].toString().replace(",","."))}),Se},ue=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onclick=${be=>{Yt&&be.target===be.currentTarget&&ct()}}
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
        <form onsubmit=${async be=>{be.preventDefault(),mt(!0);const ke=me(ht);try{if(!(await fetch("/api/sensor/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:_,pins:st,sensorNumber:$.s_number,...ke,s_number:$.s_number,t:$.t})})).ok)throw new Error("Network response was not ok");dt({...$,...ke,oneWireId:_,pins:st,s_number:$.s_number,t:$.t}),ct()}catch(Se){console.error("Error updating Sensor:",Se)}finally{mt(!1)}}}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                <tr class="bg-blue-100">
                  <td class="p-2 font-bold">Upper Temperature</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="ut"
                      value=${ht.ut}
                      oninput=${oe}
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
                      value=${ht.lt}
                      oninput=${oe}
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
                      value=${ht.action_ut}
                      oninput=${oe}
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
                      value=${ht.action_lt}
                      oninput=${oe}
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
                            value=${ht.upphumid}
                            oninput=${oe}
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
                            value=${ht.humlolim}
                            oninput=${oe}
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
                            value=${ht.actuphum}
                            oninput=${oe}
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
                            value=${ht.actlowhum}
                            oninput=${oe}
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
                      value=${ht.info}
                      oninput=${oe}
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
  `,xe=at(null);return lt(()=>{const be=document.createElement("div");return be.id="modal-portal-sensor",document.body.appendChild(be),xe.current=be,()=>{O(null,be),document.body.removeChild(be)}},[]),lt(()=>{xe.current&&O(ue,xe.current)}),null}function ModalOneWire({oneWire:$,onClose:_,onUpdate:st,refresh:ct,closeOnOverlayClick:dt=!0}){console.log("oneWire object:",$);const[k,pt]=ut({typsensor:$.typsensor,numdevices:$.numdevices}),[Yt,ht]=ut(!1),[Xt,Zt]=ut($.onoff||0),mt=ue=>{dt&&ue.target===ue.currentTarget&&_()},te=ue=>{const{name:xe,value:be}=ue.target;let ke={...k,[xe]:parseInt(be,10)};xe==="typsensor"&&(be==="0"?ke.numdevices=0:be==="2"&&(ke.numdevices=1)),pt(ke)},oe=ue=>{Zt(ue)},we=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onclick=${mt}
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
            disabled=${Yt}
          >
            Close
          </button>
        </div>
        <form onsubmit=${async ue=>{ue.preventDefault(),ht(!0);const xe={id:$.id,pin:$.pin,typsensor:k.typsensor,numdevices:k.numdevices,onoff:Xt};console.log("Sending data:",xe);try{if(!(await fetch("api/onewire/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(xe)})).ok)throw new Error("Network response was not ok");const ke={...$,...k,onoff:Xt};st(ke),_()}catch(be){console.error("Error updating OneWire:",be)}finally{ht(!1)}}}>
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
                      onchange=${te}
                      class="border rounded p-2 w-full"
                      disabled=${Yt}
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
                      oninput=${k.typsensor===1?te:void 0}
                      class="border rounded p-2 w-full ${k.typsensor!==1?"bg-gray-100":""}"
                      min="0"
                      max="10"
                      readonly=${k.typsensor!==1}
                      disabled=${Yt}
                    />
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="p-2 font-bold">On/Off</td>
                  <td class="p-2">
                    <${MyPolzunok}
                      value=${Xt}
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
              disabled=${Yt}
            >
              ${Yt?"Saving...":"Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,ye=at(null);return lt(()=>{const ue=document.createElement("div");return ue.id="modal-portal-onewire",document.body.appendChild(ue),ye.current=ue,()=>{O(null,ue),document.body.removeChild(ue)}},[]),lt(()=>{ye.current&&O(we,ye.current)}),null}function initGlobalTooltip$2(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,Yt=window.innerWidth,ht=dt.getBoundingClientRect();let Xt=ht.left+ht.width/2-k/2;Xt=Math.max(8,Math.min(Xt,Yt-k-8));let Zt=ht.top-pt-8;Zt<8&&(Zt=ht.bottom+8),$.style.left=Xt+"px",$.style.top=Zt+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabOneWire=()=>{const[$,_]=ut([]),[st,ct]=ut(null),[dt,k]=ut(!1),[pt,Yt]=ut(null),[ht,Xt]=ut(null),[Zt,mt]=ut("ru"),[te,oe]=ut(null);lt(()=>{initGlobalTooltip$2()},[]);const me=()=>{console.log("Calling initial refresh..."),fetch("/api/onewire/get").then(le=>le.json()).then(le=>{console.log("Initial data received:",le),mt(le.lang||"ru"),_(le.pins||[]),console.log("Initial OneWire state set:",le.pins),ct(null)}).catch(le=>{console.error("Error in refresh:",le),ct(le.message),_([])})},we=async()=>{try{const he=await(await fetch("/api/temp/get")).json();_(ve=>ve.map(re=>{if(!re.sensors||re.typsensor!==1&&re.typsensr!==1&&re.typsensor!==2&&re.typsensr!==2)return re;const Te=re.sensors.map(ee=>{var ie,vt;if(re.typsensor===1||re.typsensr===1){const ae=(ie=he.ds18b20)==null?void 0:ie.find(ne=>ne.addr===ee.s_number);if(ae)return{...ee,t:ae.temp}}else if(re.typsensor===2||re.typsensr===2){const ae=(vt=he.dht22)==null?void 0:vt.find(ne=>ne.id===re.id);if(ae)return{...ee,t:ae.temp,humidity:ae.humidity}}return ee});return{...re,sensors:Te}}))}catch(le){console.error("Error in updateSensorData:",le)}};lt(()=>{console.log("Setting up initial data and interval..."),me();const le=setInterval(we,1e3);return()=>{clearInterval(le)}},[]);const ye=()=>{k(!1),Yt(null),Xt(null)},ue=le=>{_(he=>he.map(ve=>{var re;if(ve.id===le.oneWireId){const Te=((re=ve.sensors)==null?void 0:re.map(ee=>ee.s_number===le.s_number?{...ee,...le}:ee))||[];return{...ve,sensors:Te}}return ve})),ye()},xe=le=>{Xt(le),k(!0)},be=le=>{_(he=>he.map(ve=>ve.id===le.id?{...ve,onoff:le.onoff}:ve))},ke=le=>{_(he=>he.map(ve=>ve.id===le.id?le:ve)),ye()};if(st)return Et`<div>Error fetching sensor data: ${st}</div>`;const Se=()=>({lang1Wire:Zt==="ru"?rulange1Wire:enlange1Wire}),_e=(le,he)=>{const ve=Se(),Te=(ve[le]&&ve[le][he]?ve[le][he]:"").split(" "),ee=[];for(let ie=0;ie<Te.length;ie+=15)ee.push(Te.slice(ie,ie+15).join(" "));return ee.join("<br>")},Ce=le=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${_e("lang1Wire",le.tooltipIndex)}
    >
      ${le.title}
    </th>
  `,de=({device:le,index:he})=>{const ve=le.pins||le.pin,re=le.typsensor||le.typsensr||0,Te=le.numdevices||le.numsens||0;return Et`
      <tr class="${he%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${le.id}</td>
        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ve}</td>
        <td class="px-6 py-4 text-sm text-slate-700 font-medium">${["None","DS18B20","DHT22"][re]}</td>
        <td class="px-6 py-4 text-sm text-slate-700 font-medium">${Te}</td>
        <td class="px-6 py-4">
          <${MyPolzunok}
            value=${le.onoff||0}
            onChange=${ee=>be({...le,onoff:ee})}
          />
        </td>
        <td class="px-6 py-4">
          <button
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap"
            onclick=${()=>xe(le)}
          >
            Edit
          </button>
        </td>
      </tr>
      ${re!==0&&Te>0?Et`
            <tr class="bg-white/40">
              <td colspan="6" class="p-4 md:p-6">
                <div class="w-full">
                  <${$e} d=${le} />
                </div>
              </td>
            </tr>
          `:""}
    `},$e=({d:le})=>{const he=le.typsensor||le.typsensr||0,ve=le.numdevices||le.numsens||0;if(he===0||ve===0)return Et`
        <div class="px-4 py-2 text-slate-500 font-medium">
          No connected sensors for this OneWire pin.
        </div>
      `;let re=le.sensors||[];const Te=(ee,ie)=>{const vt=he===2;return Et`
        <div class="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/60 mb-4 transition-all hover:shadow-xl">
          <div class="font-extrabold text-xl text-slate-700 mb-4 flex justify-between items-center border-b border-slate-200/60 pb-3">
            <span class="tracking-tight drop-shadow-sm">
              ${vt?"DHT22 Sensor":`DS18B20 Sensor (S/N: ${ee.s_number})`}
            </span>
            <a
              href="#"
              class="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors uppercase tracking-wider bg-white/50 hover:bg-white/80 px-4 py-1.5 rounded-lg shadow-sm"
              onclick=${ae=>{ae.preventDefault(),Yt({...ee,oneWireId:le.id,sensorType:he,pins:le.pins||le.pin}),k(!0)}}
            >
              Edit
            </a>
          </div>
          <table class="w-full text-sm text-slate-700">
            <tbody>
              <tr class="hover:bg-slate-100/50 transition-colors rounded-lg">
                <td class="font-semibold py-2 px-2 text-slate-800">Current Temperature:</td>
                <td class="font-mono text-cyan-700 font-bold py-2 px-2 text-right">${ee.t}°C</td>
              </tr>
              ${vt&&"humidity"in ee?Et`
                    <tr class="hover:bg-slate-100/50 transition-colors rounded-lg">
                      <td class="font-semibold py-2 px-2 text-slate-800">Current Humidity:</td>
                      <td class="font-mono text-teal-700 font-bold py-2 px-2 text-right">${ee.humidity}%</td>
                    </tr>
                  `:""}
              <tr class="hover:bg-slate-100/50 transition-colors rounded-lg border-t border-slate-100">
                <td class="font-medium py-2 px-2 text-slate-600">Upper Temp. Limit = ${ee.ut}°C</td>
                <td class="py-2 px-2 text-right">
                  <span class="px-2 py-1 bg-slate-200/70 rounded-md text-xs font-bold text-slate-600">Action: ${ee.action_ut}</span>
                </td>
              </tr>
              <tr class="hover:bg-slate-100/50 transition-colors rounded-lg">
                <td class="font-medium py-2 px-2 text-slate-600">Lower Temp. Limit = ${ee.lt}°C</td>
                <td class="py-2 px-2 text-right">
                  <span class="px-2 py-1 bg-slate-200/70 rounded-md text-xs font-bold text-slate-600">Action: ${ee.action_lt}</span>
                </td>
              </tr>
              ${vt&&"upphumid"in ee?Et`
                    <tr class="hover:bg-slate-100/50 transition-colors rounded-lg border-t border-slate-100">
                      <td class="font-medium py-2 px-2 text-slate-600">Upper Humidity Limit = ${ee.upphumid}%</td>
                      <td class="py-2 px-2 text-right">
                        <span class="px-2 py-1 bg-slate-200/70 rounded-md text-xs font-bold text-slate-600">Action: ${ee.actuphum}</span>
                      </td>
                    </tr>
                    <tr class="hover:bg-slate-100/50 transition-colors rounded-lg">
                      <td class="font-medium py-2 px-2 text-slate-600">Lower Humidity Limit = ${ee.humlolim}%</td>
                      <td class="py-2 px-2 text-right">
                        <span class="px-2 py-1 bg-slate-200/70 rounded-md text-xs font-bold text-slate-600">Action: ${ee.actlowhum}</span>
                      </td>
                    </tr>
                  `:""}
              <tr class="hover:bg-slate-100/50 transition-colors rounded-lg border-t border-slate-200/60 mt-2">
                <td class="font-semibold py-3 px-2 text-slate-800">Info:</td>
                <td class="text-slate-600 py-3 px-2 text-right italic">${ee.info}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `};return re.length>0&&Object.keys(re[0]).length>0?Et`<div class="space-y-4 w-full">${re.map((ee,ie)=>Te(ee))}</div>`:Et`
          <div class="px-4 py-4 text-slate-500 font-medium bg-white/50 backdrop-blur-sm rounded-xl border border-white/40 text-center">
            No sensor data available for this OneWire pin.
          </div>
        `};return Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="flex-grow flex flex-col justify-center items-center w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          OneWire(s) pin(s)
        </div>
        <div class="justify-center w-full">
          <div class="mb-4">
            <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${Ce} title="ID" tooltipIndex=${1} />
                      <${Ce} title="Pin" tooltipIndex=${2} />
                      <${Ce} title="Selected sensor" tooltipIndex=${3} />
                      <${Ce} title="Count of sensors" tooltipIndex=${4} />
                      <${Ce} title="On/Off" tooltipIndex=${5} />
                      <${Ce} title="Actions" tooltipIndex=${6} />
                    </tr>
                  </thead>
                  <tbody id="tab1" class="divide-y divide-white/40">
                    ${$.length>0?$.map((le,he)=>Et`<${de} device=${le} index=${he} key=${le.id} />`):Et`
                          <tr>
                            <td colspan="6" class="px-4 py-2">
                              ${st?`Error fetching sensor data: ${st}`:"No available pins configured as OneWire!"}
                            </td>
                          </tr>
                        `}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    ${dt&&(pt?Et`
            <${ModalEditSensor}
              typsensor=${pt}
              oneWireId=${pt.oneWireId}
              pins=${pt.pins}
              onClose=${ye}
              onUpdate=${ue}
              sensorType=${pt.sensorType}
              closeOnOverlayClick=${!0}
              refresh=${me}
            />
          `:Et`
            <${ModalOneWire}
              oneWire=${ht}
              onClose=${ye}
              onUpdate=${ke}
              closeOnOverlayClick=${!0}
              refresh=${me}
            />
          `)}
  `};function ModalSIM800L({hideModal:$,title:_,selectedGps:st,onSave:ct}){const[dt,k]=ut((st==null?void 0:st.tel)||""),[pt,Yt]=ut((st==null?void 0:st.info)||""),[ht,Xt]=ut((st==null?void 0:st.onoff)===1),[Zt,mt]=ut(!0),te=ue=>/^\+\d{11,20}$/.test(ue),we=Et`
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

          <form onSubmit=${ue=>{if(ue.preventDefault(),!Zt)return;const xe={tel:dt,info:pt,onoff:ht?1:0};console.log("Сохраняемые данные:",xe),fetch("/api/sim800l/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(xe)}).then(be=>be.json()).then(be=>{typeof ct=="function"&&ct(xe),$()}).catch(be=>{console.error("Error:",be)})}}>
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
                        onInput=${ue=>{const xe=ue.target.value;k(xe),mt(te(xe))}}
                        class=${`border rounded p-2 w-full ${!Zt&&dt!==""?"border-red-500":""}`}
                        placeholder="+XXXXXXXXXXX"
                      />
                      ${!Zt&&dt!==""?Et`
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
                        onInput=${ue=>Yt(ue.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${MyPolzunok} value=${ht} onChange=${Xt} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                disabled=${!Zt||dt===""}
                class=${`font-bold py-2 px-4 rounded ${Zt&&dt!==""?"bg-blue-500 hover:bg-blue-700 text-white":"bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,ye=at(null);return lt(()=>{const ue=document.createElement("div");return ue.id="modal-portal",document.body.appendChild(ue),ye.current=ue,()=>{O(null,ue),document.body.removeChild(ue)}},[]),lt(()=>{ye.current&&O(we,ye.current)}),null}const ModalSecurity=({modalType:$,page:_,hideModal:st,title:ct,selectedSecurity:dt,onSecurityChange:k,SliderComponent:pt=MyPolzunok})=>{const[Yt,ht]=ut((dt==null?void 0:dt.info)||""),[Xt,Zt]=ut((dt==null?void 0:dt.onoff)||0),[mt,te]=ut((dt==null?void 0:dt.ptype)||0),[oe,me]=ut((dt==null?void 0:dt.send_sms)||""),[we,ye]=ut((dt==null?void 0:dt.action)||""),[ue,xe]=ut([]),[be,ke]=ut({send_sms:null,action:null}),[Se,_e]=ut(null),Ce=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,de=(ie,vt)=>!vt||vt.trim()===""||vt.toLowerCase()==="none"?null:ie==="action"?Ce.test(vt)?null:'Incorrect format. Use "None" or "pin:value" format.':vt.length>100?"Text should not exceed 100 characters":null,$e=(ie,vt)=>{const ae=de(ie,vt);switch(ke(ne=>({...ne,[ie]:ae})),ie){case"send_sms":me(vt);break;case"action":ye(vt);break}};lt(()=>{fetch("/api/monitoring/get").then(ie=>ie.json()).then(ie=>{Array.isArray(ie)?xe(ie.filter(vt=>vt.topin===2)):xe([])}).catch(ie=>{console.error("Error fetching pin config:",ie),xe([])})},[]);const le=ie=>{if(ie.preventDefault(),Object.values(be).some(ae=>ae!==null)){_e("Please correct the errors before submitting.");return}const vt={...dt,info:Yt,send_sms:oe||"NO",action:we||"None",onoff:Xt,ptype:mt};fetch("/api/monitoring/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(vt)}).then(ae=>{if(!ae.ok)throw new Error("Network response was not ok");return ae.json()}).then(ae=>{if(ae.error)throw new Error(ae.error);k(vt),st()}).catch(ae=>{console.error("Error:",ae),_e("Failed to save changes. Please try again.")})},he=()=>{te(0),me(""),ye(""),ht(""),Zt(0),ke({send_sms:null,action:null})},Te=Et`
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
    <form onSubmit=${le}>
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
                  value=${ue.some(ie=>ie.pins===(dt==null?void 0:dt.setrpins))?dt==null?void 0:dt.setrpins:""}
                  onChange=${ie=>k({...dt,setrpins:ie.target.value})}
                  class="border rounded p-2 w-full"
                >
                  <option value="">Select a connection</option>
                  ${ue.map(ie=>Et`
                      <option value=${ie.pins}>
                        ${ie.pins} (ID: ${ie.id})
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
    <form onSubmit=${le}>
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
                  value=${mt}
                  onChange=${ie=>te(parseInt(ie.target.value))}
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
                  value=${we}
                  onInput=${ie=>$e("action",ie.target.value)}
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
                  value=${oe}
                  onchange=${ie=>$e("send_sms",ie.target.value)}
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
                  value=${Yt}
                  onInput=${ie=>ht(ie.target.value)}
                  class="border rounded p-2 w-full"
                />
              </td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">On/Off</td>
              <td class="p-2">
                <${pt} value=${Xt} onChange=${Zt} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-between mt-4">
        <button
          type="button"
          onClick=${he}
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
  `,ee=at(null);return lt(()=>{const ie=document.createElement("div");return ie.id="modal-portal",document.body.appendChild(ie),ee.current=ie,()=>{O(null,ie),document.body.removeChild(ie)}},[]),lt(()=>{ee.current&&O(Te,ee.current)}),null};function initGlobalTooltip$1(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,Yt=window.innerWidth,ht=dt.getBoundingClientRect();let Xt=ht.left+ht.width/2-k/2;Xt=Math.max(8,Math.min(Xt,Yt-k-8));let Zt=ht.top-pt-8;Zt<8&&(Zt=ht.bottom+8),$.style.left=Xt+"px",$.style.top=Zt+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabSecurity=()=>{const[$,_]=ut({lang:"ru",sim800l:0,onoff:0,tel:"",info:""}),[st,ct]=ut(!1),[dt,k]=ut(!1),[pt,Yt]=ut([]),[ht,Xt]=ut(!1),[Zt,mt]=ut("ru"),[te,oe]=ut(!1),[me,we]=ut(""),[ye,ue]=ut(null),[xe,be]=ut(!1),[ke,Se]=ut("connected"),[_e,Ce]=ut(0);lt(()=>{initGlobalTooltip$1()},[]);const de=()=>Zt==="ru"?ruLangsecurity:enLangsecurity,$e=()=>Zt==="ru"?ruLangsecuritypins:enLangsecuritypins,le=(ce,se)=>{const $t=(ce&&ce[se]?ce[se]:"").split(" "),ge=[];for(let pe=0;pe<$t.length;pe+=15)ge.push($t.slice(pe,pe+15).join(" "));return ge.join("<br>")},he=({title:ce,langArr:se,tooltipIndex:Ie})=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${le(se,Ie)}
    >
      ${ce}
    </th>
  `,ve=(ce,se)=>{let Ie;return(...$t)=>{clearTimeout(Ie),Ie=setTimeout(()=>ce(...$t),se)}},re=async(ce,se={},Ie=3)=>{try{const $t=await fetch(ce,se);if(!$t.ok)throw new Error("Network response was not ok");return Se("connected"),$t}catch($t){if(Se("error"),Ie>0)return await new Promise(ge=>setTimeout(ge,1e3)),re(ce,se,Ie-1);throw Se("disconnected"),$t}},Te={ru:Et`
      <div className="space-y-6 max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Модуль SIM800L📱</h2>
          <p className="text-gray-600 mb-4">
            Модуль позволяет управлять "Заготовкой" при помощи мобильной связи - интернет не нужен!
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Возможности модуля:</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>Принимает звонки на номер телефона (указывается в разделе "Mobile phone")</li>
              <li>Держит вас в курсе происходящего при помощи SMS-уведомлений</li>
              <li>Включается и отключается при помощи ползунка 'OnOFF'</li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-green-50 rounded">
              <p className="font-medium">✅ Когда ползунок 'OnOFF' ВКЛючен:</p>
              <p>SMS-уведомления работают по вашим настройкам из таблицы 'Security Pins'</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">⭕ Когда ползунок 'OnOFF' ОТКлючен:</p>
              <p>Все SMS-уведомления отключены, настройки из таблицы 'Security Pins' не учитываются</p>
            </div>
          </div>
          <div className="mt-6 bg-red-50 p-4 rounded-lg">
            <h3 className="text-red-600 font-semibold mb-2">📍 ВАЖНО!</h3>
            <ul className="space-y-2 list-disc pl-5 text-red-700">
              <li>Установить SIM-карту в модуль SIM800L</li>
              <li>Включить SIM800L → Дождаться подключения к GSM → Включить STM32</li>
            </ul>
          </div>
        </div>
      </div>
    `,en:Et`
      <div className="space-y-6 max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">SIM800L Module📱</h2>
          <p className="text-gray-600 mb-4">
            The module controls your "Template" using mobile network - no internet required!
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Module capabilities:</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>Receives calls to the phone number (specified in the "Mobile phone" section)</li>
              <li>Keeps you updated using SMS notifications</li>
              <li>Turns ON and OFF using the 'OnOFF' slider</li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-green-50 rounded">
              <p className="font-medium">✅ When 'OnOFF' slider is ON:</p>
              <p>SMS notifications work according to your settings in the 'Security Pins' table</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">⭕ When 'OnOFF' slider is OFF:</p>
              <p>All SMS notifications are disabled, settings in the 'Security Pins' table are ignored</p>
            </div>
          </div>
          <div className="mt-6 bg-red-50 p-4 rounded-lg">
            <h3 className="text-red-600 font-semibold mb-2">📍 IMPORTANT!</h3>
            <ul className="space-y-2 list-disc pl-5 text-red-700">
              <li>Insert SIM card into the SIM800L module</li>
              <li>Turn ON SIM800L → Wait for GSM connection → Turn ON STM32</li>
            </ul>
          </div>
        </div>
      </div>
    `},ee={ru:Et`
      <div className="space-y-6 max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Подключение датчиков 🔌</h2>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3">Нормально открытый геркон <span className="text-blue-500 font-bold">(Normal open)</span></h3>
            <ul className="space-y-2">
              <li>• Контакты разомкнуты без магнитного поля</li>
              <li>• Контакты замыкаются при поднесении магнита</li>
              <li>• Подключение: один провод к пину STM32, второй к <span className="text-red-500 font-bold">+3.3V</span></li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3">Нормально закрытый геркон <span className="text-blue-500 font-bold">(Normal close)</span></h3>
            <ul className="space-y-2">
              <li>• Контакты замкнуты без магнитного поля</li>
              <li>• Контакты размыкаются при поднесении магнита</li>
              <li>• Подключение: один провод к пину STM32, второй к <span className="text-red-500 font-bold">+3.3V</span></li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3">Датчики движения <span className="text-blue-500 font-bold">(PIR)</span></h3>
            <ul className="space-y-2">
              <li>• В покое: выход LOW (логический 0)</li>
              <li>• При движении: выход HIGH (логическая 1, максимум <span className="text-red-500 font-bold">+3.3V</span>)</li>
            </ul>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">Настройка SMS-уведомлений 📱</h2>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded">
                <p className="font-medium">✅ Значение <span className="text-blue-500 font-bold">'YES'</span> в столбце "Send SMS":</p>
                <p>SMS-уведомление будет отправлено</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium">⭕ Значение <span className="text-blue-500 font-bold">'NO'</span> в столбце "Send SMS":</p>
                <p>SMS-уведомление не будет отправлено</p>
              </div>
            </div>
            <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">📍 Примечание:</h3>
              <ul className="space-y-2">
                <li>• Действия в столбце 'Action' зависят от ползунка 'OnOff' выбранного пина.</li>
                <li>• Данная страница отправляет изменения по MQTT на топик: <span className="text-blue-500 font-bold">Swarm/security/</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `,en:Et`
      <div className="space-y-6 max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Sensor Connection 🔌</h2>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3">Normally Open Reed Switch <span className="text-blue-500 font-bold">(Normal open)</span></h3>
            <ul className="space-y-2">
              <li>• Contacts are open without magnetic field</li>
              <li>• Contacts close when magnet is nearby</li>
              <li>• Connection: one wire to STM32 pin, another to <span className="text-red-500 font-bold">+3.3V</span></li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3">Normally Closed Reed Switch <span className="text-blue-500 font-bold">(Normal close)</span></h3>
            <ul className="space-y-2">
              <li>• Contacts are closed without magnetic field</li>
              <li>• Contacts open when magnet is nearby</li>
              <li>• Connection: one wire to STM32 pin, another to <span className="text-red-500 font-bold">+3.3V</span></li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3">Motion Sensors <span className="text-blue-500 font-bold">(PIR)</span></h3>
            <ul className="space-y-2">
              <li>• At rest: output LOW (logical 0)</li>
              <li>• When motion detected: output HIGH (logical 1, max <span className="text-red-500 font-bold">+3.3V</span>)</li>
            </ul>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">SMS Notification Settings 📱</h2>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded">
                <p className="font-medium">✅ Value <span className="text-blue-500 font-bold">'YES'</span> in "Send SMS" column:</p>
                <p>SMS notification will be sent</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium">⭕ Value <span className="text-blue-500 font-bold">'NO'</span> in "Send SMS" column:</p>
                <p>SMS notification will not be sent</p>
              </div>
            </div>
            <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">📍 Note:</h3>
              <ul className="space-y-2">
                <li>• Actions in the 'Action' column depend on the 'OnOff' slider of the selected pin.</li>
                <li>• This page sends changes via MQTT to topic: <span className="text-blue-500 font-bold">Swarm/security/</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `},ie=async()=>{if(!(xe||Date.now()-_e<500))try{const se=await(await re("/api/sim800l/get")).json();_(se)}catch(ce){console.error("Error fetching SIM800L data:",ce)}},vt=async()=>{if(!(xe||Date.now()-_e<500))try{const se=await(await re("/api/monitoring/get")).json();Yt(se.pins||[])}catch(ce){console.error("Error fetching monitoring data:",ce)}};lt(()=>{fetch("/api/monitoring/get").then(se=>se.json()).then(se=>mt(se.lang||"ru")).catch(se=>console.error("Error fetching initial language:",se));const ce=setInterval(()=>{ie(),vt()},500);return()=>clearInterval(ce)},[]);const ae=ve(async ce=>{be(!0);try{await re("/api/sim800l/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ce)}),_(ce),Ce(Date.now())}catch(se){console.error("Error updating SIM800L:",se)}finally{be(!1)}},300),ne=async ce=>{try{const se=await fetch("/api/monitoring/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ce)});if(!se.ok)throw new Error(`HTTP error! status: ${se.status}`);Yt(Ie=>Ie.map($t=>$t.id===ce.id?ce:$t)),await vt(),oe(!1)}catch(se){console.error("Error updating security:",se),alert("Failed to save changes. Please try again."),await vt()}},fe=ce=>{Yt(se=>se.map(Ie=>Ie.id===ce.id?{...Ie,...ce}:Ie)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ce.id,onoff:ce.onoff})}).then(se=>se.json()).then(se=>console.log("Response from /api/onoff/set:",se)).catch(se=>console.error("Error calling /api/onoff/set:",se)),Oe()},Ee=(ce,se)=>{we(ce),ue(se),oe(!0)},Oe=()=>{oe(!1),we(""),ue(null)};return Et`
    <div class="flex flex-col items-center w-full p-4">
      ${ke!=="connected"&&Et`
        <div class=${`w-full p-2 mb-4 text-white text-center rounded-xl shadow-md backdrop-blur-md 
          ${ke==="error"?"bg-yellow-500/80 border border-yellow-400/50":"bg-red-500/80 border border-red-400/50"}`}>
          ${ke==="error"?"Connection problems. Retrying...":"Connection lost. Check your internet connection."}
        </div>
      `}

      <div class="flex flex-col items-center w-full p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 relative overflow-hidden">
        <!-- Decorative background glow -->
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <!-- ================================================================
             SIM800L таблица
        ================================================================ -->
        <div class="w-full mb-10">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">SIM800L Settings</h2>

          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-teal-600/10 border-b border-teal-600/20">
                  <${he} title="RXD Pin"      langArr=${de()} tooltipIndex=${1} />
                  <${he} title="TXD Pin"      langArr=${de()} tooltipIndex=${2} />
                  <${he} title="Phone Number" langArr=${de()} tooltipIndex=${3} />
                  <${he} title="Info"         langArr=${de()} tooltipIndex=${4} />
                  <${he} title="OnOff"        langArr=${de()} tooltipIndex=${5} />
                  <${he} title="Action"       langArr=${de()} tooltipIndex=${6} />
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                <tr class="bg-white/80 hover:bg-slate-200/80 transition-colors">
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                    ${$.sim800l===1?"PA3(1)":"Not configured"}
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                    ${$.sim800l===1?"PD5(35)":"Not configured"}
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.tel||"Not set"}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$.info||"No info"}</td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                    <${MyPolzunok}
                      value=${$.onoff}
                      onChange=${ce=>ae({...$,onoff:ce})}
                    />
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                    <button
                      onClick=${()=>ct(!0)}
                      class="text-teal-600 hover:text-cyan-600 font-bold transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex justify-end w-full">
            <button
              onClick=${()=>k(!dt)}
              class="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white transition-all duration-300 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl hover:from-teal-400 hover:to-cyan-500 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0"
            >
              ${dt?"Hide Help":"Show Help"}
            </button>
          </div>
          ${dt&&Te[Zt]}
        </div>

        <!-- ================================================================
             Security Pins таблица
        ================================================================ -->
        <div class="w-full">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">Security Pins</h2>

          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-teal-600/10 border-b border-teal-600/20">
                  <${he} title="ID"             langArr=${$e()} tooltipIndex=${1} />
                  <${he} title="Pin"            langArr=${$e()} tooltipIndex=${2} />
                  <${he} title="Type of sensor" langArr=${$e()} tooltipIndex=${3} />
                  <${he} title="Action"         langArr=${$e()} tooltipIndex=${4} />
                  <${he} title="Send SMS"       langArr=${$e()} tooltipIndex=${5} />
                  <${he} title="INFO"           langArr=${$e()} tooltipIndex=${6} />
                  <${he} title="On/Off"         langArr=${$e()} tooltipIndex=${7} />
                  <${he} title="Edit Pin"       langArr=${$e()} tooltipIndex=${8} />
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                ${pt.length>0?pt.map((ce,se)=>Et`
                      <tr class="${se%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ce.id}</td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ce.pins}</td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                          ${["PIR","Normal open","Normal close"][ce.ptype]}
                        </td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ce.action}</td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ce.send_sms}</td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ce.info}</td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                          <${MyPolzunok}
                            value=${ce.onoff}
                            onChange=${Ie=>fe({...ce,onoff:Ie})}
                          />
                        </td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                          <button
                            onClick=${()=>Ee("edit",ce)}
                            class="text-teal-600 hover:text-cyan-600 font-bold transition-colors"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    `):Et`
                      <tr>
                        <td colspan="8" class="px-6 py-4 text-center text-sm text-slate-600 font-medium">
                          No monitoring data available
                        </td>
                      </tr>
                    `}
              </tbody>
            </table>
          </div>

          <div class="flex justify-end mt-4">
            <button
              onClick=${()=>Xt(!ht)}
              class="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white transition-all duration-300 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl hover:from-teal-400 hover:to-cyan-500 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0"
            >
              ${ht?"Hide Help":"Show Help"}
            </button>
          </div>
          ${ht&&ee[Zt]}
        </div>

        ${st&&Et`
          <${ModalSIM800L}
            hideModal=${()=>ct(!1)}
            title="Edit SIM800L Settings"
            selectedGps=${$}
            onSave=${ae}
          />
        `}

        ${te&&Et`
          <${ModalSecurity}
            modalType=${me}
            page="TabSecurity"
            hideModal=${()=>oe(!1)}
            title="Edit Security Settings"
            selectedSecurity=${ye}
            onSecurityChange=${ne}
          />
        `}
      </div>
    </div>
  `};function initGlobalTooltip(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"320px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,Yt=window.innerWidth,ht=dt.getBoundingClientRect();let Xt=ht.left+ht.width/2-k/2;Xt=Math.max(8,Math.min(Xt,Yt-k-8));let Zt=ht.top-pt-8;Zt<8&&(Zt=ht.bottom+8),$.style.left=Xt+"px",$.style.top=Zt+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const SETTINGS_TIP_IDX={Login:1,Password:2,"Time zone UTC":3,"IP address":4,"Subnet mask":5,"Default gateway":6,Token:7,Host:8,Port:9,Client:10,User:11,"Password (MQTT)":12,"TX topic":13,"RX topic":14,"HTTPS domain":15,"Private Key":16,"Public Key":17,Longitude:18,Latitude:19,Sunrise:20,Sunset:21,"Day Length":22,"Next full moon":23,Date:24,Time:25};function Settings({}){const[$,_]=ut({}),[st,ct]=ut(null),[dt,k]=ut(null),[pt,Yt]=ut({}),ht=at(null),[Xt,Zt]=ut(null),[mt,te]=ut(null),[oe,me]=ut(!1),[we,ye]=ut(!1),[ue,xe]=ut(!1),[be,ke]=ut(!1),[Se,_e]=ut(!1),[Ce,de]=ut(!0);lt(()=>{initGlobalTooltip()},[]);const $e=$t=>{const pe=($.lang||"ru")==="ru"?rulangsettings:enlangsettings,Pe=SETTINGS_TIP_IDX[$t];if(!Pe||!pe||!pe[Pe])return"";const Ne=pe[Pe].split(" "),Me=[];for(let Le=0;Le<Ne.length;Le+=12)Me.push(Ne.slice(Le,Le+12).join(" "));return Me.join("<br>")},le=({label:$t,tipLabel:ge,index:pe,children:Pe})=>{const Ne=$e(ge||$t),Me=pe%2===0?"bg-white/80":"bg-sky-200/40";return Et`
      <div class="flex flex-col md:flex-row md:items-center px-6 py-2 transition-colors ${Me} hover:bg-slate-200/80 gap-2 md:gap-0">
        <div
          class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2 border-r border-slate-500 py-2 cursor-help"
          data-tip=${Ne}
        >
          ${$t}
        </div>
        <div class="w-full md:w-2/3 pl-4">
          ${Pe}
        </div>
      </div>
    `},he=[{value:"en",label:"English"},{value:"ru",label:"Russian"}],ve=[[-12,"(GMT -12:00) Eniwetok, Kwajalein"],[-11,"(GMT -11:00) Midway Island, Samoa"],[-10,"(GMT -10:00) Hawaii"],[-9,"(GMT -9:00) Alaska"],[-8,"(GMT -8:00) Pacific Time (US & Canada)"],[-7,"(GMT -7:00) Mountain Time (US & Canada)"],[-6,"(GMT -6:00) Central Time (US & Canada), Mexico City"],[-5,"(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima"],[-4,"(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz"],[-3.3,"(GMT -3:30) Newfoundland"],[-3,"(GMT -3:00) Brazil, Buenos Aires, Georgetown"],[-2,"(GMT -2:00) Mid-Atlantic"],[-1,"(GMT -1:00) Azores, Cape Verde Islands"],[0,"(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca"],[1,"(GMT +1:00) Brussels, Copenhagen, Madrid, Paris"],[2,"(GMT +2:00) Kaliningrad, South Africa"],[3,"(GMT +3:00) Moscow, St. Petersburg, Baghdad, Riyadh"],[3.3,"(GMT +3:30) Tehran"],[4,"(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi"],[4.3,"(GMT +4:30) Kabul"],[5,"(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"],[5.3,"(GMT +5:30) Bombay, Calcutta, Madras, New Delhi"],[5.45,"(GMT +5:45) Kathmandu"],[6,"(GMT +6:00) Almaty, Dhaka, Colombo"],[7,"(GMT +7:00) Bangkok, Hanoi, Jakarta"],[8,"(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"],[9,"(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"],[9.3,"(GMT +9:30) Adelaide, Darwin"],[10,"(GMT +10:00) Eastern Australia, Guam, Vladivostok"],[11,"(GMT +11:00) Magadan, Solomon Islands, New Caledonia"],[12,"(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"]],re=/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,Te=/^(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)$/,ee=$t=>{if(!$t)return{date:"",time:""};const ge=$t.match(/d:(\d{1,2}\.\d{1,2}\.\d{2})/),pe=$t.match(/t:(\d{2}:\d{2}:\d{2})/);return{date:ge?ge[1]:"",time:pe?pe[1]:""}},ie=$t=>{if(!/^\d{1,2}\.\d{1,2}\.\d{2}$/.test($t))return!1;const[pe,Pe,Ne]=$t.split(".").map(Number);if(Pe<1||Pe>12||pe<1||pe>31||Ne<0||Ne>99)return!1;const Me=new Date().getFullYear()%100;if(Ne>Me+5)return!1;const Le=new Date(2e3+Ne,Pe,0).getDate();return!(pe>Le)},vt=$t=>/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test($t),ae=($t,ge)=>{const pe=Object.values(ge).some(Ne=>Ne!==null),Pe=$t.usehttps?$t.domain&&$t.domain.trim()!=="":!0;return!(pe||!Pe)},ne=($t,ge)=>{Zt({message:$t,type:ge}),setTimeout(()=>{Zt(null)},3e3)},fe=$t=>{te($t),setTimeout(()=>{te(null)},3e3)},Ee=($t,ge)=>{let pe=null;if(!$.usehttps&&["domain","tls_key","tls_cert","tls_ca","telegram_token"].includes($t))return null;if(!ge&&["ip_addr","gateway","mqtt_hst","sb_mask","offdate","offtime","domain"].includes($t))return"Поле не может быть пустым";switch($t){case"ip_addr":case"gateway":case"mqtt_hst":re.test(ge)||(pe="Неверный IP-адрес");break;case"sb_mask":Te.test(ge)||(pe="Неверная маска подсети");break;case"offdate":ie(ge)||(pe="Неверный формат даты (д.м.гг)");break;case"offtime":vt(ge)||(pe="Неверный формат времени (чч:мм:сс)");break;case"domain":ge.length>50?pe="Домен не должен превышать 50 символов":ge.match(/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/)||(pe="Неверный формат домена");break;case"tls_key":ge&&ge.trim()!==""&&(ge.length>512?pe="Private Key не должен превышать 512 символов":(!ge.includes("BEGIN EC PRIVATE KEY")||!ge.includes("END EC PRIVATE KEY"))&&(pe="Неверный формат Private Key"));break;case"tls_cert":ge&&ge.trim()!==""&&(ge.length>1024?pe="Public Key не должен превышать 1024 символов":(!ge.includes("BEGIN CERTIFICATE")||!ge.includes("END CERTIFICATE"))&&(pe="Неверный формат Public Key"));break;case"tls_ca":ge&&ge.trim()!==""&&(ge.length>1024?pe="Secret Key не должен превышать 1024 символов":(!ge.includes("BEGIN CERTIFICATE")||!ge.includes("END CERTIFICATE"))&&(pe="Неверный формат Secret Key"));break}return pe},Oe=$t=>{$t.preventDefault();const ge=new FormData(ht.current);let pe={...$};for(const[Pe,Ne]of ge.entries())["lon_de","lat_de","timezone","mqtt_prt"].includes(Pe)?pe[Pe]=Ne===""||Ne===null?0:Number(Ne):pe[Pe]=Ne;pe.usehttps||["tls_ca","tls_key","tls_cert","telegram_token","domain"].forEach(Pe=>delete pe[Pe]),pe.offdate&&pe.offtime?pe.offldt=`d:${pe.offdate} t:${pe.offtime}`:delete pe.offldt,["lon_de","lat_de","timezone","mqtt_prt"].forEach(Pe=>{(pe[Pe]===null||pe[Pe]==="")&&(pe[Pe]=0)}),pe.onsunrise=pe.onsunrise?1:0,pe.onsunset=pe.onsunset?1:0,pe.check_ip=pe.check_ip?1:0,pe.check_mqtt=pe.check_mqtt?1:0,pe.usehttps=pe.usehttps?1:0,fetch("/api/mysett/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(pe)}).then(Pe=>{if(!Pe.ok)throw new Error("Ошибка сети");return Pe.json()}).then(Pe=>{k("success"),ct(Pe),ne("Данные успешно сохранены","success"),fe("Данные успешно сохранены")}).catch(Pe=>{k("error"),ct(Pe),ne("Ошибка при сохранении данных","error"),fe("Ошибка при сохранении данных")})},ce=($t,ge)=>{let pe=null;$t==="offdate"?pe=ie(ge)?null:"Неверный формат даты (д.м.гг)":$t==="offtime"?pe=vt(ge)?null:"Неверный формат времени (чч:мм:сс)":pe=Ee($t,ge),Yt(Ne=>{const Me={...Ne,[$t]:pe},Le=["tls_key","tls_cert","tls_ca"],je=Object.keys(Me).filter(Ae=>!Le.includes(Ae)&&Ae!=="telegram_token").some(Ae=>Me[Ae]!==null);return me(je||!$.usehttps&&Le.some(Ae=>$[Ae])),Me});let Pe=ge;["lon_de","lat_de","timezone","mqtt_prt"].includes($t)?Pe=ge===""||ge===null?0:Number(ge):["onsunrise","onsunset","check_ip","check_mqtt","usehttps"].includes($t)&&(Pe=ge?1:0),_(Ne=>({...Ne,[$t]:Pe})),$t==="usehttps"&&(Yt({}),me(!1))},se=()=>fetch("/api/mysett/get").then($t=>$t.json()).then($t=>{if($t.offldt){const{date:ge,time:pe}=ee($t.offldt);$t.offdate=ge,$t.offtime=pe}_($t)}).catch($t=>{console.error("Error fetching settings:",$t),ne("Ошибка при загрузке настроек","error")});if(lt(()=>{se().then(()=>{$!=null&&$.tls_key&&ye(!0),$!=null&&$.tls_cert&&xe(!0),$!=null&&$.tls_ca&&ke(!0),$!=null&&$.telegram_token&&_e(!0),de(!1)})},[]),lt(()=>{me(!ae($,pt))},[$,pt]),Ce)return Et`<div>Loading...</div>`;if(!$)return"";const Ie=($t="")=>Et`
    <button
      type="submit"
      class=${`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 ${oe?"opacity-50 cursor-not-allowed bg-slate-400":"bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500"} ${$t}`}
      disabled=${oe}
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
        <div class="w-full mb-6 overflow-hidden rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
          <div class="bg-teal-600/10 border-b border-slate-500 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 class="text-3xl font-extrabold text-slate-700 tracking-wide drop-shadow-sm uppercase">Global Settings</h2>
            <select
              value=${$.lang}
              onChange=${$t=>ce("lang",$t.target.value)}
              class="px-3 py-1.5 bg-white/90 text-slate-800 rounded-lg text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
            >
              ${he.map($t=>Et`<option value=${$t.value}>${$t.label}</option>`)}
            </select>
          </div>
        </div>

        ${mt&&Et`
          <div class="w-full max-w-4xl bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center mb-6 border border-green-400/50 backdrop-blur-md">
            ${mt}
          </div>
        `}

        <form ref=${ht} onSubmit=${Oe} class="w-full max-w-4xl flex flex-col gap-6 relative">

          <div class="flex justify-end w-full">${Ie()}</div>

          <!-- ============================================================
               User data
          ============================================================ -->
          <div class="w-full border border-slate-500 bg-white/30 backdrop-blur-sm">
            <div class="bg-teal-600/10 border-b border-slate-500 px-6 py-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm">User data</h3>
            </div>
            <div class="flex flex-col divide-y divide-slate-500">
              ${[{label:"Login",key:"adm_name",type:"text"},{label:"Password",key:"adm_pswd",type:"password"},{label:"Time zone UTC",key:"timezone",type:"select",options:ve}].map(($t,ge)=>Et`
                <${le} label=${$t.label} index=${ge}>
                  <${pageSetting}
                    value=${$[$t.key]}
                    setfn=${pe=>ce($t.key,pe)}
                    type=${$t.type}
                    options=${$t.options}
                    class=${`w-full px-3 py-2 bg-white/50 border ${pt[$t.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    error=${pt[$t.key]}
                  />
                <//>
              `)}
            </div>
          </div>

          <!-- ============================================================
               Network
          ============================================================ -->
          <div class="w-full border border-slate-500 bg-white/30 backdrop-blur-sm">
            <div class="bg-teal-600/10 border-b border-slate-500 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm w-full sm:w-auto text-center sm:text-left">Network</h3>
              <div class="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
                <span class="text-slate-600 font-medium drop-shadow-sm tracking-wide text-lg">${$.check_ip?"DHCP":"Static IP"}</span>
                <${MyPolzunok} value=${$.check_ip} onChange=${$t=>ce("check_ip",$t)} />
              </div>
            </div>
            ${$.check_ip?null:Et`
              <div class="flex flex-col divide-y divide-slate-500">
                ${[{label:"IP address",key:"ip_addr",type:"text"},{label:"Subnet mask",key:"sb_mask",type:"text"},{label:"Default gateway",key:"gateway",type:"text"}].map(($t,ge)=>Et`
                  <${le} label=${$t.label} index=${ge}>
                    <${pageSetting}
                      value=${$[$t.key]}
                      setfn=${pe=>ce($t.key,pe)}
                      type=${$t.type}
                      class=${`w-full px-3 py-2 bg-white/50 border ${pt[$t.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      error=${pt[$t.key]}
                    />
                  <//>
                `)}
              </div>
            `}
          </div>

          <!-- ============================================================
               API Settings
          ============================================================ -->
          <div class="w-full border border-slate-500 bg-white/30 backdrop-blur-sm">
            <div class="bg-teal-600/10 border-b border-slate-500 px-6 py-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm">API Settings</h3>
            </div>
            <div class="flex flex-col divide-y divide-slate-500">
              <${le} label="Token" index=${0}>
                <${pageSetting}
                  value=${$.token}
                  setfn=${$t=>ce("token",$t)}
                  type="text"
                  class="w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              <//>
            </div>
          </div>

          <!-- ============================================================
               MQTT
          ============================================================ -->
          <div class="w-full border border-slate-500 bg-white/30 backdrop-blur-sm">
            <div class="bg-teal-600/10 border-b border-slate-500 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm w-full sm:w-auto text-center sm:text-left">MQTT</h3>
              <div class="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
                <span class="text-slate-600 font-medium drop-shadow-sm tracking-wide text-lg">Enabled</span>
                <${MyPolzunok} value=${$.check_mqtt} onChange=${$t=>ce("check_mqtt",$t)} />
              </div>
            </div>
            ${$.check_mqtt?Et`
              <div class="flex flex-col divide-y divide-slate-500">
                ${[{label:"Host",key:"mqtt_hst",type:"text"},{label:"Port",key:"mqtt_prt",type:"number"},{label:"Client",key:"mqtt_clt",type:"text"},{label:"User",key:"mqtt_usr",type:"text"},{label:"Password",key:"mqtt_pswd",type:"password",tipLabel:"Password (MQTT)"},{label:"TX topic",key:"txmqttop",type:"text"},{label:"RX topic",key:"rxmqttop",type:"text"}].map(($t,ge)=>Et`
                  <${le} label=${$t.label} tipLabel=${$t.tipLabel} index=${ge}>
                    <${pageSetting}
                      value=${$[$t.key]}
                      setfn=${pe=>ce($t.key,pe)}
                      type=${$t.type}
                      class=${`w-full px-3 py-2 bg-white/50 border ${pt[$t.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      error=${pt[$t.key]}
                    />
                  <//>
                `)}
              </div>
            `:null}
          </div>

          <!-- ============================================================
               HTTPS
          ============================================================ -->
          <div class="w-full border border-slate-500 bg-white/30 backdrop-blur-sm">
            <div class="bg-teal-600/10 border-b border-slate-500 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm w-full sm:w-auto text-center sm:text-left">HTTPS</h3>
              <div class="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
                <span class="text-slate-600 font-medium drop-shadow-sm tracking-wide text-lg">Enabled</span>
                <${MyPolzunok} value=${$.usehttps} onChange=${$t=>ce("usehttps",$t)} />
              </div>
            </div>
            ${$.usehttps?Et`
              <div class="flex flex-col divide-y divide-slate-500">
                ${[{label:"HTTPS domain",key:"domain",type:"text"},{label:"Private Key",key:"tls_key",type:"textarea"},{label:"Public Key",key:"tls_cert",type:"textarea"}].map(($t,ge)=>Et`
                  <div class="flex flex-col md:flex-row md:items-center px-6 py-2 transition-colors ${ge%2===0?"bg-sky-200/40":"bg-white/80"} hover:bg-slate-200/80 gap-2 md:gap-0">
                    <div
                      class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2 mt-1 md:mt-0 border-r border-slate-500 py-2 cursor-help"
                      data-tip=${$e($t.label)}
                    >
                      ${$t.label}
                    </div>
                    <div class="w-full md:w-2/3 flex items-start md:items-center">
                      <div class="relative w-full">
                        ${$t.type==="textarea"?Et`
                            ${$t.key==="tls_key"&&$.tls_key?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены, но информация скрыта!</div>`:$t.key==="tls_cert"&&$.tls_cert?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены успешно!</div>`:Et`<textarea
                                    name=${$t.key}
                                    value=${$[$t.key]||""}
                                    onInput=${pe=>ce($t.key,pe.target.value)}
                                    class=${`w-full px-3 py-2 bg-white/50 border ${pt[$t.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                                    rows="1"
                                    placeholder="Enter ${$t.label}"
                                  ></textarea>`}
                          `:Et`
                            <input
                              type="text"
                              name=${$t.key}
                              value=${$[$t.key]||""}
                              onInput=${pe=>ce($t.key,pe.target.value)}
                              class=${`w-full px-3 py-2 bg-white/50 border ${pt[$t.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                              maxlength="30"
                              placeholder="Enter domain (e.g., zagotovka.ddns.net)"
                            />
                          `}
                        ${$[$t.key]&&$t.key==="tls_cert"&&Et`
                          <div class="absolute right-0 top-0 mt-[3px] mr-[3px] flex gap-2">
                            <button type="button"
                              onClick=${()=>{navigator.clipboard.writeText($[$t.key]),fe("Данные скопированы")}}
                              class="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5"
                            >Копировать</button>
                            <button type="button"
                              onClick=${()=>ce($t.key,"")}
                              class="px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                            >Очистить</button>
                          </div>
                        `}
                        ${$[$t.key]&&$t.key!=="domain"&&$t.key!=="tls_cert"&&Et`
                          <button type="button"
                            onClick=${()=>ce($t.key,"")}
                            class="absolute right-0 top-0 mt-[3px] mr-[3px] px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                          >Очистить</button>
                        `}
                      </div>
                      ${pt[$t.key]&&Et`<div class="text-red-500 text-sm mt-1 font-semibold w-full text-left">${pt[$t.key]}</div>`}
                    </div>
                  </div>
                `)}
              </div>
            `:null}
          </div>

          <!-- ============================================================
               Coordinates & Astronomy
          ============================================================ -->
          <div class="w-full border border-slate-500 bg-white/30 backdrop-blur-sm">
            <div class="bg-teal-600/10 border-b border-slate-500 px-6 py-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm">Coordinates & Astronomy</h3>
            </div>
            <div class="flex flex-col divide-y divide-slate-500">

              <${le} label="Longitude" index=${0}>
                <${pageSetting} value=${$.lon_de} setfn=${$t=>ce("lon_de",$t)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${pt.lon_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${pt.lon_de} />
              <//>

              <${le} label="Latitude" index=${1}>
                <${pageSetting} value=${$.lat_de} setfn=${$t=>ce("lat_de",$t)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${pt.lat_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${pt.lat_de} />
              <//>

              <!-- Sunrise — нестандартная строка, data-tip вручную -->
              <div class="flex flex-col md:flex-row md:items-center px-6 py-2 transition-colors bg-white/80 hover:bg-slate-200/80 gap-2 md:gap-0">
                <div
                  class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2 border-r border-slate-500 py-2 cursor-help"
                  data-tip=${$e("Sunrise")}
                >
                  Sunrise: <span class="text-teal-600 drop-shadow-sm">${$.sunrise}</span>
                </div>
                <div class="w-full md:w-2/3 flex items-center gap-4 pl-4">
                  <${MyPolzunok} value=${$.onsunrise} onChange=${$t=>ce("onsunrise",$t)} />
                  <input type="text" value=${$.sunrise_pins||""} onInput=${$t=>ce("sunrise_pins",$t.target.value)}
                    maxlength="20" placeholder="Action for sunrise"
                    class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
              </div>

              <!-- Sunset -->
              <div class="flex flex-col md:flex-row md:items-center px-6 py-2 transition-colors bg-sky-200/40 hover:bg-slate-200/80 gap-2 md:gap-0">
                <div
                  class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2 border-r border-slate-500 py-2 cursor-help"
                  data-tip=${$e("Sunset")}
                >
                  Sunset: <span class="text-teal-600 drop-shadow-sm">${$.sunset}</span>
                </div>
                <div class="w-full md:w-2/3 flex items-center gap-4 pl-4">
                  <${MyPolzunok} value=${$.onsunset} onChange=${$t=>ce("onsunset",$t)} />
                  <input type="text" value=${$.sunset_pins||""} onInput=${$t=>ce("sunset_pins",$t.target.value)}
                    maxlength="20" placeholder="Action for sunset"
                    class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
              </div>

              <${le} label="Day Length" index=${4}>
                <span class="text-xl font-medium text-slate-800">${$.dlength}</span>
              <//>

              <${le} label="Next full moon" index=${5}>
                <span class="text-xl font-medium text-slate-800">
                  ${typeof $.fullmoon=="string"&&$.fullmoon?`${$.fullmoon.split(" ")[0]} at ${$.fullmoon.split(" ")[1]}`:"N/A"}
                </span>
              <//>
            </div>
          </div>

          <!-- ============================================================
               Offline Mode — Date & Time
          ============================================================ -->
          <div class="w-full border border-slate-500 bg-white/30 backdrop-blur-sm mb-4">
            <div class="bg-teal-600/10 border-b border-slate-500 px-6 py-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm">[OFFLINE MODE] Date & Time</h3>
            </div>
            <div class="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-slate-500 bg-white/80 items-stretch">

              <!-- Date -->
              <div class="flex-1 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 hover:bg-slate-200/80 transition-colors">
                <div
                  class="font-bold text-slate-700 text-lg sm:w-1/3 flex-shrink-0 border-r border-slate-500 py-3 px-6 cursor-help"
                  data-tip=${$e("Date")}
                >Date</div>
                <div class="flex-grow flex flex-col w-full pr-4">
                  <input type="text" name="offdate" value=${$.offdate||""} onInput=${$t=>ce("offdate",$t.target.value)}
                    placeholder="dd.mm.yy"
                    class=${`w-full px-3 py-2 bg-white/50 border ${pt.offdate?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${pt.offdate&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${pt.offdate}</div>`}
                </div>
              </div>

              <!-- Time -->
              <div class="flex-1 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 hover:bg-slate-200/80 transition-colors">
                <div
                  class="font-bold text-slate-700 text-lg sm:w-1/3 flex-shrink-0 border-r border-slate-500 py-3 px-6 cursor-help"
                  data-tip=${$e("Time")}
                >Time</div>
                <div class="flex-grow flex flex-col w-full pr-4">
                  <input type="text" name="offtime" value=${$.offtime||""} onInput=${$t=>ce("offtime",$t.target.value)}
                    placeholder="hh:mm:ss"
                    class=${`w-full px-3 py-2 bg-white/50 border ${pt.offtime?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${pt.offtime&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${pt.offtime}</div>`}
                </div>
              </div>

            </div>
          </div>

          ${mt&&Et`
            <div class="w-full bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center border border-green-400/50 backdrop-blur-md">
              ${mt}
            </div>
          `}

          <div class="flex justify-end w-full mb-4">${Ie()}</div>

        </form>
      </div>
    </div>
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
  </svg>`;function Header({logout:$,user:_,setShowSidebar:st,showSidebar:ct}){const[dt,k]=ut(new Date),[pt,Yt]=ut(null),ht=(te,oe)=>new Date(te.year+1900,te.mon,te.mday,te.hour,te.min,te.sec),Xt=async()=>{try{const oe=await(await fetch("/api/stm32-time")).text();let me;try{me=JSON.parse(oe)}catch{return}me.status&&me.time?Yt(ht(me.time,me.timezone)):Yt(null)}catch{Yt(null)}};lt(()=>{const te=setInterval(()=>k(new Date),1e3),oe=setInterval(Xt,1e3);return Xt(),()=>{clearInterval(te),clearInterval(oe)}},[]);const Zt=te=>te.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric"}),mt=te=>te.toLocaleTimeString("ru-RU");return Et`
    <div
      class="bg-white/40 backdrop-blur-md border-b border-white/40 shadow-sm sticky top-0 z-[48] w-full py-2 ${ct?"pl-72":""} transition-all duration-300 transform"
    >
      <div class="px-4 w-full py-0 my-0 flex items-center justify-between">
        <button
          type="button"
          onclick=${()=>st(te=>!te)}
          class="text-slate-500 hover:text-teal-500 transition-colors"
        >
          <${Icons.bars3} class="h-6" />
        </button>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600">
            Дата: ${Zt(dt)}<span style="margin-left: 8px;"></span
            >Время: ${mt(dt)}
          </span>
        </div>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600"
            >STM32 дата:
            ${pt?Zt(pt):" 00.00.0000"}<span
              style="margin-left: 8px;"
            ></span
            >Время: ${pt?mt(pt):"00:00"}
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
  <//>`}function Chart({data:$}){const _=$.length,st=20,ct=15,dt=100,k=5,pt=10,Yt=25,ht=te=>(dt-pt)/k*(te+1),Xt=te=>(dt-pt)*te/100,Zt=te=>dt-pt-Xt(te),mt=(te,oe,me)=>Array.from({length:oe},(we,ye)=>ye*1+te);return Et` <div
    class="my-4 divide-y divide-gray-200 overflow-auto rounded bg-white"
  >
    <div class="font-light uppercase flex items-center text-gray-600 px-4 py-2">
      Temperature, last 24h
    <//>
    <div class="relative">
      <svg class="bg-yellow-x50 w-full p-4" viewBox="0 0 ${_*st+ct} ${dt}">
        ${mt(0,k).map(te=>Et`
            <line
              x1="0"
              y1=${ht(te)}
              x2=${ct+_*st}
              y2=${ht(te)}
              stroke-width="0.3"
              class="stroke-slate-300"
              stroke-dasharray="1,1"
            />
            <text x="0" y=${ht(te)-2} class="text-[6px] fill-slate-400"
              >${Yt-Yt/k*(te+1)}<//
            >
          `)}
        ${mt(0,_).map(te=>Et`
            <rect
              x=${ct+te*st}
              y=${Zt($[te]*100/Yt)}
              width="12"
              height=${Xt($[te]*100/Yt)}
              rx="2"
              class="fill-cyan-500"
            />
            <text x=${ct+te*st} y="100" class="text-[6px] fill-slate-400"
              >${te*2}:00<//
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
  `}function FirmwareUpdate({}){const[$,_]=ut([{},{}]),[st,ct]=ut(null),dt=()=>fetch("api/firmware/status").then(te=>te.json()).then(te=>_(te));lt(dt,[]),lt(()=>{if(st){const te=setTimeout(()=>{ct(null)},3e3);return()=>clearTimeout(te)}},[st]);const k=te=>fetch("api/firmware/commit").then(oe=>oe.json()).then(dt),pt=te=>fetch("api/reboot",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reboot:1})}).then(oe=>oe.json()).then(oe=>new Promise(me=>setTimeout(()=>{dt(),me()},5e3))),Yt=te=>fetch("api/firmware/rollback").then(pt),ht=te=>fetch("api/device/eraselast").then(dt),Xt=function(te){if(!te){ct({type:"yellow",message:"Error: No file selected."});return}const oe=te.name.split(".").pop().toLowerCase();if(oe!=="bin"&&oe!=="hex"){ct({type:"red",message:"Error: Only .bin and .hex files are allowed!"});return}const me=new FormData;me.append("file",te),fetch("api/firmware/upload",{method:"POST",body:me}).then(we=>{if(!we.ok)throw new Error(`HTTP error! status: ${we.status}`);return we.json()}).then(()=>{ct({type:"green",message:"Firmware uploaded successfully!"}),dt()}).catch(we=>{ct({type:"yellow",message:`Error: Upload failed. ${we.message}`})})},Zt=({type:te,message:oe})=>Et`
      <div
        class=${`fixed top-0 left-0 right-0 z-50 border-b-4 p-4 ${te==="red"?"bg-red-100 border-red-500 text-red-700":te==="yellow"?"bg-yellow-100 border-yellow-500 text-yellow-700":"bg-green-100 border-green-500 text-green-700"}`}
        role="alert"
      >
        <p class="font-bold text-center">${oe}</p>
      </div>
    `,mt=({title:te,onupload:oe})=>Et`
      <label
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        ${te}
        <input
          type="file"
          class="hidden"
          accept=".bin,.hex"
          onChange=${we=>{const ye=we.target.files[0];ye&&oe(ye)}}
        />
      </label>
    `;return Et`
    ${st&&Et`<${Zt} type=${st.type} message=${st.message} />`}
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
          onclick=${Yt}
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
          <${mt}
            title="Upload new firmware (.bin or .hex)"
            onupload=${Xt}
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
            onclick=${ht}
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
  `}const pageSetting=({value:$,setfn:_,type:st,options:ct,error:dt,...k})=>{let pt;const Yt=`w-full px-3 py-2 border rounded-md ${dt?"border-red-500":"border-gray-300"}`;switch(st){case"text":case"password":case"number":pt=Et`
        <input
          type=${st}
          value=${$}
          onInput=${ht=>_(ht.target.value)}
          class=${Yt}
          ...${k}
        />
      `;break;case"select":pt=Et`
        <select
          value=${$}
          onChange=${ht=>_(ht.target.value)}
          class=${Yt}
          ...${k}
        >
          ${ct.map(([ht,Xt])=>Et` <option value=${ht}>${Xt}</option> `)}
        </select>
      `;break;case"switch":pt=Et`
        <label class="switch">
          <input
            type="checkbox"
            checked=${$}
            onChange=${ht=>_(ht.target.checked)}
            ...${k}
          />
          <span class="slider round"></span>
        </label>
      `;break;default:pt=Et`<span>Неподдерживаемый тип: ${st}</span>`}return Et`
    <div>
      ${pt}
      ${dt&&Et`<div class="text-red-500 text-sm mt-1">${dt}</div>`}
    </div>
  `},App=function({}){const[$,_]=ut(!0),[st,ct]=ut("/"),[dt,k]=ut(""),[pt,Yt]=ut(!0),ht=()=>fetch("api/logout").then(Zt=>k("")),Xt=Zt=>Zt.ok?Zt.json().then(mt=>k(mt.user)).finally(mt=>_(!1)):_(!1)&&k(null);return lt(()=>fetch("api/login").then(Xt),[]),$?"":dt?Et` <div class="min-h-screen bg-slate-100" id="mains">
    <${Sidebar} url=${st} show=${pt} />
    <${Header}
      logout=${ht}
      user=${dt}
      showSidebar=${pt}
      setShowSidebar=${Yt}
    />
    <div
      class="${pt&&"pl-72"} transition-all duration-300 transform"
    >
      <${Qt}
        onChange=${Zt=>ct(Zt.url)}
        history=${History.createHashHistory()}
      >
        <${Main} default=${!0} />
        <${TabSelect} path="selects" />
        <${TabSwitch} path="switch" />
        <${TabButton} path="button" />
        <${TabEncoder} path="encoder" />
        <${TabCron} path="cron" />
        <${TabOneWire} path="1wire" />
        <${TabSecurity} path="Security" />
        <${Settings} path="settings" />
        <${FirmwareUpdate} path="update" />
      <//>
    <//>
  <//>`:Et`<${Login}
      loginFn=${Xt}
      logoIcon=${Logo}
      title="Device Dashboard Login"
      tipText="To login, use: admin/admin, user1/user1, user2/user2"
    />`};window.onload=()=>O(y(App),document.body);
