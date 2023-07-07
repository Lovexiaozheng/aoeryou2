<template> <!-- 定义模板 --> 
<div class="goods-box"> <!-- goods-box 类用于布局整个商品列表 -->

  <section class="nes-container with-title">
    <h3 class="title">全部商品</h3>  
    <!-- 标题 -->
    
    <div class="goods-list">
      <!-- goods-list 类用于网格布局商品项 -->
      
      <div class="goods-item" v-for="item in goodsList" :key="item.id"> 
        <!-- goods-item 类用于每一个商品项, 使用 v-for 循环渲染列表 -->
        <!-- :key 属性用于给每个节点设置一个 key,提高渲染效率和性能 -->
        
        <div class="goods-img" @mouseover="showInfo(item.id)" @mouseout="hideInfo(item.id)">
          <!-- goods-img 类用于商品图片,使用 @mouseover 和 @mouseout 监听鼠标移入和移出事件,显示和隐藏商品详情信息 -->
          
          <img :src="item.images" alt="" /> 
          <div class="goods-info-hover" :id="'goods-info-' + item.id">
            <!-- goods-info-hover 类用于鼠标移入后显示的商品详情信息,通过 :id 接收 item.id 生成唯一 id -->
            <h4>{{ item.commodityName }}</h4>  
            <!-- 商品名称 -->
            
            <p>{{ item.commodityDescribe }}</p>  
            <!-- 商品描述 -->
          </div>
        </div>
        
        <div class="goods-info">
          <div class="goods-title">{{ item.commodityName }}</div>
          <!-- 商品名称 -->
          
          <div class="goods-price">¥{{ item.price }}</div>  
          <!-- 商品价格 -->
          
          <div class="goods-btn">
            <!-- goods-btn 类用于商品操作按钮组 -->
            
            <a href="#" class="nes-badge">
              <!-- nes-badge 类用于按钮样式 -->
              
              <span class="is-warning" @click="addfa(item.id)">
                <!-- is-warning 类用于按钮颜色,@click 监听点击事件,调用 addfa() 方法,传递商品 ID -->
                
                <i class="nes-icon star is-small"></i>立即收藏
              </span>
            </a>
            
            <a href="#" class="nes-badge is-splited" @click="lookItem(item.id)">
              <!-- is-splited 类用于按钮分割线 -->
              
              <span class="is-dark">查看</span> 
              <span class="is-success">详细</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div> </template>

<script>

import axios from "axios";
// 创建 axios 实例
const instance = axios.create({
  // ... 其他配置项
});

export default {
  name: "Index",
  data() {
    return {
      user: {},
      goodsList: {},
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user == null) {
      alert("您还未登录，为您跳转到登录处");
      this.$router.push({ path: "/login" });
    }
    // 添加响应拦截器
    instance.interceptors.response.use(
      (response) => {
        // 对响应数据进行处理
        if (response.data.data && response.data.data.list) {
          response.data.data.list = response.data.data.list.map((item) => {
            // 使用 String 或 BigNumber 将 item.id 转换为字符串
            const stringId = String(item.id);

            // 返回一个新对象，其中 id 属性已经是字符串类型
            return { ...item, id: stringId };
          });
        }
        return response;
      },
      (error) => {
        // 对响应错误进行处理
        return Promise.reject(error);
      }
    );

    // 使用实例发送请求
    instance
      .get("http://47.115.209.249:8080/commodity", {
        headers: {
          satoken: this.user.token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          currentPage: "", // 默认为空
          pageSize: "", // 默认为空
          commodityKey: "", // 默认为空
        },
      })
      .then((res) => {
        console.log(res);
        this.goodsList = res.data.data.list;
        console.log(this.goodsList);
      });
  },
  methods: {
    showInfo(id) {
      document.getElementById(`goods-info-${id}`).style.display = "block";
    },
    hideInfo(id) {
      document.getElementById(`goods-info-${id}`).style.display = "none";
    }, //预览商品
    addCart(item) {
      this.$store.commit("addCart", item);
    },
    // 查看商品详情
    lookItem(id) {
      localStorage.setItem("Item", JSON.stringify(id));
      this.$router.push({ path: "/workindex" });
    },
    // 收藏商品
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
          if (res.data.code == 200) alert(res.data.msg);
          else alert(res.data.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
/* 整个商品列表容器的样式 */
.goods-box {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 8rem;
}

/* 当屏幕宽度小于等于 768px 时，调整顶部外边距 */
@media (max-width: 768px) {
  .goods-box {
    margin-top: 4rem;
  }
}

/* 商品列表的栅格布局样式 */
.goods-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 10px;
  justify-items: center;
  column-gap: 20px;
  row-gap: 20px;
}

/* 单个商品容器的样式 */
.goods-item {
  margin-bottom: 10px;
  width: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  transition: transform 0.3s ease;
}

/* 鼠标悬停在商品容器上时的样式 */
.goods-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 商品图片容器的样式 */
.goods-img {
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 5px;
}

/* 商品图片的样式 */
.goods-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* 鼠标悬停在商品图片上时的样式 */
.goods-img:hover img {
  transform: scale(1.1);
}

/* 悬浮商品信息的样式 */
.goods-info-hover {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  opacity: 0.9;
  border-radius: 5px;
}

/* 悬浮商品信息的标题样式 */
.goods-info-hover h4 {
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: bold;
}

/* 悬浮商品信息的描述样式 */
.goods-info-hover p {
  font-size: 14px;
  line-height: 1.4;
}

/* 商品信息容器的样式 */
.goods-info {
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* 商品名称的样式 */
.goods-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

/* 商品价格的样式 */
.goods-price {
  font-size: 14px;
  color: #f00;
  margin-bottom: 10px;
}

/* 收藏和查看详情按钮容器的样式 */
.goods-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
