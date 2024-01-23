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
</script>

<div class="relative w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-300  {blocked ? 'opacity-30' : ''} {RARITY_COLORS[rarityConverter(item.rarity)]}">
    <img src={CardTheme} class={`w-full h-full rounded-xl p-2`} alt="card theme" />

    <div class="absolute inset-0 flex flex-col justify-between items-center">
        <!-- Top Content -->
        <div class="mt-[10%]">
            <div class="h-32 w-32 flex items-center justify-center">
                <img src={categoryIcon} alt="category icon" class="w-16 h-16" />
            </div>
        </div>
        <!-- Middle Content -->
        <div class="mb-[15%]">
            <div class="h-12 w-42 flex items-center justify-center">
                <span class="inline-block text-lg text-transparent bg-clip-text {RARITY_COLORS[rarityConverter(item.rarity)]} ">{item.name}</span>
            </div>
        </div>
        <!-- Bottom Content -->
        <div class="mb-[15%]">
            <div class="flex w-full items-center text-center justify-center">
                <div class="rounded-full w-10 h-10 flex items-center justify-center {RARITY_COLORS[rarityConverter(item.rarity)]} {rarityConverter(item.rarity) === 'common' ? 'bg-white/60' : ''}">
                    <div class="text-center self-center text-card_background w-full h-full">
                        <div class="flex items-center justify-center h-full">{item.category}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</div>

