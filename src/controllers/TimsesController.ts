import { Request, Response } from 'express';
const db = require('../db/models');

class TimsesController {
    createTimses = async (req: Request, res: Response): Promise<Response> => {
        const { nik_timses, nama_timses, alamat_timses, id_cakades } = req.body;
    
        try {
            const existingSimpatisan = await db.timses_ilham.findOne({ where: { nik_timses } });
            if (existingSimpatisan) {
                return res.status(400).send('Anda telah terdaftar sebagai Timses');
            }
    
            const existingCakades = await db.simpatisan_ilham.findOne({ where: { nik_simpatisan: nik_timses } });
            if (existingCakades) {
                return res.status(400).send('Anda telah terdaftar sebagai Simpatisan');
            }

            const existingTimses = await db.cakades_ilham.findOne({ where: { nik_cakades: nik_timses } });
            if (existingTimses) {
                return res.status(400).send('Anda telah terdaftar sebagai Cakades');
            }

            const existingRelawan = await db.relawan_ilham.findOne({ where: { nik_relawan: nik_timses } });
            if (existingRelawan) {
                return res.status(400).send('Anda telah terdaftar sebagai Relawan');
            }
    
            if (!nik_timses) {
                return res.status(400).send('NIK perlu di isi');
            }
    
            const existingCakadesId = await db.cakades_ilham.findByPk(id_cakades);
            if (!existingCakadesId) {
                return res.status(400).send('ID Cakades tidak ditemukan');
            }
    
            const newTimses = await db.timses_ilham.create({
                nik_timses,
                nama_timses,
                alamat_timses,
                id_cakades,
            });
    
            return res.status(200).send(`Timses "${nama_timses}" berhasil ditambah`);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data gagal ditambahkan');
        }
    }

    getTimses = async (req: Request, res: Response): Promise<Response> => {
        try {
            const TimsesList = await db.timses_ilham.findAll();

            if (TimsesList.length === 0) {
                return res.status(200).send('Belum ada data Timses.');
            }

            return res.status(200).json(TimsesList);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data tidak ditemukan');
        }
    }

    getTimsesById = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const Timses = await db.timses_ilham.findByPk(id);
            if (!Timses) {
                return res.status(404).send(`Timses dengan nomor id ${id} tidak ditemukan`);
            }
            return res.status(200).json(Timses);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data tidak ditemukan');
        }
    }

    updateTimses = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { nik_timses, nama_timses, alamat_timses, id_cakades } = req.body;
    
        try {
            const Timses = await db.timses_ilham.findByPk(id);
            if (!Timses) {
                return res.status(404).send(`Timses dengan nomor id ${id} tidak ditemukan`);
            }
    
            const existingCakadesId = await db.cakades_ilham.findByPk(id_cakades);
            if (!existingCakadesId) {
                return res.status(400).send('ID Cakades tidak ditemukan');
            }
    
            const namaTimses = Timses.nama_timses;
    
            await Timses.update({ nik_timses, nama_timses, alamat_timses, id_cakades });
            return res.status(200).send(`Data "${namaTimses}" berhasil diubah`);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data gagal diubah');
        }
    }
    

    deleteTimses = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const Timses = await db.timses_ilham.findByPk(id);
            if (!Timses) {
                return res.status(404).send(`Timses dengan nomor id ${id} tidak ditemukan`);
            }

            const namaTimses = Timses.nama_timses;

            await Timses.destroy();
            return res.status(204).send(`Timses "${namaTimses}" berhasil dihapus`);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Timses gagal dihapus');
        }
    }
}

export default new TimsesController();