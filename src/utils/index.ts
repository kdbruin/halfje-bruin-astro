import type { CollectionEntry } from 'astro:content'

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

/**
 * Convert string to title case
 */
export const toTitleCase = (str: string) =>
    str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })

/**
 * Get the short month name of the given date
 */
export const getMonthName = (date: Date) => MONTHS[new Date(date).getMonth()]

/**
 * Return the list of posts sorted by ascending post date
 */
export const sortPostsAscending = (posts: CollectionEntry<'blog'>[]) =>
    posts.sort((a, b) => a.data.date - b.data.date)

/**
 * Return the list og posts sorted by descending date
 */
export const sortPostsDescending = (posts: CollectionEntry<'blog'>[]) =>
    posts.sort((a, b) => b.data.date - a.data.date)

/**
 * Return all tags for the given list os posts
 */
export const getTags = (posts: CollectionEntry<'blog'>[]) => {
    const tags = new Set<string>()
    for (const post of posts) {
        if (post.data.tags) {
            for (const tag of post.data.tags) {
                tags.add(tag)
            }
        }
    }
    return Array.from(tags.values())
}

/**
 * Return true when the post includes the given tag
 */
export const matchTag = (post: CollectionEntry<'blog'>, tag: string) =>
    post.data.tags && post.data.tags.includes(tag)

/**
 * Return all categories for the given list of posts
 */
export const getCategories = (posts: CollectionEntry<'blog'>[]) => {
    const categories = new Set<string>()
    for (const post of posts) {
        for (const category of post.data.categories) {
            categories.add(category)
        }
    }
    return Array.from(categories.values())
}

/**
 * Return true when the post includes the given category
 */
export const matchCategory = (post: CollectionEntry<'blog'>, category: string) =>
    post.data.categories && post.data.categories.includes(category)

/**
 * Find the image for the given image path. If not found or multiple images match the
 * image path return undefined
 */
export const findImage = (
    imagePath: string,
    images: { [key: string]: Function }
) => {
    const filteredImages = Object
        .keys(images)
        .filter((key) => key.endsWith(imagePath))
    return filteredImages.length === 1 ? images[filteredImages[0]] : undefined
}
