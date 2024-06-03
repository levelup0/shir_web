/* eslint-disable @typescript-eslint/no-explicit-any */

import { getToken } from './function';

export const requestGetWithoutToken = async (url: string, params = {}) => {
    try {
        const headers = {
            Accept: 'application/json',
        };
        const response = fetch(
            `${
                process.env.NEXT_PUBLIC_API_URL
            }api/v1/${url}?${new URLSearchParams(params).toString()}`,
            {
                method: 'GET',
                headers: headers,
                mode: 'cors',
            },
        );
        return (await response).json();
    } catch (error) {
        console.error(error);
    }
};

export const requestGet = async (url: string, params = {}) => {
    const accessToken = await getToken();
    try {
        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
        };
        const response = fetch(
            `${
                process.env.NEXT_PUBLIC_API_URL
            }api/v1/${url}?${new URLSearchParams(params).toString()}`,
            {
                method: 'GET',
                headers: headers,
                mode: 'cors',
            },
        );
        return (await response).json();
    } catch (error) {
        console.error(error);
    }
};

export const requestPostWithToken = async (url: string, form: any | null) => {
    const accessToken = await getToken();
    try {
        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
        };

        const response = fetch(
            `${process.env.NEXT_PUBLIC_API_URL}api/v1/${url}`,
            {
                method: 'POST',
                headers: headers,
                body: form,
                mode: 'cors',
            },
        );
        return (await response).json();
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const requestPost = async (url: string, form: any | null) => {
    try {
        const headers = {
            Accept: 'application/json',
        };

        const response = fetch(
            `${process.env.NEXT_PUBLIC_API_URL}api/v1/${url}`,
            {
                method: 'POST',
                headers: headers,
                body: form,
                mode: 'cors',
            },
        );
        const r = await response;
        console.log(r);
        return (await response).json();
    } catch (error) {
        console.error(error);
        return error;
    }
};

export async function getDataById(id: string, model: any) {
    const response = await requestGet(`${model}/${id}`, {
        // language_filter: JSON.stringify([selectedLanguage]),
    });

    return response;
}
