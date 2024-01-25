<script lang="ts">
    import { RARITY_COLORS, CATEGORY_ICONS } from '$lib/constants.js';
    import { rarityConverter, categoryConverter } from '$lib/index.js';
    import CardTheme from '$lib/assets/cardbg.png';
    import StyleIcon from '$lib/assets/categories/style.svg';
    import ColorIcon from '$lib/assets/categories/colors.svg';
    import CharacterIcon from '$lib/assets/categories/character.svg';
    import HatsIcon from '$lib/assets/categories/hats.svg';
    import GlassesIcon from '$lib/assets/categories/glasses.svg';
    import HandoffIcon from '$lib/assets/categories/handoff.svg';
    
    export let item: any;
    export let blocked: boolean=false;

    let category = categoryConverter(item.category);
    let categoryIcon =
        category === 'style' ? StyleIcon :
        category === 'colors' ? ColorIcon :
        category === 'character' ? CharacterIcon :
        category === 'hats' ? HatsIcon :
        category === 'glasses' ? GlassesIcon :
        category === 'handoff' ? HandoffIcon :
        null;

    function removeNewField() {
      item.isNew = false
    }
</script>

<div on:mouseover={removeNewField} class="relative w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-300 {blocked ? 'opacity-30' : ''} {item.isNew ? 'bg-white' : RARITY_COLORS[rarityConverter(item.rarity)]}">
    <img src={CardTheme} class={`w-full h-full rounded-xl xl-p-4 lg:p-2 sm:p-1`} alt="card theme" />
  
    <div class="absolute inset-0 flex flex-col justify-between items-center p-4 py-10">
      <!-- Top Content -->
      <div class="flex flex-col items-center">
        <img src={categoryIcon} alt="category icon" class="w-1/4 max-w-xs" />
    </div>
      <!-- Middle Content -->
      <div>
        <span class="text-center text-lg text-transparent bg-clip-text {RARITY_COLORS[rarityConverter(item.rarity)]}">{item.name}</span>
      </div>
      <!-- Bottom Content -->
      <div class=" items-center justify-center rounded-full hidden xl:flex lg:w-10 lg:h-10 sm:w-6 sm:h-6 {RARITY_COLORS[rarityConverter(item.rarity)]} {rarityConverter(item.rarity) === 'common' ? 'bg-white/60' : ''}">
        <div class={`rounded-full p-1 sm:p-2 md:p-3 lg:p-4 flex items-center text-card_background  justify-center`}>
            <span class="text-xs sm:text-sm">{item.category+1}</span>
        </div>
      </div>
    </div>
</div>



