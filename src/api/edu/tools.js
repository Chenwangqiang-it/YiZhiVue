//引入了request 封装了axios
import request from '@/utils/request'

export default{
    getUploadPercent(){
        return request({
            url: `/eduservice/tools/percent`,
            method: 'get',
            timeout: 36000
        })
    },
    resetPercent(){
        return request({
            url: `/eduservice/tools/reset`,
            method: 'post',
            timeout: 36000
        })
    },
    editEviCard(formData){
        return request({
            url: `/eduservice/tools/jpgTopdf`,
            method: 'post',
            data:formData,
            timeout: 36000
          })
    },
}
