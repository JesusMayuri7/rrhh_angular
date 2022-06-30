export interface Presupuesto {
    id:string,
    fuente:string;
    meta?:string;
    especifica?:string;
    detalle?:string;
    idactividad?:number;
    actividad?:string;
    pim?:number;
    pia?:number;
    Total?:number;
    Saldo?:number;
    enero?:number,
    febrero?:number,
    marzo?:number,
    abril?:number,
    mayo?:number,
    junio?:number,
    julio?:number,
    agosto?:number,
    setiembre?:number,
    octubre?:number,
    noviembre?:number,
    diciembre?:number,
    analisis?:number,
    pea?:any[]
  }