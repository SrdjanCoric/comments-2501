import { z } from "zod";

export const commentSchema = z.object({
  id: z.string(),
  author: z.string(),
  body: z.string(),
  postedAt: z.number(),
});

export const newCommentSchema = commentSchema.omit({
  id: true,
  postedAt: true,
});

export const replySchema = commentSchema.extend({
  comment_id: z.string(),
});

export const commentWithRepliesSchema = commentSchema.extend({
  replies_count: z.number(),
  replies: z.array(replySchema),
});

export type Comment = z.infer<typeof commentSchema>;
export type NewComment = z.infer<typeof newCommentSchema>;
export type Reply = z.infer<typeof replySchema>;
export type CommentWithReplies = z.infer<typeof commentWithRepliesSchema>;

// export interface Comment {
//   id: string;
//   author: string;
//   body: string;
//   postedAt: number;
// }

// export type NewComment = Omit<Comment, "id" | "postedAt">;

// export interface Reply extends Comment {
//   comment_id: string;
// }

// export interface CommentWithReplies extends Comment {
//   replies_count: number;
//   replies: Reply[];
// }
