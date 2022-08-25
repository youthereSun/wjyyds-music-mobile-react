//redux-promise中间件 处理一个返回的promise
//redux-promise 处理一个异步action
import {getPersonalized} from "../../api/api";

//redux-promise
const fetchPersonalList=async ()=>{
    let res =await getPersonalized()
    return({
        type:'set-personal-list',
        payload:res.result
    })

}

//redux-thunk
const fetchPersonalListT= ()=>{
      return (dispatch)=>{
          getPersonalized().then(res=>{
              dispatch ({
                  type:'set-personal-list',
                  payload:res.result
              })
          })
      }
}
export {fetchPersonalList}