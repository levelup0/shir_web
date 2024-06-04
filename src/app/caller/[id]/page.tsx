/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { getDataById } from '@/Common/requests';
import { CONTACT_ASSETS_VOZ_FILES, USERS } from '@/Common/urls';
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
                                {response?.data?.action_sector != null
                                    ? response?.data?.action_sector
                                    : ''}
                            </p>
                            <div className="flex gap-[15px]">
                                {response?.data?.voz_file?.length > 0 ? (
                                    <span className="text-[14px] font-light">
                                        Файлы:
                                    </span>
                                ) : null}
                                <div className="text-[14px] font-light w-full flex gap-[5px]">
                                    {response?.data?.voz_file != null &&
                                        response?.data?.voz_file?.length > 0 &&
                                        response?.data?.voz_file?.map(
                                            (v: any, i: number) => {
                                                return (
                                                    <div key={i}>
                                                        <Link
                                                            className="bg-blue-400 w-full z-20 text-white rounded-[5px] px-[10px] py-[8px] hover:bg-blue-700 "
                                                            href={`${process.env.NEXT_PUBLIC_API_URL}api/v1/${CONTACT_ASSETS_VOZ_FILES}/${v?.src}`}
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
                                <div className="w-full gap-[10px] md:gap-[0px] flex-col flex md:flex-row justify-start md:justify-between ">
                                    <div className="flex flex-col gap-[5px]">
                                        <div className="flex gap-[5px] text-[15px]">
                                            <span>Компания:</span>
                                            <span className="text-primary_blue font-semibold">
                                                {response?.data?.company}
                                            </span>
                                        </div>
                                        <div className="flex gap-[5px] text-[15px]">
                                            <span>Категория:</span>

                                            <div className="flex gap-[5px]">
                                                {response?.data?.category_voz
                                                    ?.length > 0 &&
                                                    response?.data?.category_voz?.map(
                                                        (v: any, i: number) => {
                                                            return (
                                                                <span
                                                                    className="w-fit text-[14px] font-light bg-blue-100 px-[2px] py-[2px] text-blue-700 rounded-[5px]"
                                                                    key={i}
                                                                >
                                                                    {
                                                                        v
                                                                            ?.category
                                                                            ?.name
                                                                    }
                                                                </span>
                                                            );
                                                        },
                                                    )}
                                            </div>
                                        </div>
                                        <div className="flex gap-[5px] text-[15px]">
                                            <span>Эл почта:</span>
                                            <span className="text-primary_blue font-semibold">
                                                {response?.data != null &&
                                                    response?.data?.email}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-end md:justify-end"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
