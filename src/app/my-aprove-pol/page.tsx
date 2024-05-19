/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import MainHeader from '@/Components/MainHeader';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    APROVE,
    APROVE_UPDATE_STATUS,
    GETUSER,
    MASS_ACTION,
    VOZ,
} from '@/Common/urls';
import { requestGet, requestPostWithToken } from '@/Common/requests';
import { toast } from 'react-toastify';
import { formatStatus, is_user_logged_in } from '@/Common/function';
import { commonRequestAproveWithToken } from '@/Common/commonRequest';
import AvatarComponent from '@/Components/AvatarComponent';
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const searchParams = useSearchParams();
    const _voz_id: any = searchParams.get('voz_id');

    const getMyAprove = async (user_id: any) => {
        const response = await commonRequestAproveWithToken(
            APROVE,
            'none',
            _voz_id,
            'none',
        );
        if (response?.success == true) {
            if (response?.data?.data?.length == 0) {
                // setMyAprove(false);
            } else {
                setListData(response?.data?.data);
            }
        }
    };

    const [resultImage, setResultImg] = useState('');
    const [listData, setListData] = useState<any>([]);
    const [data, setData] = useState<any>();

    const router = useRouter();

    const getData = () => {
        requestGet(`${GETUSER}`, {}).then(response => {
            if (response?.success == true) {
                setData(response?.user);
                getMyAprove(response?.user?.id);
                if (response?.user?.avatar != null) {
                    setResultImg(response?.user?.avatar);
                }
            }
        });
    };

    useEffect(() => {
        if (!is_user_logged_in()) {
            router.push('/about');
        } else {
            getData();
        }
    }, []);

    const changeStatus = async (id: any, status: any) => {
        console.log(id);

        const form = new FormData();
        form.append('aprove_id', id);
        form.append('status', status);

        const response = await requestPostWithToken(APROVE_UPDATE_STATUS, form);
        if (response?.success == true) {
            toast.success(response?.msg);
            getData();
        } else {
            toast.error(response?.msg);
        }
    };

    return (
        <div className="flex flex-col">
            <MainHeader />
            <div className="w-[1140px] flex gap-[20px] m-auto mt-[120px]">
                <div className="w-1/3 flex flex-col ">
                    <div className="w-full shadow flex flex-col gap-[20px] justify-center items-center py-[30px]">
                        <div className="w-[145px] h-[145px] relative">
                            <AvatarComponent resultImage={resultImage} />
                        </div>
                        <div className="flex flex-col gap-[5px] justify-center items-center">
                            <h4 className="font-semibold text-[20px]">
                                {data?.name}
                            </h4>
                            <p>
                                {' '}
                                Роль:{' '}
                                <span className="font-semibold">
                                    {data?.roles?.name == 'caller'
                                        ? 'Вызоводатель'
                                        : ''}
                                    {data?.roles?.name == 'recipient'
                                        ? 'Студенты'
                                        : ''}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <Link href="/profile">
                            <div className="w-full h-[55px]  hover:bg-blue-100 border-b-[1px]  flex items-center  font-medium cursor-pointer transition-all ease-linear">
                                <div className="w-[2px]  h-[55px]"></div>
                                <div className="flex gap-[5px] px-[15px] items-center">
                                    <svg
                                        height={15}
                                        viewBox="0 0 448 512"
                                        width={15}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                                    </svg>
                                    <p className="font-medium ">Профиль</p>
                                </div>
                            </div>
                        </Link>
                        {data?.roles?.name == 'caller' ? (
                            <>
                                <Link href="/create-challenges">
                                    <div className="w-full h-[55px]  border-b-[1px]  hover:bg-blue-100  flex items-center  font-medium cursor-pointer transition-all ease-linear">
                                        <div className="w-[2px]  h-[55px]"></div>
                                        <div className="flex gap-[5px] px-[15px] items-center">
                                            <svg
                                                height={15}
                                                viewBox="0 0 384 512"
                                                width={15}
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z" />
                                            </svg>
                                            <p className="font-medium ">
                                                Создать вызов
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                                <Link href="/my-voz">
                                    <div className="w-full h-[55px]  border-b-[1px] bg-blue-100 hover:bg-blue-100  flex items-center  font-medium cursor-pointer transition-all ease-linear">
                                        <div className="w-[2px] bg-blue-800  h-[55px]"></div>
                                        <div className="flex gap-[5px] px-[15px] items-center">
                                            <svg
                                                height={15}
                                                viewBox="0 0 512 512"
                                                width={15}
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 0v64h64V96H64zm384 0H192v64H448V96zM64 224v64h64V224H64zm384 0H192v64H448V224zM64 352v64h64V352H64zm384 0H192v64H448V352z" />
                                            </svg>
                                            <p className="font-medium ">
                                                Мои вызовы
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        ) : null}
                    </div>
                </div>
                <div className="w-full">
                    <div className="w-full px-[10px] flex flex-col gap-[20px]">
                        <div className="w-full flex justify-between">
                            <Link
                                className="bg-gray-400 px-[10px] py-[4px] rounded-[4px]"
                                href="/my-voz"
                            >
                                Назад
                            </Link>
                            <p className="text-[20px] font-semibold">
                                Все заявки по проекту
                            </p>
                        </div>

                        <hr />

                        <table className="w-full table-auto">
                            <thead>
                                <tr className=" bg-blue-100 border py-[10px]">
                                    <th className="border flex items-center font-medium text-black dark:text-white"></th>
                                    <th className="border font-medium text-black dark:text-white">
                                        Студент
                                    </th>
                                    <th className="border font-medium text-black dark:text-white">
                                        Email
                                    </th>
                                    <th className="font-medium text-black dark:text-white">
                                        Курс обучения
                                    </th>
                                    <th className="font-medium text-black dark:text-white">
                                        Дата рождения
                                    </th>
                                    <th className=" items-center font-medium text-black dark:text-white">
                                        Телеграмм
                                    </th>
                                    <th className=" items-center font-medium text-black dark:text-white">
                                        Сфера бизнеса
                                    </th>
                                    <th className="items-center font-medium text-black dark:text-white">
                                        Статус
                                    </th>
                                    <th className="font-medium text-black dark:text-white">
                                        Действие
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listData.length == 0 ? (
                                    <></>
                                ) : (
                                    listData?.map((item: any) => {
                                        return (
                                            <tr
                                                className="py-[10px] h-[55px]"
                                                key={item?.id}
                                            >
                                                <td className="border border-[#eee]  dark:border-strokedark">
                                                    {item?.id}
                                                </td>
                                                <td className=" border border-[#eee]  dark:border-strokedark">
                                                    {item?.user?.name}
                                                </td>
                                                <td className="border border-[#eee]  dark:border-strokedark">
                                                    {item?.user?.email}
                                                </td>
                                                <td className="border border-[#eee]  dark:border-strokedark">
                                                    {
                                                        item?.user
                                                            ?.education_course
                                                    }
                                                </td>
                                                <td className="border border-[#eee] text-[14px]  dark:border-strokedark">
                                                    {item?.user?.date_birth}
                                                </td>
                                                <td className="border border-[#eee]  dark:border-strokedark">
                                                    {item?.user?.url_telegram}
                                                </td>
                                                <td className="border border-[#eee]  dark:border-strokedark">
                                                    {item?.voz?.category_voz
                                                        ?.length > 0 &&
                                                        item?.voz?.category_voz?.map(
                                                            (
                                                                v: any,
                                                                i: any,
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        className="bg-blue-100 px-[5px] py-[2px] rounded-[4px]"
                                                                        key={i}
                                                                    >
                                                                        {
                                                                            v
                                                                                ?.category
                                                                                ?.name
                                                                        }
                                                                    </div>
                                                                );
                                                            },
                                                        )}
                                                </td>
                                                <td className="border border-[#eee] !text-[12px]  dark:border-strokedark">
                                                    {formatStatus(item?.status)}
                                                </td>

                                                <td className="border-b border-[#eee]  dark:border-strokedark">
                                                    <div className="flex gap-[5px]">
                                                        {item?.status !=
                                                        'approved' ? (
                                                            <button
                                                                className="bg-green-600 text-white rounded-[5px] px-[10px] py-[8px] hover:bg-blue-700 "
                                                                onClick={() =>
                                                                    changeStatus(
                                                                        item?.id,
                                                                        'approved',
                                                                    )
                                                                }
                                                            >
                                                                Принять
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="bg-yellow-600 text-white rounded-[5px] px-[10px] py-[8px] hover:bg-blue-700 "
                                                                onClick={() =>
                                                                    changeStatus(
                                                                        item?.id,
                                                                        'in_progress',
                                                                    )
                                                                }
                                                            >
                                                                Отменить
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
