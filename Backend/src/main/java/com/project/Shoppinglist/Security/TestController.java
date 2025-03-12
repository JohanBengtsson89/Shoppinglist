package com.project.Shoppinglist.Security;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/protected-endpoint")
    public String protectedEndpoint(@AuthenticationPrincipal Jwt jwt) {
        return "protected-endpoint, " + jwt.getClaimAsString("username") + "! Your token is valid";
    }
}
