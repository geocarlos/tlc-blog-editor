import { Button, makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../App";

const useStyles = makeStyles({
    postList: {
        width: '90%',
        minHeight: '90%',
        margin: '0 auto',
        alignSelf: 'flex-start'
    },
    postItem: {
        margin: '.5rem 0',
        padding: '1rem',
        border: 'solid thin grey'
    }
})

const List = () => {
    const classes = useStyles();
    const { posts, setSelectedPost } = useContext(AppContext);
    const history = useHistory();
    return (
        <div className={classes.postList}>
        <h1>All Posts</h1>
        {posts.map((post: any) => (
            <div className={classes.postItem} key={post.title} onClick={() => {
                setSelectedPost(post);
                history.push('/editor');
            }}>
                <h2>{post.title}</h2>
                <post-body>
                    {post.body}
                </post-body>
            </div>
        ))}
        <div style={{
            position: 'fixed',
            right: '5rem',
            bottom: '1rem'
        }}>
            <Button onClick={() => {
                history.push('/editor');
                setSelectedPost(null);
            }}>New post</Button>
        </div>
       </div>
    );
}

export default List;