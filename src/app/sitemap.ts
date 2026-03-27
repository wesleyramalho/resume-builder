import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mypdfcv.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://mypdfcv.com/dashboard",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://mypdfcv.com/privacy",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://mypdfcv.com/terms",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://mypdfcv.com/contact",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
