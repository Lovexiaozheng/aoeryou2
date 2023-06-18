<template>
  <div class="nes-container with-title is-centered" style="margin-top: 5%">
    <p class="title">{{ work.commodityName }}</p>

    <div class="book">
      <div class="book_card">
        <div :span="5">
          <img :src="work.images" alt="图片加载出错" class="cover" />
        </div>
        <dialog class="nes-dialog" id="dialog-jubaowork">
          <form method="dialog">
            <h1 style="text-align: center">举报商品</h1>
            <div class="nes-field is-inline">
              <label for="error_field">举报该商品的理由：</label>
              <textarea id="textarea_field" class="nes-textarea" v-model="reason"></textarea>
            </div>
            <menu class="dialog-menu" style="text-align: center">
              <button class="nes-btn">取消</button>
              <button class="nes-btn is-success" @click="jubaowork(work.id, work.sellerId)">
                确认
              </button>
            </menu>
          </form>
        </dialog>
        <dialog class="nes-dialog" id="dialog-jubaoseller">
          <form method="dialog">
            <h1 style="text-align: center">举报商家</h1>
            <div class="nes-field is-inline">
              <label for="error_field">举报商家的理由：</label>
              <textarea id="textarea_field" class="nes-textarea" v-model="reason"></textarea>
            </div>
            <menu class="dialog-menu" style="text-align: center">
              <button class="nes-btn">取消</button>
              <button class="nes-btn is-success" @click="jubaoseller(work.sellerId)">
                确认
              </button>
            </menu>
          </form>
        </dialog>
        <div :span="19" class="information">
          <div class="nes-text is-primary">标题：{{ work.commodityName }}</div>
          <div class="information nes-text is-success">
            状态：{{ work.status }}
          </div>
          <div class="information nes-text is-warning">
            商家：{{ work.createUser }}
          </div>
          <div class="information nes-text is-error">
            价格：{{ work.price }}元
          </div>
          <div class="information">更新时间：{{ work.updateTime }}</div>
        </div>
      </div>
      <div class="description_box">
        <div class="title">商品描述</div>
        <div class="description">
          {{ work.commodityDescribe }}
        </div>
      </div>
      <div class="tool" v-if="isseller == false">
        <button type="button" class="nes-btn is-primary"
          onclick="document.getElementById('dialog-jubaowork').showModal();">
          立即下单
        </button>
        <button type="button" class="nes-btn is-success" @click="addfa(work.id)">
          收藏商品
        </button>
        <button type="button" class="nes-btn is-warning"
          onclick="document.getElementById('dialog-jubaowork').showModal();">
          举报商品
        </button>
        <button type="button" class="nes-btn is-error"
          onclick="document.getElementById('dialog-jubaoseller').showModal();">
          举报商家
        </button>
        <button class="nes-btn" @click="gotoback()">返回上一页</button>
      </div>
      <div class="tool" v-if="isseller == true">
        <button type="button" class="nes-btn is-warning"
          onclick="document.getElementById('dialog-jubaowork').showModal();">
          修改商品
        </button>
        <button type="button" class="nes-btn is-error"
          onclick="document.getElementById('dialog-jubaoseller').showModal();">
          删除商品
        </button>
        <button class="nes-btn" @click="gotoback()">返回上一页</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Work",
  data() {
    return {
      user: {},
      work: {},
      reason: "",
      isseller: false,
    };
  },
  created: function () {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user == null) {
      alert("您还未登录，为您跳转到登录处");
      this.$router.push({ path: "/login" });
    }
    var workid = JSON.parse(localStorage.getItem("Item"));
    if (workid == null) {
      alert("请选择您要查看的商品");
      this.$router.push({ path: "/" });
    } else {
      var params = new URLSearchParams();
      params.append("id", workid);
      axios
        .get("http://127.0.0.1:4523/m2/2501124-0-default/73411096", params, {
          headers: {
            satoken: this.user.token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          console.log(res.data.data);
          this.work = res.data.data;
        });
    }
    var params = new URLSearchParams();
    params.append("username", this.user.username);
    axios
      .get("http://127.0.0.1:4523/m1/2501124-0-default/user/username", params, {
        headers: {
          satoken: this.user.token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        if (this.work.sellerId == res.data.data.id) {
          this.isseller = true;
        }
      });
  },

  methods: {
    gotoback() {
      this.$router.go(-1);
    },
    addCart() {
      this.$store.commit("ADDCART", this.book);
      this.$message({
        type: "success",
        message: "添加购物车成功",
      });
    },
    jubaoseller(id) {
      var params = new URLSearchParams();
      params.append("reason", this.reason);
      params.append("complainedId", id);
      axios
        .post(
          "http://127.0.0.1:4523/m2/2501124-0-default/77006371?apifoxApiId=77006371",
          params,
          {
            headers: {
              satoken: this.user.token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          console.log(res.data.data);
          alert("举报成功");
        });
    },
    jubaowork(workid, sellerid) {
      var params = new URLSearchParams();
      params.append("reason", this.reason);
      params.append("complainedId", sellerid);
      params.append("commodityId", workid);
      axios
        .post(
          "	http://127.0.0.1:4523/m2/2501124-0-default/76956997?apifoxApiId=76956997",
          params,
          {
            headers: {
              satoken: this.user.token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          console.log(res.data.data);
          alert("举报成功");
        });
    },
    addfa(id) {
      var params = new URLSearchParams();
      params.append("commodityId", id);
      axios
        .post("http://127.0.0.1:4523/m2/2501124-0-default/73721956", params, {
          headers: {
            satoken: this.user.token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          console.log(res.data.data);
          alert("收藏成功");
        });
    },
  },
};
</script>

<style scoped>
.book {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}

.book_card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}

.tool {
  margin-top: 2%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.cover {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}

.description_box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}

.title {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}

.description {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}

.information {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}

.shoppingCart {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #409eff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}
</style>
