export const genderList = [
    {name: "Male", value: "male"},
    {name: "Female", value: "female"},
    {name: "All", value: ""}
]
export const natList = [
    'au', 'br', 'ca', 'ch', 'de', 'dk', 'es', 'fi', 'fr', 'gb', 'ie', 'ir', 'no', 'nl', 'nz', 'tr', 'us'
];


export const createUrlSearchParams = (data) => {
    const urlParams = new URLSearchParams()
    const activeFilterKeys = Object.keys(data).filter((key) => data[key])

    activeFilterKeys.forEach((key) => {
            if (data[key].length === 0) {
                urlParams.delete(key)
            } else {
                urlParams.set(key, data[key])
            }

        }
    )
    return urlParams
}