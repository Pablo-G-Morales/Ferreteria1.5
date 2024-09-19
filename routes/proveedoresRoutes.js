const express = require('express');
const router = express.Router();
const proveedorModel = require('../models/proveedorModel');

// Ruta para obtener todos los proveedores con paginación
router.get('/proveedores', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    proveedorModel.getPaginatedProveedores(limit, offset, (error, results) => {
        if (error) {
            console.error('Error al obtener proveedores:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener proveedores' });
        }
        proveedorModel.countProveedores((err, total) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al contar proveedores' });
            }
            const totalPages = Math.ceil(total / limit);
            res.json({ data: results, totalPages, currentPage: page });
        });
    });
});

// Ruta para obtener la lista de proveedores (para el combo box en marcas)
router.get('/proveedores-list', (req, res) => {
    proveedorModel.getAllProveedores((error, results) => {
        if (error) {
            console.error('Error al obtener proveedores:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener proveedores' });
        }
        res.json(results); // Enviar los proveedores para ser usados en el combo box
    });
});

module.exports = router;
