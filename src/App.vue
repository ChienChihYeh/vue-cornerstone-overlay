<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as cornerstone from "@cornerstonejs/core";
import { useEventListener } from "./hooks/event";
import {
  initDemo,
  updateViewportTransform,
  resetCamera,
} from "./utils/helpers";
import { imageId } from "./utils/constant";
import OverlayLayer from "./components/OverlayLayer.vue";

const el = ref<HTMLDivElement>();
const transform = ref({ pan: [0, 0], zoom: 1 });
const threshold = ref(3);
const opacity = ref(1);

useEventListener(el, cornerstone.EVENTS.CAMERA_MODIFIED, () => {
  updateViewportTransform(transform);
});

onMounted(() => {
  if (el.value) {
    initDemo(el.value, [imageId]);
  }
});
</script>

<template>
  <main>
    <h1>Vue Cornerstone3D Custom Overlay Example</h1>
    <p>Left mouse: Pan | Right mouse: Zoom</p>
    <div class="container">
      <OverlayLayer
        :pan="transform.pan"
        :zoom="transform.zoom"
        :threshold="threshold"
        :opacity="opacity"
      />
      <div class="viewer" ref="el" @contextmenu="$event.preventDefault()"></div>
    </div>
    <p>
      x: {{ transform.pan[0] }}, y: {{ transform.pan[1] }}, scale:
      {{ transform.zoom }}
    </p>
    <p>
      <button @click="resetCamera">Reset Camera</button> |
      <input type="range" v-model.number="threshold" min="1" max="3" step="1" />
      Threshold: {{ threshold }} |
      <input
        type="range"
        v-model.number="opacity"
        min="0"
        max="1"
        step="0.01"
      />
      Opacity: {{ opacity.toFixed(2) }}
    </p>
    <p>
      <a href="https://github.com/ChienChihYeh/vue-cornerstone-overlay"
        >GitHub Repo</a
      >
    </p>
  </main>
</template>

<style scoped>
h1,
p {
  text-align: center;
}

.container {
  position: relative;
  width: max-content;
  margin: auto;
  overflow: hidden;
}

input {
  vertical-align: text-top;
}
</style>
