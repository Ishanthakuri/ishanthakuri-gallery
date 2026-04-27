import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { artworks } from "@/lib/artworks"
import { Button } from "@/components/ui/button"

interface ArtworkPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return artworks.map((artwork) => ({
    id: artwork.id,
  }))
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { id } = await params
  const artwork = artworks.find((a) => a.id === id)

  if (!artwork) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm uppercase tracking-wider">Back to Gallery</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="relative aspect-[3/4] bg-muted overflow-hidden">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground tracking-wide text-balance">
                  {artwork.title}
                </h1>
                <span 
                  className={`inline-block text-sm tracking-wider uppercase ${
                    artwork.status === "available" 
                      ? "text-accent" 
                      : "text-muted-foreground"
                  }`}
                >
                  {artwork.status === "available" ? "Available" : "Sold"}
                </span>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {artwork.description || "This original artwork is a unique piece crafted with meticulous attention to detail and artistic expression."}
                </p>
              </div>

              <div className="space-y-3 text-sm text-muted-foreground">
                {artwork.medium && (
                  <p><span className="font-medium text-foreground">Medium:</span> {artwork.medium}</p>
                )}
                {artwork.dimensions && (
                  <p><span className="font-medium text-foreground">Dimensions:</span> {artwork.dimensions}</p>
                )}
                {artwork.year && (
                  <p><span className="font-medium text-foreground">Year:</span> {artwork.year}</p>
                )}
              </div>

              {/* {artwork.status === "available" && (
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto px-12 py-6 text-base tracking-wider uppercase"
                >
                  Inquire About This Piece
                </Button>
              )} */}

              {artwork.status === "sold" && (
                <p className="text-sm text-muted-foreground italic">
                  This piece has found its home. Contact us to commission a similar work.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
