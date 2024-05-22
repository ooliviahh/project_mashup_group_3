// Lägga in data om fridlysta djur o växtarter från scb via API ------------>

const urlDjuroVaxtart = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0603/MI0603D/DjuroVaxtart";

const queryDjuroVaxtart = {
  "query": [
    {
      "code": "Region",
      "selection": {
        "filter": "item",
        "values": [
          "00"
        ]
      }
    },
    {
      "code": "Tid",
      "selection": {
        "filter": "item",
        "values": [
          "2022"
        ]
      }
    }
  ],
  "response": {
    "format": "json"
  }
};

const request = new Request(urlDjuroVaxtart, {
  method: 'POST',
  body: JSON.stringify(queryDjuroVaxtart)
});

fetch(request)
.then(response => response.json())
.then((dataDjuroVaxtart) => {


  console.log(dataDjuroVaxtart);

  const values = dataDjuroVaxtart.data.map((value) => value.values[0]);
  console.log("värden", values);

  const labels = dataDjuroVaxtart.data.map(value => value.key[1]);
  console.log("etiketter:", labels);

    const datasets = [
      {
        label: "Antal arter, utrotningshotade djur och växter i Sverige år 2022",
        data: values,
        backgroundColor: "rgb(24, 47, 33)",
        borderRadius: 10,

      }
    ];

    const data = {
      labels,
      datasets
    };
    

    console.log("data:", data);

    const config = {type: "bar", data,
      options: {
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Antal fridlysta djur och växtarter i Sverige år 2022',
            font: {
              size: 18
            }
          }
        }
      }
    };
    const canvas = document.getElementById('djuroVaxtarter');
    const djuroVaxtarterChart = new Chart(canvas, config); 


//-------------------------------------------------------------------------//
// Lägga in information om fridlysta djur, text + lägga 4 första som rubrik ------------>
console.log(dataDjuroVaxtart.columns[1]);

const animalTextElement = document.querySelector('.endangered-species-modal_text');
        const animalHeaderElement = document.querySelector(".endangered-species-modal_header");

        // Check if the elements exist in the DOM
        if (animalTextElement && animalHeaderElement) {
            // Hämta kommentaren och dela upp den i meningar med hjälp av en reguljär expression
            const comment = dataDjuroVaxtart.columns[1].comment;
            const words = comment.split(/\s+/);
            const sentences = comment.match(/[^\.!\?]+[\.!\?]+/g) || [comment]; // Split by sentence

            // Skapa en rubrik med den första meningen
            const headerText = words.slice(0, 4).join(' ');
            const headerElement = document.createElement('h4');
            headerElement.textContent = headerText;
            headerElement.classList.add('h4-text');

            // Skapa en textnod för den andra och tredje meningen
            const initialText = sentences.slice(1, 3).join(' ');
            const initialTextNode = document.createTextNode(initialText + " ");

            // Skapa en span för den dolda texten
            const hiddenText = sentences.slice(3).join(' ');
            const hiddenSpan = document.createElement('span');
            hiddenSpan.textContent = hiddenText;
            hiddenSpan.classList.add('hidden-text');

            // Skapa "Read more" och "Show less" knappar
            const readMoreButton = document.createElement('button');
            readMoreButton.textContent = 'Läs mer';
            readMoreButton.classList.add('read-more-button');

            const showLessButton = document.createElement('button');
            showLessButton.textContent = 'Läs mindre';
            showLessButton.style.display = 'none';
            showLessButton.classList.add('show-less-button');

            // Lägg till event listeners till knapparna
            readMoreButton.addEventListener('click', () => {
                hiddenSpan.classList.add('show-text');
                readMoreButton.style.display = 'none';
                showLessButton.style.display = 'inline';
            });

            showLessButton.addEventListener('click', () => {
                hiddenSpan.classList.remove('show-text');
                readMoreButton.style.display = 'inline';
                showLessButton.style.display = 'none';
            });

            // Lägg till rubriken i början av headerElement och den återstående texten i textElement
            animalHeaderElement.insertBefore(headerElement, animalHeaderElement.firstChild);
            animalTextElement.appendChild(initialTextNode);
            animalTextElement.appendChild(hiddenSpan);
            animalTextElement.appendChild(readMoreButton);
            animalTextElement.appendChild(showLessButton);
        } else {
            console.error("One or more elements were not found in the DOM");
        }

});


