"use client"
import {useState} from "react";
import {useRouter} from "next/navigation";
import ComLikeList from "@/app/components/user/ComLikeList";
import Link from "next/link";

type TabType = "그룹" | "도서" | "장소";

export default function LikeList() {
    const [activeTab, setActiveTab] = useState<TabType>("그룹");
    const router = useRouter();

    const goBack = () => router.back();

    const renderContent = () => {
        switch (activeTab) {
            case "그룹":
                return (
                    <>
                        <ComLikeList type="그룹"/>
                        <ComLikeList type="도서"/>
                        <ComLikeList type="장소"/>
                    </>
                );
            case "도서":
                return <ComLikeList type="도서"/>;
            case "장소":
                return <ComLikeList type="장소"/>;
            default:
                return null;
        }
    };

    return (
        <div className="max-w-lg p-6 my-8 mx-auto bg-green-100">
            <div className="mb-4">
                <ul className="flex border-b">
                    {["그룹", "도서" ,"장소"].map((tab) => (
                        <li key={tab} className="-mb-px mr-1">
                            <Link
                                href="#"
                                className={`inline-block py-2 px-4 text-sm font-semibold ${
                                    activeTab === tab
                                        ? "text-green-600 border-l border-t border-r rounded-t"
                                        : "text-green-500 hover:text-green-800"
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab(tab as TabType);
                                }}
                            >
                                {tab}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {renderContent()}

            <button
                type="button"
                onClick={goBack}
                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                뒤로가기
            </button>
        </div>
    )
}