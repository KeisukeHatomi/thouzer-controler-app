import { useState, useEffect } from 'react'
import './App.css'
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify  } from "aws-amplify";
import { PubSub } from "@aws-amplify/pubsub";

// Apply plugin with configuration v5
// Amplify.addPluggable(
//   new AWSIoTProvider({
//     aws_pubsub_region: "ap-northeast-1",
//     aws_pubsub_endpoint:
//       "wss://ac2p1tgiw3p89-ats.iot.ap-northeast-1.amazonaws.com/mqtt",
//   })
// );

// Apply plugin with configuration v6
const pubsub = new PubSub({
  region: "<ap-northeast-1>",
  endpoint: "wss://ac2p1tgiw3p89-ats.iot.ap-northeast-1.amazonaws.com/mqtt",
});

function App() {

    const [pubMessage, setPubMessage] = useState("");
    const [subMessage, setSubMessage] = useState("");

    useEffect(() => {
      console.log('useEffect🔵 ');
      pubsub.subscribe("myTopic").subscribe({
        next: (data) => {
          console.log("Message received", data);
          setSubMessage(data.value.msg);
        },
        error: (error) => console.error(error),
        complete: () => console.log("Done"),
      });
    }, []);

    async function publish() {
      await pubsub.publish("myTopic", { msg: pubMessage });
      console.log('pubMessage🔵 ', pubMessage);
    }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <p>
            Publish Message
            <br />
            <input
              type="text"
              value={pubMessage}
              onChange={(event) => setPubMessage(event.target.value)}
            ></input>
            <button onClick={publish}>Publish</button>
          </p>
          <p>
            Subscribe Message
            <br />
            <textarea value={subMessage} readOnly></textarea>
          </p>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App
