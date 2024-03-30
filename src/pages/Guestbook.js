import React from "react";
import Layout from "@theme/Layout";
import Comment from "../components/Comment"; // 댓글 컴포넌트 경로에 따라 조정

function Guestbook() {
  return (
    <Layout title="방명록">
      <div className="container">
        <h1>방명록</h1>
        <p>방문해주셔서 감사합니다. 여기에 방명록을 남겨주세요!</p>
        <Comment />
      </div>
    </Layout>
  );
}

export default Guestbook;
