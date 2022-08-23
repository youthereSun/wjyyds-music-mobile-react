import {useEffect} from 'react'
//图片懒加载hook
const useLazyLoad = (list) => {
    let observer
    const initLazyLoad = () => {
        let callback = (entries) => {
            entries.forEach(v => {
                const {target, isIntersecting} = v
                if (isIntersecting) {
                    if (!target.src) {
                        target.src = target.getAttribute('lazy_src')
                    }
                    observer.unobserve(target)
                }
            })
        }
        let options = {
            threshold: 0
        };
        observer = new IntersectionObserver(callback, options)
        let imgs = document.getElementsByTagName('img')
        Array.from(imgs).forEach(v => observer.observe(v))

        // return ()=>{observer.disconnect()}
    }


    useEffect(() => {
        console.log('数据变化了，开始处理图片懒加载！')
        initLazyLoad()
        return ()=>observer.disconnect()

    }, [list])

}

export default useLazyLoad