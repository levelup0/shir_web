/* eslint-disable @typescript-eslint/no-explicit-any */
export default function CancelBtn01({ title, onClick }: any) {
    return (
        <button
            className="h-[45px] p-2.5 border bg-white rounded-[4px] justify-center items-center gap-2.5 flex text-black text-[15px] font-semibold   leading-normal"
            onClick={() => onClick()}
        >
            {title}
        </button>
    );
}
