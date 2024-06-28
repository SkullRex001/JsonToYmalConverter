"use client"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { ChangeEvent, useState } from "react";
import { validateFileType } from "@/lib/validator";


export default function Home() {

  const [text, setText] = useState<string | null>('')
  console.log("this is input" , text)
  const [json, setJson] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {

    setText(e.target.value)

  }

  const handleUplode = async (e: ChangeEvent<HTMLInputElement>)=>{
    if (!e.target.files) {
      console.error("No files selected");
      return;
    }

    const file = e.target.files[0];

    if(file) {

       

    if(!validateFileType(file.name)) {
      e.target.value = ""
      alert("invalid file type")
      
    
      return;
    }


      const reader = new FileReader();

      reader.onload = function(r :any) {
        const content = r.target?.result as string | null;
        if (content !== null) {
          setText(content);
        }
        
       
      }

      reader.onerror = function(e) {
        console.error("File could not be read! Code ")
      };
       
    reader.readAsText(file);

    }

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
          <Textarea className=" w-[23rem] h-[45%] sm:w-[30rem] lg:h-[80%] " onChange={handleChange} placeholder="YAML" value={text!} />
          <Textarea className=" w-[23rem] h-[45%] sm:w-[30rem] lg:h-[80%] " placeholder="JSON" value={json} readOnly/>
        </div>
        <div className=" flex gap-1 flex-col w-[14rem] mb-4">
        <Button onClick={handleClick} className=" mb-3">Convert</Button>
        <Input type="file" placeholder="Email" onChange={handleUplode}   />
  
        </div>

      </div>


    </>
  );
}
