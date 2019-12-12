package ru.racelog3.e2e_tests;

import java.io.File;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Paths;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;

public class Main {

	enum Browser {
		CHROME, FIREFOX, IE
	}

	private WebDriver webDriver;

	private Main(Browser browser) throws URISyntaxException {
		setProperties();
		switch (browser) {
		case CHROME:
			webDriver = new ChromeDriver();
			break;
		case FIREFOX:
			webDriver = new FirefoxDriver();
			break;
		case IE:
			webDriver = new InternetExplorerDriver();
			break;
		}
	}

	private void setProperties() throws URISyntaxException {
		URL chromeURL = getClass().getClassLoader().getResource("drivers" + File.separator + "chrome" + File.separator
				+ "78.0.3904.105-win32" + File.separator + "chromedriver.exe");
		System.setProperty("webdriver.chrome.driver", Paths.get(chromeURL.toURI()).toFile().getAbsolutePath());

		URL firefoxURL = getClass().getClassLoader().getResource("drivers" + File.separator + "mozilla" + File.separator
				+ "0.26.0-win64" + File.separator + "geckodriver.exe");
		System.setProperty("webdriver.gecko.driver", Paths.get(firefoxURL.toURI()).toFile().getAbsolutePath());

		URL ieURL = getClass().getClassLoader()
				.getResource("drivers" + File.separator + "ie" + File.separator + "IEDriverServer.exe");
		System.setProperty("webdriver.ie.driver", Paths.get(ieURL.toURI()).toFile().getAbsolutePath());
	}

	private void start() {
		AuthSignInTest.runTest(webDriver);
		AuthSignUpTest.runTest(webDriver);
		MainPageTest.runTest(webDriver);
		RaceInfoTest.runTest(webDriver);
		
		webDriver.quit();
	}

	public static void main(String[] args) throws URISyntaxException {
		new Main(resolveBrowser(args)).start();
	}

	private static Browser resolveBrowser(String[] args) {
		if (args != null && args.length == 1) {
			switch (args[0].toUpperCase()) {
			case "CHROME":
				return Browser.CHROME;
			case "FIREFOX":
				return Browser.FIREFOX;
			case "IE":
				return Browser.IE;
			}
		}
		return Browser.CHROME;
	}

}
