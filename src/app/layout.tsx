import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import Head from 'next/head';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import { ToastContainer } from 'react-toastify';
import CommonContextComponent from '@/Common/CommonContextComponent';
import { NextAuthProvider } from './NextAuthProvider';

const inter = localFont({
    src: [
        {
            path: '../fonts/Inter-Bold.ttf',
            weight: '600',
            style: 'bold',
        },
        {
            path: '../fonts/Inter-Medium.ttf',
            weight: '500',
            style: 'medium',
        },
        {
            path: '../fonts/Inter-ExtraBold.ttf',
            weight: '900',
            style: 'extrabold',
        },
        {
            path: '../fonts/Inter-Regular.ttf',
            weight: '400',
            style: 'light',
        },
    ],
});

export const metadata: Metadata = {
    title: 'Шторм-трек',
    description: 'Платформа Шторм-трек',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <meta content="en_US" property="og:locale"></meta>
            <meta content="article" property="og:type"></meta>
            <meta content="Шторм-трек" property="og:title"></meta>
            <meta content="Шторм-трек" property="og:description"></meta>
            <meta content="https://www.google.com" property="og:url"></meta>
            <meta content="Шторм-трек" property="og:site_name"></meta>
            <meta
                content="https://www.facebook.com/vizovishir"
                property="article:publisher"
            ></meta>

            <meta content="no-referrer-when-downgrade" name="referrer" />
            <meta
                content="same-origin-allow-popups"
                name="Cross-Origin-Opener-Policy"
            />
            <Head>
                <link
                    href="/favicon.png"
                    rel="icon"
                    sizes="48x48"
                    type="image/png"
                />
                <link
                    href="/favicon.png"
                    rel="icon"
                    sizes="32x32"
                    type="image/png"
                />
                <link
                    href="/favicon.png"
                    rel="icon"
                    sizes="16x16"
                    type="image/png"
                />
                {/* <link
                    href="/favicon-16x16.png"
                    rel="icon"
                    sizes="16x16"
                    type="image/png"
                /> */}
            </Head>
            <body className={inter.className}>
                <NextAuthProvider>
                    <ToastContainer />
                    <ReCaptchaProvider
                        reCaptchaKey={
                            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                        }
                    >
                        <CommonContextComponent>
                            {children}
                        </CommonContextComponent>
                    </ReCaptchaProvider>
                </NextAuthProvider>
            </body>
        </html>
    );
}
