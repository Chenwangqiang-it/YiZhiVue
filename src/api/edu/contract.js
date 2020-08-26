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
