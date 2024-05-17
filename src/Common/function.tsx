'use client';
import moment from 'moment';
import 'moment/locale/ru'; // without this line it didn't work
moment.locale('ru');

// Access Token
export const storeToken = (token: string) => {
    localStorage.setItem('auth_token_voz', token);
};

export const getToken = () => {
    return localStorage.getItem('auth_token_voz');
};

export const removeToken = () => {
    return localStorage.removeItem('auth_token_voz');
};

// Albi User Auth booleand
export const store_albi_userauth_bool = (boleanData: string) => {
    localStorage.setItem('voz_userauth_bool', boleanData);
};

export const get_albi_userauth_bool = () => {
    localStorage.getItem('voz_userauth_bool');
};

export const remove_albi_userauth_bool = () => {
    localStorage.removeItem('voz_userauth_bool');
};

// Get uri value to redirect
export const getUriValue = (uriName: string) => {
    try {
        const url = new URL(window.location.href);
        return url.searchParams.get(uriName);
    } catch (e) {
        return console.error(e);
    }
};

// Format long text to short for readability
export const formatIndexText = (text: string) => {
    const formatedText = text.replace(/(<([^>]+)>)/gi, '');
    return formatedText.length > 50
        ? `${formatedText.slice(0, 50)}...`
        : formatedText;
};

export const currentDate = () => {
    return moment().format('YYYY-MM-DD HH-mm-ss');
};

export const formatDate = (date: string) => {
    return moment(date).format('DD.MM.YYYY');
};

export const formatDateWithoutTime = (date: string) => {
    return moment(date).format('D MMM YYYY');
};

export const formatDateWithtimeTime = (date: string) => {
    return moment(date).format('D MMM YYYY HH:mm');
};

// Format long text to short for readability
export const translateLanguageId = (id: number | undefined) => {
    switch (id) {
        case 1:
            return 'Тоҷикӣ';
        case 2:
            return 'Русский';
        case 3:
            return 'English';

        default:
            return id;
    }
};

export const loaderSvg = () => {
    return (
        <svg
            aria-hidden="true"
            className="inline h-[26px] w-[26px] animate-spin  fill-black text-blue-200 dark:fill-gray-300 dark:text-gray-600"
            fill="none"
            viewBox="0 0 100 101"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
            />
            <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
            />
        </svg>
    );
};

// Format status from number to good label
export const formatStatus = (status: string | undefined) => {
    switch (status) {
        /**
         * default statuses
         */
        case '1':
            return (
                <span className="inline-flex rounded bg-success px-2 py-1 text-sm font-medium text-[#FFF] hover:bg-opacity-90">
                    Активный
                </span>
            );

        case '0':
            return (
                <span className="inline-flex rounded bg-danger px-2 py-1 text-sm font-medium text-[#FFF] hover:bg-opacity-90">
                    Не активный
                </span>
            );

        /**
         * complaints and suggestions statuses
         */
        case 'new':
            return (
                <span className="inline-flex rounded bg-secondary px-2 py-1 text-sm font-medium text-[#FFF] hover:bg-opacity-90">
                    Новая
                </span>
            );

        case 'in_progress':
            return (
                <span className="bg-yellow-600 text-[12px] inline-flex rounded bg-warning px-2 py-1  font-medium text-[#FFF] hover:bg-opacity-90">
                    В процессе
                </span>
            );

        case 'approved':
            return (
                <span className="bg-green-600 text-[12px] inline-flex rounded bg-success px-2 py-1  font-medium text-[#FFF] hover:bg-opacity-90">
                    Принято
                </span>
            );

        case 'cancelled':
            return (
                <span className="inline-flex rounded bg-danger px-2 py-1  font-medium text-[#FFF] hover:bg-opacity-90">
                    Отменена
                </span>
            );

        default:
            return status;
    }
};
