import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { DeviceForm } from '../../components/forms/DeviceForm';
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

const AddDevice: NextPage<Props> = ({ session }) => {
	return (
		<LayoutWrapper showAppbar showBackButton appBarTitle="Add Device">
			<DeviceForm />
		</LayoutWrapper>
	);
};

export default AddDevice;
