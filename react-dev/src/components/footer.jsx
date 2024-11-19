import React, { useEffect, useState } from 'react';

const Footer = () => {
    const [ipAddress, setIpAddress] = useState("Fetching...");
    const [location, setLocation] = useState("Fetching...");
    const [additionalInfo, setAdditionalInfo] = useState(null);

    useEffect(() => {
        const fetchIpAndLocation = async () => {
            try {
                // Fetch IP address
                const ipResponse = await fetch("https://api64.ipify.org?format=json");
                const { ip } = await ipResponse.json();
                setIpAddress(ip);

                // Fetch location details using ip-api
                const locationResponse = await fetch(`http://ip-api.com/json/${ip}`);
                const data = await locationResponse.json();
                if (data.status === "success") {
                    setLocation(`${data.city}, ${data.country}`);
                    setAdditionalInfo(data);
                } else {
                    setLocation("Unable to fetch location");
                }
            } catch {
                setIpAddress("Unable to fetch IP");
                setLocation("Unable to fetch location");
            }
        };

        fetchIpAndLocation();
    }, []);

    const handleMoreInfo = () => {
        if (additionalInfo) {
            alert(
                `IP: ${additionalInfo.query}\nCity: ${additionalInfo.city}\nRegion: ${additionalInfo.regionName}\nCountry: ${additionalInfo.country}\nTimezone: ${additionalInfo.timezone}\nISP: ${additionalInfo.isp}`
            );
        } else {
            alert("Additional information is unavailable.");
        }
    };

    return (
        <div className="relative py-5">
            <footer className="bg-[#F3F4F6] text-gray-700 border-t border-b p-4 mt-auto fixed bottom-0 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-center">
                    <p className='hidden lg:block xl:block 2xl:block'></p>
                    <p className='hidden lg:block xl:block 2xl:block'></p>
                    <div className='text-center md:text-start lg:text-start xl:text-start 2xl:text-start'>
                        <p>&copy; {new Date().getFullYear()} Order Nest. All rights reserved.</p>
                        <p>UI Version: 1.0.3 | Developed by Faysal Mahmud</p>
                    </div>

                    <div className='text-center md:text-end lg:text-end xl:text-end 2xl:text-end'>
                        <p>Login IP Address: {ipAddress}</p>

                        {/* Hide location until it's fetched */}
                        {location && location !== "Fetching..." && location !== "Unable to fetch location" && (
                            <p className='hidden md:block lg:block xl:block 2xl:block'>Location: {location}{" "}
                                <button
                                    onClick={handleMoreInfo}
                                    className="text-blue-500 underline ml-2"
                                >
                                    More Info
                                </button>
                            </p>
                        )}
                    </div>

                </div>
            </footer>
        </div>
    );
};

export default Footer;