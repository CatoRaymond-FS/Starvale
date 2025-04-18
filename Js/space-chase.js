let playerName = "";
let playerClass = "";
let currentStep = 0;

const steps = [
  (name, cls) => `Captain ${name}, the galaxy is buzzing. A distress beacon pulses from the Yum Belt. As a brave ${cls}, you answer the call.`,
  () => "But it’s a trap! Pirate ships swoop in from hyperspace, demanding you hand over the mysterious cargo!",
  () => "Do you want to blast through the blockade or try to outmaneuver them in the ice ring?",
  "CHOICE",
  (name, cls) => {
    if (cls === "Pilot") return "You barely escape the pirate net with expert piloting and hide inside a massive donut-shaped moon.";
    if (cls === "Engineer") return "Engines sputter, but you reroute power just in time to dive into a donut-shaped moon.";
    if (cls === "Blaster") return "You fire up your blasters and blast away, narrowly escaping into the moon's shadow.";
    if (cls === "Medic") return "You stabilize the ship’s systems and find a safe hideout within the donut-shaped moon.";
    return "You hide inside a massive donut-shaped moon, shaken but alive.";
  },
  () => "An alien transmits a message: 'I can hide you, but you’ll owe me a favor.' What do you say?",
  "CHOICE2",
  (name) => `You escape... for now. But the galaxy knows your name, Captain ${name}. And the chase is far from over...`,
  () => "THE END"
];

const choices = {
  3: {
    prompt: "Choose your move:",
    options: [
      {
        text: "Blast through!",
        result: "You charge forward, blasters firing in every direction! The pirates are caught off guard!"
      },
      {
        text: "Evade through the rings",
        result: "You twist and turn through the icy tunnels like a comet, losing them in the frost!"
      }
    ],
    classOptions: {
      Pilot: {
        text: "Execute hyperslip maneuver",
        result: "You calibrate your nav and shoot through folded space! A risky but flawless escape!"
      },
      Engineer: {
        text: "Overclock the engines",
        result: "You reroute power and overclock the drives! The ship screams past the blockade!"
      },
      Blaster: {
        text: "Lay suppressive fire",
        result: "You unleash a barrage that clears your path — the pirates scatter!"
      },
      Medic: {
        text: "Deploy emergency shields",
        result: "You shield the crew and systems just long enough to push through the chaos!"
      }
    }
  },
  6: {
    prompt: "Respond to the alien:",
    options: [
      {
        text: "Accept the help",
        result: "The alien warps you into a hidden realm... safe, for now. But what will they ask in return?"
      },
      {
        text: "Refuse and run",
        result: "You bolt from the signal, trusting your instincts... and boosters. Freedom has a cost."
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
  playerClass = document.getElementById("player-class").value || "Blaster";
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

  // Normal options
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

  // Class-specific option
  if (choice.classOptions && choice.classOptions[playerClass]) {
    const classChoice = choice.classOptions[playerClass];
    const classBtn = document.createElement("button");
    classBtn.textContent = classChoice.text + ` (${playerClass})`;
    classBtn.className = "choice-button special";
    classBtn.addEventListener("click", () => {
      adventureContainer.innerHTML = `<p>${classChoice.result}</p>`;
      choicesContainer.style.display = "none";
      nextButton.style.display = "inline-block";
      currentStep++;
    });
    choicesContainer.appendChild(classBtn);
  }

  nextButton.style.display = "none";
  choicesContainer.style.display = "block";
}