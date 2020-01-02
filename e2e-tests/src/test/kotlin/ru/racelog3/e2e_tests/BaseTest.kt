package ru.racelog3.e2e_tests

import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.openqa.selenium.By
import org.openqa.selenium.Keys
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.ie.InternetExplorerDriver
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.Select
import org.openqa.selenium.support.ui.WebDriverWait
import java.io.File
import java.net.URISyntaxException
import java.nio.file.Paths

private const val EXCEPTION_TIMEOUT = 5 // in seconds
private const val LONG_SLEEP_TIMEOUT: Long = 5000;

const val HEADER_ENTER_BUTTON = "headerEnterButtonID"
const val HEADER_ACCOUNT_BUTTON = "headerAccountButtonID"
const val HEADER_MENU_BUTTON = "headerMenuButtonID"
const val LIST_ITEM_HOME_BUTTON = "listItemHomeButtonID"
const val LIST_ITEM_ENTER_BUTTON = "listItemEnterButtonID"
const val LIST_ITEM_ACCOUNT_BUTTON = "listItemAccountButtonID"
const val AUTH_MODE_LABEL = "authModeLabelID"
const val AUTH_NAME = "authNameID"
const val AUTH_PASSWORD = "authPasswordID"
const val AUTH_EMAIL = "authEmailID"
const val AUTH_SUBMIT_BUTTON = "authSubmitButtonID"
const val AUTH_CHANGE_MODE_LINK = "authChangeModeLinkID"
const val PROFILE_NAME = "profileNameID"
const val PROFILE_EMAIL = "profileEmailID"
const val PROFILE_ROLE = "profileRoleID"
const val PROFILE_LOGOUT_BUTTON = "profileLogoutButtonID"
const val RACER_PROFILE_NAME = "racerProfileName"
const val RACER_PROFILE_BIKE_NUMBER = "racerProfileBikeNumber"
const val RACER_PROFILE_ADD_REMOVE_BUTTON = "racerProfileAddRemoveButton"
const val RACER_PROFILES_LIST_EXPAND_BUTTON = "racerProfilesListExpandButton"
const val RACER_PROFILES_LIST_SUBMIT_BUTTON = "racerProfilesListSubmitButton"
const val RACE_ITEM_CARD_NAME = "raceItemCardName"
const val RACE_ITEM_CARD_DATE = "raceItemCardDate"
const val RACE_ITEM_CARD_MORE_BUTTON = "raceItemCardMoreButton"
const val RACE_ITEM_INFO_NAME = "raceItemInfoName"
const val RACE_ITEM_INFO_DATE_LOCATION = "raceItemInfoDateLocationa"
const val RACE_ITEM_INFO_DESCR = "raceItemInfoDescr"
const val RACE_PARTICIPANTS_LIST_TABLE = "raceParticipantsListTable"
const val RACE_PARTICIPANTS_LIST_EXPAND_BUTTON = "raceParticipantsListExpandButton"
const val RACE_REGISTRATION_LIST_PROFILE_ITEM = "raceRegistrationListProfileItem"
const val RACE_REGISTRATION_LIST_HEADER = "raceRegistrationListHeader"
const val RACE_REGISTRATION_LIST_EXPAND_BUTTON = "raceRegistrationListExpandButton"
const val RACE_REGISTRATION_LIST_SUBMIT_BUTTON = "raceRegistrationListSubmitButton"
const val RACE_RESULTS_EXPAND_BUTTON = "raceResultsExpandButton";
const val RACE_RESULTS_HEADER = "raceResultsHeader";
const val RACE_RESULTS_TABLE = "raceResultsTable";
const val ADMIN_RACE_INFO_EXPAND_BUTTON = "adminRaceInfoExpandButton";
const val ADMIN_RACE_INFO_HEADER = "adminRaceInfoHeader";
const val ADMIN_RACE_INFO_NAME_COMBO = "adminRaceInfoNameCombo";
const val ADMIN_RACE_INFO_STATE_COMBO = "adminRaceInfoStateCombo";
const val ADMIN_RACE_INFO_SUBMIT_BUTTON = "adminRaceInfoSubminButton";
const val ALERT_HEADER = "alertHeader"
const val ALERT_CONTENT = "alertContent"

const val RACE_1_NAME = "Grand Prix of France"
const val RACE_2_NAME = "Grand Prix of Catalunya"
const val RACE_3_NAME = "Grand Prix of Germany"
const val RACE_4_NAME = "Grand Prix of Great Britain"

enum class Browser {
    CHROME, FIREFOX, IE
}

private fun resolveBrowser(): Browser {
    when (System.getProperty("racelog3.browser", "CHROME")) {
        "CHROME" -> return Browser.CHROME
        "FIREFOX" -> return Browser.FIREFOX
        "IE" -> return Browser.IE
    }
    return Browser.CHROME
}

abstract class BaseTest {

    private var driver: WebDriver? = null
    private var wait: WebDriverWait? = null

    @BeforeEach
    @Throws(URISyntaxException::class)
    fun initSelenium() {
        setProperties()
        driver = when (resolveBrowser()) {
            Browser.CHROME -> ChromeDriver()
            Browser.FIREFOX -> FirefoxDriver()
            Browser.IE -> InternetExplorerDriver()
        }
        wait = WebDriverWait(driver, EXCEPTION_TIMEOUT.toLong())
    }

    @AfterEach
    fun closeSelenium() {
        driver!!.quit()
        driver = null
        wait = null
    }

