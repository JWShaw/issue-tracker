(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f929fe42"],{"37a7":function(t,e,n){"use strict";n("ebc9")},"7fbb":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{attrs:{href:"#/users/"+t.userId}},[t._v(t._s(t.user.name))])},s=[],c={name:"Username",props:["userId"],data:function(){return{user:{}}},created:function(){var t=this;this.$http.get("/users/"+this.userId).then((function(e){return t.user=e.data})).catch((function(t){return console.log(t)}))}},a=c,o=n("2877"),i=Object(o["a"])(a,r,s,!1,null,null,null);e["a"]=i.exports},acca:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"d-flex w-100 align-items-center justify-content-between topbar"},[n("h1",[t._v("All Projects")]),n("b-button",{attrs:{href:"#/createproject"}},[t._v("New Project")])],1),t._l(t.projects,(function(t){return n("b-list-group",{key:t.id},[n("b-list-group-item",{attrs:{href:"#/projects/"+t._id}},[n("ProjectItem",{attrs:{project:t}})],1)],1)}))],2)},s=[],c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex-column align-items-start"},[n("div",{staticClass:"d-flex w-100 justify-content-between"},[n("h5",{staticClass:"mb-1"},[t._v(t._s(t.project.title))]),n("small",[t._v(" Created "+t._s(new Date(t.project.createdAt).toLocaleDateString())+" ")])]),n("p",{staticClass:"mb-1"},[t._v(" "+t._s(t.project.description)+" ")]),n("small",[t._v("By "),n("Username",{attrs:{userId:t.project.owner}})],1)])},a=[],o=n("7fbb"),i={name:"ProjectItem",components:{Username:o["a"]},props:["project"]},u=i,l=(n("dfe5"),n("2877")),f=Object(l["a"])(u,c,a,!1,null,"37e204fb",null),p=f.exports,d={components:{ProjectItem:p},data:function(){return{projects:[]}},created:function(){var t=this;this.$http.get("/projects").then((function(e){t.projects=e.data})).catch((function(t){return console.log(t)}))}},b=d,j=(n("37a7"),Object(l["a"])(b,r,s,!1,null,"78b228dc",null));e["default"]=j.exports},b02d:function(t,e,n){},dfe5:function(t,e,n){"use strict";n("b02d")},ebc9:function(t,e,n){}}]);
//# sourceMappingURL=chunk-f929fe42.65071174.js.map