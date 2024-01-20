<script lang='ts'>
    import { NFTTypes } from '$lib/constants';

    export let selectedNFTType: string;

</script>

<div class="flex w-full h-24  justify-center ">
    <div class="bg-background h-full rounded-t-lg">
        <div class="flex flex-row px-10 py-6 gap-4 h-full">
            {#each Object.keys(NFTTypes) as type}
            <!-- on:click={() => selectNFTtype(type)} -->
            <button 
                class:bg-white={selectedNFTType === type}
                class:bg-opacity-15={selectedNFTType === type}
                class:bg-opacity-0={selectedNFTType !== type}
                class="rounded-lg p-2 transition duration-500 ">
                <span 
                class:opacity-50={selectedNFTType !== type}
                class="text-primary h-full text-base font-semibold px-6  hover:opacity-100 duration-100">{type}</span>
            </button>
        {/each}
        </div>
    </div>
</div>