<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="25%"
    @close="handleClose"
  >
    <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        v-if="dialogTitle === '添加用户'"
      >
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input v-model="form.mobile" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleComfirm(formRef)"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, reactive, defineProps, ref, watch } from 'vue'
import { addUser, editUser } from '@/api/users'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
const props = defineProps({
  dialogTitle: {
    type: String,
    default: '',
    required: true
  },
  dialogFormData: {
    type: Object,
    default: () => {}
  }
})
const form = ref({
  username: '',
  password: '',
  email: '',
  mobile: ''
})
watch(
  () => props.dialogFormData,
  () => {
    form.value = props.dialogFormData
  },
  { deep: true, immediate: true }
)

const formRef = ref(null)
const rules = reactive({
  username: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: 'Please input Activity password',
      trigger: 'blur'
    },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Please input Activity email', trigger: 'blur' }
  ],
  mobile: [
    {
      required: true,
      message: 'Please input Activity mobile',
      trigger: 'blur'
    }
  ]
})
const emits = defineEmits(['update:modelValue', 'onClick'])

const handleClose = () => {
  emits('update:modelValue', false)
}
const handleComfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      props.dialogTitle === '添加用户'
        ? await addUser(form.value)
        : await editUser(form.value)
      emits('onClick')
      ElMessage({
        message: i18n.global.t('message.updeteSuccess'),
        type: 'success'
      })
    } else {
      return false
    }
  })
  handleClose()
}
</script>

<style lang="scss" scoped></style>
