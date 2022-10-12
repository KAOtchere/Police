import React from 'react'

function Stats({stat}){
    
    return (
        <div>
            {stat.name}
            {stat.count}
        </div>
    );
}

export default Stats