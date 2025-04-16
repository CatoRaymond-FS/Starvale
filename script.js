const storyEl = document.getElementById('story');
const choicesEl = document.getElementById('choices');
const sceneTitleEl = document.getElementById('scene-title');
const sceneTextEl = document.getElementById('scene-text');

let playerName = '';
let playerType = '';

function startGame() {
  document.getElementById('intro').style.display = 'none';
  storyEl.style.display = 'block';

  playerName = document.getElementById('playerName1').value.trim() || "Hero";
  showCharacterTypeChoice();
}

function showCharacterTypeChoice() {
  sceneTitleEl.textContent = "Choose Your Hero Type";
  sceneTextEl.textContent = `Nice to meet you, ${playerName}! What kind of hero are you?`;
  choicesEl.innerHTML = '';

  const types = [
    { label: "Techie", description: "I build gadgets and solve problems!" },
    { label: "Whisperer", description: "I talk to animals and magical creatures!" },
    { label: "Explorer", description: "I love maps, secrets, and shortcuts!" }
  ];

  types.forEach(type => {
    const button = document.createElement('button');
    button.textContent = `${type.label} – ${type.description}`;
    button.onclick = () => {
      playerType = type.label;
      renderScene('start');
    };
    choicesEl.appendChild(button);
  });
}

const scenes = {
  start: {
    text: "Welcome to Starvale, {name} the {type}! A candy storm has hit the jungle and the Jelly Gem is missing. Do you want to help find it?",
    choices: [
      { text: "Yes! Let’s go!", nextScene: "candyJungle" },
      { text: "Not today...", nextScene: "end" }
    ]
  },
  candyJungle: {
    text: "You enter the Candy Jungle. Trees drip syrup and gummy bugs flutter by. You see two paths.",
    choices: [
      { text: "Take the path of rainbow pebbles", nextScene: "glitchClearing" },
      { text: "Climb the licorice vines", nextScene: "treeTop" },
      { text: "Search for a hidden trail", nextScene: "secretTrail", type: "Explorer" }
    ]
  },
  glitchClearing: {
    text: "You meet a Glitchling — a funny little bug with static wings. It wants to race you.",
    choices: [
      { text: "Race it!", nextScene: "wonRace" },
      { text: "Politely decline", nextScene: "candyJungle" }
    ]
  },
  wonRace: {
    text: "{name} zooms past the Glitchling and wins! It laughs and gives you a jelly map. You’re getting closer!",
    choices: [
      { text: "Follow the map", nextScene: "treeTop" }
    ]
  },
  treeTop: {
    text: "From the top, {name} sees a glowing jelly pool guarded by bubble frogs!",
    choices: [
      { text: "Talk to the frogs", nextScene: "jellyGem" },
      { text: "Try to sneak past", nextScene: "bubbleTrap" },
      { text: "Use your translator device", nextScene: "techieTalk", type: "Techie" }
    ]
  },
  techieTalk: {
    text: "You use your Techie device to speak frog! They understand and let you through, cheering 'Glitch-friend!'",
    choices: [
      { text: "Take the Jelly Gem", nextScene: "jellyGem" }
    ]
  },
  jellyGem: {
    text: "The frogs cheer, '{name} the {type}, you found the Jelly Gem!' They hop around joyfully as the jungle is saved.",
    choices: [
      { text: "Play again", nextScene: "start" }
    ]
  },
  bubbleTrap: {
    text: "Oops! A bubble trap catches {name} and floats them back to the start of the jungle.",
    choices: [
      { text: "Back to the jungle", nextScene: "candyJungle" }
    ]
  },
  secretTrail: {
    text: "As an Explorer, {name} notices faint jelly prints and follows them to a shortcut around the frogs!",
    choices: [
      { text: "Sneak to the gem", nextScene: "jellyGem" }
    ]
  },
  end: {
    text: "Maybe next time, {name}! Starvale awaits when you're ready.",
    choices: [
      { text: "Start over", nextScene: "start" }
    ]
  }
};

function renderScene(sceneKey) {
  const scene = scenes[sceneKey];
  sceneTitleEl.textContent = '';
  sceneTextEl.textContent = scene.text
    .replaceAll('{name}', playerName)
    .replaceAll('{type}', playerType);

  choicesEl.innerHTML = '';

  scene.choices.forEach(choice => {
    if (choice.type && choice.type !== playerType) return;

    const button = document.createElement('button');
    button.textContent = choice.text;
    button.onclick = () => renderScene(choice.nextScene);
    choicesEl.appendChild(button);
  });
}