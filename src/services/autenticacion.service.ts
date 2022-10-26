import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generador = require('password-generator')
const cryptojs = require('crypto-js')

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  //crear contraseña aleatoriamente
  GenerarClave(){
    let clave = generador(8,false)
    return clave
  }

  //cifrar contraseña generada anteriormente
  CifrarClave(clave: String){
    let claveCifrada = cryptojs.MD5(clave).toString()
    return claveCifrada
  }

}
