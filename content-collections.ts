import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from '@content-collections/core'
import { z } from 'zod'
import type { ComponentType } from 'react'

const projects = defineCollection({
  name: 'projects',
  directory: 'content/projects',
  include: '**/page.mdx',
  parser: 'frontmatter-only',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    thumbnailAlt: z.string(),
    thumbnailFit: z.string().optional(),
    githubLink: z.string().optional(),
    hidden: z.boolean().optional(),
  }),
  transform: ({ _meta, ...data }) => {
    const slug = _meta.filePath.split('/')[0]
    const mdxContent = createDefaultImport<ComponentType>(
      `content/projects/${_meta.filePath}`
    )
    return {
      ...data,
      slug,
      route: `/projects/${slug}`,
      mdxContent,
    }
  },
})

const experiences = defineCollection({
  name: 'experiences',
  directory: 'content/experiences',
  include: '**/page.mdx',
  parser: 'frontmatter-only',
  schema: z.object({
    title: z.string(),
    company: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
  }),
  transform: ({ _meta, ...data }) => {
    const slug = _meta.filePath.split('/')[0]
    const mdxContent = createDefaultImport<ComponentType>(
      `content/experiences/${_meta.filePath}`
    )
    return {
      ...data,
      slug,
      route: `/experience/${slug}`,
      mdxContent,
    }
  },
})

export default defineConfig({
  content: [projects, experiences],
})
