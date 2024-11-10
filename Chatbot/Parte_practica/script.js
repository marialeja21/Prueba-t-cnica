// Constantes en donde se selecciona qué parte del documento HTML se va a modificar
const ChatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".cuadro-chats");

let userMessage;

// Función para crear un nuevo mensaje en el chat
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "pagina" ? `<p>${message}</p>` : `<span></span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

// Función para hacer scroll automático al final del chat
const autoScroll = () => {
    setTimeout(() => {
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 100); // Retardo de 100ms para asegurar que el DOM se haya actualizado
}

// Capturando lo que se escribe en el cuadro de texto
const handleChat = () => {
    userMessage = ChatInput.value.trim(); // Leyendo lo que se encuentra en el texto
    if (!userMessage) return;

    // Agregando el mensaje del usuario en el cuadro de chats
    chatbox.appendChild(createChatLi(userMessage, "chat-pagina"));

    // Limpiar el cuadro de entrada
    ChatInput.value = "";

    // Hacer scroll hacia el último mensaje
    autoScroll();

    // Agregar respuesta automática después de un breve retardo
    setTimeout(() => {
        chatbox.appendChild(createChatLi("mensaje...", "chat-cliente"));
        
        // Hacer scroll hacia el último mensaje
        autoScroll();
    }, 600);
}

// Escuchar el clic en el botón de enviar
sendChatBtn.addEventListener("click", handleChat);

// Opción para enviar el mensaje con la tecla Enter
ChatInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Evitar salto de línea
        handleChat();
    }
});

