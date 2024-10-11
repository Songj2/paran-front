"use client"
import Link from "next/link";
import AccountButton from "@/app/components/common/AccountButton";
import { useState } from "react";
import Alert from "../common/Alert";
import { useAppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";
import { getLikedPosts, getLikedRooms } from "@/lib/features/users/users.slice";
import { getLikedBooks } from "@/lib/features/group/book.slice";

interface ComLikeListProps {
  type: "그룹" | "도서" | "장소";
}

interface LikedItem {
  id: string | number;
  title: string;
  description: string;
}

const ComLikeList = ({ type } : ComLikeListProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const likedPosts = useSelector(getLikedPosts);
  const likedRooms = useSelector(getLikedRooms);
  const likedBooks = useSelector(getLikedBooks);

  const modalOpen = (): void => {
    setIsModalOpen(true); 
    <Alert message={'예약요청이 완료되었습니다.'} isOpen={isModalOpen} onClose={() => setIsModalOpen(false) }/>
    console.log('AccountLike: ' + '예약요청이 완료되었습니다.');
  }

  const renderItems = (): JSX.Element[] => {
    let items: LikedItem[];
    switch(type) {
      case "그룹":
        items = likedPosts;
        break;
      case "도서":
        items = likedBooks;
        break;
      case "장소":
        items = likedRooms;
        break;
      default:
        items = [];
    }

    return items.map((item: LikedItem, index: number) => (
      <li key={item.id || index} className="w-full relative">
        <div className="flex justify-around my-2 rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {item.title}
            </h5>
            <p className="font-normal text-gray-700">
              {item.description}
            </p>
          </div>
          <div className="btn_wrap flex items-center">
            {type === "장소" && (
              <button type="button" onClick={modalOpen} className="text-sm p-2 mx-3 bg-green-100 rounded-lg">
                요청보내기
              </button>
            )}
            {type === "그룹" && (
              <button type="button" onClick={modalOpen} className="text-sm p-2 mx-3 bg-green-100 rounded-lg">
                참여요청
              </button>
            )}
            <AccountButton />
          </div>
        </div>
      </li>
    ));
  }
  
  return ( 
    <div>
      <h2 className="text-xl font-bold mb-4">{type} 좋아요 목록</h2>
      <ul>
        {renderItems()}
      </ul>
    </div>
  );
}

export default ComLikeList;