package ru.racelog3.e2e_tests;

import org.openqa.selenium.WebDriver;

public class AuthSignUpTest extends AuthBaseTest {

	private AuthSignUpTest(WebDriver webDriver) {
		super(webDriver);
	}

	@Override
	protected void testBody() {
		clickElement(HEADER_ENTER_BUTTON);

		clickElement(createID(AUTH_CHANGE_MODE_LINK, "SI"));
		clickElement(createID(AUTH_CHANGE_MODE_LINK, "SU"));
		clickElement(createID(AUTH_CHANGE_MODE_LINK, "SI"));

		checkSignUpPanelControls();

		typeText(createID(AUTH_EMAIL, "SU"), "valentino.rossi@yamaha.jp");
		typeText(createID(AUTH_PASSWORD, "SU"), "valerossi46");
		typeText(createID(AUTH_NAME, "SU"), "Valentino Rossi");
		clickElement(createID(AUTH_SUBMIT_BUTTON, "SU"));

		checkProfilePanelControls();
		clickElement(PROFILE_LOGOUT_BUTTON);

		checkSignInPanelControls();
	}

	static void runTest(WebDriver webDriver) {
		new AuthSignUpTest(webDriver).runTestImpl();
	}

}
