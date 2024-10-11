import { fileAPI } from '@/app/api/generate/file.api';
import { FileDeleteModel, FileType } from '@/app/model/file/file.model';
import { addFile, removeFile, saveFiles, upLoading } from '@/lib/features/file/file.slice';
import { AppDispatch } from '@/lib/store';

// 파일 리스트 조회
const selectFileList = async (refIds: number[], type: string, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(upLoading(true))
        const response = await fileAPI.findAll(refIds, type);
        dispatch(saveFiles(response.data))
    } catch (error) {
        console.error('Error select files:', error);
        throw new Error('이미지 조회 중 오류 발생');
    }
};

// 파일 올리기
const uploadFile = async (file: any[], type: string, refId: number, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(upLoading(true))
        const response = await fileAPI.modify(file, type, refId)
        dispatch(addFile(response.data))
    } catch (error) {
        console.error('Error load file:', error);
        throw new Error('이미지 불러오기 중 오류 발생');
    }
};

// 파일 삭제
const deleteFile = async (fileDeleteModel: FileDeleteModel, type: FileType, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(upLoading(true))
        const response = await fileAPI.drop(fileDeleteModel)
        dispatch(removeFile({ path: fileDeleteModel.path, type }));
    } catch (error) {
        console.error('Error load file:', error);
        throw new Error('이미지 불러오기 중 오류 발생');
    }
};

export const fileService = {
    selectFileList, uploadFile, deleteFile
}