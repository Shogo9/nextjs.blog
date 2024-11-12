const dictionaries = {
  en: {
    home: {
      title: "Explore the Nebula",
      description: "Gateway to the latest discoveries in space exploration, astronomy, artificial intelligence, science, and the mysteries of the universe.",
    },
  },
  ja: {
    home: {
      title: "星雲を探検しよう",
      description: "宇宙探査、天文学、人工知能、科学、そして私たちの宇宙の神秘に関する最新の発見をお届けします。",
    },
  },
} as const;

export async function getDictionary(locale: string) {
  return dictionaries[locale as keyof typeof dictionaries];
}