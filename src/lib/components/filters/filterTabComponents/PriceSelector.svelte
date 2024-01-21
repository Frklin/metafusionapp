<script lang="ts">
   //@ts-nocheck
    export let minPrice: number;
    export let maxPrice: number;


    import SortButton from '$lib/assets/icons/sort.png';

    let showPriceFilter = true;


    function togglePriceFilter() {
        showPriceFilter = !showPriceFilter;
    }

    function updatePriceRange(minPrice:number, maxPrice:number) {
        console.log(minPrice, maxPrice);
    }


</script>



<div class="flex flex-col w-full ">
    <div class="flex items-center justify-start py-3 pr-2 pl-4 w-full cursor-pointer duration-200 rounded-lg hover:bg-white/10" on:click|stopPropagation={togglePriceFilter}>
        <span class="text-primary text-base font-semibold leading-6 text-left flex-grow">Price</span>
        <img src={SortButton} class:rotate-180={showPriceFilter} class="w-5 h-5 transition-transform duration-300" alt="sort" />
    </div>
    
    {#if showPriceFilter}
    <div class="flex flex-col w-full px-4 gap-4 pb-4">
        <div class="relative mb-6 px-2">
            <label for="labels-range-input" class="sr-only">Labels range</label>
            <input id="labels-range-input" type="range" value="500" min={0} max="1000" class="w-full h-2 bg-gray-200 rounded-lg appearance- cursor-pointer dark:bg-gray-700">
            <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Min ($100)</span>
            <!-- <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">$1000</span> -->
            <span class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">Max ($1500)</span>
        </div>
        <div class="flex flex-row w-full items-center justify-center self-stretch ">
            <div class="flex flex-col gap-1 items-center justify-center w-full h-20  rounded-b-lg">
                <div class="flex h-full w-16 justify-center items-center rounded-lg border-2  border-white/20">
                    <input type="text"
                    placeholder="0"
                    on:input="{e => updatePriceRange(e.target.value, maxPrice)}"
                    class="w-full bg-transparent text-secondary text-base text-center font-normal outline-none"> 
                </div>
                <span class="text-secondary text-xs font-semibold leading-6">Min</span>
            </div>

            <span class="text-primary text-base font-semibold mb-6">to</span>
            
            <div class="flex flex-col gap-1 items-center justify-center w-full h-20 rounded-b-lg">
                <div class="flex h-full w-16 justify-center items-center rounded-lg border-2 border-white/20">
                    <input type="text"
                    placeholder="1000"
                    on:input="{e => updatePriceRange(minPrice, e.target.value)}" 
                    class="w-full bg-transparent text-secondary text-base text-center font-normal outline-none"> 
                </div>
                <span class="text-secondary text-xs font-semibold leading-6">Max</span>
            </div>
        </div>
    </div>
    {/if}
</div>
