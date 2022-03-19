import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
	href: string;
}

export const NavbarButton: FC<Props> = (props) => {
	const router = useRouter();

	let isActive = router.pathname === props.href;
	let textColor: string;
	if (isActive) {
		textColor = 'text-white';
	} else {
		textColor = 'text-zinc-700';
	}

	return (
		<div className="grid">
			<div className="text-center hover:cursor-pointer w-min justify-self-center">
				<Link href={props.href}>
					<a className={textColor}>{props.children}</a>
				</Link>
			</div>
		</div>
	);
};
