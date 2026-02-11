"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  Reply,
  Award,
  Share,
  MessageSquare
} from "lucide-react";

export interface CommentType {
  id: number | string;
  author: string;
  content: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  replies: CommentType[];
}

interface CommentProps {
  comment: CommentType;
  depth?: number;
  onReply: (parentId: number | string, content: string) => void;
  isOp?: boolean;
}

/* =============================
   Single Comment Renderer
============================= */
const Comment: React.FC<CommentProps> = ({
  comment,
  depth = 0,
  onReply,
  isOp = false
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const netScore =
    comment.upvotes -
    comment.downvotes +
    (userVote === "up" ? 1 : userVote === "down" ? -1 : 0);

  function handleVote(type: "up" | "down") {
    setUserVote(userVote === type ? null : type);
  }
  
  function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);

    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  }

  function handleReplySubmit() {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText);
    setReplyText("");
    setShowReplyBox(false);
  }

  const getInitials = (name: string) =>
    name.slice(0, 2).toUpperCase();

  return (
    <div
      className={`${
        depth > 0 ? "ml-4 md:ml-6 border-muted pl-4 md:pl-6" : ""
      } border-l-2`}
    >
      <Card className="mb-4 hover:bg-muted/30">
        <CardHeader className="pb-3">
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${comment.author}`}
              />
              <AvatarFallback>
                {getInitials(comment.author)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(comment.timestamp)}
                </span>
                {isOp && <Badge>OP</Badge>}
              </div>

              <p className="text-sm mb-3">{comment.content}</p>

              <div className="flex items-center gap-1 flex-wrap">

                {/* Voting */}
                <div className="flex items-center bg-muted rounded-full p-1">
                  <Button size="sm" variant="ghost"
                    onClick={() => handleVote("up")}
                  >
                    <ChevronUp size={14} />
                  </Button>

                  <span className="px-2 text-xs">{netScore}</span>

                  <Button size="sm" variant="ghost"
                    onClick={() => handleVote("down")}
                  >
                    <ChevronDown size={14} />
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowReplyBox(!showReplyBox)}
                >
                  <Reply size={14} /> Reply
                </Button>

                {/* <Button size="sm" variant="ghost">
                  <Award size={14} /> Award
                </Button>

                <Button size="sm" variant="ghost">
                  <Share size={14} /> Share
                </Button>

                <Button size="sm" variant="ghost">
                  <MoreHorizontal size={14} />
                </Button> */}

                {comment.replies?.length > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="ml-auto"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded
                      ? "Collapse"
                      : `Expand (${comment.replies.length})`}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        {showReplyBox && (
          <CardContent>
            <Textarea
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />

            <div className="flex gap-2 mt-2">
              <Button size="sm" onClick={handleReplySubmit}>
                Comment
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowReplyBox(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {isExpanded &&
        comment.replies?.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
            depth={depth + 1}
            onReply={onReply}
          />
        ))}
    </div>
  );
};

/* =============================
   Comment Thread
============================= */

export const CommentThread: React.FC<{
  comments: CommentType[];
  onAddComment: (content: string) => void;
  onReply: (parentId: number | string, content: string) => void;
}> = ({ comments, onAddComment, onReply }) => {

  const [newComment, setNewComment] = useState("");

  function handleNewComment() {
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment("");
  }

  return (
    <div className="space-y-6">

      {/* New Comment Box */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <Textarea
            placeholder="Start discussion..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <Button onClick={handleNewComment}>
            <MessageSquare size={16} className="mr-2" />
            Post Comment
          </Button>
        </CardContent>
      </Card>

      {/* Comment List */}
      {comments?.map((comment, index) => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={onReply}
          isOp={index === 0}
        />
      ))}

      {comments?.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No comments yet
        </p>
      )}
    </div>
  );
};