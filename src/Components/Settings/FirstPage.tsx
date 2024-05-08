/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */

import CHInput from '@/HtmlComponent/CHInput';
import CHdescription1 from '@/HtmlComponent/CHdescription1';
import CHp1 from '@/HtmlComponent/CHp1';
import Avatar from '@/icons/Avatar';
import PipetkaIcon from '@/icons/Pipetka';
import { useEffect, useRef, useState } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import PrimaryBtn01 from '@/HtmlComponent/PrimaryBtn01';
import CancelBtn01 from '@/HtmlComponent/CancelBtn01';
import Image from 'next/image';
import InputTypeFile from '@/HtmlComponent/InputTypeFile';
import ColorPicker from 'react-best-gradient-color-picker';

import 'cropperjs/dist/cropper.css';

export default function FirstPageSetting({
    name,
    setName,
    position,
    setPosition,
    resultImage,
    setResultImg,
    bgColor,
    setBgColor,
    textColor,
    setTextColor,
    setTrueImage,
    trueImage,
    setCommonAsk,
    commonAsk,
}: any) {
    const cropperRef = useRef<ReactCropperElement>(null);
    const [cropData, setCropData] = useState('#');

    const [image, setImage] = useState('');

    const [modalShow, setModalShow] = useState(false);
    const [modalBgColor, setModalBgColor] = useState(false);
    const [modalTextColor, setModalTextColor] = useState(false);
    const [sizeOfImage, setSizeOfImage] = useState(512000); //500KB
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

        //reader.readAsDataURL();
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

    const cancelBgColor = () => {
        setModalBgColor(false);
    };

    const cancelTextColor = () => {
        setModalTextColor(false);
    };

    useEffect(() => {
        if (commonAsk != '') {
            setCommonAsk(commonAsk);
        }
    }, [commonAsk]);

    return (
        <div className="">
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
                        <PrimaryBtn01 onClick={getCropData} title="Сохранить" />
                        <CancelBtn01 onClick={cancelImage} title="Отмена" />
                    </div>
                </div>
            </div>

            {/* Modal BG color */}
            <div
                className={
                    'fixed left-0 top-0 h-[100vh] w-full flex flex-col justify-center items-center z-50 ' +
                    (modalBgColor == true ? '' : 'hidden')
                }
            >
                <div className="w-fit flex flex-col gap-[20px] bg-orange-50 px-[30px] py-[20px] rounded-[30px]">
                    <div className="flex gap-[20px]">
                        <ColorPicker
                            className={undefined}
                            hideAdvancedSliders={true}
                            hideColorGuide={true}
                            hideColorTypeBtns={true}
                            hideControls={true}
                            hideEyeDrop={true}
                            hideGradientAngle={true}
                            hideGradientControls={true}
                            hideInputs={true}
                            hideOpacity={true}
                            hidePresets={true}
                            onChange={setBgColor}
                            value={bgColor}
                        />
                    </div>
                    <div className="flex gap-[20px]">
                        <CancelBtn01 onClick={cancelBgColor} title="Закрыть" />
                    </div>
                </div>
            </div>

            {/* Modal Text color */}
            <div
                className={
                    'fixed left-0 top-0 h-[100vh] w-full flex flex-col justify-center items-center z-50 ' +
                    (modalTextColor == true ? '' : 'hidden')
                }
            >
                <div className="w-fit flex flex-col gap-[20px] bg-orange-50 px-[30px] py-[20px] rounded-[30px]">
                    <div className="flex gap-[20px]">
                        <ColorPicker
                            className={undefined}
                            hideAdvancedSliders={true}
                            hideColorGuide={true}
                            hideColorTypeBtns={true}
                            hideControls={true}
                            hideEyeDrop={true}
                            hideGradientAngle={true}
                            hideGradientControls={true}
                            hideInputs={true}
                            hideOpacity={true}
                            hidePresets={true}
                            onChange={setTextColor}
                            value={textColor}
                        />
                    </div>
                    <div className="flex gap-[20px]">
                        <CancelBtn01
                            onClick={cancelTextColor}
                            title="Закрыть"
                        />
                    </div>
                </div>
            </div>

            <div className="flex-col justify-start items-start gap-5 flex ">
                <div className="flex-col justify-start items-start gap-2.5 flex">
                    <CHp1 title="Ваше имя" />
                    <CHInput
                        placeholder="например Алекс"
                        setValue={setName}
                        value={name}
                    />
                    <CHdescription1 title="Ваше имя и должность будут отображаться в чатах и ​​социальных сетях." />
                </div>
                <div className="flex-col justify-start items-start gap-2.5 flex">
                    <CHp1 title="Аватар" />
                    <div className="justify-start items-center gap-[20px] flex">
                        <div className="w-[43.87px] h-[43.87px] relative">
                            {resultImage != '' ? (
                                <Image
                                    alt="avatar"
                                    className="rounded-full"
                                    height={43.87}
                                    src={resultImage}
                                    width={43.87}
                                />
                            ) : (
                                <Avatar />
                            )}
                        </div>
                        <InputTypeFile
                            onChange={onChange}
                            title={'Добавить фото'}
                        />
                    </div>
                    <div className="flex flex-col">
                        <CHdescription1
                            className={
                                '' +
                                (selectedSizeOfImage < 500 ||
                                selectedSizeOfImage == 0
                                    ? '!text-green-700'
                                    : '!text-orange-700')
                            }
                            title={`Размер аватара не должен превышать ${sizeOfImage / 1024}  ${typedSize}`}
                        />
                        <CHdescription1
                            className={
                                '' +
                                (selectedSizeOfImage < 500 ||
                                selectedSizeOfImage == 0
                                    ? '!text-green-700'
                                    : '!text-orange-700')
                            }
                            title={`Текущий размер: ${selectedSizeOfImage}  ${typedSize}`}
                        />
                    </div>
                    <CHdescription1 title="Реальное фото помогает увеличить количество чатов" />
                </div>
                <div className="flex-col justify-start items-start gap-2.5 flex">
                    <CHp1 title="Должность или отдел" />

                    <CHInput
                        placeholder="например Команда по работе с клиентами"
                        setValue={setPosition}
                        value={position}
                    />
                </div>
                <div className="flex-col justify-start items-start gap-2.5 flex">
                    <CHp1 title="Выберите цветовую схему для фона" />

                    <div className="justify-start items-start gap-2.5 flex">
                        <div
                            className="w-[39px] h-[39px] bg-blue-500 rounded-full cursor-pointer"
                            onClick={() => setBgColor('rgb(59 130 246)')}
                        />
                        <div
                            className="w-[39px] h-[39px] bg-gray-600 rounded-full cursor-pointer"
                            onClick={() => setBgColor('rgb(75 85 99)')}
                        />
                        <div
                            className="w-[39px] h-[39px] bg-fuchsia-700 rounded-full cursor-pointer"
                            onClick={() => setBgColor('rgb(162 28 175)')}
                        />
                        <div
                            className="w-[39px] h-[39px] bg-primary2 rounded-full cursor-pointer"
                            onClick={() => setBgColor('rgb(249 115 22)')}
                        />
                        <div
                            className="w-[39px] h-[39px] relative cursor-pointer opacity-80 hover:opacity-100 transition-all ease-linear"
                            onClick={() => setModalBgColor(true)}
                        >
                            <PipetkaIcon />
                        </div>
                    </div>
                    <CHdescription1 title="Вы можете настроить дизайн виджета чата в Настройках." />
                </div>

                <div className="flex-col justify-start items-start gap-2.5 flex">
                    <CHp1 title="Выберите цветовую схему для текста" />

                    <div className="justify-start items-start gap-2.5 flex">
                        <div
                            className="w-[39px] h-[39px] bg-blue-500 rounded-[10px] cursor-pointer"
                            onClick={() => setTextColor('rgb(59 130 246)')}
                        />
                        <div
                            className="w-[39px] h-[39px] bg-gray-600 rounded-[10px] cursor-pointer"
                            onClick={() => setTextColor('rgb(75 85 99)')}
                        />
                        <div
                            className="w-[39px] h-[39px] bg-fuchsia-700 rounded-[10px] cursor-pointer"
                            onClick={() => setTextColor('rgb(162 28 175)')}
                        />
                        <div
                            className="w-[39px] h-[39px] bg-primary2 rounded-[10px] cursor-pointer"
                            onClick={() => setTextColor('rgb(249 115 22)')}
                        />
                        <div
                            className="w-[39px] h-[39px] relative cursor-pointer opacity-80 hover:opacity-100 transition-all ease-linear"
                            onClick={() => setModalTextColor(true)}
                        >
                            <PipetkaIcon />
                        </div>
                    </div>
                    <CHdescription1 title="Вы можете настроить дизайн виджета чата в Настройках." />
                </div>

                <div className="flex-col justify-start items-start gap-2.5 flex w-full">
                    <CHp1 title="Проактивное приглашение" />
                    <div className={'flex items-center gap-[10px] w-full '}>
                        <textarea
                            className="w-full outline-none p-[10px] text-main-blue bg-gray-100 border-gray-300 rounded focus:ring-primary2 dark:focus:ring-primary2 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={e => setCommonAsk(e.target.value)}
                            value={commonAsk}
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}
