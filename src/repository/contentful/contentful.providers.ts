import { createClient } from 'contentful'

export const contentfulProviders = [
  {
    provide: 'CONTENTFUL_CONNECTION',
    useFactory: async () =>
      await createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
        environment: process.env.CONTENTFUL_ENVIRONMENT
      }),
  },
];
