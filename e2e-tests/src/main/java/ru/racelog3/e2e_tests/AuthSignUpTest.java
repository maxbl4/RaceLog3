package ru.racelog3.e2e_tests;

import org.openqa.selenium.WebDriver;

public class AuthSignUpTest extends BaseTest {

	private AuthSignUpTest(WebDriver webDriver) {
		super(webDriver);
	}

	@Override
	protected void testBody() {
		clickElement("headerEnterButtonID");
		
		clickElement("authChangeModeLinkID_SI");
		
		checkText("authModeLabelID_SU", "Зарегистрироваться", "Check the label of Auth form for Sign Up");
		checkText("authSubmitButtonID_SU", "ДАВИ НА ГАЗ!!!", "Check the submit button of Auth form for Sign Up");
		checkText("authChangeModeLinkID_SU", "Есть аккаунт? Войти", "Check the change link label of Auth form for Sign Up");
		
		typeText("authEmailID_SU", "valentino.rossi@yamaha.jp");
		typeText("authPasswordID_SU", "valerossi46");
		typeText("authNameID_SU", "Valentino Rossi");
		clickElement("authSubmitButtonID_SU");
		
		checkText("profileNameID", "Valentino Rossi", "Check the user's name on Profile page");
		checkText("profileEmailID", "valentino.rossi@yamaha.jp", "Check the user's email on Profile page");
		checkText("profileRoleID", "Пользователь", "Check the user's role on Profile page");
		clickElement("profileLogoutButtonID");
		
		checkText("authModeLabelID_SI", "Войти", "Check the label of Auth form for Sign In");
		checkText("authSubmitButtonID_SI", "ДАВИ НА ГАЗ!!!", "Check the submit button of Auth form for Sign In");
		checkText("authChangeModeLinkID_SI", "Нет аккаунта? Создать", "Check the change link label of Auth form for Sign In");
	}

	public static void runTest(WebDriver webDriver) {
		new AuthSignUpTest(webDriver).runTestImpl();
	}

}
