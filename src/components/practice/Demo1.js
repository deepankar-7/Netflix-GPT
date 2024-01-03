import React, { useEffect, useMemo, useState } from 'react'

const Demo1 = () => {

    const [text, setText] = useState("0");
    const [isDarkTheme, setIsDarkTheme] = useState(false);




    useEffect(() => {

        console.log("demo1 use effect called")


        return () => {

            console.log("demo1 useEffect end")
        }
    }, [])

    function isPrime(num) {
        if (num <= 1) {
            return false;
        }
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    }

    function findPrime(n) {
        let count = 0;
        let num = 2;
        while (count < n) {
            if (isPrime(num)) {
                count++;
            }
            num++;
        }
        return num - 1;
    }

    const prime = useMemo(() => findPrime(text), [text]);


    console.log("demo1 rendering...")



    const handleOnChange = (e) => {
        const text = e.target.value;
        setText(text)


    }

    return (
        <div className='h-screen w-full flex justify-center items-center'>


            <div className={' items-center  w-96 h-96 border border-black ' + (isDarkTheme && "bg-gray-800 text-white")}>
                <div>
                    <button type='button' className=' p-2 m-2 bg-green-600 '
                        onClick={() => { setIsDarkTheme(!isDarkTheme) }}
                    >toggle theme</button>
                </div>


                <div>
                    <input className=' w-80 border border-red-400' type="number" onChange={handleOnChange}  ></input>
                </div>

                <div>
                    <h1 className='font-bold '>{text}th prime no. is:{prime} </h1>

                </div>

            </div>

        </div >
    )
}

export default Demo1
