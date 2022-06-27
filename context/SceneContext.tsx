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

interface SceneContextType {
	scenes: SceneType[];
	setScenes: Dispatch<SetStateAction<SceneType[]>>;
	addScene: (scene: SceneType) => void;
}

const SceneContext = createContext<SceneContextType>(undefined!);

export function useScenes() {
	return useContext(SceneContext);
}

export const SceneProvider: FC = (props) => {
	const [scenes, setScenes] = useState<SceneType[]>([]);

	const fetchData = async () => {
		const sceneRes = await axios({ method: 'get', url: 'http://localhost:3000/api/scene' });
		setScenes(sceneRes.data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const addScene = async (scene: SceneType) => {
		await axios({
			method: 'post',
			url: 'http://localhost:3000/api/scene',
			data: scene,
		});

		setScenes([...scenes, scene]);
	};

	const contextValue: SceneContextType = { scenes, setScenes, addScene };

	return (
		<>
			<SceneContext.Provider value={contextValue}>{props.children}</SceneContext.Provider>
		</>
	);
};
