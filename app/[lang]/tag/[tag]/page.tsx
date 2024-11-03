import { BlogCard } from '@/components/blog-card';
import { posts } from '@/lib/posts';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const tags = new Set(posts.flatMap(post => post.tags));
  return Array.from(tags).map(tag => ({
    tag,
    lang: ['en', 'ja']
  })).flat();
}

export default function TagPage({
  params: { lang, tag },
}: {
  params: { lang: string; tag: string };
}) {
  const tagPosts = posts
    .filter(post => post.tags.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (tagPosts.length === 0) {
    notFound();
  }

  return (
    <div className="py-8 space-y-8">
      <div className="space-y-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">#{tag}</h1>
        <p className="text-muted-foreground">
          {lang === 'ja' ? 
            `${tagPosts.length}件の記事` : 
            `${tagPosts.length} article${tagPosts.length === 1 ? '' : 's'}`}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-8">
        {tagPosts.map((post) => (
          <BlogCard key={post.id} post={post} lang={lang} />
        ))}
      </div>
    </div>
  );
}