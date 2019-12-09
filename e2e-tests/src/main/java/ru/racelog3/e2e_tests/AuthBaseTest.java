package ru.racelog3.e2e_tests;

import org.openqa.selenium.WebDriver;

public abstract class AuthBaseTest extends BaseTest {

	public AuthBaseTest(WebDriver webDriver) {
		super(webDriver);
	}

	protected String createID(String fieldId, String postfix) {
		return fieldId + "_" + postfix;
	}

	protected void checkSignInPanelControls() {
		checkText(createID(AUTH_MODE_LABEL, "SI"), "Войти", "Check the label of Auth form for Sign In");
		checkText(createID(AUTH_SUBMIT_BUTTON, "SI"), "ДАВИ НА ГАЗ!!!",
				"Check the submit button of Auth form for Sign In");
		checkText(createID(AUTH_CHANGE_MODE_LINK, "SI"), "Нет аккаунта? Создать",
				"Check the change link label of Auth form for Sign In");
	}

	protected void checkSignUpPanelControls() {
		checkText(createID(AUTH_MODE_LABEL, "SU"), "Зарегистрироваться", "Check the label of Auth form for Sign Up");
		checkText(createID(AUTH_SUBMIT_BUTTON, "SU"), "ДАВИ НА ГАЗ!!!",
				"Check the submit button of Auth form for Sign Up");
		checkText(createID(AUTH_CHANGE_MODE_LINK, "SU"), "Есть аккаунт? Войти",
				"Check the change link label of Auth form for Sign Up");
	}

	protected void checkProfilePanelControls() {
		checkText(PROFILE_NAME, "Valentino Rossi", "Check the user's name on Profile page");
		checkText(PROFILE_EMAIL, "valentino.rossi@yamaha.jp", "Check the user's email on Profile page");
		checkText(PROFILE_ROLE, "Пользователь", "Check the user's role on Profile page");
		clickElement(RACER_PROFILES_LIST_EXPAND_BUTTON);
		checkText(createID(RACER_PROFILE_NAME, "1"), "", "Check the name of new racer profile");
		checkText(createID(RACER_PROFILE_BIKE_NUMBER, "1"), "", "Check the bike number of new racer profile");
	}

}
