import { Request, Response } from 'express';
const db = require('../db/models');

class SimpatisanController {
    createSimpatisan = async (req: Request, res: Response): Promise<Response> => {
        const { nik_simpatisan, nama_simpatisan, alamat_simpatisan, id_relawan } = req.body;
    
        try {
            const existingSimpatisan = await db.simpatisan_ilham.findOne({ where: { nik_simpatisan } });
            if (existingSimpatisan) {
                return res.status(400).send('Anda telah terdaftar sebagai Simpatisan');
            }
    
            const existingCakades = await db.cakades_ilham.findOne({ where: { nik_cakades: nik_simpatisan } });
            if (existingCakades) {
                return res.status(400).send('Anda telah terdaftar sebagai Cakades');
            }

            const existingTimses = await db.timses_ilham.findOne({ where: { nik_timses: nik_simpatisan } });
            if (existingTimses) {
                return res.status(400).send('Anda telah terdaftar sebagai Timses');
            }

            const existingRelawan = await db.relawan_ilham.findOne({ where: { nik_relawan: nik_simpatisan } });
            if (existingRelawan) {
                return res.status(400).send('Anda telah terdaftar sebagai Relawan');
            }
    
            if (!nik_simpatisan) {
                return res.status(400).send('NIK perlu di isi');
            }

            const existingRelawanId = await db.relawan_ilham.findByPk(id_relawan);
            if (!existingRelawanId) {
                return res.status(400).send('ID Relawan tidak ditemukan');
            }

            const associatedCakadesId = existingRelawanId.id_cakades;
    
            const newSimpatisan = await db.simpatisan_ilham.create({
                nik_simpatisan,
                nama_simpatisan,
                alamat_simpatisan,
                id_cakades: associatedCakadesId,
                id_relawan
            });
    
            return res.status(200).send(`Simpatisan "${nama_simpatisan}" berhasil ditambah`);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data gagal ditambahkan');
        }
    }

    getSimpatisan = async (req: Request, res: Response): Promise<Response> => {
        try {
            const SimpatisanList = await db.simpatisan_ilham.findAll();

            if (SimpatisanList.length === 0) {
                return res.status(200).send('Belum ada data Simpatisan.');
            }

            return res.status(200).json(SimpatisanList);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data tidak ditemukan');
        }
    }

    getSimpatisanById = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const Simpatisan = await db.simpatisan_ilham.findByPk(id);
            if (!Simpatisan) {
                return res.status(404).send(`Simpatisan dengan nomor id ${id} tidak ditemukan`);
            }
            return res.status(200).json(Simpatisan);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data tidak ditemukan');
        }
    }

    updateSimpatisan = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { nik_simpatisan, nama_simpatisan, alamat_simpatisan, id_relawan } = req.body;
    
        try {
            const Simpatisan = await db.simpatisan_ilham.findByPk(id);
            if (!Simpatisan) {
                return res.status(404).send(`Simpatisan dengan nomor id ${id} tidak ditemukan`);
            }

            const existingRelawanId = await db.relawan_ilham.findByPk(id_relawan);
            if (!existingRelawanId) {
                return res.status(400).send('ID Relawan tidak ditemukan');
            }

            const associatedCakadesId = existingRelawanId.id_cakades;
    
            const namaSimpatisan = Simpatisan.nama_simpatisan;
    
            await Simpatisan.update({ nik_simpatisan, nama_simpatisan, alamat_simpatisan, id_cakades: associatedCakadesId, id_relawan });
            return res.status(200).send(`Data "${namaSimpatisan}" berhasil diubah`);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data gagal diubah');
        }
    }
    

    deleteSimpatisan = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const Simpatisan = await db.simpatisan_ilham.findByPk(id);
            if (!Simpatisan) {
                return res.status(404).send(`Simpatisan dengan nomor id ${id} tidak ditemukan`);
            }

            const namaSimpatisan = Simpatisan.nama_simpatisan;

            await Simpatisan.destroy();
            return res.status(204).send(`Simpatisan "${namaSimpatisan}" berhasil dihapus`);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Simpatisan gagal dihapus');
        }
    }
}

export default new SimpatisanController();