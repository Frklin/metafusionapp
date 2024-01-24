<script lang="ts">
    
    export let priceHistory: any = [];


</script>



<div class="flex flex-col w-full border bg-card_background border-white/20 rounded-xl h-[180px]">
    <div class="flex flex-col h-full items-start divide-y divide-white/20 pt-2 gap-2">
        <h3 class="font-semibold text-white pl-4">Price History</h3>
        <div class="flex flex-row justify-between w-full h-full rounded-b-xl  ">
            {#if priceHistory.length == 0}
            <div class="flex flex-col items-center w-full justify-center h-full">
                <h1 class="text-3xl font-semibold text-secondary">No Price History</h1>
            </div>
            {:else}

            {/if}
        </div>
    </div>
</div>
