//引入了request 封装了axios
import request from '@/utils/request'
export default{
    //1.讲师列表（条件查询分页）
                    //当前页，每页记录数，条件对象
    addUser(user){
        return request({
            url: `/eduservice/user/register`,//+current+"/"+limit,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据,需要json类型
            //data表示把对象转换json传递给接口
            data:user,
            timeout: 36000
            // params
          })
    },
}