// Cliente.ts
export interface ClienteProps {
    id: string | null;
    alias: string;
    name: string;
    contacto: string;
    telefono: string;
    domicilio: string;
    correo: string;
}

class Cliente {
    id: string | null;
    alias: string;
    name: string;
    contacto: string;
    telefono: string;
    domicilio: string;
    correo: string;

    constructor({ id, alias, name, contacto, telefono, domicilio, correo }: ClienteProps) {
        this.id = id;
        this.alias = alias;
        this.name = name;
        this.contacto = contacto;
        this.telefono = telefono;
        this.domicilio = domicilio;
        this.correo = correo;
    }

}

export default Cliente;
