package ru.racelog3.e2e_tests

private const val RACER_1_NAME = "ValeRoss"
private const val RACER_1_BIKE_NUMBER = "46"
private const val RACER_2_NAME = "RossVale"
private const val RACER_2_BIKE_NUMBER = "64"
private const val RACER_1_NAME_CHANGED = "ValeRoss53"
private const val RACER_1_BIKE_NUMBER_CHANGED = "53"

private const val PARTICIPANTS_TABLE_XPATH_HEADER_NAME = "./thead/tr/th[1]"
private const val PARTICIPANTS_TABLE_XPATH_HEADER_BIKE_NUMBER = "./thead/tr/th[2]"
private const val PARTICIPANTS_TABLE_XPATH_NAME = "./tbody/tr[%d]/th"
private const val PARTICIPANTS_TABLE_XPATH_BIKE_NUMBER = "./tbody/tr[%d]/td"

class RaceRegistrationTest : BaseTest() {
    override fun testBody() {
        step("Check each race info page. Registration section should be disabled and has following header: 'Войдите для регистрации'")
        var registrationPanelHeader = "Войдите для регистрации"
        checkRaceInfoState(RACE_1_NAME, registrationPanelHeader)
        checkRaceInfoState(RACE_2_NAME, registrationPanelHeader)
        checkRaceInfoState(RACE_3_NAME, registrationPanelHeader)
        checkRaceInfoState(RACE_4_NAME, registrationPanelHeader)

        step("Login and back to home page")
        login()
        backToHomePage()

        step("Check each race info page. Registration section should be disabled and has following header: 'Создайте профиль для регистрации'")
        registrationPanelHeader = "Создайте профиль для регистрации"
        checkRaceInfoState(RACE_1_NAME, registrationPanelHeader)
        checkRaceInfoState(RACE_2_NAME, registrationPanelHeader)
        checkRaceInfoState(RACE_3_NAME, registrationPanelHeader)
        checkRaceInfoState(RACE_4_NAME, registrationPanelHeader)

        step("Register 2 new racer profiles")
        goToProfilePageAndExpandProfiles()
        addRacerProfile(RACER_1_NAME, RACER_1_BIKE_NUMBER, "1")
        addRacerProfile(RACER_2_NAME, RACER_2_BIKE_NUMBER, "2")

        step("Register racer profiles on particular races")
        registerRacer(RACE_1_NAME, RACER_1_NAME)
        registerRacer(RACE_2_NAME, RACER_2_NAME)
        registerRacer(RACE_3_NAME, RACER_1_NAME)
        registerRacer(RACE_3_NAME, RACER_2_NAME)

        step("Check registration")
        checkRegistration(RACE_1_NAME, arrayOf(RACER_1_NAME), arrayOf(RACER_1_BIKE_NUMBER))
        checkRegistration(RACE_2_NAME, arrayOf(RACER_2_NAME), arrayOf(RACER_2_BIKE_NUMBER))
        checkRegistration(RACE_3_NAME, arrayOf(RACER_1_NAME, RACER_2_NAME), arrayOf(RACER_1_BIKE_NUMBER, RACER_2_BIKE_NUMBER))
        checkRegistration(RACE_4_NAME, arrayOf(), arrayOf())

        step("Rename one racer profile and check registration")
        goToProfilePageAndExpandProfiles()
        renameRacerPrfile(RACER_1_NAME, RACER_1_BIKE_NUMBER, RACER_1_NAME_CHANGED, RACER_1_BIKE_NUMBER_CHANGED)
        checkRegistration(RACE_1_NAME, arrayOf(RACER_1_NAME_CHANGED), arrayOf(RACER_1_BIKE_NUMBER_CHANGED))
        checkRegistration(RACE_2_NAME, arrayOf(RACER_2_NAME), arrayOf(RACER_2_BIKE_NUMBER))
        checkRegistration(RACE_3_NAME, arrayOf(RACER_1_NAME_CHANGED, RACER_2_NAME), arrayOf(RACER_1_BIKE_NUMBER_CHANGED, RACER_2_BIKE_NUMBER))
        checkRegistration(RACE_4_NAME, arrayOf(), arrayOf())

        step("Delete one racer profile and check registration")
        goToProfilePageAndExpandProfiles()
        deleteRacerProfile(RACER_1_NAME_CHANGED, RACER_1_BIKE_NUMBER_CHANGED)
        checkRegistration(RACE_1_NAME, arrayOf(), arrayOf())
        checkRegistration(RACE_2_NAME, arrayOf(RACER_2_NAME), arrayOf(RACER_2_BIKE_NUMBER))
        checkRegistration(RACE_3_NAME, arrayOf(RACER_2_NAME), arrayOf(RACER_2_BIKE_NUMBER))
        checkRegistration(RACE_4_NAME, arrayOf(), arrayOf())

        step("Delete one racer profile and check registration")
        goToProfilePageAndExpandProfiles()
        deleteRacerProfile(RACER_2_NAME, RACER_2_BIKE_NUMBER)
        checkRegistration(RACE_1_NAME, arrayOf(), arrayOf(), false)
        checkRegistration(RACE_2_NAME, arrayOf(), arrayOf(), false)
        checkRegistration(RACE_3_NAME, arrayOf(), arrayOf(), false)
        checkRegistration(RACE_4_NAME, arrayOf(), arrayOf(), false)
    }

