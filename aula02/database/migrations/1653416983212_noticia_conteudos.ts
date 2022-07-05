import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class NoticiaConteudos extends BaseSchema {
  protected tableName = 'noticia_conteudos'

  public async up () {
    this.schema.alterTable('noticias', (table) => {
      table.text('conteudo')
    })
  }

  public async down () {
    this.schema.alterTable('noticias', (table) => {
      table.dropColumn('conteudo')
    })
  }
}
