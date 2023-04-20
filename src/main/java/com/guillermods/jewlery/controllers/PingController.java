package com.guillermods.jewlery.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController
public class PingController {

    @GetMapping("/ping")
    public String hello(){
        return """
                Hello world
                Map
                """;
    }
    
}
