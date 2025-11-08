
export const API_BASE_URL = "http://localhost:8000";

export const getDateString = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}
