/* eslint-disable @typescript-eslint/no-explicit-any */
export default function InputTypeFile({ title, onChange }: any) {
    return (
        <form>
            <div className="flex flex-row items-center">
                <input
                    hidden
                    id="custom-input"
                    onChange={e => onChange(e)}
                    type="file"
                />
                <label
                    className="block  py-2 px-2 text-[14px] rounded-md border-0  bg-pink-50
            text-black hover:bg-pink-100 cursor-pointer"
                    htmlFor="custom-input"
                >
                    {title}
                </label>
                <label className="text-sm text-slate-500"></label>
            </div>
        </form>
    );
}
