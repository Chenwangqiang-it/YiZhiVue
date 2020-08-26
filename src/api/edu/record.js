//引入了request 封装了axios
import request from '@/utils/request'

export default{
    addRecord(record){
        return request({
            url: `/eduservice/record/save`,
            method: 'post',
            data:record,
            timeout: 36000
          })
    },
    addRecords(record){
        return request({
            url: `/eduservice/record/saves`,
            method: 'post',
            data:record,
            timeout: 36000
          })
    },
    getRecord(cid){
        return request({
            url: `/eduservice/record/getrecord/${cid}`,
            method: 'get',
            timeout: 36000
          })
    }
}
