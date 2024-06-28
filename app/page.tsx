"use client"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { ChangeEvent, useState } from "react";


export default function Home() {

  const [text, setText] = useState<string | null>('')
  console.log(text)
  const [json, setJson] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {

    setText(e.target.value)

  }



  const handleClick = async () => {

    const response = await fetch('https://backend.honestaditya.workers.dev/ymltojson', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: text,
    });

    const data = await response.json()

    let formattedJson = JSON.stringify(data, null, 2).replace(/,/g, ',\n');
    setJson(formattedJson);
    console.log(data)

  }
  return (

    <>
      <div className=" h-[100vh] w-[100vw] flex items-center flex-col gap-[2px] justify-center">
        <p className=" p-2 mt-8">YAML TO JSON CONVERTER</p>
        <div className=" flex justify-center lg:gap-20 items-center flex-wrap w-[100%] h-[100%] gap-1 ">
          <Textarea className=" w-[23rem] h-[45%] sm:w-[30rem] lg:h-[80%] " onChange={handleChange} placeholder="YAML" />
          <Textarea className=" w-[23rem] h-[45%] sm:w-[30rem] lg:h-[80%] " placeholder="JSON" value={json} readOnly/>
        </div>
        <Button onClick={handleClick} className=" mb-3">Convert</Button>

      </div>


    </>
  );
}
