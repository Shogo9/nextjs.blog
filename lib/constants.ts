export const SITE_CONFIG = {
  name: 'Nebula Cube',
  description: 'Discover the latest news and insights about space exploration',
  links: {
    youtube: 'https://www.youtube.com/@NebulaCubeネブラキューブ-r1e',
  },
} as const;

export const CATEGORIES = [
  { 
    id: 'exploration',
    label: { en: 'Space Exploration', ja: '宇宙探査' },
    icon: 'Rocket'
  },
  { 
    id: 'astronomy',
    label: { en: 'Astronomy', ja: '天文学' },
    icon: 'Stars'
  },
  { 
    id: 'technology',
    label: { en: 'Space Tech', ja: '宇宙技術' },
    icon: 'Cpu'
  },
] as const;

export const TEAM_MEMBERS = [
  {
    name: 'Shogo Miyawaki',
    role: { en: "I'm trying to be an alien", ja: '宇宙人目指してます' },
    avatar: 'https://i.ibb.co/DQ5W5jr/shogo.jpg',
    badges: ['computer science', 'space engineering', 'rocket science']
  },
  {
    name: 'Sayaka Tokui',
    role: { en: 'minimalist', ja: 'ミニマリスト' },
    avatar: 'https://miro.medium.com/v2/resize:fit:1200/1*uNCVd_VqFOcdxhsL71cT5Q.jpeg',
    badges: ['engineering', 'rocket science']
  },
] as const;