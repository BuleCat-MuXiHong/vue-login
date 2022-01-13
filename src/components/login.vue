<template>
<div :class="sign_css" id="container">
    <div class="form-warp">
      <el-form  ref="signin" class="sign-in-form" :model="signin">
        <h2 class="form-title">登录</h2>
        <el-form-item>
          <el-input placeholder="用户名" v-model="signin.username"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input placeholder="密码" type="password" v-model="signin.password" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.preven="handleSignIn()" @click="submitForm('signin')">登录</el-button>
        </el-form-item>
      </el-form>

      <el-form :model="signup" status-icon :rules="rules" ref="signup"  class="demo-signup sign-up-form">
      <h2 class="form-title">注册</h2>
       <!-- username -->
        <el-form-item prop="username">
           <el-input placeholder="用户名" auto-complete="false" v-model="signup.name" class="elinput"></el-input>
        </el-form-item>
         <!-- password -->
        <el-form-item  prop="pass">
          <el-input placeholder="密码"  type="password"  v-model="signup.pass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- checkPass -->
        <el-form-item  prop="checkPass">
          <el-input placeholder="确认密码"  type="password"  v-model="signup.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- email -->
        <el-form-item prop="email"  :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
            <el-input placeholder="邮箱" v-model="signup.email"></el-input>
        </el-form-item>
        <!-- 发送邮箱验证码 -->
        <el-form-item >
          <el-input type="text" placeholder="验证码" v-model="signup.code" place ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" round
          @click.preven="handleSignUp()"
          @click="submitForm('signup')">注册</el-button>

          <el-button type="info" round @click="resetForm('signup')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
<!-- 控制注册页和登录页跳转的 -->
    <div class="desc-warp">
      <div class="desc-warp-item sign-up-desc">
        <div class="content">
          <button id="sign-up-btn" @click="sign">注册</button>
        </div>
        <img src="../assets/img/log.svg" alt="">
      </div>
      <div class="desc-warp-item sign-in-desc">
        <div class="content">
          <button id="sign-in-btn" @click="login">登录</button>
        </div>
        <img src="../assets/img/register.svg" alt="">
      </div>
    </div>
  </div>

</template>
<script>
    export default{
      data(){
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.signup.checkPass !== '') {
              this.$refs.signup.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.signup.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          sign_css: 'container',
          signin: {
            username:'',
            password:''
          },
          signup: {
            username:'',
            name:'',
            pass: '',
            email:'',
            code:""
          },
          rules: {
            username:[{required:true,message:"username",trigger: 'blur'}],
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        sign() {
          this.sign_css = 'container sign-up-mode'
        },
        login() {
          this.sign_css = 'container'
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(signup) {
          this.$refs.signup.resetFields();
        },
        //输入用户名时，检查用户名是否已经存在
        // 注册
        handleSignUp(){
          var SignUpDatas = new URLSearchParams();
          SignUpDatas.append('username',this.signup.name)
          SignUpDatas.append('password',this.signup.pass)
          SignUpDatas.append("Email",this.signup.email)
          this.$http.post("http://localhost:8080/user/signup",SignUpDatas)
          .then((res)=>{
            console.log(res)
            //注册成功过后 清空所有的输入信息 动画跳转到signIn 页面
            this.$message.success("注册成功")
            setTimeout(() =>{
                this.sign_css='container';
            },1500);

          })
        },
        // 登录
        handleSignIn(){
          var SignInDatas = new URLSearchParams();
          SignInDatas.append("username",this.signin.username)
          SignInDatas.append("password",this.signin.password)
          this.$http.post("http://localhost:8080/user/signin",SignInDatas)
          .then((res)=>{
            console.log(res)
              this.$router.push({name:"home"})
            // ******************************************************
            // const {data,meta:{msg:status}} =res.data  //对象解构写法
            // if  (status==200){
                //保存token 在登录成功时，保存正确用户的token
                localStorage.setItem("token",data.token)
            //   //登录成功 提示框出来
            //   //跳转页面 home
            //   this.$message.success()
            //   this.$router.push({name:"home"})
            // }else{
            //   //不成功 弹出提示框
            //   this.$message.success()
            //   this.$message.warning()
            //   this.$message.error()
            // }
          })
        }

      }
    }
</script>

<style>
  @import url("../assets/css/login.css");

</style>
