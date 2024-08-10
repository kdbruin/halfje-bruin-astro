import { z, defineCollection, reference } from 'astro:content'

const blogCollection = defineCollection({
    schema: z.object({
        title: z
            .string()
            .max(
                100,
                'The post title length must be less than or equal to 100 chars'
            ),
        description: z.string(),
        image: z.string().optional(),
        date: z.date(),
        category: z.string(),
        series: reference('series').optional(),
        tags: z.array(z.string()),
    }),
})

const seriesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z
            .string()
            .max(
                100,
                'The series title length must be less than or equal to 100 chars'
            ),
        description: z.string(),
        image: z
            .object({
                url: z.string(),
                alt: z.string(),
            })
            .optional(),
    }),
})

export const collections = {
    blog: blogCollection,
    series: seriesCollection,
}
