import React, { useEffect, useState } from "react";
import store from "../../store";
import sendAction from "../../action";
export default function Home() {
  const [sendValue, setsendValue] = useState("");
  const handleSendAction = () => {
    store.dispatch(sendAction('这是Home组件发送的action'));
  };
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
      <h2>Home组件</h2>
      <button
        onClick={() => {
          handleSendAction();
        }}
      >
        sand Action
      </button>
      <div>{sendValue}</div>
      <hr></hr>
    </div>
  );
}