//-----------------------------------------------------------------------------------------------
// Två API:er till samma pie charts på sida 4, API från UN Goal across countries
async function getGoal15Swe() {
  const urlSWEUN1 = await fetch ("https://unstats.un.org/SDGAPI/v1/sdg/DataAvailability/GetIndicatorsAllCountries",
    {
      method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        // filtrera för sverige country id = 752
        body: 'dataPointType=3&countryId=752&natureOfData=All'
    }
  ).then(response => response.json());

      console.log("hopp",urlSWEUN1);

      // skriva ut text till page 2 
      const sweGoal = urlSWEUN1[14];
        const indicatorGoalswe = urlSWEUN1[14].indicators.map((indicator)=> indicator.percentage); 
        const textElement2 = document.querySelector(".second-page-text")
        const newHeading2 = document.createElement("h3");
        const newParagraph = document.createElement("p")
        const goal15Name = sweGoal.goalName;
        newHeading2.textContent = "United Nation beskriver mål 15:";
        newParagraph.textContent = goal15Name;
        textElement2.insertAdjacentElement("beforebegin", newHeading2);
        textElement2.insertAdjacentElement('beforebegin', newParagraph)

        // Rödlist index del mål 15.5.1 
        const indicatorGoalswe1551 = urlSWEUN1[14].indicators[6];

        //skapa pie charts till varje delmål
    
        const indicators = urlSWEUN1[14].indicators.slice(0, 10); // Assuming unsweData[14].indicators is an array of indicators

        const container = document.querySelector('.pie-charts__swe-goal-15');
        
        if (container) {
          
          indicators.forEach((indicator, index) => {
            const label = indicator.code;
            const description = indicator.description;
            const percentage = indicator.percentage;      
            
            const data = [percentage, 100 - percentage];
            
            const datasets = {
              datasets: [{
                label: `${label}`,
                data: data,  
                backgroundColor: ['rgb(24, 47, 33)', 'transparent'],
                hoverOffset: 4
              }]
            };
            
            const config = {
              type: "pie",
              data: {
                  labels: ['Uppfyllt', 'Ej uppfyllt'],
                  datasets: datasets.datasets
              },
              options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                let label = tooltipItem.label || '';
                                let value = tooltipItem.raw || 0;
                                if (label) {
                                    label += ': ';
                                }
                                label += `${value}%`;
                                return label;
                            }
                        }
                    }
                }
            }
        };
            
            // Skapa en wrapper-div till varje canvas, label och description

            const wrapperDiv = document.createElement('div');
            wrapperDiv.classList.add('chart-wrapper');
            
            const canvas = document.createElement('canvas');
            canvas.id = `goal15chart${index + 1}`;
            wrapperDiv.appendChild(canvas);
            
            const labelDiv = document.createElement('div');
            labelDiv.textContent = label;
            wrapperDiv.appendChild(labelDiv);
            
            const descriptionDiv = document.createElement('div');
            descriptionDiv.textContent = description;
            wrapperDiv.appendChild(descriptionDiv);
            
            container.appendChild(wrapperDiv);
            
            if (canvas) {
              const unsweDataChart = new Chart(canvas, config);
            }

          });
        }

        
  const urlUNgoalData = await fetch("https://unstats.un.org/SDGAPI/v1/sdg/Goal/15/Target/List?includechildren=true"
    ,  {
      method: "GET",
      headers: {
        "Accept": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      // body: "dataPointType=2&areaCodes=752&natureOfData=all"
    }
  )  .then(response => response.json());
 
  // const goalDataSWE = ungoalData;
  // console.log("UN API global goals 1",goalDataSWE);
  console.log("Goal 15 descriptions", urlUNgoalData);

  
};

