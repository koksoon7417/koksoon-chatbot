import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  getMessage,
  updateMessage,
} from '../../services';
import { StateType } from '../../types';

const initialState: StateType = {
  messages: []
};

export const getMessageAsync = createAsyncThunk(
  'message/getMessage',
  async () => {
    const response = await getMessage();

    return response;
  }
);

export const updateMessageAsync = createAsyncThunk(
  'message/updateMessage',
  async (message: string) => {
    const response = await updateMessage(message);

    return response;
  }
);

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        from: 1,
        content: action.payload,
        key: 'HumanMessage-' + Math.random().toString(36).slice(-5),
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessageAsync.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
      })
      .addCase(updateMessageAsync.fulfilled, (state, action) => {
        state.messages.push({
          from: 0,
          content: {
            type: 1,
            text: action.payload,
            cards: []
          },
          key: 'BotMessage-' + Math.random().toString(36).slice(-5)
        })
      });
  },
});

export const { addMessage } = messageSlice.actions;

export const selectMessage = (state: RootState) => state.message;

export default messageSlice.reducer;
