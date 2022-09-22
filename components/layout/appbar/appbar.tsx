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
				<div className="flex bg-black w-screen h-16 items-center">
					{props.showBackButton ? (
						<div className="text-white" onClick={() => history.back()}>
							<ArrowNarrowLeft className="h-8 w-8" />
						</div>
					) : (
						<></>
					)}
					<div className="text-white flex-1 my-auto relative p-2 text-[24px] w-min h-min">
						{props.title}
					</div>
					{props.showAddIcon ? (
						<div className="text-center hover:cursor-pointer w-min justify-self-center p-2">
							<Link href={props.href ? props.href : ''}>
								<a className="text-white " href="/add">
									<Plus className="h-8 w-8" />
								</a>
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
