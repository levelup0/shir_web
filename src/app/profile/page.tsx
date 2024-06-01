/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import MainHeader from '@/Components/MainHeader';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORY_VOZ, GETUSER, USER_PASSWORD_UPDATE } from '@/Common/urls';
import { requestGet, requestPostWithToken } from '@/Common/requests';
import { toast } from 'react-toastify';
import { Cropper, ReactCropperElement } from 'react-cropper';
import Image from 'next/image';
import InputTypeFile from '@/HtmlComponent/InputTypeFile';
import CHdescription1 from '@/HtmlComponent/CHdescription1';
import PrimaryBtn01 from '@/HtmlComponent/PrimaryBtn01';
import CancelBtn01 from '@/HtmlComponent/CancelBtn01';

import 'cropperjs/dist/cropper.css';
import AvatarComponent from '@/Components/AvatarComponent';
import MultiSelect from '@/Components/Multiselect';
import { is_user_logged_in } from '@/Common/function';
import { loaderSvg } from '@/Common/function';
export default function Page() {
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState<any>();

    const [name, setName] = useState('');
    const [actionSector, setActionSector] = useState('');
    const [businessSector, setBusinessSector] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirm] = useState('');
    const [resultImage, setResultImg] = useState('');

    const [dateBirth, setDateBirth] = useState('');
    const [vuz, setVuz] = useState('');
    const [educationCourse, setEducationCourse] = useState('');
    const [interes, setInteres] = useState('');
    const [company, setCompany] = useState('');

    const [urlTelegram, setUrlTelegram] = useState('');

    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState<any>([]);
    const [defaultCategory, setDefaultCategory] = useState<any>([]);
    const [categoryVoz, setCategoryVoz] = useState<any>([]);

    const getCategoryVoz = () => {
        setLoader(true);
        requestGet(`${CATEGORY_VOZ}`, {}).then(response => {
            setLoader(false);
            getData();
            if (response?.success == true) {
                setCategoryVoz(response?.data);
            }
        });
    };

    const getData = () => {
        setLoader(true);
        requestGet(`${GETUSER}`, {}).then(response => {
            if (response?.success == true) {
                setData(response?.user);
                setName(response?.user?.name);
                setActionSector(response?.user?.action_sector);
                setBusinessSector(response?.user?.business_sector);

                setDateBirth(response?.user?.date_birth);
                setVuz(response?.user?.vuz);
                setEducationCourse(response?.user?.education_course);
                setInteres(response?.user?.interes);
                setCompany(response?.user?.company);
                setUrlTelegram(response?.user?.url_telegram);

                if (response?.user?.avatar != null) {
                    setResultImg(response?.user?.avatar);
                }

                if (response?.user?.category_voz?.length > 0) {
                    setDefaultCategory(response?.user?.category_voz);
                }

                if (response?.user?.category_voz?.length > 0) {
                    setSelectedCategory(response?.user?.category_voz);
                }
            }
            setLoader(false);
        });
    };

    const handleLanguageFilter = (data: string) => {
        setSelectedCategory(data);
    };

    const update = async () => {
        // setCreateProfileStatus(true);
        if (
            password != null ||
            typeof password != 'undefined' ||
            password != ''
        ) {
            if (password !== confirmPassword) {
                toast.error('Пароль с подтверждением не совпадают');
                return;
            }
        }

        const form = new FormData();
        form.append('password', password);
        form.append('action_sector', actionSector);
        form.append('name', name);
        form.append('avatar', resultImage);
        form.append('business_sector', businessSector);

        form.append('date_birth', dateBirth);
        form.append('vuz', vuz);
        form.append('education_course', educationCourse);
        form.append('interes', interes);
        form.append('url_telegram', urlTelegram);
        form.append('voz_category_relation', selectedCategory);
        form.append('company', company);

        const response = await requestPostWithToken(USER_PASSWORD_UPDATE, form);
        if (response?.success == true) {
            toast.success(response?.msg);
            getCategoryVoz();
            // setCreateProfileStatus(false);
        } else {
            toast.error(response?.msg);
            // setCreateProfileStatus(false);
        }
    };

    useEffect(() => {
        if (!is_user_logged_in()) {
            router.push('/about');
        } else {
            getCategoryVoz();
        }
    }, []);

    const [trueImage, setTrueImage] = useState(false);

    const cropperRef = useRef<ReactCropperElement>(null);
    const [cropData, setCropData] = useState('#');

    const [image, setImage] = useState('');

    const [modalShow, setModalShow] = useState(false);
    const [sizeOfImage, setSizeOfImage] = useState(1024000); //500KB
    const [selectedSizeOfImage, setSelectedSizeOfImage] = useState<any>(0); //500KB

    const typedSize = 'kB';

    const onChange = (e: any) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as any);
        };
        reader.readAsDataURL(files[0]);

        setModalShow(true);
    };

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== 'undefined') {
            setCropData(
                cropperRef.current?.cropper.getCroppedCanvas().toDataURL(),
            );
            const _string = cropperRef.current.cropper
                .getCroppedCanvas()
                .toDataURL();
            const a = new Blob([_string]).size;
            if (a > 0) {
                const result: any = a / 1024;
                setSelectedSizeOfImage(parseFloat(result).toFixed(2));
            }
            if (a > 819200) {
                setTrueImage(false);
            } else {
                setTrueImage(true);
            }
        }
    };

    useEffect(() => {
        if (cropData != '#') {
            setResultImg(cropData);
            setModalShow(false);
        }
    }, [cropData]);

    const cancelImage = () => {
        setModalShow(false);
    };

    return (
        <div className="flex flex-col">
            <MainHeader />
            {loader == true ? (
                <div className="w-full absolute top-[100px] flex justify-center items-center">
                    {loaderSvg()}
                </div>
            ) : (
                <>
                    <div
                        className={
                            'fixed left-0 top-0 h-[100vh] w-full flex flex-col justify-center items-center z-50 ' +
                            (modalShow == true ? '' : 'hidden')
                        }
                    >
                        <div className="w-fit flex flex-col gap-[20px] bg-orange-50 p-[50px] rounded-[30px]">
                            <div className="flex gap-[20px]">
                                <Cropper
                                    initialAspectRatio={1}
                                    minCropBoxHeight={100}
                                    minCropBoxWidth={100}
                                    ref={cropperRef}
                                    src={image}
                                    style={{ height: 300, width: 500 }}
                                />
                            </div>
                            <div className="flex gap-[20px]">
                                <PrimaryBtn01
                                    onClick={getCropData}
                                    title="Сохранить"
                                />
                                <CancelBtn01
                                    onClick={cancelImage}
                                    title="Отмена"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-[1140px] flex gap-[20px] m-auto mt-[120px]">
                        <div className="w-1/3 flex flex-col ">
                            <div className="w-full shadow flex flex-col gap-[20px] justify-center items-center py-[30px]">
                                <div className="w-[145px] h-[145px] relative">
                                    <AvatarComponent
                                        resultImage={resultImage}
                                    />
                                </div>

                                <div className="flex flex-col gap-[5px] justify-center items-center">
                                    <h4 className="font-semibold text-[20px] text-center">
                                        {data?.name}
                                    </h4>
                                    <p>
                                        Роль:{' '}
                                        <span className="font-semibold">
                                            {data?.roles?.name == 'caller'
                                                ? 'Вызоводатель'
                                                : ''}
                                            {data?.roles?.name == 'recipient'
                                                ? 'Студент'
                                                : ''}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="w-full flex flex-col">
                                <Link href="/profile">
                                    <div className="w-full h-[55px] bg-blue-100 hover:bg-blue-100 border-b-[1px]  flex items-center  font-medium cursor-pointer transition-all ease-linear">
                                        <div className="w-[2px] bg-blue-800 h-[55px]"></div>
                                        <div className="flex gap-[5px] px-[15px] items-center">
                                            <svg
                                                height={15}
                                                viewBox="0 0 448 512"
                                                width={15}
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                                            </svg>
                                            <p className="font-medium ">
                                                Профиль
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                {data?.roles?.name == 'caller' ? (
                                    <>
                                        <Link href="/create-challenges">
                                            <div className="w-full h-[55px]  border-b-[1px] hover:bg-blue-100  flex items-center  font-medium cursor-pointer transition-all ease-linear">
                                                <div className="w-[2px]  h-[55px]"></div>
                                                <div className="flex gap-[5px] px-[15px] items-center">
                                                    <svg
                                                        height={15}
                                                        viewBox="0 0 384 512"
                                                        width={15}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z" />
                                                    </svg>
                                                    <p className="font-medium ">
                                                        Создать вызов
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href="/my-voz">
                                            <div className="w-full h-[55px]  border-b-[1px] hover:bg-blue-100  flex items-center  font-medium cursor-pointer transition-all ease-linear">
                                                <div className="w-[2px]  h-[55px]"></div>
                                                <div className="flex gap-[5px] px-[15px] items-center">
                                                    <svg
                                                        height={15}
                                                        viewBox="0 0 512 512"
                                                        width={15}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 0v64h64V96H64zm384 0H192v64H448V96zM64 224v64h64V224H64zm384 0H192v64H448V224zM64 352v64h64V352H64zm384 0H192v64H448V352z" />
                                                    </svg>
                                                    <p className="font-medium ">
                                                        Мои вызовы
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/cv">
                                            <div className="w-full h-[55px]  border-b-[1px] hover:bg-blue-100  flex items-center  font-medium cursor-pointer transition-all ease-linear">
                                                <div className="w-[2px]  h-[55px]"></div>
                                                <div className="flex gap-[5px] px-[15px] items-center">
                                                    <svg
                                                        height={15}
                                                        viewBox="0 0 512 512"
                                                        width={15}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 0v64h64V96H64zm384 0H192v64H448V96zM64 224v64h64V224H64zm384 0H192v64H448V224zM64 352v64h64V352H64zm384 0H192v64H448V352z" />
                                                    </svg>
                                                    <p className="font-medium ">
                                                        Мои файлы
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href="/my-aprove">
                                            <div className="w-full h-[55px]  border-b-[1px] hover:bg-blue-100  flex items-center  font-medium cursor-pointer transition-all ease-linear">
                                                <div className="w-[2px]  h-[55px]"></div>
                                                <div className="flex gap-[5px] px-[15px] items-center">
                                                    <svg
                                                        height={15}
                                                        viewBox="0 0 576 512"
                                                        width={15}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M384 480h48c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224H144c-11.4 0-21.9 6-27.6 15.9L48 357.1V96c0-8.8 7.2-16 16-16H181.5c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8H416c8.8 0 16 7.2 16 16v32h48V160c0-35.3-28.7-64-64-64H298.5c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H87.7 384z" />
                                                    </svg>
                                                    <p className="font-medium ">
                                                        Мои заявки
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="w-full px-[10px] flex flex-col gap-[20px]">
                                <p className="w-full text-[20px] font-semibold">
                                    Профиль
                                </p>
                                <hr />

                                <div className="w-full grid grid-cols-2 gap-[10px] ">
                                    <div className="w-full flex flex-col gap-[5px]">
                                        <InputTypeFile
                                            onChange={onChange}
                                            title={'Добавить фото'}
                                        />

                                        <div className="flex flex-col">
                                            <CHdescription1
                                                className={
                                                    '' +
                                                    (selectedSizeOfImage <
                                                        500 ||
                                                    selectedSizeOfImage == 0
                                                        ? '!text-green-700'
                                                        : '!text-orange-700')
                                                }
                                                title={`Размер аватара не должен превышать ${sizeOfImage / 1024}  ${typedSize}`}
                                            />
                                            <CHdescription1
                                                className={
                                                    '' +
                                                    (selectedSizeOfImage <
                                                        500 ||
                                                    selectedSizeOfImage == 0
                                                        ? '!text-green-700'
                                                        : '!text-orange-700')
                                                }
                                                title={`Текущий размер: ${selectedSizeOfImage}  ${typedSize}`}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col gap-[5px]">
                                        <span className="font-medium">
                                            ФИО:
                                        </span>
                                        <input
                                            className="border shadow px-[10px] py-[10px]"
                                            onChange={e =>
                                                setName(e.target.value)
                                            }
                                            placeholder="Your name"
                                            type="text"
                                            value={name}
                                        />
                                    </div>
                                    {data?.roles?.name == 'caller' ? (
                                        <>
                                            <div className="w-full flex flex-col gap-[5px]">
                                                <span className="font-medium">
                                                    Сфера бизнеса:
                                                </span>
                                                {categoryVoz.length > 0 ? (
                                                    <MultiSelect
                                                        defaultValue={
                                                            defaultCategory
                                                        }
                                                        onChange={
                                                            handleLanguageFilter
                                                        }
                                                        options={categoryVoz}
                                                    />
                                                ) : null}
                                                {/* <input
                                        className="border shadow px-[10px] py-[10px]"
                                        onChange={e =>
                                            setBusinessSector(
                                                e.target.value,
                                            )
                                        }
                                        placeholder=""
                                        type="text"
                                        value={businessSector}
                                    /> */}
                                            </div>
                                            <div className="w-full flex flex-col gap-[5px]">
                                                <span className="font-medium">
                                                    Компания:
                                                </span>
                                                <input
                                                    className="border shadow px-[10px] py-[10px]"
                                                    onChange={e =>
                                                        setCompany(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={company}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-full flex flex-col gap-[5px]">
                                                <span className="font-medium">
                                                    Дата рождения:
                                                </span>
                                                <input
                                                    className="border shadow px-[10px] py-[10px]"
                                                    onChange={e =>
                                                        setDateBirth(
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Your name"
                                                    type="date"
                                                    value={dateBirth}
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-[5px]">
                                                <span className="font-medium">
                                                    ВУЗ:
                                                </span>
                                                <input
                                                    className="border shadow px-[10px] py-[10px]"
                                                    onChange={e =>
                                                        setVuz(e.target.value)
                                                    }
                                                    placeholder="Your name"
                                                    type="text"
                                                    value={vuz}
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-[5px]">
                                                <span className="font-medium">
                                                    Курс обучения:
                                                </span>
                                                <input
                                                    className="border shadow px-[10px] py-[10px]"
                                                    onChange={e =>
                                                        setEducationCourse(
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Курс обучения"
                                                    type="text"
                                                    value={educationCourse}
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-[5px]">
                                                <span className="font-medium">
                                                    Ссылка на Telegram:
                                                </span>
                                                <input
                                                    className="border shadow px-[10px] py-[10px]"
                                                    onChange={e =>
                                                        setUrlTelegram(
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Your name"
                                                    type="text"
                                                    value={urlTelegram}
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-[5px]">
                                                <span className="font-medium">
                                                    Краткое описание своих
                                                    интересов:
                                                </span>
                                                <textarea
                                                    className="w-full h-[120px] md:max-w-[400px] p-[20px] rounded-[1px] border text-[16px] outline-none"
                                                    onChange={e =>
                                                        setInteres(
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Краткое описание своих интересов"
                                                    value={interes}
                                                ></textarea>
                                            </div>
                                        </>
                                    )}
                                </div>
                                {data?.roles?.name == 'caller' ? (
                                    <div className="w-full flex flex-col gap-[5px]">
                                        <span className="font-medium">
                                            Описание деятельности:
                                        </span>
                                        <textarea
                                            className="border shadow px-[10px] py-[10px]"
                                            onChange={e =>
                                                setActionSector(e.target.value)
                                            }
                                            value={actionSector}
                                        ></textarea>
                                    </div>
                                ) : null}
                                <hr />
                                <div className="w-1/2 flex flex-col gap-[10px]">
                                    <div className="w-full flex flex-col gap-[5px]">
                                        <span className="font-medium">
                                            Эл Почта:
                                        </span>
                                        <input
                                            className="border shadow px-[10px] py-[10px]"
                                            disabled
                                            placeholder="Your name"
                                            type="text"
                                            value={data?.email}
                                        />
                                    </div>
                                    <div className="w-full flex flex-col gap-[5px]">
                                        <span className="font-medium">
                                            Пароль:
                                        </span>
                                        <input
                                            className="border shadow px-[10px] py-[10px]"
                                            onChange={e =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="Введите новый пароль"
                                            type="password"
                                            value={password}
                                        />
                                        <input
                                            className="border shadow px-[10px] py-[10px]"
                                            onChange={e =>
                                                setConfirm(e.target.value)
                                            }
                                            placeholder="Повторите пароль"
                                            type="password"
                                            value={confirmPassword}
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <button
                                        className="bg-blue-600 text-white rounded-[5px] px-[10px] py-[8px] hover:bg-blue-700 "
                                        onClick={() => update()}
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
