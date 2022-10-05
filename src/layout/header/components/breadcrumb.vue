<template>
  <el-breadcrumb separator="/" id="breadcrumb">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
      <span v-if="index === breadcrumbList.length - 1" class="no-redirect">{{
        $t(`menus.${item.name}`)
      }}</span>
      <span v-else class="redirect" @click="handleRedirect(item.redirect)">{{
        $t(`menus.${item.name}`)
      }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
const route = useRoute()
const router = useRouter()
const breadcrumbList = ref([])
const initBreadcrumb = () => {
  breadcrumbList.value = route.matched
  console.log(route.matched)
}
const handleRedirect = (path) => {
  router.push(path)
}
watch(
  route,
  () => {
    initBreadcrumb()
  },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
}
.redirect {
  color: #666;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: $menuBg;
  }
}
</style>
