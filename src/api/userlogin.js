import request from '@/utils/request'

export default{
 login(user) {
  return request({
    url: '/eduservice/user/login',
    method: 'post',
    data:user,
    timeout: 36000
  })
}
}