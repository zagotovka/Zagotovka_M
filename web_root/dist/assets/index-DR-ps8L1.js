(function(){const _=document.createElement("link").relList;if(_&&_.supports&&_.supports("modulepreload"))return;for(const dt of document.querySelectorAll('link[rel="modulepreload"]'))ct(dt);new MutationObserver(dt=>{for(const k of dt)if(k.type==="childList")for(const pt of k.addedNodes)pt.tagName==="LINK"&&pt.rel==="modulepreload"&&ct(pt)}).observe(document,{childList:!0,subtree:!0});function st(dt){const k={};return dt.integrity&&(k.integrity=dt.integrity),dt.referrerPolicy&&(k.referrerPolicy=dt.referrerPolicy),dt.crossOrigin==="use-credentials"?k.credentials="include":dt.crossOrigin==="anonymous"?k.credentials="omit":k.credentials="same-origin",k}function ct(dt){if(dt.ep)return;dt.ep=!0;const k=st(dt);fetch(dt.href,k)}})();var t,n,e,r,o,u,i,l,c,a,s,f={},p=[],h=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,d=Array.isArray;function v($,_){for(var st in _)$[st]=_[st];return $}function m($){var _=$.parentNode;_&&_.removeChild($)}function y($,_,st){var ct,dt,k,pt={};for(k in _)k=="key"?ct=_[k]:k=="ref"?dt=_[k]:pt[k]=_[k];if(arguments.length>2&&(pt.children=arguments.length>3?t.call(arguments,2):st),typeof $=="function"&&$.defaultProps!=null)for(k in $.defaultProps)pt[k]===void 0&&(pt[k]=$.defaultProps[k]);return g($,pt,ct,dt,null)}function g($,_,st,ct,dt){var k={type:$,props:_,key:st,ref:ct,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:dt??++e,__i:-1,__u:0};return dt==null&&n.vnode!=null&&n.vnode(k),k}function b($){return $.children}function C($,_){this.props=$,this.context=_}function x($,_){if(_==null)return $.__?x($.__,$.__i+1):null;for(var st;_<$.__k.length;_++)if((st=$.__k[_])!=null&&st.__e!=null)return st.__e;return typeof $.type=="function"?x($):null}function w($){var _,st;if(($=$.__)!=null&&$.__c!=null){for($.__e=$.__c.base=null,_=0;_<$.__k.length;_++)if((st=$.__k[_])!=null&&st.__e!=null){$.__e=$.__c.base=st.__e;break}return w($)}}function P($){(!$.__d&&($.__d=!0)&&r.push($)&&!U.__r++||o!==n.debounceRendering)&&((o=n.debounceRendering)||u)(U)}function U(){var $,_,st,ct,dt,k,pt,Yt;for(r.sort(i);$=r.shift();)$.__d&&(_=r.length,ct=void 0,k=(dt=(st=$).__v).__e,pt=[],Yt=[],st.__P&&((ct=v({},dt)).__v=dt.__v+1,n.vnode&&n.vnode(ct),M(st.__P,ct,dt,st.__n,st.__P.namespaceURI,32&dt.__u?[k]:null,pt,k??x(dt),!!(32&dt.__u),Yt),ct.__v=dt.__v,ct.__.__k[ct.__i]=ct,L(pt,ct,Yt),ct.__e!=k&&w(ct)),r.length>_&&r.sort(i));U.__r=0}function H($,_,st,ct,dt,k,pt,Yt,mt,Xt,te){var vt,ee,se,fe,ye,ve=ct&&ct.__k||p,ce=_.length;for(st.__d=mt,E(st,_,ve),mt=st.__d,vt=0;vt<ce;vt++)(se=st.__k[vt])!=null&&typeof se!="boolean"&&typeof se!="function"&&(ee=se.__i===-1?f:ve[se.__i]||f,se.__i=vt,M($,se,ee,dt,k,pt,Yt,mt,Xt,te),fe=se.__e,se.ref&&ee.ref!=se.ref&&(ee.ref&&F(ee.ref,null,se),te.push(se.ref,se.__c||fe,se)),ye==null&&fe!=null&&(ye=fe),65536&se.__u||ee.__k===se.__k?(mt&&!mt.isConnected&&(mt=x(ee)),mt=S(se,mt,$)):typeof se.type=="function"&&se.__d!==void 0?mt=se.__d:fe&&(mt=fe.nextSibling),se.__d=void 0,se.__u&=-196609);st.__d=mt,st.__e=ye}function E($,_,st){var ct,dt,k,pt,Yt,mt=_.length,Xt=st.length,te=Xt,vt=0;for($.__k=[],ct=0;ct<mt;ct++)pt=ct+vt,(dt=$.__k[ct]=(dt=_[ct])==null||typeof dt=="boolean"||typeof dt=="function"?null:typeof dt=="string"||typeof dt=="number"||typeof dt=="bigint"||dt.constructor==String?g(null,dt,null,null,null):d(dt)?g(b,{children:dt},null,null,null):dt.constructor===void 0&&dt.__b>0?g(dt.type,dt.props,dt.key,dt.ref?dt.ref:null,dt.__v):dt)!=null?(dt.__=$,dt.__b=$.__b+1,Yt=D(dt,st,pt,te),dt.__i=Yt,k=null,Yt!==-1&&(te--,(k=st[Yt])&&(k.__u|=131072)),k==null||k.__v===null?(Yt==-1&&vt--,typeof dt.type!="function"&&(dt.__u|=65536)):Yt!==pt&&(Yt===pt+1?vt++:Yt>pt?te>mt-pt?vt+=Yt-pt:vt--:Yt<pt?Yt==pt-1&&(vt=Yt-pt):vt=0,Yt!==ct+vt&&(dt.__u|=65536))):(k=st[pt])&&k.key==null&&k.__e&&(131072&k.__u)==0&&(k.__e==$.__d&&($.__d=x(k)),I(k,k,!1),st[pt]=null,te--);if(te)for(ct=0;ct<Xt;ct++)(k=st[ct])!=null&&(131072&k.__u)==0&&(k.__e==$.__d&&($.__d=x(k)),I(k,k))}function S($,_,st){var ct,dt;if(typeof $.type=="function"){for(ct=$.__k,dt=0;ct&&dt<ct.length;dt++)ct[dt]&&(ct[dt].__=$,_=S(ct[dt],_,st));return _}$.__e!=_&&(st.insertBefore($.__e,_||null),_=$.__e);do _=_&&_.nextSibling;while(_!=null&&_.nodeType===8);return _}function A($,_){return _=_||[],$==null||typeof $=="boolean"||(d($)?$.some((function(st){A(st,_)})):_.push($)),_}function D($,_,st,ct){var dt=$.key,k=$.type,pt=st-1,Yt=st+1,mt=_[st];if(mt===null||mt&&dt==mt.key&&k===mt.type&&(131072&mt.__u)==0)return st;if(ct>(mt!=null&&(131072&mt.__u)==0?1:0))for(;pt>=0||Yt<_.length;){if(pt>=0){if((mt=_[pt])&&(131072&mt.__u)==0&&dt==mt.key&&k===mt.type)return pt;pt--}if(Yt<_.length){if((mt=_[Yt])&&(131072&mt.__u)==0&&dt==mt.key&&k===mt.type)return Yt;Yt++}}return-1}function N($,_,st){_[0]==="-"?$.setProperty(_,st??""):$[_]=st==null?"":typeof st!="number"||h.test(_)?st:st+"px"}function R($,_,st,ct,dt){var k;t:if(_==="style")if(typeof st=="string")$.style.cssText=st;else{if(typeof ct=="string"&&($.style.cssText=ct=""),ct)for(_ in ct)st&&_ in st||N($.style,_,"");if(st)for(_ in st)ct&&st[_]===ct[_]||N($.style,_,st[_])}else if(_[0]==="o"&&_[1]==="n")k=_!==(_=_.replace(/(PointerCapture)$|Capture$/i,"$1")),_=_.toLowerCase()in $||_==="onFocusOut"||_==="onFocusIn"?_.toLowerCase().slice(2):_.slice(2),$.l||($.l={}),$.l[_+k]=st,st?ct?st.u=ct.u:(st.u=l,$.addEventListener(_,k?a:c,k)):$.removeEventListener(_,k?a:c,k);else{if(dt=="http://www.w3.org/2000/svg")_=_.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(_!="width"&&_!="height"&&_!="href"&&_!="list"&&_!="form"&&_!="tabIndex"&&_!="download"&&_!="rowSpan"&&_!="colSpan"&&_!="role"&&_ in $)try{$[_]=st??"";break t}catch{}typeof st=="function"||(st==null||st===!1&&_[4]!=="-"?$.removeAttribute(_):$.setAttribute(_,st))}}function T($){return function(_){if(this.l){var st=this.l[_.type+$];if(_.t==null)_.t=l++;else if(_.t<st.u)return;return st(n.event?n.event(_):_)}}}function M($,_,st,ct,dt,k,pt,Yt,mt,Xt){var te,vt,ee,se,fe,ye,ve,ce,ge,be,ke,Se,_e,Ce,de,xe=_.type;if(_.constructor!==void 0)return null;128&st.__u&&(mt=!!(32&st.__u),k=[Yt=_.__e=st.__e]),(te=n.__b)&&te(_);t:if(typeof xe=="function")try{if(ce=_.props,ge=(te=xe.contextType)&&ct[te.__c],be=te?ge?ge.props.value:te.__:ct,st.__c?ve=(vt=_.__c=st.__c).__=vt.__E:("prototype"in xe&&xe.prototype.render?_.__c=vt=new xe(ce,be):(_.__c=vt=new C(ce,be),vt.constructor=xe,vt.render=V),ge&&ge.sub(vt),vt.props=ce,vt.state||(vt.state={}),vt.context=be,vt.__n=ct,ee=vt.__d=!0,vt.__h=[],vt._sb=[]),vt.__s==null&&(vt.__s=vt.state),xe.getDerivedStateFromProps!=null&&(vt.__s==vt.state&&(vt.__s=v({},vt.__s)),v(vt.__s,xe.getDerivedStateFromProps(ce,vt.__s))),se=vt.props,fe=vt.state,vt.__v=_,ee)xe.getDerivedStateFromProps==null&&vt.componentWillMount!=null&&vt.componentWillMount(),vt.componentDidMount!=null&&vt.__h.push(vt.componentDidMount);else{if(xe.getDerivedStateFromProps==null&&ce!==se&&vt.componentWillReceiveProps!=null&&vt.componentWillReceiveProps(ce,be),!vt.__e&&(vt.shouldComponentUpdate!=null&&vt.shouldComponentUpdate(ce,vt.__s,be)===!1||_.__v===st.__v)){for(_.__v!==st.__v&&(vt.props=ce,vt.state=vt.__s,vt.__d=!1),_.__e=st.__e,_.__k=st.__k,_.__k.forEach((function(re){re&&(re.__=_)})),ke=0;ke<vt._sb.length;ke++)vt.__h.push(vt._sb[ke]);vt._sb=[],vt.__h.length&&pt.push(vt);break t}vt.componentWillUpdate!=null&&vt.componentWillUpdate(ce,vt.__s,be),vt.componentDidUpdate!=null&&vt.__h.push((function(){vt.componentDidUpdate(se,fe,ye)}))}if(vt.context=be,vt.props=ce,vt.__P=$,vt.__e=!1,Se=n.__r,_e=0,"prototype"in xe&&xe.prototype.render){for(vt.state=vt.__s,vt.__d=!1,Se&&Se(_),te=vt.render(vt.props,vt.state,vt.context),Ce=0;Ce<vt._sb.length;Ce++)vt.__h.push(vt._sb[Ce]);vt._sb=[]}else do vt.__d=!1,Se&&Se(_),te=vt.render(vt.props,vt.state,vt.context),vt.state=vt.__s;while(vt.__d&&++_e<25);vt.state=vt.__s,vt.getChildContext!=null&&(ct=v(v({},ct),vt.getChildContext())),ee||vt.getSnapshotBeforeUpdate==null||(ye=vt.getSnapshotBeforeUpdate(se,fe)),H($,d(de=te!=null&&te.type===b&&te.key==null?te.props.children:te)?de:[de],_,st,ct,dt,k,pt,Yt,mt,Xt),vt.base=_.__e,_.__u&=-161,vt.__h.length&&pt.push(vt),ve&&(vt.__E=vt.__=null)}catch(re){_.__v=null,mt||k!=null?(_.__e=Yt,_.__u|=mt?160:32,k[k.indexOf(Yt)]=null):(_.__e=st.__e,_.__k=st.__k),n.__e(re,_,st)}else k==null&&_.__v===st.__v?(_.__k=st.__k,_.__e=st.__e):_.__e=W(st.__e,_,st,ct,dt,k,pt,mt,Xt);(te=n.diffed)&&te(_)}function L($,_,st){_.__d=void 0;for(var ct=0;ct<st.length;ct++)F(st[ct],st[++ct],st[++ct]);n.__c&&n.__c(_,$),$.some((function(dt){try{$=dt.__h,dt.__h=[],$.some((function(k){k.call(dt)}))}catch(k){n.__e(k,dt.__v)}}))}function W($,_,st,ct,dt,k,pt,Yt,mt){var Xt,te,vt,ee,se,fe,ye,ve=st.props,ce=_.props,ge=_.type;if(ge==="svg"?dt="http://www.w3.org/2000/svg":ge==="math"?dt="http://www.w3.org/1998/Math/MathML":dt||(dt="http://www.w3.org/1999/xhtml"),k!=null){for(Xt=0;Xt<k.length;Xt++)if((se=k[Xt])&&"setAttribute"in se==!!ge&&(ge?se.localName===ge:se.nodeType===3)){$=se,k[Xt]=null;break}}if($==null){if(ge===null)return document.createTextNode(ce);$=document.createElementNS(dt,ge,ce.is&&ce),k=null,Yt=!1}if(ge===null)ve===ce||Yt&&$.data===ce||($.data=ce);else{if(k=k&&t.call($.childNodes),ve=st.props||f,!Yt&&k!=null)for(ve={},Xt=0;Xt<$.attributes.length;Xt++)ve[(se=$.attributes[Xt]).name]=se.value;for(Xt in ve)if(se=ve[Xt],Xt!="children"){if(Xt=="dangerouslySetInnerHTML")vt=se;else if(Xt!=="key"&&!(Xt in ce)){if(Xt=="value"&&"defaultValue"in ce||Xt=="checked"&&"defaultChecked"in ce)continue;R($,Xt,null,se,dt)}}for(Xt in ce)se=ce[Xt],Xt=="children"?ee=se:Xt=="dangerouslySetInnerHTML"?te=se:Xt=="value"?fe=se:Xt=="checked"?ye=se:Xt==="key"||Yt&&typeof se!="function"||ve[Xt]===se||R($,Xt,se,ve[Xt],dt);if(te)Yt||vt&&(te.__html===vt.__html||te.__html===$.innerHTML)||($.innerHTML=te.__html),_.__k=[];else if(vt&&($.innerHTML=""),H($,d(ee)?ee:[ee],_,st,ct,ge==="foreignObject"?"http://www.w3.org/1999/xhtml":dt,k,pt,k?k[0]:st.__k&&x(st,0),Yt,mt),k!=null)for(Xt=k.length;Xt--;)k[Xt]!=null&&m(k[Xt]);Yt||(Xt="value",fe!==void 0&&(fe!==$[Xt]||ge==="progress"&&!fe||ge==="option"&&fe!==ve[Xt])&&R($,Xt,fe,ve[Xt],dt),Xt="checked",ye!==void 0&&ye!==$[Xt]&&R($,Xt,ye,ve[Xt],dt))}return $}function F($,_,st){try{typeof $=="function"?$(_):$.current=_}catch(ct){n.__e(ct,st)}}function I($,_,st){var ct,dt;if(n.unmount&&n.unmount($),(ct=$.ref)&&(ct.current&&ct.current!==$.__e||F(ct,null,_)),(ct=$.__c)!=null){if(ct.componentWillUnmount)try{ct.componentWillUnmount()}catch(k){n.__e(k,_)}ct.base=ct.__P=null}if(ct=$.__k)for(dt=0;dt<ct.length;dt++)ct[dt]&&I(ct[dt],_,st||typeof $.type!="function");st||$.__e==null||m($.__e),$.__c=$.__=$.__e=$.__d=void 0}function V($,_,st){return this.constructor($,st)}function O($,_,st){var ct,dt,k,pt;n.__&&n.__($,_),dt=(ct=!1)?null:_.__k,k=[],pt=[],M(_,$=_.__k=y(b,null,[$]),dt||f,f,_.namespaceURI,dt?null:_.firstChild?t.call(_.childNodes):null,k,dt?dt.__e:_.firstChild,ct,pt),L(k,$,pt)}function j($,_,st){var ct,dt,k,pt,Yt=v({},$.props);for(k in $.type&&$.type.defaultProps&&(pt=$.type.defaultProps),_)k=="key"?ct=_[k]:k=="ref"?dt=_[k]:Yt[k]=_[k]===void 0&&pt!==void 0?pt[k]:_[k];return arguments.length>2&&(Yt.children=arguments.length>3?t.call(arguments,2):st),g($.type,Yt,ct||$.key,dt||$.ref,null)}function q($,_){var st={__c:_="__cC"+s++,__:$,Consumer:function(ct,dt){return ct.children(dt)},Provider:function(ct){var dt,k;return this.getChildContext||(dt=[],(k={})[_]=this,this.getChildContext=function(){return k},this.shouldComponentUpdate=function(pt){this.props.value!==pt.value&&dt.some((function(Yt){Yt.__e=!0,P(Yt)}))},this.sub=function(pt){dt.push(pt);var Yt=pt.componentWillUnmount;pt.componentWillUnmount=function(){dt.splice(dt.indexOf(pt),1),Yt&&Yt.call(pt)}}),ct.children}};return st.Provider.__=st.Consumer.contextType=st}t=p.slice,n={__e:function($,_,st,ct){for(var dt,k,pt;_=_.__;)if((dt=_.__c)&&!dt.__)try{if((k=dt.constructor)&&k.getDerivedStateFromError!=null&&(dt.setState(k.getDerivedStateFromError($)),pt=dt.__d),dt.componentDidCatch!=null&&(dt.componentDidCatch($,ct||{}),pt=dt.__d),pt)return dt.__E=dt}catch(Yt){$=Yt}throw $}},e=0,C.prototype.setState=function($,_){var st;st=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=v({},this.state),typeof $=="function"&&($=$(v({},st),this.props)),$&&v(st,$),$!=null&&this.__v&&(_&&this._sb.push(_),P(this))},C.prototype.forceUpdate=function($){this.__v&&(this.__e=!0,$&&this.__h.push($),P(this))},C.prototype.render=b,r=[],u=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=function($,_){return $.__v.__b-_.__v.__b},U.__r=0,l=0,c=T(!1),a=T(!0),s=0;var B,K,z,G,J=0,Q=[],X=[],Y=n,Z=Y.__b,tt=Y.__r,nt=Y.diffed,et=Y.__c,_t=Y.unmount,rt=Y.__;function ot($,_){Y.__h&&Y.__h(K,$,J||_),J=0;var st=K.__H||(K.__H={__:[],__h:[]});return $>=st.__.length&&st.__.push({__V:X}),st.__[$]}function ut($){return J=1,it(wt,$)}function it($,_,st){var ct=ot(B++,2);if(ct.t=$,!ct.__c&&(ct.__=[wt(void 0,_),function(Yt){var mt=ct.__N?ct.__N[0]:ct.__[0],Xt=ct.t(mt,Yt);mt!==Xt&&(ct.__N=[Xt,ct.__[1]],ct.__c.setState({}))}],ct.__c=K,!K.u)){var dt=function(Yt,mt,Xt){if(!ct.__c.__H)return!0;var te=ct.__c.__H.__.filter((function(ee){return!!ee.__c}));if(te.every((function(ee){return!ee.__N})))return!k||k.call(this,Yt,mt,Xt);var vt=!1;return te.forEach((function(ee){if(ee.__N){var se=ee.__[0];ee.__=ee.__N,ee.__N=void 0,se!==ee.__[0]&&(vt=!0)}})),!(!vt&&ct.__c.props===Yt)&&(!k||k.call(this,Yt,mt,Xt))};K.u=!0;var k=K.shouldComponentUpdate,pt=K.componentWillUpdate;K.componentWillUpdate=function(Yt,mt,Xt){if(this.__e){var te=k;k=void 0,dt(Yt,mt,Xt),k=te}pt&&pt.call(this,Yt,mt,Xt)},K.shouldComponentUpdate=dt}return ct.__N||ct.__}function lt($,_){var st=ot(B++,3);!Y.__s&&xt(st.__H,_)&&(st.__=$,st.i=_,K.__H.__h.push(st))}function at($){return J=5,ft((function(){return{current:$}}),[])}function ft($,_){var st=ot(B++,7);return xt(st.__H,_)?(st.__V=$(),st.i=_,st.__h=$,st.__V):st.__}function yt(){for(var $;$=Q.shift();)if($.__P&&$.__H)try{$.__H.__h.forEach(bt),$.__H.__h.forEach(Ct),$.__H.__h=[]}catch(_){$.__H.__h=[],Y.__e(_,$.__v)}}Y.__b=function($){K=null,Z&&Z($)},Y.__=function($,_){$&&_.__k&&_.__k.__m&&($.__m=_.__k.__m),rt&&rt($,_)},Y.__r=function($){tt&&tt($),B=0;var _=(K=$.__c).__H;_&&(z===K?(_.__h=[],K.__h=[],_.__.forEach((function(st){st.__N&&(st.__=st.__N),st.__V=X,st.__N=st.i=void 0}))):(_.__h.forEach(bt),_.__h.forEach(Ct),_.__h=[],B=0)),z=K},Y.diffed=function($){nt&&nt($);var _=$.__c;_&&_.__H&&(_.__H.__h.length&&(Q.push(_)!==1&&G===Y.requestAnimationFrame||((G=Y.requestAnimationFrame)||kt)(yt)),_.__H.__.forEach((function(st){st.i&&(st.__H=st.i),st.__V!==X&&(st.__=st.__V),st.i=void 0,st.__V=X}))),z=K=null},Y.__c=function($,_){_.some((function(st){try{st.__h.forEach(bt),st.__h=st.__h.filter((function(ct){return!ct.__||Ct(ct)}))}catch(ct){_.some((function(dt){dt.__h&&(dt.__h=[])})),_=[],Y.__e(ct,st.__v)}})),et&&et($,_)},Y.unmount=function($){_t&&_t($);var _,st=$.__c;st&&st.__H&&(st.__H.__.forEach((function(ct){try{bt(ct)}catch(dt){_=dt}})),st.__H=void 0,_&&Y.__e(_,st.__v))};var gt=typeof requestAnimationFrame=="function";function kt($){var _,st=function(){clearTimeout(ct),gt&&cancelAnimationFrame(_),setTimeout($)},ct=setTimeout(st,100);gt&&(_=requestAnimationFrame(st))}function bt($){var _=K,st=$.__c;typeof st=="function"&&($.__c=void 0,st()),K=_}function Ct($){var _=K;$.__c=$.__(),K=_}function xt($,_){return!$||$.length!==_.length||_.some((function(st,ct){return st!==$[ct]}))}function wt($,_){return typeof _=="function"?_($):_}var Pt=function($,_,st,ct){var dt;_[0]=0;for(var k=1;k<_.length;k++){var pt=_[k++],Yt=_[k]?(_[0]|=pt?1:2,st[_[k++]]):_[++k];pt===3?ct[0]=Yt:pt===4?ct[1]=Object.assign(ct[1]||{},Yt):pt===5?(ct[1]=ct[1]||{})[_[++k]]=Yt:pt===6?ct[1][_[++k]]+=Yt+"":pt?(dt=$.apply(Yt,Pt($,Yt,st,["",null])),ct.push(dt),Yt[0]?_[0]|=2:(_[k-2]=0,_[k]=dt)):ct.push(Yt)}return ct},Ut=new Map;function Ht($){var _=Ut.get(this);return _||(_=new Map,Ut.set(this,_)),(_=Pt(this,_.get($)||(_.set($,_=(function(st){for(var ct,dt,k=1,pt="",Yt="",mt=[0],Xt=function(ee){k===1&&(ee||(pt=pt.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?mt.push(0,ee,pt):k===3&&(ee||pt)?(mt.push(3,ee,pt),k=2):k===2&&pt==="..."&&ee?mt.push(4,ee,0):k===2&&pt&&!ee?mt.push(5,0,!0,pt):k>=5&&((pt||!ee&&k===5)&&(mt.push(k,0,pt,dt),k=6),ee&&(mt.push(k,ee,0,dt),k=6)),pt=""},te=0;te<st.length;te++){te&&(k===1&&Xt(),Xt(te));for(var vt=0;vt<st[te].length;vt++)ct=st[te][vt],k===1?ct==="<"?(Xt(),mt=[mt],k=3):pt+=ct:k===4?pt==="--"&&ct===">"?(k=1,pt=""):pt=ct+pt[0]:Yt?ct===Yt?Yt="":pt+=ct:ct==='"'||ct==="'"?Yt=ct:ct===">"?(Xt(),k=1):k&&(ct==="="?(k=5,dt=pt,pt=""):ct==="/"&&(k<5||st[te][vt+1]===">")?(Xt(),k===3&&(mt=mt[0]),k=mt,(mt=mt[0]).push(2,0,k),k=0):ct===" "||ct==="	"||ct===`
`||ct==="\r"?(Xt(),k=2):pt+=ct),k===3&&pt==="!--"&&(k=4,mt=mt[0])}return Xt(),mt})($)),_),arguments,[])).length>1?_:_[0]}var Et=Ht.bind(y),St={};function At($,_){for(var st in _)$[st]=_[st];return $}function Dt($,_,st){var ct,dt=/(?:\?([^#]*))?(#.*)?$/,k=$.match(dt),pt={};if(k&&k[1])for(var Yt=k[1].split("&"),mt=0;mt<Yt.length;mt++){var Xt=Yt[mt].split("=");pt[decodeURIComponent(Xt[0])]=decodeURIComponent(Xt.slice(1).join("="))}$=Tt($.replace(dt,"")),_=Tt(_||"");for(var te=Math.max($.length,_.length),vt=0;vt<te;vt++)if(_[vt]&&_[vt].charAt(0)===":"){var ee=_[vt].replace(/(^:|[+*?]+$)/g,""),se=(_[vt].match(/[+*?]+$/)||St)[0]||"",fe=~se.indexOf("+"),ye=~se.indexOf("*"),ve=$[vt]||"";if(!ve&&!ye&&(se.indexOf("?")<0||fe)){ct=!1;break}if(pt[ee]=decodeURIComponent(ve),fe||ye){pt[ee]=$.slice(vt).map(decodeURIComponent).join("/");break}}else if(_[vt]!==$[vt]){ct=!1;break}return(st.default===!0||ct!==!1)&&pt}function Nt($,_){return $.rank<_.rank?1:$.rank>_.rank?-1:$.index-_.index}function Rt($,_){return $.index=_,$.rank=(function(st){return st.props.default?0:Tt(st.props.path).map(Mt).join("")})($),$.props}function Tt($){return $.replace(/(^\/+|\/+$)/g,"").split("/")}function Mt($){return $.charAt(0)==":"?1+"*+?".indexOf($.charAt($.length-1))||4:5}var Lt={},Wt=[],Ft=[],It=null,Vt={url:jt()},Ot=q(Vt);function jt(){var $;return""+(($=It&&It.location?It.location:It&&It.getCurrentLocation?It.getCurrentLocation():typeof location<"u"?location:Lt).pathname||"")+($.search||"")}function qt($,_){return _===void 0&&(_=!1),typeof $!="string"&&$.url&&(_=$.replace,$=$.url),(function(st){for(var ct=Wt.length;ct--;)if(Wt[ct].canRoute(st))return!0;return!1})($)&&(function(st,ct){ct===void 0&&(ct="push"),It&&It[ct]?It[ct](st):typeof history<"u"&&history[ct+"State"]&&history[ct+"State"](null,null,st)})($,_?"replace":"push"),Bt($)}function Bt($){for(var _=!1,st=0;st<Wt.length;st++)Wt[st].routeTo($)&&(_=!0);return _}function Kt($){if($&&$.getAttribute){var _=$.getAttribute("href"),st=$.getAttribute("target");if(_&&_.match(/^\//g)&&(!st||st.match(/^_?self$/i)))return qt(_)}}function zt($){return $.stopImmediatePropagation&&$.stopImmediatePropagation(),$.stopPropagation&&$.stopPropagation(),$.preventDefault(),!1}function Gt($){if(!($.ctrlKey||$.metaKey||$.altKey||$.shiftKey||$.button)){var _=$.target;do if(_.localName==="a"&&_.getAttribute("href")){if(_.hasAttribute("data-native")||_.hasAttribute("native"))return;if(Kt(_))return zt($)}while(_=_.parentNode)}}var Jt=!1;function Qt($){$.history&&(It=$.history),this.state={url:$.url||jt()}}At(Qt.prototype=new C,{shouldComponentUpdate:function($){return $.static!==!0||$.url!==this.props.url||$.onChange!==this.props.onChange},canRoute:function($){var _=A(this.props.children);return this.g(_,$)!==void 0},routeTo:function($){this.setState({url:$});var _=this.canRoute($);return this.p||this.forceUpdate(),_},componentWillMount:function(){this.p=!0},componentDidMount:function(){var $=this;Jt||(Jt=!0,It||addEventListener("popstate",(function(){Bt(jt())})),addEventListener("click",Gt)),Wt.push(this),It&&(this.u=It.listen((function(_){var st=_.location||_;$.routeTo(""+(st.pathname||"")+(st.search||""))}))),this.p=!1},componentWillUnmount:function(){typeof this.u=="function"&&this.u(),Wt.splice(Wt.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function($,_){$=$.filter(Rt).sort(Nt);for(var st=0;st<$.length;st++){var ct=$[st],dt=Dt(_,ct.props.path,ct.props);if(dt)return[ct,dt]}},render:function($,_){var st,ct,dt=$.onChange,k=_.url,pt=this.c,Yt=this.g(A($.children),k);if(Yt&&(ct=j(Yt[0],At(At({url:k,matches:st=Yt[1]},st),{key:void 0,ref:void 0}))),k!==(pt&&pt.url)){At(Vt,pt=this.c={url:k,previous:pt&&pt.url,current:ct,path:ct?ct.props.path:null,matches:st}),pt.router=this,pt.active=ct?[ct]:[];for(var mt=Ft.length;mt--;)Ft[mt]({});typeof dt=="function"&&dt(pt)}return y(Ot.Provider,{value:pt},ct)}});const switchIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='652.000000pt'%20height='956.000000pt'%20viewBox='0%200%20652.000000%20956.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,956.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M1150%209540%20c-386%20-6%20-408%20-8%20-475%20-29%20-147%20-48%20-255%20-115%20-368%20-226%20-93%20-91%20-145%20-159%20-191%20-250%20-74%20-146%20-77%20-163%20-87%20-455%20-10%20-318%20-14%20-7639%20-4%20-7725%2025%20-214%20107%20-394%20245%20-539%20115%20-121%20227%20-192%20408%20-260%20l72%20-28%202418%20-1%20c2586%20-2%202582%20-2%202716%2047%20254%2092%20492%20346%20573%20611%2017%2058%2018%20211%2018%204095%20l0%204035%20-23%2075%20c-61%20193%20-204%20388%20-368%20501%20-76%2052%20-226%20118%20-294%20129%20-36%206%20-229%2015%20-430%2020%20-398%2010%20-3557%2010%20-4210%200z%20m4610%20-328%20c164%20-59%20291%20-175%20374%20-339%20l36%20-73%200%20-4016%200%20-4016%20-45%20-88%20c-25%20-48%20-70%20-115%20-101%20-148%20-64%20-71%20-175%20-148%20-242%20-168%20-103%20-32%20-400%20-35%20-2687%20-32%20-2180%203%20-2282%204%20-2335%2022%20-204%2068%20-363%20240%20-417%20452%20-17%2065%20-18%20275%20-18%203979%200%203785%201%203912%2019%203980%2024%2091%2084%20207%20140%20271%2055%2062%20182%20152%20244%20171%2027%208%20121%2018%20222%2022%2096%205%201203%208%202460%207%20l2285%20-1%2065%20-23z'/%3e%3cpath%20d='M1434%208128%20l-45%20-41%203%20-3291%20c3%20-3127%204%20-3293%2021%20-3323%209%20-18%2029%20-41%2044%20-50%2026%20-17%20125%20-18%201799%20-18%201918%200%201808%20-3%201834%2054%207%2014%2016%2067%2021%20116%205%2050%209%20789%209%201644%20l0%201554%20249%20981%20c358%201405%20401%201581%20401%201626%200%2051%204%2046%20-414%20468%20l-321%20322%20-1778%200%20-1777%200%20-46%20-42z%20m3636%20-425%20l165%20-168%20-185%20-6%20c-102%20-4%20-770%20-7%20-1485%20-8%20l-1300%20-1%20-145%20148%20c-80%2081%20-156%20159%20-170%20175%20l-23%2027%201489%200%201490%200%20164%20-167z%20m-3078%20-356%20l31%20-38%20-147%20-583%20c-81%20-320%20-153%20-602%20-160%20-626%20-12%20-39%20-13%20-23%20-19%20185%20-9%20291%20-9%20823%200%201123%20l6%20233%20129%20-128%20c71%20-70%20143%20-145%20160%20-166z%20m2900%20-136%20c278%20-3%20510%20-9%20513%20-13%2010%20-10%203%20-40%20-305%20-1260%20l-280%20-1107%200%20-1565%200%20-1566%20-1565%200%20-1565%200%200%201521%200%201520%20310%201226%20c171%20675%20313%201229%20316%201232%2014%2014%201788%2022%202576%2012z'/%3e%3cpath%20d='M3765%206820%20c-61%20-25%20-87%20-94%20-185%20-473%20-80%20-315%20-120%20-493%20-120%20-540%200%20-77%2078%20-141%20163%20-134%2069%206%20101%2040%20131%20141%2057%20190%20197%20746%20212%20843%205%2032%201%2053%20-19%2096%20-22%2048%20-30%2057%20-64%2066%20-44%2013%20-90%2013%20-118%201z'/%3e%3cpath%20d='M3098%203406%20c-104%20-37%20-216%20-134%20-264%20-227%20-24%20-47%20-28%20-71%20-35%20-184%20-19%20-311%20-7%20-500%2037%20-586%2040%20-80%20113%20-151%20201%20-195%20l76%20-39%20151%200%20151%200%2068%2034%20c81%2041%20167%20128%20215%20218%20l32%2061%200%20302%200%20302%20-41%2078%20c-65%20127%20-156%20201%20-284%20235%20-73%2019%20-255%2019%20-307%201z%20m262%20-311%20c58%20-30%2064%20-57%2068%20-301%204%20-219%204%20-222%20-19%20-253%20-65%20-88%20-230%20-95%20-286%20-13%20-16%2024%20-18%2055%20-21%20273%20l-3%20246%2038%2030%20c21%2017%2045%2033%2053%2036%2025%2011%20137%20-1%20170%20-18z'/%3e%3c/g%3e%3c/svg%3e",buttonIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M790%201280%20l0%20-420%2065%200%2065%200%200%20420%200%20420%20-65%200%20-65%200%200%20-420z'/%3e%3cpath%20d='M489%201612%20c-228%20-114%20-386%20-309%20-451%20-557%20-29%20-110%20-29%20-297%200%20-406%2081%20-301%20308%20-530%20607%20-610%20112%20-30%20307%20-30%20420%200%20294%2077%20529%20312%20606%20606%2029%20110%2030%20307%201%20416%20-67%20251%20-245%20462%20-477%20565%20l-55%2024%200%20-74%200%20-74%2072%20-42%20c280%20-167%20411%20-508%20313%20-817%20-35%20-110%20-88%20-196%20-175%20-283%20-87%20-87%20-172%20-139%20-285%20-177%20-70%20-23%20-96%20-27%20-210%20-27%20-114%200%20-140%204%20-210%2027%20-293%2097%20-495%20372%20-495%20673%200%2070%2025%20193%2055%20266%2054%20133%20182%20279%20299%20339%20l66%2034%200%2078%20c0%2042%20-1%2077%20-2%2077%20-2%200%20-37%20-18%20-79%20-38z'/%3e%3c/g%3e%3c/svg%3e",timerIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='171.000000pt'%20height='171.000000pt'%20viewBox='0%200%20171.000000%20171.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,171.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M818%201670%20c-24%20-15%20-31%20-77%20-23%20-221%208%20-141%2015%20-159%2064%20-159%2050%200%2060%2024%2063%20150%20l3%20115%2030%20-3%20c172%20-19%20366%20-132%20472%20-275%2094%20-129%20133%20-236%20140%20-392%206%20-142%20-12%20-230%20-73%20-355%20-82%20-165%20-236%20-296%20-419%20-357%20-71%20-24%20-95%20-27%20-215%20-27%20-118%200%20-145%203%20-212%2026%20-123%2041%20-204%2092%20-298%20187%20-68%2068%20-94%20103%20-127%20171%20-61%20125%20-76%20203%20-71%20352%206%20153%2036%20243%20122%20371%2064%2095%2068%20127%2021%20149%20-39%2017%20-68%202%20-113%20-59%20-94%20-127%20-150%20-285%20-159%20-449%20-23%20-399%20236%20-749%20632%20-855%20111%20-30%20297%20-30%20410%200%20449%20119%20716%20562%20610%201011%20-23%2095%20-105%20254%20-173%20336%20-111%20131%20-276%20234%20-442%20274%20-89%2021%20-213%2026%20-242%2010z'/%3e%3cpath%20d='M452%201258%20c-7%20-7%20-12%20-17%20-12%20-23%200%20-21%20330%20-469%20358%20-487%2043%20-28%20106%20-23%20143%2010%2043%2038%2052%20113%2020%20154%20-20%2025%20-454%20342%20-484%20354%20-7%202%20-18%20-1%20-25%20-8z'/%3e%3c/g%3e%3c/svg%3e",owIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='110.000000pt'%20height='52.000000pt'%20viewBox='0%200%20110.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M171%20500%20c-50%20-12%20-83%20-41%20-111%20-96%20-22%20-43%20-25%20-62%20-24%20-149%200%20-141%2027%20-199%20109%20-236%2073%20-33%20180%20-16%20227%2037%2067%2076%2074%20284%2013%20376%20-39%2059%20-133%2089%20-214%2068z%20m119%20-65%20c50%20-26%2065%20-67%2065%20-180%200%20-146%20-32%20-195%20-128%20-195%20-40%200%20-54%205%20-77%2028%20-16%2016%20-34%2049%20-40%2073%20-16%2056%20-7%20186%2014%20227%2030%2057%20105%2078%20166%2047z'/%3e%3cpath%20d='M482%20483%20c3%20-10%2029%20-120%2058%20-245%20l54%20-228%2038%200%20c43%200%2035%20-20%2089%20215%2017%2077%2035%20146%2038%20152%204%207%2026%20-73%2051%20-178%20l44%20-190%2039%203%2040%203%2058%20240%20c32%20132%2058%20241%2059%20243%200%202%20-15%202%20-32%200%20l-32%20-3%20-43%20-180%20c-23%20-99%20-44%20-187%20-46%20-195%20-2%20-8%20-25%2074%20-51%20183%20l-48%20198%20-36%20-3%20-36%20-3%20-45%20-194%20c-25%20-106%20-47%20-188%20-49%20-181%20-3%207%20-23%2095%20-46%20194%20l-42%20181%20-33%203%20c-28%203%20-33%201%20-29%20-15z'/%3e%3c/g%3e%3c/svg%3e",encoderIcon="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='34.000000pt'%20height='52.000000pt'%20viewBox='0%200%2034.000000%2052.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,52.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M30%20255%20l0%20-245%20150%200%20150%200%200%2030%200%2030%20-115%200%20-115%200%200%2085%200%2085%2095%200%2095%200%200%2030%200%2030%20-95%200%20-95%200%200%2070%200%2070%20115%200%20115%200%200%2030%200%2030%20-150%200%20-150%200%200%20-245z'/%3e%3c/g%3e%3c/svg%3e",Icons={switchIcon:$=>Et`
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
    </svg>`},tipColors={green:"bg-green-100 text-green-900 ring-green-300",yellow:"bg-yellow-100 text-yellow-900 ring-yellow-300"};function Button({title:$,onclick:_,disabled:st,cls:ct,icon:dt,ref:k,colors:pt,hovercolor:Yt,disabledcolor:mt}){const[Xt,te]=ut(!1),vt=function(ee){const se=_?_():null;se&&typeof se.catch=="function"&&(te(!0),se.catch(()=>!1).then(()=>te(!1)))};return pt||(pt="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400"),Et` <button
    type="button"
    class="inline-flex justify-center items-center gap-2 rounded px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ${pt} ${ct}"
    ref=${k}
    onclick=${vt}
    disabled=${st||Xt}
  >
    ${$}
    <${Xt?Icons.refresh:dt} class="w-4 ${Xt?"animate-spin":""}" />
  <//>`}function Login({loginFn:$,logoIcon:_,title:st,tipText:ct}){const[dt,k]=ut(""),[pt,Yt]=ut(""),mt=function(Xt){const vt={Authorization:"Basic "+btoa(dt+":"+pt)};return fetch("api/login",{headers:vt}).then($).finally(ee=>Yt(""))};return Et` <div
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
  <//>`}const ruLangswitch=["","ID - уникальный числовой идентификатор выключателя. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","Device connection - Здесь указаны пины одного или нескольких устройств, с которыми взаимодействует данный выключатель.",'INFO - Укажите название данного выключателя для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение обработчика состояния на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек и соединений выключателя."],ruLangselect=["","ID - уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type(s) of pin(s) - Выберите режим работы данного пина из предложенных вариантов."],rulangbutton=["","ID - уникальный числовой идентификатор кнопки. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Pullup type - тип подтяжки (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP).","sclick - Выполняемая команда при одинарном клике кнопки.","dclick - Выполняемая команда при двойном клике кнопки.","lpress - Выполняемая команда при удержании кнопки.",'INFO - Укажите название данной кнопки для быстрой навигации, например "Кухня", "Детская" и т.д. Не более 30-ти символов!',"On/Off - Включение или отключение функции кнопки на данном пине.","Action - Кнопка Edit позволяет зайти в меню настроек кнопки."],ruencoder=["","ID - уникальный числовой идентификатор энкодера. Присваивается автоматически.","Pin - Уникальный номер пина.","Encoder A (ID) - Основной пин энкодера A (DT).","Encoder B (ID) - Дополнительный пин энкодера B (CLK).","PWM connection - Подключение ШИМ для управления яркостью (диммер).","Dimmer value (0-100) - Текущее значение диммера от 0 до 100.","Duty on restore - Восстановление значения скважности (яркости) при включении контроллера.","INFO - Укажите название данного энкодера для быстрой навигации.","On/Off - Включение или отключение обработчика энкодера.","Action - Кнопка Edit позволяет зайти в меню настроек энкодера.","PWM Frequency - Частота ШИМ управляемого устройства (в герцах).","Resolution (steps) - Максимальное количество шагов от 0 до 100% для ШИМ устройства."],rulangtimers=["","No - Уникальный числовой идентификатор задачи (cron). Присваивается автоматически.","Cron - Сконфигурируйте расписание (cron) для выполнения задачи.","Script - Какое действие (скрипт) должно выполниться в указанное в таймере время.",'Info - Дайте название выбранному таймеру для быстрой навигации, например "Полив газона". Не более 30-ти символов!',"On/Off - Вкл/Откл выполнение данной задачи.","Action - Кнопка Edit позволяет зайти в меню настроек задачи."],rulangsettings=["","Login - Введите имя пользователя для входа в систему. Используется при авторизации в веб-интерфейсе.","Password - Введите пароль для входа в систему. Рекомендуется использовать надёжный пароль.","Time zone UTC - Выберите свой часовой пояс. Влияет на отображение времени и расчёт восхода/заката.","IP address - Введите статический IP-адрес устройства. После перезагрузки STM32 будет доступен по этому адресу. Формат: 192.168.1.100","Subnet mask - Введите маску подсети. Определяет диапазон адресов вашей локальной сети. Формат: 255.255.255.0","Default gateway - Введите IP-адрес шлюза по умолчанию (обычно адрес вашего роутера). Формат: 192.168.1.1","Token - Секретный ключ для авторизации API-запросов. Используется в URL командах управления устройством. Пример: /api/Token/switch?id=1&onoff=1","Host - Введите IP-адрес или доменное имя MQTT-брокера. Пример: 192.168.1.50 или broker.hivemq.com","Port - Укажите порт MQTT-брокера. Стандартный порт: 1883 (без шифрования), 8883 (с TLS).","Client - Уникальный идентификатор клиента MQTT. Каждое устройство должно иметь свой уникальный Client ID.","User - Имя пользователя для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","Password - Пароль для подключения к MQTT-брокеру. Оставьте пустым, если брокер не требует авторизации.","TX topic - Исходящий топик MQTT. На этот топик устройство публикует свои данные и события. Пример: Swarm","RX topic - Входящий топик MQTT. С этого топика устройство получает команды управления. Пример: Swarm","HTTPS domain - Доменное имя для HTTPS-соединения. Необходим действующий SSL-сертификат для этого домена. Пример: zagotovka.ddns.net",'Private Key - Закрытый ключ SSL-сертификата в формате PEM. Начинается с "-----BEGIN EC PRIVATE KEY-----". Хранится в зашифрованном виде.','Public Key - Публичный сертификат SSL в формате PEM. Начинается с "-----BEGIN CERTIFICATE-----". Используется для HTTPS-соединения.',"Longitude - Долгота вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 37.618 (Москва)","Latitude - Широта вашего местоположения для расчёта восхода и заката. Округлите до 3-х знаков после запятой. Пример: 55.751 (Москва)","Sunrise - Время восхода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на восходе.","Sunset - Время захода солнца рассчитывается автоматически по заданным координатам. Ползунок включает/отключает выполнение действия на закате.","Day Length - Продолжительность светового дня, рассчитывается автоматически на основе координат и текущей даты.","Next full moon - Дата и время следующего полнолуния, рассчитывается автоматически.","Date - Дата для автономного (offline) режима в формате дд.мм.гг. Используется когда нет доступа к NTP-серверу. Пример: 15.03.25","Time - Время для автономного (offline) режима в формате чч:мм:сс. Используется когда нет доступа к NTP-серверу. Пример: 14:30:00"],ruLangsecurity=["","RXD Pin - Пин приема данных (RX).","TXD Pin - Пин передачи данных (TX).","Phone Number - Номер телефона для отправки SMS и звонков.","Info - Дополнительная информация для быстрой навигации.","OnOff - Включение или отключение модуля SIM800L.","Action - Кнопка Edit позволяет зайти в меню настроек."],ruLangsecuritypins=["","ID - уникальный числовой идентификатор пина. Присваивается автоматически.","Pin - Уникальный номер цифрового или аналогового пина.","Type of sensor - Тип подключенного сенсора (PIR, Normal open, Normal close).","Action - Действие, выполняемое при срабатывании сенсора.","Send SMS - Отправлять ли SMS при срабатывании сенсора (YES/NO).","INFO - Дополнительная информация для быстрой навигации.","On/Off - Включение или отключение охранного пина.","Edit Pin - Редактирование настроек охранного пина."],rulange1Wire=["","ID - Уникальный числовой идентификатор. Присваивается автоматически.","Pin - Уникальный номер цифрового пина, к которому подключена шина 1-Wire.","Selected sensor - Адрес выбранного и привязанного к этому пину уникального 1-Wire датчика (например, DS18B20).","Count of sensors - Количество найденных 1-Wire температурных датчиков на данном пине.","On/Off - Функция включения или отключения опроса подключенных датчиков на данной шине.","Actions - Кнопка Edit для привязки конкретного датчика к этому соединению."],enLangswitch=["","ID - A unique numerical identifier of the switch. Assigned automatically","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","Device connection - Here will appear one or more devices/relays of pin(s) with which this switch interacts.",'INFO - Give a name of this switch for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the switch state handler on this pin.","Action - The Edit button allows you to access the switch settings menu."],enLangselect=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type(s) of pin(s) - Select the operating mode of this pin from the provided options."],enlangbutton=["","ID - A unique numerical identifier of the button. Assigned automatically.","PIN - The unique number of the digital or analog pin.","Pullup type (EXTERNAL_PULLDOWN, INTERNAL_PULLUP, EXTERNAL_PULLUP)","sclick - Command to execute when the button is pressed once.","dclick - Command to execute when the button is pressed twice.","lpress - Command to execute when the button is long pressed.",'INFO - Give a name of this button for quick navigation. Example: "Kitchen", "Children room", etc. Max. 30 characters!',"On/Off - Enable or disable the button function on this pin.","Action - The Edit button allows you to access the button settings menu."],enencoder=["","ID - A unique numerical identifier of the encoder. Assigned automatically.","PIN - The unique number of the pin.","Encoder A (ID) - Main pin of encoder A (DT).","Encoder B (ID) - Additional pin of encoder B (CLK).","PWM connection - PWM connection for brightness control (dimmer).","Dimmer value (0-100) - Current dimmer value from 0 to 100.","Duty on restore - Value of duty cycle (brightness) to restore when the controller is turned on.","INFO - Give a name to this encoder for quick navigation.","On/Off - Enable or disable the encoder handler.","Action - The Edit button allows you to access the encoder settings menu.","PWM Frequency - PWM frequency of the controlled device (in Hertz).","Resolution (steps) - Maximum number of steps from 0 to 100% for the PWM device."],enlangtimers=["","No - A unique numerical identifier of the task (cron). Assigned automatically.","Cron - Configure a schedule (cron) to perform the action.","Script - What action (script) must be performed at the time specified in the timer.",'Info - Give a name to the selected timer for quick navigation, e.g."Lawn Watering", "Backyard Light", etc. No more than 30 characters!',"On/Off - Enable or disable the execution of this task.","Action - The Edit button allows you to access the task settings menu."],enlangsettings=["","Login - Enter the username for logging into the system. Used for web interface authentication.","Password - Enter your password for the system. It is recommended to use a strong password.","Time zone UTC - Select your time zone. Affects time display and sunrise/sunset calculations.","IP address - Enter a static IP address for the device. After reboot, STM32 will be available at this address. Format: 192.168.1.100","Subnet mask - Enter the subnet mask. Defines the range of addresses in your local network. Format: 255.255.255.0","Default gateway - Enter the default gateway IP address (usually your router address). Format: 192.168.1.1","Token - Secret key for API request authorization. Used in device control URL commands. Example: /api/Token/switch?id=1&onoff=1","Host - Enter the IP address or domain name of the MQTT broker. Example: 192.168.1.50 or broker.hivemq.com","Port - Specify the MQTT broker port. Standard port: 1883 (no encryption), 8883 (with TLS).","Client - Unique MQTT client identifier. Each device must have its own unique Client ID.","User - Username for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","Password - Password for connecting to the MQTT broker. Leave empty if the broker does not require authorization.","TX topic - Outgoing MQTT topic. The device publishes its data and events to this topic. Example: Swarm","RX topic - Incoming MQTT topic. The device receives control commands from this topic. Example: Swarm","HTTPS domain - Domain name for HTTPS connection. A valid SSL certificate for this domain is required. Example: zagotovka.ddns.net",'Private Key - SSL certificate private key in PEM format. Starts with "-----BEGIN EC PRIVATE KEY-----". Stored in encrypted form.','Public Key - SSL public certificate in PEM format. Starts with "-----BEGIN CERTIFICATE-----". Used for HTTPS connection.',"Longitude - Longitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 37.618 (Moscow)","Latitude - Latitude of your location for sunrise/sunset calculation. Round to 3 decimal places. Example: 55.751 (Moscow)","Sunrise - Sunrise time is calculated automatically based on your coordinates. The slider enables/disables the action at sunrise.","Sunset - Sunset time is calculated automatically based on your coordinates. The slider enables/disables the action at sunset.","Day Length - Duration of daylight, calculated automatically based on coordinates and current date.","Next full moon - Date and time of the next full moon, calculated automatically.","Date - Date for offline mode in dd.mm.yy format. Used when there is no access to the NTP server. Example: 15.03.25","Time - Time for offline mode in hh:mm:ss format. Used when there is no access to the NTP server. Example: 14:30:00"],enLangsecurity=["","RXD Pin - Receive Data Pin (RX).","TXD Pin - Transmit Data Pin (TX).","Phone Number - Phone number for SMS notifications and calls.","Info - Additional information for quick navigation.","OnOff - Enable or disable the SIM800L module.","Action - The Edit button allows you to access the settings menu."],enLangsecuritypins=["","ID - A unique numerical identifier of the pin. Assigned automatically.","Pin - The unique number of the digital or analog pin.","Type of sensor - Type of connected sensor (PIR, Normal open, Normal close).","Action - Action to perform when the sensor is triggered.","Send SMS - Whether to send SMS when the sensor is triggered (YES/NO).","INFO - Additional information for quick navigation.","On/Off - Enable or disable the security pin.","Edit Pin - The Edit button allows you to access the security pin settings."],enlange1Wire=["","ID - A unique numerical identifier. Assigned automatically.","Pin - The unique number of the digital pin to which the 1-Wire bus is connected.","Selected sensor - Address of the selected and bound unique 1-Wire sensor to this pin (e.g., DS18B20).","Count of sensors - Number of found 1-Wire temperature sensors on this pin.","On/Off - The function of enabling or disabling polling of connected sensors on this bus.","Actions - The Edit button to bind a specific sensor to this connection."];function initGlobalTooltip$7(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,Yt=window.innerWidth,mt=dt.getBoundingClientRect();let Xt=mt.left+mt.width/2-k/2;Xt=Math.max(8,Math.min(Xt,Yt-k-8));let te=mt.top-pt-8;te<8&&(te=mt.bottom+8),$.style.left=Xt+"px",$.style.top=te+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabSelect({}){const[$,_]=ut(null),[st,ct]=ut({}),[dt,k]=ut(null),[pt,Yt]=ut(!1),[mt,Xt]=ut(3),[te,vt]=ut(!1),[ee,se]=ut("ru");lt(()=>{initGlobalTooltip$7()},[]);const fe=de=>{vt(de)},ye=de=>te&&(de===1||de===35),ve=()=>fetch("api/select/get").then(de=>de.json()).then(de=>{const xe=de.data||de;_(xe),vt(de.sim800l===1),de.lang&&se(de.lang);const re={};xe.forEach(he=>{re[`topin_${he.id}`]=he.topin.toString()}),ct(re)});lt(ve,[]),lt(()=>{let de;return pt&&mt>0?de=setTimeout(()=>{Xt(mt-1)},1e3):mt===0&&(Yt(!1),k(null)),()=>clearTimeout(de)},[pt,mt]);const ce=async de=>{de.preventDefault();const xe=new FormData(de.target),re={lang:ee,sim800l:te?1:0,data:[]};$.forEach(he=>{const me=xe.get(`topin_${he.id}`);re.data.push({id:he.id,pins:he.pins,topin:parseInt(me),pwm:he.pwm,i2cdata:he.i2cdata,i2cclok:he.i2cclok})}),k("submitting"),Yt(!0),Xt(3);try{const he=await fetch("api/select/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(re)});if(!he.ok)throw new Error("Network response was not ok");const me=await he.json();k("success"),console.log("Success:",me);const ae={};re.data.forEach(Te=>{ae[`topin_${Te.id}`]=Te.topin.toString()}),ct(Te=>({...Te,...ae})),ve()}catch(he){k("error"),console.error("Error:",he)}},ge=de=>{const{name:xe,value:re}=de.target;ct(he=>({...he,[xe]:re}))};if(!$)return"";const be=()=>({langselect:ee==="ru"?ruLangselect:enLangselect}),ke=(de,xe)=>{const re=be(),me=(re[de]&&re[de][xe]?re[de][xe]:"").split(" "),ae=[];for(let Te=0;Te<me.length;Te+=15)ae.push(me.slice(Te,Te+15).join(" "));return ae.join("<br>")},Se=de=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      style=${de.center?"text-align: center":""}
      data-tip=${ke("langselect",de.tooltipIndex)}
    >
      ${de.title}
    </th>
  `,_e=({id:de,value:xe,label:re,disabled:he=!1,onChange:me,checked:ae})=>Et`
    <div class="relative">
      <input
        id="${de}_${xe}"
        class="sr-only peer"
        type="radio"
        name="topin_${de}"
        value="${xe}"
        checked=${ae}
        onChange=${me}
        disabled=${he}
        aria-label="${re}"
      />
      <label
        for="${de}_${xe}"
        class="cursor-pointer px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300 
               ${he?"text-gray-400 cursor-not-allowed opacity-60":"text-slate-700 hover:bg-black/5"}
               peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-cyan-500 peer-checked:text-white peer-checked:shadow-sm"
      >
        ${re}
      </label>
    </div>
  `,Ce=({d:de})=>Et`
    <tr class="${ye(de.id)?"bg-red-200/50 opacity-50 pointer-events-none":de.id%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-2 text-sm text-slate-800">${de.id}</td>
      <td class="px-6 py-2 text-sm text-slate-800 font-medium">${de.pins}</td>
      <td class="px-2 py-2">
        <div class="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
          <${_e} id=${de.id} value="0"  label="NONE"     checked=${st[`topin_${de.id}`]==="0"}  onChange=${ge} />
          <${_e} id=${de.id} value="3"  label="SWITCH"   checked=${st[`topin_${de.id}`]==="3"}  onChange=${ge} />
          <${_e} id=${de.id} value="1"  label="BUTTON"   checked=${st[`topin_${de.id}`]==="1"}  onChange=${ge} />
          <${_e} id=${de.id} value="2"  label="DEVICE"   checked=${st[`topin_${de.id}`]==="2"}  onChange=${ge} />
          <${_e} id=${de.id} value="4"  label="1-WIRE"   checked=${st[`topin_${de.id}`]==="4"}  onChange=${ge} />
          <${_e} id=${de.id} value="5"  label="PWM"      disabled=${de.pwm==0} checked=${st[`topin_${de.id}`]==="5"}  onChange=${ge} />
          <${_e} id=${de.id} value="8"  label="Enc.OutA" checked=${st[`topin_${de.id}`]==="8"}  onChange=${ge} />
          <${_e} id=${de.id} value="9"  label="Enc.OutB" checked=${st[`topin_${de.id}`]==="9"}  onChange=${ge} />
          <${_e} id=${de.id} value="10" label="Security" disabled=${de.monitoring==0} checked=${st[`topin_${de.id}`]==="10"} onChange=${ge} />
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

        <form onSubmit=${ce}>
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <button
              type="submit"
              class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${pt?"bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none":"bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"}`}
              disabled=${pt}
            >
              ${pt?`Please wait ${mt} sec.`:"Submit"}
            </button>

            <div class="flex items-center gap-3">
              <span class="text-slate-600 font-bold uppercase tracking-widest text-2xl drop-shadow-sm">SIM800L</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  checked=${te}
                  onChange=${de=>fe(de.target.checked)}
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
              class=${`px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${pt?"bg-gray-400 cursor-not-allowed opacity-70 hover:scale-100 hover:shadow-none":"bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"}`}
              disabled=${pt}
            >
              ${pt?`Please wait ${mt} sec.`:"Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `}function ModalSwitch({modalType:$,page:_,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedSwitch:k,onSwitchChange:pt,connectionOptions:Yt,SliderComponent:mt=MyPolzunok}){const[Xt,te]=ut((k==null?void 0:k.info)||""),[vt,ee]=ut((k==null?void 0:k.onoff)||0),[se,fe]=ut((k==null?void 0:k.ptype)||0),[ye,ve]=ut((k==null?void 0:k.setrpins)||""),[ce,ge]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(ae=>{if(!ae.ok)throw new Error(`HTTP error! status: ${ae.status}`);return ae.json()}).then(ae=>{if(!ae||!ae.data||!Array.isArray(ae.data)){console.error("Invalid data format:",ae),ge([]);return}const Te=ae.data.filter(Zt=>Zt.topin===2);ge(Te)}).catch(ae=>{console.error("Error fetching pin config:",ae),ge([])})},[]);const be=ae=>{ae.preventDefault();const Te=new FormData(ae.target),Zt=Object.fromEntries(Te);if(Zt.id=k.id,Zt.pins=k.pins,$==="edit")Zt.onoff=vt;else if($==="connection"){const ie=ce.find(ht=>ht.pins===Zt.setrpins);ie&&(Zt.pinact={...k.pinact,[ie.id]:ie.pins})}fetch("/api/switch/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Zt)}).then(ie=>ie.json()).then(ie=>{console.log("Success:",ie),pt({...k,...Zt}),st(),window.location.href="/#/switch"}).catch(ie=>{console.error("Error:",ie)})},ke=ae=>{ve(ae.target.value)},Se=ae=>{fe(parseInt(ae.target.value))},_e=ae=>{te(ae.target.value)},Ce=ae=>{ee(ae)},de=ae=>{ct&&ae.target===ae.currentTarget&&st()},xe=()=>{fe(0),te(""),ee(0)},he=Et`
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
                        value=${ce.some(ae=>ae.pins===ye)?ye:""}
                        onchange=${ke}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select a connection</option>
                        ${ce.map(ae=>Et`
                            <option value=${ae.pins}>
                              ${ae.pins} (ID: ${ae.id})
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
                        value=${se}
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
                      <${mt}
                        value=${vt}
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
  `,me=at(null);return lt(()=>{const ae=document.createElement("div");return ae.id="modal-portal",document.body.appendChild(ae),me.current=ae,()=>{O(null,ae),document.body.removeChild(ae)}},[]),lt(()=>{me.current&&O(he,me.current)}),null}function initGlobalTooltip$6(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block";const k=dt.getBoundingClientRect();$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const pt=$.offsetWidth,Yt=$.offsetHeight,mt=window.innerWidth;let Xt=k.left+k.width/2-pt/2;Xt=Math.max(8,Math.min(Xt,mt-pt-8));let te=k.top-Yt-8;te<8&&(te=k.bottom+8),$.style.left=Xt+"px",$.style.top=te+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabSwitch({}){const[$,_]=ut(null),[st,ct]=ut(null),[dt,k]=ut(!1),[pt,Yt]=ut(null),[mt,Xt]=ut(null),[te,vt]=ut(!1),[ee,se]=ut("ru"),[fe,ye]=ut(null),[ve,ce]=ut([]),[ge,be]=ut(""),[ke,Se]=ut(!1);lt(()=>{initGlobalTooltip$6()},[]);const _e=()=>Promise.all([fetch("/api/switch/get").then(oe=>oe.json()),fetch("/api/pintopin/get").then(oe=>oe.json())]).then(([oe,pe])=>{se(oe.lang),ye(oe.switches),_(oe),ce(pe),be(`Pintopin data: ${JSON.stringify(pe,null,2)}

Switch data: ${JSON.stringify(oe.switches,null,2)}`),console.log("Pintopin data:",pe),console.log("Switch data:",oe.switches)}).catch(oe=>{console.error("Error fetching data:",oe),be(`Error fetching data: ${oe.message}`)}),Ce=()=>{fetch("/api/switch/get").then(oe=>oe.json()).then(oe=>{ye(oe.switches),se(oe.lang),console.log("Updated switch data:",oe.switches)}).catch(oe=>{console.error("Error fetching switch data:",oe)})},de=()=>{fetch("/api/pintopin/get").then(oe=>oe.json()).then(oe=>{ce(oe),console.log("Updated pintopin data:",oe)}).catch(oe=>{console.error("Error fetching pintopin data:",oe)})};lt(()=>{Ce(),de();const oe=setInterval(()=>{Ce(),de()},1e3);return()=>clearInterval(oe)},[]);const xe=oe=>{const pe=new Map,Ie=fe.find($e=>$e.id===oe);return Ie&&Ie.pinact&&Object.entries(Ie.pinact).forEach(([$e,we])=>{pe.set($e,{pin:$e,relayId:we})}),ve.forEach($e=>{if($e.idin===oe){const we=`${$e.pins}(${$e.idout})`;pe.has(we)||pe.set(we,{pin:$e.pins,relayId:$e.idout})}}),Array.from(pe.values())},re=()=>({langswitch:ee==="ru"?ruLangswitch:enLangswitch}),he=(oe,pe)=>{const Ie=re(),we=(Ie[oe]&&Ie[oe][pe]||"").split(" "),Ee=[];let $t="";for(let ne=0;ne<we.length;ne++){const ue=we[ne];$t.length+ue.length+1<=200?$t+=($t.length>0?" ":"")+ue:($t.length>0&&Ee.push($t),$t=ue)}return $t.length>0&&Ee.push($t),Ee.join("<br>")},me=(oe,pe)=>{console.log("Удаление соединения:",oe,pe);const[Ie,$e]=pe.split("("),we=$e?parseInt($e):null;fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:oe,pin:Ie.trim()})}).then(Ee=>Ee.json()).then(Ee=>{ct(Ee),ye($t=>$t.map(ne=>{if(ne.id===oe){const ue={...ne.pinact};return delete ue[Ie.trim()],{...ne,pinact:ue}}return ne})),ce($t=>$t.filter(ne=>!(ne.idin===oe&&ne.pins===Ie.trim()&&(we===null||ne.idout===we))))}).then(()=>{console.log("Соединение удалено успешно"),_e()}).catch(Ee=>{console.error("Ошибка при удалении соединения:",Ee)})},ae=(oe,pe)=>{Yt(oe),Xt(pe),k(!0)},Te=()=>{k(!1),Yt(null),Xt(null)},Zt=oe=>{console.log("handleSwitchChange:",oe),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:oe.id,onoff:oe.onoff})}).then(pe=>pe.json()).then(pe=>{console.log("Response from /api/onoff/set:",pe)}).catch(pe=>{console.error("Error calling /api/onoff/set:",pe)}),Te()},ie={ru:Et`
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
    `},ht=oe=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${he("langswitch",oe.tooltipIndex)}
    >
      ${oe.title}
    </th>
  `,le=({d:oe,index:pe})=>{const Ie=xe(oe.id);return Et`
      <tr class="${pe%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${oe.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${oe.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][oe.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono">
          ${Ie.map(({pin:$e,relayId:we})=>Et`
              <span class="mr-2 inline-flex items-center">
                ${$e}${we!==void 0?`(${we})`:""}
                <button
                  onClick=${Ee=>{Ee.preventDefault(),me(oe.id,`${$e}(${we})`)}}
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
            onChange=${$e=>Zt({...oe,onoff:$e})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>ae("connection",oe)}
            class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
          >
            Connection
          </button>
          <span class="text-slate-300">|</span>
          <button
            onClick=${()=>ae("edit",oe)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors ml-2"
          >
            Edit
          </button>
        </td>
      </tr>
    `};return fe?Et`
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
                    ${fe.map((oe,pe)=>Et`<${le} d=${oe} index=${pe} key=${oe.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>vt(!te)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${te?"Hide Help":"Show Help"}
              </button>
            </div>

            ${te&&Et`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${ie[ee]}
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
              selectedSwitch=${mt}
              onSwitchChange=${Zt}
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
  `,portalRef=at(null);return lt(()=>{const $=document.createElement("div");return $.id="modal-portal",document.body.appendChild($),portalRef.current=$,()=>{O(null,$),document.body.removeChild($)}},[]),lt(()=>{portalRef.current&&O(modalContent,portalRef.current)}),null};function initGlobalTooltip$5(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,Yt=window.innerWidth,mt=dt.getBoundingClientRect();let Xt=mt.left+mt.width/2-k/2;Xt=Math.max(8,Math.min(Xt,Yt-k-8));let te=mt.top-pt-8;te<8&&(te=mt.bottom+8),$.style.left=Xt+"px",$.style.top=te+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabButton=()=>{const[$,_]=ut(null),[st,ct]=ut([]),[dt,k]=ut(null),[pt,Yt]=ut(null),[mt,Xt]=ut(!1),[te,vt]=ut(null),[ee,se]=ut(null),[fe,ye]=ut(!1),[ve,ce]=ut("ru"),[ge,be]=ut(""),[ke,Se]=ut(!0);lt(()=>{initGlobalTooltip$5()},[]);const _e={ru:Et`
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
    `},Ce=()=>{fetch("/api/button/get").then(ht=>ht.json()).then(ht=>{k(ht.buttons),ce(ht.lang),console.log("Updated button data:",ht.buttons)}).catch(ht=>{console.error("Error fetching button data:",ht)})};lt(()=>{Ce();let ht;return ke&&(ht=setInterval(()=>{Ce()},1e3)),()=>{ht&&clearInterval(ht)}},[ke]);const de=ht=>{const le=new Map,oe=dt.find(pe=>pe.id===ht);return oe&&oe.pinact&&Object.entries(oe.pinact).forEach(([pe,Ie])=>{le.set(pe,{pin:pe,relayId:Ie})}),st.forEach(pe=>{if(pe.idin===ht){const Ie=`${pe.pins}(${pe.idout})`;le.has(Ie)||le.set(Ie,{pin:pe.pins,relayId:pe.idout})}}),Array.from(le.values())},xe=()=>({langbutton:ve==="ru"?rulangbutton:enlangbutton}),re=(ht,le)=>{const oe=xe(),pe=oe[ht]&&oe[ht][le]?oe[ht][le]:"";return he(pe)},he=(ht,le=100)=>{if(!ht||typeof ht!="string")return"";const oe=[];let pe="";const Ie=ht.split(`
`);return Ie.forEach(($e,we)=>{$e.split(" ").filter($t=>$t.length>0).forEach($t=>{const ne=pe.length===0?$t:" "+$t;pe.length+ne.length<=le?pe+=ne:(pe.length>0&&oe.push(pe),pe=$t)}),pe.length>0&&(oe.push(pe),pe=""),we<Ie.length-1&&oe.push("")}),pe.length>0&&oe.push(pe),oe.join(`
`)},me=(ht,le)=>{vt(ht),se(le),Xt(!0),Se(!1)},ae=()=>{Xt(!1),vt(null),se(null),Se(!0)},Te=ht=>{console.log("handleButtonChange:",ht),k(le=>le.map(oe=>oe.id===ht.id?{...oe,...ht}:oe)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ht.id,onoff:ht.onoff})}).then(le=>le.json()).then(le=>{console.log("Response from /api/onoff/set:",le)}).catch(le=>{console.error("Error calling /api/onoff/set:",le)}),ae()},Zt=ht=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${re("langbutton",ht.tooltipIndex)}
    >
      ${ht.title}
    </th>
  `,ie=({d:ht,index:le})=>(de(ht.id),Et`
      <tr class="${le%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-2 text-sm text-slate-800">${ht.id}</td>
        <td class="px-6 py-2 text-sm text-slate-800 font-medium">${ht.pins}</td>
        <td class="px-6 py-2 text-sm text-slate-700">
          ${["None","GPIO_PULLUP","GPIO_PULLDOWN"][ht.ptype]}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${he(ht.sclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${he(ht.dclick)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-700 font-mono max-w-[250px] whitespace-pre-wrap break-words overflow-hidden text-ellipsis">
          ${he(ht.lpress)}
        </td>
        <td class="px-6 py-2 text-sm text-slate-600">${ht.info}</td>
        <td class="px-6 py-2">
          <${MyPolzunok}
            value=${ht.onoff}
            onChange=${oe=>Te({...ht,onoff:oe})}
          />
        </td>
        <td class="px-6 py-2 text-sm">
          <button
            onClick=${()=>me("edit",ht)}
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
                      <${Zt} title="ID" tooltipIndex=${1} />
                      <${Zt} title="Pin" tooltipIndex=${2} />
                      <${Zt} title="Pullup type" tooltipIndex=${3} />
                      <${Zt} title="SINGLE CLICK" tooltipIndex=${4} />
                      <${Zt} title="DOUBLE CLICK" tooltipIndex=${5} />
                      <${Zt} title="LONG PRESS" tooltipIndex=${6} />
                      <${Zt} title="INFO" tooltipIndex=${7} />
                      <${Zt} title="On/Off" tooltipIndex=${8} />
                      <${Zt} title="Action" tooltipIndex=${9} />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/40">
                    ${dt.map((ht,le)=>Et`<${ie} d=${ht} index=${le} key=${ht.id} />`)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <button
                onclick=${()=>ye(!fe)}
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
              >
                ${fe?"Hide Help":"Show Help"}
              </button>
            </div>

            ${fe&&Et`
                <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                  ${_e[ve]}
                </div>
              `}
          </div>
        </div>
      </div>
    </div>

    ${mt&&Et`
        <${ModalButton}
          modalType=${te}
          page="TabButton"
          hideModal=${ae}
          title=${te==="connection"?"Edit Connection":"Edit Button pin"}
          selectedButton=${ee}
          onButtonChange=${Te}
        />
      `}
  `:""};function ModalEncoder({modalType:$,page:_,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedEncoder:k,handleEncoderChange:pt,connectionOptions:Yt,SliderComponent:mt=MyPolzunok}){const[Xt,te]=ut((k==null?void 0:k.info)||""),[vt,ee]=ut((k==null?void 0:k.onoff)===1),[se,fe]=ut({pin:(k==null?void 0:k.encdrbpin)||"",id:(k==null?void 0:k.encoderb)||""}),[ye,ve]=ut(Object.entries(k.pinact||{})[0]||["",""]),[ce,ge]=ut([]),[be,ke]=ut([]),[Se,_e]=ut([]),Ce=k.pwmmax||100,[de,xe]=ut(k.dvalue||0),[re,he]=ut(k.ponr||0),[me,ae]=ut(k.pwm||1e7),Te=ne=>Math.round(ne*Ce/100);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store",headers:{"Content-Type":"application/json"}}).then(ne=>{if(!ne.ok)throw new Error(`HTTP error! status: ${ne.status}`);return ne.json()}).then(ne=>{if(!ne||!ne.data||!Array.isArray(ne.data)){console.error("Invalid data format:",ne),ge([]),ke([]),_e([]);return}const ue=ne.data.filter(Me=>Me.topin===2),Oe=ne.data.filter(Me=>Me.topin===9),Pe=ne.data.filter(Me=>Me.topin===5);if(ge(ue),ke(Oe),_e(Pe),k.encoderb||k.encdrbpin){const Me=Oe.find(Ne=>String(Ne.id)===String(k.encoderb)||Ne.pins===k.encdrbpin);fe({pin:Me?Me.pins:"",id:Me?Me.id:""})}}).catch(ne=>{console.error("Error fetching pin config:",ne),ge([]),ke([]),_e([])})},[k]);const Zt=ne=>{if(ne.preventDefault(),!(ne.target instanceof HTMLFormElement))return;let Oe={};if($==="edit")Oe={topin:8,id:k.id,pins:k.pins,pwm:parseInt(me),pwmmax:k.pwmmax,dvalue:parseInt(de),ponr:parseInt(re),info:Xt,onoff:vt?1:0};else if($==="connection"){const Me=ye&&ye[0]&&ye[1]!==void 0?{[ye[0]]:parseInt(ye[1])}:{};Oe={id:k.id,pins:k.pins,pwm:parseInt(me)},se&&se.id!==void 0&&se.id!==""?(Oe.encoderb=parseInt(se.id),Oe.encdrbpin=se.pin):(Oe.encoderb=255,Oe.encdrbpin=""),Oe.pinact=Me}console.log("Sending JSON to STM32:",JSON.stringify(Oe)),fetch("/api/encoder/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Oe)}).then(Pe=>Pe.json()).then(Pe=>{pt({...k,...Oe}),st()}).catch(Pe=>console.error("Error saving encoder:",Pe))},ie=ne=>{te(ne.target.value)},ht=ne=>{ee(ne)},le=ne=>{const ue=be.find(Oe=>Oe.pins===ne.target.value);fe({pin:ne.target.value,id:ue?ue.id:""})},oe=ne=>{if(!ne.target.value)ve(["",""]);else{const ue=ne.target.value.split("|");ve([ue[0],ue[1]])}},pe=ne=>{xe(ne.target.value)},Ie=ne=>{he(ne.target.value)},$e=ne=>{const ue=ne/1e3;return ue<=4e4?{cls:"text-green-600",msg:"Optimal range"}:ue<=2e5?{cls:"text-yellow-600",msg:"Precision might drop"}:{cls:"text-red-600",msg:"Expert mode: low precision"}},Ee=Et`
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
        ${(()=>{if(_==="TabEncoder"){if($==="connection")return Et`
          <form onsubmit=${Zt}>
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
                        value=${be.some(ne=>ne.pins===se.pin)?se.pin:""}
                        onchange=${le}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select Encoder B</option>
                        ${be.map(ne=>Et`
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
                        value=${Se.some(ne=>String(ne.pins)===String(ye[0]))?`${ye[0]}|${ye[1]}`:""}
                        onchange=${oe}
                        class="border rounded p-2 w-full"
                      >
                        <option value="">Select PWM connection</option>
                        ${Se.map(ne=>Et`
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
          <form onsubmit=${Zt}>
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
                        value=${me}
                        oninput=${ne=>ae(ne.target.value)} 
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
                        value=${de}
                        oninput=${pe}
                        class="border rounded p-2 w-full"
                      />
                      <div class="text-xs text-gray-500">
                        ${de}% = ${Te(parseInt(de)||0)} / ${Ce} steps
                      </div>
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">Duty on restore</td>
                    <td class="p-2">
                      <select
                        value=${re}
                        onchange=${Ie}
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
                        oninput=${ie}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${mt}
                        value=${vt}
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
  `,$t=at(null);return lt(()=>{const ne=document.createElement("div");return ne.id="encoder-modal-portal",document.body.appendChild(ne),$t.current=ne,()=>{O(null,ne),document.body.removeChild(ne)}},[]),lt(()=>{$t.current&&O(Ee,$t.current)}),null}function initGlobalTooltip$4(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,Yt=window.innerWidth,mt=dt.getBoundingClientRect();let Xt=mt.left+mt.width/2-k/2;Xt=Math.max(8,Math.min(Xt,Yt-k-8));let te=mt.top-pt-8;te<8&&(te=mt.bottom+8),$.style.left=Xt+"px",$.style.top=te+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabEncoder({}){{const[$,_]=ut(null),[st,ct]=ut(null),[dt,k]=ut(!1),[pt,Yt]=ut(null),[mt,Xt]=ut(null),[te,vt]=ut(!1),[ee,se]=ut("ru"),[fe,ye]=ut([]),ve=at(!1);lt(()=>{initGlobalTooltip$4()},[]);const ce=()=>Promise.all([fetch("/api/encoder/get").then(ht=>ht.json()),fetch("/api/pintopin/get").then(ht=>ht.json())]).then(([ht,le])=>{se(ht.lang),_(ht.encoders),ye(le),console.log("Encoder data:",ht.encoders),console.log("Pintopin data:",le)}).catch(ht=>{console.error("Error fetching data:",ht)}),ge=()=>{fetch("/api/encoder/get").then(ht=>ht.json()).then(ht=>{if(ve.current){console.log("Polling skip: onoff request in flight");return}_(ht.encoders),se(ht.lang),console.log("Updated encoder data:",ht.encoders)}).catch(ht=>{console.error("Error fetching encoder data:",ht)})},be=()=>{fetch("/api/pintopin/get").then(ht=>ht.json()).then(ht=>{ye(ht),console.log("Updated pintopin data:",ht)}).catch(ht=>{console.error("Error fetching pintopin data:",ht)})};lt(()=>{ge(),be();const ht=setInterval(()=>{ge(),be()},500);return()=>clearInterval(ht)},[]);const ke=ht=>{_(le=>le.map(oe=>oe.id===ht.id?ht:oe)),ve.current=!0,fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ht.id,onoff:ht.onoff})}).then(le=>le.json()).then(le=>{console.log("Response from /api/onoff/set (Encoder):",le)}).catch(le=>{console.error("Error calling /api/onoff/set (Encoder):",le)}).finally(()=>{ve.current=!1})},Se=ht=>{const le=$.find(pe=>pe.id===ht),oe=[];return le&&le.pinact&&Object.entries(le.pinact).forEach(([pe,Ie])=>{oe.push({pin:pe,idout:Ie})}),oe},_e=ht=>{const le=ht/1e3;return le<=4e4?{cls:"text-green-600",msg:"✓"}:le<=2e5?{cls:"text-yellow-600",msg:"~"}:{cls:"text-red-600",msg:"!"}},Ce=ht=>{if(!ht)return"—";const le=ht/1e3;return le>=1e6?`${(le/1e6).toFixed(2)} MHz`:le>=1e3?`${(le/1e3).toFixed(1)} kHz`:`${le} Hz`},de=()=>({langbutton:ee==="ru"?ruencoder:enencoder}),xe=(ht,le)=>{const oe=de(),pe=oe[ht]&&oe[ht][le]?oe[ht][le]:"";return re(pe)},re=(ht,le=50)=>{if(!ht||typeof ht!="string")return"";const oe=ht.split(" ");let pe=[],Ie="";for(let $e=0;$e<oe.length;$e++)Ie.length+oe[$e].length+1<=le?Ie+=`${Ie?" ":""}${oe[$e]}`:(Ie&&pe.push(Ie.trim()),Ie=oe[$e]);return Ie&&pe.push(Ie.trim()),pe.join(`
`)},he=(ht,le)=>{console.log("Deleting connection:",ht,le);const oe=le.split("(")[0].trim();fetch("/api/connection/del",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:ht,pin:oe})}).then(pe=>pe.ok?pe.json():pe.text().then(Ie=>{throw new Error(`HTTP error! status: ${pe.status}, message: ${Ie}`)})).then(pe=>{ct(pe),_(Ie=>Ie.map($e=>{if($e.id===ht){const we={...$e.pinact};return delete we[oe],{...$e,pinact:we}}return $e})),ye(Ie=>Ie.filter($e=>!($e.idin===ht&&$e.pins===oe)))}).then(()=>{console.log("Connection deleted successfully"),ce()}).catch(pe=>{console.error("Error deleting connection:",pe)})},me=(ht,le)=>{console.log("Opening modal:",ht,le),Yt(ht),Xt(le),k(!0)},ae=()=>{k(!1),Yt(null),Xt(null)},Te={ru:Et`
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
      `},Zt=({title:ht,tooltipIndex:le})=>Et`
      <th
        class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
        data-tip=${xe("langbutton",le)}
      >
        ${ht}
      </th>
    `,ie=({d:ht,index:le})=>{const oe=Se(ht.id),pe=_e(ht.pwm||0);return Et`
        <tr class="${le%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
          <td class="px-6 py-2 text-sm text-slate-800 font-medium">${ht.pins}(${ht.id})</td>
          <td class="px-6 py-2 text-sm text-slate-700">
            ${ht.encdrbpin?`${ht.encdrbpin}(${ht.encoderb})`:"Not set"}
          </td>
          <td class="px-6 py-2 text-sm text-slate-700 font-mono">
            ${oe.length>0?oe.map(({pin:Ie,idout:$e})=>Et`
                    <span class="mr-2 inline-flex items-center">
                      ${Ie}(${$e})
                      <button
                        onClick=${we=>{we.preventDefault(),he(ht.id,`${Ie}(${$e})`)}}
                        class="ml-1 text-red-500 hover:text-red-700 transition-colors font-bold"
                        title="Remove connection"
                      >
                        [x]
                      </button>
                    </span>
                  `):"Not set"}
          </td>
          <td class="px-6 py-2 text-sm">
            <span class="font-mono text-slate-700">${Ce(ht.pwm)}</span>
            <span class="ml-1 font-bold ${pe.cls}">${pe.msg}</span>
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
              onChange=${Ie=>ke({...ht,onoff:Ie})}
            />
          </td>
          <td class="px-6 py-2 text-sm whitespace-nowrap">
            <button
              onClick=${()=>me("connection",ht)}
              class="text-teal-600 hover:text-cyan-600 font-semibold transition-colors mr-2"
            >
              Connection
            </button>
            <span class="text-slate-300">|</span>
            <button
              onClick=${()=>me("edit",ht)}
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
                        <${Zt} title="Encoder A (ID)" tooltipIndex=${3} />
                        <${Zt} title="Encoder B (ID)" tooltipIndex=${4} />
                        <${Zt} title="PWM connection" tooltipIndex=${5} />
                        <${Zt} title="PWM Frequency" tooltipIndex=${11} />
                        <${Zt} title="Resolution (steps)" tooltipIndex=${12} />
                        <${Zt} title="Dimmer value (0-100)" tooltipIndex=${6} />
                        <${Zt} title="Duty on restore" tooltipIndex=${7} />
                        <${Zt} title="INFO" tooltipIndex=${8} />
                        <${Zt} title="On/Off" tooltipIndex=${9} />
                        <${Zt} title="Action" tooltipIndex=${10} />
                      </tr>
                    </thead>
                    <tbody id="tab1" class="divide-y divide-white/40">
                      ${$.map((ht,le)=>Et`<${ie} d=${ht} index=${le} key=${ht.id} />`)}
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="flex justify-end mt-6">
                <button
                  onclick=${()=>vt(!te)}
                  class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
                >
                  ${te?"Hide Help":"Show Help"}
                </button>
              </div>

              ${te&&Et`
                  <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700">
                    ${Te[ee]}
                  </div>
                `}
            </div>
          </div>
          ${dt&&Et`
              <${ModalEncoder}
                modalType=${pt}
                page="TabEncoder"
                hideModal=${ae}
                title=${pt==="connection"?"Edit Connection":"Edit Encoder"}
                selectedEncoder=${mt}
                handleEncoderChange=${ke}
              />
            `}
        </div>
      </div>
    `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">Loading...</div>`}}function ModalCron({modalType:$,page:_,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedCron:k,handleCronChange:pt,connectionOptions:Yt,modalClass:mt,SliderComponent:Xt=MyPolzunok}){const[te,vt]=ut((k==null?void 0:k.info)||""),[ee,se]=ut((k==null?void 0:k.onoff)===1),[fe,ye]=ut((k==null?void 0:k.activ)||""),[ve,ce]=ut((k==null?void 0:k.cron)||""),[ge,be]=ut(k.setrpins||""),ke=me=>{me.preventDefault();const ae=new FormData(me.target),Te=Object.fromEntries(ae);Te.id=k.id,Te.pins=k.pins,$==="edit"?(Te.onoff=ee?1:0,Te.info=te,Te.cron=ve,Te.activ=fe):$==="connection"&&(Te.setrpins=ge),console.log("Data being sent to server:"),console.log(Te),console.log("Stringified data:"),console.log(JSON.stringify(Te)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Te)}).then(Zt=>Zt.json()).then(Zt=>{console.log("Success:",Zt),pt({...k,...Te}),st(),window.location.href="/#/cron"}).catch(Zt=>{console.error("Error:",Zt)})};lt(()=>{vt((k==null?void 0:k.info)||""),be((k==null?void 0:k.setrpins)||""),se((k==null?void 0:k.onoff)===1)},[k]);const Se=me=>{ce(me.target.value)},_e=me=>{vt(me.target.value)},Ce=me=>{se(me)},de=me=>{ye(me.target.value)},xe=()=>{if(_==="TabCron"&&$==="edit")return Et`
          <form onsubmit=${ke}>
            <div class="modal-body">
              <table class="table-auto w-full">
                <tbody>
                  ${[{label:"ID",value:k.id},{label:"Cron",value:Et`
                        <input
                          type="text"
                          value=${ve}
                          onInput=${Se}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"Script",value:Et`
                        <input
                          type="text"
                          value=${fe}
                          onInput=${de}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"INFO",value:Et`
                        <input
                          type="text"
                          value=${te}
                          onInput=${_e}
                          class="border rounded p-2 w-full"
                        />
                      `},{label:"On/Off",value:Et`<${Xt}
                        value=${ee}
                        onChange=${Ce}
                      />`}].map((me,ae)=>Et`
                      <tr
                        class="${ae%2===1?"bg-white":"bg-gray-200"}"
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
        `},re=Et`
    <div class=${`modal ${mt||""}`}>
      <div class="modal-content">
        <div
          class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onclick=${me=>ct&&me.target===me.currentTarget&&st()}
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
  `,he=at(null);return lt(()=>{const me=document.createElement("div");return me.id="modal-portal",document.body.appendChild(me),he.current=me,()=>{O(null,me),document.body.removeChild(me)}},[]),lt(()=>{he.current&&O(re,he.current)}),null}function ModalPwmCron({modalType:$,page:_,hideModal:st,closeOnOverlayClick:ct=!0,title:dt,selectedCron:k,handleCronChange:pt,modalClass:Yt,SliderComponent:mt=MyPolzunok}){let Xt="",te="900",vt="0",ee="100";if(k!=null&&k.activ&&k.activ.startsWith("pwm:")){const ht=k.activ.substring(4).split(",");ht.length===4&&(Xt=ht[0],te=ht[1],vt=ht[2],ee=ht[3])}const[se,fe]=ut((k==null?void 0:k.info)||""),[ye,ve]=ut((k==null?void 0:k.onoff)===1),[ce,ge]=ut((k==null?void 0:k.cron)||""),[be,ke]=ut(Xt),[Se,_e]=ut(te),[Ce,de]=ut(vt),[xe,re]=ut(ee),[he,me]=ut([]);lt(()=>{fetch("/api/select/get",{method:"GET",cache:"no-store"}).then(ht=>ht.json()).then(ht=>{if(ht&&ht.data&&Array.isArray(ht.data)){const le=ht.data.filter(oe=>oe.topin===5);me(le),!be&&le.length>0&&ke(le[0].id.toString())}}).catch(ht=>console.error("Error fetching pin config:",ht))},[]);const ae=ht=>{ht.preventDefault();const le=new FormData(ht.target),oe=Object.fromEntries(le);oe.id=k.id,oe.pins=k.pins,oe.onoff=ye?1:0,oe.info=se,oe.cron=ce,oe.activ=`pwm:${be},${Se},${Ce},${xe}`,fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(oe)}).then(pe=>pe.json()).then(pe=>{pt({...k,...oe}),st(),window.location.href="/#/cron"}).catch(pe=>console.error("Error:",pe))},Te=()=>Et`
      <form onsubmit=${ae}>
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
                    value=${be}
                    onChange=${ht=>ke(ht.target.value)}
                    class="border rounded p-2 w-full"
                    required
                  >
                    ${he.map(ht=>Et`<option value=${ht.id}>${ht.pins}</option>`)}
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200">
                <td class="p-2 font-bold">Cron Pattern</td>
                <td class="p-2">
                  <input
                    type="text"
                    value=${ce}
                    onInput=${ht=>ge(ht.target.value)}
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
                    value=${Ce}
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
                    onInput=${ht=>re(ht.target.value)}
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
                    value=${se}
                    onInput=${ht=>fe(ht.target.value)}
                    class="border rounded p-2 w-full"
                  />
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-2 font-bold">On/Off</td>
                <td class="p-2">
                  <${mt} value=${ye} onChange=${ve} />
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
    `,Zt=Et`
    <div class=${`modal ${Yt||""}`}>
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
            ${Te()}
          </div>
        </div>
      </div>
    </div>
  `,ie=at(null);return lt(()=>{const ht=document.createElement("div");return ht.id="pwm-modal-portal",document.body.appendChild(ht),ie.current=ht,()=>{O(null,ht),document.body.removeChild(ht)}},[]),lt(()=>{ie.current&&O(Zt,ie.current)}),null}function initGlobalTooltip$3(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,Yt=window.innerWidth,mt=dt.getBoundingClientRect();let Xt=mt.left+mt.width/2-k/2;Xt=Math.max(8,Math.min(Xt,Yt-k-8));let te=mt.top-pt-8;te<8&&(te=mt.bottom+8),$.style.left=Xt+"px",$.style.top=te+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}function TabCron({}){const[$,_]=ut(null),[st,ct]=ut(null);at(null);const[dt,k]=ut(!1),[pt,Yt]=ut(null),[mt,Xt]=ut(null),[te,vt]=ut("ru"),[ee,se]=ut(!1),[fe,ye]=ut(1),[ve,ce]=ut(0);lt(()=>{initGlobalTooltip$3()},[]);const ge=()=>fetch("/api/cron/get").then(Zt=>Zt.json()).then(Zt=>{console.log("API response:",Zt),Zt&&Array.isArray(Zt.timers)?(_(Zt.timers),vt(Zt.lang||"ru"),typeof Zt.numline=="number"&&(ce(Zt.numline),ye(Zt.numline))):(console.error("Unexpected API response structure:",Zt),_([]))}).catch(Zt=>{console.error("Error fetching cron data:",Zt),_([])});lt(()=>{ge()},[]),lt(()=>{be(ve)},[ve]);const be=Zt=>{fetch("/api/numline/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({numline:Zt})}).then(ie=>ie.json()).then(ie=>console.log("Numline sent to stm32:",ie)).catch(ie=>console.error("Error sending Crone line to stm32:",ie))},ke=()=>{if(fe<$.length){const Zt=fe+1;ye(Zt),ce(Zt),be(Zt)}},Se=()=>{if(fe>0){const Zt=fe-1;ye(Zt),ce(Zt),be(Zt)}},_e={ru:Et`
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
    `};if($===null)return Et`<div>Loading...</div>`;const Ce=()=>({langtimers:te==="ru"?rulangtimers:enlangtimers}),de=(Zt,ie)=>{const ht=Ce(),oe=(ht[Zt]&&ht[Zt][ie]?ht[Zt][ie]:"").split(" "),pe=[];for(let Ie=0;Ie<oe.length;Ie+=15)pe.push(oe.slice(Ie,Ie+15).join(" "));return pe.join("<br>")},xe=(Zt,ie)=>{Yt(Zt),Xt(ie),k(!0)},re=()=>{k(!1),Yt(null),Xt(null)},he=Zt=>{console.log("handleCronChange:",Zt),_($.map(ie=>ie.id===Zt.id?Zt:ie)),fetch("/api/cron/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Zt)}).then(ie=>ie.json()).then(ie=>{console.log("Cron job updated successfully:",ie)}).catch(ie=>{console.error("Error updating cron job:",ie)})},me=()=>Array.isArray(mt)?mt.flatMap(Zt=>Zt.pinact?Object.keys(Zt.pinact).map(ie=>({value:ie,label:ie})):[]):mt&&mt.pinact?Object.keys(mt.pinact).map(Zt=>({value:Zt,label:Zt})):[],ae=Zt=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${de("langtimers",Zt.tooltipIndex)}
    >
      ${Zt.title}
    </th>
  `,Te=({d:Zt,index:ie})=>{const ht=Zt.activ&&Zt.activ.startsWith("pwm:");let le=Zt.activ;if(ht){const oe=Zt.activ.substring(4).split(",");oe.length===4&&(le=`pwmID=${oe[0]} | ${oe[1]}s | ${oe[2]}%→${oe[3]}%`)}return Et`
    <tr class="${ie%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
      <td class="px-6 py-4 text-sm text-slate-800 font-medium">${Zt.id}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider">${Zt.cron}</td>
      <td class="px-6 py-4 text-sm text-slate-700 font-mono tracking-wider items-center gap-1 flex justify-start">${le}</td>
      <td class="px-6 py-4 text-sm text-slate-600">${Zt.info}</td>
      <td class="px-6 py-4">
        <${MyPolzunok}
          value=${Zt.onoff}
          onChange=${oe=>he({...Zt,onoff:oe})}
        />
      </td>
     <td class="px-6 py-4 text-center">
        ${ht?Et`
          <button
            onclick=${()=>xe("edit_pwm",Zt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-3"
          >
            Edit
          </button>
          <button
            onclick=${()=>xe("edit_pwm",Zt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap ml-1"
          >
            PWM
          </button>
        `:Et`
       <button
            onclick=${()=>xe("edit",Zt)}
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap mr-2"
          >
            Edit
          </button>
          <button
            onclick=${()=>xe("edit_pwm",Zt)}
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

      <div class="flex-grow flex flex-col justify-center items-center w-full relative z-10">
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
                        ${$.slice(0,fe).map((Zt,ie)=>Et`<${Te} d=${Zt} index=${ie} key=${Zt.id} />`)}
                      </tbody>
                    </table>
                  </div>
                </div>
              `:Et`<div class="flex items-center justify-center p-8 text-slate-500 font-medium">No cron jobs available</div>`}
        </div>
        <div class="w-full flex justify-between items-center mb-4 mt-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4 rounded-2xl">
          <button
            class="px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:shadow-cyan-500/40"
            onclick=${()=>se(!ee)}
          >
            ${ee?"Hide Help":"Show Help"}
          </button>
          <div class="font-semibold text-slate-600 tracking-wide">
            ${$&&$.length-fe>0?`Still available: ${$.length-fe} cron jobs`:"No available: cron jobs!"}
          </div>
          <div class="flex gap-2">
            ${$&&fe<$.length?Et`
                  <button
                    class="bg-emerald-500 hover:bg-emerald-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-emerald-500/30"
                    onclick=${ke}
                    title="Add Cron"
                  >+</button>
                `:null}
            ${fe>0?Et`
                  <button
                    class="bg-rose-500 hover:bg-rose-600 shadow-md text-white font-black text-xl w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center pb-1 shadow-rose-500/30"
                    onclick=${Se}
                    title="Remove Cron"
                  >-</button>
                `:null}
          </div>
        </div>
      </div>

      ${ee&&Et`
        <div class="mt-6 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-slate-700 w-full">
          ${_e[te]}
        </div>
      `}

      ${dt&&pt==="edit_pwm"?Et`
        <${ModalPwmCron}
          modalType=${pt}
          page="TabCron"
          hideModal=${re}
          title="Edit PWM Timer(s)"
          selectedCron=${mt}
          handleCronChange=${he}
          modalClass="mt-24"
        />
      `:dt?Et`
        <${ModalCron}
          modalType=${pt}
          page="TabCron"
          hideModal=${re}
          title=${pt==="edit"?"Edit Timer(s)":"Edit Connection"}
          selectedCron=${mt}
          handleCronChange=${he}
          connectionOptions=${me()}
          modalClass="mt-24"
        />
      `:null}
    </div>
  `}function ModalEditSensor({typsensor:$,oneWireId:_,pins:st,onClose:ct,onUpdate:dt,sensorType:k,sensorData:pt,closeOnOverlayClick:Yt=!0}){const[mt,Xt]=ut({ut:(pt==null?void 0:pt.ut)||$.ut,lt:(pt==null?void 0:pt.lt)||$.lt,action_ut:(pt==null?void 0:pt.action_ut)||$.action_ut,action_lt:(pt==null?void 0:pt.action_lt)||$.action_lt,upphumid:(pt==null?void 0:pt.upphumid)||$.upphumid||0,humlolim:(pt==null?void 0:pt.humlolim)||$.humlolim||0,actuphum:(pt==null?void 0:pt.actuphum)||$.actuphum||"",actlowhum:(pt==null?void 0:pt.actlowhum)||$.actlowhum||"",info:(pt==null?void 0:pt.info)||$.info,onoff:(pt==null?void 0:pt.onoff)||$.onoff||0,humidity:(pt==null?void 0:pt.humidity)||$.humidity||0}),[te,vt]=ut(!1),ee=(be,ke,Se)=>{if(be===""||be==="-")return be;const _e=be.replace(",",".");if(!/^-?\d*\.?\d*$/.test(_e))return null;const Ce=parseFloat(_e);return isNaN(Ce)||Ce<ke||Ce>Se?null:_e},se=be=>{const{name:ke,value:Se}=be.target;if(["ut","lt"].includes(ke)){const _e=ee(Se,-55,125);_e!==null&&Xt(Ce=>({...Ce,[ke]:_e}))}else if(["upphumid","humlolim"].includes(ke)){const _e=ee(Se,0,100);_e!==null&&Xt(Ce=>({...Ce,[ke]:_e}))}else Xt(_e=>({..._e,[ke]:Se}))},fe=be=>{const ke=["ut","lt","upphumid","humlolim"],Se={...be};return ke.forEach(_e=>{Se[_e]===""||Se[_e]==="-"?Se[_e]=0:Se[_e]=parseFloat(Se[_e].toString().replace(",","."))}),Se},ce=Et`
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
        <form onsubmit=${async be=>{be.preventDefault(),vt(!0);const ke=fe(mt);try{if(!(await fetch("/api/sensor/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:_,pins:st,sensorNumber:$.s_number,...ke,s_number:$.s_number,t:$.t})})).ok)throw new Error("Network response was not ok");dt({...$,...ke,oneWireId:_,pins:st,s_number:$.s_number,t:$.t}),ct()}catch(Se){console.error("Error updating Sensor:",Se)}finally{vt(!1)}}}>
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
                      oninput=${se}
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
                      oninput=${se}
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
                      oninput=${se}
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
                      oninput=${se}
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
                            value=${mt.upphumid}
                            oninput=${se}
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
                            oninput=${se}
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
                            oninput=${se}
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
                            oninput=${se}
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
                      oninput=${se}
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
  `,ge=at(null);return lt(()=>{const be=document.createElement("div");return be.id="modal-portal-sensor",document.body.appendChild(be),ge.current=be,()=>{O(null,be),document.body.removeChild(be)}},[]),lt(()=>{ge.current&&O(ce,ge.current)}),null}function ModalOneWire({oneWire:$,onClose:_,onUpdate:st,refresh:ct,closeOnOverlayClick:dt=!0}){console.log("oneWire object:",$);const[k,pt]=ut({typsensor:$.typsensor,numdevices:$.numdevices}),[Yt,mt]=ut(!1),[Xt,te]=ut($.onoff||0),vt=ce=>{dt&&ce.target===ce.currentTarget&&_()},ee=ce=>{const{name:ge,value:be}=ce.target;let ke={...k,[ge]:parseInt(be,10)};ge==="typsensor"&&(be==="0"?ke.numdevices=0:be==="2"&&(ke.numdevices=1)),pt(ke)},se=ce=>{te(ce)},ye=Et`
    <div
      class="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onclick=${vt}
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
        <form onsubmit=${async ce=>{ce.preventDefault(),mt(!0);const ge={id:$.id,pin:$.pin,typsensor:k.typsensor,numdevices:k.numdevices,onoff:Xt};console.log("Sending data:",ge);try{if(!(await fetch("api/onewire/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ge)})).ok)throw new Error("Network response was not ok");const ke={...$,...k,onoff:Xt};st(ke),_()}catch(be){console.error("Error updating OneWire:",be)}finally{mt(!1)}}}>
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
                      onchange=${ee}
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
                      oninput=${k.typsensor===1?ee:void 0}
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
                      onChange=${se}
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
  `,ve=at(null);return lt(()=>{const ce=document.createElement("div");return ce.id="modal-portal-onewire",document.body.appendChild(ce),ve.current=ce,()=>{O(null,ce),document.body.removeChild(ce)}},[]),lt(()=>{ve.current&&O(ye,ve.current)}),null}function initGlobalTooltip$2(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,Yt=window.innerWidth,mt=dt.getBoundingClientRect();let Xt=mt.left+mt.width/2-k/2;Xt=Math.max(8,Math.min(Xt,Yt-k-8));let te=mt.top-pt-8;te<8&&(te=mt.bottom+8),$.style.left=Xt+"px",$.style.top=te+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabOneWire=()=>{const[$,_]=ut([]),[st,ct]=ut(null),[dt,k]=ut(!1),[pt,Yt]=ut(null),[mt,Xt]=ut(null),[te,vt]=ut("ru"),[ee,se]=ut(null);lt(()=>{initGlobalTooltip$2()},[]);const fe=()=>{console.log("Calling initial refresh..."),fetch("/api/onewire/get").then(re=>re.json()).then(re=>{console.log("Initial data received:",re),vt(re.lang||"ru"),_(re.pins||[]),console.log("Initial OneWire state set:",re.pins),ct(null)}).catch(re=>{console.error("Error in refresh:",re),ct(re.message),_([])})},ye=async()=>{try{const he=await(await fetch("/api/temp/get")).json();_(me=>me.map(ae=>{if(!ae.sensors||ae.typsensor!==1&&ae.typsensr!==1&&ae.typsensor!==2&&ae.typsensr!==2)return ae;const Te=ae.sensors.map(Zt=>{var ie,ht;if(ae.typsensor===1||ae.typsensr===1){const le=(ie=he.ds18b20)==null?void 0:ie.find(oe=>oe.addr===Zt.s_number);if(le)return{...Zt,t:le.temp}}else if(ae.typsensor===2||ae.typsensr===2){const le=(ht=he.dht22)==null?void 0:ht.find(oe=>oe.id===ae.id);if(le)return{...Zt,t:le.temp,humidity:le.humidity}}return Zt});return{...ae,sensors:Te}}))}catch(re){console.error("Error in updateSensorData:",re)}};lt(()=>{console.log("Setting up initial data and interval..."),fe();const re=setInterval(ye,1e3);return()=>{clearInterval(re)}},[]);const ve=()=>{k(!1),Yt(null),Xt(null)},ce=re=>{_(he=>he.map(me=>{var ae;if(me.id===re.oneWireId){const Te=((ae=me.sensors)==null?void 0:ae.map(Zt=>Zt.s_number===re.s_number?{...Zt,...re}:Zt))||[];return{...me,sensors:Te}}return me})),ve()},ge=re=>{Xt(re),k(!0)},be=re=>{_(he=>he.map(me=>me.id===re.id?{...me,onoff:re.onoff}:me))},ke=re=>{_(he=>he.map(me=>me.id===re.id?re:me)),ve()};if(st)return Et`<div>Error fetching sensor data: ${st}</div>`;const Se=()=>({lang1Wire:te==="ru"?rulange1Wire:enlange1Wire}),_e=(re,he)=>{const me=Se(),Te=(me[re]&&me[re][he]?me[re][he]:"").split(" "),Zt=[];for(let ie=0;ie<Te.length;ie+=15)Zt.push(Te.slice(ie,ie+15).join(" "));return Zt.join("<br>")},Ce=re=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${_e("lang1Wire",re.tooltipIndex)}
    >
      ${re.title}
    </th>
  `,de=({device:re,index:he})=>{const me=re.pins||re.pin,ae=re.typsensor||re.typsensr||0,Te=re.numdevices||re.numsens||0;return Et`
      <tr class="${he%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${re.id}</td>
        <td class="px-6 py-4 text-sm text-slate-800 font-medium">${me}</td>
        <td class="px-6 py-4 text-sm text-slate-700 font-medium">${["None","DS18B20","DHT22"][ae]}</td>
        <td class="px-6 py-4 text-sm text-slate-700 font-medium">${Te}</td>
        <td class="px-6 py-4">
          <${MyPolzunok}
            value=${re.onoff||0}
            onChange=${Zt=>be({...re,onoff:Zt})}
          />
        </td>
        <td class="px-6 py-4">
          <button
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors whitespace-nowrap"
            onclick=${()=>ge(re)}
          >
            Edit
          </button>
        </td>
      </tr>
      ${ae!==0&&Te>0?Et`
            <tr class="bg-white/40">
              <td colspan="6" class="p-4 md:p-6">
                <div class="w-full">
                  <${xe} d=${re} />
                </div>
              </td>
            </tr>
          `:""}
    `},xe=({d:re})=>{const he=re.typsensor||re.typsensr||0,me=re.numdevices||re.numsens||0;if(he===0||me===0)return Et`
        <div class="px-4 py-2 text-slate-500 font-medium">
          No connected sensors for this OneWire pin.
        </div>
      `;let ae=re.sensors||[];const Te=(Zt,ie)=>{const ht=he===2;return Et`
        <div class="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/60 mb-4 transition-all hover:shadow-xl">
          <div class="font-extrabold text-xl text-slate-700 mb-4 flex justify-between items-center border-b border-slate-200/60 pb-3">
            <span class="tracking-tight drop-shadow-sm">
              ${ht?"DHT22 Sensor":`DS18B20 Sensor (S/N: ${Zt.s_number})`}
            </span>
            <a
              href="#"
              class="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors uppercase tracking-wider bg-white/50 hover:bg-white/80 px-4 py-1.5 rounded-lg shadow-sm"
              onclick=${le=>{le.preventDefault(),Yt({...Zt,oneWireId:re.id,sensorType:he,pins:re.pins||re.pin}),k(!0)}}
            >
              Edit
            </a>
          </div>
          <table class="w-full text-sm text-slate-700">
            <tbody>
              <tr class="hover:bg-slate-100/50 transition-colors rounded-lg">
                <td class="font-semibold py-2 px-2 text-slate-800">Current Temperature:</td>
                <td class="font-mono text-cyan-700 font-bold py-2 px-2 text-right">${Zt.t}°C</td>
              </tr>
              ${ht&&"humidity"in Zt?Et`
                    <tr class="hover:bg-slate-100/50 transition-colors rounded-lg">
                      <td class="font-semibold py-2 px-2 text-slate-800">Current Humidity:</td>
                      <td class="font-mono text-teal-700 font-bold py-2 px-2 text-right">${Zt.humidity}%</td>
                    </tr>
                  `:""}
              <tr class="hover:bg-slate-100/50 transition-colors rounded-lg border-t border-slate-100">
                <td class="font-medium py-2 px-2 text-slate-600">Upper Temp. Limit = ${Zt.ut}°C</td>
                <td class="py-2 px-2 text-right">
                  <span class="px-2 py-1 bg-slate-200/70 rounded-md text-xs font-bold text-slate-600">Action: ${Zt.action_ut}</span>
                </td>
              </tr>
              <tr class="hover:bg-slate-100/50 transition-colors rounded-lg">
                <td class="font-medium py-2 px-2 text-slate-600">Lower Temp. Limit = ${Zt.lt}°C</td>
                <td class="py-2 px-2 text-right">
                  <span class="px-2 py-1 bg-slate-200/70 rounded-md text-xs font-bold text-slate-600">Action: ${Zt.action_lt}</span>
                </td>
              </tr>
              ${ht&&"upphumid"in Zt?Et`
                    <tr class="hover:bg-slate-100/50 transition-colors rounded-lg border-t border-slate-100">
                      <td class="font-medium py-2 px-2 text-slate-600">Upper Humidity Limit = ${Zt.upphumid}%</td>
                      <td class="py-2 px-2 text-right">
                        <span class="px-2 py-1 bg-slate-200/70 rounded-md text-xs font-bold text-slate-600">Action: ${Zt.actuphum}</span>
                      </td>
                    </tr>
                    <tr class="hover:bg-slate-100/50 transition-colors rounded-lg">
                      <td class="font-medium py-2 px-2 text-slate-600">Lower Humidity Limit = ${Zt.humlolim}%</td>
                      <td class="py-2 px-2 text-right">
                        <span class="px-2 py-1 bg-slate-200/70 rounded-md text-xs font-bold text-slate-600">Action: ${Zt.actlowhum}</span>
                      </td>
                    </tr>
                  `:""}
              <tr class="hover:bg-slate-100/50 transition-colors rounded-lg border-t border-slate-200/60 mt-2">
                <td class="font-semibold py-3 px-2 text-slate-800">Info:</td>
                <td class="text-slate-600 py-3 px-2 text-right italic">${Zt.info}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `};return ae.length>0&&Object.keys(ae[0]).length>0?Et`<div class="space-y-4 w-full">${ae.map((Zt,ie)=>Te(Zt))}</div>`:Et`
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
                    ${$.length>0?$.map((re,he)=>Et`<${de} device=${re} index=${he} key=${re.id} />`):Et`
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
              onClose=${ve}
              onUpdate=${ce}
              sensorType=${pt.sensorType}
              closeOnOverlayClick=${!0}
              refresh=${fe}
            />
          `:Et`
            <${ModalOneWire}
              oneWire=${mt}
              onClose=${ve}
              onUpdate=${ke}
              closeOnOverlayClick=${!0}
              refresh=${fe}
            />
          `)}
  `};function ModalSIM800L({hideModal:$,title:_,selectedGps:st,onSave:ct}){const[dt,k]=ut((st==null?void 0:st.tel)||""),[pt,Yt]=ut((st==null?void 0:st.info)||""),[mt,Xt]=ut((st==null?void 0:st.onoff)===1),[te,vt]=ut(!0),ee=ce=>/^\+\d{11,20}$/.test(ce),ye=Et`
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

          <form onSubmit=${ce=>{if(ce.preventDefault(),!te)return;const ge={tel:dt,info:pt,onoff:mt?1:0};console.log("Сохраняемые данные:",ge),fetch("/api/sim800l/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ge)}).then(be=>be.json()).then(be=>{typeof ct=="function"&&ct(ge),$()}).catch(be=>{console.error("Error:",be)})}}>
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
                        onInput=${ce=>{const ge=ce.target.value;k(ge),vt(ee(ge))}}
                        class=${`border rounded p-2 w-full ${!te&&dt!==""?"border-red-500":""}`}
                        placeholder="+XXXXXXXXXXX"
                      />
                      ${!te&&dt!==""?Et`
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
                        onInput=${ce=>Yt(ce.target.value)}
                        class="border rounded p-2 w-full"
                      />
                    </td>
                  </tr>
                  <tr class="bg-gray-200">
                    <td class="p-2 font-bold">On/Off</td>
                    <td class="p-2">
                      <${MyPolzunok} value=${mt} onChange=${Xt} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer flex justify-end mt-4">
              <button
                type="submit"
                disabled=${!te||dt===""}
                class=${`font-bold py-2 px-4 rounded ${te&&dt!==""?"bg-blue-500 hover:bg-blue-700 text-white":"bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,ve=at(null);return lt(()=>{const ce=document.createElement("div");return ce.id="modal-portal",document.body.appendChild(ce),ve.current=ce,()=>{O(null,ce),document.body.removeChild(ce)}},[]),lt(()=>{ve.current&&O(ye,ve.current)}),null}const ModalSecurity=({modalType:$,page:_,hideModal:st,title:ct,selectedSecurity:dt,onSecurityChange:k,SliderComponent:pt=MyPolzunok})=>{const[Yt,mt]=ut((dt==null?void 0:dt.info)||""),[Xt,te]=ut((dt==null?void 0:dt.onoff)||0),[vt,ee]=ut((dt==null?void 0:dt.ptype)||0),[se,fe]=ut((dt==null?void 0:dt.send_sms)||""),[ye,ve]=ut((dt==null?void 0:dt.action)||""),[ce,ge]=ut([]),[be,ke]=ut({send_sms:null,action:null}),[Se,_e]=ut(null),Ce=/^(None|\d{1,2}:[012])(,\d{1,2}:[012])*$/,de=(ie,ht)=>!ht||ht.trim()===""||ht.toLowerCase()==="none"?null:ie==="action"?Ce.test(ht)?null:'Incorrect format. Use "None" or "pin:value" format.':ht.length>100?"Text should not exceed 100 characters":null,xe=(ie,ht)=>{const le=de(ie,ht);switch(ke(oe=>({...oe,[ie]:le})),ie){case"send_sms":fe(ht);break;case"action":ve(ht);break}};lt(()=>{fetch("/api/monitoring/get").then(ie=>ie.json()).then(ie=>{Array.isArray(ie)?ge(ie.filter(ht=>ht.topin===2)):ge([])}).catch(ie=>{console.error("Error fetching pin config:",ie),ge([])})},[]);const re=ie=>{if(ie.preventDefault(),Object.values(be).some(le=>le!==null)){_e("Please correct the errors before submitting.");return}const ht={...dt,info:Yt,send_sms:se||"NO",action:ye||"None",onoff:Xt,ptype:vt};fetch("/api/monitoring/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ht)}).then(le=>{if(!le.ok)throw new Error("Network response was not ok");return le.json()}).then(le=>{if(le.error)throw new Error(le.error);k(ht),st()}).catch(le=>{console.error("Error:",le),_e("Failed to save changes. Please try again.")})},he=()=>{ee(0),fe(""),ve(""),mt(""),te(0),ke({send_sms:null,action:null})},Te=Et`
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
    <form onSubmit=${re}>
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
                  value=${ce.some(ie=>ie.pins===(dt==null?void 0:dt.setrpins))?dt==null?void 0:dt.setrpins:""}
                  onChange=${ie=>k({...dt,setrpins:ie.target.value})}
                  class="border rounded p-2 w-full"
                >
                  <option value="">Select a connection</option>
                  ${ce.map(ie=>Et`
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
    <form onSubmit=${re}>
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
                  value=${vt}
                  onChange=${ie=>ee(parseInt(ie.target.value))}
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
                  value=${ye}
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
                  value=${se}
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
                  value=${Yt}
                  onInput=${ie=>mt(ie.target.value)}
                  class="border rounded p-2 w-full"
                />
              </td>
            </tr>
            <tr class="bg-gray-200">
              <td class="p-2 font-bold">On/Off</td>
              <td class="p-2">
                <${pt} value=${Xt} onChange=${te} />
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
  `,Zt=at(null);return lt(()=>{const ie=document.createElement("div");return ie.id="modal-portal",document.body.appendChild(ie),Zt.current=ie,()=>{O(null,ie),document.body.removeChild(ie)}},[]),lt(()=>{Zt.current&&O(Te,Zt.current)}),null};function initGlobalTooltip$1(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"280px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,Yt=window.innerWidth,mt=dt.getBoundingClientRect();let Xt=mt.left+mt.width/2-k/2;Xt=Math.max(8,Math.min(Xt,Yt-k-8));let te=mt.top-pt-8;te<8&&(te=mt.bottom+8),$.style.left=Xt+"px",$.style.top=te+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const TabSecurity=()=>{const[$,_]=ut({lang:"ru",sim800l:0,onoff:0,tel:"",info:""}),[st,ct]=ut(!1),[dt,k]=ut(!1),[pt,Yt]=ut([]),[mt,Xt]=ut(!1),[te,vt]=ut("ru"),[ee,se]=ut(!1),[fe,ye]=ut(""),[ve,ce]=ut(null),[ge,be]=ut(!1),[ke,Se]=ut("connected"),[_e,Ce]=ut(0);lt(()=>{initGlobalTooltip$1()},[]);const de=()=>te==="ru"?ruLangsecurity:enLangsecurity,xe=()=>te==="ru"?ruLangsecuritypins:enLangsecuritypins,re=(we,Ee)=>{const ne=(we&&we[Ee]?we[Ee]:"").split(" "),ue=[];for(let Oe=0;Oe<ne.length;Oe+=15)ue.push(ne.slice(Oe,Oe+15).join(" "));return ue.join("<br>")},he=({title:we,langArr:Ee,tooltipIndex:$t})=>Et`
    <th
      class="px-6 py-4 text-2xl font-bold text-slate-700 tracking-wide cursor-help"
      data-tip=${re(Ee,$t)}
    >
      ${we}
    </th>
  `,me=(we,Ee)=>{let $t;return(...ne)=>{clearTimeout($t),$t=setTimeout(()=>we(...ne),Ee)}},ae=async(we,Ee={},$t=3)=>{try{const ne=await fetch(we,Ee);if(!ne.ok)throw new Error("Network response was not ok");return Se("connected"),ne}catch(ne){if(Se("error"),$t>0)return await new Promise(ue=>setTimeout(ue,1e3)),ae(we,Ee,$t-1);throw Se("disconnected"),ne}},Te={ru:Et`
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
    `},Zt={ru:Et`
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
    `},ie=async()=>{if(!(ge||Date.now()-_e<500))try{const Ee=await(await ae("/api/sim800l/get")).json();_(Ee)}catch(we){console.error("Error fetching SIM800L data:",we)}},ht=async()=>{if(!(ge||Date.now()-_e<500))try{const Ee=await(await ae("/api/monitoring/get")).json();Yt(Ee.pins||[])}catch(we){console.error("Error fetching monitoring data:",we)}};lt(()=>{fetch("/api/monitoring/get").then(Ee=>Ee.json()).then(Ee=>vt(Ee.lang||"ru")).catch(Ee=>console.error("Error fetching initial language:",Ee));const we=setInterval(()=>{ie(),ht()},500);return()=>clearInterval(we)},[]);const le=me(async we=>{be(!0);try{await ae("/api/sim800l/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(we)}),_(we),Ce(Date.now())}catch(Ee){console.error("Error updating SIM800L:",Ee)}finally{be(!1)}},300),oe=async we=>{try{const Ee=await fetch("/api/monitoring/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(we)});if(!Ee.ok)throw new Error(`HTTP error! status: ${Ee.status}`);Yt($t=>$t.map(ne=>ne.id===we.id?we:ne)),await ht(),se(!1)}catch(Ee){console.error("Error updating security:",Ee),alert("Failed to save changes. Please try again."),await ht()}},pe=we=>{Yt(Ee=>Ee.map($t=>$t.id===we.id?{...$t,...we}:$t)),fetch("/api/onoff/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:we.id,onoff:we.onoff})}).then(Ee=>Ee.json()).then(Ee=>console.log("Response from /api/onoff/set:",Ee)).catch(Ee=>console.error("Error calling /api/onoff/set:",Ee)),$e()},Ie=(we,Ee)=>{ye(we),ce(Ee),se(!0)},$e=()=>{se(!1),ye(""),ce(null)};return Et`
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
                      onChange=${we=>le({...$,onoff:we})}
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
          ${dt&&Te[te]}
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
                ${pt.length>0?pt.map((we,Ee)=>Et`
                      <tr class="${Ee%2===1?"bg-white/80":"bg-sky-200/40"} hover:bg-slate-200/80 transition-colors">
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
                            onClick=${()=>Ie("edit",we)}
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
              onClick=${()=>Xt(!mt)}
              class="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white transition-all duration-300 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl hover:from-teal-400 hover:to-cyan-500 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0"
            >
              ${mt?"Hide Help":"Show Help"}
            </button>
          </div>
          ${mt&&Zt[te]}
        </div>

        ${st&&Et`
          <${ModalSIM800L}
            hideModal=${()=>ct(!1)}
            title="Edit SIM800L Settings"
            selectedGps=${$}
            onSave=${le}
          />
        `}

        ${ee&&Et`
          <${ModalSecurity}
            modalType=${fe}
            page="TabSecurity"
            hideModal=${()=>se(!1)}
            title="Edit Security Settings"
            selectedSecurity=${ve}
            onSecurityChange=${oe}
          />
        `}
      </div>
    </div>
  `};function initGlobalTooltip(){if(document.__tipInited)return;document.__tipInited=!0;const $=document.createElement("div");$.id="__global_tip",Object.assign($.style,{position:"fixed",zIndex:"99999",maxWidth:"320px",background:"#1a2332",color:"#e8f4f8",padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(0,188,188,0.35)",fontSize:"12px",lineHeight:"1.6",boxShadow:"0 6px 20px rgba(0,0,0,0.45)",pointerEvents:"none",whiteSpace:"normal",display:"none",transition:"opacity 0.12s ease",opacity:"0"}),document.body.appendChild($);let _=null;function st(dt){clearTimeout(_),$.innerHTML=dt.dataset.tip,$.style.display="block",$.style.opacity="0",$.style.left="0px",$.style.top="0px",requestAnimationFrame(()=>{const k=$.offsetWidth,pt=$.offsetHeight,Yt=window.innerWidth,mt=dt.getBoundingClientRect();let Xt=mt.left+mt.width/2-k/2;Xt=Math.max(8,Math.min(Xt,Yt-k-8));let te=mt.top-pt-8;te<8&&(te=mt.bottom+8),$.style.left=Xt+"px",$.style.top=te+"px",$.style.opacity="1"})}function ct(){_=setTimeout(()=>{$.style.opacity="0",setTimeout(()=>{$.style.display="none"},120)},80)}document.addEventListener("mouseover",dt=>{const k=dt.target.closest("[data-tip]");k&&st(k)}),document.addEventListener("mouseout",dt=>{dt.target.closest("[data-tip]")&&ct()})}const SETTINGS_TIP_IDX={Login:1,Password:2,"Time zone UTC":3,"IP address":4,"Subnet mask":5,"Default gateway":6,Token:7,Host:8,Port:9,Client:10,User:11,"Password (MQTT)":12,"TX topic":13,"RX topic":14,"HTTPS domain":15,"Private Key":16,"Public Key":17,Longitude:18,Latitude:19,Sunrise:20,Sunset:21,"Day Length":22,"Next full moon":23,Date:24,Time:25},getTip=($,_,st,ct)=>{const dt=_==="ru"?st:ct,k=SETTINGS_TIP_IDX[$];if(!k||!dt||!dt[k])return"";const pt=dt[k].split(" "),Yt=[];for(let mt=0;mt<pt.length;mt+=12)Yt.push(pt.slice(mt,mt+12).join(" "));return Yt.join("<br>")},FieldRow=({label:$,tipLabel:_,index:st,tip:ct,children:dt})=>{const k=st%2===0?"bg-white/80":"bg-sky-200/40";return Et`
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
  `};function Settings({}){const[$,_]=ut({}),[st,ct]=ut(null),[dt,k]=ut(null),[pt,Yt]=ut({}),mt=at(null),[Xt,te]=ut(null),[vt,ee]=ut(null),[se,fe]=ut(!1),[ye,ve]=ut(!1),[ce,ge]=ut(!1),[be,ke]=ut(!1),[Se,_e]=ut(!1),[Ce,de]=ut(!0);lt(()=>{if(initGlobalTooltip(),!document.getElementById("__network_toggle_style")){const $t=document.createElement("style");$t.id="__network_toggle_style",$t.textContent=".network-toggle span { display: none !important; }",document.head.appendChild($t)}},[]);const xe=$t=>getTip($t,$.lang||"ru",rulangsettings,enlangsettings),re=[{value:"en",label:"English"},{value:"ru",label:"Russian"}],he=[[-12,"(GMT -12:00) Eniwetok, Kwajalein"],[-11,"(GMT -11:00) Midway Island, Samoa"],[-10,"(GMT -10:00) Hawaii"],[-9,"(GMT -9:00) Alaska"],[-8,"(GMT -8:00) Pacific Time (US & Canada)"],[-7,"(GMT -7:00) Mountain Time (US & Canada)"],[-6,"(GMT -6:00) Central Time (US & Canada), Mexico City"],[-5,"(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima"],[-4,"(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz"],[-3.3,"(GMT -3:30) Newfoundland"],[-3,"(GMT -3:00) Brazil, Buenos Aires, Georgetown"],[-2,"(GMT -2:00) Mid-Atlantic"],[-1,"(GMT -1:00) Azores, Cape Verde Islands"],[0,"(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca"],[1,"(GMT +1:00) Brussels, Copenhagen, Madrid, Paris"],[2,"(GMT +2:00) Kaliningrad, South Africa"],[3,"(GMT +3:00) Moscow, St. Petersburg, Baghdad, Riyadh"],[3.3,"(GMT +3:30) Tehran"],[4,"(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi"],[4.3,"(GMT +4:30) Kabul"],[5,"(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"],[5.3,"(GMT +5:30) Bombay, Calcutta, Madras, New Delhi"],[5.45,"(GMT +5:45) Kathmandu"],[6,"(GMT +6:00) Almaty, Dhaka, Colombo"],[7,"(GMT +7:00) Bangkok, Hanoi, Jakarta"],[8,"(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"],[9,"(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"],[9.3,"(GMT +9:30) Adelaide, Darwin"],[10,"(GMT +10:00) Eastern Australia, Guam, Vladivostok"],[11,"(GMT +11:00) Magadan, Solomon Islands, New Caledonia"],[12,"(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"]],me=/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,ae=/^(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)$/,Te=$t=>{if(!$t)return{date:"",time:""};const ne=$t.match(/d:(\d{1,2}\.\d{1,2}\.\d{2})/),ue=$t.match(/t:(\d{2}:\d{2}:\d{2})/);return{date:ne?ne[1]:"",time:ue?ue[1]:""}},Zt=$t=>{if(!/^\d{1,2}\.\d{1,2}\.\d{2}$/.test($t))return!1;const[ue,Oe,Pe]=$t.split(".").map(Number);if(Oe<1||Oe>12||ue<1||ue>31||Pe<0||Pe>99)return!1;const Me=new Date().getFullYear()%100;if(Pe>Me+5)return!1;const Ne=new Date(2e3+Pe,Oe,0).getDate();return!(ue>Ne)},ie=$t=>/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test($t),ht=($t,ne)=>{const ue=Object.values(ne).some(Pe=>Pe!==null),Oe=$t.usehttps?$t.domain&&$t.domain.trim()!=="":!0;return!(ue||!Oe)},le=($t,ne)=>{te({message:$t,type:ne}),setTimeout(()=>{te(null)},3e3)},oe=$t=>{ee($t),setTimeout(()=>{ee(null)},3e3)},pe=($t,ne)=>{let ue=null;if(!$.usehttps&&["domain","tls_key","tls_cert","tls_ca","telegram_token"].includes($t))return null;if(!ne&&["ip_addr","gateway","mqtt_hst","sb_mask","offdate","offtime","domain"].includes($t))return"Поле не может быть пустым";switch($t){case"ip_addr":case"gateway":case"mqtt_hst":me.test(ne)||(ue="Неверный IP-адрес");break;case"sb_mask":ae.test(ne)||(ue="Неверная маска подсети");break;case"offdate":Zt(ne)||(ue="Неверный формат даты (д.м.гг)");break;case"offtime":ie(ne)||(ue="Неверный формат времени (чч:мм:сс)");break;case"domain":ne.length>50?ue="Домен не должен превышать 50 символов":ne.match(/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/)||(ue="Неверный формат домена");break;case"tls_key":ne&&ne.trim()!==""&&(ne.length>512?ue="Private Key не должен превышать 512 символов":(!ne.includes("BEGIN EC PRIVATE KEY")||!ne.includes("END EC PRIVATE KEY"))&&(ue="Неверный формат Private Key"));break;case"tls_cert":ne&&ne.trim()!==""&&(ne.length>1024?ue="Public Key не должен превышать 1024 символов":(!ne.includes("BEGIN CERTIFICATE")||!ne.includes("END CERTIFICATE"))&&(ue="Неверный формат Public Key"));break;case"tls_ca":ne&&ne.trim()!==""&&(ne.length>1024?ue="Secret Key не должен превышать 1024 символов":(!ne.includes("BEGIN CERTIFICATE")||!ne.includes("END CERTIFICATE"))&&(ue="Неверный формат Secret Key"));break}return ue},Ie=$t=>{$t.preventDefault();const ne=new FormData(mt.current);let ue={...$};for(const[Oe,Pe]of ne.entries())["lon_de","lat_de","timezone","mqtt_prt"].includes(Oe)?ue[Oe]=Pe===""||Pe===null?0:Number(Pe):ue[Oe]=Pe;ue.usehttps||["tls_ca","tls_key","tls_cert","telegram_token","domain"].forEach(Oe=>delete ue[Oe]),ue.offdate&&ue.offtime?ue.offldt=`d:${ue.offdate} t:${ue.offtime}`:delete ue.offldt,["lon_de","lat_de","timezone","mqtt_prt"].forEach(Oe=>{(ue[Oe]===null||ue[Oe]==="")&&(ue[Oe]=0)}),ue.onsunrise=ue.onsunrise?1:0,ue.onsunset=ue.onsunset?1:0,ue.check_ip=ue.check_ip?1:0,ue.check_mqtt=ue.check_mqtt?1:0,ue.usehttps=ue.usehttps?1:0,fetch("/api/mysett/set",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ue)}).then(Oe=>{if(!Oe.ok)throw new Error("Ошибка сети");return Oe.json()}).then(Oe=>{k("success"),ct(Oe),le("Данные успешно сохранены","success"),oe("Данные успешно сохранены")}).catch(Oe=>{k("error"),ct(Oe),le("Ошибка при сохранении данных","error"),oe("Ошибка при сохранении данных")})},$e=($t,ne)=>{let ue=null;$t==="offdate"?ue=Zt(ne)?null:"Неверный формат даты (д.м.гг)":$t==="offtime"?ue=ie(ne)?null:"Неверный формат времени (чч:мм:сс)":ue=pe($t,ne),Yt(Pe=>{const Me={...Pe,[$t]:ue},Ne=["tls_key","tls_cert","tls_ca"],Ae=Object.keys(Me).filter(Le=>!Ne.includes(Le)&&Le!=="telegram_token").some(Le=>Me[Le]!==null);return fe(Ae||!$.usehttps&&Ne.some(Le=>$[Le])),Me});let Oe=ne;["lon_de","lat_de","timezone","mqtt_prt"].includes($t)?Oe=ne===""||ne===null?0:Number(ne):["onsunrise","onsunset","check_ip","check_mqtt","usehttps"].includes($t)&&(Oe=ne?1:0),_(Pe=>({...Pe,[$t]:Oe})),$t==="usehttps"&&(Yt({}),fe(!1))},we=()=>fetch("/api/mysett/get").then($t=>$t.json()).then($t=>{if($t.offldt){const{date:ne,time:ue}=Te($t.offldt);$t.offdate=ne,$t.offtime=ue}return _($t),$t}).catch($t=>{console.error("Error fetching settings:",$t),le("Ошибка при загрузке настроек","error")});if(lt(()=>{we().then($t=>{$t!=null&&$t.tls_key&&ve(!0),$t!=null&&$t.tls_cert&&ge(!0),$t!=null&&$t.tls_ca&&ke(!0),$t!=null&&$t.telegram_token&&_e(!0),de(!1)})},[]),lt(()=>{fe(!ht($,pt))},[$,pt]),Ce)return Et`<div>Loading...</div>`;if(!$)return"";const Ee=($t="")=>Et`
    <button
      type="submit"
      class=${`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 ${se?"opacity-50 cursor-not-allowed bg-slate-400":"bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500"} ${$t}`}
      disabled=${se}
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
            ${re.map($t=>Et`<option value=${$t.value}>${$t.label}</option>`)}
          </select>
        </div>

        ${vt&&Et`
          <div class="w-full max-w-4xl bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center mb-6 border border-green-400/50 backdrop-blur-md">
            ${vt}
          </div>
        `}

        <form ref=${mt} onSubmit=${Ie} class="w-full max-w-4xl flex flex-col gap-6 relative">

          <div class="flex justify-end w-full">${Ee()}</div>

          <!-- ============================================================
               User data
          ============================================================ -->
          <div class="w-full mb-6">
            <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm mb-4 pl-2">User data</h3>
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
                <tbody>
              ${[{label:"Login",key:"adm_name",type:"text"},{label:"Password",key:"adm_pswd",type:"password"},{label:"Time zone UTC",key:"timezone",type:"select",options:he}].map(($t,ne)=>Et`
                <${FieldRow} label=${$t.label} tip=${xe($t.tipLabel||$t.label)} index=${ne}>
                  <${pageSetting}
                    value=${$[$t.key]}
                    setfn=${ue=>$e($t.key,ue)}
                    type=${$t.type}
                    options=${$t.options}
                    class=${`w-full px-3 py-2 bg-white/50 border ${pt[$t.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    error=${pt[$t.key]}
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
            <div class="flex items-center gap-4 mb-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm pl-2">Network</h3>
              <div class="network-toggle">
                <${MyPolzunok} value=${$.check_ip} onChange=${$t=>$e("check_ip",$t)} />
              </div>
              <span class="text-slate-600 font-medium tracking-wide text-lg">
                ${$.check_ip?"DHCP":"Static IP"}
              </span>
            </div>
            ${$.check_ip?null:Et`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <tbody>
                  ${[{label:"IP address",key:"ip_addr",type:"text"},{label:"Subnet mask",key:"sb_mask",type:"text"},{label:"Default gateway",key:"gateway",type:"text"}].map(($t,ne)=>Et`
                    <${FieldRow} label=${$t.label} tip=${xe($t.tipLabel||$t.label)} index=${ne}>
                      <${pageSetting}
                        value=${$[$t.key]}
                        setfn=${ue=>$e($t.key,ue)}
                        type=${$t.type}
                        class=${`w-full px-3 py-2 bg-white/50 border ${pt[$t.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        error=${pt[$t.key]}
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
            <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm mb-4 pl-2">API Settings</h3>
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
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
            <div class="flex items-center gap-4 mb-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm pl-2">MQTT</h3>
              <${MyPolzunok} value=${$.check_mqtt} onChange=${$t=>$e("check_mqtt",$t)} />
            </div>
            ${$.check_mqtt?Et`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <tbody>
                ${[{label:"Host",key:"mqtt_hst",type:"text"},{label:"Port",key:"mqtt_prt",type:"number"},{label:"Client",key:"mqtt_clt",type:"text"},{label:"User",key:"mqtt_usr",type:"text"},{label:"Password",key:"mqtt_pswd",type:"password",tipLabel:"Password (MQTT)"},{label:"TX topic",key:"txmqttop",type:"text"},{label:"RX topic",key:"rxmqttop",type:"text"}].map(($t,ne)=>Et`
                  <${FieldRow} label=${$t.label} tip=${xe($t.tipLabel||$t.label)} index=${ne}>
                    <${pageSetting}
                      value=${$[$t.key]}
                      setfn=${ue=>$e($t.key,ue)}
                      type=${$t.type}
                      class=${`w-full px-3 py-2 bg-white/50 border ${pt[$t.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      error=${pt[$t.key]}
                    />
                  <//>
                `)}
                </tbody>
              </table>
              </div>
            `:null}
          </div>

          <!-- ============================================================
               HTTPS
          ============================================================ -->
          <div class="w-full mb-6">
            <div class="flex items-center gap-4 mb-4">
              <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm pl-2">HTTPS</h3>
              <${MyPolzunok} value=${$.usehttps} onChange=${$t=>$e("usehttps",$t)} />
            </div>
            ${$.usehttps?Et`
              <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
                <table class="w-full table-fixed text-left border-collapse">
                  <tbody>
                ${[{label:"HTTPS domain",key:"domain",type:"text"},{label:"Private Key",key:"tls_key",type:"textarea"},{label:"Public Key",key:"tls_cert",type:"textarea"}].map(($t,ne)=>Et`
                  <tr class="transition-colors border-b border-slate-200 ${ne%2===0?"bg-sky-200/40":"bg-white/80"} hover:bg-slate-200/80">
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
                                    onInput=${ue=>$e($t.key,ue.target.value)}
                                    class=${`w-full px-3 py-2 bg-white/50 border ${pt[$t.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                                    rows="1"
                                    placeholder="Enter ${$t.label}"
                                  ></textarea>`}
                          `:Et`
                            <input
                              type="text"
                              name=${$t.key}
                              value=${$[$t.key]||""}
                              onInput=${ue=>$e($t.key,ue.target.value)}
                              class=${`w-full px-3 py-2 bg-white/50 border ${pt[$t.key]?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                              maxlength="30"
                              placeholder="Enter domain (e.g., zagotovka.ddns.net)"
                            />
                          `}
                        ${$[$t.key]&&$t.key==="tls_cert"&&Et`
                          <div class="absolute right-0 top-0 mt-[3px] mr-[3px] flex gap-2">
                            <button type="button"
                              onClick=${()=>{navigator.clipboard.writeText($[$t.key]),oe("Данные скопированы")}}
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
                      ${pt[$t.key]&&Et`<div class="text-red-500 text-sm mt-1 font-semibold w-full text-left">${pt[$t.key]}</div>`}
                    </td>
                  </tr>
                `)}
                </tbody>
              </table>
              </div>
            `:null}
          </div>

          <!-- ============================================================
               Coordinates & Astronomy
          ============================================================ -->
          <div class="w-full mb-6">
            <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm mb-4 pl-2">Coordinates & Astronomy</h3>
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
                <tbody>

              <${FieldRow} label="Longitude" tip=${xe("Longitude")} index=${0}>
                <${pageSetting} value=${$.lon_de} setfn=${$t=>$e("lon_de",$t)} type="text"
                  class=${`w-full px-3 py-2 bg-white/50 border ${pt.lon_de?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  error=${pt.lon_de} />
              <//>

              <${FieldRow} label="Latitude" tip=${xe("Latitude")} index=${1}>
                <${pageSetting} value=${$.lat_de} setfn=${$t=>$e("lat_de",$t)} type="text"
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
            <h3 class="text-2xl font-bold text-slate-700 tracking-wide drop-shadow-sm mb-4 pl-2">[OFFLINE MODE] Date & Time</h3>
            <div class="w-full overflow-auto rounded-2xl shadow-lg border border-white/50 bg-white/30 backdrop-blur-sm">
              <table class="w-full table-fixed text-left border-collapse">
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
                  <input type="text" name="offtime" value=${$.offtime||""} onInput=${$t=>$e("offtime",$t.target.value)}
                    placeholder="hh:mm:ss"
                    class=${`w-full px-3 py-2 bg-white/50 border ${pt.offtime?"border-red-500 ring-2 ring-red-500/50":"border-white/50"} rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500`} />
                  ${pt.offtime&&Et`<div class="text-red-500 text-sm mt-1 font-semibold">${pt.offtime}</div>`}
                </td>
              </tr>
              </tbody>
            </table>
            </div>
          </div>

          ${vt&&Et`
            <div class="w-full bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white font-bold px-4 py-3 rounded-xl shadow-md text-center border border-green-400/50 backdrop-blur-md">
              ${vt}
            </div>
          `}

          <div class="flex justify-end w-full mb-4">${Ee()}</div>

        </form>
      </div>
    </div>
    ${Xt&&Et`<${Toast} message=${Xt.message} type=${Xt.type} />`}
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
  </svg>`;function Header({logout:$,user:_,setShowSidebar:st,showSidebar:ct}){const[dt,k]=ut(new Date),[pt,Yt]=ut(null),mt=(ee,se)=>new Date(ee.year+1900,ee.mon,ee.mday,ee.hour,ee.min,ee.sec),Xt=async()=>{try{const se=await(await fetch("/api/stm32-time")).text();let fe;try{fe=JSON.parse(se)}catch{return}fe.status&&fe.time?Yt(mt(fe.time,fe.timezone)):Yt(null)}catch{Yt(null)}};lt(()=>{const ee=setInterval(()=>k(new Date),1e3),se=setInterval(Xt,1e3);return Xt(),()=>{clearInterval(ee),clearInterval(se)}},[]);const te=ee=>ee.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric"}),vt=ee=>ee.toLocaleTimeString("ru-RU");return Et`
    <div
      class="bg-white/40 backdrop-blur-md border-b border-white/40 shadow-sm sticky top-0 z-[48] w-full py-2 ${ct?"pl-72":""} transition-all duration-300 transform"
    >
      <div class="px-4 w-full py-0 my-0 flex items-center justify-between">
        <button
          type="button"
          onclick=${()=>st(ee=>!ee)}
          class="text-slate-500 hover:text-teal-500 transition-colors"
        >
          <${Icons.bars3} class="h-6" />
        </button>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600">
            Дата: ${te(dt)}<span style="margin-left: 8px;"></span
            >Время: ${vt(dt)}
          </span>
        </div>
        <div class="flex flex-1 justify-center items-center">
          <span class="text-sm text-slate-600"
            >STM32 дата:
            ${pt?te(pt):" 00.00.0000"}<span
              style="margin-left: 8px;"
            ></span
            >Время: ${pt?vt(pt):"00:00"}
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
  <//>`}function Chart({data:$}){const _=$.length,st=20,ct=15,dt=100,k=5,pt=10,Yt=25,mt=ee=>(dt-pt)/k*(ee+1),Xt=ee=>(dt-pt)*ee/100,te=ee=>dt-pt-Xt(ee),vt=(ee,se,fe)=>Array.from({length:se},(ye,ve)=>ve*1+ee);return Et` <div
    class="my-4 divide-y divide-gray-200 overflow-auto rounded bg-white"
  >
    <div class="font-light uppercase flex items-center text-gray-600 px-4 py-2">
      Temperature, last 24h
    <//>
    <div class="relative">
      <svg class="bg-yellow-x50 w-full p-4" viewBox="0 0 ${_*st+ct} ${dt}">
        ${vt(0,k).map(ee=>Et`
            <line
              x1="0"
              y1=${mt(ee)}
              x2=${ct+_*st}
              y2=${mt(ee)}
              stroke-width="0.3"
              class="stroke-slate-300"
              stroke-dasharray="1,1"
            />
            <text x="0" y=${mt(ee)-2} class="text-[6px] fill-slate-400"
              >${Yt-Yt/k*(ee+1)}<//
            >
          `)}
        ${vt(0,_).map(ee=>Et`
            <rect
              x=${ct+ee*st}
              y=${te($[ee]*100/Yt)}
              width="12"
              height=${Xt($[ee]*100/Yt)}
              rx="2"
              class="fill-cyan-500"
            />
            <text x=${ct+ee*st} y="100" class="text-[6px] fill-slate-400"
              >${ee*2}:00<//
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
  `}function FirmwareUpdate({}){const[$,_]=ut([{},{}]),[st,ct]=ut(null),dt=()=>fetch("api/firmware/status").then(ee=>ee.json()).then(ee=>_(ee));lt(dt,[]),lt(()=>{if(st){const ee=setTimeout(()=>{ct(null)},3e3);return()=>clearTimeout(ee)}},[st]);const k=ee=>fetch("api/firmware/commit").then(se=>se.json()).then(dt),pt=ee=>fetch("api/reboot",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reboot:1})}).then(se=>se.json()).then(se=>new Promise(fe=>setTimeout(()=>{dt(),fe()},5e3))),Yt=ee=>fetch("api/firmware/rollback").then(pt),mt=ee=>fetch("api/device/eraselast").then(dt),Xt=function(ee){if(!ee){ct({type:"yellow",message:"Error: No file selected."});return}const se=ee.name.split(".").pop().toLowerCase();if(se!=="bin"&&se!=="hex"){ct({type:"red",message:"Error: Only .bin and .hex files are allowed!"});return}const fe=new FormData;fe.append("file",ee),fetch("api/firmware/upload",{method:"POST",body:fe}).then(ye=>{if(!ye.ok)throw new Error(`HTTP error! status: ${ye.status}`);return ye.json()}).then(()=>{ct({type:"green",message:"Firmware uploaded successfully!"}),dt()}).catch(ye=>{ct({type:"yellow",message:`Error: Upload failed. ${ye.message}`})})},te=({type:ee,message:se})=>Et`
      <div
        class=${`fixed top-0 left-0 right-0 z-50 border-b-4 p-4 ${ee==="red"?"bg-red-100 border-red-500 text-red-700":ee==="yellow"?"bg-yellow-100 border-yellow-500 text-yellow-700":"bg-green-100 border-green-500 text-green-700"}`}
        role="alert"
      >
        <p class="font-bold text-center">${se}</p>
      </div>
    `,vt=({title:ee,onupload:se})=>Et`
      <label
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        ${ee}
        <input
          type="file"
          class="hidden"
          accept=".bin,.hex"
          onChange=${ye=>{const ve=ye.target.files[0];ve&&se(ve)}}
        />
      </label>
    `;return Et`
    ${st&&Et`<${te} type=${st.type} message=${st.message} />`}
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
          <${vt}
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
  `}const pageSetting=({value:$,setfn:_,type:st,options:ct,error:dt,...k})=>{let pt;const Yt=`w-full px-3 py-2 border rounded-md ${dt?"border-red-500":"border-gray-300"}`;switch(st){case"text":case"password":case"number":pt=Et`
        <input
          type=${st}
          value=${$}
          onInput=${mt=>_(mt.target.value)}
          class=${Yt}
          ...${k}
        />
      `;break;case"select":pt=Et`
        <select
          value=${$}
          onChange=${mt=>_(mt.target.value)}
          class=${Yt}
          ...${k}
        >
          ${ct.map(([mt,Xt])=>Et` <option value=${mt}>${Xt}</option> `)}
        </select>
      `;break;case"switch":pt=Et`
        <label class="switch">
          <input
            type="checkbox"
            checked=${$}
            onChange=${mt=>_(mt.target.checked)}
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
  `}const App=function({}){const[$,_]=ut(!0),[st,ct]=ut("/"),[dt,k]=ut(""),[pt,Yt]=ut(!0),mt=()=>fetch("api/logout").then(te=>k("")),Xt=te=>te.ok?te.json().then(vt=>k(vt.user)).finally(vt=>_(!1)):_(!1)&&k(null);return lt(()=>fetch("api/login").then(Xt),[]),$?"":dt?Et` <div class="min-h-screen bg-slate-100" id="mains">
    <${Sidebar} url=${st} show=${pt} />
    <${Header}
      logout=${mt}
      user=${dt}
      showSidebar=${pt}
      setShowSidebar=${Yt}
    />
    <div
      class="${pt&&"pl-72"} transition-all duration-300 transform"
    >
      <${Qt}
        onChange=${te=>ct(te.url)}
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
