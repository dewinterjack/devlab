"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@devlab/ui/sidebar";
import { GitBranch, Zap } from "lucide-react";

import { Repo } from "./repo";
import { TriggerExample } from "./trigger-example";

export function Client() {
  const [activeComponent, setActiveComponent] = useState<"repo" | "trigger">(
    "repo",
  );
  return (
    <SidebarProvider>
      <main className="flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveComponent("repo")}
                      isActive={activeComponent === "repo"}
                    >
                      <GitBranch className="mr-2 h-4 w-4" />
                      <span>Repo</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveComponent("trigger")}
                      isActive={activeComponent === "trigger"}
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      <span>Trigger Example</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1">
          <div className="mx-auto flex max-w-screen-sm flex-col gap-12 px-4 py-16">
            {activeComponent === "repo" ? <Repo /> : <TriggerExample />}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
