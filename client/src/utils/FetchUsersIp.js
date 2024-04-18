export const fetchUserIpAddress = async (setUser) => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) {
            throw new Error("Failed to fetch IP address");
        }
        const data = await response.json();
        setUser(prevUser => ({ ...prevUser, ip: data.ip }));
    } catch (error) {
        console.error('Error fetching IP address:', error);
    }
};