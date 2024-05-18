'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { commonRequestWithToken } from '@/Common/commonRequest';
import { VOZ, VOZ_MAIN } from '@/Common/urls';
import MainHeader from '@/Components/MainHeader';
import ProjectPagination from '@/HtmlComponent/pagination';
import Image from 'next/image';
import Link from 'next/link';
import groupPhoto from '/public/images/about-group-photo.jpg';
import { useEffect, useState } from 'react';

export default function About() {
    return (
        <div className="flex flex-col">
            <MainHeader />

            <div className="mt-12 lg:container lg:mx-auto lg:py-20 lg:px-20 md:py-16 md:px-6 py-9 px-4">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="w-full lg:w-5/12 flex flex-col justify-center">
                        <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-white pb-4">
                            О платформе
                        </h1>
                        <p className="font-normal text-base leading-6 text-gray-600 dark:text-white">
                            Шторм-трек — это среда, в которой рождаются лидеры
                            будущего.
                            <br />
                            <br />
                            Мы отбираем самых амбициозных и перспективных
                            студентов из лучших ВУЗов Москвы и помогаем им
                            реализовываться как предприниматели через Вызовы —
                            инновационные задачи от компаний-партнеров.
                            <br />
                        </p>
                    </div>
                    <div className="h-96 w-full lg:w-8/12 justify-center">
                        <Image
                            alt="A group of People"
                            className="w-full h-full rounded-lg object-cover"
                            priority
                            src={groupPhoto}
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-8 pt-12">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-white pb-4">
                        Среда, в которой неизбежны инновации
                    </h1>
                    <p className="font-normal text-base leading-6 text-gray-600 dark:text-white">
                        Принимая участие в Шторм-треке как вызоводатель, вы
                        неизбежно найдете тех, кто создаст и внедрит инновации в
                        вашу компанию. Трекинг студентов обеспеичвает
                        продвижение проектов студентов, а регулярное
                        взаимодействие приводит к созданию новых инноваций.
                    </p>
                </div>
            </div>
        </div>
    );
}
