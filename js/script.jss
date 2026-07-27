document.addEventListener("DOMContentLoaded", () => {
    console.log("Website loaded successfully.");

    // click handler
    const header = document.querySelector("header");
    if (header) {
        header.addEventListener("click", () => {
            console.log("Header clicked.");
        });
    }
});

function showMessage(msg) {
    alert(msg);
}
