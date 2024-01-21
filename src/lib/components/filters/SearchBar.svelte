<script lang='ts'>

    export let searchQuery: string = '';

    import Lente from '$lib/assets/icons/lente.svg';

</script>





<!-- SEARCH BAR -->
<div class="flex-grow flex items-center mx-3">
    <div class="flex justify-start items-center w-full h-12 rounded-xl border border-card_background px-4  hover:border-white/20 duration-200">
        <img src={Lente} class="w-5 h-5 mr-2" alt="lente" />
        <input
            type="text"
            placeholder="Search by name or category"
            bind:value={searchQuery}
            class="w-full bg-transparent text-secondary text-base font-normal outline-none"
        />
    </div>
</div>