document.addEventListener("DOMContentLoaded", () => {
    console.log("Website loaded successfully.");

    // click handler
    const header = document.querySelector("header");
    
    if (header) {
        header.addEventListener("click", () => {
            console.log("Header clicked.");
        });
    }

    // Query all nav links
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            //event.preventDefault();
            const target = event.currentTarget;

            // Smooth scrolling only for hash links
            if (target.hash) {
                event.preventDefault();

                const section = document.querySelector(target.hash);
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
});

function showMessage(msg) {
    alert(msg);
}
