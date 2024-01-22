<script lang="ts">
    import { RARITY_COLORS, CATEGORY_ICONS } from '$lib/constants.js';
    import { rarityConverter, categoryConverter } from '$lib/index.js';
    import CardTheme from '$lib/assets/card_background_theme.png';
    
    export let item: any;
</script>



<div class="flex rounded-md h-72 {RARITY_COLORS[rarityConverter(item.rarity)]}">
    <img src={CardTheme} class={`p-2 absolute w-full h-full rounded-md object-cover`} alt="card theme" />
    
    <!-- CONTENT -->
    <div class="flex flex-col z-20 items-center justify-between w-full py-10">
        <!-- <img src="{FilterButton}" alt="filter" class="text-xl ${RARITY_COLORS[rarityConverter(item.rarity)]}"> -->
        <h1 class="inline-block text-transparent bg-clip-text {RARITY_COLORS[rarityConverter(item.rarity)]} ">
            {categoryConverter(item.category)}
        </h1>
        <h2 class="inline-block text-xl text-transparent bg-clip-text {RARITY_COLORS[rarityConverter(item.rarity)]} ">
            {item.name}
        </h2>
        <div class="flex rounded-[100%] {RARITY_COLORS[rarityConverter(item.rarity)]} w-10 h-10 items-center justify-center">
            {item.category+1}
        </div>
    </div>

</div>