getGoal15Swe();


    
//------------------------------------------------------------------------------ //

    //Scroll för knapp på startsidan // 

    function scrollToSecondPage(event) {
      event.preventDefault(); // Förhindra standardbeteendet för länken
      window.scrollTo({
          top: window.innerHeight, // Rulla ner med höjden av fönstret (100vh)
          behavior: 'smooth' // Gör rullningen jämn
      });
  }


  function scrollToThirdPage(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    const thirdPageSection = document.querySelector('.third-page__background'); // Get the third section element by class
    thirdPageSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the third section smoothly
}


function scrollToFourthPage(event) {
  event.preventDefault(); 
    const thirdPageSection = document.querySelector('.fourth-page'); 
    thirdPageSection.scrollIntoView({ behavior: 'smooth' });
}


//-----------Modaler för second och third -page-----------------------------------------------//
document.addEventListener('DOMContentLoaded', () => {
  // Get all the buttons on second page
  const btn1 = document.getElementById('bubble-btn_paw');
  const btn2 = document.getElementById('bubble-btn_tree');
  const btn3 = document.getElementById('bubble-btn_flower');
  //third page 
  const btn4 = document.getElementById('bubble-btn_hot_1');
  const btn5 = document.getElementById('bubble-btn_hot_2');
  const btn6 = document.getElementById('bubble-btn_hot_3');

  // Get all the modals
  const modal1 = document.getElementById('modal1');
  const modal2 = document.getElementById('modal2');
  const modal3 = document.getElementById('modal3');
  const modal4 = document.getElementById('modal4');
  const modal5 = document.getElementById('modal5');
  const modal6 = document.getElementById('modal6');

  // Get additional modals for links inside modals
  const modals = {
      'modal1_1': document.getElementById('modal1_1'),
      'modal1_2': document.getElementById('modal1_2'),
      'modal1_3': document.getElementById('modal1_3'),
      'modal1_4': document.getElementById('modal1_4'),
      'modal1_5': document.getElementById('modal1_5'),
      'modal2_1': document.getElementById('modal2_1'),
  };

  // Get the close elements
  const closeButtons = document.querySelectorAll('.close');
  const linkButtons = document.querySelectorAll('.link');

  // Function to open a modal
  function openModal(modal) {
      console.log(`Opening modal: ${modal.id}`);
      modal.style.display = "block";
      document.body.classList.add('modal-open');
      console.log('modal-open class added to body');
  }

  // Function to close a modal
  function closeModal(modal) {
    console.log(`Closing modal: ${modal.id}`);
    modal.style.display = "none";
    // Check if any modal is still open
    const anyModalOpen = Array.from(document.querySelectorAll('.modal')).some(m => m.style.display === "block");
    if (!anyModalOpen) {
        document.body.classList.remove('modal-open');
        console.log('modal-open class removed from body');
    } else {
        console.log('Other modals are still open, modal-open class not removed');
    }
}

  // When the user clicks on the button, open the modal
  btn1.onclick = function() {
      openModal(modal1);
  };

  btn2.onclick = function() {
      openModal(modal2);
  };

  btn3.onclick = function() {
      openModal(modal3);
  };
  btn4.onclick = function() {
      openModal(modal4);
  };
  btn5.onclick = function() {
      openModal(modal5);
  };
  btn6.onclick = function() {
    openModal(modal6);
};

  // When the user clicks on a link inside modal1, open the respective modal
  linkButtons.forEach(link => {
      link.onclick = function(event) {
          event.preventDefault();
          const modalId = this.getAttribute('data-modal');
          if (modals[modalId]) {
              openModal(modals[modalId]);
          }
      };
  });

  // When the user clicks on <span> (x), close the modal
  closeButtons.forEach(button => {
      button.onclick = function() {
          const modalId = this.getAttribute('data-modal');
          closeModal(document.getElementById(modalId));
      };
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target.classList.contains('modal')) {
          closeModal(event.target);
      }
  };
});



// ---------------- API från UN Goal across countries -----///
// const urlUNgoalData = "https://unstats.un.org/SDGAPI/v1/sdg/GeoArea/752/List";
// const requestUNgoalData = new Request(urlUNgoalData, 
//   {
//     method: "GET",
//     headers: {
//       "Accept": "application/json",
//       // "Content-Type": "application/x-www-form-urlencoded",
//     },
//     // body: "dataPointType=2&areaCodes=752&natureOfData=all"
//   }
// )

