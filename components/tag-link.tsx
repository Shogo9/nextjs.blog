"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface TagLinkProps {
  tag: string;
  lang: string;
}

export function TagLink({ tag, lang }: TagLinkProps) {
  return (
    <Link 
      href={`/${lang}/tag/${tag}`}
      className="hover:no-underline"
      onClick={(e) => e.stopPropagation()}
    >
      <Badge variant="outline" className="hover:bg-primary/10">
        #{tag}
      </Badge>
    </Link>
  );
}