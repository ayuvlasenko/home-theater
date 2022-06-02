import { SingInOptions } from "./sign-in";

export interface SignUpOptions extends SingInOptions {
    name: string;
}

export async function signUp(options: SignUpOptions): Promise<boolean> {
    const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: options.name,
            login: options.login,
            password: options.password,
        }),
    });

    return response.status === 201;
}
