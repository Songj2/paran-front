import { ChatUserModel } from "@/app/model/chat/chat.model";
import Image from "next/image";
import { useState, useEffect } from "react";
import ModalFriend from "./ModalFriend";
import styles from './PeopleList.module.css';
import { useAppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/lib/features/users/user.slice";

interface PeopleListProps {
  chatUser: ChatUserModel;
}

export default function PeopleList({ chatUser }: PeopleListProps) {
  const [onToggle, setOnToggle] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    let eventSource: EventSource | null = null;

    //sse end point 설정해야합니당
    const setupSSE = () => {
      eventSource = new EventSource(`/api/user-status/${chatUser.nickname}`);

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setIsOnline(data.isOnline);
      };

      eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        if (eventSource) {
          eventSource.close();
        }
      };
    };

    setupSSE();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [chatUser.nickname]);

  return (
    <li className="border-b w-full">
      <div className="flex justify-around px-3 py-2 my-3 items-center">
        <div className="relative">
          <Image
            width={46}
            height={46}
            className="rounded-full bg-green-400"
            src="/"
            alt="userprofile"
          />
          <span className={isOnline ? styles.online : styles.offline}></span>
        </div>
        <p className="text-white text-lg font-semibold">{chatUser.nickname}</p>
        <button
          className="text-xs border-white border p-2 rounded-lg text-white hover:bg-green-600"
          onClick={() => setOnToggle((prev) => !prev)}
        >
          보기
        </button>
        <div
          className={`${styles.toggleBottom} relative top-0 ${
            onToggle ? styles.visible : styles.invisible
          }`}
        >
          <ModalFriend />
        </div>
      </div>
    </li>
  );
}