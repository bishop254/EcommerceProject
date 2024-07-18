import { createAction, props } from '@ngrx/store';
import { User } from './User';

export const login = createAction('[Auth] Login', props<{ user: User }>());
export const logout = createAction('[Auth] Logout');
export const setUser = createAction('[Auth] Set User', props<{ user: User }>());
