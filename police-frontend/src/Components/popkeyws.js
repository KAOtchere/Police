import React from 'react'

function PopKeyWs({keyword}){
    return (
        <div>
            {keyword.keyword}
            {keyword.posts_count}
        </div>
    );
}

export default PopKeyWs