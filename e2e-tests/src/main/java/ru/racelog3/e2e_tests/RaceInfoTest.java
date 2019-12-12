package ru.racelog3.e2e_tests;

import org.openqa.selenium.WebDriver;

public class RaceInfoTest extends BaseTest {

	private RaceInfoTest(WebDriver webDriver) {
		super(webDriver);
	}

	@Override
	protected void testBody() {
		String raceName = "Grand Prix of France";
		
		checkText(createID(RACE_ITEM_CARD_NAME, raceName), raceName, "Check the race's name in card");
		checkText(createID(RACE_ITEM_CARD_DATE, raceName), "17.05.2019", "Check the race's date in card");
		clickElement(createID(RACE_ITEM_CARD_MORE_BUTTON, raceName));
		
		checkText(RACE_ITEM_INFO_NAME, raceName, "Check the race's name on the page");
		checkText(RACE_ITEM_INFO_DATE_LOCATION, "Le Mans, France, 17.05.2019", "Check the race's date and location on the page");
		checkText(RACE_ITEM_INFO_DESCR, "Built in 1965 around the existing 24-Hour track, the Le Mans Bugatti Grand Prix race circuit lies 5km south of the city of Le Mans and 200km south-west of Paris. The venue has hosted Grand Prix since the late sixties but a serious accident to Spanish rider Alberto Puig in 1995 saw it struck off the calendar until 2000 whilst stringent safety improvements were carried out. Le Mans is a tight track dominated by first gear corners that place the emphasis on late braking and hard acceleration, whilst rear end traction is also a key area. With the capacity to comfortably accommodate up to 100,000 spectators, the Bugatti circuit also plays host to the 24 hour truck race, the FIA GP2 Championship, French Touring Car and GT races.", "Check the race's description on the page");
		
		checkElement(RACE_PARTICIPANTS_LIST_EXPAND_BUTTON);
		checkElement(RACE_REGISTRATION_LIST_EXPAND_BUTTON);
	}
	
	static void runTest(WebDriver webDriver) {
		new RaceInfoTest(webDriver).runTestImpl();
	}

}
