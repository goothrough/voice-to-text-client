const BASE_API_URL = process.env.REACT_APP_API_URL;

if (!BASE_API_URL) {
    throw new Error("REACT_APP_API_URL is not defined in the environment variables.");
}

export { BASE_API_URL };
