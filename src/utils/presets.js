export const sizePresets = {
  social: [
    { name: 'Instagram Post', width: 1080, height: 1080, category: 'social' },
    { name: 'Instagram Story', width: 1080, height: 1920, category: 'social' },
    { name: 'Facebook Post', width: 1200, height: 630, category: 'social' },
    { name: 'Facebook Cover', width: 820, height: 312, category: 'social' },
    { name: 'Twitter Post', width: 1200, height: 675, category: 'social' },
    { name: 'Twitter Header', width: 1500, height: 500, category: 'social' },
    { name: 'LinkedIn Post', width: 1200, height: 627, category: 'social' },
    { name: 'LinkedIn Cover', width: 1584, height: 396, category: 'social' },
    { name: 'YouTube Thumbnail', width: 1280, height: 720, category: 'social' },
    { name: 'Pinterest Pin', width: 1000, height: 1500, category: 'social' },
  ],
  devices: [
    { name: 'iPhone 15 Pro', width: 1179, height: 2556, category: 'devices' },
    { name: 'iPhone SE', width: 750, height: 1334, category: 'devices' },
    { name: 'iPad Pro 12.9"', width: 2048, height: 2732, category: 'devices' },
    { name: 'MacBook Pro 14"', width: 3024, height: 1964, category: 'devices' },
    { name: 'Desktop HD', width: 1920, height: 1080, category: 'devices' },
    { name: 'Desktop 4K', width: 3840, height: 2160, category: 'devices' },
    { name: 'Desktop 2K', width: 2560, height: 1440, category: 'devices' },
  ],
  common: [
    { name: 'Square Small', width: 500, height: 500, category: 'common' },
    { name: 'Square Medium', width: 1000, height: 1000, category: 'common' },
    { name: 'Square Large', width: 2000, height: 2000, category: 'common' },
    { name: 'Banner Wide', width: 1920, height: 480, category: 'common' },
    { name: 'Banner Narrow', width: 1920, height: 200, category: 'common' },
    { name: 'Favicon', width: 32, height: 32, category: 'common' },
    { name: 'App Icon', width: 512, height: 512, category: 'common' },
    { name: 'OG Image', width: 1200, height: 630, category: 'common' },
  ],
  documents: [
    { name: 'A4 Portrait (72dpi)', width: 595, height: 842, category: 'documents' },
    { name: 'A4 Landscape (72dpi)', width: 842, height: 595, category: 'documents' },
    { name: 'Letter Portrait (72dpi)', width: 612, height: 792, category: 'documents' },
    { name: 'Letter Landscape (72dpi)', width: 792, height: 612, category: 'documents' },
    { name: 'A4 Portrait (300dpi)', width: 2480, height: 3508, category: 'documents' },
    { name: 'A4 Landscape (300dpi)', width: 3508, height: 2480, category: 'documents' },
  ]
};

export const colorPresets = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' },
  { name: 'Red', hex: '#EF4444' },
  { name: 'Orange', hex: '#F97316' },
  { name: 'Yellow', hex: '#EAB308' },
  { name: 'Green', hex: '#22C55E' },
  { name: 'Teal', hex: '#14B8A6' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Indigo', hex: '#6366F1' },
  { name: 'Purple', hex: '#A855F7' },
  { name: 'Pink', hex: '#EC4899' },
  { name: 'Gray', hex: '#6B7280' },
  { name: 'Slate', hex: '#64748B' },
  { name: 'Transparent', hex: '#TRANSPARENT' },
];

export const getAllPresets = () => {
  return [
    ...sizePresets.social,
    ...sizePresets.devices,
    ...sizePresets.common,
    ...sizePresets.documents,
  ];
};
