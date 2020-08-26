import request from '@/utils/request'

export function login(phoneNum, upassword) {
  return request({
    url: '/eduservice/user/login',
    method: 'post',
    data: {
      phoneNum,
      upassword
    },
    timeout: 36000
  })
}

export function getInfo(token) {
  return request({
    url: '/eduservice/user/info',
    method: 'get',
    params: { token },
    timeout: 36000
  })
}

export function logout(token) {
  return request({
    url: '/eduservice/user/logout',
    method: 'post',
    params: { token },
    timeout: 36000
  })
}
