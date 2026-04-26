(function(){const k=document.createElement("link").relList;if(k&&k.supports&&k.supports("modulepreload"))return;for(const dt of document.querySelectorAll('link[rel="modulepreload"]'))ct(dt);new MutationObserver(dt=>{for(const _ of dt)if(_.type==="childList")for(const pt of _.addedNodes)pt.tagName==="LINK"&&pt.rel==="modulepreload"&&ct(pt)}).observe(document,{childList:!0,subtree:!0});function st(dt){const _={};return dt.integrity&&(_.integrity=dt.integrity),dt.referrerPolicy&&(_.referrerPolicy=dt.referrerPolicy),dt.crossOrigin==="use-credentials"?_.credentials="include":dt.crossOrigin==="anonymous"?_.credentials="omit":_.credentials="same-origin",_}function ct(dt){if(dt.ep)return;dt.ep=!0;const _=st(dt);fetch(dt.href,_)}})();var t,n,e,r,o,u,i,l,c,a,s,f={},p=[],h=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,d=Array.isArray;function v($,k){for(var st in k)$[st]=k[st];return $}function m($){var k=$.parentNode;k&&k.removeChild($)}function y($,k,st){var ct,dt,_,pt={};for(_ in k)_=="key"?ct=k[_]:_=="ref"?dt=k[_]:pt[_]=k[_];if(arguments.length>2&&(pt.children=arguments.length>3?t.call(arguments,2):st),typeof $=="function"&&$.defaultProps!=null)for(_ in $.defaultProps)pt[_]===void 0&&(pt[_]=$.defaultProps[_]);return g($,pt,ct,dt,null)}function g($,k,st,ct,dt){var _={type:$,props:k,key:st,ref:ct,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:dt??++e,__i:-1,__u:0};return dt==null&&n.vnode!=null&&n.vnode(_),_}function b($){return $.children}function C($,k){this.props=$,this.context=k}function x($,k){if(k==null)return $.__?x($.__,$.__i+1):null;for(var st;k<$.__k.length;k++)if((st=$.__k[k])!=null&&st.__e!=null)return st.__e;return typeof $.type=="function"?x($):null}function w($){var k,st;if(($=$.__)!=null&&$.__c!=null){for($.__e=$.__c.base=null,k=0;k<$.__k.length;k++)if((st=$.__k[k])!=null&&st.__e!=null){$.__e=$.__c.base=st.__e;break}return w($)}}function P($){(!$.__d&&($.__d=!0)&&r.push($)&&!U.__r++||o!==n.debounceRendering)&&((o=n.debounceRendering)||u)(U)}function U(){var $,k,st,ct,dt,_,pt,te;for(r.sort(i);$=r.shift();)$.__d&&(k=r.length,ct=void 0,_=(dt=(st=$).__v).__e,pt=[],te=[],st.__P&&((ct=v({},dt)).__v=dt.__v+1,n.vnode&&n.vnode(ct),M(st.__P,ct,dt,st.__n,st.__P.namespaceURI,32&dt.__u?[_]:null,pt,_??x(dt),!!(32&dt.__u),te),ct.__v=dt.__v,ct.__.__k[ct.__i]=ct,L(pt,ct,te),ct.__e!=_&&w(ct)),r.length>k&&r.sort(i));U.__r=0}function H($,k,st,ct,dt,_,pt,te,$t,Zt,oe){var Xt,le,re,pe,xe,we=ct&&ct.__k||p,ue=k.length;for(st.__d=$t,E(st,k,we),$t=st.__d,Xt=0;Xt<ue;Xt++)(re=st.__k[Xt])!=null&&typeof re!="boolean"&&typeof re!="function"&&(le=re.__i===-1?f:we[re.__i]||f,re.__i=Xt,M($,re,le,dt,_,pt,te,$t,Zt,oe),pe=re.__e,re.ref&&le.ref!=re.ref&&(le.ref&&F(le.ref,null,re),oe.push(re.ref,re.__c||pe,re)),xe==null&&pe!=null&&(xe=pe),65536&re.__u||le.__k===re.__k?($t&&!$t.isConnected&&($t=x(le)),$t=S(re,$t,$)):typeof re.type=="function"&&re.__d!==void 0?$t=re.__d:pe&&($t=pe.nextSibling),re.__d=void 0,re.__u&=-196609);st.__d=$t,st.__e=xe}function E($,k,st){var ct,dt,_,pt,te,$t=k.length,Zt=st.length,oe=Zt,Xt=0;for($.__k=[],ct=0;ct<$t;ct++)pt=ct+Xt,(dt=$.__k[ct]=(dt=k[ct])==null||typeof dt=="boolean"||typeof dt=="function"?null:typeof dt=="string"||typeof dt=="number"||typeof dt=="bigint"||dt.constructor==String?g(null,dt,null,null,null):d(dt)?g(b,{children:dt},null,null,null):dt.constructor===void 0&&dt.__b>0?g(dt.type,dt.props,dt.key,dt.ref?dt.ref:null,dt.__v):dt)!=null?(dt.__=$,dt.__b=$.__b+1,te=D(dt,st,pt,oe),dt.__i=te,_=null,te!==-1&&(oe--,(_=st[te])&&(_.__u|=131072)),_==null||_.__v===null?(te==-1&&Xt--,typeof dt.type!="function"&&(dt.__u|=65536)):te!==pt&&(te===pt+1?Xt++:te>pt?oe>$t-pt?Xt+=te-pt:Xt--:te<pt?te==pt-1&&(Xt=te-pt):Xt=0,te!==ct+Xt&&(dt.__u|=65536))):(_=st[pt])&&_.key==null&&_.__e&&(131072&_.__u)==0&&(_.__e==$.__d&&($.__d=x(_)),I(_,_,!1),st[pt]=null,oe--);if(oe)for(ct=0;ct<Zt;ct++)(_=st[ct])!=null&&(131072&_.__u)==0&&(_.__e==$.__d&&($.__d=x(_)),I(_,_))}function S($,k,st){var ct,dt;if(typeof $.type=="function"){for(ct=$.__k,dt=0;ct&&dt<ct.length;dt++)ct[dt]&&(ct[dt].__=$,k=S(ct[dt],k,st));return k}$.__e!=k&&(st.insertBefore($.__e,k||null),k=$.__e);do k=k&&k.nextSibling;while(k!=null&&k.nodeType===8);return k}function A($,k){return k=k||[],$==null||typeof $=="boolean"||(d($)?$.some((function(st){A(st,k)})):k.push($)),k}function D($,k,st,ct){var dt=$.key,_=$.type,pt=st-1,te=st+1,$t=k[st];if($t===null||$t&&dt==$t.key&&_===$t.type&&(131072&$t.__u)==0)return st;if(ct>($t!=null&&(131072&$t.__u)==0?1:0))for(;pt>=0||te<k.length;){if(pt>=0){if(($t=k[pt])&&(131072&$t.__u)==0&&dt==$t.key&&_===$t.type)return pt;pt--}if(te<k.length){if(($t=k[te])&&(131072&$t.__u)==0&&dt==$t.key&&_===$t.type)return te;te++}}return-1}function N($,k,st){k[0]==="-"?$.setProperty(k,st??""):$[k]=st==null?"":typeof st!="number"||h.test(k)?st:st+"px"}function R($,k,st,ct,dt){var _;t:if(k==="style")if(typeof st=="string")$.style.cssText=st;else{if(typeof ct=="string"&&($.style.cssText=ct=""),ct)for(k in ct)st&&k in st||N($.style,k,"");if(st)for(k in st)ct&&st[k]===ct[k]||N($.style,k,st[k])}else if(k[0]==="o"&&k[1]==="n")_=k!==(k=k.replace(/(PointerCapture)$|Capture$/i,"$1")),k=k.toLowerCase()in $||k==="onFocusOut"||k==="onFocusIn"?k.toLowerCase().slice(2):k.slice(2),$.l||($.l={}),$.l[k+_]=st,st?ct?st.u=ct.u:(st.u=l,$.addEventListener(k,_?a:c,_)):$.removeEventListener(k,_?a:c,_);else{if(dt=="http://www.w3.org/2000/svg")k=k.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(k!="width"&&k!="height"&&k!="href"&&k!="list"&&k!="form"&&k!="tabIndex"&&k!="download"&&k!="rowSpan"&&k!="colSpan"&&k!="role"&&k in $)try{$[k]=st??"";break t}catch{}typeof st=="function"||(st==null||st===!1&&k[4]!=="-"?$.removeAttribute(k):$.setAttribute(k,st))}}function T($){return function(k){if(this.l){var st=this.l[k.type+$];if(k.t==null)k.t=l++;else if(k.t<st.u)return;return st(n.event?n.event(k):k)}}}function M($,k,st,ct,dt,_,pt,te,$t,Zt){var oe,Xt,le,re,pe,xe,we,ue,he,me,_e,Ce,Se,Oe,de,ye=k.type;if(k.constructor!==void 0)return null;128&st.__u&&($t=!!(32&st.__u),_=[te=k.__e=st.__e]),(oe=n.__b)&&oe(k);t:if(typeof ye=="function")try{if(ue=k.props,he=(oe=ye.contextType)&&ct[oe.__c],me=oe?he?he.props.value:oe.__:ct,st.__c?we=(Xt=k.__c=st.__c).__=Xt.__E:("prototype"in ye&&ye.prototype.render?k.__c=Xt=new ye(ue,me):(k.__c=Xt=new C(ue,me),Xt.constructor=ye,Xt.render=V),he&&he.sub(Xt),Xt.props=ue,Xt.state||(Xt.state={}),Xt.context=me,Xt.__n=ct,le=Xt.__d=!0,Xt.__h=[],Xt._sb=[]),Xt.__s==null&&(Xt.__s=Xt.state),ye.getDerivedStateFromProps!=null&&(Xt.__s==Xt.state&&(Xt.__s=v({},Xt.__s)),v(Xt.__s,ye.getDerivedStateFromProps(ue,Xt.__s))),re=Xt.props,pe=Xt.state,Xt.__v=k,le)ye.getDerivedStateFromProps==null&&Xt.componentWillMount!=null&&Xt.componentWillMount(),Xt.componentDidMount!=null&&Xt.__h.push(Xt.componentDidMount);else{if(ye.getDerivedStateFromProps==null&&ue!==re&&Xt.componentWillReceiveProps!=null&&Xt.componentWillReceiveProps(ue,me),!Xt.__e&&(Xt.shouldComponentUpdate!=null&&Xt.shouldComponentUpdate(ue,Xt.__s,me)===!1||k.__v===st.__v)){for(k.__v!==st.__v&&(Xt.props=ue,Xt.state=Xt.__s,Xt.__d=!1),k.__e=st.__e,k.__k=st.__k,k.__k.forEach((function(Ee){Ee&&(Ee.__=k)})),_e=0;_e<Xt._sb.length;_e++)Xt.__h.push(Xt._sb[_e]);Xt._sb=[],Xt.__h.length&&pt.push(Xt);break t}Xt.componentWillUpdate!=null&&Xt.componentWillUpdate(ue,Xt.__s,me),Xt.componentDidUpdate!=null&&Xt.__h.push((function(){Xt.componentDidUpdate(re,pe,xe)}))}if(Xt.context=me,Xt.props=ue,Xt.__P=$,Xt.__e=!1,Ce=n.__r,Se=0,"prototype"in ye&&ye.prototype.render){for(Xt.state=Xt.__s,Xt.__d=!1,Ce&&Ce(k),oe=Xt.render(Xt.props,Xt.state,Xt.context),Oe=0;Oe<Xt._sb.length;Oe++)Xt.__h.push(Xt._sb[Oe]);Xt._sb=[]}else do Xt.__d=!1,Ce&&Ce(k),oe=Xt.render(Xt.props,Xt.state,Xt.context),Xt.state=Xt.__s;while(Xt.__d&&++Se<25);Xt.state=Xt.__s,Xt.getChildContext!=null&&(ct=v(v({},ct),Xt.getChildContext())),le||Xt.getSnapshotBeforeUpdate==null||(xe=Xt.getSnapshotBeforeUpdate(re,pe)),H($,d(de=oe!=null&&oe.type===b&&oe.key==null?oe.props.children:oe)?de:[de],k,st,ct,dt,_,pt,te,$t,Zt),Xt.base=k.__e,k.__u&=-161,Xt.__h.length&&pt.push(Xt),we&&(Xt.__E=Xt.__=null)}catch(Ee){k.__v=null,$t||_!=null?(k.__e=te,k.__u|=$t?160:32,_[_.indexOf(te)]=null):(k.__e=st.__e,k.__k=st.__k),n.__e(Ee,k,st)}else _==null&&k.__v===st.__v?(k.__k=st.__k,k.__e=st.__e):k.__e=W(st.__e,k,st,ct,dt,_,pt,$t,Zt);(oe=n.diffed)&&oe(k)}function L($,k,st){k.__d=void 0;for(var ct=0;ct<st.length;ct++)F(st[ct],st[++ct],st[++ct]);n.__c&&n.__c(k,$),$.some((function(dt){try{$=dt.__h,dt.__h=[],$.some((function(_){_.call(dt)}))}catch(_){n.__e(_,dt.__v)}}))}function W($,k,st,ct,dt,_,pt,te,$t){var Zt,oe,Xt,le,re,pe,xe,we=st.props,ue=k.props,he=k.type;if(he==="svg"?dt="http://www.w3.org/2000/svg":he==="math"?dt="http://www.w3.org/1998/Math/MathML":dt||(dt="http://www.w3.org/1999/xhtml"),_!=null){for(Zt=0;Zt<_.length;Zt++)if((re=_[Zt])&&"setAttribute"in re==!!he&&(he?re.localName===he:re.nodeType===3)){$=re,_[Zt]=null;break}}if($==null){if(he===null)return document.createTextNode(ue);$=document.createElementNS(dt,he,ue.is&&ue),_=null,te=!1}if(he===null)we===ue||te&&$.data===ue||($.data=ue);else{if(_=_&&t.call($.childNodes),we=st.props||f,!te&&_!=null)for(we={},Zt=0;Zt<$.attributes.length;Zt++)we[(re=$.attributes[Zt]).name]=re.value;for(Zt in we)if(re=we[Zt],Zt!="children"){if(Zt=="dangerouslySetInnerHTML")Xt=re;else if(Zt!=="key"&&!(Zt in ue)){if(Zt=="value"&&"defaultValue"in ue||Zt=="checked"&&"defaultChecked"in ue)continue;R($,Zt,null,re,dt)}}for(Zt in ue)re=ue[Zt],Zt=="children"?le=re:Zt=="dangerouslySetInnerHTML"?oe=re:Zt=="value"?pe=re:Zt=="checked"?xe=re:Zt==="key"||te&&typeof re!="function"||we[Zt]===re||R($,Zt,re,we[Zt],dt);if(oe)te||Xt&&(oe.__html===Xt.__html||oe.__html===$.innerHTML)||($.innerHTML=oe.__html),k.__k=[];else if(Xt&&($.innerHTML=""),H($,d(le)?le:[le],k,st,ct,he==="foreignObject"?"http://www.w3.org/1999/xhtml":dt,_,pt,_?_[0]:st.__k&&x(st,0),te,$t),_!=null)for(Zt=_.length;Zt--;)_[Zt]!=null&&m(_[Zt]);te||(Zt="value",pe!==void 0&&(pe!==$[Zt]||he==="progress"&&!pe||he==="option"&&pe!==we[Zt])&&R($,Zt,pe,we[Zt],dt),Zt="checked",xe!==void 0&&xe!==$[Zt]&&R($,Zt,xe,we[Zt],dt))}return $}function F($,k,st){try{typeof $=="function"?$(k):$.current=k}catch(ct){n.__e(ct,st)}}function I($,k,st){var ct,dt;if(n.unmount&&n.unmount($),(ct=$.ref)&&(ct.current&&ct.current!==$.__e||F(ct,null,k)),(ct=$.__c)!=null){if(ct.componentWillUnmount)try{ct.componentWillUnmount()}catch(_){n.__e(_,k)}ct.base=ct.__P=null}if(ct=$.__k)for(dt=0;dt<ct.length;dt++)ct[dt]&&I(ct[dt],k,st||typeof $.type!="function");st||$.__e==null||m($.__e),$.__c=$.__=$.__e=$.__d=void 0}function V($,k,st){return this.constructor($,st)}function O($,k,st){var ct,dt,_,pt;n.__&&n.__($,k),dt=(ct=!1)?null:k.__k,_=[],pt=[],M(k,$=k.__k=y(b,null,[$]),dt||f,f,k.namespaceURI,dt?null:k.firstChild?t.call(k.childNodes):null,_,dt?dt.__e:k.firstChild,ct,pt),L(_,$,pt)}function j($,k,st){var ct,dt,_,pt,te=v({},$.props);for(_ in $.type&&$.type.defaultProps&&(pt=$.type.defaultProps),k)_=="key"?ct=k[_]:_=="ref"?dt=k[_]:te[_]=k[_]===void 0&&pt!==void 0?pt[_]:k[_];return arguments.length>2&&(te.children=arguments.length>3?t.call(arguments,2):st),g($.type,te,ct||$.key,dt||$.ref,null)}function q($,k){var st={__c:k="__cC"+s++,__:$,Consumer:function(ct,dt){return ct.children(dt)},Provider:function(ct){var dt,_;return this.getChildContext||(dt=[],(_={})[k]=this,this.getChildContext=function(){return _},this.shouldComponentUpdate=function(pt){this.props.value!==pt.value&&dt.some((function(te){te.__e=!0,P(te)}))},this.sub=function(pt){dt.push(pt);var te=pt.componentWillUnmount;pt.componentWillUnmount=function(){dt.splice(dt.indexOf(pt),1),te&&te.call(pt)}}),ct.children}};return st.Provider.__=st.Consumer.contextType=st}t=p.slice,n={__e:function($,k,st,ct){for(var dt,_,pt;k=k.__;)if((dt=k.__c)&&!dt.__)try{if((_=dt.constructor)&&_.getDerivedStateFromError!=null&&(dt.setState(_.getDerivedStateFromError($)),pt=dt.__d),dt.componentDidCatch!=null&&(dt.componentDidCatch($,ct||{}),pt=dt.__d),pt)return dt.__E=dt}catch(te){$=te}throw $}},e=0,C.prototype.setState=function($,k){var st;st=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=v({},this.state),typeof $=="function"&&($=$(v({},st),this.props)),$&&v(st,$),$!=null&&this.__v&&(k&&this._sb.push(k),P(this))},C.prototype.forceUpdate=function($){this.__v&&(this.__e=!0,$&&this.__h.push($),P(this))},C.prototype.render=b,r=[],u=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=function($,k){return $.__v.__b-k.__v.__b},U.__r=0,l=0,c=T(!1),a=T(!0),s=0;var B,K,z,G,J=0,Q=[],X=[],Y=n,Z=Y.__b,tt=Y.__r,nt=Y.diffed,et=Y.__c,_t=Y.unmount,rt=Y.__;function ot($,k){Y.__h&&Y.__h(K,$,J||k),J=0;var st=K.__H||(K.__H={__:[],__h:[]});return $>=st.__.length&&st.__.push({__V:X}),st.__[$]}function ut($){return J=1,it(wt,$)}function it($,k,st){var ct=ot(B++,2);if(ct.t=$,!ct.__c&&(ct.__=[wt(void 0,k),function(te){var $t=ct.__N?ct.__N[0]:ct.__[0],Zt=ct.t($t,te);$t!==Zt&&(ct.__N=[Zt,ct.__[1]],ct.__c.setState({}))}],ct.__c=K,!K.u)){var dt=function(te,$t,Zt){if(!ct.__c.__H)return!0;var oe=ct.__c.__H.__.filter((function(le){return!!le.__c}));if(oe.every((function(le){return!le.__N})))return!_||_.call(this,te,$t,Zt);var Xt=!1;return oe.forEach((function(le){if(le.__N){var re=le.__[0];le.__=le.__N,le.__N=void 0,re!==le.__[0]&&(Xt=!0)}})),!(!Xt&&ct.__c.props===te)&&(!_||_.call(this,te,$t,Zt))};K.u=!0;var _=K.shouldComponentUpdate,pt=K.componentWillUpdate;K.componentWillUpdate=function(te,$t,Zt){if(this.__e){var oe=_;_=void 0,dt(te,$t,Zt),_=oe}pt&&pt.call(this,te,$t,Zt)},K.shouldComponentUpdate=dt}return ct.__N||ct.__}function lt($,k){var st=ot(B++,3);!Y.__s&&xt(st.__H,k)&&(st.__=$,st.i=k,K.__H.__h.push(st))}function at($){return J=5,ft((function(){return{current:$}}),[])}function ft($,k){var st=ot(B++,7);return xt(st.__H,k)?(st.__V=$(),st.i=k,st.__h=$,st.__V):st.__}function yt(){for(var $;$=Q.shift();)if($.__P&&$.__H)try{$.__H.__h.forEach(bt),$.__H.__h.forEach(Ct),$.__H.__h=[]}catch(k){$.__H.__h=[],Y.__e(k,$.__v)}}Y.__b=function($){K=null,Z&&Z($)},Y.__=function($,k){$&&k.__k&&k.__k.__m&&($.__m=k.__k.__m),rt&&rt($,k)},Y.__r=function($){tt&&tt($),B=0;var k=(K=$.__c).__H;k&&(z===K?(k.__h=[],K.__h=[],k.__.forEach((function(st){st.__N&&(st.__=st.__N),st.__V=X,st.__N=st.i=void 0}))):(k.__h.forEach(bt),k.__h.forEach(Ct),k.__h=[],B=0)),z=K},Y.diffed=function($){nt&&nt($);var k=$.__c;k&&k.__H&&(k.__H.__h.length&&(Q.push(k)!==1&&G===Y.requestAnimationFrame||((G=Y.requestAnimationFrame)||kt)(yt)),k.__H.__.forEach((function(st){st.i&&(st.__H=st.i),st.__V!==X&&(st.__=st.__V),st.i=void 0,st.__V=X}))),z=K=null},Y.__c=function($,k){k.some((function(st){try{st.__h.forEach(bt),st.__h=st.__h.filter((function(ct){return!ct.__||Ct(ct)}))}catch(ct){k.some((function(dt){dt.__h&&(dt.__h=[])})),k=[],Y.__e(ct,st.__v)}})),et&&et($,k)},Y.unmount=function($){_t&&_t($);var k,st=$.__c;st&&st.__H&&(st.__H.__.forEach((function(ct){try{bt(ct)}catch(dt){k=dt}})),st.__H=void 0,k&&Y.__e(k,st.__v))};var gt=typeof requestAnimationFrame=="function";function kt($){var k,st=function(){clearTimeout(ct),gt&&cancelAnimationFrame(k),setTimeout($)},ct=setTimeout(st,100);gt&&(k=requestAnimationFrame(st))}function bt($){var k=K,st=$.__c;typeof st=="function"&&($.__c=void 0,st()),K=k}function Ct($){var k=K;$.__c=$.__(),K=k}function xt($,k){return!$||$.length!==k.length||k.some((function(st,ct){return st!==$[ct]}))}function wt($,k){return typeof k=="function"?k($):k}var Pt=function($,k,st,ct){var dt;k[0]=0;for(var _=1;_<k.length;_++){var pt=k[_++],te=k[_]?(k[0]|=pt?1:2,st[k[_++]]):k[++_];pt===3?ct[0]=te:pt===4?ct[1]=Object.assign(ct[1]||{},te):pt===5?(ct[1]=ct[1]||{})[k[++_]]=te:pt===6?ct[1][k[++_]]+=te+"":pt?(dt=$.apply(te,Pt($,te,st,["",null])),ct.push(dt),te[0]?k[0]|=2:(k[_-2]=0,k[_]=dt)):ct.push(te)}return ct},Ut=new Map;function Ht($){var k=Ut.get(this);return k||(k=new Map,Ut.set(this,k)),(k=Pt(this,k.get($)||(k.set($,k=(function(st){for(var ct,dt,_=1,pt="",te="",$t=[0],Zt=function(le){_===1&&(le||(pt=pt.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?$t.push(0,le,pt):_===3&&(le||pt)?($t.push(3,le,pt),_=2):_===2&&pt==="..."&&le?$t.push(4,le,0):_===2&&pt&&!le?$t.push(5,0,!0,pt):_>=5&&((pt||!le&&_===5)&&($t.push(_,0,pt,dt),_=6),le&&($t.push(_,le,0,dt),_=6)),pt=""},oe=0;oe<st.length;oe++){oe&&(_===1&&Zt(),Zt(oe));for(var Xt=0;Xt<st[oe].length;Xt++)ct=st[oe][Xt],_===1?ct==="<"?(Zt(),$t=[$t],_=3):pt+=ct:_===4?pt==="--"&&ct===">"?(_=1,pt=""):pt=ct+pt[0]:te?ct===te?te="":pt+=ct:ct==='"'||ct==="'"?te=ct:ct===">"?(Zt(),_=1):_&&(ct==="="?(_=5,dt=pt,pt=""):ct==="/"&&(_<5||st[oe][Xt+1]===">")?(Zt(),_===3&&($t=$t[0]),_=$t,($t=$t[0]).push(2,0,_),_=0):ct===" "||ct==="	"||ct===`
`||ct==="\r"?(Zt(),_=2):pt+=ct),_===3&&pt==="!--"&&(_=4,$t=$t[0])}return Zt(),$t})($)),k),arguments,[])).length>1?k:k[0]}var Et=Ht.bind(y),St={};function At($,k){for(var st in k)$[st]=k[st];return $}function Dt($,k,st){var ct,dt=/(?:\?([^#]*))?(#.*)?$/,_=$.match(dt),pt={};if(_&&_[1])for(var te=_[1].split("&"),$t=0;$t<te.length;$t++){var Zt=te[$t].split("=");pt[decodeURIComponent(Zt[0])]=decodeURIComponent(Zt.slice(1).join("="))}$=Tt($.replace(dt,"")),k=Tt(k||"");for(var oe=Math.max($.length,k.length),Xt=0;Xt<oe;Xt++)if(k[Xt]&&k[Xt].charAt(0)===":"){var le=k[Xt].replace(/(^:|[+*?]+$)/g,""),re=(k[Xt].match(/[+*?]+$/)||St)[0]||"",pe=~re.indexOf("+"),xe=~re.indexOf("*"),we=$[Xt]||"";if(!we&&!xe&&(re.indexOf("?")<0||pe)){ct=!1;break}if(pt[le]=decodeURIComponent(we),pe||xe){pt[le]=$.slice(Xt).map(decodeURIComponent).join("/");break}}else if(k[Xt]!==$[Xt]){ct=!1;break}return(st.default===!0||ct!==!1)&&pt}function Nt($,k){return $.rank<k.rank?1:$.rank>k.rank?-1:$.index-k.index}function Rt($,k){return $.index=k,$.rank=(function(st){return st.props.default?0:Tt(st.props.path).map(Mt).join("")})($),$.props}function Tt($){return $.replace(/(^\/+|\/+$)/g,"").split("/")}function Mt($){return $.charAt(0)==":"?1+"*+?".indexOf($.charAt($.length-1))||4:5}var Lt={},Wt=[],Ft=[],It=null,Vt={url:jt()},Ot=q(Vt);function jt(){var $;return""+(($=It&&It.location?It.location:It&&It.getCurrentLocation?It.getCurrentLocation():typeof location<"u"?location:Lt).pathname||"")+($.search||"")}function qt($,k){return k===void 0&&(k=!1),typeof $!="string"&&$.url&&(k=$.replace,$=$.url),(function(st){for(var ct=Wt.length;ct--;)if(Wt[ct].canRoute(st))return!0;return!1})($)&&(function(st,ct){ct===void 0&&(ct="push"),It&&It[ct]?It[ct](st):typeof history<"u"&&history[ct+"State"]&&history[ct+"State"](null,null,st)})($,k?"replace":"push"),Bt($)}function Bt($){for(var k=!1,st=0;st<Wt.length;st++)Wt[st].routeTo($)&&(k=!0);return k}function Kt($){if($&&$.getAttribute){var k=$.getAttribute("href"),st=$.getAttribute("target");if(k&&k.match(/^\//g)&&(!st||st.match(/^_?self$/i)))return qt(k)}}function zt($){return $.stopImmediatePropagation&&$.stopImmediatePropagation(),$.stopPropagation&&$.stopPropagation(),$.preventDefault(),!1}function Gt($){if(!($.ctrlKey||$.metaKey||$.altKey||$.shiftKey||$.button)){var k=$.target;do if(k.localName==="a"&&k.getAttribute("href")){if(k.hasAttribute("data-native")||k.hasAttribute("native"))return;if(Kt(k))return zt($)}while(k=k.parentNode)}}var Jt=!1;function Qt($){$.history&&(It=$.history),this.state={url:$.url||jt()}}At(Qt.prototype=new C,{shouldComponentUpdate:function($){return $.static!==!0||$.url!==this.props.url||$.onChange!==this.props.onChange},canRoute:function($){var k=A(this.props.children);return this.g(k,$)!==void 0},routeTo:function($){this.setState({url:$});var k=this.canRoute($);return this.p||this.forceUpdate(),k},componentWillMount:function(){this.p=!0},componentDidMount:function(){var $=this;Jt||(Jt=!0,It||addEventListener("popstate",(function(){Bt(jt())})),addEventListener("click",Gt)),Wt.push(this),It&&(this.u=It.listen((function(k){var st=k.location||k;$.routeTo(""+(st.pathname||"")+(st.search||""))}))),this.p=!1},componentWillUnmount:function(){typeof this.u=="function"&&this.u(),Wt.splice(Wt.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function($,k){$=$.filter(Rt).sort(Nt);for(var st=0;st<$.length;st++){var ct=$[st],dt=Dt(k,ct.props.path,ct.props);if(dt)return[ct,dt]}},render:function($,k){var st,ct,dt=$.onChange,_=k.url,pt=this.c,te=this.g(A($.children),_);if(te&&(ct=j(te[0],At(At({url:_,matches:st=te[1]},st),{key:void 0,ref:void 0}))),_!==(pt&&pt.url)){At(Vt,pt=this.c={url:_,previous:pt&&pt.url,current:ct,path:ct?ct.props.path:null,matches:st}),pt.router=this,pt.active=ct?[ct]:[];for(var $t=Ft.length;$t--;)Ft[$t]({});typeof dt=="function"&&dt(pt)}return y(Ot.Provider,{value:pt},ct)}});const switchIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='652.000000pt'%20height='956.000000pt'%20viewBox='0%200%20652.000000%20956.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,956.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M1150%209540%20c-386%20-6%20-408%20-8%20-475%20-29%20-147%20-48%20-255%20-115%20-368%20-226%20-93%20-91%20-145%20-159%20-191%20-250%20-74%20-146%20-77%20-163%20-87%20-455%20-10%20-318%20-14%20-7639%20-4%20-7725%2025%20-214%20107%20-394%20245%20-539%20115%20-121%20227%20-192%20408%20-260%20l72%20-28%202418%20-1%20c2586%20-2%202582%20-2%202716%2047%20254%2092%20492%20346%20573%20611%2017%2058%2018%20211%2018%204095%20l0%204035%20-23%2075%20c-61%20193%20-204%20388%20-368%20501%20-76%2052%20-226%20118%20-294%20129%20-36%206%20-229%2015%20-430%2020%20-398%2010%20-3557%2010%20-4210%200z%20m4610%20-328%20c164%20-59%20291%20-175%20374%20-339%20l36%20-73%200%20-4016%200%20-4016%20-45%20-88%20c-25%20-48%20-70%20-115%20-101%20-148%20-64%20-71%20-175%20-148%20-242%20-168%20-103%20-32%20-400%20-35%20-2687%20-32%20-2180%203%20-2282%204%20-2335%2022%20-204%2068%20-363%20240%20-417%20452%20-17%2065%20-18%20275%20-18%203979%200%203785%201%203912%2019%203980%2024%2091%2084%20207%20140%20271%2055%2062%20182%20152%20244%20171%2027%208%20121%2018%20222%2022%2096%205%201203%208%202460%207%20l2285%20-1%2065%20-23z'/%3e%3cpath%20d='M1434%208128%20l-45%20-41%203%20-3291%20c3%20-3127%204%20-3293%2021%20-3323%209%20-18%2029%20-41%2044%20-50%2026%20-17%20125%20-18%201799%20-18%201918%200%201808%20-3%201834%2054%207%2014%2016%2067%2021%20116%205%2050%209%20789%209%201644%20l0%201554%20249%20981%20c358%201405%20401%201581%20401%201626%200%2051%204%2046%20-414%20468%20l-321%20322%20-1778%200%20-1777%200%20-46%20-42z%20m3636%20-425%20l165%20-168%20-185%20-6%20c-102%20-4%20-770%20-7%20-1485%20-8%20l-1300%20-1%20-145%20148%20c-80%2081%20-156%20159%20-170%20175%20l-23%2027%201489%200%201490%200%20164%20-167z%20m-3078%20-356%20l31%20-38%20-147%20-583%20c-81%20-320%20-153%20-602%20-160%20-626%20-12%20-39%20-13%20-23%20-19%20185%20-9%20291%20-9%20823%200%201123%20l6%20233%20129%20-128%20c71%20-70%20143%20-145%20160%20-166z%20m2900%20-136%20c278%20-3%20510%20-9%20513%20-13%2010%20-10%203%20-40%20-305%20-1260%20l-280%20-1107%200%20-1565%200%20-1566%20-1565%200%20-1565%200%200%201521%200%201520%20310%201226%20c171%20675%20313%201229%20316%201232%2014%2014%201788%2022%202576%2012z'/%3e%3cpath%20d='M3765%206820%20c-61%20-25%20-87%20-94%20-185%20-473%20-80%20-315%20-120%20-493%20-120%20-540%200%20-77%2078%20-141%20163%20-134%2069%206%20101%2040%20131%20141%2057%20190%20197%20746%20212%20843%205%2032%201%2053%20-19%2096%20-22%2048%20-30%2057%20-64%2066%20-44%2013%20-90%2013%20-118%201z'/%3e%3cpath%20d='M3098%203406%20c-104%20-37%20-216%20-134%20-264%20-227%20-24%20-47%20-28%20-71%20-35%20-184%20-19%20-311%20-7%20-500%2037%20-586%2040%20-80%20113%20-151%20201%20-195%20l76%20-39%20151%200%20151%200%2068%2034%20c81%2041%20167%20128%20215%20218%20l32%2061%200%20302%200%20302%20-41%2078%20c-65%20127%20-156%20201%20-284%20235%20-73%2019%20-255%2019%20-307%201z%20m262%20-311%20c58%20-30%2064%20-57%2068%20-301%204%20-219%204%20-222%20-19%20-253%20-65%20-88%20-230%20-95%20-286%20-13%20-16%2024%20-18%2055%20-21%20273%20l-3%20246%2038%2030%20c21%2017%2045%2033%2053%2036%2025%2011%20137%20-1%20170%20-18z'/%3e%3c/g%3e%3c/svg%3e",buttonIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M790%201280%20l0%20-420%2065%200%2065%200%200%20420%200%20420%20-65%200%20-65%200%200%20-420z'/%3e%3cpath%20d='M489%201612%20c-228%20-114%20-386%20-309%20-451%20-557%20-29%20-110%20-29%20-297%200%20-406%2081%20-301%20308%20-530%20607%20-610%20112%20-30%20307%20-30%20420%200%20294%2077%20529%20312%20606%20606%2029%20110%2030%20307%201%20416%20-67%20251%20-245%20462%20-477%20565%20l-55%2024%200%20-74%200%20-74%2072%20-42%20c280%20-167%20411%20-508%20313%20-817%20-35%20-110%20-88%20-196%20-175%20-283%20-87%20-87%20-172%20-139%20-285%20-177%20-70%20-23%20-96%20-27%20-210%20-27%20-114%200%20-140%204%20-210%2027%20-293%2097%20-495%20372%20-495%20673%200%2070%2025%20193%2055%20266%2054%20133%20182%20279%20299%20339%20l66%2034%200%2078%20c0%2042%20-1%2077%20-2%2077%20-2%200%20-37%20-18%20-79%20-38z'/%3e%3c/g%3e%3c/svg%3e",timerIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M818%201670%20c-24%20-15%20-31%20-77%20-23%20-221%208%20-141%2015%20-159%2064%20-159%2050%200%2060%2024%2063%20150%20l3%20115%2030%20-3%20c172%20-19%20366%20-132%20472%20-275%2094%20-129%20133%20-236%20140%20-392%206%20-142%20-12%20-230%20-73%20-355%20-82%20-165%20-236%20-296%20-419%20-357%20-71%20-24%20-95%20-27%20-215%20-27%20-118%200%20-145%203%20-212%2026%20-123%2041%20-204%2092%20-298%20187%20-68%2068%20-94%20103%20-127%20171%20-61%20125%20-76%20203%20-71%20352%206%20153%2036%20243%20122%20371%2064%2095%2068%20127%2021%20149%20-39%2017%20-68%202%20-113%20-59%20-94%20-127%20-150%20-285%20-159%20-449%20-23%20-399%20236%20-749%20632%20-855%20111%20-30%20297%20-30%20410%200%20449%20119%20716%20562%20610%201011%20-23%2095%20-105%20254%20-173%20336%20-111%20131%20-276%20234%20-442%20274%20-89%2021%20-213%2026%20-242%2010z'/%3e%3cpath%20d='M452%201258%20c-7%20-7%20-12%20-17%20-12%20-23%200%20-21%20330%20-469%20358%20-487%2043%20-28%20106%20-23%20143%2010%2043%2038%2052%20113%2020%20154%20-20%2025%20-454%20342%20-484%20354%20-7%202%20-18%20-1%20-25%20-8z'/%3e%3c/g%3e%3c/svg%3e",owIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='110.000000pt'%20height='52.000000pt'%20viewBox='0%200%20110.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M171%20500%20c-50%20-12%20-83%20-41%20-111%20-96%20-22%20-43%20-25%20-62%20-24%20-149%200%20-141%2027%20-199%20109%20-236%2073%20-33%20180%20-16%20227%2037%2067%2076%2074%20284%2013%20376%20-39%2059%20-133%2089%20-214%2068z%20m119%20-65%20c50%20-26%2065%20-67%2065%20-180%200%20-146%20-32%20-195%20-128%20-195%20-40%200%20-54%205%20-77%2028%20-16%2016%20-34%2049%20-40%2073%20-16%2056%20-7%20186%2014%20227%2030%2057%20105%2078%20166%2047z'/%3e%3cpath%20d='M482%20483%20c3%20-10%2029%20-120%2058%20-245%20l54%20-228%2038%200%20c43%200%2035%20-20%2089%20215%2017%2077%2035%20146%2038%20152%204%207%2026%20-73%2051%20-178%20l44%20-190%2039%203%2040%203%2058%20240%20c32%20132%2058%20241%2059%20243%200%202%20-15%202%20-32%200%20l-32%20-3%20-43%20-180%20c-23%20-99%20-44%20-187%20-46%20-195%20-2%20-8%20-25%2074%20-51%20183%20l-48%20198%20-36%20-3%20-36%20-3%20-45%20-194%20c-25%20-106%20-47%20-188%20-49%20-181%20-3%207%20-23%2095%20-46%20194%20l-42%20181%20-33%203%20c-28%203%20-33%201%20-29%20-15z'/%3e%3c/g%3e%3c/svg%3e",encoderIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='34.000000pt'%20height='52.000000pt'%20viewBox='0%200%2034.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M30%20255%20l0%20-245%20150%200%20150%200%200%2030%200%2030%20-115%200%20-115%200%200%2085%200%2085%2095%200%2095%200%200%2030%200%2030%20-95%200%20-95%200%200%2070%200%2070%20115%200%20115%200%200%2030%200%2030%20-150%200%20-150%200%200%20-245z'/%3e%3c/g%3e%3c/svg%3e",Icons={switchIcon:$=>Et`
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
    </svg>`},tipColors={green:"bg-green-100 text-green-900 ring-green-300",yellow:"bg-yellow-100 text-yellow-900 ring-yellow-300"};function Button({title:$,onclick:k,disabled:st,cls:ct,icon:dt,ref:_,colors:pt,hovercolor:te,disabledcolor:$t}){const[Zt,oe]=ut(!1),Xt=function(le){const re=k?k():null;re&&typeof re.catch=="function"&&(oe(!0),re.catch(()=>!1).then(()=>oe(!1)))};return pt||(pt="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400"),Et` <button
    type="button"
    class="inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${pt} ${ct}"
    ref=${_}
    onclick=${Xt}
    disabled=${st||Zt}
  >
    ${$}
    <${Zt?Icons.refresh:dt} class="w-4 ${Zt?"animate-spin":""}" />
  <//>`}function Login({loginFn:$,logoIcon:k,title:st,tipText:ct}){const[dt,_]=ut(""),[pt,te]=ut(""),$t=function(Zt){const Xt={Authorization:"Basic "+btoa(dt+":"+pt)};return fetch("api/login",{headers:Xt}).then($).finally(le=>te(""))};return Et` <div
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
          oninput=${Zt=>_(Zt.target.value)}
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
          oninput=${Zt=>te(Zt.target.value)}
          value=${pt}
          onchange=${$t}
        />
      <//>
      <div class="mt-7">
        <${Button}
          title="Sign In"
          icon=${Icons.logout}
          onclick=${$t}
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
  <//>`}const ruLangswitch=["","ID - уникальный числовой идентификатор выключателя. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","Device connection - Здесь указаны пины одного или нескольких устройств, с которыми взаимодействует данный выключатель.",'INFO - Укажите название данного выключателя для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение обработчика состояния на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек и соединений выключателя."],ruLangselect=["","ID - уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type(s) of pin(s) - Выберите режим работы данного пина из предложенных вариантов."],rulangbutton=["","ID - уникальный числовой идентификатор кнопки. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","sclick - Выполняемая команда при одинарном клике кнопки.","dclick - Выполняемая команда при двойном клике кнопки.","lpress - Выполняемая команда при удержании кнопки.",'INFO - Укажите название данной кнопки для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение функции кнопки на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек кнопки."],ruencoder=["","ID - уникальный числовой идентификатор энкодера. Присваивается автоматически.","Pin - Уникальный номер пина.","Encoder A (ID) - Основной пин энкодера A (DT).","Encoder B (ID) - Дополнительный пин энкодера B (CLK).","PWM connection - Подключение ШИМ для управления яркостью (диммер).","Dimmer value (0-100) - Текущее значение диммера от 0 до 100.","Duty on restore - Восстановление значения скважности (яркости) при включении контроллера.","INFO - Укажите название данного энкодера для быстрой навигации.","On/Off - Включение или отключение обработчика энкодера.","Action - Кнопка Edit позволяет зайти в меню настроек энкодера.","PWM Frequency - Частота ШИМ управляемого устройства (в герцах).","Resolution (steps) - Максимальное количество шагов от 0 до 100% для ШИМ устройства."],rulangtimers=["","No - Уникальный числовой идентификатор задачи (cron). Присваивается автоматически.","Cron - Сконфигурируйте расписание (cron) для выполнения задачи.","Script - Какое действие (скрипт) должно выполниться в указанное в таймере время.",'Info - Дайте название выбранному таймеру для быстрой навигации, например "Полив газона". Не более 30-ти символов!',"On/Off - Вкл/Откл выполнение данной задачи.","Action - Кнопка Edit позволяет зайти в меню настроек задачи."],rulangsettings=["","Login - Введите имя пользователя для входа в систему. Используется при авторизации в веб-интерфейсе.","Password - Введите пароль для входа в систему. Рекомендуется использовать надёжный пароль.","Time zone UTC - Выберите свой часовой пояс. Влияет на отображение времени и расчёт восхода/заката.","IP address - Введите статический IP-адрес устройства. После перезагрузки STM32 будет доступен по этому адресу. Формат: 192.168.1.100","Subnet mask - Введите маску подсети. Определяет диапазон адресов вашей локальной сети. Формат: 255.255.255.0","Default gateway - Введите IP-адрес шлюза по умолчанию (обычно адрес вашего роутера). Формат: 192.168.1.1","Token - Секретный ключ для авторизации API-запросов. Используется в URL командах управления устройством. Пример: /api/Token/switch?id=1&onoff=1","Host - Введите IP-адрес или доменное имя MQTT-брокера. Пример: 192.168.1.50 или broker.hivemq.com","Port - Укажите порт MQTT-брокера. Стандартный порт: 1883 (без шифрования), 8883 (с TLS).","Client - Уникальный идентификатор клиента MQTT. Каждое устройство должно иметь свой уникальный Client ID.","User - Имя пользователя для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","Password - Пароль для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","TX topic - Исходящий топик MQTT. На этот топик устройство публикует свои данные и события. Пример: Swarm","RX topic - Входящий топик MQTT. С этого топика устройство получает команды управления. Пример: Swarm","HTTPS domain - Доменное имя для HTTPS-соединения. Необходим действующий SSL-сертификат для этого домена. Пример: zagotovka.ddns.net",'Private Key - Закрытый ключ SSL-сертификата в формате PEM. Начинается с "-----BEGIN EC PRIVATE KEY-----". Хранится в зашифрованном виде.','Public Key - Публичный сертификат SSL в формате PEM. Начинается с "-----BEGIN CERTIFICATE-----". Используется для HTTPS-соединения.',"Longitude - Долгота вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 37.618 (Москва)","Latitude - Широта вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 55.751 (Москва)","Sunrise - Время восхода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на восходе.","Sunset - Время захода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на закате.","Day Length - Продолжительность светового дня, рассчитывается автоматически на основе координат и текущей даты.","Next full moon - Дата и время следующего полнолуния, рассчитывается автоматически.","Date - Дата для автономного (offline) режима в формате дд.мм.гг. Используется когда нет доступа к NTP-серверу. Пример: 15.03.25","Time - Время для автономного (offline) режима в формате чч:мм:сс. Используется когда нет доступа к NTP-серверу. Пример: 14:30:00"],ruLangsecurity=["","RXD Pin - Пин приема данных (RX).","TXD Pin - Пин передачи данных (TX).","Phone Number - Номер телефона для отправки SMS и звонков.","Info - Дополнительная информация для быстрой навигации.","OnOff - Включение или отключение модуля SIM800L.","Action - Кнопка Edit позволяет зайти в меню настроек."],ruLangsecuritypins=["","ID - уникальный числовой идентификатор пина. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type of sensor - Тип подключенного сенсора (PIR, Normal open, Normal close).","Action - Действие, выполняемое при срабатывании сенсора.","Send SMS - Отправлять ли SMS при срабатывании сенсора (YES/NO).","INFO - Дополнительная информация для быстрой навигации.","On/Off - Включение или отключение охранного пина.","Edit Pin - Редактирование настроек охранного пина."],rulange1Wire=["","ID - Уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового пина, к которому подключена шина 1-Wire.","Selected sensor - Адрес выбранного и привязанного к этому пину уникального 1-Wire датчика (например, DS18B20).","Count of sensors - Количество найденных 1-Wire температурных датчиков на данном пине.","On/Off - Функция включения или отключения опроса подключенных датчиков на данной шине.","Actions - Кнопка Edit для привязки конкретного датчика к этому соединению."],enLangswitch=["","ID - A unique numerical identifier of the switch. Assigned automatically","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","Device connection - Here will appear one or more devices/relays of pin(s) with which this switch interacts.",'INFO - Give a name of this switch for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the switch state handler on this pin.","Action - The Edit button allows you to access the switch settings menu."],enLangselect=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type(s) of pin(s) - Select the operating mode of this pin from the provided options."],enlangbutton=["","ID - A unique numerical identifier of the button. Assigned automatically.","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","sclick - Command to execute when the button is pressed once.","dclick - Command to execute when the button is pressed twice.","lpress - Command to execute when the button is long pressed.",'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the button function on this pin.","Action - The Edit button allows you to access the button settings menu."],enencoder=["","ID - A unique numerical identifier of the encoder. Assigned automatically.","PIN - The unique number of the pin.","Encoder A (ID) - Main pin of encoder A (DT).","Encoder B (ID) - Additional pin of encoder B (CLK).","PWM connection - PWM connection for brightness control (dimmer).","Dimmer value (0-100) - Current dimmer value from 0 to 100.","Duty on restore - Value of duty cycle (brightness) to restore when the controller is turned on.","INFO - Give a name to this encoder for quick navigation.","On/Off - Enable or disable the encoder handler.","Action - The Edit button allows you to access the encoder settings menu.","PWM Frequency - PWM frequency of the controlled device (in Hertz).","Resolution (steps) - Maximum number of steps from 0 to 100% for the PWM device."],enlangtimers=["","No - A unique numerical identifier of the task (cron). Assigned automatically.","Cron - Configure a schedule (cron) to perform the action.","Script - What action (script) must be performed at the time specified in the timer.",'Info - Give a name to the selected timer for quick navigation, e.g."Lawn Watering", "Backyard Light", etc. No more than 30 characters!',"On/Off - Enable or disable the execution of this task.","Action - The Edit button allows you to access the task settings menu."],enlangsettings=["","Login - Enter the username for logging into the system. Used for web interface authentication.","Password - Enter your password for the system. It is recommended to use a strong password.","Time zone UTC - Select your time zone. Affects time display and sunrise/sunset calculations.","IP address - Enter a static IP address for the device. After reboot, STM32 will be available at this address. Format: 192.168.1.100","Subnet mask - Enter the subnet mask. Defines the range of addresses in your local network. Format: 255.255.255.0","Default gateway - Enter the default gateway IP address (usually your router address). Format: 192.168.1.1","Token - Secret key for API request authorization. Used in device control URL commands. Example: /api/Token/switch?id=1&onoff=1","Host - Enter the IP address or domain name of the MQTT broker. Example: 192.168.1.50 or broker.hivemq.com","Port - Specify the MQTT broker port. Standard port: 1883 (no encryption), 8883 (with TLS).","Client - Unique MQTT client identifier. Each device must have its own unique Client ID.","User - Username for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","Password - Password for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","TX topic - Outgoing MQTT topic. The device publishes its data and events to this topic. Example: Swarm","RX topic - Incoming MQTT topic. The device receives control commands from this topic. Example: Swarm","HTTPS domain - Domain name for HTTPS connection. A valid SSL certificate for this domain is required. Example: zagotovka.ddns.net",'Private Key - SSL certificate private key in PEM format. Starts with "-----BEGIN EC PRIVATE KEY-----". Stored in encrypted form.','Public Key - SSL public certificate in PEM format. Starts with "-----BEGIN CERTIFICATE-----". Used for HTTPS connection.',"Longitude - Longitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 37.618 (Moscow)","Latitude - Latitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 55.751 (Moscow)","Sunrise - Sunrise time is calculated automatically based on your coordinates. The slider enables/disables the action at sunrise.","Sunset - Sunset time is calculated automatically based on your coordinates. The slider enables/disables the action at sunset.","Day Length - Duration of daylight, calculated automatically based on coordinates and current date.","Next full moon - Date and time of the next full moon, calculated automatically.","Date - Date for offline mode in dd.mm.yy format. Used when there is no access to the NTP server. Example: 15.03.25","Time - Time for offline mode in hh:mm:ss format. Used when there is no access to the NTP server. Example: 14:30:00"],enLangsecurity=["","RXD Pin - Receive Data Pin (RX).","TXD Pin - Transmit Data Pin (TX).","Phone Number - Phone number for SMS notifications and calls.","Info - Additional information for quick navigation.","OnOff - Enable or disable the SIM800L module.","Action - The Edit button allows you to access the settings menu."],enLangsecuritypins=["","ID - A unique numerical identifier of the pin. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type of sensor - Type of connected sensor (PIR, Normal open, Normal close).","Action - Action to perform when the sensor is triggered.","Send SMS - Whether to send SMS when the sensor is triggered (YES/NO).","INFO - Additional information for quick navigation.","On/Off - Enable or disable the security pin.","Edit Pin - The Edit button allows you to access the security pin settings."],enlange1Wire=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital pin to which the 1-Wire bus is connected.","Selected sensor - Address of the selected and bound unique 1-Wire sensor to this pin (e.g., DS18B20).","Count of sensors - Number of found 1-Wire temperature sensors on this pin.","On/Off - The function of enabling or disabling polling of connected sensors on this bus.","Actions - The Edit button to bind a specific sensor to this connection."];function initGlobalTooltip$8(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,pt=$.offsetHeight,te=window.innerWidth,$t=dt.getBoundingClientRect();let Zt=$t.left+$t.width/2-_/2;Zt=Math.max(8,Math.min(Zt,te-_-8));let oe=$t.top-pt-8;oe<8&&(oe=$t.bottom+8),$.style.left=Zt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabSelect({}){const[$,k]=ut(null),[st,ct]=ut({}),[dt,_]=ut(null),[pt,te]=ut(!1),[$t,Zt]=ut(3),[oe,Xt]=ut(!1),[le,re]=ut("ru");lt(()=>{initGlobalTooltip$8()},[]);const pe=de=>{Xt(de)},xe=de=>oe&&(de===1||de===35),we=()=>fetch("api/select/get").then(de=>de.json()).then(de=>{const ye=de.data||de;k(ye),Xt(de.sim800l===1),de.lang&&re(de.lang);const Ee={};ye.forEach($e=>{Ee[`topin_${$e.id}`]=$e.topin.toString()}),ct(Ee)});lt(we,[]),lt(()=>{let de;return pt&&$t>0?de=setTimeout(()=>{Zt($t-1)},1e3):$t===0&&(te(!1),_(null)),()=>clearTimeout(de)},[pt,$t]);const ue=async de=>{de.preventDefault();const ye=new FormData(de.target),Ee={lang:le,sim800l:oe?1:0,data:[]};$.forEach($e=>{const Te=ye.get(`topin_${$e.id}`);Ee.data.push({id:$e.id,pins:$e.pins,topin:parseInt(Te),pwm:$e.pwm,i2cdata:$e.i2cdata,i2cclok:$e.i2cclok})}),_("submitting"),te(!0),Zt(3);try{const $e=await fetch("api/select/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Ee)});if(!$e.ok)throw new Error("Network response was not ok");const Te=await $e.json();_("success"),console.log("Success:",Te);const ve={};Ee.data.forEach(ae=>{ve[`topin_${ae.id}`]=ae.topin.toString()}),ct(ae=>({...ae,...ve})),we()}catch($e){_("error"),console.error("Error:",$e)}},he=de=>{const{name:ye,value:Ee}=de.target;ct($e=>({...$e,[ye]:Ee}))};if(!$)return"";const me=()=>({langselect:le==="ru"?ruLangselect:enLangselect}),_e=(de,ye)=>{const Ee=me(),Te=(Ee[de]&&Ee[de][ye]?Ee[de][ye]:"").split(" "),ve=[];for(let ae=0;ae<Te.length;ae+=15)ve.push(Te.slice(ae,ae+15).join(" "));return ve.join("<br>")},Ce=de=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      style=${de.center?"text-align: center":""}
      data-tip=${_e("langselect",de.tooltipIndex)}
    >
      ${de.title}
    </th>
  `,Se=({id:de,value:ye,label:Ee,disabled:$e=!1,onChange:Te,checked:ve})=>Et`
    <div class="relative">
      <input
        id="${de}_${ye}"
        class="sr-only peer"
        type="radio"
        name="topin_${de}"
        value="${ye}"
        checked=${ve}
        onChange=${Te}
        disabled=${$e}
        aria-label="${Ee}"
      />
      <label
        for="${de}_${ye}"
        class="cursor-pointer px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300 
               ${$e?"text-gray-400 cursor-not-allowed opacity-60":"text-slate-700 hover:bg-black/5"}
               peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-cyan-500 peer-checked:text-white peer-checked:shadow-sm"
      >
        ${Ee}
      </label>
    </div>
  `,Oe=({d:de})=>Et`
    <tr class="${xe(de.id)?"bg-red-200/50 opacity-50 pointer-events-none":de.id%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-2 text-sm text-slate-800">${de.id}</td>
      <td class="px-6 py-2 text-sm text-slate-800 font-medium">${de.pins}</td>
      <td class="px-2 py-2">
        <div class="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
          <${Se} id=${de.id} value="0"  label="NONE"     checked=${st[`topin_${de.id}`]==="0"}  onChange=${he} />
          <${Se} id=${de.id} value="3"  label="SWITCH"   checked=${st[`topin_${de.id}`]==="3"}  onChange=${he} />
          <${Se} id=${de.id} value="1"  label="BUTTON"   checked=${st[`topin_${de.id}`]==="1"}  onChange=${he} />
          <${Se} id=${de.id} value="2"  label="DEVICE"   checked=${st[`topin_${de.id}`]==="2"}  onChange=${he} />
          <${Se} id=${de.id} value="4"  label="1-WIRE"   checked=${st[`topin_${de.id}`]==="4"}  onChange=${he} />
          <${Se} id=${de.id} value="5"  label="PWM"      disabled=${de.pwm==0} checked=${st[`topin_${de.id}`]==="5"}  onChange=${he} />
          <${Se} id=${de.id} value="8"  label="Enc.OutA" checked=${st[`topin_${de.id}`]==="8"}  onChange=${he} />
          <${Se} id=${de.id} value="9"  label="Enc.OutB" checked=${st[`topin_${de.id}`]==="9"}  onChange=${he} />
          <${Se} id=${de.id} value="10" label="Security" disabled=${de.monitoring==0} checked=${st[`topin_${de.id}`]==="10"} onChange=${he} />
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
              ${pt?`Please wait ${$t} sec.`:"Submit"}
            </button>

            <div class="flex items-center gap-3">
              <span class="text-slate-600 font-bold uppercase tracking-widest text-2xl drop-shadow-sm">SIM800L</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  checked=${oe}
                  onChange=${de=>pe(de.target.checked)}
                />
                <div class="w-[42px] h-[22px] bg-slate-200/80 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300/50 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-400 peer-checked:to-cyan-500 shadow-inner"></div>
              </label>
            </div>
          </div>

          ${dt==="success"&&Et`
            <div class="mb-6 bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
              <strong class="font-bold">Успех! </strong>
              <span class="block sm:inline">Данные успешно сохранены. Идет запись на USB флешку. Кнопка станет активной через ${$t} секунд.</span>
            </div>
          `}
          ${dt==="error"&&Et`
            <div class="mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
              <strong class="font-bold">Ошибка!</strong>
              <span class="block sm:inline">Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз через ${$t} секунд.</span>
            </div>
          `}

          <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner overflow-auto">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <${Ce} title="ID" tooltipIndex=${1} />
                    <${Ce} title="Pin" tooltipIndex=${2} />
                    <${Ce} title="Type(s) of pin(s)" tooltipIndex=${3} center=${!0} />
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
              class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${pt?"bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none":"bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"}`}
              disabled=${pt}
            >
              ${pt?`Please wait ${$t} sec.`:"Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `}function ModalSwitch({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedSwitch:_,onSwitchChange:pt,connectionOptions:te,SliderComponent:$t=MyPolzunok}){const[Zt,oe]=ut((_==null?void 0:_.info)||""),[Xt,le]=ut((_==null?void 0:_.onoff)||0),[re,pe]=ut((_==null?void 0:_.ptype)||0),[xe,we]=ut((_==null?void 0:_.setrpins)||""),[ue,he]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(ve=>{if(!ve.ok)throw new Error(`HTTP error! status: ${ve.status}`);return ve.json()}).then(ve=>{if(!ve||!ve.data||!Array.isArray(ve.data)){console.error("Invalid data format:",ve),he([]);return}const ae=ve.data.filter(ge=>ge.topin===2);he(ae)}).catch(ve=>{console.error("Error fetching pin config:",ve),he([])})},[]);const me=ve=>{ve.preventDefault();const ae=new FormData(ve.target),ge=Object.fromEntries(ae);if(ge.id=_.id,ge.pins=_.pins,$==="edit")ge.onoff=Xt;else if($==="connection"){const se=ue.find(ht=>ht.pins===ge.setrpins);se&&(ge.pinact={..._.pinact,[se.id]:se.pins})}fetch("/api/switch/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ge)}).then(se=>se.json()).then(se=>{console.log("Success:",se),pt({..._,...ge}),st(),window.location.href="/#/switch"}).catch(se=>{console.error("Error:",se)})},_e=ve=>{we(ve.target.value)},Ce=ve=>{pe(parseInt(ve.target.value))},Se=ve=>{oe(ve.target.value)},Oe=ve=>{le(ve)},de=ve=>{ct&&ve.target===ve.currentTarget&&st()},ye=()=>{pe(0),oe(""),le(0)},$e=Et`
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
          ${(()=>{if(k==="TabSwitch"){if($==="connection")return Et`
          <form onsubmit=${me}>
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
                        value=${ue.some(ve=>ve.pins===xe)?xe:""}
                        onchange=${_e}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select a connection</option>
                        ${ue.map(ve=>Et`
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
          <form onsubmit=${me}>
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
                        value=${re}
                        onchange=${Ce}
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
                        value=${Zt}
                        oninput=${Se}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${$t}
                        value=${Xt}
                        onChange=${Oe}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-between items-center mt-4">
              <button
                type="button"
                onclick=${ye}
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
  `,Te=at(null);return lt(()=>{const ve=document.createElement("div");return ve.id="modal-portal",document.body.appendChild(ve),Te.current=ve,()=>{O(null,ve),document.body.removeChild(ve)}},[]),lt(()=>{Te.current&&O($e,Te.current)}),null}function initGlobalTooltip$7(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block";const _=dt.getBoundingClientRect();$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const pt=$.offsetWidth,te=$.offsetHeight,$t=window.innerWidth;let Zt=_.left+_.width/2-pt/2;Zt=Math.max(8,Math.min(Zt,$t-pt-8));let oe=_.top-te-8;oe<8&&(oe=_.bottom+8),$.style.left=Zt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabSwitch({}){const[$,k]=ut(null),[st,ct]=ut(null),[dt,_]=ut(!1),[pt,te]=ut(null),[$t,Zt]=ut(null),[oe,Xt]=ut(!1),[le,re]=ut("ru"),[pe,xe]=ut(null),[we,ue]=ut([]),[he,me]=ut(""),[_e,Ce]=ut(!1);lt(()=>{initGlobalTooltip$7()},[]);const Se=()=>Promise.all([fetch("/api/switch/get").then(ee=>ee.json()),fetch("/api/pintopin/get").then(ee=>ee.json())]).then(([ee,vt])=>{re(ee.lang),xe(ee.switches),k(ee),ue(vt),me(`Pintopin data: ${JSON.stringify(vt,null,2)}

Switch data: ${JSON.stringify(ee.switches,null,2)}`),console.log("Pintopin data:",vt),console.log("Switch data:",ee.switches)}).catch(ee=>{console.error("Error fetching data:",ee),me(`Error fetching data: ${ee.message}`)}),Oe=()=>{fetch("/api/switch/get").then(ee=>ee.json()).then(ee=>{xe(ee.switches),re(ee.lang),console.log("Updated switch data:",ee.switches)}).catch(ee=>{console.error("Error fetching switch data:",ee)})},de=()=>{fetch("/api/pintopin/get").then(ee=>ee.json()).then(ee=>{ue(ee),console.log("Updated pintopin data:",ee)}).catch(ee=>{console.error("Error fetching pintopin data:",ee)})};lt(()=>{Oe(),de();const ee=setInterval(()=>{Oe(),de()},1e3);return()=>clearInterval(ee)},[]);const ye=ee=>{const vt=new Map,ie=pe.find(ce=>ce.id===ee);return ie&&ie.pinact&&Object.entries(ie.pinact).forEach(([ce,fe])=>{vt.set(ce,{pin:ce,relayId:fe})}),we.forEach(ce=>{if(ce.idin===ee){const fe=`${ce.pins}(${ce.idout})`;vt.has(fe)||vt.set(fe,{pin:ce.pins,relayId:ce.idout})}}),Array.from(vt.values())},Ee=()=>({langswitch:le==="ru"?ruLangswitch:enLangswitch}),$e=(ee,vt)=>{const ie=Ee(),fe=(ie[ee]&&ie[ee][vt]||"").split(" "),ke=[];let mt="";for(let ne=0;ne<fe.length;ne++){const be=fe[ne];mt.length+be.length+1<=200?mt+=(mt.length>0?" ":"")+be:(mt.length>0&&ke.push(mt),mt=be)}return mt.length>0&&ke.push(mt),ke.join("<br>")},Te=(ee,vt)=>{console.log("Удаление соединения:",ee,vt);const[ie,ce]=vt.split("("),fe=ce?parseInt(ce):null;fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ee,pin:ie.trim()})}).then(ke=>ke.json()).then(ke=>{ct(ke),xe(mt=>mt.map(ne=>{if(ne.id===ee){const be={...ne.pinact};return delete be[ie.trim()],{...ne,pinact:be}}return ne})),ue(mt=>mt.filter(ne=>!(ne.idin===ee&&ne.pins===ie.trim()&&(fe===null||ne.idout===fe))))}).then(()=>{console.log("Соединение удалено успешно"),Se()}).catch(ke=>{console.error("Ошибка при удалении соединения:",ke)})},ve=(ee,vt)=>{te(ee),Zt(vt),_(!0)},ae=()=>{_(!1),te(null),Zt(null)},ge=ee=>{console.log("handleSwitchChange:",ee),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ee.id,onoff:ee.onoff})}).then(vt=>vt.json()).then(vt=>{console.log("Response from /api/onoff/set:",vt)}).catch(vt=>{console.error("Error calling /api/onoff/set:",vt)}),ae()},se={ru:Et`
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
    `},ht=ee=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${$e("langswitch",ee.tooltipIndex)}
    >
      ${ee.title}
    </th>
  `,Yt=({d:ee,index:vt})=>{const ie=ye(ee.id);return Et`
      <tr class="${vt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${ee.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${ee.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][ee.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono">
          ${ie.map(({pin:ce,relayId:fe})=>Et`
              <span class="mr-2 inline-flex items-center">
                ${ce}${fe!==void 0?`(${fe})`:""}
                <button
                  onClick=${ke=>{ke.preventDefault(),Te(ee.id,`${ce}(${fe})`)}}
                  class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                  title="Remove connection"
                >
                  [x]
                </button>
              </span>
            `)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${ee.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${ee.onoff}
            onChange=${ce=>ge({...ee,onoff:ce})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>ve("connection",ee)}
            class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
          >
            Connection
          </button>
          <span class="text-slate-300">|</span>
          <button
            onClick=${()=>ve("edit",ee)}
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
                      <${ht} title="ID" tooltipIndex=${1} />
                      <${ht} title="Pin" tooltipIndex=${2} />
                      <${ht} title="Pullup type" tooltipIndex=${3} />
                      <${ht} title="Device connection" tooltipIndex=${4} />
                      <${ht} title="INFO" tooltipIndex=${5} />
                      <${ht} title="On/Off" tooltipIndex=${6} />
                      <${ht} title="Action" tooltipIndex=${7} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${pe.map((ee,vt)=>Et`<${Yt} d=${ee} index=${vt} key=${ee.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>Xt(!oe)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${oe?"Hide Help":"Show Help"}
              </button>
            </div>

            ${oe&&Et`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${se[le]}
                </div>
              `}
          </div>
        </div>

        ${dt&&Et`
            <${ModalSwitch}
              modalType=${pt}
              page="TabSwitch"
              hideModal=${ae}
              title=${pt==="connection"?"Edit Connection":"Edit switch"}
              selectedSwitch=${$t}
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
  `,portalRef=at(null);return lt(()=>{const $=document.createElement("div");return $.id="modal-portal",document.body.appendChild($),portalRef.current=$,()=>{O(null,$),document.body.removeChild($)}},[]),lt(()=>{portalRef.current&&O(modalContent,portalRef.current)}),null};function initGlobalTooltip$6(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,pt=$.offsetHeight,te=window.innerWidth,$t=dt.getBoundingClientRect();let Zt=$t.left+$t.width/2-_/2;Zt=Math.max(8,Math.min(Zt,te-_-8));let oe=$t.top-pt-8;oe<8&&(oe=$t.bottom+8),$.style.left=Zt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabButton=()=>{const[$,k]=ut(null),[st,ct]=ut([]),[dt,_]=ut(null),[pt,te]=ut(null),[$t,Zt]=ut(!1),[oe,Xt]=ut(null),[le,re]=ut(null),[pe,xe]=ut(!1),[we,ue]=ut("ru"),[he,me]=ut(""),[_e,Ce]=ut(!0);lt(()=>{initGlobalTooltip$6()},[]);const Se={ru:Et`
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
                <td class="border px-4 py-2">30#SL*</td>
                <td class="border px-4 py-2">Выполняет действие, прописанное в SINGLE CLICK для кнопки с id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#DC*</td>
                <td class="border px-4 py-2">Выполняет действие, прописанное в DOUBLE CLICK для кнопки с id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#LP*</td>
                <td class="border px-4 py-2">Выполняет действие, прописанное в LONG PRESS для кнопки с id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Звонок)</td>
                <td class="border px-4 py-2">30#3*</td>
                <td class="border px-4 py-2">Аналог 30#SL*. Выполняет SINGLE CLICK. (в тональном режиме букв нет)</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Звонок)</td>
                <td class="border px-4 py-2">30#4*</td>
                <td class="border px-4 py-2">Аналог 30#DC*. Выполняет DOUBLE CLICK.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Звонок)</td>
                <td class="border px-4 py-2">30#5*</td>
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
            Примечание: При желании, вы можете использовать цифровые команды (30#3*, 30#4*, 30#5*) в том числе и в SMS-сообщениях.
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
                <td class="border px-4 py-2">30#SL*</td>
                <td class="border px-4 py-2">Executes the action specified in SINGLE CLICK for button with id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#DC*</td>
                <td class="border px-4 py-2">Executes the action specified in DOUBLE CLICK for button with id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">SMS</td>
                <td class="border px-4 py-2">30#LP*</td>
                <td class="border px-4 py-2">Executes the action specified in LONG PRESS for button with id = 30.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Call)</td>
                <td class="border px-4 py-2">30#3*</td>
                <td class="border px-4 py-2">Same as 30#SL*. Executes SINGLE CLICK. (since letters are unavailable in DTMF)</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Call)</td>
                <td class="border px-4 py-2">30#4*</td>
                <td class="border px-4 py-2">Same as 30#DC*. Executes DOUBLE CLICK.</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">DTMF (Call)</td>
                <td class="border px-4 py-2">30#5*</td>
                <td class="border px-4 py-2">Same as 30#LP*. Executes LONG PRESS.</td>
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
            Note: You can also use the digital commands (30#3*, 30#4*, 30#5*) natively via SMS.
          </div>
        </div>
      </div>
    `},Oe=()=>{fetch("/api/button/get").then(ht=>ht.json()).then(ht=>{_(ht.buttons),ue(ht.lang),console.log("Updated button data:",ht.buttons)}).catch(ht=>{console.error("Error fetching button data:",ht)})};lt(()=>{Oe();let ht;return _e&&(ht=setInterval(()=>{Oe()},1e3)),()=>{ht&&clearInterval(ht)}},[_e]);const de=ht=>{const Yt=new Map,ee=dt.find(vt=>vt.id===ht);return ee&&ee.pinact&&Object.entries(ee.pinact).forEach(([vt,ie])=>{Yt.set(vt,{pin:vt,relayId:ie})}),st.forEach(vt=>{if(vt.idin===ht){const ie=`${vt.pins}(${vt.idout})`;Yt.has(ie)||Yt.set(ie,{pin:vt.pins,relayId:vt.idout})}}),Array.from(Yt.values())},ye=()=>({langbutton:we==="ru"?rulangbutton:enlangbutton}),Ee=(ht,Yt)=>{const ee=ye(),vt=ee[ht]&&ee[ht][Yt]?ee[ht][Yt]:"";return $e(vt)},$e=(ht,Yt=100)=>{if(!ht||typeof ht!="string")return"";const ee=[];let vt="";const ie=ht.split(`
`);return ie.forEach((ce,fe)=>{ce.split(" ").filter(mt=>mt.length>0).forEach(mt=>{const ne=vt.length===0?mt:" "+mt;vt.length+ne.length<=Yt?vt+=ne:(vt.length>0&&ee.push(vt),vt=mt)}),vt.length>0&&(ee.push(vt),vt=""),fe<ie.length-1&&ee.push("")}),vt.length>0&&ee.push(vt),ee.join(`
`)},Te=(ht,Yt)=>{Xt(ht),re(Yt),Zt(!0),Ce(!1)},ve=()=>{Zt(!1),Xt(null),re(null),Ce(!0)},ae=ht=>{console.log("handleButtonChange:",ht),_(Yt=>Yt.map(ee=>ee.id===ht.id?{...ee,...ht}:ee)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ht.id,onoff:ht.onoff})}).then(Yt=>Yt.json()).then(Yt=>{console.log("Response from /api/onoff/set:",Yt)}).catch(Yt=>{console.error("Error calling /api/onoff/set:",Yt)}),ve()},ge=ht=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Ee("langbutton",ht.tooltipIndex)}
    >
      ${ht.title}
    </th>
  `,se=({d:ht,index:Yt})=>(de(ht.id),Et`
      <tr class="${Yt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${ht.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${ht.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][ht.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${$e(ht.sclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${$e(ht.dclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${$e(ht.lpress)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${ht.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${ht.onoff}
            onChange=${ee=>ae({...ht,onoff:ee})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>Te("edit",ht)}
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
                      <${ge} title="ID" tooltipIndex=${1} />
                      <${ge} title="Pin" tooltipIndex=${2} />
                      <${ge} title="Pullup type" tooltipIndex=${3} />
                      <${ge} title="SINGLE CLICK" tooltipIndex=${4} />
                      <${ge} title="DOUBLE CLICK" tooltipIndex=${5} />
                      <${ge} title="LONG PRESS" tooltipIndex=${6} />
                      <${ge} title="INFO" tooltipIndex=${7} />
                      <${ge} title="On/Off" tooltipIndex=${8} />
                      <${ge} title="Action" tooltipIndex=${9} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${dt.map((ht,Yt)=>Et`<${se} d=${ht} index=${Yt} key=${ht.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>xe(!pe)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${pe?"Hide Help":"Show Help"}
              </button>
            </div>

            ${pe&&Et`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${Se[we]}
                </div>
              `}
          </div>
        </div>
      </div>
    </div>

    ${$t&&Et`
        <${ModalButton}
          modalType=${oe}
          page="TabButton"
          hideModal=${ve}
          title=${oe==="connection"?"Edit Connection":"Edit Button pin"}
          selectedButton=${le}
          onButtonChange=${ae}
        />
      `}
  `:""};function ModalEncoder({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedEncoder:_,handleEncoderChange:pt,connectionOptions:te,SliderComponent:$t=MyPolzunok}){const[Zt,oe]=ut((_==null?void 0:_.info)||""),[Xt,le]=ut((_==null?void 0:_.onoff)===1),[re,pe]=ut({pin:(_==null?void 0:_.encdrbpin)||"",id:(_==null?void 0:_.encoderb)||""}),[xe,we]=ut(Object.entries(_.pinact||{})[0]||["",""]),[ue,he]=ut([]),[me,_e]=ut([]),[Ce,Se]=ut([]),Oe=_.pwmmax||100,[de,ye]=ut(_.dvalue||0),[Ee,$e]=ut(_.ponr||0),[Te,ve]=ut(_.pwm||1e7),ae=ne=>Math.round(ne*Oe/100);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(ne=>{if(!ne.ok)throw new Error(`HTTP error! status: ${ne.status}`);return ne.json()}).then(ne=>{if(!ne||!ne.data||!Array.isArray(ne.data)){console.error("Invalid data format:",ne),he([]),_e([]),Se([]);return}const be=ne.data.filter(Pe=>Pe.topin===2),Ie=ne.data.filter(Pe=>Pe.topin===9),Me=ne.data.filter(Pe=>Pe.topin===5);if(he(be),_e(Ie),Se(Me),_.encoderb||_.encdrbpin){const Pe=Ie.find(Ne=>String(Ne.id)===String(_.encoderb)||Ne.pins===_.encdrbpin);pe({pin:Pe?Pe.pins:"",id:Pe?Pe.id:""})}}).catch(ne=>{console.error("Error fetching pin config:",ne),he([]),_e([]),Se([])})},[_]);const ge=ne=>{if(ne.preventDefault(),!(ne.target instanceof HTMLFormElement))return;let Ie={};if($==="edit")Ie={topin:8,id:_.id,pins:_.pins,pwm:parseInt(Te),pwmmax:_.pwmmax,dvalue:parseInt(de),ponr:parseInt(Ee),info:Zt,onoff:Xt?1:0};else if($==="connection"){const Pe=xe&&xe[0]&&xe[1]!==void 0?{[xe[0]]:parseInt(xe[1])}:{};Ie={id:_.id,pins:_.pins,pwm:parseInt(Te)},re&&re.id!==void 0&&re.id!==""?(Ie.encoderb=parseInt(re.id),Ie.encdrbpin=re.pin):(Ie.encoderb=255,Ie.encdrbpin=""),Ie.pinact=Pe}console.log("Sending JSON to STM32:",JSON.stringify(Ie)),fetch("/api/encoder/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Ie)}).then(Me=>Me.json()).then(Me=>{pt({..._,...Ie}),st()}).catch(Me=>console.error("Error saving encoder:",Me))},se=ne=>{oe(ne.target.value)},ht=ne=>{le(ne)},Yt=ne=>{const be=me.find(Ie=>Ie.pins===ne.target.value);pe({pin:ne.target.value,id:be?be.id:""})},ee=ne=>{if(!ne.target.value)we(["",""]);else{const be=ne.target.value.split("|");we([be[0],be[1]])}},vt=ne=>{ye(ne.target.value)},ie=ne=>{$e(ne.target.value)},ce=ne=>{const be=ne/1e3;return be<=4e4?{cls:"text-green-600",msg:"Optimal range"}:be<=2e5?{cls:"text-yellow-600",msg:"Precision might drop"}:{cls:"text-red-600",msg:"Expert mode: low precision"}},ke=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick=${ne=>ct&&ne.target===ne.currentTarget&&st()}
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
          <form onsubmit=${ge}>
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
                        value=${me.some(ne=>ne.pins===re.pin)?re.pin:""}
                        onchange=${Yt}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select Encoder B</option>
                        ${me.map(ne=>Et`
                            <option value=${ne.pins}>
                              ${ne.pins} (ID: ${ne.id})
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
                        value=${Ce.some(ne=>String(ne.pins)===String(xe[0]))?`${xe[0]}|${xe[1]}`:""}
                        onchange=${ee}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select PWM connection</option>
                        ${Ce.map(ne=>Et`
                            <option value=${`${ne.pins}|${ne.id}`}>
                              ${ne.pins} (ID: ${ne.id})
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
          <form onsubmit=${ge}>
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
                        value=${Te}
                        oninput=${ne=>ve(ne.target.value)} 
                        class="border rounded p-2 w-full font-mono" 
                        placeholder="50 - 2000000000"
                      />
                      <div class="text-xs ${ce(Te).cls}">
                        ${ce(Te).msg}
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
                        value=${de}
                        oninput=${vt}
                        class="border rounded p-2 w-full"
                      />
                      <div class="text-xs text-gray-500">
                        ${de}% = ${ae(parseInt(de)||0)} / ${Oe} steps
                      </div>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Duty on restore</td>
                    <td class="p-2">
                      <select
                        value=${Ee}
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
                        value=${Zt}
                        oninput=${se}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${$t}
                        value=${Xt}
                        onChange=${ht}
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
  `,mt=at(null);return lt(()=>{const ne=document.createElement("div");return ne.id="encoder-modal-portal",document.body.appendChild(ne),mt.current=ne,()=>{O(null,ne),document.body.removeChild(ne)}},[]),lt(()=>{mt.current&&O(ke,mt.current)}),null}function initGlobalTooltip$5(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,pt=$.offsetHeight,te=window.innerWidth,$t=dt.getBoundingClientRect();let Zt=$t.left+$t.width/2-_/2;Zt=Math.max(8,Math.min(Zt,te-_-8));let oe=$t.top-pt-8;oe<8&&(oe=$t.bottom+8),$.style.left=Zt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabEncoder({}){{const[$,k]=ut(null),[st,ct]=ut(null),[dt,_]=ut(!1),[pt,te]=ut(null),[$t,Zt]=ut(null),[oe,Xt]=ut(!1),[le,re]=ut("ru"),[pe,xe]=ut([]),we=at(!1);lt(()=>{initGlobalTooltip$5()},[]);const ue=()=>Promise.all([fetch("/api/encoder/get").then(ht=>ht.json()),fetch("/api/pintopin/get").then(ht=>ht.json())]).then(([ht,Yt])=>{re(ht.lang),k(ht.encoders),xe(Yt),console.log("Encoder data:",ht.encoders),console.log("Pintopin data:",Yt)}).catch(ht=>{console.error("Error fetching data:",ht)}),he=()=>{fetch("/api/encoder/get").then(ht=>ht.json()).then(ht=>{if(we.current){console.log("Polling skip: onoff request in flight");return}k(ht.encoders),re(ht.lang),console.log("Updated encoder data:",ht.encoders)}).catch(ht=>{console.error("Error fetching encoder data:",ht)})},me=()=>{fetch("/api/pintopin/get").then(ht=>ht.json()).then(ht=>{xe(ht),console.log("Updated pintopin data:",ht)}).catch(ht=>{console.error("Error fetching pintopin data:",ht)})};lt(()=>{he(),me();const ht=setInterval(()=>{he(),me()},500);return()=>clearInterval(ht)},[]);const _e=ht=>{k(Yt=>Yt.map(ee=>ee.id===ht.id?ht:ee)),we.current=!0,fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ht.id,onoff:ht.onoff})}).then(Yt=>Yt.json()).then(Yt=>{console.log("Response from /api/onoff/set (Encoder):",Yt)}).catch(Yt=>{console.error("Error calling /api/onoff/set (Encoder):",Yt)}).finally(()=>{we.current=!1})},Ce=ht=>{const Yt=$.find(vt=>vt.id===ht),ee=[];return Yt&&Yt.pinact&&Object.entries(Yt.pinact).forEach(([vt,ie])=>{ee.push({pin:vt,idout:ie})}),ee},Se=ht=>{const Yt=ht/1e3;return Yt<=4e4?{cls:"text-green-600",msg:"✓"}:Yt<=2e5?{cls:"text-yellow-600",msg:"~"}:{cls:"text-red-600",msg:"!"}},Oe=ht=>{if(!ht)return"—";const Yt=ht/1e3;return Yt>=1e6?`${(Yt/1e6).toFixed(2)} MHz`:Yt>=1e3?`${(Yt/1e3).toFixed(1)} kHz`:`${Yt} Hz`},de=()=>({langbutton:le==="ru"?ruencoder:enencoder}),ye=(ht,Yt)=>{const ee=de(),vt=ee[ht]&&ee[ht][Yt]?ee[ht][Yt]:"";return Ee(vt)},Ee=(ht,Yt=50)=>{if(!ht||typeof ht!="string")return"";const ee=ht.split(" ");let vt=[],ie="";for(let ce=0;ce<ee.length;ce++)ie.length+ee[ce].length+1<=Yt?ie+=`${ie?" ":""}${ee[ce]}`:(ie&&vt.push(ie.trim()),ie=ee[ce]);return ie&&vt.push(ie.trim()),vt.join(`
`)},$e=(ht,Yt)=>{console.log("Deleting connection:",ht,Yt);const ee=Yt.split("(")[0].trim();fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ht,pin:ee})}).then(vt=>vt.ok?vt.json():vt.text().then(ie=>{throw new Error(`HTTP error! status: ${vt.status}, message: ${ie}`)})).then(vt=>{ct(vt),k(ie=>ie.map(ce=>{if(ce.id===ht){const fe={...ce.pinact};return delete fe[ee],{...ce,pinact:fe}}return ce})),xe(ie=>ie.filter(ce=>!(ce.idin===ht&&ce.pins===ee)))}).then(()=>{console.log("Connection deleted successfully"),ue()}).catch(vt=>{console.error("Error deleting connection:",vt)})},Te=(ht,Yt)=>{console.log("Opening modal:",ht,Yt),te(ht),Zt(Yt),_(!0)},ve=()=>{_(!1),te(null),Zt(null)},ae={ru:Et`
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
      `},ge=({title:ht,tooltipIndex:Yt})=>Et`
      <th
        class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
        data-tip=${ye("langbutton",Yt)}
      >
        ${ht}
      </th>
    `,se=({d:ht,index:Yt})=>{const ee=Ce(ht.id),vt=Se(ht.pwm||0);return Et`
        <tr class="${Yt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
          <td class="px-6 py-2 text-sm text-slate-800 font-medium">${ht.pins}(${ht.id})</td>
          <td class="px-6 py-2 text-sm text-slate-700">
            ${ht.encdrbpin?`${ht.encdrbpin}(${ht.encoderb})`:"Not set"}
          </td>
          <td class="px-6 py-2 text-sm text-slate-700 font-mono">
            ${ee.length>0?ee.map(({pin:ie,idout:ce})=>Et`
                    <span class="mr-2 inline-flex items-center">
                      ${ie}(${ce})
                      <button
                        onClick=${fe=>{fe.preventDefault(),$e(ht.id,`${ie}(${ce})`)}}
                        class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                        title="Remove connection"
                      >
                        [x]
                      </button>
                    </span>
                  `):"Not set"}
          </td>
          <td class="px-6 py-2 text-sm">
            <span class="font-mono text-slate-700">${Oe(ht.pwm)}</span>
            <span class="ml-1 font-bold ${vt.cls}">${vt.msg}</span>
          </td>
          <td class="px-6 py-2 font-mono text-sm text-blue-600">
            ${ht.pwmmax?`${ht.pwmmax} steps`:"—"}
          </td>
          <td class="px-6 py-2 text-sm text-slate-800">${ht.dvalue}</td>
          <td class="px-6 py-2 text-sm text-slate-700 font-semibold">${ht.ponr===1?"ON":"OFF"}</td>
          <td class="px-6 py-2 text-sm text-slate-600">${ht.info}</td>
          <td class="px-6 py-2">
            <${MyPolzunok}
              value=${ht.onoff}
              onChange=${ie=>_e({...ht,onoff:ie})}
            />
          </td>
          <td class="px-6 py-2 text-sm whitespace-nowrap">
            <button
              onClick=${()=>Te("connection",ht)}
              class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
            >
              Connection
            </button>
            <span class="text-slate-300">|</span>
            <button
              onClick=${()=>Te("edit",ht)}
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
                        <${ge} title="Encoder A (ID)" tooltipIndex=${3} />
                        <${ge} title="Encoder B (ID)" tooltipIndex=${4} />
                        <${ge} title="PWM connection" tooltipIndex=${5} />
                        <${ge} title="PWM Frequency" tooltipIndex=${11} />
                        <${ge} title="Resolution (steps)" tooltipIndex=${12} />
                        <${ge} title="Dimmer value (0-100)" tooltipIndex=${6} />
                        <${ge} title="Duty on restore" tooltipIndex=${7} />
                        <${ge} title="INFO" tooltipIndex=${8} />
                        <${ge} title="On/Off" tooltipIndex=${9} />
                        <${ge} title="Action" tooltipIndex=${10} />
                      </tr>
                    </thead>
                    <tbody id="tab1" class="divide-y divide-white/40">
                      ${$.map((ht,Yt)=>Et`<${se} d=${ht} index=${Yt} key=${ht.id} />`)}
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="flex justify-end mt-6">
                <button
                  onclick=${()=>Xt(!oe)}
                  class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
                >
                  ${oe?"Hide Help":"Show Help"}
                </button>
              </div>

              ${oe&&Et`
                  <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                    ${ae[le]}
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
                selectedEncoder=${$t}
                handleEncoderChange=${_e}
              />
            `}
        </div>
      </div>
    `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">Loading...</div>`}}function ModalCron({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedCron:_,handleCronChange:pt,connectionOptions:te,modalClass:$t,SliderComponent:Zt=MyPolzunok}){const[oe,Xt]=ut((_==null?void 0:_.info)||""),[le,re]=ut((_==null?void 0:_.onoff)===1),[pe,xe]=ut((_==null?void 0:_.activ)||""),[we,ue]=ut((_==null?void 0:_.cron)||""),[he,me]=ut(_.setrpins||""),_e=Te=>{Te.preventDefault();const ve=new FormData(Te.target),ae=Object.fromEntries(ve);ae.id=_.id,ae.pins=_.pins,$==="edit"?(ae.onoff=le?1:0,ae.info=oe,ae.cron=we,ae.activ=pe):$==="connection"&&(ae.setrpins=he),console.log("Data being sent to server:"),console.log(ae),console.log("Stringified data:"),console.log(JSON.stringify(ae)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ae)}).then(ge=>ge.json()).then(ge=>{console.log("Success:",ge),pt({..._,...ae}),st(),window.location.href="/#/cron"}).catch(ge=>{console.error("Error:",ge)})};lt(()=>{Xt((_==null?void 0:_.info)||""),me((_==null?void 0:_.setrpins)||""),re((_==null?void 0:_.onoff)===1)},[_]);const Ce=Te=>{ue(Te.target.value)},Se=Te=>{Xt(Te.target.value)},Oe=Te=>{re(Te)},de=Te=>{xe(Te.target.value)},ye=()=>{if(k==="TabCron"&&$==="edit")return Et`
          <form onsubmit=${_e}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  ${[{label:"ID",value:_.id},{label:"Cron",value:Et`
                        <input
                          type="text"
                          value=${we}
                          onInput=${Ce}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"Script",value:Et`
                        <input
                          type="text"
                          value=${pe}
                          onInput=${de}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"INFO",value:Et`
                        <input
                          type="text"
                          value=${oe}
                          onInput=${Se}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"On/Off",value:Et`<${Zt}
                        value=${le}
                        onChange=${Oe}
                      />`}].map((Te,ve)=>Et`
                      <tr
                        class="${ve%2===1?"bg-white":"bg-gray-200"}"
                      >
                        <td class="p-2 font-bold">${Te.label}</td>
                        <td class="p-2">${Te.value}</td>
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
    <div class=${`modal ${$t||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${Te=>ct&&Te.target===Te.currentTarget&&st()}
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
            ${ye()}
          </div>
        </div>
      </div>
    </div>
  `,$e=at(null);return lt(()=>{const Te=document.createElement("div");return Te.id="modal-portal",document.body.appendChild(Te),$e.current=Te,()=>{O(null,Te),document.body.removeChild(Te)}},[]),lt(()=>{$e.current&&O(Ee,$e.current)}),null}function ModalPwmCron({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedCron:_,handleCronChange:pt,modalClass:te,SliderComponent:$t=MyPolzunok}){let Zt="",oe="900",Xt="0",le="100";if(_!=null&&_.activ&&_.activ.startsWith("pwm:")){const ht=_.activ.substring(4).split(",");ht.length===4&&(Zt=ht[0],oe=ht[1],Xt=ht[2],le=ht[3])}const[re,pe]=ut((_==null?void 0:_.info)||""),[xe,we]=ut((_==null?void 0:_.onoff)===1),[ue,he]=ut((_==null?void 0:_.cron)||""),[me,_e]=ut(Zt),[Ce,Se]=ut(oe),[Oe,de]=ut(Xt),[ye,Ee]=ut(le),[$e,Te]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store"}).then(ht=>ht.json()).then(ht=>{if(ht&&ht.data&&Array.isArray(ht.data)){const Yt=ht.data.filter(ee=>ee.topin===5);Te(Yt),!me&&Yt.length>0&&_e(Yt[0].id.toString())}}).catch(ht=>console.error("Error fetching pin config:",ht))},[]);const ve=ht=>{ht.preventDefault();const Yt=new FormData(ht.target),ee=Object.fromEntries(Yt);ee.id=_.id,ee.pins=_.pins,ee.onoff=xe?1:0,ee.info=re,ee.cron=ue,ee.activ=`pwm:${me},${Ce},${Oe},${ye}`,fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ee)}).then(vt=>vt.json()).then(vt=>{pt({..._,...ee}),st(),window.location.href="/#/cron"}).catch(vt=>console.error("Error:",vt))},ae=()=>Et`
      <form onsubmit=${ve}>
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
                    value=${me}
                    onChange=${ht=>_e(ht.target.value)}
                    class="border rounded p-2 w-full"
                    required
                  >
                    ${$e.map(ht=>Et`<option value=${ht.id}>${ht.pins}</option>`)}
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200">
                <td class="p-2 font-bold">Cron Pattern</td>
                <td class="p-2">
                  <input
                    type="text"
                    value=${ue}
                    onInput=${ht=>he(ht.target.value)}
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
                    value=${Ce}
                    onInput=${ht=>Se(ht.target.value)}
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
                    value=${Oe}
                    onInput=${ht=>de(ht.target.value)}
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
                    value=${ye}
                    onInput=${ht=>Ee(ht.target.value)}
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
                    value=${re}
                    onInput=${ht=>pe(ht.target.value)}
                    class="border rounded p-2 w-full"
                  />
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-2 font-bold">On/Off</td>
                <td class="p-2">
                  <${$t} value=${xe} onChange=${we} />
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
    `,ge=Et`
    <div class=${`modal ${te||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${ht=>ct&&ht.target===ht.currentTarget&&st()}
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
            ${ae()}
          </div>
        </div>
      </div>
    </div>
  `,se=at(null);return lt(()=>{const ht=document.createElement("div");return ht.id="pwm-modal-portal",document.body.appendChild(ht),se.current=ht,()=>{O(null,ht),document.body.removeChild(ht)}},[]),lt(()=>{se.current&&O(ge,se.current)}),null}function initGlobalTooltip$4(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,pt=$.offsetHeight,te=window.innerWidth,$t=dt.getBoundingClientRect();let Zt=$t.left+$t.width/2-_/2;Zt=Math.max(8,Math.min(Zt,te-_-8));let oe=$t.top-pt-8;oe<8&&(oe=$t.bottom+8),$.style.left=Zt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabCron({}){const[$,k]=ut(null),[st,ct]=ut(null);at(null);const[dt,_]=ut(!1),[pt,te]=ut(null),[$t,Zt]=ut(null),[oe,Xt]=ut("ru"),[le,re]=ut(!1),[pe,xe]=ut(1),[we,ue]=ut(0);lt(()=>{initGlobalTooltip$4()},[]);const he=()=>fetch("/api/cron/get").then(se=>se.json()).then(se=>{console.log("API response:",se),se&&Array.isArray(se.timers)?(k(se.timers),Xt(se.lang||"ru"),typeof se.numline=="number"&&(ue(se.numline),xe(se.numline))):(console.error("Unexpected API response structure:",se),k([]))}).catch(se=>{console.error("Error fetching cron data:",se),k([])});lt(()=>{he()},[]);const me=at(!0);lt(()=>{if(me.current){me.current=!1;return}_e(we)},[we]);const _e=se=>{fetch("/api/numline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({numline:se})}).then(ht=>ht.json()).then(ht=>console.log("Numline sent to stm32:",ht)).catch(ht=>console.error("Error sending Crone line to stm32:",ht))},Ce=()=>{if(pe<$.length){const se=pe+1;xe(se),ue(se),_e(se)}},Se=()=>{if(pe>0){const se=pe-1;xe(se),ue(se),_e(se)}},Oe={ru:Et`
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
        <h2>Примеры PWM (Sunrise / Sunset)</h2>
        <table>
          <thead>
            <tr><th>Тип</th><th>Описание</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Sunrise (Восход)</td>
              <td>
                Нажмите кнопку <b>PWM</b> для настройки. Укажите <b>Start Duty</b> (Начальная скважность, например 0) и <b>End Duty</b> (Конечная скважность, например 100).
                Плавное увеличение скважности (яркости) будет происходить в течение времени, заданного в <b>Duration (Sec)</b> (от 1 до 864000 секунд).
              </td>
            </tr>
            <tr>
              <td>Sunset (Закат)</td>
              <td>
                Для эффекта заката укажите <b>Start Duty</b> = 100, а <b>End Duty</b> = 0.
                Переход будет плавно уменьшать скважность на протяжении заданного в <b>Duration (Sec)</b> времени.
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
        <h2>Examples of PWM (Sunrise and Sunset)</h2>
        <table>
          <thead>
            <tr><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Sunrise</td>
              <td>
                Click the <b>PWM</b> button to configure. Set <b>Start Duty</b> (e.g., 0) and <b>End Duty</b> (e.g., 100).
                The duty cycle (brightness) will smoothly increase over the time specified in <b>Duration (Sec)</b> (from 1 to 864000 seconds).
              </td>
            </tr>
            <tr>
              <td>Sunset</td>
              <td>
                For a sunset effect, set <b>Start Duty</b> = 100 and <b>End Duty</b> = 0.
                The duty cycle will smoothly decrease over the time specified in <b>Duration (Sec)</b>.
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
              <td class="border px-4 py-2">Swarm/timer/</td>
              <td class="border px-4 py-2">
                This page tracks changes in buttons and automatically sends each change via MQTT to the topic: Swarm/timer/.
                Where "Swarm" is your 'RX topic'.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `};if($===null)return Et`<div>Loading...</div>`;const de=()=>({langtimers:oe==="ru"?rulangtimers:enlangtimers}),ye=(se,ht)=>{const Yt=de(),vt=(Yt[se]&&Yt[se][ht]?Yt[se][ht]:"").split(" "),ie=[];for(let ce=0;ce<vt.length;ce+=15)ie.push(vt.slice(ce,ce+15).join(" "));return ie.join("<br>")},Ee=(se,ht)=>{te(se),Zt(ht),_(!0)},$e=()=>{_(!1),te(null),Zt(null)},Te=se=>{console.log("handleCronChange:",se),k($.map(ht=>ht.id===se.id?se:ht)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(se)}).then(ht=>ht.json()).then(ht=>{console.log("Cron job updated successfully:",ht)}).catch(ht=>{console.error("Error updating cron job:",ht)})},ve=()=>Array.isArray($t)?$t.flatMap(se=>se.pinact?Object.keys(se.pinact).map(ht=>({value:ht,label:ht})):[]):$t&&$t.pinact?Object.keys($t.pinact).map(se=>({value:se,label:se})):[],ae=se=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${ye("langtimers",se.tooltipIndex)}
    >
      ${se.title}
    </th>
  `,ge=({d:se,index:ht})=>{const Yt=se.activ&&se.activ.startsWith("pwm:");let ee=se.activ;if(Yt){const vt=se.activ.substring(4).split(",");vt.length===4&&(ee=`pwmID=${vt[0]} | ${vt[1]}s | ${vt[2]}%→${vt[3]}%`)}return Et`
    <tr class="${ht%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-4 text-sm text-slate-800 font-medium">${se.id}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider">${se.cron}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider items-center gap-1 flex justify-start">${ee}</td>
      <td class="px-6 py-4 text-sm text-slate-600">${se.info}</td>
      <td class="px-6 py-4">
        <${MyPolzunok}
          value=${se.onoff}
          onChange=${vt=>Te({...se,onoff:vt})}
        />
      </td>
     <td class="px-6 py-4 text-center">
        ${Yt?Et`
          <button
            onclick=${()=>Ee("edit_pwm",se)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-3"
          >
            Edit
          </button>
          <button
            onclick=${()=>Ee("edit_pwm",se)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap ml-1"
          >
            PWM
          </button>
        `:Et`
       <button
            onclick=${()=>Ee("edit",se)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
          >
            Edit
          </button>
          <button
            onclick=${()=>Ee("edit_pwm",se)}
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
                          <${ae} title="No" tooltipIndex=${1} />
                          <${ae} title="Cron" tooltipIndex=${2} />
                          <${ae} title="Script" tooltipIndex=${3} />
                          <${ae} title="Info" tooltipIndex=${4} />
                          <${ae} title="On/Off" tooltipIndex=${5} />
                          <${ae} title="Action" tooltipIndex=${6} />
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-white/40">
                        ${$.slice(0,pe).map((se,ht)=>Et`<${ge} d=${se} index=${ht} key=${se.id} />`)}
                      </tbody>
                    </table>
                  </div>
                </div>
              `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No cron jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>re(!le)}
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
                    onclick=${Ce}
                    title="Add Cron"
                  >+</button>
                `:null}
            ${pe>0?Et`
                  <button
                    class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                    onclick=${Se}
                    title="Remove Cron"
                  >-</button>
                `:null}
          </div>
        </div>
      </div>

      ${le&&Et`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">
          ${Oe[oe]}
        </div>
      `}

      ${dt&&pt==="edit_pwm"?Et`
        <${ModalPwmCron}
          modalType=${pt}
          page="TabCron"
          hideModal=${$e}
          title="Edit PWM Timer(s)"
          selectedCron=${$t}
          handleCronChange=${Te}
          modalClass="mt-24"
        />
      `:dt?Et`
        <${ModalCron}
          modalType=${pt}
          page="TabCron"
          hideModal=${$e}
          title=${pt==="edit"?"Edit Timer(s)":"Edit Connection"}
          selectedCron=${$t}
          handleCronChange=${Te}
          connectionOptions=${ve()}
          modalClass="mt-24"
        />
      `:null}
    </div>
  `}const PRESETS$1={ru:[{value:"1",label:"Паяльная станция T max=125°C, T min=-55°C"},{value:"2",label:"Кулер / вентилятор T max=70°C, T min=-55°C"},{value:"3",label:"3D‑принтер (стол) T max=120°C, T min=0°C"},{value:"4",label:"Форточный нагреватель T max=60°C, T min=-55°C"},{value:"5",label:"Тёплый пол T max=45°C, T min=0°C"},{value:"6",label:"Холодильник T max=100°C, T min=-55°C"},{value:"7",label:"Аквариум / бойлер T max=80°C, T min=0°C"},{value:"8",label:"Инкубатор T max=45°C, T min=0°C"},{value:"9",label:"Теплица / комната T max=50°C, T min=-55°C"}],en:[{value:"1",label:"Soldering station T max=125°C, T min=-55°C"},{value:"2",label:"Cooler / fan T max=70°C, T min=-55°C"},{value:"3",label:"3D printer (table) T max=120°C, T min=0°C"},{value:"4",label:"Vent heater T max=60°C, T min=-55°C"},{value:"5",label:"Warm floor T max=45°C, T min=0°C"},{value:"6",label:"Refrigerator T max=100°C, T min=-55°C"},{value:"7",label:"Aquarium / boiler T max=80°C, T min=0°C"},{value:"8",label:"Incubator T max=45°C, T min=0°C"},{value:"9",label:"Greenhouse / room T max=50°C, T min=-55°C"}]},SENSOR_OPTIONS$1=[{value:"1",label:"DS18B20"},{value:"2",label:"DHT-22"}];function ModalPid({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedPid:_,handlePidChange:pt,language:te="en",modalClass:$t,SliderComponent:Zt=MyPolzunok}){const[oe,Xt]=ut((_==null?void 0:_.info)||""),[le,re]=ut((_==null?void 0:_.onoff)===1),[pe,xe]=ut((_==null?void 0:_.selsens)||"1"),[we,ue]=ut((_==null?void 0:_.sernum)||""),[he,me]=ut((_==null?void 0:_.presets)||"1"),[_e,Ce]=ut((_==null?void 0:_.tmpset)||""),[Se,Oe]=ut((_==null?void 0:_.tmpcur)||""),[de,ye]=ut([]),[Ee,$e]=ut(Object.entries((_==null?void 0:_.pinact)||{})[0]||["",""]);lt(()=>{Xt((_==null?void 0:_.info)||""),re((_==null?void 0:_.onoff)===1),xe((_==null?void 0:_.selsens)||"1"),ue((_==null?void 0:_.sernum)||""),me((_==null?void 0:_.presets)||"1"),Ce((_==null?void 0:_.tmpset)||""),Oe((_==null?void 0:_.tmpcur)||""),$e(Object.entries((_==null?void 0:_.pinact)||{})[0]||["",""])},[_]),lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(Yt=>{if(!Yt.ok)throw new Error(`HTTP error! status: ${Yt.status}`);return Yt.json()}).then(Yt=>{if(!Yt||!Yt.data||!Array.isArray(Yt.data)){console.error("Invalid data format:",Yt),ye([]);return}const ee=Yt.data.filter(vt=>vt.topin===5);ye(ee)}).catch(Yt=>{console.error("Error fetching pin config:",Yt),ye([])})},[_]);const Te=Yt=>{Yt.preventDefault();const ee=Ee[0]&&Ee[1]!==void 0&&Ee[1]!=="",vt={id:_.id,pins:Ee[0],pinact:ee?{[Ee[0]]:parseInt(Ee[1])}:{},selsens:pe,sernum:we,presets:he,tmpset:_e,tmpcur:Se,info:oe,onoff:le?1:0};console.log("Data being sent to server:",vt),fetch("/api/pid/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(vt)}).then(ie=>ie.json()).then(ie=>{console.log("Success:",ie),pt({..._,...vt}),st(),window.location.href="/#/pid"}).catch(ie=>{console.error("Error:",ie)})},ve=Yt=>{if(!Yt.target.value)$e(["",""]);else{const ee=Yt.target.value.split("|");$e([ee[0],ee[1]])}},ae=PRESETS$1[te]||PRESETS$1.en,ge=()=>k==="TabPid"&&$==="edit"?Et`
        <form onsubmit=${Te}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                ${[{label:"ID",value:_.id},{label:"PWM Pin",value:Et`
                        <select
                          value=${de.some(Yt=>String(Yt.pins)===String(Ee[0]))?`${Ee[0]}|${Ee[1]}`:""}
                          onChange=${ve}
                          class="border rounded p-2 w-full"
                        >
                          <option value="">Select PWM pin</option>
                          ${de.map(Yt=>Et`
                              <option value=${`${Yt.pins}|${Yt.id}`}>
                                ${Yt.pins} (ID: ${Yt.id})
                              </option>
                            `)}
                        </select>
                      `},{label:"Selected sensor",value:Et`
                      <select
                        value=${pe}
                        onChange=${Yt=>xe(Yt.target.value)}
                        class="border rounded p-2 w-full"
                      >
                        ${SENSOR_OPTIONS$1.map(Yt=>Et`
                            <option
                              value=${Yt.value}
                              selected=${Yt.value===pe}
                            >
                              ${Yt.label}
                            </option>
                          `)}
                      </select>
                    `},{label:"Dev. ser. number",value:pe==="1"?Et`
                          <input
                            type="text"
                            value=${we}
                            onInput=${Yt=>ue(Yt.target.value)}
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
                        value=${he}
                        onChange=${Yt=>me(Yt.target.value)}
                        class="border rounded p-2 w-full"
                      >
                        ${ae.map(Yt=>Et`
                            <option
                              value=${Yt.value}
                              selected=${Yt.value===he}
                            >
                              ${Yt.label}
                            </option>
                          `)}
                      </select>
                    `},{label:"t_set",value:Et`
                      <input
                        type="text"
                        value=${_e}
                        onInput=${Yt=>Ce(Yt.target.value)}
                        class="border rounded p-2 w-full"
                        placeholder="°C"
                      />
                    `},{label:"t_current",value:Et`
                      <input
                        type="text"
                        value=${Se}
                        readOnly
                        class="border rounded p-2 w-full bg-gray-100 cursor-not-allowed"
                        placeholder="°C"
                      />
                    `},{label:"INFO",value:Et`
                      <input
                        type="text"
                        value=${oe}
                        onInput=${Yt=>Xt(Yt.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    `},{label:"On/Off",value:Et`
                      <${Zt}
                        value=${le}
                        onChange=${Yt=>re(Yt)}
                      />
                    `}].map((Yt,ee)=>Et`
                    <tr class="${ee%2===1?"bg-white":"bg-gray-200"}">
                      <td class="p-2 font-bold">${Yt.label}</td>
                      <td class="p-2">${Yt.value}</td>
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
      `:null,se=Et`
    <div class=${`modal ${$t||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${Yt=>ct&&Yt.target===Yt.currentTarget&&st()}
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
            ${ge()}
          </div>
        </div>
      </div>
    </div>
  `,ht=at(null);return lt(()=>{const Yt=document.createElement("div");return Yt.id="modal-portal",document.body.appendChild(Yt),ht.current=Yt,()=>{O(null,Yt),document.body.removeChild(Yt)}},[]),lt(()=>{ht.current&&O(se,ht.current)}),null}function initGlobalTooltip$3(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,pt=$.offsetHeight,te=window.innerWidth,$t=dt.getBoundingClientRect();let Zt=$t.left+$t.width/2-_/2;Zt=Math.max(8,Math.min(Zt,te-_-8));let oe=$t.top-pt-8;oe<8&&(oe=$t.bottom+8),$.style.left=Zt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const PRESETS={ru:[{value:"1",label:"Паяльная станция T max=125°C, T min=-55°C"},{value:"2",label:"Кулер / вентилятор T max=70°C, T min=-55°C"},{value:"3",label:"3D‑принтер (стол) T max=120°C, T min=0°C"},{value:"4",label:"Форточный нагреватель T max=60°C, T min=-55°C"},{value:"5",label:"Тёплый пол T max=45°C, T min=0°C"},{value:"6",label:"Холодильник T max=100°C, T min=-55°C"},{value:"7",label:"Аквариум / бойлер T max=80°C, T min=0°C"},{value:"8",label:"Инкубатор T max=45°C, T min=0°C"},{value:"9",label:"Теплица / комната T max=50°C, T min=-55°C"}],en:[{value:"1",label:"Soldering station T max=125°C, T min=-55°C"},{value:"2",label:"Cooler / fan T max=70°C, T min=-55°C"},{value:"3",label:"3D printer (table) T max=120°C, T min=0°C"},{value:"4",label:"Vent heater T max=60°C, T min=-55°C"},{value:"5",label:"Warm floor T max=45°C, T min=0°C"},{value:"6",label:"Refrigerator T max=100°C, T min=-55°C"},{value:"7",label:"Aquarium / boiler T max=80°C, T min=0°C"},{value:"8",label:"Incubator T max=45°C, T min=0°C"},{value:"9",label:"Greenhouse / room T max=50°C, T min=-55°C"}]},SENSOR_OPTIONS=[{value:"1",label:"DS18B20"},{value:"2",label:"DHT-22"}],HELP_CONTENT={ru:Et`
    <div class="mytext space-y-6">
      <div>
        <p class="mb-4">
Сначала выберите параметр «PWM pin». Затем укажите тип температурного датчика: DS18B20 или DHT22. После этого выберите один из доступных пресетов, который максимально соответствует нужным температурным и временным параметрам. И задайте целевую температуру, которую должен поддерживать PID-контроллер.
        </p>
      </div>
    </div>
  `,en:Et`
    <div class="mytext space-y-6">
      <div>
        <p class="mb-4">
First, select the «PWM pin» parameter. Then specify the type of temperature sensor: DS18B20 or DHT22. After that, select one of the available presets that closely matches the required temperature and timing parameters. Finally, set the target temperature that the PID controller should maintain.
        </p>
      </div>
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
  `,document.head.appendChild($)}function TabPid({}){const[$,k]=ut(null),[st,ct]=ut(null);at(null);const[dt,_]=ut(!1),[pt,te]=ut(null),[$t,Zt]=ut(null),[oe,Xt]=ut("ru"),[le,re]=ut(!1),[pe,xe]=ut(0),[we,ue]=ut(0),he=at(!1);lt(()=>{initGlobalTooltip$3(),initTuneStyles()},[]);const me=()=>{fetch("/api/pid/get").then(vt=>vt.json()).then(vt=>{he.current||vt&&Array.isArray(vt.pid)&&(k(vt.pid),Xt(vt.lang||"ru"),typeof vt.pidline=="number"&&(ue(vt.pidline),xe(vt.pidline)))}).catch(vt=>console.error("Error fetching PID data:",vt))};lt(()=>{me();const vt=setInterval(()=>{me()},500);return()=>clearInterval(vt)},[]);const _e=at(!0);lt(()=>{if(_e.current){_e.current=!1;return}Ce(we)},[we]);const Ce=vt=>{fetch("/api/pidline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pidline:vt})}).then(ie=>ie.json()).then(ie=>console.log("Pidline sent to stm32:",ie)).catch(ie=>console.error("Error sending PID line to stm32:",ie))},Se=()=>{if(pe<PID_MAX_SLOTS){const vt=pe+1;xe(vt),ue(vt)}},Oe=()=>{if(pe>0){const vt=pe-1;xe(vt),ue(vt)}};if($===null)return Et`<div>Loading...</div>`;const de=()=>({langtimers:oe==="ru"?rulangtimers:enlangtimers}),ye=(vt,ie)=>{const ce=de(),ke=(ce[vt]&&ce[vt][ie]?ce[vt][ie]:"").split(" "),mt=[];for(let ne=0;ne<ke.length;ne+=15)mt.push(ke.slice(ne,ne+15).join(" "));return mt.join("<br>")},Ee=(vt,ie)=>{te(vt),Zt(ie),_(!0)},$e=()=>{_(!1),te(null),Zt(null)},Te=vt=>{console.log("handlePidChange:",vt),k($.map(ie=>ie.id===vt.id?vt:ie)),he.current=!0,fetch("/api/pid/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(vt)}).then(ie=>ie.json()).then(ie=>{console.log("PID job updated successfully:",ie)}).catch(ie=>{console.error("Error updating PID job:",ie)}).finally(()=>{he.current=!1})},ve=vt=>{const ie=vt.id,ce=vt.tune_state||0;if(!(ce===TUNE_STEP||ce===TUNE_BIAS)){if(ce===TUNE_ERROR){ae(ie);return}console.log("Run tune for id:",ie),fetch("/api/pid/tune",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ie,action:"start"})}).then(fe=>fe.json()).then(fe=>{console.log("Tune start response:",fe)}).catch(fe=>{console.error("Error starting tune:",fe)})}},ae=vt=>{console.log("Stop tune for id:",vt),fetch("/api/pid/tune",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:vt,action:"stop"})}).then(ie=>ie.json()).then(ie=>{console.log("Tune stop response:",ie)}).catch(ie=>{console.error("Error stopping tune:",ie)})},ge=PRESETS[oe]||PRESETS.en,se=vt=>{const ie=ge.find(ce=>ce.value===String(vt));return ie?ie.label:vt},ht=vt=>{const ie=SENSOR_OPTIONS.find(ce=>ce.value===String(vt));return ie?ie.label:vt},Yt=vt=>Et`
    <th
      class="px-4 py-4 text-base font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${ye("langtimers",vt.tooltipIndex)}
    >
      ${vt.title}
    </th>
  `,ee=(vt,ie)=>{const ce=vt.tune_state||0,fe=vt.tune_progress||0,ke=ce===TUNE_STEP||ce===TUNE_BIAS,mt=ce===TUNE_DONE,ne=ce===TUNE_ERROR,be=mt?"background:linear-gradient(to right,#4ade80,#10b981);box-shadow:0 4px 14px rgba(16,185,129,0.4);":ne?"background:linear-gradient(to right,#dc2626,#b91c1c);box-shadow:0 4px 14px rgba(220,38,38,0.5);animation:tuneBlink 1s ease-in-out infinite;":"background:linear-gradient(to right,#ef4444,#e11d48);box-shadow:0 4px 14px rgba(239,68,68,0.4);",Ie="px-3 py-1 rounded-full text-sm font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap",Me=mt?"Tuning Done":ne?"⚠ Error!":"Run tune";if(ke){const Pe=fe.toFixed(1),De=`Auto Tune (${ce===TUNE_STEP?"Step test":"Bias search"})… ${fe}%`;return Et`
        <tr key=${vt.id} class="${ie%2===1?"bg-white/80":"bg-sky-200/40"}">
          <td colspan="11" class="px-2 py-2">
            <div style="position:relative;width:100%;height:2.5rem;border-radius:0.75rem;overflow:hidden;background:#d1d5db;box-shadow:inset 0 2px 6px rgba(0,0,0,0.12);">
              <div
                style="position:absolute;left:0;top:0;bottom:0;width:${Pe}%;background:linear-gradient(90deg,#22c55e 0%,#16a34a 60%,#4ade80 100%);border-radius:inherit;transition:width 0.3s ease;box-shadow:0 0 14px rgba(34,197,94,0.55);"
              ></div>
              <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;user-select:none;">
                <span style="font-size:0.875rem;font-weight:700;color:#111827;white-space:nowrap;">${De}</span>
              </div>
            </div>
          </td>
          <td class="px-4 py-2 text-center">
            <button
              onclick=${()=>ae(vt.id)}
              class="px-3 py-1 rounded-full text-sm font-bold text-white whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95"
              style="background:linear-gradient(to right,#f97316,#ef4444);box-shadow:0 4px 14px rgba(239,68,68,0.4);"
            >Stop</button>
          </td>
        </tr>
      `}return Et`
      <tr key=${vt.id} class="${ie%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-4 py-3 text-sm text-slate-800 font-medium">${vt.id}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">
          ${(()=>{const Pe=Object.entries(vt.pinact||{});if(!Pe.length)return"—";const[Ne,De]=Pe[0];return`${Ne}(${De})`})()}
        </td>
        <td class="px-4 py-3 text-sm text-slate-700">${ht(vt.selsens)}</td>
        <td class="px-4 py-3 text-sm font-mono ${vt.selsens==="1"?"text-slate-700":"text-slate-400 italic"}">${vt.selsens==="1"?vt.sernum||"—":"N/A"}</td>
        <td class="px-4 py-3 text-sm text-slate-700">${se(vt.presets)}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">${vt.tmpset}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">${vt.tmpcur}</td>
        <td class="px-4 py-3 text-sm text-slate-800 font-mono ${vt.onoff?"":"text-rose-500 font-bold"}">${vt.onoff?vt.duty!==void 0?vt.duty:"—":"OFF"}</td>
        <td class="px-4 py-3 text-sm text-slate-600">${vt.info}</td>
        <td class="px-4 py-3">
          <${MyPolzunok}
            value=${vt.onoff}
            onChange=${Pe=>Te({...vt,onoff:Pe})}
          />
        </td>
        <td class="px-4 py-3 text-center">
          <button
            onclick=${()=>Ee("edit",vt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
          >Edit</button>
        </td>
        <td class="px-4 py-3 text-center">
          <button
            onclick=${()=>ve(vt)}
            class="${Ie}"
            style="${be}"
          >${Me}</button>
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
                        <${Yt} title="No" tooltipIndex=${1} />
                        <${Yt} title="PWM Pin" tooltipIndex=${2} />
                        <${Yt} title="Sel. sensor" tooltipIndex=${3} />
                        <${Yt} title="Dev. ser. number" tooltipIndex=${3} />
                        <${Yt} title="Presets" tooltipIndex=${4} />
                        <${Yt} title="T set." tooltipIndex=${5} />
                        <${Yt} title="T cur." tooltipIndex=${6} />
                        <${Yt} title="Duty" tooltipIndex=${7} />
                        <${Yt} title="Info" tooltipIndex=${4} />
                        <${Yt} title="On/Off" tooltipIndex=${5} />
                        <${Yt} title="Action" tooltipIndex=${6} />
                        <${Yt} title="Auto tune" tooltipIndex=${7} />
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-white/40">
                      ${Array.from({length:pe},(vt,ie)=>{const ce=$&&$[ie]?$[ie]:{id:ie+1,pins:"",pinact:{},selsens:"",sernum:"",presets:"",tmpset:"",tmpcur:"",info:"",onoff:0,tune_state:0,tune_progress:0};return ee(ce,ie)})}
                    </tbody>
                  </table>
                </div>
              </div>
            `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No PID jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>re(!le)}
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
                onclick=${Se}
                title="Add PID"
            >+</button>
            `:null}
            ${pe>0?Et`
                <button
                  class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                  onclick=${Oe}
                  title="Remove PID"
                >-</button>
              `:null}
          </div>
        </div>
      </div>

      ${le&&Et`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">
          ${HELP_CONTENT[oe]||HELP_CONTENT.en}
        </div>
      `}

      ${dt?Et`
        <${ModalPid}
          modalType=${pt}
          page="TabPid"
          hideModal=${$e}
          title="Edit PID"
          selectedPid=${$t}
          handlePidChange=${Te}
          language=${oe}
          modalClass="mt-24"
        />
      `:null}
    </div>
  `}function ModalEditSensor({typsensor:$,oneWireId:k,pins:st,onClose:ct,onUpdate:dt,sensorType:_,sensorData:pt,closeOnOverlayClick:te=!0}){const[$t,Zt]=ut({ut:(pt==null?void 0:pt.ut)||$.ut,lt:(pt==null?void 0:pt.lt)||$.lt,action_ut:(pt==null?void 0:pt.action_ut)||$.action_ut,action_lt:(pt==null?void 0:pt.action_lt)||$.action_lt,upphumid:(pt==null?void 0:pt.upphumid)||$.upphumid||0,humlolim:(pt==null?void 0:pt.humlolim)||$.humlolim||0,actuphum:(pt==null?void 0:pt.actuphum)||$.actuphum||"",actlowhum:(pt==null?void 0:pt.actlowhum)||$.actlowhum||"",info:(pt==null?void 0:pt.info)||$.info,onoff:(pt==null?void 0:pt.onoff)||$.onoff||0,humidity:(pt==null?void 0:pt.humidity)||$.humidity||0}),[oe,Xt]=ut(!1),le=(me,_e,Ce)=>{if(me===""||me==="-")return me;const Se=me.replace(",",".");if(!/^-?\d*\.?\d*$/.test(Se))return null;const Oe=parseFloat(Se);return isNaN(Oe)||Oe<_e||Oe>Ce?null:Se},re=me=>{const{name:_e,value:Ce}=me.target;if(["ut","lt"].includes(_e)){const Se=le(Ce,-55,125);Se!==null&&Zt(Oe=>({...Oe,[_e]:Se}))}else if(["upphumid","humlolim"].includes(_e)){const Se=le(Ce,0,100);Se!==null&&Zt(Oe=>({...Oe,[_e]:Se}))}else Zt(Se=>({...Se,[_e]:Ce}))},pe=me=>{const _e=["ut","lt","upphumid","humlolim"],Ce={...me};return _e.forEach(Se=>{Ce[Se]===""||Ce[Se]==="-"?Ce[Se]=0:Ce[Se]=parseFloat(Ce[Se].toString().replace(",","."))}),Ce},ue=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onclick=${me=>{te&&me.target===me.currentTarget&&ct()}}
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
        <form onsubmit=${async me=>{me.preventDefault(),Xt(!0);const _e=pe($t);try{if(!(await fetch("/api/sensor/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:k,pins:st,sensorNumber:$.s_number,..._e,s_number:$.s_number,t:$.t})})).ok)throw new Error("Network response was not ok");dt({...$,..._e,oneWireId:k,pins:st,s_number:$.s_number,t:$.t}),ct()}catch(Ce){console.error("Error updating Sensor:",Ce)}finally{Xt(!1)}}}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                <tr class="bg-blue-100">
                  <td class="p-2 font-bold">Upper Temperature</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="ut"
                      value=${$t.ut}
                      oninput=${re}
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
                      value=${$t.lt}
                      oninput=${re}
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
                      value=${$t.action_ut}
                      oninput=${re}
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
                      value=${$t.action_lt}
                      oninput=${re}
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
                            value=${$t.upphumid}
                            oninput=${re}
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
                            value=${$t.humlolim}
                            oninput=${re}
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
                            value=${$t.actuphum}
                            oninput=${re}
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
                            value=${$t.actlowhum}
                            oninput=${re}
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
                      value=${$t.info}
                      oninput=${re}
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
  `,he=at(null);return lt(()=>{const me=document.createElement("div");return me.id="modal-portal-sensor",document.body.appendChild(me),he.current=me,()=>{O(null,me),document.body.removeChild(me)}},[]),lt(()=>{he.current&&O(ue,he.current)}),null}function ModalOneWire({oneWire:$,onClose:k,onUpdate:st,refresh:ct,closeOnOverlayClick:dt=!0}){console.log("oneWire object:",$);const[_,pt]=ut({typsensor:$.typsensor,numdevices:$.numdevices}),[te,$t]=ut(!1),[Zt,oe]=ut($.onoff||0),Xt=ue=>{dt&&ue.target===ue.currentTarget&&k()},le=ue=>{const{name:he,value:me}=ue.target;let _e={..._,[he]:parseInt(me,10)};he==="typsensor"&&(me==="0"?_e.numdevices=0:me==="2"&&(_e.numdevices=1)),pt(_e)},re=ue=>{oe(ue)},xe=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onclick=${Xt}
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
        <form onsubmit=${async ue=>{ue.preventDefault(),$t(!0);const he={id:$.id,pin:$.pin,typsensor:_.typsensor,numdevices:_.numdevices,onoff:Zt};console.log("Sending data:",he);try{if(!(await fetch("api/onewire/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(he)})).ok)throw new Error("Network response was not ok");const _e={...$,..._,onoff:Zt};st(_e),k()}catch(me){console.error("Error updating OneWire:",me)}finally{$t(!1)}}}>
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
                      oninput=${_.typsensor===1?le:void 0}
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
                      value=${Zt}
                      onChange=${re}
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
  `,we=at(null);return lt(()=>{const ue=document.createElement("div");return ue.id="modal-portal-onewire",document.body.appendChild(ue),we.current=ue,()=>{O(null,ue),document.body.removeChild(ue)}},[]),lt(()=>{we.current&&O(xe,we.current)}),null}function initGlobalTooltip$2(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,pt=$.offsetHeight,te=window.innerWidth,$t=dt.getBoundingClientRect();let Zt=$t.left+$t.width/2-_/2;Zt=Math.max(8,Math.min(Zt,te-_-8));let oe=$t.top-pt-8;oe<8&&(oe=$t.bottom+8),$.style.left=Zt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabOneWire=()=>{const[$,k]=ut([]),[st,ct]=ut(null),[dt,_]=ut(!1),[pt,te]=ut(null),[$t,Zt]=ut(null),[oe,Xt]=ut("ru"),[le,re]=ut(null),[pe,xe]=ut({}),we=ae=>xe(ge=>({...ge,[ae]:!ge[ae]})),ue=ae=>typeof ae=="string"?ae.replace(/[^\x20-\x7E\u0400-\u04FF]/g,""):ae;lt(()=>{initGlobalTooltip$2()},[]);const he=()=>{console.log("Calling initial refresh..."),fetch("/api/onewire/get").then(ae=>ae.json()).then(ae=>{console.log("Initial data received:",ae),Xt(ae.lang||"ru"),k(ae.pins||[]),console.log("Initial OneWire state set:",ae.pins),ct(null)}).catch(ae=>{console.error("Error in refresh:",ae),ct(ae.message),k([])})},me=async()=>{try{const ge=await(await fetch("/api/temp/get")).json();k(se=>se.map(ht=>{if(!ht.sensors||ht.typsensor!==1&&ht.typsensr!==1&&ht.typsensor!==2&&ht.typsensr!==2)return ht;const Yt=ht.sensors.map(ee=>{var vt,ie;if(ht.typsensor===1||ht.typsensr===1){const ce=(vt=ge.ds18b20)==null?void 0:vt.find(fe=>fe.addr===ee.s_number);if(ce)return{...ee,t:ce.temp}}else if(ht.typsensor===2||ht.typsensr===2){const ce=(ie=ge.dht22)==null?void 0:ie.find(fe=>fe.id===ht.id);if(ce)return{...ee,t:ce.temp,humidity:ce.humidity}}return ee});return{...ht,sensors:Yt}}))}catch(ae){console.error("Error in updateSensorData:",ae)}};lt(()=>{console.log("Setting up initial data and interval..."),he();const ae=setInterval(me,1e3);return()=>{clearInterval(ae)}},[]);const _e=()=>{_(!1),te(null),Zt(null)},Ce=ae=>{k(ge=>ge.map(se=>{var ht;if(se.id===ae.oneWireId){const Yt=((ht=se.sensors)==null?void 0:ht.map(ee=>ee.s_number===ae.s_number?{...ee,...ae}:ee))||[];return{...se,sensors:Yt}}return se})),_e()},Se=ae=>{Zt(ae),_(!0)},Oe=ae=>{k(ge=>ge.map(se=>se.id===ae.id?{...se,onoff:ae.onoff}:se))},de=ae=>{k(ge=>ge.map(se=>se.id===ae.id?ae:se)),_e()};if(st)return Et`<div>Error fetching sensor data: ${st}</div>`;const ye=()=>({lang1Wire:oe==="ru"?rulange1Wire:enlange1Wire}),Ee=(ae,ge)=>{const se=ye(),Yt=(se[ae]&&se[ae][ge]?se[ae][ge]:"").split(" "),ee=[];for(let vt=0;vt<Yt.length;vt+=15)ee.push(Yt.slice(vt,vt+15).join(" "));return ee.join("<br>")},$e=ae=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Ee("lang1Wire",ae.tooltipIndex)}
    >
      ${ae.title}
    </th>
  `,Te=({device:ae,index:ge})=>{const se=!!pe[ae.id],ht=ae.pins||ae.pin,Yt=ae.typsensor||ae.typsensr||0,ee=ae.numdevices||ae.numsens||0,vt=Yt!==0&&ee>0;return Et`
      <tbody key=${"db-"+ae.id}>
        <tr
          class="${ge%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors ${vt?"cursor-pointer":""}"
          onclick=${()=>vt&&we(ae.id)}
        >
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ae.id}</td>
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ht}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${["None","DS18B20","DHT22"][Yt]}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${ee}</td>
          <td class="px-6 py-4" onclick=${ie=>ie.stopPropagation()}>
            <${MyPolzunok}
              value=${ae.onoff||0}
              onChange=${ie=>Oe({...ae,onoff:ie})}
            />
          </td>
          <td class="px-6 py-4" onclick=${ie=>ie.stopPropagation()}>
            <button
              class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap"
              onclick=${()=>Se(ae)}
            >
              Edit
            </button>
            ${vt&&Et`
              <span class="ml-3 text-slate-400 text-xs select-none pointer-events-none">
                ${se?"▲":"▼"}
              </span>
            `}
          </td>
        </tr>

        ${se&&vt?Et`
          <tr onclick=${ie=>ie.stopPropagation()}>
            <td colspan="6" class="px-4 py-3 bg-gradient-to-r from-cyan-50/80 via-slate-50/60 to-blue-50/80 border-t border-cyan-100/60">
              <div class="w-full">
                <${ve} d=${ae} />
              </div>
            </td>
          </tr>
        `:""}
      </tbody>
    `},ve=({d:ae})=>{const ge=ae.typsensor||ae.typsensr||0,se=ae.numdevices||ae.numsens||0;if(ge===0||se===0)return Et`
        <div class="px-4 py-2 text-slate-500 font-medium">
          No connected sensors for this OneWire pin.
        </div>
      `;let ht=ae.sensors||[];const Yt=["bg-cyan-50/60 border-cyan-200/50","bg-slate-100/70 border-slate-200/50"],ee=(vt,ie)=>{const ce=ge===2,fe=ue(vt.s_number)||"",ke=mt=>{if(mt.stopPropagation(),!fe)return;const ne=mt.currentTarget;navigator.clipboard.writeText(fe).then(()=>{ne.textContent="✅ copied!",ne.style.background="#059669",setTimeout(()=>{ne.textContent="📋 copy",ne.style.background=""},1500)}).catch(()=>{ne.textContent="❌ error",setTimeout(()=>{ne.textContent="📋 copy"},1500)})};return Et`
        <div class="w-full flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3
                    rounded-xl border ${Yt[ie%2]}
                    backdrop-blur-sm shadow-sm hover:shadow-md transition-all">

          <!-- S/N полностью + кнопка копирования -->
          ${ce?Et`<span class="font-mono text-base font-semibold text-teal-700 shrink-0">DHT22</span>`:Et`
                <span class="flex items-center gap-2 shrink-0">
                  <span class="font-mono text-base font-semibold text-slate-500 select-none">SN</span>
                  <span class="font-mono text-base text-slate-700 select-all" title="Serial number">
                    ${fe}
                  </span>
                  <button
                    style="transition: background 0.08s, transform 0.08s, box-shadow 0.08s;"
                    class="text-xs text-white font-bold px-3 py-1 rounded-lg
                           bg-emerald-500 hover:bg-emerald-600
                           shadow-md hover:shadow-lg
                           active:scale-95 active:shadow-inner active:bg-emerald-700
                           leading-none shrink-0"
                    onmousedown=${mt=>{mt.currentTarget.style.transform="scale(0.93)",mt.currentTarget.style.boxShadow="inset 0 2px 6px rgba(0,0,0,0.25)"}}
                    onmouseup=${mt=>{mt.currentTarget.style.transform="",mt.currentTarget.style.boxShadow=""}}
                    onmouseleave=${mt=>{mt.currentTarget.style.transform="",mt.currentTarget.style.boxShadow=""}}
                    onclick=${ke}
                    title="Copy S/N to clipboard"
                  >📋 copy</button>
                </span>
              `}

          <span class="text-slate-300 select-none text-base">|</span>

          <!-- Температура -->
          <span class="font-bold text-cyan-700 text-base shrink-0">
            🌡 ${vt.t??"—"}°C
          </span>

          ${ce&&"humidity"in vt?Et`
            <span class="font-bold text-teal-600 text-base shrink-0">
              💧 ${vt.humidity}%
            </span>
          `:""}

          <span class="text-slate-300 select-none text-base">|</span>

          <!-- Лимиты температуры -->
          <span
            class="px-2.5 py-1 bg-orange-100 text-orange-700 rounded-md text-sm font-semibold shrink-0"
            title="Upper temperature limit"
          >↑${vt.ut}°C → ${vt.action_ut}</span>
          <span
            class="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-semibold shrink-0"
            title="Lower temperature limit"
          >↓${vt.lt}°C → ${vt.action_lt}</span>

          ${ce&&"upphumid"in vt?Et`
            <span class="text-slate-300 select-none text-base">|</span>
            <span
              class="px-2.5 py-1 bg-orange-50 text-orange-600 rounded-md text-sm font-semibold shrink-0"
              title="Upper humidity limit"
            >💧↑${vt.upphumid}% → ${vt.actuphum}</span>
            <span
              class="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md text-sm font-semibold shrink-0"
              title="Lower humidity limit"
            >💧↓${vt.humlolim}% → ${vt.actlowhum}</span>
          `:""}

          ${vt.info?Et`
            <span class="text-slate-300 select-none text-base">|</span>
            <span class="text-sm text-slate-500 italic" title=${vt.info}>
              ${vt.info}
            </span>
          `:""}

          <!-- Edit — прижат вправо -->
          <a
            href="#"
            class="ml-auto text-blue-600 hover:text-blue-800 font-semibold text-sm uppercase tracking-wide bg-white/70 hover:bg-white/95 px-3 py-1 rounded-lg shadow-sm transition-colors shrink-0"
            onclick=${mt=>{mt.preventDefault(),te({...vt,oneWireId:ae.id,sensorType:ge,pins:ae.pins||ae.pin}),_(!0)}}
          >Edit</a>
        </div>
      `};return ht.length>0&&Object.keys(ht[0]).length>0?Et`<div class="flex flex-col gap-2 w-full">${ht.map((vt,ie)=>ee(vt,ie))}</div>`:Et`
          <div class="px-4 py-4 text-slate-500 font-medium bg-white/50 backdrop-blur-sm rounded-xl border border-white/40 text-center w-full">
            No sensor data available for this OneWire pin.
          </div>
        `};return Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          OneWire(s) pin(s)
        </div>
        <div class="justify-center w-full">
          <div class="mb-4">
            <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6 overflow-auto">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${$e} title="ID"                tooltipIndex=${1} />
                      <${$e} title="Pin"               tooltipIndex=${2} />
                      <${$e} title="Selected sensor"   tooltipIndex=${3} />
                      <${$e} title="Count of sensors"  tooltipIndex=${4} />
                      <${$e} title="On/Off"            tooltipIndex=${5} />
                      <${$e} title="Actions"           tooltipIndex=${6} />
                    </tr>
                  </thead>
                  ${$.length>0?$.map((ae,ge)=>Et`<${Te} device=${ae} index=${ge} key=${ae.id} />`):Et`
                        <tbody>
                          <tr>
                            <td colspan="6" class="px-4 py-2">
                              ${st?`Error fetching sensor data: ${st}`:"No available pins configured as OneWire!"}
                            </td>
                          </tr>
                        </tbody>
                      `}
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
              onClose=${_e}
              onUpdate=${Ce}
              sensorType=${pt.sensorType}
              closeOnOverlayClick=${!0}
              refresh=${he}
            />
          `:Et`
            <${ModalOneWire}
              oneWire=${$t}
              onClose=${_e}
              onUpdate=${de}
              closeOnOverlayClick=${!0}
              refresh=${he}
            />
          `)}
  `};function ModalSIM800L({hideModal:$,title:k,selectedGps:st,onSave:ct}){const[dt,_]=ut((st==null?void 0:st.tel)||""),[pt,te]=ut((st==null?void 0:st.info)||""),[$t,Zt]=ut((st==null?void 0:st.onoff)===1),[oe,Xt]=ut(!0),le=ue=>/^\+\d{11,20}$/.test(ue),xe=Et`
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

          <form onSubmit=${ue=>{if(ue.preventDefault(),!oe)return;const he={tel:dt,info:pt,onoff:$t?1:0};console.log("Сохраняемые данные:",he),fetch("/api/sim800l/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(he)}).then(me=>me.json()).then(me=>{typeof ct=="function"&&ct(he),$()}).catch(me=>{console.error("Error:",me)})}}>
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
                        onInput=${ue=>{const he=ue.target.value;_(he),Xt(le(he))}}
                        class=${`border rounded p-2 w-full ${!oe&&dt!==""?"border-red-500":""}`}
                        placeholder="+XXXXXXXXXXX"
                      />
                      ${!oe&&dt!==""?Et`
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
                      <${MyPolzunok} value=${$t} onChange=${Zt} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                disabled=${!oe||dt===""}
                class=${`font-bold py-2 px-4 rounded ${oe&&dt!==""?"bg-blue-500 hover:bg-blue-700 text-white":"bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,we=at(null);return lt(()=>{const ue=document.createElement("div");return ue.id="modal-portal",document.body.appendChild(ue),we.current=ue,()=>{O(null,ue),document.body.removeChild(ue)}},[]),lt(()=>{we.current&&O(xe,we.current)}),null}const ModalSecurity=({modalType:$,page:k,hideModal:st,title:ct,selectedSecurity:dt,onSecurityChange:_,SliderComponent:pt=MyPolzunok})=>{const[te,$t]=ut((dt==null?void 0:dt.info)||""),[Zt,oe]=ut((dt==null?void 0:dt.onoff)||0),[Xt,le]=ut((dt==null?void 0:dt.ptype)||0),[re,pe]=ut((dt==null?void 0:dt.send_sms)||""),[xe,we]=ut((dt==null?void 0:dt.action)||""),[ue,he]=ut([]),[me,_e]=ut({send_sms:null,action:null}),[Ce,Se]=ut(null),Oe=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,de=(se,ht)=>!ht||ht.trim()===""||ht.toLowerCase()==="none"?null:se==="action"?Oe.test(ht)?null:'Incorrect format. Use "None" or "pin:value" format.':ht.length>100?"Text should not exceed 100 characters":null,ye=(se,ht)=>{const Yt=de(se,ht);switch(_e(ee=>({...ee,[se]:Yt})),se){case"send_sms":pe(ht);break;case"action":we(ht);break}};lt(()=>{fetch("/api/monitoring/get").then(se=>se.json()).then(se=>{Array.isArray(se)?he(se.filter(ht=>ht.topin===2)):he([])}).catch(se=>{console.error("Error fetching pin config:",se),he([])})},[]);const Ee=se=>{if(se.preventDefault(),Object.values(me).some(Yt=>Yt!==null)){Se("Please correct the errors before submitting.");return}const ht={...dt,info:te,send_sms:re||"NO",action:xe||"None",onoff:Zt,ptype:Xt};fetch("/api/monitoring/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ht)}).then(Yt=>{if(!Yt.ok)throw new Error("Network response was not ok");return Yt.json()}).then(Yt=>{if(Yt.error)throw new Error(Yt.error);_(ht),st()}).catch(Yt=>{console.error("Error:",Yt),Se("Failed to save changes. Please try again.")})},$e=()=>{le(0),pe(""),we(""),$t(""),oe(0),_e({send_sms:null,action:null})},ae=Et`
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
    <form onSubmit=${Ee}>
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
                  value=${ue.some(se=>se.pins===(dt==null?void 0:dt.setrpins))?dt==null?void 0:dt.setrpins:""}
                  onChange=${se=>_({...dt,setrpins:se.target.value})}
                  class="border rounded p-2 w-full"
                >
                  <option value="">Select a connection</option>
                  ${ue.map(se=>Et`
                      <option value=${se.pins}>
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
  `:Et`
    <form onSubmit=${Ee}>
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
                  value=${Xt}
                  onChange=${se=>le(parseInt(se.target.value))}
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
                  value=${xe}
                  onInput=${se=>ye("action",se.target.value)}
                  class="border rounded p-2 w-full ${me.action?"border-red-500":""}"
                  placeholder="None"
                />
                ${me.action&&Et`<p class="text-red-500 text-sm">${me.action}</p>`}
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Send SMS</td>
              <td class="p-2">
                <select
                  name="send_sms"
                  value=${re}
                  onchange=${se=>ye("send_sms",se.target.value)}
                  class="border rounded p-2 w-full ${me.send_sms?"border-red-500":""}"
                >
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                </select>
                ${me.send_sms&&Et` <p class="text-red-500 text-sm">${me.send_sms}</p> `}
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">INFO</td>
              <td class="p-2">
                <input
                  type="text"
                  name="info"
                  value=${te}
                  onInput=${se=>$t(se.target.value)}
                  class="border rounded p-2 w-full"
                />
              </td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">On/Off</td>
              <td class="p-2">
                <${pt} value=${Zt} onChange=${oe} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-between mt-4">
        <button
          type="button"
          onClick=${$e}
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
      ${Ce&&Et`<p class="text-red-500 mt-2">${Ce}</p>`}
    </form>
  `}
        </div>
      </div>
    </div>
  `,ge=at(null);return lt(()=>{const se=document.createElement("div");return se.id="modal-portal",document.body.appendChild(se),ge.current=se,()=>{O(null,se),document.body.removeChild(se)}},[]),lt(()=>{ge.current&&O(ae,ge.current)}),null};function initGlobalTooltip$1(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,pt=$.offsetHeight,te=window.innerWidth,$t=dt.getBoundingClientRect();let Zt=$t.left+$t.width/2-_/2;Zt=Math.max(8,Math.min(Zt,te-_-8));let oe=$t.top-pt-8;oe<8&&(oe=$t.bottom+8),$.style.left=Zt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabSecurity=()=>{const[$,k]=ut({lang:"ru",sim800l:0,onoff:0,tel:"",info:""}),[st,ct]=ut(!1),[dt,_]=ut(!1),[pt,te]=ut([]),[$t,Zt]=ut(!1),[oe,Xt]=ut("ru"),[le,re]=ut(!1),[pe,xe]=ut(""),[we,ue]=ut(null),[he,me]=ut(!1),[_e,Ce]=ut("connected"),[Se,Oe]=ut(0);lt(()=>{initGlobalTooltip$1()},[]);const de=()=>oe==="ru"?ruLangsecurity:enLangsecurity,ye=()=>oe==="ru"?ruLangsecuritypins:enLangsecuritypins,Ee=(fe,ke)=>{const ne=(fe&&fe[ke]?fe[ke]:"").split(" "),be=[];for(let Ie=0;Ie<ne.length;Ie+=15)be.push(ne.slice(Ie,Ie+15).join(" "));return be.join("<br>")},$e=({title:fe,langArr:ke,tooltipIndex:mt})=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Ee(ke,mt)}
    >
      ${fe}
    </th>
  `,Te=(fe,ke)=>{let mt;return(...ne)=>{clearTimeout(mt),mt=setTimeout(()=>fe(...ne),ke)}},ve=async(fe,ke={},mt=3)=>{try{const ne=await fetch(fe,ke);if(!ne.ok)throw new Error("Network response was not ok");return Ce("connected"),ne}catch(ne){if(Ce("error"),mt>0)return await new Promise(be=>setTimeout(be,1e3)),ve(fe,ke,mt-1);throw Ce("disconnected"),ne}},ae={ru:Et`
      <div class="mytext space-y-6">
        <div>
          <h2 class="text-xl font-bold mb-4 text-blue-600">Модуль SIM800L📱</h2>
          <p class="mb-4">
            Модуль позволяет управлять "Заготовкой" при помощи мобильной связи - интернет не нужен!
          </p>
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
              <p class="font-bold">✅ Когда ползунок 'OnOFF' ВКЛючен:</p>
              <p>SMS-уведомления работают по вашим настройкам из таблицы 'Security Pins'</p>
            </div>
            <div class="p-3 bg-gray-50 rounded">
              <p class="font-bold">⭕ Когда ползунок 'OnOFF' ОТКлючен:</p>
              <p>Все SMS-уведомления отключены, настройки из таблицы 'Security Pins' не учитываются</p>
            </div>
          </div>
          <div class="mt-6 bg-red-50 p-4 rounded-lg">
            <h3 class="text-red-600 font-bold mb-2">📍 ВАЖНО!</h3>
            <ul class="space-y-2 list-disc pl-5 text-red-700">
              <li>Установить SIM-карту в модуль SIM800L</li>
              <li>Включить SIM800L → Дождаться подключения к GSM → Включить STM32</li>
            </ul>
          </div>
        </div>
      </div>
    `,en:Et`
      <div class="mytext space-y-6">
        <div>
          <h2 class="text-xl font-bold mb-4 text-blue-600">SIM800L Module📱</h2>
          <p class="mb-4">
            The module controls your "Template" using mobile network - no internet required!
          </p>
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
              <p class="font-bold">✅ When 'OnOFF' slider is ON:</p>
              <p>SMS notifications work according to your settings in the 'Security Pins' table</p>
            </div>
            <div class="p-3 bg-gray-50 rounded">
              <p class="font-bold">⭕ When 'OnOFF' slider is OFF:</p>
              <p>All SMS notifications are disabled, settings in the 'Security Pins' table are ignored</p>
            </div>
          </div>
          <div class="mt-6 bg-red-50 p-4 rounded-lg">
            <h3 class="text-red-600 font-bold mb-2">📍 IMPORTANT!</h3>
            <ul class="space-y-2 list-disc pl-5 text-red-700">
              <li>Insert SIM card into the SIM800L module</li>
              <li>Turn ON SIM800L → Wait for GSM connection → Turn ON STM32</li>
            </ul>
          </div>
        </div>
      </div>
    `},ge={ru:Et`
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
              <p class="font-bold">✅ Значение <span class="text-blue-500 font-bold">'YES'</span> в столбце "Send SMS":</p>
              <p>SMS-уведомление будет отправлено</p>
            </div>
            <div class="p-3 bg-gray-50 rounded">
              <p class="font-bold">⭕ Значение <span class="text-blue-500 font-bold">'NO'</span> в столбце "Send SMS":</p>
              <p>SMS-уведомление не будет отправлено</p>
            </div>
          </div>
          <div class="mt-4 bg-yellow-50 p-4 rounded-lg">
            <h3 class="font-bold mb-2">📍 Примечание:</h3>
            <ul class="space-y-2">
              <li>• Действия в столбце 'Action' зависят от ползунка 'OnOff' выбранного пина.</li>
              <li>• Данная страница отправляет изменения по MQTT на топик: <span class="text-blue-500 font-bold">Swarm/security/</span></li>
            </ul>
          </div>
        </div>
      </div>
    `,en:Et`
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
              <p class="font-bold">✅ Value <span class="text-blue-500 font-bold">'YES'</span> in "Send SMS" column:</p>
              <p>SMS notification will be sent</p>
            </div>
            <div class="p-3 bg-gray-50 rounded">
              <p class="font-bold">⭕ Value <span class="text-blue-500 font-bold">'NO'</span> in "Send SMS" column:</p>
              <p>SMS notification will not be sent</p>
            </div>
          </div>
          <div class="mt-4 bg-yellow-50 p-4 rounded-lg">
            <h3 class="font-bold mb-2">📍 Note:</h3>
            <ul class="space-y-2">
              <li>• Actions in the 'Action' column depend on the 'OnOff' slider of the selected pin.</li>
              <li>• This page sends changes via MQTT to topic: <span class="text-blue-500 font-bold">Swarm/security/</span></li>
            </ul>
          </div>
        </div>
      </div>
    `},se=async()=>{if(!(he||Date.now()-Se<500))try{const ke=await(await ve("/api/sim800l/get")).json();k(ke)}catch(fe){console.error("Error fetching SIM800L data:",fe)}},ht=async()=>{if(!(he||Date.now()-Se<500))try{const ke=await(await ve("/api/monitoring/get")).json();te(ke.pins||[])}catch(fe){console.error("Error fetching monitoring data:",fe)}};lt(()=>{fetch("/api/monitoring/get").then(ke=>ke.json()).then(ke=>Xt(ke.lang||"ru")).catch(ke=>console.error("Error fetching initial language:",ke));const fe=setInterval(()=>{se(),ht()},500);return()=>clearInterval(fe)},[]);const Yt=Te(async fe=>{me(!0);try{await ve("/api/sim800l/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(fe)}),k(fe),Oe(Date.now())}catch(ke){console.error("Error updating SIM800L:",ke)}finally{me(!1)}},300),ee=async fe=>{try{const ke=await fetch("/api/monitoring/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(fe)});if(!ke.ok)throw new Error(`HTTP error! status: ${ke.status}`);te(mt=>mt.map(ne=>ne.id===fe.id?fe:ne)),await ht(),re(!1)}catch(ke){console.error("Error updating security:",ke),alert("Failed to save changes. Please try again."),await ht()}},vt=fe=>{te(ke=>ke.map(mt=>mt.id===fe.id?{...mt,...fe}:mt)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:fe.id,onoff:fe.onoff})}).then(ke=>ke.json()).then(ke=>console.log("Response from /api/onoff/set:",ke)).catch(ke=>console.error("Error calling /api/onoff/set:",ke)),ce()},ie=(fe,ke)=>{xe(fe),ue(ke),re(!0)},ce=()=>{re(!1),xe(""),ue(null)};return Et`
    <div class="flex flex-col items-center w-full p-4">
      ${_e!=="connected"&&Et`
        <div class=${`w-full p-2 mb-4 text-white text-center rounded-xl shadow-md backdrop-blur-md 
          ${_e==="error"?"bg-yellow-500/80 border border-yellow-400/50":"bg-red-500/80 border border-red-400/50"}`}>
          ${_e==="error"?"Connection problems. Retrying...":"Connection lost. Check your internet connection."}
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
                  <${$e} title="RXD Pin"      langArr=${de()} tooltipIndex=${1} />
                  <${$e} title="TXD Pin"      langArr=${de()} tooltipIndex=${2} />
                  <${$e} title="Phone Number" langArr=${de()} tooltipIndex=${3} />
                  <${$e} title="Info"         langArr=${de()} tooltipIndex=${4} />
                  <${$e} title="OnOff"        langArr=${de()} tooltipIndex=${5} />
                  <${$e} title="Action"       langArr=${de()} tooltipIndex=${6} />
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
                      onChange=${fe=>Yt({...$,onoff:fe})}
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

          <div class="flex justify-end mt-6 w-full">
            <button
              onclick=${()=>_(!dt)}
              class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            >
              ${dt?"Hide Help":"Show Help"}
            </button>
          </div>
          ${dt&&Et`
            <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
              ${ae[oe]}
            </div>
          `}
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
                  <${$e} title="ID"             langArr=${ye()} tooltipIndex=${1} />
                  <${$e} title="Pin"            langArr=${ye()} tooltipIndex=${2} />
                  <${$e} title="Type of sensor" langArr=${ye()} tooltipIndex=${3} />
                  <${$e} title="Action"         langArr=${ye()} tooltipIndex=${4} />
                  <${$e} title="Send SMS"       langArr=${ye()} tooltipIndex=${5} />
                  <${$e} title="INFO"           langArr=${ye()} tooltipIndex=${6} />
                  <${$e} title="On/Off"         langArr=${ye()} tooltipIndex=${7} />
                  <${$e} title="Edit Pin"       langArr=${ye()} tooltipIndex=${8} />
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                ${pt.length>0?pt.map((fe,ke)=>Et`
                      <tr class="${ke%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${fe.id}</td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${fe.pins}</td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                          ${["PIR","Normal open","Normal close"][fe.ptype]}
                        </td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${fe.action}</td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${fe.send_sms}</td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${fe.info}</td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                          <${MyPolzunok}
                            value=${fe.onoff}
                            onChange=${mt=>vt({...fe,onoff:mt})}
                          />
                        </td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                          <button
                            onClick=${()=>ie("edit",fe)}
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

          <div class="flex justify-end mt-6 w-full">
            <button
              onclick=${()=>Zt(!$t)}
              class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            >
              ${$t?"Hide Help":"Show Help"}
            </button>
          </div>
          ${$t&&Et`
            <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
              ${ge[oe]}
            </div>
          `}
        </div>

        ${st&&Et`
          <${ModalSIM800L}
            hideModal=${()=>ct(!1)}
            title="Edit SIM800L Settings"
            selectedGps=${$}
            onSave=${Yt}
          />
        `}

        ${le&&Et`
          <${ModalSecurity}
            modalType=${pe}
            page="TabSecurity"
            hideModal=${()=>re(!1)}
            title="Edit Security Settings"
            selectedSecurity=${we}
            onSecurityChange=${ee}
          />
        `}
      </div>
    </div>
  `};function initGlobalTooltip(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"320px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,pt=$.offsetHeight,te=window.innerWidth,$t=dt.getBoundingClientRect();let Zt=$t.left+$t.width/2-_/2;Zt=Math.max(8,Math.min(Zt,te-_-8));let oe=$t.top-pt-8;oe<8&&(oe=$t.bottom+8),$.style.left=Zt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const SETTINGS_TIP_IDX={Login:1,Password:2,"Time zone UTC":3,"IP address":4,"Subnet mask":5,"Default gateway":6,Token:7,Host:8,Port:9,Client:10,User:11,"Password (MQTT)":12,"TX topic":13,"RX topic":14,"HTTPS domain":15,"Private Key":16,"Public Key":17,Longitude:18,Latitude:19,Sunrise:20,Sunset:21,"Day Length":22,"Next full moon":23,Date:24,Time:25},getTip=($,k,st,ct)=>{const dt=k==="ru"?st:ct,_=SETTINGS_TIP_IDX[$];if(!_||!dt||!dt[_])return"";const pt=dt[_].split(" "),te=[];for(let $t=0;$t<pt.length;$t+=12)te.push(pt.slice($t,$t+12).join(" "));return te.join("<br>")},FieldRow=({label:$,tipLabel:k,index:st,tip:ct,children:dt})=>{const _=st%2===0?"bg-white/80":"bg-sky-200/40";return Et`
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
  `};function Settings({}){const[$,k]=ut({}),[st,ct]=ut(null),[dt,_]=ut(null),[pt,te]=ut({}),$t=at(null),[Zt,oe]=ut(null),[Xt,le]=ut(null),[re,pe]=ut(!1),[xe,we]=ut(!1),[ue,he]=ut(!1),[me,_e]=ut(!1),[Ce,Se]=ut(!1),[Oe,de]=ut(!0);lt(()=>{if(initGlobalTooltip(),!document.getElementById("__network_toggle_style")){const mt=document.createElement("style");mt.id="__network_toggle_style",mt.textContent=".network-toggle span { display: none !important; }",document.head.appendChild(mt)}},[]);const ye=mt=>getTip(mt,$.lang||"ru",rulangsettings,enlangsettings),Ee=[{value:"en",label:"English"},{value:"ru",label:"Russian"}],$e=[[-12,"(GMT -12:00) Eniwetok, Kwajalein"],[-11,"(GMT -11:00) Midway Island, Samoa"],[-10,"(GMT -10:00) Hawaii"],[-9,"(GMT -9:00) Alaska"],[-8,"(GMT -8:00) Pacific Time (US & Canada)"],[-7,"(GMT -7:00) Mountain Time (US & Canada)"],[-6,"(GMT -6:00) Central Time (US & Canada), Mexico City"],[-5,"(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima"],[-4,"(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz"],[-3.3,"(GMT -3:30) Newfoundland"],[-3,"(GMT -3:00) Brazil, Buenos Aires, Georgetown"],[-2,"(GMT -2:00) Mid-Atlantic"],[-1,"(GMT -1:00) Azores, Cape Verde Islands"],[0,"(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca"],[1,"(GMT +1:00) Brussels, Copenhagen, Madrid, Paris"],[2,"(GMT +2:00) Kaliningrad, South Africa"],[3,"(GMT +3:00) Moscow, St. Petersburg, Baghdad, Riyadh"],[3.3,"(GMT +3:30) Tehran"],[4,"(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi"],[4.3,"(GMT +4:30) Kabul"],[5,"(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"],[5.3,"(GMT +5:30) Bombay, Calcutta, Madras, New Delhi"],[5.45,"(GMT +5:45) Kathmandu"],[6,"(GMT +6:00) Almaty, Dhaka, Colombo"],[7,"(GMT +7:00) Bangkok, Hanoi, Jakarta"],[8,"(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"],[9,"(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"],[9.3,"(GMT +9:30) Adelaide, Darwin"],[10,"(GMT +10:00) Eastern Australia, Guam, Vladivostok"],[11,"(GMT +11:00) Magadan, Solomon Islands, New Caledonia"],[12,"(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"]],Te=/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,ve=/^(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)$/,ae=mt=>{if(!mt)return{date:"",time:""};const ne=mt.match(/d:(\d{1,2}\.\d{1,2}\.\d{2})/),be=mt.match(/t:(\d{2}:\d{2}:\d{2})/);return{date:ne?ne[1]:"",time:be?be[1]:""}},ge=mt=>{if(!/^\d{1,2}\.\d{1,2}\.\d{2}$/.test(mt))return!1;const[be,Ie,Me]=mt.split(".").map(Number);if(Ie<1||Ie>12||be<1||be>31||Me<0||Me>99)return!1;const Pe=new Date().getFullYear()%100;if(Me>Pe+5)return!1;const Ne=new Date(2e3+Me,Ie,0).getDate();return!(be>Ne)},se=mt=>/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(mt),ht=(mt,ne)=>{const be=Object.values(ne).some(Me=>Me!==null),Ie=mt.usehttps?mt.domain&&mt.domain.trim()!=="":!0;return!(be||!Ie)},Yt=(mt,ne)=>{oe({message:mt,type:ne}),setTimeout(()=>{oe(null)},3e3)},ee=mt=>{le(mt),setTimeout(()=>{le(null)},3e3)},vt=(mt,ne)=>{let be=null;if(!$.usehttps&&["domain","tls_key","tls_cert","tls_ca","telegram_token"].includes(mt))return null;if(!ne&&["ip_addr","gateway","mqtt_hst","sb_mask","offdate","offtime","domain"].includes(mt))return"Поле не может быть пустым";switch(mt){case"ip_addr":case"gateway":case"mqtt_hst":Te.test(ne)||(be="Неверный IP-адрес");break;case"sb_mask":ve.test(ne)||(be="Неверная маска подсети");break;case"offdate":ge(ne)||(be="Неверный формат даты (д.м.гг)");break;case"offtime":se(ne)||(be="Неверный формат времени (чч:мм:сс)");break;case"domain":ne.length>50?be="Домен не должен превышать 50 символов":ne.match(/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/)||(be="Неверный формат домена");break;case"tls_key":ne&&ne.trim()!==""&&(ne.length>512?be="Private Key не должен превышать 512 символов":(!ne.includes("BEGIN EC PRIVATE KEY")||!ne.includes("END EC PRIVATE KEY"))&&(be="Неверный формат Private Key"));break;case"tls_cert":ne&&ne.trim()!==""&&(ne.length>1024?be="Public Key не должен превышать 1024 символов":(!ne.includes("BEGIN CERTIFICATE")||!ne.includes("END CERTIFICATE"))&&(be="Неверный формат Public Key"));break;case"tls_ca":ne&&ne.trim()!==""&&(ne.length>1024?be="Secret Key не должен превышать 1024 символов":(!ne.includes("BEGIN CERTIFICATE")||!ne.includes("END CERTIFICATE"))&&(be="Неверный формат Secret Key"));break}return be},ie=mt=>{mt.preventDefault();const ne=new FormData($t.current);let be={...$};for(const[Ie,Me]of ne.entries())["lon_de","lat_de","timezone","mqtt_prt"].includes(Ie)?be[Ie]=Me===""||Me===null?0:Number(Me):be[Ie]=Me;be.usehttps||["tls_ca","tls_key","tls_cert","telegram_token","domain"].forEach(Ie=>delete be[Ie]),be.offdate&&be.offtime?be.offldt=`d:${be.offdate} t:${be.offtime}`:delete be.offldt,["lon_de","lat_de","timezone","mqtt_prt"].forEach(Ie=>{(be[Ie]===null||be[Ie]==="")&&(be[Ie]=0)}),be.onsunrise=be.onsunrise?1:0,be.onsunset=be.onsunset?1:0,be.check_ip=be.check_ip?1:0,be.check_mqtt=be.check_mqtt?1:0,be.usehttps=be.usehttps?1:0,fetch("/api/mysett/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(be)}).then(Ie=>{if(!Ie.ok)throw new Error("Ошибка сети");return Ie.json()}).then(Ie=>{_("success"),ct(Ie),Yt("Данные успешно сохранены","success"),ee("Данные успешно сохранены")}).catch(Ie=>{_("error"),ct(Ie),Yt("Ошибка при сохранении данных","error"),ee("Ошибка при сохранении данных")})},ce=(mt,ne)=>{let be=null;mt==="offdate"?be=ge(ne)?null:"Неверный формат даты (д.м.гг)":mt==="offtime"?be=se(ne)?null:"Неверный формат времени (чч:мм:сс)":be=vt(mt,ne),te(Me=>{const Pe={...Me,[mt]:be},Ne=["tls_key","tls_cert","tls_ca"],De=Object.keys(Pe).filter(Le=>!Ne.includes(Le)&&Le!=="telegram_token").some(Le=>Pe[Le]!==null);return pe(De||!$.usehttps&&Ne.some(Le=>$[Le])),Pe});let Ie=ne;["lon_de","lat_de","timezone","mqtt_prt"].includes(mt)?Ie=ne===""||ne===null?0:Number(ne):["onsunrise","onsunset","check_ip","check_mqtt","usehttps"].includes(mt)&&(Ie=ne?1:0),k(Me=>({...Me,[mt]:Ie})),mt==="usehttps"&&(te({}),pe(!1))},fe=()=>fetch("/api/mysett/get").then(mt=>mt.json()).then(mt=>{if(mt.offldt){const{date:ne,time:be}=ae(mt.offldt);mt.offdate=ne,mt.offtime=be}return k(mt),mt}).catch(mt=>{console.error("Error fetching settings:",mt),Yt("Ошибка при загрузке настроек","error")});if(lt(()=>{fe().then(mt=>{mt!=null&&mt.tls_key&&we(!0),mt!=null&&mt.tls_cert&&he(!0),mt!=null&&mt.tls_ca&&_e(!0),mt!=null&&mt.telegram_token&&Se(!0),de(!1)})},[]),lt(()=>{pe(!ht($,pt))},[$,pt]),Oe)return Et`<div>Loading...</div>`;if(!$)return"";const ke=(mt="")=>Et`
    <button
      type="submit"
      class=${`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 ${re?"opacity-50 cursor-not-allowed bg-slate-400":"bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500"} ${mt}`}
      disabled=${re}
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
            onChange=${mt=>ce("lang",mt.target.value)}
            style="border: 2px solid #22d3ee; border-radius: 8px; padding: 4px 10px; font-size: 14px; font-weight: 600; background: white; color: #1e293b; cursor: pointer; outline: none;"
          >
            ${Ee.map(mt=>Et`<option value=${mt.value}>${mt.label}</option>`)}
          </select>
        </div>

        ${Xt&&Et`
          <div class="w-full max-w-4xl bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center mb-6 border border-green-400/50 backdrop-blur-md">
            ${Xt}
          </div>
        `}

        <form ref=${$t} onSubmit=${ie} class="w-full max-w-4xl flex flex-col gap-6 relative">

          <div class="flex justify-end w-full">${ke()}</div>

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
              ${[{label:"Login",key:"adm_name",type:"text"},{label:"Password",key:"adm_pswd",type:"password"},{label:"Time zone UTC",key:"timezone",type:"select",options:$e}].map((mt,ne)=>Et`
                <${FieldRow} label=${mt.label} tip=${ye(mt.tipLabel||mt.label)} index=${ne}>
                  <${pageSetting}
                    value=${$[mt.key]}
                    setfn=${be=>ce(mt.key,be)}
                    type=${mt.type}
                    options=${mt.options}
                    class=${`w-full px-3 py-2 bg-white/50 border ${pt[mt.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    error=${pt[mt.key]}
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
                            <${MyPolzunok} value=${$.check_ip} onChange=${mt=>ce("check_ip",mt)} />
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
                            <${MyPolzunok} value=${$.check_ip} onChange=${mt=>ce("check_ip",mt)} />
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
                  ${[{label:"IP address",key:"ip_addr",type:"text"},{label:"Subnet mask",key:"sb_mask",type:"text"},{label:"Default gateway",key:"gateway",type:"text"}].map((mt,ne)=>Et`
                    <${FieldRow} label=${mt.label} tip=${ye(mt.tipLabel||mt.label)} index=${ne}>
                      <${pageSetting}
                        value=${$[mt.key]}
                        setfn=${be=>ce(mt.key,be)}
                        type=${mt.type}
                        class=${`w-full px-3 py-2 bg-white/50 border ${pt[mt.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        error=${pt[mt.key]}
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
              <${FieldRow} label="Token" tip=${ye("Token")} index=${0}>
                <${pageSetting}
                  value=${$.token}
                  setfn=${mt=>ce("token",mt)}
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
                          <${MyPolzunok} value=${$.check_mqtt} onChange=${mt=>ce("check_mqtt",mt)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[{label:"Host",key:"mqtt_hst",type:"text"},{label:"Port",key:"mqtt_prt",type:"number"},{label:"Client",key:"mqtt_clt",type:"text"},{label:"User",key:"mqtt_usr",type:"text"},{label:"Password",key:"mqtt_pswd",type:"password",tipLabel:"Password (MQTT)"},{label:"TX topic",key:"txmqttop",type:"text"},{label:"RX topic",key:"rxmqttop",type:"text"}].map((mt,ne)=>Et`
                  <${FieldRow} label=${mt.label} tip=${ye(mt.tipLabel||mt.label)} index=${ne}>
                    <${pageSetting}
                      value=${$[mt.key]}
                      setfn=${be=>ce(mt.key,be)}
                      type=${mt.type}
                      class=${`w-full px-3 py-2 bg-white/50 border ${pt[mt.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      error=${pt[mt.key]}
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
                          <${MyPolzunok} value=${$.check_mqtt} onChange=${mt=>ce("check_mqtt",mt)} />
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
                          <${MyPolzunok} value=${$.usehttps} onChange=${mt=>ce("usehttps",mt)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[{label:"HTTPS domain",key:"domain",type:"text"},{label:"Private Key",key:"tls_key",type:"textarea"},{label:"Public Key",key:"tls_cert",type:"textarea"}].map((mt,ne)=>Et`
                  <tr class="transition-colors border-b border-slate-200 ${ne%2===0?"bg-sky-200/40":"bg-white/80"} hover:bg-slate-200/80">
                    <td
                      class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help align-top"
                      data-tip=${ye(mt.label)}
                    >
                      ${mt.label}
                    </td>
                    <td class="w-2/3 pl-4 py-4 pr-6 align-top">
                      <div class="relative w-full">
                        ${mt.type==="textarea"?Et`
                            ${mt.key==="tls_key"&&$.tls_key?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены, но информация скрыта!</div>`:mt.key==="tls_cert"&&$.tls_cert?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены успешно!</div>`:Et`<textarea
                                    name=${mt.key}
                                    value=${$[mt.key]||""}
                                    onInput=${be=>ce(mt.key,be.target.value)}
                                    class=${`w-full px-3 py-2 bg-white/50 border ${pt[mt.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                                    rows="1"
                                    placeholder="Enter ${mt.label}"
                                  ></textarea>`}
                          `:Et`
                            <input
                              type="text"
                              name=${mt.key}
                              value=${$[mt.key]||""}
                              onInput=${be=>ce(mt.key,be.target.value)}
                              class=${`w-full px-3 py-2 bg-white/50 border ${pt[mt.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                              maxlength="30"
                              placeholder="Enter domain (e.g., zagotovka.ddns.net)"
                            />
                          `}
                        ${$[mt.key]&&mt.key==="tls_cert"&&Et`
                          <div class="absolute right-0 top-0 mt-[3px] mr-[3px] flex gap-2">
                            <button type="button"
                              onClick=${()=>{navigator.clipboard.writeText($[mt.key]),ee("Данные скопированы")}}
                              class="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5"
                            >Копировать</button>
                            <button type="button"
                              onClick=${()=>ce(mt.key,"")}
                              class="px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                            >Очистить</button>
                          </div>
                        `}
                        ${$[mt.key]&&mt.key!=="domain"&&mt.key!=="tls_cert"&&Et`
                          <button type="button"
                            onClick=${()=>ce(mt.key,"")}
                            class="absolute right-0 top-0 mt-[3px] mr-[3px] px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                          >Очистить</button>
                        `}
                      </div>
                      ${pt[mt.key]&&Et`<div class="text-red-500 text-sm mt-1 font-semibold w-full text-left">${pt[mt.key]}</div>`}
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
                          <${MyPolzunok} value=${$.usehttps} onChange=${mt=>ce("usehttps",mt)} />
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

              <${FieldRow} label="Longitude" tip=${ye("Longitude")} index=${0}>
                <${pageSetting} value=${$.lon_de} setfn=${mt=>ce("lon_de",mt)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${pt.lon_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${pt.lon_de} />
              <//>

              <${FieldRow} label="Latitude" tip=${ye("Latitude")} index=${1}>
                <${pageSetting} value=${$.lat_de} setfn=${mt=>ce("lat_de",mt)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${pt.lat_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${pt.lat_de} />
              <//>

              <!-- Sunrise — нестандартная строка, data-tip вручную -->
              <tr class="transition-colors border-b border-slate-200 bg-white/80 hover:bg-slate-200/80">
                <td
                  class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
                  data-tip=${ye("Sunrise")}
                >
                  Sunrise: <span class="text-teal-600 drop-shadow-sm">${$.sunrise}</span>
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <div class="flex items-center gap-4">
                    <${MyPolzunok} value=${$.onsunrise} onChange=${mt=>ce("onsunrise",mt)} />
                    <input type="text" value=${$.sunrise_pins||""} onInput=${mt=>ce("sunrise_pins",mt.target.value)}
                      maxlength="20" placeholder="Action for sunrise"
                      class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  </div>
                </td>
              </tr>

              <!-- Sunset -->
              <tr class="transition-colors border-b border-slate-200 bg-sky-200/40 hover:bg-slate-200/80">
                <td
                  class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
                  data-tip=${ye("Sunset")}
                >
                  Sunset: <span class="text-teal-600 drop-shadow-sm">${$.sunset}</span>
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <div class="flex items-center gap-4">
                    <${MyPolzunok} value=${$.onsunset} onChange=${mt=>ce("onsunset",mt)} />
                    <input type="text" value=${$.sunset_pins||""} onInput=${mt=>ce("sunset_pins",mt.target.value)}
                      maxlength="20" placeholder="Action for sunset"
                      class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  </div>
                </td>
              </tr>

              <${FieldRow} label="Day Length" tip=${ye("Day Length")} index=${4}>
                <span class="text-xl font-medium text-slate-800">${$.dlength}</span>
              <//>

              <${FieldRow} label="Next full moon" tip=${ye("Next full moon")} index=${5}>
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
                  data-tip=${ye("Date")}
                >
                  Date
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <input type="text" name="offdate" value=${$.offdate||""} onInput=${mt=>ce("offdate",mt.target.value)}
                    placeholder="dd.mm.yy"
                    class=${`w-full px-3 py-2 bg-white/50 border ${pt.offdate?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${pt.offdate&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${pt.offdate}</div>`}
                </td>
              </tr>

              <!-- Time -->
              <tr class="transition-colors border-b border-slate-200 bg-sky-200/40 hover:bg-slate-200/80">
                <td
                  class="w-1/3 font-bold text-slate-700 text-lg border-r border-slate-500 py-4 px-6 cursor-help"
                  data-tip=${ye("Time")}
                >
                  Time
                </td>
                <td class="w-2/3 pl-4 py-4 pr-6">
                  <input type="text" name="offtime" value=${$.offtime||""} onInput=${mt=>ce("offtime",mt.target.value)}
                    placeholder="hh:mm:ss"
                    class=${`w-full px-3 py-2 bg-white/50 border ${pt.offtime?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${pt.offtime&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${pt.offtime}</div>`}
                </td>
              </tr>
              </tbody>
            </table>
            </div>
          </div>

          ${Xt&&Et`
            <div class="w-full bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center border border-green-400/50 backdrop-blur-md">
              ${Xt}
            </div>
          `}

          <div class="flex justify-end w-full mb-4">${ke()}</div>

        </form>
      </div>
    </div>
    ${Zt&&Et`<${Toast} message=${Zt.message} type=${Zt.type} />`}
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
  </svg>`;function Header({logout:$,user:k,setShowSidebar:st,showSidebar:ct}){const[dt,_]=ut(new Date),[pt,te]=ut(null),$t=(le,re)=>new Date(le.year+1900,le.mon,le.mday,le.hour,le.min,le.sec),Zt=async()=>{try{const re=await(await fetch("/api/stm32-time")).text();let pe;try{pe=JSON.parse(re)}catch{return}pe.status&&pe.time?te($t(pe.time,pe.timezone)):te(null)}catch{te(null)}};lt(()=>{const le=setInterval(()=>_(new Date),1e3),re=setInterval(Zt,1e3);return Zt(),()=>{clearInterval(le),clearInterval(re)}},[]);const oe=le=>le.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric"}),Xt=le=>le.toLocaleTimeString("ru-RU");return Et`
    <div
      class="bg-white/40 backdrop-blur-md border-b border-white/40 shadow-sm sticky top-0 z-[48] w-full py-2 ${ct?"pl-72":""} transition-all duration-300 transform"
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
          <span class="text-sm text-slate-600">
            Дата: ${oe(dt)}<span style="margin-left: 8px;"></span
            >Время: ${Xt(dt)}
          </span>
        </div>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600"
            >STM32 дата:
            ${pt?oe(pt):" 00.00.0000"}<span
              style="margin-left: 8px;"
            ></span
            >Время: ${pt?Xt(pt):"00:00"}
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
  `}function Sidebar({url:$,show:k}){const st=({title:ct,icon:dt,href:_,url:pt})=>Et`
  <div>
    <a href="#${_}" class="${_==pt?"bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-md group":"text-slate-600 hover:bg-slate-200/60 hover:text-slate-800 group"} flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
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
  <//>`}function Chart({data:$}){const k=$.length,st=20,ct=15,dt=100,_=5,pt=10,te=25,$t=le=>(dt-pt)/_*(le+1),Zt=le=>(dt-pt)*le/100,oe=le=>dt-pt-Zt(le),Xt=(le,re,pe)=>Array.from({length:re},(xe,we)=>we*1+le);return Et` <div
    class="my-4 divide-y divide-gray-200 overflow-auto rounded bg-white"
  >
    <div class="font-light uppercase flex items-center text-gray-600 px-4 py-2">
      Temperature, last 24h
    <//>
    <div class="relative">
      <svg class="bg-yellow-x50 w-full p-4" viewBox="0 0 ${k*st+ct} ${dt}">
        ${Xt(0,_).map(le=>Et`
            <line
              x1="0"
              y1=${$t(le)}
              x2=${ct+k*st}
              y2=${$t(le)}
              stroke-width="0.3"
              class="stroke-slate-300"
              stroke-dasharray="1,1"
            />
            <text x="0" y=${$t(le)-2} class="text-[6px] fill-slate-400"
              >${te-te/_*(le+1)}<//
            >
          `)}
        ${Xt(0,k).map(le=>Et`
            <rect
              x=${ct+le*st}
              y=${oe($[le]*100/te)}
              width="12"
              height=${Zt($[le]*100/te)}
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
  `}function FirmwareUpdate({}){const[$,k]=ut([{},{}]),[st,ct]=ut(null),dt=()=>fetch("api/firmware/status").then(le=>le.json()).then(le=>k(le));lt(dt,[]),lt(()=>{if(st){const le=setTimeout(()=>{ct(null)},3e3);return()=>clearTimeout(le)}},[st]);const _=le=>fetch("api/firmware/commit").then(re=>re.json()).then(dt),pt=le=>fetch("api/reboot",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reboot:1})}).then(re=>re.json()).then(re=>new Promise(pe=>setTimeout(()=>{dt(),pe()},5e3))),te=le=>fetch("api/firmware/rollback").then(pt),$t=le=>fetch("api/device/eraselast").then(dt),Zt=function(le){if(!le){ct({type:"yellow",message:"Error: No file selected."});return}const re=le.name.split(".").pop().toLowerCase();if(re!=="bin"&&re!=="hex"){ct({type:"red",message:"Error: Only .bin and .hex files are allowed!"});return}const pe=new FormData;pe.append("file",le),fetch("api/firmware/upload",{method:"POST",body:pe}).then(xe=>{if(!xe.ok)throw new Error(`HTTP error! status: ${xe.status}`);return xe.json()}).then(()=>{ct({type:"green",message:"Firmware uploaded successfully!"}),dt()}).catch(xe=>{ct({type:"yellow",message:`Error: Upload failed. ${xe.message}`})})},oe=({type:le,message:re})=>Et`
      <div
        class=${`fixed top-0 left-0 right-0 z-50 border-b-4 p-4 ${le==="red"?"bg-red-100 border-red-500 text-red-700":le==="yellow"?"bg-yellow-100 border-yellow-500 text-yellow-700":"bg-green-100 border-green-500 text-green-700"}`}
        role="alert"
      >
        <p class="font-bold text-center">${re}</p>
      </div>
    `,Xt=({title:le,onupload:re})=>Et`
      <label
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        ${le}
        <input
          type="file"
          class="hidden"
          accept=".bin,.hex"
          onChange=${xe=>{const we=xe.target.files[0];we&&re(we)}}
        />
      </label>
    `;return Et`
    ${st&&Et`<${oe} type=${st.type} message=${st.message} />`}
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
          <${Xt}
            title="Upload new firmware (.bin or .hex)"
            onupload=${Zt}
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
            onclick=${$t}
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
  `}const pageSetting=({value:$,setfn:k,type:st,options:ct,error:dt,..._})=>{let pt;const te=`w-full px-3 py-2 border rounded-md ${dt?"border-red-500":"border-gray-300"}`;switch(st){case"text":case"password":case"number":pt=Et`
        <input
          type=${st}
          value=${$}
          onInput=${$t=>k($t.target.value)}
          class=${te}
          ...${_}
        />
      `;break;case"select":pt=Et`
        <select
          value=${$}
          onChange=${$t=>k($t.target.value)}
          class=${te}
          ...${_}
        >
          ${ct.map(([$t,Zt])=>Et` <option value=${$t}>${Zt}</option> `)}
        </select>
      `;break;case"switch":pt=Et`
        <label class="switch">
          <input
            type="checkbox"
            checked=${$}
            onChange=${$t=>k($t.target.checked)}
            ...${_}
          />
          <span class="slider round"></span>
        </label>
      `;break;default:pt=Et`<span>Неподдерживаемый тип: ${st}</span>`}return Et`
    <div>
      ${pt}
      ${dt&&Et`<div class="text-red-500 text-sm mt-1">${dt}</div>`}
    </div>
  `};function Toast({message:$,type:k,onClose:st}){return lt(()=>{const ct=setTimeout(()=>{st()},3e3);return()=>clearTimeout(ct)},[]),Et`
    <div
      class=${`fixed bottom-4 right-4 p-4 rounded-md ${k==="success"?"bg-green-500":"bg-red-500"} text-white`}
    >
      ${$}
    </div>
  `}const App=function({}){const[$,k]=ut(!0),[st,ct]=ut("/"),[dt,_]=ut(""),[pt,te]=ut(!0),$t=()=>fetch("api/logout").then(oe=>_("")),Zt=oe=>oe.ok?oe.json().then(Xt=>_(Xt.user)).finally(Xt=>k(!1)):k(!1)&&_(null);return lt(()=>fetch("api/login").then(Zt),[]),$?"":dt?Et` <div class="min-h-screen bg-slate-100" id="mains">
    <${Sidebar} url=${st} show=${pt} />
    <${Header}
      logout=${$t}
      user=${dt}
      showSidebar=${pt}
      setShowSidebar=${te}
    />
    <div
      class="${pt&&"pl-72"} transition-all duration-300 transform"
    >
      <${Qt}
        onChange=${oe=>ct(oe.url)}
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
  <//>`:Et`<${Login}
      loginFn=${Zt}
      logoIcon=${Logo}
      title="Device Dashboard Login"
      tipText="To login, use: admin/admin, user1/user1, user2/user2"
    />`};window.onload=()=>O(y(App),document.body);
