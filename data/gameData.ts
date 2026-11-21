import { Difficulty } from '../types';
import rankIridescentImg from '../src/assets/images/rank_iridescent_1794563145695.jpg';
import rankChampionImg from '../src/assets/images/rank_champion_1794563145910.jpg';

// --- QUOTE PACKAGES ---
export const QUOTE_PACKAGES: string[][] = [
  // Package 1
  [
    "Nice work", "Well played", "Keep going", "Smooth", "Clean move",
    "You did it", "Great shot", "Perfect", "Boom"
  ],
  // Package 2
  [
    "Let’s go", "On fire", "Sharp thinking", "Locked in", "No mistakes",
    "Impressive", "Outstanding", "Clutch"
  ],
  // Package 3
  [
    "Big brain", "Pure skill", "Next level", "You’re improving", "Momentum gained",
    "Every win counts", "Progress matters", "One step closer", "Stay focused",
    "Trust the process", "You’re learning fast"
  ],
  // Package 4
  [
    "Consistency wins", "Keep it up", "Believe in yourself", "You’re stronger than you think",
    "Just keep pushing"
  ],
  // Package 5
  [
    "You’ve got this", "This is the way", "Stay on target", "Never tell me the odds",
    "You’re going to make it"
  ]
];

// --- BREAK QUOTES ---
export const BREAK_QUOTES: string[] = [
  "You’ve been grinding hard. Take a moment to reset your mental state",
  "Rest is part of progress",
  "A short break sharpens the mind",
  "Your brain works better after rest",
  "Pause now, perform better later",
  "Recovery fuels focus",
  "Mental clarity starts with rest",
  "Even champions need breaks",
  "Rest isn’t quitting. It’s recharging",
  "Give your brain time to breathe",
  "Breaks improve performance",
  "Focus returns after rest",
  "Reset your mind, not your progress",
  "Rest builds consistency",
  "Your best plays come after recovery",
  "A rested brain learns faster"
];

// --- RANK SYSTEM ---
export interface RankDef {
  name: string;
  img: string;
  orientation: 'horizontal' | 'vertical';
  color: string;
  lightColor: string;
  shadow: string;
}

export const RANKS: RankDef[] = [
  { name: "Bronze", orientation: 'horizontal', color: 'text-amber-500', lightColor: 'text-amber-700', shadow: 'shadow-amber-600/35', img: "https://wallpapers.com/images/high/one-piece-chopper-syt2h7pt9syt4a58.webp" },
  { name: "Silver", orientation: 'vertical', color: 'text-slate-300', lightColor: 'text-slate-600', shadow: 'shadow-slate-500/35', img: "https://c4.wallpaperflare.com/wallpaper/929/339/714/anime-yamcha-dragon-ball-z-dragon-ball-hd-wallpaper-preview.jpg" },
  { name: "Gold", orientation: 'horizontal', color: 'text-yellow-400', lightColor: 'text-amber-600', shadow: 'shadow-amber-500/35', img: "https://wallpapers.com/images/high/brooks-art-one-piece-ofkielx5cem79sor.webp" },
  { name: "Platinum", orientation: 'horizontal', color: 'text-cyan-300', lightColor: 'text-cyan-700', shadow: 'shadow-cyan-600/35', img: "https://wallpapers.com/images/high/goku-aesthetic-d1qyw825zqcg18w4.webp" },
  { name: "Crimson", orientation: 'vertical', color: 'text-red-400', lightColor: 'text-red-700', shadow: 'shadow-red-600/35', img: "https://wallpapers.com/images/high/anime-swordsman-roronoa-zoro-pfp-td4smmnk5vkuv9r2.webp" },
  { name: "Iridescent", orientation: 'vertical', color: 'text-pink-400', lightColor: 'text-pink-700', shadow: 'shadow-pink-500/35', img: rankIridescentImg },
  { name: "Champion", orientation: 'vertical', color: 'text-sky-400', lightColor: 'text-sky-700', shadow: 'shadow-sky-500/35', img: rankChampionImg },
  { name: "Grand Champion", orientation: 'horizontal', color: 'text-blue-400', lightColor: 'text-blue-700', shadow: 'shadow-blue-600/35', img: "https://c4.wallpaperflare.com/wallpaper/649/598/466/dragon-ball-dragon-ball-super-vegeta-super-saiyajin-blue-wallpaper-preview.jpg" },
  { name: "Legend", orientation: 'vertical', color: 'text-purple-400', lightColor: 'text-purple-700', shadow: 'shadow-purple-600/35', img: "https://wallpapers.com/images/high/menacing-look-of-jujutsu-kaisen-phone-cvhrmr4w0irwe3er.webp" },
  { name: "Master", orientation: 'horizontal', color: 'text-indigo-400', lightColor: 'text-indigo-700', shadow: 'shadow-indigo-600/35', img: "https://c4.wallpaperflare.com/wallpaper/207/731/645/movie-dragon-ball-super-broly-broly-dragon-ball-hd-wallpaper-preview.jpg" },
  { name: "Grand Master", orientation: 'horizontal', color: 'text-indigo-300', lightColor: 'text-indigo-800', shadow: 'shadow-indigo-500/35', img: "https://c4.wallpaperflare.com/wallpaper/412/970/466/jujutsu-kaisen-anime-anime-screenshot-fushiguro-toji-water-splash-hd-wallpaper-preview.jpg" },
  { name: "Super Iridescent", orientation: 'horizontal', color: 'text-fuchsia-400', lightColor: 'text-fuchsia-700', shadow: 'shadow-fuchsia-500/35', img: "https://c4.wallpaperflare.com/wallpaper/118/967/730/dragon-ball-dragon-ball-super-son-goku-black-goku-wallpaper-preview.jpg" },
  { name: "Purple Void", orientation: 'vertical', color: 'text-violet-400', lightColor: 'text-violet-700', shadow: 'shadow-violet-600/35', img: "https://wallpapers.com/images/high/satoru-red-cursed-technique-jujutsu-kaisen-phone-7zm50eeu9tugr9fb.webp" },
  { name: "God Level", orientation: 'horizontal', color: 'text-sky-300', lightColor: 'text-sky-700', shadow: 'shadow-sky-500/35', img: "https://wallpapers.com/images/high/goku-dragon-ball-super-5wffv5plfg2e07vc.webp" },
  { name: "Warrior of Liberation", orientation: 'vertical', color: 'text-orange-400', lightColor: 'text-orange-600', shadow: 'shadow-orange-500/35', img: "https://c4.wallpaperflare.com/wallpaper/259/731/611/one-piece-monkey-d-luffy-gear-5th-sun-god-nika-vincentnoon-hd-wallpaper-preview.jpg" },
  { name: "Ultra Instinct", orientation: 'horizontal', color: 'text-slate-100', lightColor: 'text-slate-900', shadow: 'shadow-slate-500/35', img: "https://wallpapers.com/images/high/goku-dragon-ball-super-jndbndtdmrhwju8i.webp" }
];

// --- DEFAULT AUDIO & VISUAL REWARDS ---
export const SOUND_REWARD_MAIN = "https://www.myinstants.com/media/sounds/lissan-al-gaib.mp3";
export const SOUND_ERROR = "https://www.myinstants.com/media/sounds/police-beep-app.mp3";

export const RANK_UP_GIFS: string[] = [
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmFhbHAyZnJyNDgxcmd6ZjNyMDE4ajJzN2R2YWFmd2xnbm9rZnNxZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Iu5oAV0cVffQk/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJrZjYxZG96em95ZHJuZzQ2YTF5bTZkYXFrdnV2NmZ6Z3V4cDJoZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OLttDMld7FPe8/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGJ0OHNzbnM0ampkdTduNTQyemJuazA2eGw1Z2RrdzdweWN4M3V5cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KNaHmmrUBUWME/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGloOXphOXhxM2JiaXNrYTg1eGVmNnFiNnlsdjNuc3ZmZXBrZTR3cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kn8JiOi66qJgs/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGpqZm9pa3diZmlwdjJ0YW1zZWhqYnJreXR5Y2ozM25ldGtjejE3YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/58Uc01V78x1Uk/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDFzeTc4bXI3M3N3c3o3MHl1Mmc1NnNsNG5meTZjMXM1aXh2c3h5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7VxvaukLmaCWI/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExczE0NnlkbmZ2bWQ3MTZvazhieWlrMWp6NHluN3QwNGdoazVheXZ0eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qjBzptUFOCeyY/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGh5eTY3aDdhanJjemMxNXh2MDI1a2IwM21xNTdxeWVkN2w1OWlmMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohze2Pewc9VRVJkuA/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2dwaTg3cjRscDg4NzhlMXEzdzIyNTA0aTR1eDcwajVkNzJtZmI5diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/F2aE1bfCQl7IA/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG1kMGcybW5oMTUyMTQ2MnNidTRqb3I1cGo5Z2c4cDgyNGxkd2JpdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ur8JnxGgsez8Q/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExem14ejNkMXZ3d2ZnanY5ZzJwbW4wM2VoN2JjMXRiM3ZlaWtuY2FjdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/v1yiPQCjfH559zeUvq/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDRiZDdoNzJnZW1iZXJtOG9lY3kyeHBkaHByNzhzdnE0OGZ6NTg2YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XGBAmjqA0RJyU/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWI4N2t3eXNtZW5vejhlZW95eDh1c3UzODYybm11N3VkMWI4Y2tzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Fnq53a9jm1m5W/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXF4cDM0a2puNXpobHN3OGdlaTVsZ3Jsb2lvcW02dW56YzcyMmw1eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vxAtUKv6Pkv2rXfyz5/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExamU1OXpwMXF6dDBmM21nOHE1cG96Z2NkcGU4MzQ2NGJ1bDhjbjVpeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fRFNQ4YC5xWPS/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmswYWI1aTcxOWJuZmhodzQ2dHVubDdtZWVleXNydTFqcHoxdng2YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fFDi3RORXxZl5VNI3y/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm9keXNmY2ZlYmhoZHAyN3V1aGM1enBybHN3dWVjMnpiZWlhOGJtMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/v1yiPQCjfH559zeUvq/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXF0OWF0cGM3bnh4Ymx1aHZmd3pqZ2Nha3k4a2x1YnV0NjVkbmV5ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gMB5jsWrUCun1Vyxhk/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnV1ZWR3bmlqb2ZkNzRyY3YyeXNwdXY2azYxb3lja3FhaTQ2ZjQ5bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wcY8khZDRnFss/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDUxYXU5dTVobDR3NjB6ZTdlaGszZnk3ZndjOW52MmdlbHVxOTBsZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/848I4N2UtgQRa/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2ViaG5tczVwNnE4dGVxMWFmdjQ5YWtyN2ZzYzV0OW1sbDUwbW1ociZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Kqffsuchuki2s/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGxpbm9ma3g0eWtwbGRqbnNsbHE0cXFxeHRlOWk5M3JyNG5taWRobyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZuHYyLfbWpPeo/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExemJ3a3JuaXNmcnBqZDB1Y3kxN2tvbWQxem43NHl5Z2NxbGJ1MXVuYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mXz3v0UdjrNTO/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWlwOXE2aWN2cjh3NnF4cnMyZndhMDVpOGV4NXl0aWwzYTgwN3NndiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LdzYJipCrdJqU/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDZocjZ5MWVrcXd6dXdxNXN4MzY0aDd1YWxpd3c0YjdtcjA4dzZycyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/do0xfdH2Ssh56/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExN25xbHBhd2VnZ3Z0eHBlbzZxeGx3a3BxcjdlczA5NzN2d3FubHNvZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rbBkfjBwcZkJO/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDNyNmYzNDVnN29nYTJzODMwMGpxODJraHBiMjR1ajh4Z3R4YXFpOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4GomTccooD6M/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGQ4cG9oNTYyOWZ3N3JwMHJ2aWZqcm9iMTczZDg1MW1mY3JvaHhtdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XlM7J1gbWvjos/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGwyeHZrcHV0NmxqOXF4ZHNicGkwcGp5c3o2dHB0Z3Y1bmp4bTZ6MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/t7jzGb5JT0B2D7w771/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGh2dWVkMnIxdDVxd2RhNGU4NnVpNW1nY2U2NnFsaWhhamJneTFlciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fWgwBq6OGY1kPjCqDP/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjZvazZtcWdpc3I3MXN0bXFhZ2FyYXRxb2xhaHd4enBndGNvaG42MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8L0T4WZWActpZhAS2h/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHgycm5wY2RoaHJtbjM4YTJ2aXFvN3h6NzlpOW0wZDF0ZzhweGowbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dJHaTbNQOjYMWdHSTG/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2ZrMWMxenNmdXpkcTFkazQ5ZDlkYTFrNWF0aWw4eXNhaDkwNjdwNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dFhhNrjqikhC8/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHFrNDFsMjBndzNyc2t5MHJtODhsNWo5MXd0bzU3NHExdHhpM3RlMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ueISkGMBeb5kI/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmg4Y2ZjZmczbzE3eHF2czlkcW94Z2tmZ3hsc2ZoNXc5NGJjbHltMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3l0yWAuK014di/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWczbzJ6bmwxOWUxNWpheTI1MHkyZHFiZWV2bnMzYzEwNDhiY2FqZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8RWjadE23KFyw/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGlvdzc2MXg1cGl3eWw5ZjhsbTE0ZGNxZHhpcTRyNzhnaWR2MmhyYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lWinKsfTai2Bi/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHRjZnhzbjBoa3JtMjJjam9yYW94c3N3Njl4b29odHd5NHZsNGhlbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kn8JiOi66qJgs/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWxnN2o5bnJ5eml6aGNsbGNxM29icGg3cDUxaGVjaXAxN3BqdHNuMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/o3zAddWekLobWrFGrV/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2c0aTYxMTFmamxjNHZlM2tjZWR6ZDcxNm53N3huYm1kcGNqb2hseiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A00IVuIaftETlGMhAq/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmcxOWhnNHhiOGF1dGR6OXB2MjB1dWp4NDJkM20yZWozaXAzbXU0NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cG9ZsB2efsb7KH9sdv/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzB6aTlqaHN6cmU3ZnQwbzViZHhyc2ZqZnpvYnc5aW85c3hhOGs0NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pPH62kBeRY47UHh0gu/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzB6aTlqaHN6cmU3ZnQwbzViZHhyc2ZqZnpvYnc5aW85c3hhOGs0NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pPH62kBeRY47UHh0gu/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzB6aTlqaHN6cmU3ZnQwbzViZHhyc2ZqZnpvYnc5aW85c3hhOGs0NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pPH62kBeRY47UHh0gu/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzB6aTlqaHN6cmU3ZnQwbzViZHhyc2ZqZnpvYnc5aW85c3hhOGs0NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pPH62kBeRY47UHh0gu/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzM2anBrcHhyaWNzMWVmZG56dWtwczM5dGl2ZHcwa3plaHJidzFnNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/421X0KMsZcy2XQZ6kC/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzU2Z3dxOXFmZ3JpenkzZXRrY2V0NXh2ZnptamgxZms3dGIycXR1NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/w1HvP1UoXDsdQUxEpj/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXFxZWh6bXFvdjRlbjdibWZvbDR4anN2eG02ZmEycnVjZHl6c2dkZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MNzgfUdRYh2PtCtx3i/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExam1odDhyYWE1NGZ4dWN0dmF2NmNlbmQzaXVteG4xcXhjbGEycmZuNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lPMmbzvhCT2aELth9y/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHFmcGxwZTcyNGtiOGNieTB0NHJuc2t1aWNoemhtdGpqOGwydG13YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wNJGCl9Z52r2Etyp6h/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG9mOG13ZzMycDBicnRpZ2ZhNnBuaDA2czFiaDhwNm12Y3J4NnBtZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Zx0Gzud3Wqzbq/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnM5djQzb3Q0NG53MG83c3N6Zzhma3poMWxmYWM2bzExZnFtZWk0aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iZpxtdURKd5LO/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExenN1cXpuaHh6cnIxNnF1enZvOHNnMnI2MjBncDVsM2N6NHd2YjNwZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4GomTccooD6M/giphy.gif"
];

