import React,{useEffect, useState} from 'react'
import store from '../../store'
export default function About() {
  const [sendValue, setsendValue] = useState("");
  useEffect(() => {
    // 初始化第一次显示默认值
    setsendValue(store.getState().reducer.value);
    store.subscribe(() => {
      // console.log(store.getState());
      //     "reducer": {
      //         "value": "i am action",
      //         "type": "send_type"
      //     }
      //监听store
      setsendValue(store.getState().reducer.value);
    });
  }, []);
  return (
    <div>
        <h2>About组件</h2>
        <div>{sendValue}</div>
    </div>
  )
}
