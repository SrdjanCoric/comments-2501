import CommentThread from "./CommentThread";

const Comments = () => {
  return (
    <div className="comments">
      <h2>Comments (2)</h2>
      {[1, 2, 3].map((_) => (
        <CommentThread />
      ))}
    </div>
  );
};

export default Comments;
