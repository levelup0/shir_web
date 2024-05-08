import { loaderSvg } from '@/Common/function';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PrimaryBtn01({
    title,
    onClick,
    createProfileStatus,
}: any) {
    return (
        <button
            className="h-[45px] p-2.5 bg-primary2 hover:bg-primary2 rounded-[4px] justify-center items-center gap-2.5 flex text-white text-[14px] font-semibold   leading-normal transition-all ease-linear"
            disabled={createProfileStatus}
            onClick={() => onClick()}
        >
            {title}
            {createProfileStatus == true ? (
                <div className="flex items-center pl-1">{loaderSvg()}</div>
            ) : null}
        </button>
    );
}
