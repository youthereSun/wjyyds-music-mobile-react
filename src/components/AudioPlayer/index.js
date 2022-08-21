import React, {useEffect, useRef} from 'react';
import {createRoot} from 'react-dom/client'
import {getSongUrl} from "../../api/api";
import ReactDom from "react-dom";
//
// const Index = () => {
//     const sourceRef = useRef()
//     const audioRef = useRef()
//
//     useEffect(()=>{
//         window.refs={
//             sourceRef,audioRef
//         }
//     },[])
//
//     const playMusic=async (id)=>{
//         if(id){
//             let res=await getSongUrl(id)
//             let src=res.data[0].url
//             sourceRef.value.src=src
//             audioRef.value.load()
//         }
//         audioRef.value.play()
//     }
//
//     const pauseMusic=()=>{
//         audioRef.value.pause()
//     }
//     return (
//         <div>
//             <audio style={{display:'none'}} ref={audioRef} controls>
//                 <source ref={sourceRef}/>
//                 您的浏览器不支持 audio 元素。
//             </audio>
//
//         </div>
//     );
// };

class Index extends React.Component {
    audioRef=React.createRef()
    sourceRef=React.createRef()
     pauseMusic=()=>{
      this. audioRef.current.pause()
    }

     playMusic=async (id)=>{
        if(id){
            let res=await getSongUrl(id)
            let src=res.data[0].url
            this.sourceRef.current.src=src
            this.audioRef.current.load()
        }
        this.audioRef.current.play()
    }

    componentDidMount() {
        debugger
    }

    render() {
        return (
            <div>
                <audio style={{display:'none'}} ref={this.audioRef} controls>
                    <source ref={this.sourceRef}/>
                    您的浏览器不支持 audio 元素。
                </audio>

            </div>
        );
    }
}





let div
let ref=React.createRef()
const audioPlayer={
    play:(id)=>{
        debugger
        if(!div){
           div =document.createElement('div')
            div.id='wjyyds-audio-player'
            createRoot(div).render(<Index ref={ref} />)
            document.body.appendChild(div)

        }
       if(ref.current){
           ref.current.playMusic(id)
       }else {
           //处理不能立即拿到ref的情况
           setTimeout(()=>{
               ref.current.playMusic(id)
           },0)
       }
    },
    pause:()=>{
        ref.current.pauseMusic()
    }
}

export default audioPlayer






