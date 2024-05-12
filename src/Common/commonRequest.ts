import { requestGet, requestGetWithoutToken } from './requests';

export async function commonRequest(
    src: string,
    // currentLang: string,
    typeData: string = '',
    main_show: string = '0',
    sort_by_queue_main_show: string = '1',
    currentPage: number = 1,
    limit: number = 10000,
) {
    const response = await requestGetWithoutToken(src, {
        page: currentPage,
        search: '',
        status: '1',
        publish_date: '1',
        sort: '-1',
        type: typeData,
        date_filter: '',
        limit: limit,
        // language_filter_new: currentLang,
        sort_by_queue_show: '1',
        sort_by_queue_main_show: sort_by_queue_main_show,
        main_show: main_show,
    });

    return response;
}

export async function commonRequestUsers(
    src: string,
    role: string = 'all',
    search: string = '',
    currentPage: number = 1,
    limit: number = 10000,
) {
    const response = await requestGetWithoutToken(src, {
        user_role: role,
        search: search,
        page: currentPage,
        limit: limit,
    });

    return response;
}

export async function commonRequestWithToken(
    src: string,
    my: string = 'none',
    // currentLang: string,
    typeData: string = '',
    main_show: string = '0',
    sort_by_queue_main_show: string = '1',
    currentPage: number = 1,
    limit: number = 10000,
    search: string = '',
) {
    const response = await requestGet(src, {
        page: currentPage,
        search: search,
        status: '1',
        publish_date: '1',
        sort: '-1',
        type: typeData,
        date_filter: '',
        limit: limit,
        // language_filter_new: currentLang,
        sort_by_queue_show: '1',
        sort_by_queue_main_show: sort_by_queue_main_show,
        main_show: main_show,
        my: my,
    });

    return response;
}

export async function getcommonDataById(src: string, id: string) {
    const response = await requestGetWithoutToken(`${src}/${id}`, {
        // language_filter: JSON.stringify([selectedLanguage]),
    });

    return response;
}
