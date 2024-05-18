'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

export interface CommonContextProps {
    userAuth: boolean;
    setUserAuth: any;
    currentUser: any;
    setCurrentUser: any;
    getUserAgain: any;
    setGetUserAgain: any;
}

export const CommonContext = createContext<CommonContextProps>({
    userAuth: false,
    setUserAuth: () => {},
    currentUser: {},
    setCurrentUser: () => {},
    getUserAgain: {},
    setGetUserAgain: () => {},
});
