"use client";

import { useEffect, useState } from "react";
import { CommentThread } from "@/components/reddit-nested-thread-reply";
import { fetchComments, addComment } from "@/lib/comment-service";
import { CommentType } from "@/types/comment";

export default function CommentsPage() {

  const [comments, setComments] = useState<CommentType[]>([]);

  async function loadComments() {
    const data = await fetchComments();
    setComments(data);
  }

  useEffect(() => {
    loadComments();
  }, []);

  async function handleAddComment(content: string) {
    await addComment(content);
    loadComments();
  }

  async function handleReply(parentId: number | string, content: string) {
    await addComment(content, Number(parentId));
    loadComments();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Discussion Thread
      </h1>

      <CommentThread
        comments={comments}
        onAddComment={handleAddComment}
        onReply={handleReply}
      />
    </div>
  );
}