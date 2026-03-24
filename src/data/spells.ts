export interface Scenario {
  id: number;
  narrative: string;
  interactionType: 'tap' | 'drag' | 'choice';
  instruction: string;
  options?: string[];
  correctOption?: number;
  tapCount?: number;
  successMessage: string;
}

export interface Spell {
  id: string;
  name: string;
  meaning: string;
  character: string;
  context: string;
  bookIndex: number;
  scenarios: Scenario[];
}

export interface Book {
  index: number;
  title: string;
  shortTitle: string;
  emoji: string;
}

export const books: Book[] = [
  { index: 1, title: "Harry Potter and the Philosopher's Stone", shortTitle: "Philosopher's Stone", emoji: "🪄" },
  { index: 2, title: "Harry Potter and the Chamber of Secrets", shortTitle: "Chamber of Secrets", emoji: "🐍" },
  { index: 3, title: "Harry Potter and the Prisoner of Azkaban", shortTitle: "Prisoner of Azkaban", emoji: "⏳" },
  { index: 4, title: "Harry Potter and the Goblet of Fire", shortTitle: "Goblet of Fire", emoji: "🔥" },
  { index: 5, title: "Harry Potter and the Order of the Phoenix", shortTitle: "Order of the Phoenix", emoji: "🦅" },
  { index: 6, title: "Harry Potter and the Half-Blood Prince", shortTitle: "Half-Blood Prince", emoji: "📖" },
  { index: 7, title: "Harry Potter and the Deathly Hallows", shortTitle: "Deathly Hallows", emoji: "△" },
];

