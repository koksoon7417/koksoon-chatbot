import { Server } from './_server';
import { StateType } from '../types';

export function getMessage() {
  return Server.request<StateType>({
    method: 'get',
    url: '/.netlify/functions/getMessage',
  });
}

export function updateMessage(message: string) {
  return Server.request<string>({
    method: 'post',
    url: '/.netlify/functions/updateMessage',
    data: {
      message
    }
  });
}
