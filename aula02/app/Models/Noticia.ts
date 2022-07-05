import { DateTime } from 'luxon'
import { 
  BaseModel,
  column,
  hasMany,
  HasMany,
 } from '@ioc:Adonis/Lucid/Orm'
import NoticiaComentario from './NoticiaComentario'

export default class Noticia extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public titulo: string

  @column()
  public conteudo: string

  @hasMany(() => NoticiaComentario)
  public comentarios: HasMany<typeof NoticiaComentario>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public manchete: string

}
