import Link from 'next/link';
import { FC } from 'react';
import Plus from '../../../res/images/plus.svg';

interface Props {
	showAppbar: boolean;
	showAddIcon?: boolean;
	title?: string;
	href?: string;
}

export const Appbar: FC<Props> = (props) => {
	return (
		<>
			{props.showAppbar ? (
				<div className="flex bg-black w-screen h-16">
					<div className="text-white flex-1 my-auto relative p-2 text-[24px] w-min h-min">
						{props.title}
					</div>
					{props.showAddIcon ? (
						<div className="text-center hover:cursor-pointer w-min justify-self-center p-2">
							<Link href={props.href ? props.href : ''}>
								<a className="text-white " href="/add">
									<Plus />
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
