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

  // const customLabel = ['Etikett1','Etikett2', 'Etikett 3', 'Etikett 4', 'Etikett 5', 'Etikett6'];
  // const labels = customLabel;

  const labels = dataDjuroVaxtart.data.map(value => value.key[1]);
  console.log("etiketter:", labels);

    const datasets = [
      {
        label: "Antal",
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

// Lägga in information om fridlysta djur, text + lägga 4 första ord som rubrik ------------>
console.log(dataDjuroVaxtart.columns[1]);
const animalTextElement = document.querySelector('.endangered-species-modal_text');
const animalHeaderElement = document.querySelector(".endangered-species-modal_header");

// Check if the elements exist in the DOM
if (animalTextElement && animalHeaderElement) {
    // Hämta kommentaren
    let comment = dataDjuroVaxtart.columns[1].comment;

    // Dela upp texten i ord och ta bort de första fyra orden
    const words = comment.split(/\s+/);
    const headerText = words.slice(0, 4).join(' ');
    comment = words.slice(4).join(' ');

    // Dela upp den resterande texten i meningar
    const sentences = comment.match(/[^\.!\?]+[\.!\?]+/g) || [comment]; // Split by sentence

    // Skapa en rubrik med de första fyra orden
    const headerElement = document.createElement('h4');
    headerElement.textContent = headerText;
    headerElement.classList.add('h4-text');

    // Funktion för att dela upp texten i stycken
    function splitIntoParagraphs(text, firstParagraphSentences, subsequentParagraphSentences) {
        const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text]; // Dela upp texten i meningar
        const paragraphs = [];

        let i = 0;
        // Första stycket med angivet antal meningar
        const firstParagraph = sentences.slice(i, i + firstParagraphSentences).join(' ').trim();
        paragraphs.push(firstParagraph);
        i += firstParagraphSentences;

        // Resten av styckena med angivet antal meningar
        while (i < sentences.length) {
            const paragraph = sentences.slice(i, i + subsequentParagraphSentences).join(' ').trim();
            paragraphs.push(paragraph);
            i += subsequentParagraphSentences;
        }

        return paragraphs;
    }

    // Dela upp texten i stycken: första stycket med 3 meningar, resten med 2 meningar
    const paragraphs = splitIntoParagraphs(comment, 4, 2);

    // Skapa textnoder för varje stycke
    paragraphs.forEach((paragraph, index) => {
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = paragraph;
        paragraphElement.classList.add('p-text')

        // Lägg till stycken till textElement
        if (index === 0) {
            // Första stycket visas direkt
            animalTextElement.appendChild(paragraphElement);
        } else {
            // Övriga stycken läggs till i en span som initialt är dold
            paragraphElement.classList.add('hidden-text');
            animalTextElement.appendChild(paragraphElement);
        }
    });

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
        document.querySelectorAll('.hidden-text').forEach(element => {
            element.classList.add('show-text');
        });
        readMoreButton.style.display = 'none';
        showLessButton.style.display = 'inline';
    });

    showLessButton.addEventListener('click', () => {
        document.querySelectorAll('.hidden-text').forEach(element => {
            element.classList.remove('show-text');
        });
        readMoreButton.style.display = 'inline';
        showLessButton.style.display = 'none';
    });

    // Lägg till rubriken i början av headerElement och knapparna i textElement
    animalHeaderElement.insertBefore(headerElement, animalHeaderElement.firstChild);
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
      const indicatorGoalswe = urlSWEUN1[14].indicators.map((indicator) => indicator.percentage); 
      const textElement2 = document.querySelector(".second-page-text");
      const newHeading2 = document.createElement("p");
      const newParagraph = document.createElement("p");
      const goal15Name = sweGoal.goalName;
      newHeading2.textContent = "United Nation beskriver mål 15:";
      newParagraph.textContent = '"'+goal15Name+"."+'"';
      textElement2.insertAdjacentElement("beforebegin", newHeading2);
      textElement2.insertAdjacentElement("beforebegin", newParagraph);

        // Rödlist index del mål 15.5.1 
        const indicatorGoalswe1551 = urlSWEUN1[14].indicators[6];

//Skapa pie-chart för varje delmål

const indicators = urlSWEUN1[14].indicators.slice(0, 10); // Assuming unsweData[14].indicators is an array of indicators

