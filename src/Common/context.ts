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
    // languages: Array<Language>;
    // dictionary: any;
    // selectedLanguage: any;
    // setSelectedLanguage: any;
    // setLoader: any;
    // loader: any;
    // modalComplaintsAndSuggestions: any;
    // setModalComplaintsAndSuggestions: any;

    // modalComplaintsAndSuggestionsData: any;
    // setModalComplaintsAndSuggestionsData: any;

    // modalConsultantTarifs: any;
    // setModalConsultantTarifs: any;

    // modalConsultantTarifsData: any;
    // setModalConsultantTarifsData: any;
}

export const CommonContext = createContext<CommonContextProps>({
    userAuth: false,
    setUserAuth: () => {},
    currentUser: {},
    setCurrentUser: () => {},
    getUserAgain: {},
    setGetUserAgain: () => {},
    // // languages: [],
    // // dictionary: [],
    // // selectedLanguage: {},
    // // setSelectedLanguage: () => {},
    // // setLoader: () => {},
    // // loader: false,
    // modalComplaintsAndSuggestions: false,
    // setModalComplaintsAndSuggestions: () => {},
    // modalComplaintsAndSuggestionsData: {},
    // setModalComplaintsAndSuggestionsData: () => {},

    // modalConsultantTarifs: {},
    // setModalConsultantTarifs: () => {},

    // modalConsultantTarifsData: {},
    // setModalConsultantTarifsData: () => {},
});

// export const darkModeContext = createContext<darkModeContextProps>({
//     darkMode: false,
//     setDarkMode: () => {},
// });

// export const windowModeContext = createContext<windowModeContextProps>({
//     windowMode: false,
//     setWindowMode: () => {},
// });
