import request from '@/utils/request'

export default{
    addInvoice(invoice){
        return request({
            url: `/eduservice/invoice/save`,
            method: 'post',
            data:invoice,
            timeout: 36000
          })
    },
    updateInvoice(invoice){
        return request({
            url: `/eduservice/invoice/update`,
            method: 'post',
            data:invoice,
            timeout: 36000
          })
    },
    getInvoiceListPage(current,limit,stateQuery){
        return request({
            url: `/eduservice/invoice-views/pageInvoiceCondition/${current}/${limit}`,//+current+"/"+limit,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据,需要json类型
            //data表示把对象转换json传递给接口
            data:stateQuery,
            timeout: 36000
            // params
          })
    },
    getInvoiceById(id){
        return request({
            url: `/eduservice/history-invoice/getInvoiceById/${id}`,
            method: 'post',
            timeout: 36000
          })
    },
    getInvoice(id){
        return request({
            url: `/eduservice/invoice-views/getInvoiceById/${id}`,
            method: 'post',
            timeout: 36000
          })
    },
    countInvoice(historyQuery){
        return request({
            url: `/eduservice/history-invoice/countInvoice`,//+current+"/"+limit,
            method: 'post',
            data:historyQuery,
            timeout: 36000
            // params
          })
    },
    pageHistoryInvoiceCondition(current,limit,historyQuery){
        return request({
            url: `/eduservice/history-invoice/pageHistoryInvoiceCondition/${current}/${limit}`,//+current+"/"+limit,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据,需要json类型
            //data表示把对象转换json传递给接口
            data:historyQuery,
            timeout: 36000
            // params
          })
    },
}