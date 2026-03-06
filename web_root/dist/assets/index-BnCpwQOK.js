(function(){const _=document.createElement("link").relList;if(_&&_.supports&&_.supports("modulepreload"))return;for(const ct of document.querySelectorAll('link[rel="modulepreload"]'))dt(ct);new MutationObserver(ct=>{for(const st of ct)if(st.type==="childList")for(const pt of st.addedNodes)pt.tagName==="LINK"&&pt.rel==="modulepreload"&&dt(pt)}).observe(document,{childList:!0,subtree:!0});function k(ct){const st={};return ct.integrity&&(st.integrity=ct.integrity),ct.referrerPolicy&&(st.referrerPolicy=ct.referrerPolicy),ct.crossOrigin==="use-credentials"?st.credentials="include":ct.crossOrigin==="anonymous"?st.credentials="omit":st.credentials="same-origin",st}function dt(ct){if(ct.ep)return;ct.ep=!0;const st=k(ct);fetch(ct.href,st)}})();var t,n,e,r,o,u,i,l,c,a,s,f={},p=[],h=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,d=Array.isArray;function v($,_){for(var k in _)$[k]=_[k];return $}function m($){var _=$.parentNode;_&&_.removeChild($)}function y($,_,k){var dt,ct,st,pt={};for(st in _)st=="key"?dt=_[st]:st=="ref"?ct=_[st]:pt[st]=_[st];if(arguments.length>2&&(pt.children=arguments.length>3?t.call(arguments,2):k),typeof $=="function"&&$.defaultProps!=null)for(st in $.defaultProps)pt[st]===void 0&&(pt[st]=$.defaultProps[st]);return g($,pt,dt,ct,null)}function g($,_,k,dt,ct){var st={type:$,props:_,key:k,ref:dt,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:ct??++e,__i:-1,__u:0};return ct==null&&n.vnode!=null&&n.vnode(st),st}function b($){return $.children}function C($,_){this.props=$,this.context=_}function x($,_){if(_==null)return $.__?x($.__,$.__i+1):null;for(var k;_<$.__k.length;_++)if((k=$.__k[_])!=null&&k.__e!=null)return k.__e;return typeof $.type=="function"?x($):null}function w($){var _,k;if(($=$.__)!=null&&$.__c!=null){for($.__e=$.__c.base=null,_=0;_<$.__k.length;_++)if((k=$.__k[_])!=null&&k.__e!=null){$.__e=$.__c.base=k.__e;break}return w($)}}function P($){(!$.__d&&($.__d=!0)&&r.push($)&&!U.__r++||o!==n.debounceRendering)&&((o=n.debounceRendering)||u)(U)}function U(){var $,_,k,dt,ct,st,pt,Zt;for(r.sort(i);$=r.shift();)$.__d&&(_=r.length,dt=void 0,st=(ct=(k=$).__v).__e,pt=[],Zt=[],k.__P&&((dt=v({},ct)).__v=ct.__v+1,n.vnode&&n.vnode(dt),M(k.__P,dt,ct,k.__n,k.__P.namespaceURI,32&ct.__u?[st]:null,pt,st??x(ct),!!(32&ct.__u),Zt),dt.__v=ct.__v,dt.__.__k[dt.__i]=dt,L(pt,dt,Zt),dt.__e!=st&&w(dt)),r.length>_&&r.sort(i));U.__r=0}function H($,_,k,dt,ct,st,pt,Zt,vt,te,le){var ht,Yt,ee,ue,fe,be=dt&&dt.__k||p,pe=_.length;for(k.__d=vt,E(k,_,be),vt=k.__d,ht=0;ht<pe;ht++)(ee=k.__k[ht])!=null&&typeof ee!="boolean"&&typeof ee!="function"&&(Yt=ee.__i===-1?f:be[ee.__i]||f,ee.__i=ht,M($,ee,Yt,ct,st,pt,Zt,vt,te,le),ue=ee.__e,ee.ref&&Yt.ref!=ee.ref&&(Yt.ref&&F(Yt.ref,null,ee),le.push(ee.ref,ee.__c||ue,ee)),fe==null&&ue!=null&&(fe=ue),65536&ee.__u||Yt.__k===ee.__k?(vt&&!vt.isConnected&&(vt=x(Yt)),vt=S(ee,vt,$)):typeof ee.type=="function"&&ee.__d!==void 0?vt=ee.__d:ue&&(vt=ue.nextSibling),ee.__d=void 0,ee.__u&=-196609);k.__d=vt,k.__e=fe}function E($,_,k){var dt,ct,st,pt,Zt,vt=_.length,te=k.length,le=te,ht=0;for($.__k=[],dt=0;dt<vt;dt++)pt=dt+ht,(ct=$.__k[dt]=(ct=_[dt])==null||typeof ct=="boolean"||typeof ct=="function"?null:typeof ct=="string"||typeof ct=="number"||typeof ct=="bigint"||ct.constructor==String?g(null,ct,null,null,null):d(ct)?g(b,{children:ct},null,null,null):ct.constructor===void 0&&ct.__b>0?g(ct.type,ct.props,ct.key,ct.ref?ct.ref:null,ct.__v):ct)!=null?(ct.__=$,ct.__b=$.__b+1,Zt=D(ct,k,pt,le),ct.__i=Zt,st=null,Zt!==-1&&(le--,(st=k[Zt])&&(st.__u|=131072)),st==null||st.__v===null?(Zt==-1&&ht--,typeof ct.type!="function"&&(ct.__u|=65536)):Zt!==pt&&(Zt===pt+1?ht++:Zt>pt?le>vt-pt?ht+=Zt-pt:ht--:Zt<pt?Zt==pt-1&&(ht=Zt-pt):ht=0,Zt!==dt+ht&&(ct.__u|=65536))):(st=k[pt])&&st.key==null&&st.__e&&(131072&st.__u)==0&&(st.__e==$.__d&&($.__d=x(st)),I(st,st,!1),k[pt]=null,le--);if(le)for(dt=0;dt<te;dt++)(st=k[dt])!=null&&(131072&st.__u)==0&&(st.__e==$.__d&&($.__d=x(st)),I(st,st))}function S($,_,k){var dt,ct;if(typeof $.type=="function"){for(dt=$.__k,ct=0;dt&&ct<dt.length;ct++)dt[ct]&&(dt[ct].__=$,_=S(dt[ct],_,k));return _}$.__e!=_&&(k.insertBefore($.__e,_||null),_=$.__e);do _=_&&_.nextSibling;while(_!=null&&_.nodeType===8);return _}function A($,_){return _=_||[],$==null||typeof $=="boolean"||(d($)?$.some((function(k){A(k,_)})):_.push($)),_}function D($,_,k,dt){var ct=$.key,st=$.type,pt=k-1,Zt=k+1,vt=_[k];if(vt===null||vt&&ct==vt.key&&st===vt.type&&(131072&vt.__u)==0)return k;if(dt>(vt!=null&&(131072&vt.__u)==0?1:0))for(;pt>=0||Zt<_.length;){if(pt>=0){if((vt=_[pt])&&(131072&vt.__u)==0&&ct==vt.key&&st===vt.type)return pt;pt--}if(Zt<_.length){if((vt=_[Zt])&&(131072&vt.__u)==0&&ct==vt.key&&st===vt.type)return Zt;Zt++}}return-1}function N($,_,k){_[0]==="-"?$.setProperty(_,k??""):$[_]=k==null?"":typeof k!="number"||h.test(_)?k:k+"px"}function R($,_,k,dt,ct){var st;t:if(_==="style")if(typeof k=="string")$.style.cssText=k;else{if(typeof dt=="string"&&($.style.cssText=dt=""),dt)for(_ in dt)k&&_ in k||N($.style,_,"");if(k)for(_ in k)dt&&k[_]===dt[_]||N($.style,_,k[_])}else if(_[0]==="o"&&_[1]==="n")st=_!==(_=_.replace(/(PointerCapture)$|Capture$/i,"$1")),_=_.toLowerCase()in $||_==="onFocusOut"||_==="onFocusIn"?_.toLowerCase().slice(2):_.slice(2),$.l||($.l={}),$.l[_+st]=k,k?dt?k.u=dt.u:(k.u=l,$.addEventListener(_,st?a:c,st)):$.removeEventListener(_,st?a:c,st);else{if(ct=="http://www.w3.org/2000/svg")_=_.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(_!="width"&&_!="height"&&_!="href"&&_!="list"&&_!="form"&&_!="tabIndex"&&_!="download"&&_!="rowSpan"&&_!="colSpan"&&_!="role"&&_ in $)try{$[_]=k??"";break t}catch{}typeof k=="function"||(k==null||k===!1&&_[4]!=="-"?$.removeAttribute(_):$.setAttribute(_,k))}}function T($){return function(_){if(this.l){var k=this.l[_.type+$];if(_.t==null)_.t=l++;else if(_.t<k.u)return;return k(n.event?n.event(_):_)}}}function M($,_,k,dt,ct,st,pt,Zt,vt,te){var le,ht,Yt,ee,ue,fe,be,pe,me,xe,ne,$e,Ee,_e,Ie,Se=_.type;if(_.constructor!==void 0)return null;128&k.__u&&(vt=!!(32&k.__u),st=[Zt=_.__e=k.__e]),(le=n.__b)&&le(_);t:if(typeof Se=="function")try{if(pe=_.props,me=(le=Se.contextType)&&dt[le.__c],xe=le?me?me.props.value:le.__:dt,k.__c?be=(ht=_.__c=k.__c).__=ht.__E:("prototype"in Se&&Se.prototype.render?_.__c=ht=new Se(pe,xe):(_.__c=ht=new C(pe,xe),ht.constructor=Se,ht.render=V),me&&me.sub(ht),ht.props=pe,ht.state||(ht.state={}),ht.context=xe,ht.__n=dt,Yt=ht.__d=!0,ht.__h=[],ht._sb=[]),ht.__s==null&&(ht.__s=ht.state),Se.getDerivedStateFromProps!=null&&(ht.__s==ht.state&&(ht.__s=v({},ht.__s)),v(ht.__s,Se.getDerivedStateFromProps(pe,ht.__s))),ee=ht.props,ue=ht.state,ht.__v=_,Yt)Se.getDerivedStateFromProps==null&&ht.componentWillMount!=null&&ht.componentWillMount(),ht.componentDidMount!=null&&ht.__h.push(ht.componentDidMount);else{if(Se.getDerivedStateFromProps==null&&pe!==ee&&ht.componentWillReceiveProps!=null&&ht.componentWillReceiveProps(pe,xe),!ht.__e&&(ht.shouldComponentUpdate!=null&&ht.shouldComponentUpdate(pe,ht.__s,xe)===!1||_.__v===k.__v)){for(_.__v!==k.__v&&(ht.props=pe,ht.state=ht.__s,ht.__d=!1),_.__e=k.__e,_.__k=k.__k,_.__k.forEach((function(re){re&&(re.__=_)})),ne=0;ne<ht._sb.length;ne++)ht.__h.push(ht._sb[ne]);ht._sb=[],ht.__h.length&&pt.push(ht);break t}ht.componentWillUpdate!=null&&ht.componentWillUpdate(pe,ht.__s,xe),ht.componentDidUpdate!=null&&ht.__h.push((function(){ht.componentDidUpdate(ee,ue,fe)}))}if(ht.context=xe,ht.props=pe,ht.__P=$,ht.__e=!1,$e=n.__r,Ee=0,"prototype"in Se&&Se.prototype.render){for(ht.state=ht.__s,ht.__d=!1,$e&&$e(_),le=ht.render(ht.props,ht.state,ht.context),_e=0;_e<ht._sb.length;_e++)ht.__h.push(ht._sb[_e]);ht._sb=[]}else do ht.__d=!1,$e&&$e(_),le=ht.render(ht.props,ht.state,ht.context),ht.state=ht.__s;while(ht.__d&&++Ee<25);ht.state=ht.__s,ht.getChildContext!=null&&(dt=v(v({},dt),ht.getChildContext())),Yt||ht.getSnapshotBeforeUpdate==null||(fe=ht.getSnapshotBeforeUpdate(ee,ue)),H($,d(Ie=le!=null&&le.type===b&&le.key==null?le.props.children:le)?Ie:[Ie],_,k,dt,ct,st,pt,Zt,vt,te),ht.base=_.__e,_.__u&=-161,ht.__h.length&&pt.push(ht),be&&(ht.__E=ht.__=null)}catch(re){_.__v=null,vt||st!=null?(_.__e=Zt,_.__u|=vt?160:32,st[st.indexOf(Zt)]=null):(_.__e=k.__e,_.__k=k.__k),n.__e(re,_,k)}else st==null&&_.__v===k.__v?(_.__k=k.__k,_.__e=k.__e):_.__e=W(k.__e,_,k,dt,ct,st,pt,vt,te);(le=n.diffed)&&le(_)}function L($,_,k){_.__d=void 0;for(var dt=0;dt<k.length;dt++)F(k[dt],k[++dt],k[++dt]);n.__c&&n.__c(_,$),$.some((function(ct){try{$=ct.__h,ct.__h=[],$.some((function(st){st.call(ct)}))}catch(st){n.__e(st,ct.__v)}}))}function W($,_,k,dt,ct,st,pt,Zt,vt){var te,le,ht,Yt,ee,ue,fe,be=k.props,pe=_.props,me=_.type;if(me==="svg"?ct="http://www.w3.org/2000/svg":me==="math"?ct="http://www.w3.org/1998/Math/MathML":ct||(ct="http://www.w3.org/1999/xhtml"),st!=null){for(te=0;te<st.length;te++)if((ee=st[te])&&"setAttribute"in ee==!!me&&(me?ee.localName===me:ee.nodeType===3)){$=ee,st[te]=null;break}}if($==null){if(me===null)return document.createTextNode(pe);$=document.createElementNS(ct,me,pe.is&&pe),st=null,Zt=!1}if(me===null)be===pe||Zt&&$.data===pe||($.data=pe);else{if(st=st&&t.call($.childNodes),be=k.props||f,!Zt&&st!=null)for(be={},te=0;te<$.attributes.length;te++)be[(ee=$.attributes[te]).name]=ee.value;for(te in be)if(ee=be[te],te!="children"){if(te=="dangerouslySetInnerHTML")ht=ee;else if(te!=="key"&&!(te in pe)){if(te=="value"&&"defaultValue"in pe||te=="checked"&&"defaultChecked"in pe)continue;R($,te,null,ee,ct)}}for(te in pe)ee=pe[te],te=="children"?Yt=ee:te=="dangerouslySetInnerHTML"?le=ee:te=="value"?ue=ee:te=="checked"?fe=ee:te==="key"||Zt&&typeof ee!="function"||be[te]===ee||R($,te,ee,be[te],ct);if(le)Zt||ht&&(le.__html===ht.__html||le.__html===$.innerHTML)||($.innerHTML=le.__html),_.__k=[];else if(ht&&($.innerHTML=""),H($,d(Yt)?Yt:[Yt],_,k,dt,me==="foreignObject"?"http://www.w3.org/1999/xhtml":ct,st,pt,st?st[0]:k.__k&&x(k,0),Zt,vt),st!=null)for(te=st.length;te--;)st[te]!=null&&m(st[te]);Zt||(te="value",ue!==void 0&&(ue!==$[te]||me==="progress"&&!ue||me==="option"&&ue!==be[te])&&R($,te,ue,be[te],ct),te="checked",fe!==void 0&&fe!==$[te]&&R($,te,fe,be[te],ct))}return $}function F($,_,k){try{typeof $=="function"?$(_):$.current=_}catch(dt){n.__e(dt,k)}}function I($,_,k){var dt,ct;if(n.unmount&&n.unmount($),(dt=$.ref)&&(dt.current&&dt.current!==$.__e||F(dt,null,_)),(dt=$.__c)!=null){if(dt.componentWillUnmount)try{dt.componentWillUnmount()}catch(st){n.__e(st,_)}dt.base=dt.__P=null}if(dt=$.__k)for(ct=0;ct<dt.length;ct++)dt[ct]&&I(dt[ct],_,k||typeof $.type!="function");k||$.__e==null||m($.__e),$.__c=$.__=$.__e=$.__d=void 0}function V($,_,k){return this.constructor($,k)}function O($,_,k){var dt,ct,st,pt;n.__&&n.__($,_),ct=(dt=!1)?null:_.__k,st=[],pt=[],M(_,$=_.__k=y(b,null,[$]),ct||f,f,_.namespaceURI,ct?null:_.firstChild?t.call(_.childNodes):null,st,ct?ct.__e:_.firstChild,dt,pt),L(st,$,pt)}function j($,_,k){var dt,ct,st,pt,Zt=v({},$.props);for(st in $.type&&$.type.defaultProps&&(pt=$.type.defaultProps),_)st=="key"?dt=_[st]:st=="ref"?ct=_[st]:Zt[st]=_[st]===void 0&&pt!==void 0?pt[st]:_[st];return arguments.length>2&&(Zt.children=arguments.length>3?t.call(arguments,2):k),g($.type,Zt,dt||$.key,ct||$.ref,null)}function q($,_){var k={__c:_="__cC"+s++,__:$,Consumer:function(dt,ct){return dt.children(ct)},Provider:function(dt){var ct,st;return this.getChildContext||(ct=[],(st={})[_]=this,this.getChildContext=function(){return st},this.shouldComponentUpdate=function(pt){this.props.value!==pt.value&&ct.some((function(Zt){Zt.__e=!0,P(Zt)}))},this.sub=function(pt){ct.push(pt);var Zt=pt.componentWillUnmount;pt.componentWillUnmount=function(){ct.splice(ct.indexOf(pt),1),Zt&&Zt.call(pt)}}),dt.children}};return k.Provider.__=k.Consumer.contextType=k}t=p.slice,n={__e:function($,_,k,dt){for(var ct,st,pt;_=_.__;)if((ct=_.__c)&&!ct.__)try{if((st=ct.constructor)&&st.getDerivedStateFromError!=null&&(ct.setState(st.getDerivedStateFromError($)),pt=ct.__d),ct.componentDidCatch!=null&&(ct.componentDidCatch($,dt||{}),pt=ct.__d),pt)return ct.__E=ct}catch(Zt){$=Zt}throw $}},e=0,C.prototype.setState=function($,_){var k;k=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=v({},this.state),typeof $=="function"&&($=$(v({},k),this.props)),$&&v(k,$),$!=null&&this.__v&&(_&&this._sb.push(_),P(this))},C.prototype.forceUpdate=function($){this.__v&&(this.__e=!0,$&&this.__h.push($),P(this))},C.prototype.render=b,r=[],u=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=function($,_){return $.__v.__b-_.__v.__b},U.__r=0,l=0,c=T(!1),a=T(!0),s=0;var B,K,z,G,J=0,Q=[],X=[],Y=n,Z=Y.__b,tt=Y.__r,nt=Y.diffed,et=Y.__c,_t=Y.unmount,rt=Y.__;function ot($,_){Y.__h&&Y.__h(K,$,J||_),J=0;var k=K.__H||(K.__H={__:[],__h:[]});return $>=k.__.length&&k.__.push({__V:X}),k.__[$]}function ut($){return J=1,it(wt,$)}function it($,_,k){var dt=ot(B++,2);if(dt.t=$,!dt.__c&&(dt.__=[wt(void 0,_),function(Zt){var vt=dt.__N?dt.__N[0]:dt.__[0],te=dt.t(vt,Zt);vt!==te&&(dt.__N=[te,dt.__[1]],dt.__c.setState({}))}],dt.__c=K,!K.u)){var ct=function(Zt,vt,te){if(!dt.__c.__H)return!0;var le=dt.__c.__H.__.filter((function(Yt){return!!Yt.__c}));if(le.every((function(Yt){return!Yt.__N})))return!st||st.call(this,Zt,vt,te);var ht=!1;return le.forEach((function(Yt){if(Yt.__N){var ee=Yt.__[0];Yt.__=Yt.__N,Yt.__N=void 0,ee!==Yt.__[0]&&(ht=!0)}})),!(!ht&&dt.__c.props===Zt)&&(!st||st.call(this,Zt,vt,te))};K.u=!0;var st=K.shouldComponentUpdate,pt=K.componentWillUpdate;K.componentWillUpdate=function(Zt,vt,te){if(this.__e){var le=st;st=void 0,ct(Zt,vt,te),st=le}pt&&pt.call(this,Zt,vt,te)},K.shouldComponentUpdate=ct}return dt.__N||dt.__}function lt($,_){var k=ot(B++,3);!Y.__s&&xt(k.__H,_)&&(k.__=$,k.i=_,K.__H.__h.push(k))}function at($){return J=5,ft((function(){return{current:$}}),[])}function ft($,_){var k=ot(B++,7);return xt(k.__H,_)?(k.__V=$(),k.i=_,k.__h=$,k.__V):k.__}function yt(){for(var $;$=Q.shift();)if($.__P&&$.__H)try{$.__H.__h.forEach(bt),$.__H.__h.forEach(Ct),$.__H.__h=[]}catch(_){$.__H.__h=[],Y.__e(_,$.__v)}}Y.__b=function($){K=null,Z&&Z($)},Y.__=function($,_){$&&_.__k&&_.__k.__m&&($.__m=_.__k.__m),rt&&rt($,_)},Y.__r=function($){tt&&tt($),B=0;var _=(K=$.__c).__H;_&&(z===K?(_.__h=[],K.__h=[],_.__.forEach((function(k){k.__N&&(k.__=k.__N),k.__V=X,k.__N=k.i=void 0}))):(_.__h.forEach(bt),_.__h.forEach(Ct),_.__h=[],B=0)),z=K},Y.diffed=function($){nt&&nt($);var _=$.__c;_&&_.__H&&(_.__H.__h.length&&(Q.push(_)!==1&&G===Y.requestAnimationFrame||((G=Y.requestAnimationFrame)||kt)(yt)),_.__H.__.forEach((function(k){k.i&&(k.__H=k.i),k.__V!==X&&(k.__=k.__V),k.i=void 0,k.__V=X}))),z=K=null},Y.__c=function($,_){_.some((function(k){try{k.__h.forEach(bt),k.__h=k.__h.filter((function(dt){return!dt.__||Ct(dt)}))}catch(dt){_.some((function(ct){ct.__h&&(ct.__h=[])})),_=[],Y.__e(dt,k.__v)}})),et&&et($,_)},Y.unmount=function($){_t&&_t($);var _,k=$.__c;k&&k.__H&&(k.__H.__.forEach((function(dt){try{bt(dt)}catch(ct){_=ct}})),k.__H=void 0,_&&Y.__e(_,k.__v))};var gt=typeof requestAnimationFrame=="function";function kt($){var _,k=function(){clearTimeout(dt),gt&&cancelAnimationFrame(_),setTimeout($)},dt=setTimeout(k,100);gt&&(_=requestAnimationFrame(k))}function bt($){var _=K,k=$.__c;typeof k=="function"&&($.__c=void 0,k()),K=_}function Ct($){var _=K;$.__c=$.__(),K=_}function xt($,_){return!$||$.length!==_.length||_.some((function(k,dt){return k!==$[dt]}))}function wt($,_){return typeof _=="function"?_($):_}var Pt=function($,_,k,dt){var ct;_[0]=0;for(var st=1;st<_.length;st++){var pt=_[st++],Zt=_[st]?(_[0]|=pt?1:2,k[_[st++]]):_[++st];pt===3?dt[0]=Zt:pt===4?dt[1]=Object.assign(dt[1]||{},Zt):pt===5?(dt[1]=dt[1]||{})[_[++st]]=Zt:pt===6?dt[1][_[++st]]+=Zt+"":pt?(ct=$.apply(Zt,Pt($,Zt,k,["",null])),dt.push(ct),Zt[0]?_[0]|=2:(_[st-2]=0,_[st]=ct)):dt.push(Zt)}return dt},Ut=new Map;function Ht($){var _=Ut.get(this);return _||(_=new Map,Ut.set(this,_)),(_=Pt(this,_.get($)||(_.set($,_=(function(k){for(var dt,ct,st=1,pt="",Zt="",vt=[0],te=function(Yt){st===1&&(Yt||(pt=pt.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?vt.push(0,Yt,pt):st===3&&(Yt||pt)?(vt.push(3,Yt,pt),st=2):st===2&&pt==="..."&&Yt?vt.push(4,Yt,0):st===2&&pt&&!Yt?vt.push(5,0,!0,pt):st>=5&&((pt||!Yt&&st===5)&&(vt.push(st,0,pt,ct),st=6),Yt&&(vt.push(st,Yt,0,ct),st=6)),pt=""},le=0;le<k.length;le++){le&&(st===1&&te(),te(le));for(var ht=0;ht<k[le].length;ht++)dt=k[le][ht],st===1?dt==="<"?(te(),vt=[vt],st=3):pt+=dt:st===4?pt==="--"&&dt===">"?(st=1,pt=""):pt=dt+pt[0]:Zt?dt===Zt?Zt="":pt+=dt:dt==='"'||dt==="'"?Zt=dt:dt===">"?(te(),st=1):st&&(dt==="="?(st=5,ct=pt,pt=""):dt==="/"&&(st<5||k[le][ht+1]===">")?(te(),st===3&&(vt=vt[0]),st=vt,(vt=vt[0]).push(2,0,st),st=0):dt===" "||dt==="	"||dt===`
`||dt==="\r"?(te(),st=2):pt+=dt),st===3&&pt==="!--"&&(st=4,vt=vt[0])}return te(),vt})($)),_),arguments,[])).length>1?_:_[0]}var Et=Ht.bind(y),St={};function At($,_){for(var k in _)$[k]=_[k];return $}function Dt($,_,k){var dt,ct=/(?:\?([^#]*))?(#.*)?$/,st=$.match(ct),pt={};if(st&&st[1])for(var Zt=st[1].split("&"),vt=0;vt<Zt.length;vt++){var te=Zt[vt].split("=");pt[decodeURIComponent(te[0])]=decodeURIComponent(te.slice(1).join("="))}$=Tt($.replace(ct,"")),_=Tt(_||"");for(var le=Math.max($.length,_.length),ht=0;ht<le;ht++)if(_[ht]&&_[ht].charAt(0)===":"){var Yt=_[ht].replace(/(^:|[+*?]+$)/g,""),ee=(_[ht].match(/[+*?]+$/)||St)[0]||"",ue=~ee.indexOf("+"),fe=~ee.indexOf("*"),be=$[ht]||"";if(!be&&!fe&&(ee.indexOf("?")<0||ue)){dt=!1;break}if(pt[Yt]=decodeURIComponent(be),ue||fe){pt[Yt]=$.slice(ht).map(decodeURIComponent).join("/");break}}else if(_[ht]!==$[ht]){dt=!1;break}return(k.default===!0||dt!==!1)&&pt}function Nt($,_){return $.rank<_.rank?1:$.rank>_.rank?-1:$.index-_.index}function Rt($,_){return $.index=_,$.rank=(function(k){return k.props.default?0:Tt(k.props.path).map(Mt).join("")})($),$.props}function Tt($){return $.replace(/(^\/+|\/+$)/g,"").split("/")}function Mt($){return $.charAt(0)==":"?1+"*+?".indexOf($.charAt($.length-1))||4:5}var Lt={},Wt=[],Ft=[],It=null,Vt={url:jt()},Ot=q(Vt);function jt(){var $;return""+(($=It&&It.location?It.location:It&&It.getCurrentLocation?It.getCurrentLocation():typeof location<"u"?location:Lt).pathname||"")+($.search||"")}function qt($,_){return _===void 0&&(_=!1),typeof $!="string"&&$.url&&(_=$.replace,$=$.url),(function(k){for(var dt=Wt.length;dt--;)if(Wt[dt].canRoute(k))return!0;return!1})($)&&(function(k,dt){dt===void 0&&(dt="push"),It&&It[dt]?It[dt](k):typeof history<"u"&&history[dt+"State"]&&history[dt+"State"](null,null,k)})($,_?"replace":"push"),Bt($)}function Bt($){for(var _=!1,k=0;k<Wt.length;k++)Wt[k].routeTo($)&&(_=!0);return _}function Kt($){if($&&$.getAttribute){var _=$.getAttribute("href"),k=$.getAttribute("target");if(_&&_.match(/^\//g)&&(!k||k.match(/^_?self$/i)))return qt(_)}}function zt($){return $.stopImmediatePropagation&&$.stopImmediatePropagation(),$.stopPropagation&&$.stopPropagation(),$.preventDefault(),!1}function Gt($){if(!($.ctrlKey||$.metaKey||$.altKey||$.shiftKey||$.button)){var _=$.target;do if(_.localName==="a"&&_.getAttribute("href")){if(_.hasAttribute("data-native")||_.hasAttribute("native"))return;if(Kt(_))return zt($)}while(_=_.parentNode)}}var Jt=!1;function Qt($){$.history&&(It=$.history),this.state={url:$.url||jt()}}At(Qt.prototype=new C,{shouldComponentUpdate:function($){return $.static!==!0||$.url!==this.props.url||$.onChange!==this.props.onChange},canRoute:function($){var _=A(this.props.children);return this.g(_,$)!==void 0},routeTo:function($){this.setState({url:$});var _=this.canRoute($);return this.p||this.forceUpdate(),_},componentWillMount:function(){this.p=!0},componentDidMount:function(){var $=this;Jt||(Jt=!0,It||addEventListener("popstate",(function(){Bt(jt())})),addEventListener("click",Gt)),Wt.push(this),It&&(this.u=It.listen((function(_){var k=_.location||_;$.routeTo(""+(k.pathname||"")+(k.search||""))}))),this.p=!1},componentWillUnmount:function(){typeof this.u=="function"&&this.u(),Wt.splice(Wt.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function($,_){$=$.filter(Rt).sort(Nt);for(var k=0;k<$.length;k++){var dt=$[k],ct=Dt(_,dt.props.path,dt.props);if(ct)return[dt,ct]}},render:function($,_){var k,dt,ct=$.onChange,st=_.url,pt=this.c,Zt=this.g(A($.children),st);if(Zt&&(dt=j(Zt[0],At(At({url:st,matches:k=Zt[1]},k),{key:void 0,ref:void 0}))),st!==(pt&&pt.url)){At(Vt,pt=this.c={url:st,previous:pt&&pt.url,current:dt,path:dt?dt.props.path:null,matches:k}),pt.router=this,pt.active=dt?[dt]:[];for(var vt=Ft.length;vt--;)Ft[vt]({});typeof ct=="function"&&ct(pt)}return y(Ot.Provider,{value:pt},dt)}});const switchIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='652.000000pt'%20height='956.000000pt'%20viewBox='0%200%20652.000000%20956.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,956.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M1150%209540%20c-386%20-6%20-408%20-8%20-475%20-29%20-147%20-48%20-255%20-115%20-368%20-226%20-93%20-91%20-145%20-159%20-191%20-250%20-74%20-146%20-77%20-163%20-87%20-455%20-10%20-318%20-14%20-7639%20-4%20-7725%2025%20-214%20107%20-394%20245%20-539%20115%20-121%20227%20-192%20408%20-260%20l72%20-28%202418%20-1%20c2586%20-2%202582%20-2%202716%2047%20254%2092%20492%20346%20573%20611%2017%2058%2018%20211%2018%204095%20l0%204035%20-23%2075%20c-61%20193%20-204%20388%20-368%20501%20-76%2052%20-226%20118%20-294%20129%20-36%206%20-229%2015%20-430%2020%20-398%2010%20-3557%2010%20-4210%200z%20m4610%20-328%20c164%20-59%20291%20-175%20374%20-339%20l36%20-73%200%20-4016%200%20-4016%20-45%20-88%20c-25%20-48%20-70%20-115%20-101%20-148%20-64%20-71%20-175%20-148%20-242%20-168%20-103%20-32%20-400%20-35%20-2687%20-32%20-2180%203%20-2282%204%20-2335%2022%20-204%2068%20-363%20240%20-417%20452%20-17%2065%20-18%20275%20-18%203979%200%203785%201%203912%2019%203980%2024%2091%2084%20207%20140%20271%2055%2062%20182%20152%20244%20171%2027%208%20121%2018%20222%2022%2096%205%201203%208%202460%207%20l2285%20-1%2065%20-23z'/%3e%3cpath%20d='M1434%208128%20l-45%20-41%203%20-3291%20c3%20-3127%204%20-3293%2021%20-3323%209%20-18%2029%20-41%2044%20-50%2026%20-17%20125%20-18%201799%20-18%201918%200%201808%20-3%201834%2054%207%2014%2016%2067%2021%20116%205%2050%209%20789%209%201644%20l0%201554%20249%20981%20c358%201405%20401%201581%20401%201626%200%2051%204%2046%20-414%20468%20l-321%20322%20-1778%200%20-1777%200%20-46%20-42z%20m3636%20-425%20l165%20-168%20-185%20-6%20c-102%20-4%20-770%20-7%20-1485%20-8%20l-1300%20-1%20-145%20148%20c-80%2081%20-156%20159%20-170%20175%20l-23%2027%201489%200%201490%200%20164%20-167z%20m-3078%20-356%20l31%20-38%20-147%20-583%20c-81%20-320%20-153%20-602%20-160%20-626%20-12%20-39%20-13%20-23%20-19%20185%20-9%20291%20-9%20823%200%201123%20l6%20233%20129%20-128%20c71%20-70%20143%20-145%20160%20-166z%20m2900%20-136%20c278%20-3%20510%20-9%20513%20-13%2010%20-10%203%20-40%20-305%20-1260%20l-280%20-1107%200%20-1565%200%20-1566%20-1565%200%20-1565%200%200%201521%200%201520%20310%201226%20c171%20675%20313%201229%20316%201232%2014%2014%201788%2022%202576%2012z'/%3e%3cpath%20d='M3765%206820%20c-61%20-25%20-87%20-94%20-185%20-473%20-80%20-315%20-120%20-493%20-120%20-540%200%20-77%2078%20-141%20163%20-134%2069%206%20101%2040%20131%20141%2057%20190%20197%20746%20212%20843%205%2032%201%2053%20-19%2096%20-22%2048%20-30%2057%20-64%2066%20-44%2013%20-90%2013%20-118%201z'/%3e%3cpath%20d='M3098%203406%20c-104%20-37%20-216%20-134%20-264%20-227%20-24%20-47%20-28%20-71%20-35%20-184%20-19%20-311%20-7%20-500%2037%20-586%2040%20-80%20113%20-151%20201%20-195%20l76%20-39%20151%200%20151%200%2068%2034%20c81%2041%20167%20128%20215%20218%20l32%2061%200%20302%200%20302%20-41%2078%20c-65%20127%20-156%20201%20-284%20235%20-73%2019%20-255%2019%20-307%201z%20m262%20-311%20c58%20-30%2064%20-57%2068%20-301%204%20-219%204%20-222%20-19%20-253%20-65%20-88%20-230%20-95%20-286%20-13%20-16%2024%20-18%2055%20-21%20273%20l-3%20246%2038%2030%20c21%2017%2045%2033%2053%2036%2025%2011%20137%20-1%20170%20-18z'/%3e%3c/g%3e%3c/svg%3e",buttonIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M790%201280%20l0%20-420%2065%200%2065%200%200%20420%200%20420%20-65%200%20-65%200%200%20-420z'/%3e%3cpath%20d='M489%201612%20c-228%20-114%20-386%20-309%20-451%20-557%20-29%20-110%20-29%20-297%200%20-406%2081%20-301%20308%20-530%20607%20-610%20112%20-30%20307%20-30%20420%200%20294%2077%20529%20312%20606%20606%2029%20110%2030%20307%201%20416%20-67%20251%20-245%20462%20-477%20565%20l-55%2024%200%20-74%200%20-74%2072%20-42%20c280%20-167%20411%20-508%20313%20-817%20-35%20-110%20-88%20-196%20-175%20-283%20-87%20-87%20-172%20-139%20-285%20-177%20-70%20-23%20-96%20-27%20-210%20-27%20-114%200%20-140%204%20-210%2027%20-293%2097%20-495%20372%20-495%20673%200%2070%2025%20193%2055%20266%2054%20133%20182%20279%20299%20339%20l66%2034%200%2078%20c0%2042%20-1%2077%20-2%2077%20-2%200%20-37%20-18%20-79%20-38z'/%3e%3c/g%3e%3c/svg%3e",timerIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M818%201670%20c-24%20-15%20-31%20-77%20-23%20-221%208%20-141%2015%20-159%2064%20-159%2050%200%2060%2024%2063%20150%20l3%20115%2030%20-3%20c172%20-19%20366%20-132%20472%20-275%2094%20-129%20133%20-236%20140%20-392%206%20-142%20-12%20-230%20-73%20-355%20-82%20-165%20-236%20-296%20-419%20-357%20-71%20-24%20-95%20-27%20-215%20-27%20-118%200%20-145%203%20-212%2026%20-123%2041%20-204%2092%20-298%20187%20-68%2068%20-94%20103%20-127%20171%20-61%20125%20-76%20203%20-71%20352%206%20153%2036%20243%20122%20371%2064%2095%2068%20127%2021%20149%20-39%2017%20-68%202%20-113%20-59%20-94%20-127%20-150%20-285%20-159%20-449%20-23%20-399%20236%20-749%20632%20-855%20111%20-30%20297%20-30%20410%200%20449%20119%20716%20562%20610%201011%20-23%2095%20-105%20254%20-173%20336%20-111%20131%20-276%20234%20-442%20274%20-89%2021%20-213%2026%20-242%2010z'/%3e%3cpath%20d='M452%201258%20c-7%20-7%20-12%20-17%20-12%20-23%200%20-21%20330%20-469%20358%20-487%2043%20-28%20106%20-23%20143%2010%2043%2038%2052%20113%2020%20154%20-20%2025%20-454%20342%20-484%20354%20-7%202%20-18%20-1%20-25%20-8z'/%3e%3c/g%3e%3c/svg%3e",owIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='110.000000pt'%20height='52.000000pt'%20viewBox='0%200%20110.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M171%20500%20c-50%20-12%20-83%20-41%20-111%20-96%20-22%20-43%20-25%20-62%20-24%20-149%200%20-141%2027%20-199%20109%20-236%2073%20-33%20180%20-16%20227%2037%2067%2076%2074%20284%2013%20376%20-39%2059%20-133%2089%20-214%2068z%20m119%20-65%20c50%20-26%2065%20-67%2065%20-180%200%20-146%20-32%20-195%20-128%20-195%20-40%200%20-54%205%20-77%2028%20-16%2016%20-34%2049%20-40%2073%20-16%2056%20-7%20186%2014%20227%2030%2057%20105%2078%20166%2047z'/%3e%3cpath%20d='M482%20483%20c3%20-10%2029%20-120%2058%20-245%20l54%20-228%2038%200%20c43%200%2035%20-20%2089%20215%2017%2077%2035%20146%2038%20152%204%207%2026%20-73%2051%20-178%20l44%20-190%2039%203%2040%203%2058%20240%20c32%20132%2058%20241%2059%20243%200%202%20-15%202%20-32%200%20l-32%20-3%20-43%20-180%20c-23%20-99%20-44%20-187%20-46%20-195%20-2%20-8%20-25%2074%20-51%20183%20l-48%20198%20-36%20-3%20-36%20-3%20-45%20-194%20c-25%20-106%20-47%20-188%20-49%20-181%20-3%207%20-23%2095%20-46%20194%20l-42%20181%20-33%203%20c-28%203%20-33%201%20-29%20-15z'/%3e%3c/g%3e%3c/svg%3e",encoderIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='34.000000pt'%20height='52.000000pt'%20viewBox='0%200%2034.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M30%20255%20l0%20-245%20150%200%20150%200%200%2030%200%2030%20-115%200%20-115%200%200%2085%200%2085%2095%200%2095%200%200%2030%200%2030%20-95%200%20-95%200%200%2070%200%2070%20115%200%20115%200%200%2030%200%2030%20-150%200%20-150%200%200%20-245z'/%3e%3c/g%3e%3c/svg%3e",Icons={switchIcon:$=>Et`
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
    </svg>`},tipColors={green:"bg-green-100 text-green-900 ring-green-300",yellow:"bg-yellow-100 text-yellow-900 ring-yellow-300"};function Button({title:$,onclick:_,disabled:k,cls:dt,icon:ct,ref:st,colors:pt,hovercolor:Zt,disabledcolor:vt}){const[te,le]=ut(!1),ht=function(Yt){const ee=_?_():null;ee&&typeof ee.catch=="function"&&(le(!0),ee.catch(()=>!1).then(()=>le(!1)))};return pt||(pt="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400"),Et` <button
    type="button"
    class="inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${pt} ${dt}"
    ref=${st}
    onclick=${ht}
    disabled=${k||te}
  >
    ${$}
    <${te?Icons.refresh:ct} class="w-4 ${te?"animate-spin":""}" />
  <//>`}function Login({loginFn:$,logoIcon:_,title:k,tipText:dt}){const[ct,st]=ut(""),[pt,Zt]=ut(""),vt=function(te){const ht={Authorization:"Basic "+btoa(ct+":"+pt)};return fetch("api/login",{headers:ht}).then($).finally(Yt=>Zt(""))};return Et` <div
    class="h-full flex items-center justify-center bg-slate-200"
  >
    <div class="border rounded bg-white w-96 p-5">
      <div class="my-5 py-2 flex items-center justify-center gap-x-4">
        <${_} class="h-12 stroke-cyan-600 stroke-1" />
        <h1 class="font-bold text-xl">${k||"Login"}<//>
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
          oninput=${te=>st(te.target.value)}
          value=${ct}
        />
      <//>
      <div class="my-3">
        <label class="block text-sm mb-1 dark:text-white">Password</label>
        <input
          type="password"
          autocomplete="current-password"
          required
          class="font-normal bg-white rounded border border-gray-300 w-full flex-1 py-0.5 px-2 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
          oninput=${te=>Zt(te.target.value)}
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
      <div class="mt-5 text-slate-400 text-xs">${dt}<//>
    <//>
  <//>`}function Colored({icon:$,text:_,colors:k}){return k||(k="bg-slate-100 text-slate-900"),Et` <span class="inline-flex items-center gap-1.5 py-0.5">
    ${$&&Et`<${$} class="w-5 h-5" />`}
    <span
      class="inline-block font-medium rounded-md px-2 py-1 text-xs ring-1 ring-inset ${k}"
      >${_}<//
    >
  <//>`}function Stat({title:$,text:_,tipText:k,tipIcon:dt,tipColors:ct,colors:st}){return Et` <div
    class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800"
  >
    <div class="overflow-auto rounded-lg bg-white px-4 py-2 ">
      <div class="flex items-center gap-x-2">
        <p class="text-sm truncate text-gray-500 font-medium">${$}</p>
      <//>
      <div class="mt-1 flex items-center gap-x-2">
        <h3
          class="text-xl truncate font-semibold tracking-tight ${st||"text-gray-800 dark:text-gray-200"}"
        >
          ${_}
        <//>
        <span class="flex items-center ${k||"hidden"}">
          <${Colored} text=${k} icon=${dt} colors=${ct} />
        <//>
      <//>
    <//>
  <//>`}function TextValue({value:$,setfn:_,disabled:k,placeholder:dt,type:ct,addonRight:st,addonLeft:pt,attr:Zt,min:vt,max:te,pattern:le,myclass:ht,step:Yt,mult:ee}){const[ue,fe]=ut("bg-white");lt(()=>{ct=="number"&&be(+vt,+te,+$)},[]),Yt||(Yt="1"),ee||(ee=1);const be=function(ne,$e,Ee){fe("bg-white"),ne&&Ee<ne&&fe("bg-red-100 border-red-200"),$e&&Ee>$e&&fe("bg-red-100 border-red-200")},pe=Yt.match(/^.+\.(.+)/),me=pe?pe[1].length:0,xe=ne=>{let $e=ne.target.value;ct=="number"&&(be(+vt,+te,+$e),$e=+(parseFloat($e)/ee).toFixed(me)),_($e)};return ct=="number"&&($=+($*ee).toFixed(me)),Et` <div
    class="flex w-full items-center rounded border shadow-sm ${ue}"
  >
    ${pt&&Et`<span
      class="inline-flex font-normal truncate py-1 border-r bg-slate-100 items-center border-gray-300 px-2 text-gray-500 text-xs"
      >${pt}<//
    >`}
    <input
      type=${ct||"text"}
      disabled=${k}
      value=${$}
      step=${Yt}
      min=${vt}
      max=${te}
      pattern=${le}
      onchange=${xe}
      ...${Zt}
      class="${ue} font-normal text-sm rounded w-full flex-1 py-0.5 px-2 text-gray-700 placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 ${ht}"
      placeholder=${dt}
    />
    ${st&&Et`<span
      class="inline-flex font-normal truncate py-1 border-l bg-slate-100 items-center border-gray-300 px-2 text-gray-500 text-xs overflow-scroll"
      style="min-width: 50%;"
      >${st}<//
    >`}
  <//>`}function SelectValue({value:$,setfn:_,options:k,disabled:dt}){const ct=pt=>pt==parseInt(pt)?parseInt(pt):pt;return Et` <select
    onchange=${pt=>_(ct(pt.target.value))}
    class="w-full rounded font-normal border py-0.5 px-1 text-gray-600 focus:outline-none text-sm disabled:cursor-not-allowed"
    disabled=${dt}
  >
    ${k.map(pt=>Et`<option value=${pt[0]} selected=${pt[0]==$}>${pt[1]}<//>`)}
  <//>`}function SwitchValue({value:$,setfn:_}){return Et` <button
    type="button"
    onclick=${st=>_(!$)}
    class="${$?"bg-blue-600":"bg-gray-200"} inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0 ring-0"
    role="switch"
    aria-checked=${!!$}
  >
    <span
      aria-hidden="true"
      class="${$?"translate-x-5":"translate-x-0"} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 focus:ring-0 transition duration-200 ease-in-out"
    ></span>
  </button>`}function Setting($){let _=TextValue;return $.type=="switch"&&(_=SwitchValue),$.type=="select"&&(_=SelectValue),Et` <div class=${$.cls||"grid grid-cols-2 gap-2 my-1"}>
    <label
      class="flex items-center text-sm text-gray-700 mr-2 font-medium ${$.title||"hidden"}"
      >${$.title}<//
    >
    <div class="flex items-center">${y(_,$)}<//>
  <//>`}const ruLangswitch=["","ID - уникальный числовой идентификатор пина. Присваивается автоматически","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки:","Relay connection - Здесь указаны пины одного реле или несколько с которыми взаимодействует данная кнопка.",'INFO - Укажите название данной кнопки для быстрой навигации на пример "Кухня", "Детская" и т.д. Не более 30-ти символов!','On/Off - "Вкл""Откл" данный пин/выключатель.',"Action - Возможные действия с данным пином."],rulangbutton=["","ID - уникальный числовой идентификатор пина. Присваивается автоматически","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки:","sclick - 'On' или 'OFF' т.е. нужно ли отслеживать одиночное нажатие кнопки или нет?","dclick - 'On' или 'OFF' т.е. нужно ли отслеживать двойное нажатие кнопки или нет?","lpress - 'On' или 'OFF' т.е. нужно ли отслеживать долгое нажатие кнопки или нет?","Relay connection - Здесь указаны пины одного реле или несколько с которыми взаимодействует данная кнопка.",'INFO - Укажите название данной кнопки для быстрой навигации на пример "Кухня", "Детская" и т.д. Не более 30-ти символов!','On/Off - "Вкл""Откл" данный пин/выключатель.',"Action - Возможные действия с данным пином."],ruencoder=["","ID - уникальный числовой идентификатор пина. Присваивается автоматически","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки:","sclick - 'On' или 'OFF' т.е. нужно ли отслеживать одиночное нажатие кнопки или нет?","dclick - 'On' или 'OFF' т.е. нужно ли отслеживать двойное нажатие кнопки или нет?","lpress - 'On' или 'OFF' т.е. нужно ли отслеживать долгое нажатие кнопки или нет?","Relay connection - Здесь указаны пины одного реле или несколько с которыми взаимодействует данная кнопка.",'INFO - Укажите название данной кнопки для быстрой навигации на пример "Кухня", "Детская" и т.д. Не более 30-ти символов!','On/Off - "Вкл""Откл" данный пин/выключатель.',"Action - Возможные действия с данным пином."],rulangtimers=["","ID - уникальный числовой идентификатор cron. Присваивается автоматически.","Сконфигурируйте cron.","Какое действие должно выполниться в указанное в таймере времени.",'INFO - Дайте название выбранному таймеру для быстрой навигации на пример "Полив газона", "Свет во дворе" и т.д. Не более 30-ти символов!',"Action - Возможные действия с данным таймером."],rulange1Wire=["","ID - уникальный числовой идентификатор cron. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","PWM frequency (Hz) - PWM frequency in Hertz. If 0, then PWM is not used.","ON - State of pin -1 is 'On', 0 is 'Off'.",'INFO - Дайте название выбранному таймеру для быстрой навигации на пример "Полив газона", "Свет во дворе" и т.д. Не более 30-ти символов!','On/Off - "Вкл"/"Откл" данное реле.'],enLangswitch=["","ID - is a unique numerical identifier of the pin. Assigned automatically","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","Relay connection - Here will appear one or more relays of pin(s) with which this button interacts.",'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - 'On' or 'Off' this pin/switch.","Action - Some actions with this pin."],enlangbutton=["","ID - is a unique numerical identifier of the pin. Assigned automatically","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","sclick - Do I need to track the single pressing of the button or not","dclick - Do I need to track the double pressing of the button or not","lpress - Do I need to track the long pressing of the button or not","Relay connection - Here will appear one or more relays of pin(s) with which this button interacts.",'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - 'On' or 'Off' this pin/switch.","Action - Some actions with this pin."],enencoder=["","ID - is a unique numerical identifier of the pin. Assigned automatically","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","sclick - Do I need to track the single pressing of the button or not","dclick - Do I need to track the double pressing of the button or not","lpress - Do I need to track the long pressing of the button or not","Relay connection - Here will appear one or more relays of pin(s) with which this button interacts.",'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - 'On' or 'Off' this pin/switch.","Action - Some actions with this pin."],enlangtimers=["","ID - is a unique numerical identifier of the cron. Assigned automatically","Configure a cron.","What action must be performed at the time specified in the timer.",'INFO - Give a name to the selected timer for quick navigation, e.g."Lawn Watering", "Backyard Light", etc. No more than 30 characters!',"Action - Some actions with this cron."],enlange1Wire=["","ID - is a unique numerical identifier of the pin. Assigned automatically","PIN - The unique number of the digital or analog pin.","PWM frequency (Hz) - PWM frequency in Hertz. If 0, then PWM is not used.","ON - State of pin -1 is 'On', 0 is 'Off'.",'INFO - Give a name to the selected relay for quick navigation, e.g."Kitchen", "Kids room", etc. No more than 30 characters!',"On/Off - 'On' or 'Off' this relay."],Logo=$=>Et`<svg
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
  </svg>`;function Header({logout:$,user:_,setShowSidebar:k,showSidebar:dt}){const[ct,st]=ut(new Date),[pt,Zt]=ut(null),vt=(Yt,ee)=>new Date(Yt.year+1900,Yt.mon,Yt.mday,Yt.hour,Yt.min,Yt.sec),te=async()=>{try{const ee=await(await fetch("/api/stm32-time")).text();let ue;try{ue=JSON.parse(ee)}catch{return}ue.status&&ue.time?Zt(vt(ue.time,ue.timezone)):Zt(null)}catch{Zt(null)}};lt(()=>{const Yt=setInterval(()=>st(new Date),1e3),ee=setInterval(te,1e3);return te(),()=>{clearInterval(Yt),clearInterval(ee)}},[]);const le=Yt=>Yt.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric"}),ht=Yt=>Yt.toLocaleTimeString("ru-RU");return Et`
    <div
      class="bg-white sticky top-0 z-[48] w-full border-b py-2 ${dt?"pl-72":""} transition-all duration-300 transform"
    >
      <div class="px-2 w-full py-0 my-0 flex items-center justify-between">
        <button
          type="button"
          onclick=${()=>k(Yt=>!Yt)}
          class="text-slate-400"
        >
          <${Icons.bars3} class="h-6" />
        </button>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600">
            Дата: ${le(ct)}<span style="margin-left: 8px;"></span
            >Время: ${ht(ct)}
          </span>
        </div>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600"
            >STM32 дата:
            ${pt?le(pt):" 00.00.0000"}<span
              style="margin-left: 8px;"
            ></span
            >Время: ${pt?ht(pt):"00:00"}
          </span>
        </div>
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <span class="text-sm text-slate-400">logged in as: ${_}</span>
          <div
            class="hidden lg:block lg:h-4 lg:w-px lg:bg-gray-200"
            aria-hidden="true"
          ></div>
          <${Button} title="Logout" icon=${Icons.logout} onclick=${$} />
        </div>
      </div>
    </div>
  `}function Sidebar({url:$,show:_}){const k=({title:dt,icon:ct,href:st,url:pt})=>Et`
  <div>
    <a href="#${st}" class="${st==pt?"bg-slate-50 text-blue-600 group":"text-gray-700 hover:text-blue-600 hover:bg-gray-50 group"} flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
      <${ct} class="w-6 h-6"/>
      ${dt}
    <///>
  <//>`;return Et` <div
    class="bg-violet-100 hs-overlay hs-overlay-open:translate-x-0
            -translate-x-full transition-all duration-300 transform
            fixed top-0 left-0 bottom-0 z-[60] w-72 bg-white border-r
            border-gray-200 overflow-y-auto scrollbar-y
            ${_&&"translate-x-0"} right-auto bottom-0"
  >
    <div class="flex flex-col m-4 gap-y-6">
      <div
        class="flex h-10 shrink-0 items-center gap-x-4 font-bold text-xl text-slate-500"
      >
        <${Logo} class="h-full" /> Zagotovka
      <//>
      <div class="flex flex-1 flex-col">
        <${k} title="Dashboard" icon=${Icons.home} href="/" url=${$} />
        <${k}
          title="Select pin"
          icon=${Icons.bars4}
          href="/selects"
          url=${$}
        />
        <${k}
          title="Switch pin"
          icon=${Icons.switchIcon}
          href="/switch"
          url=${$}
        />
        <${k}
          title="Button pin "
          icon=${Icons.buttonIcon}
          href="/button"
          url=${$}
        />
        <${k}
          title="Encoder pin"
          icon=${Icons.encoderIcon}
          href="/encoder"
          url=${$}
        />
        <${k}
          title="Timers (cron)"
          icon=${Icons.timerIcon}
          href="/cron"
          url=${$}
        />
        <${k}
          title="OneWire pin"
          icon=${Icons.owIcon}
          href="/1wire"
          url=${$}
        />
        <${k}
          title="SIM800L/Security"
          icon=${Icons.cog}
          href="/Security"
          url=${$}
        />
        <${k}
          title="Settings"
          icon=${Icons.cog}
          href="/settings"
          url=${$}
        />
        <${k}
          title="Firmware Update"
          icon=${Icons.download}
          href="/update"
          url=${$}
        />
      <//>
    <//>
  <//>`}function Chart({data:$}){const _=$.length,k=20,dt=15,ct=100,st=5,pt=10,Zt=25,vt=Yt=>(ct-pt)/st*(Yt+1),te=Yt=>(ct-pt)*Yt/100,le=Yt=>ct-pt-te(Yt),ht=(Yt,ee,ue)=>Array.from({length:ee},(fe,be)=>be*1+Yt);return Et` <div
    class="my-4 divide-y divide-gray-200 overflow-auto rounded bg-white"
  >
    <div class="font-light uppercase flex items-center text-gray-600 px-4 py-2">
      Temperature, last 24h
    <//>
    <div class="relative">
      <svg class="bg-yellow-x50 w-full p-4" viewBox="0 0 ${_*k+dt} ${ct}">
        ${ht(0,st).map(Yt=>Et`
            <line
              x1="0"
              y1=${vt(Yt)}
              x2=${dt+_*k}
              y2=${vt(Yt)}
              stroke-width="0.3"
              class="stroke-slate-300"
              stroke-dasharray="1,1"
            />
            <text x="0" y=${vt(Yt)-2} class="text-[6px] fill-slate-400"
              >${Zt-Zt/st*(Yt+1)}<//
            >
          `)}
        ${ht(0,_).map(Yt=>Et`
            <rect
              x=${dt+Yt*k}
              y=${le($[Yt]*100/Zt)}
              width="12"
              height=${te($[Yt]*100/Zt)}
              rx="2"
              class="fill-cyan-500"
            />
            <text x=${dt+Yt*k} y="100" class="text-[6px] fill-slate-400"
              >${Yt*2}:00<//
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
      ${($||"").split(".").map(k=>Et` <p class="my-2 ">${k}<//>`)}
      ${_}
    <//>
  <//>`}function Main({}){const[$,_]=ut(null);return lt(()=>fetch("api/stats/get").then(dt=>dt.json()).then(dt=>_(dt)),[]),$?Et` <div class="p-2">
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
    <label class="switch">
      <input type="checkbox" checked=${$} onChange=${dt=>{_(dt.target.checked?1:0)}} />
      <span class="slider"></span>
    </label>
    <span class="switch-status">${$?"On":"Off"}</span>
    <style>
      .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
        vertical-align: middle;
        margin-left: 10px;
      }
      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 34px;
      }
      .slider:before {
        position: absolute;
        content: '';
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
      }
      input:checked + .slider {
        background-color: #2196f3;
      }
      input:checked + .slider:before {
        transform: translateX(26px);
      }
      .switch-status {
        margin-left: 10px;
        vertical-align: middle;
      }
    </style>
  `;function TabSelect({}){const[$,_]=ut(null),[k,dt]=ut({}),[ct,st]=ut(null),[pt,Zt]=ut(!1),[vt,te]=ut(3),[le,ht]=ut(!1),[Yt,ee]=ut("ru"),ue=ne=>{ht(ne)},fe=ne=>le&&(ne===1||ne===35),be=()=>fetch("api/select/get").then(ne=>ne.json()).then(ne=>{const $e=ne.data||ne;_($e),ht(ne.sim800l===1);const Ee={};$e.forEach(_e=>{Ee[`topin_${_e.id}`]=_e.topin.toString()}),dt(Ee)});lt(be,[]),lt(()=>{let ne;return pt&&vt>0?ne=setTimeout(()=>{te(vt-1)},1e3):vt===0&&(Zt(!1),st(null)),()=>clearTimeout(ne)},[pt,vt]);const pe=async ne=>{ne.preventDefault();const $e=new FormData(ne.target),Ee={lang:Yt,sim800l:le?1:0,data:[]};$.forEach(_e=>{const Ie=$e.get(`topin_${_e.id}`);Ee.data.push({id:_e.id,pins:_e.pins,topin:parseInt(Ie),pwm:_e.pwm,i2cdata:_e.i2cdata,i2cclok:_e.i2cclok})}),st("submitting"),Zt(!0),te(3);try{const _e=await fetch("api/select/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Ee)});if(!_e.ok)throw new Error("Network response was not ok");const Ie=await _e.json();st("success"),console.log("Success:",Ie);const Se={};Ee.data.forEach(re=>{Se[`topin_${re.id}`]=re.topin.toString()}),dt(re=>({...re,...Se})),be()}catch(_e){st("error"),console.error("Error:",_e)}},me=ne=>{const{name:$e,value:Ee}=ne.target;dt(_e=>({..._e,[$e]:Ee}))};if(!$)return"";const xe=({d:ne})=>Et`
    <tr
      class="${fe(ne.id)?"bg-red-200 opacity-50 pointer-events-none":ne.id%2===1?"bg-white":"bg-green-300"}"
    >
      <td class="px-4 py-2">${ne.id}</td>
      <td class="px-4 py-2">${ne.pins}</td>
      <td class="px-4 py-2 flex justify-center">
        <div class="px-8 flex items-center">
          <input
            id="${ne.id}_0"
            class="mr-2"
            type="radio"
            name="topin_${ne.id}"
            value="0"
            checked="${k[`topin_${ne.id}`]==="0"}"
            onChange=${me}
            aria-label="NONE"
          />
          <label for="${ne.id}_0" class="mr-2">NONE </label>
        </div>
        <div class="px-8 flex items-center">
          <input
            id="${ne.id}_3"
            class="mr-2"
            type="radio"
            name="topin_${ne.id}"
            value="3"
            checked="${k[`topin_${ne.id}`]==="3"}"
            onChange=${me}
            aria-label="SWITCH"
          />
          <label for="${ne.id}_3" class="mr-2">SWITCH</label>
        </div>
        <div class="px-8 flex items-center">
          <input
            id="${ne.id}_1"
            class="mr-2"
            type="radio"
            name="topin_${ne.id}"
            value="1"
            checked="${k[`topin_${ne.id}`]==="1"}"
            onChange=${me}
            aria-label="BUTTON"
          />
          <label for="${ne.id}_1" class="mr-2">BUTTON</label>
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${ne.id}_2"
            class="mr-2"
            type="radio"
            name="topin_${ne.id}"
            value="2"
            checked="${k[`topin_${ne.id}`]==="2"}"
            onChange=${me}
            aria-label="DEVICE"
          />
          <label for="${ne.id}_2" class="mr-2">DEVICE</label>
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${ne.id}_4"
            class="mr-2"
            type="radio"
            name="topin_${ne.id}"
            value="4"
            checked="${k[`topin_${ne.id}`]==="4"}"
            onChange=${me}
            aria-label="1-WIRE"
          />
          <label for="${ne.id}_4" class="mr-2">1-WIRE</label>
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${ne.id}_5"
            class="mr-2"
            type="radio"
            name="topin_${ne.id}"
            value="5"
            checked="${k[`topin_${ne.id}`]==="5"}"
            onChange=${me}
            disabled="${ne.pwm==0?"disabled":""}"
            aria-label="PWM"
          />
          <label
            for="${ne.id}_5"
            class="${ne.pwm==0?"text-gray-400":""} mr-2"
            >PWM</label
          >
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${ne.id}_8"
            class="mr-2"
            type="radio"
            name="topin_${ne.id}"
            value="8"
            checked="${k[`topin_${ne.id}`]==="8"}"
            onChange=${me}
            aria-label="EncoderA"
          />
          <label for="${ne.id}_8" class="mr-2">Enc.OutA</label>
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${ne.id}_9"
            class="mr-2"
            type="radio"
            name="topin_${ne.id}"
            value="9"
            checked="${k[`topin_${ne.id}`]==="9"}"
            onChange=${me}
            aria-label="EncoderB"
          />
          <label for="${ne.id}_9" class="mr-2">Enc.OutB</label>
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${ne.id}_10"
            class="mr-2"
            type="radio"
            name="topin_${ne.id}"
            value="10"
            checked="${k[`topin_${ne.id}`]==="10"}"
            onChange=${me}
            disabled="${ne.monitoring==0?"disabled":""}"
            aria-label="Security"
          />
          <label
            for="${ne.id}_7"
            class="${ne.monitoring==0?"text-gray-400":""} mr-2"
            >Security</label
          >
        </div>
      </td>
    </tr>
  `;return Et`
    <div class="m-4 divide-y divide-gray-200 overflow-auto rounded bg-white">
      <div class="font-medium uppercase flex items-center px-4 py-2">
        Select pin(s)
      </div>
      <div class="flex-grow flex flex-col justify-center items-center">
        <div class="justify-center">
          <div class="mb-4">
            <form onSubmit=${pe}>
              <div class="relative flex justify-between items-center mb-5">
                <button
                  type="submit"
                  class=${`inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${pt?"bg-gray-400 cursor-not-allowed":"bg-blue-500 hover:bg-blue-700"}`}
                  disabled=${pt}
                >
                  ${pt?`Please wait ${vt} sec.`:"Submit"}
                </button>

                <div class="flex items-center">
                  <span class="mr-3 text-gray-700">SIM800L</span>
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      class="sr-only peer"
                      checked=${le}
                      onChange=${ne=>ue(ne.target.checked)}
                    />
                    <div
                      class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 
                            peer-focus:ring-blue-300 peer-checked:after:translate-x-full 
                            peer-checked:after:border-white after:content-[''] after:absolute 
                            after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 
                            after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                            peer-checked:bg-blue-600"
                    ></div>
                  </label>
                </div>
              </div>

              ${ct==="success"&&Et`
                <div
                  class="mb-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded"
                  role="alert"
                >
                  <strong class="font-bold">Успех! </strong>
                  <span class="block sm:inline">
                    Данные успешно сохранены. Идет запись на USB флешку. Кнопка
                    станет активной через ${vt} секунд.
                  </span>
                </div>
              `}
              ${ct==="error"&&Et`
                <div
                  class="mb-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded"
                  role="alert"
                >
                  <strong class="font-bold">Ошибка!</strong>
                  <span class="block sm:inline">
                    Произошла ошибка при отправке данных. Пожалуйста, попробуйте
                    еще раз через ${vt} секунд.
                  </span>
                </div>
              `}

              <table class="table-auto border divide-y divide-gray-200">
                <thead>
                  <tr class="bg-gray-400">
                    <th class="px-4 py-2">ID</th>
                    <th class="px-4 py-2">Pin</th>
                    <th class="px-4 py-2">Type(s) of pin(s)</th>
                  </tr>
                </thead>
                <tbody>
                  ${$&&$.map(ne=>y(xe,{d:ne}))}
                </tbody>
              </table>

              <div class="relative mt-5">
                <button
                  type="submit"
                  class=${`inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${pt?"bg-gray-400 cursor-not-allowed":"bg-blue-500 hover:bg-blue-700"}`}
                  disabled=${pt}
                >
                  ${pt?`Please wait ${vt} sec.`:"Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `}function ModalSwitch({modalType:$,page:_,hideModal:k,closeOnOverlayClick:dt=!0,title:ct,selectedSwitch:st,onSwitchChange:pt,connectionOptions:Zt,SliderComponent:vt=MyPolzunok}){const[te,le]=ut((st==null?void 0:st.info)||""),[ht,Yt]=ut((st==null?void 0:st.onoff)||0),[ee,ue]=ut((st==null?void 0:st.ptype)||0),[fe,be]=ut((st==null?void 0:st.setrpins)||""),[pe,me]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(ge=>{if(!ge.ok)throw new Error(`HTTP error! status: ${ge.status}`);return ge.json()}).then(ge=>{if(!ge||!ge.data||!Array.isArray(ge.data)){console.error("Invalid data format:",ge),me([]);return}const we=ge.data.filter(ye=>ye.topin===2);me(we)}).catch(ge=>{console.error("Error fetching pin config:",ge),me([])})},[]);const xe=ge=>{ge.preventDefault();const we=new FormData(ge.target),ye=Object.fromEntries(we);if(ye.id=st.id,ye.pins=st.pins,$==="edit")ye.onoff=ht;else if($==="connection"){const se=pe.find(ie=>ie.pins===ye.setrpins);se&&(ye.pinact={...st.pinact,[se.id]:se.pins})}fetch("/api/switch/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ye)}).then(se=>se.json()).then(se=>{console.log("Success:",se),pt({...st,...ye}),k(),window.location.href="/#/switch"}).catch(se=>{console.error("Error:",se)})},ne=ge=>{be(ge.target.value)},$e=ge=>{ue(parseInt(ge.target.value))},Ee=ge=>{le(ge.target.value)},_e=ge=>{Yt(ge)},Ie=ge=>{dt&&ge.target===ge.currentTarget&&k()},Se=()=>{ue(0),le(""),Yt(0)};return Et`
    <div
      class="fixed inset-0 z-50 bg-black bg-opacity-50"
      style="margin-top: 7px;"
      onclick=${Ie}
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <div
          class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative"
          style="max-height: calc(100vh - 57px); overflow-y: auto;"
        >
          <div class="modal-header flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">${ct}</h2>
            <button
              onclick=${k}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          ${(()=>{if(_==="TabSwitch"){if($==="connection")return Et`
          <form onsubmit=${xe}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${st.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${st.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Connection</td>
                    <td class="p-2">
                      <select
                        name="setrpins"
                        value=${fe}
                        onchange=${ne}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select a connection</option>
                        ${pe.map(ge=>Et`
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
        `;if($==="edit")return Et`
          <form onsubmit=${xe}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${st.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${st.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Pullup type</td>
                    <td class="p-2">
                      <select
                        name="ptype"
                        value=${ee}
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
                        value=${te}
                        oninput=${Ee}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${vt}
                        value=${ht}
                        onChange=${_e}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-between items-center mt-4">
              <button
                type="button"
                onclick=${Se}
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
  `}function TabSwitch({}){const[$,_]=ut(null),[k,dt]=ut(null),[ct,st]=ut(!1),[pt,Zt]=ut(null),[vt,te]=ut(null),[le,ht]=ut(!1),[Yt,ee]=ut("ru"),[ue,fe]=ut(null),[be,pe]=ut([]),[me,xe]=ut(""),[ne,$e]=ut(!1),Ee=()=>Promise.all([fetch("/api/switch/get").then(Xt=>Xt.json()),fetch("/api/pintopin/get").then(Xt=>Xt.json())]).then(([Xt,ae])=>{ee(Xt.lang),fe(Xt.switches),_(Xt),pe(ae),xe(`Pintopin data: ${JSON.stringify(ae,null,2)}

Switch data: ${JSON.stringify(Xt.switches,null,2)}`),console.log("Pintopin data:",ae),console.log("Switch data:",Xt.switches)}).catch(Xt=>{console.error("Error fetching data:",Xt),xe(`Error fetching data: ${Xt.message}`)}),_e=()=>{fetch("/api/switch/get").then(Xt=>Xt.json()).then(Xt=>{fe(Xt.switches),ee(Xt.lang),console.log("Updated switch data:",Xt.switches)}).catch(Xt=>{console.error("Error fetching switch data:",Xt)})},Ie=()=>{fetch("/api/pintopin/get").then(Xt=>Xt.json()).then(Xt=>{pe(Xt),console.log("Updated pintopin data:",Xt)}).catch(Xt=>{console.error("Error fetching pintopin data:",Xt)})};lt(()=>{_e(),Ie();const Xt=setInterval(()=>{_e(),Ie()},1e3);return()=>clearInterval(Xt)},[]);const Se=Xt=>{const ae=new Map,ve=ue.find(ce=>ce.id===Xt);return ve&&ve.pinact&&Object.entries(ve.pinact).forEach(([ce,mt])=>{ae.set(ce,{pin:ce,relayId:mt})}),be.forEach(ce=>{if(ce.idin===Xt){const mt=`${ce.pins}(${ce.idout})`;ae.has(mt)||ae.set(mt,{pin:ce.pins,relayId:ce.idout})}}),Array.from(ae.values())},re=()=>Yt==="ru"?ruLangswitch:enLangswitch,ge=(Xt,ae)=>{const mt=(re()[ae]||"").split(" "),he=[];let de="";for(let ke=0;ke<mt.length;ke++){const Oe=mt[ke];de.length+Oe.length+1<=200?de+=(de.length>0?" ":"")+Oe:(de.length>0&&he.push(de),de=Oe)}return de.length>0&&he.push(de),he.join("<br>")},we=(Xt,ae)=>{console.log("Удаление соединения:",Xt,ae);const[ve,ce]=ae.split("("),mt=ce?parseInt(ce):null;fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:Xt,pin:ve.trim()})}).then(he=>he.json()).then(he=>{dt(he),fe(de=>de.map(ke=>{if(ke.id===Xt){const Oe={...ke.pinact};return delete Oe[ve.trim()],{...ke,pinact:Oe}}return ke})),pe(de=>de.filter(ke=>!(ke.idin===Xt&&ke.pins===ve.trim()&&(mt===null||ke.idout===mt))))}).then(()=>{console.log("Соединение удалено успешно"),Ee()}).catch(he=>{console.error("Ошибка при удалении соединения:",he)})},ye=(Xt,ae)=>{Zt(Xt),te(ae),st(!0)},se=()=>{st(!1),Zt(null),te(null)},ie=Xt=>{console.log("handleSwitchChange:",Xt),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:Xt.id,onoff:Xt.onoff})}).then(ae=>ae.json()).then(ae=>{console.log("Response from /api/onoff/set:",ae)}).catch(ae=>{console.error("Error calling /api/onoff/set:",ae)}),se()},Te={ru:Et`
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
    `},$t=Xt=>Et`
    <th class="px-4 py-2 relative group">
      ${Xt.title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-orange-300 p-2 rounded shadow-lg text-left"
        style="width: 400px; left: 50%; transform: translateX(-50%); top: 100%;"
        dangerouslySetInnerHTML=${{__html:ge("langbutton",Xt.tooltipIndex)}}
      ></div>
    </th>
  `,oe=({d:Xt,index:ae})=>{const ve=Se(Xt.id);return Et`
      <tr class="${ae%2===1?"bg-white":"bg-green-300"}">
        <td class="px-4 py-2">${Xt.id}</td>
        <td class="px-4 py-2">${Xt.pins}</td>
        <td class="px-4 py-2">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][Xt.ptype]}
        </td>
        <td class="px-4 py-2">
          ${ve.map(({pin:ce,relayId:mt})=>Et`
              <span class="mr-2">
                ${ce}${mt!==void 0?`(${mt})`:""}
                <button
                  onClick=${he=>{he.preventDefault(),we(Xt.id,`${ce}(${mt})`)}}
                  class="text-red-500 hover:text-red-700"
                  style="margin-left: 2px; font-weight: bold;"
                >
                  [<strong>x</strong>]
                </button>
              </span>
            `)}
        </td>
        <td class="px-4 py-2">${Xt.info}</td>
        <td class="px-4 py-2">
          <${MyPolzunok}
            value=${Xt.onoff}
            onChange=${ce=>ie({...Xt,onoff:ce})}
          />
        </td>
        <td class="px-4 py-2">
          <button
            onClick=${()=>ye("connection",Xt)}
            class="text-blue-500 hover:text-blue-700 mr-2"
          >
            Connection
          </button>
          |
          <button
            onClick=${()=>ye("edit",Xt)}
            class="text-blue-500 hover:text-blue-700 ml-2"
          >
            Edit
          </button>
        </td>
      </tr>
    `};return ue?Et`
    <div class="flex-grow flex flex-col justify-center items-center">
      <div class="font-medium uppercase flex items-center px-4 py-2">
        Switch(es) pin(s)
      </div>

      <div class="flex-grow flex flex-col justify-center items-center">
        <div class="justify-center">
          <div class="mb-4">
            <table class="table-auto border divide-y divide-gray-200">
              <thead>
                <tr class="bg-gray-400">
                  <${$t} title="ID" tooltipIndex=${1} />
                  <${$t} title="Pin" tooltipIndex=${2} />
                  <${$t} title="Pullup type" tooltipIndex=${3} />
                  <${$t} title="Device connection" tooltipIndex=${4} />
                  <${$t} title="INFO" tooltipIndex=${5} />
                  <${$t} title="On/Off" tooltipIndex=${6} />
                  <${$t} title="Action" tooltipIndex=${7} />
                </tr>
              </thead>
              <tbody id="tab1">
                ${ue.map((Xt,ae)=>Et`<${oe} d=${Xt} index=${ae} key=${Xt.id} />`)}
              </tbody>
            </table>
          </div>

          <div class="flex justify-end mt-4">
            <button
              onclick=${()=>ht(!le)}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              ${le?"Hide Help":"Show Help"}
            </button>
          </div>

          ${le&&Et`
            <div class="mt-4 p-4 border rounded">${Te[Yt]}</div>
          `}
        </div>
      </div>

      ${ct&&Et`
        <${ModalSwitch}
          modalType=${pt}
          page="TabSwitch"
          hideModal=${se}
          title=${pt==="connection"?"Edit Connection":"Edit switch"}
          selectedSwitch=${vt}
          onSwitchChange=${ie}
        />
      `}
    </div>
  `:""}const ModalButton=({modalType,page,hideModal,closeOnOverlayClick=!0,title,selectedButton,onButtonChange,SliderComponent=MyPolzunok})=>{const[buttonInfo,setButtonInfo]=ut((selectedButton==null?void 0:selectedButton.info)||""),[onoff,setOnOff]=ut((selectedButton==null?void 0:selectedButton.onoff)||0),[ptype,setPtype]=ut((selectedButton==null?void 0:selectedButton.ptype)||0),[sclick,setSclick]=ut((selectedButton==null?void 0:selectedButton.sclick)||""),[dclick,setDclick]=ut((selectedButton==null?void 0:selectedButton.dclick)||""),[lpress,setLpress]=ut((selectedButton==null?void 0:selectedButton.lpress)||""),[pinOptions,setPinOptions]=ut([]),[errors,setErrors]=ut({sclick:null,dclick:null,lpress:null}),[submitError,setSubmitError]=ut(null),doubleClickLongPressRegex=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,validateInput=$=>!$||$.trim()===""||$.toLowerCase()==="none"||doubleClickLongPressRegex.test($)?null:'Incorrect format. Use "None" or "pin:value" format.',handleInputChange=($,_)=>{const k=validateInput(_);switch(setErrors(dt=>({...dt,[$]:k})),$){case"sclick":setSclick(_);break;case"dclick":setDclick(_);break;case"lpress":setLpress(_);break}};lt(()=>{fetch("/api/select/get").then($=>$.json()).then($=>{Array.isArray($)?setPinOptions($.filter(_=>_.topin===2)):setPinOptions([])}).catch($=>{console.error("Error fetching pin config:",$),setPinOptions([])})},[]);const handleSubmit=$=>{if($.preventDefault(),Object.values(errors).some(k=>k!==null)){setSubmitError("Please correct the errors before submitting.");return}const _={...selectedButton,info:buttonInfo,sclick:sclick||"None",dclick:dclick||"None",lpress:lpress||"None",onoff,ptype};fetch("/api/button/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(_)}).then(k=>k.json()).then(k=>{onButtonChange(_),hideModal()}).catch(k=>{console.error("Error:",k),setSubmitError("Failed to save changes. Please try again.")})},handleResetPin=()=>{setPtype(0),setSclick(""),setDclick(""),setLpress(""),setButtonInfo(""),setOnOff(0),setErrors({sclick:null,dclick:null,lpress:null})},renderConnectionModal=()=>Et`
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
                  value=${(selectedButton==null?void 0:selectedButton.setrpins)||""}
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
  `;return Et`
    <div
      class="fixed inset-0 z-50 bg-black bg-opacity-50"
      style="margin-top: 7px;"
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <div
          class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative"
          style="max-height: calc(100vh - 57px); overflow-y: auto;"
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
    </div>
  `},TabButton=()=>{const[$,_]=ut(null),[k,dt]=ut([]),[ct,st]=ut(null),[pt,Zt]=ut(null),[vt,te]=ut(!1),[le,ht]=ut(null),[Yt,ee]=ut(null),[ue,fe]=ut(!1),[be,pe]=ut("ru"),[me,xe]=ut(""),[ne,$e]=ut(!0),Ee={ru:Et`
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
                <td class="border px-4 py-2">
                  Swarm/button/id=30/single_click
                </td>
                <td class="border px-4 py-2">
                  Данная MQTT команда выполнит команду, прописанную в 'SINGLE CLICK' c id = 30. Где "Swarm" это Ваш 'TX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  Swarm/button/id=30/double_click
                </td>
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
                <td class="border px-4 py-2">
                  Swarm/button/id=30/single_click
                </td>
                <td class="border px-4 py-2">
                  This MQTT command will execute the command specified in 'SINGLE CLICK' with id = 30. Where "Swarm" is your 'RX topic'.
                </td>
              </tr>
              <tr>
                <td class="border px-4 py-2">
                  Swarm/button/id=30/double_click
                </td>
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
    `},_e=()=>{fetch("/api/button/get").then($t=>$t.json()).then($t=>{st($t.buttons),pe($t.lang),console.log("Updated button data:",$t.buttons)}).catch($t=>{console.error("Error fetching button data:",$t)})};lt(()=>{_e();let $t;return ne&&($t=setInterval(()=>{_e()},1e3)),()=>{$t&&clearInterval($t)}},[ne]);const Ie=$t=>{const oe=new Map,Xt=ct.find(ae=>ae.id===$t);return Xt&&Xt.pinact&&Object.entries(Xt.pinact).forEach(([ae,ve])=>{oe.set(ae,{pin:ae,relayId:ve})}),k.forEach(ae=>{if(ae.idin===$t){const ve=`${ae.pins}(${ae.idout})`;oe.has(ve)||oe.set(ve,{pin:ae.pins,relayId:ae.idout})}}),Array.from(oe.values())},Se=()=>({langbutton:be==="ru"?rulangbutton:enlangbutton}),re=($t,oe)=>{const Xt=Se(),ae=Xt[$t]&&Xt[$t][oe]?Xt[$t][oe]:"";return ge(ae)},ge=($t,oe=100)=>{if(!$t||typeof $t!="string")return"";const Xt=[];let ae="";const ve=$t.split(`
`);return ve.forEach((ce,mt)=>{ce.split(" ").filter(de=>de.length>0).forEach((de,ke)=>{const Oe=ae.length===0?de:" "+de;ae.length+Oe.length<=oe?ae+=Oe:(ae.length>0&&Xt.push(ae),ae=de)}),ae.length>0&&(Xt.push(ae),ae=""),mt<ve.length-1&&Xt.push("")}),ae.length>0&&Xt.push(ae),Xt.join(`
`)},we=($t,oe)=>{ht($t),ee(oe),te(!0),$e(!1)},ye=()=>{te(!1),ht(null),ee(null),$e(!0)},se=$t=>{console.log("handleButtonChange:",$t),st(oe=>oe.map(Xt=>Xt.id===$t.id?{...Xt,...$t}:Xt)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:$t.id,onoff:$t.onoff})}).then(oe=>oe.json()).then(oe=>{console.log("Response from /api/onoff/set:",oe)}).catch(oe=>{console.error("Error calling /api/onoff/set:",oe)}),ye()},ie=$t=>Et`
    <th class="px-3 py-2 relative group" style="white-space: pre-line;">
      ${$t.title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-orange-300 p-2 rounded shadow-lg text-left"
        style="min-width: 200px; max-width: 300px; white-space: pre-wrap; left: 50%; transform: translateX(-50%); top: 100%;"
      >
        ${re("langbutton",$t.tooltipIndex)}
      </div>
    </th>
  `,Te=({d:$t,index:oe})=>(Ie($t.id),Et`
      <tr class="${oe%2===1?"bg-white":"bg-green-300"}">
        <td class="px-4 py-2">${$t.id}</td>
        <td class="px-4 py-2">${$t.pins}</td>
        <td class="px-4 py-2">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][$t.ptype]}
        </td>

        <td
          class="px-4 py-2 max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis"
        >
          ${ge($t.sclick)}
        </td>
        <td
          class="px-4 py-2 max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis"
        >
          ${ge($t.dclick)}
        </td>
        <td
          class="px-4 py-2 max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis"
        >
          ${ge($t.lpress)}
        </td>
        <td class="px-4 py-2">${$t.info}</td>
        <td class="px-4 py-2">
          <${MyPolzunok}
            value=${$t.onoff}
            onChange=${Xt=>se({...$t,onoff:Xt})}
          />
        </td>
        <td class="px-4 py-2">
          <button
            onClick=${()=>we("edit",$t)}
            class="text-blue-500 hover:text-blue-700 ml-2"
          >
            Edit
          </button>
        </td>
      </tr>
    `);return ct?Et`
    <div class="flex-grow flex flex-col justify-center items-center">
      <div class="font-medium uppercase flex items-center px-4 py-2">
        Button(s) pin(s)
      </div>
      <div class="flex-grow flex flex-col justify-center items-center">
        <div class="justify-center">
          <div class="mb-4">
            <table
              class="table-auto border divide-y divide-gray-200 overflow-x-auto"
            >
              <thead>
                <tr class="bg-gray-400">
                  <${ie} title="ID" tooltipIndex=${1} />
                  <${ie} title="Pin" tooltipIndex=${2} />
                  <${ie} title="Pullup type" tooltipIndex=${3} />
                  <${ie} title="SINGLE CLICK" tooltipIndex=${4} />
                  <${ie} title="DOUBLE CLICK" tooltipIndex=${5} />
                  <${ie} title="LONG PRESS" tooltipIndex=${6} />
                  <${ie} title="INFO" tooltipIndex=${7} />
                  <${ie} title="On/Off" tooltipIndex=${8} />
                  <${ie} title="Action" tooltipIndex=${9} />
                </tr>
              </thead>
              <tbody id="tab1">
                ${ct.map(($t,oe)=>Et`
                    <${Te} d=${$t} index=${oe} key=${$t.id} />
                  `)}
              </tbody>
            </table>
          </div>
          <div class="flex justify-end mt-4">
            <button
              onclick=${()=>fe(!ue)}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              ${ue?"Hide Help":"Show Help"}
            </button>
          </div>

          ${ue&&Et`
            <div class="mt-4 p-4 border rounded">${Ee[be]}</div>
          `}
        </div>
      </div>
      ${vt&&Et`
        <${ModalButton}
          modalType=${le}
          page="TabButton"
          hideModal=${ye}
          title=${le==="connection"?"Edit Connection":"Edit Button pin"}
          selectedButton=${Yt}
          onButtonChange=${se}
        />
      `}
    </div>
  `:""};function ModalEncoder({modalType:$,page:_,hideModal:k,closeOnOverlayClick:dt=!0,title:ct,selectedEncoder:st,handleEncoderChange:pt,connectionOptions:Zt,SliderComponent:vt=MyPolzunok}){const[te,le]=ut((st==null?void 0:st.info)||""),[ht,Yt]=ut((st==null?void 0:st.onoff)===1),[ee,ue]=ut({pin:(st==null?void 0:st.encdrbpin)||"",id:(st==null?void 0:st.encoderb)||""}),[fe,be]=ut(Object.entries(st.pinact||{})[0]||["",""]),[pe,me]=ut([]),[xe,ne]=ut([]),[$e,Ee]=ut([]),[_e,Ie]=ut(st.dvalue||0),[Se,re]=ut(st.ponr||0),[ge,we]=ut(st.pwm||1e7);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(ce=>{if(!ce.ok)throw new Error(`HTTP error! status: ${ce.status}`);return ce.json()}).then(ce=>{if(!ce||!ce.data||!Array.isArray(ce.data)){console.error("Invalid data format:",ce),me([]),ne([]),Ee([]);return}const mt=ce.data.filter(ke=>ke.topin===2),he=ce.data.filter(ke=>ke.topin===9),de=ce.data.filter(ke=>ke.topin===5);if(me(mt),ne(he),Ee(de),st.encoderb){const ke=he.find(Oe=>Oe.pins===st.encoderb);ue({pin:st.encoderb,id:ke?ke.id:""})}}).catch(ce=>{console.error("Error fetching pin config:",ce),me([]),ne([]),Ee([])})},[st]);const ye=ce=>{if(ce.preventDefault(),ce.target instanceof HTMLFormElement){let he={};$==="edit"?he={topin:8,id:st.id,pins:st.pins,pwm:parseInt(ge),dvalue:parseInt(_e),ponr:parseInt(Se),info:te,onoff:ht?1:0}:$==="connection"&&(he={id:st.id,pins:st.pins,encoderb:parseInt(ee.id),encdrbpin:ee.pin,pinact:{[fe[0]]:parseInt(fe[1])}}),console.log("We got a encoder JSON:",JSON.stringify(he)),fetch("/api/encoder/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(he)}).then(de=>de.json()).then(de=>{pt({...st,...he}),k()}).catch(de=>{console.error("Error:",de)})}else console.error("Form element not found")},se=ce=>{le(ce.target.value)},ie=ce=>{Yt(ce)},Te=ce=>{const mt=xe.find(he=>he.pins===ce.target.value);ue({pin:ce.target.value,id:mt?mt.id:""})},$t=ce=>{const[mt,he]=ce.target.value.split("|");be([mt,he])},oe=ce=>{Ie(ce.target.value)},Xt=ce=>{re(ce.target.value)},ae=ce=>{const mt=ce/1e3;return mt<=4e4?{cls:"text-green-600",msg:"Optimal range"}:mt<=2e5?{cls:"text-yellow-600",msg:"Precision might drop"}:{cls:"text-red-600",msg:"Expert mode: low precision"}};return Et`
    <div
      class="fixed inset-0 z-50 bg-black bg-opacity-50"
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
              onClick=${k}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          ${(()=>{if(_==="TabEncoder"){if($==="connection")return Et`
          <form onsubmit=${ye}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${st.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${st.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Encoder B</td>
                    <td class="p-2">
                      <select
                        name="encdrb"
                        value=${ee.pin}
                        onchange=${Te}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select Encoder B</option>
                        ${xe.map(ce=>Et`
                            <option value=${ce.pins}>
                              ${ce.pins} (ID: ${ce.id})
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
                        value=${`${fe[0]}|${fe[1]}`}
                        onchange=${$t}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select PWM connection</option>
                        ${$e.map(ce=>Et`
                            <option value=${`${ce.pins}|${ce.id}`}>
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
          <form onsubmit=${ye}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">ID</td>
                    <td class="p-2">${st.id}</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Pin</td>
                    <td class="p-2">${st.pins}</td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">PWM Frequency (milliHz)</td>
                    <td class="p-2">
                      <input
                        type="number"
                        min="50" 
                        max="2000000000"
                        value=${ge}
                        oninput=${ce=>we(ce.target.value)} 
                        class="border rounded p-2 w-full font-mono" 
                        placeholder="50 - 2000000000"
                      />
                      <div class="text-xs ${ae(ge).cls}">
                        ${ae(ge).msg}
                      </div>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Resolution</td>
                    <td class="p-2 text-blue-600 font-mono">
                      ${st.pwmmax||"---"} steps
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">Dimmer value (0-100)</td>
                    <td class="p-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value=${_e}
                        oninput=${oe}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Duty on restore</td>
                    <td class="p-2">
                      <select
                        value=${Se}
                        onchange=${Xt}
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
                        oninput=${se}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${vt}
                        value=${ht}
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
              >
                Save changes
              </button>
            </div>
          </form>
        `}})()}
        </div>
      </div>
    </div>
  `}function TabEncoder({}){{const[$,_]=ut(null),[k,dt]=ut(null),[ct,st]=ut(!1),[pt,Zt]=ut(null),[vt,te]=ut(null),[le,ht]=ut(!1),[Yt,ee]=ut("ru"),[ue,fe]=ut([]),be=at(!1),pe=()=>Promise.all([fetch("/api/encoder/get").then($t=>$t.json()),fetch("/api/pintopin/get").then($t=>$t.json())]).then(([$t,oe])=>{ee($t.lang),_($t.encoders),fe(oe),console.log("Encoder data:",$t.encoders),console.log("Pintopin data:",oe)}).catch($t=>{console.error("Error fetching data:",$t)}),me=()=>{fetch("/api/encoder/get").then($t=>$t.json()).then($t=>{if(be.current){console.log("Polling skip: onoff request in flight");return}_($t.encoders),ee($t.lang),console.log("Updated encoder data:",$t.encoders)}).catch($t=>{console.error("Error fetching encoder data:",$t)})},xe=()=>{fetch("/api/pintopin/get").then($t=>$t.json()).then($t=>{fe($t),console.log("Updated pintopin data:",$t)}).catch($t=>{console.error("Error fetching pintopin data:",$t)})};lt(()=>{me(),xe();const $t=setInterval(()=>{me(),xe()},500);return()=>clearInterval($t)},[]);const ne=$t=>{_(oe=>oe.map(Xt=>Xt.id===$t.id?$t:Xt)),be.current=!0,fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:$t.id,onoff:$t.onoff})}).then(oe=>oe.json()).then(oe=>{console.log("Response from /api/onoff/set (Encoder):",oe)}).catch(oe=>{console.error("Error calling /api/onoff/set (Encoder):",oe)}).finally(()=>{be.current=!1})},$e=$t=>{const oe=$.find(ae=>ae.id===$t),Xt=[];return oe&&oe.pinact&&Object.entries(oe.pinact).forEach(([ae,ve])=>{Xt.push({pin:ae,idout:ve})}),Xt},Ee=$t=>{const oe=$t/1e3;return oe<=4e4?{cls:"text-green-600",msg:"✓"}:oe<=2e5?{cls:"text-yellow-600",msg:"~"}:{cls:"text-red-600",msg:"!"}},_e=$t=>{if(!$t)return"—";const oe=$t/1e3;return oe>=1e6?`${(oe/1e6).toFixed(2)} MHz`:oe>=1e3?`${(oe/1e3).toFixed(1)} kHz`:`${oe} Hz`},Ie=()=>({langbutton:Yt==="ru"?ruencoder:enencoder}),Se=($t,oe)=>{const Xt=Ie(),ae=Xt[$t]&&Xt[$t][oe]?Xt[$t][oe]:"";return re(ae)},re=($t,oe=50)=>{if(!$t||typeof $t!="string")return"";const Xt=$t.split(" ");let ae=[],ve="";for(let ce=0;ce<Xt.length;ce++)ve.length+Xt[ce].length+1<=oe?ve+=`${ve?" ":""}${Xt[ce]}`:(ve&&ae.push(ve.trim()),ve=Xt[ce]);return ve&&ae.push(ve.trim()),ae.join(`
`)},ge=($t,oe)=>{console.log("Deleting connection:",$t,oe);const Xt=oe.split("(")[0].trim();fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:$t,pin:Xt})}).then(ae=>ae.ok?ae.json():ae.text().then(ve=>{throw new Error(`HTTP error! status: ${ae.status}, message: ${ve}`)})).then(ae=>{dt(ae),_(ve=>ve.map(ce=>{if(ce.id===$t){const mt={...ce.pinact};return delete mt[Xt],{...ce,pinact:mt}}return ce})),fe(ve=>ve.filter(ce=>!(ce.idin===$t&&ce.pins===Xt)))}).then(()=>{console.log("Connection deleted successfully"),pe()}).catch(ae=>{console.error("Error deleting connection:",ae)})},we=($t,oe)=>{console.log("Opening modal:",$t,oe),Zt($t),te(oe),st(!0)},ye=()=>{st(!1),Zt(null),te(null)},se={ru:Et`
      <div class="mytext space-y-6">
        <div>
          <pre class="mb-4">
            Данный API позволяет дистанционно управлять энкодером, просто выполнив команду в браузере любого устройства в вашей локальной сети.
          </pre
          >
          <pre class="text-red-500 font-bold">
            Не открывайте доступ из интернета к вашим API - это небезопасно!
          </pre
          >
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
                  Данная API команда установит значение димера в 25 единиц с id
                  = 4. Где "Zerg" это Ваш 'Token'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <pre class="mb-4">
            MQTT позволяет дистанционно управлять энкодером из интернета!
          </pre
          >
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
                  Данная MQTT команда установит значение диммера в 25 едениц с
                  id = 4. Где "Swarm" это Ваш 'TX topic'.
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
          </pre
          >
          <pre class="text-red-500 font-bold">
            Do not expose your APIs to the internet - it's not secure!
          </pre
          >
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
                  This command will set the dimmer to 25 for the device with ID
                  7. Where "Zerg" is your 'Token*.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <pre class="mb-4">
            MQTT allows you to remotely control a switch from the internet!
          </pre
          >
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
                  This command will set the dimmer to 25 for the device with ID
                  7. Where "Swarm" is your 'RX topic'.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `},ie=({title:$t,tooltipIndex:oe})=>Et`
    <th class="px-4 py-2 relative group">
      ${$t}
      <div
        class="absolute z-50 invisible group-hover:visible bg-orange-300 p-2 rounded shadow-lg whitespace-normal break-words text-left transform -translate-x-1/2 left-1/2 top-full mt-1"
        style="min-width: 200px; max-width: 400px;"
      >
        ${Se("langbutton",oe)}
      </div>
    </th>
  `,Te=({d:$t,index:oe})=>{const Xt=$e($t.id),ae=Ee($t.pwm||0);return Et`
      <tr class="${oe%2===1?"bg-white":"bg-green-300"}">
        <td class="px-4 py-2">${$t.pins}(${$t.id})</td>
        <td class="px-4 py-2">
          ${$t.encdrbpin?`${$t.encdrbpin}(${$t.encoderb})`:"Not set"}
        </td>
        <td class="px-4 py-2">
          ${Xt.length>0?Xt.map(({pin:ve,idout:ce})=>Et`
                  <span class="mr-2">
                    ${ve}(${ce})
                    <button
                      onClick=${mt=>{mt.preventDefault(),ge($t.id,`${ve}(${ce})`)}}
                      class="text-red-500 hover:text-red-700"
                      style="margin-left: 2px; font-weight: bold;"
                    >
                      [<strong>x</strong>]
                    </button>
                  </span>
                `):"Not set"}
        </td>
        <td class="px-4 py-2">
          <span class="font-mono">${_e($t.pwm)}</span>
          <span class="ml-1 font-bold ${ae.cls}">${ae.msg}</span>
        </td>
        <td class="px-4 py-2 font-mono text-blue-600">
          ${$t.pwmmax?`${$t.pwmmax} steps`:"—"}
        </td>
        <td class="px-4 py-2">${$t.dvalue}</td>
        <td class="px-4 py-2">${$t.ponr===1?"ON":"OFF"}</td>
        <td class="px-4 py-2">${$t.info}</td>
        <td class="px-4 py-2">
          <${MyPolzunok}
            value=${$t.onoff}
            onChange=${ve=>ne({...$t,onoff:ve})}
          />
        </td>
        <td class="px-4 py-2">
          <button
            onClick=${()=>we("connection",$t)}
            class="text-blue-500 hover:text-blue-700 mr-2"
          >
            Connection
          </button>
          |
          <button
            onClick=${()=>we("edit",$t)}
            class="text-blue-500 hover:text-blue-700 ml-2"
          >
            Edit Encdr.
          </button>
        </td>
      </tr>
    `};return $?Et`
    <div class="flex-grow flex flex-col justify-center items-center">
      <div class="font-medium uppercase flex items-center px-4 py-2">
        Encoder(s) pin(s)
      </div>
      <div class="flex-grow flex flex-col justify-center items-center">
        <div class="justify-center">
          <div class="mb-4">
            <table class="table-auto border divide-y divide-gray-200">
              <thead>
                <tr class="bg-gray-400">
                  <${ie} title="Encoder A (ID)" tooltipIndex=${3} />
                  <${ie} title="Encoder B (ID)" tooltipIndex=${4} />
                  <${ie} title="PWM connection" tooltipIndex=${5} />
                  <${ie} title="PWM Frequency" tooltipIndex=${11} />
                  <${ie} title="Resolution (steps)" tooltipIndex=${12} />
                  <${ie} title="Dimmer value (0-100)" tooltipIndex=${6} />
                  <${ie} title="Duty on restore" tooltipIndex=${7} />
                  <${ie} title="INFO" tooltipIndex=${8} />
                  <${ie} title="On/Off" tooltipIndex=${9} />
                  <${ie} title="Action" tooltipIndex=${10} />
                </tr>
              </thead>
              <tbody id="tab1">
                ${$.map(($t,oe)=>Et`<${Te} d=${$t} index=${oe} key=${$t.id} />`)}
              </tbody>
            </table>
          </div>

          <div class="flex justify-end mt-4">
            <button
              onclick=${()=>ht(!le)}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              ${le?"Hide Help":"Show Help"}
            </button>
          </div>

          ${le&&Et`
            <div class="mt-4 p-4 border rounded">${se[Yt]}</div>
          `}
        </div>
      </div>
      ${ct&&Et`
        <${ModalEncoder}
          modalType=${pt}
          page="TabEncoder"
          hideModal=${ye}
          title=${pt==="connection"?"Edit Connection":"Edit Encoder"}
          selectedEncoder=${vt}
          handleEncoderChange=${ne}
        />
      `}
    </div>
  `:Et`<div>Loading...</div>`}}function ModalCron({modalType:$,page:_,hideModal:k,closeOnOverlayClick:dt=!0,title:ct,selectedCron:st,handleCronChange:pt,connectionOptions:Zt,modalClass:vt,SliderComponent:te=MyPolzunok}){const[le,ht]=ut((st==null?void 0:st.info)||""),[Yt,ee]=ut((st==null?void 0:st.onoff)===1),[ue,fe]=ut((st==null?void 0:st.activ)||""),[be,pe]=ut((st==null?void 0:st.cron)||""),[me,xe]=ut(st.setrpins||""),ne=re=>{re.preventDefault();const ge=new FormData(re.target),we=Object.fromEntries(ge);we.id=st.id,we.pins=st.pins,$==="edit"?(we.onoff=Yt?1:0,we.info=le,we.cron=be,we.activ=ue):$==="connection"&&(we.setrpins=me),console.log("Data being sent to server:"),console.log(we),console.log("Stringified data:"),console.log(JSON.stringify(we)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(we)}).then(ye=>ye.json()).then(ye=>{console.log("Success:",ye),pt({...st,...we}),k(),window.location.href="/#/cron"}).catch(ye=>{console.error("Error:",ye)})};lt(()=>{ht((st==null?void 0:st.info)||""),xe((st==null?void 0:st.setrpins)||""),ee((st==null?void 0:st.onoff)===1)},[st]);const $e=re=>{pe(re.target.value)},Ee=re=>{ht(re.target.value)},_e=re=>{ee(re)},Ie=re=>{fe(re.target.value)},Se=()=>{if(_==="TabCron"&&$==="edit")return Et`
          <form onsubmit=${ne}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  ${[{label:"ID",value:st.id},{label:"Cron",value:Et`
                        <input
                          type="text"
                          value=${be}
                          onInput=${$e}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"Script",value:Et`
                        <input
                          type="text"
                          value=${ue}
                          onInput=${Ie}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"INFO",value:Et`
                        <input
                          type="text"
                          value=${le}
                          onInput=${Ee}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"On/Off",value:Et`<${te}
                        value=${Yt}
                        onChange=${_e}
                      />`}].map((re,ge)=>Et`
                      <tr
                        class="${ge%2===1?"bg-white":"bg-gray-200"}"
                      >
                        <td class="p-2 font-bold">${re.label}</td>
                        <td class="p-2">${re.value}</td>
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
        `};return Et`
    <div class=${`modal ${vt||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onclick=${re=>dt&&re.target===re.currentTarget&&k()}
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
                onclick=${k}
              >
                Close
              </button>
            </div>
            ${Se()}
          </div>
        </div>
      </div>
    </div>
  `}function TabCron({}){const[$,_]=ut(null),[k,dt]=ut(null);at(null);const[ct,st]=ut(!1),[pt,Zt]=ut(null),[vt,te]=ut(null),[le,ht]=ut("ru"),[Yt,ee]=ut(!1),[ue,fe]=ut(1),[be,pe]=ut(0),me=()=>fetch("/api/cron/get").then(se=>se.json()).then(se=>{console.log("API response:",se),se&&Array.isArray(se.timers)?(_(se.timers),ht(se.lang||"ru"),typeof se.numline=="number"&&(pe(se.numline),fe(se.numline))):(console.error("Unexpected API response structure:",se),_([]))}).catch(se=>{console.error("Error fetching cron data:",se),_([])});lt(()=>{me()},[]),lt(()=>{xe(be)},[be]);const xe=se=>{fetch("/api/numline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({numline:se})}).then(ie=>ie.json()).then(ie=>console.log("Numline sent to stm32:",ie)).catch(ie=>console.error("Error sending Crone line to stm32:",ie))},ne=()=>{if(ue<$.length){const se=ue+1;fe(se),pe(se),xe(se)}},$e=()=>{if(ue>0){const se=ue-1;fe(se),pe(se),xe(se)}},Ee={ru:Et`
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
            <tr>
              <td>* * * * * * *</td>
              <td>CRON выполняется каждую секунду.</td>
            </tr>
            <tr>
              <td>0 * * * * * *</td>
              <td>CRON выполняется в начале каждой минуты.</td>
            </tr>
            <tr>
              <td>* * * * * 2 *</td>
              <td>CRON выполняется каждый вторник в течение всего дня.</td>
            </tr>
            <tr>
              <td>0 0 13-15 * * 2-4 *</td>
              <td>
                CRON выполняется каждую минуту между 13 и 15 часами среды,
                четверга и пятницы.
              </td>
            </tr>
            <tr>
              <td>*/5 * * * * * *</td>
              <td>CRON выполняется каждые 5 секунд, начиная с 0.</td>
            </tr>
            <tr>
              <td>*/5 */5 * * * * *</td>
              <td>
                CRON выполняется каждые 5 секунд каждые 5 минут, с 00:00 до
                55:55.
              </td>
            </tr>
            <tr>
              <td>0 0 0 * * 5 *</td>
              <td>CRON выполняется каждую пятницу в полночь.</td>
            </tr>
            <tr>
              <td>0 0 */2 * * * *</td>
              <td>CRON выполняется каждые 2 часа в начале часа.</td>
            </tr>
            <tr>
              <td>* * */2 * * * *</td>
              <td>
                CRON выполняется каждую секунду каждые 2 часа (0, 2, 4, ...,
                22).
              </td>
            </tr>
            <tr>
              <td>0 0 0 * * 1-5 *</td>
              <td>
                CRON выполняется в полночь каждую неделю с понедельника по
                пятницу.
              </td>
            </tr>
            <tr>
              <td>15 23 */6 * * * *</td>
              <td>
                CRON выполняется каждые 6 часов в (мин:сек) 23:15 (00:23:15,
                06:23:15, 12:23:15 и т.д.).
              </td>
            </tr>
            <tr>
              <td>0 0 0 1 * * *</td>
              <td>CRON выполняется в начале каждого месяца в 00:00:00.</td>
            </tr>
            <tr>
              <td>0 0 0 1 */3 * *</td>
              <td>CRON выполняется в начале каждого квартала в 00:00:00.</td>
            </tr>
            <tr>
              <td>10 15 20 * 8 6 *</td>
              <td>CRON выполняется в 20:15:20 каждую субботу в августе.</td>
            </tr>
            <tr>
              <td>10 15 20 8 * 6 *</td>
              <td>
                CRON выполняется в 20:15:20 каждую субботу, которая также
                является 8-м днем месяца (день недели и дата должны совпадать).
              </td>
            </tr>
            <tr>
              <td>30-45 * * * * * *</td>
              <td>CRON выполняется каждую секунду между 30 и 45.</td>
            </tr>
            <tr>
              <td>30-45/3 * * * * * *</td>
              <td>
                CRON выполняется каждые 3 секунды в каждой минуты, когда секунды
                находятся между 30 и 45.
              </td>
            </tr>
            <tr>
              <td>0 23/1 * * * * *</td>
              <td>
                CRON выполняется в начале каждой минуты, когда минуты находятся
                между 23 и 59.
              </td>
            </tr>
            <tr>
              <td>50-10 * * * * * *</td>
              <td>
                CRON выполняется каждую секунду, когда секунды находятся в
                диапазоне от 50 до 59 и от 00 до 10 (режим переполнения).
              </td>
            </tr>
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
            <tr>
              <th>ACTION</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>18:1;p5;18:0</td>
              <td>
                18-й пин включится (ON) в указанное время (CRON), будет гореть в
                течении 5 сек. и после окончании паузы (p - PAUSE) отключится
                (OFF).
              </td>
            </tr>
            <tr>
              <td>12:2;p5</td>
              <td>
                12-й пин будет менять своё состояние (TOGGLE) через 5 сек.
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
            <tr>
              <th>CRON</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>* * * * * * *</td>
              <td>CRON is valid all the time, will fire every second.</td>
            </tr>
            <tr>
              <td>0 * * * * * *</td>
              <td>CRON is valid at the beginning of each minute.</td>
            </tr>
            <tr>
              <td>* * * * * 2 *</td>
              <td>CRON is valid every Tuesday all day long.</td>
            </tr>
            <tr>
              <td>0 0 13-15 * * 2-4 *</td>
              <td>
                CRON is valid every beginning of the minute between hours 13-15
                afternoon, between Tuesday and Thursday.
              </td>
            </tr>
            <tr>
              <td>*/5 * * * * * *</td>
              <td>CRON is valid every 5 seconds starting at 0.</td>
            </tr>
            <tr>
              <td>*/5 */5 * * * *</td>
              <td>
                CRON is valid every 5 seconds each 5 minutes, from 00:00 to
                55:55.
              </td>
            </tr>
            <tr>
              <td>0 0 0 * * 5 *</td>
              <td>Every Friday at midnight.</td>
            </tr>
            <tr>
              <td>0 0 */2 * * *</td>
              <td>Every 2 hours at beginning of the hour.</td>
            </tr>
            <tr>
              <td>* * */2 * * *</td>
              <td>
                Every second of every minute every 2 hours (0, 2, 4, .., 22).
              </td>
            </tr>
            <tr>
              <td>0 0 0 * * 1-5 *</td>
              <td>At midnight, 00:00 every week between Monday and Friday.</td>
            </tr>
            <tr>
              <td>15 23 */6 * * *</td>
              <td>
                Every 6 hours at (min:sec) 23:15 (00:23:15, 06:23:15, 12:23:15,
                …).
              </td>
            </tr>
            <tr>
              <td>0 0 0 1 * * *</td>
              <td>At 00:00:00 beginning of the month.</td>
            </tr>
            <tr>
              <td>0 0 0 1 */3 *</td>
              <td>Every beginning of the quarter at 00:00:00.</td>
            </tr>
            <tr>
              <td>10 15 20 * 8 6 *</td>
              <td>At 20:15:20 every Saturday in August.</td>
            </tr>
            <tr>
              <td>10 15 20 8 * 6 *</td>
              <td>
                At 20:15:20 every Saturday that is also 8th day in month (both
                must match, day Saturday and date 8th).
              </td>
            </tr>
            <tr>
              <td>30-45 * * * * *</td>
              <td>Every second between 30 and 45.</td>
            </tr>
            <tr>
              <td>30-45/3 * * * * *</td>
              <td>
                Every 3rd second in every minute, when seconds are between 30
                and 45.
              </td>
            </tr>
            <tr>
              <td>0 23/1 * * * *</td>
              <td>
                Every beginning of a minute when minute is between 23 and 59.
              </td>
            </tr>
            <tr>
              <td>50-10 * * * * *</td>
              <td>
                Every second when seconds are from 50-59 and 00-10 (overflow
                mode).
              </td>
            </tr>
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
            <tr>
              <th>ACTION</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>18:1;p5;18:0</td>
              <td>
                Pin 18 will turn on (ON) at the specified time (CRON), stay on
                for 5 seconds and turn off (OFF) at the end of the pause (p -
                PAUSE).
              </td>
            </tr>
            <tr>
              <td>12:2;p5</td>
              <td>
                Pin 12 will change its state (TOGGLE) after 5 seconds (p -
                PAUSE).
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
    `};if($===null)return Et`<div>Loading...</div>`;const _e=()=>({langtimers:le==="ru"?rulangtimers:enlangtimers}),Ie=(se,ie)=>{const Te=_e(),oe=(Te[se]&&Te[se][ie]?Te[se][ie]:"").split(" "),Xt=[];for(let ae=0;ae<oe.length;ae+=15)Xt.push(oe.slice(ae,ae+15).join(" "));return Xt.join("<br>")},Se=(se,ie)=>{Zt(se),te(ie),st(!0)},re=()=>{st(!1),Zt(null),te(null)},ge=se=>{console.log("handleCronChange:",se),_($.map(ie=>ie.id===se.id?se:ie)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(se)}).then(ie=>ie.json()).then(ie=>{console.log("Cron job updated successfully:",ie)}).catch(ie=>{console.error("Error updating cron job:",ie)})},we=()=>Array.isArray(vt)?vt.flatMap(se=>se.pinact?Object.keys(se.pinact).map(ie=>({value:ie,label:ie})):[]):vt&&vt.pinact?Object.keys(vt.pinact).map(se=>({value:se,label:se})):[],ye=se=>Et`
    <th class="px-3 py-2 relative group">
      ${se.title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-orange-300 p-2 rounded shadow-lg whitespace-normal break-words text-left"
        style="width: fit-content; max-width: 80vw; left: 50%; transform: translateX(-50%); top: 100%;"
      >
        ${Ie("langtimers",se.tooltipIndex)}
      </div>
    </th>
  `;return Et`
    <div class="flex-grow flex flex-col justify-center items-center">
      <div class="flex-grow flex flex-col justify-center items-center">
        <div class="font-medium uppercase flex items-center px-4 py-2">
          Timer(s)
        </div>
        <div class="mb-4">
          ${$&&$.length>0?Et`
                <table
                  class="table-auto border divide-y divide-gray-200 overflow-x-auto"
                >
                  <thead>
                    <tr class="bg-gray-400">
                      <${ye} title="No" tooltipIndex=${1} />
                      <${ye} title="Cron" tooltipIndex=${2} />
                      <${ye} title="Script" tooltipIndex=${3} />
                      <${ye} title="Info" tooltipIndex=${4} />
                      <${ye} title="On/Off" tooltipIndex=${5} />
                      <${ye} title="Action" tooltipIndex=${6} />
                    </tr>
                  </thead>
                  <tbody>
                    ${$.slice(0,ue).map((se,ie)=>Et`
                        <tr
                          class=${ie%2===0?"bg-green-300":"bg-white"}
                        >
                          <td class="border px-4 py-2">${se.id}</td>
                          <td class="border px-4 py-2">${se.cron}</td>
                          <td class="border px-4 py-2">${se.activ}</td>
                          <td class="border px-4 py-2">${se.info}</td>
                          <td class="border px-4 py-2">
                            <${MyPolzunok}
                              value=${se.onoff}
                              onChange=${Te=>ge({...se,onoff:Te})}
                            />
                          </td>
                          <td class="border px-4 py-2">
                            <button
                              onclick=${()=>Se("edit",se)}
                              class="text-blue-500 hover:text-blue-700 ml-2"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              `:Et`<div>No cron jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onclick=${()=>ee(!Yt)}
          >
            ${Yt?"Hide Help":"Show Help"}
          </button>
          <div>
            ${$.length-ue>0?`Still available: ${$.length-ue} cron jobs`:"No available: cron jobs!"}
          </div>
          <div>
            ${ue<$.length?Et`
                  <button
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onclick=${ne}
                  >
                    +
                  </button>
                `:null}
            ${ue>0?Et`
                  <button
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onclick=${$e}
                  >
                    -
                  </button>
                `:null}
          </div>
        </div>
      </div>
      ${Yt&&Et`<div class="mt-4">${Ee[le]}</div>`}
      ${ct&&Et`
        <${ModalCron}
          modalType=${pt}
          page="TabCron"
          hideModal=${re}
          title=${pt==="edit"?"Edit Timer(s)":"Edit Connection"}
          selectedCron=${vt}
          handleCronChange=${ge}
          connectionOptions=${we()}
          modalClass="mt-24"
        />
      `}
    </div>
  `}function ModalOneWire({oneWire:$,onClose:_,onUpdate:k,refresh:dt,closeOnOverlayClick:ct=!0}){console.log("oneWire object:",$);const[st,pt]=ut({typsensor:$.typsensor,numdevices:$.numdevices}),[Zt,vt]=ut(!1),[te,le]=ut($.onoff||0),ht=fe=>{ct&&fe.target.classList.contains("modal-overlay")&&_()},Yt=fe=>{const{name:be,value:pe}=fe.target;let me={...st,[be]:parseInt(pe,10)};be==="typsensor"&&(pe==="0"?me.numdevices=0:pe==="2"&&(me.numdevices=1)),pt(me)},ee=fe=>{le(fe)};return Et`
    <div
      class="fixed inset-0 z-50 bg-black bg-opacity-50"
      style="margin-top: 7px;"
      onclick=${ht}
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <div
          class="modal-content bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
          style="max-height: calc(100vh - 57px); overflow-y: auto;"
        >
          <div
            class="modal-header flex justify-between items-center border-b pb-4 mb-4"
          >
            <h5 class="text-xl font-bold">Edit OneWire pin</h5>
            <button
              class="close-button text-gray-500 hover:text-gray-700"
              onclick=${_}
              disabled=${Zt}
            >
              Close
            </button>
          </div>
          <form onsubmit=${async fe=>{fe.preventDefault(),vt(!0);const be={id:$.id,pin:$.pin,typsensor:st.typsensor,numdevices:st.numdevices,onoff:te};console.log("Sending data:",be);try{if(!(await fetch("api/onewire/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(be)})).ok)throw new Error("Network response was not ok");const me={...$,...st,onoff:te};k(me),_()}catch(pe){console.error("Error updating OneWire:",pe)}finally{vt(!1)}}}>
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
                        value=${st.typsensor}
                        onchange=${Yt}
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
                        value=${st.numdevices}
                        oninput=${st.typsensor===1?Yt:void 0}
                        class="border rounded p-2 w-full ${st.typsensor!==1?"bg-gray-100":""}"
                        min="0"
                        max="10"
                        readonly=${st.typsensor!==1}
                        disabled=${Zt}
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${MyPolzunok}
                        value=${te}
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
                disabled=${Zt}
              >
                ${Zt?"Saving...":"Save changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `}const TabOneWire=()=>{const[$,_]=ut([]),[k,dt]=ut(null),[ct,st]=ut(!1),[pt,Zt]=ut(null),[vt,te]=ut(null),[le,ht]=ut("ru"),[Yt,ee]=ut(null),ue=()=>{console.log("Calling initial refresh..."),fetch("/api/onewire/get").then(re=>re.json()).then(re=>{console.log("Initial data received:",re),ht(re.lang||"ru"),_(re.pins||[]),console.log("Initial OneWire state set:",re.pins),dt(null)}).catch(re=>{console.error("Error in refresh:",re),dt(re.message),_([])})},fe=async()=>{try{const ge=await(await fetch("/api/temp/get")).json();_(we=>we.map(ye=>{if(!ye.sensors||ye.typsensor!==1&&ye.typsensr!==1&&ye.typsensor!==2&&ye.typsensr!==2)return ye;const se=ye.sensors.map(ie=>{var Te,$t;if(ye.typsensor===1||ye.typsensr===1){const oe=(Te=ge.ds18b20)==null?void 0:Te.find(Xt=>Xt.addr===ie.s_number);if(oe)return{...ie,t:oe.temp}}else if(ye.typsensor===2||ye.typsensr===2){const oe=($t=ge.dht22)==null?void 0:$t.find(Xt=>Xt.id===ye.id);if(oe)return{...ie,t:oe.temp,humidity:oe.humidity}}return ie});return{...ye,sensors:se}}))}catch(re){console.error("Error in updateSensorData:",re)}};lt(()=>{console.log("Setting up initial data and interval..."),ue();const re=setInterval(fe,1e3);return()=>{clearInterval(re)}},[]);const be=()=>{st(!1),Zt(null),te(null)},pe=re=>{_(ge=>ge.map(we=>{var ye;if(we.id===re.oneWireId){const se=((ye=we.sensors)==null?void 0:ye.map(ie=>ie.s_number===re.s_number?{...ie,...re}:ie))||[];return{...we,sensors:se}}return we})),be()},me=re=>{te(re),st(!0)},xe=re=>{_(ge=>ge.map(we=>we.id===re.id?{...we,onoff:re.onoff}:we))},ne=re=>{_(ge=>ge.map(we=>we.id===re.id?re:we)),be()};if(k)return Et`<div>Error fetching sensor data: ${k}</div>`;const $e=()=>({lang1Wire:le==="ru"?rulange1Wire:enlange1Wire}),Ee=(re,ge)=>{const we=$e(),se=(we[re]&&we[re][ge]?we[re][ge]:"").split(" "),ie=[];for(let Te=0;Te<se.length;Te+=15)ie.push(se.slice(Te,Te+15).join(" "));return ie.join("<br>")},_e=re=>Et`
    <th class="px-3 py-2 relative group">
      ${re.title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-orange-300 p-2 rounded shadow-lg whitespace-normal break-words text-left"
        style="width: fit-content; max-width: 80vw; left: 50%; transform: translateX(-50%); top: 100%;"
      >
        ${Ee("lang1Wire",re.tooltipIndex)}
      </div>
    </th>
  `,Ie=({device:re,index:ge})=>{const we=re.pins||re.pin,ye=re.typsensor||re.typsensr||0,se=re.numdevices||re.numsens||0;return Et`
      <tr class="${ge%2===1?"bg-white":"bg-green-300"}">
        <td class="px-4 py-2">${re.id}</td>
        <td class="px-4 py-2">${we}</td>
        <td class="px-4 py-2">${["None","DS18B20","DHT22"][ye]}</td>
        <td class="px-4 py-2">${se}</td>
        <td class="px-4 py-2">
          <${MyPolzunok}
            value=${re.onoff||0}
            onChange=${ie=>xe({...re,onoff:ie})}
          />
        </td>
        <td class="px-4 py-2">
          <button
            class="text-blue-500 hover:text-blue-700"
            onclick=${()=>me(re)}
          >
            Edit
          </button>
        </td>
      </tr>
      ${ye!==0&&se>0?Et`
            <tr>
              <td colspan="7" class="px-4 py-2">
                <table class="w-full">
                  <${Se} d=${re} />
                </table>
              </td>
            </tr>
          `:""}
    `},Se=({d:re})=>{const ge=re.typsensor||re.typsensr||0,we=re.numdevices||re.numsens||0;if(ge===0||we===0)return Et`
        <tr>
          <td colspan="7" class="px-4 py-2">
            No connected sensors for this OneWire pin.
          </td>
        </tr>
      `;let ye=re.sensors||[];const se=(ie,Te)=>{const $t=ge===2;return Et`
        <tr class="${Te%2===0?"bg-blue-100":"bg-white"}">
          <td class="px-4 py-2">
            <div class="bg-blue-200 p-4 rounded-lg shadow-md">
              <div
                class="font-semibold text-lg mb-2 flex justify-between items-center"
              >
                <span>
                  ${$t?"DHT22 Sensor":`DS18B20 Sensor (S/N: ${ie.s_number})`}
                </span>
                <a
                  href="#"
                  class="text-blue-500 hover:text-blue-700"
                  onclick=${oe=>{oe.preventDefault(),Zt({...ie,oneWireId:re.id,sensorType:ge,pins:re.pins||re.pin}),st(!0)}}
                >
                  Edit
                </a>
              </div>
              <table class="w-full text-sm">
                <tr>
                  <td class="font-medium pr-2">Current Temperature:</td>
                  <td class="action-column">${ie.t}°C</td>
                </tr>
                ${$t&&"humidity"in ie?Et`
                      <tr>
                        <td class="font-medium pr-2">Current Humidity:</td>
                        <td class="action-column">${ie.humidity}%</td>
                      </tr>
                    `:""}
                <tr>
                  <td class="font-medium pr-2">
                    Upper Temp. Limit = ${ie.ut}°C
                  </td>
                  <td class="action-column">Action: ${ie.action_ut}</td>
                </tr>
                <tr>
                  <td class="font-medium pr-2">
                    Lower Temp. Limit = ${ie.lt}°C
                  </td>
                  <td class="action-column">Action: ${ie.action_lt}</td>
                </tr>
                ${$t&&"upphumid"in ie?Et`
                      <tr>
                        <td class="font-medium pr-2">
                          Upper Humidity Limit = ${ie.upphumid}%
                        </td>
                        <td class="action-column">
                          Action: ${ie.actuphum}
                        </td>
                      </tr>
                      <tr>
                        <td class="font-medium pr-2">
                          Lower Humidity Limit = ${ie.humlolim}%
                        </td>
                        <td class="action-column">
                          Action: ${ie.actlowhum}
                        </td>
                      </tr>
                    `:""}
                <tr>
                  <td class="font-medium pr-2">Info:</td>
                  <td class="action-column">${ie.info}</td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      `};return ye.length>0&&Object.keys(ye[0]).length>0?ye.map((ie,Te)=>se(ie,Te)):Et`<tr>
          <td colspan="7" class="px-4 py-2">
            No sensor data available for this OneWire pin.
          </td>
        </tr>`};return Et`
    <div class="flex-grow flex flex-col justify-center items-center">
      <div class="font-medium uppercase flex items-center px-4 py-2">
        OneWire(s) pin(s)
      </div>
      <div class="flex-grow flex flex-col justify-center items-center">
        <div class="justify-center">
          <div class="mb-4">
            <table class="table-auto border divide-y divide-gray-200">
              <thead>
                <tr class="bg-gray-400">
                  <${_e} title="ID" tooltipIndex=${1} />
                  <${_e} title="Pin" tooltipIndex=${2} />
                  <${_e} title="Selected sensor" tooltipIndex=${3} />
                  <${_e} title="Count of sensors" tooltipIndex=${4} />
                  <${_e} title="On/Off" tooltipIndex=${5} />
                  <${_e} title="Actions" tooltipIndex=${6} />
                </tr>
              </thead>
              <tbody id="tab1">
                ${$.length>0?$.map((re,ge)=>Et`<${Ie}
                          device=${re}
                          index=${ge}
                          key=${re.id}
                        />`):Et`
                      <tr>
                        <td colspan="6" class="px-4 py-2">
                          ${k?`Error fetching sensor data: ${k}`:"No available pins configured as OneWire!"}
                        </td>
                      </tr>
                    `}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      ${ct&&(pt?Et`
            <${ModalEditSensor}
              typsensor=${pt}
              oneWireId=${pt.oneWireId}
              pins=${pt.pins}
              onClose=${be}
              onUpdate=${pe}
              sensorType=${pt.sensorType}
              closeOnOverlayClick=${!0}
              refresh=${ue}
            />
          `:Et`
            <${ModalOneWire}
              oneWire=${vt}
              onClose=${be}
              onUpdate=${ne}
              closeOnOverlayClick=${!0}
              refresh=${ue}
            />
          `)}
    </div>
  `};function ModalEditSensor({typsensor:$,oneWireId:_,pins:k,onClose:dt,onUpdate:ct,sensorType:st,sensorData:pt,closeOnOverlayClick:Zt=!0}){const[vt,te]=ut({ut:(pt==null?void 0:pt.ut)||$.ut,lt:(pt==null?void 0:pt.lt)||$.lt,action_ut:(pt==null?void 0:pt.action_ut)||$.action_ut,action_lt:(pt==null?void 0:pt.action_lt)||$.action_lt,upphumid:(pt==null?void 0:pt.upphumid)||$.upphumid||0,humlolim:(pt==null?void 0:pt.humlolim)||$.humlolim||0,actuphum:(pt==null?void 0:pt.actuphum)||$.actuphum||"",actlowhum:(pt==null?void 0:pt.actlowhum)||$.actlowhum||"",info:(pt==null?void 0:pt.info)||$.info,onoff:(pt==null?void 0:pt.onoff)||$.onoff||0,humidity:(pt==null?void 0:pt.humidity)||$.humidity||0}),[le,ht]=ut(!1),Yt=(pe,me,xe)=>{if(pe===""||pe==="-")return pe;const ne=pe.replace(",",".");if(!/^-?\d*\.?\d*$/.test(ne))return null;const $e=parseFloat(ne);return isNaN($e)||$e<me||$e>xe?null:ne},ee=pe=>{const{name:me,value:xe}=pe.target;if(["ut","lt"].includes(me)){const ne=Yt(xe,-55,125);ne!==null&&te($e=>({...$e,[me]:ne}))}else if(["upphumid","humlolim"].includes(me)){const ne=Yt(xe,0,100);ne!==null&&te($e=>({...$e,[me]:ne}))}else te(ne=>({...ne,[me]:xe}))},ue=pe=>{const me=["ut","lt","upphumid","humlolim"],xe={...pe};return me.forEach(ne=>{xe[ne]===""||xe[ne]==="-"?xe[ne]=0:xe[ne]=parseFloat(xe[ne].toString().replace(",","."))}),xe};return Et`
    <div
      class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 pt-10"
      onclick=${pe=>{Zt&&pe.target===pe.currentTarget&&dt()}}
    >
      <div
        class="modal-content bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
        style="transform: translateY(260px);"
      >
        <div
          class="modal-header flex justify-between items-center border-b pb-4 mb-4"
        >
          <h5 class="text-xl font-bold">Edit Sensor</h5>
          <button
            class="close-button text-gray-500 hover:text-gray-700"
            onclick=${dt}
          >
            Close
          </button>
        </div>
        <form onsubmit=${async pe=>{pe.preventDefault(),ht(!0);const me=ue(vt);try{if(!(await fetch("/api/sensor/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:_,pins:k,sensorNumber:$.s_number,...me,s_number:$.s_number,t:$.t})})).ok)throw new Error("Network response was not ok");ct({...$,...me,oneWireId:_,pins:k,s_number:$.s_number,t:$.t}),dt()}catch{}finally{ht(!1)}}}>
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
                      oninput=${ee}
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
                      oninput=${ee}
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
                      oninput=${ee}
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
                      oninput=${ee}
                      class="border rounded p-2 w-full"
                      maxlength="100"
                    />
                  </td>
                </tr>
                ${st===2?Et`
                      <tr class="bg-blue-100">
                        <td class="p-2 font-bold">Humidity upper limit</td>
                        <td class="p-2">
                          <input
                            type="text"
                            name="upphumid"
                            value=${vt.upphumid}
                            oninput=${ee}
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
                            oninput=${ee}
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
                            oninput=${ee}
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
                            oninput=${ee}
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
                      oninput=${ee}
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
  `}function ModalSIM800L({hideModal:$,title:_,selectedGps:k,onSave:dt}){const[ct,st]=ut((k==null?void 0:k.tel)||""),[pt,Zt]=ut((k==null?void 0:k.info)||""),[vt,te]=ut((k==null?void 0:k.onoff)===1),[le,ht]=ut(!0),Yt=fe=>/^\+\d{11,20}$/.test(fe);return Et`
    <div
      class="fixed inset-0 z-50 bg-black bg-opacity-50"
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

          <form onSubmit=${fe=>{if(fe.preventDefault(),!le)return;const be={tel:ct,info:pt,onoff:vt?1:0};console.log("Сохраняемые данные:",be),fetch("/api/sim800l/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(be)}).then(pe=>pe.json()).then(pe=>{typeof dt=="function"&&dt(be),$()}).catch(pe=>{console.error("Error:",pe)})}}>
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
                        onInput=${fe=>{const be=fe.target.value;st(be),ht(Yt(be))}}
                        class=${`border rounded p-2 w-full ${!le&&ct!==""?"border-red-500":""}`}
                        placeholder="+XXXXXXXXXXX"
                      />
                      ${!le&&ct!==""?Et`
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
                        onInput=${fe=>Zt(fe.target.value)}
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
                disabled=${!le||ct===""}
                class=${`font-bold py-2 px-4 rounded ${le&&ct!==""?"bg-blue-500 hover:bg-blue-700 text-white":"bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `}const ModalSecurity=({modalType:$,page:_,hideModal:k,title:dt,selectedSecurity:ct,onSecurityChange:st,SliderComponent:pt=MyPolzunok})=>{const[Zt,vt]=ut((ct==null?void 0:ct.info)||""),[te,le]=ut((ct==null?void 0:ct.onoff)||0),[ht,Yt]=ut((ct==null?void 0:ct.ptype)||0),[ee,ue]=ut((ct==null?void 0:ct.send_sms)||""),[fe,be]=ut((ct==null?void 0:ct.action)||""),[pe,me]=ut([]),[xe,ne]=ut({send_sms:null,action:null}),[$e,Ee]=ut(null),_e=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,Ie=(se,ie)=>!ie||ie.trim()===""||ie.toLowerCase()==="none"?null:se==="action"?_e.test(ie)?null:'Incorrect format. Use "None" or "pin:value" format.':ie.length>100?"Text should not exceed 100 characters":null,Se=(se,ie)=>{const Te=Ie(se,ie);switch(ne($t=>({...$t,[se]:Te})),se){case"send_sms":ue(ie);break;case"action":be(ie);break}};lt(()=>{fetch("/api/monitoring/get").then(se=>se.json()).then(se=>{Array.isArray(se)?me(se.filter(ie=>ie.topin===2)):me([])}).catch(se=>{console.error("Error fetching pin config:",se),me([])})},[]);const re=se=>{if(se.preventDefault(),Object.values(xe).some(Te=>Te!==null)){Ee("Please correct the errors before submitting.");return}const ie={...ct,info:Zt,send_sms:ee||"NO",action:fe||"None",onoff:te,ptype:ht};fetch("/api/monitoring/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ie)}).then(Te=>{if(!Te.ok)throw new Error("Network response was not ok");return Te.json()}).then(Te=>{if(Te.error)throw new Error(Te.error);st(ie),k()}).catch(Te=>{console.error("Error:",Te),Ee("Failed to save changes. Please try again.")})},ge=()=>{Yt(0),ue(""),be(""),vt(""),le(0),ne({send_sms:null,action:null})};return Et`
    <div
      class="fixed inset-0 z-50 bg-black bg-opacity-50"
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
              onClick=${k}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          ${_==="TabSecurity"&&$==="connection"?Et`
    <form onSubmit=${re}>
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
                  value=${(ct==null?void 0:ct.setrpins)||""}
                  onChange=${se=>st({...ct,setrpins:se.target.value})}
                  class="border rounded p-2 w-full"
                >
                  <option value="">Select a connection</option>
                  ${pe.map(se=>Et`
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
    <form onSubmit=${re}>
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
                  value=${ht}
                  onChange=${se=>Yt(parseInt(se.target.value))}
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
                  value=${fe}
                  onInput=${se=>Se("action",se.target.value)}
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
                  value=${ee}
                  onchange=${se=>Se("send_sms",se.target.value)}
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
                  value=${Zt}
                  onInput=${se=>vt(se.target.value)}
                  class="border rounded p-2 w-full"
                />
              </td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">On/Off</td>
              <td class="p-2">
                <${pt} value=${te} onChange=${le} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-between mt-4">
        <button
          type="button"
          onClick=${ge}
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
  `},TabSecurity=()=>{const[$,_]=ut({lang:"ru",sim800l:0,onoff:0,tel:"",info:""}),[k,dt]=ut(!1),[ct,st]=ut(!1),[pt,Zt]=ut([]),[vt,te]=ut(!1),[le,ht]=ut("ru"),[Yt,ee]=ut(!1),[ue,fe]=ut(""),[be,pe]=ut(null),[me,xe]=ut(!1),[ne,$e]=ut("connected"),[Ee,_e]=ut(0),Ie=(oe,Xt)=>{let ae;return(...ve)=>{clearTimeout(ae),ae=setTimeout(()=>oe(...ve),Xt)}},Se=async(oe,Xt={},ae=3)=>{try{const ve=await fetch(oe,Xt);if(!ve.ok)throw new Error("Network response was not ok");return $e("connected"),ve}catch(ve){if($e("error"),ae>0)return await new Promise(ce=>setTimeout(ce,1e3)),Se(oe,Xt,ae-1);throw $e("disconnected"),ve}},re={ru:Et`
      <div className="space-y-6 max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            Модуль SIM800L📱
          </h2>
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
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            SIM800L Module📱
          </h2>
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
    `},ge={ru:Et`
      <div className="space-y-6 max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            Подключение датчиков 🔌
          </h2>
  
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
            <h2 className="text-lg font-semibold mb-4 text-blue-600">
              Настройка SMS-уведомлений 📱
            </h2>
            
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded">
                <p className="font-medium">✅ Значение <span className="text-blue-500 font-bold">'YES'</span> в столбце "Send SMS" таблицы 'Security Pins':</p>
                <p>SMS-уведомление будет отправлено</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium">⭕ Значение <span className="text-blue-500 font-bold">'NO'</span> в столбце "Send SMS" таблицы 'Security Pins':</p>
                <p>SMS-уведомление не будет отправлено</p>
              </div>
            </div>
  
            <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">📍 Примечание:</h3>
              <ul className="space-y-2">
                <li>• Действия в столбце 'Action' зависят от ползунка 'OnOff' выбранного пина, и не зависят от настройки "Send SMS"!</li>
                <li>• Данная страница отслеживает изменения сенсоров и автоматически отправляет каждое изменение по MQTT на топик: <span className="text-blue-500 font-bold">Swarm/security/ </span> Где "Swarm" это Ваш 'TX topic' на странице Settings.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `,en:Et`
      <div className="space-y-6 max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            Sensor Connection 🔌
          </h2>
  
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
              <li>• When motion detected: output HIGH (logical 1, maximum <span className="text-red-500 font-bold">+3.3V</span>)</li>
            </ul>
          </div>
  
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">
              SMS Notification Settings 📱
            </h2>
            
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded">
                <p className="font-medium">✅ Value <span className="text-blue-500 font-bold">'YES'</span> in "Send SMS" column of 'Security Pins' table:</p>
                <p>SMS notification will be sent</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium">⭕ Value <span className="text-blue-500 font-bold">'NO'</span> in "Send SMS" column of 'Security Pins' table:</p>
                <p>SMS notification will not be sent</p>
              </div>
            </div>
  
            <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">📍 Note:</h3>
              <ul className="space-y-2">
                <li>• Actions in the 'Action' column depend on the 'OnOff' slider of the selected pin, and do not depend on the "Send SMS" setting!</li>
                <li>• This page monitors sensor changes and automatically sends each change via MQTT to the topic: <span className="text-blue-500 font-bold">Swarm/security/ </span> Where "Swarm" is your 'TX topic' on the Settings page.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `},we=async()=>{if(!(me||Date.now()-Ee<500))try{const Xt=await(await Se("/api/sim800l/get")).json();_(Xt)}catch(oe){console.error("Error fetching SIM800L data:",oe)}},ye=async()=>{if(!(me||Date.now()-Ee<500))try{const Xt=await(await Se("/api/monitoring/get")).json();Zt(Xt.pins||[]),ht(Xt.lang||"ru")}catch(oe){console.error("Error fetching monitoring data:",oe)}};lt(()=>{const oe=setInterval(()=>{we(),ye()},500);return()=>clearInterval(oe)},[]);const se=Ie(async oe=>{xe(!0);try{const Xt=await Se("/api/sim800l/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(oe)});_(oe),_e(Date.now())}catch(Xt){console.error("Error updating SIM800L:",Xt)}finally{xe(!1)}},300),ie=async oe=>{try{const Xt=await fetch("/api/monitoring/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(oe)});if(!Xt.ok)throw new Error(`HTTP error! status: ${Xt.status}`);Zt(ae=>ae.map(ve=>ve.id===oe.id?oe:ve)),await ye(),ee(!1)}catch(Xt){console.error("Error updating security:",Xt),alert("Failed to save changes. Please try again."),await ye()}},Te=oe=>{console.log("handleOnOffChange:",oe),Zt(Xt=>Xt.map(ae=>ae.id===oe.id?{...ae,...oe}:ae)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:oe.id,onoff:oe.onoff})}).then(Xt=>Xt.json()).then(Xt=>{console.log("Response from /api/onoff/set:",Xt)}).catch(Xt=>{console.error("Error calling /api/onoff/set:",Xt)}),closeModal()},$t=(oe,Xt)=>{fe(oe),pe(Xt),ee(!0)};return Et`
    <div class="flex flex-col items-center w-full p-4">
      ${ne!=="connected"&&Et`
        <div
          class=${`w-full p-2 mb-4 text-white text-center 
          ${ne==="error"?"bg-yellow-500":"bg-red-500"}`}
        >
          ${ne==="error"?"Connection problems. Retrying...":"Connection lost. Check your internet connection."}
        </div>
      `}
      <div class="flex flex-col items-center w-full p-4">
        <div class="w-full max-w-4xl mb-8">
          <h2 class="text-xl font-bold mb-4">SIM800L Settings</h2>
          <table class="w-full border-collapse bg-gray-400 shadow-sm mb-4">
            <thead>
              <tr>
                <th>RXD Pin</th>
                <th>TXD Pin</th>
                <th>Phone Number</th>
                <th>Info</th>
                <th>OnOff</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-green-300">
                <td>
                  ${$.sim800l===1?"PA3(1)":"Not configured"}
                </td>
                <td>
                  ${$.sim800l===1?"PD5(35)":"Not configured"}
                </td>
                <td>${$.tel||"Not set"}</td>
                <td>${$.info||"No info"}</td>
                <td>
                  <${MyPolzunok}
                    value=${$.onoff}
                    onChange=${oe=>se({...$,onoff:oe})}
                  />
                </td>
                <td>
                  <button
                    onClick=${()=>dt(!0)}
                    class="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex justify-end w-full">
            <button
              onClick=${()=>st(!ct)}
              class="bg-blue-500 hover:bg-blue-700 text-white"
            >
              ${ct?"Hide Help":"Show Help"}
            </button>
          </div>
          ${ct&&re[le]}
        </div>

        <div class="w-full max-w-4xl">
          <h2 class="text-xl font-bold mb-4">Security Pins</h2>
          <table
            class="table-auto border divide-y divide-gray-200 overflow-x-auto"
          >
            <thead>
              <tr class="bg-gray-400">
                <th>ID</th>
                <th>Pin</th>
                <th>Type of sensor</th>
                <th>Action</th>
                <th>Send SMS</th>
                <th>INFO</th>
                <th>On/Off</th>
                <th>Edit Pin</th>
              </tr>
            </thead>
            <tbody>
              ${pt.length>0?pt.map((oe,Xt)=>Et`
                      <tr
                        class="${Xt%2===1?"bg-white":"bg-green-300"}"
                      >
                        <td class="px-4 py-2">${oe.id}</td>
                        <td class="px-4 py-2">${oe.pins}</td>
                        <td class="px-4 py-2">
                          ${["PIR","Normal open","Normal close"][oe.ptype]}
                        </td>
                        <td class="px-4 py-2">${oe.action}</td>
                        <td class="px-4 py-2">${oe.send_sms}</td>
                        <td class="px-4 py-2">${oe.info}</td>
                        <td class="px-4 py-2">
                          <${MyPolzunok}
                            value=${oe.onoff}
                            onChange=${ae=>Te({...oe,onoff:ae})}
                          />
                        </td>
                        <td class="px-4 py-2">
                          <button
                            onClick=${()=>$t("edit",oe)}
                            class="text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    `):Et`
                    <tr>
                      <td colspan="8" class="text-center">
                        No monitoring data available
                      </td>
                    </tr>
                  `}
            </tbody>
          </table>
          <div class="flex justify-end mt-4">
            <button
              onClick=${()=>te(!vt)}
              class="bg-blue-500 hover:bg-blue-700 text-white"
            >
              ${vt?"Hide Help":"Show Help"}
            </button>
          </div>
          ${vt&&ge[le]}
        </div>

        ${k&&Et`
          <${ModalSIM800L}
            hideModal=${()=>dt(!1)}
            title="Edit SIM800L Settings"
            selectedGps=${$}
            onSave=${se}
          />
        `}
        ${Yt&&Et`
          <${ModalSecurity}
            modalType=${ue}
            page="TabSecurity"
            hideModal=${()=>ee(!1)}
            title="Edit Security Settings"
            selectedSecurity=${be}
            onSecurityChange=${ie}
          />
        `}
      </div>
    </div>
  `};function FirmwareStatus({title:$,info:_,children:k}){return Et`
    <div class="bg-white xm-4 divide-y border rounded flex flex-col">
      <div
        class="font-light uppercase flex items-center text-gray-600 px-4 py-2"
      >
        ${$}
      </div>
      <div class="px-4 py-3 flex flex-col gap-2 grow">
        <div>Version: ${_.version||"N/A"}</div>
        <div>Status: ${_.status||"N/A"}</div>
        ${k}
      </div>
    </div>
  `}function FirmwareUpdate({}){const[$,_]=ut([{},{}]),[k,dt]=ut(null),ct=()=>fetch("api/firmware/status").then(Yt=>Yt.json()).then(Yt=>_(Yt));lt(ct,[]),lt(()=>{if(k){const Yt=setTimeout(()=>{dt(null)},3e3);return()=>clearTimeout(Yt)}},[k]);const st=Yt=>fetch("api/firmware/commit").then(ee=>ee.json()).then(ct),pt=Yt=>fetch("api/reboot",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reboot:1})}).then(ee=>ee.json()).then(ee=>new Promise(ue=>setTimeout(()=>{ct(),ue()},5e3))),Zt=Yt=>fetch("api/firmware/rollback").then(pt),vt=Yt=>fetch("api/device/eraselast").then(ct),te=function(Yt){if(!Yt){dt({type:"yellow",message:"Error: No file selected."});return}const ee=Yt.name.split(".").pop().toLowerCase();if(ee!=="bin"&&ee!=="hex"){dt({type:"red",message:"Error: Only .bin and .hex files are allowed!"});return}const ue=new FormData;ue.append("file",Yt),fetch("api/firmware/upload",{method:"POST",body:ue}).then(fe=>{if(!fe.ok)throw new Error(`HTTP error! status: ${fe.status}`);return fe.json()}).then(()=>{dt({type:"green",message:"Firmware uploaded successfully!"}),ct()}).catch(fe=>{dt({type:"yellow",message:`Error: Upload failed. ${fe.message}`})})},le=({type:Yt,message:ee})=>Et`
      <div
        class=${`fixed top-0 left-0 right-0 z-50 border-b-4 p-4 ${Yt==="red"?"bg-red-100 border-red-500 text-red-700":Yt==="yellow"?"bg-yellow-100 border-yellow-500 text-yellow-700":"bg-green-100 border-green-500 text-green-700"}`}
        role="alert"
      >
        <p class="font-bold text-center">${ee}</p>
      </div>
    `,ht=({title:Yt,onupload:ee})=>Et`
      <label
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        ${Yt}
        <input
          type="file"
          class="hidden"
          accept=".bin,.hex"
          onChange=${fe=>{const be=fe.target.files[0];be&&ee(be)}}
        />
      </label>
    `;return Et`
    ${k&&Et`<${le} type=${k.type} message=${k.message} />`}
    <div class="m-4 gap-4 grid grid-cols-1 lg:grid-cols-3">
      <${FirmwareStatus} title="Current firmware image" info=${$[0]}>
        <div class="flex flex-wrap gap-2">
          <${Button}
            title="Commit this firmware"
            onclick=${st}
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
          <${ht}
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
  `}const pageSetting=({value:$,setfn:_,type:k,options:dt,error:ct,...st})=>{let pt;const Zt=`w-full px-3 py-2 border rounded-md ${ct?"border-red-500":"border-gray-300"}`;switch(k){case"text":case"password":case"number":pt=Et`
        <input
          type=${k}
          value=${$}
          onInput=${vt=>_(vt.target.value)}
          class=${Zt}
          ...${st}
        />
      `;break;case"select":pt=Et`
        <select
          value=${$}
          onChange=${vt=>_(vt.target.value)}
          class=${Zt}
          ...${st}
        >
          ${dt.map(([vt,te])=>Et` <option value=${vt}>${te}</option> `)}
        </select>
      `;break;case"switch":pt=Et`
        <label class="switch">
          <input
            type="checkbox"
            checked=${$}
            onChange=${vt=>_(vt.target.checked)}
            ...${st}
          />
          <span class="slider round"></span>
        </label>
      `;break;default:pt=Et`<span>Неподдерживаемый тип: ${k}</span>`}return Et`
    <div>
      ${pt}
      ${ct&&Et`<div class="text-red-500 text-sm mt-1">${ct}</div>`}
    </div>
  `};function Settings({}){const[$,_]=ut({}),[k,dt]=ut(null),[ct,st]=ut(null),[pt,Zt]=ut({}),vt=at(null),[te,le]=ut(null),[ht,Yt]=ut(null),[ee,ue]=ut(!1),[fe,be]=ut(!1),[pe,me]=ut(!1),[xe,ne]=ut(!1),[$e,Ee]=ut(!1),[_e,Ie]=ut(!0),Se=[{value:"en",label:"English"},{value:"ru",label:"Russian"}],re=[[-12,"(GMT -12:00) Eniwetok, Kwajalein"],[-11,"(GMT -11:00) Midway Island, Samoa"],[-10,"(GMT -10:00) Hawaii"],[-9,"(GMT -9:00) Alaska"],[-8,"(GMT -8:00) Pacific Time (US & Canada)"],[-7,"(GMT -7:00) Mountain Time (US & Canada)"],[-6,"(GMT -6:00) Central Time (US & Canada), Mexico City"],[-5,"(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima"],[-4,"(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz"],[-3.3,"(GMT -3:30) Newfoundland"],[-3,"(GMT -3:00) Brazil, Buenos Aires, Georgetown"],[-2,"(GMT -2:00) Mid-Atlantic"],[-1,"(GMT -1:00) Azores, Cape Verde Islands"],[0,"(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca"],[1,"(GMT +1:00) Brussels, Copenhagen, Madrid, Paris"],[2,"(GMT +2:00) Kaliningrad, South Africa"],[3,"(GMT +3:00) Яшалта, Moscow, St. Petersburg, Baghdad, Riyadh"],[3.3,"(GMT +3:30) Tehran"],[4,"(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi"],[4.3,"(GMT +4:30) Kabul"],[5,"(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"],[5.3,"(GMT +5:30) Bombay, Calcutta, Madras, New Delhi"],[5.45,"(GMT +5:45) Kathmandu"],[6,"(GMT +6:00) Almaty, Dhaka, Colombo"],[7,"(GMT +7:00) Bangkok, Hanoi, Jakarta"],[8,"(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"],[9,"(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"],[9.3,"(GMT +9:30) Adelaide, Darwin"],[10,"(GMT +10:00) Eastern Australia, Guam, Vladivostok"],[11,"(GMT +11:00) Magadan, Solomon Islands, New Caledonia"],[12,"(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"]],ge=/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,we=/^(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)$/,ye=mt=>{if(!mt)return{date:"",time:""};const he=mt.match(/d:(\d{1,2}\.\d{1,2}\.\d{2})/),de=mt.match(/t:(\d{2}:\d{2}:\d{2})/);return{date:he?he[1]:"",time:de?de[1]:""}},se=mt=>{if(!/^\d{1,2}\.\d{1,2}\.\d{2}$/.test(mt))return!1;const[de,ke,Oe]=mt.split(".").map(Number);if(ke<1||ke>12||de<1||de>31||Oe<0||Oe>99)return!1;const Ce=new Date().getFullYear()%100;if(Oe>Ce+5)return!1;const Pe=new Date(2e3+Oe,ke,0).getDate();return!(de>Pe)},ie=mt=>!!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(mt),Te=(mt,he)=>{const de=Object.values(he).some(Oe=>Oe!==null),ke=mt.usehttps?mt.domain&&mt.domain.trim()!=="":!0;return!(de||!ke)},$t=(mt,he)=>{le({message:mt,type:he}),setTimeout(()=>{le(null)},3e3)},oe=mt=>{Yt(mt),setTimeout(()=>{Yt(null)},3e3)},Xt=(mt,he)=>{let de=null;if(!$.usehttps&&["domain","tls_key","tls_cert","tls_ca","telegram_token"].includes(mt))return null;if(!he&&["ip_addr","gateway","mqtt_hst","sb_mask","offdate","offtime","domain"].includes(mt))return"Поле не может быть пустым";switch(mt){case"ip_addr":case"gateway":case"mqtt_hst":ge.test(he)||(de="Неверный IP-адрес");break;case"sb_mask":we.test(he)||(de="Неверная маска подсети");break;case"offdate":se(he)||(de="Неверный формат даты (д.м.гг)");break;case"offtime":ie(he)||(de="Неверный формат времени (чч:мм:сс)");break;case"domain":he.length>50?de="Домен не должен превышать 50 символов":he.match(/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/)||(de="Неверный формат домена");break;case"tls_key":he&&he.trim()!==""&&(he.length>512?de="Private Key не должен превышать 512 символов":(!he.includes("BEGIN EC PRIVATE KEY")||!he.includes("END EC PRIVATE KEY"))&&(de="Неверный формат Private Key"));break;case"tls_cert":he&&he.trim()!==""&&(he.length>1024?de="Public Key не должен превышать 1024 символов":(!he.includes("BEGIN CERTIFICATE")||!he.includes("END CERTIFICATE"))&&(de="Неверный формат Public Key"));break;case"tls_ca":he&&he.trim()!==""&&(he.length>1024?de="Secret Key не должен превышать 1024 символов":(!he.includes("BEGIN CERTIFICATE")||!he.includes("END CERTIFICATE"))&&(de="Неверный формат Secret Key"));break}return de},ae=mt=>{mt.preventDefault();const he=new FormData(vt.current);let de={...$};for(const[ke,Oe]of he.entries())["lon_de","lat_de","timezone","mqtt_prt"].includes(ke)?de[ke]=Oe===""||Oe===null?0:Number(Oe):de[ke]=Oe;de.usehttps||["tls_ca","tls_key","tls_cert","telegram_token","domain"].forEach(Oe=>{delete de[Oe]}),de.offdate&&de.offtime?de.offldt=`d:${de.offdate} t:${de.offtime}`:delete de.offldt,["lon_de","lat_de","timezone","mqtt_prt"].forEach(ke=>{(de[ke]===null||de[ke]==="")&&(de[ke]=0)}),de.onsunrise=de.onsunrise?1:0,de.onsunset=de.onsunset?1:0,de.check_ip=de.check_ip?1:0,de.check_mqtt=de.check_mqtt?1:0,de.usehttps=de.usehttps?1:0,fetch("/api/mysett/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(de)}).then(ke=>{if(!ke.ok)throw new Error("Ошибка сети или сервера");return ke.json()}).then(ke=>{st("success"),dt(ke),$t("Данные успешно сохранены","success"),oe("Данные успешно сохранены")}).catch(ke=>{st("error"),dt(ke),$t("Ошибка при сохранении данных","error"),oe("Ошибка при сохранении данных")})},ve=(mt,he)=>{let de=null;mt==="offdate"?de=se(he)?null:"Неверный формат даты (д.м.гг)":mt==="offtime"?de=ie(he)?null:"Неверный формат времени (чч:мм:сс)":de=Xt(mt,he),Zt(Oe=>{const Ce={...Oe,[mt]:de},Pe=["tls_key","tls_cert","tls_ca"],Me=Object.keys(Ce).filter(Ne=>!Pe.includes(Ne)&&Ne!=="telegram_token").some(Ne=>Ce[Ne]!==null);return ue(Me||!$.usehttps&&Pe.some(Ne=>$[Ne])),Ce});let ke=he;["lon_de","lat_de","timezone","mqtt_prt"].includes(mt)?ke=he===""||he===null?0:Number(he):["onsunrise","onsunset","check_ip","check_mqtt","usehttps"].includes(mt)&&(ke=he?1:0),_(Oe=>({...Oe,[mt]:ke})),mt==="usehttps"&&(Zt({}),ue(!1))},ce=()=>fetch("/api/mysett/get").then(mt=>mt.json()).then(mt=>{if(mt.offldt){const{date:he,time:de}=ye(mt.offldt);mt.offdate=he,mt.offtime=de}console.log("Loaded settings:",mt),_(mt)}).catch(mt=>{console.error("Error fetching settings:",mt),$t("Ошибка при загрузке настроек","error")});return lt(()=>{ce().then(()=>{$!=null&&$.tls_key&&be(!0),$!=null&&$.tls_cert&&me(!0),$!=null&&$.tls_ca&&ne(!0),$!=null&&$.telegram_token&&Ee(!0),Ie(!1)})},[]),lt(()=>{const mt=Te($,pt);ue(!mt)},[$,pt]),_e?Et`<div>Loading...</div>`:$?(Object.values(pt).some(mt=>mt!==null),Et`
  <div class="m-4 divide-y divide-gray-200 overflow-auto rounded bg-white">
    <div class="font-medium uppercase flex items-center px-4 py-2 bg-gray-400">
      <span>Global settings</span>
      <select
        value=${$.lang}
        onChange=${mt=>ve("lang",mt.target.value)}
        class="ml-2 px-2 py-1 bg-white rounded text-sm"
      >
        ${Se.map(mt=>Et` <option value=${mt.value}>${mt.label}</option> `)}
      </select>
    </div>
    <div class="flex-grow flex flex-col justify-center items-center">
      ${ht&&Et`
        <div class="w-full bg-green-500 text-white px-4 py-2 text-center mb-4">
          ${ht}
        </div>
      `}
      <form
        ref=${vt}
        onSubmit=${ae}
        class="justify-center overflow-x-auto mb-4 w-full max-w-2xl settings-table"
      >
        <div class="flex justify-start items-center p-2">
          <button
            type="submit"
            class=${`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${ee?"opacity-50 cursor-not-allowed":""}`}
            disabled=${ee}
          >
            Save changes
          </button>
        </div>
        <div class="flex flex-col items-center">
          ${[{label:"Login",key:"adm_name",type:"text"},{label:"Password",key:"adm_pswd",type:"password"},{label:"Time zone UTC",key:"timezone",type:"select",options:re}].map((mt,he)=>Et`
              <div
                class="flex items-center w-full justify-center ${he%2===1?"bg-white":"bg-green-300"} p-2"
              >
                <div class="w-1/3 font-medium text-right pr-4">
                  ${mt.label}
                </div>
                <div class="w-2/3">
                  <${pageSetting}
                    value=${$[mt.key]}
                    setfn=${de=>ve(mt.key,de)}
                    type=${mt.type}
                    options=${mt.options}
                    class="w-full"
                    error=${pt[mt.key]}
                  />
                </div>
              </div>
            `)}

          <div class="flex items-center w-full justify-center bg-gray-400 p-2 mt-1">
            <div class="w-1/3 font-medium text-right pr-4">
              ${$.check_ip?"DHCP":"Static IP"}
            </div>
            <div class="w-2/3">
              <${Setting}
                value=${$.check_ip}
                setfn=${mt=>ve("check_ip",mt)}
                type="switch"
                class="w-full"
              />
            </div>
          </div>

          ${!$.check_ip&&Et`
            ${[{label:"IP address",key:"ip_addr"},{label:"Subnet mask",key:"sb_mask"},{label:"Default gateway",key:"gateway"}].map((mt,he)=>Et`
                <div
                  class="flex items-center w-full justify-center ${he%2===1?"bg-white":"bg-green-300"} p-2"
                >
                  <div class="w-1/3 font-medium text-right pr-4">
                    ${mt.label}
                  </div>
                  <div class="w-2/3">
                    <${pageSetting}
                      value=${$[mt.key]}
                      setfn=${de=>ve(mt.key,de)}
                      type="text"
                      class="w-full"
                      error=${pt[mt.key]}
                    />
                  </div>
                </div>
              `)}
          `}

          <div class="w-full text-center font-bold bg-gray-400 p-2 mt-1">
            API settings
          </div>

          <div class="flex items-center w-full justify-center bg-green-300 p-2">
            <div class="w-1/3 font-medium text-right pr-4">Token</div>
            <div class="w-2/3">
              <${Setting}
                value=${$.token}
                setfn=${mt=>ve("token",mt)}
                type="text"
                class="w-full"
              />
            </div>
          </div>

          <div class="flex items-center w-full justify-center bg-gray-400 p-2 mt-1">
            <div class="w-1/3 font-medium text-right pr-4">MQTT</div>
            <div class="w-2/3">
              <${Setting}
                value=${$.check_mqtt}
                setfn=${mt=>ve("check_mqtt",mt)}
                type="switch"
                class="w-full"
              />
            </div>
          </div>

          ${$.check_mqtt?Et`
                ${[{label:"Host",key:"mqtt_hst",type:"text"},{label:"Port",key:"mqtt_prt",type:"number"},{label:"Client",key:"mqtt_clt",type:"text"},{label:"User",key:"mqtt_usr",type:"text"},{label:"Password",key:"mqtt_pswd",type:"password"},{label:"TX topic",key:"txmqttop",type:"text"},{label:"RX topic",key:"rxmqttop",type:"text"}].map((mt,he)=>Et`
                    <div
                      class="flex items-center w-full justify-center ${he%2===1?"bg-white":"bg-green-300"} p-2"
                    >
                      <div class="w-1/3 font-medium text-right pr-4">
                        ${mt.label}
                      </div>
                      <div class="w-2/3">
                        <${pageSetting}
                          value=${$[mt.key]}
                          setfn=${de=>ve(mt.key,de)}
                          type=${mt.type}
                          class="w-full"
                          error=${pt[mt.key]}
                        />
                      </div>
                    </div>
                  `)}
              `:null}

          <div class="flex items-center w-full justify-center bg-gray-400 p-2 mt-1">
            <div class="w-1/3 font-medium text-right pr-4">HTTPS</div>
            <div class="w-2/3">
              <${Setting}
                value=${$.usehttps}
                setfn=${mt=>ve("usehttps",mt)}
                type="switch"
                class="w-full"
              />
            </div>
          </div>

          ${$.usehttps?Et`
                ${[{label:"HTTPS domain",key:"domain",type:"text"},{label:"Private Key",key:"tls_key",type:"textarea"},{label:"Public Key",key:"tls_cert",type:"textarea"}].map((mt,he)=>Et`
                    <div
                      class="flex items-center w-full justify-center ${he%2===1?"bg-white":"bg-green-300"} p-2"
                    >
                      <div class="w-1/3 font-medium text-right pr-4">
                        ${mt.label}
                      </div>
                      <div class="w-2/3 flex items-center">
                        <div class="relative w-full">
                          ${mt.key==="telegram_token"?Et`
                                ${$.telegram_token?Et`
                                      <div class="border p-1 rounded w-full bg-gray-100 text-gray-500">
                                        Данные введены, но информация скрыта!
                                      </div>
                                    `:Et`
                                      <input
                                        name=${mt.key}
                                        type="text"
                                        value=${$[mt.key]||""}
                                        onInput=${de=>ve(mt.key,de.target.value)}
                                        class="w-full px-2 py-1 border rounded"
                                        placeholder="Enter Telegram bot token"
                                      />
                                    `}
                          `:mt.type==="textarea"?Et`
                                ${mt.key==="tls_ca"&&$.tls_ca?Et`
                                      <div class="border p-1 rounded w-full bg-gray-100 text-gray-500">
                                        Данные введены, но информация скрыта!
                                      </div>
                                    `:mt.key==="tls_key"&&$.tls_key?Et`
                                      <div class="border p-1 rounded w-full bg-gray-100 text-gray-500">
                                        Данные введены, но информация скрыта!
                                      </div>
                                    `:mt.key==="tls_cert"&&$.tls_cert?Et`
                                      <div class="border p-1 rounded w-full bg-gray-100 text-gray-500">
                                        Данные введены успешно!
                                      </div>
                                    `:Et`
                                      <textarea
                                        name=${mt.key}
                                        value=${$[mt.key]||""}
                                        onInput=${de=>ve(mt.key,de.target.value)}
                                        class="w-full px-2 py-1 border rounded"
                                        rows="1"
                                        placeholder="Enter ${mt.label}"
                                      ></textarea>
                                    `}
                          `:mt.key==="domain"?Et`
                                <input
                                  type="text"
                                  name=${mt.key}
                                  value=${$[mt.key]||""}
                                  onInput=${de=>ve(mt.key,de.target.value)}
                                  class="w-full px-2 py-1 border rounded"
                                  maxlength="30"
                                  placeholder="Enter domain (e.g., zagotovka.ddns.net)"
                                />
                              `:Et`
                                <${pageSetting}
                                  value=${$[mt.key]}
                                  setfn=${de=>ve(mt.key,de)}
                                  type=${mt.type}
                                  class="w-full"
                                  error=${pt[mt.key]}
                                />
                              `}
                          ${$[mt.key]&&mt.key==="tls_cert"&&Et`
                            <div class="absolute right-0 top-0 mt-1 flex space-x-2">
                              <button
                                type="button"
                                onClick=${()=>{navigator.clipboard.writeText($[mt.key]),Yt("Данные скопированы"),setTimeout(()=>Yt(""),3e3)}}
                                class="px-2 py-1 bg-green-500 text-white rounded text-sm"
                              >
                                Копировать
                              </button>
                              <button
                                type="button"
                                onClick=${()=>ve(mt.key,"")}
                                class="px-2 py-1 bg-red-500 text-white rounded text-sm"
                              >
                                Очистить
                              </button>
                            </div>
                          `}
                          ${$[mt.key]&&mt.key!=="domain"&&mt.key!=="tls_cert"&&Et`
                            <button
                              type="button"
                              onClick=${()=>ve(mt.key,"")}
                              class="absolute right-0 top-0 mt-1 mr-1 px-2 py-1 bg-red-500 text-white rounded text-sm"
                            >
                              Очистить
                            </button>
                          `}
                        </div>
                        ${pt[mt.key]&&Et`
                          <div class="text-red-500 text-sm mt-1">${pt[mt.key]}</div>
                        `}
                      </div>
                    </div>
                  `)}
              `:null}

          <div class="w-full text-center font-bold bg-gray-400 p-2 mt-1">
            Coordinate settings
          </div>
          <div class="flex items-center w-full justify-center bg-green-300 p-2">
            <div class="w-1/3 font-medium text-right pr-4">Longitude</div>
            <div class="w-2/3">
              <${Setting}
                value=${$.lon_de}
                setfn=${mt=>ve("lon_de",mt)}
                type="text"
                class="w-full"
              />
            </div>
          </div>
          <div class="flex items-center w-full justify-center bg-white p-2">
            <div class="w-1/3 font-medium text-right pr-4">Latitude</div>
            <div class="w-2/3">
              <${Setting}
                value=${$.lat_de}
                setfn=${mt=>ve("lat_de",mt)}
                type="text"
                class="w-full"
              />
            </div>
          </div>

          <div class="flex items-center w-full justify-center bg-green-300 p-2">
            <div class="w-1/3 font-medium text-right pr-4">
              Sunrise: ${$.sunrise}
            </div>
            <div class="w-2/3 flex items-center">
              <input
                type="text"
                value=${$.sunrise_pins||""}
                onInput=${mt=>ve("sunrise_pins",mt.target.value)}
                maxlength="20"
                placeholder="Action for sunrise"
                class="w-1/2 mr-2 px-2 py-1 border rounded"
              />
              <${Setting}
                value=${$.onsunrise}
                setfn=${mt=>ve("onsunrise",mt)}
                type="switch"
                class="w-1/2"
              />
            </div>
          </div>
          <div class="flex items-center w-full justify-center bg-white p-2">
            <div class="w-1/3 font-medium text-right pr-4">
              Sunset: ${$.sunset}
            </div>
            <div class="w-2/3 flex items-center">
              <input
                type="text"
                value=${$.sunset_pins||""}
                onInput=${mt=>ve("sunset_pins",mt.target.value)}
                maxlength="20"
                placeholder="Action for sunset"
                class="w-1/2 mr-2 px-2 py-1 border rounded"
              />
              <${Setting}
                value=${$.onsunset}
                setfn=${mt=>ve("onsunset",mt)}
                type="switch"
                class="w-1/2"
              />
            </div>
          </div>
          <div class="flex items-center w-full justify-center bg-green-300 p-2">
            <div class="w-1/3 font-medium text-right pr-4">Day Length</div>
            <div class="w-2/3">
              <span class="text-lg">${$.dlength}</span>
            </div>
          </div>

          <div class="flex items-center w-full justify-center bg-gray-400 p-2">
            <div class="w-1/3 font-medium text-right pr-4">
              Next full moon:
            </div>
            <div class="w-2/3">
              <span class="text-lg">
                ${typeof $.fullmoon=="string"&&$.fullmoon?`${$.fullmoon.split(" ")[0]} at ${$.fullmoon.split(" ")[1]}`:"N/A"}
              </span>
            </div>
          </div>

          <div class="flex items-center w-full justify-between bg-gray-400 p-2 mt-1">
            <div class="flex items-center flex-1">
              <div class="whitespace-nowrap font-medium pr-2">[OFFLINE MODE] Date</div>
              <div style="width: 200px;">
                <input
                  type="text"
                  name="offdate"
                  value=${$.offdate||""}
                  onInput=${mt=>ve("offdate",mt.target.value)}
                  placeholder="Enter date (dd.mm.yy)"
                  class="w-full px-2 py-1 border rounded"
                />
                ${pt.offdate&&Et`<div class="text-red-500 text-sm mt-1">${pt.offdate}</div>`}
              </div>
            </div>
            <div class="flex items-center flex-1 ml-2">
              <div class="whitespace-nowrap font-medium pr-2">Time</div>
              <div style="width: 200px;">
                <input
                  type="text"
                  name="offtime"
                  value=${$.offtime||""}
                  onInput=${mt=>ve("offtime",mt.target.value)}
                  placeholder="Enter time (hh:mm:ss)"
                  class="w-full px-2 py-1 border rounded"
                />
                ${pt.offtime&&Et`<div class="text-red-500 text-sm mt-1">${pt.offtime}</div>`}
              </div>
            </div>
          </div>

          ${ht&&Et`
              <div class="w-full bg-green-500 text-white px-4 py-2 text-center mt-4">
                ${ht}
              </div>
            `}

        </div> <!-- Закрытие flex flex-col items-center -->

        <!-- Контейнер для кнопки "Save changes" -->
        <div class="flex justify-end p-2">
          <button
            type="submit"
            class=${`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${ee?"opacity-50 cursor-not-allowed":""}`}
            disabled=${ee}
          >
            Save changes
          </button>
        </div>
      </form> <!-- Закрытие формы -->
    </div> <!-- Закрытие flex-grow flex flex-col justify-center items-center -->
  </div> <!-- Закрытие внешнего контейнера -->
`):""}const App=function({}){const[$,_]=ut(!0),[k,dt]=ut("/"),[ct,st]=ut(""),[pt,Zt]=ut(!0),vt=()=>fetch("api/logout").then(le=>st("")),te=le=>le.ok?le.json().then(ht=>st(ht.user)).finally(ht=>_(!1)):_(!1)&&st(null);return lt(()=>fetch("api/login").then(te),[]),$?"":ct?Et` <div class="min-h-screen bg-slate-100" id="mains">
    <${Sidebar} url=${k} show=${pt} />
    <${Header}
      logout=${vt}
      user=${ct}
      showSidebar=${pt}
      setShowSidebar=${Zt}
    />
    <div
      class="${pt&&"pl-72"} transition-all duration-300 transform"
    >
      <${Qt}
        onChange=${le=>dt(le.url)}
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
      loginFn=${te}
      logoIcon=${Logo}
      title="Device Dashboard Login"
      tipText="To login, use: admin/admin, user1/user1, user2/user2"
    />`};window.onload=()=>O(y(App),document.body);
