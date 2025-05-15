import { useState, useEffect, useRef } from 'react'
import './App.css'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Landingpage from './components/landing';
import { supabase } from './lib/supabase';
import ServicePage from './components/ServicePage';
import SearchDisplay from './components/SearchDisplay';
import { Toaster } from 'sonner';

import { useNavigate } from "react-router-dom";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  Cloud,
  CreditCard,
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
import GeneralPage from './components/GeneralPage';

interface UserData {
  avatar_url: string;
  full_name: string;
  username: string;
  address_primary: string;
  language_primary: string;
}


function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [data, setData] = useState<UserData | null>(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/searchresults?term=${encodeURIComponent(query.trim())}`);
    }
  };

  useEffect(() => {
    // Fetch session on load
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
    if (newSession?.access_token !== session?.access_token) {
      setSession(newSession);
      hasFetchedProfile.current = false;
    }
  });

  return () => {
    subscription.unsubscribe(); // ✅ correct now
  };
}, []);

  const hasFetchedProfile = useRef(false);

async function getProfile() {
  if (!session || hasFetchedProfile.current) return;

  hasFetchedProfile.current = true; // prevent multiple fetches

  const userId = session.user.id;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return;
  }

  console.log("Profile data:", data);
  setData(data);
}

  // Call the function to fetch the profile
  useEffect(() => {
    getProfile();
  }, [session]);

  return (
    <>
      <nav className='shadow bg-white'>
        <div className="sep1">
          <div className="logo">
            <Link to='/Home'>
              <img src="./sWerve Temp Logo.png" alt="LOGO" className="logo w-[50px] h-[50px]" />
            </Link>

          </div>

          <form onSubmit={handleSearch} className="searchbar pl-2">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="What kind of service do you need?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit">
                <SearchIcon />
              </button>
            </div>
          </form>


        </div>

        <div className="sep2">
          <div className="links">
            <h3>
              <Link to="/general">
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
                      <AvatarImage src={data?.avatar_url} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mr-10">
                    <DropdownMenuLabel>Hello <b>{data?.full_name}</b>!</DropdownMenuLabel>
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
      <Toaster richColors position="top-center" />



      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={<Landingpage />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/general" element={<GeneralPage />} />
        <Route path="/category-page" element={<CategoryPage />} />
        <Route path="/Profile" element={<Profile session={session} />} />
        <Route path="/Dashboard" element={<Dashboard session={session} />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/services" element={<GeneralPage />} />
        <Route path="/services/:id" element={<ServicePage />} />
        <Route path="/searchresults" element={<SearchDisplay />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  )
}

export default App
