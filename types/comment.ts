export interface CommentType {
    id: number;
    author: string;
    content: string;
    timestamp: string;
    upvotes: number;
    downvotes: number;
    parent_id?: number | null;
    replies: CommentType[];
}