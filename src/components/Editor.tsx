import { Button, makeStyles, TextField } from "@material-ui/core"
import { useContext, useEffect, useState, useRef } from "react";
import { createPost } from "../api/api";
import { AppContext } from "../App";
import CategoryEditor from "./CategoryEditor";

const useStyles = makeStyles({
    editor: {
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        width: '90%',
        minHeight: '90%',
        margin: 'auto',
        columnGap: '1.5rem'
    },
    column: {
        width: '100%'
    },
    bodyInput: {
        minHeight: '10rem',
        width: '100%',
        background: '#eee'
    },
    categories: {
        display: 'inline',
        width: 'fit-content',
        position: 'relative',
        overflow: 'visible'
    }
});

const languages = [
    {label: 'English', value: 'en'},
    {label: 'Português', value: 'pt'}
]

const Editor = () => {
    const classes = useStyles();
    const editorRef = useRef();
    const [state, setState] = useState({
        uri: '',
        title: '',
        body: '',
        language: 'en',
        category: '',
        author: ''
    });
    const [showCatEdit, setShowCatEdit] = useState(false);

    const {selectedPost: post, categories} = useContext(AppContext);

    useEffect(() => {
        if (!post) {
            return;
        }
        setState(post);
    }, [post])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const uri = state.uri ? state.uri : state.title.toLocaleLowerCase().replace(/\s/g, '-');
        createPost({...state, uri, createdAt: post.createdAt || new Date().getTime()})
        .then(() => {
            window.location.reload();
        })
        .catch(error => console.log(error));
    }

    const handleChange = ({target}: any) => {
        if (!target.name) {
            setState(prev => ({...prev, body: target.innerText}))
        }
        setState(prev => ({...prev, [target.name]: target.value}))
    }

    return (
        <div className={classes.editor}>
            <div className={classes.column}>
            <h2>New Post</h2>
            <form onSubmit={handleSubmit}>
                <TextField label="title" name="title" value={state.title} onChange={handleChange} style={{
                    margin: '1rem 0',
                    width: '100%'
                }} />
                <select value={state.language} onChange={handleChange} name="language" >
                    {languages.map(lang => (<option key={lang.value} value={lang.value}>{lang.label}</option>))}
                </select>
                <div className={classes.categories}>
                    <select value={state.category} onChange={handleChange} name="category" >
                        {categories.filter((cat: any) => cat.language === state.language).map((cat:any) => (
                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))} 
                    </select>
                    <Button onClick={() => setShowCatEdit(prev => !prev)}>{showCatEdit ? 'Close' : 'Add Category'}</Button>
                    {showCatEdit && <CategoryEditor language={state.language}/>}
                </div>
                <text-input ref={editorRef} onMouseUp={() => {
                    if (editorRef && editorRef.current) {
                        const el: any = editorRef.current;
                        console.log(window.getSelection()?.toString());
                    }
                }} className={classes.bodyInput} initialValue={post?.body} contentEditable onInput={handleChange}/>
                <div style={{padding: '1rem 0'}}>
                    <Button size="small" variant="contained" type="submit">Save</Button>
                </div>
            </form>
            </div>
            <div className={classes.column}>
                <post-body-edit body={state.body}></post-body-edit>
            </div>
        </div>
    )
}

export default Editor;