/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import MainHeader from '@/Components/MainHeader';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORY_VOZ, GETUSER, VOZ } from '@/Common/urls';
import { requestGet, requestPostWithToken } from '@/Common/requests';
import { toast } from 'react-toastify';
import { currentDate } from '@/Common/function';
export default function Page() {
    const [data, setData] = useState<any>();

    const [categoryVozList, setCategoryVozList] = useState<any>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    const [name, setName] = useState('');
    const [sector, setSector] = useState('');
    const [description, setDescription] = useState<any>('');
    const [publishDate, setPublishDate] = useState<string>(currentDate());
    const [endDate, setEnddate] = useState<string>(currentDate());

    const router = useRouter();

    const getData = () => {
        requestGet(`${GETUSER}`, {}).then(response => {
            if (response?.success == true) {
                setData(response?.user);
            }
        });
        requestGet(`${CATEGORY_VOZ}`, {}).then(response => {
            if (response?.success == true) {
                setCategoryVozList(response?.data);
                if (response?.data?.length > 0) {
                    setSelectedCategory(response?.data[0]);
                }
            }
        });
    };

    const validatePage = () => {
        if (
            name == 'Имя' ||
            name == '' ||
            typeof name == 'undefined' ||
            name == null
        ) {
            toast.error('Поле название не заполнено');
            return false;
        }
        // if (sector == '' || typeof sector == 'undefined' || sector == null) {
        //     toast.error('Поле сфера вызова не заполнено');
        //     return false;
        // }

        if (
            description == '' ||
            typeof description == 'undefined' ||
            description == null
        ) {
            toast.error('Поле описание не заполнено');
            return false;
        }

        if (
            publishDate == '' ||
            typeof publishDate == 'undefined' ||
            publishDate == null
        ) {
            toast.error('Поле Дата публикации не выбрана');
            return false;
        }

        if (endDate == '' || typeof endDate == 'undefined' || endDate == null) {
            toast.error('Поле Дата закрытия вызова не заполнена');
            return false;
        }

        return true;
    };

    const createVoz = async () => {
        // setCreateProfileStatus(true);
        if (!validatePage()) {
            return;
        }
        const form = new FormData();
        form.append('name', name);
        form.append('sector', sector);
        form.append('description', description);
        form.append('publish_date', publishDate);
        form.append('end_date', endDate);
        form.append('category_voz_id', selectedCategory?.id);

        const response = await requestPostWithToken(VOZ, form);
        if (response?.success == true) {
            toast.success(response?.msg);
            setName('');
            setDescription('');
            setPublishDate(currentDate());
            setEnddate(currentDate());
            // setCreateProfileStatus(false);
        } else {
            toast.error(response?.msg);
            // setCreateProfileStatus(false);
        }
    };

    useEffect(() => {
        const store_albi_userauth_bool =
            localStorage.getItem('voz_userauth_bool');
        if (
            store_albi_userauth_bool == '' ||
            store_albi_userauth_bool == null ||
            store_albi_userauth_bool == 'false'
        ) {
            router.push('/');
        } else {
            getData();
        }

        //Тут значит пользователь авторизован
    }, []);

    return (
        <div className="flex flex-col">
            {/* Header Menu */}
            <MainHeader />
            <div className="w-[1140px] flex gap-[20px] m-auto mt-[120px]">
                <div className="w-1/3 flex flex-col ">
                    <div className="w-full shadow flex flex-col gap-[20px] justify-center items-center py-[30px]">
                        <svg
                            className="w-[145px] h-[146px] rounded-full"
                            hanging={145}
                            viewBox="0 0 448 512"
                            width={145}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z" />
                        </svg>
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
                                        ? 'Вызовополучатель'
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
                                <Link href="/create-voz">
                                    <div className="w-full h-[55px]  border-b-[1px] bg-blue-100 hover:bg-blue-100  flex items-center  font-medium cursor-pointer transition-all ease-linear">
                                        <div className="w-[2px] bg-blue-800 h-[55px]"></div>
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
                                    <div className="w-full h-[55px]  border-b-[1px] hover:bg-blue-100  flex items-center  font-medium cursor-pointer transition-all ease-linear">
                                        <div className="w-[2px]  h-[55px]"></div>
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
                        <p className="w-full text-[20px] font-semibold">
                            Создать вызов
                        </p>
                        <hr />

                        <div className="w-full grid grid-cols-2 gap-[10px] ">
                            <div className="w-full flex flex-col gap-[5px]">
                                <span className="font-medium">
                                    Название вызова:
                                </span>
                                <input
                                    className="border shadow px-[10px] py-[10px]"
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Название вызова"
                                    type="text"
                                    value={name}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-[5px]">
                                <span className="font-medium">
                                    Категория вызова:
                                </span>
                                {categoryVozList?.length > 0 ? (
                                    <select className="border py-[12px] px-[5px]">
                                        {categoryVozList?.length > 0 &&
                                            categoryVozList?.map(
                                                (value: any, index: number) => {
                                                    if (
                                                        selectedCategory != null
                                                    ) {
                                                        if (
                                                            selectedCategory?.id ==
                                                            value?.id
                                                        ) {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    selected
                                                                    value={
                                                                        value?.id
                                                                    }
                                                                >
                                                                    {
                                                                        value?.name
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    value?.id
                                                                }
                                                            >
                                                                {value?.name}
                                                            </option>
                                                        );
                                                    }
                                                },
                                            )}
                                    </select>
                                ) : null}
                            </div>
                            {/* <div className="w-full flex flex-col gap-[5px]">
                                <span className="font-medium">
                                    Сфера вызова:
                                </span>
                                <input
                                    className="border shadow px-[10px] py-[10px]"
                                    onChange={e => setSector(e.target.value)}
                                    placeholder="Сфера вызова"
                                    type="text"
                                    value={sector}
                                />
                            </div> */}
                            <div className="w-full flex flex-col gap-[5px]">
                                <span className="font-medium">
                                    Описание Вызова:
                                </span>
                                <textarea
                                    className="border shadow px-[10px] py-[10px]"
                                    onChange={e =>
                                        setDescription(e.target.value)
                                    }
                                    value={description}
                                ></textarea>
                            </div>
                            <div className="w-full flex flex-col gap-[5px]">
                                <span className="font-medium">
                                    Дата публикации вызова:
                                </span>
                                <input
                                    className="border shadow px-[10px] py-[10px]"
                                    defaultValue={publishDate}
                                    onChange={e =>
                                        setPublishDate(e.target.value)
                                    }
                                    placeholder="dd-mm-yyyy"
                                    type="datetime-local"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-[5px]">
                                <span className="font-medium">
                                    Дата закрытия вызова:
                                </span>
                                <input
                                    className="border shadow px-[10px] py-[10px]"
                                    defaultValue={endDate}
                                    onChange={e => setEnddate(e.target.value)}
                                    placeholder="dd-mm-yyyy"
                                    type="datetime-local"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <button
                                className="bg-blue-600 text-white rounded-[5px] px-[10px] py-[8px] hover:bg-blue-700 "
                                onClick={() => createVoz()}
                            >
                                Создать
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
