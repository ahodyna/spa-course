const video = document.querySelector("video");
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");

uploadBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", event => {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        video.src = url;
        video.play()
    }
})
