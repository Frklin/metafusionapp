<script lang='ts'>
    // @ts-nocheck

    // export let coverPath: string;
    export let fromWhere: string = 'collection';

    import Cover from '$lib/assets/cover.png';
</script>

<div class="flex items-start relative h-[370px] self-stretch">
    <img src="{Cover}" alt="cover" class="absolute object-cover w-full h-full" >
    <div class="absolute w-full h-full bg-gradient-to-b from-transparent to-background opacity-100"></div>
    {#if fromWhere === 'create'}
    <span  class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-medium font-heading text-5xl">Forge your own MetaFusion</span>
    {/if}
</div>