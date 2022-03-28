<template>
<input :type="type" :name="name" :placeholder="placeholder">
</template>

<script>
export default {
  name: 'BaseInput',
  props: ['type', 'name', 'placeholder']
}
</script>

<style lang="scss" scoped>
@import "../sass/utils/mixins";

input{
        padding: 10px;
        width: 250px;
        margin: 15px 0;
        border: 1px solid #0000003b;
        border-radius: 25px;
        padding-right: 40px;
        @include mobile{
          width: 200px;
        }
      }
</style>
-