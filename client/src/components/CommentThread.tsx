import { CommentWithReplies } from "../types";
import Comment from "./Comment";

interface CommentThreadProps {
  comment: CommentWithReplies;
  onMoreReplies: (commentId: string) => void;
}

const CommentThread = ({ comment, onMoreReplies }: CommentThreadProps) => {
  const handleMoreReplies = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onMoreReplies(comment.id);
  };
  return (
    <div className="parent-comment">
      <Comment {...comment} />
      <div className="replies">
        {comment.replies.map((reply) => (
          <Comment key={reply.id} {...reply} />
        ))}
        {comment.replies_count === comment.replies.length ? null : (
          <a href="#" className="show_more" onClick={handleMoreReplies}>
            Show More Replies ({comment.replies_count - 1})
          </a>
        )}
      </div>
    </div>
  );
};

export default CommentThread;

// interface CommentThreadProps {
//   comment: CommentWithReplies;
//   setComments: React.Dispatch<React.SetStateAction<CommentWithReplies[]>>;
// }

// const CommentThread = ({ comment, setComments }: CommentThreadProps) => {
//   const handleMoreReplies = async (e: React.SyntheticEvent) => {
//     e.preventDefault();
//     const { data } = await axios.get(
//       `/api/comment_replies?comment_id=${comment.id}`
//     );
//     setComments((prevState) =>
//       prevState.map((c) => {
//         if (c.id === comment.id) {
//           return { ...c, replies: c.replies.concat(data) };
//         }
//         return c;
//       })
//     );
//   };
//   return (
//     <div className="parent-comment">
//       <Comment {...comment} />
//       <div className="replies">
//         {comment.replies.map((reply) => (
//           <Comment key={reply.id} {...reply} />
//         ))}
//         {comment.replies_count === comment.replies.length ? null : (
//           <a href="#" className="show_more" onClick={handleMoreReplies}>
//             Show More Replies ({comment.replies_count - 1})
//           </a>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommentThread;
