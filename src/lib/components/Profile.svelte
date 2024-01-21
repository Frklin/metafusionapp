<script lang='ts'>
    import { addressFormatter } from '$lib/index.js';

    export let avatar: string;
    export let username: string;
    export let address: string;
</script>






<div class="w-full px-16 mt-10 h-[130px]">
    <div class="w-full flex flex-row items-center gap-6"> 
        <!-- PROFILE IMAGE -->
        <div class="w-28 h-28 rounded-full border-4 border-orange-600">
            <img src={avatar} class="w-full h-full rounded-full" alt="avatar" />
        </div>

        <!-- PROFILE NAME AND ADDRESS -->
        <div class="flex flex-col justify-center items-start gap-2">
            <span class="text-4xl font-semibold text-primary">{username}</span>
            <span class="text-base font-normal text-secondary">{addressFormatter(address)}</span>
        </div>
        
    </div>
</div>
