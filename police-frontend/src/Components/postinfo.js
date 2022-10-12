import React from 'react'
import PostAuthors from './postauthors';
import PostKeywords from './postkeywords';
import PostSentiment from "./postsentiment";

function PostInfo({post, colors}){
    const keywords = post.keywords.map((value, index) => <PostKeywords keyword={value} key={index}/>)
    const authors = post.authors.map((value, index) => <PostAuthors author={value} key={index}/>)

    return (
        <div>
            {post.title}
            {post.summary}
            {post.publication_date}
            {post.publication_name.name}
            {post.media.medium}
            {keywords}
            {authors}
            <PostSentiment sentiment={post} colors={colors}/>
            
        </div>
    );
}

export default PostInfo