"use client"
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useEffect, useState } from 'react';

interface UserProfileProps {
  getUser: string;
}

export default function UserProfile({getUser} : UserProfileProps) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(`/api/user/${getUser}`);
      const data = await response.json();
      setUserData(data);
    }

    fetchUserData();
  }, [getUser]);

  if (!userData) return <div>Loading...</div>;
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  const handlePageAccount = () => {
    router.push('/account');
  }
  const handlePageLikeList = () => {
    router.push('/likeList');
  }
  const handlePage = () => {
    //{유저아이디}
    router.push(`/users/update/2`);
  }

  return (
    <div className="mx-auto my-[40px] py-3 px-6 h-auto w-full max-w-lg items-start rounded-lg border border-gray-200 bg-white shadow">
      <div className="flex mb-10">
      {/* 유저 이미지 */}
        <div className="flex flex-col items-center ml-3">
          <Image
            className="mb-3 rounded-full shadow-lg"
            width={102}
            height={100}
            src="/docs/images/people/profile-picture-3.jpg"
            alt="프로필 사진"
          />
        </div>
        {/* 유저정보 */}
        <div className="flex items-center">
          <ul className="text-sm">
          <li className="flex items-center">
              닉네임
              <h5 className="mb-2 ml-6 text-xl font-medium text-gray-900">
                spongeBOB
              </h5>
            </li>
            <li className="flex items-center">
              아이디
              <h5 className="mb-2 ml-6 text-xl font-medium text-gray-900">
                qwer
              </h5>
            </li>
          </ul>
        </div>
      </div>
{/* 버튼 */}
      <div className="flex items-center justify-center">
      <button type="button" onClick={handlePageAccount} className="m-2 rounded-lg bg-green-50 px-4 py-2 text-center border-2 border-green-400  text-sm font-medium text-gray-900 hover:bg-green-400 hover:text-white">결제내역보기</button>
        <button type="button" onClick={handlePageLikeList} className="m-2 rounded-lg bg-green-50 px-4 py-2 text-center border-2 border-green-400  text-sm font-medium text-gray-900 hover:bg-green-400 hover:text-white">찜목록</button>
        <button type="button" onClick={handlePage} className="m-2 rounded-lg bg-green-50 px-4 py-2 text-center border-2 border-green-400  text-sm font-medium text-gray-900 hover:bg-green-400 hover:text-white">내정보수정</button>
        <button type="button" onClick={handleGoBack} className="m-2 rounded-lg bg-green-400 px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-green-500 hover:text-white">뒤로가기</button>
      </div>
    </div>
  );
}
