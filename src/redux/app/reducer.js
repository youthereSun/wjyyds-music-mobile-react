import state from "./state";
import {fromJS} from 'immutable'
const reducer =(prevState= state,action)=>{
    let newState=fromJS(prevState)
    switch (action.type) {
        case 'set_app_title':
            return newState.set('appTitle',action.payload).toJS()
        case 'set_playlist':
            return newState.set('playlist',action.payload).toJS()
        case 'set_play_status':
            return newState.set('isPlay',action.payload).toJS()
        case 'set_playing_info':
            return newState.set('playingInfo',action.payload).toJS()
        case 'add_to_playlist':
            let list=newState.get('playlist')
            //list 的元素为Map，用get获取属性
            let index= list.findIndex(v=>v.get('id')==action.payload.id)
            if(index==-1){
                return newState.set('playlist',list.push(action.payload)).toJS()
            }else {
                return newState.toJS()
            }

        default:
            return newState.toJS()

    }

}

export default reducer