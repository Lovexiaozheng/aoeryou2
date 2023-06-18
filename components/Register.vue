<template>
  <section class="nes-container with-title">
    <h3 class="title">注册界面</h3>
    <div id="inputs" class="item">
      <div class="nes-field">
        <label for="name_field">注册账号：</label>
        <input
          type="text"
          id="name_field"
          class="nes-input"
          v-model="username"
          placeholder="请输入您要注册的账号"
        />
      </div>

      <div class="nes-field">
        <label for="inline_field">您的密码：</label>
        <input
          type="password"
          id="inline_field"
          v-model="password"
          class="nes-input is-success"
          placeholder="请输入您的密码"
        />
      </div>

      <div class="nes-field">
        <label for="warning_field">您的邮箱：</label>
        <input
          type="text"
          id="warning_field"
          v-model="email"
          class="nes-input is-warning"
          placeholder="请输入您的邮箱"
        />
      </div>

      <div class="nes-field">
        <label for="error_field">邮箱验证码：</label>
        <input
          type="text"
          id="error_field"
          v-model="emailcode"
          class="nes-input is-error"
          placeholder="请输入邮箱收到的验证码"
        />
      </div>
    </div>
    <!---->
    <!---->
    <span v-text="loginMsg" style="color: red"></span>
    <div class="login">
      <button type="button" class="nes-btn is-primary" @click="login">
        返回登录
      </button>
      <button type="button" class="nes-btn is-success" @click="register">
        注册账号
      </button>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      email: "",
      emailcode: "",
      loginMsg: "",
    };
  },
  methods: {
    login() {
      this.$router.push({
        path: "/login",
      });
    },
    register() {
      let _this = this;
      if (this.username.length == 0) {
        _this.loginMsg = "用户名不能为空！";
      } else if (this.password.length == 0) {
        _this.loginMsg = "密码不能为空！";
      } else if (this.email.length == 0) {
        _this.loginMsg = "邮箱不能为空！";
      } else if (this.emailcode.length == 0) {
        _this.loginMsg = "邮箱验证码不能为空！";
      } else {
        var params = new URLSearchParams();
        params.append("username", this.username);
        params.append("password", this.password);
        params.append("email", this.email);
        params.append("code", this.emailcode);
        axios
          .post("http://127.0.0.1:4523/m2/2501124-0-default/71198268", params, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
          .then(function (response) {
            console.log(response);
            if (response.status == 200) {
              _this.loginMsg = "注册成功！";
              alert("注册成功！即将为您跳转到登录界面");
              _this.$router.push({
                path: "/login",
              });
            } else {
              _this.loginMsg = "注册失败！检查您的邮箱验证码是否正确！";
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}
.nes-container {
  margin: 0 auto;
  margin-top: 10%;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.176);
  position: relative;

  overflow: hidden;
  transition: all 0.3s ease;

  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.nes-container.with-title {
  padding-top: 3rem;
}
.nes-container.with-title::before {
  content: "";
  position: absolute;

  top: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  background-color: #fff;
  border-radius: 3px 3px 0 0;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.176);
  z-index: -1;
}
.nes-container.with-title::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  background-color: #fff;
  border-radius: 3px 3px 0 0;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.176);
  z-index: -1;
}
.nes-container.with-title .title {
  position: relative;
  z-index: 1;
  margin: 0;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #212529;
  background-color: #fff;
  border-radius: 3px 3px 0 0;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.176);
}
.nes-container .item {
  margin-bottom: 1rem;
}
.nes-container .item:last-child {
  margin-bottom: 0;
}
.nes-container .showcode {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  background-color: #212529;
  border: 0;
  border-radius: 0 3px 0 3px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.176);
  cursor: pointer;
  transition: all 0.3s ease;
}
.nes-container .showcode:hover {
  background-color: #000;
}
.nes-container .showcode:focus {
  outline: none;
}
.nes-container .showcode:active {
  background-color: #000;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.176);
  transform: translateY(3px);
}
.nes-container .showcode:disabled {
  background-color: #212529;
  box-shadow: none;
  cursor: not-allowed;
}
.nes-container .showcode:disabled:hover {
  background-color: #212529;
}
.nes-container .showcode:disabled:active {
  background-color: #212529;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.176);
  transform: translateY(0);
}
.nes-container .showcode.is-disabled {
  background-color: #212529;
  box-shadow: none;
  cursor: not-allowed;
}
.nes-container .showcode.is-disabled:hover {
  background-color: #212529;
}
.nes-container .showcode.is-disabled:active {
  background-color: #212529;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.176);
  transform: translateY(0);
}
.nes-container .showcode.is-primary {
  background-color: #212529;
}
.nes-container .showcode.is-primary:hover {
  background-color: #000;
}
.nes-container .showcode.is-primary:active {
  background-color: #000;
}
.nes-container .showcode.is-primary.is-disabled {
  background-color: #212529;
}
.nes-container .showcode.is-primary.is-disabled:hover {
  background-color: #212529;
}
.nes-container .showcode.is-primary.is-disabled:active {
  background-color: #212529;
}
.nes-container .showcode.is-success {
  background-color: #212529;
}
.nes-container .showcode.is-success:hover {
  background-color: #000;
}
.nes-container .showcode.is-success:active {
  background-color: #000;
}
.nes-container .showcode.is-success.is-disabled {
  background-color: #212529;
}
.nes-container .showcode.is-success.is-disabled:hover {
  background-color: #212529;
}
.nes-container .showcode.is-success.is-disabled:active {
  background-color: #212529;
}
.nes-container .showcode.is-warning {
  background-color: #212529;
}
.nes-container .showcode.is-warning:hover {
  background-color: #000;
}
</style>