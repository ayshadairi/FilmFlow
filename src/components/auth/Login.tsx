"use client";

import React, { useState } from 'react';
import { Film, Leaf, Zap, ArrowRight, Play, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; 
import { SignUp } from './SignUp';

export const Login: React.FC = () => {
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast({ title: "Login Successful", description: "Welcome back!" });
        } catch (error: any) {
            toast({ title: "Login Failed", description: error.message, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    if (isSigningUp) {
        return <SignUp onBackToLogin={() => setIsSigningUp(false)} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cna-blue-900 via-cna-purple-800 to-cna-purple-900 text-white relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-cna-green-500/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute top-40 right-32 w-96 h-96 bg-cna-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cna-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#34d399] to-[#3b82f6] rounded-2xl flex items-center justify-center shadow-2xl">
                            <Film className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#34d399] rounded-full flex items-center justify-center border-4 border-cna-purple-900">
                            <Leaf className="w-3 h-3 text-white" />
                        </div>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-300 mb-8">Sign in to manage your equipment.</p>
                
                <form onSubmit={handleLogin} className="w-full space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pl-10"
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pl-10"
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-[#34d399] to-[#3b82f6] hover:from-[#10b981] hover:to-[#2563eb] text-white py-6 text-base font-semibold">
                        {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                </form>

                <p className="mt-6 text-sm text-gray-300">
                    Don't have an account?{' '}
                    <button onClick={() => setIsSigningUp(true)} className="font-semibold text-[#6ee7b7] hover:underline">
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};
