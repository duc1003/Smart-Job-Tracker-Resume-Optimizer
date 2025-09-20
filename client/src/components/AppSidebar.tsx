
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  Settings,
  Brain,
  Calendar,
  Target
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Job Applications",
    url: "/applications",
    icon: Briefcase,
  },
  {
    title: "CV Manager",
    url: "/cv-manager",
    icon: FileText,
  },
  {
    title: "AI Analysis",
    url: "/ai-analysis",
    icon: Brain,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: TrendingUp,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
];

const toolsItems = [
  {
    title: "Job Matcher",
    url: "/job-matcher",
    icon: Target,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r-0 shadow-lg">
      <SidebarHeader className="border-b bg-gradient-to-r from-purple-50 to-blue-50 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              JobTracker AI
            </h2>
            <p className="text-xs text-muted-foreground">Smart Career Assistant</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-2 py-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 rounded-lg transition-all duration-200"
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-2 py-2">
            Tools & Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 rounded-lg transition-all duration-200"
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@example.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