export const spells: Spell[] = [
  // Book 1
  {
    id: "wingardium-leviosa",
    name: "Wingardium Leviosa",
    meaning: "Makes objects levitate and fly through the air",
    character: "Hermione Granger",
    context: "During Professor Flitwick's Charms class, Hermione was the first to successfully levitate her feather, correcting Ron's pronunciation along the way.",
    bookIndex: 1,
    scenarios: [
      { id: 1, narrative: "You're in Charms class. A feather sits on your desk. Professor Flitwick says to make it fly!", instruction: "Tap the feather 5 times to make it levitate!", interactionType: 'tap', tapCount: 5, successMessage: "The feather floats gracefully into the air! ✨" },
      { id: 2, narrative: "A giant troll has entered the bathroom! You need to levitate its club to knock it out.", instruction: "Drag the club upward to save your friend!", interactionType: 'drag', successMessage: "BONK! The troll is knocked out! You saved Hermione! 🎉" },
      { id: 3, narrative: "You find a key floating high above you. Which object should you levitate to reach it?", instruction: "Choose the right object to levitate:", interactionType: 'choice', options: ["A heavy boulder", "A light wooden chair", "A feather"], correctOption: 1, successMessage: "The chair rises perfectly — you stand on it and grab the key! 🔑" },
    ],
  },
  {
    id: "alohomora",
    name: "Alohomora",
    meaning: "Unlocks doors and windows magically",
    character: "Hermione Granger",
    context: "Hermione used this spell to unlock the door to the forbidden third-floor corridor where Fluffy, the three-headed dog, was guarding the trapdoor.",
    bookIndex: 1,
    scenarios: [
      { id: 1, narrative: "A locked door blocks your path in the Hogwarts corridor. You must open it!", instruction: "Tap the lock 4 times to unlock it!", interactionType: 'tap', tapCount: 4, successMessage: "Click! The lock springs open! 🔓" },
      { id: 2, narrative: "You need to open a treasure chest, but the lock is enchanted. Drag the magic toward it!", instruction: "Drag the sparkle to the chest lock!", interactionType: 'drag', successMessage: "The chest opens revealing golden galleons! 💰" },
      { id: 3, narrative: "Three doors stand before you. Only one can be unlocked with Alohomora.", instruction: "Which door will you try?", interactionType: 'choice', options: ["The iron vault door", "The wooden classroom door", "The magical barrier"], correctOption: 1, successMessage: "The wooden door clicks open easily! Smart choice! 🚪" },
    ],
  },
  {
    id: "petrificus-totalus",
    name: "Petrificus Totalus",
    meaning: "Full body-bind curse that freezes the target completely",
    character: "Hermione Granger",
    context: "Hermione reluctantly used this spell on Neville Longbottom when he tried to stop Harry, Ron, and Hermione from sneaking out to protect the Philosopher's Stone.",
    bookIndex: 1,
    scenarios: [
      { id: 1, narrative: "Someone is following you through the castle at night! Quick, freeze them!", instruction: "Tap rapidly 6 times to cast the spell!", interactionType: 'tap', tapCount: 6, successMessage: "They go stiff as a board and fall over! 🧊" },
      { id: 2, narrative: "A guard is about to sound the alarm! Direct the spell beam toward them!", instruction: "Drag the spell beam to the guard!", interactionType: 'drag', successMessage: "The guard freezes mid-step! You sneak past safely! 🤫" },
      { id: 3, narrative: "You're trying to sneak past. Who should you use the body-bind on?", instruction: "Choose your target wisely:", interactionType: 'choice', options: ["The sleeping cat", "The patrolling prefect", "The suit of armor"], correctOption: 1, successMessage: "The prefect freezes! The coast is clear! ✅" },
    ],
  },
  {
    id: "lumos",
    name: "Lumos",
    meaning: "Creates a bright light at the tip of the wand",
    character: "Harry Potter",
    context: "Harry uses this simple but essential spell throughout his journey at Hogwarts to light his way through dark corridors and the Forbidden Forest.",
    bookIndex: 1,
    scenarios: [
      { id: 1, narrative: "The dungeon is pitch black! You need light to find your way.", instruction: "Tap your wand 3 times to light it up!", interactionType: 'tap', tapCount: 3, successMessage: "A warm glow fills the darkness! 💡" },
      { id: 2, narrative: "You're lost in the Forbidden Forest. Guide the light through the trees!", instruction: "Drag the light orb through the path!", interactionType: 'drag', successMessage: "You found the clearing! The centaurs are impressed! 🌟" },
      { id: 3, narrative: "It's dark and you hear something. What's the best spell?", instruction: "Choose the right approach:", interactionType: 'choice', options: ["Shout loudly", "Cast Lumos to see", "Run blindly"], correctOption: 1, successMessage: "Your wand lights up — it's just Mrs. Norris! Phew! 😅" },
    ],
  },
  {
    id: "expelliarmus-1",
    name: "Expelliarmus",
    meaning: "Disarming charm that forces the target to release what they're holding",
    character: "Harry Potter",
    context: "This becomes Harry's signature spell. He first sees it used by Snape against Lockhart in the Dueling Club.",
    bookIndex: 1,
    scenarios: [
      { id: 1, narrative: "A dark wizard raises their wand against you! Disarm them!", instruction: "Tap the wand 5 times to knock it away!", interactionType: 'tap', tapCount: 5, successMessage: "Their wand flies out of their hand! Brilliant! ⚡" },
      { id: 2, narrative: "Your opponent is about to cast a curse! Fling the disarming charm!", instruction: "Drag the red light toward the enemy wand!", interactionType: 'drag', successMessage: "The wand spins through the air and you catch it! 🎯" },
      { id: 3, narrative: "You're in a duel. What's the smartest first move?", instruction: "Choose your strategy:", interactionType: 'choice', options: ["Attack with a jinx", "Disarm with Expelliarmus", "Duck and hide"], correctOption: 1, successMessage: "Their wand flies away! You win the duel without hurting anyone! 🏆" },
    ],
  },

  // Book 2
  {
    id: "expecto-patronum-mention",
    name: "Obliviate",
    meaning: "Erases specific memories from the target's mind",
    character: "Gilderoy Lockhart",
    context: "Lockhart tried to use this spell on Harry and Ron to erase their memories, but his broken wand backfired and he lost his own memory instead.",
    bookIndex: 2,
    scenarios: [
      { id: 1, narrative: "A muggle has seen something magical! You need to make them forget!", instruction: "Tap gently 4 times to erase the memory!", interactionType: 'tap', tapCount: 4, successMessage: "The muggle blinks and walks away, remembering nothing! 🧠" },
      { id: 2, narrative: "Lockhart's wand is broken! The spell is bouncing around the cave!", instruction: "Drag the spell away from yourself!", interactionType: 'drag', successMessage: "You dodged the backfiring spell! Lockhart wasn't so lucky... 😵‍💫" },
      { id: 3, narrative: "A muggle saw a dragon flying overhead. What should you do?", instruction: "Choose the right approach:", interactionType: 'choice', options: ["Tell them it was a plane", "Use Obliviate carefully", "Ignore it"], correctOption: 1, successMessage: "Memory modified! The Statute of Secrecy is safe! 🤐" },
    ],
  },
  {
    id: "expelliarmus-2",
    name: "Immobulus",
    meaning: "Freezes moving objects or creatures in place",
    character: "Hermione Granger",
    context: "Hermione used this spell to freeze the Cornish Pixies that Lockhart had released during a disastrous Defence Against the Dark Arts class.",
    bookIndex: 2,
    scenarios: [
      { id: 1, narrative: "Pixies are destroying the classroom! Freeze them!", instruction: "Tap 6 times to freeze all the pixies!", interactionType: 'tap', tapCount: 6, successMessage: "Every pixie freezes mid-air! The classroom is saved! 🧊" },
      { id: 2, narrative: "A bludger is zooming toward you during Quidditch! Stop it!", instruction: "Drag the freeze charm onto the bludger!", interactionType: 'drag', successMessage: "The bludger stops just inches from your face! 😰" },
      { id: 3, narrative: "Chaos in the classroom! What's the best way to handle the pixies?", instruction: "Choose wisely:", interactionType: 'choice', options: ["Chase them one by one", "Cast Immobulus on all of them", "Leave the room"], correctOption: 1, successMessage: "All pixies frozen! Hermione would be proud! 💪" },
    ],
  },
  {
    id: "parseltongue",
    name: "Serpensortia",
    meaning: "Conjures a serpent from the tip of the wand",
    character: "Draco Malfoy",
    context: "Draco used this spell during the Dueling Club, conjuring a snake that Harry then spoke to in Parseltongue, shocking everyone.",
    bookIndex: 2,
    scenarios: [
      { id: 1, narrative: "You're in the Dueling Club! Conjure a snake to surprise your opponent!", instruction: "Tap your wand 4 times to summon the serpent!", interactionType: 'tap', tapCount: 4, successMessage: "A snake appears from your wand tip! Everyone gasps! 🐍" },
      { id: 2, narrative: "The snake is heading toward a student! Direct it away!", instruction: "Drag the snake toward the safe area!", interactionType: 'drag', successMessage: "The snake slithers safely away! Crisis averted! 😮‍💨" },
      { id: 3, narrative: "A snake is approaching a student. What should you do?", instruction: "Quick, decide!", interactionType: 'choice', options: ["Run away", "Speak to it in Parseltongue", "Throw something at it"], correctOption: 1, successMessage: "The snake listens to you! Wait... you speak Parseltongue?! 😱" },
    ],
  },
  {
    id: "floo-powder",
    name: "Aparecium",
    meaning: "Makes invisible ink become visible",
    character: "Hermione Granger",
    context: "Hermione tried this spell on Tom Riddle's diary to reveal hidden writing, though the diary's magic was too powerful for it to work.",
    bookIndex: 2,
    scenarios: [
      { id: 1, narrative: "You found a mysterious blank page. There might be hidden writing!", instruction: "Tap the page 5 times to reveal the text!", interactionType: 'tap', tapCount: 5, successMessage: "Letters appear on the page! It's a secret message! 📜" },
      { id: 2, narrative: "A treasure map has invisible markings. Sweep the reveal charm across it!", instruction: "Drag the charm across the entire map!", interactionType: 'drag', successMessage: "Hidden paths and X marks appear! Adventure awaits! 🗺️" },
      { id: 3, narrative: "You found a blank diary. How should you reveal its secrets?", instruction: "Choose your method:", interactionType: 'choice', options: ["Write in it with ink", "Cast Aparecium", "Hold it over fire"], correctOption: 1, successMessage: "Faint writing begins to shimmer on the pages! 📖" },
    ],
  },

  // Book 3
  {
    id: "expecto-patronum",
    name: "Expecto Patronum",
    meaning: "Conjures a Patronus — a guardian of positive energy that repels Dementors",
    character: "Harry Potter",
    context: "Professor Lupin taught Harry this advanced spell to defend against Dementors. Harry's Patronus takes the form of a stag, like his father's Animagus form.",
    bookIndex: 3,
    scenarios: [
      { id: 1, narrative: "Dementors are closing in! Think of your happiest memory and cast!", instruction: "Tap 7 times with all your happy thoughts!", interactionType: 'tap', tapCount: 7, successMessage: "A brilliant silver stag bursts from your wand! The Dementors flee! 🦌✨" },
      { id: 2, narrative: "Your Patronus is forming but it's weak! Guide it toward the Dementors!", instruction: "Drag the silver light toward the dark figures!", interactionType: 'drag', successMessage: "Your Patronus charges and the Dementors scatter! Incredible! 🌟" },
      { id: 3, narrative: "A Dementor approaches. What memory will you focus on?", instruction: "Choose your happiest memory:", interactionType: 'choice', options: ["Getting your Hogwarts letter", "A quiet Tuesday", "A scary movie"], correctOption: 0, successMessage: "That memory was powerful enough! Your Patronus blazes to life! 💫" },
    ],
  },
  {
    id: "riddikulus",
    name: "Riddikulus",
    meaning: "Forces a Boggart to take a funny, non-threatening shape",
    character: "Neville Longbottom",
    context: "Professor Lupin taught the class to face Boggarts. Neville bravely faced his Boggart (Professor Snape) and imagined him wearing his grandmother's clothes.",
    bookIndex: 3,
    scenarios: [
      { id: 1, narrative: "A Boggart jumps out of the wardrobe! It looks terrifying! Make it funny!", instruction: "Tap 4 times while thinking of something hilarious!", interactionType: 'tap', tapCount: 4, successMessage: "The scary creature is now wearing a tutu and roller skates! 😂" },
      { id: 2, narrative: "The Boggart is shifting forms! Push the funny image onto it!", instruction: "Drag the silly hat onto the Boggart!", interactionType: 'drag', successMessage: "The Boggart now looks ridiculous! Everyone is laughing! 🤣" },
      { id: 3, narrative: "The Boggart turns into a giant spider! How do you make it funny?", instruction: "Pick the funniest transformation:", interactionType: 'choice', options: ["Give it roller skates", "Make it bigger", "Make it angry"], correctOption: 0, successMessage: "The spider wobbles on roller skates! RIDDIKULUS! 🕷️🛼" },
    ],
  },
  {
    id: "lumos-maxima",
    name: "Lumos Maxima",
    meaning: "Creates an intensely bright ball of light, stronger than regular Lumos",
    character: "Harry Potter",
    context: "Harry practiced this spell secretly under his covers at the Dursleys' house during the summer before his third year.",
    bookIndex: 3,
    scenarios: [
      { id: 1, narrative: "You're reading under your blankets at night. You need a really bright light!", instruction: "Tap your wand 5 times for maximum brightness!", interactionType: 'tap', tapCount: 5, successMessage: "A brilliant ball of light fills your blanket fort! 🔆" },
      { id: 2, narrative: "The entire castle has gone dark! Launch a light orb into the air!", instruction: "Drag the light upward as high as you can!", interactionType: 'drag', successMessage: "The orb floats up and illuminates the Great Hall! Everyone cheers! 🏰" },
      { id: 3, narrative: "It's pitch dark. Which spell would give you the most light?", instruction: "Choose the best option:", interactionType: 'choice', options: ["Lumos", "Lumos Maxima", "Nox"], correctOption: 1, successMessage: "LUMOS MAXIMA! The entire area blazes with light! ☀️" },
    ],
  },

  // Book 4
  {
    id: "accio",
    name: "Accio",
    meaning: "Summoning charm that brings objects to the caster",
    character: "Harry Potter",
    context: "Harry used this spell during the first task of the Triwizard Tournament to summon his Firebolt broomstick so he could outfly the Hungarian Horntail dragon.",
    bookIndex: 4,
    scenarios: [
      { id: 1, narrative: "A dragon guards your golden egg! You need your broomstick — fast!", instruction: "Tap 5 times to summon your Firebolt!", interactionType: 'tap', tapCount: 5, successMessage: "Your Firebolt zooms through the air and into your hand! 🧹" },
      { id: 2, narrative: "The object you need is on the other side of the room! Pull it to you!", instruction: "Drag the object toward yourself!", interactionType: 'drag', successMessage: "The object flies across the room right into your hands! 🎯" },
      { id: 3, narrative: "You're stuck in a maze and need a tool. What do you summon?", instruction: "What would be most useful?", interactionType: 'choice', options: ["A pillow", "Your wand", "A compass"], correctOption: 2, successMessage: "The compass zooms to you! Now you can navigate the maze! 🧭" },
    ],
  },
  {
    id: "priori-incantatem",
    name: "Stupefy",
    meaning: "Stunning spell that renders the target unconscious",
    character: "Harry Potter",
    context: "A crucial spell in the Triwizard Tournament and dueling. Harry and his classmates practiced this extensively for the tasks.",
    bookIndex: 4,
    scenarios: [
      { id: 1, narrative: "A dragon is about to breathe fire! Stun it quickly!", instruction: "Tap 6 times with all your might!", interactionType: 'tap', tapCount: 6, successMessage: "The stunning spell hits! The dragon wobbles and sits down! 🐉" },
      { id: 2, narrative: "An enemy is charging at you! Aim the stunning spell!", instruction: "Drag the red bolt at the target!", interactionType: 'drag', successMessage: "Direct hit! They crumple to the ground, stunned! 💥" },
      { id: 3, narrative: "Three opponents face you. Who should you stun first?", instruction: "Choose your target:", interactionType: 'choice', options: ["The one casting a spell", "The one running away", "The one sleeping"], correctOption: 0, successMessage: "You stun the spell-caster just in time! Smart strategy! 🧠" },
    ],
  },
  {
    id: "reducto",
    name: "Reducto",
    meaning: "Blasts solid objects into pieces",
    character: "Harry Potter",
    context: "Harry used this powerful spell during the Triwizard maze to blast through obstacles blocking his path to the Triwizard Cup.",
    bookIndex: 4,
    scenarios: [
      { id: 1, narrative: "A giant hedge wall blocks your path in the maze! Blast through it!", instruction: "Tap the wall 5 times to destroy it!", interactionType: 'tap', tapCount: 5, successMessage: "BOOM! The hedge explodes and the path is clear! 💥" },
      { id: 2, narrative: "Rocks are falling from the ceiling! Blast them before they hit you!", instruction: "Drag the spell at each falling rock!", interactionType: 'drag', successMessage: "Every rock shatters into harmless dust! You're safe! 🪨💨" },
      { id: 3, narrative: "An obstacle blocks your path. What's the best approach?", instruction: "Choose wisely:", interactionType: 'choice', options: ["Climb over it", "Blast it with Reducto", "Wait for help"], correctOption: 1, successMessage: "The obstacle crumbles! Nothing stops a determined wizard! 🧙" },
    ],
  },

  // Book 5
  {
    id: "protego",
    name: "Protego",
    meaning: "Creates an invisible magical shield that deflects spells",
    character: "Harry Potter",
    context: "Harry taught this defensive spell to Dumbledore's Army. It became essential in their resistance against Umbridge and preparation for real danger.",
    bookIndex: 5,
    scenarios: [
      { id: 1, narrative: "A curse is flying straight at you! Raise your shield!", instruction: "Tap 4 times to form your shield!", interactionType: 'tap', tapCount: 4, successMessage: "A shimmering shield appears! The curse bounces off! 🛡️" },
      { id: 2, narrative: "Multiple spells are incoming! Position your shield to block them all!", instruction: "Drag the shield to cover yourself!", interactionType: 'drag', successMessage: "Your shield holds against every spell! Dumbledore's Army trained you well! ⚔️" },
      { id: 3, narrative: "You're surrounded. Where should you focus your shield?", instruction: "Choose your defense:", interactionType: 'choice', options: ["In front only", "All around you", "Behind only"], correctOption: 1, successMessage: "Your full shield dome blocks attacks from every direction! 🔮" },
    ],
  },
  {
    id: "legilimens",
    name: "Legilimens",
    meaning: "Allows the caster to read thoughts and memories of the target",
    character: "Severus Snape",
    context: "Snape used this spell on Harry during their Occlumency lessons, trying to teach Harry to block Voldemort from entering his mind.",
    bookIndex: 5,
    scenarios: [
      { id: 1, narrative: "You need to discover what the suspect is hiding! Read their thoughts!", instruction: "Tap gently 5 times to probe their mind!", interactionType: 'tap', tapCount: 5, successMessage: "You see flashes of their memories! They're hiding the map! 🧠" },
      { id: 2, narrative: "Their mental defenses are strong! Push through the barriers!", instruction: "Drag through the mental maze!", interactionType: 'drag', successMessage: "You break through! The truth is revealed! 🔍" },
      { id: 3, narrative: "Someone is lying to you. How do you discover the truth?", instruction: "Choose your approach:", interactionType: 'choice', options: ["Ask them nicely", "Use Legilimens", "Give up"], correctOption: 1, successMessage: "Their memories reveal the truth! Knowledge is power! 📚" },
    ],
  },
  {
    id: "reducto-5",
    name: "Bombarda",
    meaning: "Creates a small explosion to blast open sealed doors or objects",
    character: "Dolores Umbridge",
    context: "Used to blast open the Room of Requirement when Umbridge discovered Dumbledore's Army meeting in secret.",
    bookIndex: 5,
    scenarios: [
      { id: 1, narrative: "A sealed wall hides a secret room behind it! Blast it open!", instruction: "Tap the wall 6 times to explode it!", interactionType: 'tap', tapCount: 6, successMessage: "KABOOM! The wall crumbles revealing a hidden chamber! 💣" },
      { id: 2, narrative: "The door to the Room of Requirement is sealed! Direct the explosion!", instruction: "Drag the explosive charm to the door!", interactionType: 'drag', successMessage: "The door blasts open with a tremendous bang! 🚪💥" },
      { id: 3, narrative: "A locked and sealed vault. What spell would you use?", instruction: "Choose the right spell:", interactionType: 'choice', options: ["Alohomora", "Bombarda", "Lumos"], correctOption: 1, successMessage: "The vault explodes open! Sometimes brute force works! 💪" },
    ],
  },

  // Book 6
  {
    id: "sectumsempra",
    name: "Sectumsempra",
    meaning: "Slashing curse that causes deep cuts — invented by the Half-Blood Prince",
    character: "Harry Potter",
    context: "Harry found this spell written in the Half-Blood Prince's potions book and used it on Draco Malfoy without knowing its devastating effects.",
    bookIndex: 6,
    scenarios: [
      { id: 1, narrative: "You found a mysterious spell in an old textbook. Should you try it?", instruction: "Tap 3 times... but carefully!", interactionType: 'tap', tapCount: 3, successMessage: "The spell is dangerous! Remember: never cast unknown spells! ⚠️" },
      { id: 2, narrative: "You need to understand what this spell does before using it!", instruction: "Drag the magnifying glass over the text!", interactionType: 'drag', successMessage: "You discover it's a dark cutting curse! Good thing you checked first! 🔎" },
      { id: 3, narrative: "You found an unknown spell. What's the responsible thing to do?", instruction: "Choose wisely:", interactionType: 'choice', options: ["Cast it immediately", "Research it first", "Teach it to friends"], correctOption: 1, successMessage: "Smart! You discover it's dangerous and avoid a terrible mistake! 📚✅" },
    ],
  },
  {
    id: "aguamenti",
    name: "Aguamenti",
    meaning: "Produces a jet of clean water from the wand tip",
    character: "Harry Potter",
    context: "Harry used this spell to try to give water to a weakened Dumbledore in the cave where they searched for Voldemort's Horcrux.",
    bookIndex: 6,
    scenarios: [
      { id: 1, narrative: "Your friend is desperately thirsty after a long journey! Create water!", instruction: "Tap your wand 4 times for water!", interactionType: 'tap', tapCount: 4, successMessage: "A stream of clear, cool water flows from your wand! 💧" },
      { id: 2, narrative: "A fire is spreading! Direct the water jet to put it out!", instruction: "Drag the water stream across the flames!", interactionType: 'drag', successMessage: "The fire hisses and goes out! You saved the day! 🔥➡️💧" },
      { id: 3, narrative: "The garden plants are wilting in the heat. What spell helps?", instruction: "Choose the right spell:", interactionType: 'choice', options: ["Incendio", "Aguamenti", "Stupefy"], correctOption: 1, successMessage: "Water rains gently over the garden! The plants perk up! 🌱" },
    ],
  },
  {
    id: "felix-felicis",
    name: "Levicorpus",
    meaning: "Dangles the target upside down by their ankle in mid-air",
    character: "Harry Potter",
    context: "Another spell Harry found in the Half-Blood Prince's book. He accidentally cast it on Ron while they were in their dormitory.",
    bookIndex: 6,
    scenarios: [
      { id: 1, narrative: "You're practicing spells from the mysterious book. Let's try this one!", instruction: "Tap 4 times to cast on your pillow!", interactionType: 'tap', tapCount: 4, successMessage: "Your pillow flies up and dangles from the ceiling! Whoa! 😂" },
      { id: 2, narrative: "Oops! Your friend is hanging upside down! Reverse it quickly!", instruction: "Drag them back down gently!", interactionType: 'drag', successMessage: "Your friend lands softly. 'Don't do that again!' they laugh. 😄" },
      { id: 3, narrative: "You accidentally cast Levicorpus. How do you reverse it?", instruction: "Quick, choose:", interactionType: 'choice', options: ["Cast it again", "Say Liberacorpus", "Wait it out"], correctOption: 1, successMessage: "Liberacorpus! They float gently back down! Countercharms are important! ✨" },
    ],
  },

  // Book 7
  {
    id: "confringo",
    name: "Confringo",
    meaning: "Blasting curse that causes the target to explode in flames",
    character: "Harry Potter",
    context: "Harry used this powerful spell during the escape from Privet Drive and in the Battle of Hogwarts against Nagini.",
    bookIndex: 7,
    scenarios: [
      { id: 1, narrative: "Death Eaters are chasing you through the sky! Blast them back!", instruction: "Tap 6 times to fire the blasting curse!", interactionType: 'tap', tapCount: 6, successMessage: "A fiery explosion lights up the sky! The pursuit breaks off! 🔥💥" },
      { id: 2, narrative: "An enemy broom is gaining on you! Aim the fiery blast!", instruction: "Drag the fire blast at the pursuing broom!", interactionType: 'drag', successMessage: "Direct hit! The enemy veers off course! 🧹💨" },
      { id: 3, narrative: "You're surrounded mid-air. What's your best offensive spell?", instruction: "Choose your attack:", interactionType: 'choice', options: ["Lumos", "Confringo", "Accio"], correctOption: 1, successMessage: "The blasting curse scatters your pursuers! You escape! 🦅" },
    ],
  },
  {
    id: "piertotum-locomotor",
    name: "Piertotum Locomotor",
    meaning: "Animates statues and suits of armor to move and fight",
    character: "Professor McGonagall",
    context: "McGonagall used this spell during the Battle of Hogwarts to bring the castle's suits of armor and statues to life to defend against Voldemort's forces.",
    bookIndex: 7,
    scenarios: [
      { id: 1, narrative: "The castle is under attack! Bring the stone knights to life!", instruction: "Tap 7 times to awaken the army!", interactionType: 'tap', tapCount: 7, successMessage: "Stone knights step down from their pedestals! Hogwarts defends itself! ⚔️🏰" },
      { id: 2, narrative: "Direct the stone army to guard the main entrance!", instruction: "Drag the command toward the gates!", interactionType: 'drag', successMessage: "The stone army marches to the gates! The castle stands strong! 🛡️" },
      { id: 3, narrative: "The castle needs defenders. What should McGonagall animate?", instruction: "Choose the best defenders:", interactionType: 'choice', options: ["The paintings", "The suits of armor", "The broomsticks"], correctOption: 1, successMessage: "\"I've always wanted to use that spell!\" - McGonagall beams with pride! 😊" },
    ],
  },
  {
    id: "avada-kedavra-counter",
    name: "Expelliarmus (Final)",
    meaning: "Harry's signature disarming spell — used in the final battle against Voldemort",
    character: "Harry Potter",
    context: "In the final confrontation, Harry used Expelliarmus against Voldemort's Killing Curse. Because Harry was the true master of the Elder Wand, the curse rebounded.",
    bookIndex: 7,
    scenarios: [
      { id: 1, narrative: "The final battle! Voldemort raises the Elder Wand! Cast NOW!", instruction: "Tap with everything you have — 7 times!", interactionType: 'tap', tapCount: 7, successMessage: "EXPELLIARMUS! The Elder Wand flies from Voldemort's hand! It's over! ⚡🎉" },
      { id: 2, narrative: "The red and green spells collide! Push your spell forward!", instruction: "Drag with all your might toward Voldemort!", interactionType: 'drag', successMessage: "Your spell overpowers the Killing Curse! The Dark Lord falls! 🌅" },
      { id: 3, narrative: "The final moment. Voldemort uses the Killing Curse. What do you cast?", instruction: "Choose your spell — the fate of the wizarding world depends on it:", interactionType: 'choice', options: ["Avada Kedavra", "Expelliarmus", "Protego"], correctOption: 1, successMessage: "Love and courage triumph over hate! The Wizarding World is free! 🌟🎊" },
    ],
  },
  {
    id: "nox",
    name: "Nox",
    meaning: "Extinguishes the light from a wand (counter to Lumos)",
    character: "Harry Potter",
    context: "Used throughout the series as the counter-charm to Lumos, Harry often whispered Nox to avoid detection when sneaking around Hogwarts at night.",
    bookIndex: 7,
    scenarios: [
      { id: 1, narrative: "Enemies are nearby! You need to hide in the darkness! Kill the light!", instruction: "Tap 2 times to extinguish your wand!", interactionType: 'tap', tapCount: 2, successMessage: "Darkness wraps around you like a cloak. You're invisible! 🌑" },
      { id: 2, narrative: "Your wand is glowing and giving away your position! Smother the light!", instruction: "Drag the darkness over your wand tip!", interactionType: 'drag', successMessage: "The light fades to nothing. You slip past the guards unseen! 🤫" },
      { id: 3, narrative: "You hear footsteps approaching. Your wand is still lit. What do you do?", instruction: "Quick decision:", interactionType: 'choice', options: ["Shine it at them", "Cast Nox immediately", "Drop your wand"], correctOption: 1, successMessage: "The light vanishes and the footsteps pass by. Stealth is a wizard's friend! 🥷" },
    ],
  },
];

export function getSpellsByBook(bookIndex: number): Spell[] {
  return spells.filter(s => s.bookIndex === bookIndex);
}

export function getSpellById(id: string): Spell | undefined {
  return spells.find(s => s.id === id);
}
