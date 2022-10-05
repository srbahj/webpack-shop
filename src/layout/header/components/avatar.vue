<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar shape="square" :size="50" :src="squareUrl" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const squareUrl = ref(
  'https://img0.baidu.com/it/u=51750889,1789768003&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1664384400&t=aff1520dd2af358e57c4ecc603169bef'
)

const logout = () => {
  store.dispatch('app/logout')
}
</script>

<style lang="scss" scoped></style>
