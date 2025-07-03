package com.moviebooking.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * OpenAPI Configuration for Swagger Documentation
 * 
 * This class configures the OpenAPI specification for the Movie Booking API,
 * including API information, security schemes, and server configurations.
 */
@Configuration
public class OpenApiConfig {

    /**
     * Creates and configures the OpenAPI specification
     * 
     * @return Configured OpenAPI instance
     */
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Movie Booking API")
                        .description("A comprehensive REST API for movie booking system with authentication, " +
                                "movie management, theatre management, showtime scheduling, and booking functionality.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Movie Booking Team")
                                .email("support@moviebooking.com")
                                .url("https://moviebooking.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Development Server"),
                        new Server()
                                .url("https://api.moviebooking.com")
                                .description("Production Server")))
                .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
                .components(new Components()
                        .addSecuritySchemes("Bearer Authentication", createAPIKeyScheme()));
    }

    /**
     * Creates the JWT Bearer token security scheme
     * 
     * @return Configured SecurityScheme for JWT authentication
     */
    private SecurityScheme createAPIKeyScheme() {
        return new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .bearerFormat("JWT")
                .scheme("bearer");
    }
} 