"use client";
import DetailButton from "./DetailButton";
import { useSelector } from "react-redux";
import { getCurrentBook } from "@/lib/features/group/book.slice";
import Image from "next/image";
import { getCurrentFile } from "@/lib/features/file/file.slice";
import LoadingSpinner from "../status/LoadingSpinner";
import { FileType } from "@/app/model/file/file.model";

export default function Details() {
    const book = useSelector(getCurrentBook);
    const file = useSelector(getCurrentFile);


    // 로딩 중일 때
    if (book == null) {
        return <LoadingSpinner />;
    }

    return (
        <div className="mx-auto my-10 w-[45rem]">
            <div className="relative mx-auto mb-8 h-auto w-1/2 content-center items-center justify-center bg-green-200">
                <Image
                    src={file === null ? `https://api.paranmanzang.com/api/files/${book.id}?type=${FileType.BOOK}` : `https://api.paranmanzang.com/api/files?path=${file.path}`}
                    alt={book.title}
                    layout="responsive"
                    width={300}
                    height={450}
                    objectFit="contain"
                />
            </div>
            <hr className="my-8" />
            <div className="mb-20 max-w-sm">
                <p className="my-2 text-lg font-medium">제목 | {book.title}</p>
                <p className="font-base my-2 text-lg">저자 | {book.author}</p>
                <p className="font-base my-2 text-lg">카테고리 | {book.categoryName || '카테고리 없음'}</p>
                <p className="font-base my-2 text-lg">좋아요 수 | {book.likeBookCount}</p>
            </div>
            <div className="mx-auto max-w-sm">
                <DetailButton thisPage={'/books'} displayBoard="none" displayReview="none" displayReservation="none" displayComment="none" />
            </div>
        </div>
    );
}
