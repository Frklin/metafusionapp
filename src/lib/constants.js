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
    bronze: 'border-bronze text-bronze',
    silver: 'border-silver text-silver',
    gold: 'border-gold text-gold',
    mythic: 'border-mythic text-mythic',
  };
  
export const CATEGORY_ICONS = {
    handoff: '$lib/assets/icons/wallet.svg', 
    character: '$lib/assets/icons/wallet.svg',
    colors: '$lib/assets/icons/wallet.svg',
    glasses: '$lib/assets/icons/wallet.svg',
    hats: '$lib/assets/icons/wallet.svg',
    style: '$lib/assets/icons/wallet.svg',
};


// function calculateRarity(a: any) {
//     return a.prompts.reduce((total, prompt) => total + prompt.rarity, 0);
// }