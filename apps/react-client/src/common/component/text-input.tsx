import { ChangeEventHandler } from "react";

interface TextInputProps {
    id: string;
    label: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export function TextInput(props: TextInputProps): JSX.Element {
    return (
        <div>
            <label htmlFor="name">{props.label}:</label>
            <input
                type="text"
                id={props.id}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}
