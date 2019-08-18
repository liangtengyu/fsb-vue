<template>
  <div>
    <form style="height: 30% ; width: 80%">


      <el-input
        placeholder="请输入账号"
        v-model="input"
        clearable>
      </el-input><i class="el-icon-s-custom" ></i>

      <el-input placeholder="请输入密码" v-model="password" show-password></el-input>

      <el-switch
        v-model="remeberMe"
        active-color="#13ce66"
        inactive-color="#ff4949" title="记住我">
      </el-switch>

      <el-button type="primary" plain icon="el-icon-user" @click="login()">登陆</el-button>
    </form>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        input: '',
        password: '',
        remeberMe: true
      }
    },methods:{
      login(){
        // this.$vue.post('localhost:9999/login',{'username':this.input,'password':this.password}).then(function (res) {
        //   console.log(res)
        // },function (err) {
        //   console.log(err)
        // })


        this.$http.get('localhost:9999/login').then(function (res) {
          console.log(res)
        },function (err) {
          console.log(err)
        })
      }
    }
  }
</script>