export const RANK_UP_SOUNDS: string[] = [
  "https://www.myinstants.com/media/sounds/dbz-sajayin-1_Mfyfta8.mp3",
  "https://www.myinstants.com/media/sounds/dbz-sajayin-2_uKnIMK6.mp3",
  "https://www.myinstants.com/media/sounds/dbz-sajayin-3_IvAYaJx.mp3",
  "https://www.myinstants.com/media/sounds/dbz-sajayin-4_x2AwN3X.mp3",
  "https://www.myinstants.com/media/sounds/dbz-sajayin-5_cqgEgw6.mp3",
  "https://www.myinstants.com/media/sounds/dbz-sajayin-6_3FNSZjh.mp3"
];

export const RANK_UP_SPECIAL_GIFS: ReadonlySet<string> = new Set([
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDFzeTc4bXI3M3N3c3o3MHl1Mmc1NnNsNG5meTZjMXM1aXh2c3h5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7VxvaukLmaCWI/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG1kMGcybW5oMTUyMTQ2MnNidTRqb3I1cGo5Z2c4cDgyNGxkd2JpdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ur8JnxGgsez8Q/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExem14ejNkMXZ3d2ZnanY5ZzJwbW4wM2VoN2JjMXRiM3ZlaWtuY2FjdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/v1yiPQCjfH559zeUvq/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWI4N2t3eXNtZW5vejhlZW95eDh1c3UzODYybm11N3VkMWI4Y2tzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Fnq53a9jm1m5W/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm9keXNmY2ZlYmhoZHAyN3V1aGM1enBybHN3dWVjMnpiZWlhOGJtMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/v1yiPQCjfH559zeUvq/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWxnN2o5bnJ5eml6aGNsbGNxM29icGg3cDUxaGVjaXAxN3BqdHNuMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/o3zAddWekLobWrFGrV/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2c0aTYxMTFmamxjNHZlM2tjZWR6ZDcxNm53N3huYm1kcGNqb2hseiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A00IVuIaftETlGMhAq/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzM2anBrcHhyaWNzMWVmZG56dWtwczM5dGl2ZHcwa3plaHJidzFnNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/421X0KMsZcy2XQZ6kC/giphy.gif"
]);

export const RANK_UP_SPECIAL_SOUNDS: string[] = [
  "https://www.myinstants.com/media/sounds/dbz-sajayin-9.mp3",
  "https://www.myinstants.com/media/sounds/dbz-sajayin-10.mp3",
  "https://www.myinstants.com/media/sounds/dbz-sajayin-11.mp3",
  "https://www.myinstants.com/media/sounds/dbz-sajayin-12.mp3"
];

export const RANK_UP_SAJAYIN8_GIFS: ReadonlySet<string> = new Set([
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWlwOXE2aWN2cjh3NnF4cnMyZndhMDVpOGV4NXl0aWwzYTgwN3NndiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LdzYJipCrdJqU/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGQ4cG9oNTYyOWZ3N3JwMHJ2aWZqcm9iMTczZDg1MW1mY3JvaHhtdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XlM7J1gbWvjos/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmcxOWhnNHhiOGF1dGR6OXB2MjB1dWp4NDJkM20yZWozaXAzbXU0NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cG9ZsB2efsb7KH9sdv/giphy.gif"
]);

export const SOUND_RANK_UP_SAJAYIN8 = "https://www.myinstants.com/media/sounds/dbz-sajayin-8.mp3";

export const RANK_UP_SAJAYIN7_GIFS: ReadonlySet<string> = new Set([
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2ZrMWMxenNmdXpkcTFkazQ5ZDlkYTFrNWF0aWw4eXNhaDkwNjdwNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dFhhNrjqikhC8/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWczbzJ6bmwxOWUxNWpheTI1MHkyZHFiZWV2bnMzYzEwNDhiY2FqZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8RWjadE23KFyw/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGlvdzc2MXg1cGl3eWw5ZjhsbTE0ZGNxZHhpcTRyNzhnaWR2MmhyYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lWinKsfTai2Bi/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzB6aTlqaHN6cmU3ZnQwbzViZHhyc2ZqZnpvYnc5aW85c3hhOGs0NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pPH62kBeRY47UHh0gu/giphy.gif"
]);

export const SOUND_RANK_UP_SAJAYIN7 = "https://www.myinstants.com/media/sounds/dbz-sajayin-7.mp3";

export const RANK_UP_X3_KAMEHA_GIFS: ReadonlySet<string> = new Set([
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGJ0OHNzbnM0ampkdTduNTQyemJuazA2eGw1Z2RrdzdweWN4M3V5cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KNaHmmrUBUWME/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGpqZm9pa3diZmlwdjJ0YW1zZWhqYnJreXR5Y2ozM25ldGtjejE3YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/58Uc01V78x1Uk/giphy.gif"
]);

export const SOUND_RANK_UP_X3_KAMEHA = "https://www.myinstants.com/media/sounds/x3-kameha.mp3";

export const RANK_UP_GOHAN_CELL_GIFS: ReadonlySet<string> = new Set([
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmg4Y2ZjZmczbzE3eHF2czlkcW94Z2tmZ3hsc2ZoNXc5NGJjbHltMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3l0yWAuK014di/giphy.gif"
]);

export const SOUND_RANK_UP_GOHAN_CELL = "https://www.myinstants.com/media/sounds/gohan-kill-cell.mp3";

export const INITIAL_REWARD_SOUNDS: string[] = [
"https\://www\.myinstants.com/media/sounds/minigame-sound-1.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-2.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-3.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-4.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-5.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-6.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-7.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-8.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-9.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-10.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-11.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-12.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-13.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-14.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-15.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-16.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-17.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-18.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-19.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-20.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-21.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-22.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-23.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-24.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-25.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-26.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-27.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-28.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-29.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-30.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-31.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-32.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-33.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-34.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-35.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-36.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-37.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-38.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-39.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-40_db5gkRx.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-41.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-42_txW4IyL.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-43_wsRf5NA.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-44_e8PUPDt.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-45_RjDKXbc.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-46.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-47.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-48_0Gzbr2X.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-49_F9tCHuj.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-50.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-51.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-52.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-53.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-54.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-55_VtKEgOh.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-56_yQZPFTF.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-57.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-58.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-59.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-60.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-61_5c2sj13.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-62_9LYKVNT.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-63.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-64_iGgCZuE.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-65_NxxxBfn.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-66_etPF4fI.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-67.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-68_y25EfXE.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-69.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-70_ReRybc6.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-71.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-72.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-73_UkNCKKf.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-74.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-75.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-76_2lqENn3.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-77.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-78.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-79_luJ0aKu.mp3",
"https\://www\.myinstants.com/media/sounds/minigame-sound-80.mp3"
];

