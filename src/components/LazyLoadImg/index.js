import React, {useEffect, useRef} from 'react';

const Index = (props) => {
    const imgRef = useRef()
    useEffect(() => {
        let callback = (entries) => {
            entries.forEach(v => {
                const {target, isIntersecting} = v
                if (isIntersecting) {
                    target.src = target.getAttribute('lazy_src')
                    observer.unobserve(target)
                    observer.disconnect()
                }
            })
        }
        let options = {
            threshold:0
        };
        let observer = new IntersectionObserver(callback,options)
        observer.observe(imgRef.current)
    }, [])

    return <img className={props.className} lazy_src={props.lazy_src} ref={imgRef}/>;
};

export default Index;