import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CATEGORIES } from '@/lib/constants';
import * as Icons from 'lucide-react';
import { Post } from '@/lib/posts';
import { Badge } from '@/components/ui/badge';
import { TagLink } from '@/components/tag-link';

interface BlogCardProps {
  post: Post;
  lang: string;
}

function BlogCardComponent({ post, lang }: BlogCardProps) {
  const formattedDate = format(
    new Date(post.date),
    'PPP',
    { locale: lang === 'ja' ? ja : undefined }
  );

  const category = CATEGORIES.find((c) => c.id === post.category);
  const Icon = category ? Icons[category.icon as keyof typeof Icons] : Icons.File;

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:shadow-primary/20 border-primary/10 group">
      <Link href={`/${lang}/blog/${post.slug}`} className="block flex-shrink-0">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title[lang as keyof typeof post.title] || "デフォルトのテキスト"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
      </Link>
      <CardHeader className="flex-none">
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="secondary" className="w-fit">
            {category?.label[lang as keyof typeof category.label]}
          </Badge>
        </div>
        <Link href={`/${lang}/blog/${post.slug}`} className="block group">
          <h2 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {post.title[lang as keyof typeof post.title]}
          </h2>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">
          {post.excerpt[lang as keyof typeof post.excerpt]}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag) => (
            <TagLink key={tag} tag={tag} lang={lang} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-none flex items-center justify-between mt-auto pt-4">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.avatar} alt={post.author.name} loading="lazy" />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{post.author.name}</span>
        </div>
        <time className="text-sm text-muted-foreground">{formattedDate}</time>
      </CardFooter>
    </Card>
  );
}

export const BlogCard = memo(BlogCardComponent);