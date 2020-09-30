//引入了request 封装了axios
import request from '@/utils/request'

export default{
    //1.讲师列表（条件查询分页）
                    //当前页，每页记录数，条件对象
    getUserListPage(current,limit,userQuery){
        return request({
            url: `eduservice/user/pageUserCondition/${current}/${limit}`,//+current+"/"+limit,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据,需要json类型
            //data表示把对象转换json传递给接口
            data:userQuery
            // params
          })
    },
    delteteacherId(id){//删除
        return request({
            url: `/eduservice/user/deleteUser/${id}`,
            method: 'delete',
            // params
          })
    },
    // addTeacher(teacher){//添加讲师
    //     return request({
    //         url: '/eduservice/teacher/addTeacher',
    //         method: 'post',
    //         data: teacher
    //     })
    // },
    getUserInfo(id){//根据id查询
        return request({
            url: `eduservice/user/getUser/${id}`,
            method: 'get',
            async: false
        })
    },
    ChangeUser(user){
        return request({
            url: `/eduservice/user/getChangeUser`,
            method: 'post',
            data: user
        })
    },
    updateUser(user){//修改
        return request({
            url: `/eduservice/user/updateUser`,
            method: 'post',
            data: user
        })
    },
    getAgent(){//根据id查询
        return request({
            url: `eduservice/user/getAgent`,
            method: 'post',
        })
    },
    getFlow(){//获取流程
        return request({
            url: `eduservice/user/getFlow`,
            method: 'post',
            timeout: 36000
        })
    },
    getFinance(){//获取财务
        return request({
            url: `eduservice/user/getFinance`,
            method: 'post',
            timeout: 36000
        })
    },
    getManagement(){//获取财务
        return request({
            url: `eduservice/user/getManagement`,
            method: 'post',
            timeout: 36000
        })
    },
}
