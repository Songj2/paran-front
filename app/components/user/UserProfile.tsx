"use client"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findUserDetail } from '@/app/service/user/user.service'
import LoadingSpinner from '@/app/components/common/status/LoadingSpinner'
import ErrorMessage from '@/app/components/common/status/ErrorMessage'
import { AppDispatch, RootState } from '@/lib/store' 

interface UserProfileProps {
    getUser: string | undefined;
}
export default function UserProfile({ getUser }: UserProfileProps) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const {isLoading, error } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (getUser) {
            dispatch(findUserDetail(getUser));
        }
    }, [getUser, dispatch]);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="mx-auto my-[40px] py-3 px-6 h-auto w-full max-w-lg items-start rounded-lg border border-gray-200 bg-white shadow">
            <div className="flex mb-10">
                <div className="flex flex-col items-center ml-3">
                    <Image
                        className="mb-3 rounded-full shadow-lg"
                        width={102}
                        height={100}
                        src={user.profileImage || `process.env.NEXT_PUBLIC_IMAGE_DEFAULT`}
                        alt="프로필 사진"
                        onError={(e) => {
                            e.currentTarget.src = `process.env.NEXT_PUBLIC_IMAGE_DEFAULT`
                        }}
                    />
                </div>
                <div className="flex items-center">
                    <ul className="text-sm">
                        <li className="flex items-center">
                            닉네임
                            <h5 className="mb-2 ml-6 text-xl font-medium text-gray-900">
                                {user.nickname}
                            </h5>
                        </li>
                        <li className="flex items-center">
                            아이디
                            <h5 className="mb-2 ml-6 text-xl font-medium text-gray-900">
                                {user.username}
                            </h5>
                        </li>
                        <li className="flex items-center">
                            권한
                            <h5 className="mb-2 ml-6 text-xl font-medium text-gray-900">
                                {user.role}
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <button
                    type="button"
                    onClick={() => {router.push('/account')}}
                    className="m-2 rounded-lg bg-green-50 px-4 py-2 text-center border-2 border-green-400 text-sm font-medium text-gray-900 hover:bg-green-400 hover:text-white"
                >
                    결제내역보기
                </button>
                <button
                    type="button"
                    onClick={() => {router.push('/likeList')}}
                    className="m-2 rounded-lg bg-green-50 px-4 py-2 text-center border-2 border-green-400 text-sm font-medium text-gray-900 hover:bg-green-400 hover:text-white"
                >
                    찜목록
                </button>
                <button
                    type="button"
                    onClick={() => {router.push(`/users/update/${getUser}`)}}
                    className="m-2 rounded-lg bg-green-50 px-4 py-2 text-center border-2 border-green-400 text-sm font-medium text-gray-900 hover:bg-green-400 hover:text-white"
                >
                    내정보수정
                </button>
                <button
                    type="button"
                    onClick={() => {router.back()}}
                    className="m-2 rounded-lg bg-green-400 px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-green-500 hover:text-white"
                >
                    뒤로가기
                </button>
            </div>
        </div>
    );
}