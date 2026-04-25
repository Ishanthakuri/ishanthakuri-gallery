import { Header } from "@/components/header"
import { ArtworkGrid } from "@/components/artwork-grid"
import { artworks } from "@/lib/artworks"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ArtworkGrid artworks={artworks} />
      </main>
    </div>
  )
}
