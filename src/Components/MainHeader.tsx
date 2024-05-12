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
        <div className="flex flex-col z-50">
            <div
                className={
                    'w-full fixed  header-section transition-all ease-in ' +
                    (pathname != '/' ? 'bg-gray-700' : 'bg-gray-700')
                }
            >
                <div className="flex w-full lg:px-[175px] h-[90px] m-auto px-[20px] md:px-[30px] justify-between items-center ">
                    <Link
                        className="flex flex-col leading-[34px] justify-center italic font-bold text-white text-[42px]"
                        href="/"
                    >
                        <svg
                            fill="none"
                            height={80}
                            viewBox="0 0 1045 397"
                            width={200}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clip-path="url(#clip0_2355_2)">
                                <path
                                    d="M81.8132 177L107.569 44.4339H135.976L115.144 151.434H152.073L172.905 44.4339H201.312L180.48 151.434H217.409L238.241 44.4339H266.648L240.893 177H81.8132ZM285.107 177L299.689 101.248H268.441L273.365 76.6285H362.374L357.45 101.248H326.202L311.62 177H285.107ZM404.382 178.894C389.737 178.894 378.311 175.106 370.105 167.531C362.024 159.956 357.984 149.54 357.984 136.283C357.984 117.219 363.161 102.195 373.513 91.2108C383.866 80.2268 396.555 74.7347 411.579 74.7347C426.224 74.7347 437.587 78.5223 445.667 86.0975C453.874 93.6727 457.977 104.089 457.977 117.345C457.977 136.41 452.8 151.434 442.448 162.418C432.095 173.402 419.406 178.894 404.382 178.894ZM404.382 155.221C411.453 155.221 417.702 152.254 423.131 146.32C428.686 140.26 431.464 131.549 431.464 120.186C431.464 112.99 429.57 107.561 425.782 103.899C421.995 100.238 417.26 98.4072 411.579 98.4072C404.509 98.4072 398.196 101.437 392.641 107.497C387.212 113.431 384.497 122.08 384.497 133.443C384.497 140.639 386.391 146.068 390.179 149.729C393.966 153.391 398.701 155.221 404.382 155.221ZM458.137 214.876L485.029 76.6285H507.754L508.512 87.0444H509.459C517.16 78.838 526.187 74.7347 536.54 74.7347C548.408 74.7347 557.687 78.333 564.379 85.5294C571.07 92.7258 574.416 102.7 574.416 115.451C574.416 134.263 569.745 149.54 560.402 161.281C551.185 173.023 539.444 178.894 525.177 178.894C517.35 178.894 511.163 177.694 506.618 175.296C502.199 172.771 498.412 169.235 495.255 164.69H494.308L484.65 214.876H458.137ZM521.39 155.221C528.334 155.221 534.457 152.254 539.76 146.32C545.188 140.26 547.903 131.549 547.903 120.186C547.903 112.99 546.009 107.561 542.221 103.899C538.434 100.238 533.699 98.4072 528.018 98.4072C521.074 98.4072 514.888 101.437 509.459 107.497C504.156 113.431 501.505 122.08 501.505 133.443C501.505 140.639 503.399 146.068 507.186 149.729C510.974 153.391 515.708 155.221 521.39 155.221ZM582.036 177L601.542 76.6285H637.524L647.561 136.283H648.508L682.028 76.6285H719.904L700.398 177H673.885L686.005 114.505H685.058L650.213 177H632.221L621.616 114.505H620.669L608.549 177H582.036Z"
                                    fill="white"
                                />
                                <path
                                    d="M426.967 84.9146L387.569 80.6066L445.427 49.8432L426.967 84.9146Z"
                                    fill="white"
                                />
                                <path
                                    d="M391.295 167.668L430.693 171.976L372.835 202.74L391.295 167.668Z"
                                    fill="white"
                                />
                                <path
                                    d="M554.166 319L568.748 243.248H537.5L542.424 218.629H631.433L626.509 243.248H595.261L580.679 319H554.166ZM619.19 356.876L646.082 218.629H668.807L669.565 229.044H670.512C678.213 220.838 687.24 216.735 697.593 216.735C709.461 216.735 718.741 220.333 725.432 227.529C732.123 234.726 735.469 244.7 735.469 257.451C735.469 276.263 730.798 291.54 721.455 303.281C712.238 315.023 700.497 320.894 686.23 320.894C678.403 320.894 672.216 319.694 667.671 317.296C663.252 314.771 659.465 311.235 656.308 306.69H655.361L645.703 356.876H619.19ZM682.443 297.221C689.387 297.221 695.51 294.254 700.813 288.32C706.241 282.26 708.956 273.549 708.956 262.186C708.956 254.99 707.062 249.561 703.274 245.899C699.487 242.238 694.752 240.407 689.071 240.407C682.127 240.407 675.941 243.437 670.512 249.497C665.209 255.431 662.558 264.08 662.558 275.443C662.558 282.639 664.452 288.068 668.239 291.729C672.027 295.391 676.761 297.221 682.443 297.221ZM793.653 320.894C779.008 320.894 767.582 317.106 759.375 309.531C751.295 301.956 747.255 291.54 747.255 278.283C747.255 259.219 752.431 244.195 762.784 233.211C773.137 222.227 785.825 216.735 800.85 216.735C814.864 216.735 825.911 220.459 833.991 227.908C842.198 235.357 846.301 245.836 846.301 259.345C846.301 262.123 846.048 265.027 845.543 268.057C845.165 271.087 844.786 273.423 844.407 275.064L843.839 277.336H773.768C774.147 283.902 776.167 288.889 779.828 292.297C783.616 295.58 788.224 297.221 793.653 297.221C796.683 297.221 800.029 296.401 803.69 294.759C807.478 293.118 810.445 290.782 812.591 287.752H842.134C837.716 298.231 831.024 306.375 822.06 312.182C813.222 317.99 803.753 320.894 793.653 320.894ZM776.988 257.451H820.356C819.598 251.896 817.452 247.667 813.917 244.763C810.382 241.859 805.837 240.407 800.281 240.407C795.863 240.407 791.444 241.859 787.025 244.763C782.606 247.667 779.26 251.896 776.988 257.451ZM853.869 319L873.375 218.629H899.888L891.177 263.133L936.817 218.629H969.012L917.69 268.814L950.642 319H920.152L889.283 272.602L880.382 319H853.869Z"
                                    fill="white"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_2355_2">
                                    <rect
                                        fill="white"
                                        height="397"
                                        width="1045"
                                    />
                                </clipPath>
                            </defs>
                        </svg>

                        {/* <span>ШИР</span>
                        <span>МФТИ</span> */}
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
                                    'transition-all ease-linear text-center   text-[18px] hover:text-primary_grey text-text_default   tracking-tighter-[1.2px] ' +
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
                                    'transition-all ease-linear text-center   text-[18px] hover:text-primary_grey text-text_default   tracking-tighter-[1.2px] ' +
                                    (activeLink == '/recipient'
                                        ? '!text-primary_grey'
                                        : '')
                                }
                            >
                                Вызовополучатели
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
                                    <div className="text-[16px]  bg-primary_yellow  transition-all ease-linear w-[130px] h-[38px] px-7 pt-3 pb-[11px] text-white active:text-white  active:bg-primary_grey hover:text-primary_yellow  hover:bg-primary_grey  rounded-[4px] border justify-center items-center flex tracking-tighter-[1.2px]">
                                        Войти
                                    </div>
                                </Link>
                                <Link href="/register">
                                    <div className="text-[16px] border-primary_yellow   transition-all ease-linear w-[150px] h-[38px] px-1.5 pt-[13px] pb-3 text-primary_grey bg-none rounded-[4px] border active:bg-primary_grey_opacity active:text-primary_grey hover:text-primary_yellow hover:bg-white  border-primary_grey justify-center items-center flex tracking-tighter-[1.2px]">
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
            {/* {pathname == '/' ? (
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
            ) : null} */}
        </div>
    );
}
