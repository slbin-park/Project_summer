(this.webpackJsonpproject=this.webpackJsonpproject||[]).push([[0],{42:function(t,e,n){},70:function(t,e,n){"use strict";n.r(e);var a=n(0),c=n.n(a),r=n(35),i=n.n(r),s=(n(42),n(14)),o=n(4),l=n(12),u=n(5),b=n(3),d=(n(23),n(9)),j=n.n(d),p=(n(71),n(1));var h=function(t){var e=t.history,n=Object(a.useState)({id:"",pwd:"",nickname:""}),c=Object(b.a)(n,2),r=c[0],i=c[1],s=Object(a.useState)({value:"\uc2a4\ud0dc\ud504"}),o=Object(b.a)(s,2),d=o[0],h=o[1],m=Object(a.useState)({id:"",pwd:"",job:""}),f=Object(b.a)(m,2),O=f[0],g=f[1];return Object(a.useEffect)((function(){j.a.get("http://localhost:8000/api/get").then((function(t){g(t.data)}))}),[]),Object(p.jsx)("div",{className:"container",children:Object(p.jsxs)("form",{className:"form-signin",children:[Object(p.jsx)("h2",{className:"form-signin-heading",children:"\ud68c\uc6d0\uac00\uc785 \ucc3d"}),Object(p.jsx)("label",{htmlFor:"inputEmail",className:"sr-only",children:"\uace0 \ubc88"}),Object(p.jsx)("input",{type:"text",onChange:function(t){return i(Object(l.a)(Object(l.a)({},r),{},{id:t.target.value}))},value:r.id,id:"inputEmail",className:"form-control",placeholder:"ID",required:!0,autoFocus:!0}),Object(p.jsx)("label",{htmlFor:"inputPassword",className:"sr-only",children:"\ube44\ubc00\ubc88\ud638"}),Object(p.jsx)("input",{type:"password",onChange:function(t){return i(Object(l.a)(Object(l.a)({},r),{},{pwd:t.target.value}))},value:r.pwd,id:"inputPassword",className:"form-control",placeholder:"Password",required:!0}),Object(p.jsx)("label",{htmlFor:"inputPassword",className:"sr-only",children:"\ub2c9\ub124\uc784"}),Object(p.jsx)("input",{type:"text",onChange:function(t){return i(Object(l.a)(Object(l.a)({},r),{},{nickname:t.target.value}))},value:r.nickname,className:"form-control",placeholder:"Nickname",required:!0}),Object(p.jsxs)("div",{className:"form-group",children:[Object(p.jsx)("label",{htmlFor:"exampleSelect1",className:"form-label mt-4",children:"\uc9c1\uc5c5 \uc120\ud0dd"}),Object(p.jsxs)("select",{value:d.value,onChange:function(t){h({value:t.target.value}),console.log(d)},name:"lifeArr",className:"form-select",id:"exampleSelect1",children:[Object(p.jsx)("option",{value:"\uc2a4\ud0dc\ud504",children:"\uc2a4\ud0dc\ud504"}),Object(p.jsx)("option",{value:"\uacbd\ucc30",children:"\uacbd\ucc30"}),Object(p.jsx)("option",{value:"EMS",children:"EMS"}),Object(p.jsx)("option",{value:"\uc2dc\ubbfc",children:"\uc2dc\ubbfc"})]})]}),"\xa0",Object(p.jsx)("br",{}),Object(p.jsx)("button",{onClick:function(t){if(""==r.id||""==r.pwd||""==r.nickname)alert("\uacf5\ubc31\uc774 \uc788\uc2b5\ub2c8\ub2e4.");else if(r.id.length<5)alert("\uc544\uc774\ub514 4\uc790\uc774\uc0c1\ud558\uc148");else if(r.pwd.length<7)alert("\ube44\ubc00\ubc88\ud638 6\uc790\uc774\uc0c1 \ud558\uc148");else if(r.nickname.length<3)alert("\ub2c9\ub124\uc784 3\uae00\uc790\uc774\uc0c1 \ud558\uc148");else{t.preventDefault(),console.log(O),null!=Object(u.a)(O).find((function(t){return t.id==r.id}))?alert("\uc911\ubcf5\ub41c \uc544\uc774\ub514 \uc785\ub2c8\ub2e4..."):j.a.post("http://localhost:8000/api/insert",{title:r.id,content:r.pwd,job:d.value,nickname:r.nickname}).then((function(){alert("\ud68c\uc6d0\uac00\uc785 \uc131\uacf5!!"),e.push("/sign")}))}},className:"btn btn-primary",children:"   \ud68c\uc6d0\uac00\uc785   "})]})})};var m=function(t){t.props,t.location;var e=t.history,n=Object(a.useState)({id:"",pwd:""}),c=Object(b.a)(n,2),r=c[0],i=c[1],s=Object(a.useState)([]),o=Object(b.a)(s,2),d=o[0],h=o[1];return Object(a.useEffect)((function(){j.a.get("http://localhost:8000/api/get").then((function(t){h(t.data)}))}),[]),Object(p.jsx)("div",{className:"container",children:Object(p.jsxs)("form",{className:"form-signin",children:[Object(p.jsx)("h2",{className:"form-signin-heading",children:"\ub85c\uadf8\uc778 \ucc3d"}),Object(p.jsx)("label",{htmlFor:"inputEmail",className:"sr-only",children:"\uace0 \ubc88"}),Object(p.jsx)("input",{type:"text",onChange:function(t){return i(Object(l.a)(Object(l.a)({},r),{},{id:t.target.value}))},value:r.id,id:"inputEmail",className:"form-control",placeholder:"ID",required:!0,autoFocus:!0}),Object(p.jsx)("label",{htmlFor:"inputPassword",className:"sr-only",children:"\ube44\ubc00\ubc88\ud638"}),Object(p.jsx)("input",{type:"password",onChange:function(t){return i(Object(l.a)(Object(l.a)({},r),{},{pwd:t.target.value}))},value:r.pwd,id:"inputPassword",className:"form-control",placeholder:"Password",required:!0}),Object(p.jsx)("br",{}),Object(p.jsx)("button",{onClick:function(){var t=Object(u.a)(d).find((function(t){return t.id=r.id}));null==t?alert("\ub85c\uadf8\uc778\uc2e4\ud328"):t.id==r.id&&t.pwd==r.pwd?(alert("\ub85c\uadf8\uc778 \uc131\uacf5"),e.push({pathname:"/Menupage",id:{id:t}})):alert("\ub85c\uadf8\uc778 \uc2e4\ud328..")},className:"btn btn-lg btn-primary btn-block",type:"submit",children:" \ub85c\uadf8\uc778 "}),"\xa0",Object(p.jsx)("button",{onClick:function(){return e.push("/main")},className:"btn btn-lg btn-primary btn-block",children:" \ud68c\uc6d0\uac00\uc785 "}),"\xa0"]})})},f=n(2),O=n.n(f),g=n(7),x=(n(63),n(36)),v=n.n(x),w=n(15),y=n.n(w);var N=function(t){var e=t.location,n=(t.history,e),c=Object(a.useState)({id:"",pwd:""}),r=Object(b.a)(c,2),i=(r[0],r[1],Object(a.useState)([])),s=Object(b.a)(i,2),o=(s[0],s[1]),l=Object(a.useState)([]),u=Object(b.a)(l,2),d=u[0],h=u[1],m=Object(a.useState)([]),f=Object(b.a)(m,2),x=f[0],w=f[1],N=Object(a.useState)(),k=Object(b.a)(N,2),M=k[0],S=k[1],Y=Object(a.useState)(0),E=Object(b.a)(Y,2),C=E[0],F=E[1],D=Object(a.useState)("\ud1f4\uadfc"),P=Object(b.a)(D,2),I=P[0],q=P[1],B=Object(a.useState)(Date.now()),H=Object(b.a)(B,2),J=H[0],L=H[1];!function(t,e){var n=Object(a.useRef)();Object(a.useEffect)((function(){n.current=t})),Object(a.useEffect)((function(){function t(){n.current()}var a=setInterval(t,e);return function(){return clearInterval(a)}}),[e])}((function(){L(Date.now())}),1e3),Date.now(),Object(a.useEffect)((function(){j.a.get("http://localhost:8000/api/get").then((function(t){o(t.data)}))}),[J],[M]),Object(a.useEffect)((function(){R(),j.a.post("http://localhost:8000/api/gettime",{title:n.id.id.id,date:J}).then((function(t){t.data==n.id.id.id?(q("\ucd9c\uadfc"),console.log("status\uac12",I)):q("\ud1f4\uadfc")}))}),[]);var T=function(){var t=Object(g.a)(O.a.mark((function t(){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j.a.post("http://localhost:8000/api/gettime",{title:n.id.id.id,date:J}).then((function(t){t.data==n.id.id.id?(alert("\uc774\ubbf8 \ucd9c\uadfc\ud558\uc168\uc2b5\ub2c8\ub2e4."),q("\ucd9c\uadfc")):(A(),q("\ucd9c\uadfc"))}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();Object(a.useEffect)((function(){console.log("status \uac12",I)}),[I]);var A=function(){var t=Object(g.a)(O.a.mark((function t(){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,j.a.post("http://localhost:8000/api/insert2",{title:n.id.id.id,date:J,nickname:n.id.id.nickname}).then((function(t){console.log("\ubc1b\uc740\uac12",t),alert("\ucd9c\uadfc \uc131\uacf5")}));case 3:t.next=8;break;case 5:t.prev=5,t.t0=t.catch(0),console.log("\ucd9c\uadfc\uc5d0\ub7ec : ",t.t0);case 8:case"end":return t.stop()}}),t,null,[[0,5]])})));return function(){return t.apply(this,arguments)}}(),R=function(){var t=Object(g.a)(O.a.mark((function t(){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j.a.post("http://localhost:8000/api/getworktime",{title:n.id.id.id}).then((function(t){S(t.data[0].sumprice),console.log(t.data[0].sumprice)}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),z=function(){var t=Object(g.a)(O.a.mark((function t(){var e,a;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j.a.post("http://localhost:8000/api/getwork",{title:n.id.id.id});case 2:(e=t.sent).data==n.id.id.id?alert("\ucd9c\uadfc\ud558\uc9c0 \uc54a\uc73c\uc168\uc2b5\ub2c8\ub2e4."):(a=e.data[0].start,F(1),G(a));case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),G=function(t){h((function(e,n){return{work:t}}))};Object(a.useEffect)((function(){console.log("\ubc14\ub010\ub4a4 work\uac12 : ",d),K()}),[d]),Object(a.useEffect)((function(){1==C&&Q()}),[x]);var K=function(){try{var t=y()(d.work,"MMMM Do YYYY, h:mm:ss a"),e=y()(J);console.log(t.format("MMMM Do YYYY, h:mm:ss a")),console.log(e.format("MMMM Do YYYY, h:mm:ss a"));var n=y.a.duration(e.diff(t)).asMinutes();console.log(n),w(n),console.log(e)}catch(a){console.log(a)}},Q=function(){var t=Object(g.a)(O.a.mark((function t(){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j.a.post("http://localhost:8000/api/update",{title:n.id.id.id,date:y()(J).format("MMMM Do YYYY, h:mm:ss a"),worktime:x}).then((function(){console.log("\uc77c\ud55c\uc2dc\uac04",x),F(0),R(),alert("\ud1f4\uadfc\ud588\uc2b5\ub2c8\ub2e4."),q("\ud1f4\uadfc")}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(p.jsxs)("div",{className:"d-grid gap-2",children:[Object(p.jsxs)("h1",{children:[n.id.id.id," \ub2d8 \ud658\uc601\ud569\ub2c8\ub2e4."]}),Object(p.jsxs)("h2",{children:["\uc544\uc774\ub514 : ",n.id.id.id]}),Object(p.jsxs)("h2",{children:["\uc9c1\uc5c5 : ",n.id.id.job]}),Object(p.jsxs)("div",{className:"alert alert-dismissible alert-warning",children:[Object(p.jsx)("button",{type:"button",className:"btn-close","data-bs-dismiss":"alert"}),Object(p.jsx)("h4",{className:"alert-heading",children:"\uc54c\ub9bc"}),Object(p.jsxs)("p",{className:"mb-0",children:[n.id.id.nickname," \ub2d8\uc740 \ud604\uc7ac ",Object(p.jsx)("a",{href:"#",className:"alert-link",children:I})," \uc0c1\ud0dc\uc785\ub2c8\ub2e4."]})]}),Object(p.jsx)("button",{className:"btn btn-lg btn-primary",type:"button",value:"\uc2a4\ud0dc\ud504",children:"\uc2a4\ud0dc\ud504"}),Object(p.jsx)("button",{className:"btn btn-lg btn-primary",type:"button",value:"\uacbd\ucc30",children:"\uacbd\ucc30"}),Object(p.jsx)("button",{className:"btn btn-lg btn-primary",type:"button",value:"EMS",children:"EMS"}),Object(p.jsx)(v.a,{format:"YYYY\ub144 MM\uc6d4 DD\uc77c HH\uc2dc mm\ubd84 ss\ucd08",interval:0,children:J}),Object(p.jsx)("button",{onClick:function(){T()},className:"btn btn-lg btn-primary",type:"button",children:"\ucd9c\uadfc"}),Object(p.jsx)("button",{onClick:function(){try{z()}catch(t){console.log(t)}},className:"btn btn-lg btn-primary",type:"button",children:"\ud1f4\uadfc"}),Object(p.jsx)("button",{onClick:z,className:"btn btn-lg btn-primary",type:"button",children:"\uac12 \ubd88\ub7ec\uc624\uae30"}),Object(p.jsx)("button",{onClick:K,className:"btn btn-lg btn-primary",type:"button",children:"\uc2dc\uac04\uacc4\uc0b0"}),Object(p.jsx)("button",{onClick:R,className:"btn btn-lg btn-primary",type:"button",children:"\ucd1d\ud569\uc2dc\uac04\uacc4\uc0b0"}),Object(p.jsxs)("h1",{children:["\ucd1d \uc77c\ud55c\uc2dc\uac04 : ",parseInt(Number(M)/60)," \uc2dc\uac04 ",parseInt(Number(M))%60," \ubd84"]})]})};var k=function(t){return t.props,t.location,t.history,Object(p.jsx)(p.Fragment,{children:Object(p.jsx)(s.a,{children:Object(p.jsx)(o.c,{children:Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(o.a,{path:"/sign",component:m}),Object(p.jsx)(o.a,{path:"/main",component:h}),Object(p.jsx)(o.a,{path:"/menupage",component:N}),Object(p.jsx)(s.b,{to:"/sign",children:"sign"})]})})})})},M=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,72)).then((function(e){var n=e.getCLS,a=e.getFID,c=e.getFCP,r=e.getLCP,i=e.getTTFB;n(t),a(t),c(t),r(t),i(t)}))};i.a.render(Object(p.jsx)(c.a.StrictMode,{children:Object(p.jsx)(k,{})}),document.getElementById("root")),M()}},[[70,1,2]]]);
//# sourceMappingURL=main.a419c6cf.chunk.js.map