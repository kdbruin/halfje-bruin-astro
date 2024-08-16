import { z, defineCollection, reference } from 'astro:content'

const blogCollection = defineCollection({
    type: 'content',
    schema: ({ image }) =>
        z.object({
            title: z
                .string()
                .max(
                    100,
                    'The post title length must be less than or equal to 100 chars'
                ),
            description: z.string(),
            image: z
                .object({
                    src: image().refine((img) => img.width >= 1024, {
                        message:
                            'Post image must be at least 1024 pixels wide!',
                    }),
                    title: z.string(),
                })
                .optional(),
            date: z.date(),
            category: z.string(),
            series: reference('series').optional(),
            tags: z.array(z.string()).optional(),
        }),
})

const seriesCollection = defineCollection({
    type: 'content',
    schema: ({ image }) =>
        z.object({
            title: z
                .string()
                .max(
                    100,
                    'The series title length must be less than or equal to 100 chars'
                ),
            description: z.string(),
            image: z
                .object({
                    src: image().refine((img) => img.width >= 1024, {
                        message:
                            'Series image must be at least 1024 pixels wide!',
                    }),
                    title: z.string(),
                })
                .optional(),
        }),
})

export const collections = {
    blog: blogCollection,
    series: seriesCollection,
}
