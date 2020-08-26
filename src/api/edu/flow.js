import request from '@/utils/request'

export default{
    addFlow(flow){
        return request({
            url: `/eduservice/flow/save`,
            method: 'post',
            data:flow,
            timeout: 36000
          })
    },
    getFlowListPage(current,limit,flowQuery){
        return request({
            url: `/eduservice/flow-index/pageFlowCondition/${current}/${limit}`,//+current+"/"+limit,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据,需要json类型
            //data表示把对象转换json传递给接口
            data:flowQuery,
            timeout: 36000
            // params
          })
    },
    getUntreated(current,limit,flowQuery){
        return request({
            url: `/eduservice/flow-index/getUntreated/${current}/${limit}`,//+current+"/"+limit,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据,需要json类型
            //data表示把对象转换json传递给接口
            data:flowQuery,
            timeout: 36000
            // params
          })
    },
    getFlowById(id){
        return request({
            url: `/eduservice/flow-index/getFlow/${id}`,
            method: 'get',
            timeout: 36000
          })
    },
    updateFlow(flow){
        return request({
            url: `/eduservice/flow/update`,
            method: 'post',
            data:flow,
            timeout: 36000
          })
    },
    updateFlows(flow){
        return request({
            url: `/eduservice/flow/updates`,
            method: 'post',
            data:flow,
            timeout: 36000
          })
    },
    deleteById(id){
        return request({
            url: `/eduservice/flow/${id}`,
            method: 'delete',
            timeout: 36000
            // params
          })
    }
    
}