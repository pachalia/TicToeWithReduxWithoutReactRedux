import { useEffect, useState } from 'react';
import { store } from '../../redux/store.ts';
import { Game } from '../Game/Game.tsx';

// type Props = { children: React.ReactNode };
export const Store: React.FC = () => {
	const state = store.getState();
	const [appStore, setAppStore] = useState(state);
	useEffect(() => {
		store.subscribe(() => {
			setAppStore(store.getState());
		});
	}, []);

	return <Game />;
};
