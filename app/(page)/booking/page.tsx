"use client"
import BookingList from "@/app/components/common/BookingList"
import { getCurrentBooking } from "@/lib/features/room/bookings.slice"
import { useSelector } from "react-redux"

export default function bookingList() {
  const page = useSelector(getCurrentBooking)
  return (
    <div className="my-8">
      <BookingList id={`${page?.roomId}`}/>
    </div>
  )
}
