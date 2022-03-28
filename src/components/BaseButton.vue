<template>
  <button type="submit" class="submit-btn">{{ value }}</button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: ['value']
}
</script>

<style>
.submit-btn {
    background-color: #42B72A;
        color: #ffff;
        font-weight: bold;
        font-size: 16px;
        border-radius: 10px;
        width: 200px;
        border: none;
        padding: 10px;
        cursor: pointer;
        margin: 25px 0;
}
</style>