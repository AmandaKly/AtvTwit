import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class NoticiasChamadas extends BaseSchema {
  protected tableName = 'noticias_chamadas'

  public async up () {
    this.schema.alterTable('noticias', (table) => {
      table.text('manchete')
    })
  }

  public async down () {
    this.schema.alterTable('noticias', (table) => {
      table.dropColumn('manchete')
    })
  }
}
