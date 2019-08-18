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
        v-model="remeber"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-value=true
        inactive-value=false
        title="记住我">
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
        remeber: true
      }
    },methods:{
      login(){
        this.$http.post('http://localhost:9999/login',{
          username:this.input,
          password:this.password,
          rememberMe:this.remeber
        },{emulateJSON:true}

        ).then((response) => {
          console.log(response)
        }, (response) => {
          console.log(response)
          // error callback
        });
      }
    }
  }
</script>
