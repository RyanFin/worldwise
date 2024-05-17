import { useEffect, useReducer } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  // const [email, setEmail] = useState("jack@example.com");
  // const [password, setPassword] = useState("qwerty");

  const initialState = {
    email: "jack@example.com",
    password: "qwerty",
  };

  function reducer(action, state) {
    switch (action.type) {
      case "setEmail":
        return { ...state, email: action.payload };

      case "setPassword":
        return { ...state, password: action.payload };
    }
  }

  const [{ email, password }, dispatch] = useReducer(reducer, initialState);

  const { login, isAuthenticated } = useAuth();

  // grab programmatic navigation from react-router
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      login(email, password);
    }
  }

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/app", { replace: true }); // make the user go back to the main screen when pressing back, regardless of the value of the isAuthenticated state
      }
    },
    [isAuthenticated, navigate] //check every time isAuthenticated is changed
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) =>
              dispatch({ type: "setEmail", payload: e.target.value })
            }
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) =>
              dispatch({ type: "setPassword", payload: e.target.value })
            }
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
