<template>
    <button>Modifier</button>
</template>

<script>
export default {
    name: 'ModifyButton'
}
</script>

<style scoped lang="scss">
@import "../sass/utils/variables";
@import "../sass/utils/mixins";
button{
    @include button;       
}
</style>