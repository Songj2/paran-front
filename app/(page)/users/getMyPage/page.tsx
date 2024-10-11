"use client"; 

import UserProfile from "@/app/components/user/UserProfile";
import { useSelector } from "react-redux";
import ErrorMessage from "@/app/components/common/status/ErrorMessage";
import { getCurrentUser } from "@/lib/features/users/user.slice";

export default function GetMyPage() {
    const currentUser = useSelector(getCurrentUser);
    if (!currentUser || !currentUser.nickname) {
        return <ErrorMessage message={'사용자 정보가 없습니다.'} />;
    }

    return (
        <div>
            <UserProfile getUser={currentUser.nickname} />
        </div>
    );
}