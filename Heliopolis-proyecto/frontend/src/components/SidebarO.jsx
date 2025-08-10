import React, { useState } from "react";
import Sidebar, { SidebarItem } from "./Sidebar.jsx";
import { Home, User, Settings } from "lucide-react";

export default function SidebarO() {
  const [activeItem, setActiveItem] = useState("Inicio");

  
  return (
    <Sidebar>
      <SidebarItem
        icon={<Home size={20} />}
        text="Inicio"
        active={activeItem === "Inicio"}
        onClick={() => setActiveItem("Inicio")}
      />
      <SidebarItem
        icon={<User size={20} />}
        text="Perfil"
        active={activeItem === "Perfil"}
        onClick={() => setActiveItem("Perfil")}
      />
      <SidebarItem
        icon={<Settings size={20} />}
        text="Configuración"
        active={activeItem === "Configuración"}
        alert
        onClick={() => setActiveItem("Configuración")}
      />
    </Sidebar>
  );
}

