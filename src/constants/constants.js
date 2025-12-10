
export const API_BASE_URL = "https://b3akw57fu5.execute-api.us-east-1.amazonaws.com/dev";

export const getDateString = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}
