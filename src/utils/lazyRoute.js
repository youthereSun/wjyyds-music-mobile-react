import React, {lazy, Suspense} from 'react'
import Auth from "./auth";
import Transition from "./transition";

const LazyRoute = ({path, auth, animate}) => {
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

export default LazyRoute