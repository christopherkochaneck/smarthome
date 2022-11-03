import Link from 'next/link';
import { FC } from 'react';
import { ArrowNarrowLeft, Plus } from 'tabler-icons-react';

interface Props {
	showAppbar?: boolean;
	showAddIcon?: boolean;
	showBackButton?: boolean;
	title?: string;
	href?: string;
}

export const Appbar: FC<Props> = (props) => {
	return (
		<>
			{props.showAppbar ? (
				<div className="flex bg-black w-screen h-16 items-center p-4 gap-x-2">
					{props.showBackButton ? (
						<div className="text-white hover:cursor-pointer" onClick={() => history.back()}>
							<ArrowNarrowLeft className="h-8 w-8" />
						</div>
					) : (
						<></>
					)}
					<div className="text-white flex-1 my-auto relative text-[24px] w-min h-min">
						{props.title}
					</div>
					{props.showAddIcon ? (
						<div className="text-center hover:cursor-pointer w-min justify-self-center">
							<Link className="text-white " href={props.href ? props.href : ''}>
								<Plus className="h-8 w-8" />
							</Link>
						</div>
					) : (
						<></>
					)}
				</div>
			) : null}
		</>
	);
};
