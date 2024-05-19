'use client';
import AvatarComponent from '@/Components/AvatarComponent';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    commonRequest,
    commonRequestUsers,
    commonRequestWithToken,
} from '@/Common/commonRequest';
import { is_user_logged_in, loaderSvg } from '@/Common/function';
import { num_word } from '@/Common/function';
import { USERS, VOZ, VOZ_MAIN } from '@/Common/urls';
import ProjectPagination from '@/HtmlComponent/pagination';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CallerData() {
    const [loader, setLoader] = useState(false);
    const [listData, setListData] = useState<any>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limitFilter, setLimitFilter] = useState<number>(5);

    const [searchText, setSearchText] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('-1');
    const [sortFilter, setSortFilter] = useState<string>('-1');
    const [dateFilter, setDateFilter] = useState<string>('');

    const router = useRouter();

    const getData = async () => {
        setLoader(true);
        const response = await commonRequestUsers(
            USERS,
            'caller',
            searchText,
            currentPage,
            limitFilter,
        );
        if (response?.success == true) {
            setLoader(false);
            setListData(response?.data?.data);
            setCurrentPage(response.data?.current_page ?? 1);
            setTotalPages(response.data?.last_page ?? 0);
            setTotalItems(response.data?.total ?? 0);
        }
    };

    useEffect(() => {
        if (searchText) {
            const delayDebounceFn = setTimeout(() => {
                getData();
            }, 500);
            return () => clearTimeout(delayDebounceFn);
        }
        getData();
    }, [
        currentPage,
        searchText,
        statusFilter,
        sortFilter,
        dateFilter,
        limitFilter,
    ]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearch = (data: string) => {
        setSearchText(data);
        setCurrentPage(1);
    };

    useEffect(() => {
        if (!is_user_logged_in()) {
            router.push('/about');
        }
    }, []);

    return (
        <div className="w-full mt-[90px] flex justify-center items-center py-[20px]">
            <div className="w-[1140px] m-auto  flex gap-[10px] flex-col ">
                <div className="w-full shadow flex justify-between gap-[30px] px-[30px] py-[30px] bg-white rounded-[5px] ">
                    <div className="w-full flex gap-[30px]">
                        <input
                            className="border-b-[2px] border-b-blue-500 px-[10px] py-[10px]"
                            onChange={(e: any) => handleSearch(e.target?.value)}
                            placeholder="Поиск..."
                            value={searchText}
                        />
                        {/* <input
                            className="border-b-[2px] border-b-blue-500 px-[10px] py-[10px]"
                            placeholder="Поиск городу..."
                        /> */}
                        {/* <select className="border-b-[2px] border-b-blue-500 px-[10px] py-[10px]">
                            <option>Поиск по типу</option>
                        </select> */}
                    </div>
                    <div className="border-">
                        <button className="bg-blue-600 text-white rounded-[5px] px-[10px] py-[8px] hover:bg-blue-700 ">
                            Поиск
                        </button>
                    </div>
                </div>

                <div className="w-full mt-[30px] flex flex-col gap-[20px]">
                    <div className="w-full flex flex-col gap-[20px]">
                        <p className="text-[20px] font-semibold">
                            {totalItems}{' '}
                            {num_word(totalItems, [
                                'Вызоводатель',
                                'Вызоводателей',
                                'Вызоводателей',
                            ])}
                        </p>
                        <hr />
                    </div>

                    <div className="w-full flex flex-col gap-[20px]">
                        {loader == true ? (
                            <div className="w-full flex justify-center items-center">
                                {loaderSvg()}
                            </div>
                        ) : null}

                        {/* Item */}
                        {listData?.length > 0 &&
                            listData?.map((value: any, index: number) => {
                                return (
                                    <div
                                        className="w-full flex flex-col gap-[25px] h-[150px] shadow px-[10px] md:px-[20px] py-[20px]"
                                        key={index}
                                    >
                                        <div className="w-full flex gap-[20px] px-[1px]">
                                            <div className="w-[60px] h-[60px] relative">
                                                {value?.avatar != null ? (
                                                    <AvatarComponent
                                                        resultImage={
                                                            value?.avatar
                                                        }
                                                    />
                                                ) : (
                                                    <svg
                                                        fill="none"
                                                        height={60}
                                                        viewBox="0 0 45 44"
                                                        width={60}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g opacity="0.43">
                                                            <path
                                                                d="M0.5 21.935C0.5 19.0544 1.06737 16.2021 2.1697 13.5408C3.27204 10.8796 4.88776 8.46146 6.92461 6.42461C8.96147 4.38776 11.3796 2.77204 14.0408 1.6697C16.7021 0.567365 19.5545 0 22.435 0C25.3155 0 28.1679 0.567365 30.8292 1.6697C33.4904 2.77204 35.9085 4.38776 37.9454 6.42461C39.9822 8.46146 41.598 10.8796 42.7003 13.5408C43.8026 16.2021 44.37 19.0544 44.37 21.935C44.37 27.7525 42.059 33.3318 37.9454 37.4454C33.8318 41.559 28.2525 43.87 22.435 43.87C16.6175 43.87 11.0382 41.559 6.92461 37.4454C2.811 33.3318 0.5 27.7525 0.5 21.935Z"
                                                                fill="#868686"
                                                            />
                                                            <path
                                                                d="M22.4364 26.8093C27.8206 26.8093 32.1853 22.4446 32.1853 17.0604C32.1853 11.6762 27.8206 7.31152 22.4364 7.31152C17.0522 7.31152 12.6875 11.6762 12.6875 17.0604C12.6875 22.4446 17.0522 26.8093 22.4364 26.8093Z"
                                                                fill="black"
                                                            />
                                                            <path
                                                                clipRule="evenodd"
                                                                d="M37.5945 37.1578C37.7407 37.3942 37.6944 37.694 37.497 37.8817C33.4292 41.7342 28.0375 43.8778 22.4349 43.8699C16.8324 43.8778 11.4407 41.7342 7.37291 37.8817C7.27655 37.7902 7.21435 37.6686 7.19662 37.5369C7.17889 37.4053 7.20669 37.2715 7.27542 37.1578C10.1075 32.4588 15.8325 29.2466 22.4349 29.2466C29.0349 29.2466 34.76 32.4588 37.5945 37.1578Z"
                                                                fill="black"
                                                                fillRule="evenodd"
                                                            />
                                                        </g>
                                                        <g opacity="0.43">
                                                            <path
                                                                d="M0.5 21.935C0.5 19.0544 1.06737 16.2021 2.1697 13.5408C3.27204 10.8796 4.88776 8.46146 6.92461 6.42461C8.96147 4.38776 11.3796 2.77204 14.0408 1.6697C16.7021 0.567365 19.5545 0 22.435 0C25.3155 0 28.1679 0.567365 30.8292 1.6697C33.4904 2.77204 35.9085 4.38776 37.9454 6.42461C39.9822 8.46146 41.598 10.8796 42.7003 13.5408C43.8026 16.2021 44.37 19.0544 44.37 21.935C44.37 27.7525 42.059 33.3318 37.9454 37.4454C33.8318 41.559 28.2525 43.87 22.435 43.87C16.6175 43.87 11.0382 41.559 6.92461 37.4454C2.811 33.3318 0.5 27.7525 0.5 21.935Z"
                                                                fill="#868686"
                                                            />
                                                            <path
                                                                d="M22.4364 26.8093C27.8206 26.8093 32.1853 22.4446 32.1853 17.0604C32.1853 11.6762 27.8206 7.31152 22.4364 7.31152C17.0522 7.31152 12.6875 11.6762 12.6875 17.0604C12.6875 22.4446 17.0522 26.8093 22.4364 26.8093Z"
                                                                fill="#353B58"
                                                            />
                                                            <path
                                                                clipRule="evenodd"
                                                                d="M37.5945 37.1578C37.7407 37.3942 37.6944 37.694 37.497 37.8817C33.4292 41.7342 28.0375 43.8778 22.4349 43.8699C16.8324 43.8778 11.4407 41.7342 7.37291 37.8817C7.27655 37.7902 7.21435 37.6686 7.19662 37.5369C7.17889 37.4053 7.20669 37.2715 7.27542 37.1578C10.1075 32.4588 15.8325 29.2466 22.4349 29.2466C29.0349 29.2466 34.76 32.4588 37.5945 37.1578Z"
                                                                fill="#353B58"
                                                                fillRule="evenodd"
                                                            />
                                                        </g>
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="w-full flex flex-col gap-[5px]">
                                                <p className="text-[18px] font-semibold">
                                                    {value?.name}
                                                </p>
                                                <span className="text-[14px] font-light">
                                                    {value?.action_sector}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-between">
                                            <div className="flex gap-[5px]">
                                                {value?.category_voz?.length >
                                                    0 &&
                                                    value?.category_voz?.map(
                                                        (v: any, i: number) => {
                                                            return (
                                                                <span
                                                                    className="w-fit text-[14px] font-light bg-blue-300 px-[10px] py-[10px] text-blue-700 rounded-[5px]"
                                                                    key={i}
                                                                >
                                                                    {
                                                                        v
                                                                            ?.category
                                                                            ?.name
                                                                    }
                                                                </span>
                                                            );
                                                        },
                                                    )}
                                            </div>

                                            <div className="flex flex-col">
                                                <span className="text-[14px] ">
                                                    Email:{' '}
                                                    <span className="font-semibold">
                                                        {value?.email}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    <div className="w-full flex px-[5px]">
                        {totalPages > 1 ? (
                            <ProjectPagination
                                currentPage={currentPage}
                                itemsPerPage={limitFilter}
                                pageChange={handlePageChange}
                                totalItems={totalItems}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
