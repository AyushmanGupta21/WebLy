import { Button } from '@/components/ui/button'
import { Code2Icon, Download, Monitor, SquareArrowOutUpRight, TabletSmartphone } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ViewCodeBlock from './ViewCodeBlock'

const HTML_CODE=`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="WebLy - Modern TailwindCSS + Flowbite Template">
          <title>WebLy</title>

          <!-- Tailwind CSS -->
          <script src="https://cdn.tailwindcss.com"></script>

          <!-- Flowbite CSS & JS -->
          <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet">
          <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>

          <!-- Font Awesome / Lucide -->
          <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>

          <!-- Chart.js -->
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

          <!-- AOS -->
          <link href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" rel="stylesheet">
          <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>

          <!-- GSAP -->
          <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

          <!-- Lottie -->
          <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.11.2/lottie.min.js"></script>

          <!-- Swiper -->
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
          <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>

          <!-- Tippy.js -->
          <link rel="stylesheet" href="https://unpkg.com/tippy.js@6/dist/tippy.css" />
          <script src="https://unpkg.com/@popperjs/core@2"></script>
          <script src="https://unpkg.com/tippy.js@6"></script>
      </head>
      <body id="root">
        {code}
      </body>
      </html>`
function WebPageTools({selectedScreenSize, setSelectedScreenSize, generatedCode}:any) {

    const [finalCode, setFinalCode]=useState<string>();
    useEffect(()=>{
      if(!generatedCode) return;
      let cleanCode = generatedCode;
      // Remove code block markers
      if(cleanCode.includes('```html')){
        cleanCode = cleanCode.replace('```html', '');
      }
      cleanCode = cleanCode.replace(/```$/g, '');
      const finalHTML = HTML_CODE.replace('{code}', cleanCode);
      setFinalCode(finalHTML)
    },[generatedCode])

    const ViewInNewTab=()=>{
      if(!finalCode) return;
      

      const blob=new Blob([finalCode??''], {type:'text/html'});
      const url=URL.createObjectURL(blob);
      window.open(url,"_blank")
    }

    const downloadCode=()=>{
      const blob=new Blob([finalCode??''], {type:'text/html'});
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');
      a.href=url;
      a.download='index.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

  return (
    <div className='p-3 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl w-full flex items-center justify-between'>
        <div className='flex gap-2'>
            <Button variant={'ghost'} 
            className={`text-white hover:bg-white/20 hover:text-white transition-colors ${selectedScreenSize=='web'? 'bg-white/20 border border-blue-500':'border border-white/20'}`}
            onClick={()=>setSelectedScreenSize('web')}><Monitor className='h-5 w-5' /></Button>
            <Button variant={'ghost'} 
            className={`text-white hover:bg-white/20 hover:text-white transition-colors ${selectedScreenSize=='mobile'? 'bg-white/20 border border-blue-500':'border border-white/20'}`}
            onClick={()=>setSelectedScreenSize('mobile')}><TabletSmartphone className='h-5 w-5' /></Button>
        </div>
        <div className='flex gap-2'>
          <Button variant={'outline'}
          className='bg-white/10 text-white border-white/20 hover:bg-white/30 hover:text-white hover:border-white/30 transition-colors'
          onClick={()=>ViewInNewTab()}
          >View<SquareArrowOutUpRight className='ml-2 h-4 w-4' /></Button>
          <ViewCodeBlock code={finalCode}>
            <Button className='bg-blue-600 hover:bg-blue-700 text-white transition-colors'>Code<Code2Icon className='ml-2 h-4 w-4' /></Button>
          </ViewCodeBlock>
          <Button onClick={downloadCode} className='bg-blue-600 hover:bg-blue-700 text-white transition-colors'>Download<Download className='ml-2 h-4 w-4' /></Button>
        </div>
    </div>
  )
}

export default WebPageTools