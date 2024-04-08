"use strict";(self.webpackChunkdevyuseon_github_io=self.webpackChunkdevyuseon_github_io||[]).push([[1652],{5740:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>t,default:()=>h,frontMatter:()=>c,metadata:()=>i,toc:()=>a});var s=n(7624),o=n(4552);const c={title:"Process.waitFor() \uc774 \uc601\uc6d0\ud788 \ub05d\ub098\uc9c0 \uc54a\ub294\ub2e4.",description:"\uc790\ubc14\uc5d0\uc11c \uc678\ubd80 \ud504\ub85c\uc138\uc2a4\uc5d0 exec() \uba85\ub839\uc744 \uc804\ub2ec\ud558\uace0, waitFor() \uba54\uc11c\ub4dc \uc0ac\uc6a9\uc2dc \ud589\uc774 \uac78\ub9ac\ub294 \uc774\uc288",authors:"yuseonLim",hide_table_of_contents:!1,toc_max_heading_level:4},t=void 0,i={permalink:"/blog/2024/04/08/Process.waitfor-dealock-occur",source:"@site/blog/2024-04-08-Process.waitfor-dealock-occur.md",title:"Process.waitFor() \uc774 \uc601\uc6d0\ud788 \ub05d\ub098\uc9c0 \uc54a\ub294\ub2e4.",description:"\uc790\ubc14\uc5d0\uc11c \uc678\ubd80 \ud504\ub85c\uc138\uc2a4\uc5d0 exec() \uba85\ub839\uc744 \uc804\ub2ec\ud558\uace0, waitFor() \uba54\uc11c\ub4dc \uc0ac\uc6a9\uc2dc \ud589\uc774 \uac78\ub9ac\ub294 \uc774\uc288",date:"2024-04-08T00:00:00.000Z",formattedDate:"April 8, 2024",tags:[],readingTime:7.33,hasTruncateMarker:!0,authors:[{name:"yuseonLim",title:"BackEnd Engineer",url:"https://github.com/devyuseon",imageURL:"https://avatars.githubusercontent.com/u/67352902?v=4",key:"yuseonLim"}],frontMatter:{title:"Process.waitFor() \uc774 \uc601\uc6d0\ud788 \ub05d\ub098\uc9c0 \uc54a\ub294\ub2e4.",description:"\uc790\ubc14\uc5d0\uc11c \uc678\ubd80 \ud504\ub85c\uc138\uc2a4\uc5d0 exec() \uba85\ub839\uc744 \uc804\ub2ec\ud558\uace0, waitFor() \uba54\uc11c\ub4dc \uc0ac\uc6a9\uc2dc \ud589\uc774 \uac78\ub9ac\ub294 \uc774\uc288",authors:"yuseonLim",hide_table_of_contents:!1,toc_max_heading_level:4},unlisted:!1,nextItem:{title:"Spring REST Docs + OAS \uc801\uc6a9\uae30",permalink:"/blog/2024/03/30/springrestdocs-openapi3"}},l={authorsImageUrls:[void 0]},a=[{value:"\ubb38\uc81c \uc0c1\ud669",id:"\ubb38\uc81c-\uc0c1\ud669",level:2},{value:"\uc6d0\uc778",id:"\uc6d0\uc778",level:2},{value:"\ubb38\uc81c\uac00 \ub41c \ubd80\ubd84",id:"\ubb38\uc81c\uac00-\ub41c-\ubd80\ubd84",level:3},{value:"\ub370\ub4dc\ub77d\uc774 \ubc1c\uc0dd\ud558\ub294 \uc0c1\ud669",id:"\ub370\ub4dc\ub77d\uc774-\ubc1c\uc0dd\ud558\ub294-\uc0c1\ud669",level:3},{value:"\ud574\uacb0\ubc29\ubc95",id:"\ud574\uacb0\ubc29\ubc95",level:2},{value:"\ub0b4\uc6a9\uc774 \ud544\uc694 \uc5c6\uc744 \uacbd\uc6b0 - close()",id:"\ub0b4\uc6a9\uc774-\ud544\uc694-\uc5c6\uc744-\uacbd\uc6b0---close",level:3},{value:"Apache Commons Exec \uc0ac\uc6a9",id:"apache-commons-exec-\uc0ac\uc6a9",level:3},{value:"\uc2a4\ub808\ub4dc \ubcd1\ub82c\ucc98\ub9ac",id:"\uc2a4\ub808\ub4dc-\ubcd1\ub82c\ucc98\ub9ac",level:3},{value:"\u2705 Redirect Error Stream",id:"-redirect-error-stream",level:3},{value:"\ucc38\uace0\uc790\ub8cc",id:"\ucc38\uace0\uc790\ub8cc",level:2}];function d(e){const r={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.M)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.p,{children:"Java\uc5d0\uc11c command\ub97c \uc2e4\ud589\ud558\ub294 \ubd80\ubd84\uc5d0\uc11c, \ud589\uc774 \uac78\ub9ac\ub294 \uc774\uc288\uac00 \ubc1c\uc0dd\ud588\ub2e4. \uc544\ubb34 \uc624\ub958\ub3c4 \ub098\ud0c0\ub098\uc9c0 \uc54a\uace0 \uc2dc\uc2a4\ud15c\uc774 \ud589\uc774 \uac78\ub824\ubc84\ub838\ub2e4."}),"\n",(0,s.jsx)(r.h2,{id:"\ubb38\uc81c-\uc0c1\ud669",children:"\ubb38\uc81c \uc0c1\ud669"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-java",children:"Process process = Runtime.getRuntime().exec(command);  \nprocess.waitFor(); // \uc5ec\uae30\uac00 \ubb38\uc81c\n"})}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"waitFor()"})," \uac00 \ub05d\ub098\uc9c0 \uc54a\ub294 \ubb38\uc81c\uac00 \uc788\uc5c8\ub2e4."]}),"\n",(0,s.jsx)(r.h2,{id:"\uc6d0\uc778",children:"\uc6d0\uc778"}),"\n",(0,s.jsx)(r.h3,{id:"\ubb38\uc81c\uac00-\ub41c-\ubd80\ubd84",children:"\ubb38\uc81c\uac00 \ub41c \ubd80\ubd84"}),"\n",(0,s.jsxs)(r.p,{children:["\uc6d0\uc778\uc740 \uc0dd\uac01\ubcf4\ub2e4 \uae08\ubc29 \ucc3e\uc744 \uc218 \uc788\uc5c8\ub2e4. \uc720\uba85\ud55c \uc774\uc288\uc600\ub2e4..! ",(0,s.jsx)(r.a,{href:"https://docs.oracle.com/javase/8/docs/api/java/lang/Process.html",children:"JavaDoc"}),"\uc5d0\ub3c4 \uc774\ub7f0 \ub0b4\uc6a9\uc774 \uc788\ub2e4."]}),"\n",(0,s.jsxs)(r.admonition,{type:"info",children:[(0,s.jsxs)(r.blockquote,{children:["\n",(0,s.jsx)(r.p,{children:"Because some native platforms only provide limited buffer size for standard input and output streams, failure to promptly write the input stream or read the output stream of the subprocess may cause the subprocess to block, or even deadlock."}),"\n"]}),(0,s.jsx)(r.p,{children:"\uc77c\ubd80 \ub124\uc774\ud2f0\ube0c \ud50c\ub7ab\ud3fc\uc740 \ud45c\uc900 \uc785\ub825 \ubc0f \ucd9c\ub825 \uc2a4\ud2b8\ub9bc\uc5d0 \ub300\ud574 \uc81c\ud55c\ub41c \ubc84\ud37c \ud06c\uae30\ub9cc\uc744 \uc81c\uacf5\ud558\uae30 \ub54c\ubb38\uc5d0, \uc785\ub825 \uc2a4\ud2b8\ub9bc\uc744 \uc989\uc2dc \uc791\uc131\ud558\uac70\ub098 \ud558\uc704 \ud504\ub85c\uc138\uc2a4\uc758 \ucd9c\ub825 \uc2a4\ud2b8\ub9bc\uc744 \uc77d\uc9c0 \uc54a\uc73c\uba74 \ud558\uc704 \ud504\ub85c\uc138\uc2a4\uac00 \ucc28\ub2e8\ub418\uac70\ub098 \uc2ec\uc9c0\uc5b4 \uad50\ucc29 \uc0c1\ud0dc\uc5d0 \ube60\uc9c8 \uc218 \uc788\ub2e4."})]}),"\n",(0,s.jsxs)(r.p,{children:["Process \ud074\ub798\uc2a4\ub97c \ud1b5\ud574 \uc11c\ube0c \ud504\ub85c\uc138\uc2a4\ub97c \uc0dd\uc131\ud558\uace0, ",(0,s.jsx)(r.code,{children:"exec()"})," \uc73c\ub85c \uc2e4\ud589\ud55c\ub2e4. \ud558\uc704\ud504\ub85c\uc138\uc2a4\ub294 Process \ud074\ub798\uc2a4\uc758 ",(0,s.jsx)(r.code,{children:"getInputStream()"}),"\uacfc ",(0,s.jsx)(r.code,{children:"getErrorStream()"})," \uba54\uc11c\ub4dc\ub97c \ud1b5\ud574 \ucd9c\ub825 \uba54\uc2dc\uc9c0\ub97c \ubd80\ubaa8 \ud504\ub85c\uc138\uc2a4\uc5d0 \ubcf4\ub0b8\ub2e4.  \uadf8\ub9ac\uace0 \ubb38\uc81c\uac00 \ub41c \ucf54\ub4dc\ub294 \uc544\ub798 \ubc29\uc2dd\uc73c\ub85c \ucd9c\ub825\uacfc \uc624\ub958\ub97c ",(0,s.jsx)(r.strong,{children:"\uc21c\ucc28\uc801"}),"\uc73c\ub85c \uc77d\uace0 \ucc98\ub9ac\ud55c\ub2e4."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-java",children:'new BufferedReader(new InputStreamReader(process.getInputStream(), "UTF-8"));\n// \ub85c\uadf8\uc5d0 \uc4f0\ub294 \uc791\uc5c5 ..\nnew BufferedReader(new InputStreamReader(process.getErrorStream(), "UTF-8"));\n// \ub85c\uadf8\uc5d0 \uc4f0\ub294 \uc791\uc5c5 ..\n'})}),"\n",(0,s.jsx)(r.p,{children:"\uadf8\ub7f0\ub370 \uc774\ub54c \ub9cc\uc57d \uc2e4\ud589\ub418\ub294 \ud504\ub85c\uc138\uc2a4\uac00 \ub9ce\uc740 \uc591\uc758 \ucd9c\ub825\uc744 \uc0dd\uc131\ud558\uace0, \uc774\ub97c \ube60\ub974\uac8c \uc77d\uc5b4\ub4e4\uc774\uc9c0 \uc54a\uc73c\uba74 \ubc84\ud37c\uac00 \uac00\ub4dd \ucc28\uc11c \ud504\ub85c\uc138\uc2a4\uac00 \ube14\ub85d\ub420 \uc218 \uc788\ub2e4."}),"\n",(0,s.jsx)(r.p,{children:"\ub370\ub4dc\ub77d\uc774 \ubc1c\uc0dd\ud558\ub294 \uc0c1\ud669\uc740 \ub2e4\uc74c\uacfc \uac19\ub2e4."}),"\n",(0,s.jsx)(r.h3,{id:"\ub370\ub4dc\ub77d\uc774-\ubc1c\uc0dd\ud558\ub294-\uc0c1\ud669",children:"\ub370\ub4dc\ub77d\uc774 \ubc1c\uc0dd\ud558\ub294 \uc0c1\ud669"}),"\n",(0,s.jsxs)(r.ol,{children:["\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.strong,{children:"\uc678\ubd80 \ud504\ub85c\uc138\uc2a4 \uc2e4\ud589"}),": \uc790\ubc14\uc5d0\uc11c ",(0,s.jsx)(r.code,{children:"Runtime.exec()"})," \ub610\ub294 ",(0,s.jsx)(r.code,{children:"ProcessBuilder.start()"}),"\ub97c \uc0ac\uc6a9\ud558\uc5ec \uc678\ubd80 \ud504\ub85c\uc138\uc2a4\ub97c \uc2e4\ud589, \uc790\ubc14 \uc560\ud50c\ub9ac\ucf00\uc774\uc158(\ubd80\ubaa8 \ud504\ub85c\uc138\uc2a4)\uacfc \uc678\ubd80 \ud504\ub85c\uc138\uc2a4(\uc790\uc2dd \ud504\ub85c\uc138\uc2a4) \uc0ac\uc774\uc5d0\ub294 \ud45c\uc900 \uc785\ub825, \ucd9c\ub825, \uc624\ub958 \uc2a4\ud2b8\ub9bc\uc744 \ud1b5\ud55c \ub370\uc774\ud130 \uad50\ud658\uc774 \uac00\ub2a5\ud574\uc9c4\ub2e4."]}),"\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.strong,{children:"\ub370\uc774\ud130 \uc4f0\uae30 \ubc0f \uc77d\uae30 \uc2dc\uc791"}),": \uc790\ubc14 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc740 \uc678\ubd80 \ud504\ub85c\uc138\uc2a4\uc758 \ud45c\uc900 \ucd9c\ub825\uacfc \ud45c\uc900 \uc624\ub958 \uc2a4\ud2b8\ub9bc\uc744 \uc77d\uae30 \uc2dc\uc791\ud55c\ub2e4. \ub3d9\uc2dc\uc5d0 \uc678\ubd80 \ud504\ub85c\uc138\uc2a4\ub294 \uc2e4\ud589 \uacb0\uacfc\ub97c \ud45c\uc900 \ucd9c\ub825 \ubc0f \ud45c\uc900 \uc624\ub958 \uc2a4\ud2b8\ub9bc\uc73c\ub85c \ucd9c\ub825\ud558\uae30 \uc2dc\uc791\ud560 \uc218 \uc788\ub2e4."]}),"\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.strong,{children:"\ubc84\ud37c \uac00\ub4dd \ucc38"}),": \uc678\ubd80 \ud504\ub85c\uc138\uc2a4\uac00 \ub9ce\uc740 \uc591\uc758 \ub370\uc774\ud130\ub97c \ube60\ub974\uac8c \ucd9c\ub825\ud558\uba74 \ud45c\uc900 \ucd9c\ub825 \ub610\ub294 \ud45c\uc900 \uc624\ub958 \uc2a4\ud2b8\ub9bc\uc758 \ubc84\ud37c\uac00 \uac00\ub4dd \ucc2c\ub2e4. \uc774 \uc0c1\ud0dc\uc5d0\uc11c \uc790\ubc14 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774 \ubc84\ud37c\uc5d0\uc11c \ub370\uc774\ud130\ub97c \ube68\ub9ac \uc77d\uc9c0 \uc54a\uc73c\uba74 \uc678\ubd80 \ud504\ub85c\uc138\uc2a4\ub294 \ubc84\ud37c\uc5d0 \ub370\uc774\ud130\ub97c \ub354\uc774\uc0c1 \uc4f8 \uc218 \uc5c6\uac8c \ub41c\ub2e4."]}),"\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.strong,{children:"\uc790\ubc14 \uc560\ud50c\ub9ac\ucf00\uc774\uc158 \ucc98\ub9ac \uc9c0\uc5f0"}),": \ub9cc\uc57d \uc790\ubc14 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774 \ud45c\uc900 \ucd9c\ub825\ub9cc \uc77d\uace0 \ud45c\uc900 \uc624\ub958\ub294 \ub098\uc911\uc5d0 \uc77d\uc73c\ub824\uace0 \ud55c\ub2e4\uba74, \ud45c\uc900 \uc624\ub958\uc758 \ubc84\ud37c\uac00 \uac00\ub4dd \ucc28 \uc788\uc73c\uba74\uc11c \ud45c\uc900 \ucd9c\ub825\uc758 \ucc98\ub9ac\uac00 \uc644\ub8cc\ub418\uc9c0 \uc54a\ub294 \uc0c1\ud669\uc774 \ubc1c\uc0dd\ud560 \uc218 \uc788\ub2e4. \uc774\ub294 \uc678\ubd80 \ud504\ub85c\uc138\uc2a4\uac00 \ub354 \uc774\uc0c1 \uc9c4\ud589\ub418\uc9c0 \ubabb\ud558\uac8c \ud558\uace0, \uc790\ubc14 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\ub3c4 \uc678\ubd80 \ud504\ub85c\uc138\uc2a4\uc758 \uc885\ub8cc\ub97c \uae30\ub2e4\ub9ac\ub294 \ub370\ub4dc\ub77d \uc0c1\ud0dc\uc5d0 \ube60\uc9c0\uac8c \ud55c\ub2e4."]}),"\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.strong,{children:"\ub370\ub4dc\ub77d"}),": \uacb0\uad6d \uc678\ubd80 \ud504\ub85c\uc138\uc2a4\ub294 \ud45c\uc900 \ucd9c\ub825 \ub610\ub294 \ud45c\uc900 \uc624\ub958 \uc2a4\ud2b8\ub9bc\uc73c\ub85c \ub370\uc774\ud130\ub97c \ub354 \ucd9c\ub825\ud560 \uc218 \uc5c6\uc5b4 \uc2e4\ud589\uc744 \uba48\ucd94\uace0, \uc790\ubc14 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc740 \uc678\ubd80 \ud504\ub85c\uc138\uc2a4\uc758 \uc644\uc804\ud55c \uc885\ub8cc\ub97c \uae30\ub2e4\ub9ac\uba74\uc11c \ub354 \uc774\uc0c1 \uc9c4\ud589\ud558\uc9c0 \ubabb\ud55c\ub2e4. \uacb0\uacfc\uc801\uc73c\ub85c, \ub450 \ud504\ub85c\uc138\uc2a4 \ubaa8\ub450 \uc11c\ub85c\uc758 \ub2e4\uc74c \ub2e8\uacc4\ub97c \uae30\ub2e4\ub9ac\ub294 \uc0c1\ud0dc\uc5d0 \ube60\uc9c0\uac8c \ub418\uc5b4 \ub370\ub4dc\ub77d\uc774 \ubc1c\uc0dd\ud55c\ub2e4."]}),"\n"]}),"\n",(0,s.jsx)(r.h2,{id:"\ud574\uacb0\ubc29\ubc95",children:"\ud574\uacb0\ubc29\ubc95"}),"\n",(0,s.jsx)(r.h3,{id:"\ub0b4\uc6a9\uc774-\ud544\uc694-\uc5c6\uc744-\uacbd\uc6b0---close",children:"\ub0b4\uc6a9\uc774 \ud544\uc694 \uc5c6\uc744 \uacbd\uc6b0 - close()"}),"\n",(0,s.jsxs)(r.p,{children:["\uc785\ub825\uc2a4\ud2b8\ub9bc, \ucd9c\ub825\uc2a4\ud2b8\ub9bc\uc744 \uc0ac\uc6a9\ud560 \uc77c\uc774 \uc5c6\ub2e4\uba74 ",(0,s.jsx)(r.code,{children:"waitFor()"})," \uc804\uc5d0 \uc2a4\ud2b8\ub9bc\uc744 \ub2e4 \ub2eb\uc544\uc900\ub2e4."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-java",children:"Process process = processBuilder.start(); // or\nProcess process = Runtime.getRuntime().exec(command);\n\nprocess.getErrorStream().close();  \nprocess.getInputStream().close();  \nprocess.getOutputStream().close();  \n\nprocess.waitFor();\n"})}),"\n",(0,s.jsx)(r.h3,{id:"apache-commons-exec-\uc0ac\uc6a9",children:"Apache Commons Exec \uc0ac\uc6a9"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-gradle",children:"// build.gradle\nimplementation 'org.apache.commons:commons-exec:1.3'\n"})}),"\n",(0,s.jsx)(r.p,{children:"\uc758\uc874\uc131\uc744 \ucd94\uac00\ud558\uace0, \uc0ac\uc6a9\ud558\uba74 \ud574\uacb0\ubc95\uc744 \uc9c1\uc811 \uad6c\ud604\ud560 \ud544\uc694 \uc5c6\uc774 \uc548\uc804\ud558\uac8c \uc0ac\uc6a9 \uac00\ub2a5\ud558\ub2e4\uace0 \ud55c\ub2e4. \ub098\ub294 \ub2e4\ub978 \ubc29\ubc95\uc744 \uc0ac\uc6a9\ud574 \ud574\uacb0\ud588\ub2e4."}),"\n",(0,s.jsx)(r.h3,{id:"\uc2a4\ub808\ub4dc-\ubcd1\ub82c\ucc98\ub9ac",children:"\uc2a4\ub808\ub4dc \ubcd1\ub82c\ucc98\ub9ac"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:"\uc678\ubd80 \ud504\ub85c\uc138\uc2a4\uc758 \ud45c\uc900 \ucd9c\ub825 \uc2a4\ud2b8\ub9bc\uc744 \uc77d\ub294 \uc2a4\ub808\ub4dc\ub97c \uc0dd\uc131\ud558\uace0 \uc2dc\uc791\ud55c\ub2e4."}),"\n",(0,s.jsx)(r.li,{children:"\uc678\ubd80 \ud504\ub85c\uc138\uc2a4\uc758 \ud45c\uc900 \uc5d0\ub7ec \uc2a4\ud2b8\ub9bc\uc744 \uc77d\uae30 \uc704\ud55c \ub610 \ub2e4\ub978 \ubcc4\ub3c4\uc758 \uc2a4\ub808\ub4dc\ub97c \uc0dd\uc131\ud558\uace0 \uc2dc\uc791\ud55c\ub2e4."}),"\n",(0,s.jsx)(r.li,{children:"\ub450 \uc2a4\ub808\ub4dc\ub97c \ubcd1\ub82c \ucc98\ub9ac \ud55c\ub2e4."}),"\n"]}),"\n",(0,s.jsx)(r.p,{children:"\uc774\ub807\uac8c \ucc98\ub9ac\ud558\uba74 \ud55c \uc2a4\ud2b8\ub9bc\uc758 \ubc84\ud37c\uac00 \uac00\ub4dd \ucc28 \ube14\ub85d\ub418\ub354\ub77c\ub3c4 \ub2e4\ub978 \uc2a4\ud2b8\ub9bc\uc758 \ub370\uc774\ud130\ub97c \uacc4\uc18d \uc77d\uc744 \uc218 \uc788\uc5b4 \ub370\ub4dc\ub77d\uc744 \ubc29\uc9c0\ud560 \uc218 \uc788\ub2e4."}),"\n",(0,s.jsx)(r.h3,{id:"-redirect-error-stream",children:"\u2705 Redirect Error Stream"}),"\n",(0,s.jsx)(r.p,{children:"\ub098\ub294 \uc774 \ubc29\ubc95\uc744 \uc774\uc6a9\ud574 \ucc98\ub9ac\ud588\ub2e4."}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"ProcessBuilder"}),"\uc758 ",(0,s.jsx)(r.code,{children:"redirectErrorStream(true)"})," \ub97c \uc0ac\uc6a9\ud574 \ud45c\uc900 \uc5d0\ub7ec \uc2a4\ud2b8\ub9bc\uc744 \ud45c\uc900 \ucd9c\ub825 \uc2a4\ud2b8\ub9bc\uc73c\ub85c \ub9ac\ub2e4\uc774\ub809\uc158 \ud574 \ub2e8\uc77c \uc2a4\ud2b8\ub9bc\uc73c\ub85c \ubaa8\ub4e0 \ucd9c\ub825\uc744 \uc77d\uc744 \uc218 \uc788\ub3c4\ub85d \ud55c\ub2e4."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-java",children:"ProcessBuilder pb = new ProcessBuilder(command);  \npb.redirectErrorStream(true); // \ud45c\uc900 \uc5d0\ub7ec \uc2a4\ud2b8\ub9bc\uc744 \ud45c\uc900 \ucd9c\ub825 \uc2a4\ud2b8\ub9bc\uc73c\ub85c \ub9ac\ub2e4\uc774\ub809\uc158\n"})}),"\n",(0,s.jsx)(r.p,{children:"\ub450 \uc2a4\ud2b8\ub9bc\uc744 \ud558\ub098\uc758 \uc2a4\ud2b8\ub9bc\uc73c\ub85c \ucc98\ub9ac\ud558\uba74, \ud45c\uc900 \ucd9c\ub825\uc744 \uacc4\uc18d \uc77d\uc5b4\ub0bc\ub54c \ud45c\uc900 \uc5d0\ub7ec \uc2a4\ud2b8\ub9bc\uc5d0\uc11c \ubc1c\uc0dd\ud558\ub294 \ub370\uc774\ud130\ub3c4 \ucc98\ub9ac\ub418\uae30 \ub54c\ubb38\uc5d0 \ubc84\ud37c\ub97c \uc9c0\uc18d\uc801\uc73c\ub85c \ube44\uc6cc\uc904 \uc218 \uc788\ub2e4."}),"\n",(0,s.jsxs)(r.p,{children:["Runtime\uc73c\ub85c \uc791\uc131\ub418\uc5b4 \uc788\ub358 \ucf54\ub4dc\ub97c ProcessBuilder\ub97c \uc0ac\uc6a9\ud558\ub3c4\ub85d \ud574\uc8fc\uace0, ",(0,s.jsx)(r.code,{children:"redirectErrorStream(true)"})," \ub85c \uc124\uc815\ud558\ub2c8 \ubb38\uc81c\uac00 \ud574\uacb0\ub418\uc5c8\ub2e4."]}),"\n",(0,s.jsx)(r.h2,{id:"\ucc38\uace0\uc790\ub8cc",children:"\ucc38\uace0\uc790\ub8cc"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.a,{href:"https://d2.naver.com/helloworld/1113548",children:"https://d2.naver.com/helloworld/1113548"})}),"\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.a,{href:"https://stackoverflow.com/questions/5483830/process-waitfor-never-returns",children:"https://stackoverflow.com/questions/5483830/process-waitfor-never-returns"})}),"\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.a,{href:"https://docs.oracle.com/javase/8/docs/api/java/lang/Process.html",children:"https://docs.oracle.com/javase/8/docs/api/java/lang/Process.html"})}),"\n"]})]})}function h(e={}){const{wrapper:r}={...(0,o.M)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},4552:(e,r,n)=>{n.d(r,{I:()=>i,M:()=>t});var s=n(1504);const o={},c=s.createContext(o);function t(e){const r=s.useContext(c);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:t(e.components),s.createElement(c.Provider,{value:r},e.children)}}}]);