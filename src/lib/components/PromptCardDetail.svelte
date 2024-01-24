<script lang="ts">
    import { RARITY_COLORS, CATEGORY_ICONS } from '$lib/constants.js';
    import { rarityConverter, categoryConverter } from '$lib/index.js';
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



<div class="relative w-full h-full rounded-xl {RARITY_COLORS[rarityConverter(item.rarity)]} ">
    <img src={CardTheme} class={`w-full h-full rounded-md p-4`} alt="card theme" />

    <div class="absolute inset-0 flex flex-col justify-between items-center">
        <!-- Top Content -->
        <div class="mt-[20%]">
            <div class="h-32 w-32 flex items-center justify-center">
                <img src={categoryIcon} alt="category icon" class="w-32 h-32 " />
            </div>
        </div>
        <!-- Bottom Content -->
        <div class="mb-[30%]">
            <div class="h-12 w-42 flex items-center justify-center">
                <!-- Place your text here -->
                <span class="inline-block text-[64px] text-transparent bg-clip-text {RARITY_COLORS[rarityConverter(item.rarity)]} ">{item.name}</span>
            </div>
        </div>
    </div>


</div>