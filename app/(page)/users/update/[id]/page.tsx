"use client"
import { getCurrentUser, saveError } from "@/lib/features/users/user.slice";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/store";
import { modifyPassword } from "@/app/service/users/user.service";
import { useState } from "react";

interface PageProps {
  params: { id: string };
}

export default function UserUpdate({ params }: PageProps) {
  const user = useSelector(getCurrentUser);
  const dispatch = useAppDispatch();
  const [newPassword, setNewPassword] = useState('');

  const onUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && user.nickname) {
      await modifyPassword(user.nickname, newPassword, dispatch);
    } else {
      dispatch(saveError("사용자 정보를 찾을 수 없습니다."));
    }
  }
  return (
    <div className="max-w-sm mx-auto p-6 my-8 bg-green-100 rounded-lg">
      <form className="p-2" onSubmit={onUpdate}>
        <div>
          <label htmlFor="ID" className="block mb-2 text-sm font-medium text-gray-900">아이디</label>
          <input 
            type="text" 
            id="ID" 
            value={user?.nickname || ''} 
            disabled 
            className="border text-sm rounded-lg block w-full p-2.5"
          />
        </div>
        <div className="my-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">비밀번호</label>
          <input 
            type="password" 
            id="password" 
            placeholder="변경할 비밀번호를 입력해주세요" 
            className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="p-2 bg-green-400 mx-2 rounded-lg text-white">수정하기</button>
        <Link href="/" className="p-2 bg-gray-300 mx-2 rounded-lg text-black inline-block">취소</Link>
      </form>
    </div>

  )
}
