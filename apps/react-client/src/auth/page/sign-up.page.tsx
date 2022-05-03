import { useState } from "react";
import { useAuth } from "../hook";
import { Form, PasswordInput, TextInput } from "../../common/component";

export function SignUpPage(): JSX.Element {
    const { signUp } = useAuth();
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Form submitInputValue={"sign up"} onSubmit={(e) => {
            e.preventDefault();
            signUp({ name, login, password });
        }}>
            <TextInput
                id={"name"}
                label={"Name"}
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />
            <TextInput
                id={"login"}
                label={"Login"}
                value={login}
                onChange={(e) => {
                    setLogin(e.target.value);
                }}
            />
            <PasswordInput
                id={"password"}
                label={"Password"}
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
        </Form>
    );
}
