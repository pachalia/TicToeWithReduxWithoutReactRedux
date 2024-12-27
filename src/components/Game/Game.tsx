import { GameLayout } from './GameLayout/GameLayout.tsx';
import { isWin } from '../../utils/utils.ts';
import { store } from '../../redux/store.ts';
import { IState } from '../../redux/reducer.ts';
import { useEffect, useState } from 'react';

export type player = 'X' | '0';
export type field = player | '';

export const Game: React.FC = () => {
	const [appStore, setAppStore] = useState<IState>(store.getState());

	useEffect(() => {
		const unsubscribe = store.subscribe(() => setAppStore(store.getState()));
		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		!appStore?.field.includes('') && isWin(appStore!.field, appStore!.currentPlayer)
			? store.dispatch({ type: 'isGameEnded', payload: true })
			: null;
		if (
			!appStore?.field.includes('') &&
			!isWin(appStore!.field, appStore!.currentPlayer)
		) {
			store.dispatch({ type: 'isGameEnded', payload: true });
			store.dispatch({ type: 'isDraw', payload: true });
		}
		isWin(appStore!.field, appStore!.currentPlayer)
			? store.dispatch({ type: 'isGameEnded', payload: true })
			: store.dispatch({
					type: 'CURRENT_PLAYER',
					payload: appStore!.currentPlayer === 'X' ? '0' : 'X',
				});
	}, [appStore.field]);

	const clickHandler = () => {
		store.dispatch({ type: 'RESTART_GAME' });
	};
	return (
		<>
			<GameLayout />
			{appStore?.isGameEnded && (
				<button
					onClick={clickHandler}
					style={{ margin: '30px auto', display: 'block' }}
				>
					Начать сначала
				</button>
			)}
		</>
	);
};
