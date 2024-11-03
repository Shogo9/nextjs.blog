import dynamic from 'next/dynamic';
import { BlogCard } from '@/components/blog-card';
import { FeaturedPost } from '@/components/featured-post';
import { getDictionary } from '@/lib/dictionary';
import { posts } from '@/lib/posts';

const VideoSection = dynamic(() => import('@/components/video-section'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video animate-pulse bg-muted rounded-lg" />
  ),
});

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featuredPost = sortedPosts[0];
  const regularPosts = sortedPosts.slice(1);

  return (
    <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <section className="text-center py-12">
        <div className="space-gradient p-8 rounded-2xl">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            {dict.home.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
            {dict.home.description}
          </p>
        </div>
      </section>

      <VideoSection />

      {featuredPost && (
        <section className="w-full">
          <FeaturedPost post={featuredPost} lang={lang} />
        </section>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 auto-rows-fr">
        {regularPosts.map((post) => (
          <BlogCard key={post.id} post={post} lang={lang} />
        ))}
      </div>
    </div>
  );
}