export const INITIAL_REWARD_GIFS: string[] = [
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3d3ZXYwYW9wdjhxOWV1YjBuYm1scWk2ZDY1dTFwMmptNWg3ZHpqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6wrpNNxOC4meYuu4/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGc0Y3ZveDFzb3BkaHhidnBwbDFicDV2MDVvYWpuanA3cHozbXlycSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUySTWDX2pMeNIGzja/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTRtZzIwa3BjZnA1YXgxOHNsYWU4aHVma2RoajIwaHQwYjU3MG9tYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPOqsYFSm68TmxGww/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG14YzlmeDJhMnlubm96MGN0NmFobGF0ZWxnM3BvNXl2bG1kdm9sbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3sXiijmL3hb0c/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXp5dTkyOWd5Nm9laW52NTh6NTdrbGZ4azE2bDk0bzU4NDMxbHo3ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1L0hlyAGsXVpDFL2/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2w1bWVjcHd6bjJ1eXg4b21vMXNueDY3emlsNTFlcjZtbGo3c2FsZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPOqiHO8VUDKPrUbu/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXVvY2tuOWpwaDBxN2o1anowdHIwbjR2a3B5ajUwMXVyOTl3cGw4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ofT5X7qSaBFY1lqko/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTZlbnliYXR2amxiN3BvenVtNmt1eXFwcGRhNzQ5dXlmN2J2YXplNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0Eryaztm6Y3VqEJq/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTQ4MDZlMnhxdmlteGk3cDlqb3VhejdreGpibjY3bDhnZW8wc3hyZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0ErJrkZRk1kQyIi4/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXFkbHFuY3MxZDJkenBhZWgzYWJzZzltY2Y0M21ybHJmYjh1a294NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4Jzb5DbYPhjG2OWY/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTB5eG5pN3RvZ2Z5bHF6dXdnZDVudHhwMDYzbWRrNnRiZHVwOGRrZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0ErHKup9z3N9JhXG/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3JtODN1YmY3M2Q2bnhqZWJmN3R1MXY4Z296eDRydm9iYzN3NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ofT5NcHuRDVG8d3m8/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG0zNjJjN2x3aWkwenpodmlwcGoycno1cDBxZTh4NHVnNnIzdmR1biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0ErH3nvuQRn8QIgM/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2tjaW9zeGw0cGw0a3Vob3VuYWIwNmZwcTJsdHpncHRveDdpcHZ1NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0ErLT6LKwL4nUFmo/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXF2cWJtcjB6MncxemVoeGVzbDltcGM1Zzh6NnpqcWRud2hrcndlbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26gryEHdIJgoB8id2/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWVuZnAxanVkM3c5ZG5iYzd1cWJ2aDVncWZ6bzlzb3BlcWtkcWZ3bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0ErHs3JS1CN5YAFO/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExamp5aWFyczUyZzlnYjJtNHkxdzVubGZ3eWlnaWR5M3JnMmZrbG9ycCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPOqhGCyQU7CyueDC/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmN1aW96OHprM3V6Zzk1bmlueTdyeXg2a2ExM2JkcGlvcDZ6ODByOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0ErEc1FxAhOnwEwM/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnYydmZtM2R3bWYzaGRvd3BmNXRqMnVqOTZubnlrMmdkZXlub210YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26gryEHdIJgoB8id2/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3lpMXRleHdzamxmaHYwdndiNXZmZWhjcGxiYWJ6ZWJwN3AxeWNpciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0GqBlPgOeT0w7N2U/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWNzNzYzOXdvYTI2bzRxZGZpMmRmamtwanlmcDlwaTFsMmdtOGFpdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1jY3oQvXNP79Y6K5d7/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExODg4aGk3amlvd3o5ZWw4YWNwZzZ3aHU1eGp6bGF6czg2am5zMjQ3byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ToQpWXtQ8nBFm0G0Ps/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3d3ZXYwYW9wdjhxOWV1YjBuYm1scWk2ZDY1dTFwMmptNWg3ZHpqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6wrpNNxOC4meYuu4/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGc0Y3ZveDFzb3BkaHhidnBwbDFicDV2MDVvYWpuanA3cHozbXlycSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUySTWDX2pMeNIGzja/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTRtZzIwa3BjZnA1YXgxOHNsYWU4aHVma2RoajIwaHQwYjU3MG9tYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPOqsYFSm68TmxGww/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG14YzlmeDJhMnlubm96MGN0NmFobGF0ZWxnM3BvNXl2bG1kdm9sbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3sXiijmL3hb0c/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXp5dTkyOWd5Nm9laW52NTh6NTdrbGZ4azE2bDk0bzU4NDMxbHo3ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1L0hlyAGsXVpDFL2/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2w1bWVjcHd6bjJ1eXg4b21vMXNueDY3emlsNTFlcjZtbGo3c2FsZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPOqiHO8VUDKPrUbu/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXVvY2tuOWpwaDBxN2o1anowdHIwbjR2a3B5ajUwMXVyOTl3cGw4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ofT5X7qSaBFY1lqko/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTZlbnliYXR2amxiN3BvenVtNmt1eXFwcGRhNzQ5dXlmN2J2YXplNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0Eryaztm6Y3VqEJq/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTQ4MDZlMnhxdmlteGk3cDlqb3VhejdreGpibjY3bDhnZW8wc3hyZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0ErJrkZRk1kQyIi4/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXFkbHFuY3MxZDJkenBhZWgzYWJzZzltY2Y0M21ybHJmYjh1a294NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4Jzb5DbYPhjG2OWY/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTB5eG5pN3RvZ2Z5bHF6dXdnZDVudHhwMDYzbWRrNnRiZHVwOGRrZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0ErHKup9z3N9JhXG/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3JtODN1YmY3M2Q2bnhqZWJmN3R1MXY4Z296eDRydm9iYzN1emd3NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ofT5NcHuRDVG8d3m8/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG0zNjJjN2x3aWkwenpodmlwcGoycno1cDBxZTh4NHVnNnIzdmR1biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0ErH3nvuQRn8QIgM/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2tjaW9zeGw0cGw0a3Vob3VuYWIwNmZwcTJsdHpncHRveDdpcHZ1NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0ErLT6LKwL4nUFmo/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWVtbm5nc2F1aTRzOWI0Y2R5Zjkxem9xMDN6Y29pbXcxdXVnaXlpcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26gryEHdIJgoB8id2/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWVuZnAxanVkM3c5ZG5iYzd1cWJ2aDVncWZ6bzlzb3BlcWtkcWZ3bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0ErHs3JS1CN5YAFO/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExamp5aWFyczUyZzlnYjJtNHkxdzVubGZ3eWlnaWR5M3JnMmZrbG9ycCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPOqhGCyQU7CyueDC/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmN1aW96OHprM3V6Zzk1bmlueTdyeXg2a2ExM2JkcGlvcDZ6ODByOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0ErEc1FxAhOnwEwM/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnYydmZtM2R3bWYzaGRvd3BmNXRqMnVqOTZubnlrMmdkZXlub210YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26gryEHdIJgoB8id2/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3lpMXRleHdzamxmaHYwdndiNXZmZWhjcGxiYWJ6ZWJwN3AxeWNpciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0GqBlPgOeT0w7N2U/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWNzNzYzOXdvYTI2bzRxZGZpMmRmamtwanlmcDlwaTFsMmdtOGFpdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1jY3oQvXNP79Y6K5d7/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExODg4aGk3amlvd3o5ZWw4YWNwZzZ3aHU1eGp6bGF6czg2am5zMjQ3byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ToQpWXtQ8nBFm0G0Ps/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3ViYnJ3b282d21vcWFweDhmMzRsbXduaHI1MTd6azE3MW5mNGptdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eZ1vDv5buXMVkd3YKr/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbng3M24yNjhqbjBzZmdlZzRzMWl2dnpnZ2s2YXprN2plZGd1anRveCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/n11ySGNEl2fyN7dqav/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDdscndnejN2bGptdXB0OXE4dXBwbWtndXY4cWNnbG5tNzR1cTE5diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lA5yV4xrvUIdq/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTNsdnA2NjBzd3g1czgxNGlzNTgydXlzeWVxOTMxam5xNzkzZmczYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gS3P17KExlWpzmX1yR/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTBkbms4OTZ4bWgxbDVocGtka2NsdTVxbWl5YzNxNzZzbnM0Y2c5MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cFkf2d0LDQtKBeUbx8/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmE5czk3MXZtOWZ2b3Azcmk1bWEyb29odjhwMTByaHp2Yjc1Z2ppdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nv4vUO7yW7Pz8MPCvt/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXpyemNncWtyN2Y3dDU5emNqZHJrbXdkeXZjNWExbXU4ZGVrdXNvZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KyyuhuhY8qS5c9HCIX/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTI3N2wybnczdWJvaGxxNzF2MW50MGoyNHk5MmZxa2c2cTMzb3llciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Fff5OHrhY19sY/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb21oNDBuZXJwZzhsN2l5ajdyd2liYnZqZGFnYW1wcDhnemtydWxibCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohuAf73bPJQWaf7Da/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3toaHVreTN5a3Nqa3ZxZnRjOHg3OWp4OGplM2F6ZzY2a2J2OXY3YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZyGTx7DbVmHDy/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2kybGF3amttNngzdGEyY3J4b2YxMmdsNHMwbWNzeWgwaHJ4NWFkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2JJpV2KeURCK8sa4/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3xlZ3NjdXYyaWZ5YTlseGh6Y3lxb3Uwd3N0aHB4cmI3c2g0MmJ0ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3fZLlu5kyX6wZzP2/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3F1cjg2a3lzeGpvZ244MTMyMHZzM2trNXp2OXIwYmMxcGpqbTZucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3owzW399gF7wMJzIS4/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTB4bXBxcWRpbHhlYXozMzVkeTMzdWYxOThldWg0ZTNvNmhkOTg0YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3fZLlu5kyX6wZzP2/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExemFoaXg4cnBhcGdiMXp6MHlzY201aWNpajlzN2JyNWR2dWNiemN5YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2JJw70EVaVBdfvva/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Y4YTRyYnVlb21scWpnNzk0ZHE1Nm1wd2xsOWE4Nmlsc3pyb2d3dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uV5bWZ2VcCa5O/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTlwMmM3NmNoOGN2YXdjYmlsaGRtbTYyYnRxcnBrNThibnFqZmhwMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cISQ5Xzh3B13q/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDRxaDRleWsyNnU2eGI2MHhjNjdhOG1mdHFtMnM0ZHhubTd6cmhvcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5ZUqRUT2b9WKc/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjRteGMycmZid2txajh4cGJmZWFpamQxM2RxbXI1emV0b3Z0NmVpNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xTiTnyEhlyduTR8Tks/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHl5YnZyNndxdjNxa2NzM2Y1NHU2YXQ5dG56b29heGVhYTViamM5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3fZKRnSw933m70VG/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGFzdTdtcWc2eHB6dmNpYjRlYnUzaWRvZTVnd3U1OGZ0bDlmdjN4bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohuAhRnmGIRiLxF1S/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm1neW8wdms2bGw5OXR1NzU0Nzdrd2R6bHhlbXBwNmM4YXIwNzJlOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9jT5UjKJqoUElD9mXb/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3dmcTIxZzYzcGJweTNucnZnNTZubndremR0a3BiZzN3ZGM2bGN3biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hYBN9Ltcm0Z2ne4xJy/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXdleGVvOGpoZXhkY2ptNjVqbHV5MG9ycWJrcHA5YTMyMDMydnFkbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GbN90I6YCJL6JtV9bH/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjFsbGJxcHkyaWkzMzFmZmRzbm83M3l6d3I0eTN5Zzc3eHh5ZThwY3g1eGs5ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/22AYbcJmcFPvm4Uy47/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3hoOGxvaDk5aHk1bndiNGd3dTcyaXF6aWp0cG8ydm43bjRjZG1oeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gUi8L8Kx9GRakjAOgp/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDNsbDd4em51cHdsODQzcTJ1dmF3ODFtN2VxbmY4azBhbzZiMDM4dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/79ikFHt3jN9YrY2NDC/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHU2aGNlZHM1YW81NDFjeDkzbWphMHdsYjNib3dkMTNxNWRpeGNmaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8cuKhmD20BXHuXOX5c/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDdzdzRpeTdjZmk5bnV0cmE0a2RhNzl6aXl0MTN2cmxjczNqcDMyOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SJXKbJAoo3HXhjdV74/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXNkcXJjajhtZXB6djJwcGJyZmZ2bjlvc3JqZXdhd21wOGljNXhkbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NVaxcJZSJx42cCuWyZ/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGh4eG94MGR0Ymx1a3B5dWZreXJodXZleDdpYjlndzYwdTMzZm82ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/h2NxCschQ81ltiL9HV/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWhueTMzZm1sbTE0MjU3cXdoYmhseXNhNThrOXAxdWhvNHdmNGc1MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26wBaCkbmF3VBHGpO/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWN2dzJmN3VtcG52YTBnaXZxenFtcTJoMW1hcWFiYm01MXg3MGxjNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ddHhhUBn25cuQ/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDNqZnptM3h6N3ltNWRzMDZrbTJtdmdjYnlmZWN5bHM3NW1qd2h5cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohuABR60Vk6qKi0H6/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMm81bmRobzQ0czlxd2ljc2N1bjRkMmo1N2lpd2VucG9iNHloaGd6dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3fZYXnTOiTjORvMc/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmx2dTY3ejB4dWNpbHl3N2l3YzVvOWt3MDRlZ3g1NGM1eGw3OHZrMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2QDSwdGsR4xvrfq0/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDFldTFwdzcxMTdpNm5tMmhhdjl0OXJoa2EwNjVoMzc3OXAwMmwyaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rY93u9tQbybks/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzIzOWtiOWNnbGt3eXkxbjU1MnZqNG43czJyd2dvbjFrMmxpdXk5ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/O7PxA4XxOm6bK/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzJmOWF1ZHlxMmo1OWo4cmk3OTFxZGx1NDFoaHphNzltdHNsaDMxaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iRSLHOpxVDUUo/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXdwOGtrMWZsZWx4YWI0b2V4azVtcTg3dTZjbjBxc2JiM3dnb2loNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tIUDjlhDzfrVK/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW0yM3dxYnJ0cmZkcHk4ZHh3NWc4YnZycGVvaGNwc3o4cWFzZTBteCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/H6Ks6FMp5QAGQ/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnZob253Mmx0aWRuYXZrdjV5b3c1cXhlZjlvemI3dWFtc2Rrc2pqYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0qIAk8HeonSwyjEblt/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaThiemJ6anhibmYwdmZkMmZpc3QxY2Z3aGp4dHlocDR2eTNpYmFxMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WlsLAnYfrB30p9JK5Z/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmc5NXU3cTlwY2Q0Z3NzZDNhb3AxMnIxN2N6Y3FvZHhwaXNqdmptbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3EK9FfRBUrWoCoKObv/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXVpMTRnazlmOWhlbDdtdmRqMGdsdnB5anM0dWFiYWUwdGpoYmRzMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CSym3LTjHKvUY94mmT/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzd0OThtYWE3emdwaWVwMTNpdnE4enk5bXdmdjZyb2RtdjhmMTU1ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5etWclPMB7yDtTdP4U/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWl0aG1sdnc2dG93ZzlrMGowNjFqcXBpbXRsZ3RpZmloYTYzd29uayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2RnI38InrsXbqDe0/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExazZoMXRqYTFnbXY5d3Rmejk5cGx3czRzZ3R1ODFnZmVhM2gxaHNpbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oVW4ztszdtmM0/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExODFrb2g4c3E3anJqa2NoenlrbTJjMnJ2cHIwbjgwN2FhdmNwc2dheiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rpTuD5q2rmHzq/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDIzN2M3bGN0cHdvdzA0NnhncGM5dzEweTN4MG8wODNvcXVvaGlsbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lsITZlcqKCy6k/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWI1cDAyMDF0Z2RqdGYyYjVqaWp3eHNvOGc2dm81c3Bka2E2emMwcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jci08aoSCeJ79vsal4/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExanh5ZnQ3ZTk5bnVtenQwcncwMHYzajdsaXpqc3B1ZzV1NTZpbTRpdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Kf5Tl1dyiSBAYQXdFS/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTN2eDVzOWVnN3JvemZ5eDE0dnhqejNmdjk3bmlsczB4eWE4bmdvYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fu1gXp63nOgei8wDqu/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW1ncmExNjYzMmpwczNhbjNkY2pkZWN3OTJvd3B3eWVidmx6bzh2aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TqzGXyk2dWoINCDPeX/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3VodG9pZ2NkZjdrY2xxZ3BpMHZoZm5lOW5hNGZzczk5b3ZpaGcxMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/X3ZSfEZzlVXS7OMV4c/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTE4c3Q0MG03N2l4eGgxeHBqdm04bGUyczJ3dGIxanR0bG50OHk2cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4yuImSlej7bVKljGeb/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTQydTNibm9yNmtjcHNlcmw3Z2J6bWZ0ajYwZDFtOGozZnF0bXg3MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LSiBRrgCElnwBtpq2N/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGZ2aG9xMXY2djR6dmJmMXpzMXJjbjlqNmhqMGhqMWVwbWRudXY0bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d8YHMRhnM0ZFH2mo3M/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTh4aHE1ZzF1cm5ka2F3ZnU4NTVzaHRtd3lyNmRiczRvdmo4djhjYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DHhVPitfeWdzXnRVay/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNG1nNThmdzlxZ2F6ZnRxbzE5cXBhazVxancwM25xeWZyMHYybjl3NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/abVzXV830cj7YTci7N/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzE4Z3Vid3NjNzU3MmlreXdhYmg4cTl2dnZhY2h2eTRtMGJwM204cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/N0fC3qXEsxrkUgpl3M/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjI2Ynh2ZmEwajI4Zjl6cDA2bzhiNjdlMnJmOGw0OGp6cWRzeThrZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Rlr5U8WbETC7qPQgf5/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExazJhbzFhZWNjM3N6bWkxMXJ6bDJsOHJyb3phM2lwYTRsajNxcXM5dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ks1ZtSQXOXWbLsABei/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXE3cjJwN2QyNGdkdjNlOWU4aXJ0YjJ2ZWhsNmM1aGt2c3p3YjVnaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QU45I2vDXmZGrj9VeZ/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExenR5dzdjOG13bnAwdTRoNW1jaGt2NzloMzVvaDJ6dTc0enc2N28ydSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cRNaqc8WeDvDEV7Pwg/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWN1YzhtM2ppa2hmcXBuamhhcTVramVlOHozNjYyNGszeXd2a295bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lU6zbuZiApGEM/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3lkNmY4cnlqanI0ZjNpMnZzeW4xMXhod252NjZiaW5sYXVwdmhnOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qJuro0Mxezsmo0EyiH/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnZ4cjhmbzVyZnJjaDA0Nnk5bTB4c2oxMGkxMWRmdjFrZmppYWd3aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mAGhW8r2K2jEdYDA0Q/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWhjNGtlcnY5c3ZjazhrNzM3cjdpMnNxbmw3ZXp2azVrYnVmamRmciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8Ir4hazcKr1qdZ6Na1/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzg3M2FnbWF1MjRhM2cxM3ZldnltNDMwb3VweHl2eTFhNDRoaDV1ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nDwA72vkeWc4XIYjy7/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm5qcnJpMzVrcmpjdDF2aTFsZnNyb20zb3gwaGM2bTZoOWFpZDBkOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tgGXEDivc56Ftul7ou/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTRiaGlrMXQ3ZzFreDdxenJnbmVsb2RhcmwxNnRwb2cxd3NmYjh4aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1ZDDyjTCygf1XPTSnW/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDA4bnpkemFsaDRmeDI2bGJhbWVqa2tiNWZncmFqbGRjdzI1MDBwaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bHSkKRvkRvy5chUBBp/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGF4NmYwNXA3ajcxNGV5OGNlMTI5MWdhajdxOWN0Y3JxaGt5YmYxdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5h9jqglckLc1HQbPvT/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ0p3eTFqdzZueHhnNXJkaW1uN2drZTJoNXRzdHg1aTkwbGRndiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IXnnnVD5kyKqXRhaCR/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYm82YTRja214b2xpaTJyZWx0dGs3ZDd2YmowZGZ3eWlsODJic201dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ns5g4tq7zof6DkQ4Vr/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGdyaWtiZXFpYTdhN2h6enQ1MnExbThnbHZiYnBoYm52eWM3amI4biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VT81lAAamPTxHK3w0H/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGRlYzZqZXUzdzllcmJjODF6ZHoybTJvbDRkdjJ6bzZqZTAxMGhhaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eDIlar6oKSbd3cvmUJ/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExamVxdHkzdjl0aDVzemxsZjF1Mmh0cTV5NGl2N3prOHFrcWJwbGV4MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ydhTdPES8pJ5BRF9TP/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG9nenM1ODV1ZXhnMGdheHowb3owcWM5MWg5YjZ5dHQ3eHo5bWxpdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MxHM2fwk7nFJtJdkkf/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY241Z3RpMmJ5Mmsyb3J6Z2JsNDNucXNyYnV1am1ldGV0Y3M0dGV2NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mDKtUw18CxphILJH8J/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGowYXAxaG1jY2l5bTFxb3FrYWd3dThlY2MyNHh1cDVlemVmcnQwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/600QeHOXR8ajikALcq/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2J3ZzZyMGJqaWJiejZhcmxzaHkwemc3ZDN2c21rdDNsOGx0bnIyZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SYv8WWcd5JAHRE0BhL/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2YwMXl4N3BkNXJ1ZzFtZzJjMWg0NXM5OHc0dmxrZXlrY3JoZTBrNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EBDuUkEh5ctI7augD8/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2U2ZG94dTlpZ3ZoaG9hbjVlNGhwcWdnamhvOXdpcW1xbGs1em43bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4QjMiHXasJiXTak43o/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWZreWNnOW5samx5ZXBkZjh5Z2VjczF2d3JkNzFqeTNsd2l4dmViM281bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI1erPMTMBFmNHi/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXNrdnZxYzJ2ZmdiZ3YyZW12aDhsMzg2eGZvemRzZGV2cmY4OGthdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0GqBlPgOeT0w7N2U/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzFxcnViMzFydTZwMHR3cHF3djV2MG12Y3R6ZzdmY2k0NmJxcWcxYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT8qAXuVTsspW55AlO/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXNrcGloMnR4d3o4enVlYnVxYjg5anYydXptcWUzdnNxMGlkZHZ6ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cIyEgKnQu5dFZVWXIZ/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjlpMjNkbmFqeGV3MjMydnlkY2psMjF6angzbTNsZDY2aGxqbnVzbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WRpJOjzW3u1HdMa0ph/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmZlNmQyem80cG15cjZtZ2JsMTdkNGF4OHJnOXIya3JzYm9rOXhrbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41JKF163Hnzm2udO/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWc0Ym11ODg2d3NlZ3Q4NnNpN3Nqc3dtbTM4dGthdzJpa3R0OGtpbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0EozG9tr00cGekgw/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzI2dnY5ZHd2dmd2cDlscjdqM3l2aXlqc2tpcTQ2eDRtNjFlYm05aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3owvKhU1zh5VlZmb6w/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXgzNTJ0bjg5d2JwdGpybG9rMW43a2E3NGU4eXUxMDV4dWtydmtkYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjHMj0My3ET5XSW4/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2NjbXd4eGtqNzR6aXFzc3kwNHdqeTF6cDV3OWszcDRsOXQzYmQwOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEhmGfS6wSQ6uMaOs/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExamJkMnZ3d3hzeGhydGNiNDZxanNmZnZ2aWF4dTYycnFkdDNpeG5wOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FmPX0RBmzdY2HmM/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWlpMjFxYWc1NjI5MDZ0YmtiZjRpMHBnbHc3cDJlcjQxdm9kOHVzayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HPtznk4JbtO8ilVzGx/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2d0OGdldzh1cDZrZHA2dnd3eDg4ZHUyYWxjZ3ZkZ2t1cnU0cTFrdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OtJCc5Lw4WcZlOtqgE/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGlyOHNqb2oxMGZ1OHJwM2RsdzUyb2ZlZzZta2k1eHhkcm8wYjIxcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/H49qoZViyeRQzYupls/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGF6bzJrYWlvb2V6MHhyejRtOTM4c2FzYTloaHZiNHNuY2RxaHJ0MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9fXUSprR4tWvWAQh0z/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGZ1czE5OWlicXA5ODRobHlvMnlveHo0bXdwMGRjMnduMDc3Z2tjaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5L4cXZOvS9zUaQmGfb/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGUzbGFseG5zemxpMGY3djJ4Y2RmMnN4czBndDdzbTVzbW9jczl3NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qZ8j3VloOLVxAg7mpb/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHRmdDc2cHQ2Nnd6ODR4M2V3dGhjdXFqaTRmd2J4eHVtMmF3cWdrciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/h8c6HZHOZngUmBgkXv/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExanN6ZTc1Z3d4YTRqMHdmYWtjaW40NWZlZzZmdWRuZm1pa29wOWh5MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W05iUdqyFujrRFgnn1/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjVicTN4MDg0czMzMjl3bWM5anIxb2E0dmc1d2MyNHc1ZGQybWNxeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WozPWrBEpCUPgbuEac/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGd3dTN4eW56a293ejU5bDEwamluZmF4ZjlwYzk0bmx3OXBhcWtsZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ubhMewn8fmT9U4yrWu/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWl1MGtrOXUzazJydDlkOG93MjlteDhpeWFwdTJvNmpkMTRoaXY5ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/b4ab9TBk9Ornvrt9W8/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnlpNmp2emN1YnV5cjRxdnV0M3NhcjM2cjZrbGVoYXNhZnliaTlneSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EJ2ooeHBi3e6Qab7rU/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGQ3dnYwdTVpcmN1N291MWxwbm0yMXd2eDExdXViNzF4eHhyNXcxdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2mGmRVbjEPSosQ74PP/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2g2bHdxeWRoNjRlenhsZ25renphdjQ5ZTk4N2hla2E5MnJ2eGZ0MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/In0jFGYBR2oIJfb13r/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnB1b3plYXhidXpoZzI3bnJ4ejk3MTRjaXNiMm4xZ2Y3cnEyNGFhYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZnqfvC8BNlAXInRwG1/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHExejY2dGlpenU0ajhjOW5pNDFoMTJ3cnpxamRzdjc4dHh3enh1NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jtonKDesXGggYmE73k/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjU0angzcDE4dnE1NHl4MmtpdWRncnZxa3UwZmJqNWlvdmFqMTQ1bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pYZtX9Y3aZlC5D4zVm/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGFla2IwdXU3NWJ5cWFmcWQ5bmdoeW54OXJqeDFnMW03eGRyM3FiNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pADKBGYQmVSZ83hqpb/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXNxMXlwMW81M2Nub24yMWw1Mm5kZHB3bWJxdzViaGF6YjN3MGdndiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CVpNIJkdN3f4vSuHXj/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjU0angzcDE4dnE1NHl4MmtpdWRncnZxa3UwZmJqNWlvdmFqMTQ1bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bQLGHZNZokPf1aLXRu/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2R6MzRyNWEwZ3Vwb3h1MG5veXlrbzVuNTZvbmp5b2F6Z3V5Y3c4diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/crkdmoaaSIZgYSVBoU/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXI3eGQ5eTFkanh2aDM2aGxicjJncDhiajFnb3h1aHZzeXkyaGsxciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ke01zYhnWW9CeTSWbd/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzd4ODZ2dmdjejczOWpwZzBscnZwZTlna2N0OWZzOGx5eW15MTY1YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1nJ3cfK6w6hXpGYWjX/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3NqYXg5ejFyM2d5bGhscWZsbmV5Z2puaXlzM2FwMW8zOWNkNzdjNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Y4CDJzaTfBGt5Brs3R/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXJ4Ym4yOXBtNGZnM3NydHJlaGhlaXI5YTl0Z3E5NWx1MGZsb282MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/M6kYVGN7cw3txzSSzM/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXI5Nzd5OHhocTQxZ2M3NGZ5eWh0YXF0eG1pd2dhY2VrOHRoeGd0ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NTJCjxEOwZKx1HV7bj/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2wydHd6d3NmN3l0ZWxpdnd5aDQzZnZjenoyejQzY2ppaGJpZ3dpZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qWyCtLBKdEQ9khssjP/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWFjdzRsM2dhbzM1dWxtM2t0cHZ0cDhtNmtpOGJrbWZndmNwOWxsaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1DBcMW3Pw46q7lhVsP/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ25iYXhydXB0Z2xqeG84a2FmNWNmOGZzNTd6bjZxM29ndjBjbWl4bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/peEd2fnFTqR04rGsEr/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWUwNmM5N2ZseXFiYjFtd253eDZucTFham5vNWFvajJqbmszaTI4eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TuDPy85M88l0CB4stY/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJzeTNydnJrdWhkZDUyaXRnbmgwOWUwZHI2MXA3M3c5aWNtZXA0byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1kv867ByoMpwO8hQ4I/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2JwZHVuamZhb2JjcHg0Z3pjaGpsbW52bjU3YWF0ano4bjJoOGNobiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/57uwMufbRKo5snVhdt/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnc1OGd6aGJ0amkxMW9mMGk5NTk3a3E2eGZkeGljcGU4bWlic3oyYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RRe1cowafoXOWPfOUN/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHc3OGFkYTNhYzRncWJmcjliOHdibzZ6eHRxb2hia3JkMGxwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dHoaoPkzz1sMgWDW4v/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3NvMm16aTE3YjN2N3N4ZDUyYThteGF3MDFwdHEwYWF4YmZ1YnVhdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BoE4sv9XZFqVsMgLeJ/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzB5b2o4dXBhNGJ6bHNldWl6bjBxaWdiOWRjZmMxc3dnN2s1MGI1eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DbLR4csCP1jSxLYM3O/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2czcmQ4YnA3MmI4a2wxajh2MmpjNWs5a2t3NTVzOWFmYjA2ZnFmYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7eQKaoU6flRBwAnuz3/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDh0d2Y5bTB0dmkxOTMxdzhpdzEzdzVoc2Z1ZnlkdHFibTJvZjQwZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SWECcDZx0aVdnipphV/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTcwOWZva240NnplcXVxYWp2cHhocGhmeTgyZzQ3eHlxbG93MjZ3NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JTJyOZNvUtzehnYzUe/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTJ3NG14bjFtNDRjamhuaGx4d2EwanpjNWhtcW5naGpnNmQzMmdjZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BoE4sv9XZFqVsMgLeJ/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXp5cnd4cHBlcnFxaG1jYWJycjRyNXE2dHQ3dTEzeTFncDZvcWwzaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JTJyOZNvUtzehnYzUe/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWI4cWQ2ZXlnN2s1OTBwMHI4eHk3MmVqZzY0bzFzbmE2c2p4MW91aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2TuMHMJhhx1tMEhTTG/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmtsNWxkZG43cW5jeG83ZHA4YWVmanQ2enRpZGZ1NXJxMjJzaHVhYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LLJmEAyU6Bk9jDWTcT/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWZwMDZ1MnprcTdoazQxaThremRlN21lZWgzMndwbzkzd2locTVpaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/65d9iD7OBT402gHE9f/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnp4a3AweG41bWdpcmJoenMyOXBwY3g3dWZnd3pqZTBnemtkaHRybSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DiB3wKHhxYhpnnmkEk/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjFocTA2bWh5djgzcnd2YW91MzY3Z2Ftd3YzeXBnc2U2OHE2cnB2OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hVxILYjntsnGpYB1Lt/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGtxN3N2NmRqbnc2ZmI4cnkzOWdwd3E5dHFqdXFqZ3F2ZTFheGwyYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5heWHAMuO5s9ohVUzS/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXZwbzk1bHhiaXM4cDJhYjAyemFuajM3ZDR0eXN0d21mYW81aWRjYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lUWqQxWHxMuxzSJ0kc/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWFtbG1iaWl3aWx6N2VmM3pqZ2E3NmZmN3g5dmkzMG5qNXp1OXIweCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9n5x2P9QS4oZkUXY6y/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDljOTkyMzdhMTE3dDJwcnRnM21zZDVpZ2ljM3R5NzlnMnZibmVrcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tVenHrmL30WuyX50cN/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNtlxdDE5YW1vMDhuYmZjcm4waHc2aG9ub3Zod2F2ZTJxNXRpejVyMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/38lP41HkOkQRxPUdLQ/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDdxeGR2b2gxZHVueDM0ajFkaTVicGdxNGF0OW1qaTJhN3d1MWJyYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L1Zuz45AIuVXfI9oTC/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3ZuNTJuMXE0MGg4cGY3Y2pxMzdydnl5eHh1eHVvMGQ2bmczd3d5MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NZXfZGPdvnwq1DUBhO/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTg3Y2w1eXE5a280Y3dwamZidnl5Y2JrYWIydDRvMWJpN25pN2s3bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/M4Po6rB77EV6agaOEI/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGR6bTkzb2tlMzIwdzlrMmp1bTAzb2p1a21hb2x6NXVkOWhtNnJubiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vEOBEv7RK1J9nqeXWP/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmgxeGgyZHRoYzl1bW52dmVtY3hmdTg3Z240cHBrbm1wbXU4anMyOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JT7c0IDeMTac54KKtu/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Y4Ym5yaDBxZWNxdnBmY3JyOGh2emN6a2Nyc2Rwc3pjcHJkcHMxdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YIz7SF05Py4lc9pQOx/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3Z0bWVzYjg2bWN2OTUwNGl5emVnaXM4dTlrOG9tNHRja29zNjl6NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cJV11NJ40biSvXraZq/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXFpaXJjZzJ2ZTg3aHA1dHhiZHdzeWh6NXB5YXhiaGdhYXUxcGNzcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5x12o8ttu7qGLkZTTA/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2hoYjN4bGczM25pOHJvcmo3cjlzajAyY2h1Yzl6OTJkcHNqcDRkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/21H1wMytw5Fvmu0u0c/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDE5Y3lxdXJqeXk4OWx6Zjd5MThpeTUzeGt3eTQ2MWk3NHd5djA1MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/osFkoSKO8qhEuqRj3G/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTlpY3ZlbHF4aTZieHk1MjJ3Nm8zcmwwaWU3dDJyZXcwZjJ6N3ZwdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nXQHmnZvHGWoyU4fEL/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzd1amcwdGdrMGJqajA5czB6YTVuOTM1dGo0bWdpb3RwODg5Zmk4ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QlVLBccT53qYZZrbSv/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdngzMHJrbzR5eG11bDVsc3llZjNrbjN0N2s5Z3FvZHA2MTA1anB6YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/G9cqyIsmUoAydKr1eE/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDloMW16bHNxOWtteXdiNDQ2NXgyemZ3bDdleTl3a29nNDdvbXN5MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4AevUii89zZf4CJvhJ/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzYwYTlybHBwejNqNnM1bGo5aHpuZmIxMXB0cW15bDI5Mmw5azZqdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kHnK2Xg4jA5eLnjvwJ/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2pybjNodzExa2xlZGNlYzloZnpoOG4xZ3dsM3p4em12NnE5d25iYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6u0cQb0a35r0v4te32/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHB5NTByaGNoOW9iMGI3dGFrbDduOGUxaHV3aHlpdHd2N3Jrcmp4biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qXpRhBOPAxDYaf9dk6/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ltZGNrMzdyNng5N2lwcTRjdDV3anBtOTh0bW5pMmF0NnEzZ2lpMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jwMPkC9T3uiHMugsSr/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGtzOGhlcWxwOHNzbWdja2NyaTV4NTFlOTdxZ2JlNDV2YmgxaWhuMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cCcyVLOIqhuMiQ8eXe/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXNpeG0yMXBtcDc1b2xscHViNXh6OG5lanlsbjBrcHNhN2w4NmliMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6PN52KVARIiZSHT61F/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDh4bGQ2eW5iOHM2Z2d2eDZ2ajJ0a2Zuc2xmNnRudjd4NWo1c3EwNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/t2gDVjQHVXHTk9iIb4/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTRuYnRpamhmaWdxeGVzYXNjazZsMTF6eHZ4aTI3bjloeDllaTR5aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DmypqfGE9PYEK5SgsK/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2I0MTNiZjNhZWxuNTExZzcwZGhxOTd6ZWdla3F3ZnJrY3F3dmRsMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uu75uW8LKxoQWuJed5/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3k3ZDh0enRobGQwcTU4ZHhxbW94MDY2em9mNTFzY2F6bmxsc2p6bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Kh9ITiBnqr8PBTGbna/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGE3Nm9kcTNqeGpnbnpmNXp4MWh4ZjF3OGdmZjJpaDVpdXZxc3dtcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/McwRR34TQnifzTF1aH/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGFrOGttMHpjd3BzNmI4ZHl3c3B2eHh4Y3pidDkxNDRyNHRmd3E5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5tXul3UMc4dfrLkMmP/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWZzNWR3NnlteGRucWIybjNudjFlNnhoZHg0b2N3bWUyYmVrb21zaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SElJgKJ4DXl5yVvXDy/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXRoNHlrMW1oNTBpMDM2anR0N2RyemRtNTN5cGd3ZDVyb3h4MWFzbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tkYdlRQ5cnQbqAfVk2/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExenUyNzU5N3RnOGptZTBkMXFybmtteWRvbDJzZzJpcGR4azN2bDN4aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5tXul3UMc4dfrLkMmP/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGJsZWVsODk1bWk1eDdrdGZrYWo4cXdoNW41eXdoaXlrbGloNXQ5ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SElJgKJ4DXl5yVvXDy/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExazd5cnNiZTE5MzRmcDIwdm9lYzcxenZkZDh3cWlpcW1hNDliNmlhdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rm54GvKeTGNGcHSPvn/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHB5cXd2bGozN2V3YThmN2NuZ3R2eWR1MjVmM2R1OWp2aWphOWV6ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sf7arsn0xlpekg8mSH/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDg3Njhkc2YxM3JybThyZmxvNDNsdDQ5YzBkdzRyYWRrbjhpY3JucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GttvZm6C3PHaeH2BIY/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXU1NDl1N2U3Z3dpMjVjbHRxeDB3MGRzdmduaDd5Nzk2OHAxZDFmdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fqjbEjVYVJgdWNZLrd/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXBtOGxsMXVhZTBzbGV3NDRvNDkwZWlkcjRnZjZ4cWZqODllbmZ5MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zZuT6lFhqnYiAOdZv2/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3N3aml6cGkxOTRiMHI4N3J6emp2amZ0OWc1b3Zha2VzbnozaHNoMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L3OE9nK9R130AkkbQt/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2hnem43eG80aGZnazc1YWJ6NmwxaTE1a2RzbTU1YjU4cm91d2RweSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zD8KVa4dKBPKLYcqMd/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWZzOW01cmNoOHV6MWExbWNjN2c5cHV2YTk5MGN2aGhja3hyYmZkayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cZpi7LiWi8amUtkB3y/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ216YXZ3aHJuMnJxbm55NnRkMjFheG1pMXB3a3ZiaHFwajU4MzlvMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tWxEzoxuotr0SghsOe/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzIyMzJpMTJ3M3pybmliYzFianUwcTRibXBsM2ZudW41Z2Vnd2JpOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tWxEzoxuotr0SghsOe/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWlocGMyNDZnNDhmbmJldXprYjZna21qbGN5NGg4NjBkOXpyaXUycyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UuHt5FyVvcrbtvjS2U/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTI2bXIwYWNkdm1rOGU5bXM5YjBscG85emlma3J5eHVzOXI4dGxibyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NXNyfsaeKJdv3LVDLt/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXV0YW02b2Fxb3B4dmhrMzg1OGVhbzVmdXdjM2RnNHNxbWk0eG44NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wHKcQbqndHFbMIO3qw/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWtobmozb3NwODh6MzVvajl6b2s3NGh1OGc5cHR3dzYzbWkyODNyNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DWPU5UAOqQJcrBEqv1/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmRtZWo2bXcyd3o0M2Z1YjNkOHJpZ3BtaDlib2F0OG85YmljY2Z1aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GeWWScCuGntrfa4azk/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmhtYjJnbTZmd2FweHVyZHcxNXdpZ3k2cGg2MGw4MXc2ZmM4ZjFvdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aeuxB2B9NP2YKRvc64/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExazRvcnowa2s1bW5vcXEwdmZmM3R4cWY5bWcwb3J2em9ncm5sY2M0NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pYdIXYT3xcGAJ24a2n/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOW1qMDA0ZHQ3OGc3eWNhbzJ2YTY5bDd2YTY5ejRxcDVmOGZwem02OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8lIljLzdBnHLNVNgKO/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTJybnI0NXliYzNhbmJ3OXB2dGt3dmo5OHM3YXU4b3ZjbGVucmtueiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tOwHk6itbBqDGkXkJi/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHJha2VlbnV3ZXZnanh6c3V3MmFhcWs5NzR3NGE1eTl0dWsyNHRmcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xTPFZaoLmO37Ay6dRy/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHd2ODVlNjFnOWJoMmJ5MmFiZG5ydmkwczlyOWNjN2g1b2d4aGFxaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26gswauR5gjFR0k7e/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3gyYmhuMTFpZjJ4djlpbjJwd3d3eTB3YTllOWhiN28weXBvOHNhbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0ExrqKxhakABcLo4/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDQ5dnh1N2N3M3Z0Ym42djdjcHVyY2FsZXYxdGpqc3l0aWpqdnlodyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6wrls467dECM2GYw/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGt0emVqbG4xMDE5NmFzejJqenBlcDc2MDYzcjNqdTV4MXF0MTV4aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2YWBlfCa9LoWAVuo/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmwwOTVmZGYyN3hyNmdkejJ1ZmpweWVhZHlpNTdhbDhpOWRocTIzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohA2L2nTbHY4wNkGc/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzd5enY0MGZ3d2FxbnpmZmU1MWFuNTIwb3BhYW4waWtxdHQyN3RwNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohA2Gvkz9MiyGiMgg/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2pwYnVnMzRsNTQ5Y2loMGg1MjlwdTE4a29vNDdyYnprMnQ1emQwNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6wrDXcOBvdGxq3hm/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM245dzQyZnhjdjZmczlrczEwdzBjYXY3ZGhqcDN0dDQyNGZ1ZTV5ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPOqfcFSUEnfzfdWE/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGJxeDR5NnlnMXV0YmxveXQ0cTFhcWZyZXoxZTRhamNxbWxybHY1NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPOquuHL5jRGreJLG/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTJlOGZ3aDR2Ymp1azM4dHY3enN6OXh4cGc3ZDRzeWp0cmxvOTNjNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPOqbLxLCPuy84o6c/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHc0NXc3ZXNzeWE3MGg1eGUyMzYxMXB3anlzcmprdGNwbXVrOXU2biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iRIK8vT78vHcQIljzw/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHhubGFvb2Q2bTlvYzI3a3hrcnB6Y2V6aGppc2owNW0xNWZmaDJxdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1a5TalpNyQtVmWicO2/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzBvZG9pNmNkNDhpZGw0dnB0a2wxbmxzOHRxaWhzemc5ejhoeTl6NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9ZWU8A4L91sF0dn3JK/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2htbzdyMjJ5anlqeG04N3U2ZDc3d3owMnpnZDh4cjdrbncxMW4wNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7l19R9o1QULaSODY9z/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzd1a2o4OTY3cWEyZTVhcnoyd2pscnljdTBodjg0dXZ6bmdsejR5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Q4lZ8QUe9MVqYbTbG6/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTIzM2ZkazE1MWgweXIxcmQ1b3k4N3AzODdvNGhzN3RobWM1NGNueSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/E29imCgvDW7kbC2qz6/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjN0b3U1Y3B2MXhtNXpiYXVsN2s1ajJ0dnh0aHcweW5pd2gyd3U0eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nKd1vWXbDWlVGi1QT1/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDJ0ZXl2amljdGNsNmRueGR3azJzYWhudWliNmZpbHJ5MGVrazR0ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cfdt2jwn6FSKBZDxbM/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGhucmF0NnFyOGVvNGhzY3BuN3hsZTBkY21yaWlrcThpZDJ0aXN4NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3mZobGikhS05QAMw/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWxqYjc3N2hyYTN6d2xib3pjZThhcnUxd2dzMXB6ZGVub29kYjUxbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6m7ZA00GnPfMWtECKVos/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExenJ5ajE5a2FkNms5N3oxdHB3YXBlaml0aTQyemY2bnlmbDRwbW94dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lfBKXBz4ut56BDYOHf/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTZ3eDRsOXV3YWo0ejk3YzRxcm9iNWx2eDA4amV6YndhMzg2Nm44NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lDifyB9R0iqWoDZoIT/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmd5c2hoOXY3NG5xbnR1ZDYxaHIzOWl3cG43YmN4bjJnaWg2YmMxbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0eM7G1bPuZCHxH2e6N/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmU1a251cTd6NmxtN3NkdnAxMW1rZzR5ZHhkc2pjNmhsdHQzd3U0ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/O1OWsUR3ebdqo/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmd5c2hoOXY3NG5xbnR1ZDYxaHIzOWl3cG43YmN4bjJnaWg2YmMxbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0eM7G1bPuZCHxH2e6N/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmU1a251cTd6NmxtN3NkdnAxMW1rZzR5ZHhkc2pjNmhsdHQzd3U0ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/O1OWsUR3ebdqo/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW90NG8ydmhmcHQybGhjZHl6NGdlbW4xamVtMmtuc2tqcHE1MXBiciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/luzxtQqIbaMrM9Fhrl/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmczd2NwZ3o3YWFqZWJnMmNsbjUxMGM4M20xY2o5eDVidDk0cnNueiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fGCkHojHrwRbhq3u1h/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3oweWdsanMwNDB3cXc4NzFycTZhMmplajN2aHYwdTJvM2M4OW01YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUNd9X53tuXM4f4k3C/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWd3cGsweGN4NnlwZXdxazVzYmFraG8wYXczdnNmdno1czdyZmo4cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/n4JfiQ66U2QYq9aLeR/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHBna3NwaXg3Z3V6aDJ5MHExYm5pZ3hucmtibDE5cnl5czFjYnI3ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vDx8nuR8KYhVqCG7pG/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzRoY2Zia3VzeGN5YXJ5bzRtamF0cDA0YXkwNTRuc251ZTNxd3I1aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z2p8Ty3kYvFHaJfmRY/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzRxNG1wYmN1cWJpZTVyNnRmZzEybmhhbzFiYWhlMGczejNhb3U5OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l46Cqj7OWnH7zoUCs/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTJvcGY4YTFraXJnYmpyOTl6Nm9keGN0aW1kMWh6ZWM1MDI2dWJpbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7aD45GUpSKjULj2g/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHNrcWFnaW5mbG50YzhxanZiMHlwcGo4eDh2cGN4ZWQ4d2FkYjd6YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WRLRquvBPeFqAtaW9K/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjVocWg5NzQwdW5xYmd4ejhld3djeDc4NWlpdzFvYnMxOG9nOW1kZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9Igr3RDoeYTfpFW8/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWV0bGYyNndnNzhobXFreTYwOW8zZ3ZzY3JzZnFmcXQxdG13YTd5ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26Bnc1dYtp3SvCfDi/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmltdTVnOWttZTdqZTM4eTRhMHY5bXg1cmQwdmQ0OTV6M3hqMmMyYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Y1vq7S47uaH1hqYhf6/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3FtNHo4dmRiZHo0MDlvdm81NDQxZ2cxMHNqaDVmYjdxbDV5cjFtZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ay84o5uqSHbk6BkizT/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3lpazRmc2MweGV5bHI1NTc0cHpyaTJleTdkN3QyZGN2YnF3MDdhdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/X3ccCq7Q4frNO1Oh2o/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHN1Z20wZGN4b2EzNWlldzZuYWh0bXdlZGc4dHpvZWcwdzN0MzgxNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1oEvw29Nv7GnkhDML5/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnkyZW85MmZmYXo3MmV2bWZvaHRnaHJ4N2ZrZWkwM3pteHg1d3M0diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PtAVJlGFRwzPWV2Al6/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXlucXE4NHMwcml1bjNlNWozdDY4aWprZmdyN3pqenAwMWJvYXFhYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/m91Y4x49SFtGtnMrDV/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWJydjkxeHZzbHhyMGkxb3o0ODd2cGp4b3IyMWtjM3V2ZzRsYnhxaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjHWh5w0uvKXa4LK/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTdpb2QyaWgwbTlndzAzNmVxd21tdWtkcGY1ZGN3MG51YmZ2ZnJpeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o72EUoYosdi1ccFpe/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGgycmo1a2xndXBybWhiNG5tZHMzbmM4NDhvaGhmZzdzMm5kZ3VucSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7Fg6TM7LEK9PjfjBR2/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTI1ZHoyZGJna2JicHJxdGtweGxpeWU4cTR6ZnkwNGlwZHFrbTM3aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3HsJ0yZfQkOMlj9m0r/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGF5aWE4a3E1OThpdDMwa2g3MzJld2F3Yzk4cmQ2cm5ocWhsOTBrcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6OZo03ow9eBRU6bVjg/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWlvYzl0dHE2OHE3dDE0ZGwxNGt0dnc3Y3Nzc3J6ZnJzaWs5OWplNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jwzynzZbB00GA/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW54cDhzcmo3cGJzcGY1Y3Fuem10cjQ5bGc3ZmlkOWhoODEweDI0ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4adIXlZF605F5LclIs/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGk1YWN2d2lqNTkydnEzcXhtMWdraXdoMDB4Mnp2OGs5bzVzcnEwaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4TaTQfPOtKEF6A9oLp/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3Jid2FiMGJreDJuYmY5OGdrbmVhaDdzYThkbjJoZHlpd3oxNXZ5ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7Fg6TM7LEK9PjfjBR2/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExanJpMTY1MGYyeDNuN251MmhwYTlnM2M5MWVjOTJ5b21wMHlyYzhzdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ezrPlIbyskLkUJxkM5/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExamtwaXhzc3FiNDN6c2s5eXhseTJjeXQzanoxcGNtdGRhNnQwdDU4MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JyHp3G7UCTMty8fRbe/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGVrZGZhN3V4a3lneG9oNnY3aWpnYnUwdDRnbHJxYzhxMWtvNTE3YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XdgeME4mRdE5LNO4HQ/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDN5aHozaW1qMjBsbm1icmE1ZHN6NWdtbXh0ODZwbWxyNDVpdTMzMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/O5QVi7xxGRNYHPcRqd/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjR5NTNtMGNqZjBrem1oYnRxdDJtNXdva29ua2xxNGdmNTF2NHI2eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8H08kdFMDdWeGTqIR3/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWVla3d6Mmd5dngwemYxdnVkYTd6aGttbWxpNjA4OTRwaGtmOTI5OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WCqdlRDSMTSDFWOcXD/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGI1Ymgzd3hndTR4YmJkbWN6d2VsdHJvdXlkaW91NzQzbTVwdW1sZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/54VWtqznIMSVBmqSoO/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWUzcjFidHlpY3V6MHVtczAxYTBwYm82YXFnNmdmczBiNWU2eGFmdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nVd0MEb55oXDaCwsOY/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmR2bHhwZXA1YjkxejhpanN2b2I3Mml2b3F2bDg3ZGwwb3JodndvdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lFQbbBcmvrCj8Tj0u1/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2YzZ3FxMDA2ZW5rcGxkdHZ6Y282eThjbDlpeXp6djkwZWRnejc4NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DkqxcTQvkJtPhymFvo/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnpxamlxYzdhdXNzMXc4MWNsZGptdjE3ZDZ4Nzd3Y3VxdGk0aXgybSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tGucBWFt6dDUfsWkCy/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2pjMWVkM2xxOXZjYjhqbmxhajRpY3lvaDgzbnhwbXF1d2JlOWxsaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mpTcIGQdgSLmeiDJ73/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXhiamozbTNsYmUxNDhyYTNyeTRzZmF6c2Z1bWo2bmk2YjR6N2R3eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7vUbDu6iVCFXiaeHXY/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWNzM3F6dnVseGNsczR4Y2h1M3BjYXR4N2FmMXBubm16eDVsamVhdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7D60zQQLUcjYKDQRIK/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDE2NnJjMGQybW93dHlxMmlwbWpwbjN6cjd3NXo3NjlsNXhwcm43bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UVESiqjrn4ec4UTu9X/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnFteWVrYWwyanp1d2pnd3FiaDNwcjJtN2R0emhjNWJpM2puaGU5eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IEfdiZwqe5Ia1paxYD/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3I0b2s0M2Y5dXpraXV4bXV5dWhnMWZyaGsxMnEyanRwcm50bWdyciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TUQjaBFhd0fG8KuVD6/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGthem9kNGN5cmNzdHhhY3prbW52bW1nZ3M2bHZkaDF0bjNzcHJsZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HHHp9aGzU2LWzlJjnF/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2c1ODVpMTc1N2ZoYTc5aTRubmV5NTE2ejh6eTFmNHQ0eDVveWhsZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IlzEh2IuHIGb8q1KTK/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2c4eDM3b241YjZmeGZnZnMzcGc5M2lnaGMydjFlazBzOWp6anZvMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/k4UXQVAqJfNM5ow5YC/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2kydG5mMnc4cGIzbXZmM2N3MHI2NXcyMXVhbTI5OW1tM242ZHI1bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FXqi5ou02mF2MF4Mns/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXQ5cnpwY3Q5NjFwdHAzMXNvb2hlaWd4MmRxYnBldjQ4dDM0N2JxZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KUNuQbZfuNFcdeZmqm/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHd1bGxlcHYxbWh6bzY4bmttdDk0amxjbjJpMjd2NWJ3ZG53eXZlaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7dcBbclesOofFBiXHd/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmN0OGs2aTh6dmJ6ZGg3ZmI1YzJ1dXRmNnA5dXlrYTRzNmJvajVhZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nbC4pJB1ZHswG2kNi8/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2t3bWczc2lhdXdzbmlnZWhndHl5eHYxb3d6cHIwbTRubmUydjV0MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0f2Xc8vaQOAQOydCEa/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG8wMDkwb3F2ZWx4OXZrZW41cWJ4M2drb3hyaTZzODg1NmphazNibCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qtDMUx4OQAkOi5P06o/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZm9obDIyN2lnbm1jNnVjejVpdzlsMDhrcTB2YzVsd21xazVkeXRyciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3TnckHTEZJmq2TJaI8/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGM0ZmN0Y2F5eW10aDFmajJmYWt3eXhyb2Q2bW1xNW5yNGltdjFmZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rntBwnwYUXsFXxvBkG/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWxjYTlvbDNybDFyYjd3bWJiNGR0aGd2c285bjVyYmVwNXlzbG5wNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZIlwywc7vDcuDzlzMG/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTlua2F6M2t5NG41b2VkNGcybmVmMHlqNzM4bDh5ZjNud2hobmVtOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vYDb1j8ItpBf8E1ZLD/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGQwcjJlMTRxcXQzdGg2ZDl4OGtiZWtoNTN0amtnZTllNWNwZG5naSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7R3KU4Ifr0L0rcaQKh/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExODBnbzN0cHRsemhrb3djN2dyaTBhMzh4aTU0MXVwNmtoeXByOTJ2biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pfRPCkuhXyyvQ8Tpjf/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTA4bDF4OGdiNmR1YTQyZnVtdDl6bGc2d2FoYzB6eW02ZXhucW9jYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gLqVKTjbbuwBUoYUuE/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWltNjJydTNqazBhNHlnaW45MWxwaTZlZ2pjZmZ6dTZnNGJtbHBleSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mnqIc2wxfKTCc7QrIt/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDBraWM5dXg1NWViM3Z2MXZnZ3AzcGc5OGk1NTlxZ3Y2Y3hsZGtpeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BZy4US4yNLoAr0bdAP/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2VzanB6bjJmdDl2MjIxY3FteWlrZ2dkOWJqd2N5dzk1NWVubDlnciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/U5QGwIE0cLLz7CuZXs/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExajJiNWwyOW1pZ2dlb203NjIzbXVnemoxcGxpdTZqNTAxc3EwNnM0aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6CNKfK6XCRZEEkNbEy/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2JheG0yNHppYmJodmljdmNxNDNhejBrNnR4Z3lyaG16aWU2ZTJ1ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GkQjO1xsXLG7DeQ2qN/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExczVwMm41cGpyeDI2MHhteGtwbndtdWp5OG94M3doN2xlNmYwOGoxNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YQGhqLUgkcZCRGiNJJ/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjdua2V0czExendyb21tZTBtZWQyMmN6MzQ2YTZyeXVtZG92NG85ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JozR8MWA2wCT0EbCo7/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWtsb2FkeDV3dXVhcXdzM3hjcnlxaG1qbHdyZnA2enMwZDA0aHkyNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WYbMXWjyz76FVJjGr0/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjIybWp4amhrb3V6M3R4YnV5cTFlcGo5dXg3N3k1MTk2bWx3b3JrZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Edujbss70fOEDE0ldk/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDlqdzN4cXlzYnFqZTE4cG5ncmIyNXBwZnpjNHNkZjBqNTZiMHE3bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RIMPkh1hc6DkcFKVOx/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXdwdnM2Z3R3M3c2YTZkOHZ4MHFxbGUycDJqaHFpZms3ZWxybmpiZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/G1yc0NdYNeN9z8qLpE/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHJ1cDV3MjExM2s2Y3gwam40Y3I3MXE1Y3RteXZtdnlucTAwMG5nbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MSkTTCYH8b7kFVq2Sd/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY242d3VuaGZrNmsxMjYxZ3dxemxzdHhhODU4YmRnaXM5cmhtZXNxbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/spQoq5rlbYCXFpxD3f/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGwya3pjNmUwNTF3aTRoOGI4bjc4Z3M2a3AxMHI3a21ycjlpdmFoNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nSmDHpAPFIu7JAOmTY/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWMzN3RnNTF3emp2eG1hOWVyYmwzc3VxNWo5aW15NHc0eTlrMGxrbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UNvSXceF8EFMwflqpP/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2JpdWU0c2Q3dDNjenc0M3FpOHMzc3hydGkxMGs3ajA3a2l1Mm9rOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Aa0vkeMsGydQe3VrE9/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDYxbmNidjQ1MDlqNzZ2Z2dwdzFqcjM5bjU3MHJhNXh2cGV6bjE1dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XnNILiniw60MMlc5Qr/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGJ6eGNmYjFhZWlpcHc3YzJqeXluMXpvejFvMTJtdzBwMTdrdWx1NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XdAaGgl8pK0CiR8RZX/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmV4aXByN29lenZzODF0aGs1NndrYnBoeTh6emt4dW9zNW1vOGxibCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5N0hyjP5CCwQ4VTQS0/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnA0NnoxcHd3bDE5MzljOGxsMXJtM3NhZHp6bm1kNTJ3d2c3MGVnbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/59yEP4rCrXkrkMEW32/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjNiemExcTBrbWlvb245Z2IxZ2swdTdlZnpsdGVmbGswdndsejB1MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/feSKwE980ben84Zyaq/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExemRoMWE5NWoxNDRmZTZ5cWYzZnlsaG82c2FkYjB1YmpqMXZubmhtbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CeUbtAtTheJfeekZ1N/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjNrZnFwMmU0ZDFjNjRxY3Rsemd1NmZ0cWtweDdibDlsYjR4NGc1byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A3lgCUTtJv3BLWkfke/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2QydTlrdWc5bzdjN250M3d0NGdkNjdmY3A3ZnU3cGRvMW1zdGp0eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/loPkXmxJskaCcIw24P/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmNlZ3U4c3ViMmRjY2p1Y2U4czh2dWh4Y2c1YjVobWMxemw2OXJ4eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JQ6G9GuFuAf7j1v1fR/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjFqa2xjdWZqOHBzNnR1cW8wbml4YTAxc3F0ejVrOXp4dDBiemZnaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yMMJB4678mvyq3b4d2/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDNxYWd5OHdmaTFhM3JmdWxpano1MGlnYmd5eTE5Nng2azRvNGFzNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TCzLdjjqVHF5Tq3teK/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYm9rOXF6NnVhcG1oNWFsdmUwanE0eXQyMWlmaG5mcW4zNjlrcDdrYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hAuOcKDPTS3nxa190r/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTE3N212NHU1ZXlvOHZzbXhqajA3bzYxZG1jNG9obTQzb3A3NjlnbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SHUOEPPGKwxj2/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjk0bG1tOTh6bDJhY2o0YXVmN3lxajZ1aGNxa25oanY3cmY5eGd6YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A123YmuxQXhQQiIaRG/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzl1YzYzZXgyYWtoMHVjdmNiMG5qeXdsaDBpdGhzbnV3MWpmbWV1NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3bfu4Q3ItmDLdIlA5Z/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTQ3N2FsNmNvM3N4bDhnZ2x0b2Vmc3A0bWgyeXNsZGcxNzJoNzl2aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QeXSE8oueoyC9H8Wpz/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExejVmb2FwZnQ4ZHQ4ZmU3dXl6MncwNHFuMmxyNXFjYjhodmF4ZTVkOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EsTK6ISujdOmrmruXd/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG5nN2dxeDRmd253NnNnMjh0eGR4cjk5MDM2MnFjdGt2aTc3MmJ5diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RwuljDe7goIbIafZRS/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3hncWZpazd3NzVzb2Z3cXY2bzM0NTc3dmxjdnJ1eGFvenl5MmxrdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zKnjDwOAJKbJ6IulUL/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3RidWZxYnMwYnlyMDVtaHFsZGNueDZqZjc2cWo4dHJub2UybGx6MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RFBjExLDSOchkdPeJL/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDQ3ZHg2NnIwbDk2cXFlNzE4emE2aWJrN21idGYwMXllMnZkZ2xmYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FhGP5j6bfKfQbPBpc4/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjhnb20wM2EwYXo5ajVucnJtbHZwejViY2pvbHE2dGI4OHN6NWJobyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/StSKW8znKAKy6AVTZ3/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTBmeWprd3VkN2UzcmNiODdncHNhZXNhaGpsYXVtdXpzM216d2FtZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/N7eCdzNRPkisNBhrWK/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExem0ybTJqNWEwczR6cXhnMG5iMDFsZThoMXg4ZTBnbmp0bmhhcWticSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tanrcEWSq9NHPDDg1h/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHoxaTh5b25vczU0eG1qN2Z4d2hiYzdkbmt4N2Y4YzFyNmdsdm80cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8WVZfUEQdA0TCw9Rb8/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2gzbm1ieWVkNTByZmZhZTdvbGVueHJwZW13ZjZ3cHliNGE1d3d1aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kWKxZwDEoSnuhVH1iG/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb242Z3AwZGthbnY0OXEwamc0ZnkzMjgzam0wMjc4aTJ1MmU4bTI4cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GSbyQXYxditO9BsKEY/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3NvMDBsa3VueTVlZzd5d3p5b3plaTFtd3o2b2txbzN3Ym02ZGZ3ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kWKxZwDEoSnuhVH1iG/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGRxYjZhMHA2emxyZmRnYWY3ZzNwN2poMTR2ZHNwYWhwOWZsM2k0bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2jOJaUdyjCif8CYkV2/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2c1eGVnbmExaWZmb2d2ZHpnc2p4NTczcmtyYzNsZDRxaHN0NzJ4dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sG5zHnrE2HaNUmNHLd/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG80ZGJpemE2MHkwdHlqZjFzM3o5aTlwZWFhaTZxZ3dyNnM0ZmluYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a5sxXF7MCbtrBUz0Je/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnpjd2o5NXNtMG5peTc4MWRsOG94ZnBhOXF6cnA0dTh6Znc4bHZ0aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KPxiTsWkrdoZpeGyj5/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWNyd25pbHg4d2Q0NGZxaHp4b3owaHR6NG1rc2RseHUxeDF5azlrbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7yEtDSnrndHYvHCf2I/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3ZyejM1anI0ZG9rN2I5cjU5MWZsOWp2bWxuZ2YwMHNjYmtoNGV5dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7RdxQf15yUOJO27vvN/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3hvNGJuM3huZmR2Z3VkbzJwbXFkY2lob3hyZ2NoYTN2Z3R5d21rNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/avo5FT8Lxf4aahwl4k/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG1nd2V1eTYya3hoZHFodGlyenVjbm45OWN6M290dGptMGo2MjVpMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oq7CJCmI4HGG6kp62U/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDNwanZmajNocGhvbTE1aXowbHhvZGRidzV0MXZ5bXk1bW0wODUxNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Zz9Sg75B8D1MKtAQDJ/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXBtYnZwdTV1d3lhc3ZlcGZpdmFtcWY4em03ejZrd2NieXp3bTZqNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sFnYrRMFNeWWzSuFtE/giphy.gif"
  
];

