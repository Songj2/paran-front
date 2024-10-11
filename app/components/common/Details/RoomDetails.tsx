"use client";
import { TimeModel } from "@/app/model/room/room.model";
import { timeService } from "@/app/service/room/time.service";
import { getCurrentRoom, saveLoading } from "@/lib/features/room/room.slice";
import { useEffect, useState } from "react";
import DetailButton from "./DetailButton";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/store";
import Image from "next/image";
import { getCurrentFile } from "@/lib/features/file/file.slice";
interface roomDetailProps {
  roomId: number;
}
export default function Details({ roomId }: roomDetailProps) {
  const [times, setTimes] = useState<TimeModel[]>([])
  const room = useSelector(getCurrentRoom);
  const file = useSelector(getCurrentFile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (room && room.id !== undefined) {
      timeService.findByRoom(room.id, dispatch).then(data => {
        if (data) {
          setTimes(data)
        }
      })
    }
    dispatch(saveLoading(false))
  }, [dispatch])
  const getRoomImage = (path: string | undefined) => {
    if (file !== undefined) {
      return !path?.includes("default.png") ? `http://localhost:8000/api/files/one?path=${path}` : process.env.NEXT_PUBLIC_IMAGE_DEFAULT; // 기본 이미지 제공
    }
    return process.env.NEXT_PUBLIC_;
  };
  const groupedTimes = times.reduce((acc: Record<string, TimeModel[]>, time) => {
    const { date } = time;
    if (!acc[date]) {
      acc[date] = []; // Create new array for this date if it doesn't exist
    }
    acc[date].push(time);
    return acc;
  }, {});
  return (
    <div>
      <div className="flex justify-center gap-3 w-[80%] items-center mx-auto my-8">
        <Image
          width={600}
          height={400}
          className="cursor-pointer rounded-lg bg-green-400"
          src={getRoomImage(file?.path) || `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT}`}
          alt={`cover of ${room?.title}`}
          priority
        />

      </div>
      <hr className="my-8 w-[80%] mx-auto" />
      <div className="w-[45rem] mx-auto my-8">
        <div className="h-[300px] p-8 w-full justify-center bg-green-50 rounded-lg">
          <p className="mb-2">가게명: {room?.name}</p>
          <p className="mb-2">이용 정원: {room?.maxPeople} 명</p>
          <p className="mb-2">단독 사용 여부: {room?.opened ? "O" : "X"}</p>
          <p className="mb-2">이용 가능 시간: {room?.openTime} ~ {room?.closeTime}</p>
          <p className="mb-2">시간당 이용 금액: {room?.price}원</p>
          <p className="mb-2">이용 가능 시간 {groupedTimes && Object.keys(groupedTimes).map((date) => (
            <p key={date}>
              <p>{date}</p>
              {groupedTimes[date].map((time) => (
                <span key={time.id}>{time.time} </span>
              ))}
            </p>
          ))}</p>
        </div>

      </div>

      <DetailButton thisPage="/rooms" displayBoard="none" displayReview="block" displayReservation="block" />
    </div >
  );
}
