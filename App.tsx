import React, { useState, useEffect, useRef } from 'react';
import { transcript } from './constants/transcript';
import { asciiLogo } from './constants/ascii';
import type { TranscriptItem, RenderedLine } from './types';
import { ContinueButton } from './components/ContinueButton';
import { Cursor } from './constants/Cursor';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const App: React.FC = () => {
  const [lines, setLines] = useState<RenderedLine[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [showFinalLogo, setShowFinalLogo] = useState(false);
  const [showLinkButton, setShowLinkButton] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const lineId = useRef(0);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentCommand]);

  useEffect(() => {
    let isMounted = true;

    const typeText = (
      text: string,
      callback: (currentText: string) => void,
      speed: number
    ) => {
      return new Promise<void>((resolve) => {
        let i = 0;
        const interval = setInterval(() => {
          if (!isMounted) {
            clearInterval(interval);
            return;
          }
          callback(text.slice(0, i + 1));
          i++;
          if (i > text.length) {
            clearInterval(interval);
            resolve();
          }
        }, speed);
      });
    };

    const runAnimation = async () => {
      for (const item of transcript) {
        if (!isMounted) return;

        switch (item.type) {
          case 'command':
          case 'special':
            const command = item.type === 'special' ? item.command : item.text;
            await typeText(command, setCurrentCommand, 50 + Math.random() * 20);
            setLines((prev) => [...prev, { id: lineId.current++, type: 'command', text: command }]);
            setCurrentCommand('');
            
            if (item.type === 'special' && item.action === 'load_ascii') {
              await sleep(400);
              const asciiLines = asciiLogo.trim().split('\n');
              for (const asciiLine of asciiLines) {
                if (!isMounted) return;
                setLines((prev) => [...prev, { id: lineId.current++, type: 'ascii', text: asciiLine }]);
                await sleep(5);
              }
            } else {
              await sleep(150);
            }
            break;
          
          case 'output':
            if (item.typed) {
              setLines((prev) => [...prev, { id: lineId.current++, type: 'output', text: '' }]);
              await typeText(item.text, (currentTypedText) => {
                  setLines((prev) => {
                    const newLines = [...prev];
                    if (newLines.length > 0) {
                      newLines[newLines.length - 1].text = currentTypedText;
                    }
                    return newLines;
                  });
                }, 30);
            } else {
              setLines((prev) => [...prev, { id: lineId.current++, type: 'output', text: item.text }]);
            }
            await sleep(120);
            break;

          case 'pause':
            await sleep(item.duration);
            break;
        }
      }
      setIsAnimating(false);
      setShowButton(true);
    };

    runAnimation();

    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (showFinalLogo) {
        const timer = setTimeout(() => {
            setShowLinkButton(true);
        }, 500); // Delay for the button to appear
        return () => clearTimeout(timer);
    }
  }, [showFinalLogo]);

  const handleContinueClick = () => {
    setShowFinalLogo(true);
  };

  if (showFinalLogo) {
    return (
      <main className="flex flex-col items-center justify-center h-screen bg-[#0d3c78] p-4">
        <pre
          className="font-mono text-[#e6eaef] whitespace-pre leading-tight"
          style={{ fontSize: 'clamp(3.5px, 0.7vw, 12px)' }}
        >
          {asciiLogo}
        </pre>
        <div className={`transition-opacity duration-1000 ${showLinkButton ? 'opacity-100' : 'opacity-0'}`}>
            <a
              href="https://linktr.ee/SilverTechOR"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-block px-8 py-3 mt-8 font-mono font-bold text-lg text-[#e6eaef]
                bg-gradient-to-b from-gray-500 to-gray-700
                border-2 border-t-gray-400 border-l-gray-400 border-b-gray-800 border-r-gray-800
                rounded-md shadow-lg transition-all duration-300
                hover:shadow-[0_0_15px_rgba(230,234,239,0.5)] hover:from-gray-400 hover:to-gray-600
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0d3c78] focus:ring-gray-300
              `}
            >
              Explore Links
            </a>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center h-screen p-4 font-mono text-[#e6eaef]">
      <div className="w-full max-w-5xl flex-grow overflow-auto" ref={terminalRef}>
        {lines.map((line) => (
          <div key={line.id}>
            {line.type === 'command' && (
              <p>
                <span className="text-green-400">anthony@peninsula:~/projects/silvertec$</span>
                <span className="ml-2">{line.text}</span>
              </p>
            )}
            {line.type === 'output' && <p className="whitespace-pre-wrap">{line.text}</p>}
            {line.type === 'ascii' && (
              <pre className="whitespace-pre !leading-tight text-[10px] sm:text-xs">
                {line.text}
              </pre>
            )}
          </div>
        ))}

        {isAnimating && (
          <p>
            <span className="text-green-400">anthony@peninsula:~/projects/silvertec$</span>
            <span className="ml-2">{currentCommand}</span>
            <Cursor />
          </p>
        )}
        
        {!isAnimating && <Cursor />}
      </div>
      <div className="flex justify-center w-full h-24 shrink-0 items-center">
         <ContinueButton isVisible={showButton} onClick={handleContinueClick} />
      </div>
    </main>
  );
};

export default App;