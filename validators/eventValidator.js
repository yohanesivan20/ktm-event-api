const { body } = require('express-validator')

exports.getListValidationRules = [
    body('event_month')
    .isLength({min:2, max:2}).withMessage('Bulan harus terdiri dari 2 digit')
    .isString().withMessage('Bulan harus berupa string')
    .exists().withMessage('Bulan wajib diisi')
    .matches(/^(0[1-9]|1[0-2])$/).withMessage('Bulan harus antara 01 sampai 12'),
]

exports.createValidationRules = [
    body('category_id').isInt().withMessage('Category ID harus berupa angka'),
    body('name').notEmpty().withMessage('Nama event wajib diisi'),
    body('description').notEmpty().withMessage('Deskripsi wajib diisi'),
    body('event_date').isISO8601().toDate().withMessage('Tanggal event tidak valid'),
    body('registration_start_date').isISO8601().toDate().withMessage('Tanggal mulai pendaftaran tidak valid'),
    body('registration_end_date').isISO8601().toDate().withMessage('Tanggal akhir pendaftaran tidak valid'),
    body('location').notEmpty().withMessage('Lokasi wajib diisi'),
    body('banner_url').optional({ nullable: true }).isURL().withMessage('URL banner tidak valid'),
    body('form_url').optional({ nullable: true }).isURL().withMessage('Form URL tidak valid'),
    body('created_by').isInt().withMessage('Created by harus berupa ID angka'),
    body('updated_by').isInt().withMessage('Updated by harus berupa ID angka'),

    // Custom logic: pastikan tanggal mulai < tanggal akhir pendaftaran < tanggal event
    body('registration_end_date').custom((value, { req }) => {
        const start = new Date(req.body.registration_start_date);
        const end = new Date(value);
        if (start >= end) {
        throw new Error('Tanggal akhir pendaftaran harus setelah tanggal mulai pendaftaran');
        }
        return true;
    }),

    body('event_date').custom((value, { req }) => {
        const end = new Date(req.body.registration_end_date);
        const eventDate = new Date(value);
        if (end >= eventDate) {
        throw new Error('Tanggal event harus setelah tanggal akhir pendaftaran');
        }
        return true;
    })
]