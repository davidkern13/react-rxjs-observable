import React from "react";
import axios from "axios";
import { Observable } from "rxjs";

export default function App() {
  const observable = new Observable(subscriber => {
    //demo server api request

    axios
      .get("https://fakerestapi.azurewebsites.net/api/Books")
      .then(response => {
        //for first the server return default value
        subscriber.next({ data: "its take some time" });

        //then after some time server return the all data
        setTimeout(() => {
          subscriber.next(response);
          subscriber.complete();
        }, 5600);
      });
  });

  observable.subscribe({
    next(x) {
      console.log("got value " + JSON.stringify(x));
    },
    error(err) {
      console.error("something wrong occurred: " + err);
    },
    complete() {
      console.log("done");
    }
  });

  return (
    <div className="App">
      <p>Check the console!</p>
    </div>
  );
}
