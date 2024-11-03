import { BlogCard } from '@/components/blog-card';
import { posts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/constants';
import { Pagination } from '@/components/pagination';
import { notFound } from 'next/navigation';

const POSTS_PER_PAGE = 12;

export function generateStaticParams() {
  return CATEGORIES.flatMap(category => [
    { category: category.id, lang: 'en' },
    { category: category.id, lang: 'ja' }
  ]);
}

export default function CategoryPage({
  params: { lang, category },
}: {
  params: { lang: string; category: string };
}) {
  // Validate category exists
  const categoryExists = CATEGORIES.some(c => c.id === category);
  if (!categoryExists) {
    notFound();
  }

  const categoryPosts = posts
    .filter(post => post.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalPages = Math.ceil(categoryPosts.length / POSTS_PER_PAGE);

  return (
    <div className="py-8 space-y-8">
      <h1 className="text-3xl font-bold px-4 sm:px-6 lg:px-8">
        {CATEGORIES.find(c => c.id === category)?.label[lang as keyof typeof CATEGORIES[0]['label']]}
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-8">
        {categoryPosts.map((post) => (
          <BlogCard key={post.id} post={post} lang={lang} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={1}
            totalPages={totalPages}
            onPageChange={() => {}}
          />
        </div>
      )}
    </div>
  );
}