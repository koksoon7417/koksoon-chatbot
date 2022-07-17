import messageReducer, {
  addMessage,
} from './messageSlice';
import { StateType } from '../../types';

describe('message reducer', () => {
  const initialState: StateType = {
    messages: []
  };

  it('should handle initial state', () => {
    const initActual = messageReducer(undefined, { type: 'unknown' });
    expect(initActual).toEqual(initialState);
  });

  it('should handle add new message', () => {
    const actual = messageReducer(initialState, addMessage("Hello"));
    expect(actual.messages.length).toEqual(1);

    const actual2 = messageReducer(actual, addMessage("Thank you"));
    expect(actual2.messages.length).toEqual(2);
  });
});
