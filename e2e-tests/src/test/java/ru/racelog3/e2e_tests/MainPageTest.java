package ru.racelog3.e2e_tests;

public class MainPageTest extends BaseTest {

	@Override
	protected void testBody() {
		step("Check race cards");
		checkText(createID(RACE_ITEM_CARD_NAME, RACE_1_NAME), RACE_1_NAME, "Check the race in France");
		checkText(createID(RACE_ITEM_CARD_NAME, RACE_2_NAME), RACE_2_NAME, "Check the race in Catalunya");
		checkText(createID(RACE_ITEM_CARD_NAME, RACE_3_NAME), RACE_3_NAME, "Check the race in Germany");
		checkText(createID(RACE_ITEM_CARD_NAME, RACE_4_NAME), RACE_4_NAME, "Check the race in Great Britain");

		step("Check Enter button");
		checkText(HEADER_ENTER_BUTTON, "ВОЙТИ", "Check Enter button");

		step("Check Drawer panel with Home and Enter buttons");
		clickElement(HEADER_MENU_BUTTON);
		sleep();
		checkText(createID(LIST_ITEM_HOME_BUTTON, "label"), "Домой", "Check Home button");
		checkText(createID(LIST_ITEM_ENTER_BUTTON, "label"), "Войти", "Check Enter button");

		step("Log in");
		clickElement(LIST_ITEM_ENTER_BUTTON);

		typeText(createID(AUTH_EMAIL, "SI"), "valentino.rossi@yamaha.jp");
		typeText(createID(AUTH_PASSWORD, "SI"), "valerossi46");
		clickElement(createID(AUTH_SUBMIT_BUTTON, "SI"));

		step("Check Drawer panel with Home and Account buttons");
		clickElement(HEADER_MENU_BUTTON);
		sleep();
		checkText(createID(LIST_ITEM_HOME_BUTTON, "label"), "Домой", "Check Home button");
		checkText(createID(LIST_ITEM_ACCOUNT_BUTTON, "label"), "Профиль", "Check Account button");
	}

}
