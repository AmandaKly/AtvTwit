import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Noticia from 'App/Models/Noticia'
export default class SitesController {
    async index ({ view }: HttpContextContract) {

        // const users = [
        //     {id: 1, nome: 'Maria', email: 'maria@gmail.edu.br', idade: 15},
        //     {id: 2, nome: 'Clara', email: 'clara@gmail.com',idade: 18},
        //     {id: 3, nome: 'Artara', email: 'artara@gmail.edu.br',idade: 20}
        // ]
        const noticias = await Noticia.all()

        return view.render('site/index', {
            titulo: 'Minha primeira página',
            noticias
        })
    }

    async create ({ view }: HttpContextContract) { 
        const noticia = new Noticia()
        noticia.titulo = 'Meu título'
        noticia.conteudo = 'Meu conteúdo'
        await noticia.save()
    }
    
}
