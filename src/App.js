import { useState, useEffect } from "react";
import "./App.css";
import Loading from "./Components/Loading/Loding";
import Protected from "./Utilities/Protected";

function App() {
  const [loading, setLoading] = useState(true);
  const [appUser, setAppUser] = useState({
    isAuth: false,
    token: null,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setAppUser({
        isAuth: true,
        token,
        user: JSON.parse(user),
      });
    }
    setLoading(false);
  }, []);

  return (
    <div className="App">
      {loading ? <Loading /> : <Protected x={{ appUser, setAppUser }} />}
    </div>
  );
}

export default App;
