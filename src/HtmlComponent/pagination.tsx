/* eslint-disable @typescript-eslint/no-explicit-any */
import Pagination from 'react-js-pagination';

const ProjectPagination = (props: any) => {
    const { currentPage, totalItems, pageChange, itemsPerPage } = props;
    return (
        <div className="p-4 sm:p-6 xl:p-1.5">
            <Pagination
                activeLinkClass="text-white bg-black "
                activePage={currentPage || 1}
                firstPageText={'Первая'}
                hideDisabled={true}
                innerClass="flex flex-wrap items-center justify-center hover:text-white"
                itemsCountPerPage={+itemsPerPage}
                lastPageText={'Последняя'}
                linkClass="flex items-center justify-center rounded py-1.5 px-3 text-black hover:bg-black  font-medium hover:text-white"
                linkClassNext="flex h-8 w-8 items-center justify-center rounded hover:bg-black  hover:text-white"
                linkClassPrev="flex h-8 w-8 items-center justify-center rounded hover:bg-black hover:text-white"
                nextPageText={
                    <svg
                        className="fill-current"
                        fill="none"
                        height="16"
                        viewBox="0 0 8 16"
                        width="8"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0.819531 15.1156C0.650781 15.1156 0.510156 15.0593 0.369531 14.9468C0.116406 14.6937 0.116406 14.3 0.369531 14.0468L6.27578 7.99995L0.369531 1.9812C0.116406 1.72808 0.116406 1.33433 0.369531 1.0812C0.622656 0.828076 1.01641 0.828076 1.26953 1.0812L7.62578 7.54995C7.87891 7.80308 7.87891 8.19683 7.62578 8.44995L1.26953 14.9187C1.15703 15.0312 0.988281 15.1156 0.819531 15.1156Z"
                            fill=""
                        ></path>
                    </svg>
                }
                onChange={(pageNumber: number) => pageChange(pageNumber)}
                pageRangeDisplayed={10}
                prevPageText={
                    <svg
                        className="fill-current"
                        fill="none"
                        height="16"
                        viewBox="0 0 8 16"
                        width="8"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.17578 15.1156C7.00703 15.1156 6.83828 15.0593 6.72578 14.9187L0.369531 8.44995C0.116406 8.19683 0.116406 7.80308 0.369531 7.54995L6.72578 1.0812C6.97891 0.828076 7.37266 0.828076 7.62578 1.0812C7.87891 1.33433 7.87891 1.72808 7.62578 1.9812L1.71953 7.99995L7.65391 14.0187C7.90703 14.2718 7.90703 14.6656 7.65391 14.9187C7.48516 15.0312 7.34453 15.1156 7.17578 15.1156Z"
                            fill=""
                        ></path>
                    </svg>
                }
                totalItemsCount={totalItems || 0}
            />
        </div>
    );
};

export default ProjectPagination;
