import React from 'react'

function Stats({stat}){
    
    return (
        <div className='bg-white drop-shadow-lg rounded-lg border-black h-16 pl-10 py-1'>
            <span className='block font-semibold text-2xl'>{stat.count}</span>
             Total {stat.name}
        </div>
    );
}

export default Stats