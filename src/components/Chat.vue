
<template>
  <!-- 聊天界面的外层容器，当 isOpen 为真时显示 -->
  <div class="chat-wrapper" v-show="isOpen">
    <!-- 聊天界面的主容器，使用 nes.css 样式库的暗色主题 -->
    <div class="nes-container is-dark chat-container">
      <!-- 关闭按钮，点击时发出 'close' 事件 -->
      <button class="nes-btn is-error close-button" @click="$emit('close')">
        关闭
      </button>
      <!-- 消息列表区域 -->
      <section class="message-list" id="message-list" ref="messageList">
        <!-- 使用 v-for 循环遍历 chatHistory 数组中的每个消息 -->
        <div v-for="msg in chatHistory" :key="msg.id" class="message"
          :class="{ 'message-green': msg.senderId === userId }">
          <!-- 显示消息的发送时间 -->
          {{ msg.createTime }}:
          <!-- 如果消息类型为1（图片），显示图片 -->
          <img v-if="msg.type === 1" :src="msg.content" class="message-image" @dblclick="previewImage(msg.content)"
            alt="image" />
          <!-- 否则，显示文本消息 -->
          <span v-else>{{ msg.content }}</span>
        </div>
      </section>
      <!-- 聊天输入区域 -->
      <section class="chat-input">
        <!-- 文本输入框 -->
        <div class="nes-field">
          <label for="text_message">发送消息</label>
          <textarea class="nes-textarea" id="text_message" v-model="message"></textarea>
        </div>
        <!-- 操作按钮 -->
        <div class="action-buttons">
          <!-- 隐藏的图片文件选择框 -->
          <input type="file" id="image_file" @change="uploadImage" style="display: none" />
          <!-- 发送文本消息按钮 -->
          <button class="nes-btn is-primary" @click="sendMessage">发送</button>
          <!-- 发送图片按钮 -->
          <button class="nes-btn is-warning" @click="selectImage">
            发送图片
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),// 用户信息
      chaterId: JSON.parse(localStorage.getItem("chatLink")),// 聊天对象 id
      userId: JSON.parse(localStorage.getItem("userId")),// 用户 id
      isOpen: true,// 是否打开聊天窗口
      message: "",// 发送的消息
      file: "",// 上传的图片
      chatHistory: [],// 聊天记录
      websocket: null, // 添加 websocket 属性
    };
  },
  async created() {
    try {
      this.user = JSON.parse(localStorage.getItem("user"));
      console.log("this.user.token", this.user.token);
      const response = await axios.get(
        "http://47.115.209.249:8080/chatMessage/getChatHistory",
        {
          params: {
            chaterId: this.chaterId,
          },
          headers: {
            satoken: this.user.token,
          },
        }
      );
      this.chatHistory = response.data.data.reverse(); // 倒序输出聊天记录

      this.initWebSocket(); // 初始化 WebSocket
    } catch (error) {
      console.error(error);
    }
  },
  beforeDestroy() {
    if (this.websocket) {
      this.websocket.close(); // 关闭 WebSocket 连接
    }
  },
  methods: {
    previewImage(imageUrl) {
      window.open(imageUrl);
    },
    initWebSocket() {
      this.websocket = new WebSocket(
        "ws://47.115.209.249:8080/ws/chat/" + this.userId
      );

      this.websocket.addEventListener("message", (event) => {
        const receivedMessage = JSON.parse(event.data);
        this.chatHistory.push(receivedMessage);// 将新消息添加到 chatHistory 数组中
      });

      this.websocket.addEventListener("close", (event) => {
        console.log("WebSocket closed:", event);
      });

      this.websocket.addEventListener("error", (event) => {
        console.error("WebSocket error:", event);
      });
    },
    closeChat() {
      this.isOpen = false;
    },

    sendMessage() {
      // 如果 WebSocket 连接已打开
      if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
        const messageToSend = {
          senderId: this.userId,
          recipientId: this.chaterId,
          content: this.message,
          type: 0,
          isRead: 0,
        };
        const messageToSendCopy = {
          senderId: this.userId,
          recipientId: this.chaterId,
          content: this.message,
          type: 0,
          isRead: 0,
          createTime: new Date().toISOString(), // 添加 createTime 属性，以便在显示时具有正确的时间戳
        };
        this.websocket.send(JSON.stringify(messageToSend));
        this.chatHistory.push(messageToSendCopy); // 将新消息添加到 chatHistory 数组中
        this.message = ""; // 清空输入框
      }
    },
    selectImage() {
      document.getElementById("image_file").click();// 触发文件选择框
    },
    async uploadImage(e) {
      this.file = e.target.files[0];
      // 在此处实现上传图片的逻辑，并获取图片 URL
      const imageUrl = await this.uploadFileAndGetUrl();// 调用 uploadFileAndGetUrl 方法
      if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
        const messageToSend = {
          senderId: this.userId,
          recipientId: this.chaterId,
          content: imageUrl,
          type: 1,
          isRead: 0,
        };
        const messageToSendCopy = {
          senderId: this.userId,
          recipientId: this.chaterId,
          content: imageUrl,
          type: 1,
          isRead: 0,
          createTime: new Date().toISOString(), // 添加 createTime 属性，以便在显示时具有正确的时间戳
        };
        this.websocket.send(JSON.stringify(messageToSend));
        this.chatHistory.push(messageToSendCopy);
      }
    },
    async uploadFileAndGetUrl() {
      const formData = new FormData();
      formData.append("file", this.file);
      try {
        const response = await axios.post(
          "http://47.115.209.249:8080/chatMessage/uploadChatImage",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              satoken: this.user.token, // 添加 satoken 到 headers 中
            },
          }
        );
       
       return response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
/* 样式定义 */

/* 聊天窗口包裹器样式 */
.chat-wrapper {
  position: fixed;         /* 固定定位 */
  right: 20px;             /* 距离右侧的距离 */
  bottom: 20px;            /* 距离底部的距离 */
  max-width: 400px;        /* 最大宽度 */
  width: 100%;             /* 宽度 */
}

/* 聊天窗口容器样式 */
.chat-container {
  position: relative;      /* 相对定位 */
}

/* 关闭按钮样式 */
.close-button {
  position: absolute;      /* 绝对定位 */
  top: 10px;               /* 距离顶部的距离 */
  right: 10px;             /* 距离右侧的距离 */
}

/* 消息图片样式 */
.message-image {
  width: 200px;            /* 宽度 */
  height: 200px;           /* 高度 */
  object-fit: cover;       /* 图片缩放方式 */
  cursor: pointer;         /* 鼠标指针样式 */
}

/* 消息列表样式 */
.message-list {
  height: 300px;           /* 高度 */
  overflow-y: auto;        /* 垂直滚动条 */
  margin-bottom: 20px;     /* 下外边距 */
  margin-top: 35px;        /* 上外边距 */
}

/* 聊天输入框样式 */
.chat-input .nes-field {
  margin-bottom: 10px;     /* 下外边距 */
}

/* 动作按钮容器样式 */
.action-buttons {
  display: flex;           /* 使用 Flexbox 布局 */
  justify-content: space-between;  /* 子元素之间平均分配空间 */
}

/* 绿色消息文本样式 */
.message-green {
  color: green;            /* 文字颜色 */
}
</style>
