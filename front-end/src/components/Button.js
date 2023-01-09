import React from 'react'

const Button = (props) => {
    const {onClick, label} = props;

    return (
        <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 
                    px-4 mx-2 border-b-4 border-red-700 hover:border-red-500 rounded"  
        onClick={onClick} >
            {label}
        </button>
    )
}

export default Button