/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import MainHeader from '@/Components/MainHeader';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GETUSER, USER_PASSWORD_UPDATE } from '@/Common/urls';
import { requestGet, requestPostWithToken } from '@/Common/requests';
import { toast } from 'react-toastify';
export default function Page() {
    const [data, setData] = useState<any>();

    const [name, setName] = useState('');
    const [actionSector, setActionSector] = useState('');
    const [businessSector, setBusinessSector] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const getData = () => {
        requestGet(`${GETUSER}`, {}).then(response => {
            if (response?.success == true) {
                setData(response?.user);
                setName(response?.user?.name);
                setActionSector(response?.user?.action_sector);
                setBusinessSector(response?.user?.business_sector);

                console.log(response?.user);
            }
        });
    };

    const update = async () => {
        // setCreateProfileStatus(true);

        const form = new FormData();
        form.append('password', password);
        form.append('action_sector', actionSector);
        form.append('name', name);
        form.append('business_sector', businessSector);

        const response = await requestPostWithToken(USER_PASSWORD_UPDATE, form);
        if (response?.success == true) {
            toast.success(response?.msg);
            getData();
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
                            <div className="w-full h-[55px] bg-blue-100 hover:bg-blue-100 border-b-[1px]  flex items-center  font-medium cursor-pointer transition-all ease-linear">
                                <div className="w-[2px] bg-blue-800 h-[55px]"></div>
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
                                    <div className="w-full h-[55px]  border-b-[1px] hover:bg-blue-100  flex items-center  font-medium cursor-pointer transition-all ease-linear">
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
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <div className="w-full">
                    <div className="w-full px-[10px] flex flex-col gap-[20px]">
                        <p className="w-full text-[20px] font-semibold">
                            Профиль
                        </p>
                        <hr />

                        <div className="w-full grid grid-cols-2 gap-[10px] ">
                            <div className="w-full flex flex-col gap-[5px]">
                                <span className="font-medium">ФИО:</span>
                                <input
                                    className="border shadow px-[10px] py-[10px]"
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Your name"
                                    type="text"
                                    value={name}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-[5px]">
                                <span className="font-medium">
                                    Сфера бизнеса:
                                </span>
                                <input
                                    className="border shadow px-[10px] py-[10px]"
                                    onChange={e =>
                                        setBusinessSector(e.target.value)
                                    }
                                    placeholder=""
                                    type="text"
                                    value={businessSector}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-[5px]">
                                <span className="font-medium">
                                    Описание деятельности:
                                </span>
                                <textarea
                                    className="border shadow px-[10px] py-[10px]"
                                    onChange={e =>
                                        setActionSector(e.target.value)
                                    }
                                    value={actionSector}
                                ></textarea>
                            </div>
                            <div className="w-full flex flex-col gap-[5px]">
                                <span className="font-medium">Эл Почта:</span>
                                <input
                                    className="border shadow px-[10px] py-[10px]"
                                    disabled
                                    placeholder="Your name"
                                    type="text"
                                    value={data?.email}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-[5px]">
                                <span className="font-medium">Пароль:</span>
                                <input
                                    className="border shadow px-[10px] py-[10px]"
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Введите новый пароль"
                                    type="text"
                                    value={password}
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <button
                                className="bg-blue-600 text-white rounded-[5px] px-[10px] py-[8px] hover:bg-blue-700 "
                                onClick={() => update()}
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
