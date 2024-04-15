<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";

const props = defineProps<{ pan: number[]; zoom: number; threshold: number }>();
const layer = ref<HTMLCanvasElement>();

// replace it with your own render strategy
function renderImage(threshold: number) {
  const exampleImage = new Image();
  exampleImage.src = `/example${threshold}.png`;
  exampleImage.onload = () => {
    if (layer.value) {
      const ctx = layer.value.getContext("2d");
      ctx?.clearRect(0, 0, 500, 500);
      ctx?.drawImage(exampleImage, 0, 0);
    }
  };
}

// watch threshold and trigger your own render strategy, you can watch image id or other properties as well
watchEffect(() => {
  renderImage(props.threshold);
});

onMounted(() => {
  renderImage(props.threshold);
});
</script>

<template>
  <canvas
    willRead
    ref="layer"
    width="500"
    height="500"
    :style="{ transform: `translate(${pan[0]}px, ${pan[1]}px) scale(${zoom})` }"
  >
  </canvas>
</template>
<style scoped>
canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
}
</style>
