export interface StorySection {
  id: string;
  title: string;
  content: string;
  questions?: string[];
  choices?: { text: string; nextSection?: string; impact?: string }[];
  highlights?: { text: string; explanation: string }[];
  audioCues?: string[];
}

export const sunnyAdventureStory: StorySection[] = [
  {
    id: 'sun-birth',
    title: 'My Birth on the Sun',
    content: `Hello! I'm Sunny, and I was born in the most incredible place in our solar system - the Sun! 🌞 

My story begins deep inside the Sun's core, where temperatures reach an astonishing 15 million degrees Celsius! That's where nuclear fusion creates incredible amounts of energy. When massive amounts of magnetic energy built up, I was born as a solar flare!

I started as a burst of electromagnetic radiation and charged particles. My energy was so intense that I could power entire cities on Earth for months! As I grew stronger, I began my incredible journey across space.`,
    questions: [
      "What's it like being born from such intense heat and energy?",
      "How does nuclear fusion create solar flares like you?",
      "What kind of energy do you carry when you're born?"
    ],
    highlights: [
      {
        text: "15 million degrees Celsius",
        explanation: "That's hotter than any place on Earth! It's the temperature needed for nuclear fusion to occur."
      },
      {
        text: "electromagnetic radiation and charged particles",
        explanation: "These are the building blocks of solar flares - pure energy and matter that can travel through space!"
      }
    ],
    audioCues: ["cosmic-birth", "energy-surge"]
  },
  {
    id: 'space-journey',
    title: 'My Journey Through Space',
    content: `After my explosive birth, I began my incredible journey through the vast emptiness of space! 🚀

I traveled at nearly the speed of light - about 299,792 kilometers per second! That means I could travel from the Sun to Earth in just about 8 minutes. Along the way, I encountered the solar wind, which is like a stream of charged particles constantly flowing from the Sun.

As I traveled through space, I carried with me not just energy, but also important information about the Sun's magnetic field and solar activity. Scientists on Earth were eagerly waiting to learn about what was happening on our star!`,
    questions: [
      "How fast do you travel compared to other things in space?",
      "What is the solar wind and how does it affect your journey?",
      "What information do you carry to Earth?"
    ],
    highlights: [
      {
        text: "nearly the speed of light",
        explanation: "Light travels at about 300,000 km/s - that's incredibly fast! Nothing can travel faster than light."
      },
      {
        text: "8 minutes",
        explanation: "Even though the Sun is 93 million miles away, light and solar flares reach Earth in just 8 minutes!"
      }
    ],
    audioCues: ["space-travel", "solar-wind"]
  },
  {
    id: 'earth-approach',
    title: 'Approaching Earth',
    content: `As I got closer to Earth, I could see the beautiful blue marble that humans call home! 🌍

But I also noticed something important - Earth has a protective magnetic field called the magnetosphere. This invisible shield helps protect life on Earth from harmful space radiation. However, when powerful solar flares like me interact with this magnetic field, we can create amazing phenomena!

I could see the aurora borealis (Northern Lights) beginning to form as my energy interacted with Earth's atmosphere. These beautiful lights are actually caused by solar particles colliding with atmospheric gases!`,
    questions: [
      "How does Earth's magnetic field protect us from space weather?",
      "What causes the aurora borealis to appear?",
      "How do you interact with Earth's atmosphere?"
    ],
    highlights: [
      {
        text: "magnetosphere",
        explanation: "Earth's magnetic field that acts like a shield, protecting us from harmful solar radiation."
      },
      {
        text: "aurora borealis",
        explanation: "Beautiful lights in the sky caused by solar particles interacting with Earth's atmosphere!"
      }
    ],
    audioCues: ["earth-approach", "aurora-forming"]
  },
  {
    id: 'impact-effects',
    title: 'My Impact on Earth',
    content: `When I reached Earth, my impact was felt in many different ways! ⚡

My electromagnetic energy caused geomagnetic storms, which can affect satellites, GPS systems, and even power grids on Earth. I also created beautiful auroras that could be seen in places where they're normally not visible - sometimes as far south as Florida!

But I also brought important benefits. My energy helped scientists understand more about space weather and how to better protect Earth's technology. I also created stunning aurora displays that inspired people around the world to look up at the sky and wonder about the cosmos.`,
    questions: [
      "What technologies can be affected by solar flares like you?",
      "How do auroras help scientists learn about space weather?",
      "What are the benefits of solar flares for Earth?"
    ],
    highlights: [
      {
        text: "geomagnetic storms",
        explanation: "Disturbances in Earth's magnetic field caused by solar activity that can affect technology."
      },
      {
        text: "auroras in Florida",
        explanation: "Powerful solar flares can make auroras visible much farther south than usual!"
      }
    ],
    audioCues: ["impact-effects", "technology-disruption", "aurora-dance"]
  },
  {
    id: 'aurora-magic',
    title: 'Creating Aurora Magic',
    content: `The most magical part of my journey was creating the auroras! ✨

As my charged particles collided with Earth's atmosphere, they excited oxygen and nitrogen atoms. When these atoms returned to their normal state, they released energy in the form of beautiful colored light! Green auroras come from oxygen atoms, while red auroras come from oxygen at higher altitudes. Purple and blue auroras come from nitrogen atoms.

People all over the world stayed up late to watch my aurora show. Children pointed at the dancing lights, couples held hands under the cosmic display, and photographers captured the beauty of space weather in action. I felt proud to create such wonder and inspiration!`,
    questions: [
      "Why do auroras have different colors?",
      "How do auroras inspire people to learn about space?",
      "What emotions do you feel when creating auroras?"
    ],
    highlights: [
      {
        text: "excited oxygen and nitrogen atoms",
        explanation: "When solar particles hit atmospheric atoms, they gain energy and emit light when returning to normal!"
      },
      {
        text: "Green, red, purple, and blue auroras",
        explanation: "Different colors come from different atmospheric gases at different altitudes!"
      }
    ],
    audioCues: ["aurora-magic", "cosmic-wonder", "inspiration"]
  },
  {
    id: 'reflection',
    title: 'My Cosmic Reflection',
    content: `As my energy gradually dissipated and my aurora show came to an end, I reflected on my incredible journey from the Sun to Earth. 🌟

I realized that solar flares like me are not just space weather phenomena - we're messengers from our star, carrying energy and information across the vast distances of space. We remind humans of their connection to the cosmos and the incredible forces that shape our universe.

My journey taught me that even though I'm just a burst of energy from the Sun, I can create beauty, inspire wonder, and help humans understand their place in the cosmos. And that makes every solar flare's journey worthwhile!`,
    questions: [
      "What did you learn about yourself during this journey?",
      "How do solar flares connect humans to the cosmos?",
      "What message do you have for people on Earth?"
    ],
    highlights: [
      {
        text: "messengers from our star",
        explanation: "Solar flares carry information and energy from the Sun, helping us understand our star better!"
      },
      {
        text: "connection to the cosmos",
        explanation: "Solar flares remind us that Earth is part of a larger cosmic system, not isolated in space."
      }
    ],
    audioCues: ["cosmic-reflection", "journey-complete", "cosmic-connection"]
  }
];

export const storyMetadata = {
  title: "Sunny's Solar Flare Adventure",
  description: "Join Sunny the Solar Flare on an incredible journey from the Sun to Earth, learning about space weather, auroras, and our cosmic connection!",
  duration: "10-15 minutes",
  difficulty: "Beginner to Intermediate",
  topics: ["Solar Flares", "Space Weather", "Auroras", "Earth's Magnetosphere", "Cosmic Connection"],
  ageRange: "8+",
  interactiveFeatures: [
    "Voice-controlled reading",
    "Two-way conversation with Sunny",
    "Interactive questions and answers",
    "Note-taking and highlights",
    "Audio cues and sound effects"
  ]
};
