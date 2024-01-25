<script>
    // @ts-nocheck

	import Cover from '$lib/components/Cover.svelte';
    import Profile from '$lib/components/Profile.svelte';
    import GridView from '$lib/components/marketplace/GridView.svelte';
    import UtilityBar from '$lib/components/filters/UtilityBar.svelte';
    import FilterTab from '$lib/components/filters/FilterTab.svelte';
    import Packet from '$lib/assets/Packs/packet.jpg'
    import TypeSelector from '$lib/components/marketplace/TypeSelector.svelte';
    import MintButton from '$lib/components/MintButton.svelte';    
    import { sortOptions, NFTTypes, profileImages } from '$lib/constants.js';
    import { user_pk, categoryFromId } from '$lib';
    import { onMount } from 'svelte';
    import { MetaMaskStore, categoryConverter, rarityConverter } from '$lib';
	import { filter } from '@skeletonlabs/skeleton';

    const { walletState, isMetaMaskPresent, connect, loaded, balance, init } = MetaMaskStore();
    let filterTabOpen = false;
    let searchQuery = '';
    let selectedSort = sortOptions[2];
    let selectedCategories = new Set()
    let selectedPromptCounts = new Set()
    let selectedRarities = new Set()
    let selectedNFTType = 'Prompts';
    let selectedStatus = 'All';
    let user = {
            username: '',
            avatar: profileImages[Math.floor(Math.random() * profileImages.length)],
            address: '0x123456...7890',
        }

    

    let items = [];
    let filteredItems = [];
    let packs = [];
    let prompts = [];
    let cards = [];
    
    async function fetchUserCards() {
        if (user_pk) {
            try{
                const res = await fetch('http://localhost:3000/user/'+user_pk);
                const data = await res.json();
                cards = data.cards;
                user.address=user_pk
                user.username='User'+user_pk.substring(user_pk.length - 4);
                for(let i=0; i<cards.length; i++){
                    cards[i].img_path = 'http://localhost:3000/card/' + cards[i].id + '/image';
                }
                filteredItems = cards;
            } catch (err) {
                console.error(err);
            }
        }
    }

    async function fetchUserPacks() {
        if (user_pk) {
            try{
                const res = await fetch('http://localhost:3000/user/'+user_pk);
                const data = await res.json();
                packs = data.packets;
                user.address=user_pk
                user.username='User'+user_pk.substring(user_pk.length - 4);
                for(let i=0; i<packs.length; i++){
                    packs[i].img_path = Packet;
                }
                filteredItems = packs;
            } catch (err) {
                console.error(err);
            }
        }
    }

    async function fetchUserPrompts() {
        if (user_pk) {
            try{
                const res = await fetch('http://localhost:3000/user/'+user_pk);
                const data = await res.json();
                prompts = data.prompts;
                for (let i = 0; i < prompts.length; i++) {
                    prompts[i].isNew = false;
                }
                let numPacketOpened = localStorage.getItem('numPacketOpened') || 0;
                for (let i = 0; i < (numPacketOpened * 8); i++) {
                    console.log(prompts.length - 1 - i, prompts.length)
                    prompts[prompts.length - 1 - i].isNew = true;
                }
                localStorage.setItem('numPacketOpened', 0);
                prompts.sort((a, b) => {
                    if (a.isNew && !b.isNew) return -1;
                    else if (!a.isNew && b.isNew) return 1;
                    else return 0;
                })
                
                user.address=user_pk
                user.username='User'+user_pk.substring(user_pk.length - 4);
                filteredItems = prompts;
            } catch (err) {
                console.error(err);
            }
        }
    }

    function filterPrompts() {
        return items.filter(prompt => {
                if (selectedCategories.size === 0) return true; 
                return selectedCategories.has(categoryConverter(prompt.category))
                }).filter(prompt => {
                    if (selectedRarities.size === 0) return true; 
                    return selectedRarities.has(rarityConverter(prompt.rarity))
                }).filter((prompt) => {
                    return prompt.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    categoryConverter(prompt.category).toLowerCase().includes(searchQuery.toLowerCase());
                }).filter((prompt) => {
                    if (selectedStatus === 'All') return true;
                    else if (selectedStatus === 'Listed') return prompt.isListed;
                    else if (selectedStatus === 'Not Listed') return !prompt.isListed;
                })
    }

    function filterCards() {
        return items.filter((card) => {
                return card.prompts.includes(searchQuery.toLowerCase())
            }).filter((card) => {
                if (selectedCategories.size === 0) return true;
                return categoryFromId(card.id).filter((prompt) => selectedCategories.has(prompt)).length == selectedCategories.size;
            }).filter((card) => {
                    if (selectedStatus === 'All') return true;
                    else if (selectedStatus === 'Listed') return card.isListed;
                    else if (selectedStatus === 'Not Listed') return !card.isListed;
            })
    }



    onMount(async () => {
        await init();
        await fetchUserPrompts();
        // filteredItems = cards;
    });

    $: {
    if (selectedNFTType === 'Cards') {
        fetchUserCards();
    } else if (selectedNFTType === 'Prompts') {
        fetchUserPrompts();
    } else if (selectedNFTType === 'Packs') {
        fetchUserPacks();
    }
    }
    $: items = selectedNFTType === 'Cards' ? cards : selectedNFTType === 'Prompts' ? prompts : packs;
    $: filteredItems = items.length > 0 ? selectedNFTType === 'Cards' ? filterCards() : selectedNFTType === 'Prompts' ? filterPrompts() : filteredItems : filteredItems;



</script>

{#if user.username != ''}
<div class="flex w-full flex-col items-start " id="main">
    <!-- COVER -->
    <div class="relative w-full " id="main">
        <Cover />
    </div>

    <!-- CONTENT -->
    <div class="absolute top-[29%] w-full px-10 gap-20">
        <!-- PROFILE INFO -->
        <Profile userId={user_pk} username={user.username} avatar={user.avatar} address={user.address} />

        <div class="flex flex-col  w-full items-center -my-10">

            <TypeSelector bind:selectedNFTType/>

            <!-- INFOS -->
            <UtilityBar items={items} bind:filteredItems={filteredItems}  bind:filterTabOpen bind:searchQuery bind:selectedSort fromWhere={"collection"}/>
            

            <div class="flex w-full scrollbar">
                {#if filterTabOpen}
                    <FilterTab items={items} bind:filteredItems={filteredItems} itemsType={selectedNFTType} bind:selectedCategories bind:selectedRarities bind:selectedStatus fromWhere={"collection"} />
                {/if}
                <div class="w-full pt-4 overflow-auto scrollbar min-h-dvh">
                    <GridView items={filteredItems} bind:filterTabOpen isMine={true} fromWhere={"collection"}/>
                </div>
            </div>
        </div>
    
    </div>


</div>
{/if}