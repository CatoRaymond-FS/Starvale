let playerName = "";
let playerClass = "";
let currentStep = 0;

const steps = [
  (name, cls) => `Hero ${name}, you're called upon to find the legendary Dragon Relic hidden deep within the enchanted forest. As a brave ${cls}, you will face many challenges along the way.`,
  () => "But a mischievous fairy warns you: 'The forest is full of tricks! Are you sure you're ready?'",
  "CHOICE",
  (name, cls) => {
    if (cls === "Explorer") return "You scout ahead with your keen senses, finding a hidden path through the woods.";
    if (cls === "Wizard") return "You cast a spell to reveal hidden paths, uncovering a secret entrance.";
    if (cls === "Knight") return "You unsheath your sword and charge ahead, ready to face anything that comes your way.";
    if (cls === "Healer") return "You focus on calming the creatures of the forest, finding peaceful passage through the woods.";
    return "You bravely continue forward, your heart set on finding the relic.";
  },
  () => "Suddenly, a wild creature appears! Do you want to fight or try to negotiate with it?",
  "CHOICE2",
  (name) => `With your bravery and wit, you overcome the creature and continue your quest. The Dragon Relic awaits, ${name}!`,
  () => "THE END"
];

const choices = {
  3: {
    prompt: "Choose your action:",
    options: [
      {
        text: "Fight the creature!",
        result: "You draw your weapon and charge! The creature is fierce, but you defeat it with skill!"
      },
      {
        text: "Negotiate with the creature",
        result: "You speak calmly, and the creature respects your bravery, allowing you to pass unharmed."
      }
    ]
  },
  6: {
    prompt: "How do you approach the final challenge?",
    options: [
      {
        text: "Use your strength to overpower the challenge!",
        result: "With a mighty effort, you overcome the final obstacle and claim the Dragon Relic!"
      },
      {
        text: "Use your magic to outsmart it!",
        result: "A wave of magic flows from your hands, and the final challenge crumbles before you."
      }
    ]
  }
};

const setupContainer = document.getElementById("setup-container");
const adventureContainer = document.getElementById("adventure-container");
const choicesContainer = document.getElementById("choices-container");
const nextButton = document.getElementById("next-button");

document.getElementById("start-button").addEventListener("click", () => {
  playerName = document.getElementById("player-name").value || "Nova";
  playerClass = document.getElementById("player-class").value || "Explorer";
  setupContainer.style.display = "none";
  adventureContainer.style.display = "block";
  nextButton.style.display = "inline-block";
  showNextStep();
});

nextButton.addEventListener("click", showNextStep);

function showNextStep() {
  const step = steps[currentStep];

  if (step === "CHOICE") {
    presentChoice(3);
    return;
  }

  if (step === "CHOICE2") {
    presentChoice(6);
    return;
  }

  let content = typeof step === "function" ? step(playerName, playerClass) : step;

  adventureContainer.innerHTML = `<p>${content}</p>`;
  choicesContainer.style.display = "none";

  currentStep++;

  if (currentStep >= steps.length) {
    nextButton.style.display = "none";

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Play Again";
    restartBtn.onclick = () => location.reload();
    restartBtn.className = "end-button";

    const journeyBtn = document.createElement("button");
    journeyBtn.textContent = "Select a New Journey";
    journeyBtn.onclick = () => {
      window.location.href = "index.html"; // Change to your landing page URL if needed
    };
    journeyBtn.className = "end-button";

    adventureContainer.appendChild(restartBtn);
    adventureContainer.appendChild(journeyBtn);
  }
}

function presentChoice(stepNumber) {
  const choice = choices[stepNumber];
  adventureContainer.innerHTML = `<p>${choice.prompt}</p>`;
  choicesContainer.innerHTML = "";

  choice.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option.text;
    btn.className = "choice-button";
    btn.addEventListener("click", () => {
      adventureContainer.innerHTML = `<p>${option.result}</p>`;
      choicesContainer.style.display = "none";
      nextButton.style.display = "inline-block";
      currentStep++;
    });
    choicesContainer.appendChild(btn);
  });

  nextButton.style.display = "none";
  choicesContainer.style.display = "block";
}