package ru.racelog3.e2e_tests

abstract class RaceBaseTest : BaseTest() {
    protected val RACER_1_NAME = "ValeRoss"
    protected val RACER_1_BIKE_NUMBER = "46"
    protected val RACER_2_NAME = "RossVale"
    protected val RACER_2_BIKE_NUMBER = "64"

    private val PARTICIPANTS_TABLE_XPATH_HEADER_NAME = "./thead/tr/th[1]"
    private val PARTICIPANTS_TABLE_XPATH_HEADER_BIKE_NUMBER = "./thead/tr/th[2]"
    private val PARTICIPANTS_TABLE_XPATH_NAME = "./tbody/tr[%d]/th"
    private val PARTICIPANTS_TABLE_XPATH_BIKE_NUMBER = "./tbody/tr[%d]/td"

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
        checkText(RACE_RESULTS_HEADER, "Результаты недоступны. Гонка не началась",
                "Check disabled text for results section")
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

    protected fun checkRegistration(raceName: String, racerNames: Array<String>, racerBikeNumbers: Array<String>) {
        checkRegistration(raceName, racerNames, racerBikeNumbers, true)
    }

    protected fun checkRegistration(raceName: String, racerNames: Array<String>, racerBikeNumbers: Array<String>,
                                    profilesExist: Boolean) {
        backToHomePage()
        clickElement(createID(RACE_ITEM_CARD_MORE_BUTTON, raceName))
        clickElement(RACE_PARTICIPANTS_LIST_EXPAND_BUTTON)
        if (profilesExist) {
            clickElement(RACE_REGISTRATION_LIST_EXPAND_BUTTON)
        }
        substep("Check participants table")
        substep("Check header FIO")
        checkNestedElementTextByXPath(RACE_PARTICIPANTS_LIST_TABLE, PARTICIPANTS_TABLE_XPATH_HEADER_NAME, "ФИО",
                "Check table header 'FIO'")
        substep("Check header Bike number")
        checkNestedElementTextByXPath(RACE_PARTICIPANTS_LIST_TABLE, PARTICIPANTS_TABLE_XPATH_HEADER_BIKE_NUMBER,
                "Номер байка", "Check table header 'Bike number'")
        if (racerNames.isEmpty()) {
            substep("Check the emptyness of the participants' table")
            nestedElementDoesNotExist(RACE_PARTICIPANTS_LIST_TABLE, String.format(PARTICIPANTS_TABLE_XPATH_NAME, 1))
        } else {
            for (i in racerNames.indices) {
                substep(String.format("Check racer '%s', '%s'", racerNames[i], racerBikeNumbers[i]))
                checkNestedElementTextByXPath(RACE_PARTICIPANTS_LIST_TABLE, String.format(PARTICIPANTS_TABLE_XPATH_NAME, i + 1), racerNames[i], String.format("Check racer with name='%s'", racerNames[i]))
                checkNestedElementTextByXPath(RACE_PARTICIPANTS_LIST_TABLE, String.format(PARTICIPANTS_TABLE_XPATH_BIKE_NUMBER, i + 1), racerBikeNumbers[i], String.format("Check racer with bike number='%s'", racerBikeNumbers[i]))
            }
        }
        if (racerNames.isNotEmpty()) {
            for (name in racerNames) {
                checkSelected(createID(RACE_REGISTRATION_LIST_PROFILE_ITEM, name), true)
            }
        }
    }
}