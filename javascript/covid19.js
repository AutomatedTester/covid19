ENDPOINT = "https://api.coronavirus.data.gov.uk/v1/data"

AREA_TYPE = "nation"
AREA_NAME = "england"

let filters = [
    `areaType=${AREA_TYPE}`,
    `areaName=${AREA_NAME}`
]

let structure = {
    "date": "date",
    "name": "areaName",
    "code": "areaCode",
    "covidOccupiedMVBeds": "covidOccupiedMVBeds",
    "hospitalCases": "hospitalCases",
    "casesDaily": "newCasesByPublishDate",
    "casesBySpecimenDate": "newCasesBySpecimenDate",
    "deathsDaily": "newDeathsByDeathDate",
    "deathsCumulative": "cumDeathsByDeathDate",
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
