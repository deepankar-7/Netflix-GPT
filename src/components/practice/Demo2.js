import React, { useEffect, useRef, useState } from 'react'

const Demo2 = () => {

    console.log("demo 2 rendering...    ")

    const [x, setX] = useState(0);
    let y = 0;
    const z = useRef(0)

    useEffect(() => {

        console.log("demo1 use effect called")


        return () => {

            console.log("demo1 useEffect end")
        }
    }, [])


    return (
        <div className='h-screen w-full flex justify-center items-center'>


            <div className={' items-center  w-96 h-96 border border-black '}>

                <div>
                    <button className=' p-2 m-2 text-white  bg-green-500' onClick={() => {
                        setX(x + 1)
                        console.log("x:", x)
                    }}> increment x  </button>

                    <span>{x}</span>

                </div>

                <div>
                    <button className=' p-2 m-2 text-white  bg-red-500' onClick={() => {
                        y = y + 1
                        console.log("y:", y)
                    }}> increment y  </button>
                    <span>{y}</span>

                </div>

                <div>
                    <button className=' p-2 m-2 text-white  bg-blue-500' onClick={() => {
                        z.current = z.current + 1
                        console.log("z:", z.current)
                    }}> increment z </button>
                    <span>{z.current}</span>

                </div>




            </div>
        </div>

    )
}

export default Demo2