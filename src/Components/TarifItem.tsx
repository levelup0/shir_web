import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function TarifItem({ subscriptions }: any) {
    let lastElem: any = null;

    if (subscriptions?.data?.data?.length > 0) {
        lastElem =
            subscriptions?.data?.data[subscriptions?.data?.data?.length - 1];
    }
    const TopPrice = (value: any) => {
        return (
            <div className="bg-primary2 w-full md:w-[360px] px-[20px] md:px-[30px] py-[15px] md:py-[45px] rounded-[15px] border border-primary2 flex-col justify-start items-start gap-[30px] inline-flex">
                <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start flex">
                    <div className="self-stretch flex-col justify-start items-start gap-[30px] flex h-full">
                        <div className=" text-2xl font-semibold text-white  ">
                            {value?.value?.name}
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            {value?.value?.options?.length > 0 &&
                                value?.value?.options?.map(
                                    (option: any, index2: number) => {
                                        return (
                                            <div
                                                className="self-stretch  text-xl font-normal text-white  "
                                                key={index2}
                                            >
                                                {option?.name}
                                            </div>
                                        );
                                    },
                                )}
                        </div>
                        <div className="self-start grow shrink basis-0 flex-col items-start gap-[10px] flex justify-end">
                            <div className="self-stretch flex flex-col">
                                <span className=" text-2xl font-bold text-primary2 text-white ">
                                    {value?.value?.price}
                                </span>
                                <span className=" text-[20px] font-normal text-white ">
                                    {value?.value?.description}
                                </span>
                                <span className=" text-2xl font-semibold"></span>
                            </div>
                        </div>
                        <Link href="/register">
                            <div className="transition-all ease-linear w-[300px] h-[45px] px-[86px] py-5 text-black hover:text-white bg-white hover:bg-primary2 rounded-[40px] border border-white justify-center items-center gap-2.5 inline-flex">
                                <div className="text-sm font-bold ">
                                    Подключить
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {subscriptions?.data?.data?.length > 0 &&
                subscriptions?.data?.data?.map((value: any, index: number) => {
                    if (lastElem?.id == value?.id) {
                        return <TopPrice key={index} value={lastElem} />;
                    }
                    return (
                        <div
                            className="w-full md:w-[360px] px-[20px] md:px-[30px] py-[15px] md:py-[45px]  bg-white rounded-[15px] border border-primary2 flex-col justify-start items-start gap-[30px] inline-flex"
                            key={index}
                        >
                            <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start flex">
                                <div className="self-stretch flex-col justify-start items-start gap-[30px] flex h-full">
                                    <div className="text-black text-2xl font-semibold  ">
                                        {value?.name}
                                    </div>
                                    <div className="flex flex-col gap-[10px]">
                                        {value?.options?.length > 0 &&
                                            value?.options?.map(
                                                (
                                                    option: any,
                                                    index2: number,
                                                ) => {
                                                    return (
                                                        <div
                                                            className="self-stretch text-black text-xl font-normal  "
                                                            key={index2}
                                                        >
                                                            {option?.name}
                                                        </div>
                                                    );
                                                },
                                            )}
                                    </div>
                                    <div className="self-start grow shrink basis-0 flex-col items-start gap-[10px] flex justify-end">
                                        <div className="self-stretch flex flex-col">
                                            <span className="text-black text-2xl font-bold text-primary2">
                                                {value?.price}
                                            </span>
                                            <span className="text-black text-[20px] font-normal">
                                                {value?.description}
                                            </span>
                                            <span className="text-black text-2xl font-semibold"></span>
                                        </div>
                                        <Link href="/register">
                                            <div className="transition-all ease-linear w-[300px] h-[45px] px-[86px] py-5 text-black hover:text-white bg-white hover:bg-primary2 rounded-[40px] border border-primary2 justify-center items-center gap-2.5 inline-flex">
                                                <div className=" text-sm font-bold">
                                                    Подключить
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}


        </>
    );
}
