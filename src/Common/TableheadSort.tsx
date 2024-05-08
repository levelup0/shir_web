import { Tooltip } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

interface TableheadSortProps {
    name: string;
    existingStatus: string;
    onChange: (status: string) => void;
}

const TableheadSort: React.FC<TableheadSortProps> = ({
    name,
    existingStatus,
    onChange,
}) => {
    const [status, setStatus] = useState<string>('disabled');

    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();

        if (status === 'disabled') {
            onChange(`${name}_asc`);
            setStatus('asc');
        }
        if (status === 'asc') {
            onChange(`${name}_desc`);
            setStatus('desc');
        }
        if (status === 'desc') {
            onChange('-1');
            setStatus('disabled');
        }
    };

    useEffect(() => {
        /**
         * handle tablehead select change and return disabled icon
         */
        if (
            existingStatus !== `${name}_asc` &&
            existingStatus !== `${name}_desc` &&
            existingStatus !== '-1'
        ) {
            return setStatus('disabled');
        }

        /**
         * handle state after reset button
         */
        if (existingStatus === '-1') {
            setStatus('disabled');
        }
    }, [existingStatus]);

    return (
        <Tooltip content={'Сортировать'} placement="bottom">
            <button className="flex items-center pl-1" onClick={handleClick}>
                <>
                    {status === 'disabled' ? (
                        <svg
                            fill="none"
                            height="1em"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3 12L21 12"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            ></path>
                        </svg>
                    ) : null}
                    {status === 'asc' ? (
                        <svg
                            fill="none"
                            height="1.1em"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7 3V21M7 3L11 7M7 3L3 7M14 3H21M14 9H19M14 15H17M14 21H15"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            ></path>
                        </svg>
                    ) : null}
                    {status === 'desc' ? (
                        <svg
                            fill="none"
                            height="1.1em"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7 3V21M7 21L3 17M7 21L11 17M14 3H21M14 9H19M14 15H17M14 21H15"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            ></path>
                        </svg>
                    ) : null}
                </>
            </button>
        </Tooltip>
    );
};

export default TableheadSort;
