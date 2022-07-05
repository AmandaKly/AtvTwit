import { DateTime } from 'luxon'
import { 
  BaseModel,
  column, 
  beforeSave, 
  computed,
  hasMany,
  HasMany, } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import UsuarioPostagem from './UsuarioPostagem'
import AmigosDoUsuario from './AmigosDoUsuario'
import NoticiaComentario from './NoticiaComentario'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome:string

  @column()
  public login:string

  @column()
  public senha:string

  @column()
  public papel: 'administrador' | 'usuario'
  
  @computed()
  public get password() {
    return this.senha
  }

  // Não remover oq já tinha
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
// isso aqui foi acrescentado
  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.senha) {
      user.senha = await Hash.make(user.senha)
    }
  }
}
