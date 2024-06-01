/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import MainHeader from '@/Components/MainHeader';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CONTACT_ASSETS, CV, GETUSER, MASS_ACTION, VOZ } from '@/Common/urls';
import {
    requestGet,
    requestPost,
    requestPostWithToken,
} from '@/Common/requests';
import { toast } from 'react-toastify';
import { currentDate, is_user_logged_in } from '@/Common/function';
import { commonRequestWithToken } from '@/Common/commonRequest';
import TableheadCheckbox from '@/Components/TableheadCheckbox';
import TableheadSort from '@/Components/TableheadSort';
import AvatarComponent from '@/Components/AvatarComponent';
export default function Page() {
    const [resultImage, setResultImg] = useState('');

    const [listData, setListData] = useState<any>([]);
    const [data, setData] = useState<any>();

    const [name, setName] = useState('');
    const [sector, setSector] = useState('');
    const [description, setDescription] = useState<any>('');
    const [publishDate, setPublishDate] = useState<string>(currentDate());
    const [endDate, setEnddate] = useState<string>(currentDate());

    const router = useRouter();

    const getData = () => {
        requestGet(`${GETUSER}`, {}).then(response => {
            if (response?.success == true) {
                setData(response?.user);
                if (response?.user?.avatar != null) {
                    setResultImg(response?.user?.avatar);
                }
            }
        });
    };

    const getVoz = async () => {
        const response = await commonRequestWithToken(CV);
        if (response?.success == true) {
            setListData(response?.data?.data);
        }
    };

    useEffect(() => {
        if (!is_user_logged_in()) {
            router.push('/about');
        } else {
            getData();
            getVoz();
        }
    }, []);

    const [availableSize, setAvailableSize] = useState<any>(10485760);

    const [files, setFiles] = useState<any>([]);

    const addFiles = () => {
        const _files: any = [...files];

        _files.push({
            file_format: null,
            file_name: null,
            file_size: null,
            base64: null,
        });
        setFiles(_files);
    };

    const removeFile = (index: any) => {
        const _files = [...files];
        _files.splice(index, 1);
        setFiles(_files);
    };

    const updateAvailableSize = () => {
        const _files: any = [...files];

        let sum: any = 10485760;

        if (_files.length > 0) {
            for (let i = 0; i < _files.length; i += 1) {
                if (_files[i].file_size != null) {
                    sum = parseFloat(sum) - parseFloat(_files[i].file_size);
                }
            }
        }
        if (sum < 0) {
            toast.error('Превышение допустимого размера файлов 10 MB');
            setAvailableSize(sum);
            return false;
        }

        setAvailableSize(sum);

        return true;
    };

    useEffect(() => {
        updateAvailableSize();
    }, [files]);

    const onChangeFileInput = (e: any) => {
        const key = e.target.getAttribute('data-key');
        const value = e.target.files[0];
        const _files: any = [...files];

        const test = /\.(pdf)$/i.test(value.name);
        if (!test) {
            _files.splice(key, 1);
            setFiles(_files);

            toast.error('Доступные форматы: pdf');
            return;
        }

        const reader: any = new FileReader();
        reader.readAsDataURL(value);

        reader.onloadend = function () {
            const base64String = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '');

            _files[key].file_format = value.name.split('.').pop();
            _files[key].file_name = value.name;
            _files[key].file_size = value.size;
            _files[key].base64 = base64String;
            setFiles(_files);
        };
    };

    const saveFiles = async () => {
        const form = new FormData();
        /**
         * Валидация CV
         */

        const _files = [...files];

        let sum: any = 10485760;

        if (_files.length > 0) {
            for (let i = 0; i < _files.length; i += 1) {
                if (_files[i].file_size != null) {
                    sum = parseFloat(sum) - parseFloat(_files[i].file_size);
                }
            }

            if (sum < 0) {
                toast.error('Превышение допустимого размера файлов 10 MB');
                return false;
            }
        }

        form.append('files', JSON.stringify(files));

        const response = await requestPostWithToken(CV, form);

        if (response?.success == true) {
            toast.success(response?.msg);
            router.push('cv');
        } else {
            toast.error(response?.msg);
        }
    };

    return (
        <div className="flex flex-col">
            <MainHeader />
            <div className="w-[1140px] flex gap-[20px] m-auto mt-[120px]">
                <div className="w-1/3 flex flex-col ">
                    <div className="w-full shadow flex flex-col gap-[20px] justify-center items-center py-[30px]">
                        <div className="w-[145px] h-[145px] relative">
                            <AvatarComponent resultImage={resultImage} />
                        </div>
                        <div className="flex flex-col gap-[5px] justify-center items-center">
                            <h4 className="font-semibold text-[20px] text-center">
                                {data?.name}
                            </h4>
                            <p>
                                {' '}
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
                            <div className="w-full h-[55px]  hover:bg-blue-100 border-b-[1px]  flex items-center  font-medium cursor-pointer transition-all ease-linear">
                                <div className="w-[2px]  h-[55px]"></div>
                                <div className="flex gap-[5px] px-[15px] items-center">
                                    <svg
                                        height={15}
                                        viewBox="0 0 448 512"
                                        width={15}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                                    </svg>
                                    <p className="font-medium ">Профиль</p>
                                </div>
                            </div>
                        </Link>
                        {data?.roles?.name == 'caller' ? (
                            <>
                                <Link href="/create-challenges">
                                    <div className="w-full h-[55px]  border-b-[1px]  hover:bg-blue-100  flex items-center  font-medium cursor-pointer transition-all ease-linear">
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
                                    <div className="w-full h-[55px]  border-b-[1px] bg-blue-100 hover:bg-blue-100  flex items-center  font-medium cursor-pointer transition-all ease-linear">
                                        <div className="w-[2px] bg-blue-800  h-[55px]"></div>
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
                                    <div className="w-full h-[55px]  border-b-[1px] bg-blue-100 hover:bg-blue-100  flex items-center  font-medium cursor-pointer transition-all ease-linear">
                                        <div className="w-[2px] bg-blue-800 h-[55px]"></div>
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
                        <div className="w-full flex justify-between">
                            <p className="w-full text-[20px] font-semibold">
                                Новый файл
                            </p>
                            <Link
                                className="flex justify-center items-center px-[20px] w-full md:max-w-[100px]  h-[38px] rounded-[4px] bg-primary_yellow border text-[#FFF] text-[14px] font-normal hover:active:bg-[#FFF] hover:active:text-primary2 transition-all ease-in-out"
                                href={'cv'}
                            >
                                Назад
                            </Link>
                        </div>
                        <hr />

                        <div className="flex flex-col ">
                            <div className="awards-subtitle">
                                <div className="row mt-4 mb-4 d-flex">
                                    {availableSize > 0 ? (
                                        <label
                                            className="text text-green-600 text-[14px] fs-6 text-muted"
                                            htmlFor="file"
                                        >
                                            {' Доступно: '}
                                            {(
                                                availableSize /
                                                1024 /
                                                1024
                                            ).toFixed(2)}
                                            МБ
                                        </label>
                                    ) : (
                                        <label
                                            className="text text-red-500 fs-6"
                                            htmlFor="file"
                                        >
                                            {}
                                            {' Превышено допущенного'}
                                            {(
                                                availableSize /
                                                1024 /
                                                1024
                                            ).toFixed(2)}{' '}
                                            MB
                                        </label>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    {files.length > 0
                                        ? files.map(
                                              (value: any, index: number) => (
                                                  <div
                                                      className="input-group mb-3"
                                                      key={index}
                                                  >
                                                      <input
                                                          accept="application/pdf"
                                                          aria-describedby="basic-addon1"
                                                          aria-label="Username"
                                                          className="form-control w-[150px]"
                                                          data-key={index}
                                                          id="file"
                                                          name="file"
                                                          onChange={
                                                              onChangeFileInput
                                                          }
                                                          placeholder=""
                                                          type="file"
                                                      />
                                                      {value?.file_name}
                                                      <button
                                                          className="bg-red-600 text-white rounded-[5px] px-[10px] py-[8px] hover:bg-blue-700 "
                                                          onClick={() =>
                                                              removeFile(index)
                                                          }
                                                      >
                                                          <svg
                                                              className="fill-white"
                                                              height={15}
                                                              viewBox="0 0 448 512"
                                                              width={12}
                                                              xmlns="http://www.w3.org/2000/svg"
                                                          >
                                                              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                                          </svg>
                                                      </button>
                                                  </div>
                                              ),
                                          )
                                        : null}

                                    <div className="col-sm-6 col-md-5">
                                        <div className="awards-form__button last">
                                            <button
                                                className="flex justify-center items-center px-[20px] w-full md:max-w-[60px]  h-[40px] rounded-[10px] bg-blue-400 border text-[#FFF] text-[16px] font-normal hover:active:bg-[#FFF] hover:active:text-primary2 transition-all ease-in-out"
                                                onClick={() => addFiles()}
                                                type="button"
                                            >
                                                {'+CV'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            className="flex justify-center items-center px-[20px] w-full md:max-w-[300px]  h-[50px] rounded-[10px] bg-primary_yellow border text-[#FFF] text-[16px] font-normal hover:active:bg-[#FFF] hover:active:text-primary2 transition-all ease-in-out"
                            onClick={() => saveFiles()}
                            type="button"
                        >
                            {'Сохранить'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
