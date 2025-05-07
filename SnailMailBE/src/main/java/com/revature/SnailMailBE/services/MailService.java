package com.revature.SnailMailBE.services;

import com.revature.SnailMailBE.models.Mail;

import java.util.List;

//The service layer is responsible for business logic
//Business logic includes stuff like data validation, and data formatting.
//The service makes calls to the database layer and makes sure inputs are valid
public class MailService {

    public List<Mail> getInbox(){

        //Imagine we sent a request to the database to get this info
        List<Mail> inbox = List.of(
                new Mail("snail@snailmail.com", "Hey", "me@snailmail.com", "I am a snail"),
                new Mail("snail@snailmail.com", "Hey", "me@snailmail.com", "I have a shell"),
                new Mail("slug@snailmail.com", "Hey", "me@snailmail.com", "I am a slug"),
                new Mail("clam@snailmail.com", "Hey", "me@snailmail.com", "...")
        );

        //Imagine we either get a list of mail or an empty list
        if(inbox == null){
            return null; //emulates an empty inbox
        } else {
            return inbox;
        }

    }

}
