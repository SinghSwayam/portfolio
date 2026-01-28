import { useState, useEffect } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        // Initial check
        const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
        setTheme(currentTheme);

        // Observer to watch for attribute changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "data-theme") {
                    setTheme(document.documentElement.getAttribute("data-theme"));
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        return () => observer.disconnect();
    }, []);

    return theme;
};

export default useTheme;
