/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';

export default function MultiSelect({
    options,
    onChange,
    defaultValue = [],
}: any) {
    let defaultValueStateOld: any = [];

    const handleChange = (selectedOptions: any) => {
        if (!selectedOptions.length) {
            onChange('');
        } else {
            onChange(JSON.stringify(selectedOptions));
        }
    };

    try {
        if (defaultValue?.length > 0) {
            for (let i = 0; i < defaultValue.length; i++) {
                defaultValueStateOld.push({
                    label: defaultValue[i].category?.name,
                    value: defaultValue[i].category?.id,
                    name: defaultValue[i].category?.name,
                });
            }
        }
    } catch (e) {
        defaultValueStateOld = null;
    }

    return (
        <div className="relative bg-white dark:bg-form-input">
            <Select
                classNames={{
                    control: ({ isFocused }) =>
                        `w-full !min-h-[41.6px] pl-2 rounded border border-stroke dark:border-form-strokedark dark:bg-form-input !disabled:cursor-default  ${
                            isFocused ? '!border-primary' : ''
                        }`,
                    option: ({ isFocused }) =>
                        `!px-2 !pt-[0px] !pb-[0px] !text-medium dark:bg-form-input dark:text-bodydark hover:text-white ${
                            isFocused ? '!bg-primary text-white' : ''
                        }`,
                    placeholder: () => 'dark:text-bodydark/50',
                    menu: () => '!mt-[1px] !rounded-b-md !rounded-t-md',
                    menuList: () =>
                        '!pt-[0] !mt-[0px] border border-stroke dark:border-form-strokedark rounded-t-md !rounded-b-md !rounded-t-md !pb-[0px]',
                    indicatorSeparator: () => 'ml-1',
                    multiValue: () => 'dark:bg-white/30 dark:text-bodydark',
                    multiValueLabel: () => 'dark:text-bodydark',
                }}
                defaultValue={defaultValueStateOld}
                getOptionLabel={(option: any) => {
                    return option?.name;
                }}
                getOptionValue={(option: any) => option?.id?.toString()}
                isMulti
                isSearchable={false}
                onChange={handleChange}
                options={options}
                placeholder="Категория"
            />
        </div>
    );
}
