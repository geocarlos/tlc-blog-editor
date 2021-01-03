import { Button, makeStyles, TextField } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { useState } from "react";

const useStyles = makeStyles({
    auth: {
        width: '20rem',
        height: '20rem',
        margin: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        border: 'solid thin #999',
        borderRadius: '1rem',
        padding: '1rem'
    },
    authForm: {
        width: '90%',
        margin: 'auto',
        '& .input': {
            height: 'fit-content',
            width: '100%',
            margin: '1rem 0'
        }
    }
})

const Authenticator = ({ setIsLoggedIn }: any) => {

    const classes = useStyles();

    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const handleChange = ({ target }: any) => {
        setState(prev => ({ ...prev, [target.name]: target.value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        Auth.signIn(state.username, state.password)
            .then(() => setIsLoggedIn(true))
            .catch(error => console.log(error));
    }

    return (
        <div className={classes.auth}>
            <form onSubmit={handleSubmit} className={classes.authForm}>
                <div className="input">
                    <TextField onChange={handleChange} name="username" label="Username" type="email" className="input" />
                </div>
                <div className="input">
                    <TextField onChange={handleChange} name="password" label="Password" type="password" className="input" />
                </div>
                <div>
                    <Button variant="contained" color="primary" type="submit">Login</Button>
                </div>
            </form>
        </div>
    )
}

export default Authenticator;