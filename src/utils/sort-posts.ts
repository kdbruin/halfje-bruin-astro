import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"posts">;

export function sortPostsAscending(posts: Post[]): Post[] {
    return posts.sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());
}

export function sortPostsDescending(posts: Post[]): Post[] {
    return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}