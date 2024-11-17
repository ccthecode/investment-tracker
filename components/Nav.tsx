'use client'

import Image from 'next/image'
import { Github, Twitter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Separator } from "@/components/ui/separator"

const Nav = () => {
  const { setTheme } = useTheme()

  return (
    <div>
      <nav className='flex justify-between items-center mb-5'>
          <div className='flex items-center gap-4'>
            <Image alt='investment tracker app logo' src="/ivt.png" width={30} height={30}/>
            <h1 className="text-2xl font-bold">Investment Tracker</h1>
          </div>
          <div className='logos flex items-center gap-4'>                
              <div className='space-y-2'>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/ccthecode/investment-tracker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Github className="h-5 w-5 p-[2px]" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a
                    href="https://twitter.com/ccthecode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Twitter className="h-5 w-5 p-[2px]" />
                    <span className="sr-only">Twitter</span>
                  </a>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <Separator/>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Monitor className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            
          </div>
        </nav>
    </div>
  )
}

export default Nav