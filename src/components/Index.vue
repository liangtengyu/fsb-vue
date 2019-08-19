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
          var data=response.body
          if (data.code == 0){
            localStorage.setItem("fsbToken",data.data)
            console.log("login success")
            this.$router.push({path: '/home'})
          }else {
            alert("登录失败")
          }
        }, (response) => {
          console.log(response)
          alert("登录失败")
          // error callback
        });
      }
    }
  }
</script>
