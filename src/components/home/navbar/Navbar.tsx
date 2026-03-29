interface navbarProps {
  userName : string;
}

const Navbar = ({userName}:navbarProps) => {
    const fotoPerfil = `/${userName}.jpeg`;
    const fotoDefault = "/fotoperfil.jpeg";
    
    return (
      <nav className="navbar  h-20 bg-slate-900 flex flex-row w-full">

          <div className='h-20 w-20 flex items-center justify-center'>
            <img src={fotoPerfil} className="w-12 h-12 rounded-4xl" onError={(e) => {
            e.currentTarget.src = fotoDefault;
          }}></img>
          </div>
          <div className='h-20 w-20 flex items-center justify-center font-bold text-xl'>{userName}</div>
      </nav>
  );
};

export default Navbar;