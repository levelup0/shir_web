/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { CommonContext } from '@/Common/context';
import { removeToken, store_albi_userauth_bool } from '@/Common/function';
import { requestPostWithToken } from '@/Common/requests';
import { LOGOUT } from '@/Common/urls';
import BurgerIcon from '@/icons/BurgerIcon';
import LogOutIcon from '@/icons/LogOutIcon';
import StormtrackLogo from '@/icons/StormtrackLogo';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function MainHeader() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currentUser, setCurrentUser, userAuth, setUserAuth } =
        useContext(CommonContext);

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

    return (
        <div className="flex flex-col">
            <div
                className={
                    'w-full fixed header-section transition-all ease-in bg-gray-700 z-10'
                }
            >
                <div className="flex w-full lg:px-[175px] h-[90px] m-auto px-[20px] md:px-[30px] justify-between items-center ">
                    <Link
                        className="flex flex-col leading-[34px] justify-center italic font-bold text-white text-[42px]"
                        href="/"
                    >
                        <StormtrackLogo
                            className="text-white"
                            height={80}
                            width={200}
                        />
                    </Link>

                    <div className="justify-start items-center gap-x-[30px] hidden lg:flex">
                        <Link
                            className="h-[90px] flex items-center justify-center"
                            href="/about"
                        >
                            <div
                                className={
                                    'transition-all ease-linear text-center text-[18px] hover:text-primary_grey text-white tracking-tighter-[1.2px]' +
                                    (activeLink == '/about'
                                        ? '!text-primary_grey'
                                        : '')
                                }
                            >
                                О платформе
                            </div>
                        </Link>

                        {userAuth == true ? (
                            <>
                                <Link
                                    className="h-[90px] flex items-center justify-center"
                                    href="/"
                                >
                                    <div
                                        className={
                                            'transition-all ease-linear text-center text-[18px] hover:text-primary_grey text-white tracking-tighter-[1.2px]' +
                                            (activeLink == '/'
                                                ? '!text-primary_grey'
                                                : '')
                                        }
                                    >
                                        Все вызовы
                                    </div>
                                </Link>
                                <Link
                                    className="h-[90px] flex items-center justify-center"
                                    href="/caller"
                                >
                                    <div
                                        className={
                                            'transition-all ease-linear text-center text-[18px] hover:text-primary_grey text-white tracking-tighter-[1.2px]' +
                                            (activeLink == '/caller'
                                                ? '!text-primary_grey'
                                                : '')
                                        }
                                    >
                                        Вызоводатели
                                    </div>
                                </Link>
                                <Link
                                    className="h-[90px] flex items-center justify-center"
                                    href="/recipient"
                                >
                                    <div
                                        className={
                                            'transition-all ease-linear text-center text-[18px] hover:text-primary_grey text-white tracking-tighter-[1.2px]' +
                                            (activeLink == '/recipient'
                                                ? '!text-primary_grey'
                                                : '')
                                        }
                                    >
                                        Студенты
                                    </div>
                                </Link>
                            </>
                        ) : null}
                    </div>

                    <div className="max-w-[290px] justify-center items-center gap-2.5 hidden lg:flex">
                        <Link
                            className="w-[200px] h-[38px] flex items-center justify-end"
                            href={userAuth == true ? '/profile' : '/login'}
                        >
                            <div
                                className={`
                                    transition-all ease-linear text-center hover:px-3 rounded-[10px] text-[18px] hover:bg-primary_yellow text-white
                                    ${activeLink === '/login' || activeLink === '/profile' ? 'bg-primary_yellow !px-3' : ''}
                                `}
                            >
                                {userAuth == true ? 'Мой профиль' : 'Войти'}
                            </div>
                        </Link>

                        {userAuth == true ? (
                            <button
                                className="w-[200px] h-[38px] transition-all cursor-pointer rounded-[10px] justify-end items-center flex"
                                onClick={() => userLogout()}
                            >
                                <LogOutIcon
                                    className="cursor-pointer fill-white hover:fill-primary_grey"
                                    height={25}
                                    width={25}
                                />
                            </button>
                        ) : (
                            <Link
                                className="w-[200px] h-[38px] flex items-center justify-end"
                                href="/register"
                            >
                                <button
                                    className={`
                                        transition-all ease-linear text-center hover:px-3 rounded-[10px] text-[18px] hover:bg-white text-white hover:text-black
                                        ${activeLink === '/register' ? '!bg-white !text-black !px-3' : ''}
                                    `}
                                >
                                    Регистрация
                                </button>
                            </Link>
                        )}
                    </div>

                    <div className="flex lg:hidden">
                        <BurgerIcon
                            mobileMenuShow={mobileMenuShow}
                            setMobileMenuShow={setMobileMenuShow}
                        />
                    </div>
                </div>
            </div>
            {mobileMenuShow == true ? (
                <div
                    className={
                        "fixed top-0 right-0 bg-gray-600 z-0 mt-[80px] w-[230px] pt-[20px] pb-[20px] pr-[40px] rounded-[10px] transition-all ease-linear bg:white lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col justify-between items-center"
                    }
                >
                    <Link
                        className="w-[200px] h-[38px] flex items-center justify-end"
                        href="/about"
                    >
                        <div
                            className={`
                                transition-all ease-linear text-center rounded-[10px] text-[18px] hover:text-primary_grey text-white
                                ${activeLink === '/about' ? '!text-primary_grey' : ''}
                            `}
                        >
                            О платформе
                        </div>
                    </Link>

                    {userAuth == true ? (
                        <>
                            <Link
                                className="w-[200px] h-[38px] flex items-center justify-end"
                                href="/"
                            >
                                <div
                                    className={`
                                    transition-all ease-linear text-center rounded-[10px] text-[18px] hover:text-primary_grey text-white
                                    ${activeLink === '/' ? '!text-primary_grey' : ''}
                                `}
                                >
                                    Все вызовы
                                </div>
                            </Link>

                            <Link
                                className="w-[200px] h-[38px] flex items-center justify-end"
                                href="/recipient"
                            >
                                <div
                                    className={`
                                    transition-all ease-linear text-center rounded-[10px] text-[18px] hover:text-primary_grey text-white
                                    ${activeLink === '/recipient' ? '!text-primary_grey' : ''}
                                `}
                                >
                                    Вызовополучатели
                                </div>
                            </Link>

                            <Link
                                className="w-[200px] h-[38px] flex items-center justify-end"
                                href="/caller"
                            >
                                <div
                                    className={`
                                    transition-all ease-linear text-center rounded-[10px] text-[18px] hover:text-primary_grey text-white
                                    ${activeLink === '/caller' ? '!text-primary_grey' : ''}
                                `}
                                >
                                    Вызоводатели
                                </div>
                            </Link>
                        </>
                    ) : null}

                    <Link
                        className="w-[200px] h-[38px] flex items-center justify-end"
                        href={userAuth == true ? '/profile' : '/login'}
                    >
                        <div
                            className={`
                                transition-all ease-linear text-center hover:px-3 rounded-[10px] text-[18px] hover:bg-primary_yellow text-white
                                ${activeLink === '/login' || activeLink === '/profile' ? 'bg-primary_yellow !px-3' : ''}
                            `}
                        >
                            {userAuth == true ? 'Мой профиль' : 'Войти'}
                        </div>
                    </Link>

                    {userAuth == true ? (
                        <button
                            className="w-[200px] h-[38px] transition-all cursor-pointer rounded-[10px] justify-end items-center flex"
                            onClick={() => userLogout()}
                        >
                            <LogOutIcon
                                className="cursor-pointer fill-white hover:fill-primary_grey"
                                height={25}
                                width={25}
                            />
                        </button>
                    ) : (
                        <Link
                            className="w-[200px] h-[38px] flex items-center justify-end"
                            href="/register"
                        >
                            <button
                                className={`
                                    transition-all ease-linear text-center hover:px-3 rounded-[10px] text-[18px] hover:bg-white text-white hover:text-black
                                    ${activeLink === '/register' ? '!bg-white !text-black !px-3' : ''}
                                `}
                            >
                                Регистрация
                            </button>
                        </Link>
                    )}
                </div>
            ) : null}
        </div>
    );
}
