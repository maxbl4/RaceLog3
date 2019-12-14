package ru.racelog3.e2e_tests;

import org.openqa.selenium.WebDriver;

public class RaceInfoTest extends BaseTest {

	private RaceInfoTest(WebDriver webDriver) {
		super(webDriver);
	}

	@Override
	protected void testBody() {
		String raceName = RACE_1_NAME;

		step("Check race card on the main page and click on it");
		checkText(createID(RACE_ITEM_CARD_NAME, raceName), raceName, "Check the race's name in card");
		checkText(createID(RACE_ITEM_CARD_DATE, raceName), "17.05.2019", "Check the race's date in card");
		clickElement(createID(RACE_ITEM_CARD_MORE_BUTTON, raceName));

		step("Check race info (name, date, location and description) on the Race page");
		checkText(RACE_ITEM_INFO_NAME, raceName, "Check the race's name on the page");
		checkText(RACE_ITEM_INFO_DATE_LOCATION, "Le Mans, France, 17.05.2019",
				"Check the race's date and location on the page");
		checkText(RACE_ITEM_INFO_DESCR, "Description for Grand Prix of France.",
				"Check the race's description on the page");

		step("Check race participants and registration sections");
		checkElement(RACE_PARTICIPANTS_LIST_EXPAND_BUTTON);
		checkElement(RACE_REGISTRATION_LIST_EXPAND_BUTTON);
	}

	static void runTest(WebDriver webDriver) {
		new RaceInfoTest(webDriver).runTestImpl();
	}

}
