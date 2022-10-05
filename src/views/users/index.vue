<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input
          :placeholder="$t('table.placeholder')"
          clearable
          v-model="queryForm.query"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initGetUsers">{{
        $t('table.search')
      }}</el-button>
      <el-button type="primary" @click="handleDialogValue()">{{
        $t('table.adduser')
      }}</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :prop="item.prop"
        :label="$t(`table.${item.label}`)"
        :width="item.width"
        :index="item.id"
        v-for="item in options"
        :key="item.id"
      >
        <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
          <el-switch v-model="row.mg_state" @change="changeStatus(row)" />
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
          {{ $filters.filterTimes(row.create_time) }}
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'action'">
          <el-button
            size="small"
            type="warning"
            :icon="Edit"
            @click="handleDialogValue(row)"
          ></el-button>
          <el-button
            size="small"
            type="danger"
            :icon="Delete"
            @click="handleDeleteUser(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="queryForm.pagenum"
      v-model:page-size="queryForm.pagesize"
      :page-sizes="[2, 5, 10, 15]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <Dialog
    v-model="dialogVisible"
    :dialogTitle="dialogTitle"
    v-if="dialogVisible"
    @onClick="initGetUsers"
    :dialogFormData="dialogFormData"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import { getUsers, changeMgStatus, deleteUser } from '@/api/users'
import { options } from './options'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { isNull } from '@/utils/filters'
import Dialog from './dialog.vue'
const i18n = useI18n()
const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 2
})
const dialogFormData = ref({})
const tableData = ref([])
const total = ref(0)
const dialogVisible = ref(false)
const dialogTitle = ref('')
const initGetUsers = async () => {
  const res = await getUsers(queryForm.value)
  tableData.value = res.users
  total.value = res.total
}
initGetUsers()

const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initGetUsers()
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initGetUsers()
}

const changeStatus = async (info) => {
  await changeMgStatus(info.id, info.mg_state)
  ElMessage({
    message: i18n.t('message.updeteSuccess'),
    type: 'success'
  })
}

const handleDialogValue = (user) => {
  if (isNull(user)) {
    dialogTitle.value = '添加用户'
    dialogFormData.value = {}
  } else {
    dialogTitle.value = '编辑用户'
    dialogFormData.value = JSON.parse(JSON.stringify(user))
  }
  dialogVisible.value = true
}

const handleDeleteUser = (user) => {
  ElMessageBox.confirm(i18n.t('dialog.deleteTitle'), 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(async () => {
      await deleteUser(user.id)
      ElMessage({
        type: 'success',
        message: 'Delete completed'
      })
      initGetUsers()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 30px;
  box-sizing: border-box;
}
::v-deep .el-input__suffix-inner {
  align-items: center;
}
::v-deep .el-pagination {
  padding-top: 16px;
  box-sizing: border-box;
  text-align: right;
}
</style>
