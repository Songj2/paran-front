import { initialUserState, AdminPostModel, DeclarationPostModel, FriendModel, LikePostModel, LikeRoomModel, CheckedNamesModel } from '@/app/model/user/users.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const usersSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        saveLikedRooms: (state, action: PayloadAction<LikeRoomModel[]>) => {
            state.likeRooms.push(...action.payload);
        },
        addLikedRoom: (state, action: PayloadAction<LikeRoomModel>) => {
            state.likeRooms.push(action.payload);
        },
        deleteLikedRoom: (state, action: PayloadAction<number>) => {
            state.likeRooms = state.likeRooms.filter(likeRoom => likeRoom.id !== action.payload);
        },
        saveLikedPosts: (state, action: PayloadAction<LikePostModel[]>) => {
            state.likePosts.push(...action.payload)
        },
        addLikedPost: (state, action: PayloadAction<LikePostModel>) => {
            state.likePosts.push(action.payload)
        },
        deleteLikedPost: (state, action: PayloadAction<number>) => {
            state.likePosts = state.likePosts.filter(likePost => likePost.id !== action.payload);
        },
        saveFriends: (state, action: PayloadAction<FriendModel[]>) => {
            state.friends.push(...action.payload)
        },
        addFriend: (state, action: PayloadAction<FriendModel>) => {
            state.friends.push(action.payload);
        },
        deleteFriend: (state, action: PayloadAction<number>) => {
            state.friends = state.friends.filter(friend => friend.id !== action.payload);
        },
        saveAdminPosts: (state, action: PayloadAction<AdminPostModel[]>) => {
            state.adminPosts.push(...action.payload);
        },
        addAdminPost: (state, action: PayloadAction<AdminPostModel>) => {
            state.adminPosts.push(action.payload);
        },
        updateAdminPost: (state, action: PayloadAction<AdminPostModel>) => {
            const index = state.adminPosts.findIndex(adminPost => adminPost.id === action.payload.id);
            if (index !== -1) {
                state.adminPosts[index] = action.payload;
            }
        },
        deleteAdminPost: (state, action: PayloadAction<number>) => {
            state.adminPosts = state.adminPosts.filter((adminPost: AdminPostModel) => adminPost.id !== action.payload);
        },
        saveDeclarationPosts: (state, action: PayloadAction<DeclarationPostModel[]>) => {
            state.declarationPosts.push(...action.payload);
        },
        addDeclarationPost: (state, action: PayloadAction<DeclarationPostModel>) => {
            state.declarationPosts.push(action.payload);
        },
        deleteDeclarationPost: (state, action: PayloadAction<number>) => {
            state.declarationPosts = state.declarationPosts.filter(declarationPost => declarationPost.id !== action.payload);
        },
        saveCheckedNames: (state, action: PayloadAction<CheckedNamesModel>) => {
            state.checkedNames = [action.payload];
        },
        deleteCheckedNames: (state, action: PayloadAction<CheckedNamesModel>) => {
            state.checkedNames = state.checkedNames.filter(
              (checkedName: CheckedNamesModel) => checkedName.nickname !== action.payload.nickname
            );
        },
    }
});

// 셀렉터 정의
export const getLikedRooms = (state: RootState) => state.users.likeRooms;
export const getLikedPosts = (state: RootState) => state.users.likePosts;
export const getFriends = (state: RootState) => state.users.friends;
export const getCheckedNames = (state: RootState) => state.users.checkedNames;
export const getAdminPosts = (state: RootState) => state.users.adminPosts;
export const getDeclarationPosts = (state: RootState) => state.users.declarationPosts;

export const {
    addLikedRoom,
    saveLikedRooms,
    deleteLikedRoom,
    addLikedPost,
    saveLikedPosts,
    deleteLikedPost,
    addFriend,
    deleteFriend,
    addAdminPost,
    updateAdminPost,
    deleteAdminPost,
    saveDeclarationPosts,
    addDeclarationPost,
    deleteDeclarationPost,
    saveAdminPosts,
    saveFriends,
    saveCheckedNames,
    deleteCheckedNames
} = usersSlice.actions;

export default usersSlice.reducer;