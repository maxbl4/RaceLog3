package ru.racelog3.e2e_tests;

public class AuthSignInTest extends AuthBaseTest {

	@Override
	protected void testBody() {
		step("Go to Sign In page");
		clickElement(HEADER_ENTER_BUTTON);

		step("Switch to Sign Up page and back");
		clickElement(createID(AUTH_CHANGE_MODE_LINK, "SI"));
		clickElement(createID(AUTH_CHANGE_MODE_LINK, "SU"));

		step("Check contols of Sign In page");
		checkSignInPanelControls();

		step("Type email and password. Submit");
		typeText(createID(AUTH_EMAIL, "SI"), "valentino.rossi@yamaha.jp");
		typeText(createID(AUTH_PASSWORD, "SI"), "valerossi46");
		clickElement(createID(AUTH_SUBMIT_BUTTON, "SI"));

		step("Check profile deatails");
		checkProfilePanelControls();
		step("Log out");
		clickElement(PROFILE_LOGOUT_BUTTON);

		step("Check contols of Sign In page");
		checkSignInPanelControls();
	}

}
