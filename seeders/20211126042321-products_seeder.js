'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('products', [
      {
        name: 'Samsung Galaxy A72',
        qty: 50,
        picture: 'https://res.cloudinary.com/dejongos/image/upload/v1637982611/picture/samsung_galaxy_a72_white_1_bypadw.jpg',
        expiredAt: '2025-01-01',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Iphone 11',
        qty: 50,
        picture: 'https://res.cloudinary.com/dejongos/image/upload/v1637982608/picture/apple_apple_iphone_11_64_gb_-garansi_resmi-_full13_nqhtu96m_zcolzx.jpg',
        expiredAt: '2025-01-01',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mi Stick TV',
        qty: 50,
        picture: 'https://res.cloudinary.com/dejongos/image/upload/v1637982608/picture/mi_stick_o5yeyj.jpg',
        expiredAt: '2025-01-01',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Samsung Galaxy S21',
        qty: 50,
        picture: 'https://res.cloudinary.com/dejongos/image/upload/v1637982607/picture/samsung-galaxy-s21-5g-2_wmmsjj.jpg',
        expiredAt: '2025-01-01',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Xiaomi 11',
        qty: 50,
        picture: 'https://res.cloudinary.com/dejongos/image/upload/v1637982607/picture/xiaomi_11_w5hto7.jpg',
        expiredAt: '2025-01-01',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Samsung A72',
        qty: 50,
        picture: 'https://res.cloudinary.com/dejongos/image/upload/v1637982606/picture/Featured_Kelebihan-Kekurangan-serta-Spesifikasi-Redmi-Note-9_ja9nui.jpg',
        expiredAt: '2025-01-01',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Samsung S20',
        qty: 50,
        picture: 'https://res.cloudinary.com/dejongos/image/upload/v1637982604/picture/samsung-galaxy-s20-galaxy-s20-plus-dan-galaxy-s20-ultra_evzqjr.jpg',
        expiredAt: '2025-01-01',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Nokia 11',
        qty: 50,
        picture: 'https://res.cloudinary.com/dejongos/image/upload/v1637982602/picture/nokia11_i9dupl.jpg',
        expiredAt: '2025-01-01',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Vacum Cleaner Krisbow',
        qty: 50,
        picture: 'https://res.cloudinary.com/dejongos/image/upload/v1637982601/picture/vacum_krisbow_s9cwct.jpg',
        expiredAt: '2025-01-01',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Xiaomi Vacume Mijia',
        qty: 50,
        picture: 'https://res.cloudinary.com/dejongos/image/upload/v1637982601/picture/xiaomi-mijia-penyedot-debu-handheld-wireless-vacuum-cleaner-scwxcq01rr-white-1_mkiukq.jpg',
        expiredAt: '2025-01-01',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('products', null, {})
  }
};
