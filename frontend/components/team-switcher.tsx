/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Skeleton } from './ui/skeleton'

export function TeamSwitcher({
  teams,
  isLoading,
  user
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[],
  isLoading: boolean,
  user: string
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
                {isLoading ? (<Skeleton className="h-8 w-[35px]"/>) 
                  : (
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <activeTeam.logo className="size-4" />
                    </div>
                  ) 
                }
              <div className="grid flex-1 text-left text-sm leading-tight">
                {isLoading ? (<>
                  <Skeleton className="h-3 w-[100px] mb-2"/>
                  <Skeleton className="h-3 w-[100px]"/>
                </>) 
                  : (
                    <>
                      <span className="truncate font-semibold">
                        {user}
                      </span>
                      <span className="truncate text-xs">CURD - Clients</span>
                    </>
                  ) 
                }
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
