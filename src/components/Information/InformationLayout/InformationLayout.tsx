import { store } from '../../../redux/store.ts';
import { IState } from '../../../redux/reducer.ts';
import { useEffect, useState } from 'react';

export const InformationLayout: React.FC = () => {
	const [appStore, setAppStore] = useState<IState>(store.getState());

	useEffect(() => {
		const unsubscribe = store.subscribe(() => setAppStore(store.getState()));
		return () => {
			unsubscribe();
		};
	}, []);
	return (
		<>
			{appStore!.isDraw && <h1 style={{ textAlign: 'center' }}>Ничья</h1>}
			{!appStore!.isDraw && appStore!.isGameEnded && (
				<h1 style={{ textAlign: 'center' }}>Победа: {appStore!.currentPlayer}</h1>
			)}
			{!appStore!.isDraw && !appStore!.isGameEnded && (
				<h1 style={{ textAlign: 'center' }}>Ходит: {appStore!.currentPlayer}</h1>
			)}
		</>
	);
};
