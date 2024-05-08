/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { loaderSvg } from '@/Common/function';
import { requestGet, requestPostWithToken } from '@/Common/requests';
import { USER_PASSWORD_UPDATE } from '@/Common/urls';
import Header from '@/Components/Header';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Page() {
    const [activeLink, setActiveLink] = useState('');
    const pathname = usePathname();
    useEffect(() => {
        setActiveLink(pathname);
    }, [pathname]);

    const [createProfileStatus, setCreateProfileStatus] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getNews = () => {
        // requestGet(`${PROFILEGET}`, {}).then(response => {
        //     if (response?.success == true) {
        //         setEmail(response?.data?.email);
        //     }
        // });
    };

    useEffect(() => {
        getNews();
    }, []);

    const update = async () => {
        setCreateProfileStatus(true);

        const form = new FormData();
        form.append('password', password);

        const response = await requestPostWithToken(USER_PASSWORD_UPDATE, form);
        if (response?.success == true) {
            toast.success(response?.msg);
            setCreateProfileStatus(false);
        } else {
            toast.error(response?.msg);
            setCreateProfileStatus(false);
        }
    };

    return (
        <div className="flex">
            <Header />
            <div className="flex w-full pl-[138px]  ">
                <div className="w-[350px] flex-col gap-[20px]  border-r-[1px]">
                    <div className="px-[30px] flex justify-start items-start border-b-[1px] py-[20px]">
                        <h2 className="text-[24px] font-bold">Управление</h2>
                    </div>

                    {/* Контент меню */}
                    <div className="w-full flex flex-col">
                        <Link href="/settings">
                            <div
                                className={
                                    'px-[20px] py-[10px] font-semibold hover:bg-primary2 hover:text-white cursor-pointer transition-all ease-linear ' +
                                    (activeLink == '/settings'
                                        ? 'bg-primary2 text-white'
                                        : '')
                                }
                            >
                                Мой профиль
                            </div>
                        </Link>
                        <Link href="/settings-user">
                            <div
                                className={
                                    'px-[20px] py-[10px] font-semibold hover:bg-primary2 hover:text-white cursor-pointer transition-all ease-linear ' +
                                    (activeLink == '/settings-user'
                                        ? 'bg-primary2 text-white'
                                        : '')
                                }
                            >
                                Учетная запись
                            </div>
                        </Link>
                        <Link href="/settings-user">
                            <div className="px-[20px] py-[10px] font-semibold hover:bg-primary2 hover:text-white cursor-pointer transition-all ease-linear">
                                Сотрудники
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-[20px]">
                    <div className="border border-t-2 w-full p-[20px]">
                        <h3 className="font-semibold">Учетная запись</h3>
                    </div>

                    <div className="px-[20px] flex flex-col gap-[20px]">
                        <div>
                            <input
                                className="border p-[10px]"
                                disabled
                                type="text"
                                value={email}
                            />
                        </div>
                        <div>
                            <input
                                className="border p-[10px]"
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Новый пароль"
                                type="password"
                                value={password}
                            />
                        </div>

                        <button
                            className="text-[16px] font-light transition-all ease-linear cursor-pointer hover:text-white  hover:bg-primary2 active:text-white  active:bg-primary2 w-[130px] h-[38px] px-7 pt-3 pb-[11px] text-primary2 bg-white rounded-[4px] border border-primary2 justify-center items-center flex"
                            disabled={createProfileStatus}
                            onClick={() => update()}
                        >
                            Сохранить
                            {createProfileStatus == true ? (
                                <div className="flex items-center pl-1">
                                    {loaderSvg()}
                                </div>
                            ) : null}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
