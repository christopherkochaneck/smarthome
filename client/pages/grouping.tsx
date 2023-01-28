import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { LayoutWrapper } from '../components/layout/layoutWrapper';

const Grouping: NextPage = () => {
	const router = useRouter();
	return (
		<LayoutWrapper>
			<div className="flex flex-col gap-4">
				<div className="p-5 text-white text-3xl text-center">What do you want to add?</div>
				<button
					className="bg-grey text-white p-2 rounded-xl"
					onClick={() => router.push('/add/addScene')}
				>
					Add a Scene
				</button>
				<button
					className="bg-grey text-white p-2 rounded-xl"
					onClick={() => router.push('/add/addGroup')}
				>
					Add a Group
				</button>
			</div>
		</LayoutWrapper>
	);
};

export default Grouping;
