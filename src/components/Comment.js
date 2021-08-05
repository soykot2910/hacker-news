import React, { useEffect, useState } from "react";
import axios from "axios";

const Comment = ({ id }) => {
  const [data, setData] = useState([]);

  const loadComments = async () => {
    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    setData(data);
  };

  useEffect(() => {
    loadComments();
  }, []);

  const { text, by, time } = data;

  var postTime = new Date(time * 1000);
  var formatedTime = postTime.toLocaleDateString("en-US");

  return (
    <div>
      <p className="info">
        {by} on {formatedTime}
      </p>
      <p style={{ color: "black" }}>{text}</p>
    </div>
  );
};

export default Comment;
