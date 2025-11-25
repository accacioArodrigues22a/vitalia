function getApiUrl() {
    const host = window.location.hostname;
    const origin = window.location.origin; 

    // 1. Local (Casa)
    if (host === "127.0.0.1" || host === "localhost") {
        return "http://localhost:3333";
    }

    // 2. Nuvem da Escola (Cloud Workstations / Firebase)
    if (host.includes("cloudworkstations.dev") || host.includes("web.app")) {
        // Troca a porta 5500 do site pela 3333 do backend
        if (origin.includes("5500")) return origin.replace("5500", "3333");
        if (origin.includes("5501")) return origin.replace("5501", "3333");
    }

    // 3. Vercel (Produção)
    return "/api";
}

const API_BASE_URL = getApiUrl();