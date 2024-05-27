// //Ladda in API från SCB 
// const urlSCB = 
// "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/BE/BE0101/BE0101A/BefolkningNy";

// const querySCB = {   
//         "query": [
//           {
//             "code": "Region",
//             "selection": {
//               "filter": "vs:RegionKommun07",
//               "values": [
//                 "2021",
//                 "2023",
//                 "2026",
//                 "2029",
//                 "2031",
//                 "2034",
//                 "2039",
//                 "2061",
//                 "2062",
//                 "2080",
//                 "2081",
//                 "2082",
//                 "2083",
//                 "2084",
//                 "2085"
//               ]
//             }
//           },
//           {
//             "code": "ContentsCode",
//             "selection": {
//               "filter": "item",
//               "values": [
//                 "BE0101N1"
//               ]
//             }
//           },
//           {
//             "code": "Tid",
//             "selection": {
//               "filter": "item",
//               "values": [
//                 "2023"
//               ]
//             }
//           }
//         ],
//         "response": {
//           "format": "json"
//         }
//       };

//       const request = new Request(urlSCB, {
//         method: "POST", 
//         body: JSON.stringify(querySCB)
//       });

//       fetch(request)
//       .then(response => response.json())
//       .then((scbData) =>  {
      
//       console.log(scbData);

//       const values = scbData.data.map((value) => value.values[0]);
//       console.log(values);
//     });

//     // hitta rätt URL 
//     const urlUN =
//     "https://unstats.un.org/SDGAPI/v1/sdg/DataAvailability/GetIndicatorsAllCountries";

//     //förstå hur förfrågan ska formuleras 
//     const requestUN = new Request(urlUN, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: 'dataPointType=1&countryId=0&natureOfData=all'
//     })
    
//     //skicka förfrågan 
//     fetch(requestUN)
//     .then(response => response.json())
//     .then((unData) => { 

//         //titta på svaren
//         console.log(unData)

//         //behandlar svaret
//         const indicator = unData[1].indicators[0];
//         console.log(indicator);
//         const indicatorGoal2 = unData[1].indicators.map((indicator)=> indicator.percentage); 
//     console.log(indicatorGoal2);    
//     });


    //Övningar 5.1

// const urlSCB2 = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0307/MI0307T1";

// const querySCB2 = {
//   "query": [
//     {
//       "code": "Forpackning",
//       "selection": {
//         "filter": "item",
//         "values": [
//           "10"
//         ]
//       }
//     },
//     {
//       "code": "ContentsCode",
//       "selection": {
//         "filter": "item",
//         "values": [
//           "000000XV"
//         ]
//       }
//     },
//     {
//       "code": "Tid",
//       "selection": {
//         "filter": "item",
//         "values": [
//           "2015",
//           "2016",
//           "2017",
//           "2018",
//           "2019"
//         ]
//       }
//     }
//   ],
//   "response": {
//     "format": "JSON"
//   }
// }

//   const request2 = new Request(urlSCB2, {
//     method: "POST", 
//     body: JSON.stringify(querySCB2)
//   });

//   fetch(request2)
//   .then(response => response.json())
//   .then((scb2Data) =>  {
  
//   console.log(scb2Data);

//   const values2 = scb2Data.data.map((value) => value.values[0]);
//   console.log(values2);
// });

// övning 5.2 

    // hitta rätt URL 
    // const urlSWEUN =
    // "https://unstats.un.org/SDGAPI/v1/sdg/DataAvailability/GetIndicatorsAllCountries";

    // //förstå hur förfrågan ska formuleras 
    // const requestSWEUN = new Request(urlSWEUN, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     // filtrera för sverige country id = 752
    //     body: 'dataPointType=1&countryId=752&natureOfData=C'
    // })
    
    // //skicka förfrågan 
    // fetch(requestSWEUN)
    // .then(response => response.json())
    // .then((unsweData) => { 

    //     //titta på svaren
    //     console.log(unsweData)

    //     //behandlar svaret - lägg till indicator 12.6.1
    //     const indicator = unsweData[11].indicators[7];
    //     console.log(indicator);  
    //     const indicatorGoalswe = unsweData[11].indicators.map((indicator)=> indicator.percentage); 
    // console.log(indicatorGoalswe)  
    // });


//     // Uppgift 3,  Hämta land kod för Sverige;
// const urlZUN1 =
//     "https://unstats.un.org/SDGAPI/v1/sdg/GeoArea/List";

// const requestZUN1 = new Request(urlZUN1, {
//     method: "GET",
//     headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//     }
// });

// fetch(requestZUN1)
//     .then(response => response.json())
//     .then(data => {
//         console.log("Svaret från servern:", data);

//         // Filter data for Zambia
//         const zambiaData = data.filter(country => country.geoAreaName === 'Zambia');
//         console.log("Data för Zambia:", zambiaData);
//     })
//     .catch(error => {
//         console.error('Det uppstod ett problem med fetch-operationen:', error);
//     });




//     // Hämta, landkod för Sverige 
// const urlSUN1 =
//     "https://unstats.un.org/SDGAPI/v1/sdg/GeoArea/List";

// const requestSUN1 = new Request(urlSUN1, {
//     method: "GET",
//     headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//     }
// });

// fetch(requestSUN1)
//     .then(response => response.json())
//     .then(data => {
//         console.log("Svaret från servern:", data);

//         // Filter data for Zambia
//         const sweData = data.filter(country => country.geoAreaName === 'Sweden');
//         console.log("Data för Sweden:", sweData);
//     })
//     .catch(error => {
//         console.error('Det uppstod ett problem med fetch-operationen:', error);
//     });

    //Uppgift 4 
    
const URLEnergy = 
    'http://pxexternal.energimyndigheten.se/api/v1/sv/Vindkraftsstatistik/EN0105_3.px';

    
const queryEnergy = {
        "query": [
          {
            "code": "År",
            "selection": {
              "filter": "item",
              "values": [
                "16",
                "17",
                "18",
                "19"
              ]
            }
          },
          {
            "code": "Län",
            "selection": {
              "filter": "item",
              "values": [
                "15"
              ]
            }
          },
          {
            "code": "Kategori",
            "selection": {
              "filter": "item",
              "values": [
                "2"
              ]
            }
          }
        ],
        "response": {
          "format": "json"
        }
      }

const request = new Request(URLEnergy, {
  method: "POST", 
  body: JSON.stringify(queryEnergy)
});

fetch(request)
.then(response => response.json())
.then((energyData) => {
  console.log(energyData);

  const values = energyData.data.map((value) => value.values[0]);
  console.log(values);

});

