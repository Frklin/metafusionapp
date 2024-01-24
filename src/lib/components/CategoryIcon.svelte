<script>

    export let fillColor='bg-white/60';
    export let iconName;

    import StyleIcon from '$lib/assets/categories/style.svg';
    import ColorIcon from '$lib/assets/categories/colors.svg';
    import CharacterIcon from '$lib/assets/categories/character.svg';
    import HatsIcon from '$lib/assets/categories/hats.svg';
    import GlassesIcon from '$lib/assets/categories/glasses.svg';
    import HandoffIcon from '$lib/assets/categories/handoff.svg';

    var icon;
    switch (iconName) {
        case 'style':
            icon = StyleIcon;
            break;
        case 'colors':
            icon = ColorIcon;
            break;
        case 'character':
            icon = CharacterIcon;
            break;
        case 'hats':
            icon = HatsIcon;
            break;
        case 'glasses':
            icon = GlassesIcon;
            break;
        case 'handoff':
            icon = HandoffIcon;
            break;
        default:
            icon = null;
    }


</script>


<svg class={`w-16 h-16 ${fillColor}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <!-- Only one path for simplicity -->
    <path d="M...Z" />
  </svg>

