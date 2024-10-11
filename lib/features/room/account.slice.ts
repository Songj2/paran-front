import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialAccountState, AccountResultModel, AccountCancelModel } from '../../../app/model/room/account.model'
import { RootState } from '@/lib/store';

const accountSlice = createSlice({
  name: 'account',
  initialState: initialAccountState,
  reducers: {
    saveAccountResults: (state, action: PayloadAction<AccountResultModel[]>) => {
      state.accountResults = action.payload;
    },
    addAccountResult: (state, action: PayloadAction<AccountResultModel>) => {
      state.accountResults.push(action.payload);
    },
    saveCurrentAccountResult: (state, action: PayloadAction<AccountResultModel | null>) => {
      state.currentAccountResult = action.payload;
    },
    saveAccountCancels: (state, action: PayloadAction<AccountCancelModel[]>) => {
      state.accountCancels = action.payload;
    },
    addAccountCancel: (state, action: PayloadAction<AccountCancelModel>) => {
      state.accountCancels.push(action.payload);
    },
    saveCurrentAccountCancel: (state, action: PayloadAction<AccountCancelModel | null>) => {
      state.currentAccountCancel = action.payload;
    },
    saveLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    saveError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Selector 함수들
export const getAccountResults = (state: RootState) => state.account.accountResults;
export const getCurrentAccountResult = (state: RootState) => state.account.currentAccountResult;
export const getAccountCancels = (state: RootState) => state.account.accountCancels;
export const getCurrentAccountCancel = (state: RootState) => state.account.currentAccountCancel;
export const getIsLoading = (state: RootState) => state.account.isLoading;
export const getError = (state: RootState) => state.account.error;

// 액션 생성자들을 export
export const {
  saveAccountResults,
  addAccountResult,
  saveCurrentAccountResult,
  saveAccountCancels,
  addAccountCancel,
  saveCurrentAccountCancel,
  saveLoading,
  saveError,
} = accountSlice.actions;

// 리듀서를 export
export default accountSlice.reducer;