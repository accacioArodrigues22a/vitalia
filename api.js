function getApiUrl() {
    const host = window.location.hostname;
    const origin = window.location.origin; 

    // 1. Localhost (Sua casa / PC pessoal)
    if (host === "127.0.0.1" || host === "localhost") {
        return "http://localhost:3333";
    }

    // 2. Nuvem da Escola (Seu ambiente EDUTEC)
    if (host.includes("cloudworkstations") || host.includes("web.app") || host.includes("edutec")) {
        
        // O PULO DO GATO: 
        // o site tá na porta 5500, o backend tá na 3333. O código troca sozinho.
        if (origin.includes("5500")) return origin.replace("5500", "3333");
        if (origin.includes("5501")) return origin.replace("5501", "3333");
        if (origin.includes("5502")) return origin.replace("5502", "3333");
    }

    // 3. Vercel (Quando o professor ensinar a subir)
    return "/api";
}

const API_BASE_URL = getApiUrl();
console.log("🌍 O site descobriu que a API está em:", API_BASE_URL);