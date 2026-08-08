document.addEventListener("DOMContentLoaded", () => {
    console.log("Website loaded successfully.");

    // click handler
    const header = document.querySelector("header") as HTMLElement | null;
    
    if (header) {
        header.addEventListener("click", () => {
            console.log("Header clicked.");
        });
    }

    // Query all nav links
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", (event: MouseEvent) => {
            event.preventDefault();
            const target = event.currentTarget as HTMLAnchorElement;
            console.log(`Nav clicked: ${target.textContent}`);
        });
    });
});

function showMessage(msg: string): void {
    alert(msg);
}
