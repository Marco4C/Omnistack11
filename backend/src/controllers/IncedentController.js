const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query
        const [ countItems ] = await connection('tb_Incidents').count()
        response.header('X-Total-Count', countItems['count(*)'])
        const incidents = await connection('tb_Incidents')
            .join('tb_ONGs', 'tb_ONGs.id', '=', 'TB_Incidents.ong_id')
            .limit(5)
            .offset((page -1) * 5)
            .select(['tb_Incidents.*',
            'tb_ONGs.name',
            'tb_ONGs.email',
            'tb_ONGs.whatsapp',
            'tb_ONGs.city',
            'tb_ONGs.uf',
        ])
        return response.json(incidents)
    },
    async create(request, response) {
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization

        const [id] = await connection('tb_Incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json({id})
    },

    async delete(request, response) {
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incident = await connection('tb_Incidents').where('id', id).select('ong_id').first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.'})
        }

        await connection('tb_Incidents').where('id', id).delete()
        return response.status(204).send()

    }
}
