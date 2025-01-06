"use client"

import * as React from "react"
import {
  AudioWaveform,
  CircleUser,
  Command,
  GalleryVerticalEnd,
  Settings2,
  Users
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { LoggedUser } from '@/types/FormLogin.type'

// This is sample data.
const dataMenu = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Clientes",
      url: "/clients",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Novo Cliente",
          url: "/clients/create",
        },
        {
          title: "Todos os Clientes",
          url: "/clients",
        }
      ],
    },
    {
      title: "Minha Conta",
      url: "#",
      icon: CircleUser,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname()

  const { data, isLoading } = useQuery<LoggedUser>({
    queryKey: ['login-user'],
    queryFn: () => {
      const savedData = localStorage.getItem('user');
      
      if (savedData) {
        return JSON.parse(savedData);
      }

      return undefined; 
    },
    staleTime: 1000 * 60 * 60 * 24,
  })

  const updatedNavMain = dataMenu.navMain.map((menuItem) => {
    const isActive = menuItem.url === pathName || menuItem.items.some(item => item.url === pathName)
    return { ...menuItem, isActive }
  })

  if (data) {
    dataMenu.user.name = data?.name;
    dataMenu.user.email = data?.email;
  }
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher 
          user={dataMenu.user.name}
          teams={dataMenu.teams} 
          isLoading={isLoading} 
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={updatedNavMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={dataMenu.user} isLoading={isLoading}/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
