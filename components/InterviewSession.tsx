
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Problem, Message, SessionState } from '../types';
import { gemini } from '../services/geminiService';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { createPcmBlob, decodeBase64, decodeAudioData } from '../services/audioUtils';
import { SYSTEM_INSTRUCTION } from '../constants';
import { Excalidraw } from '@excalidraw/excalidraw';

interface Props {
  problem: Problem;
  onExit: () => void;
}

const InterviewSession: React.FC<Props> = ({ problem, onExit }) => {
  const [session, setSession] = useState<SessionState>({
    problem,
    history: [{ role: 'assistant', content: problem.initialPrompt, timestamp: Date.now() }],
    architecture: { nodes: [], links: [] },
    isThinking: false
  });
  const [inputValue, setInputValue] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const audioContextsRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const liveSessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const transcriptionRef = useRef<{ user: string; model: string }>({ user: '', model: '' });
  const frameIntervalRef = useRef<number | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [session.history]);

  useEffect(() => {
    return () => {
      stopVoiceMode();
      if (frameIntervalRef.current) window.clearInterval(frameIntervalRef.current);
    };
  }, []);

  const stopVoiceMode = () => {
    if (liveSessionRef.current) {
      liveSessionRef.current.close?.();
      liveSessionRef.current = null;
    }
    if (audioContextsRef.current) {
      audioContextsRef.current.input.close();
      audioContextsRef.current.output.close();
      audioContextsRef.current = null;
    }
    if (frameIntervalRef.current) {
      window.clearInterval(frameIntervalRef.current);
      frameIntervalRef.current = null;
    }
    sourcesRef.current.forEach(s => {
      try { s.stop(); } catch (e) {}
    });
    sourcesRef.current.clear();
    setIsVoiceMode(false);
  };

  const getSceneSummary = useCallback(() => {
    if (!excalidrawAPI) return "No elements on the drawing board yet.";
    const elements = excalidrawAPI.getSceneElements();
    if (!elements || elements.length === 0) return "The drawing board is empty.";
    
    const descriptions = elements
      .filter((e: any) => !e.isDeleted)
      .map((e: any) => {
        const text = e.text ? ` labeled "${e.text}"` : "";
        return `- ${e.type}${text}`;
      });
    
    return `The current architecture drawing contains:\n${descriptions.join('\n')}`;
  }, [excalidrawAPI]);

  const startVoiceMode = async () => {
    try {
      // Check for browser support
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Voice mode requires a secure context (HTTPS) and a browser that supports media devices. Please ensure you are using HTTPS or localhost.');
        return;
      }

      if (!window.AudioContext && !(window as any).webkitAudioContext) {
        alert('Voice mode requires Web Audio API support. Please use a modern browser.');
        return;
      }

      setIsVoiceMode(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextsRef.current = { input: inputCtx, output: outputCtx };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const outputNode = outputCtx.createGain();
      outputNode.connect(outputCtx.destination);

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: SYSTEM_INSTRUCTION + "\nYou are in a VOICE session. You can SEE the user's Excalidraw canvas in real-time. Comment on what they are drawing. Keep responses concise.",
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(processor);
            processor.connect(inputCtx.destination);

            frameIntervalRef.current = window.setInterval(async () => {
              if (excalidrawAPI) {
                const canvas = document.querySelector(".excalidraw canvas");
                if (canvas instanceof HTMLCanvasElement) {
                   const base64Data = canvas.toDataURL("image/jpeg", 0.5).split(',')[1];
                   sessionPromise.then(s => s.sendRealtimeInput({
                     media: { data: base64Data, mimeType: 'image/jpeg' }
                   }));
                   setIsSyncing(true);
                   setTimeout(() => setIsSyncing(false), 200);
                }
              }
            }, 2000);
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const buffer = await decodeAudioData(decodeBase64(audioData), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputNode);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch (e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
            if (message.serverContent?.inputTranscription) transcriptionRef.current.user += message.serverContent.inputTranscription.text;
            if (message.serverContent?.outputTranscription) transcriptionRef.current.model += message.serverContent.outputTranscription.text;

            if (message.serverContent?.turnComplete) {
              const userText = transcriptionRef.current.user;
              const modelText = transcriptionRef.current.model;
              setSession(prev => ({
                ...prev,
                history: [
                  ...prev.history,
                  ...(userText ? [{ role: 'user' as const, content: userText, timestamp: Date.now() }] : []),
                  ...(modelText ? [{ role: 'assistant' as const, content: modelText, timestamp: Date.now() }] : [])
                ]
              }));
              transcriptionRef.current = { user: '', model: '' };
            }
          },
          onerror: (e: any) => { console.error("Live session error:", e); },
          onclose: () => stopVoiceMode(),
        }
      });
      liveSessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Voice mode error:", err);
      let errorMessage = "Failed to start voice mode. ";

      if (err instanceof Error) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          errorMessage += "Microphone access was denied. Please grant permission to use your microphone.";
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          errorMessage += "No microphone was found. Please connect a microphone and try again.";
        } else if (err.name === 'NotSupportedError') {
          errorMessage += "Your browser does not support audio input.";
        } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
          errorMessage += "Could not access your microphone. It may be in use by another application.";
        } else {
          errorMessage += err.message;
        }
      }

      alert(errorMessage);
      stopVoiceMode();
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const sceneInfo = getSceneSummary();
    const enrichedContent = `[Current Whiteboard State]:\n${sceneInfo}\n\n[User Message]:\n${inputValue}`;
    const updatedHistory = [...session.history, { role: 'user' as const, content: enrichedContent, timestamp: Date.now() }];
    setSession(prev => ({ ...prev, history: updatedHistory, isThinking: true }));
    setInputValue('');
    try {
      const response = await gemini.sendMessage(updatedHistory);
      setSession(prev => ({
        ...prev,
        history: [...prev.history, { role: 'assistant' as const, content: response.text, timestamp: Date.now() }],
        isThinking: false
      }));
    } catch (e) {
      console.error("Gemini Text Error:", e);
      setSession(prev => ({ ...prev, isThinking: false }));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="flex items-center justify-between px-10 py-5 border-b border-gray-200">
        <div className="flex items-center">
          <button onClick={onExit} className="iconic-hover border-teal mr-10 transition-colors p-0 border-none">
            <i className="fas fa-arrow-left text-gray-400"></i>
          </button>
          <h1 className="text-sm font-bold text-[#293c4b] uppercase tracking-widest">
            {problem.title} <span className="mx-4 opacity-30 text-[#00917c]">|</span> <span className="text-gray-400 font-normal">{problem.difficulty}</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
           {isSyncing && (
             <span className="text-[9px] font-bold text-[#00917C] animate-pulse uppercase tracking-widest">
               AI SYNCING CANVAS...
             </span>
           )}
           {isVoiceMode && (
             <span className="text-[10px] font-bold text-[#00917C] flex items-center gap-2">
               <div className="w-2 h-2 bg-[#00917C] rounded-full animate-pulse"></div> 
               ACTIVE VOICE
             </span>
           )}
           <div className="w-10 h-10 bg-gray-50 border border-gray-100 flex items-center justify-center">
              <i className="fas fa-user-tie text-gray-300 text-sm"></i>
           </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <div className="w-4/12 flex flex-col border-r border-gray-100">
          <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white">
            {session.history.map((msg, idx) => {
              const displayContent = msg.content.includes('[User Message]:') 
                ? msg.content.split('[User Message]:\n')[1] 
                : msg.content;
                
              return (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${msg.role === 'user' ? 'text-[#00917C]' : 'text-[#28527A]'}`}>
                      {msg.role === 'user' ? 'Candidate' : 'Mentor'}
                    </span>
                    <span className="text-[8px] text-gray-300 font-mono">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className={`text-[14px] leading-relaxed p-4 border-l-2 ${msg.role === 'user' ? 'text-[#293c4b] bg-gray-50 border-[#00917C]/20 font-medium' : 'text-gray-600 border-[#28527A]/20'}`}>
                    {displayContent}
                  </div>
                </div>
              );
            })}
            {session.isThinking && (
              <div className="text-[9px] font-bold text-[#00917C] tracking-[0.3em] animate-pulse flex items-center gap-3">
                <div className="w-1 h-3 bg-[#00917C]"></div>
                MENTOR IS ANALYZING ARCHITECTURE...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-8 bg-gray-50 border-t border-gray-100">
            {isVoiceMode ? (
              <div className="bg-black p-10 flex flex-col items-center gap-8 shadow-xl">
                 <div className="flex gap-2 h-8 items-center">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1.5 bg-[#00917C] rounded-full animate-voice-bar" style={{ animationDelay: `${i * 0.1}s`, height: '40%' }}></div>
                    ))}
                 </div>
                 <button onClick={stopVoiceMode} className="iconic-hover border-red bg-[#c15050] text-white px-10 py-3 text-xs font-bold uppercase tracking-widest border-none w-full">
                   End Voice Session
                 </button>
              </div>
            ) : (
              <div className="space-y-4">
                <button onClick={startVoiceMode} className="iconic-hover border-blue w-full bg-white border border-gray-200 text-gray-600 py-3 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all flex items-center justify-center gap-3">
                  <i className="fas fa-microphone"></i> Start Voice Session
                </button>
                <div className="flex gap-3">
                  <input 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Describe your design choices..."
                    className="flex-1 bg-white border border-gray-200 border-l-4 border-l-[#00917C] px-5 py-3 text-sm focus:border-gray-300"
                  />
                  <button onClick={handleSend} className="iconic-hover border-teal bg-[#00917C] text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest border-none">
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-8/12 bg-black relative flex flex-col">
          <div className="flex-1 excalidraw-container">
            <Excalidraw
              theme="dark"
              excalidrawAPI={(api: any) => setExcalidrawAPI(api)}
            />
          </div>

          <div className="h-20 bg-[#080808] border-t border-gray-900 flex items-center px-10 justify-between">
             <div className="flex gap-10 items-center">
                <div className="flex flex-col">
                  <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">System Status</span>
                  <span className="text-[11px] text-[#00917C] font-mono">OPERATIONAL // SYNC_ENABLED</span>
                </div>
                <div className="w-1 h-8 bg-gray-800"></div>
                <div className="flex flex-col">
                  <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">Whiteboard Mode</span>
                  <span className="text-[11px] text-white font-mono uppercase">Interactive Architecture</span>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <i className="fas fa-shield-halved text-gray-700 text-sm"></i>
                <div className="text-[9px] text-gray-700 font-bold uppercase tracking-[0.2em]">FAANG-grade Assessment</div>
             </div>
          </div>
        </div>
      </main>
      
      <style>{`
        @keyframes voice-bar {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
        .animate-voice-bar {
          animation: voice-bar 0.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default InterviewSession;
