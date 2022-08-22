import React from 'react';
import './style.less'
import {createRoot} from 'react-dom/client'
import { ThunderboltFilled} from '@ant-design/icons';


// const Index = () => {
//     const [messages,setMessages] =useState([])
//
//     const addMessage =(item)=>{
//         setMessages([...messages,item])
//     }
//
//     return (
//         <div className={'wjyyds-toast-message'}>
//             {
//                 messages.map(v=>{
//                     return (
//                         <div key={v.id} className={'wjyyds-toast-message-item'}>
//                             {v.text}
//                         </div>
//                     )
//                 })
//             }
//
//         </div>
//     );
// };


class Index extends React.Component {
    state = {
        messages: []
    }

    addItem = (item) => {
        const {id, autoClose, delay} = item
        this.setState({
            messages: [...this.state.messages, item]
        }, () => {
        })

        if(autoClose){
            setTimeout(()=>{
                this.setState({
                    messages:this.state.messages.filter(v=>v.id!==id)
                })
            },delay)
        }
    }
    handleClose=(id)=>{
        this.setState({
            messages:this.state.messages.filter(v=>v.id!==id)
        })
    }

    render() {
        return (
            <div className={'wjyyds-toast-message'}>
                {
                    this.state.messages.map(v => {
                        return (
                            <div key={v.id} className={'wjyyds-toast-message-item'}>
                                {v.text} {!v.autoClose &&<ThunderboltFilled style={{color:'#E91E63'}} onClick={()=>this.handleClose(v.id)} />}
                            </div>
                        )
                    })
                }

            </div>
        );
    }
}


let defaultOption = {
    text: 'code by [wjyyds],designed by [Jsenny]',
    autoClose: true,
    delay: 3000
}

let container;
let toastRef = React.createRef()
const toastMessage = {
    show: (option) => {
        let id = new Date().getTime()
        option = {...defaultOption, ...option, id}
        if (!container) {
            container = document.createElement('div')
            container.id='wjyyds-toast-message'
            document.body.appendChild(container)
            createRoot(container).render(<Index ref={toastRef}/>)
        }
        if (toastRef.current) {
            toastRef.current.addItem(option)
        } else {
            setTimeout(() => {
                toastRef.current.addItem(option)
            }, 0)
        }


    },
    clear: () => {

    }
}

export default toastMessage