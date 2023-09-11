import { Request, Response } from 'express';
const db = require('../db/models');

class CakadesController {
    createCakades = async (req: Request, res: Response): Promise<Response> => {
        const { nik_cakades, nama_cakades, alamat_cakades, id_desa } = req.body;

        try {
            const existingSimpatisan = await db.cakades_ilham.findOne({ where: { nik_cakades } });
            if (existingSimpatisan) {
                return res.status(400).send('Anda telah terdaftar sebagai Cakades');
            }
    
            const existingCakades = await db.simpatisan_ilham.findOne({ where: { nik_simpatisan: nik_cakades } });
            if (existingCakades) {
                return res.status(400).send('Anda telah terdaftar sebagai Simpatisan');
            }

            const existingTimses = await db.timses_ilham.findOne({ where: { nik_timses: nik_cakades } });
            if (existingTimses) {
                return res.status(400).send('Anda telah terdaftar sebagai Timses');
            }

            const existingRelawan = await db.relawan_ilham.findOne({ where: { nik_relawan: nik_cakades } });
            if (existingRelawan) {
                return res.status(400).send('Anda telah terdaftar sebagai Relawan');
            }

            if (!nik_cakades) {
                return res.status(400).send('NIK perlu di isi');
            }

            const existingDesaId = await db.desa_ilham.findByPk(id_desa);
            if (!existingDesaId) {
                return res.status(400).send('ID desa tidak ditemukan');
            }

            const newCakades = await db.cakades_ilham.create({
                nik_cakades,
                nama_cakades,
                alamat_cakades,
                id_desa,
            });

            return res.status(200).send(`Cakades "${nama_cakades}" berhasil ditambah`);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data gagal ditambahkan');
        }
    }

    getCakades = async (req: Request, res: Response): Promise<Response> => {
        try {
            const cakadesList = await db.cakades_ilham.findAll();

            if (cakadesList.length === 0) {
                return res.status(200).send('Belum ada data cakades.');
            }

            return res.status(200).json(cakadesList);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data tidak ditemukan');
        }
    }

    getCakadesById = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const cakades = await db.cakades_ilham.findByPk(id);
            if (!cakades) {
                return res.status(404).send(`Cakades dengan nomor id ${id} tidak ditemukan`);
            }
            return res.status(200).json(cakades);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data tidak ditemukan');
        }
    }

    updateCakades = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { nik_cakades, nama_cakades, alamat_cakades, id_desa } = req.body;

        try {
            const cakades = await db.cakades_ilham.findByPk(id);
            if (!cakades) {
                return res.status(404).send(`Cakades dengan nomor id ${id} tidak ditemukan`);
            }

            const existingDesaId = await db.desa_ilham.findByPk(id_desa);
            if (!existingDesaId) {
                return res.status(400).send('ID desa tidak ditemukan');
            }

            const namaCakades = cakades.nama_cakades;

            await cakades.update({ nik_cakades, nama_cakades, alamat_cakades, id_desa });
            return res.status(200).send(`Data "${namaCakades}" berhasil diubah`);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data gagal diubah');
        }
    }

    deleteCakades = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const cakades = await db.cakades_ilham.findByPk(id);
            if (!cakades) {
                return res.status(404).send(`Cakades dengan nomor id ${id} tidak ditemukan`);
            }

            const namaCakades = cakades.nama_cakades;

            await cakades.destroy();
            return res.status(204).send(`Cakades "${namaCakades}" berhasil dihapus`);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Cakades gagal dihapus');
        }
    }
}

export default new CakadesController();