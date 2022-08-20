import state from "./state";

const reducer =(prevState= state,action)=>{
    switch (action.type) {
        case 'set_playlist':
            prevState.set('playlist',action.payload)
            return prevState
        default:
            return prevState

    }

}

export default reducer