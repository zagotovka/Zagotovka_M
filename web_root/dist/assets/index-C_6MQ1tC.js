(function(){const _=document.createElement("link").relList;if(_&&_.supports&&_.supports("modulepreload"))return;for(const ct of document.querySelectorAll('link[rel="modulepreload"]'))dt(ct);new MutationObserver(ct=>{for(const st of ct)if(st.type==="childList")for(const pt of st.addedNodes)pt.tagName==="LINK"&&pt.rel==="modulepreload"&&dt(pt)}).observe(document,{childList:!0,subtree:!0});function k(ct){const st={};return ct.integrity&&(st.integrity=ct.integrity),ct.referrerPolicy&&(st.referrerPolicy=ct.referrerPolicy),ct.crossOrigin==="use-credentials"?st.credentials="include":ct.crossOrigin==="anonymous"?st.credentials="omit":st.credentials="same-origin",st}function dt(ct){if(ct.ep)return;ct.ep=!0;const st=k(ct);fetch(ct.href,st)}})();var t,n,e,r,o,u,i,l,c,a,s,f={},p=[],h=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,d=Array.isArray;function v($,_){for(var k in _)$[k]=_[k];return $}function m($){var _=$.parentNode;_&&_.removeChild($)}function y($,_,k){var dt,ct,st,pt={};for(st in _)st=="key"?dt=_[st]:st=="ref"?ct=_[st]:pt[st]=_[st];if(arguments.length>2&&(pt.children=arguments.length>3?t.call(arguments,2):k),typeof $=="function"&&$.defaultProps!=null)for(st in $.defaultProps)pt[st]===void 0&&(pt[st]=$.defaultProps[st]);return g($,pt,dt,ct,null)}function g($,_,k,dt,ct){var st={type:$,props:_,key:k,ref:dt,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:ct??++e,__i:-1,__u:0};return ct==null&&n.vnode!=null&&n.vnode(st),st}function b($){return $.children}function C($,_){this.props=$,this.context=_}function x($,_){if(_==null)return $.__?x($.__,$.__i+1):null;for(var k;_<$.__k.length;_++)if((k=$.__k[_])!=null&&k.__e!=null)return k.__e;return typeof $.type=="function"?x($):null}function w($){var _,k;if(($=$.__)!=null&&$.__c!=null){for($.__e=$.__c.base=null,_=0;_<$.__k.length;_++)if((k=$.__k[_])!=null&&k.__e!=null){$.__e=$.__c.base=k.__e;break}return w($)}}function P($){(!$.__d&&($.__d=!0)&&r.push($)&&!U.__r++||o!==n.debounceRendering)&&((o=n.debounceRendering)||u)(U)}function U(){var $,_,k,dt,ct,st,pt,Yt;for(r.sort(i);$=r.shift();)$.__d&&(_=r.length,dt=void 0,st=(ct=(k=$).__v).__e,pt=[],Yt=[],k.__P&&((dt=v({},ct)).__v=ct.__v+1,n.vnode&&n.vnode(dt),M(k.__P,dt,ct,k.__n,k.__P.namespaceURI,32&ct.__u?[st]:null,pt,st??x(ct),!!(32&ct.__u),Yt),dt.__v=ct.__v,dt.__.__k[dt.__i]=dt,L(pt,dt,Yt),dt.__e!=st&&w(dt)),r.length>_&&r.sort(i));U.__r=0}function H($,_,k,dt,ct,st,pt,Yt,$t,ee,se){var ht,Zt,oe,ce,be,me=dt&&dt.__k||p,ue=_.length;for(k.__d=$t,E(k,_,me),$t=k.__d,ht=0;ht<ue;ht++)(oe=k.__k[ht])!=null&&typeof oe!="boolean"&&typeof oe!="function"&&(Zt=oe.__i===-1?f:me[oe.__i]||f,oe.__i=ht,M($,oe,Zt,ct,st,pt,Yt,$t,ee,se),ce=oe.__e,oe.ref&&Zt.ref!=oe.ref&&(Zt.ref&&F(Zt.ref,null,oe),se.push(oe.ref,oe.__c||ce,oe)),be==null&&ce!=null&&(be=ce),65536&oe.__u||Zt.__k===oe.__k?($t&&!$t.isConnected&&($t=x(Zt)),$t=S(oe,$t,$)):typeof oe.type=="function"&&oe.__d!==void 0?$t=oe.__d:ce&&($t=ce.nextSibling),oe.__d=void 0,oe.__u&=-196609);k.__d=$t,k.__e=be}function E($,_,k){var dt,ct,st,pt,Yt,$t=_.length,ee=k.length,se=ee,ht=0;for($.__k=[],dt=0;dt<$t;dt++)pt=dt+ht,(ct=$.__k[dt]=(ct=_[dt])==null||typeof ct=="boolean"||typeof ct=="function"?null:typeof ct=="string"||typeof ct=="number"||typeof ct=="bigint"||ct.constructor==String?g(null,ct,null,null,null):d(ct)?g(b,{children:ct},null,null,null):ct.constructor===void 0&&ct.__b>0?g(ct.type,ct.props,ct.key,ct.ref?ct.ref:null,ct.__v):ct)!=null?(ct.__=$,ct.__b=$.__b+1,Yt=D(ct,k,pt,se),ct.__i=Yt,st=null,Yt!==-1&&(se--,(st=k[Yt])&&(st.__u|=131072)),st==null||st.__v===null?(Yt==-1&&ht--,typeof ct.type!="function"&&(ct.__u|=65536)):Yt!==pt&&(Yt===pt+1?ht++:Yt>pt?se>$t-pt?ht+=Yt-pt:ht--:Yt<pt?Yt==pt-1&&(ht=Yt-pt):ht=0,Yt!==dt+ht&&(ct.__u|=65536))):(st=k[pt])&&st.key==null&&st.__e&&(131072&st.__u)==0&&(st.__e==$.__d&&($.__d=x(st)),I(st,st,!1),k[pt]=null,se--);if(se)for(dt=0;dt<ee;dt++)(st=k[dt])!=null&&(131072&st.__u)==0&&(st.__e==$.__d&&($.__d=x(st)),I(st,st))}function S($,_,k){var dt,ct;if(typeof $.type=="function"){for(dt=$.__k,ct=0;dt&&ct<dt.length;ct++)dt[ct]&&(dt[ct].__=$,_=S(dt[ct],_,k));return _}$.__e!=_&&(k.insertBefore($.__e,_||null),_=$.__e);do _=_&&_.nextSibling;while(_!=null&&_.nodeType===8);return _}function A($,_){return _=_||[],$==null||typeof $=="boolean"||(d($)?$.some((function(k){A(k,_)})):_.push($)),_}function D($,_,k,dt){var ct=$.key,st=$.type,pt=k-1,Yt=k+1,$t=_[k];if($t===null||$t&&ct==$t.key&&st===$t.type&&(131072&$t.__u)==0)return k;if(dt>($t!=null&&(131072&$t.__u)==0?1:0))for(;pt>=0||Yt<_.length;){if(pt>=0){if(($t=_[pt])&&(131072&$t.__u)==0&&ct==$t.key&&st===$t.type)return pt;pt--}if(Yt<_.length){if(($t=_[Yt])&&(131072&$t.__u)==0&&ct==$t.key&&st===$t.type)return Yt;Yt++}}return-1}function N($,_,k){_[0]==="-"?$.setProperty(_,k??""):$[_]=k==null?"":typeof k!="number"||h.test(_)?k:k+"px"}function R($,_,k,dt,ct){var st;t:if(_==="style")if(typeof k=="string")$.style.cssText=k;else{if(typeof dt=="string"&&($.style.cssText=dt=""),dt)for(_ in dt)k&&_ in k||N($.style,_,"");if(k)for(_ in k)dt&&k[_]===dt[_]||N($.style,_,k[_])}else if(_[0]==="o"&&_[1]==="n")st=_!==(_=_.replace(/(PointerCapture)$|Capture$/i,"$1")),_=_.toLowerCase()in $||_==="onFocusOut"||_==="onFocusIn"?_.toLowerCase().slice(2):_.slice(2),$.l||($.l={}),$.l[_+st]=k,k?dt?k.u=dt.u:(k.u=l,$.addEventListener(_,st?a:c,st)):$.removeEventListener(_,st?a:c,st);else{if(ct=="http://www.w3.org/2000/svg")_=_.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(_!="width"&&_!="height"&&_!="href"&&_!="list"&&_!="form"&&_!="tabIndex"&&_!="download"&&_!="rowSpan"&&_!="colSpan"&&_!="role"&&_ in $)try{$[_]=k??"";break t}catch{}typeof k=="function"||(k==null||k===!1&&_[4]!=="-"?$.removeAttribute(_):$.setAttribute(_,k))}}function T($){return function(_){if(this.l){var k=this.l[_.type+$];if(_.t==null)_.t=l++;else if(_.t<k.u)return;return k(n.event?n.event(_):_)}}}function M($,_,k,dt,ct,st,pt,Yt,$t,ee){var se,ht,Zt,oe,ce,be,me,ue,ge,ve,_e,ie,Ie,Se,Te,Ee=_.type;if(_.constructor!==void 0)return null;128&k.__u&&($t=!!(32&k.__u),st=[Yt=_.__e=k.__e]),(se=n.__b)&&se(_);t:if(typeof Ee=="function")try{if(ue=_.props,ge=(se=Ee.contextType)&&dt[se.__c],ve=se?ge?ge.props.value:se.__:dt,k.__c?me=(ht=_.__c=k.__c).__=ht.__E:("prototype"in Ee&&Ee.prototype.render?_.__c=ht=new Ee(ue,ve):(_.__c=ht=new C(ue,ve),ht.constructor=Ee,ht.render=V),ge&&ge.sub(ht),ht.props=ue,ht.state||(ht.state={}),ht.context=ve,ht.__n=dt,Zt=ht.__d=!0,ht.__h=[],ht._sb=[]),ht.__s==null&&(ht.__s=ht.state),Ee.getDerivedStateFromProps!=null&&(ht.__s==ht.state&&(ht.__s=v({},ht.__s)),v(ht.__s,Ee.getDerivedStateFromProps(ue,ht.__s))),oe=ht.props,ce=ht.state,ht.__v=_,Zt)Ee.getDerivedStateFromProps==null&&ht.componentWillMount!=null&&ht.componentWillMount(),ht.componentDidMount!=null&&ht.__h.push(ht.componentDidMount);else{if(Ee.getDerivedStateFromProps==null&&ue!==oe&&ht.componentWillReceiveProps!=null&&ht.componentWillReceiveProps(ue,ve),!ht.__e&&(ht.shouldComponentUpdate!=null&&ht.shouldComponentUpdate(ue,ht.__s,ve)===!1||_.__v===k.__v)){for(_.__v!==k.__v&&(ht.props=ue,ht.state=ht.__s,ht.__d=!1),_.__e=k.__e,_.__k=k.__k,_.__k.forEach((function(le){le&&(le.__=_)})),_e=0;_e<ht._sb.length;_e++)ht.__h.push(ht._sb[_e]);ht._sb=[],ht.__h.length&&pt.push(ht);break t}ht.componentWillUpdate!=null&&ht.componentWillUpdate(ue,ht.__s,ve),ht.componentDidUpdate!=null&&ht.__h.push((function(){ht.componentDidUpdate(oe,ce,be)}))}if(ht.context=ve,ht.props=ue,ht.__P=$,ht.__e=!1,ie=n.__r,Ie=0,"prototype"in Ee&&Ee.prototype.render){for(ht.state=ht.__s,ht.__d=!1,ie&&ie(_),se=ht.render(ht.props,ht.state,ht.context),Se=0;Se<ht._sb.length;Se++)ht.__h.push(ht._sb[Se]);ht._sb=[]}else do ht.__d=!1,ie&&ie(_),se=ht.render(ht.props,ht.state,ht.context),ht.state=ht.__s;while(ht.__d&&++Ie<25);ht.state=ht.__s,ht.getChildContext!=null&&(dt=v(v({},dt),ht.getChildContext())),Zt||ht.getSnapshotBeforeUpdate==null||(be=ht.getSnapshotBeforeUpdate(oe,ce)),H($,d(Te=se!=null&&se.type===b&&se.key==null?se.props.children:se)?Te:[Te],_,k,dt,ct,st,pt,Yt,$t,ee),ht.base=_.__e,_.__u&=-161,ht.__h.length&&pt.push(ht),me&&(ht.__E=ht.__=null)}catch(le){_.__v=null,$t||st!=null?(_.__e=Yt,_.__u|=$t?160:32,st[st.indexOf(Yt)]=null):(_.__e=k.__e,_.__k=k.__k),n.__e(le,_,k)}else st==null&&_.__v===k.__v?(_.__k=k.__k,_.__e=k.__e):_.__e=W(k.__e,_,k,dt,ct,st,pt,$t,ee);(se=n.diffed)&&se(_)}function L($,_,k){_.__d=void 0;for(var dt=0;dt<k.length;dt++)F(k[dt],k[++dt],k[++dt]);n.__c&&n.__c(_,$),$.some((function(ct){try{$=ct.__h,ct.__h=[],$.some((function(st){st.call(ct)}))}catch(st){n.__e(st,ct.__v)}}))}function W($,_,k,dt,ct,st,pt,Yt,$t){var ee,se,ht,Zt,oe,ce,be,me=k.props,ue=_.props,ge=_.type;if(ge==="svg"?ct="http://www.w3.org/2000/svg":ge==="math"?ct="http://www.w3.org/1998/Math/MathML":ct||(ct="http://www.w3.org/1999/xhtml"),st!=null){for(ee=0;ee<st.length;ee++)if((oe=st[ee])&&"setAttribute"in oe==!!ge&&(ge?oe.localName===ge:oe.nodeType===3)){$=oe,st[ee]=null;break}}if($==null){if(ge===null)return document.createTextNode(ue);$=document.createElementNS(ct,ge,ue.is&&ue),st=null,Yt=!1}if(ge===null)me===ue||Yt&&$.data===ue||($.data=ue);else{if(st=st&&t.call($.childNodes),me=k.props||f,!Yt&&st!=null)for(me={},ee=0;ee<$.attributes.length;ee++)me[(oe=$.attributes[ee]).name]=oe.value;for(ee in me)if(oe=me[ee],ee!="children"){if(ee=="dangerouslySetInnerHTML")ht=oe;else if(ee!=="key"&&!(ee in ue)){if(ee=="value"&&"defaultValue"in ue||ee=="checked"&&"defaultChecked"in ue)continue;R($,ee,null,oe,ct)}}for(ee in ue)oe=ue[ee],ee=="children"?Zt=oe:ee=="dangerouslySetInnerHTML"?se=oe:ee=="value"?ce=oe:ee=="checked"?be=oe:ee==="key"||Yt&&typeof oe!="function"||me[ee]===oe||R($,ee,oe,me[ee],ct);if(se)Yt||ht&&(se.__html===ht.__html||se.__html===$.innerHTML)||($.innerHTML=se.__html),_.__k=[];else if(ht&&($.innerHTML=""),H($,d(Zt)?Zt:[Zt],_,k,dt,ge==="foreignObject"?"http://www.w3.org/1999/xhtml":ct,st,pt,st?st[0]:k.__k&&x(k,0),Yt,$t),st!=null)for(ee=st.length;ee--;)st[ee]!=null&&m(st[ee]);Yt||(ee="value",ce!==void 0&&(ce!==$[ee]||ge==="progress"&&!ce||ge==="option"&&ce!==me[ee])&&R($,ee,ce,me[ee],ct),ee="checked",be!==void 0&&be!==$[ee]&&R($,ee,be,me[ee],ct))}return $}function F($,_,k){try{typeof $=="function"?$(_):$.current=_}catch(dt){n.__e(dt,k)}}function I($,_,k){var dt,ct;if(n.unmount&&n.unmount($),(dt=$.ref)&&(dt.current&&dt.current!==$.__e||F(dt,null,_)),(dt=$.__c)!=null){if(dt.componentWillUnmount)try{dt.componentWillUnmount()}catch(st){n.__e(st,_)}dt.base=dt.__P=null}if(dt=$.__k)for(ct=0;ct<dt.length;ct++)dt[ct]&&I(dt[ct],_,k||typeof $.type!="function");k||$.__e==null||m($.__e),$.__c=$.__=$.__e=$.__d=void 0}function V($,_,k){return this.constructor($,k)}function O($,_,k){var dt,ct,st,pt;n.__&&n.__($,_),ct=(dt=!1)?null:_.__k,st=[],pt=[],M(_,$=_.__k=y(b,null,[$]),ct||f,f,_.namespaceURI,ct?null:_.firstChild?t.call(_.childNodes):null,st,ct?ct.__e:_.firstChild,dt,pt),L(st,$,pt)}function j($,_,k){var dt,ct,st,pt,Yt=v({},$.props);for(st in $.type&&$.type.defaultProps&&(pt=$.type.defaultProps),_)st=="key"?dt=_[st]:st=="ref"?ct=_[st]:Yt[st]=_[st]===void 0&&pt!==void 0?pt[st]:_[st];return arguments.length>2&&(Yt.children=arguments.length>3?t.call(arguments,2):k),g($.type,Yt,dt||$.key,ct||$.ref,null)}function q($,_){var k={__c:_="__cC"+s++,__:$,Consumer:function(dt,ct){return dt.children(ct)},Provider:function(dt){var ct,st;return this.getChildContext||(ct=[],(st={})[_]=this,this.getChildContext=function(){return st},this.shouldComponentUpdate=function(pt){this.props.value!==pt.value&&ct.some((function(Yt){Yt.__e=!0,P(Yt)}))},this.sub=function(pt){ct.push(pt);var Yt=pt.componentWillUnmount;pt.componentWillUnmount=function(){ct.splice(ct.indexOf(pt),1),Yt&&Yt.call(pt)}}),dt.children}};return k.Provider.__=k.Consumer.contextType=k}t=p.slice,n={__e:function($,_,k,dt){for(var ct,st,pt;_=_.__;)if((ct=_.__c)&&!ct.__)try{if((st=ct.constructor)&&st.getDerivedStateFromError!=null&&(ct.setState(st.getDerivedStateFromError($)),pt=ct.__d),ct.componentDidCatch!=null&&(ct.componentDidCatch($,dt||{}),pt=ct.__d),pt)return ct.__E=ct}catch(Yt){$=Yt}throw $}},e=0,C.prototype.setState=function($,_){var k;k=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=v({},this.state),typeof $=="function"&&($=$(v({},k),this.props)),$&&v(k,$),$!=null&&this.__v&&(_&&this._sb.push(_),P(this))},C.prototype.forceUpdate=function($){this.__v&&(this.__e=!0,$&&this.__h.push($),P(this))},C.prototype.render=b,r=[],u=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=function($,_){return $.__v.__b-_.__v.__b},U.__r=0,l=0,c=T(!1),a=T(!0),s=0;var B,K,z,G,J=0,Q=[],X=[],Y=n,Z=Y.__b,tt=Y.__r,nt=Y.diffed,et=Y.__c,_t=Y.unmount,rt=Y.__;function ot($,_){Y.__h&&Y.__h(K,$,J||_),J=0;var k=K.__H||(K.__H={__:[],__h:[]});return $>=k.__.length&&k.__.push({__V:X}),k.__[$]}function ut($){return J=1,it(wt,$)}function it($,_,k){var dt=ot(B++,2);if(dt.t=$,!dt.__c&&(dt.__=[wt(void 0,_),function(Yt){var $t=dt.__N?dt.__N[0]:dt.__[0],ee=dt.t($t,Yt);$t!==ee&&(dt.__N=[ee,dt.__[1]],dt.__c.setState({}))}],dt.__c=K,!K.u)){var ct=function(Yt,$t,ee){if(!dt.__c.__H)return!0;var se=dt.__c.__H.__.filter((function(Zt){return!!Zt.__c}));if(se.every((function(Zt){return!Zt.__N})))return!st||st.call(this,Yt,$t,ee);var ht=!1;return se.forEach((function(Zt){if(Zt.__N){var oe=Zt.__[0];Zt.__=Zt.__N,Zt.__N=void 0,oe!==Zt.__[0]&&(ht=!0)}})),!(!ht&&dt.__c.props===Yt)&&(!st||st.call(this,Yt,$t,ee))};K.u=!0;var st=K.shouldComponentUpdate,pt=K.componentWillUpdate;K.componentWillUpdate=function(Yt,$t,ee){if(this.__e){var se=st;st=void 0,ct(Yt,$t,ee),st=se}pt&&pt.call(this,Yt,$t,ee)},K.shouldComponentUpdate=ct}return dt.__N||dt.__}function lt($,_){var k=ot(B++,3);!Y.__s&&xt(k.__H,_)&&(k.__=$,k.i=_,K.__H.__h.push(k))}function at($){return J=5,ft((function(){return{current:$}}),[])}function ft($,_){var k=ot(B++,7);return xt(k.__H,_)?(k.__V=$(),k.i=_,k.__h=$,k.__V):k.__}function yt(){for(var $;$=Q.shift();)if($.__P&&$.__H)try{$.__H.__h.forEach(bt),$.__H.__h.forEach(Ct),$.__H.__h=[]}catch(_){$.__H.__h=[],Y.__e(_,$.__v)}}Y.__b=function($){K=null,Z&&Z($)},Y.__=function($,_){$&&_.__k&&_.__k.__m&&($.__m=_.__k.__m),rt&&rt($,_)},Y.__r=function($){tt&&tt($),B=0;var _=(K=$.__c).__H;_&&(z===K?(_.__h=[],K.__h=[],_.__.forEach((function(k){k.__N&&(k.__=k.__N),k.__V=X,k.__N=k.i=void 0}))):(_.__h.forEach(bt),_.__h.forEach(Ct),_.__h=[],B=0)),z=K},Y.diffed=function($){nt&&nt($);var _=$.__c;_&&_.__H&&(_.__H.__h.length&&(Q.push(_)!==1&&G===Y.requestAnimationFrame||((G=Y.requestAnimationFrame)||kt)(yt)),_.__H.__.forEach((function(k){k.i&&(k.__H=k.i),k.__V!==X&&(k.__=k.__V),k.i=void 0,k.__V=X}))),z=K=null},Y.__c=function($,_){_.some((function(k){try{k.__h.forEach(bt),k.__h=k.__h.filter((function(dt){return!dt.__||Ct(dt)}))}catch(dt){_.some((function(ct){ct.__h&&(ct.__h=[])})),_=[],Y.__e(dt,k.__v)}})),et&&et($,_)},Y.unmount=function($){_t&&_t($);var _,k=$.__c;k&&k.__H&&(k.__H.__.forEach((function(dt){try{bt(dt)}catch(ct){_=ct}})),k.__H=void 0,_&&Y.__e(_,k.__v))};var gt=typeof requestAnimationFrame=="function";function kt($){var _,k=function(){clearTimeout(dt),gt&&cancelAnimationFrame(_),setTimeout($)},dt=setTimeout(k,100);gt&&(_=requestAnimationFrame(k))}function bt($){var _=K,k=$.__c;typeof k=="function"&&($.__c=void 0,k()),K=_}function Ct($){var _=K;$.__c=$.__(),K=_}function xt($,_){return!$||$.length!==_.length||_.some((function(k,dt){return k!==$[dt]}))}function wt($,_){return typeof _=="function"?_($):_}var Pt=function($,_,k,dt){var ct;_[0]=0;for(var st=1;st<_.length;st++){var pt=_[st++],Yt=_[st]?(_[0]|=pt?1:2,k[_[st++]]):_[++st];pt===3?dt[0]=Yt:pt===4?dt[1]=Object.assign(dt[1]||{},Yt):pt===5?(dt[1]=dt[1]||{})[_[++st]]=Yt:pt===6?dt[1][_[++st]]+=Yt+"":pt?(ct=$.apply(Yt,Pt($,Yt,k,["",null])),dt.push(ct),Yt[0]?_[0]|=2:(_[st-2]=0,_[st]=ct)):dt.push(Yt)}return dt},Ut=new Map;function Ht($){var _=Ut.get(this);return _||(_=new Map,Ut.set(this,_)),(_=Pt(this,_.get($)||(_.set($,_=(function(k){for(var dt,ct,st=1,pt="",Yt="",$t=[0],ee=function(Zt){st===1&&(Zt||(pt=pt.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?$t.push(0,Zt,pt):st===3&&(Zt||pt)?($t.push(3,Zt,pt),st=2):st===2&&pt==="..."&&Zt?$t.push(4,Zt,0):st===2&&pt&&!Zt?$t.push(5,0,!0,pt):st>=5&&((pt||!Zt&&st===5)&&($t.push(st,0,pt,ct),st=6),Zt&&($t.push(st,Zt,0,ct),st=6)),pt=""},se=0;se<k.length;se++){se&&(st===1&&ee(),ee(se));for(var ht=0;ht<k[se].length;ht++)dt=k[se][ht],st===1?dt==="<"?(ee(),$t=[$t],st=3):pt+=dt:st===4?pt==="--"&&dt===">"?(st=1,pt=""):pt=dt+pt[0]:Yt?dt===Yt?Yt="":pt+=dt:dt==='"'||dt==="'"?Yt=dt:dt===">"?(ee(),st=1):st&&(dt==="="?(st=5,ct=pt,pt=""):dt==="/"&&(st<5||k[se][ht+1]===">")?(ee(),st===3&&($t=$t[0]),st=$t,($t=$t[0]).push(2,0,st),st=0):dt===" "||dt==="	"||dt===`
`||dt==="\r"?(ee(),st=2):pt+=dt),st===3&&pt==="!--"&&(st=4,$t=$t[0])}return ee(),$t})($)),_),arguments,[])).length>1?_:_[0]}var Et=Ht.bind(y),St={};function At($,_){for(var k in _)$[k]=_[k];return $}function Dt($,_,k){var dt,ct=/(?:\?([^#]*))?(#.*)?$/,st=$.match(ct),pt={};if(st&&st[1])for(var Yt=st[1].split("&"),$t=0;$t<Yt.length;$t++){var ee=Yt[$t].split("=");pt[decodeURIComponent(ee[0])]=decodeURIComponent(ee.slice(1).join("="))}$=Tt($.replace(ct,"")),_=Tt(_||"");for(var se=Math.max($.length,_.length),ht=0;ht<se;ht++)if(_[ht]&&_[ht].charAt(0)===":"){var Zt=_[ht].replace(/(^:|[+*?]+$)/g,""),oe=(_[ht].match(/[+*?]+$/)||St)[0]||"",ce=~oe.indexOf("+"),be=~oe.indexOf("*"),me=$[ht]||"";if(!me&&!be&&(oe.indexOf("?")<0||ce)){dt=!1;break}if(pt[Zt]=decodeURIComponent(me),ce||be){pt[Zt]=$.slice(ht).map(decodeURIComponent).join("/");break}}else if(_[ht]!==$[ht]){dt=!1;break}return(k.default===!0||dt!==!1)&&pt}function Nt($,_){return $.rank<_.rank?1:$.rank>_.rank?-1:$.index-_.index}function Rt($,_){return $.index=_,$.rank=(function(k){return k.props.default?0:Tt(k.props.path).map(Mt).join("")})($),$.props}function Tt($){return $.replace(/(^\/+|\/+$)/g,"").split("/")}function Mt($){return $.charAt(0)==":"?1+"*+?".indexOf($.charAt($.length-1))||4:5}var Lt={},Wt=[],Ft=[],It=null,Vt={url:jt()},Ot=q(Vt);function jt(){var $;return""+(($=It&&It.location?It.location:It&&It.getCurrentLocation?It.getCurrentLocation():typeof location<"u"?location:Lt).pathname||"")+($.search||"")}function qt($,_){return _===void 0&&(_=!1),typeof $!="string"&&$.url&&(_=$.replace,$=$.url),(function(k){for(var dt=Wt.length;dt--;)if(Wt[dt].canRoute(k))return!0;return!1})($)&&(function(k,dt){dt===void 0&&(dt="push"),It&&It[dt]?It[dt](k):typeof history<"u"&&history[dt+"State"]&&history[dt+"State"](null,null,k)})($,_?"replace":"push"),Bt($)}function Bt($){for(var _=!1,k=0;k<Wt.length;k++)Wt[k].routeTo($)&&(_=!0);return _}function Kt($){if($&&$.getAttribute){var _=$.getAttribute("href"),k=$.getAttribute("target");if(_&&_.match(/^\//g)&&(!k||k.match(/^_?self$/i)))return qt(_)}}function zt($){return $.stopImmediatePropagation&&$.stopImmediatePropagation(),$.stopPropagation&&$.stopPropagation(),$.preventDefault(),!1}function Gt($){if(!($.ctrlKey||$.metaKey||$.altKey||$.shiftKey||$.button)){var _=$.target;do if(_.localName==="a"&&_.getAttribute("href")){if(_.hasAttribute("data-native")||_.hasAttribute("native"))return;if(Kt(_))return zt($)}while(_=_.parentNode)}}var Jt=!1;function Qt($){$.history&&(It=$.history),this.state={url:$.url||jt()}}At(Qt.prototype=new C,{shouldComponentUpdate:function($){return $.static!==!0||$.url!==this.props.url||$.onChange!==this.props.onChange},canRoute:function($){var _=A(this.props.children);return this.g(_,$)!==void 0},routeTo:function($){this.setState({url:$});var _=this.canRoute($);return this.p||this.forceUpdate(),_},componentWillMount:function(){this.p=!0},componentDidMount:function(){var $=this;Jt||(Jt=!0,It||addEventListener("popstate",(function(){Bt(jt())})),addEventListener("click",Gt)),Wt.push(this),It&&(this.u=It.listen((function(_){var k=_.location||_;$.routeTo(""+(k.pathname||"")+(k.search||""))}))),this.p=!1},componentWillUnmount:function(){typeof this.u=="function"&&this.u(),Wt.splice(Wt.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function($,_){$=$.filter(Rt).sort(Nt);for(var k=0;k<$.length;k++){var dt=$[k],ct=Dt(_,dt.props.path,dt.props);if(ct)return[dt,ct]}},render:function($,_){var k,dt,ct=$.onChange,st=_.url,pt=this.c,Yt=this.g(A($.children),st);if(Yt&&(dt=j(Yt[0],At(At({url:st,matches:k=Yt[1]},k),{key:void 0,ref:void 0}))),st!==(pt&&pt.url)){At(Vt,pt=this.c={url:st,previous:pt&&pt.url,current:dt,path:dt?dt.props.path:null,matches:k}),pt.router=this,pt.active=dt?[dt]:[];for(var $t=Ft.length;$t--;)Ft[$t]({});typeof ct=="function"&&ct(pt)}return y(Ot.Provider,{value:pt},dt)}});const switchIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='652.000000pt'%20height='956.000000pt'%20viewBox='0%200%20652.000000%20956.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,956.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M1150%209540%20c-386%20-6%20-408%20-8%20-475%20-29%20-147%20-48%20-255%20-115%20-368%20-226%20-93%20-91%20-145%20-159%20-191%20-250%20-74%20-146%20-77%20-163%20-87%20-455%20-10%20-318%20-14%20-7639%20-4%20-7725%2025%20-214%20107%20-394%20245%20-539%20115%20-121%20227%20-192%20408%20-260%20l72%20-28%202418%20-1%20c2586%20-2%202582%20-2%202716%2047%20254%2092%20492%20346%20573%20611%2017%2058%2018%20211%2018%204095%20l0%204035%20-23%2075%20c-61%20193%20-204%20388%20-368%20501%20-76%2052%20-226%20118%20-294%20129%20-36%206%20-229%2015%20-430%2020%20-398%2010%20-3557%2010%20-4210%200z%20m4610%20-328%20c164%20-59%20291%20-175%20374%20-339%20l36%20-73%200%20-4016%200%20-4016%20-45%20-88%20c-25%20-48%20-70%20-115%20-101%20-148%20-64%20-71%20-175%20-148%20-242%20-168%20-103%20-32%20-400%20-35%20-2687%20-32%20-2180%203%20-2282%204%20-2335%2022%20-204%2068%20-363%20240%20-417%20452%20-17%2065%20-18%20275%20-18%203979%200%203785%201%203912%2019%203980%2024%2091%2084%20207%20140%20271%2055%2062%20182%20152%20244%20171%2027%208%20121%2018%20222%2022%2096%205%201203%208%202460%207%20l2285%20-1%2065%20-23z'/%3e%3cpath%20d='M1434%208128%20l-45%20-41%203%20-3291%20c3%20-3127%204%20-3293%2021%20-3323%209%20-18%2029%20-41%2044%20-50%2026%20-17%20125%20-18%201799%20-18%201918%200%201808%20-3%201834%2054%207%2014%2016%2067%2021%20116%205%2050%209%20789%209%201644%20l0%201554%20249%20981%20c358%201405%20401%201581%20401%201626%200%2051%204%2046%20-414%20468%20l-321%20322%20-1778%200%20-1777%200%20-46%20-42z%20m3636%20-425%20l165%20-168%20-185%20-6%20c-102%20-4%20-770%20-7%20-1485%20-8%20l-1300%20-1%20-145%20148%20c-80%2081%20-156%20159%20-170%20175%20l-23%2027%201489%200%201490%200%20164%20-167z%20m-3078%20-356%20l31%20-38%20-147%20-583%20c-81%20-320%20-153%20-602%20-160%20-626%20-12%20-39%20-13%20-23%20-19%20185%20-9%20291%20-9%20823%200%201123%20l6%20233%20129%20-128%20c71%20-70%20143%20-145%20160%20-166z%20m2900%20-136%20c278%20-3%20510%20-9%20513%20-13%2010%20-10%203%20-40%20-305%20-1260%20l-280%20-1107%200%20-1565%200%20-1566%20-1565%200%20-1565%200%200%201521%200%201520%20310%201226%20c171%20675%20313%201229%20316%201232%2014%2014%201788%2022%202576%2012z'/%3e%3cpath%20d='M3765%206820%20c-61%20-25%20-87%20-94%20-185%20-473%20-80%20-315%20-120%20-493%20-120%20-540%200%20-77%2078%20-141%20163%20-134%2069%206%20101%2040%20131%20141%2057%20190%20197%20746%20212%20843%205%2032%201%2053%20-19%2096%20-22%2048%20-30%2057%20-64%2066%20-44%2013%20-90%2013%20-118%201z'/%3e%3cpath%20d='M3098%203406%20c-104%20-37%20-216%20-134%20-264%20-227%20-24%20-47%20-28%20-71%20-35%20-184%20-19%20-311%20-7%20-500%2037%20-586%2040%20-80%20113%20-151%20201%20-195%20l76%20-39%20151%200%20151%200%2068%2034%20c81%2041%20167%20128%20215%20218%20l32%2061%200%20302%200%20302%20-41%2078%20c-65%20127%20-156%20201%20-284%20235%20-73%2019%20-255%2019%20-307%201z%20m262%20-311%20c58%20-30%2064%20-57%2068%20-301%204%20-219%204%20-222%20-19%20-253%20-65%20-88%20-230%20-95%20-286%20-13%20-16%2024%20-18%2055%20-21%20273%20l-3%20246%2038%2030%20c21%2017%2045%2033%2053%2036%2025%2011%20137%20-1%20170%20-18z'/%3e%3c/g%3e%3c/svg%3e",buttonIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M790%201280%20l0%20-420%2065%200%2065%200%200%20420%200%20420%20-65%200%20-65%200%200%20-420z'/%3e%3cpath%20d='M489%201612%20c-228%20-114%20-386%20-309%20-451%20-557%20-29%20-110%20-29%20-297%200%20-406%2081%20-301%20308%20-530%20607%20-610%20112%20-30%20307%20-30%20420%200%20294%2077%20529%20312%20606%20606%2029%20110%2030%20307%201%20416%20-67%20251%20-245%20462%20-477%20565%20l-55%2024%200%20-74%200%20-74%2072%20-42%20c280%20-167%20411%20-508%20313%20-817%20-35%20-110%20-88%20-196%20-175%20-283%20-87%20-87%20-172%20-139%20-285%20-177%20-70%20-23%20-96%20-27%20-210%20-27%20-114%200%20-140%204%20-210%2027%20-293%2097%20-495%20372%20-495%20673%200%2070%2025%20193%2055%20266%2054%20133%20182%20279%20299%20339%20l66%2034%200%2078%20c0%2042%20-1%2077%20-2%2077%20-2%200%20-37%20-18%20-79%20-38z'/%3e%3c/g%3e%3c/svg%3e",timerIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M818%201670%20c-24%20-15%20-31%20-77%20-23%20-221%208%20-141%2015%20-159%2064%20-159%2050%200%2060%2024%2063%20150%20l3%20115%2030%20-3%20c172%20-19%20366%20-132%20472%20-275%2094%20-129%20133%20-236%20140%20-392%206%20-142%20-12%20-230%20-73%20-355%20-82%20-165%20-236%20-296%20-419%20-357%20-71%20-24%20-95%20-27%20-215%20-27%20-118%200%20-145%203%20-212%2026%20-123%2041%20-204%2092%20-298%20187%20-68%2068%20-94%20103%20-127%20171%20-61%20125%20-76%20203%20-71%20352%206%20153%2036%20243%20122%20371%2064%2095%2068%20127%2021%20149%20-39%2017%20-68%202%20-113%20-59%20-94%20-127%20-150%20-285%20-159%20-449%20-23%20-399%20236%20-749%20632%20-855%20111%20-30%20297%20-30%20410%200%20449%20119%20716%20562%20610%201011%20-23%2095%20-105%20254%20-173%20336%20-111%20131%20-276%20234%20-442%20274%20-89%2021%20-213%2026%20-242%2010z'/%3e%3cpath%20d='M452%201258%20c-7%20-7%20-12%20-17%20-12%20-23%200%20-21%20330%20-469%20358%20-487%2043%20-28%20106%20-23%20143%2010%2043%2038%2052%20113%2020%20154%20-20%2025%20-454%20342%20-484%20354%20-7%202%20-18%20-1%20-25%20-8z'/%3e%3c/g%3e%3c/svg%3e",owIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='110.000000pt'%20height='52.000000pt'%20viewBox='0%200%20110.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M171%20500%20c-50%20-12%20-83%20-41%20-111%20-96%20-22%20-43%20-25%20-62%20-24%20-149%200%20-141%2027%20-199%20109%20-236%2073%20-33%20180%20-16%20227%2037%2067%2076%2074%20284%2013%20376%20-39%2059%20-133%2089%20-214%2068z%20m119%20-65%20c50%20-26%2065%20-67%2065%20-180%200%20-146%20-32%20-195%20-128%20-195%20-40%200%20-54%205%20-77%2028%20-16%2016%20-34%2049%20-40%2073%20-16%2056%20-7%20186%2014%20227%2030%2057%20105%2078%20166%2047z'/%3e%3cpath%20d='M482%20483%20c3%20-10%2029%20-120%2058%20-245%20l54%20-228%2038%200%20c43%200%2035%20-20%2089%20215%2017%2077%2035%20146%2038%20152%204%207%2026%20-73%2051%20-178%20l44%20-190%2039%203%2040%203%2058%20240%20c32%20132%2058%20241%2059%20243%200%202%20-15%202%20-32%200%20l-32%20-3%20-43%20-180%20c-23%20-99%20-44%20-187%20-46%20-195%20-2%20-8%20-25%2074%20-51%20183%20l-48%20198%20-36%20-3%20-36%20-3%20-45%20-194%20c-25%20-106%20-47%20-188%20-49%20-181%20-3%207%20-23%2095%20-46%20194%20l-42%20181%20-33%203%20c-28%203%20-33%201%20-29%20-15z'/%3e%3c/g%3e%3c/svg%3e",encoderIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='34.000000pt'%20height='52.000000pt'%20viewBox='0%200%2034.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M30%20255%20l0%20-245%20150%200%20150%200%200%2030%200%2030%20-115%200%20-115%200%200%2085%200%2085%2095%200%2095%200%200%2030%200%2030%20-95%200%20-95%200%200%2070%200%2070%20115%200%20115%200%200%2030%200%2030%20-150%200%20-150%200%200%20-245z'/%3e%3c/g%3e%3c/svg%3e",Icons={switchIcon:$=>Et`
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
    </svg>`},tipColors={green:"bg-green-100 text-green-900 ring-green-300",yellow:"bg-yellow-100 text-yellow-900 ring-yellow-300"};function Button({title:$,onclick:_,disabled:k,cls:dt,icon:ct,ref:st,colors:pt,hovercolor:Yt,disabledcolor:$t}){const[ee,se]=ut(!1),ht=function(Zt){const oe=_?_():null;oe&&typeof oe.catch=="function"&&(se(!0),oe.catch(()=>!1).then(()=>se(!1)))};return pt||(pt="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400"),Et` <button
    type="button"
    class="inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${pt} ${dt}"
    ref=${st}
    onclick=${ht}
    disabled=${k||ee}
  >
    ${$}
    <${ee?Icons.refresh:ct} class="w-4 ${ee?"animate-spin":""}" />
  <//>`}function Login({loginFn:$,logoIcon:_,title:k,tipText:dt}){const[ct,st]=ut(""),[pt,Yt]=ut(""),$t=function(ee){const ht={Authorization:"Basic "+btoa(ct+":"+pt)};return fetch("api/login",{headers:ht}).then($).finally(Zt=>Yt(""))};return Et` <div
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
          oninput=${ee=>Yt(ee.target.value)}
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
  </svg>`;function Header({logout:$,user:_,setShowSidebar:k,showSidebar:dt}){const[ct,st]=ut(new Date),[pt,Yt]=ut(null),$t=(Zt,oe)=>new Date(Zt.year+1900,Zt.mon,Zt.mday,Zt.hour,Zt.min,Zt.sec),ee=async()=>{try{const oe=await(await fetch("/api/stm32-time")).text();let ce;try{ce=JSON.parse(oe)}catch{return}ce.status&&ce.time?Yt($t(ce.time,ce.timezone)):Yt(null)}catch{Yt(null)}};lt(()=>{const Zt=setInterval(()=>st(new Date),1e3),oe=setInterval(ee,1e3);return ee(),()=>{clearInterval(Zt),clearInterval(oe)}},[]);const se=Zt=>Zt.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric"}),ht=Zt=>Zt.toLocaleTimeString("ru-RU");return Et`
    <div
      class="bg-white/40 backdrop-blur-md border-b border-white/40 shadow-sm sticky top-0 z-[48] w-full py-2 ${dt?"pl-72":""} transition-all duration-300 transform"
    >
      <div class="px-4 w-full py-0 my-0 flex items-center justify-between">
        <button
          type="button"
          onclick=${()=>k(Zt=>!Zt)}
          class="text-slate-500 hover:text-teal-500 transition-colors"
        >
          <${Icons.bars3} class="h-6" />
        </button>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600">
            Дата: ${se(ct)}<span style="margin-left: 8px;"></span
            >Время: ${ht(ct)}
          </span>
        </div>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600"
            >STM32 дата:
            ${pt?se(pt):" 00.00.0000"}<span
              style="margin-left: 8px;"
            ></span
            >Время: ${pt?ht(pt):"00:00"}
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
  `}function Sidebar({url:$,show:_}){const k=({title:dt,icon:ct,href:st,url:pt})=>Et`
  <div>
    <a href="#${st}" class="${st==pt?"bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-md group":"text-slate-600 hover:bg-slate-200/60 hover:text-slate-800 group"} flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
      <${ct} class="w-6 h-6"/>
      ${dt}
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
  <//>`}function Chart({data:$}){const _=$.length,k=20,dt=15,ct=100,st=5,pt=10,Yt=25,$t=Zt=>(ct-pt)/st*(Zt+1),ee=Zt=>(ct-pt)*Zt/100,se=Zt=>ct-pt-ee(Zt),ht=(Zt,oe,ce)=>Array.from({length:oe},(be,me)=>me*1+Zt);return Et` <div
    class="my-4 divide-y divide-gray-200 overflow-auto rounded bg-white"
  >
    <div class="font-light uppercase flex items-center text-gray-600 px-4 py-2">
      Temperature, last 24h
    <//>
    <div class="relative">
      <svg class="bg-yellow-x50 w-full p-4" viewBox="0 0 ${_*k+dt} ${ct}">
        ${ht(0,st).map(Zt=>Et`
            <line
              x1="0"
              y1=${$t(Zt)}
              x2=${dt+_*k}
              y2=${$t(Zt)}
              stroke-width="0.3"
              class="stroke-slate-300"
              stroke-dasharray="1,1"
            />
            <text x="0" y=${$t(Zt)-2} class="text-[6px] fill-slate-400"
              >${Yt-Yt/st*(Zt+1)}<//
            >
          `)}
        ${ht(0,_).map(Zt=>Et`
            <rect
              x=${dt+Zt*k}
              y=${se($[Zt]*100/Yt)}
              width="12"
              height=${ee($[Zt]*100/Yt)}
              rx="2"
              class="fill-cyan-500"
            />
            <text x=${dt+Zt*k} y="100" class="text-[6px] fill-slate-400"
              >${Zt*2}:00<//
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
    <div class="flex items-center gap-3">
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          class="sr-only peer"
          checked=${$}
          onChange=${dt=>{_(dt.target.checked?1:0)}}
        />
        <div class="w-[42px] h-[22px] bg-slate-200/80 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300/50 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-400 peer-checked:to-cyan-500 shadow-inner"></div>
      </label>
      <span class="text-sm font-medium text-slate-600 w-8">${$?"On":"Off"}</span>
    </div>
  `;function TabSelect({}){const[$,_]=ut(null),[k,dt]=ut({}),[ct,st]=ut(null),[pt,Yt]=ut(!1),[$t,ee]=ut(3),[se,ht]=ut(!1),[Zt,oe]=ut("ru"),ce=ie=>{ht(ie)},be=ie=>se&&(ie===1||ie===35),me=()=>fetch("api/select/get").then(ie=>ie.json()).then(ie=>{const Ie=ie.data||ie;_(Ie),ht(ie.sim800l===1);const Se={};Ie.forEach(Te=>{Se[`topin_${Te.id}`]=Te.topin.toString()}),dt(Se)});lt(me,[]),lt(()=>{let ie;return pt&&$t>0?ie=setTimeout(()=>{ee($t-1)},1e3):$t===0&&(Yt(!1),st(null)),()=>clearTimeout(ie)},[pt,$t]);const ue=async ie=>{ie.preventDefault();const Ie=new FormData(ie.target),Se={lang:Zt,sim800l:se?1:0,data:[]};$.forEach(Te=>{const Ee=Ie.get(`topin_${Te.id}`);Se.data.push({id:Te.id,pins:Te.pins,topin:parseInt(Ee),pwm:Te.pwm,i2cdata:Te.i2cdata,i2cclok:Te.i2cclok})}),st("submitting"),Yt(!0),ee(3);try{const Te=await fetch("api/select/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Se)});if(!Te.ok)throw new Error("Network response was not ok");const Ee=await Te.json();st("success"),console.log("Success:",Ee);const le={};Se.data.forEach(pe=>{le[`topin_${pe.id}`]=pe.topin.toString()}),dt(pe=>({...pe,...le})),me()}catch(Te){st("error"),console.error("Error:",Te)}},ge=ie=>{const{name:Ie,value:Se}=ie.target;dt(Te=>({...Te,[Ie]:Se}))};if(!$)return"";const ve=({id:ie,value:Ie,label:Se,disabled:Te=!1,onChange:Ee,checked:le})=>Et`
    <div class="relative">
      <input
        id="${ie}_${Ie}"
        class="sr-only peer"
        type="radio"
        name="topin_${ie}"
        value="${Ie}"
        checked=${le}
        onChange=${Ee}
        disabled=${Te}
        aria-label="${Se}"
      />
      <label
        for="${ie}_${Ie}"
        class="cursor-pointer px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300 
               ${Te?"text-gray-400 cursor-not-allowed opacity-60":"text-slate-700 hover:bg-black/5"}
               peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-cyan-500 peer-checked:text-white peer-checked:shadow-sm"
      >
        ${Se}
      </label>
    </div>
  `,_e=({d:ie})=>Et`
  <tr class="${be(ie.id)?"bg-red-200/50 opacity-50 pointer-events-none":ie.id%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
    <td class="px-6 py-2 text-sm text-slate-800">${ie.id}</td>
    <td class="px-6 py-2 text-sm text-slate-800 font-medium">${ie.pins}</td>
    <td class="px-2 py-2">
      <div class="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
        <${ve} id=${ie.id} value="0"  label="NONE"     checked=${k[`topin_${ie.id}`]==="0"}  onChange=${ge} />
        <${ve} id=${ie.id} value="3"  label="SWITCH"   checked=${k[`topin_${ie.id}`]==="3"}  onChange=${ge} />
        <${ve} id=${ie.id} value="1"  label="BUTTON"   checked=${k[`topin_${ie.id}`]==="1"}  onChange=${ge} />
        <${ve} id=${ie.id} value="2"  label="DEVICE"   checked=${k[`topin_${ie.id}`]==="2"}  onChange=${ge} />
        <${ve} id=${ie.id} value="4"  label="1-WIRE"   checked=${k[`topin_${ie.id}`]==="4"}  onChange=${ge} />
        <${ve} id=${ie.id} value="5"  label="PWM"      disabled=${ie.pwm==0} checked=${k[`topin_${ie.id}`]==="5"}  onChange=${ge} />
        <${ve} id=${ie.id} value="8"  label="Enc.OutA" checked=${k[`topin_${ie.id}`]==="8"}  onChange=${ge} />
        <${ve} id=${ie.id} value="9"  label="Enc.OutB" checked=${k[`topin_${ie.id}`]==="9"}  onChange=${ge} />
        <${ve} id=${ie.id} value="10" label="Security" disabled=${ie.monitoring==0} checked=${k[`topin_${ie.id}`]==="10"} onChange=${ge} />
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
              <span class="text-slate-600 font-bold uppercase tracking-widest text-2xl drop-shadow-sm">SIMBOOL</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  checked=${se}
                  onChange=${ie=>ce(ie.target.checked)}
                />
                <div class="w-[42px] h-[22px] bg-slate-200/80 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300/50 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-400 peer-checked:to-cyan-500 shadow-inner"></div>
              </label>
            </div>
          </div>

          ${ct==="success"&&Et`
            <div class="mb-6 bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
              <strong class="font-bold">Успех! </strong>
              <span class="block sm:inline">Данные успешно сохранены. Идет запись на USB флешку. Кнопка станет активной через ${$t} секунд.</span>
            </div>
          `}
          ${ct==="error"&&Et`
            <div class="mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm" role="alert">
              <strong class="font-bold">Ошибка!</strong>
              <span class="block sm:inline">Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз через ${$t} секунд.</span>
            </div>
          `}

          <div class="rounded-2xl overflow-hidden bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr class="bg-teal-600/10 border-b border-teal-600/20">
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">ID</th>
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide">Pin</th>
                    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide text-center">Type(s) of pin(s)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/40">
                  ${$&&$.map(ie=>y(_e,{d:ie}))}
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
  `}function ModalSwitch({modalType:$,page:_,hideModal:k,closeOnOverlayClick:dt=!0,title:ct,selectedSwitch:st,onSwitchChange:pt,connectionOptions:Yt,SliderComponent:$t=MyPolzunok}){const[ee,se]=ut((st==null?void 0:st.info)||""),[ht,Zt]=ut((st==null?void 0:st.onoff)||0),[oe,ce]=ut((st==null?void 0:st.ptype)||0),[be,me]=ut((st==null?void 0:st.setrpins)||""),[ue,ge]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(pe=>{if(!pe.ok)throw new Error(`HTTP error! status: ${pe.status}`);return pe.json()}).then(pe=>{if(!pe||!pe.data||!Array.isArray(pe.data)){console.error("Invalid data format:",pe),ge([]);return}const $e=pe.data.filter(we=>we.topin===2);ge($e)}).catch(pe=>{console.error("Error fetching pin config:",pe),ge([])})},[]);const ve=pe=>{pe.preventDefault();const $e=new FormData(pe.target),we=Object.fromEntries($e);if(we.id=st.id,we.pins=st.pins,$==="edit")we.onoff=ht;else if($==="connection"){const xe=ue.find(te=>te.pins===we.setrpins);xe&&(we.pinact={...st.pinact,[xe.id]:xe.pins})}fetch("/api/switch/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(we)}).then(xe=>xe.json()).then(xe=>{console.log("Success:",xe),pt({...st,...we}),k(),window.location.href="/#/switch"}).catch(xe=>{console.error("Error:",xe)})},_e=pe=>{me(pe.target.value)},ie=pe=>{ce(parseInt(pe.target.value))},Ie=pe=>{se(pe.target.value)},Se=pe=>{Zt(pe)},Te=pe=>{dt&&pe.target===pe.currentTarget&&k()},Ee=()=>{ce(0),se(""),Zt(0)};return Et`
    <div
      class="fixed inset-0 z-50 bg-black bg-opacity-50"
      style="margin-top: 7px;"
      onclick=${Te}
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
                        value=${be}
                        onchange=${_e}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select a connection</option>
                        ${ue.map(pe=>Et`
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
                        value=${oe}
                        onchange=${ie}
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
                        oninput=${Ie}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${$t}
                        value=${ht}
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
                onclick=${Ee}
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
  `}function TabSwitch({}){const[$,_]=ut(null),[k,dt]=ut(null),[ct,st]=ut(!1),[pt,Yt]=ut(null),[$t,ee]=ut(null),[se,ht]=ut(!1),[Zt,oe]=ut("ru"),[ce,be]=ut(null),[me,ue]=ut([]),[ge,ve]=ut(""),[_e,ie]=ut(!1),Ie=()=>Promise.all([fetch("/api/switch/get").then(Xt=>Xt.json()),fetch("/api/pintopin/get").then(Xt=>Xt.json())]).then(([Xt,re])=>{oe(Xt.lang),be(Xt.switches),_(Xt),ue(re),ve(`Pintopin data: ${JSON.stringify(re,null,2)}

Switch data: ${JSON.stringify(Xt.switches,null,2)}`),console.log("Pintopin data:",re),console.log("Switch data:",Xt.switches)}).catch(Xt=>{console.error("Error fetching data:",Xt),ve(`Error fetching data: ${Xt.message}`)}),Se=()=>{fetch("/api/switch/get").then(Xt=>Xt.json()).then(Xt=>{be(Xt.switches),oe(Xt.lang),console.log("Updated switch data:",Xt.switches)}).catch(Xt=>{console.error("Error fetching switch data:",Xt)})},Te=()=>{fetch("/api/pintopin/get").then(Xt=>Xt.json()).then(Xt=>{ue(Xt),console.log("Updated pintopin data:",Xt)}).catch(Xt=>{console.error("Error fetching pintopin data:",Xt)})};lt(()=>{Se(),Te();const Xt=setInterval(()=>{Se(),Te()},1e3);return()=>clearInterval(Xt)},[]);const Ee=Xt=>{const re=new Map,he=ce.find(de=>de.id===Xt);return he&&he.pinact&&Object.entries(he.pinact).forEach(([de,vt])=>{re.set(de,{pin:de,relayId:vt})}),me.forEach(de=>{if(de.idin===Xt){const vt=`${de.pins}(${de.idout})`;re.has(vt)||re.set(vt,{pin:de.pins,relayId:de.idout})}}),Array.from(re.values())},le=()=>Zt==="ru"?ruLangswitch:enLangswitch,pe=(Xt,re)=>{const vt=(le()[re]||"").split(" "),fe=[];let ae="";for(let ke=0;ke<vt.length;ke++){const Oe=vt[ke];ae.length+Oe.length+1<=200?ae+=(ae.length>0?" ":"")+Oe:(ae.length>0&&fe.push(ae),ae=Oe)}return ae.length>0&&fe.push(ae),fe.join("<br>")},$e=(Xt,re)=>{console.log("Удаление соединения:",Xt,re);const[he,de]=re.split("("),vt=de?parseInt(de):null;fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:Xt,pin:he.trim()})}).then(fe=>fe.json()).then(fe=>{dt(fe),be(ae=>ae.map(ke=>{if(ke.id===Xt){const Oe={...ke.pinact};return delete Oe[he.trim()],{...ke,pinact:Oe}}return ke})),ue(ae=>ae.filter(ke=>!(ke.idin===Xt&&ke.pins===he.trim()&&(vt===null||ke.idout===vt))))}).then(()=>{console.log("Соединение удалено успешно"),Ie()}).catch(fe=>{console.error("Ошибка при удалении соединения:",fe)})},we=(Xt,re)=>{Yt(Xt),ee(re),st(!0)},xe=()=>{st(!1),Yt(null),ee(null)},te=Xt=>{console.log("handleSwitchChange:",Xt),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:Xt.id,onoff:Xt.onoff})}).then(re=>re.json()).then(re=>{console.log("Response from /api/onoff/set:",re)}).catch(re=>{console.error("Error calling /api/onoff/set:",re)}),xe()},ye={ru:Et`
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
    `},mt=Xt=>Et`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide relative group">
      ${Xt.title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-xl border border-slate-200 text-left text-sm font-normal text-slate-600"
        style="width: 400px; left: 50%; transform: translateX(-50%); top: 100%;"
        dangerouslySetInnerHTML=${{__html:pe("langbutton",Xt.tooltipIndex)}}
      ></div>
    </th>
  `,ne=({d:Xt,index:re})=>{const he=Ee(Xt.id);return Et`
      <tr class="${re%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${Xt.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${Xt.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][Xt.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono">
          ${he.map(({pin:de,relayId:vt})=>Et`
              <span class="mr-2 inline-flex items-center">
                ${de}${vt!==void 0?`(${vt})`:""}
                <button
                  onClick=${fe=>{fe.preventDefault(),$e(Xt.id,`${de}(${vt})`)}}
                  class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                  title="Remove connection"
                >
                  [x]
                </button>
              </span>
            `)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${Xt.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${Xt.onoff}
            onChange=${de=>te({...Xt,onoff:de})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>we("connection",Xt)}
            class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
          >
            Connection
          </button>
          <span class="text-slate-300">|</span>
          <button
            onClick=${()=>we("edit",Xt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors ml-2"
          >
            Edit
          </button>
        </td>
      </tr>
    `};return ce?Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative overflow-hidden flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Switch(es) pin(s)
        </div>

        <div class="flex-grow flex flex-col justify-center items-center w-full">
          <div class="w-full">
            <div class="rounded-2xl overflow-hidden bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6">
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
                  <tbody id="tab1" class="divide-y divide-white/40">
                    ${ce.map((Xt,re)=>Et`<${ne} d=${Xt} index=${re} key=${Xt.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>ht(!se)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${se?"Hide Help":"Show Help"}
              </button>
            </div>

            ${se&&Et`
              <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                ${ye[Zt]}
              </div>
            `}
          </div>
        </div>

        ${ct&&Et`
          <${ModalSwitch}
            modalType=${pt}
            page="TabSwitch"
            hideModal=${xe}
            title=${pt==="connection"?"Edit Connection":"Edit switch"}
            selectedSwitch=${$t}
            onSwitchChange=${te}
          />
        `}
      </div>
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
  `},TabButton=()=>{const[$,_]=ut(null),[k,dt]=ut([]),[ct,st]=ut(null),[pt,Yt]=ut(null),[$t,ee]=ut(!1),[se,ht]=ut(null),[Zt,oe]=ut(null),[ce,be]=ut(!1),[me,ue]=ut("ru"),[ge,ve]=ut(""),[_e,ie]=ut(!0),Ie={ru:Et`
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
    `},Se=()=>{fetch("/api/button/get").then(mt=>mt.json()).then(mt=>{st(mt.buttons),ue(mt.lang),console.log("Updated button data:",mt.buttons)}).catch(mt=>{console.error("Error fetching button data:",mt)})};lt(()=>{Se();let mt;return _e&&(mt=setInterval(()=>{Se()},1e3)),()=>{mt&&clearInterval(mt)}},[_e]);const Te=mt=>{const ne=new Map,Xt=ct.find(re=>re.id===mt);return Xt&&Xt.pinact&&Object.entries(Xt.pinact).forEach(([re,he])=>{ne.set(re,{pin:re,relayId:he})}),k.forEach(re=>{if(re.idin===mt){const he=`${re.pins}(${re.idout})`;ne.has(he)||ne.set(he,{pin:re.pins,relayId:re.idout})}}),Array.from(ne.values())},Ee=()=>({langbutton:me==="ru"?rulangbutton:enlangbutton}),le=(mt,ne)=>{const Xt=Ee(),re=Xt[mt]&&Xt[mt][ne]?Xt[mt][ne]:"";return pe(re)},pe=(mt,ne=100)=>{if(!mt||typeof mt!="string")return"";const Xt=[];let re="";const he=mt.split(`
`);return he.forEach((de,vt)=>{de.split(" ").filter(ae=>ae.length>0).forEach((ae,ke)=>{const Oe=re.length===0?ae:" "+ae;re.length+Oe.length<=ne?re+=Oe:(re.length>0&&Xt.push(re),re=ae)}),re.length>0&&(Xt.push(re),re=""),vt<he.length-1&&Xt.push("")}),re.length>0&&Xt.push(re),Xt.join(`
`)},$e=(mt,ne)=>{ht(mt),oe(ne),ee(!0),ie(!1)},we=()=>{ee(!1),ht(null),oe(null),ie(!0)},xe=mt=>{console.log("handleButtonChange:",mt),st(ne=>ne.map(Xt=>Xt.id===mt.id?{...Xt,...mt}:Xt)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:mt.id,onoff:mt.onoff})}).then(ne=>ne.json()).then(ne=>{console.log("Response from /api/onoff/set:",ne)}).catch(ne=>{console.error("Error calling /api/onoff/set:",ne)}),we()},te=mt=>Et`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide relative group" style="white-space: pre-line;">
      ${mt.title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-xl border border-slate-200 text-left text-sm font-normal text-slate-600"
        style="min-width: 200px; max-width: 300px; white-space: pre-wrap; left: 50%; transform: translateX(-50%); top: 100%;"
      >
        ${le("langbutton",mt.tooltipIndex)}
      </div>
    </th>
  `,ye=({d:mt,index:ne})=>(Te(mt.id),Et`
      <tr class="${ne%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${mt.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${mt.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][mt.ptype]}
        </td>

        <td
          class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis"
        >
          ${pe(mt.sclick)}
        </td>
        <td
          class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis"
        >
          ${pe(mt.dclick)}
        </td>
        <td
          class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis"
        >
          ${pe(mt.lpress)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${mt.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${mt.onoff}
            onChange=${Xt=>xe({...mt,onoff:Xt})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>$e("edit",mt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors ml-2"
          >
            Edit
          </button>
        </td>
      </tr>
    `);return ct?Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative overflow-hidden flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Button(s) pin(s)
        </div>

        <div class="flex-grow flex flex-col justify-center items-center w-full">
          <div class="w-full">
            <div class="rounded-2xl overflow-hidden bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6">
              <div class="overflow-x-auto w-full">
                <table
                  class="w-full text-left border-collapse whitespace-nowrap"
                >
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${te} title="ID" tooltipIndex=${1} />
                      <${te} title="Pin" tooltipIndex=${2} />
                      <${te} title="Pullup type" tooltipIndex=${3} />
                      <${te} title="SINGLE CLICK" tooltipIndex=${4} />
                      <${te} title="DOUBLE CLICK" tooltipIndex=${5} />
                      <${te} title="LONG PRESS" tooltipIndex=${6} />
                      <${te} title="INFO" tooltipIndex=${7} />
                      <${te} title="On/Off" tooltipIndex=${8} />
                      <${te} title="Action" tooltipIndex=${9} />
                    </tr>
                  </thead>
                  <tbody id="tab1" class="divide-y divide-white/40">
                    ${ct.map((mt,ne)=>Et`
                        <${ye} d=${mt} index=${ne} key=${mt.id} />
                      `)}
                  </tbody>
                </table>
              </div>
            </div>
            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>be(!ce)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${ce?"Hide Help":"Show Help"}
              </button>
            </div>

            ${ce&&Et`
              <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                ${Ie[me]}
              </div>
            `}
          </div>
        </div>
        ${$t&&Et`
          <${ModalButton}
            modalType=${se}
            page="TabButton"
            hideModal=${we}
            title=${se==="connection"?"Edit Connection":"Edit Button pin"}
            selectedButton=${Zt}
            onButtonChange=${xe}
          />
        `}
      </div>
    </div>
  `:""};function ModalEncoder({modalType:$,page:_,hideModal:k,closeOnOverlayClick:dt=!0,title:ct,selectedEncoder:st,handleEncoderChange:pt,connectionOptions:Yt,SliderComponent:$t=MyPolzunok}){const[ee,se]=ut((st==null?void 0:st.info)||""),[ht,Zt]=ut((st==null?void 0:st.onoff)===1),[oe,ce]=ut({pin:(st==null?void 0:st.encdrbpin)||"",id:(st==null?void 0:st.encoderb)||""}),[be,me]=ut(Object.entries(st.pinact||{})[0]||["",""]),[ue,ge]=ut([]),[ve,_e]=ut([]),[ie,Ie]=ut([]),[Se,Te]=ut(st.dvalue||0),[Ee,le]=ut(st.ponr||0),[pe,$e]=ut(st.pwm||1e7);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(de=>{if(!de.ok)throw new Error(`HTTP error! status: ${de.status}`);return de.json()}).then(de=>{if(!de||!de.data||!Array.isArray(de.data)){console.error("Invalid data format:",de),ge([]),_e([]),Ie([]);return}const vt=de.data.filter(ke=>ke.topin===2),fe=de.data.filter(ke=>ke.topin===9),ae=de.data.filter(ke=>ke.topin===5);if(ge(vt),_e(fe),Ie(ae),st.encoderb){const ke=fe.find(Oe=>Oe.pins===st.encoderb);ce({pin:st.encoderb,id:ke?ke.id:""})}}).catch(de=>{console.error("Error fetching pin config:",de),ge([]),_e([]),Ie([])})},[st]);const we=de=>{if(de.preventDefault(),de.target instanceof HTMLFormElement){let fe={};$==="edit"?fe={topin:8,id:st.id,pins:st.pins,pwm:parseInt(pe),dvalue:parseInt(Se),ponr:parseInt(Ee),info:ee,onoff:ht?1:0}:$==="connection"&&(fe={id:st.id,pins:st.pins,encoderb:parseInt(oe.id),encdrbpin:oe.pin,pinact:{[be[0]]:parseInt(be[1])}}),console.log("We got a encoder JSON:",JSON.stringify(fe)),fetch("/api/encoder/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(fe)}).then(ae=>ae.json()).then(ae=>{pt({...st,...fe}),k()}).catch(ae=>{console.error("Error:",ae)})}else console.error("Form element not found")},xe=de=>{se(de.target.value)},te=de=>{Zt(de)},ye=de=>{const vt=ve.find(fe=>fe.pins===de.target.value);ce({pin:de.target.value,id:vt?vt.id:""})},mt=de=>{const[vt,fe]=de.target.value.split("|");me([vt,fe])},ne=de=>{Te(de.target.value)},Xt=de=>{le(de.target.value)},re=de=>{const vt=de/1e3;return vt<=4e4?{cls:"text-green-600",msg:"Optimal range"}:vt<=2e5?{cls:"text-yellow-600",msg:"Precision might drop"}:{cls:"text-red-600",msg:"Expert mode: low precision"}};return Et`
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
          <form onsubmit=${we}>
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
                        value=${oe.pin}
                        onchange=${ye}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select Encoder B</option>
                        ${ve.map(de=>Et`
                            <option value=${de.pins}>
                              ${de.pins} (ID: ${de.id})
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
                        value=${`${be[0]}|${be[1]}`}
                        onchange=${mt}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select PWM connection</option>
                        ${ie.map(de=>Et`
                            <option value=${`${de.pins}|${de.id}`}>
                              ${de.pins} (ID: ${de.id})
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
          <form onsubmit=${we}>
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
                        value=${pe}
                        oninput=${de=>$e(de.target.value)} 
                        class="border rounded p-2 w-full font-mono" 
                        placeholder="50 - 2000000000"
                      />
                      <div class="text-xs ${re(pe).cls}">
                        ${re(pe).msg}
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
                        value=${Se}
                        oninput=${ne}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Duty on restore</td>
                    <td class="p-2">
                      <select
                        value=${Ee}
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
                        value=${ee}
                        oninput=${xe}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${$t}
                        value=${ht}
                        onChange=${te}
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
  `}function TabEncoder({}){{const[$,_]=ut(null),[k,dt]=ut(null),[ct,st]=ut(!1),[pt,Yt]=ut(null),[$t,ee]=ut(null),[se,ht]=ut(!1),[Zt,oe]=ut("ru"),[ce,be]=ut([]),me=at(!1),ue=()=>Promise.all([fetch("/api/encoder/get").then(mt=>mt.json()),fetch("/api/pintopin/get").then(mt=>mt.json())]).then(([mt,ne])=>{oe(mt.lang),_(mt.encoders),be(ne),console.log("Encoder data:",mt.encoders),console.log("Pintopin data:",ne)}).catch(mt=>{console.error("Error fetching data:",mt)}),ge=()=>{fetch("/api/encoder/get").then(mt=>mt.json()).then(mt=>{if(me.current){console.log("Polling skip: onoff request in flight");return}_(mt.encoders),oe(mt.lang),console.log("Updated encoder data:",mt.encoders)}).catch(mt=>{console.error("Error fetching encoder data:",mt)})},ve=()=>{fetch("/api/pintopin/get").then(mt=>mt.json()).then(mt=>{be(mt),console.log("Updated pintopin data:",mt)}).catch(mt=>{console.error("Error fetching pintopin data:",mt)})};lt(()=>{ge(),ve();const mt=setInterval(()=>{ge(),ve()},500);return()=>clearInterval(mt)},[]);const _e=mt=>{_(ne=>ne.map(Xt=>Xt.id===mt.id?mt:Xt)),me.current=!0,fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:mt.id,onoff:mt.onoff})}).then(ne=>ne.json()).then(ne=>{console.log("Response from /api/onoff/set (Encoder):",ne)}).catch(ne=>{console.error("Error calling /api/onoff/set (Encoder):",ne)}).finally(()=>{me.current=!1})},ie=mt=>{const ne=$.find(re=>re.id===mt),Xt=[];return ne&&ne.pinact&&Object.entries(ne.pinact).forEach(([re,he])=>{Xt.push({pin:re,idout:he})}),Xt},Ie=mt=>{const ne=mt/1e3;return ne<=4e4?{cls:"text-green-600",msg:"✓"}:ne<=2e5?{cls:"text-yellow-600",msg:"~"}:{cls:"text-red-600",msg:"!"}},Se=mt=>{if(!mt)return"—";const ne=mt/1e3;return ne>=1e6?`${(ne/1e6).toFixed(2)} MHz`:ne>=1e3?`${(ne/1e3).toFixed(1)} kHz`:`${ne} Hz`},Te=()=>({langbutton:Zt==="ru"?ruencoder:enencoder}),Ee=(mt,ne)=>{const Xt=Te(),re=Xt[mt]&&Xt[mt][ne]?Xt[mt][ne]:"";return le(re)},le=(mt,ne=50)=>{if(!mt||typeof mt!="string")return"";const Xt=mt.split(" ");let re=[],he="";for(let de=0;de<Xt.length;de++)he.length+Xt[de].length+1<=ne?he+=`${he?" ":""}${Xt[de]}`:(he&&re.push(he.trim()),he=Xt[de]);return he&&re.push(he.trim()),re.join(`
`)},pe=(mt,ne)=>{console.log("Deleting connection:",mt,ne);const Xt=ne.split("(")[0].trim();fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:mt,pin:Xt})}).then(re=>re.ok?re.json():re.text().then(he=>{throw new Error(`HTTP error! status: ${re.status}, message: ${he}`)})).then(re=>{dt(re),_(he=>he.map(de=>{if(de.id===mt){const vt={...de.pinact};return delete vt[Xt],{...de,pinact:vt}}return de})),be(he=>he.filter(de=>!(de.idin===mt&&de.pins===Xt)))}).then(()=>{console.log("Connection deleted successfully"),ue()}).catch(re=>{console.error("Error deleting connection:",re)})},$e=(mt,ne)=>{console.log("Opening modal:",mt,ne),Yt(mt),ee(ne),st(!0)},we=()=>{st(!1),Yt(null),ee(null)},xe={ru:Et`
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
    `},te=({title:mt,tooltipIndex:ne})=>Et`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide relative group">
      ${mt}
      <div
        class="absolute z-50 invisible group-hover:visible bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-xl border border-slate-200 text-left text-sm font-normal text-slate-600 whitespace-normal break-words transform -translate-x-1/2 left-1/2 top-full mt-2"
        style="min-width: 200px; max-width: 400px;"
      >
        ${Ee("langbutton",ne)}
      </div>
    </th>
  `,ye=({d:mt,index:ne})=>{const Xt=ie(mt.id),re=Ie(mt.pwm||0);return Et`
      <tr class="${ne%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${mt.pins}(${mt.id})</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${mt.encdrbpin?`${mt.encdrbpin}(${mt.encoderb})`:"Not set"}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono">
          ${Xt.length>0?Xt.map(({pin:he,idout:de})=>Et`
                  <span class="mr-2 inline-flex items-center">
                    ${he}(${de})
                    <button
                      onClick=${vt=>{vt.preventDefault(),pe(mt.id,`${he}(${de})`)}}
                      class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                      title="Remove connection"
                    >
                      [x]
                    </button>
                  </span>
                `):"Not set"}
        </td>
        <td class="px-6 py-2 text-sm">
          <span class="font-mono text-slate-700">${Se(mt.pwm)}</span>
          <span class="ml-1 font-bold ${re.cls}">${re.msg}</span>
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
            onChange=${he=>_e({...mt,onoff:he})}
          />
        </td>
        <td class="px-6 py-2 text-sm whitespace-nowrap">
          <button
            onClick=${()=>$e("connection",mt)}
            class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
          >
            Connection
          </button>
          <span class="text-slate-300">|</span>
          <button
            onClick=${()=>$e("edit",mt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors ml-2"
          >
            Edit Encdr.
          </button>
        </td>
      </tr>
    `};return $?Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative overflow-hidden flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Encoder(s) pin(s)
        </div>
        <div class="flex-grow flex flex-col justify-center items-center w-full">
          <div class="w-full">
            <div class="rounded-2xl overflow-hidden bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${te} title="Encoder A (ID)" tooltipIndex=${3} />
                      <${te} title="Encoder B (ID)" tooltipIndex=${4} />
                      <${te} title="PWM connection" tooltipIndex=${5} />
                      <${te} title="PWM Frequency" tooltipIndex=${11} />
                      <${te} title="Resolution (steps)" tooltipIndex=${12} />
                      <${te} title="Dimmer value (0-100)" tooltipIndex=${6} />
                      <${te} title="Duty on restore" tooltipIndex=${7} />
                      <${te} title="INFO" tooltipIndex=${8} />
                      <${te} title="On/Off" tooltipIndex=${9} />
                      <${te} title="Action" tooltipIndex=${10} />
                    </tr>
                  </thead>
                  <tbody id="tab1" class="divide-y divide-white/40">
                    ${$.map((mt,ne)=>Et`<${ye} d=${mt} index=${ne} key=${mt.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>ht(!se)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${se?"Hide Help":"Show Help"}
              </button>
            </div>

            ${se&&Et`
              <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                ${xe[Zt]}
              </div>
            `}
          </div>
        </div>
        ${ct&&Et`
          <${ModalEncoder}
            modalType=${pt}
            page="TabEncoder"
            hideModal=${we}
            title=${pt==="connection"?"Edit Connection":"Edit Encoder"}
            selectedEncoder=${$t}
            handleEncoderChange=${_e}
          />
        `}
      </div>
    </div>
  `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">Loading...</div>`}}function ModalCron({modalType:$,page:_,hideModal:k,closeOnOverlayClick:dt=!0,title:ct,selectedCron:st,handleCronChange:pt,connectionOptions:Yt,modalClass:$t,SliderComponent:ee=MyPolzunok}){const[se,ht]=ut((st==null?void 0:st.info)||""),[Zt,oe]=ut((st==null?void 0:st.onoff)===1),[ce,be]=ut((st==null?void 0:st.activ)||""),[me,ue]=ut((st==null?void 0:st.cron)||""),[ge,ve]=ut(st.setrpins||""),_e=le=>{le.preventDefault();const pe=new FormData(le.target),$e=Object.fromEntries(pe);$e.id=st.id,$e.pins=st.pins,$==="edit"?($e.onoff=Zt?1:0,$e.info=se,$e.cron=me,$e.activ=ce):$==="connection"&&($e.setrpins=ge),console.log("Data being sent to server:"),console.log($e),console.log("Stringified data:"),console.log(JSON.stringify($e)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify($e)}).then(we=>we.json()).then(we=>{console.log("Success:",we),pt({...st,...$e}),k(),window.location.href="/#/cron"}).catch(we=>{console.error("Error:",we)})};lt(()=>{ht((st==null?void 0:st.info)||""),ve((st==null?void 0:st.setrpins)||""),oe((st==null?void 0:st.onoff)===1)},[st]);const ie=le=>{ue(le.target.value)},Ie=le=>{ht(le.target.value)},Se=le=>{oe(le)},Te=le=>{be(le.target.value)},Ee=()=>{if(_==="TabCron"&&$==="edit")return Et`
          <form onsubmit=${_e}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  ${[{label:"ID",value:st.id},{label:"Cron",value:Et`
                        <input
                          type="text"
                          value=${me}
                          onInput=${ie}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"Script",value:Et`
                        <input
                          type="text"
                          value=${ce}
                          onInput=${Te}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"INFO",value:Et`
                        <input
                          type="text"
                          value=${se}
                          onInput=${Ie}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"On/Off",value:Et`<${ee}
                        value=${Zt}
                        onChange=${Se}
                      />`}].map((le,pe)=>Et`
                      <tr
                        class="${pe%2===1?"bg-white":"bg-gray-200"}"
                      >
                        <td class="p-2 font-bold">${le.label}</td>
                        <td class="p-2">${le.value}</td>
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
    <div class=${`modal ${$t||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onclick=${le=>dt&&le.target===le.currentTarget&&k()}
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
            ${Ee()}
          </div>
        </div>
      </div>
    </div>
  `}function TabCron({}){const[$,_]=ut(null),[k,dt]=ut(null);at(null);const[ct,st]=ut(!1),[pt,Yt]=ut(null),[$t,ee]=ut(null),[se,ht]=ut("ru"),[Zt,oe]=ut(!1),[ce,be]=ut(1),[me,ue]=ut(0),ge=()=>fetch("/api/cron/get").then(te=>te.json()).then(te=>{console.log("API response:",te),te&&Array.isArray(te.timers)?(_(te.timers),ht(te.lang||"ru"),typeof te.numline=="number"&&(ue(te.numline),be(te.numline))):(console.error("Unexpected API response structure:",te),_([]))}).catch(te=>{console.error("Error fetching cron data:",te),_([])});lt(()=>{ge()},[]),lt(()=>{ve(me)},[me]);const ve=te=>{fetch("/api/numline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({numline:te})}).then(ye=>ye.json()).then(ye=>console.log("Numline sent to stm32:",ye)).catch(ye=>console.error("Error sending Crone line to stm32:",ye))},_e=()=>{if(ce<$.length){const te=ce+1;be(te),ue(te),ve(te)}},ie=()=>{if(ce>0){const te=ce-1;be(te),ue(te),ve(te)}},Ie={ru:Et`
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
    `};if($===null)return Et`<div>Loading...</div>`;const Se=()=>({langtimers:se==="ru"?rulangtimers:enlangtimers}),Te=(te,ye)=>{const mt=Se(),Xt=(mt[te]&&mt[te][ye]?mt[te][ye]:"").split(" "),re=[];for(let he=0;he<Xt.length;he+=15)re.push(Xt.slice(he,he+15).join(" "));return re.join("<br>")},Ee=(te,ye)=>{Yt(te),ee(ye),st(!0)},le=()=>{st(!1),Yt(null),ee(null)},pe=te=>{console.log("handleCronChange:",te),_($.map(ye=>ye.id===te.id?te:ye)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(te)}).then(ye=>ye.json()).then(ye=>{console.log("Cron job updated successfully:",ye)}).catch(ye=>{console.error("Error updating cron job:",ye)})},$e=()=>Array.isArray($t)?$t.flatMap(te=>te.pinact?Object.keys(te.pinact).map(ye=>({value:ye,label:ye})):[]):$t&&$t.pinact?Object.keys($t.pinact).map(te=>({value:te,label:te})):[],we=te=>Et`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide relative group">
      ${te.title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-xl border border-slate-200 text-left text-sm font-normal text-slate-600 whitespace-normal break-words transform -translate-x-1/2 left-1/2 top-full mt-2"
        style="width: fit-content; max-width: 80vw;"
      >
        ${Te("langtimers",te.tooltipIndex)}
      </div>
    </th>
  `,xe=({d:te,index:ye})=>Et`
    <tr class="${ye%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-4 text-sm text-slate-800 font-medium">${te.id}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider">${te.cron}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider">${te.activ}</td>
      <td class="px-6 py-4 text-sm text-slate-600">${te.info}</td>
      <td class="px-6 py-4">
        <${MyPolzunok}
          value=${te.onoff}
          onChange=${mt=>pe({...te,onoff:mt})}
        />
      </td>
      <td class="px-6 py-4 text-center">
        <button
          onclick=${()=>Ee("edit",te)}
          class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap"
        >
          Edit
        </button>
      </td>
    </tr>
  `;return Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative overflow-hidden flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="flex-grow flex flex-col justify-center items-center w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          Timer(s)
        </div>
        <div class="w-full mb-6 relative">
          ${$&&$.length>0?Et`
                <div class="rounded-2xl overflow-hidden bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6">
                  <div class="overflow-x-auto w-full">
                    <table class="w-full text-left border-collapse whitespace-nowrap">
                      <thead>
                        <tr class="bg-teal-600/10 border-b border-teal-600/20">
                          <${we} title="No" tooltipIndex=${1} />
                          <${we} title="Cron" tooltipIndex=${2} />
                          <${we} title="Script" tooltipIndex=${3} />
                          <${we} title="Info" tooltipIndex=${4} />
                          <${we} title="On/Off" tooltipIndex=${5} />
                          <${we} title="Action" tooltipIndex=${6} />
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-white/40">
                        ${$.slice(0,ce).map((te,ye)=>Et`<${xe} d=${te} index=${ye} key=${te.id} />`)}
                      </tbody>
                    </table>
                  </div>
                </div>
              `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No cron jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>oe(!Zt)}
          >
            ${Zt?"Hide Help":"Show Help"}
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
                  >
                    +
                  </button>
                `:null}
            ${ce>0?Et`
                  <button
                    class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                    onclick=${ie}
                    title="Remove Cron"
                  >
                    -
                  </button>
                `:null}
          </div>
        </div>
      </div>
      ${Zt&&Et`<div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">${Ie[se]}</div>`}
      ${ct&&Et`
        <${ModalCron}
          modalType=${pt}
          page="TabCron"
          hideModal=${le}
          title=${pt==="edit"?"Edit Timer(s)":"Edit Connection"}
          selectedCron=${$t}
          handleCronChange=${pe}
          connectionOptions=${$e()}
          modalClass="mt-24"
        />
      `}
    </div>
  `}function ModalOneWire({oneWire:$,onClose:_,onUpdate:k,refresh:dt,closeOnOverlayClick:ct=!0}){console.log("oneWire object:",$);const[st,pt]=ut({typsensor:$.typsensor,numdevices:$.numdevices}),[Yt,$t]=ut(!1),[ee,se]=ut($.onoff||0),ht=be=>{ct&&be.target.classList.contains("modal-overlay")&&_()},Zt=be=>{const{name:me,value:ue}=be.target;let ge={...st,[me]:parseInt(ue,10)};me==="typsensor"&&(ue==="0"?ge.numdevices=0:ue==="2"&&(ge.numdevices=1)),pt(ge)},oe=be=>{se(be)};return Et`
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
              disabled=${Yt}
            >
              Close
            </button>
          </div>
          <form onsubmit=${async be=>{be.preventDefault(),$t(!0);const me={id:$.id,pin:$.pin,typsensor:st.typsensor,numdevices:st.numdevices,onoff:ee};console.log("Sending data:",me);try{if(!(await fetch("api/onewire/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(me)})).ok)throw new Error("Network response was not ok");const ge={...$,...st,onoff:ee};k(ge),_()}catch(ue){console.error("Error updating OneWire:",ue)}finally{$t(!1)}}}>
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
                        onchange=${Zt}
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
                        value=${st.numdevices}
                        oninput=${st.typsensor===1?Zt:void 0}
                        class="border rounded p-2 w-full ${st.typsensor!==1?"bg-gray-100":""}"
                        min="0"
                        max="10"
                        readonly=${st.typsensor!==1}
                        disabled=${Yt}
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${MyPolzunok}
                        value=${ee}
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
    </div>
  `}const TabOneWire=()=>{const[$,_]=ut([]),[k,dt]=ut(null),[ct,st]=ut(!1),[pt,Yt]=ut(null),[$t,ee]=ut(null),[se,ht]=ut("ru"),[Zt,oe]=ut(null),ce=()=>{console.log("Calling initial refresh..."),fetch("/api/onewire/get").then(le=>le.json()).then(le=>{console.log("Initial data received:",le),ht(le.lang||"ru"),_(le.pins||[]),console.log("Initial OneWire state set:",le.pins),dt(null)}).catch(le=>{console.error("Error in refresh:",le),dt(le.message),_([])})},be=async()=>{try{const pe=await(await fetch("/api/temp/get")).json();_($e=>$e.map(we=>{if(!we.sensors||we.typsensor!==1&&we.typsensr!==1&&we.typsensor!==2&&we.typsensr!==2)return we;const xe=we.sensors.map(te=>{var ye,mt;if(we.typsensor===1||we.typsensr===1){const ne=(ye=pe.ds18b20)==null?void 0:ye.find(Xt=>Xt.addr===te.s_number);if(ne)return{...te,t:ne.temp}}else if(we.typsensor===2||we.typsensr===2){const ne=(mt=pe.dht22)==null?void 0:mt.find(Xt=>Xt.id===we.id);if(ne)return{...te,t:ne.temp,humidity:ne.humidity}}return te});return{...we,sensors:xe}}))}catch(le){console.error("Error in updateSensorData:",le)}};lt(()=>{console.log("Setting up initial data and interval..."),ce();const le=setInterval(be,1e3);return()=>{clearInterval(le)}},[]);const me=()=>{st(!1),Yt(null),ee(null)},ue=le=>{_(pe=>pe.map($e=>{var we;if($e.id===le.oneWireId){const xe=((we=$e.sensors)==null?void 0:we.map(te=>te.s_number===le.s_number?{...te,...le}:te))||[];return{...$e,sensors:xe}}return $e})),me()},ge=le=>{ee(le),st(!0)},ve=le=>{_(pe=>pe.map($e=>$e.id===le.id?{...$e,onoff:le.onoff}:$e))},_e=le=>{_(pe=>pe.map($e=>$e.id===le.id?le:$e)),me()};if(k)return Et`<div>Error fetching sensor data: ${k}</div>`;const ie=()=>({lang1Wire:se==="ru"?rulange1Wire:enlange1Wire}),Ie=(le,pe)=>{const $e=ie(),xe=($e[le]&&$e[le][pe]?$e[le][pe]:"").split(" "),te=[];for(let ye=0;ye<xe.length;ye+=15)te.push(xe.slice(ye,ye+15).join(" "));return te.join("<br>")},Se=le=>Et`
    <th class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide relative group">
      ${le.title}
      <div
        class="absolute z-50 invisible group-hover:visible bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-xl border border-slate-200 text-left text-sm font-normal text-slate-600 whitespace-normal break-words transform -translate-x-1/2 left-1/2 top-full mt-2"
        style="width: fit-content; max-width: 80vw;"
      >
        ${Ie("lang1Wire",le.tooltipIndex)}
      </div>
    </th>
  `,Te=({device:le,index:pe})=>{const $e=le.pins||le.pin,we=le.typsensor||le.typsensr||0,xe=le.numdevices||le.numsens||0;return Et`
      <tr class="${pe%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${le.id}</td>
        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${$e}</td>
        <td class="px-6 py-4 text-sm text-slate-700 font-medium">${["None","DS18B20","DHT22"][we]}</td>
        <td class="px-6 py-4 text-sm text-slate-700 font-medium">${xe}</td>
        <td class="px-6 py-4">
          <${MyPolzunok}
            value=${le.onoff||0}
            onChange=${te=>ve({...le,onoff:te})}
          />
        </td>
        <td class="px-6 py-4">
          <button
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap"
            onclick=${()=>ge(le)}
          >
            Edit
          </button>
        </td>
      </tr>
      ${we!==0&&xe>0?Et`
            <tr class="bg-white/40">
              <td colspan="6" class="p-4 md:p-6">
                <div class="w-full">
                  <${Ee} d=${le} />
                </div>
              </td>
            </tr>
          `:""}
    `},Ee=({d:le})=>{const pe=le.typsensor||le.typsensr||0,$e=le.numdevices||le.numsens||0;if(pe===0||$e===0)return Et`
        <div class="px-4 py-2 text-slate-500 font-medium">
          No connected sensors for this OneWire pin.
        </div>
      `;let we=le.sensors||[];const xe=(te,ye)=>{const mt=pe===2;return Et`
        <div class="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/60 mb-4 transition-all hover:shadow-xl">
          <div
            class="font-extrabold text-xl text-slate-700 mb-4 flex justify-between items-center border-b border-slate-200/60 pb-3"
          >
            <span class="tracking-tight drop-shadow-sm">
              ${mt?"DHT22 Sensor":`DS18B20 Sensor (S/N: ${te.s_number})`}
            </span>
            <a
              href="#"
              class="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors uppercase tracking-wider bg-white/50 hover:bg-white/80 px-4 py-1.5 rounded-lg shadow-sm"
              onclick=${ne=>{ne.preventDefault(),Yt({...te,oneWireId:le.id,sensorType:pe,pins:le.pins||le.pin}),st(!0)}}
            >
              Edit
            </a>
          </div>
          <table class="w-full text-sm text-slate-700">
            <tbody>
              <tr class="hover:bg-slate-100/50 transition-colors rounded-lg">
                <td class="font-semibold py-2 px-2 text-slate-800">Current Temperature:</td>
                <td class="font-mono text-cyan-700 font-bold py-2 px-2 text-right">${te.t}°C</td>
              </tr>
              ${mt&&"humidity"in te?Et`
                    <tr class="hover:bg-slate-100/50 transition-colors rounded-lg">
                      <td class="font-semibold py-2 px-2 text-slate-800">Current Humidity:</td>
                      <td class="font-mono text-teal-700 font-bold py-2 px-2 text-right">${te.humidity}%</td>
                    </tr>
                  `:""}
              <tr class="hover:bg-slate-100/50 transition-colors rounded-lg border-t border-slate-100">
                <td class="font-medium py-2 px-2 text-slate-600">
                  Upper Temp. Limit = ${te.ut}°C
                </td>
                <td class="py-2 px-2 text-right">
                  <span class="px-2 py-1 bg-slate-200/70 rounded-md text-xs font-bold text-slate-600">Action: ${te.action_ut}</span>
                </td>
              </tr>
              <tr class="hover:bg-slate-100/50 transition-colors rounded-lg">
                <td class="font-medium py-2 px-2 text-slate-600">
                  Lower Temp. Limit = ${te.lt}°C
                </td>
                <td class="py-2 px-2 text-right">
                  <span class="px-2 py-1 bg-slate-200/70 rounded-md text-xs font-bold text-slate-600">Action: ${te.action_lt}</span>
                </td>
              </tr>
              ${mt&&"upphumid"in te?Et`
                    <tr class="hover:bg-slate-100/50 transition-colors rounded-lg border-t border-slate-100">
                      <td class="font-medium py-2 px-2 text-slate-600">
                        Upper Humidity Limit = ${te.upphumid}%
                      </td>
                      <td class="py-2 px-2 text-right">
                        <span class="px-2 py-1 bg-slate-200/70 rounded-md text-xs font-bold text-slate-600">Action: ${te.actuphum}</span>
                      </td>
                    </tr>
                    <tr class="hover:bg-slate-100/50 transition-colors rounded-lg">
                      <td class="font-medium py-2 px-2 text-slate-600">
                        Lower Humidity Limit = ${te.humlolim}%
                      </td>
                      <td class="py-2 px-2 text-right">
                        <span class="px-2 py-1 bg-slate-200/70 rounded-md text-xs font-bold text-slate-600">Action: ${te.actlowhum}</span>
                      </td>
                    </tr>
                  `:""}
              <tr class="hover:bg-slate-100/50 transition-colors rounded-lg border-t border-slate-200/60 mt-2">
                <td class="font-semibold py-3 px-2 text-slate-800">Info:</td>
                <td class="text-slate-600 py-3 px-2 text-right italic">${te.info}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `};return we.length>0&&Object.keys(we[0]).length>0?Et`<div class="space-y-4 w-full">${we.map((te,ye)=>xe(te))}</div>`:Et`
          <div class="px-4 py-4 text-slate-500 font-medium bg-white/50 backdrop-blur-sm rounded-xl border border-white/40 text-center">
            No sensor data available for this OneWire pin.
          </div>
        `};return Et`
    <div class="m-2 sm:m-4 lg:m-8 p-4 md:p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl relative overflow-hidden flex-grow flex flex-col justify-center items-center">
      <!-- Decorative background glow -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="flex-grow flex flex-col justify-center items-center w-full relative z-10">
        <div class="font-extrabold text-3xl md:text-4xl text-slate-800 mb-8 drop-shadow-sm tracking-tight uppercase">
          OneWire(s) pin(s)
        </div>
        <div class="justify-center w-full">
          <div class="mb-4">
            <div class="rounded-2xl overflow-hidden bg-white/50 backdrop-blur-xl border border-white/60 shadow-inner w-full mb-6">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr class="bg-teal-600/10 border-b border-teal-600/20">
                      <${Se} title="ID" tooltipIndex=${1} />
                      <${Se} title="Pin" tooltipIndex=${2} />
                      <${Se} title="Selected sensor" tooltipIndex=${3} />
                      <${Se} title="Count of sensors" tooltipIndex=${4} />
                      <${Se} title="On/Off" tooltipIndex=${5} />
                      <${Se} title="Actions" tooltipIndex=${6} />
                    </tr>
                  </thead>
                  <tbody id="tab1" class="divide-y divide-white/40">
                    ${$.length>0?$.map((le,pe)=>Et`<${Te}
                          device=${le}
                          index=${pe}
                          key=${le.id}
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
      </div>
      </div>
      ${ct&&(pt?Et`
            <${ModalEditSensor}
              typsensor=${pt}
              oneWireId=${pt.oneWireId}
              pins=${pt.pins}
              onClose=${me}
              onUpdate=${ue}
              sensorType=${pt.sensorType}
              closeOnOverlayClick=${!0}
              refresh=${ce}
            />
          `:Et`
            <${ModalOneWire}
              oneWire=${$t}
              onClose=${me}
              onUpdate=${_e}
              closeOnOverlayClick=${!0}
              refresh=${ce}
            />
          `)}
    </div>
  `};function ModalEditSensor({typsensor:$,oneWireId:_,pins:k,onClose:dt,onUpdate:ct,sensorType:st,sensorData:pt,closeOnOverlayClick:Yt=!0}){const[$t,ee]=ut({ut:(pt==null?void 0:pt.ut)||$.ut,lt:(pt==null?void 0:pt.lt)||$.lt,action_ut:(pt==null?void 0:pt.action_ut)||$.action_ut,action_lt:(pt==null?void 0:pt.action_lt)||$.action_lt,upphumid:(pt==null?void 0:pt.upphumid)||$.upphumid||0,humlolim:(pt==null?void 0:pt.humlolim)||$.humlolim||0,actuphum:(pt==null?void 0:pt.actuphum)||$.actuphum||"",actlowhum:(pt==null?void 0:pt.actlowhum)||$.actlowhum||"",info:(pt==null?void 0:pt.info)||$.info,onoff:(pt==null?void 0:pt.onoff)||$.onoff||0,humidity:(pt==null?void 0:pt.humidity)||$.humidity||0}),[se,ht]=ut(!1),Zt=(ue,ge,ve)=>{if(ue===""||ue==="-")return ue;const _e=ue.replace(",",".");if(!/^-?\d*\.?\d*$/.test(_e))return null;const ie=parseFloat(_e);return isNaN(ie)||ie<ge||ie>ve?null:_e},oe=ue=>{const{name:ge,value:ve}=ue.target;if(["ut","lt"].includes(ge)){const _e=Zt(ve,-55,125);_e!==null&&ee(ie=>({...ie,[ge]:_e}))}else if(["upphumid","humlolim"].includes(ge)){const _e=Zt(ve,0,100);_e!==null&&ee(ie=>({...ie,[ge]:_e}))}else ee(_e=>({..._e,[ge]:ve}))},ce=ue=>{const ge=["ut","lt","upphumid","humlolim"],ve={...ue};return ge.forEach(_e=>{ve[_e]===""||ve[_e]==="-"?ve[_e]=0:ve[_e]=parseFloat(ve[_e].toString().replace(",","."))}),ve};return Et`
    <div
      class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 pt-10"
      onclick=${ue=>{Yt&&ue.target===ue.currentTarget&&dt()}}
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
        <form onsubmit=${async ue=>{ue.preventDefault(),ht(!0);const ge=ce($t);try{if(!(await fetch("/api/sensor/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:_,pins:k,sensorNumber:$.s_number,...ge,s_number:$.s_number,t:$.t})})).ok)throw new Error("Network response was not ok");ct({...$,...ge,oneWireId:_,pins:k,s_number:$.s_number,t:$.t}),dt()}catch{}finally{ht(!1)}}}>
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
                      value=${$t.lt}
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
                      value=${$t.action_ut}
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
                      value=${$t.action_lt}
                      oninput=${oe}
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
                            value=${$t.upphumid}
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
                            value=${$t.humlolim}
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
                            value=${$t.actuphum}
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
                            value=${$t.actlowhum}
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
                      value=${$t.info}
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
  `}function ModalSIM800L({hideModal:$,title:_,selectedGps:k,onSave:dt}){const[ct,st]=ut((k==null?void 0:k.tel)||""),[pt,Yt]=ut((k==null?void 0:k.info)||""),[$t,ee]=ut((k==null?void 0:k.onoff)===1),[se,ht]=ut(!0),Zt=be=>/^\+\d{11,20}$/.test(be);return Et`
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

          <form onSubmit=${be=>{if(be.preventDefault(),!se)return;const me={tel:ct,info:pt,onoff:$t?1:0};console.log("Сохраняемые данные:",me),fetch("/api/sim800l/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(me)}).then(ue=>ue.json()).then(ue=>{typeof dt=="function"&&dt(me),$()}).catch(ue=>{console.error("Error:",ue)})}}>
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
                        onInput=${be=>{const me=be.target.value;st(me),ht(Zt(me))}}
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
                        value=${pt}
                        onInput=${be=>Yt(be.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${MyPolzunok} value=${$t} onChange=${ee} />
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
  `}const ModalSecurity=({modalType:$,page:_,hideModal:k,title:dt,selectedSecurity:ct,onSecurityChange:st,SliderComponent:pt=MyPolzunok})=>{const[Yt,$t]=ut((ct==null?void 0:ct.info)||""),[ee,se]=ut((ct==null?void 0:ct.onoff)||0),[ht,Zt]=ut((ct==null?void 0:ct.ptype)||0),[oe,ce]=ut((ct==null?void 0:ct.send_sms)||""),[be,me]=ut((ct==null?void 0:ct.action)||""),[ue,ge]=ut([]),[ve,_e]=ut({send_sms:null,action:null}),[ie,Ie]=ut(null),Se=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,Te=(xe,te)=>!te||te.trim()===""||te.toLowerCase()==="none"?null:xe==="action"?Se.test(te)?null:'Incorrect format. Use "None" or "pin:value" format.':te.length>100?"Text should not exceed 100 characters":null,Ee=(xe,te)=>{const ye=Te(xe,te);switch(_e(mt=>({...mt,[xe]:ye})),xe){case"send_sms":ce(te);break;case"action":me(te);break}};lt(()=>{fetch("/api/monitoring/get").then(xe=>xe.json()).then(xe=>{Array.isArray(xe)?ge(xe.filter(te=>te.topin===2)):ge([])}).catch(xe=>{console.error("Error fetching pin config:",xe),ge([])})},[]);const le=xe=>{if(xe.preventDefault(),Object.values(ve).some(ye=>ye!==null)){Ie("Please correct the errors before submitting.");return}const te={...ct,info:Yt,send_sms:oe||"NO",action:be||"None",onoff:ee,ptype:ht};fetch("/api/monitoring/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(te)}).then(ye=>{if(!ye.ok)throw new Error("Network response was not ok");return ye.json()}).then(ye=>{if(ye.error)throw new Error(ye.error);st(te),k()}).catch(ye=>{console.error("Error:",ye),Ie("Failed to save changes. Please try again.")})},pe=()=>{Zt(0),ce(""),me(""),$t(""),se(0),_e({send_sms:null,action:null})};return Et`
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
    <form onSubmit=${le}>
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
                  onChange=${xe=>st({...ct,setrpins:xe.target.value})}
                  class="border rounded p-2 w-full"
                >
                  <option value="">Select a connection</option>
                  ${ue.map(xe=>Et`
                      <option value=${xe.pins}>
                        ${xe.pins} (ID: ${xe.id})
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
                  onChange=${xe=>Zt(parseInt(xe.target.value))}
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
                  onInput=${xe=>Ee("action",xe.target.value)}
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
                  value=${oe}
                  onchange=${xe=>Ee("send_sms",xe.target.value)}
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
                  value=${Yt}
                  onInput=${xe=>$t(xe.target.value)}
                  class="border rounded p-2 w-full"
                />
              </td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">On/Off</td>
              <td class="p-2">
                <${pt} value=${ee} onChange=${se} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer flex justify-between mt-4">
        <button
          type="button"
          onClick=${pe}
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
      ${ie&&Et`<p class="text-red-500 mt-2">${ie}</p>`}
    </form>
  `}
        </div>
      </div>
    </div>
  `},TabSecurity=()=>{const[$,_]=ut({lang:"ru",sim800l:0,onoff:0,tel:"",info:""}),[k,dt]=ut(!1),[ct,st]=ut(!1),[pt,Yt]=ut([]),[$t,ee]=ut(!1),[se,ht]=ut("ru"),[Zt,oe]=ut(!1),[ce,be]=ut(""),[me,ue]=ut(null),[ge,ve]=ut(!1),[_e,ie]=ut("connected"),[Ie,Se]=ut(0),Te=(ne,Xt)=>{let re;return(...he)=>{clearTimeout(re),re=setTimeout(()=>ne(...he),Xt)}},Ee=async(ne,Xt={},re=3)=>{try{const he=await fetch(ne,Xt);if(!he.ok)throw new Error("Network response was not ok");return ie("connected"),he}catch(he){if(ie("error"),re>0)return await new Promise(de=>setTimeout(de,1e3)),Ee(ne,Xt,re-1);throw ie("disconnected"),he}},le={ru:Et`
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
    `},pe={ru:Et`
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
    `},$e=async()=>{if(!(ge||Date.now()-Ie<500))try{const Xt=await(await Ee("/api/sim800l/get")).json();_(Xt)}catch(ne){console.error("Error fetching SIM800L data:",ne)}},we=async()=>{if(!(ge||Date.now()-Ie<500))try{const Xt=await(await Ee("/api/monitoring/get")).json();Yt(Xt.pins||[]),ht(Xt.lang||"ru")}catch(ne){console.error("Error fetching monitoring data:",ne)}};lt(()=>{const ne=setInterval(()=>{$e(),we()},500);return()=>clearInterval(ne)},[]);const xe=Te(async ne=>{ve(!0);try{const Xt=await Ee("/api/sim800l/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ne)});_(ne),Se(Date.now())}catch(Xt){console.error("Error updating SIM800L:",Xt)}finally{ve(!1)}},300),te=async ne=>{try{const Xt=await fetch("/api/monitoring/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ne)});if(!Xt.ok)throw new Error(`HTTP error! status: ${Xt.status}`);Yt(re=>re.map(he=>he.id===ne.id?ne:he)),await we(),oe(!1)}catch(Xt){console.error("Error updating security:",Xt),alert("Failed to save changes. Please try again."),await we()}},ye=ne=>{console.log("handleOnOffChange:",ne),Yt(Xt=>Xt.map(re=>re.id===ne.id?{...re,...ne}:re)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ne.id,onoff:ne.onoff})}).then(Xt=>Xt.json()).then(Xt=>{console.log("Response from /api/onoff/set:",Xt)}).catch(Xt=>{console.error("Error calling /api/onoff/set:",Xt)}),closeModal()},mt=(ne,Xt)=>{be(ne),ue(Xt),oe(!0)};return Et`
    <div class="flex flex-col items-center w-full p-4">
      ${_e!=="connected"&&Et`
        <div
          class=${`w-full p-2 mb-4 text-white text-center rounded-xl shadow-md backdrop-blur-md 
          ${_e==="error"?"bg-yellow-500/80 border border-yellow-400/50":"bg-red-500/80 border border-red-400/50"}`}
        >
          ${_e==="error"?"Connection problems. Retrying...":"Connection lost. Check your internet connection."}
        </div>
      `}
      <div class="flex flex-col items-center w-full p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/50">
        <div class="w-full mb-10">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">SIM800L Settings</h2>
          
          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gradient-to-r from-teal-500/90 to-cyan-600/90 border-b border-teal-400/50 shadow-sm">
                  <th class="px-6 py-4 text-2xl font-bold text-white tracking-wide">RXD Pin</th>
                  <th class="px-6 py-4 text-2xl font-bold text-white tracking-wide">TXD Pin</th>
                  <th class="px-6 py-4 text-2xl font-bold text-white tracking-wide">Phone Number</th>
                  <th class="px-6 py-4 text-2xl font-bold text-white tracking-wide">Info</th>
                  <th class="px-6 py-4 text-2xl font-bold text-white tracking-wide">OnOff</th>
                  <th class="px-6 py-4 text-2xl font-bold text-white tracking-wide">Action</th>
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
                      onChange=${ne=>xe({...$,onoff:ne})}
                    />
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                    <button
                      onClick=${()=>dt(!0)}
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
              onClick=${()=>st(!ct)}
              class="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white transition-all duration-300 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl hover:from-teal-400 hover:to-cyan-500 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_0_15px_rgba(20,184,166,0.4)]"
            >
              <span class="relative flex items-center gap-2">
                ${ct?"Hide Help":"Show Help"}
              </span>
            </button>
          </div>
          ${ct&&le[se]}
        </div>

        <div class="w-full">
          <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-6 drop-shadow-sm">Security Pins</h2>
          
          <div class="overflow-x-auto w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gradient-to-r from-teal-500/90 to-cyan-600/90 border-b border-teal-400/50 shadow-sm">
                  <th class="px-6 py-4 text-2xl font-bold text-white tracking-wide">ID</th>
                  <th class="px-6 py-4 text-2xl font-bold text-white tracking-wide">Pin</th>
                  <th class="px-6 py-4 text-2xl font-bold text-white tracking-wide">Type of sensor</th>
                  <th class="px-6 py-4 text-2xl font-bold text-white tracking-wide">Action</th>
                  <th class="px-6 py-4 text-2xl font-bold text-white tracking-wide">Send SMS</th>
                  <th class="px-6 py-4 text-2xl font-bold text-white tracking-wide">INFO</th>
                  <th class="px-6 py-4 text-2xl font-bold text-white tracking-wide">On/Off</th>
                  <th class="px-6 py-4 text-2xl font-bold text-white tracking-wide">Edit Pin</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/40">
                ${pt.length>0?pt.map((ne,Xt)=>Et`
                        <tr
                          class="${Xt%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors"
                        >
                          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ne.id}</td>
                          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ne.pins}</td>
                          <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                            ${["PIR","Normal open","Normal close"][ne.ptype]}
                          </td>
                          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ne.action}</td>
                          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ne.send_sms}</td>
                          <td class="px-6 py-4 text-sm text-slate-800 font-medium">${ne.info}</td>
                          <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                            <${MyPolzunok}
                              value=${ne.onoff}
                              onChange=${re=>ye({...ne,onoff:re})}
                            />
                          </td>
                          <td class="px-6 py-4 text-sm text-slate-800 font-medium">
                            <button
                              onClick=${()=>mt("edit",ne)}
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
              onClick=${()=>ee(!$t)}
              class="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white transition-all duration-300 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl hover:from-teal-400 hover:to-cyan-500 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_0_15px_rgba(20,184,166,0.4)]"
            >
              <span class="relative flex items-center gap-2">
                ${$t?"Hide Help":"Show Help"}
              </span>
            </button>
          </div>
          ${$t&&pe[se]}
        </div>

        ${k&&Et`
          <${ModalSIM800L}
            hideModal=${()=>dt(!1)}
            title="Edit SIM800L Settings"
            selectedGps=${$}
            onSave=${xe}
          />
        `}
        ${Zt&&Et`
          <${ModalSecurity}
            modalType=${ce}
            page="TabSecurity"
            hideModal=${()=>oe(!1)}
            title="Edit Security Settings"
            selectedSecurity=${me}
            onSecurityChange=${te}
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
  `}function FirmwareUpdate({}){const[$,_]=ut([{},{}]),[k,dt]=ut(null),ct=()=>fetch("api/firmware/status").then(Zt=>Zt.json()).then(Zt=>_(Zt));lt(ct,[]),lt(()=>{if(k){const Zt=setTimeout(()=>{dt(null)},3e3);return()=>clearTimeout(Zt)}},[k]);const st=Zt=>fetch("api/firmware/commit").then(oe=>oe.json()).then(ct),pt=Zt=>fetch("api/reboot",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reboot:1})}).then(oe=>oe.json()).then(oe=>new Promise(ce=>setTimeout(()=>{ct(),ce()},5e3))),Yt=Zt=>fetch("api/firmware/rollback").then(pt),$t=Zt=>fetch("api/device/eraselast").then(ct),ee=function(Zt){if(!Zt){dt({type:"yellow",message:"Error: No file selected."});return}const oe=Zt.name.split(".").pop().toLowerCase();if(oe!=="bin"&&oe!=="hex"){dt({type:"red",message:"Error: Only .bin and .hex files are allowed!"});return}const ce=new FormData;ce.append("file",Zt),fetch("api/firmware/upload",{method:"POST",body:ce}).then(be=>{if(!be.ok)throw new Error(`HTTP error! status: ${be.status}`);return be.json()}).then(()=>{dt({type:"green",message:"Firmware uploaded successfully!"}),ct()}).catch(be=>{dt({type:"yellow",message:`Error: Upload failed. ${be.message}`})})},se=({type:Zt,message:oe})=>Et`
      <div
        class=${`fixed top-0 left-0 right-0 z-50 border-b-4 p-4 ${Zt==="red"?"bg-red-100 border-red-500 text-red-700":Zt==="yellow"?"bg-yellow-100 border-yellow-500 text-yellow-700":"bg-green-100 border-green-500 text-green-700"}`}
        role="alert"
      >
        <p class="font-bold text-center">${oe}</p>
      </div>
    `,ht=({title:Zt,onupload:oe})=>Et`
      <label
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        ${Zt}
        <input
          type="file"
          class="hidden"
          accept=".bin,.hex"
          onChange=${be=>{const me=be.target.files[0];me&&oe(me)}}
        />
      </label>
    `;return Et`
    ${k&&Et`<${se} type=${k.type} message=${k.message} />`}
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
  `}const pageSetting=({value:$,setfn:_,type:k,options:dt,error:ct,...st})=>{let pt;const Yt=`w-full px-3 py-2 border rounded-md ${ct?"border-red-500":"border-gray-300"}`;switch(k){case"text":case"password":case"number":pt=Et`
        <input
          type=${k}
          value=${$}
          onInput=${$t=>_($t.target.value)}
          class=${Yt}
          ...${st}
        />
      `;break;case"select":pt=Et`
        <select
          value=${$}
          onChange=${$t=>_($t.target.value)}
          class=${Yt}
          ...${st}
        >
          ${dt.map(([$t,ee])=>Et` <option value=${$t}>${ee}</option> `)}
        </select>
      `;break;case"switch":pt=Et`
        <label class="switch">
          <input
            type="checkbox"
            checked=${$}
            onChange=${$t=>_($t.target.checked)}
            ...${st}
          />
          <span class="slider round"></span>
        </label>
      `;break;default:pt=Et`<span>Неподдерживаемый тип: ${k}</span>`}return Et`
    <div>
      ${pt}
      ${ct&&Et`<div class="text-red-500 text-sm mt-1">${ct}</div>`}
    </div>
  `};function Settings({}){const[$,_]=ut({}),[k,dt]=ut(null),[ct,st]=ut(null),[pt,Yt]=ut({}),$t=at(null),[ee,se]=ut(null),[ht,Zt]=ut(null),[oe,ce]=ut(!1),[be,me]=ut(!1),[ue,ge]=ut(!1),[ve,_e]=ut(!1),[ie,Ie]=ut(!1),[Se,Te]=ut(!0),Ee=[{value:"en",label:"English"},{value:"ru",label:"Russian"}],le=[[-12,"(GMT -12:00) Eniwetok, Kwajalein"],[-11,"(GMT -11:00) Midway Island, Samoa"],[-10,"(GMT -10:00) Hawaii"],[-9,"(GMT -9:00) Alaska"],[-8,"(GMT -8:00) Pacific Time (US & Canada)"],[-7,"(GMT -7:00) Mountain Time (US & Canada)"],[-6,"(GMT -6:00) Central Time (US & Canada), Mexico City"],[-5,"(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima"],[-4,"(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz"],[-3.3,"(GMT -3:30) Newfoundland"],[-3,"(GMT -3:00) Brazil, Buenos Aires, Georgetown"],[-2,"(GMT -2:00) Mid-Atlantic"],[-1,"(GMT -1:00) Azores, Cape Verde Islands"],[0,"(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca"],[1,"(GMT +1:00) Brussels, Copenhagen, Madrid, Paris"],[2,"(GMT +2:00) Kaliningrad, South Africa"],[3,"(GMT +3:00) Яшалта, Moscow, St. Petersburg, Baghdad, Riyadh"],[3.3,"(GMT +3:30) Tehran"],[4,"(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi"],[4.3,"(GMT +4:30) Kabul"],[5,"(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"],[5.3,"(GMT +5:30) Bombay, Calcutta, Madras, New Delhi"],[5.45,"(GMT +5:45) Kathmandu"],[6,"(GMT +6:00) Almaty, Dhaka, Colombo"],[7,"(GMT +7:00) Bangkok, Hanoi, Jakarta"],[8,"(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"],[9,"(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"],[9.3,"(GMT +9:30) Adelaide, Darwin"],[10,"(GMT +10:00) Eastern Australia, Guam, Vladivostok"],[11,"(GMT +11:00) Magadan, Solomon Islands, New Caledonia"],[12,"(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"]],pe=/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,$e=/^(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)$/,we=vt=>{if(!vt)return{date:"",time:""};const fe=vt.match(/d:(\d{1,2}\.\d{1,2}\.\d{2})/),ae=vt.match(/t:(\d{2}:\d{2}:\d{2})/);return{date:fe?fe[1]:"",time:ae?ae[1]:""}},xe=vt=>{if(!/^\d{1,2}\.\d{1,2}\.\d{2}$/.test(vt))return!1;const[ae,ke,Oe]=vt.split(".").map(Number);if(ke<1||ke>12||ae<1||ae>31||Oe<0||Oe>99)return!1;const Ce=new Date().getFullYear()%100;if(Oe>Ce+5)return!1;const Pe=new Date(2e3+Oe,ke,0).getDate();return!(ae>Pe)},te=vt=>!!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(vt),ye=(vt,fe)=>{const ae=Object.values(fe).some(Oe=>Oe!==null),ke=vt.usehttps?vt.domain&&vt.domain.trim()!=="":!0;return!(ae||!ke)},mt=(vt,fe)=>{se({message:vt,type:fe}),setTimeout(()=>{se(null)},3e3)},ne=vt=>{Zt(vt),setTimeout(()=>{Zt(null)},3e3)},Xt=(vt,fe)=>{let ae=null;if(!$.usehttps&&["domain","tls_key","tls_cert","tls_ca","telegram_token"].includes(vt))return null;if(!fe&&["ip_addr","gateway","mqtt_hst","sb_mask","offdate","offtime","domain"].includes(vt))return"Поле не может быть пустым";switch(vt){case"ip_addr":case"gateway":case"mqtt_hst":pe.test(fe)||(ae="Неверный IP-адрес");break;case"sb_mask":$e.test(fe)||(ae="Неверная маска подсети");break;case"offdate":xe(fe)||(ae="Неверный формат даты (д.м.гг)");break;case"offtime":te(fe)||(ae="Неверный формат времени (чч:мм:сс)");break;case"domain":fe.length>50?ae="Домен не должен превышать 50 символов":fe.match(/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/)||(ae="Неверный формат домена");break;case"tls_key":fe&&fe.trim()!==""&&(fe.length>512?ae="Private Key не должен превышать 512 символов":(!fe.includes("BEGIN EC PRIVATE KEY")||!fe.includes("END EC PRIVATE KEY"))&&(ae="Неверный формат Private Key"));break;case"tls_cert":fe&&fe.trim()!==""&&(fe.length>1024?ae="Public Key не должен превышать 1024 символов":(!fe.includes("BEGIN CERTIFICATE")||!fe.includes("END CERTIFICATE"))&&(ae="Неверный формат Public Key"));break;case"tls_ca":fe&&fe.trim()!==""&&(fe.length>1024?ae="Secret Key не должен превышать 1024 символов":(!fe.includes("BEGIN CERTIFICATE")||!fe.includes("END CERTIFICATE"))&&(ae="Неверный формат Secret Key"));break}return ae},re=vt=>{vt.preventDefault();const fe=new FormData($t.current);let ae={...$};for(const[ke,Oe]of fe.entries())["lon_de","lat_de","timezone","mqtt_prt"].includes(ke)?ae[ke]=Oe===""||Oe===null?0:Number(Oe):ae[ke]=Oe;ae.usehttps||["tls_ca","tls_key","tls_cert","telegram_token","domain"].forEach(Oe=>{delete ae[Oe]}),ae.offdate&&ae.offtime?ae.offldt=`d:${ae.offdate} t:${ae.offtime}`:delete ae.offldt,["lon_de","lat_de","timezone","mqtt_prt"].forEach(ke=>{(ae[ke]===null||ae[ke]==="")&&(ae[ke]=0)}),ae.onsunrise=ae.onsunrise?1:0,ae.onsunset=ae.onsunset?1:0,ae.check_ip=ae.check_ip?1:0,ae.check_mqtt=ae.check_mqtt?1:0,ae.usehttps=ae.usehttps?1:0,fetch("/api/mysett/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ae)}).then(ke=>{if(!ke.ok)throw new Error("Ошибка сети или сервера");return ke.json()}).then(ke=>{st("success"),dt(ke),mt("Данные успешно сохранены","success"),ne("Данные успешно сохранены")}).catch(ke=>{st("error"),dt(ke),mt("Ошибка при сохранении данных","error"),ne("Ошибка при сохранении данных")})},he=(vt,fe)=>{let ae=null;vt==="offdate"?ae=xe(fe)?null:"Неверный формат даты (д.м.гг)":vt==="offtime"?ae=te(fe)?null:"Неверный формат времени (чч:мм:сс)":ae=Xt(vt,fe),Yt(Oe=>{const Ce={...Oe,[vt]:ae},Pe=["tls_key","tls_cert","tls_ca"],Me=Object.keys(Ce).filter(Ne=>!Pe.includes(Ne)&&Ne!=="telegram_token").some(Ne=>Ce[Ne]!==null);return ce(Me||!$.usehttps&&Pe.some(Ne=>$[Ne])),Ce});let ke=fe;["lon_de","lat_de","timezone","mqtt_prt"].includes(vt)?ke=fe===""||fe===null?0:Number(fe):["onsunrise","onsunset","check_ip","check_mqtt","usehttps"].includes(vt)&&(ke=fe?1:0),_(Oe=>({...Oe,[vt]:ke})),vt==="usehttps"&&(Yt({}),ce(!1))},de=()=>fetch("/api/mysett/get").then(vt=>vt.json()).then(vt=>{if(vt.offldt){const{date:fe,time:ae}=we(vt.offldt);vt.offdate=fe,vt.offtime=ae}console.log("Loaded settings:",vt),_(vt)}).catch(vt=>{console.error("Error fetching settings:",vt),mt("Ошибка при загрузке настроек","error")});return lt(()=>{de().then(()=>{$!=null&&$.tls_key&&me(!0),$!=null&&$.tls_cert&&ge(!0),$!=null&&$.tls_ca&&_e(!0),$!=null&&$.telegram_token&&Ie(!0),Te(!1)})},[]),lt(()=>{const vt=ye($,pt);ce(!vt)},[$,pt]),Se?Et`<div>Loading...</div>`:$?(Object.values(pt).some(vt=>vt!==null),Et`
    <div class="flex flex-col items-center w-full p-4 mb-16">
      <div class="flex flex-col items-center w-full p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/50">
        
        <div class="w-full mb-6 flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-teal-500/90 to-cyan-600/90 rounded-2xl p-4 shadow-sm border border-teal-400/50 gap-4">
          <h2 class="text-3xl font-extrabold text-white tracking-wide drop-shadow-sm uppercase">Global Settings</h2>
          <select
            value=${$.lang}
            onChange=${vt=>he("lang",vt.target.value)}
            class="px-3 py-1.5 bg-white/90 text-slate-800 rounded-lg text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
          >
            ${Ee.map(vt=>Et`<option value=${vt.value}>${vt.label}</option>`)}
          </select>
        </div>

        ${ht&&Et`
          <div class="w-full max-w-4xl bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center mb-6 border border-green-400/50 backdrop-blur-md">
            ${ht}
          </div>
        `}

        <form
          ref=${$t}
          onSubmit=${re}
          class="w-full max-w-4xl flex flex-col gap-6 relative"
        >
          <div class="flex justify-end w-full">
            <button
              type="submit"
              class=${`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_0_15px_rgba(20,184,166,0.4)] ${oe?"opacity-50 cursor-not-allowed bg-slate-400":"bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500"}`}
              disabled=${oe}
            >
              <span class="relative flex items-center gap-2 text-lg tracking-wide drop-shadow-md">
                Save changes
              </span>
            </button>
          </div>

          <!-- General Settings -->
          <div class="overflow-hidden w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
            <div class="bg-gradient-to-r from-teal-500/90 to-cyan-600/90 border-b border-teal-400/50 px-6 py-4">
              <h3 class="text-2xl font-bold text-white tracking-wide drop-shadow-sm">General</h3>
            </div>
            <div class="flex flex-col divide-y divide-white/40">
              ${[{label:"Login",key:"adm_name",type:"text"},{label:"Password",key:"adm_pswd",type:"password"},{label:"Time zone UTC",key:"timezone",type:"select",options:le}].map((vt,fe)=>Et`
                <div class="flex flex-col md:flex-row md:items-center p-4 transition-colors ${fe%2===0?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 gap-2 md:gap-0">
                  <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2">
                    ${vt.label}
                  </div>
                  <div class="w-full md:w-2/3">
                    <${pageSetting} 
                      value=${$[vt.key]} 
                      setfn=${ae=>he(vt.key,ae)} 
                      type=${vt.type} 
                      options=${vt.options}
                      class=${`w-full px-3 py-2 bg-white/50 border ${pt[vt.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      error=${pt[vt.key]} 
                    />
                  </div>
                </div>
              `)}
            </div>
          </div>

          <!-- Network Settings -->
          <div class="overflow-hidden w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
            <div class="bg-gradient-to-r from-teal-500/90 to-cyan-600/90 border-b border-teal-400/50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 class="text-2xl font-bold text-white tracking-wide drop-shadow-sm w-full sm:w-auto text-center sm:text-left">Network</h3>
              <div class="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
                <span class="text-white font-medium drop-shadow-sm tracking-wide text-lg">${$.check_ip?"DHCP":"Static IP"}</span>
                <${MyPolzunok}
                  value=${$.check_ip}
                  onChange=${vt=>he("check_ip",vt)}
                />
              </div>
            </div>
            
            ${$.check_ip?null:Et`
              <div class="flex flex-col divide-y divide-white/40">
                ${[{label:"IP address",key:"ip_addr",type:"text"},{label:"Subnet mask",key:"sb_mask",type:"text"},{label:"Default gateway",key:"gateway",type:"text"}].map((vt,fe)=>Et`
                  <div class="flex flex-col md:flex-row md:items-center p-4 transition-colors ${fe%2===0?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 gap-2 md:gap-0">
                    <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2">
                      ${vt.label}
                    </div>
                    <div class="w-full md:w-2/3">
                      <${pageSetting} 
                        value=${$[vt.key]} 
                        setfn=${ae=>he(vt.key,ae)} 
                        type=${vt.type} 
                        class=${`w-full px-3 py-2 bg-white/50 border ${pt[vt.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        error=${pt[vt.key]} 
                      />
                    </div>
                  </div>
                `)}
              </div>
            `}
          </div>

          <!-- API Settings -->
          <div class="overflow-hidden w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
            <div class="bg-gradient-to-r from-teal-500/90 to-cyan-600/90 border-b border-teal-400/50 px-6 py-4">
              <h3 class="text-2xl font-bold text-white tracking-wide drop-shadow-sm">API Settings</h3>
            </div>
            <div class="flex flex-col divide-y divide-white/40">
              <div class="flex flex-col md:flex-row md:items-center p-4 transition-colors bg-white/80 hover:bg-slate-200/80 gap-2 md:gap-0">
                <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2">Token</div>
                <div class="w-full md:w-2/3">
                  <${pageSetting}
                    value=${$.token}
                    setfn=${vt=>he("token",vt)}
                    type="text"
                    class="w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- MQTT Settings -->
          <div class="overflow-hidden w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
            <div class="bg-gradient-to-r from-teal-500/90 to-cyan-600/90 border-b border-teal-400/50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 class="text-2xl font-bold text-white tracking-wide drop-shadow-sm w-full sm:w-auto text-center sm:text-left">MQTT</h3>
              <div class="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
                 <span class="text-white font-medium drop-shadow-sm tracking-wide text-lg">Enabled</span>
                 <${MyPolzunok}
                   value=${$.check_mqtt}
                   onChange=${vt=>he("check_mqtt",vt)}
                 />
              </div>
            </div>
            
            ${$.check_mqtt?Et`
              <div class="flex flex-col divide-y divide-white/40">
                ${[{label:"Host",key:"mqtt_hst",type:"text"},{label:"Port",key:"mqtt_prt",type:"number"},{label:"Client",key:"mqtt_clt",type:"text"},{label:"User",key:"mqtt_usr",type:"text"},{label:"Password",key:"mqtt_pswd",type:"password"},{label:"TX topic",key:"txmqttop",type:"text"},{label:"RX topic",key:"rxmqttop",type:"text"}].map((vt,fe)=>Et`
                  <div class="flex flex-col md:flex-row md:items-center p-4 transition-colors ${fe%2===0?"bg-sky-200/40":"bg-white/80"} hover:bg-slate-200/80 gap-2 md:gap-0">
                    <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2">
                      ${vt.label}
                    </div>
                    <div class="w-full md:w-2/3">
                      <${pageSetting} 
                        value=${$[vt.key]} 
                        setfn=${ae=>he(vt.key,ae)} 
                        type=${vt.type} 
                        class=${`w-full px-3 py-2 bg-white/50 border ${pt[vt.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        error=${pt[vt.key]} 
                      />
                    </div>
                  </div>
                `)}
              </div>
            `:null}
          </div>

          <!-- HTTPS Settings -->
          <div class="overflow-hidden w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
            <div class="bg-gradient-to-r from-teal-500/90 to-cyan-600/90 border-b border-teal-400/50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 class="text-2xl font-bold text-white tracking-wide drop-shadow-sm w-full sm:w-auto text-center sm:text-left">HTTPS</h3>
              <div class="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
                 <span class="text-white font-medium drop-shadow-sm tracking-wide text-lg">Enabled</span>
                 <${MyPolzunok}
                   value=${$.usehttps}
                   onChange=${vt=>he("usehttps",vt)}
                 />
              </div>
            </div>
            
            ${$.usehttps?Et`
              <div class="flex flex-col divide-y divide-white/40">
                ${[{label:"HTTPS domain",key:"domain",type:"text"},{label:"Private Key",key:"tls_key",type:"textarea"},{label:"Public Key",key:"tls_cert",type:"textarea"}].map((vt,fe)=>Et`
                  <div class="flex flex-col md:flex-row md:items-center p-4 transition-colors ${fe%2===0?"bg-sky-200/40":"bg-white/80"} hover:bg-slate-200/80 gap-2 md:gap-0">
                    <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2 mt-1 md:mt-0">
                      ${vt.label}
                    </div>
                    <div class="w-full md:w-2/3 flex items-start md:items-center">
                      <div class="relative w-full">
                        ${vt.type==="textarea"?Et`
                            ${vt.key==="tls_key"&&$.tls_key?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены, но информация скрыта!</div>`:vt.key==="tls_cert"&&$.tls_cert?Et`<div class="w-full px-3 py-2 bg-white/40 border border-white/50 rounded-lg text-slate-600 font-medium shadow-inner">Данные введены успешно!</div>`:Et`<textarea
                                    name=${vt.key}
                                    value=${$[vt.key]||""}
                                    onInput=${ae=>he(vt.key,ae.target.value)}
                                    class=${`w-full px-3 py-2 bg-white/50 border ${pt[vt.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                                    rows="1"
                                    placeholder="Enter ${vt.label}"
                                  ></textarea>`}
                          `:Et`
                            <input
                              type="text"
                              name=${vt.key}
                              value=${$[vt.key]||""}
                              onInput=${ae=>he(vt.key,ae.target.value)}
                              class=${`w-full px-3 py-2 bg-white/50 border ${pt[vt.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                              maxlength="30"
                              placeholder="Enter domain (e.g., zagotovka.ddns.net)"
                            />
                          `}
                        
                        ${$[vt.key]&&vt.key==="tls_cert"&&Et`
                          <div class="absolute right-0 top-0 mt-[3px] mr-[3px] flex gap-2">
                            <button
                              type="button"
                              onClick=${()=>{navigator.clipboard.writeText($[vt.key]),Zt("Данные скопированы"),setTimeout(()=>Zt(""),3e3)}}
                              class="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5"
                            >Копировать</button>
                            <button
                              type="button"
                              onClick=${()=>he(vt.key,"")}
                              class="px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                            >Очистить</button>
                          </div>
                        `}
                        ${$[vt.key]&&vt.key!=="domain"&&vt.key!=="tls_cert"&&Et`
                          <button
                            type="button"
                            onClick=${()=>he(vt.key,"")}
                            class="absolute right-0 top-0 mt-[3px] mr-[3px] px-3 py-1 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-md text-sm shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5"
                          >Очистить</button>
                        `}
                      </div>
                      ${pt[vt.key]&&Et`
                        <div class="text-red-500 text-sm mt-1 font-semibold w-full text-left">${pt[vt.key]}</div>
                      `}
                    </div>
                  </div>
                `)}
              </div>
            `:null}
          </div>

          <!-- Coordinate Settings -->
          <div class="overflow-hidden w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
            <div class="bg-gradient-to-r from-teal-500/90 to-cyan-600/90 border-b border-teal-400/50 px-6 py-4">
              <h3 class="text-2xl font-bold text-white tracking-wide drop-shadow-sm">Coordinates & Astronomy</h3>
            </div>
            <div class="flex flex-col divide-y divide-white/40">
              <div class="flex flex-col md:flex-row md:items-center p-4 transition-colors bg-white/80 hover:bg-slate-200/80 gap-2 md:gap-0">
                <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2">Longitude</div>
                <div class="w-full md:w-2/3">
                  <${pageSetting} value=${$.lon_de} setfn=${vt=>he("lon_de",vt)} type="text" class=${`w-full px-3 py-2 bg-white/50 border ${pt.lon_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} error=${pt.lon_de} />
                </div>
              </div>
              <div class="flex flex-col md:flex-row md:items-center p-4 transition-colors bg-sky-200/40 hover:bg-slate-200/80 gap-2 md:gap-0">
                <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2">Latitude</div>
                <div class="w-full md:w-2/3">
                  <${pageSetting} value=${$.lat_de} setfn=${vt=>he("lat_de",vt)} type="text" class=${`w-full px-3 py-2 bg-white/50 border ${pt.lat_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} error=${pt.lat_de} />
                </div>
              </div>
              <div class="flex flex-col md:flex-row md:items-center p-4 transition-colors bg-white/80 hover:bg-slate-200/80 gap-2 md:gap-0">
                <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2">
                  Sunrise: <span class="text-teal-600 drop-shadow-sm">${$.sunrise}</span>
                </div>
                <div class="w-full md:w-2/3 flex items-center gap-4">
                  <${MyPolzunok} value=${$.onsunrise} onChange=${vt=>he("onsunrise",vt)} />
                  <input
                    type="text"
                    value=${$.sunrise_pins||""}
                    onInput=${vt=>he("sunrise_pins",vt.target.value)}
                    maxlength="20"
                    placeholder="Action for sunrise"
                    class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
              <div class="flex flex-col md:flex-row md:items-center p-4 transition-colors bg-sky-200/40 hover:bg-slate-200/80 gap-2 md:gap-0">
                <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2">
                  Sunset: <span class="text-teal-600 drop-shadow-sm">${$.sunset}</span>
                </div>
                <div class="w-full md:w-2/3 flex items-center gap-4">
                  <${MyPolzunok} value=${$.onsunset} onChange=${vt=>he("onsunset",vt)} />
                  <input
                    type="text"
                    value=${$.sunset_pins||""}
                    onInput=${vt=>he("sunset_pins",vt.target.value)}
                    maxlength="20"
                    placeholder="Action for sunset"
                    class="flex-grow w-full px-3 py-2 bg-white/50 border border-white/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
              <div class="flex flex-col md:flex-row md:items-center p-4 transition-colors bg-white/80 hover:bg-slate-200/80 gap-2 md:gap-0">
                <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2">Day Length</div>
                <div class="w-full md:w-2/3">
                  <span class="text-xl font-medium text-slate-800">${$.dlength}</span>
                </div>
              </div>
              <div class="flex flex-col md:flex-row md:items-center p-4 transition-colors bg-sky-200/40 hover:bg-slate-200/80 gap-2 md:gap-0">
                <div class="w-full md:w-1/3 text-lg font-bold text-slate-700 md:pr-4 drop-shadow-sm pl-2">Next full moon</div>
                <div class="w-full md:w-2/3">
                  <span class="text-xl font-medium text-slate-800">
                    ${typeof $.fullmoon=="string"&&$.fullmoon?`${$.fullmoon.split(" ")[0]} at ${$.fullmoon.split(" ")[1]}`:"N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Offline Mode -->
          <div class="overflow-hidden w-full rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm mb-4">
            <div class="bg-gradient-to-r from-teal-500/90 to-cyan-600/90 border-b border-teal-400/50 px-6 py-4">
              <h3 class="text-2xl font-bold text-white tracking-wide drop-shadow-sm">[OFFLINE MODE] Date & Time</h3>
            </div>
            <div class="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/40 bg-white/80 items-stretch">
              <div class="flex-1 p-4 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 hover:bg-slate-200/80 transition-colors">
                <div class="font-bold text-slate-700 text-lg sm:w-1/3 flex-shrink-0">Date</div>
                <div class="flex-grow flex flex-col w-full">
                  <input
                    type="text"
                    name="offdate"
                    value=${$.offdate||""}
                    onInput=${vt=>he("offdate",vt.target.value)}
                    placeholder="dd.mm.yy"
                    class=${`w-full px-3 py-2 bg-white/50 border ${pt.offdate?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  ${pt.offdate&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${pt.offdate}</div>`}
                </div>
              </div>
              <div class="flex-1 p-4 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 hover:bg-slate-200/80 transition-colors">
                <div class="font-bold text-slate-700 text-lg sm:w-1/3 flex-shrink-0 pl-0 sm:pl-2">Time</div>
                <div class="flex-grow flex flex-col w-full">
                  <input
                    type="text"
                    name="offtime"
                    value=${$.offtime||""}
                    onInput=${vt=>he("offtime",vt.target.value)}
                    placeholder="hh:mm:ss"
                    class=${`w-full px-3 py-2 bg-white/50 border ${pt.offtime?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                  ${pt.offtime&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${pt.offtime}</div>`}
                </div>
              </div>
            </div>
          </div>

          ${ht&&Et`
            <div class="w-full bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center border border-green-400/50 backdrop-blur-md">
              ${ht}
            </div>
          `}

          <div class="flex justify-end w-full mb-4">
            <button
              type="submit"
              class=${`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_0_15px_rgba(20,184,166,0.4)] ${oe?"opacity-50 cursor-not-allowed bg-slate-400":"bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500"}`}
              disabled=${oe}
            >
              <span class="relative flex items-center gap-2 text-lg tracking-wide drop-shadow-md">
                Save changes
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `):""}const App=function({}){const[$,_]=ut(!0),[k,dt]=ut("/"),[ct,st]=ut(""),[pt,Yt]=ut(!0),$t=()=>fetch("api/logout").then(se=>st("")),ee=se=>se.ok?se.json().then(ht=>st(ht.user)).finally(ht=>_(!1)):_(!1)&&st(null);return lt(()=>fetch("api/login").then(ee),[]),$?"":ct?Et` <div class="min-h-screen bg-slate-100" id="mains">
    <${Sidebar} url=${k} show=${pt} />
    <${Header}
      logout=${$t}
      user=${ct}
      showSidebar=${pt}
      setShowSidebar=${Yt}
    />
    <div
      class="${pt&&"pl-72"} transition-all duration-300 transform"
    >
      <${Qt}
        onChange=${se=>dt(se.url)}
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
