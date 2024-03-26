"use strict";(self.webpackChunkdevyuseon_github_io=self.webpackChunkdevyuseon_github_io||[]).push([[344],{8320:(e,t,n)=>{n.r(t),n.d(t,{default:()=>v});n(1504);var s=n(5456),a=n(5756),i=n(5864),o=n(3152),r=n(9452),l=n(3988),c=n(4357),d=n(308),u=n(7624);function m(e){const{nextItem:t,prevItem:n}=e;return(0,u.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,c.G)({id:"theme.blog.post.paginator.navAriaLabel",message:"Blog post page navigation",description:"The ARIA label for the blog posts pagination"}),children:[n&&(0,u.jsx)(d.c,{...n,subLabel:(0,u.jsx)(c.c,{id:"theme.blog.post.paginator.newerPost",description:"The blog post button label to navigate to the newer/previous post",children:"Newer Post"})}),t&&(0,u.jsx)(d.c,{...t,subLabel:(0,u.jsx)(c.c,{id:"theme.blog.post.paginator.olderPost",description:"The blog post button label to navigate to the older/next post",children:"Older Post"}),isNext:!0})]})}function g(){const{assets:e,metadata:t}=(0,o.g)(),{title:n,description:s,date:i,tags:r,authors:l,frontMatter:c}=t,{keywords:d}=c,m=e.image??c.image;return(0,u.jsxs)(a.U7,{title:n,description:s,keywords:d,image:m,children:[(0,u.jsx)("meta",{property:"og:type",content:"article"}),(0,u.jsx)("meta",{property:"article:published_time",content:i}),l.some((e=>e.url))&&(0,u.jsx)("meta",{property:"article:author",content:l.map((e=>e.url)).filter(Boolean).join(",")}),r.length>0&&(0,u.jsx)("meta",{property:"article:tag",content:r.map((e=>e.label)).join(",")})]})}var f=n(784),h=n(1528);function p(e){let{sidebar:t,children:n}=e;const{metadata:s,toc:a}=(0,o.g)(),{nextItem:i,prevItem:c,frontMatter:d,unlisted:g}=s,{hide_table_of_contents:p,toc_min_heading_level:v,toc_max_heading_level:x}=d;return(0,u.jsxs)(r.c,{sidebar:t,toc:!p&&a.length>0?(0,u.jsx)(f.c,{toc:a,minHeadingLevel:v,maxHeadingLevel:x}):void 0,children:[g&&(0,u.jsx)(h.c,{}),(0,u.jsx)(l.c,{children:n}),(i||c)&&(0,u.jsx)(m,{nextItem:i,prevItem:c})]})}function v(e){const t=e.content;return(0,u.jsx)(o.E,{content:e.content,isBlogPostPage:!0,children:(0,u.jsxs)(a.cr,{className:(0,s.c)(i.W.wrapper.blogPages,i.W.page.blogPostPage),children:[(0,u.jsx)(g,{}),(0,u.jsx)(p,{sidebar:e.sidebar,children:(0,u.jsx)(t,{})})]})})}},784:(e,t,n)=>{n.d(t,{c:()=>j});var s=n(1504),a=n(5456),i=n(1824);function o(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const s=n.slice(2,e.level);e.parentIndex=Math.max(...s),n[e.level]=t}));const s=[];return t.forEach((e=>{const{parentIndex:n,...a}=e;n>=0?t[n].children.push(a):s.push(a)})),s}function r(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:s}=e;return t.flatMap((e=>{const t=r({toc:e.children,minHeadingLevel:n,maxHeadingLevel:s});return function(e){return e.level>=n&&e.level<=s}(e)?[{...e,children:t}]:t}))}function l(e){const t=e.getBoundingClientRect();return t.top===t.bottom?l(e.parentNode):t}function c(e,t){let{anchorTopOffset:n}=t;const s=e.find((e=>l(e).top>=n));if(s){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(l(s))?s:e[e.indexOf(s)-1]??null}return e[e.length-1]??null}function d(){const e=(0,s.useRef)(0),{navbar:{hideOnScroll:t}}=(0,i.y)();return(0,s.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function u(e){const t=(0,s.useRef)(void 0),n=d();(0,s.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:s,linkActiveClassName:a,minHeadingLevel:i,maxHeadingLevel:o}=e;function r(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(s),r=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const s=[];for(let a=t;a<=n;a+=1)s.push(`h${a}.anchor`);return Array.from(document.querySelectorAll(s.join()))}({minHeadingLevel:i,maxHeadingLevel:o}),l=c(r,{anchorTopOffset:n.current}),d=e.find((e=>l&&l.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(a),e.classList.add(a),t.current=e):e.classList.remove(a)}(e,e===d)}))}return document.addEventListener("scroll",r),document.addEventListener("resize",r),r(),()=>{document.removeEventListener("scroll",r),document.removeEventListener("resize",r)}}),[e,n])}var m=n(867),g=n(7624);function f(e){let{toc:t,className:n,linkClassName:s,isChild:a}=e;return t.length?(0,g.jsx)("ul",{className:a?void 0:n,children:t.map((e=>(0,g.jsxs)("li",{children:[(0,g.jsx)(m.c,{to:`#${e.id}`,className:s??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,g.jsx)(f,{isChild:!0,toc:e.children,className:n,linkClassName:s})]},e.id)))}):null}const h=s.memo(f);function p(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:a="table-of-contents__link",linkActiveClassName:l,minHeadingLevel:c,maxHeadingLevel:d,...m}=e;const f=(0,i.y)(),p=c??f.tableOfContents.minHeadingLevel,v=d??f.tableOfContents.maxHeadingLevel,x=function(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return(0,s.useMemo)((()=>r({toc:o(t),minHeadingLevel:n,maxHeadingLevel:a})),[t,n,a])}({toc:t,minHeadingLevel:p,maxHeadingLevel:v});return u((0,s.useMemo)((()=>{if(a&&l)return{linkClassName:a,linkActiveClassName:l,minHeadingLevel:p,maxHeadingLevel:v}}),[a,l,p,v])),(0,g.jsx)(h,{toc:x,className:n,linkClassName:a,...m})}const v={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"},x="table-of-contents__link toc-highlight",b="table-of-contents__link--active";function j(e){let{className:t,...n}=e;return(0,g.jsx)("div",{className:(0,a.c)(v.tableOfContents,"thin-scrollbar",t),children:(0,g.jsx)(p,{...n,linkClassName:x,linkActiveClassName:b})})}},1528:(e,t,n)=>{n.d(t,{c:()=>g});n(1504);var s=n(5456),a=n(4357),i=n(6952),o=n(7624);function r(){return(0,o.jsx)(a.c,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function l(){return(0,o.jsx)(a.c,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function c(){return(0,o.jsx)(i.c,{children:(0,o.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}var d=n(5864),u=n(304);function m(e){let{className:t}=e;return(0,o.jsx)(u.c,{type:"caution",title:(0,o.jsx)(r,{}),className:(0,s.c)(t,d.W.common.unlistedBanner),children:(0,o.jsx)(l,{})})}function g(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(c,{}),(0,o.jsx)(m,{...e})]})}},3988:(e,t,n)=>{n.d(t,{c:()=>l});var s=n(1504),a=n(7408),i=n(6528),o=n(7624);const r=function(){const e=(0,s.useRef)(null),t=(0,s.useRef)(null),{colorMode:n}=(0,i.U)(),a="dark"===n?"dark":"light";return(0,s.useEffect)((()=>{(()=>{const n=document.createElement("script");n.src="https://giscus.app/client.js",n.setAttribute("data-repo","devyuseon/devyuseon.github.io"),n.setAttribute("data-repo-id","R_kgDOGfRXdQ"),n.setAttribute("data-category","Comments"),n.setAttribute("data-category-id","DIC_kwDOGfRXdc4CePRR"),n.setAttribute("data-mapping","pathname"),n.setAttribute("data-strict","0"),n.setAttribute("data-reactions-enabled","1"),n.setAttribute("data-emit-metadata","0"),n.setAttribute("data-input-position","bottom"),n.setAttribute("data-theme",a),n.setAttribute("data-lang","ko"),n.crossOrigin="anonymous",n.async=!0,n.onload=()=>{t.current=document.querySelector(".giscus-frame")},e.current.appendChild(n)})()}),[]),(0,s.useEffect)((()=>{if(!t.current)return;const e={setConfig:{theme:a}};t.current.contentWindow.postMessage({giscus:e},"https://giscus.app")}),[a]),(0,o.jsx)("div",{ref:e})};function l(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(a.c,{...e}),(0,o.jsx)(r,{})]})}}}]);