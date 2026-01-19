'use client';

import React from "react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { user, signOut } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center">
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        DoItly
      </h1>
      
      {user && (
        <div className="flex items-center gap-4">
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
            Wyloguj
          </Button>
        </div>
      )}
    </header>
  );
};
