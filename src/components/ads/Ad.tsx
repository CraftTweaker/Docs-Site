import {SITE_DEV} from "../../util/EnvUtil";

export function SideNavAd() {
    return <div>
        <div id = "ad-sidenav-desktop"></div>
        <script dangerouslySetInnerHTML = {{
            __html: `window['nitroAds'].createAd('ad-sidenav-desktop', {
    "demo": ${SITE_DEV},
    "refreshTime": 30,
    "renderVisibleOnly": false,
    "sizes": [
        [
            "300",
            "250"
        ]
    ],
    "report": {
        "enabled": true,
        "icon": true,
        "wording": "Report Ad",
        "position": "top-right"
    },
    "mediaQuery": "(min-width: 1024px)"
});`
        }}>

        </script>
    </div>
}

export function MobileAd() {
    return <div>
        <div id = "ad-mobile"></div>

        <script dangerouslySetInnerHTML = {{
            __html: `window['nitroAds'].createAd('ad-mobile', {
    "demo": ${SITE_DEV},
    "refreshTime": 30,
    "renderVisibleOnly": false,
    "sizes": [
        [
            "320",
            "50"
        ]
    ],
    "report": {
        "enabled": true,
        "icon": true,
        "wording": "Report Ad",
        "position": "bottom-right-side"
    },
    "mediaQuery": "(min-width: 320px) and (max-width: 1023px)"
});`
        }}>

        </script>
    </div>
}

export function VersionSelectAd() {
    return <div>
        <MobileAd/>
        <div id = "ad-version-select-desktop-top"></div>
        <script dangerouslySetInnerHTML = {{
            __html: `
window['nitroAds'].createAd('ad-version-select-desktop-top', {
    "demo": ${SITE_DEV},
    "refreshTime": 30,
    "renderVisibleOnly": false,
    "sizes": [
        [
            "728",
            "90"
        ]
    ],
    "report": {
        "enabled": true,
        "icon": true,
        "wording": "Report Ad",
        "position": "bottom-right-side"
    },
    "mediaQuery": "(min-width: 1024px)"
});`
        }}>

        </script>
    </div>
}