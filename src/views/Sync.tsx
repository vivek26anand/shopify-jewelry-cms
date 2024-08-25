import React from 'react'

import { type AdminViewComponent } from 'payload/config'
import { DefaultTemplate } from 'payload/components/templates'
const GetProducts = async () => {
  const res = await fetch('/api/products?depth=0&limit=1000', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const json = await res.json();
  const products = json.docs;
  return products;
}
const CreateProduct = async (product) => {
  const res = await fetch('/upload-to-shopify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });
  const json = await res.json();
  return json;
}
const CustomView: AdminViewComponent = () => {
  const [logs, setLogs] = React.useState<string[]>([]);
  return (
    <DefaultTemplate>
      <style>
        {`
          header {
            display: none;
          }
        `}
      </style>
      <div className='gutter--left gutter--right collection-list__wrap' style={{
        marginTop: 'var(--base)',
        overflow: 'auto',
      }}>
        <h1>
          Sync Products to Shopify
        </h1>
        <p>
          Sync all your products to Shopify
        </p>
        {/* error can't connect to shopify */}
        {logs.length > 0 ? (<div>
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>):(
            <button onClick={async () => {
              const products = await GetProducts();
              for await (const product of products) {
                const res = await fetch(`/api/metal-rates/${product.purity}?depth=0`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
                const json = await res.json();
                product.metal_rate = json.rate ? json.rate : 0;
                const result = await CreateProduct(product);

                let product_id = result.product_id;
                if(result.error) {
                  setLogs([...logs, 'BARCODE : '+product.barcode+' : '+result.error]);
                  return;
                }
                let url = '/api/products/' + product.id;
                const options = {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    product_id: product_id
                  })
                };
                const response2 = await fetch(url, options);
                const result2 = await response2.json();
                setLogs([...logs, 'BARCODE : '+product.barcode+' : '+result2.message]);
              }
            }} className='btn btn--style-primary btn--icon-style-without-border btn--size-small btn--icon-position-right'>
              Start Sync
            </button>
        )}
        
      </div>
    </DefaultTemplate>
  )
}

export default CustomView