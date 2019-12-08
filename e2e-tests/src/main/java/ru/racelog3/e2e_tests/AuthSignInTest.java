package ru.racelog3.e2e_tests;

import org.openqa.selenium.WebDriver;

public class AuthSignInTest extends BaseTest {
	private AuthSignInTest(WebDriver webDriver) {
		super(webDriver);
	}
	
	@Override
	protected void testBody() {
		clickElement("headerEnterButtonID");
		
		checkSignInPanelControls();
		
		typeText("authEmailID_SI", "valentino.rossi@yamaha.jp");
		typeText("authPasswordID_SI", "valerossi46");
		clickElement("authSubmitButtonID_SI");
		
		checkText("profileNameID", "Valentino Rossi", "Check the user's name on Profile page");
		checkText("profileEmailID", "valentino.rossi@yamaha.jp", "Check the user's email on Profile page");
		checkText("profileRoleID", "Пользователь", "Check the user's role on Profile page");
		clickElement("profileLogoutButtonID");
		
		checkSignInPanelControls();
	}
	
	private void checkSignInPanelControls() {
		checkText("authModeLabelID_SI", "Войти", "Check the label of Auth form for Sign In");
		checkText("authSubmitButtonID_SI", "ДАВИ НА ГАЗ!!!", "Check the submit button of Auth form for Sign In");
		checkText("authChangeModeLinkID_SI", "Нет аккаунта? Создать", "Check the change link label of Auth form for Sign In");
	}
	
	public static void runTest(WebDriver webDriver) {
		new AuthSignInTest(webDriver).runTestImpl();
	}
}