// --- PER-DIFFICULTY RANK-UP RULES ---
// Max rank achievable per difficulty:
//   - Easy: Rank 8 (Legend)
//   - Medium: Rank 11 (Super Iridescent)
//   - Hard: Rank 13 (God Level)
//   - Legendary & Insane: Rank 15 (Ultra Instinct)
export const MAX_RANK_INDEX_BY_DIFFICULTY: Record<Difficulty, number> = {
  [Difficulty.EASY]: 8,
  [Difficulty.MEDIUM]: 11,
  [Difficulty.HARD]: 13,
  [Difficulty.LEGENDARY]: 15,
  [Difficulty.INSANE]: 15,
};

// The final rank for each difficulty ONLY unlocks upon completing the entire board without using hints
// and staying within the difficulty's allowed mistake limit:
//   - Easy & Medium: 0 mistakes (perfect board)
//   - Hard: up to 1 mistake (all other cells solved cleanly)
//   - Legendary & Insane: up to 2 mistakes (all other cells solved cleanly)
export const MAX_MISTAKES_FOR_MAX_RANK: Record<Difficulty, number> = {
  [Difficulty.EASY]: 0,
  [Difficulty.MEDIUM]: 0,
  [Difficulty.HARD]: 1,
  [Difficulty.LEGENDARY]: 2,
  [Difficulty.INSANE]: 2,
};

