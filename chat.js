
/*
 * 客服端咨询大厅代码

 * 1，聊天功能实现

 * 2，新增会话（todo）
 * 3，未读消息（todo）
 * 4，恢复会话（todo）
 * 5，移除会话(同时删除本地记录？)（todo）
 * 6，结束会话（todo）

 * 7，快捷回复（todo）
 * 8，被评分通知（todo）

 * 9，防止恶意刷屏（todo）
 * 10，敏感词检测（todo）

 * 11，切换客服（todo）
 * 12，离线消息（todo）
 * 13，历史记录（todo）
 * 14，敏感词检测（todo）

 * 15，发送表情（todo）
 * 16，发送图片（todo）
 * 17，发送链接，地图（todo）

 * 18，接入微信或第三方会话（todo）
 * 19，接入CRM系统（todo）
 * 20，接入客服考勤系统（todo）
 *
 */




/*
 * 1，进入页面，首先检测是否能连接融云服务器，如果不能链接，提示错误信息
 * 2，初始化聊天列表
 * 3，初始化消息服务器，接受全部会话
 * 4，开始对话
 * 5，会话管理
 * 6，如果不支持本地存储，则选择备用方案。(todo,优先在内存中操作消息队列)
 *
 */

// 客户端专用逻辑，检测用户登录后，获取用户的id,token和昵称
// 收到父窗口的消息后，发起chat请求
function mockToken(id,callback){
  $.get('/common/users/rongcloud_token?id='+id)
   .done(function(data){
     callback(data.response.token, id);
   })
}

