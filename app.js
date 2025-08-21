const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let hour = new Date().getHours();
    if (hour >= 0 && hour < 12) speak("Good Morning Boss...");
    else if (hour >= 12 && hour < 17) speak("Good Afternoon Master...");
    else speak("Good Evening Sir...");
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

// ✅ FIX: define openLink
function openLink(url) {
    window.open(url, "_blank");
}

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        openLink("https://google.com");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        openLink("https://youtube.com");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        openLink("https://facebook.com");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        openLink(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`);
        speak("Here’s what I found on the internet about " + message);
    } else if (message.includes('wikipedia')) {
        openLink(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`);
        speak("Here’s what I found on Wikipedia about " + message);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The current time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak("Today's date is " + date);
    } else if (message.includes('calculator')) {
        openLink("https://www.google.com/search?q=calculator");
        speak("Opening Calculator");
    } else if (message.includes("how are you")) {
        speak("I am always operational, ready to assist you.");
    } else if (message.includes("your name")) {
        speak("I am JARVIS, your virtual assistant.");
    } else {
        openLink(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`);
        speak("I found some information for " + message + " on Google. I Hope You have this .");
    }
}
