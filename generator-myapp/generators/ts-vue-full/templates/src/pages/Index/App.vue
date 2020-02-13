<template>
  <div>
    <div>
      <router-link to="/foo" tag="div">foo</router-link>
      <router-link to="/bar" tag="div">bar</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
export default {}
</script>
<style scoped>
</style>
