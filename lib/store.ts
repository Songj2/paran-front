import { configureStore } from '@reduxjs/toolkit'
import fileSlice from './features/file/file.alice'
import roomSlice from './features/room/room.alice'
import addressSlice from './features/room/address.alice'
import accountSlice from './features/room/account.alice'
import reviewSlice from './features/room/review.alice'
import bookingsSlice from './features/room/booking.alice'
import { useDispatch } from "react-redux"
import userSlice from './features/users/user.alice'
import errorSlice from './features/error.alice'
import commentSlice from './features/comment/comment.alice'
import chatSlice from './features/chat/chat.alice'
import bookSlice from './features/group/book.alice'
import dataSlice from './features/data.alice'
import adminPostSlice from './features/users/adminPost.alice'
import declarationPostSlice from './features/users/declarationPost.alice'
import friendSlice from './features/users/friend.alice'
import groupSlice from '@/lib/features/group/group.slice'


export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      adminPost: adminPostSlice,
      declarationPost: declarationPostSlice,
      friend: friendSlice,
      file: fileSlice,
      room: roomSlice,
      address: addressSlice,
      account: accountSlice,
      review: reviewSlice,
      group: groupSlice,
      bookings: bookingsSlice,
      error: errorSlice,
      comment: commentSlice,
      chat: chatSlice,
      book: bookSlice,
      data: dataSlice,
    },
  })
}

// 스토어 타입을 정의합니다.
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch: () => AppDispatch = useDispatch