export interface SingInOptions {
    login: string;
    password: string;
}

export interface SignUpOptions extends SingInOptions {
    name: string;
}

export async function signIn(options: SingInOptions): Promise<boolean> {
    const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            login: options.login,
            password: options.password,
        }),
    });

    return response.status === 201;
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

export async function refresh(): Promise<boolean> {
    const response = await fetch("/api/auth/refresh");
    return response.status === 200;
}
