<template>
  <button type="submit" class="submit-btn">{{ value }}</button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: ['value']
}
</script>

<style lang="scss">
@import "../sass/utils/variables";
.submit-btn {
  align-self: center;
    background-color: #42B72A;
        color: #000;
        font-weight: bold;
        font-size: 16px;
        font-family: $font;
        border-radius: 10px;
        width: 200px;
        border: none;
        padding: 10px;
        cursor: pointer;
        margin: 25px 0;
        transition: all .2s ease-in-out;
        &:hover{
          transform: scale(1.1);
        }
        
}
</style>