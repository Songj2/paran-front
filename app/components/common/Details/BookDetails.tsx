"use client";
import DetailButton from "./DetailButton";
import { useSelector } from "react-redux";
import { getCurrentBook } from "@/lib/features/group/book.slice";
import Image from "next/image";
import { getCurrentFile } from "@/lib/features/file/file.slice";
import ErrorMessage from "../status/ErrorMessage";
import LoadingSpinner from "../status/LoadingSpinner";

export default function Details() {
    const book = useSelector(getCurrentBook);
    const file = useSelector(getCurrentFile);

    // 로딩 중일 때
    if (book == null) {
        return <LoadingSpinner />;
    }

    return (
        <div className="w-[45rem] mx-auto my-10">
            <div className="h-[300px] justify-center bg-green-200">
                {file && file.path ? (
                    <Image
                        src={`http://localhost:8000/api/files/one?path=${file.path}`}
                        alt={book.title}
                        width={300}
                        height={800}
                    />
                ) : (
                    <ErrorMessage message={'이미지를 불러올 수 없습니다.'} />
                )}
            </div>
                <hr className="my-8" />
            <div className="max-w-sm mb-20">
                <p className="my-2 font-medium text-lg">제목 | {book.title}</p>
                <p className="my-2 font-base text-lg">저자 | {book.author}</p>
                <p className="my-2 font-base text-lg">카테고리 | {book.categoryName || '카테고리 없음'}</p>
                <p className="my-2 font-base text-lg">좋아요 수 | {book.likeBookCount}</p>
            </div>
            <div className="mx-auto max-w-sm">
                <DetailButton thisPage={'/books'} displayBoard="none" displayReview="none" displayReservation="none" />
            </div>
        </div>
    );
}
