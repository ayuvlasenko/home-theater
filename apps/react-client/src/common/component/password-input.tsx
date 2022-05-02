import { ChangeEventHandler } from "react";

interface PasswordInputProps {
    id: string;
    label: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export function PasswordInput(props: PasswordInputProps): JSX.Element {
    return (
        <div>
            <label htmlFor="name">{props.label}:</label>
            <input
                type="password"
                id={props.id}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}
