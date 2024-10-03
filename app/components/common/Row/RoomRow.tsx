"use client";
import React, { useEffect, useState } from "react";
import { getRooms, saveCurrentRoom, saveLoading } from "@/lib/features/room/room.slice";
import { useRouter } from "next/navigation";
import { RoomModel } from "@/app/model/room/room.model";
import { useAppDispatch } from "@/lib/store";
import { FileType } from "@/app/model/file/file.model";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { roomService } from "@/app/service/room/room.service";
import { fileService } from "@/app/service/File/file.service";
import { getFiles, saveCurrentFile, upLoading } from "@/lib/features/file/file.slice";
import ErrorMessage from "../status/ErrorMessage";

interface RoomRowProps {
  active: boolean;
  onSelect: () => void;
}

interface RoomFile {
  refId: number;
  path: string;
}

const RoomRow = ({ active, onSelect }: RoomRowProps) => {
  const [isActive, setIsActive] = useState<boolean>(active);
  const rooms = useSelector(getRooms) as RoomModel[];
  const files = useSelector(getFiles) as { roomFiles: RoomFile[] };
  const dispatch = useAppDispatch();
  const router = useRouter();

  const size: number = 25;
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    setIsActive(active);
  
    const loadData = async () => {
      try {
        dispatch(saveLoading(true));
        await roomService.findByEnabled(page, size, dispatch);
        if (rooms.length > 0) {
          await loadRoomFiles(rooms);
        }
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
      } finally {
        dispatch(saveLoading(false));
      }
    };
  
    loadData();
  }, [active, dispatch, page]);

  const loadRoomFiles = async (rooms: RoomModel[]) => {
    if (rooms.length > 0) {
      const roomIds = rooms.map(room => room.id).filter((id): id is number => id !== undefined);
      try {
        dispatch(upLoading(true));
        await fileService.selectFileList(roomIds, FileType.ROOM, dispatch);
      } catch (error) {
        console.error("파일 로딩 중 오류 발생:", error);
      } finally {
        dispatch(upLoading(false));
      }
    }
  };

  const getRoomImage = (roomId: number | undefined): string => {
    if (roomId !== undefined && files.roomFiles) {
      const roomFile = files.roomFiles.find(file => file.refId === roomId);
      return roomFile?.path 
        ? `${process.env.NEXT_PUBLIC_FILE_URL}/one?path=${roomFile.path}` 
        : `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT}`;
    }
    return `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT}`;
  };

  const onClickToDetail: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const currentId = Number(event.currentTarget.dataset.roomId);

    if (!isNaN(currentId)) {
      const currentRoom = rooms.find(({ id }) => id === currentId);
      if (currentRoom) {
        dispatch(saveCurrentRoom(currentRoom));
        const currentFile = files.roomFiles?.find(({ refId }) => refId === currentId) ?? null;
        dispatch(saveCurrentFile(currentFile));
        router.push(`${process.env.NEXT_PUBLIC_ROOM_URL}${currentId}`);
      } else {
        console.error("Room not found for ID:", currentId);
      }
    } else {
      console.error("Invalid room ID");
    }
  };

  return (
    <>
      {rooms.length > 0 ? (
        rooms.map((room: RoomModel) => (
          <div className="relative max-w-sm" key={room.id}>
            <div
              className={`max-w-sm rounded-lg border border-gray-200 bg-white shadow ${isActive ? 'ring-2 ring-green-500' : ''}`}
              onClick={onClickToDetail}
              data-room-id={room.id}
            >
              <Link href={`/rooms/${room.id}`} passHref>
                <Image
                  width={400}
                  height={380}
                  className="cursor-pointer rounded-t-lg"
                  src={getRoomImage(room.id)}
                  alt={`cover of ${room.title}`}
                  priority
                />
              </Link>

              <div className="p-5">
                <Link href={`/rooms/${room.id}`}>
                  <h5 className={`mb-2 text-lg font-medium tracking-tight ${isActive ? 'text-green-600' : 'text-gray-900'}`}>
                    {room.name}
                  </h5>
                </Link>
                <p className="mb-3 text-sm font-medium text-gray-700">
                  {room.price.toLocaleString("ko-kr")}원
                </p>
                <p className="text-sm font-medium">판매자: {room.nickname}</p>
                <button
                  type="button"
                  onClick={onClickToDetail}
                  data-room-id={room.id}
                  className={`mt-5 inline-flex w-full items-center rounded-lg p-3 text-sm font-medium text-white ${
                    isActive ? 'bg-green-600 hover:bg-green-700' : 'bg-green-400 hover:bg-green-500'
                  }`}
                >
                  상세보기
                  <svg
                    className="ms-2 size-3.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>등록된 공간이 없습니다.</div>
      )}
    </>
  );
};

export default RoomRow;