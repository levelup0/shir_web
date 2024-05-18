/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { CommonContext } from '@/Common/context';
import { removeToken, store_albi_userauth_bool } from '@/Common/function';
import { requestPostWithToken } from '@/Common/requests';
import { LOGOUT } from '@/Common/urls';
import BurgerIcon from '@/icons/BurgerIcon';
import LogoStormTrack from '@/icons/LogoStormTrack';
import LogOutIcon from '@/icons/LogOutIcon';
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
                <div className="flex lg:container h-[90px] m-auto px-[20px] md:px-[30px] justify-between items-center ">
                    <Link href="/">
                        <LogoStormTrack
                            color={'white'}
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
                    </div>

                    <div className="max-w-[290px] justify-center items-center gap-2.5 hidden lg:flex">
                        {userAuth == true ? (
                            <>
                                <Link href="/profile">
                                    <div
                                        className={
                                            'w-[150px] h-[38px] flex justify-center items-center text-[18px] rounded-[10px] text-white hover:bg-primary_yellow transition-all' +
                                            (activeLink == '/profile'
                                                ? ' bg-primary_yellow'
                                                : '')
                                        }
                                    >
                                        Мой профиль
                                    </div>
                                </Link>
                                <button
                                    className="w-[38px] h-[38px] transition-all cursor-pointer rounded-[10px] justify-center items-center flex hover:bg-primary_yellow"
                                    onClick={() => userLogout()}
                                >
                                    <LogOutIcon
                                        className="fill-white"
                                        height={25}
                                        width={25}
                                    />
                                </button>
                            </>
                        ) : (
                            <>
                                {' '}
                                <Link href="/login">
                                    <div className="text-[16px]  bg-primary_yellow  transition-all ease-linear w-[130px] h-[38px] px-7 pt-3 pb-[11px] text-white active:text-white  active:bg-primary_grey hover:text-primary_yellow  hover:bg-primary_grey  rounded-[10px] justify-center items-center flex tracking-tighter-[1.2px]">
                                        Войти
                                    </div>
                                </Link>
                                <Link href="/register">
                                    <div className="text-[16px] border-primary_yellow   transition-all ease-linear w-[150px] h-[38px] px-1.5 pt-[13px] pb-3 text-primary_grey bg-none rounded-[10px] active:bg-primary_grey_opacity active:text-primary_grey hover:text-primary_yellow hover:bg-white justify-center items-center flex tracking-tighter-[1.2px]">
                                        Регистрация
                                    </div>
                                </Link>
                            </>
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
                        "fixed top-0 right-0 bg-gray-600 z-0 mt-[80px] w-[230px] h-[250px] pt-[20px] pb-[20px] pr-[35px] rounded-[10px] transition-all ease-linear bg:white lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col justify-between items-center"
                    }
                >
                    <Link
                        className="w-[200px] h-[38px] flex items-center justify-end"
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
                    <Link
                        className="w-[200px] h-[38px] flex items-center justify-end"
                        href="/"
                    >
                        <div
                            className={
                                'transition-all ease-linear text-center   text-[18px] hover:text-primary_grey text-white   tracking-tighter-[1.2px] ' +
                                (activeLink == '/' ? '!text-primary_grey' : '')
                            }
                        >
                            Все вызовы
                        </div>
                    </Link>

                    <Link
                        className="w-[200px] h-[38px] flex items-center justify-end"
                        href="/recipient"
                    >
                        <div
                            className={
                                'transition-all ease-linear text-center   text-[18px] hover:text-primary_grey text-white   tracking-tighter-[1.2px] ' +
                                (activeLink == '/recipient'
                                    ? '!text-primary_grey'
                                    : '')
                            }
                        >
                            Вызовополучатели
                        </div>
                    </Link>

                    <Link
                        className="w-[200px] h-[38px] flex items-center justify-end"
                        href="/caller"
                    >
                        <div
                            className={
                                'transition-all ease-linear text-center   text-[18px] hover:text-primary_grey text-white   tracking-tighter-[1.2px] ' +
                                (activeLink == '/caller'
                                    ? '!text-primary_grey'
                                    : '')
                            }
                        >
                            Вызоводатели
                        </div>
                    </Link>

                    <Link href={userAuth == true ? '/profile' : '/login'}>
                        <div
                            className={
                                'w-[200px] h-[38px] flex justify-end items-center text-[18px] rounded-[10px] text-white hover:text-primary_grey transition-all' +
                                (activeLink == '/profile'
                                    ? ' bg-primary_yellow'
                                    : '')
                            }
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
                        <Link href="/register">
                            <div
                                className={
                                    'w-[200px] h-[38px] flex justify-end items-center text-[18px] rounded-[10px] text-white hover:text-primary_grey transition-all' +
                                    (activeLink == '/profile'
                                        ? ' bg-primary_yellow'
                                        : '')
                                }
                            >
                                Регистрация
                            </div>
                        </Link>
                    )}
                </div>
            ) : null}
        </div>
    );
}
