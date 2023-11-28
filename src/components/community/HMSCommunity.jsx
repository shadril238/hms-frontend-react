import { useState, useEffect } from "react";
import axiosInstanceCommunityPortalService from "../../utils/axiosInstanceCommunityPortalService";
import { toast } from "react-toastify";
import axiosInstancePatientService from "../../utils/axiosInstancePatientService";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/PatientSidebar";

const HMSCommunity = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    postTitle: "",
    postContent: "",
    error: "",
  });
  const [newComment, setNewComment] = useState({
    postId: "",
    commentContent: "",
    error: "",
  });
  const [creatorName, setCreatorName] = useState("");
  const [postVotes, setPostVotes] = useState({});

  useEffect(() => {
    fetchPosts();
    fetchCreatorName();
  }, []);

  const fetchCreatorName = async () => {
    try {
      const response = await axiosInstancePatientService.get("/profile");
      setCreatorName(`${response.data.firstName} ${response.data.lastName}`);
    } catch (error) {
      console.error("Error fetching creator's name:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axiosInstanceCommunityPortalService.get("/posts");
      const postsWithVotesPromises = response.data.map(async (post) => {
        try {
          const voteCountResponse =
            await axiosInstanceCommunityPortalService.get(
              `/posts/${post.postId}/votes/count`,
            );
          const commentsResponse =
            await axiosInstanceCommunityPortalService.get(
              `/posts/${post.postId}/comments`,
            );
          return {
            ...post,
            comments: commentsResponse.data,
            upVoteCount: voteCountResponse.data.upVoteCount,
            downVoteCount: voteCountResponse.data.downVoteCount,
          };
        } catch (error) {
          console.error(`Error fetching data for post ${post.postId}:`, error);
          return { ...post, comments: [], upVoteCount: 0, downVoteCount: 0 };
        }
      });
      const postsWithVotes = await Promise.all(postsWithVotesPromises);
      setPosts(postsWithVotes);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.postTitle || !newPost.postContent) {
      setNewPost({ ...newPost, error: "Both title and content are required." });
      return;
    }
    try {
      await axiosInstanceCommunityPortalService.post("/posts/create", {
        postTitle: newPost.postTitle,
        postContent: newPost.postContent,
      });
      setNewPost({ postTitle: "", postContent: "", error: "" });
      fetchPosts();
      toast.success("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(error.response.data.message || "Failed to create post.");
    }
  };

  const handleCreateComment = async (postId) => {
    const commentContent = newComment[postId] || "";
    if (!commentContent) {
      setNewComment({ ...newComment, [postId]: "Comment cannot be empty." });
      return;
    }
    try {
      await axiosInstanceCommunityPortalService.post("/comments/create", {
        postId,
        commentContent,
      });
      setNewComment({ ...newComment, [postId]: "" });
      fetchPosts();
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error(error.response.data.message || "Failed to post comment.");
    }
  };

  const handleCommentChange = (postId, content) => {
    setNewComment({ ...newComment, [postId]: content });
  };

  const handleVote = async (postId, voteType) => {
    try {
      await axiosInstanceCommunityPortalService.post("/posts/vote", {
        postId,
        voteType,
      });
      fetchPosts();
    } catch (error) {
      console.error("Error voting:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-4">
        <Navbar />
        <div className="container mx-auto p-4 bg-gray-100">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            HMS Community
          </h1>

          <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Post Title"
              className={`border p-2 rounded w-full mb-2 ${
                newPost.error ? "border-red-500" : ""
              }`}
              value={newPost.postTitle}
              onChange={(e) =>
                setNewPost({ ...newPost, postTitle: e.target.value, error: "" })
              }
            />
            {newPost.error && (
              <p className="text-red-500 text-sm">{newPost.error}</p>
            )}
            <textarea
              placeholder="Share your thoughts..."
              className={`border p-2 rounded w-full mb-2 ${
                newPost.error ? "border-red-500" : ""
              }`}
              rows="4"
              value={newPost.postContent}
              onChange={(e) =>
                setNewPost({
                  ...newPost,
                  postContent: e.target.value,
                  error: "",
                })
              }
            />
            <button
              onClick={handleCreatePost}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
            >
              Share
            </button>
          </div>

          {posts.map((post) => (
            <div
              key={post.postId}
              className="mb-6 bg-white p-4 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-bold mb-2">{post.postTitle}</h2>
              <p className="mb-2">{post.postContent}</p>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-sm text-gray-600">
                    Created by: {creatorName}
                  </div>
                  <div className="text-sm text-gray-500">
                    Posted on: {post.createdAt}
                  </div>
                </div>
                {/* <div>
              <span className="mr-2 text-green-600">👍 {post.upVoteCount}</span>
              <span className="text-red-600">👎 {post.downVoteCount}</span>
            </div> */}
                <div>
                  <button
                    onClick={() => handleVote(post.postId, "Upvote")}
                    className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                  >
                    👍 {post.upVoteCount}
                  </button>
                  <button
                    onClick={() => handleVote(post.postId, "Downvote")}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    👎 {post.downVoteCount}
                  </button>
                </div>
              </div>

              <div className="border-t pt-4">
                {post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <div key={comment.commentId} className="mb-2">
                      <div className="text-sm bg-gray-200 rounded p-2 min-w-0">
                        {comment.commentContent}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No comments yet</p>
                )}

                <div className="flex mt-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className={`border p-2 rounded w-full mr-2 ${
                      newComment.error ? "border-red-500" : ""
                    }`}
                    value={newComment[post.postId] || ""}
                    onChange={(e) =>
                      handleCommentChange(post.postId, e.target.value)
                    }
                  />
                  {newComment.error && (
                    <p className="text-red-500 text-sm">{newComment.error}</p>
                  )}
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
      </div>
    </div>
  );
};

export default HMSCommunity;
