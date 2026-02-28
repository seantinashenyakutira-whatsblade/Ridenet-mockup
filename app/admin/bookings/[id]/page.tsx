"use client"

import { use } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { BookingDetail } from "@/components/admin/booking-detail"

type Props = {
  params: Promise<{ id: string }>
}

export default function BookingDetailPage({ params }: Props) {
  const { id } = use(params)
  return (
    <AdminLayout activeHref="/admin/bookings">
      <BookingDetail bookingId={id} />
    </AdminLayout>
  )
}
