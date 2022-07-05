import { DateTime } from 'luxon'
import { 
  BaseModel,
  column,
  belongsTo,
  BelongsTo, } from '@ioc:Adonis/Lucid/Orm'
import UsuarioComentario from './UsuarioComentario'
import User from './User'

export default class UsuarioPostagem extends BaseModel {
  public static table = 'usuario_postagens'
  @column({ isPrimary: true })
  public id: number

  @column()@column()
  public userId:number 

  @belongsTo(() => User)
  public user:BelongsTo<typeof User>

  @column()
  public postagemId: number

  @belongsTo(() => UsuarioComentario)
  public noticia: BelongsTo<typeof UsuarioComentario>

  @column()
  public comentario: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
