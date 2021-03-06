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
    getUntreatedCount(flowQuery){
        return request({
            url: `/eduservice/flow-index/getUntreatedCount`,
            method: 'post',
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
    getAwait(current,limit,flowQuery){
        return request({
            url: `/eduservice/flow-index/getAwait/${current}/${limit}`,//+current+"/"+limit,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据,需要json类型
            //data表示把对象转换json传递给接口
            data:flowQuery,
            timeout: 36000
            // params
          })
    },
    pageEnd(current,limit,flowQuery){
        return request({
            url: `/eduservice/flow-index/pageEnd/${current}/${limit}`,//+current+"/"+limit,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据,需要json类型
            //data表示把对象转换json传递给接口
            data:flowQuery,
            timeout: 36000
            // params
          })
    },
    pageUnfinished(current,limit,flowQuery){
        return request({
            url: `/eduservice/flow-index/pageUnfinished/${current}/${limit}`,//+current+"/"+limit,
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
    updateProjectFlow(flow){
        return request({
            url: `/eduservice/flow/updateProjectFlow`,
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
    },
    getFlowCount(uid){
        return request({
            url: `/eduservice/flow/getFlowCount/${uid}`,
            method: 'get',
            timeout: 60000 // request timeou
            // params
          })
    },
    changeFlowAgentId(change){
        return request({
            url: `/eduservice/flow/changeFlowAgent`,
            method: 'post',
            data:change,
            timeout: 60000 // request timeou
            // params
          })
    },
    changeFlowAgent(id){
        return request({
            url: `/eduservice/flow-index/changeFlowAgent/${id}`,
            method: 'post',
            timeout: 60000 // request timeou
            // params
          })
    }
}