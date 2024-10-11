// groupTypes.ts

// 상태 인터페이스 정의
export interface GroupState {
    groups: GroupResponseModel[];
    groupMembers: {
        groupMembers: any;[groupId: number]: JoiningModel[]
    };
    groupPostsNotices: GroupPostResponseModel[];
    groupPostsGenerals: GroupPostResponseModel[];
    currentGroup: GroupResponseModel | null;
    currentGroupPost: GroupPostResponseModel | null;
    isLoading: boolean;
    error: string | null;
}

// 초기 상태
export const initialGroupState: GroupState = {
    groups: [],
    groupMembers: [],
    groupPostsNotices: [],
    groupPostsGenerals: [],
    currentGroup: null,
    currentGroupPost: null,
    isLoading: false,
    error: null,
};



export interface GroupModel {
    groupName: string;
    categoryName: string;
    nickname?: string;
}



export interface JoiningModel {
    nickname: string;
    enabled: boolean;
    groupId: number;
    requestAt: string;
    responseAt: string;
}



export interface GroupResponseModel {
    id: number;
    name: string;
    categoryName: string;
    createAt: string;
    enabled: boolean;
    detail: string;
    nickname: string;
    chatRoomId: string;
}

export interface GroupPostModel {
    boardId?: number;
    title: string;
    content: string;
    userGroupId: number;
    postCategory: string;
}

export interface GroupPostResponseModel {
    id: number;
    title: string;
    content: string;
    createAt: string;
    modifyAt?: string;
    postCategory: string;
    viewCount: number;
    nickname: string;
    groupId: number;
    groupName?: string;
    bookId?: number;
    bookTitle?: string;
}