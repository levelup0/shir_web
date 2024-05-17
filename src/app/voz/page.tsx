/* eslint-disable @typescript-eslint/no-explicit-any */
// import Heading2 from '@/common/Heading2';
// import { getNewsById } from '@/services/news';
'use client';
import AvatarComponent from '@/Common/AvatarComponent';
import {
    commonRequestAproveWithToken,
    getcommonDataById,
} from '@/Common/commonRequest';
import { APROVE, GETUSER, VOZ_MAIN } from '@/Common/urls';
import MainHeader from '@/Components/MainHeader';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { requestGet, requestPostWithToken } from '@/Common/requests';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { formatDateWithoutTime } from '@/Common/function';

export default function Page() {
    const searchParams = useSearchParams();
    const _voz_id: any = searchParams.get('voz_id');
    const [data, setData] = useState<any>();
    const [myAprove, setMyAprove] = useState<any>(false);

    const getMyAprove = async (user_id: any) => {
        const response = await commonRequestAproveWithToken(
            APROVE,
            user_id,
            _voz_id,
            'in_progress',
        );
        console.log('response myaprove', response);
        if (response?.success == true) {
            if (response?.data?.data?.length == 0) {
                setMyAprove(false);
            } else {
                setMyAprove(true);
            }
        }
    };

    const getUser = () => {
        requestGet(`${GETUSER}`, {}).then(response => {
            if (response?.success == true) {
                setData(response?.user);
                if (response?.user?.roles?.name == 'recipient') {
                    getMyAprove(response?.user?.id);
                }
            }
        });
    };

    const [response, setResponse] = useState<any>();

    const getData = async () => {
        const res: any = await getcommonDataById(VOZ_MAIN, _voz_id);
        setResponse(res);
    };
    useEffect(() => {
        getData();
        getUser();
    }, []);

    const apply = async () => {
        // Сначало проверям пользователь авторизован или нет
        if (typeof data == 'undefined' || data == null || data == '') {
            toast.error('Пользователь не авторизован!');
            return;
        }
        if (data?.roles?.name === 'caller') {
            toast.error('Вызоводатели не могут предложить услуги');
            return;
        }
        if (data?.roles?.name === 'recipient') {
            const form = new FormData();
            form.append('user_id', data?.id);
            form.append('voz_id', _voz_id);
            form.append('status', 'in_progress');

            const response = await requestPostWithToken(APROVE, form);
            if (response?.success == true) {
                toast.success(response?.msg);
                getMyAprove(data?.id);
            } else {
                toast.error(response?.msg);
            }
        }
    };

    return (
        <div className="flex flex-col">
            <MainHeader />
            <div className="w-full mt-[90px] flex justify-center items-center py-[20px]">
                <div className="w-[1140px] m-auto  flex gap-[10px] flex-col ">
                    <div className="w-full shadow flex flex-col justify-between gap-[30px] px-[30px] py-[30px] bg-white rounded-[5px] ">
                        <Link
                            className="font-light bg-primary_grey w-fit px-[10px] py-[2px] rounded-[4px] text-white"
                            href="/"
                        >
                            Назад
                        </Link>
                        <div className="w-full flex flex-col gap-[30px]">
                            <h2 className="font-semibold text-[18px]">
                                {response?.data?.name}
                            </h2>
                            <p className="text-[16px] font-light">
                                {response?.data?.description}
                            </p>
                            <div className="flex gap-[10px]">
                                <div className="w-[80px] h-[80px] shadow">
                                    {response?.data?.user != null &&
                                        response?.data?.user?.avatar !=
                                            null && (
                                            <AvatarComponent
                                                resultImage={
                                                    response?.data?.user?.avatar
                                                }
                                            />
                                        )}
                                </div>
                                <div className="w-full flex justify-between">
                                    <div className="flex flex-col gap-[5px]">
                                        <div className="flex text-[15px]">
                                            Вызоводатель:{' '}
                                            <span className="text-primary_blue font-semibold">
                                                {response?.data?.user?.name}
                                            </span>
                                        </div>
                                        <div className="flex text-[15px]">
                                            Категория:{'   '}
                                            <span className="text-primary_blue font-semibold">
                                                {response?.data?.category?.name}
                                            </span>
                                        </div>
                                        <div className="flex text-[15px]">
                                            Дата размещения:{'   '}
                                            <span className="text-primary_blue font-semibold">
                                                {response?.data != null &&
                                                    formatDateWithoutTime(
                                                        response?.data
                                                            ?.publish_date,
                                                    )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className=" flex items-end justify-end">
                                        {myAprove == false &&
                                        data?.roles?.name != 'caller' ? (
                                            <button
                                                className="w-fit self-end h-[40px] rounded-[4px] bg-green-500 hover:bg-green-600 active:bg-green-900 font-normal text-white py-[1px] px-[10px]"
                                                onClick={() => apply()}
                                            >
                                                Подать заявку
                                            </button>
                                        ) : null}

                                        {myAprove == true ? (
                                            <button
                                                className="w-fit self-end h-[40px] rounded-[4px] bg-black opacity-30 cursor-not-allowed font-normal text-white py-[1px] px-[10px]"
                                                disabled
                                            >
                                                Заявка отправлена
                                            </button>
                                        ) : null}
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