// fetch(requestUNgoalData) 
// .then(response => response.json())
// .then((ungoalData) => {

// const goalDataSWE = ungoalData;
// console.log("Den andra UN API global goals",goalDataSWE);

// const Goal14swe = ungoalData[14].indicators.map((indicator)=> indicator.percentage); 
//         console.log(Goal14swe)  

// })


// ---------------- API från SCB Natura 2000 områden -----///

const urlSCBNatura2000 = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0603/MI0603D/Natura2000N"

const querySCBNatura2000 =  
  {
    "query": [
      {
        "code": "Region",
        "selection": {
          "filter": "vs:RegionRiket99",
          "values": [
            "00"
          ]
        }
      },
      {
        "code": "Skyddsform",
        "selection": {
          "filter": "item",
          "values": [
            "200",
            "210"
          ]
        }
      },
      {
        "code": "ContentsCode",
        "selection": {
          "filter": "item",
          "values": [
            "000003HX"
          ]
        }
      }
    ],
    "response": {
      "format": "json"
    }
  };

  const requestNatura = new Request(urlSCBNatura2000, {
    method: 'POST',
    body: JSON.stringify(querySCBNatura2000)
  });

  fetch(requestNatura)
  .then(response => response.json())
  .then((dataNatura2000) => {

    console.log("Natura 2000 SCB API",dataNatura2000)

    const labelsNatura = dataNatura2000.data.map((data) => data.key[2]);
    console.log("Årtal",labelsNatura);

    const valuesNatura = dataNatura2000.data.map((data) => data.values[0]);
    console.log("Totalareal i hektar",valuesNatura);

    const labels = [...new Set (labelsNatura)];
    // console.log(labels)

    const dataSPA = valuesNatura.splice(0, labels.length);
    const dataSCI = valuesNatura;
    
  

// Natura 2000 chart 

    const datasetsNatura = [
      {
        label: "SPA områden i hektar",
        data: dataSPA,
        fill: "false",
        // borderWidth: 3,
        backgroundColor: "rgb(24, 47, 33)",
        hoverBorderWidth: 2,
        tension: 0.5
      },
      {
        label: "SCI områden i hektar",
        data: dataSCI,
        fill: false,
        backgroundColor: "rgb(217, 217, 217) ",
        borderRadius: 3,
        hoverBorderWidth: 2,
        tension: 0.5
      }
    ];

    const data = {
      labels,
      datasets: datasetsNatura
    };


    const config = {
      type: 'bar',
      data: data,
      options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                pointStyleWidth: 20,
              }
            },
            title: {
              display: true,
              text: 'Antal Natura 2000 områden i Sverige över tid',
              font: {
                size: 18
              }
            }
          },
          scales: {
              x: {
                  stacked: true,
              },
              y: {
                  stacked: true,
              },
          },
      },
  };

    const canvas = document.getElementById('natura2000');
    const natura2000Chart = new Chart(canvas, config);
  })


  const urlSCBNatura2000text = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0603/MI0603D/FormelltSkydd";

  const querySCBNatura2000text = {
    "query": [
      {
        "code": "Region",
        "selection": {
          "filter": "item",
          "values": [
            "00"
          ]
        }
      },
      {
        "code": "Skyddsform",
        "selection": {
          "filter": "item",
          "values": [
            "N2000"
          ]
        }
      },
      {
        "code": "ContentsCode",
        "selection": {
          "filter": "item",
          "values": [
            "000001IF"
          ]
        }
      }
    ],
    "response": {
      "format": "json"
    }
  };


  const requestNaturatext = new Request(urlSCBNatura2000text, {
    method: 'POST',
    body: JSON.stringify(querySCBNatura2000text)
  });

  fetch(requestNaturatext)
  .then(response => response.json())
  .then((dataNatura2000text) => {

    console.log("Natura 2000 SCB API text",dataNatura2000text)

    });
