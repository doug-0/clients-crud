/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { useQueryClient } from '@tanstack/react-query'
import { logOutUser } from '@/service/authservice'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export function NavUser({
  user,
  isLoading
}: {
  user: {
    name: string
    email: string
    avatar: string
  },
  isLoading: boolean
}) {
  const { isMobile } = useSidebar();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  const logoutUser = () => {
    queryClient.clear();

    logOutUser()

    router.push('/login')

    toast({
      title: 'Logout feito com sucesso!',
      description: 'Até logo!',
      variant: 'default',
    })
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {isLoading ? (<>
                <Skeleton className="h-8 w-8 rounded-full"/>
                <Skeleton className="h-7 w-[120px]"/>
              </>) 
                : (
                  <>
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="rounded-lg">{`${user.name[0].toUpperCase()}${user.name[1].toUpperCase()}`}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </>
                ) 
              }
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{`${user.name[0].toUpperCase()}${user.name[1].toUpperCase()}`}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
              <Link onClick={() => logoutUser()} href={'/login'} className='flex align-middle'>
                <DropdownMenuItem>
                  <LogOut size={15} className='mr-4' />
                  Log out
                </DropdownMenuItem>
              </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
