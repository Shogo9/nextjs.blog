"use client";

import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CATEGORIES } from '@/lib/constants';
import * as Icons from 'lucide-react';
import { Post } from '@/lib/posts';
import { Badge } from '@/components/ui/badge';

interface FeaturedPostProps {
  post: Post;
  lang: string;
}

export function FeaturedPost({ post, lang }: FeaturedPostProps) {
  const formattedDate = format(
    new Date(post.date),
    'PPP',
    { locale: lang === 'ja' ? ja : undefined }
  );

  const category = CATEGORIES.find((c) => c.id === post.category);
  const Icon = category ? Icons[category.icon as keyof typeof Icons] : Icons.File;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:shadow-primary/20 border-primary/10 group">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Link href={`/${lang}/blog/${post.slug}`} className="block">
          <div className="relative aspect-[16/10] lg:aspect-square overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title[lang as keyof typeof post.title] ?? "デフォルトのテキスト"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
        </Link>
        <CardContent className="p-6 flex flex-col justify-center">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="w-fit">
              {category?.label[lang as keyof typeof category.label]}
            </Badge>
            {post.tags.map((tag) => (
              <Link 
                key={tag} 
                href={`/${lang}/tag/${tag}`}
                className="hover:no-underline"
              >
                <Badge variant="outline" className="hover:bg-primary/10">
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
          <div className="space-y-4">
            <Link href={`/${lang}/blog/${post.slug}`} className="block group">
              <h2 className="text-3xl font-bold group-hover:text-primary transition-colors">
                {post.title[lang as keyof typeof post.title]}
              </h2>
            </Link>
            <p className="text-muted-foreground text-lg">
              {post.excerpt[lang as keyof typeof post.excerpt]}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{post.author.name}</span>
              </div>
              <time className="text-sm text-muted-foreground">{formattedDate}</time>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}