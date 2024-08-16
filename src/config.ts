import type { NavItems } from './types'

export const NAV_ITEMS: NavItems = {
    home: {
        path: '/',
        title: 'home',
    },
    blog: {
        path: '/blog',
        title: 'blog',
    },
    series: {
        path: '/series',
        title: 'series',
    },
    categories: {
        path: '/categories',
        title: 'categorieën',
    },
    tags: {
        path: '/tags',
        title: 'tags',
    },
    about: {
        path: '/over-mij',
        title: 'over mij',
    },
}

export const SITE = {
    // Your site's detail?
    name: 'Halfje-Bruin',
    title: 'Halfje-Bruin.nl',
    description: 'Persoonlijke website van Kees de Bruin',
    url: 'https://halfje-bruin.nl',
    githubUrl: 'https://github.com/kdbruin/halfje-bruin-astro',
    image: 'https://raw.githubusercontent.com/kdbruin/halfje-bruin-astro/main/public/astro-banner.png',
}

// Theme configuration
export const PAGE_SIZE = 8

export const KOMOOT_SITE_URL = 'https://www.komoot.com/nl-nl'
