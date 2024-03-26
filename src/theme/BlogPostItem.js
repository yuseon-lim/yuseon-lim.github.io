import React from "react";
import BlogPostItem from "@theme-original/BlogPostItem";
import Comment from "../components/Comment";
import { useBlogPost } from "@docusaurus/theme-common/internal";

export default function BlogPostItemWrapper(props) {
  const { isBlogPostPage } = useBlogPost();
  return (
    <>
      <BlogPostItem {...props} />
      {isBlogPostPage && <Comment />}
    </>
  );
}
