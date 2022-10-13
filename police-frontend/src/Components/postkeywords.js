import React from 'react'

function PostKeywords({keyword}){


    return (
        <div className='bg-black text-white mr-2 p-1 capitalize'>
            {keyword.keyword}
        </div>
    );
}

export default PostKeywords