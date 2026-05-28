"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMobileLayout = void 0;
const react_1 = require("react");
const breakpoint = 900;
function getIsMobile() {
    return window.innerWidth < breakpoint;
}
const useMobileLayout = () => {
    const [isMobile, setIsMobile] = (0, react_1.useState)(getIsMobile());
    const isMobileRef = (0, react_1.useRef)(isMobile);
    (0, react_1.useEffect)(() => {
        function handleResize() {
            if (getIsMobile() !== isMobileRef.current) {
                setIsMobile(getIsMobile());
            }
            isMobileRef.current = getIsMobile();
        }
        window.addEventListener('resize', handleResize);
        return () => {
            return window.removeEventListener('resize', handleResize);
        };
    }, []);
    return isMobile;
};
exports.useMobileLayout = useMobileLayout;
