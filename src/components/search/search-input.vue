<template>
  <div class="search-input">
    <i class="icon-search"></i>
    <input class="input-inner" v-model="query" />
    <i class="icon-dismiss" v-show="query" @click="clear"></i>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue';
const query = ref('');
const clear = () => {
  query.value = '';
};
const emit = defineEmits(['update:modelValue']); // 改为 update:modelValue
watch(query, (newVal) => {
  emit('update:modelValue', newVal); // 改为 update:modelValue
});
</script>

<style lang="scss" scoped>
.search-input {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 32px;
  background: $color-highlight-background;
  border-radius: 6px;
  .icon-search {
    font-size: 24px;
    color: $color-text-d;
  }
  .input-inner {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: $color-highlight-background;
    color: $color-text;
    font-size: $font-size-medium;
    outline: 0;
    &::placeholder {
      color: $color-text-d;
    }
  }
  .icon-dismiss {
    font-size: 16px;
    color: $color-text-d;
  }
}
</style>
