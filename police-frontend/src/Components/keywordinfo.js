import React from 'react'
import PostInfo from './postinfo';

function KeywordInfo({keyword, colors}){

    const posts = keyword.posts.map((value, index) => <PostInfo post={value} colors={colors} key={index}/>)
    return (
        <div>
            {keyword.keyword}
            {posts}
        </div>
    );
}

export default KeywordInfo