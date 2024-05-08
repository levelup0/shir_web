import { useEffect, useState } from 'react';

interface TableheadCheckboxProps {
    itemsId: Array<number>;
    checkedItems: Array<number>;
    checkResult(message: Array<number>): void;
}

const TableheadCheckbox: React.FC<TableheadCheckboxProps> = ({
    checkResult,
    checkedItems,
    itemsId,
}) => {
    const [status, setStatus] = useState<string>('0');

    const handleClick = () => {
        if (status === '1') {
            setStatus('0');
            checkResult([]);
        }
        if (status === '0') {
            setStatus('1');
            checkResult(itemsId);
        }
    };

    useEffect(() => {
        if (checkedItems.length < 1) {
            setStatus('0');
        }
    }, [checkedItems]);

    return (
        <div className="relative" onClick={handleClick}>
            <input
                checked={status === '1'}
                className="sr-only"
                onChange={handleClick}
                type="checkbox"
                value={status}
            />

            <div
                className={
                    'flex h-5 w-5 items-center justify-center rounded border ' +
                    (status === '1'
                        ? 'bg-gray border-primary dark:bg-transparent'
                        : '')
                }
            >
                <span
                    className={
                        'h-2.5 w-2.5 rounded-sm ' +
                        (status === '1'
                            ? 'h-2.5 w-2.5 rounded-sm bg-primary'
                            : '')
                    }
                ></span>
            </div>
        </div>
    );
};

export default TableheadCheckbox;
