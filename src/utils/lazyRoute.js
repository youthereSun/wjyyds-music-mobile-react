import React, {lazy, Suspense} from 'react'
import Auth from "./auth";

const lazyRoute = (path, auth) => {
    const Component = lazy(() => import(`../views/${path}`))
    return (
        <Suspense fallback={<>loading...</>}>
            {
                auth ? <Auth>
                    <Component/>
                </Auth> : <Component/>
            }

        </Suspense>
    )
}

export default lazyRoute