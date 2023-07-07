<template>
  <div class="nes-container with-title is-centered product-post-container">
    <p class="title">修改商品</p>
    <form @submit.prevent="submitForm">
      <div class="nes-field">
        <label for="commodityName" class="input-label">商品名称</label>
        <input type="text" id="commodityName" v-model="formData.commodityName" class="nes-input input-field" required />
      </div>

      <div class="nes-field">
        <label for="commodityDescribe" class="input-label">商品描述</label>
        <textarea id="commodityDescribe" v-model="formData.commodityDescribe" class="nes-textarea input-field"
          required></textarea>
      </div>

      <div class="nes-field">
        <label for="price" class="input-label">价格</label>
        <input type="number" id="price" v-model="formData.price" class="nes-input input-field" required />
      </div>

      <div class="nes-field">
        <label for="images" class="input-label">商品图片</label>
        <input type="file" id="images" @change="onFileChange" class="nes-input input-field" required />
      </div>

      <div class="preview-container" v-if="previewImage">
        <img :src="previewImage" alt="预览图片" class="preview-image" />
      </div>

      <div class="button-container">
        <button type="submit" class="nes-btn is-primary custom-btn">
          更新商品
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
        id: "",
      },
      user: JSON.parse(localStorage.getItem("user")),
      previewImage: "",
    };
  },
  created() {
    if (this.user == null) {
      alert("您还未登录，为您跳转到登录处");
      this.$router.push({ path: "/login" });
    }
    var workid = JSON.parse(localStorage.getItem("updateItem"));
    this.user = JSON.parse(localStorage.getItem("user"));
    if (workid == null) {
      alert("请选择您要修改的商品");
      this.$router.push({ path: "/list" });
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
          this.formData.commodityDescribe = res.data.data.commodityDescribe;
          this.formData.commodityName = res.data.data.commodityName;
          this.formData.price = res.data.data.price;
          this.previewImage = res.data.data.images;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.previewImage = URL.createObjectURL(file);
      this.formData.images = file;
    },
    submitForm() {
      const formData = new FormData();
      formData.append("commodityName", this.formData.commodityName);
      formData.append("commodityDescribe", this.formData.commodityDescribe);
      formData.append("price", this.formData.price);
      formData.append("files", this.formData.images);
      formData.append("id", JSON.parse(localStorage.getItem("updateItem")));

      axios
        .put("http://47.115.209.249:8080/commodity", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            satoken: this.user.token,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            alert("更新成功");
            this.$router.push({ path: "/list" });
          } else {
            alert("更新失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goBack() {
      // 返回上一页
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.product-post-container {
  margin-top: 5%;
  background-color: #f9f9f9;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.input-label {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
  display: block;
}

.input-field {
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  font-size: 1rem;
}

.input-field:focus {
  border-color: #6598ff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1),
    0 0 0 2px rgba(101, 152, 255, 0.5);
}

.nes-field {
  margin-bottom: 20px;
}

.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.preview-image {
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.custom-btn {
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  border-radius: 6px;
}
</style>
