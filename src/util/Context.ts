import React from "react";
import { ThemeValues } from "./Types";

interface NavProps {
    folders: string[],
    addFolder: (name: string) => void;
    removeFolder: (name: string) => void;
    clearFolders: () => void;
    isOpen: (folder: string) => boolean;
    open: boolean;
    setOpen: (state: boolean) => void;
    toggleOpen: () => void;
}

interface ThemeProps {
    pageTheme: ThemeValues;
    setTheme: (pageTheme: ThemeValues) => void;
}

export const ThemeContext = React.createContext<ThemeProps>({

    pageTheme: "light",
    setTheme() {
        // no-op
    }
});

export const NavContext = React.createContext<NavProps>({

    folders: ["nav"],
    open: false,
    isOpen() {
        return false;
    },
    addFolder() {
        // no-op
    },
    removeFolder() {
        // no-op
    },
    clearFolders() {
        // no-op
    },
    setOpen() {
        // no-op
    },
    toggleOpen() {
        // no-op
    }

});