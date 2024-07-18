import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from './User';

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

export const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state, { user }) => ({ ...state, user, isAuthenticated: true })),
    on(AuthActions.logout, (state) => ({ ...state, user: null, isAuthenticated: false })),
    on(AuthActions.setUser, (state, { user }) => ({ ...state, user })),
);
