(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e500d"],{9341:function(t,e,r){"use strict";r.r(e);var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-form",{on:{submit:t.submit}},[r("b-form-group",{attrs:{id:"title-input-group",label:"Project title:","label-for":"title-input"}},[r("b-form-input",{attrs:{id:"title-input",type:"text",required:"",placeholder:"Enter title"},model:{value:t.project.title,callback:function(e){t.$set(t.project,"title",e)},expression:"project.title"}})],1),r("b-form-group",{attrs:{id:"description-input-group",label:"Project description:","label-for":"description-input"}},[r("b-form-textarea",{attrs:{id:"description-input",placeholder:"Enter a description...",rows:"3","max-rows":"6"},model:{value:t.project.description,callback:function(e){t.$set(t.project,"description",e)},expression:"project.description"}})],1),r("b-button",{attrs:{type:"submit",variant:"primary"}},[t._v("Update Project")]),r("b-button",{attrs:{variant:"danger",href:"#/projects/"+this.$route.params.projId}},[t._v("Cancel")])],1)},i=[],n=(r("a4d3"),r("e01a"),r("96cf"),r("1da1")),c={data:function(){return{project:{title:"",description:""}}},methods:{submit:function(){var t=this;this.$http.patch("/projects/".concat(this.$route.params.projId),this.project,{headers:{Authorization:"Bearer ".concat(localStorage.jwt)}}).then((function(){t.$swal("Project edited successfully!",{icon:"success",buttons:!1,timer:1500}),t.$router.push("./")})).catch((function(e){console.log(e),t.$swal("Error!",{icon:"error",buttons:!1,timer:1500})}))}},created:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$http.get("/projects/".concat(this.$route.params.projId));case 2:e=t.sent,this.project.title=e.data.title,this.project.description=e.data.description;case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},a=c,s=r("2877"),p=Object(s["a"])(a,o,i,!1,null,null,null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d0e500d.8a694701.js.map