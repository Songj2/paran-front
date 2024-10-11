"use client";
import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from "@/lib/store";
import ChatCard from './ChatCard';
import fetchChats from "@/app/api/requests";
import requests from "@/app/api/requests";

interface ChatRowProps {
  active: boolean;
  onSelect: () => void;
}

const ChatRow = ({ active, onSelect }:ChatRowProps) => {
  const dispatch = useAppDispatch()
  const { chats, loading, error } = useSelector((state: RootState) => state.chat)

  useEffect(() => {
    dispatch(requests.fetchChats());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 gap-4">
      {chats.map((chat: { id: React.Key | null | undefined; }) => (
        <ChatCard key={chat.id} chat={chat} active={active} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default ChatRow;