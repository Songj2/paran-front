import { AdminPostModel, DeclarationPostModel } from "@/app/model/user/users.model";
import { AppDispatch } from "@/lib/store";
import { saveError, saveLoading } from "@/lib/features/users/user.slice";
import { declarationPostAPI } from "@/app/api/generate/declarationPost.api";
import { addDeclarationPost, deleteDeclarationPost, saveDeclarationPosts, } from "@/lib/features/users/users.slice";


//게시물 추가
const insert = async (declarationPostModel: DeclarationPostModel, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await declarationPostAPI.insert(declarationPostModel)
        if ('id' in response.data && 'name' in response.data) {
            dispatch(addDeclarationPost(response.data))
        }
    } catch (error: any) {
        dispatch(saveError("게시글 등록 중 오류 발생했습니다."));
        console.error('Error adding post:', error.response?.data || error.message);
        throw new Error('게시글 등록 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};

//게시글 삭제
const drop = async (id: number, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true)); // 로딩 시작
        const response = await declarationPostAPI.drop(id);
        // 응답 상태가 성공적인 경우만 디스패치
        if (response.status === 200) {
            dispatch(deleteDeclarationPost(id)); // id만 전달
        } else {
            throw new Error('게시글 삭제 실패');
        }
    } catch (error: any) {
        dispatch(saveError("게시글 삭제 중 오류 발생했습니다."));
        console.error('Error deleting post:', error.response?.data || error.message);
        throw new Error('게시글 삭제 중 오류 발생');
    } finally {
        dispatch(saveLoading(false)); // 로딩 종료
    }
};
//게시물 리스트 조회
const findAll = async (page: number, size: number, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await declarationPostAPI.findDeclarationPost(page, size)
        if (Array.isArray(response.data)) {
            dispatch(saveDeclarationPosts(response.data))
        }
    } catch (error: any) {
        dispatch(saveError("게시물 목록 조회 중 오류 발생했습니다."));
        console.error('Error fetching Aposts :', error.response?.data || error.message);
        throw new Error('게시물 목록 조회 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};
//게시물 리스트 조회 (닉네임)
const findAllByNickname = async (page: number, size: number, nickname: string, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await declarationPostAPI.findDeclarationPostByNickname(page, size, nickname)
        if (Array.isArray(response.data)) {
            dispatch(saveDeclarationPosts(response.data))
        }
    } catch (error: any) {
        dispatch(saveError("게시물 목록 조회 중 오류 발생했습니다."));
        console.error('Error fetching Dposts by nickname:', error.response?.data || error.message);
        throw new Error('게시물 목록 조회 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};
//게시물 상세조회
const findByPostId = async (id: number, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await declarationPostAPI.findDeclarationPostDetail(id)
        if (Array.isArray(response.data)) {
            dispatch(saveDeclarationPosts(response.data))
        }
    } catch (error: any) {
        dispatch(saveError("게시물 조회 중 오류 발생했습니다."));
        console.error('Error fetching viewCount:', error.response?.data || error.message);
        throw new Error('게시물 조회 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};

export const declarationService = {
    insert,
    drop,
    findAll,
    findAllByNickname,
    findByPostId
}