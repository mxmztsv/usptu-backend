const getExperienceByHiringDate = (hiringDateString) => {
    const hiringDate = Date.parse(hiringDateString)
    const now = new Date()

    const experienceInYears = Math.floor((now - hiringDate) / (1000 * 60 * 60 * 24 * 365))

    if (experienceInYears >= 1) {
        return experienceInYears
    } else return 0
}

module.exports = {getExperienceByHiringDate}
