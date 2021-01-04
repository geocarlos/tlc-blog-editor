import { createContext, useEffect, useState } from "react";
import { Amplify, Auth } from 'aws-amplify';
import { AWS_REGION, USER_POOL_ID, APP_CLIENT_ID } from './constants';
import { fetchPosts } from "./api/api";
import { Button } from "@material-ui/core";
import Routes from "./components/Routes";
import { BrowserRouter } from "react-router-dom";

export const AppContext = createContext({} as any);

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: AWS_REGION,
    userPoolId: USER_POOL_ID,
    userPoolWebClientId: APP_CLIENT_ID
  }
})

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setIsLoggedIn(true))
      .catch(error => {
        console.log(error)
        setIsLoggedIn(false);
      });
  }, [])

  const signOut = () => {
    Auth.signOut()
      .then(() => setIsLoggedIn(false))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchPosts()
      .then((data: any) => {
        console.log(data)
        setPosts(data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [isLoggedIn])

  return isLoggedIn !== null ? (
    <div className="container">
      <div className="header">
        <Button onClick={signOut}>Log out</Button>
      </div>
      <BrowserRouter>
      <AppContext.Provider value={{setIsLoggedIn, posts}}>
          <Routes isLoggedIn={isLoggedIn} userRoles={['BlogAuthor']} />
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  ) : null;
}

export default App;
