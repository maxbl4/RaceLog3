package ru.racelog3.e2e_tests;

import org.openqa.selenium.WebDriver;

public class AuthSignInTest extends AuthBaseTest {
	private AuthSignInTest(WebDriver webDriver) {
		super(webDriver);
	}

	@Override
	protected void testBody() {
		clickElement(HEADER_ENTER_BUTTON);

		clickElement(createID(AUTH_CHANGE_MODE_LINK, "SI"));
		clickElement(createID(AUTH_CHANGE_MODE_LINK, "SU"));

		checkSignInPanelControls();

		typeText(createID(AUTH_EMAIL, "SI"), "valentino.rossi@yamaha.jp");
		typeText(createID(AUTH_PASSWORD, "SI"), "valerossi46");
		clickElement(createID(AUTH_SUBMIT_BUTTON, "SI"));

		checkProfilePanelControls();
		clickElement(PROFILE_LOGOUT_BUTTON);

		checkSignInPanelControls();
	}

	static void runTest(WebDriver webDriver) {
		new AuthSignInTest(webDriver).runTestImpl();
	}
}
