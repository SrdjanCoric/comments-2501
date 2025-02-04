import { CommentWithReplies } from "../types";
import Comment from "./Comment";

interface CommentThreadProps {
  comment: CommentWithReplies;
}

const CommentThread = ({ comment }: CommentThreadProps) => {
  return (
    <div className="parent-comment">
      <Comment {...comment} />
      <div className="replies">
        {comment.replies.map((reply) => (
          <Comment key={reply.id} {...reply} />
        ))}
        <a href="#" className="show_more">
          Show More Replies ({comment.replies_count - 1})
        </a>
      </div>
    </div>
  );
};

export default CommentThread;
