import CallerData from '@/Components/CallerData';
import MainHeader from '@/Components/MainHeader';

export default function Caller() {
    return (
        <div className="flex flex-col">
            <MainHeader />

            <CallerData />
        </div>
    );
}
