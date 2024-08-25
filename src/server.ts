import express from 'express'
import payload from 'payload'

require('dotenv').config()
const app = express()
app.use(express.json());
// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here
  // add a route 
  app.post('/upload-to-shopify', async (req, res) => {
    try {
      // check fields
      const product = req.body;

      // product price calculation
    //   "formulas":{
    //     "metal_value":"this.nw * enum_val(this.purity)",
    //     "diamond_1_value":"this.diamond_1.carat * this.diamond_1?.rate",
    //     "diamond_2_value":"this.diamond_2.carat * this.diamond_2?.rate",
    //     "diamond_3_value":"this.diamond_3.carat * this.diamond_3?.rate",
    //     "diamond_4_value":"this.diamond_4.carat * this.diamond_4?.rate",
    //     "diamond_5_value":"this.diamond_5.carat * this.diamond_5?.rate",
    //     "diamond_6_value":"this.diamond_6.carat * this.diamond_6?.rate",
    //     "stone_other_1_value":"enum_val(this.stone_other_1?.uom) == 'PC' ? this.stone_other_1?.pcs * this.stone_other_1?.rate : this.stone_other_1?.stone_wt * this.stone_other_1?.rate",
    //     "stone_other_2_value":"enum_val(this.stone_other_2?.uom) == 'PC' ? this.stone_other_2?.pcs * this.stone_other_2?.rate : this.stone_other_2?.stone_wt * this.stone_other_2?.rate",
    //     "stone_other_3_value":"enum_val(this.stone_other_3?.uom) == 'PC' ? this.stone_other_3?.pcs * this.stone_other_3?.rate : this.stone_other_3?.stone_wt * this.stone_other_3?.rate",
    //     "stone_other_4_value":"enum_val(this.stone_other_4?.uom) == 'PC' ? this.stone_other_4?.pcs * this.stone_other_4?.rate : this.stone_other_4?.stone_wt * this.stone_other_4?.rate",
    //     "stone_other_5_value":"enum_val(this.stone_other_5?.uom) == 'PC' ? this.stone_other_5?.pcs * this.stone_other_5?.rate : this.stone_other_5?.stone_wt * this.stone_other_5?.rate",
    //     "stone_other_6_value":"enum_val(this.stone_other_6?.uom) == 'PC' ? this.stone_other_6?.pcs * this.stone_other_6?.rate : this.stone_other_6?.stone_wt * this.stone_other_6?.rate",
    //     "total_diamond_value":"this.diamond_1_value + this.diamond_2_value + this.diamond_3_value + this.diamond_4_value + this.diamond_5_value + this.diamond_6_value",
    //     "total_stone_other_value":"this.stone_other_1_value + this.stone_other_2_value + this.stone_other_3_value + this.stone_other_4_value + this.stone_other_5_value + this.stone_other_6_value",
    //     "total_value":"this.metal_value + this.total_diamond_value + this.total_stone_other_value + this.other_charges + this.cert_chg + this.hm_chg + this.making_chg"
    // }

      const metal_value = product.nw * product.metal_rate;
      const diamond_1_value = product.diamond_1.carat * product.diamond_1?.rate;
      const diamond_2_value = product.diamond_2.carat * product.diamond_2?.rate;
      const diamond_3_value = product.diamond_3.carat * product.diamond_3?.rate;
      const diamond_4_value = product.diamond_4.carat * product.diamond_4?.rate;
      const diamond_5_value = product.diamond_5.carat * product.diamond_5?.rate;
      const diamond_6_value = product.diamond_6.carat * product.diamond_6?.rate;
      const stone_other_1_value = product.stone_other_1?.uom === 'PC' ? product.stone_other_1?.pcs * product.stone_other_1?.rate : product.stone_other_1?.stone_wt * product.stone_other_1?.rate;
      const stone_other_2_value = product.stone_other_2?.uom === 'PC' ? product.stone_other_2?.pcs * product.stone_other_2?.rate : product.stone_other_2?.stone_wt * product.stone_other_2?.rate;
      const stone_other_3_value = product.stone_other_3?.uom === 'PC' ? product.stone_other_3?.pcs * product.stone_other_3?.rate : product.stone_other_3?.stone_wt * product.stone_other_3?.rate;
      const stone_other_4_value = product.stone_other_4?.uom === 'PC' ? product.stone_other_4?.pcs * product.stone_other_4?.rate : product.stone_other_4?.stone_wt * product.stone_other_4?.rate;
      const stone_other_5_value = product.stone_other_5?.uom === 'PC' ? product.stone_other_5?.pcs * product.stone_other_5?.rate : product.stone_other_5?.stone_wt * product.stone_other_5?.rate;
      const stone_other_6_value = product.stone_other_6?.uom === 'PC' ? product.stone_other_6?.pcs * product.stone_other_6?.rate : product.stone_other_6?.stone_wt * product.stone_other_6?.rate;
      const total_diamond_value = diamond_1_value + diamond_2_value + diamond_3_value + diamond_4_value + diamond_5_value + diamond_6_value;
      const total_stone_other_value = stone_other_1_value + stone_other_2_value + stone_other_3_value + stone_other_4_value + stone_other_5_value + stone_other_6_value;
      const total_value = (metal_value || 0) + (total_diamond_value || 0) + (total_stone_other_value || 0) + (product.other_charges || 0) + (product.cert_chg || 0) + (product.hm_chg || 0) + (product.making_chg || 0);

      // check if all fields are present else set as empty string
      const productString = JSON.stringify(product)


      let queryPayload = {
        "query": `mutation createProductAsynchronous($productSet: ProductSetInput!, $synchronous: Boolean!) {
          productSet(synchronous: $synchronous, input: $productSet) {
            product {
              id
            }
            productSetOperation {
              id
              status
              userErrors {
                code
                field
                message
              }
            }
            userErrors {
              code
              field
              message
            }
          }
        }`,
        "variables": {
          "synchronous": true,
          "productSet": {
            "title": product.title,
            "id": product.product_id ? product.product_id : null,
            "descriptionHtml": product.description,
            "productType": product.category,
            "status": "ACTIVE",
            "tags": product.tags ? product.tags.split(',') : [],
            "metafields": [{
              "key": "details",
              "value": productString,
              "type": "json",
              "namespace": "global"
            }],
            "productOptions": [
              {
                "name": "Title",
                "position": 1,
                "values": [
                  {
                    "name": "Default Title"
                  },
                ]
              }
            ],
            "variants": [
              {
                "optionValues": [
                  {
                    "optionName": "Title",
                    "name": "Default Title"
                  }
                ],
                "inventoryPolicy": "CONTINUE",
                "price": product.mrp ? product.mrp : total_value,
                "barcode": product.barcode,
              }
            ]
          }
        },
      };
      // if productSet.id is null then delete it
      if(!product.product_id) {
        delete queryPayload.variables.productSet.id;
      }
      const url = 'https://mcjewellers.myshopify.com/admin/api/2024-04/graphql.json';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': ''
        },
        body: JSON.stringify(queryPayload)
      };
      const response = await fetch(url, options);
      const result = await response.json();
      if(result.errors) {
        throw new Error(result.errors[0].message);
      } else if (result.data.productSet.userErrors.length > 0){
        throw new Error(result.data.productSet.userErrors[0].message);
      } else {
        // upoload images 
        
        res.send({ product_id: result.data.productSet.product.id });
      }
      // check if product is created
    } catch (error) {
      res.send({ error: error.message }); // send response
    }
  })
  app.listen(30001)
}

start()
