/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { formatDateWithoutTime } from '@/Common/function';
import { getDataById } from '@/Common/requests';
import { CONTACT_ASSETS, USERS } from '@/Common/urls';
import AvatarComponent from '@/Components/AvatarComponent';
import MainHeader from '@/Components/MainHeader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page({ params: { id } }: any) {
    const router = useRouter();
    const [response, setResponse] = useState<any>();

    const getData = async () => {
        const response = await getDataById(id, USERS);
        setResponse(response);
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="flex flex-col">
            <MainHeader />
            <div className="w-full mt-[90px] flex justify-center items-center py-[20px]">
                <div className="w-[1140px] m-auto  flex gap-[10px] flex-col ">
                    <div className="w-full shadow flex flex-col justify-between gap-[30px] px-[30px] py-[30px] bg-white rounded-[5px] ">
                        <div
                            className="font-light cursor-pointer bg-primary_grey w-fit px-[10px] py-[2px] rounded-[4px] text-white"
                            onClick={() => router.back()}
                        >
                            Назад
                        </div>
                        <div className="w-full flex flex-col gap-[30px]">
                            <h2 className="font-semibold text-[18px]">
                                {response?.data?.name}
                            </h2>
                            <p className="text-[16px] font-light">
                                {response?.data?.interes}
                            </p>
                            <div className="flex gap-[15px]">
                                {response?.data?.cv?.length > 0 ? (
                                    <span className="text-[14px] font-light">
                                        Файлы:
                                    </span>
                                ) : null}
                                <div className="text-[14px] font-light w-full flex gap-[5px]">
                                    {response?.data?.cv != null &&
                                        response?.data?.cv?.length > 0 &&
                                        response?.data?.cv?.map(
                                            (v: any, i: number) => {
                                                return (
                                                    <div key={i}>
                                                        <Link
                                                            className="bg-blue-400 w-full z-20 text-white rounded-[5px] px-[10px] py-[8px] hover:bg-blue-700 "
                                                            href={`${process.env.NEXT_PUBLIC_API_URL}api/v1/${CONTACT_ASSETS}/${v?.src}`}
                                                            target="_blank"
                                                        >
                                                            {v?.name}
                                                        </Link>
                                                    </div>
                                                );
                                            },
                                        )}
                                </div>
                            </div>
                            <div className="flex gap-[10px]">
                                <div className="w-[80px] h-[80px] shadow">
                                    {response?.data != null &&
                                        response?.data?.avatar != null && (
                                            <AvatarComponent
                                                resultImage={
                                                    response?.data?.avatar
                                                }
                                            />
                                        )}
                                </div>
                                <div className="w-full flex-col flex md:flex-row ">
                                    <span className="w-fit h-[40px] flex justify-center items-center text-[14px] font-light py-[10px] text-black rounded-[5px]"></span>
                                    <div className="flex flex-col">
                                        <span className="flex gap-[5px] text-[14px] ">
                                            ВУЗ:{' '}
                                            <span className="font-semibold">
                                                {response?.data?.vuz},
                                            </span>
                                            <span className="font-semibold">
                                                {response?.data
                                                    ?.education_course +
                                                    ' курс'}
                                            </span>
                                        </span>
                                        <span className="text-[14px] ">
                                            Дата рождение:{' '}
                                            <span className="font-semibold">
                                                {formatDateWithoutTime(
                                                    response?.data?.date_birth,
                                                )}
                                            </span>
                                        </span>
                                        <span className="text-[14px] ">
                                            Телеграм:{' '}
                                            <span className="font-semibold">
                                                {response?.data?.url_telegram}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
