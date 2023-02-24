import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { EditDeviceForm } from '../../components/forms/EditDeviceForm';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { redirectByPermission } from '../../util/redirect';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;

	return { props: { session } };
};

const EditDevice: NextPage = () => {
	return (
		<LayoutWrapper showAppbar showBackButton appBarTitle="Devices">
			<EditDeviceForm />
		</LayoutWrapper>
	);
};

export default EditDevice;
