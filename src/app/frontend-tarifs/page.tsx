/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { commonRequest } from '@/Common/commonRequest';
import { toast } from 'react-toastify';
import { requestGet, requestPostWithToken } from '@/Common/requests';
import {
    BALANCE,
    BUY,
    CURRENCY,
    SUBSCRIPTION_MONTH,
    SUBSCRIPTIONS,
} from '@/Common/urls';
import Header from '@/Components/Header';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loaderSvg } from '@/Common/function';

export default function Page() {
    const [activeLink, setActiveLink] = useState('');
    const pathname = usePathname();
    useEffect(() => {
        setActiveLink(pathname);
    }, [pathname]);

    const [data, setData] = useState<any>([]);
    const [selectedData, setSelectedData] = useState('');

    const [currecies, setCurrencies] = useState<any>([]);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('');

    const [subscriptionMonth, setSubscriptionMonth] = useState<any>([]);
    const [selectedSubscriptionMonth, setSelectedSubscriptionMonth] =
        useState('');

    const [countOperators, setCountOperators] = useState<any>(0);

    const [totalPrice, setTotalPrice] = useState(0);

    const [balance, setBalance] = useState<any>([]);
    const [selectedBalance, setSelectedBalance] = useState<any>('');
    const [loader, setLoader] = useState(false);

    const getData = async () => {
        const subscriptions = await commonRequest(SUBSCRIPTIONS);
        if (subscriptions?.data?.data?.length > 0) {
            setData(subscriptions?.data?.data);
            setSelectedData(subscriptions?.data?.data[0].id);
        }
    };

    const getCurrency = async () => {
        const currency = await requestGet(CURRENCY);
        if (currency?.data?.data?.length > 0) {
            setCurrencies(currency?.data?.data);
            setSelectedCurrency(currency?.data?.data[0]?.id);
            setSelectedCurrencyCode(currency?.data?.data[0]?.symbol_left);

            getData();
        }
    };

    const getSubscriptionMonth = async () => {
        const subscriptionMonth = await requestGet(SUBSCRIPTION_MONTH);
        if (subscriptionMonth?.data?.data?.length > 0) {
            setSubscriptionMonth(subscriptionMonth?.data?.data);
            setSelectedSubscriptionMonth(subscriptionMonth?.data?.data[0].id);
        }
    };

    const getBalances = async () => {
        const _balance = await requestGet(BALANCE);
        if (_balance?.data?.length > 0) {
            setBalance(_balance?.data);
            getCurrency();
        }
    };

    useEffect(() => {
        getBalances();
        getSubscriptionMonth();
    }, []);

    useEffect(() => {
        const filteredBalance = balance?.filter(
            (value: any) => value?.currency_id == selectedCurrency,
        );

        if (filteredBalance.length > 0) {
            setSelectedBalance(filteredBalance[0]);
        }
    }, [selectedCurrency]);

    const upperCountOperator = () => {
        let _countOperators = countOperators;
        _countOperators = _countOperators + 1;
        setCountOperators(_countOperators);
    };

    const downCountOperator = () => {
        if (countOperators == 0) {
            return;
        }
        let _countOperators = countOperators;
        _countOperators = _countOperators - 1;
        setCountOperators(_countOperators);
    };

    useEffect(() => {
        if (selectedData == null || selectedData == '') {
            return;
        }

        if (selectedCurrency == null || selectedCurrency == '') {
            return;
        }

        if (
            selectedSubscriptionMonth == null ||
            selectedSubscriptionMonth == ''
        ) {
            return;
        }

        const findedData: any = data?.filter(
            (value: any) => value?.id == selectedData,
        );

        console.log('findedData');
        console.log(findedData);
        const findedPrice: any = findedData[0]?.subscription_price?.filter(
            (value: any) => value?.currency_id == selectedCurrency,
        );
        console.log('findedData');
        console.log(findedPrice);

        const _parsedFindedPrice: number = parseFloat(findedPrice[0].summ);

        const findedSubscriptionMonth: any = subscriptionMonth?.filter(
            (value: any) => value?.id == selectedSubscriptionMonth,
        );

        console.log('findedSubscriptionMonth');
        console.log(findedSubscriptionMonth);

        const _countOperator: number = countOperators + 1;

        const _totalResult: number = _parsedFindedPrice * _countOperator;

        const _count_month: number = findedSubscriptionMonth[0]?.count_month;

        const _withMonth: number = _totalResult * _count_month;

        const _discount: number = parseInt(
            findedSubscriptionMonth[0]?.discount,
        );
        //Minus discount
        if (_discount != 0) {
            const _discountResult: number = (_withMonth * _discount) / 100;

            const withDiscount: number = _withMonth - _discountResult;

            const floated: any = withDiscount.toFixed(2);
            setTotalPrice(floated);
        } else {
            const floated: any = _withMonth.toFixed(2);
            setTotalPrice(floated);
        }
    }, [
        selectedData,
        selectedCurrency,
        selectedSubscriptionMonth,
        countOperators,
    ]);

    const buy = async () => {
        setLoader(true);
        const form = new FormData();

        form.append('count_operator', countOperators);
        form.append('subscription_month_id', selectedSubscriptionMonth);
        form.append('subscription_id', selectedData);
        form.append('currency_id', selectedCurrency);

        const response = await requestPostWithToken(BUY, form);
        setLoader(false);

        if (response?.success == true) {
            toast.success(response?.msg);
            const minusBalance = selectedBalance?.summ - totalPrice;

            const newObj = {
                ...selectedBalance,
                summ: minusBalance.toFixed(2),
            };

            setSelectedBalance(newObj);
        } else {
            toast.error(response?.msg);
        }
    };

    const TopPrice = (value: any) => {
        return (
            <div className="bg-primary2 w-[300px] h-[548px] border border-primary2 px-[20px] py-[35px] rounded-[4px] flex-col justify-start items-start gap-[30px] inline-flex">
                <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start flex w-full">
                    <div className="self-stretch flex-col justify-start items-start gap-[30px] flex h-full w-full">
                        <div className="text-black text-2xl font-semibold text-white  ">
                            {value?.value?.name}
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            {value?.value?.options?.length > 0 &&
                                value?.value?.options?.map(
                                    (option: any, index2: number) => {
                                        return (
                                            <div
                                                className="self-stretch text-black text-xl font-normal text-white  "
                                                key={index2}
                                            >
                                                {option?.name}
                                            </div>
                                        );
                                    },
                                )}
                        </div>
                        <div className="self-start grow shrink basis-0 flex-col items-start gap-[10px] flex justify-end">
                            <div className="self-stretch flex gap-[5px]">
                                <span className="text-black text-[28px] font-bold  text-white ">
                                    {value?.value?.subscription_price?.length >
                                        0 &&
                                        value?.value?.subscription_price.map(
                                            (priceItem: any) => {
                                                if (
                                                    selectedCurrency ==
                                                    priceItem?.currency_id
                                                ) {
                                                    return priceItem?.summ;
                                                }
                                            },
                                        )}
                                </span>
                                <span className="text-black text-[28px] font-normal  text-white ">
                                    {value?.value?.subscription_price?.length >
                                        0 &&
                                        value?.value?.subscription_price.map(
                                            (priceItem: any) => {
                                                if (
                                                    selectedCurrency ==
                                                    priceItem?.currency_id
                                                ) {
                                                    return priceItem?.currency
                                                        ?.code;
                                                }
                                            },
                                        )}
                                </span>
                                <span className="text-black text-2xl font-semibold"></span>
                            </div>
                        </div>
                        {/* <Link className="w-full" href="/register">
                          
                             <div className="transition-all ease-linear w-[300px] h-[45px] px-[86px] py-5 text-black hover:text-white bg-white hover:bg-primary2 rounded-[40px] border border-white justify-center items-center gap-2.5 inline-flex">
                                <div className="text-sm font-bold ">
                                    Подключить
                                </div>
                            </div> 
                        </Link> */}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex">
            <Header />
            <div className="flex w-full pl-[138px]  ">
                <div className="w-[350px] flex-col gap-[20px]  border-r-[1px]">
                    <div className="px-[30px] flex justify-start items-start border-b-[1px] py-[20px]">
                        <h2 className="text-[24px] font-bold">Оплата</h2>
                    </div>
                    {/* Контент меню */}
                    <div className="w-full flex flex-col">
                        <Link href="/payment">
                            <div
                                className={
                                    'px-[20px] py-[10px] font-semibold hover:bg-primary2 hover:text-white cursor-pointer transition-all ease-linear ' +
                                    (activeLink == '/payment'
                                        ? 'bg-primary2 text-white'
                                        : '')
                                }
                            >
                                Мои подписки
                            </div>
                        </Link>

                        <Link href="/frontend-tarifs">
                            <div
                                className={
                                    'px-[20px] py-[10px] font-semibold hover:bg-primary2 hover:text-white cursor-pointer transition-all ease-linear ' +
                                    (activeLink == '/frontend-tarifs'
                                        ? 'bg-primary2 text-white'
                                        : '')
                                }
                            >
                                Тарифы
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-[20px]">
                    <div className="border-b-[1px] w-full py-[5px] px-[20px] flex justify-between items-center">
                        <h3 className="font-semibold">Тарифы</h3>
                        <div className="transition-all ease-linear p-[10px] rounded-[10px] text-[#50a2ff]  text-center font-semibold cursor-pointer">
                            История счетов
                        </div>
                    </div>

                    <div className="flex justify-between gap-[1px] items-center px-[20px]">
                        <div className="flex gap-[1px] items-center">
                            <h1 className="font-semibold">Ваш баланс: </h1>
                            <div className="transition-all ease-linear p-[5px] text-[26px] text-primary2  rounded-[10px] font-[800] text-center cursor-pointer">
                                {selectedBalance != ''
                                    ? selectedBalance?.summ
                                    : null}
                                {selectedCurrencyCode}
                            </div>
                        </div>
                        <div className="transition-all ease-linear p-[10px] rounded-[10px] text-[#50a2ff]  text-center font-semibold cursor-pointer">
                            Пополнить баланс
                        </div>
                    </div>

                    <div className="flex flex-col gap-[10px] items-start px-[20px]">
                        <h1 className="font-semibold">Выберите валюту: </h1>
                        <div className="flex gap-[10px]">
                            {currecies?.length > 0 &&
                                currecies?.map((value: any, index: number) => {
                                    return (
                                        <div
                                            className={
                                                'transition-all ease-linear min-w-[80px] px-[10px] py-[5px] border border-primary2 text-primary2 rounded-[4px] text-center font-semibold cursor-pointer ' +
                                                (selectedCurrency == value?.id
                                                    ? 'bg-primary2 !text-white'
                                                    : '')
                                            }
                                            key={index}
                                            onClick={() => {
                                                setSelectedCurrency(value?.id);
                                                setSelectedCurrencyCode(
                                                    value?.symbol_left,
                                                );
                                            }}
                                        >
                                            {value?.code}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>

                    <div className="flex  gap-[20px] items-start px-[20px]">
                        <div className="flex flex-col gap-[10px]">
                            <h1 className="font-semibold">Рассчитать на: </h1>
                            <div className="flex gap-[10px]">
                                {subscriptionMonth?.length > 0 &&
                                    subscriptionMonth?.map(
                                        (value: any, index: number) => {
                                            return (
                                                <div
                                                    className={
                                                        'flex flex-col gap-[5px] min-w-[120px] text-primary2  border border-primary2 rounded-[4px] px-[10px] py-[5px] cursor-pointer ' +
                                                        (selectedSubscriptionMonth ==
                                                        value?.id
                                                            ? 'bg-primary2 !text-white'
                                                            : '')
                                                    }
                                                    key={index}
                                                    onClick={() => {
                                                        setSelectedSubscriptionMonth(
                                                            value?.id,
                                                        );
                                                    }}
                                                >
                                                    <div
                                                        className={
                                                            'transition-all ease-linear   text-center font-semibold cursor-pointer '
                                                        }
                                                    >
                                                        {value?.name}
                                                    </div>
                                                    <div
                                                        className={
                                                            'transition-all ease-linear text-center  cursor-pointer text-[14px] '
                                                        }
                                                    >
                                                        {parseInt(
                                                            value?.discount,
                                                        )}
                                                        % скидка
                                                    </div>
                                                </div>
                                            );
                                        },
                                    )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <h1 className="font-semibold">
                                Количество операторов:{' '}
                            </h1>
                            <div className="flex gap-[10px] items-center">
                                <div className="w-[80px] flex h-[60px] justify-center items-center text-center flex items-center justify-center">
                                    <div
                                        className="w-[25px] text-primary2 border border-primary2 h-full flex items-center justify-center font-semibold rounded-l-[20px] select-none cursor-pointer active:bg-primary2 active:text-white"
                                        onClick={() => downCountOperator()}
                                    >
                                        -
                                    </div>
                                    <div className="w-[30px] text-primary2 border border-primary2 text-center h-full flex items-center justify-center font-semibold">
                                        {countOperators}
                                    </div>
                                    <div
                                        className="w-[25px] bg-primary2 text-white font-semibold border border-primary2 text-center h-full flex items-center justify-center font-semibold rounded-r-[20px] select-none cursor-pointer active:bg-white active:text-primary2"
                                        onClick={() => upperCountOperator()}
                                    >
                                        +
                                    </div>
                                </div>
                                <h1 className=" text-primary2">Сотрудники</h1>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-[10px] px-[20px]">
                        <h3 className="font-semibold">Выберите ваш тариф:</h3>
                        <div className="flex gap-[20px] flex-wrap">
                            {data?.length > 0 &&
                                data?.map((value: any, index: number) => {
                                    if (selectedData == value?.id) {
                                        return (
                                            <TopPrice
                                                key={index}
                                                value={value}
                                            />
                                        );
                                    }
                                    return (
                                        <div
                                            className="w-[300px] h-[548px] px-[20px] py-[35px] bg-white rounded-[4px] border border-primary2 flex-col justify-start items-start gap-[30px] inline-flex cursor-pointer"
                                            key={index}
                                            onClick={() =>
                                                setSelectedData(value?.id)
                                            }
                                        >
                                            <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start flex">
                                                <div className="self-stretch flex-col justify-start items-start gap-[30px] flex h-full w-full">
                                                    <div className="text-black text-2xl font-semibold  ">
                                                        {value?.name}
                                                    </div>
                                                    <div className="flex flex-col gap-[10px]">
                                                        {value?.options
                                                            ?.length > 0 &&
                                                            value?.options?.map(
                                                                (
                                                                    option: any,
                                                                    index2: number,
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            className="self-stretch text-black text-xl font-normal  "
                                                                            key={
                                                                                index2
                                                                            }
                                                                        >
                                                                            {
                                                                                option?.name
                                                                            }
                                                                        </div>
                                                                    );
                                                                },
                                                            )}
                                                    </div>
                                                    <div className="self-start grow shrink basis-0 flex-col items-start gap-[10px] flex justify-end w-full">
                                                        <div className="self-stretch flex gap-[5px]">
                                                            <span className="text-black text-[28px] font-bold text-primary2">
                                                                {value
                                                                    ?.subscription_price
                                                                    ?.length >
                                                                    0 &&
                                                                    value?.subscription_price.map(
                                                                        (
                                                                            priceItem: any,
                                                                        ) => {
                                                                            if (
                                                                                selectedCurrency ==
                                                                                priceItem?.currency_id
                                                                            ) {
                                                                                return priceItem?.summ;
                                                                            }
                                                                        },
                                                                    )}
                                                            </span>
                                                            <span className="text-black text-[28px] font-normal text-primary2">
                                                                {value
                                                                    ?.subscription_price
                                                                    ?.length >
                                                                    0 &&
                                                                    value?.subscription_price.map(
                                                                        (
                                                                            priceItem: any,
                                                                        ) => {
                                                                            if (
                                                                                selectedCurrency ==
                                                                                priceItem?.currency_id
                                                                            ) {
                                                                                return priceItem
                                                                                    ?.currency
                                                                                    ?.code;
                                                                            }
                                                                        },
                                                                    )}
                                                            </span>
                                                            <span className="text-black text-[32px] font-semibold"></span>
                                                        </div>
                                                        {/* <Link
                                                            className="w-full"
                                                            href="/register"
                                                        >
                                                            <div className="text-center transition-all ease-linear text-[16px] leading-[16px] font-bold w-full p-[10px] text-black hover:text-white bg-white hover:bg-primary2 rounded-[30px] border border-primary2 ">
                                                                Выбрать
                                                            </div>
                                                        </Link> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[30px] items-start px-[20px]">
                        <h1 className="font-semibold text-[22px]">
                            Итого: {totalPrice} {selectedCurrencyCode}
                        </h1>
                        <button
                            className="text-[18px] 
                        font-light  
                        transition-all 
                        ease-linear  
                         px-[20px] 
                         py-[10px] text-white bg-primary2 rounded-[4px] border active:bg-primary2_opacity active:text-primary2 hover:text-primary2 hover:bg-white  border-primary2 justify-center items-center flex"
                            disabled={loader}
                            onClick={() => buy()}
                        >
                            Оплатить
                            {loader ? (
                                <div className="flex items-center pl-1">
                                    {loaderSvg()}
                                </div>
                            ) : null}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
