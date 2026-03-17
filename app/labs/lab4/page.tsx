"use client";
import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariables";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import StringStateVariables from "./StringStateVariables";
import Link from "next/link";
import store from "./store";
import { Provider } from "react-redux";

function sayHello() {
  alert("Hello");
}

export default function lab4() {
  return (
    <Provider store={store}>
      <div>
        <h2>Lab 4</h2>
        <ClickEvent />
        <PassingDataOnEvent />
        <PassingFunctions theFunction={sayHello} />
        <Counter />
        <BooleanStateVariables />
        <StringStateVariables />
        <DateStateVariable />
        <ObjectStateVariable />
        <ArrayStateVariable />
        <ParentStateComponent />
        <Link href="./lab4/redux">Redux Examples</Link> <br />
        <Link href="./lab4/react-content">React Context Examples</Link> <br />
        <Link href="./lab4/zustand">Zustand Examples</Link>
      </div>
    </Provider>
  );
}
