import dynamic from "next/dynamic";

export const DesktopAd = dynamic(() => import('./DesktopAd'), { ssr: false })
export const MobileAd = dynamic(() => import('./MobileAd'), { ssr: false })
