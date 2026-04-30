(function(){const k=document.createElement("link").relList;if(k&&k.supports&&k.supports("modulepreload"))return;for(const dt of document.querySelectorAll('link[rel="modulepreload"]'))ct(dt);new MutationObserver(dt=>{for(const _ of dt)if(_.type==="childList")for(const pt of _.addedNodes)pt.tagName==="LINK"&&pt.rel==="modulepreload"&&ct(pt)}).observe(document,{childList:!0,subtree:!0});function st(dt){const _={};return dt.integrity&&(_.integrity=dt.integrity),dt.referrerPolicy&&(_.referrerPolicy=dt.referrerPolicy),dt.crossOrigin==="use-credentials"?_.credentials="include":dt.crossOrigin==="anonymous"?_.credentials="omit":_.credentials="same-origin",_}function ct(dt){if(dt.ep)return;dt.ep=!0;const _=st(dt);fetch(dt.href,_)}})();var t,n,e,r,o,u,i,l,c,a,s,f={},p=[],h=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,d=Array.isArray;function v($,k){for(var st in k)$[st]=k[st];return $}function m($){var k=$.parentNode;k&&k.removeChild($)}function y($,k,st){var ct,dt,_,pt={};for(_ in k)_=="key"?ct=k[_]:_=="ref"?dt=k[_]:pt[_]=k[_];if(arguments.length>2&&(pt.children=arguments.length>3?t.call(arguments,2):st),typeof $=="function"&&$.defaultProps!=null)for(_ in $.defaultProps)pt[_]===void 0&&(pt[_]=$.defaultProps[_]);return g($,pt,ct,dt,null)}function g($,k,st,ct,dt){var _={type:$,props:k,key:st,ref:ct,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:dt??++e,__i:-1,__u:0};return dt==null&&n.vnode!=null&&n.vnode(_),_}function b($){return $.children}function C($,k){this.props=$,this.context=k}function x($,k){if(k==null)return $.__?x($.__,$.__i+1):null;for(var st;k<$.__k.length;k++)if((st=$.__k[k])!=null&&st.__e!=null)return st.__e;return typeof $.type=="function"?x($):null}function w($){var k,st;if(($=$.__)!=null&&$.__c!=null){for($.__e=$.__c.base=null,k=0;k<$.__k.length;k++)if((st=$.__k[k])!=null&&st.__e!=null){$.__e=$.__c.base=st.__e;break}return w($)}}function P($){(!$.__d&&($.__d=!0)&&r.push($)&&!U.__r++||o!==n.debounceRendering)&&((o=n.debounceRendering)||u)(U)}function U(){var $,k,st,ct,dt,_,pt,ee;for(r.sort(i);$=r.shift();)$.__d&&(k=r.length,ct=void 0,_=(dt=(st=$).__v).__e,pt=[],ee=[],st.__P&&((ct=v({},dt)).__v=dt.__v+1,n.vnode&&n.vnode(ct),M(st.__P,ct,dt,st.__n,st.__P.namespaceURI,32&dt.__u?[_]:null,pt,_??x(dt),!!(32&dt.__u),ee),ct.__v=dt.__v,ct.__.__k[ct.__i]=ct,L(pt,ct,ee),ct.__e!=_&&w(ct)),r.length>k&&r.sort(i));U.__r=0}function H($,k,st,ct,dt,_,pt,ee,vt,te,ne){var Xt,se,re,ce,ge,ye=ct&&ct.__k||p,pe=k.length;for(st.__d=vt,E(st,k,ye),vt=st.__d,Xt=0;Xt<pe;Xt++)(re=st.__k[Xt])!=null&&typeof re!="boolean"&&typeof re!="function"&&(se=re.__i===-1?f:ye[re.__i]||f,re.__i=Xt,M($,re,se,dt,_,pt,ee,vt,te,ne),ce=re.__e,re.ref&&se.ref!=re.ref&&(se.ref&&F(se.ref,null,re),ne.push(re.ref,re.__c||ce,re)),ge==null&&ce!=null&&(ge=ce),65536&re.__u||se.__k===re.__k?(vt&&!vt.isConnected&&(vt=x(se)),vt=S(re,vt,$)):typeof re.type=="function"&&re.__d!==void 0?vt=re.__d:ce&&(vt=ce.nextSibling),re.__d=void 0,re.__u&=-196609);st.__d=vt,st.__e=ge}function E($,k,st){var ct,dt,_,pt,ee,vt=k.length,te=st.length,ne=te,Xt=0;for($.__k=[],ct=0;ct<vt;ct++)pt=ct+Xt,(dt=$.__k[ct]=(dt=k[ct])==null||typeof dt=="boolean"||typeof dt=="function"?null:typeof dt=="string"||typeof dt=="number"||typeof dt=="bigint"||dt.constructor==String?g(null,dt,null,null,null):d(dt)?g(b,{children:dt},null,null,null):dt.constructor===void 0&&dt.__b>0?g(dt.type,dt.props,dt.key,dt.ref?dt.ref:null,dt.__v):dt)!=null?(dt.__=$,dt.__b=$.__b+1,ee=D(dt,st,pt,ne),dt.__i=ee,_=null,ee!==-1&&(ne--,(_=st[ee])&&(_.__u|=131072)),_==null||_.__v===null?(ee==-1&&Xt--,typeof dt.type!="function"&&(dt.__u|=65536)):ee!==pt&&(ee===pt+1?Xt++:ee>pt?ne>vt-pt?Xt+=ee-pt:Xt--:ee<pt?ee==pt-1&&(Xt=ee-pt):Xt=0,ee!==ct+Xt&&(dt.__u|=65536))):(_=st[pt])&&_.key==null&&_.__e&&(131072&_.__u)==0&&(_.__e==$.__d&&($.__d=x(_)),I(_,_,!1),st[pt]=null,ne--);if(ne)for(ct=0;ct<te;ct++)(_=st[ct])!=null&&(131072&_.__u)==0&&(_.__e==$.__d&&($.__d=x(_)),I(_,_))}function S($,k,st){var ct,dt;if(typeof $.type=="function"){for(ct=$.__k,dt=0;ct&&dt<ct.length;dt++)ct[dt]&&(ct[dt].__=$,k=S(ct[dt],k,st));return k}$.__e!=k&&(st.insertBefore($.__e,k||null),k=$.__e);do k=k&&k.nextSibling;while(k!=null&&k.nodeType===8);return k}function A($,k){return k=k||[],$==null||typeof $=="boolean"||(d($)?$.some((function(st){A(st,k)})):k.push($)),k}function D($,k,st,ct){var dt=$.key,_=$.type,pt=st-1,ee=st+1,vt=k[st];if(vt===null||vt&&dt==vt.key&&_===vt.type&&(131072&vt.__u)==0)return st;if(ct>(vt!=null&&(131072&vt.__u)==0?1:0))for(;pt>=0||ee<k.length;){if(pt>=0){if((vt=k[pt])&&(131072&vt.__u)==0&&dt==vt.key&&_===vt.type)return pt;pt--}if(ee<k.length){if((vt=k[ee])&&(131072&vt.__u)==0&&dt==vt.key&&_===vt.type)return ee;ee++}}return-1}function N($,k,st){k[0]==="-"?$.setProperty(k,st??""):$[k]=st==null?"":typeof st!="number"||h.test(k)?st:st+"px"}function R($,k,st,ct,dt){var _;t:if(k==="style")if(typeof st=="string")$.style.cssText=st;else{if(typeof ct=="string"&&($.style.cssText=ct=""),ct)for(k in ct)st&&k in st||N($.style,k,"");if(st)for(k in st)ct&&st[k]===ct[k]||N($.style,k,st[k])}else if(k[0]==="o"&&k[1]==="n")_=k!==(k=k.replace(/(PointerCapture)$|Capture$/i,"$1")),k=k.toLowerCase()in $||k==="onFocusOut"||k==="onFocusIn"?k.toLowerCase().slice(2):k.slice(2),$.l||($.l={}),$.l[k+_]=st,st?ct?st.u=ct.u:(st.u=l,$.addEventListener(k,_?a:c,_)):$.removeEventListener(k,_?a:c,_);else{if(dt=="http://www.w3.org/2000/svg")k=k.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(k!="width"&&k!="height"&&k!="href"&&k!="list"&&k!="form"&&k!="tabIndex"&&k!="download"&&k!="rowSpan"&&k!="colSpan"&&k!="role"&&k in $)try{$[k]=st??"";break t}catch{}typeof st=="function"||(st==null||st===!1&&k[4]!=="-"?$.removeAttribute(k):$.setAttribute(k,st))}}function T($){return function(k){if(this.l){var st=this.l[k.type+$];if(k.t==null)k.t=l++;else if(k.t<st.u)return;return st(n.event?n.event(k):k)}}}function M($,k,st,ct,dt,_,pt,ee,vt,te){var ne,Xt,se,re,ce,ge,ye,pe,he,be,$e,ke,_e,Oe,de,xe=k.type;if(k.constructor!==void 0)return null;128&st.__u&&(vt=!!(32&st.__u),_=[ee=k.__e=st.__e]),(ne=n.__b)&&ne(k);t:if(typeof xe=="function")try{if(pe=k.props,he=(ne=xe.contextType)&&ct[ne.__c],be=ne?he?he.props.value:ne.__:ct,st.__c?ye=(Xt=k.__c=st.__c).__=Xt.__E:("prototype"in xe&&xe.prototype.render?k.__c=Xt=new xe(pe,be):(k.__c=Xt=new C(pe,be),Xt.constructor=xe,Xt.render=V),he&&he.sub(Xt),Xt.props=pe,Xt.state||(Xt.state={}),Xt.context=be,Xt.__n=ct,se=Xt.__d=!0,Xt.__h=[],Xt._sb=[]),Xt.__s==null&&(Xt.__s=Xt.state),xe.getDerivedStateFromProps!=null&&(Xt.__s==Xt.state&&(Xt.__s=v({},Xt.__s)),v(Xt.__s,xe.getDerivedStateFromProps(pe,Xt.__s))),re=Xt.props,ce=Xt.state,Xt.__v=k,se)xe.getDerivedStateFromProps==null&&Xt.componentWillMount!=null&&Xt.componentWillMount(),Xt.componentDidMount!=null&&Xt.__h.push(Xt.componentDidMount);else{if(xe.getDerivedStateFromProps==null&&pe!==re&&Xt.componentWillReceiveProps!=null&&Xt.componentWillReceiveProps(pe,be),!Xt.__e&&(Xt.shouldComponentUpdate!=null&&Xt.shouldComponentUpdate(pe,Xt.__s,be)===!1||k.__v===st.__v)){for(k.__v!==st.__v&&(Xt.props=pe,Xt.state=Xt.__s,Xt.__d=!1),k.__e=st.__e,k.__k=st.__k,k.__k.forEach((function(Ee){Ee&&(Ee.__=k)})),$e=0;$e<Xt._sb.length;$e++)Xt.__h.push(Xt._sb[$e]);Xt._sb=[],Xt.__h.length&&pt.push(Xt);break t}Xt.componentWillUpdate!=null&&Xt.componentWillUpdate(pe,Xt.__s,be),Xt.componentDidUpdate!=null&&Xt.__h.push((function(){Xt.componentDidUpdate(re,ce,ge)}))}if(Xt.context=be,Xt.props=pe,Xt.__P=$,Xt.__e=!1,ke=n.__r,_e=0,"prototype"in xe&&xe.prototype.render){for(Xt.state=Xt.__s,Xt.__d=!1,ke&&ke(k),ne=Xt.render(Xt.props,Xt.state,Xt.context),Oe=0;Oe<Xt._sb.length;Oe++)Xt.__h.push(Xt._sb[Oe]);Xt._sb=[]}else do Xt.__d=!1,ke&&ke(k),ne=Xt.render(Xt.props,Xt.state,Xt.context),Xt.state=Xt.__s;while(Xt.__d&&++_e<25);Xt.state=Xt.__s,Xt.getChildContext!=null&&(ct=v(v({},ct),Xt.getChildContext())),se||Xt.getSnapshotBeforeUpdate==null||(ge=Xt.getSnapshotBeforeUpdate(re,ce)),H($,d(de=ne!=null&&ne.type===b&&ne.key==null?ne.props.children:ne)?de:[de],k,st,ct,dt,_,pt,ee,vt,te),Xt.base=k.__e,k.__u&=-161,Xt.__h.length&&pt.push(Xt),ye&&(Xt.__E=Xt.__=null)}catch(Ee){k.__v=null,vt||_!=null?(k.__e=ee,k.__u|=vt?160:32,_[_.indexOf(ee)]=null):(k.__e=st.__e,k.__k=st.__k),n.__e(Ee,k,st)}else _==null&&k.__v===st.__v?(k.__k=st.__k,k.__e=st.__e):k.__e=W(st.__e,k,st,ct,dt,_,pt,vt,te);(ne=n.diffed)&&ne(k)}function L($,k,st){k.__d=void 0;for(var ct=0;ct<st.length;ct++)F(st[ct],st[++ct],st[++ct]);n.__c&&n.__c(k,$),$.some((function(dt){try{$=dt.__h,dt.__h=[],$.some((function(_){_.call(dt)}))}catch(_){n.__e(_,dt.__v)}}))}function W($,k,st,ct,dt,_,pt,ee,vt){var te,ne,Xt,se,re,ce,ge,ye=st.props,pe=k.props,he=k.type;if(he==="svg"?dt="http://www.w3.org/2000/svg":he==="math"?dt="http://www.w3.org/1998/Math/MathML":dt||(dt="http://www.w3.org/1999/xhtml"),_!=null){for(te=0;te<_.length;te++)if((re=_[te])&&"setAttribute"in re==!!he&&(he?re.localName===he:re.nodeType===3)){$=re,_[te]=null;break}}if($==null){if(he===null)return document.createTextNode(pe);$=document.createElementNS(dt,he,pe.is&&pe),_=null,ee=!1}if(he===null)ye===pe||ee&&$.data===pe||($.data=pe);else{if(_=_&&t.call($.childNodes),ye=st.props||f,!ee&&_!=null)for(ye={},te=0;te<$.attributes.length;te++)ye[(re=$.attributes[te]).name]=re.value;for(te in ye)if(re=ye[te],te!="children"){if(te=="dangerouslySetInnerHTML")Xt=re;else if(te!=="key"&&!(te in pe)){if(te=="value"&&"defaultValue"in pe||te=="checked"&&"defaultChecked"in pe)continue;R($,te,null,re,dt)}}for(te in pe)re=pe[te],te=="children"?se=re:te=="dangerouslySetInnerHTML"?ne=re:te=="value"?ce=re:te=="checked"?ge=re:te==="key"||ee&&typeof re!="function"||ye[te]===re||R($,te,re,ye[te],dt);if(ne)ee||Xt&&(ne.__html===Xt.__html||ne.__html===$.innerHTML)||($.innerHTML=ne.__html),k.__k=[];else if(Xt&&($.innerHTML=""),H($,d(se)?se:[se],k,st,ct,he==="foreignObject"?"http://www.w3.org/1999/xhtml":dt,_,pt,_?_[0]:st.__k&&x(st,0),ee,vt),_!=null)for(te=_.length;te--;)_[te]!=null&&m(_[te]);ee||(te="value",ce!==void 0&&(ce!==$[te]||he==="progress"&&!ce||he==="option"&&ce!==ye[te])&&R($,te,ce,ye[te],dt),te="checked",ge!==void 0&&ge!==$[te]&&R($,te,ge,ye[te],dt))}return $}function F($,k,st){try{typeof $=="function"?$(k):$.current=k}catch(ct){n.__e(ct,st)}}function I($,k,st){var ct,dt;if(n.unmount&&n.unmount($),(ct=$.ref)&&(ct.current&&ct.current!==$.__e||F(ct,null,k)),(ct=$.__c)!=null){if(ct.componentWillUnmount)try{ct.componentWillUnmount()}catch(_){n.__e(_,k)}ct.base=ct.__P=null}if(ct=$.__k)for(dt=0;dt<ct.length;dt++)ct[dt]&&I(ct[dt],k,st||typeof $.type!="function");st||$.__e==null||m($.__e),$.__c=$.__=$.__e=$.__d=void 0}function V($,k,st){return this.constructor($,st)}function O($,k,st){var ct,dt,_,pt;n.__&&n.__($,k),dt=(ct=!1)?null:k.__k,_=[],pt=[],M(k,$=k.__k=y(b,null,[$]),dt||f,f,k.namespaceURI,dt?null:k.firstChild?t.call(k.childNodes):null,_,dt?dt.__e:k.firstChild,ct,pt),L(_,$,pt)}function j($,k,st){var ct,dt,_,pt,ee=v({},$.props);for(_ in $.type&&$.type.defaultProps&&(pt=$.type.defaultProps),k)_=="key"?ct=k[_]:_=="ref"?dt=k[_]:ee[_]=k[_]===void 0&&pt!==void 0?pt[_]:k[_];return arguments.length>2&&(ee.children=arguments.length>3?t.call(arguments,2):st),g($.type,ee,ct||$.key,dt||$.ref,null)}function q($,k){var st={__c:k="__cC"+s++,__:$,Consumer:function(ct,dt){return ct.children(dt)},Provider:function(ct){var dt,_;return this.getChildContext||(dt=[],(_={})[k]=this,this.getChildContext=function(){return _},this.shouldComponentUpdate=function(pt){this.props.value!==pt.value&&dt.some((function(ee){ee.__e=!0,P(ee)}))},this.sub=function(pt){dt.push(pt);var ee=pt.componentWillUnmount;pt.componentWillUnmount=function(){dt.splice(dt.indexOf(pt),1),ee&&ee.call(pt)}}),ct.children}};return st.Provider.__=st.Consumer.contextType=st}t=p.slice,n={__e:function($,k,st,ct){for(var dt,_,pt;k=k.__;)if((dt=k.__c)&&!dt.__)try{if((_=dt.constructor)&&_.getDerivedStateFromError!=null&&(dt.setState(_.getDerivedStateFromError($)),pt=dt.__d),dt.componentDidCatch!=null&&(dt.componentDidCatch($,ct||{}),pt=dt.__d),pt)return dt.__E=dt}catch(ee){$=ee}throw $}},e=0,C.prototype.setState=function($,k){var st;st=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=v({},this.state),typeof $=="function"&&($=$(v({},st),this.props)),$&&v(st,$),$!=null&&this.__v&&(k&&this._sb.push(k),P(this))},C.prototype.forceUpdate=function($){this.__v&&(this.__e=!0,$&&this.__h.push($),P(this))},C.prototype.render=b,r=[],u=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=function($,k){return $.__v.__b-k.__v.__b},U.__r=0,l=0,c=T(!1),a=T(!0),s=0;var B,K,z,G,J=0,Q=[],X=[],Y=n,Z=Y.__b,tt=Y.__r,nt=Y.diffed,et=Y.__c,_t=Y.unmount,rt=Y.__;function ot($,k){Y.__h&&Y.__h(K,$,J||k),J=0;var st=K.__H||(K.__H={__:[],__h:[]});return $>=st.__.length&&st.__.push({__V:X}),st.__[$]}function ut($){return J=1,it(wt,$)}function it($,k,st){var ct=ot(B++,2);if(ct.t=$,!ct.__c&&(ct.__=[wt(void 0,k),function(ee){var vt=ct.__N?ct.__N[0]:ct.__[0],te=ct.t(vt,ee);vt!==te&&(ct.__N=[te,ct.__[1]],ct.__c.setState({}))}],ct.__c=K,!K.u)){var dt=function(ee,vt,te){if(!ct.__c.__H)return!0;var ne=ct.__c.__H.__.filter((function(se){return!!se.__c}));if(ne.every((function(se){return!se.__N})))return!_||_.call(this,ee,vt,te);var Xt=!1;return ne.forEach((function(se){if(se.__N){var re=se.__[0];se.__=se.__N,se.__N=void 0,re!==se.__[0]&&(Xt=!0)}})),!(!Xt&&ct.__c.props===ee)&&(!_||_.call(this,ee,vt,te))};K.u=!0;var _=K.shouldComponentUpdate,pt=K.componentWillUpdate;K.componentWillUpdate=function(ee,vt,te){if(this.__e){var ne=_;_=void 0,dt(ee,vt,te),_=ne}pt&&pt.call(this,ee,vt,te)},K.shouldComponentUpdate=dt}return ct.__N||ct.__}function lt($,k){var st=ot(B++,3);!Y.__s&&xt(st.__H,k)&&(st.__=$,st.i=k,K.__H.__h.push(st))}function at($){return J=5,ft((function(){return{current:$}}),[])}function ft($,k){var st=ot(B++,7);return xt(st.__H,k)?(st.__V=$(),st.i=k,st.__h=$,st.__V):st.__}function yt(){for(var $;$=Q.shift();)if($.__P&&$.__H)try{$.__H.__h.forEach(bt),$.__H.__h.forEach(Ct),$.__H.__h=[]}catch(k){$.__H.__h=[],Y.__e(k,$.__v)}}Y.__b=function($){K=null,Z&&Z($)},Y.__=function($,k){$&&k.__k&&k.__k.__m&&($.__m=k.__k.__m),rt&&rt($,k)},Y.__r=function($){tt&&tt($),B=0;var k=(K=$.__c).__H;k&&(z===K?(k.__h=[],K.__h=[],k.__.forEach((function(st){st.__N&&(st.__=st.__N),st.__V=X,st.__N=st.i=void 0}))):(k.__h.forEach(bt),k.__h.forEach(Ct),k.__h=[],B=0)),z=K},Y.diffed=function($){nt&&nt($);var k=$.__c;k&&k.__H&&(k.__H.__h.length&&(Q.push(k)!==1&&G===Y.requestAnimationFrame||((G=Y.requestAnimationFrame)||kt)(yt)),k.__H.__.forEach((function(st){st.i&&(st.__H=st.i),st.__V!==X&&(st.__=st.__V),st.i=void 0,st.__V=X}))),z=K=null},Y.__c=function($,k){k.some((function(st){try{st.__h.forEach(bt),st.__h=st.__h.filter((function(ct){return!ct.__||Ct(ct)}))}catch(ct){k.some((function(dt){dt.__h&&(dt.__h=[])})),k=[],Y.__e(ct,st.__v)}})),et&&et($,k)},Y.unmount=function($){_t&&_t($);var k,st=$.__c;st&&st.__H&&(st.__H.__.forEach((function(ct){try{bt(ct)}catch(dt){k=dt}})),st.__H=void 0,k&&Y.__e(k,st.__v))};var gt=typeof requestAnimationFrame=="function";function kt($){var k,st=function(){clearTimeout(ct),gt&&cancelAnimationFrame(k),setTimeout($)},ct=setTimeout(st,100);gt&&(k=requestAnimationFrame(st))}function bt($){var k=K,st=$.__c;typeof st=="function"&&($.__c=void 0,st()),K=k}function Ct($){var k=K;$.__c=$.__(),K=k}function xt($,k){return!$||$.length!==k.length||k.some((function(st,ct){return st!==$[ct]}))}function wt($,k){return typeof k=="function"?k($):k}var Pt=function($,k,st,ct){var dt;k[0]=0;for(var _=1;_<k.length;_++){var pt=k[_++],ee=k[_]?(k[0]|=pt?1:2,st[k[_++]]):k[++_];pt===3?ct[0]=ee:pt===4?ct[1]=Object.assign(ct[1]||{},ee):pt===5?(ct[1]=ct[1]||{})[k[++_]]=ee:pt===6?ct[1][k[++_]]+=ee+"":pt?(dt=$.apply(ee,Pt($,ee,st,["",null])),ct.push(dt),ee[0]?k[0]|=2:(k[_-2]=0,k[_]=dt)):ct.push(ee)}return ct},Ut=new Map;function Ht($){var k=Ut.get(this);return k||(k=new Map,Ut.set(this,k)),(k=Pt(this,k.get($)||(k.set($,k=(function(st){for(var ct,dt,_=1,pt="",ee="",vt=[0],te=function(se){_===1&&(se||(pt=pt.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?vt.push(0,se,pt):_===3&&(se||pt)?(vt.push(3,se,pt),_=2):_===2&&pt==="..."&&se?vt.push(4,se,0):_===2&&pt&&!se?vt.push(5,0,!0,pt):_>=5&&((pt||!se&&_===5)&&(vt.push(_,0,pt,dt),_=6),se&&(vt.push(_,se,0,dt),_=6)),pt=""},ne=0;ne<st.length;ne++){ne&&(_===1&&te(),te(ne));for(var Xt=0;Xt<st[ne].length;Xt++)ct=st[ne][Xt],_===1?ct==="<"?(te(),vt=[vt],_=3):pt+=ct:_===4?pt==="--"&&ct===">"?(_=1,pt=""):pt=ct+pt[0]:ee?ct===ee?ee="":pt+=ct:ct==='"'||ct==="'"?ee=ct:ct===">"?(te(),_=1):_&&(ct==="="?(_=5,dt=pt,pt=""):ct==="/"&&(_<5||st[ne][Xt+1]===">")?(te(),_===3&&(vt=vt[0]),_=vt,(vt=vt[0]).push(2,0,_),_=0):ct===" "||ct==="	"||ct===`
`||ct==="\r"?(te(),_=2):pt+=ct),_===3&&pt==="!--"&&(_=4,vt=vt[0])}return te(),vt})($)),k),arguments,[])).length>1?k:k[0]}var Et=Ht.bind(y),St={};function At($,k){for(var st in k)$[st]=k[st];return $}function Dt($,k,st){var ct,dt=/(?:\?([^#]*))?(#.*)?$/,_=$.match(dt),pt={};if(_&&_[1])for(var ee=_[1].split("&"),vt=0;vt<ee.length;vt++){var te=ee[vt].split("=");pt[decodeURIComponent(te[0])]=decodeURIComponent(te.slice(1).join("="))}$=Tt($.replace(dt,"")),k=Tt(k||"");for(var ne=Math.max($.length,k.length),Xt=0;Xt<ne;Xt++)if(k[Xt]&&k[Xt].charAt(0)===":"){var se=k[Xt].replace(/(^:|[+*?]+$)/g,""),re=(k[Xt].match(/[+*?]+$/)||St)[0]||"",ce=~re.indexOf("+"),ge=~re.indexOf("*"),ye=$[Xt]||"";if(!ye&&!ge&&(re.indexOf("?")<0||ce)){ct=!1;break}if(pt[se]=decodeURIComponent(ye),ce||ge){pt[se]=$.slice(Xt).map(decodeURIComponent).join("/");break}}else if(k[Xt]!==$[Xt]){ct=!1;break}return(st.default===!0||ct!==!1)&&pt}function Nt($,k){return $.rank<k.rank?1:$.rank>k.rank?-1:$.index-k.index}function Rt($,k){return $.index=k,$.rank=(function(st){return st.props.default?0:Tt(st.props.path).map(Mt).join("")})($),$.props}function Tt($){return $.replace(/(^\/+|\/+$)/g,"").split("/")}function Mt($){return $.charAt(0)==":"?1+"*+?".indexOf($.charAt($.length-1))||4:5}var Lt={},Wt=[],Ft=[],It=null,Vt={url:jt()},Ot=q(Vt);function jt(){var $;return""+(($=It&&It.location?It.location:It&&It.getCurrentLocation?It.getCurrentLocation():typeof location<"u"?location:Lt).pathname||"")+($.search||"")}function qt($,k){return k===void 0&&(k=!1),typeof $!="string"&&$.url&&(k=$.replace,$=$.url),(function(st){for(var ct=Wt.length;ct--;)if(Wt[ct].canRoute(st))return!0;return!1})($)&&(function(st,ct){ct===void 0&&(ct="push"),It&&It[ct]?It[ct](st):typeof history<"u"&&history[ct+"State"]&&history[ct+"State"](null,null,st)})($,k?"replace":"push"),Bt($)}function Bt($){for(var k=!1,st=0;st<Wt.length;st++)Wt[st].routeTo($)&&(k=!0);return k}function Kt($){if($&&$.getAttribute){var k=$.getAttribute("href"),st=$.getAttribute("target");if(k&&k.match(/^\//g)&&(!st||st.match(/^_?self$/i)))return qt(k)}}function zt($){return $.stopImmediatePropagation&&$.stopImmediatePropagation(),$.stopPropagation&&$.stopPropagation(),$.preventDefault(),!1}function Gt($){if(!($.ctrlKey||$.metaKey||$.altKey||$.shiftKey||$.button)){var k=$.target;do if(k.localName==="a"&&k.getAttribute("href")){if(k.hasAttribute("data-native")||k.hasAttribute("native"))return;if(Kt(k))return zt($)}while(k=k.parentNode)}}var Jt=!1;function Qt($){$.history&&(It=$.history),this.state={url:$.url||jt()}}At(Qt.prototype=new C,{shouldComponentUpdate:function($){return $.static!==!0||$.url!==this.props.url||$.onChange!==this.props.onChange},canRoute:function($){var k=A(this.props.children);return this.g(k,$)!==void 0},routeTo:function($){this.setState({url:$});var k=this.canRoute($);return this.p||this.forceUpdate(),k},componentWillMount:function(){this.p=!0},componentDidMount:function(){var $=this;Jt||(Jt=!0,It||addEventListener("popstate",(function(){Bt(jt())})),addEventListener("click",Gt)),Wt.push(this),It&&(this.u=It.listen((function(k){var st=k.location||k;$.routeTo(""+(st.pathname||"")+(st.search||""))}))),this.p=!1},componentWillUnmount:function(){typeof this.u=="function"&&this.u(),Wt.splice(Wt.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function($,k){$=$.filter(Rt).sort(Nt);for(var st=0;st<$.length;st++){var ct=$[st],dt=Dt(k,ct.props.path,ct.props);if(dt)return[ct,dt]}},render:function($,k){var st,ct,dt=$.onChange,_=k.url,pt=this.c,ee=this.g(A($.children),_);if(ee&&(ct=j(ee[0],At(At({url:_,matches:st=ee[1]},st),{key:void 0,ref:void 0}))),_!==(pt&&pt.url)){At(Vt,pt=this.c={url:_,previous:pt&&pt.url,current:ct,path:ct?ct.props.path:null,matches:st}),pt.router=this,pt.active=ct?[ct]:[];for(var vt=Ft.length;vt--;)Ft[vt]({});typeof dt=="function"&&dt(pt)}return y(Ot.Provider,{value:pt},ct)}});const switchIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='652.000000pt'%20height='956.000000pt'%20viewBox='0%200%20652.000000%20956.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,956.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M1150%209540%20c-386%20-6%20-408%20-8%20-475%20-29%20-147%20-48%20-255%20-115%20-368%20-226%20-93%20-91%20-145%20-159%20-191%20-250%20-74%20-146%20-77%20-163%20-87%20-455%20-10%20-318%20-14%20-7639%20-4%20-7725%2025%20-214%20107%20-394%20245%20-539%20115%20-121%20227%20-192%20408%20-260%20l72%20-28%202418%20-1%20c2586%20-2%202582%20-2%202716%2047%20254%2092%20492%20346%20573%20611%2017%2058%2018%20211%2018%204095%20l0%204035%20-23%2075%20c-61%20193%20-204%20388%20-368%20501%20-76%2052%20-226%20118%20-294%20129%20-36%206%20-229%2015%20-430%2020%20-398%2010%20-3557%2010%20-4210%200z%20m4610%20-328%20c164%20-59%20291%20-175%20374%20-339%20l36%20-73%200%20-4016%200%20-4016%20-45%20-88%20c-25%20-48%20-70%20-115%20-101%20-148%20-64%20-71%20-175%20-148%20-242%20-168%20-103%20-32%20-400%20-35%20-2687%20-32%20-2180%203%20-2282%204%20-2335%2022%20-204%2068%20-363%20240%20-417%20452%20-17%2065%20-18%20275%20-18%203979%200%203785%201%203912%2019%203980%2024%2091%2084%20207%20140%20271%2055%2062%20182%20152%20244%20171%2027%208%20121%2018%20222%2022%2096%205%201203%208%202460%207%20l2285%20-1%2065%20-23z'/%3e%3cpath%20d='M1434%208128%20l-45%20-41%203%20-3291%20c3%20-3127%204%20-3293%2021%20-3323%209%20-18%2029%20-41%2044%20-50%2026%20-17%20125%20-18%201799%20-18%201918%200%201808%20-3%201834%2054%207%2014%2016%2067%2021%20116%205%2050%209%20789%209%201644%20l0%201554%20249%20981%20c358%201405%20401%201581%20401%201626%200%2051%204%2046%20-414%20468%20l-321%20322%20-1778%200%20-1777%200%20-46%20-42z%20m3636%20-425%20l165%20-168%20-185%20-6%20c-102%20-4%20-770%20-7%20-1485%20-8%20l-1300%20-1%20-145%20148%20c-80%2081%20-156%20159%20-170%20175%20l-23%2027%201489%200%201490%200%20164%20-167z%20m-3078%20-356%20l31%20-38%20-147%20-583%20c-81%20-320%20-153%20-602%20-160%20-626%20-12%20-39%20-13%20-23%20-19%20185%20-9%20291%20-9%20823%200%201123%20l6%20233%20129%20-128%20c71%20-70%20143%20-145%20160%20-166z%20m2900%20-136%20c278%20-3%20510%20-9%20513%20-13%2010%20-10%203%20-40%20-305%20-1260%20l-280%20-1107%200%20-1565%200%20-1566%20-1565%200%20-1565%200%200%201521%200%201520%20310%201226%20c171%20675%20313%201229%20316%201232%2014%2014%201788%2022%202576%2012z'/%3e%3cpath%20d='M3765%206820%20c-61%20-25%20-87%20-94%20-185%20-473%20-80%20-315%20-120%20-493%20-120%20-540%200%20-77%2078%20-141%20163%20-134%2069%206%20101%2040%20131%20141%2057%20190%20197%20746%20212%20843%205%2032%201%2053%20-19%2096%20-22%2048%20-30%2057%20-64%2066%20-44%2013%20-90%2013%20-118%201z'/%3e%3cpath%20d='M3098%203406%20c-104%20-37%20-216%20-134%20-264%20-227%20-24%20-47%20-28%20-71%20-35%20-184%20-19%20-311%20-7%20-500%2037%20-586%2040%20-80%20113%20-151%20201%20-195%20l76%20-39%20151%200%20151%200%2068%2034%20c81%2041%20167%20128%20215%20218%20l32%2061%200%20302%200%20302%20-41%2078%20c-65%20127%20-156%20201%20-284%20235%20-73%2019%20-255%2019%20-307%201z%20m262%20-311%20c58%20-30%2064%20-57%2068%20-301%204%20-219%204%20-222%20-19%20-253%20-65%20-88%20-230%20-95%20-286%20-13%20-16%2024%20-18%2055%20-21%20273%20l-3%20246%2038%2030%20c21%2017%2045%2033%2053%2036%2025%2011%20137%20-1%20170%20-18z'/%3e%3c/g%3e%3c/svg%3e",buttonIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M790%201280%20l0%20-420%2065%200%2065%200%200%20420%200%20420%20-65%200%20-65%200%200%20-420z'/%3e%3cpath%20d='M489%201612%20c-228%20-114%20-386%20-309%20-451%20-557%20-29%20-110%20-29%20-297%200%20-406%2081%20-301%20308%20-530%20607%20-610%20112%20-30%20307%20-30%20420%200%20294%2077%20529%20312%20606%20606%2029%20110%2030%20307%201%20416%20-67%20251%20-245%20462%20-477%20565%20l-55%2024%200%20-74%200%20-74%2072%20-42%20c280%20-167%20411%20-508%20313%20-817%20-35%20-110%20-88%20-196%20-175%20-283%20-87%20-87%20-172%20-139%20-285%20-177%20-70%20-23%20-96%20-27%20-210%20-27%20-114%200%20-140%204%20-210%2027%20-293%2097%20-495%20372%20-495%20673%200%2070%2025%20193%2055%20266%2054%20133%20182%20279%20299%20339%20l66%2034%200%2078%20c0%2042%20-1%2077%20-2%2077%20-2%200%20-37%20-18%20-79%20-38z'/%3e%3c/g%3e%3c/svg%3e",timerIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M818%201670%20c-24%20-15%20-31%20-77%20-23%20-221%208%20-141%2015%20-159%2064%20-159%2050%200%2060%2024%2063%20150%20l3%20115%2030%20-3%20c172%20-19%20366%20-132%20472%20-275%2094%20-129%20133%20-236%20140%20-392%206%20-142%20-12%20-230%20-73%20-355%20-82%20-165%20-236%20-296%20-419%20-357%20-71%20-24%20-95%20-27%20-215%20-27%20-118%200%20-145%203%20-212%2026%20-123%2041%20-204%2092%20-298%20187%20-68%2068%20-94%20103%20-127%20171%20-61%20125%20-76%20203%20-71%20352%206%20153%2036%20243%20122%20371%2064%2095%2068%20127%2021%20149%20-39%2017%20-68%202%20-113%20-59%20-94%20-127%20-150%20-285%20-159%20-449%20-23%20-399%20236%20-749%20632%20-855%20111%20-30%20297%20-30%20410%200%20449%20119%20716%20562%20610%201011%20-23%2095%20-105%20254%20-173%20336%20-111%20131%20-276%20234%20-442%20274%20-89%2021%20-213%2026%20-242%2010z'/%3e%3cpath%20d='M452%201258%20c-7%20-7%20-12%20-17%20-12%20-23%200%20-21%20330%20-469%20358%20-487%2043%20-28%20106%20-23%20143%2010%2043%2038%2052%20113%2020%20154%20-20%2025%20-454%20342%20-484%20354%20-7%202%20-18%20-1%20-25%20-8z'/%3e%3c/g%3e%3c/svg%3e",owIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='110.000000pt'%20height='52.000000pt'%20viewBox='0%200%20110.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M171%20500%20c-50%20-12%20-83%20-41%20-111%20-96%20-22%20-43%20-25%20-62%20-24%20-149%200%20-141%2027%20-199%20109%20-236%2073%20-33%20180%20-16%20227%2037%2067%2076%2074%20284%2013%20376%20-39%2059%20-133%2089%20-214%2068z%20m119%20-65%20c50%20-26%2065%20-67%2065%20-180%200%20-146%20-32%20-195%20-128%20-195%20-40%200%20-54%205%20-77%2028%20-16%2016%20-34%2049%20-40%2073%20-16%2056%20-7%20186%2014%20227%2030%2057%20105%2078%20166%2047z'/%3e%3cpath%20d='M482%20483%20c3%20-10%2029%20-120%2058%20-245%20l54%20-228%2038%200%20c43%200%2035%20-20%2089%20215%2017%2077%2035%20146%2038%20152%204%207%2026%20-73%2051%20-178%20l44%20-190%2039%203%2040%203%2058%20240%20c32%20132%2058%20241%2059%20243%200%202%20-15%202%20-32%200%20l-32%20-3%20-43%20-180%20c-23%20-99%20-44%20-187%20-46%20-195%20-2%20-8%20-25%2074%20-51%20183%20l-48%20198%20-36%20-3%20-36%20-3%20-45%20-194%20c-25%20-106%20-47%20-188%20-49%20-181%20-3%207%20-23%2095%20-46%20194%20l-42%20181%20-33%203%20c-28%203%20-33%201%20-29%20-15z'/%3e%3c/g%3e%3c/svg%3e",encoderIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='34.000000pt'%20height='52.000000pt'%20viewBox='0%200%2034.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M30%20255%20l0%20-245%20150%200%20150%200%200%2030%200%2030%20-115%200%20-115%200%200%2085%200%2085%2095%200%2095%200%200%2030%200%2030%20-95%200%20-95%200%200%2070%200%2070%20115%200%20115%200%200%2030%200%2030%20-150%200%20-150%200%200%20-245z'/%3e%3c/g%3e%3c/svg%3e",Icons={switchIcon:$=>Et`
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
    </svg>`},tipColors={green:"bg-green-100 text-green-900 ring-green-300",yellow:"bg-yellow-100 text-yellow-900 ring-yellow-300"};function Button({title:$,onclick:k,disabled:st,cls:ct,icon:dt,ref:_,colors:pt,hovercolor:ee,disabledcolor:vt}){const[te,ne]=ut(!1),Xt=function(se){const re=k?k():null;re&&typeof re.catch=="function"&&(ne(!0),re.catch(()=>!1).then(()=>ne(!1)))};return pt||(pt="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400"),Et` <button
    type="button"
    class="inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${pt} ${ct}"
    ref=${_}
    onclick=${Xt}
    disabled=${st||te}
  >
    ${$}
    <${te?Icons.refresh:dt} class="w-4 ${te?"animate-spin":""}" />
  <//>`}function Login({loginFn:$,logoIcon:k,title:st,tipText:ct}){const[dt,_]=ut(""),[pt,ee]=ut(""),vt=function(te){const Xt={Authorization:"Basic "+btoa(dt+":"+pt)};return fetch("api/login",{headers:Xt}).then($).finally(se=>ee(""))};return Et` <div
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
          oninput=${te=>_(te.target.value)}
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
          oninput=${te=>ee(te.target.value)}
          value=${pt}
          onchange=${vt}
        />
      <//>
      <div class="mt-7">
        <${Button}
          title="Sign In"
          icon=${Icons.logout}
          onclick=${vt}
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
  <//>`}const ruLangswitch=["","ID - уникальный числовой идентификатор выключателя. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","Device connection - Здесь указаны пины одного или нескольких устройств, с которыми взаимодействует данный выключатель.",'INFO - Укажите название данного выключателя для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение обработчика состояния на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек и соединений выключателя."],ruLangselect=["","ID - уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type(s) of pin(s) - Выберите режим работы данного пина из предложенных вариантов."],rulangbutton=["","ID - уникальный числовой идентификатор кнопки. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","sclick - Выполняемая команда при одинарном клике кнопки.","dclick - Выполняемая команда при двойном клике кнопки.","lpress - Выполняемая команда при удержании кнопки.",'INFO - Укажите название данной кнопки для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение функции кнопки на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек кнопки."],ruencoder=["","ID - уникальный числовой идентификатор энкодера. Присваивается автоматически.","Pin - Уникальный номер пина.","Encoder A (ID) - Основной пин энкодера A (DT).","Encoder B (ID) - Дополнительный пин энкодера B (CLK).","PWM connection - Подключение ШИМ для управления яркостью (диммер).","Dimmer value (0-100) - Текущее значение диммера от 0 до 100.","Duty on restore - Восстановление значения скважности (яркости) при включении контроллера.","INFO - Укажите название данного энкодера для быстрой навигации.","On/Off - Включение или отключение обработчика энкодера.","Action - Кнопка Edit позволяет зайти в меню настроек энкодера.","PWM Frequency - Частота ШИМ управляемого устройства (в герцах).","Resolution (steps) - Максимальное количество шагов от 0 до 100% для ШИМ устройства."],rulangtimers=["","No - Уникальный числовой идентификатор задачи (cron). Присваивается автоматически.","Cron - Сконфигурируйте расписание (cron) для выполнения задачи.","Script - Какое действие (скрипт) должно выполниться в указанное в таймере время.",'Info - Дайте название выбранному таймеру для быстрой навигации, например "Полив газона". Не более 30-ти символов!',"On/Off - Вкл/Откл выполнение данной задачи.","Action - Кнопка Edit позволяет зайти в меню настроек задачи."],rulangsettings=["","Login - Введите имя пользователя для входа в систему. Используется при авторизации в веб-интерфейсе.","Password - Введите пароль для входа в систему. Рекомендуется использовать надёжный пароль.","Time zone UTC - Выберите свой часовой пояс. Влияет на отображение времени и расчёт восхода/заката.","IP address - Введите статический IP-адрес устройства. После перезагрузки STM32 будет доступен по этому адресу. Формат: 192.168.1.100","Subnet mask - Введите маску подсети. Определяет диапазон адресов вашей локальной сети. Формат: 255.255.255.0","Default gateway - Введите IP-адрес шлюза по умолчанию (обычно адрес вашего роутера). Формат: 192.168.1.1","Token - Секретный ключ для авторизации API-запросов. Используется в URL командах управления устройством. Пример: /api/Token/switch?id=1&onoff=1","Host - Введите IP-адрес или доменное имя MQTT-брокера. Пример: 192.168.1.50 или broker.hivemq.com","Port - Укажите порт MQTT-брокера. Стандартный порт: 1883 (без шифрования), 8883 (с TLS).","Client - Уникальный идентификатор клиента MQTT. Каждое устройство должно иметь свой уникальный Client ID.","User - Имя пользователя для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","Password - Пароль для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","TX topic - Исходящий топик MQTT. На этот топик устройство публикует свои данные и события. Пример: Swarm","RX topic - Входящий топик MQTT. С этого топика устройство получает команды управления. Пример: Swarm","HTTPS domain - Доменное имя для HTTPS-соединения. Необходим действующий SSL-сертификат для этого домена. Пример: zagotovka.ddns.net",'Private Key - Закрытый ключ SSL-сертификата в формате PEM. Начинается с "-----BEGIN EC PRIVATE KEY-----". Хранится в зашифрованном виде.','Public Key - Публичный сертификат SSL в формате PEM. Начинается с "-----BEGIN CERTIFICATE-----". Используется для HTTPS-соединения.',"Longitude - Долгота вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 37.618 (Москва)","Latitude - Широта вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 55.751 (Москва)","Sunrise - Время восхода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на восходе.","Sunset - Время захода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на закате.","Day Length - Продолжительность светового дня, рассчитывается автоматически на основе координат и текущей даты.","Next full moon - Дата и время следующего полнолуния, рассчитывается автоматически.","Date - Дата для автономного (offline) режима в формате дд.мм.гг. Используется когда нет доступа к NTP-серверу. Пример: 15.03.25","Time - Время для автономного (offline) режима в формате чч:мм:сс. Используется когда нет доступа к NTP-серверу. Пример: 14:30:00"],ruLangsecurity=["","RXD Pin - Пин приема данных (RX).","TXD Pin - Пин передачи данных (TX).","Phone Number - Номер телефона для отправки SMS и звонков.","Info - Дополнительная информация для быстрой навигации.","OnOff - Включение или отключение модуля SIM800L.","Action - Кнопка Edit позволяет зайти в меню настроек."],ruLangsecuritypins=["","ID - уникальный числовой идентификатор пина. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type of sensor - Тип подключенного сенсора (PIR, Normal open, Normal close).","Action - Действие, выполняемое при срабатывании сенсора.","Send SMS - Отправлять ли SMS при срабатывании сенсора (YES/NO).","INFO - Дополнительная информация для быстрой навигации.","On/Off - Включение или отключение охранного пина.","Edit Pin - Редактирование настроек охранного пина."],rulange1Wire=["","ID - Уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового пина, к которому подключена шина 1-Wire.","Selected sensor - Адрес выбранного и привязанного к этому пину уникального 1-Wire датчика (например, DS18B20).","Count of sensors - Количество найденных 1-Wire температурных датчиков на данном пине.","On/Off - Функция включения или отключения опроса подключенных датчиков на данной шине.","Actions - Кнопка Edit для привязки конкретного датчика к этому соединению."],enLangswitch=["","ID - A unique numerical identifier of the switch. Assigned automatically","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","Device connection - Here will appear one or more devices/relays of pin(s) with which this switch interacts.",'INFO - Give a name of this switch for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the switch state handler on this pin.","Action - The Edit button allows you to access the switch settings menu."],enLangselect=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type(s) of pin(s) - Select the operating mode of this pin from the provided options."],enlangbutton=["","ID - A unique numerical identifier of the button. Assigned automatically.","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","sclick - Command to execute when the button is pressed once.","dclick - Command to execute when the button is pressed twice.","lpress - Command to execute when the button is long pressed.",'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the button function on this pin.","Action - The Edit button allows you to access the button settings menu."],enencoder=["","ID - A unique numerical identifier of the encoder. Assigned automatically.","PIN - The unique number of the pin.","Encoder A (ID) - Main pin of encoder A (DT).","Encoder B (ID) - Additional pin of encoder B (CLK).","PWM connection - PWM connection for brightness control (dimmer).","Dimmer value (0-100) - Current dimmer value from 0 to 100.","Duty on restore - Value of duty cycle (brightness) to restore when the controller is turned on.","INFO - Give a name to this encoder for quick navigation.","On/Off - Enable or disable the encoder handler.","Action - The Edit button allows you to access the encoder settings menu.","PWM Frequency - PWM frequency of the controlled device (in Hertz).","Resolution (steps) - Maximum number of steps from 0 to 100% for the PWM device."],enlangtimers=["","No - A unique numerical identifier of the task (cron). Assigned automatically.","Cron - Configure a schedule (cron) to perform the action.","Script - What action (script) must be performed at the time specified in the timer.",'Info - Give a name to the selected timer for quick navigation, e.g."Lawn Watering", "Backyard Light", etc. No more than 30 characters!',"On/Off - Enable or disable the execution of this task.","Action - The Edit button allows you to access the task settings menu."],enlangsettings=["","Login - Enter the username for logging into the system. Used for web interface authentication.","Password - Enter your password for the system. It is recommended to use a strong password.","Time zone UTC - Select your time zone. Affects time display and sunrise/sunset calculations.","IP address - Enter a static IP address for the device. After reboot, STM32 will be available at this address. Format: 192.168.1.100","Subnet mask - Enter the subnet mask. Defines the range of addresses in your local network. Format: 255.255.255.0","Default gateway - Enter the default gateway IP address (usually your router address). Format: 192.168.1.1","Token - Secret key for API request authorization. Used in device control URL commands. Example: /api/Token/switch?id=1&onoff=1","Host - Enter the IP address or domain name of the MQTT broker. Example: 192.168.1.50 or broker.hivemq.com","Port - Specify the MQTT broker port. Standard port: 1883 (no encryption), 8883 (with TLS).","Client - Unique MQTT client identifier. Each device must have its own unique Client ID.","User - Username for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","Password - Password for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","TX topic - Outgoing MQTT topic. The device publishes its data and events to this topic. Example: Swarm","RX topic - Incoming MQTT topic. The device receives control commands from this topic. Example: Swarm","HTTPS domain - Domain name for HTTPS connection. A valid SSL certificate for this domain is required. Example: zagotovka.ddns.net",'Private Key - SSL certificate private key in PEM format. Starts with "-----BEGIN EC PRIVATE KEY-----". Stored in encrypted form.','Public Key - SSL public certificate in PEM format. Starts with "-----BEGIN CERTIFICATE-----". Used for HTTPS connection.',"Longitude - Longitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 37.618 (Moscow)","Latitude - Latitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 55.751 (Moscow)","Sunrise - Sunrise time is calculated automatically based on your coordinates. The slider enables/disables the action at sunrise.","Sunset - Sunset time is calculated automatically based on your coordinates. The slider enables/disables the action at sunset.","Day Length - Duration of daylight, calculated automatically based on coordinates and current date.","Next full moon - Date and time of the next full moon, calculated automatically.","Date - Date for offline mode in dd.mm.yy format. Used when there is no access to the NTP server. Example: 15.03.25","Time - Time for offline mode in hh:mm:ss format. Used when there is no access to the NTP server. Example: 14:30:00"],enLangsecurity=["","RXD Pin - Receive Data Pin (RX).","TXD Pin - Transmit Data Pin (TX).","Phone Number - Phone number for SMS notifications and calls.","Info - Additional information for quick navigation.","OnOff - Enable or disable the SIM800L module.","Action - The Edit button allows you to access the settings menu."],enLangsecuritypins=["","ID - A unique numerical identifier of the pin. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type of sensor - Type of connected sensor (PIR, Normal open, Normal close).","Action - Action to perform when the sensor is triggered.","Send SMS - Whether to send SMS when the sensor is triggered (YES/NO).","INFO - Additional information for quick navigation.","On/Off - Enable or disable the security pin.","Edit Pin - The Edit button allows you to access the security pin settings."],enlange1Wire=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital pin to which the 1-Wire bus is connected.","Selected sensor - Address of the selected and bound unique 1-Wire sensor to this pin (e.g., DS18B20).","Count of sensors - Number of found 1-Wire temperature sensors on this pin.","On/Off - The function of enabling or disabling polling of connected sensors on this bus.","Actions - The Edit button to bind a specific sensor to this connection."];function initGlobalTooltip$8(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,pt=$.offsetHeight,ee=window.innerWidth,vt=dt.getBoundingClientRect();let te=vt.left+vt.width/2-_/2;te=Math.max(8,Math.min(te,ee-_-8));let ne=vt.top-pt-8;ne<8&&(ne=vt.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabSelect({}){const[$,k]=ut(null),[st,ct]=ut({}),[dt,_]=ut(null),[pt,ee]=ut(!1),[vt,te]=ut(3),[ne,Xt]=ut(!1),[se,re]=ut("ru");lt(()=>{initGlobalTooltip$8()},[]);const ce=de=>{Xt(de)},ge=de=>ne&&(de===1||de===35),ye=()=>fetch("api/select/get").then(de=>de.json()).then(de=>{const xe=de.data||de;k(xe),Xt(de.sim800l===1),de.lang&&re(de.lang);const Ee={};xe.forEach(we=>{Ee[`topin_${we.id}`]=we.topin.toString()}),ct(Ee)});lt(ye,[]),lt(()=>{let de;return pt&&vt>0?de=setTimeout(()=>{te(vt-1)},1e3):vt===0&&(ee(!1),_(null)),()=>clearTimeout(de)},[pt,vt]);const pe=async de=>{de.preventDefault();const xe=new FormData(de.target),Ee={lang:se,sim800l:ne?1:0,data:[]};$.forEach(we=>{const Te=xe.get(`topin_${we.id}`);Ee.data.push({id:we.id,pins:we.pins,topin:parseInt(Te),pwm:we.pwm,i2cdata:we.i2cdata,i2cclok:we.i2cclok})}),_("submitting"),ee(!0),te(3);try{const we=await fetch("api/select/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Ee)});if(!we.ok)throw new Error("Network response was not ok");const Te=await we.json();_("success"),console.log("Success:",Te);const me={};Ee.data.forEach(Ce=>{me[`topin_${Ce.id}`]=Ce.topin.toString()}),ct(Ce=>({...Ce,...me})),ye()}catch(we){_("error"),console.error("Error:",we)}},he=de=>{const{name:xe,value:Ee}=de.target;ct(we=>({...we,[xe]:Ee}))};if(!$)return"";const be=()=>({langselect:se==="ru"?ruLangselect:enLangselect}),$e=(de,xe)=>{const Ee=be(),Te=(Ee[de]&&Ee[de][xe]?Ee[de][xe]:"").split(" "),me=[];for(let Ce=0;Ce<Te.length;Ce+=15)me.push(Te.slice(Ce,Ce+15).join(" "));return me.join("<br>")},ke=de=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      style=${de.center?"text-align: center":""}
      data-tip=${$e("langselect",de.tooltipIndex)}
    >
      ${de.title}
    </th>
  `,_e=({id:de,value:xe,label:Ee,disabled:we=!1,onChange:Te,checked:me})=>Et`
    <div class="relative">
      <input
        id="${de}_${xe}"
        class="sr-only peer"
        type="radio"
        name="topin_${de}"
        value="${xe}"
        checked=${me}
        onChange=${Te}
        disabled=${we}
        aria-label="${Ee}"
      />
      <label
        for="${de}_${xe}"
        class="cursor-pointer px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300 
               ${we?"text-gray-400 cursor-not-allowed opacity-60":"text-slate-700 hover:bg-black/5"}
               peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-cyan-500 peer-checked:text-white peer-checked:shadow-sm"
      >
        ${Ee}
      </label>
    </div>
  `,Oe=({d:de})=>Et`
    <tr class="${ge(de.id)?"bg-red-200/50 opacity-50 pointer-events-none":de.id%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-2 text-sm text-slate-800">${de.id}</td>
      <td class="px-6 py-2 text-sm text-slate-800 font-medium">${de.pins}</td>
      <td class="px-2 py-2">
        <div class="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
          <${_e} id=${de.id} value="0"  label="NONE"     checked=${st[`topin_${de.id}`]==="0"}  onChange=${he} />
          <${_e} id=${de.id} value="3"  label="SWITCH"   checked=${st[`topin_${de.id}`]==="3"}  onChange=${he} />
          <${_e} id=${de.id} value="1"  label="BUTTON"   checked=${st[`topin_${de.id}`]==="1"}  onChange=${he} />
          <${_e} id=${de.id} value="2"  label="DEVICE"   checked=${st[`topin_${de.id}`]==="2"}  onChange=${he} />
          <${_e} id=${de.id} value="4"  label="1-WIRE"   checked=${st[`topin_${de.id}`]==="4"}  onChange=${he} />
          <${_e} id=${de.id} value="5"  label="PWM"      disabled=${de.pwm==0} checked=${st[`topin_${de.id}`]==="5"}  onChange=${he} />
          <${_e} id=${de.id} value="8"  label="Enc.OutA" checked=${st[`topin_${de.id}`]==="8"}  onChange=${he} />
          <${_e} id=${de.id} value="9"  label="Enc.OutB" checked=${st[`topin_${de.id}`]==="9"}  onChange=${he} />
          <${_e} id=${de.id} value="10" label="Security" disabled=${de.monitoring==0} checked=${st[`topin_${de.id}`]==="10"} onChange=${he} />
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

        <form onSubmit=${pe}>
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <button
              type="submit"
              class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${pt?"bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none":"bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"}`}
              disabled=${pt}
            >
              ${pt?`Please wait ${vt} sec.`:"Submit"}
            </button>

            <div class="flex items-center gap-3">
              <span class="text-slate-600 font-bold uppercase tracking-widest text-2xl drop-shadow-sm">SIM800L</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  checked=${ne}
                  onChange=${de=>ce(de.target.checked)}
                />
                <div class="w-[42px] h-[22px] bg-slate-200/80 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300/50 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-400 peer-checked:to-cyan-500 shadow-inner"></div>
              </label>
            </div>
          </div>

          ${dt==="success"&&Et`
            <div class="mb-6 bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
              <strong class="font-bold">Успех! </strong>
              <span class="block sm:inline">Данные успешно сохранены. Идет запись на USB флешку. Кнопка станет активной через ${vt} секунд.</span>
            </div>
          `}
          ${dt==="error"&&Et`
            <div class="mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
              <strong class="font-bold">Ошибка!</strong>
              <span class="block sm:inline">Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз через ${vt} секунд.</span>
            </div>
          `}

          <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner overflow-auto">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <${ke} title="ID" tooltipIndex=${1} />
                    <${ke} title="Pin" tooltipIndex=${2} />
                    <${ke} title="Type(s) of pin(s)" tooltipIndex=${3} center=${!0} />
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
              ${pt?`Please wait ${vt} sec.`:"Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `}function ModalSwitch({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedSwitch:_,onSwitchChange:pt,connectionOptions:ee,SliderComponent:vt=MyPolzunok}){const[te,ne]=ut((_==null?void 0:_.info)||""),[Xt,se]=ut((_==null?void 0:_.onoff)||0),[re,ce]=ut((_==null?void 0:_.ptype)||0),[ge,ye]=ut((_==null?void 0:_.setrpins)||""),[pe,he]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(me=>{if(!me.ok)throw new Error(`HTTP error! status: ${me.status}`);return me.json()}).then(me=>{if(!me||!me.data||!Array.isArray(me.data)){console.error("Invalid data format:",me),he([]);return}const Ce=me.data.filter(Se=>Se.topin===2);he(Ce)}).catch(me=>{console.error("Error fetching pin config:",me),he([])})},[]);const be=me=>{me.preventDefault();const Ce=new FormData(me.target),Se=Object.fromEntries(Ce);if(Se.id=_.id,Se.pins=_.pins,$==="edit")Se.onoff=Xt;else if($==="connection"){const $t=pe.find(ht=>ht.pins===Se.setrpins);$t&&(Se.pinact={..._.pinact,[$t.id]:$t.pins})}fetch("/api/switch/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Se)}).then($t=>$t.json()).then($t=>{console.log("Success:",$t),pt({..._,...Se}),st(),window.location.href="/#/switch"}).catch($t=>{console.error("Error:",$t)})},$e=me=>{ye(me.target.value)},ke=me=>{ce(parseInt(me.target.value))},_e=me=>{ne(me.target.value)},Oe=me=>{se(me)},de=me=>{ct&&me.target===me.currentTarget&&st()},xe=()=>{ce(0),ne(""),se(0)},we=Et`
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
                        value=${pe.some(me=>me.pins===ge)?ge:""}
                        onchange=${$e}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select a connection</option>
                        ${pe.map(me=>Et`
                            <option value=${me.pins}>
                              ${me.pins} (ID: ${me.id})
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
                        value=${re}
                        onchange=${ke}
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
                        oninput=${_e}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${vt}
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
  `,Te=at(null);return lt(()=>{const me=document.createElement("div");return me.id="modal-portal",document.body.appendChild(me),Te.current=me,()=>{O(null,me),document.body.removeChild(me)}},[]),lt(()=>{Te.current&&O(we,Te.current)}),null}function initGlobalTooltip$7(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block";const _=dt.getBoundingClientRect();$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const pt=$.offsetWidth,ee=$.offsetHeight,vt=window.innerWidth;let te=_.left+_.width/2-pt/2;te=Math.max(8,Math.min(te,vt-pt-8));let ne=_.top-ee-8;ne<8&&(ne=_.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabSwitch({}){const[$,k]=ut(null),[st,ct]=ut(null),[dt,_]=ut(!1),[pt,ee]=ut(null),[vt,te]=ut(null),[ne,Xt]=ut(!1),[se,re]=ut("ru"),[ce,ge]=ut(null),[ye,pe]=ut([]),[he,be]=ut(""),[$e,ke]=ut(!1);lt(()=>{initGlobalTooltip$7()},[]);const _e=()=>Promise.all([fetch("/api/switch/get").then(oe=>oe.json()),fetch("/api/pintopin/get").then(oe=>oe.json())]).then(([oe,Zt])=>{re(oe.lang),ge(oe.switches),k(oe),pe(Zt),be(`Pintopin data: ${JSON.stringify(Zt,null,2)}

Switch data: ${JSON.stringify(oe.switches,null,2)}`),console.log("Pintopin data:",Zt),console.log("Switch data:",oe.switches)}).catch(oe=>{console.error("Error fetching data:",oe),be(`Error fetching data: ${oe.message}`)}),Oe=()=>{fetch("/api/switch/get").then(oe=>oe.json()).then(oe=>{ge(oe.switches),re(oe.lang),console.log("Updated switch data:",oe.switches)}).catch(oe=>{console.error("Error fetching switch data:",oe)})},de=()=>{fetch("/api/pintopin/get").then(oe=>oe.json()).then(oe=>{pe(oe),console.log("Updated pintopin data:",oe)}).catch(oe=>{console.error("Error fetching pintopin data:",oe)})};lt(()=>{Oe(),de();const oe=setInterval(()=>{Oe(),de()},1e3);return()=>clearInterval(oe)},[]);const xe=oe=>{const Zt=new Map,ie=ce.find(ae=>ae.id===oe);return ie&&ie.pinact&&Object.entries(ie.pinact).forEach(([ae,fe])=>{Zt.set(ae,{pin:ae,relayId:fe})}),ye.forEach(ae=>{if(ae.idin===oe){const fe=`${ae.pins}(${ae.idout})`;Zt.has(fe)||Zt.set(fe,{pin:ae.pins,relayId:ae.idout})}}),Array.from(Zt.values())},Ee=()=>({langswitch:se==="ru"?ruLangswitch:enLangswitch}),we=(oe,Zt)=>{const ie=Ee(),fe=(ie[oe]&&ie[oe][Zt]||"").split(" "),ve=[];let mt="";for(let le=0;le<fe.length;le++){const ue=fe[le];mt.length+ue.length+1<=200?mt+=(mt.length>0?" ":"")+ue:(mt.length>0&&ve.push(mt),mt=ue)}return mt.length>0&&ve.push(mt),ve.join("<br>")},Te=(oe,Zt)=>{console.log("Удаление соединения:",oe,Zt);const[ie,ae]=Zt.split("("),fe=ae?parseInt(ae):null;fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:oe,pin:ie.trim()})}).then(ve=>ve.json()).then(ve=>{ct(ve),ge(mt=>mt.map(le=>{if(le.id===oe){const ue={...le.pinact};return delete ue[ie.trim()],{...le,pinact:ue}}return le})),pe(mt=>mt.filter(le=>!(le.idin===oe&&le.pins===ie.trim()&&(fe===null||le.idout===fe))))}).then(()=>{console.log("Соединение удалено успешно"),_e()}).catch(ve=>{console.error("Ошибка при удалении соединения:",ve)})},me=(oe,Zt)=>{ee(oe),te(Zt),_(!0)},Ce=()=>{_(!1),ee(null),te(null)},Se=oe=>{console.log("handleSwitchChange:",oe),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:oe.id,onoff:oe.onoff})}).then(Zt=>Zt.json()).then(Zt=>{console.log("Response from /api/onoff/set:",Zt)}).catch(Zt=>{console.error("Error calling /api/onoff/set:",Zt)}),Ce()},$t={ru:Et`
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
    `},ht=oe=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${we("langswitch",oe.tooltipIndex)}
    >
      ${oe.title}
    </th>
  `,Yt=({d:oe,index:Zt})=>{const ie=xe(oe.id);return Et`
      <tr class="${Zt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${oe.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${oe.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][oe.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono">
          ${ie.map(({pin:ae,relayId:fe})=>Et`
              <span class="mr-2 inline-flex items-center">
                ${ae}${fe!==void 0?`(${fe})`:""}
                <button
                  onClick=${ve=>{ve.preventDefault(),Te(oe.id,`${ae}(${fe})`)}}
                  class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                  title="Remove connection"
                >
                  [x]
                </button>
              </span>
            `)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${oe.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${oe.onoff}
            onChange=${ae=>Se({...oe,onoff:ae})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>me("connection",oe)}
            class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
          >
            Connection
          </button>
          <span class="text-slate-300">|</span>
          <button
            onClick=${()=>me("edit",oe)}
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
                    ${ce.map((oe,Zt)=>Et`<${Yt} d=${oe} index=${Zt} key=${oe.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>Xt(!ne)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${ne?"Hide Help":"Show Help"}
              </button>
            </div>

            ${ne&&Et`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${$t[se]}
                </div>
              `}
          </div>
        </div>

        ${dt&&Et`
            <${ModalSwitch}
              modalType=${pt}
              page="TabSwitch"
              hideModal=${Ce}
              title=${pt==="connection"?"Edit Connection":"Edit switch"}
              selectedSwitch=${vt}
              onSwitchChange=${Se}
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
  `,portalRef=at(null);return lt(()=>{const $=document.createElement("div");return $.id="modal-portal",document.body.appendChild($),portalRef.current=$,()=>{O(null,$),document.body.removeChild($)}},[]),lt(()=>{portalRef.current&&O(modalContent,portalRef.current)}),null};function initGlobalTooltip$6(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,pt=$.offsetHeight,ee=window.innerWidth,vt=dt.getBoundingClientRect();let te=vt.left+vt.width/2-_/2;te=Math.max(8,Math.min(te,ee-_-8));let ne=vt.top-pt-8;ne<8&&(ne=vt.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabButton=()=>{const[$,k]=ut(null),[st,ct]=ut([]),[dt,_]=ut(null),[pt,ee]=ut(null),[vt,te]=ut(!1),[ne,Xt]=ut(null),[se,re]=ut(null),[ce,ge]=ut(!1),[ye,pe]=ut("ru"),[he,be]=ut(""),[$e,ke]=ut(!0);lt(()=>{initGlobalTooltip$6()},[]);const _e={ru:Et`
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
    `},Oe=()=>{fetch("/api/button/get").then(ht=>ht.json()).then(ht=>{_(ht.buttons),pe(ht.lang),console.log("Updated button data:",ht.buttons)}).catch(ht=>{console.error("Error fetching button data:",ht)})};lt(()=>{Oe();let ht;return $e&&(ht=setInterval(()=>{Oe()},1e3)),()=>{ht&&clearInterval(ht)}},[$e]);const de=ht=>{const Yt=new Map,oe=dt.find(Zt=>Zt.id===ht);return oe&&oe.pinact&&Object.entries(oe.pinact).forEach(([Zt,ie])=>{Yt.set(Zt,{pin:Zt,relayId:ie})}),st.forEach(Zt=>{if(Zt.idin===ht){const ie=`${Zt.pins}(${Zt.idout})`;Yt.has(ie)||Yt.set(ie,{pin:Zt.pins,relayId:Zt.idout})}}),Array.from(Yt.values())},xe=()=>({langbutton:ye==="ru"?rulangbutton:enlangbutton}),Ee=(ht,Yt)=>{const oe=xe(),Zt=oe[ht]&&oe[ht][Yt]?oe[ht][Yt]:"";return we(Zt)},we=(ht,Yt=100)=>{if(!ht||typeof ht!="string")return"";const oe=[];let Zt="";const ie=ht.split(`
`);return ie.forEach((ae,fe)=>{ae.split(" ").filter(mt=>mt.length>0).forEach(mt=>{const le=Zt.length===0?mt:" "+mt;Zt.length+le.length<=Yt?Zt+=le:(Zt.length>0&&oe.push(Zt),Zt=mt)}),Zt.length>0&&(oe.push(Zt),Zt=""),fe<ie.length-1&&oe.push("")}),Zt.length>0&&oe.push(Zt),oe.join(`
`)},Te=(ht,Yt)=>{Xt(ht),re(Yt),te(!0),ke(!1)},me=()=>{te(!1),Xt(null),re(null),ke(!0)},Ce=ht=>{console.log("handleButtonChange:",ht),_(Yt=>Yt.map(oe=>oe.id===ht.id?{...oe,...ht}:oe)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ht.id,onoff:ht.onoff})}).then(Yt=>Yt.json()).then(Yt=>{console.log("Response from /api/onoff/set:",Yt)}).catch(Yt=>{console.error("Error calling /api/onoff/set:",Yt)}),me()},Se=ht=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Ee("langbutton",ht.tooltipIndex)}
    >
      ${ht.title}
    </th>
  `,$t=({d:ht,index:Yt})=>(de(ht.id),Et`
      <tr class="${Yt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${ht.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${ht.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][ht.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${we(ht.sclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${we(ht.dclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${we(ht.lpress)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${ht.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${ht.onoff}
            onChange=${oe=>Ce({...ht,onoff:oe})}
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
                      <${Se} title="ID" tooltipIndex=${1} />
                      <${Se} title="Pin" tooltipIndex=${2} />
                      <${Se} title="Pullup type" tooltipIndex=${3} />
                      <${Se} title="SINGLE CLICK" tooltipIndex=${4} />
                      <${Se} title="DOUBLE CLICK" tooltipIndex=${5} />
                      <${Se} title="LONG PRESS" tooltipIndex=${6} />
                      <${Se} title="INFO" tooltipIndex=${7} />
                      <${Se} title="On/Off" tooltipIndex=${8} />
                      <${Se} title="Action" tooltipIndex=${9} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${dt.map((ht,Yt)=>Et`<${$t} d=${ht} index=${Yt} key=${ht.id} />`)}
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
                  ${_e[ye]}
                </div>
              `}
          </div>
        </div>
      </div>
    </div>

    ${vt&&Et`
        <${ModalButton}
          modalType=${ne}
          page="TabButton"
          hideModal=${me}
          title=${ne==="connection"?"Edit Connection":"Edit Button pin"}
          selectedButton=${se}
          onButtonChange=${Ce}
        />
      `}
  `:""};function ModalEncoder({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedEncoder:_,handleEncoderChange:pt,connectionOptions:ee,SliderComponent:vt=MyPolzunok}){const[te,ne]=ut((_==null?void 0:_.info)||""),[Xt,se]=ut((_==null?void 0:_.onoff)===1),[re,ce]=ut({pin:(_==null?void 0:_.encdrbpin)||"",id:(_==null?void 0:_.encoderb)||""}),[ge,ye]=ut(Object.entries(_.pinact||{})[0]||["",""]),[pe,he]=ut([]),[be,$e]=ut([]),[ke,_e]=ut([]),Oe=_.pwmmax||100,[de,xe]=ut(_.dvalue||0),[Ee,we]=ut(_.ponr||0),[Te,me]=ut(_.pwm||1e7),Ce=le=>Math.round(le*Oe/100);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(le=>{if(!le.ok)throw new Error(`HTTP error! status: ${le.status}`);return le.json()}).then(le=>{if(!le||!le.data||!Array.isArray(le.data)){console.error("Invalid data format:",le),he([]),$e([]),_e([]);return}const ue=le.data.filter(Pe=>Pe.topin===2),Ie=le.data.filter(Pe=>Pe.topin===9),Me=le.data.filter(Pe=>Pe.topin===5);if(he(ue),$e(Ie),_e(Me),_.encoderb||_.encdrbpin){const Pe=Ie.find(Ne=>String(Ne.id)===String(_.encoderb)||Ne.pins===_.encdrbpin);ce({pin:Pe?Pe.pins:"",id:Pe?Pe.id:""})}}).catch(le=>{console.error("Error fetching pin config:",le),he([]),$e([]),_e([])})},[_]);const Se=le=>{if(le.preventDefault(),!(le.target instanceof HTMLFormElement))return;let Ie={};if($==="edit")Ie={topin:8,id:_.id,pins:_.pins,pwm:parseInt(Te),pwmmax:_.pwmmax,dvalue:parseInt(de),ponr:parseInt(Ee),info:te,onoff:Xt?1:0};else if($==="connection"){const Pe=ge&&ge[0]&&ge[1]!==void 0?{[ge[0]]:parseInt(ge[1])}:{};Ie={id:_.id,pins:_.pins,pwm:parseInt(Te)},re&&re.id!==void 0&&re.id!==""?(Ie.encoderb=parseInt(re.id),Ie.encdrbpin=re.pin):(Ie.encoderb=255,Ie.encdrbpin=""),Ie.pinact=Pe}console.log("Sending JSON to STM32:",JSON.stringify(Ie)),fetch("/api/encoder/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Ie)}).then(Me=>Me.json()).then(Me=>{pt({..._,...Ie}),st()}).catch(Me=>console.error("Error saving encoder:",Me))},$t=le=>{ne(le.target.value)},ht=le=>{se(le)},Yt=le=>{const ue=be.find(Ie=>Ie.pins===le.target.value);ce({pin:le.target.value,id:ue?ue.id:""})},oe=le=>{if(!le.target.value)ye(["",""]);else{const ue=le.target.value.split("|");ye([ue[0],ue[1]])}},Zt=le=>{xe(le.target.value)},ie=le=>{we(le.target.value)},ae=le=>{const ue=le/1e3;return ue<=4e4?{cls:"text-green-600",msg:"Optimal range"}:ue<=2e5?{cls:"text-yellow-600",msg:"Precision might drop"}:{cls:"text-red-600",msg:"Expert mode: low precision"}},ve=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick=${le=>ct&&le.target===le.currentTarget&&st()}
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
          <form onsubmit=${Se}>
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
                        value=${be.some(le=>le.pins===re.pin)?re.pin:""}
                        onchange=${Yt}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select Encoder B</option>
                        ${be.map(le=>Et`
                            <option value=${le.pins}>
                              ${le.pins} (ID: ${le.id})
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
                        value=${ke.some(le=>String(le.pins)===String(ge[0]))?`${ge[0]}|${ge[1]}`:""}
                        onchange=${oe}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select PWM connection</option>
                        ${ke.map(le=>Et`
                            <option value=${`${le.pins}|${le.id}`}>
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
          <form onsubmit=${Se}>
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
                        oninput=${le=>me(le.target.value)} 
                        class="border rounded p-2 w-full font-mono" 
                        placeholder="50 - 2000000000"
                      />
                      <div class="text-xs ${ae(Te).cls}">
                        ${ae(Te).msg}
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
                        oninput=${Zt}
                        class="border rounded p-2 w-full"
                      />
                      <div class="text-xs text-gray-500">
                        ${de}% = ${Ce(parseInt(de)||0)} / ${Oe} steps
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
                        value=${te}
                        oninput=${$t}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${vt}
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
  `,mt=at(null);return lt(()=>{const le=document.createElement("div");return le.id="encoder-modal-portal",document.body.appendChild(le),mt.current=le,()=>{O(null,le),document.body.removeChild(le)}},[]),lt(()=>{mt.current&&O(ve,mt.current)}),null}function initGlobalTooltip$5(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,pt=$.offsetHeight,ee=window.innerWidth,vt=dt.getBoundingClientRect();let te=vt.left+vt.width/2-_/2;te=Math.max(8,Math.min(te,ee-_-8));let ne=vt.top-pt-8;ne<8&&(ne=vt.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabEncoder({}){{const[$,k]=ut(null),[st,ct]=ut(null),[dt,_]=ut(!1),[pt,ee]=ut(null),[vt,te]=ut(null),[ne,Xt]=ut(!1),[se,re]=ut("ru"),[ce,ge]=ut([]),ye=at(!1);lt(()=>{initGlobalTooltip$5()},[]);const pe=()=>Promise.all([fetch("/api/encoder/get").then(ht=>ht.json()),fetch("/api/pintopin/get").then(ht=>ht.json())]).then(([ht,Yt])=>{re(ht.lang),k(ht.encoders),ge(Yt),console.log("Encoder data:",ht.encoders),console.log("Pintopin data:",Yt)}).catch(ht=>{console.error("Error fetching data:",ht)}),he=()=>{fetch("/api/encoder/get").then(ht=>ht.json()).then(ht=>{if(ye.current){console.log("Polling skip: onoff request in flight");return}k(ht.encoders),re(ht.lang),console.log("Updated encoder data:",ht.encoders)}).catch(ht=>{console.error("Error fetching encoder data:",ht)})},be=()=>{fetch("/api/pintopin/get").then(ht=>ht.json()).then(ht=>{ge(ht),console.log("Updated pintopin data:",ht)}).catch(ht=>{console.error("Error fetching pintopin data:",ht)})};lt(()=>{he(),be();const ht=setInterval(()=>{he(),be()},500);return()=>clearInterval(ht)},[]);const $e=ht=>{k(Yt=>Yt.map(oe=>oe.id===ht.id?ht:oe)),ye.current=!0,fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ht.id,onoff:ht.onoff})}).then(Yt=>Yt.json()).then(Yt=>{console.log("Response from /api/onoff/set (Encoder):",Yt)}).catch(Yt=>{console.error("Error calling /api/onoff/set (Encoder):",Yt)}).finally(()=>{ye.current=!1})},ke=ht=>{const Yt=$.find(Zt=>Zt.id===ht),oe=[];return Yt&&Yt.pinact&&Object.entries(Yt.pinact).forEach(([Zt,ie])=>{oe.push({pin:Zt,idout:ie})}),oe},_e=ht=>{const Yt=ht/1e3;return Yt<=4e4?{cls:"text-green-600",msg:"✓"}:Yt<=2e5?{cls:"text-yellow-600",msg:"~"}:{cls:"text-red-600",msg:"!"}},Oe=ht=>{if(!ht)return"—";const Yt=ht/1e3;return Yt>=1e6?`${(Yt/1e6).toFixed(2)} MHz`:Yt>=1e3?`${(Yt/1e3).toFixed(1)} kHz`:`${Yt} Hz`},de=()=>({langbutton:se==="ru"?ruencoder:enencoder}),xe=(ht,Yt)=>{const oe=de(),Zt=oe[ht]&&oe[ht][Yt]?oe[ht][Yt]:"";return Ee(Zt)},Ee=(ht,Yt=50)=>{if(!ht||typeof ht!="string")return"";const oe=ht.split(" ");let Zt=[],ie="";for(let ae=0;ae<oe.length;ae++)ie.length+oe[ae].length+1<=Yt?ie+=`${ie?" ":""}${oe[ae]}`:(ie&&Zt.push(ie.trim()),ie=oe[ae]);return ie&&Zt.push(ie.trim()),Zt.join(`
`)},we=(ht,Yt)=>{console.log("Deleting connection:",ht,Yt);const oe=Yt.split("(")[0].trim();fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ht,pin:oe})}).then(Zt=>Zt.ok?Zt.json():Zt.text().then(ie=>{throw new Error(`HTTP error! status: ${Zt.status}, message: ${ie}`)})).then(Zt=>{ct(Zt),k(ie=>ie.map(ae=>{if(ae.id===ht){const fe={...ae.pinact};return delete fe[oe],{...ae,pinact:fe}}return ae})),ge(ie=>ie.filter(ae=>!(ae.idin===ht&&ae.pins===oe)))}).then(()=>{console.log("Connection deleted successfully"),pe()}).catch(Zt=>{console.error("Error deleting connection:",Zt)})},Te=(ht,Yt)=>{console.log("Opening modal:",ht,Yt),ee(ht),te(Yt),_(!0)},me=()=>{_(!1),ee(null),te(null)},Ce={ru:Et`
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
      `},Se=({title:ht,tooltipIndex:Yt})=>Et`
      <th
        class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
        data-tip=${xe("langbutton",Yt)}
      >
        ${ht}
      </th>
    `,$t=({d:ht,index:Yt})=>{const oe=ke(ht.id),Zt=_e(ht.pwm||0);return Et`
        <tr class="${Yt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
          <td class="px-6 py-2 text-sm text-slate-800 font-medium">${ht.pins}(${ht.id})</td>
          <td class="px-6 py-2 text-sm text-slate-700">
            ${ht.encdrbpin?`${ht.encdrbpin}(${ht.encoderb})`:"Not set"}
          </td>
          <td class="px-6 py-2 text-sm text-slate-700 font-mono">
            ${oe.length>0?oe.map(({pin:ie,idout:ae})=>Et`
                    <span class="mr-2 inline-flex items-center">
                      ${ie}(${ae})
                      <button
                        onClick=${fe=>{fe.preventDefault(),we(ht.id,`${ie}(${ae})`)}}
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
            <span class="ml-1 font-bold ${Zt.cls}">${Zt.msg}</span>
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
              onChange=${ie=>$e({...ht,onoff:ie})}
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
                        <${Se} title="Encoder A (ID)" tooltipIndex=${3} />
                        <${Se} title="Encoder B (ID)" tooltipIndex=${4} />
                        <${Se} title="PWM connection" tooltipIndex=${5} />
                        <${Se} title="PWM Frequency" tooltipIndex=${11} />
                        <${Se} title="Resolution (steps)" tooltipIndex=${12} />
                        <${Se} title="Dimmer value (0-100)" tooltipIndex=${6} />
                        <${Se} title="Duty on restore" tooltipIndex=${7} />
                        <${Se} title="INFO" tooltipIndex=${8} />
                        <${Se} title="On/Off" tooltipIndex=${9} />
                        <${Se} title="Action" tooltipIndex=${10} />
                      </tr>
                    </thead>
                    <tbody id="tab1" class="divide-y divide-white/40">
                      ${$.map((ht,Yt)=>Et`<${$t} d=${ht} index=${Yt} key=${ht.id} />`)}
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="flex justify-end mt-6">
                <button
                  onclick=${()=>Xt(!ne)}
                  class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
                >
                  ${ne?"Hide Help":"Show Help"}
                </button>
              </div>

              ${ne&&Et`
                  <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                    ${Ce[se]}
                  </div>
                `}
            </div>
          </div>
          ${dt&&Et`
              <${ModalEncoder}
                modalType=${pt}
                page="TabEncoder"
                hideModal=${me}
                title=${pt==="connection"?"Edit Connection":"Edit Encoder"}
                selectedEncoder=${vt}
                handleEncoderChange=${$e}
              />
            `}
        </div>
      </div>
    `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">Loading...</div>`}}function ModalCron({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedCron:_,handleCronChange:pt,connectionOptions:ee,modalClass:vt,SliderComponent:te=MyPolzunok}){const[ne,Xt]=ut((_==null?void 0:_.info)||""),[se,re]=ut((_==null?void 0:_.onoff)===1),[ce,ge]=ut((_==null?void 0:_.activ)||""),[ye,pe]=ut((_==null?void 0:_.cron)||""),[he,be]=ut(_.setrpins||""),$e=Te=>{Te.preventDefault();const me=new FormData(Te.target),Ce=Object.fromEntries(me);Ce.id=_.id,Ce.pins=_.pins,$==="edit"?(Ce.onoff=se?1:0,Ce.info=ne,Ce.cron=ye,Ce.activ=ce):$==="connection"&&(Ce.setrpins=he),console.log("Data being sent to server:"),console.log(Ce),console.log("Stringified data:"),console.log(JSON.stringify(Ce)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Ce)}).then(Se=>Se.json()).then(Se=>{console.log("Success:",Se),pt({..._,...Ce}),st(),window.location.href="/#/cron"}).catch(Se=>{console.error("Error:",Se)})};lt(()=>{Xt((_==null?void 0:_.info)||""),be((_==null?void 0:_.setrpins)||""),re((_==null?void 0:_.onoff)===1)},[_]);const ke=Te=>{pe(Te.target.value)},_e=Te=>{Xt(Te.target.value)},Oe=Te=>{re(Te)},de=Te=>{ge(Te.target.value)},xe=()=>{if(k==="TabCron"&&$==="edit")return Et`
          <form onsubmit=${$e}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  ${[{label:"ID",value:_.id},{label:"Cron",value:Et`
                        <input
                          type="text"
                          value=${ye}
                          onInput=${ke}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"Script",value:Et`
                        <input
                          type="text"
                          value=${ce}
                          onInput=${de}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"INFO",value:Et`
                        <input
                          type="text"
                          value=${ne}
                          onInput=${_e}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"On/Off",value:Et`<${te}
                        value=${se}
                        onChange=${Oe}
                      />`}].map((Te,me)=>Et`
                      <tr
                        class="${me%2===1?"bg-white":"bg-gray-200"}"
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
    <div class=${`modal ${vt||""}`}>
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
            ${xe()}
          </div>
        </div>
      </div>
    </div>
  `,we=at(null);return lt(()=>{const Te=document.createElement("div");return Te.id="modal-portal",document.body.appendChild(Te),we.current=Te,()=>{O(null,Te),document.body.removeChild(Te)}},[]),lt(()=>{we.current&&O(Ee,we.current)}),null}function ModalPwmCron({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedCron:_,handleCronChange:pt,modalClass:ee,SliderComponent:vt=MyPolzunok}){let te="",ne="900",Xt="0",se="100";if(_!=null&&_.activ&&_.activ.startsWith("pwm:")){const ht=_.activ.substring(4).split(",");ht.length===4&&(te=ht[0],ne=ht[1],Xt=ht[2],se=ht[3])}const[re,ce]=ut((_==null?void 0:_.info)||""),[ge,ye]=ut((_==null?void 0:_.onoff)===1),[pe,he]=ut((_==null?void 0:_.cron)||""),[be,$e]=ut(te),[ke,_e]=ut(ne),[Oe,de]=ut(Xt),[xe,Ee]=ut(se),[we,Te]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store"}).then(ht=>ht.json()).then(ht=>{if(ht&&ht.data&&Array.isArray(ht.data)){const Yt=ht.data.filter(oe=>oe.topin===5);Te(Yt),!be&&Yt.length>0&&$e(Yt[0].id.toString())}}).catch(ht=>console.error("Error fetching pin config:",ht))},[]);const me=ht=>{ht.preventDefault();const Yt=new FormData(ht.target),oe=Object.fromEntries(Yt);oe.id=_.id,oe.pins=_.pins,oe.onoff=ge?1:0,oe.info=re,oe.cron=pe,oe.activ=`pwm:${be},${ke},${Oe},${xe}`,fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(oe)}).then(Zt=>Zt.json()).then(Zt=>{pt({..._,...oe}),st(),window.location.href="/#/cron"}).catch(Zt=>console.error("Error:",Zt))},Ce=()=>Et`
      <form onsubmit=${me}>
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
                    onChange=${ht=>$e(ht.target.value)}
                    class="border rounded p-2 w-full"
                    required
                  >
                    ${we.map(ht=>Et`<option value=${ht.id}>${ht.pins}</option>`)}
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200">
                <td class="p-2 font-bold">Cron Pattern</td>
                <td class="p-2">
                  <input
                    type="text"
                    value=${pe}
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
                    value=${ke}
                    onInput=${ht=>_e(ht.target.value)}
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
                    value=${xe}
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
                    onInput=${ht=>ce(ht.target.value)}
                    class="border rounded p-2 w-full"
                  />
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-2 font-bold">On/Off</td>
                <td class="p-2">
                  <${vt} value=${ge} onChange=${ye} />
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
    `,Se=Et`
    <div class=${`modal ${ee||""}`}>
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
            ${Ce()}
          </div>
        </div>
      </div>
    </div>
  `,$t=at(null);return lt(()=>{const ht=document.createElement("div");return ht.id="pwm-modal-portal",document.body.appendChild(ht),$t.current=ht,()=>{O(null,ht),document.body.removeChild(ht)}},[]),lt(()=>{$t.current&&O(Se,$t.current)}),null}function initGlobalTooltip$4(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,pt=$.offsetHeight,ee=window.innerWidth,vt=dt.getBoundingClientRect();let te=vt.left+vt.width/2-_/2;te=Math.max(8,Math.min(te,ee-_-8));let ne=vt.top-pt-8;ne<8&&(ne=vt.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabCron({}){const[$,k]=ut(null),[st,ct]=ut(null);at(null);const[dt,_]=ut(!1),[pt,ee]=ut(null),[vt,te]=ut(null),[ne,Xt]=ut("ru"),[se,re]=ut(!1),[ce,ge]=ut(1),[ye,pe]=ut(0);lt(()=>{initGlobalTooltip$4()},[]);const he=()=>fetch("/api/cron/get").then($t=>$t.json()).then($t=>{console.log("API response:",$t),$t&&Array.isArray($t.timers)?(k($t.timers),Xt($t.lang||"ru"),typeof $t.numline=="number"&&(pe($t.numline),ge($t.numline))):(console.error("Unexpected API response structure:",$t),k([]))}).catch($t=>{console.error("Error fetching cron data:",$t),k([])});lt(()=>{he()},[]);const be=at(!0);lt(()=>{if(be.current){be.current=!1;return}$e(ye)},[ye]);const $e=$t=>{fetch("/api/numline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({numline:$t})}).then(ht=>ht.json()).then(ht=>console.log("Numline sent to stm32:",ht)).catch(ht=>console.error("Error sending Crone line to stm32:",ht))},ke=()=>{if(ce<$.length){const $t=ce+1;ge($t),pe($t),$e($t)}},_e=()=>{if(ce>0){const $t=ce-1;ge($t),pe($t),$e($t)}},Oe={ru:Et`
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
    `};if($===null)return Et`<div>Loading...</div>`;const de=()=>({langtimers:ne==="ru"?rulangtimers:enlangtimers}),xe=($t,ht)=>{const Yt=de(),Zt=(Yt[$t]&&Yt[$t][ht]?Yt[$t][ht]:"").split(" "),ie=[];for(let ae=0;ae<Zt.length;ae+=15)ie.push(Zt.slice(ae,ae+15).join(" "));return ie.join("<br>")},Ee=($t,ht)=>{ee($t),te(ht),_(!0)},we=()=>{_(!1),ee(null),te(null)},Te=$t=>{console.log("handleCronChange:",$t),k($.map(ht=>ht.id===$t.id?$t:ht)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify($t)}).then(ht=>ht.json()).then(ht=>{console.log("Cron job updated successfully:",ht)}).catch(ht=>{console.error("Error updating cron job:",ht)})},me=()=>Array.isArray(vt)?vt.flatMap($t=>$t.pinact?Object.keys($t.pinact).map(ht=>({value:ht,label:ht})):[]):vt&&vt.pinact?Object.keys(vt.pinact).map($t=>({value:$t,label:$t})):[],Ce=$t=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${xe("langtimers",$t.tooltipIndex)}
    >
      ${$t.title}
    </th>
  `,Se=({d:$t,index:ht})=>{const Yt=$t.activ&&$t.activ.startsWith("pwm:");let oe=$t.activ;if(Yt){const Zt=$t.activ.substring(4).split(",");Zt.length===4&&(oe=`pwmID=${Zt[0]} | ${Zt[1]}s | ${Zt[2]}%→${Zt[3]}%`)}return Et`
    <tr class="${ht%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$t.id}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider">${$t.cron}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider items-center gap-1 flex justify-start">${oe}</td>
      <td class="px-6 py-4 text-sm text-slate-600">${$t.info}</td>
      <td class="px-6 py-4">
        <${MyPolzunok}
          value=${$t.onoff}
          onChange=${Zt=>Te({...$t,onoff:Zt})}
        />
      </td>
     <td class="px-6 py-4 text-center">
        ${Yt?Et`
          <button
            onclick=${()=>Ee("edit_pwm",$t)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-3"
          >
            Edit
          </button>
          <button
            onclick=${()=>Ee("edit_pwm",$t)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap ml-1"
          >
            PWM
          </button>
        `:Et`
       <button
            onclick=${()=>Ee("edit",$t)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
          >
            Edit
          </button>
          <button
            onclick=${()=>Ee("edit_pwm",$t)}
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
                          <${Ce} title="No" tooltipIndex=${1} />
                          <${Ce} title="Cron" tooltipIndex=${2} />
                          <${Ce} title="Script" tooltipIndex=${3} />
                          <${Ce} title="Info" tooltipIndex=${4} />
                          <${Ce} title="On/Off" tooltipIndex=${5} />
                          <${Ce} title="Action" tooltipIndex=${6} />
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-white/40">
                        ${$.slice(0,ce).map(($t,ht)=>Et`<${Se} d=${$t} index=${ht} key=${$t.id} />`)}
                      </tbody>
                    </table>
                  </div>
                </div>
              `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No cron jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>re(!se)}
          >
            ${se?"Hide Help":"Show Help"}
          </button>
          <div class="font-semibold text-slate-600 tracking-wide">
            ${$&&$.length-ce>0?`Still available: ${$.length-ce} cron jobs`:"No available: cron jobs!"}
          </div>
          <div class="flex gap-2">
            ${$&&ce<$.length?Et`
                  <button
                    class="bg-emerald-500 hover:bg-emerald-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-emerald-500/30"
                    onclick=${ke}
                    title="Add Cron"
                  >+</button>
                `:null}
            ${ce>0?Et`
                  <button
                    class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                    onclick=${_e}
                    title="Remove Cron"
                  >-</button>
                `:null}
          </div>
        </div>
      </div>

      ${se&&Et`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">
          ${Oe[ne]}
        </div>
      `}

      ${dt&&pt==="edit_pwm"?Et`
        <${ModalPwmCron}
          modalType=${pt}
          page="TabCron"
          hideModal=${we}
          title="Edit PWM Timer(s)"
          selectedCron=${vt}
          handleCronChange=${Te}
          modalClass="mt-24"
        />
      `:dt?Et`
        <${ModalCron}
          modalType=${pt}
          page="TabCron"
          hideModal=${we}
          title=${pt==="edit"?"Edit Timer(s)":"Edit Connection"}
          selectedCron=${vt}
          handleCronChange=${Te}
          connectionOptions=${me()}
          modalClass="mt-24"
        />
      `:null}
    </div>
  `}const PRESETS$1={ru:[{value:"1",label:"Паяльная станция T max=125°C, T min=-55°C"},{value:"2",label:"Кулер / вентилятор T max=70°C, T min=-55°C"},{value:"3",label:"3D‑принтер (стол) T max=120°C, T min=0°C"},{value:"4",label:"Форточный нагреватель T max=60°C, T min=-55°C"},{value:"5",label:"Тёплый пол T max=45°C, T min=0°C"},{value:"6",label:"Холодильник T max=100°C, T min=-55°C"},{value:"7",label:"Аквариум / бойлер T max=80°C, T min=0°C"},{value:"8",label:"Инкубатор T max=45°C, T min=0°C"},{value:"9",label:"Теплица / комната T max=50°C, T min=-55°C"}],en:[{value:"1",label:"Soldering station T max=125°C, T min=-55°C"},{value:"2",label:"Cooler / fan T max=70°C, T min=-55°C"},{value:"3",label:"3D printer (table) T max=120°C, T min=0°C"},{value:"4",label:"Vent heater T max=60°C, T min=-55°C"},{value:"5",label:"Warm floor T max=45°C, T min=0°C"},{value:"6",label:"Refrigerator T max=100°C, T min=-55°C"},{value:"7",label:"Aquarium / boiler T max=80°C, T min=0°C"},{value:"8",label:"Incubator T max=45°C, T min=0°C"},{value:"9",label:"Greenhouse / room T max=50°C, T min=-55°C"}]},SENSOR_OPTIONS$1=[{value:"1",label:"DS18B20"},{value:"2",label:"DHT-22"}];function ModalPid({modalType:$,page:k,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedPid:_,handlePidChange:pt,language:ee="en",modalClass:vt,SliderComponent:te=MyPolzunok}){const[ne,Xt]=ut((_==null?void 0:_.info)||""),[se,re]=ut((_==null?void 0:_.onoff)===1),[ce,ge]=ut((_==null?void 0:_.selsens)||"1"),[ye,pe]=ut((_==null?void 0:_.sernum)||""),[he,be]=ut((_==null?void 0:_.presets)||"1"),[$e,ke]=ut((_==null?void 0:_.tmpset)||""),[_e,Oe]=ut((_==null?void 0:_.tmpcur)||""),[de,xe]=ut([]),[Ee,we]=ut(Object.entries((_==null?void 0:_.pinact)||{})[0]||["",""]);lt(()=>{Xt((_==null?void 0:_.info)||""),re((_==null?void 0:_.onoff)===1),ge((_==null?void 0:_.selsens)||"1"),pe((_==null?void 0:_.sernum)||""),be((_==null?void 0:_.presets)||"1"),ke((_==null?void 0:_.tmpset)||""),Oe((_==null?void 0:_.tmpcur)||""),we(Object.entries((_==null?void 0:_.pinact)||{})[0]||["",""])},[_]),lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(Yt=>{if(!Yt.ok)throw new Error(`HTTP error! status: ${Yt.status}`);return Yt.json()}).then(Yt=>{if(!Yt||!Yt.data||!Array.isArray(Yt.data)){console.error("Invalid data format:",Yt),xe([]);return}const oe=Yt.data.filter(Zt=>Zt.topin===5);xe(oe)}).catch(Yt=>{console.error("Error fetching pin config:",Yt),xe([])})},[_]);const Te=Yt=>{Yt.preventDefault();const oe=Ee[0]&&Ee[1]!==void 0&&Ee[1]!=="",Zt={id:_.id,pins:Ee[0],pinact:oe?{[Ee[0]]:parseInt(Ee[1])}:{},selsens:ce,sernum:ye,presets:he,tmpset:$e,tmpcur:_e,info:ne,onoff:se?1:0};console.log("Data being sent to server:",Zt),fetch("/api/pid/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Zt)}).then(ie=>ie.json()).then(ie=>{console.log("Success:",ie),pt({..._,...Zt}),st(),window.location.href="/#/pid"}).catch(ie=>{console.error("Error:",ie)})},me=Yt=>{if(!Yt.target.value)we(["",""]);else{const oe=Yt.target.value.split("|");we([oe[0],oe[1]])}},Ce=PRESETS$1[ee]||PRESETS$1.en,Se=()=>k==="TabPid"&&$==="edit"?Et`
        <form onsubmit=${Te}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                ${[{label:"ID",value:_.id},{label:"PWM Pin",value:Et`
                        <select
                          value=${de.some(Yt=>String(Yt.pins)===String(Ee[0]))?`${Ee[0]}|${Ee[1]}`:""}
                          onChange=${me}
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
                        value=${ce}
                        onChange=${Yt=>ge(Yt.target.value)}
                        class="border rounded p-2 w-full"
                      >
                        ${SENSOR_OPTIONS$1.map(Yt=>Et`
                            <option
                              value=${Yt.value}
                              selected=${Yt.value===ce}
                            >
                              ${Yt.label}
                            </option>
                          `)}
                      </select>
                    `},{label:"Dev. ser. number",value:ce==="1"?Et`
                          <input
                            type="text"
                            value=${ye}
                            onInput=${Yt=>pe(Yt.target.value)}
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
                        onChange=${Yt=>be(Yt.target.value)}
                        class="border rounded p-2 w-full"
                      >
                        ${Ce.map(Yt=>Et`
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
                        value=${$e}
                        onInput=${Yt=>ke(Yt.target.value)}
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
                        onInput=${Yt=>Xt(Yt.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    `},{label:"On/Off",value:Et`
                      <${te}
                        value=${se}
                        onChange=${Yt=>re(Yt)}
                      />
                    `}].map((Yt,oe)=>Et`
                    <tr class="${oe%2===1?"bg-white":"bg-gray-200"}">
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
      `:null,$t=Et`
    <div class=${`modal ${vt||""}`}>
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
            ${Se()}
          </div>
        </div>
      </div>
    </div>
  `,ht=at(null);return lt(()=>{const Yt=document.createElement("div");return Yt.id="modal-portal",document.body.appendChild(Yt),ht.current=Yt,()=>{O(null,Yt),document.body.removeChild(Yt)}},[]),lt(()=>{ht.current&&O($t,ht.current)}),null}function initGlobalTooltip$3(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,pt=$.offsetHeight,ee=window.innerWidth,vt=dt.getBoundingClientRect();let te=vt.left+vt.width/2-_/2;te=Math.max(8,Math.min(te,ee-_-8));let ne=vt.top-pt-8;ne<8&&(ne=vt.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const PRESETS={ru:[{value:"1",label:"Паяльная станция T max=125°C, T min=-55°C"},{value:"2",label:"Кулер / вентилятор T max=70°C, T min=-55°C"},{value:"3",label:"3D‑принтер (стол) T max=120°C, T min=0°C"},{value:"4",label:"Форточный нагреватель T max=60°C, T min=-55°C"},{value:"5",label:"Тёплый пол T max=45°C, T min=0°C"},{value:"6",label:"Холодильник T max=100°C, T min=-55°C"},{value:"7",label:"Аквариум / бойлер T max=80°C, T min=0°C"},{value:"8",label:"Инкубатор T max=45°C, T min=0°C"},{value:"9",label:"Теплица / комната T max=50°C, T min=-55°C"}],en:[{value:"1",label:"Soldering station T max=125°C, T min=-55°C"},{value:"2",label:"Cooler / fan T max=70°C, T min=-55°C"},{value:"3",label:"3D printer (table) T max=120°C, T min=0°C"},{value:"4",label:"Vent heater T max=60°C, T min=-55°C"},{value:"5",label:"Warm floor T max=45°C, T min=0°C"},{value:"6",label:"Refrigerator T max=100°C, T min=-55°C"},{value:"7",label:"Aquarium / boiler T max=80°C, T min=0°C"},{value:"8",label:"Incubator T max=45°C, T min=0°C"},{value:"9",label:"Greenhouse / room T max=50°C, T min=-55°C"}]},SENSOR_OPTIONS=[{value:"1",label:"DS18B20"},{value:"2",label:"DHT-22"}],HELP_CONTENT$1={ru:Et`
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
  `,document.head.appendChild($)}function TabPid({}){const[$,k]=ut(null),[st,ct]=ut(null);at(null);const[dt,_]=ut(!1),[pt,ee]=ut(null),[vt,te]=ut(null),[ne,Xt]=ut("ru"),[se,re]=ut(!1),[ce,ge]=ut(0),[ye,pe]=ut(0),he=at(!1);lt(()=>{initGlobalTooltip$3(),initTuneStyles()},[]);const be=()=>{fetch("/api/pid/get").then(Zt=>Zt.json()).then(Zt=>{he.current||Zt&&Array.isArray(Zt.pid)&&(k(Zt.pid),Xt(Zt.lang||"ru"),typeof Zt.pidline=="number"&&(pe(Zt.pidline),ge(Zt.pidline)))}).catch(Zt=>console.error("Error fetching PID data:",Zt))};lt(()=>{be();const Zt=setInterval(()=>{be()},500);return()=>clearInterval(Zt)},[]);const $e=at(!0);lt(()=>{if($e.current){$e.current=!1;return}ke(ye)},[ye]);const ke=Zt=>{fetch("/api/pidline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pidline:Zt})}).then(ie=>ie.json()).then(ie=>console.log("Pidline sent to stm32:",ie)).catch(ie=>console.error("Error sending PID line to stm32:",ie))},_e=()=>{if(ce<PID_MAX_SLOTS){const Zt=ce+1;ge(Zt),pe(Zt)}},Oe=()=>{if(ce>0){const Zt=ce-1;ge(Zt),pe(Zt)}};if($===null)return Et`<div>Loading...</div>`;const de=()=>({langtimers:ne==="ru"?rulangtimers:enlangtimers}),xe=(Zt,ie)=>{const ae=de(),ve=(ae[Zt]&&ae[Zt][ie]?ae[Zt][ie]:"").split(" "),mt=[];for(let le=0;le<ve.length;le+=15)mt.push(ve.slice(le,le+15).join(" "));return mt.join("<br>")},Ee=(Zt,ie)=>{ee(Zt),te(ie),_(!0)},we=()=>{_(!1),ee(null),te(null)},Te=Zt=>{console.log("handlePidChange:",Zt),k($.map(ie=>ie.id===Zt.id?Zt:ie)),he.current=!0,fetch("/api/pid/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Zt)}).then(ie=>ie.json()).then(ie=>{console.log("PID job updated successfully:",ie)}).catch(ie=>{console.error("Error updating PID job:",ie)}).finally(()=>{he.current=!1})},me=Zt=>{const ie=Zt.id,ae=Zt.tune_state||0;if(!(ae===TUNE_STEP||ae===TUNE_BIAS)){if(ae===TUNE_ERROR){Ce(ie);return}console.log("Run tune for id:",ie),fetch("/api/pid/tune",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ie,action:"start"})}).then(fe=>fe.json()).then(fe=>{console.log("Tune start response:",fe)}).catch(fe=>{console.error("Error starting tune:",fe)})}},Ce=Zt=>{console.log("Stop tune for id:",Zt),fetch("/api/pid/tune",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:Zt,action:"stop"})}).then(ie=>ie.json()).then(ie=>{console.log("Tune stop response:",ie)}).catch(ie=>{console.error("Error stopping tune:",ie)})},Se=PRESETS[ne]||PRESETS.en,$t=Zt=>{const ie=Se.find(ae=>ae.value===String(Zt));return ie?ie.label:Zt},ht=Zt=>{const ie=SENSOR_OPTIONS.find(ae=>ae.value===String(Zt));return ie?ie.label:Zt},Yt=Zt=>Et`
    <th
      class="px-4 py-4 text-base font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${xe("langtimers",Zt.tooltipIndex)}
    >
      ${Zt.title}
    </th>
  `,oe=(Zt,ie)=>{const ae=Zt.tune_state||0,fe=Zt.tune_progress||0,ve=ae===TUNE_STEP||ae===TUNE_BIAS,mt=ae===TUNE_DONE,le=ae===TUNE_ERROR,ue=mt?"background:linear-gradient(to right,#4ade80,#10b981);box-shadow:0 4px 14px rgba(16,185,129,0.4);":le?"background:linear-gradient(to right,#dc2626,#b91c1c);box-shadow:0 4px 14px rgba(220,38,38,0.5);animation:tuneBlink 1s ease-in-out infinite;":"background:linear-gradient(to right,#ef4444,#e11d48);box-shadow:0 4px 14px rgba(239,68,68,0.4);",Ie="px-3 py-1 rounded-full text-sm font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap",Me=mt?"Tuning Done":le?"⚠ Error!":"Run tune";if(ve){const Pe=fe.toFixed(1),De=`Auto Tune (${ae===TUNE_STEP?"Step test":"Bias search"})… ${fe}%`;return Et`
        <tr key=${Zt.id} class="${ie%2===1?"bg-white/80":"bg-sky-200/40"}">
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
              onclick=${()=>Ce(Zt.id)}
              class="px-3 py-1 rounded-full text-sm font-bold text-white whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95"
              style="background:linear-gradient(to right,#f97316,#ef4444);box-shadow:0 4px 14px rgba(239,68,68,0.4);"
            >Stop</button>
          </td>
        </tr>
      `}return Et`
      <tr key=${Zt.id} class="${ie%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-4 py-3 text-sm text-slate-800 font-medium">${Zt.id}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">
          ${(()=>{const Pe=Object.entries(Zt.pinact||{});if(!Pe.length)return"—";const[Ne,De]=Pe[0];return`${Ne}(${De})`})()}
        </td>
        <td class="px-4 py-3 text-sm text-slate-700">${ht(Zt.selsens)}</td>
        <td class="px-4 py-3 text-sm font-mono ${Zt.selsens==="1"?"text-slate-700":"text-slate-400 italic"}">${Zt.selsens==="1"?Zt.sernum||"—":"N/A"}</td>
        <td class="px-4 py-3 text-sm text-slate-700">${$t(Zt.presets)}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">${Zt.tmpset}</td>
        <td class="px-4 py-3 text-sm text-slate-700 font-mono">${Zt.tmpcur}</td>
        <td class="px-4 py-3 text-sm text-slate-800 font-mono ${Zt.onoff?"":"text-rose-500 font-bold"}">${Zt.onoff?Zt.duty!==void 0?Zt.duty:"—":"OFF"}</td>
        <td class="px-4 py-3 text-sm text-slate-600">${Zt.info}</td>
        <td class="px-4 py-3">
          <${MyPolzunok}
            value=${Zt.onoff}
            onChange=${Pe=>Te({...Zt,onoff:Pe})}
          />
        </td>
        <td class="px-4 py-3 text-center">
          <button
            onclick=${()=>Ee("edit",Zt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
          >Edit</button>
        </td>
        <td class="px-4 py-3 text-center">
          <button
            onclick=${()=>me(Zt)}
            class="${Ie}"
            style="${ue}"
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
          ${ce>0?Et`
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
                      ${Array.from({length:ce},(Zt,ie)=>{const ae=$&&$[ie]?$[ie]:{id:ie+1,pins:"",pinact:{},selsens:"",sernum:"",presets:"",tmpset:"",tmpcur:"",info:"",onoff:0,tune_state:0,tune_progress:0};return oe(ae,ie)})}
                    </tbody>
                  </table>
                </div>
              </div>
            `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No PID jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>re(!se)}
          >
            ${se?"Hide Help":"Show Help"}
          </button>
          <div class="font-semibold text-slate-600 tracking-wide">
            ${$&&PID_MAX_SLOTS-ce>0?`Still available: ${PID_MAX_SLOTS-ce} PID jobs`:"No available: PID jobs!"}
          </div>
          <div class="flex gap-2">
            ${ce<PID_MAX_SLOTS?Et`
            <button
                class="bg-emerald-500 hover:bg-emerald-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-emerald-500/30"
                onclick=${_e}
                title="Add PID"
            >+</button>
            `:null}
            ${ce>0?Et`
                <button
                  class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                  onclick=${Oe}
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
          hideModal=${we}
          title="Edit PID"
          selectedPid=${vt}
          handlePidChange=${Te}
          language=${ne}
          modalClass="mt-24"
        />
      `:null}
    </div>
  `}function ModalEditSensor({typsensor:$,oneWireId:k,pins:st,onClose:ct,onUpdate:dt,sensorType:_,sensorData:pt,closeOnOverlayClick:ee=!0}){const[vt,te]=ut({ut:(pt==null?void 0:pt.ut)||$.ut,lt:(pt==null?void 0:pt.lt)||$.lt,action_ut:(pt==null?void 0:pt.action_ut)||$.action_ut,action_lt:(pt==null?void 0:pt.action_lt)||$.action_lt,upphumid:(pt==null?void 0:pt.upphumid)||$.upphumid||0,humlolim:(pt==null?void 0:pt.humlolim)||$.humlolim||0,actuphum:(pt==null?void 0:pt.actuphum)||$.actuphum||"",actlowhum:(pt==null?void 0:pt.actlowhum)||$.actlowhum||"",info:(pt==null?void 0:pt.info)||$.info,onoff:(pt==null?void 0:pt.onoff)||$.onoff||0,humidity:(pt==null?void 0:pt.humidity)||$.humidity||0}),[ne,Xt]=ut(!1),se=(be,$e,ke)=>{if(be===""||be==="-")return be;const _e=be.replace(",",".");if(!/^-?\d*\.?\d*$/.test(_e))return null;const Oe=parseFloat(_e);return isNaN(Oe)||Oe<$e||Oe>ke?null:_e},re=be=>{const{name:$e,value:ke}=be.target;if(["ut","lt"].includes($e)){const _e=se(ke,-55,125);_e!==null&&te(Oe=>({...Oe,[$e]:_e}))}else if(["upphumid","humlolim"].includes($e)){const _e=se(ke,0,100);_e!==null&&te(Oe=>({...Oe,[$e]:_e}))}else te(_e=>({..._e,[$e]:ke}))},ce=be=>{const $e=["ut","lt","upphumid","humlolim"],ke={...be};return $e.forEach(_e=>{ke[_e]===""||ke[_e]==="-"?ke[_e]=0:ke[_e]=parseFloat(ke[_e].toString().replace(",","."))}),ke},pe=Et`
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
        <form onsubmit=${async be=>{be.preventDefault(),Xt(!0);const $e=ce(vt);try{if(!(await fetch("/api/sensor/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:k,pins:st,sensorNumber:$.s_number,...$e,s_number:$.s_number,t:$.t})})).ok)throw new Error("Network response was not ok");dt({...$,...$e,oneWireId:k,pins:st,s_number:$.s_number,t:$.t}),ct()}catch(ke){console.error("Error updating Sensor:",ke)}finally{Xt(!1)}}}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                <tr class="bg-blue-100">
                  <td class="p-2 font-bold">Upper Temperature</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="ut"
                      value=${vt.ut}
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
                      value=${vt.lt}
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
                      value=${vt.action_ut}
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
                      value=${vt.action_lt}
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
                            value=${vt.upphumid}
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
                            value=${vt.humlolim}
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
                            value=${vt.actuphum}
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
                            value=${vt.actlowhum}
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
                      value=${vt.info}
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
  `,he=at(null);return lt(()=>{const be=document.createElement("div");return be.id="modal-portal-sensor",document.body.appendChild(be),he.current=be,()=>{O(null,be),document.body.removeChild(be)}},[]),lt(()=>{he.current&&O(pe,he.current)}),null}function ModalOneWire({oneWire:$,onClose:k,onUpdate:st,refresh:ct,closeOnOverlayClick:dt=!0}){console.log("oneWire object:",$);const[_,pt]=ut({typsensor:$.typsensor,numdevices:$.numdevices}),[ee,vt]=ut(!1),[te,ne]=ut($.onoff||0),Xt=pe=>{dt&&pe.target===pe.currentTarget&&k()},se=pe=>{const{name:he,value:be}=pe.target;let $e={..._,[he]:parseInt(be,10)};he==="typsensor"&&(be==="0"?$e.numdevices=0:be==="2"&&($e.numdevices=1)),pt($e)},re=pe=>{ne(pe)},ge=Et`
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
            disabled=${ee}
          >
            Close
          </button>
        </div>
        <form onsubmit=${async pe=>{pe.preventDefault(),vt(!0);const he={id:$.id,pin:$.pin,typsensor:_.typsensor,numdevices:_.numdevices,onoff:te};console.log("Sending data:",he);try{if(!(await fetch("api/onewire/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(he)})).ok)throw new Error("Network response was not ok");const $e={...$,..._,onoff:te};st($e),k()}catch(be){console.error("Error updating OneWire:",be)}finally{vt(!1)}}}>
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
                      onchange=${se}
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
                      oninput=${_.typsensor===1?se:void 0}
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
                      value=${te}
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
              disabled=${ee}
            >
              ${ee?"Saving...":"Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,ye=at(null);return lt(()=>{const pe=document.createElement("div");return pe.id="modal-portal-onewire",document.body.appendChild(pe),ye.current=pe,()=>{O(null,pe),document.body.removeChild(pe)}},[]),lt(()=>{ye.current&&O(ge,ye.current)}),null}function initGlobalTooltip$2(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,pt=$.offsetHeight,ee=window.innerWidth,vt=dt.getBoundingClientRect();let te=vt.left+vt.width/2-_/2;te=Math.max(8,Math.min(te,ee-_-8));let ne=vt.top-pt-8;ne<8&&(ne=vt.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const _stateLabel=$=>$==="1"?"ON":$==="0"?"OFF":$==="2"?"TG":$??"?",_stateColor=$=>$==="1"?"#16a34a":$==="0"?"#dc2626":$==="2"?"#d97706":"#64748b",_parseAction=$=>$?$.split(",").map(k=>{const[st,ct]=k.trim().split(":");return{pin:st==null?void 0:st.trim(),state:ct==null?void 0:ct.trim()}}).filter(k=>k.pin!==void 0&&k.pin!==""):[],ActionBadge=({isUpper:$,isHumid:k,value:st,unit:ct,str:dt})=>{const _=_parseAction(dt),pt=(k?"💧":"")+($?"↑":"↓");return Et`
    <span style="
      display:inline-flex;align-items:center;gap:4px;
      background:${$?"#fff7ed":"#eff6ff"};border:1.5px solid ${$?"#fdba74":"#93c5fd"};
      border-radius:10px;padding:3px 10px;
      font-size:12px;font-weight:600;white-space:nowrap;line-height:1.6;
    ">
      <span style="color:${$?"#9a3412":"#1e3a5f"};margin-right:2px;">
        ${pt} ${st??"—"}${ct}:
      </span>
      ${_.length===0?Et`<span style="color:#94a3b8;">[—]</span>`:Et`
            <span style="color:#475569;">[</span>
            ${_.map(({pin:ne,state:Xt},se)=>Et`
              <span>
                <span style="color:#94a3b8;font-weight:400;">id</span><span style="color:#334155;font-weight:700;">${ne}</span><span style="color:#475569;">:</span><span style="color:${_stateColor(Xt)};font-weight:700;">${_stateLabel(Xt)}</span>${se<_.length-1?Et`<span style="color:#94a3b8;">,${" "}</span>`:""}
              </span>
            `)}
            <span style="color:#475569;">]</span>
          `}
    </span>
  `},HELP_CONTENT={ru:Et`
    <div style="line-height:1.8;font-size:14px;color:#334155;">
      <p style="margin-bottom:12px;font-weight:700;font-size:15px;">OneWire — справка</p>
      <p style="margin-bottom:10px;">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <p style="margin-bottom:10px;">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Каждый сенсор имеет уникальный серийный номер (SN). Кнопка «copy SN» копирует его в буфер обмена.
        Значение <b style="color:#16a34a;">ON</b> — включить пин при достижении порога,
        <b style="color:#dc2626;">OFF</b> — выключить,
        <b style="color:#d97706;">TG</b> — переключить (toggle).
      </p>
    </div>
  `,en:Et`
    <div style="line-height:1.8;font-size:14px;color:#334155;">
      <p style="margin-bottom:12px;font-weight:700;font-size:15px;">OneWire — Help</p>
      <p style="margin-bottom:10px;">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <p style="margin-bottom:10px;">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Each sensor has a unique serial number (SN). The «copy SN» button copies it to the clipboard.
        Value <b style="color:#16a34a;">ON</b> — turn the pin on when the threshold is reached,
        <b style="color:#dc2626;">OFF</b> — turn it off,
        <b style="color:#d97706;">TG</b> — toggle.
      </p>
    </div>
  `},TabOneWire=()=>{const[$,k]=ut([]),[st,ct]=ut(null),[dt,_]=ut(!1),[pt,ee]=ut(null),[vt,te]=ut(null),[ne,Xt]=ut("ru"),[se,re]=ut(null),[ce,ge]=ut(!1),[ye,pe]=ut({}),he=$t=>pe(ht=>({...ht,[$t]:!ht[$t]})),be=$t=>typeof $t=="string"?$t.replace(/[^\x20-\x7E\u0400-\u04FF]/g,""):$t;lt(()=>{initGlobalTooltip$2()},[]);const $e=()=>{console.log("Calling initial refresh..."),fetch("/api/onewire/get").then($t=>$t.json()).then($t=>{console.log("Initial data received:",$t),Xt($t.lang||"ru"),k($t.pins||[]),console.log("Initial OneWire state set:",$t.pins),ct(null)}).catch($t=>{console.error("Error in refresh:",$t),ct($t.message),k([])})},ke=async()=>{try{const ht=await(await fetch("/api/temp/get")).json();k(Yt=>Yt.map(oe=>{if(!oe.sensors||oe.typsensor!==1&&oe.typsensr!==1&&oe.typsensor!==2&&oe.typsensr!==2)return oe;const Zt=oe.sensors.map(ie=>{var ae,fe;if(oe.typsensor===1||oe.typsensr===1){const ve=(ae=ht.ds18b20)==null?void 0:ae.find(mt=>mt.addr===ie.s_number);if(ve)return{...ie,t:ve.temp}}else if(oe.typsensor===2||oe.typsensr===2){const ve=(fe=ht.dht22)==null?void 0:fe.find(mt=>mt.id===oe.id);if(ve)return{...ie,t:ve.temp,humidity:ve.humidity}}return ie});return{...oe,sensors:Zt}}))}catch($t){console.error("Error in updateSensorData:",$t)}};lt(()=>{console.log("Setting up initial data and interval..."),$e();const $t=setInterval(ke,1e3);return()=>{clearInterval($t)}},[]);const _e=()=>{_(!1),ee(null),te(null)},Oe=$t=>{k(ht=>ht.map(Yt=>{var oe;if(Yt.id===$t.oneWireId){const Zt=((oe=Yt.sensors)==null?void 0:oe.map(ie=>ie.s_number===$t.s_number?{...ie,...$t}:ie))||[];return{...Yt,sensors:Zt}}return Yt})),_e()},de=$t=>{te($t),_(!0)},xe=$t=>{k(ht=>ht.map(Yt=>Yt.id===$t.id?{...Yt,onoff:$t.onoff}:Yt))},Ee=$t=>{k(ht=>ht.map(Yt=>Yt.id===$t.id?$t:Yt)),_e()};if(st)return Et`<div>Error fetching sensor data: ${st}</div>`;const we=()=>({lang1Wire:ne==="ru"?rulange1Wire:enlange1Wire}),Te=($t,ht)=>{const Yt=we(),Zt=(Yt[$t]&&Yt[$t][ht]?Yt[$t][ht]:"").split(" "),ie=[];for(let ae=0;ae<Zt.length;ae+=15)ie.push(Zt.slice(ae,ae+15).join(" "));return ie.join("<br>")},me=$t=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Te("lang1Wire",$t.tooltipIndex)}
    >
      ${$t.title}
    </th>
  `,Ce=({device:$t,index:ht})=>{const Yt=!!ye[$t.id],oe=$t.pins||$t.pin,Zt=$t.typsensor||$t.typsensr||0,ie=$t.numdevices||$t.numsens||0,ae=Zt!==0&&ie>0;return Et`
      <tbody key=${"db-"+$t.id}>
        <tr
          class="${ht%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors ${ae?"cursor-pointer":""}"
          onclick=${()=>ae&&he($t.id)}
        >
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$t.id}</td>
          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${oe}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${["None","DS18B20","DHT22"][Zt]}</td>
          <td class="px-6 py-4 text-sm text-slate-700 font-medium">${ie}</td>
          <td class="px-6 py-4" onclick=${fe=>fe.stopPropagation()}>
            <${MyPolzunok}
              value=${$t.onoff||0}
              onChange=${fe=>xe({...$t,onoff:fe})}
            />
          </td>
          <td class="px-6 py-4" onclick=${fe=>fe.stopPropagation()}>
            <button
              class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap"
              onclick=${()=>de($t)}
            >
              Edit
            </button>
            ${ae&&Et`
              <span class="ml-3 text-slate-400 text-xs select-none pointer-events-none">
                ${Yt?"▲":"▼"}
              </span>
            `}
          </td>
        </tr>

        ${Yt&&ae?Et`
          <tr onclick=${fe=>fe.stopPropagation()}>
            <td colspan="6" class="px-4 py-3 bg-gradient-to-r from-cyan-50/80 via-slate-50/60 to-blue-50/80 border-t border-cyan-100/60">
              <div class="w-full">
                <${Se} d=${$t} />
              </div>
            </td>
          </tr>
        `:""}
      </tbody>
    `},Se=({d:$t})=>{const ht=$t.typsensor||$t.typsensr||0,Yt=$t.numdevices||$t.numsens||0;if(ht===0||Yt===0)return Et`
        <div class="px-4 py-2 text-slate-500 font-medium">
          No connected sensors for this OneWire pin.
        </div>
      `;let oe=$t.sensors||[];const Zt=["bg-cyan-50/60 border-cyan-200/50","bg-slate-100/70 border-slate-200/50"],ie=(ae,fe)=>{const ve=ht===2,mt=be(ae.s_number)||"",le=ue=>{if(ue.stopPropagation(),!mt)return;const Ie=ue.currentTarget,Me=Pe=>{Ie.textContent=Pe?"Copied!":"Error",setTimeout(()=>{Ie.textContent="copy SN"},1500)};if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(mt).then(()=>Me(!0)).catch(()=>Me(!1));return}try{const Pe=document.createElement("textarea");Pe.value=mt,Pe.style.cssText="position:fixed;top:-9999px;left:-9999px;opacity:0;",document.body.appendChild(Pe),Pe.focus(),Pe.select();const Ne=document.execCommand("copy");document.body.removeChild(Pe),Me(Ne)}catch{Me(!1)}};return Et`
        <div class="w-full flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3
                    rounded-xl border ${Zt[fe%2]}
                    backdrop-blur-sm shadow-sm hover:shadow-md transition-all">

          <!-- S/N полностью + кнопка копирования -->
          ${ve?Et`<span class="font-mono text-base font-semibold text-teal-700 shrink-0">DHT22</span>`:Et`
                <span class="flex items-center gap-2 shrink-0">
                  <span class="font-mono text-base font-semibold text-slate-500 select-none">SN</span>
                  <span class="font-mono text-base text-slate-700 select-all" title="Serial number">
                    ${mt}
                  </span>
                  <button
                    class="px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-lg
                           transition-all duration-300 transform
                           hover:scale-105 active:scale-95
                           bg-gradient-to-r from-teal-400 to-cyan-500
                           hover:from-teal-500 hover:to-cyan-600
                           hover:shadow-cyan-500/40
                           leading-none shrink-0"
                    onclick=${le}
                    title="Copy S/N to clipboard"
                  >copy SN</button>
                </span>
              `}

          <span class="text-slate-300 select-none text-base">|</span>

          <!-- Текущая температура -->
          <span class="font-bold text-cyan-700 text-base shrink-0"
                title="Current temperature">
            🌡 ${ae.t??"—"}°C
          </span>

          ${ve&&"humidity"in ae?Et`
            <span class="font-bold text-teal-600 text-base shrink-0"
                  title="Current humidity">
              💧 ${ae.humidity}%
            </span>
          `:""}

          <span class="text-slate-300 select-none text-base">|</span>

          <!-- Лимиты температуры в виде читаемых бейджей -->
          <${ActionBadge}
            isUpper=${!0}
            isHumid=${!1}
            value=${ae.ut}
            unit="°C"
            str=${ae.action_ut}
          />
          <${ActionBadge}
            isUpper=${!1}
            isHumid=${!1}
            value=${ae.lt}
            unit="°C"
            str=${ae.action_lt}
          />

          ${ve&&"upphumid"in ae?Et`
            <span class="text-slate-300 select-none text-base">|</span>
            <!-- Лимиты влажности -->
            <${ActionBadge}
              isUpper=${!0}
              isHumid=${!0}
              value=${ae.upphumid}
              unit="%"
              str=${ae.actuphum}
            />
            <${ActionBadge}
              isUpper=${!1}
              isHumid=${!0}
              value=${ae.humlolim}
              unit="%"
              str=${ae.actlowhum}
            />
          `:""}

          ${ae.info?Et`
            <span class="text-slate-300 select-none text-base">|</span>
            <span class="text-sm text-slate-500 italic" title=${ae.info}>
              ${ae.info}
            </span>
          `:""}

          <!-- Edit — прижат вправо -->
          <a
            href="#"
            class="ml-auto text-blue-600 hover:text-blue-800 font-semibold text-sm uppercase tracking-wide bg-white/70 hover:bg-white/95 px-3 py-1 rounded-lg shadow-sm transition-colors shrink-0"
            onclick=${ue=>{ue.preventDefault(),ee({...ae,oneWireId:$t.id,sensorType:ht,pins:$t.pins||$t.pin}),_(!0)}}
          >Edit</a>
        </div>
      `};return oe.length>0&&Object.keys(oe[0]).length>0?Et`<div class="flex flex-col gap-2 w-full">${oe.map((ae,fe)=>ie(ae,fe))}</div>`:Et`
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
                      <${me} title="ID"                tooltipIndex=${1} />
                      <${me} title="Pin"               tooltipIndex=${2} />
                      <${me} title="Selected sensor"   tooltipIndex=${3} />
                      <${me} title="Count of sensors"  tooltipIndex=${4} />
                      <${me} title="On/Off"            tooltipIndex=${5} />
                      <${me} title="Actions"           tooltipIndex=${6} />
                    </tr>
                  </thead>
                  ${$.length>0?$.map(($t,ht)=>Et`<${Ce} device=${$t} index=${ht} key=${$t.id} />`):Et`
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

        <!-- ── Нижняя панель: кнопка Show/Hide Help ── -->
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg
                   transition-all duration-300 transform hover:scale-105 active:scale-95
                   bg-gradient-to-r from-teal-400 to-cyan-500
                   hover:from-teal-500 hover:to-cyan-600
                   hover:shadow-cyan-500/40"
            onclick=${()=>ge(!ce)}
          >
            ${ce?ne==="ru"?"Скрыть справку":"Hide Help":ne==="ru"?"Показать справку":"Show Help"}
          </button>
        </div>
      </div>

      <!-- ── Блок справки (раскрывается/скрывается по кнопке) ── -->
      ${ce&&Et`
        <div class="mt-2 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner w-full">
          ${HELP_CONTENT[ne]||HELP_CONTENT.en}
        </div>
      `}
    </div>

    ${dt&&(pt?Et`
            <${ModalEditSensor}
              typsensor=${pt}
              oneWireId=${pt.oneWireId}
              pins=${pt.pins}
              onClose=${_e}
              onUpdate=${Oe}
              sensorType=${pt.sensorType}
              closeOnOverlayClick=${!0}
              refresh=${$e}
            />
          `:Et`
            <${ModalOneWire}
              oneWire=${vt}
              onClose=${_e}
              onUpdate=${Ee}
              closeOnOverlayClick=${!0}
              refresh=${$e}
            />
          `)}
  `};function ModalSIM800L({hideModal:$,title:k,selectedGps:st,onSave:ct}){const[dt,_]=ut((st==null?void 0:st.tel)||""),[pt,ee]=ut((st==null?void 0:st.info)||""),[vt,te]=ut((st==null?void 0:st.onoff)===1),[ne,Xt]=ut(!0),se=pe=>/^\+\d{11,20}$/.test(pe),ge=Et`
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

          <form onSubmit=${pe=>{if(pe.preventDefault(),!ne)return;const he={tel:dt,info:pt,onoff:vt?1:0};console.log("Сохраняемые данные:",he),fetch("/api/sim800l/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(he)}).then(be=>be.json()).then(be=>{typeof ct=="function"&&ct(he),$()}).catch(be=>{console.error("Error:",be)})}}>
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
                        onInput=${pe=>{const he=pe.target.value;_(he),Xt(se(he))}}
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
                        onInput=${pe=>ee(pe.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${MyPolzunok} value=${vt} onChange=${te} />
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
  `,ye=at(null);return lt(()=>{const pe=document.createElement("div");return pe.id="modal-portal",document.body.appendChild(pe),ye.current=pe,()=>{O(null,pe),document.body.removeChild(pe)}},[]),lt(()=>{ye.current&&O(ge,ye.current)}),null}const ModalSecurity=({modalType:$,page:k,hideModal:st,title:ct,selectedSecurity:dt,onSecurityChange:_,SliderComponent:pt=MyPolzunok})=>{const[ee,vt]=ut((dt==null?void 0:dt.info)||""),[te,ne]=ut((dt==null?void 0:dt.onoff)||0),[Xt,se]=ut((dt==null?void 0:dt.ptype)||0),[re,ce]=ut((dt==null?void 0:dt.send_sms)||""),[ge,ye]=ut((dt==null?void 0:dt.action)||""),[pe,he]=ut([]),[be,$e]=ut({send_sms:null,action:null}),[ke,_e]=ut(null),Oe=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,de=($t,ht)=>!ht||ht.trim()===""||ht.toLowerCase()==="none"?null:$t==="action"?Oe.test(ht)?null:'Incorrect format. Use "None" or "pin:value" format.':ht.length>100?"Text should not exceed 100 characters":null,xe=($t,ht)=>{const Yt=de($t,ht);switch($e(oe=>({...oe,[$t]:Yt})),$t){case"send_sms":ce(ht);break;case"action":ye(ht);break}};lt(()=>{fetch("/api/monitoring/get").then($t=>$t.json()).then($t=>{Array.isArray($t)?he($t.filter(ht=>ht.topin===2)):he([])}).catch($t=>{console.error("Error fetching pin config:",$t),he([])})},[]);const Ee=$t=>{if($t.preventDefault(),Object.values(be).some(Yt=>Yt!==null)){_e("Please correct the errors before submitting.");return}const ht={...dt,info:ee,send_sms:re||"NO",action:ge||"None",onoff:te,ptype:Xt};fetch("/api/monitoring/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ht)}).then(Yt=>{if(!Yt.ok)throw new Error("Network response was not ok");return Yt.json()}).then(Yt=>{if(Yt.error)throw new Error(Yt.error);_(ht),st()}).catch(Yt=>{console.error("Error:",Yt),_e("Failed to save changes. Please try again.")})},we=()=>{se(0),ce(""),ye(""),vt(""),ne(0),$e({send_sms:null,action:null})},Ce=Et`
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
                  value=${pe.some($t=>$t.pins===(dt==null?void 0:dt.setrpins))?dt==null?void 0:dt.setrpins:""}
                  onChange=${$t=>_({...dt,setrpins:$t.target.value})}
                  class="border rounded p-2 w-full"
                >
                  <option value="">Select a connection</option>
                  ${pe.map($t=>Et`
                      <option value=${$t.pins}>
                        ${$t.pins} (ID: ${$t.id})
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
                  onChange=${$t=>se(parseInt($t.target.value))}
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
                  onInput=${$t=>xe("action",$t.target.value)}
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
                  value=${re}
                  onchange=${$t=>xe("send_sms",$t.target.value)}
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
                  onInput=${$t=>vt($t.target.value)}
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
          onClick=${we}
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
      ${ke&&Et`<p class="text-red-500 mt-2">${ke}</p>`}
    </form>
  `}
        </div>
      </div>
    </div>
  `,Se=at(null);return lt(()=>{const $t=document.createElement("div");return $t.id="modal-portal",document.body.appendChild($t),Se.current=$t,()=>{O(null,$t),document.body.removeChild($t)}},[]),lt(()=>{Se.current&&O(Ce,Se.current)}),null};function initGlobalTooltip$1(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,pt=$.offsetHeight,ee=window.innerWidth,vt=dt.getBoundingClientRect();let te=vt.left+vt.width/2-_/2;te=Math.max(8,Math.min(te,ee-_-8));let ne=vt.top-pt-8;ne<8&&(ne=vt.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabSecurity=()=>{const[$,k]=ut({lang:"ru",sim800l:0,onoff:0,tel:"",info:""}),[st,ct]=ut(!1),[dt,_]=ut(!1),[pt,ee]=ut([]),[vt,te]=ut(!1),[ne,Xt]=ut("ru"),[se,re]=ut(!1),[ce,ge]=ut(""),[ye,pe]=ut(null),[he,be]=ut(!1),[$e,ke]=ut("connected"),[_e,Oe]=ut(0);lt(()=>{initGlobalTooltip$1()},[]);const de=()=>ne==="ru"?ruLangsecurity:enLangsecurity,xe=()=>ne==="ru"?ruLangsecuritypins:enLangsecuritypins,Ee=(fe,ve)=>{const le=(fe&&fe[ve]?fe[ve]:"").split(" "),ue=[];for(let Ie=0;Ie<le.length;Ie+=15)ue.push(le.slice(Ie,Ie+15).join(" "));return ue.join("<br>")},we=({title:fe,langArr:ve,tooltipIndex:mt})=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Ee(ve,mt)}
    >
      ${fe}
    </th>
  `,Te=(fe,ve)=>{let mt;return(...le)=>{clearTimeout(mt),mt=setTimeout(()=>fe(...le),ve)}},me=async(fe,ve={},mt=3)=>{try{const le=await fetch(fe,ve);if(!le.ok)throw new Error("Network response was not ok");return ke("connected"),le}catch(le){if(ke("error"),mt>0)return await new Promise(ue=>setTimeout(ue,1e3)),me(fe,ve,mt-1);throw ke("disconnected"),le}},Ce={ru:Et`
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
    `},Se={ru:Et`
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
    `},$t=async()=>{if(!(he||Date.now()-_e<500))try{const ve=await(await me("/api/sim800l/get")).json();k(ve)}catch(fe){console.error("Error fetching SIM800L data:",fe)}},ht=async()=>{if(!(he||Date.now()-_e<500))try{const ve=await(await me("/api/monitoring/get")).json();ee(ve.pins||[])}catch(fe){console.error("Error fetching monitoring data:",fe)}};lt(()=>{fetch("/api/monitoring/get").then(ve=>ve.json()).then(ve=>Xt(ve.lang||"ru")).catch(ve=>console.error("Error fetching initial language:",ve));const fe=setInterval(()=>{$t(),ht()},500);return()=>clearInterval(fe)},[]);const Yt=Te(async fe=>{be(!0);try{await me("/api/sim800l/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(fe)}),k(fe),Oe(Date.now())}catch(ve){console.error("Error updating SIM800L:",ve)}finally{be(!1)}},300),oe=async fe=>{try{const ve=await fetch("/api/monitoring/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(fe)});if(!ve.ok)throw new Error(`HTTP error! status: ${ve.status}`);ee(mt=>mt.map(le=>le.id===fe.id?fe:le)),await ht(),re(!1)}catch(ve){console.error("Error updating security:",ve),alert("Failed to save changes. Please try again."),await ht()}},Zt=fe=>{ee(ve=>ve.map(mt=>mt.id===fe.id?{...mt,...fe}:mt)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:fe.id,onoff:fe.onoff})}).then(ve=>ve.json()).then(ve=>console.log("Response from /api/onoff/set:",ve)).catch(ve=>console.error("Error calling /api/onoff/set:",ve)),ae()},ie=(fe,ve)=>{ge(fe),pe(ve),re(!0)},ae=()=>{re(!1),ge(""),pe(null)};return Et`
    <div class="flex flex-col items-center w-full p-4">
      ${$e!=="connected"&&Et`
        <div class=${`w-full p-2 mb-4 text-white text-center rounded-xl shadow-md backdrop-blur-md 
          ${$e==="error"?"bg-yellow-500/80 border border-yellow-400/50":"bg-red-500/80 border border-red-400/50"}`}>
          ${$e==="error"?"Connection problems. Retrying...":"Connection lost. Check your internet connection."}
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
                  <${we} title="RXD Pin"      langArr=${de()} tooltipIndex=${1} />
                  <${we} title="TXD Pin"      langArr=${de()} tooltipIndex=${2} />
                  <${we} title="Phone Number" langArr=${de()} tooltipIndex=${3} />
                  <${we} title="Info"         langArr=${de()} tooltipIndex=${4} />
                  <${we} title="OnOff"        langArr=${de()} tooltipIndex=${5} />
                  <${we} title="Action"       langArr=${de()} tooltipIndex=${6} />
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
              ${Ce[ne]}
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
                  <${we} title="ID"             langArr=${xe()} tooltipIndex=${1} />
                  <${we} title="Pin"            langArr=${xe()} tooltipIndex=${2} />
                  <${we} title="Type of sensor" langArr=${xe()} tooltipIndex=${3} />
                  <${we} title="Action"         langArr=${xe()} tooltipIndex=${4} />
                  <${we} title="Send SMS"       langArr=${xe()} tooltipIndex=${5} />
                  <${we} title="INFO"           langArr=${xe()} tooltipIndex=${6} />
                  <${we} title="On/Off"         langArr=${xe()} tooltipIndex=${7} />
                  <${we} title="Edit Pin"       langArr=${xe()} tooltipIndex=${8} />
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                ${pt.length>0?pt.map((fe,ve)=>Et`
                      <tr class="${ve%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
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
                            onChange=${mt=>Zt({...fe,onoff:mt})}
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
              onclick=${()=>te(!vt)}
              class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            >
              ${vt?"Hide Help":"Show Help"}
            </button>
          </div>
          ${vt&&Et`
            <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
              ${Se[ne]}
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

        ${se&&Et`
          <${ModalSecurity}
            modalType=${ce}
            page="TabSecurity"
            hideModal=${()=>re(!1)}
            title="Edit Security Settings"
            selectedSecurity=${ye}
            onSecurityChange=${oe}
          />
        `}
      </div>
    </div>
  `};function initGlobalTooltip(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"320px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,pt=$.offsetHeight,ee=window.innerWidth,vt=dt.getBoundingClientRect();let te=vt.left+vt.width/2-_/2;te=Math.max(8,Math.min(te,ee-_-8));let ne=vt.top-pt-8;ne<8&&(ne=vt.bottom+8),$.style.left=te+"px",$.style.top=ne+"px",$.style.opacity="1"})}function ct(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const SETTINGS_TIP_IDX={Login:1,Password:2,"Time zone UTC":3,"IP address":4,"Subnet mask":5,"Default gateway":6,Token:7,Host:8,Port:9,Client:10,User:11,"Password (MQTT)":12,"TX topic":13,"RX topic":14,"HTTPS domain":15,"Private Key":16,"Public Key":17,Longitude:18,Latitude:19,Sunrise:20,Sunset:21,"Day Length":22,"Next full moon":23,Date:24,Time:25},getTip=($,k,st,ct)=>{const dt=k==="ru"?st:ct,_=SETTINGS_TIP_IDX[$];if(!_||!dt||!dt[_])return"";const pt=dt[_].split(" "),ee=[];for(let vt=0;vt<pt.length;vt+=12)ee.push(pt.slice(vt,vt+12).join(" "));return ee.join("<br>")},FieldRow=({label:$,tipLabel:k,index:st,tip:ct,children:dt})=>{const _=st%2===0?"bg-white/80":"bg-sky-200/40";return Et`
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
  `};function Settings({}){const[$,k]=ut({}),[st,ct]=ut(null),[dt,_]=ut(null),[pt,ee]=ut({}),vt=at(null),[te,ne]=ut(null),[Xt,se]=ut(null),[re,ce]=ut(!1),[ge,ye]=ut(!1),[pe,he]=ut(!1),[be,$e]=ut(!1),[ke,_e]=ut(!1),[Oe,de]=ut(!0);lt(()=>{if(initGlobalTooltip(),!document.getElementById("__network_toggle_style")){const mt=document.createElement("style");mt.id="__network_toggle_style",mt.textContent=".network-toggle span { display: none !important; }",document.head.appendChild(mt)}},[]);const xe=mt=>getTip(mt,$.lang||"ru",rulangsettings,enlangsettings),Ee=[{value:"en",label:"English"},{value:"ru",label:"Russian"}],we=[[-12,"(GMT -12:00) Eniwetok, Kwajalein"],[-11,"(GMT -11:00) Midway Island, Samoa"],[-10,"(GMT -10:00) Hawaii"],[-9,"(GMT -9:00) Alaska"],[-8,"(GMT -8:00) Pacific Time (US & Canada)"],[-7,"(GMT -7:00) Mountain Time (US & Canada)"],[-6,"(GMT -6:00) Central Time (US & Canada), Mexico City"],[-5,"(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima"],[-4,"(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz"],[-3.3,"(GMT -3:30) Newfoundland"],[-3,"(GMT -3:00) Brazil, Buenos Aires, Georgetown"],[-2,"(GMT -2:00) Mid-Atlantic"],[-1,"(GMT -1:00) Azores, Cape Verde Islands"],[0,"(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca"],[1,"(GMT +1:00) Brussels, Copenhagen, Madrid, Paris"],[2,"(GMT +2:00) Kaliningrad, South Africa"],[3,"(GMT +3:00) Moscow, St. Petersburg, Baghdad, Riyadh"],[3.3,"(GMT +3:30) Tehran"],[4,"(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi"],[4.3,"(GMT +4:30) Kabul"],[5,"(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"],[5.3,"(GMT +5:30) Bombay, Calcutta, Madras, New Delhi"],[5.45,"(GMT +5:45) Kathmandu"],[6,"(GMT +6:00) Almaty, Dhaka, Colombo"],[7,"(GMT +7:00) Bangkok, Hanoi, Jakarta"],[8,"(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"],[9,"(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"],[9.3,"(GMT +9:30) Adelaide, Darwin"],[10,"(GMT +10:00) Eastern Australia, Guam, Vladivostok"],[11,"(GMT +11:00) Magadan, Solomon Islands, New Caledonia"],[12,"(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"]],Te=/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,me=/^(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)$/,Ce=mt=>{if(!mt)return{date:"",time:""};const le=mt.match(/d:(\d{1,2}\.\d{1,2}\.\d{2})/),ue=mt.match(/t:(\d{2}:\d{2}:\d{2})/);return{date:le?le[1]:"",time:ue?ue[1]:""}},Se=mt=>{if(!/^\d{1,2}\.\d{1,2}\.\d{2}$/.test(mt))return!1;const[ue,Ie,Me]=mt.split(".").map(Number);if(Ie<1||Ie>12||ue<1||ue>31||Me<0||Me>99)return!1;const Pe=new Date().getFullYear()%100;if(Me>Pe+5)return!1;const Ne=new Date(2e3+Me,Ie,0).getDate();return!(ue>Ne)},$t=mt=>/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(mt),ht=(mt,le)=>{const ue=Object.values(le).some(Me=>Me!==null),Ie=mt.usehttps?mt.domain&&mt.domain.trim()!=="":!0;return!(ue||!Ie)},Yt=(mt,le)=>{ne({message:mt,type:le}),setTimeout(()=>{ne(null)},3e3)},oe=mt=>{se(mt),setTimeout(()=>{se(null)},3e3)},Zt=(mt,le)=>{let ue=null;if(!$.usehttps&&["domain","tls_key","tls_cert","tls_ca","telegram_token"].includes(mt))return null;if(!le&&["ip_addr","gateway","mqtt_hst","sb_mask","offdate","offtime","domain"].includes(mt))return"Поле не может быть пустым";switch(mt){case"ip_addr":case"gateway":case"mqtt_hst":Te.test(le)||(ue="Неверный IP-адрес");break;case"sb_mask":me.test(le)||(ue="Неверная маска подсети");break;case"offdate":Se(le)||(ue="Неверный формат даты (д.м.гг)");break;case"offtime":$t(le)||(ue="Неверный формат времени (чч:мм:сс)");break;case"domain":le.length>50?ue="Домен не должен превышать 50 символов":le.match(/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/)||(ue="Неверный формат домена");break;case"tls_key":le&&le.trim()!==""&&(le.length>512?ue="Private Key не должен превышать 512 символов":(!le.includes("BEGIN EC PRIVATE KEY")||!le.includes("END EC PRIVATE KEY"))&&(ue="Неверный формат Private Key"));break;case"tls_cert":le&&le.trim()!==""&&(le.length>1024?ue="Public Key не должен превышать 1024 символов":(!le.includes("BEGIN CERTIFICATE")||!le.includes("END CERTIFICATE"))&&(ue="Неверный формат Public Key"));break;case"tls_ca":le&&le.trim()!==""&&(le.length>1024?ue="Secret Key не должен превышать 1024 символов":(!le.includes("BEGIN CERTIFICATE")||!le.includes("END CERTIFICATE"))&&(ue="Неверный формат Secret Key"));break}return ue},ie=mt=>{mt.preventDefault();const le=new FormData(vt.current);let ue={...$};for(const[Ie,Me]of le.entries())["lon_de","lat_de","timezone","mqtt_prt"].includes(Ie)?ue[Ie]=Me===""||Me===null?0:Number(Me):ue[Ie]=Me;ue.usehttps||["tls_ca","tls_key","tls_cert","telegram_token","domain"].forEach(Ie=>delete ue[Ie]),ue.offdate&&ue.offtime?ue.offldt=`d:${ue.offdate} t:${ue.offtime}`:delete ue.offldt,["lon_de","lat_de","timezone","mqtt_prt"].forEach(Ie=>{(ue[Ie]===null||ue[Ie]==="")&&(ue[Ie]=0)}),ue.onsunrise=ue.onsunrise?1:0,ue.onsunset=ue.onsunset?1:0,ue.check_ip=ue.check_ip?1:0,ue.check_mqtt=ue.check_mqtt?1:0,ue.usehttps=ue.usehttps?1:0,fetch("/api/mysett/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ue)}).then(Ie=>{if(!Ie.ok)throw new Error("Ошибка сети");return Ie.json()}).then(Ie=>{_("success"),ct(Ie),Yt("Данные успешно сохранены","success"),oe("Данные успешно сохранены")}).catch(Ie=>{_("error"),ct(Ie),Yt("Ошибка при сохранении данных","error"),oe("Ошибка при сохранении данных")})},ae=(mt,le)=>{let ue=null;mt==="offdate"?ue=Se(le)?null:"Неверный формат даты (д.м.гг)":mt==="offtime"?ue=$t(le)?null:"Неверный формат времени (чч:мм:сс)":ue=Zt(mt,le),ee(Me=>{const Pe={...Me,[mt]:ue},Ne=["tls_key","tls_cert","tls_ca"],De=Object.keys(Pe).filter(Le=>!Ne.includes(Le)&&Le!=="telegram_token").some(Le=>Pe[Le]!==null);return ce(De||!$.usehttps&&Ne.some(Le=>$[Le])),Pe});let Ie=le;["lon_de","lat_de","timezone","mqtt_prt"].includes(mt)?Ie=le===""||le===null?0:Number(le):["onsunrise","onsunset","check_ip","check_mqtt","usehttps"].includes(mt)&&(Ie=le?1:0),k(Me=>({...Me,[mt]:Ie})),mt==="usehttps"&&(ee({}),ce(!1))},fe=()=>fetch("/api/mysett/get").then(mt=>mt.json()).then(mt=>{if(mt.offldt){const{date:le,time:ue}=Ce(mt.offldt);mt.offdate=le,mt.offtime=ue}return k(mt),mt}).catch(mt=>{console.error("Error fetching settings:",mt),Yt("Ошибка при загрузке настроек","error")});if(lt(()=>{fe().then(mt=>{mt!=null&&mt.tls_key&&ye(!0),mt!=null&&mt.tls_cert&&he(!0),mt!=null&&mt.tls_ca&&$e(!0),mt!=null&&mt.telegram_token&&_e(!0),de(!1)})},[]),lt(()=>{ce(!ht($,pt))},[$,pt]),Oe)return Et`<div>Loading...</div>`;if(!$)return"";const ve=(mt="")=>Et`
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
            onChange=${mt=>ae("lang",mt.target.value)}
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

        <form ref=${vt} onSubmit=${ie} class="w-full max-w-4xl flex flex-col gap-6 relative">

          <div class="flex justify-end w-full">${ve()}</div>

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
              ${[{label:"Login",key:"adm_name",type:"text"},{label:"Password",key:"adm_pswd",type:"password"},{label:"Time zone UTC",key:"timezone",type:"select",options:we}].map((mt,le)=>Et`
                <${FieldRow} label=${mt.label} tip=${xe(mt.tipLabel||mt.label)} index=${le}>
                  <${pageSetting}
                    value=${$[mt.key]}
                    setfn=${ue=>ae(mt.key,ue)}
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
                            <${MyPolzunok} value=${$.check_ip} onChange=${mt=>ae("check_ip",mt)} />
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
                            <${MyPolzunok} value=${$.check_ip} onChange=${mt=>ae("check_ip",mt)} />
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
                  ${[{label:"IP address",key:"ip_addr",type:"text"},{label:"Subnet mask",key:"sb_mask",type:"text"},{label:"Default gateway",key:"gateway",type:"text"}].map((mt,le)=>Et`
                    <${FieldRow} label=${mt.label} tip=${xe(mt.tipLabel||mt.label)} index=${le}>
                      <${pageSetting}
                        value=${$[mt.key]}
                        setfn=${ue=>ae(mt.key,ue)}
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
              <${FieldRow} label="Token" tip=${xe("Token")} index=${0}>
                <${pageSetting}
                  value=${$.token}
                  setfn=${mt=>ae("token",mt)}
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
                          <${MyPolzunok} value=${$.check_mqtt} onChange=${mt=>ae("check_mqtt",mt)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[{label:"Host",key:"mqtt_hst",type:"text"},{label:"Port",key:"mqtt_prt",type:"number"},{label:"Client",key:"mqtt_clt",type:"text"},{label:"User",key:"mqtt_usr",type:"text"},{label:"Password",key:"mqtt_pswd",type:"password",tipLabel:"Password (MQTT)"},{label:"TX topic",key:"txmqttop",type:"text"},{label:"RX topic",key:"rxmqttop",type:"text"}].map((mt,le)=>Et`
                  <${FieldRow} label=${mt.label} tip=${xe(mt.tipLabel||mt.label)} index=${le}>
                    <${pageSetting}
                      value=${$[mt.key]}
                      setfn=${ue=>ae(mt.key,ue)}
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
                          <${MyPolzunok} value=${$.check_mqtt} onChange=${mt=>ae("check_mqtt",mt)} />
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
                          <${MyPolzunok} value=${$.usehttps} onChange=${mt=>ae("usehttps",mt)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[{label:"HTTPS domain",key:"domain",type:"text"},{label:"Private Key",key:"tls_key",type:"textarea"},{label:"Public Key",key:"tls_cert",type:"textarea"}].map((mt,le)=>Et`
                  <tr class="transition-colors border-b border-slate-200 ${le%2===0?"bg-sky-200/40":"bg-white/80"} hover:bg-slate-200/80">
                    <td
                      class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help align-top"
                      data-tip=${xe(mt.label)}
                    >
                      ${mt.label}
                    </td>
                    <td class="w-2/3 pl-4 py-4 pr-6 align-top">
                      <div class="relative w-full">
                        ${mt.type==="textarea"?Et`
                            ${mt.key==="tls_key"&&$.tls_key?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены, но информация скрыта!</div>`:mt.key==="tls_cert"&&$.tls_cert?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены успешно!</div>`:Et`<textarea
                                    name=${mt.key}
                                    value=${$[mt.key]||""}
                                    onInput=${ue=>ae(mt.key,ue.target.value)}
                                    class=${`w-full px-3 py-2 bg-white/50 border ${pt[mt.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                                    rows="1"
                                    placeholder="Enter ${mt.label}"
                                  ></textarea>`}
                          `:Et`
                            <input
                              type="text"
                              name=${mt.key}
                              value=${$[mt.key]||""}
                              onInput=${ue=>ae(mt.key,ue.target.value)}
                              class=${`w-full px-3 py-2 bg-white/50 border ${pt[mt.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                              maxlength="30"
                              placeholder="Enter domain (e.g., zagotovka.ddns.net)"
                            />
                          `}
                        ${$[mt.key]&&mt.key==="tls_cert"&&Et`
                          <div class="absolute right-0 top-0 mt-[3px] mr-[3px] flex gap-2">
                            <button type="button"
                              onClick=${()=>{navigator.clipboard.writeText($[mt.key]),oe("Данные скопированы")}}
                              class="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5"
                            >Копировать</button>
                            <button type="button"
                              onClick=${()=>ae(mt.key,"")}
                              class="px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                            >Очистить</button>
                          </div>
                        `}
                        ${$[mt.key]&&mt.key!=="domain"&&mt.key!=="tls_cert"&&Et`
                          <button type="button"
                            onClick=${()=>ae(mt.key,"")}
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
                          <${MyPolzunok} value=${$.usehttps} onChange=${mt=>ae("usehttps",mt)} />
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
                <${pageSetting} value=${$.lon_de} setfn=${mt=>ae("lon_de",mt)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${pt.lon_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${pt.lon_de} />
              <//>

              <${FieldRow} label="Latitude" tip=${xe("Latitude")} index=${1}>
                <${pageSetting} value=${$.lat_de} setfn=${mt=>ae("lat_de",mt)} type="text"
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
                    <${MyPolzunok} value=${$.onsunrise} onChange=${mt=>ae("onsunrise",mt)} />
                    <input type="text" value=${$.sunrise_pins||""} onInput=${mt=>ae("sunrise_pins",mt.target.value)}
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
                    <${MyPolzunok} value=${$.onsunset} onChange=${mt=>ae("onsunset",mt)} />
                    <input type="text" value=${$.sunset_pins||""} onInput=${mt=>ae("sunset_pins",mt.target.value)}
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
                  <input type="text" name="offdate" value=${$.offdate||""} onInput=${mt=>ae("offdate",mt.target.value)}
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
                  <input type="text" name="offtime" value=${$.offtime||""} onInput=${mt=>ae("offtime",mt.target.value)}
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

          <div class="flex justify-end w-full mb-4">${ve()}</div>

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
  </svg>`;function Header({logout:$,user:k,setShowSidebar:st,showSidebar:ct}){const[dt,_]=ut(new Date),[pt,ee]=ut(null),vt=(se,re)=>new Date(se.year+1900,se.mon,se.mday,se.hour,se.min,se.sec),te=async()=>{try{const re=await(await fetch("/api/stm32-time")).text();let ce;try{ce=JSON.parse(re)}catch{return}ce.status&&ce.time?ee(vt(ce.time,ce.timezone)):ee(null)}catch{ee(null)}};lt(()=>{const se=setInterval(()=>_(new Date),1e3),re=setInterval(te,1e3);return te(),()=>{clearInterval(se),clearInterval(re)}},[]);const ne=se=>se.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric"}),Xt=se=>se.toLocaleTimeString("ru-RU");return Et`
    <div
      class="bg-white/40 backdrop-blur-md border-b border-white/40 shadow-sm sticky top-0 z-[48] w-full py-2 ${ct?"pl-72":""} transition-all duration-300 transform"
    >
      <div class="px-4 w-full py-0 my-0 flex items-center justify-between">
        <button
          type="button"
          onclick=${()=>st(se=>!se)}
          class="text-slate-500 hover:text-teal-500 transition-colors"
        >
          <${Icons.bars3} class="h-6" />
        </button>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600">
            Дата: ${ne(dt)}<span style="margin-left: 8px;"></span
            >Время: ${Xt(dt)}
          </span>
        </div>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600"
            >STM32 дата:
            ${pt?ne(pt):" 00.00.0000"}<span
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
  <//>`}function Chart({data:$}){const k=$.length,st=20,ct=15,dt=100,_=5,pt=10,ee=25,vt=se=>(dt-pt)/_*(se+1),te=se=>(dt-pt)*se/100,ne=se=>dt-pt-te(se),Xt=(se,re,ce)=>Array.from({length:re},(ge,ye)=>ye*1+se);return Et` <div
    class="my-4 divide-y divide-gray-200 overflow-auto rounded bg-white"
  >
    <div class="font-light uppercase flex items-center text-gray-600 px-4 py-2">
      Temperature, last 24h
    <//>
    <div class="relative">
      <svg class="bg-yellow-x50 w-full p-4" viewBox="0 0 ${k*st+ct} ${dt}">
        ${Xt(0,_).map(se=>Et`
            <line
              x1="0"
              y1=${vt(se)}
              x2=${ct+k*st}
              y2=${vt(se)}
              stroke-width="0.3"
              class="stroke-slate-300"
              stroke-dasharray="1,1"
            />
            <text x="0" y=${vt(se)-2} class="text-[6px] fill-slate-400"
              >${ee-ee/_*(se+1)}<//
            >
          `)}
        ${Xt(0,k).map(se=>Et`
            <rect
              x=${ct+se*st}
              y=${ne($[se]*100/ee)}
              width="12"
              height=${te($[se]*100/ee)}
              rx="2"
              class="fill-cyan-500"
            />
            <text x=${ct+se*st} y="100" class="text-[6px] fill-slate-400"
              >${se*2}:00<//
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
  `}function FirmwareUpdate({}){const[$,k]=ut([{},{}]),[st,ct]=ut(null),dt=()=>fetch("api/firmware/status").then(se=>se.json()).then(se=>k(se));lt(dt,[]),lt(()=>{if(st){const se=setTimeout(()=>{ct(null)},3e3);return()=>clearTimeout(se)}},[st]);const _=se=>fetch("api/firmware/commit").then(re=>re.json()).then(dt),pt=se=>fetch("api/reboot",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reboot:1})}).then(re=>re.json()).then(re=>new Promise(ce=>setTimeout(()=>{dt(),ce()},5e3))),ee=se=>fetch("api/firmware/rollback").then(pt),vt=se=>fetch("api/device/eraselast").then(dt),te=function(se){if(!se){ct({type:"yellow",message:"Error: No file selected."});return}const re=se.name.split(".").pop().toLowerCase();if(re!=="bin"&&re!=="hex"){ct({type:"red",message:"Error: Only .bin and .hex files are allowed!"});return}const ce=new FormData;ce.append("file",se),fetch("api/firmware/upload",{method:"POST",body:ce}).then(ge=>{if(!ge.ok)throw new Error(`HTTP error! status: ${ge.status}`);return ge.json()}).then(()=>{ct({type:"green",message:"Firmware uploaded successfully!"}),dt()}).catch(ge=>{ct({type:"yellow",message:`Error: Upload failed. ${ge.message}`})})},ne=({type:se,message:re})=>Et`
      <div
        class=${`fixed top-0 left-0 right-0 z-50 border-b-4 p-4 ${se==="red"?"bg-red-100 border-red-500 text-red-700":se==="yellow"?"bg-yellow-100 border-yellow-500 text-yellow-700":"bg-green-100 border-green-500 text-green-700"}`}
        role="alert"
      >
        <p class="font-bold text-center">${re}</p>
      </div>
    `,Xt=({title:se,onupload:re})=>Et`
      <label
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        ${se}
        <input
          type="file"
          class="hidden"
          accept=".bin,.hex"
          onChange=${ge=>{const ye=ge.target.files[0];ye&&re(ye)}}
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
          <${Xt}
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
            onclick=${vt}
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
  `}const pageSetting=({value:$,setfn:k,type:st,options:ct,error:dt,..._})=>{let pt;const ee=`w-full px-3 py-2 border rounded-md ${dt?"border-red-500":"border-gray-300"}`;switch(st){case"text":case"password":case"number":pt=Et`
        <input
          type=${st}
          value=${$}
          onInput=${vt=>k(vt.target.value)}
          class=${ee}
          ...${_}
        />
      `;break;case"select":pt=Et`
        <select
          value=${$}
          onChange=${vt=>k(vt.target.value)}
          class=${ee}
          ...${_}
        >
          ${ct.map(([vt,te])=>Et` <option value=${vt}>${te}</option> `)}
        </select>
      `;break;case"switch":pt=Et`
        <label class="switch">
          <input
            type="checkbox"
            checked=${$}
            onChange=${vt=>k(vt.target.checked)}
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
  `}const App=function({}){const[$,k]=ut(!0),[st,ct]=ut("/"),[dt,_]=ut(""),[pt,ee]=ut(!0),vt=()=>fetch("api/logout").then(ne=>_("")),te=ne=>ne.ok?ne.json().then(Xt=>_(Xt.user)).finally(Xt=>k(!1)):k(!1)&&_(null);return lt(()=>fetch("api/login").then(te),[]),$?"":dt?Et` <div class="min-h-screen bg-slate-100" id="mains">
    <${Sidebar} url=${st} show=${pt} />
    <${Header}
      logout=${vt}
      user=${dt}
      showSidebar=${pt}
      setShowSidebar=${ee}
    />
    <div
      class="${pt&&"pl-72"} transition-all duration-300 transform"
    >
      <${Qt}
        onChange=${ne=>ct(ne.url)}
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
      loginFn=${te}
      logoIcon=${Logo}
      title="Device Dashboard Login"
      tipText="To login, use: admin/admin, user1/user1, user2/user2"
    />`};window.onload=()=>O(y(App),document.body);
