<template>
  <input
    class="outline-none border-b py-2 px-2 w-3/4"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    @input="inputHandler"
  />
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const emit = defineEmits(['updateValue'])
defineProps({
  type: {
    required: true,
    type: String,
    default: "text",
  },
  name: {
    required: true,
    type: String,
    default: "text",
  },
  placeholder: {
    required: false,
    type: String,
    default: "Enter Text",
  },
});

const inputHandler = (event) => {
        emit('updateValue', event);
    }
</script>

