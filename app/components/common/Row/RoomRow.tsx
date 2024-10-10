"use client";
import React, { useEffect, useState } from "react";
import { getRooms, saveCurrentRoom, saveLoading } from "@/lib/features/room/room.slice";
import { useRouter } from "next/navigation";
import { RoomModel } from "@/app/model/room/room.model";
import { useAppDispatch } from "@/lib/store";
import { FileType } from "@/app/model/file/file.model";
import { useSelector } from "react-redux";
import HeartCheckbox from "./HeartCheckBox";
import Link from "next/link";
import Image from "next/image";
import { roomService } from "@/app/service/room/room.service";
import { fileService } from "@/app/service/File/file.service";
import { getFiles, saveCurrentFile, upLoading } from "@/lib/features/file/file.slice";

interface RoomRowProps {
  active: boolean;
  onSelect: () => void;
}

const RoomRow = ({ active, onSelect }: RoomRowProps) => {
  const [isActive, setIsActive] = useState<boolean>(active);
  const rooms = useSelector(getRooms);
  const files = useSelector(getFiles)
  const dispatch = useAppDispatch();
  const router = useRouter();

  // 페이지네이션 정보
  const size: number = 25;
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    setIsActive(active);

    roomService.findByEnabled(page, size, dispatch)
    loadRoomFiles(rooms)
    dispatch(saveLoading(false))

  }, [active, dispatch, page]);



  const loadRoomFiles = (rooms: any[]) => {
    const roomIds = rooms.map(room => room.id);
    fileService.selectFileList(roomIds, FileType.ROOM, dispatch)
    dispatch(upLoading(false))
  };
  const handleLikeChange = (active: boolean) => {
    console.log('좋아요 상태:', active);
    // 여기에서 필요한 로직을 수행 (예: API 호출)
  };

  const handleClick = (): void => {
    onSelect();
  };

  // 특정 공간에 맞는 파일을 찾는 함수
  const getRoomImage = (roomId: number | undefined) => {
    if (roomId !== undefined) {
      const roomFile = files.roomFiles.find(file => file.refId === roomId);
      return roomFile ? `process.env.NEXT_PUBLIC_FILE_URL/one?path=${roomFile.path}` : "process.env.NEXT_PUBLIC_IMAGE_DEFAULT"; // 기본 이미지 제공 
    }
    return process.env.NEXT_PUBLIC_IMAGE_DEFAULT;
  };

  const onClickToDetail = (currentId: number | undefined): void => {
    if (currentId !== undefined) {
      const currentRoom = rooms.find(({ id }) => id === currentId);
      if (currentRoom) {
        dispatch(saveCurrentRoom(currentRoom));
        dispatch(saveCurrentFile(files.roomFiles.find(({ refId }) => refId === currentId) ?? null));
        router.push(`process.env.NEXT_PUBLIC_ROOM_URL${currentId}`);
      }
    } else {
      console.error("ID is null");
    }
  };
  return (
    <>
      {rooms.length > 0 ? (
        rooms.map((room: RoomModel) => (
          <div className="relative max-w-sm" key={room.id}>
            <form className="absolute top-2 w-full px-3">
              <div className="flex justify-between">
                {/* 모든 유저  */}
                <div id="likeBtn">
                  <HeartCheckbox onChange={handleLikeChange} />
                </div>
                {/* 어드민 셀러만 보이게 */}
                <div id="selectBtn">
                  <input id="select" type="checkbox" value="" className="size-6 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500 " />
                  <label htmlFor="select" hidden>chatSelect</label>
                </div>
              </div>
            </form>
            <div
              className={`max-w-sm rounded-lg border border-gray-200 bg-white shadow ${isActive ? 'ring-2 ring-green-500' : ''
                }`}
              onClick={handleClick}
            >
              <Link href={`/rooms/${room.id}`} passHref>
                <Image
                  width={400}
                  height={380}
                  className="cursor-pointer rounded-t-lg"
                  src={`getRoomImage(${room.id})`}
                  alt={`cover of ${room.title}`}
                  priority
                />
              </Link>


              <div className="p-5">
                <Link href={`/rooms/${room.id}`}>
                  <h5 className={`mb-2 text-lg font-medium tracking-tight ${isActive ? 'text-green-600' : 'text-gray-900'
                    } `}>
                    {room.name}
                  </h5>
                </Link>
                <p className="mb-3 text-sm font-medium text-gray-700 ">
                  {room.price.toLocaleString("ko-kr")}원
                </p>
                <p className="text-sm font-medium">판매자: {room.nickname}</p>
                <button onClick={() => onClickToDetail(room.id)}
                  className={`mt-5 inline-flex w-full items-center rounded-lg p-3 text-sm font-medium text-white ${isActive
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-green-400 hover:bg-green-500'
                    } `}
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