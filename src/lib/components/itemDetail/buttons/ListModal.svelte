<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import SortButton from '$lib/assets/icons/sort.png';
    import InfoButton from '$lib/assets/icons/info.png';

    const dispatch = createEventDispatcher();
    export let open: boolean=true;
    export let item: any;

    let showPriceDropdown = false;
    let selectedCurrency = 'ETH';
    let price = '';

    const close = () => {
        open = false;
        dispatch("close");
    };

    function toggleDropdown() {
        showPriceDropdown = !showPriceDropdown;
    }

    function selectCurrency(currency) {
        selectedCurrency = currency;
        showPriceDropdown = false;
    }

    function convertPrice(currency, amount) {
        if (currency === 'ETH') {
            return amount * 3000;
        } else {
            return amount / 3000;
        }
    }
</script>
  
{#if open && false}
    <div class="fixed top-0 left-0 w-full h-full bg-background bg-opacity-80 z-50" on:click={close}>
        <div class="mx-auto my-52 max-w-sm bg-card_background rounded-lg shadow-zl p-10" on:click|stopPropagation>
            <h1 class="text-xl text-white font-semibold">List Item #{item.slice(-4)} for Sale</h1>
            
            <!-- CONTENT -->
            <div class="flex flex-col justify-between items-start gap-4">
                <!-- PRICE -->
                <div class="w-full flex flex-col gap-2">
                    <span class="text-white text-sm font-bold">Price</span>
                    <div class="flex flex-row h-10 gap-2 items-stretch">
                        <div class="flex flex-row gap-1 h-full bg-background/20 w-20 cursor-pointer border border-white/20 rounded-lg text-centerfont-semibold" on:click|stopPropagation={toggleDropdown}>
                            <span class="text-center text-white/80 ">{selectedCurrency}</span>
                            <img src={SortButton} class:rotate-180={showPriceDropdown} class="w-5 h-5 transition-transform duration-300" alt="sort" />
                            <!-- SORT OPTIONS DROPDOWN -->
                            {#if showPriceDropdown}
                            <div class="absolute z-10 w-full bg-card_background mt-2 rounded-xl shadow-lg sort-dropdown">
                            <ul class="py-1">
                                {#each ["ETH","USTD"] as option}
                                <li>
                                    <a href="#" class="block items-center justify-end rounded-xl border border-card_background py-3 pr-2 cursor-pointer hover:bg-white/20">
                                    <span class=" text-primary text-opacity-90 text-base font-semibold leading-6 pr-8 pl-4 ">{option}</span>
                                    </a>
                                </li>
                                {/each}
                            </ul>
                            </div>
                            {/if}
                        </div>
                        <input type="number" class="h-full w-full bg-background/20 border border-white/20 rounded-lg text-center text-white/80 font-semibold" placeholder="0.00" />
                    </div>
                </div>

                <!-- DESCRIPTION -->
                <div class="w-full flex flex-col gap-2">
                    <div class="flex flex-row gap-1">
                        <span class="text-white text-sm font-bold">Description</span>
                        <span class="text-secondary text-sm">(optional)</span>
                    </div>
                    <textarea class="w-full h-20 bg-background/20 border border-white/20 rounded-lg text-secondary text-sm p-2" placeholder="Enter a description for your item"></textarea>
                </div>
            </div>

            <div class="w-full h-[1px] mt-6 mb-2  bg-white/20"></div>
            
            <!-- FEES PAYMENT -->
            <div class="flex flex-col">
                <div class="flex flex-row justify-between">
                    <span class="text-white text-sm font-bold">Fees</span>
                    <img src={InfoButton} class="w-4 h-4" alt="info" />
                </div>
                <div class="flex flex-row justify-between">
                    <span class="text-secondary text-xs">Service Fee</span>
                    <span class="text-secondary text-xs">2.5%</span>
                </div>
                <div class="flex flex-row justify-between">
                    <span class="text-secondary text-xs">Customer Fee</span>
                    <span class="text-secondary text-xs">0%</span>
                </div>
            </div>

            <div class="flex flex-row w-full gap-4 justify-between mt-6">
                <button class="w-1/2 h-10 bg-white/20 rounded-lg text-white/80 font-semibold" on:click={close}>Cancel</button>
                <button class="w-1/2 h-10 bg-blue-500 rounded-lg text-white font-semibold">List</button>
            </div>  


        </div>  
    </div>
{/if}







{#if open}
    <div class="fixed inset-0 bg-background bg-opacity-80 z-50 flex justify-center items-center" on:click={close}>
        <div class="bg-card_background rounded-lg shadow-xl p-8 relative" on:click|stopPropagation>
            <h1 class="text-xl text-white font-semibold mb-6">List Item #{item.slice(-4)} for Sale</h1>
            
            <!-- CONTENT -->
            <div class="flex flex-col gap-4">
                <!-- PRICE -->
                <div class="w-full">
                    <label for="price" class="block text-sm font-bold text-white">Price</label>
                    <div class="relative mt-1 flex flex-row gap-2">
                        <button type="button" class="flex h-full justify-between p-2  hover:bg-background/10 hover:border-white/50 duration-200 w-20 cursor-pointer bg-background/20 rounded-lg border border-white/20" on:click|stopPropagation={toggleDropdown}>
                            <span class="text-white font-semibold text-center">{selectedCurrency}</span>
                            <img src={SortButton} class:rotate-180={showPriceDropdown} class="w-5 h-5 transition-transform duration-300" alt="sort" />
                        </button>
                        <input type="number" id="price" class="block w-full bg-background/10 border border-white/20 pl-4 pr-12 sm:text-sm rounded-md " placeholder="0.00">
                        <!-- <button type="button" class="flex flex-row gap-1 h-full bg-background/20 w-20 cursor-pointer border border-white/20 rounded-lg text-centerfont-semibold" on:click|stopPropagation={toggleDropdown}>
                            <span class="text-white text-center">{selectedCurrency}</span>
                            <svg fill="none" stroke="currentColor" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <input type="text" id="price" class="block w-full pl-16 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="0.00">
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <span class="text-gray-500">{selectedCurrency === 'ETH' ? convertPrice('USDT', price) : convertPrice('ETH', price)} {selectedCurrency === 'ETH' ? 'USDT' : 'ETH'}</span>
                        </div> -->
                        {#if showPriceDropdown}
                            <div class="absolute z-10 mt-1 w-1/3 rounded-md bg-card_background shadow-lg">
                                <ul class="py-1">
                                    {#each ['ETH', 'USDT'] as option}
                                        <li>
                                            <button type="button" class="block w-full text-left px-4 py-2 text-sm text-white rounded-lg hover:bg-white/20" on:click={() => selectCurrency(option)}>
                                                {option}
                                            </button>
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                        {/if}
                    </div>
                </div>

                <!-- DESCRIPTION -->
                <div class="w-full flex flex-col gap-2">
                    <div class="flex flex-row gap-1">
                        <span class="text-white text-sm font-bold">Description</span>
                        <span class="text-secondary text-sm">(optional)</span>
                    </div>
                    <textarea class="w-full h-20 bg-background/20 border border-white/20 rounded-lg text-secondary text-sm p-2" placeholder="Enter a description for your item"></textarea>
                </div>

                <!-- FEES PAYMENT -->
                <div class="flex flex-col">
                    <div class="flex flex-row justify-between">
                        <span class="text-white text-sm font-bold">Fees</span>
                        <img src={InfoButton} class="w-4 h-4" alt="info" />
                    </div>
                    <div class="flex flex-row justify-between">
                        <span class="text-secondary text-xs">Service Fee</span>
                        <span class="text-secondary text-xs">2.5%</span>
                    </div>
                    <div class="flex flex-row justify-between">
                        <span class="text-secondary text-xs">Customer Fee</span>
                        <span class="text-secondary text-xs">0%</span>
                    </div>
                </div>


                <div class="flex flex-row w-full gap-4 justify-between mt-6">
                    <button class="w-1/2 h-10 bg-white/20 rounded-lg text-white/80 font-semibold" on:click={close}>Cancel</button>
                    <button class="w-1/2 h-10 bg-blue-500 rounded-lg text-white font-semibold">List</button>
                </div>  
            </div>
        </div>
    </div>
{/if}

<style>
    /* Hide the input number arrows */
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type='number'] {
        -moz-appearance: textfield;
    }
</style>