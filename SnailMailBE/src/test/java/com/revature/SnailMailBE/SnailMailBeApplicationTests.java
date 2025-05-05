package com.revature.SnailMailBE;

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

}
