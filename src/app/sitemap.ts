import { MetadataRoute } from 'next';
import { events } from '@/data/events';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://sangrila.vercel.app';

    // Static routes
    const staticRoutes = [
        '',
        '/events',
        '/register',
        '/rules',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic event routes
    const eventRoutes = events.map((event) => ({
        url: `${baseUrl}/events/${event.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...eventRoutes];
}
