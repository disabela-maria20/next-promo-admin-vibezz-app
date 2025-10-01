'use client';
export const login = (token: string, user: any) => ({
  type: 'LOGIN',
  payload: { token, user },
});

export const logout = () => ({
  type: 'LOGOUT',
});
