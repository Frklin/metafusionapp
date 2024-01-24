// import ethers  from 'hardhat';  

export const CATEGORIES = ['character', 'hats', 'handoff', 'colors', 'glasses', 'style'];

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
    character: '$lib/assets/categories/colors.svg',
    colors: '$lib/assets/categories/colors.svg',
    glasses: '$lib/assets/categories/colors.svg',
    hats: '$lib/assets/categories/colors.svg',
    style: '$lib/assets/categories/style.svg'
};

export const mintingCost = 0.01;


//take some random images from the internet for the profile images
export const profileImages = [
    'https://avatars.githubusercontent.com/u/59870781?v=4',
    'https://avatars.githubusercontent.com/u/143937?v=4',
    'https://avatars.githubusercontent.com/u/212628?v=4',
    'https://avatars.githubusercontent.com/u/62235503?v=4'
];

