import { DateTime } from 'luxon'
import { 
  BaseModel, 
  column,
  belongsTo,
  BelongsTo, } from '@ioc:Adonis/Lucid/Orm'
import UsuarioPostagem from './UsuarioPostagem'
import User from './User'

export default class UsuarioComentario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
