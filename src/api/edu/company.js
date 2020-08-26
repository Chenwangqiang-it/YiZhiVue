//引入了request 封装了axios
import request from '@/utils/request'

export default{
    getCompany(){
        return request({
            url: `/eduservice/company/getCompany`,
            method: 'post',
            timeout: 36000
          })
    },
}
