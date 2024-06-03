/* eslint-disable @typescript-eslint/no-explicit-any */
// import Heading2 from '@/common/Heading2';
// import { getNewsById } from '@/services/news';
'use client';
import AvatarComponent from '@/Components/AvatarComponent';
import {
    commonRequestAproveWithToken,
    getcommonDataById,
} from '@/Common/commonRequest';
import {
    APROVE,
    CONTACT_ASSETS_VOZ_FILES,
    GETUSER,
    VOZ_MAIN,
} from '@/Common/urls';
import MainHeader from '@/Components/MainHeader';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { requestGet, requestPostWithToken } from '@/Common/requests';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    formatDateWithoutTime,
    is_user_logged_in,
    loaderSvg,
} from '@/Common/function';
export default function Page() {
    const searchParams = useSearchParams();
    const _voz_id: any = searchParams.get('voz_id');
    const [data, setData] = useState<any>();
    const [myAprove, setMyAprove] = useState<any>(false);
    const [status, setStatus] = useState<any>('');

    const router = useRouter();

    const getMyAprove = async (user_id: any) => {
        const response = await commonRequestAproveWithToken(
            APROVE,
            user_id,
            _voz_id,
        );

        if (response?.success == true) {
            if (response?.data?.data?.length == 0) {
                setMyAprove(false);
            } else {
                if (
                    response?.data?.data[0].status == 'in_progress' ||
                    response?.data?.data[0].status == 'approved'
                ) {
                    setStatus(response?.data?.data[0].status);
                }
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
        if (!is_user_logged_in()) {
            router.push('/about');
        } else {
            getData();
            getUser();
        }
    }, []);

    const [detail, setDetail] = useState<any>();

    const apply = async () => {
        setLoader(true);

        if (typeof data == 'undefined' || data == null || data == '') {
            toast.error('Пользователь не авторизован!');
            setLoader(false);

            return;
        }
        if (data?.roles?.name === 'caller') {
            toast.error('Вызоводатели не могут предложить услуги');
            setLoader(false);

            return;
        }
        if (data?.roles?.name === 'recipient') {
            const form = new FormData();
            form.append('user_id', data?.id);
            form.append('voz_id', _voz_id);
            form.append('status', 'in_progress');

            const response = await requestPostWithToken(APROVE, form);
            if (response?.success == true) {
                setLoader(false);

                toast.success(response?.msg);
                getMyAprove(data?.id);
            } else {
                toast.error(response?.msg);
                setLoader(false);
            }
        }
    };

    const [showModal, setShowModal] = useState(false);

    const [loader, setLoader] = useState(false);
    const changeStatusPre = async () => {
        setShowModal(true);
    };

    const sendPurpose = async () => {
        await apply();
        setShowModal(false);
    };

    return (
        <div className="flex flex-col">
            <MainHeader />
            {showModal == true ? (
                <div className="absolute left-0 right-0 top-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center  overflow-y-auto  overflow-x-hidden text-center ">
                    <div className="relative max-h-full w-full max-w-[591px] p-4">
                        <div className="relative rounded-[8px] bg-white shadow-lg flex flex-col gap-[10px] ">
                            <div className="w-full flex justify-between items-center px-[12px] py-[5px]">
                                <h2 className="text-[22px] px-[5px] py-[2px] font-semibold font-nunito  text-[#252628] "></h2>
                                <button
                                    className="transition-all ease-linear ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => setShowModal(!showModal)}
                                    type="button"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="h-3 w-3"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="w-full justify-start items-center px-[18px]">
                                <div className="flex gap-[16px] flex-wrap w-full justify-start text-start">
                                    Напишите небольшое мотивационное письмо.
                                    Почему именно вы должны взяться за этот
                                    вызов? Какие ваши навыки и экспертиза
                                    поспособстуют его реализации?
                                </div>
                            </div>
                            <textarea
                                className="m-[18px] p-[8px] border rounded-[4px] text-[14px] font-nunito"
                                cols={2}
                                onChange={e => setDetail(e.target.value)}
                                placeholder=""
                                rows={2}
                                value={detail}
                            ></textarea>
                            <div className="w-full  flex gap-[10px] px-[20px] py-[10px] transition-all ease-linear">
                                <div
                                    className="py-[10px] transition-all ease-linear active:bg-[#5870ed] h-[56px] hover:text-white hover:bg-[#768aed] w-1/2 border border-[#cfcfcf] rounded-[4px]  flex flex-col justify-center items-center"
                                    onClick={() => setShowModal(!showModal)}
                                >
                                    <div className="select-none   py-[13px] w-1/2  flex flex-col justify-center items-center cursor-pointer">
                                        <p className="select-none font-nunito text-[16px]">
                                            Отменить
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={
                                        'transition-all ease-linear select-none py-[10px] rounded-[4px] h-[56px] w-1/2 bg-[#4E67EA] active:bg-[#5870ed] hover:bg-[#768aed] flex flex-col justify-center items-center cursor-pointer '
                                    }
                                    onClick={() => sendPurpose()}
                                >
                                    <p className="select-none font-nunito text-[16px]  text-white">
                                        {loader == true
                                            ? loaderSvg()
                                            : 'Отправить'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
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
                                {response?.data?.description}
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
                                <div className="w-full gap-[10px] md:gap-[0px] flex-col flex md:flex-row justify-start md:justify-between ">
                                    <div className="flex flex-col gap-[5px]">
                                        <div className="flex gap-[5px] text-[15px]">
                                            <span>Вызоводатель:</span>
                                            <Link
                                                className="text-primary_blue font-semibold hover:underline"
                                                href={`/caller/${response?.data?.user?.id}`}
                                            >
                                                {response?.data?.user?.name}
                                            </Link>
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
                                            <span>Дата размещения:</span>
                                            <span className="text-primary_blue font-semibold">
                                                {response?.data != null &&
                                                    formatDateWithoutTime(
                                                        response?.data
                                                            ?.publish_date,
                                                    )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-end md:justify-end">
                                        {data?.status != 'closed' ? (
                                            <>
                                                {myAprove == false &&
                                                data?.roles?.name !=
                                                    'caller' ? (
                                                    <button
                                                        className="w-fit self-end h-[40px] rounded-[4px] bg-green-500 hover:bg-green-600 active:bg-green-900 font-normal text-white py-[1px] px-[10px]"
                                                        onClick={() =>
                                                            changeStatusPre()
                                                        }
                                                    >
                                                        Подать заявку
                                                    </button>
                                                ) : null}

                                                {myAprove == true ? (
                                                    status == 'in_progress' ? (
                                                        <button
                                                            className="w-fit self-end h-[40px] rounded-[4px] bg-black opacity-30 cursor-not-allowed font-normal text-white py-[1px] px-[10px]"
                                                            disabled
                                                        >
                                                            Заявка отправлена
                                                        </button>
                                                    ) : null
                                                ) : null}

                                                {myAprove == true ? (
                                                    status == 'approved' ? (
                                                        <div className=" flex flex-col gap-[5px]">
                                                            <button
                                                                className="w-fit self-end h-[40px] rounded-[4px] bg-gray-500  opacity-100 cursor-not-allowed font-normal text-white py-[1px] px-[10px]"
                                                                disabled
                                                            >
                                                                Заявка принята
                                                            </button>
                                                            {myAprove ==
                                                            true ? (
                                                                status ==
                                                                'approved' ? (
                                                                    <button
                                                                        className="w-fit self-end h-[40px] rounded-[4px] text-gray-500 text-[14px]  opacity-100 cursor-not-allowed font-normal  py-[1px] px-[10px]"
                                                                        disabled
                                                                    >
                                                                        Письмо с
                                                                        инструкциями
                                                                        направлено
                                                                        на почту{' '}
                                                                        <span className="font-semibold">
                                                                            {
                                                                                data?.email
                                                                            }
                                                                        </span>
                                                                    </button>
                                                                ) : null
                                                            ) : null}
                                                        </div>
                                                    ) : null
                                                ) : null}
                                            </>
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
