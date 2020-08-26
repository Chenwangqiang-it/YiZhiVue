//引入了request 封装了axios
import request from '@/utils/request'

export default{
    save(state){
        return request({
            url: `/eduservice/state/save`,
            method: 'post',
            data:state,
            timeout: 60000 // request timeou
            // params
          })
    },
    getStateListPage(current,limit,stateQuery){
        return request({
            url: `/eduservice/contract-state/pageStateCondition/${current}/${limit}`,//+current+"/"+limit,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据,需要json类型
            //data表示把对象转换json传递给接口
            data:stateQuery,
            timeout: 36000
            // params
          })
    },
    getUntreated(current,limit,stateQuery){
        return request({
            url: `/eduservice/contract-state/getUntreated/${current}/${limit}`,//+current+"/"+limit,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据,需要json类型
            //data表示把对象转换json传递给接口
            data:stateQuery,
            timeout: 36000
            // params
          })
    },
    update(state){
        return request({
            url: `/eduservice/state/update`,
            method: 'post',
            data:state,
            timeout: 36000
          })
    },
    updates(states){
        return request({
            url: `/eduservice/state/updates`,
            method: 'post',
            data:states,
            timeout: 36000
          })
    },
    deleteStateId(id){
        return request({
            url: `/eduservice/state/${id}`,
            method: 'delete',
            timeout: 36000
            // params
          })
    },
    getStateList(sid){
        return request({
            url: `/eduservice/contract-state/getState/${sid}`,
            method: 'get',
            timeout: 36000
          })
    }
}
