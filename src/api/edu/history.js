//引入了request 封装了axios
import request from '@/utils/request'

export default{
    addHistory(history){
        return request({
            url: `/eduservice/history/save`,
            method: 'post',
            data:history,
            timeout: 36000
          })
    },
    getHistorys(id){
        return request({
            url: `/eduservice/history/getHistory/${id}`,
            method: 'get',
            timeout: 36000
          })
    },
    getHistorysByfid(id){
        return request({
            url: `/eduservice/history-views/getHistory/${id}`,
            method: 'post',
            timeout: 36000
          })
    }
}
