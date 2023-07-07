<template>
  <div class="box">
    <p class="title">用户收藏列表</p>
    <div class="layout_page" id="content-inner">
      <div class="aside_content" id="aside_content">
        <div class="card-widget card-info">
          <div class="card-content">
            <div class="avatar" style="text-align: center">
              <hr />

              <h2 class="nes-text is-primary">用户收藏列表</h2>

              <hr />
            </div>
            <div class="card-info-social-icons is-center">
              <a class="social-icon" href="#" target="_blank">
                <i class="fa fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- 工具栏，包括返回按钮和搜索框 -->
        <div class="tool">
          <button class="nes-btn" @click="returnUserCenter">
            返回用户中心
          </button>
          <div class="search bar" style="float: right; position: relative">
            <form>
              <input class="" type="text" v-model="searchString" placeholder="在这输入您要搜索的商品名称..." />
            </form>
          </div>
        </div>

        <ul>
          <p v-if="seen" style="
              color: rgb(255, 0, 174);
              font-size: 30px;
              font-weight: bold;
              text-align: center;
            ">
            {{ warning }}
          </p>
          <!--//判断搜索是否有数据后返回提示  -->
          <div class="col-md-9">
            <!-- 循环输出数据 -->
            <div v-for="(article, index) in filteredArticles" :key="index">
              <!--//循环输出数据  -->
              <hr />
              <div class="nes-container is-rounded">
                <table border="0">
                  <tr>
                    <td rowspan="2">
                      <div class="col-md-4">
                        <a @click="lookItem(article.id)" class="angled-img"><!--//跳转到详情页 -->
                          <div class="img">
                            <img class="article-img" v-bind:src="article.images" alt="" /><!--//图片 -->
                          </div>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <td>
                    <ul>
                      <li>
                        <h3>名称：{{ article.commodityName }}</h3>
                      </li>
                      <li>
                        <h3>描述：{{ article.commodityDescribe }}</h3>
                      </li>
                      <li>
                        <h3>价格：{{ article.price }} 元</h3>
                      </li>
                      <li>
                        <h3>状态：{{ article.status }}</h3>
                      </li>
                      <li>
                        <h3>是否被删除：{{ article.isDeleted }}</h3>
                      </li>
                      <li>
                        <h3>发布时间：{{ article.createTime }}</h3>
                      </li>
                      <li>
                        <h3>更新时间：{{ article.updateTime }}</h3>
                      </li>
                      <li>
                        <h3>发布商家：{{ article.createUser }}</h3>
                      </li>
                      <li>
                        <h3>更新商家：{{ article.updateUser }}</h3>
                      </li>
                      <div style="
                          background-color: #212529;
                          padding: 1rem 0;
                          width: 400px;
                        ">
                        <label>
                          <input type="checkbox" class="nes-checkbox is-dark" @click="deleteFavorite(article.id)"
                            checked />
                          <span style="font-size: 18.72px">是否收藏<span class="nes-text is-error">(取消勾选则取消收藏)</span></span>
                        </label>
                      </div>
                    </ul>
                  </td>
                  <tr>
                    <td></td>
                  </tr>
                </table>
              </div>
            </div>
            <!-- /循环输出数据 -->
            <br />
          </div>

          <!-- /创建美化样式盒子 -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      articles: [],
      seen: false,
      warning: "暂无数据",
      searchString: "",
      user: JSON.parse(localStorage.getItem("user")),
    };
  },

  // 对收藏列表进行过滤搜索
  computed: {
    filteredArticles() {
      let articles_array = this.articles,
        searchString = this.searchString;

      if (!searchString) {
        return articles_array;
      }

      searchString = searchString.trim().toLowerCase();

      articles_array = articles_array.filter(function (item) {
        if (item.commodityName.toLowerCase().indexOf(searchString) !== -1) {
          return item;
        }
      });

      // 搜索无结果时显示提示信息
      if (articles_array.length === 0) {
        this.seen = true;
      } else {
        this.seen = false;
      }

      return articles_array;
    },
  },

  methods: {
    // 获取收藏列表数据
    getArticles() {
      axios
        .get("http://47.115.209.249:8080/favorites", {
          headers: { satoken: this.user.token },
        })
        .then((response) => {
          this.articles = response.data.data;
        });
    },

    // 返回用户中心
    returnUserCenter() {
      this.$router.push("/userCenter");
    },

    // 查看商品详情
    lookItem(id) {
      localStorage.setItem("Item", JSON.stringify(id));
      this.$router.push({ path: "/workindex" });
    },

    // 删除收藏
    deleteFavorite(id) {
      this.user = JSON.parse(localStorage.getItem("user"));
      var params = new URLSearchParams();
      params.append("commodityId", id.toString());
      axios
        .delete("http://47.115.209.249:8080/favorites", {
          headers: {
            satoken: this.user.token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          params,
        })
        .then((res) => {
          if (res.data.code == 200) alert("取消收藏成功");
          else alert("取消收藏失败");

          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }, //取消收藏
  },

  // 生命周期钩子：在组件创建完成后获取数据
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user == null) {
      alert("您还未登录，为您跳转到登录处");
      this.$router.push({ path: "/login" });
    }
    this.getArticles();
  },
};
</script>

<!-- 添加样式 -->
<style scoped>
.box {
  margin: 0 auto;
  max-width: 1200px;
}

.title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.tool {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.search {
  position: relative;
}

.article-img {
  width: 400px;
  height: 400px;
  object-fit: cover;
}
</style>
