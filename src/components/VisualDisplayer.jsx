import React, { useEffect, useState } from 'react'
import { MyColumns } from './MyColumns';
import { CustomMenu } from './CustomMenu';

export const VisualDisplayer = () => {
    const [myArray, setMyArray] = useState([]);
    const [size, setSize] = useState(30);
    const [speed, setSpeed] = useState(5);

    const [selectedSortOption, setSelectedSortOption] = useState('bubbleSort')
    const sortOptions = [
        { value: 'bubbleSort', label: 'Bubble Sort' },
        { value: 'insertionSort', label: 'Insertion Sort' },
        { value: 'quickSort', label: 'Quick Sort' }
    ]
    const [sortedCols, setSortedCols] = useState([])

    const [sortBtnDisabled, setSortBtnDisabled] = useState(false);
    const [swap1, setSwap1] = useState(-1)
    const [swap2, setSwap2] = useState(-1)

    useEffect(() => {
        fillArray()
        setSwap1(-1)
        setSwap2(-1)
    }, [size])

    const fillArray = () => {
        let newArray = []
        let random;
        for(let i = 0; i < size; i++)
        {
            random = Math.floor(Math.random() * 100 + 1)
            newArray.push(random);
        }
        setMyArray(newArray)
        setSortedCols([])
        setSortBtnDisabled(false);
    }

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const swapElements = async (array, sw1, sw2) => {
        let temp = array[sw1]; 
        array[sw1] = array[sw2]; 
        array[sw2] = temp; 

        setSwap1(sw1);
        setSwap2(sw2);
        await sleep(100 - speed*10);
        setMyArray([...array]);
    }

    const bubbleSorting = async () => {
        console.log('Bubble Sorting')
        setSortBtnDisabled(true);

        let tempArray = [...myArray];
        for(let i = 0; i<size; i++)
        {
            for(let j=0; j<size-1-i; j++)
            {
                if(tempArray[j] > tempArray[j+1]) {
                    await swapElements(tempArray, j, j+1);
                }
            }
            setSortedCols(s=>[...s, size-1 - i])
        }
        setSwap1(-1)
        setSwap2(-1)
        
        console.log('Finished!')
    }

    const insertionSorting = async () => {
        console.log("Insertion Sorting")
        setSortBtnDisabled(true);

        let tempArray = [...myArray];        
        for(let i = 0; i < tempArray.length-1; i++)
        {
            let j;
            for(j = i; j >= 0; j--)
            {                
                if(tempArray[j+1] > tempArray[j]) break;
                await swapElements(tempArray, j+1, j);
            }
        }        
        setSwap1(-1);
        setSwap2(-1);

        let tempCols = []
        for(let i=0; i<tempArray.length; i++) tempCols.push(i);
        setSortedCols(tempCols)

        console.log('Finished!')
    }

    const _quickSortPivot = async (array, start, end) => {
        let pivot = array[end]; 
        let i = start - 1;
        for (let j = start; j <= end - 1; j++)  
        {
            if (array[j] < pivot)  
            {
                i++;
                await swapElements(array, i, j);
            }  
        }        
        await swapElements(array, i+1, end);
        return (i + 1); 
    }

    const _quickSort = async (array, start, end) =>
    {
        if(start > end) return;
        if(start === end) { setSortedCols(s=>[...s, start]); return; }

        let pivot = await _quickSortPivot(array, start, end);
        setSortedCols(s=>[...s, pivot])

        await _quickSort(array, start, pivot - 1); // left
        await _quickSort(array, pivot + 1, end); // right
    }

    const quickSorting = async () => {
        console.log('Quick Sorting')
        setSortBtnDisabled(true);

        let tempArray = [...myArray]
        await _quickSort(tempArray, 0, tempArray.length-1);
        setSwap1(-1);
        setSwap2(-1);
        
        console.log('Finished!')
    }

    const sortButtonHandler = async () => {
        switch(selectedSortOption)
        {
            case 'bubbleSort': bubbleSorting(); break;
            case 'insertionSort': insertionSorting(); break;
            case 'quickSort': quickSorting(); break;
        }        
    }

    return (
        <div style={{display:'flex', flexDirection:'column'}}>
            <CustomMenu size={size} setSize={setSize} speed={speed} setSpeed={setSpeed} setSelectedSortOption={setSelectedSortOption} sortBtnDisabled={sortBtnDisabled} sortOptions={sortOptions} sortButtonHandler={sortButtonHandler}/>
            <hr/>
            <MyColumns myArray={myArray} swap1={swap1} swap2={swap2} sortedCols={sortedCols}/>
            <hr/>
        </div>
    )
}
