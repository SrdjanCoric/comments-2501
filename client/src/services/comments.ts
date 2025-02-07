import axios from "axios";
import {
  CommentWithReplies,
  commentWithRepliesSchema,
  NewComment,
  Reply,
  replySchema,
} from "../types";
import { z } from "zod";

const getCommentWithRepliesSchema = z.array(commentWithRepliesSchema);
const getRepliesSchema = z.array(replySchema);

export const getComments = async (
  abortController: AbortController
): Promise<CommentWithReplies[]> => {
  const { data } = await axios.get(
    "http://localhost:3001/api/comments",
    abortController
  );
  return getCommentWithRepliesSchema.parse(data);
};

export const getReplies = async (commentId: string) => {
  const { data } = await axios.get<Reply[]>(
    `/api/comment_replies?comment_id=${commentId}`
  );
  return getRepliesSchema.parse(data);
};

export const createComment = async (newComment: NewComment) => {
  const { data } = await axios.post<CommentWithReplies>("/api/comments", {
    ...newComment,
  });
  return commentWithRepliesSchema.parse(data);
};
