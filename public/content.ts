// Import the type definitions for the Chrome API
/// <reference types="chrome" />

const injectCSS = (): void => {
    const style = document.createElement("style");
    style.textContent = `
        .button-container {
            display: flex;
            justify-content: flex-end; /* Align buttons to the right */
            gap: 10px; /* Space between buttons */
        }
    `;
    document.head.appendChild(style);
};

injectCSS();

const iconContainer: HTMLDivElement = document.createElement("div");
iconContainer.id = "ai-icon-root";
document.body.appendChild(iconContainer);

iconContainer.style.position = "fixed";
iconContainer.style.zIndex = "9999";
iconContainer.style.display = "none";

iconContainer.innerHTML = `
  <img src="${chrome.runtime.getURL('assets/ai-icon.svg')}" alt="AI Icon" class="ai-icon cursor-pointer w-8 h-8">
`;

const updateIconVisibility = (): void => {
    const chatInputField = document.querySelector('[contenteditable="true"]') as HTMLElement;
    if (chatInputField) {
        const rect = chatInputField.getBoundingClientRect();
        iconContainer.style.bottom = `${window.innerHeight - rect.bottom - 5}px`;
        iconContainer.style.right = `${window.innerWidth - rect.right - 10}px`;
        iconContainer.style.display = "block";
    } else {
        iconContainer.style.display = "none";
    }
};

const observer = new MutationObserver(updateIconVisibility);
observer.observe(document.body, { childList: true, subtree: true });

const showModal = (): void => {
    if (document.getElementById("ai-modal-background")) return;

    const modalBackground: HTMLDivElement = document.createElement("div");
    modalBackground.id = "ai-modal-background";
    modalBackground.className = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";

    const modalContent: HTMLDivElement = document.createElement("div");
    modalContent.id = "ai-modal-content";
    modalContent.className = "w-[870px] max-w-[90vw] p-6 rounded-2xl bg-gray-100 shadow-lg relative box-border";

    const chats: { type: string; text: string }[] = [];
    const dummyResponse: string = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
    let isGenerated: boolean = false;

    const chatBox: HTMLDivElement = document.createElement("div");
    chatBox.className = "chat-box mb-8 rounded-lg p-2 max-h-60 overflow-y-auto";

    const userInput: HTMLInputElement = document.createElement("input");
    userInput.type = "text";
    userInput.placeholder = "Your prompt";
    userInput.className = "border border-gray-300 w-[814px] h-14 rounded-lg p-4 mb-4 outline-none font-sans text-lg box-border";

    const generateBtn: HTMLButtonElement = document.createElement("button");
    generateBtn.className = "bg-blue-600 w-[190px] h-14 text-white text-2xl font-semibold rounded-lg flex gap-2 justify-center items-center mb-8 float-right cursor-pointer border-none";
    generateBtn.innerHTML = `
        <img src="${chrome.runtime.getURL('assets/PlaneIcon.svg')}" alt="Generate" class="w-6 h-6">
        <span>Generate</span>
    `;

    const buttonContainer: HTMLDivElement = document.createElement("div");
    buttonContainer.className = "button-container flex justify-end gap-2";

    const insertBtn: HTMLButtonElement = document.createElement("button");
    insertBtn.className = "bg-transparent w-[129px] h-14 text-gray-500 border-2 border-gray-500 text-2xl font-semibold rounded-lg flex gap-2 justify-center items-center cursor-pointer hidden";
    insertBtn.innerHTML = `
        <img src="${chrome.runtime.getURL('assets/InertIcon.svg')}" alt="" class="w-6 h-6">
        <span>Insert</span>
    `;

    const regenerateBtn: HTMLButtonElement = document.createElement("button");
    regenerateBtn.className = "bg-blue-600 w-[212px] h-14 text-white text-2xl font-semibold rounded-lg flex gap-2 justify-center items-center cursor-pointer hidden";
    regenerateBtn.innerHTML = `
        <img src="${chrome.runtime.getURL('assets/RegenrateIcon.svg')}" alt="Regenerate" class="w-6 h-6">
        <span>Regenerate</span>
    `;

    const updateChatDisplay = (): void => {
        chatBox.innerHTML = "";
        chats.forEach((chat) => {
            const chatElement: HTMLDivElement = document.createElement("div");
            chatElement.className = `mb-2 ${chat.type === "user" ? "text-right" : "text-left"}`;

            const span: HTMLSpanElement = document.createElement("span");
            span.className = `inline-block p-2 rounded-lg ${chat.type === "user" ? "bg-gray-300" : "bg-blue-200"} max-w-[631px] min-h-[40px] p-4 font-sans text-lg font-normal leading-9 text-left text-gray-600 break-words`;
            span.textContent = chat.text;
            chatElement.appendChild(span);
            chatBox.appendChild(chatElement);
        });
    };

    userInput.addEventListener("input", () => {
        insertBtn.disabled = !userInput.value.trim();
    });

    generateBtn.addEventListener("click", () => {
        if (userInput.value.trim()) {
            chats.push({ type: "user", text: userInput.value });
            chats.push({ type: "bot", text: dummyResponse });
            userInput.value = "";
            isGenerated = true;
            updateChatDisplay();
            modalContent.style.height = "452px";

            generateBtn.style.display = "none";
            insertBtn.style.display = "flex";
            regenerateBtn.style.display = "flex";
        }
    });

    insertBtn.addEventListener("click", () => {
        const messageInput = document.querySelector('[contenteditable="true"]') as HTMLElement;
        if (messageInput) {
            messageInput.innerHTML = dummyResponse; 
            messageInput.focus(); 

            const linkedinChatInput = document.querySelector('input[placeholder="Write a message..."]') as HTMLInputElement;
            if (linkedinChatInput) {
                linkedinChatInput.removeAttribute('readonly'); 
                linkedinChatInput.placeholder = ""; 
            }
        }
        closeModal();
    });

    const closeModal = (): void => {
        document.body.removeChild(modalBackground);
    };

    buttonContainer.appendChild(insertBtn);
    buttonContainer.appendChild(regenerateBtn);

    modalContent.appendChild(chatBox);
    modalContent.appendChild(userInput);
    modalContent.appendChild(generateBtn);
    modalContent.appendChild(buttonContainer);

    modalBackground.appendChild(modalContent);
    document.body.appendChild(modalBackground);

    modalBackground.addEventListener("click", closeModal);
    modalContent.addEventListener("click", (e) => e.stopPropagation());
};

iconContainer.addEventListener("click", showModal);
updateIconVisibility();
console.log("Content script is running.");
