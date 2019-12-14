package ru.racelog3.e2e_tests;

import org.openqa.selenium.WebDriver;

public class AuthSignUpTest extends AuthBaseTest {

	private AuthSignUpTest(WebDriver webDriver) {
		super(webDriver);
	}

	@Override
	protected void testBody() {
		step("Go to Sign Un page");
		clickElement(HEADER_ENTER_BUTTON);

		step("Switch to Sign In page and back");
		clickElement(createID(AUTH_CHANGE_MODE_LINK, "SI"));
		clickElement(createID(AUTH_CHANGE_MODE_LINK, "SU"));
		clickElement(createID(AUTH_CHANGE_MODE_LINK, "SI"));

		step("Check contols of Sign Up page");
		checkSignUpPanelControls();

		step("Type name, email and password. Submit");
		typeText(createID(AUTH_EMAIL, "SU"), "valentino.rossi@yamaha.jp");
		typeText(createID(AUTH_PASSWORD, "SU"), "valerossi46");
		typeText(createID(AUTH_NAME, "SU"), "Valentino Rossi");
		clickElement(createID(AUTH_SUBMIT_BUTTON, "SU"));

		step("Check profile deatails");
		checkProfilePanelControls();
		step("Log out");
		clickElement(PROFILE_LOGOUT_BUTTON);

		step("Check contols of Sign In page");
		checkSignInPanelControls();
	}

	static void runTest(WebDriver webDriver) {
		new AuthSignUpTest(webDriver).runTestImpl();
	}

}
