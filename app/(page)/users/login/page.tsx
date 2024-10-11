"use client"

import { useState } from 'react';
import Image from "next/image";
import Naver from "@/app/assets/btnG.png"
import { useRouter } from "next/navigation";
import { login, oauth } from "@/app/service/user/login.service";
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/lib/store';
import { saveCurrentUser } from '@/lib/features/users/user.slice';

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const user = login(username, password);
            console.log('로그인 성공:', user);
            dispatch(saveCurrentUser(user))
            router.push('/')
        } catch (error) {
            console.error('로그인 실패:', error);
        }
    };

    const moveToOath = () => {
        const oauthUrl = process.env.NEXT_PUBLIC_OAUTH_URL;
        try {
            if (oauthUrl) {
                const result = oauth(oauthUrl);
                console.log(result);
            } else {
                router.push('/')
            }
        } catch (error) {
            console.error('로그인 실패:', error)
        }

    };

    return (
        <div className="mx-auto my-6 max-w-lg rounded-lg border p-6 shadow items-center">
            <form onSubmit={onSubmit}>
                <div className="mb-5">
                    <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-900">
                        ID
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500"
                        placeholder="ID를 입력해주세요"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">
                        비밀번호
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500"
                        placeholder="비밀번호"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="my-2 w-full rounded-lg border-2 border-green-400 bg-green-400 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                    로그인
                </button>
                <button
                    type="button"
                    onClick={() => { router.push('/users/register') }}
                    className="my-2 w-full rounded-lg border-2 border-green-400 bg-green-400 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                    회원가입
                </button>
            </form>
            <hr className="my-2" />

            <div className="mx-auto my-4 max-w-lg">
                <button
                    type="button"
                    className="mb-2 flex w-full items-center rounded-lg border-2 border-[#03c75a] bg-white px-5 py-2.5 text-sm font-medium text-[#03c75a] hover:bg-[#03c75a] hover:text-white"
                    onClick={() => moveToOath()}
                >
                    <Image
                        src={Naver}
                        alt="naver"
                        width={40}
                    />
                    <span className="mx-5">네이버로 로그인</span>
                </button>
            </div>
        </div>
    );
}
