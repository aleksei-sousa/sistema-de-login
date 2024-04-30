const mongoose = require('mongoose')
const Territorios = require('../models/Territorios')
const Concluidos = require('../models/Concluidos')
const getToken = require('../helpers/getToken')
const jwt = require('jsonwebtoken')
module.exports = class TerritoriosController {

    static async Subir (req, res) {

        const {numero, anotacoes, marcacoes, dataInicio} = req.body

        console.log(numero, anotacoes, marcacoes, dataInicio)

        const token = getToken(req)
        console.log(marcacoes)
        const decoded = jwt.verify(token, "nossosecret")
        const responsavel = decoded.name

        if(!numero){
            res.status(410).json({message: "sem número"})
            return
        }
        // if((!anotacoes) && (!marcacoes)){
        //     res.status(410).json({message: "sem anotacoes e marcacoes"})
        //     return
        // }
        if(!dataInicio){
            res.status(410).json({message: "Digite a data do inicio"})
            return
        }
        // if(dataFinal){
        //     if(concluido){
        //         res.status(410).json({message: "Digite a Data da Conclusão"})
        //         return
        //     }
        // }


        // console.log(datafinal)
        // if(dataFinal){
        //         res.status(410).json({message: "Marque a conclusão"})
        //         return
        //     }

        // }
        if(!responsavel){
            res.status(410).json({message: "Sem responsável"})
            return
        }
        const anotacoesUpadate = {}
        if(!anotacoes){
            anotacoesUpadate.vazio = ''
        } else {
            anotacoesUpadate.vazio = anotacoes
        }



        // if(concluido){
        //     //adicionar ao db
        //     //remover do db e marcar concluído
        //     const conclusao = new Concluidos ({
        //         numero: numero,
        //         responsavel: responsavel,
        //         dataInicio: dataInicio,
        //         dataFinal: dataFinal,
        //     })
        //     //console.log(conclusao)

        //     try {

            
        //     const filter = { numero: numero };
        //         const update = {
        //             numero: numero,
        //             responsavel: responsavel,
        //             anotacoes: ' ! Recomece !',
        //             marcacoes: '',
        //             dataInicio: '',
        //             dataFinal: '',
        //             concluido: false
        //         };

        //         const newConcluidos = conclusao.save()
        //         await Territorios.findOneAndUpdate(
        //             filter,
        //             update,
        //             { new: true},
        //         )
        //         res.status(210).json({
        //             message: "Território fechado e encerrado"
        //         })

        //         return
            
        //     } catch (error) {
        //         res.status(410).json({message: error})
        //     }

        //     return
        // } else {
        //     //console.log('não' + concluido)


        const mapaExist = await Territorios.findOne({numero: numero})
        //console.log(mapaExist)

        //se mapa não existe
        if(!mapaExist){
            const territorio = new Territorios ({
                numero: numero,
                responsavel: responsavel,
                anotacoes: anotacoes,
                marcacoes: marcacoes,
                dataInicio: dataInicio,
            })
            //  console.log(territorio)
            try {
                const newTerritorio = territorio.save()
                res.status(210).json({message: "território adicionado"})
            } catch (error) {
                res.status(410).json({message: error})
            }
        } else {    
            
                const filter = { numero: numero };
                const update = {
                    numero: numero,
                    responsavel: responsavel,
                    anotacoes: anotacoesUpadate.vazio,
                    marcacoes: marcacoes,
                    dataInicio: dataInicio,
                };
                //console.log()
                try{
                //let doc = await Territorios.findOneAndUpdate(filter, update);
                await Territorios.findOneAndUpdate(
                    filter,
                    update,
                    { new: true},
                )
                    res.status(210).json({
                        message: "Território atualizado"
                    })

            } catch (err) {
                res.status(500).json({ message: `errei mulk ${err}`})
            }
        //}
    }
    }

    static async Update (req, res){
              
    // Consultando e retornando os valores de 'numero' de 1 a 25 em um objeto
        const territorios = await Territorios.find({ numero: { $gte: 0, $lte: 26 } })

        if (!territorios) {
            res.status(510).json({message: "sem mapas"})
        } else {
            res.status(210).json({
                message: territorios
            })
        }
    }

    static async Concluir (req, res) {
        const {numero, dataInicio, dataFinal, concluido} = req.body

        const token = getToken(req)
        const decoded = jwt.verify(token, "nossosecret")
        const responsavel = decoded.name


        if(!numero){
            res.status(410).json({message: "sem número"})
            return
        }

        if(!dataInicio){
            res.status(410).json({message: "Digite a data do inicio"})
            return
        }

        if(!dataFinal){
            res.status(410).json({message: "Digite a Data da Conclusão"})
            return
        }

            //adicionar ao db
            //remover do db e marcar concluído
            const conclusao = new Concluidos ({
                numero: numero,
                responsavel: responsavel,
                dataInicio: dataInicio,
                dataFinal: dataFinal,
            })

            try {
                const newConcluido = conclusao.save()
                res.status(210).json({message: "território fechado adicionado"})
            } catch (error) {
                res.status(410).json({message: error})
            }

            try {

            const filter = { numero: numero };
                const update = {
                    numero: numero,
                    responsavel: responsavel,
                    anotacoes: ' ! Recomece !',
                    marcacoes: '',
                    dataInicio: '',
                    dataFinal: '',
                    concluido: false
                };

                await Territorios.findOneAndUpdate(
                    filter,
                    update,
                    { new: true},
                )
            
            } catch (error) {
                return res.status(410).json({message: error})
                
            }

    //         return


     }
}