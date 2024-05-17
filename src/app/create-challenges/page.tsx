/* eslint-disable @typescript-eslint/no-unused-vars */
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
import AvatarComponent from '@/Common/AvatarComponent';
import MultiSelect from '@/Components/Multiselect';
export default function Page() {
    const [resultImage, setResultImg] = useState('');
    const [data, setData] = useState<any>();

    const [name, setName] = useState('');
    const [sector, setSector] = useState('');
    const [description, setDescription] = useState<any>('');
    const [publishDate, setPublishDate] = useState<string>('');
    const [endDate, setEnddate] = useState<string>('');

    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState<any>([]);
    const [categoryVoz, setCategoryVoz] = useState<any>([]);

    const getData = () => {
        requestGet(`${GETUSER}`, {}).then(response => {
            if (response?.success == true) {
                setData(response?.user);
                if (response?.user?.avatar != null) {
                    setResultImg(response?.user?.avatar);
                }
            }
        });

        requestGet(`${CATEGORY_VOZ}`, {}).then(response => {
            if (response?.success == true) {
                setCategoryVoz(response?.data);
            }
        });
    };

    const handleLanguageFilter = (data: string) => {
        setSelectedCategory(data);
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
        // form.append('category_voz_id', selectedCategory);
        form.append('voz_category_relation', selectedCategory);

        const response = await requestPostWithToken(VOZ, form);
        if (response?.success == true) {
            toast.success(response?.msg);
            setName('');
            setDescription(' ');
            setPublishDate(' ');
            setEnddate('');
            // setSelectedCategory(categoryVozList[0].id);

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
                                <Link href="/create-challenges">
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
                                {categoryVoz.length > 0 ? (
                                    <MultiSelect
                                        onChange={handleLanguageFilter}
                                        options={categoryVoz}
                                    />
                                ) : null}
                                {/* {categoryVozList?.length > 0 ? (
                                    <select
                                        className="border py-[12px] px-[5px]"
                                        onChange={e => {
                                            setSelectedCategory(e.target.value);
                                        }}
                                    >
                                        {categoryVozList?.length > 0 &&
                                            categoryVozList?.map(
                                                (value: any, index: number) => {
                                                    if (
                                                        selectedCategory != null
                                                    ) {
                                                        if (
                                                            selectedCategory ==
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
                                ) : null} */}
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
                        </div>
                        <div className="w-full flex flex-col gap-[5px]">
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
                        </div>
                        <div className="w-full flex gap-[5px]">
                            <div className="w-full flex flex-col gap-[5px]">
                                <span className="font-medium">
                                    Дата публикации вызова:
                                </span>
                                <input
                                    className="border shadow px-[10px] py-[10px]"
                                    onChange={e =>
                                        setPublishDate(e.target.value)
                                    }
                                    placeholder="dd-mm-yyyy"
                                    type="date"
                                    value={publishDate}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-[5px]">
                                <span className="font-medium">
                                    Сбор заявок до:
                                </span>
                                <input
                                    className="border shadow px-[10px] py-[10px]"
                                    onChange={e => setEnddate(e.target.value)}
                                    placeholder="dd-mm-yyyy"
                                    type="datetime-local"
                                    value={endDate}
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
