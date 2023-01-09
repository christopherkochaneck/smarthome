import { NextPage } from 'next';
import { EditDeviceForm } from '../../components/forms/EditDeviceForm';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';

const EditDevice: NextPage = () => {
	return (
		<LayoutWrapper showAppbar showBackButton appBarTitle="Devices">
			<EditDeviceForm />
		</LayoutWrapper>
	);
};

export default EditDevice;
