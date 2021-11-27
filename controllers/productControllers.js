const { products } = require('../models');
const Joi = require('joi').extend(require('@joi/date'));
const { Op } = require('sequelize');

module.exports = {
    createProduct: async (req, res) => {
        const body = req.body;

        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                qty: Joi.number().required(),
                picture: Joi.string().required(),
                expiredAt: Joi.date().format('YYYY-MM-DD').required(),
            })

            const check = schema.validate({
                name: body.name,
                qty: body.qty,
                picture: req.file ? req.file.path : 'picture',
                expiredAt: body.expiredAt,
            }, { abortEarly: false })

            if (check.error) {
                return res.status(400).json({
                    status: "failed",
                    message: "Bad Request",
                    errors: check.error["details"].map(({ message }) => message)
                })
            }

            const checkProductName = await products.findOne({
                where: {
                    name: body.name
                }
            })

            if (checkProductName) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'please input another name of product'
                })
            }

            const createProduct = await products.create({
                name: body.name,
                qty: body.qty,
                [req.file ? 'picture' : null]: req.file ? req.file.path : null,
                expiredAt: body.expiredAt,
            })

            const productPayload = {
                name: createProduct.dataValues.name,
                qty: createProduct.dataValues.qty,
                picture: createProduct.dataValues.picture,
                expiredAt: createProduct.dataValues.expiredAt,
                isActive: createProduct.dataValues.isActive,
            }

            return res.status(200).json({
                status: 'success',
                message: 'successfully create product',
                dataProduct: productPayload,
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error",
            });
        }
    },

    getAllProduct: async (req, res) => {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = limit * (page - 1);
        const order = req.query.order;
        const names = req.query.name ? req.query.name : '';

        try {
            const schema = Joi.object({
                names: Joi.string(),
                order: Joi.string(),
            })

            const check = schema.validate({
                names: req.query.name,
                order: req.query.order,
            }, { abortEarly: false })

            if (check.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Bad Request',
                    errors: check.error['details'].map(
                        ({ message }) => message
                    ),
                });
            }

            const count = await products.count({ distinct: true });
            let next = page + 1;
            if (page * limit >= count) {
                next = 0
            }

            if (!order) {
                const getProductByPage = await products.findAll({
                    where: {
                        name: {
                            [Op.iLike]: '%' + names + '%'
                        },
                        isActive: true,
                    },
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    limit: limit,
                    offset: offset,
                })

                return res.status(200).json({
                    status: 'success',
                    message: 'successfully retrieved data',
                    dataProduct: getProductByPage,
                    meta: {
                        page: page,
                        next: next,
                        total: count,
                    }
                })
            }

            if (order == 'A - Z') {
                const getSortByAlphabet = await products.findAll({
                    where: {
                        isActive: true
                    },
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    limit: limit,
                    offset: offset,
                    order: [['name', 'ASC']]
                })

                return res.status(200).json({
                    status: 'success',
                    message: 'successfully retrieved data',
                    dataProduct: getSortByAlphabet,
                    meta: {
                        page: page,
                        next: next,
                        total: count,
                    }
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error",
            });
        }
    },

    getProductById: async (req, res) => {
        try {
            const findProduct = await products.findOne({
                where: {
                    id: req.params.id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            if (!findProduct) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'data not found',
                })
            }

            if (findProduct.dataValues.isActive !== true) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'cannot get data, this product is not longer active',
                })
            }

            return res.status(200).json({
                status: 'success',
                message: 'successfully retrieved data',
                dataProduct: findProduct,
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error",
            });
        }
    },

    removeProductById: async (req, res) => {
        try {
            const findProduct = await products.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (!findProduct) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'data not found',
                })
            }

            await products.update(
                { isActive: false },
                {
                    where: {
                        id: req.params.id
                    }
                }
            );

            const updateProduct = await products.findOne({
                where: {
                    id: req.params.id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            return res.status(200).json({
                status: 'success',
                message: 'product was remove',
                dataProduct: updateProduct
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error",
            });
        }
    },

    updateProductById: async (req, res) => {
        const body = req.body;

        try {
            const schema = Joi.object({
                name: Joi.string(),
                qty: Joi.number(),
                picture: Joi.string(),
                expiredAt: Joi.date().format('YYYY-MM-DD'),
            })

            const check = schema.validate({
                name: body.name,
                qty: body.qty,
                picture: req.file ? req.file.path : 'picture',
                expiredAt: body.expiredAt,
            }, {abortEarly: false});

            if (check.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Bad Request',
                    errors: check.error['details'].map(
                        ({ message }) => message
                    ),
                });
            };

            const findProduct = await products.findOne({
                where: {
                    id: req.params.id
                }
            });

            if (!findProduct || findProduct.dataValues.isActive == false) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'product has been removed'
                })
            }

            await products.update({
                name: body.name,
                qty: body.qty,
                [req.file ? 'picture' : null]: req.file ? req.file.path : null,
                expiredAt: body.expiredAt,
            },
            {
                where: {
                    id: req.params.id
                }
            })

            const findAfterUpdate = await products.findOne({
                where: {
                    id: req.params.id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            })

            return res.status(200).json({
                status: 'success',
                message: 'successfully update product',
                dataProduct: findAfterUpdate,
            })
        } catch (error) {
            console.log("🚀 ~ file: productControllers.js ~ line 309 ~ updateProductById: ~ error", error)
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error",
            });
        }
    }
}
