<script lang="ts">
    import Style from '$lib/assets/categories/style.svg';
    import Modal from '$lib/components/ModalMint.svelte';


    let isModalOpen = false;
    const handleClose = () => {
        isModalOpen = false;
    }
    
    function mintPacket() {
        isModalOpen = true;
    }
</script>




<button on:click={mintPacket} class="bg-green-500 items-center flex flex-row gap-2 rounded-lg px-4 py-3 hover:bg-green-400 duration-200">
    <img src="{Style}" alt="mint icon" class="w-6 h-6">
    <span class="text-white font-semibold">Mint Packet</span>
</button>



<div>
    <Modal open={isModalOpen} on:close={handleClose}/>
</div>