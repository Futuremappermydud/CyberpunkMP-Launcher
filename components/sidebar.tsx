"use client"

import * as React from "react"
import { useState } from "react";

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { Rajdhani } from 'next/font/google'

const rajdhani = Rajdhani({ 
  weight: ['600', '700'],
  subsets: ['latin'], 
})

interface SidebarProps {
  onChange: (value: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onChange }) => {
  const handleButtonClick = (buttonText : string) => {
    onChange(buttonText);
  };

  const [installed, setInstalled] = useState(false);

  return (
    <div className="w-full justify-center pt-5 pl-3 pr-3 space-y-5">
      <div className="w-full sm:max-w-40 md:max-w-52 lg:max-w-72 m-auto duration-150 rounded-sm outline outline-2 outline-secondary" >
        <div className="h-10" onClick={() => handleButtonClick("Play")}>
          <div className="bg-secondary w-full h-full opacity-35 hover:opacity-70 transition-opacity duration-150 cursor-pointer"/>
          <div className="fit relative flex flex-row isolate-auto justify-center bottom-8 items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4 overflow-hidden"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
            <p className={cn(rajdhani.className, " relative top-px")}>Play</p>
          </div>
        </div>
      </div>
      <div className="w-full sm:max-w-40 md:max-w-52 lg:max-w-72 m-auto duration-150 rounded-sm outline outline-2 outline-secondary" >
        <div className="h-10" onClick={() => handleButtonClick("Browse")}>
          <div className="bg-secondary w-full h-full opacity-35 hover:opacity-70 transition-opacity duration-150 cursor-pointer"/>
          <div className="fit relative flex flex-row isolate-auto justify-center bottom-8 items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="M16 6H3" />
              <path d="M16 12H3" />
              <path d="M16 18H3" />
            </svg>
            <p className={cn(rajdhani.className, " relative top-px")}>Browse</p>
          </div>
        </div>
      </div>
      <div className="w-full sm:max-w-40 md:max-w-52 lg:max-w-72 m-auto duration-150 rounded-sm outline outline-2 outline-secondary" >
        <div className="h-10" onClick={() => handleButtonClick("Update")}>
          <div className="bg-secondary w-full h-full opacity-35 hover:opacity-70 transition-opacity duration-150 cursor-pointer"/>
          <div className="fit relative flex flex-row isolate-auto justify-center bottom-8 items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
              <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
              <circle cx="12" cy="12" r="2" />
              <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
              <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
            </svg>
            <p className={cn(rajdhani.className, " relative top-px")}>Update</p>
          </div>
        </div>
      </div>
    </div>
  )
}
