import MainBlockSecond from '@/Components/MainBlockSecond';
import MainHeader from '@/Components/MainHeader';

export default function Home() {
    return (
        <div className="flex flex-col">
            <MainHeader />
            <MainBlockSecond />
        </div>
    );
}
