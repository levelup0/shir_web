/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import {
    loaderSvg,
    store_albi_userauth_bool,
    storeToken,
} from '@/Common/function';
import { requestGet, requestPost } from '@/Common/requests';
import { CATEGORY_VOZ, REGISTER } from '@/Common/urls';
import MainHeader from '@/Components/MainHeader';
import { useReCaptcha } from 'next-recaptcha-v3';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CommonContext } from '@/Common/context';
import { signIn, SignInResponse, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MultiSelect from '@/Components/Multiselect';

export default function Page() {
    const router = useRouter();
    const { data: session }: any = useSession();
    const { setUserAuth } = useContext(CommonContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirmation] = useState('');
    const [loader, setLoader] = useState(false);

    const { executeRecaptcha } = useReCaptcha();

    const [typeUser, setTypeUser] = useState<any>(0); //Вызоводатель
    const [dateBirth, setDateBirth] = useState('');
    const [vuz, setVuz] = useState('');
    const [educationCourse, setEducationCourse] = useState('');
    const [interes, setInteres] = useState('');

    const [urlTelegram, setUrlTelegram] = useState('');

    const [businessSector, setBusinessSector] = useState('');
    const [actionSector, setActionSector] = useState('');

    const [selectedCategory, setSelectedCategory] = useState<any>([]);
    const [categoryVoz, setCategoryVoz] = useState<any>([]);

    const register = async () => {
        setLoader(true);
        const form = new FormData();
        const token_captcha = await executeRecaptcha('form_submit');

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

        form.append('name', name);
        form.append('type_user', typeUser);

        form.append('business_sector', businessSector);
        form.append('action_sector', actionSector);

        form.append('date_birth', dateBirth);
        form.append('vuz', vuz);
        form.append('education_course', educationCourse);
        form.append('interes', interes);
        form.append('url_telegram', urlTelegram);

        form.append('email', email);
        form.append('password', password);
        form.append('password_confirmation', confirm);
        form.append('token_captcha', token_captcha);
        form.append('files', JSON.stringify(files));

        form.append('voz_category_relation', selectedCategory);

        const response = await requestPost(REGISTER, form);
        setLoader(false);

        if (response?.success == true) {
            toast.success(response?.msg);
            if (response?.token?.token != '') {
                const form = new FormData();
                form.append('email', email);
                form.append('password', password);

                await signIn('credentials', {
                    email: form.get('email'),
                    password: form.get('password'),
                    redirect: false,
                });
            }
        } else {
            toast.error(response?.msg);
        }
    };

    const saveConf = async (accessToken: string) => {
        await storeToken(accessToken);
        await store_albi_userauth_bool('true');
        setUserAuth(true);
        router.push('/');
    };

    useEffect(() => {
        if (session?.accessToken != null && session?.accessToken != '') {
            saveConf(session?.accessToken);
        }
    }, [session]);

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

        const test =
            /\.(gif|jpg|jpeg|tiff|png|pdf|txt|xls|xlsx|ppt|pptx|doc|docx|csv)$/i.test(
                value.name,
            );
        if (!test) {
            _files.splice(key, 1);
            setFiles(_files);

            toast.error(
                'Доступные форматы: gif, jpg, jpeg, tiff, png, pdf, txt, xls, xlsx, ppt, pptx, doc, docx, csv',
            );
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

    const getData = () => {
        requestGet(`${CATEGORY_VOZ}`, {}).then(response => {
            if (response?.success == true) {
                setCategoryVoz(response?.data);
            }
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const handleLanguageFilter = (data: string) => {
        setSelectedCategory(data);
    };

    return (
        <div className="flex flex-col gap-[5px]">
            <div className="w-full  flex flex-col gap-[5px] ">
                <MainHeader />
                <div className="flex w-full mt-[100px] md:max-w-[1200px] m-auto px-[20px] md:px-[30px] py-[15px] md:py-[45px] justify-center">
                    <div className="flex flex-col gap-[20px] w-full md:w-[400px]">
                        <h2 className="text-[18px] font-semibold text-center">
                            Регистрация
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
                                        Вызовополучатель
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
                                onChange={e => setName(e.target.value)}
                                placeholder="ФИО"
                                type="text"
                                value={name}
                            />
                            {typeUser == 0 ? (
                                <div className="flex flex-col">
                                    <label className="text-[14px] font-light px-[5px]">
                                        Дата рождения
                                    </label>
                                    <input
                                        className="w-full md:max-w-[400px]  h-[50px] p-[20px] rounded-[10px] border text-[16px] outline-none"
                                        onChange={e =>
                                            setDateBirth(e.target.value)
                                        }
                                        placeholder="Дата рождения"
                                        type="date"
                                        value={dateBirth}
                                    />
                                </div>
                            ) : null}
                            {typeUser == 0 ? (
                                <div className="flex flex-col">
                                    <input
                                        className="w-full md:max-w-[400px]  h-[50px] p-[20px] rounded-[10px] border text-[16px] outline-none"
                                        onChange={e => setVuz(e.target.value)}
                                        placeholder="ВУЗ "
                                        type="text"
                                        value={vuz}
                                    />
                                </div>
                            ) : null}
                            {typeUser == 0 ? (
                                <div className="flex flex-col">
                                    <input
                                        className="w-full md:max-w-[400px]  h-[50px] p-[20px] rounded-[10px] border text-[16px] outline-none"
                                        onChange={e =>
                                            setEducationCourse(e.target.value)
                                        }
                                        placeholder="Курс обучения"
                                        type="text"
                                        value={educationCourse}
                                    />
                                </div>
                            ) : null}
                            {typeUser == 0 ? (
                                <div className="flex flex-col">
                                    <textarea
                                        className="w-full h-[120px] md:max-w-[400px] p-[20px] rounded-[10px] border text-[16px] outline-none"
                                        cols={15}
                                        onChange={e =>
                                            setInteres(e.target.value)
                                        }
                                        placeholder="Краткое описание своих интересов"
                                        rows={10}
                                        value={interes}
                                    ></textarea>
                                </div>
                            ) : null}
                            {typeUser == 0 ? (
                                <div className="flex flex-col">
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
                                                      (
                                                          value: any,
                                                          index: number,
                                                      ) => (
                                                          <div
                                                              className="input-group mb-3"
                                                              key={index}
                                                          >
                                                              <input
                                                                  aria-describedby="basic-addon1"
                                                                  aria-label="Username"
                                                                  className="form-control"
                                                                  data-key={
                                                                      index
                                                                  }
                                                                  id="file"
                                                                  name="file"
                                                                  onChange={
                                                                      onChangeFileInput
                                                                  }
                                                                  placeholder=""
                                                                  type="file"
                                                              />

                                                              <button
                                                                  className="bg-red-600 text-white rounded-[5px] px-[10px] py-[8px] hover:bg-blue-700 "
                                                                  onClick={() =>
                                                                      removeFile(
                                                                          index,
                                                                      )
                                                                  }
                                                              >
                                                                  <svg
                                                                      className="fill-white"
                                                                      height={
                                                                          15
                                                                      }
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
                                                        className="flex justify-center items-center px-[20px] w-full md:max-w-[400px]  h-[50px] rounded-[10px] bg-primary_yellow border text-[#FFF] text-[16px] font-normal hover:active:bg-[#FFF] hover:active:text-primary2 transition-all ease-in-out"
                                                        onClick={() =>
                                                            addFiles()
                                                        }
                                                        type="button"
                                                    >
                                                        {'добавить файл'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                            {typeUser == 0 ? (
                                <div className="flex flex-col">
                                    <input
                                        className="w-full md:max-w-[400px]  h-[50px] p-[20px] rounded-[10px] border text-[16px] outline-none"
                                        onChange={e =>
                                            setUrlTelegram(e.target.value)
                                        }
                                        placeholder="@name"
                                        type="text"
                                        value={urlTelegram}
                                    />
                                </div>
                            ) : null}

                            {typeUser == 1 ? (
                                <div className="flex flex-col">
                                    {categoryVoz.length > 0 ? (
                                        <MultiSelect
                                            onChange={handleLanguageFilter}
                                            options={categoryVoz}
                                        />
                                    ) : null}
                                </div>
                            ) : null}
                            {typeUser == 1 ? (
                                <div className="flex flex-col">
                                    <textarea
                                        className="w-full md:max-w-[400px]  h-[50px] p-[20px] rounded-[10px] border text-[16px] outline-none"
                                        onChange={e =>
                                            setActionSector(e.target.value)
                                        }
                                        placeholder="Описание деятельности"
                                        value={actionSector}
                                    ></textarea>
                                </div>
                            ) : null}
                            <input
                                className="w-full md:max-w-[400px]  h-[50px] p-[20px] rounded-[10px] border text-[16px] outline-none"
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email"
                                type="text"
                                value={email}
                            />

                            <input
                                className="w-full md:max-w-[400px]  h-[50px] p-[20px] rounded-[10px] border text-[16px] outline-none"
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Пароль"
                                type="password"
                                value={password}
                            />

                            <input
                                className="w-full md:max-w-[400px]  h-[50px] p-[20px] rounded-[10px] border text-[16px] outline-none"
                                onChange={e => setConfirmation(e.target.value)}
                                placeholder="Повторите пароль"
                                type="password"
                                value={confirm}
                            />
                        </div>
                        <button
                            className="flex justify-center items-center px-[20px] w-full md:max-w-[400px]  h-[50px] rounded-[10px] bg-primary_yellow border text-[#FFF] text-[16px] font-normal hover:active:bg-[#FFF] hover:active:text-primary2 transition-all ease-in-out"
                            disabled={loader}
                            onClick={() => register()}
                        >
                            Регистрация
                            {loader ? (
                                <div className="flex items-center pl-1">
                                    {loaderSvg()}
                                </div>
                            ) : null}
                        </button>
                        <hr />
                        <div className="flex gap-[10px] items-center justify-center">
                            <p>У вас есть акаунт Шторм-трек?</p>
                            <Link className="text-blue-500" href="/login">
                                Войти
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
