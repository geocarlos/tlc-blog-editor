import { Button, makeStyles, TextField } from "@material-ui/core"
import { useContext, useState } from "react";
import { createCategory, fetchCategories } from "../api/api";
import { AppContext } from "../App";

const useStyles = makeStyles({
    categoryEditor: {
        position: 'absolute',
        background: 'white',
        top: '-100%',
        left: '100%',
        height: '10rem',
        width: '20rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const CategoryEditor = ({language}: any) => {
    const [name, setName] = useState('');
    const {setCategories} = useContext(AppContext);
    const classes = useStyles();

    const handleClick = () => {
        createCategory({name, language})
        .then(() => {
            fetchCategories()
            .then(data => setCategories(data))
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));

    }
    return (
        <div className={classes.categoryEditor}>
            <TextField label="name" value={name} onChange={e => setName(e.target.value)} />
            <Button onClick={handleClick}>Save</Button>
        </div>
    )
}

export default CategoryEditor;