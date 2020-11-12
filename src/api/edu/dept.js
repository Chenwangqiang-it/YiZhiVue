import request from '@/utils/request'

export default{
    getList(){
        return request({
            url: `/eduservice/dept/list`,
            method: 'post',
            timeout: 36000
          })
    },
    
}