"use client"

import { useState, useEffect } from "react";
import { Menu } from '@/components/menu'
import { Sidebar } from '@/components/sidebar'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import Image from "@/node_modules/next/image";
import cplogo from "@/assets/Cyberpunk.png"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { invoke } from '@tauri-apps/api/core';

import { Rajdhani } from 'next/font/google'

const rajdhani = Rajdhani({ 
  weight: ['600', '700'],
  subsets: ['latin'], 
})

const servers = [
  {
    invoice: "CP001",
    paymentStatus: "Lobby",
    totalAmount: "XXX's lobby",
    players: "2/4",
  },
  {
    invoice: "CP002",
    paymentStatus: "Playing",
    totalAmount: "YYY's lobby",
    players: "4/4",
  },
  {
    invoice: "CP003",
    paymentStatus: "Lobby",
    totalAmount: "ZZZ's lobby",
    players: "3/4",
  },
  {
    invoice: "CP004",
    paymentStatus: "Lobby",
    totalAmount: "AAA's lobby",
    players: "1/4",
  },
  {
    invoice: "CP005",
    paymentStatus: "Playing",
    totalAmount: "BBB's lobby",
    players: "3/4",
  },
  {
    invoice: "CP006",
    paymentStatus: "Playing",
    totalAmount: "CCC's lobby",
    players: "4/4",
  },
  {
    invoice: "CP007",
    paymentStatus: "Lobby",
    totalAmount: "DDD's lobby",
    players: "2/4",
  },
]

export default function Home() {
  const [page, setPage] = useState("Play");
  const [path, setPath] = useState("None found");
  useEffect(() => {
    if(path == "None found")
    {
      invoke("get_game_path", {}).then((value) => { 
        setPath(value); 
      });
    }
  });

  return (
    <div className="h-screen overflow-clip">  
      <Menu />
      <div className="w-full h-px bg-border"/>
      <div
        className={cn(
          "h-screen overflow-auto bg-background pb-8",
          "scrollbar scrollbar-track-transparent scrollbar-thumb-accent scrollbar-thumb-rounded-md"
        )}
      >
        <ResizablePanelGroup
          direction="horizontal"
        >
          <ResizablePanel defaultSize={20} maxSize={30} minSize={16}>
            <div className="flex h-[200px] items-center justify-center top-10 relative">
              <Sidebar onChange={(page: string) => setPage(page) }/>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={80}>
            <div className="flex items-center justify-center pl-6 pr-6">
              <Tabs value={page} className="w-full">
                <TabsContent value="Play" className="pt-12 w-full justify-items-center space-y-12 font-bold">
                  <Image src={cplogo} alt="Cyberpunk 2077 logo" className="w-3/4 m-auto"/>
                  <div className="border border-[#F75049] rounded-md w-fit h-fit p-4 m-auto">
                    <p className="text-center">Injector is not installed. Game will be launched vanilla</p>
                    <p className="text-center font-normal text-sm"><span className="text-xl text-[#F75049]">←</span> Install injector in the install tab to the left</p>
                  </div>
                  <div className="border border-border rounded-md w-fit h-fit p-2 m-auto">
                    <p className="text-center text-sm">Game Path: <span onClick={()=>{window.__TAURI_INTERNALS__.invoke('open_path', { path: path });}} className="hover:italic font-normal cursor-pointer">{path}</span></p>
                  </div>
                  <div className="m-auto w-2/3 h-14">
                  <div className="w-full h-full m-auto duration-150 rounded-sm outline outline-2 outline-[#F75049]" >
                    <div className="h-full">
                      <div className="bg-secondary w-full h-full opacity-35 hover:opacity-70 transition-opacity duration-150 cursor-pointer"/>
                      <div className="fit relative flex flex-row isolate-auto justify-center bottom-11 items-center pointer-events-none">
                        <p className={cn(rajdhani.className, "text-2xl font-bold tracking-widest relative top-px")}>LAUNCH</p>
                      </div>
                    </div>
                  </div>
                  </div>
                </TabsContent>

                <TabsContent value="Browse" className="justify-items-center space-y-2">
                  <div className="w-32 mr-auto duration-150 rounded-sm outline outline-2 outline-[#F75049]" >
                    <div className="h-10" onClick={() => handleButtonClick("Play")}>
                      <div className="bg-secondary w-full h-full opacity-35 hover:opacity-70 transition-opacity duration-150 cursor-pointer"/>
                      <div className="fit relative flex flex-row isolate-auto justify-center bottom-8 items-center pointer-events-none">
                        <p className={cn(rajdhani.className, " relative top-px")}>Refresh</p>
                      </div>
                    </div>
                  </div>
                  <ScrollArea className="h-screen pr-3">
                    <Table className="rounded-2xl border-separate border border-border border-spacing-0">
                      <TableCaption>Available Servers</TableCaption>
                      <TableHeader>
                        <TableRow className="border-border">
                          <TableHead className="w-[100px] rounded-tl-2xl">Code</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead className="text-right rounded-tr-2xl">Players</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {servers.map((server) => (
                          <TableRow key={server.invoice} className="border-border s-x-0">
                            <TableCell className="font-medium rounded-l-2xl">{server.invoice}</TableCell>
                            <TableCell>{server.paymentStatus}</TableCell>
                            <TableCell>{server.totalAmount}</TableCell>
                            <TableCell className="text-right rounded-r-2xl">{server.players}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="Update">
                  <div className="justify-center m-auto">
                    <div className="rounded-2xl border border-border mt-20 pt-3 pb-3 pl-10 pr-10 w-fit m-auto">
                      <p className="text-center leading-7">Current Version 0.1.0<br/>LatestVersion 0.1.0</p>
                      <p className="font-bold text-green-600 text-center pt-5 text-xl tracking-wide">Good to go!</p>
                    </div>
                  </div>
                  <div className="justify-center m-auto">
                    <div className="rounded-2xl border border-border mt-20 pt-3 pb-3 pl-10 pr-10 w-fit m-auto flex flex-col items-center">
                      <p className="text-center leading-7 text-2xl pb-6">Release Notes (0.1.0):</p>
                      <ul className="list-disc flex flex-col items-center">
                        <li>Fixed issues</li>
                        <li>Fixed more issues</li>
                        <li>Fixed more more issues</li>
                        <li>Fixed more more more issues</li>
                        <li>Fixed more more more more issues</li>
                        <li>Fixed more more more more more issues</li>
                      </ul>
                    </div>
                  </div>
                  <div className="justify-center flex pt-16">
                  <div className="w-48 m-auto duration-150 rounded-sm outline outline-2 outline-[#F75049]" >
                    <div className="h-10" onClick={() => handleButtonClick("Play")}>
                      <div className="bg-secondary w-full h-full opacity-35 hover:opacity-70 transition-opacity duration-150 cursor-pointer"/>
                      <div className="fit relative flex flex-row isolate-auto justify-center bottom-8 items-center pointer-events-none">
                        <p className={cn(rajdhani.className, " relative top-px")}>Check for Updates</p>
                      </div>
                    </div>
                  </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
