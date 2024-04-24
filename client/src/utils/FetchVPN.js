export const fetchUserVPN = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) {
            throw new Error("Failed to fetch IP address");
        }
        const data = await response.json();
        const VPNresponse = await fetch(`https://vpnapi.io/api/${data.ip}?key=cee336ec4a39418fa14cae8a237f227a`);
        if (!VPNresponse.ok) {
            throw new Error("Failed to fetch IP address");
        }
        const VPNdata = await VPNresponse.json();
        if (VPNdata?.security?.vpn == true) {
            return { VPN: true };
        }
        return { VPN: false };
    } catch (error) {
        console.log(error.message)
        console.error('Error fetching IP address:', error);
    }
};