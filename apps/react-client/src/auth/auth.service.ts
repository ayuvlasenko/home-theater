export async function signIn(options: {
    login: string;
    password: string;
}): Promise<boolean> {
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

export async function refresh(): Promise<boolean> {
    const response = await fetch("/api/auth/refresh");
    return response.status === 200;
}
