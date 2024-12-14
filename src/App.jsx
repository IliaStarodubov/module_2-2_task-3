import { useState } from 'react';
import styles from './app.module.css';

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [result, setResult] = useState(null);
	const NUMS = ['7', '8', '9', 'C', '4', '5', '6', '+', '1', '2', '3', '-', '0', '='];

	const handleButtonClick = (value) => {
		if (result !== null) {
			setResult(null);
			setOperand2('');
			setOperator('');
			setOperand1(result);
		}

		if (value === '+') {
			setOperator('+');
		}

		if (value === '-') {
			setOperator('-');
		}

		if (operator.length === 0 && value !== '+' && value !== '-') {
			setOperand1(operand1 + value);
		} else if (operator === '+' || operator === '-') {
			setOperand2(operand2 + value);
		}

		if (value === '=') {
			let result;
			if (operator === '+') {
				result = parseInt(operand1) + parseInt(operand2);
			} else if (operator === '-') {
				result = parseInt(operand1) - parseInt(operand2);
			}
			setResult(result);
			setOperand2('');
			setOperator('');
			setOperand1(result.toString());
		}
	};

	const handleClickClear = () => {
		setOperand1('');
		setOperand2('');
		setOperator('');
		setResult(null);
	};

	return (
		<>
			<div className={styles.calculator}>
				<input
					className={styles.display}
					readOnly
					style={{ color: result !== null ? 'green' : 'white' }}
					value={result !== null ? result : operand1 + operator + operand2}
				/>
				<div className={styles.keys}>
					{NUMS.map((value, index) => (
						<button
							onClick={
								value === 'C'
									? handleClickClear
									: () => {
											handleButtonClick(value);
										}
							}
							key={index}
							className={`${styles['custom-btn']}
													${value === '=' || value === '+' || value === '-' || value === 'C' ? styles['custom-btn-operator'] : ''}
													${value === '0' ? styles['item-zero'] : ''}`}
						>
							{value}
						</button>
					))}
				</div>
			</div>
		</>
	);
};
