import type { CollectionEntry } from 'astro:content'
import path from 'path'

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
]

export const toTitleCase = (str: string) =>
    str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })

export const getMonthName = (date: Date) => MONTHS[new Date(date).getMonth()]

export const getSlugFromPathname = (pathname: string) =>
    path.basename(pathname, path.extname(pathname))

export const sortPostsAscending = (posts: CollectionEntry<'blog'>[]) =>
    posts.sort((a, b) => a.data.date - b.data.date)

export const sortPostsDescending = (posts: CollectionEntry<'blog'>[]) =>
    posts.sort((a, b) => b.data.date - a.data.date)

export const getTags = (posts: CollectionEntry<'blog'>[]) => {
    const tags = new Set()
    for (const post of posts) {
        if (post.data.tags) {
            for (const tag of post.data.tags) {
                tags.add(tag)
            }
        }
    }
    return Array.from(tags.values())
}

export const getCategories = (posts: CollectionEntry<'blog'>[]) => {
    const categories = new Set<string>()
    for (const post of posts) {
        categories.add(post.data.category)
    }
    return Array.from(categories.values())
}
