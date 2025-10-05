import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X, ExternalLink, Play } from 'lucide-react';
import SEO from '@/components/SEO';
import { seoConfigs } from '@/components/SEO';

const SunnyAdventureStory: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set video to start at 11 seconds when loaded
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        video.currentTime = 11; // Start at 11 seconds
      };
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  const handleStoryClick = (story: any) => {
    console.log('Card clicked:', story.title);
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
    setSelectedStory(null);
  };

  // Debug modal state
  useEffect(() => {
    console.log('Modal state changed:', { isModalOpen, selectedStory: selectedStory?.title });
  }, [isModalOpen, selectedStory]);

  // Story data - minimal and clean
  const story = {
    title: 'Sunny the Solar Flare\'s Adventure — Through the Eyes of Earthlings',
    author: 'NASA Space Apps Team',
    date: 'March 25, 2024',
    readTime: '15 min read',
    excerpt: 'Join Sunny, the cheerful solar flare, on a wild cosmic journey to Earth. Meet farmers, pilots, astronauts, and kids as they experience the effects of space weather in this cinematic 3D adventure.',
    keyPoints: [
      {
        id: 'journey-earth',
        title: 'Journey to Earth',
        description: 'Sunny zips past Mercury and Venus, approaching the beautiful blue marble of Earth as his ultimate destination.',
        icon: '🚀',
        image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop&auto=format',
        image2: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop&auto=format',
        content: `🌞🚀 "My Super Speedy Journey to Earth!"

Hello again! It's me — Sunny the Solar Flare! 🌟

I've just been born from a big magnetic explosion on the Sun — and now I'm zooming through space at super-duper speed. Hold on tight — you're coming with me on this wild ride to Planet Earth!

🏁 Ready, Set, BLAST OFF!
As soon as I burst out of the Sun, I take off faster than a rocket! Whooosh! 💨

I'm moving at nearly the speed of light — over a million kilometers per hour. Can you imagine? That's so fast, I could go around Earth over 20 times in one second!

Behind me, my buddy — a slow but powerful CME cloud — is rolling out like a glowing space bubble. (He's not as fast, but he's heavy and packed with energy.)

🌟 "Catch up if you can, CME!" I shout, zipping ahead.

🪐 Zooming Past Planets – Watch Out, Mercury!
First stop — not really! I don't stop, I just zoom past the planets:
• Mercury is tiny and hot. I wave and shout, "Hi, Mercury! Watch out — I'm coming through!"
• Venus is super cloudy. I do a loop-de-loop around her just for fun.
• And then... I spot it...
That beautiful blue and green marble up ahead… 🌍

Earth! My destination!

🛰️ Satellites Spot Me First – Uh-oh!
But guess what? I'm not sneaky.

Way out in space, there are clever space weather satellites keeping an eye on the Sun — like SOHO and DSCOVR. They see me coming.

🔭 Beep! Beep! Beep!
"ALERT! Solar flare heading for Earth!"

They send a message down to Earth:
"Incoming flare! Get ready!"

🧑‍🚀 The scientists check their screens.
✈️ Pilots are told to prepare for radio trouble.
🔌 Engineers check the power grids.
🛰️ Satellites go into safe mode.

Wow! I haven't even arrived yet and everyone is already talking about me!
I'm famous! 😎

🧲 Bump! What Was That? Earth's Magnetic Field!
As I get closer to Earth, I run into something invisible... but strong.

It's Earth's magnetic field — like a giant shield made of invisible energy.

💥 BONK!
I bounce off it like a rubber ball hitting a trampoline!

Only some of my particles sneak in through the North and South Poles, where the magnetic shield is weakest.

🌈 That's where I create beautiful auroras — the Northern and Southern Lights!`
      },
      {
        id: 'gps-farmers',
        title: 'Effects on Farmers 🌾 – GPS Disruptions',
        description: 'As Sunny\'s energy brushes past Earth, GPS signals momentarily glitch, causing tractors to swerve - a reminder of space weather\'s reach.',
        icon: '🌾',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop&auto=format',
        image2: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f6c5?w=800&h=600&fit=crop&auto=format',
        content: `🚜🌞 "Oops! Sorry, Farmer!" — Sunny and the Wobbly Tractor

Hi again! It's me — Sunny the Solar Flare, back with another spark-tastic story. 🌟

After I zoom out from the Sun and reach Earth, I sometimes cause a little trouble here and there…
Not on purpose — I promise! I just have a LOT of energy to share.

One of the things I sometimes mess up is…
🚜 GPS signals — especially the ones that farmers use to drive their tractors!

📍 "GPS... That's the Farm Map in the Sky!"
You see, modern farmers are super cool.

They use special GPS technology to guide their tractors, plan perfect planting rows, and even harvest crops. It's like having a map in the sky that tells them exactly where to go.

No more crooked cornfields — it's all straight, neat lines thanks to GPS!

Until I show up... 😏

⚡ "ZAP! Your Signal is Feeling Dizzy!"
When I arrive near Earth with all my charged particles and radiation, I start to interfere with GPS signals coming from satellites way up in space.

Think of GPS like a conversation between space and Earth:
🛰️ Satellite: "Turn left in 2 meters!"
🚜 Tractor: "Got it!"

But when I'm around, that conversation gets all scrambled:
🛰️ Satellite: "T–urn...bzzzt...meters...blip!"
🚜 Tractor: "Uhhh… what??" turns in the wrong direction

The poor tractor might drift out of line, planting seeds too far apart or harvesting in zigzags. Not good!

👨‍🌾 The Farmer Isn't Fooled, Though!
Luckily, farmers are smart and prepared.

They know about space weather and GPS disruptions, so many have backup systems or wait until the signal is strong again.

Still, I always giggle when I see a tractor driving in circles like it's playing tag with the crops.

"Sorry, Farmer!" I shout, zooming by.

🧪 🌽 The Science Behind It: Quick Facts
🔎 What's Happening?	🧠 Why It Matters
Sunny's particles disturb GPS	My energy changes how signals travel through the atmosphere
GPS needs clear skies to work well	Disruption can make signals arrive late or wrong
Precision farming uses GPS	Even a few meters off can mess up rows, planting, or harvesting

🌟 Real-Life Connection:
This kind of GPS problem doesn't just affect farmers — it can affect:
• ✈️ Airplanes
• 🚗 Cars with navigation
• 🛥️ Boats at sea
• 🚀 Space missions!

So scientists watch me closely and send out warnings when I'm heading toward Earth.`
      },
      {
        id: 'radio-pilots',
        title: 'Effects on Pilots ✈️ – Radio Communications',
        description: 'Sunny\'s charged particles interfere with radio communications, challenging pilots and air traffic controllers during flight.',
        icon: '✈️',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop&auto=format',
        image2: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f6c5?w=800&h=600&fit=crop&auto=format',
        content: `🛩️✨ "Sunny's Sky Static: How Solar Flares Mess with Pilot Radios!"

Hey there! It's me again — Sunny the Solar Flare! 🌞 Ready for another wild space adventure?

This time, I'm zooming in on something super important:
How I sometimes make pilots scratch their heads when talking on their radios.

🚀 Blast Off from the Sun
Remember how I burst out of the Sun, sending tons of energy your way? Well, part of that energy is special light called X-rays and ultraviolet (UV) rays. These rays race straight toward Earth — and they're super powerful!

🌍 My Big Impact on Earth's Atmosphere
When my X-rays and UV rays hit the ionosphere (that's a layer of Earth's upper atmosphere), they cause a bit of a ruckus.

Imagine the ionosphere is a calm, invisible ocean of charged particles that helps radio waves bounce around Earth so pilots and air traffic controllers can chat easily.

But when I arrive… boom!
I make that ionosphere supercharged and noisy, like suddenly stirring up a calm pond into a choppy sea.

📻 Uh-oh, Static on the Radio!
Now, pilots flying their planes high up rely on radio waves (especially high-frequency or HF radio) to talk to air traffic controllers and other pilots — especially when flying over oceans or remote places where cell towers don't reach.

But here's the catch:
When I disrupt the ionosphere, those radio waves get scrambled or blocked. It's like trying to talk on a walkie-talkie in the middle of a thunderstorm!

Pilots hear static, buzzing, or even complete silence. Messages get cut off or garbled, making it tricky to communicate.

👩‍✈️ What Do Pilots Do?
Pilots are super prepared! When space weather experts detect a big flare like me heading Earth's way, they warn airlines and pilots.

Here's what pilots do:
• Switch to different radio frequencies that aren't affected as much
• Use satellite phones or backup communication tools
• Sometimes reroute their flights to avoid risky areas
• Stay extra alert and ready to handle surprises

🌈 Good News: It's Usually Temporary
The radio disruption doesn't last forever — usually just a few minutes to a few hours — until the ionosphere calms down again.

And while I'm busy scrambling radios, I'm also putting on a light show in the sky (auroras!), so there's a bright side to all the chaos.

🧠 Quick Science Recap
• Solar flares send X-rays & UV rays that hit Earth's ionosphere
• This makes the ionosphere noisy and unstable
• Radio waves get scrambled, causing radio blackouts
• Pilots use backup plans to stay connected and safe

🎤 Interactive Question for You
If you were a pilot and suddenly lost radio contact, what would you want to do?
(Think: How would you stay safe? What backup tools would you use?)`
      },
      {
        id: 'radiation-astronauts',
        title: 'Radiation Concern for Astronauts',
        description: 'Astronauts on the International Space Station must take shelter as Sunny\'s radiation increases exposure levels in space.',
        icon: '🧑‍🚀',
        image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&auto=format',
        image2: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&auto=format',
        content: `🧑‍🚀⚡ "Sunny's Space Radiation Party — Astronauts Take Cover!"

Hey space explorers! It's me again — Sunny the Solar Flare! 🌞

Today, I want to tell you about something super important that happens when I visit Earth:
How I affect our brave astronauts living and working on the International Space Station (ISS)!

🌌 Living in Space is Already Challenging
First, let me tell you something cool: astronauts on the ISS are already dealing with space radiation every single day!

You see, Earth's atmosphere and magnetic field protect us down here on the ground from most space radiation. But up in space, there's no such protection!

Astronauts get exposed to:
• Cosmic rays from distant stars and galaxies
• Solar wind particles (that's me on a normal day!)
• Radiation from the Van Allen belts

🧑‍🚀 Then I Show Up with Extra Energy!
But when I have one of my big solar flare parties and send out a Coronal Mass Ejection (CME), things get really interesting!

My CME brings along:
• High-energy protons and other charged particles
• X-rays and gamma rays
• A massive increase in radiation levels

It's like going from a gentle breeze to a hurricane of radiation!

🚨 Space Weather Alert! Take Shelter!
When space weather scientists detect me heading toward Earth, they immediately warn the astronauts on the ISS.

Here's what happens next:
• The astronauts get an alert: "SOLAR STORM WARNING!"
• They move to the most protected parts of the space station
• They might delay spacewalks or extravehicular activities (EVAs)
• They monitor radiation levels constantly

🛡️ The ISS Has Radiation Protection!
The good news? The ISS is designed to protect astronauts from radiation!

It has:
• Thick walls and shielding materials
• Special "storm shelters" in the most protected modules
• Constant monitoring of radiation levels
• Emergency protocols for high-radiation events

🧠 What's the Danger?
Too much radiation can cause:
• Increased cancer risk (long-term)
• Damage to cells and DNA
• Temporary sickness (nausea, fatigue)
• Vision problems from cosmic rays hitting the eyes

But don't worry! NASA and other space agencies track radiation exposure very carefully and have strict safety limits.

🌍 Meanwhile, Down on Earth...
While astronauts are taking shelter, we're mostly safe down here because:
• Earth's atmosphere blocks most radiation
• Our magnetic field deflects charged particles
• We get beautiful auroras instead of radiation exposure!

🧑‍🚀 The Astronauts Are Heroes!
These brave men and women are willing to face these risks to advance human knowledge and exploration.

They're helping us learn about:
• How to live and work in space
• Protecting future Mars missions
• Understanding space weather effects
• Developing better radiation protection

🌟 Fun Fact:
Astronauts on the ISS see about 16 sunrises and sunsets every day as they orbit Earth every 90 minutes!

So when I'm having a solar flare party, they might see some spectacular auroras from above while safely protected inside their space home.

🌞 Sunny's Message to Astronauts:
"Hey astronauts! Thanks for being so brave and exploring space for all of us! I promise I'll try to be gentle next time... but I just can't help being a little energetic sometimes! Stay safe up there!" 🌟`
      },
      {
        id: 'power-grid',
        title: 'Power Grid Effect',
        description: 'Sunny\'s geomagnetic storm can induce currents in power lines, potentially causing blackouts and transformer damage.',
        icon: '⚡',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format',
        image2: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format',
        content: `⚡🌞 "Sunny's Power Trip: How I Zap the Grid!"

A fun, interactive story about solar flares and electricity on Earth!

🌞 Hey! Remember Me? I'm Sunny — The Solar Flare!
You know me — I'm that super-powered burst of energy from the Sun.

I race through space with light, heat, and charged particles flying all over the place! 💥

I've already made pilots hear static and farmers go in zig-zags…
But now, I'm about to show you one of my BIGGEST tricks:
Messing with your electricity.

Yep. I can zap power grids! ⚡😈

🏡 But First... What's a Power Grid?
Let's break it down real quick:
🧠 A power grid is like a giant spider web of electricity.

It connects:
• Power plants (where energy is made)
• Transformers (which boost or lower voltage)
• Power lines (which carry the electricity across cities and countries)
• Homes, schools, hospitals — basically everyone who uses electricity!

It's a delicate system that has to stay balanced.

💥 Then I Show Up… With a Stormy Surprise!
When I explode from the Sun (woohoo! 🌞💣), sometimes I don't come alone.

I bring a Coronal Mass Ejection — or CME — with me. That's a huge cloud of charged particles.

When that cloud slams into Earth, it can create something wild:
A geomagnetic storm! 🌍⚡🌌

This storm messes with Earth's magnetic field and — guess what? — it makes long metal things, like power lines, act like giant antennas!

⚡ Electricity Where It Shouldn't Be
My storm energy flows through those power lines and causes something called a geomagnetically induced current (fancy name, huh?).

But all you need to know is:
💡 This is extra electricity that wasn't supposed to be there.

Transformers get confused. Systems get overloaded.
Sometimes, parts of the power grid go... kaput! 💥

🔌 What Happens Next? Lights Out!
If it's a strong enough storm, this can lead to:
• 🏙️ Blackouts (whole cities losing power!)
• 🏥 Hospitals using emergency backup
• 🚉 Trains stopping
• 📱 Phones and internet going down
• 🧊 Fridges turning off (say goodbye to your ice cream 😱)

🧑‍🔧 But Don't Worry — Earth Fights Back!
Humans are smart. They've built systems to protect the grid:
✅ Space weather alerts warn power companies
✅ Engineers can shut down or slow systems before damage happens
✅ Special equipment helps block the unwanted currents

So while I try to cause chaos...
most of the time, you won't even notice I was there!

🧠 Quick Science Recap!
🌞 What I Do	🌍 What Happens on Earth
I send a CME (charged particle cloud)	It hits Earth's magnetic field and stirs it up
I create extra currents in power lines	Those can overload or damage the grid
If strong enough, I cause blackouts	But Earth has ways to protect itself!

🤔 Interactive Question Time!
🟡 What would you do if the power went out for a whole day?
(Think: No phones, no lights, no internet... how would you have fun?)

🟢 Why do you think it's important to have space weather forecasts?
(Just like weather on Earth, we need to know when a solar storm is coming!)

🌟 Ending Note from Sunny:
"Hey, I might be a bit extra sometimes… but I also power the auroras and help scientists learn cool stuff about space.

Just don't plug your toaster into a transformer during one of my storms, okay?" 😄⚡`
      },
      {
        id: 'beautiful-auroras',
        title: 'Beautiful Auroras',
        description: 'The silver lining: Sunny\'s particles create spectacular auroras, painting the polar skies with dancing lights.',
        icon: '🌌',
        image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop&auto=format',
        image2: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop&auto=format',
        content: `🌌🌞 "Sunny Paints the Sky: The Magical Tale of Auroras!"

How a solar flare becomes Earth's light artist 🎨✨

🌞 Guess Who's Back? Yep, It's Me — Sunny!
Hey again!

I've been busy zapping GPS, scrambling radios, and shaking up the power grid…
But today, I want to show you something way more magical.

Something that makes people gasp and say:
"WOW! What is that in the sky?!" 🌠

It's time to meet my most dazzling creation…
💫✨ The Auroras! ✨💫
(That's the Northern Lights and Southern Lights, by the way!)

🚀 First, A Little Journey Recap
After I burst out of the Sun with all my fiery energy, I zoom through space with a gang of supercharged particles.

🌍 When we reach Earth, most of my particles bounce off the magnetic field like, "Nope! No entry!" 🚫

But... I'm clever.
I sneak in through the North and South Poles, where Earth's magnetic field is weaker — like the back door to the planet. 😏

🌈 BOOM — Time to Light Up the Sky!
Once my particles get inside, they slam into gases in the upper atmosphere — way up high above your head.

Here's the cool part:
💚 When I bump into oxygen — green lights appear!
💜 When I hit nitrogen — pinks and purples flash across the sky!

It's like I'm painting with light! 🎨✨

People look up from the ground and see curtains, waves, and ribbons of glowing color dancing across the night sky.

👩‍🏫 Did You Know? Auroras Even Make Sounds!
Some people say during big aurora storms, you can hear faint crackles or pops — like a quiet campfire in the sky 🔥 (though it's still a mystery!).

🌎 Where Can You See Them?
If you're lucky, you can spot auroras near the poles:
• 🧊 Aurora Borealis (Northern Lights) – Near the Arctic, like Alaska, Canada, Norway, and Finland
• 🐧 Aurora Australis (Southern Lights) – Near Antarctica, Australia, and New Zealand

🌟 But if I'm having a really strong storm?
You might even see them much farther away than usual — like in the U.S., Europe, or even India!

😍 Why People LOVE Auroras
People travel across the world just to see me light up the sky!

They take pictures, write poems, and even dance under the lights. 💃📸

Some call it "sky magic"
Others say it's like Earth is wearing a glow-in-the-dark crown.

Either way... you're welcome! 😄

🧠 Aurora Science Recap (Quick & Fun!)
☀️ What Sunny Does	🌍 What Happens on Earth
Sends particles toward Earth	Particles sneak in through the poles
Particles hit gases in atmosphere	Energy is released as colorful light
Creates dancing lights in the sky	That's called the aurora!

🤔 Fun Interaction Time!
🎨 If you could create your own aurora, what colors would you choose?
Would it sparkle? Would it flash to music?

📍 Have you ever seen an aurora before?
Where would you travel to see one in real life?

💡 Why do you think scientists study auroras?
(Hint: They're beautiful and they help us understand space weather!)

🌟 Final Words from Sunny:
"I might zap a GPS or shake up a satellite now and then…
But I also love to make Earth glow.

So next time you see green and purple waves in the sky?
That's not magic —
That's just me, Sunny, throwing a light party!" 🌌🌞💃`
      },
      {
        id: 'scientists-track',
        title: 'Scientist Track & Predict',
        description: 'Space weather scientists monitor Sunny\'s journey using satellites and ground-based instruments to provide early warnings.',
        icon: '🔭',
        image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&auto=format',
        image2: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&auto=format',
        content: `🔭🌞 "How Do Scientists Keep Up With Me?"

Tracking Sunny: The Solar Weather Watchers! 🛰️

🌞 "Hey! It's Me Again — Sunny!"
By now, you know I'm kind of a big deal…
• I cause GPS glitches for farmers 🚜
• I scramble radio signals for pilots 🎧
• I shake up the power grid ⚡
• And I paint the sky with auroras 🌈

So… you might be wondering…
💭 "How do scientists know when Sunny's about to stir up trouble?"

The answer?
🧪🔭 Space Weather Science!

🧑‍🚀 Meet the Solar Sleuths!
All around the world, scientists — called space weather forecasters or heliophysicists — are watching me 24/7.

They use:
🛰️ Space telescopes
🧲 Magnetometers
📡 Satellites with fancy sensors
🖥️ Powerful computer models

Basically, they're the solar detectives, always keeping one eye on the Sun 👀☀️

🛰️ "Catching Me in the Act!"
Scientists use special satellites that watch the Sun nonstop, like:
• SOHO (Solar and Heliospheric Observatory)
• SDO (Solar Dynamics Observatory)
• Parker Solar Probe (It even flies into the Sun's outer atmosphere! 😱)
• DSCOVR and ACE (They warn Earth when a storm is coming!)

When I start bubbling up with energy — 🌞⚡POP! — these satellites take real-time pictures and data of the flare as it happens.

📡 "Warning! Sunny Is On the Move!"
The moment I explode out into space, satellites send out an alert:
🚨 "Solar flare detected! Possible CME heading for Earth!" 🚨

That warning goes to:
• 🛩️ Airlines
• ⚡ Power companies
• 🛰️ Satellite operators
• 📻 Radio communication networks
• 📱 And yes — even weather and space apps on your phone!

So, even before I arrive, Earth is getting ready.

🧠 "But... How Do They Predict Me?"
Great question! Scientists look for patterns in the Sun's activity — like:
• Twisting sunspots
• Strong magnetic fields
• Sudden bright flashes in ultraviolet and X-ray light

They feed this info into supercomputers that simulate space weather, kind of like predicting a storm on Earth — but in space! ☁️🌩️☀️

It's like having a solar weather forecast!
🌞 "Today's forecast: 70% chance of solar flare. Aurora likely in Canada and Norway tonight!" 🎙️

🛡️ "Ready Before I Even Arrive!"
Because of all this tracking and forecasting:
• Power grids can shut down risky equipment
• Pilots can change routes or frequencies
• Satellites can go into safe mode
• Even astronauts on the ISS can take cover from radiation!

So while I may zoom in uninvited…

👩‍🔬 The scientists are ALWAYS one step ahead!

🛰️ What They Use	🔎 What It Does
Satellites like SOHO & SDO	Watch the Sun in real time
Solar telescopes	Track sunspots and flares
Space weather models	Predict solar storms & CMEs
Magnetometers on Earth	Detect geomagnetic storms

🌞 Sunny's Final Message:
"Sure, I like to shake things up... but thanks to the awesome scientists, Earth is ready for whatever I throw at it.

So the next time you see a glowing sky or lose your GPS for a second —
remember, it's not just a glitch…
it's me — Sunny — saying hello from the Sun!" 🌞👋`
      }
    ],
    endingMessage: 'Even the Sun\'s wildest storms connect us all — from space to soil, from sky to heart.'
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO {...seoConfigs.sunnyAdventure} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-8">
        <div className="container mx-auto max-w-4xl px-4">
          <Link to="/stories" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Stories
          </Link>

          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {story.title}
            </h1>

              </div>
            </div>
      </section>

      {/* Video Section */}
      <section className="pb-8">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl overflow-hidden shadow-2xl">
            <video 
              ref={videoRef}
              width="100%" 
              height="100%" 
              controls
              preload="metadata"
              className="w-full h-full"
            >
              <source src="https://ik.imagekit.io/introvertani26/captioncraft_uploads/Nasa%20clip/OrbitX%20team%20_%20Nasa%20space%20apps%202025%20_%20stellar%20stories%C2%A0challenge%20_%20project%202(1080P_HD)%20(1).mp4?updatedAt=1759617096031" type="video/mp4" />
              <p className="text-center text-foreground/70 p-8">
                Your browser doesn't support HTML5 video. 
                <a href="https://ik.imagekit.io/introvertani26/captioncraft_uploads/Nasa%20clip/OrbitX%20team%20_%20Nasa%20space%20apps%202025%20_%20stellar%20stories%C2%A0challenge%20_%20project%202(1080P_HD)%20(1).mp4?updatedAt=1759617096031" className="text-primary hover:underline">
                  Download the video
                </a>
              </p>
            </video>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="pb-12">
        <div className="container mx-auto max-w-5xl px-4">
              {/* Excerpt */}
          <div className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-xl p-6 mb-8">
            <p className="text-lg text-foreground/80 leading-relaxed">
                  {story.excerpt}
                </p>
              </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {story.keyPoints.map((point, index) => (
              <div 
                key={point.id} 
                onClick={() => handleStoryClick(point)}
                className="bg-card/20 backdrop-blur-sm border border-primary/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer group transform hover:-translate-y-2 hover:scale-[1.02]"
              >
                {/* Card Header with Icon and Number */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {point.icon}
                    </span>
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary/80 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors duration-300">
                    {point.title}
                  </h3>
                  </div>

                {/* Card Image */}
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={point.image}
                    alt={point.title}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x200/1e293b/ffffff?text=Space+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                </div>

                {/* Card Description */}
                <p className="text-foreground/80 leading-relaxed text-sm mb-4">
                  {point.description}
                </p>

                {/* Read More Button */}
                <div className="flex items-center justify-between">
                  <div 
                    className="bg-primary/10 border border-primary/30 text-primary px-4 py-2 rounded-lg transition-all duration-300 group/btn cursor-pointer hover:bg-primary/20 hover:border-primary/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStoryClick(point);
                    }}
                  >
                    <Play className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300 inline" />
                    Read Story
                  </div>
                  <span className="text-xs text-foreground/60 group-hover:text-foreground/80 transition-colors duration-300">
                    Click to explore
                  </span>
                      </div>
                    </div>
                  ))}
                </div>

          {/* Ending Message */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-xl p-8">
              <blockquote className="text-xl md:text-2xl font-medium text-white italic leading-relaxed">
                "{story.endingMessage}"
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Story Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-background/95 backdrop-blur-lg border border-primary/20 rounded-xl max-w-5xl max-h-[90vh] overflow-y-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedStory && (
              <>
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-primary/20">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{selectedStory.icon}</span>
                    <h2 className="text-2xl font-bold text-white">{selectedStory.title}</h2>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-primary/30 text-primary hover:bg-primary/10"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={closeModal}
                      className="bg-transparent border-primary/30 text-primary hover:bg-primary/10"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Close
                    </Button>
                  </div>
                </div>
                
                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Images */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative group overflow-hidden rounded-xl">
                      <img
                        src={selectedStory.image}
                        alt={selectedStory.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x300/1e293b/ffffff?text=Space+Image';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="relative group overflow-hidden rounded-xl">
                      <img
                        src={selectedStory.image2}
                        alt={`${selectedStory.title} - Secondary`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x300/1e293b/ffffff?text=Space+Image';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-card/20 backdrop-blur-sm border border-primary/20 rounded-xl p-6">
                    <p className="text-foreground/80 text-lg leading-relaxed">
                      {selectedStory.description}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="prose prose-invert prose-lg max-w-none">
                    <div className="bg-card/10 backdrop-blur-sm border border-primary/10 rounded-xl p-8">
                      <div 
                        className="text-foreground/90 leading-relaxed space-y-4"
                        style={{ whiteSpace: 'pre-line' }}
                      >
                        {selectedStory.content}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SunnyAdventureStory;