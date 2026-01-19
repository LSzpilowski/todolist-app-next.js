'use client';

import React from "react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { AuthSheet } from "./auth/AuthSheet";

export const Header = () => {
  const { user, signOut } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm">
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        DoItly
      </h1>
      
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex items-center gap-2">
              {user.user_metadata?.avatar_url && (
                <Image 
                  src={user.user_metadata.avatar_url} 
                  alt="Avatar" 
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-white text-sm hidden md:inline">
                {user.user_metadata?.full_name || user.email}
              </span>
            </div>
            <Button 
              onClick={signOut} 
              variant="outline" 
              size="sm"
            >
              Log out
            </Button>
          </>
        ) : (
          <AuthSheet />
        )}
      </div>
    </header>
  );
};
