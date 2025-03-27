import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Landingpage from './components/landing';
import { Separator } from "@/components/ui/separator"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  ShoppingBag,
  SearchIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  GithubIcon
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Landing from './components/landing';

function App() {


  return (
    <>
      <nav className='shadow bg-white'>
        <div className="sep1">
          <div className="logo">
            <img src="" alt="sWerve" />
          </div>

          <div className="searchbar">
            <div className="flex w-full items-center space-x-2">
              <Input type="email" placeholder="What kind of service do you need?" />
              <SearchIcon />
            </div>
          </div>
        </div>

        <div className="sep2">
          <div className="links">
            <h3>
              <Link to="/">
                Explore
              </Link>
            </h3>

            <h3>
              <Link to="/">
                Popular
              </Link>
            </h3>

            <h3>
              <Link to="/">
                <Button>Become a sWerver</Button>
              </Link>
            </h3>
          </div>

          <div className="icons">
            <ShoppingBag />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="avatar">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-10">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    <span>Billing</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Keyboard />
                    <span>Keyboard shortcuts</span>
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Users />
                    <span>Team</span>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus />
                      <span>Invite users</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <Mail />
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare />
                          <span>Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <PlusCircle />
                          <span>More...</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    <Plus />
                    <span>New Team</span>
                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Github />
                  <span>GitHub</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Cloud />
                  <span>API</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
      </nav>

      <main>  
          <Landingpage />
      </main>

      <footer className="bg-white w-full px-8">
          <Separator />
          <div className="w-full flex flex-col items-center gap-4 md:flex-row md:justify-between py-8 text-[#8c8c8c] text-lg">
              <p className="">Ⓒ sWerve Philippines. 2025</p>
              <div className="socials flex gap-5">
                <FacebookIcon className='cursor-pointer' color="#8c8c8c"/>
                <InstagramIcon className='cursor-pointer' color="#8c8c8c"/>
                <XIcon className='cursor-pointer' color="#8c8c8c"/>
                <LinkedinIcon className='cursor-pointer' color="#8c8c8c"/>
                <GithubIcon className='cursor-pointer' color="#8c8c8c"/>
              </div>
          </div>
      </footer>


      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>

    </>
  )
}

export default App
