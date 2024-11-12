const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

// Ensure posts directory exists
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

async function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function createPost() {
  console.log('Creating a new blog post...\n');

  const titleEn = await prompt('Enter title (English): ');
  const titleJa = await prompt('Enter title (Japanese): ');
  const excerptEn = await prompt('Enter excerpt (English): ');
  const excerptJa = await prompt('Enter excerpt (Japanese): ');
  const imageUrl = await prompt('Enter image URL: ');
  const category = await prompt('Enter category (exploration/astronomy/technology): ');
  const tags = (await prompt('Enter tags (comma-separated): ')).split(',').map(tag => tag.trim());
  const authorName = await prompt('Enter author name: ');
  const authorAvatar = await prompt('Enter author avatar URL: ');

  const slug = titleEn
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const date = new Date().toISOString().split('T')[0];

  const content = `---
title:
  en: "${titleEn}"
  ja: "${titleJa}"
excerpt:
  en: "${excerptEn}"
  ja: "${excerptJa}"
date: "${date}"
imageUrl: "${imageUrl}"
category: "${category}"
tags: ${JSON.stringify(tags)}
author:
  name: "${authorName}"
  avatar: "${authorAvatar}"
---

# ${titleEn}

Write your English content here...

---

# ${titleJa}

Write your Japanese content here...
`;

  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  fs.writeFileSync(filePath, content);

  console.log(`\nPost created successfully: ${filePath}`);
  rl.close();
}

createPost().catch(console.error);