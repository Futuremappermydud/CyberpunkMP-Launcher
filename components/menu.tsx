"use client"

import { useCallback } from "react"
import Image from "next/image"
import logo from "@/assets/logo.png"
import { WindowTitlebar } from "tauri-controls"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { MenuModeToggle } from "./menu-mode-toggle"
import { Dialog, DialogTrigger } from "./ui/dialog"

export function Menu() {
  const closeWindow = useCallback(async () => {
    window.__TAURI__.window.getCurrent().close();
  }, [])

  return (
    <WindowTitlebar className="h-12">
      <Menubar className="rounded-none border-b border-none mb-1 mt-1 pl-2">
        <MenubarMenu className="p-2">
          <div className="inline-flex h-fit w-fit items-center text-cyan-500">
            <Image src={logo} alt="logo" width={35} height={35} className="rounded"/>
          </div>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="font-bold cursor-pointer">App</MenubarTrigger>
          <Dialog modal={false}>
            <MenubarContent>
              <MenubarItem className="cursor-pointer">
                Preferences
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="cursor-pointer" onClick={closeWindow}>
                Quit Launcher
              </MenubarItem>
            </MenubarContent>
          </Dialog>
        </MenubarMenu>  
        <MenuModeToggle />
      </Menubar>
    </WindowTitlebar>
  )
}
