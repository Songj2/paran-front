"use client"
import { useEffect, useState } from "react";
import { getCurrentGroup, getGroupPosts, saveCurrentGroupPost } from "@/lib/features/group/group.slice";
import { useAppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { groupPostService } from "@/app/service/group/groupPost.service";
import { UserModel } from "@/app/model/user.model";

interface GroupBoardProps {
    thisPage: string,
    userInfo : string | UserModel
}

export default function GroupBoard({thisPage, userInfo}: GroupBoardProps ) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { groupPostsNotice, groupPostsGeneral } = useSelector(getGroupPosts);
    const groupId = thisPage
    const page = 5 // 임의 값
    const size = 5 // 임의 값
    const [selectedCategory, setSelectedCategory] = useState<'공지 사항' | '자유게시판'>('공지 사항');
    const user = userInfo


    useEffect(() => {
        if (!groupId) {
            return;
        }
        groupPostService.findByGroupId(Number(groupId), page, size, selectedCategory, dispatch)
    }, [dispatch, groupId, selectedCategory]);

    const postsToShow = selectedCategory === "공지 사항" ? groupPostsNotice : groupPostsGeneral;

    const onClickToDetail = (currentId: number | undefined) => {
        if (currentId !== undefined) {
            const selectedPost = postsToShow.find(({ id }) => id === currentId);
            if (selectedPost) {
                dispatch(saveCurrentGroupPost(selectedPost)); // 선택한 게시물 저장

                groupPostService.modifyViewCount(currentId, dispatch)
                    .finally(() => {
                        router.push(`/groups/board/${currentId}`);
                    });
            }
        }
    };


    return (
        <div className="mx-auto my-8 max-w-sm bg-green-100 p-4">
            {/* 카테고리 선택 탭 */}

            <div className="mb-4 flex justify-around">
                <button
                    className={`p-2 ${selectedCategory === '공지 사항' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSelectedCategory('공지 사항')}
                >
                    공지 사항
                </button>
                <button
                    className={`p-2 ${selectedCategory === '자유게시판' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSelectedCategory('자유게시판')}
                >
                    자유게시판
                </button>
            </div>


            {/* 게시물 목록 */}
            <ul>
                {postsToShow.length > 0 ? (
                    postsToShow.map((post, index) => (
                        <li key={index} className="m-2 bg-white p-6" onClick={() => onClickToDetail(post.id)}>
                            <p className="text-lg font-bold">{post.title}</p>
                            <p className="text-lg font-bold">{post.nickname}</p>
                            <p className="text-lg font-bold">{post.createAt}</p>
                            <p className="text-lg font-bold">{post.viewCount}</p>
                        </li>
                    ))
                ) : (
                    <li>게시물이 없습니다.</li>
                )}
            </ul>
            <div>
            <button type="button" onClick={() => {router.back()}} className="mx-2 rounded-full border px-3 py-2">
                    뒤로가기
                </button>
            </div>
        </div>
    );
}
