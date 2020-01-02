package ru.racelog3.e2e_tests

private const val RACER_1_NAME_CHANGED = "ValeRoss53"
private const val RACER_1_BIKE_NUMBER_CHANGED = "53"

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
}