import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const postSchema = z.object({
  title: z.record(z.enum(['en', 'ja']), z.string()),
  excerpt: z.record(z.enum(['en', 'ja']), z.string()),
  date: z.string(),
  imageUrl: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  author: z.object({
    name: z.string(),
    avatar: z.string(),
  }),
});

export type Post = z.infer<typeof postSchema> & {
  id: number;
  slug: string;
  content: Record<'en' | 'ja', string>;
};

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/posts');

function getMDXFiles() {
  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((file) => file.endsWith('.mdx'));
}

function parseMDXFile(filePath: string, fileName: string): Post {
  const fullPath = path.join(POSTS_DIRECTORY, filePath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Validate frontmatter
  const validatedData = postSchema.parse(data);

  // Split content into English and Japanese sections
  const [enContent, jaContent] = content.split('---\n\n');

  return {
    ...validatedData,
    id: Date.now(), // Use timestamp as ID for simplicity
    slug: fileName.replace('.mdx', ''),
    content: {
      en: enContent.trim(),
      ja: jaContent.trim(),
    },
  };
}

export function getAllPosts(): Post[] {
  const mdxFiles = getMDXFiles();
  const posts = mdxFiles
    .map((fileName) => parseMDXFile(fileName, fileName))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export const posts = getAllPosts();