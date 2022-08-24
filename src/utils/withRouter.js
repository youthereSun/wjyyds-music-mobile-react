//解决非函数组件不能跳转的问题
import {useParams,useLocation,useNavigate} from 'react-router-dom'

const withRouter =(Component)=>{


  return (props)=>{
      const match=useParams()
      const location=useLocation()
      const push=useNavigate()

      return <Component {...props} history={{push ,match,location}} />
  }


}

export default withRouter