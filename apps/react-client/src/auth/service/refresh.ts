export async function refresh(): Promise<boolean> {
    const response = await fetch("/api/auth/refresh");
    return response.status === 200;
}
