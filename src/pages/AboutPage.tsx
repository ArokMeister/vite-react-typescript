import { useEffect, useState } from "react";

export function AboutPage() {
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    const text = 'Данный проект был создан для знакомства с новыми технологиями.';
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < text.length) {
        const symbol = text[index];
        if (symbol) { // Проверка наличия символа
          setVisibleText(prev => prev + symbol);
        }
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 20);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  return (
    <>
      <div className="md:container mx-auto">
        <h1 className="font-mono text-center text-3xl m-4">{visibleText}</h1>
      </div>
      <div className="lg:container grid grid-cols-2 gap-4 mx-auto items-center justify-items-center">
        <p className="font-mono text-center text-2xl m-4">Место для разработки любезно предоставил React</p>
        <img src="/vite-react-typescript/react.svg" className="w-36 self-center" />
        <p className="font-mono text-center text-2xl m-4">Сердце этого проекта многогранный TypeScript</p>
        <img src="/vite-react-typescript/typescript.svg" className="w-36 text-center animate-pulse" />
        <p className="font-mono text-center text-2xl m-4">За визуальные эффекты отвечает Tailwind</p>
        <img src="/vite-react-typescript/tailwind.svg" className="w-36 text-center animate-pulse" />
        <p className="font-mono text-center text-2xl m-4">Собирал и упаковывал проект проект шустрый Vite</p>
        <img src="/vite-react-typescript/vite.svg" className="w-36 text-center animate-pulse" />
        <p className="font-mono text-center text-2xl m-4">Все входящие и исходящие запросы обрабатывал Axios</p>
        <img src="/vite-react-typescript/axios.svg" className="w-36 text-center animate-pulse" />
      </div>
    </>
  )
}