import router from '@/router/index'
import invoice from '@/api/edu/invoice'
import flow from '@/api/edu/flow'
import mail from '@/api/edu/mail'
import { mapGetters } from 'vuex'
export function countInvoice(roles) {
    let query={}
    if(roles.jurisdiction==3||roles.jurisdiction==4)
    query.uid=roles.uid
    invoice.countInvoice(query)
    .then(res=>{
        router.options.routes[9].children[1].meta.count=res.data.count
        // console.log(router.options)
    })
}
export function countMail(roles) {
    let query={}
    if(roles.jurisdiction==3||roles.jurisdiction==4)
    query.uid=roles.uid
    mail.countMail(query)
    .then(res=>{
        router.options.routes[8].children[2].meta.count=res.data.count
    })
}
export function getUntreatedCount(roles) {
    let query={}
    query.jurisdiction=parseInt(roles.jurisdiction)
    query.uid=roles.uid
    flow.getUntreated(1,1,query)
    .then(res=>{
        router.options.routes[6].children[0].meta.count=res.data.total
    })
}
export function initCount(roles) {
    countInvoice(roles)
    countMail(roles)
    getUntreatedCount(roles)
}