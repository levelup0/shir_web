/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect } from 'react';
import { CommonContext } from './context';
import { requestGet } from './requests';
import { GETUSER } from './urls';
import { getToken, removeToken, store_albi_userauth_bool } from './function';
import { useRouter } from 'next/navigation';

export default function CommonContextComponent({ children }: any) {
    const router = useRouter();
    const [userAuth, setUserAuth] = React.useState<boolean>(false);
    const [currentUser, setCurrentUser] = React.useState<object>({});
    const [getUserAgain, setGetUserAgain] = React.useState<number>();

    const [firtTime, setFirstime] = React.useState<boolean>(false);

    const getCurrentUser = async () => {
        const accessToken = await getToken();
        if (
            typeof accessToken == 'undefined' ||
            accessToken == '' ||
            accessToken == null
        ) {
            await removeToken();
            await store_albi_userauth_bool('false');
            setCurrentUser({});
            setUserAuth(false);
        }
        const form = new FormData();
        const response = await requestGet(GETUSER, form);
        if (response?.success == true) {
            setCurrentUser(response?.user);
            localStorage.setItem(
                'voz_userhashback',
                response?.user?.profile?.channel_hash,
            );
            // checkUserProfile(response?.user);
        } else if (response?.message == 'Unauthenticated.') {
            await removeToken();
            await store_albi_userauth_bool('false');
            setCurrentUser({});
            setUserAuth(false);
        }
    };

    const checkUserProfile = async (user: any) => {
        if (user.hasOwnProperty('profile') == false) {
            router.push('/profile-add');
        }

        if (user.hasOwnProperty('profile') == true) {
            if (user?.profile == null || typeof user?.profile == 'undefined') {
                router.push('/profile-add');
            }
        }
    };

    useEffect(() => {
        if (userAuth == true) {
            getCurrentUser();
        }
    }, [userAuth, getUserAgain]);

    useEffect(() => {
        if (firtTime == true) {
            if (userAuth === false) {
                localStorage.setItem('voz_userauth_bool', 'false');
                setUserAuth(false);
            }

            if (userAuth === true) {
                localStorage.setItem('voz_userauth_bool', 'true');
                setUserAuth(true);
            }
        }
    }, [userAuth]);

    useEffect(() => {
        const _userAuth = localStorage.getItem('voz_userauth_bool');

        if (_userAuth === 'false') {
            localStorage.setItem('voz_userauth_bool', 'false');
            setUserAuth(false);
        }

        if (_userAuth === 'true') {
            localStorage.setItem('voz_userauth_bool', 'true');
            setUserAuth(true);
        }

        setFirstime(true);
    }, []);

    return (
        <div>
            <CommonContext.Provider
                value={{
                    userAuth,
                    setUserAuth,
                    currentUser,
                    setCurrentUser,
                    getUserAgain,
                    setGetUserAgain,
                    // languages,
                    // dictionary,
                    // selectedLanguage,
                    // setSelectedLanguage,
                    // loader,
                    // setLoader,
                    // modalComplaintsAndSuggestions,
                    // setModalComplaintsAndSuggestions,
                    // modalComplaintsAndSuggestionsData,
                    // setModalComplaintsAndSuggestionsData,

                    // modalConsultantTarifs,
                    // setModalConsultantTarifs,

                    // modalConsultantTarifsData,
                    // setModalConsultantTarifsData,
                }}
            >
                {children}
            </CommonContext.Provider>
        </div>
    );
}
