(function(){const _=document.createElement("link").relList;if(_&&_.supports&&_.supports("modulepreload"))return;for(const dt of document.querySelectorAll('link[rel="modulepreload"]'))ct(dt);new MutationObserver(dt=>{for(const st of dt)if(st.type==="childList")for(const pt of st.addedNodes)pt.tagName==="LINK"&&pt.rel==="modulepreload"&&ct(pt)}).observe(document,{childList:!0,subtree:!0});function k(dt){const st={};return dt.integrity&&(st.integrity=dt.integrity),dt.referrerPolicy&&(st.referrerPolicy=dt.referrerPolicy),dt.crossOrigin==="use-credentials"?st.credentials="include":dt.crossOrigin==="anonymous"?st.credentials="omit":st.credentials="same-origin",st}function ct(dt){if(dt.ep)return;dt.ep=!0;const st=k(dt);fetch(dt.href,st)}})();var t,n,e,r,o,u,i,l,c,a,s,f={},p=[],h=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,d=Array.isArray;function v($,_){for(var k in _)$[k]=_[k];return $}function m($){var _=$.parentNode;_&&_.removeChild($)}function y($,_,k){var ct,dt,st,pt={};for(st in _)st=="key"?ct=_[st]:st=="ref"?dt=_[st]:pt[st]=_[st];if(arguments.length>2&&(pt.children=arguments.length>3?t.call(arguments,2):k),typeof $=="function"&&$.defaultProps!=null)for(st in $.defaultProps)pt[st]===void 0&&(pt[st]=$.defaultProps[st]);return g($,pt,ct,dt,null)}function g($,_,k,ct,dt){var st={type:$,props:_,key:k,ref:ct,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:dt??++e,__i:-1,__u:0};return dt==null&&n.vnode!=null&&n.vnode(st),st}function b($){return $.children}function C($,_){this.props=$,this.context=_}function x($,_){if(_==null)return $.__?x($.__,$.__i+1):null;for(var k;_<$.__k.length;_++)if((k=$.__k[_])!=null&&k.__e!=null)return k.__e;return typeof $.type=="function"?x($):null}function w($){var _,k;if(($=$.__)!=null&&$.__c!=null){for($.__e=$.__c.base=null,_=0;_<$.__k.length;_++)if((k=$.__k[_])!=null&&k.__e!=null){$.__e=$.__c.base=k.__e;break}return w($)}}function P($){(!$.__d&&($.__d=!0)&&r.push($)&&!U.__r++||o!==n.debounceRendering)&&((o=n.debounceRendering)||u)(U)}function U(){var $,_,k,ct,dt,st,pt,te;for(r.sort(i);$=r.shift();)$.__d&&(_=r.length,ct=void 0,st=(dt=(k=$).__v).__e,pt=[],te=[],k.__P&&((ct=v({},dt)).__v=dt.__v+1,n.vnode&&n.vnode(ct),M(k.__P,ct,dt,k.__n,k.__P.namespaceURI,32&dt.__u?[st]:null,pt,st??x(dt),!!(32&dt.__u),te),ct.__v=dt.__v,ct.__.__k[ct.__i]=ct,L(pt,ct,te),ct.__e!=st&&w(ct)),r.length>_&&r.sort(i));U.__r=0}function H($,_,k,ct,dt,st,pt,te,Yt,ee,le){var ht,Xt,ne,he,ue,me=ct&&ct.__k||p,de=_.length;for(k.__d=Yt,E(k,_,me),Yt=k.__d,ht=0;ht<de;ht++)(ne=k.__k[ht])!=null&&typeof ne!="boolean"&&typeof ne!="function"&&(Xt=ne.__i===-1?f:me[ne.__i]||f,ne.__i=ht,M($,ne,Xt,dt,st,pt,te,Yt,ee,le),he=ne.__e,ne.ref&&Xt.ref!=ne.ref&&(Xt.ref&&F(Xt.ref,null,ne),le.push(ne.ref,ne.__c||he,ne)),ue==null&&he!=null&&(ue=he),65536&ne.__u||Xt.__k===ne.__k?(Yt&&!Yt.isConnected&&(Yt=x(Xt)),Yt=S(ne,Yt,$)):typeof ne.type=="function"&&ne.__d!==void 0?Yt=ne.__d:he&&(Yt=he.nextSibling),ne.__d=void 0,ne.__u&=-196609);k.__d=Yt,k.__e=ue}function E($,_,k){var ct,dt,st,pt,te,Yt=_.length,ee=k.length,le=ee,ht=0;for($.__k=[],ct=0;ct<Yt;ct++)pt=ct+ht,(dt=$.__k[ct]=(dt=_[ct])==null||typeof dt=="boolean"||typeof dt=="function"?null:typeof dt=="string"||typeof dt=="number"||typeof dt=="bigint"||dt.constructor==String?g(null,dt,null,null,null):d(dt)?g(b,{children:dt},null,null,null):dt.constructor===void 0&&dt.__b>0?g(dt.type,dt.props,dt.key,dt.ref?dt.ref:null,dt.__v):dt)!=null?(dt.__=$,dt.__b=$.__b+1,te=D(dt,k,pt,le),dt.__i=te,st=null,te!==-1&&(le--,(st=k[te])&&(st.__u|=131072)),st==null||st.__v===null?(te==-1&&ht--,typeof dt.type!="function"&&(dt.__u|=65536)):te!==pt&&(te===pt+1?ht++:te>pt?le>Yt-pt?ht+=te-pt:ht--:te<pt?te==pt-1&&(ht=te-pt):ht=0,te!==ct+ht&&(dt.__u|=65536))):(st=k[pt])&&st.key==null&&st.__e&&!(131072&st.__u)&&(st.__e==$.__d&&($.__d=x(st)),I(st,st,!1),k[pt]=null,le--);if(le)for(ct=0;ct<ee;ct++)(st=k[ct])!=null&&!(131072&st.__u)&&(st.__e==$.__d&&($.__d=x(st)),I(st,st))}function S($,_,k){var ct,dt;if(typeof $.type=="function"){for(ct=$.__k,dt=0;ct&&dt<ct.length;dt++)ct[dt]&&(ct[dt].__=$,_=S(ct[dt],_,k));return _}$.__e!=_&&(k.insertBefore($.__e,_||null),_=$.__e);do _=_&&_.nextSibling;while(_!=null&&_.nodeType===8);return _}function A($,_){return _=_||[],$==null||typeof $=="boolean"||(d($)?$.some(function(k){A(k,_)}):_.push($)),_}function D($,_,k,ct){var dt=$.key,st=$.type,pt=k-1,te=k+1,Yt=_[k];if(Yt===null||Yt&&dt==Yt.key&&st===Yt.type&&!(131072&Yt.__u))return k;if(ct>(Yt!=null&&!(131072&Yt.__u)?1:0))for(;pt>=0||te<_.length;){if(pt>=0){if((Yt=_[pt])&&!(131072&Yt.__u)&&dt==Yt.key&&st===Yt.type)return pt;pt--}if(te<_.length){if((Yt=_[te])&&!(131072&Yt.__u)&&dt==Yt.key&&st===Yt.type)return te;te++}}return-1}function N($,_,k){_[0]==="-"?$.setProperty(_,k??""):$[_]=k==null?"":typeof k!="number"||h.test(_)?k:k+"px"}function R($,_,k,ct,dt){var st;t:if(_==="style")if(typeof k=="string")$.style.cssText=k;else{if(typeof ct=="string"&&($.style.cssText=ct=""),ct)for(_ in ct)k&&_ in k||N($.style,_,"");if(k)for(_ in k)ct&&k[_]===ct[_]||N($.style,_,k[_])}else if(_[0]==="o"&&_[1]==="n")st=_!==(_=_.replace(/(PointerCapture)$|Capture$/i,"$1")),_=_.toLowerCase()in $||_==="onFocusOut"||_==="onFocusIn"?_.toLowerCase().slice(2):_.slice(2),$.l||($.l={}),$.l[_+st]=k,k?ct?k.u=ct.u:(k.u=l,$.addEventListener(_,st?a:c,st)):$.removeEventListener(_,st?a:c,st);else{if(dt=="http://www.w3.org/2000/svg")_=_.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(_!="width"&&_!="height"&&_!="href"&&_!="list"&&_!="form"&&_!="tabIndex"&&_!="download"&&_!="rowSpan"&&_!="colSpan"&&_!="role"&&_ in $)try{$[_]=k??"";break t}catch{}typeof k=="function"||(k==null||k===!1&&_[4]!=="-"?$.removeAttribute(_):$.setAttribute(_,k))}}function T($){return function(_){if(this.l){var k=this.l[_.type+$];if(_.t==null)_.t=l++;else if(_.t<k.u)return;return k(n.event?n.event(_):_)}}}function M($,_,k,ct,dt,st,pt,te,Yt,ee){var le,ht,Xt,ne,he,ue,me,de,pe,ve,se,ge,$e,ye,ce,be=_.type;if(_.constructor!==void 0)return null;128&k.__u&&(Yt=!!(32&k.__u),st=[te=_.__e=k.__e]),(le=n.__b)&&le(_);t:if(typeof be=="function")try{if(de=_.props,pe=(le=be.contextType)&&ct[le.__c],ve=le?pe?pe.props.value:le.__:ct,k.__c?me=(ht=_.__c=k.__c).__=ht.__E:("prototype"in be&&be.prototype.render?_.__c=ht=new be(de,ve):(_.__c=ht=new C(de,ve),ht.constructor=be,ht.render=V),pe&&pe.sub(ht),ht.props=de,ht.state||(ht.state={}),ht.context=ve,ht.__n=ct,Xt=ht.__d=!0,ht.__h=[],ht._sb=[]),ht.__s==null&&(ht.__s=ht.state),be.getDerivedStateFromProps!=null&&(ht.__s==ht.state&&(ht.__s=v({},ht.__s)),v(ht.__s,be.getDerivedStateFromProps(de,ht.__s))),ne=ht.props,he=ht.state,ht.__v=_,Xt)be.getDerivedStateFromProps==null&&ht.componentWillMount!=null&&ht.componentWillMount(),ht.componentDidMount!=null&&ht.__h.push(ht.componentDidMount);else{if(be.getDerivedStateFromProps==null&&de!==ne&&ht.componentWillReceiveProps!=null&&ht.componentWillReceiveProps(de,ve),!ht.__e&&(ht.shouldComponentUpdate!=null&&ht.shouldComponentUpdate(de,ht.__s,ve)===!1||_.__v===k.__v)){for(_.__v!==k.__v&&(ht.props=de,ht.state=ht.__s,ht.__d=!1),_.__e=k.__e,_.__k=k.__k,_.__k.forEach(function(Zt){Zt&&(Zt.__=_)}),se=0;se<ht._sb.length;se++)ht.__h.push(ht._sb[se]);ht._sb=[],ht.__h.length&&pt.push(ht);break t}ht.componentWillUpdate!=null&&ht.componentWillUpdate(de,ht.__s,ve),ht.componentDidUpdate!=null&&ht.__h.push(function(){ht.componentDidUpdate(ne,he,ue)})}if(ht.context=ve,ht.props=de,ht.__P=$,ht.__e=!1,ge=n.__r,$e=0,"prototype"in be&&be.prototype.render){for(ht.state=ht.__s,ht.__d=!1,ge&&ge(_),le=ht.render(ht.props,ht.state,ht.context),ye=0;ye<ht._sb.length;ye++)ht.__h.push(ht._sb[ye]);ht._sb=[]}else do ht.__d=!1,ge&&ge(_),le=ht.render(ht.props,ht.state,ht.context),ht.state=ht.__s;while(ht.__d&&++$e<25);ht.state=ht.__s,ht.getChildContext!=null&&(ct=v(v({},ct),ht.getChildContext())),Xt||ht.getSnapshotBeforeUpdate==null||(ue=ht.getSnapshotBeforeUpdate(ne,he)),H($,d(ce=le!=null&&le.type===b&&le.key==null?le.props.children:le)?ce:[ce],_,k,ct,dt,st,pt,te,Yt,ee),ht.base=_.__e,_.__u&=-161,ht.__h.length&&pt.push(ht),me&&(ht.__E=ht.__=null)}catch(Zt){_.__v=null,Yt||st!=null?(_.__e=te,_.__u|=Yt?160:32,st[st.indexOf(te)]=null):(_.__e=k.__e,_.__k=k.__k),n.__e(Zt,_,k)}else st==null&&_.__v===k.__v?(_.__k=k.__k,_.__e=k.__e):_.__e=W(k.__e,_,k,ct,dt,st,pt,Yt,ee);(le=n.diffed)&&le(_)}function L($,_,k){_.__d=void 0;for(var ct=0;ct<k.length;ct++)F(k[ct],k[++ct],k[++ct]);n.__c&&n.__c(_,$),$.some(function(dt){try{$=dt.__h,dt.__h=[],$.some(function(st){st.call(dt)})}catch(st){n.__e(st,dt.__v)}})}function W($,_,k,ct,dt,st,pt,te,Yt){var ee,le,ht,Xt,ne,he,ue,me=k.props,de=_.props,pe=_.type;if(pe==="svg"?dt="http://www.w3.org/2000/svg":pe==="math"?dt="http://www.w3.org/1998/Math/MathML":dt||(dt="http://www.w3.org/1999/xhtml"),st!=null){for(ee=0;ee<st.length;ee++)if((ne=st[ee])&&"setAttribute"in ne==!!pe&&(pe?ne.localName===pe:ne.nodeType===3)){$=ne,st[ee]=null;break}}if($==null){if(pe===null)return document.createTextNode(de);$=document.createElementNS(dt,pe,de.is&&de),st=null,te=!1}if(pe===null)me===de||te&&$.data===de||($.data=de);else{if(st=st&&t.call($.childNodes),me=k.props||f,!te&&st!=null)for(me={},ee=0;ee<$.attributes.length;ee++)me[(ne=$.attributes[ee]).name]=ne.value;for(ee in me)if(ne=me[ee],ee!="children"){if(ee=="dangerouslySetInnerHTML")ht=ne;else if(ee!=="key"&&!(ee in de)){if(ee=="value"&&"defaultValue"in de||ee=="checked"&&"defaultChecked"in de)continue;R($,ee,null,ne,dt)}}for(ee in de)ne=de[ee],ee=="children"?Xt=ne:ee=="dangerouslySetInnerHTML"?le=ne:ee=="value"?he=ne:ee=="checked"?ue=ne:ee==="key"||te&&typeof ne!="function"||me[ee]===ne||R($,ee,ne,me[ee],dt);if(le)te||ht&&(le.__html===ht.__html||le.__html===$.innerHTML)||($.innerHTML=le.__html),_.__k=[];else if(ht&&($.innerHTML=""),H($,d(Xt)?Xt:[Xt],_,k,ct,pe==="foreignObject"?"http://www.w3.org/1999/xhtml":dt,st,pt,st?st[0]:k.__k&&x(k,0),te,Yt),st!=null)for(ee=st.length;ee--;)st[ee]!=null&&m(st[ee]);te||(ee="value",he!==void 0&&(he!==$[ee]||pe==="progress"&&!he||pe==="option"&&he!==me[ee])&&R($,ee,he,me[ee],dt),ee="checked",ue!==void 0&&ue!==$[ee]&&R($,ee,ue,me[ee],dt))}return $}function F($,_,k){try{typeof $=="function"?$(_):$.current=_}catch(ct){n.__e(ct,k)}}function I($,_,k){var ct,dt;if(n.unmount&&n.unmount($),(ct=$.ref)&&(ct.current&&ct.current!==$.__e||F(ct,null,_)),(ct=$.__c)!=null){if(ct.componentWillUnmount)try{ct.componentWillUnmount()}catch(st){n.__e(st,_)}ct.base=ct.__P=null}if(ct=$.__k)for(dt=0;dt<ct.length;dt++)ct[dt]&&I(ct[dt],_,k||typeof $.type!="function");k||$.__e==null||m($.__e),$.__c=$.__=$.__e=$.__d=void 0}function V($,_,k){return this.constructor($,k)}function O($,_,k){var ct,dt,st,pt;n.__&&n.__($,_),dt=(ct=typeof k=="function")?null:_.__k,st=[],pt=[],M(_,$=(!ct&&k||_).__k=y(b,null,[$]),dt||f,f,_.namespaceURI,!ct&&k?[k]:dt?null:_.firstChild?t.call(_.childNodes):null,st,!ct&&k?k:dt?dt.__e:_.firstChild,ct,pt),L(st,$,pt)}function j($,_,k){var ct,dt,st,pt,te=v({},$.props);for(st in $.type&&$.type.defaultProps&&(pt=$.type.defaultProps),_)st=="key"?ct=_[st]:st=="ref"?dt=_[st]:te[st]=_[st]===void 0&&pt!==void 0?pt[st]:_[st];return arguments.length>2&&(te.children=arguments.length>3?t.call(arguments,2):k),g($.type,te,ct||$.key,dt||$.ref,null)}function q($,_){var k={__c:_="__cC"+s++,__:$,Consumer:function(ct,dt){return ct.children(dt)},Provider:function(ct){var dt,st;return this.getChildContext||(dt=[],(st={})[_]=this,this.getChildContext=function(){return st},this.shouldComponentUpdate=function(pt){this.props.value!==pt.value&&dt.some(function(te){te.__e=!0,P(te)})},this.sub=function(pt){dt.push(pt);var te=pt.componentWillUnmount;pt.componentWillUnmount=function(){dt.splice(dt.indexOf(pt),1),te&&te.call(pt)}}),ct.children}};return k.Provider.__=k.Consumer.contextType=k}t=p.slice,n={__e:function($,_,k,ct){for(var dt,st,pt;_=_.__;)if((dt=_.__c)&&!dt.__)try{if((st=dt.constructor)&&st.getDerivedStateFromError!=null&&(dt.setState(st.getDerivedStateFromError($)),pt=dt.__d),dt.componentDidCatch!=null&&(dt.componentDidCatch($,ct||{}),pt=dt.__d),pt)return dt.__E=dt}catch(te){$=te}throw $}},e=0,C.prototype.setState=function($,_){var k;k=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=v({},this.state),typeof $=="function"&&($=$(v({},k),this.props)),$&&v(k,$),$!=null&&this.__v&&(_&&this._sb.push(_),P(this))},C.prototype.forceUpdate=function($){this.__v&&(this.__e=!0,$&&this.__h.push($),P(this))},C.prototype.render=b,r=[],u=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=function($,_){return $.__v.__b-_.__v.__b},U.__r=0,l=0,c=T(!1),a=T(!0),s=0;var B,K,z,G,J=0,Q=[],X=[],Y=n,Z=Y.__b,tt=Y.__r,nt=Y.diffed,et=Y.__c,_t=Y.unmount,rt=Y.__;function ot($,_){Y.__h&&Y.__h(K,$,J||_),J=0;var k=K.__H||(K.__H={__:[],__h:[]});return $>=k.__.length&&k.__.push({__V:X}),k.__[$]}function ut($){return J=1,it(wt,$)}function it($,_,k){var ct=ot(B++,2);if(ct.t=$,!ct.__c&&(ct.__=[wt(void 0,_),function(te){var Yt=ct.__N?ct.__N[0]:ct.__[0],ee=ct.t(Yt,te);Yt!==ee&&(ct.__N=[ee,ct.__[1]],ct.__c.setState({}))}],ct.__c=K,!K.u)){var dt=function(te,Yt,ee){if(!ct.__c.__H)return!0;var le=ct.__c.__H.__.filter(function(Xt){return!!Xt.__c});if(le.every(function(Xt){return!Xt.__N}))return!st||st.call(this,te,Yt,ee);var ht=!1;return le.forEach(function(Xt){if(Xt.__N){var ne=Xt.__[0];Xt.__=Xt.__N,Xt.__N=void 0,ne!==Xt.__[0]&&(ht=!0)}}),!(!ht&&ct.__c.props===te)&&(!st||st.call(this,te,Yt,ee))};K.u=!0;var st=K.shouldComponentUpdate,pt=K.componentWillUpdate;K.componentWillUpdate=function(te,Yt,ee){if(this.__e){var le=st;st=void 0,dt(te,Yt,ee),st=le}pt&&pt.call(this,te,Yt,ee)},K.shouldComponentUpdate=dt}return ct.__N||ct.__}function lt($,_){var k=ot(B++,3);!Y.__s&&xt(k.__H,_)&&(k.__=$,k.i=_,K.__H.__h.push(k))}function at($){return J=5,ft(function(){return{current:$}},[])}function ft($,_){var k=ot(B++,7);return xt(k.__H,_)?(k.__V=$(),k.i=_,k.__h=$,k.__V):k.__}function yt(){for(var $;$=Q.shift();)if($.__P&&$.__H)try{$.__H.__h.forEach(bt),$.__H.__h.forEach(Ct),$.__H.__h=[]}catch(_){$.__H.__h=[],Y.__e(_,$.__v)}}Y.__b=function($){K=null,Z&&Z($)},Y.__=function($,_){$&&_.__k&&_.__k.__m&&($.__m=_.__k.__m),rt&&rt($,_)},Y.__r=function($){tt&&tt($),B=0;var _=(K=$.__c).__H;_&&(z===K?(_.__h=[],K.__h=[],_.__.forEach(function(k){k.__N&&(k.__=k.__N),k.__V=X,k.__N=k.i=void 0})):(_.__h.forEach(bt),_.__h.forEach(Ct),_.__h=[],B=0)),z=K},Y.diffed=function($){nt&&nt($);var _=$.__c;_&&_.__H&&(_.__H.__h.length&&(Q.push(_)!==1&&G===Y.requestAnimationFrame||((G=Y.requestAnimationFrame)||kt)(yt)),_.__H.__.forEach(function(k){k.i&&(k.__H=k.i),k.__V!==X&&(k.__=k.__V),k.i=void 0,k.__V=X})),z=K=null},Y.__c=function($,_){_.some(function(k){try{k.__h.forEach(bt),k.__h=k.__h.filter(function(ct){return!ct.__||Ct(ct)})}catch(ct){_.some(function(dt){dt.__h&&(dt.__h=[])}),_=[],Y.__e(ct,k.__v)}}),et&&et($,_)},Y.unmount=function($){_t&&_t($);var _,k=$.__c;k&&k.__H&&(k.__H.__.forEach(function(ct){try{bt(ct)}catch(dt){_=dt}}),k.__H=void 0,_&&Y.__e(_,k.__v))};var gt=typeof requestAnimationFrame=="function";function kt($){var _,k=function(){clearTimeout(ct),gt&&cancelAnimationFrame(_),setTimeout($)},ct=setTimeout(k,100);gt&&(_=requestAnimationFrame(k))}function bt($){var _=K,k=$.__c;typeof k=="function"&&($.__c=void 0,k()),K=_}function Ct($){var _=K;$.__c=$.__(),K=_}function xt($,_){return!$||$.length!==_.length||_.some(function(k,ct){return k!==$[ct]})}function wt($,_){return typeof _=="function"?_($):_}var Pt=function($,_,k,ct){var dt;_[0]=0;for(var st=1;st<_.length;st++){var pt=_[st++],te=_[st]?(_[0]|=pt?1:2,k[_[st++]]):_[++st];pt===3?ct[0]=te:pt===4?ct[1]=Object.assign(ct[1]||{},te):pt===5?(ct[1]=ct[1]||{})[_[++st]]=te:pt===6?ct[1][_[++st]]+=te+"":pt?(dt=$.apply(te,Pt($,te,k,["",null])),ct.push(dt),te[0]?_[0]|=2:(_[st-2]=0,_[st]=dt)):ct.push(te)}return ct},Ut=new Map;function Ht($){var _=Ut.get(this);return _||(_=new Map,Ut.set(this,_)),(_=Pt(this,_.get($)||(_.set($,_=function(k){for(var ct,dt,st=1,pt="",te="",Yt=[0],ee=function(Xt){st===1&&(Xt||(pt=pt.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?Yt.push(0,Xt,pt):st===3&&(Xt||pt)?(Yt.push(3,Xt,pt),st=2):st===2&&pt==="..."&&Xt?Yt.push(4,Xt,0):st===2&&pt&&!Xt?Yt.push(5,0,!0,pt):st>=5&&((pt||!Xt&&st===5)&&(Yt.push(st,0,pt,dt),st=6),Xt&&(Yt.push(st,Xt,0,dt),st=6)),pt=""},le=0;le<k.length;le++){le&&(st===1&&ee(),ee(le));for(var ht=0;ht<k[le].length;ht++)ct=k[le][ht],st===1?ct==="<"?(ee(),Yt=[Yt],st=3):pt+=ct:st===4?pt==="--"&&ct===">"?(st=1,pt=""):pt=ct+pt[0]:te?ct===te?te="":pt+=ct:ct==='"'||ct==="'"?te=ct:ct===">"?(ee(),st=1):st&&(ct==="="?(st=5,dt=pt,pt=""):ct==="/"&&(st<5||k[le][ht+1]===">")?(ee(),st===3&&(Yt=Yt[0]),st=Yt,(Yt=Yt[0]).push(2,0,st),st=0):ct===" "||ct==="	"||ct===`
`||ct==="\r"?(ee(),st=2):pt+=ct),st===3&&pt==="!--"&&(st=4,Yt=Yt[0])}return ee(),Yt}($)),_),arguments,[])).length>1?_:_[0]}var Et=Ht.bind(y),St={};function At($,_){for(var k in _)$[k]=_[k];return $}function Dt($,_,k){var ct,dt=/(?:\?([^#]*))?(#.*)?$/,st=$.match(dt),pt={};if(st&&st[1])for(var te=st[1].split("&"),Yt=0;Yt<te.length;Yt++){var ee=te[Yt].split("=");pt[decodeURIComponent(ee[0])]=decodeURIComponent(ee.slice(1).join("="))}$=Tt($.replace(dt,"")),_=Tt(_||"");for(var le=Math.max($.length,_.length),ht=0;ht<le;ht++)if(_[ht]&&_[ht].charAt(0)===":"){var Xt=_[ht].replace(/(^:|[+*?]+$)/g,""),ne=(_[ht].match(/[+*?]+$/)||St)[0]||"",he=~ne.indexOf("+"),ue=~ne.indexOf("*"),me=$[ht]||"";if(!me&&!ue&&(ne.indexOf("?")<0||he)){ct=!1;break}if(pt[Xt]=decodeURIComponent(me),he||ue){pt[Xt]=$.slice(ht).map(decodeURIComponent).join("/");break}}else if(_[ht]!==$[ht]){ct=!1;break}return(k.default===!0||ct!==!1)&&pt}function Nt($,_){return $.rank<_.rank?1:$.rank>_.rank?-1:$.index-_.index}function Rt($,_){return $.index=_,$.rank=function(k){return k.props.default?0:Tt(k.props.path).map(Mt).join("")}($),$.props}function Tt($){return $.replace(/(^\/+|\/+$)/g,"").split("/")}function Mt($){return $.charAt(0)==":"?1+"*+?".indexOf($.charAt($.length-1))||4:5}var Lt={},Wt=[],Ft=[],It=null,Vt={url:jt()},Ot=q(Vt);function jt(){var $;return""+(($=It&&It.location?It.location:It&&It.getCurrentLocation?It.getCurrentLocation():typeof location<"u"?location:Lt).pathname||"")+($.search||"")}function qt($,_){return _===void 0&&(_=!1),typeof $!="string"&&$.url&&(_=$.replace,$=$.url),function(k){for(var ct=Wt.length;ct--;)if(Wt[ct].canRoute(k))return!0;return!1}($)&&function(k,ct){ct===void 0&&(ct="push"),It&&It[ct]?It[ct](k):typeof history<"u"&&history[ct+"State"]&&history[ct+"State"](null,null,k)}($,_?"replace":"push"),Bt($)}function Bt($){for(var _=!1,k=0;k<Wt.length;k++)Wt[k].routeTo($)&&(_=!0);return _}function Kt($){if($&&$.getAttribute){var _=$.getAttribute("href"),k=$.getAttribute("target");if(_&&_.match(/^\//g)&&(!k||k.match(/^_?self$/i)))return qt(_)}}function zt($){return $.stopImmediatePropagation&&$.stopImmediatePropagation(),$.stopPropagation&&$.stopPropagation(),$.preventDefault(),!1}function Gt($){if(!($.ctrlKey||$.metaKey||$.altKey||$.shiftKey||$.button)){var _=$.target;do if(_.localName==="a"&&_.getAttribute("href")){if(_.hasAttribute("data-native")||_.hasAttribute("native"))return;if(Kt(_))return zt($)}while(_=_.parentNode)}}var Jt=!1;function Qt($){$.history&&(It=$.history),this.state={url:$.url||jt()}}At(Qt.prototype=new C,{shouldComponentUpdate:function($){return $.static!==!0||$.url!==this.props.url||$.onChange!==this.props.onChange},canRoute:function($){var _=A(this.props.children);return this.g(_,$)!==void 0},routeTo:function($){this.setState({url:$});var _=this.canRoute($);return this.p||this.forceUpdate(),_},componentWillMount:function(){this.p=!0},componentDidMount:function(){var $=this;Jt||(Jt=!0,It||addEventListener("popstate",function(){Bt(jt())}),addEventListener("click",Gt)),Wt.push(this),It&&(this.u=It.listen(function(_){var k=_.location||_;$.routeTo(""+(k.pathname||"")+(k.search||""))})),this.p=!1},componentWillUnmount:function(){typeof this.u=="function"&&this.u(),Wt.splice(Wt.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function($,_){$=$.filter(Rt).sort(Nt);for(var k=0;k<$.length;k++){var ct=$[k],dt=Dt(_,ct.props.path,ct.props);if(dt)return[ct,dt]}},render:function($,_){var k,ct,dt=$.onChange,st=_.url,pt=this.c,te=this.g(A($.children),st);if(te&&(ct=j(te[0],At(At({url:st,matches:k=te[1]},k),{key:void 0,ref:void 0}))),st!==(pt&&pt.url)){At(Vt,pt=this.c={url:st,previous:pt&&pt.url,current:ct,path:ct?ct.props.path:null,matches:k}),pt.router=this,pt.active=ct?[ct]:[];for(var Yt=Ft.length;Yt--;)Ft[Yt]({});typeof dt=="function"&&dt(pt)}return y(Ot.Provider,{value:pt},ct)}});const switchIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='652.000000pt'%20height='956.000000pt'%20viewBox='0%200%20652.000000%20956.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,956.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M1150%209540%20c-386%20-6%20-408%20-8%20-475%20-29%20-147%20-48%20-255%20-115%20-368%20-226%20-93%20-91%20-145%20-159%20-191%20-250%20-74%20-146%20-77%20-163%20-87%20-455%20-10%20-318%20-14%20-7639%20-4%20-7725%2025%20-214%20107%20-394%20245%20-539%20115%20-121%20227%20-192%20408%20-260%20l72%20-28%202418%20-1%20c2586%20-2%202582%20-2%202716%2047%20254%2092%20492%20346%20573%20611%2017%2058%2018%20211%2018%204095%20l0%204035%20-23%2075%20c-61%20193%20-204%20388%20-368%20501%20-76%2052%20-226%20118%20-294%20129%20-36%206%20-229%2015%20-430%2020%20-398%2010%20-3557%2010%20-4210%200z%20m4610%20-328%20c164%20-59%20291%20-175%20374%20-339%20l36%20-73%200%20-4016%200%20-4016%20-45%20-88%20c-25%20-48%20-70%20-115%20-101%20-148%20-64%20-71%20-175%20-148%20-242%20-168%20-103%20-32%20-400%20-35%20-2687%20-32%20-2180%203%20-2282%204%20-2335%2022%20-204%2068%20-363%20240%20-417%20452%20-17%2065%20-18%20275%20-18%203979%200%203785%201%203912%2019%203980%2024%2091%2084%20207%20140%20271%2055%2062%20182%20152%20244%20171%2027%208%20121%2018%20222%2022%2096%205%201203%208%202460%207%20l2285%20-1%2065%20-23z'/%3e%3cpath%20d='M1434%208128%20l-45%20-41%203%20-3291%20c3%20-3127%204%20-3293%2021%20-3323%209%20-18%2029%20-41%2044%20-50%2026%20-17%20125%20-18%201799%20-18%201918%200%201808%20-3%201834%2054%207%2014%2016%2067%2021%20116%205%2050%209%20789%209%201644%20l0%201554%20249%20981%20c358%201405%20401%201581%20401%201626%200%2051%204%2046%20-414%20468%20l-321%20322%20-1778%200%20-1777%200%20-46%20-42z%20m3636%20-425%20l165%20-168%20-185%20-6%20c-102%20-4%20-770%20-7%20-1485%20-8%20l-1300%20-1%20-145%20148%20c-80%2081%20-156%20159%20-170%20175%20l-23%2027%201489%200%201490%200%20164%20-167z%20m-3078%20-356%20l31%20-38%20-147%20-583%20c-81%20-320%20-153%20-602%20-160%20-626%20-12%20-39%20-13%20-23%20-19%20185%20-9%20291%20-9%20823%200%201123%20l6%20233%20129%20-128%20c71%20-70%20143%20-145%20160%20-166z%20m2900%20-136%20c278%20-3%20510%20-9%20513%20-13%2010%20-10%203%20-40%20-305%20-1260%20l-280%20-1107%200%20-1565%200%20-1566%20-1565%200%20-1565%200%200%201521%200%201520%20310%201226%20c171%20675%20313%201229%20316%201232%2014%2014%201788%2022%202576%2012z'/%3e%3cpath%20d='M3765%206820%20c-61%20-25%20-87%20-94%20-185%20-473%20-80%20-315%20-120%20-493%20-120%20-540%200%20-77%2078%20-141%20163%20-134%2069%206%20101%2040%20131%20141%2057%20190%20197%20746%20212%20843%205%2032%201%2053%20-19%2096%20-22%2048%20-30%2057%20-64%2066%20-44%2013%20-90%2013%20-118%201z'/%3e%3cpath%20d='M3098%203406%20c-104%20-37%20-216%20-134%20-264%20-227%20-24%20-47%20-28%20-71%20-35%20-184%20-19%20-311%20-7%20-500%2037%20-586%2040%20-80%20113%20-151%20201%20-195%20l76%20-39%20151%200%20151%200%2068%2034%20c81%2041%20167%20128%20215%20218%20l32%2061%200%20302%200%20302%20-41%2078%20c-65%20127%20-156%20201%20-284%20235%20-73%2019%20-255%2019%20-307%201z%20m262%20-311%20c58%20-30%2064%20-57%2068%20-301%204%20-219%204%20-222%20-19%20-253%20-65%20-88%20-230%20-95%20-286%20-13%20-16%2024%20-18%2055%20-21%20273%20l-3%20246%2038%2030%20c21%2017%2045%2033%2053%2036%2025%2011%20137%20-1%20170%20-18z'/%3e%3c/g%3e%3c/svg%3e",buttonIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M790%201280%20l0%20-420%2065%200%2065%200%200%20420%200%20420%20-65%200%20-65%200%200%20-420z'/%3e%3cpath%20d='M489%201612%20c-228%20-114%20-386%20-309%20-451%20-557%20-29%20-110%20-29%20-297%200%20-406%2081%20-301%20308%20-530%20607%20-610%20112%20-30%20307%20-30%20420%200%20294%2077%20529%20312%20606%20606%2029%20110%2030%20307%201%20416%20-67%20251%20-245%20462%20-477%20565%20l-55%2024%200%20-74%200%20-74%2072%20-42%20c280%20-167%20411%20-508%20313%20-817%20-35%20-110%20-88%20-196%20-175%20-283%20-87%20-87%20-172%20-139%20-285%20-177%20-70%20-23%20-96%20-27%20-210%20-27%20-114%200%20-140%204%20-210%2027%20-293%2097%20-495%20372%20-495%20673%200%2070%2025%20193%2055%20266%2054%20133%20182%20279%20299%20339%20l66%2034%200%2078%20c0%2042%20-1%2077%20-2%2077%20-2%200%20-37%20-18%20-79%20-38z'/%3e%3c/g%3e%3c/svg%3e",timerIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M818%201670%20c-24%20-15%20-31%20-77%20-23%20-221%208%20-141%2015%20-159%2064%20-159%2050%200%2060%2024%2063%20150%20l3%20115%2030%20-3%20c172%20-19%20366%20-132%20472%20-275%2094%20-129%20133%20-236%20140%20-392%206%20-142%20-12%20-230%20-73%20-355%20-82%20-165%20-236%20-296%20-419%20-357%20-71%20-24%20-95%20-27%20-215%20-27%20-118%200%20-145%203%20-212%2026%20-123%2041%20-204%2092%20-298%20187%20-68%2068%20-94%20103%20-127%20171%20-61%20125%20-76%20203%20-71%20352%206%20153%2036%20243%20122%20371%2064%2095%2068%20127%2021%20149%20-39%2017%20-68%202%20-113%20-59%20-94%20-127%20-150%20-285%20-159%20-449%20-23%20-399%20236%20-749%20632%20-855%20111%20-30%20297%20-30%20410%200%20449%20119%20716%20562%20610%201011%20-23%2095%20-105%20254%20-173%20336%20-111%20131%20-276%20234%20-442%20274%20-89%2021%20-213%2026%20-242%2010z'/%3e%3cpath%20d='M452%201258%20c-7%20-7%20-12%20-17%20-12%20-23%200%20-21%20330%20-469%20358%20-487%2043%20-28%20106%20-23%20143%2010%2043%2038%2052%20113%2020%20154%20-20%2025%20-454%20342%20-484%20354%20-7%202%20-18%20-1%20-25%20-8z'/%3e%3c/g%3e%3c/svg%3e",owIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='110.000000pt'%20height='52.000000pt'%20viewBox='0%200%20110.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M171%20500%20c-50%20-12%20-83%20-41%20-111%20-96%20-22%20-43%20-25%20-62%20-24%20-149%200%20-141%2027%20-199%20109%20-236%2073%20-33%20180%20-16%20227%2037%2067%2076%2074%20284%2013%20376%20-39%2059%20-133%2089%20-214%2068z%20m119%20-65%20c50%20-26%2065%20-67%2065%20-180%200%20-146%20-32%20-195%20-128%20-195%20-40%200%20-54%205%20-77%2028%20-16%2016%20-34%2049%20-40%2073%20-16%2056%20-7%20186%2014%20227%2030%2057%20105%2078%20166%2047z'/%3e%3cpath%20d='M482%20483%20c3%20-10%2029%20-120%2058%20-245%20l54%20-228%2038%200%20c43%200%2035%20-20%2089%20215%2017%2077%2035%20146%2038%20152%204%207%2026%20-73%2051%20-178%20l44%20-190%2039%203%2040%203%2058%20240%20c32%20132%2058%20241%2059%20243%200%202%20-15%202%20-32%200%20l-32%20-3%20-43%20-180%20c-23%20-99%20-44%20-187%20-46%20-195%20-2%20-8%20-25%2074%20-51%20183%20l-48%20198%20-36%20-3%20-36%20-3%20-45%20-194%20c-25%20-106%20-47%20-188%20-49%20-181%20-3%207%20-23%2095%20-46%20194%20l-42%20181%20-33%203%20c-28%203%20-33%201%20-29%20-15z'/%3e%3c/g%3e%3c/svg%3e",encoderIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='34.000000pt'%20height='52.000000pt'%20viewBox='0%200%2034.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M30%20255%20l0%20-245%20150%200%20150%200%200%2030%200%2030%20-115%200%20-115%200%200%2085%200%2085%2095%200%2095%200%200%2030%200%2030%20-95%200%20-95%200%200%2070%200%2070%20115%200%20115%200%200%2030%200%2030%20-150%200%20-150%200%200%20-245z'/%3e%3c/g%3e%3c/svg%3e",Icons={switchIcon:$=>Et`
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
  `,heart:$=>Et`<svg
      class=${$.class}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      ></path>
    </svg>`,downArrowBox:$=>Et`<svg
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
        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
      />
    </svg>`,upArrowBox:$=>Et`<svg
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
        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
      />
    </svg>`,cog:$=>Et`<svg
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
    </svg>`,settingsH:$=>Et`<svg
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
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
      />
    </svg>`,settingsV:$=>Et`<svg
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
        d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
      />
    </svg>`,scan:$=>Et`<svg
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
        d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg> `,desktop:$=>Et`<svg
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
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
      />
    </svg>`,alert:$=>Et`<svg
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
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
      />
    </svg>`,bell:$=>Et`<svg
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
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
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
    </svg>`,save:$=>Et`<svg
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
        d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
      />
    </svg>`,email:$=>Et`<svg
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
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>`,expand:$=>Et`<svg
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
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
      />
    </svg>`,shrink:$=>Et`<svg
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
        d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
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
    </svg>`,fail:$=>Et`<svg
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
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>`,upload:$=>Et`<svg
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
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
      />
    </svg> `,download:$=>Et`<svg
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
    </svg> `,bolt:$=>Et`<svg
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
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    </svg>`,home:$=>Et`<svg
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
    </svg> `,link:$=>Et`<svg
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
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    </svg> `,shield:$=>Et`<svg
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
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg> `,barsdown:$=>Et`<svg
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
        d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
      />
    </svg> `,arrowdown:$=>Et`<svg
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
        d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
      />
    </svg> `,arrowup:$=>Et`<svg
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
        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
      />
    </svg>`,warn:$=>Et`<svg
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
    </svg>`,exclamationTriangle:$=>Et`<svg
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
    </svg>`,chip:$=>Et`<svg
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
        d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
      />
    </svg>`,camera:$=>Et`<svg
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
        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
      />
    </svg>`,arrows:$=>Et`<svg
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
        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
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
    </svg>`},tipColors={green:"bg-green-100 text-green-900 ring-green-300",yellow:"bg-yellow-100 text-yellow-900 ring-yellow-300",red:"bg-red-100 text-red-900 ring-red-300"};function Button({title:$,onclick:_,disabled:k,cls:ct,icon:dt,ref:st,colors:pt,hovercolor:te,disabledcolor:Yt}){const[ee,le]=ut(!1),ht=function(Xt){const ne=_?_():null;ne&&typeof ne.catch=="function"&&(le(!0),ne.catch(()=>!1).then(()=>le(!1)))};return pt||(pt="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400"),Et` <button
    type="button"
    class="inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${pt} ${ct}"
    ref=${st}
    onclick=${ht}
    disabled=${k||ee}
  >
    ${$}
    <${ee?Icons.refresh:dt} class="w-4 ${ee?"animate-spin":""}" />
  <//>`}function Login({loginFn:$,logoIcon:_,title:k,tipText:ct}){const[dt,st]=ut(""),[pt,te]=ut(""),Yt=function(ee){const ht={Authorization:"Basic "+btoa(dt+":"+pt)};return fetch("api/login",{headers:ht}).then($).finally(Xt=>te(""))};return Et` <div
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
          oninput=${ee=>st(ee.target.value)}
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
          oninput=${ee=>te(ee.target.value)}
          value=${pt}
          onchange=${Yt}
        />
      <//>
      <div class="mt-7">
        <${Button}
          title="Sign In"
          icon=${Icons.logout}
          onclick=${Yt}
          cls="flex w-full justify-center"
        />
      <//>
      <div class="mt-5 text-slate-400 text-xs">${ct}<//>
    <//>
  <//>`}function Colored({icon:$,text:_,colors:k}){return k||(k="bg-slate-100 text-slate-900"),Et` <span class="inline-flex items-center gap-1.5 py-0.5">
    ${$&&Et`<${$} class="w-5 h-5" />`}
    <span
      class="inline-block font-medium rounded-md px-2 py-1 text-xs ring-1 ring-inset ${k}"
      >${_}<//
    >
  <//>`}function Stat({title:$,text:_,tipText:k,tipIcon:ct,tipColors:dt,colors:st}){return Et` <div
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
          <${Colored} text=${k} icon=${ct} colors=${dt} />
        <//>
      <//>
    <//>
  <//>`}function TextValue({value:$,setfn:_,disabled:k,placeholder:ct,type:dt,addonRight:st,addonLeft:pt,attr:te,min:Yt,max:ee,pattern:le,myclass:ht,step:Xt,mult:ne}){const[he,ue]=ut("bg-white");lt(()=>{dt=="number"&&me(+Yt,+ee,+$)},[]),Xt||(Xt="1"),ne||(ne=1);const me=function(se,ge,$e){ue("bg-white"),se&&$e<se&&ue("bg-red-100 border-red-200"),ge&&$e>ge&&ue("bg-red-100 border-red-200")},de=Xt.match(/^.+\.(.+)/),pe=de?de[1].length:0,ve=se=>{let ge=se.target.value;dt=="number"&&(me(+Yt,+ee,+ge),ge=+(parseFloat(ge)/ne).toFixed(pe)),_(ge)};return dt=="number"&&($=+($*ne).toFixed(pe)),Et` <div
    class="flex w-full items-center rounded border shadow-sm ${he}"
  >
    ${pt&&Et`<span
      class="inline-flex font-normal truncate py-1 border-r bg-slate-100 items-center border-gray-300 px-2 text-gray-500 text-xs"
      >${pt}<//
    >`}
    <input
      type=${dt||"text"}
      disabled=${k}
      value=${$}
      step=${Xt}
      min=${Yt}
      max=${ee}
      pattern=${le}
      onchange=${ve}
      ...${te}
      class="${he} font-normal text-sm rounded w-full flex-1 py-0.5 px-2 text-gray-700 placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 ${ht}"
      placeholder=${ct}
    />
    ${st&&Et`<span
      class="inline-flex font-normal truncate py-1 border-l bg-slate-100 items-center border-gray-300 px-2 text-gray-500 text-xs overflow-scroll"
      style="min-width: 50%;"
      >${st}<//
    >`}
  <//>`}function SelectValue({value:$,setfn:_,options:k,disabled:ct}){const dt=pt=>pt==parseInt(pt)?parseInt(pt):pt;return Et` <select
    onchange=${pt=>_(dt(pt.target.value))}
    class="w-full rounded font-normal border py-0.5 px-1 text-gray-600 focus:outline-none text-sm disabled:cursor-not-allowed"
    disabled=${ct}
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
  </svg>`;function Header({logout:$,user:_,setShowSidebar:k,showSidebar:ct}){const[dt,st]=ut(new Date),[pt,te]=ut(null),Yt=(Xt,ne)=>new Date(Xt.year+1900,Xt.mon,Xt.mday,Xt.hour,Xt.min,Xt.sec),ee=async()=>{try{const ne=await(await fetch("/api/stm32-time")).text();let he;try{he=JSON.parse(ne)}catch{return}he.status&&he.time?te(Yt(he.time,he.timezone)):te(null)}catch{te(null)}};lt(()=>{const Xt=setInterval(()=>st(new Date),1e3),ne=setInterval(ee,1e3);return ee(),()=>{clearInterval(Xt),clearInterval(ne)}},[]);const le=Xt=>Xt.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric"}),ht=Xt=>Xt.toLocaleTimeString("ru-RU");return Et`
    <div
      class="bg-white sticky top-0 z-[48] w-full border-b py-2 ${ct?"pl-72":""} transition-all duration-300 transform"
    >
      <div class="px-2 w-full py-0 my-0 flex items-center justify-between">
        <button
          type="button"
          onclick=${()=>k(Xt=>!Xt)}
          class="text-slate-400"
        >
          <${Icons.bars3} class="h-6" />
        </button>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600">
            Дата: ${le(dt)}<span style="margin-left: 8px;"></span
            >Время: ${ht(dt)}
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
  `}function Sidebar({url:$,show:_}){const k=({title:ct,icon:dt,href:st,url:pt})=>Et`
  <div>
    <a href="#${st}" class="${st==pt?"bg-slate-50 text-blue-600 group":"text-gray-700 hover:text-blue-600 hover:bg-gray-50 group"} flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
      <${dt} class="w-6 h-6"/>
      ${ct}
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
  <//>`}function Chart({data:$}){const _=$.length,k=20,ct=15,dt=100,st=5,pt=10,te=25,Yt=Xt=>(dt-pt)/st*(Xt+1),ee=Xt=>(dt-pt)*Xt/100,le=Xt=>dt-pt-ee(Xt),ht=(Xt,ne,he)=>Array.from({length:ne},(ue,me)=>me*1+Xt);return Et` <div
    class="my-4 divide-y divide-gray-200 overflow-auto rounded bg-white"
  >
    <div class="font-light uppercase flex items-center text-gray-600 px-4 py-2">
      Temperature, last 24h
    <//>
    <div class="relative">
      <svg class="bg-yellow-x50 w-full p-4" viewBox="0 0 ${_*k+ct} ${dt}">
        ${ht(0,st).map(Xt=>Et`
            <line
              x1="0"
              y1=${Yt(Xt)}
              x2=${ct+_*k}
              y2=${Yt(Xt)}
              stroke-width="0.3"
              class="stroke-slate-300"
              stroke-dasharray="1,1"
            />
            <text x="0" y=${Yt(Xt)-2} class="text-[6px] fill-slate-400"
              >${te-te/st*(Xt+1)}<//
            >
          `)}
        ${ht(0,_).map(Xt=>Et`
            <rect
              x=${ct+Xt*k}
              y=${le($[Xt]*100/te)}
              width="12"
              height=${ee($[Xt]*100/te)}
              rx="2"
              class="fill-cyan-500"
            />
            <text x=${ct+Xt*k} y="100" class="text-[6px] fill-slate-400"
              >${Xt*2}:00<//
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
    <label class="switch">
      <input type="checkbox" checked=${$} onChange=${ct=>{_(ct.target.checked?1:0)}} />
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
  `;function TabSelect({}){const[$,_]=ut(null),[k,ct]=ut({}),[dt,st]=ut(null),[pt,te]=ut(!1),[Yt,ee]=ut(3),[le,ht]=ut(!1),[Xt,ne]=ut("ru"),he=se=>{ht(se)},ue=se=>le&&(se===1||se===35),me=()=>fetch("api/select/get").then(se=>se.json()).then(se=>{const ge=se.data||se;_(ge),ht(se.sim800l===1);const $e={};ge.forEach(ye=>{$e[`topin_${ye.id}`]=ye.topin.toString()}),ct($e)});lt(me,[]),lt(()=>{let se;return pt&&Yt>0?se=setTimeout(()=>{ee(Yt-1)},1e3):Yt===0&&(te(!1),st(null)),()=>clearTimeout(se)},[pt,Yt]);const de=async se=>{se.preventDefault();const ge=new FormData(se.target),$e={lang:Xt,sim800l:le?1:0,data:[]};$.forEach(ye=>{const ce=ge.get(`topin_${ye.id}`);$e.data.push({id:ye.id,pins:ye.pins,topin:parseInt(ce),pwm:ye.pwm,i2cdata:ye.i2cdata,i2cclok:ye.i2cclok})}),st("submitting"),te(!0),ee(3);try{const ye=await fetch("api/select/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify($e)});if(!ye.ok)throw new Error("Network response was not ok");const ce=await ye.json();st("success"),console.log("Success:",ce);const be={};$e.data.forEach(Zt=>{be[`topin_${Zt.id}`]=Zt.topin.toString()}),ct(Zt=>({...Zt,...be})),me()}catch(ye){st("error"),console.error("Error:",ye)}},pe=se=>{const{name:ge,value:$e}=se.target;ct(ye=>({...ye,[ge]:$e}))};if(!$)return"";const ve=({d:se})=>Et`
    <tr
      class="${ue(se.id)?"bg-red-200 opacity-50 pointer-events-none":se.id%2===1?"bg-white":"bg-green-300"}"
    >
      <td class="px-4 py-2">${se.id}</td>
      <td class="px-4 py-2">${se.pins}</td>
      <td class="px-4 py-2 flex justify-center">
        <div class="px-8 flex items-center">
          <input
            id="${se.id}_0"
            class="mr-2"
            type="radio"
            name="topin_${se.id}"
            value="0"
            checked="${k[`topin_${se.id}`]==="0"}"
            onChange=${pe}
            aria-label="NONE"
          />
          <label for="${se.id}_0" class="mr-2">NONE </label>
        </div>
        <div class="px-8 flex items-center">
          <input
            id="${se.id}_3"
            class="mr-2"
            type="radio"
            name="topin_${se.id}"
            value="3"
            checked="${k[`topin_${se.id}`]==="3"}"
            onChange=${pe}
            aria-label="SWITCH"
          />
          <label for="${se.id}_3" class="mr-2">SWITCH</label>
        </div>
        <div class="px-8 flex items-center">
          <input
            id="${se.id}_1"
            class="mr-2"
            type="radio"
            name="topin_${se.id}"
            value="1"
            checked="${k[`topin_${se.id}`]==="1"}"
            onChange=${pe}
            aria-label="BUTTON"
          />
          <label for="${se.id}_1" class="mr-2">BUTTON</label>
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${se.id}_2"
            class="mr-2"
            type="radio"
            name="topin_${se.id}"
            value="2"
            checked="${k[`topin_${se.id}`]==="2"}"
            onChange=${pe}
            aria-label="DEVICE"
          />
          <label for="${se.id}_2" class="mr-2">DEVICE</label>
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${se.id}_4"
            class="mr-2"
            type="radio"
            name="topin_${se.id}"
            value="4"
            checked="${k[`topin_${se.id}`]==="4"}"
            onChange=${pe}
            aria-label="1-WIRE"
          />
          <label for="${se.id}_4" class="mr-2">1-WIRE</label>
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${se.id}_5"
            class="mr-2"
            type="radio"
            name="topin_${se.id}"
            value="5"
            checked="${k[`topin_${se.id}`]==="5"}"
            onChange=${pe}
            disabled="${se.pwm==0?"disabled":""}"
            aria-label="PWM"
          />
          <label
            for="${se.id}_5"
            class="${se.pwm==0?"text-gray-400":""} mr-2"
            >PWM</label
          >
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${se.id}_8"
            class="mr-2"
            type="radio"
            name="topin_${se.id}"
            value="8"
            checked="${k[`topin_${se.id}`]==="8"}"
            onChange=${pe}
            aria-label="EncoderA"
          />
          <label for="${se.id}_8" class="mr-2">Enc.OutA</label>
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${se.id}_9"
            class="mr-2"
            type="radio"
            name="topin_${se.id}"
            value="9"
            checked="${k[`topin_${se.id}`]==="9"}"
            onChange=${pe}
            aria-label="EncoderB"
          />
          <label for="${se.id}_9" class="mr-2">Enc.OutB</label>
        </div>
        <div class="mx-2 flex items-center">
          <input
            id="${se.id}_10"
            class="mr-2"
            type="radio"
            name="topin_${se.id}"
            value="10"
            checked="${k[`topin_${se.id}`]==="10"}"
            onChange=${pe}
            disabled="${se.monitoring==0?"disabled":""}"
            aria-label="Security"
          />
          <label
            for="${se.id}_7"
            class="${se.monitoring==0?"text-gray-400":""} mr-2"
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
            <form onSubmit=${de}>
              <div class="relative flex justify-between items-center mb-5">
                <button
                  type="submit"
                  class=${`inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${pt?"bg-gray-400 cursor-not-allowed":"bg-blue-500 hover:bg-blue-700"}`}
                  disabled=${pt}
                >
                  ${pt?`Please wait ${Yt} sec.`:"Submit"}
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
                      onChange=${se=>he(se.target.checked)}
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

              ${dt==="success"&&Et`
                <div
                  class="mb-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded"
                  role="alert"
                >
                  <strong class="font-bold">Успех! </strong>
                  <span class="block sm:inline">
                    Данные успешно сохранены. Идет запись на USB флешку. Кнопка
                    станет активной через ${Yt} секунд.
                  </span>
                </div>
              `}
              ${dt==="error"&&Et`
                <div
                  class="mb-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded"
                  role="alert"
                >
                  <strong class="font-bold">Ошибка!</strong>
                  <span class="block sm:inline">
                    Произошла ошибка при отправке данных. Пожалуйста, попробуйте
                    еще раз через ${Yt} секунд.
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
                  ${$&&$.map(se=>y(ve,{d:se}))}
                </tbody>
              </table>

              <div class="relative mt-5">
                <button
                  type="submit"
                  class=${`inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${pt?"bg-gray-400 cursor-not-allowed":"bg-blue-500 hover:bg-blue-700"}`}
                  disabled=${pt}
                >
                  ${pt?`Please wait ${Yt} sec.`:"Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `}function ModalSwitch({modalType:$,page:_,hideModal:k,closeOnOverlayClick:ct=!0,title:dt,selectedSwitch:st,onSwitchChange:pt,connectionOptions:te,SliderComponent:Yt=MyPolzunok}){const[ee,le]=ut((st==null?void 0:st.info)||""),[ht,Xt]=ut((st==null?void 0:st.onoff)||0),[ne,he]=ut((st==null?void 0:st.ptype)||0),[ue,me]=ut((st==null?void 0:st.setrpins)||""),[de,pe]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then($t=>{if(!$t.ok)throw new Error(`HTTP error! status: ${$t.status}`);return $t.json()}).then($t=>{if(!$t||!$t.data||!Array.isArray($t.data)){console.error("Invalid data format:",$t),pe([]);return}const mt=$t.data.filter(oe=>oe.topin===2);pe(mt)}).catch($t=>{console.error("Error fetching pin config:",$t),pe([])})},[]);const ve=$t=>{$t.preventDefault();const mt=new FormData($t.target),oe=Object.fromEntries(mt);if(oe.id=st.id,oe.pins=st.pins,$==="edit")oe.onoff=ht;else if($==="connection"){const vt=de.find(fe=>fe.pins===oe.setrpins);vt&&(oe.pinact={...st.pinact,[vt.id]:vt.pins})}fetch("/api/switch/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(oe)}).then(vt=>vt.json()).then(vt=>{console.log("Success:",vt),pt({...st,...oe}),k(),window.location.href="/#/switch"}).catch(vt=>{console.error("Error:",vt)})},se=$t=>{me($t.target.value)},ge=$t=>{he(parseInt($t.target.value))},$e=$t=>{le($t.target.value)},ye=$t=>{Xt($t)},ce=$t=>{ct&&$t.target===$t.currentTarget&&k()},be=()=>{he(0),le(""),Xt(0)};return Et`
    <div
      class="fixed inset-0 z-50 bg-black bg-opacity-50"
      style="margin-top: 7px;"
      onclick=${ce}
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <div
          class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative"
          style="max-height: calc(100vh - 57px); overflow-y: auto;"
        >
          <div class="modal-header flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">${dt}</h2>
            <button
              onclick=${k}
              class="close-button text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          ${(()=>{if(_==="TabSwitch"){if($==="connection")return Et`
          <form onsubmit=${ve}>
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
                        value=${ue}
                        onchange=${se}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select a connection</option>
                        ${de.map($t=>Et`
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
        `;if($==="edit")return Et`
          <form onsubmit=${ve}>
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
                        value=${ne}
                        onchange=${ge}
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
                        oninput=${$e}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${Yt}
                        value=${ht}
                        onChange=${ye}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-between items-center mt-4">
              <button
                type="button"
                onclick=${be}
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
  `}function TabSwitch({}){const[$,_]=ut(null),[k,ct]=ut(null),[dt,st]=ut(!1),[pt,te]=ut(null),[Yt,ee]=ut(null),[le,ht]=ut(!1),[Xt,ne]=ut("ru"),[he,ue]=ut(null),[me,de]=ut([]),[pe,ve]=ut("");ut(!1);const se=()=>Promise.all([fetch("/api/switch/get").then(re=>re.json()),fetch("/api/pintopin/get").then(re=>re.json())]).then(([re,ae])=>{ne(re.lang),ue(re.switches),_(re),de(ae),ve(`Pintopin data: ${JSON.stringify(ae,null,2)}

Switch data: ${JSON.stringify(re.switches,null,2)}`),console.log("Pintopin data:",ae),console.log("Switch data:",re.switches)}).catch(re=>{console.error("Error fetching data:",re),ve(`Error fetching data: ${re.message}`)}),ge=()=>{fetch("/api/switch/get").then(re=>re.json()).then(re=>{ue(re.switches),ne(re.lang),console.log("Updated switch data:",re.switches)}).catch(re=>{console.error("Error fetching switch data:",re)})},$e=()=>{fetch("/api/pintopin/get").then(re=>re.json()).then(re=>{de(re),console.log("Updated pintopin data:",re)}).catch(re=>{console.error("Error fetching pintopin data:",re)})};lt(()=>{ge(),$e();const re=setInterval(()=>{ge(),$e()},1e3);return()=>clearInterval(re)},[]);const ye=re=>{const ae=new Map,ie=he.find(xe=>xe.id===re);return ie&&ie.pinact&&Object.entries(ie.pinact).forEach(([xe,_e])=>{ae.set(xe,{pin:xe,relayId:_e})}),me.forEach(xe=>{if(xe.idin===re){const _e=`${xe.pins}(${xe.idout})`;ae.has(_e)||ae.set(_e,{pin:xe.pins,relayId:xe.idout})}}),Array.from(ae.values())},ce=()=>Xt==="ru"?ruLangswitch:enLangswitch,be=(re,ae)=>{const _e=(ce()[ae]||"").split(" "),ke=[];let Se="";for(let Te=0;Te<_e.length;Te++){const Ee=_e[Te];Se.length+Ee.length+1<=200?Se+=(Se.length>0?" ":"")+Ee:(Se.length>0&&ke.push(Se),Se=Ee)}return Se.length>0&&ke.push(Se),ke.join("<br>")},Zt=(re,ae)=>{console.log("Удаление соединения:",re,ae);const[ie,xe]=ae.split("("),_e=xe?parseInt(xe):null;fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:re,pin:ie.trim()})}).then(ke=>ke.json()).then(ke=>{ct(ke),ue(Se=>Se.map(Te=>{if(Te.id===re){const Ee={...Te.pinact};return delete Ee[ie.trim()],{...Te,pinact:Ee}}return Te})),de(Se=>Se.filter(Te=>!(Te.idin===re&&Te.pins===ie.trim()&&(_e===null||Te.idout===_e))))}).then(()=>{console.log("Соединение удалено успешно"),se()}).catch(ke=>{console.error("Ошибка при удалении соединения:",ke)})},$t=(re,ae)=>{te(re),ee(ae),st(!0)},mt=()=>{st(!1),te(null),ee(null)},oe=re=>{console.log("handleSwitchChange:",re),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:re.id,onoff:re.onoff})}).then(ae=>ae.json()).then(ae=>{console.log("Response from /api/onoff/set:",ae)}).catch(ae=>{console.error("Error calling /api/onoff/set:",ae)}),mt()},vt={ru:Et`
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
    `},fe=re=>Et`
    <th class="px-4 py-2 relative group">
      ${re.title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-orange-300 p-2 rounded shadow-lg text-left"
        style="width: 400px; left: 50%; transform: translateX(-50%); top: 100%;"
        dangerouslySetInnerHTML=${{__html:be("langbutton",re.tooltipIndex)}}
      ></div>
    </th>
  `,we=({d:re,index:ae})=>{const ie=ye(re.id);return Et`
      <tr class="${ae%2===1?"bg-white":"bg-green-300"}">
        <td class="px-4 py-2">${re.id}</td>
        <td class="px-4 py-2">${re.pins}</td>
        <td class="px-4 py-2">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][re.ptype]}
        </td>
        <td class="px-4 py-2">
          ${ie.map(({pin:xe,relayId:_e})=>Et`
              <span class="mr-2">
                ${xe}${_e!==void 0?`(${_e})`:""}
                <button
                  onClick=${ke=>{ke.preventDefault(),Zt(re.id,`${xe}(${_e})`)}}
                  class="text-red-500 hover:text-red-700"
                  style="margin-left: 2px; font-weight: bold;"
                >
                  [<strong>x</strong>]
                </button>
              </span>
            `)}
        </td>
        <td class="px-4 py-2">${re.info}</td>
        <td class="px-4 py-2">
          <${MyPolzunok}
            value=${re.onoff}
            onChange=${xe=>oe({...re,onoff:xe})}
          />
        </td>
        <td class="px-4 py-2">
          <button
            onClick=${()=>$t("connection",re)}
            class="text-blue-500 hover:text-blue-700 mr-2"
          >
            Connection
          </button>
          |
          <button
            onClick=${()=>$t("edit",re)}
            class="text-blue-500 hover:text-blue-700 ml-2"
          >
            Edit
          </button>
        </td>
      </tr>
    `};return he?Et`
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
                  <${fe} title="ID" tooltipIndex=${1} />
                  <${fe} title="Pin" tooltipIndex=${2} />
                  <${fe} title="Pullup type" tooltipIndex=${3} />
                  <${fe} title="Device connection" tooltipIndex=${4} />
                  <${fe} title="INFO" tooltipIndex=${5} />
                  <${fe} title="On/Off" tooltipIndex=${6} />
                  <${fe} title="Action" tooltipIndex=${7} />
                </tr>
              </thead>
              <tbody id="tab1">
                ${he.map((re,ae)=>Et`<${we} d=${re} index=${ae} key=${re.id} />`)}
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
            <div class="mt-4 p-4 border rounded">${vt[Xt]}</div>
          `}
        </div>
      </div>

      ${dt&&Et`
        <${ModalSwitch}
          modalType=${pt}
          page="TabSwitch"
          hideModal=${mt}
          title=${pt==="connection"?"Edit Connection":"Edit switch"}
          selectedSwitch=${Yt}
          onSwitchChange=${oe}
        />
      `}
    </div>
  `:""}const ModalButton=({modalType,page,hideModal,closeOnOverlayClick=!0,title,selectedButton,onButtonChange,SliderComponent=MyPolzunok})=>{const[buttonInfo,setButtonInfo]=ut((selectedButton==null?void 0:selectedButton.info)||""),[onoff,setOnOff]=ut((selectedButton==null?void 0:selectedButton.onoff)||0),[ptype,setPtype]=ut((selectedButton==null?void 0:selectedButton.ptype)||0),[sclick,setSclick]=ut((selectedButton==null?void 0:selectedButton.sclick)||""),[dclick,setDclick]=ut((selectedButton==null?void 0:selectedButton.dclick)||""),[lpress,setLpress]=ut((selectedButton==null?void 0:selectedButton.lpress)||""),[pinOptions,setPinOptions]=ut([]),[errors,setErrors]=ut({sclick:null,dclick:null,lpress:null}),[submitError,setSubmitError]=ut(null),doubleClickLongPressRegex=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,validateInput=$=>!$||$.trim()===""||$.toLowerCase()==="none"||doubleClickLongPressRegex.test($)?null:'Incorrect format. Use "None" or "pin:value" format.',handleInputChange=($,_)=>{const k=validateInput(_);switch(setErrors(ct=>({...ct,[$]:k})),$){case"sclick":setSclick(_);break;case"dclick":setDclick(_);break;case"lpress":setLpress(_);break}};lt(()=>{fetch("/api/select/get").then($=>$.json()).then($=>{Array.isArray($)?setPinOptions($.filter(_=>_.topin===2)):setPinOptions([])}).catch($=>{console.error("Error fetching pin config:",$),setPinOptions([])})},[]);const handleSubmit=$=>{if($.preventDefault(),Object.values(errors).some(k=>k!==null)){setSubmitError("Please correct the errors before submitting.");return}const _={...selectedButton,info:buttonInfo,sclick:sclick||"None",dclick:dclick||"None",lpress:lpress||"None",onoff,ptype};fetch("/api/button/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(_)}).then(k=>k.json()).then(k=>{onButtonChange(_),hideModal()}).catch(k=>{console.error("Error:",k),setSubmitError("Failed to save changes. Please try again.")})},handleResetPin=()=>{setPtype(0),setSclick(""),setDclick(""),setLpress(""),setButtonInfo(""),setOnOff(0),setErrors({sclick:null,dclick:null,lpress:null})},renderConnectionModal=()=>Et`
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
  `},TabButton=()=>{ut(null);const[$,_]=ut([]),[k,ct]=ut(null);ut(null);const[dt,st]=ut(!1),[pt,te]=ut(null),[Yt,ee]=ut(null),[le,ht]=ut(!1),[Xt,ne]=ut("ru");ut("");const[he,ue]=ut(!0),me={ru:Et`
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
    `},de=()=>{fetch("/api/button/get").then($t=>$t.json()).then($t=>{ct($t.buttons),ne($t.lang),console.log("Updated button data:",$t.buttons)}).catch($t=>{console.error("Error fetching button data:",$t)})};lt(()=>{de();let $t;return he&&($t=setInterval(()=>{de()},1e3)),()=>{$t&&clearInterval($t)}},[he]);const pe=$t=>{const mt=new Map,oe=k.find(vt=>vt.id===$t);return oe&&oe.pinact&&Object.entries(oe.pinact).forEach(([vt,fe])=>{mt.set(vt,{pin:vt,relayId:fe})}),$.forEach(vt=>{if(vt.idin===$t){const fe=`${vt.pins}(${vt.idout})`;mt.has(fe)||mt.set(fe,{pin:vt.pins,relayId:vt.idout})}}),Array.from(mt.values())},ve=()=>({langbutton:Xt==="ru"?rulangbutton:enlangbutton}),se=($t,mt)=>{const oe=ve(),vt=oe[$t]&&oe[$t][mt]?oe[$t][mt]:"";return ge(vt)},ge=($t,mt=100)=>{if(!$t||typeof $t!="string")return"";const oe=[];let vt="";const fe=$t.split(`
`);return fe.forEach((we,re)=>{we.split(" ").filter(ie=>ie.length>0).forEach((ie,xe)=>{const _e=vt.length===0?ie:" "+ie;vt.length+_e.length<=mt?vt+=_e:(vt.length>0&&oe.push(vt),vt=ie)}),vt.length>0&&(oe.push(vt),vt=""),re<fe.length-1&&oe.push("")}),vt.length>0&&oe.push(vt),oe.join(`
`)},$e=($t,mt)=>{te($t),ee(mt),st(!0),ue(!1)},ye=()=>{st(!1),te(null),ee(null),ue(!0)},ce=$t=>{console.log("handleButtonChange:",$t),ct(mt=>mt.map(oe=>oe.id===$t.id?{...oe,...$t}:oe)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:$t.id,onoff:$t.onoff})}).then(mt=>mt.json()).then(mt=>{console.log("Response from /api/onoff/set:",mt)}).catch(mt=>{console.error("Error calling /api/onoff/set:",mt)}),ye()},be=$t=>Et`
    <th class="px-3 py-2 relative group" style="white-space: pre-line;">
      ${$t.title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-orange-300 p-2 rounded shadow-lg text-left"
        style="min-width: 200px; max-width: 300px; white-space: pre-wrap; left: 50%; transform: translateX(-50%); top: 100%;"
      >
        ${se("langbutton",$t.tooltipIndex)}
      </div>
    </th>
  `,Zt=({d:$t,index:mt})=>(pe($t.id),Et`
      <tr class="${mt%2===1?"bg-white":"bg-green-300"}">
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
            onChange=${oe=>ce({...$t,onoff:oe})}
          />
        </td>
        <td class="px-4 py-2">
          <button
            onClick=${()=>$e("edit",$t)}
            class="text-blue-500 hover:text-blue-700 ml-2"
          >
            Edit
          </button>
        </td>
      </tr>
    `);return k?Et`
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
                  <${be} title="ID" tooltipIndex=${1} />
                  <${be} title="Pin" tooltipIndex=${2} />
                  <${be} title="Pullup type" tooltipIndex=${3} />
                  <${be} title="SINGLE CLICK" tooltipIndex=${4} />
                  <${be} title="DOUBLE CLICK" tooltipIndex=${5} />
                  <${be} title="LONG PRESS" tooltipIndex=${6} />
                  <${be} title="INFO" tooltipIndex=${7} />
                  <${be} title="On/Off" tooltipIndex=${8} />
                  <${be} title="Action" tooltipIndex=${9} />
                </tr>
              </thead>
              <tbody id="tab1">
                ${k.map(($t,mt)=>Et`
                    <${Zt} d=${$t} index=${mt} key=${$t.id} />
                  `)}
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
            <div class="mt-4 p-4 border rounded">${me[Xt]}</div>
          `}
        </div>
      </div>
      ${dt&&Et`
        <${ModalButton}
          modalType=${pt}
          page="TabButton"
          hideModal=${ye}
          title=${pt==="connection"?"Edit Connection":"Edit Button pin"}
          selectedButton=${Yt}
          onButtonChange=${ce}
        />
      `}
    </div>
  `:""};function ModalEncoder({modalType:$,page:_,hideModal:k,closeOnOverlayClick:ct=!0,title:dt,selectedEncoder:st,handleEncoderChange:pt,connectionOptions:te,SliderComponent:Yt=MyPolzunok}){const[ee,le]=ut((st==null?void 0:st.info)||""),[ht,Xt]=ut((st==null?void 0:st.onoff)===1),[ne,he]=ut({pin:(st==null?void 0:st.encdrbpin)||"",id:(st==null?void 0:st.encoderb)||""}),[ue,me]=ut(Object.entries(st.pinact||{})[0]||["",""]),[de,pe]=ut([]),[ve,se]=ut([]),[ge,$e]=ut([]),[ye,ce]=ut(st.dvalue||0),[be,Zt]=ut(st.ponr||0);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(ie=>{if(!ie.ok)throw new Error(`HTTP error! status: ${ie.status}`);return ie.json()}).then(ie=>{if(!ie||!ie.data||!Array.isArray(ie.data)){console.error("Invalid data format:",ie),pe([]),se([]),$e([]);return}const xe=ie.data.filter(Se=>Se.topin===2),_e=ie.data.filter(Se=>Se.topin===9),ke=ie.data.filter(Se=>Se.topin===5);if(pe(xe),se(_e),$e(ke),st.encoderb){const Se=_e.find(Te=>Te.pins===st.encoderb);he({pin:st.encoderb,id:Se?Se.id:""})}}).catch(ie=>{console.error("Error fetching pin config:",ie),pe([]),se([]),$e([])})},[st]);const $t=ie=>{if(ie.preventDefault(),ie.target instanceof HTMLFormElement){let _e={};$==="edit"?_e={topin:8,id:st.id,pins:st.pins,dvalue:parseInt(ye),ponr:parseInt(be),info:ee,onoff:ht?1:0}:$==="connection"&&(_e={id:st.id,pins:st.pins,encoderb:parseInt(ne.id),encdrbpin:ne.pin,pinact:{[ue[0]]:parseInt(ue[1])}}),console.log("We got a encoder JSON:",JSON.stringify(_e)),fetch("/api/encoder/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(_e)}).then(ke=>ke.json()).then(ke=>{pt({...st,..._e}),k()}).catch(ke=>{console.error("Error:",ke)})}else console.error("Form element not found")},mt=ie=>{le(ie.target.value)},oe=ie=>{Xt(ie)},vt=ie=>{const xe=ve.find(_e=>_e.pins===ie.target.value);he({pin:ie.target.value,id:xe?xe.id:""})},fe=ie=>{const[xe,_e]=ie.target.value.split("|");me([xe,_e])},we=ie=>{ce(ie.target.value)},re=ie=>{Zt(ie.target.value)};return Et`
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
          ${(()=>{if(_==="TabEncoder"){if($==="connection")return Et`
          <form onsubmit=${$t}>
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
                        value=${ne.pin}
                        onchange=${vt}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select Encoder B</option>
                        ${ve.map(ie=>Et`
                            <option value=${ie.pins}>
                              ${ie.pins} (ID: ${ie.id})
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
                        value=${`${ue[0]}|${ue[1]}`}
                        onchange=${fe}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select PWM connection</option>
                        ${ge.map(ie=>Et`
                            <option value=${`${ie.pins}|${ie.id}`}>
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
        `;if($==="edit")return Et`
          <form onsubmit=${$t}>
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
                    <td class="p-2 font-bold">Dimmer value (0-100)</td>
                    <td class="p-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value=${ye}
                        oninput=${we}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Power On Restore</td>
                    <td class="p-2">
                      <select
                        value=${be}
                        onchange=${re}
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
                        oninput=${mt}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${Yt}
                        value=${ht}
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
    </div>
  `}function TabEncoder({}){const[$,_]=ut(null),[k,ct]=ut(null),[dt,st]=ut(!1),[pt,te]=ut(null),[Yt,ee]=ut(null),[le,ht]=ut(!1),[Xt,ne]=ut("ru"),[he,ue]=ut([]),me=()=>Promise.all([fetch("/api/encoder/get").then(vt=>vt.json()),fetch("/api/pintopin/get").then(vt=>vt.json())]).then(([vt,fe])=>{ne(vt.lang),_(vt.encoders),ue(fe),console.log("Encoder data:",vt.encoders),console.log("Pintopin data:",fe)}).catch(vt=>{console.error("Error fetching data:",vt)}),de=()=>{fetch("/api/encoder/get").then(vt=>vt.json()).then(vt=>{_(vt.encoders),ne(vt.lang),console.log("Updated encoder data:",vt.encoders)}).catch(vt=>{console.error("Error fetching encoder data:",vt)})},pe=()=>{fetch("/api/pintopin/get").then(vt=>vt.json()).then(vt=>{ue(vt),console.log("Updated pintopin data:",vt)}).catch(vt=>{console.error("Error fetching pintopin data:",vt)})};lt(()=>{de(),pe();const vt=setInterval(()=>{de(),pe()},500);return()=>clearInterval(vt)},[]);const ve=vt=>{_(fe=>fe.map(we=>we.id===vt.id?vt:we))},se=vt=>{const fe=$.find(re=>re.id===vt),we=[];return fe&&fe.pinact&&Object.entries(fe.pinact).forEach(([re,ae])=>{we.push({pin:re,idout:ae})}),we},ge=()=>({langbutton:Xt==="ru"?ruencoder:enencoder}),$e=(vt,fe)=>{const we=ge(),re=we[vt]&&we[vt][fe]?we[vt][fe]:"";return ye(re)},ye=(vt,fe=50)=>{if(!vt||typeof vt!="string")return"";const we=vt.split(" ");let re=[],ae="";for(let ie=0;ie<we.length;ie++)ae.length+we[ie].length+1<=fe?ae+=`${ae?" ":""}${we[ie]}`:(ae&&re.push(ae.trim()),ae=we[ie]);return ae&&re.push(ae.trim()),re.join(`
`)},ce=(vt,fe)=>{console.log("Deleting connection:",vt,fe);const we=fe.split("(")[0].trim();fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:vt,pin:we})}).then(re=>re.ok?re.json():re.text().then(ae=>{throw new Error(`HTTP error! status: ${re.status}, message: ${ae}`)})).then(re=>{ct(re),_(ae=>ae.map(ie=>{if(ie.id===vt){const xe={...ie.pinact};return delete xe[we],{...ie,pinact:xe}}return ie})),ue(ae=>ae.filter(ie=>!(ie.idin===vt&&ie.pins===we)))}).then(()=>{console.log("Connection deleted successfully"),me()}).catch(re=>{console.error("Error deleting connection:",re)})},be=(vt,fe)=>{console.log("Opening modal:",vt,fe),te(vt),ee(fe),st(!0)},Zt=()=>{st(!1),te(null),ee(null)},$t={ru:Et`
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
    `},mt=({title:vt,tooltipIndex:fe})=>Et`
    <th class="px-4 py-2 relative group">
      ${vt}
      <div
        class="absolute z-50 invisible group-hover:visible bg-orange-300 p-2 rounded shadow-lg whitespace-normal break-words text-left transform -translate-x-1/2 left-1/2 top-full mt-1"
        style="min-width: 200px; max-width: 400px;"
      >
        ${$e("langbutton",fe)}
      </div>
    </th>
  `,oe=({d:vt,index:fe})=>{const we=se(vt.id);return Et`
      <tr class="${fe%2===1?"bg-white":"bg-green-300"}">
        <td class="px-4 py-2">${vt.pins}(${vt.id})</td>
        <td class="px-4 py-2">
          ${vt.encdrbpin?`${vt.encdrbpin}(${vt.encoderb})`:"Not set"}
        </td>
        <td class="px-4 py-2">
          ${we.length>0?we.map(({pin:re,idout:ae})=>Et`
                  <span class="mr-2">
                    ${re}(${ae})
                    <button
                      onClick=${ie=>{ie.preventDefault(),ce(vt.id,`${re}(${ae})`)}}
                      class="text-red-500 hover:text-red-700"
                      style="margin-left: 2px; font-weight: bold;"
                    >
                      [<strong>x</strong>]
                    </button>
                  </span>
                `):"Not set"}
        </td>
        <td class="px-4 py-2">${vt.dvalue}</td>
        <td class="px-4 py-2">${vt.ponr===1?"ON":"OFF"}</td>
        <td class="px-4 py-2">${vt.info}</td>
        <td class="px-4 py-2">
          <${MyPolzunok}
            value=${vt.onoff}
            onChange=${re=>ve({...vt,onoff:re})}
          />
        </td>
        <td class="px-4 py-2">
          <button
            onClick=${()=>be("connection",vt)}
            class="text-blue-500 hover:text-blue-700 mr-2"
          >
            Connection
          </button>
          |
          <button
            onClick=${()=>be("edit",vt)}
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
                  <${mt} title="Encoder A (ID)" tooltipIndex=${3} />
                  <${mt} title="Encoder B (ID)" tooltipIndex=${4} />
                  <${mt} title="PWM connection" tooltipIndex=${5} />
                  <${mt} title="Dimmer value (0-100)" tooltipIndex=${6} />
                  <${mt} title="Power On Restore" tooltipIndex=${7} />
                  <${mt} title="INFO" tooltipIndex=${8} />
                  <${mt} title="On/Off" tooltipIndex=${9} />
                  <${mt} title="Action" tooltipIndex=${10} />
                </tr>
              </thead>
              <tbody id="tab1">
                ${$.map((vt,fe)=>Et`<${oe} d=${vt} index=${fe} key=${vt.id} />`)}
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
            <div class="mt-4 p-4 border rounded">${$t[Xt]}</div>
          `}
        </div>
      </div>
      ${dt&&Et`
        <${ModalEncoder}
          modalType=${pt}
          page="TabEncoder"
          hideModal=${Zt}
          title=${pt==="connection"?"Edit Connection":"Edit Encoder"}
          selectedEncoder=${Yt}
          handleEncoderChange=${ve}
        />
      `}
    </div>
  `:Et`<div>Loading...</div>`}function ModalCron({modalType:$,page:_,hideModal:k,closeOnOverlayClick:ct=!0,title:dt,selectedCron:st,handleCronChange:pt,connectionOptions:te,modalClass:Yt,SliderComponent:ee=MyPolzunok}){const[le,ht]=ut((st==null?void 0:st.info)||""),[Xt,ne]=ut((st==null?void 0:st.onoff)===1),[he,ue]=ut((st==null?void 0:st.activ)||""),[me,de]=ut((st==null?void 0:st.cron)||""),[pe,ve]=ut(st.setrpins||""),se=Zt=>{Zt.preventDefault();const $t=new FormData(Zt.target),mt=Object.fromEntries($t);mt.id=st.id,mt.pins=st.pins,$==="edit"?(mt.onoff=Xt?1:0,mt.info=le,mt.cron=me,mt.activ=he):$==="connection"&&(mt.setrpins=pe),console.log("Data being sent to server:"),console.log(mt),console.log("Stringified data:"),console.log(JSON.stringify(mt)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(mt)}).then(oe=>oe.json()).then(oe=>{console.log("Success:",oe),pt({...st,...mt}),k(),window.location.href="/#/cron"}).catch(oe=>{console.error("Error:",oe)})};lt(()=>{ht((st==null?void 0:st.info)||""),ve((st==null?void 0:st.setrpins)||""),ne((st==null?void 0:st.onoff)===1)},[st]);const ge=Zt=>{de(Zt.target.value)},$e=Zt=>{ht(Zt.target.value)},ye=Zt=>{ne(Zt)},ce=Zt=>{ue(Zt.target.value)},be=()=>{if(_==="TabCron"&&$==="edit")return Et`
          <form onsubmit=${se}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  ${[{label:"ID",value:st.id},{label:"Cron",value:Et`
                        <input
                          type="text"
                          value=${me}
                          onInput=${ge}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"Script",value:Et`
                        <input
                          type="text"
                          value=${he}
                          onInput=${ce}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"INFO",value:Et`
                        <input
                          type="text"
                          value=${le}
                          onInput=${$e}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"On/Off",value:Et`<${ee}
                        value=${Xt}
                        onChange=${ye}
                      />`}].map((Zt,$t)=>Et`
                      <tr
                        class="${$t%2===1?"bg-white":"bg-gray-200"}"
                      >
                        <td class="p-2 font-bold">${Zt.label}</td>
                        <td class="p-2">${Zt.value}</td>
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
    <div class=${`modal ${Yt||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onclick=${Zt=>ct&&Zt.target===Zt.currentTarget&&k()}
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
            ${be()}
          </div>
        </div>
      </div>
    </div>
  `}function TabCron({}){const[$,_]=ut(null);ut(null),at(null);const[k,ct]=ut(!1),[dt,st]=ut(null),[pt,te]=ut(null),[Yt,ee]=ut("ru"),[le,ht]=ut(!1),[Xt,ne]=ut(1),[he,ue]=ut(0),me=()=>fetch("/api/cron/get").then(mt=>mt.json()).then(mt=>{console.log("API response:",mt),mt&&Array.isArray(mt.timers)?(_(mt.timers),ee(mt.lang||"ru"),typeof mt.numline=="number"&&(ue(mt.numline),ne(mt.numline))):(console.error("Unexpected API response structure:",mt),_([]))}).catch(mt=>{console.error("Error fetching cron data:",mt),_([])});lt(()=>{me()},[]),lt(()=>{de(he)},[he]);const de=mt=>{fetch("/api/numline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({numline:mt})}).then(oe=>oe.json()).then(oe=>console.log("Numline sent to stm32:",oe)).catch(oe=>console.error("Error sending Crone line to stm32:",oe))},pe=()=>{if(Xt<$.length){const mt=Xt+1;ne(mt),ue(mt),de(mt)}},ve=()=>{if(Xt>0){const mt=Xt-1;ne(mt),ue(mt),de(mt)}},se={ru:Et`
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
    `};if($===null)return Et`<div>Loading...</div>`;const ge=()=>({langtimers:Yt==="ru"?rulangtimers:enlangtimers}),$e=(mt,oe)=>{const vt=ge(),we=(vt[mt]&&vt[mt][oe]?vt[mt][oe]:"").split(" "),re=[];for(let ae=0;ae<we.length;ae+=15)re.push(we.slice(ae,ae+15).join(" "));return re.join("<br>")},ye=(mt,oe)=>{st(mt),te(oe),ct(!0)},ce=()=>{ct(!1),st(null),te(null)},be=mt=>{console.log("handleCronChange:",mt),_($.map(oe=>oe.id===mt.id?mt:oe)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(mt)}).then(oe=>oe.json()).then(oe=>{console.log("Cron job updated successfully:",oe)}).catch(oe=>{console.error("Error updating cron job:",oe)})},Zt=()=>Array.isArray(pt)?pt.flatMap(mt=>mt.pinact?Object.keys(mt.pinact).map(oe=>({value:oe,label:oe})):[]):pt&&pt.pinact?Object.keys(pt.pinact).map(mt=>({value:mt,label:mt})):[],$t=mt=>Et`
    <th class="px-3 py-2 relative group">
      ${mt.title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-orange-300 p-2 rounded shadow-lg whitespace-normal break-words text-left"
        style="width: fit-content; max-width: 80vw; left: 50%; transform: translateX(-50%); top: 100%;"
      >
        ${$e("langtimers",mt.tooltipIndex)}
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
                      <${$t} title="No" tooltipIndex=${1} />
                      <${$t} title="Cron" tooltipIndex=${2} />
                      <${$t} title="Script" tooltipIndex=${3} />
                      <${$t} title="Info" tooltipIndex=${4} />
                      <${$t} title="On/Off" tooltipIndex=${5} />
                      <${$t} title="Action" tooltipIndex=${6} />
                    </tr>
                  </thead>
                  <tbody>
                    ${$.slice(0,Xt).map((mt,oe)=>Et`
                        <tr
                          class=${oe%2===0?"bg-green-300":"bg-white"}
                        >
                          <td class="border px-4 py-2">${mt.id}</td>
                          <td class="border px-4 py-2">${mt.cron}</td>
                          <td class="border px-4 py-2">${mt.activ}</td>
                          <td class="border px-4 py-2">${mt.info}</td>
                          <td class="border px-4 py-2">
                            <${MyPolzunok}
                              value=${mt.onoff}
                              onChange=${vt=>be({...mt,onoff:vt})}
                            />
                          </td>
                          <td class="border px-4 py-2">
                            <button
                              onclick=${()=>ye("edit",mt)}
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
            onclick=${()=>ht(!le)}
          >
            ${le?"Hide Help":"Show Help"}
          </button>
          <div>
            ${$.length-Xt>0?`Still available: ${$.length-Xt} cron jobs`:"No available: cron jobs!"}
          </div>
          <div>
            ${Xt<$.length?Et`
                  <button
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onclick=${pe}
                  >
                    +
                  </button>
                `:null}
            ${Xt>0?Et`
                  <button
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onclick=${ve}
                  >
                    -
                  </button>
                `:null}
          </div>
        </div>
      </div>
      ${le&&Et`<div class="mt-4">${se[Yt]}</div>`}
      ${k&&Et`
        <${ModalCron}
          modalType=${dt}
          page="TabCron"
          hideModal=${ce}
          title=${dt==="edit"?"Edit Timer(s)":"Edit Connection"}
          selectedCron=${pt}
          handleCronChange=${be}
          connectionOptions=${Zt()}
          modalClass="mt-24"
        />
      `}
    </div>
  `}function ModalOneWire({oneWire:$,onClose:_,onUpdate:k,refresh:ct,closeOnOverlayClick:dt=!0}){console.log("oneWire object:",$);const[st,pt]=ut({typsensor:$.typsensor,numdevices:$.numdevices}),[te,Yt]=ut(!1),[ee,le]=ut($.onoff||0),ht=ue=>{dt&&ue.target.classList.contains("modal-overlay")&&_()},Xt=ue=>{const{name:me,value:de}=ue.target;let pe={...st,[me]:parseInt(de,10)};me==="typsensor"&&(de==="0"?pe.numdevices=0:de==="2"&&(pe.numdevices=1)),pt(pe)},ne=ue=>{le(ue)};return Et`
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
              disabled=${te}
            >
              Close
            </button>
          </div>
          <form onsubmit=${async ue=>{ue.preventDefault(),Yt(!0);const me={id:$.id,pin:$.pin,typsensor:st.typsensor,numdevices:st.numdevices,onoff:ee};console.log("Sending data:",me);try{if(!(await fetch("api/onewire/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(me)})).ok)throw new Error("Network response was not ok");const pe={...$,...st,onoff:ee};k(pe),_()}catch(de){console.error("Error updating OneWire:",de)}finally{Yt(!1)}}}>
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
                        onchange=${Xt}
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
                        value=${st.numdevices}
                        oninput=${st.typsensor===1?Xt:void 0}
                        class="border rounded p-2 w-full ${st.typsensor!==1?"bg-gray-100":""}"
                        min="0"
                        max="10"
                        readonly=${st.typsensor!==1}
                        disabled=${te}
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${MyPolzunok}
                        value=${ee}
                        onChange=${ne}
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
    </div>
  `}const TabOneWire=()=>{const[$,_]=ut([]),[k,ct]=ut(null),[dt,st]=ut(!1),[pt,te]=ut(null),[Yt,ee]=ut(null),[le,ht]=ut("ru");ut(null);const Xt=()=>{console.log("Calling initial refresh..."),fetch("/api/onewire/get").then(ce=>ce.json()).then(ce=>{console.log("Initial data received:",ce),ht(ce.lang||"ru"),_(ce.pins||[]),console.log("Initial OneWire state set:",ce.pins),ct(null)}).catch(ce=>{console.error("Error in refresh:",ce),ct(ce.message),_([])})},ne=async()=>{try{const be=await(await fetch("/api/temp/get")).json();_(Zt=>Zt.map($t=>{if(!$t.sensors||$t.typsensor!==1&&$t.typsensr!==1&&$t.typsensor!==2&&$t.typsensr!==2)return $t;const mt=$t.sensors.map(oe=>{var vt,fe;if($t.typsensor===1||$t.typsensr===1){const we=(vt=be.ds18b20)==null?void 0:vt.find(re=>re.addr===oe.s_number);if(we)return{...oe,t:we.temp}}else if($t.typsensor===2||$t.typsensr===2){const we=(fe=be.dht22)==null?void 0:fe.find(re=>re.id===$t.id);if(we)return{...oe,t:we.temp,humidity:we.humidity}}return oe});return{...$t,sensors:mt}}))}catch(ce){console.error("Error in updateSensorData:",ce)}};lt(()=>{console.log("Setting up initial data and interval..."),Xt();const ce=setInterval(ne,1e3);return()=>{clearInterval(ce)}},[]);const he=()=>{st(!1),te(null),ee(null)},ue=ce=>{_(be=>be.map(Zt=>{var $t;if(Zt.id===ce.oneWireId){const mt=(($t=Zt.sensors)==null?void 0:$t.map(oe=>oe.s_number===ce.s_number?{...oe,...ce}:oe))||[];return{...Zt,sensors:mt}}return Zt})),he()},me=ce=>{ee(ce),st(!0)},de=ce=>{_(be=>be.map(Zt=>Zt.id===ce.id?{...Zt,onoff:ce.onoff}:Zt))},pe=ce=>{_(be=>be.map(Zt=>Zt.id===ce.id?ce:Zt)),he()};if(k)return Et`<div>Error fetching sensor data: ${k}</div>`;const ve=()=>({lang1Wire:le==="ru"?rulange1Wire:enlange1Wire}),se=(ce,be)=>{const Zt=ve(),mt=(Zt[ce]&&Zt[ce][be]?Zt[ce][be]:"").split(" "),oe=[];for(let vt=0;vt<mt.length;vt+=15)oe.push(mt.slice(vt,vt+15).join(" "));return oe.join("<br>")},ge=ce=>Et`
    <th class="px-3 py-2 relative group">
      ${ce.title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-orange-300 p-2 rounded shadow-lg whitespace-normal break-words text-left"
        style="width: fit-content; max-width: 80vw; left: 50%; transform: translateX(-50%); top: 100%;"
      >
        ${se("lang1Wire",ce.tooltipIndex)}
      </div>
    </th>
  `,$e=({device:ce,index:be})=>{const Zt=ce.pins||ce.pin,$t=ce.typsensor||ce.typsensr||0,mt=ce.numdevices||ce.numsens||0;return Et`
      <tr class="${be%2===1?"bg-white":"bg-green-300"}">
        <td class="px-4 py-2">${ce.id}</td>
        <td class="px-4 py-2">${Zt}</td>
        <td class="px-4 py-2">${["None","DS18B20","DHT22"][$t]}</td>
        <td class="px-4 py-2">${mt}</td>
        <td class="px-4 py-2">
          <${MyPolzunok}
            value=${ce.onoff||0}
            onChange=${oe=>de({...ce,onoff:oe})}
          />
        </td>
        <td class="px-4 py-2">
          <button
            class="text-blue-500 hover:text-blue-700"
            onclick=${()=>me(ce)}
          >
            Edit
          </button>
        </td>
      </tr>
      ${$t!==0&&mt>0?Et`
            <tr>
              <td colspan="7" class="px-4 py-2">
                <table class="w-full">
                  <${ye} d=${ce} />
                </table>
              </td>
            </tr>
          `:""}
    `},ye=({d:ce})=>{const be=ce.typsensor||ce.typsensr||0,Zt=ce.numdevices||ce.numsens||0;if(be===0||Zt===0)return Et`
        <tr>
          <td colspan="7" class="px-4 py-2">
            No connected sensors for this OneWire pin.
          </td>
        </tr>
      `;let $t=ce.sensors||[];const mt=(oe,vt)=>{const fe=be===2;return Et`
        <tr class="${vt%2===0?"bg-blue-100":"bg-white"}">
          <td class="px-4 py-2">
            <div class="bg-blue-200 p-4 rounded-lg shadow-md">
              <div
                class="font-semibold text-lg mb-2 flex justify-between items-center"
              >
                <span>
                  ${fe?"DHT22 Sensor":`DS18B20 Sensor (S/N: ${oe.s_number})`}
                </span>
                <a
                  href="#"
                  class="text-blue-500 hover:text-blue-700"
                  onclick=${we=>{we.preventDefault(),te({...oe,oneWireId:ce.id,sensorType:be,pins:ce.pins||ce.pin}),st(!0)}}
                >
                  Edit
                </a>
              </div>
              <table class="w-full text-sm">
                <tr>
                  <td class="font-medium pr-2">Current Temperature:</td>
                  <td class="action-column">${oe.t}°C</td>
                </tr>
                ${fe&&"humidity"in oe?Et`
                      <tr>
                        <td class="font-medium pr-2">Current Humidity:</td>
                        <td class="action-column">${oe.humidity}%</td>
                      </tr>
                    `:""}
                <tr>
                  <td class="font-medium pr-2">
                    Upper Temp. Limit = ${oe.ut}°C
                  </td>
                  <td class="action-column">Action: ${oe.action_ut}</td>
                </tr>
                <tr>
                  <td class="font-medium pr-2">
                    Lower Temp. Limit = ${oe.lt}°C
                  </td>
                  <td class="action-column">Action: ${oe.action_lt}</td>
                </tr>
                ${fe&&"upphumid"in oe?Et`
                      <tr>
                        <td class="font-medium pr-2">
                          Upper Humidity Limit = ${oe.upphumid}%
                        </td>
                        <td class="action-column">
                          Action: ${oe.actuphum}
                        </td>
                      </tr>
                      <tr>
                        <td class="font-medium pr-2">
                          Lower Humidity Limit = ${oe.humlolim}%
                        </td>
                        <td class="action-column">
                          Action: ${oe.actlowhum}
                        </td>
                      </tr>
                    `:""}
                <tr>
                  <td class="font-medium pr-2">Info:</td>
                  <td class="action-column">${oe.info}</td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      `};return $t.length>0&&Object.keys($t[0]).length>0?$t.map((oe,vt)=>mt(oe,vt)):Et`<tr>
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
                  <${ge} title="ID" tooltipIndex=${1} />
                  <${ge} title="Pin" tooltipIndex=${2} />
                  <${ge} title="Selected sensor" tooltipIndex=${3} />
                  <${ge} title="Count of sensors" tooltipIndex=${4} />
                  <${ge} title="On/Off" tooltipIndex=${5} />
                  <${ge} title="Actions" tooltipIndex=${6} />
                </tr>
              </thead>
              <tbody id="tab1">
                ${$.length>0?$.map((ce,be)=>Et`<${$e}
                          device=${ce}
                          index=${be}
                          key=${ce.id}
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
      ${dt&&(pt?Et`
            <${ModalEditSensor}
              typsensor=${pt}
              oneWireId=${pt.oneWireId}
              pins=${pt.pins}
              onClose=${he}
              onUpdate=${ue}
              sensorType=${pt.sensorType}
              closeOnOverlayClick=${!0}
              refresh=${Xt}
            />
          `:Et`
            <${ModalOneWire}
              oneWire=${Yt}
              onClose=${he}
              onUpdate=${pe}
              closeOnOverlayClick=${!0}
              refresh=${Xt}
            />
          `)}
    </div>
  `};function ModalEditSensor({typsensor:$,oneWireId:_,pins:k,onClose:ct,onUpdate:dt,sensorType:st,sensorData:pt,closeOnOverlayClick:te=!0}){const[Yt,ee]=ut({ut:(pt==null?void 0:pt.ut)||$.ut,lt:(pt==null?void 0:pt.lt)||$.lt,action_ut:(pt==null?void 0:pt.action_ut)||$.action_ut,action_lt:(pt==null?void 0:pt.action_lt)||$.action_lt,upphumid:(pt==null?void 0:pt.upphumid)||$.upphumid||0,humlolim:(pt==null?void 0:pt.humlolim)||$.humlolim||0,actuphum:(pt==null?void 0:pt.actuphum)||$.actuphum||"",actlowhum:(pt==null?void 0:pt.actlowhum)||$.actlowhum||"",info:(pt==null?void 0:pt.info)||$.info,onoff:(pt==null?void 0:pt.onoff)||$.onoff||0,humidity:(pt==null?void 0:pt.humidity)||$.humidity||0}),[le,ht]=ut(!1),Xt=(de,pe,ve)=>{if(de===""||de==="-")return de;const se=de.replace(",",".");if(!/^-?\d*\.?\d*$/.test(se))return null;const ge=parseFloat(se);return isNaN(ge)||ge<pe||ge>ve?null:se},ne=de=>{const{name:pe,value:ve}=de.target;if(["ut","lt"].includes(pe)){const se=Xt(ve,-55,125);se!==null&&ee(ge=>({...ge,[pe]:se}))}else if(["upphumid","humlolim"].includes(pe)){const se=Xt(ve,0,100);se!==null&&ee(ge=>({...ge,[pe]:se}))}else ee(se=>({...se,[pe]:ve}))},he=de=>{const pe=["ut","lt","upphumid","humlolim"],ve={...de};return pe.forEach(se=>{ve[se]===""||ve[se]==="-"?ve[se]=0:ve[se]=parseFloat(ve[se].toString().replace(",","."))}),ve};return Et`
    <div
      class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 pt-10"
      onclick=${de=>{te&&de.target===de.currentTarget&&ct()}}
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
            onclick=${ct}
          >
            Close
          </button>
        </div>
        <form onsubmit=${async de=>{de.preventDefault(),ht(!0);const pe=he(Yt);try{if(!(await fetch("/api/sensor/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:_,pins:k,sensorNumber:$.s_number,...pe,s_number:$.s_number,t:$.t})})).ok)throw new Error("Network response was not ok");dt({...$,...pe,oneWireId:_,pins:k,s_number:$.s_number,t:$.t}),ct()}catch{}finally{ht(!1)}}}>
          <div class="modal-body">
            <table class="table-auto w-full">
              <tbody>
                <tr class="bg-blue-100">
                  <td class="p-2 font-bold">Upper Temperature</td>
                  <td class="p-2">
                    <input
                      type="text"
                      name="ut"
                      value=${Yt.ut}
                      oninput=${ne}
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
                      value=${Yt.lt}
                      oninput=${ne}
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
                      value=${Yt.action_ut}
                      oninput=${ne}
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
                      value=${Yt.action_lt}
                      oninput=${ne}
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
                            value=${Yt.upphumid}
                            oninput=${ne}
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
                            value=${Yt.humlolim}
                            oninput=${ne}
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
                            value=${Yt.actuphum}
                            oninput=${ne}
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
                            value=${Yt.actlowhum}
                            oninput=${ne}
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
                      value=${Yt.info}
                      oninput=${ne}
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
  `}function ModalSIM800L({hideModal:$,title:_,selectedGps:k,onSave:ct}){const[dt,st]=ut((k==null?void 0:k.tel)||""),[pt,te]=ut((k==null?void 0:k.info)||""),[Yt,ee]=ut((k==null?void 0:k.onoff)===1),[le,ht]=ut(!0),Xt=ue=>/^\+\d{11,20}$/.test(ue);return Et`
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

          <form onSubmit=${ue=>{if(ue.preventDefault(),!le)return;const me={tel:dt,info:pt,onoff:Yt?1:0};console.log("Сохраняемые данные:",me),fetch("/api/sim800l/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(me)}).then(de=>de.json()).then(de=>{typeof ct=="function"&&ct(me),$()}).catch(de=>{console.error("Error:",de)})}}>
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
                        onInput=${ue=>{const me=ue.target.value;st(me),ht(Xt(me))}}
                        class=${`border rounded p-2 w-full ${!le&&dt!==""?"border-red-500":""}`}
                        placeholder="+XXXXXXXXXXX"
                      />
                      ${!le&&dt!==""?Et`
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
                      <${MyPolzunok} value=${Yt} onChange=${ee} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                disabled=${!le||dt===""}
                class=${`font-bold py-2 px-4 rounded ${le&&dt!==""?"bg-blue-500 hover:bg-blue-700 text-white":"bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `}const ModalSecurity=({modalType:$,page:_,hideModal:k,title:ct,selectedSecurity:dt,onSecurityChange:st,SliderComponent:pt=MyPolzunok})=>{const[te,Yt]=ut((dt==null?void 0:dt.info)||""),[ee,le]=ut((dt==null?void 0:dt.onoff)||0),[ht,Xt]=ut((dt==null?void 0:dt.ptype)||0),[ne,he]=ut((dt==null?void 0:dt.send_sms)||""),[ue,me]=ut((dt==null?void 0:dt.action)||""),[de,pe]=ut([]),[ve,se]=ut({send_sms:null,action:null}),[ge,$e]=ut(null),ye=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,ce=(vt,fe)=>!fe||fe.trim()===""||fe.toLowerCase()==="none"?null:vt==="action"?ye.test(fe)?null:'Incorrect format. Use "None" or "pin:value" format.':fe.length>100?"Text should not exceed 100 characters":null,be=(vt,fe)=>{const we=ce(vt,fe);switch(se(re=>({...re,[vt]:we})),vt){case"send_sms":he(fe);break;case"action":me(fe);break}};lt(()=>{fetch("/api/monitoring/get").then(vt=>vt.json()).then(vt=>{Array.isArray(vt)?pe(vt.filter(fe=>fe.topin===2)):pe([])}).catch(vt=>{console.error("Error fetching pin config:",vt),pe([])})},[]);const Zt=vt=>{if(vt.preventDefault(),Object.values(ve).some(we=>we!==null)){$e("Please correct the errors before submitting.");return}const fe={...dt,info:te,send_sms:ne||"NO",action:ue||"None",onoff:ee,ptype:ht};fetch("/api/monitoring/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(fe)}).then(we=>{if(!we.ok)throw new Error("Network response was not ok");return we.json()}).then(we=>{if(we.error)throw new Error(we.error);st(fe),k()}).catch(we=>{console.error("Error:",we),$e("Failed to save changes. Please try again.")})},$t=()=>{Xt(0),he(""),me(""),Yt(""),le(0),se({send_sms:null,action:null})};return Et`
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
          ${_==="TabSecurity"&&$==="connection"?Et`
    <form onSubmit=${Zt}>
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
                  value=${(dt==null?void 0:dt.setrpins)||""}
                  onChange=${vt=>st({...dt,setrpins:vt.target.value})}
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
    <form onSubmit=${Zt}>
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
                  value=${ht}
                  onChange=${vt=>Xt(parseInt(vt.target.value))}
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
                  value=${ue}
                  onInput=${vt=>be("action",vt.target.value)}
                  class="border rounded p-2 w-full ${ve.action?"border-red-500":""}"
                  placeholder="None"
                />
                ${ve.action&&Et`<p class="text-red-500 text-sm">${ve.action}</p>`}
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">Send SMS</td>
              <td class="p-2">
                <select
                  name="send_sms"
                  value=${ne}
                  onchange=${vt=>be("send_sms",vt.target.value)}
                  class="border rounded p-2 w-full ${ve.send_sms?"border-red-500":""}"
                >
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                </select>
                ${ve.send_sms&&Et` <p class="text-red-500 text-sm">${ve.send_sms}</p> `}
              </td>
            </tr>
            <tr class="bg-white">
              <td class="p-2 font-bold">INFO</td>
              <td class="p-2">
                <input
                  type="text"
                  name="info"
                  value=${te}
                  onInput=${vt=>Yt(vt.target.value)}
                  class="border rounded p-2 w-full"
                />
              </td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">On/Off</td>
              <td class="p-2">
                <${pt} value=${ee} onChange=${le} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-between mt-4">
        <button
          type="button"
          onClick=${$t}
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
      ${ge&&Et`<p class="text-red-500 mt-2">${ge}</p>`}
    </form>
  `}
        </div>
      </div>
    </div>
  `},TabSecurity=()=>{const[$,_]=ut({lang:"ru",sim800l:0,onoff:0,tel:"",info:""}),[k,ct]=ut(!1),[dt,st]=ut(!1),[pt,te]=ut([]),[Yt,ee]=ut(!1),[le,ht]=ut("ru"),[Xt,ne]=ut(!1),[he,ue]=ut(""),[me,de]=ut(null),[pe,ve]=ut(!1),[se,ge]=ut("connected"),[$e,ye]=ut(0),ce=(ae,ie)=>{let xe;return(..._e)=>{clearTimeout(xe),xe=setTimeout(()=>ae(..._e),ie)}},be=async(ae,ie={},xe=3)=>{try{const _e=await fetch(ae,ie);if(!_e.ok)throw new Error("Network response was not ok");return ge("connected"),_e}catch(_e){if(ge("error"),xe>0)return await new Promise(ke=>setTimeout(ke,1e3)),be(ae,ie,xe-1);throw ge("disconnected"),_e}},Zt={ru:Et`
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
    `},$t={ru:Et`
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
    `},mt=async()=>{if(!(pe||Date.now()-$e<500))try{const ie=await(await be("/api/sim800l/get")).json();_(ie)}catch(ae){console.error("Error fetching SIM800L data:",ae)}},oe=async()=>{if(!(pe||Date.now()-$e<500))try{const ie=await(await be("/api/monitoring/get")).json();te(ie.pins||[]),ht(ie.lang||"ru")}catch(ae){console.error("Error fetching monitoring data:",ae)}};lt(()=>{const ae=setInterval(()=>{mt(),oe()},500);return()=>clearInterval(ae)},[]);const vt=ce(async ae=>{ve(!0);try{const ie=await be("/api/sim800l/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ae)});_(ae),ye(Date.now())}catch(ie){console.error("Error updating SIM800L:",ie)}finally{ve(!1)}},300),fe=async ae=>{try{const ie=await fetch("/api/monitoring/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ae)});if(!ie.ok)throw new Error(`HTTP error! status: ${ie.status}`);te(xe=>xe.map(_e=>_e.id===ae.id?ae:_e)),await oe(),ne(!1)}catch(ie){console.error("Error updating security:",ie),alert("Failed to save changes. Please try again."),await oe()}},we=ae=>{console.log("handleOnOffChange:",ae),te(ie=>ie.map(xe=>xe.id===ae.id?{...xe,...ae}:xe)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ae.id,onoff:ae.onoff})}).then(ie=>ie.json()).then(ie=>{console.log("Response from /api/onoff/set:",ie)}).catch(ie=>{console.error("Error calling /api/onoff/set:",ie)}),closeModal()},re=(ae,ie)=>{ue(ae),de(ie),ne(!0)};return Et`
    <div class="flex flex-col items-center w-full p-4">
      ${se!=="connected"&&Et`
        <div
          class=${`w-full p-2 mb-4 text-white text-center 
          ${se==="error"?"bg-yellow-500":"bg-red-500"}`}
        >
          ${se==="error"?"Connection problems. Retrying...":"Connection lost. Check your internet connection."}
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
                    onChange=${ae=>vt({...$,onoff:ae})}
                  />
                </td>
                <td>
                  <button
                    onClick=${()=>ct(!0)}
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
              onClick=${()=>st(!dt)}
              class="bg-blue-500 hover:bg-blue-700 text-white"
            >
              ${dt?"Hide Help":"Show Help"}
            </button>
          </div>
          ${dt&&Zt[le]}
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
              ${pt.length>0?pt.map((ae,ie)=>Et`
                      <tr
                        class="${ie%2===1?"bg-white":"bg-green-300"}"
                      >
                        <td class="px-4 py-2">${ae.id}</td>
                        <td class="px-4 py-2">${ae.pins}</td>
                        <td class="px-4 py-2">
                          ${["PIR","Normal open","Normal close"][ae.ptype]}
                        </td>
                        <td class="px-4 py-2">${ae.action}</td>
                        <td class="px-4 py-2">${ae.send_sms}</td>
                        <td class="px-4 py-2">${ae.info}</td>
                        <td class="px-4 py-2">
                          <${MyPolzunok}
                            value=${ae.onoff}
                            onChange=${xe=>we({...ae,onoff:xe})}
                          />
                        </td>
                        <td class="px-4 py-2">
                          <button
                            onClick=${()=>re("edit",ae)}
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
              onClick=${()=>ee(!Yt)}
              class="bg-blue-500 hover:bg-blue-700 text-white"
            >
              ${Yt?"Hide Help":"Show Help"}
            </button>
          </div>
          ${Yt&&$t[le]}
        </div>

        ${k&&Et`
          <${ModalSIM800L}
            hideModal=${()=>ct(!1)}
            title="Edit SIM800L Settings"
            selectedGps=${$}
            onSave=${vt}
          />
        `}
        ${Xt&&Et`
          <${ModalSecurity}
            modalType=${he}
            page="TabSecurity"
            hideModal=${()=>ne(!1)}
            title="Edit Security Settings"
            selectedSecurity=${me}
            onSecurityChange=${fe}
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
  `}function FirmwareUpdate({}){const[$,_]=ut([{},{}]),[k,ct]=ut(null),dt=()=>fetch("api/firmware/status").then(Xt=>Xt.json()).then(Xt=>_(Xt));lt(dt,[]),lt(()=>{if(k){const Xt=setTimeout(()=>{ct(null)},3e3);return()=>clearTimeout(Xt)}},[k]);const st=Xt=>fetch("api/firmware/commit").then(ne=>ne.json()).then(dt),pt=Xt=>fetch("api/reboot",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reboot:1})}).then(ne=>ne.json()).then(ne=>new Promise(he=>setTimeout(()=>{dt(),he()},5e3))),te=Xt=>fetch("api/firmware/rollback").then(pt),Yt=Xt=>fetch("api/device/eraselast").then(dt),ee=function(Xt){if(!Xt){ct({type:"yellow",message:"Error: No file selected."});return}const ne=Xt.name.split(".").pop().toLowerCase();if(ne!=="bin"&&ne!=="hex"){ct({type:"red",message:"Error: Only .bin and .hex files are allowed!"});return}const he=new FormData;he.append("file",Xt),fetch("api/firmware/upload",{method:"POST",body:he}).then(ue=>{if(!ue.ok)throw new Error(`HTTP error! status: ${ue.status}`);return ue.json()}).then(()=>{ct({type:"green",message:"Firmware uploaded successfully!"}),dt()}).catch(ue=>{ct({type:"yellow",message:`Error: Upload failed. ${ue.message}`})})},le=({type:Xt,message:ne})=>Et`
      <div
        class=${`fixed top-0 left-0 right-0 z-50 border-b-4 p-4 ${Xt==="red"?"bg-red-100 border-red-500 text-red-700":Xt==="yellow"?"bg-yellow-100 border-yellow-500 text-yellow-700":"bg-green-100 border-green-500 text-green-700"}`}
        role="alert"
      >
        <p class="font-bold text-center">${ne}</p>
      </div>
    `,ht=({title:Xt,onupload:ne})=>Et`
      <label
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        ${Xt}
        <input
          type="file"
          class="hidden"
          accept=".bin,.hex"
          onChange=${ue=>{const me=ue.target.files[0];me&&ne(me)}}
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
          <${ht}
            title="Upload new firmware (.bin or .hex)"
            onupload=${ee}
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
            onclick=${Yt}
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
  `}const pageSetting=({value:$,setfn:_,type:k,options:ct,error:dt,...st})=>{let pt;const te=`w-full px-3 py-2 border rounded-md ${dt?"border-red-500":"border-gray-300"}`;switch(k){case"text":case"password":case"number":pt=Et`
        <input
          type=${k}
          value=${$}
          onInput=${Yt=>_(Yt.target.value)}
          class=${te}
          ...${st}
        />
      `;break;case"select":pt=Et`
        <select
          value=${$}
          onChange=${Yt=>_(Yt.target.value)}
          class=${te}
          ...${st}
        >
          ${ct.map(([Yt,ee])=>Et` <option value=${Yt}>${ee}</option> `)}
        </select>
      `;break;case"switch":pt=Et`
        <label class="switch">
          <input
            type="checkbox"
            checked=${$}
            onChange=${Yt=>_(Yt.target.checked)}
            ...${st}
          />
          <span class="slider round"></span>
        </label>
      `;break;default:pt=Et`<span>Неподдерживаемый тип: ${k}</span>`}return Et`
    <div>
      ${pt}
      ${dt&&Et`<div class="text-red-500 text-sm mt-1">${dt}</div>`}
    </div>
  `},ipRegex=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/,subnetMaskRegex=/^(((0|128|192|224|240|248|252|254)\.(0|128|192|224|240|248|252|254)\.(0|128|192|224|240|248|252|254)\.(0|128|192|224|240|248|252|254))|(255\.(0|255)\.(0|255)\.(0|255))|(255\.255\.(0|255)\.(0|255))|(255\.255\.255\.(0|255)))$/;function Settings({}){const[$,_]=ut(null),[k,ct]=ut(null),[dt,st]=ut(null),[pt,te]=ut({}),Yt=at(null),[ee,le]=ut(null),[ht,Xt]=ut(null),[ne,he]=ut(!1),ue=Zt=>{if(!Zt)return{date:"",time:""};const $t=Zt.match(/d:(\d{1,2}\.\d{1,2}\.\d{2})/),mt=Zt.match(/t:(\d{2}:\d{2}:\d{2})/);return{date:$t?$t[1]:"",time:mt?mt[1]:""}},me=Zt=>{if(!/^\d{1,2}\.\d{1,2}\.\d{2}$/.test(Zt))return!1;const[mt,oe,vt]=Zt.split(".").map(Number);if(oe<1||oe>12||mt<1||mt>31||vt<0||vt>99)return!1;const fe=new Date().getFullYear()%100;if(vt>fe+5)return!1;const we=new Date(2e3+vt,oe,0).getDate();return!(mt>we)},de=Zt=>!!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(Zt),pe=(Zt,$t)=>{le({message:Zt,type:$t}),setTimeout(()=>{le(null)},3e3)},ve=Zt=>{Xt(Zt),setTimeout(()=>{Xt(null)},3e3)},se=()=>fetch("/api/mysett/get").then(Zt=>Zt.json()).then(Zt=>{if(Zt.offldt){const{date:$t,time:mt}=ue(Zt.offldt);Zt.offline_date=$t,Zt.offline_time=mt}_(Zt)}).catch(Zt=>{console.error("Error fetching settings:",Zt),pe("Ошибка при загрузке настроек","error")});lt(()=>{se()},[]);const ge=(Zt,$t)=>{let mt=null;switch(Zt){case"ip_addr":case"gateway":case"mqtt_hst":ipRegex.test($t)||(mt="Неверный IP-адрес");break;case"sb_mask":subnetMaskRegex.test($t)||(mt="Неверная маска подсети");break;case"offline_date":me($t)||(mt="Неверный формат даты (д.м.гг)");break;case"offline_time":de($t)||(mt="Неверный формат времени (чч:мм:сс)");break}return mt},$e=Zt=>{Zt.preventDefault();const $t=new FormData(Yt.current),mt={...$};for(const[oe,vt]of $t.entries())["lon_de","lat_de","timezone","mqtt_prt"].includes(oe)?mt[oe]=vt===""||vt===null?0:Number(vt):mt[oe]=vt;mt.offline_date&&mt.offline_time&&(mt.offldt=`d:${mt.offline_date} t:${mt.offline_time}`),["lon_de","lat_de","timezone","mqtt_prt"].forEach(oe=>{(mt[oe]===null||mt[oe]==="")&&(mt[oe]=0)}),mt.onsunrise=mt.onsunrise?1:0,mt.onsunset=mt.onsunset?1:0,mt.check_ip=mt.check_ip?1:0,mt.check_mqtt=mt.check_mqtt?1:0,mt.sunrise=$.sunrise,mt.sunset=$.sunset,mt.dlength=$.dlength,console.log("Data will be sent to STM32:"),console.log(mt),console.log("Stringified data:"),console.log(JSON.stringify(mt)),delete mt.offline_date,delete mt.offline_time,fetch("/api/mysett/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(mt)}).then(oe=>{st("success"),ct(oe),console.log("Успех:",oe),pe("Данные успешно сохранены","success"),ve("Данные успешно сохранены")}).catch(oe=>{st("error"),ct(oe),console.error("Ошибка:",oe),pe("Ошибка при сохранении данных","error"),ve("Ошибка при сохранении данных")})},ye=(Zt,$t)=>{let mt=null;Zt==="offline_date"?mt=me($t)?null:"Неверный формат даты (д.м.гг)":Zt==="offline_time"?mt=de($t)?null:"Неверный формат времени (чч:мм:сс)":mt=ge(Zt,$t),te(vt=>{const fe={...vt,[Zt]:mt},we=Object.values(fe).some(re=>re!==null);return he(we),fe});let oe=$t;["lon_de","lat_de","timezone","mqtt_prt"].includes(Zt)?oe=$t===""||$t===null?0:Number($t):["onsunrise","onsunset","check_ip","check_mqtt"].includes(Zt)&&(oe=$t?1:0),_(vt=>({...vt,[Zt]:oe}))},ce=[[-12,"(GMT -12:00) Eniwetok, Kwajalein"],[-11,"(GMT -11:00) Midway Island, Samoa"],[-10,"(GMT -10:00) Hawaii"],[-9,"(GMT -9:00) Alaska"],[-8,"(GMT -8:00) Pacific Time (US &amp; Canada)"],[-7,"(GMT -7:00) Mountain Time (US &amp; Canada)"],[-6,"(GMT -6:00) Central Time (US &amp; Canada), Mexico City"],[-5,"(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima"],[-4,"(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz"],[-3.3,"(GMT -3:30) Newfoundland"],[-3,"(GMT -3:00) Brazil, Buenos Aires, Georgetown"],[-2,"(GMT -2:00) Mid-Atlantic"],[-1,"(GMT -1:00) Azores, Cape Verde Islands"],[0,"(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca"],[1,"(GMT +1:00) Brussels, Copenhagen, Madrid, Paris"],[2,"(GMT +2:00) Kaliningrad, South Africa"],[3,"(GMT +3:00) Яшалта, Moscow, St. Petersburg, Baghdad, Riyadh"],[3.3,"(GMT +3:30) Tehran"],[4,"(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi"],[4.3,"(GMT +4:30) Kabul"],[5,"(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"],[5.3,"(GMT +5:30) Bombay, Calcutta, Madras, New Delhi"],[5.45,"(GMT +5:45) Kathmandu"],[6,"(GMT +6:00) Almaty, Dhaka, Colombo"],[7,"(GMT +7:00) Bangkok, Hanoi, Jakarta"],[8,"(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"],[9,"(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"],[9.3,"(GMT +9:30) Adelaide, Darwin"],[10,"(GMT +10:00) Eastern Australia, Guam, Vladivostok"],[11,"(GMT +11:00) Magadan, Solomon Islands, New Caledonia"],[12,"(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"]],be=[{value:"en",label:"English"},{value:"ru",label:"Russian"}];return $?(Object.values(pt).some(Zt=>Zt!==null),Et`
    <div class="m-4 divide-y divide-gray-200 overflow-auto rounded bg-white">
      <div
        class="font-medium uppercase flex items-center px-4 py-2 bg-gray-400"
      >
        <span>Global settings</span>
        <select
          value=${$.lang}
          onChange=${Zt=>ye("lang",Zt.target.value)}
          class="ml-2 px-2 py-1 bg-white rounded text-sm"
        >
          ${be.map(Zt=>Et` <option value=${Zt.value}>${Zt.label}</option> `)}
        </select>
      </div>
      <div class="flex-grow flex flex-col justify-center items-center">
        ${ht&&Et`
          <div
            class="w-full bg-green-500 text-white px-4 py-2 text-center mb-4"
          >
            ${ht}
          </div>
        `}
        <form
          ref=${Yt}
          onSubmit=${$e}
          class="justify-center overflow-x-auto mb-4 w-full max-w-2xl settings-table"
        >
          <div class="flex justify-start items-center p-2">
  <button
  type="submit"
  class=${`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${ne?"opacity-50 cursor-not-allowed":""}`}
  disabled=${ne}
>
  Save changes
</button>
          </div>
          <div class="flex flex-col items-center">
            ${[{label:"Login",key:"adm_name",type:"text"},{label:"Password",key:"adm_pswd",type:"password"},{label:"Time zone UTC",key:"timezone",type:"select",options:ce}].map((Zt,$t)=>Et`
                <div
                  class="flex items-center w-full justify-center ${$t%2===1?"bg-white":"bg-green-300"} p-2"
                >
                  <div class="w-1/3 font-medium text-right pr-4">
                    ${Zt.label}
                  </div>
                  <div class="w-2/3">
                    <${pageSetting}
                      value=${$[Zt.key]}
                      setfn=${mt=>ye(Zt.key,mt)}
                      type=${Zt.type}
                      options=${Zt.options}
                      class="w-full"
                      error=${pt[Zt.key]}
                    />
                  </div>
                </div>
              `)}

            <div
              class="flex items-center w-full justify-center bg-gray-400 p-2 mt-1"
            >
              <div class="w-1/3 font-medium text-right pr-4">
                ${$.check_ip?"DHCP":"Static IP"}
              </div>
              <div class="w-2/3">
                <${Setting}
                  value=${$.check_ip}
                  setfn=${Zt=>ye("check_ip",Zt)}
                  type="switch"
                  class="w-full"
                />
              </div>
            </div>

            ${!$.check_ip&&Et`
              ${[{label:"IP address",key:"ip_addr"},{label:"Subnet mask",key:"sb_mask"},{label:"Default gateway",key:"gateway"}].map((Zt,$t)=>Et`
                  <div
                    class="flex items-center w-full justify-center ${$t%2===1?"bg-white":"bg-green-300"} p-2"
                  >
                    <div class="w-1/3 font-medium text-right pr-4">
                      ${Zt.label}
                    </div>
                    <div class="w-2/3">
                      <${pageSetting}
                        value=${$[Zt.key]}
                        setfn=${mt=>ye(Zt.key,mt)}
                        type="text"
                        class="w-full"
                        error=${pt[Zt.key]}
                      />
                    </div>
                  </div>
                `)}
            `}

            <div class="w-full text-center font-bold bg-gray-400 p-2 mt-1">
              API settings
            </div>

            <div
              class="flex items-center w-full justify-center bg-green-300 p-2"
            >
              <div class="w-1/3 font-medium text-right pr-4">Token</div>
              <div class="w-2/3">
                <${Setting}
                  value=${$.token}
                  setfn=${Zt=>ye("token",Zt)}
                  type="text"
                  class="w-full"
                />
              </div>
            </div>

            <div
              class="flex items-center w-full justify-center bg-gray-400 p-2 mt-1"
            >
              <div class="w-1/3 font-medium text-right pr-4">MQTT</div>
              <div class="w-2/3">
                <${Setting}
                  value=${$.check_mqtt}
                  setfn=${Zt=>ye("check_mqtt",Zt)}
                  type="switch"
                  class="w-full"
                />
              </div>
            </div>

            ${$.check_mqtt?Et`
                  ${[{label:"Host",key:"mqtt_hst",type:"text"},{label:"Port",key:"mqtt_prt",type:"number"},{label:"Client",key:"mqtt_clt",type:"text"},{label:"User",key:"mqtt_usr",type:"text"},{label:"Password",key:"mqtt_pswd",type:"password"},{label:"TX topic",key:"txmqttop",type:"text"},{label:"RX topic",key:"rxmqttop",type:"text"}].map((Zt,$t)=>Et`
                      <div
                        class="flex items-center w-full justify-center ${$t%2===1?"bg-white":"bg-green-300"} p-2"
                      >
                        <div class="w-1/3 font-medium text-right pr-4">
                          ${Zt.label}
                        </div>
                        <div class="w-2/3">
                          <${pageSetting}
                            value=${$[Zt.key]}
                            setfn=${mt=>ye(Zt.key,mt)}
                            type=${Zt.type}
                            class="w-full"
                            error=${pt[Zt.key]}
                          />
                        </div>
                      </div>
                    `)}
                `:null}

            <div class="w-full text-center font-bold bg-gray-400 p-2 mt-1">
              Coordinate settings
            </div>
            <div
              class="flex items-center w-full justify-center bg-green-300 p-2"
            >
              <div class="w-1/3 font-medium text-right pr-4">Longitude</div>
              <div class="w-2/3">
                <${Setting}
                  value=${$.lon_de}
                  setfn=${Zt=>ye("lon_de",Zt)}
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
                  setfn=${Zt=>ye("lat_de",Zt)}
                  type="text"
                  class="w-full"
                />
              </div>
            </div>

            <div
              class="flex items-center w-full justify-center bg-green-300 p-2"
            >
              <div class="w-1/3 font-medium text-right pr-4">
                Sunrise: ${$.sunrise}
              </div>
              <div class="w-2/3 flex items-center">
                <input
                  type="text"
                  value=${$.sunrise_pins||""}
                  onInput=${Zt=>ye("sunrise_pins",Zt.target.value)}
                  maxlength="20"
                  placeholder="Action for sunrise"
                  class="w-1/2 mr-2 px-2 py-1 border rounded"
                />
                <${Setting}
                  value=${$.onsunrise}
                  setfn=${Zt=>ye("onsunrise",Zt)}
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
                  onInput=${Zt=>ye("sunset_pins",Zt.target.value)}
                  maxlength="20"
                  placeholder="Action for sunset"
                  class="w-1/2 mr-2 px-2 py-1 border rounded"
                />
                <${Setting}
                  value=${$.onsunset}
                  setfn=${Zt=>ye("onsunset",Zt)}
                  type="switch"
                  class="w-1/2"
                />
              </div>
            </div>
            <div
              class="flex items-center w-full justify-center bg-green-300 p-2"
            >
              <div class="w-1/3 font-medium text-right pr-4">Day Length</div>
              <div class="w-2/3">
                <span class="text-lg">${$.dlength}</span>
              </div>
            </div>

            <div
              class="flex items-center w-full justify-center bg-gray-400 p-2"
            >
              <div class="w-1/3 font-medium text-right pr-4">
                Next full moon:
              </div>
              <div class="w-2/3">
                <span class="text-lg">
                  ${typeof $.fullmoon=="string"&&$.fullmoon?`${$.fullmoon.split(" ")[0]} at ${$.fullmoon.split(" ")[1]}`:"N/A"}
                </span>
              </div>
            </div>
<div class="flex items-center w-full justify-center bg-gray-400 p-2">
  <div class="w-1/3 font-medium text-right pr-4">[OFFLINE MODE] Date</div>
  <div class="w-2/3 flex items-center">
    <input
  type="text"
  name="offline_date"
  value=${$.offline_date||""}
  onInput=${Zt=>ye("offline_date",Zt.target.value)}
  placeholder="д.м.гг"
  class=${`w-1/3 mr-2 px-2 py-1 border rounded ${pt.offline_date?"border-red-500":""} focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${pt.offline_date?"focus-visible:ring-red-500":""}`}
/>
<span class="mr-4">Time</span>
<input
  type="text"
  name="offline_time"
  value=${$.offline_time||""}
  onInput=${Zt=>ye("offline_time",Zt.target.value)}
  placeholder="чч:мм:сс"
  class=${`w-1/3 px-2 py-1 border rounded ${pt.offline_time?"border-red-500":""} focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${pt.offline_time?"focus-visible:ring-red-500":""}`}
/>
  </div>
</div>
 <button 
    type="submit" 
    class=${`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${ne?"opacity-50 cursor-not-allowed":""}`}
    disabled=${ne}
  >
    Save changes
  </button>
          </div>
        </form>
      </div>
      ${ee&&Et`
        <div
          class="fixed bottom-5 right-5 ${ee.type==="success"?"bg-green-500":"bg-red-500"} text-white px-4 py-2 rounded shadow-lg"
        >
          ${ee.message}
        </div>
      `}
    </div>
  `):""}const App=function({}){const[$,_]=ut(!0),[k,ct]=ut("/"),[dt,st]=ut(""),[pt,te]=ut(!0),Yt=()=>fetch("api/logout").then(le=>st("")),ee=le=>le.ok?le.json().then(ht=>st(ht.user)).finally(ht=>_(!1)):_(!1)&&st(null);return lt(()=>fetch("api/login").then(ee),[]),$?"":dt?Et` <div class="min-h-screen bg-slate-100" id="mains">
    <${Sidebar} url=${k} show=${pt} />
    <${Header}
      logout=${Yt}
      user=${dt}
      showSidebar=${pt}
      setShowSidebar=${te}
    />
    <div
      class="${pt&&"pl-72"} transition-all duration-300 transform"
    >
      <${Qt}
        onChange=${le=>ct(le.url)}
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
      loginFn=${ee}
      logoIcon=${Logo}
      title="Device Dashboard Login"
      tipText="To login, use: admin/admin, user1/user1, user2/user2"
    />`};window.onload=()=>O(y(App),document.body);
