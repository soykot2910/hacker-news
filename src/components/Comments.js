import React, { useEffect, useState } from "react";
import axios from "axios";

const Comments = () => {
  let storyId = window.location.href.split("/")[4];
  const [commentsId, setCommentsId] = useState([]);
  const [comments, setComments] = useState([]);
  let users = [];
  let promises = [];

  const loadComments = async () => {
    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
    );
    setCommentsId(data.kids);
  };

  for (var i = 0; i < commentsId.length; i++) {
    promises.push(
      axios
        .get(
          `https://hacker-news.firebaseio.com/v0/item/${commentsId[i]}.json?print=pretty`
        )
        .then((response) => {
          users.push(response.data.text);
        })
    );
  }

  Promise.all(promises).then((value) => console.log(value));

  useEffect(() => {
    loadComments();
  }, []);

  return <></>;
};

export default Comments;
