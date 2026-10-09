import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'JSD Group — Building Intelligent Solutions for a Digital Future',
    short_name: 'JSD Group',
    description: 'Practical AI Solutions, Machine Learning, Data Analytics, and Enterprise Software Development in Nepal.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
