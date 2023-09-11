import { Request, Response } from 'express';
const db = require('../db/models');

class RelawanController {
    createRelawan = async (req: Request, res: Response): Promise<Response> => {
        const { nik_relawan, nama_relawan, kelurahan, id_timses, no_tps } = req.body;
    
        try {
            const existingSimpatisan = await db.relawan_ilham.findOne({ where: { nik_relawan } });
            if (existingSimpatisan) {
                return res.status(400).send('Anda telah terdaftar sebagai Relawan');
            }
    
            const existingCakades = await db.simpatisan_ilham.findOne({ where: { nik_simpatisan: nik_relawan } });
            if (existingCakades) {
                return res.status(400).send('Anda telah terdaftar sebagai Simpatisan');
            }

            const existingTimses = await db.timses_ilham.findOne({ where: { nik_timses: nik_relawan } });
            if (existingTimses) {
                return res.status(400).send('Anda telah terdaftar sebagai Timses');
            }

            const existingRelawan = await db.cakades_ilham.findOne({ where: { nik_cakades: nik_relawan } });
            if (existingRelawan) {
                return res.status(400).send('Anda telah terdaftar sebagai Cakades');
            }
    
            if (!nik_relawan) {
                return res.status(400).send('NIK perlu di isi');
            }

            const existingTimsesId = await db.timses_ilham.findByPk(id_timses);
            if (!existingTimsesId) {
                return res.status(400).send('ID Timses tidak ditemukan');
            }

            const associatedCakadesId = existingTimsesId.id_cakades;
    
            const newRelawan = await db.relawan_ilham.create({
                nik_relawan,
                nama_relawan,
                kelurahan,
                id_cakades: associatedCakadesId,
                id_timses,
                no_tps
            });
    
            return res.status(200).send(`Relawan "${nama_relawan}" berhasil ditambah`);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data gagal ditambahkan');
        }
    }

    getRelawan = async (req: Request, res: Response): Promise<Response> => {
        try {
            const RelawanList = await db.relawan_ilham.findAll();

            if (RelawanList.length === 0) {
                return res.status(200).send('Belum ada data Relawan.');
            }

            return res.status(200).json(RelawanList);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data tidak ditemukan');
        }
    }

    getRelawanById = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const Relawan = await db.relawan_ilham.findByPk(id);
            if (!Relawan) {
                return res.status(404).send(`Relawan dengan nomor id ${id} tidak ditemukan`);
            }
            return res.status(200).json(Relawan);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data tidak ditemukan');
        }
    }

    updateRelawan = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { nik_relawan, nama_relawan, kelurahan, id_timses, no_tps } = req.body;
    
        try {
            const Relawan = await db.relawan_ilham.findByPk(id);
            if (!Relawan) {
                return res.status(404).send(`Relawan dengan nomor id ${id} tidak ditemukan`);
            }

            const existingTimsesId = await db.timses_ilham.findByPk(id_timses);
            if (!existingTimsesId) {
                return res.status(400).send('ID Timses tidak ditemukan');
            }

            const associatedCakadesId = existingTimsesId.id_cakades;
    
            const namaRelawan = Relawan.nama_relawan;
    
            await Relawan.update({ nik_relawan, nama_relawan, kelurahan, id_cakades: associatedCakadesId, id_timses, no_tps });
            return res.status(200).send(`Data "${namaRelawan}" berhasil diubah`);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data gagal diubah');
        }
    }
    

    deleteRelawan = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const Relawan = await db.relawan_ilham.findByPk(id);
            if (!Relawan) {
                return res.status(404).send(`Relawan dengan nomor id ${id} tidak ditemukan`);
            }

            const namaRelawan = Relawan.nama_relawan;

            await Relawan.destroy();
            return res.status(204).send(`Relawan "${namaRelawan}" berhasil dihapus`);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Relawan gagal dihapus');
        }
    }
}

export default new RelawanController();