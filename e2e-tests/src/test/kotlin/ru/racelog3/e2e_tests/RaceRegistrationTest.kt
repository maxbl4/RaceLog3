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

class RaceRegistrationTest : RaceBaseTest() {
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
        renameRacerProfile(RACER_1_NAME, RACER_1_BIKE_NUMBER, RACER_1_NAME_CHANGED, RACER_1_BIKE_NUMBER_CHANGED)
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