import request from "@/utils/request";


export async function getVccToken(params) {
  let defaultParams = {
    expire: 60000,
    size: 4,
    type: 0
  }
  return request({
    url: `/vcc/token`,
    method: "get",
    params: Object.assign({}, defaultParams, params)
  });
}

//token , code
export async function verifyVcc(params) {
  return request({
    url: '/vcc/validate',
    method: 'get',
    params
  })
}

export function createMessage(data) {
  return request({
    url: '/portal/dean-mailbox/add',
    method: 'post',
    data
  })
}

export class Vcc {
  defaultOptions = {
    hasGetVccImg: false,
    src: null,
    token: null,
    expire: 60000,
    timer: null,
  }

  constructor(params, api) {
    this.params = params;
    this.api = api;
    Object.assign(this, this.defaultOptions)
  }
  //获取验证码图片链接
  async getImgSrc() {
    let { data: token } = await getVccToken()
    this.token = token;
    this.src = `${this.api}?token=${token}`
    this.hasGetVccImg = true
    this.startTimer()
    return this.src
  }
  //开始计时器
  startTimer() {
    this.timer = setInterval(() => {
      if (this.expire <= 0) {
        clearInterval(this.timer)
        this.reset()
      }
      this.expire -= 1000
    }, 1000);
  }
  //校验验证码
  verifyVcc(code) {
    return verifyVcc({
      token: this.token,
      code
    })
  }
  //重置验证码
  reset() {
    Object.assign(this, this.defaultOptions)
  }
}