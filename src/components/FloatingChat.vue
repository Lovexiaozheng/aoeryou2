<template>
  <div style="z-index: 999">
    <div class="floating-chat-icon" @click="toggleChat">
      <i class="nes-octocat animate"></i>
    </div>
    <div class="chat-window" v-show="isChatVisible">
      <div>
        <div class="chat-header">
          <span>我的联系人</span>
          <span class="close-chat" @click="closeChatWindow">x</span>
        </div>
        <div v-if="user">
          <ul class="contact-list">
            <!-- 使用 v-for 指令遍历 "links" 数组。为每个联系人创建一个列表项，并为其分配一个唯一键。 -->
            <li v-for="(link, index) in links" :key="index" @dblclick="openChat(link.id)">
              <!-- 如果联系人角色是 'admin'，则显示一个图标，并为其添加 'admin-icon' 类以限制大小。 -->
              <div v-if="link.role === 'admin'">
                <img v-bind:src="link.avatar" alt="头像" class="avatar" />
              </div>
              <!-- 如果联系人角色不是 'admin'，则显示他们的头像。 -->
              <div v-else>
                <img v-bind:src="link.avatar" alt="头像" class="avatar" />
              </div>
              <!-- 创建一个包含用户名和消息信息的容器。 -->
              <div class="username-container">
                <!-- 显示格式化后的用户名。根据联系人角色和认证状态为用户名添加不同的类。 -->
                <span class="username" :class="{
                  'admin-name': link.role === 'admin',
                  verified: link.certification,
                  unverified: !link.certification,
                }">
                  {{ formatUsername(link) }}
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>您还没登陆，请前往登陆。</div>
      </div>
      <Chat v-if="isChat" @close="closeChat" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chat from "./Chat.vue";

