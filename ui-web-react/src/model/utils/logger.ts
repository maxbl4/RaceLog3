import { AnyAction } from "redux";

export function logReduce(reducerName: string, state: any, action: AnyAction) {
  console.log(
    reducerName +
      ": state='" +
      JSON.stringify(state) +
      "', action='" +
      JSON.stringify(action) +
      "'"
  );
}
