import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
	href: string | undefined;
	children?: React.ReactNode;
}

export const NavbarButton: FC<Props> = (props) => {
	const router = useRouter();

	let isActive = router.pathname === props.href;
	const textColor = isActive ? 'text-white' : 'text-grey';

	return (
		<div className="grid h-full w-full">
			<div className="self-center text-center hover:cursor-pointer w-min justify-self-center">
				<Link href={props.href ? props.href : ''} className={textColor}>
					{props.children}
				</Link>
			</div>
		</div>
	);
};
