<template>
<div class="charts">bill</div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import data2021 from '../../static/2021.json'
import {getSumByCategories} from '@/utils/bill'

export default defineComponent({
  name: 'Charts',
  components: {
  },
  setup (props, context) {
    onMounted(async () => {
      const eating = getSumByCategories(data2021, ['餐饮'])
      console.log(eating)
    })
    return {
    }
  },
});
</script>

<style lang="scss">
.charts {}
</style>
