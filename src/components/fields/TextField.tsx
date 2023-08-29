export interface TextFieldProps {
	value: string;
	onValueChange: (value: string) => void;
}

const TextField = ({ value, onValueChange }: TextFieldProps) => {
	return (
		<p>
			<input
				type="text"
				value={value}
				onChange={(e) => onValueChange(e.target.value)}
			/>
		</p>
	);
};

export default TextField;
