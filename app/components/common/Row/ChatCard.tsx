import React from "react";
import Link from "next/link";

interface ChatCardProps {
  chat: any; 
  active: boolean;
  onSelect: () => void;
}

const ChatCard = ({ chat, active, onSelect }: ChatCardProps) => {
  return (
    <div className="relative max-w-sm">
      <div
        className={`max-w-sm rounded-lg border border-gray-200 bg-white shadow ${
          active ? 'ring-2 ring-green-500' : ''
        }`}
        onClick={onSelect}
      >
        <div className="p-5">
          <Link href={`/chats/${chat.id}`}>
            <h5 className={`mb-2 text-lg font-medium tracking-tight ${
              active ? 'text-green-600' : 'text-gray-900'
            }`}>
              {chat.title}
            </h5>
          </Link>
          <p className="mb-3 text-sm font-medium text-gray-700">
            {chat.content}
          </p>
          <p className="text-sm font-medium">채팅 목록</p>
          <Link
            href={`/chats/${chat.id}`}
            className={`mt-5 inline-flex w-full items-center rounded-lg p-3 text-sm font-medium text-white ${
              active ? 'bg-green-600 hover:bg-green-700' : 'bg-green-400 hover:bg-green-500'
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
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;