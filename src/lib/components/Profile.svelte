<script lang='ts'>
    import { addressFormatter } from '$lib/index.js';
    import { clipboard } from '@skeletonlabs/skeleton';
    import { user_pk } from '$lib';
    import { writable } from 'svelte/store';
    import  Pencil  from '$lib/assets/icons/pencil.svg';
    import Copy from '$lib/assets/icons/copy.png';
	import { onMount } from 'svelte';
    import MintButton from '$lib/components/MintButton.svelte';    
    import FrancescoProfile from '$lib/assets/profile/francesco.jpeg';
    import AndreaProfile from '$lib/assets/profile/andrea.jpeg';
    import LucaProfile from '$lib/assets/profile/luca.jpg';

    export let userId: string;
    export let avatar: string;
    export let username: string;
    export let address: string;

    let tooltipVisible = false;
    let tooltipText = 'Copy';
    let name: string = '';
    let avatarImg: string = '';

    let editing = writable(false);

    function toggleEdit() {
        editing.update(n => !n);
    }

    function showTooltip() {
        tooltipVisible = true;
        tooltipText = 'Copy';
    }

    function hideTooltip() {
        tooltipVisible = false;
    }

    function copyAddress() {
        tooltipText = 'Copied!';
    }

    function saveNewUsername(event: Event) {
        event.preventDefault();
        const newUsername = event.target.username.value;
        name = newUsername;
        localStorage.removeItem(userId.toString());
        localStorage.removeItem(username);
        localStorage.setItem(userId.toString(), newUsername);
        localStorage.setItem(newUsername, userId.toString());
        editing.set(false);
    }

    onMount(() => {
        if (userId) {
            name = localStorage.getItem(userId) || 'User' + userId.substring(0,4);
            console.log(name)
        }
    });
    
    $ : avatarImg = name === 'Francesco' ? FrancescoProfile : name === 'Andrea' ? AndreaProfile : name === 'Luca' ? LucaProfile : 'https://avatars.githubusercontent.com/u/59870781?v=4';
    $: isMine = address === user_pk;
</script>






<div class="w-full px-16 mt-10 h-[130px]">

    <div class="w-full flex flex-row justify-between items-center"> 
        <div class="w-[90%] flex flex-row items-center gap-6"> 
            <!-- PROFILE IMAGE -->
            <div class="w-28 h-28 rounded-full border-4 border-orange-600">
                <img src={avatarImg} class="w-full h-full rounded-full object-cover" alt="avatar" />
            </div>

            <!-- PROFILE NAME AND ADDRESS -->
            <div class="flex flex-col justify-center items-start gap-2">
                <div class="flex flex-row gap-3 items-center">
                    {#if $editing}
                    <form class="flex items-center" on:submit={saveNewUsername}>
                    <input class="text-4xl font-semibold text-primary bg-transparent border-b-2 border-primary" name="username" type="text" placeholder={username} />
                    </form>
                {:else}
                    <span class="text-4xl font-semibold text-primary">{name}</span>
                    {#if isMine || true}
                    <img src={Pencil} alt="Edit" class="w-6 h-6 opacity-50 hover:opacity-100 cursor-pointer" on:click={toggleEdit} />
                    {/if}
                {/if}
                </div>
                <div class="flex flex-row gap-2">
                <button 
                on:mouseover={showTooltip}
                on:mouseleave={hideTooltip}
                on:click={copyAddress}
                use:clipboard={address}
                class="text-base font-normal text-secondary hover:text-white duration-200">{addressFormatter(address,6)}
                </button>
                <div 
                class:invisible={!tooltipVisible}
                class:opacity-100={tooltipVisible}
                class="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white {tooltipText === 'Copied!' ? 'bg-gray-400' : 'bg-gray-800'} rounded-lg shadow-sm tooltip"
                style="transition-duration: 150ms;"
                role="tooltip">
                {tooltipText}
                <div class="tooltip-arrow" data-popper-arrow></div>
                </div>  
                <button 
                on:mouseover={showTooltip}
                on:mouseleave={hideTooltip}
                on:click={copyAddress}
                use:clipboard={address}
                class="text-base font-normal text-secondary hover:text-white duration-200">
                <img src="{Copy}" alt="copy" class="w-4 h-4 opacity-50 hover:opacity-100">
                </button>
            
            </div>
            </div>

            
        </div>
        {#if isMine}
        <div class="-mr-10"><MintButton /></div>
        {/if}
    </div>
</div>
