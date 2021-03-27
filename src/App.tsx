import { createContext, useEffect, useState } from "react";
import { Amplify, Auth } from 'aws-amplify';
import { AWS_REGION, USER_POOL_ID, APP_CLIENT_ID } from './constants';
import { fetchCategories, fetchPosts } from "./api/api";
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
  const [categories, setCategories] = useState([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
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
        setPosts(data);
      })
      .catch(error => {
        console.log(error);
      });
    fetchCategories()
      .then((data: any) => {
        setCategories(data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [isLoggedIn])

  return isLoggedIn !== null ? (
    <div className="container">
      {isLoggedIn && (
      <header className="header">
        <Button style={{height: 'fit-content'}} onClick={signOut}>Log out</Button>
      </header>)}
      <BrowserRouter>
      <AppContext.Provider value={{setIsLoggedIn, posts, categories, selectedPost, setSelectedPost, setCategories}}>
          <Routes isLoggedIn={isLoggedIn} userRoles={['BlogAuthor']} />
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  ) : null;
}

export default App;
