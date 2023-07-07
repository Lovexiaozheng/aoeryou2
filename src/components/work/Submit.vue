<template>
  <div class="nes-container with-title is-centered product-post-container">
    <!-- 标题 -->
    <p class="title">发布商品</p> 
    <form @submit.prevent="submitForm">
      <!-- 商品名称输入 -->
      <div class="nes-field">
        <label for="commodityName" class="input-label">商品名称</label> 
        <input type="text" id="commodityName" v-model="formData.commodityName" class="nes-input input-field" required />
      </div>
 
      <!-- 商品描述输入 --> 
      <div class="nes-field">
        <label for="commodityDescribe" class="input-label">商品描述</label>  
        <textarea id="commodityDescribe" v-model="formData.commodityDescribe" class="nes-textarea input-field"
          required></textarea>
      </div>
 
      <!-- 价格输入 -->  
      <div class="nes-field">
        <label for="price" class="input-label">价格</label>   
        <input type="number" id="price" v-model="formData.price" class="nes-input input-field" required />
      </div>
 
      <!-- 商品图片选择 -->  
      <div class="nes-field">
        <label for="images" class="input-label">商品图片</label>   
        <input type="file" id="images" @change="onFileChange" class="nes-input input-field" required />
      </div>
 
      <!-- 预览图片 -->
      <div class="preview-container" v-if="previewImage">
        <img :src="previewImage" alt="预览图片" class="preview-image" />
      </div>
 
      <!-- 按钮容器 -->
      <div class="button-container">
        <button type="submit" class="nes-btn is-primary custom-btn">
          发布商品
        </button>
        <button type="button" class="nes-btn is-default custom-btn" @click="goBack">
          返回上一页 
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
   
      formData: {
        commodityName: "",
        commodityDescribe: "",
        price: "",
        images: "",
      },
 
      user: {},  
    
      previewImage: "",
    };
  },
  created() {
    // <!-- 获取本地存储的用户信息 -->
    this.user = JSON.parse(localStorage.getItem("user")); 
    if (this.user == null) {
      // <!-- 未登录则跳转到登录页面 -->  
      alert("您还未登录,为您跳转到登录处");  
      this.$router.push({ path: "/login" });
    }
  },
  methods: {
    // <!-- 文件选择更改事件 -->
    onFileChange(e) {  
      const file = e.target.files[0];
      this.previewImage = URL.createObjectURL(file);
      this.formData.images = file;
    },
    // <!-- 提交表单 -->
    submitForm() {  
      const formData = new FormData(); 

      formData.append("commodityName", this.formData.commodityName);
      formData.append("commodityDescribe", this.formData.commodityDescribe);
      formData.append("price", this.formData.price);
      formData.append("files", this.formData.images);  

      axios
        .post("http://47.115.209.249:8080/commodity", formData, {
          headers: {
            satoken: this.user.token,  
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {  
          console.log(res);
          if (res.data.code === 200) {
            alert("发布成功");
            this.$router.push({ path: "/list" });
          } else {
            alert("发布失败");
          }
        })
        .catch((err) => {  
          console.log(err);
        });
    },
    // <!-- 返回上一页 -->
    goBack() {   
      this.$router.go(-1);  
    },
  },
};
</script>

<style scoped>
/* 商品发布容器 */
.product-post-container {
  margin-top: 5%;  /* 距顶部5% */
  background-color: #f9f9f9; /* 背景色 */
  padding: 25px;   /* 内边距 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影 */
}

/* 标题 */
.title {
  font-size: 1.5rem;  /* 字体大小 */
  font-weight: bold; /* 字体加粗 */
  color: #333; /* 字体颜色 */
  margin-bottom: 1rem; /* 下边距 */  
}

/* 标签 */
.input-label {
  font-size: 1.1rem; /* 字体大小 */
  color: #333; /* 字体颜色 */
  margin-bottom: 0.5rem; /* 下边距 */
  display: block; /* 块级元素 */   
}

/* 输入框 */
.input-field {
  border: 1px solid #ccc; /* 边框 */ 
  border-radius: 6px; /* 圆角 */
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* 内阴影 */
  transition: all 0.3s ease; /* 过渡 */
  font-size: 1rem; /* 字体大小 */ 
}

/* 获得焦点后输入框样式 */
.input-field:focus {
  border-color: #6598ff; /* 边框颜色 */
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1),  /* 内阴影 */
    0 0 0 2px rgba(101, 152, 255, 0.5); /* 外发光 */
}

/* 间距 */
.nes-field {
  margin-bottom: 20px; 
}

/* 图片预览容器 */
.preview-container {
  display: flex; /* 伸缩布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */ 
  margin-bottom: 20px; /* 下边距 */  
}

/* 预览图片 */
.preview-image {
  max-width: 200px; /* 最大宽度 */
  max-height: 200px; /* 最大高度 */ 
  object-fit: cover; /* 覆盖 */
  border-radius: 8px; /* 圆角 */
}

/* 按钮容器 */
.button-container {
  display: flex; /* 伸缩布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  gap: 1rem; /* 间距 */
}  

/* 自定义按钮 */ 
.custom-btn {
  padding: 0.5rem 1.5rem; /* 内边距 */
  font-size: 1rem; /* 字体大小 */
  border-radius: 6px; /* 圆角 */
}
</style>