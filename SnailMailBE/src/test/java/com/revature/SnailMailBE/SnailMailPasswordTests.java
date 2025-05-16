package com.revature.SnailMailBE;

import com.revature.SnailMailBE.models.ChangePasswordDTO;
import com.revature.SnailMailBE.models.Mail;
import com.revature.SnailMailBE.services.MailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;


@SpringBootTest
@AutoConfigureMockMvc //<- IMPORTANT - This sets up MockMVC so we can send mock requests
class SnailMailPasswordTests {

	@Autowired
	private MockMvc mockMvc;

	@MockitoBean
	private MailService mockMailService;

    //Test 1 - Test that the changePasswword() method behaves appropriately with a successful request
	@Test
	void testChangePasswordSuccess() throws Exception {

		//Define the JSON object for the request body
		String changePasswordJson = """
				{
					"oldPassword": "password",
					"newPassword": "newpassword"
				}
				""";

		// ChangePasswordDTO object = new ChangePasswordDTO("oldpassword", "newpassword");
		ChangePasswordDTO changePasswordDTO = new ChangePasswordDTO();
		changePasswordDTO.setOldPassword("password");
		changePasswordDTO.setNewPassword("newpassword");
		//Mock the service method call, and return null (simulates empty inbox)
		when(mockMailService.changePassword(changePasswordDTO)).thenReturn(true);

		//Mock the HTTP request,
		mockMvc.perform(
				patch("/user/password") //Set the URL to /user/password
						//Set the request body to the JSON object we defined above
						.contentType("application/json")
						.content(changePasswordJson))
				.andExpect(status().isOk()) //200 status code
				.andExpect(content().string("Password changed successfully"));

	}

	//Test 2 - Test that the changePassword() behaves appropriately with a failed request due to the wrong "old password" input
	@Test
	void testChangePasswordFailure() throws Exception {

		//Define the JSON object for the request body
		String changePasswordJson = """
				{
					"oldPassword": "wrongpassword",
					"newPassword": "newpassword"
				}
				""";

		// ChangePasswordDTO object = new ChangePasswordDTO("oldpassword", "newpassword");
		ChangePasswordDTO changePasswordDTO = new ChangePasswordDTO();
		changePasswordDTO.setOldPassword("wrongpassword");
		changePasswordDTO.setNewPassword("newpassword");
		//Mock the service method call, and return null (simulates empty inbox)
		when(mockMailService.changePassword(changePasswordDTO)).thenReturn(false);

		//Mock the HTTP request,
		mockMvc.perform(
						patch("/user/password") //Set the URL to /user/password
								//Set the request body to the JSON object we defined above
								.contentType("application/json")
								.content(changePasswordJson))
				.andExpect(status().isBadRequest()) //400 status code
				.andExpect(content().string("Old password is incorrect!"));

	}

	//Test 3 - Ensure that the login() method behaves appropriately after an unsuccessful login
	@Test
	void testLoginFailure() throws Exception {

		//Define the JSON object for the request body
		String loginJson = """
				{
					"username": "username",
					"password": "wrongpassword"
				}
				""";

		//Mock the HTTP request,
		mockMvc.perform(
						post("/auth/login") //Set the URL to /auth/login
								//Set the request body to the JSON object we defined above
								.contentType("application/json")
								.content(loginJson))
				.andExpect(status().isUnauthorized()) //400 status code
				.andExpect(content().string("Invalid username or password")); //Error message

	}

	//Test 4 - Use mocking(mockito +mockMVC) to ensure that the sendMail() 
	//method behaves appropriately (200 status code + mail object in the response body) with a successful mock request to the service
	@Test
	void testSendMailSuccess() throws Exception {

		//Define the JSON object for the request body
		String mailJson = """
				{
					"recipient": "test@snailmail.com",
					"subject": "Test Subject",
					"body": "Test Body"	
					
				}
				""";

		Mail mail = new Mail();
		mail.setRecipient("test@snailmail.com");
		mail.setSubject("Test Subject");
		mail.setBody("Test Body");

		//Mock the service method call, and return the mail object
		when(mockMailService.sendMail(org.mockito.ArgumentMatchers.any(Mail.class))).thenReturn(mail);

		mockMvc.perform(
						post("/mail") //Set the URL to /mail
								//Set the request body to the JSON object we defined above
								.contentType("application/json")
								.content(mailJson))
				.andExpect(status().isOk()) //200 status code
				.andExpect(content().json(mailJson)); //JSON response body

	}

}