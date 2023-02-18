import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import React from 'react';
import { EditDeviceForm } from '../../components/forms/EditDeviceForm';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';

interface Props {
	session: Session;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);
	if (!session) {
		return {
			redirect: {
				destination: '/api/auth/signin',
				permanent: false,
			},
		};
	}

	return { props: { session } };
};

const EditDevice: NextPage<Props> = ({ session }) => {
	return (
		<LayoutWrapper showAppbar showBackButton appBarTitle="Devices">
			<EditDeviceForm />
		</LayoutWrapper>
	);
};

export default EditDevice;
