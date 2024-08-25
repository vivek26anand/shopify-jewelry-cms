import { CollectionConfig } from 'payload/types'

const MetalRates: CollectionConfig = {
  slug: 'metal-rates',
  labels: {
    singular: 'Metal Rate',
    plural: 'Metal Rates',
  },
  admin: {
    useAsTitle: 'id',
    group: 'Database',
  },
  fields: [
    {
      name: 'id',
      label: 'ID',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'rate',
      label: 'Rate',
      type: 'number',
      required: true,
    },
  ],
}

export default MetalRates
