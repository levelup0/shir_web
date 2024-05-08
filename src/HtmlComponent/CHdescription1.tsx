/* eslint-disable @typescript-eslint/no-explicit-any */
export default function CHdescription1({ title, className }: any) {
    return (
        <p
            className={
                'text-neutral-400 text-[14px] font-normal   leading-normal ' +
                (className != null ? className : null)
            }
        >
            {title}
        </p>
    );
}
