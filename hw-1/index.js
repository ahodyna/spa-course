const video = document.querySelector("video");
const uploadBtn = document.getElementById("uploadBtn");

uploadBtn.addEventListener("click", async () => {
    try {
        const [fileHandle] = await window.showOpenFilePicker({
            types: [
                {
                    description: "Video",
                    accept: { "video/*": [".mp4", ".avi", ".mov", ".mkv", ".webm"] },
                },
            ],
        });

        if (fileHandle) {
            const videoFile = await fileHandle.getFile();
            video.src =  URL.createObjectURL(videoFile);
        }
    } catch (e) {
        console.error("Error:", e);
    }
})
