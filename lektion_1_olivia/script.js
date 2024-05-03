const labels = [
    "Avesta", 
    "Borlänge", 
    "Falun", 
    "Hedemora", 
    "Ludvika", 
    "Säter", 
    "Mora"
];
const datasets = [
    {
    label: "Befolkning 2022", 
    data: [
            22932,
            52178,
            56881,
            15443,
            23664,
            10243,
            19536],
            backgroundColor: 'lightblue'  ,
            borderWidth: 2,
            borderColor: 'black', 
            hoverBorderWidth: 4

},

{
    label: "Befolkning 2023", 
    data: [
            22753,
            51735,
            59987,
            15345,
            26402,
            11243,
            20536],
            backgroundColor: 'pink'  ,
            borderWidth: 2,
            borderColor: 'black', 
            hoverBorderWidth: 4

}

];

const data = {
    labels, 
    datasets
};

console.log(data);

const config = {type: "bar", data}
const canvas = document.getElementById("myChart");
const myChart = new Chart(canvas, config);


const myChart2 = new Chart(
    document.getElementById("myChart2"),
{
    type: "line",
    data: {
        labels: [2022, 2023], 
        datasets: [
            {label: "Borlänge", data: [52178, 51735] ,
            borderColor: "pink"
        },
            {label: "Falun", data: [59818, 59986],
            borderColor: "black" }
        
    ]}, 
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Custom Chart Title',
                font: {size: 36, family: "Inter"}
    }  }



} });

const myChart3 = new Chart(
    document.getElementById("myChart3"),
{
    type: "bubble",
    data: {
        labels: [2022, 2023], 
        datasets: [
            {label: "Borlänge", data: [52178, 51735] ,
            borderColor: "pink"
        },
            {label: "Falun", data: [59818, 59986],
            borderColor: "black" }
        
    ]}, 
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Custom Chart Title',
                font: {size: 36, family: "Inter"},
                radius: 200
    }  }



} });