// import ethers  from 'hardhat';  

export const CATEGORIES = ['character', 'colors', 'glasses', 'hats', 'style', 'handoff'];

export const NFTTypes = {'Packs':0, 'Prompts':1, 'Cards':2};

export let sortOptions = [
    { name: "Price Low to High", sortFunction: (a, b) => a.price - b.price },
    { name: "Price High to Low", sortFunction: (a, b) => b.price - a.price },
    { name: "Latest First", sortFunction: (a, b) => b.id - a.id }, // Assuming id is higher for newer items
    { name: "Most Rare", sortFunction: (a, b) => b.id - a.id },
];

export const views =  ['list', 'grid', 'table'];

export const RARITIES = ["common", "bronze", "silver", "gold", "mythic"];

export const RARITY_COLORS = {
    'common': 'border-none text-white/60',
    'bronze': 'bg-bronzeBorder',
    'silver': 'bg-silverBorder',
    'gold': 'bg-goldBorder',
    'mythic': 'bg-mythicBorder',
  };
  
export const CATEGORY_ICONS = {
    handoff: '$lib/assets/categories/colors.svg',
    'character': '$lib/assets/categories/colors.svg',
    colors: '$lib/assets/categories/colors.svg',
    glasses: '$lib/assets/categories/colors.svg',
    hats: '$lib/assets/categories/colors.svg',
    style: '$lib/assets/categories/style.svg'
};

