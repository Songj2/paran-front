import { FileDeleteModel, FileModel } from "@/app/model/file/file.model";
import api from "../axios";
import qs from "qs";
import requests from "../requests";

export const fileAPI = {
    findAll(refIds: number[], type: string) {
        return api.get<FileModel[]>(`${requests.fetchFiles}/list`, {
            params: { type: type, refIds: refIds },
            paramsSerializer: (params: any) => qs.stringify(params, { arrayFormat: 'repeat' })
        });
    },
    modify(file: any[], type: string, refId: number) {
        return api.post<FileModel>(`${requests.fetchFiles}`, { FormData: { file: file, type: type, refId: refId } });
    },
    drop(fileModel: FileDeleteModel) {
        return api.delete<boolean>(`${requests.fetchFiles}`, { data: fileModel });
    }
}

