"use client"
import { useSelector } from "react-redux";
import { getCurrentGroup, getGroupMembers } from "@/lib/features/group/group.slice";
import { useAppDispatch } from "@/lib/store";
import { useEffect } from "react";
import { groupService } from "@/app/service/group/group.service";
import DetailButton from "./DetailButton";
import LoadingSpinner from "../status/LoadingSpinner";

export default function GroupDetails() {
    const dispatch = useAppDispatch()
    const group = useSelector(getCurrentGroup)
    const users = useSelector(getGroupMembers)

    useEffect(() => {
        if (group?.id !== undefined) {
            groupService.findUserById(group.id, dispatch);
        }

    }, [group?.id]);

    console.log(group?.name);
    console.log(users.groupMembers);

    return (
        <div className="w-[45rem] mx-auto my-20">
            <div className="h-100 w-full justify-center bg-green-50 py-8 rounded-lg">
                <h1 className="text-3xl font-bold text-center">{group?.name || "그룹 이름"}</h1>
            </div>
            <hr className="my-8 "/>
            <div className="my-6">
                <div className="h-[70%] bg-green-50 p-8 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">소모임 정보:</h3>
                    {group ? (
                        <div>
                            <p>카테고리: {group.categoryName}</p>
                            <p>설명: {group.detail}</p>
                        </div>
                    ) : (
                        <LoadingSpinner />
                    )}
                </div>
                <div className="h-[70%] bg-green-50 rounded-lg p-8 overflow-y-auto my-6">
                    <h3 className="text-xl font-bold mb-4">참여 중인 유저:</h3>
                    {users.groupMembers && users.groupMembers.length > 0 ? (
                        <ul>
                            {users.groupMembers.map((user: any) => (
                                <li key={user.id} className="mb-4 p-2 bg-gray-300 rounded">
                                    <p className="font-bold">{user.nickname}</p>
                                    <p>이메일: {user.email}</p>
                                    <p>역할: {user.role}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>참여 중인 유저가 없습니다. 함께 참여해주세요 😆</p>
                    )}
                </div>
                <DetailButton thisPage={`/groups`} displayBoard="block" displayReview={'none'} displayReservation={'block'}/>
            </div>
        </div>
    )
}