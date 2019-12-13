package ru.racelog3.e2e_tests;

import org.openqa.selenium.WebDriver;

public class RaceRegistrationTest extends BaseTest {

	private static final String RACER_1_NAME = "ValeRoss";
	private static final String RACER_1_BIKE_NUMBER = "46";
	private static final String RACER_2_NAME = "RossVale";
	private static final String RACER_2_BIKE_NUMBER = "64";

	private RaceRegistrationTest(WebDriver webDriver) {
		super(webDriver);
	}

	@Override
	protected void testBody() {
		String registrationPanelHeader = "Войдите для регистрации";
		checkRaceInfoState(RACE_1_NAME, registrationPanelHeader);
		checkRaceInfoState(RACE_2_NAME, registrationPanelHeader);
		checkRaceInfoState("Grand Prix of Germany", registrationPanelHeader);

		login();
		backToHomePage();

		registrationPanelHeader = "Создайте профиль для регистрации";
		checkRaceInfoState(RACE_1_NAME, registrationPanelHeader);
		checkRaceInfoState(RACE_2_NAME, registrationPanelHeader);
		checkRaceInfoState(RACE_3_NAME, registrationPanelHeader);

		goToProfilePage();
		clickElement(RACER_PROFILES_LIST_EXPAND_BUTTON);
		addRacerProfile(RACER_1_NAME, RACER_1_BIKE_NUMBER, "1");
		addRacerProfile(RACER_2_NAME, RACER_2_BIKE_NUMBER, "2");

		registerRacer(RACE_1_NAME, RACER_1_NAME);
		registerRacer(RACE_2_NAME, RACER_2_NAME);
		registerRacer(RACE_3_NAME, RACER_1_NAME);
		registerRacer(RACE_3_NAME, RACER_2_NAME);

		checkRegistration(RACE_1_NAME, new String[] { RACER_1_NAME }, new String[] { RACER_1_BIKE_NUMBER });
		checkRegistration(RACE_2_NAME, new String[] { RACER_2_NAME }, new String[] { RACER_2_BIKE_NUMBER });
		checkRegistration(RACE_3_NAME, new String[] { RACER_1_NAME, RACER_2_NAME },
				new String[] { RACER_1_BIKE_NUMBER, RACER_2_BIKE_NUMBER });
		checkRegistration(RACE_4_NAME, new String[] {}, new String[] {});

		// rename first profile and check
		// - France has renamed profile
		// - Spain has old registered profile
		// - Germany does not have registered profiles
		// delete first profile and check
		// - France does not have registered profiles
		// - Spain has only second profile
		// - Germany does not have registered profiles
		// delete second profile and check
		// - France does not have registered profiles
		// - Spain does not have registered profiles
		// - Germany does not have registered profiles
	}

	private void checkRegistration(String raceName, String[] racerNames, String[] racerBikeNumbers) {
		backToHomePage();
		clickElement(createID(RACE_ITEM_CARD_MORE_BUTTON, raceName));

		clickElement(RACE_PARTICIPANTS_LIST_EXPAND_BUTTON);
		clickElement(RACE_REGISTRATION_LIST_EXPAND_BUTTON);

		// TODO check corresponding checkbox
		// TODO check racer's table
	}

	private void registerRacer(String raceName, String racerName) {
		backToHomePage();
		clickElement(createID(RACE_ITEM_CARD_MORE_BUTTON, raceName));

		clickElement(RACE_PARTICIPANTS_LIST_EXPAND_BUTTON);
		clickElement(RACE_REGISTRATION_LIST_EXPAND_BUTTON);
		sleep();

		clickElement(createID(RACE_REGISTRATION_LIST_PROFILE_ITEM, racerName));
		clickElement(RACE_REGISTRATION_LIST_SUBMIT_BUTTON);

		checkText(ALERT_HEADER, "Регистрация на гонку", "Check update registration alert header");
		checkText(ALERT_CONTENT, "Регистрация прошла успешно", "Check update registration alert content");
	}

	private void addRacerProfile(String name, String bikeNumber, String order) {
		typeText(createID(RACER_PROFILE_NAME, order), name);
		typeText(createID(RACER_PROFILE_BIKE_NUMBER, order), bikeNumber);
		clickElement(createID(RACER_PROFILE_ADD_REMOVE_BUTTON, order));

		clickElement(RACER_PROFILES_LIST_SUBMIT_BUTTON);

		checkText(ALERT_HEADER, "Профили гонщика", "Check update racer profile alert header");
		checkText(ALERT_CONTENT, "Данные успешно обновлены", "Check update racer profile alert content");
	}

	private void login() {
		clickElement(HEADER_ENTER_BUTTON);
		typeText(createID(AUTH_EMAIL, "SI"), "valentino.rossi@yamaha.jp");
		typeText(createID(AUTH_PASSWORD, "SI"), "valerossi46");
		clickElement(createID(AUTH_SUBMIT_BUTTON, "SI"));
	}

	private void checkRaceInfoState(String raceName, String registrationPanelHeader) {
		clickElement(createID(RACE_ITEM_CARD_MORE_BUTTON, raceName));
		checkElement(RACE_PARTICIPANTS_LIST_EXPAND_BUTTON);
		checkText(RACE_PARTICIPANTS_LIST_EXPAND_BUTTON, "Участники", "Check text in participants section");
		checkText(RACE_REGISTRATION_LIST_HEADER, registrationPanelHeader,
				"Check unregistered text in racer profile section");

		backToHomePage();
	}

	static void runTest(WebDriver webDriver) {
		new RaceRegistrationTest(webDriver).runTestImpl();
	}

}
