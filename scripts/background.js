// Écouter les messages envoyés depuis le popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Vérifier le type de message reçu
    if (message.action === "setWorkTime") {
        // Récupérer la valeur
        const workTime = message.workTime;
        
        console.log("Valeur reçue du temps de travail :", workTime);
        
        // Utilisez la valeur comme vous le souhaitez
        // Par exemple, définir un minuteur
        startTimer(workTime);
        
        // Si vous souhaitez envoyer une réponse au popup
        sendResponse({status: "success", message: "Timer started"});
    }

    if (message.action === "setBreakTime") {
        // Récupérer la valeur
        const breakTime = message.breakTime;
        
        console.log("Valeur reçue du temps de pause :", breakTime);
        
        // Utilisez la valeur comme vous le souhaitez
        // Par exemple, définir un minuteur
        startTimer(breakTime);
        
        // Si vous souhaitez envoyer une réponse au popup
        sendResponse({status: "success", message: "Valeur set break time récupére"});
    }
    chrome.windows.create({
        url: 'window.html',
        type: 'popup',
        width: 300,
        height: 150,
       // left: Math.round(screen.width - 320),
        //top: Math.round(screen.height - 170)
    });
    // Important: retournez true si vous utilisez sendResponse de manière asynchrone
    return true;
});

function startTimer(duration) {
    // Votre logique de minuteur ici
    console.log(`Démarrage du minuteur pour ${duration} minutes`);
    // ...
}

// Dans background.js
/*chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "showCustomNotification") {
        chrome.windows.create({
            url: 'window.html',
            type: 'popup',
            width: 300,
            height: 150,
            left: Math.round(screen.width - 320),
            top: Math.round(screen.height - 170)
        });
    }
});*/