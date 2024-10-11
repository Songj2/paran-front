"use client"
import { useSelector } from "react-redux";
import GroupBoard from "@/app/components/common/GroupBoard";
import { getCurrentUser } from "@/lib/features/users/user.slice";

interface GroupBoardIdProps {
    id: string;
}

export default function GroupBoardId({ id }: GroupBoardIdProps) {
    const member = useSelector(getCurrentUser);
    const userInfo = member?.id ?? ""

    return (
        <div>
            {/* {userInfo && group에 참여중인 사람만 보일 수 있도록 한다. */}
            <GroupBoard thisPage={id} userInfo={userInfo} />
        </div>
    )
}