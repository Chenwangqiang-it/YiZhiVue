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
    getInvoiceByIid(id){
        return request({
            url: `/eduservice/invoice/getInvoiceById/${id}`,
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
    saveMail(mail){
        return request({
            url: `/eduservice/mail/save`,//+current+"/"+limit,
            method: 'post',
            data:mail,
            timeout: 36000
            // params
          })
    },
    updateMail(uid,mail){
        return request({
            url: `/eduservice/mail/update/${uid}`,//+current+"/"+limit,
            method: 'post',
            data:mail,
            timeout: 36000
            // params
          })
    },
    getMailRecordListById(id){
        return request({
            url: `/eduservice/mail-record-view/getMailRecordListById/${id}`,
            method: 'post',
            timeout: 36000
        })
    },
    getMailOptions(){
        return request({
            url: `/eduservice/mail/getMailOptions`,//+current+"/"+limit,
            method: 'get',
            timeout: 36000
            // params
        })
    },
    getMailById(id){
        return request({
            url: `/eduservice/history-mail/getMailById/${id}`,
            method: 'post',
            timeout: 36000
        })
    },
    pageMailCondition(current,limit,mailQuery){
        return request({
            url: `/eduservice/mail-view/pageMailCondition/${current}/${limit}`,//+current+"/"+limit,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据,需要json类型
            //data表示把对象转换json传递给接口
            data:mailQuery,
            timeout: 36000
            // params
          })
    },
    countMail(historyMailQuery){
        return request({
            url: `/eduservice/history-mail/countMail`,
            method: 'post',
            data:historyMailQuery,
            timeout: 36000
            // params
          })
    },
    pageHistoryMailCondition(current,limit,historyMailQuery){
        return request({
            url: `/eduservice/history-mail/pageHistoryMailCondition/${current}/${limit}`,//+current+"/"+limit,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据,需要json类型
            //data表示把对象转换json传递给接口
            data:historyMailQuery,
            timeout: 36000
            // params
          })
    },
}