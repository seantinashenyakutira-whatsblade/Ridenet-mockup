import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background px-4 pt-6 pb-24">
            <div className="flex items-center mb-6">
                <Link href="/" className="mr-4 text-muted-foreground hover:text-foreground">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold">Terms & Conditions</h1>
            </div>

            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                <h2 className="text-foreground font-semibold">1. Introduction</h2>
                <p className="mb-4">Welcome to RideNet Solutions. By using our platform, you agree to these Terms and Conditions.</p>

                <h2 className="text-foreground font-semibold">2. Bookings & Reservations</h2>
                <p className="mb-4">All bookings are subject to availability. Prices may vary based on demand, season, and the specific service selected.</p>

                <h2 className="text-foreground font-semibold">3. Payment & Cancellations</h2>
                <p className="mb-4">Payments must be made in ZMW via Mobile Money or supported cards. Cancellations made within 24 hours of the booking may attract a fee.</p>

                <h2 className="text-foreground font-semibold">4. Privacy Policy</h2>
                <p className="mb-4">We respect your privacy. All data collected, including names and phone numbers, are only used for providing and improving our services.</p>

                <h2 className="text-foreground font-semibold">5. Contact Us</h2>
                <p className="mb-4">If you have any questions, you can contact our support team at support@ridenet.co.zm.</p>
            </div>

            <BottomNav />
        </div>
    )
}
