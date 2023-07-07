<template>
  <section class="nes-container with-title">
    <h3 class="title">登录界面</h3>
    <div id="inputs" class="item">
      <div class="nes-field">
        <label for="name_field">您的账号：</label>
        <input type="text" id="login_account" class="nes-input" v-model="username" placeholder="请输入您的账号" />
      </div>

      <div class="nes-field">
        <label for="inline_field">您的密码：</label>
        <input type="password" id="login_pwd" class="nes-input is-success" v-model="password" placeholder="请输入您的密码" />
      </div>
    </div>
    <!---->
    <!---->
    <span v-text="loginMsg" style="color: red"></span>
    <div class="login">
      <button type="button" class="nes-btn is-primary" @click="tores">
        注册账号
      </button>
      <button type="button" class="nes-btn is-success" @click="login">
        登录账号
      </button>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      user: {},
      username: "",
      password: "",
      loginMsg: "",
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user != null) {
      this.$router.push({
        path: "/user",
      });
    }
  },
  methods: {
    login() {
      let _this = this;

      if (this.username.length == 0) {
        _this.loginMsg = "用户名不能为空！";
      } else if (this.password.length == 0) {
        _this.loginMsg = "密码不能为空！";
      } else {
        axios
          .post(
            "http://47.115.209.249:8080/user/login",
            {
              username: this.username,
              password: this.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
          
            if (res.data.code == 200) {
              let user = res.data.data;
              _this.loginMsg = "登录成功！";
              localStorage.setItem("user", JSON.stringify(user));
              alert("登录成功！");
              window.location.reload();
              this.$router.push({
                path: "/user",
                query: res.data.data,
              });
       
            } else {
              _this.loginMsg = "登录失败！请检查账号密码是否输入错误！";
            }
         
          });
      }
    },
    tores() {
      this.$router.push({
        path: "/register",
      }); //http://
    },
    //:8080
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
  margin-top: 15%;
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
