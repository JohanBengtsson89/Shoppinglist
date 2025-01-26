package com.project.Shoppinglist.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
/*        // Customize the application security ...
        http.requiresChannel((channel) -> channel.anyRequest().requiresSecure());*/
        return http.build();
    }

}
