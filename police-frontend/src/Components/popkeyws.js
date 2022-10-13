import React from 'react'

function PopKeyWs({keyword}){
    return (
        <div className='bg-white drop-shadow-lg rounded-lg border-black h-16 pl-10 py-1 mb-2'>
            <span className='block font-semibold text-2xl capitalize'>{keyword.keyword}</span>
            Total Appearances {keyword.posts_count}

        </div>
    );
}

export default PopKeyWs