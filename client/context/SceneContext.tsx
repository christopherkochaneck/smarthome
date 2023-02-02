import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import axios from 'axios';
import { SceneType } from '../types/SceneType';
import { BASE_URL } from '../config/env';

interface SceneContextType {
	scenes: SceneType[];
	setScenes: Dispatch<SetStateAction<SceneType[]>>;
	addScene: (scene: SceneType) => void;
	updateScene: (scene: SceneType) => void;
	deleteScene: (scene: SceneType) => void;
}

interface Props {
	children?: React.ReactNode;
}

const SceneContext = createContext<SceneContextType>(undefined!);

export function useScenes() {
	return useContext(SceneContext);
}

export const SceneProvider: FC<Props> = (props) => {
	const [scenes, setScenes] = useState<SceneType[]>([]);

	const fetchData = async () => {
		const sceneRes = await axios({ method: 'get', url: `${BASE_URL}/api/scene` });
		setScenes(sceneRes.data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const contextValue: SceneContextType = useMemo(() => {
		const addScene = async (scene: SceneType) => {
			const res = await axios({
				method: 'post',
				url: `${BASE_URL}/api/scene`,
				data: scene,
			});

			let createdScene: SceneType = {
				_id: res.data._id,
				name: res.data.name,
				actions: res.data.actions,
			};

			setScenes([...scenes, createdScene]);
		};

		const updateScene = async (scene: SceneType) => {
			await axios({
				method: 'patch',
				url: `${BASE_URL}/api/scene/${scene._id}`,
				data: scene,
			});

			const index = scenes.findIndex((x) => x._id === scene._id);

			scenes[index] = scene;

			setScenes([...scenes]);
		};

		const deleteScene = async (scene: SceneType) => {
			const index = scenes.findIndex((x) => x._id === scene._id);

			scenes.splice(index, 1);

			await axios({
				method: 'delete',
				url: `${BASE_URL}/api/scene/${scene._id}`,
			});

			setScenes([...scenes]);
		};
		return {
			scenes,
			setScenes,
			addScene,
			updateScene,
			deleteScene,
		};
	}, [scenes, setScenes]);

	return (
		<>
			<SceneContext.Provider value={contextValue}>{props.children}</SceneContext.Provider>
		</>
	);
};
