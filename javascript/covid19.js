ENDPOINT = "https://api.coronavirus.data.gov.uk/v1/data"

AREA_TYPE = "nation"
AREA_NAME = "england"

let filters = [
    `areaType=${AREA_TYPE}`,
    `areaName=${AREA_NAME}`
]

let structure = {
    "date": "date",
    "casesBySpecimenDate": "newCasesBySpecimenDate",
    "covidOccupiedMVBeds": "covidOccupiedMVBeds",
    "hospitalCases": "hospitalCases",
    "casesDaily": "newCasesByPublishDate",
    "deathsDaily": "newDeathsByDeathDate",
}

let apiParams = {
    filters: filters.join(";"),
    structure: JSON.stringify(structure)
}

async function update() {

    let params = "";
    for (key in apiParams) {
        params += `${key}=${apiParams[key]}&`;
    }

    const response = await fetch(encodeURI(ENDPOINT + "?" + params));
    return response.json()
}

function generateGraph() {
    update().then(d => {
        let data = d.data;
        let dates = data.map(obj => {
            return obj.date;
        });

        lastDate = dates[0];
        document.getElementById("lastUpdated").innerText = `Last updated: ${lastDate}`;

        let deaths = data.map(obj => {
            return obj.deathsDaily;
        });

        let casesBySpecimenDate = data.map(obj => {
            return obj.casesBySpecimenDate;
        });

        let casesDaily = data.map(obj => {
            return obj.casesDaily;
        })

        let hospitalCases = data.map(obj => {
            return obj.hospitalCases;
        });

        let covidOccupiedMVBeds = data.map(obj => {
            return obj.covidOccupiedMVBeds;
        });

        let eatOutStart = [0, Math.max(...casesBySpecimenDate)]

        let layout = {
            title: 'England Covid Data',
            xaxis: {
                range: [dates[dates.length - 1], dates[0]],
                autorange: false
            },
            shapes: [
                {
                    name: "First Lockdown",
                    type: "line",
                    x0: '2020-03-23',
                    y0: 0,
                    x1: '2020-03-23',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Non-Essential Shops reopen",
                    type: "line",
                    x0: '2020-06-15',
                    y0: 0,
                    x1: '2020-06-15',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Super Saturday (Pub's and hairdressers reopen)",
                    type: "line",
                    x0: '2020-07-04',
                    y0: 0,
                    x1: '2020-07-04',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Eat out to help out starts",
                    type: "line",
                    x0: '2020-08-03',
                    y0: 0,
                    x1: '2020-08-03',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Indoor Events<br/>Close-contact beauty services",
                    type: "line",
                    x0: '2020-08-15',
                    y0: 0,
                    x1: '2020-08-15',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Eat out to help out ends",
                    type: "line",
                    x0: '2020-08-31',
                    y0: 0,
                    x1: '2020-08-31',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Schools Return",
                    type: "line",
                    x0: '2020-09-03',
                    y0: 0,
                    x1: '2020-09-03',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Second Lockdown Starts",
                    type: "line",
                    x0: '2020-11-05',
                    y0: 0,
                    x1: '2020-11-05',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Second Lockdown Ends",
                    type: "line",
                    x0: '2020-12-02',
                    y0: 0,
                    x1: '2020-12-02',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                }
            ],
            annotations: [
                {
                    x: "2020-03-23",
                    y: Math.max(...casesBySpecimenDate) - 10,
                    xref: 'x',
                    yref: 'y',
                    text: 'First Lockdown',
                    showarrow: true,
                    arrowhead: 7,
                    ax: 10,
                    ay: -40
                },
                {
                    x: "2020-06-15",
                    y: Math.max(...casesBySpecimenDate) - 10,
                    xref: 'x',
                    yref: 'y',
                    text: 'Non-essential shops reopen',
                    showarrow: true,
                    arrowhead: 7,
                    ax: 10,
                    ay: -30
                },
                {
                    x: "2020-07-04",
                    y: Math.max(...casesBySpecimenDate) - 10,
                    xref: 'x',
                    yref: 'y',
                    text: "Super Saturday <br>(Pub's and Hairdressers reopen)",
                    showarrow: true,
                    arrowhead: 7,
                    ax: -10,
                    ay: 40
                },
                {
                    x: "2020-08-03",
                    y: Math.max(...casesBySpecimenDate) - 10,
                    xref: 'x',
                    yref: 'y',
                    text: 'Eat out to help out starts',
                    showarrow: true,
                    arrowhead: 7,
                    ax: 10,
                    ay: -40
                },
                {
                    x: "2020-08-15",
                    y: Math.max(...casesBySpecimenDate) - 10,
                    xref: 'x',
                    yref: 'y',
                    text: 'Indoor Events <br> Close-contact beauty services',
                    showarrow: true,
                    arrowhead: 7,
                    ax: -30,
                    ay: 80
                },
                {
                    x: "2020-08-31",
                    y: Math.max(...casesBySpecimenDate) - 10,
                    xref: 'x',
                    yref: 'y',
                    text: 'Eat out to help out ends',
                    showarrow: true,
                    arrowhead: 7,
                    ax: 10,
                    ay: -20
                },
                {
                    x: "2020-09-03",
                    y: Math.max(...casesBySpecimenDate) - 10,
                    xref: 'x',
                    yref: 'y',
                    text: 'Schools Return',
                    showarrow: true,
                    arrowhead: 7,
                    ax: 10,
                    ay: 40
                },
                {
                    x: "2020-11-05",
                    y: Math.max(...casesBySpecimenDate) - 10,
                    xref: 'x',
                    yref: 'y',
                    text: 'Second lockdown Starts',
                    showarrow: true,
                    arrowhead: 7,
                    ax: 10,
                    ay: -40
                },
                {
                    x: "2020-12-02",
                    y: Math.max(...casesBySpecimenDate) - 10,
                    xref: 'x',
                    yref: 'y',
                    text: 'Second lockdown Ends',
                    showarrow: true,
                    arrowhead: 7,
                    ax: 20,
                    ay: -20
                }
            ]
        };

        let config = {
            responsive: true,
            scrollZoom: true,
        }

        let plot = [
            { x: dates, y: deaths, type: 'scatter', mode: "lines", name: "Deaths", fill: 'tozeroy' },
            { x: dates, y: casesBySpecimenDate, type: "scatter", mode: "lines", name: "Cases by Specimen date", fill: 'tozeroy' },
            { x: dates, y: casesDaily, type: "scatter", mode: "lines", name: "Cases Reported Daily", fill: "tozeroy" },
            { x: dates, y: hospitalCases, type: "scatter", mode: "lines", name: "Hospital Cases", fill: 'tozeroy' },
            { x: dates, y: covidOccupiedMVBeds, type: "scatter", mode: "lines", name: "Occupied ITU Bed", fill: 'tozeroy' }
        ];

        Plotly.newPlot('myDiv', plot, layout, config);

        let table = document.querySelector("table");
        let keys = Object.keys(data[0]);
        generateTableHead(table, keys);
        generateTable(table, data.slice(0, 7));
    });
}
