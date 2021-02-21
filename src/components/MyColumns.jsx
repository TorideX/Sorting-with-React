import React, { useEffect } from 'react'
import './MyColumns.css'

export const MyColumns = ({myArray, swap1, swap2, sortedCols}) => {
    const swap1Color = '#706fd3'
    const swap2Color = '#227093'
    useEffect(()=> {
    }, [myArray])
    return (
        <div className='column-container'>
            {
                myArray.map((num,i) => (

                    <div className='column' key={i} style={{height:num*5, width:60, 
                        backgroundColor: 
                        swap1===i ? swap1Color : 
                        swap2 === i ? swap2Color: 
                        sortedCols.includes(i) ? '#05c46b' :
                        '#34495e'
                    }}></div>
                ))
            }
        </div>
    )
}
