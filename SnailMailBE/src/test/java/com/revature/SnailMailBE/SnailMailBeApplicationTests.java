package com.revature.SnailMailBE;

import com.revature.SnailMailBE.models.Mail;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest
class SnailMailBeApplicationTests {

	@Test
	void contextLoads() {
	}

	//First RestAssured test - Just makes sure getInbox() works as expected
	@Test
	void testGetInbox() {

		//Response object from RestAssured. Lets us extract and test HTTP Responses
		Response response = given()
				.when().get("http://localhost:8080/mail")
				.then().extract().response();

		//Now we can run assertions on the response
		response.then()
				.statusCode(200)
				.body("size()", greaterThan(0))
				.body("[0].sender", notNullValue())
				.body("[0].recipient", equalTo("me@snailmail.com"));
	}

	//NOTE: We used JUnit, which is great and for Java tests in general...
	//But RestAssured is built SPECIFICALLY for testing REST APIs

	//Second RestAssured test - Tests success sendMail
	@Test
	void testSendMailSuccess(){

		//valid mail object
		Mail mail = new Mail("me@snailmail.com",
				"Testing",
				"you@snailmail.com",
				"Hi");

		//Same pattern as usual - gather the response, make assertions on it
		Response response = given()
				.contentType("application/json")
				.body(mail)
				.when().post("http://localhost:8080/mail")
				.then().extract().response();

		response.then()
				.statusCode(200)
				.body("sender", equalTo("me@snailmail.com"));
				//TODO: we could check each field of course, but you get the point
	}

	//TODO: sendMail fails with empty recipient


	//TODO: sendMail fails with subject > 20 characters

	

}