    private fun goToProfilePageAndExpandProfiles() {
        goToProfilePage()
        clickElement(RACER_PROFILES_LIST_EXPAND_BUTTON)
    }

    private fun checkRegistration(raceName: String, racerNames: Array<String>, racerBikeNumbers: Array<String>) {
        checkRegistration(raceName, racerNames, racerBikeNumbers, true)
    }

    private fun checkRegistration(raceName: String, racerNames: Array<String>, racerBikeNumbers: Array<String>,
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
        if (racerNames.size == 0) {
            substep("Check the emptyness of the participants' table")
            nestedElementDoesNotExist(RACE_PARTICIPANTS_LIST_TABLE, String.format(PARTICIPANTS_TABLE_XPATH_NAME, 1))
        } else {
            for (i in racerNames.indices) {
                substep(String.format("Check racer '%s', '%s'", racerNames[i], racerBikeNumbers[i]))
                checkNestedElementTextByXPath(RACE_PARTICIPANTS_LIST_TABLE, String.format(PARTICIPANTS_TABLE_XPATH_NAME, i + 1), racerNames[i], String.format("Check racer with name='%s'", racerNames[i]))
                checkNestedElementTextByXPath(RACE_PARTICIPANTS_LIST_TABLE, String.format(PARTICIPANTS_TABLE_XPATH_BIKE_NUMBER, i + 1), racerBikeNumbers[i], String.format("Check racer with bike number='%s'", racerBikeNumbers[i]))
            }
        }
        if (racerNames.size != 0) {
            for (name in racerNames) {
                checkSelected(createID(RACE_REGISTRATION_LIST_PROFILE_ITEM, name), true)
            }
        }
    }

    private fun registerRacer(raceName: String, racerName: String) {
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

    private fun addRacerProfile(name: String, bikeNumber: String, order: String) {
        substep(String.format("Add racer profile: name='%s', bike number='%s'", name, bikeNumber))
        typeText(createID(RACER_PROFILE_NAME, order), name)
        typeText(createID(RACER_PROFILE_BIKE_NUMBER, order), bikeNumber)
        clickElement(createID(RACER_PROFILE_ADD_REMOVE_BUTTON, order))
        pressUpdateAndCheckProfiles()
    }

    private fun renameRacerPrfile(name: String, bikeNumber: String, newName: String, newBikeNumber: String) {
        substep(String.format("Rename racer profile FROM name='%s', bike number='%s' TO  name='%s', bike number='%s'",
                name, bikeNumber, newName, newBikeNumber))
        typeText(createID(RACER_PROFILE_NAME, createID(name, bikeNumber)), newName)
        typeText(createID(RACER_PROFILE_BIKE_NUMBER, createID(name, bikeNumber)), newBikeNumber)
        pressUpdateAndCheckProfiles()
    }

    private fun deleteRacerProfile(name: String, bikeNumber: String) {
        substep(String.format("Delete racer profile: name='%s', bike number='%s'", name, bikeNumber))
        clickElement(createID(RACER_PROFILE_ADD_REMOVE_BUTTON, createID(name, bikeNumber)))
        pressUpdateAndCheckProfiles()
    }

    private fun pressUpdateAndCheckProfiles() {
        clickElement(RACER_PROFILES_LIST_SUBMIT_BUTTON)
        checkText(ALERT_HEADER, "Профили гонщика", "Check update racer profile alert header")
        checkText(ALERT_CONTENT, "Данные успешно обновлены", "Check update racer profile alert content")
    }

    private fun login() {
        clickElement(HEADER_ENTER_BUTTON)
        typeText(createID(AUTH_EMAIL, "SI"), "valentino.rossi@yamaha.jp")
        typeText(createID(AUTH_PASSWORD, "SI"), "valerossi46")
        clickElement(createID(AUTH_SUBMIT_BUTTON, "SI"))
    }

    private fun checkRaceInfoState(raceName: String, registrationPanelHeader: String) {
        substep("Check information for the race=$raceName")
        clickElement(createID(RACE_ITEM_CARD_MORE_BUTTON, raceName))
        checkElement(RACE_PARTICIPANTS_LIST_EXPAND_BUTTON)
        checkText(RACE_PARTICIPANTS_LIST_EXPAND_BUTTON, "Участники", "Check text in participants section")
        checkText(RACE_REGISTRATION_LIST_HEADER, registrationPanelHeader,
                "Check unregistered text in racer profile section")
        backToHomePage()
    }
}