"use client"
import { useState, useEffect } from "react"
import Alert from "../common/Alert"
import { useAppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";
import { getCurrentUser, saveUserRole } from "@/lib/features/users/user.slice";
import { RootState } from "@/lib/store"; // RootState 임포트 경로 수정
import { UserModel } from "@/app/model/user.model";
import { userService } from "@/app/service/user/user.service";

export default function AdminUserUpdate() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string>("")
  const dispatch = useAppDispatch()
  const user = useSelector((state: RootState) => getCurrentUser(state));
  
  useEffect(() => {
    if (user?.role) {
      setSelectedRole(user.role);
    }
  }, [user]);

  const onSetRank = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const newRole = e.target.value;
    setSelectedRole(newRole);

    if (user) {
      dispatch(saveUserRole({ nickname: user?.nickname ?? "", role: newRole }))
        .then(() => {
          setIsOpen(true);
        })
        .catch((error: Error) => {
          console.error("user role 업데이트에 실패했습니다:", error);
        });
    } else {
      console.error("현재 사용자 정보를 찾을 수 없습니다.");
    }
  };

  return (
    <div className="mx-auto my-[40px] py-3 px-6 h-auto w-full max-w-lg items-start rounded-lg border border-gray-200 bg-white shadow">
      <ul className="text-sm">
        <li className="flex items-center justify-center">
          닉네임
          <h5 className="mb-2 ml-6 text-xl font-medium text-gray-900">
            {user?.nickname || 'Unknown'}
          </h5>
        </li>
        <li className="flex items-center justify-center">
          <h2 className="mx-3">유저 등급</h2>

          <form onSubmit={(e) => e.preventDefault()}>
            <select 
              id="selectRank" 
              onChange={onSetRank}
              value={selectedRole}
            >
              <option value="seller">노랑 회원 - 판매자</option>
              <option value="user">초록 회원 - 일반</option>
            </select>
            <button type="button" onClick={() => onSetRank({ target: { value: selectedRole } } as React.ChangeEvent<HTMLSelectElement>)} className="m-2 rounded-lg bg-green-50 px-4 py-2 text-center border-2 border-green-400 text-sm font-medium text-gray-900 hover:bg-green-400 hover:text-white">
              등급수정
            </button>
          </form>
        </li>
      </ul>
      <Alert 
        message={'등급 수정이 완료되었습니다.'} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
      />  
    </div>
  )
}