/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { CommonContext } from '@/Common/context';
import { removeToken, store_albi_userauth_bool } from '@/Common/function';
import { requestPostWithToken } from '@/Common/requests';
import { LOGOUT } from '@/Common/urls';
import BurgerIcon from '@/icons/BurgerIcon';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function MainHeader() {
    const { currentUser, setCurrentUser, userAuth, setUserAuth } =
        useContext(CommonContext);

    useEffect(() => {}, [userAuth, currentUser]);

    const userLogout = async () => {
        const form = new FormData();
        const response = await requestPostWithToken(LOGOUT, form);

        if (response?.success == true) {
            setCurrentUser({});
            setUserAuth(false);
            await removeToken();
            await store_albi_userauth_bool('false');
            signOut();
        }
    };

    const [activeLink, setActiveLink] = useState('');

    const pathname = usePathname();

    useEffect(() => {
        setActiveLink(pathname);
    }, [pathname]);

    const [mobileMenuShow, setMobileMenuShow] = useState(false);

    useEffect(() => {
        // window.addEventListener('scroll', isSticky);
    });

    const isSticky = () => {
        // const header = document.querySelector('.header-section');
        // if (header != null) {
        //     const scrollTop = window.scrollY;
        //     if (scrollTop >= 90) {
        //         // header.classList.remove('py-[10px]');
        //         // header.classList.add('shadow');
        //         // header.classList.add('bg-gray-700');
        //     } else {
        //         // header.classList.remove('shadow');
        //         // header.classList.remove('bg-gray-700');
        //         // header.classList.add('py-[10px]');
        //     }
        // }
    };

    useEffect(() => {
        isSticky();
    }, []);

    return (
        <div className="flex flex-col">
            <div
                className={
                    'w-full fixed  z-40 header-section transition-all ease-in ' +
                    (pathname != '/' ? 'bg-gray-700' : '')
                }
            >
                <div className="flex w-full lg:px-[175px] h-[90px] m-auto px-[20px] md:px-[30px] justify-between items-center ">
                    <Link
                        className="flex flex-col leading-[34px] justify-center italic font-bold text-white text-[42px]"
                        href="/"
                    >
                        <span>ШИР</span>
                        <span>МФТИ</span>
                    </Link>

                    <div className="flex mdd:hidden">
                        <BurgerIcon
                            mobileMenuShow={mobileMenuShow}
                            setMobileMenuShow={setMobileMenuShow}
                        />
                    </div>

                    <div className="justify-start items-center gap-x-[30px] hidden mdd:flex">
                        <Link
                            className="h-[90px] flex items-center justify-center"
                            href="/"
                        >
                            <div
                                className={
                                    'transition-all ease-linear text-center   text-[18px] hover:text-primary_grey text-text_default   tracking-tighter-[1.2px] ' +
                                    (activeLink == '/price'
                                        ? '!text-primary_grey'
                                        : '')
                                }
                            >
                                Все вызовы
                            </div>
                        </Link>
                        <Link
                            className="h-[90px] flex items-center justify-center"
                            href="/"
                        >
                            <div
                                className={
                                    'transition-all ease-linear text-center   text-[18px] hover:text-primary_grey text-text_default   tracking-tighter-[1.2px] ' +
                                    (activeLink == '/price'
                                        ? '!text-primary_grey'
                                        : '')
                                }
                            >
                                Вызоводатели
                            </div>
                        </Link>
                        <Link
                            className="h-[90px] flex items-center justify-center"
                            href="/"
                        >
                            <div
                                className={
                                    'transition-all ease-linear text-center   text-[18px] hover:text-primary_grey text-text_default   tracking-tighter-[1.2px] ' +
                                    (activeLink == '/price'
                                        ? '!text-primary_grey'
                                        : '')
                                }
                            >
                                Вызовополучатель
                            </div>
                        </Link>
                    </div>
                    <div className="max-w-[290px] justify-center items-center gap-2.5 hidden mdd:flex">
                        {userAuth == true ? (
                            <>
                                <Link href="/profile">
                                    <div className="text-[16px]  bg-primary_yellow   transition-all ease-linear hover:text-primary_grey    active:bg-primary_grey_opacity w-[150px] h-[38px] px-1.5 pt-[13px] pb-3 text-white rounded-[4px] bg-primary_grey border border-primary_grey justify-center items-center flex tracking-tighter-[1.2px]">
                                        Мой профиль
                                    </div>
                                </Link>
                                <div
                                    className="text-[16px] border-primary_yellow   transition-all ease-linear cursor-pointer hover:text-white   active:text-white  w-[130px] h-[38px] px-7 pt-3 pb-[11px] text-primary_grey  rounded-[4px] border border-primary_grey justify-center items-center flex tracking-tighter-[1.2px]"
                                    onClick={() => userLogout()}
                                >
                                    Выйти
                                </div>
                            </>
                        ) : (
                            <>
                                {' '}
                                <Link href="/login">
                                    <div className="text-[16px]  bg-primary_yellow  transition-all ease-linear w-[130px] h-[38px] px-7 pt-3 pb-[11px] text-primary_grey active:text-white  active:bg-primary_grey hover:text-primary_yellow  hover:bg-primary_grey  rounded-primary_radius border justify-center items-center flex tracking-tighter-[1.2px]">
                                        Войти
                                    </div>
                                </Link>
                                <Link href="/register">
                                    <div className="text-[16px] border-primary_yellow   transition-all ease-linear w-[150px] h-[38px] px-1.5 pt-[13px] pb-3 text-primary_grey bg-none rounded-primary_radius border active:bg-primary_grey_opacity active:text-primary_grey hover:text-primary_yellow hover:bg-white  border-primary_grey justify-center items-center flex tracking-tighter-[1.2px]">
                                        Регистрация
                                    </div>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {mobileMenuShow == true ? (
                <div className="w-full px-[20px] transition-all ease-linear">
                    <div className="justify-start items-start gap-[10px] flex flex-col p-[5px] shadow">
                        <Link
                            className="flex items-center justify-center"
                            href="/"
                        >
                            <div
                                className={
                                    'transition-all ease-linear text-center   text-[16px] hover:text-primary_grey text-text_default   tracking-tighter-[1.2px] ' +
                                    (activeLink == '/'
                                        ? '!text-primary_grey'
                                        : '')
                                }
                            >
                                Главная
                            </div>
                        </Link>
                        <Link
                            className="flex items-center justify-center"
                            href="/price"
                        >
                            <div
                                className={
                                    'transition-all ease-linear text-center   text-[16px] hover:text-primary_grey text-text_default   tracking-tighter-[1.2px] ' +
                                    (activeLink == '/price'
                                        ? '!text-primary_grey'
                                        : '')
                                }
                            >
                                Цены
                            </div>
                        </Link>
                        {/* <div className="text-center text-[12px] text_default  font-normal   tracking-wider">
                            Клиенты
                        </div> */}
                        <Link
                            className="flex items-center justify-center"
                            href="/contacts"
                        >
                            <div
                                className={
                                    'transition-all ease-linear text-center   text-[16px] hover:text-primary_grey text-text_default   tracking-tighter-[1.2px] ' +
                                    (activeLink == '/contacts'
                                        ? '!text-primary_grey'
                                        : '')
                                }
                            >
                                Контакты
                            </div>
                        </Link>
                        <div className="w-full justify-between items-center flex">
                            {userAuth == true ? (
                                <>
                                    <Link href="/profile">
                                        <div className="text-[16px]     transition-all ease-linear hover:text-primary_grey   hover:bg-white active:bg-primary_grey_opacity w-[150px] h-[38px] px-1.5 pt-[13px] pb-3 text-white bg-primary_grey rounded-[4px] border border-primary_grey justify-center items-center flex tracking-tighter-[1.2px]">
                                            Личный кабинет
                                        </div>
                                    </Link>
                                    <div
                                        className="text-[16px]     transition-all ease-linear cursor-pointer hover:text-white  hover:bg-primary_grey active:text-white  active:bg-primary_grey w-[130px] h-[38px] px-7 pt-3 pb-[11px] text-primary_grey bg-white rounded-[4px] border border-primary_grey justify-center items-center flex tracking-tighter-[1.2px]"
                                        onClick={() => userLogout()}
                                    >
                                        Выйти
                                    </div>
                                </>
                            ) : (
                                <>
                                    {' '}
                                    <Link href="/login">
                                        <div className="text-[16px]     transition-all ease-linear w-[130px] h-[38px] px-7 pt-3 pb-[11px] text-primary_grey bg-white active:text-white  active:bg-primary_grey hover:text-white  hover:bg-primary_grey  rounded-[4px] border border-primary_grey justify-center items-center flex tracking-tighter-[1.2px]">
                                            Войти
                                        </div>
                                    </Link>
                                    <Link href="/register">
                                        <div className="text-[16px]      transition-all ease-linear w-[150px] h-[38px] px-1.5 pt-[13px] pb-3 text-white bg-primary_grey rounded-[4px] border active:bg-primary_grey_opacity active:text-primary_grey hover:text-primary_grey hover:bg-white  border-primary_grey justify-center items-center flex tracking-tighter-[1.2px]">
                                            Регистрация
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
            {pathname == '/' ? (
                <div className="bg-main-bg w-full pt-[200px] bg-cover">
                    <div className="w-full flex justify-start lg:px-[255px] flex-col gap-[30px] py-[60px] ">
                        <div className="flex flex-col w-fit">
                            <h1 className="text-[120px] font-extrabold leading-[130px] text-primary_grey">
                                Вызовы ШИР
                            </h1>
                            <span className="text-end text-white opacity-70">
                                Платформа Вызовы ШИР
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex w-[450px] gap-[30px] justify-center items-center ">
                                <div className="w-[50px] bg-primary_grey h-[100px]"></div>
                                <h2 className="text-[18px]  text-white opacity-70">
                                    Платформа Вызовы ШИР создается для
                                    размещения в сети интернет и предоставления
                                    пользователям удобного функционала для
                                    размещения и взятия “Вызовов”.
                                </h2>
                            </div>
                        </div>
                        <div className="">
                            <button className="text-[16px] shadow-yellow text-white bg-primary_yellow py-[10px] px-[15px] rounded-primary_radius">
                                Начать сейчас бесплатно
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
