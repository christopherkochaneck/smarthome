import { NextPage } from 'next';
import { DeviceForm } from '../../components/forms/DeviceForm';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';

const AddDevice: NextPage = () => {
	return (
		<LayoutWrapper showAppbar={true} showAppbarIcon={false} appBarTitle="Add Device">
			<DeviceForm />
		</LayoutWrapper>
	);
};

export default AddDevice;
