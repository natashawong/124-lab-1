(this.webpackJsonplab2=this.webpackJsonplab2||[]).push([[0],{47:function(e,t,n){},51:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var c=n(19),a=n.n(c),o=n(40),i=n.n(o),d=(n(47),n(26)),r=n(14),s=n(5),l="SHOW_ALL",u="HIDE_COMPLETED",j="ADD",b="EDIT",O="BASE",p=n(15);function m(e){var t=e.filterType===u?e.data.filter((function(e){return!e.completed})):e.data,n=Object(c.useState)({}),a=Object(r.a)(n,2),o=(a[0],a[1]),i=Object(c.useState)({}),l=Object(r.a)(i,2),j=(l[0],l[1]),b=Object(c.useState)({}),O=Object(r.a)(b,2),m=(O[0],O[1]);function h(t){return function(n){o((function(e){return Object(d.a)(Object(d.a)({},e),{},Object(s.a)({},n.target.name,n.target.value))})),e.onEditData(n.target.value,t)}}function f(t){return function(n){m((function(e){return Object(d.a)(Object(d.a)({},e),{},Object(s.a)({},n.target.name,n.target.value))})),e.onChangePriority(n.target.value,t)}}return Object(p.jsx)("div",{children:t.map((function(t,n){return Object(p.jsx)("div",{className:"container",children:Object(p.jsxs)("div",{className:"input",children:[Object(p.jsx)("input",{type:"checkbox",id:t.id,name:n,disabled:"EDIT"===e.mode,checked:t.completed,onChange:(c=t.id,function(t){var n=t.target.checked;j((function(e){return Object(d.a)(Object(d.a)({},e),{},Object(s.a)({},t.target.name,t.target.checked))})),e.onSetData(n,c)}),class:"regular-checkbox"}),"EDIT"===e.mode||"ADD"===e.mode&&t.id===e.lastId?Object(p.jsx)("input",{type:"text",id:t.id,name:n,value:t.todo,onChange:h(t.id),className:"todoTextInput"}):Object(p.jsx)("input",{type:"text",id:t.id,name:n,value:t.todo,readOnly:!0,className:"todoTextInput"}),Object(p.jsxs)("select",{name:"listDropdown",className:"listDropdown",onChange:f(t.id),children:[Object(p.jsx)("option",{value:"1",selected:"1"===t.priority,children:"High"}),Object(p.jsx)("option",{value:"2",selected:"2"===t.priority,children:"Medium"}),Object(p.jsx)("option",{value:"3",selected:"3"===t.priority,children:"Low"})]})]},n)});var c}))})}var h=n(36),f=n(41),x=n(42);n(51);h.a.initializeApp({apiKey:"AIzaSyATi5uqr6dkf4iTvqfPHndGwtHXz0O6O-s",authDomain:"lab-90286.firebaseapp.com",databaseURL:"https://lab-90286-default-rtdb.firebaseio.com",projectId:"lab-90286",storageBucket:"lab-90286.appspot.com",messagingSenderId:"782831139249",appId:"1:782831139249:web:2d846e81abb155eeece590",measurementId:"G-YTZ7W2BRD9"});var v=h.a.firestore();var g=function(){var e=v.collection("natasha-bettina-124"),t=Object(c.useState)(e),n=Object(r.a)(t,2),a=n[0],o=n[1],i=Object(c.useState)([]),s=Object(r.a)(i,2),g=s[0],C=s[1],D=Object(c.useState)(""),y=Object(r.a)(D,2),N=y[0],S=y[1],k=Object(c.useState)(l),I=Object(r.a)(k,2),T=I[0],w=I[1],E=Object(c.useState)(O),B=Object(r.a)(E,2),A=B[0],L=B[1],P=Object(c.useState)(!1),F=Object(r.a)(P,2),H=F[0],z=F[1],M=Object(f.a)(a),q=Object(r.a)(M,3),G=q[0];function J(t){e.doc(t).delete()}return q[1],q[2],Object(c.useEffect)((function(){var e=[];G&&(e=G.docs.map((function(e){return Object(d.a)({},e.data())})),C(e))}),[G]),Object(p.jsxs)("div",{children:[a.loading&&Object(p.jsx)("h1",{children:"Loading"}),g&&Object(p.jsxs)(p.Fragment,{children:[Object(p.jsxs)("div",{className:"buttons",children:[Object(p.jsx)("div",{children:Object(p.jsxs)("select",{name:"dropdown",className:"mainDropdown",onChange:function(t){var n=t.target.value,c="creationdate"===n?"desc":"asc",a=e.orderBy(n,c);o(a)},children:[Object(p.jsx)("option",{value:"priority",children:"Priority"}),Object(p.jsx)("option",{value:"todo",children:"Name"}),Object(p.jsx)("option",{value:"creationdate",children:"Creation Date"})]})}),Object(p.jsx)("div",{children:A===j||A===b?Object(p.jsx)("button",{className:"button doneButton",onClick:function(){g.length>0&&""===g[g.length-1].todo&&J(N),L(O)},children:"Done"}):Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("button",{className:"button editButton",onClick:function(){g.map((function(e,t){e.completed&&z(!0)})),L(b)},children:"Edit"}),Object(p.jsx)("button",{className:"button plusButton",onClick:function(){var t=Object(x.a)(),n=h.a.firestore.Timestamp.now();e.doc(t).set({id:t,todo:"",completed:!1,priority:2,creationdate:n}),S(t),L(j)},children:"+"})]})})]}),Object(p.jsx)("div",{className:"body-container",children:Object(p.jsx)("div",{className:"title",children:Object(p.jsx)("h1",{className:"underline",children:"To-do list"})})}),Object(p.jsx)(m,{data:g,filterType:T,onSetData:function(t,n){!function(t,n){var c={id:n,completed:t};e.doc(n).update(c)}(t,n)},onEditData:function(t,n){!function(t,n){var c={id:n,todo:t};e.doc(n).update(c)}(t,n)},onChangePriority:function(t,n){!function(t,n){var c={id:n,priority:t};e.doc(n).update(c)}(t,n)},mode:A,lastId:N}),Object(p.jsxs)("div",{className:"footer",children:[T===u&&H?Object(p.jsx)("button",{className:"button showCompleted",onClick:function(){return w(l)},children:"Show All"}):Object(p.jsx)("button",{className:"button showCompleted",onClick:function(){return w(u)},children:"Hide Completed"}),Object(p.jsx)("button",{className:"button deleteCompleted",onClick:function(e){g.map((function(e,t){e.completed&&J(e.id)}))},children:"Delete Completed"})]})]})]})},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,53)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,o=t.getLCP,i=t.getTTFB;n(e),c(e),a(e),o(e),i(e)}))};i.a.render(Object(p.jsx)(a.a.StrictMode,{children:Object(p.jsx)(g,{})}),document.getElementById("root")),C()}},[[52,1,2]]]);
//# sourceMappingURL=main.b2bd2382.chunk.js.map