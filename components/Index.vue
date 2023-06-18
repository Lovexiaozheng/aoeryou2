<template>
    <div class="goods-box">
      <section class="nes-container with-title">
        <h3 class="title">全部商品</h3>
        <div class="goods-list">
          <div class="goods-item" v-for="item in goodsList" :key="item.id">
            <div class="goods-img">
              <img :src="item.images" alt="">
            </div>
            <div class="goods-info">
              <div class="goods-title">{{ item.commodityName }}</div>
              <div class="goods-price">￥{{ item.price }}</div>
              <div class="goods-btn">
                <a href="#" class="nes-badge">
                  <span class="is-warning" @click="addfa(item.id)">
                    <i class="nes-icon star is-small"></i>立即收藏
                  </span>
                </a>
                <a href="#" class="nes-badge is-splited" @click="lookItem(item.id)">
                  <span class="is-dark">查看</span>
                  <span class="is-success">详细</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>

<script>
import axios from "axios";
export default {
    name: "Index",
    data() {
        return {
            user: {},
            goodsList: [


            ],
        };
    },
    created() {
        this.user = JSON.parse(localStorage.getItem("user"));
        if (this.user == null) {
            alert("您还未登录，为您跳转到登录处");
            this.$router.push({ path: "/login" });
        }

        axios
            .get("http://127.0.0.1:4523/m1/2501124-0-default/commodity/page", {
                headers: { satoken: this.user.token },
            })
            .then((res) => {
                console.log(res);
                this.goodsList = res.data.data.list;
                console.log(this.goodsList);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        addCart(item) {
            this.$store.commit("addCart", item);
        },
        // 查看商品详情
        lookItem(id) {
            localStorage.setItem('Item', JSON.stringify(id))
            this.$router.push({ path: "/workindex" })
        },
        // 收藏商品
        addfa(id) {
            var params = new URLSearchParams();
            params.append("commodityId", id);
            axios
                .post(
                    "http://127.0.0.1:4523/m2/2501124-0-default/73721956", params, {
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
.goods-box {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 8rem;
}

.goods-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(32%, 1fr));
  grid-gap: 10px;
  justify-items: center;
}

.goods-item {
  margin-bottom: 10px;
  width: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.goods-img {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.goods-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.goods-info {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.goods-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.goods-price {
  font-size: 14px;
  color: #f00;
  margin-bottom: 10px;
}

.goods-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
</style>
