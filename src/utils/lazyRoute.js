import React, {lazy, Suspense, useEffect} from 'react'
import Auth from "./auth";
import Transition from "./transition";
import {connect} from 'react-redux'

const LazyRoute = ({setAppTitle,path, auth, animate,title}) => {

    useEffect(()=>{
        //通过redux修改apptitle
        setAppTitle(title)
    },[title])
    const Component = lazy(() => import(`../views/${path}`))
    return (
        <Suspense fallback={<>loading...</>}>
            {
                auth ?
                    <Auth>
                        {
                            animate ? <Transition>
                                <Component/>
                            </Transition> : <Component/>
                        }
                    </Auth> :

                        animate? <Transition>
                            <Component/>
                        </Transition> : <Component/>

            }
        </Suspense>
    )
}
const mapDispatchToProps={
    setAppTitle:(payload)=>{
        return {
            type:'set_app_title',
            payload
        }
    }
}

export default connect(null,mapDispatchToProps) (LazyRoute)