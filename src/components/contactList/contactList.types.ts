export interface User {
  id: number;
  name: string;
  tag: string;
  status: string;
  photo?: string;
}

export interface PendingRequest {
  id: number;
  contactId: number;
  userId: number;
  status: string;
  user?: User;
  requester?: User;
}

export interface ContactListProps {
  usuarioActual: User | null;
  onSelectContacto: (contacto: User) => void;
}