    @Throws(URISyntaxException::class)
    private fun setProperties() {
        val chromeURL = javaClass.classLoader.getResource("drivers" + File.separator + "chrome" + File.separator
                + "78.0.3904.105-win32" + File.separator + "chromedriver.exe")
        System.setProperty("webdriver.chrome.driver", Paths.get(chromeURL.toURI()).toFile().absolutePath)
        val firefoxURL = javaClass.classLoader.getResource("drivers" + File.separator + "mozilla" + File.separator
                + "0.26.0-win64" + File.separator + "geckodriver.exe")
        System.setProperty("webdriver.gecko.driver", Paths.get(firefoxURL.toURI()).toFile().absolutePath)
        val ieURL = javaClass.classLoader
                .getResource("drivers" + File.separator + "ie" + File.separator + "IEDriverServer.exe")
        System.setProperty("webdriver.ie.driver", Paths.get(ieURL.toURI()).toFile().absolutePath)
    }

    @Test
    fun runTestImpl() {
        beforeTest()
        testBody()
        afterTest()
    }

    protected fun beforeTest() {
        driver!!["localhost:3000"]
    }

    protected fun afterTest() { // TODO
    }

    protected abstract fun testBody()

    protected fun createID(fieldId: String, postfix: String): String {
        return fieldId + "_" + postfix
    }

    protected fun checkElement(fieldID: String?) {
        wait!!.until(ExpectedConditions.presenceOfElementLocated(By.id(fieldID)))
    }

    protected fun elementDoesNotExist(fieldID: String?) {
        val deleteLinks = driver!!.findElements(By.id(fieldID))
        Assertions.assertTrue(deleteLinks.isEmpty())
    }

    protected fun nestedElementDoesNotExist(parentFieldID: String?, childXPath: String?) {
        val parentElement = wait!!.until(ExpectedConditions.presenceOfElementLocated(By.id(parentFieldID)))
        var childElement: WebElement? = null
        try {
            childElement = wait!!.until(ExpectedConditions.presenceOfNestedElementLocatedBy(parentElement, By.xpath(childXPath)))
        } catch (e: Exception) {
        }
        Assertions.assertTrue(childElement == null)
    }

    protected fun nestedElementExists(parentFieldID: String?, childXPath: String?) {
        val parentElement = wait!!.until(ExpectedConditions.presenceOfElementLocated(By.id(parentFieldID)))
        val childElement = wait!!.until(ExpectedConditions.presenceOfNestedElementLocatedBy(parentElement, By.xpath(childXPath)))
        Assertions.assertTrue(childElement != null)
    }

    protected fun clickElement(fieldID: String?, waitClickable: Boolean = true) {
        var element = wait!!.until(ExpectedConditions.presenceOfElementLocated(By.id(fieldID)))
        if (waitClickable) {
            element = wait!!.until(ExpectedConditions.elementToBeClickable(element))
        }
        Assertions.assertTrue(element.isEnabled)
        sleep()
        element.click()
    }

    protected fun selectDropdownOption(fieldID: String, value: String) {
        val element = wait!!.until(ExpectedConditions.presenceOfElementLocated(By.id(fieldID)))
        val dropdown = Select(
                wait!!.until(ExpectedConditions.elementToBeClickable(element))
        )
        dropdown.selectByVisibleText(value)
    }

    protected fun checkText(fieldID: String?, value: String?, assertText: String?) {
        var element = wait!!.until(ExpectedConditions.presenceOfElementLocated(By.id(fieldID)))
        element = wait!!.until(ExpectedConditions.visibilityOf(element))
        Assertions.assertEquals(value, element.text, assertText)
    }

    protected fun checkNestedElementTextByXPath(parentFieldID: String?, childXPath: String?, value: String?,
                                                assertText: String?) {
        val parentElement = wait!!.until(ExpectedConditions.presenceOfElementLocated(By.id(parentFieldID)))
        var childElement = wait!!.until(ExpectedConditions.presenceOfNestedElementLocatedBy(parentElement, By.xpath(childXPath)))
        childElement = wait!!.until(ExpectedConditions.visibilityOf(childElement))
        Assertions.assertEquals(value, childElement.text, assertText)
    }

    protected fun checkEnabled(fieldID: String?, enabled: Boolean) {
        val element = wait!!.until(ExpectedConditions.presenceOfElementLocated(By.id(fieldID)))
        Assertions.assertTrue(if (enabled) element.isEnabled else !element.isEnabled)
    }

    protected fun typeText(fieldID: String?, value: String?) {
        var element = wait!!.until(ExpectedConditions.presenceOfElementLocated(By.id(fieldID)))
        element = wait!!.until(ExpectedConditions.elementToBeClickable(element))
        Assertions.assertTrue(element.isEnabled)
        element.clear()
        element.sendKeys(Keys.CONTROL.toString() + "a")
        element.sendKeys(Keys.DELETE)
        element.sendKeys(value)
    }

    protected fun checkSelected(fieldID: String?, selected: Boolean) {
        val element = wait!!.until(ExpectedConditions.presenceOfElementLocated(By.id(fieldID)))
        Assertions.assertTrue(if (selected) element.isSelected else !element.isSelected)
    }

    protected fun backToHomePage() {
        selectHeaderSliderPanelButton(LIST_ITEM_HOME_BUTTON)
    }

    protected fun goToProfilePage() {
        selectHeaderSliderPanelButton(LIST_ITEM_ACCOUNT_BUTTON)
    }

    private fun selectHeaderSliderPanelButton(buttonID: String) {
        clickElement(HEADER_MENU_BUTTON)
        sleep()
        clickElement(buttonID)
        sleep()
    }

    protected fun sleep() {
        sleepImpl(100)
    }

    private fun sleepImpl(timeout: Long) {
        try {
            Thread.sleep(timeout)
        } catch (e: InterruptedException) {
            e.printStackTrace()
        }
    }

    protected fun step(descr: String) {
        println("    $descr")
    }

    protected fun substep(descr: String) {
        println("        $descr")
    }
}
