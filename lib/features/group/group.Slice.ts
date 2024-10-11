// groupSlice.ts

import {
  GroupPostResponseModel,
  GroupResponseModel,
  initialGroupState,
  JoiningModel,
} from '@/app/model/group/group.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';


const groupSlice = createSlice({
  name: 'group',
  initialState: initialGroupState,
  reducers: {
    saveGroups: (state, action: PayloadAction<GroupResponseModel[]>) => {
      state.groups = action.payload;
    },
    saveGroupMembers: (state, action: PayloadAction<JoiningModel[]>) => {
      if (action.payload.length > 0) {
        const groupId = action.payload[0].groupId;
        state.groupMembers[groupId] = action.payload;
      }
    },
    addGroup: (state, action: PayloadAction<GroupResponseModel>) => {
      state.groups.push(action.payload);
    },
    addGroupMember: (state, action: PayloadAction<JoiningModel>) => {
      const { groupId } = action.payload;
      if (!state.groupMembers[groupId]) {
        state.groupMembers[groupId] = [];
      }
      state.groupMembers[groupId].push(action.payload);
    },
    updateGroup: (state, action: PayloadAction<GroupResponseModel>) => {
      const index = state.groups.findIndex(group => group.id === action.payload.id);
      if (index !== -1) {
        state.groups[index] = action.payload;
      }
    },
    deleteGroup: (state, action: PayloadAction<number>) => {
      state.groups = state.groups.filter(group => group.id !== action.payload);
    },
    deleteGroupMember: (state, action: PayloadAction<{ groupId: number; nickname: string }>) => {
      const { groupId, nickname } = action.payload;
      if (state.groupMembers[groupId]) {
        state.groupMembers[groupId] = state.groupMembers[groupId].filter(user => user.nickname !== nickname);
      }
    },
    saveCurrentGroup: (state, action: PayloadAction<GroupResponseModel | null>) => {
      state.currentGroup = action.payload;
    },
    saveGroupPosts: (state, action: PayloadAction<GroupPostResponseModel[]>) => {
      state.groupPostsNotices = action.payload.filter(post => post.postCategory === '공지 사항');
      state.groupPostsGenerals = action.payload.filter(post => post.postCategory !== '공지 사항');
    },
    addGroupPost: (state, action: PayloadAction<GroupPostResponseModel>) => {
      switch (action.payload.postCategory) {
        case '공지 사항':
          state.groupPostsNotices.push(action.payload);
          break;
        case '자유 게시판':
          state.groupPostsGenerals.push(action.payload);
          break;
      }
    },
    updateGroupPost: (state, action: PayloadAction<GroupPostResponseModel>) => {

      const { id, postCategory } = action.payload;
      const updatePostList = (posts: GroupPostResponseModel[]) => {
        const index = posts.findIndex(post => post.id === id);
        if (index !== -1) {
          posts[index] = action.payload;
        }
      };

      switch (postCategory) {
        case '공지 사항':
          updatePostList(state.groupPostsNotices);
          break;
        case '자유 게시판':
          updatePostList(state.groupPostsGenerals);
          break;
      }
    },
    deleteGroupPost: (state, action: PayloadAction<{ id: number; postCategory: string }>) => {
      const { id, postCategory } = action.payload;
      switch (postCategory) {
          case '공지 사항':
              state.groupPostsNotices = state.groupPostsNotices.filter(post => post.id !== id);
              break;
          case '자유 게시판':
              state.groupPostsGenerals = state.groupPostsGenerals.filter(post => post.id !== id);
              break;
      }
    },
    saveCurrentGroupPost: (state, action: PayloadAction<GroupPostResponseModel | null>) => {
      state.currentGroupPost = action.payload;
    },
    saveLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    saveError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});
export const getGroupPosts = (state: RootState) => ({
  groupPostsNotice: state.group.groupPostsNotices,
  groupPostsGeneral: state.group.groupPostsGenerals,
});
export const getGroups = (state: RootState) => state.group.groups;
export const getGroupMembers = (state: RootState) => state.group.groupMembers;
export const getCurrentGroup = (state: RootState) => state.group.currentGroup;
export const getCurrentGroupPost = (state: RootState) => state.group.currentGroupPost;
export const getIsLoading = (state: RootState) => state.group.isLoading;
export const getError = (state: RootState) => state.group.error

export const {
  saveGroups,
  saveGroupMembers,
  addGroupMember,
  deleteGroupMember,
  addGroup,
  updateGroup,
  deleteGroup,
  saveGroupPosts,
  addGroupPost,
  updateGroupPost,
  deleteGroupPost,
  saveCurrentGroup,
  saveCurrentGroupPost,
  saveLoading,
  saveError,
} = groupSlice.actions;

export default groupSlice.reducer;