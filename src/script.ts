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
            //event.preventDefault();
            const target = event.currentTarget as HTMLAnchorElement;
            
            // Smooth scrolling
            if (target.hash) {
                event.preventDefault();

                const section = document.querySelector(target.hash) as HTMLElement | null;
                if (section) {
                    section.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }

            // Console logger
            console.log(`Nav clicked: ${target.textContent}`);
        });
    });

    // Log visitor IP via Cloudflare Worker
    fetch("https://your-worker.username.workers.dev/log?page=" + window.location.pathname, {
        method: "GET"
    }).catch(err => console.error("Logging failed:", err));
});

function showMessage(msg: string): void {
    alert(msg);
}
