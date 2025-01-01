const getBaseUrl = () => {
    return import.meta.env.VITE_REACT_APP_BACKEND_URL || "http://localhost:5000";
}

export default getBaseUrl;