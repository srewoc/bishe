<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2>登录</h2>
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="角色" prop="type">
          <el-select v-model="form.type" placeholder="请选择角色" required>
            <el-option label="管理员" :value="1"></el-option>
            <el-option label="学生" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" required></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" required></el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" @click="handleSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<!--<script setup>-->
<!--import { ref } from 'vue';-->
<!--import axios from 'axios';-->
<!--import { useRouter } from 'vue-router';-->
<!--import { ElMessage } from 'element-plus';-->

<!--const form = ref({-->
<!--  type: null,-->
<!--  username: '',-->
<!--  password: '',-->
<!--});-->

<!--const rules = {-->
<!--  type: [-->
<!--    { required: true, message: '请选择角色', trigger: 'change' },-->
<!--  ],-->
<!--  username: [-->
<!--    { required: true, message: '请输入账号', trigger: 'blur' },-->
<!--  ],-->
<!--  password: [-->
<!--    { required: true, message: '请输入密码', trigger: 'blur' },-->
<!--  ],-->
<!--};-->

<!--const router = useRouter();-->

<!--const handleSubmit = () => {-->
<!--  if (form.value.type !== null && form.value.username !== '' && form.value.password !== '') {-->
<!--    axios.post('/api/login', {-->
<!--      username: form.value.username,-->
<!--      password: form.value.password,-->
<!--      type: form.value.type,-->
<!--    }).then(response => {-->
<!--      if (response.data.code === 0) {-->
<!--        ElMessage.error(response.data.msg);-->
<!--      } else {-->
<!--        ElMessage.success("登录成功");-->
<!--        router.push({-->
<!--          path: '/dashboard',-->
<!--        });-->
<!--      }-->
<!--    });-->
<!--  }-->
<!--};-->
<!--</script>-->


<script>
import axios from "axios";
import {ElMessage} from "element-plus";


export default {
  name: "LoginForm",
  data() {
    return {
      form: {
        type: null,
        username: '',
        password: '',
      },
      rules: {
        type: [
          {required: true, message: '请选择角色', trigger: 'change'},
        ],
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      if (this.form.type !== null && this.form.username !== '' && this.form.password !== '') {
        axios.post('/api/login', {
          username: this.form.username,
          password: this.form.password,
          type: this.form.type,
        }).then(response => {
          if (response.data.code === 0) {
            ElMessage.error(response.data.msg);
          } else {
            ElMessage.success("登录成功");
            document.cookie = "token=" + response.data.token;
            this.$router.push({ path: '/dashboard'});
          }
        })
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;

}

.login-card {
  display: flex;
  width: 500px;
  justify-content: center;
  align-items: center;
}
</style>