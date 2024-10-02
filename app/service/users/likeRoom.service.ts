import {AppDispatch} from "@/lib/store";
import {addLikedRoom, deleteLikedRoom, saveLikedRooms} from "@/lib/features/users/users.Slice";
import {saveError, saveLoading} from "@/lib/features/users/user.Slice";
import likeRoomAPI from "@/app/api/generate/likeRoom.api";
import {LikeRoomModel} from "@/app/model/user/users.model";

const insertLikeRoom = async (likeRoomModel: LikeRoomModel, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await likeRoomAPI.insert(likeRoomModel)
        if ('id' in response.data && 'nickname' in response.data) {
            dispatch(addLikedRoom(response.data))
        }
    } catch (error) {
        dispatch(saveError("좋아요 중 오류 발생했습니다."));
        console.error('Error adding likeRoom:', error);
    } finally {
        dispatch(saveLoading(false));
    }
};

// 좋아요 취소
const dropLikeRoom = async (likeRoomModel: LikeRoomModel, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await likeRoomAPI.drop(likeRoomModel)
        if (likeRoomModel.id !== undefined) {
            dispatch(deleteLikedRoom(likeRoomModel.id));
        }
    } catch (error) {
        dispatch(saveError("좋아요 취소 중 오류 발생했습니다."));
        console.error('Error adding likeRoom:', error);
    } finally {
        dispatch(saveLoading(false));
    }
};

// 좋아요 마이페이지 확인
const findLikeRoomList = async (nickname: String, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await likeRoomAPI.findLikeRoomList(nickname)
        dispatch(saveLikedRooms(response.data))
    } catch (error) {
        dispatch(saveError("찜한 공간을 찾는 중 오류 발생했습니다."));
        console.error('Error finding likeRoom:', error);
    } finally {
        dispatch(saveLoading(false));
    }
}

export const likeRoomService = {
    insertLikeRoom,
    dropLikeRoom,
    findLikeRoomList
};
