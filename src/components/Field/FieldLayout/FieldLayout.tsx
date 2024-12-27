import { IFieldLayoutProps } from '../../../interfaces/props.interface.ts';
import styles from './field.layout.module.css';
import { store } from '../../../redux/store.ts';
import { IState } from '../../../redux/reducer.ts';
import { useEffect, useState } from 'react';

export const FieldLayout: React.FC<IFieldLayoutProps> = ({ clickHandler }) => {
	const [appStore, setAppStore] = useState<IState>(store.getState());

	useEffect(() => {
		const unsubscribe = store.subscribe(() => setAppStore(store.getState()));
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<>
			<div className={styles.container}>
				{appStore!.field?.map((val, i) => (
					<div className={styles.cells} key={i}>
						<button
							className={styles.button}
							onClick={() => clickHandler(i)}
							disabled={appStore!.isGameEnded}
						>
							{val}
						</button>
					</div>
				))}
			</div>
		</>
	);
};
