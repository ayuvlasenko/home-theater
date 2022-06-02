export interface SingInOptions {
    login: string;
    password: string;
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
