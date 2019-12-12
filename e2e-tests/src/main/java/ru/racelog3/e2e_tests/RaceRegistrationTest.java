package ru.racelog3.e2e_tests;

import org.openqa.selenium.WebDriver;

public class RaceRegistrationTest extends BaseTest {

	private RaceRegistrationTest(WebDriver webDriver) {
		super(webDriver);
	}

	@Override
	protected void testBody() {
		String registrationPanelHeader = "Войдите для регистрации";
		checkRaceInfoState("Grand Prix of France", registrationPanelHeader);
		checkRaceInfoState("Grand Prix of Catalunya", registrationPanelHeader);
		checkRaceInfoState("Grand Prix of Germany", registrationPanelHeader);

		login();
		backToHomePage();

		registrationPanelHeader = "Создайте профиль для регистрации";
		checkRaceInfoState("Grand Prix of France", registrationPanelHeader);
		checkRaceInfoState("Grand Prix of Catalunya", registrationPanelHeader);
		checkRaceInfoState("Grand Prix of Germany", registrationPanelHeader);
		
		// create 2 profiles
		// register first one in France
		// register second one in Spain
		// check correct registration
		// - France has only first profile
		// - Spain has only second profile
		// - Germany does not have registered profiles
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
