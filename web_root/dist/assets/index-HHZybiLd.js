(function(){const k=document.createElement("link").relList;if(k&&k.supports&&k.supports("modulepreload"))return;for(const dt of document.querySelectorAll('link[rel="modulepreload"]'))pt(dt);new MutationObserver(dt=>{for(const _ of dt)if(_.type==="childList")for(const ht of _.addedNodes)ht.tagName==="LINK"&&ht.rel==="modulepreload"&&pt(ht)}).observe(document,{childList:!0,subtree:!0});function st(dt){const _={};return dt.integrity&&(_.integrity=dt.integrity),dt.referrerPolicy&&(_.referrerPolicy=dt.referrerPolicy),dt.crossOrigin==="use-credentials"?_.credentials="include":dt.crossOrigin==="anonymous"?_.credentials="omit":_.credentials="same-origin",_}function pt(dt){if(dt.ep)return;dt.ep=!0;const _=st(dt);fetch(dt.href,_)}})();var t,n,e,r,o,u,i,l,c,a,s,f={},p=[],h=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,d=Array.isArray;function v($,k){for(var st in k)$[st]=k[st];return $}function m($){var k=$.parentNode;k&&k.removeChild($)}function y($,k,st){var pt,dt,_,ht={};for(_ in k)_=="key"?pt=k[_]:_=="ref"?dt=k[_]:ht[_]=k[_];if(arguments.length>2&&(ht.children=arguments.length>3?t.call(arguments,2):st),typeof $=="function"&&$.defaultProps!=null)for(_ in $.defaultProps)ht[_]===void 0&&(ht[_]=$.defaultProps[_]);return g($,ht,pt,dt,null)}function g($,k,st,pt,dt){var _={type:$,props:k,key:st,ref:pt,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:dt??++e,__i:-1,__u:0};return dt==null&&n.vnode!=null&&n.vnode(_),_}function b($){return $.children}function C($,k){this.props=$,this.context=k}function x($,k){if(k==null)return $.__?x($.__,$.__i+1):null;for(var st;k<$.__k.length;k++)if((st=$.__k[k])!=null&&st.__e!=null)return st.__e;return typeof $.type=="function"?x($):null}function w($){var k,st;if(($=$.__)!=null&&$.__c!=null){for($.__e=$.__c.base=null,k=0;k<$.__k.length;k++)if((st=$.__k[k])!=null&&st.__e!=null){$.__e=$.__c.base=st.__e;break}return w($)}}function P($){(!$.__d&&($.__d=!0)&&r.push($)&&!U.__r++||o!==n.debounceRendering)&&((o=n.debounceRendering)||u)(U)}function U(){var $,k,st,pt,dt,_,ht,Zt;for(r.sort(i);$=r.shift();)$.__d&&(k=r.length,pt=void 0,_=(dt=(st=$).__v).__e,ht=[],Zt=[],st.__P&&((pt=v({},dt)).__v=dt.__v+1,n.vnode&&n.vnode(pt),M(st.__P,pt,dt,st.__n,st.__P.namespaceURI,32&dt.__u?[_]:null,ht,_??x(dt),!!(32&dt.__u),Zt),pt.__v=dt.__v,pt.__.__k[pt.__i]=pt,L(ht,pt,Zt),pt.__e!=_&&w(pt)),r.length>k&&r.sort(i));U.__r=0}function H($,k,st,pt,dt,_,ht,Zt,mt,Yt,oe){var Xt,ne,le,ce,ve,ye=pt&&pt.__k||p,ue=k.length;for(st.__d=mt,E(st,k,ye),mt=st.__d,Xt=0;Xt<ue;Xt++)(le=st.__k[Xt])!=null&&typeof le!="boolean"&&typeof le!="function"&&(ne=le.__i===-1?f:ye[le.__i]||f,le.__i=Xt,M($,le,ne,dt,_,ht,Zt,mt,Yt,oe),ce=le.__e,le.ref&&ne.ref!=le.ref&&(ne.ref&&F(ne.ref,null,le),oe.push(le.ref,le.__c||ce,le)),ve==null&&ce!=null&&(ve=ce),65536&le.__u||ne.__k===le.__k?(mt&&!mt.isConnected&&(mt=x(ne)),mt=S(le,mt,$)):typeof le.type=="function"&&le.__d!==void 0?mt=le.__d:ce&&(mt=ce.nextSibling),le.__d=void 0,le.__u&=-196609);st.__d=mt,st.__e=ve}function E($,k,st){var pt,dt,_,ht,Zt,mt=k.length,Yt=st.length,oe=Yt,Xt=0;for($.__k=[],pt=0;pt<mt;pt++)ht=pt+Xt,(dt=$.__k[pt]=(dt=k[pt])==null||typeof dt=="boolean"||typeof dt=="function"?null:typeof dt=="string"||typeof dt=="number"||typeof dt=="bigint"||dt.constructor==String?g(null,dt,null,null,null):d(dt)?g(b,{children:dt},null,null,null):dt.constructor===void 0&&dt.__b>0?g(dt.type,dt.props,dt.key,dt.ref?dt.ref:null,dt.__v):dt)!=null?(dt.__=$,dt.__b=$.__b+1,Zt=D(dt,st,ht,oe),dt.__i=Zt,_=null,Zt!==-1&&(oe--,(_=st[Zt])&&(_.__u|=131072)),_==null||_.__v===null?(Zt==-1&&Xt--,typeof dt.type!="function"&&(dt.__u|=65536)):Zt!==ht&&(Zt===ht+1?Xt++:Zt>ht?oe>mt-ht?Xt+=Zt-ht:Xt--:Zt<ht?Zt==ht-1&&(Xt=Zt-ht):Xt=0,Zt!==pt+Xt&&(dt.__u|=65536))):(_=st[ht])&&_.key==null&&_.__e&&(131072&_.__u)==0&&(_.__e==$.__d&&($.__d=x(_)),I(_,_,!1),st[ht]=null,oe--);if(oe)for(pt=0;pt<Yt;pt++)(_=st[pt])!=null&&(131072&_.__u)==0&&(_.__e==$.__d&&($.__d=x(_)),I(_,_))}function S($,k,st){var pt,dt;if(typeof $.type=="function"){for(pt=$.__k,dt=0;pt&&dt<pt.length;dt++)pt[dt]&&(pt[dt].__=$,k=S(pt[dt],k,st));return k}$.__e!=k&&(st.insertBefore($.__e,k||null),k=$.__e);do k=k&&k.nextSibling;while(k!=null&&k.nodeType===8);return k}function A($,k){return k=k||[],$==null||typeof $=="boolean"||(d($)?$.some((function(st){A(st,k)})):k.push($)),k}function D($,k,st,pt){var dt=$.key,_=$.type,ht=st-1,Zt=st+1,mt=k[st];if(mt===null||mt&&dt==mt.key&&_===mt.type&&(131072&mt.__u)==0)return st;if(pt>(mt!=null&&(131072&mt.__u)==0?1:0))for(;ht>=0||Zt<k.length;){if(ht>=0){if((mt=k[ht])&&(131072&mt.__u)==0&&dt==mt.key&&_===mt.type)return ht;ht--}if(Zt<k.length){if((mt=k[Zt])&&(131072&mt.__u)==0&&dt==mt.key&&_===mt.type)return Zt;Zt++}}return-1}function N($,k,st){k[0]==="-"?$.setProperty(k,st??""):$[k]=st==null?"":typeof st!="number"||h.test(k)?st:st+"px"}function R($,k,st,pt,dt){var _;t:if(k==="style")if(typeof st=="string")$.style.cssText=st;else{if(typeof pt=="string"&&($.style.cssText=pt=""),pt)for(k in pt)st&&k in st||N($.style,k,"");if(st)for(k in st)pt&&st[k]===pt[k]||N($.style,k,st[k])}else if(k[0]==="o"&&k[1]==="n")_=k!==(k=k.replace(/(PointerCapture)$|Capture$/i,"$1")),k=k.toLowerCase()in $||k==="onFocusOut"||k==="onFocusIn"?k.toLowerCase().slice(2):k.slice(2),$.l||($.l={}),$.l[k+_]=st,st?pt?st.u=pt.u:(st.u=l,$.addEventListener(k,_?a:c,_)):$.removeEventListener(k,_?a:c,_);else{if(dt=="http://www.w3.org/2000/svg")k=k.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(k!="width"&&k!="height"&&k!="href"&&k!="list"&&k!="form"&&k!="tabIndex"&&k!="download"&&k!="rowSpan"&&k!="colSpan"&&k!="role"&&k in $)try{$[k]=st??"";break t}catch{}typeof st=="function"||(st==null||st===!1&&k[4]!=="-"?$.removeAttribute(k):$.setAttribute(k,st))}}function T($){return function(k){if(this.l){var st=this.l[k.type+$];if(k.t==null)k.t=l++;else if(k.t<st.u)return;return st(n.event?n.event(k):k)}}}function M($,k,st,pt,dt,_,ht,Zt,mt,Yt){var oe,Xt,ne,le,ce,ve,ye,ue,ge,be,ke,Se,Te,Ce,de,xe=k.type;if(k.constructor!==void 0)return null;128&st.__u&&(mt=!!(32&st.__u),_=[Zt=k.__e=st.__e]),(oe=n.__b)&&oe(k);t:if(typeof xe=="function")try{if(ue=k.props,ge=(oe=xe.contextType)&&pt[oe.__c],be=oe?ge?ge.props.value:oe.__:pt,st.__c?ye=(Xt=k.__c=st.__c).__=Xt.__E:("prototype"in xe&&xe.prototype.render?k.__c=Xt=new xe(ue,be):(k.__c=Xt=new C(ue,be),Xt.constructor=xe,Xt.render=V),ge&&ge.sub(Xt),Xt.props=ue,Xt.state||(Xt.state={}),Xt.context=be,Xt.__n=pt,ne=Xt.__d=!0,Xt.__h=[],Xt._sb=[]),Xt.__s==null&&(Xt.__s=Xt.state),xe.getDerivedStateFromProps!=null&&(Xt.__s==Xt.state&&(Xt.__s=v({},Xt.__s)),v(Xt.__s,xe.getDerivedStateFromProps(ue,Xt.__s))),le=Xt.props,ce=Xt.state,Xt.__v=k,ne)xe.getDerivedStateFromProps==null&&Xt.componentWillMount!=null&&Xt.componentWillMount(),Xt.componentDidMount!=null&&Xt.__h.push(Xt.componentDidMount);else{if(xe.getDerivedStateFromProps==null&&ue!==le&&Xt.componentWillReceiveProps!=null&&Xt.componentWillReceiveProps(ue,be),!Xt.__e&&(Xt.shouldComponentUpdate!=null&&Xt.shouldComponentUpdate(ue,Xt.__s,be)===!1||k.__v===st.__v)){for(k.__v!==st.__v&&(Xt.props=ue,Xt.state=Xt.__s,Xt.__d=!1),k.__e=st.__e,k.__k=st.__k,k.__k.forEach((function(ae){ae&&(ae.__=k)})),ke=0;ke<Xt._sb.length;ke++)Xt.__h.push(Xt._sb[ke]);Xt._sb=[],Xt.__h.length&&ht.push(Xt);break t}Xt.componentWillUpdate!=null&&Xt.componentWillUpdate(ue,Xt.__s,be),Xt.componentDidUpdate!=null&&Xt.__h.push((function(){Xt.componentDidUpdate(le,ce,ve)}))}if(Xt.context=be,Xt.props=ue,Xt.__P=$,Xt.__e=!1,Se=n.__r,Te=0,"prototype"in xe&&xe.prototype.render){for(Xt.state=Xt.__s,Xt.__d=!1,Se&&Se(k),oe=Xt.render(Xt.props,Xt.state,Xt.context),Ce=0;Ce<Xt._sb.length;Ce++)Xt.__h.push(Xt._sb[Ce]);Xt._sb=[]}else do Xt.__d=!1,Se&&Se(k),oe=Xt.render(Xt.props,Xt.state,Xt.context),Xt.state=Xt.__s;while(Xt.__d&&++Te<25);Xt.state=Xt.__s,Xt.getChildContext!=null&&(pt=v(v({},pt),Xt.getChildContext())),ne||Xt.getSnapshotBeforeUpdate==null||(ve=Xt.getSnapshotBeforeUpdate(le,ce)),H($,d(de=oe!=null&&oe.type===b&&oe.key==null?oe.props.children:oe)?de:[de],k,st,pt,dt,_,ht,Zt,mt,Yt),Xt.base=k.__e,k.__u&=-161,Xt.__h.length&&ht.push(Xt),ye&&(Xt.__E=Xt.__=null)}catch(ae){k.__v=null,mt||_!=null?(k.__e=Zt,k.__u|=mt?160:32,_[_.indexOf(Zt)]=null):(k.__e=st.__e,k.__k=st.__k),n.__e(ae,k,st)}else _==null&&k.__v===st.__v?(k.__k=st.__k,k.__e=st.__e):k.__e=W(st.__e,k,st,pt,dt,_,ht,mt,Yt);(oe=n.diffed)&&oe(k)}function L($,k,st){k.__d=void 0;for(var pt=0;pt<st.length;pt++)F(st[pt],st[++pt],st[++pt]);n.__c&&n.__c(k,$),$.some((function(dt){try{$=dt.__h,dt.__h=[],$.some((function(_){_.call(dt)}))}catch(_){n.__e(_,dt.__v)}}))}function W($,k,st,pt,dt,_,ht,Zt,mt){var Yt,oe,Xt,ne,le,ce,ve,ye=st.props,ue=k.props,ge=k.type;if(ge==="svg"?dt="http://www.w3.org/2000/svg":ge==="math"?dt="http://www.w3.org/1998/Math/MathML":dt||(dt="http://www.w3.org/1999/xhtml"),_!=null){for(Yt=0;Yt<_.length;Yt++)if((le=_[Yt])&&"setAttribute"in le==!!ge&&(ge?le.localName===ge:le.nodeType===3)){$=le,_[Yt]=null;break}}if($==null){if(ge===null)return document.createTextNode(ue);$=document.createElementNS(dt,ge,ue.is&&ue),_=null,Zt=!1}if(ge===null)ye===ue||Zt&&$.data===ue||($.data=ue);else{if(_=_&&t.call($.childNodes),ye=st.props||f,!Zt&&_!=null)for(ye={},Yt=0;Yt<$.attributes.length;Yt++)ye[(le=$.attributes[Yt]).name]=le.value;for(Yt in ye)if(le=ye[Yt],Yt!="children"){if(Yt=="dangerouslySetInnerHTML")Xt=le;else if(Yt!=="key"&&!(Yt in ue)){if(Yt=="value"&&"defaultValue"in ue||Yt=="checked"&&"defaultChecked"in ue)continue;R($,Yt,null,le,dt)}}for(Yt in ue)le=ue[Yt],Yt=="children"?ne=le:Yt=="dangerouslySetInnerHTML"?oe=le:Yt=="value"?ce=le:Yt=="checked"?ve=le:Yt==="key"||Zt&&typeof le!="function"||ye[Yt]===le||R($,Yt,le,ye[Yt],dt);if(oe)Zt||Xt&&(oe.__html===Xt.__html||oe.__html===$.innerHTML)||($.innerHTML=oe.__html),k.__k=[];else if(Xt&&($.innerHTML=""),H($,d(ne)?ne:[ne],k,st,pt,ge==="foreignObject"?"http://www.w3.org/1999/xhtml":dt,_,ht,_?_[0]:st.__k&&x(st,0),Zt,mt),_!=null)for(Yt=_.length;Yt--;)_[Yt]!=null&&m(_[Yt]);Zt||(Yt="value",ce!==void 0&&(ce!==$[Yt]||ge==="progress"&&!ce||ge==="option"&&ce!==ye[Yt])&&R($,Yt,ce,ye[Yt],dt),Yt="checked",ve!==void 0&&ve!==$[Yt]&&R($,Yt,ve,ye[Yt],dt))}return $}function F($,k,st){try{typeof $=="function"?$(k):$.current=k}catch(pt){n.__e(pt,st)}}function I($,k,st){var pt,dt;if(n.unmount&&n.unmount($),(pt=$.ref)&&(pt.current&&pt.current!==$.__e||F(pt,null,k)),(pt=$.__c)!=null){if(pt.componentWillUnmount)try{pt.componentWillUnmount()}catch(_){n.__e(_,k)}pt.base=pt.__P=null}if(pt=$.__k)for(dt=0;dt<pt.length;dt++)pt[dt]&&I(pt[dt],k,st||typeof $.type!="function");st||$.__e==null||m($.__e),$.__c=$.__=$.__e=$.__d=void 0}function V($,k,st){return this.constructor($,st)}function O($,k,st){var pt,dt,_,ht;n.__&&n.__($,k),dt=(pt=!1)?null:k.__k,_=[],ht=[],M(k,$=k.__k=y(b,null,[$]),dt||f,f,k.namespaceURI,dt?null:k.firstChild?t.call(k.childNodes):null,_,dt?dt.__e:k.firstChild,pt,ht),L(_,$,ht)}function j($,k,st){var pt,dt,_,ht,Zt=v({},$.props);for(_ in $.type&&$.type.defaultProps&&(ht=$.type.defaultProps),k)_=="key"?pt=k[_]:_=="ref"?dt=k[_]:Zt[_]=k[_]===void 0&&ht!==void 0?ht[_]:k[_];return arguments.length>2&&(Zt.children=arguments.length>3?t.call(arguments,2):st),g($.type,Zt,pt||$.key,dt||$.ref,null)}function q($,k){var st={__c:k="__cC"+s++,__:$,Consumer:function(pt,dt){return pt.children(dt)},Provider:function(pt){var dt,_;return this.getChildContext||(dt=[],(_={})[k]=this,this.getChildContext=function(){return _},this.shouldComponentUpdate=function(ht){this.props.value!==ht.value&&dt.some((function(Zt){Zt.__e=!0,P(Zt)}))},this.sub=function(ht){dt.push(ht);var Zt=ht.componentWillUnmount;ht.componentWillUnmount=function(){dt.splice(dt.indexOf(ht),1),Zt&&Zt.call(ht)}}),pt.children}};return st.Provider.__=st.Consumer.contextType=st}t=p.slice,n={__e:function($,k,st,pt){for(var dt,_,ht;k=k.__;)if((dt=k.__c)&&!dt.__)try{if((_=dt.constructor)&&_.getDerivedStateFromError!=null&&(dt.setState(_.getDerivedStateFromError($)),ht=dt.__d),dt.componentDidCatch!=null&&(dt.componentDidCatch($,pt||{}),ht=dt.__d),ht)return dt.__E=dt}catch(Zt){$=Zt}throw $}},e=0,C.prototype.setState=function($,k){var st;st=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=v({},this.state),typeof $=="function"&&($=$(v({},st),this.props)),$&&v(st,$),$!=null&&this.__v&&(k&&this._sb.push(k),P(this))},C.prototype.forceUpdate=function($){this.__v&&(this.__e=!0,$&&this.__h.push($),P(this))},C.prototype.render=b,r=[],u=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=function($,k){return $.__v.__b-k.__v.__b},U.__r=0,l=0,c=T(!1),a=T(!0),s=0;var B,K,z,G,J=0,Q=[],X=[],Y=n,Z=Y.__b,tt=Y.__r,nt=Y.diffed,et=Y.__c,_t=Y.unmount,rt=Y.__;function ot($,k){Y.__h&&Y.__h(K,$,J||k),J=0;var st=K.__H||(K.__H={__:[],__h:[]});return $>=st.__.length&&st.__.push({__V:X}),st.__[$]}function ut($){return J=1,it(wt,$)}function it($,k,st){var pt=ot(B++,2);if(pt.t=$,!pt.__c&&(pt.__=[wt(void 0,k),function(Zt){var mt=pt.__N?pt.__N[0]:pt.__[0],Yt=pt.t(mt,Zt);mt!==Yt&&(pt.__N=[Yt,pt.__[1]],pt.__c.setState({}))}],pt.__c=K,!K.u)){var dt=function(Zt,mt,Yt){if(!pt.__c.__H)return!0;var oe=pt.__c.__H.__.filter((function(ne){return!!ne.__c}));if(oe.every((function(ne){return!ne.__N})))return!_||_.call(this,Zt,mt,Yt);var Xt=!1;return oe.forEach((function(ne){if(ne.__N){var le=ne.__[0];ne.__=ne.__N,ne.__N=void 0,le!==ne.__[0]&&(Xt=!0)}})),!(!Xt&&pt.__c.props===Zt)&&(!_||_.call(this,Zt,mt,Yt))};K.u=!0;var _=K.shouldComponentUpdate,ht=K.componentWillUpdate;K.componentWillUpdate=function(Zt,mt,Yt){if(this.__e){var oe=_;_=void 0,dt(Zt,mt,Yt),_=oe}ht&&ht.call(this,Zt,mt,Yt)},K.shouldComponentUpdate=dt}return pt.__N||pt.__}function lt($,k){var st=ot(B++,3);!Y.__s&&xt(st.__H,k)&&(st.__=$,st.i=k,K.__H.__h.push(st))}function at($){return J=5,ft((function(){return{current:$}}),[])}function ft($,k){var st=ot(B++,7);return xt(st.__H,k)?(st.__V=$(),st.i=k,st.__h=$,st.__V):st.__}function yt(){for(var $;$=Q.shift();)if($.__P&&$.__H)try{$.__H.__h.forEach(bt),$.__H.__h.forEach(Ct),$.__H.__h=[]}catch(k){$.__H.__h=[],Y.__e(k,$.__v)}}Y.__b=function($){K=null,Z&&Z($)},Y.__=function($,k){$&&k.__k&&k.__k.__m&&($.__m=k.__k.__m),rt&&rt($,k)},Y.__r=function($){tt&&tt($),B=0;var k=(K=$.__c).__H;k&&(z===K?(k.__h=[],K.__h=[],k.__.forEach((function(st){st.__N&&(st.__=st.__N),st.__V=X,st.__N=st.i=void 0}))):(k.__h.forEach(bt),k.__h.forEach(Ct),k.__h=[],B=0)),z=K},Y.diffed=function($){nt&&nt($);var k=$.__c;k&&k.__H&&(k.__H.__h.length&&(Q.push(k)!==1&&G===Y.requestAnimationFrame||((G=Y.requestAnimationFrame)||kt)(yt)),k.__H.__.forEach((function(st){st.i&&(st.__H=st.i),st.__V!==X&&(st.__=st.__V),st.i=void 0,st.__V=X}))),z=K=null},Y.__c=function($,k){k.some((function(st){try{st.__h.forEach(bt),st.__h=st.__h.filter((function(pt){return!pt.__||Ct(pt)}))}catch(pt){k.some((function(dt){dt.__h&&(dt.__h=[])})),k=[],Y.__e(pt,st.__v)}})),et&&et($,k)},Y.unmount=function($){_t&&_t($);var k,st=$.__c;st&&st.__H&&(st.__H.__.forEach((function(pt){try{bt(pt)}catch(dt){k=dt}})),st.__H=void 0,k&&Y.__e(k,st.__v))};var gt=typeof requestAnimationFrame=="function";function kt($){var k,st=function(){clearTimeout(pt),gt&&cancelAnimationFrame(k),setTimeout($)},pt=setTimeout(st,100);gt&&(k=requestAnimationFrame(st))}function bt($){var k=K,st=$.__c;typeof st=="function"&&($.__c=void 0,st()),K=k}function Ct($){var k=K;$.__c=$.__(),K=k}function xt($,k){return!$||$.length!==k.length||k.some((function(st,pt){return st!==$[pt]}))}function wt($,k){return typeof k=="function"?k($):k}var Pt=function($,k,st,pt){var dt;k[0]=0;for(var _=1;_<k.length;_++){var ht=k[_++],Zt=k[_]?(k[0]|=ht?1:2,st[k[_++]]):k[++_];ht===3?pt[0]=Zt:ht===4?pt[1]=Object.assign(pt[1]||{},Zt):ht===5?(pt[1]=pt[1]||{})[k[++_]]=Zt:ht===6?pt[1][k[++_]]+=Zt+"":ht?(dt=$.apply(Zt,Pt($,Zt,st,["",null])),pt.push(dt),Zt[0]?k[0]|=2:(k[_-2]=0,k[_]=dt)):pt.push(Zt)}return pt},Ut=new Map;function Ht($){var k=Ut.get(this);return k||(k=new Map,Ut.set(this,k)),(k=Pt(this,k.get($)||(k.set($,k=(function(st){for(var pt,dt,_=1,ht="",Zt="",mt=[0],Yt=function(ne){_===1&&(ne||(ht=ht.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?mt.push(0,ne,ht):_===3&&(ne||ht)?(mt.push(3,ne,ht),_=2):_===2&&ht==="..."&&ne?mt.push(4,ne,0):_===2&&ht&&!ne?mt.push(5,0,!0,ht):_>=5&&((ht||!ne&&_===5)&&(mt.push(_,0,ht,dt),_=6),ne&&(mt.push(_,ne,0,dt),_=6)),ht=""},oe=0;oe<st.length;oe++){oe&&(_===1&&Yt(),Yt(oe));for(var Xt=0;Xt<st[oe].length;Xt++)pt=st[oe][Xt],_===1?pt==="<"?(Yt(),mt=[mt],_=3):ht+=pt:_===4?ht==="--"&&pt===">"?(_=1,ht=""):ht=pt+ht[0]:Zt?pt===Zt?Zt="":ht+=pt:pt==='"'||pt==="'"?Zt=pt:pt===">"?(Yt(),_=1):_&&(pt==="="?(_=5,dt=ht,ht=""):pt==="/"&&(_<5||st[oe][Xt+1]===">")?(Yt(),_===3&&(mt=mt[0]),_=mt,(mt=mt[0]).push(2,0,_),_=0):pt===" "||pt==="	"||pt===`
`||pt==="\r"?(Yt(),_=2):ht+=pt),_===3&&ht==="!--"&&(_=4,mt=mt[0])}return Yt(),mt})($)),k),arguments,[])).length>1?k:k[0]}var Et=Ht.bind(y),St={};function At($,k){for(var st in k)$[st]=k[st];return $}function Dt($,k,st){var pt,dt=/(?:\?([^#]*))?(#.*)?$/,_=$.match(dt),ht={};if(_&&_[1])for(var Zt=_[1].split("&"),mt=0;mt<Zt.length;mt++){var Yt=Zt[mt].split("=");ht[decodeURIComponent(Yt[0])]=decodeURIComponent(Yt.slice(1).join("="))}$=Tt($.replace(dt,"")),k=Tt(k||"");for(var oe=Math.max($.length,k.length),Xt=0;Xt<oe;Xt++)if(k[Xt]&&k[Xt].charAt(0)===":"){var ne=k[Xt].replace(/(^:|[+*?]+$)/g,""),le=(k[Xt].match(/[+*?]+$/)||St)[0]||"",ce=~le.indexOf("+"),ve=~le.indexOf("*"),ye=$[Xt]||"";if(!ye&&!ve&&(le.indexOf("?")<0||ce)){pt=!1;break}if(ht[ne]=decodeURIComponent(ye),ce||ve){ht[ne]=$.slice(Xt).map(decodeURIComponent).join("/");break}}else if(k[Xt]!==$[Xt]){pt=!1;break}return(st.default===!0||pt!==!1)&&ht}function Nt($,k){return $.rank<k.rank?1:$.rank>k.rank?-1:$.index-k.index}function Rt($,k){return $.index=k,$.rank=(function(st){return st.props.default?0:Tt(st.props.path).map(Mt).join("")})($),$.props}function Tt($){return $.replace(/(^\/+|\/+$)/g,"").split("/")}function Mt($){return $.charAt(0)==":"?1+"*+?".indexOf($.charAt($.length-1))||4:5}var Lt={},Wt=[],Ft=[],It=null,Vt={url:jt()},Ot=q(Vt);function jt(){var $;return""+(($=It&&It.location?It.location:It&&It.getCurrentLocation?It.getCurrentLocation():typeof location<"u"?location:Lt).pathname||"")+($.search||"")}function qt($,k){return k===void 0&&(k=!1),typeof $!="string"&&$.url&&(k=$.replace,$=$.url),(function(st){for(var pt=Wt.length;pt--;)if(Wt[pt].canRoute(st))return!0;return!1})($)&&(function(st,pt){pt===void 0&&(pt="push"),It&&It[pt]?It[pt](st):typeof history<"u"&&history[pt+"State"]&&history[pt+"State"](null,null,st)})($,k?"replace":"push"),Bt($)}function Bt($){for(var k=!1,st=0;st<Wt.length;st++)Wt[st].routeTo($)&&(k=!0);return k}function Kt($){if($&&$.getAttribute){var k=$.getAttribute("href"),st=$.getAttribute("target");if(k&&k.match(/^\//g)&&(!st||st.match(/^_?self$/i)))return qt(k)}}function zt($){return $.stopImmediatePropagation&&$.stopImmediatePropagation(),$.stopPropagation&&$.stopPropagation(),$.preventDefault(),!1}function Gt($){if(!($.ctrlKey||$.metaKey||$.altKey||$.shiftKey||$.button)){var k=$.target;do if(k.localName==="a"&&k.getAttribute("href")){if(k.hasAttribute("data-native")||k.hasAttribute("native"))return;if(Kt(k))return zt($)}while(k=k.parentNode)}}var Jt=!1;function Qt($){$.history&&(It=$.history),this.state={url:$.url||jt()}}At(Qt.prototype=new C,{shouldComponentUpdate:function($){return $.static!==!0||$.url!==this.props.url||$.onChange!==this.props.onChange},canRoute:function($){var k=A(this.props.children);return this.g(k,$)!==void 0},routeTo:function($){this.setState({url:$});var k=this.canRoute($);return this.p||this.forceUpdate(),k},componentWillMount:function(){this.p=!0},componentDidMount:function(){var $=this;Jt||(Jt=!0,It||addEventListener("popstate",(function(){Bt(jt())})),addEventListener("click",Gt)),Wt.push(this),It&&(this.u=It.listen((function(k){var st=k.location||k;$.routeTo(""+(st.pathname||"")+(st.search||""))}))),this.p=!1},componentWillUnmount:function(){typeof this.u=="function"&&this.u(),Wt.splice(Wt.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function($,k){$=$.filter(Rt).sort(Nt);for(var st=0;st<$.length;st++){var pt=$[st],dt=Dt(k,pt.props.path,pt.props);if(dt)return[pt,dt]}},render:function($,k){var st,pt,dt=$.onChange,_=k.url,ht=this.c,Zt=this.g(A($.children),_);if(Zt&&(pt=j(Zt[0],At(At({url:_,matches:st=Zt[1]},st),{key:void 0,ref:void 0}))),_!==(ht&&ht.url)){At(Vt,ht=this.c={url:_,previous:ht&&ht.url,current:pt,path:pt?pt.props.path:null,matches:st}),ht.router=this,ht.active=pt?[pt]:[];for(var mt=Ft.length;mt--;)Ft[mt]({});typeof dt=="function"&&dt(ht)}return y(Ot.Provider,{value:ht},pt)}});const switchIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='652.000000pt'%20height='956.000000pt'%20viewBox='0%200%20652.000000%20956.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,956.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M1150%209540%20c-386%20-6%20-408%20-8%20-475%20-29%20-147%20-48%20-255%20-115%20-368%20-226%20-93%20-91%20-145%20-159%20-191%20-250%20-74%20-146%20-77%20-163%20-87%20-455%20-10%20-318%20-14%20-7639%20-4%20-7725%2025%20-214%20107%20-394%20245%20-539%20115%20-121%20227%20-192%20408%20-260%20l72%20-28%202418%20-1%20c2586%20-2%202582%20-2%202716%2047%20254%2092%20492%20346%20573%20611%2017%2058%2018%20211%2018%204095%20l0%204035%20-23%2075%20c-61%20193%20-204%20388%20-368%20501%20-76%2052%20-226%20118%20-294%20129%20-36%206%20-229%2015%20-430%2020%20-398%2010%20-3557%2010%20-4210%200z%20m4610%20-328%20c164%20-59%20291%20-175%20374%20-339%20l36%20-73%200%20-4016%200%20-4016%20-45%20-88%20c-25%20-48%20-70%20-115%20-101%20-148%20-64%20-71%20-175%20-148%20-242%20-168%20-103%20-32%20-400%20-35%20-2687%20-32%20-2180%203%20-2282%204%20-2335%2022%20-204%2068%20-363%20240%20-417%20452%20-17%2065%20-18%20275%20-18%203979%200%203785%201%203912%2019%203980%2024%2091%2084%20207%20140%20271%2055%2062%20182%20152%20244%20171%2027%208%20121%2018%20222%2022%2096%205%201203%208%202460%207%20l2285%20-1%2065%20-23z'/%3e%3cpath%20d='M1434%208128%20l-45%20-41%203%20-3291%20c3%20-3127%204%20-3293%2021%20-3323%209%20-18%2029%20-41%2044%20-50%2026%20-17%20125%20-18%201799%20-18%201918%200%201808%20-3%201834%2054%207%2014%2016%2067%2021%20116%205%2050%209%20789%209%201644%20l0%201554%20249%20981%20c358%201405%20401%201581%20401%201626%200%2051%204%2046%20-414%20468%20l-321%20322%20-1778%200%20-1777%200%20-46%20-42z%20m3636%20-425%20l165%20-168%20-185%20-6%20c-102%20-4%20-770%20-7%20-1485%20-8%20l-1300%20-1%20-145%20148%20c-80%2081%20-156%20159%20-170%20175%20l-23%2027%201489%200%201490%200%20164%20-167z%20m-3078%20-356%20l31%20-38%20-147%20-583%20c-81%20-320%20-153%20-602%20-160%20-626%20-12%20-39%20-13%20-23%20-19%20185%20-9%20291%20-9%20823%200%201123%20l6%20233%20129%20-128%20c71%20-70%20143%20-145%20160%20-166z%20m2900%20-136%20c278%20-3%20510%20-9%20513%20-13%2010%20-10%203%20-40%20-305%20-1260%20l-280%20-1107%200%20-1565%200%20-1566%20-1565%200%20-1565%200%200%201521%200%201520%20310%201226%20c171%20675%20313%201229%20316%201232%2014%2014%201788%2022%202576%2012z'/%3e%3cpath%20d='M3765%206820%20c-61%20-25%20-87%20-94%20-185%20-473%20-80%20-315%20-120%20-493%20-120%20-540%200%20-77%2078%20-141%20163%20-134%2069%206%20101%2040%20131%20141%2057%20190%20197%20746%20212%20843%205%2032%201%2053%20-19%2096%20-22%2048%20-30%2057%20-64%2066%20-44%2013%20-90%2013%20-118%201z'/%3e%3cpath%20d='M3098%203406%20c-104%20-37%20-216%20-134%20-264%20-227%20-24%20-47%20-28%20-71%20-35%20-184%20-19%20-311%20-7%20-500%2037%20-586%2040%20-80%20113%20-151%20201%20-195%20l76%20-39%20151%200%20151%200%2068%2034%20c81%2041%20167%20128%20215%20218%20l32%2061%200%20302%200%20302%20-41%2078%20c-65%20127%20-156%20201%20-284%20235%20-73%2019%20-255%2019%20-307%201z%20m262%20-311%20c58%20-30%2064%20-57%2068%20-301%204%20-219%204%20-222%20-19%20-253%20-65%20-88%20-230%20-95%20-286%20-13%20-16%2024%20-18%2055%20-21%20273%20l-3%20246%2038%2030%20c21%2017%2045%2033%2053%2036%2025%2011%20137%20-1%20170%20-18z'/%3e%3c/g%3e%3c/svg%3e",buttonIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M790%201280%20l0%20-420%2065%200%2065%200%200%20420%200%20420%20-65%200%20-65%200%200%20-420z'/%3e%3cpath%20d='M489%201612%20c-228%20-114%20-386%20-309%20-451%20-557%20-29%20-110%20-29%20-297%200%20-406%2081%20-301%20308%20-530%20607%20-610%20112%20-30%20307%20-30%20420%200%20294%2077%20529%20312%20606%20606%2029%20110%2030%20307%201%20416%20-67%20251%20-245%20462%20-477%20565%20l-55%2024%200%20-74%200%20-74%2072%20-42%20c280%20-167%20411%20-508%20313%20-817%20-35%20-110%20-88%20-196%20-175%20-283%20-87%20-87%20-172%20-139%20-285%20-177%20-70%20-23%20-96%20-27%20-210%20-27%20-114%200%20-140%204%20-210%2027%20-293%2097%20-495%20372%20-495%20673%200%2070%2025%20193%2055%20266%2054%20133%20182%20279%20299%20339%20l66%2034%200%2078%20c0%2042%20-1%2077%20-2%2077%20-2%200%20-37%20-18%20-79%20-38z'/%3e%3c/g%3e%3c/svg%3e",timerIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M818%201670%20c-24%20-15%20-31%20-77%20-23%20-221%208%20-141%2015%20-159%2064%20-159%2050%200%2060%2024%2063%20150%20l3%20115%2030%20-3%20c172%20-19%20366%20-132%20472%20-275%2094%20-129%20133%20-236%20140%20-392%206%20-142%20-12%20-230%20-73%20-355%20-82%20-165%20-236%20-296%20-419%20-357%20-71%20-24%20-95%20-27%20-215%20-27%20-118%200%20-145%203%20-212%2026%20-123%2041%20-204%2092%20-298%20187%20-68%2068%20-94%20103%20-127%20171%20-61%20125%20-76%20203%20-71%20352%206%20153%2036%20243%20122%20371%2064%2095%2068%20127%2021%20149%20-39%2017%20-68%202%20-113%20-59%20-94%20-127%20-150%20-285%20-159%20-449%20-23%20-399%20236%20-749%20632%20-855%20111%20-30%20297%20-30%20410%200%20449%20119%20716%20562%20610%201011%20-23%2095%20-105%20254%20-173%20336%20-111%20131%20-276%20234%20-442%20274%20-89%2021%20-213%2026%20-242%2010z'/%3e%3cpath%20d='M452%201258%20c-7%20-7%20-12%20-17%20-12%20-23%200%20-21%20330%20-469%20358%20-487%2043%20-28%20106%20-23%20143%2010%2043%2038%2052%20113%2020%20154%20-20%2025%20-454%20342%20-484%20354%20-7%202%20-18%20-1%20-25%20-8z'/%3e%3c/g%3e%3c/svg%3e",owIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='110.000000pt'%20height='52.000000pt'%20viewBox='0%200%20110.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M171%20500%20c-50%20-12%20-83%20-41%20-111%20-96%20-22%20-43%20-25%20-62%20-24%20-149%200%20-141%2027%20-199%20109%20-236%2073%20-33%20180%20-16%20227%2037%2067%2076%2074%20284%2013%20376%20-39%2059%20-133%2089%20-214%2068z%20m119%20-65%20c50%20-26%2065%20-67%2065%20-180%200%20-146%20-32%20-195%20-128%20-195%20-40%200%20-54%205%20-77%2028%20-16%2016%20-34%2049%20-40%2073%20-16%2056%20-7%20186%2014%20227%2030%2057%20105%2078%20166%2047z'/%3e%3cpath%20d='M482%20483%20c3%20-10%2029%20-120%2058%20-245%20l54%20-228%2038%200%20c43%200%2035%20-20%2089%20215%2017%2077%2035%20146%2038%20152%204%207%2026%20-73%2051%20-178%20l44%20-190%2039%203%2040%203%2058%20240%20c32%20132%2058%20241%2059%20243%200%202%20-15%202%20-32%200%20l-32%20-3%20-43%20-180%20c-23%20-99%20-44%20-187%20-46%20-195%20-2%20-8%20-25%2074%20-51%20183%20l-48%20198%20-36%20-3%20-36%20-3%20-45%20-194%20c-25%20-106%20-47%20-188%20-49%20-181%20-3%207%20-23%2095%20-46%20194%20l-42%20181%20-33%203%20c-28%203%20-33%201%20-29%20-15z'/%3e%3c/g%3e%3c/svg%3e",encoderIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='34.000000pt'%20height='52.000000pt'%20viewBox='0%200%2034.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M30%20255%20l0%20-245%20150%200%20150%200%200%2030%200%2030%20-115%200%20-115%200%200%2085%200%2085%2095%200%2095%200%200%2030%200%2030%20-95%200%20-95%200%200%2070%200%2070%20115%200%20115%200%200%2030%200%2030%20-150%200%20-150%200%200%20-245z'/%3e%3c/g%3e%3c/svg%3e",Icons={switchIcon:$=>Et`
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
    </svg>`},tipColors={green:"bg-green-100 text-green-900 ring-green-300",yellow:"bg-yellow-100 text-yellow-900 ring-yellow-300"};function Button({title:$,onclick:k,disabled:st,cls:pt,icon:dt,ref:_,colors:ht,hovercolor:Zt,disabledcolor:mt}){const[Yt,oe]=ut(!1),Xt=function(ne){const le=k?k():null;le&&typeof le.catch=="function"&&(oe(!0),le.catch(()=>!1).then(()=>oe(!1)))};return ht||(ht="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400"),Et` <button
    type="button"
    class="inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${ht} ${pt}"
    ref=${_}
    onclick=${Xt}
    disabled=${st||Yt}
  >
    ${$}
    <${Yt?Icons.refresh:dt} class="w-4 ${Yt?"animate-spin":""}" />
  <//>`}function Login({loginFn:$,logoIcon:k,title:st,tipText:pt}){const[dt,_]=ut(""),[ht,Zt]=ut(""),mt=function(Yt){const Xt={Authorization:"Basic "+btoa(dt+":"+ht)};return fetch("api/login",{headers:Xt}).then($).finally(ne=>Zt(""))};return Et` <div
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
          oninput=${Yt=>Zt(Yt.target.value)}
          value=${ht}
          onchange=${mt}
        />
      <//>
      <div class="mt-7">
        <${Button}
          title="Sign In"
          icon=${Icons.logout}
          onclick=${mt}
          cls="flex w-full justify-center"
        />
      <//>
      <div class="mt-5 text-slate-400 text-xs">${pt}<//>
    <//>
  <//>`}function Colored({icon:$,text:k,colors:st}){return st||(st="bg-slate-100 text-slate-900"),Et` <span class="inline-flex items-center gap-1.5 py-0.5">
    ${$&&Et`<${$} class="w-5 h-5" />`}
    <span
      class="inline-block font-medium rounded-md px-2 py-1 text-xs ring-1 ring-inset ${st}"
      >${k}<//
    >
  <//>`}function Stat({title:$,text:k,tipText:st,tipIcon:pt,tipColors:dt,colors:_}){return Et` <div
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
          <${Colored} text=${st} icon=${pt} colors=${dt} />
        <//>
      <//>
    <//>
  <//>`}const ruLangswitch=["","ID - уникальный числовой идентификатор выключателя. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","Device connection - Здесь указаны пины одного или нескольких устройств, с которыми взаимодействует данный выключатель.",'INFO - Укажите название данного выключателя для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение обработчика состояния на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек и соединений выключателя."],ruLangselect=["","ID - уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type(s) of pin(s) - Выберите режим работы данного пина из предложенных вариантов."],rulangbutton=["","ID - уникальный числовой идентификатор кнопки. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","sclick - Выполняемая команда при одинарном клике кнопки.","dclick - Выполняемая команда при двойном клике кнопки.","lpress - Выполняемая команда при удержании кнопки.",'INFO - Укажите название данной кнопки для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение функции кнопки на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек кнопки."],ruencoder=["","ID - уникальный числовой идентификатор энкодера. Присваивается автоматически.","Pin - Уникальный номер пина.","Encoder A (ID) - Основной пин энкодера A (DT).","Encoder B (ID) - Дополнительный пин энкодера B (CLK).","PWM connection - Подключение ШИМ для управления яркостью (диммер).","Dimmer value (0-100) - Текущее значение диммера от 0 до 100.","Duty on restore - Восстановление значения скважности (яркости) при включении контроллера.","INFO - Укажите название данного энкодера для быстрой навигации.","On/Off - Включение или отключение обработчика энкодера.","Action - Кнопка Edit позволяет зайти в меню настроек энкодера.","PWM Frequency - Частота ШИМ управляемого устройства (в герцах).","Resolution (steps) - Максимальное количество шагов от 0 до 100% для ШИМ устройства."],rulangtimers=["","No - Уникальный числовой идентификатор задачи (cron). Присваивается автоматически.","Cron - Сконфигурируйте расписание (cron) для выполнения задачи.","Script - Какое действие (скрипт) должно выполниться в указанное в таймере время.",'Info - Дайте название выбранному таймеру для быстрой навигации, например "Полив газона". Не более 30-ти символов!',"On/Off - Вкл/Откл выполнение данной задачи.","Action - Кнопка Edit позволяет зайти в меню настроек задачи."],rulangsettings=["","Login - Введите имя пользователя для входа в систему. Используется при авторизации в веб-интерфейсе.","Password - Введите пароль для входа в систему. Рекомендуется использовать надёжный пароль.","Time zone UTC - Выберите свой часовой пояс. Влияет на отображение времени и расчёт восхода/заката.","IP address - Введите статический IP-адрес устройства. После перезагрузки STM32 будет доступен по этому адресу. Формат: 192.168.1.100","Subnet mask - Введите маску подсети. Определяет диапазон адресов вашей локальной сети. Формат: 255.255.255.0","Default gateway - Введите IP-адрес шлюза по умолчанию (обычно адрес вашего роутера). Формат: 192.168.1.1","Token - Секретный ключ для авторизации API-запросов. Используется в URL командах управления устройством. Пример: /api/Token/switch?id=1&onoff=1","Host - Введите IP-адрес или доменное имя MQTT-брокера. Пример: 192.168.1.50 или broker.hivemq.com","Port - Укажите порт MQTT-брокера. Стандартный порт: 1883 (без шифрования), 8883 (с TLS).","Client - Уникальный идентификатор клиента MQTT. Каждое устройство должно иметь свой уникальный Client ID.","User - Имя пользователя для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","Password - Пароль для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","TX topic - Исходящий топик MQTT. На этот топик устройство публикует свои данные и события. Пример: Swarm","RX topic - Входящий топик MQTT. С этого топика устройство получает команды управления. Пример: Swarm","HTTPS domain - Доменное имя для HTTPS-соединения. Необходим действующий SSL-сертификат для этого домена. Пример: zagotovka.ddns.net",'Private Key - Закрытый ключ SSL-сертификата в формате PEM. Начинается с "-----BEGIN EC PRIVATE KEY-----". Хранится в зашифрованном виде.','Public Key - Публичный сертификат SSL в формате PEM. Начинается с "-----BEGIN CERTIFICATE-----". Используется для HTTPS-соединения.',"Longitude - Долгота вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 37.618 (Москва)","Latitude - Широта вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 55.751 (Москва)","Sunrise - Время восхода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на восходе.","Sunset - Время захода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на закате.","Day Length - Продолжительность светового дня, рассчитывается автоматически на основе координат и текущей даты.","Next full moon - Дата и время следующего полнолуния, рассчитывается автоматически.","Date - Дата для автономного (offline) режима в формате дд.мм.гг. Используется когда нет доступа к NTP-серверу. Пример: 15.03.25","Time - Время для автономного (offline) режима в формате чч:мм:сс. Используется когда нет доступа к NTP-серверу. Пример: 14:30:00"],ruLangsecurity=["","RXD Pin - Пин приема данных (RX).","TXD Pin - Пин передачи данных (TX).","Phone Number - Номер телефона для отправки SMS и звонков.","Info - Дополнительная информация для быстрой навигации.","OnOff - Включение или отключение модуля SIM800L.","Action - Кнопка Edit позволяет зайти в меню настроек."],ruLangsecuritypins=["","ID - уникальный числовой идентификатор пина. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type of sensor - Тип подключенного сенсора (PIR, Normal open, Normal close).","Action - Действие, выполняемое при срабатывании сенсора.","Send SMS - Отправлять ли SMS при срабатывании сенсора (YES/NO).","INFO - Дополнительная информация для быстрой навигации.","On/Off - Включение или отключение охранного пина.","Edit Pin - Редактирование настроек охранного пина."],rulange1Wire=["","ID - Уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового пина, к которому подключена шина 1-Wire.","Selected sensor - Адрес выбранного и привязанного к этому пину уникального 1-Wire датчика (например, DS18B20).","Count of sensors - Количество найденных 1-Wire температурных датчиков на данном пине.","On/Off - Функция включения или отключения опроса подключенных датчиков на данной шине.","Actions - Кнопка Edit для привязки конкретного датчика к этому соединению."],enLangswitch=["","ID - A unique numerical identifier of the switch. Assigned automatically","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","Device connection - Here will appear one or more devices/relays of pin(s) with which this switch interacts.",'INFO - Give a name of this switch for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the switch state handler on this pin.","Action - The Edit button allows you to access the switch settings menu."],enLangselect=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type(s) of pin(s) - Select the operating mode of this pin from the provided options."],enlangbutton=["","ID - A unique numerical identifier of the button. Assigned automatically.","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","sclick - Command to execute when the button is pressed once.","dclick - Command to execute when the button is pressed twice.","lpress - Command to execute when the button is long pressed.",'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the button function on this pin.","Action - The Edit button allows you to access the button settings menu."],enencoder=["","ID - A unique numerical identifier of the encoder. Assigned automatically.","PIN - The unique number of the pin.","Encoder A (ID) - Main pin of encoder A (DT).","Encoder B (ID) - Additional pin of encoder B (CLK).","PWM connection - PWM connection for brightness control (dimmer).","Dimmer value (0-100) - Current dimmer value from 0 to 100.","Duty on restore - Value of duty cycle (brightness) to restore when the controller is turned on.","INFO - Give a name to this encoder for quick navigation.","On/Off - Enable or disable the encoder handler.","Action - The Edit button allows you to access the encoder settings menu.","PWM Frequency - PWM frequency of the controlled device (in Hertz).","Resolution (steps) - Maximum number of steps from 0 to 100% for the PWM device."],enlangtimers=["","No - A unique numerical identifier of the task (cron). Assigned automatically.","Cron - Configure a schedule (cron) to perform the action.","Script - What action (script) must be performed at the time specified in the timer.",'Info - Give a name to the selected timer for quick navigation, e.g."Lawn Watering", "Backyard Light", etc. No more than 30 characters!',"On/Off - Enable or disable the execution of this task.","Action - The Edit button allows you to access the task settings menu."],enlangsettings=["","Login - Enter the username for logging into the system. Used for web interface authentication.","Password - Enter your password for the system. It is recommended to use a strong password.","Time zone UTC - Select your time zone. Affects time display and sunrise/sunset calculations.","IP address - Enter a static IP address for the device. After reboot, STM32 will be available at this address. Format: 192.168.1.100","Subnet mask - Enter the subnet mask. Defines the range of addresses in your local network. Format: 255.255.255.0","Default gateway - Enter the default gateway IP address (usually your router address). Format: 192.168.1.1","Token - Secret key for API request authorization. Used in device control URL commands. Example: /api/Token/switch?id=1&onoff=1","Host - Enter the IP address or domain name of the MQTT broker. Example: 192.168.1.50 or broker.hivemq.com","Port - Specify the MQTT broker port. Standard port: 1883 (no encryption), 8883 (with TLS).","Client - Unique MQTT client identifier. Each device must have its own unique Client ID.","User - Username for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","Password - Password for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","TX topic - Outgoing MQTT topic. The device publishes its data and events to this topic. Example: Swarm","RX topic - Incoming MQTT topic. The device receives control commands from this topic. Example: Swarm","HTTPS domain - Domain name for HTTPS connection. A valid SSL certificate for this domain is required. Example: zagotovka.ddns.net",'Private Key - SSL certificate private key in PEM format. Starts with "-----BEGIN EC PRIVATE KEY-----". Stored in encrypted form.','Public Key - SSL public certificate in PEM format. Starts with "-----BEGIN CERTIFICATE-----". Used for HTTPS connection.',"Longitude - Longitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 37.618 (Moscow)","Latitude - Latitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 55.751 (Moscow)","Sunrise - Sunrise time is calculated automatically based on your coordinates. The slider enables/disables the action at sunrise.","Sunset - Sunset time is calculated automatically based on your coordinates. The slider enables/disables the action at sunset.","Day Length - Duration of daylight, calculated automatically based on coordinates and current date.","Next full moon - Date and time of the next full moon, calculated automatically.","Date - Date for offline mode in dd.mm.yy format. Used when there is no access to the NTP server. Example: 15.03.25","Time - Time for offline mode in hh:mm:ss format. Used when there is no access to the NTP server. Example: 14:30:00"],enLangsecurity=["","RXD Pin - Receive Data Pin (RX).","TXD Pin - Transmit Data Pin (TX).","Phone Number - Phone number for SMS notifications and calls.","Info - Additional information for quick navigation.","OnOff - Enable or disable the SIM800L module.","Action - The Edit button allows you to access the settings menu."],enLangsecuritypins=["","ID - A unique numerical identifier of the pin. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type of sensor - Type of connected sensor (PIR, Normal open, Normal close).","Action - Action to perform when the sensor is triggered.","Send SMS - Whether to send SMS when the sensor is triggered (YES/NO).","INFO - Additional information for quick navigation.","On/Off - Enable or disable the security pin.","Edit Pin - The Edit button allows you to access the security pin settings."],enlange1Wire=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital pin to which the 1-Wire bus is connected.","Selected sensor - Address of the selected and bound unique 1-Wire sensor to this pin (e.g., DS18B20).","Count of sensors - Number of found 1-Wire temperature sensors on this pin.","On/Off - The function of enabling or disabling polling of connected sensors on this bus.","Actions - The Edit button to bind a specific sensor to this connection."];function initGlobalTooltip$8(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,ht=$.offsetHeight,Zt=window.innerWidth,mt=dt.getBoundingClientRect();let Yt=mt.left+mt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,Zt-_-8));let oe=mt.top-ht-8;oe<8&&(oe=mt.bottom+8),$.style.left=Yt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function pt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&pt()})}function TabSelect({}){const[$,k]=ut(null),[st,pt]=ut({}),[dt,_]=ut(null),[ht,Zt]=ut(!1),[mt,Yt]=ut(3),[oe,Xt]=ut(!1),[ne,le]=ut("ru");lt(()=>{initGlobalTooltip$8()},[]);const ce=de=>{Xt(de)},ve=de=>oe&&(de===1||de===35),ye=()=>fetch("api/select/get").then(de=>de.json()).then(de=>{const xe=de.data||de;k(xe),Xt(de.sim800l===1),de.lang&&le(de.lang);const ae={};xe.forEach(he=>{ae[`topin_${he.id}`]=he.topin.toString()}),pt(ae)});lt(ye,[]),lt(()=>{let de;return ht&&mt>0?de=setTimeout(()=>{Yt(mt-1)},1e3):mt===0&&(Zt(!1),_(null)),()=>clearTimeout(de)},[ht,mt]);const ue=async de=>{de.preventDefault();const xe=new FormData(de.target),ae={lang:ne,sim800l:oe?1:0,data:[]};$.forEach(he=>{const me=xe.get(`topin_${he.id}`);ae.data.push({id:he.id,pins:he.pins,topin:parseInt(me),pwm:he.pwm,i2cdata:he.i2cdata,i2cclok:he.i2cclok})}),_("submitting"),Zt(!0),Yt(3);try{const he=await fetch("api/select/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ae)});if(!he.ok)throw new Error("Network response was not ok");const me=await he.json();_("success"),console.log("Success:",me);const re={};ae.data.forEach(Ee=>{re[`topin_${Ee.id}`]=Ee.topin.toString()}),pt(Ee=>({...Ee,...re})),ye()}catch(he){_("error"),console.error("Error:",he)}},ge=de=>{const{name:xe,value:ae}=de.target;pt(he=>({...he,[xe]:ae}))};if(!$)return"";const be=()=>({langselect:ne==="ru"?ruLangselect:enLangselect}),ke=(de,xe)=>{const ae=be(),me=(ae[de]&&ae[de][xe]?ae[de][xe]:"").split(" "),re=[];for(let Ee=0;Ee<me.length;Ee+=15)re.push(me.slice(Ee,Ee+15).join(" "));return re.join("<br>")},Se=de=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      style=${de.center?"text-align: center":""}
      data-tip=${ke("langselect",de.tooltipIndex)}
    >
      ${de.title}
    </th>
  `,Te=({id:de,value:xe,label:ae,disabled:he=!1,onChange:me,checked:re})=>Et`
    <div class="relative">
      <input
        id="${de}_${xe}"
        class="sr-only peer"
        type="radio"
        name="topin_${de}"
        value="${xe}"
        checked=${re}
        onChange=${me}
        disabled=${he}
        aria-label="${ae}"
      />
      <label
        for="${de}_${xe}"
        class="cursor-pointer px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300 
               ${he?"text-gray-400 cursor-not-allowed opacity-60":"text-slate-700 hover:bg-black/5"}
               peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-cyan-500 peer-checked:text-white peer-checked:shadow-sm"
      >
        ${ae}
      </label>
    </div>
  `,Ce=({d:de})=>Et`
    <tr class="${ve(de.id)?"bg-red-200/50 opacity-50 pointer-events-none":de.id%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-2 text-sm text-slate-800">${de.id}</td>
      <td class="px-6 py-2 text-sm text-slate-800 font-medium">${de.pins}</td>
      <td class="px-2 py-2">
        <div class="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
          <${Te} id=${de.id} value="0"  label="NONE"     checked=${st[`topin_${de.id}`]==="0"}  onChange=${ge} />
          <${Te} id=${de.id} value="3"  label="SWITCH"   checked=${st[`topin_${de.id}`]==="3"}  onChange=${ge} />
          <${Te} id=${de.id} value="1"  label="BUTTON"   checked=${st[`topin_${de.id}`]==="1"}  onChange=${ge} />
          <${Te} id=${de.id} value="2"  label="DEVICE"   checked=${st[`topin_${de.id}`]==="2"}  onChange=${ge} />
          <${Te} id=${de.id} value="4"  label="1-WIRE"   checked=${st[`topin_${de.id}`]==="4"}  onChange=${ge} />
          <${Te} id=${de.id} value="5"  label="PWM"      disabled=${de.pwm==0} checked=${st[`topin_${de.id}`]==="5"}  onChange=${ge} />
          <${Te} id=${de.id} value="8"  label="Enc.OutA" checked=${st[`topin_${de.id}`]==="8"}  onChange=${ge} />
          <${Te} id=${de.id} value="9"  label="Enc.OutB" checked=${st[`topin_${de.id}`]==="9"}  onChange=${ge} />
          <${Te} id=${de.id} value="10" label="Security" disabled=${de.monitoring==0} checked=${st[`topin_${de.id}`]==="10"} onChange=${ge} />
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
              class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${ht?"bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none":"bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"}`}
              disabled=${ht}
            >
              ${ht?`Please wait ${mt} sec.`:"Submit"}
            </button>

            <div class="flex items-center gap-3">
              <span class="text-slate-600 font-bold uppercase tracking-widest text-2xl drop-shadow-sm">SIM800L</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  checked=${oe}
                  onChange=${de=>ce(de.target.checked)}
                />
                <div class="w-[42px] h-[22px] bg-slate-200/80 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300/50 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-400 peer-checked:to-cyan-500 shadow-inner"></div>
              </label>
            </div>
          </div>

          ${dt==="success"&&Et`
            <div class="mb-6 bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
              <strong class="font-bold">Успех! </strong>
              <span class="block sm:inline">Данные успешно сохранены. Идет запись на USB флешку. Кнопка станет активной через ${mt} секунд.</span>
            </div>
          `}
          ${dt==="error"&&Et`
            <div class="mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
              <strong class="font-bold">Ошибка!</strong>
              <span class="block sm:inline">Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз через ${mt} секунд.</span>
            </div>
          `}

          <div class="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner overflow-auto">
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
                  ${$&&$.map(de=>Et`<${Ce} d=${de} />`)}
                </tbody>
              </table>
            </div>
          </div>

          <div class="mt-6 flex justify-start">
            <button
              type="submit"
              class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${ht?"bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none":"bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"}`}
              disabled=${ht}
            >
              ${ht?`Please wait ${mt} sec.`:"Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `}function ModalSwitch({modalType:$,page:k,hideModal:st,closeOnOverlayClick:pt=!0,title:dt,selectedSwitch:_,onSwitchChange:ht,connectionOptions:Zt,SliderComponent:mt=MyPolzunok}){const[Yt,oe]=ut((_==null?void 0:_.info)||""),[Xt,ne]=ut((_==null?void 0:_.onoff)||0),[le,ce]=ut((_==null?void 0:_.ptype)||0),[ve,ye]=ut((_==null?void 0:_.setrpins)||""),[ue,ge]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(re=>{if(!re.ok)throw new Error(`HTTP error! status: ${re.status}`);return re.json()}).then(re=>{if(!re||!re.data||!Array.isArray(re.data)){console.error("Invalid data format:",re),ge([]);return}const Ee=re.data.filter(ee=>ee.topin===2);ge(Ee)}).catch(re=>{console.error("Error fetching pin config:",re),ge([])})},[]);const be=re=>{re.preventDefault();const Ee=new FormData(re.target),ee=Object.fromEntries(Ee);if(ee.id=_.id,ee.pins=_.pins,$==="edit")ee.onoff=Xt;else if($==="connection"){const ie=ue.find(ct=>ct.pins===ee.setrpins);ie&&(ee.pinact={..._.pinact,[ie.id]:ie.pins})}fetch("/api/switch/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ee)}).then(ie=>ie.json()).then(ie=>{console.log("Success:",ie),ht({..._,...ee}),st(),window.location.href="/#/switch"}).catch(ie=>{console.error("Error:",ie)})},ke=re=>{ye(re.target.value)},Se=re=>{ce(parseInt(re.target.value))},Te=re=>{oe(re.target.value)},Ce=re=>{ne(re)},de=re=>{pt&&re.target===re.currentTarget&&st()},xe=()=>{ce(0),oe(""),ne(0)},he=Et`
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
                        value=${ue.some(re=>re.pins===ve)?ve:""}
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
                        value=${le}
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
                        oninput=${Te}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${mt}
                        value=${Xt}
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
  `,me=at(null);return lt(()=>{const re=document.createElement("div");return re.id="modal-portal",document.body.appendChild(re),me.current=re,()=>{O(null,re),document.body.removeChild(re)}},[]),lt(()=>{me.current&&O(he,me.current)}),null}function initGlobalTooltip$7(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block";const _=dt.getBoundingClientRect();$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const ht=$.offsetWidth,Zt=$.offsetHeight,mt=window.innerWidth;let Yt=_.left+_.width/2-ht/2;Yt=Math.max(8,Math.min(Yt,mt-ht-8));let oe=_.top-Zt-8;oe<8&&(oe=_.bottom+8),$.style.left=Yt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function pt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&pt()})}function TabSwitch({}){const[$,k]=ut(null),[st,pt]=ut(null),[dt,_]=ut(!1),[ht,Zt]=ut(null),[mt,Yt]=ut(null),[oe,Xt]=ut(!1),[ne,le]=ut("ru"),[ce,ve]=ut(null),[ye,ue]=ut([]),[ge,be]=ut(""),[ke,Se]=ut(!1);lt(()=>{initGlobalTooltip$7()},[]);const Te=()=>Promise.all([fetch("/api/switch/get").then(te=>te.json()),fetch("/api/pintopin/get").then(te=>te.json())]).then(([te,pe])=>{le(te.lang),ve(te.switches),k(te),ue(pe),be(`Pintopin data: ${JSON.stringify(pe,null,2)}

Switch data: ${JSON.stringify(te.switches,null,2)}`),console.log("Pintopin data:",pe),console.log("Switch data:",te.switches)}).catch(te=>{console.error("Error fetching data:",te),be(`Error fetching data: ${te.message}`)}),Ce=()=>{fetch("/api/switch/get").then(te=>te.json()).then(te=>{ve(te.switches),le(te.lang),console.log("Updated switch data:",te.switches)}).catch(te=>{console.error("Error fetching switch data:",te)})},de=()=>{fetch("/api/pintopin/get").then(te=>te.json()).then(te=>{ue(te),console.log("Updated pintopin data:",te)}).catch(te=>{console.error("Error fetching pintopin data:",te)})};lt(()=>{Ce(),de();const te=setInterval(()=>{Ce(),de()},1e3);return()=>clearInterval(te)},[]);const xe=te=>{const pe=new Map,_e=ce.find($e=>$e.id===te);return _e&&_e.pinact&&Object.entries(_e.pinact).forEach(([$e,we])=>{pe.set($e,{pin:$e,relayId:we})}),ye.forEach($e=>{if($e.idin===te){const we=`${$e.pins}(${$e.idout})`;pe.has(we)||pe.set(we,{pin:$e.pins,relayId:$e.idout})}}),Array.from(pe.values())},ae=()=>({langswitch:ne==="ru"?ruLangswitch:enLangswitch}),he=(te,pe)=>{const _e=ae(),we=(_e[te]&&_e[te][pe]||"").split(" "),Ie=[];let $t="";for(let se=0;se<we.length;se++){const fe=we[se];$t.length+fe.length+1<=200?$t+=($t.length>0?" ":"")+fe:($t.length>0&&Ie.push($t),$t=fe)}return $t.length>0&&Ie.push($t),Ie.join("<br>")},me=(te,pe)=>{console.log("Удаление соединения:",te,pe);const[_e,$e]=pe.split("("),we=$e?parseInt($e):null;fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:te,pin:_e.trim()})}).then(Ie=>Ie.json()).then(Ie=>{pt(Ie),ve($t=>$t.map(se=>{if(se.id===te){const fe={...se.pinact};return delete fe[_e.trim()],{...se,pinact:fe}}return se})),ue($t=>$t.filter(se=>!(se.idin===te&&se.pins===_e.trim()&&(we===null||se.idout===we))))}).then(()=>{console.log("Соединение удалено успешно"),Te()}).catch(Ie=>{console.error("Ошибка при удалении соединения:",Ie)})},re=(te,pe)=>{Zt(te),Yt(pe),_(!0)},Ee=()=>{_(!1),Zt(null),Yt(null)},ee=te=>{console.log("handleSwitchChange:",te),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:te.id,onoff:te.onoff})}).then(pe=>pe.json()).then(pe=>{console.log("Response from /api/onoff/set:",pe)}).catch(pe=>{console.error("Error calling /api/onoff/set:",pe)}),Ee()},ie={ru:Et`
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
    `},ct=te=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${he("langswitch",te.tooltipIndex)}
    >
      ${te.title}
    </th>
  `,vt=({d:te,index:pe})=>{const _e=xe(te.id);return Et`
      <tr class="${pe%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${te.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${te.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][te.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono">
          ${_e.map(({pin:$e,relayId:we})=>Et`
              <span class="mr-2 inline-flex items-center">
                ${$e}${we!==void 0?`(${we})`:""}
                <button
                  onClick=${Ie=>{Ie.preventDefault(),me(te.id,`${$e}(${we})`)}}
                  class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                  title="Remove connection"
                >
                  [x]
                </button>
              </span>
            `)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${te.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${te.onoff}
            onChange=${$e=>ee({...te,onoff:$e})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>re("connection",te)}
            class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
          >
            Connection
          </button>
          <span class="text-slate-300">|</span>
          <button
            onClick=${()=>re("edit",te)}
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
                      <${ct} title="ID" tooltipIndex=${1} />
                      <${ct} title="Pin" tooltipIndex=${2} />
                      <${ct} title="Pullup type" tooltipIndex=${3} />
                      <${ct} title="Device connection" tooltipIndex=${4} />
                      <${ct} title="INFO" tooltipIndex=${5} />
                      <${ct} title="On/Off" tooltipIndex=${6} />
                      <${ct} title="Action" tooltipIndex=${7} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${ce.map((te,pe)=>Et`<${vt} d=${te} index=${pe} key=${te.id} />`)}
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
                  ${ie[ne]}
                </div>
              `}
          </div>
        </div>

        ${dt&&Et`
            <${ModalSwitch}
              modalType=${ht}
              page="TabSwitch"
              hideModal=${Ee}
              title=${ht==="connection"?"Edit Connection":"Edit switch"}
              selectedSwitch=${mt}
              onSwitchChange=${ee}
            />
          `}
      </div>
    </div>
  `:""}const ModalButton=({modalType,page,hideModal,closeOnOverlayClick=!0,title,selectedButton,onButtonChange,SliderComponent=MyPolzunok})=>{const[buttonInfo,setButtonInfo]=ut((selectedButton==null?void 0:selectedButton.info)||""),[onoff,setOnOff]=ut((selectedButton==null?void 0:selectedButton.onoff)||0),[ptype,setPtype]=ut((selectedButton==null?void 0:selectedButton.ptype)||0),[sclick,setSclick]=ut((selectedButton==null?void 0:selectedButton.sclick)||""),[dclick,setDclick]=ut((selectedButton==null?void 0:selectedButton.dclick)||""),[lpress,setLpress]=ut((selectedButton==null?void 0:selectedButton.lpress)||""),[pinOptions,setPinOptions]=ut([]),[errors,setErrors]=ut({sclick:null,dclick:null,lpress:null}),[submitError,setSubmitError]=ut(null),doubleClickLongPressRegex=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,validateInput=$=>!$||$.trim()===""||$.toLowerCase()==="none"||doubleClickLongPressRegex.test($)?null:'Incorrect format. Use "None" or "pin:value" format.',handleInputChange=($,k)=>{const st=validateInput(k);switch(setErrors(pt=>({...pt,[$]:st})),$){case"sclick":setSclick(k);break;case"dclick":setDclick(k);break;case"lpress":setLpress(k);break}};lt(()=>{fetch("/api/select/get").then($=>$.json()).then($=>{Array.isArray($)?setPinOptions($.filter(k=>k.topin===2)):setPinOptions([])}).catch($=>{console.error("Error fetching pin config:",$),setPinOptions([])})},[]);const handleSubmit=$=>{if($.preventDefault(),Object.values(errors).some(st=>st!==null)){setSubmitError("Please correct the errors before submitting.");return}const k={...selectedButton,info:buttonInfo,sclick:sclick||"None",dclick:dclick||"None",lpress:lpress||"None",onoff,ptype};fetch("/api/button/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(k)}).then(st=>st.json()).then(st=>{onButtonChange(k),hideModal()}).catch(st=>{console.error("Error:",st),setSubmitError("Failed to save changes. Please try again.")})},handleResetPin=()=>{setPtype(0),setSclick(""),setDclick(""),setLpress(""),setButtonInfo(""),setOnOff(0),setErrors({sclick:null,dclick:null,lpress:null})},renderConnectionModal=()=>Et`
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
  `,portalRef=at(null);return lt(()=>{const $=document.createElement("div");return $.id="modal-portal",document.body.appendChild($),portalRef.current=$,()=>{O(null,$),document.body.removeChild($)}},[]),lt(()=>{portalRef.current&&O(modalContent,portalRef.current)}),null};function initGlobalTooltip$6(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,ht=$.offsetHeight,Zt=window.innerWidth,mt=dt.getBoundingClientRect();let Yt=mt.left+mt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,Zt-_-8));let oe=mt.top-ht-8;oe<8&&(oe=mt.bottom+8),$.style.left=Yt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function pt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&pt()})}const TabButton=()=>{const[$,k]=ut(null),[st,pt]=ut([]),[dt,_]=ut(null),[ht,Zt]=ut(null),[mt,Yt]=ut(!1),[oe,Xt]=ut(null),[ne,le]=ut(null),[ce,ve]=ut(!1),[ye,ue]=ut("ru"),[ge,be]=ut(""),[ke,Se]=ut(!0);lt(()=>{initGlobalTooltip$6()},[]);const Te={ru:Et`
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
    `},Ce=()=>{fetch("/api/button/get").then(ct=>ct.json()).then(ct=>{_(ct.buttons),ue(ct.lang),console.log("Updated button data:",ct.buttons)}).catch(ct=>{console.error("Error fetching button data:",ct)})};lt(()=>{Ce();let ct;return ke&&(ct=setInterval(()=>{Ce()},1e3)),()=>{ct&&clearInterval(ct)}},[ke]);const de=ct=>{const vt=new Map,te=dt.find(pe=>pe.id===ct);return te&&te.pinact&&Object.entries(te.pinact).forEach(([pe,_e])=>{vt.set(pe,{pin:pe,relayId:_e})}),st.forEach(pe=>{if(pe.idin===ct){const _e=`${pe.pins}(${pe.idout})`;vt.has(_e)||vt.set(_e,{pin:pe.pins,relayId:pe.idout})}}),Array.from(vt.values())},xe=()=>({langbutton:ye==="ru"?rulangbutton:enlangbutton}),ae=(ct,vt)=>{const te=xe(),pe=te[ct]&&te[ct][vt]?te[ct][vt]:"";return he(pe)},he=(ct,vt=100)=>{if(!ct||typeof ct!="string")return"";const te=[];let pe="";const _e=ct.split(`
`);return _e.forEach(($e,we)=>{$e.split(" ").filter($t=>$t.length>0).forEach($t=>{const se=pe.length===0?$t:" "+$t;pe.length+se.length<=vt?pe+=se:(pe.length>0&&te.push(pe),pe=$t)}),pe.length>0&&(te.push(pe),pe=""),we<_e.length-1&&te.push("")}),pe.length>0&&te.push(pe),te.join(`
`)},me=(ct,vt)=>{Xt(ct),le(vt),Yt(!0),Se(!1)},re=()=>{Yt(!1),Xt(null),le(null),Se(!0)},Ee=ct=>{console.log("handleButtonChange:",ct),_(vt=>vt.map(te=>te.id===ct.id?{...te,...ct}:te)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ct.id,onoff:ct.onoff})}).then(vt=>vt.json()).then(vt=>{console.log("Response from /api/onoff/set:",vt)}).catch(vt=>{console.error("Error calling /api/onoff/set:",vt)}),re()},ee=ct=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${ae("langbutton",ct.tooltipIndex)}
    >
      ${ct.title}
    </th>
  `,ie=({d:ct,index:vt})=>(de(ct.id),Et`
      <tr class="${vt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${ct.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${ct.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][ct.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${he(ct.sclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${he(ct.dclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${he(ct.lpress)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${ct.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${ct.onoff}
            onChange=${te=>Ee({...ct,onoff:te})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>me("edit",ct)}
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
                  <tbody class="divide-y divide-white/40">
                    ${dt.map((ct,vt)=>Et`<${ie} d=${ct} index=${vt} key=${ct.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>ve(!ce)}
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

    ${mt&&Et`
        <${ModalButton}
          modalType=${oe}
          page="TabButton"
          hideModal=${re}
          title=${oe==="connection"?"Edit Connection":"Edit Button pin"}
          selectedButton=${ne}
          onButtonChange=${Ee}
        />
      `}
  `:""};function ModalEncoder({modalType:$,page:k,hideModal:st,closeOnOverlayClick:pt=!0,title:dt,selectedEncoder:_,handleEncoderChange:ht,connectionOptions:Zt,SliderComponent:mt=MyPolzunok}){const[Yt,oe]=ut((_==null?void 0:_.info)||""),[Xt,ne]=ut((_==null?void 0:_.onoff)===1),[le,ce]=ut({pin:(_==null?void 0:_.encdrbpin)||"",id:(_==null?void 0:_.encoderb)||""}),[ve,ye]=ut(Object.entries(_.pinact||{})[0]||["",""]),[ue,ge]=ut([]),[be,ke]=ut([]),[Se,Te]=ut([]),Ce=_.pwmmax||100,[de,xe]=ut(_.dvalue||0),[ae,he]=ut(_.ponr||0),[me,re]=ut(_.pwm||1e7),Ee=se=>Math.round(se*Ce/100);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(se=>{if(!se.ok)throw new Error(`HTTP error! status: ${se.status}`);return se.json()}).then(se=>{if(!se||!se.data||!Array.isArray(se.data)){console.error("Invalid data format:",se),ge([]),ke([]),Te([]);return}const fe=se.data.filter(Me=>Me.topin===2),Oe=se.data.filter(Me=>Me.topin===9),Pe=se.data.filter(Me=>Me.topin===5);if(ge(fe),ke(Oe),Te(Pe),_.encoderb||_.encdrbpin){const Me=Oe.find(Ne=>String(Ne.id)===String(_.encoderb)||Ne.pins===_.encdrbpin);ce({pin:Me?Me.pins:"",id:Me?Me.id:""})}}).catch(se=>{console.error("Error fetching pin config:",se),ge([]),ke([]),Te([])})},[_]);const ee=se=>{if(se.preventDefault(),!(se.target instanceof HTMLFormElement))return;let Oe={};if($==="edit")Oe={topin:8,id:_.id,pins:_.pins,pwm:parseInt(me),pwmmax:_.pwmmax,dvalue:parseInt(de),ponr:parseInt(ae),info:Yt,onoff:Xt?1:0};else if($==="connection"){const Me=ve&&ve[0]&&ve[1]!==void 0?{[ve[0]]:parseInt(ve[1])}:{};Oe={id:_.id,pins:_.pins,pwm:parseInt(me)},le&&le.id!==void 0&&le.id!==""?(Oe.encoderb=parseInt(le.id),Oe.encdrbpin=le.pin):(Oe.encoderb=255,Oe.encdrbpin=""),Oe.pinact=Me}console.log("Sending JSON to STM32:",JSON.stringify(Oe)),fetch("/api/encoder/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Oe)}).then(Pe=>Pe.json()).then(Pe=>{ht({..._,...Oe}),st()}).catch(Pe=>console.error("Error saving encoder:",Pe))},ie=se=>{oe(se.target.value)},ct=se=>{ne(se)},vt=se=>{const fe=be.find(Oe=>Oe.pins===se.target.value);ce({pin:se.target.value,id:fe?fe.id:""})},te=se=>{if(!se.target.value)ye(["",""]);else{const fe=se.target.value.split("|");ye([fe[0],fe[1]])}},pe=se=>{xe(se.target.value)},_e=se=>{he(se.target.value)},$e=se=>{const fe=se/1e3;return fe<=4e4?{cls:"text-green-600",msg:"Optimal range"}:fe<=2e5?{cls:"text-yellow-600",msg:"Precision might drop"}:{cls:"text-red-600",msg:"Expert mode: low precision"}},Ie=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick=${se=>pt&&se.target===se.currentTarget&&st()}
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
          <form onsubmit=${ee}>
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
                        value=${be.some(se=>se.pins===le.pin)?le.pin:""}
                        onchange=${vt}
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
                        value=${Se.some(se=>String(se.pins)===String(ve[0]))?`${ve[0]}|${ve[1]}`:""}
                        onchange=${te}
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
          <form onsubmit=${ee}>
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
                        value=${me}
                        oninput=${se=>re(se.target.value)} 
                        class="border rounded p-2 w-full font-mono" 
                        placeholder="50 - 2000000000"
                      />
                      <div class="text-xs ${$e(me).cls}">
                        ${$e(me).msg}
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
                        oninput=${pe}
                        class="border rounded p-2 w-full"
                      />
                      <div class="text-xs text-gray-500">
                        ${de}% = ${Ee(parseInt(de)||0)} / ${Ce} steps
                      </div>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Duty on restore</td>
                    <td class="p-2">
                      <select
                        value=${ae}
                        onchange=${_e}
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
                        oninput=${ie}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${mt}
                        value=${Xt}
                        onChange=${ct}
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
  `,$t=at(null);return lt(()=>{const se=document.createElement("div");return se.id="encoder-modal-portal",document.body.appendChild(se),$t.current=se,()=>{O(null,se),document.body.removeChild(se)}},[]),lt(()=>{$t.current&&O(Ie,$t.current)}),null}function initGlobalTooltip$5(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,ht=$.offsetHeight,Zt=window.innerWidth,mt=dt.getBoundingClientRect();let Yt=mt.left+mt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,Zt-_-8));let oe=mt.top-ht-8;oe<8&&(oe=mt.bottom+8),$.style.left=Yt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function pt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&pt()})}function TabEncoder({}){{const[$,k]=ut(null),[st,pt]=ut(null),[dt,_]=ut(!1),[ht,Zt]=ut(null),[mt,Yt]=ut(null),[oe,Xt]=ut(!1),[ne,le]=ut("ru"),[ce,ve]=ut([]),ye=at(!1);lt(()=>{initGlobalTooltip$5()},[]);const ue=()=>Promise.all([fetch("/api/encoder/get").then(ct=>ct.json()),fetch("/api/pintopin/get").then(ct=>ct.json())]).then(([ct,vt])=>{le(ct.lang),k(ct.encoders),ve(vt),console.log("Encoder data:",ct.encoders),console.log("Pintopin data:",vt)}).catch(ct=>{console.error("Error fetching data:",ct)}),ge=()=>{fetch("/api/encoder/get").then(ct=>ct.json()).then(ct=>{if(ye.current){console.log("Polling skip: onoff request in flight");return}k(ct.encoders),le(ct.lang),console.log("Updated encoder data:",ct.encoders)}).catch(ct=>{console.error("Error fetching encoder data:",ct)})},be=()=>{fetch("/api/pintopin/get").then(ct=>ct.json()).then(ct=>{ve(ct),console.log("Updated pintopin data:",ct)}).catch(ct=>{console.error("Error fetching pintopin data:",ct)})};lt(()=>{ge(),be();const ct=setInterval(()=>{ge(),be()},500);return()=>clearInterval(ct)},[]);const ke=ct=>{k(vt=>vt.map(te=>te.id===ct.id?ct:te)),ye.current=!0,fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ct.id,onoff:ct.onoff})}).then(vt=>vt.json()).then(vt=>{console.log("Response from /api/onoff/set (Encoder):",vt)}).catch(vt=>{console.error("Error calling /api/onoff/set (Encoder):",vt)}).finally(()=>{ye.current=!1})},Se=ct=>{const vt=$.find(pe=>pe.id===ct),te=[];return vt&&vt.pinact&&Object.entries(vt.pinact).forEach(([pe,_e])=>{te.push({pin:pe,idout:_e})}),te},Te=ct=>{const vt=ct/1e3;return vt<=4e4?{cls:"text-green-600",msg:"✓"}:vt<=2e5?{cls:"text-yellow-600",msg:"~"}:{cls:"text-red-600",msg:"!"}},Ce=ct=>{if(!ct)return"—";const vt=ct/1e3;return vt>=1e6?`${(vt/1e6).toFixed(2)} MHz`:vt>=1e3?`${(vt/1e3).toFixed(1)} kHz`:`${vt} Hz`},de=()=>({langbutton:ne==="ru"?ruencoder:enencoder}),xe=(ct,vt)=>{const te=de(),pe=te[ct]&&te[ct][vt]?te[ct][vt]:"";return ae(pe)},ae=(ct,vt=50)=>{if(!ct||typeof ct!="string")return"";const te=ct.split(" ");let pe=[],_e="";for(let $e=0;$e<te.length;$e++)_e.length+te[$e].length+1<=vt?_e+=`${_e?" ":""}${te[$e]}`:(_e&&pe.push(_e.trim()),_e=te[$e]);return _e&&pe.push(_e.trim()),pe.join(`
`)},he=(ct,vt)=>{console.log("Deleting connection:",ct,vt);const te=vt.split("(")[0].trim();fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ct,pin:te})}).then(pe=>pe.ok?pe.json():pe.text().then(_e=>{throw new Error(`HTTP error! status: ${pe.status}, message: ${_e}`)})).then(pe=>{pt(pe),k(_e=>_e.map($e=>{if($e.id===ct){const we={...$e.pinact};return delete we[te],{...$e,pinact:we}}return $e})),ve(_e=>_e.filter($e=>!($e.idin===ct&&$e.pins===te)))}).then(()=>{console.log("Connection deleted successfully"),ue()}).catch(pe=>{console.error("Error deleting connection:",pe)})},me=(ct,vt)=>{console.log("Opening modal:",ct,vt),Zt(ct),Yt(vt),_(!0)},re=()=>{_(!1),Zt(null),Yt(null)},Ee={ru:Et`
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
      `},ee=({title:ct,tooltipIndex:vt})=>Et`
      <th
        class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
        data-tip=${xe("langbutton",vt)}
      >
        ${ct}
      </th>
    `,ie=({d:ct,index:vt})=>{const te=Se(ct.id),pe=Te(ct.pwm||0);return Et`
        <tr class="${vt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
          <td class="px-6 py-2 text-sm text-slate-800 font-medium">${ct.pins}(${ct.id})</td>
          <td class="px-6 py-2 text-sm text-slate-700">
            ${ct.encdrbpin?`${ct.encdrbpin}(${ct.encoderb})`:"Not set"}
          </td>
          <td class="px-6 py-2 text-sm text-slate-700 font-mono">
            ${te.length>0?te.map(({pin:_e,idout:$e})=>Et`
                    <span class="mr-2 inline-flex items-center">
                      ${_e}(${$e})
                      <button
                        onClick=${we=>{we.preventDefault(),he(ct.id,`${_e}(${$e})`)}}
                        class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                        title="Remove connection"
                      >
                        [x]
                      </button>
                    </span>
                  `):"Not set"}
          </td>
          <td class="px-6 py-2 text-sm">
            <span class="font-mono text-slate-700">${Ce(ct.pwm)}</span>
            <span class="ml-1 font-bold ${pe.cls}">${pe.msg}</span>
          </td>
          <td class="px-6 py-2 font-mono text-sm text-blue-600">
            ${ct.pwmmax?`${ct.pwmmax} steps`:"—"}
          </td>
          <td class="px-6 py-2 text-sm text-slate-800">${ct.dvalue}</td>
          <td class="px-6 py-2 text-sm text-slate-700 font-semibold">${ct.ponr===1?"ON":"OFF"}</td>
          <td class="px-6 py-2 text-sm text-slate-600">${ct.info}</td>
          <td class="px-6 py-2">
            <${MyPolzunok}
              value=${ct.onoff}
              onChange=${_e=>ke({...ct,onoff:_e})}
            />
          </td>
          <td class="px-6 py-2 text-sm whitespace-nowrap">
            <button
              onClick=${()=>me("connection",ct)}
              class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
            >
              Connection
            </button>
            <span class="text-slate-300">|</span>
            <button
              onClick=${()=>me("edit",ct)}
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
                      ${$.map((ct,vt)=>Et`<${ie} d=${ct} index=${vt} key=${ct.id} />`)}
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
                    ${Ee[ne]}
                  </div>
                `}
            </div>
          </div>
          ${dt&&Et`
              <${ModalEncoder}
                modalType=${ht}
                page="TabEncoder"
                hideModal=${re}
                title=${ht==="connection"?"Edit Connection":"Edit Encoder"}
                selectedEncoder=${mt}
                handleEncoderChange=${ke}
              />
            `}
        </div>
      </div>
    `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">Loading...</div>`}}function ModalCron({modalType:$,page:k,hideModal:st,closeOnOverlayClick:pt=!0,title:dt,selectedCron:_,handleCronChange:ht,connectionOptions:Zt,modalClass:mt,SliderComponent:Yt=MyPolzunok}){const[oe,Xt]=ut((_==null?void 0:_.info)||""),[ne,le]=ut((_==null?void 0:_.onoff)===1),[ce,ve]=ut((_==null?void 0:_.activ)||""),[ye,ue]=ut((_==null?void 0:_.cron)||""),[ge,be]=ut(_.setrpins||""),ke=me=>{me.preventDefault();const re=new FormData(me.target),Ee=Object.fromEntries(re);Ee.id=_.id,Ee.pins=_.pins,$==="edit"?(Ee.onoff=ne?1:0,Ee.info=oe,Ee.cron=ye,Ee.activ=ce):$==="connection"&&(Ee.setrpins=ge),console.log("Data being sent to server:"),console.log(Ee),console.log("Stringified data:"),console.log(JSON.stringify(Ee)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Ee)}).then(ee=>ee.json()).then(ee=>{console.log("Success:",ee),ht({..._,...Ee}),st(),window.location.href="/#/cron"}).catch(ee=>{console.error("Error:",ee)})};lt(()=>{Xt((_==null?void 0:_.info)||""),be((_==null?void 0:_.setrpins)||""),le((_==null?void 0:_.onoff)===1)},[_]);const Se=me=>{ue(me.target.value)},Te=me=>{Xt(me.target.value)},Ce=me=>{le(me)},de=me=>{ve(me.target.value)},xe=()=>{if(k==="TabCron"&&$==="edit")return Et`
          <form onsubmit=${ke}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  ${[{label:"ID",value:_.id},{label:"Cron",value:Et`
                        <input
                          type="text"
                          value=${ye}
                          onInput=${Se}
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
                          value=${oe}
                          onInput=${Te}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"On/Off",value:Et`<${Yt}
                        value=${ne}
                        onChange=${Ce}
                      />`}].map((me,re)=>Et`
                      <tr
                        class="${re%2===1?"bg-white":"bg-gray-200"}"
                      >
                        <td class="p-2 font-bold">${me.label}</td>
                        <td class="p-2">${me.value}</td>
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
        `},ae=Et`
    <div class=${`modal ${mt||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${me=>pt&&me.target===me.currentTarget&&st()}
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
  `,he=at(null);return lt(()=>{const me=document.createElement("div");return me.id="modal-portal",document.body.appendChild(me),he.current=me,()=>{O(null,me),document.body.removeChild(me)}},[]),lt(()=>{he.current&&O(ae,he.current)}),null}function ModalPwmCron({modalType:$,page:k,hideModal:st,closeOnOverlayClick:pt=!0,title:dt,selectedCron:_,handleCronChange:ht,modalClass:Zt,SliderComponent:mt=MyPolzunok}){let Yt="",oe="900",Xt="0",ne="100";if(_!=null&&_.activ&&_.activ.startsWith("pwm:")){const ct=_.activ.substring(4).split(",");ct.length===4&&(Yt=ct[0],oe=ct[1],Xt=ct[2],ne=ct[3])}const[le,ce]=ut((_==null?void 0:_.info)||""),[ve,ye]=ut((_==null?void 0:_.onoff)===1),[ue,ge]=ut((_==null?void 0:_.cron)||""),[be,ke]=ut(Yt),[Se,Te]=ut(oe),[Ce,de]=ut(Xt),[xe,ae]=ut(ne),[he,me]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store"}).then(ct=>ct.json()).then(ct=>{if(ct&&ct.data&&Array.isArray(ct.data)){const vt=ct.data.filter(te=>te.topin===5);me(vt),!be&&vt.length>0&&ke(vt[0].id.toString())}}).catch(ct=>console.error("Error fetching pin config:",ct))},[]);const re=ct=>{ct.preventDefault();const vt=new FormData(ct.target),te=Object.fromEntries(vt);te.id=_.id,te.pins=_.pins,te.onoff=ve?1:0,te.info=le,te.cron=ue,te.activ=`pwm:${be},${Se},${Ce},${xe}`,fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(te)}).then(pe=>pe.json()).then(pe=>{ht({..._,...te}),st(),window.location.href="/#/cron"}).catch(pe=>console.error("Error:",pe))},Ee=()=>Et`
      <form onsubmit=${re}>
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
                    onChange=${ct=>ke(ct.target.value)}
                    class="border rounded p-2 w-full"
                    required
                  >
                    ${he.map(ct=>Et`<option value=${ct.id}>${ct.pins}</option>`)}
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200">
                <td class="p-2 font-bold">Cron Pattern</td>
                <td class="p-2">
                  <input
                    type="text"
                    value=${ue}
                    onInput=${ct=>ge(ct.target.value)}
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
                    onInput=${ct=>Te(ct.target.value)}
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
                    value=${Ce}
                    onInput=${ct=>de(ct.target.value)}
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
                    onInput=${ct=>ae(ct.target.value)}
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
                    value=${le}
                    onInput=${ct=>ce(ct.target.value)}
                    class="border rounded p-2 w-full"
                  />
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-2 font-bold">On/Off</td>
                <td class="p-2">
                  <${mt} value=${ve} onChange=${ye} />
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
    `,ee=Et`
    <div class=${`modal ${Zt||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${ct=>pt&&ct.target===ct.currentTarget&&st()}
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
  `,ie=at(null);return lt(()=>{const ct=document.createElement("div");return ct.id="pwm-modal-portal",document.body.appendChild(ct),ie.current=ct,()=>{O(null,ct),document.body.removeChild(ct)}},[]),lt(()=>{ie.current&&O(ee,ie.current)}),null}function initGlobalTooltip$4(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,ht=$.offsetHeight,Zt=window.innerWidth,mt=dt.getBoundingClientRect();let Yt=mt.left+mt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,Zt-_-8));let oe=mt.top-ht-8;oe<8&&(oe=mt.bottom+8),$.style.left=Yt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function pt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&pt()})}function TabCron({}){const[$,k]=ut(null),[st,pt]=ut(null);at(null);const[dt,_]=ut(!1),[ht,Zt]=ut(null),[mt,Yt]=ut(null),[oe,Xt]=ut("ru"),[ne,le]=ut(!1),[ce,ve]=ut(1),[ye,ue]=ut(0);lt(()=>{initGlobalTooltip$4()},[]);const ge=()=>fetch("/api/cron/get").then(ee=>ee.json()).then(ee=>{console.log("API response:",ee),ee&&Array.isArray(ee.timers)?(k(ee.timers),Xt(ee.lang||"ru"),typeof ee.numline=="number"&&(ue(ee.numline),ve(ee.numline))):(console.error("Unexpected API response structure:",ee),k([]))}).catch(ee=>{console.error("Error fetching cron data:",ee),k([])});lt(()=>{ge()},[]),lt(()=>{be(ye)},[ye]);const be=ee=>{fetch("/api/numline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({numline:ee})}).then(ie=>ie.json()).then(ie=>console.log("Numline sent to stm32:",ie)).catch(ie=>console.error("Error sending Crone line to stm32:",ie))},ke=()=>{if(ce<$.length){const ee=ce+1;ve(ee),ue(ee),be(ee)}},Se=()=>{if(ce>0){const ee=ce-1;ve(ee),ue(ee),be(ee)}},Te={ru:Et`
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
    `};if($===null)return Et`<div>Loading...</div>`;const Ce=()=>({langtimers:oe==="ru"?rulangtimers:enlangtimers}),de=(ee,ie)=>{const ct=Ce(),te=(ct[ee]&&ct[ee][ie]?ct[ee][ie]:"").split(" "),pe=[];for(let _e=0;_e<te.length;_e+=15)pe.push(te.slice(_e,_e+15).join(" "));return pe.join("<br>")},xe=(ee,ie)=>{Zt(ee),Yt(ie),_(!0)},ae=()=>{_(!1),Zt(null),Yt(null)},he=ee=>{console.log("handleCronChange:",ee),k($.map(ie=>ie.id===ee.id?ee:ie)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ee)}).then(ie=>ie.json()).then(ie=>{console.log("Cron job updated successfully:",ie)}).catch(ie=>{console.error("Error updating cron job:",ie)})},me=()=>Array.isArray(mt)?mt.flatMap(ee=>ee.pinact?Object.keys(ee.pinact).map(ie=>({value:ie,label:ie})):[]):mt&&mt.pinact?Object.keys(mt.pinact).map(ee=>({value:ee,label:ee})):[],re=ee=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${de("langtimers",ee.tooltipIndex)}
    >
      ${ee.title}
    </th>
  `,Ee=({d:ee,index:ie})=>{const ct=ee.activ&&ee.activ.startsWith("pwm:");let vt=ee.activ;if(ct){const te=ee.activ.substring(4).split(",");te.length===4&&(vt=`pwmID=${te[0]} | ${te[1]}s | ${te[2]}%→${te[3]}%`)}return Et`
    <tr class="${ie%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ee.id}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider">${ee.cron}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider items-center gap-1 flex justify-start">${vt}</td>
      <td class="px-6 py-4 text-sm text-slate-600">${ee.info}</td>
      <td class="px-6 py-4">
        <${MyPolzunok}
          value=${ee.onoff}
          onChange=${te=>he({...ee,onoff:te})}
        />
      </td>
     <td class="px-6 py-4 text-center">
        ${ct?Et`
          <button
            onclick=${()=>xe("edit_pwm",ee)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-3"
          >
            Edit
          </button>
          <button
            onclick=${()=>xe("edit_pwm",ee)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap ml-1"
          >
            PWM
          </button>
        `:Et`
       <button
            onclick=${()=>xe("edit",ee)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
          >
            Edit
          </button>
          <button
            onclick=${()=>xe("edit_pwm",ee)}
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
                          <${re} title="No" tooltipIndex=${1} />
                          <${re} title="Cron" tooltipIndex=${2} />
                          <${re} title="Script" tooltipIndex=${3} />
                          <${re} title="Info" tooltipIndex=${4} />
                          <${re} title="On/Off" tooltipIndex=${5} />
                          <${re} title="Action" tooltipIndex=${6} />
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-white/40">
                        ${$.slice(0,ce).map((ee,ie)=>Et`<${Ee} d=${ee} index=${ie} key=${ee.id} />`)}
                      </tbody>
                    </table>
                  </div>
                </div>
              `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No cron jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>le(!ne)}
          >
            ${ne?"Hide Help":"Show Help"}
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
                    onclick=${Se}
                    title="Remove Cron"
                  >-</button>
                `:null}
          </div>
        </div>
      </div>

      ${ne&&Et`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">
          ${Te[oe]}
        </div>
      `}

      ${dt&&ht==="edit_pwm"?Et`
        <${ModalPwmCron}
          modalType=${ht}
          page="TabCron"
          hideModal=${ae}
          title="Edit PWM Timer(s)"
          selectedCron=${mt}
          handleCronChange=${he}
          modalClass="mt-24"
        />
      `:dt?Et`
        <${ModalCron}
          modalType=${ht}
          page="TabCron"
          hideModal=${ae}
          title=${ht==="edit"?"Edit Timer(s)":"Edit Connection"}
          selectedCron=${mt}
          handleCronChange=${he}
          connectionOptions=${me()}
          modalClass="mt-24"
        />
      `:null}
    </div>
  `}const PRESETS$1={ru:[{value:"1",label:"Паяльная станция T max=125°C, T min=-55°C"},{value:"2",label:"Кулер / вентилятор T max=70°C, T min=-55°C"},{value:"3",label:"3D‑принтер (стол) T max=120°C, T min=0°C"},{value:"4",label:"Форточный нагреватель T max=60°C, T min=-55°C"},{value:"5",label:"Тёплый пол T max=45°C, T min=0°C"},{value:"6",label:"Холодильник T max=100°C, T min=-55°C"},{value:"7",label:"Аквариум / бойлер T max=80°C, T min=0°C"},{value:"8",label:"Инкубатор T max=45°C, T min=0°C"},{value:"9",label:"Теплица / комната T max=50°C, T min=-55°C"}],en:[{value:"1",label:"Soldering station T max=125°C, T min=-55°C"},{value:"2",label:"Cooler / fan T max=70°C, T min=-55°C"},{value:"3",label:"3D printer (table) T max=120°C, T min=0°C"},{value:"4",label:"Vent heater T max=60°C, T min=-55°C"},{value:"5",label:"Warm floor T max=45°C, T min=0°C"},{value:"6",label:"Refrigerator T max=100°C, T min=-55°C"},{value:"7",label:"Aquarium / boiler T max=80°C, T min=0°C"},{value:"8",label:"Incubator T max=45°C, T min=0°C"},{value:"9",label:"Greenhouse / room T max=50°C, T min=-55°C"}]},SENSOR_OPTIONS$1=[{value:"1",label:"DS18B20"},{value:"2",label:"DHT-22"}];function ModalPid({modalType:$,page:k,hideModal:st,closeOnOverlayClick:pt=!0,title:dt,selectedPid:_,handlePidChange:ht,language:Zt="en",modalClass:mt,SliderComponent:Yt=MyPolzunok}){const[oe,Xt]=ut((_==null?void 0:_.info)||""),[ne,le]=ut((_==null?void 0:_.onoff)===1),[ce,ve]=ut((_==null?void 0:_.selsens)||"1"),[ye,ue]=ut((_==null?void 0:_.sernum)||""),[ge,be]=ut((_==null?void 0:_.presets)||"1"),[ke,Se]=ut((_==null?void 0:_.tmpset)||""),[Te,Ce]=ut((_==null?void 0:_.tmpcur)||""),[de,xe]=ut([]),[ae,he]=ut(Object.entries((_==null?void 0:_.pinact)||{})[0]||["",""]);lt(()=>{Xt((_==null?void 0:_.info)||""),le((_==null?void 0:_.onoff)===1),ve((_==null?void 0:_.selsens)||"1"),ue((_==null?void 0:_.sernum)||""),be((_==null?void 0:_.presets)||"1"),Se((_==null?void 0:_.tmpset)||""),Ce((_==null?void 0:_.tmpcur)||""),he(Object.entries((_==null?void 0:_.pinact)||{})[0]||["",""])},[_]),lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(vt=>{if(!vt.ok)throw new Error(`HTTP error! status: ${vt.status}`);return vt.json()}).then(vt=>{if(!vt||!vt.data||!Array.isArray(vt.data)){console.error("Invalid data format:",vt),xe([]);return}const te=vt.data.filter(pe=>pe.topin===5);xe(te)}).catch(vt=>{console.error("Error fetching pin config:",vt),xe([])})},[_]);const me=vt=>{vt.preventDefault();const te=ae[0]&&ae[1]!==void 0&&ae[1]!=="",pe={id:_.id,pins:ae[0],pinact:te?{[ae[0]]:parseInt(ae[1])}:{},selsens:ce,sernum:ye,presets:ge,tmpset:ke,tmpcur:Te,info:oe,onoff:ne?1:0};console.log("Data being sent to server:",pe),fetch("/api/pid/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(pe)}).then(_e=>_e.json()).then(_e=>{console.log("Success:",_e),ht({..._,...pe}),st(),window.location.href="/#/pid"}).catch(_e=>{console.error("Error:",_e)})},re=vt=>{if(!vt.target.value)he(["",""]);else{const te=vt.target.value.split("|");he([te[0],te[1]])}},Ee=PRESETS$1[Zt]||PRESETS$1.en,ee=()=>k==="TabPid"&&$==="edit"?Et`
        <form onsubmit=${me}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                ${[{label:"ID",value:_.id},{label:"PWM Pin",value:Et`
                        <select
                          value=${de.some(vt=>String(vt.pins)===String(ae[0]))?`${ae[0]}|${ae[1]}`:""}
                          onChange=${re}
                          class="border rounded p-2 w-full"
                        >
                          <option value="">Select PWM pin</option>
                          ${de.map(vt=>Et`
                              <option value=${`${vt.pins}|${vt.id}`}>
                                ${vt.pins} (ID: ${vt.id})
                              </option>
                            `)}
                        </select>
                      `},{label:"Selected sensor",value:Et`
                      <select
                        value=${ce}
                        onChange=${vt=>ve(vt.target.value)}
                        class="border rounded p-2 w-full"
                      >
                        ${SENSOR_OPTIONS$1.map(vt=>Et`
                            <option
                              value=${vt.value}
                              selected=${vt.value===ce}
                            >
                              ${vt.label}
                            </option>
                          `)}
                      </select>
                    `},{label:"Dev. ser. number",value:ce==="1"?Et`
                          <input
                            type="text"
                            value=${ye}
                            onInput=${vt=>ue(vt.target.value)}
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
                        onChange=${vt=>be(vt.target.value)}
                        class="border rounded p-2 w-full"
                      >
                        ${Ee.map(vt=>Et`
                            <option
                              value=${vt.value}
                              selected=${vt.value===ge}
                            >
                              ${vt.label}
                            </option>
                          `)}
                      </select>
                    `},{label:"t_set",value:Et`
                      <input
                        type="text"
                        value=${ke}
                        onInput=${vt=>Se(vt.target.value)}
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
                        value=${oe}
                        onInput=${vt=>Xt(vt.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    `},{label:"On/Off",value:Et`
                      <${Yt}
                        value=${ne}
                        onChange=${vt=>le(vt)}
                      />
                    `}].map((vt,te)=>Et`
                    <tr class="${te%2===1?"bg-white":"bg-gray-200"}">
                      <td class="p-2 font-bold">${vt.label}</td>
                      <td class="p-2">${vt.value}</td>
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
      `:null,ie=Et`
    <div class=${`modal ${mt||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${vt=>pt&&vt.target===vt.currentTarget&&st()}
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
            ${ee()}
          </div>
        </div>
      </div>
    </div>
  `,ct=at(null);return lt(()=>{const vt=document.createElement("div");return vt.id="modal-portal",document.body.appendChild(vt),ct.current=vt,()=>{O(null,vt),document.body.removeChild(vt)}},[]),lt(()=>{ct.current&&O(ie,ct.current)}),null}function initGlobalTooltip$3(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,ht=$.offsetHeight,Zt=window.innerWidth,mt=dt.getBoundingClientRect();let Yt=mt.left+mt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,Zt-_-8));let oe=mt.top-ht-8;oe<8&&(oe=mt.bottom+8),$.style.left=Yt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function pt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&pt()})}const PRESETS={ru:[{value:"1",label:"Паяльная станция T max=125°C, T min=-55°C"},{value:"2",label:"Кулер / вентилятор T max=70°C, T min=-55°C"},{value:"3",label:"3D‑принтер (стол) T max=120°C, T min=0°C"},{value:"4",label:"Форточный нагреватель T max=60°C, T min=-55°C"},{value:"5",label:"Тёплый пол T max=45°C, T min=0°C"},{value:"6",label:"Холодильник T max=100°C, T min=-55°C"},{value:"7",label:"Аквариум / бойлер T max=80°C, T min=0°C"},{value:"8",label:"Инкубатор T max=45°C, T min=0°C"},{value:"9",label:"Теплица / комната T max=50°C, T min=-55°C"}],en:[{value:"1",label:"Soldering station T max=125°C, T min=-55°C"},{value:"2",label:"Cooler / fan T max=70°C, T min=-55°C"},{value:"3",label:"3D printer (table) T max=120°C, T min=0°C"},{value:"4",label:"Vent heater T max=60°C, T min=-55°C"},{value:"5",label:"Warm floor T max=45°C, T min=0°C"},{value:"6",label:"Refrigerator T max=100°C, T min=-55°C"},{value:"7",label:"Aquarium / boiler T max=80°C, T min=0°C"},{value:"8",label:"Incubator T max=45°C, T min=0°C"},{value:"9",label:"Greenhouse / room T max=50°C, T min=-55°C"}]},SENSOR_OPTIONS=[{value:"1",label:"DS18B20"},{value:"2",label:"DHT-22"}],PID_MAX_SLOTS=24;function TabPid({}){const[$,k]=ut(null),[st,pt]=ut(null);at(null);const[dt,_]=ut(!1),[ht,Zt]=ut(null),[mt,Yt]=ut(null),[oe,Xt]=ut("ru"),[ne,le]=ut(!1),[ce,ve]=ut(0),[ye,ue]=ut(0);lt(()=>{initGlobalTooltip$3()},[]);const ge=()=>fetch("/api/pid/get").then(ct=>ct.json()).then(ct=>{console.log("API response:",ct),ct&&Array.isArray(ct.pid)?(k(ct.pid),Xt(ct.lang||"ru"),typeof ct.pidline=="number"&&(ue(ct.pidline),ve(ct.pidline))):(console.error("Unexpected API response structure:",ct),k([]))}).catch(ct=>{console.error("Error fetching PID data:",ct),k([])});lt(()=>{ge()},[]),lt(()=>{be(ye)},[ye]);const be=ct=>{fetch("/api/pidline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pidline:ct})}).then(vt=>vt.json()).then(vt=>console.log("Pidline sent to stm32:",vt)).catch(vt=>console.error("Error sending PID line to stm32:",vt))},ke=()=>{if(ce<PID_MAX_SLOTS){const ct=ce+1;ve(ct),ue(ct)}},Se=()=>{if(ce>0){const ct=ce-1;ve(ct),ue(ct)}};if($===null)return Et`<div>Loading...</div>`;const Te=()=>({langtimers:oe==="ru"?rulangtimers:enlangtimers}),Ce=(ct,vt)=>{const te=Te(),_e=(te[ct]&&te[ct][vt]?te[ct][vt]:"").split(" "),$e=[];for(let we=0;we<_e.length;we+=15)$e.push(_e.slice(we,we+15).join(" "));return $e.join("<br>")},de=(ct,vt)=>{Zt(ct),Yt(vt),_(!0)},xe=()=>{_(!1),Zt(null),Yt(null)},ae=ct=>{console.log("handlePidChange:",ct),k($.map(vt=>vt.id===ct.id?ct:vt)),fetch("/api/pid/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ct)}).then(vt=>vt.json()).then(vt=>{console.log("PID job updated successfully:",vt)}).catch(vt=>{console.error("Error updating PID job:",vt)})},he=ct=>{console.log("Run tune for id:",ct.id),fetch("/api/pid/tune",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ct.id})}).then(vt=>vt.json()).then(vt=>{console.log("Tune response:",vt)}).catch(vt=>{console.error("Error running tune:",vt)})},me=PRESETS[oe]||PRESETS.en,re=ct=>{const vt=me.find(te=>te.value===String(ct));return vt?vt.label:ct},Ee=ct=>{const vt=SENSOR_OPTIONS.find(te=>te.value===String(ct));return vt?vt.label:ct},ee=ct=>Et`
    <th
      class="px-4 py-4 text-base font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Ce("langtimers",ct.tooltipIndex)}
    >
      ${ct.title}
    </th>
  `,ie=({d:ct,index:vt})=>Et`
    <tr class="${vt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-4 py-3 text-sm text-slate-800 font-medium">${ct.id}</td>
      <td class="px-4 py-3 text-sm text-slate-700 font-mono">
        ${(()=>{const te=Object.entries(ct.pinact||{});if(!te.length)return"—";const[pe,_e]=te[0];return`${pe}(${_e})`})()}
      </td>
      <td class="px-4 py-3 text-sm text-slate-700">${Ee(ct.selsens)}</td>
      <td class="px-4 py-3 text-sm font-mono ${ct.selsens==="1"?"text-slate-700":"text-slate-400 italic"}">${ct.selsens==="1"?ct.sernum||"—":"N/A"}</td>
      <td class="px-4 py-3 text-sm text-slate-700">${re(ct.presets)}</td>
      <td class="px-4 py-3 text-sm text-slate-700 font-mono">${ct.tmpset}</td>
      <td class="px-4 py-3 text-sm text-slate-700 font-mono">${ct.tmpcur}</td>
      <td class="px-4 py-3 text-sm text-slate-600">${ct.info}</td>
      <td class="px-4 py-3">
        <${MyPolzunok}
          value=${ct.onoff}
          onChange=${te=>ae({...ct,onoff:te})}
        />
      </td>
      <td class="px-4 py-3 text-center">
        <button
          onclick=${()=>de("edit",ct)}
          class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
        >
          Edit
        </button>
      </td>
      <td class="px-4 py-3 text-center">
        <button
          onclick=${()=>he(ct)}
          class="px-3 py-1 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40 whitespace-nowrap"
        >
          Run tune
        </button>
      </td>
    </tr>
  `;return Et`
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
                        <${ee} title="No" tooltipIndex=${1} />
                        <${ee} title="PWM Pin" tooltipIndex=${2} />
                        <${ee} title="Sel. sensor" tooltipIndex=${3} />
                        <${ee} title="Dev. ser. number" tooltipIndex=${3} />
                        <${ee} title="Presets" tooltipIndex=${4} />
                        <${ee} title="T set." tooltipIndex=${5} />
                        <${ee} title="T cur." tooltipIndex=${6} />
                        <${ee} title="Info" tooltipIndex=${4} />
                        <${ee} title="On/Off" tooltipIndex=${5} />
                        <${ee} title="Action" tooltipIndex=${6} />
                        <${ee} title="Auto tune" tooltipIndex=${7} />
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-white/40">
                      ${Array.from({length:ce},(ct,vt)=>{const te=$&&$[vt]?$[vt]:{id:vt+1,pins:"",pinact:{},selsens:"",sernum:"",presets:"",tmpset:"",tmpcur:"",info:"",onoff:0};return Et`<${ie} d=${te} index=${vt} key=${te.id} />`})}
                    </tbody>
                  </table>
                </div>
              </div>
            `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No PID jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>le(!ne)}
          >
            ${ne?"Hide Help":"Show Help"}
          </button>
          <div class="font-semibold text-slate-600 tracking-wide">
            ${$&&PID_MAX_SLOTS-ce>0?`Still available: ${PID_MAX_SLOTS-ce} PID jobs`:"No available: PID jobs!"}
          </div>
          <div class="flex gap-2">
            ${ce<PID_MAX_SLOTS?Et`
            <button
                class="bg-emerald-500 hover:bg-emerald-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-emerald-500/30"
                onclick=${ke}
                title="Add PID"
            >+</button>
            `:null}
            ${ce>0?Et`
                <button
                  class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                  onclick=${Se}
                  title="Remove PID"
                >-</button>
              `:null}
          </div>
        </div>
      </div>

      ${ne&&Et`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">
          <p class="text-slate-600">Help content for PID controller.</p>
        </div>
      `}

      ${dt?Et`
        <${ModalPid}
          modalType=${ht}
          page="TabPid"
          hideModal=${xe}
          title="Edit PID"
          selectedPid=${mt}
          handlePidChange=${ae}
          language=${oe}
          modalClass="mt-24"
        />
      `:null}
    </div>
  `}function ModalEditSensor({typsensor:$,oneWireId:k,pins:st,onClose:pt,onUpdate:dt,sensorType:_,sensorData:ht,closeOnOverlayClick:Zt=!0}){const[mt,Yt]=ut({ut:(ht==null?void 0:ht.ut)||$.ut,lt:(ht==null?void 0:ht.lt)||$.lt,action_ut:(ht==null?void 0:ht.action_ut)||$.action_ut,action_lt:(ht==null?void 0:ht.action_lt)||$.action_lt,upphumid:(ht==null?void 0:ht.upphumid)||$.upphumid||0,humlolim:(ht==null?void 0:ht.humlolim)||$.humlolim||0,actuphum:(ht==null?void 0:ht.actuphum)||$.actuphum||"",actlowhum:(ht==null?void 0:ht.actlowhum)||$.actlowhum||"",info:(ht==null?void 0:ht.info)||$.info,onoff:(ht==null?void 0:ht.onoff)||$.onoff||0,humidity:(ht==null?void 0:ht.humidity)||$.humidity||0}),[oe,Xt]=ut(!1),ne=(be,ke,Se)=>{if(be===""||be==="-")return be;const Te=be.replace(",",".");if(!/^-?\d*\.?\d*$/.test(Te))return null;const Ce=parseFloat(Te);return isNaN(Ce)||Ce<ke||Ce>Se?null:Te},le=be=>{const{name:ke,value:Se}=be.target;if(["ut","lt"].includes(ke)){const Te=ne(Se,-55,125);Te!==null&&Yt(Ce=>({...Ce,[ke]:Te}))}else if(["upphumid","humlolim"].includes(ke)){const Te=ne(Se,0,100);Te!==null&&Yt(Ce=>({...Ce,[ke]:Te}))}else Yt(Te=>({...Te,[ke]:Se}))},ce=be=>{const ke=["ut","lt","upphumid","humlolim"],Se={...be};return ke.forEach(Te=>{Se[Te]===""||Se[Te]==="-"?Se[Te]=0:Se[Te]=parseFloat(Se[Te].toString().replace(",","."))}),Se},ue=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onclick=${be=>{Zt&&be.target===be.currentTarget&&pt()}}
    >
      <div
        class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
        style="max-height: 90vh; overflow-y: auto;"
      >
        <div class="modal-header flex justify-between items-center border-b pb-4 mb-4">
          <h5 class="text-xl font-bold">Edit Sensor</h5>
          <button
            class="close-button text-gray-500 hover:text-gray-700"
            onclick=${pt}
          >
            Close
          </button>
        </div>
        <form onsubmit=${async be=>{be.preventDefault(),Xt(!0);const ke=ce(mt);try{if(!(await fetch("/api/sensor/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:k,pins:st,sensorNumber:$.s_number,...ke,s_number:$.s_number,t:$.t})})).ok)throw new Error("Network response was not ok");dt({...$,...ke,oneWireId:k,pins:st,s_number:$.s_number,t:$.t}),pt()}catch(Se){console.error("Error updating Sensor:",Se)}finally{Xt(!1)}}}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                <tr class="bg-blue-100">
                  <td class="p-2 font-bold">Upper Temperature</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="ut"
                      value=${mt.ut}
                      oninput=${le}
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
                      value=${mt.lt}
                      oninput=${le}
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
                      value=${mt.action_ut}
                      oninput=${le}
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
                      value=${mt.action_lt}
                      oninput=${le}
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
                            value=${mt.upphumid}
                            oninput=${le}
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
                            value=${mt.humlolim}
                            oninput=${le}
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
                            value=${mt.actuphum}
                            oninput=${le}
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
                            value=${mt.actlowhum}
                            oninput=${le}
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
                      value=${mt.info}
                      oninput=${le}
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
  `,ge=at(null);return lt(()=>{const be=document.createElement("div");return be.id="modal-portal-sensor",document.body.appendChild(be),ge.current=be,()=>{O(null,be),document.body.removeChild(be)}},[]),lt(()=>{ge.current&&O(ue,ge.current)}),null}function ModalOneWire({oneWire:$,onClose:k,onUpdate:st,refresh:pt,closeOnOverlayClick:dt=!0}){console.log("oneWire object:",$);const[_,ht]=ut({typsensor:$.typsensor,numdevices:$.numdevices}),[Zt,mt]=ut(!1),[Yt,oe]=ut($.onoff||0),Xt=ue=>{dt&&ue.target===ue.currentTarget&&k()},ne=ue=>{const{name:ge,value:be}=ue.target;let ke={..._,[ge]:parseInt(be,10)};ge==="typsensor"&&(be==="0"?ke.numdevices=0:be==="2"&&(ke.numdevices=1)),ht(ke)},le=ue=>{oe(ue)},ve=Et`
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
            disabled=${Zt}
          >
            Close
          </button>
        </div>
        <form onsubmit=${async ue=>{ue.preventDefault(),mt(!0);const ge={id:$.id,pin:$.pin,typsensor:_.typsensor,numdevices:_.numdevices,onoff:Yt};console.log("Sending data:",ge);try{if(!(await fetch("api/onewire/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ge)})).ok)throw new Error("Network response was not ok");const ke={...$,..._,onoff:Yt};st(ke),k()}catch(be){console.error("Error updating OneWire:",be)}finally{mt(!1)}}}>
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
                      onchange=${ne}
                      class="border rounded p-2 w-full"
                      disabled=${Zt}
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
                      oninput=${_.typsensor===1?ne:void 0}
                      class="border rounded p-2 w-full ${_.typsensor!==1?"bg-gray-100":""}"
                      min="0"
                      max="10"
                      readonly=${_.typsensor!==1}
                      disabled=${Zt}
                    />
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="p-2 font-bold">On/Off</td>
                  <td class="p-2">
                    <${MyPolzunok}
                      value=${Yt}
                      onChange=${le}
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
              disabled=${Zt}
            >
              ${Zt?"Saving...":"Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,ye=at(null);return lt(()=>{const ue=document.createElement("div");return ue.id="modal-portal-onewire",document.body.appendChild(ue),ye.current=ue,()=>{O(null,ue),document.body.removeChild(ue)}},[]),lt(()=>{ye.current&&O(ve,ye.current)}),null}function initGlobalTooltip$2(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,ht=$.offsetHeight,Zt=window.innerWidth,mt=dt.getBoundingClientRect();let Yt=mt.left+mt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,Zt-_-8));let oe=mt.top-ht-8;oe<8&&(oe=mt.bottom+8),$.style.left=Yt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function pt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&pt()})}const TabOneWire=()=>{const[$,k]=ut([]),[st,pt]=ut(null),[dt,_]=ut(!1),[ht,Zt]=ut(null),[mt,Yt]=ut(null),[oe,Xt]=ut("ru"),[ne,le]=ut(null);lt(()=>{initGlobalTooltip$2()},[]);const ce=()=>{console.log("Calling initial refresh..."),fetch("/api/onewire/get").then(ae=>ae.json()).then(ae=>{console.log("Initial data received:",ae),Xt(ae.lang||"ru"),k(ae.pins||[]),console.log("Initial OneWire state set:",ae.pins),pt(null)}).catch(ae=>{console.error("Error in refresh:",ae),pt(ae.message),k([])})},ve=async()=>{try{const he=await(await fetch("/api/temp/get")).json();k(me=>me.map(re=>{if(!re.sensors||re.typsensor!==1&&re.typsensr!==1&&re.typsensor!==2&&re.typsensr!==2)return re;const Ee=re.sensors.map(ee=>{var ie,ct;if(re.typsensor===1||re.typsensr===1){const vt=(ie=he.ds18b20)==null?void 0:ie.find(te=>te.addr===ee.s_number);if(vt)return{...ee,t:vt.temp}}else if(re.typsensor===2||re.typsensr===2){const vt=(ct=he.dht22)==null?void 0:ct.find(te=>te.id===re.id);if(vt)return{...ee,t:vt.temp,humidity:vt.humidity}}return ee});return{...re,sensors:Ee}}))}catch(ae){console.error("Error in updateSensorData:",ae)}};lt(()=>{console.log("Setting up initial data and interval..."),ce();const ae=setInterval(ve,1e3);return()=>{clearInterval(ae)}},[]);const ye=()=>{_(!1),Zt(null),Yt(null)},ue=ae=>{k(he=>he.map(me=>{var re;if(me.id===ae.oneWireId){const Ee=((re=me.sensors)==null?void 0:re.map(ee=>ee.s_number===ae.s_number?{...ee,...ae}:ee))||[];return{...me,sensors:Ee}}return me})),ye()},ge=ae=>{Yt(ae),_(!0)},be=ae=>{k(he=>he.map(me=>me.id===ae.id?{...me,onoff:ae.onoff}:me))},ke=ae=>{k(he=>he.map(me=>me.id===ae.id?ae:me)),ye()};if(st)return Et`<div>Error fetching sensor data: ${st}</div>`;const Se=()=>({lang1Wire:oe==="ru"?rulange1Wire:enlange1Wire}),Te=(ae,he)=>{const me=Se(),Ee=(me[ae]&&me[ae][he]?me[ae][he]:"").split(" "),ee=[];for(let ie=0;ie<Ee.length;ie+=15)ee.push(Ee.slice(ie,ie+15).join(" "));return ee.join("<br>")},Ce=ae=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${Te("lang1Wire",ae.tooltipIndex)}
    >
      ${ae.title}
    </th>
  `,de=({device:ae,index:he})=>{const me=ae.pins||ae.pin,re=ae.typsensor||ae.typsensr||0,Ee=ae.numdevices||ae.numsens||0;return Et`
      <tr class="${he%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ae.id}</td>
        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${me}</td>
        <td class="px-6 py-4 text-sm text-slate-700 font-medium">${["None","DS18B20","DHT22"][re]}</td>
        <td class="px-6 py-4 text-sm text-slate-700 font-medium">${Ee}</td>
        <td class="px-6 py-4">
          <${MyPolzunok}
            value=${ae.onoff||0}
            onChange=${ee=>be({...ae,onoff:ee})}
          />
        </td>
        <td class="px-6 py-4">
          <button
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap"
            onclick=${()=>ge(ae)}
          >
            Edit
          </button>
        </td>
      </tr>
      ${re!==0&&Ee>0?Et`
            <tr class="bg-white/40">
              <td colspan="6" class="p-4 md:p-6">
                <div class="w-full">
                  <${xe} d=${ae} />
                </div>
              </td>
            </tr>
          `:""}
    `},xe=({d:ae})=>{const he=ae.typsensor||ae.typsensr||0,me=ae.numdevices||ae.numsens||0;if(he===0||me===0)return Et`
        <div class="px-4 py-2 text-slate-500 font-medium">
          No connected sensors for this OneWire pin.
        </div>
      `;let re=ae.sensors||[];const Ee=(ee,ie)=>{const ct=he===2;return Et`
        <div class="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/60 mb-4 transition-all hover:shadow-xl">
          <div class="font-extrabold text-xl text-slate-700 mb-4 flex justify-between items-center border-b border-slate-200/60 pb-3">
            <span class="tracking-tight drop-shadow-sm">
              ${ct?"DHT22 Sensor":`DS18B20 Sensor (S/N: ${ee.s_number})`}
            </span>
            <a
              href="#"
              class="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors uppercase tracking-wider bg-white/50 hover:bg-white/80 px-4 py-1.5 rounded-lg shadow-sm"
              onclick=${vt=>{vt.preventDefault(),Zt({...ee,oneWireId:ae.id,sensorType:he,pins:ae.pins||ae.pin}),_(!0)}}
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
              ${ct&&"humidity"in ee?Et`
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
              ${ct&&"upphumid"in ee?Et`
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
      `};return re.length>0&&Object.keys(re[0]).length>0?Et`<div class="space-y-4 w-full">${re.map((ee,ie)=>Ee(ee))}</div>`:Et`
          <div class="px-4 py-4 text-slate-500 font-medium bg-white/50 backdrop-blur-sm rounded-xl border border-white/40 text-center">
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
                      <${Ce} title="ID" tooltipIndex=${1} />
                      <${Ce} title="Pin" tooltipIndex=${2} />
                      <${Ce} title="Selected sensor" tooltipIndex=${3} />
                      <${Ce} title="Count of sensors" tooltipIndex=${4} />
                      <${Ce} title="On/Off" tooltipIndex=${5} />
                      <${Ce} title="Actions" tooltipIndex=${6} />
                    </tr>
                  </thead>
                  <tbody id="tab1" class="divide-y divide-white/40">
                    ${$.length>0?$.map((ae,he)=>Et`<${de} device=${ae} index=${he} key=${ae.id} />`):Et`
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

    ${dt&&(ht?Et`
            <${ModalEditSensor}
              typsensor=${ht}
              oneWireId=${ht.oneWireId}
              pins=${ht.pins}
              onClose=${ye}
              onUpdate=${ue}
              sensorType=${ht.sensorType}
              closeOnOverlayClick=${!0}
              refresh=${ce}
            />
          `:Et`
            <${ModalOneWire}
              oneWire=${mt}
              onClose=${ye}
              onUpdate=${ke}
              closeOnOverlayClick=${!0}
              refresh=${ce}
            />
          `)}
  `};function ModalSIM800L({hideModal:$,title:k,selectedGps:st,onSave:pt}){const[dt,_]=ut((st==null?void 0:st.tel)||""),[ht,Zt]=ut((st==null?void 0:st.info)||""),[mt,Yt]=ut((st==null?void 0:st.onoff)===1),[oe,Xt]=ut(!0),ne=ue=>/^\+\d{11,20}$/.test(ue),ve=Et`
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

          <form onSubmit=${ue=>{if(ue.preventDefault(),!oe)return;const ge={tel:dt,info:ht,onoff:mt?1:0};console.log("Сохраняемые данные:",ge),fetch("/api/sim800l/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ge)}).then(be=>be.json()).then(be=>{typeof pt=="function"&&pt(ge),$()}).catch(be=>{console.error("Error:",be)})}}>
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
                        onInput=${ue=>{const ge=ue.target.value;_(ge),Xt(ne(ge))}}
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
                        value=${ht}
                        onInput=${ue=>Zt(ue.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${MyPolzunok} value=${mt} onChange=${Yt} />
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
  `,ye=at(null);return lt(()=>{const ue=document.createElement("div");return ue.id="modal-portal",document.body.appendChild(ue),ye.current=ue,()=>{O(null,ue),document.body.removeChild(ue)}},[]),lt(()=>{ye.current&&O(ve,ye.current)}),null}const ModalSecurity=({modalType:$,page:k,hideModal:st,title:pt,selectedSecurity:dt,onSecurityChange:_,SliderComponent:ht=MyPolzunok})=>{const[Zt,mt]=ut((dt==null?void 0:dt.info)||""),[Yt,oe]=ut((dt==null?void 0:dt.onoff)||0),[Xt,ne]=ut((dt==null?void 0:dt.ptype)||0),[le,ce]=ut((dt==null?void 0:dt.send_sms)||""),[ve,ye]=ut((dt==null?void 0:dt.action)||""),[ue,ge]=ut([]),[be,ke]=ut({send_sms:null,action:null}),[Se,Te]=ut(null),Ce=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,de=(ie,ct)=>!ct||ct.trim()===""||ct.toLowerCase()==="none"?null:ie==="action"?Ce.test(ct)?null:'Incorrect format. Use "None" or "pin:value" format.':ct.length>100?"Text should not exceed 100 characters":null,xe=(ie,ct)=>{const vt=de(ie,ct);switch(ke(te=>({...te,[ie]:vt})),ie){case"send_sms":ce(ct);break;case"action":ye(ct);break}};lt(()=>{fetch("/api/monitoring/get").then(ie=>ie.json()).then(ie=>{Array.isArray(ie)?ge(ie.filter(ct=>ct.topin===2)):ge([])}).catch(ie=>{console.error("Error fetching pin config:",ie),ge([])})},[]);const ae=ie=>{if(ie.preventDefault(),Object.values(be).some(vt=>vt!==null)){Te("Please correct the errors before submitting.");return}const ct={...dt,info:Zt,send_sms:le||"NO",action:ve||"None",onoff:Yt,ptype:Xt};fetch("/api/monitoring/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ct)}).then(vt=>{if(!vt.ok)throw new Error("Network response was not ok");return vt.json()}).then(vt=>{if(vt.error)throw new Error(vt.error);_(ct),st()}).catch(vt=>{console.error("Error:",vt),Te("Failed to save changes. Please try again.")})},he=()=>{ne(0),ce(""),ye(""),mt(""),oe(0),ke({send_sms:null,action:null})},Ee=Et`
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
            <h2 class="text-xl font-bold">${pt}</h2>
            <button
              onClick=${st}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          ${k==="TabSecurity"&&$==="connection"?Et`
    <form onSubmit=${ae}>
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
                  onChange=${ie=>_({...dt,setrpins:ie.target.value})}
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
    <form onSubmit=${ae}>
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
                  onChange=${ie=>ne(parseInt(ie.target.value))}
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
                  onInput=${ie=>xe("action",ie.target.value)}
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
                  value=${le}
                  onchange=${ie=>xe("send_sms",ie.target.value)}
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
                  value=${Zt}
                  onInput=${ie=>mt(ie.target.value)}
                  class="border rounded p-2 w-full"
                />
              </td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">On/Off</td>
              <td class="p-2">
                <${ht} value=${Yt} onChange=${oe} />
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
  `,ee=at(null);return lt(()=>{const ie=document.createElement("div");return ie.id="modal-portal",document.body.appendChild(ie),ee.current=ie,()=>{O(null,ie),document.body.removeChild(ie)}},[]),lt(()=>{ee.current&&O(Ee,ee.current)}),null};function initGlobalTooltip$1(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,ht=$.offsetHeight,Zt=window.innerWidth,mt=dt.getBoundingClientRect();let Yt=mt.left+mt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,Zt-_-8));let oe=mt.top-ht-8;oe<8&&(oe=mt.bottom+8),$.style.left=Yt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function pt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&pt()})}const TabSecurity=()=>{const[$,k]=ut({lang:"ru",sim800l:0,onoff:0,tel:"",info:""}),[st,pt]=ut(!1),[dt,_]=ut(!1),[ht,Zt]=ut([]),[mt,Yt]=ut(!1),[oe,Xt]=ut("ru"),[ne,le]=ut(!1),[ce,ve]=ut(""),[ye,ue]=ut(null),[ge,be]=ut(!1),[ke,Se]=ut("connected"),[Te,Ce]=ut(0);lt(()=>{initGlobalTooltip$1()},[]);const de=()=>oe==="ru"?ruLangsecurity:enLangsecurity,xe=()=>oe==="ru"?ruLangsecuritypins:enLangsecuritypins,ae=(we,Ie)=>{const se=(we&&we[Ie]?we[Ie]:"").split(" "),fe=[];for(let Oe=0;Oe<se.length;Oe+=15)fe.push(se.slice(Oe,Oe+15).join(" "));return fe.join("<br>")},he=({title:we,langArr:Ie,tooltipIndex:$t})=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${ae(Ie,$t)}
    >
      ${we}
    </th>
  `,me=(we,Ie)=>{let $t;return(...se)=>{clearTimeout($t),$t=setTimeout(()=>we(...se),Ie)}},re=async(we,Ie={},$t=3)=>{try{const se=await fetch(we,Ie);if(!se.ok)throw new Error("Network response was not ok");return Se("connected"),se}catch(se){if(Se("error"),$t>0)return await new Promise(fe=>setTimeout(fe,1e3)),re(we,Ie,$t-1);throw Se("disconnected"),se}},Ee={ru:Et`
      <div className="space-y-6 max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Модуль SIM800L📱</h2>
          <p className="text-gray-600 mb-4">
            Модуль позволяет управлять "Заготовкой" при помощи мобильной связи - интернет не нужен!
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Возможности модуля:</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>Входящие вызовы и SMS принимаются только с номера, указанного в поле «Phone Number». Вызовы с других номеров отклоняются автоматически, SMS — игнорируются.</li>
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
              <li>Incoming calls and SMS messages are accepted only from the number specified in the “Phone Number” field. Calls from other numbers are automatically rejected, and SMS messages are ignored.</li>
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
    `},ie=async()=>{if(!(ge||Date.now()-Te<500))try{const Ie=await(await re("/api/sim800l/get")).json();k(Ie)}catch(we){console.error("Error fetching SIM800L data:",we)}},ct=async()=>{if(!(ge||Date.now()-Te<500))try{const Ie=await(await re("/api/monitoring/get")).json();Zt(Ie.pins||[])}catch(we){console.error("Error fetching monitoring data:",we)}};lt(()=>{fetch("/api/monitoring/get").then(Ie=>Ie.json()).then(Ie=>Xt(Ie.lang||"ru")).catch(Ie=>console.error("Error fetching initial language:",Ie));const we=setInterval(()=>{ie(),ct()},500);return()=>clearInterval(we)},[]);const vt=me(async we=>{be(!0);try{await re("/api/sim800l/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(we)}),k(we),Ce(Date.now())}catch(Ie){console.error("Error updating SIM800L:",Ie)}finally{be(!1)}},300),te=async we=>{try{const Ie=await fetch("/api/monitoring/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(we)});if(!Ie.ok)throw new Error(`HTTP error! status: ${Ie.status}`);Zt($t=>$t.map(se=>se.id===we.id?we:se)),await ct(),le(!1)}catch(Ie){console.error("Error updating security:",Ie),alert("Failed to save changes. Please try again."),await ct()}},pe=we=>{Zt(Ie=>Ie.map($t=>$t.id===we.id?{...$t,...we}:$t)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:we.id,onoff:we.onoff})}).then(Ie=>Ie.json()).then(Ie=>console.log("Response from /api/onoff/set:",Ie)).catch(Ie=>console.error("Error calling /api/onoff/set:",Ie)),$e()},_e=(we,Ie)=>{ve(we),ue(Ie),le(!0)},$e=()=>{le(!1),ve(""),ue(null)};return Et`
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
                      onChange=${we=>vt({...$,onoff:we})}
                    />
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                    <button
                      onClick=${()=>pt(!0)}
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
              onClick=${()=>_(!dt)}
              class="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white transition-all duration-300 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl hover:from-teal-400 hover:to-cyan-500 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0"
            >
              ${dt?"Hide Help":"Show Help"}
            </button>
          </div>
          ${dt&&Ee[oe]}
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
                  <${he} title="ID"             langArr=${xe()} tooltipIndex=${1} />
                  <${he} title="Pin"            langArr=${xe()} tooltipIndex=${2} />
                  <${he} title="Type of sensor" langArr=${xe()} tooltipIndex=${3} />
                  <${he} title="Action"         langArr=${xe()} tooltipIndex=${4} />
                  <${he} title="Send SMS"       langArr=${xe()} tooltipIndex=${5} />
                  <${he} title="INFO"           langArr=${xe()} tooltipIndex=${6} />
                  <${he} title="On/Off"         langArr=${xe()} tooltipIndex=${7} />
                  <${he} title="Edit Pin"       langArr=${xe()} tooltipIndex=${8} />
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                ${ht.length>0?ht.map((we,Ie)=>Et`
                      <tr class="${Ie%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${we.id}</td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${we.pins}</td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                          ${["PIR","Normal open","Normal close"][we.ptype]}
                        </td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${we.action}</td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${we.send_sms}</td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${we.info}</td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                          <${MyPolzunok}
                            value=${we.onoff}
                            onChange=${$t=>pe({...we,onoff:$t})}
                          />
                        </td>
                        <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                          <button
                            onClick=${()=>_e("edit",we)}
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
              onClick=${()=>Yt(!mt)}
              class="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white transition-all duration-300 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl hover:from-teal-400 hover:to-cyan-500 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0"
            >
              ${mt?"Hide Help":"Show Help"}
            </button>
          </div>
          ${mt&&ee[oe]}
        </div>

        ${st&&Et`
          <${ModalSIM800L}
            hideModal=${()=>pt(!1)}
            title="Edit SIM800L Settings"
            selectedGps=${$}
            onSave=${vt}
          />
        `}

        ${ne&&Et`
          <${ModalSecurity}
            modalType=${ce}
            page="TabSecurity"
            hideModal=${()=>le(!1)}
            title="Edit Security Settings"
            selectedSecurity=${ye}
            onSecurityChange=${te}
          />
        `}
      </div>
    </div>
  `};function initGlobalTooltip(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"320px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let k=null;function st(dt){clearTimeout(k),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const _=$.offsetWidth,ht=$.offsetHeight,Zt=window.innerWidth,mt=dt.getBoundingClientRect();let Yt=mt.left+mt.width/2-_/2;Yt=Math.max(8,Math.min(Yt,Zt-_-8));let oe=mt.top-ht-8;oe<8&&(oe=mt.bottom+8),$.style.left=Yt+"px",$.style.top=oe+"px",$.style.opacity="1"})}function pt(){k=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const _=dt.target.closest("[data-tip]");_&&st(_)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&pt()})}const SETTINGS_TIP_IDX={Login:1,Password:2,"Time zone UTC":3,"IP address":4,"Subnet mask":5,"Default gateway":6,Token:7,Host:8,Port:9,Client:10,User:11,"Password (MQTT)":12,"TX topic":13,"RX topic":14,"HTTPS domain":15,"Private Key":16,"Public Key":17,Longitude:18,Latitude:19,Sunrise:20,Sunset:21,"Day Length":22,"Next full moon":23,Date:24,Time:25},getTip=($,k,st,pt)=>{const dt=k==="ru"?st:pt,_=SETTINGS_TIP_IDX[$];if(!_||!dt||!dt[_])return"";const ht=dt[_].split(" "),Zt=[];for(let mt=0;mt<ht.length;mt+=12)Zt.push(ht.slice(mt,mt+12).join(" "));return Zt.join("<br>")},FieldRow=({label:$,tipLabel:k,index:st,tip:pt,children:dt})=>{const _=st%2===0?"bg-white/80":"bg-sky-200/40";return Et`
    <tr class="transition-colors border-b border-slate-200 ${_} hover:bg-slate-200/80">
      <td
        class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help"
        data-tip=${pt}
      >
        ${$}
      </td>
      <td class="w-2/3 pl-4 py-4 pr-6">
        ${dt}
      </td>
    </tr>
  `};function Settings({}){const[$,k]=ut({}),[st,pt]=ut(null),[dt,_]=ut(null),[ht,Zt]=ut({}),mt=at(null),[Yt,oe]=ut(null),[Xt,ne]=ut(null),[le,ce]=ut(!1),[ve,ye]=ut(!1),[ue,ge]=ut(!1),[be,ke]=ut(!1),[Se,Te]=ut(!1),[Ce,de]=ut(!0);lt(()=>{if(initGlobalTooltip(),!document.getElementById("__network_toggle_style")){const $t=document.createElement("style");$t.id="__network_toggle_style",$t.textContent=".network-toggle span { display: none !important; }",document.head.appendChild($t)}},[]);const xe=$t=>getTip($t,$.lang||"ru",rulangsettings,enlangsettings),ae=[{value:"en",label:"English"},{value:"ru",label:"Russian"}],he=[[-12,"(GMT -12:00) Eniwetok, Kwajalein"],[-11,"(GMT -11:00) Midway Island, Samoa"],[-10,"(GMT -10:00) Hawaii"],[-9,"(GMT -9:00) Alaska"],[-8,"(GMT -8:00) Pacific Time (US & Canada)"],[-7,"(GMT -7:00) Mountain Time (US & Canada)"],[-6,"(GMT -6:00) Central Time (US & Canada), Mexico City"],[-5,"(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima"],[-4,"(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz"],[-3.3,"(GMT -3:30) Newfoundland"],[-3,"(GMT -3:00) Brazil, Buenos Aires, Georgetown"],[-2,"(GMT -2:00) Mid-Atlantic"],[-1,"(GMT -1:00) Azores, Cape Verde Islands"],[0,"(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca"],[1,"(GMT +1:00) Brussels, Copenhagen, Madrid, Paris"],[2,"(GMT +2:00) Kaliningrad, South Africa"],[3,"(GMT +3:00) Moscow, St. Petersburg, Baghdad, Riyadh"],[3.3,"(GMT +3:30) Tehran"],[4,"(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi"],[4.3,"(GMT +4:30) Kabul"],[5,"(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"],[5.3,"(GMT +5:30) Bombay, Calcutta, Madras, New Delhi"],[5.45,"(GMT +5:45) Kathmandu"],[6,"(GMT +6:00) Almaty, Dhaka, Colombo"],[7,"(GMT +7:00) Bangkok, Hanoi, Jakarta"],[8,"(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"],[9,"(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"],[9.3,"(GMT +9:30) Adelaide, Darwin"],[10,"(GMT +10:00) Eastern Australia, Guam, Vladivostok"],[11,"(GMT +11:00) Magadan, Solomon Islands, New Caledonia"],[12,"(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"]],me=/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,re=/^(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)$/,Ee=$t=>{if(!$t)return{date:"",time:""};const se=$t.match(/d:(\d{1,2}\.\d{1,2}\.\d{2})/),fe=$t.match(/t:(\d{2}:\d{2}:\d{2})/);return{date:se?se[1]:"",time:fe?fe[1]:""}},ee=$t=>{if(!/^\d{1,2}\.\d{1,2}\.\d{2}$/.test($t))return!1;const[fe,Oe,Pe]=$t.split(".").map(Number);if(Oe<1||Oe>12||fe<1||fe>31||Pe<0||Pe>99)return!1;const Me=new Date().getFullYear()%100;if(Pe>Me+5)return!1;const Ne=new Date(2e3+Pe,Oe,0).getDate();return!(fe>Ne)},ie=$t=>/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test($t),ct=($t,se)=>{const fe=Object.values(se).some(Pe=>Pe!==null),Oe=$t.usehttps?$t.domain&&$t.domain.trim()!=="":!0;return!(fe||!Oe)},vt=($t,se)=>{oe({message:$t,type:se}),setTimeout(()=>{oe(null)},3e3)},te=$t=>{ne($t),setTimeout(()=>{ne(null)},3e3)},pe=($t,se)=>{let fe=null;if(!$.usehttps&&["domain","tls_key","tls_cert","tls_ca","telegram_token"].includes($t))return null;if(!se&&["ip_addr","gateway","mqtt_hst","sb_mask","offdate","offtime","domain"].includes($t))return"Поле не может быть пустым";switch($t){case"ip_addr":case"gateway":case"mqtt_hst":me.test(se)||(fe="Неверный IP-адрес");break;case"sb_mask":re.test(se)||(fe="Неверная маска подсети");break;case"offdate":ee(se)||(fe="Неверный формат даты (д.м.гг)");break;case"offtime":ie(se)||(fe="Неверный формат времени (чч:мм:сс)");break;case"domain":se.length>50?fe="Домен не должен превышать 50 символов":se.match(/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/)||(fe="Неверный формат домена");break;case"tls_key":se&&se.trim()!==""&&(se.length>512?fe="Private Key не должен превышать 512 символов":(!se.includes("BEGIN EC PRIVATE KEY")||!se.includes("END EC PRIVATE KEY"))&&(fe="Неверный формат Private Key"));break;case"tls_cert":se&&se.trim()!==""&&(se.length>1024?fe="Public Key не должен превышать 1024 символов":(!se.includes("BEGIN CERTIFICATE")||!se.includes("END CERTIFICATE"))&&(fe="Неверный формат Public Key"));break;case"tls_ca":se&&se.trim()!==""&&(se.length>1024?fe="Secret Key не должен превышать 1024 символов":(!se.includes("BEGIN CERTIFICATE")||!se.includes("END CERTIFICATE"))&&(fe="Неверный формат Secret Key"));break}return fe},_e=$t=>{$t.preventDefault();const se=new FormData(mt.current);let fe={...$};for(const[Oe,Pe]of se.entries())["lon_de","lat_de","timezone","mqtt_prt"].includes(Oe)?fe[Oe]=Pe===""||Pe===null?0:Number(Pe):fe[Oe]=Pe;fe.usehttps||["tls_ca","tls_key","tls_cert","telegram_token","domain"].forEach(Oe=>delete fe[Oe]),fe.offdate&&fe.offtime?fe.offldt=`d:${fe.offdate} t:${fe.offtime}`:delete fe.offldt,["lon_de","lat_de","timezone","mqtt_prt"].forEach(Oe=>{(fe[Oe]===null||fe[Oe]==="")&&(fe[Oe]=0)}),fe.onsunrise=fe.onsunrise?1:0,fe.onsunset=fe.onsunset?1:0,fe.check_ip=fe.check_ip?1:0,fe.check_mqtt=fe.check_mqtt?1:0,fe.usehttps=fe.usehttps?1:0,fetch("/api/mysett/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(fe)}).then(Oe=>{if(!Oe.ok)throw new Error("Ошибка сети");return Oe.json()}).then(Oe=>{_("success"),pt(Oe),vt("Данные успешно сохранены","success"),te("Данные успешно сохранены")}).catch(Oe=>{_("error"),pt(Oe),vt("Ошибка при сохранении данных","error"),te("Ошибка при сохранении данных")})},$e=($t,se)=>{let fe=null;$t==="offdate"?fe=ee(se)?null:"Неверный формат даты (д.м.гг)":$t==="offtime"?fe=ie(se)?null:"Неверный формат времени (чч:мм:сс)":fe=pe($t,se),Zt(Pe=>{const Me={...Pe,[$t]:fe},Ne=["tls_key","tls_cert","tls_ca"],Ae=Object.keys(Me).filter(Le=>!Ne.includes(Le)&&Le!=="telegram_token").some(Le=>Me[Le]!==null);return ce(Ae||!$.usehttps&&Ne.some(Le=>$[Le])),Me});let Oe=se;["lon_de","lat_de","timezone","mqtt_prt"].includes($t)?Oe=se===""||se===null?0:Number(se):["onsunrise","onsunset","check_ip","check_mqtt","usehttps"].includes($t)&&(Oe=se?1:0),k(Pe=>({...Pe,[$t]:Oe})),$t==="usehttps"&&(Zt({}),ce(!1))},we=()=>fetch("/api/mysett/get").then($t=>$t.json()).then($t=>{if($t.offldt){const{date:se,time:fe}=Ee($t.offldt);$t.offdate=se,$t.offtime=fe}return k($t),$t}).catch($t=>{console.error("Error fetching settings:",$t),vt("Ошибка при загрузке настроек","error")});if(lt(()=>{we().then($t=>{$t!=null&&$t.tls_key&&ye(!0),$t!=null&&$t.tls_cert&&ge(!0),$t!=null&&$t.tls_ca&&ke(!0),$t!=null&&$t.telegram_token&&Te(!0),de(!1)})},[]),lt(()=>{ce(!ct($,ht))},[$,ht]),Ce)return Et`<div>Loading...</div>`;if(!$)return"";const Ie=($t="")=>Et`
    <button
      type="submit"
      class=${`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 ${le?"opacity-50 cursor-not-allowed bg-slate-400":"bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500"} ${$t}`}
      disabled=${le}
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
            onChange=${$t=>$e("lang",$t.target.value)}
            style="border: 2px solid #22d3ee; border-radius: 8px; padding: 4px 10px; font-size: 14px; font-weight: 600; background: white; color: #1e293b; cursor: pointer; outline: none;"
          >
            ${ae.map($t=>Et`<option value=${$t.value}>${$t.label}</option>`)}
          </select>
        </div>

        ${Xt&&Et`
          <div class="w-full max-w-4xl bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center mb-6 border border-green-400/50 backdrop-blur-md">
            ${Xt}
          </div>
        `}

        <form ref=${mt} onSubmit=${_e} class="w-full max-w-4xl flex flex-col gap-6 relative">

          <div class="flex justify-end w-full">${Ie()}</div>

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
              ${[{label:"Login",key:"adm_name",type:"text"},{label:"Password",key:"adm_pswd",type:"password"},{label:"Time zone UTC",key:"timezone",type:"select",options:he}].map(($t,se)=>Et`
                <${FieldRow} label=${$t.label} tip=${xe($t.tipLabel||$t.label)} index=${se}>
                  <${pageSetting}
                    value=${$[$t.key]}
                    setfn=${fe=>$e($t.key,fe)}
                    type=${$t.type}
                    options=${$t.options}
                    class=${`w-full px-3 py-2 bg-white/50 border ${ht[$t.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    error=${ht[$t.key]}
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
                            <${MyPolzunok} value=${$.check_ip} onChange=${$t=>$e("check_ip",$t)} />
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
                            <${MyPolzunok} value=${$.check_ip} onChange=${$t=>$e("check_ip",$t)} />
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
                  ${[{label:"IP address",key:"ip_addr",type:"text"},{label:"Subnet mask",key:"sb_mask",type:"text"},{label:"Default gateway",key:"gateway",type:"text"}].map(($t,se)=>Et`
                    <${FieldRow} label=${$t.label} tip=${xe($t.tipLabel||$t.label)} index=${se}>
                      <${pageSetting}
                        value=${$[$t.key]}
                        setfn=${fe=>$e($t.key,fe)}
                        type=${$t.type}
                        class=${`w-full px-3 py-2 bg-white/50 border ${ht[$t.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        error=${ht[$t.key]}
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
                  setfn=${$t=>$e("token",$t)}
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
                          <${MyPolzunok} value=${$.check_mqtt} onChange=${$t=>$e("check_mqtt",$t)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[{label:"Host",key:"mqtt_hst",type:"text"},{label:"Port",key:"mqtt_prt",type:"number"},{label:"Client",key:"mqtt_clt",type:"text"},{label:"User",key:"mqtt_usr",type:"text"},{label:"Password",key:"mqtt_pswd",type:"password",tipLabel:"Password (MQTT)"},{label:"TX topic",key:"txmqttop",type:"text"},{label:"RX topic",key:"rxmqttop",type:"text"}].map(($t,se)=>Et`
                  <${FieldRow} label=${$t.label} tip=${xe($t.tipLabel||$t.label)} index=${se}>
                    <${pageSetting}
                      value=${$[$t.key]}
                      setfn=${fe=>$e($t.key,fe)}
                      type=${$t.type}
                      class=${`w-full px-3 py-2 bg-white/50 border ${ht[$t.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      error=${ht[$t.key]}
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
                          <${MyPolzunok} value=${$.check_mqtt} onChange=${$t=>$e("check_mqtt",$t)} />
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
                          <${MyPolzunok} value=${$.usehttps} onChange=${$t=>$e("usehttps",$t)} />
                        </div>
                      </th>
                      <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide w-2/3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                ${[{label:"HTTPS domain",key:"domain",type:"text"},{label:"Private Key",key:"tls_key",type:"textarea"},{label:"Public Key",key:"tls_cert",type:"textarea"}].map(($t,se)=>Et`
                  <tr class="transition-colors border-b border-slate-200 ${se%2===0?"bg-sky-200/40":"bg-white/80"} hover:bg-slate-200/80">
                    <td
                      class="w-1/3 text-lg font-bold text-slate-700 px-6 border-r border-slate-500 py-4 cursor-help align-top"
                      data-tip=${xe($t.label)}
                    >
                      ${$t.label}
                    </td>
                    <td class="w-2/3 pl-4 py-4 pr-6 align-top">
                      <div class="relative w-full">
                        ${$t.type==="textarea"?Et`
                            ${$t.key==="tls_key"&&$.tls_key?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены, но информация скрыта!</div>`:$t.key==="tls_cert"&&$.tls_cert?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены успешно!</div>`:Et`<textarea
                                    name=${$t.key}
                                    value=${$[$t.key]||""}
                                    onInput=${fe=>$e($t.key,fe.target.value)}
                                    class=${`w-full px-3 py-2 bg-white/50 border ${ht[$t.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                                    rows="1"
                                    placeholder="Enter ${$t.label}"
                                  ></textarea>`}
                          `:Et`
                            <input
                              type="text"
                              name=${$t.key}
                              value=${$[$t.key]||""}
                              onInput=${fe=>$e($t.key,fe.target.value)}
                              class=${`w-full px-3 py-2 bg-white/50 border ${ht[$t.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                              maxlength="30"
                              placeholder="Enter domain (e.g., zagotovka.ddns.net)"
                            />
                          `}
                        ${$[$t.key]&&$t.key==="tls_cert"&&Et`
                          <div class="absolute right-0 top-0 mt-[3px] mr-[3px] flex gap-2">
                            <button type="button"
                              onClick=${()=>{navigator.clipboard.writeText($[$t.key]),te("Данные скопированы")}}
                              class="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5"
                            >Копировать</button>
                            <button type="button"
                              onClick=${()=>$e($t.key,"")}
                              class="px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                            >Очистить</button>
                          </div>
                        `}
                        ${$[$t.key]&&$t.key!=="domain"&&$t.key!=="tls_cert"&&Et`
                          <button type="button"
                            onClick=${()=>$e($t.key,"")}
                            class="absolute right-0 top-0 mt-[3px] mr-[3px] px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                          >Очистить</button>
                        `}
                      </div>
                      ${ht[$t.key]&&Et`<div class="text-red-500 text-sm mt-1 font-semibold w-full text-left">${ht[$t.key]}</div>`}
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
                          <${MyPolzunok} value=${$.usehttps} onChange=${$t=>$e("usehttps",$t)} />
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
                <${pageSetting} value=${$.lon_de} setfn=${$t=>$e("lon_de",$t)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${ht.lon_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${ht.lon_de} />
              <//>

              <${FieldRow} label="Latitude" tip=${xe("Latitude")} index=${1}>
                <${pageSetting} value=${$.lat_de} setfn=${$t=>$e("lat_de",$t)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${ht.lat_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${ht.lat_de} />
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
                    <${MyPolzunok} value=${$.onsunrise} onChange=${$t=>$e("onsunrise",$t)} />
                    <input type="text" value=${$.sunrise_pins||""} onInput=${$t=>$e("sunrise_pins",$t.target.value)}
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
                    <${MyPolzunok} value=${$.onsunset} onChange=${$t=>$e("onsunset",$t)} />
                    <input type="text" value=${$.sunset_pins||""} onInput=${$t=>$e("sunset_pins",$t.target.value)}
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
                  <input type="text" name="offdate" value=${$.offdate||""} onInput=${$t=>$e("offdate",$t.target.value)}
                    placeholder="dd.mm.yy"
                    class=${`w-full px-3 py-2 bg-white/50 border ${ht.offdate?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${ht.offdate&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${ht.offdate}</div>`}
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
                  <input type="text" name="offtime" value=${$.offtime||""} onInput=${$t=>$e("offtime",$t.target.value)}
                    placeholder="hh:mm:ss"
                    class=${`w-full px-3 py-2 bg-white/50 border ${ht.offtime?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${ht.offtime&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${ht.offtime}</div>`}
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

          <div class="flex justify-end w-full mb-4">${Ie()}</div>

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
  </svg>`;function Header({logout:$,user:k,setShowSidebar:st,showSidebar:pt}){const[dt,_]=ut(new Date),[ht,Zt]=ut(null),mt=(ne,le)=>new Date(ne.year+1900,ne.mon,ne.mday,ne.hour,ne.min,ne.sec),Yt=async()=>{try{const le=await(await fetch("/api/stm32-time")).text();let ce;try{ce=JSON.parse(le)}catch{return}ce.status&&ce.time?Zt(mt(ce.time,ce.timezone)):Zt(null)}catch{Zt(null)}};lt(()=>{const ne=setInterval(()=>_(new Date),1e3),le=setInterval(Yt,1e3);return Yt(),()=>{clearInterval(ne),clearInterval(le)}},[]);const oe=ne=>ne.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric"}),Xt=ne=>ne.toLocaleTimeString("ru-RU");return Et`
    <div
      class="bg-white/40 backdrop-blur-md border-b border-white/40 shadow-sm sticky top-0 z-[48] w-full py-2 ${pt?"pl-72":""} transition-all duration-300 transform"
    >
      <div class="px-4 w-full py-0 my-0 flex items-center justify-between">
        <button
          type="button"
          onclick=${()=>st(ne=>!ne)}
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
            ${ht?oe(ht):" 00.00.0000"}<span
              style="margin-left: 8px;"
            ></span
            >Время: ${ht?Xt(ht):"00:00"}
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
  `}function Sidebar({url:$,show:k}){const st=({title:pt,icon:dt,href:_,url:ht})=>Et`
  <div>
    <a href="#${_}" class="${_==ht?"bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-md group":"text-slate-600 hover:bg-slate-200/60 hover:text-slate-800 group"} flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
      <${dt} class="w-6 h-6"/>
      ${pt}
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
  <//>`}function Chart({data:$}){const k=$.length,st=20,pt=15,dt=100,_=5,ht=10,Zt=25,mt=ne=>(dt-ht)/_*(ne+1),Yt=ne=>(dt-ht)*ne/100,oe=ne=>dt-ht-Yt(ne),Xt=(ne,le,ce)=>Array.from({length:le},(ve,ye)=>ye*1+ne);return Et` <div
    class="my-4 divide-y divide-gray-200 overflow-auto rounded bg-white"
  >
    <div class="font-light uppercase flex items-center text-gray-600 px-4 py-2">
      Temperature, last 24h
    <//>
    <div class="relative">
      <svg class="bg-yellow-x50 w-full p-4" viewBox="0 0 ${k*st+pt} ${dt}">
        ${Xt(0,_).map(ne=>Et`
            <line
              x1="0"
              y1=${mt(ne)}
              x2=${pt+k*st}
              y2=${mt(ne)}
              stroke-width="0.3"
              class="stroke-slate-300"
              stroke-dasharray="1,1"
            />
            <text x="0" y=${mt(ne)-2} class="text-[6px] fill-slate-400"
              >${Zt-Zt/_*(ne+1)}<//
            >
          `)}
        ${Xt(0,k).map(ne=>Et`
            <rect
              x=${pt+ne*st}
              y=${oe($[ne]*100/Zt)}
              width="12"
              height=${Yt($[ne]*100/Zt)}
              rx="2"
              class="fill-cyan-500"
            />
            <text x=${pt+ne*st} y="100" class="text-[6px] fill-slate-400"
              >${ne*2}:00<//
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
  <//>`}function Main({}){const[$,k]=ut(null);return lt(()=>fetch("api/stats/get").then(pt=>pt.json()).then(pt=>k(pt)),[]),$?Et` <div class="p-2">
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
          onChange=${pt=>{k(pt.target.checked?1:0)}}
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
  `}function FirmwareUpdate({}){const[$,k]=ut([{},{}]),[st,pt]=ut(null),dt=()=>fetch("api/firmware/status").then(ne=>ne.json()).then(ne=>k(ne));lt(dt,[]),lt(()=>{if(st){const ne=setTimeout(()=>{pt(null)},3e3);return()=>clearTimeout(ne)}},[st]);const _=ne=>fetch("api/firmware/commit").then(le=>le.json()).then(dt),ht=ne=>fetch("api/reboot",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reboot:1})}).then(le=>le.json()).then(le=>new Promise(ce=>setTimeout(()=>{dt(),ce()},5e3))),Zt=ne=>fetch("api/firmware/rollback").then(ht),mt=ne=>fetch("api/device/eraselast").then(dt),Yt=function(ne){if(!ne){pt({type:"yellow",message:"Error: No file selected."});return}const le=ne.name.split(".").pop().toLowerCase();if(le!=="bin"&&le!=="hex"){pt({type:"red",message:"Error: Only .bin and .hex files are allowed!"});return}const ce=new FormData;ce.append("file",ne),fetch("api/firmware/upload",{method:"POST",body:ce}).then(ve=>{if(!ve.ok)throw new Error(`HTTP error! status: ${ve.status}`);return ve.json()}).then(()=>{pt({type:"green",message:"Firmware uploaded successfully!"}),dt()}).catch(ve=>{pt({type:"yellow",message:`Error: Upload failed. ${ve.message}`})})},oe=({type:ne,message:le})=>Et`
      <div
        class=${`fixed top-0 left-0 right-0 z-50 border-b-4 p-4 ${ne==="red"?"bg-red-100 border-red-500 text-red-700":ne==="yellow"?"bg-yellow-100 border-yellow-500 text-yellow-700":"bg-green-100 border-green-500 text-green-700"}`}
        role="alert"
      >
        <p class="font-bold text-center">${le}</p>
      </div>
    `,Xt=({title:ne,onupload:le})=>Et`
      <label
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        ${ne}
        <input
          type="file"
          class="hidden"
          accept=".bin,.hex"
          onChange=${ve=>{const ye=ve.target.files[0];ye&&le(ye)}}
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
          onclick=${Zt}
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
            onupload=${Yt}
          />
          <div class="grow"></div>
          <${Button}
            title="Reboot device"
            onclick=${ht}
            icon=${Icons.refresh}
            cls="w-full"
          />
          <${Button}
            title="Erase last sector"
            onclick=${mt}
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
  `}const pageSetting=({value:$,setfn:k,type:st,options:pt,error:dt,..._})=>{let ht;const Zt=`w-full px-3 py-2 border rounded-md ${dt?"border-red-500":"border-gray-300"}`;switch(st){case"text":case"password":case"number":ht=Et`
        <input
          type=${st}
          value=${$}
          onInput=${mt=>k(mt.target.value)}
          class=${Zt}
          ...${_}
        />
      `;break;case"select":ht=Et`
        <select
          value=${$}
          onChange=${mt=>k(mt.target.value)}
          class=${Zt}
          ...${_}
        >
          ${pt.map(([mt,Yt])=>Et` <option value=${mt}>${Yt}</option> `)}
        </select>
      `;break;case"switch":ht=Et`
        <label class="switch">
          <input
            type="checkbox"
            checked=${$}
            onChange=${mt=>k(mt.target.checked)}
            ...${_}
          />
          <span class="slider round"></span>
        </label>
      `;break;default:ht=Et`<span>Неподдерживаемый тип: ${st}</span>`}return Et`
    <div>
      ${ht}
      ${dt&&Et`<div class="text-red-500 text-sm mt-1">${dt}</div>`}
    </div>
  `};function Toast({message:$,type:k,onClose:st}){return lt(()=>{const pt=setTimeout(()=>{st()},3e3);return()=>clearTimeout(pt)},[]),Et`
    <div
      class=${`fixed bottom-4 right-4 p-4 rounded-md ${k==="success"?"bg-green-500":"bg-red-500"} text-white`}
    >
      ${$}
    </div>
  `}const App=function({}){const[$,k]=ut(!0),[st,pt]=ut("/"),[dt,_]=ut(""),[ht,Zt]=ut(!0),mt=()=>fetch("api/logout").then(oe=>_("")),Yt=oe=>oe.ok?oe.json().then(Xt=>_(Xt.user)).finally(Xt=>k(!1)):k(!1)&&_(null);return lt(()=>fetch("api/login").then(Yt),[]),$?"":dt?Et` <div class="min-h-screen bg-slate-100" id="mains">
    <${Sidebar} url=${st} show=${ht} />
    <${Header}
      logout=${mt}
      user=${dt}
      showSidebar=${ht}
      setShowSidebar=${Zt}
    />
    <div
      class="${ht&&"pl-72"} transition-all duration-300 transform"
    >
      <${Qt}
        onChange=${oe=>pt(oe.url)}
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
      loginFn=${Yt}
      logoIcon=${Logo}
      title="Device Dashboard Login"
      tipText="To login, use: admin/admin, user1/user1, user2/user2"
    />`};window.onload=()=>O(y(App),document.body);
