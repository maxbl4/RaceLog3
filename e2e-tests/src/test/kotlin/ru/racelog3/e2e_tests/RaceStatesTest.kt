package ru.racelog3.e2e_tests

class RaceStatesTest : RaceBaseTest() {
    override fun testBody() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
        // On main page open GP France
        //     check empty participants
        //     Enter for registration
        //     Results not available. Race is not started
        // back to main page
        // Open GP Catalunya and check the same things
        // login
        // add 2 profiles
        // go to main page
        // go to GP France and register 2 profiles
        // go to main page
        // go to GP France and check 2 participants
        // go to GP Catalunya and check there is no participants
        // go to Profile, open Race Management
        // select GP France, Started and press update button
        // go to GP France and check
        //    paticipants are there, 2 ones
        //    Registration does not available, it's closed
        //    Open results, have 2 records
        // go to GP Spain and check
        //     check empty participants
        //     Enter for registration
        //     Results not available. Race is not started
        // go to Profile, open Race Management
        // select GP France, Stopped and press update button
        // go to GP France and check
        //    paticipants are there, 2 ones
        //    Registration does not available, it's closed
        //    Open results, have 2 records
        // go to GP Spain and check
        //     check empty participants
        //     Enter for registration
        //     Results not available. Race is not started
        // go to Profile, open Race Management
        // select GP France, Finished and press update button
        // go to GP France and check
        //    paticipants are there, 2 ones
        //    Registration does not available, it's closed
        //    Open results, have 2 records
        // go to GP Spain and check
        //     check empty participants
        //     Enter for registration
        //     Results not available. Race is not started
    }
}