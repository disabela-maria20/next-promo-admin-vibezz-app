'use client';

import router from 'next/router';

interface User {
  id: number;
  name: string;
  email: string;
  permissions: string[];
}

interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token:
    typeof window !== 'undefined' ? localStorage.getItem('authToken') : null,
  user:
    typeof window !== 'undefined' && localStorage.getItem('authUser')
      ? JSON.parse(localStorage.getItem('authUser')!)
      : null,
};

type Action =
  | { type: 'LOGIN'; payload: { token: string; user: User } }
  | { type: 'LOGOUT' };

const authReducer = (state = initialState, action: Action): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('authUser', JSON.stringify(action.payload.user));
      return { token: action.payload.token, user: action.payload.user };
    case 'LOGOUT':
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      return { token: null, user: null };
    default:
      return state;
  }
};

export default authReducer;
