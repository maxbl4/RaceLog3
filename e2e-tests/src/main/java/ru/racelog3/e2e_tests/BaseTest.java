package ru.racelog3.e2e_tests;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;
import static org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated;

public abstract class BaseTest {

	private final static int EXCEPTION_TIMEOUT = 5; // in seconds
	
	protected final static String HEADER_ENTER_BUTTON = "headerEnterButtonID";
	protected final static String HEADER_ACCOUNT_BUTTON = "headerAccountButtonID";
	protected final static String LIST_ITEM_HOME_BUTTON = "listItemHomeButtonID";
	protected final static String LIST_ITEM_ENTER_BUTTON = "listItemEnterButtonID";
	protected final static String LIST_ITEM_ACCOUNT_BUTTON = "listItemAccountButtonID";
	protected final static String AUTH_MODE_LABEL = "authModeLabelID";
	protected final static String AUTH_NAME = "authNameID";
	protected final static String AUTH_PASSWORD = "authPasswordID";
	protected final static String AUTH_EMAIL = "authEmailID";
	protected final static String AUTH_SUBMIT_BUTTON = "authSubmitButtonID";
	protected final static String AUTH_CHANGE_MODE_LINK = "authChangeModeLinkID";
	protected final static String PROFILE_NAME = "profileNameID";
	protected final static String PROFILE_EMAIL = "profileEmailID";
	protected final static String PROFILE_ROLE = "profileRoleID";
	protected final static String PROFILE_LOGOUT_BUTTON = "profileLogoutButtonID";

	private WebDriver webDriver;
	private WebDriverWait wait;

	protected BaseTest(WebDriver webDriver) {
		this.webDriver = webDriver;
		wait = new WebDriverWait(webDriver, EXCEPTION_TIMEOUT);
	}

	protected WebDriver getDriver() {
		return webDriver;
	}

	protected void runTestImpl() {
		beforeTest();
		testBody();
		afterTest();
	}

	protected void beforeTest() {
		System.out.println("Start test for " + getTestName());
		getDriver().get("localhost:3000");
	}

	protected void afterTest() {
		System.out.println("End test for " + getTestName());
	}

	protected abstract void testBody();
	
	protected String getTestName() {
		return getClass().getSimpleName();
	}

	protected void clickElement(String fieldID) {
		WebElement element = wait.until(presenceOfElementLocated(By.id(fieldID)));
		Assert.assertTrue(element.isEnabled());
		element.click();
	}

	protected void checkText(String fieldID, String value, String assertText) {
		WebElement element = wait.until(presenceOfElementLocated(By.id(fieldID)));
		Assert.assertEquals(assertText, value, element.getText());
	}
	
	protected void typeText(String fieldID, String value) {
		WebElement element = wait.until(presenceOfElementLocated(By.id(fieldID)));
		Assert.assertTrue(element.isEnabled());
		element.sendKeys(value);;
	}

}
