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
 * Return all tags for the given list of posts as a map from tag name to tag count
 */
export const getTags = (posts: CollectionEntry<'blog'>[]) => {
    const tags = new Map<string, number>()
    for (const post of posts) {
        if (post.data.tags) {
            for (const tag of post.data.tags) {
                const count = tags.get(tag) ?? 0;
                tags.set(tag, count + 1)
            }
        }
    }
    return tags
}

/**
 * Return a map from first letter of a tag to the tag count map of all
 * tags starting with that first letter. Any tags not starting with a
 * letter will be stored under '#'.
 */
export const splitTagsByLetter = (tags: Map<string, number>) => {
    const tagsByLetter = new Map<string, Map<string, number>>()
    for (const tag of tags.keys()) {
        const count = tags.get(tag) ?? 0
        const firstLetter = /[A-Za-z]/.test(tag) ? tag[0].toLowerCase() : '#'

        if (!tagsByLetter.has(firstLetter)) {
            tagsByLetter.set(firstLetter, new Map<string,number>())
        }
        
        tagsByLetter.get(firstLetter)?.set(tag, count)
    }

    return tagsByLetter
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
 * Split the list of categories into a map from first letter of the category to
 * all categories with that first letter. If not starting with a letter, use '#'
 * as key.
 */
export const splitCategoriesByLetter = (categories: string[]) => {
    const categoriesByLetter = new Map<string, string[]>()
    categories.map((category) => {
        const firstLetter = /[A-Za-z]/.test(category) ? category[0].toLowerCase() : '#'

        if (!categoriesByLetter.has(firstLetter)) {categoriesByLetter.set(firstLetter, [])}
        categoriesByLetter.get(firstLetter)?.push(category)
    })

    return categoriesByLetter
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
    const filteredImageKeys = Object
        .keys(images)
        .filter((key) => key.endsWith(imagePath))
    return filteredImageKeys.length === 1 ? images[filteredImageKeys[0]] : undefined
}

/**
 * Find all images for the given prefix
 */
export const findImages = (
    galleryPrefix: string,
    images: { [key: string]: Function }
) => {
    const filteredImageKeys = Object
        .keys(images)
        .filter((key) => key.includes(galleryPrefix))
    
    return filteredImageKeys.map((key) => images[key])
}
