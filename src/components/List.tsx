import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    postList: {
        width: '90%',
        margin: '0 auto',
        alignSelf: 'flex-start'
    },
    postItem: {
        margin: '.5rem 0',
        padding: '1rem',
        border: 'solid thin grey'
    }
})

type PostList = {
    posts: Array<any>
}

const List = ({posts}: PostList) => {
    const classes = useStyles();
    return (
        <div className={classes.postList}>
            <h1>All Posts</h1>
        {posts.map((post: any) => (
            <div className={classes.postItem} key={post.title}>
                <h2>{post.title}</h2>
                <post-body>{post.body}</post-body>
            </div>
        ))}
       </div>
    );
}

export default List;