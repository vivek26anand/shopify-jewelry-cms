import React from 'react';
import { useEffect } from 'react';
import { type AdminViewComponent } from 'payload/config';
import { DefaultTemplate, MinimalTemplate } from 'payload/components/templates';
import Papa from 'papaparse';
import qs from "qs";

const CustomView: AdminViewComponent = () => {
  const [fileData, setFileData] = React.useState<any>(null);
  const [progress, setProgress] = React.useState(0);
  const [errors, setErrors] = React.useState<string[]>([]);
  useEffect(() => {
    if (fileData) {
      // verify headers
      const headers = Object.keys(fileData[0]);
      console.log(headers);
      const requiredHeaders = [
        'barcode',
        'category',
        'title',
        'description',
        'huid',
        'purity',
        'tags',
        'pcs',
        'gw',
        'nw',
        'other_charges',
        'cert_no',
        'hm_chg',
        'making_chg',
        'mrp',
        'hsn',
        'image_1',
        'image_2',
        'Video',
        'diamond_1_type',
        'diamond_1_shape',
        'diamond_1_colour',
        'diamond_1_clarity',
        'diamond_1_pcs',
        'diamond_1_carat',
        'diamond_1_rate',
        'stone_other_1_type',
        'stone_other_1_pcs',
        'stone_other_1_ucm_wt',
        'stone_other_1_stone_wt',
        'stone_other_1_uom',
        'stone_other_1_rate',
        'diamond_2_type',
        'diamond_2_shape',
        'diamond_2_colour',
        'diamond_2_clarity',
        'diamond_2_pcs',
        'diamond_2_carat',
        'diamond_2_rate',
        'stone_other_2_type',
        'stone_other_2_pcs',
        'stone_other_2_ucm_wt',
        'stone_other_2_stone_wt',
        'stone_other_2_uom',
        'stone_other_2_rate',
        'diamond_3_type',
        'diamond_3_shape',
        'diamond_3_colour',
        'diamond_3_clarity',
        'diamond_3_pcs',
        'diamond_3_carat',
        'diamond_3_rate',
        'stone_other_3_type',
        'stone_other_3_pcs',
        'stone_other_3_ucm_wt',
        'stone_other_3_stone_wt',
        'stone_other_3_uom',
        'stone_other_3_rate',
        'diamond_4_type',
        'diamond_4_shape',
        'diamond_4_colour',
        'diamond_4_clarity',
        'diamond_4_pcs',
        'diamond_4_carat',
        'diamond_4_rate',
        'stone_other_4_type',
        'stone_other_4_pcs',
        'stone_other_4_ucm_wt',
        'stone_other_4_stone_wt',
        'stone_other_4_uom',
        'stone_other_4_rate',
        'diamond_5_type',
        'diamond_5_shape',
        'diamond_5_colour',
        'diamond_5_clarity',
        'diamond_5_pcs',
        'diamond_5_carat',
        'diamond_5_rate',
        'stone_other_5_type',
        'stone_other_5_pcs',
        'stone_other_5_ucm_wt',
        'stone_other_5_stone_wt',
        'stone_other_5_uom',
        'stone_other_5_rate',
        'diamond_6_type',
        'diamond_6_shape',
        'diamond_6_colour',
        'diamond_6_clarity',
        'diamond_6_pcs',
        'diamond_6_carat',
        'diamond_6_rate',
        'stone_other_6_type',
        'stone_other_6_pcs',
        'stone_other_6_ucm_wt',
        'stone_other_6_stone_wt',
        'stone_other_6_uom',
        'stone_other_6_rate'
      ];
      const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
      if (missingHeaders.length > 0) {
        alert(`Missing headers: ${missingHeaders.join(', ')}`);
        setFileData(null);
      }
    }
  }, [fileData]);
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
        <h1>Upload Products</h1>
        <p>Upload Products in csv format</p>
        <button onClick={() => {
          // Inside the button onClick function
          fetch('/api/products?depth=0&limit=1', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => res.json()).then(data => {
            // Create a CSV header including all fields from the product data
            const csvHeader = "barcode,category,title,description,huid,purity,tags,pcs,gw,nw,other_charges,cert_no,hm_chg,making_chg,mrp,hsn,image_1,image_2,Video,diamond_1_type,diamond_1_shape,diamond_1_colour,diamond_1_clarity,diamond_1_pcs,diamond_1_carat,diamond_1_rate,stone_other_1_type,stone_other_1_pcs,stone_other_1_ucm_wt,stone_other_1_stone_wt,stone_other_1_uom,stone_other_1_rate,diamond_2_type,diamond_2_shape,diamond_2_colour,diamond_2_clarity,diamond_2_pcs,diamond_2_carat,diamond_2_rate,stone_other_2_type,stone_other_2_pcs,stone_other_2_ucm_wt,stone_other_2_stone_wt,stone_other_2_uom,stone_other_2_rate,diamond_3_type,diamond_3_shape,diamond_3_colour,diamond_3_clarity,diamond_3_pcs,diamond_3_carat,diamond_3_rate,stone_other_3_type,stone_other_3_pcs,stone_other_3_ucm_wt,stone_other_3_stone_wt,stone_other_3_uom,stone_other_3_rate,diamond_4_type,diamond_4_shape,diamond_4_colour,diamond_4_clarity,diamond_4_pcs,diamond_4_carat,diamond_4_rate,stone_other_4_type,stone_other_4_pcs,stone_other_4_ucm_wt,stone_other_4_stone_wt,stone_other_4_uom,stone_other_4_rate,diamond_5_type,diamond_5_shape,diamond_5_colour,diamond_5_clarity,diamond_5_pcs,diamond_5_carat,diamond_5_rate,stone_other_5_type,stone_other_5_pcs,stone_other_5_ucm_wt,stone_other_5_stone_wt,stone_other_5_uom,stone_other_5_rate,diamond_6_type,diamond_6_shape,diamond_6_colour,diamond_6_clarity,diamond_6_pcs,diamond_6_carat,diamond_6_rate,stone_other_6_type,stone_other_6_pcs,stone_other_6_ucm_wt,stone_other_6_stone_wt,stone_other_6_uom,stone_other_6_rate\n";

            const csvRowsOne = data.docs
            const csvRows = csvRowsOne.map((doc) => {
              // Extracting nested objects like purity and diamond_1
              const barcode = doc.barcode || '';
              const category = doc.category || '';
              const title = doc.title || '';
              const description = doc.description || '';
              const huid = doc.huid || '';
              const tags = doc.tags || '';
              const pcs = doc.pcs || '';
              const gw = doc.gw || '';
              const nw = doc.nw || '';
              const otherCharges = doc.other_charges || '';
              const certNo = doc.cert_no || '';
              const hmChg = doc.hm_chg || '';
              const makingChg = doc.making_chg || '';
              const mrp = doc.mrp || '';
              const hsn = doc.hsn || '';
              const image1 = doc.image_1 || '';
              const image2 = doc.image_2 || '';
              const video = doc.Video || '';
              const purity = doc.purity || '';
              const diamond1Type = doc.diamond_1?.type || '';
              const diamond1Shape = doc.diamond_1?.shape || '';
              const diamond1Colour = doc.diamond_1?.colour || '';
              const diamond1Clarity = doc.diamond_1?.clarity || '';
              const diamond1Pcs = doc.diamond_1?.pcs || '';
              const diamond1Carat = doc.diamond_1?.carat || '';
              const diamond1Rate = doc.diamond_1?.rate || '';
              const stoneOther1Type = doc.stone_other_1?.type || '';
              const stoneOther1Pcs = doc.stone_other_1?.pcs || '';
              const stoneOther1UcmWt = doc.stone_other_1?.ucm_wt || '';
              const stoneOther1StoneWt = doc.stone_other_1?.stone_wt || '';
              const stoneOther1Uom = doc.stone_other_1?.uom || '';
              const stoneOther1Rate = doc.stone_other_1?.rate || '';
              const diamond2Type = doc.diamond_2?.type || '';
              const diamond2Shape = doc.diamond_2?.shape || '';
              const diamond2Colour = doc.diamond_2?.colour || '';
              const diamond2Clarity = doc.diamond_2?.clarity || '';
              const diamond2Pcs = doc.diamond_2?.pcs || '';
              const diamond2Carat = doc.diamond_2?.carat || '';
              const diamond2Rate = doc.diamond_2?.rate || '';
              const stoneOther2Type = doc.stone_other_2?.type || '';
              const stoneOther2Pcs = doc.stone_other_2?.pcs || '';
              const stoneOther2UcmWt = doc.stone_other_2?.ucm_wt || '';
              const stoneOther2StoneWt = doc.stone_other_2?.stone_wt || '';
              const stoneOther2Uom = doc.stone_other_2?.uom || '';
              const stoneOther2Rate = doc.stone_other_2?.rate || '';
              const diamond3Type = doc.diamond_3?.type || '';
              const diamond3Shape = doc.diamond_3?.shape || '';
              const diamond3Colour = doc.diamond_3?.colour || '';
              const diamond3Clarity = doc.diamond_3?.clarity || '';
              const diamond3Pcs = doc.diamond_3?.pcs || '';
              const diamond3Carat = doc.diamond_3?.carat || '';
              const diamond3Rate = doc.diamond_3?.rate || '';
              const stoneOther3Type = doc.stone_other_3?.type || '';
              const stoneOther3Pcs = doc.stone_other_3?.pcs || '';
              const stoneOther3UcmWt = doc.stone_other_3?.ucm_wt || '';
              const stoneOther3StoneWt = doc.stone_other_3?.stone_wt || '';
              const stoneOther3Uom = doc.stone_other_3?.uom || '';
              const stoneOther3Rate = doc.stone_other_3?.rate || '';
              const diamond4Type = doc.diamond_4?.type || '';
              const diamond4Shape = doc.diamond_4?.shape || '';
              const diamond4Colour = doc.diamond_4?.colour || '';
              const diamond4Clarity = doc.diamond_4?.clarity || '';
              const diamond4Pcs = doc.diamond_4?.pcs || '';
              const diamond4Carat = doc.diamond_4?.carat || '';
              const diamond4Rate = doc.diamond_4?.rate || '';
              const stoneOther4Type = doc.stone_other_4?.type || '';
              const stoneOther4Pcs = doc.stone_other_4?.pcs || '';
              const stoneOther4UcmWt = doc.stone_other_4?.ucm_wt || '';
              const stoneOther4StoneWt = doc.stone_other_4?.stone_wt || '';
              const stoneOther4Uom = doc.stone_other_4?.uom || '';
              const stoneOther4Rate = doc.stone_other_4?.rate || '';
              const diamond5Type = doc.diamond_5?.type || '';
              const diamond5Shape = doc.diamond_5?.shape || '';
              const diamond5Colour = doc.diamond_5?.colour || '';
              const diamond5Clarity = doc.diamond_5?.clarity || '';
              const diamond5Pcs = doc.diamond_5?.pcs || '';
              const diamond5Carat = doc.diamond_5?.carat || '';
              const diamond5Rate = doc.diamond_5?.rate || '';
              const stoneOther5Type = doc.stone_other_5?.type || '';
              const stoneOther5Pcs = doc.stone_other_5?.pcs || '';
              const stoneOther5UcmWt = doc.stone_other_5?.ucm_wt || '';
              const stoneOther5StoneWt = doc.stone_other_5?.stone_wt || '';
              const stoneOther5Uom = doc.stone_other_5?.uom || '';
              const stoneOther5Rate = doc.stone_other_5?.rate || '';
              const diamond6Type = doc.diamond_6?.type || '';
              const diamond6Shape = doc.diamond_6?.shape || '';
              const diamond6Colour = doc.diamond_6?.colour || '';
              const diamond6Clarity = doc.diamond_6?.clarity || '';
              const diamond6Pcs = doc.diamond_6?.pcs || '';
              const diamond6Carat = doc.diamond_6?.carat || '';
              const diamond6Rate = doc.diamond_6?.rate || '';
              const stoneOther6Type = doc.stone_other_6?.type || '';
              const stoneOther6Pcs = doc.stone_other_6?.pcs || '';
              const stoneOther6UcmWt = doc.stone_other_6?.ucm_wt || '';
              const stoneOther6StoneWt = doc.stone_other_6?.stone_wt || '';
              const stoneOther6Uom = doc.stone_other_6?.uom || '';
              const stoneOther6Rate = doc.stone_other_6?.rate || '';
              return `${barcode},${category},${title},${description},${huid},${purity},${tags},${pcs},${gw},${nw},${otherCharges},${certNo},${hmChg},${makingChg},${mrp},${hsn},${image1},${image2},${video},${diamond1Type},${diamond1Shape},${diamond1Colour},${diamond1Clarity},${diamond1Pcs},${diamond1Carat},${diamond1Rate},${stoneOther1Type},${stoneOther1Pcs},${stoneOther1UcmWt},${stoneOther1StoneWt},${stoneOther1Uom},${stoneOther1Rate},${diamond2Type},${diamond2Shape},${diamond2Colour},${diamond2Clarity},${diamond2Pcs},${diamond2Carat},${diamond2Rate},${stoneOther2Type},${stoneOther2Pcs},${stoneOther2UcmWt},${stoneOther2StoneWt},${stoneOther2Uom},${stoneOther2Rate},${diamond3Type},${diamond3Shape},${diamond3Colour},${diamond3Clarity},${diamond3Pcs},${diamond3Carat},${diamond3Rate},${stoneOther3Type},${stoneOther3Pcs},${stoneOther3UcmWt},${stoneOther3StoneWt},${stoneOther3Uom},${stoneOther3Rate},${diamond4Type},${diamond4Shape},${diamond4Colour},${diamond4Clarity},${diamond4Pcs},${diamond4Carat},${diamond4Rate},${stoneOther4Type},${stoneOther4Pcs},${stoneOther4UcmWt},${stoneOther4StoneWt},${stoneOther4Uom},${stoneOther4Rate},${diamond5Type},${diamond5Shape},${diamond5Colour},${diamond5Clarity},${diamond5Pcs},${diamond5Carat},${diamond5Rate},${stoneOther5Type},${stoneOther5Pcs},${stoneOther5UcmWt},${stoneOther5StoneWt},${stoneOther5Uom},${stoneOther5Rate},${diamond6Type},${diamond6Shape},${diamond6Colour},${diamond6Clarity},${diamond6Pcs},${diamond6Carat},${diamond6Rate},${stoneOther6Type},${stoneOther6Pcs},${stoneOther6UcmWt},${stoneOther6StoneWt},${stoneOther6Uom},${stoneOther6Rate}`;
            });
            const csvContent = csvHeader + csvRows.join("\n");
            const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const csvUrl = URL.createObjectURL(csvBlob);
            const link = document.createElement('a');
            link.setAttribute('href', csvUrl);
            link.setAttribute('download', 'products.csv');
            // Append link to the body, trigger click to download, and then remove the link
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
        }} className='pill pill--style-light pill--has-link pill--has-action'>
          Download Template
        </button>

        {/* only csv file */}
        <div>
          <input type="file" name="products" onChange={(e) => {

            // verify heders

            const file = e.target.files[0];
            Papa.parse(file, {
              complete: (result) => {
                setFileData(result.data);
              },
              header: true,
            });
          }} accept='.csv' className='' />
          <button onClick={async () => {
            // format data 
            // send to server
            // save to db
            // alert('Data uploaded successfully');
            // remove headers

            let formattedData = fileData.map((data: any) => {
              return {
                barcode: data.barcode,
                category: data.category,
                title: data.title,
                description: data.description,
                huid: data.huid,
                purity: data.purity,
                tags: data.tags,
                pcs: data.pcs,
                gw: data.gw,
                nw: data.nw,
                other_charges: data.other_charges,
                cert_no: data.cert_no,
                hm_chg: data.hm_chg,
                making_chg: data.making_chg,
                mrp: data.mrp,
                hsn: data.hsn,
                image_1: data.image_1,
                image_2: data.image_2,
                Video: data.Video,
                diamond_1: {
                  type: data.diamond_1_type,
                  shape: data.diamond_1_shape,
                  colour: data.diamond_1_colour,
                  clarity: data.diamond_1_clarity,
                  pcs: data.diamond_1_pcs,
                  carat: data.diamond_1_carat,
                  rate: data.diamond_1_rate
                },
                stone_other_1: data.stone_other_1_type && {
                  type: data.stone_other_1_type,
                  pcs: data.stone_other_1_pcs,
                  ucm_wt: data.stone_other_1_ucm_wt,
                  stone_wt: data.stone_other_1_stone_wt,
                  uom: data.stone_other_1_uom,
                  rate: data.stone_other_1_rate
                },
                diamond_2: {
                  type: data.diamond_2_type,
                  shape: data.diamond_2_shape,
                  colour: data.diamond_2_colour,
                  clarity: data.diamond_2_clarity,
                  pcs: data.diamond_2_pcs,
                  carat: data.diamond_2_carat,
                  rate: data.diamond_2_rate
                },
                stone_other_2: data.stone_other_2_type && {
                  type: data.stone_other_2_type,
                  pcs: data.stone_other_2_pcs,
                  ucm_wt: data.stone_other_2_ucm_wt,
                  stone_wt: data.stone_other_2_stone_wt,
                  uom: data.stone_other_2_uom,
                  rate: data.stone_other_2_rate
                },
                diamond_3: {
                  type: data.diamond_3_type,
                  shape: data.diamond_3_shape,
                  colour: data.diamond_3_colour,
                  clarity: data.diamond_3_clarity,
                  pcs: data.diamond_3_pcs,
                  carat: data.diamond_3_carat,
                  rate: data.diamond_3_rate
                },
                stone_other_3: data.stone_other_3_type && {
                  type: data.stone_other_3_type,
                  pcs: data.stone_other_3_pcs,
                  ucm_wt: data.stone_other_3_ucm_wt,
                  stone_wt: data.stone_other_3_stone_wt,
                  uom: data.stone_other_3_uom,
                  rate: data.stone_other_3_rate
                },
                diamond_4: {
                  type: data.diamond_4_type,
                  shape: data.diamond_4_shape,
                  colour: data.diamond_4_colour,
                  clarity: data.diamond_4_clarity,
                  pcs: data.diamond_4_pcs,
                  carat: data.diamond_4_carat,
                  rate: data.diamond_4_rate
                },
                stone_other_4: data.stone_other_4_type && {
                  type: data.stone_other_4_type,
                  pcs: data.stone_other_4_pcs,
                  ucm_wt: data.stone_other_4_ucm_wt,
                  stone_wt: data.stone_other_4_stone_wt,
                  uom: data.stone_other_4_uom,
                  rate: data.stone_other_4_rate
                },
                diamond_5: {
                  type: data.diamond_5_type,
                  shape: data.diamond_5_shape,
                  colour: data.diamond_5_colour,
                  clarity: data.diamond_5_clarity,
                  pcs: data.diamond_5_pcs,
                  carat: data.diamond_5_carat,
                  rate: data.diamond_5_rate
                },
                stone_other_5: data.stone_other_5_type && {
                  type: data.stone_other_5_type,
                  pcs: data.stone_other_5_pcs,
                  ucm_wt: data.stone_other_5_ucm_wt,
                  stone_wt: data.stone_other_5_stone_wt,
                  uom: data.stone_other_5_uom,
                  rate: data.stone_other_5_rate
                },
                diamond_6: {
                  type: data.diamond_6_type,
                  shape: data.diamond_6_shape,
                  colour: data.diamond_6_colour,
                  clarity: data.diamond_6_clarity,
                  pcs: data.diamond_6_pcs,
                  carat: data.diamond_6_carat,
                  rate: data.diamond_6_rate
                },
                stone_other_6: data.stone_other_6_type && {
                  type: data.stone_other_6_type,
                  pcs: data.stone_other_6_pcs,
                  ucm_wt: data.stone_other_6_ucm_wt,
                  stone_wt: data.stone_other_6_stone_wt,
                  uom: data.stone_other_6_uom,
                  rate: data.stone_other_6_rate
                }
              };
            });

            for await (const data of formattedData) {
              let index = formattedData.indexOf(data) + 1;
              if (!data.barcode) {
                return;
              }
              // check if barcode already exists
              let stringifiedQuery = qs.stringify({
                where: {
                  barcode: {
                    equals: data.barcode
                  }
                }
              }, {
                addQueryPrefix: true
              });
              try {
                let res:any = await fetch(`/api/products${stringifiedQuery}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
                let json = await res.json();
                if (json?.docs?.length > 0) {
                  // update
                  let res:any = await fetch(`/api/products/${json.docs[0].id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  }).catch((err) => {
                    setErrors([...errors, err]);
                  });
                  let resJson = await res.json();
                  console.log(resJson);
                  if (resJson.errors) {
                    setErrors([...errors, resJson.errors]);
                  } else {
                    setProgress(index);
                  }
                } else {
                  let res = await fetch('/api/products', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  }).catch((err) => {
                    setErrors([...errors, err]);
                  });
                  let json;
                  if (res instanceof Response) {
                    json = await res.json();
                  }
                  console.log(json);
                  if (json.errors) {
                    setErrors([...errors, json.errors]);
                  } else {
                    setProgress(index);
                  }
                }
              } catch (error) {
                setErrors([...errors, error]);
              }
            }
          }} className='btn btn--style-primary btn--icon-style-without-border btn--size-small btn--icon-position-right'>Upload</button>
        </div>
        {/* Display Data */}
        {/* Progress */}
        {progress > 0 && (
          <p>Uploaded {progress} of {fileData.length - 1}</p>
        )}
        {/* Errors */}
        {errors.length > 0 && (
          <div>
            <h3>Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{JSON.stringify(error)}</li>
              ))}
            </ul>
          </div>
        )}
        <div style={{
          overflow: 'auto',
          width: '100%',
        }}>
          {fileData && (
            <table className="table">
              <thead>
                <tr>
                  {Object.keys(fileData[0]).map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fileData.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, index) => (
                      <td key={index}>{value as string}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DefaultTemplate>
  );
};

const ExportProductButton = () => (
  <button onClick={() => {
    // Inside the button onClick function
    fetch('/api/products?depth=0&limit=1000', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {

      // Create a CSV header including all fields from the product data
      const csvHeader = "barcode,category,title,description,huid,purity,tags,pcs,gw,nw,other_charges,cert_no,hm_chg,making_chg,mrp,hsn,image_1,image_2,Video,diamond_1_type,diamond_1_shape,diamond_1_colour,diamond_1_clarity,diamond_1_pcs,diamond_1_carat,diamond_1_rate,stone_other_1_type,stone_other_1_pcs,stone_other_1_ucm_wt,stone_other_1_stone_wt,stone_other_1_uom,stone_other_1_rate,diamond_2_type,diamond_2_shape,diamond_2_colour,diamond_2_clarity,diamond_2_pcs,diamond_2_carat,diamond_2_rate,stone_other_2_type,stone_other_2_pcs,stone_other_2_ucm_wt,stone_other_2_stone_wt,stone_other_2_uom,stone_other_2_rate,diamond_3_type,diamond_3_shape,diamond_3_colour,diamond_3_clarity,diamond_3_pcs,diamond_3_carat,diamond_3_rate,stone_other_3_type,stone_other_3_pcs,stone_other_3_ucm_wt,stone_other_3_stone_wt,stone_other_3_uom,stone_other_3_rate,diamond_4_type,diamond_4_shape,diamond_4_colour,diamond_4_clarity,diamond_4_pcs,diamond_4_carat,diamond_4_rate,stone_other_4_type,stone_other_4_pcs,stone_other_4_ucm_wt,stone_other_4_stone_wt,stone_other_4_uom,stone_other_4_rate,diamond_5_type,diamond_5_shape,diamond_5_colour,diamond_5_clarity,diamond_5_pcs,diamond_5_carat,diamond_5_rate,stone_other_5_type,stone_other_5_pcs,stone_other_5_ucm_wt,stone_other_5_stone_wt,stone_other_5_uom,stone_other_5_rate,diamond_6_type,diamond_6_shape,diamond_6_colour,diamond_6_clarity,diamond_6_pcs,diamond_6_carat,diamond_6_rate,stone_other_6_type,stone_other_6_pcs,stone_other_6_ucm_wt,stone_other_6_stone_wt,stone_other_6_uom,stone_other_6_rate\n";

      const csvRowsOne = data.docs
      const csvRows = csvRowsOne.map((doc) => {
        // Extracting nested objects like purity and diamond_1
        const barcode = doc.barcode || '';
        const category = doc.category || '';
        const title = doc.title || '';
        const description = doc.description || '';
        const huid = doc.huid || '';
        const tags = doc.tags || '';
        const pcs = doc.pcs || '';
        const gw = doc.gw || '';
        const nw = doc.nw || '';
        const otherCharges = doc.other_charges || '';
        const certNo = doc.cert_no || '';
        const hmChg = doc.hm_chg || '';
        const makingChg = doc.making_chg || '';
        const mrp = doc.mrp || '';
        const hsn = doc.hsn || '';
        const image1 = doc.image_1 || '';
        const image2 = doc.image_2 || '';
        const video = doc.Video || '';
        const purity = doc.purity || '';
        const diamond1Type = doc.diamond_1?.type || '';
        const diamond1Shape = doc.diamond_1?.shape || '';
        const diamond1Colour = doc.diamond_1?.colour || '';
        const diamond1Clarity = doc.diamond_1?.clarity || '';
        const diamond1Pcs = doc.diamond_1?.pcs || '';
        const diamond1Carat = doc.diamond_1?.carat || '';
        const diamond1Rate = doc.diamond_1?.rate || '';
        const stoneOther1Type = doc.stone_other_1?.type || '';
        const stoneOther1Pcs = doc.stone_other_1?.pcs || '';
        const stoneOther1UcmWt = doc.stone_other_1?.ucm_wt || '';
        const stoneOther1StoneWt = doc.stone_other_1?.stone_wt || '';
        const stoneOther1Uom = doc.stone_other_1?.uom || '';
        const stoneOther1Rate = doc.stone_other_1?.rate || '';
        const diamond2Type = doc.diamond_2?.type || '';
        const diamond2Shape = doc.diamond_2?.shape || '';
        const diamond2Colour = doc.diamond_2?.colour || '';
        const diamond2Clarity = doc.diamond_2?.clarity || '';
        const diamond2Pcs = doc.diamond_2?.pcs || '';
        const diamond2Carat = doc.diamond_2?.carat || '';
        const diamond2Rate = doc.diamond_2?.rate || '';
        const stoneOther2Type = doc.stone_other_2?.type || '';
        const stoneOther2Pcs = doc.stone_other_2?.pcs || '';
        const stoneOther2UcmWt = doc.stone_other_2?.ucm_wt || '';
        const stoneOther2StoneWt = doc.stone_other_2?.stone_wt || '';
        const stoneOther2Uom = doc.stone_other_2?.uom || '';
        const stoneOther2Rate = doc.stone_other_2?.rate || '';
        const diamond3Type = doc.diamond_3?.type || '';
        const diamond3Shape = doc.diamond_3?.shape || '';
        const diamond3Colour = doc.diamond_3?.colour || '';
        const diamond3Clarity = doc.diamond_3?.clarity || '';
        const diamond3Pcs = doc.diamond_3?.pcs || '';
        const diamond3Carat = doc.diamond_3?.carat || '';
        const diamond3Rate = doc.diamond_3?.rate || '';
        const stoneOther3Type = doc.stone_other_3?.type || '';
        const stoneOther3Pcs = doc.stone_other_3?.pcs || '';
        const stoneOther3UcmWt = doc.stone_other_3?.ucm_wt || '';
        const stoneOther3StoneWt = doc.stone_other_3?.stone_wt || '';
        const stoneOther3Uom = doc.stone_other_3?.uom || '';
        const stoneOther3Rate = doc.stone_other_3?.rate || '';
        const diamond4Type = doc.diamond_4?.type || '';
        const diamond4Shape = doc.diamond_4?.shape || '';
        const diamond4Colour = doc.diamond_4?.colour || '';
        const diamond4Clarity = doc.diamond_4?.clarity || '';
        const diamond4Pcs = doc.diamond_4?.pcs || '';
        const diamond4Carat = doc.diamond_4?.carat || '';
        const diamond4Rate = doc.diamond_4?.rate || '';
        const stoneOther4Type = doc.stone_other_4?.type || '';
        const stoneOther4Pcs = doc.stone_other_4?.pcs || '';
        const stoneOther4UcmWt = doc.stone_other_4?.ucm_wt || '';
        const stoneOther4StoneWt = doc.stone_other_4?.stone_wt || '';
        const stoneOther4Uom = doc.stone_other_4?.uom || '';
        const stoneOther4Rate = doc.stone_other_4?.rate || '';
        const diamond5Type = doc.diamond_5?.type || '';
        const diamond5Shape = doc.diamond_5?.shape || '';
        const diamond5Colour = doc.diamond_5?.colour || '';
        const diamond5Clarity = doc.diamond_5?.clarity || '';
        const diamond5Pcs = doc.diamond_5?.pcs || '';
        const diamond5Carat = doc.diamond_5?.carat || '';
        const diamond5Rate = doc.diamond_5?.rate || '';
        const stoneOther5Type = doc.stone_other_5?.type || '';
        const stoneOther5Pcs = doc.stone_other_5?.pcs || '';
        const stoneOther5UcmWt = doc.stone_other_5?.ucm_wt || '';
        const stoneOther5StoneWt = doc.stone_other_5?.stone_wt || '';
        const stoneOther5Uom = doc.stone_other_5?.uom || '';
        const stoneOther5Rate = doc.stone_other_5?.rate || '';
        const diamond6Type = doc.diamond_6?.type || '';
        const diamond6Shape = doc.diamond_6?.shape || '';
        const diamond6Colour = doc.diamond_6?.colour || '';
        const diamond6Clarity = doc.diamond_6?.clarity || '';
        const diamond6Pcs = doc.diamond_6?.pcs || '';
        const diamond6Carat = doc.diamond_6?.carat || '';
        const diamond6Rate = doc.diamond_6?.rate || '';
        const stoneOther6Type = doc.stone_other_6?.type || '';
        const stoneOther6Pcs = doc.stone_other_6?.pcs || '';
        const stoneOther6UcmWt = doc.stone_other_6?.ucm_wt || '';
        const stoneOther6StoneWt = doc.stone_other_6?.stone_wt || '';
        const stoneOther6Uom = doc.stone_other_6?.uom || '';
        const stoneOther6Rate = doc.stone_other_6?.rate || '';
        return `${barcode},${category},${title},${description},${huid},${purity},${tags},${pcs},${gw},${nw},${otherCharges},${certNo},${hmChg},${makingChg},${mrp},${hsn},${image1},${image2},${video},${diamond1Type},${diamond1Shape},${diamond1Colour},${diamond1Clarity},${diamond1Pcs},${diamond1Carat},${diamond1Rate},${stoneOther1Type},${stoneOther1Pcs},${stoneOther1UcmWt},${stoneOther1StoneWt},${stoneOther1Uom},${stoneOther1Rate},${diamond2Type},${diamond2Shape},${diamond2Colour},${diamond2Clarity},${diamond2Pcs},${diamond2Carat},${diamond2Rate},${stoneOther2Type},${stoneOther2Pcs},${stoneOther2UcmWt},${stoneOther2StoneWt},${stoneOther2Uom},${stoneOther2Rate},${diamond3Type},${diamond3Shape},${diamond3Colour},${diamond3Clarity},${diamond3Pcs},${diamond3Carat},${diamond3Rate},${stoneOther3Type},${stoneOther3Pcs},${stoneOther3UcmWt},${stoneOther3StoneWt},${stoneOther3Uom},${stoneOther3Rate},${diamond4Type},${diamond4Shape},${diamond4Colour},${diamond4Clarity},${diamond4Pcs},${diamond4Carat},${diamond4Rate},${stoneOther4Type},${stoneOther4Pcs},${stoneOther4UcmWt},${stoneOther4StoneWt},${stoneOther4Uom},${stoneOther4Rate},${diamond5Type},${diamond5Shape},${diamond5Colour},${diamond5Clarity},${diamond5Pcs},${diamond5Carat},${diamond5Rate},${stoneOther5Type},${stoneOther5Pcs},${stoneOther5UcmWt},${stoneOther5StoneWt},${stoneOther5Uom},${stoneOther5Rate},${diamond6Type},${diamond6Shape},${diamond6Colour},${diamond6Clarity},${diamond6Pcs},${diamond6Carat},${diamond6Rate},${stoneOther6Type},${stoneOther6Pcs},${stoneOther6UcmWt},${stoneOther6StoneWt},${stoneOther6Uom},${stoneOther6Rate}`;
      });
      const csvContent = csvHeader + csvRows.join("\n");
      const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const csvUrl = URL.createObjectURL(csvBlob);
      const link = document.createElement('a');
      link.setAttribute('href', csvUrl);
      link.setAttribute('download', 'products.csv');
      // Append link to the body, trigger click to download, and then remove the link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }} className='pill pill--style-light pill--has-link pill--has-action'>
    Download Products
  </button>
)
export const ExportProductButtonComponent = ExportProductButton;
export default CustomView;