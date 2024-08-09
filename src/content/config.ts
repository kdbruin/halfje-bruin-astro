// Import utilities from `astro:content`
import { z, defineCollection, reference } from "astro:content";

// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    series: reference('series').optional(),
    tags: z.array(z.string()),
  }),
});

const seriesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }).optional(),
  })
})

// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
  series: seriesCollection,
};
