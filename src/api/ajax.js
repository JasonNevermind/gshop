// ajax请求模块
import axios from 'axios'
// const axios = require('axios')
export default function ajax(url,data={},type='GET'){
    // 里面的Promise结果控制返回的Promise
    return new Promise(function(resolve,reject){
        // 同步代码
        let promise
        const instance1=axios.create({
            baseURL:'http://localhost:4000',
            timeout:3000
        })
        if(type=='GET'){
            promise=instance1.get(url,{
                params:data
            })
        }else if(type=='POST'){
            promise=instance1.post(url,{
                data
            })
        }
        // axios发出去的结果
        promise.then(value=>{
            // value是服务器成功返回的response
            resolve(value.data)
        },err=>{
            // err是服务器返回的错误
            reject(err.toJSON())
        })

    })
}

// var testajax=ajax('/index_category').then(value=>{
//     console.log(value)
// },err=>{
//     console.log(err)
// })

