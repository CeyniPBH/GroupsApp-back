import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EllipsisVerticalIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";
import "./MenuDrawer.css";

interface SubItem {
  title: string;
  href: string;
}

interface MenuItem {
  title: string;
  href: string;
  subItems: SubItem[];
}
interface MenuDrawerProps {
  navVisible: boolean;
  scrollOffset?: number;
}

const MenuDrawer = ({ navVisible }: MenuDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();


  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  const handleNavigation = (href: string) => {
    setIsOpen(false);

    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  const menuItems: MenuItem[] = [
    { title: "Inicio", href: "#inicio", subItems: [] },
    {
      title: "Áreas de Atención",
      href: "#servicios",
      subItems: [
        ]
    },
    {title: "recurso-respiracion", href: "#recursos", subItems: [] },
    {title : "¿Cómo elegir?", href: "#como-elegir", subItems: [] },
    { title: "especialistas", href: "#equipo", subItems: [] },
    { title: "Contacto", href: "#contacto", subItems: [] },
    {title: "formulario",href:"/nuevo-paciente", subItems: []}
  ];

  return (
    <>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="md-trigger-button"
        >
          <EllipsisVerticalIcon className="md-trigger-icon" />
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(false)}
          className="md-close-button"
        >
          <XMarkIcon className="md-close-icon" />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 17 }}
              className={`md-drawer ${!navVisible ? "full" : ""}`}          
            >
              <nav className="md-nav">
                <ul className="md-menu-list">
                  {menuItems.map((item, idx) => (
                    <li key={idx} className="md-menu-item">
                      <div className="md-menu-header">
                        <span
                          onClick={() =>
                            !item.subItems.length &&
                            handleNavigation(item.href)
                          }
                          className="md-menu-link"
                        >
                          {item.title}
                        </span>

                        {item.subItems.length > 0 && (
                          <ChevronDownIcon
                            onClick={() => toggleSection(item.title)}
                            className={`md-chevron ${
                              expandedSection === item.title ? "open" : ""
                            }`}
                          />
                        )}
                      </div>

                      <AnimatePresence>
                        {item.subItems.length > 0 &&
                          expandedSection === item.title && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="md-submenu"
                            >
                              {item.subItems.map((sub, subIdx) => (
                                <li key={subIdx}>
                                  <span
                                    onClick={() =>
                                      handleNavigation(sub.href)
                                    }
                                    className="md-submenu-link"
                                  >
                                    {sub.title}
                                  </span>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                      </AnimatePresence>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuDrawer;
