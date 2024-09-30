chrome.runtime.onInstalled.addListener((): void => {
    console.log("LinkedIn AI Reply Extension Installed");
});

chrome.runtime.onMessage.addListener(
    (request: any, sender: chrome.runtime.MessageSender, sendResponse: (response ? : any) => void): void => {
        if (request.action === 'showModal') {
            chrome.action.openPopup();
        }
    }
);