export default {
  components: {
    Chat,
  },
  data() {
    return {
      user: {},
      userId: {},
      links: [],
      isChat: false,
      isChatVisible: false,
      socket: null, //socket连接
    };
  },
  created: function () {
    this.isChatVisible = false;
    this.user = JSON.parse(localStorage.getItem("user"));
    axios
      .get("http://47.115.209.249:8080/chatLinks/getChatLinks", {//获取联系人列表
        headers: { satoken: this.user.token },
      })
      .then((res) => {
        console.log(res);
        this.links = res.data.data;
        console.log(this.links);
      });
    axios
      .get("http://47.115.209.249:8080/user", {//获取用户id
        headers: { satoken: this.user.token },
      })
      .then((res) => {
        console.log(res);
        this.userId = res.data.data.id;

        // 在这里创建 WebSocket 实例
        this.socket = new WebSocket(
          "ws://47.115.209.249:8080/ws/chat/" + this.userId
        );

        // 添加事件处理器
        this.socket.addEventListener("open", this.onSocketOpen);
        this.socket.addEventListener("message", this.onSocketMessage);
        this.socket.addEventListener("error", this.onSocketError);
        this.socket.addEventListener("close", this.onSocketClose);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    toggleChat() {
      this.isChatVisible = !this.isChatVisible;
      axios
        .get("http://47.115.209.249:8080/chatLinks/getChatLinks", {//获取联系人列表
          headers: { satoken: this.user.token },
        })
        .then((res) => {
          console.log(res);
          this.links = res.data.data;
          console.log(this.links);
        });
    },
    closeChatWindow() {
      //关闭联系人列表
      this.isChatVisible = false;
    },
    openChat(link) {
      //打开聊天窗口
      this.isChat = true;
      localStorage.setItem("chatLink", JSON.stringify(link));
      localStorage.setItem("userId", JSON.stringify(this.userId));
    },

    closeChat() {
      //关闭聊天窗口
      this.isChat = false;
    },
    formatUsername(link) {//格式化用户名
      if (link.role === "admin") {
        return "系统消息";
      }
      return link.username;
    },
    onSocketOpen(event) {//socket连接
      console.log("WebSocket 已打开：", event);
    },

    onSocketMessage(event) {//socket消息
      console.log("WebSocket 收到消息：", event.data);
      // 根据收到的消息更新联系人列表的 latestMessage
      const messageData = JSON.parse(event.data);
      // 根据 senderId 和 recipientId 找到联系人
      const link = this.links.find(
        (l) => l.id === messageData.senderId || l.id === messageData.recipientId
      );
      if (link) {
        link.latestMessage = {
          content: messageData.content,
          isRead: messageData.isRead,
        };
      }
    },

    onSocketError(event) {//socket错误
      console.error("WebSocket 发生错误：", event);
    },

    onSocketClose(event) {//socket关闭
      console.log("WebSocket 已关闭：", event);
    },
  },

  beforeDestroy() {
    // 关闭 WebSocket 连接
    if (this.socket) {
      this.socket.close();
    }
  },
};
</script>


<style scoped>
/* 聊天图标的样式 */
.floating-chat-icon {
  position: fixed; /* 固定定位，相对于浏览器窗口进行定位 */
  bottom: 20px; /* 距离底部20像素 */
  right: 20px; /* 距离右侧20像素 */
  cursor: pointer; /* 鼠标悬停时显示手形图标 */
}

/* 聊天窗口的样式 */
.chat-window {
  position: fixed; /* 固定定位，相对于浏览器窗口进行定位 */
  bottom: 20px; /* 距离底部20像素 */
  right: 20px; /* 距离右侧20像素 */
  width: 300px; /* 宽度为300像素 */
  height: 400px; /* 高度为400像素 */
  background-color: white; /* 背景颜色为白色 */
  border-radius: 10px; /* 圆角半径为10像素 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* 添加阴影效果 */
  overflow-y: auto; /* 当内容高度超过窗口高度时，显示垂直滚动条 */
  display: flex; /* 使用flex布局 */
  flex-direction: column; /* 设置flex布局为垂直排列 */
}

/* 关闭聊天窗口按钮的样式 */
.close-chat {
  cursor: pointer; /* 鼠标悬停时显示手形图标 */
  font-weight: bold; /* 字体加粗 */
  margin-left: auto; /* 自动设置左边距，将按钮向右对齐 */
  padding: 0 5px; /* 左右内边距为5像素 */
  float: right; /* 向右浮动 */
  color: red; /* 文本颜色为红色 */
}

/* 聊天窗口顶部的样式 */
.chat-header {
  background-color: #4a76a8; /* 背景颜色为深蓝色 */
  color: white; /* 文本颜色为白色 */
  font-size: 1.1rem; /* 字体大小为1.1rem */
  padding: 10px; /* 内边距为10像素 */
  border-radius: 10px 10px 0 0; /* 设置顶部左右圆角半径为10像素 */
}

/* 联系人列表的样式 */
.contact-list {
  padding: 0; /* 内边距为0 */
  margin: 0; /* 外边距为0 */
  list-style-type: none; /* 列表项无标记 */
}

/* 联系人列表项的样式 */
.contact-list li {
  display: flex; /* 使用flex布局 */
  align-items: center; /* 垂直居中对齐子元素 */
  padding: 10px; /* 内边距为10像素 */
  border-bottom: 1px solid #e0e0e0; /* 底部边框为1像素的灰色实线 */
}

/* 联系人列表项鼠标悬停的样式 */
.contact-list li:hover {
  background-color: #f0f0f0; /* 背景颜色变为浅灰色 */
}

/* 联系人头像的样式 */
.avatar {
  width: 50px; /* 宽度为50像素 */
  height: 50px; /* 高度为50像素 */
  border-radius: 50%; /* 设置圆形头像 */
  margin-right: 10px; /* 右边距为10像素 */
}

/* 用户名的样式 */
.username {
  font-size: 1rem; /* 字体大小为1rem */
  flex-grow: 1; /* 在flex布局中允许自动填充剩余空间 */
}

/* 管理员用户名的样式 */
.username.admin-name {
  color: #4a76a8; /* 文本颜色为深蓝色 */
}

/* 已认证用户名的样式 */
.username.verified {
  color: green; /* 文本颜色为绿色 */
}

/* 未认证用户名的样式 */
.username.unverified {
  color: red; /* 文本颜色为红色 */
}

/* 用户名容器的样式 */
.username-container {
  display: flex; /* 使用flex布局 */
  flex-direction: column; /* 设置flex布局为垂直排列 */
  flex-grow: 1; /* 在flex布局中允许自动填充剩余空间 */
}

/* 消息信息的样式 */
.message-info {
  display: flex; /* 使用flex布局 */
  justify-content: space-between; /* 子元素之间平均分配空间 */
  font-size: 0.8rem; /* 字体大小为0.8rem */
  margin-top: 5px; /* 上边距为5像素 */
}

/* 最新消息的样式 */
.latest-message {
  font-size: 0.9rem; /* 字体大小为0.9rem */
  white-space: nowrap; /* 文本不换行 */
  overflow: hidden; /* 超出容器部分隐藏 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  max-width: 170px; /* 最大宽度为170像素 */
}

/* 消息时间的样式 */
.message-time {
  font-size: 0.9rem; /* 字体大小为0.9rem */
}

/* 联系人在线状态的样式 */
.online-status {
  width: 10px; /* 宽度为10像素 */
  height: 10px; /* 高度为10像素 */
  border-radius: 50%; /* 设置圆形状态指示器 */
  border: 1px solid white; /* 边框为1像素的白色实线 */
}

/* 联系人实名的样式 */
.online-status.online {
  background-color: green; /* 背景颜色为绿色 */
}

/* 联系人未实名的样式 */
.online-status.offline {
  background-color: red; /* 背景颜色为红色 */
}
</style>