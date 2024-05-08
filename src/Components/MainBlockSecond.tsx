'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { commonRequestWithToken } from '@/Common/commonRequest';
import { VOZ } from '@/Common/urls';
import ProjectPagination from '@/HtmlComponent/pagination';
import { useEffect, useState } from 'react';

export default function MainBlockSecond() {
    const [listData, setListData] = useState<any>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limitFilter, setLimitFilter] = useState<number>(5);

    const [searchText, setSearchText] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('-1');
    const [sortFilter, setSortFilter] = useState<string>('-1');
    const [dateFilter, setDateFilter] = useState<string>('');

    const getVoz = async () => {
        //     page: currentPage,
        //     search: searchText,
        //     status: statusFilter,
        //     sort: sortFilter,
        //     date_filter: dateFilter,
        //     language_filter: languageFilter,
        //     limit: limitFilter,
        //   },
        const response = await commonRequestWithToken(
            VOZ,
            'none',
            '',
            '',
            '',
            currentPage,
            limitFilter,
            searchText,
        );
        if (response?.success == true) {
            setListData(response?.data?.data);
            setCurrentPage(response.data?.current_page ?? 1);
            setTotalPages(response.data?.last_page ?? 0);
            setTotalItems(response.data?.total ?? 0);
        }
    };

    useEffect(() => {
        if (searchText) {
            const delayDebounceFn = setTimeout(() => {
                getVoz();
            }, 500);
            return () => clearTimeout(delayDebounceFn);
        }
        getVoz();
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

    return (
        <div className="w-full mt-[-40px] z-50 flex justify-center items-center py-[20px]">
            <div className="w-[1140px] m-auto  flex gap-[10px] flex-col ">
                <div className="w-full shadow flex justify-between gap-[30px] px-[30px] py-[30px] bg-white rounded-[5px] ">
                    <div className="w-full flex gap-[30px]">
                        <input
                            className="border-b-[2px] border-b-blue-500 px-[10px] py-[10px]"
                            onChange={(e: any) => handleSearch(e.target?.value)}
                            placeholder="Поиск по вызову..."
                            value={searchText}
                        />
                        {/* <input
                            className="border-b-[2px] border-b-blue-500 px-[10px] py-[10px]"
                            placeholder="Поиск городу..."
                        /> */}
                        <select className="border-b-[2px] border-b-blue-500 px-[10px] py-[10px]">
                            <option>Поиск по типу</option>
                        </select>
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
                            {totalItems} Вызовов
                        </p>
                        <hr />
                    </div>

                    <div className="w-full flex flex-col gap-[20px]">
                        {/* Item */}
                        {listData?.length > 0 &&
                            listData?.map((value: any, index: number) => {
                                return (
                                    <div
                                        className="w-full flex flex-col gap-[25px] h-[150px] shadow px-[10px] py-[20px]"
                                        key={index}
                                    >
                                        <div className="w-full flex gap-[20px] px-[1px]">
                                            <svg
                                                className="w-[60px] h-[60px] rounded-full"
                                                hanging={60}
                                                viewBox="0 0 448 512"
                                                width={60}
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z" />
                                            </svg>
                                            <div className="w-full flex flex-col gap-[5px]">
                                                <p className="text-[18px] font-semibold">
                                                    {value?.name}
                                                </p>
                                                <span className="text-[14px] font-light">
                                                    {value?.description}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-between">
                                            <span className="w-fit text-[14px] font-light bg-blue-300 px-[10px] py-[10px] text-blue-700 rounded-[5px]">
                                                {value?.category?.name}
                                            </span>
                                            <div className="flex flex-col">
                                                <span className="text-[14px] ">
                                                    Создано:{' '}
                                                    <span className="font-semibold">
                                                        {value?.publish_date}
                                                    </span>
                                                </span>
                                                <span className="text-[14px] ">
                                                    Да закрытия вызова:{' '}
                                                    <span className="font-semibold">
                                                        {value?.end_date}
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
                        {/* <div className="w-[30px] h-[30px] bg-blue-800 text-white flex justify-center items-center font-light text-[14px]">
                            1
                        </div>
                        <div className="w-[30px] h-[30px]  flex justify-center items-center font-light text-[14px]">
                            2
                        </div>
                        <div className="w-[30px] h-[30px]  flex justify-center items-center font-light text-[14px]">
                            3
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
