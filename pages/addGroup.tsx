import type { NextPage } from 'next';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
<<<<<<< HEAD
import { FloatingActionButton } from '../components/ui/floatingActionButton/floatingActionButton';
import { Input } from '../components/ui/input/input';
import DiskFloppy from '../res/images/device-floppy.svg';
import { useDevices } from '../context/DeviceContext';
import { LightSelectionCard } from '../components/devices/selectionCard/lightSelectionCard';
import { PlugSelectionCard } from '../components/devices/selectionCard/PlugSelectionCard';
import { useGroups } from '../context/GroupContext';
import { GroupType } from '../types/GroupType';
import { v4 as uuidv4 } from 'uuid';

const AddGroup: NextPage = () => {
	const devices = useDevices();
	const groups = useGroups();
	const [groupName, setGroupName] = useState<string>('');
	const [ids, setIds] = useState<string[]>([]);
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let group: GroupType = {
			id: uuidv4(),
			name: groupName,
			ids: ids,
		};
		groups.addGroup(group);

		router.push('/groups');
	};

=======
import { GroupForm } from '../components/forms/GroupForm';

const AddGroup: NextPage = () => {
>>>>>>> feat/Scenes
	return (
		<LayoutWrapper showAppbar={true} showAppbarIcon={false} appBarTitle="Add Group">
			<GroupForm />
		</LayoutWrapper>
	);
};

export default AddGroup;
