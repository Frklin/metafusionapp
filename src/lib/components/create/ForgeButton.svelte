<script lang="ts">
     //@ts-nocheck
    import { createImage } from '$lib/metafusion_interactions';

    export let isForgable: boolean;
    export let selectedPrompts: any;

    function forgeItem() {
        console.log("forging item");
        console.log(selectedPrompts)
        var prompts_ids = Object.values(selectedPrompts).map(prompt => prompt.id);
        console.log(prompts_ids);
        createImage(prompts_ids);
    }


</script>



<div class="flex flex-col justify-center items-center w-full h-full p-8">
    <button disabled={!isForgable}
        on:click={() => forgeItem()} 
        class="flex flex-row justify-center items-center w-56 h-12 {isForgable ? 'bg-orange-500/90 hover:scale-105 duration-200' : 'bg-white/20'} rounded-2xl enabled:transition-colors duration-300 disabled:transition-colors" >
        <h4 class="text-lg font-semibold {isForgable ? 'text-primary' : 'text-secondary'}">Forge</h4>
    </button>
</div>