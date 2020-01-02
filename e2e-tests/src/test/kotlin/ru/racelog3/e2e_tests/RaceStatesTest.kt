package ru.racelog3.e2e_tests

private const val RESULTS_TABLE_XPATH_HEADER_POSITION = "./thead/tr/th[1]"
private const val RESULTS_TABLE_XPATH_HEADER_NAME = "./thead/tr/th[2]"
private const val RESULTS_TABLE_XPATH_HEADER_NUMBER = "./thead/tr/th[3]"
private const val RESULTS_TABLE_XPATH_HEADER_TIME = "./thead/tr/th[4]"
private const val RESULTS_TABLE_XPATH_HEADER_LAPS = "./thead/tr/th[5]"

private const val RESULTS_TABLE_XPATH_ROW = "./tbody/tr[%d]/th"

class RaceStatesTest : RaceBaseTest() {
    override fun testBody() {
        step("Check each race info page before test")
        val registrationPanelHeader = "Войдите для регистрации"
        checkRaceInfoState(RACE_1_NAME, registrationPanelHeader)
        checkRaceInfoState(RACE_2_NAME, registrationPanelHeader)

        step("Login and back to home page")
        login()
        backToHomePage()

        step("Register 2 new racer profiles")
        goToProfilePageAndExpandProfiles()
        addRacerProfile(RACER_1_NAME, RACER_1_BIKE_NUMBER, "1")
        addRacerProfile(RACER_2_NAME, RACER_2_BIKE_NUMBER, "2")

        step("Register racer profiles on particular races")
        registerRacer(RACE_1_NAME, RACER_1_NAME)
        registerRacer(RACE_1_NAME, RACER_2_NAME)

        step("Check registration")
        checkRegistration(RACE_1_NAME, arrayOf(RACER_1_NAME, RACER_2_NAME), arrayOf(RACER_1_BIKE_NUMBER, RACER_2_BIKE_NUMBER))
        checkRegistration(RACE_2_NAME, arrayOf(), arrayOf(), false)

        step("Start the race and check the results")
        changeRaceState(RACE_1_NAME, "Началась")
        checkStartedRace(RACE_1_NAME)
        checkNotStartedRace(RACE_2_NAME)

        step("Stop the race and check the results")
        changeRaceState(RACE_1_NAME, "Остановлена")
        checkStartedRace(RACE_1_NAME)
        checkNotStartedRace(RACE_2_NAME)

        step("End the race and check the results")
        changeRaceState(RACE_1_NAME, "Закончена")
        checkStartedRace(RACE_1_NAME)
        checkNotStartedRace(RACE_2_NAME)

        step("Initiate the race and check the results")
        changeRaceState(RACE_1_NAME, "Не началась")
        checkNotStartedRace(RACE_1_NAME)
        checkNotStartedRace(RACE_2_NAME)
    }

    private fun changeRaceState(raceName: String, raceState: String) {
        goToProfilePage()
        clickElement(ADMIN_RACE_INFO_EXPAND_BUTTON)

        selectDropdownOption(ADMIN_RACE_INFO_NAME_COMBO, raceName)
        selectDropdownOption(ADMIN_RACE_INFO_STATE_COMBO, raceState)
        clickElement(ADMIN_RACE_INFO_SUBMIT_BUTTON)

//        checkText(ALERT_HEADER, "Состояние гонки", "Check update race state alert header")
//        checkText(ALERT_CONTENT, "Состояние изменено на $raceState", "Check update race state alert content")
    }

    private fun checkRaceResults(raceName: String, raceStarted: Boolean) {
        backToHomePage()
        clickElement(createID(RACE_ITEM_CARD_MORE_BUTTON, raceName))

        if (raceStarted) {
            checkText(RACE_REGISTRATION_LIST_HEADER, "Регистрация закончена", "Check unregistered text in racer profile section")
            checkText(RACE_RESULTS_HEADER, "Результаты", "Check disabled text for results section")

            clickElement(RACE_RESULTS_EXPAND_BUTTON)

            checkResultsTableHeader("Position", RESULTS_TABLE_XPATH_HEADER_POSITION, "#")
            checkResultsTableHeader("FIO", RESULTS_TABLE_XPATH_HEADER_NAME, "ФИО")
            checkResultsTableHeader("Number", RESULTS_TABLE_XPATH_HEADER_NUMBER, "Номер")
            checkResultsTableHeader("Time", RESULTS_TABLE_XPATH_HEADER_TIME, "Время")
            checkResultsTableHeader("Laps", RESULTS_TABLE_XPATH_HEADER_LAPS, "Круги")

            nestedElementExists(RACE_RESULTS_TABLE, String.format(RESULTS_TABLE_XPATH_ROW, 1))
            nestedElementExists(RACE_RESULTS_TABLE, String.format(RESULTS_TABLE_XPATH_ROW, 2))
        } else {
            checkText(RACE_REGISTRATION_LIST_HEADER, "Регистрация", "Check unregistered text in racer profile section")
            checkText(RACE_RESULTS_HEADER, "Результаты недоступны. Гонка не началась", "Check disabled text for results section")
        }
    }

    private fun checkResultsTableHeader(name: String, xpath: String, value: String) {
        substep("Check header $name")
        checkNestedElementTextByXPath(RACE_RESULTS_TABLE, xpath, value, "Check table header '$value'")
    }

    private fun checkStartedRace(raceName: String) {
        checkRaceResults(raceName, true)
    }

    private fun checkNotStartedRace(raceName: String) {
        checkRaceResults(raceName, false)
    }
}