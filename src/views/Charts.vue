<template>
<div class="charts">
  <e-charts options="options" />
</div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import data2021 from '../../static/data2021.json'

export default defineComponent({
  name: 'Charts',
  components: {
  },
  setup (props, context) {
    onMounted(async () => {
      console.log(data2021)
    })
    return {
    }
  },
});
</script>

<style lang="scss">
.charts {}
</style>
