//import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

interface navbarProps {
  userName : string;
}

const Navbar = ({userName}:navbarProps) => {
    const [scrollOffset, setScrollOffset] = useState(0);
    const maxHide = 80; // altura del navbar
    const fotoPerfil = `/${userName}.jpeg`;
    const fotoDefault = "/fotoperfil.jpeg";
    useEffect(() => {
      let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollY;
      lastScrollY = currentScroll;
    
      // limitar entre 0 y altura navbar
      setScrollOffset(prev => {
                let newOffset = prev + delta;
                newOffset = Math.max(0, Math.min(maxHide, newOffset));
                return newOffset;
            });
        };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    return (
      <nav className="navbar w-full h-20 bg-emerald-800 flex flex-column" style={{ transform: `translateY(-${scrollOffset}px)` }}>
          <div className='h-20 w-20 flex items-center justify-center'>
            <img src={fotoPerfil} className="w-12 h-12 rounded-4xl" onError={(e) => {
            // Si la imagen no existe, usar la foto por defecto
            e.currentTarget.src = fotoDefault;
          }}></img>
          </div>
          <div className='h-20 w-20 flex items-center justify-center font-bold text-xl'>{userName}</div>
      </nav>
  );
};

export default Navbar;