const container = document.querySelector('.pie-charts__swe-goal-15 ');
// const figureText = document.querySelector('.figure-text');

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
        borderColor: ['rgb(24, 47, 33)'],
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
          legend: {
            display: false
          },
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
    labelDiv.classList.add('pieChart_labelDiv')
    labelDiv.textContent = label;
    wrapperDiv.appendChild(labelDiv);
    
    const descriptionDiv = document.createElement('p');
    descriptionDiv.classList.add('p-text')
    descriptionDiv.textContent = description+".";
    wrapperDiv.appendChild(descriptionDiv);
    
    container.insertAdjacentElement('beforeend', wrapperDiv);
    
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

      },

    }
  )  .then(response => response.json());
 
console.log("Goal 15 descriptions", urlUNgoalData);

// Select all elements with the class 'target-description__text'
const descriptionElements = document.querySelectorAll('.target-description__text');

// Iterate over each target and corresponding HTML element
urlUNgoalData.forEach(goal => {
  // Iterate over each target within the goal
  goal.targets.forEach((target, index) => {
    // Ensure the element exists before attempting to set its text
    if (descriptionElements[index]) {
      descriptionElements[index].textContent = '"'+target.description+"."+'"';
    }
  });
});

  
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
  // Bubble buttons second page
  const btn1 = document.getElementById('bubble-btn_paw');
  const btn2 = document.getElementById('bubble-btn_tree');
  const btn3 = document.getElementById('bubble-btn_flower');
  //third page 
  const btn4 = document.getElementById('bubble-btn_hot_1');
  const btn5 = document.getElementById('bubble-btn_hot_2');
  const btn6 = document.getElementById('bubble-btn_hot_3');

  // Modaler page 2 och 3
  const modal1 = document.getElementById('modal1');
  const modal2 = document.getElementById('modal2');
  const modal3 = document.getElementById('modal3');
  const modal4 = document.getElementById('modal4');
  const modal5 = document.getElementById('modal5');
  const modal6 = document.getElementById('modal6');

  // Modaler i modal 1
  const modals = {
      'modal1_1': document.getElementById('modal1_1'),
      'modal1_2': document.getElementById('modal1_2'),
      'modal1_3': document.getElementById('modal1_3'),
      'modal1_4': document.getElementById('modal1_4'),
      'modal1_5': document.getElementById('modal1_5'),
      'modal2_1': document.getElementById('modal2_1'),
  };

  // Stäng-knappen
  const closeButtons = document.querySelectorAll('.close');
  const linkButtons = document.querySelectorAll('.link');

  // Funktion för att öppna en modal
  function openModal(modal) {
      console.log(`Opening modal: ${modal.id}`);
      modal.style.display = "block";
      document.body.classList.add('modal-open');
      console.log('modal-open class added to body');
  }

  // Funktion för att stänga modal 
  function closeModal(modal) {
    console.log(`Closing modal: ${modal.id}`);
    modal.style.display = "none";
    // Kolla om någon modal är öppen, för att ta bort modal-open klassen
    const anyModalOpen = Array.from(document.querySelectorAll('.modal')).some(m => m.style.display === "block");
    if (!anyModalOpen) {
        document.body.classList.remove('modal-open');
        console.log('modal-open class removed from body');
    } else {
        console.log('Other modals are still open, modal-open class not removed');
    }
}

  // När använvdaren klickar på en knapp, öppna modalen
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

  // Öppna modaler i modal 1 när man klickar på länken
  linkButtons.forEach(link => {
      link.onclick = function(event) {
          event.preventDefault();
          const modalId = this.getAttribute('data-modal');
          if (modals[modalId]) {
              openModal(modals[modalId]);
          }
      };
  });

  // När användaren klickar på (x)close-knappen, stäng modalen
  closeButtons.forEach(button => {
      button.onclick = function() {
          const modalId = this.getAttribute('data-modal');
          closeModal(document.getElementById(modalId));
      };
  });

  // När man klickar utanför modalen så skall den stängas.
  window.onclick = function(event) {
      if (event.target.classList.contains('modal')) {
          closeModal(event.target);
      }
  };
});






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

    // Footer länkar till olika sections på sidan
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('data-target'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  });
