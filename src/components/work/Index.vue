<template>
  <div class="nes-container with-title is-centered product-container" style="margin: 10%">
    <p class="title">商品信息：【{{ work.commodityName }}】</p>

    <div class="book">
      <div class="book_card">
        <div :span="5">
          <img :src="work.images" alt="图片加载出错" class="cover"
            :style="{ width: '400px', height: '400px', objectFit: 'cover' }" />
        </div>
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
          <div class="information">
            <span style="color: red; text-decoration: underline" @click="contactSeller">
              联系商家
            </span>
          </div>
        </div>
      </div>
      <div class="description_box">
        <div class="desc-title">商品描述</div>
        <div class="description">
          {{ work.commodityDescribe }}
        </div>
      </div>
      <div class="tool" v-if="isseller == false">
        <button type="button" class="nes-btn is-primary" onclick="document.getElementById('dialog-buywork').showModal();">
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
      <!--下单编辑框-->
      <dialog id="dialog-buywork">
        <form method="dialog">
          <p class="title">立即下单</p>
          <label for="commodity-id">商品 ID：</label>
          <input type="text" id="commodity-id" class="nes-input" v-model="work.id" readonly />
          <label for="price">商品价格：</label>
          <input type="text" id="price" class="nes-input" v-model="work.price" readonly />
          <label for="remark">备注：</label>
          <input type="text" id="remark" class="nes-input" v-model="remark" />
          <menu class="dialog-menu">
            <button type="submit" class="nes-btn is-primary" @click="submitOrder(work.id, work.price, remark)">
              确认下单
            </button>
            <button type="button" class="nes-btn is-error" @click="closeDialog('dialog-buywork')">
              取消
            </button>
          </menu>
        </form>
      </dialog>
      <dialog id="dialog-jubaowork">
        <form method="dialog">
          <p class="title">举报商品</p>
          <label for="reason">举报原因：</label>
          <input type="text" id="reason" class="nes-input" v-model="reason" required />
          <menu class="dialog-menu">
            <button type="submit" class="nes-btn is-primary" @click="jubaowork(work.id, work.sellerId)">
              提交
            </button>
            <button type="button" class="nes-btn is-error" @click="closeDialog('dialog-jubaowork')">
              取消
            </button>
          </menu>
        </form>
      </dialog>
      <dialog id="dialog-jubaoseller">
        <form method="dialog">
          <p class="title">举报商家</p>
          <label for="reason">举报原因：</label>
          <input type="text" id="reason" class="nes-input" v-model="reason" required />
          <menu class="dialog-menu">
            <button type="submit" class="nes-btn is-primary" @click="jubaoseller(work.sellerId)">
              提交
            </button>
            <button type="button" class="nes-btn is-error" @click="closeDialog('dialog-jubaoseller')">
              取消
            </button>
          </menu>
        </form>
      </dialog>
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
      user: JSON.parse(localStorage.getItem("user")),
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
        .get("http://47.115.209.249:8080/commodity/id", {
          params: {
            id: workid,
          },
          headers: {
            satoken: this.user.token,
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
      .get("http://47.115.209.249:8080/user/username", params, {
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
      // 返回上一页
      this.$router.go(-1);
    },
    addCart() {
      this.$store.commit("ADDCART", this.book);
      this.$message({
        type: "success",
        message: "添加购物车成功",
      });
    },
    contactSeller() {
      //跳转聊天窗口
      localStorage.setItem("chatLink", JSON.stringify(this.work.sellerId));
      this.$router.push({ path: "/chat" });
    },
    //举报商家
    jubaoseller(id) {
      const data = {
        reason: this.reason,
        complainedId: id,
      };

      axios
        .post("http://47.115.209.249:8080/complaints/seller", data, {
          headers: {
            satoken: this.user.token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data.data);
          alert("举报成功");
        });
    },
    //举报商品
    jubaowork(workid, sellerid) {
      const data = {
        reason: this.reason,
        complainedId: sellerid,
        commodityId: workid,
      };

      axios
        .post("http://47.115.209.249:8080/complaints/item", data, {
          headers: {
            satoken: this.user.token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data.data);
          alert("举报成功");
        });
    },
    closeDialog(dialogId) {
      //关闭弹窗
      document.getElementById(dialogId).close();
    },
    //收藏
    addfa(id) {
      var params = new URLSearchParams();
      params.append("commodityId", id);
      axios
        .post("http://47.115.209.249:8080/favorites", params, {
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
    //下单
    submitOrder(commodityId, amount, remark) {
      const data = {
        commodityId: commodityId,
        amount: amount,
        remark: remark,
      };
      console.log("下单数据：", data);
      axios
        .post("http://47.115.209.249:8080/orders/submit", data, {
          headers: {
            satoken: this.user.token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data.data);
          alert("下单成功");
        });
    },
  },
};
</script>

<style scoped>
  /* 设置产品容器样式 */
  .product-container {
    margin-top: 5%; /* 顶部外边距 */
    background-color: #f9f9f9; /* 背景色 */
    padding: 25px; /* 内边距 */
    border-radius: 8px; /* 圆角 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  }

  /* 设置图书容器样式 */
  .book {
    display: flex; /* 设置为弹性布局 */
    flex-direction: column; /* 列布局 */
    align-items: center; /* 水平居中对齐 */
  }

  /* 设置图书卡片样式 */
  .book_card {
    width: 100%; /* 宽度 */
    display: flex; /* 设置为弹性布局 */
    flex-direction: row; /* 行布局 */
    justify-content: space-between; /* 两端对齐 */
    align-items: center; /* 垂直居中对齐 */
    flex-wrap: wrap; /* 允许多行 */
    padding: 20px; /* 内边距 */
    background-color: #ffffff; /* 背景色 */
    border-radius: 8px; /* 圆角 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影效果 */
    margin-bottom: 20px; /* 底部外边距 */
  }

  /* 设置封面图片样式 */
  .cover {
    max-width: 200px; /* 最大宽度 */
    max-height: 200px; /* 最大高度 */
    object-fit: cover; /* 图片填充方式 */
    border-radius: 8px; /* 圆角 */
  }

  /* 设置信息容器样式 */
  .information {
    display: flex; /* 设置为弹性布局 */
    flex-direction: column; /* 列布局 */
    gap: 8px; /* 设置间距 */
  }

  /* 设置描述框样式 */
  .description_box {
    width: 100%; /* 宽度 */
    padding: 20px; /* 内边距 */
    background-color: #ffffff; /* 背景色 */
    border-radius: 8px; /* 圆角 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影效果 */
    margin-bottom: 20px; /* 底部外边距 */
  }

  /* 设置描述标题样式 */
  .desc-title {
    font-size: 1.25rem; /* 字体大小 */
    font-weight: bold; /* 字体粗细 */
    margin-bottom: 12px; /* 底部外边距 */
  }

  /* 设置描述文本样式 */
  .description {
    line-height: 1.5; /* 行高 */
    font-size: 1rem; /* 字体大小 */
  }

  /* 设置工具容器样式 */
  .tool {
    display: flex; /* 设置为弹性布局 */
    justify-content: space-around; /* 项目之间平均分布 */
    align-items: center; /* 垂直居中对齐 */
    width: 100%; /* 宽度 */
    gap: 12px; /* 设置间距 */
    flex-wrap: wrap; /* 允许多行 */
  }
</style>

