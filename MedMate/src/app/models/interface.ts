export interface doctor{
    uid: string,
    nombre: string,
    apellido: string,
    cedula: string,
    especialidad: string,
    correo: string,
    contraseña: string,
    rol: "Doctor",
}

export interface paciente{

    uid:string,
    nombre: string,
    apellido: string,
    cedula: string,
    fnacimiento: string,
    edad: number,
    correo: string,
    contraseña: string,
    rol: 'Paciente',
}