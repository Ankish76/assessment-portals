import { isBrowser } from "./isBrowser";

export const isSmallScreen = () => {
    return isBrowser() && window.innerWidth < 768;
}