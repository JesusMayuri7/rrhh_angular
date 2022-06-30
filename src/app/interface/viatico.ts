export interface Viatico {
    idcentro_costo;
    informe;
    sustento;
    inicio;
    fin;
    anio;
    destino;
    comisionado:Comisionado[]
  }

export interface Comisionado {
  dni,
  idtrabajador,
  nombres,
  cargo
}

