import { useEffect, useState } from "react";
import List from "./components/List";
import { Amplify, Auth } from 'aws-amplify';
import { AWS_REGION, USER_POOL_ID, APP_CLIENT_ID } from './constants';
import { fetchPosts } from "./api/api";
import Authenticator from "./components/Authenticator";
import { Button } from "@material-ui/core";

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

  const signout = () => {
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

  return isLoggedIn ? (
    <div className="container">
      <div className="header">
        <Button onClick={signout}>Sign out</Button>
      </div>
      <List posts={posts} />
    </div>
  ) : isLoggedIn === null ? null : <Authenticator setIsLoggedIn={setIsLoggedIn} />;
}

export default App;
