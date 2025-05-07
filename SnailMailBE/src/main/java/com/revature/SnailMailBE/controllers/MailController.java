package com.revature.SnailMailBE.controllers;

import com.revature.SnailMailBE.models.Mail;
import com.revature.SnailMailBE.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Remember the 3 annotations that we include for a Spring MVC Controller:
@RestController //Makes the Class a Bean, and turns response data into JSON
@RequestMapping("/mail") //Sets the base URL to reach this controller (it'll be http://localhost:8080/mail)
@CrossOrigin //Allows requests from any origin (this will let our FE/BE communicate)
public class MailController {

    //Because the MailController depends on the Service, we must inject it
    //We do this so we can use its methods
    private MailService mailService;

    //Constructor Injection - best practice for autowiring
    @Autowired
    public MailController(MailService mailService) {
        this.mailService = mailService;
    }

    //This method sends a user's inbox back to them (a List of Mail objects)
    @GetMapping
    public ResponseEntity<List<Mail>> getInbox(){

        //Send a request to the service layer to get the inbox
        List<Mail> inbox = mailService.getInbox();

        //Easily configure and return an HTTP response thanks to ResponseEntity
        //200 level status code, or 204 status code if inbox is empty
        if(inbox == null){
            return ResponseEntity.noContent().build(); //204 status code
        } else {
            return ResponseEntity.ok().body(inbox); //200 status code
        }

    }

    //This method will take in a Mail object and send a (fake) email
    @PostMapping
    public ResponseEntity<Mail> sendMail(@RequestBody Mail mail) {

        //Error handling to make sure it's valid mail (just a couple, to get the idea)
        if(mail.getRecipient() == null || mail.getRecipient().isBlank()){
            //400 level status code, and empty response body
            return ResponseEntity.badRequest().body(null);
        }
        //TODO: check the other fields, and stuff like is the email address is valid

        //In a real app, we'd send this deeper into the app to hit the database

        //For now, we'll just return the mail to the user
        return ResponseEntity.ok().body(mail);

    }

}