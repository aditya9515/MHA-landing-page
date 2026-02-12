import { supabase } from "./supabase";
import { CommentType } from "@/types/comment";


// =====================
// Convert Flat → Nested
// =====================
export function buildCommentTree(comments: any[]): CommentType[] {
    const map = new Map<number, CommentType>();
    const roots: CommentType[] = [];

    comments.forEach(comment => {
        map.set(comment.id, { ...comment, replies: [] });
    });

    comments.forEach(comment => {
        if (comment.parent_id) {
        map.get(comment.parent_id)?.replies.push(map.get(comment.id)!);
        } else {
        roots.push(map.get(comment.id)!);
        }
    });

    return roots;
}


// =====================
// Fetch Comments
// =====================
export async function fetchComments() {
    const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("timestamp", { ascending: false });

    if (error) throw error;

    return buildCommentTree(data || []);
}


// =====================
// Add Comment / Reply
// =====================
export async function addComment(
    content: string,
    parentId?: number | null
    ) {
    const { error } = await supabase.from("comments").insert({
        author: "Aditya", // later replace with auth user
        content,
        parent_id: parentId || null
    });

    if (error) throw error;
}


// =====================
// Voting
// =====================
export async function upvoteComment(id: number) {
    const { data } = await supabase
        .from("comments")
        .select("upvotes")
        .eq("id", id)
        .single();

    if (!data) return;

    await supabase
        .from("comments")
        .update({ upvotes: data.upvotes + 1 })
        .eq("id", id);
}