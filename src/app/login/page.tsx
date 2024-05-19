/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { CommonContext } from '@/Common/context';
import {
    loaderSvg,
    store_albi_userauth_bool,
    storeToken,
} from '@/Common/function';
import MainHeader from '@/Components/MainHeader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { signIn, SignInResponse } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function Page() {
    const router = useRouter();
    const { data: session }: any = useSession();

    const getConf = async (accessToken: any) => {
        await storeToken(accessToken);
        await store_albi_userauth_bool('true');
        setUserAuth(true);
        router.push('/');
    };

    useEffect(() => {
        if (session?.accessToken != null && session?.accessToken != '') {
            getConf(session?.accessToken);
        }
    }, [session]);

    const { setUserAuth } = useContext(CommonContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(false);

    const login = async () => {
        setLoader(true);
        const form = new FormData();
        form.append('email', email);
        form.append('password', password);

        const response: SignInResponse | undefined = await signIn(
            'credentials',
            {
                email: form.get('email'),
                password: form.get('password'),
                redirect: false,
            },
        );

        if (!!response && response.error) {
            setLoader(false);
            switch (response.error) {
                case 'SessionRequired':
                    router.push('/');
                    break;
                default:
                    try {
                        toast.error(JSON.parse(response.error).errors);
                    } catch (e) {
                        console.error(e);
                    }
                    break;
            }
        }
        setLoader(false);
    };

    const [typeUser, setTypeUser] = useState(0);

    return (
        <div className="flex flex-col gap-[5px]">
            <div className="w-full  flex flex-col gap-[5px] ">
                <MainHeader />
                <div className="flex w-full mt-[100px] md:max-w-[1200px] m-auto px-[20px] md:px-[30px] py-[15px] md:py-[45px] justify-center">
                    <div className="flex flex-col gap-[20px] w-full md:max-w-[400px]">
                        <h2 className="text-[18px] font-semibold text-center">
                            Войти
                        </h2>
                        <div className="flex flex-col gap-[20px]">
                            <div className="flex border">
                                <div
                                    className={
                                        'w-1/2 cursor-pointer  flex gap-[5px] rounded-[5px] justify-center items-center px-[5px] py-[10px] ' +
                                        (typeUser == 0 ? 'bg-gray-700' : '')
                                    }
                                    onClick={() => {
                                        setTypeUser(0);
                                    }}
                                >
                                    <svg
                                        className="fill-primary_yellow"
                                        height={25}
                                        viewBox="0 0 640 512"
                                        width={25}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z" />
                                    </svg>
                                    <span
                                        className={
                                            ' font-normal text-[15px] ' +
                                            (typeUser == 0 ? 'text-white' : '')
                                        }
                                    >
                                        Студенты
                                    </span>
                                </div>
                                <div
                                    className={
                                        'w-1/2 cursor-pointer  flex gap-[5px] rounded-[5px] justify-center items-center px-[5px] py-[10px] ' +
                                        (typeUser == 1 ? 'bg-gray-700' : '')
                                    }
                                    onClick={() => {
                                        setTypeUser(1);
                                    }}
                                >
                                    <svg
                                        className="fill-primary_yellow"
                                        height={25}
                                        viewBox="0 0 640 512"
                                        width={25}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z" />
                                    </svg>
                                    <span
                                        className={
                                            ' font-normal text-[15px] ' +
                                            (typeUser == 1 ? 'text-white' : '')
                                        }
                                    >
                                        Вызоводатель
                                    </span>
                                </div>
                            </div>
                            <input
                                className="w-full md:max-w-[400px] h-[50px] p-[20px] rounded-[10px] border text-[16px] outline-none"
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email"
                                type="text"
                                value={email}
                            />

                            <input
                                className="w-full md:max-w-[400px] h-[50px] p-[20px] rounded-[10px] border text-[16px] outline-none"
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Пароль"
                                type="password"
                                value={password}
                            />
                        </div>
                        <></>
                        <button
                            className="flex justify-center items-center px-[20px] w-full md:max-w-[400px] h-[50px] rounded-[10px] bg-primary_yellow border text-[#FFF] text-[16px] font-normal hover:active:bg-[#FFF] hover:active:text-primary2 transition-all ease-in-out"
                            disabled={loader}
                            onClick={() => login()}
                        >
                            Войти
                            {loader ? (
                                <div className="flex items-center pl-1">
                                    {loaderSvg()}
                                </div>
                            ) : null}
                        </button>
                        <div className="flex gap-[10px] items-center justify-center">
                            <p>Нет акаунта Шторм-трек?</p>
                            <Link className="text-blue-500" href="register">
                                Зарегистрироваться
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
