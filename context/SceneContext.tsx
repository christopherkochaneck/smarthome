import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useEffect,
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

const SceneContext = createContext<SceneContextType>(undefined!);

export function useScenes() {
	return useContext(SceneContext);
}

export const SceneProvider: FC = (props) => {
	const [scenes, setScenes] = useState<SceneType[]>([]);

	const fetchData = async () => {
		const sceneRes = await axios({ method: 'get', url: `${BASE_URL}/api/scene` });
		setScenes(sceneRes.data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const addScene = async (scene: SceneType) => {
		await axios({
			method: 'post',
			url: `${BASE_URL}/api/scene`,
			data: scene,
		});

		setScenes([...scenes, scene]);
	};

	const updateScene = async (scene: SceneType) => {
		await axios({
			method: 'patch',
			url: `${BASE_URL}/api/scene`,
			data: scene,
		});

		const index = scenes.findIndex((x) => x.id === scene.id);

		scenes[index] = scene;

		setScenes([...scenes]);
	};

	const deleteScene = async (scene: SceneType) => {
		const index = scenes.findIndex((x) => x.id === scene.id);

		scenes.splice(index, 1);

		await axios({
			method: 'delete',
			url: `${BASE_URL}/api/scene`,
			data: scene,
		});

		setScenes([...scenes]);
	};

	const contextValue: SceneContextType = { scenes, setScenes, addScene, updateScene, deleteScene };

	return (
		<>
			<SceneContext.Provider value={contextValue}>{props.children}</SceneContext.Provider>
		</>
	);
};
