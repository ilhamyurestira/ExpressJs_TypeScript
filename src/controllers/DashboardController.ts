import { Request, Response } from 'express';
import { sequelize } from '../db/models';
import timses_ilham from '../db/models/timses_ilham';
const db = require('../db/models');

class DashboardController {

    getReport = async (req: Request, res: Response): Promise<Response> => {
        try {
            const jumlahSuara = `(SELECT SUM("jumlah_suara") FROM "hasil_pemilihan_ilhams" WHERE "cakades_ilham"."id" = "hasil_pemilihan_ilhams"."id_cakades")`;

            const reports = await db.cakades_ilham.findAll({
                timses_ilham,
                attributes: {
                    exclude: ['id', 'id_desa', 'nik_cakades', 'alamat_cakades', 'createdAt', 'updatedAt'],
                    include: [
                        [sequelize.col('desa_ilham.nama_desa'), 'nama_desa'],
                        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('relawan_ilham.nik_relawan'))), 'jumlah_relawan'],
                        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('timses_ilham.nik_timses'))), 'jumlah_timses'],
                        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('simpatisan_ilham.nik_simpatisan'))), 'jumlah_simpatisan'],
                        [sequelize.literal(jumlahSuara), 'total_suara']
                    ],
                },
                include: [
                    {
                        model: db.desa_ilham,
                        as: 'desa_ilham',
                        attributes:
                        {
                            exclude: ['id', 'nama_desa', 'createdAt', 'updatedAt'],
                        }
                    },
                    {
                        model: db.relawan_ilham,
                        as: 'relawan_ilham',
                        attributes:
                        {
                            exclude: ['id_cakades', 'id', 'nik_relawan', 'nama_relawan', 'kelurahan', 'no_tps', 'id_timses', 'createdAt', 'updatedAt'],
                        }
                    },
                    {
                        model: db.timses_ilham,
                        as: 'timses_ilham',
                        attributes:
                        {
                            exclude: ['id_cakades', 'id', 'nik_timses', 'nama_timses', 'alamat_timses', 'createdAt', 'updatedAt'],
                        }
                    },
                    {
                        model: db.simpatisan_ilham,
                        as: 'simpatisan_ilham',
                        attributes:
                        {
                            exclude: ['id_cakades', 'id', 'nik_simpatisan', 'nama_simpatisan', 'alamat_simpatisan', 'id_relawan', 'createdAt', 'updatedAt'],
                        }
                    },
                    {
                        model: db.hasil_pemilihan_ilham,
                        as: 'hasil_pemilihan_ilham',
                        attributes:
                        {
                            exclude: ['id_cakades', 'id', 'no_tps', 'jumlah_suara', 'createdAt', 'updatedAt'],
                        },
                    },
                ],
                group: ['cakades_ilham.id', 'cakades_ilham.nama_cakades', "desa_ilham.nama_desa"],
                raw: true,
            });

            if (reports.length === 0) {
                return res.status(200).send('Belum ada data hasil pemilihan.');
            }

            return res.status(200).json(reports);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Gagal mengambil data laporan.');
        }
    }

}

export default new DashboardController();
