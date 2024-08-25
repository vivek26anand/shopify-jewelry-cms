import { CollectionConfig } from 'payload/types'
import {ExportProductButtonComponent} from '../views/UploadProducts'
const Product: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'barcode',
    group: 'Database',
    components:{
      BeforeListTable: [ExportProductButtonComponent]
    }
  },
  fields: [

    {
      type: 'tabs',
      tabs: [{
        label: 'Product Details',
        fields: [{
          name: 'barcode',
          label: 'Barcode',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'category',
          label: 'Category',
          type: 'text',

        }, {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',

        }, {
          name: 'huid',
          label: 'HUID',
          type: 'text',

        },
        {
          name: 'purity',
          label: 'Purity',
          type: 'relationship',
          relationTo: 'metal-rates',
          hasMany: false,
        },
        {
          name: 'tags',
          label: 'Tags',
          type: 'text',
        },
        {
          name: 'pcs',
          label: 'Pieces',
          type: 'number',
        }, {
          name: 'gw',
          label: 'Gross Weight',
          type: 'number',
        }, {
          name: 'nw',
          label: 'Net Weight',
          type: 'number',
          required: true,
        },{
          name: 'other_charges',
          label: 'Other Charges',
          type: 'number',
        }, {
          name: 'cert_no',
          label: 'Cert No',
          type: 'text',
        }, {
          name: 'hm_chg',
          label: 'HM Charge',
          type: 'number',
        }, {
          name: 'making_chg',
          label: 'Making Charge',
          type: 'number',
        }, {
          name: 'mrp',
          label: 'MRP',
          type: 'number',
        }, {
          name: 'hsn',
          label: 'HSN Code',
          type: 'number'
        }]
      }, {
        label: 'Image',
        fields: [{
          name: 'image_1',
          label: 'Image 1',
          type: 'text',

        },
        {
          name: 'image_2',
          label: 'Image 2',
          type: 'text',

        },
        ]
      }, {
        label: 'Video',
        fields: [{
          name: 'Video',
          label: 'Video',
          type: 'text',

        },
        ]
      },{
        label:'Diamond',
        fields:[{
          name: 'diamond_1',
          label: 'Diamond 1',
          type: 'group',
          fields: [{
            name: 'type',
            label: 'Type',
            type: 'text',
          }, {
            name: 'shape',
            label: 'Shape',
            type: 'text',
          }, {
            name: 'colour',
            label: 'Colour',
            type: 'text',
          }, {
            name: 'clarity',
            label: 'Clarity',
            type: 'text',
          }, {
            name: 'pcs',
            label: 'Pieces',
            type: 'number',
          }, {
            name: 'carat',
            label: 'Carat',
            type: 'number',
          }, {
            name: 'rate',
            label: 'Rate',
            type: 'number',
          }
          ]
        }, {
          name: 'diamond_2',
          label: 'Diamond 2',
          type: 'group',
          fields: [{
            name: 'type',
            label: 'Type',
            type: 'text',
          }, {
            name: 'shape',
            label: 'Shape',
            type: 'text',
          }, {
            name: 'colour',
            label: 'Colour',
            type: 'text',
          }, {
            name: 'clarity',
            label: 'Clarity',
            type: 'text',
          }, {
            name: 'pcs',
            label: 'Pieces',
            type: 'number',
          }, {
            name: 'carat',
            label: 'Carat',
            type: 'number',
          }, {
            name: 'rate',
            label: 'Rate',
            type: 'number',
          }
          ]
        }, {
          name: 'diamond_3',
          label: 'Diamond 3',
          type: 'group',
          fields: [{
            name: 'type',
            label: 'Type',
            type: 'text',
          }, {
            name: 'shape',
            label: 'Shape',
            type: 'text',
          }, {
            name: 'colour',
            label: 'Colour',
            type: 'text',
          }, {
            name: 'clarity',
            label: 'Clarity',
            type: 'text',
          }, {
            name: 'pcs',
            label: 'Pieces',
            type: 'number',
          }, {
            name: 'carat',
            label: 'Carat',
            type: 'number',
          }, {
            name: 'rate',
            label: 'Rate',
            type: 'number',
          }
          ]
        }, {
          name: 'diamond_4',
          label: 'Diamond 4',
          type: 'group',
          fields: [{
            name: 'type',
            label: 'Type',
            type: 'text',
          }, {
            name: 'shape',
            label: 'Shape',
            type: 'text',
          }, {
            name: 'colour',
            label: 'Colour',
            type: 'text',
          }, {
            name: 'clarity',
            label: 'Clarity',
            type: 'text',
          }, {
            name: 'pcs',
            label: 'Pieces',
            type: 'number',
          }, {
            name: 'carat',
            label: 'Carat',
            type: 'number',
          }, {
            name: 'rate',
            label: 'Rate',
            type: 'number',
          }
          ]
        }, {
          name: 'diamond_5',
          label: 'Diamond 5',
          type: 'group',
          fields: [{
            name: 'type',
            label: 'Type',
            type: 'text',
          }, {
            name: 'shape',
            label: 'Shape',
            type: 'text',
          }, {
            name: 'colour',
            label: 'Colour',
            type: 'text',
          }, {
            name: 'clarity',
            label: 'Clarity',
            type: 'text',
          }, {
            name: 'pcs',
            label: 'Pieces',
            type: 'number',
          }, {
            name: 'carat',
            label: 'Carat',
            type: 'number',
          }, {
            name: 'rate',
            label: 'Rate',
            type: 'number',
          }
          ]
        }, {
          name: 'diamond_6',
          label: 'Diamond 6',
          type: 'group',
          fields: [{
            name: 'type',
            label: 'Type',
            type: 'text',
          }, {
            name: 'shape',
            label: 'Shape',
            type: 'text',
          }, {
            name: 'colour',
            label: 'Colour',
            type: 'text',
          }, {
            name: 'clarity',
            label: 'Clarity',
            type: 'text',
          }, {
            name: 'pcs',
            label: 'Pieces',
            type: 'number',
          }, {
            name: 'carat',
            label: 'Carat',
            type: 'number',
          }, {
            name: 'rate',
            label: 'Rate',
            type: 'number',
          }
          ]
        }]
      },{
        label:'Stone or Other',
        fields:[{
          name: "stone_other_1",
          label: "Stone Or Other 1",
          type: "group",
          fields: [{
            name: "type",
            label: "Type",
            type: "select",
            options: [
              { label: "Stone", value: "STONE" },
              { label: "Other", value: "OTHER" }
            ]
          }, {
            name: 'pcs',
            type: 'number',
            label: 'Pieces'
          }, {
            name: 'ucm_wt',
            type: 'select',
            options: [
              { label: "CT", value: "CT" },
              { label: "GM", value: "GM" },
            ],
          }, {
            name: 'stone_wt',
            type: 'number',
            label: 'Stone Weight'
          }, {
            name: 'uom',
            type: 'select',
            options: [
              { label: "GM", value: "GM" },
              { label: "PC", value: "PC" }
            ],
          }, {
            name: 'rate',
            type: 'number',
            label: 'Rate'
          }]
        }, {
          name: "stone_other_2",
          label: "Stone Or Other 2",
          type: "group",
          fields: [{
            name: "type",
            label: "Type",
            type: "select",
            options: [
              { label: "Stone", value: "STONE" },
              { label: "Other", value: "OTHER" }
            ]
          }, {
            name: 'pcs',
            type: 'number',
            label: 'Pieces'
          }, {
            name: 'ucm_wt',
            type: 'select',
            options: [
              { label: "CT", value: "CT" },
              { label: "GM", value: "GM" },
            ],
          }, {
            name: 'stone_wt',
            type: 'number',
            label: 'Stone Weight'
          }, {
            name: 'uom',
            type: 'select',
            options: [
              { label: "GM", value: "GM" },
              { label: "PC", value: "PC" }
            ],
          }, {
            name: 'rate',
            type: 'number',
            label: 'Rate'
          }]
        }, {
          name: "stone_other_3",
          label: "Stone Or Other 3",
          type: "group",
          fields: [{
            name: "type",
            label: "Type",
            type: "select",
            options: [
              { label: "Stone", value: "STONE" },
              { label: "Other", value: "OTHER" }
            ]
          }, {
            name: 'pcs',
            type: 'number',
            label: 'Pieces'
          }, {
            name: 'ucm_wt',
            type: 'select',
            options: [
              { label: "CT", value: "CT" },
              { label: "GM", value: "GM" },
            ],
          }, {
            name: 'stone_wt',
            type: 'number',
            label: 'Stone Weight'
          }, {
            name: 'uom',
            type: 'select',
            options: [
              { label: "GM", value: "GM" },
              { label: "PC", value: "PC" }
            ],
          }, {
            name: 'rate',
            type: 'number',
            label: 'Rate'
          }]
        }, {
          name: "stone_other_4",
          label: "Stone Or Other 4",
          type: "group",
          fields: [{
            name: "type",
            label: "Type",
            type: "select",
            options: [
              { label: "Stone", value: "STONE" },
              { label: "Other", value: "OTHER" }
            ]
          }, {
            name: 'pcs',
            type: 'number',
            label: 'Pieces'
          }, {
            name: 'ucm_wt',
            type: 'select',
            options: [
              { label: "CT", value: "CT" },
              { label: "GM", value: "GM" },
            ],
          }, {
            name: 'stone_wt',
            type: 'number',
            label: 'Stone Weight'
          }, {
            name: 'uom',
            type: 'select',
            options: [
              { label: "GM", value: "GM" },
              { label: "PC", value: "PC" }
            ],
          }, {
            name: 'rate',
            type: 'number',
            label: 'Rate'
          }]
        }, {
          name: "stone_other_5",
          label: "Stone Or Other 5",
          type: "group",
          fields: [{
            name: "type",
            label: "Type",
            type: "select",
            options: [
              { label: "Stone", value: "STONE" },
              { label: "Other", value: "OTHER" }
            ]
          }, {
            name: 'pcs',
            type: 'number',
            label: 'Pieces'
          }, {
            name: 'ucm_wt',
            type: 'select',
            options: [
              { label: "CT", value: "CT" },
              { label: "GM", value: "GM" },
            ],
          }, {
            name: 'stone_wt',
            type: 'number',
            label: 'Stone Weight'
          }, {
            name: 'uom',
            type: 'select',
            options: [
              { label: "GM", value: "GM" },
              { label: "PC", value: "PC" }
            ],
          }, {
            name: 'rate',
            type: 'number',
            label: 'Rate'
          }]
        }, {
          name: "stone_other_6",
          label: "Stone Or Other 6",
          type: "group",
          fields: [{
            name: "type",
            label: "Type",
            type: "select",
            options: [
              { label: "Stone", value: "STONE" },
              { label: "Other", value: "OTHER" }
            ]
          }, {
            name: 'pcs',
            type: 'number',
            label: 'Pieces'
          }, {
            name: 'ucm_wt',
            type: 'select',
            options: [
              { label: "CT", value: "CT" },
              { label: "GM", value: "GM" },
            ],
          }, {
            name: 'stone_wt',
            type: 'number',
            label: 'Stone Weight'
          }, {
            name: 'uom',
            type: 'select',
            options: [
              { label: "GM", value: "GM" },
              { label: "PC", value: "PC" }
            ],
          }, {
            name: 'rate',
            type: 'number',
            label: 'Rate'
          }]
        }]
      },{
        label:'Shopify Details',
        fields:[{
          name:'product_id',
          type:'text',
          label:'Shopify Product ID',
          admin:{
            readOnly:true
          }
        }]
      }]
    }
  ],
}

export default Product
