import React, { useState, useEffect } from "react";
import axios from "axios"; // Replace with your configured Axios instance

const HMSCommunity = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ postTitle: "", postContent: "" });
  const [newComment, setNewComment] = useState({
    postId: "",
    commentContent: "",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/community-portal/posts",
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleCreatePost = async () => {
    try {
      await axios.post(
        "http://localhost:8090/community-portal/posts/create",
        newPost,
      );
      setNewPost({ postTitle: "", postContent: "" });
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleCreateComment = async (postId) => {
    try {
      await axios.post(
        "http://localhost:8090/community-portal/comments/create",
        { ...newComment, postId },
      );
      setNewComment({ postId: "", commentContent: "" });
      fetchPosts();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleVote = async (postId, voteType) => {
    try {
      await axios.post("http://localhost:8090/community-portal/posts/vote", {
        postId,
        voteType,
      });
      fetchPosts();
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">HMS Community</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Post Title"
          className="border p-2 rounded mr-2"
          value={newPost.postTitle}
          onChange={(e) =>
            setNewPost({ ...newPost, postTitle: e.target.value })
          }
        />
        <textarea
          placeholder="Post Content"
          className="border p-2 rounded mr-2"
          value={newPost.postContent}
          onChange={(e) =>
            setNewPost({ ...newPost, postContent: e.target.value })
          }
        />
        <button
          onClick={handleCreatePost}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Post
        </button>
      </div>

      {posts.map((post) => (
        <div key={post.postId} className="mb-4 border p-4 rounded shadow">
          <h2 className="text-lg font-bold">{post.postTitle}</h2>
          <p>{post.postContent}</p>
          <div className="flex items-center my-2">
            <button
              onClick={() => handleVote(post.postId, "Upvote")}
              className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
            >
              👍
            </button>
            <button
              onClick={() => handleVote(post.postId, "Downvote")}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
            >
              👎
            </button>
          </div>
          <div>
            {post.comments?.map((comment) => (
              <div key={comment.commentId} className="border-t pt-2 mt-2">
                {comment.commentContent}
              </div>
            ))}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Add a comment..."
                className="border p-2 rounded mr-2"
                value={newComment.commentContent}
                onChange={(e) =>
                  setNewComment({
                    ...newComment,
                    commentContent: e.target.value,
                  })
                }
              />
              <button
                onClick={() => handleCreateComment(post.postId)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HMSCommunity;
