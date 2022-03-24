<template>
  <div class="email">
    <div class="route-wrap">
      <div class="message-list">
        <h4>留言板</h4>
        <ul>
          <li class="message-item" v-for="(item, i) in list" :key="i">
            <el-card>
              <div class="msg-wrap">
                <div class="row1">
                  <p class="name"><strong>发布者：</strong>{{item.name}}</p>
                  <p class="time">{{item.createTime}}</p>
                </div>
                <div class="content">{{item.content}}</div>
              </div>
              <div class="msg-wrap">
                <div class="row1">
                  <p class="name"><strong>院长回复：</strong></p>
                  <p class="time">{{item.replyTime}}</p>
                </div>
                <div class="content">{{item.reply}}</div>
              </div>
            </el-card>
          </li>
        </ul>
      </div>
      <div class="level-msg-wrap">
        <div class="left-part">
          <h4>请您留言</h4>
          <el-form :model="detail" ref="form" :rules="formRules" label-width="150px" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名：" prop="name">
                  <el-input v-model="detail.name" :clearable="true" placeholder="请输入姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别：" prop="sex">
                  <el-radio-group v-model="detail.sex"
                  :style="{width: ''}">
                    <el-radio :style="{display: true ? 'inline-block' : 'block'}" :label="item.value"
                              v-for='(item, index) in sexOpts' :key="item.value">
                        {{item.label}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="地区：" prop="city">
                  <el-input v-model="detail.city" :clearable="true" placeholder="请输入姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="地址：" prop="address">
                  <el-input v-model="detail.address" :clearable="true" placeholder="请输入地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          <el-row>
              <el-col :span="12">
                <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="detail.phone" :clearable="true" placeholder="请输入手机号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱：" prop="email">
                  <el-input v-model="detail.email" :clearable="true" placeholder="请输入邮箱"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="el-row">
              <el-form-item label="主题" prop="subject">
                <el-input v-model="detail.subject" placeholder="主题"></el-input>
              </el-form-item>
            </div>
            <div class="el-row">
              <el-form-item label="留言内容：" prop="content">
                <el-input type="textarea" class="input-content"  :autosize="{ minRows: 6, maxRows: 6}" v-model="detail.content" style="width: 100%;"></el-input>
              </el-form-item>
            </div>
            <div class="el-row vcc-code">
              <el-form-item label="验证码：" prop="vccCode" :class="[]" ref="vccFormItem">
                <el-input v-model="detail.vccCode" :clearable="true" style="width: 150px" placeholder="请输入验证码"></el-input>
                <el-button @click="getVccImg" :disabled="vcc.hasGetVccImg">获取验证码{{ vcc.src ? ' ' + vcc.expire / 1000 : '' }}</el-button>
                <img style="cursor: pointer;" @click="resetVccImg" v-show="vcc.src" :src="vcc.src" alt />
              </el-form-item>
            </div>
            <div class="email-form-footer">
              <el-button @click="cancel" size="small">取 消</el-button>
              <el-button class="submit-btn" @click="submit" :loading="loading" size="small">提 交</el-button>
            </div>
          </el-form>
        </div>
        <div class="right-part">
          <div class="row row1">
            <div class="bd-line"></div>
            <h4>温馨提示</h4>
          </div>
          <div class="row-content">
            <p>您好，欢迎您来到院长信箱！欢迎随时监督服务人员工作</p>
            <p class="tips">监督电话：<span class="tel">{{config.hotline}}</span></p>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>

import { Vcc, createMessage } from '@/api/vcc'
import { getMessageList } from '@/api/email'

import { mapGetters } from 'vuex'

let defaultDetail = {
  name: null,
  sex: null,
  city: null,
  address: null,
  phone: null,
  email: null,
  subject: null,
  content: null,
  vccCode: null,
}

export default {
  name: 'Email',
  data() {
    let self = this;
    var checkVccCode = (rule, value, callback) => {
      console.log('校验验证码');
      if (!value) {
        return callback(new Error('验证码不能为空'));
      } else {
        self.vcc && self.vcc.verifyVcc(self.detail.vccCode).then(res=>{
          if (res.code == 200) {
            callback();
          } else {
            return callback(new Error('验证码错误'));
          }
        })
        
      }
    };
    return {
      list: [
        {
          name: '',
          createTime: '',
          content: '',
          reply: '',
          replyTime: ''
        }
      ],
      sexOpts: [
        {label: '男',value: '1'},
        {label: '女',value: '0'},
      ],
      loading: false,
      detail: Object.assign({}, defaultDetail),
      vcc: new Vcc({}, '/vcc/image'),
      formRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'change' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          {
            pattern: /^1[3|4|5|6|7|8][0-9]\d{8}$/,
            message: '请输入正确的手机号'
          },
        ],
        vccCode: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          // { validator:checkVccCode }
        ],
        content: [
          {min: 0, max: 300, message: '长度小于300 个字符', trigger: 'change'}
        ]
      },
    }
  },
  computed: {
    ...mapGetters(['config']),
  },
  mounted(){
    this.getList()
  },
  methods: {
    getList(){
      getMessageList().then(res=> {
        this.$set(this, 'list', res.data.list)
      })
    },
    getVccImg(){
      this.vcc.getImgSrc()
    },
    cancel(){
      this.$refs.form.resetFields()
      this.vcc.reset()
    },
    resetVccImg(){
      this.vcc.reset()
      this.vcc.getImgSrc()
    },
    submit(){
      this.$refs.form.validate(valid=> {
        if(valid){
          this.sendReq()
        }
      })
    },
    reset(){
      this.$refs.form.resetFields();
      this.vcc.reset();
    },
    sendReq(){
      createMessage(Object.assign({vccToken: this.vcc.token}, this.detail)).then(res=> {
        if(res.code == 200){
          this.$message.success('留言成功，审核成功后将展示')
          this.vcc.reset()
          this.reset()
        }
      }).catch(err=> {
        if(typeof err == 'object'){
          this.$message.error(err.message)
        }else{
          this.$message.error('验证码错误')
        }
        this.resetVccImg()
      })
    }
  }
}
</script>
<style lang="scss">
.email{
  .el-textarea__inner, .el-input__inner, .el-radio__inner{
    border-color: $mainTheme;
  }
  // .el-textarea__inner::-webkit-input-placeholder, .el-input__inner::-webkit-input-placeholder, .el-radio__inner::-webkit-input-placeholder{
  //   color: $mainTheme;
  // }
  .submit-btn{
    color: #fff;
    background-color: $mainTheme;
  }

  .level-msg-wrap{
    display: flex;
  }
  .message-list{
    margin-bottom: 40px;
    >h4{
      line-height: 50px;
      text-indent: 20px;
      font-size: 24px;
      font-weight: 500;
      border-bottom: 2px solid #b5b5b5;
      margin-bottom: 20px;
    }
  }

  .message-item{
    margin-bottom: 10px;
    line-height: 26px;
    font-size: 14px;
    .el-card {
      box-shadow: 0 2px 12px 0 rgba(181,179,179,0.1)
    }
    .row1{
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      .time{
        color: #a2a2a2;
      }
    }
    .content{
      color: #8b8b8b;
    }
  }

  .left-part{
    flex: 1;
    margin-right: 100px;
      h4{
      font-size: 24px;
      font-weight: 500;
      line-height: 50px;
      text-indent: 20px;
      border-bottom: 2px solid $greyBd;
      margin-bottom: 20px;
    }
  }
  .right-part{
    width: 320px;
  }
  .row1{
    position: relative;
    h4{
      font-size: 26px;
      font-weight: 500;
      display: inline-block;
      padding: 0;
      line-height: 54px;
      border-bottom: 3px solid rgb(152, 98, 24);
      position: relative;
      z-index: 1;
    }
    .bd-line{
      position: absolute;
      bottom: 0;
      height: 2px;
      background-color: rgb(182, 182, 182);
      width: 100%;
    }
  }
  .row-content{
    color: #333;
    p:nth-child(1){
      font-size: 16px;
      margin-top: 20px;
      text-indent: 32px;
      font-weight: 600;
    }
    p.tips{
      margin-top: 20px;
      font-size: 24px;
      font-weight: 600;
      color: $mainTheme;
      span.tel{
        font-style: oblique;
      }
    }
  }
}
.email-form-footer{
  text-align: center;
}

@media screen and(max-width: 600px){
  .email{
    .route-wrap{
      .message-list>h4, .level-msg-wrap h4{
        font-size: 16px;
        font-weight: 600;
        width: 100%;
      }

      .message-item{

        .row1{
          display: block;
          .time{
            font-size: 10px;
          }
        }
        .msg-wrap + .msg-wrap{
          margin-top: 5px;
        }
      }
      .level-msg-wrap{
        display: block;
        .left-part{
          width: 100%;
          .el-row{
            .el-col, .el-form-item{
              margin-left: 0;
              width: 100%;
              .el-form-item__label{
                width: 80px!important;
              }
              .el-form-item__content{
                margin-left: 80px!important;
              }
            }
          }
          .vcc-code{
            .el-input{
              width: calc(100% - 115px)!important;
            }
            img{
              margin-top: 8px;
            }
          }
        }
        .right-part{
          display: none;
        }
      }
    }
    
  }
}
</style>

