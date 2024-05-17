/* eslint-disable @typescript-eslint/no-explicit-any */
export default function BurgerIcon({ setMobileMenuShow, mobileMenuShow }: any) {
    return (
        <svg
            className="cursor-pointer fill-white dark:fill-bodydark1"
            height="30"
            onClick={() => setMobileMenuShow(!mobileMenuShow)}
            viewBox="0 0 25 25"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M4 20H22V18H4V20ZM4 16H22V14H4V16ZM4 12H22V10H4V12ZM4 6V8H22V6H4Z"></path>
        </svg>
    );
}
