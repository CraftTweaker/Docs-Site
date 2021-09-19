export function saveTheme(pageTheme: string): void {
    document.documentElement.style.overflow = "hidden";
    document.body.clientWidth;
    if (pageTheme === "dark") {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
    }
    document.documentElement.setAttribute("data-color-scheme", pageTheme);
    document.documentElement.style.overflow = "";
    localStorage.setItem("pageTheme", pageTheme);
}
