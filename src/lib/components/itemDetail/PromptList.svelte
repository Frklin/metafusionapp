<script lang="ts">
    //@ts-nocheck
    import { CATEGORIES } from '$lib/constants.js';
    import { categoryConverter } from '$lib/index.js';
	  import PromptCardFull from '../PromptCardFull.svelte';
    import PromptCard from '../PromptCard.svelte';
	import PromptCardDetail from '../PromptCardDetail.svelte';

    export let prompts: any;

    function getPrompt(category) {
      let prompt = prompts.find(p => categoryConverter(p.category) === category);
      if (prompt) {
        return prompt;
      }
      else return null;
      // return {
      //     promptid: `${prompt.promptid}`, 
      //     name: `${prompt.name}`,
      //     rarity: `${prompt.rarity*100}%`,
      //     floorPrice: `FLOOR: 2.03 ETH`,
      //     image: `${prompt.img_path}`,
      // };
      // }
      // return {
      // rarity: "None",
      // floorPrice: "FLOOR: 0.00 ETH",
      // image: null,
      // };
  }
</script>



<div class="flex flex-col w-full border border-white/20 rounded-xl">
    <div class="flex flex-col h-full items-start divide-y divide-white/20 pt-2 gap-2 rounded-xl bg-card_background">
        <h3 class="font-semibold text-white pl-4">Prompts</h3>

        <div class="flex flex-row justify-between w-full h-full l p-2 bg-background rounded-b-xl">
            <div class="grid grid-cols-6 w-full gap-3 justify-between">
              {#each CATEGORIES as category}
                <div class= "gap-2 flex flex-col items-center  border-white/20 h-full p-6">
                  <span class="text-xs text-secondary font-semibold">{category.toUpperCase()}</span>
                  <div class="w-full h-[320px] rounded-xl bg-card_background ">
                    {#if getPrompt(category)}
                      <PromptCardFull item={getPrompt(category)} selectedPrompts={{}}/>
                    {/if}
                  </div>
                  <div class="flex flex-col gap-1 w-full items-center rounded-xl  p-2">
                    <span class="text-base font-bold text-primary">{getPrompt(category).rarity*100}%</span>
                    <span class="text-xs font-normal text-secondary">FLOOR: {getPrompt(category) ? '2.03 ETH' : '0.00 ETH'} </span>
                  </div>
                </div>
              {/each}
            </div>
        </div>
          
    </div>
</div>