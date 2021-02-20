import { Button } from 'reactstrap'
import React from 'react'
import InputSlider from 'react-input-slider'
import './CustomMenu.css'
import Select from 'react-select'

export const CustomMenu = ({size, setSize, speed, setSpeed, sortBtnDisabled, sortOptions, sortButtonHandler, setSelectedSortOption}) => {
    return (
        <div className='cm-div'>

            <Select options={sortOptions} className='select' isClearable={false} isSearchable={false} defaultValue={sortOptions[0]} onChange={(e)=>{setSelectedSortOption(e.value)}}/>

            <h3>Size:</h3>
            <InputSlider className='hey' axis='x' xmin={10} xmax={200} x={size} onChange={({x})=>setSize(x)} styles={{
                track: {
                    backgroundColor: '#a5b1c2'
                },
                    active: {
                    backgroundColor: '#778ca3'
                },
                disabled: {
                    opacity: 0.5
                }
            }}/>
            <h4>{size}</h4>

            <h3 style={{marginLeft:50}}>Speed:</h3>
            <InputSlider className='hey' axis='x' xmin={1} xmax={10} x={speed} onChange={({x})=>setSpeed(x)} styles={{
                track: {
                    backgroundColor: '#a5b1c2'
                },
                    active: {
                    backgroundColor: '#778ca3'
                },
                disabled: {
                    opacity: 0.5
                }
            }}/>
            <h4>{speed}</h4>

            <Button onClick={sortButtonHandler} disabled={sortBtnDisabled} color='success' className='sort-btn'>Visualize Sort</Button>
        </div>
    )
}
