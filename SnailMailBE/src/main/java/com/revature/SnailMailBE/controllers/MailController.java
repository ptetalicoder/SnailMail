package com.revature.SnailMailBE.controllers;

import com.revature.SnailMailBE.models.Mail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//Remember the 3 annotations that we include for a Spring MVC Controller:
@RestController //Makes the Class a Bean, and turns response data into JSON
@RequestMapping("/mail") //Sets the base URL to reach this controller (it'll be http://localhost:8080/mail)
@CrossOrigin //Allows requests from any origin (this will let our FE/BE communicate)
public class MailController {

    //This method sends a user's inbox back to them (a List of Mail objects)
    @GetMapping
    public ResponseEntity<List<Mail>> getInbox(){

        //In a real app, this would send a request to the database to get the user's inbox mail records
        //For now, we'll return a hardcoded list of Mail
        List<Mail> inbox = List.of(
                new Mail("snail@snailmail.com", "me@snailmail.com", "Hey", "I am a snail"),
                new Mail("snail@snailmail.com", "me@snailmail.com", "Hey", "I have a shell"),
                new Mail("slug@snailmail.com", "me@snailmail.com", "Hey", "I am a slug"),
                new Mail("clam@snailmail.com", "me@snailmail.com", "Hey", "...")
        );

        //Easily configure and return an HTTP response thanks to ResponseEntity
        return ResponseEntity.ok().body(inbox);

    }

}
