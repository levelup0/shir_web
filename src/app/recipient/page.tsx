import MainHeader from '@/Components/MainHeader';
import ReceipentData from '@/Components/ReceipentData';

export default function Caller() {
    return (
        <div className="flex flex-col">
            <MainHeader />
            <ReceipentData />
        </div>
    );
}
