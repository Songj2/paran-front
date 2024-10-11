import React from 'react';
import GroupRow from "./GroupRow";
import RoomRow from "./RoomRow";
import BookRow from "./BookRow";
import ChatRow from "./ChatRow";
import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/lib/features/users/user.slice';

interface ContentAreaProps {
  activeTab: string
}

interface UserInfo {
  nickname: string
  groupId: string
}

const ContentArea = ({ activeTab }:ContentAreaProps) => {
  const userInfo = useSelector(getCurrentUser) as unknown as UserInfo;

  const renderActiveContent = () => {
    switch (activeTab) {
      case "Groups":
        return <GroupRow active={true} onSelect={() => {}} />;
      case "Rooms":
        return <RoomRow active={true} onSelect={() => {}} />;
      case "Books":
        return <BookRow active={true} onSelect={() => {}}/>;
        case "Chats":
          return userInfo.groupId.length > 0 && (
            <ChatRow active={true} onSelect={() => {}} />
          )
      default:
        return null
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="w-[92%] mb-4 ml-4 grid grid-cols-4 gap-8 md:grid-cols-3">
        {renderActiveContent()}
      </div>
    </div>
  );
};

export default ContentArea;