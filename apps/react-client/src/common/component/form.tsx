import { FormEventHandler, ReactNode } from "react";

interface FormProps {
    submitInputValue: string;
    onSubmit: FormEventHandler<HTMLFormElement>;
    children: ReactNode;
}

export function Form(props: FormProps): JSX.Element {
    return (
        <form onSubmit={props.onSubmit}>
            {props.children}
            <input type="submit" value={props.submitInputValue}/>
        </form>
    );
}
