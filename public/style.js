document.getElementById("uploadForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("firstName", document.getElementById("firstName").value);
    formData.append("lastName", document.getElementById("lastName").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("documentType", document.getElementById("documentType").value);
    formData.append("file", document.getElementById("file").files[0]);

    try {
        const token = localStorage.getItem("token"); // fetch JWT if available
        const response = await fetch("http://localhost:5000/api/upload", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById("message").textContent = "File successfully uploaded!";
            document.getElementById("fileLink").href = result.url;
            document.getElementById("fileLink").style.display = "block";
        } else {
            document.getElementById("message").textContent = "Error: " + result.error;
        }
    } catch (error) {
        console.error("Upload error:", error);
        document.getElementById("message").textContent = "An error has occurred.";
    }
});