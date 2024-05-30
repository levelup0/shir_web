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
        <div className="flex flex-col ">
            <div
                className={
                    'w-full fixed header-section transition-all ease-in bg-gray-700 z-10'
                }
            >
                <div className="flex w-[1140px] h-[90px] m-auto md:px-[1px] justify-between items-center ">
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
                                    'transition-all ease-linear text-center text-[18px] hover:text-primary_grey text-white tracking-tighter-[1.2px] ' +
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
                                            'transition-all ease-linear text-center text-[18px] hover:text-primary_grey text-white tracking-tighter-[1.2px] ' +
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
                                            'transition-all ease-linear text-center text-[18px] hover:text-primary_grey text-white tracking-tighter-[1.2px] ' +
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
                                            'transition-all ease-linear text-center text-[18px] hover:text-primary_grey text-white tracking-tighter-[1.2px] ' +
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
                            className="flex items-center justify-end"
                            href={userAuth == true ? '/profile' : '/login'}
                        >
                            <div
                                className={` flex gap-[5px] justify-center items-center
                                    transition-all whitespace-nowrap px-[8px] py-[5px] ease-linear text-center rounded-[4px] text-[18px] hover:bg-primary_yellow text-white
                                    ${activeLink === '/login' || activeLink === '/profile' ? 'bg-primary_yellow ' : ''}
                                `}
                            >
                                {userAuth == true ? (
                                    <svg
                                        className="fill-gray-100"
                                        height={18}
                                        viewBox="0 0 448 512"
                                        width={18}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                    </svg>
                                ) : null}

                                {userAuth == true ? 'Мой профиль' : 'Войти'}
                            </div>
                        </Link>

                        {userAuth == true ? (
                            <button
                                className="flex gap-[5px] justify-center items-center transition-all whitespace-nowrap px-[8px] py-[5px] ease-linear text-center rounded-[4px] text-[18px] hover:bg-primary_yellow text-white"
                                onClick={() => userLogout()}
                            >
                                <svg
                                    className="fill-gray-100"
                                    height={18}
                                    viewBox="0 0 512 512"
                                    width={18}
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                                </svg>
                                Выход
                            </button>
                        ) : (
                            <Link
                                className="flex items-center justify-end"
                                href="/register"
                            >
                                <button
                                    className={`
                                        transition-all ease-linear text-center whitespace-nowrap px-[5px] py-[5px] rounded-[4px] text-[18px] hover:bg-primary_yellow text-white 
                                        ${activeLink === '/register' ? '!bg-primary_yellow ' : ''}
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
                        "fixed top-0 right-0 bg-gray-600 z-0 mt-[80px] w-[230px] pt-[20px] pb-[20px] pr-[40px] rounded-[4px] transition-all ease-linear bg:white lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col justify-between items-center"
                    }
                >
                    <Link
                        className="w-[200px] h-[38px] flex items-center justify-end"
                        href="/about"
                    >
                        <div
                            className={`
                                transition-all ease-linear text-center rounded-[4px] text-[18px] hover:text-primary_grey text-white
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
                                    transition-all ease-linear text-center rounded-[4px] text-[18px] hover:text-primary_grey text-white
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
                                    transition-all ease-linear text-center rounded-[4px] text-[18px] hover:text-primary_grey text-white
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
                                    transition-all ease-linear text-center rounded-[4px] text-[18px] hover:text-primary_grey text-white
                                    ${activeLink === '/caller' ? '!text-primary_grey' : ''}
                                `}
                                >
                                    Вызоводатели
                                </div>
                            </Link>
                        </>
                    ) : null}

                    <Link
                        className="flex items-center justify-end"
                        href={userAuth == true ? '/profile' : '/login'}
                    >
                        <div
                            className={`
                                transition-all ease-linear text-center  rounded-[4px] text-[18px] hover:bg-primary_yellow text-white
                                ${activeLink === '/login' || activeLink === '/profile' ? 'bg-primary_yellow ' : ''}
                            `}
                        >
                            {userAuth == true ? 'Мой профиль' : 'Войти'}
                        </div>
                    </Link>

                    {userAuth == true ? (
                        <button
                            className="w-[200px] h-[38px] transition-all cursor-pointer rounded-[4px] justify-end items-center flex"
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
                                    transition-all ease-linear text-center hover:px-3 rounded-[4px] text-[18px] hover:bg-white text-white hover:text-black
                                    ${activeLink === '/register' ? '!bg-white !text-black !px-3' : ''}
                                `}
                            >
                                Студенты
                            </button>
                        </Link>
                    )}
                </div>
            ) : null}
        </div>
    );
}
