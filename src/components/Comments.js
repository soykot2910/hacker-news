import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment";

const Comments = () => {
  let storyId = window.location.href.split("/")[4];
  const [commentsId, setCommentsId] = useState([]);
  const [data, setData] = useState([]);

  const loadCommentsId = async () => {
    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
    );
    setData(data);
    setCommentsId(data.kids);
  };

  useEffect(() => {
    loadCommentsId();
  }, []);

  const { title, url, score, by, time } = data;

  var postTime = new Date(time * 1000);
  var formatedTime = postTime.toLocaleDateString("en-US");

  return (
    <div className="all-comments">
      <h4 className="title">
        <a href={`${url}`}>{title}</a>
      </h4>
      <p className="info" style={{ marginBottom: "20px" }}>
        {score} points by {by} on {formatedTime}
      </p>
      <h4>All Comments</h4>
      {commentsId.map((id) => (
        <Comment key={id} id={id} />
      ))}
    </div>
  );
};

export default Comments;
