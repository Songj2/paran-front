"use client";
import { LuBellRing } from "react-icons/lu";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";
import paranLogo from "@/app/assets/paranLogo.png";
import { logout } from "@/app/service/user/logout.service";
import BellService from "./BellService";
import { useAppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/lib/features/users/user.slice";

function LoginHeader (){
  return (
    <header className="border-b border-gray-400 bg-white shadow-sm">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src={paranLogo} width={24} height={24} className="size-8" alt="Logo" />
          <span className="self-center whitespace-nowrap text-2xl font-semibold">
            Paranmanzang
          </span>
        </Link>

        <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto" id="navbar-cta">
          <Nav />
        </div>

        <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            <Link
              href="/users/login"
              className="mx-2 rounded-lg bg-green-400 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              로그인
            </Link>
        </div>
      </div>
    </header>
    )
}


function UserHeader() {
  const [isHidden, setIsHidden] = useState(true)
  const [user, setUser] = useState({} as any)
  const dispatch = useAppDispatch()
  const getUser = useSelector(getCurrentUser);
  console.log(getUser);
  const popupOpen = () => {
    setIsHidden((prevState) => !prevState);
  };

  const onLogout = () => {
    logout().then(() => "로그아웃됨")
  }

  return (
    <header className="border-b border-gray-400 bg-white shadow-sm">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src={paranLogo} width={24} height={24} className="size-8" alt="Logo" />
          <span className="self-center whitespace-nowrap text-2xl font-semibold">
            Paranmanzang
          </span>
        </Link>

        <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto" id="navbar-cta">
          <Nav />
        </div>

        <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            <>
              {user?.role === 'admin' && (
                <button
                  type="button"
                  className="mx-3 rounded-lg bg-green-400 px-3 py-2 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300"
                  onClick={popupOpen}
                >
                  <LuBellRing />
                </button>
              )}
              <button
                onClick={onLogout}
                className="mx-2 rounded-lg bg-green-400 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300"
              >
                로그아웃
              </button>
              <Link
                href="/users/getMyPage"
                className="mx-2 rounded-lg bg-green-400 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300"
              >
                마이페이지
              </Link>
              <button
                type="button"
                className="mx-3 rounded-lg bg-green-400 px-3 py-2 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300"
                onClick={popupOpen}
              >
                <LuBellRing />
              </button>
              <ul
                className={isHidden ? "hidden" : "absolute right-0 top-10 z-20 rounded-lg bg-green-50"}
                id="popUp"
              >
                <BellService />
              </ul>
            </>
        </div>
      </div>
    </header>  
  )
}


export default function Header (){
  const [user, setUser] = useState({} as any)
  const dispatch = useAppDispatch()
  const getUser = useSelector(getCurrentUser);
  
  useEffect(() => {
    setUser(getUser)
    // console.log(user)
  }, [dispatch, user?.nickname])

  return ( 
    <>
      {user?.id && (
        <UserHeader/>
      )}
      {!user?.id && (
        <LoginHeader />
      )}
    </>
  )
}