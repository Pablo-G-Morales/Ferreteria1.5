const express = require('express');
const router = express.Router();
const marcaModel = require('../models/marcaModel');

// Ruta para obtener todas las marcas con paginación
router.get('/marcas', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    marcaModel.getPaginatedMarcas(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener marcas:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener marcas' });
        }
        marcaModel.countMarcas((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar marcas' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para obtener la lista de marcas (para el combo box)
router.get('/marcas-list', (req, res) => {
    marcaModel.getAllMarcas((error, results) => {
        if (error) {
            console.error('Error al obtener marcas:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener marcas' });
        }
        res.json(results); // Enviar las marcas para ser usadas en el combo box
    });
});

module.exports = router;
