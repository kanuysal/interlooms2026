export interface Category {
  slug: string;
  title: string;
  folderName: string;
  ktx2: string[];       // 2 KTX2 paths per category (for WebGL carousel)
  colors: number[];     // RGB 0-1 floats for WebGL bg color
}

export const CATEGORIES: Category[] = [
  {
    slug: "pet-chips",
    title: "PET Chips",
    folderName: "1_PET_Chips",
    ktx2: ["/fields/1_PET_Chips/1.ktx2", "/fields/1_PET_Chips/2.ktx2"],
    colors: [0.96, 0.94, 0.92],
  },
  {
    slug: "pes-filament",
    title: "PES Filament",
    folderName: "2_PES_Filament",
    ktx2: ["/fields/2_PES_Filament/1.ktx2", "/fields/2_PES_Filament/2.ktx2"],
    colors: [0.96, 0.94, 0.92],
  },
  {
    slug: "pes-staple-fibers",
    title: "PES Staple Fibers",
    folderName: "3_PES_Staple_Fibers",
    ktx2: ["/fields/3_PES_Staple_Fibers/1.ktx2", "/fields/3_PES_Staple_Fibers/2.ktx2"],
    colors: [0.96, 0.94, 0.92],
  },
  {
    slug: "textile-clips-for-recycling",
    title: "Textile Clips for Recycling",
    folderName: "4_Textile_Clips_for_Recycling",
    ktx2: ["/fields/4_Textile_Clips_for_Recycling/1.ktx2", "/fields/4_Textile_Clips_for_Recycling/2.ktx2"],
    colors: [0.96, 0.94, 0.92],
  },
  {
    slug: "recycled-cotton-fibers",
    title: "Recycled Cotton Fibers",
    folderName: "5_Recycled_Cotton_Fibers",
    ktx2: ["/fields/5_Recycled_Cotton_Fibers/1.ktx2", "/fields/5_Recycled_Cotton_Fibers/2.ktx2"],
    colors: [0.96, 0.94, 0.92],
  },
  {
    slug: "oe-yarns-recycled",
    title: "OE Yarns Recycled",
    folderName: "6_OE_Yarns_Recycled",
    ktx2: ["/fields/6_OE_Yarns_Recycled/1.ktx2", "/fields/6_OE_Yarns_Recycled/2.ktx2"],
    colors: [0.96, 0.94, 0.92],
  },
  {
    slug: "hometextile",
    title: "Hometextile",
    folderName: "7_Hometextile",
    ktx2: ["/fields/7_Hometextile/1.ktx2", "/fields/7_Hometextile/2.ktx2"],
    colors: [0.96, 0.94, 0.92],
  },
  {
    slug: "fabrics-for-garments",
    title: "Fabrics for Garments",
    folderName: "8_Fabrics_for_Garments",
    ktx2: ["/fields/8_Fabrics_for_Garments/1.ktx2", "/fields/8_Fabrics_for_Garments/2.ktx2"],
    colors: [0.96, 0.94, 0.92],
  },
  {
    slug: "wedding-dresses",
    title: "Wedding Dresses",
    folderName: "9_Wedding_Dresses",
    ktx2: ["/fields/9_Wedding_Dresses/1.ktx2", "/fields/9_Wedding_Dresses/2.ktx2"],
    colors: [0.96, 0.94, 0.92],
  },
  {
    slug: "recycling-machinery",
    title: "Recycling Machinery",
    folderName: "10_Recycling_Machinery",
    ktx2: ["/fields/10_Recycling_Machinery/1.ktx2", "/fields/10_Recycling_Machinery/2.ktx2"],
    colors: [0.96, 0.94, 0.92],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug);
}

// Build globalData.projectImages array for themebee9.js WebGL engine
export function buildProjectImages(): string[][] {
  return CATEGORIES.map(c => c.ktx2);
}

// Build globalData.projectColors array for WebGL engine
export function buildProjectColors(): number[][] {
  return CATEGORIES.map(c => c.colors);
}
