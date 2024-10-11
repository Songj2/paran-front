// components/DetailButton.tsx
"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BookingModal from "../BookingModal";
import Alert from "../Alert";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/store";
import { getCurrentBook, getIsBookLiked } from "@/lib/features/group/book.slice";
import { getCurrentRoom } from "@/lib/features/room/room.slice";
import { getCurrentGroup, getCurrentGroupPost } from "@/lib/features/group/group.slice";
import { saveGlobalLoading } from "@/lib/features/error.slice";
import { LikeBookModel } from "@/app/model/group/book.model";
import { likeBookService } from "@/app/service/group/likeBook.service";
import { getCurrentUser } from "@/lib/features/users/user.slice";
import { LikeRoomModel } from "@/app/model/user/users.model";
import { likeRoomService } from "@/app/service/users/likeRoom.service";

interface DetailButtonProps {
    thisPage: string;
    displayReview: 'none' | 'block';
    displayBoard: 'none' | 'block';
    displayReservation: 'none' | 'block';
}

export default function DetailButton({ thisPage, displayReview, displayBoard,displayReservation }: DetailButtonProps) {
    //const nickname = 'A'; // 임의로 넣어둠
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    
    const route = useRouter()
    const dispatch = useAppDispatch()
    const book = useSelector(getCurrentBook)
    const isBookLiked = useSelector(state => book ? getIsBookLiked(state, book.id) : false)
    const room = useSelector(getCurrentRoom)
    const group = useSelector(getCurrentGroup)
    const user = useSelector(getCurrentUser)
    const userInfo = user?.role ?? null

    useEffect(() => {
        if (!user || !dispatch) return;
    
        dispatch(saveGlobalLoading(true));
        
        let insertPromise;
    
        switch (thisPage) {
            case "/books": {
                if (!book?.id) return;
                const likeBookModel: LikeBookModel = {
                    bookId: Number(book.id),
                    nickname: user.nickname ?? ""
                };
                insertPromise = likeBookService.insert(likeBookModel, dispatch);
                break;
            }
            case "/groupPost":
            case "/rooms":{
                const id = thisPage === "/rooms" ? room?.id : group?.id;
                if (!id) return;
                const likeRoomModel: LikeRoomModel = {
                    roomId: Number(id),
                    nickname: user.nickname ?? ""
                };
                insertPromise = likeRoomService.insert(likeRoomModel, dispatch);
                break;
            }
            default:
                return;
        }
    
        insertPromise?.finally(() => {
            dispatch(saveGlobalLoading(false));
        });
    
    }, [thisPage, book, room, group, user, dispatch]);

    const handleReview = () => {
        route.push(`${thisPage}/review`)
    }
    const handleAlertClose = () => {
        setIsAlertOpen(false);
        setIsConfirmOpen(true);
    };
    const Message = () => {
        setAlertMessage('이미 찜 상품에 있습니다.');
        setIsAlertOpen(true);
    }
    const LikeThis = () => {
        dispatch(saveGlobalLoading(false)); // 항상 로딩 종료
        setAlertMessage('찜 했습니다.');
        setIsAlertOpen(true);
    }
    const JoinGroups = () => {
        setAlertMessage('이 소모임에 참여하시겠습니까? ');
        setIsAlertOpen(true);
    }
    const handleConfirm = () => {
        setIsConfirmOpen(false);
        route.push('/likeList');
    }

    return (
        <>
            {userInfo === 'ROLE_admin' && (
                <div className="max-w-sm mx-auto">
                    <button type="button" onClick={() => {route.push('/admin/update')}} className="p-3 bg-green-500 text-white">수정</button>
                    <button type="button" onClick={() => {route.push('/admin/delete')}} className="p-3 bg-green-500 text-white">삭제</button>
                </div>
            )}
            <div className="flex justify-center items-end">
                {isBookLiked ? (
                    <button type="button" onClick={Message} className="mx-2 rounded-full border px-3 py-2">
                        이미 찜 목록에 있습니다
                    </button>
                ) : (
                    <button type="button" onClick={LikeThis} className="mx-2 rounded-full border px-3 py-2">
                        🥰 찜하기 🥰
                    </button>
                )}
                 {/* 리뷰는 유저의 예약일이 접속일보다 과거면 버튼 띄우기 -> 해당 유저가 진짜 그 장소를 컨텍했는지에 따라 버튼 유무 결정할 것 */}
                <button type="button" onClick={handleReview} className="mx-2 rounded-full border px-3 py-2"
                    style={{ display: displayReview }}
                >
                    리뷰보기
                </button>
                <button type="button" onClick={() => setIsModalOpen(true)} className="mx-2 rounded-full border px-3 py-2"
                    style={{ display: displayReview }}
                >
                    예약하기
                </button>
                <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} id={3} />

                <button type="button" onClick={JoinGroups} className="mx-2 rounded-full border px-3 py-2"
                    style={{ display: displayReservation }}
                >
                    참여하기
                </button>
                <button type="button" onClick={() => {route.push(`/groups/board/${group?.id}`)}} className="mx-2 rounded-full border px-3 py-2"
                    style={{ display: displayBoard }}
                    >
                    모임 공지가기
                </button>

                <button type="button" onClick={() => {route.back()}} className="mx-2 rounded-full border px-3 py-2">
                    뒤로가기
                </button>
            </div>

            <Alert
                message={alertMessage}
                isOpen={isAlertOpen}
                onClose={handleAlertClose}
            />

            <Alert
                message="목록으로 이동하시겠습니까?"
                isOpen={isConfirmOpen}
                onClose={() => { setIsConfirmOpen(false) }}
                onConfirm={handleConfirm}
                showConfirm={true}
            />
        </>
    )
}