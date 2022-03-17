import type { NextPage } from 'next';
import { useState } from 'react';
import { LayoutWrapper } from '../components/layout/layoutWrapper';

const Settings: NextPage = () => {
	return (
		<LayoutWrapper>
			<div className="grid grid-cols-2">Settings</div>
		</LayoutWrapper>
	);
};

export default Settings;
