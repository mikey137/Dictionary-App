const findSubdirectory = (fileName) => {
    let subdirectory = ""

    if(fileName.slice(0,3) === "bix"){
        subdirectory = "bix"
    }

    if(fileName.slice(0,2) === "gg"){
        subdirectory = "gg"
    }

    if(fileName.slice(0,1).match(/[^A-Za-z]/)){
        subdirectory = "number"
    }

    if(fileName.slice(0,3) !== "bix" && fileName.slice(0,2) !== "gg" && fileName.slice(0,1).match(/[A-Za-z]/)){
        subdirectory = fileName.slice(0,1)
    }

    return subdirectory
}

const editQuoteString = (string) => {
    const newString = string.replaceAll(/{(.*?)}/g, "")

    return newString
}

export const functions = {
    findSubdirectory,
    editQuoteString
}