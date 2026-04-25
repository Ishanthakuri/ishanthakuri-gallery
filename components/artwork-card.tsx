"use client"

import Image from "next/image"
import Link from "next/link"

interface ArtworkCardProps {
  id: string
  title: string
  imageUrl: string
  status: "available" | "sold"
}

export function ArtworkCard({ id, title, imageUrl, status }: ArtworkCardProps) {
  return (
    <Link href={`/artwork/${id}`} className="group block">
      <article className="space-y-3">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
        </div>
        
        <div className="flex flex-col gap-1">
          <h3 className="font-serif text-lg sm:text-xl font-medium text-foreground tracking-wide text-balance">
            {title}
          </h3>
          <span 
            className={`text-sm tracking-wider uppercase ${
              status === "available" 
                ? "text-accent" 
                : "text-muted-foreground"
            }`}
          >
            {status === "available" ? "Available" : "Sold"}
          </span>
        </div>
      </article>
    </Link>
  )
}
