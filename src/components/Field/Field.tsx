import { FieldLayout } from './FieldLayout/FieldLayout.tsx';
import { store } from '../../redux/store.ts';

export const Field: React.FC = () => {
	const clickHandler = (i: number) => {
		const { currentPlayer, field } = store.getState();
		if (field[i] === '') {
			const array = field;
			array[i] = currentPlayer;
			store.dispatch({ type: 'FIELD', payload: array });
		}
	};
	return <FieldLayout clickHandler={clickHandler} />;
};
