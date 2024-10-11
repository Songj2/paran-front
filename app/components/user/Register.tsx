"use client"
import { ChangeEvent, useState } from "react";

interface FormData {
username: string;
password: string;
repeat_password: string;
nickname: string;
tel: string;
name: string;
}

export default function register() {
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    repeat_password: '',
    nickname: '',
    tel: '',
    name: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmit = () => {
    console.log(formData); 
  };

  return (
    <div className="my-6 py-40">
      <div className="mx-auto max-w-md">
      <h1 className="text-2xl mb-6">파란만장 서비스와 함께해요!</h1>
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="text"
            name="username"
            id="username"
            className="border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900"
            placeholder=""
            onChange={handleChange}
            required
          />
          <label
            htmlFor="username"
            className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-400"
          >
            ID
          </label>
        </div>
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            className="border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-green-400 focus:outline-none focus:ring-0"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-400  rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            비밀번호
          </label>
        </div>
        {/* 비밀번호 맞는지 확인 폼 */}
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="password"
            name="repeat_password"
            id="repeat_password"
            onChange={handleChange}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="repeat_password"
            className="absolute text-sm text-gray-500 duration-300 -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-400  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            비밀번호 확인
          </label>
        </div>
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="text"
            name="nickname"
            id="nickname"onChange={handleChange}
            className="border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-green-400 focus:outline-none focus:ring-0 "
            required
          />
          <label
            htmlFor="nickname"
            className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-400 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            닉네임
          </label>
        </div>
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
            name="tel"
            id="tel"
            onChange={handleChange}
            className="border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-green-400 focus:outline-none focus:ring-0 "
            placeholder=" "
            required
          />
          <label
            htmlFor="tel"
            className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-400 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Tel: (123-3456-7890)
          </label>
        </div>
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="text"
            name="name"
            id="name"onChange={handleChange}
            className="border peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-green-400 focus:outline-none focus:ring-0 "
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-400 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            이름
          </label>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          className="w-full rounded-lg bg-green-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-400 sm:w-auto"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}