/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://idea4startup.vercel.app',
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    changefreq: 'weekly',
    priority: 0.7,
    exclude: [],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        additionalSitemaps: [
            'https://idea4startup.vercel.app/sitemap-0.xml',
        ],
    },
};
