export default async function api(method, url, body) {
    const request = new Request(url, {
        method,
        body: JSON.stringify(body),
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${getJWTToken()}`,
        }),
    });

    try {
        const response = await fetch(request);
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            error: { message: "Something went wrong using api function" },
        };
    }
}

function getJWTToken() {
    return localStorage.getItem("jwtToken");
}
