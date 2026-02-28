import { BottomNav } from "@/components/bottom-nav"
import { FeaturedVehicles } from "@/components/featured-vehicles"
import { TopTours } from "@/components/top-tours"
import { ServiceGrid } from "@/components/service-grid"
import { HeroSearch } from "@/components/hero-search"

export default function ExplorePage() {
    return (
        <div className="min-h-screen pb-24 space-y-8 bg-background">
            <div className="pt-6 px-4">
                <h1 className="text-2xl font-bold mb-4">Explore Ridenet</h1>
                <HeroSearch />
            </div>
            <FeaturedVehicles />
            <TopTours />
            <ServiceGrid />
            <BottomNav />
        </div>
    )
}
