import React from 'react'
import PostAuthors from './postauthors';
import PostKeywords from './postkeywords';
import PostSentiment from "./postsentiment";

function PostInfo({post, colors}){
    const keywords = post.keywords.map((value, index) => <PostKeywords keyword={value} key={index}/>)
    const authors = post.authors.map((value, index) => <PostAuthors author={value} key={index}/>)

    return (
        <div>
            <h1>Title: {post.title}</h1>
            <p>Summary: {post.summary}</p>
            <span className='block'>Publication Date: {post.publication_date}</span>
            <span className='block'>Publication: {post.publication_name.name}</span>
            <span className='block'>Medium: {post.media.medium}</span>
            <span className='block flex'>Keywords: {keywords}</span>
            <span className='block'>{authors}</span>
            <PostSentiment sentiment={post} colors={colors}/>
            
        </div>
    );
}

export default PostInfo