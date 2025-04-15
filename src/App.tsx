import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Landingpage from './components/landing';
import { supabase } from './lib/supabase';


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
  GithubIcon,
  SquareUserRound
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

import { LoginForm } from './components/login-form';
import AuthCallback from './utils/AuthCallback';
import { Session } from '@supabase/supabase-js'
import { signOut } from './utils/auth';
import Profile from './components/profile';
import NotFound from './components/NotFound';
import CategoryPage from './components/CategoryPage';
import Dashboard from './components/Dashboard';



function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Fetch session on load
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    }

    getSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => subscription.unsubscribe()
  }, [])

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

            {/* <h3>
              <Link to="/">
                <Button>Become a sWerver</Button>
              </Link>
            </h3> */}
          </div>

          <div className="icons">

            {session ?
              <div className='flex gap-3 justify-center items-center'>
                <ShoppingBag />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="avatar">
                      <AvatarImage src={session.user.user_metadata.avatar_url} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mr-10">
                    <DropdownMenuLabel>Hello <b>{session.user.user_metadata.full_name}</b>!</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link to="/Profile">
                          <User />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/Dashboard">
                          <SquareUserRound />
                          <span>sWerver Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard />
                        <span>Billing & Addresses</span>

                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings />
                        <span>Settings</span>
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
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LifeBuoy />
                      <span>Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <Cloud />
                      <span>API</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              :

              <Link to="/Login">
                <Button>Become a sWerver</Button>
              </Link>
            }

          </div>

        </div>
      </nav>

      

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={<Landingpage />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/category-page" element={<CategoryPage />} />
        <Route path="/Profile" element={<Profile session={session} />} />
        <Route path="/Dashboard" element={<Dashboard session={session} />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        <Route path="*" element={<NotFound />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>

    </>
  )
}

export default App
