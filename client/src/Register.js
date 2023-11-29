import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [direct, setDirect] = useState(false);

  async function register(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/register", {
      body: JSON.stringify({ username, password, email, message }),
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    console.log(response);

    if (response.ok) {
      alert("Register Successful");
      setDirect(true)
      
    } else {
      alert("Register Unsuccessful");
    }
  }
if(direct){
    return(
        <Navigate to={"/login"}/>
    )
}
  return (
    <div>
      <form onSubmit={register}>
        <h1>---Register Form---</h1>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Your Name"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          placeholder="Enter Your Message"
          value={message}
          onChange={(ev) => setMessage(ev.target.value)}
        />
        <button>Register</button>
      </form>
    </div>
  );
}
