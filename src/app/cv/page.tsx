/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import MainHeader from '@/Components/MainHeader';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CONTACT_ASSETS, CV, GETUSER, MASS_ACTION, VOZ } from '@/Common/urls';
import { requestGet, requestPostWithToken } from '@/Common/requests';
import { toast } from 'react-toastify';
import { currentDate, is_user_logged_in } from '@/Common/function';
import { loaderSvg } from '@/Common/function';
import { commonRequestWithToken } from '@/Common/commonRequest';
import TableheadCheckbox from '@/Components/TableheadCheckbox';
import TableheadSort from '@/Components/TableheadSort';
import AvatarComponent from '@/Components/AvatarComponent';
export default function Page() {
    const [loader, setLoader] = useState(false);
    const [resultImage, setResultImg] = useState('');
    const [listData, setListData] = useState<any>([]);
    const [data, setData] = useState<any>();

    const [name, setName] = useState('');
    const [sector, setSector] = useState('');
    const [description, setDescription] = useState<any>('');
    const [publishDate, setPublishDate] = useState<string>(currentDate());
    const [endDate, setEnddate] = useState<string>(currentDate());

    const router = useRouter();

    const getData = () => {
        setLoader(true);
        requestGet(`${GETUSER}`, {}).then(response => {
            if (response?.success == true) {
                setData(response?.user);
                if (response?.user?.avatar != null) {
                    setResultImg(response?.user?.avatar);
                }
            }
            setLoader(false);
        });
    };

    const getVoz = async () => {
        setLoader(true);
        const response = await commonRequestWithToken(CV);
        setLoader(false);
        if (response?.success == true) {
            setListData(response?.data?.data);
        }
    };

    const removeItem = async (itemId: any) => {
        requestGet(MASS_ACTION, {
            ids: JSON.stringify([itemId]),
            action_type: 'act_delete',
            model: CV,
        }).then((response: any) => {
            if (response.success) {
                toast.success('Успешно!');
                getVoz();
            }
        });
    };

    useEffect(() => {
        if (!is_user_logged_in()) {
            router.push('/about');
        } else {
            getData();
        }

        getVoz();
    }, []);

    return (
        <div className="flex flex-col">
            <MainHeader />
            {loader == true ? (
                <div className="w-full absolute top-[100px] flex justify-center items-center">
                    {loaderSvg()}
                </div>
            ) : (
                <>
                    <div className="w-[1140px] flex gap-[20px] m-auto mt-[120px]">
                        <div className="w-1/3 flex flex-col ">
                            <div className="w-full shadow flex flex-col gap-[20px] justify-center items-center py-[30px]">
                                <div className="w-[145px] h-[145px] relative">
                                    <AvatarComponent
                                        resultImage={resultImage}
                                    />
                                </div>

                                <div className="flex flex-col gap-[5px] justify-center items-center">
                                    <h4 className="font-semibold text-[20px] text-center">
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
                                                ? 'Студент'
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
                                            <p className="font-medium ">
                                                Профиль
                                            </p>
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
                                ) : (
                                    <>
                                        <Link href="/cv">
                                            <div className="w-full h-[55px]  border-b-[1px] bg-blue-100 hover:bg-blue-100  flex items-center  font-medium cursor-pointer transition-all ease-linear">
                                                <div className="w-[2px] bg-blue-800 h-[55px]"></div>
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
                                                        CV
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>

                                        <Link href="/my-aprove">
                                            <div className="w-full h-[55px]  border-b-[1px] hover:bg-blue-100  flex items-center  font-medium cursor-pointer transition-all ease-linear">
                                                <div className="w-[2px]  h-[55px]"></div>
                                                <div className="flex gap-[5px] px-[15px] items-center">
                                                    <svg
                                                        height={15}
                                                        viewBox="0 0 576 512"
                                                        width={15}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M384 480h48c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224H144c-11.4 0-21.9 6-27.6 15.9L48 357.1V96c0-8.8 7.2-16 16-16H181.5c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8H416c8.8 0 16 7.2 16 16v32h48V160c0-35.3-28.7-64-64-64H298.5c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H87.7 384z" />
                                                    </svg>
                                                    <p className="font-medium ">
                                                        Мои заявки
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="w-full px-[10px] flex flex-col gap-[20px]">
                                <div className="w-full flex justify-between">
                                    <p className="w-full text-[20px] font-semibold">
                                        Мои файлы
                                    </p>
                                    <Link
                                        className="flex justify-center items-center px-[20px] w-full md:max-w-[100px]  h-[38px] rounded-[4px] bg-primary_yellow border text-[#FFF] text-[14px] font-normal hover:active:bg-[#FFF] hover:active:text-primary2 transition-all ease-in-out"
                                        href={'add-cv'}
                                    >
                                        Добавить
                                    </Link>
                                </div>
                                <hr />

                                {listData.length > 0 ? (
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className=" bg-blue-100 border py-[10px]">
                                                {/* <th className="border flex items-center font-medium text-black dark:text-white"></th> */}
                                                <th className="border font-medium text-black dark:text-white">
                                                    Название
                                                </th>
                                                <th className="border font-medium text-black dark:text-white">
                                                    Размер
                                                </th>
                                                {/* <th className="font-medium text-black dark:text-white">
                                                Формат
                                            </th> */}
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
                                                            {/* <td className="border border-[#eee]  dark:border-strokedark p-[8px]">
                                                            {item?.id}
                                                        </td> */}
                                                            <td className=" border border-[#eee]  dark:border-strokedark p-[8px]">
                                                                {item?.name}
                                                            </td>
                                                            <td className="border border-[#eee]  dark:border-strokedark p-[8px]">
                                                                {(
                                                                    item?.size /
                                                                    1024 /
                                                                    1024
                                                                ).toFixed(
                                                                    2,
                                                                )}{' '}
                                                                МБ
                                                            </td>

                                                            {/* <td className="border border-[#eee] text-[14px]  dark:border-strokedark p-[8px]">
                                                            {item?.format}
                                                        </td> */}
                                                            <td className="border-b border-[#eee]  dark:border-strokedark p-[8px]">
                                                                <div className="flex justify-center items-center gap-[5px]">
                                                                    <button
                                                                        className="bg-red-600 text-white rounded-[5px] px-[10px] py-[8px] hover:bg-blue-700 "
                                                                        onClick={() =>
                                                                            removeItem(
                                                                                item?.id,
                                                                            )
                                                                        }
                                                                    >
                                                                        <svg
                                                                            className="fill-white"
                                                                            height={
                                                                                15
                                                                            }
                                                                            viewBox="0 0 448 512"
                                                                            width={
                                                                                12
                                                                            }
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                                                        </svg>
                                                                    </button>
                                                                    <Link
                                                                        className="bg-blue-600 text-white rounded-[5px] px-[10px] py-[8px] hover:bg-blue-700 "
                                                                        href={`${process.env.NEXT_PUBLIC_API_URL}api/v1/${CONTACT_ASSETS}/${item?.src}`}
                                                                        target="_blank"
                                                                    >
                                                                        <svg
                                                                            className="fill-white"
                                                                            height={
                                                                                15
                                                                            }
                                                                            viewBox="0 0 576 512"
                                                                            width={
                                                                                12
                                                                            }
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                                                        </svg>
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="w-full justify-center items-center text-center">
                                        Данные не найдены
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
