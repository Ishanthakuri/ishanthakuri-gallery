import { ArtworkCard } from "./artwork-card"

export interface Artwork {
  id: string
  title: string
  imageUrl: string
  status: "available" | "sold"
  description?: string
  medium?: string
  dimensions?: string
  year?: number
}

interface ArtworkGridProps {
  artworks: Artwork[]
}

export function ArtworkGrid({ artworks }: ArtworkGridProps) {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              id={artwork.id}
              title={artwork.title}
              imageUrl={artwork.imageUrl}
              status={artwork.status}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
