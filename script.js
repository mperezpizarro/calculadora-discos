const form = document.querySelector("#discForm")
const output = document.querySelector("#result")

//Optic discs filesize in GB
const discSpace = {
    "cdr700": 0.7,
    "cdr900": 0.9,
    "dvd5": 4.7,
    "dvd9": 8.54,
    "bd1": 25,
    "bd2": 50
} 

//Optic disc name and size (for returning result)
const discName = {
    "cdr700": "CD-R de 700MB",
    "cdr900": "CD-R de 900MB",
    "dvd5": "DVD de 4,7GB",
    "dvd9": "DVD de 8,54GB",
    "bd1": "Blu-ray de 25GB",
    "bd2": "Blu-ray de 50GB"
}

//Converts KB and MB to GB 
function convertUnits(value, unit) {
    switch (unit) {
        case "kb":
            return parseFloat(value) / 1000000
            break;
        case "mb":
            return parseFloat(value) / 1000
            break;
        default:
            return parseFloat(value)
            break;
    }
}

function totalDiscs(value, disc) {
    let total = parseFloat(value) / parseFloat(discSpace[disc])
    let result = total !== 1 ? Math.trunc(total) + 1 : total
    return result
}

//Prevents page reload and returns result
function handleForm (e) {
    e.preventDefault()

    const formData = new FormData(form)

    let fileSize = formData.get("fileSize")
    let sizeUnit = formData.get("fileSizeUnit")
    let convertedSize = convertUnits(fileSize, sizeUnit)
    let discType = formData.get("disc")
    let discNum = totalDiscs(convertedSize, discType)
    output.textContent = `Necesitas ${discNum} ${discName[discType]}.`
}

form.addEventListener("submit", handleForm)
