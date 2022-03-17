import type { NextPage } from 'next';
import { useState } from 'react';
import { LayoutWrapper } from '../components/layout/layoutWrapper';

const Groups: NextPage = () => {
	return (
		<LayoutWrapper>
			<div className="grid grid-cols-2">
				<div className="p-4">Groups</div>
			</div>
		</LayoutWrapper>
	);
};

export default Groups;
