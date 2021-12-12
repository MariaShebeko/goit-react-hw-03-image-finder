(this["webpackJsonpgoit-react-hw-03-image-finder"]=this["webpackJsonpgoit-react-hw-03-image-finder"]||[]).push([[0],{12:function(e,t,a){e.exports={ImageGalleryItem:"ImageGalleryItem_ImageGalleryItem__3vatn",image:"ImageGalleryItem_image__1nxBg"}},13:function(e,t,a){e.exports={button:"LoadMoreButton_button__2AeyV",icon:"LoadMoreButton_icon__3cJSf",spin:"LoadMoreButton_spin__3NQgN"}},14:function(e,t,a){e.exports={overlay:"Modal_overlay__1OpkY",modal:"Modal_modal__1to94"}},15:function(e,t,a){e.exports={ImageGallery:"ImageGallery_ImageGallery__CQGTl",text:"ImageGallery_text__oHavH"}},19:function(e,t,a){e.exports={Loader:"Loader_Loader__2jWux"}},25:function(e,t,a){},26:function(e,t,a){},50:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(4),c=a.n(o),s=(a(25),a(5)),i=a(6),l=a(8),m=a(7),u=(a(26),a(10)),d=a(17),h=a(9),g=a.n(h),j=(a(27),a(2)),b=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={imageName:""},e.handleNameChange=function(t){e.setState({imageName:t.target.value.toLowerCase()})},e.handleNameSubmit=function(t){if(t.preventDefault(),""===e.state.imageName.trim())return u.b.warning("Press the name of the image!",{position:"top-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"});e.props.onSubmit(e.state.imageName),e.setState({imageName:""})},e}return Object(i.a)(a,[{key:"render",value:function(){return Object(j.jsx)("header",{className:g.a.Searchbar,children:Object(j.jsxs)("form",{className:g.a.SearchForm,onSubmit:this.handleNameSubmit,children:[Object(j.jsxs)("button",{type:"submit",className:g.a.SearchFormButton,children:[Object(j.jsx)("span",{className:g.a.label,children:"Search"})," ",Object(j.jsx)(d.a,{})]}),Object(j.jsx)("input",{onChange:this.handleNameChange,className:g.a.input,type:"text",autoComplete:"off",autoFocus:!0,placeholder:"Search images and photos"})]})})}}]),a}(n.Component),p=b,f=a(16),O=a(12),_=a.n(O),x=function(e){var t=e.src,a=e.alt,n=e.largeImage,r=e.id,o=e.onClick;return Object(j.jsx)("li",{className:_.a.ImageGalleryItem,onClick:o,children:Object(j.jsx)("img",{src:t,alt:a,"data-src":n,className:_.a.image})},r)};function v(e){var t=e.message;return Object(j.jsx)("div",{role:"alert",children:Object(j.jsx)("p",{children:t})})}a(29);var S=a(18),y=a.n(S),N=a(19),I=a.n(N);function k(){return Object(j.jsx)("div",{className:I.a.Loader,children:Object(j.jsx)(y.a,{type:"Plane",color:"#00BFFF",height:80,width:80,timeout:3e3})})}var C=a(20),w=a(13),M=a.n(w),G=function(e){var t=e.onClick;return Object(j.jsxs)("button",{className:M.a.button,type:"button",onClick:function(){return t()},children:[Object(j.jsx)(C.a,{className:M.a.icon})," ",Object(j.jsx)("span",{children:"Load more"})]})},F=a(14),L=a.n(F),B=document.querySelector("#modal-root");var A=function(e){var t=e.src,a=e.alt,n=e.onClose;return Object(o.createPortal)(Object(j.jsx)("div",{className:L.a.overlay,onClick:n,children:Object(j.jsx)("div",{className:L.a.modal,children:Object(j.jsx)("img",{src:t,alt:a})})}),B)},P=a(15),U=a.n(P),E="23951703-436932e17dab2edd529d032c5",H="https://pixabay.com/api/",J=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={images:[],page:1,error:null,status:"idle",loading:!1,showModal:!1,modalUrl:"",modalAlt:""},e.renderGallery=function(){fetch("".concat(H,"?q=").concat(e.props.imageName,"&page=").concat(e.state.page,"&key=").concat(E,"&image_type=photo&orientation=horizontal&per_page=12")).then((function(e){return e.ok?e.json():Promise.reject(new Error("No images with this name"))})).then((function(e){return e.hits})).then((function(t){return e.setState((function(e){return{images:[].concat(Object(f.a)(e.images),Object(f.a)(t)),status:"resolved",page:e.page+1,loading:!1}}))})).catch((function(t){return e.setState({error:t,status:"rejected"})}))},e.toIncreasePage=function(){e.setState((function(t){if(e.state.images.length>1)return{page:t.page}}))},e.onLoadMore=function(){e.setState({loading:!0}),e.toIncreasePage(),e.renderGallery()},e.toggleModal=function(){e.setState((function(e){return{showModal:!e.showModal}}))},e.onImageClick=function(t){if("IMG"===t.target.nodeName){var a=t.target.getAttribute("src"),n=t.target.getAttribute("alt");e.setState({showModal:!0,modalUrl:a,modalAlt:n})}},e}return Object(i.a)(a,[{key:"componentDidUpdate",value:function(e){var t=this;e.imageName!==this.props.imageName&&(this.setState({status:"pending",page:1,images:[]}),this.renderGallery(),window.addEventListener("keydown",(function(e){"Escape"===e.code&&t.toggleModal()})))}},{key:"render",value:function(){var e=this,t=this.state,a=t.images,n=t.error,r=t.status,o=t.showModal,c=t.modalUrl,s=t.modalAlt;return"idle"===r?Object(j.jsx)("div",{className:U.a.text,children:"Press the name of the image"}):"pending"===r?Object(j.jsx)(k,{}):"rejected"===r?Object(j.jsx)(v,{message:n.message}):"resolved"===r?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("ul",{className:U.a.ImageGallery,children:a.map((function(t){return Object(j.jsx)(x,{src:t.webformatURL,alt:t.tags,"data-src":t.largeImageURL,onClick:e.onImageClick},t.id)}))}),o&&Object(j.jsx)(A,{src:c,alt:s,onClose:this.toggleModal}),this.state.images.length>0&&!this.state.loading&&Object(j.jsx)(G,{onClick:this.onLoadMore})]}):void 0}}]),a}(n.Component),R=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={images:[],loading:!1,imageName:""},e.handleSearchBarSubmit=function(t){e.setState({imageName:t})},e}return Object(i.a)(a,[{key:"render",value:function(){return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{children:[Object(j.jsx)(p,{onSubmit:this.handleSearchBarSubmit}),Object(j.jsx)(J,{imageName:this.state.imageName}),Object(j.jsx)(u.a,{})]})})}}]),a}(n.Component),q=R;c.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(q,{})}),document.getElementById("root"))},9:function(e,t,a){e.exports={Searchbar:"Searchbar_Searchbar__2PHVR",SearchForm:"Searchbar_SearchForm__2krl6",SearchFormButton:"Searchbar_SearchFormButton__2KlAj",label:"Searchbar_label__2_Bmo",input:"Searchbar_input__3bh5l","SearchForm-input":"Searchbar_SearchForm-input__1zsdW"}}},[[50,1,2]]]);
//# sourceMappingURL=main.702d1248.chunk.js.map