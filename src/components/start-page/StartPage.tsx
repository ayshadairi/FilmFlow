"use client";

import React from 'react';
import { Film, Leaf, Zap, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StartPageProps {
  onEnter: () => void;
}

export const StartPage: React.FC<StartPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a3a6a] via-[#372f7a] to-[#581c87] text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cna-green-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-cna-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cna-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-[#34d399] to-[#3b82f6] rounded-2xl flex items-center justify-center shadow-2xl">
                <Film className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#34d399] rounded-full flex items-center justify-center border-4 border-[#372f7a]">
                <Leaf className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            CNA Film
          </h1>
          <p className="text-xl md:text-2xl text-[#6ee7b7] font-medium mb-2">
            Sustainability Initiative
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Advanced Equipment Management System for Sustainable Film Production
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto animate-slide-up">
            <FeatureCard icon={Leaf} title="Eco-Friendly" text="Sustainable equipment tracking and carbon footprint reduction"/>
            <FeatureCard icon={Zap} title="Efficient" text="Streamlined workflow for film production equipment"/>
            <FeatureCard icon={() => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white"><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>} title="Professional" text="Industry-leading standards for film equipment management"/>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-4xl mx-auto animate-slide-up">
            <StatsItem value="500+" label="Equipment Items" />
            <StatsItem value="50+" label="Film Projects" />
            <StatsItem value="95%" label="Efficiency Rate" />
            <StatsItem value="30%" label="Carbon Reduction" />
        </div>
        
        <Button
          onClick={onEnter}
          size="lg"
          className="group bg-gradient-to-r from-[#34d399] to-[#3b82f6] hover:from-[#10b981] hover:to-[#2563eb] text-white px-12 py-7 rounded-lg text-lg font-semibold shadow-2xl hover:shadow-[#34d399]/30 transform hover:scale-105 transition-all duration-300"
        >
          <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
          Enter System
          <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

const FeatureCard = ({icon: Icon, title, text}: {icon: React.ElementType, title: string, text: string}) => (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all hover:bg-white/10 hover:border-white/20">
        <div className="w-12 h-12 bg-gradient-to-br from-[#3b82f6] to-[#a855f7] rounded-xl flex items-center justify-center mb-4 mx-auto">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{text}</p>
    </div>
)

const StatsItem = ({ value, label }: { value: string, label: string }) => (
    <div className="text-center">
        <p className="text-4xl font-bold text-[#6ee7b7]">{value}</p>
        <p className="text-sm text-gray-300">{label}</p>
    </div>
)
