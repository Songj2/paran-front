import api from '../axios';
import requests from "@/app/api/requests";
import { LikePostModel } from "@/app/model/user/users.model";
import { ExceptionResponseModel } from "@/app/model/error.model";

export const likePostAPI = {
    insert: (likePostModel: LikePostModel) => {
        return api.post<LikePostModel | ExceptionResponseModel>(requests.fetchUsers + `/likeposts/add`, likePostModel);
    },
    drop: (likePostModel: LikePostModel) => {
        return api.delete<boolean | ExceptionResponseModel>(requests.fetchUsers + `/likeposts/remove`, {
            data: likePostModel
        });
    },
    findLikePostList: (nickname: string) => {
        return api.get<LikePostModel[]>(requests.fetchUsers + `/likeposts/list/${nickname}`);
    }
}

export default likePostAPI;