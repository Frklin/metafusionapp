<script lang="ts">
    import { RARITY_COLORS, CATEGORY_ICONS } from '$lib/constants.js';
    import { rarityConverter, categoryConverter } from '$lib/index.js';
    // import CardTheme from '$lib/assets/card_background_theme.png';
    import CardTheme from '$lib/assets/cardbgsmall.png';
    import StyleIcon from '$lib/assets/categories/style.svg';
    import ColorIcon from '$lib/assets/categories/colors.svg';
    import CharacterIcon from '$lib/assets/categories/character.svg';
    import HatsIcon from '$lib/assets/categories/hats.svg';
    import GlassesIcon from '$lib/assets/categories/glasses.svg';
    import HandoffIcon from '$lib/assets/categories/handoff.svg';
    export let item: any;

    let category = categoryConverter(item.category);
    let categoryIcon =
        category === 'style' ? StyleIcon :
        category === 'colors' ? ColorIcon :
        category === 'character' ? CharacterIcon :
        category === 'hats' ? HatsIcon :
        category === 'glasses' ? GlassesIcon :
        category === 'handoff' ? HandoffIcon :
        null;
</script>


<!-- 
<div class="flex rounded-md h-64 {RARITY_COLORS[rarityConverter(item.rarity)]} group-hover:scale-105 transition-transform duration-300">
    <img src={CardTheme} class={`p-2 absolute w-full h-full rounded-md`} alt="card theme" />
    <div class="flex flex-col z-20 items-center justify-between w-full py-10">
        <div class="h-32 w-32 flex items-center justify-center">
            <img src={categoryIcon} alt="category icon" class="w-16 h-16 " />
        </div>
        <h2 class="inline-block text-xl text-transparent bg-clip-text {RARITY_COLORS[rarityConverter(item.rarity)]} ">
            {item.name}
        </h2>
    </div>

</div> -->

<div class="flex flex-col  justify-between w-full h-64 rounded-md group-hover:scale-105 transition-transform duration-300 {RARITY_COLORS[rarityConverter(item.rarity)]}">
    <img src={CardTheme} class="absolute w-full h-full rounded-md p-2" alt="card theme" />
    <div class=" relative flex flex-col items-center justify-between h-full w-full p-4 py-[20%]">
      <img src={categoryIcon} alt="category icon" class="w-1/4 max-w-xs" />
      <h2 class="inline-block text-xl text-transparent bg-clip-text  {RARITY_COLORS[rarityConverter(item.rarity)]} ">
        {item.name}
    </h2>
    </div>
  </div>


