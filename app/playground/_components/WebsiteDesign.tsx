import React, { useContext, useEffect, useRef, useState } from 'react'
import WebPageTools from './WebPageTools';
import ElementSettingSection from './ElementSettingSection';
import ImageSettingSection from './ImageSettingsSection';
import { OnSaveContext } from '@/context/OnSaveContext';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams, useSearchParams } from 'next/navigation';

const HTML_CODE = `<!DOCTYPE html>
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

type Props = {
  generatedCode: string;
}
function WebsiteDesign({ generatedCode }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [selectedScreenSize, setSelectedScreenSize] = useState('web');
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>();
  const { onSaveData, setOnSaveData } = useContext(OnSaveContext)
  const { projectId } = useParams();
  const params = useSearchParams();
  const frameId = params.get('frameId');
  // Initialize iframe shell once
  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(HTML_CODE);
    doc.close();
  }, []);



  // Update body only when code changes
  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    const root = doc.getElementById("root");
    if (root && generatedCode) {
      // Extract only HTML code, remove everything before and after code blocks
      let cleanCode = generatedCode;

      // If there's a code block marker, extract only the code
      if (cleanCode.includes('```html')) {
        const startIndex = cleanCode.indexOf('```html') + 7;
        const endIndex = cleanCode.indexOf('```', startIndex);
        cleanCode = endIndex > startIndex
          ? cleanCode.slice(startIndex, endIndex)
          : cleanCode.slice(startIndex);
      } else {
        // Remove any remaining markers
        cleanCode = cleanCode
          .replaceAll("```html", "")
          .replaceAll("```", "");
      }

      root.innerHTML = cleanCode.trim();

      // Attach event listeners to new content
      let hoverEl: HTMLElement | null = null;
      let selectedEl: HTMLElement | null = null;

      const handleMouseOver = (e: MouseEvent) => {
        if (selectedEl) return;
        const target = e.target as HTMLElement;
        if (hoverEl && hoverEl !== target) {
          hoverEl.style.outline = "";
        }
        hoverEl = target;
        hoverEl.style.outline = "2px dotted blue";
      };

      const handleMouseOut = (e: MouseEvent) => {
        if (selectedEl) return;
        if (hoverEl) {
          hoverEl.style.outline = "";
          hoverEl = null;
        }
      };

      const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const target = e.target as HTMLElement;

        if (selectedEl && selectedEl !== target) {
          selectedEl.style.outline = "";
          selectedEl.removeAttribute("contenteditable");
        }

        selectedEl = target;
        selectedEl.style.outline = "2px solid red";
        selectedEl.setAttribute("contenteditable", "true");
        selectedEl.focus();
        console.log("Selected element: ", selectedEl);
        setSelectedElement(selectedEl)
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && selectedEl) {
          selectedEl.style.outline = "";
          selectedEl.removeAttribute("contenteditable");
          selectedEl = null;
        }
      };

      doc.body?.addEventListener("mouseover", handleMouseOver);
      doc.body?.addEventListener("mouseout", handleMouseOut);
      doc.body?.addEventListener("click", handleClick);
      doc?.addEventListener("keydown", handleKeyDown);

      return () => {
        doc.body?.removeEventListener("mouseover", handleMouseOver);
        doc.body?.removeEventListener("mouseout", handleMouseOut);
        doc.body?.removeEventListener("click", handleClick);
        doc?.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [generatedCode]);


  useEffect(() => {
    onSaveData && onSaveCode();
  }, [onSaveData])

  const onSaveCode = async() => {
    if (iframeRef.current) {
      try {
        const iframeDoc = iframeRef.current.contentDocument
          || iframeRef.current.contentWindow?.document;
        if (iframeDoc) {
          const cloneDoc = iframeDoc.documentElement.cloneNode(true) as HTMLElement;
          //Remove all outlines
          const AllEls = cloneDoc.querySelectorAll<HTMLElement>('*');
          AllEls.forEach((el) => {
            el.style.outline = '';
            el.style.cursor = '';

          })
          const html = cloneDoc.outerHTML;
          console.log("Saved HTML:", html);
          const result = await axios.post('/api/frames', {
            designCode: html,
            frameId: frameId,
            projectId: projectId
          })
          console.log(result.data);
          toast.success('Saved!');
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className='flex gap-2 w-full'>
      <div className='p-5 w-full flex items-center flex-col'>
        <iframe
          ref={iframeRef}
          className={`${selectedScreenSize == 'web' ? 'w-full' : 'w-130'} flex-1 border-2 rounded-xl`}
          sandbox="allow-scripts allow-same-origin"
        />
        <div className='mt-3 w-full'>
          <WebPageTools selectedScreenSize={selectedScreenSize}
            setSelectedScreenSize={(v: string) => setSelectedScreenSize(v)}
            generatedCode={generatedCode}
          />
        </div>
      </div>
      {/* setting section */}
      {/* @ts-ignore */}
      {/* <ElementSettingSection selectedEl={selectedElement} clearSelection={()=>setSelectedElement(null)}/> */}

      {selectedElement?.tagName == 'IMG' ?
        //@ts-ignore
        <ImageSettingSection selectedEl={selectedElement} />
        : selectedElement ? <ElementSettingSection selectedEl={selectedElement} clearSelection={() => setSelectedElement(null)} /> : null
      }
    </div>
  );
}

export default WebsiteDesign