import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { Link } from '@reach/router';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        const getPosts = async () => {
            const resp = await fetch(
                "https://serverless-api.dragonee.workers.dev/api/posts"
            );
            const postsResp = await resp.json();
            setPosts(postsResp);
        };
        
        getPosts();
    }, []);

    const createPost = async () => {
        const resp = await fetch(
            "https://serverless-api.dragonee.workers.dev/api/posts/", {
                method: 'post',
                headers: { 'Content-Type' : 'application/json' },
                query: {
                    text,
                    title
                }
            }
        )
        const postsResp = await resp.json();
        setPosts(postsResp);
    }

    return (
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        >
            <h1>The Blog</h1>
            <Box 
            component="div"
            sx={{
                width: 0.9,
                justifyContent:"center",
                alignItems: "center",
                border: "1px solid grey",
                padding: "20px",
                borderRadius: "15px"
            }}
            >
                <Grid
                container
                direction="column"
                >
                    <h3>New Post</h3>
                    <TextField
                        id="title-field"
                        label="Title"
                        multiline
                        maxRows={2}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        id="text-field"
                        label="Text"
                        multiline
                        rows={4}
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </Grid>
                <Grid
                container
                direction="row"
                justifyContent="center"
                >
                    <Button 
                    variant="outlined"
                    size="large"
                    sx={{
                        padding: "5px 40px"
                    }}
                    onClick={createPost}
                    >
                        Post
                    </Button>
                </Grid>
            </Box>
            <Box 
            component="div"
            sx={{
                width: 0.9,
                justifyContent:"center",
                alignItems: "center",
                padding: "20px",
                margin: "20px",
            }}
            >
            <Grid
            container 
            direction="column"
            sx={{
                width: 1.0
            }}
            >
                {posts.map((post) => (
                    <Grid 
                    key={post.id}
                    sx={{
                        margin: "20px 0",
                    }}
                    >
                        <Link to={`/posts/${post.id}`}>
                            <Grid item xs={12} >
                                <Card 
                                    sx={{ 
                                        display: 'flex',
                                        borderRadius: '15px'
                                    }}
                                >
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography component="h2" variant="h5">
                                            {post.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            {new Date(post.published_at).toLocaleString('en-US', {
                                                weekday: 'short', // long, short, narrow
                                                day: 'numeric', // numeric, 2-digit
                                                year: 'numeric', // numeric, 2-digit
                                                month: 'long', // numeric, 2-digit, long, short, narrow
                                            })}
                                        </Typography>
                                        {/* <Typography variant="subtitle1" paragraph>
                                            {post.text}
                                        </Typography> */}
                                        <Typography variant="subtitle1" color="primary">
                                            Continue reading...
                                        </Typography>
                                        
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Link>
                    </Grid>
                ))}
            </Grid>
            </Box>
        </Grid>
    )
}

export default Posts;