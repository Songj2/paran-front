import {ExceptionResponseModel} from "@/app/model/error.model";
import requests from "@/app/api/requests";
import api from "@/app/api/axios";
import {BookResponseModel, LikeBookModel} from "@/app/model/group/book.model";

import {
    GroupModel,
    GroupPostModel,
    GroupPostResponseModel,
    GroupResponseModel,
    JoiningModel,
} from "@/app/model/group/group.model";


export const groupApi = {
    findList(page: number, size: number) {
        return api.get<Page<GroupResponseModel>>(requests.fetchGroups + '/groups', {params: {page, size}});
    },
    findByNickname(nickname: string, page: number, size: number) {
        return api.get<Page<GroupResponseModel>>(requests.fetchGroups + '/groups/my-groups', {
            params: {
                nickname,
                page,
                size
            }
        });
    },
    insert(groupModel: GroupModel) {
        return api.post<GroupResponseModel | ExceptionResponseModel>(requests.fetchGroups + '/groups', groupModel);
    },
    able(groupId: number) {
        return api.put<GroupResponseModel | ExceptionResponseModel>(requests.fetchGroups + '/groups/able', {params: {groupId}});
    },
    enable(groupId: number) {
        return api.put<Boolean | ExceptionResponseModel>(requests.fetchGroups + '/groups/enable', {params: {groupId}});
    },
    enableUser(groupId: number, nickname: string) {
        return api.put<GroupResponseModel | ExceptionResponseModel>(requests.fetchGroups + '/groups/enable-user', {
            params: {
                groupId,
                nickname
            }
        });
    },
    findUserById(groupId: number) {
        return api.get<JoiningModel[]>(requests.fetchGroups + `/groups/users/${groupId}`);
    },
    modifyChatRoomId(roomId: number, groupId: number) {
        return api.put<GroupResponseModel | ExceptionResponseModel>(requests.fetchGroups + `/groups/chat-room/${groupId}`, {roomId});
    },
    insertUser(joiningModel: JoiningModel) {
        return api.post<JoiningModel | ExceptionResponseModel>(requests.fetchGroups + '/groups/user', joiningModel);
    },
    ableUser(groupId: number, nickname: string) {
        return api.put<JoiningModel | ExceptionResponseModel>(requests.fetchGroups + '/groups/able-user', {
            params: {
                groupId,
                nickname
            }
        });
    },
    drop(groupId: number) {
        return api.delete<Boolean | ExceptionResponseModel>(requests.fetchGroups + `/groups/${groupId}`);
    },
    enableList(page: number, size: number) {
        return api.get<Page<GroupResponseModel>>(`${requests.fetchGroups}/groups/enable-list`, {
            params: {
                page,
                size
            }
        });
    },
    
    dropUser(nickname: string, groupId: number) {
        return api.delete<Boolean>(`${requests.fetchGroups}/users/${groupId}`, {
            params: { nickname }
        });
    }
}

export default groupApi;