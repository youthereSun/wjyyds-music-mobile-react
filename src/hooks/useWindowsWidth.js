import { useState, useEffect } from "react";

//获取屏幕宽度
const useWindowsWidth = (threshold) => {
    const [isScreenSmall, setIsScreenSmall] = useState(false);

    let checkScreenSize = () => {
        setIsScreenSmall(window.innerWidth < threshold);
        debugger
    };
    useEffect(() => {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return isScreenSmall;
};

export default useWindowsWidth;

