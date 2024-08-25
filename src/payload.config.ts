import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Logo from './components/Logo'
import Sync from './views/Sync'
import RevSync from './views/RevSync'
import UploadProducts from './views/UploadProducts'
import AfterNavLinks from './components/AfterNavLinks'

import Users from './collections/Users'
import Products from './collections/Products'
import MetalRates from './collections/MetalRates'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    livePreview: {
      url: 'http://localhost:3000',
      collections: ['products','metal-rates'],
    },
    components: {
        graphics: {
          Logo: Logo,
          Icon: Logo,
        },
        afterNavLinks: [AfterNavLinks],
        views: {
          Sync: {
            Component: Sync,
            path: '/sync',
          },
          RevSync: {
            Component: RevSync,
            path: '/revsync',
          },
          UploadProducts: {
            Component: UploadProducts,
            path: '/upload-products',
          },
        },
    }
  },
  editor: slateEditor({}),
  collections: [Users, Products, MetalRates],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
