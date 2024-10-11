"use client";
import React, { useEffect, useState } from "react";
import { getRooms, saveCurrentRoom, saveLoading } from "@/lib/features/room/room.slice";
import { RoomModel } from "@/app/model/room/room.model";
import { useAppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";
import { FileType } from "@/app/model/file/file.model";
import { roomService } from "@/app/service/room/room.service";
import { getFiles, saveCurrentFile, upLoading } from "@/lib/features/file/file.slice";
import ErrorMessage from "../status/ErrorMessage";
import Pagination from "./pagination/Pagination";
import RoomCard from "./RoomCard";
import { fileService } from "@/app/service/File/file.service";

interface RoomRowProps {
  active: boolean;
  onSelect: () => void;
}

const RoomRow = ({ active, onSelect }: RoomRowProps) => {
  const rooms = useSelector(getRooms);
  const files = useSelector(getFiles);
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const totalItems = 10; // 실제 데이터의 총 개수로 업데이트

  useEffect(() => {
    dispatch(saveLoading(true));
    roomService.findByEnabled(page, pageSize, dispatch);
    loadRoomFiles(rooms);
    dispatch(saveLoading(false));
  }, [page, pageSize]);

  const loadRoomFiles = (rooms: RoomModel[]) => {
    const roomIds = rooms.map((room) => room.id);
    dispatch(upLoading(true));
    fileService.selectFileList(roomIds, FileType.ROOM, dispatch);
    dispatch(upLoading(false));
  };

  const getRoomImage = (roomId: number | undefined): string => {
    if (roomId !== undefined) {
      const roomFile = files.roomFiles.find((file) => file.refId === roomId);
      return roomFile
        ? `${process.env.NEXT_PUBLIC_FILE_URL}/one?path=${roomFile.path}`
        : `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT}`;
    }
    return `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT}`;
  };

  const onClickToDetail = (currentId: number | undefined): void => {
    if (currentId !== undefined) {
      const currentRoom = rooms.find(({ id }) => id === currentId);
      if (currentRoom) {
        dispatch(saveCurrentRoom(currentRoom));
        dispatch(saveCurrentFile(files.roomFiles.find(({ refId }) => refId === currentId) ?? null));
      }
    }
  };

  return (
    <>
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            isActive={active}
            getRoomImage={getRoomImage}
            onClickToDetail={onClickToDetail}
          />
        ))
      ) : (
        <div><ErrorMessage message={'등록된 공간이 없습니다.'}/></div>
      )}
      <Pagination 
        currentPage={page} 
        pageSize={pageSize} 
        totalItems={totalItems} 
        onPageChange={setPage} 
        onPageSizeChange={setPageSize} 
      />
    </>
  );
};

export default RoomRow;