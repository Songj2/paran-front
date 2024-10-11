import { AppDispatch } from "@/lib/store";
import { saveBooks, saveError, saveLoading, saveTotalPage } from "@/lib/features/group/book.slice";
import bookAPI from "@/app/api/generate/book.api";
import { fileService } from "../file/file.service";
import { FileType } from "@/app/model/file/file.model";




const findList = async (page: number, size: number, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await bookAPI.findList(page, size);
        const bookIds = response.data.content.map(book => book.id);
        fileService.selectFileList(bookIds, FileType.BOOK, dispatch);
        dispatch(saveBooks(response.data.content));
        dispatch(saveTotalPage(response.data.totalPages))
    } catch (error) {
        dispatch(saveError("도서 조회 중 오류 발생했습니다."));
        console.error('Error fetching bookList:', error);
    } finally {
        dispatch(saveLoading(false));
    }
};

export const bookService = {
    findList
};