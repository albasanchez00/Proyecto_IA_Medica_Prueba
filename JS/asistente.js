function sendMessage() {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();

  if (message !== "") {
    const chatLog = document.getElementById("chat-messages");

    // Mensaje del usuario
    const userMsg = document.createElement("div");
    userMsg.className = "user-message";
    userMsg.innerHTML = `<strong>Tú:</strong> ${message}`;
    chatLog.appendChild(userMsg);

    // Crear el contenedor del mensaje del asistente
    const aiMsg = document.createElement("div");
    aiMsg.className = "ai-message";
    aiMsg.innerHTML = `<strong>Asistente:</strong> Procesando tu consulta...`;
    chatLog.appendChild(aiMsg);

    input.value = "";
    chatLog.scrollTop = chatLog.scrollHeight;

    // Llamar al webhook de n8n con el mensaje del usuario
    fetch("https://primary-production-8eee.up.railway.app/webhook/asistente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mensaje: message })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Respuesta del asistente:", data.respuesta); // 👈 muy útil para depurar
      aiMsg.innerHTML = `<strong>Asistente:</strong> ${data.respuesta}`;
    })
    .catch(error => {
      aiMsg.innerHTML = `<strong>Asistente:</strong> Ocurrió un error al procesar tu mensaje.`;
      console.error("Error:", error);
    });
  }
}
