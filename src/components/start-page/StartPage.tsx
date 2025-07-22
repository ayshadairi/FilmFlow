"use client";

import React from 'react';
import { Film, Leaf, Award, ArrowRight, Play, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StartPageProps {
  onEnter: () => void;
}

export const StartPage: React.FC<StartPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1122] via-[#100f2e] to-[#1f1a3b] text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cna-green-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-cna-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cna-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-cna-green-400 to-cna-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Film className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-cna-green-400 rounded-full flex items-center justify-center border-4 border-[#100f2e]">
                <Leaf className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            EcoLens
          </h1>
          <p className="text-xl md:text-2xl text-cna-green-300 font-medium mb-2">
            CNA Film Sustainability Initiative
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Advanced Equipment Management for Sustainable Film Production
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto animate-slide-up">
            <FeatureCard icon={Leaf} title="Eco-Friendly" text="Track equipment and reduce your carbon footprint."/>
            <FeatureCard icon={Zap} title="Efficient" text="Streamline your production equipment workflow."/>
            <FeatureCard icon={Award} title="Professional" text="Industry-leading standards for equipment management."/>
        </div>
        
        <Button
          onClick={onEnter}
          size="lg"
          className="group bg-gradient-to-r from-cna-green-500 to-cna-blue-500 hover:from-cna-green-600 hover:to-cna-blue-600 text-white px-12 py-7 rounded-lg text-lg font-semibold shadow-2xl hover:shadow-cna-green-500/30 transform hover:scale-105 transition-all duration-300"
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
        <div className="w-12 h-12 bg-gradient-to-br from-cna-blue-500 to-cna-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{text}</p>
    </div>
)
