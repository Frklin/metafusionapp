<script lang="ts">
     //@ts-nocheck
    import { createImage } from '$lib/metafusion_interactions';
    import { get } from 'svelte/store';
    import { user_pk } from '$lib';

    export let isForgable: boolean;
    export let selectedPrompts: any;

    function forgeItem() {
        console.log("forging item");
        var prompts_ids = Object.values(get(selectedPrompts)).map(prompt => prompt === null ? 0 : parseInt(prompt.id, 16));
        console.log(prompts_ids);
        createImage(prompts_ids).then(async (res) =>{
            try {
                const res_2 = await fetch('http://localhost:3000/user/'+user_pk);
                const data = await res_2.json();
                const imageId = data.cards[data.cards.length - 1].id;
                location.replace('/collection/cards/'+imageId);
            } catch (err) {
                console.log(err);
            }
            
        });
    }


</script>



<div class="flex flex-col justify-center items-center w-full h-full p-8">
    <button disabled={!isForgable}
        on:click={() => forgeItem()} 
        class="flex flex-row justify-center items-center w-56 h-12 {isForgable ? 'bg-orange-500/90 hover:scale-105 duration-200' : 'bg-white/20'} rounded-2xl enabled:transition-colors duration-300 disabled:transition-colors" >
        <h4 class="text-lg font-semibold {isForgable ? 'text-primary' : 'text-secondary'}">Forge</h4>
    </button>
</div>