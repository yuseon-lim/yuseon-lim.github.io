import React, { useEffect, useRef } from "react";
import { useColorMode } from "@docusaurus/theme-common";

function Comment() {
  const containerRef = useRef(null);
  const gisCusRef = useRef(null);

  const { colorMode } = useColorMode();
  const giscusTheme =
    colorMode === "dark" ? "dark_high_contrast" : "light_high_contrast";

  useEffect(() => {
    const createGiscusEl = () => {
      const script = document.createElement("script");
      script.src = "https://giscus.app/client.js";
      script.setAttribute("data-repo", "devyuseon/devyuseon.github.io");
      script.setAttribute("data-repo-id", "R_kgDOGfRXdQ");
      script.setAttribute("data-category", "Comments");
      script.setAttribute("data-category-id", "DIC_kwDOGfRXdc4CePRR");
      script.setAttribute("data-mapping", "pathname");
      script.setAttribute("data-strict", "0");
      script.setAttribute("data-reactions-enabled", "1");
      script.setAttribute("data-emit-metadata", "0");
      script.setAttribute("data-input-position", "bottom");
      script.setAttribute("data-theme", giscusTheme);
      script.setAttribute("data-lang", "ko");
      script.crossOrigin = "anonymous";
      script.async = true;
      script.onload = () => {
        gisCusRef.current = document.querySelector(".giscus-frame");
      };

      containerRef.current.appendChild(script);
    };
    createGiscusEl();
  }, []);

  useEffect(() => {
    if (!gisCusRef.current) return;
    const message = {
      setConfig: {
        theme: giscusTheme,
      },
    };

    gisCusRef.current.contentWindow.postMessage(
      { giscus: message },
      "https://giscus.app"
    );
  }, [giscusTheme]);

  return <div ref={containerRef} />;
}
export default Comment;
