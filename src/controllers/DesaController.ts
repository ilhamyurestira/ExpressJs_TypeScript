import { Request, Response } from 'express';
const db = require('../db/models');

class DesaController {
    createDesa = async (req: Request, res: Response): Promise<Response> => {
        const { id, nama_desa } = req.body;

        try {
            const existingDesa = await db.desa_ilham.findOne({ where: { nama_desa } });
            if (existingDesa) {
                return res.status(400).send('Nama Desa sudah ada');
            }

            if (!nama_desa) {
                return res.status(400).send('Nama Desa perlu di isi');
            }

            const newDesa = await db.desa_ilham.create({
                id,
                nama_desa,
            });

            return res.status(200).send(`Desa "${nama_desa}" berhasil ditambah`);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data gagal ditambahkan');
        }
    }

    getDesa = async (req: Request, res: Response): Promise<Response> => {
        try {
            const desaList = await db.desa_ilham.findAll();

            if (desaList.length === 0) {
                return res.status(200).send('Belum ada data desa.');
            }

            return res.status(200).json(desaList);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data tidak ditemukan');
        }
    }

    getDesaById = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const desa = await db.desa_ilham.findByPk(id);
            if (!desa) {
                return res.status(404).send(`Desa dengan nomor id ${id} tidak ditemukan`);
            }
            return res.status(200).json(desa);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data tidak ditemukan');
        }
    }

    updateDesa = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { nama_desa } = req.body;

        try {
            const desa = await db.desa_ilham.findByPk(id);
            if (!desa) {
                return res.status(404).send(`Desa dengan nomor id ${id} tidak ditemukan`);
            }

            const namaDesa = desa.nama_desa;

            await desa.update({ nama_desa });
            return res.status(200).send(`Data "${namaDesa}" berhasil diubah`);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Data Desa gagal diubah');
        }
    }

    deleteDesa = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
    
        try {
            const desa = await db.desa_ilham.findByPk(id);
            if (!desa) {
                return res.status(404).send(`Desa dengan nomor id ${id} tidak ditemukan`);
            }
    
            const namaDesa = desa.nama_desa;
    
            await desa.destroy();
            return res.status(200).send(`Desa "${namaDesa}" berhasil dihapus`);
        } catch (error) {
            console.error(error);
            return res.status(500).send(`Desa gagal dihapus`);
        }
    }
}

export default new DesaController();
