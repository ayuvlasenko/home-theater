import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, useFromPath } from "../hook";
import { Form, PasswordInput, TextInput } from "../../common/component";

export function SignInPage(): JSX.Element {
    const { signIn } = useAuth();
    const fromPath = useFromPath("/");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <Form submitInputValue={"sign in"} onSubmit={(e) => {
                e.preventDefault();
                signIn({ login, password });
            }}>
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
            <Link to={"/sign-up"} state={{ from: fromPath }}>Sign up</Link>
        </>
    );
}