export const RANK_XP_THRESHOLDS: Record<Difficulty, readonly number[]> = {
  [Difficulty.EASY]: [230, 510, 820, 1180, 1570, 2010, 2480],
  [Difficulty.MEDIUM]: [230, 510, 820, 1180, 1570, 2010, 2480, 3000, 3410, 3850],
  [Difficulty.HARD]: [230, 430, 660, 990, 1270, 1570, 2010, 2360, 2740, 3130, 3560, 4000],
  [Difficulty.LEGENDARY]: [110, 290, 500, 740, 1000, 1270, 1570, 1880, 2200, 2540, 2890, 3250, 3620, 4000],
  [Difficulty.INSANE]: [130, 330, 570, 850, 1150, 1470, 1800, 2160, 2530, 2920, 3320, 3740, 4160, 4600],
};

// Returns XP-based rank capped at (maxRankIndex - 1) for the difficulty.
// The difficulty's final rank is gated on board completion + mistake limit.
export const getRankIndexForScore = (score: number, difficulty: Difficulty): number => {
  const thresholds = RANK_XP_THRESHOLDS[difficulty];
  const maxXpRankIndex = MAX_RANK_INDEX_BY_DIFFICULTY[difficulty] - 1;
  let rankIndex = 0;
  for (let i = 0; i < thresholds.length; i++) {
    if (score >= thresholds[i]) {
      rankIndex = i + 1;
    } else {
      break;
    }
  }
  return Math.min(rankIndex, maxXpRankIndex);
};

