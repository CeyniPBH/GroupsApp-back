export interface User {
  id: number;
  name: string;
  tag: string;
  status: string;
}

export interface ContactListProps {
  usuarioActual: User | null;
  onSelectContacto: (contacto: User) => void;
}
