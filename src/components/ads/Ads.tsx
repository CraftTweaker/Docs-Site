import dynamic from "next/dynamic";

export const DesktopAd = dynamic(() => import("./DesktopAd"), { ssr: false });
export const MobileAd = dynamic(() => import("./MobileAd"), { ssr: false });
export const Ad = dynamic(() => import("./Ad"), { ssr: false });

export const AD_REFRESH_RATE = 300 * 1000;
