import {Navigate} from "react-router-dom";
import {store} from "../redux";

//路由权鉴
const Auth =(props)=>{
    //在store中获取数据进行判断
    //console.log( 'store',store.getState())
    let isLogin = localStorage.getItem('token')
    return  isLogin? props.children:<Navigate to={'/login'} replace />
}
export default Auth