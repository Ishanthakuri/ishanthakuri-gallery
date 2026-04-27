import { Header } from "@/components/header"
import { ArtworkGrid } from "@/components/artwork-grid"
import { artworks } from "@/lib/artworks"
import EnquiryForm  from "@/components/ui/enquiryForm"
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ArtworkGrid artworks={artworks} />
        <EnquiryForm />

      </main>
    </div>
  )
}

