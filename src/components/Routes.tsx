import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import Authenticator from './Authenticator';
import Editor from './Editor';
import List from './List';

interface IRoutes extends RouteProps {
    isLoggedIn: boolean;
    userRoles: Array<string>;
}

interface IProtectedRoute extends RouteProps {
    isLoggedIn: boolean;
    roles: Array<string>;
    userRoles: Array<string>
}

const ProtectedRoute = ({ isLoggedIn, roles, path, userRoles, component: C, ...rest }: IProtectedRoute) => {
    if (isLoggedIn && roles.some(role => userRoles.includes(role))) {
        return <Route render={props => C && <C {...props} />} {...rest} />
    } else {
        return <Route path={path} render={() => (
            isLoggedIn ? <h1>YOU ARE NOT ALLOWED TO SEE THE PAGE!</h1> : 
            <Redirect to="/login"/>
        )} {...rest} /> 
    }
}

const Routes = ({ isLoggedIn, userRoles }: IRoutes) => {
    return <Switch>
        <ProtectedRoute 
            exact path="/" component={List}
            isLoggedIn={isLoggedIn} 
            userRoles={userRoles} roles={['BlogAuthor']} />
        <ProtectedRoute 
            exact path="/editor" component={Editor}
            isLoggedIn={isLoggedIn} 
            userRoles={userRoles} roles={['BlogAuthor']} />
        <Route path="/login" render={() => {
                return isLoggedIn ? <Redirect to="/" /> : <Authenticator />
            }} />
    </Switch>
}

export default Routes;