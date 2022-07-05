import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Noticia from 'App/Models/Noticia'

export default class NoticiasController {
    async index ({ view }: HttpContextContract) {
    /**Listar  */
        const noticias = await Noticia.query().orderBy('created_at', 'desc')
       
        return view.render('noticias/index',{
            noticias
        })
    }
 
      /** busca
         * deletar
         */
    async delete ({ params, response, bouncer }: HttpContextContract) {
        try{
            bouncer.authorize('noticiasDelete')
        const noticia = await Noticia.findOrFail(params.id)
        await noticia.delete()
        } catch (e) {

        }
        return response.redirect().toRoute('noticiasIndex')  
    }
    

       /**Exibe o formulário/renderizar o formulário */
    async create ({ view, session, bouncer }: HttpContextContract) {
        bouncer.authorize('noticiasCreate')
        const noticia = session.flashMessages.get('noticia') || {}
        return view.render('noticias/create', {
            noticia
        })
        
    }
      /**Armazena os dados do formulário @param param0*/
    async store ({ request, response, session, bouncer }: HttpContextContract) {
        bouncer.authorize('noticiasCreate')
        const dados = request.only(['titulo', 'conteudo', 'manchete'])
        try{
        await Noticia.create(dados)
        return response.redirect().toRoute('noticias.index')   
        }
        catch(e) {
            session.flash('erro','Erro ao cadastrar notícia')
            session.flash('noticia', dados)
            return response.redirect().toRoute('noticias.create')   
        }     
  
    }
    /**Buscar um registro e exibir o formulário preenchido */
    async edit ({params, view, bouncer }: HttpContextContract) {
        try{
            bouncer.authorize('noticiasUpdate')
            const noticia = await Noticia.findOrFail(params.id)
            // console.log(noticia)
            return view.render('noticias/edit', {
                noticia
            })} catch(e) {

            }

    }
    /** buscar um registro
         * alteração e persistência 
         * Armazena as alterações do formulário no BD @param param0*/ 
    async update ({params, request, response, bouncer }: HttpContextContract) {
        bouncer.authorize('noticiasCreate')
        const noticia = await Noticia.findOrFail(params.id)
        noticia.merge(request.only(['titulo','conteudo', 'manchete']))
        try{
            await noticia.save()
        } catch(e) {

        }
        return response.redirect().toRoute('noticias.index')   
    }

    async view ({view, params, response }: HttpContextContract) {
        const noticia = await Noticia.query().preload('comentarios').where
        ('id', params.id).first()
        if (noticia) {
            return view.render('noticias/view', {
                noticia
            })
        }else {
            return response.redirect().back()
        }
    }

    async createComment ({params, response, request, auth }: HttpContextContract) {
        const noticia = await Noticia.findOrFail(params.id)
        if (auth.use('web').user){
            const comentario = {
            ...request.only(['comentario']),
            userId: auth.use('web').user?.id
        }
        await noticia.related('comentarios').create(comentario)
            // request.only(['comentario'])
        }
          return response.redirect().back()
    }

}
