(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-378034bd"],{5530:function(t,e,c){"use strict";c.d(e,"a",(function(){return o}));c("b64b"),c("a4d3"),c("4de4"),c("d3b7"),c("e439"),c("159b"),c("dbb4");function a(t,e,c){return e in t?Object.defineProperty(t,e,{value:c,enumerable:!0,configurable:!0,writable:!0}):t[e]=c,t}function n(t,e){var c=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),c.push.apply(c,a)}return c}function o(t){for(var e=1;e<arguments.length;e++){var c=null!=arguments[e]?arguments[e]:{};e%2?n(Object(c),!0).forEach((function(e){a(t,e,c[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(c)):n(Object(c)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(c,e))}))}return t}},"76db":function(t,e,c){"use strict";c.r(e);c("b0c0");var a=c("7a23"),n={class:"container"},o={class:"mt-4 row justify-content-center"},s={class:"col-md-6"},r={class:"sticky-top"},i={class:"table align-middle"},l=Object(a["h"])("thead",null,[Object(a["h"])("tr",null,[Object(a["h"])("th"),Object(a["h"])("th",null,"品名"),Object(a["h"])("th",{style:{width:"110px"}},"數量"),Object(a["h"])("th",null,"單價")])],-1),u=["disabled","onClick"],d=Object(a["h"])("i",{class:"bi bi-x"},null,-1),b=[d],h={key:0,class:"text-success"},j={class:"input-group input-group-sm"},O=["onUpdate:modelValue","onChange","disabled"],f={class:"input-group-text"},m={class:"text-end"},p={key:0,class:"text-success"},g=Object(a["h"])("td",{colspan:"3",class:"text-end"},"總計",-1),v={class:"text-end"},y={key:0},x=Object(a["h"])("td",{colspan:"3",class:"text-end text-success"},"折扣價",-1),w={class:"text-end text-success"},k={class:"input-group mb-3 input-group-sm"},C={class:"input-group-append"},P={class:"my-5 row justify-content-center"},V={class:"mb-3"},_=Object(a["h"])("label",{for:"email",class:"form-label"},"Email",-1),L={class:"mb-3"},U=Object(a["h"])("label",{for:"name",class:"form-label"},"收件人姓名",-1),$={class:"mb-3"},I=Object(a["h"])("label",{for:"tel",class:"form-label"},"收件人電話",-1),q={class:"mb-3"},S=Object(a["h"])("label",{for:"address",class:"form-label"},"收件人地址",-1),D={class:"mb-3"},E=Object(a["h"])("label",{for:"message",class:"form-label"},"留言",-1),K=Object(a["h"])("div",{class:"text-end"},[Object(a["h"])("button",{class:"btn btn-danger"},"送出訂單")],-1);function M(t,e,c,d,M,H){var F=Object(a["H"])("Loading"),J=Object(a["H"])("Field"),N=Object(a["H"])("ErrorMessage"),T=Object(a["H"])("Form");return Object(a["x"])(),Object(a["g"])(a["a"],null,[Object(a["j"])(F,{active:M.isLoading},null,8,["active"]),Object(a["h"])("div",n,[Object(a["h"])("div",o,[Object(a["h"])("div",s,[Object(a["h"])("div",r,[Object(a["h"])("table",i,[l,Object(a["h"])("tbody",null,[M.cart.carts?(Object(a["x"])(!0),Object(a["g"])(a["a"],{key:0},Object(a["F"])(M.cart.carts,(function(e){return Object(a["x"])(),Object(a["g"])("tr",{key:e.id},[Object(a["h"])("td",null,[Object(a["h"])("button",{type:"button",class:"btn btn-outline-danger btn-sm",disabled:M.status.loadingItem===e.id,onClick:function(t){return H.removeCartItem(e.id)}},b,8,u)]),Object(a["h"])("td",null,[Object(a["i"])(Object(a["K"])(e.product.title)+" ",1),e.coupon?(Object(a["x"])(),Object(a["g"])("div",h," 已套用優惠券 ")):Object(a["f"])("",!0)]),Object(a["h"])("td",null,[Object(a["h"])("div",j,[Object(a["U"])(Object(a["h"])("input",{type:"number",class:"form-control",min:"1","onUpdate:modelValue":function(t){return e.qty=t},onChange:function(t){return H.updateCart(e)},disabled:M.status.loadingItem===e.id},null,40,O),[[a["O"],e.qty,void 0,{number:!0}]]),Object(a["h"])("div",f," / "+Object(a["K"])(e.product.unit),1)])]),Object(a["h"])("td",m,[M.cart.final_total!==M.cart.total?(Object(a["x"])(),Object(a["g"])("small",p,"折扣價：")):Object(a["f"])("",!0),Object(a["i"])(" "+Object(a["K"])(t.$filters.currency(e.final_total)),1)])])})),128)):Object(a["f"])("",!0)]),Object(a["h"])("tfoot",null,[Object(a["h"])("tr",null,[g,Object(a["h"])("td",v,Object(a["K"])(t.$filters.currency(M.cart.total)),1)]),M.cart.final_total!==M.cart.total?(Object(a["x"])(),Object(a["g"])("tr",y,[x,Object(a["h"])("td",w,Object(a["K"])(t.$filters.currency(M.cart.final_total)),1)])):Object(a["f"])("",!0)])]),Object(a["h"])("div",k,[Object(a["U"])(Object(a["h"])("input",{type:"text",class:"form-control","onUpdate:modelValue":e[0]||(e[0]=function(t){return M.coupon_code=t}),placeholder:"請輸入優惠碼"},null,512),[[a["O"],M.coupon_code]]),Object(a["h"])("div",C,[Object(a["h"])("button",{class:"btn btn-outline-secondary",type:"button",onClick:e[1]||(e[1]=function(t){return H.addCouponCode(M.coupon_code)})}," 套用優惠碼 ")])])])])]),Object(a["h"])("div",P,[Object(a["j"])(T,{class:"col-md-6",onSubmit:e[7]||(e[7]=function(t){return H.createOrder(M.form)})},{default:Object(a["T"])((function(t){var c=t.errors;return[Object(a["h"])("div",V,[_,Object(a["j"])(J,{id:"email",name:"email",type:"email",class:Object(a["r"])(["form-control",{"is-invalid":c["email"]}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:M.form.user.email,"onUpdate:modelValue":e[2]||(e[2]=function(t){return M.form.user.email=t})},null,8,["class","modelValue"]),Object(a["j"])(N,{name:"email",class:"invalid-feedback"})]),Object(a["h"])("div",L,[U,Object(a["j"])(J,{id:"name",name:"姓名",type:"text",class:Object(a["r"])(["form-control",{"is-invalid":c["姓名"]}]),placeholder:"請輸入姓名",rules:"required",modelValue:M.form.user.name,"onUpdate:modelValue":e[3]||(e[3]=function(t){return M.form.user.name=t})},null,8,["class","modelValue"]),Object(a["j"])(N,{name:"姓名",class:"invalid-feedback"})]),Object(a["h"])("div",$,[I,Object(a["j"])(J,{id:"tel",name:"電話",type:"tel",class:Object(a["r"])(["form-control",{"is-invalid":c["電話"]}]),placeholder:"請輸入電話",rules:H.isPhone,modelValue:M.form.user.tel,"onUpdate:modelValue":e[4]||(e[4]=function(t){return M.form.user.tel=t})},null,8,["class","rules","modelValue"]),Object(a["j"])(N,{name:"電話",class:"invalid-feedback"})]),Object(a["h"])("div",q,[S,Object(a["j"])(J,{id:"address",name:"地址",type:"text",class:Object(a["r"])(["form-control",{"is-invalid":c["地址"]}]),placeholder:"請輸入地址",rules:"required",modelValue:M.form.user.address,"onUpdate:modelValue":e[5]||(e[5]=function(t){return M.form.user.address=t})},null,8,["class","modelValue"]),Object(a["j"])(N,{name:"地址",class:"invalid-feedback"})]),Object(a["h"])("div",D,[E,Object(a["U"])(Object(a["h"])("textarea",{name:"",id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":e[6]||(e[6]=function(t){return M.form.message=t})},null,512),[[a["O"],M.form.message]])]),K]})),_:1})])])],64)}var H=c("5530"),F=c("2909"),J=(c("99af"),c("ac1f"),c("00b4"),{data:function(){return{isLoading:!1,products:[],status:{loadingItem:""},cart:{},coupon_code:"",form:{user:{name:"",email:"",tel:"",address:""}},message:""}},inject:["emitter"],created:function(){this.getProducts(),this.getCart()},methods:{getProducts:function(){var t=this;this.isLoading=!0;var e="".concat("https://vue3-course-api.hexschool.io/","api/").concat("timothy80617","/products/all");this.axios.get(e).then((function(e){t.products=Object(F["a"])(e.data.products),t.isLoading=!1}))},getProduct:function(t){this.$router.push("/user/product/".concat(t))},getCart:function(){var t=this;this.isLoading=!0;var e="".concat("https://vue3-course-api.hexschool.io/","api/").concat("timothy80617","/cart");this.axios.get(e).then((function(e){t.cart=Object(H["a"])({},e.data.data),t.isLoading=!1}))},removeCartItem:function(t){var e=this,c="".concat("https://vue3-course-api.hexschool.io/","api/").concat("timothy80617","/cart/").concat(t);this.axios.delete(c).then((function(t){e.getCart(),e.$pushMessageState(t.data)}))},updateCart:function(t){var e=this,c="".concat("https://vue3-course-api.hexschool.io/","api/").concat("timothy80617","/cart/").concat(t.id),a={product_id:t.product_id,qty:t.qty};this.isLoading=!0,this.status.loadingItem=t.id,this.axios.put(c,{data:a}).then((function(t){e.isLoading=!1,e.status.loadingItem="",e.getCart(),e.$pushMessageState(t.data)}))},addCouponCode:function(t){var e=this;this.isLoading=!0;var c="".concat("https://vue3-course-api.hexschool.io/","api/").concat("timothy80617","/coupon");this.axios.post(c,{data:{code:t}}).then((function(t){e.isLoading=!1,e.coupon_code="",e.getCart(),e.$pushMessageState(t.data)}))},createOrder:function(t){var e=this,c="".concat("https://vue3-course-api.hexschool.io/","api/").concat("timothy80617","/order");this.axios.post(c,{data:t}).then((function(t){e.$pushMessageState(t.data,e.isNew?"新增":"更新"),t.data.success&&e.$router.push("/user/checkout/".concat(t.data.orderId))}))},isPhone:function(t){if(!t)return"電話號碼 為必填";var e=/^(09)[0-9]{8}$/;return!!e.test(t)||"需要正確的電話號碼"}}}),N=c("6b0d"),T=c.n(N);const z=T()(J,[["render",M]]);e["default"]=z},b64b:function(t,e,c){var a=c("23e7"),n=c("7b0b"),o=c("df75"),s=c("d039"),r=s((function(){o(1)}));a({target:"Object",stat:!0,forced:r},{keys:function(t){return o(n(t))}})},dbb4:function(t,e,c){var a=c("23e7"),n=c("83ab"),o=c("56ef"),s=c("fc6a"),r=c("06cf"),i=c("8418");a({target:"Object",stat:!0,sham:!n},{getOwnPropertyDescriptors:function(t){var e,c,a=s(t),n=r.f,l=o(a),u={},d=0;while(l.length>d)c=n(a,e=l[d++]),void 0!==c&&i(u,e,c);return u}})},e439:function(t,e,c){var a=c("23e7"),n=c("d039"),o=c("fc6a"),s=c("06cf").f,r=c("83ab"),i=n((function(){s(1)})),l=!r||i;a({target:"Object",stat:!0,forced:l,sham:!r},{getOwnPropertyDescriptor:function(t,e){return s(o(t),e)}})}}]);
//# sourceMappingURL=chunk-378034bd.caf5493b.js.map