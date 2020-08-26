//引入了request 封装了axios
import request from '@/utils/request'

export default{
    addMessage(msg){
        return request({
            url: `/eduservice/message/save`,
            method: 'post',
            data:msg,
          })
    },
    addMessages(msg){
        return request({
            url: `/eduservice/message/saves`,
            method: 'post',
            data:msg,
          })
    },
    getMessageListPage(flowQuery){
        return request({
            url: `/eduservice/message/pageMessageCondition`,//+current+"/"+limit,0000000
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据,需要json类型
            //data表示把对象转换json传递给接口
            data:flowQuery,
            timeout: 36000
            // params
          })
    },
    updateMessage(msg){
        return request({
            url: `/eduservice/message/update`,
            method: 'post',
            data:msg,
            timeout: 36000
          })
    },
    getCount(uid){
        return request({
            url: `eduservice/message/getCount/${uid}`,
            method: 'post',
            async: false,
            timeout: 36000
        })
    },
    getNewest(uid){
        return request({
            url: `eduservice/message/getNewest/${uid}`,
            method: 'post',
            async: false,
            timeout: 36000
        })
    },
}
