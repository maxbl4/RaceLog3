package ru.racelog3.e2e_tests;

import org.openqa.selenium.WebDriver;

public class MainPageTest extends BaseTest {

	public MainPageTest(WebDriver webDriver) {
		super(webDriver);
		// TODO Auto-generated constructor stub
	}

	@Override
	protected void testBody() {
		checkText(createID(RACE_ITEM_CARD_NAME, "Grand Prix of France"), "Grand Prix of France",
				"Check the race in France");
		checkText(createID(RACE_ITEM_CARD_NAME, "Grand Prix of Catalunya"), "Grand Prix of Catalunya",
				"Check the race in Catalunya");
		checkText(createID(RACE_ITEM_CARD_NAME, "Grand Prix of Germany"), "Grand Prix of Germany",
				"Check the race in Germany");
		checkText(createID(RACE_ITEM_CARD_NAME, "Grand Prix of Great Britain"), "Grand Prix of Great Britain",
				"Check the race in Great Britain");

		checkText(HEADER_ENTER_BUTTON, "ВОЙТИ", "Check Enter button");

		clickElement(HEADER_MENU_BUTTON);
		sleep();
		checkText(createID(LIST_ITEM_HOME_BUTTON, "label"), "Домой", "Check Home button");
		checkText(createID(LIST_ITEM_ENTER_BUTTON, "label"), "Войти", "Check Enter button");

		clickElement(LIST_ITEM_ENTER_BUTTON);

		typeText(createID(AUTH_EMAIL, "SI"), "valentino.rossi@yamaha.jp");
		typeText(createID(AUTH_PASSWORD, "SI"), "valerossi46");
		clickElement(createID(AUTH_SUBMIT_BUTTON, "SI"));

		clickElement(HEADER_MENU_BUTTON);
		sleep();
		checkText(createID(LIST_ITEM_HOME_BUTTON, "label"), "Домой", "Check Home button");
		checkText(createID(LIST_ITEM_ACCOUNT_BUTTON, "label"), "Профиль", "Check Account button");
	}

	public static void runTest(WebDriver webDriver) {
		new MainPageTest(webDriver).runTestImpl();
	}

}
