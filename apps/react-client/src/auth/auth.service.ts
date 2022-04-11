export class AuthService {
    async login(options: {
        login: string;
        password: string;
    }): Promise<void> {
        await fetch("/api/authentication/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                login: options.login,
                password: options.password,
            }),
        });
    }

    async tryRefresh(): Promise<boolean> {
        try {
            const response = await fetch("/api/authentication/refresh");
            return response.status === 200;
        }
        catch (e) {
            console.log(e);
        }

        return false;
    }
}
