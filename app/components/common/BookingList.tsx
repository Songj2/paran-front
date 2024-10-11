"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AccountButton from "./AccountButton"
import { useState } from "react"
import { useAppDispatch } from "@/lib/store"
import { deleteBooking, getBookings } from "@/lib/features/room/bookings.slice"
import { useSelector } from "react-redux"
import { BookingModel } from "@/app/model/room/bookings.model"

interface BookingListProps {
  bookings: BookingModel[];
}

export default function BookingList({ bookings }: BookingListProps) {
  const router = useRouter()
  const [selectedBookings, setSelectedBookings] = useState<string[]>([])
  const dispatch = useAppDispatch();
  const booking = useSelector(getBookings);

  const handleCheckboxChange = (id: string) => {
    setSelectedBookings(prev =>
    prev.includes(id) ? prev.filter(bookingId => bookingId !== id) : [...prev, id]
    )
  }

  const handleDelete = (id: number) => {
    console.log('삭제하기:', id)
    if (selectedBookings.includes(String(id))) {
      dispatch(deleteBooking(id))
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <ul>
        {bookings && bookings.map(booking => (
          <li key={booking.id} className="relative max-w-sm bg-green-100 rounded-lg mb-4" id="box">
            <form className="absolute top-2 w-full px-3">
              <div className="flex justify-between">
                <div id="selectBtn">
                  <input
                    id={`select-${booking.id}`}
                    type="checkbox"
                    checked={selectedBookings.includes(String(booking.id))}
                    onChange={() => handleCheckboxChange(String(booking.id))}
                    className="size-6 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor={`select-${booking.id}`} hidden>Select</label>
                </div>
              </div>
            </form>
            <div className="border-1 border-gray-100 pt-5">
              <div className="p-5">
                <Link href={`/books/${booking.id}`}>
                  <h5 className="mb-2 text-lg font-medium tracking-tight">
                    {booking?.roomId}
                  </h5>
                </Link>
                <p className="mb-3 text-sm font-medium text-gray-700">
                  {booking.date}
                </p>
                <p className="mb-3 text-sm font-medium text-gray-700">
                  {booking.groupId}
                </p>
                <p className="mb-3 text-sm font-medium text-gray-700">
                  {booking.usingTime}
                </p>
                <p className="mb-3 text-sm font-medium text-gray-700">
                  {booking.enabled}
                </p>
                <div className="flex mt-5 w-full items-center justify-center">
                  <button
                    type="button"
                    onClick={() => router.push(`/rooms/${booking.id}`)}
                    className="rounded-lg p-2 mx-2 text-sm font-medium bg-green-600 text-white"
                  >
                    상세보기
                  </button>
                  <AccountButton />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="btn_wrap flex justify-end my-4">
        <button onClick={() => router.back()} className="p-2 bg-green-600 text-white rounded-lg">뒤로가기</button>
        <button
          onClick={() => handleDelete(booking?.id)}
          className="p-2 mx-2 bg-green-600 text-white rounded-lg"
        >삭제하기</button>
      </div>
    </div>
  )
}