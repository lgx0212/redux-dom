### 一、Redux组成
#### 1.State状态

DomainState:服务器返回的State

Ul State:关于当前组件的State

APP State:全局的State

#### 2.Action事件
本质就是一个JS对象

必须要包含type属性

只是描述了有事情要发生，并没有描述如何去更新state

#### 3.Reducer

本质就是函数

响应发送过来的action

函数接收两个参数，第一个是初始化 state，第二个是发送过来的action

必须要有return返回值

#### 4.Store
用来把action和reducer关联到一起的

通过createStore来构建store

通过subscribe来注册监听

通过dispatch来发送action

### 二、案例

#### 1.创建react项目

create-react-app redux-dom

#### 2.安装redux

npm i redux

#### 3.创建action文件

```javascript
const sendAction = (value) => {
  return {
    type: "send_type",
    value,
  };
};
export default sendAction
```

#### 4.创建reducer文件

```javascript
// 设置默认值
const initState = { value: "defaultValue" };
const reducer = (state = initState, action) => {
  const { type } = action;
  switch (type) {
    case "send_type":
      return Object.assign({}, state, action);
    default:
      return state;
  }
};
export default reducer

```

#### 5.创建store文件

```javascript
// createStore被弃用 使用legacy_createStore
import {legacy_createStore,combineReducers} from 'redux'
import reducer from '../reducer'
//多个reducer时合并reducer
const reducers = combineReducers({
    reducer:reducer
})
const store = legacy_createStore(reducers)
export default store
```

#### 6.Home组件

```javascript
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
      // 此时console的输出
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

```

#### 7.About组件

```javascript
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

```

初始化

![image-20220930111226707](https://raw.githubusercontent.com/lgx0212/picture-material/main/react/redux/image-20220930111226707.png)

点击后

![image-20220930111242254](https://raw.githubusercontent.com/lgx0212/picture-material/main/react/redux/image-20220930111242254.png)

