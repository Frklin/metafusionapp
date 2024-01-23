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
    import { get } from 'svelte/store';

    
    export let item: any;
    export let blocked: boolean=false;
    export let freezed: boolean=false;
    export let selectedPrompts: any;
    export let selectedCategories: any;
    export let categoryFocused: any;
    export let mainRef: HTMLDivElement;


    let category = categoryConverter(item.category);
    let categoryIcon =
        category === 'style' ? StyleIcon :
        category === 'colors' ? ColorIcon :
        category === 'character' ? CharacterIcon :
        category === 'hats' ? HatsIcon :
        category === 'glasses' ? GlassesIcon :
        category === 'handoff' ? HandoffIcon :
        null;

    let category_colors = {
        character: '#4CAF50',
        colors: '#FFC107',
        glasses: '#2196F3',
        hats: '#9C27B0',
        style: '#FF5722',
        handoff: '#E91E63',
    }

    function selectPrompt(prompt:any) {
        console.log("Setting for category", categoryConverter(prompt.category));
        console.log("selectedPrompts", selectedPrompts);
        let currentSelectedPrompts: any = get(selectedPrompts);
        currentSelectedPrompts[categoryConverter(prompt.category)] = currentSelectedPrompts[categoryConverter(prompt.category)]?.id === prompt.id ? null : prompt;
        selectedPrompts.set(currentSelectedPrompts);
        if (categoryFocused) {
            categoryFocused = false;
            selectedCategories.clear();
            selectedCategories = new Set(selectedCategories);            
            scrollTo(mainRef)
            return;
        }
        // scroll if all the prompts are selected
        if (Object.values(currentSelectedPrompts).every(prompt => prompt != null)) {
            selectedCategories.clear();
            selectedCategories = new Set(selectedCategories);
            scrollTo(mainRef);
        }       

        function scrollTo(target: HTMLDivElement) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start'});
        }
 
    }
    
</script>

<button disabled={item.isListed} on:click={()=>selectPrompt(item)}>
    <div class="relative w-full h-full rounded-xl  {(blocked || freezed) ? 'opacity-30' : 'group-hover:scale-105 transition-transform duration-300 '} {RARITY_COLORS[rarityConverter(item.rarity)]}">
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
            
            {#if $selectedPrompts[categoryConverter(item.category)]?.id === item.id}
                <div class="absolute w-full h-full top-0 bg-white/50 border-4 rounded-md" style="border-color: {category_colors[categoryConverter(item.category)]};"></div>
            {/if}
        </div>
    </div>
</button>

