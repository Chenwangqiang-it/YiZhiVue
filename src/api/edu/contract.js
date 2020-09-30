//引入了request 封装了axios
import request from '@/utils/request'

export default{
    addContract(contract){
        return request({
            url: `/eduservice/contract/upload`,
            method: 'post',
            data:contract,
            timeout: 60000 // request timeou
            // params
          })
    },
    getContract(id){
        return request({
            url: `/eduservice/contract/getContractByid/${id}`,
            method: 'get',
            timeout: 36000
          })
    },
    updateContract(contract){
        return request({
            url: `/eduservice/contract/update`,
            method: 'post',
            data:contract,
            timeout: 60000 // request timeou
            // params
          })
    },
    updateProject(contract){
        return request({
            url: `/eduservice/contract/updateProject`,
            method: 'post',
            data:contract,
            timeout: 60000 // request timeou
            // params
          })
    },
    auditProject(project){
        return request({
            url: `/eduservice/contract/auditProject`,
            method: 'post',
            data:project,
            timeout: 60000 // request timeou
            // params
          })
    },
    getContractCount(uid){
        return request({
            url: `/eduservice/contract/getContractCount/${uid}`,
            method: 'get',
            timeout: 60000 // request timeou
            // params
          })
    },
    getChangeContract(uid){
        return request({
            url: `/eduservice/contract/getChangeContract/${uid}`,
            method: 'post',
            timeout: 60000 // request timeou
            // params
          })
    },
    changeContract(change){
        return request({
            url: `/eduservice/contract/changeContract`,
            method: 'post',
            data:change,
            timeout: 60000 // request timeou
            // params
          })
    },
    addProject(addProject){
        return request({
            url: `/eduservice/contract/addProject`,
            method: 'post',
            data:addProject,
            timeout: 60000 // request timeou
            // params
        })
    },
    updateContract2(contract){
        return request({
            url: `/eduservice/contract/update2`,
            method: 'post',
            data:contract,
            timeout: 60000 // request timeou
            // params
          })
    }
}
