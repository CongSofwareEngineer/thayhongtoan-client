/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://thayhongtoan.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'daily',
  transform: async (config, path) => {
    let priority = 0.7 // Mặc định tất cả trang sẽ có priority = 0.7

    // Đặt priority = 1 cho các trang cụ thể
    if (['/', '/shop', '/register', '/contact', '/nests', '/shoes'].includes(path)) {
      priority = 1.0
    }

    return {
      loc: path, // URL của trang
      changefreq: 'daily', // Tần suất cập nhật (có thể tùy chỉnh)
      priority, // Giá trị priority
      lastmod: new Date().toISOString(), // Ngày sửa đổi cuối cùng
    }
  },
}
