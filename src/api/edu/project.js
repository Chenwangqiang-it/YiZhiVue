//引入了request 封装了axios
import request from '@/utils/request'

export default{
    addProject(project){
        return request({
            url: `/eduservice/project/saves`,
            method: 'post',
            data:project,
            timeout: 60000 // request timeou
            // params
          })
    },
    list(cid){
        return request({
            url: `/eduservice/project/list/${cid}`,
            method: 'post',
            timeout: 60000 // request timeou
            // params
          })
    },
    updateProject(project){
        return request({
            url: `/eduservice/project/updates`,
            method: 'post',
            data:project,
            timeout: 60000 // request timeou
            // params
          })
    },
    
}
