<template>
  <div class="home">
    <img src="../assets/logo.png">
    <div>
      <el-button type="primary" @click="$router.push({name: 'Charts'})">查看2021年度账单</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
  },
});
</script>
