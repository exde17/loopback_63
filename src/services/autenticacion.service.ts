import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Llaves } from '../config/llaves';
import { Persona } from '../models';
import { PersonaRepository } from '../repositories';
const generador = require('password-generator')
const cryptojs = require('crypto-js')
const jwt = require('jsonwebtoken')

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public repositorioPersona: PersonaRepository
  ) {}

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

  //identificando a una persona
  IdentificarPersona(usuario: string, clave: string){
    try {
      let p= this.repositorioPersona.findOne({where: {correo: usuario, clave: clave}})
      if(p){
        return p
      }
      return false

    } catch (error) {
      console.log(error)
      return false
    }
  }

  //generar el token
  GeneraraTokenJWT(persona: Persona){
    let token = jwt.sign({
      id: persona.id,
      correo: persona.correo,
      nombre: persona.nombre
    },
    Llaves.claveJWT)

    return token
  }

}
