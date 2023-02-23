import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { DeviceForm } from '../../components/forms/DeviceForm';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { redirectByPermission } from '../../util/redirect';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;

	return { props: {} };
};

const AddDevice: NextPage = () => {
	return (
		<LayoutWrapper showAppbar showBackButton appBarTitle="Add Device">
			<DeviceForm />
		</LayoutWrapper>
	);
};

export default AddDevice;
