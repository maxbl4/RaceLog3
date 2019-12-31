package ru.racelog3.e2e_tests

abstract class RaceBaseTest : BaseTest() {
    protected fun goToProfilePageAndExpandProfiles() {
        goToProfilePage()
        clickElement(RACER_PROFILES_LIST_EXPAND_BUTTON)
    }

    protected fun addRacerProfile(name: String, bikeNumber: String, order: String) {
        substep(String.format("Add racer profile: name='%s', bike number='%s'", name, bikeNumber))
        typeText(createID(RACER_PROFILE_NAME, order), name)
        typeText(createID(RACER_PROFILE_BIKE_NUMBER, order), bikeNumber)
        clickElement(createID(RACER_PROFILE_ADD_REMOVE_BUTTON, order))
        pressUpdateAndCheckProfiles()
    }

    protected fun renameRacerProfile(name: String, bikeNumber: String, newName: String, newBikeNumber: String) {
        substep(String.format("Rename racer profile FROM name='%s', bike number='%s' TO  name='%s', bike number='%s'",
                name, bikeNumber, newName, newBikeNumber))
        typeText(createID(RACER_PROFILE_NAME, createID(name, bikeNumber)), newName)
        typeText(createID(RACER_PROFILE_BIKE_NUMBER, createID(name, bikeNumber)), newBikeNumber)
        pressUpdateAndCheckProfiles()
    }

    protected fun deleteRacerProfile(name: String, bikeNumber: String) {
        substep(String.format("Delete racer profile: name='%s', bike number='%s'", name, bikeNumber))
        clickElement(createID(RACER_PROFILE_ADD_REMOVE_BUTTON, createID(name, bikeNumber)))
        pressUpdateAndCheckProfiles()
    }

    private fun pressUpdateAndCheckProfiles() {
        clickElement(RACER_PROFILES_LIST_SUBMIT_BUTTON)
        checkText(ALERT_HEADER, "Профили гонщика", "Check update racer profile alert header")
        checkText(ALERT_CONTENT, "Данные успешно обновлены", "Check update racer profile alert content")
    }

    protected fun login() {
        clickElement(HEADER_ENTER_BUTTON)
        typeText(createID(AUTH_EMAIL, "SI"), "valentino.rossi@yamaha.jp")
        typeText(createID(AUTH_PASSWORD, "SI"), "valerossi46")
        clickElement(createID(AUTH_SUBMIT_BUTTON, "SI"))
    }

    protected fun checkRaceInfoState(raceName: String, registrationPanelHeader: String) {
        substep("Check information for the race=$raceName")
        clickElement(createID(RACE_ITEM_CARD_MORE_BUTTON, raceName))
        checkElement(RACE_PARTICIPANTS_LIST_EXPAND_BUTTON)
        checkText(RACE_PARTICIPANTS_LIST_EXPAND_BUTTON, "Участники", "Check text in participants section")
        checkText(RACE_REGISTRATION_LIST_HEADER, registrationPanelHeader,
                "Check unregistered text in racer profile section")
        backToHomePage()
    }

    protected fun registerRacer(raceName: String, racerName: String) {
        substep(String.format("Register racer profile: race name='%s', racer name='%s'", raceName, racerName))
        backToHomePage()
        clickElement(createID(RACE_ITEM_CARD_MORE_BUTTON, raceName))
        clickElement(RACE_PARTICIPANTS_LIST_EXPAND_BUTTON)
        clickElement(RACE_REGISTRATION_LIST_EXPAND_BUTTON)
        clickElement(createID(RACE_REGISTRATION_LIST_PROFILE_ITEM, racerName), false)
        clickElement(RACE_REGISTRATION_LIST_SUBMIT_BUTTON)
        //		checkText(ALERT_HEADER, "Регистрация на гонку", "Check update registration alert header");
//		checkText(ALERT_CONTENT, "Регистрация прошла успешно", "Check update registration alert content");
    }
}