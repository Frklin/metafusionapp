<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import SortButton from '$lib/assets/icons/sort.png';
    import InfoButton from '$lib/assets/icons/info.png';
    import {forgePacket} from '$lib/metafusion_interactions'
    import { mintingCost } from "$lib/constants";
    import Packet from '$lib/assets/Packs/packet.jpg'
    import Style from '$lib/assets/categories/style.svg';

    const dispatch = createEventDispatcher();
    export let open: boolean=true;
   

    let selectedCurrency = 'ETH';
    let price = 2.0;
    let numberOfPackets = 1;
    let maxNumberOfPackets = 10;
    let numberOfPacketsToggled = false;
    let collectionId = 1;
    let remainingPackets = 0;


    const close = () => {
        open = false;
        dispatch("close");
    };

    function toggleDropdown() {
        numberOfPacketsToggled = !numberOfPacketsToggled;
    }

    function computePrice() {
        return numberOfPackets * mintingCost;
    }

    function convertPrice(currency: string, amount: number) {
        if (currency === 'ETH') {
            return (amount * 2750).toFixed(2);
        } else {
            return (amount / 2750);
        }
    }

    function updateNumberOfPackets(number: number) {
        numberOfPackets = number;
        numberOfPacketsToggled = false;
        price = computePrice();
    }

    async function loopMint() {
        for (let i = 0; i < numberOfPackets; i++){
            await forgePacket(collectionId)
        }
    }

    function mintPacket() {
        loopMint().then(() => {
            location.reload();
            close();
        })
    }

    async function getRemainingPackets() {
        let response = await fetch('http://metafusion.homeworkheroes.it:3000/packets/' + collectionId + '/remaining');
        let data = await response.json();
        console.log(data);
        remainingPackets = data.remaining;
    }

    onMount(async () => {
        await getRemainingPackets();
    })


    $: price = computePrice();
    $: convertedPrice = convertPrice(selectedCurrency, price);
    // $: disableButton = price === '' || price === '0' || price === '0.00';
</script>
  







{#if open}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="fixed inset-0 bg-background bg-opacity-80 flex justify-center items-center" on:click={close} style="z-index: 100000;">
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="bg-card_background rounded-lg shadow-xl p-8 relative" on:click|stopPropagation>
            <h1 class="text-2xl text-white text-center font-bold mb-6">Mint Packet</h1>
            
            <!-- CONTENT -->
            <div class="flex flex-col gap-4">
                <div class="flex flex-row gap-4 w-[500px] h-full">
                    <!-- PACKET IMG -->
                    <div class="w-full rounded-lg bg-white/10">
                        <img src={Packet} alt="packet" class="w-full h-full rounded-lg object-cover">
                    </div>

                    <!-- INPUT FORM -->
                    <div class="w-full flex flex-col gap-4 justify-between">
                        <!-- QUANTITY -->
                        <div class="w-full flex flex-col gap-2">
                            <label for="quantity" class="block text-sm font-bold text-white">Quantity</label>
                            <button type="button" class="flex h-full w-full items-center justify-between py-2 px-4 hover:bg-background/10 hover:border-white/50 duration-200 min-w-[100px] cursor-pointer bg-background/20 rounded-lg border border-white/20" on:click|stopPropagation={toggleDropdown}>
                                <span class="text-white w-full font-semibold text-center">{numberOfPackets}</span>
                                <img src={SortButton} class:rotate-180={numberOfPacketsToggled} class="w-4 h-4 transition-transform duration-300" alt="sort" />
                            </button>
                            <span class="text-secondary text-xs">Each packet cost is 0.01 ETH</span>

                        </div>
                        {#if numberOfPacketsToggled}
                        <div class="absolute z-10 mt-20 w-[42.6%] rounded-md bg-card_background shadow-lg">
                            <ul class="py-1">
                                {#each {length: maxNumberOfPackets} as _, i}
                                    <li>
                                        <button on:click={() => updateNumberOfPackets(i+1)} type="button" class="block items-center w-full hover:bg-white/20 text-center justify-center px-4 py-2 text-sm text-white rounded-lg" >
                                            {i+1}
                                        </button>
                                    </li>
                                {/each}
                            </ul>
                        </div>
                    {/if}

                        <div class="flex flex-row w-full justify-between gap-6">
                            <div class="flex flex-col items-center justify-between gap-4 rounded-lg border border-white/20 w-full p-4">
                                <span class="text-secondary font-semibold text-sm">Remaining</span>
                                <span class="text-white font-semibold text-xl">{remainingPackets}</span>
                            </div>
                            <div class="flex flex-col items-center justify-between gap-4 rounded-lg border border-white/20 w-full p-4">
                                <span class="text-secondary font-semibold text-sm">Edition</span>
                                <span class="text-white font-semibold text-xl">1°</span>
                            </div>
    
                        </div>
                    </div>
                    
                    
                    
                </div>
                <!-- DESCRIPTION -->
            <!-- <div class="w-full flex flex-col gap-2">
                    <div class="flex flex-row gap-1">
                        <span class="text-white text-sm font-bold">Description</span>
                        <span class="text-secondary text-sm">(optional)</span>
                    </div>
                    <textarea class="w-full h-24 bg-background/20 border border-white/20 rounded-lg text-secondary text-sm p-2" placeholder="Enter a description for your item"></textarea>
                </div> -->

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

                <div class="flex flex-row justify-between">
                    <span class="text-white text-sm font-bold">Total</span>
                    <div class="flex flex-col gap-1 justify-end items-end">
                        <span class="text-primary text-sm ">{price} ETH</span>
                        <span class="text-secondary text-xs ">${convertedPrice}</span>

                    </div>
                </div>

                <div class="flex flex-row w-full gap-4 justify-between mt-6">
                    <button class="w-1/2 h-12 bg-white/10 rounded-lg hover:bg-white/20 duration-200 text-white/80 font-semibold" on:click={close}>Cancel</button>
                    <button on:click={mintPacket} class="bg-green-500 flex flex-row gap-2 hover:bg-green-400 duration-200 w-1/2 items-center justify-center h-12 rounded-lg text-white font-semibold">
                        <img src="{Style}" alt="mint icon" class="w-6 h-6">
                        <span class="text-white font-semibold">Mint Packet</span>
                    </button>
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