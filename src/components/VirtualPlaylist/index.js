import React, {useEffect, useRef, useState} from 'react';

const Index = (props) => {
    //itemHeight:50px
    const {list, itemHeight} = props
    const [offsetTop, setOffsetTop] = useState(0)
    const [viewPortList,setViewPortList] =useState([])
    const listRef = useRef()
    let viewPortItemCount

    const scrollHandler = () => {
        setOffsetTop(listRef.current.scrollTop)
        let firstIndex=Math.floor(listRef.current.scrollTop/itemHeight)
        let lastIndex = firstIndex+ viewPortItemCount
        let l=list.filter((v,i)=> i<lastIndex&& i>=firstIndex )

        setViewPortList(l)
    }

    useEffect(() => {
        viewPortItemCount=Math.ceil( listRef.current.clientHeight/itemHeight+1)
       if(list.length!=0){
           scrollHandler()
           listRef.current.addEventListener('scroll', scrollHandler)
       }

        return ()=>{
           if(listRef.current){
               listRef.current.removeEventListener('scroll', scrollHandler)
           }
        }
    }, [list])

    return (
        <div ref={listRef} id={'wjyyds-virtual-list-view-port'}
             style={{height: '100%', overflow: 'scroll'}}>
            <div ref={listRef} style={{height: `${list.length * itemHeight}px`,position:'relative'}}>
                {
                    viewPortList.map((v,i)=>{
                        return (
                            <div   key={v.id} style={{height:`${itemHeight}px`,position:'absolute',top:`${Math.floor(offsetTop/itemHeight + i)*itemHeight}px`,width:'100%'}}>
                                {
                                    props.children({offsetTop,itemHeight,v,i})
                                }
                            </div>
                        )
                    })
                }
            </div>

        </div>

    );
};

export default Index;

