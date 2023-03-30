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

export interface medicacion{
    medicamento: string,
    cdias: number,
    fecha: string,
    hora: number,
    userid: string,
}

export interface especialidad{
    especialidad: string,
}

export interface cita{
    doctor: string,
    iddoctor: string,
    paciente: string,
    idpaciente: string,
    especialidad: string,
    fecha: Date,
    hora: number,

}

export interface Reporte{
    nombre: string;
    idpaciente: string;
    edad: number;
    peso: number;
    altura: number;
    medicamentos: string;
    condicion: string;  
    id: string;
    iddoctor: string;
    doctorname: string;
    especialidad: string;
    fecha: Date;
  }