const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../data/services.ts');
let content = fs.readFileSync(srcPath, 'utf8');

// Extract the import line to get all icon names
const importRegex = /import\s+\{([^}]+)\}\s+from\s+'lucide-react'/;
const match = content.match(importRegex);
if (!match) {
  console.error("Could not find lucide-react imports!");
  process.exit(1);
}

// Clean and parse icon names
const icons = match[1].split(',').map(name => name.trim()).filter(Boolean);

// Create mock declarations for all icons
const mockIconsDecl = icons.map(icon => `const ${icon} = "${icon}";`).join('\n');

// Remove import statements and export keywords
content = content.replace(/import\s+[\s\S]*?from\s+['"].*?['"]/g, '');
content = content.replace(/export\s+/g, '');

// Assemble evaluation code
const evalCode = `
${mockIconsDecl}

${content}

module.exports = serviceData;
`;

// Evaluate the code
const serviceData = eval(evalCode);

// Map the complex serviceData structure to the Service schema structure
const seededServices = serviceData.map((s, index) => {
  return {
    slug: s.slug,
    title: s.title || (s.hero ? `${s.hero.title} ${s.hero.highlight}` : ''),
    subtitle: s.subtitle || '',
    description: s.description || (s.hero ? s.hero.description : ''),
    icon: typeof s.icon === 'string' ? s.icon : (s.slug === 'smart-entry' ? 'DoorOpen' : (s.slug === 'smart-protection' ? 'Lock' : 'Briefcase')), // Fallback cleanups
    features: s.features || (s.overview ? s.overview.features : []),
    orderIndex: index,
    active: true,
    imageUrl: s.hero ? s.hero.image : '',
    
    // Service Detail custom fields
    heroTitle: s.hero ? s.hero.title : '',
    heroHighlight: s.hero ? s.hero.highlight : '',
    heroDescription: s.hero ? s.hero.description : '',
    heroImage: s.hero ? s.hero.image : '',
    stats: s.hero ? s.hero.stats : [],
    overviewTitle: s.overview ? s.overview.title : '',
    overviewDescription: s.overview ? s.overview.description : '',
    overviewImage: s.overview ? s.overview.image : '',
    partners: [
      { name: 'NORDEN', imageUrl: '' },
      { name: 'RAMCRO', imageUrl: '' },
      { name: 'COMMSCOPE', imageUrl: '' },
      { name: 'PANDUIT', imageUrl: '' },
      { name: 'HUBNETIX', imageUrl: '' },
      { name: 'CISCO', imageUrl: '' }
    ],
    projects: (s.projects || []).map(p => ({
      category: p.category || '',
      title: p.title || '',
      description: p.description || '',
      image: p.image || '',
      link: p.link || '#'
    })),
    faqs: (s.faqs || []).map(f => ({
      question: f.question || '',
      answer: f.answer || ''
    }))
  };
});

// Save to services-seed.json
const destPath = path.join(__dirname, 'services-seed.json');
fs.writeFileSync(destPath, JSON.stringify(seededServices, null, 2), 'utf8');
console.log(`✅ Extracted ${seededServices.length} services to prisma/services-seed.json successfully!`);
