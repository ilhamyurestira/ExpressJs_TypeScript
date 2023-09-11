import { Request, Response } from 'express';
import cakades_ilham from '../db/models/cakades_ilham';
import { sequelize } from '../db/models';
const db = require('../db/models');

class HasilPemilihanController {
    createHasilPemilihan = async (req: Request, res: Response): Promise<Response> => {
        const { id_cakades, no_tps, jumlah_suara } = req.body;

        try {
            const existingCakadesId = await db.cakades_ilham.findByPk(id_cakades);
            if (!existingCakadesId) {
                return res.status(400).send('ID Cakades tidak ditemukan');
            }

            const newHasilPemilihan = await db.hasil_pemilihan_ilham.create({
                id_cakades,
                no_tps,
                jumlah_suara,
            });


            return res.status(200).send(`Data hasil pemilihan berhasil ditambah`);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data gagal ditambahkan');
        }
    }

    getReport = async (req: Request, res: Response): Promise<Response> => {
        try {
            const hasilPemilihanList = await db.hasil_pemilihan_ilham.findAll();
            if (hasilPemilihanList.length === 0) {
                return res.status(200).send('Belum ada data hasil pemilihan.');
            }

            const report = [];
            for (const hasilPemilihan of hasilPemilihanList) {
                const cakades = await db.cakades_ilham.findByPk(hasilPemilihan.id_cakades);
                if (!cakades) {
                    return res.status(500).send(` ${hasilPemilihan.id}`);
                }

                const timses = await db.timses_ilham.count({ where: { id_cakades: cakades.id } });
                const relawan = await db.relawan_ilham.count({ where: { id_cakades: cakades.id } });
                const simpatisan = await db.simpatisan_ilham.count({ where: { id_cakades: cakades.id } });

                report.push({
                    nama_cakades: cakades.nama_cakades,
                    jumlah_suara: hasilPemilihan.jumlah_suara,
                    jumlah_timses: timses,
                    jumlah_relawan: relawan,
                    jumlah_simpatisan: simpatisan,
                });
            }

            return res.status(200).json(report);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error fetching report data');
        }
    }

    getReport2 = async (req: Request, res: Response): Promise<Response> => {
        try {
            const reports = await db.hasil_pemilihan_ilham.findAll({
                attributes: [
                    'id_cakades',
                    [db.sequelize.literal('cakades.nama_cakades'), 'nama_cakades'],
                    [db.sequelize.fn('SUM', db.sequelize.col('jumlah_suara')), 'jumlah_suara']
                ],
                include: [
                    {
                        model: db.cakades_ilham,
                        as: 'cakades',
                        attributes: []
                    }
                ],
                group: ['id_cakades', 'cakades.nama_cakades']
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

    getDetailedReports = async (req: Request, res: Response): Promise<Response> => {
        try {
            const detailedReports = await db.hasil_pemilihan_ilham.findAll({
                attributes: [
                    'id_cakades',
                    [sequelize.literal('cakades.nama_cakades'), 'nama_cakades'],
                    [sequelize.fn('SUM', sequelize.col('jumlah_suara')), 'jumlah_suara']
                ],
                include: [
                    {
                        model: db.cakades_ilham,
                        as: 'cakades',
                        attributes: []
                    }
                ],
                group: ['id_cakades', 'cakades.nama_cakades']
            });
    
            if (detailedReports.length === 0) {
                return res.status(200).send('Belum ada data hasil pemilihan.');
            }

            // Menampilkan ketika ada Kolom nya di tabel (kolom yang ada di atribut)

            // const detailedReportsWithAdditionalInfo = await Promise.all(
            //     detailedReports.map(async (report: any) => {
            //         const cakadesId = report.getDataValue('id_cakades');
            //         const additionalInfo = await db.cakades_ilham.findOne({
            //             where: { id: cakadesId },
            //             attributes: [
            //                 'nama_cakades',
            //                 'jumlah_timses',
            //                 'jumlah_relawan',
            //                 'jumlah_simpatisan'
            //             ]
            //         });
    
            //         return {
            //             nama_cakades: report.getDataValue('nama_cakades'),
            //             jumlah_suara: report.getDataValue('jumlah_suara'),
            //             jumlah_timses: additionalInfo?.getDataValue('jumlah_timses'),
            //             jumlah_relawan: additionalInfo?.getDataValue('jumlah_relawan'),
            //             jumlah_simpatisan: additionalInfo?.getDataValue('jumlah_simpatisan')
            //         };
            //     })
            // );
    
            
            // Menampilkan hanya report nya saja (tidak ada kolom nya di tabel)
            const detailedReportsWithAdditionalInfo = await Promise.all(
                detailedReports.map(async (report: { getDataValue: (arg0: string) => any; toJSON: () => any; }) => {
                    const cakadesId = report.getDataValue('id_cakades');
                    const cakades = await db.cakades_ilham.findByPk(cakadesId);
    
                    const timsesCount = await db.timses_ilham.count({ where: { id_cakades: cakadesId } });
                    const relawanCount = await db.relawan_ilham.count({ where: { id_cakades: cakadesId } });
                    const simpatisanCount = await db.simpatisan_ilham.count({ where: { id_cakades: cakadesId } });
    
                    return {
                        ...report.toJSON(),
                        jumlah_timses: timsesCount,
                        jumlah_relawan: relawanCount,
                        jumlah_simpatisan: simpatisanCount
                    };
                })
            );

            if (detailedReportsWithAdditionalInfo.length === 0) {
                return res.status(200).send('Belum ada data hasil pemilihan.');
            }
    
            return res.status(200).json(detailedReportsWithAdditionalInfo);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Gagal mengambil data laporan.');
        }
    }
    

    getHasilPemilihan = async (req: Request, res: Response): Promise<Response> => {
        try {
            const hasilPemilihanList = await db.hasil_pemilihan_ilham.findAll();

            if (hasilPemilihanList.length === 0) {
                return res.status(200).send('Belum ada data hasil pemilihan.');
            }

            return res.status(200).json(hasilPemilihanList);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data tidak ditemukan');
        }
    }

    getHasilPemilihanById = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const hasilPemilihan = await db.hasil_pemilihan_ilham.findByPk(id);
            if (!hasilPemilihan) {
                return res.status(404).send(`Data hasil pemilihan dengan nomor id ${id} tidak ditemukan`);
            }
            return res.status(200).json(hasilPemilihan);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data tidak ditemukan');
        }
    }

    updateHasilPemilihan = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { id_cakades, no_tps, jumlah_suara } = req.body;

        try {
            const hasilPemilihan = await db.hasil_pemilihan_ilham.findByPk(id);
            if (!hasilPemilihan) {
                return res.status(404).send(`Data hasil pemilihan dengan nomor id ${id} tidak ditemukan`);
            }

            await hasilPemilihan.update({ id_cakades, no_tps, jumlah_suara });
            return res.status(200).send(`Data hasil pemilihan berhasil diubah`);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data hasil pemilihan gagal diubah');
        }
    }

    deleteHasilPemilihan = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
    
        try {
            const hasilPemilihan = await db.hasil_pemilihan_ilham.findByPk(id);
            if (!hasilPemilihan) {
                return res.status(404).send(`Data hasil pemilihan dengan nomor id ${id} tidak ditemukan`);
            }
    
            await hasilPemilihan.destroy();
            return res.status(200).send(`Data hasil pemilihan berhasil dihapus`);
        } catch (error) {
            console.error(error);
            return res.status(500).send(`Data hasil pemilihan gagal dihapus`);
        }
    }
}

export default new HasilPemilihanController();
