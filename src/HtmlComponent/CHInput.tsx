import { useEffect, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function CHInput({ placeholder, value, setValue }: any) {
    const [validateField, setValidateField] = useState<boolean>(true);
    useEffect(() => {
        if (value.length > 0) {
            setValidateField(false);
        } else {
            setValidateField(true);
        }
    }, [value]);
    return (
        <>
            <input
                className={
                    'w-[362px] h-12 p-2.5 outline-none bg-zinc-300 bg-opacity-0 rounded-[10px] border  justify-start items-center gap-2.5 flex  text-[16px] font-medium   leading-normal ' +
                    (validateField == true
                        ? 'border-primary2'
                        : 'border-green-900')
                }
                onChange={e => setValue(e.target.value)}
                placeholder={placeholder}
                value={value}
            />
        </>
    );
}