function rongchat(token,id){
    // 阻止默认事件
    function stopDefault(e) {
        //阻止默认浏览器动作(W3C)
        if ( e && e.preventDefault ){
          e.preventDefault();
        }else{
          window.event.returnValue = false;
        }
    }

    function RongIM(option){
      this.RONGIM_KEY = option.key;
      // this.userInfo = $('#person-info').data();
      // this.token = this.userInfo.token;
      // this.userid = this.userInfo.id;
       this.token = option.token;
       this.userid = option.id;

      this.init();
    }

    RongIM.prototype.init = function () {
      var that = this;
      try{
        RongIMClient.init(this.RONGIM_KEY);
      }catch(e){
        chat.showMessage({
          content: '系统：连接到服务器失败，请稍后刷新页面再试',
          type: 'system',
          time: new Date().getTime()
        });
        return;
      }
      this.setConnect();
      this.getMessage();

    };

    RongIM.prototype.getMessage = function () {
       RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function (message) {
            // 判断消息类型
            switch(message.messageType){
                case RongIMClient.MessageType.TextMessage:
                    // 当接受到消息时
                    chat.resMsg(message);
                    console.log(chat.messages);
                    //log(message.content.content,'system',message.senderUserId,+new Date());
                    //发送的消息内容将会被打印
                    break;
                case RongIMClient.MessageType.ImageMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.DiscussionNotificationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.LocationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.RichContentMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.DiscussionNotificationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.InformationNotificationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.ContactNotificationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.ProfileNotificationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.CommandNotificationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.CommandMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.UnknownMessage:
                    // do something...
                    break;
                default:
                    // 自定义消息
                    // do something...
            }
        }
      });
    };

    RongIM.prototype.sendMessage = function (content,userid) {
      var msg = new RongIMLib.TextMessage({content: content,extra:""}),
          conversationtype = RongIMLib.ConversationType.PRIVATE,
          that = this;

       RongIMClient
       .getInstance()
       .sendMessage(conversationtype, userid+'', msg,{
            // 发送消息成功
            onSuccess: function (message) {
              chat.showMessage({
                content: content,
                type: 'me',
                time: new Date().getTime()
              })
            },
            onError: function (errorCode,message) {
                var info = '';
                switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        info = '超时';
                        break;
                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        info = '未知错误';
                        break;
                    case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                        info = '在黑名单中，无法向对方发送消息';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                        info = '不在讨论组中';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_GROUP:
                        info = '不在群组中';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                        info = '不在聊天室中';
                        break;
                    default :
                        info = x;
                        break;
                }
            }
          }
      );
    };

    // 连接融云服务器
    RongIM.prototype.setConnect = function () {

      var that = this;

       RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
          switch (status) {
            //链接成功
            case RongIMLib.ConnectionStatus.CONNECTED:
                break;
            //正在链接
            case RongIMLib.ConnectionStatus.CONNECTING:
                break;
            //重新链接
            case RongIMLib.ConnectionStatus.DISCONNECTED:
                break;
            //其他设备登陆
            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                break;
            //网络不可用
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
              break;
          }
        }
      });

      // 连接融云服务器。
      RongIMClient.connect(that.token, {
        onSuccess: function(userId) {
          chat.showMessage({
            content: '系统：已经连接到服务器',
            type: 'system',
            time: new Date().getTime()
          });
        },
        onTokenIncorrect: function() {

        },
        onError:function(errorCode){
              var info = '';
              switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                  info = '超时';
                  break;
                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                  info = '未知错误';
                  break;
                case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                  info = '不可接受的协议版本';
                  break;
                case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                  info = 'appkey不正确';
                  break;
                case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                  info = '服务器不可用';
                  break;
              }
              console.log(errorCode);
            }
      });

    };





    function Chat(){
      this.messages = {}; // 会话列表
      this.current = ''; // 正在和谁会话
      this.form = $('.message-form');
      this.list = $('.list-wrap').find('ul');
      this.box = $('.messages-box');
      this.title = $('#chater-name');
      this.btn = $('#send-message');
      this.textarea = $('#textarea-message');

      this.init();
    }


    Chat.prototype.init = function () {

      this.buildList();
      this.sendMessage();
      this.changeCurrent();

    };

    // 初始化聊天列表
    Chat.prototype.buildList = function () {
      // 从本地存储中取得会话数据

    };

    // 获取聊天列表长度
    Chat.prototype.getCount = function () {
      return this.list.find('li').length;
    };

    // 创建新的会话对象
    Chat.prototype.addChaterData = function (username, userId) {
      this.messages[userId] = {
        title: username,
        messages: [],
        unread: [],
        lastTime: new Date().getTime()
      };
      this.list.append(this.addChater(username, userId));
    };

    // 接收到消息的处理流程
    Chat.prototype.resMsg = function (msg) {
      var userId = msg.senderUserId,
          username = '',
          msgData = {
            content: msg.content.content,
            type: 'other',
            time: new Date().getTime()
          };

      // 如果会话列表为空,创建新会话并激活
      if(!this.getCount()){
        this.addChaterData(username, userId);
        this.storeReaded(userId, msgData);
        this.setCurrent(userId);
        this.showMessage(msgData);
      }else{
        // 消息列表不为空

        // 接受消息的会话不存在，创建该会话，并进入未读消息
        if(!this.messages[userId]){
          this.addChaterData(username, userId);
          this.storeUnread(userId, msgData);

        }else{
          // 接受消息的会话存在，且未被激活,进入未读消息
          if(msg.senderUserId != this.current){
            this.storeUnread(userId, msgData);

          }else{
            // 接受消息的会话存在，且被激活,直接展示
            this.showMessage(msgData);
            this.storeReaded(userId, msgData);
          }
        }
      }
    };

    // 点击规划师的处理流程
    Chat.prototype.ask = function (data) {
      var userId = data.id,
          username = data.name;

      if(!this.messages[userId]){
        this.addChaterData(username, userId);
      }
      this.setCurrent(userId);
    };

    // 存放未读消息
    Chat.prototype.storeUnread = function (userId, msgData) {
      // 存放未读消息时，改变未读消息条数
      this.messages[userId].unread.push(msgData);
      this.messages[userId].lastTime = msgData.time;
      this.list
      .find('[aid="'+userId+'"]')
      .find('.unread')
      .html(this.messages[userId].unread.length)
      .show();
    };

    // 存放已读消息
    Chat.prototype.storeReaded = function (userId, msgData) {
      this.messages[userId].messages.push(msgData);
      this.messages[userId].lastTime = msgData.time;
    };


    // 新增会话
    Chat.prototype.addChater = function (name,id) {
      var html = '<li aid="'+id+'">'
                +'  <div class="chater">'
                +'    <div class="avatar">'
                +'    </div>'
                +'    <div class="content">'
                +'      <div class="time">刚刚</div>'
                +'      <div class="unread"></div>'
                +'      <h4>'+name+'</h4>'
                +'      <p></p>'
                +'    </div>'
                +'  </div>'
                +'</li>';

      return html;
    };

    // 消息发送
    Chat.prototype.sendMessage = function () {
      var that = this;

      this.btn.on('click',function(e){
        stopDefault(e);
        if($(this).attr('disable'))return;

        var val = that.textarea.val();
        rong.sendMessage(val,that.current);
        that.box.scrollTop(99999);
        setTimeout(function(){
          that.textarea.val('').focus();
        },100)
      })

    };

    // 消息展示
    Chat.prototype.showMessage = function (message) {
      var msgs = '',that = this;

      // 数组
      if(Object.prototype.toString.call(message) !== '[object Array]'){
        msgs = this.buildMessage(message);
      }else{
        $.each(message,function(i,n){
          msgs += that.buildMessage(n);
        });
      }

      this.box.append(msgs);

    };

    // 构建单条聊天信息（todo：使用字符串模板）
    Chat.prototype.buildMessage = function (message) {
      return '<div class="message '+message.type+'"><div class="avatar"></div><p>'+message.content+'</p></div>';
    };

    // 切换聊天用户
    Chat.prototype.changeCurrent = function () {

      var that = this;
      this.list.on('click','li',function(){
        if($(this).hasClass('active'))return;
        that.setCurrent($(this).attr('aid'));
      });

    };

    // 定位活动会话
    Chat.prototype.setCurrent = function (id) {

      // 修改用户指针，修改消息窗口用户名，选中消息列表，展示内存消息
      var msg = this.messages[id],
          that = this,
          msgs = msg.messages,
          unread = msg.unread;

      this.current = id;
      this.title.html(msg.title);
      this.box.html('');
      this.list.find('li').removeClass('active');
      this.list.find('[aid="'+id+'"]').addClass('active')
      .find('.unread')
      .html(0)
      .hide();

      // 如果有未读消息，则将未读消息push到全部消息,并改变状态
      if(unread.length){
        [].push.apply(msg.messages, unread);
        msg.unread = [];
      }

      this.showMessage(msgs);
      this.btn.removeAttr('disable');
    };

   var chat = new Chat();
   var rong = new RongIM({
    key: 'qd46yzrf472kf',
    token: token,
    id: id
  });

    // 从父级窗口传递客服信息
    window.addEventListener('message', receiver, false);

    function receiver(e) {
      if(e.source != window.parent) return;
      var data = JSON.parse(e.data);
      chat.ask(data);
    }

}

$(function(){

  mockToken('35',function(token,id){
    rongchat(token,id)
  });

})
