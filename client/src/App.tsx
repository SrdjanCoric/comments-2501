import React from "react";
import Comments from "./components/Comments";
import AddCommentForm from "./components/AddCommentForm";
import { CommentWithReplies, NewComment } from "./types";
import { createComment, getComments, getReplies } from "./services/comments";
import { ZodError } from "zod";

function App() {
  const [comments, setComments] = React.useState<CommentWithReplies[]>([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const abortController = new AbortController();
    const fetchComments = async () => {
      try {
        const data = await getComments(abortController);
        setComments(data);
      } catch (e) {
        if (e instanceof ZodError) {
          console.log(e.issues);
          setError(true);
        }
      }
    };
    fetchComments();
    return () => {
      abortController.abort();
    };
  }, []);

  const handleMoreReplies = async (commentId: string) => {
    const data = await getReplies(commentId);
    setComments((prevState) =>
      prevState.map((c) => {
        if (c.id === commentId) {
          return { ...c, replies: c.replies.concat(data) };
        }
        return c;
      })
    );
  };

  const handleSubmit = async (
    newComment: NewComment,
    callback?: () => void
  ) => {
    try {
      const data = await createComment(newComment);
      setComments((prevState) => prevState.concat(data));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (error) {
    return <h1>You shall not pass!</h1>;
  }

  return (
    <div>
      <Comments comments={comments} onMoreReplies={handleMoreReplies} />
      <AddCommentForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
