package ru.racelog3.e2e_tests;

import static org.openqa.selenium.support.ui.ExpectedConditions.elementToBeClickable;
import static org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated;
import static org.openqa.selenium.support.ui.ExpectedConditions.presenceOfNestedElementLocatedBy;

import java.util.List;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

public abstract class BaseTest {

	private final static int EXCEPTION_TIMEOUT = 5; // in seconds
	
	protected final static String HEADER_ENTER_BUTTON = "headerEnterButtonID";
	protected final static String HEADER_ACCOUNT_BUTTON = "headerAccountButtonID";
	protected final static String HEADER_MENU_BUTTON = "headerMenuButtonID";
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
	protected final static String RACER_PROFILE_NAME = "racerProfileName";
	protected final static String RACER_PROFILE_BIKE_NUMBER = "racerProfileBikeNumber";
	protected final static String RACER_PROFILE_ADD_REMOVE_BUTTON = "racerProfileAddRemoveButton";
	protected final static String RACER_PROFILES_LIST_EXPAND_BUTTON = "racerProfilesListExpandButton";
	protected final static String RACER_PROFILES_LIST_SUBMIT_BUTTON = "racerProfilesListSubmitButton";
	protected final static String RACE_ITEM_CARD_NAME = "raceItemCardName";
	protected final static String RACE_ITEM_CARD_DATE = "raceItemCardDate";
	protected final static String RACE_ITEM_CARD_MORE_BUTTON = "raceItemCardMoreButton";
	protected final static String RACE_ITEM_INFO_NAME = "raceItemInfoName";
	protected final static String RACE_ITEM_INFO_DATE_LOCATION = "raceItemInfoDateLocationa";
	protected final static String RACE_ITEM_INFO_DESCR = "raceItemInfoDescr";
	protected final static String RACE_PARTICIPANTS_LIST_TABLE = "raceParticipantsListTable";
	protected final static String RACE_PARTICIPANTS_LIST_EXPAND_BUTTON = "raceParticipantsListExpandButton";
	protected final static String RACE_REGISTRATION_LIST_PROFILE_ITEM = "raceRegistrationListProfileItem";
	protected final static String RACE_REGISTRATION_LIST_HEADER = "raceRegistrationListHeader";
	protected final static String RACE_REGISTRATION_LIST_EXPAND_BUTTON = "raceRegistrationListExpandButton";
	protected final static String RACE_REGISTRATION_LIST_SUBMIT_BUTTON = "raceRegistrationListSubmitButton";
	protected final static String ALERT_HEADER = "alertHeader";
	protected final static String ALERT_CONTENT = "alertContent";
	
	protected final static String RACE_1_NAME = "Grand Prix of France";
	protected final static String RACE_2_NAME = "Grand Prix of Catalunya";
	protected final static String RACE_3_NAME = "Grand Prix of Germany";
	protected final static String RACE_4_NAME = "Grand Prix of Great Britain";

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
		System.out.println("Test: " + getTestName());
		getDriver().get("localhost:3000");
	}

	protected void afterTest() {
		// TODO
	}

	protected abstract void testBody();
	
	protected String getTestName() {
		return getClass().getSimpleName();
	}
	
	protected String createID(String fieldId, String postfix) {
		return fieldId + "_" + postfix;
	}
	
	protected void checkElement(String fieldID) {
		wait.until(presenceOfElementLocated(By.id(fieldID)));
	}
	
	protected void elementDoesNotExist(String fieldID) {
		List<WebElement> deleteLinks = getDriver().findElements(By.id(fieldID));
		Assert.assertTrue(deleteLinks.isEmpty());
	}
	
	protected void nestedElementDoesNotExist(String parentFieldID, String childXPath) {
		WebElement parentElement = wait.until(presenceOfElementLocated(By.id(parentFieldID)));
		WebElement childElement = null;
		try {
			childElement = wait.until(presenceOfNestedElementLocatedBy(parentElement, By.xpath(childXPath)));
		} catch (Exception e) {}
		Assert.assertTrue(childElement == null);
	}

	protected void clickElement(String fieldID, boolean waitClickable) {
		WebElement element = wait.until(presenceOfElementLocated(By.id(fieldID)));
		if (waitClickable) {
			element = wait.until(elementToBeClickable(element));
		}
		Assert.assertTrue(element.isEnabled());
		sleep();
		element.click();
	}
	
	protected void clickElement(String fieldID) {
		clickElement(fieldID, true);
	}

	protected void checkText(String fieldID, String value, String assertText) {
		WebElement element = wait.until(presenceOfElementLocated(By.id(fieldID)));
		Assert.assertEquals(assertText, value, element.getText());
	}
	
	protected void checkNestedElementTextByXPath(String parentFieldID, String childXPath, String value, String assertText) {
		WebElement parentElement = wait.until(presenceOfElementLocated(By.id(parentFieldID)));
		WebElement childElement = wait.until(presenceOfNestedElementLocatedBy(parentElement, By.xpath(childXPath)));
		Assert.assertEquals(assertText, value, childElement.getText());
	}
	
	protected void checkEnabled(String fieldID, boolean enabled) {
		WebElement element = wait.until(presenceOfElementLocated(By.id(fieldID)));
		if (enabled) {
			Assert.assertTrue(element.isEnabled());
		} else {
			Assert.assertFalse(element.isEnabled());
		}
	}
	
	protected void typeText(String fieldID, String value) {
		WebElement element = wait.until(presenceOfElementLocated(By.id(fieldID)));
		element = wait.until(elementToBeClickable(element));
		Assert.assertTrue(element.isEnabled());
		element.sendKeys(value);;
	}
	
	protected void backToHomePage() {
		selectHeaderSliderPanelButton(LIST_ITEM_HOME_BUTTON);
	}
	
	protected void goToProfilePage() {
		selectHeaderSliderPanelButton(LIST_ITEM_ACCOUNT_BUTTON);
	}
	
	private void selectHeaderSliderPanelButton(String buttonID) {
		clickElement(HEADER_MENU_BUTTON);
		sleep();
		clickElement(buttonID);
		sleep();
	}
	
	protected void sleep() {
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
	
	protected void step(String descr) {
		System.out.println("    " + descr);
	}
	
	protected void substep(String descr) {
		System.out.println("        " + descr);
	}

}