export interface RankProgressInfo {
  isMaxRank: boolean;
  isAwaitingCompletion: boolean;
  isMaxRankLockedOut: boolean;
  maxAllowedMistakes: number;
  prevThreshold: number;
  nextThreshold: number;
  progressPercent: number;
}

export const getRankProgressInfo = (
  score: number,
  rankIndex: number,
  difficulty: Difficulty,
  sessionMistakes: number,
  hintsRemaining: number,
  filledEmptyCount?: number,
  totalEmptyCells?: number
): RankProgressInfo => {
  const thresholds = RANK_XP_THRESHOLDS[difficulty];
  const maxRankIndex = MAX_RANK_INDEX_BY_DIFFICULTY[difficulty];
  const maxAllowedMistakes = MAX_MISTAKES_FOR_MAX_RANK[difficulty];
  const isMaxRankLockedOut = sessionMistakes > maxAllowedMistakes || hintsRemaining < 3;
  const lastXpThreshold = thresholds[thresholds.length - 1];

  if (rankIndex >= maxRankIndex) {
    return {
      isMaxRank: true,
      isAwaitingCompletion: false,
      isMaxRankLockedOut: false,
      maxAllowedMistakes,
      prevThreshold: lastXpThreshold,
      nextThreshold: lastXpThreshold,
      progressPercent: 100,
    };
  }

  // At penultimate rank for this difficulty: next step is the difficulty's max rank on full board completion
  if (rankIndex === maxRankIndex - 1) {
    const boardPct =
      totalEmptyCells && totalEmptyCells > 0 && filledEmptyCount !== undefined
        ? Math.max(0, Math.min(99, Math.round((filledEmptyCount / totalEmptyCells) * 100)))
        : 0;
    return {
      isMaxRank: false,
      isAwaitingCompletion: true,
      isMaxRankLockedOut,
      maxAllowedMistakes,
      prevThreshold: lastXpThreshold,
      nextThreshold: lastXpThreshold,
      progressPercent: isMaxRankLockedOut ? 0 : boardPct,
    };
  }

  const prevThreshold = rankIndex === 0 ? 0 : thresholds[rankIndex - 1];
  const nextThreshold = thresholds[rankIndex] ?? lastXpThreshold;
  const span = Math.max(1, nextThreshold - prevThreshold);
  const progressPercent = Math.max(
    0,
    Math.min(100, Math.round(((score - prevThreshold) / span) * 100))
  );

  return {
    isMaxRank: false,
    isAwaitingCompletion: false,
    isMaxRankLockedOut,
    maxAllowedMistakes,
    prevThreshold,
    nextThreshold,
    progressPercent,
  };
};
