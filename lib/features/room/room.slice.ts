import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialRoomState, RoomModel } from '../../../app/model/room/room.model';
import { RootState } from '../../store';

export const roomSlice = createSlice({
    name: 'room',
    initialState: initialRoomState,
    reducers: {
        saveRooms: (state, action: PayloadAction<RoomModel[]>) => {
            action.payload.forEach(newRoom => {
                if (!state.rooms.some(room => room.id === newRoom.id)) {
                    state.rooms.push(newRoom);
                }
            });
        },
        saveCurrentRoom: (state, action: PayloadAction<RoomModel | null>) => {
            state.currentRoom = action.payload;
        },
        saveLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        saveError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        addRoom: (state, action: PayloadAction<RoomModel>) => {
            state.rooms.push(action.payload)
        },
        updateRoom: (state, action: PayloadAction<RoomModel>) => {
            const index = state.rooms.findIndex(room => room.id === action.payload.id)
            if (index !== -1) {
                state.rooms[index] = action.payload;
            }
        },
        removeRoom: (state, action: PayloadAction<number>) => {
            state.rooms.filter(room => room.id !== action.payload)
        }
    },
});

// Selector 함수들
export const getRooms = (state: RootState) => state.room.rooms;
export const getCurrentRoom = (state: RootState) => state.room.currentRoom;
export const getIsLoading = (state: RootState) => state.room.isLoading;
export const getError = (state: RootState) => state.room.error;

// 액션 생성자들을 export
export const {
    saveRooms,
    saveCurrentRoom,
    saveLoading,
    saveError,
    addRoom,
    updateRoom,
    removeRoom,
} = roomSlice.actions;

// 리듀서를 export
export default roomSlice.reducer;