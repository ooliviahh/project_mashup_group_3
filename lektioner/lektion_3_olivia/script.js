//Ladda in API från SCB 
const urlSCB = 
"https://api.scb.se/OV0104/v1/doris/sv/ssd/START/BE/BE0101/BE0101A/BefolkningNy";

const querySCB = {   
        "query": [
          {
            "code": "Region",
            "selection": {
              "filter": "vs:RegionKommun07",
              "values": ["2081", "2083"]
            }
          },
          {
            "code": "ContentsCode",
            "selection": {
              "filter": "item",
              "values": [
                "BE0101N1"
              ]
            }
          },
          {
            "code": "Tid",
            "selection": {
              "filter": "item",
              "values": [
                "2020", "2021", "2022", "2023"
              ]
            }
          }
        ],
        "response": {
          "format": "json"
        }
      };

      const request = new Request(urlSCB, {
        method: "POST", 
        body: JSON.stringify(querySCB)
      });

      fetch(request)
      //göra om till json
      .then(response => response.json())
      .then((scbData) =>  {
      
    //titta på data
      console.log(scbData);
      //behandla data

      //formatera data som chart.js vill ha det
      const values = scbData.data.map((value) => value.values[0]);
      console.log("värden: ", values);

      const labels = scbData.data.map(value => value.key[1]);
      console.log("etiketter: ", labels);

         // lägga in i diagram
         const datasets = [
            //endast ett dataset
            {
            label: "Befolkning", 
            data: values[0,1,2,3],
            backgroundColor: 'blue',
            borderWidth: 2,
            borderColor: 'black', 
            hoverBorderWidth: 4
        }, 
        {
          label: "Befolkning 2",
          data: values[4,5,6,7],
          backgroundColor: 'pink',
          borderWidth: 2,
          borderColor: 'blue', 
          hoverBorderWidth: 4
        },

        ];
        
        const data = {
            labels, 
            datasets
        };
        
        console.log(data);
        //chart type line istället för bar
        
        const config = {type: "line", data}
        const canvas = document.getElementById("scb");
        const scbChart = new Chart(canvas, config);
        console.log("data", data)
    });

  
//nytt diagram 
    const urlUN =
    "https://unstats.un.org/SDGAPI/v1/sdg/DataAvailability/GetIndicatorsAllCountries";

    //förstå hur förfrågan ska formuleras 
    const requestUN = new Request(urlUN, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: 'dataPointType=1&countryId=0&natureOfData=all'
    })
    
    //skicka förfrågan 
    fetch(requestUN)
    .then(response => response.json())
    .then((unData) => { 

        //titta på svaren
        console.log(unData)
        goalID = 3;

        //behandlar svaret
        
        const values = unData[goalID].indicators.map((indicator)=> indicator.percentage); 
        console.log(values);    

        const labels = unData[goalID].indicators.map((indicator) => indicator.code);
        console.log(labels);

        const datasets = [{
            label: "Uppfyllnad av mål, världen", 
            data: values
        }
    ];

    const data = {labels, datasets};
    const config = {type: "bar", data};
    const canvas = document.getElementById("un")
    const unChart = new Chart(canvas, config);

    });

    //Uppgift 1: Lägg till data för en kommun
    
 
